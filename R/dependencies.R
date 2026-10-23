# HTML dependencies for the terminal element: the bundled xterm.js build with
# its fit addon, and the shinyterm input binding.

shinyterm_dependencies = function() {
  list(
    htmltools::htmlDependency(
      name = "xterm",
      version = "5.5.0",
      src = c(file = "xterm"),
      package = "shinyterm",
      script = c("xterm.js", "addon-fit.js"),
      stylesheet = "xterm.css"
    ),
    htmltools::htmlDependency(
      name = "shinyterm",
      version = as.character(utils::packageVersion("shinyterm")),
      src = c(file = "shinyterm"),
      package = "shinyterm",
      script = "shinyterm.js",
      stylesheet = "shinyterm.css"
    )
  )
}
