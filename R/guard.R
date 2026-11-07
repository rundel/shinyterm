# Refuses to run on hosted Shiny deployments.
#
# shinyterm gives every visitor an interactive process running as the app's
# user. On a laptop that is a convenience; on Shiny Server, Posit Connect,
# shinyapps.io, ShinyProxy or any host that serves the app to other people it
# is remote code execution. The checks below detect those contexts from the
# environment variables the hosts set and from the Host and Origin headers of
# the session's WebSocket request (which also catch a page on another site
# connecting to an app on localhost), and abort unless the operator has set
# the consent variable to its exact value.

consent_var = "SHINYTERM_I_ACCEPT_THAT_RUNNING_A_SHELL_IN_A_HOSTED_SHINY_APP_IS_DUMB_AND_THE_CONSEQUENCES_ARE_MINE"
consent_value = "yes, really"

consent_given = function() {
  identical(Sys.getenv(consent_var), consent_value)
}

# Names the hosting product the current process appears to run under, or NULL.
#
# env: named character vector of environment variables (for tests)

hosted_context = function(env = Sys.getenv()) {
  get = function(name) {
    val = env[name]
    if (is.na(val)) "" else as.character(val)
  }
  if (nzchar(get("SHINY_SERVER_VERSION"))) return("Shiny Server")
  if (toupper(get("RSTUDIO_PRODUCT")) == "CONNECT" || nzchar(get("CONNECT_SERVER"))) return("Posit Connect")
  if (get("R_CONFIG_ACTIVE") == "rsconnect") return("shinyapps.io / Posit Connect")
  if (nzchar(get("SHINYPROXY_USERNAME")) || nzchar(get("SHINYPROXY_USERGROUPS"))) return("ShinyProxy")
  if (nzchar(get("SPACE_HOST"))) return("Hugging Face Spaces")
  NULL
}

# The host part of a Host header or an origin/URL: no scheme, path or port.
# IPv6 literals keep their brackets.
#
# x: a Host header value ("localhost:1234") or an origin ("http://[::1]:80")

host_name = function(x) {
  x = sub("^[A-Za-z][A-Za-z0-9+.-]*://", "", x)
  x = sub("/.*$", "", x)
  if (startsWith(x, "[")) return(sub("^(\\[[^]]*\\]).*$", "\\1", x))
  if (grepl(":.*:", x)) return(x)
  sub(":[0-9]*$", "", x)
}

# Whether a host name refers to this machine. NULL or "" (unknown, as under
# testServer(), whose mock session has no request headers) counts as local.
#
# host: a Host header value, an origin, or a bare host name

client_is_local = function(host) {
  if (is.null(host) || !nzchar(host)) return(TRUE)
  tolower(host_name(host)) %in% c("localhost", "127.0.0.1", "[::1]", "::1", "0.0.0.0")
}

# The Host and Origin headers of the request that opened a session's
# WebSocket. Unlike session$clientData, which the client reports itself, a
# browser cannot forge these, so they reveal a page from another site (whose
# Origin is that site) or a DNS rebinding attack (whose Host is the
# attacker's name) talking to the app. NULL entries when absent.
#
# session: a shiny session

request_headers = function(session) {
  # MockShinySession warns that its request is not realistic; it has no
  # headers, which counts as local.
  req = suppressWarnings(session$request)
  get = function(name) {
    val = if (is.environment(req) || is.list(req)) req[[name]]
    if (is.character(val) && length(val) == 1) val
  }
  list(host = get("HTTP_HOST"), origin = get("HTTP_ORIGIN"))
}

# Aborts with the refusal banner when a hosted context, a remote client or a
# page from another site is detected and consent has not been given.
#
# host: the request's Host header (or a host name), or NULL to skip
# origin: the request's Origin header, or NULL to skip

check_not_hosted = function(host = NULL, origin = NULL) {
  if (consent_given()) return(invisible(NULL))
  where = hosted_context()
  if (is.null(where) && !client_is_local(host)) {
    where = paste0("a server reached as '", host_name(host), "' (not localhost)")
  }
  if (is.null(where) && !client_is_local(origin)) {
    where = paste0("localhost, but the connection came from a page at '", origin, "'")
  }
  if (is.null(where)) return(invisible(NULL))
  stop(refusal_banner(where), call. = FALSE)
}

# Access tokens. With a token, a terminal only starts for a page whose URL
# carries it (?shinyterm_token=...), which keeps other local users and
# programs out even though they can reach the port. The app wrappers make one
# per app and open the browser at the tokenized URL.

token_param = "shinyterm_token"

# A random token from the operating system's generator (not R's, which a
# seed makes predictable and which the token must not disturb).

new_token = function() {
  bytes = .Call(shinyterm_random_bytes, 24L)
  paste(format(as.hexmode(as.integer(bytes)), width = 2), collapse = "")
}

# Normalizes the `token` argument of the app wrappers: TRUE makes a new
# token, FALSE or NULL disables it, a string is used as is.

resolve_token = function(token) {
  if (isTRUE(token)) return(new_token())
  if (isFALSE(token) || is.null(token)) return(NULL)
  if (is.character(token) && length(token) == 1 && nzchar(token)) return(token)
  stop("`token` must be TRUE, FALSE or a non-empty string", call. = FALSE)
}

# Whether the page's URL carries `token` (always TRUE without one).
#
# session: a shiny session
# token: the expected token, or NULL

token_ok = function(session, token) {
  if (is.null(token)) return(TRUE)
  search = shiny::isolate(session$clientData$url_search)
  if (is.null(search) || !nzchar(search)) return(FALSE)
  given = shiny::parseQueryString(search)[[token_param]]
  identical(given, token)
}

token_url = function(url, token) {
  sep = if (grepl("?", url, fixed = TRUE)) "&" else "?"
  paste0(url, sep, token_param, "=", token)
}

# shinyApp() options for an app protected by `token`: the browser (or the
# IDE's viewer, through the shiny.launch.browser option) opens at the
# tokenized URL, which is also printed.
#
# token: the token, or NULL for no options

token_app_options = function(token) {
  if (is.null(token)) return(list())
  list(launch.browser = function(url) {
    url = token_url(url, token)
    launch = getOption("shiny.launch.browser", interactive())
    if (is.function(launch)) launch(url) else if (isTRUE(launch)) utils::browseURL(url)
  })
}

# Printed into a terminal whose page lacks the token.

token_refusal = paste0(
  "\r\n\x1b[1mshinyterm: this terminal needs the access token.\x1b[0m\r\n",
  "Open the app through the URL printed in the R console when it started,\r\n",
  "which ends in ?", token_param, "=...\r\n"
)

refusal_banner = function(where) {
  lines = c(
    "",
    "shinyterm REFUSES TO RUN HERE",
    "",
    paste0("This app appears to be running on ", where, "."),
    "",
    "shinyterm hands every visitor an interactive process running as the",
    "server's user, with that user's files, credentials and network. On a",
    "hosted server that is remote code execution, not a feature. The",
    "security implications of this package have not been thought through",
    "at all, and nothing in it is designed to stop a visitor from doing",
    "whatever the server's user can do.",
    "",
    "If you have read this, understood it, and still want to do it, set",
    "the environment variable",
    "",
    paste0("  ", consent_var),
    "",
    paste0("to exactly \"", consent_value, "\" and restart the app. Every"),
    "consequence is then yours.",
    ""
  )
  banner_box(lines)
}

banner_box = function(lines, width = 76) {
  width = max(width, nchar(lines) + 6)
  inner = width - 6
  wrap = function(line) {
    if (!nzchar(line) || nchar(line) <= inner) return(line)
    strwrap(line, width = inner)
  }
  lines = unlist(lapply(lines, wrap))
  pad = vapply(lines, function(l) {
    paste0("!! ", formatC(l, width = -inner), " !!")
  }, "")
  bar = strrep("!", width)
  paste(c("", bar, bar, pad, bar, bar), collapse = "\n")
}
