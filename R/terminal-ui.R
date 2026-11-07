#' Terminal module UI
#'
#' Creates the terminal element for a [terminal_server()] module. The element
#' sizes its rows and columns to fit its box, and re-fits when the box resizes.
#'
#' Two terminal emulators are bundled. The default, `"ghostterm"`, is
#' [ghostterm](https://github.com/rundel/ghostterm): Ghostty's terminal
#' emulation (libghostty-vt, compiled to WebAssembly) drawn to a canvas behind
#' an xterm.js-compatible API. It tells Shift+Enter from Enter, as `claude`
#' and `codex` expect, and answers programs' color and mode queries as
#' Ghostty does. `"xterm"` is [xterm.js](https://xtermjs.org) 5.5.0, the
#' long-established emulator used by VS Code; choose it if ghostterm
#' misbehaves with a program or browser. Both accept the same `options` and
#' palettes.
#'
#' @param id Module id, matching the `id` passed to [terminal_server()].
#' @param height CSS height of the terminal (anything
#'   [htmltools::validateCssUnit()] accepts). `NULL` makes the element a fill
#'   item that grows to fill a fillable parent such as a [bslib::card_body()].
#' @param options Named list of terminal options (xterm.js
#'   `ITerminalOptions`, which ghostterm also accepts) passed to the terminal
#'   constructor, e.g. `list(fontSize = 13)`. Colors given in
#'   `options$theme` are layered over the palette chosen by `theme`, so
#'   `list(theme = list(background = "#1e1e1e"))` recolors the background
#'   while keeping the rest of the palette.
#' @param theme Color palette. `"auto"` (the default) follows the page's
#'   Bootstrap color mode (the `data-bs-theme` attribute set by
#'   [bslib::input_dark_mode()] and [bslib::toggle_dark_mode()]), switching
#'   live when it changes, and uses the dark palette on pages without one.
#'   `"dark"` and `"light"` fix the palette regardless of the page.
#' @param emulator Terminal emulator running in the browser: `"ghostterm"`
#'   (the default) or `"xterm"` for xterm.js. See Details.
#' @param ... Additional attributes for the terminal `div`.
#'
#' @return An HTML tag list.
#' @export
#' @examples
#' terminal_ui("shell")
#' terminal_ui("shell", theme = "light", options = list(fontSize = 13))
#' terminal_ui("shell", emulator = "xterm")
terminal_ui = function(
  id,
  height = "400px",
  options = list(),
  theme = c("auto", "dark", "light"),
  emulator = c("ghostterm", "xterm"),
  ...
) {
  check_not_hosted()
  ns = shiny::NS(id)
  theme = match.arg(theme)
  emulator = match.arg(emulator)

  tag = htmltools::div(
    id = ns("term"),
    class = "shinyterm",
    `data-options` = if (length(options)) jsonlite::toJSON(options, auto_unbox = TRUE) else "{}",
    `data-theme` = theme,
    `data-emulator` = emulator,
    ...
  )

  if (is.null(height)) {
    tag = htmltools::bindFillRole(tag, item = TRUE)
    tag = htmltools::tagAppendAttributes(tag, style = htmltools::css(`min-height` = "0"))
  } else {
    tag = htmltools::tagAppendAttributes(
      tag,
      style = htmltools::css(height = htmltools::validateCssUnit(height))
    )
  }

  htmltools::tagList(shinyterm_dependencies(emulator), tag)
}
