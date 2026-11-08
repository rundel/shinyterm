clean_env = c(
  SHINY_SERVER_VERSION = NA, RSTUDIO_PRODUCT = NA, CONNECT_SERVER = NA,
  R_CONFIG_ACTIVE = NA, SHINYPROXY_USERNAME = NA, SHINYPROXY_USERGROUPS = NA,
  SPACE_HOST = NA
)
consent = stats::setNames("yes, really", shinyterm:::consent_var)

test_that("hosted_context recognizes the hosting products", {
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
  expect_true(client_is_local("localhost:4321"))
  expect_true(client_is_local("[::1]:4321"))
  expect_true(client_is_local("http://127.0.0.1:4321"))
  expect_false(client_is_local("shiny.example.org"))
  expect_false(client_is_local("192.168.1.20:4321"))
  expect_false(client_is_local("https://evil.example.com"))
  expect_false(client_is_local("null"))
  expect_false(client_is_local("mocksession"))
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

test_that("a remote host or a foreign origin is refused unless consent is given", {
  withr::local_envvar(clean_env)
  expect_no_error(check_not_hosted("localhost:4321", "http://localhost:4321"))
  expect_no_error(check_not_hosted("127.0.0.1:4321", NULL))
  expect_error(check_not_hosted("shiny.example.org"), "not localhost")
  expect_error(
    check_not_hosted("127.0.0.1:4321", "https://evil.example.com"),
    "evil.example.com"
  )
  withr::local_envvar(consent)
  expect_no_error(check_not_hosted("shiny.example.org"))
  expect_no_error(check_not_hosted("127.0.0.1:4321", "https://evil.example.com"))
})

test_that("request_headers reads Host and Origin from the session's request", {
  req = new.env()
  req$HTTP_HOST = "127.0.0.1:4321"
  req$HTTP_ORIGIN = "https://evil.example.com"
  expect_equal(
    request_headers(list(request = req)),
    list(host = "127.0.0.1:4321", origin = "https://evil.example.com")
  )
  expect_equal(request_headers(list(request = NULL)), list(host = NULL, origin = NULL))
})

test_that("tokens are random hex, checked against the URL and added to it", {
  a = new_token()
  expect_match(a, "^[0-9a-f]{48}$")
  set.seed(1)
  b = new_token()
  set.seed(1)
  expect_false(identical(b, new_token()))

  expect_null(resolve_token(FALSE))
  expect_equal(resolve_token("abc"), "abc")
  expect_match(resolve_token(TRUE), "^[0-9a-f]{48}$")
  expect_error(resolve_token(""), "token")

  session = function(search) list(clientData = list(url_search = search))
  expect_true(token_ok(session(""), NULL))
  expect_true(token_ok(session("?shinyterm_token=abc"), "abc"))
  expect_true(token_ok(session("?x=1&shinyterm_token=abc"), "abc"))
  expect_false(token_ok(session("?shinyterm_token=abd"), "abc"))
  expect_false(token_ok(session(""), "abc"))

  expect_equal(token_url("http://127.0.0.1:1/", "abc"), "http://127.0.0.1:1/?shinyterm_token=abc")
  expect_equal(token_url("http://h/?a=1", "abc"), "http://h/?a=1&shinyterm_token=abc")
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

test_that("token_app() adds the tokenized launch and keeps the app's onStart", {
  expect_match(terminal_token(), "^[0-9a-f]{48}$")
  expect_null(terminal_token(FALSE))
  expect_equal(terminal_token("abc"), "abc")

  started = FALSE
  app = shiny::shinyApp("x", function(input, output, session) NULL, onStart = function() started <<- TRUE)
  expect_identical(token_app(app, NULL), app)

  tokened = token_app(app, "abc")
  expect_true(is.function(tokened$options$launch.browser))
  expect_message(tokened$onStart(), "shinyterm_token=abc")
  expect_true(started)

  opened = NULL
  withr::local_options(shiny.launch.browser = function(url) opened <<- url)
  tokened$options$launch.browser("http://127.0.0.1:1/")
  expect_equal(opened, "http://127.0.0.1:1/?shinyterm_token=abc")

  expect_error(token_app("not an app", "abc"))
})
