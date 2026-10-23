#' Command specifications
#'
#' A `shinyterm_command` bundles a program, its arguments and a working
#' directory, and can be passed as the `command` of [terminal_server()] or
#' [terminal_app()]. [claude_command()] and [codex_command()] build
#' specifications that launch the agent CLIs with their own sandboxes turned
#' on, so the agent is confined to the project directory without any wrapper
#' around the process.
#'
#' @param command Program to run.
#' @param args Character vector of arguments.
#' @param wd Working directory, or `NULL` for the current one.
#'
#' @return An object of class `shinyterm_command`: a list with `command`,
#'   `args` and `wd`.
#' @export
#' @examples
#' terminal_command("htop")
#' claude_command(wd = "~/project", allowed_domains = "github.com")
#' codex_command(wd = "~/project", sandbox = "read-only")
terminal_command = function(command, args = character(), wd = NULL) {
  stopifnot(is.character(command), length(command) == 1)
  if (!is.null(wd)) wd = path.expand(wd)
  structure(
    list(command = command, args = as.character(args), wd = wd),
    class = "shinyterm_command"
  )
}

#' @export
format.shinyterm_command = function(x, ..., max_width = 100) {
  out = paste(c(x$command, x$args), collapse = " ")
  if (nchar(out) > max_width) out = paste0(substr(out, 1, max_width - 1), "\u2026")
  out
}

#' @export
print.shinyterm_command = function(x, ...) {
  cat("<shinyterm_command>\n")
  cat("  command:", x$command, "\n")
  if (length(x$args)) cat("  args:   ", paste(x$args, collapse = " "), "\n")
  if (!is.null(x$wd)) cat("  wd:     ", x$wd, "\n")
  invisible(x)
}

#' @rdname terminal_command
#'
#' @description
#' `claude_command()` launches Claude Code with its sandbox enabled through a
#' `--settings` JSON argument. The sandbox confines Bash commands (and their
#' children) to `wd`, the `add_dir` directories and the temp directory for
#' writes, with no network access unless `allowed_domains` opens some hosts.
#' Reads are allowed almost everywhere by default; pass `deny_read = "~/"`
#' with `allow_read = "."` to restrict reads to the project. The Read and Edit
#' tools are governed by Claude's permission rules rather than the sandbox, so
#' `permission_mode` and `add_dir` control those.
#'
#' @param sandbox Enable the agent's sandbox. For Codex, one of
#'   `"workspace-write"`, `"read-only"` or `"danger-full-access"`.
#' @param allow_write,deny_write,allow_read,deny_read Character vectors of
#'   paths for the Claude sandbox's `filesystem` settings. Paths may be
#'   absolute, relative to `wd`, or start with `~`.
#' @param allowed_domains Hosts sandboxed commands may reach (Claude's
#'   `network.allowedDomains`). Empty by default, i.e. no network.
#' @param strict With `TRUE`, Claude cannot re-run a blocked command outside
#'   the sandbox (`allowUnsandboxedCommands = FALSE`) and refuses to start if
#'   the sandbox is unavailable (`failIfUnavailable = TRUE`).
#' @param permission_mode Claude's `--permission-mode` for the session, e.g.
#'   `"acceptEdits"` or `"plan"`; `NULL` keeps the default.
#' @param add_dir Additional directories the agent may work in (`--add-dir`).
#' @param settings Named list merged into the generated Claude settings (later
#'   values win), for anything not covered by the arguments.
#' @export
claude_command = function(
  wd = NULL,
  sandbox = TRUE,
  allow_write = NULL,
  deny_write = NULL,
  allow_read = NULL,
  deny_read = NULL,
  allowed_domains = NULL,
  strict = TRUE,
  permission_mode = NULL,
  add_dir = NULL,
  settings = list(),
  args = character(),
  command = "claude"
) {
  generated = list()
  if (isTRUE(sandbox)) {
    filesystem = drop_nulls(list(
      allowWrite = as_json_array(allow_write),
      denyWrite = as_json_array(deny_write),
      allowRead = as_json_array(allow_read),
      denyRead = as_json_array(deny_read)
    ))
    network = drop_nulls(list(allowedDomains = as_json_array(allowed_domains)))
    generated$sandbox = drop_nulls(list(
      enabled = TRUE,
      allowUnsandboxedCommands = !strict,
      failIfUnavailable = strict,
      filesystem = if (length(filesystem)) filesystem,
      network = if (length(network)) network
    ))
  }
  settings = utils::modifyList(generated, settings)

  extra = character()
  if (length(settings)) {
    extra = c(extra, "--settings", settings_json(settings))
  }
  if (!is.null(permission_mode)) {
    extra = c(extra, "--permission-mode", permission_mode)
  }
  if (length(add_dir)) {
    extra = c(extra, "--add-dir", path.expand(add_dir))
  }

  terminal_command(command, c(args, extra), wd)
}

#' @rdname terminal_command
#'
#' @description
#' `codex_command()` launches Codex with `--sandbox` (default
#' `"workspace-write"`: edits and commands confined to `wd`, `add_dir` and
#' `writable_roots`, no network unless `network = TRUE`) and
#' `--ask-for-approval`.
#'
#' @param approval Codex's approval policy: `"on-request"` (the model asks
#'   when it wants to leave the sandbox) or `"never"`.
#' @param network Allow outbound network access inside Codex's workspace-write
#'   sandbox.
#' @param writable_roots Extra directories Codex may write to in
#'   workspace-write mode.
#' @param config Named list of Codex config overrides passed as `-c key=value`
#'   (nested keys as dotted names; vectors become TOML arrays).
#' @export
codex_command = function(
  wd = NULL,
  sandbox = c("workspace-write", "read-only", "danger-full-access"),
  approval = c("on-request", "never"),
  network = FALSE,
  writable_roots = NULL,
  add_dir = NULL,
  config = list(),
  args = character(),
  command = "codex"
) {
  sandbox = match.arg(sandbox)
  approval = match.arg(approval)

  overrides = list()
  if (sandbox == "workspace-write") {
    if (isTRUE(network)) overrides$sandbox_workspace_write.network_access = TRUE
    if (length(writable_roots)) {
      overrides$sandbox_workspace_write.writable_roots = normalizePath(
        path.expand(writable_roots),
        mustWork = FALSE
      )
    }
  }
  overrides = utils::modifyList(overrides, config)

  extra = c("--sandbox", sandbox, "--ask-for-approval", approval)
  for (dir in add_dir) {
    extra = c(extra, "--add-dir", path.expand(dir))
  }
  for (key in names(overrides)) {
    extra = c(extra, "-c", paste0(key, "=", toml_value(overrides[[key]])))
  }

  terminal_command(command, c(args, extra), wd)
}

# Resolves the command/args/wd triple used by terminal_server() and
# terminal_app(): a shinyterm_command contributes its parts, with explicit
# `args` appended and an explicit `wd` taking precedence.
#
# command: a program name or a shinyterm_command
# args: extra arguments
# wd: working directory override, or NULL

resolve_command = function(command, args = character(), wd = NULL) {
  if (!inherits(command, "shinyterm_command")) {
    command = terminal_command(command, wd = wd)
  }
  list(
    command = command$command,
    args = c(command$args, as.character(args)),
    wd = if (!is.null(wd)) path.expand(wd) else command$wd
  )
}

# Marks a character vector so toJSON(auto_unbox = TRUE) keeps a single path
# as a one-element array, which the settings schema requires.

as_json_array = function(x) {
  if (is.null(x)) NULL else I(as.character(x))
}

drop_nulls = function(x) {
  x[!vapply(x, is.null, logical(1))]
}

settings_json = function(settings) {
  as.character(jsonlite::toJSON(settings, auto_unbox = TRUE))
}

# Encodes an R value as a TOML literal for `codex -c key=value`: scalars as
# themselves (strings quoted), longer vectors as arrays.
#
# x: a logical, numeric or character vector

toml_value = function(x) {
  encode = function(v) {
    if (is.logical(v)) tolower(as.character(v))
    else if (is.numeric(v)) as.character(v)
    else as.character(jsonlite::toJSON(as.character(v), auto_unbox = FALSE))
  }
  if (length(x) == 1 && !is.list(x)) {
    if (is.character(x)) return(as.character(jsonlite::toJSON(x, auto_unbox = TRUE)))
    return(encode(x))
  }
  if (is.character(x)) return(encode(x))
  paste0("[", paste(vapply(x, encode, ""), collapse = ", "), "]")
}
