test_that("terminal_app relays typed input through the browser", {
  skip_on_cran()
  skip_on_os("windows")
  skip_if_not_installed("shinytest2")
  skip_if_not_installed("chromote")

  app = shinytest2::AppDriver$new(
    terminal_app("cat"),
    name = "cat",
    timeout = 10000
  )
  on.exit(app$stop(), add = TRUE)

  app$wait_for_js("document.getElementById('term-term')._shinyterm != null")
  app$run_js("document.getElementById('term-term')._shinyterm.term.input('hello\\n')")

  app$wait_for_js(
    "document.getElementById('term-term')._shinyterm.term.buffer.active.getLine(1).translateToString(true) === 'hello'",
    timeout = 5000
  )

  expect_equal(app$get_text("#status .badge"), "running")

  app$click("restart")
  app$wait_for_js(
    "document.getElementById('term-term')._shinyterm.term.buffer.active.getLine(0).translateToString(true) === ''",
    timeout = 5000
  )
  expect_equal(app$get_text("#status .badge"), "running")
})

test_that("terminal_app follows the page colour mode", {
  skip_on_cran()
  skip_on_os("windows")
  skip_if_not_installed("shinytest2")
  skip_if_not_installed("chromote")

  app = shinytest2::AppDriver$new(
    terminal_app("cat"),
    name = "theme",
    timeout = 10000
  )
  on.exit(app$stop(), add = TRUE)

  term = "document.getElementById('term-term')._shinyterm.term"
  app$wait_for_js(paste0(term, " != null"))

  app$run_js("document.documentElement.dataset.bsTheme = 'light'")
  app$wait_for_js(paste0(term, ".options.theme.background === '#ffffff'"), timeout = 5000)
  expect_equal(
    app$get_js("document.getElementById('term-term').style.backgroundColor"),
    "rgb(255, 255, 255)"
  )

  app$run_js("document.documentElement.dataset.bsTheme = 'dark'")
  app$wait_for_js(paste0(term, ".options.theme.background === '#1e1e1e'"), timeout = 5000)
  expect_equal(
    app$get_js("document.getElementById('term-term').style.backgroundColor"),
    "rgb(30, 30, 30)"
  )
})

test_that("a fixed theme ignores the page colour mode", {
  skip_on_cran()
  skip_on_os("windows")
  skip_if_not_installed("shinytest2")
  skip_if_not_installed("chromote")

  ui = bslib::page_fillable(
    bslib::input_dark_mode(id = "dark_mode", mode = "dark"),
    terminal_ui("term", theme = "light", options = list(theme = list(background = "#fafafa")))
  )
  app = shinytest2::AppDriver$new(
    shiny::shinyApp(ui, function(input, output, session) terminal_server("term", "cat")),
    name = "fixed-theme",
    timeout = 10000
  )
  on.exit(app$stop(), add = TRUE)

  term = "document.getElementById('term-term')._shinyterm.term"
  app$wait_for_js(paste0(term, " != null"))
  app$wait_for_js("document.documentElement.dataset.bsTheme === 'dark'", timeout = 5000)
  expect_equal(app$get_js(paste0(term, ".options.theme.background")), "#fafafa")
  expect_equal(app$get_js(paste0(term, ".options.theme.foreground")), "#1f2328")
})

test_that("terminal_app validates mode and detects codex", {
  expect_error(terminal_app("cat", mode = "sepia"), "dark")
  expect_true(mode_switchable("claude"))
  expect_true(mode_switchable("/bin/bash"))
  expect_false(mode_switchable("codex"))
  expect_false(mode_switchable("/opt/homebrew/bin/codex"))
  expect_false(mode_switchable("Codex.exe"))
})

test_that("terminal_app starts in the requested colour mode", {
  skip_on_cran()
  skip_on_os("windows")
  skip_if_not_installed("shinytest2")
  skip_if_not_installed("chromote")

  app = shinytest2::AppDriver$new(
    terminal_app("cat", mode = "dark"),
    name = "mode",
    timeout = 10000
  )
  on.exit(app$stop(), add = TRUE)

  term = "document.getElementById('term-term')._shinyterm.term"
  app$wait_for_js(paste0(term, " != null"))
  app$wait_for_js("document.documentElement.dataset.bsTheme === 'dark'", timeout = 5000)
  app$wait_for_js(paste0(term, ".options.theme.background === '#1e1e1e'"), timeout = 5000)
  expect_false(app$get_js("document.getElementById('dark_mode').hasAttribute('inert')"))
})

test_that("terminal_app disables the mode toggle for codex", {
  skip_on_cran()
  skip_on_os("windows")
  skip_if_not_installed("shinytest2")
  skip_if_not_installed("chromote")

  app = shinytest2::AppDriver$new(
    terminal_app(terminal_command("cat", command = "codex"), mode = "light"),
    name = "codex-mode",
    timeout = 10000
  )
  on.exit(app$stop(), add = TRUE)

  app$wait_for_js("document.documentElement.dataset.bsTheme === 'light'", timeout = 5000)
  expect_true(app$get_js("document.getElementById('dark_mode').hasAttribute('inert')"))
  app$run_js("document.querySelector('.shinyterm-mode-locked').focus()")
  app$wait_for_js("document.querySelector('.tooltip') != null", timeout = 5000)
  expect_match(
    app$get_js("document.querySelector('.tooltip').textContent"),
    "codex does not support"
  )

  app$click(selector = "#dark_mode")
  Sys.sleep(0.5)
  expect_equal(app$get_js("document.documentElement.dataset.bsTheme"), "light")
})
