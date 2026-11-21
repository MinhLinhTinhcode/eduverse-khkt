/* ==========================================================================
   HÌNH VẼ — TIN HỌC 9, CHỦ ĐỀ 2 (Bài 2, Bài 3)
   Bản vẽ lại bằng SVG (không phải ảnh chụp của sách). Chữ trong hình: dòng
   Việt đậm, dòng Anh nghiêng (class "en").
     school21  Hình 2.1  trang web giới thiệu một trường THPT
     qmap22    Hình 2.2  bốn tiêu chí đánh giá chất lượng thông tin
     search31  Hình 3.1  kết quả tìm kiếm với từ khoá
     ai32      Hình 3.2  công cụ hội thoại thông minh
     web33     Hình 3.3  địa chỉ trang web của Sở Giáo dục và Đào tạo
   ========================================================================== */
(function () {
  'use strict';
  const T = window.TEXTBOOK = window.TEXTBOOK || {};
  T.art = T.art || {};
  const C = {
    pen: '#1f46d0', penL: '#dbe4ff', penXL: '#eef2ff', teal: '#0aa39a', tealL: '#d6f4ef',
    red: '#e0393e', redL: '#ffe3e4', sun: '#ffe24a', sunL: '#fff6bf', violet: '#6c4be8',
    violetL: '#e9e3ff', green: '#2fbf7a', greenL: '#dcf5e4', ink: '#14224a', grey: '#9aa8c7', greyL: '#e8edf9'
  };
  const svg = (vb, label, inner) =>
    '<svg class="art" viewBox="' + vb + '" role="img" aria-label="' + label + '" xmlns="http://www.w3.org/2000/svg">' + inner + '</svg>';
  const rect = (x, y, w, h, fill, o) => {
    o = o || {};
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (o.r == null ? 6 : o.r) + '" fill="' + fill +
      '" stroke="' + (o.s || C.ink) + '" stroke-width="' + (o.w == null ? 2 : o.w) + '"/>';
  };
  const t = (x, y, s, o) => {
    o = o || {};
    return '<text x="' + x + '" y="' + y + '" text-anchor="' + (o.a || 'start') + '" style="font-size:' + (o.s || 12) + 'px" font-weight="' + (o.b ? 700 : 400) + '" fill="' + (o.c || C.ink) + '"' + (o.i ? ' class="en"' : '') + '>' + s + '</text>';
  };
  const bil = (x, y, vi, en, o) => {
    o = o || {};
    const s = o.s || 12;
    return t(x, y, vi, { a: o.a, s: s, b: 1, c: o.c }) + t(x, y + s + 2, en, { a: o.a, s: s - 1.5, i: 1, c: o.c });
  };
  const line = (x1, y1, x2, y2, c, w) =>
    '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (c || C.grey) + '" stroke-width="' + (w || 2) + '" stroke-linecap="round"/>';
  const browser = (x, y, w, h, url) =>
    rect(x, y, w, h, '#fff') + rect(x, y, w, 24, C.greyL, { r: 6 }) +
    '<circle cx="' + (x + 12) + '" cy="' + (y + 12) + '" r="3.5" fill="' + C.red + '"/>' +
    '<circle cx="' + (x + 24) + '" cy="' + (y + 12) + '" r="3.5" fill="' + C.sun + '"/>' +
    '<circle cx="' + (x + 36) + '" cy="' + (y + 12) + '" r="3.5" fill="' + C.green + '"/>' +
    rect(x + 50, y + 5, w - 62, 14, '#fff', { r: 7, w: 1.2 }) + t(x + 58, y + 15.5, url, { s: 9, c: C.ink });

  /* ---------- Hình 2.1 ---------- */
  const school21 = () => svg('0 0 360 220', 'Trang web giới thiệu một trường THPT',
    browser(10, 10, 340, 200, 'truong-thpt-minh-khai.example') +
    rect(24, 44, 312, 34, C.pen, { r: 4, w: 0 }) +
    t(180, 66, 'TRƯỜNG THPT MINH KHAI', { a: 'middle', s: 15, b: 1, c: '#fff' }) +
    rect(24, 88, 120, 78, C.sunL, { r: 4 }) +
    '<path d="M34 156 L64 118 L84 140 L104 122 L134 156 Z" fill="' + C.green + '" stroke="' + C.ink + '" stroke-width="1.5"/><circle cx="116" cy="106" r="8" fill="' + C.sun + '" stroke="' + C.ink + '" stroke-width="1.5"/>' +
    t(158, 102, 'Môi trường học tập hiện đại', { s: 11, b: 1 }) +
    t(158, 116, 'Modern learning environment', { s: 9.5, i: 1 }) +
    t(158, 134, 'Nhiều hoạt động ngoại khoá', { s: 11, b: 1 }) +
    t(158, 148, 'Many extracurricular activities', { s: 9.5, i: 1 }) +
    t(158, 166, 'Đội ngũ giáo viên tận tâm', { s: 11, b: 1 }) +
    t(158, 180, 'Dedicated teachers', { s: 9.5, i: 1 }) +
    rect(24, 176, 120, 22, C.greenL, { r: 11, w: 1.2 }) + t(84, 191, 'Xem thêm / More', { a: 'middle', s: 10, b: 1 }));

  /* ---------- Hình 2.2 ---------- */
  const qmap22 = () => {
    const box = (x, y, col, vi, en, d1, d2) =>
      rect(x, y, 170, 70, col) + bil(x + 85, y + 22, vi, en, { a: 'middle', s: 13 }) +
      t(x + 85, y + 54, d1, { a: 'middle', s: 9.5, c: C.ink }) + t(x + 85, y + 65, d2, { a: 'middle', s: 9, i: 1, c: C.ink });
    return svg('0 0 400 230', 'Bốn tiêu chí đánh giá chất lượng thông tin',
      line(200, 100, 105, 62, C.grey, 2.5) + line(200, 100, 295, 62, C.grey, 2.5) +
      line(200, 130, 105, 168, C.grey, 2.5) + line(200, 130, 295, 168, C.grey, 2.5) +
      '<ellipse cx="200" cy="115" rx="68" ry="30" fill="' + C.pen + '" stroke="' + C.ink + '" stroke-width="2"/>' +
      t(200, 111, 'Chất lượng', { a: 'middle', s: 13, b: 1, c: '#fff' }) + t(200, 125, 'thông tin', { a: 'middle', s: 13, b: 1, c: '#fff' }) +
      box(10, 8, C.sunL, 'Tính mới', 'Up to date', 'Thông tin có cũ không?', 'Is it outdated?') +
      box(220, 8, C.tealL, 'Tính chính xác', 'Accuracy', 'Có kiểm chứng được không?', 'Can it be verified?') +
      box(10, 152, C.violetL, 'Tính đầy đủ', 'Completeness', 'Có cái nhìn tổng thể không?', 'Does it show the whole picture?') +
      box(220, 152, C.redL, 'Tính sử dụng được', 'Usability', 'Có liên quan đến vấn đề không?', 'Is it relevant to the problem?'));
  };

  /* ---------- Hình 3.1 ---------- */
  const search31 = () => {
    const res = (y, title, url, snip) =>
      t(26, y, title, { s: 11.5, b: 1, c: C.pen }) + t(26, y + 12, url, { s: 9, c: C.green }) + t(26, y + 24, snip, { s: 9, c: C.ink });
    return svg('0 0 380 240', 'Kết quả tìm kiếm với từ khoá Olympic Tin học 2023 tỉnh Phú Thọ',
      browser(8, 8, 364, 224, 'may-tim-kiem.example/search') +
      rect(26, 40, 280, 22, '#fff', { r: 11, w: 1.5 }) + t(38, 55, 'Olympic Tin học 2023 tỉnh Phú Thọ', { s: 10.5 }) +
      rect(314, 40, 40, 22, C.pen, { r: 11, w: 0 }) +
      '<circle cx="332" cy="50" r="5" fill="none" stroke="#fff" stroke-width="2"/>' + line(336, 54, 341, 59, '#fff', 2) +
      res(84, 'Kết quả Olympic Tin học 2023 – Phú Thọ', 'phutho.edu.vn › olympic-2023', 'Danh sách học sinh đạt giải theo từng trường…') +
      res(130, 'Thành tích Tin học của các trường THPT', 'truong-a.example › thanh-tich', 'Học sinh của trường đạt nhiều giải cấp tỉnh…') +
      res(176, 'Bài viết về kì thi Olympic 2023', 'tin-tuc.example › giao-duc', 'Bình luận về kì thi và các trường nổi bật…') +
      t(26, 226, 'Search results / Kết quả tìm kiếm', { s: 9, i: 1, c: C.grey }));
  };

  /* ---------- Hình 3.2 ---------- */
  const ai32 = () => {
    return svg('0 0 420 230', 'Công cụ hội thoại thông minh trả lời tên các trường THPT gần Vĩnh Tường, Phú Thọ',
      rect(8, 8, 404, 214, '#fff') + rect(8, 8, 404, 26, C.violetL, { r: 6 }) +
      t(22, 26, 'Công cụ hội thoại thông minh', { s: 12, b: 1 }) + t(232, 26, 'Smart chat tool', { s: 10.5, i: 1 }) +
      rect(130, 44, 270, 36, C.penL, { r: 10 }) +
      t(142, 60, 'Hãy cho biết tên các trường THPT gần', { s: 10.5 }) + t(142, 73, 'Vĩnh Tường, Phú Thọ', { s: 10.5 }) +
      rect(20, 92, 380, 124, C.greyL, { r: 10 }) +
      t(32, 112, 'Một số trường THPT gần Vĩnh Tường:', { s: 10.5, b: 1 }) +
      t(32, 130, '1. Trường THPT Vĩnh Tường', { s: 10.5 }) +
      t(32, 146, '2. Trường THPT Trần Phú', { s: 10.5 }) +
      t(32, 162, '3. Trường THPT Nguyễn Viết Xuân', { s: 10.5 }) +
      t(32, 182, 'Em nên kiểm tra lại trên trang web của Sở', { s: 9.5, i: 0, c: C.red }) +
      t(32, 195, 'Giáo dục và Đào tạo.', { s: 9.5, c: C.red }) +
      t(32, 209, 'Verify on the Department of Education website.', { s: 8.5, i: 1, c: C.red }));
  };

  /* ---------- Hình 3.3 ---------- */
  const web33 = () => svg('0 0 380 120', 'Địa chỉ trang web của Sở Giáo dục và Đào tạo Phú Thọ',
    browser(8, 8, 364, 104, 'phutho.edu.vn') +
    rect(24, 42, 332, 26, C.pen, { r: 4, w: 0 }) + t(190, 60, 'SỞ GIÁO DỤC VÀ ĐÀO TẠO PHÚ THỌ', { a: 'middle', s: 13, b: 1, c: '#fff' }) +
    t(24, 88, 'Thông báo tuyển sinh lớp 10 · Văn bản chỉ đạo', { s: 10 }) +
    t(24, 102, 'Admissions to Grade 10 · Official documents', { s: 9, i: 1 }) +
    '<path d="M62 12 H92" stroke="' + C.green + '" stroke-width="0"/>' +
    t(280, 102, 'edu.vn ✓', { s: 11, b: 1, c: C.green }));


  /* ---------- Hình 4.1 ---------- */
  const theft41 = () => svg('0 0 360 200', 'Thông tin số có thể bị đánh cắp',
    rect(110, 40, 140, 96, '#1b2547') + rect(120, 50, 120, 70, C.penXL, { w: 1.5 }) +
    rect(166, 136, 28, 14, C.grey, { r: 2, w: 1.5 }) + rect(140, 150, 80, 8, C.grey, { r: 3, w: 1.5 }) +
    '<rect x="162" y="64" width="36" height="28" rx="4" fill="' + C.red + '" stroke="' + C.ink + '" stroke-width="2"/>' +
    '<path d="M168 64 v-9 a12 12 0 0 1 24 0 v9" fill="none" stroke="' + C.ink + '" stroke-width="3"/>' +
    '<circle cx="180" cy="78" r="4" fill="#fff"/>' +
    line(130, 106, 230, 106, C.grey, 3) + line(130, 114, 200, 114, C.grey, 3) +
    '<path d="M270 30 q-30 -6 -48 20" fill="none" stroke="' + C.ink + '" stroke-width="3" stroke-linecap="round"/>' +
    rect(262, 18, 50, 24, C.sunL, { r: 12 }) + t(287, 34, 'Tin tặc', { a: 'middle', s: 11, b: 1 }) +
    rect(18, 84, 66, 40, C.sunL) + t(51, 102, 'Thẻ / Card', { a: 'middle', s: 10, b: 1 }) + line(26, 112, 76, 112, C.ink, 2) +
    rect(276, 96, 66, 40, C.greenL) + t(309, 114, 'Mật khẩu', { a: 'middle', s: 10, b: 1 }) + t(309, 127, 'Password', { a: 'middle', s: 9, i: 1 }) +
    line(86, 100, 110, 94, C.red, 2.5) + line(274, 112, 252, 100, C.red, 2.5) +
    bil(180, 182, 'Dữ liệu số bị đánh cắp', 'Digital data is stolen', { a: 'middle', s: 12, c: C.red }));

  /* ---------- Hình 4.2 ---------- */
  const tree42 = () => {
    const items = [
      ['Chia sẻ nội dung sai', 'sự thật, không phù hợp', 'Sharing false or', 'unsuitable content'],
      ['Làm lộ thông tin', 'cá nhân, tổ chức', 'Leaking personal or', 'organisation information'],
      ['Gửi thư rác,', 'tin nhắn rác', 'Sending spam', 'and junk messages'],
      ['Dùng dữ liệu của người', 'khác không xin phép', 'Using other people’s', 'data without permission'],
      ['Dùng phần mềm', 'không có bản quyền', 'Using software', 'without a licence'],
      ['Bắt nạt qua mạng', '', 'Cyberbullying', ''],
      ['Lừa đảo qua mạng', '', 'Online fraud', ''],
      ['Ứng xử thiếu văn hoá', '', 'Uncultured behaviour', '']
    ];
    let inner = rect(10, 8, 480, 46, C.penL) + t(250, 28, 'Một số hành vi vi phạm pháp luật, trái đạo đức, thiếu văn hoá', { a: 'middle', s: 12, b: 1 }) +
      t(250, 45, 'Some acts that break the law, are unethical or lack culture', { a: 'middle', s: 10.5, i: 1 }) +
      line(250, 54, 250, 70, C.ink, 2) + line(68, 70, 432, 70, C.ink, 2);
    items.forEach((it, i) => {
      const col = i % 4, row = Math.floor(i / 4);
      const x = 10 + col * 122, y = 82 + row * 78, cx = x + 56;
      if (row === 0) inner += line(cx, 70, cx, 82, C.ink, 2);
      inner += rect(x, y, 112, 66, C.sunL, { r: 8, w: 1.5 });
      if (it[1]) inner += t(cx, y + 17, it[0], { a: 'middle', s: 9, b: 1 }) + t(cx, y + 29, it[1], { a: 'middle', s: 9, b: 1 });
      else inner += t(cx, y + 23, it[0], { a: 'middle', s: 9.5, b: 1 });
      inner += t(cx, y + 46, it[2], { a: 'middle', s: 8.5, i: 1 }) + (it[3] ? t(cx, y + 58, it[3], { a: 'middle', s: 8.5, i: 1 }) : '');
    });
    return svg('0 0 500 240', 'Sơ đồ một số hành vi vi phạm pháp luật, trái đạo đức, thiếu văn hoá trong môi trường số', inner);
  };


  /* ---------- Hình 5.1 ---------- */
  const mix51 = () => {
    const dots = [['#ffd23f', 'Vàng', 'Yellow'], ['#ff5a36', 'Đỏ', 'Red'], ['#e2399b', 'Hồng sẫm', 'Magenta'], ['#1f5fd0', 'Lam', 'Blue'], ['#5fd0e0', 'Xanh lơ', 'Cyan'], ['#3fb950', 'Lục', 'Green'], ['#ffffff', 'Trắng', 'White'], ['#111111', 'Đen', 'Black']];
    let inner = rect(8, 8, 344, 204, '#fff') + rect(8, 8, 344, 112, '#d38bc8') +
      rect(20, 18, 54, 16, '#fff', { r: 8, w: 1 }) + t(47, 30, 'TOUR', { a: 'middle', s: 8 }) +
      t(30, 60, '#FF80D5', { s: 12, b: 1, c: '#fff' }) +
      rect(150, 112, 200, 6, '#e2399b', { r: 0, w: 0 }) +
      rect(8, 120, 344, 92, '#2a3442', { r: 6, w: 2 });
    dots.forEach((d, i) => {
      const cx = 36 + i * 40;
      inner += '<circle cx="' + cx + '" cy="154" r="14" fill="' + d[1 - 1] + '" stroke="' + (i === 6 ? C.grey : C.ink) + '" stroke-width="1.5"/>' +
        t(cx, 184, d[1], { a: 'middle', s: 7, c: '#fff' });
    });
    inner += t(180, 204, 'Mô phỏng pha màu / Colour-mixing simulator', { a: 'middle', s: 9, i: 1, c: '#fff' });
    return svg('0 0 360 220', 'Phần mềm mô phỏng pha màu', inner);
  };

  /* ---------- Hình 5.2 ---------- */
  const circuit52 = () => {
    const bulb = (x, y, on) => '<circle cx="' + x + '" cy="' + y + '" r="14" fill="' + (on ? C.sun : '#fff') + '" stroke="' + C.ink + '" stroke-width="2"/>' +
      rect(x - 6, y + 12, 12, 8, C.grey, { r: 2, w: 1.5 }) + (on ? [0, 1, 2, 3, 4, 5, 6, 7].map(k => line(x + Math.cos(k * Math.PI / 4) * 18, y + Math.sin(k * Math.PI / 4) * 18, x + Math.cos(k * Math.PI / 4) * 26, y + Math.sin(k * Math.PI / 4) * 26, C.sunD || '#f2b705', 2)).join('') : '');
    const batt = (x, y) => rect(x, y, 46, 14, C.ink, { r: 3, w: 1.5 }) + rect(x + 30, y, 16, 14, '#f0a030', { r: 3, w: 1.5 }) + t(x + 22, y - 4, '9.0 V', { a: 'middle', s: 8 });
    const wire = (x1, y1, x2, y2) => line(x1, y1, x2, y2, '#b87050', 4);
    const panel = (x, title, vi, en, body) => rect(x, 8, 118, 118, '#cfe5f6', { r: 4, w: 1.5 }) + body + t(x + 59, 142, vi, { a: 'middle', s: 9, b: 1 }) + t(x + 59, 154, en, { a: 'middle', s: 8.5, i: 1 });
    const a = panel(8, 'a', 'a) Linh kiện để lắp mạch', 'Parts to build a circuit', bulb(40, 36, false) + wire(66, 58, 106, 58) + batt(16, 100) + rect(76, 100, 36, 12, C.grey, { r: 3, w: 1.5 }));
    const b = panel(134, 'b', 'b) Mạch điện đơn giản', 'A simple circuit', wire(150, 40, 150, 106) + wire(150, 106, 230, 106) + wire(150, 40, 220, 40) + wire(220, 40, 220, 106) + bulb(186, 40, false) + batt(150, 100));
    const c = panel(260, 'c', 'c) Công tắc được bật', 'The switch is on', wire(276, 40, 276, 106) + wire(276, 106, 356, 106) + wire(276, 40, 346, 40) + wire(346, 40, 346, 106) + bulb(312, 40, true) + batt(276, 100));
    return svg('0 0 384 164', 'Thí nghiệm ảo lắp ráp mạch điện đơn giản', a + b + c);
  };

  /* ---------- Hình 5.3 ---------- */
  const cups53 = () => {
    const cup = (x, fill, mark) => '<path d="M' + x + ' 40 h60 l-8 70 h-44 z" fill="#fff" stroke="' + C.ink + '" stroke-width="2.5" stroke-linejoin="round"/>' +
      (fill ? '<path d="M' + (x + 4) + ' 84 h52 l-3 26 h-46 z" fill="' + fill + '"/>' : '') +
      rect(x - 4, 30, 68, 12, fill || '#fff', { r: 6, w: 2 }) +
      (mark ? t(x + 30, 88, '?', { a: 'middle', s: 30, b: 1 }) : line(x + 36, 4, x + 24, 56, '#8a4b2a', 6));
    return svg('0 0 340 150',
      'Pha màu: xanh lơ cộng vàng bằng gì', cup(20, '#2fb9d6') + t(110, 90, '+', { a: 'middle', s: 34, b: 1 }) +
      cup(130, '#ffd23f') + t(220, 90, '=', { a: 'middle', s: 34, b: 1 }) + cup(250, null, true) +
      bil(50, 134, 'Cyan', 'Xanh lơ', { a: 'middle', s: 10 }) + bil(160, 134, 'Yellow', 'Vàng', { a: 'middle', s: 10 }));
  };


  /* ---------- Bài 6 ---------- */
  const lang61 = () => svg('0 0 200 80', 'Chọn ngôn ngữ hiển thị là Tiếng Việt',
    rect(30, 14, 140, 24, C.pen, { r: 2, w: 1.5 }) + t(40, 31, 'Tiếng Việt', { s: 13, c: '#fff' }) +
    rect(30, 38, 140, 24, '#fff', { r: 2, w: 1.5 }) + t(40, 55, 'English', { s: 13 }) + t(152, 55, '⌄', { s: 12 }));
  const menu62 = () => {
    const rows = ['Tất cả các Sim', 'Vật lý', 'Hoá học', 'Toán', 'Khoa học Trái đất', 'Sinh học'];
    let inner = rect(20, 6, 160, 146, '#fff', { r: 2, w: 1.5 }) + rect(30, 12, 90, 20, '#fff', { r: 2, w: 1.5, s: C.red }) + t(75, 27, 'CÁC MÔ PHỎNG', { a: 'middle', s: 9.5, c: C.red }) + line(30, 40, 170, 40, C.red, 1.5);
    rows.forEach((r, i) => { inner += t(40, 58 + i * 16, r, { s: 10.5, c: i === 2 ? C.red : C.ink, b: i === 2 }); });
    return svg('0 0 200 160', 'Chọn lĩnh vực hoá học', inner);
  };
  const sim63 = () => svg('0 0 220 160', 'Chọn nội dung mô phỏng',
    rect(6, 6, 208, 110, '#f6efc0', { r: 2, w: 1.5 }) + rect(6, 92, 208, 24, '#c9a977', { r: 0, w: 0 }) +
    rect(70, 36, 36, 46, '#dff1fb', { r: 4, w: 1.5 }) + rect(118, 56, 22, 26, '#c33', { r: 3, w: 1.5 }) + rect(170, 66, 30, 26, '#f1c54a', { r: 3, w: 1.5 }) + rect(20, 70, 22, 22, '#ddd', { r: 2, w: 1.5 }) +
    t(110, 133, 'Năng lượng: các dạng', { a: 'middle', s: 10.5 }) + t(110, 147, 'và sự chuyển hoá', { a: 'middle', s: 10.5 }));
  const energy64 = () => svg('0 0 420 200', 'Mô phỏng một số dạng năng lượng và sự chuyển hoá năng lượng',
    rect(6, 6, 408, 188, '#fbf3cc', { r: 2, w: 1.5 }) +
    '<circle cx="62" cy="134" r="22" fill="none" stroke="' + C.ink + '" stroke-width="3"/><circle cx="120" cy="134" r="22" fill="none" stroke="' + C.ink + '" stroke-width="3"/>' +
    line(62, 134, 84, 96, C.pen, 3.5) + line(84, 96, 120, 134, C.pen, 3.5) + line(78, 90, 92, 90, C.ink, 4) +
    '<circle cx="82" cy="62" r="11" fill="' + C.skin + '" stroke="' + C.ink + '" stroke-width="2"/><path d="M71 58 a12 12 0 0 1 22 0 z" fill="' + C.red + '" stroke="' + C.ink + '" stroke-width="2"/>' +
    line(82, 73, 86, 98, C.teal, 6) +
    line(130, 110, 200, 74, C.ink, 2, ) +
    rect(180, 40, 110, 98, '#aeb6bf', { r: 8 }) + '<circle cx="235" cy="76" r="30" fill="#d9822b" stroke="' + C.ink + '" stroke-width="2.5"/>' +
    [0, 1, 2, 3, 4, 5].map(k => line(235, 76, 235 + Math.cos(k * Math.PI / 3) * 28, 76 + Math.sin(k * Math.PI / 3) * 28, C.ink, 2)).join('') +
    t(235, 128, 'Máy phát điện', { a: 'middle', s: 9.5 }) +
    '<path d="M290 112 h26 q10 0 10 -10 v-10" fill="none" stroke="#333" stroke-width="9"/>' +
    rect(300, 30, 62, 64, '#e8f1f6', { r: 4 }) + t(331, 64, 'Nước', { a: 'middle', s: 10 }) + t(331, 76, 'Water', { a: 'middle', s: 8.5, i: 1 }) +
    rect(372, 34, 28, 58, '#fff', { r: 6, w: 1.5 }) + '<circle cx="386" cy="98" r="8" fill="' + C.red + '"/>' +
    rect(28, 168, 80, 20, '#fff', { r: 6, w: 1.5 }) + t(68, 182, 'Xe đạp / Bike', { a: 'middle', s: 9 }) +
    rect(150, 168, 80, 20, '#fff', { r: 6, w: 1.5 }) + t(190, 182, 'Máy phát / Generator', { a: 'middle', s: 8 }) +
    rect(272, 168, 120, 20, '#fff', { r: 6, w: 1.5 }) + t(332, 182, 'Đun nước / Heating water', { a: 'middle', s: 8 }));
  const ampMeter = (x, y, val) => rect(x, y, 70, 26, '#f08a24', { r: 4, w: 1.5 }) + t(x + 35, y + 11, 'Cường độ', { a: 'middle', s: 7 }) + rect(x + 12, y + 13, 46, 11, '#fff', { r: 2, w: 1 }) + t(x + 35, y + 22, val, { a: 'middle', s: 8 });
  const amp65a = () => svg('0 0 240 170', 'Lắp ampe kế đúng cách',
    rect(6, 6, 228, 158, '#9ccaec', { r: 2, w: 1.5 }) +
    line(30, 30, 30, 120, '#b87050', 5) + line(30, 30, 210, 30, '#b87050', 5) + line(210, 30, 210, 100, '#b87050', 5) + line(30, 120, 80, 120, '#b87050', 5) +
    rect(70, 22, 70, 16, C.ink, { r: 3, w: 1.5 }) + rect(112, 22, 28, 16, '#f0a030', { r: 3, w: 1.5 }) +
    ampMeter(140, 84, '0,90 A') + line(100, 120, 140, 98, '#b87050', 4) +
    '<circle cx="80" cy="134" r="18" fill="' + C.sunL + '" stroke="' + C.ink + '" stroke-width="2"/>' +
    [0, 1, 2, 3, 4, 5, 6, 7].map(k => line(80 + Math.cos(k * Math.PI / 4) * 22, 134 + Math.sin(k * Math.PI / 4) * 22, 80 + Math.cos(k * Math.PI / 4) * 30, 134 + Math.sin(k * Math.PI / 4) * 30, '#f2d84a', 2)).join(''));
  const amp65b = () => svg('0 0 240 170', 'Sự cố khi lắp ampe kế không đúng cách',
    rect(6, 6, 228, 158, '#9ccaec', { r: 2, w: 1.5 }) +
    '<path d="M90 52 q-12 -34 6 -42 q4 20 16 4 q10 18 0 38 z" fill="#f08a24" stroke="#d9400f" stroke-width="2"/>' +
    rect(62, 50, 70, 16, C.ink, { r: 3, w: 1.5 }) + rect(104, 50, 28, 16, '#f0a030', { r: 3, w: 1.5 }) +
    line(66, 66, 54, 126, '#b87050', 5) + line(130, 66, 142, 126, '#b87050', 5) +
    ampMeter(50, 122, '89983,05 A'));
  const star66 = () => {
    const R = 86, cx = 210, cy = 100;
    const V = (k) => [cx + R * Math.cos((90 + 72 * k) * Math.PI / 180), cy - R * Math.sin((90 + 72 * k) * Math.PI / 180)];
    const P = [0, 1, 2, 3, 4].map(V);
    const inter = (a, b, c, d) => {
      const x1 = a[0], y1 = a[1], x2 = b[0], y2 = b[1], x3 = c[0], y3 = c[1], x4 = d[0], y4 = d[1];
      const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
      const px = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / den;
      const py = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / den;
      return [px, py];
    };
    const A = P[1], D = P[4], B = inter(A, D, P[0], P[2]), Cc = inter(A, D, P[0], P[3]);
    const seg = (a, b, c) => line(a[0], a[1], b[0], b[1], c || C.ink, 1.8);
    const pt = (q) => '<circle cx="' + q[0].toFixed(1) + '" cy="' + q[1].toFixed(1) + '" r="2.5" fill="' + C.red + '"/>';
    return { A, B, Cc, D, P, svgFn: (extra) => extra };
  };
  const starGeom = star66();
  const star66art = () => {
    const { A, B, Cc, D, P } = starGeom;
    const seg = (a, b, c, w) => line(a[0], a[1], b[0], b[1], c || C.ink, w || 1.8);
    const pt = (q) => '<circle cx="' + q[0].toFixed(1) + '" cy="' + q[1].toFixed(1) + '" r="2.5" fill="' + C.red + '"/>';
    const d = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]) / 33;
    const lab = (q, s, dx, dy) => t(q[0] + dx, q[1] + dy, s, { a: 'middle', s: 11, b: 1 });
    return svg('0 0 360 220', 'Đo độ dài các đoạn thẳng của ngôi sao năm cánh',
      rect(6, 6, 348, 208, '#fff', { r: 2, w: 1 }) +
      seg(P[0], P[2]) + seg(P[2], P[4]) + seg(P[4], P[1]) + seg(P[1], P[3]) + seg(P[3], P[0]) +
      seg(A, B, C.pen, 3.5) + [A, B, Cc, D, P[0], P[2], P[3]].map(pt).join('') +
      lab(A, 'A', -8, -4) + lab(B, 'B', 0, -7) + lab(Cc, 'C', 4, -7) + lab(D, 'D', 9, -4) +
      t(22, 30, 'mAB = ' + d(A, B).toFixed(2).replace('.', ',') + ' cm', { s: 9 }) + t(22, 44, 'mBC = ' + d(B, Cc).toFixed(2).replace('.', ',') + ' cm', { s: 9 }) +
      t(22, 58, 'mAC = ' + d(A, Cc).toFixed(2).replace('.', ',') + ' cm', { s: 9 }) + t(22, 72, 'mAD = ' + d(A, D).toFixed(2).replace('.', ',') + ' cm', { s: 9 }) +
      t(30, 196, 'P', { s: 11, b: 1 }) + t(100, 196, 'Q', { s: 11, b: 1 }) + line(34, 190, 98, 190, C.pen, 2));
  };
  const calc67 = () => svg('0 0 300 170', 'Tính tỉ lệ các đoạn thẳng',
    rect(6, 6, 288, 158, '#fff', { r: 2, w: 1.2 }) +
    rect(14, 14, 74, 14, '#d19bd8', { r: 1, w: 1 }) + t(18, 25, 'mAB = 2,52 cm', { s: 8 }) + rect(14, 32, 74, 14, '#d19bd8', { r: 1, w: 1 }) + t(18, 43, 'mBC = 1,56 cm', { s: 8 }) +
    t(18, 60, 'mAC = 4,07 cm', { s: 8 }) + t(18, 74, 'mAD = 6,59 cm', { s: 8 }) +
    rect(100, 12, 188, 140, '#e8ecef', { r: 2, w: 1.2 }) + t(110, 25, 'New Calculation', { s: 8 }) +
    rect(108, 32, 172, 40, '#d9dde1', { r: 2, w: 1 }) + t(150, 48, 'mAB', { a: 'middle', s: 10 }) + line(132, 52, 166, 52, C.ink, 1.2) + t(150, 64, 'mBC', { a: 'middle', s: 10 }) + t(190, 56, '= 1,61803', { s: 11 }) +
    rect(108, 78, 172, 18, '#fff', { r: 1, w: 1 }) + t(114, 91, 'mAB / mBC', { s: 9 }) +
    [0, 1, 2].map(r => [0, 1, 2, 3].map(c => rect(108 + c * 24, 102 + r * 14, 20, 11, '#f2f2f2', { r: 1, w: 0.8 })).join('')).join('') +
    rect(180, 134, 44, 14, '#f2f2f2', { r: 1, w: 1 }) + t(202, 144, 'Cancel', { a: 'middle', s: 8 }) + rect(232, 134, 44, 14, '#f2f2f2', { r: 1, w: 1.4 }) + t(254, 144, 'OK', { a: 'middle', s: 8 }));
  const gold68 = () => {
    const { A, B, Cc, D, P } = starGeom;
    const circ = '<circle cx="210" cy="100" r="86" fill="none" stroke="' + C.green + '" stroke-width="1.5" stroke-dasharray="4 3"/>';
    const seg = (a, b, c, w, dash) => '<line x1="' + a[0].toFixed(1) + '" y1="' + a[1].toFixed(1) + '" x2="' + b[0].toFixed(1) + '" y2="' + b[1].toFixed(1) + '" stroke="' + (c || C.ink) + '" stroke-width="' + (w || 1.5) + '"' + (dash ? ' stroke-dasharray="4 3"' : '') + '/>';
    const sx = -100;
    const starSvg = '<g transform="translate(' + (-110) + ',0)">' + circ + seg(P[0], P[2], C.pen, 1.4, 1) + seg(P[2], P[4], C.red, 2.4) + seg(P[4], P[1], C.pen, 1.4, 1) + seg(P[1], P[3], C.red, 2.4) + seg(P[3], P[0], C.pen, 1.4, 1) + seg(A, D, C.pen, 2.4) + seg(Cc, [Cc[0] + 0, Cc[1]], C.green, 1) + '</g>';
    const rx = 250, ry = 20, W = 150, H = 150;
    const w2 = W / 1.618;
    const rectSvg = '<rect x="' + rx + '" y="' + ry + '" width="' + W + '" height="' + (W / 1.618) + '" fill="none" stroke="' + C.pen + '" stroke-width="1.8" stroke-dasharray="5 3"/>';
    return svg('0 0 420 220', 'Ngôi sao năm cánh và hình chữ nhật tỉ lệ vàng',
      starSvg + t(100, 214, 'a) Ngôi sao năm cánh', { a: 'middle', s: 10, b: 1 }) +
      '<rect x="230" y="16" width="170" height="105" fill="none" stroke="' + C.pen + '" stroke-width="2" stroke-dasharray="5 3"/>' +
      '<rect x="230" y="16" width="105" height="105" fill="' + C.penXL + '" stroke="' + C.pen + '" stroke-width="2.4"/>' +
      '<rect x="335" y="16" width="65" height="105" fill="none" stroke="' + C.red + '" stroke-width="2.4"/>' +
      '<rect x="335" y="16" width="65" height="65" fill="none" stroke="' + C.green + '" stroke-width="2"/>' +
      t(282, 74, 'hình vuông', { a: 'middle', s: 10 }) + t(282, 86, 'square', { a: 'middle', s: 9, i: 1 }) +
      t(367, 104, 'chữ nhật', { a: 'middle', s: 9 }) + t(367, 114, 'cùng tỉ lệ vàng', { a: 'middle', s: 8 }) +
      t(315, 214, 'b) Hình chữ nhật tỉ lệ vàng', { a: 'middle', s: 10, b: 1 }) + t(315, 188, '1 : 1,618', { a: 'middle', s: 11, c: C.red }));
  };


  /* ---------- Hình 7.1 ---------- */
  const mind71 = () => {
    const nd = (x, y, w, h, fill, l1, l2) => rect(x, y, w, h, fill, { r: 8, w: 1.5, s: '#e0694f' }) + (l2 ? t(x + w / 2, y + h / 2 - 1, l1, { a: 'middle', s: 10 }) + t(x + w / 2, y + h / 2 + 12, l2, { a: 'middle', s: 10 }) : t(x + w / 2, y + h / 2 + 4, l1, { a: 'middle', s: 10 }));
    const info = (x, y, a, b, c, d) => rect(x, y, 150, 62, '#f2f3f3', { r: 6, w: 1.2, s: C.grey }) + t(x + 75, y + 14, a, { a: 'middle', s: 9 }) + t(x + 75, y + 27, b, { a: 'middle', s: 9 }) + t(x + 75, y + 40, c, { a: 'middle', s: 9 }) + (d ? t(x + 75, y + 53, d, { a: 'middle', s: 8.5, i: 1 }) : '');
    const clip = (x, y) => rect(x, y, 14, 14, '#eee', { r: 2, w: 1 }) + '<path d="M' + (x + 4) + ' ' + (y + 11) + ' v-7 a3 3 0 0 1 6 0 v8" fill="none" stroke="#555" stroke-width="1.4"/>';
    const br = (d) => '<path d="' + d + '" fill="none" stroke="#f08030" stroke-width="3" stroke-linecap="round"/>';
    const lab = (x, y, a, b) => t(x, y, a, { s: 9 }) + (b ? t(x, y + 11, b, { s: 9 }) : '');
    return svg('0 0 700 290', 'Sơ đồ tư duy Triển lãm tin học',
      br('M96 150 C96 80 110 38 150 28') + br('M96 150 C112 146 120 144 132 142') + br('M96 150 C100 210 120 250 150 260') +
      br('M222 140 C236 120 240 112 252 108') + br('M222 146 C236 168 240 188 252 192') +
      br('M362 106 C376 90 380 74 392 66') + br('M362 110 C376 120 380 126 392 130') +
      br('M300 265 C330 265 350 262 370 262') +
      br('M542 66 C556 66 560 66 566 66') + br('M542 118 C550 108 556 102 562 100') + br('M542 136 C550 142 556 150 562 152') +
      rect(14, 128, 82, 46, '#ffe14a', { r: 8, w: 2, s: '#d9a400' }) + t(55, 148, 'Triển lãm', { a: 'middle', s: 12, b: 1 }) + t(55, 163, 'tin học', { a: 'middle', s: 12, b: 1 }) +
      nd(150, 10, 170, 30, '#f9a8a8', 'Sản phẩm công nghệ số') + nd(132, 118, 96, 46, '#f9a8a8', 'Lược sử', 'công cụ tính toán') +
      nd(150, 246, 150, 30, '#f9a8a8', 'Dự kiến thu chi') + nd(252, 180, 124, 26, '#fbd0d0', 'Máy tính điện tử') + nd(252, 94, 112, 26, '#fbd0d0', 'Máy tính cơ học') +
      info(392, 22, '1642 – Blaise Pascal', 'Máy tính cơ học', 'quay tay Pascaline', '') + info(392, 98, '1833 – Charles Babbage', 'Máy tính tự động đa năng', 'Analytical Engine', '') +
      lab(566, 50, 'Đính kèm ảnh', 'Pascaline') + clip(676, 40) +
      lab(566, 92, 'Liên kết đến video', 'giới thiệu dự án') + clip(676, 80) +
      lab(566, 144, 'Đính kèm văn bản', 'tiểu sử của Babbage') + clip(676, 132) +
      t(372, 266, 'Đính kèm bảng tính', { s: 10 }) + clip(480, 254));
  };


  /* ---------- Bài 8 ---------- */
  const sheet81 = () => {
    const rows = [['TT', 'Nội dung', 'Số lượng', 'Đơn giá (VND)', 'Thành tiền'], ['1', 'In ảnh màu kích thước 30 x 45', '8', '8,000', '64,000'], ['2', 'In nội dung chú thích cho ảnh', '8', '1,000', '8,000'], ['3', 'Văn phòng phẩm (bút màu, giấy,…)', '', '', '50,000'], ['', 'Tổng', '', '', '122,000']];
    const cw = [30, 190, 60, 80, 80];
    let inner = rect(6, 6, 468, 150, '#fff', { r: 2, w: 1.2 }) + t(14, 22, 'Chi phí nội dung “Lược sử công cụ tính toán”', { s: 11 });
    rows.forEach((r, i) => {
      let x = 10; const y = 30 + i * 24;
      r.forEach((c, j) => {
        inner += rect(x, y, cw[j], 24, i === 0 ? '#cde6f5' : '#fff', { r: 0, w: 0.8, s: C.grey }) + t(j === 1 ? x + 5 : x + cw[j] - 6, y + 16, c, { a: j === 1 ? 'start' : 'end', s: 9.5, b: i === 4 });
        x += cw[j];
      });
    });
    return svg('0 0 480 162', 'Bảng tính chi phí cho phần nội dung Lược sử công cụ tính toán', inner);
  };
  const ribbon82 = () => {
    const tabs = ['File', 'Home', 'Insert', 'Format', 'View', 'Review'];
    let inner = rect(6, 6, 448, 130, '#cfe3f4', { r: 2, w: 1.5 }) + rect(6, 6, 448, 24, '#fff', { r: 2, w: 0.8 });
    tabs.forEach((x, i) => { inner += t(20 + i * 56, 54, x, { s: 10, b: i === 2, c: i === 0 ? '#fff' : C.ink }); });
    inner += rect(14, 40, 40, 20, '#c43a22', { r: 2, w: 0 }) + t(34, 54, 'File', { a: 'middle', s: 10, c: '#fff' }) + rect(120, 40, 56, 20, '#e8f1fa', { r: 2, w: 1 }) + t(148, 54, 'Insert', { a: 'middle', s: 10, b: 1 });
    ['Topic', 'Subtopic', 'Callout', 'Picture', 'Hyperlink'].forEach((x, i) => { inner += rect(20 + i * 62, 70, 40, 30, '#e8eef4', { r: 3, w: 1 }) + t(40 + i * 62, 116, x, { a: 'middle', s: 8.5 }); });
    inner += rect(334, 64, 66, 44, '#f6a640', { r: 4, w: 1.5, s: '#c77a10' }) + t(367, 118, 'Attachment', { a: 'middle', s: 9, b: 1 }) +
      rect(334, 126, 118, 22, '#f9c76a', { r: 2, w: 1.2 }) + t(344, 141, 'Attachment', { s: 9.5, b: 1 });
    return svg('0 0 460 156', 'Đính kèm tệp vào sơ đồ tư duy', inner);
  };
  const open83 = () => {
    let inner = rect(6, 6, 448, 190, '#fff', { r: 2, w: 1.5 }) + t(16, 22, 'Open', { s: 10, b: 1 }) + rect(16, 30, 300, 16, '#f6f6f6', { r: 2, w: 1 }) + t(24, 42, '« E-TrinhBayThongTin › DuAnTrienLam', { s: 9 });
    ['CharlesBabbage.docx', 'KinhPhi.xlsx', 'LuocSu.emm', 'Pascaline.png'].forEach((f, i) => {
      inner += (i === 3 ? rect(60, 64 + i * 18, 110, 16, '#cde6f5', { r: 2, w: 1, s: C.pen }) : '') + rect(40, 66 + i * 18, 10, 12, '#9bbf85', { r: 1, w: 0.8 }) + t(64, 77 + i * 18, f, { s: 9.5 });
    });
    inner += t(60, 168, 'File name:', { s: 9 }) + rect(110, 158, 150, 16, '#fff', { r: 1, w: 1 }) + t(116, 170, 'Pascaline.png', { s: 9 }) +
      rect(350, 152, 46, 18, '#e6e6e6', { r: 2, w: 1.8 }) + t(373, 165, 'Open', { a: 'middle', s: 9.5 }) + rect(402, 152, 46, 18, '#e6e6e6', { r: 2, w: 1 }) + t(425, 165, 'Cancel', { a: 'middle', s: 9.5 });
    return svg('0 0 460 204', 'Chọn tệp từ thư mục lưu trữ để chèn vào sơ đồ tư duy', inner);
  };
  const link84 = () => svg('0 0 460 214', 'Chèn đường liên kết đến video trên Internet',
    rect(6, 6, 448, 202, '#f4f4f4', { r: 2, w: 1.5 }) + t(14, 22, 'Hyperlink', { s: 10 }) + rect(12, 30, 100, 130, '#a9c7ea', { r: 0, w: 0 }) +
    t(62, 66, 'Web and Exist File', { a: 'middle', s: 8.5 }) + t(62, 106, 'Topic in this Map', { a: 'middle', s: 8.5 }) + t(62, 146, 'E-mail Address', { a: 'middle', s: 8.5 }) +
    t(124, 44, 'Link to:', { s: 9.5 }) + rect(124, 50, 240, 18, '#fff', { r: 1, w: 1 }) + rect(126, 52, 220, 14, C.pen, { r: 0, w: 0 }) + t(130, 63, 'https://www.youtube.com/watch?v=…', { s: 8.5, c: '#fff' }) +
    t(124, 86, 'Topic / Label:', { s: 9.5 }) + rect(124, 92, 240, 18, '#fff', { r: 1, w: 1 }) +
    t(124, 130, 'Store this hyperlink path as:  ○ Relative   ● Absolute', { s: 9 }) +
    rect(310, 178, 66, 22, '#e8e8e8', { r: 2, w: 2, s: C.pen }) + t(343, 193, 'OK', { a: 'middle', s: 10, b: 1 }) + rect(382, 178, 66, 22, '#e8e8e8', { r: 2, w: 1 }) + t(415, 193, 'Cancel', { a: 'middle', s: 10 }) +
    rect(20, 178, 80, 22, '#e8e8e8', { r: 2, w: 1 }) + t(60, 193, 'Remove link', { a: 'middle', s: 9 }));
  const outline85 = () => svg('0 0 400 220', 'Nội dung trang dàn ý',
    rect(6, 6, 388, 208, '#fff', { r: 0, w: 5, s: '#f9b92a' }) + '<path d="M388 130 V208 H300 z" fill="#f9b92a"/>' +
    t(120, 120, 'Nội', { a: 'middle', s: 26 }) + t(120, 150, 'dung', { a: 'middle', s: 26 }) + line(168, 60, 168, 170, C.ink, 1.2) +
    ['1. Mở đầu', '2. Dòng thời gian lược sử công cụ tính toán', '3. Blaise Pascal và máy tính cơ học đầu tiên', '4. Charles Babbage và máy tính đa năng', '5. Các thế hệ máy tính điện tử'].map((x, i) => t(180, 70 + i * 24, x, { s: i === 0 ? 11 : 9.5 })).join(''));
  const timeline86 = () => {
    const pts = [['1642', '#f9b92a', 'Blaise Pascal', 'Máy tính cơ học đầu tiên', 0], ['1833', '#7ccf7c', 'Charles Babbage', 'Máy tính đa năng', 1], ['1945', '#7a9bb0', 'ENIAC', 'Thế hệ thứ nhất (1945–1955)', 0], ['1959', '#2b3fa8', 'IBM 7090', 'Thế hệ thứ hai (1955–1965)', 1], ['1964', '#f04438', 'IBM System/360', 'Thế hệ thứ ba (1965–1974)', 0], ['1973', '#5bb8ea', 'Máy vi tính Micral', 'Thế hệ thứ tư (1974–1990)', 1], ['2007', '#d94aa8', 'iPhone', 'Thế hệ thứ năm (1990–nay)', 0]];
    let inner = rect(6, 6, 468, 214, '#fff', { r: 0, w: 4, s: '#f9b92a' }) + t(24, 36, '2. Dòng thời gian lược sử công cụ tính toán', { s: 15 }) + line(34, 124, 450, 124, '#ccc', 8);
    pts.forEach((p, i) => {
      const x = 44 + i * 64, up = p[4] === 0;
      inner += '<circle cx="' + x + '" cy="124" r="15" fill="#fff" stroke="' + p[1] + '" stroke-width="3"/>' + t(x, 127, p[0], { a: 'middle', s: 8.5 }) +
        line(x, up ? 109 : 139, x, up ? 90 : 158, p[1], 1.5) +
        rect(x - 31, up ? 48 : 158, 62, up ? 40 : 44, '#f6f6f6', { r: 4, w: 0.6, s: '#ddd' }) +
        rect(x - 31, up ? 48 : 192, 62, 12, p[1], { r: 3, w: 0 }) + t(x, up ? 57 : 201, p[2], { a: 'middle', s: 6.5, c: '#fff' }) +
        t(x, up ? 72 : 172, p[3].split(' (')[0], { a: 'middle', s: 6.5 }) + (p[3].includes('(') ? t(x, up ? 82 : 182, '(' + p[3].split(' (')[1], { a: 'middle', s: 6 }) : '');
    });
    return svg('0 0 480 226', 'Sơ đồ dòng thời gian Lược sử công cụ tính toán', inner);
  };


  /* ---------- Bài 9a: bảng tính và hộp thoại ---------- */
  const SALMON = '#fbb9a3', BLUEL = '#a8c0e0', PALE = '#d6e3f4';
  /* o: {title, cols:[[tiêu đề, w]], rows:[[...]], side:{head, items, fill}, drop:{row, items}, tip:[a,b], tabs:[…]} */
  function sheetFig(o) {
    const W = 500, cw = o.cols.map(c => c[1]), x0 = 24, rh = 20, y0 = 40;
    let inner = rect(4, 4, W - 8, 24 + 44 + rh * (o.nrows || 8) + (o.tabs ? 24 : 6), '#fff', { r: 2, w: 1.5 });
    inner += rect(4, 4, W - 8, 16, '#dfe3e6', { r: 0, w: 0.8 }) + t(x0 + 6, 16, 'A', { s: 8 });
    inner += t(x0 + 8, y0 + 12, o.title, { s: 16 });
    let x = x0; const hy = y0 + 22;
    o.cols.forEach((c, j) => {
      inner += rect(x, hy, c[1], rh, '#fff', { r: 0, w: 0.8, s: C.grey }) + t(x + c[1] / 2, hy + 14, c[0], { a: 'middle', s: 9.5, b: 1 });
      x += c[1];
    });
    o.rows.forEach((r, i) => {
      x = x0; const y = hy + rh * (i + 1);
      o.cols.forEach((c, j) => {
        inner += rect(x, y, c[1], rh, '#fff', { r: 0, w: 0.6, s: '#d9dde0' }) + (r[j] ? t(j === o.cols.length - 1 ? x + c[1] - 6 : x + 6, y + 14, r[j], { a: j === o.cols.length - 1 ? 'end' : 'start', s: 9.5 }) : '');
        x += c[1];
      });
    });
    const sx = x0 + cw.reduce((a, b) => a + b, 0) + 14;
    if (o.side) {
      inner += rect(sx, hy - 22, 96, 22, '#fff', { r: 0, w: 0.8, s: C.grey }) + t(sx + 48, hy - 7, o.side.head, { a: 'middle', s: 9.5, b: 1 }) +
        rect(sx, hy, 96, rh * o.side.items.length, o.side.fill, { r: 0, w: 0 });
      o.side.items.forEach((it, i) => { inner += t(sx + 5, hy + 14 + i * rh, it, { s: 8.5 }); });
    }
    if (o.drop) {
      const dy = hy + rh * (o.drop.row + 1);
      inner += rect(x0 + cw[0], dy, cw[1], rh, 'none', { r: 0, w: 1.8, s: '#2a8a4a' }) + rect(x0 + cw[0] - 10, dy + rh, 106, 12 * o.drop.items.length + 6, '#fff', { r: 0, w: 1 });
      o.drop.items.forEach((it, i) => { inner += t(x0 + cw[0] - 4, dy + rh + 12 + i * 12, it, { s: 7.5, c: i === 0 ? '#fff' : C.ink }); });
      inner += rect(x0 + cw[0] - 8, dy + rh + 2, 102, 11, C.pen, { r: 0, w: 0 }) + t(x0 + cw[0] - 4, dy + rh + 11, o.drop.items[0], { s: 7.5, c: '#fff' });
    }
    if (o.tip) {
      const ty = hy + rh * (o.tipRow + 1) + rh;
      inner += rect(x0 + cw[0] + cw[1] + cw[2] + 4, ty + 2, 96, 30, '#fffbd6', { r: 1, w: 1, s: '#999' }) +
        t(x0 + cw[0] + cw[1] + cw[2] + 10, ty + 14, o.tip[0], { s: 7.5, b: 1 }) + t(x0 + cw[0] + cw[1] + cw[2] + 10, ty + 26, o.tip[1], { s: 7.5 });
    }
    if (o.tabs) {
      const by = hy + rh * (o.nrows) + 14;
      o.tabs.forEach((tb, i) => { inner += rect(60 + i * 80, by, 76, 16, i === o.activeTab ? '#fff' : '#eef0f2', { r: 0, w: 0.8, s: C.grey }) + t(98 + i * 80, by + 11, tb, { a: 'middle', s: 8, b: i === o.activeTab }); });
    }
    return svg('0 0 ' + W + ' ' + (hy + rh * (o.nrows || 8) + 50), o.label, inner);
  }
  const EXP = ['Ở', 'Ăn', 'Di chuyển', 'Học tập', 'Sức khoẻ', 'Giải trí', 'Quà tặng/Từ thiện', 'Tiết kiệm', 'Khác'];
  const INC = ['Lương', 'Thưởng', 'Làm thêm', 'Được cho/tặng', 'Khác'];
  const CHI = [['Ngày', 54], ['Khoản chi', 84], ['Nội dung', 116], ['Số tiền (nghìn đồng)', 98]];
  const THU = [['Ngày', 54], ['Khoản thu', 84], ['Nội dung', 116], ['Số tiền (nghìn đồng)', 98]];
  const lists91 = () => svg('0 0 400 190', 'Khoản mục thu, chi gia đình',
    rect(20, 8, 150, 26, '#fff', { r: 0, w: 1.2 }) + t(95, 26, 'Khoản thu', { a: 'middle', s: 12, b: 1 }) + rect(20, 38, 150, 120, BLUEL, { r: 0, w: 0 }) +
    INC.map((x, i) => t(30, 58 + i * 22, x, { s: 11 })).join('') +
    rect(200, 8, 170, 26, '#fff', { r: 0, w: 1.2 }) + t(285, 26, 'Khoản chi', { a: 'middle', s: 12, b: 1 }) + rect(200, 38, 170, 146, SALMON, { r: 0, w: 0 }) +
    EXP.map((x, i) => t(210, 55 + i * 16, x, { s: 10.5 })).join(''));
  const sheet92 = () => sheetFig({ label: 'Trang tính Chi tiêu với danh sách thả xuống', title: 'Chi tiêu', cols: CHI, nrows: 9, rows: [['14/8/23', 'Ở', 'Tiền điện tháng 8', '800'], ['15/8/23', 'Học tập', 'Học phí tháng 8', '2,200'], ['30/8/23', 'Ăn', 'Tiền ăn tháng 8', '3,000']], side: { head: 'Khoản chi', items: EXP, fill: SALMON }, drop: { row: 2, items: ['Ăn', 'Di chuyển', 'Học tập', 'Sức khoẻ', 'Giải trí', 'Quà tặng/Từ thiện', 'Tiết kiệm', 'Khác'] } });
  const sheet93 = () => sheetFig({ label: 'Cột Số tiền phải là số lớn hơn 0', title: 'Chi tiêu', cols: CHI, nrows: 9, rows: [['14/8/23', 'Ở', 'Tiền điện tháng 8', '800'], ['14/8/23', 'Sức khoẻ', 'Mua thuốc', '620'], ['15/8/23', 'Học tập', 'Học phí tháng 8', '2,200']], side: { head: 'Khoản chi', items: EXP, fill: '#fde1d6' }, tip: ['Dữ liệu kiểu số', 'Giá trị lớn hơn 0'], tipRow: 2 });
  const thu96 = () => sheetFig({ label: 'Trang tính lưu các khoản thu của gia đình', title: 'Thu nhập', cols: THU, nrows: 5, rows: [['13/8/23', 'Lương', 'Lương tháng 8', '7,000']], side: { head: 'Khoản thu', items: INC, fill: BLUEL } });
  const sheet97 = () => sheetFig({ label: 'Trang tính lưu các khoản chi', title: 'Chi tiêu', cols: [['Ngày', 54], ['Khoản chi', 84], ['Nội dung', 116], ['Số tiền (nghìn đồng)', 98]], nrows: 9, rows: [], side: { head: 'Khoản chi', items: EXP, fill: SALMON } });
  const thu913 = () => thu96();
  const sheet914 = () => sheetFig({ label: 'Trang tính lưu các khoản thu của Triển lãm tin học', title: 'Các khoản thu của Triển lãm tin học', cols: THU, nrows: 4, rows: [], side: { head: 'Khoản thu', items: ['Quỹ', 'Tài trợ'], fill: PALE }, tabs: ['Các khoản thu', 'Các khoản chi'], activeTab: 0 });
  const sheet915 = () => sheetFig({ label: 'Trang tính lưu các khoản chi của Triển lãm tin học', title: 'Các khoản chi cho Triển lãm tin học', cols: CHI, nrows: 4, rows: [], side: { head: 'Khoản chi', items: ['Văn phòng phẩm', 'In tài liệu'], fill: SALMON }, tabs: ['Các khoản thu', 'Các khoản chi'], activeTab: 1 });


  /* ---------- Bài 10a, 11a: bảng tính có cột tổng hợp (COUNTIF, SUMIF) ---------- */
  /* o: {title, rows, side:{head,items,fill}, g:{head,w,vals}, h:{head,w,vals}, shade:[{c0,c1,fill}], hi:'g'|'h'} */
  function sheetAgg(o) {
    const cw = CHI.map(c => c[1]), x0 = 24, rh = 20, hy = 62, sw = 104;
    const gw = o.g ? o.g.w : 0, hw = o.h ? o.h.w : 0;
    const dataW = cw.reduce((a, b) => a + b, 0), sx = x0 + dataW + 14, gx = sx + sw, hx = gx + gw;
    const W = (o.h ? hx + hw : o.g ? gx + gw : sx + sw) + 14;
    const nr = Math.max(o.rows.length + 1, o.side.items.length);
    let inner = rect(4, 4, W - 8, hy + rh * nr + 16, '#fff', { r: 2, w: 1.5 });
    inner += rect(4, 4, W - 8, 16, '#dfe3e6', { r: 0, w: 0.8 }) + t(x0 + 6, 16, 'A', { s: 8 });
    inner += t(x0 + 8, 52, o.title, { s: 16 });
    (o.shade || []).forEach(sh => {
      let xs = x0; for (let k = 0; k < sh.c0; k++) xs += cw[k];
      let ws = 0; for (let k = sh.c0; k <= sh.c1; k++) ws += cw[k];
      inner += rect(xs, hy + rh, ws, rh * o.rows.length, sh.fill, { r: 0, w: 0 });
    });
    let x = x0;
    CHI.forEach((c, j) => {
      inner += rect(x, hy, c[1], rh, 'none', { r: 0, w: 0.8, s: C.grey }) + t(x + c[1] / 2, hy + 14, c[0] === 'Khoản chi' ? (o.thu ? 'Khoản thu' : 'Khoản chi') : c[0], { a: 'middle', s: 9.5, b: 1 });
      x += c[1];
    });
    o.rows.forEach((r, i) => {
      x = x0; const y = hy + rh * (i + 1);
      CHI.forEach((c, j) => {
        inner += rect(x, y, c[1], rh, 'none', { r: 0, w: 0.6, s: '#d9dde0' }) + t(j === 3 ? x + c[1] - 6 : x + 6, y + 14, r[j], { a: j === 3 ? 'end' : 'start', s: 9 });
        x += c[1];
      });
    });
    const col = (cx, cwid, d, right) => {
      let s2 = rect(cx, hy - 22, cwid, 22, '#fff', { r: 0, w: 0.8, s: C.grey });
      const hd = d.head.split('|');
      s2 += hd.length > 1 ? t(cx + cwid / 2, hy - 13, hd[0], { a: 'middle', s: 8, b: 1 }) + t(cx + cwid / 2, hy - 4, hd[1], { a: 'middle', s: 7.5, b: 1 }) : t(cx + cwid / 2, hy - 7, hd[0], { a: 'middle', s: 9.5, b: 1 });
      return s2;
    };
    inner += col(sx, sw, o.side) + rect(sx, hy, sw, rh * o.side.items.length, o.side.fill, { r: 0, w: 0 });
    o.side.items.forEach((it, i) => { inner += t(sx + 5, hy + 14 + i * rh, it, { s: 8.5 }); });
    [[o.g, gx, gw], [o.h, hx, hw]].forEach(([d, cx, wd]) => {
      if (!d) return;
      inner += col(cx, wd, d);
      d.vals.forEach((v, i) => {
        const f = String(v).charAt(0) === '=';
        inner += rect(cx, hy + i * rh, wd, rh, 'none', { r: 0, w: 0.6, s: '#d9dde0' }) + t(f ? cx + 5 : cx + wd - 8, hy + 14 + i * rh, v, { a: f ? 'start' : 'end', s: f ? 8 : 9 });
      });
    });
    if (o.hi) { const cx = o.hi === 'g' ? gx : hx, wd = o.hi === 'g' ? gw : hw; inner += rect(cx, hy, wd, rh, 'none', { r: 0, w: 2, s: '#c62854' }); }
    return svg('0 0 ' + W + ' ' + (hy + rh * nr + 24), o.label, inner);
  }
  const ROWS_CHI = [['14/8/23', 'Ở', 'Tiền điện tháng 8', '800'], ['14/8/23', 'Sức khoẻ', 'Mua thuốc', '620'], ['15/8/23', 'Học tập', 'Học phí tháng 8', '2,200'], ['20/8/23', 'Quà tặng/Từ thiện', 'Quà tặng', '300'], ['22/8/23', 'Di chuyển', 'Gửi xe, xăng xe', '600'], ['26/8/23', 'Ở', 'Tiền nước tháng 8', '120'], ['26/8/23', 'Tiết kiệm', 'Tiết kiệm tháng 8', '1,000'], ['30/8/23', 'Ăn', 'Tiền ăn tháng 8', '8,000']];
  const ROWS_THU = [['13/8/23', 'Lương', 'Lương tháng 8', '10,000'], ['15/8/23', 'Làm thêm', 'Bán hàng trực tuyến', '1,500'], ['18/8/23', 'Được cho/tặng', 'Người thân tặng', '500'], ['25/8/23', 'Thưởng', 'Thưởng tháng 8', '3,000'], ['29/8/23', 'Khác', 'Tiết kiệm tiền đi lại', '500'], ['30/8/23', 'Làm thêm', 'Làm thêm tháng 8', '2,000']];
  const sheet10a1 = () => sheetAgg({ label: 'Bảng dữ liệu về các khoản chi, cột Số lần chi chưa có kết quả', title: 'Chi tiêu', rows: ROWS_CHI, side: { head: 'Khoản chi', items: EXP, fill: SALMON }, g: { head: 'Số lần chi', w: 70, vals: ['?', '?', '?', '?', '?', '?', '?', '?', '?'] } });
  const sheet10a2 = () => sheetAgg({ label: 'Công thức COUNTIF tính số lần chi của mỗi khoản chi', title: 'Chi tiêu', rows: ROWS_CHI, shade: [{ c0: 1, c1: 1, fill: '#cfe0f3' }], side: { head: 'Khoản chi', items: EXP, fill: SALMON }, g: { head: 'Số lần chi', w: 150, vals: ['=COUNTIF($B$3:$B$10,F2)', 1, 1, 1, 1, 0, 1, 1, 0] } });
  const thu10a3 = () => sheetAgg({ label: 'Bảng dữ liệu về các khoản thu', title: 'Thu nhập', thu: 1, rows: ROWS_THU, side: { head: 'Khoản thu', items: INC, fill: BLUEL }, g: { head: 'Số lần thu', w: 70, vals: [] } });
  const thu10a4 = () => sheetAgg({ label: 'Nhập công thức COUNTIF tại ô G2', title: 'Thu nhập', thu: 1, rows: ROWS_THU, shade: [{ c0: 1, c1: 1, fill: '#cfe0f3' }], side: { head: 'Khoản thu', items: INC, fill: BLUEL }, g: { head: 'Số lần thu', w: 150, vals: ['=COUNTIF($B$3:$B$8,F2)'] }, hi: 'g' });
  const thu10a5 = () => sheetAgg({ label: 'Kết quả số lần thu của các khoản thu', title: 'Thu nhập', thu: 1, rows: ROWS_THU, side: { head: 'Khoản thu', items: INC, fill: BLUEL }, g: { head: 'Số lần thu', w: 70, vals: [1, 1, 2, 1, 1] } });
  const sum11a1 = () => sheetAgg({ label: 'Trang tính Chi tiêu có thêm cột Tổng tiền', title: 'Chi tiêu', rows: ROWS_CHI, side: { head: 'Khoản chi', items: EXP, fill: SALMON }, g: { head: 'Số lần chi', w: 64, vals: [2, 1, 1, 1, 1, 0, 1, 1, 0] }, h: { head: 'Tổng tiền|(nghìn đồng)', w: 84, vals: ['920', '8,000', '600', '2,200', '620', '0', '300', '1,000', '0'] }, hi: 'h' });
  const sum11a2 = () => sheetAgg({ label: 'Công thức SUMIF tính tổng số tiền của khoản chi Ở', title: 'Chi tiêu', rows: ROWS_CHI, shade: [{ c0: 1, c1: 1, fill: '#cfe0f3' }, { c0: 3, c1: 3, fill: '#cfc4e6' }], side: { head: 'Khoản chi', items: EXP, fill: SALMON }, g: { head: 'Số lần chi', w: 64, vals: [2, 1, 1, 1, 1, 0, 1, 1, 0] }, h: { head: 'Tổng tiền|(nghìn đồng)', w: 170, vals: ['=SUMIF($B$3:$B$10,F2,$D$3:$D$10)'] }, hi: 'h' });
  const survey10a6 = () => {
    const W = 500, x0 = 24, rh = 20, hy = 66, ids = ['HS01', 'HS02', 'HS03', 'HS04', 'HS05', 'HS06', 'HS07', 'HS08', 'HS09', 'HS10'], sc = ['A', 'B', 'C', 'D', 'A', 'C', 'B', 'D', 'C', 'A'];
    let inner = rect(4, 4, W - 8, hy + rh * 10 + 16, '#fff', { r: 2, w: 1.5 }) + t(x0 + 6, 28, 'Khảo sát chọn trường THPT', { s: 13, b: 1 });
    inner += rect(x0, hy - 24, 100, 24, BLUEL, { r: 0, w: 0.8, s: C.grey }) + t(x0 + 50, hy - 8, 'Mã số học sinh', { a: 'middle', s: 8.5 }) + rect(x0 + 100, hy - 24, 130, 24, BLUEL, { r: 0, w: 0.8, s: C.grey }) + t(x0 + 165, hy - 8, 'Tên trường', { a: 'middle', s: 9 });
    ids.forEach((id, i) => { inner += rect(x0, hy + i * rh, 100, rh, 'none', { r: 0, w: 0.6, s: '#d9dde0' }) + t(x0 + 50, hy + 14 + i * rh, id, { a: 'middle', s: 9 }) + rect(x0 + 100, hy + i * rh, 130, rh, 'none', { r: 0, w: 0.6, s: '#d9dde0' }) + t(x0 + 165, hy + 14 + i * rh, sc[i], { a: 'middle', s: 9 }); });
    const sx = 290;
    inner += t(sx + 90, hy - 30, 'Thống kê', { a: 'middle', s: 11, b: 1 }) + rect(sx, hy - 24, 90, 24, BLUEL, { r: 0, w: 0.8, s: C.grey }) + t(sx + 45, hy - 8, 'Tên trường', { a: 'middle', s: 9 }) + rect(sx + 90, hy - 24, 90, 24, BLUEL, { r: 0, w: 0.8, s: C.grey }) + t(sx + 135, hy - 8, 'Số lượng', { a: 'middle', s: 9 });
    ['A', 'B', 'C', 'D'].forEach((k, i) => { inner += rect(sx, hy + i * rh, 90, rh, 'none', { r: 0, w: 0.6, s: '#d9dde0' }) + t(sx + 45, hy + 14 + i * rh, k, { a: 'middle', s: 9 }) + rect(sx + 90, hy + i * rh, 90, rh, 'none', { r: 0, w: 0.6, s: '#d9dde0' }) + t(sx + 135, hy + 14 + i * rh, '?', { a: 'middle', s: 9 }); });
    return svg('0 0 ' + W + ' ' + (hy + rh * 10 + 24), 'Kết quả khảo sát về việc chọn trường THPT', inner);
  };

  const dlgFrame = (w, h, title, body) => rect(4, 4, w - 8, h - 8, '#f0f0f0', { r: 0, w: 1.4 }) + t(14, 22, title, { s: 10.5 }) + t(w - 44, 22, '?   ✕', { s: 11 }) + body;
  const tabBar = (active) => ['Settings', 'Input Message', 'Error Alert'].map((n, i) => rect(14 + [0, 58, 140][i], 34, [56, 80, 66][i], 20, i === active ? '#fff' : '#e6e6e6', { r: 0, w: 0.8, s: C.grey }) + t(14 + [0, 58, 140][i] + [28, 40, 33][i], 48, n, { a: 'middle', s: 8.5, b: i === active })).join('');
  const btn = (x, y, w, tx, em) => rect(x, y, w, 18, '#e6e6e6', { r: 0, w: em ? 2 : 1, s: em ? C.pen : '#888' }) + t(x + w / 2, y + 13, tx, { a: 'middle', s: 9 });
  const dvButtons = (w, h) => btn(14, h - 30, 56, 'Clear All') + btn(w - 150, h - 30, 66, 'OK', 1) + btn(w - 78, h - 30, 66, 'Cancel');
  const sel = (x, y, w, tx) => rect(x, y, w, 18, '#fff', { r: 0, w: 1, s: '#888' }) + t(x + 6, y + 13, tx, { s: 9 }) + t(x + w - 12, y + 13, '⌄', { s: 10 });
  const dvbtn94 = () => svg('0 0 300 200', 'Nút lệnh Data Validation trong nhóm lệnh Data Tools',
    rect(4, 4, 292, 192, '#fff', { r: 0, w: 1.4 }) +
    t(40, 56, 'Text to', { s: 10 }) + t(40, 68, 'Columns', { s: 10 }) + rect(88, 66, 48, 26, 'none', { r: 2, w: 2.5, s: C.red }) + t(100, 84, '✓⃠', { s: 13 }) + t(120, 84, '⌄', { s: 11 }) +
    t(160, 56, 'What-If', { s: 10 }) + t(160, 68, 'Analysis ⌄', { s: 10 }) + t(226, 56, 'Forecast', { s: 10 }) + t(226, 68, 'Sheet', { s: 10 }) +
    t(70, 112, 'Data Tools', { s: 10 }) + t(190, 112, 'Forecast', { s: 10 }) + line(4, 120, 296, 120, '#ccc', 1) +
    t(80, 142, 'Data Validation', { s: 11, b: 1 }) + t(80, 160, 'Pick from a list of rules to limit the', { s: 9 }) + t(80, 172, 'type of data that can be entered in a cell.', { s: 9 }));
  const dvallow95 = () => svg('0 0 340 250', 'Lựa chọn kiểu dữ liệu hoặc giá trị dữ liệu',
    dlgFrame(340, 250, 'Data Validation', tabBar(0) + rect(14, 54, 312, 150, '#fff', { r: 0, w: 0.8, s: C.grey }) + t(22, 72, 'Validation criteria', { s: 9 }) + t(30, 90, 'Allow:', { s: 9 }) + sel(30, 94, 100, 'List') +
      t(150, 106, '☑ Ignore blank', { s: 9 }) + t(150, 120, '☑ In-cell dropdown', { s: 9 }) +
      rect(30, 112, 100, 90, '#fff', { r: 0, w: 1, s: '#555' }) + ['Any value', 'Whole number', 'Decimal', 'List', 'Date', 'Time', 'Text length', 'Custom'].map((x, i) => (i === 3 ? rect(31, 114 + i * 10.4, 98, 10.4, C.pen, { r: 0, w: 0 }) : '') + t(34, 122 + i * 10.4, x, { s: 8, c: i === 3 ? '#fff' : C.ink })).join('') + dvButtons(340, 250)));
  const dv98 = () => svg('0 0 340 260', 'Chọn vùng dữ liệu chứa danh sách các khoản chi',
    dlgFrame(340, 260, 'Data Validation', tabBar(0) + rect(14, 54, 312, 160, '#fff', { r: 0, w: 0.8, s: C.grey }) + t(22, 72, 'Validation criteria', { s: 9 }) +
      t(30, 90, 'Allow:', { s: 9 }) + sel(30, 94, 110, 'List') + t(30, 128, 'Data:', { s: 9 }) + sel(30, 132, 110, 'between') + t(30, 166, 'Source:', { s: 9 }) +
      rect(30, 170, 190, 18, '#fff', { r: 0, w: 2.4, s: C.red }) + t(36, 183, '=$F$2:$F$10', { s: 9 }) + t(160, 100, '☑ Ignore blank', { s: 9 }) + t(160, 114, '☑ In-cell dropdown', { s: 9 }) + dvButtons(340, 260)));
  const dv99 = () => svg('0 0 340 250', 'Nhập các yêu cầu xác thực dữ liệu của cột Số tiền',
    dlgFrame(340, 250, 'Data Validation', tabBar(0) + rect(14, 54, 312, 150, '#fff', { r: 0, w: 0.8, s: C.grey }) + t(22, 72, 'Validation criteria', { s: 9 }) +
      t(30, 90, 'Allow:', { s: 9 }) + sel(30, 94, 130, 'Whole number') + t(180, 106, '☑ Ignore blank', { s: 9 }) + t(30, 128, 'Data:', { s: 9 }) + sel(30, 132, 130, 'greater than') + t(30, 166, 'Minimum:', { s: 9 }) + rect(30, 170, 190, 18, '#fff', { r: 0, w: 1, s: '#888' }) + t(36, 183, '0', { s: 9 }) + dvButtons(340, 250)));
  const msg910 = () => svg('0 0 340 250', 'Nhập nội dung thông báo sẽ hiển thị khi nhập dữ liệu',
    dlgFrame(340, 250, 'Data Validation', tabBar(1) + rect(14, 54, 312, 150, '#fff', { r: 0, w: 0.8, s: C.grey }) + t(22, 72, '☑ Show input message when cell is selected', { s: 9 }) + t(22, 92, 'When cell is selected, show this input message:', { s: 8.5 }) +
      t(24, 108, 'Title:', { s: 9 }) + rect(24, 112, 290, 16, '#fff', { r: 0, w: 1, s: '#888' }) + t(30, 124, 'Dữ liệu kiểu số', { s: 9 }) + t(24, 142, 'Input message:', { s: 9 }) + rect(24, 146, 290, 50, '#fff', { r: 0, w: 1, s: '#888' }) + t(30, 160, 'Giá trị lớn hơn 0', { s: 9 }) + dvButtons(340, 250)));
  const alert911 = () => svg('0 0 340 260', 'Nhập nội dung thông báo lỗi',
    dlgFrame(340, 260, 'Data Validation', tabBar(2) + rect(14, 54, 312, 160, '#fff', { r: 0, w: 0.8, s: C.grey }) + t(22, 72, '☑ Show error alert after invalid data is entered', { s: 9 }) + t(22, 90, 'When user enters invalid data, show this error alert:', { s: 8.5 }) +
      t(24, 108, 'Style:', { s: 9 }) + rect(24, 112, 110, 16, C.pen, { r: 0, w: 1 }) + t(30, 124, 'Stop', { s: 9, c: '#fff' }) + '<circle cx="70" cy="170" r="12" fill="' + C.red + '"/>' + t(70, 175, '✕', { a: 'middle', s: 13, c: '#fff' }) +
      t(150, 108, 'Title:', { s: 9 }) + rect(150, 112, 164, 16, '#fff', { r: 0, w: 1, s: '#888' }) + t(156, 124, 'Dữ liệu nhập sai', { s: 9 }) + t(150, 142, 'Error message:', { s: 9 }) + rect(150, 146, 164, 56, '#fff', { r: 0, w: 1, s: '#888' }) + t(156, 160, 'Hãy nhập lại dữ liệu kiểu số và', { s: 8.5 }) + t(156, 172, 'lớn hơn 0', { s: 8.5 }) + dvButtons(340, 260)));
  const alert912 = () => svg('0 0 320 130', 'Thông báo xuất hiện khi dữ liệu nhập sai',
    rect(4, 4, 312, 122, '#f4f4f4', { r: 0, w: 1.4 }) + rect(4, 4, 312, 28, '#fff', { r: 0, w: 0 }) + t(14, 23, 'Dữ liệu nhập sai', { s: 11 }) + t(296, 24, '✕', { a: 'end', s: 11 }) +
    '<circle cx="42" cy="68" r="14" fill="' + C.red + '"/>' + t(42, 74, '✕', { a: 'middle', s: 15, c: '#fff' }) + t(70, 72, 'Hãy nhập lại dữ liệu kiểu số và lớn hơn 0', { s: 10, b: 1 }) +
    btn(66, 94, 60, 'Retry', 1) + btn(134, 94, 60, 'Cancel') + btn(202, 94, 60, 'Help'));

  Object.assign(T.art, { school21: school21, qmap22: qmap22, search31: search31, ai32: ai32, web33: web33, theft41: theft41, tree42: tree42, mix51: mix51, circuit52: circuit52, cups53: cups53, lang61: lang61, menu62: menu62, sim63: sim63, energy64: energy64, amp65a: amp65a, amp65b: amp65b, star66: star66art, calc67: calc67, gold68: gold68, mind71: mind71, sheet81: sheet81, ribbon82: ribbon82, open83: open83, link84: link84, outline85: outline85, timeline86: timeline86, lists91: lists91, sheet92: sheet92, sheet93: sheet93, dvbtn94: dvbtn94, dvallow95: dvallow95, thu96: thu96, sheet97: sheet97, dv98: dv98, dv99: dv99, msg910: msg910, alert911: alert911, alert912: alert912, thu913: thu913, sheet914: sheet914, sheet915: sheet915, sheet10a1: sheet10a1, sheet10a2: sheet10a2, thu10a3: thu10a3, thu10a4: thu10a4, thu10a5: thu10a5, survey10a6: survey10a6, sum11a1: sum11a1, sum11a2: sum11a2 });
})();
