/* ==========================================================================
   HÌNH MINH HOẠ SVG
   --------------------------------------------------------------------------
   Mọi hình đều vẽ bằng mã, không cần file ảnh, nên chạy được khi mở trực tiếp
   index.html. Chữ trong hình có hai kiểu: tiếng Việt (đậm) và tiếng Anh
   (class "en", nghiêng) — nút "Tiếng Anh" trên thanh công cụ sẽ ẩn phần tiếng Anh
   trong hình cùng với phần chữ của trang.
   Mỗi hàm trả về một chuỗi <svg>.
   ========================================================================== */
(function () {
  'use strict';

  /* Bảng màu dùng chung (khớp với css/styles.css) */
  const C = {
    pen: '#1f46d0', penD: '#17338f', penL: '#dbe4ff', penXL: '#eef2ff',
    teal: '#0aa39a', tealL: '#d6f4ef',
    red: '#e0393e', redL: '#ffe3e4',
    sun: '#ffe24a', sunD: '#f2b705', sunL: '#fff6bf',
    violet: '#6c4be8', violetL: '#e9e3ff',
    green: '#2fbf7a', greenL: '#dcf5e4',
    ink: '#14224a', grey: '#9aa8c7', greyL: '#e8edf9',
    skin: '#ffd2b0'
  };

  /* Nét viền chung: đường viền màu mực, bo tròn — tạo cảm giác hình in trong sách. */
  const O = (w) => 'stroke="' + C.ink + '" stroke-width="' + (w || 2.5) + '" stroke-linejoin="round" stroke-linecap="round"';

  const svg = (vb, label, inner, cls) =>
    '<svg class="art ' + (cls || '') + '" viewBox="' + vb + '" role="img" aria-label="' + label + '" xmlns="http://www.w3.org/2000/svg">' + inner + '</svg>';

  /* Cặp nhãn Việt (đậm) + Anh (nghiêng) trong hình. */
  const label = (x, y, vi, en, o) => {
    o = o || {};
    const a = o.anchor || 'middle';
    const s = o.size || 14;
    const fill = o.fill || C.ink;
    const gap = o.gap || s + 2;
    return '<text x="' + x + '" y="' + y + '" text-anchor="' + a + '" font-size="' + s + '" font-weight="700" fill="' + fill + '">' + vi + '</text>' +
      '<text class="en" x="' + x + '" y="' + (y + gap) + '" text-anchor="' + a + '" font-size="' + (s - 1.5) + '" fill="' + (o.enFill || C.ink) + '" opacity=".78">' + en + '</text>';
  };

  /* -------------------------------------------------------------------------
     Bộ thiết bị — mỗi hàm vẽ quanh gốc (0,0), dùng với transform="translate(..) scale(..)"
     ------------------------------------------------------------------------- */
  const dev = {
    laptop: (scr, inner) =>
      '<g>' +
      '<rect x="-42" y="-30" width="84" height="54" rx="6" fill="#fff" ' + O() + '/>' +
      '<rect x="-36" y="-24" width="72" height="42" rx="2.5" fill="' + (scr || C.pen) + '"/>' + (inner || '') +
      '<path d="M-56 26h112l-7 8.5a4 4 0 0 1-3 1.5H-46a4 4 0 0 1-3-1.5z" fill="#dfe6f8" ' + O() + '/>' +
      '<rect x="-9" y="26" width="18" height="3.4" rx="1.7" fill="' + C.ink + '" opacity=".35"/>' +
      '</g>',

    phone: (scr, inner) =>
      '<g>' +
      '<rect x="-17" y="-32" width="34" height="64" rx="8" fill="#fff" ' + O() + '/>' +
      '<rect x="-12.5" y="-25" width="25" height="46" rx="3" fill="' + (scr || C.teal) + '"/>' + (inner || '') +
      '<rect x="-5" y="-29.6" width="10" height="2.6" rx="1.3" fill="' + C.ink + '"/>' +
      '<circle cx="0" cy="26.6" r="2" fill="' + C.ink + '" opacity=".4"/>' +
      '</g>',

    tablet: (scr) =>
      '<g>' +
      '<rect x="-38" y="-27" width="76" height="54" rx="7" fill="#fff" ' + O() + '/>' +
      '<rect x="-32" y="-21" width="60" height="42" rx="3" fill="' + (scr || C.violet) + '"/>' +
      '<circle cx="33.5" cy="0" r="1.8" fill="' + C.ink + '" opacity=".4"/>' +
      '</g>',

    watch: () =>
      '<g>' +
      '<rect x="-9" y="-37" width="18" height="17" rx="3" fill="' + C.pen + '" ' + O() + '/>' +
      '<rect x="-9" y="20" width="18" height="17" rx="3" fill="' + C.pen + '" ' + O() + '/>' +
      '<rect x="-18" y="-22" width="36" height="44" rx="10" fill="#fff" ' + O() + '/>' +
      '<rect x="-13" y="-17" width="26" height="34" rx="6" fill="' + C.ink + '"/>' +
      '<path d="M-8 3h5l2-9 3 13 2-4h5" stroke="' + C.sun + '" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</g>',

    tv: (scr, inner) =>
      '<g>' +
      '<rect x="-52" y="-34" width="104" height="64" rx="7" fill="#fff" ' + O() + '/>' +
      '<rect x="-45" y="-27" width="90" height="50" rx="3" fill="' + (scr || C.teal) + '"/>' + (inner || '') +
      '<path d="M-16 39h32M0 30v9" ' + O() + ' fill="none"/>' +
      '</g>',

    chip: () => {
      let pins = '';
      [-16, -5.5, 5.5, 16].forEach((p) => {
        pins += '<path d="M' + p + ' -28v-8M' + p + ' 28v8M-28 ' + p + 'h-8M28 ' + p + 'h8" ' + O(2.6) + ' fill="none"/>';
      });
      return '<g>' + pins +
        '<rect x="-28" y="-28" width="56" height="56" rx="9" fill="' + C.sun + '" ' + O() + '/>' +
        '<rect x="-15" y="-15" width="30" height="30" rx="5" fill="#fff" ' + O() + '/>' +
        '<path d="M-6 -4h12M-6 4h12" ' + O(2.4) + ' fill="none"/>' +
        '</g>';
    },

    remote: () =>
      '<g>' +
      '<rect x="-15" y="-39" width="30" height="78" rx="10" fill="#fff" ' + O() + '/>' +
      '<circle cx="0" cy="-25" r="5.2" fill="' + C.red + '" ' + O(2) + '/>' +
      '<rect x="-8" y="-11" width="16" height="17" rx="4" fill="' + C.penL + '" ' + O(2) + '/>' +
      '<path d="M-4 -2.5h8M0 -6.5v8" stroke="' + C.pen + '" stroke-width="2.4" stroke-linecap="round"/>' +
      '<circle cx="-6" cy="16" r="3.3" fill="' + C.sun + '"/><circle cx="6" cy="16" r="3.3" fill="' + C.teal + '"/>' +
      '<circle cx="-6" cy="27" r="3.3" fill="' + C.teal + '"/><circle cx="6" cy="27" r="3.3" fill="' + C.pen + '"/>' +
      '</g>',

    atm: () =>
      '<g>' +
      '<rect x="-31" y="-40" width="62" height="80" rx="8" fill="#fff" ' + O() + '/>' +
      '<rect x="-23" y="-32" width="46" height="27" rx="3" fill="' + C.teal + '"/>' +
      '<path d="M-14 -23h28M-14 -15h16" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>' +
      '<g fill="' + C.ink + '" opacity=".5">' +
      '<circle cx="-12" cy="5" r="2"/><circle cx="0" cy="5" r="2"/><circle cx="12" cy="5" r="2"/>' +
      '<circle cx="-12" cy="13" r="2"/><circle cx="0" cy="13" r="2"/><circle cx="12" cy="13" r="2"/></g>' +
      '<rect x="-18" y="21" width="36" height="7" rx="3.5" fill="' + C.ink + '"/>' +
      '<rect x="-11" y="30" width="22" height="6" rx="2" fill="' + C.sun + '" ' + O(1.8) + '/>' +
      '</g>',

    monitor: () =>
      '<g>' +
      '<rect x="-46" y="-34" width="92" height="66" rx="9" fill="#fff" ' + O() + '/>' +
      '<rect x="-39" y="-27" width="78" height="46" rx="3" fill="' + C.ink + '"/>' +
      '<path d="M-34 -3h14l5-14 8 28 6-22 4 8h27" stroke="#5cf0b0" stroke-width="2.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M-16 40h32M0 32v8" ' + O() + ' fill="none"/>' +
      '</g>',

    arm: () =>
      '<g>' +
      '<rect x="-36" y="28" width="72" height="12" rx="4" fill="' + C.ink + '"/>' +
      '<rect x="-15" y="14" width="30" height="16" rx="3" fill="' + C.pen + '" ' + O() + '/>' +
      '<path d="M0 14 -6 -16" stroke="' + C.ink + '" stroke-width="14" stroke-linecap="round"/>' +
      '<path d="M0 14 -6 -16" stroke="' + C.sun + '" stroke-width="8.5" stroke-linecap="round"/>' +
      '<path d="M-6 -16 24 -28" stroke="' + C.ink + '" stroke-width="14" stroke-linecap="round"/>' +
      '<path d="M-6 -16 24 -28" stroke="' + C.sun + '" stroke-width="8.5" stroke-linecap="round"/>' +
      '<circle cx="0" cy="14" r="6.5" fill="#fff" ' + O(2.4) + '/>' +
      '<circle cx="-6" cy="-16" r="6.5" fill="#fff" ' + O(2.4) + '/>' +
      '<path d="M30 -40v22M30 -40h10M30 -18h10" fill="none" ' + O(3.4) + '/>' +
      '</g>',

    traffic: () =>
      '<g>' +
      '<path d="M0 40v14" ' + O(3) + ' fill="none"/>' +
      '<rect x="-17" y="-42" width="34" height="84" rx="11" fill="' + C.ink + '"/>' +
      '<circle cx="0" cy="-25" r="9" fill="' + C.red + '"/>' +
      '<circle cx="0" cy="0" r="9" fill="' + C.sun + '"/>' +
      '<circle cx="0" cy="25" r="9" fill="' + C.green + '"/>' +
      '</g>',

    headphones: () =>
      '<g>' +
      '<path d="M-27 8v-8a27 27 0 0 1 54 0v8" fill="none" stroke="' + C.ink + '" stroke-width="10" stroke-linecap="round"/>' +
      '<path d="M-27 8v-8a27 27 0 0 1 54 0v8" fill="none" stroke="' + C.red + '" stroke-width="5" stroke-linecap="round"/>' +
      '<rect x="-36" y="2" width="17" height="32" rx="8.5" fill="' + C.red + '" ' + O() + '/>' +
      '<rect x="19" y="2" width="17" height="32" rx="8.5" fill="' + C.red + '" ' + O() + '/>' +
      '</g>'
  };

  const at = (x, y, s, inner) =>
    '<g transform="translate(' + x + ' ' + y + ')' + (s && s !== 1 ? ' scale(' + s + ')' : '') + '">' + inner + '</g>';

  /* -------------------------------------------------------------------------
     1. Hình bìa trang mở đầu: thiết bị kết nối qua mạng quanh quả địa cầu
     ------------------------------------------------------------------------- */
  function hero() {
    /* Mưa chữ số nhị phân làm nền (giá trị cố định để hình luôn giống nhau). */
    let seed = 11;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    let rain = '';
    for (let col = 0; col < 20; col++) {
      const x = 16 + col * 30;
      const n = 3 + Math.floor(rnd() * 6);
      const y0 = 22 + Math.floor(rnd() * 150);
      let digits = '';
      for (let i = 0; i < n; i++) digits += '<tspan x="' + x + '" dy="' + (i ? 21 : 0) + '">' + (rnd() > 0.5 ? 1 : 0) + '</tspan>';
      rain += '<text x="' + x + '" y="' + y0 + '" opacity="' + (0.07 + rnd() * 0.12).toFixed(2) + '">' + digits + '</text>';
    }

    const spots = { tv: [300, 66], laptop: [92, 172], phone: [508, 172], tablet: [176, 276], watch: [426, 274] };
    let links = '';
    Object.keys(spots).forEach((k) => {
      links += '<path d="M300 168 L' + spots[k][0] + ' ' + spots[k][1] + '" stroke="#fff" stroke-opacity=".5" stroke-width="2" stroke-dasharray="2 7" stroke-linecap="round"/>';
    });

    const chip = (x, y, t) =>
      '<g transform="translate(' + x + ' ' + y + ')"><rect x="-14" y="-12" width="28" height="24" rx="7" fill="' + C.sun + '" ' + O(2.2) + '/>' +
      '<text x="0" y="5.5" text-anchor="middle" font-family="monospace" font-size="15" font-weight="800" fill="' + C.ink + '">' + t + '</text></g>';

    const inner =
      '<defs>' +
      '<linearGradient id="hgBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a55e6"/><stop offset="1" stop-color="#17338f"/></linearGradient>' +
      '<radialGradient id="hgGlobe" cx="35%" cy="30%" r="85%"><stop offset="0" stop-color="#9af0e2"/><stop offset=".5" stop-color="#2fb9ea"/><stop offset="1" stop-color="#1f5bd8"/></radialGradient>' +
      '</defs>' +
      '<rect width="600" height="340" rx="22" fill="url(#hgBg)"/>' +
      '<g font-family="monospace" font-size="16" font-weight="800" fill="#fff">' + rain + '</g>' +
      '<circle cx="300" cy="168" r="92" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="2" stroke-dasharray="3 8"/>' +
      '<circle cx="300" cy="168" r="128" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="2"/>' +
      links +
      '<circle cx="300" cy="168" r="58" fill="url(#hgGlobe)" ' + O() + '/>' +
      '<g fill="none" stroke="#fff" stroke-opacity=".65" stroke-width="2">' +
      '<ellipse cx="300" cy="168" rx="23" ry="58"/><ellipse cx="300" cy="168" rx="45" ry="58"/>' +
      '<path d="M242 168h116"/><path d="M252 138Q300 150 348 138"/><path d="M252 198Q300 186 348 198"/></g>' +
      at(300, 66, 0.95, dev.tv(C.teal, '<path d="M-10 -12l22 12-22 12z" fill="#fff"/>')) +
      at(92, 172, 1, dev.laptop(C.sun, '<path d="M-26 -14h30M-26 -5h46M-26 4h38" stroke="' + C.ink + '" stroke-width="3" stroke-linecap="round" opacity=".75"/>')) +
      at(508, 172, 1.05, dev.phone(C.teal, '<circle cx="0" cy="-6" r="7" fill="#fff"/><path d="M-8 12h16" stroke="#fff" stroke-width="3" stroke-linecap="round"/>')) +
      at(176, 276, 0.92, dev.tablet(C.violet)) +
      at(426, 274, 0.95, dev.watch()) +
      chip(196, 148, '1') + chip(404, 190, '0') + chip(236, 228, '0') + chip(366, 224, '1');

    return svg('0 0 600 340', 'Thế giới kĩ thuật số: máy tính, điện thoại, máy tính bảng, ti vi và đồng hồ thông minh kết nối với nhau qua mạng toàn cầu', inner, 'art--hero');
  }

  /* -------------------------------------------------------------------------
     2. Khung "Khởi động": bạn Nam và ba thiết bị trong buổi sáng
     ------------------------------------------------------------------------- */
  function warmup() {
    const sky = '<circle cx="-4" cy="-12" r="6.5" fill="' + C.sun + '"/>' +
      '<path d="M-9 8a5 5 0 0 1 9-3 4 4 0 0 1 7 3 3.6 3.6 0 0 1-1 7H-8a3.8 3.8 0 0 1-1-7z" fill="#fff"/>';
    const doc = '<path d="M-28 -14h38M-28 -5h56M-28 4h46M-28 12h28" stroke="' + C.pen + '" stroke-width="3" stroke-linecap="round"/>';
    const notes =
      '<g ' + O(2.4) + ' fill="' + C.ink + '"><circle cx="30" cy="-8" r="5"/><path d="M35 -8V-30l13 -3v11" fill="none"/><circle cx="46" cy="-22" r="5"/></g>';

    const tile = (x, bg, inner) =>
      '<rect x="' + x + '" y="12" width="112" height="124" rx="18" fill="' + bg + '" ' + O() + '/>' + inner;

    const inner =
      /* Bạn Nam */
      '<g transform="translate(8 2)">' +
      '<path d="M6 146c0-34 20-47 46-47s46 13 46 47z" fill="' + C.pen + '" ' + O() + '/>' +
      '<path d="M38 101l14 14 14-14" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M26 114v32M78 114v32" stroke="' + C.red + '" stroke-width="7" stroke-linecap="round"/>' +
      '<rect x="44" y="84" width="16" height="18" rx="6" fill="' + C.skin + '" ' + O(2.2) + '/>' +
      '<circle cx="52" cy="62" r="28" fill="' + C.skin + '" ' + O() + '/>' +
      '<path d="M24 60c-2-20 11-34 28-34s31 13 28 34c-6-10-16-15-28-15S30 50 24 60z" fill="' + C.ink + '"/>' +
      '<circle cx="42" cy="66" r="2.7" fill="' + C.ink + '"/><circle cx="62" cy="66" r="2.7" fill="' + C.ink + '"/>' +
      '<path d="M43 76q9 8 18 0" fill="none" stroke="' + C.ink + '" stroke-width="2.4" stroke-linecap="round"/>' +
      '<circle cx="36" cy="74" r="4" fill="#ff9aa2" opacity=".55"/><circle cx="68" cy="74" r="4" fill="#ff9aa2" opacity=".55"/>' +
      '</g>' +
      /* Dấu hỏi gợi ý câu hỏi bên dưới */
      '<g transform="translate(112 10)"><path d="M0 16a14 14 0 0 1 14-14h14a14 14 0 0 1 14 14v4a14 14 0 0 1-14 14H18l-9 9 1-10A14 14 0 0 1 0 20z" fill="#fff" ' + O(2.2) + '/>' +
      '<text x="21" y="26" text-anchor="middle" font-size="20" font-weight="800" fill="' + C.pen + '">?</text></g>' +
      /* Ba thiết bị */
      tile(178, C.sunL, at(234, 76, 0.95, dev.phone('#7cc4ff', sky))) +
      tile(302, C.penL, at(358, 76, 0.82, dev.laptop('#fff', doc))) +
      tile(426, C.tealL, at(482, 84, 0.92, dev.headphones() + notes));

    return svg('0 0 560 150', 'Bạn Nam và ba thiết bị: điện thoại báo thức và xem thời tiết, máy tính làm bài tập, tai nghe không dây', inner, 'art--warm');
  }

  /* -------------------------------------------------------------------------
     3. Hình 1.1: thiết bị số ở nhiều nơi
     ------------------------------------------------------------------------- */
  function places() {
    const schoolChart =
      '<rect x="-27" y="-2" width="9" height="14" rx="1.5" fill="' + C.pen + '"/>' +
      '<rect x="-13" y="-12" width="9" height="24" rx="1.5" fill="' + C.teal + '"/>' +
      '<rect x="1" y="-6" width="9" height="18" rx="1.5" fill="' + C.red + '"/>' +
      '<rect x="15" y="-16" width="9" height="28" rx="1.5" fill="' + C.sunD + '"/>';
    const tvPlay = '<path d="M-9 -12l21 12-21 12z" fill="#fff"/>';

    const tiles = [
      { vi: 'Gia đình', en: 'Home', bg: C.sunL, icon: at(0, 4, 0.9, dev.tv(C.pen, tvPlay)) },
      { vi: 'Trường học', en: 'School', bg: C.penL, icon: at(0, 4, 0.92, dev.laptop('#fff', schoolChart)) },
      { vi: 'Bệnh viện', en: 'Hospital', bg: C.tealL, icon: at(0, 4, 0.9, dev.monitor()) },
      { vi: 'Ngân hàng', en: 'Bank', bg: C.violetL, icon: at(0, 2, 0.88, dev.atm()) },
      { vi: 'Nhà máy', en: 'Factory', bg: C.redL, icon: at(2, 4, 0.9, dev.arm()) },
      { vi: 'Giao thông', en: 'Transport', bg: C.greenL, icon: at(0, 0, 0.82, dev.traffic()) }
    ];

    let inner = '';
    tiles.forEach((t, i) => {
      const x = 6 + (i % 3) * 198;
      const y = 6 + Math.floor(i / 3) * 160;
      inner += '<rect x="' + x + '" y="' + y + '" width="190" height="150" rx="18" fill="' + t.bg + '"/>' +
        at(x + 95, y + 56, 1, t.icon) +
        label(x + 95, y + 120, t.vi, t.en, { size: 15, gap: 17 });
    });
    return svg('0 0 600 322', 'Thiết bị số trong gia đình, trường học, bệnh viện, ngân hàng, nhà máy và giao thông', inner, 'art--places');
  }

  /* -------------------------------------------------------------------------
     4. Hình 1.2: nhập – xử lí – xuất (ví dụ ti vi)
     ------------------------------------------------------------------------- */
  function process() {
    const vol =
      '<path d="M-33 14h48" stroke="#fff" stroke-opacity=".5" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M-33 14h32" stroke="' + C.sun + '" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M-34 -8l6 -4v10l-6 -4z" fill="#fff"/><path d="M-22 -11a8 8 0 0 1 0 10" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>';

    const box = (x, bg, title, titleEn, art, cap, capEn) =>
      '<rect x="' + x + '" y="8" width="160" height="196" rx="18" fill="' + bg + '" ' + O() + '/>' +
      label(x + 80, 36, title, titleEn, { size: 16, gap: 18 }) +
      art +
      label(x + 80, 168, cap, capEn, { size: 12.5, gap: 15 });

    const arrow = (x, bits) =>
      '<path d="M' + x + ' 106h34" ' + O(3.4) + ' stroke="' + C.pen + '" fill="none"/>' +
      '<path d="M' + (x + 24) + ' 95l11 11-11 11" ' + O(3.4) + ' stroke="' + C.pen + '" fill="none"/>' +
      '<text x="' + (x + 17) + '" y="90" text-anchor="middle" font-family="monospace" font-size="12" font-weight="800" fill="' + C.pen + '">' + bits + '</text>';

    const inner =
      box(6, C.penXL, 'Thông tin vào', 'Input', at(86, 108, 1, dev.remote()), 'Lệnh từ điều khiển', 'Command from the remote') +
      box(220, C.sunL, 'Xử lí', 'Processing', at(300, 110, 0.92, dev.chip()), 'Bộ xử lí hiểu lệnh', 'The processor decodes it') +
      box(434, C.tealL, 'Thông tin ra', 'Output', at(514, 112, 0.84, dev.tv(C.pen, vol)), 'Âm thanh to hơn', 'The sound gets louder') +
      arrow(170, '011') + arrow(384, '101') +
      '<path d="M300 205v16" stroke="' + C.ink + '" stroke-width="2.6" stroke-dasharray="3 4" stroke-linecap="round"/>' +
      '<rect x="236" y="222" width="128" height="36" rx="18" fill="' + C.violetL + '" ' + O(2.4) + '/>' +
      '<text x="300" y="245.5" text-anchor="middle" font-size="14" font-weight="700" fill="' + C.ink + '">Bộ nhớ <tspan class="en" font-size="12.5" font-weight="400"> Memory</tspan></text>';

    return svg('0 0 600 266', 'Sơ đồ ba bước: thông tin vào từ điều khiển, bộ xử lí xử lí lệnh, thông tin ra là âm thanh to hơn; thông tin có thể lưu trong bộ nhớ', inner, 'art--process');
  }

  /* -------------------------------------------------------------------------
     5. Hình 1.3: tín hiệu liên tục và tín hiệu số
     ------------------------------------------------------------------------- */
  function signals() {
    /* Đường hình sin cho tín hiệu liên tục */
    let sine = '';
    for (let x = 30; x <= 266; x += 2) {
      const y = 134 - 40 * Math.sin(((x - 30) / 236) * Math.PI * 3);
      sine += (x === 30 ? 'M' : 'L') + x + ' ' + y.toFixed(1);
    }

    /* Sóng vuông cho tín hiệu số */
    const bits = [1, 0, 1, 1, 0, 0, 1, 0];
    const y1 = 108, y0 = 164, x0 = 346, w = 29;
    let sq = '', digits = '';
    bits.forEach((b, i) => {
      const y = b ? y1 : y0;
      const xa = x0 + i * w, xb = xa + w;
      sq += (i === 0 ? 'M' + xa + ' ' + y : 'V' + y) + 'H' + xb;
      digits += '<text x="' + (xa + w / 2) + '" y="86" text-anchor="middle" font-family="monospace" font-size="17" font-weight="800" fill="' + (b ? C.pen : C.red) + '">' + b + '</text>';
    });

    const panel = (x, t, te) =>
      '<rect x="' + x + '" y="6" width="282" height="224" rx="18" fill="#fff" stroke="#c6d2f2" stroke-width="2.4"/>' +
      label(x + 141, 34, t, te, { size: 14.5, gap: 17 });

    const inner =
      panel(6, 'Tín hiệu liên tục (tương tự)', 'Continuous (analogue) signal') +
      '<path d="M30 78v112M30 134h240" stroke="#b9c6ea" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="' + sine + '" fill="none" stroke="' + C.teal + '" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/>' +
      panel(312, 'Tín hiệu số', 'Digital signal') +
      '<path d="M336 ' + y1 + 'h250M336 ' + y0 + 'h250" stroke="#b9c6ea" stroke-width="1.8" stroke-dasharray="3 5"/>' +
      '<text x="322" y="' + (y1 + 5) + '" font-family="monospace" font-size="14" font-weight="800" fill="' + C.pen + '">1</text>' +
      '<text x="322" y="' + (y0 + 5) + '" font-family="monospace" font-size="14" font-weight="800" fill="' + C.red + '">0</text>' +
      digits +
      '<path d="' + sq + '" fill="none" stroke="' + C.pen + '" stroke-width="4.2" stroke-linejoin="round"/>' +
      '<g transform="translate(300 118)"><circle r="16" fill="' + C.sun + '" ' + O() + '/>' +
      '<path d="M-7 0h12M0 -7l7 7-7 7" fill="none" ' + O(2.6) + '/></g>' +
      '<text x="153" y="214" text-anchor="middle" font-size="11.5" fill="' + C.ink + '" opacity=".7" class="en">smooth, any value</text>' +
      '<text x="459" y="214" text-anchor="middle" font-size="11.5" fill="' + C.ink + '" opacity=".7" class="en">only 0 or 1</text>';

    return svg('0 0 600 236', 'So sánh tín hiệu liên tục dạng sóng mượt với tín hiệu số chỉ có hai mức 0 và 1', inner, 'art--signals');
  }

  /* -------------------------------------------------------------------------
     6. Hình 1.4: công nghệ số ở trung tâm, sáu lĩnh vực xung quanh
     ------------------------------------------------------------------------- */
  function society() {
    const ic = (body) => '<g ' + O(2.4) + ' fill="none">' + body + '</g>';
    const icons = {
      edu: ic('<path d="M-17 -3 0 -12 17 -3 0 6z" fill="#fff"/><path d="M-9 1v8c0 4 18 4 18 0V1"/><path d="M17 -3v11"/>'),
      health: ic('<rect x="-14" y="-14" width="28" height="28" rx="8" fill="#fff"/><path d="M0 -7v14M-7 0h14" stroke="' + C.red + '" stroke-width="4.5"/>'),
      shop: ic('<path d="M-17 -12h5l4 19h18l4-14H-10" fill="#fff"/><circle cx="-3" cy="14" r="2.6" fill="' + C.ink + '"/><circle cx="11" cy="14" r="2.6" fill="' + C.ink + '"/>'),
      car: ic('<path d="M-18 8v-9l5-9h18l6 9v9z" fill="#fff"/><path d="M-12 -2h24"/><circle cx="-9" cy="9" r="4" fill="' + C.ink + '"/><circle cx="9" cy="9" r="4" fill="' + C.ink + '"/>'),
      gov: ic('<path d="M-18 -4 0 -16 18 -4z" fill="#fff"/><path d="M-13 0v14M-4.5 0v14M4.5 0v14M13 0v14M-18 16h36"/>'),
      play: ic('<rect x="-17" y="-12" width="34" height="24" rx="7" fill="#fff"/><path d="M-4 -6l10 6-10 6z" fill="' + C.red + '" stroke="none"/>')
    };

    const nodes = [
      { side: 'L', y: 52, bg: C.penL, icon: icons.edu, vi: 'Giáo dục', en: 'Education' },
      { side: 'L', y: 165, bg: C.tealL, icon: icons.health, vi: 'Y tế', en: 'Healthcare' },
      { side: 'L', y: 278, bg: C.sunL, icon: icons.shop, vi: 'Mua sắm', en: 'Shopping' },
      { side: 'R', y: 52, bg: C.greenL, icon: icons.car, vi: 'Giao thông', en: 'Transport' },
      { side: 'R', y: 165, bg: C.violetL, icon: icons.gov, vi: 'Dịch vụ công', en: 'Public services' },
      { side: 'R', y: 278, bg: C.redL, icon: icons.play, vi: 'Giải trí', en: 'Entertainment' }
    ];

    let links = '', dots = '';
    nodes.forEach((n) => {
      const cx = n.side === 'L' ? 64 : 536;
      links += '<path d="M300 165 L' + cx + ' ' + n.y + '" stroke="' + C.grey + '" stroke-width="2.4" stroke-dasharray="2 7" stroke-linecap="round"/>';
      const tx = n.side === 'L' ? cx + 44 : cx - 44;
      const a = n.side === 'L' ? 'start' : 'end';
      dots += '<circle cx="' + cx + '" cy="' + n.y + '" r="31" fill="' + n.bg + '" ' + O() + '/>' +
        at(cx, n.y, 1, n.icon) +
        label(tx, n.y - 1, n.vi, n.en, { anchor: a, size: 15, gap: 17 });
    });

    const inner =
      '<defs><linearGradient id="socG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a55e6"/><stop offset="1" stop-color="#17338f"/></linearGradient></defs>' +
      links +
      '<circle cx="300" cy="165" r="80" fill="none" stroke="' + C.pen + '" stroke-opacity=".3" stroke-width="2" stroke-dasharray="3 7"/>' +
      '<circle cx="300" cy="165" r="64" fill="url(#socG)" ' + O() + '/>' +
      '<text x="300" y="160" text-anchor="middle" font-size="15" font-weight="800" fill="#fff">Công nghệ số</text>' +
      '<text class="en" x="300" y="180" text-anchor="middle" font-size="11.5" fill="#fff" opacity=".9">Digital technology</text>' +
      dots;

    return svg('0 0 600 330', 'Công nghệ số ở trung tâm, kết nối với giáo dục, y tế, mua sắm, giao thông, dịch vụ công và giải trí', inner, 'art--society');
  }

  /* -------------------------------------------------------------------------
     7. Hình 1.1 — ti vi kĩ thuật số và bộ điều khiển
     ------------------------------------------------------------------------- */
  function tv() {
    const tile = (x, y, c) => '<rect x="' + x + '" y="' + y + '" width="30" height="20" rx="2" fill="' + c + '"/>';
    const inner =
      '<defs><linearGradient id="tvSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fd1ff"/><stop offset="1" stop-color="#e9f9ff"/></linearGradient></defs>' +
      '<rect x="10" y="10" width="220" height="130" rx="5" fill="#1b2438" ' + O(3) + '/>' +
      '<rect x="18" y="17" width="204" height="108" rx="2" fill="url(#tvSky)"/>' +
      '<path d="M18 100c40-22 80-10 120-24s60-8 84 4v45H18z" fill="#4fbf8a"/>' +
      '<path d="M150 45c8-16 18-22 30-24-4 8-6 14-6 24-8-4-16-4-24 0z" fill="#2c9a68"/>' +
      '<path d="M164 125c-2-30 2-52 12-70" stroke="#7a5a3a" stroke-width="5" fill="none" stroke-linecap="round"/>' +
      '<rect x="24" y="22" width="192" height="13" rx="3" fill="#14224a" opacity=".55"/>' +
      '<circle cx="32" cy="28.5" r="3" fill="#fff"/><rect x="40" y="26" width="42" height="5" rx="2" fill="#fff" opacity=".7"/>' +
      tile(28, 88, C.red) + tile(62, 88, C.sun) + tile(96, 88, C.teal) + tile(130, 88, C.violet) + tile(164, 88, C.pen) +
      '<rect x="28" y="112" width="178" height="5" rx="2.5" fill="#fff" opacity=".6"/>' +
      '<path d="M95 140v12M145 140v12M75 154h90" ' + O(3.5) + ' fill="none"/>' +
      '<g transform="translate(206 150) rotate(-24)">' +
      '<rect x="-12" y="-44" width="24" height="76" rx="9" fill="#1b2438" ' + O(2.5) + '/>' +
      '<circle cx="0" cy="-32" r="4" fill="' + C.red + '"/><circle cx="-5" cy="-18" r="2.6" fill="#8fa2d0"/><circle cx="5" cy="-18" r="2.6" fill="#8fa2d0"/>' +
      '<circle cx="-5" cy="-8" r="2.6" fill="#8fa2d0"/><circle cx="5" cy="-8" r="2.6" fill="#8fa2d0"/><circle cx="0" cy="4" r="3.2" fill="' + C.sun + '"/></g>' +
      '<path d="M190 130c-8-6-10-16-8-26M184 138c-14-8-18-22-14-36" stroke="' + C.pen + '" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-dasharray="1 6" opacity=".8"/>';
    return svg('0 0 250 170', 'Ti vi kĩ thuật số hiển thị danh sách kênh và bộ điều khiển từ xa đang gửi tín hiệu', inner, 'art--tv');
  }

  /* -------------------------------------------------------------------------
     8. Hình 1.2 — bốn thiết bị có bộ xử lí (a–d)
     ------------------------------------------------------------------------- */
  function devices4() {
    const tileBg = (x, c) => '<rect x="' + x + '" y="4" width="138" height="108" rx="4" fill="' + c + '" ' + O(2) + '/>';
    const row = (y, w) => '<rect x="12" y="' + y + '" width="' + w + '" height="4" rx="2" fill="#ffc34d"/>';
    /* a) bảng điện tử chuyến bay */
    const a = tileBg(4, '#1a1f2c') +
      '<rect x="12" y="12" width="122" height="12" fill="#2a3144"/><text x="100" y="22" font-size="9" font-weight="800" fill="#ffc34d" text-anchor="middle">Terminal B</text>' +
      [32, 42, 52, 62, 72, 82, 92].map((y, i) => row(y, 70 + (i * 17) % 40)).join('') +
      [32, 42, 52, 62, 72, 82, 92].map((y, i) => '<rect x="' + (96 + (i % 2) * 10) + '" y="' + y + '" width="24" height="4" rx="2" fill="#7fe3c4"/>').join('');
    /* b) máy chụp cắt lớp */
    const b = tileBg(148, '#eef2fa') +
      '<ellipse cx="217" cy="58" rx="46" ry="42" fill="#fff" ' + O(2.5) + '/><ellipse cx="217" cy="58" rx="26" ry="24" fill="#c7d3ea" ' + O(2.5) + '/>' +
      '<rect x="190" y="58" width="52" height="6" fill="#8aa0c8" opacity=".55"/>' +
      '<rect x="158" y="82" width="120" height="20" rx="8" fill="#fff" ' + O(2.5) + '/><rect x="170" y="86" width="60" height="6" rx="3" fill="' + C.penL + '"/>' +
      '<rect x="205" y="12" width="24" height="10" rx="3" fill="' + C.pen + '"/>';
    /* c) robot lắp ráp trong nhà máy */
    const c = tileBg(292, '#f3d9a0') +
      '<path d="M296 100h130" ' + O(3) + ' fill="none"/>' +
      '<g transform="translate(330 62) scale(.95)"><rect x="-30" y="28" width="60" height="8" rx="3" fill="' + C.ink + '"/>' +
      '<path d="M0 28 -4 -8 28 -22" stroke="' + C.ink + '" stroke-width="13" stroke-linecap="round" fill="none"/><path d="M0 28 -4 -8 28 -22" stroke="#ffb21c" stroke-width="8" stroke-linecap="round" fill="none"/>' +
      '<circle cx="-4" cy="-8" r="6" fill="#fff" ' + O(2) + '/><path d="M30 -34v20" ' + O(3) + ' fill="none"/></g>' +
      '<g transform="translate(392 62) scale(.95) scale(-1 1)"><rect x="-30" y="28" width="60" height="8" rx="3" fill="' + C.ink + '"/>' +
      '<path d="M0 28 -4 -8 28 -22" stroke="' + C.ink + '" stroke-width="13" stroke-linecap="round" fill="none"/><path d="M0 28 -4 -8 28 -22" stroke="#ffb21c" stroke-width="8" stroke-linecap="round" fill="none"/>' +
      '<circle cx="-4" cy="-8" r="6" fill="#fff" ' + O(2) + '/><path d="M30 -34v20" ' + O(3) + ' fill="none"/></g>' +
      '<rect x="330" y="82" width="62" height="18" rx="6" fill="' + C.red + '" ' + O(2.2) + '/><circle cx="342" cy="102" r="5" fill="' + C.ink + '"/><circle cx="380" cy="102" r="5" fill="' + C.ink + '"/>';
    /* d) ô tô tự lái, nhìn từ trong xe */
    const d = tileBg(436, '#a9c7ee') +
      '<path d="M436 70c40-14 90-14 138 0v42H436z" fill="#586379"/><path d="M500 112 505 62h4l9 50z" fill="#fff" opacity=".6"/>' +
      '<rect x="448" y="20" width="40" height="22" rx="3" fill="#fff" opacity=".7"/><rect x="520" y="16" width="42" height="26" rx="3" fill="#fff" opacity=".7"/>' +
      '<path d="M436 112c20-18 50-24 80-24s60 6 58 24z" fill="#1c2233"/>' +
      '<rect x="508" y="92" width="52" height="20" rx="4" fill="#14224a" ' + O(1.5) + '/><path d="M514 108l8-8 8 5 8-9 8 6 6-4" stroke="#5cf0b0" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '<circle cx="470" cy="96" r="13" fill="none" stroke="#fff" stroke-width="4" opacity=".9"/>' +
      '<text x="470" y="100" font-size="9" font-weight="800" fill="#fff" text-anchor="middle">AUTO</text>';
    const cap = (x, ch) => '<text x="' + x + '" y="134" font-size="15" font-style="italic" fill="' + C.ink + '" text-anchor="middle">' + ch + ')</text>';
    const inner = a + b + c + d + cap(73, 'a') + cap(217, 'b') + cap(361, 'c') + cap(505, 'd');
    return svg('0 0 578 142', 'Bốn thiết bị có bộ xử lí: a) bảng điện tử chuyến bay, b) máy chụp cắt lớp, c) robot lắp ráp, d) ô tô tự lái', inner, 'art--devices4');
  }

  /* -------------------------------------------------------------------------
     9. Hình 1.3 — kính viễn vọng không gian Hubble
     ------------------------------------------------------------------------- */
  function hubble() {
    const inner =
      '<defs><linearGradient id="hbT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f6fb"/><stop offset=".55" stop-color="#b9c3d6"/><stop offset="1" stop-color="#7c879e"/></linearGradient></defs>' +
      '<rect x="2" y="2" width="196" height="150" fill="#fff" stroke="#9aa8c7" stroke-width="1.5"/>' +
      '<g transform="translate(100 78) rotate(-32)">' +
      '<rect x="-74" y="-23" width="86" height="46" rx="7" fill="url(#hbT)" ' + O(2) + '/>' +
      '<rect x="-70" y="-27" width="30" height="54" rx="4" fill="#d7dde9" ' + O(2) + '/>' +
      '<rect x="10" y="-30" width="52" height="60" rx="5" fill="#c6a85a" ' + O(2) + '/><path d="M16-26v52M26-26v52M36-26v52M46-26v52M56-26v52" stroke="#8a6e2e" stroke-width="1.4"/>' +
      '<rect x="62" y="-24" width="14" height="48" rx="3" fill="#8a93a8" ' + O(2) + '/>' +
      '<rect x="-24" y="-60" width="38" height="30" fill="#2a3a6a" ' + O(1.8) + '/><path d="M-14-60v30M-4-60v30M6-60v30M-24-45h38" stroke="#6d86c7" stroke-width="1.2"/>' +
      '<rect x="-24" y="30" width="38" height="30" fill="#2a3a6a" ' + O(1.8) + '/><path d="M-14 30v30M-4 30v30M6 30v30M-24 45h38" stroke="#6d86c7" stroke-width="1.2"/>' +
      '</g>' +
      '<g fill="' + C.ink + '" opacity=".5"><circle cx="22" cy="24" r="1.4"/><circle cx="170" cy="30" r="1.4"/><circle cx="160" cy="130" r="1.4"/><circle cx="30" cy="124" r="1.4"/></g>';
    return svg('0 0 200 154', 'Kính viễn vọng không gian Hubble', inner, 'art--hubble');
  }

  /* -------------------------------------------------------------------------
     10. Hình 1.4 — bảng điều khiển ô tô tự lái
     ------------------------------------------------------------------------- */
  function car() {
    const inner =
      '<defs><linearGradient id="carSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b5fd0"/><stop offset="1" stop-color="#2f86ff"/></linearGradient></defs>' +
      '<rect x="0" y="0" width="200" height="154" fill="url(#carSky)"/>' +
      '<path d="M0 62h200v-4c-30-6-60-8-100-8s-70 2-100 8z" fill="#183c86" opacity=".7"/>' +
      '<g fill="#cfe3ff" opacity=".85"><rect x="14" y="34" width="12" height="24"/><rect x="30" y="26" width="14" height="32"/><rect x="150" y="30" width="14" height="28"/><rect x="170" y="38" width="12" height="20"/></g>' +
      '<path d="M70 62 20 100h160l-50-38z" fill="#2b2f45"/><path d="M100 62v40M92 100l6-38M110 100l-6-38" stroke="#fff" stroke-width="2.2" opacity=".8"/>' +
      '<rect x="88" y="56" width="22" height="12" rx="3" fill="#fff" opacity=".8"/><rect x="118" y="48" width="18" height="10" rx="3" fill="#fff" opacity=".6"/>' +
      '<circle cx="46" cy="34" r="9" fill="#fff" opacity=".85"/><text x="46" y="37" font-size="8" font-weight="800" fill="#e0393e" text-anchor="middle">90</text>' +
      '<path d="M0 154v-30c10-26 34-40 62-40h76c28 0 52 14 62 40v30z" fill="#12182c"/>' +
      '<circle cx="48" cy="108" r="22" fill="none" stroke="#9fb4e6" stroke-width="5"/><circle cx="48" cy="108" r="5" fill="#9fb4e6"/>' +
      '<rect x="92" y="98" width="62" height="40" rx="5" fill="#0b1226" stroke="#4a63a8" stroke-width="2"/>' +
      '<path d="M100 126l10-12 9 7 10-14 9 9 10-8 6 5" stroke="#5cf0b0" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<g fill="#ffc34d"><rect x="100" y="104" width="22" height="4" rx="2"/></g>' +
      '<rect x="160" y="104" width="30" height="30" rx="4" fill="#1d2a52"/><path d="M165 126h20M165 118h14" stroke="#7fa2ff" stroke-width="2.4" stroke-linecap="round"/>';
    return svg('0 0 200 154', 'Bảng điều khiển và màn hình của ô tô tự lái, đường cao tốc phía trước', inner, 'art--car');
  }


  /* -------------------------------------------------------------------------
     11. Hình cho Toán 9, Chương II
     ------------------------------------------------------------------------- */
  const pt = (x, y, col) => '<circle cx="' + x + '" cy="' + y + '" r="4.5" fill="' + (col || C.red) + '"/>';
  const tx = (x, y, t, o) => '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-size="' + ((o && o.size) || 13) + '" font-weight="700" fill="' + ((o && o.fill) || C.ink) + '"' + ((o && o.it) ? ' font-style="italic"' : '') + '>' + t + '</text>';

  /* Hình 2.1 — khu vườn vuông có lối đi xung quanh */
  function garden() {
    const inner =
      '<rect x="2" y="2" width="196" height="150" fill="#fff"/>' +
      '<rect x="40" y="20" width="120" height="120" fill="#cfd3dc" stroke="' + C.pen + '" stroke-width="3"/>' +
      '<rect x="62" y="42" width="76" height="76" fill="#4f9a3b" stroke="' + C.pen + '" stroke-width="3"/>' +
      '<path d="M62 42l76 76M138 42l-76 76" stroke="#3b7a2b" stroke-width="1" opacity=".35"/>' +
      '<path d="M140 80h20" stroke="' + C.ink + '" stroke-width="1.6"/><path d="M143 77l-4 3 4 3M157 77l4 3-4 3" stroke="' + C.ink + '" stroke-width="1.6" fill="none"/>' +
      tx(150, 100, 'x', { it: 1, fill: C.pen }) + tx(100, 14, '15', { fill: C.pen });
    return svg('0 0 200 154', 'Khu vườn hình vuông cạnh 15 m, có lối đi rộng x mét xung quanh', inner, 'art--garden');
  }

  /* Hình 2.2 — mảnh đất, nhà và sân vườn */
  function yard() {
    const inner =
      '<rect x="2" y="2" width="196" height="150" fill="#fff"/>' +
      '<rect x="40" y="26" width="120" height="104" fill="#fff" stroke="' + C.pen + '" stroke-width="3"/>' +
      '<rect x="40" y="42" width="84" height="88" fill="#b9dcf2" stroke="' + C.pen + '" stroke-width="3"/>' +
      tx(100, 38, 'Sân vườn', { fill: C.pen, size: 11 }) + tx(82, 88, 'Nhà', { fill: C.pen }) +
      tx(100, 16, '14', { fill: C.pen }) + tx(176, 80, '12', { fill: C.pen }) +
      tx(28, 38, 'x', { it: 1, fill: C.pen }) + tx(142, 146, 'x + 2', { it: 1, fill: C.pen, size: 11 }) +
      '<path d="M124 138h36" stroke="' + C.ink + '" stroke-width="1.6"/><path d="M127 135l-4 3 4 3M157 135l4 3-4 3" stroke="' + C.ink + '" stroke-width="1.6" fill="none"/>';
    return svg('0 0 200 154', 'Mảnh đất hình chữ nhật 14 m nhân 12 m, có nhà và sân vườn', inner, 'art--yard');
  }

  /* Hình 2.3 — biển báo tốc độ tối đa theo làn đường */
  function signs() {
    const lane = (x, n, col) =>
      '<circle cx="' + x + '" cy="40" r="21" fill="#fff" stroke="' + C.red + '" stroke-width="7"/>' +
      '<text x="' + x + '" y="48" text-anchor="middle" font-size="22" font-weight="800" fill="' + C.ink + '">' + n + '</text>' +
      '<rect x="' + (x - 14) + '" y="82" width="28" height="22" rx="6" fill="#fff" opacity=".92"/>' +
      '<circle cx="' + (x - 7) + '" cy="108" r="4" fill="#fff"/><circle cx="' + (x + 7) + '" cy="108" r="4" fill="#fff"/>';
    const inner =
      '<rect x="2" y="2" width="196" height="150" rx="4" fill="#1f79c9"/>' +
      '<path d="M69 8v138M133 8v138" stroke="#fff" stroke-width="2.4" stroke-dasharray="6 5"/>' +
      lane(36, 60) + lane(101, 50) + lane(166, 50) +
      '<text x="36" y="136" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">ô tô</text>' +
      '<text x="101" y="136" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">ô tô, xe máy</text>' +
      '<text x="166" y="136" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">xe máy, xe thô sơ</text>';
    return svg('0 0 200 154', 'Biển báo tốc độ tối đa cho từng làn đường: 60, 50 và 50 km/h', inner, 'art--signs');
  }

  /* Hình 2.4 — biển báo tốc độ tối thiểu */
  function sign60() {
    const inner =
      '<rect x="2" y="2" width="196" height="150" fill="#fff"/>' +
      '<circle cx="100" cy="77" r="58" fill="#0aa3e8"/>' +
      '<text x="100" y="98" text-anchor="middle" font-size="62" font-weight="800" fill="#fff">60</text>';
    return svg('0 0 200 154', 'Biển báo tốc độ tối thiểu 60 km/h', inner, 'art--sign60');
  }

  /* Trục số: -2,5 < -1 < 0 < 1 < 1,5 */
  function numline() {
    const xs = [[-2.5, '–2,5'], [-1, '–1'], [0, '0'], [1, '1'], [1.5, '1,5']];
    const X = (v) => 100 + v * 34;
    const inner =
      '<rect x="2" y="2" width="196" height="76" fill="#fff"/>' +
      '<path d="M8 34h178" stroke="' + C.ink + '" stroke-width="2"/><path d="M180 29l8 5-8 5" fill="none" stroke="' + C.ink + '" stroke-width="2"/>' +
      xs.map((a) => pt(X(a[0]), 34) + tx(X(a[0]), 58, a[1], { size: 12 })).join('');
    return svg('0 0 200 78', 'Trục số có các điểm −2,5; −1; 0; 1 và 1,5', inner, 'art--numline');
  }

  /* Tính chất bắc cầu: a < b < c */
  function transit() {
    const inner =
      '<rect x="2" y="2" width="196" height="76" fill="#fff"/>' +
      '<path d="M10 32h170" stroke="' + C.ink + '" stroke-width="2"/><path d="M174 27l8 5-8 5" fill="none" stroke="' + C.ink + '" stroke-width="2"/>' +
      [[46, 'a'], [100, 'b'], [152, 'c']].map((a) => pt(a[0], 32) + tx(a[0], 56, a[1], { it: 1, fill: C.pen, size: 15 })).join('');
    return svg('0 0 200 78', 'Ba điểm a, b, c trên trục số theo thứ tự từ trái sang phải', inner, 'art--transit');
  }


  window.TEXTBOOK = window.TEXTBOOK || {};
  window.TEXTBOOK.art = { hero: hero, warmup: warmup, places: places, process: process, signals: signals, society: society, tv: tv, devices4: devices4, hubble: hubble, car: car, garden: garden, yard: yard, signs: signs, sign60: sign60, numline: numline, transit: transit };
})();
