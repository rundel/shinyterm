#' Run a command in a terminal app
#'
#' A single-page app wrapping [terminal_ui()] and [terminal_server()]: a
#' full-window terminal running `command`, with a restart button, a status
#' badge and a light/dark mode toggle ([bslib::input_dark_mode()]) that the
#' terminal follows. Useful on its own and as a template for embedding a
#' terminal in a larger app.
#'
#' Codex reads the terminal colors once at launch and keeps drawing its
#' composer with them, so switching mode while it runs leaves the composer
#' unreadable. When `command` is `codex`, or a [terminal_command()] with
#' `fixed_colors = TRUE` (as [codex_command()] builds), the toggle is
#' therefore disabled, with a tooltip saying why, and the app stays in its
#' starting mode; use `mode` to choose it.
#'
#' The app is protected by an access token (see "Hosted deployments" in
#' [terminal_server()]): it opens the browser, or the IDE's viewer, at a URL
#' ending in `?shinyterm_token=<token>` and prints the token, and a page
#' opened without it gets no process.
#'
#' @inheritParams terminal_server
#' @param ... Passed on to [terminal_server()].
#' @param token `TRUE` (the default) protects the app with a new random
#'   access token, a string uses that token, and `FALSE` turns the protection
#'   off.
#' @param options,emulator Passed on to [terminal_ui()].
#' @param mode Color mode the app starts in, `"dark"` or `"light"`. `NULL`
#'   (the default) follows the browser's preference.
#'
#' @return A [shiny::shinyApp()] object.
#' @export
#' @examples
#' if (interactive()) {
#'   terminal_app()
#'   terminal_app("claude")
#'   terminal_app("codex", wd = "~/project", mode = "dark")
#'   terminal_app(claude_command(wd = "~/project", permission_mode = "acceptEdits"))
#' }
terminal_app = function(
  command = default_shell(),
  args = character(),
  ...,
  options = list(),
  emulator = c("ghostterm", "xterm"),
  mode = NULL,
  token = TRUE
) {
  if (!is.null(mode)) mode = match.arg(mode, c("dark", "light"))
  emulator = match.arg(emulator)
  spec = resolve_command(command, args)
  label = format(do.call(terminal_command, spec))
  token = resolve_token(token)
  server_args = c(list(...), list(token = token))

  toggle = mode_toggle(mode, locked = !mode_switchable(spec))

  ui = bslib::page_fillable(
    title = "shinyterm",
    padding = 0,
    bslib::card(
      bslib::card_header(
        class = "d-flex align-items-center gap-2",
        htmltools::tags$code(label),
        shiny::uiOutput("status", inline = TRUE),
        htmltools::div(
          class = "ms-auto d-flex align-items-center gap-2",
          toggle,
          shiny::actionButton(
            "restart",
            "Restart",
            icon = shiny::icon("rotate-right"),
            class = "btn-sm btn-outline-secondary"
          )
        )
      ),
      bslib::card_body(
        padding = 0,
        terminal_ui("term", height = NULL, options = options, emulator = emulator)
      )
    )
  )

  server = function(input, output, session) {
    term = do.call(terminal_server, c(list("term", command, args), server_args))

    output$status = shiny::renderUI({
      if (term$alive()) {
        htmltools::span(class = "badge text-bg-success", "running")
      } else {
        htmltools::span(
          class = "badge text-bg-secondary",
          paste("exited", term$exit_status())
        )
      }
    })

    shiny::observe(term$restart()) |>
      shiny::bindEvent(input$restart)
  }

  token_app(ui, server, token)
}

# shinyApp() for the app wrappers: with a token, the browser opens at the
# tokenized URL and the token is printed when the app starts.
#
# token: the access token, or NULL

token_app = function(ui, server, token) {
  if (is.null(token)) return(shiny::shinyApp(ui, server))
  shiny::shinyApp(
    ui,
    server,
    onStart = function() {
      message("shinyterm: the app URL needs ?", token_param, "=", token)
    },
    options = token_app_options(token)
  )
}

# The light/dark mode toggle of the app wrappers, disabled (inert, dimmed,
# with a tooltip saying why) when the color mode must not change.
#
# mode: the starting mode, or NULL for the browser's preference
# locked: whether switching is disabled

mode_toggle = function(mode, locked = FALSE) {
  toggle = bslib::input_dark_mode(id = "dark_mode", mode = mode)
  if (!locked) return(toggle)
  bslib::tooltip(
    htmltools::span(
      class = "shinyterm-mode-locked",
      tabindex = "0",
      htmltools::tagAppendAttributes(toggle, inert = NA, style = "opacity: 0.4")
    ),
    "Light/dark switching is disabled: this command does not support changing colors after launch.",
    placement = "bottom"
  )
}

# Whether the page's color mode may change while `command` runs. Programs
# that read the terminal colors once at launch (OSC 10/11) and never again,
# such as Codex, keep drawing in the old mode's colors after a switch. Plain
# `codex` is recognized by name so `terminal_app("codex")` works too.
#
# command: program name or path, or a shinyterm_command

mode_switchable = function(command) {
  if (inherits(command, "shinyterm_command") || is.list(command)) {
    if (isTRUE(command$fixed_colors)) return(FALSE)
    command = command$command
  }
  !grepl("^codex(\\.exe)?$", basename(command), ignore.case = TRUE)
}

# The user's interactive shell: $SHELL on unix, PowerShell on Windows.

default_shell = function() {
  if (.Platform$OS.type == "windows") {
    "powershell.exe"
  } else {
    Sys.getenv("SHELL", "/bin/sh")
  }
}
