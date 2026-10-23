#' Run a command in a terminal app
#'
#' A single-page app wrapping [terminal_ui()] and [terminal_server()]: a
#' full-window terminal running `command`, with a restart button, a status
#' badge and a light/dark mode toggle ([bslib::input_dark_mode()]) that the
#' terminal follows. Useful on its own and as a template for embedding a
#' terminal in a larger app.
#'
#' Codex reads the terminal colours once at launch and keeps drawing its
#' composer with them, so switching mode while it runs leaves the composer
#' unreadable. When `command` is `codex` the toggle is therefore disabled,
#' with a tooltip saying why, and the app stays in its starting mode; use
#' `mode` to choose it.
#'
#' @inheritParams terminal_server
#' @param ... Passed on to [terminal_server()].
#' @param options Passed on to [terminal_ui()].
#' @param mode Colour mode the app starts in, `"dark"` or `"light"`. `NULL`
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
  mode = NULL
) {
  if (!is.null(mode)) mode = match.arg(mode, c("dark", "light"))
  spec = resolve_command(command, args)
  label = format(do.call(terminal_command, spec))
  server_args = list(...)

  toggle = bslib::input_dark_mode(id = "dark_mode", mode = mode)
  if (!mode_switchable(spec$command)) {
    toggle = bslib::tooltip(
      htmltools::span(
        class = "shinyterm-mode-locked",
        tabindex = "0",
        htmltools::tagAppendAttributes(toggle, inert = NA, style = "opacity: 0.4")
      ),
      "Light/dark switching is disabled: codex does not support changing themes after launch.",
      placement = "bottom"
    )
  }

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
        terminal_ui("term", height = NULL, options = options)
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

  shiny::shinyApp(ui, server)
}

# Whether the page's colour mode may change while `command` runs. Codex reads
# the terminal colours once at launch (OSC 10/11) and never again, so a later
# switch leaves its composer drawn in the old mode's colours.
#
# command: program name or path

mode_switchable = function(command) {
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
