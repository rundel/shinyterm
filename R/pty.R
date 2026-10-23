# Resizes a running pty process to rows x cols through TIOCSWINSZ on the
# master descriptor (which processx exposes as the output connection). The
# child gets SIGWINCH and redraws. Returns FALSE on Windows, where the ConPTY
# handle is not reachable from R.
#
# proc: a processx::process started with pty = TRUE
# rows, cols: the new size

pty_resize = function(proc, rows, cols) {
  if (.Platform$OS.type == "windows") return(FALSE)
  fd = processx::conn_get_fileno(proc$get_output_connection())
  .Call(shinyterm_resize, as.integer(fd), as.integer(rows), as.integer(cols))
}
