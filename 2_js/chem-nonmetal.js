/* ==========================================================================
   CHEM NONMETAL — KHTN 9, Bài 21 "Sự khác nhau cơ bản giữa phi kim và kim loại". Nạp SAU chem-series.js.
   Widget (LabSims): nm-ion (trọng tâm), nm-charcoal, nm-apps, nm-class, nm-oxide, nm-layers.
   Dùng lại: EnergyLab.sorter, ChemLab.dnd, OpticsLab.makeDrag, ChemLab.engine (extra(), balance()).
   Số liệu độ dẫn điện, độ hấp phụ, hiệu suất lọc… là MÔ HÌNH minh hoạ xu hướng; không thay cho đo đạc thật
   và không nêu tác dụng y tế nào ngoài những gì sách giáo khoa viết. Không tự thực hiện thí nghiệm cháy ở nhà.
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab, C = window.ChemLab, EL = window.EnergyLab;
  if (!L || !C || !C.engine || !EL) return;
  const { fmt, pr, clamp } = L, E = C.engine;
  const $ = (s, r) => r.querySelector(s), $$ = (s, r) => Array.from(r.querySelectorAll(s));
  const REDUCED = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  const SAFE = ['Không tự thực hiện ở nhà: đốt kim loại hoặc phi kim trong oxygen, dùng chlorine… đều cần giáo viên và dụng cụ bảo hộ trong phòng thí nghiệm.', 'Do not try this at home: burning metals or non-metals in oxygen, handling chlorine… all need a teacher and protective equipment in a laboratory.'];
  const wrap = (body, n) => { body.innerHTML = Array.from({ length: n }, (_, i) => '<div data-s' + i + '></div>').join(''); return Array.from({ length: n }, (_, i) => $('[data-s' + i + ']', body)); };
  let uid = 0;

  /* =========================================================== W21.4 — nhường / nhận electron */
  const PAIRS = {
    nacl: { give: { sym: 'Na', Z: 11, sh: [2, 8, 1], q: 1 }, take: { sym: 'Cl', Z: 17, sh: [2, 8, 7], q: 1 }, ex: 'na-cl2', eqG: 'Na → Na⁺ + 1e', eqT: 'Cl + 1e → Cl⁻', prod: 'NaCl', extra: false },
    mgo: { give: { sym: 'Mg', Z: 12, sh: [2, 8, 2], q: 2 }, take: { sym: 'O', Z: 8, sh: [2, 6], q: 2 }, ex: 'mg-o2', eqG: 'Mg → Mg²⁺ + 2e', eqT: 'O + 2e → O²⁻', prod: 'MgO', extra: true }
  };
  function nmIon(body) {
    const id = 'ni' + (++uid), S = { pair: 'nacl', p: 0, snap: true, ans: {} };
    body.innerHTML = '<div class="olab em chem" data-lab="' + id + '"><p class="olab__hint">' + pr('Kéo electron ngoài cùng của nguyên tử bên trái sang nguyên tử bên phải (hoặc dùng mũi tên ← →, Shift ±5, thanh trượt, ô số). Xem điện tích ion và phương trình.', 'Drag the outer electron of the left atom to the right atom (or use ← → arrows, Shift ±5, the slider or the number box). Watch the ion charges and the equations.') + '</p><div class="olab__btns"><label><input type="radio" name="' + id + 'p" value="nacl" checked> Na + Cl</label> <label><input type="radio" name="' + id + 'p" value="mgo"> Mg + O <small>(' + pr('bổ sung', 'extra') + ')</small></label> <label><input type="checkbox" data-snap checked> ' + pr('Hít về hai đầu', 'Snap to the ends') + '</label></div><svg class="olab__svg em__svg" viewBox="0 0 360 210" role="group" aria-label="Mô hình nguyên tử và electron / Atom and electron model" data-svg></svg><label class="olab__ctl"><span>' + pr('Đã chuyển', 'Transferred') + ' <output data-out>0</output> %</span><input type="range" min="0" max="100" step="1" value="0" data-k="p" aria-label="Tiến trình chuyển electron / Electron transfer progress"></label><label class="olab__ctl"><span>' + pr('Hoặc nhập số (0–100)', 'Or type a number (0–100)') + '</span><input type="number" min="0" max="100" step="1" value="0" data-n style="width:5em"></label><div class="olab__btns"><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button></div><div data-r="res" aria-live="polite"></div><div data-r="quiz"></div><p class="olab__status" data-r="status" role="status"></p></div>';
    const lab = $('[data-lab="' + id + '"]', body), svg = $('[data-svg]', lab), q = (n) => $('[data-r="' + n + '"]', lab);
    const GX = 80, TX = 270, CY = 105, R = [18, 32, 46];
    const dots = (cx, cy, atom, skip) => {                              // vẽ electron; skip = số electron ngoài cùng bị nhấc ra
      let s = '';
      atom.sh.forEach((n, k) => {
        s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + R[k] + '" fill="none" stroke="#9aa7bd" stroke-dasharray="2 3"/>';
        for (let i = 0; i < n; i++) {
          const outer = k === atom.sh.length - 1, ang = outer ? ((atom === PAIRS[S.pair].give ? 0 : 180) + (atom === PAIRS[S.pair].give ? i * -24 : -i * -24)) : (360 / n) * i + 20;
          let a = ang;
          if (outer && atom === PAIRS[S.pair].take) { const vac = atom.q; a = 180 + (i + vac) * (360 / (n + vac)); }
          if (outer && atom === PAIRS[S.pair].give && skip && i < skip) continue;
          const r = a * Math.PI / 180; s += '<circle cx="' + (cx + R[k] * Math.cos(r)).toFixed(1) + '" cy="' + (cy + R[k] * Math.sin(r)).toFixed(1) + '" r="3.6" fill="#2f6df0"/>';
        }
      });
      return s;
    };
    function draw() {
      const P = PAIRS[S.pair], done = S.p >= 100, n = P.give.q, give = P.give, take = P.take;
      const gOut = R[give.sh.length - 1], tOut = R[take.sh.length - 1];
      let s = '<rect width="360" height="210" fill="#f6f8fc"/>';
      s += '<circle cx="' + GX + '" cy="' + CY + '" r="13" fill="#e8a33a"/><text x="' + GX + '" y="' + (CY + 4) + '" text-anchor="middle" font-size="11" font-weight="700">' + give.Z + '+</text>' + dots(GX, CY, give, S.p > 0 ? n : 0);
      s += '<circle cx="' + TX + '" cy="' + CY + '" r="13" fill="#d9573e"/><text x="' + TX + '" y="' + (CY + 4) + '" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">' + take.Z + '+</text>' + dots(TX, CY, take, 0);
      const xa = GX + gOut, xb = TX - tOut;
      for (let i = 0; i < n; i++) { const t = S.p / 100, x = xa + (xb - xa) * t, y = CY - (i ? -14 : 0) - 16 * Math.sin(Math.PI * t) * (i ? 0.6 : 1) - i * 6; s += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="4.4" fill="#2f6df0" stroke="#fff"/>'; }
      const hy = CY - 16 * Math.sin(Math.PI * S.p / 100);
      s += '<g data-h="e" tabindex="0" role="slider" aria-label="Electron cần chuyển / Electron to move" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + Math.round(S.p) + '" transform="translate(' + (xa + (xb - xa) * S.p / 100).toFixed(1) + ',' + hy.toFixed(1) + ')" class="olab__hd olab__hd--src"><circle r="24" class="olab__hit"/><circle r="6" class="olab__dot"/></g>';
      const cg = done ? '+' : '', ct = done ? '−' : '';
      s += '<text x="' + GX + '" y="' + (CY + 70) + '" text-anchor="middle" font-size="14" font-weight="700">' + give.sym + (done ? (n > 1 ? '²⁺' : '⁺') : '') + '</text><text x="' + TX + '" y="' + (CY + 70) + '" text-anchor="middle" font-size="14" font-weight="700">' + take.sym + (done ? (n > 1 ? '²⁻' : '⁻') : '') + '</text>';
      if (done) s += '<g stroke="#2a8a4a" stroke-width="2.4" fill="none"><path d="M' + (GX + 62) + ' ' + (CY + 66) + ' H' + (TX - 70) + '"/><path d="M' + (GX + 70) + ' ' + (CY + 62) + ' l-8 4 l8 4 M' + (TX - 78) + ' ' + (CY + 62) + ' l8 4 l-8 4"/></g><text x="180" y="' + (CY + 58) + '" text-anchor="middle" font-size="11" fill="#2a8a4a">hút nhau / attract → ' + P.prod + '</text>';
      s += '<text x="' + GX + '" y="20" text-anchor="middle" font-size="12">' + (S.p > 0 && !done ? '…' : '') + (done ? 'nhường e / gives e' : 'nhường? / gives?') + '</text><text x="' + TX + '" y="20" text-anchor="middle" font-size="12">' + (done ? 'nhận e / takes e' : 'nhận? / takes?') + '</text>';
      void cg; void ct; { const hf = document.activeElement && svg.contains(document.activeElement) && document.activeElement.dataset.h; svg.innerHTML = s; if (hf) { const g = svg.querySelector('[data-h="' + hf + '"]'); if (g) g.focus({ preventScroll: true }); } }
      $('[data-out]', lab).textContent = Math.round(S.p); $('[data-k="p"]', lab).value = Math.round(S.p); $('[data-n]', lab).value = Math.round(S.p);
      const x = E.extra(P.ex), eqs = '<ul class="chem__eq"><li>' + P.eqG + '</li><li>' + P.eqT + '</li><li>' + E.eqStr(x) + '</li></ul>';
      q('res').innerHTML = done ? '<p>' + pr('Kim loại nhường electron tạo ion dương; phi kim nhận electron tạo ion âm. Hai ion trái dấu hút nhau tạo ' + P.prod + '.', 'The metal gives electrons and forms a positive ion; the non-metal takes electrons and forms a negative ion. The oppositely charged ions attract and form ' + P.prod + '.') + '</p>' + eqs + (P.extra ? '<p><small>' + pr('Ví dụ Mg–O (2 electron) là bổ sung, không in trong sách.', 'The Mg–O example (two electrons) is an extra, not printed in the book.') + '</small></p>' : '') : '<p class="muted">' + pr('Chuyển hết electron (100 %) để thấy ion hình thành.', 'Move the electron all the way (100 %) to see the ions form.') + '</p>';
      q('quiz').innerHTML = done ? '<p><b>' + pr('Ai nhường, ai nhận?', 'Who gives, who takes?') + '</b></p>' + [give, take].map((a, i) => '<div class="olab__btns"><span>' + a.sym + ':</span> <button type="button" class="btn btn--sm" data-ans="' + i + ':give">' + pr('nhường electron', 'gives electrons') + '</button> <button type="button" class="btn btn--sm" data-ans="' + i + ':take">' + pr('nhận electron', 'takes electrons') + '</button></div>').join('') : '';
    }
    const set = (v) => { let p = clamp(+v || 0, 0, 100); if (S.snap) { if (p > 90) p = 100; else if (p < 10) p = 0; } S.p = p; draw(); };
    L.makeDrag(svg, { e: { move(x) { const P = PAIRS[S.pair], xa = GX + R[P.give.sh.length - 1], xb = TX - R[P.take.sh.length - 1]; set((x - xa) / (xb - xa) * 100); }, key(d) { S.p = clamp(Math.round(S.p) + d, 0, 100); draw(); } } });
    svg.addEventListener('keydown', (e) => { if (/^Arrow/.test(e.key)) e.stopPropagation(); });
    lab.addEventListener('input', (e) => { if (e.target.matches('[data-k="p"],[data-n]')) { if (e.target.value === '') return; set(e.target.value); } });
    lab.addEventListener('change', (e) => { if (e.target.matches('[data-snap]')) S.snap = e.target.checked; else if (e.target.name === id + 'p') { S.pair = e.target.value; S.p = 0; draw(); q('status').textContent = ''; } });
    lab.addEventListener('click', (e) => {
      if (e.target.closest('[data-act="reset"]')) { S.p = 0; q('status').textContent = ''; draw(); return; }
      const a = e.target.closest('[data-ans]'); if (!a) return;
      const [i, w] = a.dataset.ans.split(':'), ok = (+i === 0 && w === 'give') || (+i === 1 && w === 'take'), P = PAIRS[S.pair];
      q('status').className = 'olab__status ' + (ok ? 'olab__status--ok' : 'olab__status--warn');
      q('status').innerHTML = ok ? '✓ ' + pr((+i === 0 ? P.give.sym + ' là kim loại nên dễ nhường electron.' : P.take.sym + ' là phi kim nên dễ nhận electron.'), (+i === 0 ? P.give.sym + ' is a metal, so it gives electrons easily.' : P.take.sym + ' is a non-metal, so it takes electrons easily.')) : '✗ ' + pr('Thử lại: nhìn electron đi từ nguyên tử nào sang nguyên tử nào.', 'Try again: look at which atom the electron leaves and which it joins.');
    });
    draw(); return { state: S };
  }

  /* =========================================================== W21.1 — than gỗ hấp phụ chất màu */
  function nmCharcoal(body) {
    const [a, b] = wrap(body, 2), P = { m: 5, c: 6 };
    const QCAP = 1.2, residual = (c, m) => Math.max(0, c - Math.min(c, QCAP * m));
    const items = [{ id: 'funnel', vi: 'Phễu', en: 'Funnel', to: ['funnel'] }, { id: 'cotton', vi: 'Nút bông', en: 'Cotton plug', to: ['cotton'] }, { id: 'char', vi: 'Lớp bột than gỗ', en: 'Charcoal powder layer', to: ['char'] }, { id: 'beaker', vi: 'Cốc thuỷ tinh', en: 'Glass beaker', to: ['beaker'] }];
    const svgOf = (S) => {
      const has = (k) => S.box[k].length > 0, ready = has('funnel') && has('cotton') && has('char') && has('beaker');
      const out = ready ? residual(P.c, P.m) : null, op = (v) => clamp(v / 10, 0, 1) * 0.9 + 0.05;
      let s = '<svg class="olab__svg em__svg" viewBox="0 0 360 250" role="img" aria-label="Thí nghiệm hấp phụ bằng than gỗ / Charcoal adsorption experiment"><rect width="360" height="250" fill="#f6f8fc"/>';
      if (has('beaker')) s += '<path d="M70 170 V235 H150 V170" fill="#fff" stroke="#333" stroke-width="2.4"/>' + (ready ? '<rect x="72" y="' + (235 - 14 - Math.min(40, 6 + P.c * 0)) + '" width="76" height="' + 14 + '" fill="#7b3fb5" opacity="' + op(out).toFixed(2) + '"/>' : '');
      if (has('funnel')) s += '<path d="M50 40 H170 L125 110 V150 H95 V110 Z" fill="#fff" fill-opacity=".7" stroke="#333" stroke-width="2.4"/><rect x="62" y="44" width="96" height="30" fill="#7b3fb5" opacity="' + op(P.c).toFixed(2) + '"/>';
      if (has('cotton') && has('funnel')) s += '<ellipse cx="110" cy="132" rx="14" ry="9" fill="#f1ece0" stroke="#999"/>';
      if (has('char') && has('funnel')) s += '<path d="M97 112 L123 112 L127 126 L93 126 Z" fill="#222" opacity=".9"/>' + (P.m > 0 ? '<rect x="' + (110 - 2 - P.m * 1.2) + '" y="' + (112 - P.m * 1.6) + '" width="' + (4 + P.m * 2.4) + '" height="' + (P.m * 1.6 + 2) + '" fill="#222" opacity=".85" rx="3"/>' : '');
      s += '<g transform="translate(220,0)"><text x="70" y="22" text-anchor="middle" font-size="11" fill="#1b2433">' + 'không có than / no charcoal' + '</text><path d="M30 120 V235 H110 V120" fill="#fff" stroke="#333" stroke-width="2.4"/><rect x="32" y="' + 205 + '" width="76" height="30" fill="#7b3fb5" opacity="' + op(P.c).toFixed(2) + '"/></g>';
      if (ready) s += '<text x="110" y="250" text-anchor="middle" font-size="11" fill="#1b2433">dịch lọc / filtrate: ' + fmt(out, 1) + '</text>';
      return s + '</svg>';
    };
    const cfg = { hint: ['Lắp ống lọc: kéo (hoặc bấm) bốn bộ phận vào đúng ô: phễu, nút bông, lớp bột than, cốc hứng. Rồi kéo thanh trượt lượng than và nồng độ nước màu.', 'Set up the filter: drag (or click) the four parts into their slots: funnel, cotton plug, charcoal layer, beaker. Then move the sliders for the charcoal amount and dye concentration.'],
      boxes: [{ id: 'funnel', vi: 'Phễu', en: 'Funnel', cap: 1 }, { id: 'cotton', vi: 'Bông ở cổ phễu', en: 'Cotton in the neck', cap: 1 }, { id: 'char', vi: 'Lớp than gỗ', en: 'Charcoal layer', cap: 1 }, { id: 'beaker', vi: 'Cốc hứng', en: 'Beaker', cap: 1 }], items,
      extra: (S) => svgOf(S), explain: ['Than gỗ giữ các phân tử chất màu trên bề mặt (tính hấp phụ), nên dung dịch thu được mất màu.', 'Charcoal holds the dye molecules on its surface (adsorption), so the filtrate loses its colour.'] };
    const r = EL.sorter(a, cfg);
    b.innerHTML = '<label class="olab__ctl"><span>' + pr('Lượng than', 'Charcoal amount') + ' <output data-o="m">5</output> g</span><input type="range" data-p="m" min="0" max="10" step="0.5" value="5" aria-label="Lượng than / Charcoal amount"></label><label class="olab__ctl"><span>' + pr('Nồng độ nước màu (tương đối)', 'Dye concentration (relative)') + ' <output data-o="c">6</output></span><input type="range" data-p="c" min="1" max="10" step="0.5" value="6" aria-label="Nồng độ nước màu / Dye concentration"></label><p class="olab__hint"><small>' + pr('Mô hình: mỗi gam than giữ tối đa 1,2 đơn vị chất màu; nhiều chất màu hơn khả năng giữ thì dịch lọc vẫn còn màu. Chỉ minh hoạ xu hướng, không có số đo thật.', 'Model: each gram of charcoal holds at most 1.2 units of dye; if there is more dye than it can hold, the filtrate keeps some colour. It shows a trend only, not real measurements.') + '</small></p><p class="olab__hint"><small>' + pr(SAFE[0], SAFE[1]) + '</small></p>';
    b.addEventListener('input', (e) => { const k = e.target.dataset && e.target.dataset.p; if (!k) return; P[k] = +e.target.value; $('[data-o="' + k + '"]', b).textContent = fmt(P[k], 1); r.render(); });
    return { state: r.state };
  }

  /* =========================================================== W21.2 — ứng dụng + lưu hoá cao su */
  function nmApps(body) {
    const [a, b] = wrap(body, 2);
    const T = (id, vi, en, to) => ({ id, vi, en, to: [to] });
    EL.sorter(a, { hint: ['Kéo mỗi ứng dụng vào phi kim tương ứng (Hình 21.1, 21.2 và các ví dụ trong bài).', 'Drag each use onto the matching non-metal (Figures 21.1, 21.2 and the examples in the lesson).'],
      boxes: [{ id: 'C', vi: 'Carbon', en: 'Carbon' }, { id: 'S', vi: 'Lưu huỳnh', en: 'Sulfur' }, { id: 'Cl', vi: 'Chlorine', en: 'Chlorine' }],
      items: [T('a1', 'Mặt nạ phòng độc (than hoạt tính)', 'Gas mask (activated carbon)', 'C'), T('a2', 'Khử màu, khử mùi', 'Removing colour and smell', 'C'), T('a3', 'Than cốc luyện kim', 'Coke in metallurgy', 'C'), T('a4', 'Điện cực, ruột bút chì (than chì)', 'Electrodes, pencil lead (graphite)', 'C'), T('a5', 'Mũi khoan, dao cắt kính (kim cương)', 'Drill bits, glass cutters (diamond)', 'C'),
        T('s1', 'Lưu hoá cao su', 'Vulcanising rubber', 'S'), T('s2', 'Sản xuất thuốc diệt nấm', 'Making fungicides', 'S'), T('s3', 'Sản xuất pháo hoa, diêm', 'Making fireworks and matches', 'S'), T('s4', 'Sản xuất dược phẩm', 'Making medicines', 'S'),
        T('c1', 'Khử trùng nước sinh hoạt', 'Disinfecting domestic water', 'Cl'), T('c2', 'Sản xuất nước Javel, chất tẩy rửa', 'Making Javel water and detergents', 'Cl'), T('c3', 'Tẩy trắng vải, sợi, bột giấy', 'Bleaching cloth, fibre, pulp', 'Cl'), T('c4', 'Sản xuất chất dẻo', 'Making plastics', 'Cl')],
      explain: ['Mỗi phi kim có ứng dụng riêng dựa trên tính chất của nó.', 'Each non-metal has its own uses, based on its properties.'] });
    const S = { n: 3 };
    const draw = () => {
      const n = S.n, strength = 1 - Math.exp(-n / 3), elastic = 1 - Math.exp(-n / 4);
      let s = '<svg class="olab__svg em__svg" viewBox="0 0 360 150" role="img" aria-label="Lưu hoá cao su: cầu nối lưu huỳnh / Vulcanisation: sulfur bridges"><rect width="360" height="150" fill="#f6f8fc"/>';
      for (let k = 0; k < 4; k++) { const y = 20 + k * 28; s += '<path d="M10 ' + y + ' q20 -12 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" fill="none" stroke="#6b7a90" stroke-width="2.4"/>'; }
      for (let i = 0; i < n; i++) { const k = i % 3, x = 30 + ((i * 53) % 300), y1 = 20 + k * 28, y2 = y1 + 28; s += '<line x1="' + x + '" y1="' + y1 + '" x2="' + x + '" y2="' + y2 + '" stroke="#e0b800" stroke-width="3"/><circle cx="' + x + '" cy="' + ((y1 + y2) / 2) + '" r="3.5" fill="#e0b800"/>'; }
      s += '<text x="12" y="138" font-size="11" fill="#1b2433">' + n + ' cầu nối S / S bridges</text></svg>';
      b.querySelector('[data-viz]').innerHTML = s + '<p>' + pr('Mạng lưới chắc hơn: độ bền ' + fmt(strength * 100, 0) + ' %, đàn hồi ' + fmt(elastic * 100, 0) + ' % (so với mức bão hoà, số liệu minh hoạ).', 'A firmer network: strength ' + fmt(strength * 100, 0) + ' %, elasticity ' + fmt(elastic * 100, 0) + ' % (relative to saturation, illustrative figures).') + '</p>';
      $('[data-o]', b).textContent = n;
    };
    b.innerHTML = '<p class="olab__hint"><b>' + pr('Lưu hoá cao su (Charles Goodyear, 1839)', 'Vulcanising rubber (Charles Goodyear, 1839)') + '</b> ' + pr('Kéo thanh trượt số cầu nối lưu huỳnh giữa các mạch cao su.', 'Move the slider for the number of sulfur bridges between the rubber chains.') + '</p><label class="olab__ctl"><span>' + pr('Số cầu nối', 'Bridges') + ' <output data-o>3</output></span><input type="range" min="0" max="10" step="1" value="3" data-n aria-label="Số cầu nối lưu huỳnh / Number of sulfur bridges"></label><div data-viz></div><p class="olab__hint"><small>' + pr('Sách nêu xu hướng: có cầu nối thì mạng lưới chắc chắn, đàn hồi hơn. Các phần trăm chỉ là mô hình minh hoạ.', 'The book states the trend: with bridges the network is firmer and more elastic. The percentages are an illustrative model.') + '</small></p>';
    b.addEventListener('input', (e) => { if (e.target.matches('[data-n]')) { S.n = +e.target.value; draw(); } });
    draw(); return { state: S };
  }

  /* =========================================================== W21.3 — phân loại + thử dẫn điện */
  const SAMPLES = [
    { id: 'Cu', vi: 'Đồng Cu', en: 'Copper Cu', to: ['metal', 'solid'], sigma: 100 }, { id: 'Fe', vi: 'Sắt Fe', en: 'Iron Fe', to: ['metal', 'solid'], sigma: 17 }, { id: 'Hg', vi: 'Thuỷ ngân Hg', en: 'Mercury Hg', to: ['metal', 'liquid'], sigma: 2 },
    { id: 'S', vi: 'Lưu huỳnh S', en: 'Sulfur S', to: ['nonmetal', 'solid'], sigma: 0 }, { id: 'C', vi: 'Kim cương C', en: 'Diamond C', to: ['nonmetal', 'solid'], sigma: 0 }, { id: 'Gr', vi: 'Than chì C', en: 'Graphite C', to: ['nonmetal', 'solid'], sigma: 6 },
    { id: 'Si', vi: 'Silicon Si (tinh khiết)', en: 'Silicon Si (pure)', to: ['nonmetal', 'solid'], sigma: 1 }, { id: 'Cl2', vi: 'Chlorine Cl₂', en: 'Chlorine Cl₂', to: ['nonmetal', 'gas'], sigma: 0 }, { id: 'Br2', vi: 'Bromine Br₂', en: 'Bromine Br₂', to: ['nonmetal', 'liquid'], sigma: 0 }, { id: 'O2', vi: 'Oxygen O₂', en: 'Oxygen O₂', to: ['nonmetal', 'gas'], sigma: 0 }];
  function nmClass(body) {
    const [a, b] = wrap(body, 2);
    EL.sorter(a, { hint: ['Phân loại mỗi chất: kim loại hay phi kim, và thể ở nhiệt độ thường (rắn, lỏng, khí). Mỗi thẻ cần đặt vào hai ô; bấm Kiểm tra.', 'Classify each substance: metal or non-metal, and its state at room temperature (solid, liquid, gas). Each card goes into two boxes; press Check.'],
      boxes: [{ id: 'metal', vi: 'Kim loại', en: 'Metal' }, { id: 'nonmetal', vi: 'Phi kim', en: 'Non-metal' }, { id: 'solid', vi: 'Thể rắn', en: 'Solid' }, { id: 'liquid', vi: 'Thể lỏng', en: 'Liquid' }, { id: 'gas', vi: 'Thể khí', en: 'Gas' }], multi: 1,
      items: SAMPLES.map((s) => ({ id: s.id, vi: s.vi, en: s.en, to: s.to })), explain: ['Hầu hết kim loại là chất rắn (riêng Hg lỏng); phi kim có thể rắn, lỏng (Br₂) hoặc khí.', 'Most metals are solid (only Hg is liquid); non-metals can be solid, liquid (Br₂) or gas.'] });
    const bulb = (v) => '<svg class="olab__svg em__svg" viewBox="0 0 360 120" role="img" aria-label="Mạch có bóng đèn / Circuit with a bulb"><rect width="360" height="120" fill="#f6f8fc"/><path d="M40 90 V40 H150 M210 40 H320 V90 H40" fill="none" stroke="#333" stroke-width="2.4"/><rect x="120" y="82" width="120" height="16" rx="4" fill="#cfd5e0" stroke="#333"/><text x="180" y="114" text-anchor="middle" font-size="11">' + (v == null ? 'đặt mẫu ở đây / sample here' : '') + '</text><circle cx="180" cy="40" r="22" fill="' + (v ? '#ffe45a' : '#e8ebf1') + '" fill-opacity="' + (v ? 0.25 + 0.75 * clamp(v / 100, 0.08, 1) : 1) + '" stroke="#333" stroke-width="2.4"/>' + (v ? '<g stroke="#e0a800" stroke-width="2.4" opacity="' + clamp(v / 100 + 0.2, 0.2, 1) + '"><path d="M180 6 v-8 M206 18 l6 -6 M154 18 l-6 -6"/></g>' : '') + '</svg>';
    b.innerHTML = '<p class="olab__hint">' + pr('Thử dẫn điện: bấm một mẫu để đặt vào mạch có bóng đèn. Độ sáng là số liệu tương đối minh hoạ (Cu = 100).', 'Conductivity test: press a sample to put it in a circuit with a bulb. Brightness is an illustrative relative figure (Cu = 100).') + '</p><div class="olab__btns">' + SAMPLES.map((s) => '<button type="button" class="btn btn--sm" data-sm="' + s.id + '">' + pr(s.vi, s.en) + '</button>').join(' ') + '</div><div data-viz>' + bulb(null) + '</div><p class="olab__status" data-st role="status"></p>';
    b.addEventListener('click', (e) => {
      const t = e.target.closest('[data-sm]'); if (!t) return; const s = SAMPLES.find((x) => x.id === t.dataset.sm);
      $('[data-viz]', b).innerHTML = bulb(s.sigma);
      const m = s.id === 'Si' ? ['Silicon tinh khiết là chất bán dẫn: dẫn điện rất kém ở nhiệt độ thường.', 'Pure silicon is a semiconductor: it conducts very poorly at room temperature.'] : s.id === 'Gr' ? ['Than chì có dẫn điện nhưng yếu hơn kim loại.', 'Graphite conducts, but more weakly than metals.'] : s.sigma >= 2 ? ['Kim loại dẫn điện tốt: bóng đèn sáng.', 'Metals conduct well: the bulb lights.'] : ['Phi kim thường không dẫn điện: bóng đèn không sáng.', 'Non-metals usually do not conduct: the bulb stays dark.'];
      $('[data-st]', b).textContent = ''; $('[data-st]', b).innerHTML = '<b>' + pr(s.vi, s.en) + ':</b> ' + pr(m[0], m[1]) + ' <small>' + pr('Độ sáng tương đối ≈ ' + fmt(s.sigma, 0), 'Relative brightness ≈ ' + fmt(s.sigma, 0)) + '</small>';
    });
    return {};
  }

  /* =========================================================== W21.5 — cháy trong O2: oxide base / oxide acid */
  const BURN = { Mg: 'mg-o2', Na: 'na-o2', S: 's-o2', C: 'c-o2' };
  function nmOxide(body) {
    const [a, b] = wrap(body, 2), S = { x: null, coef: null }, oid = 'oxl' + (++uid);
    a.innerHTML = '<div class="olab em chem" data-lab="' + oid + '"><p class="olab__hint">' + pr('Kéo Mg, Na (kim loại) hoặc S, C (phi kim) vào bình khí oxygen. Rồi tự viết hệ số phương trình và bấm Kiểm tra.', 'Drag Mg, Na (metals) or S, C (non-metals) into the oxygen jar. Then write the coefficients yourself and press Check.') + '</p><div class="olab__cols"><div class="olab__stage"><div data-zone="jar" tabindex="0" role="button" aria-label="Bình khí oxygen: kéo hoặc bấm để thả vào / Oxygen jar: drop here"><svg class="olab__svg em__svg" viewBox="0 0 360 240" data-jar></svg></div><div class="pw__zone" data-pool>' + Object.keys(BURN).map((k) => '<span class="pw__chip" role="button" tabindex="0" data-chip data-kind="x" data-val="' + k + '"><b>' + k + '</b> <small>' + (k === 'Mg' || k === 'Na' ? 'kim loại / metal' : 'phi kim / non-metal') + '</small></span>').join('') + '</div></div><div class="olab__panel"><div data-r="res"></div></div></div><p class="olab__status" data-r="status" role="status"></p><p class="olab__hint"><small>⚠ ' + pr(SAFE[0], SAFE[1]) + '</small></p></div>';
    const lab = $('[data-lab="' + oid + '"]', a), q = (n) => $('[data-r="' + n + '"]', lab);
    const jar = () => { const s = S.x; let h = '<rect width="360" height="240" fill="#f6f8fc"/><path d="M110 30 V200 Q110 225 140 225 H220 Q250 225 250 200 V30" fill="#f2f8ff" stroke="#333" stroke-width="3"/>'; if (s) { const fl = { Mg: '#fff6c8', Na: '#ffb347', S: '#6a8cff', C: '#ff7a3a' }[s]; h += '<g transform="translate(170,150)"><circle r="11" fill="#cdd2da" stroke="#555"/><text y="4" text-anchor="middle" font-size="11" font-weight="700">' + s + '</text></g><g fill="none" stroke="' + fl + '" stroke-width="3.4" opacity=".9"><path d="M160 135 l-12 -22 M172 132 v-28 M184 135 l12 -22"/></g>'; } else h += '<text x="180" y="120" text-anchor="middle" font-size="13" fill="#7a8aa6">Kéo chất vào bình / drag a substance in</text>'; return h + '<text x="180" y="238" text-anchor="middle" font-size="12">O₂</text>'; };
    function show() {
      $('[data-jar]', lab).innerHTML = jar(); if (!S.x) { q('res').innerHTML = ''; return; }
      const x = E.extra(BURN[S.x]), sp = x.re.concat(x.pr), oxide = x.pr[0].f, kind = (S.x === 'Mg' || S.x === 'Na') ? 'base' : 'acid';
      q('res').innerHTML = '<div class="chem__eq">' + sp.map((s, i) => (i === x.re.length ? ' <span class="chem__arr"><small>t°</small>→</span> ' : (i ? ' + ' : '')) + '<input type="number" min="1" max="9" class="chem__n" data-co="' + i + '" aria-label="Hệ số của ' + E.uni(s.f) + ' / coefficient of ' + E.uni(s.f) + '"> ' + E.uni(s.f)).join('') + '</div><div class="olab__btns"><button type="button" class="btn btn--sm" data-chk>' + pr('Kiểm tra', 'Check') + '</button></div><p>' + pr('Sản phẩm: ' + E.uni(oxide) + ' — oxide ' + (kind === 'base' ? 'base' : 'acid') + '.', 'Product: ' + E.uni(oxide) + ' — ' + (kind === 'base' ? 'basic' : 'acidic') + ' oxide.') + '</p>';
      q('status').textContent = '';
    }
    const dd = C.dnd(lab, { drop(kind, val, zone) { if (zone !== 'jar') return; S.x = val; show(); } });
    lab.addEventListener('click', (e) => {
      if (!e.target.closest('[data-chk]')) return; const x = E.extra(BURN[S.x]), v = $$('[data-co]', lab).map((i) => +i.value || 0), want = x.re.concat(x.pr).map((s) => s.n);
      const g = v.reduce((p, c) => { while (c) { const t = p % c; p = c; c = t; } return p; }, 0) || 1, ok = v.every((n) => n > 0) && JSON.stringify(v.map((n) => n / g)) === JSON.stringify(want) && g === 1;
      q('status').className = 'olab__status ' + (ok ? 'olab__status--ok' : 'olab__status--warn');
      q('status').innerHTML = ok ? '✓ ' + pr('Đúng: ' + E.eqStr(x), 'Correct: ' + E.eqStr(x)) : '✗ ' + pr('Chưa cân bằng. Đếm số nguyên tử mỗi nguyên tố ở hai vế (hệ số nguyên tối giản).', 'Not balanced. Count the atoms of each element on both sides (lowest whole numbers).');
    });
    EL.sorter(b, { hint: ['Phân loại oxide: oxide base hay oxide acid? (MgO và SO₂ có trong sách; các oxide còn lại là ví dụ mở rộng.)', 'Classify the oxides: basic or acidic? (MgO and SO₂ are in the book; the others are extended examples.)'],
      boxes: [{ id: 'base', vi: 'Oxide base', en: 'Basic oxide' }, { id: 'acid', vi: 'Oxide acid', en: 'Acidic oxide' }],
      items: [{ id: 'MgO', vi: 'MgO', en: 'MgO', to: ['base'] }, { id: 'CaO', vi: 'CaO (mở rộng)', en: 'CaO (extended)', to: ['base'] }, { id: 'Na2O', vi: 'Na₂O (mở rộng)', en: 'Na₂O (extended)', to: ['base'] }, { id: 'SO2', vi: 'SO₂', en: 'SO₂', to: ['acid'] }, { id: 'CO2', vi: 'CO₂ (mở rộng)', en: 'CO₂ (extended)', to: ['acid'] }, { id: 'P2O5', vi: 'P₂O₅ (mở rộng)', en: 'P₂O₅ (extended)', to: ['acid'] }],
      explain: ['Kim loại tạo oxide base; phi kim thường tạo oxide acid.', 'Metals form basic oxides; non-metals usually form acidic oxides.'] });
    show(); return { state: S, dd };
  }

  /* =========================================================== W21.6 — lớp lọc nước / mặt nạ */
  function nmLayers(body) {
    const LAY = { gravel: { vi: 'Sỏi', en: 'Gravel', big: 0.6, fine: 0.1, odor: 0 }, sand: { vi: 'Cát', en: 'Sand', big: 0.3, fine: 0.6, odor: 0 }, carbon: { vi: 'Than hoạt tính', en: 'Activated carbon', big: 0, fine: 0.1, odor: 0.9 } };
    const [a] = wrap(body, 1);
    const calc = (S) => { const on = ['l1', 'l2', 'l3'].map((k) => S.box[k][0]).filter(Boolean); let big = 100, fine = 100, odor = 100; on.forEach((k) => { big *= 1 - LAY[k].big; fine *= 1 - LAY[k].fine; odor *= 1 - LAY[k].odor; }); return { on, big, fine, odor }; };
    const bar = (lv, le, v) => '<div class="chem__bar"><span>' + pr(lv, le) + ' ' + fmt(v, 0) + ' %</span><i style="display:block;height:8px;border-radius:4px;background:#7b3fb5;width:' + clamp(v, 0, 100) + '%"></i></div>';
    EL.sorter(a, { hint: ['Xếp các lớp vào cột lọc (từ trên xuống) rồi xem phần còn lại của hạt thô, hạt mịn và chất màu/mùi sau khi qua cột. Chỉ minh hoạ, không thay thiết bị lọc thật.', 'Stack the layers in the filter column (top to bottom) and see how much coarse particles, fine particles and colour/smell remain. Illustrative only, not a substitute for real filtration equipment.'],
      boxes: [{ id: 'l1', vi: 'Lớp 1 (trên)', en: 'Layer 1 (top)', cap: 1 }, { id: 'l2', vi: 'Lớp 2', en: 'Layer 2', cap: 1 }, { id: 'l3', vi: 'Lớp 3 (dưới)', en: 'Layer 3 (bottom)', cap: 1 }],
      items: Object.keys(LAY).map((k) => ({ id: k, vi: LAY[k].vi, en: LAY[k].en, to: ['l1', 'l2', 'l3'] })),
      extra: (S) => { const c = calc(S); return '<div class="olab__panel"><p><b>' + pr('Còn lại sau khi lọc', 'Remaining after filtering') + '</b></p>' + bar('Hạt thô', 'Coarse particles', c.big) + bar('Hạt mịn', 'Fine particles', c.fine) + bar('Chất màu, mùi (hấp phụ)', 'Colour and smell (adsorbed)', c.odor) + '<p><small>' + pr('Than hoạt tính giữ chất màu, mùi nhờ tính hấp phụ; cát, sỏi giữ hạt. Phần trăm là mô hình. Nước sau lọc chưa chắc đã an toàn để uống.', 'Activated carbon holds colour and smell by adsorption; sand and gravel hold particles. The percentages are a model. Filtered water is not necessarily safe to drink.') + '</small></p></div>'; },
      explain: ['Mỗi lớp giữ một loại chất; than hoạt tính giữ chất màu và mùi nhờ hấp phụ.', 'Each layer holds a different kind of substance; activated carbon holds colour and smell by adsorption.'] });
    return {};
  }

  const sims = {
    'nm-ion': { fn: nmIon, vi: 'Nhường và nhận electron: Na + Cl → NaCl', en: 'Giving and taking electrons: Na + Cl → NaCl', intro: 'Kéo electron từ Na sang Cl.' },
    'nm-charcoal': { fn: nmCharcoal, vi: 'Than gỗ hấp phụ chất màu (Hình 21.1)', en: 'Charcoal adsorbs dye (Figure 21.1)', intro: 'Lắp ống lọc rồi chỉnh lượng than.' },
    'nm-apps': { fn: nmApps, vi: 'Ứng dụng của carbon, lưu huỳnh, chlorine (Hình 21.2)', en: 'Uses of carbon, sulfur and chlorine (Figure 21.2)', intro: 'Kéo ứng dụng vào đúng phi kim.' },
    'nm-class': { fn: nmClass, vi: 'Phân loại kim loại / phi kim và thử dẫn điện', en: 'Metals / non-metals and a conductivity test', intro: 'Phân loại rồi thử mạch điện.' },
    'nm-oxide': { fn: nmOxide, vi: 'Cháy trong oxygen: oxide base và oxide acid', en: 'Burning in oxygen: basic and acidic oxides', intro: 'Kéo chất vào bình O₂.' },
    'nm-layers': { fn: nmLayers, vi: 'Các lớp lọc nước và mặt nạ phòng độc', en: 'Water-filter layers and gas masks', intro: 'Xếp lớp lọc.' }
  };
  void REDUCED;
  window.LabSims = Object.assign(window.LabSims || {}, sims);
})();
