#' Terminal module server
#'
#' Runs `command` inside a pseudo-terminal and connects it to the terminal
#' element created by [terminal_ui()] with the same `id`. Keystrokes typed in
#' the browser are written to the process and everything it prints is streamed
#' back and rendered by the terminal emulator in the browser, so full-screen
#' interactive programs (shells, editors, agent CLIs such as `claude` or
#' `codex`) work as they would in a local terminal.
#'
#' The process is sized to the terminal's rows and columns at launch and
#' resized (with `SIGWINCH`) whenever the client's size changes, so full-screen
#' programs follow the browser window. Resizing after launch is not available
#' on Windows.
#'
#' @section Hosted deployments:
#' A terminal gives every visitor a process running as the app's user, so this
#' module refuses to run where the app is served to other people: it aborts
#' when it detects Shiny Server, Posit Connect, shinyapps.io, ShinyProxy or
#' Hugging Face Spaces from the environment, when the browser reached the
#' app through a hostname other than localhost, or when the connection comes
#' from a page on another site (a web page you visit trying to reach the app
#' on your machine). The hostname and site are read from the `Host` and
#' `Origin` headers of the session's WebSocket request, which a browser
#' cannot forge. The error it raises explains what you would have to do to
#' override it, and why you should not.
#'
#' Those checks do not stop other programs or users on the same machine,
#' which can reach a localhost port directly. A `token` closes that gap: the
#' process then only starts for a page whose URL carries
#' `?shinyterm_token=<token>`. [terminal_app()] and [terminal_tabs_app()] make
#' a random token by default and open the browser at the tokenized URL.
#'
#' @section Output:
#' Output is polled on a [later::later()] timer rather than a reactive one, so
#' an idle process does not keep the session busy; only arriving output
#' touches the reactive graph (through `output()`). The browser reports how
#' much output it has rendered, and reading stops while it is too far behind
#' (the process then blocks on its writes, as in a slow terminal), so a
#' process printing faster than the browser can draw cannot flood the
#' connection.
#'
#' @section Reloading the page:
#' By default the process is killed when the session ends, which includes
#' reloading the page or a dropped connection. With `persist` set to a
#' number of seconds, it is kept running that long instead, and a session
#' started from the same browser tab (a reload) that runs the same command in
#' the same terminal reattaches to it: the recent output (`max_output`) is
#' replayed and the program is asked to redraw. A process nobody reattaches
#' to within `persist` seconds is killed.
#'
#' @param id Module id, matching the `id` passed to [terminal_ui()].
#' @param command Program to run, as for [processx::process], or a
#'   [terminal_command()] specification such as [claude_command()] (its
#'   arguments come first and its working directory applies unless `wd` is
#'   given).
#' @param args Character vector of additional arguments for `command`.
#' @param env Named character vector of extra environment variables. The
#'   current environment is inherited (minus `strip_env` matches), and `TERM`,
#'   `COLORTERM` and `TERM_PROGRAM` are set to describe this terminal unless
#'   overridden here.
#' @param strip_env Whether to drop inherited environment variables that would
#'   make the process believe it runs inside another tool. `TRUE` (the default)
#'   drops markers of a Claude Code session (`CLAUDE*`), which otherwise make a
#'   nested `claude` treat itself as a child session and stop saving
#'   transcripts, and of IDE terminals (`VSCODE_*`, `POSITRON*`, `RSTUDIO*`,
#'   `TERM_PROGRAM`), which make it look for an IDE to connect to. `FALSE`
#'   keeps everything; a string is used as the regular expression instead.
#' @param wd Working directory for the process (`NULL` for the current one).
#' @param interval Output polling interval in milliseconds.
#' @param auto_start Launch the process as soon as the client reports the
#'   terminal size. With `FALSE`, call the returned `start()` yourself.
#' @param echo Whether the pseudo-terminal echoes input (the normal terminal
#'   behavior; line-oriented programs rely on it).
#' @param max_output Number of characters of the current process's raw output
#'   kept for the `output` reactive and replayed when a reloaded page
#'   reattaches. `0` keeps none.
#' @param token Access token the page's URL must carry
#'   (`?shinyterm_token=<token>`) for the process to start, or `NULL` (the
#'   default) for none. See "Hosted deployments".
#' @param persist Seconds to keep the process running after its session ends,
#'   for a reloaded page to reattach to. `0` (the default) kills it at once.
#'   See "Reloading the page".
#'
#' @return A list of controls and reactives:
#' \describe{
#'   \item{`start()`, `kill()`, `restart()`}{Launch (or reattach to), terminate
#'     (with its process tree) or relaunch the process. `restart()` also
#'     clears the terminal.}
#'   \item{`write(text)`}{Write `text` to the process as if typed, e.g. to send
#'     a prompt. Include `"\n"` (or `"\r"` for TUIs) to submit it.}
#'   \item{`focus()`}{Give the terminal keyboard focus in the browser.}
#'   \item{`alive()`}{Reactive logical: whether the process is running.}
#'   \item{`exit_status()`}{Reactive: the last exit status, `NULL` while
#'     running or before the first launch.}
#'   \item{`size()`}{Reactive list with the client's `rows` and `cols`.}
#'   \item{`output()`}{Reactive string: the most recent `max_output` characters
#'     of the current process's raw output, control sequences included.}
#' }
#' @export
terminal_server = function(
  id,
  command,
  args = character(),
  env = NULL,
  wd = NULL,
  interval = 50,
  auto_start = TRUE,
  echo = TRUE,
  strip_env = TRUE,
  max_output = 1e6,
  token = NULL,
  persist = 0
) {
  check_not_hosted()
  spec = resolve_command(command, args, wd)
  stopifnot(is.numeric(persist), length(persist) == 1, persist >= 0)

  shiny::moduleServer(id, function(input, output, session) {
    # entry: the attached process and its replay buffer (see new_entry())
    priv = new.env(parent = emptyenv())
    priv$entry = NULL
    priv$loop = 0L
    priv$next_index = 0L
    priv$unwritten = raw(0)
    priv$sent = 0
    priv$rows = 24L
    priv$cols = 80L

    state = shiny::reactiveValues(alive = FALSE, exit_status = NULL, output = "")
    element = session$ns("term")

    send = function(...) {
      session$sendCustomMessage("shinyterm", list(id = element, ...))
    }

    proc = function() priv$entry$proc

    running = function() {
      p = proc()
      !is.null(p) && p$is_alive()
    }

    emit = function(text) {
      n = nchar(text)
      priv$sent = priv$sent + n
      send(write = text, n = n)
      e = priv$entry
      if (max_output > 0) {
        e$output = tail_chars(paste0(e$output, text), max_output)
        state$output = e$output
      }
    }

    # How many more characters may be sent before the browser must catch up;
    # unlimited until the client first reports what it has rendered.
    budget = function() {
      written = shiny::isolate(input$term_written)
      if (is.null(written)) return(Inf)
      max_unrendered - (priv$sent - written)
    }

    # Reads what the process has written, a bounded number of chunks per
    # call so a flood of output cannot starve the event loop, and sends it as
    # one message. `all` ignores the flow control window (for an exited
    # process, whose remaining output is bounded by the pty buffer).
    drain = function(max_chunks = 64L, all = FALSE) {
      left = if (all) Inf else budget()
      out = character()
      for (i in seq_len(max_chunks)) {
        if (left <= 0) break
        status = proc()$poll_io(0)
        if (!identical(status[["output"]], "ready")) break
        chunk = proc()$read_output()
        if (!nzchar(chunk)) break
        out = c(out, chunk)
        left = left - nchar(chunk)
      }
      if (length(out)) emit(paste(out, collapse = ""))
    }

    flush_input = function() {
      if (length(priv$unwritten) == 0 || !running()) return(invisible())
      priv$unwritten = proc()$write_input(priv$unwritten)
    }

    finish = function() {
      e = priv$entry
      if (is.null(e)) return(invisible())
      drain(all = TRUE)
      status = e$proc$get_exit_status()
      if (is.null(status)) status = NA_integer_
      unregister(e)
      priv$entry = NULL
      priv$unwritten = raw(0)
      state$alive = FALSE
      state$exit_status = status
      send(
        write = paste0("\r\n[process exited with status ", status, "]\r\n"),
        stdin = FALSE
      )
    }

    pump = function() {
      if (is.null(priv$entry)) return(invisible())
      flush_input()
      drain()
      if (!proc()$is_alive()) finish()
    }

    # One polling loop per launch; the generation counter retires a loop whose
    # process was replaced by restart().
    schedule = function(gen) {
      later::later(
        function() {
          if (gen != priv$loop || session$isClosed()) return()
          pump()
          if (!is.null(priv$entry)) schedule(gen)
        },
        delay = interval / 1000
      )
    }

    # Refuses (with the hosted-deployment banner) a session opened from
    # another host or site, and (with a message in the terminal) a page
    # without the token.
    authorized = function() {
      headers = request_headers(session)
      check_not_hosted(headers$host, headers$origin)
      if (token_ok(session, token)) return(TRUE)
      send(write = token_refusal)
      FALSE
    }

    reattach = function(e) {
      e$session = session$token
      e$expiry = e$expiry + 1L
      priv$entry = e
      state$alive = TRUE
      state$exit_status = NULL
      state$output = e$output
      if (nzchar(e$output)) emit_replay(e$output)
      redraw(e$proc, priv$rows, priv$cols)
    }

    emit_replay = function(text) {
      n = nchar(text)
      priv$sent = priv$sent + n
      send(write = text, n = n)
    }

    start = function() {
      if (running()) return(invisible(FALSE))
      size = shiny::isolate(input$term)
      if (!is.null(size)) {
        priv$rows = as.integer(size$rows)
        priv$cols = as.integer(size$cols)
      }
      if (!authorized()) return(invisible(FALSE))

      key = if (persist > 0) entry_key(size$client, element, spec)
      e = if (!is.null(key)) detached_entry(key)
      if (is.null(e)) {
        p = processx::process$new(
          spec$command,
          spec$args,
          pty = TRUE,
          pty_options = list(echo = echo, rows = priv$rows, cols = priv$cols),
          env = terminal_env(env, strip_env),
          wd = spec$wd,
          cleanup = TRUE,
          cleanup_tree = TRUE,
          encoding = "UTF-8"
        )
        e = new_entry(p, key)
        register(e)
        priv$entry = e
        e$session = session$token
        state$alive = TRUE
        state$exit_status = NULL
        state$output = ""
      } else {
        reattach(e)
      }
      priv$unwritten = raw(0)
      priv$loop = priv$loop + 1L
      send(stdin = TRUE, focus = TRUE)
      schedule(priv$loop)
      invisible(TRUE)
    }

    kill = function() {
      if (running()) {
        proc()$kill_tree()
        proc()$wait(1000)
      }
      finish()
      invisible()
    }

    restart = function() {
      kill()
      send(clear = TRUE)
      start()
    }

    write_text = function(text) {
      priv$unwritten = c(priv$unwritten, charToRaw(enc2utf8(text)))
      flush_input()
      invisible()
    }

    shiny::observe({
      msg = input$term_data
      chunks = msg$chunks
      from = as.integer(msg$from)
      for (i in seq_along(chunks)) {
        idx = from + i - 1L
        if (idx < priv$next_index) next
        priv$next_index = idx + 1L
        if (running()) {
          priv$unwritten = c(priv$unwritten, charToRaw(enc2utf8(chunks[[i]])))
        }
      }
      flush_input()
      send(ack = priv$next_index - 1L)
    }) |>
      shiny::bindEvent(input$term_data)

    shiny::observe({
      rows = as.integer(input$term$rows)
      cols = as.integer(input$term$cols)
      if (rows == priv$rows && cols == priv$cols) return()
      priv$rows = rows
      priv$cols = cols
      if (running()) pty_resize(proc(), rows, cols)
    }) |>
      shiny::bindEvent(input$term)

    if (auto_start) {
      shiny::observe(start()) |>
        shiny::bindEvent(input$term, once = TRUE)
    }

    session$onSessionEnded(function() {
      e = priv$entry
      if (is.null(e) || !e$proc$is_alive()) return()
      if (!is.null(e$key)) {
        detach_entry(e, persist)
      } else {
        e$proc$kill_tree()
      }
    })

    list(
      start = start,
      kill = kill,
      restart = restart,
      write = write_text,
      focus = function() send(focus = TRUE),
      alive = shiny::reactive(state$alive),
      exit_status = shiny::reactive(state$exit_status),
      size = shiny::reactive({
        shiny::req(input$term)
        list(rows = input$term$rows, cols = input$term$cols)
      }),
      output = shiny::reactive(state$output)
    )
  })
}

# Characters of output sent to a client but not yet rendered there beyond
# which the server stops reading the process's output.

max_unrendered = 262144

# The last `n` characters of `x`.

tail_chars = function(x, n) {
  len = nchar(x)
  if (len <= n) x else substr(x, len - n + 1L, len)
}

# Processes kept alive for reattaching (persist > 0), keyed by entry_key().
# Each entry is an environment holding the process (`proc`), its replay
# buffer (`output`), its `key`, the token of the session it is attached to
# (`session`, NULL while detached) and a generation counter (`expiry`) that
# cancels a pending kill when the entry is reattached.

registry = new.env(parent = emptyenv())

new_entry = function(proc, key = NULL) {
  e = new.env(parent = emptyenv())
  e$proc = proc
  e$key = key
  e$output = ""
  e$session = NULL
  e$expiry = 0L
  e
}

# Identifies "the same terminal" across a reload: the browser tab's key, the
# terminal element and the command it runs. NULL when the client sent no key.
#
# client: the key from the client's size input
# element: the terminal element id
# spec: the resolved command

entry_key = function(client, element, spec) {
  if (is.null(client) || !nzchar(client)) return(NULL)
  paste(
    client, element, spec$command, paste(spec$args, collapse = "\x1f"),
    if (is.null(spec$wd)) "" else spec$wd,
    sep = "\x1e"
  )
}

register = function(e) {
  if (!is.null(e$key)) assign(e$key, e, envir = registry)
}

unregister = function(e) {
  key = e$key
  if (!is.null(key) && exists(key, envir = registry, inherits = FALSE) &&
      identical(get(key, envir = registry), e)) {
    rm(list = key, envir = registry)
  }
}

# The entry for `key` if its process is alive and no session holds it.

detached_entry = function(key) {
  e = registry[[key]]
  if (is.null(e)) return(NULL)
  if (!e$proc$is_alive()) {
    unregister(e)
    return(NULL)
  }
  if (!is.null(e$session)) return(NULL)
  e
}

# Leaves `e` running without a session and kills it after `persist` seconds
# unless a session reattaches first.

detach_entry = function(e, persist) {
  e$session = NULL
  e$expiry = e$expiry + 1L
  gen = e$expiry
  later::later(
    function() {
      if (e$expiry != gen || !is.null(e$session)) return()
      unregister(e)
      if (e$proc$is_alive()) e$proc$kill_tree()
    },
    delay = persist
  )
}

# Makes a full-screen program redraw after a reattach by changing the pty
# size and changing it back, which delivers SIGWINCH even when the new page
# has the size the process already had.

redraw = function(proc, rows, cols) {
  pty_resize(proc, rows, max(cols - 1L, 1L))
  later::later(
    function() if (proc$is_alive()) pty_resize(proc, rows, cols),
    delay = 0.05
  )
}

# Environment for the child process: the current environment minus the
# variables `strip` selects, plus terminal defaults, with user-supplied
# variables taking precedence. Built explicitly (no "current" marker) so
# inherited variables can be removed, not just overridden.
#
# env: named character vector of extra variables, or NULL
# strip: TRUE for the default pattern, FALSE/NULL to keep everything, or a
#   regex matched against inherited variable names

terminal_env = function(env, strip = TRUE) {
  inherited = Sys.getenv()
  inherited = stats::setNames(as.character(inherited), names(inherited))
  pattern = env_strip_pattern(strip)
  if (!is.null(pattern)) {
    inherited = inherited[!grepl(pattern, names(inherited))]
  }
  vals = c(
    inherited,
    TERM = "xterm-256color",
    COLORTERM = "truecolor",
    TERM_PROGRAM = "shinyterm",
    env
  )
  vals[!duplicated(names(vals), fromLast = TRUE)]
}

env_strip_pattern = function(strip) {
  if (isTRUE(strip)) return(default_env_strip)
  if (isFALSE(strip) || is.null(strip)) return(NULL)
  if (is.character(strip) && length(strip) == 1) return(strip)
  stop("`strip_env` must be TRUE, FALSE or a single regular expression", call. = FALSE)
}

# Inherited variables that would make the child believe it runs inside another
# tool: a Claude Code session (its nested-session markers turn off transcript
# saving) or an IDE terminal (VS Code, Positron, RStudio; Claude Code then
# looks for an IDE to connect to).
default_env_strip = "^(CLAUDE|VSCODE_|POSITRON|RSTUDIO|TERM_PROGRAM)"
