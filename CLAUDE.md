# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`shinyterm` is an R package that embeds an xterm.js terminal in a Shiny app and wires it to a local process running in a pseudo-terminal (via `processx`). It exists to run shells and agent CLIs (`claude`, `codex`) inside a Shiny app on the user's own laptop. It is deliberately not safe for hosted deployment: the README opens with a large warning, and `R/guard.R` makes the UI and server refuse to run on Shiny Server, Posit Connect, shinyapps.io, ShinyProxy, Hugging Face Spaces, or when the browser reaches the app through a non-localhost hostname. Keep that guard and that framing intact; do not add features that make hosted use easier.

## Commands

Run R through `Rscript -e`. The package has C code in `src/`, so use `devtools`/`pkgload` (which compile it) rather than sourcing files.

```sh
Rscript -e 'devtools::document()'                 # regenerate NAMESPACE and man/ from roxygen
Rscript -e 'devtools::test()'                     # run all tests
Rscript -e 'devtools::test(filter = "server")'    # one test file (tests/testthat/test-server.R)
Rscript -e 'devtools::check()'                    # full R CMD check
Rscript -e 'devtools::load_all(); terminal_app()' # try the app interactively (your $SHELL)
```

Tests in `test-app.R` and `test-tabs-app.R` drive a real browser through `shinytest2`/`chromote` and are skipped on CRAN, on Windows, or when those packages are missing. They run the app in a child R process that uses the *installed* shinyterm and shinytabs for static resources, so reinstall both (`devtools::install()` in each) after changing anything under `inst/` or the shinytabs server before trusting a browser-test result. `test-server.R` uses `shiny::testServer()` and advances the `later` polling loop by hand with a local `tick()` helper (sleep, then `later::run_now()`), because output polling happens outside the reactive graph.

`NAMESPACE` and `man/` are roxygen output. Edit the roxygen comments in `R/` and rerun `document()`; never edit them by hand.

## Architecture

The package is a Shiny module pair plus a thin C shim. The pieces that need to be understood together:

### Browser side: `inst/shinyterm/shinyterm.js`

A Shiny input binding (`shinyterm.terminal`) wrapping xterm.js 5.5.0 and its fit addon (vendored in `inst/xterm/`). The element's input value (`input$<id>` on the server, element id `<ns>-term`) is only its size, `{rows, cols, seq}`. Keystrokes travel separately as `<id>_data` events with `priority: "event"`, carrying every chunk the server has not yet acknowledged plus a `from` index. The server replies with an `ack`; the client drops acknowledged chunks. This indexed re-send protocol is what makes input survive Shiny's input batching without drops or duplicates, so changes to either side must keep the indices in step.

Server to client traffic is a single `"shinyterm"` custom message type carrying the element id and any of `write`, `ack`, `clear`, `focus`, `stdin`. It goes through `sendCustomMessage()` (not `sendInputMessage()`) so output can be pushed outside a reactive flush.

Colour palettes (light/dark) live in this file. With `data-theme="auto"` a `MutationObserver` on `<html data-bs-theme>` follows bslib's colour mode; user colours from `options$theme` are layered over the chosen palette.

### Server side: `R/terminal-server.R`

`terminal_server()` starts `processx::process$new(pty = TRUE)` sized to the client's reported rows/cols. Output is polled on a `later::later()` timer (`interval` ms, default 50) rather than a reactive timer, so an idle process never marks the session busy. A generation counter (`priv$loop`) retires an old polling loop when `restart()` replaces the process. Per-session mutable state lives in a `priv` environment; only `alive`, `exit_status` and `output` are exposed through `reactiveValues`.

`terminal_env()` builds the child's environment explicitly (no `"current"` marker) so inherited variables can be removed. By default it strips `CLAUDE*`, `VSCODE_*`, `POSITRON*`, `RSTUDIO*` and `TERM_PROGRAM`, which otherwise make a nested `claude` think it is a child session or inside an IDE.

### Resize: `R/pty.R` and `src/resize.c`

On unix the pty is resized live with `TIOCSWINSZ` on the master fd (obtained from processx's output connection), which delivers `SIGWINCH` to the child. The C function returns `FALSE` on Windows, where the only option is `restart()`.

### Tabbed terminals: `R/terminal-tabs.R`

`terminal_tabs_ui()` / `terminal_tabs_server()` put one `terminal_server()` per tab inside a `shinytabs::tabset_server()` (the sister package in `../shinytabs`, declared in `Imports` with a `Remotes` entry). Each tab is a module instance named `tabN` under the tabset's `"tabs"` namespace, and the terminal module inside it is called `"term"`, so a terminal element's id is `<id>-tabs-tabN-term-term`; the tests depend on that. `commands` is normalised by `terminal_commands()` to a named list of `shinyterm_command`s whose labels double as the tabset's type keys. The tab-server callback uses shinytabs' optional fifth `tab` argument to learn its tab id, keeps a per-tab observer that sets the status-dot icon from `alive()`, and `on_close` destroys that observer and kills the process. `can_close` returns a confirmation message while the process is alive, which shinytabs turns into a modal. `terminal_tabs_app()` shares `mode_toggle()` with `terminal_app()` and locks the toggle when any command is codex.

### Command specifications: `R/commands.R`

`terminal_command()` returns a `shinyterm_command` (command, args, wd). `claude_command()` and `codex_command()` build specs that turn on each agent's own sandbox: Claude via a `--settings` JSON argument (`sandbox.filesystem`, `sandbox.network`, `allowUnsandboxedCommands`, `failIfUnavailable`), Codex via `--sandbox`, `--ask-for-approval` and `-c key=value` TOML overrides. `resolve_command()` merges a spec with the extra `args`/`wd` that `terminal_server()` and `terminal_app()` accept. The agents' sandboxes are the intended confinement; the package adds no OS-level sandbox of its own.

### App wrapper: `R/terminal-app.R`

`terminal_app()` is a one-page `bslib` app around the module with a status badge, restart button and `bslib::input_dark_mode()` toggle. The toggle is disabled (via `inert`, with a tooltip) when the command is `codex`, because Codex reads terminal colours once at launch and does not re-read them.

## Conventions specific to this repo

- Assignment uses `=`, not `<-`. Functions from other packages are always called as `pkg::fun()`; nothing is imported into the namespace except the `useDynLib` directive.
- Internal helpers carry a short comment block above them describing purpose and arguments instead of roxygen; exported functions use full roxygen with markdown.
- The vendored xterm.js build in `inst/xterm/` is pinned in `R/dependencies.R` (`version = "5.5.0"`); update both together.
