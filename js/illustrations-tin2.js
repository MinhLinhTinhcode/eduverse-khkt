/* ==========================================================================
   HÌNH VẼ — TIN HỌC 9, BÀI 12a – 17 (vẽ SVG riêng cho dự án, không phải ảnh sách)
     if12a1  Hình 12a.1  hàm IF chọn một trong hai kết quả
     fam13a1 Hình 13a.1  bảng tổng hợp thu – chi và số dư
     bar13a2 Hình 13a.2  biểu đồ cột chi tiêu theo khoản
     ps14a   Hình 14.1   các bước giải quyết vấn đề
     ipo15a  Hình 15.1   đầu vào – xử lí – đầu ra
     flow15b Hình 15.2   sơ đồ khối tìm số lớn nhất
     flow16a Hình 16.1   sơ đồ khối chương trình tính tiền điện
     job17a  Hình 17.1   các nhóm nghề liên quan tin học
   ========================================================================== */
(function () {
  'use strict';
  const T = window.TEXTBOOK = window.TEXTBOOK || {};
  T.art = T.art || {};
  const C = { pen: '#1f46d0', penL: '#dbe4ff', teal: '#0aa39a', tealL: '#d6f4ef', red: '#e0393e', redL: '#ffe3e4', sun: '#ffe24a', sunL: '#fff6bf', violet: '#6c4be8', violetL: '#e9e3ff', green: '#2fbf7a', greenL: '#dcf5e4', ink: '#14224a', grey: '#9aa8c7', greyL: '#e8edf9' };
  const svg = (vb, label, inner) => '<svg class="art" viewBox="' + vb + '" role="img" aria-label="' + label + '" xmlns="http://www.w3.org/2000/svg">' + inner + '</svg>';
  const rect = (x, y, w, h, fill, o) => { o = o || {}; return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (o.r == null ? 6 : o.r) + '" fill="' + fill + '" stroke="' + (o.s || C.ink) + '" stroke-width="' + (o.w == null ? 2 : o.w) + '"/>'; };
  const t = (x, y, s, o) => { o = o || {}; return '<text x="' + x + '" y="' + y + '" text-anchor="' + (o.a || 'start') + '" style="font-size:' + (o.s || 12) + 'px" font-weight="' + (o.b ? 700 : 400) + '" fill="' + (o.c || C.ink) + '"' + (o.i ? ' class="en"' : '') + '>' + s + '</text>'; };
  const bil = (x, y, vi, en, o) => { o = o || {}; const s = o.s || 12; return t(x, y, vi, { a: o.a, s: s, b: 1, c: o.c }) + t(x, y + s + 2, en, { a: o.a, s: s - 1.5, i: 1, c: o.c }); };
  const line = (x1, y1, x2, y2, c, w) => '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (c || C.ink) + '" stroke-width="' + (w || 2) + '" stroke-linecap="round"/>';
  const arrow = (x1, y1, x2, y2, c) => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 8, p = (d) => (x2 - h * Math.cos(a + d)).toFixed(1) + ',' + (y2 - h * Math.sin(a + d)).toFixed(1);
    return line(x1, y1, x2, y2, c, 2) + '<polygon points="' + x2 + ',' + y2 + ' ' + p(0.45) + ' ' + p(-0.45) + '" fill="' + (c || C.ink) + '"/>';
  };
  const dia = (cx, cy, w, h, fill) => '<polygon points="' + cx + ',' + (cy - h / 2) + ' ' + (cx + w / 2) + ',' + cy + ' ' + cx + ',' + (cy + h / 2) + ' ' + (cx - w / 2) + ',' + cy + '" fill="' + fill + '" stroke="' + C.ink + '" stroke-width="2"/>';
  const oval = (cx, cy, w, h, fill) => '<rect x="' + (cx - w / 2) + '" y="' + (cy - h / 2) + '" width="' + w + '" height="' + h + '" rx="' + h / 2 + '" fill="' + fill + '" stroke="' + C.ink + '" stroke-width="2"/>';

  const if12a1 = () => svg('0 0 460 210', 'Hàm IF kiểm tra điều kiện C2>B2 rồi trả về Vượt mức hoặc Trong mức',
    oval(70, 105, 100, 40, C.penL) + bil(70, 100, 'Dữ liệu', 'Data', { a: 'middle', s: 11 }) +
    arrow(120, 105, 170, 105) + dia(240, 105, 130, 80, C.sunL) + t(240, 102, 'C2 > B2 ?', { a: 'middle', s: 13, b: 1 }) + t(240, 118, 'logical_test', { a: 'middle', s: 9, i: 1 }) +
    arrow(240, 65, 240, 40, C.green) + arrow(240, 145, 240, 172, C.red) +
    t(252, 56, 'Đúng / TRUE', { s: 10, b: 1, c: C.green }) + t(252, 160, 'Sai / FALSE', { s: 10, b: 1, c: C.red }) +
    line(240, 40, 300, 40, C.green, 2) + arrow(300, 40, 330, 40, C.green) + line(240, 172, 300, 172, C.red, 2) + arrow(300, 172, 330, 172, C.red) +
    rect(330, 20, 120, 40, C.greenL, { r: 8 }) + bil(390, 36, '"Vượt mức"', 'value_if_true', { a: 'middle', s: 12 }) +
    rect(330, 152, 120, 40, C.redL, { r: 8 }) + bil(390, 168, '"Trong mức"', 'value_if_false', { a: 'middle', s: 12 }));

  const famRows = [['Lương', 'Thu', '12,000'], ['Học bổng', 'Thu', '1,500'], ['Ăn uống', 'Chi', '4,200'], ['Học tập', 'Chi', '1,300'], ['Đi lại', 'Chi', '800'], ['Giải trí', 'Chi', '600']];
  const fam13a1 = () => {
    let s = rect(4, 4, 452, 232, '#fff', { r: 4, w: 1.5 }) + t(16, 26, 'Quản lí tài chính gia đình – Tháng 10 (nghìn đồng)', { s: 12, b: 1 });
    ['Khoản mục', 'Loại', 'Số tiền'].forEach((h, i) => { s += rect(16 + i * 80, 36, 80, 22, C.penL, { r: 0, w: 0.8, s: C.grey }) + t(56 + i * 80, 51, h, { a: 'middle', s: 10, b: 1 }); });
    famRows.forEach((r, ri) => r.forEach((c, i) => { s += rect(16 + i * 80, 58 + ri * 22, 80, 22, '#fff', { r: 0, w: 0.6, s: C.grey }) + t(56 + i * 80, 73 + ri * 22, c, { a: 'middle', s: 10, c: r[1] === 'Thu' ? C.green : C.ink }); }));
    const x = 280;
    s += t(x + 80, 30, 'Tổng hợp', { a: 'middle', s: 11, b: 1 });
    [['Tổng thu', '=SUMIF(B:B,"Thu",C:C)', '13,500'], ['Tổng chi', '=SUMIF(B:B,"Chi",C:C)', '6,900'], ['Số dư', '=Thu − Chi', '6,600'], ['Nhận xét', '=IF(Số dư>=0, …)', 'Còn dư']].forEach((r, i) => {
      s += rect(x, 40 + i * 44, 80, 40, C.sunL, { r: 0, w: 0.8, s: C.grey }) + t(x + 40, 64 + i * 44, r[0], { a: 'middle', s: 10, b: 1 }) +
        rect(x + 80, 40 + i * 44, 160 - 44, 40, '#fff', { r: 0, w: 0.8, s: C.grey }) + t(x + 80 + 58, 56 + i * 44, r[1], { a: 'middle', s: 7.5, c: C.violet }) + t(x + 80 + 58, 72 + i * 44, r[2], { a: 'middle', s: 11, b: 1, c: i === 3 ? C.green : C.ink });
    });
    return svg('0 0 460 240', 'Bảng tổng hợp thu chi gia đình', s);
  };

  const bar13a2 = () => {
    const d = [['Ăn uống', 4200], ['Học tập', 1300], ['Đi lại', 800], ['Giải trí', 600]], max = 4500, H = 140, x0 = 60;
    let s = line(x0, 20, x0, 20 + H, C.ink, 2) + line(x0, 20 + H, 440, 20 + H, C.ink, 2);
    [0, 1500, 3000, 4500].forEach((v) => { const y = 20 + H - (v / max) * H; s += line(x0 - 4, y, x0, y, C.ink, 1.5) + t(x0 - 8, y + 3, v, { a: 'end', s: 9 }) + (v ? line(x0, y, 440, y, C.greyL, 1) : ''); });
    d.forEach((r, i) => { const h = (r[1] / max) * H, x = x0 + 24 + i * 88; s += rect(x, 20 + H - h, 52, h, [C.pen, C.teal, C.violet, C.red][i], { r: 3, w: 1.5 }) + t(x + 26, 20 + H - h - 5, r[1], { a: 'middle', s: 10, b: 1 }) + t(x + 26, 20 + H + 16, r[0], { a: 'middle', s: 10 }); });
    return svg('0 0 460 200', 'Biểu đồ cột chi tiêu theo từng khoản', s + t(230, 196, 'Chi tiêu theo khoản (nghìn đồng) / Spending by item', { a: 'middle', s: 9.5, i: 1 }));
  };

  const ps14a = () => {
    const st = [['1. Xác định vấn đề', 'Identify the problem', C.penL], ['2. Tìm cách giải', 'Find solutions', C.tealL], ['3. Chọn và thiết kế', 'Choose and design', C.sunL], ['4. Thực hiện', 'Carry out', C.greenL], ['5. Kiểm tra, đánh giá', 'Test and evaluate', C.violetL]];
    let s = '';
    st.forEach((r, i) => { const x = 8 + i * 90; s += rect(x, 50, 80, 76, r[2], { r: 10 }) + bil(x + 40, 82, r[0].split('. ')[0] + '.', '', { a: 'middle', s: 14 }) + t(x + 40, 76, r[0].replace(/^\d\. /, '').slice(0, 14), { a: 'middle', s: 9, b: 1 }) + t(x + 40, 100, r[1].slice(0, 16), { a: 'middle', s: 8, i: 1 }); if (i < 4) s += arrow(x + 80, 88, x + 90, 88); });
    s += '<path d="M410 126 Q410 168 250 168 Q90 168 50 128" fill="none" stroke="' + C.red + '" stroke-width="2" stroke-dasharray="5 4"/><polygon points="50,128 46,142 58,136" fill="' + C.red + '"/>' + bil(230, 156, 'Chưa đạt: quay lại và điều chỉnh', 'Not good enough: go back and adjust', { a: 'middle', s: 10, c: C.red });
    return svg('0 0 460 190', 'Năm bước giải quyết vấn đề', s);
  };

  const ipo15a = () => svg('0 0 460 170', 'Bài toán tin học gồm đầu vào, xử lí và đầu ra',
    rect(14, 40, 120, 80, C.penL, { r: 10 }) + bil(74, 76, 'Đầu vào', 'Input', { a: 'middle', s: 14 }) + t(74, 108, 'dữ liệu cho trước', { a: 'middle', s: 9 }) +
    arrow(134, 80, 170, 80) + rect(170, 30, 120, 100, C.sunL, { r: 10 }) + bil(230, 72, 'Xử lí', 'Process', { a: 'middle', s: 14 }) + t(230, 104, 'thuật toán', { a: 'middle', s: 9 }) + t(230, 116, 'algorithm', { a: 'middle', s: 8.5, i: 1 }) +
    arrow(290, 80, 326, 80) + rect(326, 40, 120, 80, C.greenL, { r: 10 }) + bil(386, 76, 'Đầu ra', 'Output', { a: 'middle', s: 14 }) + t(386, 108, 'kết quả cần tìm', { a: 'middle', s: 9 }) +
    t(230, 156, 'Ví dụ: dãy số 4, 9, 2  →  tìm số lớn nhất  →  9', { a: 'middle', s: 11, b: 1 }));

  const flow15b = () => svg('0 0 460 250', 'Sơ đồ khối tìm số lớn nhất trong ba số',
    oval(90, 22, 100, 30, C.greyL) + t(90, 27, 'Bắt đầu', { a: 'middle', s: 11, b: 1 }) + arrow(90, 37, 90, 56) +
    '<polygon points="30,56 150,56 140,86 20,86" fill="' + C.penL + '" stroke="' + C.ink + '" stroke-width="2"/>' + t(85, 76, 'Nhập a, b, c', { a: 'middle', s: 11 }) + arrow(85, 86, 85, 106) +
    rect(25, 106, 120, 30, C.sunL, { r: 4 }) + t(85, 126, 'max ← a', { a: 'middle', s: 12, b: 1 }) + arrow(85, 136, 85, 160) +
    dia(85, 186, 130, 54, C.tealL) + t(85, 184, 'b > max ?', { a: 'middle', s: 11, b: 1 }) + t(85, 198, 'c > max ?', { a: 'middle', s: 8, i: 1 }) +
    arrow(150, 186, 230, 186, C.green) + t(190, 180, 'Đúng', { a: 'middle', s: 9, c: C.green, b: 1 }) +
    rect(230, 166, 130, 40, C.sunL, { r: 4 }) + t(295, 183, 'max ← giá trị', { a: 'middle', s: 11, b: 1 }) + t(295, 197, 'lớn hơn', { a: 'middle', s: 9 }) +
    arrow(85, 213, 85, 230, C.red) + t(96, 226, 'Sai', { s: 9, c: C.red, b: 1 }) + line(295, 206, 295, 232, C.ink, 2) + line(295, 232, 150, 232, C.ink, 2) +
    '<polygon points="30,230 160,230 150,248 20,248" fill="' + C.greenL + '" stroke="' + C.ink + '" stroke-width="2"/>' + t(90, 243, 'Đưa ra max', { a: 'middle', s: 10.5 }) +
    t(280, 40, 'Ý tưởng: lấy số đầu làm “max”,', { s: 11, b: 1 }) + t(280, 54, 'so sánh lần lượt với các số còn lại;', { s: 11, b: 1 }) + t(280, 68, 'số nào lớn hơn thì thay vào max.', { s: 11, b: 1 }) +
    t(280, 90, 'Idea: take the first number as “max”,', { s: 9.5, i: 1 }) + t(280, 103, 'compare it with the others and replace', { s: 9.5, i: 1 }) + t(280, 116, 'max whenever a number is greater.', { s: 9.5, i: 1 }));

  const flow16a = () => svg('0 0 460 250', 'Sơ đồ khối chương trình tính tiền điện theo hai mức giá',
    oval(120, 20, 110, 28, C.greyL) + t(120, 25, 'Bắt đầu', { a: 'middle', s: 11, b: 1 }) + arrow(120, 34, 120, 52) +
    '<polygon points="55,52 185,52 175,78 45,78" fill="' + C.penL + '" stroke="' + C.ink + '" stroke-width="2"/>' + t(115, 70, 'Nhập số kWh = k', { a: 'middle', s: 11 }) + arrow(115, 78, 115, 98) +
    dia(115, 128, 150, 60, C.sunL) + t(115, 126, 'k ≤ 50 ?', { a: 'middle', s: 12, b: 1 }) +
    arrow(190, 128, 262, 128, C.green) + t(226, 121, 'Đúng', { a: 'middle', s: 9, b: 1, c: C.green }) + rect(262, 108, 170, 40, C.greenL, { r: 4 }) + t(347, 132, 'tien ← k × 1800', { a: 'middle', s: 12, b: 1 }) +
    arrow(115, 158, 115, 180, C.red) + t(126, 172, 'Sai', { s: 9, b: 1, c: C.red }) + rect(25, 180, 180, 40, C.redL, { r: 4 }) + t(115, 197, 'tien ← 50×1800', { a: 'middle', s: 11, b: 1 }) + t(115, 212, '+ (k−50)×2000', { a: 'middle', s: 11, b: 1 }) +
    line(347, 148, 347, 238, C.ink, 2) + line(205, 200, 240, 200, C.ink, 2) + line(240, 200, 240, 238, C.ink, 2) + line(115, 220, 115, 238, C.ink, 2) + line(115, 238, 347, 238, C.ink, 2) +
    t(380, 215, 'Đưa ra tien', { a: 'middle', s: 11, b: 1 }) + t(380, 229, '(rồi Kết thúc)', { a: 'middle', s: 9, i: 1 }));

  const job17a = () => {
    const J = [['Phát triển phần mềm', 'Software development', C.penL], ['Mạng và an toàn thông tin', 'Networks and security', C.tealL], ['Dữ liệu và trí tuệ nhân tạo', 'Data and AI', C.violetL], ['Thiết kế số', 'Digital design', C.sunL], ['Giáo dục và hỗ trợ', 'Education and support', C.greenL], ['Nghề khác dùng tin học', 'Other jobs using IT', C.redL]];
    let s = '<circle cx="230" cy="105" r="44" fill="' + C.ink + '"/>' + t(230, 102, 'Tin học', { a: 'middle', s: 14, b: 1, c: '#fff' }) + t(230, 118, 'Informatics', { a: 'middle', s: 9.5, i: 1, c: '#fff' });
    J.forEach((j, i) => { const col = i % 2, row = (i / 2) | 0, x = col ? 296 : 14, y = 14 + row * 66; s += line(col ? 296 : 170, y + 24, col ? 262 : 198, 105, C.grey, 2) + rect(x, y, 150, 48, j[2], { r: 10 }) + bil(x + 75, y + 20, j[0], j[1], { a: 'middle', s: 10 }); });
    return svg('0 0 460 210', 'Các nhóm nghề liên quan đến tin học', s);
  };

  Object.assign(T.art, { if12a1, fam13a1, bar13a2, ps14a, ipo15a, flow15b, flow16a, job17a });
})();
