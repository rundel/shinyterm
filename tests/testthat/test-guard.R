clean_env = c(
  SHINY_SERVER_VERSION = NA, RSTUDIO_PRODUCT = NA, CONNECT_SERVER = NA,
  R_CONFIG_ACTIVE = NA, SHINYPROXY_USERNAME = NA, SHINYPROXY_USERGROUPS = NA,
  SPACE_HOST = NA
)
consent = stats::setNames("yes, really", shinyterm:::consent_var)

test_that("hosted_context recognises the hosting products", {
  expect_null(hosted_context(c(HOME = "/x")))
  expect_equal(hosted_context(c(SHINY_SERVER_VERSION = "1.5.22")), "Shiny Server")
  expect_equal(hosted_context(c(RSTUDIO_PRODUCT = "CONNECT")), "Posit Connect")
  expect_equal(hosted_context(c(CONNECT_SERVER = "https://c")), "Posit Connect")
  expect_equal(hosted_context(c(R_CONFIG_ACTIVE = "rsconnect")), "shinyapps.io / Posit Connect")
  expect_null(hosted_context(c(R_CONFIG_ACTIVE = "production")))
  expect_equal(hosted_context(c(SHINYPROXY_USERNAME = "me")), "ShinyProxy")
  expect_equal(hosted_context(c(SPACE_HOST = "x.hf.space")), "Hugging Face Spaces")
})

test_that("client_is_local only accepts loopback names", {
  expect_true(client_is_local(NULL))
  expect_true(client_is_local(""))
  expect_true(client_is_local("localhost"))
  expect_true(client_is_local("127.0.0.1"))
  expect_true(client_is_local("[::1]"))
  expect_false(client_is_local("shiny.example.org"))
  expect_false(client_is_local("192.168.1.20"))
})

test_that("the UI and server refuse to run on a hosted server without consent", {
  withr::local_envvar(c(clean_env, SHINY_SERVER_VERSION = "1.5.22"))
  expect_error(terminal_ui("x"), "REFUSES TO RUN")
  expect_error(terminal_ui("x"), "Shiny Server")
  expect_error(terminal_ui("x"), shinyterm:::consent_var, fixed = TRUE)
  expect_error(
    shiny::testServer(terminal_server, args = list(command = "cat"), {}),
    "REFUSES TO RUN"
  )

  withr::local_envvar(consent)
  expect_s3_class(terminal_ui("x"), "shiny.tag.list")

  withr::local_envvar(stats::setNames("yes", shinyterm:::consent_var))
  expect_error(terminal_ui("x"), "REFUSES TO RUN")
})

test_that("a remote client hostname is refused unless consent is given", {
  withr::local_envvar(clean_env)
  expect_no_error(check_not_hosted("localhost"))
  expect_error(check_not_hosted("shiny.example.org"), "not localhost")
  withr::local_envvar(consent)
  expect_no_error(check_not_hosted("shiny.example.org"))
})

test_that("the banner wraps and boxes its text", {
  b = refusal_banner("Shiny Server")
  lines = strsplit(b, "\n")[[1]]
  widths = nchar(lines[nzchar(lines)])
  expect_true(all(widths == widths[1]))
  expect_gte(widths[1], 76)
  expect_match(b, "REFUSES TO RUN HERE")
  expect_match(b, "yes, really", fixed = TRUE)
})
