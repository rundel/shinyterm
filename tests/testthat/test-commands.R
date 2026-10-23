settings_of = function(cmd) {
  i = match("--settings", cmd$args)
  jsonlite::fromJSON(cmd$args[[i + 1]], simplifyVector = FALSE)
}

test_that("terminal_command and resolve_command combine parts", {
  cmd = terminal_command("htop", c("-d", "5"), wd = "~")
  expect_s3_class(cmd, "shinyterm_command")
  expect_equal(cmd$wd, path.expand("~"))
  expect_match(format(cmd), "^htop -d 5$")

  r = resolve_command(cmd, args = "--tree")
  expect_equal(r$args, c("-d", "5", "--tree"))
  expect_equal(r$wd, path.expand("~"))
  expect_equal(resolve_command(cmd, wd = "/tmp")$wd, "/tmp")

  r = resolve_command("bash", args = "-l")
  expect_equal(r, list(command = "bash", args = "-l", wd = NULL))
})

test_that("claude_command enables a strict sandbox by default", {
  cmd = claude_command(wd = "~/proj")
  expect_equal(cmd$command, "claude")
  expect_equal(cmd$wd, path.expand("~/proj"))
  s = settings_of(cmd)
  expect_true(s$sandbox$enabled)
  expect_false(s$sandbox$allowUnsandboxedCommands)
  expect_true(s$sandbox$failIfUnavailable)
  expect_null(s$sandbox$filesystem)
  expect_null(s$sandbox$network)
  expect_false("--permission-mode" %in% cmd$args)
})

test_that("claude_command maps filesystem, network, permission and extra settings", {
  cmd = claude_command(
    deny_read = "~/", allow_read = ".", allow_write = c("/tmp/a", "/tmp/b"),
    allowed_domains = "github.com", strict = FALSE,
    permission_mode = "acceptEdits", add_dir = c("~/x", "~/y"),
    settings = list(sandbox = list(excludedCommands = "git *"), model = "sonnet"),
    args = "--verbose"
  )
  s = settings_of(cmd)
  expect_equal(s$sandbox$filesystem$denyRead, list("~/"))
  expect_equal(s$sandbox$filesystem$allowRead, list("."))
  expect_equal(s$sandbox$filesystem$allowWrite, list("/tmp/a", "/tmp/b"))
  expect_equal(s$sandbox$network$allowedDomains, list("github.com"))
  expect_true(s$sandbox$allowUnsandboxedCommands)
  expect_false(s$sandbox$failIfUnavailable)
  expect_equal(s$sandbox$excludedCommands, "git *")
  expect_equal(s$model, "sonnet")
  expect_equal(cmd$args[1], "--verbose")
  expect_equal(cmd$args[match("--permission-mode", cmd$args) + 1], "acceptEdits")
  expect_equal(utils::tail(cmd$args, 3), c("--add-dir", path.expand("~/x"), path.expand("~/y")))
})

test_that("claude_command with sandbox = FALSE passes only the user settings", {
  expect_false("--settings" %in% claude_command(sandbox = FALSE)$args)
  cmd = claude_command(sandbox = FALSE, settings = list(model = "opus"))
  expect_equal(settings_of(cmd), list(model = "opus"))
})

test_that("codex_command builds sandbox, approval and config flags", {
  cmd = codex_command(wd = "~/proj")
  expect_equal(cmd$args, c("--sandbox", "workspace-write", "--ask-for-approval", "on-request"))

  cmd = codex_command(
    sandbox = "workspace-write", approval = "never", network = TRUE,
    writable_roots = c("/tmp/a", "/tmp/b"), add_dir = "~/x",
    config = list(model = "o3", `shell_environment_policy.inherit` = "all", n = 2L, flags = c(TRUE, FALSE))
  )
  a = cmd$args
  expect_equal(a[match("--add-dir", a) + 1], path.expand("~/x"))
  cfg = a[which(a == "-c") + 1]
  expect_true("sandbox_workspace_write.network_access=true" %in% cfg)
  expect_true('sandbox_workspace_write.writable_roots=["/tmp/a","/tmp/b"]' %in% cfg)
  expect_true('model="o3"' %in% cfg)
  expect_true('shell_environment_policy.inherit="all"' %in% cfg)
  expect_true("n=2" %in% cfg)
  expect_true("flags=[true, false]" %in% cfg)

  cmd = codex_command(sandbox = "read-only", network = TRUE, writable_roots = "/tmp")
  expect_false(any(grepl("sandbox_workspace_write", cmd$args)))
  expect_error(codex_command(sandbox = "nope"))
})
