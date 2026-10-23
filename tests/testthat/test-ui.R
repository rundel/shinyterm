test_that("terminal_ui builds a namespaced element with its dependencies", {
  ui = terminal_ui("shell", height = "300px", options = list(fontSize = 13))
  html = as.character(ui)

  expect_match(html, 'id="shell-term"')
  expect_match(html, 'class="shinyterm"')
  expect_match(html, "height:300px")
  expect_match(html, 'data-options="\\{&quot;fontSize&quot;:13\\}"')

  deps = htmltools::findDependencies(ui)
  expect_setequal(vapply(deps, `[[`, "", "name"), c("xterm", "shinyterm"))
})

test_that("terminal_ui records the requested theme", {
  expect_match(as.character(terminal_ui("shell")), 'data-theme="auto"')
  expect_match(as.character(terminal_ui("shell", theme = "light")), 'data-theme="light"')
  expect_error(terminal_ui("shell", theme = "sepia"), "auto")
})

test_that("terminal_ui with height = NULL is a fill item", {
  html = as.character(terminal_ui("shell", height = NULL))
  expect_match(html, "html-fill-item")
  expect_no_match(html, "[^-]height:")
})

test_that("terminal_env inherits, sets defaults and lets the caller override", {
  withr::local_envvar(c(SHINYTERM_TEST = "kept", CLAUDE_CODE_CHILD_SESSION = "1", TERM_PROGRAM = "vscode"))
  env = terminal_env(NULL)
  expect_false("current" %in% env)
  expect_equal(env[["SHINYTERM_TEST"]], "kept")
  expect_equal(env[["TERM"]], "xterm-256color")
  expect_equal(env[["TERM_PROGRAM"]], "shinyterm")
  expect_false("CLAUDE_CODE_CHILD_SESSION" %in% names(env))

  env = terminal_env(NULL, strip = FALSE)
  expect_equal(env[["CLAUDE_CODE_CHILD_SESSION"]], "1")

  env = terminal_env(c(TERM = "dumb", FOO = "bar"))
  expect_equal(env[["TERM"]], "dumb")
  expect_equal(env[["FOO"]], "bar")
  expect_equal(sum(names(env) == "TERM"), 1L)
})

test_that("strip_env accepts a custom pattern and rejects other values", {
  withr::local_envvar(c(SHINYTERM_TEST = "kept"))
  env = terminal_env(NULL, strip = "^SHINYTERM_")
  expect_false("SHINYTERM_TEST" %in% names(env))
  expect_error(terminal_env(NULL, strip = 1), "strip_env")
})
