# Drive the module's polling loop: give the process time to respond, then run
# the pending later() callbacks.
tick = function(session, times = 5) {
  for (i in seq_len(times)) {
    Sys.sleep(0.1)
    later::run_now(0.2)
  }
}

test_that("terminal_server runs a process in a pty and relays input and output", {
  skip_on_cran()
  skip_on_os("windows")

  shiny::testServer(terminal_server, args = list(command = "cat"), {
    expect_false(state$alive)

    session$setInputs(term = list(rows = 24, cols = 80, seq = 0))
    expect_true(state$alive)
    expect_null(state$exit_status)

    session$setInputs(term_data = list(from = 0, chunks = list("hello\n")))
    tick(session)
    expect_match(state$output, "hello\r\nhello\r\n", fixed = TRUE)

    # A chunk re-sent before its ack is written only once
    session$setInputs(term_data = list(from = 0, chunks = list("hello\n", "again\n")))
    tick(session)
    expect_equal(lengths(regmatches(state$output, gregexpr("hello", state$output))), 2L)
    expect_match(state$output, "again\r\nagain\r\n", fixed = TRUE)

    write_text("typed\n")
    tick(session)
    expect_match(state$output, "typed\r\ntyped\r\n", fixed = TRUE)

    kill()
    expect_false(state$alive)
    expect_true(is.numeric(state$exit_status))
  })
})

test_that("terminal_server reports a normal exit and can restart", {
  skip_on_cran()
  skip_on_os("windows")

  shiny::testServer(
    terminal_server,
    args = list(command = "sh", args = c("-c", "echo bye; exit 3")),
    {
      session$setInputs(term = list(rows = 24, cols = 80, seq = 0))
      tick(session)
      expect_false(state$alive)
      expect_equal(state$exit_status, 3L)
      expect_match(state$output, "bye")

      restart()
      expect_true(state$alive)
      tick(session)
      expect_equal(state$exit_status, 3L)
    }
  )
})

test_that("auto_start = FALSE waits for start()", {
  skip_on_cran()
  skip_on_os("windows")

  shiny::testServer(terminal_server, args = list(command = "cat", auto_start = FALSE), {
    session$setInputs(term = list(rows = 24, cols = 80, seq = 0))
    expect_false(state$alive)
    start()
    expect_true(state$alive)
    expect_equal(session$returned$size(), list(rows = 24, cols = 80))
    kill()
  })
})

test_that("the pty follows the client's size", {
  skip_on_cran()
  skip_on_os("windows")

  shiny::testServer(
    terminal_server,
    args = list(command = "sh", args = c("-c", "trap 'stty size' WINCH; stty size; while :; do sleep 0.05; done")),
    {
      session$setInputs(term = list(rows = 20, cols = 60, seq = 0))
      tick(session)
      expect_match(state$output, "20 60")

      session$setInputs(term = list(rows = 30, cols = 100, seq = 1))
      tick(session)
      expect_match(state$output, "30 100")
      kill()
    }
  )
})

test_that("terminal_server accepts a command specification", {
  skip_on_cran()
  skip_on_os("windows")

  dir = withr::local_tempdir()
  shiny::testServer(
    terminal_server,
    args = list(command = terminal_command("sh", c("-c", "pwd"), wd = dir)),
    {
      session$setInputs(term = list(rows = 24, cols = 80, seq = 0))
      tick(session)
      expect_match(state$output, basename(dir), fixed = TRUE)
      expect_false(state$alive)
    }
  )
})
