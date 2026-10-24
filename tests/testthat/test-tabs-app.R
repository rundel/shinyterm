tab_count = "document.querySelectorAll('#terms-tabs-tabset .shinytabs-tab').length"

test_that("terminal_tabs_app opens, switches and closes terminals in the browser", {
  skip_on_cran()
  skip_on_os("windows")
  skip_if_not_installed("shinytest2")
  skip_if_not_installed("chromote")

  app = shinytest2::AppDriver$new(
    terminal_tabs_app(list(Cat = "cat", Echo = terminal_command("sh", c("-c", "echo bye")))),
    name = "tabs",
    timeout = 10000
  )
  on.exit(app$stop(), add = TRUE)

  term1 = "document.getElementById('terms-tabs-tab1-term-term')._shinyterm.term"
  app$wait_for_js(paste(term1, "!= null"))
  app$wait_for_js(
    "document.querySelector('#terms-tabs-tabset .shinytabs-tab[data-id=\"tab1\"] .shinyterm-status-running') != null",
    timeout = 5000
  )
  app$run_js(paste0(term1, ".input('hello\\n')"))
  app$wait_for_js(
    paste0(term1, ".buffer.active.getLine(1).translateToString(true) === 'hello'"),
    timeout = 5000
  )

  # The + menu lists the commands; the Echo tab exits and shows it
  app$click(selector = "#terms-tabs-tabset .shinytabs-add-btn")
  app$wait_for_js("!document.querySelector('#terms-tabs-tabset .shinytabs-menu').hidden")
  expect_equal(
    app$get_js("Array.from(document.querySelectorAll('#terms-tabs-tabset .shinytabs-menu-item')).map(e => e.textContent)"),
    list("Cat", "Echo")
  )
  app$click(selector = "#terms-tabs-tabset .shinytabs-menu-item[data-key='Echo']")
  app$wait_for_js(paste(tab_count, "=== 2"))
  term2 = "document.getElementById('terms-tabs-tab2-term-term')._shinyterm.term"
  app$wait_for_js(paste(term2, "!= null"))
  app$wait_for_js(
    "document.querySelector('#terms-tabs-tabset .shinytabs-tab[data-id=\"tab2\"] .shinyterm-status-exited') != null",
    timeout = 5000
  )
  app$wait_for_js(paste0(term2, ".buffer.active.getLine(0).translateToString(true) === 'bye'"), timeout = 5000)
  expect_equal(app$get_js("document.querySelector('#terms-tabs-tabset .shinytabs-pane.active').dataset.tab"), "tab2")

  # The cat terminal keeps its contents while hidden
  expect_equal(
    app$get_js(paste0(term1, ".buffer.active.getLine(1).translateToString(true)")),
    "hello"
  )

  # Exited tabs close without asking; running ones ask
  app$click(selector = "#terms-tabs-tabset .shinytabs-tab[data-id='tab2'] .shinytabs-tab-close")
  app$wait_for_js(paste(tab_count, "=== 1"))
  expect_null(app$get_js("document.getElementById('terms-tabs-tab2-term-term')"))

  app$click(selector = "#terms-tabs-tabset .shinytabs-tab[data-id='tab1'] .shinytabs-tab-close")
  app$wait_for_js("document.querySelector('#shiny-modal.show .modal-body') != null")
  expect_match(app$get_text("#shiny-modal .modal-body"), "still running")
  app$click("terms-tabs-close_confirm")
  app$wait_for_js(paste(tab_count, "=== 0"))
  expect_true(app$get_js("document.getElementById('terms-tabs-tabset').classList.contains('empty')"))

  # The + button starts a fresh tab after everything was closed
  app$click(selector = "#terms-tabs-tabset .shinytabs-add-btn")
  app$click(selector = "#terms-tabs-tabset .shinytabs-menu-item[data-key='Cat']")
  app$wait_for_js("document.getElementById('terms-tabs-tab3-term-term') != null")
  app$wait_for_js(
    "document.querySelector('#terms-tabs-tabset .shinytabs-tab[data-id=\"tab3\"] .shinyterm-status-running') != null",
    timeout = 5000
  )
})
