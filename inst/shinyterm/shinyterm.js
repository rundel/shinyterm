// Shiny input binding for the shinyterm terminal element.
//
// The element's input value is its size ({rows, cols, seq}). Keystrokes are
// sent separately as <id>_data events carrying the chunks the server has not
// acknowledged yet (up to a size cap, the rest following each ack), indexed
// from `from`, so chunks coalesced by Shiny's input batching are never lost
// and chunks re-sent before an ack are never written twice. The server talks
// back with messages carrying any of: write (text to print) with n (its
// length as the server counts it), ack (last chunk index consumed), clear,
// focus and stdin (enable/disable keyboard input). Once a write has been
// rendered its n is added to a running total reported as <id>_written, which
// the server uses to stop reading output while the browser is too far
// behind. The server sends them as "shinyterm"
// custom messages carrying the element id, so output can be pushed from
// outside a reactive flush; receiveMessage() also serves sendInputMessage().
//
// The terminal is ghostterm (libghostty-vt in WebAssembly) or xterm.js, chosen
// by the element's data-emulator attribute. Both have the xterm.js API, so
// the binding only differs in how it gets the Terminal and FitAddon classes.
// ghostterm is an ES module loaded by ghostterm-loader.js and needs its
// WebAssembly module compiled first, so its terminal is created
// asynchronously: until then the input value is null (the server waits for a
// size before starting the process) and server messages are queued.
//
// Colors come from a light or dark palette chosen by the element's
// data-theme attribute. With "auto" the palette follows the page's Bootstrap
// color mode (the data-bs-theme attribute bslib's dark mode toggle sets on
// <html>), falling back to dark when the page has none. Colors from the
// user's options.theme are layered on top of the palette.
(function () {
  if (typeof Shiny === "undefined") return;

  var binding = new Shiny.InputBinding();

  var palettes = {
    dark: {
      background: "#1e1e1e",
      foreground: "#d4d4d4",
      cursor: "#d4d4d4",
      cursorAccent: "#1e1e1e",
      selectionBackground: "#264f78",
      black: "#000000",
      red: "#cd3131",
      green: "#0dbc79",
      yellow: "#e5e510",
      blue: "#2472c8",
      magenta: "#bc3fbc",
      cyan: "#11a8cd",
      white: "#e5e5e5",
      brightBlack: "#666666",
      brightRed: "#f14c4c",
      brightGreen: "#23d18b",
      brightYellow: "#f5f543",
      brightBlue: "#3b8eea",
      brightMagenta: "#d670d6",
      brightCyan: "#29b8db",
      brightWhite: "#ffffff"
    },
    light: {
      background: "#ffffff",
      foreground: "#1f2328",
      cursor: "#1f2328",
      cursorAccent: "#ffffff",
      selectionBackground: "#add6ff",
      black: "#000000",
      red: "#cd3131",
      green: "#00bc00",
      yellow: "#949800",
      blue: "#0451a5",
      magenta: "#bc05bc",
      cyan: "#0598bc",
      white: "#555555",
      brightBlack: "#666666",
      brightRed: "#cd3131",
      brightGreen: "#14ce14",
      brightYellow: "#b5ba00",
      brightBlue: "#0451a5",
      brightMagenta: "#bc05bc",
      brightCyan: "#0598bc",
      brightWhite: "#a5a5a5"
    }
  };

  function pageMode() {
    var mode = document.documentElement.dataset.bsTheme;
    return mode === "light" ? "light" : "dark";
  }

  function resolveTheme(mode, userTheme) {
    if (mode !== "light" && mode !== "dark") mode = pageMode();
    return Object.assign({}, palettes[mode], userTheme || {});
  }

  function applyTheme(el, st) {
    var theme = resolveTheme(st.mode, st.userTheme);
    st.term.options.theme = theme;
    el.style.backgroundColor = theme.background;
  }

  // The ghostterm classes, once ghostterm-loader.js has loaded them. The
  // loader may run before or after this script.
  function ghostterm() {
    if (window.shinytermGhostterm) return window.shinytermGhostterm;
    return new Promise(function (resolve) {
      document.addEventListener(
        "shinyterm:ghostterm",
        function () {
          resolve(window.shinytermGhostterm);
        },
        { once: true }
      );
    });
  }

  var emulators = {
    ghostterm: ghostterm,
    xterm: function () {
      return { Terminal: Terminal, FitAddon: FitAddon.FitAddon };
    }
  };

  // Input sends carry at most this many characters of chunks; a paste larger
  // than one chunk is split into pieces of this size first.
  var SEND_CAP = 16384;

  // A rendered-output total is reported once it is this far ahead of the
  // last report, or shortly after output stops.
  var WRITTEN_STEP = 16384;
  var WRITTEN_DELAY = 50;

  function sendChunks(st) {
    var chunks = [];
    var size = 0;
    for (var i = 0; i < st.chunks.length; i++) {
      if (chunks.length && size + st.chunks[i].length > SEND_CAP) break;
      chunks.push(st.chunks[i]);
      size += st.chunks[i].length;
    }
    st.sentTo = st.from + chunks.length;
    Shiny.setInputValue(
      st.id + "_data",
      { from: st.from, chunks: chunks },
      { priority: "event" }
    );
  }

  // Splits `d` into pieces of at most SEND_CAP characters without separating
  // the halves of a surrogate pair.
  function splitChunk(d) {
    if (d.length <= SEND_CAP) return [d];
    var out = [];
    var i = 0;
    while (i < d.length) {
      var end = Math.min(i + SEND_CAP, d.length);
      var c = d.charCodeAt(end - 1);
      if (end < d.length && c >= 0xd800 && c <= 0xdbff) end -= 1;
      out.push(d.slice(i, end));
      i = end;
    }
    return out;
  }

  function reportWritten(st) {
    if (st.writtenTimer) {
      clearTimeout(st.writtenTimer);
      st.writtenTimer = null;
    }
    st.reported = st.written;
    Shiny.setInputValue(st.id + "_written", st.written, { priority: "event" });
  }

  function wrote(st, n) {
    st.written += n;
    if (st.written - st.reported >= WRITTEN_STEP) {
      reportWritten(st);
    } else if (!st.writtenTimer) {
      st.writtenTimer = setTimeout(function () {
        st.writtenTimer = null;
        reportWritten(st);
      }, WRITTEN_DELAY);
    }
  }

  // Shows why the terminal could not be created in place of the terminal.
  function showError(el, text) {
    var box = document.createElement("div");
    box.className = "shinyterm-error";
    box.textContent = text;
    el.replaceChildren(box);
  }

  // Releases a terminal whose element has left the page: its observers,
  // timers and the emulator itself (ghostterm's WebAssembly state included).
  function dispose(el) {
    var st = el._shinyterm;
    if (!st) return;
    st.disposed = true;
    if (st.fitTimer) clearTimeout(st.fitTimer);
    if (st.writtenTimer) clearTimeout(st.writtenTimer);
    if (st.observer) st.observer.disconnect();
    if (st.themeObserver) st.themeObserver.disconnect();
    if (st.term) {
      try {
        st.term.dispose();
      } catch (e) {}
    }
    st.term = null;
    st.callback = null;
    el._shinyterm = null;
  }

  $.extend(binding, {
    find: function (scope) {
      return $(scope).find(".shinyterm");
    },

    initialize: function (el) {
      // Rebinding an element that is still set up (Shiny unbinds and binds
      // again when inputs are re-scanned) keeps its terminal.
      if (el._shinyterm) return;
      var opts = {};
      if (el.dataset.options) opts = JSON.parse(el.dataset.options);
      var mode = el.dataset.theme || "auto";
      var userTheme = opts.theme;
      opts.theme = resolveTheme(mode, userTheme);
      el.style.backgroundColor = opts.theme.background;

      var st = {
        id: el.id,
        term: null,
        fit: null,
        mode: mode,
        userTheme: userTheme,
        from: 0,
        sentTo: 0,
        chunks: [],
        written: 0,
        reported: 0,
        writtenTimer: null,
        pending: [],
        rows: null,
        cols: null,
        seq: 0,
        callback: null
      };
      el._shinyterm = st;

      var emulator = emulators[el.dataset.emulator] || emulators.ghostterm;
      var lib = emulator();
      if (typeof lib.then === "function") {
        lib.then(
          function (lib) {
            if (st.disposed) return;
            open(el, st, lib, opts);
            if (st.callback) st.callback(false);
          },
          function (err) {
            console.error("shinyterm: could not load ghostterm", err);
            showError(
              el,
              "shinyterm could not load the ghostterm terminal emulator " +
                "(details in the browser console). " +
                'Try emulator = "xterm".'
            );
          }
        );
      } else {
        open(el, st, lib, opts);
      }
    },

    getValue: function (el) {
      var st = el._shinyterm;
      if (!st || !st.term) return null;
      return { rows: st.rows, cols: st.cols, seq: st.seq };
    },

    subscribe: function (el, callback) {
      if (el._shinyterm) el._shinyterm.callback = callback;
    },

    // Shiny unbinds an element both when it is removed (a closed tab, a
    // re-rendered uiOutput) and before re-scanning; only the first frees it.
    unsubscribe: function (el) {
      if (!el._shinyterm) return;
      el._shinyterm.callback = null;
      setTimeout(function () {
        if (!el.isConnected) dispose(el);
      }, 0);
    },

    receiveMessage: function (el, msg) {
      var st = el._shinyterm;
      if (!st) return;
      if (!st.term) {
        st.pending.push(msg);
        return;
      }
      if (msg.write != null) {
        if (msg.n != null) {
          var n = msg.n;
          st.term.write(msg.write, function () {
            if (!st.disposed) wrote(st, n);
          });
        } else {
          st.term.write(msg.write);
        }
      }
      if (msg.ack != null) {
        var drop = msg.ack - st.from + 1;
        if (drop > 0) {
          st.chunks.splice(0, drop);
          st.from += drop;
        }
        // Chunks beyond the size cap of the last send go out now.
        if (st.from + st.chunks.length > st.sentTo) sendChunks(st);
      }
      if (msg.clear) st.term.reset();
      if (msg.stdin != null) st.term.options.disableStdin = !msg.stdin;
      if (msg.focus) st.term.focus();
    },

    getRatePolicy: function () {
      return { policy: "direct" };
    }
  });

  // Creates the terminal in `el` from the emulator's classes, wires its
  // events to the binding state `st` and replays queued server messages.
  function open(el, st, lib, opts) {
    var term = new lib.Terminal(
      Object.assign(
        { cursorBlink: true, scrollback: 5000, allowProposedApi: true },
        opts
      )
    );
    var fit = new lib.FitAddon();
    term.loadAddon(fit);
    term.open(el);
    fit.fit();

    st.term = term;
    st.fit = fit;
    st.rows = term.rows;
    st.cols = term.cols;

    term.onData(function (d) {
      Array.prototype.push.apply(st.chunks, splitChunk(d));
      sendChunks(st);
    });

    term.onResize(function (size) {
      st.rows = size.rows;
      st.cols = size.cols;
      st.seq += 1;
      if (st.callback) st.callback(false);
    });

    var refit = function () {
      if (st.fitTimer) clearTimeout(st.fitTimer);
      st.fitTimer = setTimeout(function () {
        st.fitTimer = null;
        fit.fit();
      }, 50);
    };
    var ro = new ResizeObserver(refit);
    ro.observe(el);
    st.observer = ro;

    if (st.mode === "auto") {
      var mo = new MutationObserver(function () {
        applyTheme(el, st);
      });
      mo.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-bs-theme"]
      });
      st.themeObserver = mo;
    }

    // The first fit can run before layout settles or the font loads; fit
    // again once both are done so the process starts at the right size.
    requestAnimationFrame(function () {
      fit.fit();
    });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        fit.fit();
      });
    }

    var pending = st.pending;
    st.pending = [];
    pending.forEach(function (msg) {
      binding.receiveMessage(el, msg);
    });
  }

  Shiny.inputBindings.register(binding, "shinyterm.terminal");

  Shiny.addCustomMessageHandler("shinyterm", function (msg) {
    var el = document.getElementById(msg.id);
    if (el && el._shinyterm) binding.receiveMessage(el, msg);
  });
})();
