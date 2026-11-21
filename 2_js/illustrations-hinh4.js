/* ==========================================================================
   HÌNH VẼ — CHƯƠNG VI (TOÁN 9 TẬP HAI): HÀM SỐ y = ax², PHƯƠNG TRÌNH BẬC HAI
   --------------------------------------------------------------------------
   Dùng lại bộ hàm của js/illustrations-hinh.js (window.TEXTBOOK.hh).
   Mọi đồ thị được TÍNH từ công thức y = a·x² (không vẽ tay), nên đúng toạ độ.
   Chữ trong hình: dòng Việt đậm, dòng Anh nghiêng (class "en").
   Các hình là bản vẽ lại, không phải ảnh của sách.

     bridge61  Hình 6.1   cầu treo, dây cáp là parabol y = ax²
     par62     Hình 6.2   y = −x²/4
     par63     Hình 6.3   y = 2x² và các cặp điểm đối xứng
     par64     Hình 6.4   parabol khi a > 0 và a < 0 (đỉnh, trục đối xứng)
     par65     Hình 6.5   y = −2x²
     par66     Hình 6.6   bài 6.5: parabol đi qua (1; 0,5) và (2; 2)
     par67     Hình 6.7   bài 6.6: hai parabol y = x² và y = −3x²
     arch68    Hình 6.8   cổng vòm parabol
     pool69    Hình 6.9   bể bơi có đường đi xung quanh
     fence620  mở đầu Bài 20: mảnh vườn rào lưới thép
   ========================================================================== */
(function () {
  'use strict';
  const H = window.TEXTBOOK && window.TEXTBOOK.hh;
  if (!H) { console.warn('illustrations-hinh4.js: cần nạp illustrations-hinh.js trước'); return; }
  const { svg, seg, dot, txt, f, C } = H;

  const CURVE = '#1a8fd1';
  const en = (p, s, o) => {
    o = o || {};
    return '<text class="en" x="' + f(p[0]) + '" y="' + f(p[1]) + '" text-anchor="' + (o.a || 'middle') + '" style="font-size:' + (o.s || 9.5) + 'px" fill="' + (o.c || C.pen) + '" opacity=".88">' + s + '</text>';
  };
  const bil = (p, vi, e, o) => {
    o = o || {};
    return txt(p, vi, { i: false, s: o.s || 10.5, a: o.a, c: o.c }) + en([p[0], p[1] + (o.dy || 11)], e, { s: (o.s || 10.5) - 1, a: o.a, c: o.c });
  };
  const L = (p, s, o) => txt(p, s, Object.assign({ s: 12 }, o || {}));
  const num = (p, s, o) => txt(p, s, Object.assign({ s: 8.5, i: false, b: 0, c: C.ink }, o || {}));

  /* hệ trục: gốc (ox, oy) theo pixel, sx / sy pixel trên một đơn vị */
  function frame(ox, oy, sx, sy) {
    const X = (x) => ox + sx * x, Y = (y) => oy - sy * y;
    return { X, Y, P: (x, y) => [X(x), Y(y)] };
  }
  function arrowHead(tip, dir) {
    const a = [tip[0] - dir[0] * 7 - dir[1] * 3.2, tip[1] - dir[1] * 7 + dir[0] * 3.2], b = [tip[0] - dir[0] * 7 + dir[1] * 3.2, tip[1] - dir[1] * 7 - dir[0] * 3.2];
    return '<polygon points="' + f(tip[0]) + ',' + f(tip[1]) + ' ' + f(a[0]) + ',' + f(a[1]) + ' ' + f(b[0]) + ',' + f(b[1]) + '" fill="' + C.ink + '"/>';
  }
  /* trục toạ độ, vạch chia nguyên; o.tx / o.ty: danh sách vạch cần ghi số */
  function axes(F, xr, yr, o) {
    o = o || {};
    let s = '';
    if (o.grid) {
      for (let x = Math.ceil(xr[0]); x <= xr[1]; x++) s += seg(F.P(x, yr[0]), F.P(x, yr[1]), { c: '#e3e8f5', w: 1 });
      for (let y = Math.ceil(yr[0]); y <= yr[1]; y++) s += seg(F.P(xr[0], y), F.P(xr[1], y), { c: '#e3e8f5', w: 1 });
    }
    s += seg(F.P(xr[0], 0), F.P(xr[1], 0), { w: 1.6 }) + arrowHead(F.P(xr[1], 0), [1, 0]);
    s += seg(F.P(0, yr[0]), F.P(0, yr[1]), { w: 1.6 }) + arrowHead(F.P(0, yr[1]), [0, -1]);
    (o.tx || []).forEach((x) => { if (x !== 0) s += seg([F.X(x), F.Y(0) - 2.5], [F.X(x), F.Y(0) + 2.5], { w: 1.2 }) + num([F.X(x), F.Y(0) + (o.txBelow === false ? -6 : 12)], String(x).replace('-', '−').replace('.', ',')); });
    (o.ty || []).forEach((y) => { if (y !== 0) s += seg([F.X(0) - 2.5, F.Y(y)], [F.X(0) + 2.5, F.Y(y)], { w: 1.2 }) + num([F.X(0) + (o.tyLeft === false ? 6 : -7), F.Y(y) + 3], String(y).replace('-', '−').replace('.', ','), { a: o.tyLeft === false ? 'start' : 'end' }); });
    s += txt([F.X(xr[1]) - 2, F.Y(0) + (o.xlabDy || 12)], 'x', { s: 11, c: C.pen });
    s += txt([F.X(0) + 9, F.Y(yr[1]) + 6], 'y', { s: 11, c: C.pen });
    return s;
  }
  /* đường cong y = a·x² trên [x0, x1], cắt theo khoảng yr */
  function parabola(F, a, x0, x1, yr, col) {
    let d = '', pen = false;
    for (let x = x0; x <= x1 + 1e-9; x += 0.02) {
      const y = a * x * x;
      if (y < yr[0] - 1e-9 || y > yr[1] + 1e-9) { pen = false; continue; }
      const p = F.P(x, y);
      d += (pen ? 'L' : 'M') + f(p[0]) + ' ' + f(p[1]);
      pen = true;
    }
    return '<path d="' + d + '" fill="none" stroke="' + (col || CURVE) + '" stroke-width="2.2" stroke-linejoin="round"/>';
  }
  const guide = (p, q) => seg(p, q, { dash: 1, c: C.grey, w: 1.1 });
  const org = (F, dx, dy) => L([F.X(0) + (dx === undefined ? -9 : dx), F.Y(0) + (dy === undefined ? 12 : dy)], 'O', { s: 11 });

  /* ---- Hình 6.2 — y = −x²/4 ---------------------------------------------- */
  function par62() {
    const F = frame(118, 36, 22, 22), xr = [-4.6, 4.8], yr = [-4.6, 1.2];
    let s = axes(F, xr, yr, { tx: [-4, -3, -2, -1, 1, 2, 3, 4], ty: [-1, -2, -3, -4], txBelow: false });
    s += parabola(F, -0.25, -4.4, 4.4, yr);
    [[-4, -4], [-2, -1], [-1, -0.25], [1, -0.25], [2, -1], [4, -4]].forEach((q) => { s += guide(F.P(q[0], 0), F.P(q[0], q[1])); s += guide(F.P(0, q[1]), F.P(q[0], q[1])); s += dot(F.P(q[0], q[1]), C.red); });
    s += dot(F.P(0, 0), C.red) + org(F, 8, -6);
    s += bil([118, 156], 'đồ thị của y = −x²/4', 'the graph of y = −x²/4', { s: 9.5 });
    return svg('0 0 236 176', 'Đồ thị hàm số y bằng trừ một phần tư x bình phương: một parabol quay xuống dưới, đỉnh là gốc toạ độ', s, 'art--circ');
  }

  /* ---- Hình 6.3 — y = 2x² và cặp điểm đối xứng --------------------------- */
  function par63() {
    const F = frame(100, 172, 34, 17), xr = [-2.7, 2.9], yr = [-0.4, 9.6];
    let s = axes(F, xr, yr, { tx: [-3, -2, -1, 1, 2, 3].filter((v) => Math.abs(v) <= 2.7), ty: [1, 2, 3, 4, 5, 6, 7, 8] });
    s += parabola(F, 2, -2.2, 2.2, [0, 9.3]);
    [[1, 2], [-1, 2], [2, 8], [-2, 8]].forEach((q) => { s += guide(F.P(q[0], 0), F.P(q[0], q[1])) + guide(F.P(0, q[1]), F.P(q[0], q[1])) + dot(F.P(q[0], q[1]), C.red); });
    s += L([F.X(1) + 9, F.Y(2) + 4], 'A') + L([F.X(-1) - 10, F.Y(2) + 4], "A′") + L([F.X(2) + 9, F.Y(8) + 2], 'B') + L([F.X(-2) - 11, F.Y(8) + 2], "B′");
    s += dot(F.P(0, 0), C.red) + org(F, 9, 12);
    s += bil([100, 206], 'y = 2x²: đối xứng qua trục Oy', 'symmetric about the y-axis', { s: 9 });
    return svg('0 0 200 226', 'Đồ thị hàm số y bằng 2x bình phương với các cặp điểm đối xứng A và A phẩy, B và B phẩy qua trục tung', s, 'art--circ');
  }

  /* ---- Hình 6.4 — a > 0 và a < 0 ---------------------------------------- */
  function par64() {
    const F1 = frame(86, 152, 24, 22), F2 = frame(262, 64, 24, 22);
    let s = axes(F1, [-2.6, 2.8], [-0.5, 4.7], {});
    s += parabola(F1, 1, -2.1, 2.1, [0, 4.5]) + dot(F1.P(0, 0), C.red) + L([F1.X(0) - 10, F1.Y(0) + 12], 'O', { s: 11 });
    s += axes(F2, [-2.6, 2.8], [-4.7, 0.5], { xlabDy: -6 });
    s += parabola(F2, -1, -2.1, 2.1, [-4.5, 0]) + dot(F2.P(0, 0), C.red);
    s += bil([86, 190], 'a > 0: bề lõm quay lên', 'opens upward', { s: 10 });
    s += bil([262, 190], 'a < 0: bề lõm quay xuống', 'opens downward', { s: 10 });
    s += txt([86, 14], 'trục đối xứng Oy', { i: false, s: 9, c: C.red }) + en([86, 24], 'axis of symmetry', { s: 8, c: C.red });
    s += txt([F2.X(0) - 12, 44], 'đỉnh O', { a: 'end', i: false, s: 9, c: C.red }) + en([F2.X(0) - 12, 54], 'vertex', { a: 'end', s: 8, c: C.red });
    return svg('0 0 348 212', 'Đồ thị hàm số y = ax² là một parabol có đỉnh O, trục đối xứng Oy; nằm phía trên trục hoành nếu a > 0 và phía dưới nếu a < 0', s, 'art--circ2');
  }

  /* ---- Hình 6.5 — y = −2x² ---------------------------------------------- */
  function par65() {
    const F = frame(110, 28, 34, 17), xr = [-2.9, 2.9], yr = [-9.6, 1.2];
    let s = axes(F, xr, yr, { tx: [-2, -1, 1, 2], ty: [-1, -2, -3, -4, -5, -6, -7, -8], txBelow: false });
    s += parabola(F, -2, -2.2, 2.2, [-9.3, 0]);
    [[1, -2], [-1, -2], [2, -8], [-2, -8]].forEach((q) => { s += guide(F.P(q[0], 0), F.P(q[0], q[1])) + guide(F.P(0, q[1]), F.P(q[0], q[1])) + dot(F.P(q[0], q[1]), C.red); });
    s += dot(F.P(0, 0), C.red) + org(F, -9, -6);
    s += bil([110, 204], 'đồ thị của y = −2x²', 'the graph of y = −2x²', { s: 9.5 });
    return svg('0 0 220 224', 'Đồ thị hàm số y bằng trừ 2x bình phương', s, 'art--circ');
  }

  /* ---- Hình 6.6 — bài 6.5: parabol đi qua (1; 0,5), (2; 2) --------------- */
  function par66() {
    const F = frame(100, 172, 20, 17.5), xr = [-4.8, 4.9], yr = [-0.4, 9.6];
    let s = axes(F, xr, yr, { grid: true, tx: [-4, -3, -2, -1, 1, 2, 3, 4], ty: [1, 2, 3, 4, 5, 6, 7, 8] });
    s += parabola(F, 0.5, -4, 4, [0, 8.6]);
    [[1, 0.5], [-1, 0.5], [2, 2], [-2, 2]].forEach((q) => { s += dot(F.P(q[0], q[1]), C.red); });
    s += guide(F.P(-1, 0.5), F.P(1, 0.5)) + txt([F.X(1) + 5, F.Y(0.5) - 3], '0,5', { s: 8.5, i: false, c: C.red, a: 'start' });
    s += org(F, 8, 12);
    return svg('0 0 200 192', 'Đường parabol y = ax² đi qua các điểm (1; 0,5), (−1; 0,5), (2; 2), (−2; 2) trên lưới ô vuông', s, 'art--circ');
  }

  /* ---- Hình 6.7 — bài 6.6: y = x² và y = −3x² --------------------------- */
  function par67() {
    const F = frame(100, 84, 30, 17), xr = [-3.5, 3.7], yr = [-4.3, 5];
    let s = axes(F, xr, yr, { tx: [-3, -2, -1, 1, 2, 3], ty: [-3, -2, -1, 1, 2, 3, 4], txBelow: true });
    s += parabola(F, 1, -2.3, 2.3, [0, 4.6], '#e2632f') + parabola(F, -3, -1.2, 1.2, [-4.1, 0], '#2f9e4d');
    s += org(F, -9, -5);
    s += bil([100, 176], 'hai parabol cùng đỉnh O', 'two parabolas with the same vertex O', { s: 9 });
    return svg('0 0 200 196', 'Hai parabol y = x² (màu cam, quay lên) và y = −3x² (màu xanh lá, quay xuống) trên cùng hệ trục', s, 'art--circ');
  }

  /* ---- Hình 6.8 — cổng vòm: y = −x²/2, AB = 6 m, OI = 4,5 m ------------- */
  function arch68() {
    const F = frame(110, 34, 24, 20), xr = [-4.2, 5.2], yr = [-5.4, 1.5];
    let s = axes(F, xr, yr, { tx: [-4, -3, -2, -1, 1, 2, 3, 4, 5], ty: [-1, -2, -3, -4], txBelow: false });
    s += parabola(F, -0.5, -3, 3, [-4.5, 0]);
    s += seg(F.P(-4.2, -4.5), F.P(4.4, -4.5), { dash: 1, c: C.grey, w: 1.3 });
    const A = F.P(-3, -4.5), B = F.P(3, -4.5), I = F.P(0, -4.5), Hh = F.P(2, -4.5), K = F.P(2, -2);
    s += guide(F.P(-3, 0), A) + guide(F.P(3, 0), B) + seg(Hh, K, { dash: 1, c: C.grey, w: 1.3 });
    [A, B, I, Hh, K].forEach((q) => { s += dot(q, C.red); });
    s += L([A[0] - 9, A[1] + 15], 'A') + L([B[0] + 10, B[1] + 15], 'B') + L([I[0] - 9, I[1] + 15], 'I', { s: 11 }) + L([Hh[0] - 2, Hh[1] + 15], 'H', { s: 11 }) + L([K[0] + 9, K[1] - 3], 'K');
    s += org(F, 8, -6);
    /* kích thước 4,5 m */
    const xr0 = F.X(4.6);
    s += seg([xr0, F.Y(0)], [xr0, F.Y(-4.5)], { w: 1.3 }) + seg([xr0 - 4, F.Y(0)], [xr0 + 4, F.Y(0)], { w: 1.3 }) + seg([xr0 - 4, F.Y(-4.5)], [xr0 + 4, F.Y(-4.5)], { w: 1.3 });
    s += txt([xr0 + 7, F.Y(-2.2)], '4,5 m', { a: 'start', i: false, s: 9, c: C.red });
    s += txt([(I[0] + Hh[0]) / 2 + 2, I[1] + 26], '2 m', { i: false, s: 9, c: C.red });
    s += txt([F.X(-1.5), F.Y(-4.5) - 6], 'mặt đất', { a: 'middle', i: false, s: 8.5, c: C.ink }) + en([F.X(-1.5), F.Y(-4.5) + 14], 'ground', { a: 'middle', s: 8, c: C.ink });
    s += bil([118, 190], 'cổng vòm y = −x²/2', 'a parabolic arch, y = −x²/2', { s: 9 });
    return svg('0 0 270 212', 'Cổng vòm dạng parabol y bằng trừ x bình phương chia 2 với AB bằng 6 mét và OI bằng 4,5 mét', s, 'art--circ');
  }

  /* ---- Hình 6.1 — cầu treo ---------------------------------------------- */
  function bridge61() {
    const ox = 150, oy = 118, k = 0.36;       /* 1 m = 0,36 px theo x */
    const sy = 0.9, a = 75 / 40000;
    const X = (x) => ox + k * x, Y = (y) => oy - sy * y;
    let s = '<rect x="' + f(X(-200) - 6) + '" y="' + f(Y(75) - 4) + '" width="12" height="' + f(sy * 75 + 4 + 6) + '" fill="#3fa7a7"/><rect x="' + f(X(200) - 6) + '" y="' + f(Y(75) - 4) + '" width="12" height="' + f(sy * 75 + 4 + 6) + '" fill="#3fa7a7"/>';
    s += '<rect x="' + f(X(-215)) + '" y="' + f(oy) + '" width="' + f(k * 430) + '" height="5" fill="#4a79c4"/>';
    let d = '';
    for (let x = -200; x <= 200; x += 4) d += (x === -200 ? 'M' : 'L') + f(X(x)) + ' ' + f(Y(a * x * x));
    s += '<path d="' + d + '" fill="none" stroke="' + CURVE + '" stroke-width="2.2"/>';
    for (let x = -190; x <= 190; x += 20) s += seg([X(x), Y(a * x * x)], [X(x), oy], { c: C.grey, w: 0.9 });
    s += seg([X(0), Y(80)], [X(0), Y(-4)], { w: 1.4 }) + seg([X(-215), oy], [X(235), oy], { w: 1 });
    s += guide([X(-200), Y(75)], [X(200), Y(75)]) + seg([X(204), Y(0)], [X(204), Y(75)], { w: 1.2 });
    const A = [X(-200), Y(75)], B = [X(200), Y(75)], Cc = [X(100), Y(a * 10000)], Hh = [X(100), oy], O = [X(0), oy];
    [A, B, Cc, Hh, O].forEach((q) => { s += dot(q, C.red); });
    s += L([A[0] - 9, A[1] - 4], 'A') + L([B[0] + 10, B[1] - 4], 'B') + L([Cc[0] - 3, Cc[1] - 8], 'C') + L([Hh[0] + 3, Hh[1] + 15], 'H', { s: 11 }) + L([O[0] - 9, O[1] + 14], 'O', { s: 11 });
    s += txt([X(214), Y(37)], '75', { a: 'start', i: false, s: 9, c: C.red }) + txt([X(-100) - 6, Y(75) - 5], '75', { i: false, s: 9, c: C.red });
    s += seg([X(0) + 2, oy + 16], [X(200), oy + 16], { w: 1.2 }) + seg([X(0), oy + 16], [X(-200), oy + 16], { w: 1.2 });
    s += txt([X(100), oy + 28], '200 m', { i: false, s: 9, c: C.red }) + txt([X(-100), oy + 28], '200 m', { i: false, s: 9, c: C.red });
    s += txt([X(38), oy + 11], '100 m', { i: false, s: 8.5, c: C.red });
    s += bil([X(-60), Y(52)], 'dây cáp', 'cable', { s: 9.5 });
    s += bil([150, 176], 'dây cáp là đồ thị y = ax²', 'the cable is the graph of y = ax²', { s: 9.5 });
    return svg('0 0 300 196', 'Cầu treo có hai trụ tháp cao 75 mét cách nhau 400 mét; dây cáp có dạng parabol y = ax² với đỉnh O ở giữa cầu', s, 'art--circ2');
  }

  /* ---- Hình 6.9 — bể bơi 28 m × 16 m có đường đi rộng x ------------------ */
  function pool69() {
    const k = 7.4, x0 = 34, y0 = 26, W = 28 * k, Hh = 16 * k, p = 3.6 * k;
    let s = '<rect x="' + x0 + '" y="' + y0 + '" width="' + f(W) + '" height="' + f(Hh) + '" fill="#f3d9ec" stroke="' + C.ink + '" stroke-width="1.8"/>';
    s += '<rect x="' + f(x0 + p) + '" y="' + f(y0 + p) + '" width="' + f(W - 2 * p) + '" height="' + f(Hh - 2 * p) + '" fill="#bfe3f7" stroke="' + C.ink + '" stroke-width="1.8"/>';
    s += txt([x0 + W / 2, y0 - 8], '28 m', { i: false, s: 10.5 });
    s += '<text x="' + f(x0 - 10) + '" y="' + f(y0 + Hh / 2) + '" text-anchor="middle" transform="rotate(-90 ' + f(x0 - 10) + ' ' + f(y0 + Hh / 2) + ')" style="font-size:10.5px" font-weight="700" fill="' + C.pen + '">16 m</text>';
    s += seg([x0, y0 + Hh - 10], [x0 + p, y0 + Hh - 10], { w: 1.5 }) + seg([x0, y0 + Hh - 14], [x0, y0 + Hh - 6], { w: 1.5 }) + seg([x0 + p, y0 + Hh - 14], [x0 + p, y0 + Hh - 6], { w: 1.5 });
    s += txt([x0 + p / 2, y0 + Hh - 15], 'x', { s: 11, c: C.red });
    s += bil([x0 + W / 2, y0 + Hh / 2 - 6], 'bể bơi', 'swimming pool', { s: 11 });
    s += bil([x0 + W / 2, y0 + Hh + 18], 'đường đi rộng x (m) xung quanh bể', 'a path of width x (m) around the pool', { s: 9.5 });
    return svg('0 0 280 190', 'Mảnh đất hình chữ nhật 28 m nhân 16 m, bể bơi ở giữa và đường đi rộng x mét xung quanh', s, 'art--circ2');
  }

  /* ---- mở đầu Bài 20: mảnh vườn rào lưới thép ---------------------------- */
  function fence620() {
    const x0 = 30, y0 = 26, W = 150, Hh = 90;
    let s = '<rect x="' + x0 + '" y="' + y0 + '" width="' + W + '" height="' + Hh + '" fill="#e7f3c7" stroke="' + C.ink + '" stroke-width="3" stroke-dasharray="7 3"/>';
    s += bil([x0 + W / 2, y0 + Hh / 2 - 4], 'S = 96 m²', 'area 96 m²', { s: 11 });
    s += bil([x0 + W / 2, y0 + Hh + 16], 'rào lưới thép dài 40 m = chu vi', 'a 40 m fence = the perimeter', { s: 9.5 });
    return svg('0 0 210 160', 'Mảnh vườn hình chữ nhật diện tích 96 m² được rào bằng 40 m lưới thép', s, 'art--circ');
  }

  window.TEXTBOOK.art = Object.assign(window.TEXTBOOK.art || {}, {
    bridge61: bridge61, par62: par62, par63: par63, par64: par64, par65: par65, par66: par66,
    par67: par67, arch68: arch68, pool69: pool69, fence620: fence620
  });
})();
