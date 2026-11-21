/* ==========================================================================
   HÌNH VẼ — BÀI 12 (CHƯƠNG IV) VÀ CHƯƠNG V (ĐƯỜNG TRÒN)
   --------------------------------------------------------------------------
   Dùng lại bộ hàm của js/illustrations-hinh.js (window.TEXTBOOK.hh).
   Chữ trong hình: dòng Việt đậm, dòng Anh nghiêng (class "en").
   Các hình là bản vẽ lại, không phải ảnh của sách.
   ========================================================================== */
(function () {
  'use strict';
  const H = window.TEXTBOOK && window.TEXTBOOK.hh;
  if (!H) { console.warn('illustrations-hinh2.js: cần nạp illustrations-hinh.js trước'); return; }
  const { svg, seg, poly, dot, circle, rightMark, arc, tick, txt, vlab, slab, sval, cen, add, sub, mul, unit, mid, f, C } = H;

  /* ---- hàm phụ ---------------------------------------------------------- */
  const en = (p, s, o) => {
    o = o || {};
    return '<text class="en" x="' + f(p[0]) + '" y="' + f(p[1]) + '" text-anchor="' + (o.a || 'middle') + '" style="font-size:' + (o.s || 9.5) + 'px" fill="' + (o.c || C.pen) + '" opacity=".88">' + s + '</text>';
  };
  /* nhãn hai dòng Việt / Anh */
  const bil = (p, vi, e, o) => {
    o = o || {};
    return txt(p, vi, { i: false, s: o.s || 10.5, a: o.a, c: o.c }) + en([p[0], p[1] + (o.dy || 11)], e, { s: (o.s || 10.5) - 1, a: o.a, c: o.c });
  };
  /* chữ ghi số đo góc nằm trong góc V giữa tia VP, VQ */
  const ang = (V, P, Q, d, s, size) => {
    const b = unit(add(unit(sub(P, V)), unit(sub(Q, V)))), p = add(V, mul(b, d));
    return txt([p[0], p[1] + 4], s, { s: size || 11, i: false });
  };
  const arrow2 = (p, q) => seg(p, q, { w: 1.5 }) + seg(add(p, [0, -4]), add(p, [0, 4]), { w: 1.5 }) + seg(add(q, [0, -4]), add(q, [0, 4]), { w: 1.5 });
  const ground = (x1, x2, y, h) => '<rect x="' + x1 + '" y="' + y + '" width="' + (x2 - x1) + '" height="' + (h || 8) + '" fill="#dfe9d0"/>' + seg([x1, y], [x2, y]);

  /* tam giác vuông tại A (bản dùng chung) */
  function rtri(vb, label, A, B, Cc, o) {
    o = o || {};
    const G = cen(A, B, Cc), n = o.names || ['A', 'B', 'C'];
    let s = poly([A, B, Cc]) + rightMark(A, B, Cc);
    if (o.angB) s += arc(B, A, Cc, o.r || 24) + ang(B, A, Cc, (o.r || 24) + 15, o.angB);
    if (o.angC) s += arc(Cc, A, B, o.r || 24) + ang(Cc, A, B, (o.r || 24) + 15, o.angC);
    s += vlab(A, G, n[0]) + vlab(B, G, n[1]) + vlab(Cc, G, n[2]);
    if (o.ab) s += sval(A, B, G, o.ab, o.d);
    if (o.ac) s += sval(A, Cc, G, o.ac);
    if (o.bc) s += sval(B, Cc, G, o.bc);
    return svg(vb, label, s + (o.extra || ''), 'art--tri');
  }

  /* ========================================================================
     CHƯƠNG IV — BÀI 12
     ======================================================================== */

  /* Hình 4.11 — đo chiều cao toà lâu đài bằng giác kế */
  function castle411() {
    const gy = 128, P = [176, gy], Pp = [176, 24], Hh = [176, 108], M = [100, gy], Mp = [100, 108], N = [38, gy], Np = [38, 108];
    let s = '<rect x="150" y="30" width="54" height="' + (gy - 30) + '" fill="' + C.penL + '" stroke="' + C.ink + '" stroke-width="1.6"/>';
    for (let i = 0; i < 4; i++) s += '<rect x="' + (151 + i * 13.5) + '" y="23" width="9" height="7" fill="' + C.penL + '" stroke="' + C.ink + '" stroke-width="1.4"/>';
    s += ground(8, 210, gy, 9);
    s += seg(Np, Pp) + seg(Mp, Pp) + seg(Np, [176, 108], { dash: 1, c: C.grey }) + seg(Pp, P, { w: 1.6 });
    s += seg(N, Np, { w: 3 }) + seg(M, Mp, { w: 3 }) + dot(Np, C.red) + dot(Mp, C.red);
    s += arc(Np, Hh, Pp, 30) + arc(Mp, Hh, Pp, 24);
    s += txt([73, 101], 'β', { s: 12 }) + txt([127, 97], 'α', { s: 12 });
    s += txt([N[0] + 9, gy + 11], 'N', { s: 11 }) + txt([M[0] + 9, gy + 11], 'M', { s: 11 });
    s += txt([Np[0] - 8, Np[1] - 5], 'N′', { s: 11 }) + txt([Mp[0] - 8, Mp[1] - 5], 'M′', { s: 11 });
    s += txt([Pp[0] - 11, Pp[1] - 6], 'P′', { s: 11 }) + txt([Hh[0] - 8, Hh[1] - 4], 'H', { s: 11 }) + txt([P[0] - 8, P[1] - 4], 'P', { s: 11 });
    s += arrow2([N[0], gy + 22], [M[0], gy + 22]) + bil([69, gy + 35], 'NM = 20 m', 'baseline between stations', { s: 9.5 });
    s += txt([M[0] + 20, gy - 6], '1,6 m', { s: 9, i: false });
    s += bil([192, 70], 'Lâu đài', 'castle', { s: 9 });
    return svg('0 0 212 180', 'Đo chiều cao toà lâu đài bằng giác kế đặt tại hai điểm M và N cách nhau 20 mét', s, 'art--tri');
  }

  /* Hình 4.12 / 4.16 / 4.21 — tam giác ABC vuông tại A, cạnh huyền a, hai cạnh góc vuông b, c */
  function tri412() {
    const B = [24, 118], Cc = [176, 118], A = [56.4, 56];
    return rtri('0 0 200 140', 'Tam giác ABC vuông tại A với cạnh huyền a và hai cạnh góc vuông b, c', A, B, Cc, { ab: 'c', ac: 'b', bc: 'a' });
  }

  /* Hình 4.13 — máy bay lên cao với góc 30° */
  function plane413() {
    const A = [18, 118], Hh = [178, 118], B = [178, 26], G = cen(A, Hh, B);
    let s = poly([A, Hh, B]) + rightMark(Hh, A, B) + arc(A, Hh, B, 34) + txt([A[0] + 50, A[1] - 6], '30°', { s: 11, i: false });
    s += slab(A, B, G, '500 km/h', 'speed') + vlab(A, G, 'A') + vlab(B, G, 'B') + vlab(Hh, G, 'H');
    s += bil([100, 140], 'đường bay AB, độ cao BH', 'flight path AB, height BH', { s: 9.5 });
    return svg('0 0 200 160', 'Máy bay bay lên theo đường AB hợp với phương ngang góc 30 độ', s, 'art--tri');
  }

  /* Hình 4.14 — thang dựa tường */
  function ladder414() {
    const foot = [80, 128], top = [30, 128 - 50 * Math.tan(65 * Math.PI / 180)];
    let s = '<rect x="8" y="14" width="22" height="114" fill="#f1d9c4" stroke="' + C.ink + '" stroke-width="1.6"/>';
    for (let y = 26; y < 128; y += 14) s += seg([8, y], [30, y], { w: 0.8, c: C.grey });
    s += ground(8, 190, 128, 9) + seg(top, foot, { w: 3, c: C.pen }) + seg([30, 128], foot, { dash: 1 });
    s += arc(foot, [30, 128], top, 24) + txt([foot[0] - 36, foot[1] - 7], '65°', { s: 11, i: false });
    s += slab(foot, top, [140, 60], '3 m', 'ladder', 6);
    s += bil([112, 152], 'khoảng cách cần tìm', 'distance to find', { s: 9 });
    s += bil([6, 150], 'Tường', 'wall', { s: 8.5, a: 'start' });
    return svg('0 0 200 172', 'Chiếc thang dài 3 mét dựa vào tường, tạo với mặt đất góc 65 độ', s, 'art--tri');
  }

  /* Hình 4.15 — chèo đò qua sông */
  function ferry415() {
    const S = [50, 140], T = [50, 22], U = [50 + 118 * Math.tan(38.6 * Math.PI / 180), 22];
    let s = '<rect x="4" y="22" width="192" height="118" fill="' + C.water + '"/>' + seg([4, 22], [196, 22], { w: 2.4 }) + seg([4, 140], [196, 140], { w: 2.4 });
    s += seg(S, T, { dash: 1 }) + seg(S, U, { dash: 1, c: C.red }) + rightMark(T, S, U, 8) + arc(S, T, U, 30) + txt([S[0] + 18, S[1] - 40], 'α', { s: 12 });
    s += txt([S[0] - 8, 86], '250 m', { s: 10, i: false, a: 'end' }) + txt([112, 96], '320 m', { s: 10, i: false });
    s += dot(U, C.red) + bil([160, 40], 'bờ bên kia', 'far bank', { s: 8.5 }) + bil([160, 124], 'bờ bên này', 'near bank', { s: 8.5 });
    return svg('0 0 200 172', 'Con đò bị dòng nước đẩy lệch góc anpha khi qua sông rộng 250 mét, đi 320 mét', s, 'art--tri');
  }

  /* Hình 4.17 — bóng của toà tháp */
  function shadow417() {
    const L = [24, 128], F = [160, 128], Tp = [160, 128 - 136 * Math.tan(34 * Math.PI / 180)];
    let s = ground(8, 196, 128, 9);
    s += '<circle cx="182" cy="30" r="9" fill="#f6c343" stroke="#d9a21b" stroke-width="1.4"/>';
    s += seg(L, Tp, { c: C.red, w: 1.8 }) + seg(F, Tp, { w: 1.8, dash: 0 }) + '<rect x="156" y="' + f(Tp[1]) + '" width="8" height="' + f(128 - Tp[1]) + '" fill="#f6d5d5" stroke="' + C.ink + '" stroke-width="1.4"/>';
    s += rightMark(F, L, Tp, 7) + arc(L, F, Tp, 36) + txt([L[0] + 50, L[1] - 6], '34°', { s: 11, i: false });
    s += arrow2([L[0], 145], [F[0], 145]) + bil([92, 158], 'bóng 8,6 m', 'shadow length', { s: 9.5 });
    s += txt([Tp[0] - 14, 80], 'h', { s: 13 }) + bil([Tp[0] - 4, 20], 'tháp', 'tower', { s: 8.5, a: 'end' });
    return svg('0 0 200 176', 'Tia nắng tạo với mặt đất góc 34 độ, bóng của tháp dài 8,6 mét, chiều cao tháp là h', s, 'art--tri');
  }

  /* Hình 4.19 — giải tam giác vuông AB = 5, AC = 8 */
  function tri419() {
    const A = [40, 138], B = [115, 138], Cc = [40, 18];
    return rtri('0 0 160 170', 'Tam giác ABC vuông tại A có AB bằng 5 và AC bằng 8', A, B, Cc, { ab: '5', ac: '8', angB: undefined });
  }
  /* Hình 4.20 — AB = 3, góc B = 42° */
  function tri420() {
    const A = [30, 128], B = [120, 128], Cc = [30, 128 - 90 * Math.tan(42 * Math.PI / 180)];
    return rtri('0 0 170 160', 'Tam giác ABC vuông tại A có AB bằng 3 và góc B bằng 42 độ', A, B, Cc, { ab: '3', angB: '42°', r: 26 });
  }
  /* Hình 4.25 — AB = 5 cm, AC = 12 cm */
  function tri425() {
    const A = [46, 104], Cc = [176, 104], B = [46, 54];
    return rtri('0 0 214 132', 'Tam giác ABC vuông tại A có AB bằng 5 cm và AC bằng 12 cm', A, B, Cc, { ab: '5 cm', ac: '12 cm', d: 19 });
  }
  /* Hình 4.26 — bức tường hình thang vuông */
  function wall426() {
    const A = [50, 112], D = [170, 112], B = [50, 92], Cc = [170, 32], E = [170, 92], I = [10, 112];
    let s = poly([A, D, Cc, B], '#f2c6b5') + seg(B, E, { dash: 1, c: C.ink }) + seg(I, B, { dash: 1 }) + seg(I, A, { dash: 1 });
    s += rightMark(A, D, B, 7) + rightMark(D, A, Cc, 7) + arc(I, D, B, 22) + txt([I[0] + 29, I[1] - 4], 'α', { s: 12 });
    s += txt([A[0] - 2, A[1] + 14], 'A', { s: 12 }) + txt([D[0] + 8, D[1] + 10], 'D', { s: 12 }) + txt([B[0] - 8, B[1] - 4], 'B', { s: 12 }) +
      txt([Cc[0] + 4, Cc[1] - 5], 'C', { s: 12 }) + txt([E[0] + 9, E[1] + 4], 'E', { s: 12 }) + txt([I[0] - 3, I[1] + 14], 'I', { s: 12 });
    s += txt([110, 126], '6', { s: 11, i: false }) + txt([A[0] + 9, 104], '1', { s: 10, i: false }) + txt([E[0] + 9, 62], '4', { s: 11, i: false });
    s += bil([110, 146], 'mặt đất AD', 'ground AD', { s: 9 });
    return svg('0 0 200 164', 'Bức tường hình thang vuông ABCD với AB bằng 1 m, CD bằng 4 m, AD bằng 6 m', s, 'art--tri');
  }
  /* Hình 4.32 — tam giác 3, 4, 5 */
  function tri432() {
    const L = [18, 112], R = [158, 112], Ap = [18 + 84 * 0.6, 112 - 84 * 0.8];
    const G = cen(L, R, Ap);
    let s = poly([L, R, Ap]) + rightMark(Ap, L, R, 8) + arc(L, R, Ap, 26) + txt([L[0] + 40, L[1] - 6], 'α', { s: 12 });
    s += sval(L, Ap, G, '3') + sval(Ap, R, G, '4') + sval(L, R, G, '5');
    return svg('0 0 180 140', 'Tam giác vuông có hai cạnh góc vuông 3 và 4, cạnh huyền 5, góc nhọn anpha', s, 'art--tri');
  }

  /* ========================================================================
     CHƯƠNG V — ĐƯỜNG TRÒN
     ======================================================================== */

  /* Vẽ đường tròn bằng compa */
  function compass5() {
    const O = [92, 112], R = 58, a = -30 * Math.PI / 180, Pn = [O[0] + R * Math.cos(a), O[1] + R * Math.sin(a)], Hn = [118, 22];
    let s = circle(O, R, '#f7f9ff') + seg(O, Pn, { dash: 1, c: C.red }) + seg(Hn, O, { w: 3 }) + seg(Hn, Pn, { w: 3 }) + '<circle cx="' + f(Hn[0]) + '" cy="' + f(Hn[1]) + '" r="5" fill="' + C.penL + '" stroke="' + C.ink + '" stroke-width="1.8"/>';
    s += seg([Hn[0], Hn[1] - 5], [Hn[0], Hn[1] - 14], { w: 3 }) + dot(O, C.red) + '<circle cx="' + f(Pn[0]) + '" cy="' + f(Pn[1]) + '" r="3.6" fill="' + C.red + '"/>';
    s += txt([O[0] - 4, O[1] + 16], 'O', { s: 13 }) + txt([(O[0] + Pn[0]) / 2 - 2, (O[1] + Pn[1]) / 2 + 14], 'R', { s: 13 }) + txt([Pn[0] + 10, Pn[1] + 6], 'M', { s: 13 });
    s += bil([O[0], O[1] + 78], 'OM = R với mọi điểm M trên đường tròn', 'every point M is at distance R from O', { s: 9.5 });
    return svg('0 0 200 214', 'Dùng compa vẽ đường tròn tâm O bán kính R', s, 'art--circ');
  }

  /* Hình 5.1 — điểm nằm trên, trong, ngoài đường tròn */
  function circ51() {
    const O = [74, 78], R = 58, a = 50 * Math.PI / 180, A = [O[0] + R * Math.cos(a), O[1] - R * Math.sin(a)], Cc = [O[0] + 30, O[1]], B = [O[0] + 100, O[1]];
    let s = circle(O, R) + seg(O, A) + seg(O, B) + dot(O) + dot(A) + dot(Cc) + dot(B);
    s += txt([O[0] - 10, O[1] + 4], 'O', { s: 12 }) + txt([A[0] + 7, A[1] - 3], 'A', { s: 12 }) + txt([Cc[0], Cc[1] + 16], 'C', { s: 12 }) + txt([B[0] + 4, B[1] - 8], 'B', { s: 12 }) +
      txt([(O[0] + A[0]) / 2 - 7, (O[1] + A[1]) / 2 - 2], 'R', { s: 12 });
    const y0 = 160;
    s += txt([6, y0], 'A: OA = R → nằm trên', { a: 'start', i: false, s: 9.5 }) + en([6, y0 + 10], 'A is on the circle', { a: 'start', s: 8.5 });
    s += txt([6, y0 + 24], 'C: OC < R → nằm trong', { a: 'start', i: false, s: 9.5 }) + en([6, y0 + 34], 'C is inside the circle', { a: 'start', s: 8.5 });
    s += txt([112, y0], 'B: OB > R → nằm ngoài', { a: 'start', i: false, s: 9.5 }) + en([112, y0 + 10], 'B is outside the circle', { a: 'start', s: 8.5 });
    return svg('0 0 230 204', 'Điểm A nằm trên, điểm C nằm trong, điểm B nằm ngoài đường tròn tâm O bán kính R', s, 'art--circ');
  }

  /* Hình 5.2 — đường tròn đường kính AB */
  function diam52() {
    const O = [90, 80], R = 62, A = [28, 80], B = [152, 80];
    let s = circle(O, R) + seg(A, B) + tick(A, O) + tick(O, B) + dot(O) + dot(A) + dot(B);
    s += txt([A[0] - 10, A[1] + 4], 'A', { s: 12 }) + txt([B[0] + 10, B[1] + 4], 'B', { s: 12 }) + txt([O[0], O[1] - 9], 'O', { s: 12 });
    s += bil([O[0], 168], 'đường tròn đường kính AB', 'circle with diameter AB', { s: 9.5 });
    return svg('0 0 180 184', 'Đường tròn tâm O đường kính AB, O là trung điểm của AB', s, 'art--circ');
  }

  /* Hình 5.3 — đối xứng tâm: (a) hai điểm M, M′ qua I; (b) hình bình hành */
  function sym53() {
    const M = [34, 40], Mp = [186, 40], I = [110, 40];
    let s = txt([8, 12], 'a)', { a: 'start', i: false, s: 10 }) + seg(M, Mp) + dot(M) + dot(Mp) + dot(I, C.red) + tick(M, I) + tick(I, Mp);
    s += txt([M[0] - 10, M[1] + 4], 'M', { s: 12 }) + txt([Mp[0] + 11, Mp[1] + 4], 'M′', { s: 12 }) + txt([I[0], I[1] + 18], 'I', { s: 12, c: C.red });
    s += bil([110, 74], 'M và M′ đối xứng qua tâm I', 'M and M′ are symmetric about centre I', { s: 9 });
    const A = [40, 188], B = [76, 108], Cc = [180, 108], D = [144, 188], O = mid(A, Cc);
    s += txt([8, 100], 'b)', { a: 'start', i: false, s: 10 }) + poly([A, B, Cc, D]) + seg(A, Cc) + seg(B, D) + dot(O, C.red) +
      tick(A, O) + tick(O, Cc) + tick(B, O) + tick(O, D);
    s += txt([A[0] - 9, A[1] + 6], 'A', { s: 12 }) + txt([B[0] - 4, B[1] - 6], 'B', { s: 12 }) + txt([Cc[0] + 9, Cc[1] - 2], 'C', { s: 12 }) + txt([D[0] + 9, D[1] + 6], 'D', { s: 12 }) +
      txt([O[0] + 2, O[1] - 7], 'O', { s: 12, c: C.red });
    s += bil([110, 214], 'A đối xứng C, B đối xứng D qua O', 'A↔C and B↔D are symmetric about O', { s: 9 });
    return svg('0 0 220 236', 'Đối xứng tâm: hai điểm M, M phẩy đối xứng qua I; hình bình hành ABCD có tâm đối xứng O', s, 'art--circ');
  }

  /* Hình 5.4 — đối xứng trục: (a) hai điểm qua đường thẳng d; (b) tam giác cân */
  function sym54() {
    const M = [34, 66], Mp = [186, 66], Hh = [110, 66];
    let s = txt([8, 12], 'a)', { a: 'start', i: false, s: 10 }) + seg([110, 14], [110, 120], { c: C.red, w: 2.2 }) + seg(M, Mp) + rightMark(Hh, M, [110, 14], 8) + dot(M) + dot(Mp) + dot(Hh);
    s += txt([M[0] - 10, M[1] + 4], 'M', { s: 12 }) + txt([Mp[0] + 11, Mp[1] + 4], 'M′', { s: 12 }) + txt([Hh[0] + 11, Hh[1] + 15], 'H', { s: 12 }) + txt([118, 22], 'd', { s: 13, c: C.red, a: 'start' });
    s += bil([110, 138], 'M và M′ đối xứng qua trục d', 'M and M′ are symmetric about axis d', { s: 9 });
    const A = [110, 182], B = [56, 254], Cc = [164, 254], H2 = [110, 254];
    s += txt([8, 190], 'b)', { a: 'start', i: false, s: 10 }) + poly([A, B, Cc]) + seg(A, H2, { c: C.red, w: 2 }) + rightMark(H2, A, Cc, 8) + tick(A, B) + tick(A, Cc);
    s += txt([A[0], A[1] - 7], 'A', { s: 12 }) + txt([B[0] - 9, B[1] + 5], 'B', { s: 12 }) + txt([Cc[0] + 9, Cc[1] + 5], 'C', { s: 12 }) + txt([H2[0] + 8, H2[1] + 15], 'H', { s: 12 });
    s += bil([110, 288], 'AH là trục: B và C đối xứng qua AH', 'AH is the axis: B and C are symmetric about AH', { s: 9 });
    return svg('0 0 220 308', 'Đối xứng trục: M, M phẩy đối xứng qua đường thẳng d; tam giác ABC cân tại A có trục đối xứng AH', s, 'art--circ');
  }

  /* Hình 5.5 — tìm điểm đối xứng với M qua tâm O và qua đường kính AB */
  function circ55() {
    const O = [100, 88], R = 66, t = 40 * Math.PI / 180;
    const M = [O[0] + R * Math.cos(t), O[1] - R * Math.sin(t)], N = [O[0] - R * Math.cos(t), O[1] + R * Math.sin(t)], P = [M[0], O[1] + R * Math.sin(t)], Hh = [M[0], O[1]];
    const A = [O[0] - R, O[1]], B = [O[0] + R, O[1]];
    let s = circle(O, R) + seg([A[0] - 10, A[1]], [B[0] + 14, B[1]]) + seg(M, P) + seg(M, N) + rightMark(Hh, B, M, 7);
    [O, M, N, P].forEach((q) => { s += dot(q); });
    s += txt([A[0] - 12, A[1] + 4], 'A', { s: 12 }) + txt([B[0] + 6, B[1] - 6], 'B', { s: 12 }) + txt([O[0] - 4, O[1] - 7], 'O', { s: 12 }) + txt([M[0] + 4, M[1] - 7], 'M', { s: 12 }) +
      txt([N[0] - 10, N[1] + 12], 'N', { s: 12 }) + txt([P[0] + 4, P[1] + 15], 'P', { s: 12 }) + txt([Hh[0] - 9, Hh[1] + 15], 'H', { s: 12 });
    s += bil([100, 168], 'N đối xứng M qua tâm O', 'N is M reflected in centre O', { s: 9 }) + bil([100, 192], 'P đối xứng M qua trục AB', 'P is M reflected in axis AB', { s: 9 });
    return svg('0 0 200 210', 'Điểm N đối xứng với M qua tâm O, điểm P đối xứng với M qua đường kính AB', s, 'art--circ');
  }

  /* Hình 5.6 — dây và đường kính */
  function circ56() {
    const O = [90, 84], R = 62, A = [28, 84], B = [152, 84];
    const pt = (d) => [O[0] + R * Math.cos(d * Math.PI / 180), O[1] - R * Math.sin(d * Math.PI / 180)];
    const Cc = pt(142), D = pt(62);
    let s = circle(O, R) + seg(A, B) + seg(Cc, D, { c: C.red, w: 2.6 }) + dot(O) + dot(A) + dot(B) + dot(Cc) + dot(D);
    s += txt([A[0] - 10, A[1] + 4], 'A', { s: 12 }) + txt([B[0] + 10, B[1] + 4], 'B', { s: 12 }) + txt([O[0], O[1] + 15], 'O', { s: 12 }) + txt([Cc[0] - 9, Cc[1] - 3], 'C', { s: 12 }) + txt([D[0] + 8, D[1] - 5], 'D', { s: 12 });
    s += bil([O[0], 168], 'CD là dây; AB là đường kính', 'CD is a chord; AB is a diameter', { s: 9.5 });
    return svg('0 0 180 186', 'Đường tròn tâm O có dây CD và đường kính AB', s, 'art--circ');
  }

  /* Hình 5.7 — dây AB không đi qua tâm */
  function circ57() {
    const O = [74, 88], R = 62, x = 74 + 46, h = Math.sqrt(R * R - 46 * 46);
    const A = [x, O[1] + h], B = [x, O[1] - h], I = [x, O[1]];
    let s = circle(O, R) + seg([O[0] - R, O[1]], [O[0] + R, O[1]], { c: C.grey, w: 1.4 }) + seg(A, B) + seg(O, A) + seg(O, B) + seg(O, I, { dash: 1 }) + rightMark(I, O, B, 7);
    [O, A, B, I].forEach((q) => { s += dot(q); });
    s += txt([O[0] - 9, O[1] + 4], 'O', { s: 12 }) + txt([B[0] + 8, B[1] - 4], 'B', { s: 12 }) + txt([A[0] + 8, A[1] + 12], 'A', { s: 12 }) + txt([I[0] + 9, I[1] - 3], 'I', { s: 12 });
    s += bil([O[0] + 10, 176], 'AB < OA + OB = 2R', 'a chord not through O is shorter than 2R', { s: 9.5 });
    return svg('0 0 190 194', 'Dây AB không đi qua tâm O, tam giác AOB có AB nhỏ hơn OA cộng OB bằng 2R', s, 'art--circ');
  }

  /* Hình 5.8 — bốn điểm A, B, C, D cùng thuộc một đường tròn */
  function circ58() {
    const O = [100, 100], R = 70, pt = (d) => [O[0] + R * Math.cos(d * Math.PI / 180), O[1] - R * Math.sin(d * Math.PI / 180)];
    const B = pt(180), Cc = pt(0), A = pt(128), D = pt(58);
    let s = '<circle cx="100" cy="100" r="70" fill="none" stroke="' + C.ink + '" stroke-width="1.6" stroke-dasharray="6 4"/>' +
      seg(B, Cc) + seg(A, B) + seg(A, Cc) + seg(D, B) + seg(D, Cc) + seg(A, D) + seg(O, A, { dash: 1 }) + seg(O, D, { dash: 1 }) + rightMark(A, B, Cc, 7) + rightMark(D, B, Cc, 7);
    [O, A, B, Cc, D].forEach((q) => { s += dot(q); });
    s += txt([B[0] - 10, B[1] + 5], 'B', { s: 12 }) + txt([Cc[0] + 10, Cc[1] + 5], 'C', { s: 12 }) + txt([A[0] - 6, A[1] - 7], 'A', { s: 12 }) + txt([D[0] + 7, D[1] - 6], 'D', { s: 12 }) + txt([O[0], O[1] + 15], 'O', { s: 12 });
    s += bil([100, 192], 'A, D nằm trên đường tròn đường kính BC', 'A and D lie on the circle with diameter BC', { s: 9 });
    return svg('0 0 200 212', 'Tứ giác ABCD có hai góc BAC và BDC vuông nên A, B, C, D cùng thuộc đường tròn đường kính BC', s, 'art--circ');
  }

  /* Hình 5.9 — góc ở tâm, cung nhỏ, cung lớn */
  function circ59() {
    const O = [92, 84], R = 64, t = 72 * Math.PI / 180;
    const A = [O[0] + R, O[1]], B = [O[0] + R * Math.cos(t), O[1] - R * Math.sin(t)];
    let s = circle(O, R) + '<path d="M' + f(A[0]) + ' ' + f(A[1]) + 'A' + R + ' ' + R + ' 0 0 0 ' + f(B[0]) + ' ' + f(B[1]) + '" fill="none" stroke="' + C.red + '" stroke-width="4.2" stroke-linecap="round"/>';
    s += seg(O, A) + seg(O, B) + arc(O, A, B, 17) + txt([O[0] + 30, O[1] - 9], 'α', { s: 12 }) + dot(O) + dot(A) + dot(B);
    s += txt([O[0] - 4, O[1] + 16], 'O', { s: 12 }) + txt([A[0] + 11, A[1] + 3], 'A', { s: 12 }) + txt([B[0] + 3, B[1] - 8], 'B', { s: 12 });
    s += txt([O[0] + 62, O[1] - 52], 'm', { s: 12, c: C.red }) + txt([O[0] - 76, O[1] + 40], 'n', { s: 12 });
    const y0 = 168;
    s += txt([6, y0], 'AmB: cung nhỏ', { a: 'start', i: false, s: 9 }) + en([84, y0], 'minor arc', { a: 'start', s: 9 });
    s += txt([6, y0 + 13], 'AnB: cung lớn', { a: 'start', i: false, s: 9 }) + en([84, y0 + 13], 'major arc', { a: 'start', s: 9 });
    s += txt([6, y0 + 26], '∠AOB = α: góc ở tâm', { a: 'start', i: false, s: 9 }) + en([116, y0 + 26], 'central angle', { a: 'start', s: 9 });
    return svg('0 0 210 206', 'Góc ở tâm AOB chắn cung nhỏ AmB; cung lớn AnB là phần còn lại của đường tròn', s, 'art--circ');
  }

  /* Hình 5.10 — ba điểm A, B, C trên đường tròn */
  function circ510() {
    const O = [92, 92], R = 64, pt = (d) => [O[0] + R * Math.cos(d * Math.PI / 180), O[1] - R * Math.sin(d * Math.PI / 180)];
    const A = pt(64), B = pt(-6), Cc = pt(152);
    let s = circle(O, R) + seg(O, A) + seg(O, B) + seg(O, Cc) + seg(A, Cc, { c: C.grey }) + seg(A, B, { c: C.grey }) + seg(Cc, B, { c: C.grey });
    [O, A, B, Cc].forEach((q) => { s += dot(q); });
    s += txt([O[0] + 4, O[1] + 16], 'O', { s: 12 }) + txt([A[0] + 8, A[1] - 5], 'A', { s: 12 }) + txt([B[0] + 11, B[1] + 4], 'B', { s: 12 }) + txt([Cc[0] - 10, Cc[1] - 3], 'C', { s: 12 });
    s += bil([92, 176], 'các góc ở tâm AOB, BOC, COA', 'the central angles AOB, BOC, COA', { s: 9 });
    return svg('0 0 190 196', 'Ba điểm A, B, C trên đường tròn tâm O và ba góc ở tâm AOB, BOC, COA', s, 'art--circ');
  }

  /* Hình 5.11 — tam giác vuông cân ABC nội tiếp, BC là đường kính */
  function circ511() {
    const O = [92, 92], R = 64, B = [28, 92], Cc = [156, 92], A = [92, 28];
    let s = circle(O, R) + seg(B, Cc) + seg(A, B) + seg(A, Cc) + seg(A, O, { dash: 1 }) + rightMark(O, Cc, A, 8) + rightMark(A, B, Cc, 7);
    [O, A, B, Cc].forEach((q) => { s += dot(q); });
    s += txt([A[0], A[1] - 8], 'A', { s: 12 }) + txt([B[0] - 10, B[1] + 5], 'B', { s: 12 }) + txt([Cc[0] + 10, Cc[1] + 5], 'C', { s: 12 }) + txt([O[0] + 10, O[1] + 14], 'O', { s: 12 });
    s += bil([92, 182], 'sđ AB = sđ AC = 90°, sđ ACB = 270°', 'arc measure AB = AC = 90°', { s: 9 });
    return svg('0 0 184 200', 'Tam giác ABC vuông cân tại A nội tiếp đường tròn tâm O đường kính BC', s, 'art--circ');
  }


  /* ========================================================================
     CHƯƠNG V — BÀI 15 VÀ LUYỆN TẬP CHUNG
     ======================================================================== */
  const P2R = (O, R, d) => [O[0] + R * Math.cos(d * Math.PI / 180), O[1] - R * Math.sin(d * Math.PI / 180)];
  const foot = (P, A, B) => { const d = sub(B, A), t = ((P[0] - A[0]) * d[0] + (P[1] - A[1]) * d[1]) / (d[0] * d[0] + d[1] * d[1]); return add(A, mul(d, t)); };

  /* Hình 5.13 — góc ở tâm 120°, cung nhỏ AB và cung lớn AmB */
  function circ513() {
    const O = [90, 86], R = 62, A = P2R(O, R, 150), B = P2R(O, R, 30);
    let s = circle(O, R) + '<path d="M' + f(A[0]) + ' ' + f(A[1]) + 'A' + R + ' ' + R + ' 0 0 1 ' + f(B[0]) + ' ' + f(B[1]) + '" fill="none" stroke="' + C.red + '" stroke-width="4.2" stroke-linecap="round"/>';
    s += seg(O, A) + seg(O, B) + arc(O, A, B, 20) + txt([O[0], O[1] - 28], '120°', { s: 11, i: false }) + dot(O) + dot(A) + dot(B);
    s += txt([O[0], O[1] + 15], 'O', { s: 12 }) + txt([A[0] - 9, A[1] - 3], 'A', { s: 12 }) + txt([B[0] + 9, B[1] - 3], 'B', { s: 12 }) + txt([O[0], O[1] + R + 14], 'm', { s: 12 });
    s += txt([6, 176], 'cung nhỏ AB: 120°, l₁ = 2π cm', { a: 'start', i: false, s: 9 }) + en([6, 187], 'minor arc AB: 120°, l₁ = 2π cm', { a: 'start', s: 8.5 });
    s += txt([6, 202], 'cung lớn AmB: 240°, l₂ = 4π cm', { a: 'start', i: false, s: 9 }) + en([6, 213], 'major arc AmB: 240°, l₂ = 4π cm', { a: 'start', s: 8.5 });
    return svg('0 0 200 222', 'Đường tròn tâm O bán kính 3 cm, góc ở tâm AOB bằng 120 độ, cung nhỏ AB và cung lớn AmB', s, 'art--circ');
  }

  /* Hình 5.15 — hình quạt tròn */
  function sector515() {
    const O = [70, 80], R = 60, A = P2R(O, R, 40), B = P2R(O, R, -40);
    let s = circle(O, R) + '<path d="M' + f(O[0]) + ' ' + f(O[1]) + 'L' + f(A[0]) + ' ' + f(A[1]) + 'A' + R + ' ' + R + ' 0 0 1 ' + f(B[0]) + ' ' + f(B[1]) + 'Z" fill="#fbd9cf" stroke="' + C.red + '" stroke-width="2.4" stroke-linejoin="round"/>';
    s += arc(O, A, B, 20) + txt([O[0] + 34, O[1] + 4], 'n°', { s: 11, i: false }) + dot(O) + dot(A) + dot(B);
    s += txt([O[0] - 10, O[1] + 4], 'O', { s: 12 }) + txt([A[0] + 8, A[1] - 3], 'A', { s: 12 }) + txt([B[0] + 8, B[1] + 8], 'B', { s: 12 });
    s += bil([95, 164], 'hình quạt tròn OAB', 'circular sector OAB', { s: 9.5 });
    return svg('0 0 190 184', 'Hình quạt tròn OAB giới hạn bởi cung AB và hai bán kính OA, OB', s, 'art--circ');
  }

  /* Hình 5.16 — hình vành khuyên */
  function annulus516() {
    const O = [90, 80], R = 62, r = 32;
    const ring = '<path fill-rule="evenodd" fill="' + C.water + '" stroke="' + C.ink + '" stroke-width="2.2" d="M' + (O[0] - R) + ' ' + O[1] + 'a' + R + ' ' + R + ' 0 1 0 ' + 2 * R + ' 0a' + R + ' ' + R + ' 0 1 0 ' + (-2 * R) + ' 0ZM' + (O[0] - r) + ' ' + O[1] + 'a' + r + ' ' + r + ' 0 1 0 ' + 2 * r + ' 0a' + r + ' ' + r + ' 0 1 0 ' + (-2 * r) + ' 0Z"/>';
    const Pr = P2R(O, r, 25), PR = P2R(O, R, -35);
    let s = ring + seg(O, Pr, { c: C.red }) + seg(O, PR, { c: C.red }) + dot(O);
    s += txt([O[0] - 9, O[1] + 4], 'O', { s: 12 }) + txt([Pr[0] - 4, Pr[1] - 7], 'r', { s: 12 }) + txt([(O[0] + PR[0]) / 2 + 7, (O[1] + PR[1]) / 2 + 12], 'R', { s: 12 });
    s += bil([90, 164], 'hình vành khuyên (R > r)', 'annulus (circular ring), R > r', { s: 9.5 });
    return svg('0 0 180 184', 'Hình vành khuyên nằm giữa hai đường tròn đồng tâm bán kính R và r', s, 'art--circ');
  }

  /* Hình 5.17 — tấm bia năm đường tròn đồng tâm */
  function target517() {
    const O = [90, 86], k = 2.2, rs = [30, 20, 15, 10, 5];
    let s = '';
    rs.forEach((r, i) => { s += '<circle cx="' + O[0] + '" cy="' + O[1] + '" r="' + f(r * k) + '" fill="' + (r === 15 ? '#f6c2c4' : (i % 2 ? '#dbe4ff' : '#bcd0ff')) + '" stroke="' + C.ink + '" stroke-width="1.6"/>'; });
    s += dot(O, C.red) + seg([O[0] + 15 * k, O[1] - 2], [150, 24], { c: C.red, w: 1.4 }) + txt([152, 20], 'vòng 8', { a: 'start', i: false, s: 9.5, c: C.red }) + en([152, 30], 'ring 8', { a: 'start', s: 9, c: C.red });
    s += bil([90, 168], 'bán kính 5, 10, 15, 20, 30 cm', 'radii 5, 10, 15, 20, 30 cm', { s: 9.5 });
    return svg('0 0 200 190', 'Tấm bia gồm năm đường tròn đồng tâm bán kính 5, 10, 15, 20 và 30 cm; vòng 8 là hình vành khuyên giữa đường tròn thứ hai và thứ ba', s, 'art--circ');
  }

  /* Hình 5.20 — đường tròn đường kính BC đi qua chân hai đường cao */
  function circ520() {
    const O = [100, 150], R = 60, B = [40, 150], Cc = [160, 150], A = [100, 24];
    const K = foot(Cc, A, B), Hh = foot(B, A, Cc);
    let s = circle(O, R) + seg(A, B) + seg(A, Cc) + seg(B, Cc) + seg(B, Hh) + seg(Cc, K) + seg(O, Hh, { dash: 1 }) + seg(O, K, { dash: 1 }) + rightMark(K, A, Cc, 7) + rightMark(Hh, A, B, 7);
    [O, K, Hh, B, Cc, A].forEach((q) => { s += dot(q); });
    s += txt([A[0], A[1] - 8], 'A', { s: 12 }) + txt([B[0] - 10, B[1] + 5], 'B', { s: 12 }) + txt([Cc[0] + 10, Cc[1] + 5], 'C', { s: 12 }) + txt([O[0], O[1] + 17], 'O', { s: 12 }) +
      txt([K[0] - 10, K[1] - 3], 'K', { s: 12 }) + txt([Hh[0] + 10, Hh[1] - 3], 'H', { s: 12 });
    s += bil([100, 232], 'K, H nằm trên đường tròn đường kính BC', 'K and H lie on the circle with diameter BC', { s: 9 });
    return svg('0 0 200 248', 'Tam giác nhọn ABC cân tại A, hai đường cao BH, CK và đường tròn đường kính BC', s, 'art--circ');
  }

  /* Hình 5.21 — hình viên phân ứng với cung 90° */
  function seg521() {
    const O = [74, 84], R = 64, A = P2R(O, R, 45), B = P2R(O, R, -45);
    let s = '<path d="M' + f(A[0]) + ' ' + f(A[1]) + 'A' + R + ' ' + R + ' 0 0 1 ' + f(B[0]) + ' ' + f(B[1]) + 'Z" fill="' + C.water + '" stroke="' + C.ink + '" stroke-width="2"/>' + circle(O, R) +
      seg(O, A) + seg(O, B) + rightMark(O, A, B, 9) + seg(A, B);
    [O, A, B].forEach((q) => { s += dot(q); });
    s += txt([O[0] - 10, O[1] + 4], 'O', { s: 12 }) + txt([A[0] + 8, A[1] - 4], 'A', { s: 12 }) + txt([B[0] + 8, B[1] + 10], 'B', { s: 12 }) + txt([(O[0] + A[0]) / 2 - 7, (O[1] + A[1]) / 2 - 3], 'R', { s: 12 });
    s += bil([92, 170], 'hình viên phân (phần tô màu)', 'circular segment (shaded)', { s: 9.5 });
    return svg('0 0 190 190', 'Hình viên phân giới hạn bởi dây AB và cung nhỏ AB có số đo 90 độ', s, 'art--circ');
  }

  /* Hình 5.22b — guồng nước: dây AB = 4 m, HC = 0,5 m */
  function wheel522() {
    const O = [100, 78], R = 70, hh = 61.8, hw = 32.9, Hh = [100, O[1] + hh], A = [100 - hw, Hh[1]], B = [100 + hw, Hh[1]], Cc = [100, O[1] + R];
    let s = circle(O, R) + seg([A[0] - 30, A[1]], [B[0] + 30, B[1]], { c: C.ink }) + seg(O, A) + seg(O, Cc, { dash: 1 }) + rightMark(Hh, O, A, 7);
    [O, A, B, Hh, Cc].forEach((q) => { s += dot(q); });
    s += txt([O[0] + 10, O[1] + 4], 'O', { s: 12 }) + txt([A[0] - 9, A[1] + 14], 'A', { s: 12 }) + txt([B[0] + 9, B[1] + 14], 'B', { s: 12 }) + txt([Hh[0] + 10, Hh[1] - 4], 'H', { s: 12 }) + txt([Cc[0] + 10, Cc[1] + 12], 'C', { s: 12 });
    s += bil([100, 184], 'AB = 4 m (mực nước), HC = 0,5 m', 'AB = 4 m (water line), HC = 0.5 m', { s: 9 });
    return svg('0 0 200 202', 'Guồng nước hình tròn có dây AB bằng 4 mét là mực nước và điểm ngập sâu nhất C cách AB 0,5 mét', s, 'art--circ');
  }

  window.TEXTBOOK.art = Object.assign(window.TEXTBOOK.art || {}, {
    circ513: circ513, sector515: sector515, annulus516: annulus516, target517: target517, circ520: circ520, seg521: seg521, wheel522: wheel522,
    castle411: castle411, tri412: tri412, plane413: plane413, ladder414: ladder414, ferry415: ferry415, shadow417: shadow417,
    tri419: tri419, tri420: tri420, tri425: tri425, wall426: wall426, tri432: tri432,
    compass5: compass5, circ51: circ51, diam52: diam52, sym53: sym53, sym54: sym54, circ55: circ55, circ56: circ56,
    circ57: circ57, circ58: circ58, circ59: circ59, circ510: circ510, circ511: circ511
  });
})();
