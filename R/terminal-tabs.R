#' Multiple terminals in tabs
#'
#' A tabbed set of terminals built on [shinytabs::tabset_server()]: each tab
#' holds one [terminal_server()] running one of `commands`, users open new
#' tabs with the "+" button (choosing the command from a menu when there are
#' several), close them, drag them into a new order and rename them. Closing
#' a tab whose process is still running asks for confirmation first; a tab
#' whose process has exited closes at once. A dot before each title shows
#' whether its process is running.
#'
#' The same operations are available from the server through the returned
#' controls, and `commands` can be whatever the app decides, so an app can
#' offer, say, a shell, a `claude` session confined to one project and a
#' `codex` session confined to another.
#'
#' Because the terminals are created as tabs are opened, the xterm.js
#' `options` and `theme` are arguments of `terminal_tabs_server()` rather than
#' of the UI function.
#'
#' @inheritSection terminal_server Hosted deployments
#'
#' @param id Module id, shared by `terminal_tabs_ui()` and
#'   `terminal_tabs_server()`.
#' @param height,controls,... For `terminal_tabs_ui()`, passed to
#'   [shinytabs::tabset_ui()]. For `terminal_tabs_server()` and
#'   `terminal_tabs_app()`, `...` is passed to [terminal_server()] for every
#'   terminal (e.g. `env`, `wd`, `interval`, `strip_env`).
#' @param commands The commands users can start, as a named list whose
#'   elements are programs (as for the `command` of [terminal_server()]) or
#'   [terminal_command()] specifications such as [claude_command()]. The names
#'   are the labels shown in the "+" menu and used as tab titles; unnamed
#'   elements are labelled with the formatted command. A single command may be
#'   given on its own. The default is the user's shell plus `claude` and
#'   `codex` when they are on the `PATH` (see [default_commands()]).
#' @param initial The tabs to open when the session starts, as indices into
#'   `commands` or their labels; `NULL` starts with no tabs.
#' @param options,theme Passed to [terminal_ui()] for every terminal.
#' @param confirm_close Ask before closing a tab whose process is still
#'   running. With `FALSE` the process is killed without confirmation.
#' @param closeable,renameable,max_tabs Passed to
#'   [shinytabs::tabset_server()].
#'
#' @return `terminal_tabs_ui()` returns an HTML tag list.
#'   `terminal_tabs_server()` returns a list of controls and reactives:
#'   \describe{
#'     \item{`add(command = 1, title = NULL, select = TRUE)`}{Opens a tab
#'       running `command` (an index into `commands` or a label) and returns
#'       its id.}
#'     \item{`close(id, confirm = TRUE)`}{Closes a tab, asking first when its
#'       process is running unless `confirm = FALSE`.}
#'     \item{`select(id)`, `set_title(id, title)`}{Select or retitle a tab.}
#'     \item{`terminal(id)`}{The [terminal_server()] controls of a tab
#'       (`write()`, `restart()`, `alive()`, ...).}
#'     \item{`tabs()`}{Reactive data frame of open tabs: `id`, `type` (the
#'       command label) and `title`.}
#'     \item{`selected()`}{Reactive id of the selected tab, `NULL` when none.}
#'     \item{`commands`}{The normalised list of command specifications.}
#'   }
#' @export
#' @examples
#' if (interactive()) {
#'   terminal_tabs_app()
#'   terminal_tabs_app(list(
#'     Shell = Sys.getenv("SHELL"),
#'     Claude = claude_command(wd = "~/project"),
#'     Codex = codex_command(wd = "~/project", sandbox = "read-only")
#'   ))
#' }
terminal_tabs_ui = function(id, height = NULL, controls = NULL, ...) {
  check_not_hosted()
  ns = shiny::NS(id)
  htmltools::tagList(
    shinyterm_dependencies(),
    shinytabs::tabset_ui(
      ns("tabs"),
      height = height,
      controls = controls,
      empty = "No open terminals. Use + to start one.",
      ...
    )
  )
}

#' @rdname terminal_tabs_ui
#' @export
terminal_tabs_server = function(
  id,
  commands = default_commands(),
  ...,
  initial = 1,
  options = list(),
  theme = c("auto", "dark", "light"),
  confirm_close = TRUE,
  closeable = TRUE,
  renameable = TRUE,
  max_tabs = Inf
) {
  check_not_hosted()
  theme = match.arg(theme)
  cmds = terminal_commands(commands)
  labels = names(cmds)
  initial = command_keys(initial, labels)
  server_args = list(...)

  shiny::moduleServer(id, function(input, output, session) {
    priv = new.env(parent = emptyenv())
    priv$observers = list()

    tabs = shinytabs::tabset_server(
      "tabs",
      types = labels,
      initial = initial,
      title = function(type, label, n) label,
      closeable = closeable,
      renameable = renameable,
      max_tabs = max_tabs,
      ui = function(id, type) {
        terminal_ui(shiny::NS(id, "term"), height = NULL, options = options, theme = theme)
      },
      server = function(input, output, session, type, tab) {
        term = do.call(terminal_server, c(list("term", cmds[[type]]), server_args))
        priv$observers[[tab$id]] = shiny::observe({
          tabs$set_icon(tab$id, status_icon(term$alive(), term$exit_status()))
        })
        term
      },
      can_close = function(term, tab) {
        if (confirm_close && shiny::isolate(term$alive())) {
          paste0("The process in \"", tab$title, "\" is still running. Closing the tab will kill it.")
        } else {
          TRUE
        }
      },
      on_close = function(term, tab) {
        obs = priv$observers[[tab$id]]
        if (!is.null(obs)) obs$destroy()
        priv$observers[[tab$id]] = NULL
        term$kill()
      }
    )

    # Keyboard focus follows the selected tab into its terminal.
    shiny::observe({
      id = tabs$selected()
      term = if (!is.null(id)) tabs$handle(id)
      if (!is.null(term)) term$focus()
    }) |>
      shiny::bindEvent(tabs$selected(), ignoreNULL = TRUE)

    list(
      add = function(command = 1, title = NULL, select = TRUE) {
        tabs$add(command_keys(command, labels), title = title, select = select)
      },
      close = tabs$close,
      select = tabs$select,
      set_title = tabs$set_title,
      terminal = tabs$handle,
      tabs = tabs$tabs,
      selected = tabs$selected,
      commands = cmds
    )
  })
}

#' @rdname terminal_tabs_ui
#'
#' @description
#' `terminal_tabs_app()` wraps the module in a one-page app, like
#' [terminal_app()]: a full-window tabset with a restart button for the
#' selected tab and a light/dark mode toggle, which is disabled when any of
#' the commands is `codex` (see [terminal_app()] for why).
#'
#' @inheritParams terminal_app
#' @return `terminal_tabs_app()` returns a [shiny::shinyApp()] object.
#' @export
terminal_tabs_app = function(
  commands = default_commands(),
  ...,
  initial = 1,
  options = list(),
  mode = NULL
) {
  if (!is.null(mode)) mode = match.arg(mode, c("dark", "light"))
  cmds = terminal_commands(commands)
  server_args = list(...)
  switchable = all(vapply(cmds, function(cmd) mode_switchable(cmd$command), TRUE))

  ui = bslib::page_fillable(
    title = "shinyterm",
    padding = 0,
    terminal_tabs_ui(
      "terms",
      controls = htmltools::tagList(
        mode_toggle(mode, locked = !switchable),
        shiny::actionButton(
          "restart",
          "Restart",
          icon = shiny::icon("rotate-right"),
          class = "btn-sm btn-outline-secondary"
        )
      )
    )
  )

  server = function(input, output, session) {
    terms = do.call(
      terminal_tabs_server,
      c(list("terms", cmds, initial = initial, options = options), server_args)
    )

    shiny::observe({
      id = terms$selected()
      term = if (!is.null(id)) terms$terminal(id)
      if (!is.null(term)) term$restart()
    }) |>
      shiny::bindEvent(input$restart)
  }

  shiny::shinyApp(ui, server)
}

#' Default commands for a terminal tabset
#'
#' The user's interactive shell (`$SHELL`, or PowerShell on Windows) plus
#' [claude_command()] and [codex_command()] for whichever of `claude` and
#' `codex` are found on the `PATH`, with their default sandbox settings and
#' `wd` as working directory.
#'
#' @param wd Working directory for the agent commands (`NULL` for the current
#'   one).
#' @return A named list of commands suitable for [terminal_tabs_server()].
#' @export
#' @examples
#' names(default_commands())
default_commands = function(wd = NULL) {
  cmds = list(Shell = default_shell())
  if (nzchar(Sys.which("claude"))) cmds$Claude = claude_command(wd = wd)
  if (nzchar(Sys.which("codex"))) cmds$Codex = codex_command(wd = wd)
  cmds
}

# Normalises the `commands` of terminal_tabs_server() to a named list of
# shinyterm_command objects with unique labels as names.
#
# commands: a program, a shinyterm_command, or a list of either

terminal_commands = function(commands) {
  if (is.character(commands) || inherits(commands, "shinyterm_command")) {
    commands = list(commands)
  }
  if (!is.list(commands) || length(commands) == 0) {
    stop("`commands` must be a non-empty list of programs or terminal_command() specifications", call. = FALSE)
  }
  specs = lapply(commands, function(cmd) do.call(terminal_command, resolve_command(cmd)))
  labels = names(specs)
  if (is.null(labels)) labels = rep("", length(specs))
  missing = !nzchar(labels)
  labels[missing] = vapply(specs[missing], format, "")
  names(specs) = make.unique(labels, sep = " ")
  specs
}

# Resolves command references (indices or labels) to labels.
#
# x: integer indices into `labels`, or labels; NULL gives character()
# labels: the names of a terminal_commands() list

command_keys = function(x, labels) {
  if (is.null(x) || length(x) == 0) return(character())
  if (is.numeric(x)) {
    if (any(x < 1 | x > length(labels) | x != floor(x))) {
      stop("command index out of range", call. = FALSE)
    }
    return(labels[x])
  }
  x = as.character(x)
  bad = setdiff(x, labels)
  if (length(bad)) {
    stop("unknown command: ", paste0("'", bad, "'", collapse = ", "), call. = FALSE)
  }
  x
}

# The status dot shown before a tab's title.
#
# alive: whether the process is running
# status: its exit status when not

status_icon = function(alive, status = NULL) {
  if (isTRUE(alive)) {
    htmltools::span(class = "shinyterm-status shinyterm-status-running", title = "running")
  } else {
    htmltools::span(
      class = "shinyterm-status shinyterm-status-exited",
      title = if (is.null(status)) "not started" else paste("exited", status)
    )
  }
}
