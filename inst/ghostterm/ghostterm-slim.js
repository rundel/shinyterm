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
}, n = {
	SUCCESS: 0,
	OUT_OF_SPACE: -3
}, r = n.SUCCESS, i = n.OUT_OF_SPACE, a = {
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
}, o = {
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
}, s = {
	PRIMARY: 0,
	ALTERNATE: 1
}, c = {
	DIRTY: 3,
	ROW_ITERATOR: 4,
	CURSOR: 18,
	COLORS: 19
}, l = {
	DIRTY: 1,
	CELLS: 3,
	SELECTION: 4,
	CELLS_RAW: 5
}, u = {
	STYLE: 2,
	GRAPHEMES_LEN: 3,
	GRAPHEMES_BUF: 4
}, d = { WRAP_CONTINUATION: 2 }, f = {
	ACTIVE: 0,
	VIEWPORT: 1,
	SCREEN: 2,
	HISTORY: 3
}, p = { FORWARD: 0 }, m = /* @__PURE__ */ "default.context-menu.help.pointer.progress.wait.cell.crosshair.text.vertical-text.alias.copy.move.no-drop.not-allowed.grab.grabbing.all-scroll.col-resize.row-resize.n-resize.e-resize.s-resize.w-resize.ne-resize.nw-resize.se-resize.sw-resize.ew-resize.ns-resize.nesw-resize.nwse-resize.zoom-in.zoom-out".split("."), h = {
	EMIT: 1,
	UNWRAP: 2,
	TRIM: 3,
	SELECTION: 4,
	EXTRAS: 5
}, g = {
	PLAIN: 0,
	VT: 1,
	HTML: 2
}, _ = /* @__PURE__ */ function(e) {
	return e[e.NONE = 0] = "NONE", e[e.PALETTE = 1] = "PALETTE", e[e.MODES = 2] = "MODES", e[e.SCROLLING_REGION = 4] = "SCROLLING_REGION", e[e.TABSTOPS = 8] = "TABSTOPS", e[e.PWD = 16] = "PWD", e[e.KEYBOARD = 32] = "KEYBOARD", e[e.CURSOR = 64] = "CURSOR", e[e.STYLE = 128] = "STYLE", e[e.HYPERLINK = 256] = "HYPERLINK", e[e.PROTECTION = 512] = "PROTECTION", e[e.KITTY_KEYBOARD = 1024] = "KITTY_KEYBOARD", e[e.CHARSETS = 2048] = "CHARSETS", e[e.ALL = 4095] = "ALL", e;
}({}), v = {
	PRESS: 0,
	RELEASE: 1,
	DRAG: 2,
	AUTOSCROLL_TICK: 3
}, y = {
	REF: 1,
	POSITION: 2,
	REPEAT_DISTANCE: 3,
	TIME_NS: 4,
	REPEAT_INTERVAL_NS: 5,
	RECTANGLE: 8,
	GEOMETRY: 9,
	VIEWPORT: 10
}, b = { AUTOSCROLL: 3 }, x = /* @__PURE__ */ function(e) {
	return e[e.NONE = 0] = "NONE", e[e.UP = 1] = "UP", e[e.DOWN = 2] = "DOWN", e;
}({}), S = {
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
}, C = [
	"standard",
	"selection",
	"primary"
], w = {
	SUCCESS: 0,
	DENIED: 1
}, ee = {
	CLIPBOARD: 0,
	TEXT: 1
}, te = {
	GAINED: 0,
	LOST: 1
}, ne = {
	LIGHT: 0,
	DARK: 1
}, re = [
	"remove",
	"set",
	"error",
	"indeterminate",
	"pause"
], ie = [
	"idle",
	"working",
	"done",
	"blocked",
	"error",
	"clear"
], ae = [
	"none",
	"permission",
	"question",
	"auth"
], oe = [
	null,
	"prompt-start",
	"input-start",
	"output-start",
	"command-end"
], se = [
	"primary",
	"right",
	"continuation",
	"secondary"
], ce = 1e3, T = {
	BOTTOM: 1,
	DELTA: 2,
	ROW: 3,
	DELTA_PROMPT: 4
}, le = {
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
}, E = 4294967295, D = {
	CODEPOINT: 0,
	CODEPOINT_GRAPHEME: 1,
	BG_COLOR_PALETTE: 2,
	BG_COLOR_RGB: 3
}, O = {
	NARROW: 0,
	WIDE: 1
}, ue = {
	NONE: 0,
	PALETTE: 1,
	RGB: 2
}, k = {
	BAR: 0,
	BLOCK: 1,
	UNDERLINE: 2,
	BLOCK_HOLLOW: 3
}, de = 2027, fe = /* @__PURE__ */ new Set([
	7,
	27,
	24,
	26
]);
function pe(e, t) {
	return e & 32767 | (t ? 32768 : 0);
}
// lib/bridge/key-encoder.ts
var me = class {
	constructor(e, t, n) {
		this.encoder = 0, this.exports = e, this.mem = t, this.L = n;
		let i = this.exports.ghostty_wasm_alloc_opaque(), a = this.exports.ghostty_key_encoder_new(0, i);
		if (this.encoder = this.exports.ghostty_wasm_take_opaque(i), this.exports.ghostty_wasm_free_opaque(i), a !== r) throw Error(`Failed to create key encoder: ${a}`);
	}
	setOption(e, t) {
		let n = this.exports.ghostty_wasm_alloc(4);
		this.mem.view().setUint32(n, typeof t == "boolean" ? +!!t : t, !0), this.exports.ghostty_key_encoder_set(this.encoder, e, n), this.exports.ghostty_wasm_free(n, 4);
	}
	syncFromTerminal(e) {
		this.exports.ghostty_key_encoder_set_from_terminal(this.encoder, e.handle);
	}
	encode(e) {
		let t = this.exports, n = t.ghostty_wasm_alloc_opaque(), i = t.ghostty_key_event_new(0, n), a = t.ghostty_wasm_take_opaque(n);
		if (t.ghostty_wasm_free_opaque(n), i !== r) throw Error(`Failed to create key event: ${i}`);
		let o = 0, s = 0, c = 0, l = t.ghostty_wasm_alloc(128), u = t.ghostty_wasm_alloc(4);
		try {
			if (t.ghostty_key_event_set_action(a, e.action), t.ghostty_key_event_set_key(a, e.key), t.ghostty_key_event_set_mods(a, e.mods), e.consumedMods !== void 0 && t.ghostty_key_event_set_consumed_mods(a, e.consumedMods), e.composing !== void 0 && t.ghostty_key_event_set_composing(a, e.composing), e.unshiftedCodepoint !== void 0 && t.ghostty_key_event_set_unshifted_codepoint(a, e.unshiftedCodepoint), e.utf8) {
				let n = new TextEncoder().encode(e.utf8);
				s = n.length, o = t.ghostty_wasm_alloc(s), c = t.ghostty_wasm_alloc(this.L.string.size), this.mem.bytes().set(n, o);
				let r = this.mem.view();
				r.setUint32(c + this.L.string.ptr, o, !0), r.setUint32(c + this.L.string.len, s, !0), t.ghostty_key_event_set_utf8(a, c);
			}
			let n = t.ghostty_key_encoder_encode(this.encoder, a, l, 128, u);
			if (n !== r) throw Error(`Failed to encode key: ${n}`);
			let i = this.mem.view().getUint32(u, !0);
			return this.mem.bytes().slice(l, l + i);
		} finally {
			t.ghostty_wasm_free(l, 128), t.ghostty_wasm_free(u, 4), c && t.ghostty_wasm_free(c, this.L.string.size), o && t.ghostty_wasm_free(o, s), t.ghostty_key_event_free(a);
		}
	}
	dispose() {
		this.encoder &&= (this.exports.ghostty_key_encoder_free(this.encoder), 0);
	}
};
// lib/bridge/layout.ts
function he(e) {
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
			size: e.size("GhosttyCellsView"),
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
			size: e.size("GhosttySelectionGestureGeometry"),
			columns: e.offset("GhosttySelectionGestureGeometry", "columns"),
			cellWidth: e.offset("GhosttySelectionGestureGeometry", "cell_width"),
			paddingLeft: e.offset("GhosttySelectionGestureGeometry", "padding_left"),
			screenHeight: e.offset("GhosttySelectionGestureGeometry", "screen_height")
		},
		surface: {
			size: e.size("GhosttySurfacePosition"),
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
			size: e.size("GhosttyMousePosition"),
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
			size: e.size("GhosttyCodepointBuffer"),
			ptr: e.offset("GhosttyCodepointBuffer", "ptr"),
			cap: e.offset("GhosttyCodepointBuffer", "cap"),
			len: e.offset("GhosttyCodepointBuffer", "len")
		}
	};
}
// lib/bridge/memory.ts
var ge = class {
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
}, A = class {
	constructor(e, t) {
		this.exports = e;
		let n = {}, r = 0;
		for (let e of Object.keys(t)) n[e] = r, r += t[e] + 7 & -8;
		if (this.offsets = n, this.sizes = { ...t }, this.size = r, this.base = e.ghostty_wasm_alloc(r), !this.base) throw Error("libghostty-vt: failed to allocate scratch memory");
	}
	at(e) {
		return this.base + this.offsets[e];
	}
	sizeOf(e) {
		return this.sizes[e];
	}
	zero(e, t) {
		let n = this.at(e);
		return t.fill(0, n, n + this.sizes[e]), n;
	}
	free() {
		this.base && this.exports.ghostty_wasm_free(this.base, this.size), this.base = 0;
	}
};
function j(e, t, n = !1) {
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
// lib/bridge/mouse-encoder.ts
var M = /* @__PURE__ */ function(e) {
	return e[e.LEFT = 1] = "LEFT", e[e.RIGHT = 2] = "RIGHT", e[e.MIDDLE = 3] = "MIDDLE", e[e.WHEEL_UP = 4] = "WHEEL_UP", e[e.WHEEL_DOWN = 5] = "WHEEL_DOWN", e[e.WHEEL_LEFT = 6] = "WHEEL_LEFT", e[e.WHEEL_RIGHT = 7] = "WHEEL_RIGHT", e;
}({}), N = /* @__PURE__ */ function(e) {
	return e[e.PRESS = 0] = "PRESS", e[e.RELEASE = 1] = "RELEASE", e[e.MOTION = 2] = "MOTION", e;
}({}), P = {
	SIZE: 3,
	ANY_BUTTON_PRESSED: 4,
	TRACK_LAST_CELL: 5
}, _e = class {
	constructor(e, t, n) {
		this.encoder = 0, this.event = 0, this.exports = e, this.mem = t, this.L = n;
		let i = e, a = i.ghostty_wasm_alloc_opaque();
		try {
			if (i.ghostty_mouse_encoder_new(0, a) !== r) throw Error("libghostty-vt: failed to create mouse encoder");
			if (this.encoder = i.ghostty_wasm_take_opaque(a), i.ghostty_mouse_event_new(0, a) !== r) throw Error("libghostty-vt: failed to create mouse event");
			this.event = i.ghostty_wasm_take_opaque(a);
		} finally {
			i.ghostty_wasm_free_opaque(a);
		}
		this.scratch = new A(i, {
			flag: 4,
			size: n.mouseSize.size,
			position: n.mousePosition.size,
			written: 4,
			out: 128
		});
		let o = this.scratch.at("flag");
		this.mem.view().setUint8(o, 1), i.ghostty_mouse_encoder_set(this.encoder, P.TRACK_LAST_CELL, o);
	}
	syncFromTerminal(e) {
		this.exports.ghostty_mouse_encoder_set_from_terminal(this.encoder, e.handle);
	}
	setGeometry(e) {
		let t = this.scratch.zero("size", this.mem.bytes()), n = this.L.mouseSize, r = this.mem.view(), i = (e, n) => r.setUint32(t + e, n, !0);
		i(0, n.size), i(n.screenWidth, Math.max(1, Math.round(e.screenWidth))), i(n.screenHeight, Math.max(1, Math.round(e.screenHeight))), i(n.cellWidth, Math.max(1, Math.round(e.cellWidth))), i(n.cellHeight, Math.max(1, Math.round(e.cellHeight))), this.exports.ghostty_mouse_encoder_set(this.encoder, P.SIZE, t);
	}
	setAnyButtonPressed(e) {
		let t = this.scratch.at("flag");
		this.mem.view().setUint8(t, +!!e), this.exports.ghostty_mouse_encoder_set(this.encoder, P.ANY_BUTTON_PRESSED, t);
	}
	reset() {
		this.exports.ghostty_mouse_encoder_reset(this.encoder);
	}
	encode(e, t, n, i, a) {
		let o = this.exports, s = this.event;
		o.ghostty_mouse_event_set_action(s, e), t === null ? o.ghostty_mouse_event_clear_button(s) : o.ghostty_mouse_event_set_button(s, t), o.ghostty_mouse_event_set_mods(s, n);
		let c = this.scratch.at("position"), l = this.mem.view();
		l.setFloat32(c + this.L.mousePosition.x, i, !0), l.setFloat32(c + this.L.mousePosition.y, a, !0), o.ghostty_mouse_event_set_position(s, c);
		let u = this.scratch.at("out"), d = this.scratch.at("written");
		if (o.ghostty_mouse_encoder_encode(this.encoder, s, u, 128, d) !== r) return "";
		let f = this.mem.view().getUint32(d, !0), p = this.mem.bytes().slice(u, u + f);
		try {
			return new TextDecoder("utf-8", { fatal: !0 }).decode(p);
		} catch {
			return String.fromCharCode(...p);
		}
	}
	dispose() {
		let e = this.exports;
		this.event && e.ghostty_mouse_event_free(this.event), this.encoder && e.ghostty_mouse_encoder_free(this.encoder), this.scratch.free(), this.event = this.encoder = 0;
	}
}, ve = /* @__PURE__ */ function(e) {
	return e[e.CURSOR_KEY_APPLICATION = 1] = "CURSOR_KEY_APPLICATION", e[e.KEYPAD_KEY_APPLICATION = 2] = "KEYPAD_KEY_APPLICATION", e[e.IGNORE_KEYPAD_WITH_NUMLOCK = 3] = "IGNORE_KEYPAD_WITH_NUMLOCK", e[e.ALT_ESC_PREFIX = 4] = "ALT_ESC_PREFIX", e[e.MODIFY_OTHER_KEYS_STATE_2 = 5] = "MODIFY_OTHER_KEYS_STATE_2", e[e.KITTY_KEYBOARD_FLAGS = 6] = "KITTY_KEYBOARD_FLAGS", e[e.MACOS_OPTION_AS_ALT = 7] = "MACOS_OPTION_AS_ALT", e[e.BACKARROW_KEY_MODE = 8] = "BACKARROW_KEY_MODE", e;
}({}), F = /* @__PURE__ */ function(e) {
	return e[e.RELEASE = 0] = "RELEASE", e[e.PRESS = 1] = "PRESS", e[e.REPEAT = 2] = "REPEAT", e;
}({}), I = /* @__PURE__ */ function(e) {
	return e[e.UNIDENTIFIED = 0] = "UNIDENTIFIED", e[e.GRAVE = 1] = "GRAVE", e[e.BACKSLASH = 2] = "BACKSLASH", e[e.BRACKET_LEFT = 3] = "BRACKET_LEFT", e[e.BRACKET_RIGHT = 4] = "BRACKET_RIGHT", e[e.COMMA = 5] = "COMMA", e[e.ZERO = 6] = "ZERO", e[e.ONE = 7] = "ONE", e[e.TWO = 8] = "TWO", e[e.THREE = 9] = "THREE", e[e.FOUR = 10] = "FOUR", e[e.FIVE = 11] = "FIVE", e[e.SIX = 12] = "SIX", e[e.SEVEN = 13] = "SEVEN", e[e.EIGHT = 14] = "EIGHT", e[e.NINE = 15] = "NINE", e[e.EQUAL = 16] = "EQUAL", e[e.INTL_BACKSLASH = 17] = "INTL_BACKSLASH", e[e.INTL_RO = 18] = "INTL_RO", e[e.INTL_YEN = 19] = "INTL_YEN", e[e.A = 20] = "A", e[e.B = 21] = "B", e[e.C = 22] = "C", e[e.D = 23] = "D", e[e.E = 24] = "E", e[e.F = 25] = "F", e[e.G = 26] = "G", e[e.H = 27] = "H", e[e.I = 28] = "I", e[e.J = 29] = "J", e[e.K = 30] = "K", e[e.L = 31] = "L", e[e.M = 32] = "M", e[e.N = 33] = "N", e[e.O = 34] = "O", e[e.P = 35] = "P", e[e.Q = 36] = "Q", e[e.R = 37] = "R", e[e.S = 38] = "S", e[e.T = 39] = "T", e[e.U = 40] = "U", e[e.V = 41] = "V", e[e.W = 42] = "W", e[e.X = 43] = "X", e[e.Y = 44] = "Y", e[e.Z = 45] = "Z", e[e.MINUS = 46] = "MINUS", e[e.PERIOD = 47] = "PERIOD", e[e.QUOTE = 48] = "QUOTE", e[e.SEMICOLON = 49] = "SEMICOLON", e[e.SLASH = 50] = "SLASH", e[e.ALT_LEFT = 51] = "ALT_LEFT", e[e.ALT_RIGHT = 52] = "ALT_RIGHT", e[e.BACKSPACE = 53] = "BACKSPACE", e[e.CAPS_LOCK = 54] = "CAPS_LOCK", e[e.CONTEXT_MENU = 55] = "CONTEXT_MENU", e[e.CONTROL_LEFT = 56] = "CONTROL_LEFT", e[e.CONTROL_RIGHT = 57] = "CONTROL_RIGHT", e[e.ENTER = 58] = "ENTER", e[e.META_LEFT = 59] = "META_LEFT", e[e.META_RIGHT = 60] = "META_RIGHT", e[e.SHIFT_LEFT = 61] = "SHIFT_LEFT", e[e.SHIFT_RIGHT = 62] = "SHIFT_RIGHT", e[e.SPACE = 63] = "SPACE", e[e.TAB = 64] = "TAB", e[e.CONVERT = 65] = "CONVERT", e[e.KANA_MODE = 66] = "KANA_MODE", e[e.NON_CONVERT = 67] = "NON_CONVERT", e[e.DELETE = 68] = "DELETE", e[e.END = 69] = "END", e[e.HELP = 70] = "HELP", e[e.HOME = 71] = "HOME", e[e.INSERT = 72] = "INSERT", e[e.PAGE_DOWN = 73] = "PAGE_DOWN", e[e.PAGE_UP = 74] = "PAGE_UP", e[e.DOWN = 75] = "DOWN", e[e.LEFT = 76] = "LEFT", e[e.RIGHT = 77] = "RIGHT", e[e.UP = 78] = "UP", e[e.NUM_LOCK = 79] = "NUM_LOCK", e[e.KP_0 = 80] = "KP_0", e[e.KP_1 = 81] = "KP_1", e[e.KP_2 = 82] = "KP_2", e[e.KP_3 = 83] = "KP_3", e[e.KP_4 = 84] = "KP_4", e[e.KP_5 = 85] = "KP_5", e[e.KP_6 = 86] = "KP_6", e[e.KP_7 = 87] = "KP_7", e[e.KP_8 = 88] = "KP_8", e[e.KP_9 = 89] = "KP_9", e[e.KP_PLUS = 90] = "KP_PLUS", e[e.KP_BACKSPACE = 91] = "KP_BACKSPACE", e[e.KP_CLEAR = 92] = "KP_CLEAR", e[e.KP_CLEAR_ENTRY = 93] = "KP_CLEAR_ENTRY", e[e.KP_COMMA = 94] = "KP_COMMA", e[e.KP_PERIOD = 95] = "KP_PERIOD", e[e.KP_DIVIDE = 96] = "KP_DIVIDE", e[e.KP_ENTER = 97] = "KP_ENTER", e[e.KP_EQUAL = 98] = "KP_EQUAL", e[e.KP_MEMORY_ADD = 99] = "KP_MEMORY_ADD", e[e.KP_MEMORY_CLEAR = 100] = "KP_MEMORY_CLEAR", e[e.KP_MEMORY_RECALL = 101] = "KP_MEMORY_RECALL", e[e.KP_MEMORY_STORE = 102] = "KP_MEMORY_STORE", e[e.KP_MEMORY_SUBTRACT = 103] = "KP_MEMORY_SUBTRACT", e[e.KP_MULTIPLY = 104] = "KP_MULTIPLY", e[e.KP_PAREN_LEFT = 105] = "KP_PAREN_LEFT", e[e.KP_PAREN_RIGHT = 106] = "KP_PAREN_RIGHT", e[e.KP_MINUS = 107] = "KP_MINUS", e[e.KP_SEPARATOR = 108] = "KP_SEPARATOR", e[e.NUMPAD_UP = 109] = "NUMPAD_UP", e[e.NUMPAD_DOWN = 110] = "NUMPAD_DOWN", e[e.NUMPAD_RIGHT = 111] = "NUMPAD_RIGHT", e[e.NUMPAD_LEFT = 112] = "NUMPAD_LEFT", e[e.NUMPAD_BEGIN = 113] = "NUMPAD_BEGIN", e[e.NUMPAD_HOME = 114] = "NUMPAD_HOME", e[e.NUMPAD_END = 115] = "NUMPAD_END", e[e.NUMPAD_INSERT = 116] = "NUMPAD_INSERT", e[e.NUMPAD_DELETE = 117] = "NUMPAD_DELETE", e[e.NUMPAD_PAGE_UP = 118] = "NUMPAD_PAGE_UP", e[e.NUMPAD_PAGE_DOWN = 119] = "NUMPAD_PAGE_DOWN", e[e.ESCAPE = 120] = "ESCAPE", e[e.F1 = 121] = "F1", e[e.F2 = 122] = "F2", e[e.F3 = 123] = "F3", e[e.F4 = 124] = "F4", e[e.F5 = 125] = "F5", e[e.F6 = 126] = "F6", e[e.F7 = 127] = "F7", e[e.F8 = 128] = "F8", e[e.F9 = 129] = "F9", e[e.F10 = 130] = "F10", e[e.F11 = 131] = "F11", e[e.F12 = 132] = "F12", e[e.F13 = 133] = "F13", e[e.F14 = 134] = "F14", e[e.F15 = 135] = "F15", e[e.F16 = 136] = "F16", e[e.F17 = 137] = "F17", e[e.F18 = 138] = "F18", e[e.F19 = 139] = "F19", e[e.F20 = 140] = "F20", e[e.F21 = 141] = "F21", e[e.F22 = 142] = "F22", e[e.F23 = 143] = "F23", e[e.F24 = 144] = "F24", e[e.F25 = 145] = "F25", e[e.FN = 146] = "FN", e[e.FN_LOCK = 147] = "FN_LOCK", e[e.PRINT_SCREEN = 148] = "PRINT_SCREEN", e[e.SCROLL_LOCK = 149] = "SCROLL_LOCK", e[e.PAUSE = 150] = "PAUSE", e[e.BROWSER_BACK = 151] = "BROWSER_BACK", e[e.BROWSER_FAVORITES = 152] = "BROWSER_FAVORITES", e[e.BROWSER_FORWARD = 153] = "BROWSER_FORWARD", e[e.BROWSER_HOME = 154] = "BROWSER_HOME", e[e.BROWSER_REFRESH = 155] = "BROWSER_REFRESH", e[e.BROWSER_SEARCH = 156] = "BROWSER_SEARCH", e[e.BROWSER_STOP = 157] = "BROWSER_STOP", e[e.EJECT = 158] = "EJECT", e[e.LAUNCH_APP_1 = 159] = "LAUNCH_APP_1", e[e.LAUNCH_APP_2 = 160] = "LAUNCH_APP_2", e[e.LAUNCH_MAIL = 161] = "LAUNCH_MAIL", e[e.MEDIA_PLAY_PAUSE = 162] = "MEDIA_PLAY_PAUSE", e[e.MEDIA_SELECT = 163] = "MEDIA_SELECT", e[e.MEDIA_STOP = 164] = "MEDIA_STOP", e[e.MEDIA_TRACK_NEXT = 165] = "MEDIA_TRACK_NEXT", e[e.MEDIA_TRACK_PREVIOUS = 166] = "MEDIA_TRACK_PREVIOUS", e[e.POWER = 167] = "POWER", e[e.SLEEP = 168] = "SLEEP", e[e.AUDIO_VOLUME_DOWN = 169] = "AUDIO_VOLUME_DOWN", e[e.AUDIO_VOLUME_MUTE = 170] = "AUDIO_VOLUME_MUTE", e[e.AUDIO_VOLUME_UP = 171] = "AUDIO_VOLUME_UP", e[e.WAKE_UP = 172] = "WAKE_UP", e[e.COPY = 173] = "COPY", e[e.CUT = 174] = "CUT", e[e.PASTE = 175] = "PASTE", e;
}({}), L = /* @__PURE__ */ function(e) {
	return e[e.NONE = 0] = "NONE", e[e.SHIFT = 1] = "SHIFT", e[e.CTRL = 2] = "CTRL", e[e.ALT = 4] = "ALT", e[e.SUPER = 8] = "SUPER", e[e.CAPSLOCK = 16] = "CAPSLOCK", e[e.NUMLOCK = 32] = "NUMLOCK", e;
}({}), R = /* @__PURE__ */ function(e) {
	return e[e.NONE = 0] = "NONE", e[e.PARTIAL = 1] = "PARTIAL", e[e.FULL = 2] = "FULL", e;
}({}), z = /* @__PURE__ */ function(e) {
	return e[e.NONE = 0] = "NONE", e[e.SINGLE = 1] = "SINGLE", e[e.DOUBLE = 2] = "DOUBLE", e[e.CURLY = 3] = "CURLY", e[e.DOTTED = 4] = "DOTTED", e[e.DASHED = 5] = "DASHED", e;
}({}), B = /* @__PURE__ */ function(e) {
	return e[e.BOLD = 1] = "BOLD", e[e.ITALIC = 2] = "ITALIC", e[e.UNDERLINE = 4] = "UNDERLINE", e[e.STRIKETHROUGH = 8] = "STRIKETHROUGH", e[e.INVERSE = 16] = "INVERSE", e[e.INVISIBLE = 32] = "INVISIBLE", e[e.BLINK = 64] = "BLINK", e[e.FAINT = 128] = "FAINT", e;
}({}), V = { NEEDLE: 1 }, H = {
	STATUS: 1,
	TOTAL_MATCHES: 3,
	SELECTED_INDEX: 4,
	SELECTED_MATCH: 5,
	VIEWPORT_MATCHES: 7
}, ye = class {
	constructor(e, t, n, i) {
		this.exports = e, this.mem = t, this.L = n, this.term = i, this.search = 0, this.needle = "";
		let a = e, o = a.ghostty_wasm_alloc_opaque();
		try {
			if (a.ghostty_search_new(0, o, i.handle) !== r) throw Error("libghostty-vt: failed to create search");
			this.search = a.ghostty_wasm_take_opaque(o);
		} finally {
			a.ghostty_wasm_free_opaque(o);
		}
		this.scratch = new A(a, {
			needle: n.string.size,
			value: 8,
			selection: n.selection.size,
			matches: n.selectionBuffer.size
		});
	}
	setNeedle(e) {
		let t = this.exports;
		if (this.needle = e, !e) {
			t.ghostty_search_set(this.search, V.NEEDLE, 0);
			return;
		}
		let n = new TextEncoder().encode(e), r = t.ghostty_wasm_alloc(n.length);
		this.mem.bytes().set(n, r);
		let i = this.scratch.at("needle"), a = this.mem.view();
		a.setUint32(i, r, !0), a.setUint32(i + 4, n.length, !0), t.ghostty_search_set(this.search, V.NEEDLE, i), t.ghostty_wasm_free(r, n.length);
	}
	getNeedle() {
		return this.needle;
	}
	run() {
		this.needle && this.exports.ghostty_search_run(this.search);
	}
	next() {
		return this.needle ? (this.term.invalidate(), this.exports.ghostty_search_select_next(this.search) === r) : !1;
	}
	previous() {
		return this.needle ? (this.term.invalidate(), this.exports.ghostty_search_select_prev(this.search) === r) : !1;
	}
	getU32(e) {
		let t = this.scratch.at("value");
		return this.exports.ghostty_search_get(this.search, e, t) === r ? this.mem.view().getUint32(t, !0) : null;
	}
	get totalMatches() {
		return this.getU32(H.TOTAL_MATCHES) ?? 0;
	}
	get selectedIndex() {
		return this.getU32(H.SELECTED_INDEX) ?? -1;
	}
	selectedMatch() {
		let e = this.scratch.at("selection");
		return this.exports.ghostty_search_get(this.search, H.SELECTED_MATCH, e) === r ? this.term.selectionRangeAt(e) : null;
	}
	selectMatchAsSelection() {
		let e = this.scratch.at("selection");
		return this.exports.ghostty_search_get(this.search, H.SELECTED_MATCH, e) === r && this.term.installSelection(e);
	}
	viewportMatches() {
		let e = this.exports;
		if (!this.needle) return [];
		e.ghostty_search_feed(this.search);
		let t = this.L.selectionBuffer, n = this.L.selection.size, i = this.scratch.at("matches");
		this.mem.bytes().fill(0, i, i + t.size), e.ghostty_search_get(this.search, H.VIEWPORT_MATCHES, i);
		let a = this.mem.view().getUint32(i + t.len, !0);
		if (a === 0) return [];
		let o = a * n, s = e.ghostty_wasm_alloc(o);
		try {
			let o = this.mem.view();
			if (o.setUint32(i + t.ptr, s, !0), o.setUint32(i + t.cap, a, !0), e.ghostty_search_get(this.search, H.VIEWPORT_MATCHES, i) !== r) return [];
			let c = this.mem.view().getUint32(i + t.len, !0), l = [];
			for (let e = 0; e < Math.min(c, a); e++) {
				let t = this.term.selectionRangeAt(s + e * n);
				t && l.push(t);
			}
			return l;
		} finally {
			e.ghostty_wasm_free(s, o);
		}
	}
	dispose() {
		this.search && this.exports.ghostty_search_free(this.search), this.scratch.free(), this.search = 0;
	}
}, be = class {
	constructor(e, t, n, i) {
		this.exports = e, this.mem = t, this.L = n, this.term = i, this.gesture = 0, this.events = {};
		let a = this.exports, o = a.ghostty_wasm_alloc_opaque();
		try {
			if (a.ghostty_selection_gesture_new(0, o) !== r) throw Error("libghostty-vt: failed to create selection gesture");
			this.gesture = a.ghostty_wasm_take_opaque(o);
			for (let e of [
				v.PRESS,
				v.RELEASE,
				v.DRAG,
				v.AUTOSCROLL_TICK
			]) {
				if (a.ghostty_selection_gesture_event_new(0, o, e) !== r) throw Error("libghostty-vt: failed to create selection gesture event");
				this.events[e] = a.ghostty_wasm_take_opaque(o);
			}
		} finally {
			a.ghostty_wasm_free_opaque(o);
		}
		this.scratch = new A(a, {
			ref: n.gridRef,
			position: n.surface.size,
			geometry: n.geometry.size,
			time: 8,
			selection: n.selection.size,
			viewport: n.coordinate.size,
			autoscroll: 4,
			rectangle: 4,
			repeatInterval: 8,
			repeatDistance: 8
		}), this.setRepeat(500, 10);
	}
	setRepeat(e, t) {
		let n = this.exports, r = this.events[v.PRESS], i = this.scratch.at("repeatInterval"), a = this.scratch.at("repeatDistance");
		this.mem.view().setBigUint64(i, BigInt(Math.round(e * 1e6)), !0), n.ghostty_selection_gesture_event_set(r, y.REPEAT_INTERVAL_NS, i), this.mem.view().setFloat64(a, t, !0), n.ghostty_selection_gesture_event_set(r, y.REPEAT_DISTANCE, a);
	}
	setRef(e, t, n) {
		let r = this.scratch.at("ref");
		this.term.viewportRef(t, n, r) ? this.exports.ghostty_selection_gesture_event_set(e, y.REF, r) : this.exports.ghostty_selection_gesture_event_set(e, y.REF, 0);
	}
	setPosition(e, t, n) {
		let r = this.scratch.at("position"), i = this.mem.view();
		i.setFloat64(r + this.L.surface.x, t, !0), i.setFloat64(r + this.L.surface.y, n, !0), this.exports.ghostty_selection_gesture_event_set(e, y.POSITION, r);
	}
	setRectangle(e, t) {
		let n = this.scratch.at("rectangle");
		this.mem.view().setUint8(n, +!!t), this.exports.ghostty_selection_gesture_event_set(e, y.RECTANGLE, n);
	}
	setGeometry(e, t) {
		let n = this.scratch.at("geometry"), r = this.L.geometry, i = this.mem.view();
		i.setUint32(n + r.columns, Math.max(1, t.columns), !0), i.setUint32(n + r.cellWidth, Math.max(1, Math.round(t.cellWidth)), !0), i.setUint32(n + r.paddingLeft, 0, !0), i.setUint32(n + r.screenHeight, Math.max(1, Math.round(t.screenHeight)), !0), this.exports.ghostty_selection_gesture_event_set(e, y.GEOMETRY, n);
	}
	apply(e, t) {
		let n = this.scratch.at("selection"), i = this.exports.ghostty_selection_gesture_event(this.gesture, this.term.handle, e, n);
		return this.term.invalidate(), i === r ? (this.term.installSelection(n), !0) : (t && this.term.clearSelection(), !1);
	}
	press(e, t, n, r, i) {
		let a = this.events[v.PRESS];
		this.setRef(a, e, t), this.setPosition(a, n, r);
		let o = this.scratch.at("time");
		return this.mem.view().setBigUint64(o, BigInt(Math.max(0, Math.round(i * 1e6))), !0), this.exports.ghostty_selection_gesture_event_set(a, y.TIME_NS, o), this.apply(a, !0);
	}
	drag(e, t, n, r, i, a = !1) {
		let o = this.events[v.DRAG];
		return this.setRef(o, e, t), this.setPosition(o, n, r), this.setGeometry(o, i), this.setRectangle(o, a), this.apply(o, !0);
	}
	release() {
		this.apply(this.events[v.RELEASE], !1);
	}
	autoscrollTick(e, t, n, r, i, a = !1) {
		let o = this.exports, s = this.events[v.AUTOSCROLL_TICK];
		this.setRectangle(s, a);
		let c = this.scratch.zero("viewport", this.mem.bytes()), l = this.mem.view();
		return l.setUint16(c + this.L.coordinate.x, e, !0), l.setUint32(c + this.L.coordinate.y, t, !0), o.ghostty_selection_gesture_event_set(s, y.VIEWPORT, c), this.setPosition(s, n, r), this.setGeometry(s, i), this.apply(s, !1);
	}
	autoscroll() {
		let e = this.scratch.at("autoscroll");
		return this.mem.view().setUint32(e, 0, !0), this.exports.ghostty_selection_gesture_get(this.gesture, this.term.handle, b.AUTOSCROLL, e), this.mem.view().getUint32(e, !0);
	}
	reset() {
		this.exports.ghostty_selection_gesture_reset(this.gesture, this.term.handle);
	}
	dispose(e = !0) {
		let t = this.exports;
		if (this.gesture) {
			for (let e of Object.values(this.events)) t.ghostty_selection_gesture_event_free(e);
			this.events = {}, t.ghostty_selection_gesture_free(this.gesture, e ? this.term.handle : 0), this.gesture = 0, this.scratch.free();
		}
	}
}, U = 1024;
function xe(e) {
	return {
		value: Math.max(8, e.modeConfig.size),
		rgb: e.rgb.size,
		palette: 256 * e.rgb.size,
		terminfoString: e.string.size,
		terminfoName: 128,
		cursor: e.cursor.size,
		cursorX: 4,
		cursorY: 4,
		colors: e.colors.size,
		cellsView: e.cellsView.size,
		rowSelection: e.rowSelection.size,
		style: e.style.size,
		graphemeBuffer: e.codepointBuffer.size,
		graphemes: U,
		point: e.point.size,
		ref: e.gridRef,
		refOut: 8,
		rowFlag: 8,
		trackedRef: 4,
		scrollbar: e.scrollbar.size,
		scrollViewport: e.scrollViewport.size,
		selection: e.selection.size,
		orderedSelection: e.selection.size,
		selectionPoint: e.coordinate.size,
		newSelection: e.selection.size,
		clipboardReply: e.clipboardReply.size,
		focus: 16,
		focusWritten: 4,
		formatterOption: 4,
		formatterOutPtr: 4,
		formatterOutLen: 4,
		dataString: e.string.size,
		mouseShape: 4
	};
}
var Se = class {
	changed() {
		this.pendingUpdate = !0, this.onChange?.();
	}
	constructor(e, t, n, r = 80, i = 24, a) {
		this.renderState = 0, this.rowIterSlot = 0, this.rowCellsSlot = 0, this.onFree = null, this.freed = !1, this.dirty = R.FULL, this.cellPool = [], this.fgDefault = {
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
		let o = this.exports;
		this.scratch = new A(o, xe(n));
		let s = o.ghostty_wasm_alloc_opaque();
		try {
			this.check(o.ghostty_terminal_new(0, s, r, i), "create terminal"), this.handle = o.ghostty_wasm_take_opaque(s), this.check(o.ghostty_render_state_new(0, s), "create render state"), this.renderState = o.ghostty_wasm_take_opaque(s);
		} finally {
			o.ghostty_wasm_free_opaque(s);
		}
		this.rowIterSlot = o.ghostty_wasm_alloc_opaque(), this.check(o.ghostty_render_state_row_iterator_new(0, this.rowIterSlot), "create row iterator"), this.rowCellsSlot = o.ghostty_wasm_alloc_opaque(), this.check(o.ghostty_render_state_row_cells_new(0, this.rowCellsSlot), "create row cells"), this.setMode(de, !1, !0), this.applyConfig(a), this.rowDirty = new Uint8Array(i).fill(1), this.rowStale = new Uint8Array(i).fill(1), this.initCellPool();
	}
	get cols() {
		return this._cols;
	}
	get rows() {
		return this._rows;
	}
	check(e, t) {
		if (e !== r) throw Error(`libghostty-vt: failed to ${t} (${e})`);
	}
	setWritePty(e, t) {
		this.onFree = t, this.exports.ghostty_terminal_set(this.handle, a.WRITE_PTY, e);
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
		let t = this.scratch.at("dataString");
		return this.exports.ghostty_terminal_get(this.handle, e, t) === r ? this.readString(t) : "";
	}
	getTitle() {
		return this.readDataString(o.TITLE);
	}
	getMouseShape() {
		let e = this.scratch.at("mouseShape");
		return this.exports.ghostty_terminal_get(this.handle, o.MOUSE_SHAPE, e) === r ? m[this.mem.view().getUint32(e, !0)] ?? null : null;
	}
	getPwd() {
		return this.readDataString(o.PWD);
	}
	onEffect(e) {
		let t = this.effects;
		e === "bell" ? t.bell?.() : e === "title" ? t.titleChanged?.(this.getTitle()) : e === "pwd" ? t.pwdChanged?.(this.getPwd()) : t.reset?.();
	}
	onClipboardWrite(e) {
		let t = this.effects.clipboardWrite;
		if (!t || !this.ghostty) return;
		let n = this.L.clipboardWrite, r = this.L.clipboardContent, i = this.mem.view(), a = C[i.getUint32(e + n.location, !0)], o = i.getUint32(e + n.contents, !0), s = i.getUint32(e + n.contentsLen, !0), c = [];
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
		}), u = this.L.clipboardReply, d = this.scratch.zero("clipboardReply", this.mem.bytes()), f = this.mem.view();
		f.setUint32(d, u.size, !0), f.setUint32(d + u.result, l ? w.SUCCESS : w.DENIED, !0), f.setUint8(d + u.remember, 0);
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
			state: re[n.getUint32(e + t.state, !0)] ?? "remove",
			progress: r < 0 ? null : r
		});
	}
	onProgramStatus(e) {
		let t = this.L.programStatus, n = this.mem.view(), r = n.getInt8(e + t.progress);
		this.effects.programStatus?.({
			state: ie[n.getUint32(e + t.state, !0)] ?? "idle",
			kind: ae[n.getUint32(e + t.kind, !0)] ?? "none",
			progress: r < 0 ? null : r,
			id: this.readString(e + t.id),
			app: this.readString(e + t.app),
			title: this.readString(e + t.title),
			message: this.readString(e + t.message)
		});
	}
	onSemanticPrompt(e) {
		let t = this.L.semanticPrompt, n = this.mem.view(), r = oe[n.getUint32(e + t.kind, !0)];
		r && this.effects.semanticPrompt?.({
			kind: r,
			promptKind: se[n.getUint32(e + t.promptKind, !0)] ?? "primary",
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
		let n = t === "dark" ? ne.DARK : ne.LIGHT;
		return this.mem.view().setUint32(e, n, !0), 1;
	}
	onSizeQuery(e) {
		let t = this.effects.cellSize?.();
		if (!t) return 0;
		let n = this.L.sizeReport, r = this.mem.view();
		return r.setUint16(e + n.rows, this._rows, !0), r.setUint16(e + n.columns, this._cols, !0), r.setUint32(e + n.cellWidth, Math.max(1, Math.round(t.width)), !0), r.setUint32(e + n.cellHeight, Math.max(1, Math.round(t.height)), !0), 1;
	}
	onRenderHold(e) {
		e ? (this.holdStarted = null, this.update(), this.holdStarted = performance.now()) : (this.holdStarted = null, this.changed());
	}
	renderHoldRemaining() {
		return this.isRenderHeld() ? Math.max(0, ce - (performance.now() - (this.holdStarted ?? 0))) : null;
	}
	isRenderHeld() {
		return this.holdStarted === null ? !1 : performance.now() - this.holdStarted > 1e3 ? (this.holdStarted = null, !1) : !0;
	}
	encodePaste(e) {
		let t = this.ghostty;
		if (!t) return "";
		let n = this.exports, i = new TextEncoder().encode(e), a = new TextEncoder().encode("text/plain"), o = this.L.paste, s = this.L.string, c = this.L.mimeReader, l = (e) => e + 3 & -4, u = l(o.size), d = u + 4, f = d + l(s.size), p = f + a.length;
		return t.withPasteData(i, (e) => {
			let t = n.ghostty_wasm_alloc(p), i = t;
			this.mem.bytes().fill(0, t, t + p), this.mem.bytes().set(a, t + f);
			let l = this.mem.view();
			l.setUint32(t + d + s.ptr, t + f, !0), l.setUint32(t + d + s.len, a.length, !0), l.setUint32(i, o.size, !0), l.setUint32(i + o.location, C.indexOf("standard"), !0), l.setUint32(i + o.source, ee.CLIPBOARD, !0), l.setUint32(i + o.mimes, t + d, !0), l.setUint32(i + o.mimesLen, 1, !0), l.setUint32(i + o.reader + c.read, e, !0), l.setUint32(i + o.reader + c.userdata, 0, !0), l.setUint8(i + o.allowUnsafe, 1), this.capture = [];
			try {
				let e = n.ghostty_terminal_paste(this.handle, i, t + u), a = this.capture;
				if (e !== r) return "";
				let o = new Uint8Array(a.reduce((e, t) => e + t.length, 0)), s = 0;
				for (let e of a) o.set(e, s), s += e.length;
				return new TextDecoder().decode(o);
			} finally {
				this.capture = null, n.ghostty_wasm_free(t, p);
			}
		});
	}
	encodeFocus(e) {
		if (!this.getMode(1004, !1)) return "";
		let t = this.exports, n = this.scratch.at("focus"), i = this.scratch.at("focusWritten"), a = this.scratch.sizeOf("focus");
		if (t.ghostty_focus_encode(e ? te.GAINED : te.LOST, n, a, i) !== r) return "";
		let o = this.mem.view().getUint32(i, !0);
		return new TextDecoder().decode(this.mem.bytes().slice(n, n + o));
	}
	setMode(e, t, n, r = !1) {
		let i = this.scratch.at("value"), o = this.mem.view();
		o.setUint16(i, pe(e, t), !0), o.setUint8(i + this.L.modeConfig.value, +!!n), r || this.exports.ghostty_terminal_set(this.handle, a.MODE_DEFAULT, i), this.exports.ghostty_terminal_set(this.handle, a.MODE, i);
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
		let n = this.scratch.at("rgb");
		this.writeRgb(n, t), this.exports.ghostty_terminal_set(this.handle, e, n);
	}
	applyConfig(e) {
		this.setScrollbackLimit(e?.scrollbackLimit ?? 1e4), this.setTerminfoName(e?.terminfoName ?? "xterm-ghostty");
	}
	setTerminfoName(e) {
		let t = new TextEncoder().encode(e);
		if (t.length > 128) throw Error(`terminfo name too long: ${e}`);
		let n = this.scratch.at("terminfoString"), r = this.scratch.at("terminfoName");
		this.mem.bytes().set(t, r);
		let i = this.mem.view();
		i.setUint32(n + this.L.string.ptr, r, !0), i.setUint32(n + this.L.string.len, t.length, !0), this.exports.ghostty_terminal_set(this.handle, a.TERMINFO_NAME, n);
	}
	setScrollbackLimit(e) {
		let t = this.exports, n = Math.max(0, Math.floor(e)), r = this.scratch.at("value");
		this.mem.view().setUint32(r, n === 0 ? 0 : E, !0), t.ghostty_terminal_set(this.handle, a.SCROLLBACK_MAX_BYTES, r), this.mem.view().setUint32(r, Math.min(n, E), !0), t.ghostty_terminal_set(this.handle, a.SCROLLBACK_MAX_LINES, r), this.changed(), this.primary = null;
	}
	setColors(e) {
		let t = this.exports;
		if (this.setColor(a.COLOR_FOREGROUND, e.foreground ?? 16777215), this.setColor(a.COLOR_BACKGROUND, e.background ?? 0), ((e, n) => {
			n === void 0 ? t.ghostty_terminal_set(this.handle, e, 0) : this.setColor(e, n);
		})(a.COLOR_CURSOR, e.cursor), t.ghostty_terminal_set(this.handle, a.COLOR_PALETTE, 0), e.palette?.some((e) => e !== void 0)) {
			let n = this.scratch.at("palette");
			this.check(t.ghostty_terminal_get(this.handle, o.COLOR_PALETTE_DEFAULT, n), "read default palette"), e.palette.forEach((e, t) => {
				e !== void 0 && t < 256 && this.writeRgb(n + t * this.L.rgb.size, e);
			}), t.ghostty_terminal_set(this.handle, a.COLOR_PALETTE, n);
		}
		this.colorsFresh = !1, this.changed(), this.dirty = R.FULL, this.rowDirty?.fill(1), this.rowStale?.fill(1);
	}
	write(e) {
		let t = typeof e == "string" ? new TextEncoder().encode(e) : e;
		if (t.length === 0) return;
		let n = this.exports.ghostty_wasm_alloc(t.length);
		if (!n) throw Error("Failed to allocate write buffer (out of memory)");
		this.mem.bytes().set(t, n), this.exports.ghostty_terminal_vt_write(this.handle, n, t.length), this.changed(), this.primary = null, this.exports.ghostty_wasm_free(n, t.length);
	}
	get capturingOsc() {
		return this.oscCapture !== null;
	}
	writeCapturingOsc(e, t) {
		let n = typeof e == "string" ? new TextEncoder().encode(e) : e, i = n.length;
		if (i === 0) return;
		let a = this.exports, o = this.L.writeStop, s = a.ghostty_wasm_alloc(i + 1 + o.size);
		if (!s) throw Error("Failed to allocate write buffer (out of memory)");
		let c = s + i, l = c + 1;
		this.mem.bytes().set(n, s), this.mem.bytes()[c] = 24;
		try {
			let e = 0;
			for (; e < i;) {
				let u = this.oscCapture;
				if (u) {
					let r = e;
					for (; r < i && !fe.has(n[r]);) r++;
					for (let t = e; t < r; t++) n[t] < 32 || (u.bytes.length >= 1e7 ? u.overflow = !0 : u.bytes.push(n[t]));
					if (r > e && a.ghostty_terminal_vt_write(this.handle, s + e, r - e), e = r, r === i) break;
					this.oscCapture = null;
					let o = n[r];
					if (o === 24 || o === 26) continue;
					!u.overflow && t(Uint8Array.from(u.bytes)) && (a.ghostty_terminal_vt_write(this.handle, c, 1), o === 7 && e++);
					continue;
				}
				let d = this.mem.view();
				for (let e = 0; e < o.size; e += 4) d.setUint32(l + e, 0, !0);
				d.setUint32(l, o.size, !0);
				let f = a.ghostty_terminal_vt_write_until(this.handle, s + e, i - e, 32, l), p = this.mem.view(), m = p.getUint32(l + o.consumed, !0);
				if (e += m, f !== r || m === 0) break;
				p.getUint32(l + o.reached, !0) & 32 && (this.oscCapture = {
					bytes: [],
					overflow: !1
				});
			}
		} finally {
			a.ghostty_wasm_free(s, i + 1 + o.size), this.changed();
		}
	}
	setDefaultCursor(e, t) {
		let n = this.scratch.at("value"), r = e === "bar" ? k.BAR : e === "underline" ? k.UNDERLINE : k.BLOCK;
		this.mem.view().setUint32(n, r, !0), this.exports.ghostty_terminal_set(this.handle, a.DEFAULT_CURSOR_STYLE, n), this.mem.view().setUint8(n, +!!t), this.exports.ghostty_terminal_set(this.handle, a.DEFAULT_CURSOR_BLINK, n), this.changed();
	}
	setCellPixelSize(e, t) {
		let n = Math.round(e), r = Math.round(t);
		(n !== this.cellPx.width || r !== this.cellPx.height) && (this.cellPx = {
			width: n,
			height: r
		}, this.exports.ghostty_terminal_resize(this.handle, this._cols, this._rows, n, r));
	}
	resize(e, t) {
		(e !== this._cols || t !== this._rows) && (this._cols = e, this._rows = t, this.exports.ghostty_terminal_resize(this.handle, e, t, this.cellPx.width, this.cellPx.height), this.changed(), this.primary = null, this.atBottom = this.getViewportOffset() === 0, this.rowDirty = new Uint8Array(t).fill(1), this.rowStale = new Uint8Array(t).fill(1), this.dirty = R.FULL, this.initCellPool());
	}
	free() {
		if (this.freed) return;
		this.freed = !0;
		let e = this.exports;
		this.onFree?.(), this.onFree = null, this.rowCellsSlot &&= (e.ghostty_render_state_row_cells_free(this.mem.view().getUint32(this.rowCellsSlot, !0)), e.ghostty_wasm_free_opaque(this.rowCellsSlot), 0), this.rowIterSlot &&= (e.ghostty_render_state_row_iterator_free(this.mem.view().getUint32(this.rowIterSlot, !0)), e.ghostty_wasm_free_opaque(this.rowIterSlot), 0), this.renderState &&= (e.ghostty_render_state_free(this.renderState), 0), e.ghostty_terminal_free(this.handle), this.answerbackBuf &&= (e.ghostty_wasm_free(this.answerbackBuf, this.answerbackSize), 0), this.scratch.free();
	}
	update() {
		let e = this.exports;
		if (this.isRenderHeld()) return this.dirty;
		e.ghostty_render_state_update(this.renderState, this.handle), this.colorsFresh = !1, this.pendingUpdate = !1;
		let t = this.scratch.at("value");
		e.ghostty_render_state_get(this.renderState, c.DIRTY, t);
		let n = this.mem.view().getInt32(t, !0);
		if (n === R.NONE) return this.dirty;
		if (n > this.dirty && (this.dirty = n), n === R.FULL) return this.rowDirty.fill(1), this.rowStale.fill(1), this.dirty;
		let r = this.rowIterator(), i = this.scratch.at("value");
		for (; e.ghostty_render_state_row_iterator_next_dirty(r, i);) {
			let e = this.mem.view().getUint16(i, !0);
			e < this._rows && (this.rowDirty[e] = 1, this.rowStale[e] = 1);
		}
		return this.dirty;
	}
	rowIterator() {
		return this.exports.ghostty_render_state_get(this.renderState, c.ROW_ITERATOR, this.rowIterSlot), this.mem.view().getUint32(this.rowIterSlot, !0);
	}
	getCursor() {
		this.pendingUpdate && this.update();
		let e = this.scratch.at("cursor"), t = this.scratch.at("cursorX"), n = this.scratch.at("cursorY"), r = this.L.cursor;
		this.mem.view().setUint32(e, r.size, !0), this.exports.ghostty_render_state_get(this.renderState, c.CURSOR, e), this.exports.ghostty_terminal_get(this.handle, o.CURSOR_X, t), this.exports.ghostty_terminal_get(this.handle, o.CURSOR_Y, n);
		let i = this.mem.view(), a = i.getUint16(t, !0), s = i.getUint16(n, !0), l = i.getUint8(e + r.hasValue) !== 0, u = i.getInt32(e + r.style, !0);
		return {
			x: a,
			y: s,
			viewportX: l ? i.getUint16(e + r.x, !0) : -1,
			viewportY: l ? i.getUint16(e + r.y, !0) : -1,
			visible: i.getUint8(e + r.visible) !== 0,
			blinking: i.getUint8(e + r.blinking) !== 0,
			style: u === k.BAR ? "bar" : u === k.UNDERLINE ? "underline" : "block"
		};
	}
	loadColors(e = !1) {
		if (this.colorsFresh && !e) return;
		let t = this.scratch.at("colors"), n = this.L.colors;
		this.mem.view().setUint32(t, n.size, !0), this.exports.ghostty_render_state_get(this.renderState, c.COLORS, t), this.bgDefault = this.readRgb(t + n.bg), this.fgDefault = this.readRgb(t + n.fg);
		let r = t + n.palette;
		this.palette.set(this.mem.bytes().subarray(r, r + this.palette.length)), this.colorsFresh = !0;
	}
	getColors() {
		this.pendingUpdate && this.update(), this.loadColors(!0);
		let e = this.scratch.at("colors"), t = this.L.colors, n = this.mem.bytes()[e + t.hasCursor] !== 0;
		return {
			background: { ...this.bgDefault },
			foreground: { ...this.fgDefault },
			cursor: n ? this.readRgb(e + t.cursor) : null
		};
	}
	isRowDirty(e) {
		return this.dirty === R.FULL || this.rowDirty[e] === 1;
	}
	markClean() {
		this.exports.ghostty_render_state_clean(this.renderState), this.dirty = R.NONE, this.rowDirty.fill(0);
	}
	reset() {
		this.exports.ghostty_terminal_reset(this.handle), this.primary = null, this.oscCapture = null, this.holdStarted = null, this.responses = [], this.atBottom = !0, this.colorsFresh = !1, this.changed(), this.dirty = R.FULL, this.rowDirty.fill(1), this.rowStale.fill(1);
	}
	getViewport() {
		if (this.pendingUpdate && this.update(), !this.rowStale.includes(1)) return this.cellPool;
		this.loadColors();
		let e = this.exports, t = this.rowIterator(), n = this.scratch.at("cellsView"), i = () => this.mem.view().getUint32(this.rowCellsSlot, !0), a = 0;
		for (; a < this._rows && e.ghostty_render_state_row_iterator_next(t);) {
			if (this.rowStale[a]) {
				if (e.ghostty_render_state_row_get(t, l.CELLS_RAW, n) === r) {
					let o = !1, s = () => (o ||= (e.ghostty_render_state_row_get(t, l.CELLS, this.rowCellsSlot), !0), i()), c = this.L.rowSelection, u = this.scratch.at("rowSelection");
					this.mem.view().setUint32(u, c.size, !0);
					let d = e.ghostty_render_state_row_get(t, l.SELECTION, u) === r ? [this.mem.view().getUint16(u + c.startX, !0), this.mem.view().getUint16(u + c.endX, !0)] : null;
					this.readRow(a, n, s, d);
				}
				this.rowStale[a] = 0;
			}
			a++;
		}
		return this.cellPool;
	}
	readRow(t, n, r, i) {
		let a = this.exports, o = this.L, s = this.mem.view(), c = s.getUint32(n + o.cellsView.ptr, !0), l = Math.min(s.getUint32(n + o.cellsView.len, !0), this._cols), d = t * this._cols, p = this.scratch.at("style"), m = o.cellSize, h = this.mem.bytes().slice(c, c + l * m), g = new DataView(h.buffer);
		for (let n = 0; n < this._cols; n++) {
			let s = this.cellPool[d + n];
			if (n >= l) {
				this.setBlank(s);
				continue;
			}
			let c = g.getUint32(n * m, !0), h = g.getUint32(n * m + 4, !0), _ = e(c, h, o.cell.styleId), v = e(c, h, o.cell.contentTag), y = 0, b, x = null;
			if (_ !== 0 || v === D.CODEPOINT_GRAPHEME) {
				let e = r();
				if (a.ghostty_render_state_row_cells_select(e, n), _ !== 0 && (a.ghostty_render_state_row_cells_get(e, u.STYLE, p), x = new DataView(this.mem.bytes().slice(p, p + o.style.size).buffer)), v === D.CODEPOINT_GRAPHEME) {
					let t = this.rowCellGrapheme(e);
					t.length > 0 && (b = String.fromCodePoint(...t), y = t.length - 1);
				}
			}
			this.decodeCell(s, c, h, x, y), s.chars = b, s.selected = i !== null && n >= i[0] && n <= i[1], s.hyperlink_id &&= this.linkId(this.hyperlinkAt(f.VIEWPORT, n, t));
		}
	}
	rowCellGrapheme(e) {
		let t = this.exports, n = this.L.codepointBuffer, a = this.scratch.at("graphemeBuffer"), o = (i, o) => {
			let s = this.mem.view();
			s.setUint32(a + n.ptr, i, !0), s.setUint32(a + n.cap, o, !0), s.setUint32(a + n.len, 0, !0);
			let c = t.ghostty_render_state_row_cells_get(e, u.GRAPHEMES_BUF, a);
			if (c !== r) return c;
			let l = this.mem.view().getUint32(a + n.len, !0);
			return Array.from(new Uint32Array(this.mem.bytes().slice(i, i + l * 4).buffer));
		}, s = o(this.scratch.at("graphemes"), U / 4);
		if (typeof s != "number") return s;
		if (s !== i || t.ghostty_render_state_row_cells_get(e, u.GRAPHEMES_LEN, a)) return [];
		let c = this.mem.view().getUint32(a, !0), l = t.ghostty_wasm_alloc(c * 4);
		try {
			let e = o(l, c);
			return typeof e == "number" ? [] : e;
		} finally {
			t.ghostty_wasm_free(l, c * 4);
		}
	}
	setBlank(e) {
		e.codepoint = 0, e.fg_r = this.fgDefault.r, e.fg_g = this.fgDefault.g, e.fg_b = this.fgDefault.b, e.bg_r = this.bgDefault.r, e.bg_g = this.bgDefault.g, e.bg_b = this.bgDefault.b, e.flags = 0, e.width = 1, e.hyperlink_id = 0, e.grapheme_len = 0, e.chars = void 0, e.underline_style = z.NONE, e.underline_color = void 0, e.overline = !1, e.selected = !1, e.bg_default = !0, e.fg_default = !0;
	}
	decodeCell(t, n, r, i, a) {
		let o = this.L, s = e(n, r, o.cell.contentTag);
		t.codepoint = s === D.CODEPOINT || s === D.CODEPOINT_GRAPHEME ? e(n, r, o.cell.codepoint) : 0;
		let c = this.fgDefault, l = this.bgDefault, u = !0, d = !0, f = 0, p = z.NONE, m, h = !1;
		if (i) {
			p = e(i.getUint16(o.style.flags, !0), 0, o.styleFlags.underline), h = e(i.getUint16(o.style.flags, !0), 0, o.styleFlags.overline) !== 0;
			let t = this.resolveStyleColor(i, o.style.underline);
			t && (m = t.r << 16 | t.g << 8 | t.b);
			let n = this.resolveStyleColor(i, o.style.fg);
			n && (c = n, d = !1);
			let r = this.resolveStyleColor(i, o.style.bg);
			r && (l = r, u = !1);
			let a = i.getUint16(o.style.flags, !0), s = o.styleFlags;
			e(a, 0, s.bold) && (f |= B.BOLD), e(a, 0, s.italic) && (f |= B.ITALIC), e(a, 0, s.underline) && (f |= B.UNDERLINE), e(a, 0, s.strikethrough) && (f |= B.STRIKETHROUGH), e(a, 0, s.inverse) && (f |= B.INVERSE), e(a, 0, s.invisible) && (f |= B.INVISIBLE), e(a, 0, s.blink) && (f |= B.BLINK), e(a, 0, s.faint) && (f |= B.FAINT);
		}
		s === D.BG_COLOR_PALETTE ? (l = this.paletteColor(e(n, r, o.cell.bgPalette)), u = !1) : s === D.BG_COLOR_RGB && (l = {
			r: e(n, r, o.cell.bgR),
			g: e(n, r, o.cell.bgG),
			b: e(n, r, o.cell.bgB)
		}, u = !1), t.fg_r = c.r, t.fg_g = c.g, t.fg_b = c.b, t.bg_r = l.r, t.bg_g = l.g, t.bg_b = l.b, t.bg_default = u, t.fg_default = d, t.flags = f;
		let g = e(n, r, o.cell.wide);
		t.width = g === O.NARROW ? 1 : g === O.WIDE ? 2 : 0, t.hyperlink_id = +!!e(n, r, o.cell.hyperlink), t.grapheme_len = a, t.underline_style = p, t.underline_color = m, t.overline = h;
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
		return r === ue.PALETTE ? this.paletteColor(e.getUint8(t + n.value)) : r === ue.RGB ? {
			r: e.getUint8(t + n.r),
			g: e.getUint8(t + n.g),
			b: e.getUint8(t + n.b)
		} : null;
	}
	getLine(e) {
		return e < 0 || e >= this._rows ? null : this.readGridLine(f.ACTIVE, e);
	}
	getViewportLine(e) {
		if (e < 0 || e >= this._rows) return null;
		let t = this.getViewport(), n = e * this._cols;
		return t.slice(n, n + this._cols).map((e) => ({ ...e }));
	}
	setViewportOffset(e) {
		let { total: t, offset: n, len: r } = this.scrollbar(), i = Math.max(0, t - r), a = Math.max(0, Math.min(i, Math.floor(e)));
		(a !== i - n || this.atBottom !== (a === 0)) && (a === 0 ? this.scrollViewport(T.BOTTOM, 0) : this.scrollViewport(T.ROW, i - a), this.atBottom = a === 0);
	}
	scrollbar() {
		let e = this.L.scrollbar, t = this.scratch.at("scrollbar");
		this.exports.ghostty_terminal_get(this.handle, o.SCROLLBAR, t);
		let n = this.mem.view();
		return {
			total: Number(n.getBigUint64(t + e.total, !0)),
			offset: Number(n.getBigUint64(t + e.offset, !0)),
			len: Number(n.getBigUint64(t + e.len, !0))
		};
	}
	scrollViewport(e, t) {
		let n = this.L.scrollViewport, r = this.scratch.zero("scrollViewport", this.mem.bytes()), i = this.mem.view();
		i.setInt32(r + n.tag, e, !0), e === T.ROW ? i.setUint32(r + n.row, t, !0) : i.setInt32(r + n.delta, t, !0), this.exports.ghostty_terminal_scroll_viewport(this.handle, r), this.changed();
	}
	scrollBy(e, t) {
		this.scrollViewport(e, t), this.atBottom = this.getViewportOffset() === 0;
	}
	scrollToPrompt(e) {
		if (e === 0) return !1;
		let t = this.getViewportOffset();
		this.scrollBy(T.DELTA_PROMPT, e), this.getViewportOffset() === t && e < 0 && (this.scrollBy(T.DELTA, -1), this.scrollBy(T.DELTA_PROMPT, e));
		let n = this.getViewportOffset() !== t;
		return n || this.setViewportOffset(t), n;
	}
	getViewportOffset() {
		let { total: e, offset: t, len: n } = this.scrollbar();
		return Math.max(0, e - n - t);
	}
	needsFullRedraw() {
		return this.update() === R.FULL;
	}
	clearDirty() {
		this.markClean();
	}
	isAlternateScreen() {
		let e = this.scratch.at("value");
		return this.exports.ghostty_terminal_get(this.handle, o.ACTIVE_SCREEN, e), this.mem.view().getInt32(e, !0) === s.ALTERNATE;
	}
	hasBracketedPaste() {
		return this.getMode(2004, !1);
	}
	hasFocusEvents() {
		return this.getMode(1004, !1);
	}
	hasMouseTracking() {
		let e = this.scratch.at("value");
		return this.exports.ghostty_terminal_get(this.handle, o.MOUSE_TRACKING, e), this.mem.view().getUint8(e) !== 0;
	}
	getMode(e, t = !1) {
		let n = this.scratch.at("value"), i = this.mem.view();
		return i.setUint16(n, pe(e, t), !0), i.setUint8(n + this.L.modeConfig.value, 0), this.exports.ghostty_terminal_get(this.handle, o.MODE, n) === r && this.mem.view().getUint8(n + this.L.modeConfig.value) !== 0;
	}
	getDimensions() {
		return {
			cols: this._cols,
			rows: this._rows
		};
	}
	getScrollbackLength() {
		let e = this.scratch.at("value");
		return this.exports.ghostty_terminal_get(this.handle, o.SCROLLBACK_ROWS, e), this.mem.view().getUint32(e, !0);
	}
	viewportRef(e, t, n) {
		return this.gridRef(f.VIEWPORT, e, t, n);
	}
	gridRef(e, t, n, i) {
		let a = this.writePoint(e, t, n);
		return this.exports.ghostty_terminal_grid_ref(this.handle, a, i) === r;
	}
	writePoint(e, t, n) {
		let r = this.L.point, i = this.scratch.at("point"), a = this.mem.view();
		for (let e = 0; e < r.size; e += 4) a.setUint32(i + e, 0, !0);
		return a.setInt32(i, e, !0), a.setUint16(i + r.value + r.x, t, !0), a.setUint32(i + r.value + r.y, n, !0), i;
	}
	trackRow(e) {
		if (e < 0 || !Number.isInteger(e)) return null;
		let t = this.writePoint(f.SCREEN, 0, e), n = this.scratch.at("trackedRef");
		if (this.mem.view().setUint32(n, 0, !0), this.exports.ghostty_terminal_grid_ref_track(this.handle, t, n) !== r) return null;
		let i = this.mem.view().getUint32(n, !0);
		return i ? new Ce(this.exports, this.mem, this.L, i) : null;
	}
	getScrollbackLine(e) {
		return e < 0 || e >= this.getScrollbackLength() ? null : this.readGridLine(f.HISTORY, e);
	}
	readGridLine(t, n) {
		this.pendingUpdate && this.update(), this.loadColors();
		let i = this.exports, a = this.scratch.at("ref"), o = this.scratch.at("refOut"), s = this.scratch.at("style"), c = this.L, l = [];
		for (let u = 0; u < this._cols; u++) {
			let d = {};
			if (!this.gridRef(t, u, n, a) || i.ghostty_grid_ref_cell(a, o) !== r) {
				if (u === 0) return null;
				this.setBlank(d), l.push(d);
				continue;
			}
			let f = this.mem.view(), p = f.getUint32(o, !0), m = f.getUint32(o + 4, !0), h = null;
			e(p, m, c.cell.styleId) !== 0 && i.ghostty_grid_ref_style(a, s) === r && (h = new DataView(this.mem.bytes().slice(s, s + c.style.size).buffer));
			let g = null;
			e(p, m, c.cell.contentTag) === D.CODEPOINT_GRAPHEME && (g = this.graphemeAt(t, u, n));
			let _ = g ? Math.max(0, g.length - 1) : 0;
			this.decodeCell(d, p, m, h, _), d.selected = !1, _ > 0 && (d.chars = String.fromCodePoint(...g)), d.hyperlink_id &&= this.linkId(this.hyperlinkAt(t, u, n)), l.push(d);
		}
		return l;
	}
	linkId(e) {
		if (!e) return 0;
		let t = this.linkIds.get(e);
		return t === void 0 && (this.linkIds.size >= 4096 && (this.linkIds.clear(), this.rowStale.fill(1), this.rowDirty.fill(1), this.dirty = R.FULL), t = this.nextLinkId++, this.linkIds.set(e, t)), t;
	}
	getScreenLine(e) {
		return e < 0 ? null : this.readGridLine(f.SCREEN, e);
	}
	isScreenRowWrapped(e) {
		return this.rowWraps(f.SCREEN, e);
	}
	getScreenHyperlinkUri(e, t) {
		return this.hyperlinkAt(f.SCREEN, t, e);
	}
	rowWraps(e, t) {
		let n = this.scratch.at("ref"), i = this.scratch.at("refOut"), a = this.scratch.at("rowFlag");
		if (!this.gridRef(e, 0, t, n) || this.exports.ghostty_grid_ref_row(n, i) !== r) return !1;
		let o = this.mem.view().getBigUint64(i, !0);
		return this.exports.ghostty_row_get(o, d.WRAP_CONTINUATION, a) === r && this.mem.view().getUint8(a) !== 0;
	}
	hyperlinkAt(e, t, n) {
		let a = this.exports, o = this.scratch.at("ref"), s = this.scratch.at("refOut");
		if (!this.gridRef(e, t, n, o) || a.ghostty_grid_ref_hyperlink_uri(o, 0, 0, s) !== i) return null;
		let c = this.mem.view().getUint32(s, !0);
		if (c === 0) return null;
		let l = a.ghostty_wasm_alloc(c);
		try {
			if (a.ghostty_grid_ref_hyperlink_uri(o, l, c, s) !== r) return null;
			let e = this.mem.view().getUint32(s, !0);
			return new TextDecoder().decode(this.mem.bytes().slice(l, l + e));
		} finally {
			a.ghostty_wasm_free(l, c);
		}
	}
	readResponse() {
		if (this.responses.length === 0) return null;
		let e = this.responses.reduce((e, t) => e + t.length, 0), t = new Uint8Array(e), n = 0;
		for (let e of this.responses) t.set(e, n), n += e.length;
		return this.responses = [], new TextDecoder().decode(t);
	}
	hasSelection() {
		return this.exports.ghostty_terminal_get(this.handle, o.SELECTION, this.scratch.at("selection")) === r;
	}
	getSelectionRange() {
		let e = this.scratch.at("selection");
		return this.exports.ghostty_terminal_get(this.handle, o.SELECTION, e) === r ? this.selectionRangeAt(e) : null;
	}
	selectionRangeAt(e) {
		let t = this.exports, n = this.L.selection, i = this.scratch.at("orderedSelection");
		if (t.ghostty_terminal_selection_ordered(this.handle, e, p.FORWARD, i) !== r) return null;
		let a = this.screenPoint(i + n.start), o = this.screenPoint(i + n.end);
		return !a || !o ? null : {
			startCol: a.x,
			startRow: a.y,
			endCol: o.x,
			endRow: o.y,
			rectangle: this.mem.view().getUint8(i + n.rectangle) !== 0
		};
	}
	screenPoint(e) {
		let t = this.scratch.at("selectionPoint");
		if (this.exports.ghostty_terminal_point_from_grid_ref(this.handle, e, f.SCREEN, t) !== r) return null;
		let n = this.mem.view();
		return {
			x: n.getUint16(t + this.L.coordinate.x, !0),
			y: n.getUint32(t + this.L.coordinate.y, !0)
		};
	}
	setSelectionRange(e, t, n, r, i = !1) {
		let a = this.L.selection, o = this.scratch.at("newSelection");
		for (let e = 0; e < a.size; e++) this.mem.view().setUint8(o + e, 0);
		return !this.gridRef(f.SCREEN, e, t, o + a.start) || !this.gridRef(f.SCREEN, n, r, o + a.end) ? !1 : (this.mem.view().setUint8(o + a.rectangle, +!!i), this.installSelection(o));
	}
	clearToCursorLine() {
		let { x: e, y: t } = this.getCursor(), n = _.SCROLLING_REGION | _.STYLE, r = this.getScrollbackLength() + this._rows - 1, i = this.formatScreen({
			format: "vt",
			extras: 0,
			fromRow: r,
			toRow: r
		}), a = this.formatScreen({
			format: "vt",
			extras: n,
			fromRow: r,
			toRow: r
		}), o = a.startsWith(i) ? a.slice(i.length) : "", s = this.getMode(6), c = this.getMode(69), l = `${c ? "\x1B[?69l" : ""}\x1b[r\x1b[0m`;
		t > 0 && (l += `\x1b[${t}S`), this._rows > 1 && (l += "\x1B[2;1H\x1B[J"), l += `\x1b[3J${c ? "\x1B[?69h" : ""}${o}`, this.write(l), s && this.setMode(6, !1, !1, !0), this.write(`\x1b[1;${e + 1}H`), s && this.setMode(6, !1, !0, !0);
	}
	invalidate() {
		this.changed();
	}
	installSelection(e) {
		let t = this.exports.ghostty_terminal_set(this.handle, a.SELECTION, e) === r;
		return this.changed(), t;
	}
	adjustSelection(e) {
		let t = this.exports, n = this.scratch.at("newSelection");
		return t.ghostty_terminal_get(this.handle, o.SELECTION, n) !== r || t.ghostty_terminal_selection_adjust(this.handle, n, le[e]) !== r ? !1 : this.installSelection(n);
	}
	clearSelection() {
		this.exports.ghostty_terminal_set(this.handle, a.SELECTION, 0), this.changed();
	}
	selectAll() {
		let e = this.scratch.at("newSelection");
		return this.exports.ghostty_terminal_select_all(this.handle, e) === r && this.installSelection(e);
	}
	getSelectionText() {
		let e = this.scratch.at("selection");
		return this.exports.ghostty_terminal_get(this.handle, o.SELECTION, e) === r ? this.format({
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
					let r = t - t % 64;
					this.readPrimary(() => {
						for (let t = r; t < Math.min(n, r + 64); t++) {
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
			let t = this.scratch.at("selection");
			return this.exports.ghostty_terminal_get(this.handle, o.SELECTION, t) === r ? this.format({
				...e,
				selectionPtr: t
			}) : "";
		}
		let t = this.getScrollbackLength(), n = t + this._rows - 1, i = e.fromRow ?? 0;
		e.fromRow === void 0 && e.scrollback !== void 0 && (i = t - Math.max(0, Math.floor(e.scrollback))), i = Math.max(0, i);
		let a = Math.min(n, e.toRow ?? n);
		if (i > a) return "";
		let s;
		if (i > 0 || a < n) {
			let e = this.L.selection, t = this.scratch.at("newSelection");
			for (let n = 0; n < e.size; n++) this.mem.view().setUint8(t + n, 0);
			this.gridRef(f.SCREEN, 0, i, t + e.start) && this.gridRef(f.SCREEN, this._cols - 1, a, t + e.end) && (s = t);
		}
		return this.format({
			...e,
			selectionPtr: s
		});
	}
	format(e) {
		let t = this.exports, n = t.ghostty_wasm_alloc_opaque(), i = t.ghostty_formatter_terminal_new(0, n, this.handle), a = t.ghostty_wasm_take_opaque(n);
		if (t.ghostty_wasm_free_opaque(n), i !== r) return "";
		let o = this.scratch.at("formatterOption");
		try {
			let n = e.format === "vt" ? g.VT : e.format === "html" ? g.HTML : g.PLAIN;
			this.mem.view().setUint32(o, n, !0), t.ghostty_formatter_set(a, h.EMIT, o), this.mem.view().setUint8(o, +!!e.unwrap), t.ghostty_formatter_set(a, h.UNWRAP, o), this.mem.view().setUint8(o, +!!e.trim), t.ghostty_formatter_set(a, h.TRIM, o), e.extras !== void 0 && (this.mem.view().setUint32(o, e.extras, !0), t.ghostty_formatter_set(a, h.EXTRAS, o)), e.selectionPtr !== void 0 && t.ghostty_formatter_set(a, h.SELECTION, e.selectionPtr);
			let i = this.scratch.at("formatterOutPtr"), s = this.scratch.at("formatterOutLen");
			if (t.ghostty_formatter_format_alloc(a, 0, i, s) !== r) return "";
			let c = this.mem.view(), l = c.getUint32(i, !0), u = c.getUint32(s, !0), d = new TextDecoder().decode(this.mem.bytes().slice(l, l + u));
			return t.ghostty_free(0, l, u), d;
		} finally {
			t.ghostty_formatter_free(a);
		}
	}
	createSearch() {
		return new ye(this.exports, this.mem, this.L, this);
	}
	createSelectionGesture() {
		return new be(this.exports, this.mem, this.L, this);
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
		let a = this.exports, o = this.scratch.at("ref"), s = this.scratch.at("refOut");
		if (!this.gridRef(e, t, n, o)) return null;
		let c = U / 4, l = this.scratch.at("graphemes"), u = a.ghostty_grid_ref_graphemes(o, l, c, s);
		if (u === r) {
			let e = this.mem.view().getUint32(s, !0);
			return Array.from(new Uint32Array(this.mem.bytes().slice(l, l + e * 4).buffer));
		}
		if (u !== i) return null;
		let d = this.mem.view().getUint32(s, !0), f = a.ghostty_wasm_alloc(d * 4);
		try {
			if (u = a.ghostty_grid_ref_graphemes(o, f, d, s), u !== r) return null;
			let e = this.mem.view().getUint32(s, !0);
			return Array.from(new Uint32Array(this.mem.bytes().slice(f, f + e * 4).buffer));
		} finally {
			a.ghostty_wasm_free(f, d * 4);
		}
	}
}, Ce = class {
	constructor(e, t, n, r) {
		this.exports = e, this.mem = t, this.L = n, this.ref = r, this.out = e.ghostty_wasm_alloc(n.coordinate.size);
	}
	get alive() {
		return this.ref !== 0 && this.exports.ghostty_tracked_grid_ref_has_value(this.ref) !== 0;
	}
	get row() {
		return !this.ref || this.exports.ghostty_tracked_grid_ref_point(this.ref, f.SCREEN, this.out) !== r ? null : this.mem.view().getUint32(this.out + this.L.coordinate.y, !0);
	}
	free() {
		this.ref &&= (this.exports.ghostty_tracked_grid_ref_free(this.ref), this.exports.ghostty_wasm_free(this.out, this.L.coordinate.size), this.out = 0);
	}
};
// lib/wasm-default-slim.ts
function we() {
	return new URL("./ghostty-vt.wasm", import.meta.url);
}
// lib/ghostty.ts
function Te(e) {
	let t = decodeURIComponent(e.pathname);
	return /^\/[A-Za-z]:\//.test(t) ? t.slice(1) : t;
}
var Ee = {
	0: "debug",
	1: "release-safe",
	2: "release-small",
	3: "release-fast"
}, De = class e {
	constructor(e) {
		this.terminals = /* @__PURE__ */ new Map(), this.writePtyFn = 0, this.effectFns = /* @__PURE__ */ new Map(), this.mimeReaderFn = 0, this.pasteData = null, this.exports = e.exports, this.memory = this.exports.memory, this.mem = new ge(this.memory), this.layout = he(new t(this.readTypeJson()));
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
			return Ee[this.mem.view().getInt32(t, !0)] ?? "unknown";
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
		let e = j((e, t, n, r) => {
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
				S.BELL,
				2,
				!1,
				(e) => e.onEffect("bell")
			],
			[
				S.TITLE_CHANGED,
				2,
				!1,
				(e) => e.onEffect("title")
			],
			[
				S.PWD_CHANGED,
				2,
				!1,
				(e) => e.onEffect("pwd")
			],
			[
				S.CLIPBOARD_WRITE,
				3,
				!1,
				(e, t) => e.onClipboardWrite(t)
			],
			[
				S.DESKTOP_NOTIFICATION,
				3,
				!1,
				(e, t) => e.onNotification(t)
			],
			[
				S.PROGRESS_REPORT,
				3,
				!1,
				(e, t) => e.onProgress(t)
			],
			[
				S.PROGRAM_STATUS,
				3,
				!1,
				(e, t) => e.onProgramStatus(t)
			],
			[
				S.SEMANTIC_PROMPT,
				3,
				!1,
				(e, t) => e.onSemanticPrompt(t)
			],
			[
				S.COLOR_SCHEME,
				3,
				!0,
				(e, t) => e.onColorScheme(t)
			],
			[
				S.SIZE,
				3,
				!0,
				(e, t) => e.onSizeQuery(t)
			],
			[
				S.RENDER_HOLD,
				3,
				!1,
				(e, t) => e.onRenderHold(t !== 0)
			],
			[
				S.RESET,
				2,
				!1,
				(e) => e.onEffect("reset")
			]
		];
		for (let [r, i, a, o] of n) {
			let n = this.effectFns.get(r);
			n === void 0 && (n = this.tableFunction(j(t(o), i, a)), this.effectFns.set(r, n)), this.exports.ghostty_terminal_set(e.handle, r, n);
		}
		let r = this.effectFns.get(S.ENQUIRY);
		r === void 0 && (r = this.tableFunction(j((e, t) => {
			let n = this.terminals.get(t);
			n ? n.onEnquiry(e) : this.mem.bytes().fill(0, e, e + this.layout.string.size);
		}, 3)), this.effectFns.set(S.ENQUIRY, r)), this.exports.ghostty_terminal_set(e.handle, S.ENQUIRY, r);
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
		let e = this.exports, t = j((t, n, r) => {
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
		return new me(this.exports, this.mem, this.layout);
	}
	createMouseEncoder() {
		return new _e(this.exports, this.mem, this.layout);
	}
	createTerminal(e = 80, t = 24, n) {
		let r = new Se(this.exports, this.mem, this.layout, e, t, n);
		return r.ghostty = this, this.terminals.set(r.handle, r), r.setWritePty(this.writePtyCallback(), () => this.terminals.delete(r.handle)), this.installEffects(r), r;
	}
	static async load(t) {
		if (t) return typeof t == "string" ? e.loadFromPath(t) : e.loadFromPath(t.protocol === "file:" ? Te(t) : t.href);
		let n = we(), r = [];
		n.protocol === "file:" && r.push(Te(n)), r.push(n.href, "./ghostty-vt.wasm", "/ghostty-vt.wasm");
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
}, W = null, G = null, K;
function Oe(e = {}) {
	let t = e.wasmPath === void 0 ? void 0 : String(e.wasmPath);
	return G ? (t !== K && console.warn(`ghostterm: init() was already called with ${ke(K)}; ignoring ${ke(t)}.`), G) : (K = t, G = De.load(e.wasmPath).then((e) => {
		W = e;
	}, (e) => {
		throw G = null, e;
	}), G);
}
function ke(e) {
	return e === void 0 ? "the bundled module" : `wasmPath ${e}`;
}
function Ae() {
	if (!W) throw Error("ghostterm not initialized. Call init() before creating Terminal instances.\nExample:\n  import { init, Terminal } from \"ghostterm\";\n  await init();\n  const term = new Terminal();\n\nFor tests, pass a Ghostty instance directly:\n  import { Ghostty, Terminal } from \"ghostterm\";\n  const ghostty = await Ghostty.load();\n  const term = new Terminal({ ghostty });");
	return W;
}
// lib/event-emitter.ts
var q = class {
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
}, je = 0, J = 50331648, Me = class {
	constructor(e) {
		this.bufferChangeEmitter = new q(), this.terminal = e;
	}
	get active() {
		let e = this.terminal.wasmTerm;
		return e && e.isAlternateScreen() ? this.alternate : this.normal;
	}
	get normal() {
		return this._normalBuffer ||= new Ne(this.terminal, "normal"), this._normalBuffer;
	}
	get alternate() {
		return this._alternateBuffer ||= new Ne(this.terminal, "alternate"), this._alternateBuffer;
	}
	get onBufferChange() {
		return this.bufferChangeEmitter.event;
	}
	_fireBufferChange(e) {
		this.bufferChangeEmitter.fire(e);
	}
}, Ne = class {
	constructor(e, t) {
		this.terminal = e, this.bufferType = t, this.nullCell = new Fe(Pe(), 0);
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
		let t = Math.max(0, Math.floor(this.terminal.getViewportY()));
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
			return n ? new Y(n.cells, n.wrapped, this.terminal.cols) : void 0;
		}
		let n = this.activeTerm();
		if (!n || e < 0 || e >= this.length) return;
		let r = n.getScreenLine(e);
		if (r) return new Y(r, n.isScreenRowWrapped(e), n.cols);
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
function Pe() {
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
var Y = class {
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
		if (!(e < 0 || e >= this._length)) return new Fe(e < this.cells.length ? this.cells[e] : Pe(), e);
	}
	translateToString(e = !1, t = 0, n = this._length) {
		let r = Math.max(0, Math.min(t, this._length)), i = Math.max(r, Math.min(n, this._length)), a = "";
		for (let e = r; e < i; e++) {
			let t = this.getCell(e);
			t && t.getWidth() !== 0 && (a += t.getChars() || " ");
		}
		return e && (a = a.trimEnd()), a;
	}
}, Fe = class {
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
		return this.isFgDefault() ? je : J;
	}
	getBgColorMode() {
		return this.isBgDefault() ? je : J;
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
		return (this.cell.flags & B.BOLD) === 0 ? 0 : 1;
	}
	isItalic() {
		return (this.cell.flags & B.ITALIC) === 0 ? 0 : 1;
	}
	isUnderline() {
		return (this.cell.flags & B.UNDERLINE) === 0 ? 0 : 1;
	}
	isStrikethrough() {
		return (this.cell.flags & B.STRIKETHROUGH) === 0 ? 0 : 1;
	}
	isBlink() {
		return (this.cell.flags & B.BLINK) === 0 ? 0 : 1;
	}
	isInverse() {
		return (this.cell.flags & B.INVERSE) === 0 ? 0 : 1;
	}
	isInvisible() {
		return (this.cell.flags & B.INVISIBLE) === 0 ? 0 : 1;
	}
	isFaint() {
		return (this.cell.flags & B.FAINT) === 0 ? 0 : 1;
	}
	getHyperlinkId() {
		return this.cell.hyperlink_id;
	}
	getCodepoint() {
		return this.cell.codepoint;
	}
	isDim() {
		return (this.cell.flags & B.FAINT) !== 0;
	}
}, Ie = class {
	constructor(e, t) {
		this.service = t, this.renderEmitter = new q(), this.disposeEmitter = new q(), this.disposed = !1, this.onRender = this.renderEmitter.event, this.onDispose = this.disposeEmitter.event, this.options = e, this.marker = e.marker, this.markerListener = this.marker.onDispose(() => this.dispose());
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
}, Le = class {
	constructor(e) {
		this.host = e, this.list = [], this.refreshQueued = !1;
	}
	get decorations() {
		return this.list;
	}
	attach(e, t) {
		this.parent = e, this.canvas = t, this.queueRefresh();
	}
	getContainer() {
		if (this.container || !this.parent) return this.container;
		let e = document.createElement("div");
		return e.className = "xterm-decoration-container", e.style.position = "absolute", e.style.height = "0", e.style.overflow = "visible", this.parent.appendChild(e), this.container = e, e;
	}
	register(e) {
		if (e.marker.isDisposed) return;
		let t = new Ie(e, this);
		return this.list.push(t), this.queueRefresh(), t;
	}
	remove(e) {
		let t = this.list.indexOf(e);
		t >= 0 && this.list.splice(t, 1), this.host.requestRender();
	}
	invalidate() {
		this.queueRefresh();
	}
	queueRefresh() {
		this.refreshQueued = !0, this.host.requestRender();
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
			if (!(n >= 0 && n < i && Re(e.marker, o) && !e.isDisposed)) {
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
			if (c < 0 || c >= t || !Re(a.marker, r)) continue;
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
function Re(e, t) {
	return (e.alternate ?? !1) === t;
}
// lib/input-handler.ts
var ze = {
	ArrowLeft: "left",
	ArrowRight: "right",
	ArrowUp: "up",
	ArrowDown: "down",
	Home: "home",
	End: "end",
	PageUp: "page-up",
	PageDown: "page-down"
}, Be = 1, Ve = {
	KeyA: I.A,
	KeyB: I.B,
	KeyC: I.C,
	KeyD: I.D,
	KeyE: I.E,
	KeyF: I.F,
	KeyG: I.G,
	KeyH: I.H,
	KeyI: I.I,
	KeyJ: I.J,
	KeyK: I.K,
	KeyL: I.L,
	KeyM: I.M,
	KeyN: I.N,
	KeyO: I.O,
	KeyP: I.P,
	KeyQ: I.Q,
	KeyR: I.R,
	KeyS: I.S,
	KeyT: I.T,
	KeyU: I.U,
	KeyV: I.V,
	KeyW: I.W,
	KeyX: I.X,
	KeyY: I.Y,
	KeyZ: I.Z,
	Digit1: I.ONE,
	Digit2: I.TWO,
	Digit3: I.THREE,
	Digit4: I.FOUR,
	Digit5: I.FIVE,
	Digit6: I.SIX,
	Digit7: I.SEVEN,
	Digit8: I.EIGHT,
	Digit9: I.NINE,
	Digit0: I.ZERO,
	Enter: I.ENTER,
	Escape: I.ESCAPE,
	Backspace: I.BACKSPACE,
	Tab: I.TAB,
	Space: I.SPACE,
	Minus: I.MINUS,
	Equal: I.EQUAL,
	BracketLeft: I.BRACKET_LEFT,
	BracketRight: I.BRACKET_RIGHT,
	Backslash: I.BACKSLASH,
	Semicolon: I.SEMICOLON,
	Quote: I.QUOTE,
	Backquote: I.GRAVE,
	Comma: I.COMMA,
	Period: I.PERIOD,
	Slash: I.SLASH,
	CapsLock: I.CAPS_LOCK,
	F1: I.F1,
	F2: I.F2,
	F3: I.F3,
	F4: I.F4,
	F5: I.F5,
	F6: I.F6,
	F7: I.F7,
	F8: I.F8,
	F9: I.F9,
	F10: I.F10,
	F11: I.F11,
	F12: I.F12,
	PrintScreen: I.PRINT_SCREEN,
	ScrollLock: I.SCROLL_LOCK,
	Pause: I.PAUSE,
	Insert: I.INSERT,
	Home: I.HOME,
	PageUp: I.PAGE_UP,
	Delete: I.DELETE,
	End: I.END,
	PageDown: I.PAGE_DOWN,
	ArrowRight: I.RIGHT,
	ArrowLeft: I.LEFT,
	ArrowDown: I.DOWN,
	ArrowUp: I.UP,
	NumLock: I.NUM_LOCK,
	NumpadDivide: I.KP_DIVIDE,
	NumpadMultiply: I.KP_MULTIPLY,
	NumpadSubtract: I.KP_MINUS,
	NumpadAdd: I.KP_PLUS,
	NumpadEnter: I.KP_ENTER,
	Numpad1: I.KP_1,
	Numpad2: I.KP_2,
	Numpad3: I.KP_3,
	Numpad4: I.KP_4,
	Numpad5: I.KP_5,
	Numpad6: I.KP_6,
	Numpad7: I.KP_7,
	Numpad8: I.KP_8,
	Numpad9: I.KP_9,
	Numpad0: I.KP_0,
	NumpadDecimal: I.KP_PERIOD,
	IntlBackslash: I.INTL_BACKSLASH,
	ContextMenu: I.CONTEXT_MENU,
	F13: I.F13,
	F14: I.F14,
	F15: I.F15,
	F16: I.F16,
	F17: I.F17,
	F18: I.F18,
	F19: I.F19,
	F20: I.F20,
	F21: I.F21,
	F22: I.F22,
	F23: I.F23,
	F24: I.F24
}, He = class e {
	static {
		this.BEFORE_INPUT_IGNORE_MS = 100;
	}
	constructor(e) {
		this.listeners = [], this.isComposing = !1, this.isDisposed = !1, this.encodedKeys = /* @__PURE__ */ new Set(), this.keySwallowed = !1, this.mouseButtonsPressed = 0, this.trackingDrag = !1, this.mouseEncoder = null, this.lastPasteData = null, this.lastPasteTime = 0, this.lastPasteSource = null, this.lastCompositionData = null, this.lastCompositionTime = 0, this.lastBeforeInputData = null, this.lastBeforeInputTime = 0, this.wheelRemainder = {
			x: 0,
			y: 0
		}, this.ghostty = e.ghostty, this.encoder = e.ghostty.createKeyEncoder(), this.container = e.container, this.inputElement = e.inputElement, this.onDataCallback = e.onData, this.onKeyCallback = e.onKey, this.customKeyEventHandler = e.customKeyEventHandler, this.customWheelEventHandler = e.customWheelEventHandler, this.onCopyCallback = e.onCopy, this.mouseConfig = e.mouseConfig, this.pointer = e.pointer, this.getTerminal = e.getTerminal, this.attach();
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
		return Ve[e] ?? null;
	}
	extractModifiers(e) {
		let t = L.NONE;
		return e.shiftKey && (t |= L.SHIFT), e.ctrlKey && (t |= L.CTRL), e.altKey && (t |= L.ALT), e.metaKey && (t |= L.SUPER), t;
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
		e && this.encoder.syncFromTerminal(e), this.encoder.setOption(ve.MACOS_OPTION_AS_ALT, Be);
	}
	encodeKey(e, t) {
		let n = this.mapKeyCode(e.code);
		if (n === null) return null;
		let r = e.metaKey ? void 0 : this.keyText(e), i = this.unshiftedCodepoint(e, this.keyText(e)), a = this.extractModifiers(e), o = L.NONE;
		if (r) {
			let t = r !== (i === void 0 ? void 0 : String.fromCodePoint(i));
			((e.getModifierState?.("AltGraph") ?? !1) || e.ctrlKey && e.altKey && t) && (a &= ~(L.CTRL | L.ALT)), e.shiftKey && t && (o |= L.SHIFT);
		}
		this.syncEncoder();
		let s = this.encoder.encode({
			action: t,
			key: n,
			mods: a,
			consumedMods: o,
			utf8: r,
			unshiftedCodepoint: i
		});
		return new TextDecoder().decode(s);
	}
	encodeNamedKey(e, t = L.NONE) {
		return this.syncEncoder(), new TextDecoder().decode(this.encoder.encode({
			action: F.PRESS,
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
		let t = ze[e.code];
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
			n = this.encodeKey(e, e.repeat ? F.REPEAT : F.PRESS);
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
	sendKey(e, t = L.NONE) {
		let n = this.encodeNamedKey(e, t);
		n && this.onDataCallback(n);
	}
	pressTarget(e) {
		return this.pointer ? this.pointer.gestureTarget() ?? this.pointer.targetFor(e) : this.programTracksMouse(e) ? "program" : "selection";
	}
	programTracksMouse(e) {
		return !!this.mouseConfig?.hasMouseTracking() && !e.shiftKey;
	}
	handleKeyUp(e) {
		if (this.isDisposed) return;
		this.keySwallowed = !1;
		let t = this.encodedKeys.delete(e.code);
		if (!(this.customKeyEventHandler && this.customKeyEventHandler(e) === !1) && !(!t || this.isComposing || e.isComposing)) try {
			let t = this.encodeKey(e, F.RELEASE);
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
					r = this.encodeNamedKey(I.BACKSPACE);
					break;
				case "deleteContentForward":
					r = this.encodeNamedKey(I.DELETE);
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
		let t = L.NONE;
		return e.shiftKey && (t |= L.SHIFT), e.ctrlKey && (t |= L.CTRL), e.altKey && (t |= L.ALT), e.metaKey && (t |= L.SUPER), t;
	}
	static {
		this.DOM_BUTTONS = {
			0: M.LEFT,
			1: M.MIDDLE,
			2: M.RIGHT,
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
		n !== void 0 && this.pressTarget(t) === "program" && (this.mouseButtonsPressed |= 1 << n, this.reportMouse(t, N.PRESS, n), this.startDragTracking());
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
		this.mouseButtonsPressed &= ~(1 << n), this.mouseButtonsPressed === 0 && this.stopDragTracking(), r && this.reportMouse(t, N.RELEASE, n);
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
			M.LEFT,
			M.MIDDLE,
			M.RIGHT
		]) if (this.mouseButtonsPressed & 1 << e) {
			t = e;
			break;
		}
		this.reportMouse(e, N.MOTION, t);
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
		if (this.isDisposed || (this.pointer ? this.pointer.wheelTarget(e) : this.programTracksMouse(e) ? "program" : "scroll") !== "program" || this.customWheelEventHandler && this.customWheelEventHandler(e) === !1) return;
		let t = Math.abs(e.deltaX) > Math.abs(e.deltaY), n = t ? e.deltaX : e.deltaY;
		if (e.preventDefault(), n === 0) return;
		let r = this.wheelSteps(e, n, t ? "x" : "y"), i = t ? r < 0 ? M.WHEEL_LEFT : M.WHEEL_RIGHT : r < 0 ? M.WHEEL_UP : M.WHEEL_DOWN;
		for (let t = 0; t < Math.min(Math.abs(r), 10); t++) this.reportMouse(e, N.PRESS, i);
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
}, Ue = /* @__PURE__ */ new Set([
	"http:",
	"https:",
	"mailto:",
	"ftp:"
]);
function We(e) {
	try {
		return Ue.has(new URL(e).protocol);
	} catch {
		return !1;
	}
}
function Ge(e, t) {
	(t.ctrlKey || t.metaKey) && We(e) && window.open(e, "_blank", "noopener,noreferrer");
}
function Ke(e, t, n) {
	let { start: r, end: i } = e;
	return !(n < r.y || n > i.y || n === r.y && t < r.x || n === i.y && t > i.x);
}
var qe = class {
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
				let r = n?.find((n) => Ke(n.range, e, t));
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
}, Je = 16, Ye = class {
	constructor(e) {
		this.host = e;
	}
	move(e) {
		this.throttle === void 0 ? (this.update(e), this.throttle = window.setTimeout(() => {
			this.throttle = void 0;
			let e = this.pendingMove;
			this.pendingMove = void 0, e && this.update(e);
		}, Je)) : this.pendingMove = e;
	}
	leave() {
		this.lastPointer = void 0;
		let e = this.host.renderer();
		e?.setHoveredHyperlinkId(0), e?.setHoveredLinkRange(null), this.hovered && this.setHovered(void 0);
	}
	click(e) {
		let t = this.cellAt(e);
		if (!t) return;
		let n = this.host.links.findLinkAt(t.x, this.host.viewportRowToBufferRow(t.y));
		n instanceof Promise ? n.then((t) => t?.activate(e)).catch(() => {}) : n && ((e.ctrlKey || e.metaKey) && e.preventDefault(), n.activate(e));
	}
	refresh() {
		let e = this.host.renderer();
		this.lastPointer && e && (this.hovered || e.getHoveredHyperlinkId() !== 0) && this.update(this.lastPointer);
	}
	reset() {
		this.hovered?.hover?.(!1), this.hovered = void 0;
		let e = this.host.renderer();
		e?.setHoveredHyperlinkId(0), e?.setHoveredLinkRange(null), this.setPointerShape(this.host.programPointerShape());
	}
	updatePointerShape() {
		this.hovered || this.setPointerShape(this.host.programPointerShape());
	}
	dispose() {
		this.throttle !== void 0 && clearTimeout(this.throttle), this.throttle = void 0, this.pendingMove = void 0, this.lastPointer = void 0, this.hovered = void 0;
	}
	cellAt(e) {
		let t = this.host.canvas(), n = this.host.renderer();
		if (!t || !n) return null;
		let r = t.getBoundingClientRect();
		return {
			x: Math.floor((e.clientX - r.left) / n.charWidth),
			y: Math.floor((e.clientY - r.top) / n.charHeight)
		};
	}
	update(e) {
		let t = this.cellAt(e), n = this.host.renderer();
		if (!t || !n) return;
		this.lastPointer = {
			clientX: e.clientX,
			clientY: e.clientY
		};
		let r = this.host.viewportLine(t.y), i = r && t.x >= 0 && t.x < r.length ? r[t.x].hyperlink_id : 0;
		n.setHoveredHyperlinkId(i), this.host.links.getLinkAt(t.x, this.host.viewportRowToBufferRow(t.y)).then((e) => {
			e !== this.hovered && this.setHovered(e);
			let t = this.host.renderer();
			if (!t) return;
			let n = this.host.rows(), r = e ? this.host.bufferRowToViewportRow(e.range.start.y) : -1, i = e ? this.host.bufferRowToViewportRow(e.range.end.y) : -1;
			e && r < n && i >= 0 ? t.setHoveredLinkRange({
				startX: e.range.start.x,
				startY: Math.max(0, r),
				endX: e.range.end.x,
				endY: Math.min(n - 1, i)
			}) : t.setHoveredLinkRange(null);
		}).catch((e) => {
			console.warn("Link detection error:", e);
		});
	}
	setHovered(e) {
		this.hovered?.hover?.(!1), this.hovered = e, e?.hover?.(!0), this.setPointerShape(e ? "pointer" : this.host.programPointerShape());
	}
	setPointerShape(e) {
		let t = this.host.canvas();
		t && t.style.cursor !== e && (t.style.cursor = e);
		let n = this.host.element();
		n && n.style.cursor !== e && (n.style.cursor = e);
	}
}, Xe = 1, Ze = class {
	constructor(e, t, n) {
		this.tracked = e, this.alternate = t, this.registry = n, this.id = Xe++, this.disposeEmitter = new q(), this.disposed = !1, this.cachedLine = -1, this.cachedAt = -1, this.onDispose = this.disposeEmitter.event, e || (this.disposed = !0);
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
}, Qe = class {
	constructor() {
		this.list = [], this.generation = 0;
	}
	get markers() {
		return this.list;
	}
	create(e, t) {
		let n = e.trackRow(t), r = new Ze(n, e.isAlternateScreen(), n ? this : null);
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
}, $e = Object.freeze({
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
function et(e) {
	let t = (t) => e.getMode(t, !1);
	return {
		applicationCursorKeysMode: t(1),
		applicationKeypadMode: t(66),
		bracketedPasteMode: t(2004),
		insertMode: e.getMode(4, !0),
		mouseTrackingMode: tt(e),
		originMode: t(6),
		reverseWraparoundMode: t(45),
		sendFocusMode: t(1004),
		showCursor: t(25),
		synchronizedOutputMode: t(2026),
		wraparoundMode: t(7)
	};
}
function tt(e) {
	return e.hasMouseTracking() ? e.getMode(1003, !1) ? "any" : e.getMode(1002, !1) ? "drag" : e.getMode(1e3, !1) ? "vt200" : e.getMode(9, !1) ? "x10" : "none" : "none";
}
// lib/parser.ts
function nt(e) {
	let t = 0;
	if (typeof e == "string") for (let n = 0; n < e.length; n++) {
		let r = e.charCodeAt(n);
		r >= 10 && r <= 12 && t++;
	}
	else for (let n = 0; n < e.length; n++) e[n] >= 10 && e[n] <= 12 && t++;
	return t;
}
var rt = class {
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
}, it = class {
	constructor(e) {
		this.host = e, this.gesture = null;
	}
	targetFor(e) {
		return this.host.overScrollbar(e) ? "scrollbar" : this.host.programTracksMouse() && !e.shiftKey ? "program" : "selection";
	}
	press(e) {
		return this.gesture = this.targetFor(e), this.gesture;
	}
	gestureTarget() {
		return this.gesture;
	}
	wheelTarget(e) {
		return this.host.programTracksMouse() && !e.shiftKey ? "program" : "scroll";
	}
}, at = class {
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
				activate: (e) => Ge(d, e)
			}), l = n + 1;
		}
		t(c.length > 0 ? c : void 0);
	}
	dispose() {}
};
// lib/line-text.ts
function ot(e, t = !1) {
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
var st = class e {
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
		let { text: s, startCell: c, endCell: l } = ot(a), u = [], d = new RegExp(e.URL_REGEX);
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
				activate: (e) => Ge(r, e)
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
};
// lib/renderer.ts
function ct(e, t) {
	return e === t ? !0 : !e || !t ? !1 : e.startX === t.startX && e.startY === t.startY && e.endX === t.endX && e.endY === t.endY;
}
var lt = 8, ut = 3, dt = 4, ft = 20, X = {
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
function Z(e) {
	if (!e) return;
	let t = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.exec(e.trim())?.[1];
	if (t) {
		let e = t.length <= 4 ? [...t.slice(0, 3)].map((e) => e + e).join("") : t;
		return Number.parseInt(e.slice(0, 6), 16);
	}
	let n = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(e);
	if (n) return n[1] << 16 | n[2] << 8 | n[3];
}
var pt = class {
	changed() {
		this.rendering || this.onChange?.();
	}
	constructor(e, t = {}) {
		this.cursorVisible = !0, this.cursorShape = "block", this.cursorColor = "", this.blinkActive = !1, this.drawnCursor = null, this.focused = !0, this.lastViewportY = 0, this.scrollbarGutter = 15, this.gridCols = 0, this.gridRows = 0, this.cssWidth = 0, this.cssHeight = 0, this.backingWidth = 0, this.backingHeight = 0, this.needsFullRender = !1, this.currentBuffer = null, this.hoveredHyperlinkId = 0, this.previousHoveredHyperlinkId = 0, this.hoveredLinkRange = null, this.previousHoveredLinkRange = null, this.rendering = !1, this.highlightRows = /* @__PURE__ */ new Map(), this.highlightKey = "", this.canvas = e, this.allowTransparency = t.allowTransparency ?? !1;
		let n = e.getContext("2d");
		if (!n) throw Error("Failed to get 2D rendering context");
		this.ctx = n, this.fontSize = t.fontSize ?? 15, this.fontFamily = t.fontFamily ?? "monospace", this.cursorStyle = t.cursorStyle ?? "block", this.cursorBlink = t.cursorBlink ?? !1, this.theme = {
			...X,
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
		this.changed();
		let e = this.metrics;
		return this.metrics = this.measureFont(), this.needsFullRender = !0, e.width !== this.metrics.width || e.height !== this.metrics.height || e.baseline !== this.metrics.baseline;
	}
	rgbToCSS(e, t, n) {
		return `rgb(${e}, ${t}, ${n})`;
	}
	themeBackground() {
		if (this.allowTransparency) return this.theme.background;
		let e = Z(this.theme.background) ?? 0;
		return this.rgbToCSS(e >> 16 & 255, e >> 8 & 255, e & 255);
	}
	resolveBackground(e) {
		return !e || (e.r << 16 | e.g << 8 | e.b) === (Z(this.theme.background) ?? 0) ? this.themeBackground() : this.rgbToCSS(e.r, e.g, e.b);
	}
	resize(e, t) {
		this.changed(), this.gridCols = e, this.gridRows = t, this.needsFullRender = !0, this.drawnCursor = null;
		let n = e * this.metrics.width + this.scrollbarGutter, r = t * this.metrics.height;
		this.cssWidth = n, this.cssHeight = r, this.canvas.style.width = `${n}px`, this.canvas.style.height = `${r}px`, this.backingWidth = Math.round(n * this.devicePixelRatio), this.backingHeight = Math.round(r * this.devicePixelRatio), this.canvas.width = this.backingWidth, this.canvas.height = this.backingHeight, this.ctx.setTransform(this.devicePixelRatio, 0, 0, this.devicePixelRatio, 0, 0), this.ctx.textBaseline = "alphabetic", this.ctx.textAlign = "left", this.ctx.fillStyle = this.background, this.ctx.fillRect(0, 0, n, r);
	}
	setDevicePixelRatio(e) {
		e > 0 && e !== this.devicePixelRatio && (this.devicePixelRatio = e, this.gridCols > 0 && this.gridRows > 0 && this.resize(this.gridCols, this.gridRows));
	}
	render(e, t = !1, n = 0, r = 1) {
		this.rendering = !0;
		try {
			return this.draw(e, t, n, r);
		} finally {
			this.rendering = !1;
		}
	}
	draw(e, t, n, r) {
		this.currentBuffer = e;
		let i = Math.max(0, Math.floor(n)), a = e.getCursor(), o = e.getDimensions();
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
		mt(u, this.drawnCursor) || (this.drawnCursor && m.add(this.drawnCursor.y), u && m.add(u.y));
		let h = /* @__PURE__ */ new Set(), g = this.hoveredHyperlinkId !== this.previousHoveredHyperlinkId, _ = !ct(this.hoveredLinkRange, this.previousHoveredLinkRange);
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
		let s = e.bg_r, c = e.bg_g, l = e.bg_b;
		e.flags & B.INVERSE && (s = e.fg_r, c = e.fg_g, l = e.fg_b), !(e.flags & B.INVERSE) && (e.bg_default ?? (s === 0 && c === 0 && l === 0)) || (this.ctx.fillStyle = this.rgbToCSS(s, c, l), this.ctx.fillRect(r, i, a, this.metrics.height));
	}
	renderCellText(e, t, n, r) {
		let i = t * this.metrics.width, a = n * this.metrics.height, o = this.metrics.width * e.width;
		if (e.flags & B.INVISIBLE) return;
		let s = this.highlightAt(t, n), c = e.selected === !0 && !s?.active, l = "";
		if (e.flags & B.ITALIC && (l += "italic "), e.flags & B.BOLD && (l += "bold "), this.ctx.font = `${l}${this.fontSize}px ${this.fontFamily}`, r) this.ctx.fillStyle = r;
		else if (c) this.ctx.fillStyle = this.theme.selectionForeground;
		else if (s?.foreground) this.ctx.fillStyle = s.foreground;
		else {
			let t = e.fg_r, n = e.fg_g, r = e.fg_b;
			e.flags & B.INVERSE && (t = e.bg_r, n = e.bg_g, r = e.bg_b), this.ctx.fillStyle = this.rgbToCSS(t, n, r);
		}
		e.flags & B.FAINT && (this.ctx.globalAlpha = .5);
		let u = i, d = a + this.metrics.baseline, f = e.chars || String.fromCodePoint(e.codepoint || 32);
		this.ctx.fillText(f, u, d), e.flags & B.FAINT && (this.ctx.globalAlpha = 1), e.flags & B.UNDERLINE && this.drawUnderline(e, i, a, o);
		let p = this.lineThickness(), m = String(this.ctx.fillStyle);
		if (e.overline && this.strokeLine(i, o, this.lineY(a, p), p, m), e.flags & B.STRIKETHROUGH) {
			let e = a + this.metrics.height / 2 - p / this.devicePixelRatio / 2;
			this.strokeLine(i, o, this.lineY(e, p), p, m);
		}
		let h = this.hoveredLinkRange;
		if (e.hyperlink_id > 0 && e.hyperlink_id === this.hoveredHyperlinkId || h !== null && (n === h.startY && t >= h.startX && (n < h.endY || t <= h.endX) || n > h.startY && n < h.endY || n === h.endY && t <= h.endX && (n > h.startY || t >= h.startX))) {
			let e = this.lineY(this.underlineTop(a, p), p);
			this.strokeLine(i, o, e, p, "#4A90E2");
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
		this.changed(), this.highlightProvider = e, this.needsFullRender = !0;
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
		let i = this.ctx, a = this.devicePixelRatio, o = this.lineThickness(), s = o / a, c = this.underlineTop(n, o), l = this.lineY(c, o), u = n + this.metrics.height, d = e.underline_style ?? z.SINGLE;
		switch (i.save(), i.strokeStyle = e.underline_color === void 0 ? i.fillStyle : `#${e.underline_color.toString(16).padStart(6, "0")}`, i.lineWidth = s, i.beginPath(), d) {
			case z.DOUBLE: {
				let e = Math.min(c + s, u - s), n = this.lineY(e - 2 * s, o), a = this.lineY(e, o);
				i.moveTo(t, n), i.lineTo(t + r, n), i.moveTo(t, a), i.lineTo(t + r, a);
				break;
			}
			case z.CURLY: {
				let e = 2 * s, n = Math.min(l, u - e - s / 2);
				i.moveTo(t, n), i.quadraticCurveTo(t + r / 4, n - 2 * e, t + r / 2, n), i.quadraticCurveTo(t + 3 * r / 4, n + 2 * e, t + r, n);
				break;
			}
			case z.DOTTED:
			case z.DASHED:
				i.setLineDash(d === z.DOTTED ? [s, 2 * s] : [3 * s, 2 * s]), i.lineDashOffset = t, i.moveTo(t, l), i.lineTo(t + r, l);
				break;
			default: i.moveTo(t, l), i.lineTo(t + r, l);
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
			this.cursorVisible = !this.cursorVisible, this.changed();
		}, 530);
	}
	stopCursorBlink() {
		this.cursorBlinkInterval !== void 0 && (clearInterval(this.cursorBlinkInterval), this.cursorBlinkInterval = void 0), this.cursorVisible = !0;
	}
	setTheme(e) {
		this.changed(), this.theme = {
			...X,
			...e
		}, this.background = this.themeBackground(), this.needsFullRender = !0;
	}
	setFontSize(e) {
		this.changed(), this.fontSize = e, this.metrics = this.measureFont();
	}
	setFontFamily(e) {
		this.changed(), this.fontFamily = e, this.metrics = this.measureFont();
	}
	setFocused(e) {
		this.changed(), this.focused = e;
	}
	setCursorStyle(e) {
		this.changed(), this.cursorStyle = e;
	}
	setCursorBlink(e) {
		this.changed(), this.cursorBlink = e, this.applyCursorBlink(e);
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
			x: this.cssWidth - ut - lt,
			width: lt
		};
	}
	getScrollbarThumb(e, t, n) {
		let { x: r, width: i } = this.getScrollbarRect(), a = dt, o = Math.max(0, this.cssHeight - 8);
		if (t <= 0) return {
			x: r,
			width: i,
			trackY: a,
			trackHeight: o,
			y: a,
			height: o
		};
		let s = t + n, c = Math.min(o, Math.max(ft, n / s * o)), l = Math.max(0, Math.min(1, e / t));
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
		this.changed();
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
		e !== this.hoveredHyperlinkId && (this.hoveredHyperlinkId = e, this.changed());
	}
	getHoveredHyperlinkId() {
		return this.hoveredHyperlinkId;
	}
	setHoveredLinkRange(e) {
		let t = ct(this.hoveredLinkRange, e);
		this.hoveredLinkRange = e, t || this.changed();
	}
	get charWidth() {
		return this.metrics.width;
	}
	get charHeight() {
		return this.metrics.height;
	}
	clear() {
		this.changed(), this.ctx.clearRect(0, 0, this.cssWidth, this.cssHeight), this.ctx.fillStyle = this.background, this.ctx.fillRect(0, 0, this.cssWidth, this.cssHeight), this.drawnCursor = null, this.needsFullRender = !0;
	}
	dispose() {
		this.stopCursorBlink();
	}
};
function mt(e, t) {
	return e === null || t === null ? e === t : e.x === t.x && e.y === t.y && e.width === t.width && e.shape === t.shape && e.color === t.color;
}
// lib/scrollbar.ts
var ht = 1500, gt = 200, _t = class {
	constructor(e) {
		this.host = e, this.drag = null, this.fade = {
			from: 0,
			to: 0,
			start: 0
		};
	}
	get dragging() {
		return this.drag !== null;
	}
	isOver(e) {
		let t = this.host.canvas();
		if (!t || this.host.scrollbackLength() === 0) return !1;
		let n = e.clientX - t.getBoundingClientRect().left, r = this.host.thumb();
		return n >= r.x && n <= r.x + r.width;
	}
	press(e) {
		let t = this.host.canvas();
		if (!t) return;
		let n = e.clientY - t.getBoundingClientRect().top, r = this.host.thumb();
		if (n >= r.y && n <= r.y + r.height) this.drag = {
			startY: n,
			startViewportY: this.host.viewportY()
		}, t.style.userSelect = "none", t.style.webkitUserSelect = "none", this.show();
		else {
			let e = 1 - (n - r.trackY) / r.trackHeight;
			this.host.scrollTo(Math.round(e * this.host.scrollbackLength()));
		}
	}
	move(e) {
		let t = this.drag, n = this.host.canvas();
		if (!t || !n) return !1;
		let r = this.host.scrollbackLength();
		if (r === 0) return !0;
		let i = e.clientY - n.getBoundingClientRect().top - t.startY, a = this.host.thumb(), o = a.trackHeight - a.height;
		if (o <= 0) return !0;
		let s = Math.round(-i / o * r);
		return this.host.scrollTo(t.startViewportY + s), !0;
	}
	release() {
		if (!this.drag) return;
		this.drag = null;
		let e = this.host.canvas();
		e && (e.style.userSelect = "", e.style.webkitUserSelect = ""), this.host.scrollbackLength() > 0 && this.show();
	}
	show() {
		this.clearHideTimeout(), this.fadeTo(1), this.drag || (this.hideTimeout = window.setTimeout(() => {
			this.hideTimeout = void 0, this.fadeTo(0);
		}, ht));
	}
	get opacity() {
		let { from: e, to: t, start: n } = this.fade, r = Math.min(1, (performance.now() - n) / gt);
		return e + (t - e) * Math.max(0, r);
	}
	get settled() {
		return this.opacity === this.fade.to;
	}
	fadeTo(e) {
		this.fade.to !== e && (this.fade = {
			from: this.opacity,
			to: e,
			start: performance.now()
		}, this.host.requestRender());
	}
	clearHideTimeout() {
		this.hideTimeout !== void 0 && (window.clearTimeout(this.hideTimeout), this.hideTimeout = void 0);
	}
	dispose() {
		this.clearHideTimeout(), this.drag = null;
	}
}, vt = class e {
	static {
		this.AUTO_SCROLL_INTERVAL = 30;
	}
	constructor(e, t, n, r, i) {
		this.pointer = i, this.gesture = null, this.isSelecting = !1, this.mouseDownTarget = null, this.lastPointer = {
			x: 0,
			y: 0
		}, this.rectangle = !1, this.textareaStyle = null, this.selectionChangedEmitter = new q(), this.boundMouseUpHandler = null, this.boundContextMenuHandler = null, this.boundClickHandler = null, this.boundDocumentMouseMoveHandler = null, this.boundDocumentMouseDownHandler = null, this.autoScrollInterval = null, this.restoreTextarea = () => {
			document.removeEventListener("mousedown", this.restoreTextarea, !0), document.removeEventListener("keydown", this.restoreTextarea, !0), this.textarea.removeEventListener("blur", this.restoreTextarea), this.textareaStyle !== null && (this.textarea.style.cssText = this.textareaStyle, this.textareaStyle = null, this.textarea.value = "");
		}, this.terminal = e, this.renderer = t, this.wasmTerm = n, this.textarea = r, this.attachEventListeners();
	}
	getGesture() {
		return this.gesture ??= this.wasmTerm.createSelectionGesture(), this.gesture;
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
		this.selectionChangedEmitter.dispose(), this.stopAutoScroll(), this.restoreTextarea(), this.gesture?.dispose(), this.gesture = null, this.boundMouseUpHandler &&= (document.removeEventListener("mouseup", this.boundMouseUpHandler), null), this.boundDocumentMouseMoveHandler &&= (document.removeEventListener("mousemove", this.boundDocumentMouseMoveHandler), null), this.boundDocumentMouseDownHandler &&= (document.removeEventListener("mousedown", this.boundDocumentMouseDownHandler), null), this.boundContextMenuHandler &&= (this.renderer.getCanvas().removeEventListener("contextmenu", this.boundContextMenuHandler), null), this.boundClickHandler &&= (document.removeEventListener("click", this.boundClickHandler), null);
	}
	geometry() {
		let e = this.renderer.getMetrics();
		return {
			columns: this.terminal.cols,
			cellWidth: e.width,
			screenHeight: this.terminal.rows * e.height
		};
	}
	dragTo(e, t, n) {
		this.lastPointer = {
			x: e,
			y: t
		}, this.rectangle = n;
		let r = this.pixelToCell(e, t);
		this.getGesture().drag(r.col, r.row, e, t, this.geometry(), this.rectangle), this.getGesture().autoscroll() === x.NONE ? this.stopAutoScroll() : this.startAutoScroll();
	}
	attachEventListeners() {
		let t = this.renderer.getCanvas();
		t.addEventListener("mousedown", (t) => {
			if (t.button === 2 || t.button === 0 && t.ctrlKey && e.isMac()) {
				this.prepareContextMenu(t.clientX, t.clientY);
				return;
			}
			if (t.button !== 0 || (this.pointer.gestureTarget() ?? this.pointer.targetFor(t)) !== "selection") return;
			this.textarea.focus();
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
			let { x: e, y: t } = this.lastPointer, n = this.pixelToCell(e, t), r = this.getGesture().autoscrollTick(n.col, n.row, e, t, this.geometry(), this.rectangle);
			this.terminal.scrollToViewportOffset(this.wasmTerm.getViewportOffset()), r && this.getGesture().autoscroll() !== x.NONE || this.stopAutoScroll();
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
}, yt = { "1.0.0": "18" }, bt = Object.values(yt).at(-1), xt = class {
	constructor(e) {
		this.warned = !1;
		let t = yt[e?.version ?? ""] ?? bt;
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
}, St = 12, Ct = 65536;
function wt(e, t) {
	if (e.length <= t) return [e, null];
	let n = t;
	if (typeof e == "string") {
		let t = e.charCodeAt(n - 1);
		return t >= 55296 && t <= 56319 && n--, [e.slice(0, n), e.slice(n)];
	}
	for (; n > t - 3 && (e[n] & 192) == 128;) n--;
	return [e.subarray(0, n), e.subarray(n)];
}
var Tt = class {
	constructor(e = {}) {
		this.oscParser = new rt(), this.dataEmitter = new q(), this.resizeEmitter = new q(), this.bellEmitter = new q(), this.selectionChangeEmitter = new q(), this.keyEmitter = new q(), this.titleChangeEmitter = new q(), this.scrollEmitter = new q(), this.renderEmitter = new q(), this.cursorMoveEmitter = new q(), this.workingDirectoryEmitter = new q(), this.clipboardWriteEmitter = new q(), this.notificationEmitter = new q(), this.progressEmitter = new q(), this.programStatusEmitter = new q(), this.semanticPromptEmitter = new q(), this.lineFeedEmitter = new q(), this.writeParsedEmitter = new q(), this.onData = this.dataEmitter.event, this.onResize = this.resizeEmitter.event, this.onBell = this.bellEmitter.event, this.onSelectionChange = this.selectionChangeEmitter.event, this.onKey = this.keyEmitter.event, this.onTitleChange = this.titleChangeEmitter.event, this.onScroll = this.scrollEmitter.event, this.onRender = this.renderEmitter.event, this.onCursorMove = this.cursorMoveEmitter.event, this.onLineFeed = this.lineFeedEmitter.event, this.onWriteParsed = this.writeParsedEmitter.event, this.onWorkingDirectoryChange = this.workingDirectoryEmitter.event, this.onClipboardWrite = this.clipboardWriteEmitter.event, this.onNotification = this.notificationEmitter.event, this.onProgress = this.progressEmitter.event, this.onProgramStatus = this.programStatusEmitter.event, this.onSemanticPrompt = this.semanticPromptEmitter.event, this.isOpen = !1, this.isDisposed = !1, this.refreshPending = !1, this.pendingWrites = [], this.writing = !1, this.awaitingEcho = !1, this.listenerRemovers = [], this.addons = [], this.markerRegistry = new Qe(), this.decorationService = new Le({
			gridSize: () => ({
				cols: this.cols,
				rows: this.rows
			}),
			cellSize: () => this.renderer?.getMetrics(),
			topLine: () => this.topLine(),
			isAlternateScreen: () => this.wasmTerm?.isAlternateScreen() ?? !1,
			requestRender: () => this.requestRender()
		}), this.currentTitle = "", this.viewportY = 0, this.targetViewportY = 0, this.lastScrollTop = 0, this.wheelLineRemainder = 0, this.lastCursor = {
			x: 0,
			y: 0
		}, this.lastAltScreen = !1, this.resetPending = !1, this.scrollbar = new _t({
			canvas: () => this.canvas,
			thumb: () => this.renderer.getScrollbarThumb(this.viewportY, this.getScrollbackLength(), this.rows),
			scrollbackLength: () => this.getScrollbackLength(),
			viewportY: () => this.viewportY,
			scrollTo: (e) => this.scrollToViewportOffset(e),
			requestRender: () => this.requestRender()
		}), this.animateScroll = () => {
			if (this.scrollAnimationFrame = void 0, !this.wasmTerm) return;
			let e = this.options.smoothScrollDuration ?? 100, t = this.targetViewportY - this.viewportY;
			if (Math.abs(t) < .01) this.setViewportY(this.targetViewportY);
			else {
				let n = 1 - (1 / (e / 1e3 * 60)) ** 2;
				this.setViewportY(this.viewportY + t * n), this.scrollAnimationFrame = requestAnimationFrame(this.animateScroll);
			}
			this.fireScrollIfMoved(), this.getScrollbackLength() > 0 && this.scrollbar.show();
		}, this.drawFrame = () => {
			if (this.animationFrameId = void 0, this.isDisposed || !this.isOpen || !this.wasmTerm) return;
			this.renderFrame(!1);
			let e = this.wasmTerm.getCursor();
			(e.x !== this.lastCursor.x || e.y !== this.lastCursor.y) && (this.lastCursor = {
				x: e.x,
				y: e.y
			}, this.cursorMoveEmitter.fire()), this.scrollbar.settled || this.requestRender();
			let t = this.wasmTerm.renderHoldRemaining();
			t !== null && this.renderHoldTimeout === void 0 && (this.renderHoldTimeout = window.setTimeout(() => {
				this.renderHoldTimeout = void 0, this.requestRender();
			}, t + 1));
		}, this.handleMouseMove = (e) => {
			this.scrollbar.move(e) || this.linkHover?.move(e);
		}, this.handleWheel = (e) => {
			if (!this.pointer || this.pointer.wheelTarget(e) === "program" || this.customWheelEventHandler && this.customWheelEventHandler(e) === !1) return;
			e.preventDefault(), e.stopPropagation();
			let t = this.wheelDeltaLines(e);
			if (t !== 0) {
				if (this.wasmTerm?.isAlternateScreen()) {
					if (!this.wasmTerm.getMode(1007, !1)) return;
					this.wheelLineRemainder += t;
					let e = Math.trunc(this.wheelLineRemainder);
					if (e === 0) return;
					this.wheelLineRemainder -= e;
					let n = e < 0 ? I.UP : I.DOWN;
					for (let t = 0; t < Math.min(Math.abs(e), this.rows); t++) this.inputHandler?.sendKey(n);
				} else this.wheelLineRemainder = 0, this.smoothScrollTo(this.targetViewportY - t);
			}
		}, this.handleMouseDown = (e) => {
			this.pointer && this.pointer.press(e) === "scrollbar" && (e.preventDefault(), this.scrollbar.press(e));
		}, this.ghostty = e.ghostty ?? Ae(), this.unicode = new xt(this.ghostty);
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
			return Reflect.set(e, t, n), !this.isDisposed && typeof t == "string" && this.handleOptionChange(t, n, r), !0;
		} }), this.cols = this.options.cols, this.rows = this.options.rows, this.wasmTerm = this.ghostty.createTerminal(this.cols, this.rows, this.buildWasmConfig()), this.wasmTerm.onChange = () => this.requestRender(), this.connectEffects(this.wasmTerm), this.linkDetector = new qe(this), this.linkDetector.registerProvider(new at(this)), this.linkDetector.registerProvider(new st(this));
		let n = this.linkDetector;
		this.linkHover = new Ye({
			links: n,
			canvas: () => this.canvas,
			element: () => this.element,
			renderer: () => this.renderer,
			rows: () => this.rows,
			viewportLine: (e) => this.wasmTerm?.getViewportLine(e) ?? null,
			viewportRowToBufferRow: (e) => this.viewportRowToBufferRow(e),
			bufferRowToViewportRow: (e) => this.bufferRowToViewportRow(e),
			programPointerShape: () => this.pointerShape()
		}), this.bufferNamespace = new Me(this), this.buffer = this.bufferNamespace, this.parser = this.oscParser;
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
				this.viewportY > e && this.scrollToViewportOffset(e), this.syncViewport(), this.fireScrollIfMoved();
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
			...X,
			...this.options.theme
		}, t = (e) => Z(e);
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
		this.element = e, this.isOpen = !0;
		try {
			this.parentState = {
				tabindex: e.getAttribute("tabindex"),
				cursor: e.style.cursor
			}, e.hasAttribute("tabindex") || e.setAttribute("tabindex", "0"), e.setAttribute("contenteditable", "true"), this.listen(e, "beforeinput", (e) => {
				e.target !== this.textarea && e.preventDefault();
			}), e.setAttribute("role", "textbox"), e.setAttribute("aria-label", "Terminal input"), e.setAttribute("aria-multiline", "true"), this.canvas = document.createElement("canvas"), this.canvas.style.display = "block", this.canvas.style.cursor = "text", e.appendChild(this.canvas), this.textarea = document.createElement("textarea"), this.textarea.setAttribute("autocorrect", "off"), this.textarea.setAttribute("autocapitalize", "off"), this.textarea.setAttribute("spellcheck", "false"), this.textarea.setAttribute("tabindex", "0"), this.textarea.setAttribute("aria-label", "Terminal input"), this.textarea.style.position = "absolute", this.textarea.style.left = "0", this.textarea.style.top = "0", this.textarea.style.width = "1px", this.textarea.style.height = "1px", this.textarea.style.padding = "0", this.textarea.style.border = "none", this.textarea.style.margin = "0", this.textarea.style.opacity = "0", this.textarea.style.clipPath = "inset(50%)", this.textarea.style.overflow = "hidden", this.textarea.style.whiteSpace = "nowrap", this.textarea.style.resize = "none", e.appendChild(this.textarea);
			let t = this.textarea;
			this.listen(this.canvas, "mousedown", (e) => {
				e.preventDefault(), t.focus();
			}), this.listen(this.canvas, "touchend", (e) => {
				e.preventDefault(), t.focus();
			}), this.renderer = new pt(this.canvas, {
				fontSize: this.options.fontSize,
				fontFamily: this.options.fontFamily,
				cursorStyle: this.options.cursorStyle,
				cursorBlink: this.options.cursorBlink,
				theme: this.options.theme,
				allowTransparency: this.options.allowTransparency
			}), this.renderer.onChange = () => this.requestRender(), this.renderer.resize(this.cols, this.rows), this.renderer.setHighlightProvider(() => [...this.searchHighlights?.() ?? [], ...this.decorationService.highlights()]), this.decorationService.attach(e, this.canvas), this.renderer.setFocused(document.activeElement === this.textarea), this.listen(this.textarea, "focus", () => this.setRendererFocus(!0)), this.listen(this.textarea, "blur", () => this.setRendererFocus(!1));
			let n = this.canvas, r = this.renderer, i = {
				hasMouseTracking: () => this.wasmTerm?.hasMouseTracking() ?? !1,
				getScreenSize: () => ({
					width: this.cols * r.charWidth,
					height: this.rows * r.charHeight
				}),
				getCellDimensions: () => ({
					width: r.charWidth,
					height: r.charHeight
				}),
				getCanvasOffset: () => {
					let e = n.getBoundingClientRect();
					return {
						left: e.left,
						top: e.top
					};
				}
			};
			this.pointer = new it({
				overScrollbar: (e) => !!this.renderer && this.scrollbar.isOver(e),
				programTracksMouse: () => this.wasmTerm?.hasMouseTracking() ?? !1
			}), this.inputHandler = new He({
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
				mouseConfig: i,
				pointer: this.pointer
			}), this.syncCellPixelSize(), this.inputHandler.onSelectionAdjusted = () => this.selectionChangeEmitter.fire(), this.selectionManager = new vt(this, this.renderer, this.wasmTerm, this.textarea, this.pointer), this.selectionManager.onSelectionChange(() => {
				this.selectionChangeEmitter.fire();
			}), this.listen(e, "mousedown", this.handleMouseDown, { capture: !0 }), this.listen(e, "mousemove", this.handleMouseMove), this.listen(e, "mouseleave", () => this.linkHover?.leave()), this.listen(e, "click", (e) => {
				this.pointer?.gestureTarget() !== "scrollbar" && this.linkHover?.click(e);
			}), this.listen(document, "mouseup", () => this.scrollbar.release()), this.listen(e, "wheel", this.handleWheel, {
				passive: !1,
				capture: !0
			}), document.fonts && this.listen(document.fonts, "loadingdone", () => {
				this.renderer?.remeasureFont() && this.handleFontChange();
			}), this.watchDevicePixelRatio(), this.renderFrame(!0), this.focus();
		} catch (e) {
			throw this.cleanupView(), this.isOpen = !1, Error(`Failed to open terminal: ${e}`, { cause: e });
		}
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
		}), !this.writing && this.writeContinuation === void 0 && this.flushPendingWrites();
	}
	flushPendingWrites() {
		if (this.writing || this.isDisposed) return;
		this.cancelWriteContinuation(), this.writing = !0;
		let e = performance.now(), t = !1, n = !1;
		try {
			for (; this.pendingWrites.length > 0 && !this.isDisposed;) {
				if (t && performance.now() - e >= St) {
					n = !0;
					break;
				}
				let r = this.pendingWrites[0], [i, a] = wt(r.data, Ct);
				a === null ? this.pendingWrites.shift() : r.data = a, this.writeInternal(i), t = !0, a === null && r.callback && queueMicrotask(r.callback);
			}
		} finally {
			this.writing = !1;
		}
		t && !this.isDisposed && (this.writeParsedEmitter.fire(), this.pendingWrites.length !== 0 && (n ? this.writeContinuation = window.setTimeout(() => {
			this.writeContinuation = void 0, this.flushPendingWrites();
		}, 0) : this.flushPendingWrites()));
	}
	cancelWriteContinuation() {
		this.writeContinuation !== void 0 && (clearTimeout(this.writeContinuation), this.writeContinuation = void 0);
	}
	writeInternal(e) {
		let t = Math.max(0, Math.floor(this.viewportY)), n = this.wasmTerm;
		if (this.oscParser.hasOscHandlers || n.capturingOsc ? n.writeCapturingOsc(e, (e) => this.oscParser.handleOsc(e)) : n.write(e), this.markerRegistry.update(), this.lineFeedEmitter.hasListeners) for (let t = nt(e); t > 0; t--) this.lineFeedEmitter.fire();
		t > 0 && this.followScrolledContent(t), this.resetPending && (this.resetPending = !1, this.afterReset()), this.checkBufferChange(), this.fireScrollIfMoved(), this.processTerminalResponses(), this.linkDetector?.invalidateCache(), this.linkHover?.refresh(), this.linkHover?.updatePointerShape(), this.awaitingEcho && (this.awaitingEcho = !1, this.renderer && this.wasmTerm && this.renderFrame(!1));
	}
	writeln(e, t) {
		if (typeof e == "string") this.write(e + "\r\n", t);
		else {
			let n = new Uint8Array(e.length + 2);
			n.set(e), n[e.length] = 13, n[e.length + 1] = 10, this.write(n, t);
		}
	}
	paste(e) {
		if (this.assertNotDisposed(), this.options.disableStdin) return;
		this.awaitingEcho = !0;
		let t = this.wasmTerm.encodePaste(e);
		t && this.dataEmitter.fire(t);
	}
	input(e, t = !0) {
		this.assertNotDisposed(), this.options.disableStdin || (t && (this.viewportY !== 0 && this.scrollToBottom(), this.awaitingEcho = !0), this.dataEmitter.fire(e));
	}
	resize(e, t) {
		if (this.isDisposed) throw Error("Terminal has been disposed");
		if (e === this.cols && t === this.rows) return;
		this.rawOptions.cols = e, this.rawOptions.rows = t, this.cols = e, this.rows = t, this.wasmTerm.resize(e, t), this.markerRegistry.update(), this.renderer?.resize(e, t);
		let n = this.getScrollbackLength();
		(this.viewportY > n || this.targetViewportY > n) && this.scrollToViewportOffset(Math.min(this.viewportY, n)), this.syncViewport(), this.resizeEmitter.fire({
			cols: e,
			rows: t
		}), this.renderFrame(!0);
	}
	clear() {
		this.assertNotDisposed();
		let e = this.wasmTerm;
		(e.getCursor().y > 0 || e.getScrollbackLength() > 0) && this.markerRegistry.clear(), e.clearToCursorLine(), this.selectionManager?.clearSelection(), this.linkDetector?.invalidateCache(), this.scrollToViewportOffset(0), this.fireScrollIfMoved();
	}
	reset() {
		this.assertNotDisposed(), this.wasmTerm.reset(), this.afterReset();
	}
	checkBufferChange() {
		let e = this.wasmTerm?.isAlternateScreen() ?? !1;
		e !== this.lastAltScreen && (this.lastAltScreen = e, e || this.markerRegistry.disposeAlternate(), this.bufferNamespace._fireBufferChange(this.buffer.active));
	}
	afterReset() {
		this.markerRegistry.clear(), this.selectionManager?.clearSelection(), this.linkDetector?.invalidateCache(), this.cancelScrollAnimation(), this.setViewportY(0), this.targetViewportY = 0, this.fireScrollIfMoved(), this.linkHover?.reset(), this.renderer?.clear(), this.checkBufferChange(), this.currentTitle !== "" && (this.currentTitle = "", this.titleChangeEmitter.fire(""));
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
		!this.renderer || Number.isNaN(e) || Number.isNaN(t) || Math.min(e, t) > this.rows - 1 || Math.max(e, t) < 0 || (this.refreshPending = !0, this.requestRender());
	}
	getMetrics() {
		return this.renderer?.getMetrics();
	}
	setScrollbarGutter(e) {
		this.renderer?.setScrollbarGutter(e);
	}
	setHighlightProvider(e) {
		this.searchHighlights = e, this.requestRender();
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
		this.assertNotDisposed();
		let t = this.wasmTerm, n = t.getScrollbackLength() + t.getCursor().y + e;
		return this.markerRegistry.create(t, n);
	}
	registerDecoration(e) {
		return this.decorationService.register(e);
	}
	registerLinkProvider(e) {
		this.assertNotDisposed(), this.linkDetector.registerProvider(e);
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
		return !this.wasmTerm || !this.wasmTerm.scrollToPrompt(e) ? !1 : (this.scrollToViewportOffset(this.wasmTerm.getViewportOffset()), !0);
	}
	scrollToViewportOffset(e) {
		let t = this.getScrollbackLength(), n = Math.max(0, Math.min(t, e));
		this.cancelScrollAnimation(), this.targetViewportY = n, n !== this.viewportY && (this.setViewportY(n), this.fireScrollIfMoved(), t > 0 && this.scrollbar.show());
	}
	setViewportY(e) {
		this.viewportY = e, this.syncViewport(), this.requestRender();
	}
	syncViewport() {
		this.wasmTerm?.setViewportOffset(Math.max(0, Math.floor(this.viewportY)));
	}
	topLine() {
		return Math.max(0, this.getScrollbackLength() - Math.max(0, Math.floor(this.viewportY)));
	}
	fireScrollIfMoved() {
		let e = this.topLine();
		e !== this.lastScrollTop && (this.lastScrollTop = e, this.scrollEmitter.fire(e), this.linkHover?.refresh());
	}
	cancelScrollAnimation() {
		this.scrollAnimationFrame !== void 0 && (cancelAnimationFrame(this.scrollAnimationFrame), this.scrollAnimationFrame = void 0);
	}
	followScrolledContent(e) {
		let t = this.wasmTerm.getViewportOffset() - e;
		t !== 0 && (this.setViewportY(Math.max(0, this.viewportY + t)), this.targetViewportY = Math.max(0, this.targetViewportY + t));
	}
	smoothScrollTo(e) {
		this.wasmTerm && ((this.options.smoothScrollDuration ?? 100) === 0 ? this.scrollToViewportOffset(e) : (this.targetViewportY = Math.max(0, Math.min(this.getScrollbackLength(), e)), this.scrollAnimationFrame === void 0 && this.animateScroll()));
	}
	dispose() {
		if (!this.isDisposed) {
			this.isDisposed = !0, this.cancelRender(), this.cancelWriteContinuation(), this.pendingWrites.length = 0, this.cancelScrollAnimation();
			for (let e of this.addons) e.dispose();
			this.addons = [], this.cleanupView(), this.freeTerminal(), this.isOpen = !1, this.dataEmitter.dispose(), this.resizeEmitter.dispose(), this.bellEmitter.dispose(), this.selectionChangeEmitter.dispose(), this.keyEmitter.dispose(), this.titleChangeEmitter.dispose(), this.scrollEmitter.dispose(), this.renderEmitter.dispose(), this.cursorMoveEmitter.dispose(), this.workingDirectoryEmitter.dispose(), this.clipboardWriteEmitter.dispose(), this.notificationEmitter.dispose(), this.progressEmitter.dispose(), this.programStatusEmitter.dispose(), this.semanticPromptEmitter.dispose(), this.lineFeedEmitter.dispose(), this.writeParsedEmitter.dispose();
		}
	}
	cancelRender() {
		this.animationFrameId !== void 0 && (cancelAnimationFrame(this.animationFrameId), this.animationFrameId = void 0), this.renderHoldTimeout !== void 0 && (clearTimeout(this.renderHoldTimeout), this.renderHoldTimeout = void 0);
	}
	setRendererFocus(e) {
		this.renderer?.setFocused(e), this.renderFrame(!1);
	}
	renderFrame(e) {
		if (!this.renderer || !this.wasmTerm) return;
		e ||= this.refreshPending, this.refreshPending = !1;
		let t = this.renderer.render(this.wasmTerm, e, this.viewportY, this.scrollbar.opacity);
		this.decorationService.refresh(t !== null), t && this.renderEmitter.fire(t);
	}
	requestRender() {
		this.animationFrameId === void 0 && this.isOpen && !this.isDisposed && (this.animationFrameId = requestAnimationFrame(this.drawFrame));
	}
	getScrollbackLength() {
		return this.wasmTerm ? this.wasmTerm.getScrollbackLength() : 0;
	}
	cleanupView() {
		this.selectionManager &&= (this.selectionManager.dispose(), void 0), this.inputHandler &&= (this.inputHandler.dispose(), void 0), this.renderer &&= (this.renderer.dispose(), void 0), this.canvas && this.canvas.parentNode && (this.canvas.parentNode.removeChild(this.canvas), this.canvas = void 0), this.textarea && this.textarea.parentNode && (this.textarea.parentNode.removeChild(this.textarea), this.textarea = void 0);
		for (let e of this.listenerRemovers) e();
		this.listenerRemovers = [], this.stopWatchingDevicePixelRatio?.(), this.stopWatchingDevicePixelRatio = void 0, this.element && (this.element.removeAttribute("contenteditable"), this.element.removeAttribute("role"), this.element.removeAttribute("aria-label"), this.element.removeAttribute("aria-multiline"), this.parentState && (this.parentState.tabindex === null ? this.element.removeAttribute("tabindex") : this.element.setAttribute("tabindex", this.parentState.tabindex), this.element.style.cursor = this.parentState.cursor)), this.parentState = void 0, this.scrollbar.dispose(), this.linkHover?.dispose(), this.pointer = void 0, this.element = void 0, this.textarea = void 0;
	}
	freeTerminal() {
		this.linkDetector?.dispose(), this.linkDetector = void 0, this.linkHover = void 0, this.decorationService.dispose(), this.markerRegistry.dispose(), this.wasmTerm?.free(), this.wasmTerm = void 0, this.ghostty = void 0;
	}
	assertNotDisposed() {
		if (this.isDisposed) throw Error("Terminal has been disposed");
	}
	wheelDeltaLines(e) {
		switch (e.deltaMode) {
			case WheelEvent.DOM_DELTA_LINE: return e.deltaY;
			case WheelEvent.DOM_DELTA_PAGE: return e.deltaY * this.rows;
			default: return e.deltaY / (this.renderer?.getMetrics().height || 20);
		}
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
		return this.wasmTerm ? et(this.wasmTerm) : $e;
	}
	getMode(e, t = !1) {
		return this.assertNotDisposed(), this.wasmTerm.getMode(e, t);
	}
	hasBracketedPaste() {
		return this.assertNotDisposed(), this.wasmTerm.hasBracketedPaste();
	}
	hasFocusEvents() {
		return this.assertNotDisposed(), this.wasmTerm.hasFocusEvents();
	}
	hasMouseTracking() {
		return this.assertNotDisposed(), this.wasmTerm.hasMouseTracking();
	}
}, Et = 2, Dt = 1, Ot = 100, kt = class {
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
		let l = s - a - o, u = l - 15, d = c - r - i, f = Math.max(Et, Math.floor(u / e.width));
		return {
			cols: f,
			rows: Math.max(Dt, Math.floor(d / e.height)),
			gutter: Math.max(15, l - f * e.width)
		};
	}
	observeResize() {
		this._terminal?.element && (this._resizeObserver || (this._resizeObserver = new ResizeObserver((e) => {
			e[0] && (this._resizeDebounceTimer && clearTimeout(this._resizeDebounceTimer), this._resizeDebounceTimer = setTimeout(() => {
				this._resizeDebounceTimer = void 0, this.fit();
			}, Ot));
		}), this._resizeObserver.observe(this._terminal.element)));
	}
}, At = " ~!@#$%^&*()+`-=[]{}|\\;:\"',./<>?";
function Q(e, t, n, r) {
	return e < n || e === n && t < r;
}
var jt = class {
	constructor() {
		this.resultsEmitter = new q(), this.onDidChangeResults = this.resultsEmitter.event;
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
		this.search?.dispose(), this.search = void 0;
	}
	getSearch() {
		let e = this.terminal?.wasmTerm;
		if (e) return this.search ??= e.createSearch(), this.search;
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
		for (; a && Q(t, n, a.startRow, a.startCol) && e.selectedIndex < i;) e.next(), a = e.selectedMatch();
		return a && r === "previous" && Q(a.startRow, a.startCol, t, n) && e.selectedIndex > 0 && e.previous(), !0;
	}
	findText(e, t, n) {
		let r = this.terminal.wasmTerm, i = JSON.stringify([
			t.caseSensitive ? e : e.toLowerCase(),
			!!t.regex,
			!!t.wholeWord,
			!!t.caseSensitive
		]), a = this.textSearch, o = a && a.selected >= 0 ? a.matches[a.selected] : null, s = Nt(r, e, t), c = s.length, l = -1;
		if (c > 0) {
			let e = o ? s.findIndex((e) => Mt(e, o)) : -1;
			if (o && t.incremental) l = a.key === i && e >= 0 ? e : $(s, o, n);
			else if (o && a.key === i) {
				let t = e >= 0 ? e : $(s, o, n);
				l = e < 0 ? t : n === "next" ? (t - 1 + c) % c : (t + 1) % c;
			} else l = n === "next" ? c - 1 : 0;
		}
		if (this.textSearch = {
			key: i,
			matches: s,
			selected: l
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
			let t = o + e.rows - 1;
			i = s.matches.filter((e) => e.endRow >= o && e.startRow <= t), a = s.selected >= 0 ? s.matches[s.selected] : null;
		} else {
			let e = this.search;
			if (!e) return [];
			i = e.viewportMatches(), a = e.selectedMatch();
		}
		let c = [];
		for (let t of i) {
			let i = a !== null && Mt(t, a), s = i ? r : n;
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
function Mt(e, t) {
	return e.startRow === t.startRow && e.startCol === t.startCol && e.endRow === t.endRow && e.endCol === t.endCol;
}
function $(e, t, n) {
	let r = -1;
	for (let n = 0; n < e.length && !Q(t.startRow, t.startCol, e[n].startRow, e[n].startCol); n++) r = n;
	if (r < 0) return 0;
	let i = e[r], a = Q(i.startRow, i.startCol, t.startRow, t.startCol);
	return n === "previous" && a && r < e.length - 1 ? r + 1 : r;
}
function Nt(e, t, n) {
	let r, i = n.regex ? t : t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	if (n.regex || !n.caseSensitive) try {
		r = new RegExp(i, n.caseSensitive ? "g" : "gi");
	} catch {
		return [];
	}
	let a = e.getScrollbackLength() + e.rows, o = e.cols, s = (t) => ({
		y: t,
		line: new Y(e.getScreenLine(t) ?? [], e.isScreenRowWrapped(t), o)
	}), c = [], l = 0;
	for (; l < a;) {
		let i = [s(l++)];
		for (; l < a && e.isScreenRowWrapped(l);) i.push(s(l++));
		let { text: o, startCell: u, endCell: d } = ot(i, !0);
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
			if (e = i + 1, n.wholeWord && !Pt(o, i, a)) continue;
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
function Pt(e, t, n) {
	let r = (t) => t < 0 || t >= e.length || At.includes(e[t]);
	return r(t - 1) && r(t + n);
}
// lib/addons/serialize.ts
var Ft = /\x1b\[\?(?:47|1047|1049)h/g, It = _.ALL & ~_.PALETTE, Lt = _.MODES | _.KEYBOARD | _.KITTY_KEYBOARD, Rt = class {
	activate(e) {
		this.terminal = e;
	}
	dispose() {
		this.terminal = void 0;
	}
	serialize(e = {}) {
		let t = this.terminal?.wasmTerm;
		if (!t) return "";
		let n = It;
		e.excludeModes && (n &= ~Lt), e.includePalette && (n |= _.PALETTE);
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
		let s = o.replace(Ft, "");
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
export { kt as FitAddon, De as Ghostty, jt as SearchAddon, Rt as SerializeAddon, Tt as Terminal, Oe as init };
