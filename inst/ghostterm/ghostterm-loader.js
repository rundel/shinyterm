// Loads the vendored ghostterm build (an ES module) and hands it to the
// shinyterm binding, which is a classic script and cannot import it. The
// binding reads window.shinytermGhostterm, a promise that resolves once the
// libghostty-vt WebAssembly module (ghostty-vt.wasm, next to the bundle) is
// loaded, and waits for the "shinyterm:ghostterm" event when this module runs
// after it. The import is dynamic so that a bundle that fails to load rejects
// the promise (which the binding reports) instead of stopping this module
// before it can publish anything.
window.shinytermGhostterm = import("./ghostterm-slim.js").then(function (m) {
  return m.init().then(function () {
    return { Terminal: m.Terminal, FitAddon: m.FitAddon };
  });
});
document.dispatchEvent(new CustomEvent("shinyterm:ghostterm"));
