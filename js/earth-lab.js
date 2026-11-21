/* ==========================================================================
   EARTH LAB — engine thuần cho Bài 33 (và dùng lại cho Bài 34–35: đá vôi, silicate). Nạp SAU prot-lab.js, TRƯỚC mol-w33.js.
   window.EarthLab = { engine, selfTest }; selfTest nối vào OpticsLab.engine.selfTest.
   Số liệu Bảng 33.1 (CRC Handbook, 97th ed.) đọc từ bản scan: O 46,10; Si 28,20; Al 8,23; Fe 5,63; Ca 4,15; Na 2,36; K 2,09; Mg 2,33.
   CÁCH THÊM: loại đá mới → thêm vào ROCKS (thành phần, loại hợp chất, carbonate?); tài nguyên → thêm vào RES.
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab;
  if (!L) return;
  const near = (a, b, e) => Math.abs(a - b) <= e;
  /* ---- Bảng 33.1 (% khối lượng) ---- */
  const EL = [['O', 'oxygen', 46.10], ['Si', 'silicon', 28.20], ['Al', 'nhôm', 8.23], ['Fe', 'sắt', 5.63], ['Ca', 'calcium', 4.15], ['Na', 'natri', 2.36], ['K', 'kali (potassium)', 2.09], ['Mg', 'magnesium', 2.33]]
    .map((r) => ({ sym: r[0], name: r[1], pct: r[2] }));
  const sum = (a) => a.reduce((s, x) => s + x.pct, 0);
  const total = () => Math.round(sum(EL) * 100) / 100;                    // 99,09
  const other = () => Math.round((100 - sum(EL)) * 100) / 100;            // 0,91
  const sorted = () => EL.slice().sort((a, b) => b.pct - a.pct).map((x) => x.sym);
  const metals = () => Math.round(EL.filter((x) => x.sym !== 'O' && x.sym !== 'Si').reduce((s, x) => s + x.pct, 0) * 100) / 100;   // 24,79
  const of = (s) => EL.find((x) => x.sym === s).pct;
  /* chấm biểu đồ học sinh tự dựng: vals = {O:…, Si:…}; tol = sai số cho phép (điểm phần trăm) */
  function grade(vals, tol) {
    tol = tol == null ? 1 : tol; const bad = [];
    EL.forEach((x) => { const v = +vals[x.sym]; if (!isFinite(v) || Math.abs(v - x.pct) > tol) bad.push(x.sym); });
    return { ok: bad.length === 0, bad, sum: Math.round(EL.reduce((s, x) => s + (isFinite(+vals[x.sym]) ? +vals[x.sym] : 0), 0) * 100) / 100 };
  }
  /* toạ độ lát biểu đồ tròn (góc bắt đầu–kết thúc, độ); phần “khác” cộng thêm */
  function pie(vals) {
    const items = EL.map((x) => ({ sym: x.sym, v: Math.max(0, +vals[x.sym] || 0) })), oth = Math.max(0, 100 - items.reduce((s, x) => s + x.v, 0));
    items.push({ sym: 'khác', v: oth }); const T = items.reduce((s, x) => s + x.v, 0) || 1; let a = 0;
    return items.map((x) => { const d = (x.v / T) * 360, r = { sym: x.sym, v: x.v, a0: a, a1: a + d }; a += d; return r; });
  }
  /* ---- đá (Hình 33.1 + đá vôi, đá phấn) ---- */
  const ROCKS = {
    quartz: { vi: 'Thạch anh', en: 'Quartz', comp: 'SiO₂', cls: 'oxide', els: ['Si', 'O'], carb: false, fig: 'a' },
    dolomite: { vi: 'Dolomite', en: 'Dolomite', comp: 'CaCO₃·MgCO₃', cls: 'carbonate', els: ['Ca', 'Mg', 'C', 'O'], carb: true, fig: 'b' },
    granite: { vi: 'Đá hoa cương (granite)', en: 'Granite', comp: 'muối silicate của Al, Na, K, Ca…', cls: 'silicate', els: ['Si', 'O', 'Al', 'Na', 'K', 'Ca'], carb: false, fig: 'c' },
    marble: { vi: 'Đá cẩm thạch', en: 'Marble', comp: 'CaCO₃, CaCO₃·MgCO₃…', cls: 'carbonate', els: ['Ca', 'C', 'O', 'Mg'], carb: true, fig: 'd' },
    limestone: { vi: 'Đá vôi', en: 'Limestone', comp: 'CaCO₃', cls: 'carbonate', els: ['Ca', 'C', 'O'], carb: true, ext: true }
  };
  const classOf = (k) => (ROCKS[k].cls === 'oxide' ? 'oxide' : 'salt');
  /* thử đá bằng HCl (bổ sung): carbonate + HCl → muối + H₂O + CO₂↑ (sủi bọt) */
  const acid = (k) => ({ fizz: ROCKS[k].carb, gas: ROCKS[k].carb ? 'CO₂' : null });
  /* ---- dạng chất chủ yếu ---- */
  const FORMS = [
    ['SiO₂', 'oxide', 'cát trắng, thạch anh'], ['Al₂O₃', 'oxide', 'quặng bauxite'],
    ['CaCO₃', 'carbonate', 'đá vôi, đá phấn'], ['MgCO₃', 'carbonate', 'dolomite (CaCO₃·MgCO₃)'], ['CaCO₃·MgCO₃', 'carbonate', 'dolomite, đá cẩm thạch'],
    ['muối silicate', 'silicate', 'mica, feldspar, đá hoa cương']
  ].map((r) => ({ f: r[0], cls: r[1], ex: r[2] }));
  /* ---- tài nguyên → sản phẩm (Mục III) ---- */
  const RES = [
    ['oil', 'Dầu mỏ', 'Crude oil', 'fuel'], ['coal', 'Than', 'Coal', 'fuel'], ['gas', 'Khí thiên nhiên', 'Natural gas', 'fuel'],
    ['iron', 'Quặng sắt', 'Iron ore', 'metal'], ['bauxite', 'Quặng bauxite (nhôm)', 'Bauxite (aluminium ore)', 'metal'], ['copper', 'Quặng đồng', 'Copper ore', 'metal'],
    ['sulfur', 'Lưu huỳnh', 'Sulfur', 'chem'], ['phos', 'Phosphorus', 'Phosphorus', 'chem'], ['nitro', 'Nitrogen (hợp chất)', 'Nitrogen compounds', 'chem'],
    ['lime', 'Đá vôi', 'Limestone', 'build'], ['sand', 'Cát', 'Sand', 'build']
  ].map((r) => ({ id: r[0], vi: r[1], en: r[2], to: r[3] }));
  /* ---- mô hình giáo dục “khai thác – bảo vệ” (KHÔNG phải số liệu thực tế): ba thanh trượt 0–100 ---- */
  function balance(rate, recycle, save) {
    const use = Math.max(0, Math.min(100, rate * (1 - 0.4 * save / 100)));                   // nhu cầu khai thác thật sự
    const mined = use * (1 - 0.6 * recycle / 100);                                           // phần phải khai thác mới
    const reserve = Math.round(Math.max(0, 100 - mined * 0.8 * 1)), waste = Math.round(Math.min(100, mined * 0.7 + (100 - recycle) * 0.15));
    return { reserve, waste, mined: Math.round(mined), label: reserve >= 60 && waste <= 50 ? 'bền vững hơn' : reserve < 30 ? 'cạn kiệt nhanh' : 'cần điều chỉnh' };
  }
  function selfTest() {
    const T = [], add = (n, ok, got) => T.push({ name: n, ok: !!ok, got });
    add('Bảng 33.1: tổng 8 nguyên tố = 99,09 %; còn lại 0,91 %', near(total(), 99.09, 1e-9) && near(other(), 0.91, 1e-9), total() + ' / ' + other());
    add('O + Si = 74,30 %; kim loại (Al, Fe, Ca, Na, K, Mg) = 24,79 %; O : Si ≈ 1,63', near(of('O') + of('Si'), 74.30, 1e-9) && near(metals(), 24.79, 1e-9) && near(of('O') / of('Si'), 1.6348, 1e-3), metals() + ' ' + (of('O') / of('Si')).toFixed(3));
    add('thứ tự giảm dần theo số liệu: O > Si > Al > Fe > Ca > Na > Mg > K', sorted().join('>') === 'O>Si>Al>Fe>Ca>Na>Mg>K', sorted().join('>'));
    add('chấm biểu đồ: đúng số liệu → đạt; lệch 3 điểm → báo sai; thiếu giá trị không NaN', grade(EL.reduce((o, x) => { o[x.sym] = x.pct; return o; }, {})).ok && !grade({ O: 49, Si: 28.2, Al: 8.23, Fe: 5.63, Ca: 4.15, Na: 2.36, K: 2.09, Mg: 2.33 }).ok && grade({ O: 49 }).bad.indexOf('O') === 0 && isFinite(grade({}).sum), '');
    add('biểu đồ tròn: các lát cộng đủ 360°, phần “khác” = 0,91 % khi nhập đúng; không lát âm', (() => { const v = EL.reduce((o, x) => { o[x.sym] = x.pct; return o; }, {}), p = pie(v); return near(p[p.length - 1].a1, 360, 1e-6) && near(p[p.length - 1].v, 0.91, 1e-9) && p.every((q) => q.a1 >= q.a0) && pie({}).every((q) => isFinite(q.a1)); })(), '');
    add('đá: thạch anh = oxide; dolomite, cẩm thạch, đá vôi = carbonate (muối); granite = silicate (muối); chỉ carbonate sủi bọt với HCl', classOf('quartz') === 'oxide' && ['dolomite', 'marble', 'limestone', 'granite'].every((k) => classOf(k) === 'salt') && ['dolomite', 'marble', 'limestone'].every((k) => acid(k).fizz && acid(k).gas === 'CO₂') && !acid('quartz').fizz && !acid('granite').fizz, '');
    add('mô hình khai thác–bảo vệ: khai thác nhiều + không tái chế → trữ lượng thấp, chất thải cao; tái chế + tiết kiệm → tốt hơn; giá trị trong [0,100]', (() => { const a = balance(100, 0, 0), b = balance(100, 80, 60), c = balance(30, 80, 60); return a.reserve < b.reserve && a.waste > b.waste && c.reserve >= b.reserve && [a, b, c].every((r) => r.reserve >= 0 && r.reserve <= 100 && r.waste >= 0 && r.waste <= 100); })(), '');
    add('tài nguyên: 11 thẻ, mỗi thẻ có đúng 1 nhóm sản phẩm', RES.length === 11 && RES.every((r) => ['fuel', 'metal', 'chem', 'build'].indexOf(r.to) >= 0), '');
    return T;
  }
  const engine = { EL, total, other, sorted, metals, of, grade, pie, ROCKS, classOf, acid, FORMS, RES, balance, selfTest };
  window.EarthLab = { engine, selfTest };
  { const prev = L.engine.selfTest; L.engine.selfTest = function () { return prev().concat(selfTest()); }; }
})();
