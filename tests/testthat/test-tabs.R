tick = function(session, times = 5) {
  for (i in seq_len(times)) {
    Sys.sleep(0.1)
    later::run_now(0.2)
  }
}

test_that("terminal_commands normalises programs and specifications", {
  cmds = terminal_commands(list(Shell = "sh", claude_command(wd = "~"), "cat", "cat"))
  expect_s3_class(cmds[[1]], "shinyterm_command")
  expect_equal(names(cmds)[1:2], c("Shell", format(claude_command(wd = "~"))))
  expect_equal(names(cmds)[3:4], c("cat", "cat 1"))

  single = terminal_commands("cat")
  expect_equal(names(single), "cat")
  expect_equal(single$cat$command, "cat")

  expect_error(terminal_commands(list()), "non-empty")
  expect_error(terminal_commands(NULL), "non-empty")
})

test_that("command_keys resolves indices and labels", {
  labels = c("Shell", "Claude")
  expect_equal(command_keys(2, labels), "Claude")
  expect_equal(command_keys(c("Claude", "Shell"), labels), c("Claude", "Shell"))
  expect_equal(command_keys(NULL, labels), character())
  expect_error(command_keys(3, labels), "out of range")
  expect_error(command_keys("Codex", labels), "unknown command")
})

test_that("default_commands starts with the shell and adds available agents", {
  cmds = default_commands()
  expect_equal(names(cmds)[1], "Shell")
  expect_equal(cmds$Shell, default_shell())
  expect_true(all(names(cmds) %in% c("Shell", "Claude", "Codex")))
})

test_that("terminal_tabs_server runs one process per tab and guards running tabs", {
  skip_on_cran()
  skip_on_os("windows")

  commands = list(Cat = "cat", Echo = terminal_command("sh", c("-c", "echo bye")))
  shiny::testServer(terminal_tabs_server, args = list(commands = commands), {
    session$setInputs(`tabs-tabset` = list(ready = TRUE, seq = 0))
    terms = session$returned
    expect_equal(terms$tabs()$title, "Cat")
    expect_equal(terms$selected(), "tab1")

    cat_term = terms$terminal("tab1")
    expect_false(cat_term$alive())
    session$setInputs(`tabs-tab1-term-term` = list(rows = 24, cols = 80, seq = 0))
    expect_true(cat_term$alive())
    cat_term$write("hi\n")
    tick(session)
    expect_match(cat_term$output(), "hi\r\nhi")

    id = terms$add("Echo")
    expect_equal(id, "tab2")
    expect_equal(terms$tabs()$title, c("Cat", "Echo"))
    session$setInputs(`tabs-tab2-term-term` = list(rows = 24, cols = 80, seq = 0))
    tick(session)
    expect_false(terms$terminal("tab2")$alive())
    expect_match(terms$terminal("tab2")$output(), "bye")

    # An exited tab closes immediately
    session$setInputs(`tabs-tabset_event` = list(type = "close", id = "tab2", n = 1))
    expect_equal(terms$tabs()$id, "tab1")

    # A running tab waits for confirmation, then its process is killed
    session$setInputs(`tabs-tabset_event` = list(type = "close", id = "tab1", n = 2))
    expect_equal(terms$tabs()$id, "tab1")
    session$setInputs(`tabs-close_confirm` = 1)
    expect_equal(nrow(terms$tabs()), 0L)
    expect_false(cat_term$alive())
    expect_null(terms$terminal("tab1"))

    expect_error(terms$add("Nope"), "unknown command")
  })
})

test_that("confirm_close = FALSE kills running tabs without asking", {
  skip_on_cran()
  skip_on_os("windows")

  shiny::testServer(
    terminal_tabs_server,
    args = list(commands = "cat", confirm_close = FALSE, initial = NULL),
    {
      session$setInputs(`tabs-tabset` = list(ready = TRUE, seq = 0))
      terms = session$returned
      expect_equal(nrow(terms$tabs()), 0L)
      terms$add()
      session$setInputs(`tabs-tab1-term-term` = list(rows = 24, cols = 80, seq = 0))
      term = terms$terminal("tab1")
      expect_true(term$alive())
      session$setInputs(`tabs-tabset_event` = list(type = "close", id = "tab1", n = 1))
      expect_equal(nrow(terms$tabs()), 0L)
      expect_false(term$alive())
    }
  )
})

test_that("terminal_tabs_ui wraps a tabset with the terminal dependencies", {
  ui = terminal_tabs_ui("terms", height = "400px", controls = shiny::actionButton("go", "Go"))
  html = as.character(ui)
  expect_match(html, 'id="terms-tabs-tabset"')
  expect_match(html, "height:400px")
  expect_match(html, 'id="go"')
  expect_match(html, "No open terminals")
  deps = vapply(htmltools::findDependencies(ui), `[[`, "", "name")
  expect_true(all(c("xterm", "shinyterm", "shinytabs") %in% deps))
})

test_that("the mode toggle is locked when any command is codex", {
  switchable = function(commands) {
    all(vapply(terminal_commands(commands), function(cmd) mode_switchable(cmd$command), TRUE))
  }
  expect_false(switchable(list(Shell = "sh", Codex = "codex")))
  expect_true(switchable(list(Shell = "sh", Claude = "claude")))
  expect_match(as.character(mode_toggle(NULL, locked = TRUE)), "shinyterm-mode-locked")
  expect_no_match(as.character(mode_toggle("dark")), "shinyterm-mode-locked")
})
