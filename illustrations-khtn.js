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
   — Đợt 2 —  khtn4a–d (Hình 4.1–4.4), khtn5a–g (5.1, 5.2, 5.5, 5.6, mở bài, 5.3, 5.4), khtn6a–d (6.1–6.4)
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

  /* ---------------------------------------------------------------- BÀI 4 – 6 (Đợt 2) */
  const man = (x, y, o) => { o = o || {}; const lean = o.lean || 0; return circ(x, y - 46, 9, '#fff') + line(x, y - 37, x + lean, y - 12, C.ink, 3) + line(x + lean, y - 12, x - 8, y + 14, C.ink, 3) + line(x + lean, y - 12, x + 8 + lean, y + 14, C.ink, 3) + (o.arms === false ? '' : line(x + lean * .3, y - 30, x + (o.ax == null ? 22 : o.ax), y - (o.ay == null ? 24 : o.ay), C.ink, 3)); };
  const arc = (cx, cy, r, a1, a2, c, w) => { const p = (a) => [cx + r * Math.cos(a * Math.PI / 180), cy - r * Math.sin(a * Math.PI / 180)]; const s = p(a1), e = p(a2); return '<path d="M' + s[0].toFixed(1) + ' ' + s[1].toFixed(1) + ' A' + r + ' ' + r + ' 0 0 ' + (a2 > a1 ? 0 : 1) + ' ' + e[0].toFixed(1) + ' ' + e[1].toFixed(1) + '" fill="none" stroke="' + (c || C.ink) + '" stroke-width="' + (w || 1.8) + '"/>'; };
  const khtn4a = () => svg('0 0 480 200', 'Người đẩy xe hàng chuyển động trên sàn nằm ngang',
    ground(20, 460, 168) + man(110, 150, { lean: 16, ax: 40, ay: 26 }) + rect(158, 96, 110, 58, C.sunL, { r: 5 }) + circ(182, 160, 10, '#fff') + circ(246, 160, 10, '#fff') +
    t(213, 130, 'xe hàng', { a: 'middle', s: 12, b: 1 }) + arrow(60, 112, 156, 112, C.red, 3) + bil(106, 74, 'Lực đẩy F', 'Pushing force F', { a: 'middle', s: 12, c: C.red }) +
    line(158, 184, 158, 192, C.ink, 2) + line(330, 184, 330, 192, C.ink, 2) + arrow(158, 188, 330, 188, C.pen, 2.5) + t(244, 182, 's', { a: 'middle', s: 14, b: 1, c: C.pen }) +
    '<rect x="158" y="96" width="110" height="58" rx="5" fill="none" stroke="' + C.ink + '" stroke-width="2" stroke-dasharray="5 4" transform="translate(172 0)" opacity=".45"/>' + arrow(280, 126, 330, 126, C.pen, 2.5) + t(366, 130, 'v', { s: 14, b: 1, c: C.pen }) + bil(390, 70, 'Sau quãng đường s', 'After a distance s', { a: 'middle', s: 11 }));
  const khtn4b = () => {
    const cell = (x, y, label, vi, en, ok, inner) => '<rect x="' + x + '" y="' + y + '" width="226" height="138" rx="10" fill="#fff" stroke="' + C.grey + '" stroke-width="1.5"/>' + inner + t(x + 10, y + 18, label, { s: 13, b: 1, c: C.pen }) + bil(x + 113, y + 106, vi, en, { a: 'middle', s: 11, c: ok ? C.green : C.red });
    return svg('0 0 480 300', 'Bốn ví dụ: đẩy xe, ném lao, ngồi học và giữ tạ',
      cell(4, 4, 'a)', 'Đẩy xe: có công', 'Pushing a cart: work done', 1, ground(18, 214, 94) + man(60, 86, { lean: 10, ax: 32, ay: 22 }) + rect(96, 50, 70, 32, C.sunL, { r: 4 }) + circ(110, 88, 6, '#fff') + circ(152, 88, 6, '#fff') + arrow(60, 56, 94, 56, C.red, 2.5) + arrow(174, 66, 206, 66, C.pen, 2)) +
      cell(242, 4, 'b)', 'Ném lao: có công', 'Throwing a javelin: work done', 1, ground(256, 452, 94) + man(300, 86, { lean: 14, ax: 40, ay: 50 }) + arrow(318, 52, 400, 34, C.red, 3) + line(326, 56, 380, 44, C.ink, 3) + t(420, 40, 's', { s: 13, b: 1, c: C.pen })) +
      cell(4, 154, 'c)', 'Ngồi học: không có công', 'Sitting and studying: no work', 0, ground(18, 214, 244) + rect(78, 214, 90, 8, C.greyL, { r: 2 }) + line(86, 222, 86, 244, C.ink, 3) + line(160, 222, 160, 244, C.ink, 3) + circ(60, 188, 9, '#fff') + line(60, 197, 60, 222, C.ink, 3) + line(60, 222, 90, 222, C.ink, 3) + line(90, 222, 90, 244, C.ink, 3) + rect(104, 200, 44, 14, C.penL, { r: 2 })) +
      cell(242, 154, 'd)', 'Giữ tạ đứng yên: không có công', 'Holding a weight still: no work', 0, ground(256, 452, 244) + man(350, 236, { arms: false }) + line(318, 190, 382, 190, C.ink, 4) + circ(314, 190, 12, C.greyL) + circ(386, 190, 12, C.greyL) + line(336, 200, 322, 190, C.ink, 3) + line(364, 200, 378, 190, C.ink, 3)));
  };
  const khtn4c = () => svg('0 0 480 200', 'Lực F hợp với hướng dịch chuyển một góc α',
    ground(20, 460, 150) + rect(130, 108, 90, 40, C.sunL, { r: 5 }) + circ(150, 150, 8, '#fff') + circ(200, 150, 8, '#fff') + circ(175, 128, 3, C.red) +
    arrow(175, 128, 305, 60, C.red, 3) + t(312, 62, 'F', { s: 15, b: 1, c: C.red }) + line(175, 128, 330, 128, C.grey, 1.6, 1) + arc(175, 128, 56, 0, 28, C.ink, 2) + t(246, 120, 'α', { s: 16, b: 1 }) +
    arrow(175, 176, 400, 176, C.pen, 2.5) + t(290, 170, 's  (hướng dịch chuyển)', { a: 'middle', s: 12, b: 1, c: C.pen }) + line(305, 60, 305, 128, C.grey, 1.3, 1) + arrow(175, 128, 305, 128, C.green, 2.2) + t(240, 146, 'F·cosα', { a: 'middle', s: 12, b: 1, c: C.green }) +
    bil(20, 30, 'Công của F: A = F·s·cosα', 'Work of F: A = F·s·cosα', { s: 12, c: C.pen }));
  const forklift = (x, y, load, up) => '<g>' + rect(x, y + 50, 78, 26, C.sun, { r: 4 }) + rect(x + 6, y + 22, 40, 30, C.penL, { r: 3 }) + circ(x + 18, y + 80, 11, '#fff') + circ(x + 60, y + 80, 11, '#fff') + line(x + 80, y + 70 - up, x + 80, y - 6 - up * .0 + 10, C.ink, 5) + line(x + 80, y + 66 - up, x + 112, y + 66 - up, C.ink, 5) + rect(x + 84, y + 40 - up, 28, 26, C.sunL, { r: 3 }) + t(x + 98, y + 58 - up, load, { a: 'middle', s: 10, b: 1 }) + '</g>';
  const khtn4d = () => svg('0 0 480 240', 'Hai xe nâng đưa thùng hàng từ mặt đất lên sàn xe tải cao 1 m',
    ground(10, 470, 190) + rect(360, 108, 100, 12, C.greyL, { r: 2 }) + rect(374, 120, 80, 42, C.greyL, { r: 2 }) + circ(396, 172, 14, '#fff') + circ(436, 172, 14, '#fff') + line(360, 108, 360, 190, C.grey, 1.5, 1) +
    forklift(20, 50, '500 N', 0) + forklift(190, 50, '700 N', 0) + arrow(124, 150, 124, 100, C.red, 2) + arrow(294, 150, 294, 100, C.red, 2) +
    t(20, 22, 'Xe thứ nhất: 500 N, 10 s', { s: 12, b: 1, c: C.pen }) + t(190, 22, 'Xe thứ hai: 700 N, 15 s', { s: 12, b: 1, c: C.teal }) + t(364, 98, 'B', { s: 14, b: 1 }) + t(14, 186, 'A', { s: 14, b: 1 }) +
    t(468, 154, '1 m', { a: 'end', s: 12, b: 1, c: C.red }) + line(476, 108, 476, 190, C.red, 1.6) + t(240, 222, 'Xe nâng thùng hàng từ A lên B (Hình 4.4) / Lifting a crate from A to B', { a: 'middle', s: 11, c: C.grey }));
  /* ---- ÁNH SÁNG ---- */
  const P0 = (cx, cy, L, th) => [cx + L * Math.sin(th * Math.PI / 180), cy - L * Math.cos(th * Math.PI / 180)];
  const khtn5a = () => svg('0 0 480 250', 'Bố trí thí nghiệm khúc xạ: đèn có khe, bản bán trụ trên bảng chia độ',
    rect(20, 90, 100, 70, C.greyL, { r: 6 }) + circ(52, 125, 14, C.sun) + t(52, 129, '12 V', { a: 'middle', s: 9, b: 1 }) + rect(110, 108, 14, 34, C.grey, { r: 2 }) +
    circ(330, 130, 100, '#fff', { c: C.grey, w: 1.5 }) + path('M242 130 A88 88 0 0 0 418 130 Z', C.penL) + line(230, 130, 430, 130, C.ink, 1.6) + line(330, 40, 330, 220, C.ink, 1.2, 1) +
    '<line x1="124" y1="125" x2="330" y2="130" stroke="' + C.red + '" stroke-width="3"/>' + line(330, 130, 392, 186, C.red, 3) + t(338, 123, 'I', { s: 13, b: 1 }) +
    rect(30, 190, 70, 30, C.tealL, { r: 5 }) + t(65, 209, 'Nguồn điện', { a: 'middle', s: 10, b: 1 }) + line(65, 190, 52, 140, C.ink, 1.5) + bil(330, 12, 'Bản bán trụ trên vòng chia độ', 'Half-disc on a protractor board', { a: 'middle', s: 11 }) + t(150, 100, 'Đèn có khe', { s: 11, b: 1 }) + t(150, 114, 'Lamp with slit', { s: 10, i: 1 }));
  const khtn5b = () => {
    const I = [240, 140], S = P0(I[0], I[1], 120, -40), K = P0(I[0], I[1], 120, 180 - 26);
    return svg('0 0 480 280', 'Đường truyền của tia sáng qua mặt phân cách không khí – thuỷ tinh',
      rect(20, 140, 440, 130, C.penL, { r: 0, c: 'none', w: 0 }) + line(20, 140, 460, 140, C.ink, 2.5) + line(240, 20, 240, 262, C.ink, 1.5, 1) + t(250, 28, 'N', { s: 14, b: 1 }) + t(250, 258, "N′", { s: 14, b: 1 }) +
      arrow(S[0], S[1], 240, 140, C.red, 3) + arrow(240, 140, K[0], K[1], C.red, 3) + t(S[0] - 22, S[1] + 4, 'S', { s: 15, b: 1 }) + t(K[0] + 8, K[1] + 4, 'K', { s: 15, b: 1 }) + t(226, 132, 'I', { s: 15, b: 1 }) +
      arc(240, 140, 64, 90, 130, C.ink, 2) + t(206, 92, 'i', { s: 16, b: 1, c: C.pen }) + arc(240, 140, 64, 270, 296, C.ink, 2) + t(262, 214, 'r', { s: 16, b: 1, c: C.pen }) +
      bil(36, 70, 'Không khí', 'Air', { s: 13 }) + bil(36, 190, 'Thuỷ tinh', 'Glass', { s: 13 }) + bil(330, 72, 'Tia tới SI', 'Incident ray SI', { s: 11 }) + bil(330, 204, 'Tia khúc xạ IK', 'Refracted ray IK', { s: 11 }));
  };
  const khtn5c = () => {
    const I = [240, 140], S = P0(I[0], I[1], 120, 180 + 25), K = P0(I[0], I[1], 120, 35.2);
    return svg('0 0 480 280', 'Tia sáng truyền từ nước ra không khí',
      rect(20, 140, 440, 130, C.tealL, { r: 0, c: 'none', w: 0 }) + line(20, 140, 460, 140, C.ink, 2.5) + line(240, 20, 240, 262, C.ink, 1.5, 1) + t(250, 28, 'N', { s: 14, b: 1 }) + t(250, 258, "N′", { s: 14, b: 1 }) +
      arrow(S[0], S[1], 240, 140, C.red, 3) + arrow(240, 140, K[0], K[1], C.red, 3) + t(S[0] + 6, S[1] + 6, 'S', { s: 15, b: 1 }) + t(K[0] + 8, K[1] + 4, 'K', { s: 15, b: 1 }) + t(226, 132, 'I', { s: 15, b: 1 }) +
      bil(36, 70, 'Không khí', 'Air', { s: 13 }) + bil(36, 190, 'Nước', 'Water', { s: 13 }) + t(352, 112, 'r', { s: 16, b: 1, c: C.pen }) + t(204, 196, 'i', { s: 16, b: 1, c: C.pen }) + bil(250, 238, 'r > i: lệch xa pháp tuyến', 'r > i: bends away from the normal', { s: 11, c: C.red }));
  };
  const khtn5d = () => svg('0 0 480 280', 'Đường truyền của tia sáng từ đồng xu qua mặt nước tới mắt',
    rect(150, 120, 170, 130, C.tealL, { r: 0, c: 'none', w: 0 }) + '<path d="M150 70 V250 H320 V70" fill="none" stroke="' + C.ink + '" stroke-width="3"/>' + line(150, 120, 320, 120, C.pen, 2) + line(20, 250, 460, 250, C.ink, 3) + '<ellipse cx="270" cy="244" rx="22" ry="6" fill="' + C.sun + '" stroke="' + C.ink + '" stroke-width="1.8"/>' +
    arrow(270, 240, 214, 120, C.red, 3) + arrow(214, 120, 60, 60, C.red, 3) + line(214, 120, 260, 214, C.grey, 1.8, 1) + '<ellipse cx="262" cy="206" rx="20" ry="5" fill="none" stroke="' + C.grey + '" stroke-width="1.8" stroke-dasharray="4 3"/>' +
    line(214, 80, 214, 190, C.ink, 1.2, 1) + '<ellipse cx="52" cy="58" rx="18" ry="11" fill="#fff" stroke="' + C.ink + '" stroke-width="2"/><circle cx="52" cy="58" r="5" fill="' + C.ink + '"/>' +
    bil(14, 90, 'Mắt', 'Eye', { s: 12 }) + bil(330, 190, 'Đồng xu thật', 'Real coin', { s: 11 }) + bil(330, 140, 'Vị trí nhìn thấy', 'Seen position', { s: 11, c: C.grey }) + bil(228, 100, 'Nước', 'Water', { a: 'middle', s: 11, c: C.pen }));
  const khtn5e = () => {
    const cup = (x, ok) => '<path d="M' + (x + 20) + ' 60 V190 H' + (x + 160) + ' V60" fill="none" stroke="' + C.ink + '" stroke-width="3"/>' + (ok ? rect(x + 20, 110, 140, 80, C.tealL, { r: 0, c: 'none', w: 0 }) : '') + '<ellipse cx="' + (x + 110) + '" cy="184" rx="20" ry="5" fill="' + C.sun + '" stroke="' + C.ink + '" stroke-width="1.8"/>' + '<ellipse cx="' + (x - 14) + '" cy="40" rx="16" ry="10" fill="#fff" stroke="' + C.ink + '" stroke-width="2"/><circle cx="' + (x - 14) + '" cy="40" r="4" fill="' + C.ink + '"/>';
    return svg('0 0 480 230', 'Cốc không có nước và cốc có nước',
      cup(44, 0) + line(10, 190, 250, 190, C.ink, 2) + line(34, 46, 110, 190, C.red, 2.4, 1) + t(80, 130, '✕', { s: 22, b: 1, c: C.red }) + t(124, 222, 'a)  Không có nước', { a: 'middle', s: 12, b: 1 }) +
      cup(274, 1) + line(260, 190, 470, 190, C.ink, 2) + arrow(374, 184, 330, 110, C.red, 2.4) + arrow(330, 110, 262, 46, C.red, 2.4) + t(354, 222, 'b)  Có nước', { a: 'middle', s: 12, b: 1 }));
  };
  const khtn5f = () => {
    const I = [240, 140], a = P0(I[0], I[1], 120, -45), b = P0(I[0], I[1], 120, 45), c = P0(I[0], I[1], 120, 180 - 32);
    return svg('0 0 480 280', 'Mặt nước với ba tia sáng chưa có mũi tên',
      rect(20, 140, 440, 130, C.tealL, { r: 0, c: 'none', w: 0 }) + line(20, 140, 460, 140, C.ink, 2.5) + line(240, 20, 240, 262, C.ink, 1.5, 1) + t(250, 28, 'N', { s: 14, b: 1 }) + t(250, 258, "N′", { s: 14, b: 1 }) +
      line(a[0], a[1], 240, 140, C.red, 3) + line(240, 140, b[0], b[1], C.red, 3) + line(240, 140, c[0], c[1], C.red, 3) + t(a[0] - 10, a[1] - 6, '1', { s: 15, b: 1 }) + t(b[0] + 6, b[1] - 6, '2', { s: 15, b: 1 }) + t(c[0] + 8, c[1] + 6, '3', { s: 15, b: 1 }) +
      bil(36, 70, 'Không khí', 'Air', { s: 13 }) + bil(36, 190, 'Nước', 'Water', { s: 13 }) + t(240, 276, 'Hãy bổ sung mũi tên cho tia 1, 2, 3 / Add arrows to rays 1, 2, 3', { a: 'middle', s: 10.5, c: C.grey }));
  };
  const khtn5g = () => svg('0 0 480 260', 'Thí nghiệm tìm phương của tia khúc xạ bằng bốn đinh ghim',
    rect(20, 20, 440, 220, '#fff7e0', { r: 6 }) + path('M150 130 A90 90 0 0 0 330 130 Z', C.penL) + line(150, 130, 330, 130, C.ink, 2) + line(240, 36, 240, 224, C.ink, 1.2, 1) +
    circ(240, 130, 6, C.red) + t(250, 124, 'O', { s: 14, b: 1 }) + circ(240, 56, 6, C.teal) + t(250, 60, 'A', { s: 14, b: 1 }) + circ(180, 56, 6, C.teal) + t(160, 52, 'B', { s: 14, b: 1 }) + circ(296, 204, 6, C.teal) + t(306, 212, 'C', { s: 14, b: 1 }) +
    line(180, 56, 240, 130, C.red, 2.4) + line(240, 130, 296, 204, C.red, 2.4) + '<ellipse cx="320" cy="238" rx="16" ry="9" fill="#fff" stroke="' + C.ink + '" stroke-width="2"/><circle cx="320" cy="238" r="4" fill="' + C.ink + '"/>' + line(296, 204, 320, 232, C.grey, 1.6, 1) +
    bil(30, 104, 'Tia tới BO', 'Incident ray BO', { s: 11 }) + bil(330, 160, 'Tia khúc xạ OC', 'Refracted ray OC', { s: 11 }) + t(20, 14, 'Tấm xốp có gắn bảng chia độ / Foam board with a protractor', { s: 10.5, c: C.grey }));
  const khtn6a = () => svg('0 0 480 250', 'Bố trí thí nghiệm phản xạ toàn phần: chùm sáng đi từ bản bán trụ ra không khí',
    circ(330, 130, 100, '#fff', { c: C.grey, w: 1.5 }) + path('M242 130 A88 88 0 0 1 418 130 Z', C.penL) + line(230, 130, 430, 130, C.ink, 1.6) + line(330, 40, 330, 220, C.ink, 1.2, 1) +
    rect(20, 80, 100, 70, C.greyL, { r: 6 }) + circ(52, 115, 14, C.sun) + rect(110, 98, 14, 34, C.grey, { r: 2 }) +
    '<polyline points="124,115 280,60 330,130" fill="none" stroke="' + C.red + '" stroke-width="3"/>' + line(330, 130, 392, 78, C.red, 2.4) + line(330, 130, 420, 130, C.red, 1.2, 1) + t(338, 150, 'I', { s: 13, b: 1 }) +
    bil(330, 12, 'Ánh sáng đi từ thuỷ tinh ra không khí', 'Light from glass into air', { a: 'middle', s: 11 }) + bil(60, 196, 'Đèn có khe', 'Lamp with slit', { a: 'middle', s: 11 }));
  const khtn6b = () => svg('0 0 480 240', 'Ảo ảnh trên đường nhựa nóng: dường như có lớp nước phản chiếu',
    rect(0, 0, 480, 118, '#cfe0ff', { r: 0, c: 'none', w: 0 }) + rect(0, 118, 480, 122, '#666', { r: 0, c: 'none', w: 0 }) + '<polygon points="170,118 310,118 480,240 0,240" fill="#444"/>' + line(240, 122, 240, 240, '#fff', 2.5, 1) +
    '<ellipse cx="240" cy="132" rx="150" ry="8" fill="#9bc0ff" opacity=".75"/><ellipse cx="240" cy="150" rx="90" ry="5" fill="#b7d3ff" opacity=".6"/>' + rect(214, 96, 52, 22, C.red, { r: 4, w: 1.5 }) + rect(220, 100, 40, 8, '#fff', { r: 2, w: 0 }) +
    '<g opacity=".4"><rect x="214" y="120" width="52" height="22" rx="4" fill="' + C.red + '"/></g>' + bil(240, 28, 'Phía xa có vẻ như có vũng nước', 'Far ahead it looks like a puddle', { a: 'middle', s: 13 }) + bil(110, 200, 'Mặt đường nóng', 'Hot road', { a: 'middle', s: 12, c: '#fff' }));
  const khtn6c = () => {
    const hue = ['#e8f0ff', '#f1f0ff', '#fff2dc', '#ffe4c8', '#ffd0b0'];
    let s = ''; hue.forEach((h, k) => { s += rect(20, k * 44 + 10, 440, 44, h, { r: 0, c: C.grey, w: 1 }) + t(34, k * 44 + 38, 'n' + '₁₂₃₄₅'[k], { s: 15, b: 1 }); });
    return svg('0 0 480 270', 'Đường đi của tia sáng qua các lớp không khí trên đường nhựa',
      s + '<path d="M70 20 Q 140 170 240 218 Q 340 170 420 40" fill="none" stroke="' + C.red + '" stroke-width="3.2"/>' + arrow(414, 52, 421, 38, C.red, 3) + circ(70, 20, 6, C.pen) + t(82, 26, 'A', { s: 14, b: 1 }) + circ(421, 38, 6, C.teal) + t(432, 44, 'O', { s: 14, b: 1 }) +
      bil(240, 246, 'Phản xạ toàn phần ở lớp sát mặt đường', 'Total internal reflection next to the road', { a: 'middle', s: 11, c: C.red }) + line(20, 232, 460, 232, C.ink, 3));
  };
  const khtn6d = () => svg('0 0 480 240', 'Đường truyền của chùm tia sáng trong sợi quang',
    rect(40, 64, 400, 112, C.greyL, { r: 6 }) + rect(40, 92, 400, 56, C.penL, { r: 0 }) + t(436, 84, 'Vỏ n₂', { a: 'end', s: 12, b: 1 }) + t(436, 168, 'Vỏ n₂', { a: 'end', s: 12, b: 1 }) + t(436, 124, 'Lõi n₁ > n₂', { a: 'end', s: 12, b: 1, c: C.pen }) +
    '<polyline points="40,128 110,92 190,148 270,92 350,148 430,100" fill="none" stroke="' + C.red + '" stroke-width="3"/>' + arrow(40, 150, 40, 128, C.red, 0.1) + line(0, 170, 40, 128, C.red, 3) + t(2, 160, 'S', { s: 14, b: 1 }) + t(22, 124, 'I', { s: 14, b: 1 }) +
    t(100, 86, 'I₁', { s: 12, b: 1 }) + t(186, 168, 'I₂', { s: 12, b: 1 }) + t(266, 86, 'I₃', { s: 12, b: 1 }) + line(40, 56, 40, 184, C.ink, 1.6, 1) + t(46, 54, 'M', { s: 12, b: 1 }) + t(46, 198, 'N', { s: 12, b: 1 }) +
    bil(240, 214, 'Phản xạ toàn phần lặp lại nhiều lần', 'Total internal reflection repeated many times', { a: 'middle', s: 11, c: C.red }));

  /* ---------------------------------------------------------------- ĐỢT 3: BÀI 7 – 9 */
  const SPEC = [['đỏ', 'red', '#e0393e'], ['da cam', 'orange', '#f08a24'], ['vàng', 'yellow', '#f2c500'], ['lục', 'green', '#2fbf7a'], ['lam', 'blue', '#2aa7e0'], ['chàm', 'indigo', '#3b4fd0'], ['tím', 'violet', '#7b3fe4']];
  const lensPath = (cx, cy, h, conv, w) => { w = w || 14; return conv ? 'M' + cx + ' ' + (cy - h) + ' Q ' + (cx + w * 2) + ' ' + cy + ' ' + cx + ' ' + (cy + h) + ' Q ' + (cx - w * 2) + ' ' + cy + ' ' + cx + ' ' + (cy - h) + ' Z' : 'M' + (cx - w) + ' ' + (cy - h) + ' L ' + (cx + w) + ' ' + (cy - h) + ' Q ' + cx + ' ' + cy + ' ' + (cx + w) + ' ' + (cy + h) + ' L ' + (cx - w) + ' ' + (cy + h) + ' Q ' + cx + ' ' + cy + ' ' + (cx - w) + ' ' + (cy - h) + ' Z'; };
  const lensG = (cx, cy, h, conv, w) => '<path d="' + lensPath(cx, cy, h, conv, w) + '" fill="' + C.penL + '" stroke="' + C.pen + '" stroke-width="2.4" opacity=".9"/>';
  const dot = (x, y, s, c) => circ(x, y, 3.4, c || C.ink, { w: 0 }) + (s ? t(x, y + 17, s, { a: 'middle', s: 12, b: 1 }) : '');
  const dashed = (x1, y1, x2, y2, c, w) => line(x1, y1, x2, y2, c, w || 2, 1);
  const prismTri = (A, B, Cc, fill) => poly(A + ' ' + B + ' ' + Cc, fill || C.penL, { c: C.pen, w: 2.4 });

  const khtn7a = () => svg('0 0 480 230', 'Cấu tạo của lăng kính và mặt phẳng tiết diện chính',
    t(110, 20, 'Lăng kính (khối lăng trụ tam giác)', { a: 'middle', s: 11, b: 1 }) +
    poly('50,170 120,170 160,150 90,150', C.sunL, { c: C.pen, w: 2 }) + poly('50,170 90,70 160,60 160,150 90,150', '#cfdcff', { c: C.pen, w: 2 }) + poly('90,150 160,150 160,60 90,70', C.penL, { c: C.pen, w: 2 }) +
    '<polygon points="50,170 120,170 90,150" fill="none"/>' + poly('50,170 120,170 160,150 90,150', C.sunL, { c: C.pen, w: 2 }) + poly('50,170 120,170 90,70', '#bfd0ff', { c: C.pen, w: 2 }) + poly('120,170 160,150 130,60 90,70', C.penL, { c: C.pen, w: 2 }) +
    bil(40, 198, 'Mặt bên', 'Lateral face', { s: 10 }) + bil(150, 198, 'Đáy', 'Base', { s: 10 }) + t(100, 60, 'Cạnh', { a: 'middle', s: 11, b: 1, c: C.red }) +
    t(350, 20, 'Mặt phẳng tiết diện chính', { a: 'middle', s: 11, b: 1 }) +
    poly('270,180 430,180 350,52', C.penL, { c: C.pen, w: 2.6 }) + arc(350, 52, 30, 238, 302, C.red, 3) + t(350, 86, 'A', { a: 'middle', s: 16, b: 1, c: C.red }) + t(350, 44, 'A', { a: 'middle', s: 12, b: 1 }) + t(262, 196, 'B', { s: 12, b: 1 }) + t(436, 196, 'C', { s: 12, b: 1 }) +
    bil(300, 120, 'Mặt bên', 'Lateral face', { a: 'end', s: 10 }) + bil(350, 214, 'Đáy BC', 'Base BC', { a: 'middle', s: 10 }) + bil(470, 120, 'Góc chiết quang A', 'Refracting angle A', { a: 'end', s: 10, c: C.red }));

  const khtn7b = () => svg('0 0 480 230', 'Bố trí thí nghiệm tán sắc ánh sáng trắng qua lăng kính',
    rect(14, 92, 56, 44, C.sunL) + circ(42, 114, 12, C.sun) + rect(70, 82, 10, 64, C.greyL, { r: 2 }) + '<rect x="70" y="110" width="10" height="7" fill="#fff"/>' +
    line(80, 114, 200, 114, '#fff', 5) + line(80, 114, 200, 114, C.grey, 1.4) + poly('200,150 250,150 225,66', C.penL, { c: C.pen, w: 2.4 }) +
    SPEC.map((s, i) => line(236, 100, 400, 124 + (6 - i) * -6 + 36 + 0 * i - (i - 3) * 0, s[2], 2.4).replace('y2="' + (124 + (6 - i) * -6 + 36) + '"', 'y2="' + (118 + i * 9) + '"')).join('') +
    rect(396, 80, 12, 110, '#fff', { r: 3, w: 2 }) + SPEC.map((s, i) => '<rect x="397" y="' + (112 + i * 8) + '" width="10" height="8" fill="' + s[2] + '"/>').join('') +
    bil(42, 160, 'Đèn trắng + khe', 'White lamp + slit', { a: 'middle', s: 10 }) + bil(225, 176, 'Lăng kính', 'Prism', { a: 'middle', s: 11 }) + bil(402, 206, 'Màn', 'Screen', { a: 'middle', s: 11 }) + bil(150, 58, 'Chùm sáng trắng hẹp', 'Narrow white beam', { a: 'middle', s: 10 }) +
    rect(110, 190, 54, 14, C.redL, { r: 4, w: 1.4 }) + rect(168, 190, 54, 14, C.violetL, { r: 4, w: 1.4 }) + t(137, 201, 'lọc đỏ', { a: 'middle', s: 9, b: 1 }) + t(195, 201, 'lọc tím', { a: 'middle', s: 9, b: 1 }));

  const khtn7c = () => {
    let s = poly('90,140 160,140 125,70', C.penL, { c: C.pen, w: 2.4 }) + line(10, 120, 112, 100, '#e9ecf5', 5) + line(10, 120, 112, 100, C.grey, 1.4);
    SPEC.forEach((c, i) => { s += line(138, 100, 330, 76 + i * 22, c[2], 3); s += rect(340, 62 + i * 22, 60, 20, c[2], { r: 2, w: 0 }) + t(408, 77 + i * 22, c[0] + ' / ' + c[1], { s: 11, b: 1 }); });
    return svg('0 0 480 230', 'Quang phổ của ánh sáng trắng: bảy màu', s + bil(60, 190, 'Ánh sáng trắng', 'White light', { a: 'middle', s: 10 }) + bil(125, 164, 'Lăng kính', 'Prism', { a: 'middle', s: 10 }) + bil(190, 214, 'Màu đỏ lệch ít nhất, màu tím lệch nhiều nhất', 'Red is deviated least, violet most', { a: 'middle', s: 10, c: C.red }));
  };

  const khtn7d = () => {
    const rad = Math.PI / 180, A = 60, n = 1.5, i1 = 50, r1 = Math.asin(Math.sin(i1 * rad) / n) / rad, r2 = A - r1, i2 = Math.asin(n * Math.sin(r2 * rad)) / rad, D = i1 + i2 - A;
    const ax = 240, ay = 40, L = 160, bx = ax - L * Math.sin(30 * rad), by = ay + L * Math.cos(30 * rad), cx = ax + L * Math.sin(30 * rad);
    const I = [ax + (bx - ax) * 0.5, ay + (by - ay) * 0.5], nAB = [-Math.cos(30 * rad), -Math.sin(30 * rad)], nAC = [Math.cos(30 * rad), -Math.sin(30 * rad)];
    const rot = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
    const inn = [-nAB[0], -nAB[1]];
    const sgn = 1;
    const dir1 = rot(inn, -i1 * rad * sgn), dirR1 = rot(inn, -r1 * rad * sgn);
    // tìm J: giao của tia IJ với AC
    const tt = ((ax - I[0]) * nAC[0] + (ay - I[1]) * nAC[1]) / (dirR1[0] * nAC[0] + dirR1[1] * nAC[1]), J = [I[0] + dirR1[0] * tt, I[1] + dirR1[1] * tt];
    const ang = (v) => Math.atan2(v[1], v[0]), d2 = ang(dirR1) - ang(nAC), outAng = ang(nAC) + Math.sign(d2 || 1) * i2 * rad * (Math.abs(d2) > 1e-9 ? 1 : 1);
    const dirO = [Math.cos(outAng), Math.sin(outAng)], R = [J[0] + dirO[0] * 120, J[1] + dirO[1] * 120], S0 = [I[0] - dir1[0] * 110, I[1] - dir1[1] * 110];
    const nl = (P, nv, len, col) => dashed(P[0] - nv[0] * len, P[1] - nv[1] * len, P[0] + nv[0] * len, P[1] + nv[1] * len, col, 1.4);
    const Dpt = [J[0] + dir1[0] * 0, J[1]];
    return svg('0 0 480 260', 'Đường truyền của tia sáng đơn sắc qua lăng kính',
      poly(ax + ',' + ay + ' ' + bx + ',' + by + ' ' + cx + ',' + by, C.penL, { c: C.pen, w: 2.6 }) + nl(I, nAB, 42, C.grey) + nl(J, nAC, 42, C.grey) +
      arrow(S0[0], S0[1], I[0], I[1], C.red, 2.6) + line(I[0], I[1], J[0], J[1], C.red, 2.6) + arrow(J[0], J[1], R[0], R[1], C.red, 2.6) +
      dashed(I[0], I[1], I[0] + dir1[0] * 150, I[1] + dir1[1] * 150, C.grey, 1.4) + dashed(J[0], J[1], J[0] - dirO[0] * 90, J[1] - dirO[1] * 90, C.grey, 1.4) +
      t(S0[0] - 6, S0[1] + 4, 'S', { a: 'end', s: 14, b: 1 }) + t(I[0] - 16, I[1] - 6, 'I', { s: 14, b: 1 }) + t(J[0] - 4, J[1] - 10, 'J', { s: 14, b: 1 }) + t(R[0] + 6, R[1] + 4, 'R', { s: 14, b: 1 }) +
      t(ax, ay - 8, 'A', { a: 'middle', s: 13, b: 1 }) + t(bx - 14, by + 14, 'B', { s: 13, b: 1 }) + t(cx + 8, by + 14, 'C', { s: 13, b: 1 }) +
      t(I[0] - 70, I[1] - 20, 'i₁', { s: 13, b: 1, c: C.teal }) + t(I[0] + 12, I[1] + 24, 'r₁', { s: 13, b: 1, c: C.teal }) + t(J[0] - 40, J[1] + 22, 'r₂', { s: 13, b: 1, c: C.teal }) + t(J[0] + 30, J[1] + 36, 'i₂', { s: 13, b: 1, c: C.teal }) +
      bil(470, 100, 'D: góc lệch giữa SI và JR', 'D: angle between SI and JR', { a: 'end', s: 10, c: C.red }) + bil(240, 244, 'n = 1,5; A = 60°; i₁ = 50° ⇒ D ≈ ' + fmt1(D) + '°', 'n = 1.5; A = 60°; i₁ = 50° ⇒ D ≈ ' + fmt1(D) + '°', { a: 'middle', s: 10 }));
  };

  const fmt1 = (v) => (Math.round(v * 10) / 10).toString().replace('.', ',');

  const khtn7e = () => {
    const surf = [['trắng', 'white', '#fff', ['#e0393e', '#2fbf7a', '#3b4fd0']], ['đỏ', 'red', '#e0393e', ['#e0393e']], ['lam', 'blue', '#2a7be0', ['#2a7be0']], ['đen', 'black', '#222', []]];
    let s = '';
    surf.forEach((q, i) => { const x = 20 + i * 115; s += rect(x, 150, 90, 26, q[2], { r: 3, w: 2 }); s += arrow(x + 20, 40, x + 38, 146, '#d9a900', 2.4); (q[3].length ? q[3] : []).forEach((c, k) => { s += arrow(x + 44 + k * 4, 146, x + 72 + k * 6, 70 - 0, c, 2.2); }); s += bil(x + 45, 196, q[0], q[1], { a: 'middle', s: 11 }); s += circ(x + 80, 64, 7, '#fff', { w: 1.5 }) + circ(x + 80, 64, 3, C.ink, { w: 0 }); if (!q[3].length) s += t(x + 45, 114, '✕', { a: 'middle', s: 18, b: 1, c: C.red }); });
    return svg('0 0 480 230', 'Minh hoạ sự nhìn thấy màu sắc của các bề mặt dưới ánh sáng trắng', s + bil(240, 18, 'Ánh sáng trắng chiếu tới; mũi tên màu là ánh sáng phản xạ vào mắt', 'White light comes in; coloured arrows are the light reflected to the eye', { a: 'middle', s: 10 }));
  };

  const khtn7f = () => svg('0 0 480 200', 'Ánh sáng trắng truyền qua tấm lọc màu lục',
    SPEC.map((c, i) => line(30, 60 + i * 12, 190, 60 + i * 12, c[2], 3)).join('') + rect(190, 40, 22, 120, '#bff0cf', { r: 3, w: 2.4, c: C.green }) + line(212, 114, 400, 114, SPEC[3][2], 4) +
    bil(110, 30, 'Ánh sáng trắng', 'White light', { a: 'middle', s: 11 }) + bil(201, 180, 'Tấm lọc lục', 'Green filter', { a: 'middle', s: 11 }) + bil(330, 90, 'Chỉ còn ánh sáng lục', 'Only green light remains', { a: 'middle', s: 11, c: C.green }) +
    SPEC.filter((c, i) => i !== 3).map((c, i) => '<text x="' + (214 + i * 0) + '" y="' + (60 + i * 0) + '" style="font-size:0"></text>').join('') );

  const khtn7g = () => {
    let s = '', cx = 140, cy = 112, r = 78, a0 = -90;
    SPEC.forEach((c, i) => { const a1 = a0 + 360 / 7, p = (a) => [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)]; s += '<path d="M' + cx + ' ' + cy + ' L' + p(a0)[0].toFixed(1) + ' ' + p(a0)[1].toFixed(1) + ' A' + r + ' ' + r + ' 0 0 1 ' + p(a1)[0].toFixed(1) + ' ' + p(a1)[1].toFixed(1) + ' Z" fill="' + c[2] + '" stroke="#fff" stroke-width="1.5"/>'; a0 = a1; });
    s += circ(cx, cy, 5, C.ink, { w: 0 }) + circ(cx - 14, cy - 8, 3, '#fff', { c: C.ink, w: 1 }) + circ(cx + 14, cy - 8, 3, '#fff', { c: C.ink, w: 1 });
    s += path('M126 104 Q 90 40 40 36', 'none', { c: C.ink, w: 1.6 }) + path('M154 104 Q 190 40 240 36', 'none', { c: C.ink, w: 1.6 });
    s += arrow(300, 112, 360, 112, C.pen, 2.6) + circ(420, 112, 44, '#fff', { c: C.grey, w: 2.4 }) + bil(420, 96, 'Quay nhanh', 'Spin fast', { a: 'middle', s: 10 }) + bil(420, 128, '→ trắng', '→ white', { a: 'middle', s: 10, c: C.pen });
    return svg('0 0 480 220', 'Đĩa Newton bảy màu quay nhanh cho màu trắng', s + bil(140, 206, 'Đĩa bảy màu, treo bằng sợi dây', 'A seven-colour disc on a string', { a: 'middle', s: 10 }));
  };

  const khtn7h = () => {
    const cx = 250, cy = 95, r = 76, rad = Math.PI / 180, i = 59.4, n = 1.333, rr = Math.asin(Math.sin(i * rad) / n) / rad, ph = (a) => [cx + r * Math.sin(a * rad), cy - r * Math.cos(a * rad)];
    // tia vào từ trái, nằm ngang, ở độ cao hợp góc i với pháp tuyến: điểm tới P1 trên cung trái-trên
    const P1 = [cx - r * Math.cos(i * rad), cy - r * Math.sin(i * rad)];
    const t1 = i * rad - rr * rad, ang1 = Math.PI - 0;       // hướng tia tới: sang phải
    const dir = [Math.cos(-(i - rr) * rad * -1), Math.sin(-(i - rr) * rad * -1)];
    const Q = (a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    const a1 = Math.atan2(P1[1] - cy, P1[0] - cx), a2 = a1 + Math.PI - 2 * rr * rad, a3 = a2 + Math.PI - 2 * rr * rad, B = Q(a2), E = Q(a3);
    return svg('0 0 480 275', 'Đường truyền ánh sáng qua giọt nước mưa tạo cầu vồng',
      circ(cx, cy, r, 'rgba(120,180,255,.28)', { c: C.pen, w: 2.4 }) + arrow(30, P1[1], P1[0], P1[1], '#d9a900', 3) +
      line(P1[0], P1[1], B[0], B[1], C.red, 2.6) + line(B[0], B[1], E[0], E[1], C.red, 2.6) +
      arrow(E[0], E[1], E[0] + 90 * Math.cos(137.6 * rad), E[1] + 90 * Math.sin(137.6 * rad), C.red, 2.6) + dashed(E[0], E[1], E[0] + 120, E[1], C.grey, 1.4) + t(E[0] + 30, E[1] - 8, '≈ 42°', { s: 11, b: 1, c: C.violet }) +
      t(30, P1[1] - 8, 'Tia Mặt Trời / Sun ray', { s: 10, b: 1 }) + bil(250, 252, 'Khúc xạ → phản xạ toàn phần → khúc xạ + tán sắc', 'Refraction → total reflection → refraction + dispersion', { a: 'middle', s: 10 }) +
      bil(470, 30, 'Mắt nhìn: 40°–42° so với tia Mặt Trời', 'Eye: 40°–42° from the Sun’s rays', { a: 'end', s: 10, c: C.violet }));
  };

  const khtn8a = () => svg('0 0 480 250', 'Thấu kính hội tụ và thấu kính phân kì: hình dạng, kí hiệu và chùm tia song song',
    t(120, 18, 'a) Thấu kính rìa mỏng (hội tụ)', { a: 'middle', s: 11, b: 1 }) + t(360, 18, 'b) Thấu kính rìa dày (phân kì)', { a: 'middle', s: 11, b: 1 }) +
    lensG(120, 110, 60, true) + lensG(360, 110, 60, false) + line(10, 110, 230, 110, C.grey, 1.4, 1) + line(250, 110, 470, 110, C.grey, 1.4, 1) +
    [-36, -18, 18, 36].map((y) => arrow(20, 110 + y, 118, 110 + y, C.red, 2) + line(120, 110 + y, 210, 110, C.red, 2)).join('') + arrow(120, 110, 120, 110, C.red, 0.1) +
    [-36, -18, 18, 36].map((y) => arrow(260, 110 + y, 358, 110 + y, C.red, 2) + line(360, 110 + y, 450, 110 + y * 2.1, C.red, 2)).join('') +
    [-36, -18, 18, 36].map((y) => dashed(360, 110 + y, 318, 110 + y * 0.3 + 0 * y, C.grey, 1.2)).join('') +
    bil(120, 196, 'Chùm ló hội tụ', 'Emergent beam converges', { a: 'middle', s: 11 }) + bil(360, 196, 'Chùm ló phân kì', 'Emergent beam diverges', { a: 'middle', s: 11 }));

  const khtn8b = () => {
    const f = 90, cy = 100, mk = (cx, conv, y0) => lensG(cx, cy, 60, conv) + line(cx - 190, cy, cx + 190, cy, C.ink, 1.6) + dot(cx, cy, 'O') + dot(cx + f, cy, conv ? "F′" : 'F') + dot(cx - f, cy, conv ? 'F' : "F′") + dashed(cx, cy + 40, cx + f, cy + 40, C.teal, 1.6);
    return svg('0 0 480 250', 'Trục chính, quang tâm, tiêu điểm chính và tiêu cự',
      mk(120, true) + [-30, 30].map((y) => arrow(0, cy + y, 118, cy + y, C.red, 2) + line(120, cy + y, 210, cy, C.red, 2)).join('') + t(165, cy + 60, 'f = OF′', { a: 'middle', s: 12, b: 1, c: C.teal }) +
      '' + t(120, 16, 'a) Hội tụ', { a: 'middle', s: 11, b: 1 }) +
      lensG(360, cy, 60, false) + line(250, cy, 470, cy, C.ink, 1.6) + dot(360, cy, 'O') + dot(450, cy, "F′") + dot(270, cy, 'F') + t(360, 16, 'b) Phân kì', { a: 'middle', s: 11, b: 1 }) +
      [-30, 30].map((y) => arrow(262, cy + y, 358, cy + y, C.red, 2) + line(360, cy + y, 440, cy + y * 1.9, C.red, 2) + dashed(360, cy + y, 270, cy, C.red, 1.4)).join('') + t(315, cy + 60, 'f = OF', { a: 'middle', s: 12, b: 1, c: C.teal }) +
      bil(240, 214, 'Trục chính đi qua quang tâm O, vuông góc với thấu kính', 'The principal axis passes through O, perpendicular to the lens', { a: 'middle', s: 10 }));
  };

  const khtn8c = () => {
    const prism = (x, y, up, c) => poly(up ? (x - 16) + ',' + (y + 12) + ' ' + (x + 16) + ',' + (y + 12) + ' ' + x + ',' + (y - 12) : (x - 16) + ',' + (y - 12) + ' ' + (x + 16) + ',' + (y - 12) + ' ' + x + ',' + (y + 12), c || C.penL, { c: C.pen, w: 1.6 });
    let s = t(120, 16, 'Hội tụ: các đáy lăng kính hướng về trục', { a: 'middle', s: 10.5, b: 1 }) + t(360, 16, 'Phân kì: các đáy hướng ra rìa', { a: 'middle', s: 10.5, b: 1 }) + line(10, 112, 230, 112, C.grey, 1.4, 1) + line(250, 112, 470, 112, C.grey, 1.4, 1);
    [-72, -36, 0, 36, 72].forEach((y) => { const mid = y === 0; s += mid ? rect(112, 100, 16, 24, C.penL, { r: 2, w: 1.6 }) : prism(120, 112 + y, y > 0, C.penL).replace(/<polygon/, '<polygon'); });
    [-72, -36, 0, 36, 72].forEach((y) => { const mid = y === 0; s += mid ? rect(352, 100, 16, 24, C.penL, { r: 2, w: 1.6 }) : prism(360, 112 + y, y < 0, C.penL); });
    [-60, -30, 30, 60].forEach((y) => { s += arrow(14, 112 + y, 112, 112 + y, C.red, 2) + line(120, 112 + y, 200, 112 + y * 0.28, C.red, 2); s += arrow(254, 112 + y, 352, 112 + y, C.red, 2) + line(360, 112 + y, 440, 112 + y * 1.7, C.red, 2); });
    return svg('0 0 480 230', 'Mô hình thấu kính gồm nhiều lăng kính nhỏ', s + bil(240, 206, 'Tia càng xa trục càng gặp lăng kính có góc lệch càng lớn', 'The farther a ray from the axis, the larger the deviation', { a: 'middle', s: 10 }));
  };

  const khtn8d = () => {
    const cy = 110, f = 70, cx = 170, S = [50, 56], mk = (c, conv) => lensG(c, cy, 70, conv) + line(c - 150, cy, c + 280, cy, C.ink, 1.4) + dot(c, cy, 'O') + dot(c + f, cy, conv ? "F′" : 'F') + dot(c - f, cy, conv ? 'F' : "F′");
    const dy = cy - S[1], dx = cx - S[0], k = dx * f / (dx - f), ipx = cx + k, ipy = cy + dy * (k / dx);
    let s = mk(cx, true) + circ(S[0], S[1], 5, C.pen) + t(S[0] - 8, S[1] - 8, 'S', { a: 'end', s: 13, b: 1 });
    s += arrow(S[0], S[1], cx, cy, C.red, 2) + line(cx, cy, ipx, ipy, C.red, 2) + line(S[0], S[1], cx, S[1], C.teal, 2) + line(cx, S[1], ipx, ipy, C.teal, 2) + circ(ipx, ipy, 5, C.green) + t(ipx + 8, ipy + 6, "S′", { s: 13, b: 1, c: C.green });
    return svg('0 0 480 230', 'Dựng ảnh S′ của điểm sáng S qua thấu kính hội tụ bằng hai tia đặc biệt', s + bil(236, 30, 'Tia qua O: truyền thẳng', 'Ray through O: straight', { a: 'start', s: 10, c: C.red }) + bil(236, 62, 'Tia song song trục: ló qua F′', 'Ray parallel to axis: through F′', { a: 'start', s: 10, c: C.teal }) + bil(236, 94, 'S′ là giao điểm hai tia ló', 'S′ is where the emergent rays meet', { a: 'start', s: 10, c: C.green }));
  };

  const khtn8e = () => {
    const f = 60, cy = 110, rr = (cx, d, h, conv, ox) => {
      let s = lensG(cx, cy, 78, conv) + line(cx - 128, cy, cx + 128, cy, C.ink, 1.4) + dot(cx, cy, 'O') + dot(cx + f, cy, "F′") + dot(cx - f, cy, 'F');
      const A = [cx - d, cy], B = [cx - d, cy - h]; s += arrow(A[0], A[1], B[0], B[1], C.pen, 3) + t(A[0], A[1] + 16, 'A', { a: 'middle', s: 12, b: 1 }) + t(B[0] - 4, B[1] - 6, 'B', { a: 'end', s: 12, b: 1 });
      const dp = d * f / (d - f), k = -dp / d, hp = k * h, Bp = [cx + dp, cy - hp];
      if (dp > 0) { s += line(B[0], B[1], cx, cy, C.red, 1.8) + line(cx, cy, Bp[0], Bp[1], C.red, 1.8) + line(B[0], B[1], cx, B[1], C.teal, 1.8) + line(cx, B[1], Bp[0], Bp[1], C.teal, 1.8) + arrow(Bp[0], cy, Bp[0], Bp[1], C.green, 3) + t(Bp[0] + 6, Bp[1] + (hp < 0 ? -4 : 12), "B′", { s: 12, b: 1, c: C.green }) + t(Bp[0], cy - 6 * Math.sign(-hp || 1) - 2, "A′", { a: 'middle', s: 12, b: 1, c: C.green }); }
      else { const ex = cx + 120; s += line(B[0], B[1], cx, cy, C.red, 1.8) + line(cx, cy, ex, cy + (cy - Bp[1]) * -1 * 0 + (Bp[1] - cy) * (ex - cx) / (Bp[0] - cx) * -1 * -1 * 1, C.red, 1.8).replace(/.*/, '') + line(B[0], B[1], cx, B[1], C.teal, 1.8); const th = (Bp[1] - cy) / (Bp[0] - cx); s += line(cx, cy, cx + 120, cy + th * 120, C.red, 1.8) + line(cx, B[1], cx + 120, B[1] + (cy - B[1]) / f * -1 * 120 * -1 * 0 + ((cy - B[1]) / f) * 120 * -1 * -1 * 0 + (cy - B[1]) * 120 / f * -1 * -1 * 0, C.teal, 1.8).replace(/.*/, '') + line(cx, B[1], cx + 120, B[1] + (cy - B[1]) / f * 120, C.teal, 1.8) + dashed(cx, cy, Bp[0], Bp[1], C.red, 1.6) + dashed(cx, B[1], Bp[0], Bp[1], C.teal, 1.6) + arrow(Bp[0], cy, Bp[0], Bp[1], C.green, 2.6).replace(/stroke-dasharray="[^"]*"/, '') + t(Bp[0] - 6, Bp[1] - 6, "B′", { a: 'end', s: 12, b: 1, c: C.green }); }
      return s;
    };
    return svg('0 0 480 460', 'Dựng ảnh của vật AB qua thấu kính hội tụ khi d > f và d < f',
      '<g>' + t(8, 16, 'a) d > f: ảnh thật, ngược chiều (nét liền)', { s: 11, b: 1 }) + rr(260, 130, 40, true) + '</g><g transform="translate(0 230)">' + t(8, 16, 'b) d < f: ảnh ảo, cùng chiều, lớn hơn (nét đứt)', { s: 11, b: 1 }) + rr(260, 36, 30, true) + '</g>');
  };

  const khtn8f = () => svg('0 0 480 210', 'Bố trí thí nghiệm tạo ảnh qua thấu kính trên giá quang học',
    rect(20, 150, 440, 12, C.greyL, { r: 3 }) + rect(24, 100, 46, 50, C.sunL) + circ(47, 120, 11, C.sun) + rect(90, 82, 8, 68, C.greyL, { r: 2 }) + path('M92 95 L108 95 M92 95 L92 125 M92 110 L104 110', 'none', { c: C.pen, w: 3 }) +
    lensG(220, 118, 40, true) + rect(216, 150, 8, 8, C.ink) + rect(360, 70, 8, 80, '#fff', { r: 2, w: 2 }) + path('M366 100 L350 100 M366 100 L366 132 M366 114 L354 114', 'none', { c: C.teal, w: 2.6 }) + rect(300, 188, 130, 14, 'none', { w: 0 }) +
    bil(47, 176, '1 Nguồn sáng', '1 Light source', { a: 'middle', s: 9 }) + bil(94, 66, '2 Vật chữ F', '2 F object', { a: 'middle', s: 9 }) + bil(220, 66, '3 Thấu kính', '3 Lens', { a: 'middle', s: 9 }) + bil(364, 54, '4 Màn', '4 Screen', { a: 'middle', s: 9 }) + bil(300, 176, '5 Giá quang học', '5 Optical bench', { a: 'middle', s: 9 }) + bil(430, 176, '6 Nguồn điện', '6 Power supply', { a: 'middle', s: 9 }));

  const khtn9a = () => svg('0 0 480 230', 'Bố trí thí nghiệm đo tiêu cự của thấu kính hội tụ bằng phương pháp đối xứng',
    rect(20, 170, 440, 12, C.greyL, { r: 3 }) + Array.from({ length: 23 }, (_, i) => line(30 + i * 19, 182, 30 + i * 19, i % 5 ? 188 : 194, C.ink, 1)).join('') +
    rect(24, 118, 40, 50, C.sunL) + circ(44, 138, 10, C.sun) + rect(80, 100, 8, 70, C.greyL, { r: 2 }) + path('M82 112 L98 112 M82 112 L82 142 M82 127 L94 127', 'none', { c: C.pen, w: 3 }) +
    lensG(240, 136, 44, true) + rect(360, 86, 8, 84, '#fff', { r: 2, w: 2 }) + path('M366 118 L350 118 M366 118 L366 150 M366 134 L354 134', 'none', { c: C.teal, w: 2.6 }) +
    line(84, 70, 240, 70, C.ink, 1.4).replace(/.*/, '') + arrow(84, 80, 238, 80, C.red, 1.8) + arrow(238, 80, 84, 80, C.red, 1.8) + t(162, 74, 'd', { a: 'middle', s: 13, b: 1, c: C.red }) + arrow(242, 80, 362, 80, C.teal, 1.8) + arrow(362, 80, 242, 80, C.teal, 1.8) + t(302, 74, "d′", { a: 'middle', s: 13, b: 1, c: C.teal }) +
    bil(240, 214, 'Đặt d = d′ = 2f: ảnh rõ nét, bằng vật, ngược chiều', 'Place d = d′ = 2f: a sharp image, same size, inverted', { a: 'middle', s: 10 }));

  const khtn9b = () => {
    const y = 60, mk = (x, lx, label) => rect(x, y + 24, 6, 14, 'none', { w: 0 });
    let s = '';
    [['Vị trí 1 / Position 1', 150, 0], ['Vị trí 2 / Position 2', 330, 110]].forEach((q) => { const oy = q[2]; s += line(20, 40 + oy, 460, 40 + oy, C.ink, 1.4, 1) + path('M40 ' + (40 + oy) + ' l0 -22', 'none', { c: C.pen, w: 3 }) + path('M440 ' + (40 + oy) + ' l0 22', 'none', { c: C.teal, w: 3 }) + lensG(q[1], 40 + oy, 34, true, 10) + t(40, 66 + oy, 'Vật', { a: 'middle', s: 10 }) + t(440, 66 + oy, 'Màn', { a: 'middle', s: 10 }) + t(q[1], 90 + oy, q[0], { a: 'middle', s: 10, b: 1 }); });
    s += arrow(40, 98, 440, 98, C.red, 1.6) + arrow(440, 98, 40, 98, C.red, 1.6) + t(240, 94, 'L', { a: 'middle', s: 13, b: 1, c: C.red }) + arrow(150, 138, 330, 138, C.violet, 1.6) + arrow(330, 138, 150, 138, C.violet, 1.6) + t(240, 134, 'l', { a: 'middle', s: 13, b: 1, c: C.violet });
    return svg('0 0 480 240', 'Phương pháp Bessel: hai vị trí của thấu kính cho ảnh rõ nét trên màn', s + bil(240, 216, 'f = (L² − l²) / (4L), điều kiện L > 4f', 'f = (L² − l²) / (4L), requires L > 4f', { a: 'middle', s: 12, c: C.red }));
  };

  Object.assign(T.art, { khtn7a, khtn7b, khtn7c, khtn7d, khtn7e, khtn7f, khtn7g, khtn7h, khtn8a, khtn8b, khtn8c, khtn8d, khtn8e, khtn8f, khtn9a, khtn9b });

  Object.assign(T.art, { khtn4a, khtn4b, khtn4c, khtn4d, khtn5a, khtn5b, khtn5c, khtn5d, khtn5e, khtn5f, khtn5g, khtn6a, khtn6b, khtn6c, khtn6d });

  /* ============ Đợt 4: Bài 10 (kính lúp), Bài 11 (điện trở), Bài 12 (mạch nối tiếp/song song) ============ */
  const wr = (pts) => '<polyline points="' + pts + '" fill="none" stroke="' + C.ink + '" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>';
  const symRes = (x, y, lab) => rect(x - 22, y - 8, 44, 16, '#fff', { r: 2, w: 2 }) + (lab ? t(x, y - 14, lab, { a: 'middle', s: 12, b: 1 }) : '');
  const symLamp = (x, y, lab) => circ(x, y, 14, C.sunL) + line(x - 9, y - 9, x + 9, y + 9, C.ink, 1.6) + line(x + 9, y - 9, x - 9, y + 9, C.ink, 1.6) + (lab ? t(x, y - 20, lab, { a: 'middle', s: 12, b: 1 }) : '');
  const symBatt = (x, y, lab) => rect(x - 12, y - 18, 24, 36, '#fff', { r: 0, w: 0 }) + line(x - 5, y - 16, x - 5, y + 16, C.ink, 3.4) + line(x + 6, y - 9, x + 6, y + 9, C.ink, 3.4) + t(x - 14, y - 8, '+', { a: 'end', s: 13, b: 1, c: C.red }) + t(x + 15, y - 8, '−', { s: 13, b: 1 }) + (lab ? t(x, y + 32, lab, { a: 'middle', s: 11, b: 1 }) : '');
  const symSw = (x, y, lab) => rect(x - 22, y - 12, 44, 24, '#fff', { r: 0, w: 0 }) + circ(x - 16, y, 3.2, C.ink, { w: 0 }) + circ(x + 16, y, 3.2, C.ink, { w: 0 }) + line(x - 16, y, x + 12, y - 15, C.ink, 2.4) + (lab ? t(x, y - 22, lab, { a: 'middle', s: 12, b: 1 }) : '');
  const symMeter = (x, y, ch, lab) => circ(x, y, 14, '#fff', { w: 2.2 }) + t(x, y + 5, ch, { a: 'middle', s: 14, b: 1, c: C.pen }) + (lab ? t(x, y - 20, lab, { a: 'middle', s: 12, b: 1 }) : '');
  const symRheo = (x, y, lab) => rect(x - 28, y - 8, 56, 16, '#fff', { r: 2, w: 2 }) + arrow(x - 10, y - 30, x + 12, y - 9, C.red, 2) + (lab ? t(x, y + 24, lab, { a: 'middle', s: 12, b: 1 }) : '');
  const nodeDot = (x, y) => circ(x, y, 3.6, C.ink, { w: 0 });

  const khtn11a = () => svg('0 0 480 210', 'Sơ đồ mạch điện: nguồn 12 V, công tắc, bóng đèn 2,5 V và điện trở R',
    wr('60,50 420,50 420,160 60,160 60,50') + symBatt(60, 105, '12 V') + symSw(150, 50, 'K') + symLamp(260, 50, 'Đ 2,5 V') + symRes(380, 50, 'R₁') +
    t(240, 195, 'Hình 11.1: thay lần lượt R₁, R₂, R₃ / replace R₁ by R₂, R₃', { a: 'middle', s: 11, b: 1, c: C.teal }));
  const khtn11b = () => svg('0 0 480 240', 'Sơ đồ mạch điện tìm hiểu sự phụ thuộc của cường độ dòng điện vào hiệu điện thế',
    wr('60,50 420,50 420,150 60,150 60,50') + wr('320,150 320,205 410,205 410,150') + symBatt(60, 100, '12 V') + symSw(130, 50, 'K') + symRheo(230, 50, 'Rb') + symMeter(330, 50, 'A', 'A') + symRes(370, 150, 'R') + symMeter(365, 205, 'V', 'V') + nodeDot(320, 150) + nodeDot(420, 150) +
    t(150, 126, 'A', { a: 'middle', s: 13, b: 1 }) + t(440, 126, 'B', { a: 'middle', s: 13, b: 1 }));
  const khtn11c = () => { let g = ''; for (let i = 0; i <= 8; i++) g += line(70 + i * 40, 30, 70 + i * 40, 190, C.line || '#cdd5ee', 1) + (i < 5 ? line(70, 190 - i * 40, 390, 190 - i * 40, '#cdd5ee', 1) : ''); return svg('0 0 480 230', 'Hệ toạ độ để vẽ đồ thị I theo U', g + arrow(70, 190, 440, 190, C.ink, 2.2) + arrow(70, 190, 70, 14, C.ink, 2.2) + t(448, 194, 'U (V)', { s: 12, b: 1 }) + t(76, 14, 'I (A)', { s: 12, b: 1 }) + t(64, 205, 'O', { a: 'end', s: 12, b: 1 }) + [1, 2, 3].map((k) => t(70 + k * 120 - 40 + 40, 206, String(k * 4 - 1 + 1), { a: 'middle', s: 10, c: C.grey })).join('') + t(240, 224, 'Chưa có điểm nào: em hãy tự vẽ / Empty: plot your own points', { a: 'middle', s: 11, b: 1, c: C.teal })); };
  const khtn11d = () => svg('0 0 480 200', 'Biểu tượng đơn vị điện trở ôm (Ω) và hệ thức I = U/R — khung thay cho chân dung nhà bác học Ohm',
    rect(150, 20, 180, 150, C.penL, { r: 14, w: 2 }) + t(240, 100, 'Ω', { a: 'middle', s: 78, b: 1, c: C.pen }) + t(240, 128, 'I = U / R', { a: 'middle', s: 18, b: 1 }) + bil(240, 150, 'G. S. Ohm (1789 – 1854)', 'G. S. Ohm (1789 – 1854)', { a: 'middle', s: 10 }));
  const khtn11e = () => svg('0 0 480 220', 'Điện trở bốn vòng màu: vàng, tím, đen, vàng ánh kim',
    line(20, 100, 460, 100, C.ink, 3) + '<rect x="120" y="60" width="240" height="80" rx="34" fill="#e8c99a" stroke="' + C.ink + '" stroke-width="2"/>' +
    [[166, '#f2c500', '1'], [206, '#7b3fe4', '2'], [246, '#1a1a1a', '3'], [310, '#c9a227', '4']].map((b) => '<rect x="' + b[0] + '" y="60" width="20" height="80" fill="' + b[1] + '" stroke="#0005"/>' + line(b[0] + 10, 142, b[0] + 10, 168, C.ink, 1.5) + t(b[0] + 10, 184, 'Vòng ' + b[2], { a: 'middle', s: 11, b: 1 })).join('') +
    t(240, 30, '4 7 ×10⁰ ±5 %  ⇒  47 ± 2,35 Ω', { a: 'middle', s: 14, b: 1, c: C.pen }) + t(240, 208, 'Vòng 1, 2: hai chữ số · Vòng 3: số mũ · Vòng 4: sai số', { a: 'middle', s: 10.5, c: C.grey }));

  const khtn12a = () => svg('0 0 480 230', 'Đoạn mạch nối tiếp: sơ đồ (a) và mạch điện hai bóng đèn nối tiếp (b)',
    t(120, 16, 'a)', { a: 'middle', s: 12, b: 1 }) + wr('30,60 210,60 210,150 30,150 30,60') + symBatt(30, 105) + symRes(90, 60, 'R₁') + symRes(160, 60, 'R₂') + symSw(120, 150, 'K') +
    t(360, 16, 'b)', { a: 'middle', s: 12, b: 1 }) + wr('270,60 450,60 450,150 270,150 270,60') + symBatt(270, 105) + symLamp(330, 60, 'Đ₁') + symLamp(400, 60, 'Đ₂') + symSw(360, 150, 'K') +
    bil(240, 196, 'Một dòng điện duy nhất đi qua lần lượt các linh kiện', 'A single current passes through the parts one after another', { a: 'middle', s: 11, c: C.teal }));
  const khtn12b = () => svg('0 0 480 200', 'Sơ đồ mạch điện thí nghiệm đặc điểm mạch nối tiếp: hai điện trở và hai ampe kế',
    wr('50,50 430,50 430,150 50,150 50,50') + symBatt(50, 100, '12 V') + symSw(110, 50, 'K') + symMeter(175, 50, 'A', 'A₁') + symRes(250, 50, 'R₁') + symRes(330, 50, 'R₂') + symMeter(380, 50, 'A', 'A₂') + t(240, 186, 'Hình 12.2', { a: 'middle', s: 11, b: 1, c: C.teal }));
  const khtn12c = () => svg('0 0 480 240', 'Đoạn mạch song song: sơ đồ (a) và mạch điện hai bóng đèn song song (b)',
    t(120, 16, 'a)', { a: 'middle', s: 12, b: 1 }) + wr('30,50 210,50 210,190 30,190 30,50') + wr('90,50 90,190') + wr('160,50 160,190') + symBatt(30, 120) + symRes(90, 120, 'R₁') + symRes(160, 120, 'R₂') + symSw(60, 50, 'K') + nodeDot(90, 50) + nodeDot(160, 50) + nodeDot(90, 190) + nodeDot(160, 190) +
    t(360, 16, 'b)', { a: 'middle', s: 12, b: 1 }) + wr('270,50 450,50 450,190 270,190 270,50') + wr('330,50 330,190') + wr('400,50 400,190') + symBatt(270, 120) + symLamp(330, 120, 'Đ₁') + symLamp(400, 120, 'Đ₂') + symSw(300, 50, 'K') + nodeDot(330, 50) + nodeDot(400, 50) + nodeDot(330, 190) + nodeDot(400, 190) +
    bil(240, 222, 'Mỗi nhánh có dòng riêng; hiệu điện thế giữa hai nút chung', 'Each branch has its own current; the voltage between the nodes is shared', { a: 'middle', s: 10.5, c: C.teal }));
  const khtn12d = () => svg('0 0 480 250', 'Sơ đồ mạch điện thí nghiệm đặc điểm mạch song song: hai điện trở và ba ampe kế',
    wr('50,50 430,50') + wr('50,50 50,210 430,210 430,50') + wr('250,50 250,210') + wr('360,50 360,210') + symBatt(50, 130, '6 V') + symSw(110, 50, 'K') + symMeter(170, 50, 'A', 'A₁') + symMeter(250, 100, 'A', 'A₂') + symRes(250, 160, 'R₁') + symMeter(360, 100, 'A', 'A₃') + symRes(360, 160, 'R₂') +
    nodeDot(250, 50) + nodeDot(360, 50) + nodeDot(250, 210) + nodeDot(360, 210) + t(236, 44, 'M', { a: 'end', s: 12, b: 1 }) + t(236, 226, 'N', { a: 'end', s: 12, b: 1 }) + t(240, 244, 'Hình 12.4', { a: 'middle', s: 10, b: 1, c: C.teal }));

  /* ---- Bài 10 ---- */
  const khtn10a = () => svg('0 0 480 230', 'Kính lúp có khung và tay cầm, dùng để đọc sách',
    circ(150, 100, 58, C.penL, { c: C.pen, w: 3 }) + circ(150, 100, 46, 'rgba(255,255,255,.7)', { c: C.pen, w: 1.5 }) + path('M196 142 L250 196 L238 208 L184 154 Z', C.sunL) + '<g transform="translate(320,120)"><rect x="-60" y="-60" width="130" height="130" rx="6" fill="#fff" stroke="' + C.ink + '" stroke-width="2"/>' + [-34, -18, -2, 14, 30].map((y, i) => line(-44, y, 50 - i * 10, y, C.grey, 3)).join('') + '</g>' +
    '<text x="150" y="108" text-anchor="middle" font-size="26" font-weight="800" fill="' + C.pen + '">5×</text>' + bil(150, 22, 'Kính lúp: thấu kính hội tụ tiêu cự ngắn', 'Magnifier: a short-focal-length converging lens', { a: 'middle', s: 11 }) + bil(320, 22, 'Dùng kính lúp đọc sách', 'Reading with a magnifier', { a: 'middle', s: 11 }));
  const eye = (x, y) => '<ellipse cx="' + x + '" cy="' + y + '" rx="16" ry="22" fill="#fff" stroke="' + C.ink + '" stroke-width="2"/>' + circ(x - 4, y, 6, C.pen, { w: 0 }) + circ(x - 6, y, 2.4, C.ink, { w: 0 });
  const khtn10b = () => svg('0 0 480 210', 'Góc trông vật α: góc tạo bởi hai tia từ hai đầu vật tới mắt',
    arrow(70, 160, 70, 80, C.teal, 4) + t(52, 84, 'B', { a: 'end', s: 13, b: 1 }) + t(52, 168, 'A', { a: 'end', s: 13, b: 1 }) + eye(400, 120) + line(70, 80, 388, 120, C.red, 1.8) + line(70, 160, 388, 120, C.red, 1.8) + arc(388, 120, 58, 172, 188, C.violet, 2) + t(318, 124, 'α', { a: 'middle', s: 18, b: 1, c: C.violet }) +
    bil(240, 28, 'α càng lớn, ảnh trên võng mạc càng lớn', 'The larger α, the larger the image on the retina', { a: 'middle', s: 11 }) + bil(240, 188, 'Mắt chỉ phân biệt A, B khi α ≥ ε ≈ 1′', 'The eye resolves A and B only if α ≥ ε ≈ 1′', { a: 'middle', s: 10.5, c: C.red }));
  const khtn10c = () => svg('0 0 480 230', 'Kính lúp tạo ảnh ảo A′B′ cùng chiều, lớn hơn vật nên góc trông ảnh β lớn hơn góc trông vật α',
    line(20, 150, 460, 150, C.grey, 1.4, 1) + lensG(190, 150, 62, true) + dot(190, 150, 'O') + dot(130, 150, 'F', C.ink) + dot(250, 150, "F′") + arrow(150, 150, 150, 125, C.teal, 4) + t(150, 172, 'A', { a: 'middle', s: 12, b: 1 }) + t(150, 118, 'B', { a: 'middle', s: 12, b: 1 }) +
    dashed(60, 150, 60, 80, C.violet, 3) + t(60, 172, "A′", { a: 'middle', s: 12, b: 1, c: C.violet }) + t(60, 72, "B′", { a: 'middle', s: 12, b: 1, c: C.violet }) +
    line(190, 125, 330, 125, C.red, 2) + dashed(190, 125, 60, 80, C.red, 1.4) + line(150, 125, 190, 150, C.red, 2) + line(190, 150, 330, 150, C.red, 0) + eye(390, 140) + line(190, 150, 380, 138, C.red, 2) + line(190, 125, 380, 134, C.red, 2) + t(335, 130, 'β', { a: 'middle', s: 17, b: 1, c: C.violet }) +
    bil(240, 28, 'G = β / α', 'G = β / α', { a: 'middle', s: 13 }));
  const khtn10d = () => svg('0 0 480 230', 'Vật đặt trong khoảng từ quang tâm đến tiêu điểm (d < f) cho ảnh ảo cùng chiều, lớn hơn vật',
    line(10, 150, 470, 150, C.grey, 1.4, 1) + lensG(250, 150, 66, true) + dot(250, 150, 'O') + dot(170, 150, "F", C.ink) + dot(330, 150, "F′") + arrow(205, 150, 205, 118, C.teal, 4) + t(205, 170, 'A', { a: 'middle', s: 12, b: 1 }) + t(205, 110, 'B', { a: 'middle', s: 12, b: 1 }) +
    line(205, 118, 250, 118, C.red, 2) + line(250, 118, 350, 150 + 0, C.red, 0) + line(250, 118, 400, 150 - 0 + 22, C.red, 2) + line(205, 118, 250, 150, C.red, 2) + line(250, 150, 400, 168, C.red, 0) +
    dashed(250, 118, 80, 118 - 28 * 0, C.violet, 1.2) + arrow(100, 150, 100, 88, C.violet, 3) + t(100, 172, "A′", { a: 'middle', s: 12, b: 1, c: C.violet }) + t(100, 80, "B′", { a: 'middle', s: 12, b: 1, c: C.violet }) + dashed(250, 118, 100, 88, C.violet, 1.6) + dashed(250, 150, 100, 88, C.violet, 1.6) +
    bil(240, 24, 'd < f: ảnh ảo, cùng chiều, lớn hơn vật', 'd < f: virtual, upright, magnified', { a: 'middle', s: 11 }));
  const khtn10e = () => svg('0 0 480 230', 'Vật đặt tại tiêu điểm (d = f): chùm tia ló song song, ảnh ở vô cực — ngắm chừng ở vô cực',
    line(10, 150, 470, 150, C.grey, 1.4, 1) + lensG(220, 150, 66, true) + dot(220, 150, 'O') + dot(140, 150, 'F ≡ A') + arrow(140, 150, 140, 112, C.teal, 4) + t(140, 104, 'B', { a: 'middle', s: 12, b: 1 }) +
    line(140, 112, 220, 112, C.red, 2) + arrow(220, 112, 440, 150 + 34, C.red, 2) + line(140, 112, 220, 150, C.red, 2) + arrow(220, 150, 440, 150 + 34 * 0 + 34 - 34 + 34 * 0 + 34 - 34 + 34 + 0, C.red, 0.1) + line(220, 150, 440, 184, C.red, 2) +
    eye(450, 172) + bil(300, 28, 'Mắt không phải điều tiết', 'The eye does not have to accommodate', { a: 'middle', s: 11, c: C.teal }) + t(300, 212, 'Hai tia ló song song nhau', { a: 'middle', s: 11, b: 1 }));
  const khtn10f = () => { let g = ''; for (let i = 0; i <= 16; i++) g += line(40 + i * 25, 30, 40 + i * 25, 200, '#cdd5ee', 1); for (let j = 0; j <= 7; j++) g += line(40, 30 + j * 25 - 5 + 5, 440, 30 + j * 25 - 5 + 5, '#cdd5ee', 1);
    return svg('0 0 480 240', 'Giấy kẻ ô với tỉ lệ 1 ô = 1 cm: vật AB cao 2 cm cách thấu kính 7,5 cm và tiêu cự 5 cm', g + line(40, 130, 440, 130, C.ink, 1.8) + lensG(240, 130, 90, true) + arrow(240 - 7.5 * 25 + 0, 130, 240 - 7.5 * 25, 80, C.teal, 4) + t(240 - 7.5 * 25, 150, 'A', { a: 'middle', s: 12, b: 1 }) + t(240 - 7.5 * 25, 72, 'B', { a: 'middle', s: 12, b: 1 }) + dot(240 - 125, 130, '', C.ink) + t(115, 150, 'F', { a: 'middle', s: 12, b: 1 }) + t(365, 150, "F′", { a: 'middle', s: 12, b: 1 }) + t(240, 150, 'O', { a: 'middle', s: 12, b: 1 }) + t(240, 226, '1 ô = 1 cm · h = 2 cm · d = 7,5 cm · f = 5 cm', { a: 'middle', s: 11, b: 1, c: C.teal })); };
  Object.assign(T.art, { khtn10a, khtn10b, khtn10c, khtn10d, khtn10e, khtn10f, khtn11a, khtn11b, khtn11c, khtn11d, khtn11e, khtn12a, khtn12b, khtn12c, khtn12d });

  /* ================= Đợt 5: Bài 13 – 15 ================= */
  const bar = (x, y, w, h, north) => rect(x, y, w / 2, h, north ? C.blue || '#9db4f0' : C.redL, { r: 0 }) + rect(x + w / 2, y, w / 2, h, north ? C.redL : '#9db4f0', { r: 0 });
  const magnetBar = (x, y, w, h, nl) => rect(x, y, w / 2, h, nl ? '#9db4f0' : '#f4a5a8', { r: 0 }) + rect(x + w / 2, y, w / 2, h, nl ? '#f4a5a8' : '#9db4f0', { r: 0 }) + t(x + w / 4, y + h / 2 + 5, nl ? 'S' : 'N', { a: 'middle', s: 14, b: 1 }) + t(x + 3 * w / 4, y + h / 2 + 5, nl ? 'N' : 'S', { a: 'middle', s: 14, b: 1 });
  const coilS = (cx, cy, rx, ry, n) => { let s = ''; for (let k = 0; k < n; k++) s += '<ellipse cx="' + (cx + (k - (n - 1) / 2) * 7) + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="none" stroke="#b8651c" stroke-width="3"/>'; return s; };
  const galv = (x, y, ang) => rect(x - 36, y - 30, 72, 52, '#fff', { r: 6 }) + arc(x, y + 14, 28, 150, 30, C.ink, 1.5) + line(x, y + 14, x + 26 * Math.sin((ang || 0) * Math.PI / 180), y + 14 - 26 * Math.cos((ang || 0) * Math.PI / 180), C.red, 2.4) + circ(x, y + 14, 3, C.ink, { w: 0 }) + t(x, y - 12, 'G', { a: 'middle', s: 13, b: 1, c: C.pen });
  const led = (x, y, col, on, lab) => '<g>' + path('M' + (x - 10) + ' ' + (y - 12) + ' L' + (x + 12) + ' ' + y + ' L' + (x - 10) + ' ' + (y + 12) + ' Z', on ? col : '#fff') + line(x + 12, y - 12, x + 12, y + 12, C.ink, 2.4) + (on ? '<g stroke="' + C.ink + '" stroke-width="1.5"><line x1="' + (x + 2) + '" y1="' + (y - 18) + '" x2="' + (x + 10) + '" y2="' + (y - 28) + '"/><line x1="' + (x + 12) + '" y1="' + (y - 16) + '" x2="' + (x + 22) + '" y2="' + (y - 24) + '"/></g>' : '') + (lab ? t(x, y + 30, lab, { a: 'middle', s: 11, b: 1 }) : '') + '</g>';

  const khtn13a = () => svg('0 0 480 230', 'Hình 13.1: bóng đèn ghi 220 V – 60 W',
    circ(160, 90, 52, C.sunL, { w: 3 }) + path('M138 130 L138 168 L182 168 L182 130', '#d8dde8') + line(138, 148, 182, 148, C.ink, 1.5) + line(138, 158, 182, 158, C.ink, 1.5) + path('M146 100 L150 76 L158 100 L166 76 L174 100', 'none', { c: C.red, w: 2 }) + line(148, 100, 148, 130, C.ink, 1.5) + line(172, 100, 172, 130, C.ink, 1.5) +
    rect(250, 62, 190, 78, '#fff', { r: 8 }) + t(345, 92, '220 V – 60 W', { a: 'middle', s: 24, b: 1, c: C.pen }) + bil(345, 112, 'số vôn – số oát ghi trên bóng', 'volts – watts printed on the bulb', { a: 'middle', s: 11 }) + arrow(250, 100, 214, 100, C.red, 2) +
    bil(240, 200, '220 V: hiệu điện thế định mức · 60 W: công suất định mức', '220 V: rated voltage · 60 W: rated power', { a: 'middle', s: 11 }));

  const khtn13b = () => svg('0 0 480 240', 'Hình 13.2: công tơ điện cơ (a) và công tơ điện tử (b)',
    t(110, 22, 'a) Công tơ cơ / Mechanical meter', { a: 'middle', s: 11, b: 1 }) + rect(30, 34, 160, 170, '#f1f3f8', { r: 10 }) + rect(48, 50, 124, 30, '#1d2230', { r: 4 }) + t(60, 72, '0 2 5 7 3', { s: 20, b: 1, c: '#fff' }) + circ(110, 130, 32, '#fff', { w: 2 }) + path('M80 130 A30 30 0 0 1 110 100 L110 130 Z', '#222') + t(110, 190, 'kWh', { a: 'middle', s: 13, b: 1 }) + t(110, 108 + 0, '', {}) + circ(110, 130, 3, C.ink, { w: 0 }) +
    t(350, 22, 'b) Công tơ điện tử / Electronic meter', { a: 'middle', s: 11, b: 1 }) + rect(260, 34, 160, 170, '#f1f3f8', { r: 10 }) + rect(280, 56, 120, 46, '#c9d8b6', { r: 4, w: 3 }) + t(340, 88, '02573.4', { a: 'middle', s: 20, b: 1, c: '#1c2a12' }) + t(340, 124, 'kWh', { a: 'middle', s: 13, b: 1 }) + circ(290, 160, 6, C.red, { w: 1.5 }) + t(304, 164, 'xung / pulse', { s: 10 }) +
    bil(240, 220, 'Mỗi số đếm ứng với 1 kWh = 3,6·10⁶ J', 'Each count equals 1 kWh = 3.6·10⁶ J', { a: 'middle', s: 11 }));

  const khtn14a = () => svg('0 0 480 250', 'Hình 14.1: nam châm thanh lại gần (a) hoặc ra xa (b) cuộn dây nối điện kế',
    t(120, 18, 'a) Lại gần / Approaching', { a: 'middle', s: 11, b: 1 }) + magnetBar(20, 70, 80, 26, true) + arrow(60, 56, 110, 56, C.teal, 2.5) + coilS(150, 83, 14, 36, 5) + path('M150 119 V170 H90 M150 47 V30 H200 V170 H150', 'none', { w: 1.6 }) + galv(120, 195, 28) +
    t(360, 18, 'b) Ra xa / Receding', { a: 'middle', s: 11, b: 1 }) + magnetBar(390, 70, 80, 26, true) + arrow(430, 56, 380, 56, C.teal, 2.5) + coilS(330, 83, 14, 36, 5) + path('M330 119 V170 H300 M330 47 V30 H280 V170 H330', 'none', { w: 1.6 }) + galv(330, 195, -28) + t(240, 244, 'Kim điện kế lệch hai phía khác nhau · The needle deflects to opposite sides', { a: 'middle', s: 10 }));

  const khtn14b = () => { let f = ''; for (let k = 1; k <= 4; k++) { const o = 22 * k; f += '<path d="M290 100 C ' + (330 + o) + ' ' + (100 - 2 * o) + ', ' + (90 - o) + ' ' + (100 - 2 * o) + ', 130 100" fill="none" stroke="' + C.pen + '" stroke-width="1.4" stroke-dasharray="5 4"/><path d="M290 100 C ' + (330 + o) + ' ' + (100 + 2 * o) + ', ' + (90 - o) + ' ' + (100 + 2 * o) + ', 130 100" fill="none" stroke="' + C.pen + '" stroke-width="1.4" stroke-dasharray="5 4"/>'; }
    return svg('0 0 480 230', 'Hình 14.2: các đường sức từ của nam châm xuyên qua tiết diện cuộn dây',
      f + magnetBar(130, 86, 160, 28, true) + coilS(380, 100, 12, 64, 4) + line(380, 36, 380, 164, C.red, 1.2, 1) + bil(380, 190, 'Tiết diện S của cuộn dây', 'Cross-section S of the coil', { a: 'middle', s: 11 }) + bil(210, 24, 'Số đường sức xuyên qua S thay đổi khi nam châm chuyển động', 'The number of lines through S changes as the magnet moves', { a: 'middle', s: 11 })); };

  const khtn14c = () => svg('0 0 480 250', 'Hình 14.3: nam châm điện, cuộn dây và điện kế',
    rect(60, 80, 130, 34, '#9aa3b2', { r: 3 }) + coilS(125, 97, 14, 30, 7) + coilS(340, 97, 14, 36, 5) + path('M95 127 V190 H40 M155 127 V190 H210', 'none', { w: 1.8 }) + symSw(125, 190, 'K') + symBatt(40, 160, '') + path('M340 133 V170 H300 M340 61 V40 H420 V170 H380', 'none', { w: 1.6 }) + galv(340, 205, 0) +
    bil(125, 36, 'Nam châm điện', 'Electromagnet', { a: 'middle', s: 11 }) + bil(340, 24, 'Cuộn dây kín', 'Closed coil', { a: 'middle', s: 11 }) + bil(240, 244, 'Đóng/mở K: kim lệch thoáng qua', 'Closing/opening K: a brief deflection', { a: 'middle', s: 10 }));

  const khtn14d = () => svg('0 0 480 250', 'Hình 14.4: nam châm quay trước cuộn dây có hai đèn LED mắc ngược cực',
    '<g transform="translate(120,110) rotate(-30)">' + magnetBar(-60, -14, 120, 28, true) + '</g>' + circ(120, 110, 4, C.ink, { w: 0 }) + arc(120, 110, 80, 40, 150, C.teal, 2) + coilS(300, 110, 12, 50, 4) + path('M300 160 V200 H260 M300 60 V40 H400 V200 H350', 'none', { w: 1.6 }) + led(240, 200, '#f4a5a8', true, 'Đ₁') + led(370, 200, '#ffe24a', false, 'Đ₂') +
    bil(240, 24, 'Quay nam châm: hai đèn sáng luân phiên', 'Turn the magnet: the two LEDs light alternately', { a: 'middle', s: 11 }));

  const khtn14e = () => svg('0 0 480 200', 'Hình 14.5: đèn LED chỉ sáng khi dòng điện đi vào từ cực dương',
    led(110, 90, '#f4a5a8', true, 'Đ₁') + led(110, 150, '#fff', false, '') + path('M30 90 H80 M140 90 H190 M30 150 H80 M140 150 H190', 'none', { w: 1.8 }) + t(20, 94, 'A', { a: 'end', s: 13, b: 1 }) + t(200, 94, 'B', { s: 13, b: 1 }) + arrow(40, 75, 70, 75, C.red, 2) +
    bil(330, 90, 'Dòng A → B: Đ₁ sáng', 'Current A → B: D₁ lights', { a: 'middle', s: 11 }) + bil(330, 150, 'Dòng B → A: Đ₂ sáng', 'Current B → A: D₂ lights', { a: 'middle', s: 11 }));

  const khtn14f = () => svg('0 0 480 230', 'Hình 14.6: bóp cuộn dây mềm làm tiết diện thay đổi (nam châm đứng yên)',
    magnetBar(20, 86, 110, 28, true) + coilS(240, 100, 16, 56, 5) + arrow(240, 24, 240, 46, C.red, 3) + arrow(240, 176, 240, 154, C.red, 3) + coilS(380, 100, 10, 26, 5) + t(310, 106, '→', { a: 'middle', s: 22, b: 1 }) + bil(240, 200, 'S giảm ⇒ số đường sức giảm ⇒ kim lệch', 'S decreases ⇒ fewer field lines ⇒ the needle moves', { a: 'middle', s: 11 }));

  const khtn14g = () => { let g = '', d = ''; for (let k = 0; k <= 120; k++) { const tt = k * 30 / 120; d += (k ? 'L' : 'M') + (60 + tt * 13).toFixed(1) + ' ' + (120 - 80 * Math.sin(2 * Math.PI * tt / 20)).toFixed(1); }
    [-1, -0.5, 0, 0.5, 1].forEach((v) => { g += line(55, 120 - 80 * v, 455, 120 - 80 * v, '#cdd5ee', 1) + t(50, 124 - 80 * v, String(v).replace('.', ','), { a: 'end', s: 10 }); });
    [5, 10, 15, 20, 25, 30].forEach((x) => { g += line(60 + x * 13, 30, 60 + x * 13, 210, '#cdd5ee', 1) + t(60 + x * 13, 232, String(x), { a: 'middle', s: 10 }); });
    return svg('0 0 480 250', 'Hình 14.7: đồ thị cường độ dòng điện xoay chiều theo thời gian, chu kì 20 ms',
      g + line(60, 20, 60, 214, C.ink, 2) + line(55, 120, 460, 120, C.ink, 2) + '<path d="' + d + '" fill="none" stroke="' + C.pen + '" stroke-width="3"/>' + t(66, 24, 'i (A)', { s: 11, b: 1 }) + t(440, 244, 't (×10⁻³ s)', { a: 'end', s: 11, b: 1 })); };

  const khtn14h = () => svg('0 0 480 260', 'Hình 14.8: mô hình máy phát điện xoay chiều có vành khuyên và chổi quét',
    rect(40, 50, 40, 110, '#f4a5a8', { r: 0 }) + t(60, 110, 'N', { a: 'middle', s: 16, b: 1 }) + rect(240, 50, 40, 110, '#9db4f0', { r: 0 }) + t(260, 110, 'S', { a: 'middle', s: 16, b: 1 }) + '<ellipse cx="160" cy="105" rx="34" ry="52" fill="none" stroke="#b8651c" stroke-width="4"/>' + line(160, 53, 160, 28, C.ink, 3) + arrow(160, 40, 190, 34, C.teal, 2) +
    circ(140, 188, 8, '#d9b44a') + circ(180, 188, 8, '#d9b44a') + line(140, 156, 140, 180, C.ink, 2) + line(180, 156, 180, 180, C.ink, 2) + rect(133, 198, 14, 10, '#4a4f5c', { r: 1 }) + rect(173, 198, 14, 10, '#4a4f5c', { r: 1 }) + path('M140 208 V240 H340 M180 208 V226 H340', 'none', { w: 1.8 }) + symLamp(370, 233, '') +
    bil(330, 60, 'Khung dây quay trong từ trường', 'The coil rotates in the field', { s: 11 }) + bil(330, 110, 'Vành khuyên và chổi quét', 'Slip rings and brushes', { s: 11 }) + bil(330, 160, 'Dòng điện xoay chiều ra ngoài', 'AC current to the outside', { s: 11 }));

  const khtn14i = () => { let f = ''; for (let k = 0; k < 5; k++) f += arrow(40, 50 + k * 30, 200, 50 + k * 30, C.pen, 1.6);
    return svg('0 0 480 230', 'Hình 14.9: khung dây quay quanh trục trong từ trường đều, số đường sức qua khung thay đổi',
      f + '<ellipse cx="120" cy="110" rx="46" ry="62" fill="rgba(255,226,74,.25)" stroke="#b8651c" stroke-width="4"/>' + line(120, 36, 120, 184, C.ink, 2, 1) + '<ellipse cx="350" cy="110" rx="46" ry="62" fill="rgba(255,226,74,.25)" stroke="#b8651c" stroke-width="4"/><ellipse cx="350" cy="110" rx="10" ry="62" fill="rgba(255,226,74,.5)" stroke="#b8651c" stroke-width="4"/>' + t(120, 206, 'Mặt phẳng vuông góc đường sức: nhiều đường sức nhất', { a: 'middle', s: 9.5 }) + t(350, 206, 'Mặt phẳng song song đường sức: 0 đường sức', { a: 'middle', s: 9.5 }) + t(235, 20, 'Face-on: most lines · Edge-on: none', { a: 'middle', s: 9.5, i: 1 })); };

  const khtn15a = () => svg('0 0 480 220', 'Hình 15.1: máy sấy tóc biến điện năng thành nhiệt',
    path('M90 80 H210 Q250 80 250 110 Q250 140 210 140 H90 Q70 140 70 110 Q70 80 90 80 Z', '#e6e9f2') + path('M130 140 L150 200 H190 L180 140 Z', '#c8cfdd') + '<path d="M252 92 q30 -10 56 0 M252 110 q36 0 66 0 M252 128 q30 10 56 0" fill="none" stroke="' + C.red + '" stroke-width="3"/>' + '<path d="M100 98 q8 -8 16 0 t16 0 t16 0 t16 0" fill="none" stroke="' + C.red + '" stroke-width="2.4"/>' +
    bil(380, 84, 'Dây nung nóng lên', 'The heating wire gets hot', { a: 'middle', s: 11 }) + bil(380, 150, 'Điện năng → nhiệt', 'Electrical energy → heat', { a: 'middle', s: 11 }));
  const khtn15b = () => svg('0 0 480 230', 'Hình 15.2: đèn ống huỳnh quang phát sáng',
    rect(40, 80, 400, 34, '#fff7c8', { r: 17, w: 2.5 }) + rect(28, 84, 14, 26, '#c8cfdd', { r: 2 }) + rect(438, 84, 14, 26, '#c8cfdd', { r: 2 }) + '<g stroke="' + C.sun + '" stroke-width="3"><line x1="120" y1="64" x2="120" y2="48"/><line x1="240" y1="64" x2="240" y2="44"/><line x1="360" y1="64" x2="360" y2="48"/><line x1="120" y1="130" x2="120" y2="146"/><line x1="240" y1="130" x2="240" y2="150"/><line x1="360" y1="130" x2="360" y2="146"/></g>' + bil(240, 190, 'Đèn ống huỳnh quang', 'Fluorescent tube', { a: 'middle', s: 11 }));
  const khtn15c = () => svg('0 0 480 230', 'Hình 15.3: bóng đèn sợi đốt phát sáng',
    circ(240, 100, 54, C.sunL, { w: 3 }) + path('M218 140 L218 176 L262 176 L262 140', '#d8dde8') + path('M226 112 L230 86 L238 112 L246 86 L254 112', 'none', { c: C.red, w: 2.4 }) + line(228, 112, 228, 140, C.ink, 1.6) + line(252, 112, 252, 140, C.ink, 1.6) + '<g stroke="' + C.sun + '" stroke-width="3"><line x1="150" y1="100" x2="170" y2="100"/><line x1="310" y1="100" x2="330" y2="100"/><line x1="170" y1="52" x2="184" y2="64"/><line x1="310" y1="52" x2="296" y2="64"/></g>' + bil(240, 200, 'Bóng đèn sợi đốt: dây tóc nóng sáng', 'Incandescent bulb: the hot filament glows', { a: 'middle', s: 11 }));
  const khtn15d = () => svg('0 0 480 230', 'Hình 15.4: cuộn dây có lõi sắt hút chiếc đinh sắt khi có dòng điện',
    rect(120, 80, 150, 32, '#9aa3b2', { r: 3 }) + coilS(195, 96, 12, 26, 9) + path('M165 124 V170 H110 M225 124 V170 H280', 'none', { w: 1.8 }) + symBatt(110, 170, '') + symSw(230, 170, 'K') + path('M296 96 L330 96 L336 90 L336 102 Z', '#5b6270') + arrow(330, 96, 296, 96, C.red, 2) + bil(400, 70, 'Đinh sắt bị hút', 'The iron nail is attracted', { a: 'middle', s: 11 }) + bil(190, 40, 'Nam châm điện', 'Electromagnet', { a: 'middle', s: 11 }));
  const khtn15e = () => svg('0 0 480 230', 'Hình 15.5: nam châm điện dùng dòng điện xoay chiều tách bột sắt khỏi hỗn hợp',
    rect(60, 50, 120, 24, '#9aa3b2', { r: 3 }) + coilS(120, 62, 10, 20, 7) + '<g fill="#5b6270"><circle cx="90" cy="110" r="3"/><circle cx="104" cy="120" r="3"/><circle cx="130" cy="112" r="3"/><circle cx="150" cy="124" r="3"/></g><g fill="#d9b44a"><circle cx="250" cy="170" r="3"/><circle cx="270" cy="180" r="3"/><circle cx="300" cy="174" r="3"/><circle cx="330" cy="182" r="3"/></g>' + arrow(190, 130, 230, 170, C.teal, 2) + bil(110, 160, 'Bột sắt bị hút', 'Iron powder is lifted', { a: 'middle', s: 11 }) + bil(330, 210, 'Chất khác rơi xuống', 'Other material falls', { a: 'middle', s: 11 }));
  const khtn15f = () => svg('0 0 480 230', 'Hình 15.6: máy khử rung tim phát xung điện ngắn',
    rect(40, 70, 150, 100, '#e6e9f2', { r: 10 }) + rect(56, 86, 80, 40, '#1d2230', { r: 4 }) + '<polyline points="60,110 80,110 88,92 96,126 104,110 130,110" fill="none" stroke="#6bff9a" stroke-width="2"/>' + circ(160, 100, 10, C.red, { w: 1.5 }) + circ(160, 140, 10, C.sun, { w: 1.5 }) + path('M190 100 Q240 80 270 110 M190 140 Q240 170 270 130', 'none', { w: 2.4 }) + '<ellipse cx="320" cy="120" rx="40" ry="50" fill="#fbe0d0" stroke="' + C.ink + '" stroke-width="2"/>' + t(320, 126, '♥', { a: 'middle', s: 26, c: C.red }) + bil(240, 205, 'Xung điện ngắn, có quãng nghỉ', 'Short pulses with rests between', { a: 'middle', s: 11 }));
  const ell = (x, y, rx, ry, f) => '<ellipse cx="' + x + '" cy="' + y + '" rx="' + rx + '" ry="' + ry + '" fill="' + f + '" stroke="#333" stroke-width="1.5"/>';
  /* ---- Đợt 6: Bài 16–17 (Chương V. Năng lượng với cuộc sống) ---- */
  const sunS = (x, y, r) => circ(x, y, r, '#ffd94a', { w: 2 }) + '<g stroke="#ffb000" stroke-width="3">' + [0, 45, 90, 135, 180, 225, 270, 315].map((a) => { const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180); return '<line x1="' + (x + (r + 5) * c).toFixed(1) + '" y1="' + (y + (r + 5) * s).toFixed(1) + '" x2="' + (x + (r + 14) * c).toFixed(1) + '" y2="' + (y + (r + 14) * s).toFixed(1) + '"/>'; }).join('') + '</g>';
  const khtn16a = () => svg('0 0 480 300', 'Hình 16.1: vòng năng lượng giữa các vật sống',
    sunS(60, 50, 22) + arrow(90, 70, 170, 110, C.sun, 3) + t(110, 78, 'quang năng', { s: 10 }) +
    rect(170, 90, 110, 56, '#cfe9c4', { r: 10 }) + bil(225, 114, 'Thực vật (lục lạp)', 'Plant (chloroplast)', { a: 'middle', s: 11 }) + t(225, 138, 'CO₂ + H₂O → đường', { a: 'middle', s: 10 }) +
    arrow(280, 118, 350, 118, C.pen, 3) + t(315, 108, 'hoá năng', { a: 'middle', s: 10 }) +
    rect(350, 90, 110, 56, '#f9d8b0', { r: 10 }) + bil(405, 114, 'Động vật ăn thực vật', 'Animal eating plants', { a: 'middle', s: 11 }) + t(405, 138, 'hô hấp: glucose + O₂', { a: 'middle', s: 10 }) +
    arrow(405, 146, 405, 215, C.red, 3) + bil(405, 235, 'CO₂ + hơi nước + ATP', 'CO₂ + vapour + ATP', { a: 'middle', s: 11 }) +
    path('M350 235 Q225 290 225 150', 'none', { c: C.pen, w: 2.5 }) + bil(240, 275, 'Thực vật hấp thụ lại CO₂ và nước', 'Plants take up CO₂ and water again', { s: 10 }));
  const khtn16b = () => svg('0 0 480 280', 'Hình 16.2: vòng năng lượng theo vòng tuần hoàn của nước',
    rect(0, 0, 480, 280, '#dff0ff', { r: 0 }) + sunS(70, 50, 24) + path('M0 210 H260 Q290 210 305 180 L370 90 L440 210 H480 V280 H0 Z', '#9ccc83') + rect(0, 210, 250, 70, '#4a8fd4', { r: 0 }) +
    '<g fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="4 4"><path d="M50 205 q8 -30 0 -60"/><path d="M110 205 q8 -30 0 -60"/><path d="M170 205 q8 -30 0 -60"/></g>' +
    '<ellipse cx="320" cy="70" rx="50" ry="20" fill="#fff" stroke="#7a8aa6"/><ellipse cx="295" cy="78" rx="28" ry="14" fill="#fff"/><ellipse cx="345" cy="78" rx="28" ry="14" fill="#fff"/>' +
    '<g stroke="#2b6cb0" stroke-width="2"><line x1="300" y1="100" x2="296" y2="125"/><line x1="320" y1="100" x2="316" y2="125"/><line x1="340" y1="100" x2="336" y2="125"/></g>' +
    arrow(250, 70, 190, 110, '#fff', 3) + t(190, 104, 'gió', { s: 11 }) + path('M380 130 Q330 190 260 218', 'none', { c: '#2b6cb0', w: 3 }) + t(350, 200, 'dòng chảy', { s: 11 }) +
    bil(30, 262, 'bốc hơi', 'evaporation', { s: 11 }) + bil(250, 30, 'ngưng tụ thành mây', 'condensation', { s: 11 }) + bil(360, 150, 'mưa', 'rain', { s: 11 }));
  const khtn16c = () => { const st = [['Động vật, thực vật', 'Plants and animals'], ['Trầm tích', 'Sediment'], ['Các lớp trầm tích', 'Sediment layers'], ['Dầu mỏ dâng lên', 'Oil rises'], ['Mỏ dầu ngày nay', 'Oil field today']]; let s = ''; st.forEach((a, i) => { const x = 14 + i * 94; s += rect(x, 70, 84, 90, ['#cfe9c4', '#d8b98a', '#b88a60', '#7e5638', '#3a3a3a'][i], { r: 8 }) + bil(x + 42, 118, a[0], a[1], { a: 'middle', s: 9, c: i > 1 ? '#fff' : null }); if (i < 4) s += arrow(x + 86, 115, x + 94, 115, C.ink, 2); }); return svg('0 0 480 200', 'Hình 16.3: quá trình hình thành dầu mỏ có trên đất liền', s + bil(240, 40, 'từ hàng triệu năm trước → ngày nay', 'from millions of years ago → today', { a: 'middle', s: 12 }) + line(14, 180, 466, 180, C.ink, 2) + arrow(440, 180, 466, 180, C.ink, 2)); };
  const khtn17b = () => svg('0 0 480 240', 'Hình 17.2: ba cách khai thác năng lượng mặt trời',
    rect(0, 0, 480, 240, '#dff0ff', { r: 0 }) + rect(0, 190, 480, 50, '#d9c48a', { r: 0 }) +
    '<g transform="translate(60,170) skewX(-20)"><rect width="90" height="26" fill="#1c3f8a" stroke="#fff"/></g><g transform="translate(70,186) skewX(-20)"><rect width="90" height="22" fill="#2a54aa" stroke="#fff"/></g>' + bil(105, 225, 'a) Pin mặt trời', 'a) PV panels', { a: 'middle', s: 10 }) +
    rect(235, 80, 10, 100, '#888', { r: 0 }) + circ(240, 70, 12, '#ffd94a') + [190, 215, 265, 290].map((x) => '<rect x="' + (x - 10) + '" y="170" width="20" height="8" fill="#9aa3b2" stroke="#555"/><line x1="' + x + '" y1="170" x2="240" y2="76" stroke="#ffb000" stroke-dasharray="4 3"/>').join('') + bil(240, 225, 'b) Nhà máy nhiệt điện mặt trời', 'b) Solar thermal plant', { a: 'middle', s: 10 }) +
    path('M360 120 L400 90 L440 120 V190 H360 Z', '#f0d5b0') + '<g transform="translate(372,98) rotate(-30)"><rect width="46" height="14" fill="#1c3f8a" stroke="#fff"/></g>' + rect(405, 140, 22, 30, '#9fd0f5', { r: 3 }) + bil(400, 225, 'c) Thu nhiệt trên mái nhà', 'c) Rooftop water heater', { a: 'middle', s: 10 }));
  const khtn17c = () => svg('0 0 480 240', 'Hình 17.3: tua-bin gió ngoài khơi',
    rect(0, 0, 480, 240, '#dff0ff', { r: 0 }) + rect(0, 170, 480, 70, '#4a8fd4', { r: 0 }) +
    [90, 240, 390].map((x) => '<rect x="' + (x - 3) + '" y="70" width="6" height="104" fill="#e8ecf4" stroke="#777"/><g transform="translate(' + x + ',70)"><path d="M0 0 L5 -40 L0 -52 L-5 -40Z" fill="#fff" stroke="#777"/><path d="M0 0 L5 -40 L0 -52 L-5 -40Z" fill="#fff" stroke="#777" transform="rotate(120)"/><path d="M0 0 L5 -40 L0 -52 L-5 -40Z" fill="#fff" stroke="#777" transform="rotate(240)"/><circle r="5" fill="#999"/></g>').join('') +
    bil(240, 215, 'Tua-bin gió được lắp đặt ở biển', 'Wind turbines installed at sea', { a: 'middle', s: 11 }) + arrow(10, 40, 70, 40, '#fff', 3) + bil(40, 28, 'gió', 'wind', { a: 'middle', s: 10 }));
  const khtn17d = () => svg('0 0 480 280', 'Hình 17.4: mô hình và công nghệ khai thác năng lượng từ sóng biển',
    rect(0, 0, 480, 280, '#dff0ff', { r: 0 }) + rect(0, 110, 480, 60, '#4a8fd4', { r: 0 }) + rect(0, 170, 480, 20, '#9c7048', { r: 0 }) +
    ell(70, 108, 28, 9, '#e0393e') + rect(66, 40, 8, 64, '#555', { r: 0 }) + rect(100, 30, 36, 24, '#e6e9f2', { r: 2 }) + t(118, 46, 'Máy phát', { a: 'middle', s: 9 }) + bil(70, 20, 'a) Mô hình', 'a) Model', { a: 'middle', s: 10 }) +
    [0, 1, 2].map((k) => '<rect x="' + (190 + k * 34) + '" y="102" width="30" height="10" rx="4" fill="#e0393e" stroke="#333"/>').join('') + bil(222, 90, 'b) Attenuator', 'b) Attenuator', { a: 'middle', s: 10 }) +
    rect(312, 130, 4, 44, '#555', { r: 0 }) + ell(314, 106, 22, 8, '#e0393e') + bil(314, 90, 'c) Point Absorber', 'c) Point Absorber', { a: 'middle', s: 10 }) +
    rect(412, 100, 10, 72, '#e0393e', { r: 0 }) + t(436, 130, '↔', { s: 18 }) + bil(420, 90, 'd) Oscillating water surge', 'd) Oscillating water surge', { a: 'middle', s: 9 }) +
    bil(240, 230, 'sóng biển làm phao chuyển động, chạy máy phát điện', 'waves move the float and drive a generator', { a: 'middle', s: 11 }));
  const khtn17e = () => svg('0 0 480 260', 'Hình 17.5: nhà máy thuỷ điện',
    rect(0, 0, 480, 260, '#dff0ff', { r: 0 }) + rect(0, 220, 480, 40, '#7dac62', { r: 0 }) + rect(20, 100, 180, 124, '#3a82c8', { r: 0 }) + path('M200 60 L236 60 L262 220 L200 220 Z', '#9aa3b2') + rect(262, 190, 70, 30, '#e0e4ef', { r: 2 }) + rect(332, 200, 140, 20, '#3a82c8', { r: 0 }) +
    path('M200 110 L264 196', 'none', { c: '#2b6cb0', w: 6 }) + circ(297, 205, 10, '#fff', { w: 2 }) + bil(110, 160, 'Hồ chứa (thế năng)', 'Reservoir (potential energy)', { a: 'middle', s: 11 }) + bil(300, 180, 'Tua-bin, máy phát', 'Turbine, generator', { a: 'middle', s: 10 }) + bil(240, 40, 'Thế năng → động năng → điện năng', 'Potential → kinetic → electrical', { a: 'middle', s: 12 }));

  /* ---- Đợt 6: Bài 18 (Chương VI. Kim loại) ---- */
  const khtn18a = () => svg('0 0 480 260', 'Hình 18.1: một số ứng dụng của kim loại trong cuộc sống',
    [['a) Vàng làm đồ trang sức', 'a) Gold as jewellery', 60], ['b) Đồng làm lõi dây điện', 'b) Copper as wire core', 180], ['c) Nhôm làm xoong, nồi, chảo', 'c) Aluminium cookware', 300], ['d) Thép trong xây dựng, cầu đường', 'd) Steel in construction, bridges', 420]].map((a, i) => {
      const x = a[2]; let g = '';
      if (i === 0) g = '<circle cx="' + x + '" cy="100" r="26" fill="none" stroke="#e9c43a" stroke-width="9"/><circle cx="' + x + '" cy="68" r="8" fill="#9ed4f2" stroke="#333" stroke-width="1.5"/>';
      else if (i === 1) g = '<rect x="' + (x - 40) + '" y="80" width="80" height="34" rx="17" fill="#555"/><rect x="' + (x - 46) + '" y="90" width="30" height="14" fill="#c9733a"/><rect x="' + (x + 20) + '" y="90" width="30" height="14" fill="#c9733a"/><circle cx="' + (x - 50) + '" cy="97" r="7" fill="#c9733a"/>';
      else if (i === 2) g = '<path d="M' + (x - 38) + ' 90 H' + (x + 38) + ' V120 Q' + (x + 38) + ' 130 ' + (x + 28) + ' 130 H' + (x - 28) + ' Q' + (x - 38) + ' 130 ' + (x - 38) + ' 120 Z" fill="#c9ced6" stroke="#333" stroke-width="2"/><rect x="' + (x + 38) + '" y="96" width="28" height="8" fill="#555"/><ellipse cx="' + x + '" cy="90" rx="38" ry="7" fill="#e6e9f2" stroke="#333" stroke-width="2"/>';
      else g = '<path d="M' + (x - 46) + ' 120 H' + (x + 46) + '" stroke="#555" stroke-width="6"/><path d="M' + (x - 40) + ' 120 Q' + x + ' 60 ' + (x + 40) + ' 120" fill="none" stroke="#8f949c" stroke-width="5"/>' + [-24, -8, 8, 24].map((d) => '<line x1="' + (x + d) + '" y1="' + (120 - (60 - Math.abs(d) * 0.9)) + '" x2="' + (x + d) + '" y2="120" stroke="#8f949c" stroke-width="2"/>').join('');
      return g + bil(x, 170, a[0], a[1], { a: 'middle', s: 10 });
    }).join(''));
  const jar = (x, fill) => '<path d="M' + (x - 50) + ' 40 V170 Q' + (x - 50) + ' 196 ' + (x - 24) + ' 196 H' + (x + 24) + ' Q' + (x + 50) + ' 196 ' + (x + 50) + ' 170 V40" fill="' + fill + '" stroke="#333" stroke-width="3"/>';
  const khtn18b = () => svg('0 0 480 240', 'Hình 18.2: dây sắt hình lò xo cháy sáng trong bình khí oxygen',
    jar(240, '#eaf4ff') + '<path d="M225 20 V110 q-12 6 0 12 q12 6 0 12 q-12 6 0 12 q12 6 0 12" fill="none" stroke="#8f949c" stroke-width="4"/><g stroke="#ffb000" stroke-width="3"><line x1="232" y1="150" x2="214" y2="136"/><line x1="248" y1="150" x2="266" y2="136"/><line x1="240" y1="158" x2="240" y2="176"/></g><path d="M214 150 q-10 -30 6 -50 M262 150 q10 -30 -6 -50" fill="none" stroke="#a5532a" stroke-width="4" opacity=".6"/>' +
    bil(240, 218, '3Fe + 2O₂ —t°→ Fe₃O₄', 'Iron + oxygen → iron oxide', { a: 'middle', s: 12 }));
  const khtn18c = () => svg('0 0 480 240', 'Hình 18.3: natri cháy trong khí chlorine tạo muối ăn',
    jar(240, '#e8f0a8') + '<rect x="236" y="20" width="8" height="70" fill="#999"/><circle cx="240" cy="96" r="10" fill="#e8ecf4" stroke="#555"/><g stroke="#fff" stroke-width="2.4"><line x1="236" y1="180" x2="228" y2="188"/><line x1="246" y1="182" x2="256" y2="190"/><line x1="240" y1="186" x2="240" y2="194"/></g>' + bil(240, 218, '2Na + Cl₂ —t°→ 2NaCl', 'Sodium + chlorine → table salt', { a: 'middle', s: 12 }) + bil(375, 120, 'Sodium chloride (tinh thể trắng)', 'white crystals', { s: 10 }));
  const khtn18d = () => svg('0 0 480 240', 'Hình 18.4: dây sắt cháy trong khí chlorine tạo iron(III) chloride',
    jar(240, '#e0eb8c') + '<path d="M225 20 V110 q-12 6 0 12 q12 6 0 12 q-12 6 0 12" fill="none" stroke="#8f949c" stroke-width="4"/><path d="M214 150 q-10 -30 6 -50 M262 150 q10 -30 -6 -50" fill="none" stroke="#b5532a" stroke-width="5" opacity=".7"/>' + bil(240, 218, '2Fe + 3Cl₂ —t°→ 2FeCl₃', 'Iron + chlorine → iron(III) chloride', { a: 'middle', s: 12 }));
  Object.assign(T.art, { khtn16a, khtn16b, khtn16c, khtn17b, khtn17c, khtn17d, khtn17e, khtn18a, khtn18b, khtn18c, khtn18d });
  /* ---- Đợt 7: Bài 19–21 (Chương VI). Hình tự vẽ, không dùng ảnh sách. ---- */
  const tube = (x, fill) => '<path d="M' + (x - 34) + ' 30 V170 Q' + (x - 34) + ' 200 ' + x + ' 200 Q' + (x + 34) + ' 200 ' + (x + 34) + ' 170 V30" fill="none" stroke="#14224a" stroke-width="3"/>' + (fill ? '<path d="M' + (x - 32) + ' 90 H' + (x + 32) + ' V170 Q' + (x + 32) + ' 198 ' + x + ' 198 Q' + (x - 32) + ' 198 ' + (x - 32) + ' 170 Z" fill="' + fill + '" opacity=".85"/>' : '');
  const khtn19a = () => svg('0 0 480 250', 'Hình 19.1: phản ứng của đinh sắt với dung dịch HCl',
    tube(150, '#e9f2fb') + rect(138, 20, 24, 110, '#8f949c', { r: 4 }) + '<g fill="#fff" stroke="#6a8cb0"><circle cx="128" cy="150" r="4"/><circle cx="146" cy="130" r="3"/><circle cx="166" cy="146" r="4"/><circle cx="152" cy="112" r="3"/></g>' + bil(150, 226, 'Dung dịch HCl', 'HCl solution', { a: 'middle', s: 11 }) +
    t(280, 70, 'Đinh sắt', { s: 12, b: 1 }) + t(280, 86, 'Iron nail', { s: 11, i: 1 }) + line(276, 74, 166, 60, C.ink, 1.5) +
    t(280, 140, 'Fe + 2HCl → FeCl₂ + H₂↑', { s: 12, b: 1, c: C.red }) + t(280, 158, 'Bọt khí H₂ nổi lên / H₂ bubbles rise', { s: 11, i: 1 }));
  const khtn19b = () => svg('0 0 480 250', 'Hình 19.2: phản ứng của kim loại Cu với dung dịch AgNO₃',
    tube(150, '#cfe3f6') + path('M150 28 q-16 10 0 20 q16 10 0 20 q-16 10 0 20 q16 10 0 20 q-16 10 0 20 q16 10 0 20', 'none', { c: '#c9733a', w: 4 }) + '<g fill="#cfd3da" stroke="#8a929c"><circle cx="138" cy="120" r="3"/><circle cx="162" cy="140" r="3"/><circle cx="140" cy="156" r="3"/><circle cx="160" cy="112" r="3"/></g>' + bil(150, 226, 'Dung dịch AgNO₃ 2 %', '2 % AgNO₃ solution', { a: 'middle', s: 11 }) +
    t(260, 70, 'Dây đồng uốn lò xo', { s: 12, b: 1 }) + t(260, 86, 'Copper wire coiled as a spring', { s: 11, i: 1 }) + t(260, 130, 'Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag', { s: 12, b: 1, c: C.red }) + t(260, 148, 'Bạc xám bám vào dây; dung dịch hoá xanh', { s: 11 }) + t(260, 163, 'Grey silver coats the wire; solution turns blue', { s: 11, i: 1 }));
  const khtn20a = () => svg('0 0 480 270', 'Hình 20.1: sơ đồ bể điện phân aluminium oxide nóng chảy',
    path('M80 90 V220 H400 V90', 'none', { w: 4 }) + rect(84, 110, 312, 100, '#f4c58a', { r: 0, w: 0 }) + rect(84, 190, 312, 24, '#d9dde6', { r: 0, w: 0 }) + rect(150, 30, 34, 120, '#2b2f36', { r: 3 }) + rect(300, 30, 34, 120, '#2b2f36', { r: 3 }) + rect(84, 214, 312, 10, '#2b2f36', { r: 0 }) +
    t(167, 22, '+', { a: 'middle', s: 16, b: 1, c: C.red }) + t(317, 22, '+', { a: 'middle', s: 16, b: 1, c: C.red }) + t(240, 244, '−', { a: 'middle', s: 18, b: 1, c: C.pen }) +
    bil(110, 262, 'Cực dương than chì', 'Graphite anode', { s: 10 }) + bil(300, 262, 'Cực âm than chì', 'Graphite cathode', { s: 10 }) + bil(240, 140, 'Al₂O₃ + cryolite nóng chảy', 'Molten Al₂O₃ + cryolite', { a: 'middle', s: 11 }) + bil(240, 205, 'Al nóng chảy', 'Molten Al', { a: 'middle', s: 11 }) +
    t(420, 120, '2Al₂O₃ → 4Al + 3O₂', { s: 10, b: 1, c: C.red, a: 'end' }));
  const khtn20b = () => svg('0 0 480 320', 'Hình 20.2: sơ đồ lò luyện gang (lò cao)',
    path('M170 50 H310 L340 160 L320 260 H160 L140 160 Z', '#e8d9c8') + rect(210, 24, 60, 24, '#8a5a3a', { r: 2 }) + t(240, 17, 'Quặng, than cốc, đá vôi', { a: 'middle', s: 10, b: 1 }) + t(240, 6, 'Ore, coke, limestone', { a: 'middle', s: 9, i: 1 }) +
    arrow(240, 50, 240, 90, C.ink, 2) + path('M310 70 H370 V30', 'none', { c: '#7a7a7a', w: 5 }) + bil(375, 24, 'Khí thải', 'Waste gas', { s: 10 }) + arrow(90, 215, 160, 215, C.red, 3) + bil(20, 200, 'Không khí nóng', 'Hot air', { s: 10 }) +
    rect(160, 258, 160, 14, '#ffb347', { r: 0 }) + rect(160, 244, 160, 14, '#c9ced6', { r: 0, w: 1 }) + bil(335, 252, 'Xỉ nổi lên (cửa tháo xỉ)', 'Slag floats (slag tap)', { s: 10 }) + bil(335, 280, 'Gang lỏng (cửa tháo gang)', 'Molten pig iron (iron tap)', { s: 10 }) +
    t(240, 110, '3CO + Fe₂O₃ → 2Fe + 3CO₂', { a: 'middle', s: 10, b: 1 }) + t(240, 140, 'CaCO₃ → CaO + CO₂;  CaO + SiO₂ → CaSiO₃', { a: 'middle', s: 9 }) + t(240, 200, 'C + O₂ → CO₂;  C + CO₂ → 2CO', { a: 'middle', s: 10, b: 1 }));
  const khtn20c = () => svg('0 0 480 280', 'Hình 20.3: sơ đồ lò thổi luyện thép bằng khí oxygen',
    path('M160 80 H220 L270 130 V220 Q270 250 240 250 H190 Q160 250 160 220 Z', '#e9d2b4') + path('M163 150 H267 V220 Q267 247 240 247 H190 Q163 247 163 220 Z', '#ff9a4a') + line(215, 20, 215, 140, '#6a8cb0', 6, '8 6') + bil(225, 40, 'Thổi khí O₂', 'Blowing O₂', { s: 11 }) +
    arrow(290, 120, 330, 80, '#7a7a7a', 3) + bil(335, 70, 'Khí CO₂, SO₂ thoát ra', 'CO₂, SO₂ escape', { s: 10 }) + rect(165, 140, 100, 10, '#8f949c', { r: 0, w: 1 }) + bil(285, 160, 'Xỉ SiO₂, MnO₂ nổi lên', 'Slag SiO₂, MnO₂ floats', { s: 10 }) + bil(285, 215, 'Gang nóng chảy → thép', 'Molten pig iron → steel', { s: 10 }));
  const khtn21a = () => svg('0 0 480 270', 'Hình 21.1: thí nghiệm hấp phụ chất màu bằng bột than gỗ',
    path('M150 40 H270 L225 120 V150 H195 V120 Z', '#ffffff') + rect(160, 44, 100, 26, '#9b6ac9', { r: 0, w: 0 }) + path('M198 112 L222 112 L226 126 L194 126 Z', '#2b2f36') + ellipse2(210, 138) + path('M170 170 V240 H250 V170', 'none', { w: 3 }) + rect(172, 224, 76, 14, '#f5f0ff', { r: 0, w: 0 }) +
    t(300, 70, 'Nước màu pha loãng', { s: 11, b: 1 }) + t(300, 84, 'Diluted coloured water', { s: 10, i: 1 }) + t(300, 128, 'Lớp bột than gỗ', { s: 11, b: 1 }) + t(300, 142, 'Charcoal powder layer', { s: 10, i: 1 }) + t(300, 224, 'Dung dịch thu được mất màu', { s: 11, b: 1 }) + t(300, 238, 'The filtrate has lost its colour', { s: 10, i: 1 }));
  function ellipse2(x, y) { return '<ellipse cx="' + x + '" cy="' + y + '" rx="12" ry="7" fill="#f1ece0" stroke="#999"/>'; }
  const khtn21b = () => svg('0 0 480 270', 'Hình 21.2: một số ứng dụng của lưu huỳnh',
    circ(240, 135, 44, '#f2e04a', { w: 3 }) + bil(240, 132, 'Lưu huỳnh', 'Sulfur', { a: 'middle', s: 12 }) +
    [['Sản xuất dược phẩm', 'Making medicines', 240, 30], ['Lưu hoá cao su', 'Vulcanising rubber', 70, 135], ['Sản xuất thuốc diệt nấm', 'Making fungicides', 410, 135], ['Sản xuất pháo hoa, diêm', 'Making fireworks, matches', 240, 245]].map((q) => line(240, 135, q[2], q[3] + (q[3] < 100 ? 8 : q[3] > 200 ? -22 : 0), C.grey, 2) + bil(q[2], q[3], q[0], q[1], { a: 'middle', s: 11 })).join(''));

  /* ===== Đợt 8: Chương VII (Bài 22–24). Công thức cấu tạo do engine MolLab dựng (không chép ảnh sách) ===== */
  const mol = (smi, x, y, w, hl) => {
    const ME = window.MolLab && window.MolLab.engine; if (!ME) return '';
    const gg = ME.fromSmiles(smi), sv = ME.drawFull(gg, { maxW: w, unit: 30, hl: hl ? ME.hlAtoms(gg, hl) : null }), vb = /viewBox="0 0 (\d+) (\d+)"/.exec(sv); if (!vb) return '';
    const h = Math.round(w * (+vb[2]) / (+vb[1]));
    return sv.replace('<svg class="mol__svg"', '<svg x="' + x + '" y="' + y + '" style="color:#1f2937" height="' + h + '"').replace(/ width="\d+"/, ' width="' + w + '"');
  };
  const khtn22a = () => svg('0 0 480 250', 'Hình 22.1: một số hợp chất hữu cơ phổ biến',
    [['Butane', 'C₄H₁₀', 'khí hoá lỏng, nhiên liệu', 'liquefied gas fuel', '#cfe3ff'], ['Ethylic alcohol', 'C₂H₅OH', 'đồ uống có cồn', 'alcoholic drinks', '#ffe0b8'], ['Acetic acid', 'CH₃COOH', 'trong giấm', 'in vinegar', '#e4f4c8'], ['Urea', 'CO(NH₂)₂', 'một loại phân đạm', 'a nitrogen fertiliser', '#f1dcf7']].map((q, i) => { const x = 14 + i * 116;
      return rect(x, 20, 104, 92, q[4], { r: 14 }) + (i === 0 ? rect(x + 34, 40, 36, 52, '#8aa9d6', { r: 6 }) + rect(x + 42, 30, 20, 12, '#666', { r: 2 }) : i === 1 ? path('M' + (x + 44) + ' 34 h16 v18 l10 12 v28 h-36 v-28 l10 -12z', '#c9854a') : i === 2 ? path('M' + (x + 42) + ' 36 h20 v14 l10 10 v30 h-40 v-30 l10 -10z', '#e8e0c0') : path('M' + (x + 24) + ' 50 q30 -22 56 0 l-4 40 h-48z', '#d9c7a0')) +
        t(x + 52, 136, q[0], { a: 'middle', s: 12, b: 1 }) + t(x + 52, 152, q[1], { a: 'middle', s: 13, b: 1 }) + t(x + 52, 172, q[2], { a: 'middle', s: 10 }) + t(x + 52, 185, q[3], { a: 'middle', s: 9, i: 1 }); }).join('') +
    t(240, 222, 'Điểm chung: phân tử đều có nguyên tử carbon · Common feature: every molecule contains carbon', { a: 'middle', s: 11, b: 1 }));
  const khtn22b = () => svg('0 0 480 230', 'Công thức phân tử, công thức cấu tạo đầy đủ và thu gọn của C₂H₆ và C₂H₄',
    t(70, 24, 'Công thức phân tử', { a: 'middle', s: 11, b: 1 }) + t(240, 24, 'Cấu tạo đầy đủ', { a: 'middle', s: 11, b: 1 }) + t(410, 24, 'Cấu tạo thu gọn', { a: 'middle', s: 11, b: 1 }) +
    t(70, 90, 'C₂H₆', { a: 'middle', s: 14, b: 1 }) + mol('CC', 160, 40, 160) + t(410, 90, 'CH₃–CH₃', { a: 'middle', s: 14, b: 1 }) + line(10, 128, 470, 128, C.grey, 1) +
    t(70, 190, 'C₂H₄', { a: 'middle', s: 14, b: 1 }) + mol('C=C', 160, 140, 160) + t(410, 190, 'CH₂=CH₂', { a: 'middle', s: 14, b: 1 }));
  const khtn22c = () => { const n = (x, y, k) => circ(x, y, 11, '#d9a58a', { w: 1 }) + t(x, y + 4, k, { a: 'middle', s: 11, b: 1 });
    return svg('0 0 480 300', 'Hình 22.2: công thức phân tử và công thức cấu tạo của một số chất',
      t(40, 60, 'C₄H₁₀', { a: 'middle', s: 14, b: 1 }) + n(40, 96, '1') + mol('CCCC', 90, 20, 170) + n(175, 128, '2') + mol('CC(C)C', 290, 8, 150) + n(365, 140, '3') +
      t(40, 205, 'C₂H₆O', { a: 'middle', s: 14, b: 1 }) + n(40, 240, '4') + mol('CCO', 90, 165, 150) + n(165, 268, '5') + mol('COC', 290, 165, 150) + n(365, 268, '6')); };
  const khtn22d = () => svg('0 0 480 250', 'Hình 22.3: cấu tạo mạch carbon',
    mol('CCCC', 6, 20, 150) + mol('CC(C)C', 170, 10, 140) + mol('C1CCC1', 335, 20, 120) +
    t(80, 150, 'CH₃–CH₂–CH₂–CH₃', { a: 'middle', s: 11, b: 1 }) + t(240, 150, 'CH₃–CH(CH₃)–CH₃', { a: 'middle', s: 11, b: 1 }) + t(395, 150, '(CH₂)₄', { a: 'middle', s: 11, b: 1 }) +
    bil(80, 190, 'a) mạch hở, không phân nhánh', 'a) open chain, unbranched', { a: 'middle', s: 10 }) + bil(240, 190, 'b) mạch hở, phân nhánh', 'b) open chain, branched', { a: 'middle', s: 10 }) + bil(395, 190, 'c) mạch vòng', 'c) ring', { a: 'middle', s: 10 }));
  const khtn23a = () => svg('0 0 480 240', 'Hình 23.1: một số hydrocarbon thông dụng',
    mol('C', 10, 20, 110) + mol('CCC', 150, 40, 170) + mol('C=C', 350, 30, 120) +
    bil(65, 160, 'a) Methane', 'a) Methane', { a: 'middle', s: 11 }) + bil(235, 160, 'b) Propane', 'b) Propane', { a: 'middle', s: 11 }) + bil(410, 160, 'c) Ethylene', 'c) Ethylene', { a: 'middle', s: 11 }) +
    bil(65, 185, 'khí bùn ao', 'pond gas', { a: 'middle', s: 10 }) + bil(235, 185, 'bình gas', 'gas cylinder', { a: 'middle', s: 10 }) + bil(410, 185, 'quả chín', 'ripening fruit', { a: 'middle', s: 10 }));
  const khtn23b = () => svg('0 0 480 260', 'Bảng 23.1: bốn alkane đầu tiên (cấu tạo đầy đủ do máy dựng)',
    [['C', 'CH₄', 'CH₄', 'Methane'], ['CC', 'C₂H₆', 'CH₃–CH₃', 'Ethane'], ['CCC', 'C₃H₈', 'CH₃–CH₂–CH₃', 'Propane'], ['CCCC', 'C₄H₁₀', 'CH₃–CH₂–CH₂–CH₃', 'Butane']].map((q, i) => { const x = i * 120; return mol(q[0], x + 4, 10 + (i === 0 ? 20 : i === 1 ? 20 : 25), i < 2 ? 100 : 112) + t(x + 60, 160, q[1], { a: 'middle', s: 13, b: 1 }) + t(x + 60, 180, q[2], { a: 'middle', s: 10 }) + t(x + 60, 204, q[3], { a: 'middle', s: 12, b: 1 }); }).join(''));
  const khtn23c = () => svg('0 0 480 270', 'Hình 23.2: thí nghiệm về phản ứng cháy của butane',
    path('M60 40 H140 L170 120 H30 Z', '#e6f1ff') + rect(88, 120, 24, 30, '#e6f1ff', { r: 0 }) + path('M62 42 H138 L165 118 H35 Z', '#9aa3ad', { w: 0 }) + rect(92, 150, 16, 70, '#3f67c9', { r: 4 }) + path('M100 148 q-8 -16 0 -34 q8 18 0 34z', '#ffa24a', { w: 1 }) +
    bil(100, 245, 'Úp ngược bình, đốt butane', 'Inverted flask, butane burning', { a: 'middle', s: 10 }) + bil(100, 20, 'Thành bình mờ đi', 'The wall clouds over', { a: 'middle', s: 10 }) +
    arrow(190, 100, 260, 100, C.ink, 2) + path('M300 40 H380 L410 120 H270 Z', '#f2f2f2') + rect(328, 120, 24, 30, '#f2f2f2', { r: 0 }) + path('M282 110 H398 L410 120 H270 Z', '#e8e8e8', { w: 0 }) +
    bil(340, 20, 'Nước vôi trong vẩn đục', 'Limewater turns cloudy', { a: 'middle', s: 10 }) + bil(340, 245, 'Lật bình, đổ nước vôi, lắc', 'Turn over, add limewater, shake', { a: 'middle', s: 10 }) + t(240, 200, '⚠ Chỉ minh hoạ · Illustration only', { a: 'middle', s: 10, b: 1 }));
  const khtn24a = () => svg('0 0 480 280', 'Hình 24.1: điều chế ethylene và thử tính chất',
    path('M40 120 h22 v18 l30 50 q6 14 -10 14 h-62 q-16 0 -10 -14 l30 -50z', '#e6f1ff') + rect(30, 200, 66, 12, '#8f949c', { r: 0 }) + path('M62 124 h60 v26', 'none', { w: 3 }) + rect(94, 150, 56, 66, '#dfeaff', { r: 6 }) + rect(96, 186, 52, 28, '#a8c4f0', { r: 0, w: 0 }) +
    path('M122 150 v-50 h90 l20 -8', 'none', { w: 3 }) + path('M232 92 q-8 -24 0 -46 q8 22 0 46z', '#ffa24a', { w: 1 }) + bil(235, 30, 'a) Đốt ethylene', 'a) Burning ethylene', { a: 'middle', s: 10 }) +
    path('M300 100 h110 v70', 'none', { w: 3 }) + path('M385 150 h50 v80 q0 8 -8 8 h-34 q-8 0 -8 -8z', '#fb923c') + bil(410, 255, 'Nước bromine', 'Bromine water', { a: 'middle', s: 10 }) + bil(360, 90, 'b) Dẫn vào nước bromine', 'b) Into bromine water', { a: 'middle', s: 10 }) +
    bil(60, 240, 'Cồn 96° + H₂SO₄ đặc, đá bọt', '96° alcohol + conc. H₂SO₄, boiling chips', { a: 'middle', s: 9 }) + bil(122, 236, 'Dung dịch NaOH', 'NaOH solution', { a: 'middle', s: 9 }) + t(240, 270, '⚠ Chỉ minh hoạ · Illustration only', { a: 'middle', s: 10, b: 1 }));
  const khtn24b = () => svg('0 0 480 270', 'Hình 24.2: một số ứng dụng của ethylene',
    circ(240, 135, 44, '#cfe8c8', { w: 3 }) + bil(240, 132, 'Ethylene', 'Ethylene', { a: 'middle', s: 12 }) + t(240, 150, 'C₂H₄', { a: 'middle', s: 11, b: 1 }) +
    [['Tổng hợp ethylic alcohol', 'Making ethylic alcohol', 90, 40], ['Tổng hợp acetic acid', 'Making acetic acid', 240, 28], ['Sản xuất dung môi', 'Making solvents', 390, 40], ['Kích thích quả chín', 'Ripening fruit', 90, 235], ['Sản xuất polyethylene (PE)', 'Making polyethylene (PE)', 240, 248], ['Sản xuất PVC', 'Making PVC', 390, 235]].map((q) => line(240, 135, q[2], q[3] + (q[3] < 100 ? 8 : -22), C.grey, 2) + bil(q[2], q[3], q[0], q[1], { a: 'middle', s: 10 })).join(''));

  /* ===== Đợt 9: Chương VII (Bài 25) và Chương VIII (Bài 26–27). Mô hình quả cầu–que và công thức do máy dựng, không chép ảnh sách ===== */
  const CLRB = { C: '#6b7280', H: '#f3f4f6', O: '#ef4444', Na: '#8b5cf6' };
  const ball = (A, B, ox, oy, k, hlIdx) => {                      // A: [el,x,y,z], B: [i,j,order]; chiếu nghiêng nhẹ
    const P = A.map((a) => ({ x: ox + (a[1] + a[3] * 0.35) * k, y: oy + (a[2] - a[3] * 0.25) * k, z: a[3], el: a[0] }));
    let o = B.map((b) => line(P[b[0]].x, P[b[0]].y, P[b[1]].x, P[b[1]].y, '#4b5563', b[2] === 2 ? 6 : 4)).join('');
    P.map((q, i) => [q, i]).sort((u, v) => u[0].z - v[0].z).forEach((pi) => { const q = pi[0], r = q.el === 'H' ? 0.28 * k : q.el === 'Na' ? 0.5 * k : 0.42 * k; o += (hlIdx && hlIdx.indexOf(pi[1]) >= 0 ? '<circle cx="' + q.x.toFixed(1) + '" cy="' + q.y.toFixed(1) + '" r="' + (r + 7).toFixed(1) + '" fill="#93c5fd" fill-opacity=".6" stroke="#2563eb" stroke-width="1.5"/>' : '') + circ(q.x.toFixed(1), q.y.toFixed(1), r.toFixed(1), CLRB[q.el], { w: 1.5 }); });
    return o;
  };
  const ETOH = [['C', -1.3, -0.2, 0], ['C', 0.2, 0.3, 0], ['O', 1.1, -0.7, 0.1], ['H', 1.9, -0.4, 0.3], ['H', -1.9, 0.6, 0.1], ['H', -1.4, -0.8, 0.9], ['H', -1.5, -0.8, -0.9], ['H', 0.4, 0.9, 0.9], ['H', 0.4, 0.9, -0.9]], ETB = [[0, 1, 1], [1, 2, 1], [2, 3, 1], [0, 4, 1], [0, 5, 1], [0, 6, 1], [1, 7, 1], [1, 8, 1]];
  const ACOH = [['C', -1.3, 0, 0], ['C', 0.15, 0, 0], ['O', 0.8, 1.1, 0], ['O', 0.9, -1.1, 0], ['H', 1.8, -0.9, 0], ['H', -1.7, 1, 0], ['H', -1.7, -0.5, 0.9], ['H', -1.7, -0.5, -0.9]], ACB = [[0, 1, 1], [1, 2, 2], [1, 3, 1], [3, 4, 1], [0, 5, 1], [0, 6, 1], [0, 7, 1]];
  const legendCHO = (x, y) => circ(x, y, 7, CLRB.C, { w: 1 }) + t(x + 12, y + 4, 'C', { s: 10 }) + circ(x + 38, y, 5, CLRB.H, { w: 1 }) + t(x + 47, y + 4, 'H', { s: 10 }) + circ(x + 70, y, 7, CLRB.O, { w: 1 }) + t(x + 82, y + 4, 'O', { s: 10 });
  const khtn25a = () => svg('0 0 480 280', 'Hình 25.1: sơ đồ cấu tạo một mỏ dầu',
    rect(10, 60, 460, 210, '#d9c7a3', { r: 6, w: 2 }) + rect(10, 60, 460, 38, '#fff3b0', { r: 0, w: 0 }) + rect(10, 98, 460, 78, '#3a2f2a', { r: 0, w: 0 }) + rect(10, 176, 460, 40, '#8ec5e8', { r: 0, w: 0 }) +
    path('M10 60 H470', 'none', { w: 2 }) + path('M10 98 H470 M10 176 H470 M10 216 H470', 'none', { w: 1.5, c: '#555' }) + '<path d="M10 100 Q240 70 470 100 V60 H10Z" fill="#e8d9b5" opacity="0"/>' +
    path('M210 8 L230 58 H190Z', '#9ca3af') + line(210, 58, 210, 200, '#374151', 4) + circ(210, 205, 5, '#374151', { w: 1 }) +
    bil(250, 82, 'Lớp khí (khí mỏ dầu): methane khoảng 75%', 'Gas layer (oil-field gas): about 75% methane', { s: 11 }) + bil(250, 134, 'Lớp dầu lỏng có hoà tan khí', 'Liquid oil with dissolved gas', { s: 11, c: '#ffffff' }) +
    bil(250, 195, 'Lớp nước mặn', 'Salt water', { s: 11 }) + bil(250, 246, 'Các lớp đất đá', 'Layers of rock', { s: 11 }) + t(240, 276, 'Sơ đồ minh hoạ · Schematic illustration', { a: 'middle', s: 10, b: 1 }));
  const khtn25b = () => svg('0 0 480 250', 'Hình 25.2: một số loại nhiên liệu phổ biến',
    [['Nhiên liệu rắn', 'Solid fuels', 'gỗ · than đá', 'wood · coal', '#e9d2b4', 20], ['Nhiên liệu lỏng', 'Liquid fuels', 'xăng · dầu diesel · xăng sinh học', 'petrol · diesel · biofuel', '#ffe0b8', 170], ['Nhiên liệu khí', 'Gaseous fuels', 'khí thiên nhiên · khí mỏ dầu', 'natural gas · oil-field gas', '#cfe3ff', 320]].map((q, i) =>
      rect(q[5], 20, 140, 210, q[4], { r: 14 }) + (i === 0 ? path('M' + (q[5] + 30) + ' 90 h80 v22 h-80z', '#8b5a2b') + path('M' + (q[5] + 40) + ' 70 h60 v20 h-60z', '#a0693a') + circ(q[5] + 70, 140, 22, '#374151') : i === 1 ? path('M' + (q[5] + 40) + ' 60 h60 v90 q0 10 -10 10 h-40 q-10 0 -10 -10z', '#f59e0b') + path('M' + (q[5] + 55) + ' 50 h30 v10 h-30z', '#666') : path('M' + (q[5] + 50) + ' 60 h40 v90 q0 10 -10 10 h-20 q-10 0 -10 -10z', '#93c5fd') + path('M' + (q[5] + 60) + ' 48 h20 v12 h-20z', '#666')) +
      bil(q[5] + 70, 182, q[0], q[1], { a: 'middle', s: 12 }) + t(q[5] + 70, 214, q[2], { a: 'middle', s: 9 }) + t(q[5] + 70, 226, q[3], { a: 'middle', s: 8.5, i: 1 })).join(''));
  const khtn25c = () => svg('0 0 480 300', 'Sơ đồ tháp chưng cất dầu mỏ (minh hoạ, không ghi nhiệt độ)',
    rect(170, 20, 90, 255, '#e5e7eb', { r: 12 }) + [['Khí hoá lỏng', 'Liquefied gas'], ['Dầu nhẹ', 'Light oil'], ['Naphtha nhẹ', 'Light naphtha'], ['Xăng', 'Petrol'], ['Dầu hoả', 'Kerosene'], ['Dầu diesel', 'Diesel oil'], ['Dầu bôi trơn', 'Lubricating oil'], ['Sáp paraffin', 'Paraffin wax'], ['Nhựa đường', 'Bitumen']].map((q, i) => line(170, 38 + i * 26, 260, 38 + i * 26, '#6b7280', 1.5) + line(260, 30 + i * 26, 300, 30 + i * 26, '#6b7280', 1.5) + t(306, 28 + i * 26, q[0] + ' · ' + q[1], { s: 10, b: 1 })).join('') +
    rect(40, 205, 70, 50, '#fb923c', { r: 6 }) + bil(75, 232, 'Dầu thô', 'Crude oil', { a: 'middle', s: 10 }) + arrow(110, 230, 170, 230, '#555', 3) + arrow(215, 300, 215, 276, '#ef4444', 3) + t(235, 296, 'Nung nóng · Heating', { s: 10, b: 1 }) + t(20, 14, 'Nhẹ (trên) → nặng (dưới) · Light (top) → heavy (bottom)', { s: 10, b: 1 }));
  const khtn26a = () => svg('0 0 480 230', 'Hình 26.1: mô hình phân tử ethylic alcohol', rect(10, 10, 460, 210, '#f8fafc', { r: 14, w: 1 }) + ball(ETOH, ETB, 240, 120, 52) + legendCHO(30, 30) + t(240, 214, 'Ethylic alcohol C₂H₆O (quả cầu: C xám, H trắng, O đỏ)', { a: 'middle', s: 10, b: 1 }));
  const khtn26b = () => svg('0 0 480 200', 'Hình 26.2: công thức cấu tạo của ethylic alcohol, tô nhóm –OH',
    mol('CCO', 90, 20, 300, 'oh') + bil(240, 165, 'Nhóm –OH (tô xanh) gây nên tính chất đặc trưng', 'The –OH group (blue) gives the characteristic properties', { a: 'middle', s: 11 }));
  const khtn26c = () => svg('0 0 480 230', 'Hình 26.3: lọ đựng ethylic alcohol',
    path('M200 40 h60 v20 l30 30 v110 q0 14 -14 14 h-92 q-14 0 -14 -14 v-110 l30 -30z', '#e0f2fe') + rect(210, 24, 40, 18, '#4b5563', { r: 3 }) + rect(180, 120, 100, 50, '#bfe3f7', { r: 0, w: 0 }) + rect(190, 100, 80, 40, '#ffffff', { r: 4, w: 1 }) + t(230, 125, 'Cồn 96°', { a: 'middle', s: 12, b: 1 }) +
    bil(320, 80, 'Chất lỏng không màu, mùi đặc trưng', 'Colourless liquid with a typical smell', { s: 11 }) + bil(320, 130, 'Sôi ở 78,3 °C · d = 0,789 g/mL (20 °C)', 'Boils at 78.3 °C · d = 0.789 g/mL (20 °C)', { s: 11 }) + bil(320, 180, 'Tan vô hạn trong nước', 'Miscible with water in all proportions', { s: 11 }));
  const khtn26d = () => svg('0 0 480 260', 'Hình 26.4: natri phản ứng với ethylic alcohol (minh hoạ)',
    path('M190 30 v170 q0 20 20 20 h40 q20 0 20 -20 v-170', 'none', { w: 3 }) + rect(194, 120, 92, 96, '#e0f2fe', { r: 0, w: 0 }) + circ(240, 190, 9, '#d1d5db', { w: 1.5 }) + [[220, 160], [250, 145], [235, 130], [262, 175], [212, 185]].map((q) => circ(q[0], q[1], 4, '#ffffff', { w: 1 })).join('') +
    path('M300 40 l-52 96', 'none', { w: 4, c: '#6b7280' }) + bil(330, 60, 'Panh kẹp mẩu natri nhỏ', 'Tongs holding a small piece of sodium', { s: 11 }) + bil(300, 170, 'Bọt khí H₂ nổi lên', 'H₂ bubbles rise', { s: 11 }) + bil(300, 220, '5 mL ethylic alcohol tuyệt đối', '5 mL absolute ethylic alcohol', { s: 11 }) + t(240, 255, '⚠ Chỉ minh hoạ · Illustration only', { a: 'middle', s: 10, b: 1 }));
  const hub = (cx, cy, title, en, c, items) => circ(cx, cy, 44, c, { w: 3 }) + bil(cx, cy - 3, title, en, { a: 'middle', s: 12 }) + items.map((q) => line(cx, cy, q[2], q[3] + (q[3] < cy - 40 ? 14 : q[3] > cy + 40 ? -26 : 0), C.grey, 2) + bil(q[2], q[3], q[0], q[1], { a: 'middle', s: 10 })).join('');
  const khtn26e = () => svg('0 0 480 270', 'Hình 26.5: một số ứng dụng của ethylic alcohol', hub(240, 135, 'Ethylic alcohol', 'Ethylic alcohol', '#fde7c2', [['Dung môi (mĩ phẩm, dược phẩm, sơn)', 'Solvent (cosmetics, drugs, paints)', 120, 34], ['Dung dịch sát khuẩn (cồn 70°)', 'Disinfectant (70° alcohol)', 360, 34], ['Đồ uống có cồn', 'Alcoholic drinks', 60, 135], ['Nhiên liệu sinh học', 'Biofuel', 420, 135], ['Điều chế acetic acid, ester', 'Making acetic acid, esters', 240, 248]]));
  const khtn27a = () => svg('0 0 480 230', 'Hình 27.1: mô hình phân tử acetic acid', rect(10, 10, 460, 210, '#f8fafc', { r: 14, w: 1 }) + ball(ACOH, ACB, 240, 120, 56) + legendCHO(30, 30) + t(240, 214, 'Acetic acid C₂H₄O₂ (quả cầu: C xám, H trắng, O đỏ)', { a: 'middle', s: 10, b: 1 }));
  const khtn27b = () => svg('0 0 480 200', 'Hình 27.2: công thức cấu tạo của acetic acid, tô nhóm –COOH',
    mol('CC(=O)O', 90, 20, 300, 'cooh') + bil(240, 165, 'Nhóm –COOH (tô xanh) gây nên tính chất đặc trưng', 'The –COOH group (blue) gives the characteristic properties', { a: 'middle', s: 11 }));
  const khtn27c = () => svg('0 0 480 230', 'Hình 27.3: a) lọ acetic acid trong phòng thí nghiệm; b) chai giấm gạo',
    path('M90 50 h40 v16 l24 24 v100 q0 12 -12 12 h-64 q-12 0 -12 -12 v-100 l24 -24z', '#e0f2fe') + rect(98, 36, 24, 16, '#4b5563', { r: 3 }) + rect(72, 120, 76, 40, '#fef9c3', { r: 0, w: 0 }) + t(110, 144, 'CH₃COOH', { a: 'middle', s: 11, b: 1 }) + bil(110, 216, 'a) Acetic acid', 'a) Acetic acid', { a: 'middle', s: 10 }) +
    path('M340 50 h30 v30 l16 20 v100 q0 12 -12 12 h-38 q-12 0 -12 -12 v-100 l16 -20z', '#f5deb3') + rect(342, 36, 26, 16, '#b91c1c', { r: 3 }) + rect(330, 120, 50, 40, '#ffffff', { r: 3, w: 1 }) + t(355, 144, 'GIẤM', { a: 'middle', s: 10, b: 1 }) + bil(355, 216, 'b) Giấm gạo (2%–5%)', 'b) Rice vinegar (2%–5%)', { a: 'middle', s: 10 }));
  const khtn27d = () => svg('0 0 480 270', 'Hình 27.4: một số ứng dụng của acetic acid', hub(240, 135, 'Acetic acid', 'Acetic acid', '#e4f4c8', [['Sản xuất tơ', 'Making silk-like fibres', 90, 34], ['Dược phẩm', 'Medicines', 240, 28], ['Hoá chất', 'Chemicals', 390, 34], ['Chất kết dính', 'Adhesives', 70, 135], ['Giấm ăn', 'Table vinegar', 410, 135], ['Dung môi', 'Solvents', 240, 248]]));
  const khtn27e = () => svg('0 0 480 270', 'Sơ đồ thí nghiệm phản ứng ester hoá (minh hoạ)',
    path('M60 40 v120 q0 14 14 14 h40 q14 0 14 -14 v-120', 'none', { w: 3 }) + rect(64, 110, 100, 60, '#fef3c7', { r: 0, w: 0 }) + bil(110, 60, 'Acetic acid + ethylic alcohol + H₂SO₄ đặc', 'Acetic acid + ethylic alcohol + conc. H₂SO₄', { a: 'middle', s: 9 }) +
    rect(50, 190, 130, 56, '#fca5a5', { r: 8 }) + bil(115, 216, 'Cốc nước nóng 60–70 °C', 'Hot water bath 60–70 °C', { a: 'middle', s: 9 }) + arrow(190, 130, 250, 130, '#555', 3) +
    path('M290 40 v120 q0 14 14 14 h40 q14 0 14 -14 v-120', 'none', { w: 3 }) + rect(294, 100, 100, 70, '#e0f2fe', { r: 0, w: 0 }) + rect(294, 82, 100, 18, '#fefce8', { r: 0, w: 0 }) + bil(404, 80, 'Lớp ester nổi, thơm nhẹ', 'Ester layer floats, mild fruity smell', { s: 9 }) + bil(404, 130, 'Dung dịch muối ăn bão hoà', 'Saturated salt solution', { s: 9 }) + t(240, 262, '⚠ H₂SO₄ đặc gây bỏng · Chỉ minh hoạ', { a: 'middle', s: 10, b: 1 }));
  Object.assign(T.art, { khtn25a, khtn25b, khtn25c, khtn26a, khtn26b, khtn26c, khtn26d, khtn26e, khtn27a, khtn27b, khtn27c, khtn27d, khtn27e });
  Object.assign(T.art, { khtn22a, khtn22b, khtn22c, khtn22d, khtn23a, khtn23b, khtn23c, khtn24a, khtn24b });
  Object.assign(T.art, { khtn19a, khtn19b, khtn20a, khtn20b, khtn20c, khtn21a, khtn21b });
  Object.assign(T.art, { khtn13a, khtn13b, khtn14a, khtn14b, khtn14c, khtn14d, khtn14e, khtn14f, khtn14g, khtn14h, khtn14i, khtn15a, khtn15b, khtn15c, khtn15d, khtn15e, khtn15f });
  /* ---- Đợt 10: hình Bài 28–30 (tự vẽ, minh hoạ; không chép ảnh sách) ---- */
  const E2 = (x, y, rx, ry, f, c) => '<ellipse cx="' + x + '" cy="' + y + '" rx="' + rx + '" ry="' + ry + '" fill="' + f + '" stroke="' + (c || C.ink) + '" stroke-width="2"/>';
  const khtn28a = () => svg('0 0 480 270', 'Hình 28.1: một số loại lipid — chất béo (a) và sáp (b)',
    rect(8, 8, 464, 254, '#fafafa', { r: 14, w: 1 }) + t(130, 28, 'a) Chất béo · Fats', { a: 'middle', s: 13, b: 1 }) + t(370, 28, 'b) Sáp · Waxes', { a: 'middle', s: 13, b: 1 }) + line(240, 40, 240, 250, '#9ca3af', 1.5, '5 4') +
    path('M52 80 h26 v14 l14 16 v90 q0 8 -8 8 h-38 q-8 0 -8 -8 v-90 l14 -16z', '#fde68a') + rect(56, 66, 18, 14, '#b45309', { r: 3 }) + t(65, 160, 'DẦU', { a: 'middle', s: 10, b: 1 }) + bil(65, 232, 'Dầu thực vật', 'Vegetable oil', { a: 'middle', s: 10 }) +
    rect(118, 150, 64, 44, '#fffbeb', { r: 6 }) + rect(118, 150, 64, 14, '#fef3c7', { r: 6 }) + bil(150, 232, 'Mỡ động vật', 'Animal fat', { a: 'middle', s: 10 }) +
    rect(198, 156, 40, 32, '#fde047', { r: 4 }) + path('M198 156 l10 -10 h40 l-10 10z', '#fef08a', { w: 1.5 }) + bil(208, 232, 'Bơ', 'Butter', { a: 'middle', s: 10 }) +
    E2(300, 130, 40, 56, '#4d7c0f') + E2(300, 132, 33, 48, '#bef264', '#4d7c0f') + bil(300, 232, 'Vỏ quả bơ', 'Avocado skin', { a: 'middle', s: 10 }) +
    path('M385 190 q-8 -70 28 -100 q-2 40 -4 70 q30 -50 40 -60 q-8 60 -50 100 q-10 4 -14 -10z', '#86efac') + line(388, 190, 424, 110, '#166534', 2) + line(392, 175, 440, 118, '#166534', 1.5) + bil(414, 232, 'Bề mặt lá cọ', 'Surface of a palm leaf', { a: 'middle', s: 10 }));
  const khtn29a = () => svg('0 0 480 280', 'Hình 29.1: một số loại carbohydrate và trạng thái tự nhiên',
    rect(8, 8, 464, 264, '#fafafa', { r: 14, w: 1 }) +
    [[70, 82], [100, 78], [84, 104], [58, 106], [112, 104], [88, 130]].map((q) => circ(q[0], q[1], 14, '#a78bfa', { w: 1.5 })).join('') + path('M84 56 q4 -14 18 -16', 'none', { w: 3, c: '#166534' }) + bil(90, 168, 'a) Glucose C₆H₁₂O₆', 'a) Glucose C₆H₁₂O₆', { a: 'middle', s: 11 }) + bil(90, 196, '(nho chín)', '(ripe grapes)', { a: 'middle', s: 10 }) +
    [0, 1, 2].map((i) => rect(305 + i * 18, 40 + i * 8, 11, 112 - i * 8, '#d9f99d', { r: 3, w: 1.5 })).join('') +
    bil(330, 168, 'b) Saccharose C₁₂H₂₂O₁₁', 'b) Sucrose C₁₂H₂₂O₁₁', { a: 'middle', s: 11 }) + bil(330, 196, '(cây mía)', '(sugar cane)', { a: 'middle', s: 10 }) +
    path('M54 214 q36 44 72 0z', '#fef3c7') + [0, 1, 2, 3, 4].map((i) => E2(66 + i * 12, 212, 4, 2.5, '#fffbeb', '#a16207')).join('') + bil(90, 262, 'c) Tinh bột (C₆H₁₀O₅)ₙ — gạo, ngô, khoai, sắn', 'c) Starch (C₆H₁₀O₅)ₙ — rice, maize, potato, cassava', { a: 'middle', s: 9 }) +
    circ(330, 224, 22, '#ffffff', { w: 1.5 }) + circ(318, 218, 14, '#f8fafc', { w: 1.2 }) + circ(344, 220, 15, '#f8fafc', { w: 1.2 }) + bil(330, 262, 'd) Cellulose (C₆H₁₀O₅)ₘ — bông', 'd) Cellulose (C₆H₁₀O₅)ₘ — cotton', { a: 'middle', s: 9 }));
  const khtn29b = () => svg('0 0 480 230', 'Hình 29.2: đường glucose (a) và đường saccharose (b)',
    rect(8, 8, 464, 214, '#fafafa', { r: 14, w: 1 }) +
    path('M40 150 q50 -70 100 0z', '#f1f5f9') + [[70, 140], [90, 130], [110, 140], [100, 118], [84, 146], [122, 144]].map((q) => rect(q[0], q[1], 9, 9, '#ffffff', { r: 1.5, w: 1.2 })).join('') + bil(90, 178, 'a) Glucose C₆H₁₂O₆', 'a) Glucose C₆H₁₂O₆', { a: 'middle', s: 11 }) + t(90, 208, 'd = 1,56 g/cm³ · vị ngọt, tan tốt', { a: 'middle', s: 10 }) +
    path('M300 150 q50 -70 100 0z', '#f1f5f9') + [[330, 140], [350, 128], [370, 140], [360, 112], [344, 146], [382, 144]].map((q) => rect(q[0], q[1], 12, 12, '#ffffff', { r: 1.5, w: 1.2 })).join('') + bil(350, 178, 'b) Saccharose C₁₂H₂₂O₁₁', 'b) Sucrose C₁₂H₂₂O₁₁', { a: 'middle', s: 11 }) + t(350, 208, 'd = 1,58 g/cm³ · vị ngọt, tan tốt', { a: 'middle', s: 10 }));
  const khtn29c = () => svg('0 0 480 280', 'Hình 29.3: một số ứng dụng của glucose (a) và saccharose (b)',
    rect(8, 8, 464, 264, '#fafafa', { r: 14, w: 1 }) + t(150, 28, 'a) Glucose', { a: 'middle', s: 13, b: 1 }) + t(380, 28, 'b) Saccharose', { a: 'middle', s: 13, b: 1 }) + line(240, 38, 240, 262, '#9ca3af', 1.5, '5 4') +
    E2(60, 100, 30, 44, '#e0f2fe') + path('M40 130 q20 -24 40 -60', 'none', { w: 3, c: '#ffffff' }) + bil(60, 168, 'Gương soi', 'Mirror', { a: 'middle', s: 10 }) +
    path('M118 60 q-6 40 14 46 q20 -6 14 -46z', '#fecaca') + line(132, 106, 132, 140, C.ink, 2) + line(118, 140, 146, 140, C.ink, 2) + bil(132, 168, 'Rượu vang', 'Wine', { a: 'middle', s: 10 }) +
    rect(170, 64, 50, 70, '#e0f2fe', { r: 10 }) + t(195, 104, 'Glu', { a: 'middle', s: 11, b: 1 }) + line(195, 134, 195, 156, C.ink, 2) + bil(195, 190, 'Dịch truyền glucose', 'Glucose drip', { a: 'middle', s: 9 }) +
    path('M290 70 h50 l-6 66 h-38z', '#fdba74') + bil(315, 168, 'Nước trái cây', 'Fruit juice', { a: 'middle', s: 10 }) +
    [0, 1, 2].map((i) => circ(380 + i * 26, 110 + (i % 2) * 8, 11, ['#f472b6', '#facc15', '#60a5fa'][i], { w: 1.5 })).join('') + bil(415, 168, 'Bánh kẹo', 'Sweets', { a: 'middle', s: 10 }) +
    bil(150, 236, 'tráng gương · lên men · dịch truyền', 'silvering · fermentation · infusion', { a: 'middle', s: 9 }) + bil(380, 236, 'chất tạo ngọt · cung cấp năng lượng', 'sweetener · energy', { a: 'middle', s: 9 }));
  const khtn30a = () => svg('0 0 480 270', 'Hình 30.1: sự hình thành tinh bột và cellulose ở thực vật',
    rect(8, 8, 464, 254, '#fafafa', { r: 14, w: 1 }) + circ(60, 130, 34, '#fef9c3') + t(60, 126, 'CO₂ +', { a: 'middle', s: 12, b: 1 }) + t(60, 144, 'H₂O', { a: 'middle', s: 12, b: 1 }) +
    line(96, 130, 170, 130, '#166534', 3) + path('M170 122 l12 8 l-12 8z', '#166534', { w: 1 }) + bil(134, 108, 'Quang hợp', 'Photosynthesis', { a: 'middle', s: 10 }) + bil(134, 156, 'Giải phóng O₂', 'releases O₂', { a: 'middle', s: 9 }) +
    circ(222, 130, 36, '#bbf7d0') + t(222, 134, 'GLUCOSE', { a: 'middle', s: 12, b: 1 }) +
    line(254, 108, 330, 62, '#166534', 3) + rect(334, 40, 130, 46, '#e0f2fe', { r: 10 }) + bil(399, 56, 'CELLULOSE', 'CELLULOSE', { a: 'middle', s: 11 }) + t(399, 100, '(xây dựng cấu trúc)', { a: 'middle', s: 10 }) +
    line(254, 152, 330, 198, '#166534', 3) + rect(334, 176, 130, 46, '#fef3c7', { r: 10 }) + bil(399, 192, 'TINH BỘT', 'STARCH', { a: 'middle', s: 11 }) + t(399, 236, '(dự trữ năng lượng)', { a: 'middle', s: 10 }) +
    t(240, 258, 'Sơ đồ minh hoạ — không phải phương trình hoá học', { a: 'middle', s: 9, i: 1 }));
  const khtn30b = () => svg('0 0 480 270', 'Hình 30.2: một số ứng dụng của tinh bột (a) và cellulose (b)',
    rect(8, 8, 464, 254, '#fafafa', { r: 14, w: 1 }) + t(130, 28, 'a) Tinh bột', { a: 'middle', s: 13, b: 1 }) + t(360, 28, 'b) Cellulose', { a: 'middle', s: 13, b: 1 }) + line(240, 38, 240, 250, '#9ca3af', 1.5, '5 4') +
    path('M40 100 q40 56 80 0z', '#ffffff') + E2(80, 100, 40, 8, '#fffbeb') + bil(80, 168, 'Cơm', 'Cooked rice', { a: 'middle', s: 10 }) +
    path('M150 70 q-4 30 12 36 q16 -6 12 -36z', '#fecaca') + bil(162, 168, 'Rượu', 'Rice wine', { a: 'middle', s: 10 }) +
    rect(70, 196, 100, 36, '#fde68a', { r: 6 }) + bil(120, 244, 'Hồ dán; nguyên liệu sản xuất ethylic alcohol', 'Paste; raw material for ethylic alcohol', { a: 'middle', s: 8 }) +
    rect(290, 64, 36, 48, '#ffffff', { r: 2 }) + line(296, 78, 320, 78, '#9ca3af', 1.5) + line(296, 90, 320, 90, '#9ca3af', 1.5) + bil(308, 140, 'Giấy', 'Paper', { a: 'middle', s: 10 }) +
    path('M350 112 l36 -34 l36 34z', '#d97706') + rect(358, 112, 56, 38, '#fbbf24', { r: 2 }) + bil(386, 168, 'Nhà gỗ, đồ gỗ', 'Wooden house, furniture', { a: 'middle', s: 10 }) +
    bil(360, 214, 'Cồn công nghiệp, tơ sợi, hoá chất', 'Industrial alcohol, fibres, chemicals', { a: 'middle', s: 9 }));
  /* ---------------- Đợt 11: Bài 31–33 (tự vẽ) ---------------- */
  const aa = (x, y, nm, r, col) => rect(x, y, 78, 78, col, { r: 12 }) + t(x + 39, y + 28, nm, { a: 'middle', s: 14, b: 1 }) + t(x + 39, y + 46, 'R = ' + r, { a: 'middle', s: 11 }) + t(x + 8, y + 70, 'H₂N', { s: 10 }) + t(x + 70, y + 70, 'COOH', { a: 'end', s: 10 });
  const khtn31a = () => svg('0 0 480 280', 'Hình 31.1: amino acid và protein',
    rect(8, 8, 464, 264, '#fafafa', { r: 14, w: 1 }) + aa(30, 24, 'Alanine', 'CH₃', '#bbf7d0') + aa(130, 24, 'Glycine', 'H', '#bfdbfe') + bil(130, 118, 'Amino acid: có –NH₂ và –COOH, khác gốc R', 'Amino acids: –NH₂ and –COOH, different R', { a: 'middle', s: 9 }) +
    line(30, 140, 450, 140, '#d1d5db', 1.5, '4 4') + aa(30, 150, 'Ala', 'CH₃', '#bbf7d0') + line(108, 189, 142, 189, '#dc2626', 5) + aa(142, 150, 'Gly', 'H', '#bfdbfe') + line(220, 189, 254, 189, '#dc2626', 5) + aa(254, 150, 'Ala', 'CH₃', '#bbf7d0') + line(332, 189, 366, 189, '#dc2626', 5) + t(398, 192, '…', { s: 22, b: 1 }) +
    t(125, 180, '–CO–NH–', { a: 'middle', s: 9, c: '#dc2626' }) + bil(240, 258, 'Một đoạn mạch protein · liên kết peptide (đỏ)', 'A piece of protein chain · peptide bond (red)', { a: 'middle', s: 9 }));
  const khtn31b = () => svg('0 0 480 270', 'Hình 31.2: một số sản phẩm chứa protein',
    rect(8, 8, 464, 254, '#fafafa', { r: 14, w: 1 }) + path('M40 70 h44 l-4 70 h-36z', '#ffffff') + bil(62, 160, 'Sữa', 'Milk', { a: 'middle', s: 10 }) + E2(150, 110, 24, 32, '#fef3c7') + circ(150, 116, 12, '#fbbf24', { w: 1 }) + bil(150, 160, 'Trứng', 'Eggs', { a: 'middle', s: 10 }) +
    rect(210, 84, 76, 40, '#f87171', { r: 16 }) + bil(248, 160, 'Thịt', 'Meat', { a: 'middle', s: 10 }) + path('M320 110 q40 -40 80 0 q-40 40 -80 0z', '#93c5fd') + path('M400 110 l22 -18 v36z', '#93c5fd') + bil(360, 160, 'Cá', 'Fish', { a: 'middle', s: 10 }) +
    E2(240, 214, 30, 20, '#f5f5f4') + bil(240, 250, 'Kén tằm (tơ tằm)', 'Silkworm cocoon (silk)', { a: 'middle', s: 10 }) + t(240, 28, 'Nguồn thực phẩm giàu protein · nguyên liệu tơ tự nhiên', { a: 'middle', s: 11, b: 1 }));
  const chainRow = (x0, y, n, f) => Array.from({ length: n }, (_, i) => (i < n - 1 ? line(x0 + i * 40, y, x0 + i * 40 + 40, y, '#374151', 3) : '') + circ(x0 + i * 40, y, 9, f, { w: 2 })).join('');
  const khtn32a = () => svg('0 0 480 280', 'Hình 32.1: các loại mạch polymer',
    rect(8, 8, 464, 264, '#fafafa', { r: 14, w: 1 }) + t(80, 28, 'a) Mạch không phân nhánh', { a: 'middle', s: 10, b: 1 }) + chainRow(30, 60, 5, '#fde68a') + bil(100, 96, 'amylose', 'amylose', { a: 'middle', s: 9 }) +
    t(310, 28, 'b) Mạch phân nhánh', { a: 'middle', s: 10, b: 1 }) + chainRow(250, 60, 6, '#fde68a') + line(290, 69, 300, 100, '#374151', 3) + circ(300, 106, 9, '#bbf7d0', { w: 2 }) + line(340, 69, 350, 100, '#374151', 3) + circ(350, 106, 9, '#bbf7d0', { w: 2 }) + bil(330, 130, 'amylopectin, glycogen', 'amylopectin, glycogen', { a: 'middle', s: 9 }) +
    t(150, 166, 'c) Mạng không gian', { a: 'middle', s: 10, b: 1 }) + chainRow(40, 190, 6, '#fde68a') + chainRow(40, 240, 6, '#fde68a') + [0, 2, 4].map((i) => line(40 + i * 40 + 20, 199, 40 + i * 40 + 20, 231, '#dc2626', 4)).join('') + bil(150, 268, 'nhựa bakelite, cao su lưu hoá · cầu nối đỏ', 'bakelite, vulcanised rubber · red cross-links', { a: 'middle', s: 9 }) + t(380, 220, 'mắt xích', { s: 9 }) + circ(366, 216, 8, '#fde68a', { w: 2 }));
  const khtn32b = () => svg('0 0 480 200', 'Hình 32.2: một số sản phẩm từ chất dẻo',
    rect(8, 8, 464, 184, '#fafafa', { r: 14, w: 1 }) + path('M40 60 h46 l-6 64 h-34z', '#bae6fd') + bil(63, 150, 'Cốc nhựa', 'Plastic cup', { a: 'middle', s: 10 }) + rect(130, 50, 36, 80, '#bfdbfe', { r: 10 }) + rect(140, 36, 16, 14, '#60a5fa', { r: 3 }) + bil(148, 150, 'Chai nhựa', 'Plastic bottle', { a: 'middle', s: 10 }) +
    rect(220, 80, 90, 44, '#fde68a', { r: 8 }) + bil(265, 150, 'Hộp nhựa', 'Plastic box', { a: 'middle', s: 10 }) + circ(390, 100, 28, '#fecaca', { w: 2 }) + circ(390, 100, 12, '#fff', { w: 1 }) + bil(390, 150, 'Đồ chơi, ống nhựa…', 'Toys, plastic pipes …', { a: 'middle', s: 10 }) + t(240, 28, 'Chất dẻo = polymer + chất độn, chất hoá dẻo, chất tạo màu…', { a: 'middle', s: 10, b: 1 }));
  const sy = (x, ico, vi, en) => rect(x, 40, 66, 70, '#ffffff', { r: 10, w: 1.5 }) + t(x + 33, 82, ico, { a: 'middle', s: 26 }) + bil(x + 33, 128, vi, en, { a: 'middle', s: 7 });
  const khtn32c = () => svg('0 0 480 170', 'Hình 32.3: ý nghĩa các kí hiệu thường gặp trên đồ nhựa gia dụng',
    rect(8, 8, 464, 154, '#fafafa', { r: 14, w: 1 }) + sy(20, '🍴', 'An toàn thực phẩm', 'Food safe') + sy(92, '📡', 'Lò vi sóng', 'Microwave') + sy(164, '🍽', 'Máy rửa chén', 'Dishwasher') + sy(236, '❄', 'Đông lạnh', 'Freezer') + sy(308, '🌡', 'Nhiệt độ tối đa', 'Max temp.') + sy(380, '♻', 'Mã nhựa', 'Plastic code') + t(240, 156, 'Biểu tượng tự vẽ lại', { a: 'middle', s: 9, i: 1 }));
  const khtn32d = () => svg('0 0 480 160', 'Hình 32.4: nhãn kí hiệu giặt, là đính kèm quần áo',
    rect(8, 8, 464, 144, '#fafafa', { r: 14, w: 1 }) + rect(150, 24, 180, 96, '#ffffff', { r: 8, w: 1.5 }) + path('M185 56 h50 l-8 36 h-34z', 'none', { w: 2, c: '#374151' }) + t(210, 80, '30°', { a: 'middle', s: 11, b: 1 }) + path('M255 90 h44 l-6 -20 h-30z', 'none', { w: 2, c: '#374151' }) + bil(240, 140, 'Nhãn giặt, là: đọc kĩ trước khi giặt (hình vẽ lại)', 'Care label: read before washing (redrawn)', { a: 'middle', s: 9 }));
  const khtn32e = () => svg('0 0 480 170', 'Hình 32.5: một số sản phẩm làm từ cao su',
    rect(8, 8, 464, 154, '#fafafa', { r: 14, w: 1 }) + circ(80, 80, 40, '#374151') + circ(80, 80, 18, '#e5e7eb') + bil(80, 140, 'Lốp xe', 'Tyre', { a: 'middle', s: 10 }) + E2(210, 80, 50, 18, '#4b5563') + bil(210, 140, 'Băng tải, ống dẫn', 'Conveyor belt, hose', { a: 'middle', s: 10 }) + circ(330, 80, 24, 'none', { w: 8, c: '#374151' }) + bil(330, 140, 'Gioăng đệm', 'Gasket', { a: 'middle', s: 10 }) + path('M400 60 q30 -14 50 4 v50 h-50z', '#60a5fa') + bil(425, 140, 'Áo lặn', 'Wetsuit', { a: 'middle', s: 10 }));
  const khtn32f = () => svg('0 0 480 170', 'Hình 32.6: gỗ nhựa composite',
    rect(8, 8, 464, 154, '#fafafa', { r: 14, w: 1 }) + rect(60, 40, 220, 60, '#fde68a', { r: 8 }) + Array.from({ length: 12 }, (_, i) => circ(76 + (i % 6) * 36, 58 + Math.floor(i / 6) * 28, 6, '#92400e')).join('') + bil(170, 128, 'Gỗ nhựa composite', 'Wood-plastic composite', { a: 'middle', s: 10 }) + bil(300, 62, '● bột gỗ: vật liệu cốt', '● wood powder: reinforcement', { s: 9 }) + bil(300, 96, '■ nhựa PE: vật liệu nền', '■ PE plastic: matrix', { s: 9 }));
  const khtn32g = () => svg('0 0 480 200', 'Hình 32.7: một số sản phẩm làm từ polyethylene',
    rect(8, 8, 464, 184, '#fafafa', { r: 14, w: 1 }) + path('M30 60 h40 l-5 40 h-30z', '#bae6fd') + circ(100, 90, 16, '#fecaca') + rect(125, 70, 30, 30, '#fde68a', { r: 6 }) + bil(90, 120, 'Cốc, đĩa, thìa nhựa', 'Cups, plates, spoons', { a: 'middle', s: 9 }) + rect(200, 54, 26, 56, '#bfdbfe', { r: 8 }) + bil(213, 128, 'Chai, lọ', 'Bottles, jars', { a: 'middle', s: 9 }) + path('M270 60 h36 l6 50 h-48z', '#d1fae5') + bil(288, 128, 'Túi đựng', 'Bags', { a: 'middle', s: 9 }) +
    rect(350, 72, 110, 12, '#a3a3a3', { r: 6 }) + bil(405, 128, 'Ống nhựa, vỏ dây điện', 'Pipes, cable insulation', { a: 'middle', s: 9 }) + t(240, 172, 'Đồ chơi trẻ em · màng bọc · vỏ dây điện', { a: 'middle', s: 10 }));
  const r5 = (x, vi, en, col) => circ(x, 80, 30, col, { w: 2 }) + t(x, 86, en[0], { a: 'middle', s: 22, b: 1 }) + bil(x, 130, vi, en, { a: 'middle', s: 9 });
  const khtn32h = () => svg('0 0 480 190', 'Hình 32.8: nguyên tắc 5R giúp hạn chế ô nhiễm môi trường khi sử dụng vật liệu polymer',
    rect(8, 8, 464, 174, '#fafafa', { r: 14, w: 1 }) + r5(56, 'Đổi mới công nghệ', 'Renew', '#bbf7d0') + r5(148, 'Từ chối', 'Refuse', '#fecaca') + r5(240, 'Giảm thiểu', 'Reduce', '#fde68a') + r5(332, 'Tái sử dụng', 'Reuse', '#bfdbfe') + r5(424, 'Tái chế', 'Recycle', '#ddd6fe') + t(240, 170, 'Nguyên tắc 5R (vẽ lại)', { a: 'middle', s: 9, i: 1 }));
  const rockShape = (x, y, col, nm, cp) => path('M' + x + ' ' + (y + 70) + ' L' + (x + 14) + ' ' + y + ' L' + (x + 70) + ' ' + (y - 8) + ' L' + (x + 106) + ' ' + (y + 30) + ' L' + (x + 92) + ' ' + (y + 72) + ' Z', col, { w: 2 }) + bil(x + 52, y + 92, nm[0], nm[1], { a: 'middle', s: 10 }) + t(x + 52, y + 126, cp, { a: 'middle', s: 9 });
  const khtn33a = () => svg('0 0 480 330', 'Hình 33.1: một số loại đá',
    rect(8, 8, 464, 314, '#fafafa', { r: 14, w: 1 }) + rockShape(30, 36, '#f1f5f9', ['a) Thạch anh', 'a) Quartz'], 'SiO₂') + rockShape(260, 36, '#d6d3d1', ['b) Dolomite', 'b) Dolomite'], 'CaCO₃·MgCO₃') + rockShape(30, 186, '#a8a29e', ['c) Đá hoa cương (granite)', 'c) Granite'], 'muối silicate Al, Na, K, Ca…') + rockShape(260, 186, '#f5f5f4', ['d) Đá cẩm thạch', 'd) Marble'], 'CaCO₃, CaCO₃·MgCO₃…'));
  /* ---------------- Đợt 12: Bài 34–35 ---------------- */
  const khtn34a = () => svg('0 0 480 230', 'Hình 34.1: dãy núi đá vôi',
    rect(8, 8, 464, 214, '#e0f2fe', { r: 14, w: 1 }) + circ(410, 44, 16, C.sun, { c: '#f59e0b' }) +
    poly('20,190 90,90 140,140 210,50 280,130 340,80 460,190', '#d6d3d1') + poly('210,50 195,80 215,70 228,88 240,72', '#f5f5f4', { w: 1 }) +
    rect(8, 190, 464, 32, '#bbf7d0', { r: 0, w: 1 }) + line(20, 205, 460, 205, '#86efac', 2) +
    bil(240, 212, 'Dãy núi đá vôi', 'Limestone range', { a: 'middle', s: 11 }));
  const khtn34b = () => {
    const heap = (x, col, nm, cp) => poly((x) + ',150 ' + (x + 30) + ',90 ' + (x + 60) + ',110 ' + (x + 95) + ',150', col) + bil(x + 48, 176, nm[0], nm[1], { a: 'middle', s: 11 }) + t(x + 48, 210, cp, { a: 'middle', s: 9, i: 1 });
    return svg('0 0 480 230', 'Hình 34.2: clanhke và xi măng',
      rect(8, 8, 464, 214, '#fafafa', { r: 14, w: 1 }) + heap(40, '#78716c', ['a) Clanhke', 'a) Clinker'], 'cục rắn màu xám') + heap(250, '#d1d5db', ['b) Xi măng', 'b) Cement'], 'bột mịn lục xám') +
      arrow(150, 120, 245, 120, C.ink, 2.5) + t(198, 108, 'nghiền + thạch cao', { a: 'middle', s: 9 }) + t(198, 144, 'grind + gypsum', { a: 'middle', s: 8, i: 1 }));
  };
  const khtn35a = () => {
    const dia = [[0,0],[50,0],[25,40],[75,40],[0,80],[50,80],[100,0],[100,80]];
    let d = '', x0 = 50, y0 = 56, i, j;
    for (i = 0; i < dia.length; i++) for (j = i + 1; j < dia.length; j++) { const dx = dia[i][0] - dia[j][0], dy = dia[i][1] - dia[j][1]; if (Math.sqrt(dx * dx + dy * dy) < 56) d += line(x0 + dia[i][0], y0 + dia[i][1], x0 + dia[j][0], y0 + dia[j][1], C.grey, 2); }
    for (i = 0; i < dia.length; i++) d += circ(x0 + dia[i][0], y0 + dia[i][1], 7, '#334155');
    let gr = '';
    for (let L = 0; L < 3; L++) for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) gr += circ(285 + c * 36 + r * 12, 56 + L * 34 + r * 12, 6, '#475569', { w: 1.5 });
    gr = line(290, 60, 392, 60, C.grey, 2) + line(302, 72, 404, 72, C.grey, 2) + line(314, 84, 416, 84, C.grey, 2) + gr;
    return svg('0 0 480 230', 'Hình 35.1: kim cương và than chì',
      rect(8, 8, 464, 214, '#fafafa', { r: 14, w: 1 }) + d + bil(100, 180, 'a) Kim cương', 'a) Diamond', { a: 'middle', s: 11 }) + t(100, 210, 'mạng ba chiều bền', { a: 'middle', s: 9, i: 1 }) +
      gr + bil(350, 180, 'b) Than chì (graphite)', 'b) Graphite', { a: 'middle', s: 11 }) + t(350, 210, 'các lớp trượt lên nhau', { a: 'middle', s: 9, i: 1 }));
  };
  const khtn35b = () => {
    const bx = (x, y, w, nm, f) => rect(x, y, w, 40, f, { r: 10 }) + bil(x + w / 2, y + 16, nm[0], nm[1], { a: 'middle', s: 10 });
    return svg('0 0 480 300', 'Hình 35.2: sơ đồ chu trình carbon',
      rect(8, 8, 464, 284, '#fafafa', { r: 14, w: 1 }) +
      bx(170, 16, 140, ['CO₂ khí quyển', 'Atmospheric CO₂'], '#e0f2fe') + bx(20, 120, 120, ['Thực vật', 'Plants'], C.greenL) + bx(340, 120, 120, ['Động vật', 'Animals'], C.sunL) +
      bx(20, 232, 130, ['Xác sinh vật', 'Dead matter'], '#e7e5e4') + bx(175, 232, 130, ['Nhiên liệu hoá thạch, đá vôi', 'Fossil fuels, limestone'], '#e7e5e4') + bx(340, 232, 120, ['Nước biển', 'Seawater'], C.penL) +
      arrow(190, 58, 100, 118, C.green, 2.5) + t(96, 84, 'quang hợp', { a: 'end', s: 9 }) +
      arrow(80, 118, 180, 58, C.red, 2) + t(150, 108, 'hô hấp', { s: 9 }) +
      arrow(300, 58, 380, 118, C.red, 2) + arrow(140, 142, 338, 142, C.teal, 2) + t(240, 134, 'ăn', { a: 'middle', s: 9 }) +
      arrow(80, 162, 80, 230, C.grey, 2) + arrow(400, 162, 150, 232, C.grey, 1.5) + arrow(150, 252, 173, 252, C.grey, 2) +
      arrow(240, 230, 240, 60, C.red, 2.5) + t(246, 190, 'đốt cháy', { s: 9 }) + arrow(340, 252, 308, 252, C.teal, 2) + arrow(312, 54, 410, 230, C.teal, 1.5) + t(400, 205, 'hoà tan', { s: 9 }));
  };
  Object.assign(T.art, { khtn34a, khtn34b, khtn35a, khtn35b });
  Object.assign(T.art, { khtn28a, khtn29a, khtn29b, khtn29c, khtn30a, khtn30b, khtn31a, khtn31b, khtn32a, khtn32b, khtn32c, khtn32d, khtn32e, khtn32f, khtn32g, khtn32h, khtn33a });
})();
