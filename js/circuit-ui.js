/* ==========================================================================
   CIRCUIT UI — giao diện phòng mạch điện (KHTN 9, Bài 11–12). Nạp SAU circuit-lab.js (engine MNA).
   Thành phần:  board (bảng lắp mạch kéo-thả)  ohmLab  wireLab  bandsLab  compareLab
   Đăng ký vào window.LabSims: circ-h111, circ-ohm, circ-ohmlaw, circ-wire, circ-bands, circ-series, circ-parallel,
   circ-compare, circ-ex1, circ-ex2, circ-design.
   Thêm linh kiện mới (vd. Bài 13, Chương IV): thêm kiểu vào E.solve (circuit-lab.js), vào DRAW và PINS ở đây, và một nút trong TRAY.
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab, E = window.CircuitLab && window.CircuitLab.engine; if (!L || !E) return;
  const { fmt, pr, raf, clamp } = L;
  const $ = (s, r) => r.querySelector(s), $$ = (s, r) => Array.from(r.querySelectorAll(s));
  let uid = 0;
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const NS = 'http://www.w3.org/2000/svg';

  /* ------------------------------------------------------------ MÔ HÌNH BẢNG */
  const PINS = {
    src: (p) => ({ a: [p.x - 34, p.y], b: [p.x + 34, p.y] }),
    res: (p) => ({ a: [p.x - 34, p.y], b: [p.x + 34, p.y] }),
    lamp: (p) => ({ a: [p.x - 26, p.y], b: [p.x + 26, p.y] }),
    sw: (p) => ({ a: [p.x - 34, p.y], b: [p.x + 34, p.y] }),
    amm: (p) => ({ a: [p.x - 26, p.y], b: [p.x + 26, p.y] }),
    vol: (p) => ({ a: [p.x - 26, p.y], b: [p.x + 26, p.y] }),
    rheo: (p) => ({ a: [p.x - 44, p.y], b: [p.x + 44, p.y] })
  };
  const NAMES = { src: ['Nguồn', 'Source'], res: ['Điện trở', 'Resistor'], lamp: ['Bóng đèn', 'Bulb'], sw: ['Công tắc', 'Switch'], amm: ['Ampe kế', 'Ammeter'], vol: ['Vôn kế', 'Voltmeter'], rheo: ['Biến trở', 'Rheostat'] };
  const pinXY = (p, pin) => PINS[p.type](p)[pin];

  function elOf(p) {
    if (p.type === 'rheo') return { id: p.id, type: 'res', value: Math.max(p.frac * p.value, 1e-3) };
    return { id: p.id, type: p.type, value: p.value, closed: p.closed, vr: p.vr };
  }
  function solveBoard(S) {
    const ids = {}; S.parts.forEach((p) => { ids[p.id] = 1; });
    const wires = S.wires.filter((w) => ids[w[0].split('.')[0]] && ids[w[1].split('.')[0]]);
    const r = E.solve({ elements: S.parts.map(elOf), wires });
    // phát hiện mạch hở: có nguồn nhưng dòng nguồn ≈ 0 và không có cảnh báo khác
    const srcs = S.parts.filter((p) => p.type === 'src');
    r.open = r.ok && srcs.length > 0 && srcs.every((s) => Math.abs(r.el[s.id].I) < 1e-6);
    r.empty = srcs.length === 0;
    return r;
  }
  const MSG = {
    short: ['Chập mạch! Dây nối trực tiếp hai cực của nguồn nên dòng điện rất lớn. Hãy tháo dây đó.', 'Short circuit! A wire joins the two terminals of the source directly, so the current would be huge. Remove that wire.'],
    ammp: ['Ampe kế đang mắc song song, điện trở của nó rất nhỏ nên gây chập. Hãy mắc ampe kế nối tiếp với phần cần đo.', 'The ammeter is in parallel; its resistance is tiny, so it shorts the circuit. Connect it in series.'],
    vols: ['Vôn kế đang mắc nối tiếp nên gần như không có dòng điện chạy trong mạch. Hãy mắc vôn kế song song với phần cần đo.', 'The voltmeter is in series, so almost no current flows. Connect it in parallel across the part you measure.'],
    open: ['Mạch hở: chưa có đường kín từ cực dương qua các linh kiện về cực âm (hoặc công tắc đang mở), nên I = 0.', 'Open circuit: there is no closed path from the + terminal through the parts back to the − terminal (or the switch is open), so I = 0.'],
    empty: ['Hãy kéo một nguồn điện vào bảng, rồi nối dây.', 'Drag a power source onto the board, then connect wires.'],
    over: ['Dòng điện quá lớn! Hãy kiểm tra lại cách mắc.', 'The current is far too large! Check the wiring.'],
    ok: ['Mạch kín: dòng điện chạy từ cực dương của nguồn qua các linh kiện về cực âm.', 'Closed circuit: current flows from the + terminal of the source through the parts back to the − terminal.']
  };
  function statusOf(r) {
    if (r.warn.includes('short')) return MSG.short;
    if (r.warn.some((w) => w.startsWith('amm-parallel'))) return MSG.ammp;
    if (r.warn.some((w) => w.startsWith('vol-series'))) return MSG.vols;
    if (r.warn.includes('overload') || !r.ok) return MSG.over;
    if (r.empty) return MSG.empty;
    if (r.open) return MSG.open;
    return MSG.ok;
  }

  /* ------------------------------------------------------------ VẼ LINH KIỆN */
  const zig = (x, y, w, h) => { const n = 6, d = w / n; let s = 'M' + (x - w / 2) + ' ' + y; for (let i = 0; i < n; i++) s += ' L' + (x - w / 2 + d * (i + 0.5)).toFixed(1) + ' ' + (y + (i % 2 ? h : -h)); return s + ' L' + (x + w / 2) + ' ' + y; };
  const DRAW = {
    src: (p, o) => '<rect x="-24" y="-18" width="48" height="36" rx="6" class="cl__body"/><text x="-14" y="5" class="cl__sign" text-anchor="middle">+</text><text x="14" y="5" class="cl__sign" text-anchor="middle">−</text><text x="0" y="-24" class="cl__lab" text-anchor="middle">' + fmt(p.value, 1) + ' V</text><line x1="-34" y1="0" x2="-24" y2="0" class="cl__lead"/><line x1="24" y1="0" x2="34" y2="0" class="cl__lead"/>',
    res: (p) => '<line x1="-34" y1="0" x2="-22" y2="0" class="cl__lead"/><line x1="22" y1="0" x2="34" y2="0" class="cl__lead"/><path d="' + zig(0, 0, 44, 8) + '" class="cl__zig"/><text x="0" y="-16" class="cl__lab" text-anchor="middle">' + esc(p.name || 'R') + ' = ' + fmt(p.value, p.value % 1 ? 1 : 0) + ' Ω</text>',
    lamp: (p, o) => { const b = o && o.el ? clamp(o.el.bright || 0, 0, 1.6) : 0, burn = p.burnt; return '<circle r="' + (20 + b * 8).toFixed(1) + '" class="cl__glow" style="opacity:' + clamp(b * 0.75, 0, 0.9).toFixed(2) + '"/><circle r="15" class="cl__bulb' + (burn ? ' is-burnt' : '') + '"/><path d="M-9 -9 L9 9 M9 -9 L-9 9" class="cl__fil"/><text x="0" y="-26" class="cl__lab" text-anchor="middle">' + esc(p.name || 'Đ') + '</text><line x1="-26" y1="0" x2="-15" y2="0" class="cl__lead"/><line x1="15" y1="0" x2="26" y2="0" class="cl__lead"/>'; },
    sw: (p) => '<line x1="-34" y1="0" x2="-18" y2="0" class="cl__lead"/><line x1="18" y1="0" x2="34" y2="0" class="cl__lead"/><circle cx="-18" r="3.5" class="cl__pt"/><circle cx="18" r="3.5" class="cl__pt"/><line x1="-18" y1="0" x2="' + (p.closed ? 18 : 12) + '" y2="' + (p.closed ? 0 : -16) + '" class="cl__blade"/><text x="0" y="-24" class="cl__lab" text-anchor="middle">' + (p.closed ? 'đóng · closed' : 'mở · open') + '</text>',
    amm: (p, o) => meterSVG(p, o, 'A'),
    vol: (p, o) => meterSVG(p, o, 'V'),
    rheo: (p) => { const sx = -44 + 88 * p.frac; return '<line x1="-44" y1="0" x2="-36" y2="0" class="cl__lead"/><line x1="36" y1="0" x2="44" y2="0" class="cl__lead"/><rect x="-36" y="-7" width="72" height="14" rx="3" class="cl__body"/><path d="' + zig(0, 0, 60, 4) + '" class="cl__zig cl__zig--thin"/><g class="cl__slider" data-slide="' + p.id + '" tabindex="0" role="slider" aria-label="Con chạy biến trở / Rheostat slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + Math.round(p.frac * 100) + '" transform="translate(' + (sx * 0.82).toFixed(1) + ',-16)"><circle r="22" class="cl__hit"/><path d="M-7 -8 L7 -8 L0 4 Z" class="cl__tri"/></g><text x="0" y="22" class="cl__lab" text-anchor="middle">' + esc(p.name || 'Rb') + ' · ' + fmt(p.frac * p.value, 1) + ' Ω</text>'; }
  };
  function meterSVG(p, o, ch) {
    const v = o && o.el ? Math.abs(ch === 'A' ? o.el.I : o.el.V) : 0, lim = p.range || (ch === 'A' ? 3 : 15), f = clamp(v / lim, 0, 1.05), ang = -50 + 100 * f;
    return '<circle r="22" class="cl__meter' + (v > lim * 1.001 ? ' is-over' : '') + '"/><text x="0" y="-8" class="cl__mL" text-anchor="middle">' + ch + '</text><g transform="translate(0,12) rotate(' + ang.toFixed(1) + ')"><line y2="-22" class="cl__needle"/></g><line x1="-26" y1="0" x2="-22" y2="0" class="cl__lead"/><line x1="22" y1="0" x2="26" y2="0" class="cl__lead"/><text x="0" y="-28" class="cl__lab" text-anchor="middle">' + esc(p.name || ch) + '</text>';
  }

  /* ------------------------------------------------------------ ĐỒNG HỒ CÓ VẠCH CHIA (panel riêng) */
  function gaugeSVG(p, val, exact) {
    const lim = p.range, ch = p.type === 'amm' ? 'A' : 'V', unit = ch, v = Math.abs(val), f = clamp(v / lim, 0, 1.08), W = 220, cx = W / 2, cy = 112, R = 92, a0 = -58, a1 = 58;
    const pol = (a, r) => [cx + r * Math.sin(a * Math.PI / 180), cy - r * Math.cos(a * Math.PI / 180)];
    let t = '<path d="M' + pol(a0, R).map((n) => n.toFixed(1)).join(' ') + ' A' + R + ' ' + R + ' 0 0 1 ' + pol(a1, R).map((n) => n.toFixed(1)).join(' ') + '" class="cl__arc"/>';
    for (let i = 0; i <= 50; i++) {
      const a = a0 + (a1 - a0) * i / 50, big = i % 10 === 0, mid = i % 5 === 0, p1 = pol(a, R), p2 = pol(a, R - (big ? 14 : mid ? 10 : 6));
      t += '<line x1="' + p1[0].toFixed(1) + '" y1="' + p1[1].toFixed(1) + '" x2="' + p2[0].toFixed(1) + '" y2="' + p2[1].toFixed(1) + '" class="cl__tick' + (big ? ' cl__tick--big' : '') + '"/>';
      if (big) { const q = pol(a, R - 26); t += '<text x="' + q[0].toFixed(1) + '" y="' + (q[1] + 4).toFixed(1) + '" class="cl__num" text-anchor="middle">' + fmt(lim * i / 50, lim < 1 ? 1 : lim >= 10 ? 0 : (lim * i / 50) % 1 ? 1 : 0) + '</text>'; }
    }
    const na = a0 + (a1 - a0) * f;
    t += '<g transform="translate(' + cx + ',' + cy + ') rotate(' + na.toFixed(1) + ')"><line y1="6" y2="-' + (R - 8) + '" class="cl__needle"/></g><circle cx="' + cx + '" cy="' + cy + '" r="5" class="cl__hub"/><text x="' + cx + '" y="' + (cy - 44) + '" class="cl__mBig" text-anchor="middle">' + ch + '</text>';
    const sm = lim / 50;
    return '<svg viewBox="0 0 ' + W + ' 126" class="cl__gauge" role="img" aria-label="' + esc(p.name || ch) + (exact ? ': ' + fmt(v, 3) + ' ' + unit : '') + '">' + t + '</svg>' +
      '<p class="cl__gread">' + esc(p.name || ch) + ' · ' + pr('giới hạn ', 'range ') + '<b>' + fmt(lim, lim < 1 ? 1 : 0) + ' ' + unit + '</b> · ' + pr('vạch nhỏ nhất ', 'smallest division ') + '<b>' + fmt(sm, 3) + ' ' + unit + '</b>' + (exact ? ' · <b>' + fmt(v, 3) + ' ' + unit + '</b>' : '') + (v > lim * 1.001 ? ' · <b class="cl__warn">' + pr('Vượt giới hạn đo!', 'Over range!') + '</b>' : '') + '</p>';
  }
  const quant = (v, p) => { const step = p.range / 100; return Math.round(Math.abs(v) / step) * step; };

  /* ------------------------------------------------------------ MẠCH CÓ SẴN */
  let pid = 0;
  const mk = (type, x, y, o) => Object.assign({ id: (o && o.id) || type + (++pid), type, x, y, value: type === 'src' ? 12 : type === 'lamp' ? 6.25 : type === 'rheo' ? 30 : type === 'amm' ? 0 : type === 'vol' ? 0 : 6, frac: 0.5, closed: true, range: type === 'amm' ? 3 : type === 'vol' ? 15 : undefined, vr: 12 }, o || {});
  const PRESETS = {
    blank: () => ({ parts: [], wires: [] }),
    /* Hình 11.1: nguồn + bóng đèn + R1 (đã nối); R2, R3 để rời bên dưới */
    h111: () => ({
      parts: [mk('src', 90, 70, { id: 's', value: 12 }), mk('sw', 200, 70, { id: 'k' }), mk('lamp', 320, 70, { id: 'l', vr: 7 }), mk('res', 440, 70, { id: 'r1', value: 6, name: 'R1' }),
        mk('res', 160, 220, { id: 'r2', value: 10, name: 'R2' }), mk('res', 320, 220, { id: 'r3', value: 16, name: 'R3' }), mk('amm', 500, 220, { id: 'a', name: 'A', range: 0.6 })],
      wires: [['s.a', 'k.a'], ['k.b', 'l.a'], ['l.b', 'r1.a'], ['r1.b', 's.b']]
    }),
    /* Hình 11.2: nguồn, công tắc, biến trở, ampe kế nối tiếp với R; vôn kế song song với R */
    h112: () => ({
      parts: [mk('src', 80, 190, { id: 's', value: 12 }), mk('sw', 190, 60, { id: 'k' }), mk('rheo', 330, 60, { id: 'p', value: 30, frac: 0, name: 'Rb' }), mk('amm', 470, 60, { id: 'a', name: 'A', range: 3 }),
        mk('res', 440, 190, { id: 'r', value: 6, name: 'R' }), mk('vol', 440, 290, { id: 'v', name: 'V', range: 15 })],
      wires: [['s.a', 'k.a'], ['k.b', 'p.a'], ['p.b', 'a.a'], ['a.b', 'r.a'], ['r.b', 's.b'], ['v.a', 'r.a'], ['v.b', 'r.b']]
    }),
    /* Hình 12.1 / 12.2: hai điện trở nối tiếp và hai ampe kế */
    h121: () => ({
      parts: [mk('src', 80, 180, { id: 's', value: 12 }), mk('sw', 190, 60, { id: 'k' }), mk('amm', 300, 60, { id: 'a1', name: 'A1', range: 3 }), mk('res', 410, 60, { id: 'r1', value: 6, name: 'R1' }), mk('res', 410, 180, { id: 'r2', value: 10, name: 'R2' }), mk('res', 410, 290, { id: 'r3', value: 16, name: 'R3' }), mk('amm', 250, 290, { id: 'a2', name: 'A2', range: 3 })],
      wires: [['s.a', 'k.a'], ['k.b', 'a1.a'], ['a1.b', 'r1.a']]
    }),
    h122: () => ({
      parts: [mk('src', 80, 190, { id: 's', value: 6 }), mk('sw', 190, 60, { id: 'k' }), mk('amm', 300, 60, { id: 'a1', name: 'A1', range: 3 }), mk('res', 440, 130, { id: 'r1', value: 10, name: 'R1' }), mk('amm', 330, 130, { id: 'a2', name: 'A2', range: 3 }), mk('res', 440, 230, { id: 'r2', value: 6, name: 'R2' }), mk('amm', 330, 230, { id: 'a3', name: 'A3', range: 3 })],
      wires: [['s.a', 'k.a'], ['k.b', 'a1.a']]
    }),
    ex1: () => ({ parts: [mk('src', 80, 190, { id: 's', value: 5 }), mk('res', 300, 60, { id: 'r1', value: 2, name: 'R1' }), mk('res', 430, 60, { id: 'r2', value: 3, name: 'R2' }), mk('amm', 300, 280, { id: 'a', name: 'A', range: 3 })], wires: [] }),
    ex2: () => ({ parts: [mk('src', 80, 190, { id: 's', value: 24 }), mk('res', 400, 100, { id: 'r1', value: 20, name: 'R1' }), mk('res', 400, 230, { id: 'r2', value: 40, name: 'R2' }), mk('amm', 260, 60, { id: 'a', name: 'A', range: 3 })], wires: [] }),
    design: () => ({ parts: [mk('src', 80, 190, { id: 's', value: 12 }), mk('lamp', 300, 60, { id: 'l1', name: 'Đ1' }), mk('lamp', 300, 130, { id: 'l2', name: 'Đ2' }), mk('lamp', 300, 200, { id: 'l3', name: 'Đ3' }), mk('lamp', 300, 270, { id: 'l4', name: 'Đ4' }), mk('sw', 190, 60, { id: 'k' })], wires: [] })
  };
  const TRAY = [['src', 'Nguồn 6 V', 'Source 6 V', { value: 6 }], ['src', 'Nguồn 12 V', 'Source 12 V', { value: 12 }], ['sw', 'Công tắc', 'Switch', {}], ['lamp', 'Bóng đèn', 'Bulb', {}],
    ['res', 'R = 6 Ω', 'R = 6 Ω', { value: 6 }], ['res', 'R = 10 Ω', 'R = 10 Ω', { value: 10 }], ['res', 'R = 16 Ω', 'R = 16 Ω', { value: 16 }], ['rheo', 'Biến trở', 'Rheostat', {}], ['amm', 'Ampe kế', 'Ammeter', {}], ['vol', 'Vôn kế', 'Voltmeter', {}]];

  /* ------------------------------------------------------------ BẢNG LẮP MẠCH */
  /* o: { preset, tray (bool), table: 'none'|'ohm'|'free', graph, note, task {vi,en,check(sol,S)→[ok,viMsg,enMsg]}, burn (nút "cháy 1 bóng") } */
  function board(body, o) {
    o = Object.assign({ preset: 'blank', tray: true, table: 'none', graph: false, task: null, burn: false, hint: '' }, o || {});
    pid = 100;
    const id = 'cl' + (++uid), W = 600, H = 340, pre = PRESETS[o.preset]();
    const S = { parts: pre.parts, wires: pre.wires, sel: null, from: null, exact: false, snap: true, rows: [], drag: null, msg: null };
    const tr = o.tray ? '<div class="cl__tray" role="toolbar" aria-label="Linh kiện / Components">' + TRAY.map((t, i) => '<button type="button" class="btn btn--sm" data-add="' + i + '">+ ' + pr(t[1], t[2]) + '</button>').join('') + '</div>' : '';
    body.innerHTML = '<div class="olab cl" data-lab="' + id + '"><p class="olab__hint">' + (o.hint || pr('Kéo linh kiện để di chuyển. Kéo từ một đầu nối (chấm tròn) tới đầu nối khác để nối dây. Bấm vào dây hoặc linh kiện rồi bấm “Xoá” (hoặc phím Delete) để bỏ. Bấm vào công tắc để đóng/mở.', 'Drag parts to move them. Drag from one terminal (dot) to another to wire. Click a wire or part then press “Delete” to remove it. Click a switch to open or close it.')) + '</p>' + tr +
      '<div class="olab__cols"><div class="olab__stage cl__stage"><svg class="olab__svg cl__svg" viewBox="0 0 ' + W + ' ' + H + '" role="group" aria-label="Bảng lắp mạch điện / Circuit board" data-r="svg"></svg></div>' +
      '<div class="olab__panel"><div data-r="gauges" class="cl__gauges" aria-live="polite"></div><div class="olab__btns"><button type="button" class="btn btn--sm" data-act="del">' + pr('Xoá', 'Delete') + '</button><button type="button" class="btn btn--sm" data-act="exact" aria-pressed="false">' + pr('Hiện số chính xác', 'Show exact value') + '</button><button type="button" class="btn btn--sm" data-act="range">' + pr('Đổi giới hạn đo', 'Change range') + '</button>' + (o.burn ? '<button type="button" class="btn btn--sm" data-act="burn">' + pr('Một bóng cháy', 'One bulb burns out') + '</button>' : '') + '<button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button></div><div class="olab__read" data-r="read" aria-live="polite"></div></div></div>' +
      '<p class="olab__status" data-r="status" role="status"></p><div data-r="extra"></div></div>';
    const lab = $('[data-lab="' + id + '"]', body), svg = $('[data-r="svg"]', lab), q = (n) => $('[data-r="' + n + '"]', lab);
    let sol = null, focusId = null;
    const ptr = (e) => { const m = svg.getScreenCTM(); const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; const r = p.matrixTransform(m.inverse()); return [r.x, r.y]; };
    const part = (i) => S.parts.find((p) => p.id === i);
    const pinPos = (pin) => { const [i, k] = pin.split('.'), p = part(i); return p ? pinXY(p, k) : null; };
    const wirePath = (a, b) => { const dx = Math.max(30, Math.abs(b[0] - a[0]) * 0.4); return 'M' + a[0] + ' ' + a[1] + ' C' + (a[0] + (a[0] <= b[0] ? dx : -dx)) + ' ' + a[1] + ',' + (b[0] - (a[0] <= b[0] ? dx : -dx)) + ' ' + b[1] + ',' + b[0] + ' ' + b[1]; };

    function render() {
      sol = solveBoard(S);
      let h = '<rect width="' + W + '" height="' + H + '" class="cl__bg"/>';
      S.wires.forEach((w, i) => { const a = pinPos(w[0]), b = pinPos(w[1]); if (!a || !b) return; h += '<path d="' + wirePath(a, b) + '" class="cl__wire' + (S.sel === 'w' + i ? ' is-sel' : '') + '" data-wire="' + i + '"/><path d="' + wirePath(a, b) + '" class="cl__wirehit" data-wire="' + i + '"/>'; });
      S.parts.forEach((p) => {
        const el = sol.el[p.id], pins = PINS[p.type](p), aria = (NAMES[p.type][0] + ' ' + (p.name || '') + ' / ' + NAMES[p.type][1]).trim();
        h += '<g class="cl__part' + (S.sel === p.id ? ' is-sel' : '') + '" data-part="' + p.id + '" tabindex="0" role="button" aria-label="' + esc(aria) + '" transform="translate(' + p.x + ',' + p.y + ')"><rect x="-50" y="-34" width="100" height="68" class="cl__partbg"/>' + DRAW[p.type](p, { el }) + '</g>';
        Object.keys(pins).forEach((k) => { const c = pins[k]; h += '<g class="cl__pin' + (S.from === p.id + '.' + k ? ' is-from' : '') + (k === 'a' && (p.type === 'src') ? ' is-plus' : '') + '" data-pin="' + p.id + '.' + k + '" tabindex="0" role="button" aria-label="Đầu nối ' + k + ' của ' + esc(p.name || NAMES[p.type][0]) + ' / terminal ' + k + '" transform="translate(' + c[0] + ',' + c[1] + ')"><circle r="22" class="cl__hit"/><circle r="5.5" class="cl__dot"/></g>'; });
      });
      if (S.drag && S.drag.k === 'wire') { const a = pinPos(S.drag.from); if (a) h += '<path d="' + wirePath(a, S.drag.at) + '" class="cl__wire cl__wire--tmp"/>'; }
      svg.innerHTML = h;
      if (focusId) { const f = $('[data-part="' + focusId + '"]', svg) || $('[data-slide="' + focusId + '"]', svg); if (f && f.focus) f.focus({ preventScroll: true }); }
      // đồng hồ
      const ms = S.parts.filter((p) => p.type === 'amm' || p.type === 'vol');
      q('gauges').innerHTML = ms.map((p) => '<figure class="cl__gfig' + (S.sel === p.id ? ' is-sel' : '') + '" data-gauge="' + p.id + '">' + gaugeSVG(p, p.type === 'amm' ? sol.el[p.id].I : sol.el[p.id].V, S.exact) + '</figure>').join('');
      const st = statusOf(sol), stEl = q('status'); stEl.innerHTML = pr(st[0], st[1]); stEl.classList.toggle('olab__status--warn', !sol.ok || sol.open);
      readout(); extra();
    }
    function readout() {
      const rows = S.parts.filter((p) => p.type === 'res' || p.type === 'lamp' || p.type === 'rheo').map((p) => { const e = sol.el[p.id]; return '<tr><th scope="row">' + esc(p.name || NAMES[p.type][0]) + '</th><td>' + fmt(Math.abs(e.V), 2) + ' V</td><td>' + fmt(Math.abs(e.I), 3) + ' A</td></tr>'; }).join('');
      const s = S.parts.find((p) => p.type === 'src'), I = s ? Math.abs(sol.el[s.id].I) : 0;
      q('read').innerHTML = (rows ? '<table class="olab__tbl olab__tbl--read"><thead><tr><th></th><th>U</th><th>I</th></tr></thead><tbody>' + rows + '</tbody></table>' : '') + (s && I > 1e-6 ? '<p>I = <b>' + fmt(I, 3) + ' A</b> · R<sub>tđ</sub> = U/I = <b>' + fmt(s.value / I, 2) + ' Ω</b></p>' : '');
    }

    /* ---- tương tác ---- */
    function connect(a, b) {
      if (a === b || a.split('.')[0] === b.split('.')[0] && false) return;
      if (S.wires.some((w) => (w[0] === a && w[1] === b) || (w[0] === b && w[1] === a))) return;
      S.wires.push([a, b]); S.sel = null;
    }
    svg.addEventListener('pointerdown', (e) => {
      const slide = e.target.closest('[data-slide]'), pin = e.target.closest('[data-pin]'), pt = e.target.closest('[data-part]'), w = e.target.closest('[data-wire]');
      try { svg.setPointerCapture(e.pointerId); } catch (x) { /* bỏ qua */ }
      const at = ptr(e);
      if (slide) { S.drag = { k: 'slide', id: slide.dataset.slide }; focusId = slide.dataset.slide; moveSlide(at); e.preventDefault(); return; }
      if (pin) { const pn = pin.dataset.pin; if (S.from && S.from !== pn) { connect(S.from, pn); S.from = null; S.drag = null; render(); e.preventDefault(); return; } S.drag = { k: 'wire', from: pn, at, moved: false }; e.preventDefault(); return; }
      if (pt) { const p = part(pt.dataset.part); S.sel = p.id; focusId = p.id; S.drag = { k: 'part', id: p.id, dx: at[0] - p.x, dy: at[1] - p.y, moved: false, x0: at[0], y0: at[1] }; render(); e.preventDefault(); return; }
      if (w) { S.sel = 'w' + w.dataset.wire; render(); e.preventDefault(); return; }
      S.sel = null; S.from = null; render();
    });
    function moveSlide(at) { const p = part(S.drag.id), f = clamp((at[0] - (p.x - 36)) / 72, 0, 1); p.frac = Math.round(f * 50) / 50; if (o.onSlide) o.onSlide(p, S); render(); }
    svg.addEventListener('pointermove', (e) => {
      const d = S.drag; if (!d) return; const at = ptr(e);
      if (d.k === 'slide') { moveSlide(at); return; }
      if (d.k === 'wire') { d.at = at; d.moved = true; sched(); return; }
      if (d.k === 'part') { if (Math.hypot(at[0] - d.x0, at[1] - d.y0) > 4) d.moved = true; const p = part(d.id), g = S.snap ? 10 : 1; p.x = clamp(Math.round((at[0] - d.dx) / g) * g, 50, W - 50); p.y = clamp(Math.round((at[1] - d.dy) / g) * g, 36, H - 36); sched(); }
    });
    const sched = raf(render);
    const up = (e) => {
      const d = S.drag; if (!d) return; S.drag = null;
      if (d.k === 'wire') {
        const tgt = document.elementFromPoint(e.clientX, e.clientY), pin = tgt && tgt.closest ? tgt.closest('[data-pin]') : null;
        if (pin && pin.dataset.pin !== d.from) connect(d.from, pin.dataset.pin); else if (!d.moved) { S.from = S.from === d.from ? null : d.from; }
        else S.from = null;
      } else if (d.k === 'part' && !d.moved) { const p = part(d.id); if (p.type === 'sw') { p.closed = !p.closed; } }
      render();
    };
    svg.addEventListener('pointerup', up); svg.addEventListener('pointercancel', () => { S.drag = null; render(); });
    svg.addEventListener('keydown', (e) => {
      const t = e.target; if (!t.closest) return;
      const pt = t.closest('[data-part]'), pin = t.closest('[data-pin]'), sl = t.closest('[data-slide]');
      if (sl) { const p = part(sl.dataset.slide); const st = e.shiftKey ? 0.1 : 0.02; if (e.key === 'ArrowRight' || e.key === 'ArrowUp') p.frac = clamp(p.frac + st, 0, 1); else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') p.frac = clamp(p.frac - st, 0, 1); else return; p.frac = Math.round(p.frac * 50) / 50; e.preventDefault(); e.stopPropagation(); focusId = p.id + '_'; focusId = sl.dataset.slide; if (o.onSlide) o.onSlide(p, S); render(); return; }
      if (pin && (e.key === 'Enter' || e.key === ' ')) { const pn = pin.dataset.pin; e.preventDefault(); e.stopPropagation(); if (S.from && S.from !== pn) { connect(S.from, pn); S.from = null; } else S.from = S.from === pn ? null : pn; render(); return; }
      if (pt) {
        const p = part(pt.dataset.part), st = e.shiftKey ? 50 : 10; let m = true;
        if (e.key === 'ArrowRight') p.x = clamp(p.x + st, 50, W - 50); else if (e.key === 'ArrowLeft') p.x = clamp(p.x - st, 50, W - 50); else if (e.key === 'ArrowUp') p.y = clamp(p.y - st, 36, H - 36); else if (e.key === 'ArrowDown') p.y = clamp(p.y + st, 36, H - 36);
        else if ((e.key === 'Enter' || e.key === ' ') && p.type === 'sw') p.closed = !p.closed; else if (e.key === 'Delete' || e.key === 'Backspace') { delSel(p.id); focusId = null; render(); e.preventDefault(); e.stopPropagation(); return; } else m = false;
        if (m) { e.preventDefault(); e.stopPropagation(); S.sel = p.id; focusId = p.id; render(); }
      } else if (e.key === 'Delete' && S.sel) { delSel(S.sel); render(); e.stopPropagation(); }
    });
    function delSel(sel) {
      if (!sel) return;
      if (sel[0] === 'w' && /^w\d+$/.test(sel)) S.wires.splice(+sel.slice(1), 1);
      else { S.parts = S.parts.filter((p) => p.id !== sel); S.wires = S.wires.filter((w) => w[0].split('.')[0] !== sel && w[1].split('.')[0] !== sel); }
      S.sel = null;
    }
    lab.addEventListener('click', (e) => {
      const add = e.target.closest('[data-add]'), act = e.target.closest('[data-act]');
      if (add) { const t = TRAY[+add.dataset.add], n = S.parts.length; const p = mk(t[0], 120 + (n % 5) * 90, 60 + Math.floor(n / 5) * 70, Object.assign({}, t[3])); p.name = ({ res: 'R', lamp: 'Đ', amm: 'A', vol: 'V', rheo: 'Rb' })[t[0]] ? ({ res: 'R', lamp: 'Đ', amm: 'A', vol: 'V', rheo: 'Rb' })[t[0]] + (S.parts.filter((x) => x.type === t[0]).length + 1) : undefined; S.parts.push(p); S.sel = p.id; render(); return; }
      if (!act) return; const a = act.dataset.act;
      if (a === 'del') { delSel(S.sel); render(); }
      else if (a === 'exact') { S.exact = !S.exact; act.setAttribute('aria-pressed', S.exact); render(); }
      else if (a === 'range') { const targets = S.sel && part(S.sel) && (part(S.sel).type === 'amm' || part(S.sel).type === 'vol') ? [part(S.sel)] : S.parts.filter((p) => p.type === 'amm' || p.type === 'vol'); targets.forEach((p) => { const opts = p.type === 'amm' ? [0.6, 3] : [3, 15]; p.range = opts[(opts.indexOf(p.range) + 1) % opts.length]; }); render(); }
      else if (a === 'burn') { const ls = S.parts.filter((p) => p.type === 'lamp' && !p.burnt); if (ls.length) { const p = ls[ls.length - 1]; p.burnt = true; p.value = 1e9; render(); } }
      else if (a === 'reset') { pid = 100; const fresh = PRESETS[o.preset](); S.parts = fresh.parts; S.wires = fresh.wires; S.sel = null; S.from = null; S.rows = []; render(); }
    });
    document.addEventListener('keydown', onDoc); function onDoc(e) { if (!lab.isConnected) { document.removeEventListener('keydown', onDoc); return; } if (e.key === 'Delete' && S.sel && lab.contains(document.activeElement) && !/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) { delSel(S.sel); render(); } }

    /* ---- bảng số liệu, đồ thị, nhiệm vụ ---- */
    const U_ROWS = [0, 3, 6, 9, 12];
    function setU(U) {
      const p = S.parts.find((x) => x.type === 'rheo'), r = S.parts.find((x) => x.type === 'res'), k = S.parts.find((x) => x.type === 'sw'), s = S.parts.find((x) => x.type === 'src');
      if (!p || !r || !s) return;
      if (U <= 0) { if (k) k.closed = false; p.frac = 1; render(); return; }
      if (k) k.closed = true;
      const Rb = r.value * (s.value / U - 1); p.frac = clamp(Math.round(Rb / p.value * 50) / 50, 0, 1); render();
    }
    function extra() {
      const ex = q('extra'); if (!ex) return;
      if (o.table === 'ohm') {
        const A = S.parts.find((p) => p.type === 'amm'), Vm = S.parts.find((p) => p.type === 'vol'), R = S.parts.find((p) => p.type === 'res');
        const rows = U_ROWS.map((u) => { const r = S.rows.find((x) => x.u === u); return '<tr><th scope="row">' + fmt(u, 0) + '</th><td>' + (r ? fmt(r.i, 2) : '?') + '</td><td>' + (r && r.i > 0 ? fmt(u / r.i, 2) : '–') + '</td><td><button type="button" class="btn btn--sm" data-u="' + u + '">' + pr('Đặt U', 'Set U') + '</button> <button type="button" class="btn btn--sm" data-rec="' + u + '">' + pr('Ghi kết quả', 'Record') + '</button></td></tr>'; }).join('');
        const pts = S.rows.filter((r) => r.u >= 0), n = pts.length;
        let sl = null; if (n >= 2) { const su = pts.reduce((a, r) => a + r.u * r.u, 0), sui = pts.reduce((a, r) => a + r.u * r.i, 0); if (su > 0) sl = sui / su; }
        const gx = (u) => 40 + u / 12 * 230, gy = (i) => 150 - i / 2.2 * 130;
        let g = '<rect width="300" height="180" class="cl__bg"/><path d="M40 150H275M40 150V12" class="cl__axis"/>';
        for (let u = 0; u <= 12; u += 3) g += '<line x1="' + gx(u) + '" y1="150" x2="' + gx(u) + '" y2="154" class="cl__axis"/><text x="' + gx(u) + '" y="166" class="cl__num" text-anchor="middle">' + u + '</text>';
        for (let i = 0; i <= 2; i += 0.5) g += '<line x1="36" y1="' + gy(i) + '" x2="40" y2="' + gy(i) + '" class="cl__axis"/><text x="32" y="' + (gy(i) + 4) + '" class="cl__num" text-anchor="end">' + fmt(i, 1) + '</text>';
        g += '<text x="278" y="164" class="cl__num">U (V)</text><text x="44" y="16" class="cl__num">I (A)</text>';
        if (sl != null) g += '<line x1="' + gx(0) + '" y1="' + gy(0) + '" x2="' + gx(12) + '" y2="' + gy(Math.min(12 * sl, 2.2)) + '" class="cl__fit"/>';
        pts.forEach((r) => { g += '<circle cx="' + gx(r.u) + '" cy="' + gy(r.i) + '" r="5" class="cl__pt2"/>'; });
        const msg = n < 3 ? pr('Ghi ít nhất 3 cặp (U, I) để thấy dạng đồ thị.', 'Record at least 3 pairs (U, I) to see the shape of the graph.') : (function () { const dev = pts.reduce((m, r) => Math.max(m, Math.abs(r.i - sl * r.u)), 0); return dev < 0.06 ? pr('Các điểm nằm trên một đường thẳng đi qua gốc toạ độ ⇒ I tỉ lệ thuận với U. Độ dốc 1/R ≈ ' + fmt(sl, 3) + ' A/V ⇒ R ≈ ' + fmt(1 / sl, 2) + ' Ω.', 'The points lie on a straight line through the origin ⇒ I is proportional to U. Slope 1/R ≈ ' + fmt(sl, 3) + ' A/V ⇒ R ≈ ' + fmt(1 / sl, 2) + ' Ω.') : pr('Các điểm chưa thẳng hàng: kiểm tra lại số liệu.', 'The points are not on a line yet: recheck your readings.'); })();
        ex.innerHTML = '<div class="cl__cols"><div><table class="olab__tbl"><caption>' + pr('Bảng 11.2. Số liệu đo', 'Table 11.2. Measured data') + (R ? ' (R = ' + fmt(R.value, 0) + ' Ω)' : '') + '</caption><thead><tr><th>U (V)</th><th>I (A)</th><th>U/I (Ω)</th><th></th></tr></thead><tbody>' + rows + '</tbody></table>' +
          '<div class="olab__btns"><button type="button" class="btn btn--sm" data-act2="csv">' + pr('Sao chép CSV', 'Copy CSV') + '</button><button type="button" class="btn btn--sm" data-act2="clear">' + pr('Xoá bảng', 'Clear table') + '</button></div></div>' +
          '<div><svg viewBox="0 0 300 180" class="olab__svg cl__graph" role="img" aria-label="Đồ thị I theo U / Graph of I against U">' + g + '</svg><p class="olab__status">' + msg + '</p></div></div>';
        $$('[data-u]', ex).forEach((b) => { b.onclick = () => setU(+b.dataset.u); });
        $$('[data-rec]', ex).forEach((b) => { b.onclick = () => { const u = +b.dataset.rec; if (!A) return; const iv = S.exact ? Math.abs(sol.el[A.id].I) : quant(sol.el[A.id].I, A); const i = Math.round(iv * 1000) / 1000; S.rows = S.rows.filter((x) => x.u !== u); S.rows.push({ u, i }); S.rows.sort((a, b2) => a.u - b2.u); render(); }; });
        $$('[data-act2]', ex).forEach((b) => { b.onclick = () => { if (b.dataset.act2 === 'clear') { S.rows = []; render(); } else L.copyText && L.copyText(['U (V);I (A)'].concat(S.rows.map((r) => fmt(r.u, 0) + ';' + fmt(r.i, 2))).join('\n'), () => {}); }; });
      } else if (o.table === 'free') {
        const ms = S.parts.filter((p) => p.type === 'amm' || p.type === 'vol');
        const head = ms.map((p) => '<th>' + esc(p.name || p.type) + (p.type === 'amm' ? ' (A)' : ' (V)') + '</th>').join('');
        const val = (p) => p.type === 'amm' ? Math.abs(sol.el[p.id].I) : Math.abs(sol.el[p.id].V);
        ex.innerHTML = '<table class="olab__tbl"><caption>' + pr(o.tableName || 'Bảng số liệu', o.tableNameEn || 'Data table') + '</caption><thead><tr><th>#</th>' + head + '<th>U/I (Ω)</th></tr></thead><tbody>' + S.rows.map((r, i) => '<tr><td>' + (i + 1) + '</td>' + r.v.map((x) => '<td>' + fmt(x, 2) + '</td>').join('') + '<td>' + (r.R == null ? '–' : fmt(r.R, 2)) + '</td></tr>').join('') + '</tbody></table><div class="olab__btns"><button type="button" class="btn btn--sm" data-act2="rec">' + pr('Ghi kết quả', 'Record') + '</button><button type="button" class="btn btn--sm" data-act2="clear">' + pr('Xoá bảng', 'Clear table') + '</button><button type="button" class="btn btn--sm" data-act2="csv">' + pr('Sao chép CSV', 'Copy CSV') + '</button></div>' + (o.task ? '<p class="olab__status" data-r="task"></p>' : '');
        $$('[data-act2]', ex).forEach((b) => { b.onclick = () => { const a = b.dataset.act2; if (a === 'rec') { const vs = ms.map((p) => { const x = val(p); return Math.round((S.exact ? x : quant(x, p)) * 1000) / 1000; }); const Am = ms.find((p) => p.type === 'amm'), Vm = ms.find((p) => p.type === 'vol'); const I = Am ? val(Am) : null, U = Vm ? val(Vm) : null; S.rows.push({ v: vs, R: I > 1e-6 && U != null ? U / I : null }); render(); } else if (a === 'clear') { S.rows = []; render(); } else L.copyText && L.copyText([ms.map((p) => p.name).join(';') + ';R'].concat(S.rows.map((r) => r.v.map((x) => fmt(x, 2)).join(';') + ';' + (r.R == null ? '' : fmt(r.R, 2)))).join('\n'), () => {}); }; });
      } else ex.innerHTML = '';
      if (o.task) {
        const host = $('[data-r="task"]', ex) || (function () { const p = document.createElement('div'); p.className = 'cl__task'; p.innerHTML = '<p class="olab__status" data-r="task"></p>'; ex.appendChild(p); return $('[data-r="task"]', p); })();
        const res = o.task.check(sol, S); host.innerHTML = '<b>' + pr(o.task.vi, o.task.en) + '</b><br>' + (res ? pr(res[1], res[2]) : ''); host.classList.toggle('olab__status--ok', !!(res && res[0]));
      }
    }
    render(); return { state: S, solve: () => sol, render };
  }

  /* ------------------------------------------------------------ W11.3: ĐỊNH LUẬT OHM ----- */
  function ohmLab(body) {
    const id = 'co' + (++uid), S = { U: 6, R: 6, hide: null, ans: '', res: '' };
    body.innerHTML = '<div class="olab cl" data-lab="' + id + '"><p class="olab__hint">' + pr('Kéo thanh trượt U và R: I = U/R cập nhật ngay trên hai đồ thị. Phần “Tìm đại lượng còn thiếu” để em tự luyện.', 'Move the U and R sliders: I = U/R updates at once on both graphs. Try “Find the missing quantity” for practice.') + '</p>' +
      '<div class="olab__cols"><div class="olab__stage"><svg class="olab__svg" viewBox="0 0 560 220" data-r="g" role="img" aria-label="Đồ thị I–U và I–R / I–U and I–R graphs"></svg></div><div class="olab__panel">' +
      '<label class="olab__ctl"><span>U = <output data-o="U"></output> V</span><input type="range" data-k="U" min="0" max="24" step="0.5"></label>' +
      '<label class="olab__ctl"><span>R = <output data-o="R"></output> Ω</span><input type="range" data-k="R" min="1" max="50" step="1"></label><div class="olab__read" data-r="read" aria-live="polite"></div>' +
      '<div class="olab__btns"><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button></div></div></div>' +
      '<div class="cl__quiz"><b>' + pr('Tìm đại lượng còn thiếu', 'Find the missing quantity') + '</b> <button type="button" class="btn btn--sm" data-act="new">' + pr('Đề mới', 'New problem') + '</button><p data-r="prob"></p><label>= <input type="text" inputmode="decimal" data-r="ans" size="6" aria-label="Đáp số / answer"></label> <button type="button" class="btn btn--sm" data-act="chk">' + pr('Kiểm tra', 'Check') + '</button><p class="olab__status" data-r="res" role="status"></p></div></div>';
    const lab = $('[data-lab="' + id + '"]', body), q = (n) => $('[data-r="' + n + '"]', lab);
    function draw() {
      const I = S.U / S.R; let g = '<rect width="560" height="220" class="cl__bg"/>';
      const ax = (x0, title, xs, ys, xm, ym, f, px, py, pu, pfx, tx, ty) => {
        let s = '<g transform="translate(' + x0 + ',0)"><path d="M40 180H250M40 180V20" class="cl__axis"/><text x="140" y="14" class="cl__mBig" text-anchor="middle">' + title + '</text>';
        for (let i = 0; i <= 4; i++) { s += '<text x="' + (40 + i * 52.5) + '" y="196" class="cl__num" text-anchor="middle">' + fmt(xm * i / 4, 0) + '</text><text x="34" y="' + (184 - i * 40) + '" class="cl__num" text-anchor="end">' + fmt(ym * i / 4, ym < 10 ? 1 : 0) + '</text>'; }
        let d = ''; for (let k = 0; k <= 60; k++) { const x = xm * k / 60, y = f(x); if (y <= ym * 1.0) d += (d ? 'L' : 'M') + (40 + x / xm * 210).toFixed(1) + ' ' + (180 - y / ym * 160).toFixed(1); }
        s += '<path d="' + d + '" class="cl__fit"/><circle cx="' + (40 + clamp(px / xm, 0, 1) * 210) + '" cy="' + (180 - clamp(py / ym, 0, 1) * 160) + '" r="6" class="cl__pt2"/><text x="250" y="212" class="cl__num" text-anchor="end">' + tx + '</text><text x="44" y="30" class="cl__num">' + ty + '</text></g>'; return s;
      };
      g += ax(0, 'I theo U (R = ' + fmt(S.R, 0) + ' Ω)', 0, 0, 24, 5, (u) => u / S.R, S.U, I, 0, '', 'U (V)', 'I (A)');
      g += ax(280, 'I theo R (U = ' + fmt(S.U, 1) + ' V)', 0, 0, 50, 5, (r) => r > 0 ? S.U / r : 99, S.R, I, 0, '', 'R (Ω)', 'I (A)');
      q('g').innerHTML = g;
      ['U', 'R'].forEach((k) => { $('[data-k="' + k + '"]', lab).value = S[k]; $('[data-o="' + k + '"]', lab).textContent = fmt(S[k], k === 'U' ? 1 : 0); });
      q('read').innerHTML = '<p>I = U/R = <b>' + fmt(I, 2) + ' A</b></p><p>' + pr(I > 5 ? 'Dòng điện lớn hơn thang đồ thị.' : 'Tăng U gấp đôi thì I cũng tăng gấp đôi; tăng R gấp đôi thì I giảm một nửa.', I > 5 ? 'The current is above the graph scale.' : 'Doubling U doubles I; doubling R halves I.') + '</p>';
    }
    function newProb() { const pick = ['U', 'I', 'R'][Math.floor(Math.random() * 3)], R = [2, 4, 5, 6, 10, 12, 20][Math.floor(Math.random() * 7)], I = [0.2, 0.4, 0.5, 0.6, 1, 1.5, 2][Math.floor(Math.random() * 7)], U = R * I; S.hide = { pick, R, I, U };
      const val = { U: [fmt(U, 1) + ' V', fmt(U, 1) + ' V'], I: [fmt(I, 1) + ' A', fmt(I, 1) + ' A'], R: [fmt(R, 0) + ' Ω', fmt(R, 0) + ' Ω'] }, names = { U: ['hiệu điện thế U (V)', 'voltage U (V)'], I: ['cường độ dòng điện I (A)', 'current I (A)'], R: ['điện trở R (Ω)', 'resistance R (Ω)'] };
      const given = ['U', 'I', 'R'].filter((x) => x !== pick).map((x) => x + ' = ' + val[x][0]).join(', ');
      q('prob').innerHTML = pr('Cho ' + given + '. Tính ' + names[pick][0] + '.', 'Given ' + given + '. Find ' + names[pick][1] + '.'); q('res').textContent = ''; q('ans').value = ''; }
    lab.addEventListener('input', (e) => { const k = e.target.dataset && e.target.dataset.k; if (k) { S[k] = +e.target.value; draw(); } });
    lab.addEventListener('click', (e) => {
      const a = e.target.closest('[data-act]'); if (!a) return;
      if (a.dataset.act === 'reset') { S.U = 6; S.R = 6; draw(); } else if (a.dataset.act === 'new') newProb();
      else if (a.dataset.act === 'chk') { if (!S.hide) { newProb(); return; } const v = parseFloat(q('ans').value.replace(',', '.')), t = S.hide[S.hide.pick], ok = isFinite(v) && Math.abs(v - t) <= Math.max(0.01, Math.abs(t) * 0.01); q('res').innerHTML = ok ? pr('Đúng!', 'Correct!') : pr('Chưa đúng, hãy thử lại: dùng I = U/R.', 'Not yet — try again using I = U/R.'); q('res').classList.toggle('olab__status--ok', ok); }
    });
    newProb(); draw(); return { state: S };
  }

  /* ------------------------------------------------------------ W11.4: R = ρ·l/S ----- */
  function wireLab(body) {
    const id = 'cw' + (++uid), mats = Object.keys(E.RHO);
    const S = { m1: 'Đồng', l1: 2, s1: 1, m2: 'Đồng', l2: 1, s2: 2, cmp: false };
    const sel = (k) => '<select data-k="' + k + '" class="olab__sel">' + mats.map((m) => '<option>' + m + '</option>').join('') + '</select>';
    const ctl = (k, vi, en, mn, mx, st) => '<label class="olab__ctl"><span>' + pr(vi, en) + ' = <output data-o="' + k + '"></output></span><input type="range" data-k="' + k + '" min="' + mn + '" max="' + mx + '" step="' + st + '"></label>';
    body.innerHTML = '<div class="olab cl" data-lab="' + id + '"><p class="olab__hint">' + pr('Chọn vật liệu, đổi chiều dài l và tiết diện S của dây: R = ρ·l/S. Bật “So sánh hai dây” để xem tỉ số R₁/R₂.', 'Choose a material and change the length l and cross-section S: R = ρ·l/S. Turn on “Compare two wires” to see R₁/R₂.') + '</p>' +
      '<div class="olab__cols"><div class="olab__stage"><svg class="olab__svg" viewBox="0 0 560 230" data-r="svg" role="img" aria-label="Dây dẫn và điện trở / Wire and its resistance"></svg></div><div class="olab__panel"><div><b>' + pr('Dây 1', 'Wire 1') + '</b> ' + sel('m1') + '</div>' + ctl('l1', 'l (m)', 'l (m)', 0.1, 10, 0.1) + ctl('s1', 'S (mm²)', 'S (mm²)', 0.5, 6, 0.5) +
      '<label class="olab__ctl"><input type="checkbox" data-k="cmp"> ' + pr('So sánh hai dây', 'Compare two wires') + '</label><div data-r="w2" hidden><div><b>' + pr('Dây 2', 'Wire 2') + '</b> ' + sel('m2') + '</div>' + ctl('l2', 'l (m)', 'l (m)', 0.1, 10, 0.1) + ctl('s2', 'S (mm²)', 'S (mm²)', 0.5, 6, 0.5) + '</div><div class="olab__read" data-r="read" aria-live="polite"></div></div></div></div>';
    const lab = $('[data-lab="' + id + '"]', body), q = (n) => $('[data-r="' + n + '"]', lab);
    const R = (m, l, s) => E.wireR(E.RHO[m], l, s * 1e-6);
    function wire(y, m, l, s, tag) { const w = 30 + l / 10 * 380, th = 6 + s * 5; return '<rect x="40" y="' + (y - th / 2) + '" width="' + w.toFixed(1) + '" height="' + th.toFixed(1) + '" rx="' + (th / 2).toFixed(1) + '" class="cl__cu cl__cu--' + (m === 'Đồng' ? 'cu' : m === 'Nhôm' ? 'al' : m === 'Vàng' ? 'au' : m === 'Bạc' ? 'ag' : 'fe') + '"/><line x1="40" y1="' + (y + th / 2 + 12) + '" x2="' + (40 + w).toFixed(1) + '" y2="' + (y + th / 2 + 12) + '" class="cl__dim"/><text x="' + (40 + w / 2).toFixed(1) + '" y="' + (y + th / 2 + 26) + '" class="cl__num" text-anchor="middle">l = ' + fmt(l, 1) + ' m</text><text x="' + (40 + w + 8).toFixed(1) + '" y="' + (y + 4) + '" class="cl__num">S = ' + fmt(s, 1) + ' mm²</text>' + '<text x="40" y="' + (y - th / 2 - 8) + '" class="cl__lab">' + tag + ' ' + m + ' (ρ = ' + fmt(E.RHO[m] * 1e8, 2) + '·10⁻⁸ Ω·m)</text>'; }
    function draw() {
      const r1 = R(S.m1, S.l1, S.s1), r2 = R(S.m2, S.l2, S.s2);
      q('svg').innerHTML = '<rect width="560" height="230" class="cl__bg"/>' + wire(S.cmp ? 60 : 90, S.m1, S.l1, S.s1, '①') + (S.cmp ? wire(150, S.m2, S.l2, S.s2, '②') : '');
      $$('select', lab).forEach((s) => { s.value = S[s.dataset.k]; });
      ['l1', 's1', 'l2', 's2'].forEach((k) => { $('[data-k="' + k + '"]', lab).value = S[k]; $('[data-o="' + k + '"]', lab).textContent = fmt(S[k], 1); });
      $('[data-k="cmp"]', lab).checked = S.cmp; q('w2').hidden = !S.cmp;
      q('read').innerHTML = '<p>R<sub>1</sub> = ρ·l/S = <b>' + fmt(r1, r1 < 0.1 ? 4 : 3) + ' Ω</b></p>' + (S.cmp ? '<p>R<sub>2</sub> = <b>' + fmt(r2, r2 < 0.1 ? 4 : 3) + ' Ω</b></p><p>R<sub>1</sub>/R<sub>2</sub> = <b>' + fmt(r1 / r2, 3) + '</b></p>' : '') +
        '<p>' + pr('Dây dài gấp đôi thì R gấp đôi; dây có tiết diện gấp đôi thì R giảm một nửa.', 'Twice the length means twice R; twice the cross-section halves R.') + '</p>';
    }
    lab.addEventListener('input', (e) => { const k = e.target.dataset && e.target.dataset.k; if (!k) return; S[k] = e.target.type === 'checkbox' ? e.target.checked : e.target.tagName === 'SELECT' ? e.target.value : +e.target.value; draw(); });
    draw(); return { state: S };
  }

  /* ------------------------------------------------------------ W11.5: ĐIỆN TRỞ VÒNG MÀU ----- */
  function bandsLab(body) {
    const id = 'cb' + (++uid), S = { d1: 4, d2: 7, m: 0, t: 0.05, mode: 'read', ans: '' };
    const colOpt = (v) => E.BAND.map((b, i) => '<option value="' + i + '"' + (i === v ? ' selected' : '') + '>' + b[0] + ' (' + b[1] + ') = ' + i + '</option>').join('');
    const mOpt = () => E.BAND.map((b, i) => '<option value="' + i + '">' + b[0] + ' ×10^' + i + '</option>').join('') + '<option value="-1">vàng ánh kim ×10^−1</option><option value="-2">bạc ×10^−2</option>';
    body.innerHTML = '<div class="olab cl" data-lab="' + id + '"><p class="olab__hint">' + pr('Chọn màu cho từng vòng để đọc giá trị điện trở (Bảng 11.4). Có thể đổi sang “Đố vui” hoặc “Ngược lại”.', 'Choose a colour for each band to read the resistance (Table 11.4). Switch to “Quiz” or “Reverse”.') + '</p>' +
      '<div class="olab__btns" role="group" aria-label="Chế độ / Mode"><button class="btn btn--sm" data-mode="read" aria-pressed="true">' + pr('Đọc giá trị', 'Read') + '</button><button class="btn btn--sm" data-mode="quiz" aria-pressed="false">' + pr('Đố vui', 'Quiz') + '</button><button class="btn btn--sm" data-mode="rev" aria-pressed="false">' + pr('Ngược lại', 'Reverse') + '</button></div>' +
      '<div class="olab__cols"><div class="olab__stage"><svg class="olab__svg" viewBox="0 0 400 130" data-r="svg" role="img" aria-label="Điện trở vòng màu / Colour-coded resistor"></svg></div><div class="olab__panel" data-r="ctl"></div></div><div class="olab__read" data-r="read" aria-live="polite"></div></div>';
    const lab = $('[data-lab="' + id + '"]', body), q = (n) => $('[data-r="' + n + '"]', lab);
    let target = null;
    const bandCol = (i) => E.BAND[i][2];
    const mulCol = (m) => m >= 0 ? bandCol(m) : (m === -1 ? E.MULT4[0][2] : E.MULT4[1][2]);
    const tolCol = (t) => (t === 0.05 ? E.MULT4[0][2] : E.MULT4[1][2]);
    const val = (s) => E.colourCode(s.d1, s.d2, s.m, s.t);
    function res(R, tol) { const u = R >= 1e6 ? [R / 1e6, 'MΩ'] : R >= 1e3 ? [R / 1e3, 'kΩ'] : [R, 'Ω']; return fmt(u[0], 3).replace(/,?0+$/, '') + ' ' + u[1] + ' ± ' + fmt(tol, 2) + ' Ω'; }
    function svgRes(s) { return '<rect width="400" height="130" class="cl__bg"/><line x1="10" y1="65" x2="390" y2="65" class="cl__lead"/><rect x="85" y="35" width="230" height="60" rx="26" class="cl__rbody"/>' + [[120, bandCol(s.d1)], [160, bandCol(s.d2)], [200, mulCol(s.m)], [270, tolCol(s.t)]].map((b) => '<rect x="' + b[0] + '" y="35" width="16" height="60" fill="' + b[1] + '" stroke="#0004"/>').join('') + '<text x="128" y="116" class="cl__num" text-anchor="middle">1</text><text x="168" y="116" class="cl__num" text-anchor="middle">2</text><text x="208" y="116" class="cl__num" text-anchor="middle">×</text><text x="278" y="116" class="cl__num" text-anchor="middle">±</text>'; }
    function draw() {
      const s = S, v = val(s);
      q('svg').innerHTML = svgRes(s);
      if (S.mode === 'read') {
        q('ctl').innerHTML = ['d1:Vòng 1:Band 1', 'd2:Vòng 2:Band 2'].map((x) => { const p = x.split(':'); return '<label class="olab__ctl"><span>' + pr(p[1], p[2]) + '</span><select data-k="' + p[0] + '" class="olab__sel">' + colOpt(s[p[0]]) + '</select></label>'; }).join('') +
          '<label class="olab__ctl"><span>' + pr('Vòng 3 (số mũ)', 'Band 3 (multiplier)') + '</span><select data-k="m" class="olab__sel">' + mOpt() + '</select></label><label class="olab__ctl"><span>' + pr('Vòng 4 (sai số)', 'Band 4 (tolerance)') + '</span><select data-k="t" class="olab__sel"><option value="0.05">vàng ánh kim ±5 %</option><option value="0.1">bạc ±10 %</option></select></label>';
        $$('select', lab).forEach((x) => { x.value = String(s[x.dataset.k]); });
        q('read').innerHTML = '<p>R = (' + s.d1 + s.d2 + ') × 10<sup>' + s.m + '</sup> = <b>' + res(v.R, v.tol) + '</b></p>';
      } else if (S.mode === 'quiz') {
        q('ctl').innerHTML = '<p>' + pr('Điện trở này có giá trị bao nhiêu (đơn vị Ω)?', 'What is the value of this resistor (in Ω)?') + '</p><label><input type="text" inputmode="decimal" data-r="ans" size="8" value="' + esc(S.ans) + '" aria-label="Đáp số / answer"> Ω</label> <button class="btn btn--sm" data-act="chk">' + pr('Kiểm tra', 'Check') + '</button> <button class="btn btn--sm" data-act="new">' + pr('Đề mới', 'New resistor') + '</button>'; q('read').innerHTML = '<p class="olab__status" data-r="res"></p>';
      } else {
        q('ctl').innerHTML = '<p>' + pr('Điện trở cần có giá trị ', 'The resistor must be ') + '<b>' + fmt(target.R, 0) + ' Ω</b> ' + pr('(sai số ±5 %). Chọn đúng ba vòng đầu.', '(tolerance ±5 %). Choose the first three bands.') + '</p>' + ['d1', 'd2'].map((k, i) => '<label class="olab__ctl"><span>' + pr('Vòng ' + (i + 1), 'Band ' + (i + 1)) + '</span><select data-k="' + k + '" class="olab__sel">' + colOpt(s[k]) + '</select></label>').join('') + '<label class="olab__ctl"><span>' + pr('Vòng 3', 'Band 3') + '</span><select data-k="m" class="olab__sel">' + mOpt() + '</select></label>';
        $$('select', lab).forEach((x) => { x.value = String(s[x.dataset.k]); });
        q('read').innerHTML = '<p class="olab__status ' + (Math.abs(v.R - target.R) < 1e-6 ? 'olab__status--ok' : '') + '">' + (Math.abs(v.R - target.R) < 1e-6 ? pr('Chính xác! Các vòng màu cho ' + fmt(v.R, 0) + ' Ω.', 'Exactly! The bands give ' + fmt(v.R, 0) + ' Ω.') : pr('Các vòng màu hiện cho ' + fmt(v.R, 2) + ' Ω.', 'The bands currently give ' + fmt(v.R, 2) + ' Ω.')) + '</p>';
      }
    }
    function newTarget() { const d1 = 1 + Math.floor(Math.random() * 9), d2 = Math.floor(Math.random() * 10), m = Math.floor(Math.random() * 5); Object.assign(S, { d1, d2, m, t: Math.random() < 0.5 ? 0.05 : 0.1, ans: '' }); target = E.colourCode(d1, d2, m, S.t); }
    lab.addEventListener('change', (e) => { const k = e.target.dataset && e.target.dataset.k; if (k) { S[k] = k === 't' ? +e.target.value : +e.target.value; draw(); } });
    lab.addEventListener('click', (e) => {
      const m = e.target.closest('[data-mode]'), a = e.target.closest('[data-act]');
      if (m) { S.mode = m.dataset.mode; $$('[data-mode]', lab).forEach((b) => b.setAttribute('aria-pressed', b === m)); if (S.mode === 'quiz') newTarget(); else if (S.mode === 'rev') { newTarget(); target = { R: target.R }; Object.assign(S, { d1: 0, d2: 0, m: 0 }); } draw(); return; }
      if (a && a.dataset.act === 'new') { newTarget(); draw(); }
      if (a && a.dataset.act === 'chk') { const v = parseFloat(($('[data-r="ans"]', lab).value || '').replace(',', '.')); S.ans = $('[data-r="ans"]', lab).value; const ok = isFinite(v) && Math.abs(v - target.R) < 1e-6 * Math.max(1, target.R); const r = $('[data-r="res"]', lab); r.innerHTML = ok ? pr('Đúng! R = ' + fmt(target.R, 0) + ' Ω ± ' + fmt(target.tol, 2) + ' Ω.', 'Correct! R = ' + fmt(target.R, 0) + ' Ω ± ' + fmt(target.tol, 2) + ' Ω.') : pr('Chưa đúng. Ghép hai chữ số của vòng 1 và 2, rồi nhân với 10 mũ vòng 3.', 'Not yet. Join the digits of bands 1 and 2, then multiply by ten to the power of band 3.'); r.classList.toggle('olab__status--ok', ok); }
    });
    draw(); return { state: S };
  }

  /* ------------------------------------------------------------ W12.3: SO SÁNH NỐI TIẾP / SONG SONG ----- */
  function compareLab(body) {
    const id = 'cc' + (++uid), S = { n: 3, burnt: 0 };
    body.innerHTML = '<div class="olab cl" data-lab="' + id + '"><p class="olab__hint">' + pr('Chọn số bóng đèn giống nhau, nối với nguồn 6 V theo hai cách. Bấm “Một bóng cháy” để xem điều gì xảy ra ở mỗi cách mắc.', 'Choose how many identical bulbs to connect to a 6 V source in the two ways. Press “One bulb burns out” to see what happens in each.') + '</p>' +
      '<div class="olab__ctl"><label><span>' + pr('Số bóng', 'Bulbs') + ' n = <output data-o="n"></output></span><input type="range" data-k="n" min="1" max="6" step="1"></label> <button class="btn btn--sm" data-act="burn">' + pr('Một bóng cháy', 'One bulb burns out') + '</button> <button class="btn btn--sm" data-act="fix">' + pr('Thay bóng mới', 'Replace bulbs') + '</button></div>' +
      '<div class="olab__cols"><div class="olab__stage"><svg class="olab__svg" viewBox="0 0 560 260" data-r="svg" role="img" aria-label="Hai cách mắc bóng đèn / Two ways to connect bulbs"></svg></div><div class="olab__panel" data-r="read" aria-live="polite"></div></div></div>';
    const lab = $('[data-lab="' + id + '"]', body), q = (n) => $('[data-r="' + n + '"]', lab);
    function calc(mode) {
      const U = 6, Rl = 6.25, els = [{ id: 's', type: 'src', value: U }], wires = [], n = S.n;
      for (let i = 0; i < n; i++) els.push({ id: 'l' + i, type: 'lamp', value: i < S.burnt ? 1e9 : Rl, vr: 6 });
      if (mode === 'ser') { wires.push(['s.a', 'l0.a']); for (let i = 0; i < n - 1; i++) wires.push(['l' + i + '.b', 'l' + (i + 1) + '.a']); wires.push(['l' + (n - 1) + '.b', 's.b']); }
      else for (let i = 0; i < n; i++) { wires.push(['s.a', 'l' + i + '.a']); wires.push(['l' + i + '.b', 's.b']); }
      const r = E.solve({ elements: els, wires }); return { r, I: Math.abs(r.el.s.I), els };
    }
    function bulbs(x0, y0, mode, c) {
      let s = ''; const n = S.n;
      for (let i = 0; i < n; i++) { const b = clamp(c.r.el['l' + i].bright || 0, 0, 1.4), burnt = i < S.burnt, cx = mode === 'ser' ? x0 + 20 + i * (230 / n) + 10 : x0 + 40 + i * (210 / Math.max(n - 1, 1)), cy = mode === 'ser' ? y0 : y0 - 6 + 0;
        s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (14 + b * 10).toFixed(1) + '" class="cl__glow" style="opacity:' + clamp(b * 0.8, 0, 0.9).toFixed(2) + '"/><circle cx="' + cx + '" cy="' + cy + '" r="12" class="cl__bulb' + (burnt ? ' is-burnt' : '') + '"/>'; }
      return s;
    }
    function draw() {
      const A = calc('ser'), B = calc('par'); $('[data-k="n"]', lab).value = S.n; $('[data-o="n"]', lab).textContent = S.n;
      const row = (y, t, c, mode) => '<text x="14" y="' + (y - 40) + '" class="cl__lab">' + t + '</text><line x1="20" y1="' + y + '" x2="540" y2="' + y + '" class="cl__wire" style="opacity:.35"/>' + bulbs(40, y, mode, c);
      q('svg').innerHTML = '<rect width="560" height="260" class="cl__bg"/>' + row(80, 'Nối tiếp / Series', A, 'ser') + row(190, 'Song song / Parallel', B, 'par');
      const bar = (v, c) => '<span style="display:block;height:10px;width:' + clamp(v / 1.2 * 100, 2, 100).toFixed(0) + '%;background:var(--' + c + ')"></span>';
      const bs = (c) => { let s = 0; for (let i = 0; i < S.n; i++) s += c.r.el['l' + i].bright || 0; return s / S.n; };
      const Rt = (c) => c.I > 1e-6 ? 6 / c.I : Infinity, fmtR = (x) => isFinite(x) ? fmt(x, 2) + ' Ω' : '∞';
      q('read').innerHTML = '<table class="olab__tbl olab__tbl--read"><thead><tr><th></th><th>' + pr('Nối tiếp', 'Series') + '</th><th>' + pr('Song song', 'Parallel') + '</th></tr></thead><tbody><tr><th scope="row">I (A)</th><td>' + fmt(A.I, 3) + '</td><td>' + fmt(B.I, 3) + '</td></tr><tr><th scope="row">R<sub>tđ</sub></th><td>' + fmtR(Rt(A)) + '</td><td>' + fmtR(Rt(B)) + '</td></tr><tr><th scope="row">' + pr('Độ sáng mỗi bóng (so với định mức)', 'Brightness of each bulb (vs rated)') + '</th><td>' + fmt(bs(A) * 100, 0) + ' %' + bar(bs(A), 'pen') + '</td><td>' + fmt(bs(B) * 100, 0) + ' %' + bar(bs(B), 'teal') + '</td></tr></tbody></table><p class="olab__status">' + (S.burnt ? pr('Có bóng cháy: nối tiếp thì tất cả đều tắt (mạch hở); song song thì các bóng còn lại vẫn sáng như cũ.', 'A bulb has burnt out: in series all go out (open circuit); in parallel the others stay lit as before.') : pr('Nối tiếp: n bóng chia nhau hiệu điện thế nên mỗi bóng tối đi. Song song: mỗi bóng nhận cả 6 V nên sáng như nhau.', 'Series: n bulbs share the voltage so each is dimmer. Parallel: each bulb gets the full 6 V so all are equally bright.')) + '</p>';
    }
    lab.addEventListener('input', (e) => { if (e.target.dataset && e.target.dataset.k === 'n') { S.n = +e.target.value; S.burnt = Math.min(S.burnt, S.n); draw(); } });
    lab.addEventListener('click', (e) => { const a = e.target.closest('[data-act]'); if (!a) return; if (a.dataset.act === 'burn') S.burnt = Math.min(S.burnt + 1, S.n); else S.burnt = 0; draw(); });
    draw(); return { state: S };
  }

  /* ------------------------------------------------------------ NHIỆM VỤ ----- */
  const ammI = (sol, S) => { const a = S.parts.find((p) => p.type === 'amm'); return a ? Math.abs(sol.el[a.id].I) : 0; };
  const rEqOf = (sol, S) => { const s = S.parts.find((p) => p.type === 'src'), I = s ? Math.abs(sol.el[s.id].I) : 0; return I > 1e-6 ? s.value / I : null; };
  const near = (a, b, e) => a != null && Math.abs(a - b) <= e;
  const T = {
    ex1: { vi: 'Bài tập. Lắp R₁ = 2 Ω nối tiếp R₂ = 3 Ω với nguồn 5 V và ampe kế. Tính I và U₁.', en: 'Exercise. Connect R₁ = 2 Ω in series with R₂ = 3 Ω, a 5 V source and an ammeter. Find I and U₁.',
      check(sol, S) { const R = rEqOf(sol, S), I = ammI(sol, S); if (!sol.ok) return [false, 'Mạch đang bị lỗi — xem dòng cảnh báo phía trên.', 'The circuit has a fault — see the warning above.']; if (R == null) return [false, 'Hãy nối đủ mạch kín: nguồn → ampe kế → R₁ → R₂ → nguồn.', 'Close the circuit: source → ammeter → R₁ → R₂ → source.']; return near(R, 5, 0.01) && near(I, 1, 0.01) ? [true, 'Đúng: R_tđ = 5 Ω, I = 1 A, U₁ = I·R₁ = 2 V, U₂ = 3 V (U₁ + U₂ = 5 V).', 'Correct: R_eq = 5 Ω, I = 1 A, U₁ = I·R₁ = 2 V, U₂ = 3 V (U₁ + U₂ = 5 V).'] : [false, 'Hiện R_tđ = ' + fmt(R, 2) + ' Ω, I = ' + fmt(I, 2) + ' A. Hai điện trở phải mắc nối tiếp, ampe kế cũng nối tiếp.', 'Now R_eq = ' + fmt(R, 2) + ' Ω, I = ' + fmt(I, 2) + ' A. The two resistors must be in series, with the ammeter in series too.']; } },
    ex2: { vi: 'Bài tập. Lắp R₁ = 20 Ω song song R₂ = 40 Ω với nguồn 24 V. Ampe kế đặt ở mạch chính. Tính I.', en: 'Exercise. Connect R₁ = 20 Ω in parallel with R₂ = 40 Ω across 24 V. Put the ammeter in the main line. Find I.',
      check(sol, S) { const R = rEqOf(sol, S), I = ammI(sol, S); if (!sol.ok) return [false, 'Mạch đang bị lỗi — xem dòng cảnh báo phía trên.', 'The circuit has a fault — see the warning above.']; if (R == null) return [false, 'Hãy nối mạch kín: nối hai đầu mỗi điện trở vào hai cực nguồn (qua ampe kế ở mạch chính).', 'Close the circuit: connect both ends of each resistor across the source (via the ammeter in the main line).']; return near(R, 40 / 3, 0.02) && near(I, 1.8, 0.01) ? [true, 'Đúng: R_tđ = 20·40/(20+40) ≈ 13,3 Ω; I = 24/13,3 = 1,8 A (I₁ = 1,2 A, I₂ = 0,6 A).', 'Correct: R_eq = 20·40/(20+40) ≈ 13.3 Ω; I = 24/13.3 = 1.8 A (I₁ = 1.2 A, I₂ = 0.6 A).'] : [false, 'Hiện R_tđ = ' + fmt(R, 2) + ' Ω. Mắc song song thì R_tđ phải nhỏ hơn cả hai điện trở thành phần.', 'Now R_eq = ' + fmt(R, 2) + ' Ω. In parallel R_eq must be smaller than both resistors.']; } }
  };

  window.LabSims = Object.assign(window.LabSims || {}, {
    'circ-h111': { fn: (b) => board(b, { preset: 'h111', tray: false, table: 'free', tableName: 'Bảng 11.1. Độ sáng bóng đèn khi đổi điện trở', tableNameEn: 'Table 11.1. Bulb brightness with different resistors', hint: pr('Nối thêm R₂ hoặc R₃ thay cho R₁ (kéo từ chấm tròn này sang chấm tròn kia, tháo dây cũ bằng nút “Xoá”). Quan sát độ sáng bóng đèn và số chỉ ampe kế.', 'Wire R₂ or R₃ in place of R₁ (drag from one dot to another; remove the old wire with “Delete”). Watch the bulb brightness and the ammeter.') }), vi: 'Điện trở và độ sáng bóng đèn (Hình 11.1)', en: 'Resistance and bulb brightness (Figure 11.1)', intro: 'Thay các điện trở khác nhau cho nối tiếp với bóng đèn và so sánh độ sáng.' },
    'circ-ohm': { fn: (b) => board(b, { preset: 'h112', tray: true, table: 'ohm' }), vi: 'Thí nghiệm định luật Ohm (Hình 11.2)', en: 'Ohm’s law experiment (Figure 11.2)', intro: 'Kéo con chạy biến trở hoặc bấm “Đặt U”, đọc ampe kế, ghi vào Bảng 11.2 và xem đồ thị I–U.' },
    'circ-ohmlaw': { fn: ohmLab, vi: 'I = U/R và hai đồ thị', en: 'I = U/R and two graphs', intro: 'Đổi U và R để xem I đổi thế nào; luyện tìm đại lượng còn thiếu.' },
    'circ-wire': { fn: wireLab, vi: 'Điện trở của dây dẫn R = ρl/S', en: 'Resistance of a wire R = ρl/S', intro: 'Đổi vật liệu, chiều dài và tiết diện; so sánh hai dây.' },
    'circ-bands': { fn: bandsLab, vi: 'Điện trở vòng màu (Bảng 11.4)', en: 'Colour-coded resistors (Table 11.4)', intro: 'Đọc, đố vui và đổi ngược giá trị điện trở theo vòng màu.' },
    'circ-series': { fn: (b) => board(b, { preset: 'h121', tray: false, table: 'free', tableName: 'Bảng 12.1. Đoạn mạch nối tiếp', tableNameEn: 'Table 12.1. Series circuit', hint: pr('Nối R₁ với R₂ (hoặc R₁ với R₃, R₂ với R₃) nối tiếp rồi về nguồn, đặt ampe kế vào các vị trí khác nhau và ghi vào bảng. Bấm “Một bóng cháy” không có ở đây — hãy thử tháo một điện trở.', 'Wire R₁ with R₂ (or R₁–R₃, R₂–R₃) in series back to the source, place the ammeter in different positions and record. Try removing one resistor.') }), vi: 'Đoạn mạch nối tiếp (Hình 12.1)', en: 'A series circuit (Figure 12.1)', intro: 'Lắp hai điện trở nối tiếp, đo I ở mọi vị trí và ghi Bảng 12.1.' },
    'circ-parallel': { fn: (b) => board(b, { preset: 'h122', tray: false, table: 'free', tableName: 'Bảng 12.2. Đoạn mạch song song', tableNameEn: 'Table 12.2. Parallel circuit', hint: pr('Nối R₁ và R₂ song song giữa hai điểm, đặt A₁ ở mạch chính, A₂ và A₃ ở hai nhánh, rồi ghi Bảng 12.2.', 'Wire R₁ and R₂ in parallel between two points, put A₁ in the main line and A₂, A₃ in the branches, then record Table 12.2.') }), vi: 'Đoạn mạch song song (Hình 12.2)', en: 'A parallel circuit (Figure 12.2)', intro: 'Lắp hai nhánh song song, đo dòng ở mạch chính và từng nhánh.' },
    'circ-compare': { fn: compareLab, vi: 'Nối tiếp hay song song?', en: 'Series or parallel?', intro: 'So sánh độ sáng, dòng điện và điện trở tương đương của n bóng đèn.' },
    'circ-ex1': { fn: (b) => board(b, { preset: 'ex1', tray: false, table: 'none', task: T.ex1 }), vi: 'Bài tập: hai điện trở nối tiếp', en: 'Exercise: two resistors in series', intro: 'Tự lắp mạch rồi kiểm tra kết quả.' },
    'circ-ex2': { fn: (b) => board(b, { preset: 'ex2', tray: false, table: 'none', task: T.ex2 }), vi: 'Bài tập: hai điện trở song song', en: 'Exercise: two resistors in parallel', intro: 'Tự lắp mạch rồi kiểm tra kết quả.' },
    'circ-design': { fn: (b) => board(b, { preset: 'design', tray: true, burn: true, table: 'none', hint: pr('Thiết kế dây đèn trang trí “cành đào, cành mai”: nối bốn bóng đèn theo cách em chọn (nối tiếp, song song hoặc hỗn hợp), đóng công tắc rồi bấm “Một bóng cháy” để xem các bóng còn lại.', 'Design the “peach and apricot branch” string lights: wire the four bulbs your way (series, parallel or mixed), close the switch, then press “One bulb burns out” to see the others.') }), vi: 'Thiết kế dây đèn trang trí', en: 'Design a string of lights', intro: 'Tự thiết kế mạch đèn và thử khi một bóng hỏng.' }
  });
  window.CircuitUI = { board, ohmLab, wireLab, bandsLab, compareLab, PRESETS };
})();
