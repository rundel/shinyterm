# Refuses to run on hosted Shiny deployments.
#
# shinyterm gives every visitor an interactive process running as the app's
# user. On a laptop that is a convenience; on Shiny Server, Posit Connect,
# shinyapps.io, ShinyProxy or any host that serves the app to other people it
# is remote code execution. The checks below detect those contexts from the
# environment variables the hosts set, and from the hostname the browser used
# to reach the app, and abort unless the operator has set the consent variable
# to its exact value.

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

# Whether the hostname the browser used refers to this machine. NULL (unknown)
# counts as local, as does the name shiny's MockShinySession reports under
# testServer().
#
# hostname: session$clientData$url_hostname

client_is_local = function(hostname) {
  if (is.null(hostname) || !nzchar(hostname)) return(TRUE)
  tolower(hostname) %in% c("localhost", "127.0.0.1", "::1", "[::1]", "0.0.0.0", "mocksession")
}

# Aborts with the refusal banner when a hosted context or a remote client is
# detected and consent has not been given.
#
# hostname: the client's hostname, or NULL to check the environment only

check_not_hosted = function(hostname = NULL) {
  if (consent_given()) return(invisible(NULL))
  where = hosted_context()
  if (is.null(where) && !client_is_local(hostname)) {
    where = paste0("a server reached as '", hostname, "' (not localhost)")
  }
  if (is.null(where)) return(invisible(NULL))
  stop(refusal_banner(where), call. = FALSE)
}

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
