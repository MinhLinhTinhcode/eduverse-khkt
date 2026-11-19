/* ==========================================================================
   HÌNH VẼ — KHOA HỌC TỰ NHIÊN 9, BÀI 1 – 3 (vẽ SVG riêng cho dự án, không phải ảnh sách)
     khtn1a  Hình 1.1   đèn dây tóc có tấm chắn khe và nguồn laser
     khtn1b  Hình 1.2   bản bán trụ và bảng chia độ
     khtn1c  Hình 1.3   bộ dụng cụ tìm hiểu ảnh qua thấu kính
     khtn1d  Hình 1.4   điện kế
     khtn1e  Hình 1.5   đồng hồ đo điện đa năng
     khtn1f  Hình 1.6   cuộn dây dẫn với hai đèn LED ngược cực
     khtn1g  Hình 1.7   dụng cụ thuỷ tinh, sứ
     khtn1h  Hình 1.11  kính hiển vi
     khtn1i  Hình 1.12  bố cục bài trình chiếu
     khtn1j  Hình 1.13  bố cục báo cáo treo tường
     khtn2a  Hình 2.1   búa đập thanh thép
     khtn2b  Hình 2.2   quả bóng, ô tô, máy bay
     khtn2c  Hình 2.3   sơ đồ đập thuỷ điện
     khtn2d  Hình 2.4   xích đu (câu hỏi mở bài)
     khtn3a  Hình 3.1   tung hứng bóng
     khtn3b  Hình 3.2   con lắc đơn A – O – B
     khtn3c  Hình 3.3   cột năng lượng của vật rơi (cơ năng không đổi)
     khtn3d  Hình 3.4   xe thế năng
     khtn3e  Hình 3.5   búa máy đóng cọc
   ========================================================================== */
(function () {
  'use strict';
  const T = window.TEXTBOOK = window.TEXTBOOK || {};
  T.art = T.art || {};
  const C = { pen: '#1f46d0', penL: '#dbe4ff', teal: '#0aa39a', tealL: '#d6f4ef', red: '#e0393e', redL: '#ffe3e4', sun: '#ffe24a', sunL: '#fff6bf', violet: '#6c4be8', violetL: '#e9e3ff', green: '#2fbf7a', greenL: '#dcf5e4', ink: '#14224a', grey: '#9aa8c7', greyL: '#e8edf9' };
  const svg = (vb, label, inner) => '<svg class="art" viewBox="' + vb + '" role="img" aria-label="' + label + '" xmlns="http://www.w3.org/2000/svg">' + inner + '</svg>';
  const rect = (x, y, w, h, fill, o) => { o = o || {}; return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (o.r == null ? 6 : o.r) + '" fill="' + fill + '" stroke="' + (o.c || C.ink) + '" stroke-width="' + (o.w == null ? 2 : o.w) + '"/>'; };
  const t = (x, y, s, o) => { o = o || {}; return '<text x="' + x + '" y="' + y + '" text-anchor="' + (o.a || 'start') + '" style="font-size:' + (o.s || 12) + 'px" font-weight="' + (o.b ? 700 : 400) + '" font-style="' + (o.i ? 'italic' : 'normal') + '" fill="' + (o.c || C.ink) + '">' + s + '</text>'; };
  const bil = (x, y, vi, en, o) => { o = o || {}; const s = o.s || 12; return t(x, y, vi, { a: o.a, s: s, b: 1, c: o.c }) + t(x, y + s + 2, en, { a: o.a, s: s - 1.5, i: 1, c: o.c }); };
  const line = (x1, y1, x2, y2, c, w, dash) => '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (c || C.ink) + '" stroke-width="' + (w || 2) + '" stroke-linecap="round"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';
  const arrow = (x1, y1, x2, y2, c, w) => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 8, p = (d) => (x2 - h * Math.cos(a + d)).toFixed(1) + ',' + (y2 - h * Math.sin(a + d)).toFixed(1);
    return line(x1, y1, x2, y2, c, w || 2) + '<polygon points="' + x2 + ',' + y2 + ' ' + p(0.45) + ' ' + p(-0.45) + '" fill="' + (c || C.ink) + '"/>';
  };
  const circ = (cx, cy, r, fill, o) => { o = o || {}; return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + fill + '" stroke="' + (o.c || C.ink) + '" stroke-width="' + (o.w == null ? 2 : o.w) + '"/>'; };
  const poly = (pts, fill, o) => { o = o || {}; return '<polygon points="' + pts + '" fill="' + fill + '" stroke="' + (o.c || C.ink) + '" stroke-width="' + (o.w == null ? 2 : o.w) + '" stroke-linejoin="round"/>'; };
  const path = (d, fill, o) => { o = o || {}; return '<path d="' + d + '" fill="' + fill + '" stroke="' + (o.c || C.ink) + '" stroke-width="' + (o.w == null ? 2 : o.w) + '" stroke-linecap="round" stroke-linejoin="round"/>'; };
  const ground = (x1, x2, y) => line(x1, y, x2, y, C.ink, 3);

  /* ---------------------------------------------------------------- BÀI 1 */
  const khtn1a = () => svg('0 0 480 210', 'Nguồn sáng: đèn dây tóc có tấm chắn khe và nguồn laser',
    t(110, 20, 'a) Đèn dây tóc + tấm chắn khe', { a: 'middle', s: 11, b: 1 }) +
    rect(20, 70, 60, 50, C.sunL) + circ(50, 95, 14, C.sun) + t(50, 99, '12 V', { a: 'middle', s: 9, b: 1 }) +
    rect(110, 50, 14, 90, C.greyL) + '<rect x="110" y="62" width="14" height="6" fill="#fff"/><rect x="110" y="92" width="14" height="6" fill="#fff"/><rect x="110" y="122" width="14" height="6" fill="#fff"/>' +
    line(124, 65, 205, 40, C.red, 2) + line(124, 95, 205, 95, C.red, 2) + line(124, 125, 205, 150, C.red, 2) + line(80, 95, 110, 95, C.sun, 4) +
    bil(110, 165, 'Tấm chắn có khe', 'Slit plate', { a: 'middle', s: 11 }) +
    t(350, 20, 'b) Nguồn laser', { a: 'middle', s: 11, b: 1 }) +
    rect(260, 70, 120, 50, C.penL) + rect(272, 80, 22, 12, C.red) + rect(300, 80, 22, 12, C.red) + rect(328, 80, 22, 12, C.red) +
    circ(278, 106, 5, '#fff') + circ(306, 106, 5, '#fff') + circ(334, 106, 5, '#fff') +
    line(380, 86, 470, 70, C.red, 2) + line(380, 86, 470, 86, C.red, 2) + line(380, 86, 470, 102, C.red, 2) +
    bil(320, 150, 'Công tắc cho từng tia', 'One switch per ray', { a: 'middle', s: 11 }) +
    rect(150, 180, 180, 24, C.redL, { r: 8, w: 1.5 }) + bil(240, 190, '', '', {}) + t(240, 197, 'Không để tia laser chiếu vào mắt! / Never aim a laser at eyes!', { a: 'middle', s: 10, b: 1, c: C.red }));

  const khtn1b = () => {
    let s = '', i;
    s += rect(40, 60, 300, 160, '#fff', { r: 4, w: 1 });
    s += path('M120 150 A80 80 0 0 1 280 150 Z', C.penL);
    s += circ(200, 150, 100, 'none', { c: C.grey, w: 1.5 });
    for (i = 0; i <= 18; i++) { const a = Math.PI + i * Math.PI / 18, x1 = 200 + 100 * Math.cos(a), y1 = 150 + 100 * Math.sin(a), x2 = 200 + (i % 3 ? 94 : 88) * Math.cos(a), y2 = 150 + (i % 3 ? 94 : 88) * Math.sin(a); s += line(x1.toFixed(1), y1.toFixed(1), x2.toFixed(1), y2.toFixed(1), C.grey, 1.5); }
    s += line(200, 150, 140, 62, C.red, 2.5) + arrow(160, 90, 200, 150, C.red, 2.5) + line(200, 150, 252, 82, C.green, 2.5) + arrow(226, 116, 252, 82, C.green, 2.5);
    s += line(200, 150, 200, 55, C.grey, 1.5, '5 4') + line(100, 150, 300, 150, C.ink, 2);
    s += t(116, 60, 'tia tới', { s: 11, b: 1, c: C.red }) + t(256, 76, 'tia ló', { s: 11, b: 1, c: C.green });
    s += bil(200, 195, 'Bản bán trụ (thuỷ tinh trong suốt)', 'Semicircular block (clear glass)', { a: 'middle', s: 11 });
    s += bil(370, 90, 'Bảng chia độ', 'Angle scale', { s: 11 }) + arrow(368, 100, 296, 118, C.ink, 1.5);
    s += bil(370, 150, 'Đọc góc tới, góc khúc xạ', 'Read incidence and refraction angles', { s: 11 });
    return svg('0 0 560 230', 'Bản bán trụ đặt trên bảng chia độ, có tia tới và tia ló', s);
  };

  const khtn1c = () => svg('0 0 520 200', 'Giá quang học đồng trục với đèn, vật chữ F, thấu kính và màn chắn',
    rect(20, 150, 480, 14, C.greyL, { r: 3 }) + line(20, 150, 500, 150, C.ink, 2) +
    rect(30, 90, 40, 56, C.sunL) + circ(50, 118, 10, C.sun) + t(50, 82, '4', { a: 'middle', s: 12, b: 1 }) +
    rect(88, 100, 14, 46, C.greyL) + t(95, 128, 'F', { a: 'middle', s: 16, b: 1, c: C.red }) + t(95, 92, '5', { a: 'middle', s: 12, b: 1 }) +
    path('M200 92 Q216 118 200 144 Q184 118 200 92 Z', C.penL) + t(200, 84, '1', { a: 'middle', s: 12, b: 1 }) +
    path('M290 92 Q278 118 290 144 Q302 118 290 92 Z M290 92 Q290 92 290 92', C.tealL) + t(290, 84, '2', { a: 'middle', s: 12, b: 1 }) +
    rect(420, 80, 10, 66, '#fff') + t(425, 72, '3', { a: 'middle', s: 12, b: 1 }) +
    line(102, 118, 188, 118, C.red, 1.5, '6 4') + line(212, 118, 278, 118, C.red, 1.5, '6 4') + line(302, 118, 420, 118, C.red, 1.5, '6 4') +
    t(60, 186, '6: giá quang học đồng trục / coaxial optical bench', { s: 11, b: 1 }) +
    t(150, 28, '1 thấu kính hội tụ · 2 thấu kính phân kì · 3 màn chắn', { s: 11 }) + t(150, 44, '1 converging lens · 2 diverging lens · 3 screen', { s: 10, i: 1 }) +
    t(150, 60, '4 đèn · 5 khe hình chữ F  /  4 lamp · 5 F-shaped slit', { s: 10, i: 1 }));

  const khtn1d = () => {
    let s = rect(40, 30, 300, 150, C.greyL, { r: 14 });
    s += path('M70 150 A120 120 0 0 1 310 150', '#fff', { w: 2 });
    for (let i = -5; i <= 5; i++) { const a = -Math.PI / 2 + i * 0.22, x1 = 190 + 100 * Math.sin(i * 0.22), y1 = 160 - 100 * Math.cos(i * 0.22), x2 = 190 + 114 * Math.sin(i * 0.22), y2 = 160 - 114 * Math.cos(i * 0.22); s += line(x1.toFixed(1), y1.toFixed(1), x2.toFixed(1), y2.toFixed(1), C.ink, i === 0 ? 3 : 1.5); }
    s += line(190, 160, 190, 66, C.red, 3) + circ(190, 160, 7, C.ink);
    s += t(190, 52, '0', { a: 'middle', s: 12, b: 1 });
    s += circ(90, 205, 10, C.red) + t(90, 232, 'G₁', { a: 'middle', s: 11, b: 1 }) + circ(150, 205, 10, C.red) + t(150, 232, 'G₂', { a: 'middle', s: 11, b: 1 }) + circ(290, 205, 10, C.ink) + t(290, 232, '−', { a: 'middle', s: 14, b: 1 });
    s += arrow(100, 195, 160, 185, C.green, 0) + '' ;
    s += bil(370, 80, 'Vạch 0 ở giữa', 'Zero in the middle', { s: 11 }) + t(370, 112, 'Dòng vào G₁ (hoặc G₂), ra cực − : kim lệch phải', { s: 10 }) + t(370, 126, 'Current in G₁/G₂, out of − : needle goes right', { s: 9, i: 1 });
    s += t(370, 150, 'Dòng vào cực −, ra G₁ (hoặc G₂) : kim lệch trái', { s: 10 }) + t(370, 164, 'Current in −, out of G₁/G₂ : needle goes left', { s: 9, i: 1 });
    return svg('0 0 640 245', 'Điện kế có vạch 0 ở giữa thang đo, kim lệch phải hoặc trái theo chiều dòng điện', s.replace(arrow(100, 195, 160, 185, C.green, 0), ''));
  };

  const khtn1e = () => {
    let s = rect(120, 10, 160, 230, C.sunL, { r: 16 }) + rect(140, 28, 120, 46, '#fff', { r: 6 }) + t(200, 58, '12,50', { a: 'middle', s: 22, b: 1 });
    s += circ(200, 140, 42, C.greyL) + line(200, 140, 200, 104, C.ink, 3);
    const marks = [['V=', 'DCV'], ['V~', 'ACV'], ['A', 'DCA'], ['Ω', 'Ω']];
    marks.forEach((m, i) => { const a = -2.2 + i * 1.45, x = 200 + 60 * Math.cos(a), y = 140 + 60 * Math.sin(a); s += t(x.toFixed(0), (y + 4).toFixed(0), m[1], { a: 'middle', s: 9, b: 1 }); });
    s += circ(150, 215, 9, C.ink) + circ(200, 215, 9, C.red) + circ(250, 215, 9, C.ink) + t(150, 237, 'COM', { a: 'middle', s: 8 }) + t(200, 237, 'V Ω', { a: 'middle', s: 8 }) + t(250, 237, 'A', { a: 'middle', s: 8 });
    s += bil(300, 55, 'Màn hình số', 'Digital display', { s: 11 }) + arrow(298, 60, 262, 52, C.ink, 1.5);
    s += bil(300, 130, 'Núm chọn đại lượng và thang đo', 'Selector knob: quantity and range', { s: 11 }) + arrow(298, 135, 244, 140, C.ink, 1.5);
    s += bil(300, 200, 'Cắm que đo vào đúng chốt', 'Plug the probes into the right sockets', { s: 11 });
    s += bil(8, 80, 'Đo I, U, R', 'Measures I, U, R', { s: 10 });
    return svg('0 0 560 250', 'Đồng hồ đo điện đa năng: màn hình, núm chọn thang đo và các chốt cắm', s);
  };

  const khtn1f = () => svg('0 0 520 210', 'Cuộn dây dẫn nối hai đèn LED mắc song song ngược cực',
    t(120, 20, 'a) Sơ đồ / Diagram', { a: 'middle', s: 11, b: 1 }) +
    path('M40 110 q10 -34 20 0 q10 -34 20 0 q10 -34 20 0 q10 -34 20 0', 'none', { c: C.pen, w: 3 }) +
    line(40, 110, 40, 60, C.ink) + line(120, 110, 120, 60, C.ink) + line(40, 60, 70, 60) + line(90, 60, 120, 60) + line(70, 60, 70, 40) + line(90, 60, 90, 40) +
    poly('70,40 90,40 80,56', C.red) + poly('70,60 90,60 80,44', C.green) +
    line(40, 110, 40, 150) + line(120, 110, 120, 150) + line(40, 150, 120, 150) +
    t(80, 176, 'LED 1 và LED 2 ngược cực', { a: 'middle', s: 10 }) + t(80, 190, 'two LEDs, opposite polarity', { a: 'middle', s: 9, i: 1 }) +
    t(340, 20, 'b) Cuộn dây kín / Closed coil', { a: 'middle', s: 11, b: 1 }) +
    '<ellipse cx="320" cy="115" rx="60" ry="40" fill="none" stroke="' + C.pen + '" stroke-width="4"/><ellipse cx="320" cy="115" rx="48" ry="32" fill="none" stroke="' + C.pen + '" stroke-width="4"/>' +
    circ(290, 70, 9, C.red) + circ(350, 70, 9, C.green) +
    rect(430, 60, 60, 30, C.greyL, { r: 4 }) + t(460, 79, 'N', { a: 'middle', s: 12, b: 1, c: C.red }) + t(460, 127, 'S', { a: 'middle', s: 12, b: 1, c: C.pen }) +
    arrow(430, 75, 392, 100, C.ink, 1.5) + bil(340, 185, 'Nam châm chuyển động → đèn sáng', 'Moving magnet → an LED lights up', { a: 'middle', s: 10 }));

  const khtn1g = () => {
    const item = (x, name, en, draw) => '<g>' + draw + bil(x, 168, name, en, { a: 'middle', s: 10 }) + '</g>';
    const funnel = (x) => poly((x - 26) + ',50 ' + (x + 26) + ',50 ' + (x + 4) + ',95 ' + (x + 4) + ',128 ' + (x - 4) + ',128 ' + (x - 4) + ',95', C.penL);
    const sep = (x) => path('M' + (x - 22) + ' 50 L' + (x + 22) + ' 50 L' + (x + 6) + ' 100 L' + (x + 6) + ' 130 L' + (x - 6) + ' 130 L' + (x - 6) + ' 100 Z', C.tealL) + line(x - 10, 82, x + 10, 82, C.ink, 3) + line(x + 10, 82, x + 18, 76, C.ink, 3);
    const flask = (x) => path('M' + (x - 8) + ' 40 L' + (x - 8) + ' 70 A34 34 0 1 0 ' + (x + 8) + ' 70 L' + (x + 8) + ' 40 Z', C.sunL);
    const beaker = (x) => path('M' + (x - 28) + ' 56 L' + (x - 28) + ' 126 L' + (x + 28) + ' 126 L' + (x + 28) + ' 56', C.greyL) + line(x - 28, 90, x + 28, 90, C.pen, 1.5) + line(x - 28, 76, x - 18, 76, C.ink, 1.5) + line(x - 28, 106, x - 18, 106, C.ink, 1.5);
    const dish = (x) => path('M' + (x - 34) + ' 92 Q' + x + ' 140 ' + (x + 34) + ' 92 Z', '#fff');
    const gauze = (x) => rect(x - 32, 90, 64, 34, C.greyL, { r: 3 }) + line(x - 32, 107, x + 32, 107, C.grey, 1.5) + line(x, 90, x, 124, C.grey, 1.5) + line(x - 16, 90, x - 16, 124, C.grey, 1.5) + line(x + 16, 90, x + 16, 124, C.grey, 1.5);
    return svg('0 0 560 200', 'Phễu, phễu chiết, bình cầu, cốc thuỷ tinh, bát sứ và lưới tản nhiệt',
      item(50, 'Phễu', 'Funnel', funnel(50)) + item(140, 'Phễu chiết', 'Separating funnel', sep(140)) + item(230, 'Bình cầu', 'Round-bottom flask', flask(230)) +
      item(330, 'Cốc thuỷ tinh', 'Beaker', beaker(330)) + item(430, 'Bát sứ', 'Evaporating dish', dish(430)) + item(520, 'Lưới tản nhiệt', 'Wire gauze', gauze(515)));
  };

  const khtn1h = () => svg('0 0 460 250', 'Kính hiển vi quang học và tiêu bản cố định nhiễm sắc thể',
    rect(150, 220, 130, 16, C.greyL, { r: 4 }) + path('M290 218 L290 90 Q290 40 240 50', 'none', { c: C.ink, w: 14 }) +
    rect(210, 40, 24, 70, C.penL) + rect(205, 110, 34, 16, C.sunL) + line(222, 126, 222, 150, C.ink, 4) +
    rect(160, 168, 120, 8, C.grey) + rect(195, 164, 28, 4, '#fff', { r: 1, w: 1 }) +
    circ(222, 150, 6, C.sun) + line(222, 156, 222, 190, C.sun, 3) +
    bil(310, 60, 'Thị kính', 'Eyepiece', { s: 11 }) + arrow(308, 64, 240, 60, C.ink, 1.5) +
    bil(310, 118, 'Vật kính 100×', 'Objective 100×', { s: 11 }) + arrow(308, 122, 244, 122, C.ink, 1.5) +
    bil(310, 172, 'Tiêu bản + dầu soi kính', 'Slide + immersion oil', { s: 11 }) + arrow(308, 176, 282, 172, C.ink, 1.5) +
    bil(20, 60, 'Tiêu bản cố định', 'Fixed slide', { s: 11 }) + t(20, 94, 'nhiễm sắc thể', { s: 10 }) + t(20, 107, 'of chromosomes', { s: 9, i: 1 }));

  const slideBox = (x, y, no, vi, en, body) => rect(x, y, 140, 90, '#fff', { r: 6, w: 1.5 }) + t(x + 8, y + 16, 'Trang ' + no, { s: 9, b: 1, c: C.pen }) + bil(x + 70, y + 42, vi, en, { a: 'middle', s: 10 }) + body;
  const khtn1i = () => svg('0 0 640 230', 'Bố cục bài trình chiếu: tiêu đề, giới thiệu, phương pháp, kết quả, thảo luận, kết luận, câu hỏi',
    slideBox(10, 14, 1, 'Tiêu đề + tác giả', 'Title + author', '') + slideBox(165, 14, 2, 'Giới thiệu, mục tiêu', 'Introduction, aim', '') +
    slideBox(320, 14, 3, 'Phương pháp', 'Method', '') + slideBox(475, 14, 4, 'Kết quả (bảng, biểu đồ)', 'Results (table, chart)',
      rect(500, 82, 12, 14, C.pen, { r: 1, w: 0 }) + rect(518, 74, 12, 22, C.teal, { r: 1, w: 0 }) + rect(536, 66, 12, 30, C.red, { r: 1, w: 0 })) +
    slideBox(10, 120, 5, 'Thảo luận', 'Discussion', '') + slideBox(165, 120, 6, 'Kết luận', 'Conclusion', '') + slideBox(320, 120, 7, 'Câu hỏi và trả lời', 'Questions and answers', '') +
    bil(480, 150, 'Ít chữ, nhiều hình', 'Few words, more visuals', { s: 11, c: C.pen }) + t(480, 188, 'Nói bằng lời đơn giản, rõ ràng', { s: 10 }) + t(480, 201, 'Use simple, clear language', { s: 9, i: 1 }));

  const khtn1j = () => {
    const box = (x, y, w, h, vi, en, fill) => rect(x, y, w, h, fill || '#fff', { r: 5, w: 1.5 }) + bil(x + w / 2, y + h / 2 - 6, vi, en, { a: 'middle', s: 10 });
    return svg('0 0 460 330', 'Bố cục báo cáo treo tường khổ A0: tiêu đề, giới thiệu, phương pháp, kết quả, thảo luận, kết luận',
      rect(20, 8, 420, 314, C.greyL, { r: 6, w: 2 }) +
      rect(34, 20, 392, 44, C.penL, { r: 5, w: 1.5 }) + bil(230, 34, 'TIÊU ĐỀ LỚN – đọc được từ xa', 'LARGE TITLE – readable from afar', { a: 'middle', s: 12, c: C.pen }) +
      box(34, 76, 124, 110, 'Giới thiệu', 'Introduction') + box(168, 76, 124, 110, 'Phương pháp', 'Method') + box(302, 76, 124, 110, 'Kết quả', 'Results', C.sunL) +
      rect(310, 140, 14, 36, C.pen, { r: 1, w: 0 }) + rect(330, 124, 14, 52, C.teal, { r: 1, w: 0 }) + rect(350, 150, 14, 26, C.red, { r: 1, w: 0 }) +
      box(34, 198, 190, 110, 'Thảo luận', 'Discussion') + box(236, 198, 190, 110, 'Kết luận + Tài liệu tham khảo', 'Conclusion + References'));
  };

  /* ---------------------------------------------------------------- BÀI 2 */
  const khtn2a = () => svg('0 0 460 220', 'Búa đập vào thanh thép làm thanh biến dạng',
    rect(120, 150, 240, 16, C.grey, { r: 3 }) + path('M120 150 Q240 176 360 150', 'none', { c: C.red, w: 2.5 }) +
    line(120, 166, 120, 200, C.ink, 4) + line(360, 166, 360, 200, C.ink, 4) +
    rect(205, 56, 70, 46, C.grey, { r: 5 }) + line(240, 102, 240, 150, C.ink, 0) + rect(232, 14, 16, 42, '#c9a26b', { r: 3 }) +
    arrow(240, 112, 240, 144, C.red, 3) + bil(300, 80, 'Búa nặng và nhanh', 'A heavy, fast hammer', { s: 11 }) +
    bil(300, 110, 'Động năng lớn → thanh biến dạng nhiều', 'Large kinetic energy → large dent', { s: 10, c: C.red }) +
    bil(20, 60, 'Thanh thép', 'Steel bar', { s: 11 }) + arrow(40, 90, 118, 148, C.ink, 1.5));

  const khtn2b = () => svg('0 0 560 200', 'Quả bóng, ô tô và máy bay đang chuyển động',
    ground(10, 550, 150) +
    circ(70, 130, 20, '#fff') + path('M70 112 L82 122 L77 136 L63 136 L58 122 Z', C.ink, { w: 1.5 }) + arrow(100, 130, 140, 130, C.red, 2.5) +
    bil(75, 175, 'a) Quả bóng', 'a) Ball', { a: 'middle', s: 10 }) +
    rect(210, 112, 110, 28, C.penL, { r: 8 }) + path('M228 112 L242 94 L292 94 L306 112 Z', C.penL) + circ(234, 142, 11, C.ink) + circ(296, 142, 11, C.ink) + arrow(330, 126, 400, 126, C.red, 3.5) +
    bil(265, 175, 'b) Ô tô đang di chuyển', 'b) A moving car', { a: 'middle', s: 10 }) +
    path('M440 60 L520 56 L548 46 L540 66 L548 82 L520 70 L440 68 Z', C.tealL) + path('M470 60 L450 34 L470 36 L492 58 Z', C.teal) + path('M470 68 L450 94 L470 92 L492 70 Z', C.teal) + arrow(405, 62, 440, 62, C.red, 4) +
    bil(490, 175, 'c) Máy bay đang chuyển động', 'c) A flying plane', { a: 'middle', s: 10 }));

  const khtn2c = () => svg('0 0 520 250', 'Sơ đồ đập thuỷ điện: nước ở cao có thế năng, máy phát điện đặt thấp',
    path('M0 90 L140 90 L140 220 L0 220 Z', C.penL, { w: 0 }) + t(60, 150, 'Hồ chứa', { a: 'middle', s: 12, b: 1 }) + t(60, 166, 'Reservoir', { a: 'middle', s: 10, i: 1 }) +
    poly('140,70 170,70 190,220 140,220', '#b9b1a3') + line(0, 90, 140, 90, C.pen, 3) +
    path('M170 100 L430 205 L430 218 L190 120 Z', C.pen, { w: 0 }) + t(300, 128, 'Ống dẫn nước', { s: 11, b: 1, c: '#fff' }) +
    rect(430, 196, 60, 40, C.sunL, { r: 5 }) + t(460, 220, '⚡', { a: 'middle', s: 18 }) + t(460, 250, 'Máy phát điện', { a: 'middle', s: 10, b: 1 }) +
    line(20, 90, 20, 220, C.ink, 1.5, '4 3') + arrow(20, 92, 20, 214, C.red, 1.5) + t(28, 160, 'h', { s: 14, b: 1, c: C.red }) +
    bil(190, 40, 'Mực nước càng cao, thế năng càng lớn', 'The higher the water, the greater its potential energy', { s: 11 }) + ground(0, 520, 236));

  const khtn2d = () => svg('0 0 420 250', 'Người chơi xích đu chuyển động từ vị trí cao nhất A xuống vị trí thấp nhất O',
    line(60, 20, 360, 20, C.ink, 5) + line(60, 20, 40, 230, C.ink, 4) + line(360, 20, 380, 230, C.ink, 4) +
    line(210, 20, 120, 150, C.grey, 1.5, '6 4') + line(210, 20, 210, 180, C.grey, 1.5, '6 4') + line(210, 20, 300, 150, C.grey, 1.5, '6 4') +
    line(210, 20, 120, 150, C.ink, 2) + circ(120, 160, 14, C.sun) + '<ellipse cx="120" cy="156" rx="6" ry="6" fill="none"/>' +
    circ(210, 190, 14, C.sunL, { c: C.grey }) + circ(300, 160, 14, C.sunL, { c: C.grey }) +
    t(100, 142, 'A', { a: 'end', s: 14, b: 1, c: C.red }) + t(228, 214, 'O', { s: 14, b: 1, c: C.pen }) + t(318, 150, 'B', { s: 14, b: 1 }) +
    arrow(138, 168, 190, 186, C.red, 2.5) + ground(10, 410, 232) +
    bil(250, 66, 'A cao nhất: v = 0', 'A is the highest: v = 0', { s: 10 }) + bil(250, 98, 'O thấp nhất: v lớn nhất', 'O is the lowest: v is greatest', { s: 10 }));

  /* ---------------------------------------------------------------- BÀI 3 */
  const khtn3a = () => svg('0 0 460 230', 'Người tung hứng bóng: bóng đi lên rồi rơi xuống',
    circ(230, 175, 14, C.sunL) + line(230, 189, 230, 220, C.ink, 4) + line(230, 195, 205, 180, C.ink, 3) + line(230, 195, 255, 180, C.ink, 3) +
    path('M205 170 Q150 20 120 150', 'none', { c: C.red, w: 2.5 }) + path('M255 170 Q310 20 340 150', 'none', { c: C.pen, w: 2.5 }) +
    circ(160, 60, 12, C.sun) + circ(300, 60, 12, C.sun) + circ(120, 150, 10, C.sun) + circ(340, 150, 10, C.sun) +
    arrow(150, 100, 148, 88, C.red, 2) + arrow(310, 90, 312, 104, C.pen, 2) +
    bil(10, 30, 'Đi lên: độ cao tăng, tốc độ giảm', 'Going up: height ↑, speed ↓', { s: 10, c: C.red }) +
    bil(450, 30, 'Rơi xuống: độ cao giảm, tốc độ tăng', 'Falling: height ↓, speed ↑', { a: 'end', s: 10, c: C.pen }) + ground(10, 450, 224));

  const khtn3b = () => svg('0 0 460 250', 'Con lắc đơn: thả ở A, đi qua O thấp nhất, lên tới B',
    line(160, 14, 300, 14, C.ink, 6) + line(230, 14, 90, 190, C.ink, 2) + line(230, 14, 230, 214, C.grey, 1.5, '6 4') + line(230, 14, 370, 190, C.grey, 1.5, '6 4') +
    circ(90, 200, 16, C.sun) + circ(230, 224, 16, C.sunL, { c: C.grey }) + circ(370, 200, 16, C.sunL, { c: C.grey }) +
    t(70, 190, 'A', { a: 'end', s: 14, b: 1, c: C.red }) + t(250, 244, 'O', { s: 14, b: 1, c: C.pen }) + t(392, 190, 'B', { s: 14, b: 1 }) +
    line(30, 200, 30, 224, C.red, 1.5) + t(24, 214, 'h', { a: 'end', s: 13, b: 1, c: C.red }) + line(30, 224, 130, 224, C.ink, 1, '3 3') + line(20, 200, 90, 200, C.ink, 1, '3 3') +
    bil(250, 80, 'Thả nhẹ ở A (độ cao h)', 'Released gently at A (height h)', { s: 10 }));

  /* Cột năng lượng của vật 1,5 kg thả rơi từ 4 m (P = 15 N): Wt = 15·h, Wđ = 60 − Wt, W = 60 J */
  const khtn3c = () => {
    const P = 15, H = 4, W = P * H, hs = [4, 3, 2, 1, 0];
    let s = line(50, 24, 50, 190, C.ink, 2) + line(50, 190, 470, 190, C.ink, 2) + t(48, 18, 'J', { a: 'end', s: 11, b: 1 });
    [0, 20, 40, 60].forEach((v) => { const y = 190 - v * 2.4; s += line(46, y, 470, y, C.greyL, 1) + t(44, y + 4, String(v), { a: 'end', s: 10 }); });
    hs.forEach((h, i) => {
      const x = 76 + i * 80, wt = P * h, wd = W - wt;
      s += rect(x, 190 - wt * 2.4, 26, wt * 2.4, C.pen, { r: 2, w: 0 }) + rect(x + 28, 190 - wd * 2.4, 26, wd * 2.4, C.red, { r: 2, w: 0 });
      s += t(x + 27, 208, 'h = ' + h + ' m', { a: 'middle', s: 10, b: 1 }) + t(x + 13, 186 - wt * 2.4, wt ? String(wt) : '', { a: 'middle', s: 9, c: C.pen }) + t(x + 41, 186 - wd * 2.4, wd ? String(wd) : '', { a: 'middle', s: 9, c: C.red });
    });
    s += line(50, 190 - W * 2.4, 470, 190 - W * 2.4, C.green, 2.5, '8 5') + t(468, 190 - W * 2.4 - 6, 'W = 60 J (không đổi / constant)', { a: 'end', s: 11, b: 1, c: C.green });
    s += rect(60, 232, 14, 10, C.pen, { r: 2, w: 0 }) + t(80, 241, 'Thế năng W_t / Potential', { s: 10 }) + rect(220, 232, 14, 10, C.red, { r: 2, w: 0 }) + t(240, 241, 'Động năng W_đ / Kinetic', { s: 10 });
    return svg('0 0 490 252', 'Biểu đồ cột thế năng và động năng của vật 1,5 kg rơi từ 4 m: cơ năng luôn bằng 60 J', s);
  };

  const khtn3d = () => svg('0 0 500 240', 'Xe thế năng: quả nặng nối với trục xe qua ròng rọc cố định bằng sợi dây',
    ground(20, 480, 214) + rect(180, 150, 190, 24, C.penL, { r: 4 }) + circ(214, 190, 22, '#fff') + circ(214, 190, 4, C.ink) + circ(336, 190, 22, '#fff') + circ(336, 190, 4, C.ink) +
    rect(110, 110, 12, 100, C.greyL, { r: 3 }) + circ(70, 58, 16, C.greyL) + circ(70, 58, 3, C.ink) + line(70, 42, 400, 42, C.ink, 5, '') +
    '<path d="M54 58 L54 160" stroke="' + C.ink + '" stroke-width="1.8" fill="none"/>' + rect(40, 160, 28, 30, C.sun, { r: 4 }) + t(54, 180, 'm₁', { a: 'middle', s: 11, b: 1 }) +
    '<path d="M70 42 L214 42 L214 190" stroke="' + C.ink + '" stroke-width="1.5" fill="none" stroke-dasharray="1 0"/>' +
    arrow(54, 100, 54, 150, C.red, 2.5) + t(76, 112, 'h', { s: 13, b: 1, c: C.red }) + arrow(300, 140, 360, 140, C.red, 3) + t(332, 130, 'v', { s: 13, b: 1, c: C.red }) +
    t(214, 232, 'm₂ (xe)', { s: 11, b: 1 }) + bil(110, 20, 'Ròng rọc cố định', 'Fixed pulley', { s: 10 }) + bil(262, 76, 'Dây mềm, không dãn', 'Soft, inextensible string', { s: 10 }) +
    bil(400, 92, 'Quả nặng rơi → xe lăn', 'Falling mass → cart rolls', { s: 10, c: C.red }));

  const khtn3e = () => svg('0 0 440 250', 'Búa máy đóng cọc: đầu búa nâng lên độ cao h rồi thả rơi xuống cọc',
    rect(190, 20, 10, 190, C.greyL, { r: 3 }) + rect(260, 20, 10, 190, C.greyL, { r: 3 }) + rect(190, 20, 80, 8, C.ink, { r: 2 }) +
    rect(196, 62, 68, 34, C.grey, { r: 5 }) + '<rect x="196" y="62" width="68" height="34" rx="5" fill="none" stroke="' + C.ink + '" stroke-width="2"/>' + line(230, 28, 230, 62, C.ink, 2) +
    rect(222, 150, 16, 70, '#c9a26b', { r: 2 }) + ground(150, 330, 218) + '<rect x="150" y="218" width="180" height="22" fill="#e9dcc4"/>' +
    arrow(150, 100, 150, 140, C.red, 2.5) + line(170, 62, 170, 150, C.ink, 1, '3 3') + t(160, 112, 'h', { a: 'end', s: 13, b: 1, c: C.red }) +
    bil(290, 60, 'Trên cao: thế năng lớn', 'Up high: large potential energy', { s: 10, c: C.pen }) +
    bil(290, 130, 'Khi rơi: thế năng → động năng', 'Falling: potential → kinetic', { s: 10, c: C.red }) +
    bil(290, 190, 'Chạm cọc: động năng đóng cọc xuống', 'On impact: kinetic energy drives the pile', { s: 10 }));

  Object.assign(T.art, { khtn1a, khtn1b, khtn1c, khtn1d, khtn1e, khtn1f, khtn1g, khtn1h, khtn1i, khtn1j, khtn2a, khtn2b, khtn2c, khtn2d, khtn3a, khtn3b, khtn3c, khtn3d, khtn3e });
  /* ---- Bản vẽ lại với cỡ chữ lớn hơn cho các hình hẹp (đọc được trên trang sách) ---- */
  const khtn1b2 = () => {
    let s = path('M90 130 A80 80 0 0 1 250 130 Z', C.penL) + circ(170, 130, 100, 'none', { c: C.grey, w: 1.5 }), i;
    for (i = 0; i <= 18; i++) { const a = Math.PI + i * Math.PI / 18, k = i % 3 ? 94 : 88; s += line((170 + 100 * Math.cos(a)).toFixed(1), (130 + 100 * Math.sin(a)).toFixed(1), (170 + k * Math.cos(a)).toFixed(1), (130 + k * Math.sin(a)).toFixed(1), C.grey, 1.5); }
    s += line(170, 130, 110, 42, C.red, 3) + arrow(130, 70, 170, 130, C.red, 3) + line(170, 130, 222, 62, C.green, 3) + arrow(196, 96, 222, 62, C.green, 3) + line(170, 130, 170, 35, C.grey, 1.5, '5 4') + line(60, 130, 280, 130, C.ink, 2);
    s += t(96, 40, 'tia tới', { a: 'end', s: 14, b: 1, c: C.red }) + t(232, 56, 'tia ló', { s: 14, b: 1, c: C.green });
    s += bil(170, 160, 'Bản bán trụ (thuỷ tinh)', 'Semicircular block (glass)', { a: 'middle', s: 14 });
    s += bil(170, 205, 'Bảng chia độ: đọc góc tới, góc khúc xạ', 'Angle scale: read incidence and refraction angles', { a: 'middle', s: 13 });
    return svg('0 0 340 250', 'Bản bán trụ đặt trên bảng chia độ, có tia tới và tia ló', s);
  };
  const khtn1d2 = () => {
    let s = rect(30, 14, 300, 140, C.greyL, { r: 14 }) + path('M60 130 A120 120 0 0 1 300 130', '#fff'), i;
    for (i = -5; i <= 5; i++) s += line((180 + 100 * Math.sin(i * 0.22)).toFixed(1), (140 - 100 * Math.cos(i * 0.22)).toFixed(1), (180 + 114 * Math.sin(i * 0.22)).toFixed(1), (140 - 114 * Math.cos(i * 0.22)).toFixed(1), C.ink, i === 0 ? 3 : 1.5);
    s += line(180, 140, 180, 50, C.red, 3) + circ(180, 140, 7, C.ink) + t(180, 38, '0', { a: 'middle', s: 15, b: 1 });
    s += circ(90, 184, 10, C.red) + t(90, 212, 'G₁', { a: 'middle', s: 14, b: 1 }) + circ(150, 184, 10, C.red) + t(150, 212, 'G₂', { a: 'middle', s: 14, b: 1 }) + circ(270, 184, 10, C.ink) + t(270, 212, '−', { a: 'middle', s: 18, b: 1 });
    s += t(10, 240, 'Vào G₁/G₂, ra cực −: kim lệch phải', { s: 14, b: 1 }) + t(10, 257, 'In at G₁/G₂, out at −: needle goes right', { s: 12, i: 1 });
    s += t(10, 280, 'Vào cực −, ra G₁/G₂: kim lệch trái', { s: 14, b: 1 }) + t(10, 297, 'In at −, out at G₁/G₂: needle goes left', { s: 12, i: 1 });
    return svg('0 0 360 305', 'Điện kế có vạch 0 ở giữa thang đo, kim lệch phải hoặc trái theo chiều dòng điện', s);
  };
  const khtn1e2 = () => {
    let s = rect(10, 10, 150, 230, C.sunL, { r: 16 }) + rect(28, 26, 114, 44, '#fff', { r: 6 }) + t(85, 56, '12,50', { a: 'middle', s: 22, b: 1 }) + circ(85, 135, 40, C.greyL) + line(85, 135, 85, 100, C.ink, 3);
    s += circ(40, 212, 9, C.ink) + circ(85, 212, 9, C.red) + circ(130, 212, 9, C.ink);
    s += bil(180, 46, 'Màn hình số', 'Digital display', { s: 14 }) + arrow(178, 50, 146, 48, C.ink, 1.5);
    s += bil(180, 128, 'Núm chọn thang đo', 'Range knob', { s: 14 }) + arrow(178, 132, 128, 136, C.ink, 1.5);
    s += bil(180, 200, 'Chốt cắm que đo', 'Probe sockets', { s: 14 }) + arrow(178, 205, 142, 212, C.ink, 1.5);
    return svg('0 0 360 250', 'Đồng hồ đo điện đa năng: màn hình, núm chọn thang đo và các chốt cắm', s);
  };
  const khtn1g2 = () => {
    const item = (x, y, vi, en, d) => '<g transform="translate(' + x + ',' + y + ')">' + d + bil(0, 112, vi, en, { a: 'middle', s: 14 }) + '</g>';
    const funnel = poly('-28,10 28,10 4,54 4,86 -4,86 -4,54', C.penL);
    const sep = path('M-24 10 L24 10 L6 58 L6 88 L-6 88 L-6 58 Z', C.tealL) + line(-12, 40, 12, 40, C.ink, 3);
    const flask = path('M-8 6 L-8 36 A34 34 0 1 0 8 36 L8 6 Z', C.sunL);
    const beaker = path('M-30 14 L-30 86 L30 86 L30 14', C.greyL) + line(-30, 50, 30, 50, C.pen, 1.5) + line(-30, 34, -18, 34, C.ink, 1.5) + line(-30, 68, -18, 68, C.ink, 1.5);
    const dish = path('M-36 44 Q0 96 36 44 Z', '#fff');
    const gauze = rect(-34, 44, 68, 38, C.greyL, { r: 3 }) + line(-34, 63, 34, 63, C.grey, 1.5) + line(0, 44, 0, 82, C.grey, 1.5);
    return svg('0 0 420 300', 'Phễu, phễu chiết, bình cầu, cốc thuỷ tinh, bát sứ và lưới tản nhiệt',
      item(70, 10, 'Phễu', 'Funnel', funnel) + item(210, 10, 'Phễu chiết', 'Separating funnel', sep) + item(350, 10, 'Bình cầu', 'Round flask', flask) +
      item(70, 160, 'Cốc thuỷ tinh', 'Beaker', beaker) + item(210, 160, 'Bát sứ', 'Evaporating dish', dish) + item(350, 160, 'Lưới tản nhiệt', 'Wire gauze', gauze));
  };
  const khtn1h2 = () => svg('0 0 400 250', 'Kính hiển vi quang học và tiêu bản cố định nhiễm sắc thể',
    rect(60, 220, 130, 16, C.greyL, { r: 4 }) + path('M190 218 L190 90 Q190 40 140 50', 'none', { c: C.ink, w: 14 }) +
    rect(110, 40, 24, 70, C.penL) + rect(105, 110, 34, 16, C.sunL) + line(122, 126, 122, 150, C.ink, 4) + rect(60, 168, 120, 8, C.grey) + circ(122, 150, 6, C.sun) +
    bil(205, 50, 'Thị kính', 'Eyepiece', { s: 14 }) + bil(205, 112, 'Vật kính 100×', 'Objective 100×', { s: 14 }) + bil(205, 172, 'Tiêu bản + dầu', 'Slide + oil', { s: 14 }) +
    bil(10, 28, 'Tiêu bản NST', 'Chromosome slide', { s: 12 }));
  const sb = (x, y, no, vi, en, body) => rect(x, y, 150, 84, '#fff', { r: 6, w: 1.5 }) + t(x + 8, y + 17, 'Trang ' + no, { s: 12, b: 1, c: C.pen }) + bil(x + 75, y + 44, vi, en, { a: 'middle', s: 12 }) + (body || '');
  const khtn1i2 = () => svg('0 0 340 420', 'Bố cục bài trình chiếu: tiêu đề, giới thiệu, phương pháp, kết quả, thảo luận, kết luận, câu hỏi',
    sb(10, 8, 1, 'Tiêu đề + tác giả', 'Title + authors') + sb(180, 8, 2, 'Giới thiệu, mục tiêu', 'Introduction, aim') +
    sb(10, 106, 3, 'Phương pháp', 'Method') + sb(180, 106, 4, 'Kết quả', 'Results', rect(250, 150, 14, 18, C.pen, { r: 1, w: 0 }) + rect(270, 140, 14, 28, C.teal, { r: 1, w: 0 }) + rect(290, 130, 14, 38, C.red, { r: 1, w: 0 })) +
    sb(10, 204, 5, 'Thảo luận', 'Discussion') + sb(180, 204, 6, 'Kết luận', 'Conclusion') + sb(10, 302, 7, 'Câu hỏi và trả lời', 'Questions and answers') +
    bil(180, 330, 'Ít chữ, nhiều hình', 'Few words, more visuals', { s: 13, c: C.pen }));
  Object.assign(T.art, { khtn1b: khtn1b2, khtn1d: khtn1d2, khtn1e: khtn1e2, khtn1g: khtn1g2, khtn1h: khtn1h2, khtn1i: khtn1i2 });
})();
