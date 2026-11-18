/* ==========================================================================
   HÌNH MINH HOẠ HÌNH HỌC — TOÁN 9 (Chương IV: hệ thức lượng; Chương V: đường tròn)
   --------------------------------------------------------------------------
   File này thêm các hàm vẽ SVG vào TEXTBOOK.art (nạp sau illustrations.js).
   Mọi hình đều vẽ bằng mã, không cần file ảnh. Chữ trong hình có hai dòng:
   tiếng Việt (đậm) và tiếng Anh (class "en", nghiêng); nút "Tiếng Anh" trên
   thanh công cụ ẩn phần tiếng Anh trong hình cùng với phần chữ của trang.
   Tên hàm = giá trị của thuộc tính  art  trong khối { t: 'fig', art: '...' }.
   ========================================================================== */
(function () {
  'use strict';

  const C = { ink: '#14224a', pen: '#1f46d0', penL: '#dbe4ff', red: '#e0393e', teal: '#0aa39a', water: '#bfe3f7', grey: '#9aa8c7' };
  const W = 2.3;

  /* ---- hàm toạ độ -------------------------------------------------------- */
  const add = (p, q) => [p[0] + q[0], p[1] + q[1]];
  const sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
  const mul = (p, k) => [p[0] * k, p[1] * k];
  const len = (p) => Math.hypot(p[0], p[1]);
  const unit = (p) => mul(p, 1 / (len(p) || 1));
  const mid = (p, q) => mul(add(p, q), 0.5);
  const f = (n) => Math.round(n * 10) / 10;
  const pts = (...a) => a.map((p) => f(p[0]) + ',' + f(p[1])).join(' ');

  const svg = (vb, label, inner, cls) =>
    '<svg class="art art--hh ' + (cls || '') + '" viewBox="' + vb + '" role="img" aria-label="' + label + '" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="0" y="0" width="' + vb.split(' ')[2] + '" height="' + vb.split(' ')[3] + '" fill="#fff"/>' + inner + '</svg>';

  /* ---- nét vẽ ------------------------------------------------------------ */
  const seg = (p, q, o) => {
    o = o || {};
    return '<line x1="' + f(p[0]) + '" y1="' + f(p[1]) + '" x2="' + f(q[0]) + '" y2="' + f(q[1]) + '" stroke="' + (o.c || C.ink) + '" stroke-width="' + (o.w || W) + '"' +
      (o.dash ? ' stroke-dasharray="5 4"' : '') + ' stroke-linecap="round"/>';
  };
  const poly = (list, fill) => '<polygon points="' + pts.apply(null, list) + '" fill="' + (fill || 'none') + '" stroke="' + C.ink + '" stroke-width="' + W + '" stroke-linejoin="round"/>';
  const dot = (p, c) => '<circle cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="3.2" fill="' + (c || C.ink) + '"/>';
  const circle = (c, r, fill) => '<circle cx="' + f(c[0]) + '" cy="' + f(c[1]) + '" r="' + f(r) + '" fill="' + (fill || 'none') + '" stroke="' + C.ink + '" stroke-width="' + W + '"/>';

  /* góc vuông tại V, hai cạnh hướng về P và Q */
  const rightMark = (V, P, Q, s) => {
    s = s || 9;
    const u = mul(unit(sub(P, V)), s), w = mul(unit(sub(Q, V)), s);
    return '<path d="M' + f(V[0] + u[0]) + ' ' + f(V[1] + u[1]) + 'L' + f(V[0] + u[0] + w[0]) + ' ' + f(V[1] + u[1] + w[1]) + 'L' + f(V[0] + w[0]) + ' ' + f(V[1] + w[1]) + '" fill="none" stroke="' + C.ink + '" stroke-width="1.6"/>';
  };
  /* cung góc tại V giữa tia VP và VQ */
  const arc = (V, P, Q, r, col) => {
    const u = unit(sub(P, V)), w = unit(sub(Q, V));
    const a = add(V, mul(u, r)), b = add(V, mul(w, r));
    const sweep = u[0] * w[1] - u[1] * w[0] > 0 ? 1 : 0;
    return '<path d="M' + f(a[0]) + ' ' + f(a[1]) + 'A' + r + ' ' + r + ' 0 0 ' + sweep + ' ' + f(b[0]) + ' ' + f(b[1]) + '" fill="none" stroke="' + (col || C.pen) + '" stroke-width="1.8"/>';
  };
  /* dấu gạch bằng nhau trên đoạn PQ */
  const tick = (P, Q) => {
    const m = mid(P, Q), d = unit(sub(Q, P)), n = [-d[1], d[0]];
    return seg(add(m, mul(n, 4.5)), add(m, mul(n, -4.5)), { w: 1.7 });
  };

  /* ---- chữ ---------------------------------------------------------------- */
  const txt = (p, s, o) => {
    o = o || {};
    return '<text x="' + f(p[0]) + '" y="' + f(p[1]) + '" text-anchor="' + (o.a || 'middle') + '" style="font-size:' + (o.s || 12.5) + 'px" font-weight="' + (o.b === 0 ? 400 : 700) + '" fill="' + (o.c || C.pen) + '"' + (o.i === false ? '' : ' font-style="italic"') + '>' + s + '</text>';
  };
  /* tên đỉnh: đặt ra phía ngoài so với trọng tâm G */
  const vlab = (V, G, name, d) => {
    const u = unit(sub(V, G)), p = add(V, mul(u, d || 12));
    return txt([p[0], p[1] + 4.5], name, { s: 13 });
  };
  /* nhãn một cạnh PQ: hai dòng Việt/Anh, xoay theo cạnh, nằm ngoài tam giác (G = điểm trong hình) */
  const slab = (P, Q, G, vi, en, d) => {
    d = d || 10;
    let th = Math.atan2(Q[1] - P[1], Q[0] - P[0]) * 180 / Math.PI;
    if (th > 90) th -= 180;
    if (th <= -90) th += 180;
    const r = th * Math.PI / 180, nUp = [Math.sin(r), -Math.cos(r)];
    const m = mid(P, Q);
    const outUp = (m[0] - G[0]) * nUp[0] + (m[1] - G[1]) * nUp[1] > 0;
    const base = outUp ? add(m, mul(nUp, d + (en ? 11 : 0))) : add(m, mul(nUp, -(d + 4)));
    const fs = 10.5;
    let s = '<g transform="rotate(' + f(th) + ' ' + f(base[0]) + ' ' + f(base[1]) + ')">';
    s += '<text x="' + f(base[0]) + '" y="' + f(base[1] + (outUp ? 0 : 4)) + '" text-anchor="middle" style="font-size:' + fs + 'px" font-weight="700" fill="' + C.pen + '">' + vi + '</text>';
    if (en) s += '<text class="en" x="' + f(base[0]) + '" y="' + f(base[1] + (outUp ? 11 : 15)) + '" text-anchor="middle" style="font-size:' + (fs - 1) + 'px" fill="' + C.pen + '" opacity=".85">' + en + '</text>';
    return s + '</g>';
  };
  /* nhãn ngắn (a, b, 3 cm…) nằm cạnh trung điểm cạnh PQ, phía ngoài G */
  const sval = (P, Q, G, s, d) => {
    const m = mid(P, Q), dd = unit(sub(Q, P)), n = [-dd[1], dd[0]];
    const out = (m[0] - G[0]) * n[0] + (m[1] - G[1]) * n[1] > 0 ? n : mul(n, -1);
    const p = add(m, mul(out, d || 11));
    return txt([p[0], p[1] + 4.5], s, { s: 12.5 });
  };
  const cen = (...a) => [a.reduce((s, p) => s + p[0], 0) / a.length, a.reduce((s, p) => s + p[1], 0) / a.length];

  /* ========================================================================
     CHƯƠNG IV — HỆ THỨC LƯỢNG TRONG TAM GIÁC VUÔNG
     ======================================================================== */

  /* Hình 4.1 — dốc có góc dốc α, chiều dài dốc a, độ cao h */
  function slope() {
    const P = [18, 118], R = [182, 118], Q = [182, 70], G = cen(P, R, Q);
    const inner = poly([P, R, Q]) + rightMark(R, P, Q) + arc(P, R, Q, 30) +
      txt([P[0] + 42, P[1] - 5], 'α', { s: 14 }) + sval(P, Q, G, 'a') + txt([R[0] + 10, 98], 'h') +
      txt([100, 142], 'độ dốc: góc α', { i: false, b: 1, s: 10.5 }) + '<text class="en" x="100" y="154" text-anchor="middle" style="font-size:9.5px" fill="' + C.pen + '" opacity=".85">slope angle α</text>';
    return svg('0 0 200 160', 'Dốc có độ dài a, độ cao h và góc dốc anpha', inner, 'art--tri');
  }

  /* Hình 4.2 / 4.5 — tam giác ABC vuông tại A, cạnh đối, cạnh kề, cạnh huyền của góc B */
  function tri42(withAlpha) {
    const B = [30, 130], A = [132, 130], Cc = [132, 24], G = cen(B, A, Cc);
    let inner = poly([B, A, Cc]) + rightMark(A, B, Cc) + arc(B, A, Cc, 20) +
      vlab(B, G, 'B') + vlab(A, G, 'A') + vlab(Cc, G, 'C') +
      slab(B, Cc, G, 'cạnh huyền', 'hypotenuse', 9) +
      slab(A, Cc, G, 'cạnh đối của góc ' + (withAlpha ? 'α' : 'B'), 'opposite side of angle ' + (withAlpha ? 'α' : 'B'), 9) +
      slab(B, A, G, 'cạnh kề của góc ' + (withAlpha ? 'α' : 'B'), 'adjacent side of angle ' + (withAlpha ? 'α' : 'B'), 9);
    if (withAlpha) inner += txt([B[0] + 27, B[1] - 6], 'α', { s: 13 });
    return svg('0 0 200 166', 'Tam giác ABC vuông tại A với cạnh huyền BC, cạnh đối AC và cạnh kề AB của góc B', inner, 'art--tri');
  }
  const tri42a = () => tri42(false);
  const tri45 = () => tri42(true);

  /* Hình 4.3 — tam giác ABC vuông tại A, xét góc C */
  function tri43() {
    const A = [44, 124], B = [44, 24], Cc = [150, 124], G = cen(A, B, Cc);
    const inner = poly([A, B, Cc]) + rightMark(A, B, Cc) + arc(Cc, A, B, 20) +
      vlab(A, G, 'A') + vlab(B, G, 'B') + vlab(Cc, G, 'C');
    return svg('0 0 200 150', 'Tam giác ABC vuông tại A, xét góc nhọn C', inner, 'art--tri');
  }

  /* Hình 4.4 — các tam giác vuông có cùng góc nhọn α đồng dạng */
  function similar44() {
    const P = [20, 128], dir = unit([120, -100]);
    const at = (x) => [x, 128 - 100 * (x - 20) / 120];
    const T1 = at(92), T2 = at(150), E = [188, 128];
    const inner =
      seg(P, E) + seg(P, add(P, mul(dir, 190))) +
      seg([92, 128], T1, { dash: 1, w: 1.8 }) + seg([150, 128], T2, { dash: 1, w: 1.8 }) +
      rightMark([92, 128], [60, 128], T1, 8) + rightMark([150, 128], [120, 128], T2, 8) +
      arc(P, E, add(P, dir), 26) + txt([P[0] + 36, P[1] - 6], 'α', { s: 13 });
    return svg('0 0 200 150', 'Hai tam giác vuông có chung góc nhọn anpha, đồng dạng với nhau', inner, 'art--tri');
  }

  /* Hình 4.6 — tam giác vuông 3 cm, 4 cm */
  function tri46() {
    const B = [30, 134], A = [120, 134], Cc = [120, 18], G = cen(B, A, Cc);
    const inner = poly([B, A, Cc]) + rightMark(A, B, Cc) + arc(B, A, Cc, 24) +
      vlab(B, G, 'B') + vlab(A, G, 'A') + vlab(Cc, G, 'C') + txt([B[0] + 34, B[1] - 6], 'α', { s: 13 }) +
      sval(A, Cc, G, '4 cm', 19) + sval(B, A, G, '3 cm', 13);
    return svg('0 0 200 160', 'Tam giác ABC vuông tại A có AB bằng 3 cm và AC bằng 4 cm', inner, 'art--tri');
  }

  /* Hình 4.7a — tam giác vuông cân */
  function iso47() {
    const A = [100, 28], B = [26, 112], Cc = [174, 112], G = cen(A, B, Cc);
    const inner = poly([A, B, Cc]) + rightMark(A, B, Cc, 10) + tick(A, B) + tick(A, Cc) +
      arc(B, Cc, A, 24) + arc(Cc, B, A, 24) +
      txt([B[0] + 34, B[1] - 5], '45°', { s: 11 }) + txt([Cc[0] - 34, Cc[1] - 5], '45°', { s: 11 }) +
      vlab(A, G, 'A') + vlab(B, G, 'B') + vlab(Cc, G, 'C') + sval(A, B, G, 'a') + sval(A, Cc, G, 'a');
    return svg('0 0 200 140', 'Tam giác ABC vuông cân tại A có AB bằng AC bằng a, hai góc nhọn bằng 45 độ', inner, 'art--tri');
  }

  /* Hình 4.7b — tam giác đều cạnh 2a với đường cao AH */
  function equi47() {
    const B = [30, 148], Cc = [170, 148], A = [100, 148 - 140 * Math.sqrt(3) / 2], H = [100, 148], G = cen(A, B, Cc);
    const inner = poly([A, B, Cc]) + seg(A, H) + rightMark(H, A, Cc, 8) +
      arc(A, H, B, 26) + arc(B, Cc, A, 26) +
      txt([A[0] - 5, A[1] + 52], '30°', { s: 10.5, a: 'end' }) + txt([B[0] + 40, B[1] - 5], '60°', { s: 10.5 }) +
      vlab(A, G, 'A', 11) + vlab(B, G, 'B') + vlab(Cc, G, 'C') + txt([H[0], H[1] + 15], 'H') +
      sval(A, Cc, G, '2a', 12) + txt([65, 164], 'a') + txt([135, 164], 'a');
    return svg('0 0 200 172', 'Tam giác đều ABC cạnh 2a, đường cao AH, các góc 30 độ và 60 độ', inner, 'art--tri');
  }

  /* Hình 4.8 — tam giác vuông tại A có góc C bằng 30°, BC = a */
  function tri48() {
    const A = [34, 128], B = [34, 28], Cc = [168, 128], G = cen(A, B, Cc);
    const inner = poly([A, B, Cc]) + rightMark(A, B, Cc) + arc(Cc, A, B, 30) +
      txt([Cc[0] - 42, Cc[1] - 5], '30°', { s: 11 }) +
      vlab(A, G, 'A') + vlab(B, G, 'B') + vlab(Cc, G, 'C') + sval(B, Cc, G, 'a', 12);
    return svg('0 0 200 150', 'Tam giác ABC vuông tại A, góc C bằng 30 độ, cạnh huyền BC bằng a', inner, 'art--tri');
  }

  /* Hình 4.9 — tam giác vuông tại C, hai góc phụ nhau α và β */
  function compl49() {
    const A = [24, 118], B = [176, 118], Cc = [98, 32], G = cen(A, B, Cc);
    const inner = poly([A, B, Cc]) + rightMark(Cc, A, B, 9) + arc(A, B, Cc, 24) + arc(B, A, Cc, 24) +
      txt([A[0] + 34, A[1] - 6], 'α', { s: 13 }) + txt([B[0] - 34, B[1] - 6], 'β', { s: 13 }) +
      vlab(A, G, 'A') + vlab(B, G, 'B') + vlab(Cc, G, 'C');
    return svg('0 0 200 140', 'Tam giác ABC vuông tại C với hai góc nhọn phụ nhau anpha và beta', inner, 'art--tri');
  }

  /* Hình 4.10 — đo khoảng cách AB qua sông */
  function river410() {
    const Cc = [22, 40], B = [74, 112], dir = unit(sub(B, Cc)), perp = [dir[1], -dir[0]];
    const A = add(B, mul(perp, 84)), G = cen(Cc, B, A);
    const inner =
      '<rect x="104" y="0" width="30" height="160" fill="' + C.water + '"/>' +
      '<path d="M104 0V160M134 0V160" stroke="#4aa3d6" stroke-width="1.6" fill="none"/>' +
      seg(Cc, B) + seg(B, A, { dash: 1 }) + seg(Cc, A, { dash: 1 }) + rightMark(B, Cc, A, 9) +
      arc(Cc, B, A, 28) + txt(add(Cc, mul(unit(add(unit(sub(B, Cc)), unit(sub(A, Cc)))), 46)), 'α', { s: 13 }) +
      vlab(Cc, G, 'C') + vlab(B, G, 'B') + vlab(A, G, 'A') + txt([34, 92], 'a');
    return svg('0 0 200 160', 'Hai điểm A, B ở hai bờ sông, điểm C cùng bờ với B sao cho tam giác ABC vuông tại B', inner, 'art--tri');
  }

  window.TEXTBOOK = window.TEXTBOOK || {};
  window.TEXTBOOK.art = Object.assign(window.TEXTBOOK.art || {}, {
    slope: slope, tri42: tri42a, tri45: tri45, tri43: tri43, similar44: similar44, tri46: tri46,
    iso47: iso47, equi47: equi47, tri48: tri48, compl49: compl49, river410: river410
  });
  /* các hàm dùng chung cho các hình ở file sau (Bài 12, Chương V) */
  window.TEXTBOOK.hh = { svg: svg, seg: seg, poly: poly, dot: dot, circle: circle, rightMark: rightMark, arc: arc, tick: tick, txt: txt, vlab: vlab, slab: slab, sval: sval, cen: cen,
    add: add, sub: sub, mul: mul, unit: unit, mid: mid, f: f, C: C, W: W };
})();
