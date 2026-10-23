#include <string.h>

// R 4.6's R_ext/Boolean.h declares Rboolean as `enum :int`, which clang 21
// reports as a C23 extension under -pedantic (R's header only guards older
// clang versions, where the warning had another name).
#if defined(__clang__)
#  pragma clang diagnostic push
#  pragma clang diagnostic ignored "-Wc23-extensions"
#endif
#include <R.h>
#include <Rinternals.h>
#include <R_ext/Rdynload.h>
#if defined(__clang__)
#  pragma clang diagnostic pop
#endif

#ifndef _WIN32
#include <sys/ioctl.h>
#include <unistd.h>
#endif

// Sets the window size of the pseudo-terminal whose master is `fd`. The kernel
// delivers SIGWINCH to the foreground process group, so a TUI redraws itself.
SEXP shinyterm_resize(SEXP fd, SEXP rows, SEXP cols) {
#ifdef _WIN32
  return Rf_ScalarLogical(FALSE);
#else
  struct winsize ws;
  memset(&ws, 0, sizeof(ws));
  ws.ws_row = (unsigned short) Rf_asInteger(rows);
  ws.ws_col = (unsigned short) Rf_asInteger(cols);
  int ret = ioctl(Rf_asInteger(fd), TIOCSWINSZ, &ws);
  return Rf_ScalarLogical(ret == 0);
#endif
}

static const R_CallMethodDef CallEntries[] = {
  {"shinyterm_resize", (DL_FUNC) &shinyterm_resize, 3},
  {NULL, NULL, 0}
};

void R_init_shinyterm(DllInfo *dll) {
  R_registerRoutines(dll, NULL, CallEntries, NULL, NULL);
  R_useDynamicSymbols(dll, FALSE);
}
