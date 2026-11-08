# HTML dependencies for the terminal element: the terminal emulator library
# and the shinyterm input binding.
#
# emulator: "ghostterm" (the vendored ghostterm build, loaded as an ES module
#   together with its WebAssembly module), "xterm" (the bundled xterm.js build
#   with its fit addon), or NULL for the binding alone

shinyterm_dependencies = function(emulator = "ghostterm") {
  binding = htmltools::htmlDependency(
    name = "shinyterm",
    version = as.character(utils::packageVersion("shinyterm")),
    src = c(file = "shinyterm"),
    package = "shinyterm",
    script = "shinyterm.js",
    stylesheet = "shinyterm.css"
  )
  if (is.null(emulator)) return(list(binding))

  lib = switch(
    emulator,
    ghostterm = htmltools::htmlDependency(
      name = "ghostterm",
      version = "0.0.2",
      src = c(file = "ghostterm"),
      package = "shinyterm",
      script = list(src = "ghostterm-loader.js", type = "module"),
      all_files = TRUE
    ),
    xterm = htmltools::htmlDependency(
      name = "xterm",
      version = "5.5.0",
      src = c(file = "xterm"),
      package = "shinyterm",
      script = c("xterm.js", "addon-fit.js"),
      stylesheet = "xterm.css"
    )
  )
  list(lib, binding)
}
