#' Run a command in a terminal app
#'
#' A single-page app wrapping [terminal_ui()] and [terminal_server()]: a
#' full-window terminal running `command`, with a restart button, a status
#' badge and a light/dark mode toggle ([bslib::input_dark_mode()]) that the
#' terminal follows. Useful on its own and as a template for embedding a
#' terminal in a larger app.
#'
#' @inheritParams terminal_server
#' @param ... Passed on to [terminal_server()].
#' @param options Passed on to [terminal_ui()].
#'
#' @return A [shiny::shinyApp()] object.
#' @export
#' @examples
#' if (interactive()) {
#'   terminal_app()
#'   terminal_app("claude")
#'   terminal_app("codex", wd = "~/project")
#'   terminal_app(claude_command(wd = "~/project", permission_mode = "acceptEdits"))
#' }
terminal_app = function(command = default_shell(), args = character(), ..., options = list()) {
  label = format(do.call(terminal_command, resolve_command(command, args)))
  server_args = list(...)

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
          bslib::input_dark_mode(id = "dark_mode"),
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

# The user's interactive shell: $SHELL on unix, PowerShell on Windows.

default_shell = function() {
  if (.Platform$OS.type == "windows") {
    "powershell.exe"
  } else {
    Sys.getenv("SHELL", "/bin/sh")
  }
}
