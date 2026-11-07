# Regenerates the README screenshots in man/figures/ by driving the apps in
# headless Chrome (chromote, through shinytest2).
#
# Run from the package root, with the current shinyterm and shinytabs
# installed (the apps run in a child R process that uses the installed
# packages for their static files):
#
#   Rscript tools/screenshots.R                # every figure
#   Rscript tools/screenshots.R shell tabs     # only some
#
# The claude and codex figures start real agent sessions in a scratch project
# and send each a one-line prompt, so they need both CLIs logged in and use a
# little of their quota.

Sys.setenv(NOT_CRAN = "true")
library(shinyterm)

figures_dir = "man/figures"
stopifnot(dir.exists(figures_dir))
pkg_dir = normalizePath(".")

# Terminal font for the figures: Hack at 13px (the font used in herdr),
# falling back to common monospace fonts where Hack is not installed.
term_options = list(
  fontFamily = "Hack, Menlo, Consolas, 'DejaVu Sans Mono', monospace",
  fontSize = 13
)

# Terminal helpers -----------------------------------------------------------

term_js = function(id) {
  paste0("document.getElementById('", id, "')._shinyterm.term")
}

# Types `text` into the terminal as if from the keyboard.
type = function(app, text, id = "term-term") {
  app$run_js(paste0(term_js(id), ".input(", jsonlite::toJSON(text, auto_unbox = TRUE), ", true)"))
}

# The visible rows of the terminal as one string.
screen = function(app, id = "term-term") {
  app$get_js(paste0(
    "(() => { const t = ", term_js(id), "; const b = t.buffer.active; const out = [];",
    "for (let i = b.viewportY; i < b.viewportY + t.rows; i++) {",
    "  const l = b.getLine(i); out.push(l ? l.translateToString(true) : ''); }",
    "return out.join('\\n'); })()"
  ))
}

# Waits until the screen matches `pattern`, then until it stops changing for
# `settle` seconds (so spinners and streamed replies have finished).
wait_for_screen = function(app, pattern, timeout = 180, settle = 0, id = "term-term") {
  end = Sys.time() + timeout
  repeat {
    s = screen(app, id)
    if (grepl(pattern, s, perl = TRUE)) break
    if (Sys.time() > end) {
      cat(s, "\n")
      stop("timed out waiting for /", pattern, "/", call. = FALSE)
    }
    Sys.sleep(0.5)
  }
  if (settle > 0) {
    last = s
    stable_since = Sys.time()
    while (Sys.time() < end && difftime(Sys.time(), stable_since, units = "secs") < settle) {
      Sys.sleep(0.5)
      s = screen(app, id)
      if (!identical(s, last)) {
        last = s
        stable_since = Sys.time()
      }
    }
  }
  invisible(s)
}

start_app = function(app_obj, width = 960, height = 560, id = "term-term") {
  app = shinytest2::AppDriver$new(
    app_obj,
    width = width,
    height = height,
    timeout = 20000,
    load_timeout = 20000
  )
  app$wait_for_js("document.documentElement.dataset.bsTheme === 'dark'")
  app$wait_for_js(paste(term_js(id), "!= null"))
  app
}

save_figure = function(app, name) {
  out = file.path(figures_dir, name)
  tmp = tempfile(fileext = ".png")
  app$get_screenshot(tmp)
  file.copy(tmp, out, overwrite = TRUE)
  message("wrote ", out)
}

# A scratch project for the agents to start in.
demo_project = function() {
  dir = file.path(tempfile("shinyterm-"), "demo-project")
  dir.create(dir, recursive = TRUE)
  writeLines("# Demo project", file.path(dir, "README.md"))
  normalizePath(dir)
}

# Accepts the agent's "trust this folder" question if it asks one.
accept_trust = function(app, ready) {
  s = wait_for_screen(app, paste0("(?i)trust|", ready), timeout = 60)
  if (grepl("(?i)trust", s, perl = TRUE) && !grepl(ready, s, perl = TRUE)) {
    type(app, "\r")
    wait_for_screen(app, ready, timeout = 60, settle = 1)
  }
}

# Figures --------------------------------------------------------------------

figures = list(
  shell = function() {
    app = start_app(terminal_app(terminal_command("zsh", "-f", wd = pkg_dir), mode = "dark", options = term_options, token = FALSE))
    on.exit(app$stop())
    wait_for_screen(app, "%")
    type(app, "echo 'hello from shinyterm' && uname -sm\r")
    type(app, "ls -l | head -8\r")
    type(app, "printf '\\e[1;32mcolor\\e[0m \\e[33mworks\\e[0m\\n'\r")
    wait_for_screen(app, "color works\\n.*%", settle = 1)
    save_figure(app, "shell.png")
  },

  tabs = function() {
    id = "terms-tabs-tab1-term-term"
    app = start_app(terminal_tabs_app(mode = "dark", options = term_options, wd = pkg_dir, token = FALSE), width = 1000, height = 600, id = id)
    on.exit(app$stop())
    wait_for_screen(app, "\\S", id = id, settle = 2)
    app$click(selector = "#terms-tabs-tabset .shinytabs-add-btn")
    app$wait_for_js("!document.querySelector('#terms-tabs-tabset .shinytabs-menu').hidden")
    app$run_js("document.querySelector('#terms-tabs-tabset .shinytabs-menu-item').focus()")
    Sys.sleep(0.5)
    save_figure(app, "tabs.png")
  },

  claude = function() {
    project = demo_project()
    cmd = claude_command(
      wd = project,
      deny_read = "~/",
      allow_read = ".",
      permission_mode = "acceptEdits"
    )
    app = start_app(terminal_app(cmd, mode = "dark", options = term_options, token = FALSE))
    on.exit(app$stop())
    accept_trust(app, "❯|>")
    type(app, "Say hello in one sentence and name the sandbox restrictions you are running under.")
    Sys.sleep(0.5)
    type(app, "\r")
    wait_for_screen(app, "(?m)^\\S.* for \\d+s", settle = 3)
    save_figure(app, "claude.png")
  },

  codex = function() {
    project = demo_project()
    app = start_app(terminal_app(codex_command(wd = project), mode = "dark", options = term_options, token = FALSE))
    on.exit(app$stop())
    accept_trust(app, "OpenAI Codex")
    wait_for_screen(app, "OpenAI Codex", settle = 2)
    type(app, "Say hello in one sentence and name the sandbox mode you are running under.")
    Sys.sleep(0.5)
    type(app, "\r")
    wait_for_screen(app, "Worked for", settle = 3)
    save_figure(app, "codex.png")
  }
)

which = commandArgs(trailingOnly = TRUE)
if (length(which) == 0) which = names(figures)
unknown = setdiff(which, names(figures))
if (length(unknown)) stop("unknown figure: ", paste(unknown, collapse = ", "), call. = FALSE)

for (name in which) {
  message("== ", name)
  figures[[name]]()
}
