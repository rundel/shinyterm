// Shiny input binding for the shinyterm terminal element.
//
// The element's input value is its size ({rows, cols, seq}). Keystrokes are
// sent separately as <id>_data events carrying every chunk the server has not
// acknowledged yet, indexed from `from`, so chunks coalesced by Shiny's input
// batching are never lost and chunks re-sent before an ack are never written
// twice. The server talks back with messages carrying any of:
// write (text to print), ack (last chunk index consumed), clear, focus and
// stdin (enable/disable keyboard input). The server sends them as "shinyterm"
// custom messages carrying the element id, so output can be pushed from
// outside a reactive flush; receiveMessage() also serves sendInputMessage().
//
// Colours come from a light or dark palette chosen by the element's
// data-theme attribute. With "auto" the palette follows the page's Bootstrap
// colour mode (the data-bs-theme attribute bslib's dark mode toggle sets on
// <html>), falling back to dark when the page has none. Colours from the
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

  function sendChunks(st) {
    Shiny.setInputValue(
      st.id + "_data",
      { from: st.from, chunks: st.chunks.slice() },
      { priority: "event" }
    );
  }

  $.extend(binding, {
    find: function (scope) {
      return $(scope).find(".shinyterm");
    },

    initialize: function (el) {
      var opts = {};
      if (el.dataset.options) opts = JSON.parse(el.dataset.options);
      var mode = el.dataset.theme || "auto";
      var userTheme = opts.theme;
      opts.theme = resolveTheme(mode, userTheme);
      el.style.backgroundColor = opts.theme.background;

      var term = new Terminal(
        Object.assign(
          { cursorBlink: true, scrollback: 5000, allowProposedApi: true },
          opts
        )
      );
      var fit = new FitAddon.FitAddon();
      term.loadAddon(fit);
      term.open(el);
      fit.fit();

      var st = {
        id: el.id,
        term: term,
        fit: fit,
        mode: mode,
        userTheme: userTheme,
        from: 0,
        chunks: [],
        rows: term.rows,
        cols: term.cols,
        seq: 0,
        callback: null
      };
      el._shinyterm = st;

      term.onData(function (d) {
        st.chunks.push(d);
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

      if (mode === "auto") {
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
    },

    getValue: function (el) {
      var st = el._shinyterm;
      return { rows: st.rows, cols: st.cols, seq: st.seq };
    },

    subscribe: function (el, callback) {
      el._shinyterm.callback = callback;
    },

    unsubscribe: function (el) {
      el._shinyterm.callback = null;
    },

    receiveMessage: function (el, msg) {
      var st = el._shinyterm;
      if (msg.write != null) st.term.write(msg.write);
      if (msg.ack != null) {
        var drop = msg.ack - st.from + 1;
        if (drop > 0) {
          st.chunks.splice(0, drop);
          st.from += drop;
        }
      }
      if (msg.clear) st.term.reset();
      if (msg.stdin != null) st.term.options.disableStdin = !msg.stdin;
      if (msg.focus) st.term.focus();
    },

    getRatePolicy: function () {
      return { policy: "direct" };
    }
  });

  Shiny.inputBindings.register(binding, "shinyterm.terminal");

  Shiny.addCustomMessageHandler("shinyterm", function (msg) {
    var el = document.getElementById(msg.id);
    if (el && el._shinyterm) binding.receiveMessage(el, msg);
  });
})();
