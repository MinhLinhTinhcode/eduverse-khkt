/* ==========================================================================
   HÌNH VẼ — BÀI 16, BÀI 17 (CHƯƠNG V): ĐƯỜNG THẲNG – ĐƯỜNG TRÒN, TIẾP TUYẾN,
   HAI ĐƯỜNG TRÒN
   --------------------------------------------------------------------------
   Dùng lại bộ hàm của js/illustrations-hinh.js (window.TEXTBOOK.hh).
   Chữ trong hình: dòng Việt đậm, dòng Anh nghiêng (class "en").
   Các hình là bản vẽ lại, không phải ảnh của sách.

     line526  Hình 5.26  ba vị trí của đường thẳng và đường tròn (d < R, d = R, d > R)
     tang527  Hình 5.27  chứng minh CB là tiếp tuyến (Ví dụ 1)
     tang528  Hình 5.28  hai tiếp tuyến cắt nhau tại M
     tang529  Hình 5.29  Ví dụ 2: R = 2 cm, MO = 4 cm
     circ532  Hình 5.32  hai đường tròn cắt nhau
     circ534  Hình 5.34  tiếp xúc ngoài, tiếp xúc trong
     circ536  Hình 5.36  ở ngoài nhau, đựng nhau
     circ5sum Hình tổng kết: sáu vị trí của hai đường tròn
   ========================================================================== */
(function () {
  'use strict';
  const H = window.TEXTBOOK && window.TEXTBOOK.hh;
  if (!H) { console.warn('illustrations-hinh3.js: cần nạp illustrations-hinh.js trước'); return; }
  const { svg, seg, dot, circle, rightMark, arc, tick, txt, add, sub, mul, unit, f, C } = H;

  /* ---- hàm phụ ---------------------------------------------------------- */
  const en = (p, s, o) => {
    o = o || {};
    return '<text class="en" x="' + f(p[0]) + '" y="' + f(p[1]) + '" text-anchor="' + (o.a || 'middle') + '" style="font-size:' + (o.s || 9.5) + 'px" fill="' + (o.c || C.pen) + '" opacity=".88">' + s + '</text>';
  };
  const bil = (p, vi, e, o) => {
    o = o || {};
    return txt(p, vi, { i: false, s: o.s || 10.5, a: o.a, c: o.c }) + en([p[0], p[1] + (o.dy || 11)], e, { s: (o.s || 10.5) - 1, a: o.a, c: o.c });
  };
  const L = (p, s, o) => txt(p, s, Object.assign({ s: 12 }, o || {}));
  const P2R = (O, R, d) => [O[0] + R * Math.cos(d * Math.PI / 180), O[1] - R * Math.sin(d * Math.PI / 180)];
  /* đường thẳng đi qua P, Q kéo dài thêm e về mỗi phía */
  const ray = (P, Q, e1, e2, o) => {
    const u = unit(sub(Q, P));
    return seg(sub(P, mul(u, e1)), add(Q, mul(u, e2 === undefined ? e1 : e2)), o);
  };
  const sq = Math.sqrt;

  /* ---- Hình 5.26 — ba vị trí của đường thẳng a và đường tròn (O; R) ------ */
  function line526() {
    const R = 44, y0 = 62, cx = [72, 210, 348];
    const dd = [24, R, 66];
    let s = '';
    for (let i = 0; i < 3; i++) {
      const O = [cx[i], y0], d = dd[i], yl = y0 + d, H0 = [cx[i], yl];
      s += circle(O, R);
      s += seg([cx[i] - 60, yl], [cx[i] + 60, yl], { w: 2.1 });
      s += seg(O, H0, { c: C.red, w: 2 }) + rightMark(H0, O, [cx[i] + 20, yl], 7);
      s += dot(O) + L([O[0] + 9, O[1] - 5], 'O') + L([cx[i] + 10, yl + 14], 'H');
      s += txt([cx[i] - 64, yl - 5], 'a', { s: 12 });
      if (i === 0) {
        const k = sq(R * R - d * d), A = [cx[i] - k, yl], B = [cx[i] + k, yl];
        s += seg(O, A) + dot(A) + dot(B) + L([A[0] - 9, A[1] + 14], 'A') + L([B[0] + 9, B[1] + 14], 'B');
        s += txt([(O[0] + A[0]) / 2 - 10, (O[1] + A[1]) / 2 - 2], 'R', { s: 11, c: C.red }) + txt([cx[i] + 8, y0 + d / 2 + 4], 'd', { s: 11, c: C.red });
      } else if (i === 1) {
        s += dot(H0) + txt([cx[i] + 9, y0 + d / 2 + 4], 'R = d', { s: 11, c: C.red, a: 'start' });
      } else {
        const A = [cx[i], y0 + R];
        s += dot(A) + L([cx[i] - 12, A[1] - 3], 'A') + dot(H0) + txt([cx[i] - 8, y0 + R / 2 + 4], 'R', { s: 11, c: C.red, a: 'end' }) + txt([cx[i] + 9, y0 + 34], 'd', { s: 11, c: C.red, a: 'start' });
      }
    }
    const y1 = 162;
    s += bil([72, y1], 'a) d < R: cắt nhau', 'intersecting', { s: 10 });
    s += bil([210, y1], 'b) d = R: tiếp xúc', 'tangent', { s: 10 });
    s += bil([348, y1], 'c) d > R: không giao nhau', 'disjoint', { s: 10 });
    s += bil([72, y1 + 25], '2 điểm chung', '2 common points', { s: 9 });
    s += bil([210, y1 + 25], '1 điểm chung', '1 common point', { s: 9 });
    s += bil([348, y1 + 25], '0 điểm chung', '0 common points', { s: 9 });
    return svg('0 0 420 218', 'Đường thẳng a và đường tròn (O; R): cắt nhau khi d nhỏ hơn R, tiếp xúc khi d bằng R, không giao nhau khi d lớn hơn R', s, 'art--circ2');
  }

  /* ---- Hình 5.27 — Ví dụ 1: CA là tiếp tuyến, chứng minh CB là tiếp tuyến -- */
  function tang527() {
    const O = [150, 86], R = 50, th = 125;
    const A = P2R(O, R, th), B = P2R(O, R, -th);
    const Cc = [O[0] - R / Math.cos((180 - th) * Math.PI / 180), O[1]];
    const D = [A[0], O[1]];
    let s = circle(O, R);
    s += ray(Cc, A, 0, 22) + ray(Cc, B, 0, 22) + seg(Cc, [O[0] + R + 14, O[1]], { w: 1.8 });
    s += seg(A, B) + seg(O, A) + seg(O, B);
    s += rightMark(D, A, O, 6) + rightMark(A, Cc, O, 7) + rightMark(B, Cc, O, 7);
    [O, A, B, Cc, D].forEach((q) => { s += dot(q); });
    s += L([A[0] + 5, A[1] - 8], 'A') + L([B[0] + 5, B[1] + 15], 'B') + L([Cc[0] - 10, Cc[1] - 7], 'C') + L([O[0] + 11, O[1] - 6], 'O') + L([D[0] - 7, D[1] - 6], 'D');
    s += bil([112, 170], 'CA là tiếp tuyến ⇒ CB cũng là tiếp tuyến', 'CA is tangent ⇒ CB is tangent too', { s: 9 });
    return svg('0 0 224 188', 'Đường tròn tâm O, dây AB, tiếp tuyến tại A cắt đường thẳng qua O vuông góc với AB tại C; CB cũng là tiếp tuyến', s, 'art--circ');
  }

  /* ---- hai tiếp tuyến cắt nhau (5.28, 5.29) ----------------------------- */
  function twoTangents(o) {
    const R = o.R, OM = o.OM, O = [o.ox, 92], M = [o.ox + OM, 92];
    const th = Math.acos(R / OM) * 180 / Math.PI;
    const A = P2R(O, R, th), B = P2R(O, R, -th), Hh = [A[0], O[1]];
    let s = circle(O, R);
    s += ray(M, A, 0, 20) + ray(M, B, 0, 20, {}) + seg(O, [M[0] + 12, M[1]], { w: 1.8 });
    s += seg(O, A) + seg(O, B);
    s += rightMark(A, O, M, 7) + rightMark(B, O, M, 7);
    if (o.chord) { s += seg(A, B, { dash: 1, c: C.grey }) + rightMark(Hh, A, O, 6) + dot(Hh) + L([Hh[0] + 9, Hh[1] + 14], 'H', { s: 11 }); }
    else { s += tick(M, A) + tick(M, B) + arc(O, A, M, 17, C.red) + arc(O, M, B, 21, C.red) + arc(M, A, O, 24, C.teal) + arc(M, O, B, 28, C.teal); }
    [O, A, B, M].forEach((q) => { s += dot(q); });
    s += L([A[0] + 2, A[1] - 8], 'A') + L([B[0] + 2, B[1] + 16], 'B') + L([M[0] + 10, M[1] - 6], 'M') + L([O[0] - 13, O[1] + 4], 'O');
    if (o.vals) {
      s += txt([(O[0] + A[0]) / 2 - 11, (O[1] + A[1]) / 2 - 3], 'R = 2', { s: 9.5, c: C.red, a: 'middle' });
      s += txt([(O[0] + M[0]) / 2 + 16, O[1] - 8], 'OM = 4', { s: 9.5, c: C.red });
      s += txt([(A[0] + M[0]) / 2 + 14, (A[1] + M[1]) / 2 - 12], 'AM = 2√3', { s: 9.5, c: C.red });
    }
    return s;
  }
  function tang528() {
    let s = twoTangents({ R: 48, OM: 128, ox: 64 });
    s += bil([116, 184], 'MA = MB;  ∠AMO = ∠BMO;  ∠AOM = ∠BOM', 'equal tangent segments; two angle bisectors', { s: 9 });
    return svg('0 0 250 204', 'Hai tiếp tuyến MA và MB của đường tròn tâm O cắt nhau tại M: MA = MB, MO là phân giác của góc AMB, OM là phân giác của góc AOB', s, 'art--circ');
  }
  function tang529() {
    let s = twoTangents({ R: 44, OM: 88, ox: 62, chord: true, vals: true });
    s += bil([100, 172], 'OM ⊥ AB;  MA = MB = 2√3 cm', 'Pythagoras in the right triangle OAM', { s: 9 });
    return svg('0 0 210 190', 'Hai tiếp tuyến MA, MB của đường tròn bán kính 2 cm với MO bằng 4 cm; MA = MB bằng 2 căn 3 cm', s, 'art--circ');
  }

  /* ---- hai đường tròn --------------------------------------------------- */
  function circ532() {
    const O = [74, 86], R = 56, O2 = [152, 86], R2 = 40, d = 78;
    const a = (d * d + R * R - R2 * R2) / (2 * d), h = sq(R * R - a * a);
    const A = [O[0] + a, O[1] + h], B = [O[0] + a, O[1] - h];
    let s = circle(O, R) + circle(O2, R2);
    s += seg(O, O2) + seg(O, A, { dash: 1, c: C.red }) + seg(O2, A, { dash: 1, c: C.red });
    [O, O2, A, B].forEach((q) => { s += dot(q); });
    s += L([O[0] - 4, O[1] + 16], 'O') + L([O2[0] + 12, O2[1] + 4], 'O′') + L([B[0] + 4, B[1] - 8], 'B') + L([A[0] + 2, A[1] + 15], 'A');
    s += bil([118, 176], 'R − R′ < OO′ < R + R′', 'two common points A and B', { s: 10 });
    return svg('0 0 236 198', 'Hai đường tròn (O; R) và (O′; R′) cắt nhau tại A và B', s, 'art--circ');
  }

  /* hai đường tròn đặt trên một hàng: [Ox, R, O'x, R'] */
  function pair(y, Ox, R, O2x, R2, pts) {
    const O = [Ox, y], O2 = [O2x, y];
    let s = circle(O, R) + circle(O2, R2);
    s += seg(O, O2, { w: 1.6 }) + dot(O) + dot(O2);
    (pts || []).forEach((q) => { s += dot([q[0], y]); });
    return s;
  }
  function circ534() {
    const y = 74;
    let s = pair(y, 62, 48, 62 + 48 + 30, 30, [[110, 0]]);
    s += L([62 - 6, y + 15], 'O') + L([140 + 2, y + 15], 'O′') + L([110 + 1, y - 14], 'A');
    /* b) tiếp xúc trong: OO′ = R − R′ */
    const ox = 262, R = 52, R2 = 30, o2x = ox + (R - R2);
    s += pair(y, ox, R, o2x, R2, [[ox + R, 0]]);
    s += L([ox - 12, y + 15], 'O') + L([o2x - 2, y + 15], 'O′') + L([ox + R + 10, y - 6], 'A');
    s += bil([110, 146], 'a) Tiếp xúc ngoài', 'externally tangent', { s: 10 });
    s += bil([262, 146], 'b) Tiếp xúc trong', 'internally tangent', { s: 10 });
    s += bil([110, 176], 'OO′ = R + R′', '1 common point A', { s: 9.5 });
    s += bil([262, 176], 'OO′ = R − R′', '1 common point A', { s: 9.5 });
    return svg('0 0 340 198', 'Hai đường tròn tiếp xúc ngoài và tiếp xúc trong; tiếp điểm A thẳng hàng với hai tâm O và O′', s, 'art--circ2');
  }
  function circ536() {
    const y = 74;
    let s = pair(y, 62, 48, 62 + 48 + 12 + 26, 26, [[110, 0], [122, 0]]);
    s += L([56, y + 15], 'O') + L([148 + 2, y + 15], 'O′') + L([106, y - 12], 'A') + L([128, y - 12], 'B');
    const ox = 262, R = 54, R2 = 28, o2x = ox + 14;
    s += pair(y, ox, R, o2x, R2, [[ox + R, 0]]);
    s += L([ox - 12, y + 15], 'O') + L([o2x + 4, y + 15], 'O′') + L([ox + R + 10, y - 6], 'A');
    s += bil([110, 146], 'a) Ở ngoài nhau', 'outside each other (disjoint)', { s: 10 });
    s += bil([262, 146], 'b) (O) đựng (O′)', 'one inside the other', { s: 10 });
    s += bil([110, 176], 'OO′ > R + R′', 'no common point', { s: 9.5 });
    s += bil([262, 176], 'OO′ < R − R′', 'no common point', { s: 9.5 });
    return svg('0 0 340 198', 'Hai đường tròn ở ngoài nhau và hai đường tròn đựng nhau (không có điểm chung)', s, 'art--circ2');
  }

  /* ---- hình tổng kết: sáu vị trí ---------------------------------------- */
  function circ5sum() {
    const cells = [
      { x: 70, y: 52, vi: 'Cắt nhau', e: 'intersecting', o: 'R − R′ < OO′ < R + R′', fn: (x, y) => circle([x - 14, y], 30) + circle([x + 22, y], 22) + seg([x - 14, y], [x + 22, y], { w: 1.4 }) + dot([x - 14, y]) + dot([x + 22, y]) },
      { x: 210, y: 52, vi: 'Tiếp xúc ngoài', e: 'externally tangent', o: 'OO′ = R + R′', fn: (x, y) => circle([x - 20, y], 28) + circle([x + 26, y], 18) + seg([x - 20, y], [x + 26, y], { w: 1.4 }) + dot([x - 20, y]) + dot([x + 26, y]) + dot([x + 8, y], C.red) },
      { x: 350, y: 52, vi: 'Tiếp xúc trong', e: 'internally tangent', o: 'OO′ = R − R′ > 0', fn: (x, y) => circle([x - 6, y], 32) + circle([x + 10, y], 16) + seg([x - 6, y], [x + 10, y], { w: 1.4 }) + dot([x - 6, y]) + dot([x + 10, y]) + dot([x + 26, y], C.red) },
      { x: 70, y: 176, vi: 'Ở ngoài nhau', e: 'outside each other', o: 'OO′ > R + R′', fn: (x, y) => circle([x - 26, y], 24) + circle([x + 30, y], 16) + dot([x - 26, y]) + dot([x + 30, y]) },
      { x: 210, y: 176, vi: 'Đựng nhau', e: 'one inside the other', o: 'OO′ < R − R′', fn: (x, y) => circle([x - 4, y], 32) + circle([x + 6, y], 14) + dot([x - 4, y]) + dot([x + 6, y]) },
      { x: 350, y: 176, vi: 'Đồng tâm', e: 'concentric', o: 'OO′ = 0, R ≠ R′', fn: (x, y) => circle([x, y], 32) + circle([x, y], 16) + dot([x, y]) }
    ];
    let s = '';
    cells.forEach((c) => {
      s += c.fn(c.x, c.y);
      s += txt([c.x, c.y + 46], c.vi, { i: false, s: 10 }) + en([c.x, c.y + 57], c.e, { s: 9 }) + txt([c.x, c.y + 69], c.o, { i: false, s: 9, b: 0, c: C.red });
    });
    return svg('0 0 420 268', 'Sáu vị trí tương đối của hai đường tròn: cắt nhau, tiếp xúc ngoài, tiếp xúc trong, ở ngoài nhau, đựng nhau, đồng tâm', s, 'art--circ2');
  }

  window.TEXTBOOK.art = Object.assign(window.TEXTBOOK.art || {}, {
    line526: line526, tang527: tang527, tang528: tang528, tang529: tang529,
    circ532: circ532, circ534: circ534, circ536: circ536, circ5sum: circ5sum
  });
})();
