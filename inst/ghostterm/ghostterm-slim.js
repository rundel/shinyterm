// lib/abi.ts
function e(e, t, n) {
	let { lsb: r, width: i } = n, a = i >= 32 ? 4294967295 : (1 << i) - 1;
	if (r >= 32) return t >>> r - 32 & a;
	if (r + i <= 32) return e >>> r & a;
	let o = 32 - r;
	return (e >>> r | t << o) & a;
}
var t = class {
	constructor(e) {
		let t = JSON.parse(e);
		if (t.abi.pointer_size !== 4 || t.abi.endian !== "little") throw Error(`Unsupported libghostty-vt ABI: pointer size ${t.abi.pointer_size}, ${t.abi.endian} endian`);
		this.version = t.library_version, this.types = t.types;
	}
	type(e) {
		let t = this.types[e];
		if (!t) throw Error(`libghostty-vt manifest has no type ${e}`);
		return t;
	}
	size(e) {
		let t = this.type(e).size;
		if (t === void 0) throw Error(`libghostty-vt type ${e} has no size`);
		return t;
	}
	offset(e, t) {
		let n = this.type(e).fields?.[t];
		if (!n) throw Error(`libghostty-vt struct ${e} has no field ${t}`);
		return n.offset;
	}
	bits(e, t) {
		let n = this.type(e).bits?.[t];
		if (!n) throw Error(`libghostty-vt packed type ${e} has no field ${t}`);
		return {
			lsb: n.lsb,
			width: n.width
		};
	}
	unionBits(e, t, n, r) {
		let i = this.type(e).bits?.[t], a = i?.arms?.[n]?.bits?.[r];
		if (!i || !a) throw Error(`libghostty-vt packed type ${e} has no ${t}.${n}.${r}`);
		return {
			lsb: i.lsb + a.lsb,
			width: a.width
		};
	}
}, n = /* @__PURE__ */ function(e) {
	return e[e.CURSOR_KEY_APPLICATION = 1] = "CURSOR_KEY_APPLICATION", e[e.KEYPAD_KEY_APPLICATION = 2] = "KEYPAD_KEY_APPLICATION", e[e.IGNORE_KEYPAD_WITH_NUMLOCK = 3] = "IGNORE_KEYPAD_WITH_NUMLOCK", e[e.ALT_ESC_PREFIX = 4] = "ALT_ESC_PREFIX", e[e.MODIFY_OTHER_KEYS_STATE_2 = 5] = "MODIFY_OTHER_KEYS_STATE_2", e[e.KITTY_KEYBOARD_FLAGS = 6] = "KITTY_KEYBOARD_FLAGS", e[e.MACOS_OPTION_AS_ALT = 7] = "MACOS_OPTION_AS_ALT", e[e.BACKARROW_KEY_MODE = 8] = "BACKARROW_KEY_MODE", e;
}({}), r = /* @__PURE__ */ function(e) {
	return e[e.RELEASE = 0] = "RELEASE", e[e.PRESS = 1] = "PRESS", e[e.REPEAT = 2] = "REPEAT", e;
}({}), i = /* @__PURE__ */ function(e) {
	return e[e.UNIDENTIFIED = 0] = "UNIDENTIFIED", e[e.GRAVE = 1] = "GRAVE", e[e.BACKSLASH = 2] = "BACKSLASH", e[e.BRACKET_LEFT = 3] = "BRACKET_LEFT", e[e.BRACKET_RIGHT = 4] = "BRACKET_RIGHT", e[e.COMMA = 5] = "COMMA", e[e.ZERO = 6] = "ZERO", e[e.ONE = 7] = "ONE", e[e.TWO = 8] = "TWO", e[e.THREE = 9] = "THREE", e[e.FOUR = 10] = "FOUR", e[e.FIVE = 11] = "FIVE", e[e.SIX = 12] = "SIX", e[e.SEVEN = 13] = "SEVEN", e[e.EIGHT = 14] = "EIGHT", e[e.NINE = 15] = "NINE", e[e.EQUAL = 16] = "EQUAL", e[e.INTL_BACKSLASH = 17] = "INTL_BACKSLASH", e[e.INTL_RO = 18] = "INTL_RO", e[e.INTL_YEN = 19] = "INTL_YEN", e[e.A = 20] = "A", e[e.B = 21] = "B", e[e.C = 22] = "C", e[e.D = 23] = "D", e[e.E = 24] = "E", e[e.F = 25] = "F", e[e.G = 26] = "G", e[e.H = 27] = "H", e[e.I = 28] = "I", e[e.J = 29] = "J", e[e.K = 30] = "K", e[e.L = 31] = "L", e[e.M = 32] = "M", e[e.N = 33] = "N", e[e.O = 34] = "O", e[e.P = 35] = "P", e[e.Q = 36] = "Q", e[e.R = 37] = "R", e[e.S = 38] = "S", e[e.T = 39] = "T", e[e.U = 40] = "U", e[e.V = 41] = "V", e[e.W = 42] = "W", e[e.X = 43] = "X", e[e.Y = 44] = "Y", e[e.Z = 45] = "Z", e[e.MINUS = 46] = "MINUS", e[e.PERIOD = 47] = "PERIOD", e[e.QUOTE = 48] = "QUOTE", e[e.SEMICOLON = 49] = "SEMICOLON", e[e.SLASH = 50] = "SLASH", e[e.ALT_LEFT = 51] = "ALT_LEFT", e[e.ALT_RIGHT = 52] = "ALT_RIGHT", e[e.BACKSPACE = 53] = "BACKSPACE", e[e.CAPS_LOCK = 54] = "CAPS_LOCK", e[e.CONTEXT_MENU = 55] = "CONTEXT_MENU", e[e.CONTROL_LEFT = 56] = "CONTROL_LEFT", e[e.CONTROL_RIGHT = 57] = "CONTROL_RIGHT", e[e.ENTER = 58] = "ENTER", e[e.META_LEFT = 59] = "META_LEFT", e[e.META_RIGHT = 60] = "META_RIGHT", e[e.SHIFT_LEFT = 61] = "SHIFT_LEFT", e[e.SHIFT_RIGHT = 62] = "SHIFT_RIGHT", e[e.SPACE = 63] = "SPACE", e[e.TAB = 64] = "TAB", e[e.CONVERT = 65] = "CONVERT", e[e.KANA_MODE = 66] = "KANA_MODE", e[e.NON_CONVERT = 67] = "NON_CONVERT", e[e.DELETE = 68] = "DELETE", e[e.END = 69] = "END", e[e.HELP = 70] = "HELP", e[e.HOME = 71] = "HOME", e[e.INSERT = 72] = "INSERT", e[e.PAGE_DOWN = 73] = "PAGE_DOWN", e[e.PAGE_UP = 74] = "PAGE_UP", e[e.DOWN = 75] = "DOWN", e[e.LEFT = 76] = "LEFT", e[e.RIGHT = 77] = "RIGHT", e[e.UP = 78] = "UP", e[e.NUM_LOCK = 79] = "NUM_LOCK", e[e.KP_0 = 80] = "KP_0", e[e.KP_1 = 81] = "KP_1", e[e.KP_2 = 82] = "KP_2", e[e.KP_3 = 83] = "KP_3", e[e.KP_4 = 84] = "KP_4", e[e.KP_5 = 85] = "KP_5", e[e.KP_6 = 86] = "KP_6", e[e.KP_7 = 87] = "KP_7", e[e.KP_8 = 88] = "KP_8", e[e.KP_9 = 89] = "KP_9", e[e.KP_PLUS = 90] = "KP_PLUS", e[e.KP_BACKSPACE = 91] = "KP_BACKSPACE", e[e.KP_CLEAR = 92] = "KP_CLEAR", e[e.KP_CLEAR_ENTRY = 93] = "KP_CLEAR_ENTRY", e[e.KP_COMMA = 94] = "KP_COMMA", e[e.KP_PERIOD = 95] = "KP_PERIOD", e[e.KP_DIVIDE = 96] = "KP_DIVIDE", e[e.KP_ENTER = 97] = "KP_ENTER", e[e.KP_EQUAL = 98] = "KP_EQUAL", e[e.KP_MEMORY_ADD = 99] = "KP_MEMORY_ADD", e[e.KP_MEMORY_CLEAR = 100] = "KP_MEMORY_CLEAR", e[e.KP_MEMORY_RECALL = 101] = "KP_MEMORY_RECALL", e[e.KP_MEMORY_STORE = 102] = "KP_MEMORY_STORE", e[e.KP_MEMORY_SUBTRACT = 103] = "KP_MEMORY_SUBTRACT", e[e.KP_MULTIPLY = 104] = "KP_MULTIPLY", e[e.KP_PAREN_LEFT = 105] = "KP_PAREN_LEFT", e[e.KP_PAREN_RIGHT = 106] = "KP_PAREN_RIGHT", e[e.KP_MINUS = 107] = "KP_MINUS", e[e.KP_SEPARATOR = 108] = "KP_SEPARATOR", e[e.NUMPAD_UP = 109] = "NUMPAD_UP", e[e.NUMPAD_DOWN = 110] = "NUMPAD_DOWN", e[e.NUMPAD_RIGHT = 111] = "NUMPAD_RIGHT", e[e.NUMPAD_LEFT = 112] = "NUMPAD_LEFT", e[e.NUMPAD_BEGIN = 113] = "NUMPAD_BEGIN", e[e.NUMPAD_HOME = 114] = "NUMPAD_HOME", e[e.NUMPAD_END = 115] = "NUMPAD_END", e[e.NUMPAD_INSERT = 116] = "NUMPAD_INSERT", e[e.NUMPAD_DELETE = 117] = "NUMPAD_DELETE", e[e.NUMPAD_PAGE_UP = 118] = "NUMPAD_PAGE_UP", e[e.NUMPAD_PAGE_DOWN = 119] = "NUMPAD_PAGE_DOWN", e[e.ESCAPE = 120] = "ESCAPE", e[e.F1 = 121] = "F1", e[e.F2 = 122] = "F2", e[e.F3 = 123] = "F3", e[e.F4 = 124] = "F4", e[e.F5 = 125] = "F5", e[e.F6 = 126] = "F6", e[e.F7 = 127] = "F7", e[e.F8 = 128] = "F8", e[e.F9 = 129] = "F9", e[e.F10 = 130] = "F10", e[e.F11 = 131] = "F11", e[e.F12 = 132] = "F12", e[e.F13 = 133] = "F13", e[e.F14 = 134] = "F14", e[e.F15 = 135] = "F15", e[e.F16 = 136] = "F16", e[e.F17 = 137] = "F17", e[e.F18 = 138] = "F18", e[e.F19 = 139] = "F19", e[e.F20 = 140] = "F20", e[e.F21 = 141] = "F21", e[e.F22 = 142] = "F22", e[e.F23 = 143] = "F23", e[e.F24 = 144] = "F24", e[e.F25 = 145] = "F25", e[e.FN = 146] = "FN", e[e.FN_LOCK = 147] = "FN_LOCK", e[e.PRINT_SCREEN = 148] = "PRINT_SCREEN", e[e.SCROLL_LOCK = 149] = "SCROLL_LOCK", e[e.PAUSE = 150] = "PAUSE", e[e.BROWSER_BACK = 151] = "BROWSER_BACK", e[e.BROWSER_FAVORITES = 152] = "BROWSER_FAVORITES", e[e.BROWSER_FORWARD = 153] = "BROWSER_FORWARD", e[e.BROWSER_HOME = 154] = "BROWSER_HOME", e[e.BROWSER_REFRESH = 155] = "BROWSER_REFRESH", e[e.BROWSER_SEARCH = 156] = "BROWSER_SEARCH", e[e.BROWSER_STOP = 157] = "BROWSER_STOP", e[e.EJECT = 158] = "EJECT", e[e.LAUNCH_APP_1 = 159] = "LAUNCH_APP_1", e[e.LAUNCH_APP_2 = 160] = "LAUNCH_APP_2", e[e.LAUNCH_MAIL = 161] = "LAUNCH_MAIL", e[e.MEDIA_PLAY_PAUSE = 162] = "MEDIA_PLAY_PAUSE", e[e.MEDIA_SELECT = 163] = "MEDIA_SELECT", e[e.MEDIA_STOP = 164] = "MEDIA_STOP", e[e.MEDIA_TRACK_NEXT = 165] = "MEDIA_TRACK_NEXT", e[e.MEDIA_TRACK_PREVIOUS = 166] = "MEDIA_TRACK_PREVIOUS", e[e.POWER = 167] = "POWER", e[e.SLEEP = 168] = "SLEEP", e[e.AUDIO_VOLUME_DOWN = 169] = "AUDIO_VOLUME_DOWN", e[e.AUDIO_VOLUME_MUTE = 170] = "AUDIO_VOLUME_MUTE", e[e.AUDIO_VOLUME_UP = 171] = "AUDIO_VOLUME_UP", e[e.WAKE_UP = 172] = "WAKE_UP", e[e.COPY = 173] = "COPY", e[e.CUT = 174] = "CUT", e[e.PASTE = 175] = "PASTE", e;
}({}), a = /* @__PURE__ */ function(e) {
	return e[e.NONE = 0] = "NONE", e[e.SHIFT = 1] = "SHIFT", e[e.CTRL = 2] = "CTRL", e[e.ALT = 4] = "ALT", e[e.SUPER = 8] = "SUPER", e[e.CAPSLOCK = 16] = "CAPSLOCK", e[e.NUMLOCK = 32] = "NUMLOCK", e;
}({}), o = /* @__PURE__ */ function(e) {
	return e[e.NONE = 0] = "NONE", e[e.PARTIAL = 1] = "PARTIAL", e[e.FULL = 2] = "FULL", e;
}({}), s = /* @__PURE__ */ function(e) {
	return e[e.NONE = 0] = "NONE", e[e.SINGLE = 1] = "SINGLE", e[e.DOUBLE = 2] = "DOUBLE", e[e.CURLY = 3] = "CURLY", e[e.DOTTED = 4] = "DOTTED", e[e.DASHED = 5] = "DASHED", e;
}({}), c = /* @__PURE__ */ function(e) {
	return e[e.BOLD = 1] = "BOLD", e[e.ITALIC = 2] = "ITALIC", e[e.UNDERLINE = 4] = "UNDERLINE", e[e.STRIKETHROUGH = 8] = "STRIKETHROUGH", e[e.INVERSE = 16] = "INVERSE", e[e.INVISIBLE = 32] = "INVISIBLE", e[e.BLINK = 64] = "BLINK", e[e.FAINT = 128] = "FAINT", e;
}({});
// lib/wasm-default-slim.ts
function l() {
	return new URL("./ghostty-vt.wasm", import.meta.url);
}
// lib/ghostty.ts
var u = {
	SUCCESS: 0,
	OUT_OF_SPACE: -3
}, d = u.SUCCESS, f = u.OUT_OF_SPACE, p = {
	WRITE_PTY: 2,
	COLOR_FOREGROUND: 12,
	COLOR_BACKGROUND: 13,
	COLOR_CURSOR: 14,
	COLOR_PALETTE: 15,
	SELECTION: 22,
	DEFAULT_CURSOR_STYLE: 23,
	DEFAULT_CURSOR_BLINK: 24,
	SCROLLBACK_MAX_BYTES: 28,
	SCROLLBACK_MAX_LINES: 29,
	MODE_DEFAULT: 34,
	MODE: 35,
	TERMINFO_NAME: 38
}, m = {
	CURSOR_X: 3,
	CURSOR_Y: 4,
	ACTIVE_SCREEN: 6,
	SCROLLBAR: 9,
	MOUSE_TRACKING: 11,
	TITLE: 12,
	PWD: 13,
	SCROLLBACK_ROWS: 15,
	COLOR_PALETTE_DEFAULT: 25,
	SELECTION: 31,
	MODE: 37,
	MOUSE_SHAPE: 41
}, h = {
	PRIMARY: 0,
	ALTERNATE: 1
}, g = {
	DIRTY: 3,
	ROW_ITERATOR: 4,
	CURSOR: 18,
	COLORS: 19
}, _ = {
	DIRTY: 1,
	CELLS: 3,
	SELECTION: 4,
	CELLS_RAW: 5
}, v = {
	STYLE: 2,
	GRAPHEMES_LEN: 3,
	GRAPHEMES_BUF: 4
}, y = { WRAP_CONTINUATION: 2 }, b = {
	ACTIVE: 0,
	VIEWPORT: 1,
	SCREEN: 2,
	HISTORY: 3
}, x = { FORWARD: 0 }, ee = /* @__PURE__ */ "default.context-menu.help.pointer.progress.wait.cell.crosshair.text.vertical-text.alias.copy.move.no-drop.not-allowed.grab.grabbing.all-scroll.col-resize.row-resize.n-resize.e-resize.s-resize.w-resize.ne-resize.nw-resize.se-resize.sw-resize.ew-resize.ns-resize.nesw-resize.nwse-resize.zoom-in.zoom-out".split("."), S = {
	EMIT: 1,
	UNWRAP: 2,
	TRIM: 3,
	SELECTION: 4,
	EXTRAS: 5
}, C = {
	PLAIN: 0,
	VT: 1,
	HTML: 2
}, w = /* @__PURE__ */ function(e) {
	return e[e.NONE = 0] = "NONE", e[e.PALETTE = 1] = "PALETTE", e[e.MODES = 2] = "MODES", e[e.SCROLLING_REGION = 4] = "SCROLLING_REGION", e[e.TABSTOPS = 8] = "TABSTOPS", e[e.PWD = 16] = "PWD", e[e.KEYBOARD = 32] = "KEYBOARD", e[e.CURSOR = 64] = "CURSOR", e[e.STYLE = 128] = "STYLE", e[e.HYPERLINK = 256] = "HYPERLINK", e[e.PROTECTION = 512] = "PROTECTION", e[e.KITTY_KEYBOARD = 1024] = "KITTY_KEYBOARD", e[e.CHARSETS = 2048] = "CHARSETS", e[e.ALL = 4095] = "ALL", e;
}({}), T = {
	PRESS: 0,
	RELEASE: 1,
	DRAG: 2,
	AUTOSCROLL_TICK: 3
}, E = {
	REF: 1,
	POSITION: 2,
	REPEAT_DISTANCE: 3,
	TIME_NS: 4,
	REPEAT_INTERVAL_NS: 5,
	RECTANGLE: 8,
	GEOMETRY: 9,
	VIEWPORT: 10
}, te = { AUTOSCROLL: 3 }, D = /* @__PURE__ */ function(e) {
	return e[e.NONE = 0] = "NONE", e[e.UP = 1] = "UP", e[e.DOWN = 2] = "DOWN", e;
}({}), O = {
	BELL: 3,
	ENQUIRY: 4,
	TITLE_CHANGED: 6,
	SIZE: 7,
	COLOR_SCHEME: 8,
	PWD_CHANGED: 26,
	CLIPBOARD_WRITE: 27,
	DESKTOP_NOTIFICATION: 30,
	PROGRESS_REPORT: 31,
	RENDER_HOLD: 42,
	SEMANTIC_PROMPT: 43,
	RESET: 44,
	PROGRAM_STATUS: 47
}, ne = [
	"standard",
	"selection",
	"primary"
], re = {
	SUCCESS: 0,
	DENIED: 1
}, ie = {
	CLIPBOARD: 0,
	TEXT: 1
}, ae = {
	GAINED: 0,
	LOST: 1
}, k = {
	LIGHT: 0,
	DARK: 1
}, oe = [
	"remove",
	"set",
	"error",
	"indeterminate",
	"pause"
], se = [
	"idle",
	"working",
	"done",
	"blocked",
	"error",
	"clear"
], ce = [
	"none",
	"permission",
	"question",
	"auth"
], le = [
	null,
	"prompt-start",
	"input-start",
	"output-start",
	"command-end"
], ue = [
	"primary",
	"right",
	"continuation",
	"secondary"
], de = 1e3, A = {
	BOTTOM: 1,
	DELTA: 2,
	ROW: 3,
	DELTA_PROMPT: 4
}, fe = {
	left: 0,
	right: 1,
	up: 2,
	down: 3,
	home: 4,
	end: 5,
	"page-up": 6,
	"page-down": 7,
	"line-start": 8,
	"line-end": 9
}, j = 4294967295, M = {
	CODEPOINT: 0,
	CODEPOINT_GRAPHEME: 1,
	BG_COLOR_PALETTE: 2,
	BG_COLOR_RGB: 3
}, pe = {
	NARROW: 0,
	WIDE: 1
}, me = {
	NONE: 0,
	PALETTE: 1,
	RGB: 2
}, N = {
	BAR: 0,
	BLOCK: 1,
	UNDERLINE: 2,
	BLOCK_HOLLOW: 3
}, he = 2027, ge = 32, _e = /* @__PURE__ */ new Set([
	7,
	27,
	24,
	26
]), ve = 1e7;
function ye(e, t) {
	return e & 32767 | (t ? 32768 : 0);
}
function be(e) {
	let t = (t) => e.bits("GhosttyCell", t), n = (t, n) => e.unionBits("GhosttyCell", "content", t, n), r = (t) => e.bits("GhosttyStyleFlags", t), i = (t) => (n) => e.offset(t, n), a = i("GhosttyColorRgb"), o = i("GhosttyClipboardWrite"), s = i("GhosttyTerminalProgramStatus"), c = i("GhosttyTerminalSemanticPrompt"), l = i("GhosttySizeReportSize"), u = i("GhosttyPaste"), d = i("GhosttyMouseEncoderSize"), f = e.offset("GhosttyTerminalScrollViewport", "value"), p = e.offset("GhosttyStyleColor", "value"), m = p + e.offset("GhosttyStyleColorValue", "rgb");
	return {
		abi: e,
		cell: {
			contentTag: t("content_tag"),
			codepoint: n("CODEPOINT", "codepoint"),
			bgPalette: n("BG_COLOR_PALETTE", "index"),
			bgR: n("BG_COLOR_RGB", "r"),
			bgG: n("BG_COLOR_RGB", "g"),
			bgB: n("BG_COLOR_RGB", "b"),
			styleId: t("style_id"),
			wide: t("wide"),
			hyperlink: t("hyperlink")
		},
		styleFlags: {
			bold: r("bold"),
			italic: r("italic"),
			faint: r("faint"),
			blink: r("blink"),
			inverse: r("inverse"),
			invisible: r("invisible"),
			strikethrough: r("strikethrough"),
			underline: r("underline"),
			overline: r("overline")
		},
		cellSize: e.size("GhosttyCell"),
		styleColor: {
			tag: e.offset("GhosttyStyleColor", "tag"),
			value: p + e.offset("GhosttyStyleColorValue", "palette"),
			r: m + a("r"),
			g: m + a("g"),
			b: m + a("b")
		},
		style: {
			size: e.size("GhosttyStyle"),
			fg: e.offset("GhosttyStyle", "fg_color"),
			bg: e.offset("GhosttyStyle", "bg_color"),
			underline: e.offset("GhosttyStyle", "underline_color"),
			flags: e.offset("GhosttyStyle", "flags")
		},
		cursor: {
			size: e.size("GhosttyRenderStateCursor"),
			hasValue: e.offset("GhosttyRenderStateCursor", "viewport_has_value"),
			x: e.offset("GhosttyRenderStateCursor", "viewport_x"),
			y: e.offset("GhosttyRenderStateCursor", "viewport_y"),
			visible: e.offset("GhosttyRenderStateCursor", "visible"),
			blinking: e.offset("GhosttyRenderStateCursor", "blinking"),
			style: e.offset("GhosttyRenderStateCursor", "visual_style")
		},
		colors: {
			size: e.size("GhosttyRenderStateColors"),
			bg: e.offset("GhosttyRenderStateColors", "background"),
			fg: e.offset("GhosttyRenderStateColors", "foreground"),
			cursor: e.offset("GhosttyRenderStateColors", "cursor"),
			hasCursor: e.offset("GhosttyRenderStateColors", "cursor_has_value"),
			palette: e.offset("GhosttyRenderStateColors", "palette")
		},
		point: {
			size: e.size("GhosttyPoint"),
			value: e.offset("GhosttyPoint", "value"),
			x: e.offset("GhosttyPointCoordinate", "x"),
			y: e.offset("GhosttyPointCoordinate", "y")
		},
		gridRef: e.size("GhosttyGridRef"),
		cellsView: {
			ptr: e.offset("GhosttyCellsView", "ptr"),
			len: e.offset("GhosttyCellsView", "len")
		},
		modeConfig: {
			size: e.size("GhosttyTerminalModeConfig"),
			value: e.offset("GhosttyTerminalModeConfig", "value")
		},
		selection: {
			size: e.size("GhosttySelection"),
			start: e.offset("GhosttySelection", "start"),
			end: e.offset("GhosttySelection", "end"),
			rectangle: e.offset("GhosttySelection", "rectangle")
		},
		coordinate: {
			size: e.size("GhosttyPointCoordinate"),
			x: e.offset("GhosttyPointCoordinate", "x"),
			y: e.offset("GhosttyPointCoordinate", "y")
		},
		geometry: {
			columns: e.offset("GhosttySelectionGestureGeometry", "columns"),
			cellWidth: e.offset("GhosttySelectionGestureGeometry", "cell_width"),
			paddingLeft: e.offset("GhosttySelectionGestureGeometry", "padding_left"),
			screenHeight: e.offset("GhosttySelectionGestureGeometry", "screen_height")
		},
		surface: {
			x: e.offset("GhosttySurfacePosition", "x"),
			y: e.offset("GhosttySurfacePosition", "y")
		},
		writeStop: {
			size: e.size("GhosttyTerminalWriteStop"),
			consumed: e.offset("GhosttyTerminalWriteStop", "consumed"),
			reached: e.offset("GhosttyTerminalWriteStop", "reached")
		},
		string: {
			size: e.size("GhosttyString"),
			ptr: e.offset("GhosttyString", "ptr"),
			len: e.offset("GhosttyString", "len")
		},
		rgb: {
			size: e.size("GhosttyColorRgb"),
			r: a("r"),
			g: a("g"),
			b: a("b")
		},
		writer: {
			write: e.offset("GhosttyWriter", "write"),
			userdata: e.offset("GhosttyWriter", "userdata")
		},
		clipboardWrite: {
			location: o("location"),
			contents: o("contents"),
			contentsLen: o("contents_len"),
			reply: o("reply")
		},
		clipboardContent: {
			size: e.size("GhosttyClipboardContent"),
			mime: e.offset("GhosttyClipboardContent", "mime"),
			data: e.offset("GhosttyClipboardContent", "data")
		},
		clipboardReply: {
			size: e.size("GhosttyClipboardWriteReply"),
			result: e.offset("GhosttyClipboardWriteReply", "result"),
			remember: e.offset("GhosttyClipboardWriteReply", "remember")
		},
		notification: {
			title: e.offset("GhosttyTerminalDesktopNotification", "title"),
			body: e.offset("GhosttyTerminalDesktopNotification", "body")
		},
		progress: {
			state: e.offset("GhosttyTerminalProgressReport", "state"),
			progress: e.offset("GhosttyTerminalProgressReport", "progress")
		},
		programStatus: {
			state: s("state"),
			kind: s("kind"),
			progress: s("progress"),
			id: s("id"),
			app: s("app"),
			title: s("title"),
			message: s("message")
		},
		semanticPrompt: {
			kind: c("kind"),
			promptKind: c("prompt_kind"),
			hasExitCode: c("has_exit_code"),
			exitCode: c("exit_code"),
			command: c("command"),
			error: c("error")
		},
		sizeReport: {
			rows: l("rows"),
			columns: l("columns"),
			cellWidth: l("cell_width"),
			cellHeight: l("cell_height")
		},
		paste: {
			size: e.size("GhosttyPaste"),
			location: u("location"),
			source: u("source"),
			mimes: u("mimes"),
			mimesLen: u("mimes_len"),
			reader: u("reader"),
			allowUnsafe: u("allow_unsafe")
		},
		mimeReader: {
			read: e.offset("GhosttyMimeReader", "read"),
			userdata: e.offset("GhosttyMimeReader", "userdata")
		},
		mouseSize: {
			size: e.size("GhosttyMouseEncoderSize"),
			screenWidth: d("screen_width"),
			screenHeight: d("screen_height"),
			cellWidth: d("cell_width"),
			cellHeight: d("cell_height")
		},
		mousePosition: {
			x: e.offset("GhosttyMousePosition", "x"),
			y: e.offset("GhosttyMousePosition", "y")
		},
		scrollbar: {
			size: e.size("GhosttyTerminalScrollbar"),
			total: e.offset("GhosttyTerminalScrollbar", "total"),
			offset: e.offset("GhosttyTerminalScrollbar", "offset"),
			len: e.offset("GhosttyTerminalScrollbar", "len")
		},
		scrollViewport: {
			size: e.size("GhosttyTerminalScrollViewport"),
			tag: e.offset("GhosttyTerminalScrollViewport", "tag"),
			delta: f + e.offset("GhosttyTerminalScrollViewportValue", "delta"),
			row: f + e.offset("GhosttyTerminalScrollViewportValue", "row")
		},
		rowSelection: {
			size: e.size("GhosttyRenderStateRowSelection"),
			startX: e.offset("GhosttyRenderStateRowSelection", "start_x"),
			endX: e.offset("GhosttyRenderStateRowSelection", "end_x")
		},
		selectionBuffer: {
			size: e.size("GhosttySelectionBuffer"),
			ptr: e.offset("GhosttySelectionBuffer", "ptr"),
			cap: e.offset("GhosttySelectionBuffer", "cap"),
			len: e.offset("GhosttySelectionBuffer", "len")
		},
		codepointBuffer: {
			ptr: e.offset("GhosttyCodepointBuffer", "ptr"),
			cap: e.offset("GhosttyCodepointBuffer", "cap"),
			len: e.offset("GhosttyCodepointBuffer", "len")
		}
	};
}
var xe = class {
	constructor(e) {
		this.memory = e, this.buffer = null;
	}
	refresh() {
		let e = this.memory.buffer;
		e !== this.buffer && (this.buffer = e, this.dv = new DataView(e), this.u8 = new Uint8Array(e));
	}
	view() {
		return this.refresh(), this.dv;
	}
	bytes() {
		return this.refresh(), this.u8;
	}
};
function P(e, t, n = !1) {
	let r = n ? [1, 127] : [0], i = [
		1,
		96,
		t,
		...Array(t).fill(127),
		...r
	], a = [
		1,
		3,
		101,
		110,
		118,
		1,
		102,
		0,
		0
	], o = [
		1,
		1,
		102,
		0,
		0
	], s = new Uint8Array([
		0,
		97,
		115,
		109,
		1,
		0,
		0,
		0,
		1,
		i.length,
		...i,
		2,
		a.length,
		...a,
		7,
		o.length,
		...o
	]), c = new WebAssembly.Module(s);
	return new WebAssembly.Instance(c, { env: { f: e } }).exports.f;
}
function Se(e) {
	let t = decodeURIComponent(e.pathname);
	return /^\/[A-Za-z]:\//.test(t) ? t.slice(1) : t;
}
var Ce = {
	0: "debug",
	1: "release-safe",
	2: "release-small",
	3: "release-fast"
}, we = class e {
	constructor(e) {
		this.terminals = /* @__PURE__ */ new Map(), this.writePtyFn = 0, this.effectFns = /* @__PURE__ */ new Map(), this.mimeReaderFn = 0, this.pasteData = null, this.exports = e.exports, this.memory = this.exports.memory, this.mem = new xe(this.memory), this.layout = be(new t(this.readTypeJson()));
	}
	get version() {
		return this.layout.abi.version;
	}
	codepointWidth(e) {
		return this.exports.ghostty_unicode_codepoint_width(e >>> 0);
	}
	get optimizeMode() {
		let e = this.exports, t = e.ghostty_wasm_alloc(4);
		try {
			let n = e.ghostty_build_info(4, t);
			if (n !== 0) throw Error(`ghostty-vt: failed to read build info (${n})`);
			return Ce[this.mem.view().getInt32(t, !0)] ?? "unknown";
		} finally {
			e.ghostty_wasm_free(t, 4);
		}
	}
	readTypeJson() {
		let e = this.exports.ghostty_type_json(), t = this.mem.bytes(), n = e;
		for (; t[n] !== 0;) n++;
		return new TextDecoder().decode(t.subarray(e, n));
	}
	writePtyCallback() {
		if (this.writePtyFn) return this.writePtyFn;
		let e = P((e, t, n, r) => {
			this.terminals.get(e)?.queueResponse(this.mem.bytes().slice(n, n + r));
		}, 4), t = this.exports.__indirect_function_table, n = t.grow(1);
		return t.set(n, e), this.writePtyFn = n, n;
	}
	installEffects(e) {
		let t = (e) => (t, n, ...r) => {
			let i = this.terminals.get(t);
			return i ? e(i, ...r) : 0;
		}, n = [
			[
				O.BELL,
				2,
				!1,
				(e) => e.onEffect("bell")
			],
			[
				O.TITLE_CHANGED,
				2,
				!1,
				(e) => e.onEffect("title")
			],
			[
				O.PWD_CHANGED,
				2,
				!1,
				(e) => e.onEffect("pwd")
			],
			[
				O.CLIPBOARD_WRITE,
				3,
				!1,
				(e, t) => e.onClipboardWrite(t)
			],
			[
				O.DESKTOP_NOTIFICATION,
				3,
				!1,
				(e, t) => e.onNotification(t)
			],
			[
				O.PROGRESS_REPORT,
				3,
				!1,
				(e, t) => e.onProgress(t)
			],
			[
				O.PROGRAM_STATUS,
				3,
				!1,
				(e, t) => e.onProgramStatus(t)
			],
			[
				O.SEMANTIC_PROMPT,
				3,
				!1,
				(e, t) => e.onSemanticPrompt(t)
			],
			[
				O.COLOR_SCHEME,
				3,
				!0,
				(e, t) => e.onColorScheme(t)
			],
			[
				O.SIZE,
				3,
				!0,
				(e, t) => e.onSizeQuery(t)
			],
			[
				O.RENDER_HOLD,
				3,
				!1,
				(e, t) => e.onRenderHold(t !== 0)
			],
			[
				O.RESET,
				2,
				!1,
				(e) => e.onEffect("reset")
			]
		];
		for (let [r, i, a, o] of n) {
			let n = this.effectFns.get(r);
			n === void 0 && (n = this.tableFunction(P(t(o), i, a)), this.effectFns.set(r, n)), this.exports.ghostty_terminal_set(e.handle, r, n);
		}
		let r = this.effectFns.get(O.ENQUIRY);
		r === void 0 && (r = this.tableFunction(P((e, t) => {
			let n = this.terminals.get(t);
			n ? n.onEnquiry(e) : this.mem.bytes().fill(0, e, e + this.layout.string.size);
		}, 3)), this.effectFns.set(O.ENQUIRY, r)), this.exports.ghostty_terminal_set(e.handle, O.ENQUIRY, r);
	}
	callTable(e, ...t) {
		return this.exports.__indirect_function_table.get(e)(...t);
	}
	tableFunction(e) {
		let t = this.exports.__indirect_function_table, n = t.grow(1);
		return t.set(n, e), n;
	}
	mimeReaderCallback() {
		if (this.mimeReaderFn) return this.mimeReaderFn;
		let e = this.exports, t = P((t, n, r) => {
			let i = this.pasteData;
			if (!i) return 0;
			let a = this.mem.view(), o = this.layout.writer, s = a.getUint32(r + o.write, !0), c = a.getUint32(r + o.userdata, !0), l = Math.max(1, i.length), u = e.ghostty_wasm_alloc(l);
			if (!u) return 0;
			this.mem.bytes().set(i, u);
			let d = e.__indirect_function_table.get(s)(c, u, i.length);
			return e.ghostty_wasm_free(u, l), +!!d;
		}, 3, !0);
		return this.mimeReaderFn = this.tableFunction(t), this.mimeReaderFn;
	}
	withPasteData(e, t) {
		let n = this.mimeReaderCallback();
		this.pasteData = e;
		try {
			return t(n);
		} finally {
			this.pasteData = null;
		}
	}
	createKeyEncoder() {
		return new Te(this.exports, this.mem, this.layout);
	}
	createMouseEncoder() {
		return new Ee(this.exports, this.mem, this.layout);
	}
	createTerminal(e = 80, t = 24, n) {
		let r = new U(this.exports, this.mem, this.layout, e, t, n);
		return r.ghostty = this, this.terminals.set(r.handle, r), r.setWritePty(this.writePtyCallback(), () => this.terminals.delete(r.handle)), this.installEffects(r), r;
	}
	static async load(t) {
		if (t) return typeof t == "string" ? e.loadFromPath(t) : e.loadFromPath(t.protocol === "file:" ? Se(t) : t.href);
		let n = l(), r = [];
		n.protocol === "file:" && r.push(Se(n)), r.push(n.href, "./ghostty-vt.wasm", "/ghostty-vt.wasm");
		let i = null;
		for (let t of r) try {
			return await e.loadFromPath(t);
		} catch (e) {
			i = e instanceof Error ? e : Error(String(e));
		}
		throw i || /* @__PURE__ */ Error("Failed to load Ghostty WASM");
	}
	static async loadFromPath(t) {
		let n;
		if (typeof Bun < "u" && typeof Bun.file == "function") try {
			let e = Bun.file(t);
			await e.exists() && (n = await e.arrayBuffer());
		} catch {}
		if (!n && typeof process < "u" && process.versions?.node) try {
			let e = await (await import("node:fs/promises")).readFile(t);
			n = e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
		} catch {}
		if (!n) {
			let e = await fetch(t);
			if (!e.ok) throw Error(`Failed to fetch WASM: ${e.status} ${e.statusText}`);
			if (n = await e.arrayBuffer(), n.byteLength === 0) throw Error(`WASM file is empty (0 bytes). Check path: ${t}`);
		}
		if (!n) throw Error(`Could not load WASM from path: ${t}`);
		let r = await WebAssembly.compile(n), i = await WebAssembly.instantiate(r, {});
		return new e(i);
	}
}, Te = class {
	constructor(e, t, n) {
		this.encoder = 0, this.exports = e, this.mem = t, this.L = n;
		let r = this.exports.ghostty_wasm_alloc_opaque(), i = this.exports.ghostty_key_encoder_new(0, r);
		if (this.encoder = this.exports.ghostty_wasm_take_opaque(r), this.exports.ghostty_wasm_free_opaque(r), i !== d) throw Error(`Failed to create key encoder: ${i}`);
	}
	setOption(e, t) {
		let n = this.exports.ghostty_wasm_alloc(4);
		this.mem.view().setUint32(n, typeof t == "boolean" ? +!!t : t, !0), this.exports.ghostty_key_encoder_set(this.encoder, e, n), this.exports.ghostty_wasm_free(n, 4);
	}
	syncFromTerminal(e) {
		this.exports.ghostty_key_encoder_set_from_terminal(this.encoder, e.handle);
	}
	encode(e) {
		let t = this.exports, n = t.ghostty_wasm_alloc_opaque(), r = t.ghostty_key_event_new(0, n), i = t.ghostty_wasm_take_opaque(n);
		if (t.ghostty_wasm_free_opaque(n), r !== d) throw Error(`Failed to create key event: ${r}`);
		let a = 0, o = 0, s = 0, c = t.ghostty_wasm_alloc(128), l = t.ghostty_wasm_alloc(4);
		try {
			if (t.ghostty_key_event_set_action(i, e.action), t.ghostty_key_event_set_key(i, e.key), t.ghostty_key_event_set_mods(i, e.mods), e.consumedMods !== void 0 && t.ghostty_key_event_set_consumed_mods(i, e.consumedMods), e.composing !== void 0 && t.ghostty_key_event_set_composing(i, e.composing), e.unshiftedCodepoint !== void 0 && t.ghostty_key_event_set_unshifted_codepoint(i, e.unshiftedCodepoint), e.utf8) {
				let n = new TextEncoder().encode(e.utf8);
				o = n.length, a = t.ghostty_wasm_alloc(o), s = t.ghostty_wasm_alloc(this.L.string.size), this.mem.bytes().set(n, a);
				let r = this.mem.view();
				r.setUint32(s + this.L.string.ptr, a, !0), r.setUint32(s + this.L.string.len, o, !0), t.ghostty_key_event_set_utf8(i, s);
			}
			let n = t.ghostty_key_encoder_encode(this.encoder, i, c, 128, l);
			if (n !== d) throw Error(`Failed to encode key: ${n}`);
			let r = this.mem.view().getUint32(l, !0);
			return this.mem.bytes().slice(c, c + r);
		} finally {
			t.ghostty_wasm_free(c, 128), t.ghostty_wasm_free(l, 4), s && t.ghostty_wasm_free(s, this.L.string.size), a && t.ghostty_wasm_free(a, o), t.ghostty_key_event_free(i);
		}
	}
	dispose() {
		this.encoder &&= (this.exports.ghostty_key_encoder_free(this.encoder), 0);
	}
}, F = /* @__PURE__ */ function(e) {
	return e[e.LEFT = 1] = "LEFT", e[e.RIGHT = 2] = "RIGHT", e[e.MIDDLE = 3] = "MIDDLE", e[e.WHEEL_UP = 4] = "WHEEL_UP", e[e.WHEEL_DOWN = 5] = "WHEEL_DOWN", e[e.WHEEL_LEFT = 6] = "WHEEL_LEFT", e[e.WHEEL_RIGHT = 7] = "WHEEL_RIGHT", e;
}({}), I = /* @__PURE__ */ function(e) {
	return e[e.PRESS = 0] = "PRESS", e[e.RELEASE = 1] = "RELEASE", e[e.MOTION = 2] = "MOTION", e;
}({}), L = {
	SIZE: 3,
	ANY_BUTTON_PRESSED: 4,
	TRACK_LAST_CELL: 5
}, Ee = class {
	constructor(e, t, n) {
		this.encoder = 0, this.event = 0, this.scratch = 0, this.exports = e, this.mem = t, this.L = n;
		let r = e, i = r.ghostty_wasm_alloc_opaque();
		try {
			if (r.ghostty_mouse_encoder_new(0, i) !== d) throw Error("libghostty-vt: failed to create mouse encoder");
			if (this.encoder = r.ghostty_wasm_take_opaque(i), r.ghostty_mouse_event_new(0, i) !== d) throw Error("libghostty-vt: failed to create mouse event");
			this.event = r.ghostty_wasm_take_opaque(i);
		} finally {
			r.ghostty_wasm_free_opaque(i);
		}
		this.scratch = r.ghostty_wasm_alloc(256), this.mem.view().setUint8(this.scratch, 1), r.ghostty_mouse_encoder_set(this.encoder, L.TRACK_LAST_CELL, this.scratch);
	}
	syncFromTerminal(e) {
		this.exports.ghostty_mouse_encoder_set_from_terminal(this.encoder, e.handle);
	}
	setGeometry(e) {
		let t = this.scratch, n = this.L.mouseSize, r = this.mem.view(), i = (e, n) => r.setUint32(t + e, n, !0);
		this.mem.bytes().fill(0, t, t + n.size), i(0, n.size), i(n.screenWidth, Math.max(1, Math.round(e.screenWidth))), i(n.screenHeight, Math.max(1, Math.round(e.screenHeight))), i(n.cellWidth, Math.max(1, Math.round(e.cellWidth))), i(n.cellHeight, Math.max(1, Math.round(e.cellHeight))), this.exports.ghostty_mouse_encoder_set(this.encoder, L.SIZE, t);
	}
	setAnyButtonPressed(e) {
		this.mem.view().setUint8(this.scratch, +!!e), this.exports.ghostty_mouse_encoder_set(this.encoder, L.ANY_BUTTON_PRESSED, this.scratch);
	}
	reset() {
		this.exports.ghostty_mouse_encoder_reset(this.encoder);
	}
	encode(e, t, n, r, i) {
		let a = this.exports, o = this.event;
		a.ghostty_mouse_event_set_action(o, e), t === null ? a.ghostty_mouse_event_clear_button(o) : a.ghostty_mouse_event_set_button(o, t), a.ghostty_mouse_event_set_mods(o, n);
		let s = this.scratch + 64, c = this.mem.view();
		c.setFloat32(s + this.L.mousePosition.x, r, !0), c.setFloat32(s + this.L.mousePosition.y, i, !0), a.ghostty_mouse_event_set_position(o, s);
		let l = this.scratch + 96, u = this.scratch + 88;
		if (a.ghostty_mouse_encoder_encode(this.encoder, o, l, 128, u) !== d) return "";
		let f = this.mem.view().getUint32(u, !0), p = this.mem.bytes().slice(l, l + f);
		try {
			return new TextDecoder("utf-8", { fatal: !0 }).decode(p);
		} catch {
			return String.fromCharCode(...p);
		}
	}
	dispose() {
		let e = this.exports;
		this.event && e.ghostty_mouse_event_free(this.event), this.encoder && e.ghostty_mouse_encoder_free(this.encoder), this.scratch && e.ghostty_wasm_free(this.scratch, 256), this.event = this.encoder = this.scratch = 0;
	}
}, R = 2048, z = 64, De = 16777215, Oe = 0, ke = "xterm-ghostty", Ae = 128, B = 256, je = 4096, Me = 1008, V = 1024, H = 1024, U = class {
	constructor(e, t, n, r = 80, i = 24, a) {
		this.renderState = 0, this.rowIterSlot = 0, this.rowCellsSlot = 0, this.scratch = 0, this.selScratch = 0, this.onFree = null, this.freed = !1, this.dirty = o.FULL, this.cellPool = [], this.fgDefault = {
			r: 204,
			g: 204,
			b: 204
		}, this.bgDefault = {
			r: 0,
			g: 0,
			b: 0
		}, this.colorsFresh = !1, this.atBottom = !0, this.pendingUpdate = !0, this.responses = [], this.effects = {}, this.holdStarted = null, this.answerbackBuf = 0, this.answerbackSize = 0, this.capture = null, this.oscCapture = null, this.cellPx = {
			width: 0,
			height: 0
		}, this.linkIds = /* @__PURE__ */ new Map(), this.nextLinkId = 1, this.primary = null, this.exports = e, this.mem = t, this.L = n, this.palette = new Uint8Array(256 * n.rgb.size), this._cols = r, this._rows = i;
		let s = this.exports;
		if (this.scratch = s.ghostty_wasm_alloc(R), this.selScratch = s.ghostty_wasm_alloc(B), !this.scratch) throw Error("Failed to allocate terminal scratch memory");
		let c = s.ghostty_wasm_alloc_opaque();
		try {
			this.check(s.ghostty_terminal_new(0, c, r, i), "create terminal"), this.handle = s.ghostty_wasm_take_opaque(c), this.check(s.ghostty_render_state_new(0, c), "create render state"), this.renderState = s.ghostty_wasm_take_opaque(c);
		} finally {
			s.ghostty_wasm_free_opaque(c);
		}
		this.rowIterSlot = s.ghostty_wasm_alloc_opaque(), this.check(s.ghostty_render_state_row_iterator_new(0, this.rowIterSlot), "create row iterator"), this.rowCellsSlot = s.ghostty_wasm_alloc_opaque(), this.check(s.ghostty_render_state_row_cells_new(0, this.rowCellsSlot), "create row cells"), this.setMode(he, !1, !0), this.applyConfig(a), this.rowDirty = new Uint8Array(i).fill(1), this.rowStale = new Uint8Array(i).fill(1), this.initCellPool();
	}
	get cols() {
		return this._cols;
	}
	get rows() {
		return this._rows;
	}
	check(e, t) {
		if (e !== d) throw Error(`libghostty-vt: failed to ${t} (${e})`);
	}
	setWritePty(e, t) {
		this.onFree = t, this.exports.ghostty_terminal_set(this.handle, p.WRITE_PTY, e);
	}
	queueResponse(e) {
		(this.capture ?? this.responses).push(e);
	}
	setEffects(e) {
		this.effects = e;
	}
	readString(e) {
		let t = this.mem.view(), n = t.getUint32(e + this.L.string.ptr, !0), r = t.getUint32(e + this.L.string.len, !0);
		return !n || !r ? "" : new TextDecoder().decode(this.mem.bytes().slice(n, n + r));
	}
	readDataString(e) {
		let t = this.selScratch + 240;
		return this.exports.ghostty_terminal_get(this.handle, e, t) === d ? this.readString(t) : "";
	}
	getTitle() {
		return this.readDataString(m.TITLE);
	}
	getMouseShape() {
		let e = this.selScratch + 240;
		return this.exports.ghostty_terminal_get(this.handle, m.MOUSE_SHAPE, e) === d ? ee[this.mem.view().getUint32(e, !0)] ?? null : null;
	}
	getPwd() {
		return this.readDataString(m.PWD);
	}
	onEffect(e) {
		let t = this.effects;
		e === "bell" ? t.bell?.() : e === "title" ? t.titleChanged?.(this.getTitle()) : e === "pwd" ? t.pwdChanged?.(this.getPwd()) : t.reset?.();
	}
	onClipboardWrite(e) {
		let t = this.effects.clipboardWrite;
		if (!t || !this.ghostty) return;
		let n = this.L.clipboardWrite, r = this.L.clipboardContent, i = this.mem.view(), a = ne[i.getUint32(e + n.location, !0)], o = i.getUint32(e + n.contents, !0), s = i.getUint32(e + n.contentsLen, !0), c = [];
		for (let e = 0; e < s; e++) {
			let t = o + e * r.size, n = this.mem.view(), i = n.getUint32(t + r.data + this.L.string.ptr, !0), a = n.getUint32(t + r.data + this.L.string.len, !0);
			c.push({
				mime: this.readString(t + r.mime),
				data: this.mem.bytes().slice(i, i + a)
			});
		}
		let l = t({
			location: a ?? "standard",
			contents: c
		}), u = this.L.clipboardReply, d = this.selScratch + 160;
		this.mem.bytes().fill(0, d, d + u.size);
		let f = this.mem.view();
		f.setUint32(d, u.size, !0), f.setUint32(d + u.result, l ? re.SUCCESS : re.DENIED, !0), f.setUint8(d + u.remember, 0);
		let p = f.getUint32(e + n.reply, !0);
		this.ghostty.callTable(p, e, d);
	}
	onNotification(e) {
		let t = this.L.notification;
		this.effects.notification?.({
			title: this.readString(e + t.title),
			body: this.readString(e + t.body)
		});
	}
	onProgress(e) {
		let t = this.L.progress, n = this.mem.view(), r = n.getInt8(e + t.progress);
		this.effects.progress?.({
			state: oe[n.getUint32(e + t.state, !0)] ?? "remove",
			progress: r < 0 ? null : r
		});
	}
	onProgramStatus(e) {
		let t = this.L.programStatus, n = this.mem.view(), r = n.getInt8(e + t.progress);
		this.effects.programStatus?.({
			state: se[n.getUint32(e + t.state, !0)] ?? "idle",
			kind: ce[n.getUint32(e + t.kind, !0)] ?? "none",
			progress: r < 0 ? null : r,
			id: this.readString(e + t.id),
			app: this.readString(e + t.app),
			title: this.readString(e + t.title),
			message: this.readString(e + t.message)
		});
	}
	onSemanticPrompt(e) {
		let t = this.L.semanticPrompt, n = this.mem.view(), r = le[n.getUint32(e + t.kind, !0)];
		r && this.effects.semanticPrompt?.({
			kind: r,
			promptKind: ue[n.getUint32(e + t.promptKind, !0)] ?? "primary",
			exitCode: n.getUint8(e + t.hasExitCode) ? n.getInt32(e + t.exitCode, !0) : null,
			command: this.readString(e + t.command),
			error: this.readString(e + t.error)
		});
	}
	onEnquiry(e) {
		let t = new TextEncoder().encode(this.effects.answerback?.() ?? ""), n = this.exports;
		t.length > this.answerbackSize && (this.answerbackBuf && n.ghostty_wasm_free(this.answerbackBuf, this.answerbackSize), this.answerbackBuf = n.ghostty_wasm_alloc(t.length), this.answerbackSize = this.answerbackBuf ? t.length : 0);
		let r = this.answerbackBuf ? t.length : 0;
		r && this.mem.bytes().set(t, this.answerbackBuf);
		let i = this.mem.view();
		i.setUint32(e + this.L.string.ptr, r ? this.answerbackBuf : 0, !0), i.setUint32(e + this.L.string.len, r, !0);
	}
	onColorScheme(e) {
		let t = this.effects.colorScheme?.();
		if (!t) return 0;
		let n = t === "dark" ? k.DARK : k.LIGHT;
		return this.mem.view().setUint32(e, n, !0), 1;
	}
	onSizeQuery(e) {
		let t = this.effects.cellSize?.();
		if (!t) return 0;
		let n = this.L.sizeReport, r = this.mem.view();
		return r.setUint16(e + n.rows, this._rows, !0), r.setUint16(e + n.columns, this._cols, !0), r.setUint32(e + n.cellWidth, Math.max(1, Math.round(t.width)), !0), r.setUint32(e + n.cellHeight, Math.max(1, Math.round(t.height)), !0), 1;
	}
	onRenderHold(e) {
		e ? (this.holdStarted = null, this.update(), this.holdStarted = performance.now()) : (this.holdStarted = null, this.pendingUpdate = !0);
	}
	isRenderHeld() {
		return this.holdStarted === null ? !1 : performance.now() - this.holdStarted > de ? (this.holdStarted = null, !1) : !0;
	}
	encodePaste(e) {
		let t = this.ghostty;
		if (!t) return "";
		let n = this.exports, r = new TextEncoder().encode(e), i = new TextEncoder().encode("text/plain"), a = this.L.paste, o = this.L.string, s = this.L.mimeReader, c = (e) => e + 3 & -4, l = c(a.size), u = l + 4, f = u + c(o.size), p = f + i.length;
		return t.withPasteData(r, (e) => {
			let t = n.ghostty_wasm_alloc(p), r = t;
			this.mem.bytes().fill(0, t, t + p), this.mem.bytes().set(i, t + f);
			let c = this.mem.view();
			c.setUint32(t + u + o.ptr, t + f, !0), c.setUint32(t + u + o.len, i.length, !0), c.setUint32(r, a.size, !0), c.setUint32(r + a.location, ne.indexOf("standard"), !0), c.setUint32(r + a.source, ie.CLIPBOARD, !0), c.setUint32(r + a.mimes, t + u, !0), c.setUint32(r + a.mimesLen, 1, !0), c.setUint32(r + a.reader + s.read, e, !0), c.setUint32(r + a.reader + s.userdata, 0, !0), c.setUint8(r + a.allowUnsafe, 1), this.capture = [];
			try {
				let e = n.ghostty_terminal_paste(this.handle, r, t + l), i = this.capture;
				if (e !== d) return "";
				let a = new Uint8Array(i.reduce((e, t) => e + t.length, 0)), o = 0;
				for (let e of i) a.set(e, o), o += e.length;
				return new TextDecoder().decode(a);
			} finally {
				this.capture = null, n.ghostty_wasm_free(t, p);
			}
		});
	}
	encodeFocus(e) {
		if (!this.getMode(1004, !1)) return "";
		let t = this.exports, n = this.selScratch + 192, r = this.selScratch + 224;
		if (t.ghostty_focus_encode(e ? ae.GAINED : ae.LOST, n, 16, r) !== d) return "";
		let i = this.mem.view().getUint32(r, !0);
		return new TextDecoder().decode(this.mem.bytes().slice(n, n + i));
	}
	setMode(e, t, n, r = !1) {
		let i = this.scratch, a = this.mem.view();
		a.setUint16(i, ye(e, t), !0), a.setUint8(i + this.L.modeConfig.value, +!!n), r || this.exports.ghostty_terminal_set(this.handle, p.MODE_DEFAULT, i), this.exports.ghostty_terminal_set(this.handle, p.MODE, i);
	}
	writeRgb(e, t) {
		let n = this.L.rgb, r = this.mem.view();
		r.setUint8(e + n.r, t >> 16 & 255), r.setUint8(e + n.g, t >> 8 & 255), r.setUint8(e + n.b, t & 255);
	}
	readRgb(e) {
		let t = this.L.rgb, n = this.mem.bytes();
		return {
			r: n[e + t.r],
			g: n[e + t.g],
			b: n[e + t.b]
		};
	}
	setColor(e, t) {
		this.writeRgb(this.scratch, t), this.exports.ghostty_terminal_set(this.handle, e, this.scratch);
	}
	applyConfig(e) {
		this.setScrollbackLimit(e?.scrollbackLimit ?? 1e4), this.setTerminfoName(e?.terminfoName ?? ke);
	}
	setTerminfoName(e) {
		let t = new TextEncoder().encode(e);
		if (t.length > Ae) throw Error(`terminfo name too long: ${e}`);
		let n = this.scratch, r = this.scratch + 16;
		this.mem.bytes().set(t, r);
		let i = this.mem.view();
		i.setUint32(n + this.L.string.ptr, r, !0), i.setUint32(n + this.L.string.len, t.length, !0), this.exports.ghostty_terminal_set(this.handle, p.TERMINFO_NAME, n);
	}
	setScrollbackLimit(e) {
		let t = this.exports, n = Math.max(0, Math.floor(e));
		this.mem.view().setUint32(this.scratch, n === 0 ? 0 : j, !0), t.ghostty_terminal_set(this.handle, p.SCROLLBACK_MAX_BYTES, this.scratch), this.mem.view().setUint32(this.scratch, Math.min(n, j), !0), t.ghostty_terminal_set(this.handle, p.SCROLLBACK_MAX_LINES, this.scratch), this.pendingUpdate = !0, this.primary = null;
	}
	setColors(e) {
		let t = this.exports;
		if (this.setColor(p.COLOR_FOREGROUND, e.foreground ?? De), this.setColor(p.COLOR_BACKGROUND, e.background ?? Oe), ((e, n) => {
			n === void 0 ? t.ghostty_terminal_set(this.handle, e, 0) : this.setColor(e, n);
		})(p.COLOR_CURSOR, e.cursor), t.ghostty_terminal_set(this.handle, p.COLOR_PALETTE, 0), e.palette?.some((e) => e !== void 0)) {
			let n = this.scratch;
			this.check(t.ghostty_terminal_get(this.handle, m.COLOR_PALETTE_DEFAULT, n), "read default palette"), e.palette.forEach((e, t) => {
				e !== void 0 && t < 256 && this.writeRgb(n + t * this.L.rgb.size, e);
			}), t.ghostty_terminal_set(this.handle, p.COLOR_PALETTE, n);
		}
		this.colorsFresh = !1, this.pendingUpdate = !0, this.dirty = o.FULL, this.rowDirty?.fill(1), this.rowStale?.fill(1);
	}
	write(e) {
		let t = typeof e == "string" ? new TextEncoder().encode(e) : e;
		if (t.length === 0) return;
		let n = this.exports.ghostty_wasm_alloc(t.length);
		if (!n) throw Error("Failed to allocate write buffer (out of memory)");
		this.mem.bytes().set(t, n), this.exports.ghostty_terminal_vt_write(this.handle, n, t.length), this.pendingUpdate = !0, this.primary = null, this.exports.ghostty_wasm_free(n, t.length);
	}
	get capturingOsc() {
		return this.oscCapture !== null;
	}
	writeCapturingOsc(e, t) {
		let n = typeof e == "string" ? new TextEncoder().encode(e) : e, r = n.length;
		if (r === 0) return;
		let i = this.exports, a = this.L.writeStop, o = i.ghostty_wasm_alloc(r + 1 + a.size);
		if (!o) throw Error("Failed to allocate write buffer (out of memory)");
		let s = o + r, c = s + 1;
		this.mem.bytes().set(n, o), this.mem.bytes()[s] = 24;
		try {
			let e = 0;
			for (; e < r;) {
				let l = this.oscCapture;
				if (l) {
					let a = e;
					for (; a < r && !_e.has(n[a]);) a++;
					for (let t = e; t < a; t++) n[t] < 32 || (l.bytes.length >= ve ? l.overflow = !0 : l.bytes.push(n[t]));
					if (a > e && i.ghostty_terminal_vt_write(this.handle, o + e, a - e), e = a, a === r) break;
					this.oscCapture = null;
					let c = n[a];
					if (c === 24 || c === 26) continue;
					!l.overflow && t(Uint8Array.from(l.bytes)) && (i.ghostty_terminal_vt_write(this.handle, s, 1), c === 7 && e++);
					continue;
				}
				let u = this.mem.view();
				for (let e = 0; e < a.size; e += 4) u.setUint32(c + e, 0, !0);
				u.setUint32(c, a.size, !0);
				let f = i.ghostty_terminal_vt_write_until(this.handle, o + e, r - e, ge, c), p = this.mem.view(), m = p.getUint32(c + a.consumed, !0);
				if (e += m, f !== d || m === 0) break;
				p.getUint32(c + a.reached, !0) & ge && (this.oscCapture = {
					bytes: [],
					overflow: !1
				});
			}
		} finally {
			i.ghostty_wasm_free(o, r + 1 + a.size), this.pendingUpdate = !0;
		}
	}
	setDefaultCursor(e, t) {
		let n = this.scratch, r = e === "bar" ? N.BAR : e === "underline" ? N.UNDERLINE : N.BLOCK;
		this.mem.view().setUint32(n, r, !0), this.exports.ghostty_terminal_set(this.handle, p.DEFAULT_CURSOR_STYLE, n), this.mem.view().setUint8(n, +!!t), this.exports.ghostty_terminal_set(this.handle, p.DEFAULT_CURSOR_BLINK, n), this.pendingUpdate = !0;
	}
	setCellPixelSize(e, t) {
		let n = Math.round(e), r = Math.round(t);
		(n !== this.cellPx.width || r !== this.cellPx.height) && (this.cellPx = {
			width: n,
			height: r
		}, this.exports.ghostty_terminal_resize(this.handle, this._cols, this._rows, n, r));
	}
	resize(e, t) {
		(e !== this._cols || t !== this._rows) && (this._cols = e, this._rows = t, this.exports.ghostty_terminal_resize(this.handle, e, t, this.cellPx.width, this.cellPx.height), this.pendingUpdate = !0, this.primary = null, this.atBottom = this.getViewportOffset() === 0, this.rowDirty = new Uint8Array(t).fill(1), this.rowStale = new Uint8Array(t).fill(1), this.dirty = o.FULL, this.initCellPool());
	}
	free() {
		if (this.freed) return;
		this.freed = !0;
		let e = this.exports;
		this.onFree?.(), this.onFree = null, this.rowCellsSlot &&= (e.ghostty_render_state_row_cells_free(this.mem.view().getUint32(this.rowCellsSlot, !0)), e.ghostty_wasm_free_opaque(this.rowCellsSlot), 0), this.rowIterSlot &&= (e.ghostty_render_state_row_iterator_free(this.mem.view().getUint32(this.rowIterSlot, !0)), e.ghostty_wasm_free_opaque(this.rowIterSlot), 0), this.renderState &&= (e.ghostty_render_state_free(this.renderState), 0), e.ghostty_terminal_free(this.handle), this.answerbackBuf &&= (e.ghostty_wasm_free(this.answerbackBuf, this.answerbackSize), 0), this.scratch &&= (e.ghostty_wasm_free(this.scratch, R), e.ghostty_wasm_free(this.selScratch, B), 0);
	}
	update() {
		let e = this.exports;
		if (this.isRenderHeld()) return this.dirty;
		e.ghostty_render_state_update(this.renderState, this.handle), this.colorsFresh = !1, this.pendingUpdate = !1, e.ghostty_render_state_get(this.renderState, g.DIRTY, this.scratch);
		let t = this.mem.view().getInt32(this.scratch, !0);
		if (t === o.NONE) return this.dirty;
		if (t > this.dirty && (this.dirty = t), t === o.FULL) return this.rowDirty.fill(1), this.rowStale.fill(1), this.dirty;
		let n = this.rowIterator(), r = this.scratch;
		for (; e.ghostty_render_state_row_iterator_next_dirty(n, r);) {
			let e = this.mem.view().getUint16(r, !0);
			e < this._rows && (this.rowDirty[e] = 1, this.rowStale[e] = 1);
		}
		return this.dirty;
	}
	rowIterator() {
		return this.exports.ghostty_render_state_get(this.renderState, g.ROW_ITERATOR, this.rowIterSlot), this.mem.view().getUint32(this.rowIterSlot, !0);
	}
	getCursor() {
		this.pendingUpdate && this.update();
		let e = this.scratch, t = this.L.cursor;
		this.mem.view().setUint32(e, t.size, !0), this.exports.ghostty_render_state_get(this.renderState, g.CURSOR, e), this.exports.ghostty_terminal_get(this.handle, m.CURSOR_X, e + 64), this.exports.ghostty_terminal_get(this.handle, m.CURSOR_Y, e + 68);
		let n = this.mem.view(), r = n.getUint16(e + 64, !0), i = n.getUint16(e + 68, !0), a = n.getUint8(e + t.hasValue) !== 0, o = n.getInt32(e + t.style, !0);
		return {
			x: r,
			y: i,
			viewportX: a ? n.getUint16(e + t.x, !0) : -1,
			viewportY: a ? n.getUint16(e + t.y, !0) : -1,
			visible: n.getUint8(e + t.visible) !== 0,
			blinking: n.getUint8(e + t.blinking) !== 0,
			style: o === N.BAR ? "bar" : o === N.UNDERLINE ? "underline" : "block"
		};
	}
	loadColors(e = !1) {
		if (this.colorsFresh && !e) return;
		let t = this.scratch, n = this.L.colors;
		this.mem.view().setUint32(t, n.size, !0), this.exports.ghostty_render_state_get(this.renderState, g.COLORS, t), this.bgDefault = this.readRgb(t + n.bg), this.fgDefault = this.readRgb(t + n.fg);
		let r = t + n.palette;
		this.palette.set(this.mem.bytes().subarray(r, r + this.palette.length)), this.colorsFresh = !0;
	}
	getColors() {
		this.pendingUpdate && this.update(), this.loadColors(!0);
		let e = this.scratch, t = this.L.colors, n = this.mem.bytes()[e + t.hasCursor] !== 0;
		return {
			background: { ...this.bgDefault },
			foreground: { ...this.fgDefault },
			cursor: n ? this.readRgb(e + t.cursor) : null
		};
	}
	isRowDirty(e) {
		return this.dirty === o.FULL || this.rowDirty[e] === 1;
	}
	markClean() {
		this.exports.ghostty_render_state_clean(this.renderState), this.dirty = o.NONE, this.rowDirty.fill(0);
	}
	reset() {
		this.exports.ghostty_terminal_reset(this.handle), this.primary = null, this.oscCapture = null, this.holdStarted = null, this.responses = [], this.atBottom = !0, this.colorsFresh = !1, this.pendingUpdate = !0, this.dirty = o.FULL, this.rowDirty.fill(1), this.rowStale.fill(1);
	}
	getViewport() {
		if (this.pendingUpdate && this.update(), !this.rowStale.includes(1)) return this.cellPool;
		this.loadColors();
		let e = this.exports, t = this.rowIterator(), n = this.scratch, r = () => this.mem.view().getUint32(this.rowCellsSlot, !0), i = 0;
		for (; i < this._rows && e.ghostty_render_state_row_iterator_next(t);) {
			if (this.rowStale[i]) {
				if (e.ghostty_render_state_row_get(t, _.CELLS_RAW, n) === d) {
					let a = !1, o = () => (a ||= (e.ghostty_render_state_row_get(t, _.CELLS, this.rowCellsSlot), !0), r()), s = this.L.rowSelection, c = this.scratch + 192;
					this.mem.view().setUint32(c, s.size, !0);
					let l = e.ghostty_render_state_row_get(t, _.SELECTION, c) === d ? [this.mem.view().getUint16(c + s.startX, !0), this.mem.view().getUint16(c + s.endX, !0)] : null;
					this.readRow(i, n, o, l);
				}
				this.rowStale[i] = 0;
			}
			i++;
		}
		return this.cellPool;
	}
	readRow(t, n, r, i) {
		let a = this.exports, o = this.L, s = this.mem.view(), c = s.getUint32(n + o.cellsView.ptr, !0), l = Math.min(s.getUint32(n + o.cellsView.len, !0), this._cols), u = t * this._cols, d = this.scratch + 64, f = o.cellSize, p = this.mem.bytes().slice(c, c + l * f), m = new DataView(p.buffer);
		for (let n = 0; n < this._cols; n++) {
			let s = this.cellPool[u + n];
			if (n >= l) {
				this.setBlank(s);
				continue;
			}
			let c = m.getUint32(n * f, !0), p = m.getUint32(n * f + 4, !0), h = e(c, p, o.cell.styleId), g = e(c, p, o.cell.contentTag), _ = 0, y, x = null;
			if (h !== 0 || g === M.CODEPOINT_GRAPHEME) {
				let e = r();
				if (a.ghostty_render_state_row_cells_select(e, n), h !== 0 && (a.ghostty_render_state_row_cells_get(e, v.STYLE, d), x = new DataView(this.mem.bytes().slice(d, d + o.style.size).buffer)), g === M.CODEPOINT_GRAPHEME) {
					let t = this.rowCellGrapheme(e);
					t.length > 0 && (y = String.fromCodePoint(...t), _ = t.length - 1);
				}
			}
			this.decodeCell(s, c, p, x, _), s.chars = y, s.selected = i !== null && n >= i[0] && n <= i[1], s.hyperlink_id &&= this.linkId(this.hyperlinkAt(b.VIEWPORT, n, t));
		}
	}
	rowCellGrapheme(e) {
		let t = this.exports, n = this.L.codepointBuffer, r = this.scratch + Me, i = (i, a) => {
			let o = this.mem.view();
			o.setUint32(r + n.ptr, i, !0), o.setUint32(r + n.cap, a, !0), o.setUint32(r + n.len, 0, !0);
			let s = t.ghostty_render_state_row_cells_get(e, v.GRAPHEMES_BUF, r);
			if (s !== d) return s;
			let c = this.mem.view().getUint32(r + n.len, !0);
			return Array.from(new Uint32Array(this.mem.bytes().slice(i, i + c * 4).buffer));
		}, a = i(this.scratch + V, H / 4);
		if (typeof a != "number") return a;
		if (a !== f || t.ghostty_render_state_row_cells_get(e, v.GRAPHEMES_LEN, r)) return [];
		let o = this.mem.view().getUint32(r, !0), s = t.ghostty_wasm_alloc(o * 4);
		try {
			let e = i(s, o);
			return typeof e == "number" ? [] : e;
		} finally {
			t.ghostty_wasm_free(s, o * 4);
		}
	}
	setBlank(e) {
		e.codepoint = 0, e.fg_r = this.fgDefault.r, e.fg_g = this.fgDefault.g, e.fg_b = this.fgDefault.b, e.bg_r = this.bgDefault.r, e.bg_g = this.bgDefault.g, e.bg_b = this.bgDefault.b, e.flags = 0, e.width = 1, e.hyperlink_id = 0, e.grapheme_len = 0, e.chars = void 0, e.underline_style = s.NONE, e.underline_color = void 0, e.overline = !1, e.selected = !1, e.bg_default = !0, e.fg_default = !0;
	}
	decodeCell(t, n, r, i, a) {
		let o = this.L, l = e(n, r, o.cell.contentTag);
		t.codepoint = l === M.CODEPOINT || l === M.CODEPOINT_GRAPHEME ? e(n, r, o.cell.codepoint) : 0;
		let u = this.fgDefault, d = this.bgDefault, f = !0, p = !0, m = 0, h = s.NONE, g, _ = !1;
		if (i) {
			h = e(i.getUint16(o.style.flags, !0), 0, o.styleFlags.underline), _ = e(i.getUint16(o.style.flags, !0), 0, o.styleFlags.overline) !== 0;
			let t = this.resolveStyleColor(i, o.style.underline);
			t && (g = t.r << 16 | t.g << 8 | t.b);
			let n = this.resolveStyleColor(i, o.style.fg);
			n && (u = n, p = !1);
			let r = this.resolveStyleColor(i, o.style.bg);
			r && (d = r, f = !1);
			let a = i.getUint16(o.style.flags, !0), s = o.styleFlags;
			e(a, 0, s.bold) && (m |= c.BOLD), e(a, 0, s.italic) && (m |= c.ITALIC), e(a, 0, s.underline) && (m |= c.UNDERLINE), e(a, 0, s.strikethrough) && (m |= c.STRIKETHROUGH), e(a, 0, s.inverse) && (m |= c.INVERSE), e(a, 0, s.invisible) && (m |= c.INVISIBLE), e(a, 0, s.blink) && (m |= c.BLINK), e(a, 0, s.faint) && (m |= c.FAINT);
		}
		l === M.BG_COLOR_PALETTE ? (d = this.paletteColor(e(n, r, o.cell.bgPalette)), f = !1) : l === M.BG_COLOR_RGB && (d = {
			r: e(n, r, o.cell.bgR),
			g: e(n, r, o.cell.bgG),
			b: e(n, r, o.cell.bgB)
		}, f = !1), t.fg_r = u.r, t.fg_g = u.g, t.fg_b = u.b, t.bg_r = d.r, t.bg_g = d.g, t.bg_b = d.b, t.bg_default = f, t.fg_default = p, t.flags = m;
		let v = e(n, r, o.cell.wide);
		t.width = v === pe.NARROW ? 1 : v === pe.WIDE ? 2 : 0, t.hyperlink_id = +!!e(n, r, o.cell.hyperlink), t.grapheme_len = a, t.underline_style = h, t.underline_color = g, t.overline = _;
	}
	paletteColor(e) {
		let t = this.L.rgb, n = this.palette, r = e * t.size;
		return {
			r: n[r + t.r],
			g: n[r + t.g],
			b: n[r + t.b]
		};
	}
	resolveStyleColor(e, t) {
		let n = this.L.styleColor, r = e.getUint8(t + n.tag);
		return r === me.PALETTE ? this.paletteColor(e.getUint8(t + n.value)) : r === me.RGB ? {
			r: e.getUint8(t + n.r),
			g: e.getUint8(t + n.g),
			b: e.getUint8(t + n.b)
		} : null;
	}
	getLine(e) {
		return e < 0 || e >= this._rows ? null : this.readGridLine(b.ACTIVE, e);
	}
	getViewportLine(e) {
		if (e < 0 || e >= this._rows) return null;
		let t = this.getViewport(), n = e * this._cols;
		return t.slice(n, n + this._cols).map((e) => ({ ...e }));
	}
	setViewportOffset(e) {
		let { total: t, offset: n, len: r } = this.scrollbar(), i = Math.max(0, t - r), a = Math.max(0, Math.min(i, Math.floor(e)));
		(a !== i - n || this.atBottom !== (a === 0)) && (a === 0 ? this.scrollViewport(A.BOTTOM, 0) : this.scrollViewport(A.ROW, i - a), this.atBottom = a === 0);
	}
	scrollbar() {
		let e = this.L.scrollbar, t = this.scratch + 448;
		this.exports.ghostty_terminal_get(this.handle, m.SCROLLBAR, t);
		let n = this.mem.view();
		return {
			total: Number(n.getBigUint64(t + e.total, !0)),
			offset: Number(n.getBigUint64(t + e.offset, !0)),
			len: Number(n.getBigUint64(t + e.len, !0))
		};
	}
	scrollViewport(e, t) {
		let n = this.L.scrollViewport, r = this.scratch + 480;
		this.mem.bytes().fill(0, r, r + n.size);
		let i = this.mem.view();
		i.setInt32(r + n.tag, e, !0), e === A.ROW ? i.setUint32(r + n.row, t, !0) : i.setInt32(r + n.delta, t, !0), this.exports.ghostty_terminal_scroll_viewport(this.handle, r), this.pendingUpdate = !0;
	}
	scrollBy(e, t) {
		this.scrollViewport(e, t), this.atBottom = this.getViewportOffset() === 0;
	}
	scrollToPrompt(e) {
		if (e === 0) return !1;
		let t = this.getViewportOffset();
		this.scrollBy(A.DELTA_PROMPT, e), this.getViewportOffset() === t && e < 0 && (this.scrollBy(A.DELTA, -1), this.scrollBy(A.DELTA_PROMPT, e));
		let n = this.getViewportOffset() !== t;
		return n || this.setViewportOffset(t), n;
	}
	getViewportOffset() {
		let { total: e, offset: t, len: n } = this.scrollbar();
		return Math.max(0, e - n - t);
	}
	needsFullRedraw() {
		return this.update() === o.FULL;
	}
	clearDirty() {
		this.markClean();
	}
	isAlternateScreen() {
		return this.exports.ghostty_terminal_get(this.handle, m.ACTIVE_SCREEN, this.scratch), this.mem.view().getInt32(this.scratch, !0) === h.ALTERNATE;
	}
	hasBracketedPaste() {
		return this.getMode(2004, !1);
	}
	hasFocusEvents() {
		return this.getMode(1004, !1);
	}
	hasMouseTracking() {
		return this.exports.ghostty_terminal_get(this.handle, m.MOUSE_TRACKING, this.scratch), this.mem.view().getUint8(this.scratch) !== 0;
	}
	getMode(e, t = !1) {
		let n = this.scratch, r = this.mem.view();
		return r.setUint16(n, ye(e, t), !0), r.setUint8(n + this.L.modeConfig.value, 0), this.exports.ghostty_terminal_get(this.handle, m.MODE, n) === d && this.mem.view().getUint8(n + this.L.modeConfig.value) !== 0;
	}
	getDimensions() {
		return {
			cols: this._cols,
			rows: this._rows
		};
	}
	getScrollbackLength() {
		return this.exports.ghostty_terminal_get(this.handle, m.SCROLLBACK_ROWS, this.scratch), this.mem.view().getUint32(this.scratch, !0);
	}
	viewportRef(e, t, n) {
		return this.gridRef(b.VIEWPORT, e, t, n);
	}
	gridRef(e, t, n, r) {
		let i = this.writePoint(e, t, n);
		return this.exports.ghostty_terminal_grid_ref(this.handle, i, r) === d;
	}
	writePoint(e, t, n) {
		let r = this.L.point, i = this.scratch + 256, a = this.mem.view();
		for (let e = 0; e < r.size; e += 4) a.setUint32(i + e, 0, !0);
		return a.setInt32(i, e, !0), a.setUint16(i + r.value + r.x, t, !0), a.setUint32(i + r.value + r.y, n, !0), i;
	}
	trackRow(e) {
		if (e < 0 || !Number.isInteger(e)) return null;
		let t = this.writePoint(b.SCREEN, 0, e), n = this.scratch + 320;
		if (this.mem.view().setUint32(n, 0, !0), this.exports.ghostty_terminal_grid_ref_track(this.handle, t, n) !== d) return null;
		let r = this.mem.view().getUint32(n, !0);
		return r ? new Ne(this.exports, this.mem, this.L, r) : null;
	}
	getScrollbackLine(e) {
		return e < 0 || e >= this.getScrollbackLength() ? null : this.readGridLine(b.HISTORY, e);
	}
	readGridLine(t, n) {
		this.pendingUpdate && this.update(), this.loadColors();
		let r = this.exports, i = this.scratch + 320, a = this.scratch + 336, o = this.scratch + 352, s = this.L, c = [];
		for (let l = 0; l < this._cols; l++) {
			let u = {};
			if (!this.gridRef(t, l, n, i) || r.ghostty_grid_ref_cell(i, a) !== d) {
				if (l === 0) return null;
				this.setBlank(u), c.push(u);
				continue;
			}
			let f = this.mem.view(), p = f.getUint32(a, !0), m = f.getUint32(a + 4, !0), h = null;
			e(p, m, s.cell.styleId) !== 0 && r.ghostty_grid_ref_style(i, o) === d && (h = new DataView(this.mem.bytes().slice(o, o + s.style.size).buffer));
			let g = null;
			e(p, m, s.cell.contentTag) === M.CODEPOINT_GRAPHEME && (g = this.graphemeAt(t, l, n));
			let _ = g ? Math.max(0, g.length - 1) : 0;
			this.decodeCell(u, p, m, h, _), u.selected = !1, _ > 0 && (u.chars = String.fromCodePoint(...g)), u.hyperlink_id &&= this.linkId(this.hyperlinkAt(t, l, n)), c.push(u);
		}
		return c;
	}
	linkId(e) {
		if (!e) return 0;
		let t = this.linkIds.get(e);
		return t === void 0 && (this.linkIds.size >= je && (this.linkIds.clear(), this.rowStale.fill(1), this.rowDirty.fill(1), this.dirty = o.FULL), t = this.nextLinkId++, this.linkIds.set(e, t)), t;
	}
	getScreenLine(e) {
		return e < 0 ? null : this.readGridLine(b.SCREEN, e);
	}
	isScreenRowWrapped(e) {
		return this.rowWraps(b.SCREEN, e);
	}
	getScreenHyperlinkUri(e, t) {
		return this.hyperlinkAt(b.SCREEN, t, e);
	}
	rowWraps(e, t) {
		let n = this.scratch + 320, r = this.scratch + 336, i = this.scratch + 352;
		if (!this.gridRef(e, 0, t, n) || this.exports.ghostty_grid_ref_row(n, r) !== d) return !1;
		let a = this.mem.view().getBigUint64(r, !0);
		return this.exports.ghostty_row_get(a, y.WRAP_CONTINUATION, i) === d && this.mem.view().getUint8(i) !== 0;
	}
	hyperlinkAt(e, t, n) {
		let r = this.exports, i = this.scratch + 320, a = this.scratch + 336;
		if (!this.gridRef(e, t, n, i) || r.ghostty_grid_ref_hyperlink_uri(i, 0, 0, a) !== f) return null;
		let o = this.mem.view().getUint32(a, !0);
		if (o === 0) return null;
		let s = r.ghostty_wasm_alloc(o);
		try {
			if (r.ghostty_grid_ref_hyperlink_uri(i, s, o, a) !== d) return null;
			let e = this.mem.view().getUint32(a, !0);
			return new TextDecoder().decode(this.mem.bytes().slice(s, s + e));
		} finally {
			r.ghostty_wasm_free(s, o);
		}
	}
	readResponse() {
		if (this.responses.length === 0) return null;
		let e = this.responses.reduce((e, t) => e + t.length, 0), t = new Uint8Array(e), n = 0;
		for (let e of this.responses) t.set(e, n), n += e.length;
		return this.responses = [], new TextDecoder().decode(t);
	}
	hasSelection() {
		return this.exports.ghostty_terminal_get(this.handle, m.SELECTION, this.selScratch) === d;
	}
	getSelectionRange() {
		let e = this.selScratch;
		return this.exports.ghostty_terminal_get(this.handle, m.SELECTION, e) === d ? this.selectionRangeAt(e) : null;
	}
	selectionRangeAt(e) {
		let t = this.exports, n = this.L.selection, r = this.selScratch + 32;
		if (t.ghostty_terminal_selection_ordered(this.handle, e, x.FORWARD, r) !== d) return null;
		let i = this.screenPoint(r + n.start), a = this.screenPoint(r + n.end);
		return !i || !a ? null : {
			startCol: i.x,
			startRow: i.y,
			endCol: a.x,
			endRow: a.y,
			rectangle: this.mem.view().getUint8(r + n.rectangle) !== 0
		};
	}
	screenPoint(e) {
		let t = this.selScratch + 64;
		if (this.exports.ghostty_terminal_point_from_grid_ref(this.handle, e, b.SCREEN, t) !== d) return null;
		let n = this.mem.view();
		return {
			x: n.getUint16(t + this.L.coordinate.x, !0),
			y: n.getUint32(t + this.L.coordinate.y, !0)
		};
	}
	setSelectionRange(e, t, n, r, i = !1) {
		let a = this.L.selection, o = this.selScratch + 128;
		for (let e = 0; e < a.size; e++) this.mem.view().setUint8(o + e, 0);
		return !this.gridRef(b.SCREEN, e, t, o + a.start) || !this.gridRef(b.SCREEN, n, r, o + a.end) ? !1 : (this.mem.view().setUint8(o + a.rectangle, +!!i), this.installSelection(o));
	}
	clearToCursorLine() {
		let { x: e, y: t } = this.getCursor(), n = this.getScrollbackLength() + this._rows - 1, r = this.formatScreen({
			format: "vt",
			extras: 0,
			fromRow: n,
			toRow: n
		}), i = this.formatScreen({
			format: "vt",
			extras: 132,
			fromRow: n,
			toRow: n
		}), a = i.startsWith(r) ? i.slice(r.length) : "", o = this.getMode(6), s = this.getMode(69), c = `${s ? "\x1B[?69l" : ""}\x1b[r\x1b[0m`;
		t > 0 && (c += `\x1b[${t}S`), this._rows > 1 && (c += "\x1B[2;1H\x1B[J"), c += `\x1b[3J${s ? "\x1B[?69h" : ""}${a}`, this.write(c), o && this.setMode(6, !1, !1, !0), this.write(`\x1b[1;${e + 1}H`), o && this.setMode(6, !1, !0, !0);
	}
	invalidate() {
		this.pendingUpdate = !0;
	}
	installSelection(e) {
		let t = this.exports.ghostty_terminal_set(this.handle, p.SELECTION, e) === d;
		return this.pendingUpdate = !0, t;
	}
	adjustSelection(e) {
		let t = this.exports, n = this.selScratch + 128;
		return t.ghostty_terminal_get(this.handle, m.SELECTION, n) !== d || t.ghostty_terminal_selection_adjust(this.handle, n, fe[e]) !== d ? !1 : this.installSelection(n);
	}
	clearSelection() {
		this.exports.ghostty_terminal_set(this.handle, p.SELECTION, 0), this.pendingUpdate = !0;
	}
	selectAll() {
		let e = this.selScratch + 128;
		return this.exports.ghostty_terminal_select_all(this.handle, e) === d && this.installSelection(e);
	}
	getSelectionText() {
		let e = this.selScratch;
		return this.exports.ghostty_terminal_get(this.handle, m.SELECTION, e) === d ? this.format({
			format: "plain",
			unwrap: !0,
			trim: !0,
			selectionPtr: e
		}) : "";
	}
	formatScreen(e) {
		return e.screen === "primary" && this.isAlternateScreen() ? this.readPrimary(() => this.formatActiveScreen(e)) : this.formatActiveScreen(e);
	}
	primaryScreen() {
		if (!this.isAlternateScreen()) return null;
		if (this.primary) return this.primary;
		let e = /* @__PURE__ */ new Map(), t = this.readPrimary(() => this.getScrollbackLength()), n = t + this._rows, r = {
			scrollback: t,
			length: n,
			line: (t) => {
				if (t < 0 || t >= n) return null;
				if (!e.has(t) && this.primary === r) {
					let r = t - t % z;
					this.readPrimary(() => {
						for (let t = r; t < Math.min(n, r + z); t++) {
							let n = this.getScreenLine(t);
							n && e.set(t, {
								cells: n,
								wrapped: this.isScreenRowWrapped(t)
							});
						}
					});
				}
				return e.get(t) ?? null;
			}
		};
		return this.primary = r, r;
	}
	readPrimary(e) {
		this.pendingUpdate && this.update(), this.loadColors();
		let t = this.primary;
		try {
			return this.withPrimaryScreen(() => (this.pendingUpdate = !1, e()));
		} finally {
			this.primary = t, this.isRenderHeld() || (this.exports.ghostty_render_state_update(this.renderState, this.handle), this.exports.ghostty_render_state_clean(this.renderState), this.pendingUpdate = !1);
		}
	}
	withPrimaryScreen(e) {
		let t = this.getSelectionRange(), n = this.getMode(47);
		this.write("\x1B[?47l");
		try {
			return e();
		} finally {
			if (this.write("\x1B[?47h"), n || this.setMode(47, !1, !1), t) {
				let { startCol: e, startRow: n, endCol: r, endRow: i, rectangle: a } = t;
				this.setSelectionRange(e, n, r, i, a);
			}
			this.invalidate();
		}
	}
	formatActiveScreen(e) {
		if (e.onlySelection) {
			let t = this.selScratch;
			return this.exports.ghostty_terminal_get(this.handle, m.SELECTION, t) === d ? this.format({
				...e,
				selectionPtr: t
			}) : "";
		}
		let t = this.getScrollbackLength(), n = t + this._rows - 1, r = e.fromRow ?? 0;
		e.fromRow === void 0 && e.scrollback !== void 0 && (r = t - Math.max(0, Math.floor(e.scrollback))), r = Math.max(0, r);
		let i = Math.min(n, e.toRow ?? n);
		if (r > i) return "";
		let a;
		if (r > 0 || i < n) {
			let e = this.L.selection, t = this.selScratch + 128;
			for (let n = 0; n < e.size; n++) this.mem.view().setUint8(t + n, 0);
			this.gridRef(b.SCREEN, 0, r, t + e.start) && this.gridRef(b.SCREEN, this._cols - 1, i, t + e.end) && (a = t);
		}
		return this.format({
			...e,
			selectionPtr: a
		});
	}
	format(e) {
		let t = this.exports, n = t.ghostty_wasm_alloc_opaque(), r = t.ghostty_formatter_terminal_new(0, n, this.handle), i = t.ghostty_wasm_take_opaque(n);
		if (t.ghostty_wasm_free_opaque(n), r !== d) return "";
		let a = this.selScratch + 192;
		try {
			let n = e.format === "vt" ? C.VT : e.format === "html" ? C.HTML : C.PLAIN;
			this.mem.view().setUint32(a, n, !0), t.ghostty_formatter_set(i, S.EMIT, a), this.mem.view().setUint8(a, +!!e.unwrap), t.ghostty_formatter_set(i, S.UNWRAP, a), this.mem.view().setUint8(a, +!!e.trim), t.ghostty_formatter_set(i, S.TRIM, a), e.extras !== void 0 && (this.mem.view().setUint32(a, e.extras, !0), t.ghostty_formatter_set(i, S.EXTRAS, a)), e.selectionPtr !== void 0 && t.ghostty_formatter_set(i, S.SELECTION, e.selectionPtr);
			let r = a + 16, o = a + 20;
			if (t.ghostty_formatter_format_alloc(i, 0, r, o) !== d) return "";
			let s = this.mem.view(), c = s.getUint32(r, !0), l = s.getUint32(o, !0), u = new TextDecoder().decode(this.mem.bytes().slice(c, c + l));
			return t.ghostty_free(0, c, l), u;
		} finally {
			t.ghostty_formatter_free(i);
		}
	}
	createSearch() {
		return new Le(this.exports, this.mem, this.L, this);
	}
	createSelectionGesture() {
		return new Ie(this.exports, this.mem, this.L, this);
	}
	initCellPool() {
		let e = this._cols * this._rows;
		if (this.cellPool.length < e) for (let t = this.cellPool.length; t < e; t++) this.cellPool.push({
			codepoint: 0,
			fg_r: 204,
			fg_g: 204,
			fg_b: 204,
			bg_r: 0,
			bg_g: 0,
			bg_b: 0,
			flags: 0,
			width: 1,
			hyperlink_id: 0,
			grapheme_len: 0
		});
	}
	graphemeAt(e, t, n) {
		let r = this.exports, i = this.scratch + 320, a = this.scratch + 336;
		if (!this.gridRef(e, t, n, i)) return null;
		let o = H / 4, s = this.scratch + V, c = r.ghostty_grid_ref_graphemes(i, s, o, a);
		if (c === d) {
			let e = this.mem.view().getUint32(a, !0);
			return Array.from(new Uint32Array(this.mem.bytes().slice(s, s + e * 4).buffer));
		}
		if (c !== f) return null;
		let l = this.mem.view().getUint32(a, !0), u = r.ghostty_wasm_alloc(l * 4);
		try {
			if (c = r.ghostty_grid_ref_graphemes(i, u, l, a), c !== d) return null;
			let e = this.mem.view().getUint32(a, !0);
			return Array.from(new Uint32Array(this.mem.bytes().slice(u, u + e * 4).buffer));
		} finally {
			r.ghostty_wasm_free(u, l * 4);
		}
	}
}, Ne = class {
	constructor(e, t, n, r) {
		this.exports = e, this.mem = t, this.L = n, this.ref = r, this.out = e.ghostty_wasm_alloc(n.coordinate.size);
	}
	get alive() {
		return this.ref !== 0 && this.exports.ghostty_tracked_grid_ref_has_value(this.ref) !== 0;
	}
	get row() {
		return !this.ref || this.exports.ghostty_tracked_grid_ref_point(this.ref, b.SCREEN, this.out) !== d ? null : this.mem.view().getUint32(this.out + this.L.coordinate.y, !0);
	}
	free() {
		this.ref &&= (this.exports.ghostty_tracked_grid_ref_free(this.ref), this.exports.ghostty_wasm_free(this.out, this.L.coordinate.size), this.out = 0);
	}
}, Pe = 500, Fe = 10, Ie = class {
	constructor(e, t, n, r) {
		this.exports = e, this.mem = t, this.L = n, this.term = r, this.gesture = 0, this.events = {}, this.scratch = 0;
		let i = this.exports, a = i.ghostty_wasm_alloc_opaque();
		try {
			if (i.ghostty_selection_gesture_new(0, a) !== d) throw Error("libghostty-vt: failed to create selection gesture");
			this.gesture = i.ghostty_wasm_take_opaque(a);
			for (let e of [
				T.PRESS,
				T.RELEASE,
				T.DRAG,
				T.AUTOSCROLL_TICK
			]) {
				if (i.ghostty_selection_gesture_event_new(0, a, e) !== d) throw Error("libghostty-vt: failed to create selection gesture event");
				this.events[e] = i.ghostty_wasm_take_opaque(a);
			}
		} finally {
			i.ghostty_wasm_free_opaque(a);
		}
		this.scratch = i.ghostty_wasm_alloc(256), this.setRepeat(Pe, Fe);
	}
	setRepeat(e, t) {
		let n = this.exports, r = this.events[T.PRESS], i = this.scratch + 112;
		this.mem.view().setBigUint64(i, BigInt(Math.round(e * 1e6)), !0), n.ghostty_selection_gesture_event_set(r, E.REPEAT_INTERVAL_NS, i), this.mem.view().setFloat64(i + 8, t, !0), n.ghostty_selection_gesture_event_set(r, E.REPEAT_DISTANCE, i + 8);
	}
	get terminal() {
		return this.term;
	}
	setRef(e, t, n) {
		let r = this.scratch;
		this.term.viewportRef(t, n, r) ? this.exports.ghostty_selection_gesture_event_set(e, E.REF, r) : this.exports.ghostty_selection_gesture_event_set(e, E.REF, 0);
	}
	setPosition(e, t, n) {
		let r = this.scratch + 16, i = this.mem.view();
		i.setFloat64(r + this.L.surface.x, t, !0), i.setFloat64(r + this.L.surface.y, n, !0), this.exports.ghostty_selection_gesture_event_set(e, E.POSITION, r);
	}
	setRectangle(e, t) {
		let n = this.scratch + 104;
		this.mem.view().setUint8(n, +!!t), this.exports.ghostty_selection_gesture_event_set(e, E.RECTANGLE, n);
	}
	setGeometry(e, t) {
		let n = this.scratch + 32, r = this.L.geometry, i = this.mem.view();
		i.setUint32(n + r.columns, Math.max(1, t.columns), !0), i.setUint32(n + r.cellWidth, Math.max(1, Math.round(t.cellWidth)), !0), i.setUint32(n + r.paddingLeft, 0, !0), i.setUint32(n + r.screenHeight, Math.max(1, Math.round(t.screenHeight)), !0), this.exports.ghostty_selection_gesture_event_set(e, E.GEOMETRY, n);
	}
	apply(e, t) {
		let n = this.scratch + 64, r = this.exports.ghostty_selection_gesture_event(this.gesture, this.term.handle, e, n);
		return this.term.invalidate(), r === d ? (this.term.installSelection(n), !0) : (t && this.term.clearSelection(), !1);
	}
	press(e, t, n, r, i) {
		let a = this.events[T.PRESS];
		this.setRef(a, e, t), this.setPosition(a, n, r);
		let o = this.scratch + 48;
		return this.mem.view().setBigUint64(o, BigInt(Math.max(0, Math.round(i * 1e6))), !0), this.exports.ghostty_selection_gesture_event_set(a, E.TIME_NS, o), this.apply(a, !0);
	}
	drag(e, t, n, r, i, a = !1) {
		let o = this.events[T.DRAG];
		return this.setRef(o, e, t), this.setPosition(o, n, r), this.setGeometry(o, i), this.setRectangle(o, a), this.apply(o, !0);
	}
	release() {
		this.apply(this.events[T.RELEASE], !1);
	}
	autoscrollTick(e, t, n, r, i, a = !1) {
		let o = this.exports, s = this.events[T.AUTOSCROLL_TICK];
		this.setRectangle(s, a);
		let c = this.scratch + 80, l = this.mem.view();
		return this.mem.bytes().fill(0, c, c + this.L.coordinate.size), l.setUint16(c + this.L.coordinate.x, e, !0), l.setUint32(c + this.L.coordinate.y, t, !0), o.ghostty_selection_gesture_event_set(s, E.VIEWPORT, c), this.setPosition(s, n, r), this.setGeometry(s, i), this.apply(s, !1);
	}
	autoscroll() {
		let e = this.scratch + 96;
		return this.mem.view().setUint32(e, 0, !0), this.exports.ghostty_selection_gesture_get(this.gesture, this.term.handle, te.AUTOSCROLL, e), this.mem.view().getUint32(e, !0);
	}
	reset() {
		this.exports.ghostty_selection_gesture_reset(this.gesture, this.term.handle);
	}
	dispose(e = !0) {
		let t = this.exports;
		if (this.gesture) {
			for (let e of Object.values(this.events)) t.ghostty_selection_gesture_event_free(e);
			this.events = {}, t.ghostty_selection_gesture_free(this.gesture, e ? this.term.handle : 0), this.gesture = 0, t.ghostty_wasm_free(this.scratch, 256);
		}
	}
}, W = { NEEDLE: 1 }, G = {
	STATUS: 1,
	TOTAL_MATCHES: 3,
	SELECTED_INDEX: 4,
	SELECTED_MATCH: 5,
	VIEWPORT_MATCHES: 7
}, Le = class {
	constructor(e, t, n, r) {
		this.exports = e, this.mem = t, this.L = n, this.term = r, this.search = 0, this.scratch = 0, this.needle = "";
		let i = e, a = i.ghostty_wasm_alloc_opaque();
		try {
			if (i.ghostty_search_new(0, a, r.handle) !== d) throw Error("libghostty-vt: failed to create search");
			this.search = i.ghostty_wasm_take_opaque(a);
		} finally {
			i.ghostty_wasm_free_opaque(a);
		}
		this.scratch = i.ghostty_wasm_alloc(64);
	}
	setNeedle(e) {
		let t = this.exports;
		if (this.needle = e, !e) {
			t.ghostty_search_set(this.search, W.NEEDLE, 0);
			return;
		}
		let n = new TextEncoder().encode(e), r = t.ghostty_wasm_alloc(n.length);
		this.mem.bytes().set(n, r);
		let i = this.scratch, a = this.mem.view();
		a.setUint32(i, r, !0), a.setUint32(i + 4, n.length, !0), t.ghostty_search_set(this.search, W.NEEDLE, i), t.ghostty_wasm_free(r, n.length);
	}
	getNeedle() {
		return this.needle;
	}
	run() {
		this.needle && this.exports.ghostty_search_run(this.search);
	}
	next() {
		return this.needle ? (this.term.invalidate(), this.exports.ghostty_search_select_next(this.search) === d) : !1;
	}
	previous() {
		return this.needle ? (this.term.invalidate(), this.exports.ghostty_search_select_prev(this.search) === d) : !1;
	}
	getU32(e) {
		let t = this.scratch;
		return this.exports.ghostty_search_get(this.search, e, t) === d ? this.mem.view().getUint32(t, !0) : null;
	}
	get totalMatches() {
		return this.getU32(G.TOTAL_MATCHES) ?? 0;
	}
	get selectedIndex() {
		return this.getU32(G.SELECTED_INDEX) ?? -1;
	}
	selectedMatch() {
		let e = this.scratch + 32;
		return this.exports.ghostty_search_get(this.search, G.SELECTED_MATCH, e) === d ? this.term.selectionRangeAt(e) : null;
	}
	selectMatchAsSelection() {
		let e = this.scratch + 32;
		return this.exports.ghostty_search_get(this.search, G.SELECTED_MATCH, e) === d && this.term.installSelection(e);
	}
	viewportMatches() {
		let e = this.exports;
		if (!this.needle) return [];
		e.ghostty_search_feed(this.search);
		let t = this.L.selectionBuffer, n = this.L.selection.size, r = this.scratch + 16;
		this.mem.bytes().fill(0, r, r + t.size), e.ghostty_search_get(this.search, G.VIEWPORT_MATCHES, r);
		let i = this.mem.view().getUint32(r + t.len, !0);
		if (i === 0) return [];
		let a = i * n, o = e.ghostty_wasm_alloc(a);
		try {
			let a = this.mem.view();
			if (a.setUint32(r + t.ptr, o, !0), a.setUint32(r + t.cap, i, !0), e.ghostty_search_get(this.search, G.VIEWPORT_MATCHES, r) !== d) return [];
			let s = this.mem.view().getUint32(r + t.len, !0), c = [];
			for (let e = 0; e < Math.min(s, i); e++) {
				let t = this.term.selectionRangeAt(o + e * n);
				t && c.push(t);
			}
			return c;
		} finally {
			e.ghostty_wasm_free(o, a);
		}
	}
	dispose() {
		this.search && this.exports.ghostty_search_free(this.search), this.scratch && this.exports.ghostty_wasm_free(this.scratch, 64), this.search = this.scratch = 0;
	}
}, K = null, q = null, J;
function Re(e = {}) {
	let t = e.wasmPath === void 0 ? void 0 : String(e.wasmPath);
	return q ? (t !== J && console.warn(`ghostterm: init() was already called with ${ze(J)}; ignoring ${ze(t)}.`), q) : (J = t, q = we.load(e.wasmPath).then((e) => {
		K = e;
	}, (e) => {
		throw q = null, e;
	}), q);
}
function ze(e) {
	return e === void 0 ? "the bundled module" : `wasmPath ${e}`;
}
function Be() {
	if (!K) throw Error("ghostterm not initialized. Call init() before creating Terminal instances.\nExample:\n  import { init, Terminal } from \"ghostterm\";\n  await init();\n  const term = new Terminal();\n\nFor tests, pass a Ghostty instance directly:\n  import { Ghostty, Terminal } from \"ghostterm\";\n  const ghostty = await Ghostty.load();\n  const term = new Terminal({ ghostty });");
	return K;
}
// lib/event-emitter.ts
var Y = class {
	constructor() {
		this.listeners = [], this.event = (e) => (this.listeners.push(e), { dispose: () => {
			let t = this.listeners.indexOf(e);
			t >= 0 && this.listeners.splice(t, 1);
		} });
	}
	get hasListeners() {
		return this.listeners.length > 0;
	}
	fire(e) {
		for (let t of [...this.listeners]) t(e);
	}
	dispose() {
		this.listeners = [];
	}
}, Ve = 0, He = 50331648, Ue = class {
	constructor(e) {
		this.bufferChangeEmitter = new Y(), this.terminal = e;
	}
	get active() {
		let e = this.terminal.wasmTerm;
		return e && e.isAlternateScreen() ? this.alternate : this.normal;
	}
	get normal() {
		return this._normalBuffer ||= new We(this.terminal, "normal"), this._normalBuffer;
	}
	get alternate() {
		return this._alternateBuffer ||= new We(this.terminal, "alternate"), this._alternateBuffer;
	}
	get onBufferChange() {
		return this.bufferChangeEmitter.event;
	}
	_fireBufferChange(e) {
		this.bufferChangeEmitter.fire(e);
	}
}, We = class {
	constructor(e, t) {
		this.terminal = e, this.bufferType = t, this.nullCell = new Ke(Ge(), 0);
	}
	get type() {
		return this.bufferType;
	}
	get cursorX() {
		return this.activeTerm()?.getCursor().x ?? 0;
	}
	get cursorY() {
		return this.activeTerm()?.getCursor().y ?? 0;
	}
	get viewportY() {
		let e = this.inactivePrimary();
		if (e) return e.scrollback;
		if (!this.activeTerm()) return 0;
		let t = Math.max(0, Math.floor(this.terminal.viewportY ?? 0));
		return Math.max(0, this.baseY - t);
	}
	get baseY() {
		let e = this.inactivePrimary();
		if (e) return e.scrollback;
		let t = this.activeTerm();
		return !t || this.bufferType === "alternate" ? 0 : t.getScrollbackLength();
	}
	get length() {
		let e = this.inactivePrimary();
		if (e) return e.length;
		let t = this.activeTerm();
		return t ? this.baseY + t.rows : 0;
	}
	getLine(e) {
		let t = this.inactivePrimary();
		if (t) {
			let n = t.line(e);
			return n ? new X(n.cells, n.wrapped, this.terminal.cols) : void 0;
		}
		let n = this.activeTerm();
		if (!n || e < 0 || e >= this.length) return;
		let r = n.getScreenLine(e);
		if (r) return new X(r, n.isScreenRowWrapped(e), n.cols);
	}
	getNullCell() {
		return this.nullCell;
	}
	inactivePrimary() {
		return this.bufferType === "normal" ? this.terminal.wasmTerm?.primaryScreen() ?? null : null;
	}
	activeTerm() {
		let e = this.terminal.wasmTerm;
		if (e) return e.isAlternateScreen() === (this.bufferType === "alternate") ? e : void 0;
	}
};
function Ge() {
	return {
		codepoint: 0,
		fg_r: 204,
		fg_g: 204,
		fg_b: 204,
		bg_r: 0,
		bg_g: 0,
		bg_b: 0,
		flags: 0,
		width: 1,
		hyperlink_id: 0,
		grapheme_len: 0,
		bg_default: !0,
		fg_default: !0
	};
}
var X = class {
	constructor(e, t, n) {
		this.cells = e, this._isWrapped = t, this._length = n;
	}
	get length() {
		return this._length;
	}
	get isWrapped() {
		return this._isWrapped;
	}
	getCell(e) {
		if (!(e < 0 || e >= this._length)) return new Ke(e < this.cells.length ? this.cells[e] : Ge(), e);
	}
	translateToString(e = !1, t = 0, n = this._length) {
		let r = Math.max(0, Math.min(t, this._length)), i = Math.max(r, Math.min(n, this._length)), a = "";
		for (let e = r; e < i; e++) {
			let t = this.getCell(e);
			t && t.getWidth() !== 0 && (a += t.getChars() || " ");
		}
		return e && (a = a.trimEnd()), a;
	}
}, Ke = class {
	constructor(e, t) {
		this.cell = e, this.x = t;
	}
	getChars() {
		if (this.cell.chars) return this.cell.chars;
		let e = this.cell.codepoint;
		return e === 0 ? "" : e < 0 || e > 1114111 || e >= 55296 && e <= 57343 ? "�" : String.fromCodePoint(e);
	}
	getCode() {
		return this.cell.codepoint;
	}
	getWidth() {
		return this.cell.width;
	}
	getFgColorMode() {
		return this.isFgDefault() ? Ve : He;
	}
	getBgColorMode() {
		return this.isBgDefault() ? Ve : He;
	}
	getFgColor() {
		return this.cell.fg_r << 16 | this.cell.fg_g << 8 | this.cell.fg_b;
	}
	getBgColor() {
		return this.cell.bg_r << 16 | this.cell.bg_g << 8 | this.cell.bg_b;
	}
	isFgRGB() {
		return !this.isFgDefault();
	}
	isBgRGB() {
		return !this.isBgDefault();
	}
	isFgPalette() {
		return !1;
	}
	isBgPalette() {
		return !1;
	}
	isFgDefault() {
		return this.cell.fg_default ?? !1;
	}
	isBgDefault() {
		return this.cell.bg_default ?? !1;
	}
	isAttributeDefault() {
		return this.cell.flags === 0 && this.isFgDefault() && this.isBgDefault() && !this.cell.overline && this.cell.underline_color === void 0;
	}
	isBold() {
		return (this.cell.flags & c.BOLD) === 0 ? 0 : 1;
	}
	isItalic() {
		return (this.cell.flags & c.ITALIC) === 0 ? 0 : 1;
	}
	isUnderline() {
		return (this.cell.flags & c.UNDERLINE) === 0 ? 0 : 1;
	}
	isStrikethrough() {
		return (this.cell.flags & c.STRIKETHROUGH) === 0 ? 0 : 1;
	}
	isBlink() {
		return (this.cell.flags & c.BLINK) === 0 ? 0 : 1;
	}
	isInverse() {
		return (this.cell.flags & c.INVERSE) === 0 ? 0 : 1;
	}
	isInvisible() {
		return (this.cell.flags & c.INVISIBLE) === 0 ? 0 : 1;
	}
	isFaint() {
		return (this.cell.flags & c.FAINT) === 0 ? 0 : 1;
	}
	getHyperlinkId() {
		return this.cell.hyperlink_id;
	}
	getCodepoint() {
		return this.cell.codepoint;
	}
	isDim() {
		return (this.cell.flags & c.FAINT) !== 0;
	}
}, qe = class {
	constructor(e, t) {
		this.service = t, this.renderEmitter = new Y(), this.disposeEmitter = new Y(), this.disposed = !1, this.onRender = this.renderEmitter.event, this.onDispose = this.disposeEmitter.event, this.options = e, this.marker = e.marker, this.markerListener = this.marker.onDispose(() => this.dispose());
	}
	get isDisposed() {
		return this.disposed;
	}
	dispose() {
		this.disposed || (this.disposed = !0, this.markerListener.dispose(), this.element?.remove(), this.service.remove(this), this.disposeEmitter.fire(), this.disposeEmitter.dispose(), this.renderEmitter.dispose());
	}
	fireRender(e) {
		this.renderEmitter.fire(e);
	}
}, Je = class {
	constructor(e) {
		this.host = e, this.list = [], this.refreshQueued = !1;
	}
	get decorations() {
		return this.list;
	}
	attach(e, t) {
		this.parent = e, this.canvas = t, this.refreshQueued = !0;
	}
	getContainer() {
		if (this.container || !this.parent) return this.container;
		let e = document.createElement("div");
		return e.className = "xterm-decoration-container", e.style.position = "absolute", e.style.height = "0", e.style.overflow = "visible", this.parent.appendChild(e), this.container = e, e;
	}
	register(e) {
		if (e.marker.isDisposed) return;
		let t = new qe(e, this);
		return this.list.push(t), this.refreshQueued = !0, t;
	}
	remove(e) {
		let t = this.list.indexOf(e);
		t >= 0 && this.list.splice(t, 1);
	}
	invalidate() {
		this.refreshQueued = !0;
	}
	refresh(e) {
		if (!e && !this.refreshQueued) return;
		this.refreshQueued = !1;
		let t = this.host.cellSize();
		if (!this.parent || !t || this.list.length === 0) return;
		let n = this.getContainer(), { cols: r, rows: i } = this.host.gridSize();
		n.style.left = `${this.canvas?.offsetLeft ?? 0}px`, n.style.top = `${this.canvas?.offsetTop ?? 0}px`, n.style.width = `${r * t.width}px`;
		let a = this.host.topLine(), o = this.host.isAlternateScreen();
		for (let e of [...this.list]) {
			let n = e.marker.line - a;
			if (!(n >= 0 && n < i && Ye(e.marker, o) && !e.isDisposed)) {
				e.element && (e.element.style.display = "none", e.fireRender(e.element));
				continue;
			}
			let s = e.element ?? this.createElement(e), { x: c = 0, width: l = 1, height: u = 1, anchor: d = "left" } = e.options;
			s.style.width = `${Math.round(l * t.width)}px`, s.style.height = `${u * t.height}px`, s.style.lineHeight = `${t.height}px`, s.style.top = `${n * t.height}px`, d === "right" ? s.style.right = c ? `${c * t.width}px` : "0" : s.style.left = c ? `${c * t.width}px` : "0", s.style.display = c >= r ? "none" : "block", e.fireRender(s);
		}
	}
	createElement(e) {
		let t = document.createElement("div");
		t.classList.add("xterm-decoration");
		let n = e.options.layer === "top";
		return n && t.classList.add("xterm-decoration-top-layer"), t.style.position = "absolute", t.style.zIndex = n ? "7" : "6", e.element = t, this.container.appendChild(t), t;
	}
	highlights() {
		if (this.list.length === 0) return [];
		let { cols: e, rows: t } = this.host.gridSize(), n = this.host.topLine(), r = this.host.isAlternateScreen(), i = /* @__PURE__ */ new Map();
		for (let a of this.list) {
			let { backgroundColor: o, foregroundColor: s } = a.options;
			if (!o && !s) continue;
			let c = a.marker.line - n;
			if (c < 0 || c >= t || !Ye(a.marker, r)) continue;
			let { x: l = 0, width: u = 1, anchor: d = "left" } = a.options, f = d === "right" ? e - l - u : l, p = i.get(c);
			p || (p = Array.from({ length: e }, () => ({ top: !1 })), i.set(c, p));
			for (let t = Math.max(0, f); t < Math.min(e, f + u); t++) o && (p[t].bg = o, p[t].top = a.options.layer === "top"), s && (p[t].fg = s);
		}
		let a = [];
		for (let [t, n] of i) {
			let r = 0;
			for (let i = 1; i <= e; i++) {
				let e = n[r], o = n[i];
				o && o.bg === e.bg && o.fg === e.fg && o.top === e.top || ((e.bg || e.fg) && a.push({
					row: t,
					start: r,
					end: i - 1,
					color: e.bg ?? "",
					foreground: e.fg,
					active: e.top || void 0
				}), r = i);
			}
		}
		return a;
	}
	dispose() {
		for (let e of [...this.list]) e.dispose();
		this.container?.remove(), this.container = void 0, this.parent = void 0, this.canvas = void 0;
	}
};
function Ye(e, t) {
	return (e.alternate ?? !1) === t;
}
// lib/input-handler.ts
var Xe = {
	ArrowLeft: "left",
	ArrowRight: "right",
	ArrowUp: "up",
	ArrowDown: "down",
	Home: "home",
	End: "end",
	PageUp: "page-up",
	PageDown: "page-down"
}, Ze = 1, Qe = {
	KeyA: i.A,
	KeyB: i.B,
	KeyC: i.C,
	KeyD: i.D,
	KeyE: i.E,
	KeyF: i.F,
	KeyG: i.G,
	KeyH: i.H,
	KeyI: i.I,
	KeyJ: i.J,
	KeyK: i.K,
	KeyL: i.L,
	KeyM: i.M,
	KeyN: i.N,
	KeyO: i.O,
	KeyP: i.P,
	KeyQ: i.Q,
	KeyR: i.R,
	KeyS: i.S,
	KeyT: i.T,
	KeyU: i.U,
	KeyV: i.V,
	KeyW: i.W,
	KeyX: i.X,
	KeyY: i.Y,
	KeyZ: i.Z,
	Digit1: i.ONE,
	Digit2: i.TWO,
	Digit3: i.THREE,
	Digit4: i.FOUR,
	Digit5: i.FIVE,
	Digit6: i.SIX,
	Digit7: i.SEVEN,
	Digit8: i.EIGHT,
	Digit9: i.NINE,
	Digit0: i.ZERO,
	Enter: i.ENTER,
	Escape: i.ESCAPE,
	Backspace: i.BACKSPACE,
	Tab: i.TAB,
	Space: i.SPACE,
	Minus: i.MINUS,
	Equal: i.EQUAL,
	BracketLeft: i.BRACKET_LEFT,
	BracketRight: i.BRACKET_RIGHT,
	Backslash: i.BACKSLASH,
	Semicolon: i.SEMICOLON,
	Quote: i.QUOTE,
	Backquote: i.GRAVE,
	Comma: i.COMMA,
	Period: i.PERIOD,
	Slash: i.SLASH,
	CapsLock: i.CAPS_LOCK,
	F1: i.F1,
	F2: i.F2,
	F3: i.F3,
	F4: i.F4,
	F5: i.F5,
	F6: i.F6,
	F7: i.F7,
	F8: i.F8,
	F9: i.F9,
	F10: i.F10,
	F11: i.F11,
	F12: i.F12,
	PrintScreen: i.PRINT_SCREEN,
	ScrollLock: i.SCROLL_LOCK,
	Pause: i.PAUSE,
	Insert: i.INSERT,
	Home: i.HOME,
	PageUp: i.PAGE_UP,
	Delete: i.DELETE,
	End: i.END,
	PageDown: i.PAGE_DOWN,
	ArrowRight: i.RIGHT,
	ArrowLeft: i.LEFT,
	ArrowDown: i.DOWN,
	ArrowUp: i.UP,
	NumLock: i.NUM_LOCK,
	NumpadDivide: i.KP_DIVIDE,
	NumpadMultiply: i.KP_MULTIPLY,
	NumpadSubtract: i.KP_MINUS,
	NumpadAdd: i.KP_PLUS,
	NumpadEnter: i.KP_ENTER,
	Numpad1: i.KP_1,
	Numpad2: i.KP_2,
	Numpad3: i.KP_3,
	Numpad4: i.KP_4,
	Numpad5: i.KP_5,
	Numpad6: i.KP_6,
	Numpad7: i.KP_7,
	Numpad8: i.KP_8,
	Numpad9: i.KP_9,
	Numpad0: i.KP_0,
	NumpadDecimal: i.KP_PERIOD,
	IntlBackslash: i.INTL_BACKSLASH,
	ContextMenu: i.CONTEXT_MENU,
	F13: i.F13,
	F14: i.F14,
	F15: i.F15,
	F16: i.F16,
	F17: i.F17,
	F18: i.F18,
	F19: i.F19,
	F20: i.F20,
	F21: i.F21,
	F22: i.F22,
	F23: i.F23,
	F24: i.F24
}, $e = class e {
	static {
		this.BEFORE_INPUT_IGNORE_MS = 100;
	}
	constructor(e) {
		this.listeners = [], this.isComposing = !1, this.isDisposed = !1, this.encodedKeys = /* @__PURE__ */ new Set(), this.keySwallowed = !1, this.mouseButtonsPressed = 0, this.trackingDrag = !1, this.mouseEncoder = null, this.lastPasteData = null, this.lastPasteTime = 0, this.lastPasteSource = null, this.lastCompositionData = null, this.lastCompositionTime = 0, this.lastBeforeInputData = null, this.lastBeforeInputTime = 0, this.wheelRemainder = {
			x: 0,
			y: 0
		}, this.ghostty = e.ghostty, this.encoder = e.ghostty.createKeyEncoder(), this.container = e.container, this.inputElement = e.inputElement, this.onDataCallback = e.onData, this.onKeyCallback = e.onKey, this.customKeyEventHandler = e.customKeyEventHandler, this.customWheelEventHandler = e.customWheelEventHandler, this.onCopyCallback = e.onCopy, this.mouseConfig = e.mouseConfig, this.getTerminal = e.getTerminal, this.attach();
	}
	setCustomKeyEventHandler(e) {
		this.customKeyEventHandler = e;
	}
	setCustomWheelEventHandler(e) {
		this.customWheelEventHandler = e;
	}
	listen(e, t, n, r) {
		let i = n.bind(this);
		e.addEventListener(t, i, r), this.listeners.push([
			e,
			t,
			i,
			r
		]);
	}
	unlisten(e, t) {
		this.listeners = this.listeners.filter(([n, r, i, a]) => n !== e || r !== t || (n.removeEventListener(r, i, a), !1));
	}
	attach() {
		typeof this.container.hasAttribute == "function" && typeof this.container.setAttribute == "function" && (this.container.hasAttribute("tabindex") || this.container.setAttribute("tabindex", "0"), this.container.style && (this.container.style.outline = "none"));
		let e = this.container;
		this.listen(e, "keydown", this.handleKeyDown), this.listen(e, "keyup", this.handleKeyUp), this.listen(e, "focusin", (e) => this.handleFocusChange(e, !0)), this.listen(e, "focusout", (e) => this.handleFocusChange(e, !1)), this.listen(e, "paste", this.handlePaste), this.inputElement && this.inputElement !== e && this.listen(this.inputElement, "paste", this.handlePaste), this.inputElement && this.listen(this.inputElement, "beforeinput", this.handleBeforeInput), this.listen(e, "compositionstart", this.handleCompositionStart), this.listen(e, "compositionend", this.handleCompositionEnd), this.listen(e, "mousedown", this.handleMouseDown), this.listen(e, "mouseup", this.handleMouseUp), this.listen(e, "mousemove", this.handleMouseMove), this.listen(e, "wheel", this.handleWheel, { passive: !1 });
	}
	mapKeyCode(e) {
		return Qe[e] ?? null;
	}
	extractModifiers(e) {
		let t = a.NONE;
		return e.shiftKey && (t |= a.SHIFT), e.ctrlKey && (t |= a.CTRL), e.altKey && (t |= a.ALT), e.metaKey && (t |= a.SUPER), t;
	}
	keyText(e) {
		let t = e.key;
		if (!t || t.length > 1 && /^[A-Za-z][A-Za-z0-9]*$/.test(t)) return;
		let n = t.codePointAt(0);
		if (!(n < 32 || n === 127 || n >= 63232 && n <= 63743)) return t;
	}
	unshiftedCodepoint(e, t) {
		let n = e.code;
		if (/^Key[A-Z]$/.test(n)) return n.charCodeAt(3) + 32;
		if (/^Digit[0-9]$/.test(n)) return n.charCodeAt(5);
		if (n === "Space") return 32;
		if (t && !e.shiftKey && [...t].length === 1) return t.codePointAt(0);
	}
	syncEncoder() {
		let e = this.getTerminal();
		e && this.encoder.syncFromTerminal(e), this.encoder.setOption(n.MACOS_OPTION_AS_ALT, Ze);
	}
	encodeKey(e, t) {
		let n = this.mapKeyCode(e.code);
		if (n === null) return null;
		let r = e.metaKey ? void 0 : this.keyText(e), i = this.unshiftedCodepoint(e, this.keyText(e)), o = this.extractModifiers(e), s = a.NONE;
		if (r) {
			let t = r !== (i === void 0 ? void 0 : String.fromCodePoint(i));
			((e.getModifierState?.("AltGraph") ?? !1) || e.ctrlKey && e.altKey && t) && (o &= ~(a.CTRL | a.ALT)), e.shiftKey && t && (s |= a.SHIFT);
		}
		this.syncEncoder();
		let c = this.encoder.encode({
			action: t,
			key: n,
			mods: o,
			consumedMods: s,
			utf8: r,
			unshiftedCodepoint: i
		});
		return new TextDecoder().decode(c);
	}
	encodeNamedKey(e, t = a.NONE) {
		return this.syncEncoder(), new TextDecoder().decode(this.encoder.encode({
			action: r.PRESS,
			key: e,
			mods: t
		}));
	}
	handleKeyDown(e) {
		if (this.isDisposed) return;
		if (this.keySwallowed = !1, this.customKeyEventHandler && this.customKeyEventHandler(e) === !1) {
			this.keySwallowed = !0;
			return;
		}
		if (this.isComposing || e.isComposing || e.keyCode === 229 || e.code === "KeyV" && (e.metaKey || e.ctrlKey && e.shiftKey)) return;
		if (e.code === "KeyC" && (e.metaKey || e.ctrlKey && e.shiftKey)) {
			if (this.onCopyCallback?.()) {
				e.preventDefault();
				return;
			}
			if (e.metaKey) return;
		}
		let t = Xe[e.code];
		if (t && e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
			let n = this.getTerminal();
			if (n?.hasSelection() && n.adjustSelection(t)) {
				e.preventDefault(), this.onSelectionAdjusted?.();
				return;
			}
		}
		if (e.key === "Dead" && !e.ctrlKey && !e.altKey && !e.metaKey) return;
		let n;
		try {
			n = this.encodeKey(e, e.repeat ? r.REPEAT : r.PRESS);
		} catch (t) {
			console.warn("Failed to encode key:", e.code, t);
			return;
		}
		if (n !== null) this.encodedKeys.add(e.code);
		else {
			let t = this.keyText(e);
			if (!t || e.ctrlKey || e.metaKey) return;
			n = t;
		}
		n.length > 0 ? (e.preventDefault(), e.stopPropagation(), this.onKeyCallback?.({
			key: n,
			domEvent: e
		}), this.onDataCallback(n)) : e.metaKey || e.preventDefault();
	}
	sendKey(e, t = a.NONE) {
		let n = this.encodeNamedKey(e, t);
		n && this.onDataCallback(n);
	}
	isReportingMouse(e) {
		return !this.isDisposed && !!this.mouseConfig?.hasMouseTracking() && !e.shiftKey;
	}
	handleKeyUp(e) {
		if (this.isDisposed) return;
		this.keySwallowed = !1;
		let t = this.encodedKeys.delete(e.code);
		if (!(this.customKeyEventHandler && this.customKeyEventHandler(e) === !1) && !(!t || this.isComposing || e.isComposing)) try {
			let t = this.encodeKey(e, r.RELEASE);
			t && this.onDataCallback(t);
		} catch (t) {
			console.warn("Failed to encode key release:", e.code, t);
		}
	}
	handlePaste(e) {
		if (this.isDisposed) return;
		e.preventDefault(), e.stopPropagation();
		let t = e.clipboardData?.getData("text/plain");
		t && (this.shouldIgnorePasteEvent(t, "paste") || (this.emitPasteData(t), this.recordPasteData(t, "paste")));
	}
	handleBeforeInput(e) {
		if (this.isDisposed || this.isComposing || e.isComposing) return;
		let t = e.inputType, n = e.data ?? "", r = null;
		if (this.keySwallowed && t === "insertText") e.preventDefault();
		else {
			switch (t) {
				case "insertText":
				case "insertReplacementText":
					r = n.length > 0 ? n.replace(/\n/g, "\r") : null;
					break;
				case "insertLineBreak":
				case "insertParagraph":
					r = "\r";
					break;
				case "deleteContentBackward":
					r = this.encodeNamedKey(i.BACKSPACE);
					break;
				case "deleteContentForward":
					r = this.encodeNamedKey(i.DELETE);
					break;
				case "insertFromPaste":
					if (!n || (e.preventDefault(), e.stopPropagation(), this.shouldIgnorePasteEvent(n, "beforeinput"))) return;
					this.emitPasteData(n), this.recordPasteData(n, "beforeinput");
					return;
				default: return;
			}
			r && (e.preventDefault(), e.stopPropagation(), n && this.shouldIgnoreBeforeInputFromComposition(n) || (this.onDataCallback(r), n && this.recordBeforeInputData(n)));
		}
	}
	handleCompositionStart(e) {
		this.isDisposed || (this.isComposing = !0);
	}
	handleCompositionEnd(e) {
		if (this.isDisposed) return;
		this.isComposing = !1;
		let t = e.data;
		t && (this.shouldIgnoreCompositionEnd(t) || (this.onDataCallback(t), this.recordCompositionData(t)));
	}
	prepareMouse(e) {
		if (!this.mouseConfig?.hasMouseTracking() || e.shiftKey) return null;
		let t = this.getTerminal();
		if (!t) return null;
		this.mouseEncoder ??= this.ghostty.createMouseEncoder();
		let n = this.mouseEncoder;
		n.syncFromTerminal(t);
		let r = this.mouseConfig.getCellDimensions();
		if (r.width <= 0 || r.height <= 0) return null;
		let i = this.mouseConfig.getScreenSize?.() ?? {
			width: t.cols * r.width,
			height: t.rows * r.height
		};
		return n.setGeometry({
			screenWidth: i.width,
			screenHeight: i.height,
			cellWidth: r.width,
			cellHeight: r.height
		}), n.setAnyButtonPressed(this.mouseButtonsPressed !== 0), {
			encoder: n,
			width: i.width,
			height: i.height
		};
	}
	mouseMods(e) {
		let t = a.NONE;
		return e.shiftKey && (t |= a.SHIFT), e.ctrlKey && (t |= a.CTRL), e.altKey && (t |= a.ALT), e.metaKey && (t |= a.SUPER), t;
	}
	static {
		this.DOM_BUTTONS = {
			0: F.LEFT,
			1: F.MIDDLE,
			2: F.RIGHT,
			3: 8,
			4: 9
		};
	}
	reportMouse(e, t, n) {
		let r = this.prepareMouse(e);
		if (!r) return !1;
		let i = this.mouseConfig.getCanvasOffset(), a = (e, t) => Math.max(0, Math.min(e, Math.max(0, t - 1))), o = a(e.clientX - i.left, r.width), s = a(e.clientY - i.top, r.height), c = r.encoder.encode(t, n, this.mouseMods(e), o, s);
		return c && this.onDataCallback(c), c.length > 0;
	}
	handleMouseDown(t) {
		if (this.isDisposed) return;
		let n = e.DOM_BUTTONS[t.button];
		n !== void 0 && this.mouseConfig?.hasMouseTracking() && !t.shiftKey && (this.mouseButtonsPressed |= 1 << n, this.reportMouse(t, I.PRESS, n), this.startDragTracking());
	}
	startDragTracking() {
		this.trackingDrag || typeof document > "u" || (this.trackingDrag = !0, this.listen(document, "mousemove", this.handleDragMove), this.listen(document, "mouseup", this.handleDragUp));
	}
	stopDragTracking() {
		this.trackingDrag && (this.trackingDrag = !1, this.unlisten(document, "mousemove"), this.unlisten(document, "mouseup"));
	}
	handleMouseUp(e) {
		this.isDisposed || this.trackingDrag || this.releaseButton(e);
	}
	releaseButton(t) {
		let n = e.DOM_BUTTONS[t.button];
		if (n === void 0) return;
		let r = !!(this.mouseButtonsPressed & 1 << n);
		this.mouseButtonsPressed &= ~(1 << n), this.mouseButtonsPressed === 0 && this.stopDragTracking(), r && this.reportMouse(t, I.RELEASE, n);
	}
	handleMouseMove(e) {
		this.isDisposed || this.trackingDrag || this.reportMotion(e);
	}
	handleDragMove(e) {
		this.isDisposed || this.reportMotion(e);
	}
	handleDragUp(e) {
		this.isDisposed || this.releaseButton(e);
	}
	reportMotion(e) {
		let t = null;
		for (let e of [
			F.LEFT,
			F.MIDDLE,
			F.RIGHT
		]) if (this.mouseButtonsPressed & 1 << e) {
			t = e;
			break;
		}
		this.reportMouse(e, I.MOTION, t);
	}
	wheelSteps(e, t, n) {
		if (e.deltaMode === 1) return Math.sign(t) * Math.max(1, Math.round(Math.abs(t) / 3));
		if (e.deltaMode === 2) return Math.sign(t);
		if (Math.abs(t) >= 50) return this.wheelRemainder[n] = 0, Math.sign(t) * Math.max(1, Math.round(Math.abs(t) / 100));
		let r = this.mouseConfig?.getCellDimensions(), i = n === "y" ? r?.height : r?.width;
		if (!i || i <= 0) return Math.sign(t);
		this.wheelRemainder[n] += t / i;
		let a = Math.trunc(this.wheelRemainder[n]);
		return this.wheelRemainder[n] -= a, a;
	}
	handleWheel(e) {
		if (this.isDisposed || !this.isReportingMouse(e) || this.customWheelEventHandler && this.customWheelEventHandler(e) === !1) return;
		let t = Math.abs(e.deltaX) > Math.abs(e.deltaY), n = t ? e.deltaX : e.deltaY;
		if (e.preventDefault(), n === 0) return;
		let r = this.wheelSteps(e, n, t ? "x" : "y"), i = t ? r < 0 ? F.WHEEL_LEFT : F.WHEEL_RIGHT : r < 0 ? F.WHEEL_UP : F.WHEEL_DOWN;
		for (let t = 0; t < Math.min(Math.abs(r), 10); t++) this.reportMouse(e, I.PRESS, i);
	}
	emitPasteData(e) {
		let t = this.getTerminal()?.encodePaste(e);
		t && this.onDataCallback(t);
	}
	handleFocusChange(e, t) {
		if (this.isDisposed) return;
		t && e.target === this.container && this.inputElement && this.inputElement.focus();
		let n = e.relatedTarget;
		if (n && typeof this.container.contains == "function" && this.container.contains(n)) return;
		t || (this.isComposing = !1, this.encodedKeys.clear());
		let r = this.getTerminal()?.encodeFocus(t);
		r && this.onDataCallback(r);
	}
	recordPasteData(e, t) {
		this.lastPasteData = e, this.lastPasteTime = this.getNow(), this.lastPasteSource = t;
	}
	shouldIgnoreBeforeInputFromComposition(t) {
		if (!this.lastCompositionData) return !1;
		let n = this.getNow() - this.lastCompositionTime < e.BEFORE_INPUT_IGNORE_MS && this.lastCompositionData === t;
		return n && (this.lastCompositionData = null), n;
	}
	shouldIgnoreCompositionEnd(t) {
		if (!this.lastBeforeInputData) return !1;
		let n = this.getNow() - this.lastBeforeInputTime < e.BEFORE_INPUT_IGNORE_MS && this.lastBeforeInputData === t;
		return n && (this.lastBeforeInputData = null), n;
	}
	recordBeforeInputData(e) {
		this.lastBeforeInputData = e, this.lastBeforeInputTime = this.getNow();
	}
	recordCompositionData(e) {
		this.lastCompositionData = e, this.lastCompositionTime = this.getNow();
	}
	shouldIgnorePasteEvent(t, n) {
		if (!this.lastPasteData || this.lastPasteSource === n) return !1;
		let r = this.getNow() - this.lastPasteTime < e.BEFORE_INPUT_IGNORE_MS && this.lastPasteData === t;
		return r && (this.lastPasteData = null, this.lastPasteSource = null), r;
	}
	getNow() {
		return typeof performance < "u" && typeof performance.now == "function" ? performance.now() : Date.now();
	}
	dispose() {
		if (!this.isDisposed) {
			for (let [e, t, n, r] of this.listeners) e.removeEventListener(t, n, r);
			this.listeners = [], this.trackingDrag = !1, this.encoder.dispose(), this.mouseEncoder?.dispose(), this.mouseEncoder = null, this.isDisposed = !0;
		}
	}
	isActive() {
		return !this.isDisposed;
	}
}, et = /* @__PURE__ */ new Set([
	"http:",
	"https:",
	"mailto:",
	"ftp:"
]);
function tt(e) {
	try {
		return et.has(new URL(e).protocol);
	} catch {
		return !1;
	}
}
function nt(e, t) {
	(t.ctrlKey || t.metaKey) && tt(e) && window.open(e, "_blank", "noopener,noreferrer");
}
function rt(e, t, n) {
	let { start: r, end: i } = e;
	return !(n < r.y || n > i.y || n === r.y && t < r.x || n === i.y && t > i.x);
}
var it = class {
	constructor(e) {
		this.terminal = e, this.providers = [], this.known = /* @__PURE__ */ new Map();
	}
	registerProvider(e) {
		this.providers.push(e), this.invalidateCache();
	}
	async getLinkAt(e, t) {
		return this.findLinkAt(e, t);
	}
	findLinkAt(e, t) {
		let n = this.terminal.buffer.active.getLine(t);
		if (!n || e < 0 || e >= n.length) return;
		let r = Array(this.providers.length), i = this.providers.length, a;
		this.providers.forEach((e, n) => {
			let o = !1;
			e.provideLinks(t, (e) => {
				o || (o = !0, r[n] = e, i--, i === 0 && a?.());
			});
		});
		let o = () => {
			for (let n of r) {
				let r = n?.find((n) => rt(n.range, e, t));
				if (r) return this.canonical(r);
			}
		};
		return i === 0 ? o() : new Promise((e) => {
			a = () => e(o());
		});
	}
	canonical(e) {
		let { start: t, end: n } = e.range, r = `${t.x},${t.y}-${n.x},${n.y}:${e.text}`;
		return this.known.get(r) || (this.known.size > 256 && this.known.clear(), this.known.set(r, e), e);
	}
	invalidateCache() {
		this.known.clear();
	}
	dispose() {
		this.known.clear();
		for (let e of this.providers) e.dispose?.();
		this.providers = [];
	}
}, at = 1, ot = class {
	constructor(e, t, n) {
		this.tracked = e, this.alternate = t, this.registry = n, this.id = at++, this.disposeEmitter = new Y(), this.disposed = !1, this.cachedLine = -1, this.cachedAt = -1, this.onDispose = this.disposeEmitter.event, e || (this.disposed = !0);
	}
	get isDisposed() {
		return this.disposed;
	}
	get line() {
		if (this.disposed || !this.tracked || !this.registry) return -1;
		if (this.cachedAt === this.registry.generation) return this.cachedLine;
		let e = this.tracked.row;
		return this.cachedLine = e ?? -1, this.cachedAt = this.registry.generation, this.cachedLine;
	}
	dispose() {
		this.disposed || (this.disposed = !0, this.tracked?.free(), this.tracked = null, this.registry?.remove(this), this.registry = null, this.disposeEmitter.fire(), this.disposeEmitter.dispose());
	}
	hasLine() {
		return this.tracked?.alive ?? !1;
	}
}, st = class {
	constructor() {
		this.list = [], this.generation = 0;
	}
	get markers() {
		return this.list;
	}
	create(e, t) {
		let n = e.trackRow(t), r = new ot(n, e.isAlternateScreen(), n ? this : null);
		return n && this.list.push(r), r;
	}
	remove(e) {
		let t = this.list.indexOf(e);
		t >= 0 && this.list.splice(t, 1);
	}
	update() {
		this.generation++;
		for (let e of [...this.list]) e.hasLine() || e.dispose();
	}
	disposeAlternate() {
		for (let e of [...this.list]) e.alternate && e.dispose();
	}
	clear() {
		for (let e of [...this.list]) e.dispose();
		this.generation++;
	}
	dispose() {
		this.clear();
	}
}, ct = Object.freeze({
	applicationCursorKeysMode: !1,
	applicationKeypadMode: !1,
	bracketedPasteMode: !1,
	insertMode: !1,
	mouseTrackingMode: "none",
	originMode: !1,
	reverseWraparoundMode: !1,
	sendFocusMode: !1,
	showCursor: !0,
	synchronizedOutputMode: !1,
	wraparoundMode: !0
});
function lt(e) {
	let t = (t) => e.getMode(t, !1);
	return {
		applicationCursorKeysMode: t(1),
		applicationKeypadMode: t(66),
		bracketedPasteMode: t(2004),
		insertMode: e.getMode(4, !0),
		mouseTrackingMode: ut(e),
		originMode: t(6),
		reverseWraparoundMode: t(45),
		sendFocusMode: t(1004),
		showCursor: t(25),
		synchronizedOutputMode: t(2026),
		wraparoundMode: t(7)
	};
}
function ut(e) {
	return e.hasMouseTracking() ? e.getMode(1003, !1) ? "any" : e.getMode(1002, !1) ? "drag" : e.getMode(1e3, !1) ? "vt200" : e.getMode(9, !1) ? "x10" : "none" : "none";
}
// lib/parser.ts
function dt(e) {
	let t = 0;
	if (typeof e == "string") for (let n = 0; n < e.length; n++) {
		let r = e.charCodeAt(n);
		r >= 10 && r <= 12 && t++;
	}
	else for (let n = 0; n < e.length; n++) e[n] >= 10 && e[n] <= 12 && t++;
	return t;
}
var ft = class {
	constructor() {
		this.osc = /* @__PURE__ */ new Map(), this.warned = /* @__PURE__ */ new Set(), this.decoder = new TextDecoder();
	}
	get hasOscHandlers() {
		return this.osc.size > 0;
	}
	registerOscHandler(e, t) {
		if (!Number.isInteger(e) || e < 0) throw Error(`registerOscHandler: invalid OSC code ${e}`);
		let n = this.osc.get(e) ?? [];
		return n.push(t), this.osc.set(e, n), { dispose: () => {
			let n = this.osc.get(e), r = n?.indexOf(t) ?? -1;
			!n || r < 0 || (n.splice(r, 1), n.length === 0 && this.osc.delete(e));
		} };
	}
	registerCsiHandler(e, t) {
		return this.unsupported("registerCsiHandler", "CSI");
	}
	registerDcsHandler(e, t) {
		return this.unsupported("registerDcsHandler", "DCS");
	}
	registerEscHandler(e, t) {
		return this.unsupported("registerEscHandler", "ESC");
	}
	unsupported(e, t) {
		return this.warned.has(e) || (this.warned.add(e), console.warn(`parser.${e}: libghostty parses ${t} sequences itself and has no hook for them; the handler is never called.`)), { dispose: () => {} };
	}
	handleOsc(e) {
		let t = 0, n = 0;
		for (; n < e.length && e[n] !== 59; n++) {
			let r = e[n] - 48;
			if (r < 0 || r > 9 || n >= 8) return !1;
			t = t * 10 + r;
		}
		if (n === 0) return !1;
		let r = this.osc.get(t);
		if (!r) return !1;
		let i = this.decoder.decode(e.subarray(n + 1));
		for (let e of [...r].reverse()) {
			let n;
			try {
				n = e(i);
			} catch (e) {
				console.error(`OSC ${t} handler failed:`, e);
				continue;
			}
			if (n === !0) return !0;
		}
		return !1;
	}
}, pt = class {
	constructor(e) {
		this.terminal = e;
	}
	provideLinks(e, t) {
		let n = /* @__PURE__ */ new Map(), r = (e) => (n.has(e) || n.set(e, this.terminal.buffer.active.getLine(e)), n.get(e)), i = { getLine: r }, a = r(e), o = this.terminal.wasmTerm;
		if (!a || !o) {
			t(void 0);
			return;
		}
		let s = (e, t) => r(e)?.getCell(t)?.getHyperlinkId() ?? 0, c = [], l = 0;
		for (; l < a.length;) {
			let t = a.getCell(l)?.getHyperlinkId() ?? 0;
			if (t === 0) {
				l++;
				continue;
			}
			let n = l;
			for (; n + 1 < a.length && s(e, n + 1) === t;) n++;
			let r = {
				x: l,
				y: e
			};
			for (; r.x === 0 && i.getLine(r.y)?.isWrapped;) {
				let e = i.getLine(r.y - 1);
				if (!e || s(r.y - 1, e.length - 1) !== t) break;
				let n = e.length - 1;
				for (; n > 0 && s(r.y - 1, n - 1) === t;) n--;
				r = {
					x: n,
					y: r.y - 1
				};
			}
			let u = {
				x: n,
				y: e
			};
			for (; u.x === a.length - 1;) {
				let e = i.getLine(u.y + 1);
				if (!e?.isWrapped || s(u.y + 1, 0) !== t) break;
				let n = 0;
				for (; n + 1 < e.length && s(u.y + 1, n + 1) === t;) n++;
				u = {
					x: n,
					y: u.y + 1
				};
			}
			let d = o.getScreenHyperlinkUri(e, l);
			d && c.push({
				text: d,
				range: {
					start: r,
					end: u
				},
				activate: (e) => nt(d, e)
			}), l = n + 1;
		}
		t(c.length > 0 ? c : void 0);
	}
	dispose() {}
};
// lib/line-text.ts
function mt(e, t = !1) {
	let n = "", r = [], i = [];
	for (let { y: t, line: a } of e) for (let e = 0; e < a.length; e++) {
		let o = a.getCell(e);
		if (o && o.getWidth() === 0) continue;
		let s = o?.getChars() || " ", c = Math.max(1, o?.getWidth() ?? 1);
		for (let n = 0; n < s.length; n++) r.push({
			x: e,
			y: t
		}), i.push({
			x: Math.min(e + c - 1, a.length - 1),
			y: t
		});
		n += s;
	}
	if (t) {
		let e = n.trimEnd();
		r.length = e.length, i.length = e.length, n = e;
	}
	return {
		text: n,
		startCell: r,
		endCell: i
	};
}
// lib/providers/url-regex-provider.ts
var ht = class e {
	static {
		this.URL_REGEX = /(?:https?:\/\/|ftp:\/\/|mailto:)[\w\-.~:/?#@!$&*+,;=%()'[\]]+/gi;
	}
	static {
		this.TRAILING = /[.,;:!?'\]]$/;
	}
	static {
		this.MAX_WRAPPED_ROWS = 32;
	}
	constructor(e) {
		this.terminal = e;
	}
	provideLinks(t, n) {
		let r = this.terminal.buffer.active, i = r.getLine(t);
		if (!i) {
			n(void 0);
			return;
		}
		let a = [{
			y: t,
			line: i
		}], o = i;
		for (let t = 0; t < e.MAX_WRAPPED_ROWS && o.isWrapped; t++) {
			let e = r.getLine(a[0].y - 1);
			if (!e) break;
			a.unshift({
				y: a[0].y - 1,
				line: e
			}), o = e;
		}
		for (let t = 0; t < e.MAX_WRAPPED_ROWS; t++) {
			let e = r.getLine(a[a.length - 1].y + 1);
			if (!e?.isWrapped) break;
			a.push({
				y: a[a.length - 1].y + 1,
				line: e
			});
		}
		let { text: s, startCell: c, endCell: l } = mt(a), u = [], d = new RegExp(e.URL_REGEX);
		for (let n = d.exec(s); n !== null; n = d.exec(s)) {
			let r = e.trim(n[0]);
			if (!/^[a-z]+:(\/\/)?[^/]/i.test(r)) continue;
			let i = c[n.index], a = l[n.index + r.length - 1];
			a.y < t || i.y > t || u.push({
				text: r,
				range: {
					start: i,
					end: a
				},
				activate: (e) => nt(r, e)
			});
		}
		n(u.length > 0 ? u : void 0);
	}
	static trim(t) {
		for (;;) if (e.TRAILING.test(t)) t = t.slice(0, -1);
		else if (t.endsWith(")")) {
			let e = t.split("(").length - 1;
			if (t.split(")").length - 1 <= e) return t;
			t = t.slice(0, -1);
		} else return t;
	}
	dispose() {}
}, gt = 8, _t = 3, vt = 4, yt = 20, Z = {
	foreground: "#d4d4d4",
	background: "#1e1e1e",
	cursor: "#ffffff",
	cursorAccent: "#1e1e1e",
	selectionBackground: "#d4d4d4",
	selectionForeground: "#1e1e1e",
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
};
function Q(e) {
	if (!e) return;
	let t = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.exec(e.trim())?.[1];
	if (t) {
		let e = t.length <= 4 ? [...t.slice(0, 3)].map((e) => e + e).join("") : t;
		return Number.parseInt(e.slice(0, 6), 16);
	}
	let n = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(e);
	if (n) return n[1] << 16 | n[2] << 8 | n[3];
}
var bt = class {
	constructor(e, t = {}) {
		this.cursorVisible = !0, this.cursorShape = "block", this.cursorColor = "", this.blinkActive = !1, this.drawnCursor = null, this.focused = !0, this.lastViewportY = 0, this.scrollbarGutter = 15, this.gridCols = 0, this.gridRows = 0, this.cssWidth = 0, this.cssHeight = 0, this.backingWidth = 0, this.backingHeight = 0, this.needsFullRender = !1, this.currentBuffer = null, this.hoveredHyperlinkId = 0, this.previousHoveredHyperlinkId = 0, this.hoveredLinkRange = null, this.previousHoveredLinkRange = null, this.highlightRows = /* @__PURE__ */ new Map(), this.highlightKey = "", this.canvas = e, this.allowTransparency = t.allowTransparency ?? !1;
		let n = e.getContext("2d");
		if (!n) throw Error("Failed to get 2D rendering context");
		this.ctx = n, this.fontSize = t.fontSize ?? 15, this.fontFamily = t.fontFamily ?? "monospace", this.cursorStyle = t.cursorStyle ?? "block", this.cursorBlink = t.cursorBlink ?? !1, this.theme = {
			...Z,
			...t.theme
		}, this.background = this.themeBackground(), this.devicePixelRatio = t.devicePixelRatio ?? window.devicePixelRatio ?? 1, this.metrics = this.measureFont(), this.applyCursorBlink(this.cursorBlink);
	}
	measureFont() {
		let e = document.createElement("canvas").getContext("2d");
		e.font = `${this.fontSize}px ${this.fontFamily}`;
		let t = e.measureText("M"), n = Math.ceil(t.width), r = t.actualBoundingBoxAscent || this.fontSize * .8, i = t.actualBoundingBoxDescent || this.fontSize * .2;
		return {
			width: n,
			height: Math.ceil(r + i) + 2,
			baseline: Math.ceil(r) + 1
		};
	}
	remeasureFont() {
		let e = this.metrics;
		return this.metrics = this.measureFont(), this.needsFullRender = !0, e.width !== this.metrics.width || e.height !== this.metrics.height || e.baseline !== this.metrics.baseline;
	}
	rgbToCSS(e, t, n) {
		return `rgb(${e}, ${t}, ${n})`;
	}
	themeBackground() {
		if (this.allowTransparency) return this.theme.background;
		let e = Q(this.theme.background) ?? 0;
		return this.rgbToCSS(e >> 16 & 255, e >> 8 & 255, e & 255);
	}
	resolveBackground(e) {
		return !e || (e.r << 16 | e.g << 8 | e.b) === (Q(this.theme.background) ?? 0) ? this.themeBackground() : this.rgbToCSS(e.r, e.g, e.b);
	}
	resize(e, t) {
		this.gridCols = e, this.gridRows = t, this.needsFullRender = !0, this.drawnCursor = null;
		let n = e * this.metrics.width + this.scrollbarGutter, r = t * this.metrics.height;
		this.cssWidth = n, this.cssHeight = r, this.canvas.style.width = `${n}px`, this.canvas.style.height = `${r}px`, this.backingWidth = Math.round(n * this.devicePixelRatio), this.backingHeight = Math.round(r * this.devicePixelRatio), this.canvas.width = this.backingWidth, this.canvas.height = this.backingHeight, this.ctx.setTransform(this.devicePixelRatio, 0, 0, this.devicePixelRatio, 0, 0), this.ctx.textBaseline = "alphabetic", this.ctx.textAlign = "left", this.ctx.fillStyle = this.background, this.ctx.fillRect(0, 0, n, r);
	}
	setDevicePixelRatio(e) {
		e > 0 && e !== this.devicePixelRatio && (this.devicePixelRatio = e, this.gridCols > 0 && this.gridRows > 0 && this.resize(this.gridCols, this.gridRows));
	}
	render(e, t = !1, n = 0, r = 1) {
		this.currentBuffer = e;
		let i = Math.max(0, Math.floor(n));
		e.setViewportOffset(i);
		let a = e.getCursor(), o = e.getDimensions();
		this.cursorShape = a.style ?? this.cursorStyle, this.applyCursorBlink(a.blinking ?? this.cursorBlink);
		let s = e.getColors?.();
		this.cursorColor = s?.cursor ? this.rgbToCSS(s.cursor.r, s.cursor.g, s.cursor.b) : this.theme.cursor;
		let c = this.resolveBackground(s?.background);
		c !== this.background && (this.background = c, t = !0);
		let l = e.getScrollbackLength?.() ?? 0;
		e.needsFullRedraw?.() && (t = !0), (o.cols !== this.gridCols || o.rows !== this.gridRows || this.canvas.width !== this.backingWidth || this.canvas.height !== this.backingHeight) && this.resize(o.cols, o.rows), this.needsFullRender &&= (t = !0, !1), this.refreshHighlights() && (t = !0), n !== this.lastViewportY && (t = !0, this.lastViewportY = n);
		let u = null, d = a.viewportX ?? a.x, f = a.viewportY ?? a.y, p = this.cursorVisible || !this.focused;
		i === 0 && a.visible && p && f >= 0 && f < o.rows && (u = {
			x: d,
			y: f,
			width: e.getViewportLine(f)?.[d]?.width === 2 ? 2 : 1,
			shape: this.focused ? this.cursorShape : "outline",
			color: this.cursorColor
		});
		let m = /* @__PURE__ */ new Set();
		xt(u, this.drawnCursor) || (this.drawnCursor && m.add(this.drawnCursor.y), u && m.add(u.y));
		let h = /* @__PURE__ */ new Set(), g = this.hoveredHyperlinkId !== this.previousHoveredHyperlinkId, _ = JSON.stringify(this.hoveredLinkRange) !== JSON.stringify(this.previousHoveredLinkRange);
		if (g) {
			for (let t = 0; t < o.rows; t++) {
				let n = e.getViewportLine(t);
				if (n) {
					for (let e of n) if (e.hyperlink_id === this.hoveredHyperlinkId || e.hyperlink_id === this.previousHoveredHyperlinkId) {
						h.add(t);
						break;
					}
				}
			}
			this.previousHoveredHyperlinkId = this.hoveredHyperlinkId;
		}
		if (_) {
			if (this.previousHoveredLinkRange) for (let e = this.previousHoveredLinkRange.startY; e <= this.previousHoveredLinkRange.endY; e++) h.add(e);
			if (this.hoveredLinkRange) for (let e = this.hoveredLinkRange.startY; e <= this.hoveredLinkRange.endY; e++) h.add(e);
			this.previousHoveredLinkRange = this.hoveredLinkRange;
		}
		let v = /* @__PURE__ */ new Set();
		for (let n = 0; n < o.rows; n++) (t || e.isRowDirty(n) || h.has(n)) && (v.add(n), n > 0 && v.add(n - 1), n < o.rows - 1 && v.add(n + 1));
		for (let e of m) e < o.rows && v.add(e);
		let y = -1, b = -1;
		for (let t = 0; t < o.rows; t++) {
			if (!v.has(t)) continue;
			y < 0 && (y = t), b = t;
			let n = e.getViewportLine(t);
			n && this.renderLine(n, t, o.cols);
		}
		return u && this.renderCursor(u), this.drawnCursor = u, this.renderScrollbar(n, l, o.rows, r), e.clearDirty(), y < 0 ? null : {
			start: y,
			end: b
		};
	}
	renderLine(e, t, n) {
		let r = t * this.metrics.height, i = n * this.metrics.width;
		this.ctx.clearRect(0, r, i, this.metrics.height), this.ctx.fillStyle = this.background, this.ctx.fillRect(0, r, i, this.metrics.height);
		for (let n = 0; n < e.length; n++) {
			let r = e[n];
			r.width !== 0 && this.renderCellBackground(r, n, t);
		}
		for (let n = 0; n < e.length; n++) {
			let r = e[n];
			r.width !== 0 && this.renderCellText(r, n, t);
		}
	}
	renderCellBackground(e, t, n) {
		let r = t * this.metrics.width, i = n * this.metrics.height, a = this.metrics.width * e.width, o = this.highlightAt(t, n);
		if (o?.active && o.color) {
			this.ctx.fillStyle = o.color, this.ctx.fillRect(r, i, a, this.metrics.height);
			return;
		}
		if (e.selected === !0) {
			this.ctx.fillStyle = this.theme.selectionBackground, this.ctx.fillRect(r, i, a, this.metrics.height);
			return;
		}
		if (o?.color) {
			this.ctx.fillStyle = o.color, this.ctx.fillRect(r, i, a, this.metrics.height);
			return;
		}
		let s = e.bg_r, l = e.bg_g, u = e.bg_b;
		e.flags & c.INVERSE && (s = e.fg_r, l = e.fg_g, u = e.fg_b), !(e.flags & c.INVERSE) && (e.bg_default ?? (s === 0 && l === 0 && u === 0)) || (this.ctx.fillStyle = this.rgbToCSS(s, l, u), this.ctx.fillRect(r, i, a, this.metrics.height));
	}
	renderCellText(e, t, n, r) {
		let i = t * this.metrics.width, a = n * this.metrics.height, o = this.metrics.width * e.width;
		if (e.flags & c.INVISIBLE) return;
		let s = this.highlightAt(t, n), l = e.selected === !0 && !s?.active, u = "";
		if (e.flags & c.ITALIC && (u += "italic "), e.flags & c.BOLD && (u += "bold "), this.ctx.font = `${u}${this.fontSize}px ${this.fontFamily}`, r) this.ctx.fillStyle = r;
		else if (l) this.ctx.fillStyle = this.theme.selectionForeground;
		else if (s?.foreground) this.ctx.fillStyle = s.foreground;
		else {
			let t = e.fg_r, n = e.fg_g, r = e.fg_b;
			e.flags & c.INVERSE && (t = e.bg_r, n = e.bg_g, r = e.bg_b), this.ctx.fillStyle = this.rgbToCSS(t, n, r);
		}
		e.flags & c.FAINT && (this.ctx.globalAlpha = .5);
		let d = i, f = a + this.metrics.baseline, p = e.chars || String.fromCodePoint(e.codepoint || 32);
		this.ctx.fillText(p, d, f), e.flags & c.FAINT && (this.ctx.globalAlpha = 1), e.flags & c.UNDERLINE && this.drawUnderline(e, i, a, o);
		let m = this.lineThickness(), h = String(this.ctx.fillStyle);
		if (e.overline && this.strokeLine(i, o, this.lineY(a, m), m, h), e.flags & c.STRIKETHROUGH) {
			let e = a + this.metrics.height / 2 - m / this.devicePixelRatio / 2;
			this.strokeLine(i, o, this.lineY(e, m), m, h);
		}
		let g = this.hoveredLinkRange;
		if (e.hyperlink_id > 0 && e.hyperlink_id === this.hoveredHyperlinkId || g !== null && (n === g.startY && t >= g.startX && (n < g.endY || t <= g.endX) || n > g.startY && n < g.endY || n === g.endY && t <= g.endX && (n > g.startY || t >= g.startX))) {
			let e = this.lineY(this.underlineTop(a, m), m);
			this.strokeLine(i, o, e, m, "#4A90E2");
		}
	}
	lineThickness() {
		return Math.max(1, Math.round(this.fontSize * this.devicePixelRatio / 16));
	}
	lineY(e, t) {
		let n = this.devicePixelRatio;
		return (Math.round(e * n) + t / 2) / n;
	}
	underlineTop(e, t) {
		let n = t / this.devicePixelRatio;
		return Math.min(e + this.metrics.baseline + 2, e + this.metrics.height - n);
	}
	strokeLine(e, t, n, r, i) {
		this.ctx.strokeStyle = i, this.ctx.lineWidth = r / this.devicePixelRatio, this.ctx.beginPath(), this.ctx.moveTo(e, n), this.ctx.lineTo(e + t, n), this.ctx.stroke();
	}
	setHighlightProvider(e) {
		this.highlightProvider = e, this.needsFullRender = !0;
	}
	refreshHighlights() {
		let e = this.highlightProvider?.() ?? [], t = JSON.stringify(e);
		if (t === this.highlightKey) return !1;
		this.highlightKey = t, this.highlightRows.clear();
		for (let t of e) {
			let e = this.highlightRows.get(t.row) ?? [];
			e.push(t), this.highlightRows.set(t.row, e);
		}
		return !0;
	}
	highlightAt(e, t) {
		let n = this.highlightRows.get(t);
		if (!n) return null;
		for (let t of n) if (e >= t.start && e <= t.end) return t;
		return null;
	}
	drawUnderline(e, t, n, r) {
		let i = this.ctx, a = this.devicePixelRatio, o = this.lineThickness(), c = o / a, l = this.underlineTop(n, o), u = this.lineY(l, o), d = n + this.metrics.height, f = e.underline_style ?? s.SINGLE;
		switch (i.save(), i.strokeStyle = e.underline_color === void 0 ? i.fillStyle : `#${e.underline_color.toString(16).padStart(6, "0")}`, i.lineWidth = c, i.beginPath(), f) {
			case s.DOUBLE: {
				let e = Math.min(l + c, d - c), n = this.lineY(e - 2 * c, o), a = this.lineY(e, o);
				i.moveTo(t, n), i.lineTo(t + r, n), i.moveTo(t, a), i.lineTo(t + r, a);
				break;
			}
			case s.CURLY: {
				let e = 2 * c, n = Math.min(u, d - e - c / 2);
				i.moveTo(t, n), i.quadraticCurveTo(t + r / 4, n - 2 * e, t + r / 2, n), i.quadraticCurveTo(t + 3 * r / 4, n + 2 * e, t + r, n);
				break;
			}
			case s.DOTTED:
			case s.DASHED:
				i.setLineDash(f === s.DOTTED ? [c, 2 * c] : [3 * c, 2 * c]), i.lineDashOffset = t, i.moveTo(t, u), i.lineTo(t + r, u);
				break;
			default: i.moveTo(t, u), i.lineTo(t + r, u);
		}
		i.stroke(), i.restore();
	}
	renderCursor(e) {
		let t = e.x * this.metrics.width, n = e.y * this.metrics.height, r = this.metrics.width * e.width;
		switch (this.ctx.fillStyle = e.color, e.shape) {
			case "block": {
				this.ctx.fillRect(t, n, r, this.metrics.height);
				let i = this.currentBuffer?.getViewportLine(e.y);
				i?.[e.x] && (this.ctx.save(), this.ctx.beginPath(), this.ctx.rect(t, n, r, this.metrics.height), this.ctx.clip(), this.renderCellText(i[e.x], e.x, e.y, this.theme.cursorAccent), this.ctx.restore());
				break;
			}
			case "underline": {
				let e = Math.max(2, Math.floor(this.metrics.height * .15));
				this.ctx.fillRect(t, n + this.metrics.height - e, r, e);
				break;
			}
			case "bar": {
				let e = Math.max(2, Math.floor(this.metrics.width * .15));
				this.ctx.fillRect(t, n, e, this.metrics.height);
				break;
			}
			case "outline": {
				let e = Math.max(1, Math.round(this.devicePixelRatio)) / this.devicePixelRatio, i = this.metrics.height;
				this.ctx.fillRect(t, n, r, e), this.ctx.fillRect(t, n + i - e, r, e), this.ctx.fillRect(t, n + e, e, i - 2 * e), this.ctx.fillRect(t + r - e, n + e, e, i - 2 * e);
				break;
			}
		}
	}
	startCursorBlink() {
		this.cursorBlinkInterval = window.setInterval(() => {
			this.cursorVisible = !this.cursorVisible;
		}, 530);
	}
	stopCursorBlink() {
		this.cursorBlinkInterval !== void 0 && (clearInterval(this.cursorBlinkInterval), this.cursorBlinkInterval = void 0), this.cursorVisible = !0;
	}
	setTheme(e) {
		this.theme = {
			...Z,
			...e
		}, this.background = this.themeBackground(), this.needsFullRender = !0;
	}
	setFontSize(e) {
		this.fontSize = e, this.metrics = this.measureFont();
	}
	setFontFamily(e) {
		this.fontFamily = e, this.metrics = this.measureFont();
	}
	setFocused(e) {
		this.focused = e;
	}
	setCursorStyle(e) {
		this.cursorStyle = e;
	}
	setCursorBlink(e) {
		this.cursorBlink = e, this.applyCursorBlink(e);
	}
	applyCursorBlink(e) {
		e !== this.blinkActive && (this.blinkActive = e, e ? this.startCursorBlink() : (this.stopCursorBlink(), this.cursorVisible = !0));
	}
	renderScrollbar(e, t, n, r = 1) {
		let i = this.ctx, a = this.cssWidth - this.scrollbarGutter;
		if (i.clearRect(a, 0, this.scrollbarGutter, this.cssHeight), i.fillStyle = this.background, i.fillRect(a, 0, this.scrollbarGutter, this.cssHeight), r <= 0 || t === 0) return;
		let o = this.getScrollbarThumb(e, t, n);
		i.fillStyle = `rgba(128, 128, 128, ${.1 * r})`, i.fillRect(o.x, o.trackY, o.width, o.trackHeight), i.fillStyle = `rgba(128, 128, 128, ${(e > 0 ? .5 : .3) * r})`, i.fillRect(o.x, o.y, o.width, o.height);
	}
	getScrollbarRect() {
		return {
			x: this.cssWidth - _t - gt,
			width: gt
		};
	}
	getScrollbarThumb(e, t, n) {
		let { x: r, width: i } = this.getScrollbarRect(), a = vt, o = Math.max(0, this.cssHeight - 8);
		if (t <= 0) return {
			x: r,
			width: i,
			trackY: a,
			trackHeight: o,
			y: a,
			height: o
		};
		let s = t + n, c = Math.min(o, Math.max(yt, n / s * o)), l = Math.max(0, Math.min(1, e / t));
		return {
			x: r,
			width: i,
			trackY: a,
			trackHeight: o,
			y: a + (o - c) * (1 - l),
			height: c
		};
	}
	setScrollbarGutter(e) {
		let t = Math.max(15, Math.floor(e));
		t !== this.scrollbarGutter && (this.scrollbarGutter = t, this.gridCols > 0 && this.gridRows > 0 && this.resize(this.gridCols, this.gridRows));
	}
	getMetrics() {
		return { ...this.metrics };
	}
	getCanvas() {
		return this.canvas;
	}
	setHoveredHyperlinkId(e) {
		this.hoveredHyperlinkId = e;
	}
	getHoveredHyperlinkId() {
		return this.hoveredHyperlinkId;
	}
	setHoveredLinkRange(e) {
		this.hoveredLinkRange = e;
	}
	get charWidth() {
		return this.metrics.width;
	}
	get charHeight() {
		return this.metrics.height;
	}
	clear() {
		this.ctx.clearRect(0, 0, this.cssWidth, this.cssHeight), this.ctx.fillStyle = this.background, this.ctx.fillRect(0, 0, this.cssWidth, this.cssHeight), this.drawnCursor = null, this.needsFullRender = !0;
	}
	dispose() {
		this.stopCursorBlink();
	}
};
function xt(e, t) {
	return e === null || t === null ? e === t : e.x === t.x && e.y === t.y && e.width === t.width && e.shape === t.shape && e.color === t.color;
}
// lib/selection-manager.ts
var St = class e {
	static {
		this.AUTO_SCROLL_INTERVAL = 30;
	}
	constructor(e, t, n, r) {
		this.gesture = null, this.isSelecting = !1, this.mouseDownTarget = null, this.lastPointer = {
			x: 0,
			y: 0
		}, this.rectangle = !1, this.textareaStyle = null, this.selectionChangedEmitter = new Y(), this.boundMouseUpHandler = null, this.boundContextMenuHandler = null, this.boundClickHandler = null, this.boundDocumentMouseMoveHandler = null, this.boundDocumentMouseDownHandler = null, this.autoScrollInterval = null, this.restoreTextarea = () => {
			document.removeEventListener("mousedown", this.restoreTextarea, !0), document.removeEventListener("keydown", this.restoreTextarea, !0), this.textarea.removeEventListener("blur", this.restoreTextarea), this.textareaStyle !== null && (this.textarea.style.cssText = this.textareaStyle, this.textareaStyle = null, this.textarea.value = "");
		}, this.terminal = e, this.renderer = t, this.initialWasmTerm = n, this.textarea = r, this.attachEventListeners();
	}
	get wasmTerm() {
		return this.terminal.wasmTerm ?? this.initialWasmTerm;
	}
	getGesture() {
		let e = this.wasmTerm;
		return this.gesture && this.gesture.terminal !== e && (this.gesture.dispose(!1), this.gesture = null), this.gesture ||= e.createSelectionGesture(), this.gesture;
	}
	getViewportY() {
		return Math.max(0, Math.floor(this.terminal.getViewportY()));
	}
	bufferLength() {
		return this.wasmTerm.getScrollbackLength() + this.wasmTerm.getDimensions().rows;
	}
	getSelection() {
		return this.wasmTerm.getSelectionText();
	}
	hasSelection() {
		return this.wasmTerm.hasSelection();
	}
	copySelection() {
		if (!this.hasSelection()) return !1;
		let e = this.getSelection();
		return e ? (this.copyToClipboard(e), !0) : !1;
	}
	clearSelection() {
		this.hasSelection() && (this.wasmTerm.clearSelection(), this.isSelecting = !1, this.stopAutoScroll(), this.gesture?.reset(), this.selectionChangedEmitter.fire());
	}
	selectAll() {
		this.wasmTerm.selectAll(), this.selectionChangedEmitter.fire();
	}
	select(e, t, n) {
		let r = this.wasmTerm.getDimensions().cols, i = this.bufferLength() * r - 1, a = Math.max(0, Math.min(t * r + Math.max(0, Math.min(e, r - 1)), i)), o = Math.min(a + Math.max(1, n) - 1, i);
		this.setSelectionAbsolute(a % r, Math.floor(a / r), o % r, Math.floor(o / r)), this.selectionChangedEmitter.fire();
	}
	selectLines(e, t) {
		let n = this.wasmTerm.getDimensions().cols, r = this.bufferLength() - 1;
		e = Math.max(0, Math.min(e, r)), t = Math.max(0, Math.min(t, r)), e > t && ([e, t] = [t, e]), this.setSelectionAbsolute(0, e, n - 1, t), this.selectionChangedEmitter.fire();
	}
	setSelectionAbsolute(e, t, n, r) {
		this.wasmTerm.setSelectionRange(e, t, n, r);
	}
	getSelectionPosition() {
		let e = this.wasmTerm.getSelectionRange();
		if (e) return {
			start: {
				x: e.startCol,
				y: e.startRow
			},
			end: {
				x: e.endCol + 1,
				y: e.endRow
			}
		};
	}
	get onSelectionChange() {
		return this.selectionChangedEmitter.event;
	}
	dispose() {
		this.selectionChangedEmitter.dispose(), this.stopAutoScroll(), this.restoreTextarea(), this.gesture &&= (this.gesture.dispose(this.terminal.wasmTerm === this.gesture.terminal), null), this.boundMouseUpHandler &&= (document.removeEventListener("mouseup", this.boundMouseUpHandler), null), this.boundDocumentMouseMoveHandler &&= (document.removeEventListener("mousemove", this.boundDocumentMouseMoveHandler), null), this.boundDocumentMouseDownHandler &&= (document.removeEventListener("mousedown", this.boundDocumentMouseDownHandler), null), this.boundContextMenuHandler &&= (this.renderer.getCanvas().removeEventListener("contextmenu", this.boundContextMenuHandler), null), this.boundClickHandler &&= (document.removeEventListener("click", this.boundClickHandler), null);
	}
	geometry() {
		let e = this.renderer.getMetrics();
		return {
			columns: this.terminal.cols,
			cellWidth: e.width,
			screenHeight: this.terminal.rows * e.height
		};
	}
	syncViewport() {
		this.wasmTerm.setViewportOffset(this.getViewportY());
	}
	dragTo(e, t, n) {
		this.lastPointer = {
			x: e,
			y: t
		}, this.rectangle = n, this.syncViewport();
		let r = this.pixelToCell(e, t);
		this.getGesture().drag(r.col, r.row, e, t, this.geometry(), this.rectangle), this.getGesture().autoscroll() === D.NONE ? this.stopAutoScroll() : this.startAutoScroll();
	}
	attachEventListeners() {
		let t = this.renderer.getCanvas();
		t.addEventListener("mousedown", (t) => {
			if (t.button === 2 || t.button === 0 && t.ctrlKey && e.isMac()) {
				this.prepareContextMenu(t.clientX, t.clientY);
				return;
			}
			if (t.button !== 0 || this.wasmTerm.hasMouseTracking() && !t.shiftKey) return;
			this.textarea.focus(), this.syncViewport();
			let n = this.pixelToCell(t.offsetX, t.offsetY), r = t.timeStamp > 0 ? t.timeStamp : performance.now(), i = this.hasSelection();
			this.getGesture().press(n.col, n.row, t.offsetX, t.offsetY, r), this.isSelecting = !0, (i || this.hasSelection()) && this.selectionChangedEmitter.fire(), this.lastPointer = {
				x: t.offsetX,
				y: t.offsetY
			};
		}), t.addEventListener("mousemove", (e) => {
			this.isSelecting && this.dragTo(e.offsetX, e.offsetY, e.altKey);
		}), this.boundDocumentMouseMoveHandler = (e) => {
			if (!this.isSelecting) return;
			let n = t.getBoundingClientRect();
			(e.clientX < n.left || e.clientX > n.right || e.clientY < n.top || e.clientY > n.bottom) && this.dragTo(e.clientX - n.left, e.clientY - n.top, e.altKey);
		}, document.addEventListener("mousemove", this.boundDocumentMouseMoveHandler), this.boundDocumentMouseDownHandler = (e) => {
			this.mouseDownTarget = e.target;
		}, document.addEventListener("mousedown", this.boundDocumentMouseDownHandler), this.boundMouseUpHandler = () => {
			if (this.isSelecting && (this.isSelecting = !1, this.stopAutoScroll(), this.getGesture().release(), this.hasSelection())) {
				let e = this.getSelection();
				e && (this.copyToClipboard(e), this.selectionChangedEmitter.fire());
			}
		}, document.addEventListener("mouseup", this.boundMouseUpHandler), this.boundContextMenuHandler = (e) => {
			this.textareaStyle === null && this.prepareContextMenu(e.clientX, e.clientY);
		}, t.addEventListener("contextmenu", this.boundContextMenuHandler), this.boundClickHandler = (e) => {
			if (this.isSelecting || this.mouseDownTarget && t.contains(this.mouseDownTarget)) return;
			let n = e.target;
			t.contains(n) || this.hasSelection() && this.clearSelection();
		}, document.addEventListener("click", this.boundClickHandler);
	}
	static isMac() {
		return typeof navigator < "u" && /Mac|iPhone|iPad/.test(navigator.platform);
	}
	prepareContextMenu(e, t) {
		let n = this.textarea;
		this.textareaStyle === null && (this.textareaStyle = n.style.cssText), Object.assign(n.style, {
			position: "fixed",
			left: `${e - 2}px`,
			top: `${t - 2}px`,
			width: "4px",
			height: "4px",
			zIndex: "1000",
			opacity: "0",
			clipPath: "none",
			pointerEvents: "auto"
		}), n.value = this.hasSelection() ? this.getSelection() : "", n.focus(), n.value && n.setSelectionRange(0, n.value.length), setTimeout(() => {
			document.addEventListener("mousedown", this.restoreTextarea, !0), document.addEventListener("keydown", this.restoreTextarea, !0), n.addEventListener("blur", this.restoreTextarea);
		}, 0);
	}
	startAutoScroll() {
		this.autoScrollInterval === null && (this.autoScrollInterval = setInterval(() => {
			if (!this.isSelecting) {
				this.stopAutoScroll();
				return;
			}
			this.syncViewport();
			let { x: e, y: t } = this.lastPointer, n = this.pixelToCell(e, t), r = this.getGesture().autoscrollTick(n.col, n.row, e, t, this.geometry(), this.rectangle);
			this.terminal.scrollToViewportOffset(this.wasmTerm.getViewportOffset()), r && this.getGesture().autoscroll() !== D.NONE || this.stopAutoScroll();
		}, e.AUTO_SCROLL_INTERVAL));
	}
	stopAutoScroll() {
		this.autoScrollInterval !== null && (clearInterval(this.autoScrollInterval), this.autoScrollInterval = null);
	}
	pixelToCell(e, t) {
		let n = this.renderer.getMetrics(), r = Math.floor(e / n.width), i = Math.floor(t / n.height);
		return {
			col: Math.max(0, Math.min(r, this.terminal.cols - 1)),
			row: Math.max(0, Math.min(i, this.terminal.rows - 1))
		};
	}
	copyToClipboard(e) {
		if (navigator.clipboard && typeof ClipboardItem < "u") try {
			let t = new Blob([e], { type: "text/plain" }), n = new ClipboardItem({ "text/plain": t });
			navigator.clipboard.write([n]).catch((t) => {
				console.warn("ClipboardItem write failed, trying writeText:", t), this.copyWithWriteText(e);
			});
			return;
		} catch {}
		navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(e).catch((t) => {
			console.warn("Clipboard writeText failed, trying execCommand:", t), this.copyWithExecCommand(e);
		}) : this.copyWithExecCommand(e);
	}
	copyWithWriteText(e) {
		navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(e).catch((t) => {
			console.warn("Clipboard writeText failed, trying execCommand:", t), this.copyWithExecCommand(e);
		}) : this.copyWithExecCommand(e);
	}
	copyWithExecCommand(e) {
		let t = document.activeElement, n = this.textarea, r = n.style.cssText;
		try {
			n.value = e, n.style.position = "fixed", n.style.left = "-9999px", n.style.top = "0", n.style.width = "1px", n.style.height = "1px", n.style.opacity = "0", n.focus(), n.select(), n.setSelectionRange(0, e.length), document.execCommand("copy") || console.warn("execCommand copy failed");
		} catch (e) {
			console.warn("execCommand copy threw:", e);
		} finally {
			n.value = "", n.style.cssText = r, t?.focus();
		}
	}
}, Ct = { "1.0.0": "18" }, wt = Object.values(Ct).at(-1), Tt = class {
	constructor(e) {
		this.warned = !1;
		let t = Ct[e?.version ?? ""] ?? wt;
		this.provider = {
			version: t,
			wcwidth: (t) => e?.codepointWidth(t) ?? 1,
			charProperties: (t) => (e?.codepointWidth(t) ?? 1) << 1
		};
	}
	get versions() {
		return [this.provider.version];
	}
	get activeVersion() {
		return this.provider.version;
	}
	set activeVersion(e) {
		e !== this.provider.version && this.warn(`activeVersion ${e} is not available`);
	}
	register(e) {
		this.warn(`the provider for version ${e.version} is not used`);
	}
	get active() {
		return this.provider;
	}
	warn(e) {
		this.warned || (this.warned = !0, console.warn(`unicode: ${e}; character widths come from libghostty's Unicode ${this.provider.version} tables.`));
	}
}, Et = class {
	constructor(e = {}) {
		this.parser = new ft(), this.dataEmitter = new Y(), this.resizeEmitter = new Y(), this.bellEmitter = new Y(), this.selectionChangeEmitter = new Y(), this.keyEmitter = new Y(), this.titleChangeEmitter = new Y(), this.scrollEmitter = new Y(), this.renderEmitter = new Y(), this.cursorMoveEmitter = new Y(), this.workingDirectoryEmitter = new Y(), this.clipboardWriteEmitter = new Y(), this.notificationEmitter = new Y(), this.progressEmitter = new Y(), this.programStatusEmitter = new Y(), this.semanticPromptEmitter = new Y(), this.lineFeedEmitter = new Y(), this.writeParsedEmitter = new Y(), this.onData = this.dataEmitter.event, this.onResize = this.resizeEmitter.event, this.onBell = this.bellEmitter.event, this.onSelectionChange = this.selectionChangeEmitter.event, this.onKey = this.keyEmitter.event, this.onTitleChange = this.titleChangeEmitter.event, this.onScroll = this.scrollEmitter.event, this.onRender = this.renderEmitter.event, this.onCursorMove = this.cursorMoveEmitter.event, this.onLineFeed = this.lineFeedEmitter.event, this.onWriteParsed = this.writeParsedEmitter.event, this.onWorkingDirectoryChange = this.workingDirectoryEmitter.event, this.onClipboardWrite = this.clipboardWriteEmitter.event, this.onNotification = this.notificationEmitter.event, this.onProgress = this.progressEmitter.event, this.onProgramStatus = this.programStatusEmitter.event, this.onSemanticPrompt = this.semanticPromptEmitter.event, this.isOpen = !1, this.isDisposed = !1, this.refreshPending = !1, this.pendingWrites = [], this.writing = !1, this.awaitingEcho = !1, this.listenerRemovers = [], this.addons = [], this.markerRegistry = new st(), this.decorationService = new Je({
			gridSize: () => ({
				cols: this.cols,
				rows: this.rows
			}),
			cellSize: () => this.renderer?.getMetrics(),
			topLine: () => this.topLine(),
			isAlternateScreen: () => this.wasmTerm?.isAlternateScreen() ?? !1
		}), this.currentTitle = "", this.viewportY = 0, this.targetViewportY = 0, this.lastScrollTop = 0, this.wheelLineRemainder = 0, this.lastCursor = {
			x: 0,
			y: 0
		}, this.lastAltScreen = !1, this.resetPending = !1, this.isDraggingScrollbar = !1, this.scrollbarDragStart = null, this.scrollbarDragStartViewportY = 0, this.scrollbarFade = {
			from: 0,
			to: 0,
			start: 0
		}, this.SCROLLBAR_HIDE_DELAY_MS = 1500, this.SCROLLBAR_FADE_DURATION_MS = 200, this.animateScroll = () => {
			if (this.scrollAnimationFrame = void 0, !this.wasmTerm) return;
			let e = this.options.smoothScrollDuration ?? 100, t = this.targetViewportY - this.viewportY;
			if (Math.abs(t) < .01) this.viewportY = this.targetViewportY;
			else {
				let n = 1 - (1 / (e / 1e3 * 60)) ** 2;
				this.viewportY += t * n, this.scrollAnimationFrame = requestAnimationFrame(this.animateScroll);
			}
			this.fireScrollIfMoved(), this.getScrollbackLength() > 0 && this.showScrollbar();
		}, this.handleMouseMove = (e) => {
			this.canvas && this.renderer && this.wasmTerm && (this.isDraggingScrollbar ? this.processScrollbarDrag(e) : this.linkDetector && (this.mouseMoveThrottleTimeout ? this.pendingMouseMove = e : (this.processMouseMove(e), this.mouseMoveThrottleTimeout = window.setTimeout(() => {
				if (this.mouseMoveThrottleTimeout = void 0, this.pendingMouseMove) {
					let e = this.pendingMouseMove;
					this.pendingMouseMove = void 0, this.processMouseMove(e);
				}
			}, 16))));
		}, this.handleMouseLeave = () => {
			this.lastPointer = void 0, this.renderer && this.wasmTerm && (this.renderer.getHoveredHyperlinkId() > 0 && this.renderer.setHoveredHyperlinkId(0), this.renderer.setHoveredLinkRange(null)), this.currentHoveredLink && (this.currentHoveredLink.hover?.(!1), this.currentHoveredLink = void 0, this.element && (this.element.style.cursor = this.pointerShape(), this.canvas && (this.canvas.style.cursor = this.pointerShape())));
		}, this.handleClick = (e) => {
			if (!this.canvas || !this.renderer || !this.linkDetector || !this.wasmTerm) return;
			let t = this.canvas.getBoundingClientRect(), n = Math.floor((e.clientX - t.left) / this.renderer.charWidth), r = Math.floor((e.clientY - t.top) / this.renderer.charHeight), i = this.linkDetector.findLinkAt(n, this.viewportRowToBufferRow(r));
			i instanceof Promise ? i.then((t) => t?.activate(e)).catch(() => {}) : i && ((e.ctrlKey || e.metaKey) && e.preventDefault(), i.activate(e));
		}, this.handleWheel = (e) => {
			if (this.inputHandler?.isReportingMouse(e) || this.customWheelEventHandler && this.customWheelEventHandler(e) === !1) return;
			e.preventDefault(), e.stopPropagation();
			let t = this.wheelDeltaLines(e);
			if (t !== 0) {
				if (this.wasmTerm?.isAlternateScreen()) {
					if (!this.wasmTerm.getMode(1007, !1)) return;
					this.wheelLineRemainder += t;
					let e = Math.trunc(this.wheelLineRemainder);
					if (e === 0) return;
					this.wheelLineRemainder -= e;
					let n = e < 0 ? i.UP : i.DOWN;
					for (let t = 0; t < Math.min(Math.abs(e), this.rows); t++) this.inputHandler?.sendKey(n);
				} else this.wheelLineRemainder = 0, this.smoothScrollTo(this.targetViewportY - t);
			}
		}, this.handleMouseDown = (e) => {
			if (!this.canvas || !this.renderer || !this.wasmTerm) return;
			let t = this.wasmTerm.getScrollbackLength();
			if (t === 0) return;
			let n = this.canvas.getBoundingClientRect(), r = e.clientX - n.left, i = e.clientY - n.top, a = this.scrollbarThumb();
			if (!(r < a.x || r > a.x + a.width)) {
				if (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), i >= a.y && i <= a.y + a.height) this.isDraggingScrollbar = !0, this.scrollbarDragStart = i, this.scrollbarDragStartViewportY = this.viewportY, this.canvas.style.userSelect = "none", this.canvas.style.webkitUserSelect = "none", this.showScrollbar();
				else {
					let e = 1 - (i - a.trackY) / a.trackHeight;
					this.scrollToViewportOffset(Math.round(e * t));
				}
			}
		}, this.handleMouseUp = () => {
			this.isDraggingScrollbar && (this.isDraggingScrollbar = !1, this.scrollbarDragStart = null, this.canvas && (this.canvas.style.userSelect = "", this.canvas.style.webkitUserSelect = ""), this.getScrollbackLength() > 0 && this.showScrollbar());
		}, this.ghostty = e.ghostty ?? Be(), this.unicode = new Tt(this.ghostty);
		let t = {
			cols: e.cols ?? 80,
			rows: e.rows ?? 24,
			cursorBlink: e.cursorBlink ?? !1,
			cursorStyle: e.cursorStyle ?? "block",
			theme: e.theme ?? {},
			scrollback: e.scrollback ?? 1e4,
			fontSize: e.fontSize ?? 15,
			fontFamily: e.fontFamily ?? "monospace",
			allowTransparency: e.allowTransparency ?? !1,
			convertEol: e.convertEol ?? !1,
			disableStdin: e.disableStdin ?? !1,
			smoothScrollDuration: e.smoothScrollDuration ?? 100,
			allowClipboardWrite: e.allowClipboardWrite ?? !0
		};
		this.rawOptions = t, this.options = new Proxy(t, { set: (e, t, n) => {
			let r = Reflect.get(e, t);
			return Reflect.set(e, t, n), this.isOpen && typeof t == "string" && this.handleOptionChange(t, n, r), !0;
		} }), this.cols = this.options.cols, this.rows = this.options.rows, this.buffer = new Ue(this);
	}
	handleOptionChange(e, t, n) {
		if (t !== n) switch (e) {
			case "disableStdin": break;
			case "cursorBlink":
			case "cursorStyle":
				this.wasmTerm?.setDefaultCursor(this.options.cursorStyle, this.options.cursorBlink), this.renderer && (this.renderer.setCursorStyle(this.options.cursorStyle), this.renderer.setCursorBlink(this.options.cursorBlink));
				break;
			case "theme":
				this.wasmTerm?.setColors(this.themeColors()), this.renderer && this.wasmTerm && (this.renderer.setTheme(this.options.theme), this.renderFrame(!0));
				break;
			case "fontSize":
				this.renderer && (this.renderer.setFontSize(this.options.fontSize), this.handleFontChange());
				break;
			case "fontFamily":
				this.renderer && (this.renderer.setFontFamily(this.options.fontFamily), this.handleFontChange());
				break;
			case "scrollback": {
				this.wasmTerm?.setScrollbackLimit(this.options.scrollback), this.markerRegistry.update();
				let e = this.getScrollbackLength();
				this.viewportY > e && this.scrollToViewportOffset(e), this.fireScrollIfMoved();
				break;
			}
			case "cols":
			case "rows": this.resize(this.options.cols, this.options.rows);
		}
	}
	handleFontChange() {
		this.renderer && this.wasmTerm && this.canvas && (this.selectionManager && this.selectionManager.clearSelection(), this.renderer.resize(this.cols, this.rows), this.syncCellPixelSize(), this.decorationService.invalidate(), this.renderFrame(!0));
	}
	buildWasmConfig() {
		return { scrollbackLimit: this.options.scrollback };
	}
	themeColors() {
		let e = {
			...Z,
			...this.options.theme
		}, t = (e) => Q(e);
		return {
			foreground: t(e.foreground),
			background: t(e.background) ?? 0,
			cursor: t(e.cursor),
			palette: [
				e.black,
				e.red,
				e.green,
				e.yellow,
				e.blue,
				e.magenta,
				e.cyan,
				e.white,
				e.brightBlack,
				e.brightRed,
				e.brightGreen,
				e.brightYellow,
				e.brightBlue,
				e.brightMagenta,
				e.brightCyan,
				e.brightWhite
			].map(t)
		};
	}
	open(e) {
		if (this.isOpen) throw Error("Terminal is already open");
		if (this.isDisposed) throw Error("Terminal has been disposed");
		this.element = e, this.isOpen = !0, this.cols = this.options.cols, this.rows = this.options.rows;
		try {
			this.parentState = {
				tabindex: e.getAttribute("tabindex"),
				cursor: e.style.cursor
			}, e.hasAttribute("tabindex") || e.setAttribute("tabindex", "0"), e.setAttribute("contenteditable", "true"), this.listen(e, "beforeinput", (e) => {
				e.target !== this.textarea && e.preventDefault();
			}), e.setAttribute("role", "textbox"), e.setAttribute("aria-label", "Terminal input"), e.setAttribute("aria-multiline", "true");
			let t = this.buildWasmConfig();
			this.wasmTerm = this.ghostty.createTerminal(this.cols, this.rows, t), this.connectEffects(this.wasmTerm), this.canvas = document.createElement("canvas"), this.canvas.style.display = "block", this.canvas.style.cursor = "text", e.appendChild(this.canvas), this.textarea = document.createElement("textarea"), this.textarea.setAttribute("autocorrect", "off"), this.textarea.setAttribute("autocapitalize", "off"), this.textarea.setAttribute("spellcheck", "false"), this.textarea.setAttribute("tabindex", "0"), this.textarea.setAttribute("aria-label", "Terminal input"), this.textarea.style.position = "absolute", this.textarea.style.left = "0", this.textarea.style.top = "0", this.textarea.style.width = "1px", this.textarea.style.height = "1px", this.textarea.style.padding = "0", this.textarea.style.border = "none", this.textarea.style.margin = "0", this.textarea.style.opacity = "0", this.textarea.style.clipPath = "inset(50%)", this.textarea.style.overflow = "hidden", this.textarea.style.whiteSpace = "nowrap", this.textarea.style.resize = "none", e.appendChild(this.textarea);
			let n = this.textarea;
			this.listen(this.canvas, "mousedown", (e) => {
				e.preventDefault(), n.focus();
			}), this.listen(this.canvas, "touchend", (e) => {
				e.preventDefault(), n.focus();
			}), this.renderer = new bt(this.canvas, {
				fontSize: this.options.fontSize,
				fontFamily: this.options.fontFamily,
				cursorStyle: this.options.cursorStyle,
				cursorBlink: this.options.cursorBlink,
				theme: this.options.theme,
				allowTransparency: this.options.allowTransparency
			}), this.renderer.resize(this.cols, this.rows), this.renderer.setHighlightProvider(() => [...this.searchHighlights?.() ?? [], ...this.decorationService.highlights()]), this.decorationService.attach(e, this.canvas), this.renderer.setFocused(document.activeElement === this.textarea), this.listen(this.textarea, "focus", () => this.setRendererFocus(!0)), this.listen(this.textarea, "blur", () => this.setRendererFocus(!1));
			let r = this.canvas, i = this.renderer, a = {
				hasMouseTracking: () => this.wasmTerm?.hasMouseTracking() ?? !1,
				getScreenSize: () => ({
					width: this.cols * i.charWidth,
					height: this.rows * i.charHeight
				}),
				getCellDimensions: () => ({
					width: i.charWidth,
					height: i.charHeight
				}),
				getCanvasOffset: () => {
					let e = r.getBoundingClientRect();
					return {
						left: e.left,
						top: e.top
					};
				}
			};
			this.inputHandler = new $e({
				ghostty: this.ghostty,
				container: e,
				inputElement: this.textarea,
				getTerminal: () => this.wasmTerm,
				onData: (e) => {
					this.options.disableStdin || (this.selectionManager?.clearSelection(), this.viewportY !== 0 && this.scrollToBottom(), this.awaitingEcho = !0, this.dataEmitter.fire(e));
				},
				onKey: (e) => this.keyEmitter.fire(e),
				customKeyEventHandler: this.customKeyEventHandler,
				customWheelEventHandler: this.customWheelEventHandler,
				onCopy: () => this.copySelection(),
				mouseConfig: a
			}), this.syncCellPixelSize(), this.inputHandler.onSelectionAdjusted = () => this.selectionChangeEmitter.fire(), this.selectionManager = new St(this, this.renderer, this.wasmTerm, this.textarea), this.selectionManager.onSelectionChange(() => {
				this.selectionChangeEmitter.fire();
			}), this.linkDetector = new it(this), this.linkDetector.registerProvider(new pt(this)), this.linkDetector.registerProvider(new ht(this)), this.listen(e, "mousedown", this.handleMouseDown, { capture: !0 }), this.listen(e, "mousemove", this.handleMouseMove), this.listen(e, "mouseleave", this.handleMouseLeave), this.listen(e, "click", this.handleClick), this.listen(document, "mouseup", this.handleMouseUp), this.listen(e, "wheel", this.handleWheel, {
				passive: !1,
				capture: !0
			}), document.fonts && this.listen(document.fonts, "loadingdone", () => {
				this.renderer?.remeasureFont() && this.handleFontChange();
			}), this.watchDevicePixelRatio(), this.renderFrame(!0), this.startRenderLoop(), this.focus();
		} catch (e) {
			throw this.cleanupComponents(), this.isOpen = !1, Error(`Failed to open terminal: ${e}`);
		}
		this.flushPendingWrites();
	}
	listen(e, t, n, r) {
		e.addEventListener(t, n, r), this.listenerRemovers.push(() => e.removeEventListener(t, n, r));
	}
	watchDevicePixelRatio() {
		if (this.stopWatchingDevicePixelRatio?.(), this.stopWatchingDevicePixelRatio = void 0, typeof window.matchMedia != "function") return;
		let e = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
		if (typeof e?.addEventListener != "function") return;
		let t = () => {
			this.renderer?.setDevicePixelRatio(window.devicePixelRatio), this.watchDevicePixelRatio();
		};
		e.addEventListener("change", t), this.stopWatchingDevicePixelRatio = () => e.removeEventListener("change", t);
	}
	write(e, t) {
		if (this.isDisposed) throw Error("Terminal has been disposed");
		this.options.convertEol && typeof e == "string" && (e = e.replace(/\n/g, "\r\n")), this.pendingWrites.push({
			data: e,
			callback: t
		}), this.isOpen && !this.writing && this.flushPendingWrites();
	}
	flushPendingWrites() {
		if (this.writing) return;
		this.writing = !0;
		let e = !1;
		try {
			for (; this.pendingWrites.length > 0 && this.isOpen;) {
				let { data: t, callback: n } = this.pendingWrites.shift();
				this.writeInternal(t, n), e = !0;
			}
		} finally {
			this.writing = !1;
		}
		e && !this.isDisposed && (this.writeParsedEmitter.fire(), this.pendingWrites.length > 0 && this.isOpen && this.flushPendingWrites());
	}
	writeInternal(e, t) {
		let n = Math.max(0, Math.floor(this.viewportY));
		n > 0 && this.wasmTerm.setViewportOffset(n);
		let r = this.wasmTerm;
		if (this.parser.hasOscHandlers || r.capturingOsc ? r.writeCapturingOsc(e, (e) => this.parser.handleOsc(e)) : r.write(e), this.markerRegistry.update(), this.lineFeedEmitter.hasListeners) for (let t = dt(e); t > 0; t--) this.lineFeedEmitter.fire();
		if (n > 0 && this.followScrolledContent(n), this.resetPending && (this.resetPending = !1, this.afterReset()), this.checkBufferChange(), this.fireScrollIfMoved(), this.processTerminalResponses(), this.linkDetector?.invalidateCache(), this.refreshHover(), this.canvas && !this.currentHoveredLink) {
			let e = this.pointerShape();
			this.canvas.style.cursor !== e && (this.canvas.style.cursor = e, this.element && (this.element.style.cursor = e));
		}
		t && requestAnimationFrame(t), this.awaitingEcho && (this.awaitingEcho = !1, this.renderer && this.wasmTerm && this.renderFrame(!1));
	}
	writeln(e, t) {
		if (typeof e == "string") this.write(e + "\r\n", t);
		else {
			let n = new Uint8Array(e.length + 2);
			n.set(e), n[e.length] = 13, n[e.length + 1] = 10, this.write(n, t);
		}
	}
	paste(e) {
		if (this.assertOpen(), this.options.disableStdin) return;
		this.awaitingEcho = !0;
		let t = this.wasmTerm.encodePaste(e);
		t && this.dataEmitter.fire(t);
	}
	input(e, t = !1) {
		this.assertOpen(), this.options.disableStdin || (t ? (this.awaitingEcho = !0, this.dataEmitter.fire(e)) : this.write(e));
	}
	resize(e, t) {
		if (this.isDisposed) throw Error("Terminal has been disposed");
		if (e !== this.cols || t !== this.rows) {
			if (this.rawOptions.cols = e, this.rawOptions.rows = t, !this.isOpen) this.cols = e, this.rows = t;
			else {
				this.cancelRenderLoop();
				try {
					this.cols = e, this.rows = t, this.wasmTerm.resize(e, t), this.markerRegistry.update(), this.renderer.resize(e, t);
					let n = this.getScrollbackLength();
					(this.viewportY > n || this.targetViewportY > n) && this.scrollToViewportOffset(Math.min(this.viewportY, n)), this.resizeEmitter.fire({
						cols: e,
						rows: t
					}), this.renderFrame(!0);
				} catch (e) {
					console.error("Terminal resize failed:", e);
				}
				this.startRenderLoop();
			}
		}
	}
	clear() {
		this.assertOpen();
		let e = this.wasmTerm;
		(e.getCursor().y > 0 || e.getScrollbackLength() > 0) && this.markerRegistry.clear(), e.clearToCursorLine(), this.selectionManager?.clearSelection(), this.linkDetector?.invalidateCache(), this.scrollToViewportOffset(0), this.fireScrollIfMoved();
	}
	reset() {
		this.assertOpen(), this.wasmTerm.reset(), this.afterReset();
	}
	checkBufferChange() {
		let e = this.wasmTerm?.isAlternateScreen() ?? !1;
		e !== this.lastAltScreen && (this.lastAltScreen = e, e || this.markerRegistry.disposeAlternate(), this.buffer._fireBufferChange(this.buffer.active));
	}
	afterReset() {
		this.markerRegistry.clear(), this.selectionManager?.clearSelection(), this.linkDetector?.invalidateCache(), this.cancelScrollAnimation(), this.viewportY = 0, this.targetViewportY = 0, this.fireScrollIfMoved(), this.currentHoveredLink?.hover?.(!1), this.currentHoveredLink = void 0, this.renderer?.setHoveredHyperlinkId(0), this.renderer?.setHoveredLinkRange(null), this.canvas && (this.canvas.style.cursor = this.pointerShape(), this.element && (this.element.style.cursor = this.canvas.style.cursor)), this.renderer?.clear(), this.checkBufferChange(), this.currentTitle !== "" && (this.currentTitle = "", this.titleChangeEmitter.fire(""));
	}
	focus() {
		this.isOpen && this.textarea && (this.textarea.focus(), setTimeout(() => {
			this.isOpen && this.textarea?.focus();
		}, 0));
	}
	blur() {
		this.isOpen && (this.textarea?.blur(), document.activeElement === this.element && this.element?.blur());
	}
	loadAddon(e) {
		e.activate(this), this.addons.push(e);
	}
	getSelection() {
		return this.selectionManager?.getSelection() || "";
	}
	hasSelection() {
		return this.selectionManager?.hasSelection() || !1;
	}
	clearSelection() {
		this.selectionManager?.clearSelection();
	}
	copySelection() {
		return this.selectionManager?.copySelection() || !1;
	}
	selectAll() {
		this.selectionManager?.selectAll();
	}
	select(e, t, n) {
		this.selectionManager?.select(e, t, n);
	}
	selectLines(e, t) {
		this.selectionManager?.selectLines(e, t);
	}
	getViewportY() {
		return this.viewportY;
	}
	refresh(e, t) {
		!this.renderer || Number.isNaN(e) || Number.isNaN(t) || Math.min(e, t) > this.rows - 1 || Math.max(e, t) < 0 || (this.refreshPending = !0);
	}
	getMetrics() {
		return this.renderer?.getMetrics();
	}
	setScrollbarGutter(e) {
		this.renderer?.setScrollbarGutter(e);
	}
	setHighlightProvider(e) {
		this.searchHighlights = e;
	}
	getSelectionPosition() {
		return this.selectionManager?.getSelectionPosition();
	}
	attachCustomKeyEventHandler(e) {
		this.customKeyEventHandler = e, this.inputHandler && this.inputHandler.setCustomKeyEventHandler(e);
	}
	attachCustomWheelEventHandler(e) {
		this.customWheelEventHandler = e, this.inputHandler?.setCustomWheelEventHandler(e);
	}
	get markers() {
		return this.markerRegistry.markers;
	}
	registerMarker(e = 0) {
		this.assertOpen();
		let t = this.wasmTerm, n = t.getScrollbackLength() + t.getCursor().y + e;
		return this.markerRegistry.create(t, n);
	}
	registerDecoration(e) {
		return this.decorationService.register(e);
	}
	registerLinkProvider(e) {
		if (!this.linkDetector) throw Error("Terminal must be opened before registering link providers");
		this.linkDetector.registerProvider(e);
	}
	scrollLines(e) {
		if (!this.wasmTerm) throw Error("Terminal not open");
		this.scrollToViewportOffset(Math.round(this.targetViewportY) - e);
	}
	scrollPages(e) {
		this.scrollLines(e * this.rows);
	}
	scrollToTop() {
		this.scrollToViewportOffset(this.getScrollbackLength());
	}
	scrollToBottom() {
		this.scrollToViewportOffset(0);
	}
	scrollToLine(e) {
		this.scrollToViewportOffset(this.getScrollbackLength() - e);
	}
	scrollToPrompt(e) {
		return !this.wasmTerm || (this.wasmTerm.setViewportOffset(Math.max(0, Math.floor(this.viewportY))), !this.wasmTerm.scrollToPrompt(e)) ? !1 : (this.scrollToViewportOffset(this.wasmTerm.getViewportOffset()), !0);
	}
	scrollToViewportOffset(e) {
		let t = this.getScrollbackLength(), n = Math.max(0, Math.min(t, e));
		this.cancelScrollAnimation(), this.targetViewportY = n, n !== this.viewportY && (this.viewportY = n, this.fireScrollIfMoved(), t > 0 && this.showScrollbar());
	}
	topLine() {
		return Math.max(0, this.getScrollbackLength() - Math.max(0, Math.floor(this.viewportY)));
	}
	fireScrollIfMoved() {
		let e = this.topLine();
		e !== this.lastScrollTop && (this.lastScrollTop = e, this.scrollEmitter.fire(e), this.refreshHover());
	}
	refreshHover() {
		this.lastPointer && this.renderer && (this.currentHoveredLink || this.renderer.getHoveredHyperlinkId() !== 0) && this.processMouseMove(this.lastPointer);
	}
	cancelScrollAnimation() {
		this.scrollAnimationFrame !== void 0 && (cancelAnimationFrame(this.scrollAnimationFrame), this.scrollAnimationFrame = void 0);
	}
	followScrolledContent(e) {
		let t = this.wasmTerm.getViewportOffset() - e;
		t !== 0 && (this.viewportY = Math.max(0, this.viewportY + t), this.targetViewportY = Math.max(0, this.targetViewportY + t));
	}
	smoothScrollTo(e) {
		this.wasmTerm && ((this.options.smoothScrollDuration ?? 100) === 0 ? this.scrollToViewportOffset(e) : (this.targetViewportY = Math.max(0, Math.min(this.getScrollbackLength(), e)), this.scrollAnimationFrame === void 0 && this.animateScroll()));
	}
	dispose() {
		if (!this.isDisposed) {
			this.isDisposed = !0, this.cancelRenderLoop(), this.pendingWrites.length = 0, this.cancelScrollAnimation(), this.mouseMoveThrottleTimeout &&= (clearTimeout(this.mouseMoveThrottleTimeout), void 0), this.pendingMouseMove = void 0;
			for (let e of this.addons) e.dispose();
			this.addons = [], this.cleanupComponents(), this.isOpen = !1, this.dataEmitter.dispose(), this.resizeEmitter.dispose(), this.bellEmitter.dispose(), this.selectionChangeEmitter.dispose(), this.keyEmitter.dispose(), this.titleChangeEmitter.dispose(), this.scrollEmitter.dispose(), this.renderEmitter.dispose(), this.cursorMoveEmitter.dispose(), this.workingDirectoryEmitter.dispose(), this.clipboardWriteEmitter.dispose(), this.notificationEmitter.dispose(), this.progressEmitter.dispose(), this.programStatusEmitter.dispose(), this.semanticPromptEmitter.dispose(), this.lineFeedEmitter.dispose(), this.writeParsedEmitter.dispose();
		}
	}
	cancelRenderLoop() {
		this.animationFrameId &&= (cancelAnimationFrame(this.animationFrameId), void 0);
	}
	setRendererFocus(e) {
		this.renderer?.setFocused(e), this.renderFrame(!1);
	}
	renderFrame(e) {
		if (!this.renderer || !this.wasmTerm) return;
		e ||= this.refreshPending, this.refreshPending = !1;
		let t = this.renderer.render(this.wasmTerm, e, this.viewportY, this.scrollbarOpacity);
		this.decorationService.refresh(t !== null), t && this.renderEmitter.fire(t);
	}
	startRenderLoop() {
		if (this.animationFrameId) return;
		let e = () => {
			if (!this.isDisposed && this.isOpen) {
				this.renderFrame(!1);
				let t = this.wasmTerm.getCursor();
				(t.x !== this.lastCursor.x || t.y !== this.lastCursor.y) && (this.lastCursor = {
					x: t.x,
					y: t.y
				}, this.cursorMoveEmitter.fire()), this.animationFrameId = requestAnimationFrame(e);
			}
		};
		e();
	}
	getScrollbackLength() {
		return this.wasmTerm ? this.wasmTerm.getScrollbackLength() : 0;
	}
	cleanupComponents() {
		this.selectionManager &&= (this.selectionManager.dispose(), void 0), this.inputHandler &&= (this.inputHandler.dispose(), void 0), this.renderer &&= (this.renderer.dispose(), void 0), this.canvas && this.canvas.parentNode && (this.canvas.parentNode.removeChild(this.canvas), this.canvas = void 0), this.textarea && this.textarea.parentNode && (this.textarea.parentNode.removeChild(this.textarea), this.textarea = void 0);
		for (let e of this.listenerRemovers) e();
		this.listenerRemovers = [], this.stopWatchingDevicePixelRatio?.(), this.stopWatchingDevicePixelRatio = void 0, this.element && (this.element.removeAttribute("contenteditable"), this.element.removeAttribute("role"), this.element.removeAttribute("aria-label"), this.element.removeAttribute("aria-multiline"), this.parentState && (this.parentState.tabindex === null ? this.element.removeAttribute("tabindex") : this.element.setAttribute("tabindex", this.parentState.tabindex), this.element.style.cursor = this.parentState.cursor)), this.parentState = void 0, this.scrollbarHideTimeout &&= (window.clearTimeout(this.scrollbarHideTimeout), void 0), this.linkDetector &&= (this.linkDetector.dispose(), void 0), this.decorationService.dispose(), this.markerRegistry.dispose(), this.wasmTerm &&= (this.wasmTerm.free(), void 0), this.ghostty = void 0, this.element = void 0, this.textarea = void 0;
	}
	assertOpen() {
		if (this.isDisposed) throw Error("Terminal has been disposed");
		if (!this.isOpen) throw Error("Terminal must be opened before use. Call terminal.open(parent) first.");
	}
	processMouseMove(e) {
		if (!this.canvas || !this.renderer || !this.linkDetector || !this.wasmTerm) return;
		this.lastPointer = {
			clientX: e.clientX,
			clientY: e.clientY
		};
		let t = this.canvas.getBoundingClientRect(), n = Math.floor((e.clientX - t.left) / this.renderer.charWidth), r = Math.floor((e.clientY - t.top) / this.renderer.charHeight), i = 0, a = this.wasmTerm.getViewportLine(r);
		a && n >= 0 && n < a.length && (i = a[n].hyperlink_id);
		let o = this.renderer.getHoveredHyperlinkId();
		i !== o && this.renderer.setHoveredHyperlinkId(i);
		let s = this.viewportRowToBufferRow(r);
		this.linkDetector.getLinkAt(n, s).then((e) => {
			if (e !== this.currentHoveredLink) {
				this.currentHoveredLink?.hover?.(!1), this.currentHoveredLink = e, e?.hover?.(!0);
				let t = e ? "pointer" : this.pointerShape();
				this.element && (this.element.style.cursor = t), this.canvas && (this.canvas.style.cursor = t);
			}
			if (!this.renderer) return;
			let t = e ? this.bufferRowToViewportRow(e.range.start.y) : -1, n = e ? this.bufferRowToViewportRow(e.range.end.y) : -1;
			e && t < this.rows && n >= 0 ? this.renderer.setHoveredLinkRange({
				startX: e.range.start.x,
				startY: Math.max(0, t),
				endX: e.range.end.x,
				endY: Math.min(this.rows - 1, n)
			}) : this.renderer.setHoveredLinkRange(null);
		}).catch((e) => {
			console.warn("Link detection error:", e);
		});
	}
	wheelDeltaLines(e) {
		switch (e.deltaMode) {
			case WheelEvent.DOM_DELTA_LINE: return e.deltaY;
			case WheelEvent.DOM_DELTA_PAGE: return e.deltaY * this.rows;
			default: return e.deltaY / (this.renderer?.getMetrics().height || 20);
		}
	}
	scrollbarThumb() {
		return this.renderer.getScrollbarThumb(this.viewportY, this.getScrollbackLength(), this.rows);
	}
	processScrollbarDrag(e) {
		if (!this.canvas || !this.renderer || this.scrollbarDragStart === null) return;
		let t = this.getScrollbackLength();
		if (t === 0) return;
		let n = this.canvas.getBoundingClientRect(), r = e.clientY - n.top - this.scrollbarDragStart, i = this.scrollbarThumb(), a = i.trackHeight - i.height;
		if (a <= 0) return;
		let o = Math.round(-r / a * t);
		this.scrollToViewportOffset(this.scrollbarDragStartViewportY + o);
	}
	get scrollbarOpacity() {
		let { from: e, to: t, start: n } = this.scrollbarFade, r = Math.min(1, (performance.now() - n) / this.SCROLLBAR_FADE_DURATION_MS);
		return e + (t - e) * Math.max(0, r);
	}
	fadeScrollbar(e) {
		this.scrollbarFade.to !== e && (this.scrollbarFade = {
			from: this.scrollbarOpacity,
			to: e,
			start: performance.now()
		});
	}
	showScrollbar() {
		this.scrollbarHideTimeout &&= (window.clearTimeout(this.scrollbarHideTimeout), void 0), this.fadeScrollbar(1), this.isDraggingScrollbar || (this.scrollbarHideTimeout = window.setTimeout(() => {
			this.hideScrollbar();
		}, this.SCROLLBAR_HIDE_DELAY_MS));
	}
	hideScrollbar() {
		this.scrollbarHideTimeout &&= (window.clearTimeout(this.scrollbarHideTimeout), void 0), this.fadeScrollbar(0);
	}
	processTerminalResponses() {
		if (this.wasmTerm) for (;;) {
			let e = this.wasmTerm.readResponse();
			if (e === null) break;
			this.dataEmitter.fire(e);
		}
	}
	connectEffects(e) {
		e.setColors(this.themeColors()), e.setDefaultCursor(this.options.cursorStyle, this.options.cursorBlink), e.setEffects({
			bell: () => this.bellEmitter.fire(),
			reset: () => {
				this.resetPending = !0;
			},
			titleChanged: (e) => {
				e !== this.currentTitle && (this.currentTitle = e, this.titleChangeEmitter.fire(e));
			},
			pwdChanged: (e) => this.workingDirectoryEmitter.fire(e),
			clipboardWrite: ({ location: e, contents: t }) => {
				let n = t.find((e) => e.mime.startsWith("text/plain")) ?? t[0], r = n ? new TextDecoder().decode(n.data) : "";
				return this.clipboardWriteEmitter.fire({
					text: r,
					location: e
				}), this.options.allowClipboardWrite !== !1 && (e === "standard" && typeof navigator < "u" && navigator.clipboard && navigator.clipboard.writeText(r).catch(() => {}), !0);
			},
			notification: (e) => this.notificationEmitter.fire(e),
			progress: (e) => this.progressEmitter.fire(e),
			programStatus: (e) => this.programStatusEmitter.fire(e),
			semanticPrompt: (e) => this.semanticPromptEmitter.fire(e),
			colorScheme: () => this.colorScheme(),
			cellSize: () => {
				let e = this.renderer?.getMetrics();
				return e ? {
					width: e.width,
					height: e.height
				} : null;
			}
		});
	}
	viewportRowToBufferRow(e) {
		return this.topLine() + e;
	}
	bufferRowToViewportRow(e) {
		return e - this.topLine();
	}
	pointerShape() {
		return this.wasmTerm?.getMouseShape() ?? "text";
	}
	syncCellPixelSize() {
		let e = this.renderer?.getMetrics();
		e && this.wasmTerm && this.wasmTerm.setCellPixelSize(e.width, e.height);
	}
	colorScheme() {
		let e = this.themeColors().background ?? 0, [t, n, r] = [
			16,
			8,
			0
		].map((t) => (e >> t & 255) / 255);
		return .2126 * t + .7152 * n + .0722 * r > .5 ? "light" : "dark";
	}
	get modes() {
		return this.wasmTerm ? lt(this.wasmTerm) : ct;
	}
	getMode(e, t = !1) {
		return this.assertOpen(), this.wasmTerm.getMode(e, t);
	}
	hasBracketedPaste() {
		return this.assertOpen(), this.wasmTerm.hasBracketedPaste();
	}
	hasFocusEvents() {
		return this.assertOpen(), this.wasmTerm.hasFocusEvents();
	}
	hasMouseTracking() {
		return this.assertOpen(), this.wasmTerm.hasMouseTracking();
	}
}, Dt = 2, Ot = 1, kt = 100, At = class {
	constructor() {
		this._isResizing = !1;
	}
	activate(e) {
		this._terminal = e;
	}
	dispose() {
		this._resizeObserver &&= (this._resizeObserver.disconnect(), void 0), this._resizeDebounceTimer &&= (clearTimeout(this._resizeDebounceTimer), void 0), this._terminal = void 0;
	}
	fit() {
		if (this._isResizing) return;
		let e = this.measure(), t = this._terminal;
		if (e && t && (t.setScrollbarGutter(e.gutter), e.cols !== t.cols || e.rows !== t.rows)) {
			this._isResizing = !0;
			try {
				t.resize(e.cols, e.rows);
			} finally {
				this._isResizing = !1;
			}
		}
	}
	proposeDimensions() {
		let e = this.measure();
		return e ? {
			cols: e.cols,
			rows: e.rows
		} : void 0;
	}
	measure() {
		if (!this._terminal?.element) return;
		let e = this._terminal.getMetrics();
		if (!e || e.width === 0 || e.height === 0) return;
		let t = this._terminal.element;
		if (t.clientWidth === void 0) return;
		let n = window.getComputedStyle(t), r = Number.parseInt(n.getPropertyValue("padding-top")) || 0, i = Number.parseInt(n.getPropertyValue("padding-bottom")) || 0, a = Number.parseInt(n.getPropertyValue("padding-left")) || 0, o = Number.parseInt(n.getPropertyValue("padding-right")) || 0, s = t.clientWidth, c = t.clientHeight;
		if (s === 0 || c === 0) return;
		let l = s - a - o, u = l - 15, d = c - r - i, f = Math.max(Dt, Math.floor(u / e.width));
		return {
			cols: f,
			rows: Math.max(Ot, Math.floor(d / e.height)),
			gutter: Math.max(15, l - f * e.width)
		};
	}
	observeResize() {
		this._terminal?.element && (this._resizeObserver || (this._resizeObserver = new ResizeObserver((e) => {
			e[0] && (this._resizeDebounceTimer && clearTimeout(this._resizeDebounceTimer), this._resizeDebounceTimer = setTimeout(() => {
				this._resizeDebounceTimer = void 0, this.fit();
			}, kt));
		}), this._resizeObserver.observe(this._terminal.element)));
	}
}, jt = " ~!@#$%^&*()+`-=[]{}|\\;:\"',./<>?";
function $(e, t, n, r) {
	return e < n || e === n && t < r;
}
var Mt = class {
	constructor() {
		this.resultsEmitter = new Y(), this.onDidChangeResults = this.resultsEmitter.event;
	}
	activate(e) {
		this.terminal = e;
	}
	dispose() {
		this.clearDecorations(), this.dropSearch(), this.resultsEmitter.dispose(), this.terminal = void 0;
	}
	findNext(e, t) {
		return this.find(e, t ?? {}, "next");
	}
	findPrevious(e, t) {
		return this.find(e, t ?? {}, "previous");
	}
	clearDecorations() {
		this.setHighlights(void 0), this.search?.setNeedle(""), this.textSearch = void 0;
	}
	clearActiveDecoration() {
		this.terminal?.clearSelection();
	}
	setHighlights(e) {
		this.terminal?.setHighlightProvider(e);
	}
	dropSearch() {
		this.search?.dispose(), this.search = void 0, this.searchTerm = void 0;
	}
	getSearch() {
		let e = this.terminal?.wasmTerm;
		if (e) return this.searchTerm !== e && (this.dropSearch(), this.search = e.createSearch(), this.searchTerm = e), this.search;
	}
	find(e, t, n) {
		let r = this.terminal, i = this.getSearch();
		if (!r || !i) return !1;
		if (!e) return this.clearDecorations(), this.fireResults(-1, 0), !1;
		if (t.regex || t.wholeWord || t.caseSensitive) return i.setNeedle(""), this.findText(e, t, n);
		this.textSearch = void 0;
		let a = i.getNeedle().toLowerCase() === e.toLowerCase(), o = t.incremental && !a ? i.selectedMatch() : null;
		i.setNeedle(e), i.run();
		let s;
		s = t.incremental && a && i.selectedIndex >= 0 ? !0 : o ? this.selectNear(i, o.startRow, o.startCol, n) : n === "next" ? i.next() : i.previous(), s && (i.selectMatchAsSelection(), r.scrollToViewportOffset(r.wasmTerm.getViewportOffset())), this.decorations = t.decorations, this.setHighlights(this.decorations ? () => this.highlights() : void 0);
		let c = i.totalMatches, l = i.selectedIndex;
		return this.fireResults(s && l >= 0 ? c - 1 - l : -1, c), s;
	}
	selectNear(e, t, n, r) {
		if (!e.next()) return !1;
		let i = e.totalMatches - 1, a = e.selectedMatch();
		for (; a && $(t, n, a.startRow, a.startCol) && e.selectedIndex < i;) e.next(), a = e.selectedMatch();
		return a && r === "previous" && $(a.startRow, a.startCol, t, n) && e.selectedIndex > 0 && e.previous(), !0;
	}
	findText(e, t, n) {
		let r = this.terminal.wasmTerm, i = JSON.stringify([
			t.caseSensitive ? e : e.toLowerCase(),
			!!t.regex,
			!!t.wholeWord,
			!!t.caseSensitive
		]), a = this.textSearch?.wasmTerm === r ? this.textSearch : void 0, o = a && a.selected >= 0 ? a.matches[a.selected] : null, s = Ft(r, e, t), c = s.length, l = -1;
		if (c > 0) {
			let e = o ? s.findIndex((e) => Nt(e, o)) : -1;
			if (o && t.incremental) l = a.key === i && e >= 0 ? e : Pt(s, o, n);
			else if (o && a.key === i) {
				let t = e >= 0 ? e : Pt(s, o, n);
				l = e < 0 ? t : n === "next" ? (t - 1 + c) % c : (t + 1) % c;
			} else l = n === "next" ? c - 1 : 0;
		}
		if (this.textSearch = {
			key: i,
			matches: s,
			selected: l,
			wasmTerm: r
		}, l >= 0) {
			let e = s[l];
			r.setSelectionRange(e.startCol, e.startRow, e.endCol, e.endRow), this.scrollIntoView(e);
		}
		return this.decorations = t.decorations, this.setHighlights(this.decorations ? () => this.highlights() : void 0), this.fireResults(l, c), l >= 0;
	}
	scrollIntoView(e) {
		let t = this.terminal, n = t.wasmTerm.getScrollbackLength(), r = n - Math.max(0, Math.floor(t.getViewportY()));
		if (e.startRow >= r && e.endRow < r + t.rows) return;
		let i = e.startRow - Math.floor(t.rows / 2);
		t.scrollToViewportOffset(n - Math.max(0, Math.min(n, i)));
	}
	fireResults(e, t) {
		this.resultsEmitter.fire({
			resultIndex: e,
			resultCount: t
		});
	}
	highlights() {
		let e = this.terminal, t = e?.wasmTerm;
		if (!e || !t) return [];
		let n = this.decorations?.matchBackground, r = this.decorations?.activeMatchBackground ?? n;
		if (!n && !r) return [];
		let i, a, o = t.getScrollbackLength() - Math.max(0, Math.floor(e.getViewportY())), s = this.textSearch;
		if (s) {
			if (s.wasmTerm !== t) return [];
			let n = o + e.rows - 1;
			i = s.matches.filter((e) => e.endRow >= o && e.startRow <= n), a = s.selected >= 0 ? s.matches[s.selected] : null;
		} else {
			let e = this.search;
			if (!e || this.searchTerm !== t) return [];
			i = e.viewportMatches(), a = e.selectedMatch();
		}
		let c = [];
		for (let t of i) {
			let i = a !== null && Nt(t, a), s = i ? r : n;
			if (s) for (let n = t.startRow; n <= t.endRow; n++) {
				let r = n - o;
				r < 0 || r >= e.rows || c.push({
					row: r,
					start: n === t.startRow ? t.startCol : 0,
					end: n === t.endRow ? t.endCol : e.cols - 1,
					color: s,
					active: i
				});
			}
		}
		return c;
	}
};
function Nt(e, t) {
	return e.startRow === t.startRow && e.startCol === t.startCol && e.endRow === t.endRow && e.endCol === t.endCol;
}
function Pt(e, t, n) {
	let r = -1;
	for (let n = 0; n < e.length && !$(t.startRow, t.startCol, e[n].startRow, e[n].startCol); n++) r = n;
	if (r < 0) return 0;
	let i = e[r], a = $(i.startRow, i.startCol, t.startRow, t.startCol);
	return n === "previous" && a && r < e.length - 1 ? r + 1 : r;
}
function Ft(e, t, n) {
	let r, i = n.regex ? t : t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	if (n.regex || !n.caseSensitive) try {
		r = new RegExp(i, n.caseSensitive ? "g" : "gi");
	} catch {
		return [];
	}
	let a = e.getScrollbackLength() + e.rows, o = e.cols, s = (t) => ({
		y: t,
		line: new X(e.getScreenLine(t) ?? [], e.isScreenRowWrapped(t), o)
	}), c = [], l = 0;
	for (; l < a;) {
		let i = [s(l++)];
		for (; l < a && e.isScreenRowWrapped(l);) i.push(s(l++));
		let { text: o, startCell: u, endCell: d } = mt(i, !0);
		if (o) for (let e = 0; e < o.length;) {
			let i, a;
			if (r) {
				r.lastIndex = e;
				let t = r.exec(o);
				if (!t) break;
				if (i = t.index, a = t[0].length, a === 0) {
					e = i + 1;
					continue;
				}
			} else {
				if (i = o.indexOf(t, e), i < 0) break;
				a = t.length;
			}
			if (e = i + 1, n.wholeWord && !It(o, i, a)) continue;
			let s = u[i], l = d[i + a - 1];
			c.push({
				startRow: s.y,
				startCol: s.x,
				endRow: l.y,
				endCol: l.x,
				rectangle: !1
			});
		}
	}
	return c;
}
function It(e, t, n) {
	let r = (t) => t < 0 || t >= e.length || jt.includes(e[t]);
	return r(t - 1) && r(t + n);
}
// lib/addons/serialize.ts
var Lt = /\x1b\[\?(?:47|1047|1049)h/g, Rt = w.ALL & ~w.PALETTE, zt = w.MODES | w.KEYBOARD | w.KITTY_KEYBOARD, Bt = class {
	activate(e) {
		this.terminal = e;
	}
	dispose() {
		this.terminal = void 0;
	}
	serialize(e = {}) {
		let t = this.terminal?.wasmTerm;
		if (!t) return "";
		let n = Rt;
		e.excludeModes && (n &= ~zt), e.includePalette && (n |= w.PALETTE);
		let r = (e) => typeof e == "object" ? e.isDisposed ? -1 : e.line : e, i = r(e.range?.start), a = r(e.range?.end);
		if (i === -1 || a === -1) return "";
		let o = t.formatScreen({
			format: "vt",
			screen: "primary",
			extras: n,
			scrollback: e.scrollback,
			fromRow: i,
			toRow: a
		});
		if (!t.isAlternateScreen()) return o;
		let s = o.replace(Lt, "");
		if (e.excludeAltBuffer) return s;
		let c = t.formatScreen({
			format: "vt",
			extras: n
		});
		return s + (e.excludeModes ? "\x1B[?1049h" : "") + c;
	}
	serializeAsHTML(e = {}) {
		let t = this.terminal?.wasmTerm;
		if (!t) return "";
		let n = t.formatScreen({
			format: "html",
			onlySelection: e.onlySelection,
			scrollback: e.scrollback
		});
		if (!e.includeGlobalBackground) return n;
		let { r, g: i, b: a } = t.getColors().background;
		return `<div style="background-color: rgb(${r}, ${i}, ${a})">${n}</div>`;
	}
};
export { bt as CanvasRenderer, c as CellFlags, o as DirtyState, Y as EventEmitter, At as FitAddon, w as FormatterExtras, we as Ghostty, U as GhosttyTerminal, $e as InputHandler, i as Key, r as KeyAction, Te as KeyEncoder, n as KeyEncoderOption, it as LinkDetector, a as Mods, I as MouseAction, F as MouseButton, pt as OSC8LinkProvider, Mt as SearchAddon, D as SelectionAutoscroll, St as SelectionManager, Bt as SerializeAddon, Et as Terminal, s as UnderlineStyle, ht as UrlRegexProvider, Re as init };
