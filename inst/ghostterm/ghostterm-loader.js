// Loads the vendored ghostterm build (an ES module) and hands it to the
// shinyterm binding, which is a classic script and cannot import it. The
// binding reads window.shinytermGhostterm, a promise that resolves once the
// libghostty-vt WebAssembly module (ghostty-vt.wasm, next to the bundle) is
// loaded, and waits for the "shinyterm:ghostterm" event when this module runs
// after it.
import { init, Terminal, FitAddon } from "./ghostterm-slim.js";

window.shinytermGhostterm = init().then(function () {
  return { Terminal: Terminal, FitAddon: FitAddon };
});
document.dispatchEvent(new CustomEvent("shinyterm:ghostterm"));
