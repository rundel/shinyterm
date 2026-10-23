#' Terminal module server
#'
#' Runs `command` inside a pseudo-terminal and connects it to the terminal
#' element created by [terminal_ui()] with the same `id`. Keystrokes typed in
#' the browser are written to the process and everything it prints is streamed
#' back and rendered by xterm.js, so full-screen interactive programs (shells,
#' editors, agent CLIs such as `claude` or `codex`) work as they would in a
#' local terminal.
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
#' Hugging Face Spaces from the environment, or when the browser reached the
#' app through a hostname other than localhost. The error it raises explains
#' what you would have to do to override it, and why you should not.
#'
#' Output is polled on a [later::later()] timer rather than a reactive one, so
#' an idle process does not keep the session busy; only arriving output
#' touches the reactive graph (through `output()`).
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
#'   behaviour; line-oriented programs rely on it).
#' @param max_output Number of characters of raw output kept in the `output`
#'   reactive.
#'
#' @return A list of controls and reactives:
#' \describe{
#'   \item{`start()`, `kill()`, `restart()`}{Launch, terminate (with its process
#'     tree) or relaunch the process. `restart()` also clears the terminal.}
#'   \item{`write(text)`}{Write `text` to the process as if typed, e.g. to send
#'     a prompt. Include `"\n"` (or `"\r"` for TUIs) to submit it.}
#'   \item{`alive()`}{Reactive logical: whether the process is running.}
#'   \item{`exit_status()`}{Reactive: the last exit status, `NULL` while
#'     running or before the first launch.}
#'   \item{`size()`}{Reactive list with the client's `rows` and `cols`.}
#'   \item{`output()`}{Reactive string: the most recent `max_output` characters
#'     of raw output, control sequences included.}
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
  max_output = 1e6
) {
  check_not_hosted()
  spec = resolve_command(command, args, wd)

  shiny::moduleServer(id, function(input, output, session) {
    priv = new.env(parent = emptyenv())
    priv$proc = NULL
    priv$loop = 0L
    priv$next_index = 0L
    priv$unwritten = raw(0)
    priv$output = ""
    priv$rows = 24L
    priv$cols = 80L

    state = shiny::reactiveValues(alive = FALSE, exit_status = NULL, output = "")

    send = function(...) {
      session$sendCustomMessage("shinyterm", list(id = session$ns("term"), ...))
    }

    running = function() {
      !is.null(priv$proc) && priv$proc$is_alive()
    }

    emit = function(chunk) {
      send(write = chunk)
      priv$output = paste0(priv$output, chunk)
      n = nchar(priv$output)
      if (n > max_output) {
        priv$output = substr(priv$output, n - max_output + 1L, n)
      }
      state$output = priv$output
    }

    # Reads whatever the process has written, a bounded number of chunks per
    # call so a flood of output cannot starve the event loop.
    drain = function(max_chunks = 64L) {
      for (i in seq_len(max_chunks)) {
        status = priv$proc$poll_io(0)
        if (!identical(status[["output"]], "ready")) break
        chunk = priv$proc$read_output()
        if (!nzchar(chunk)) break
        emit(chunk)
      }
    }

    flush_input = function() {
      if (length(priv$unwritten) == 0 || !running()) return(invisible())
      priv$unwritten = priv$proc$write_input(priv$unwritten)
    }

    finish = function() {
      if (is.null(priv$proc)) return(invisible())
      drain()
      status = priv$proc$get_exit_status()
      if (is.null(status)) status = NA_integer_
      priv$proc = NULL
      priv$unwritten = raw(0)
      state$alive = FALSE
      state$exit_status = status
      send(
        write = paste0("\r\n[process exited with status ", status, "]\r\n"),
        stdin = FALSE
      )
    }

    pump = function() {
      if (is.null(priv$proc)) return(invisible())
      flush_input()
      drain()
      if (!priv$proc$is_alive()) finish()
    }

    # One polling loop per launch; the generation counter retires a loop whose
    # process was replaced by restart().
    schedule = function(gen) {
      later::later(
        function() {
          if (gen != priv$loop || session$isClosed()) return()
          pump()
          if (!is.null(priv$proc)) schedule(gen)
        },
        delay = interval / 1000
      )
    }

    start = function() {
      if (running()) return(invisible(FALSE))
      check_not_hosted(shiny::isolate(session$clientData$url_hostname))
      size = shiny::isolate(input$term)
      if (!is.null(size)) {
        priv$rows = as.integer(size$rows)
        priv$cols = as.integer(size$cols)
      }

      priv$proc = processx::process$new(
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
      priv$unwritten = raw(0)
      priv$loop = priv$loop + 1L
      state$alive = TRUE
      state$exit_status = NULL
      send(stdin = TRUE, focus = TRUE)
      schedule(priv$loop)
      invisible(TRUE)
    }

    kill = function() {
      if (running()) {
        priv$proc$kill_tree()
        priv$proc$wait(1000)
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
      if (running()) pty_resize(priv$proc, rows, cols)
    }) |>
      shiny::bindEvent(input$term)

    if (auto_start) {
      shiny::observe(start()) |>
        shiny::bindEvent(input$term, once = TRUE)
    }

    session$onSessionEnded(function() {
      if (running()) priv$proc$kill_tree()
    })

    list(
      start = start,
      kill = kill,
      restart = restart,
      write = write_text,
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
