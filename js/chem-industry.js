/* ==========================================================================
   CHEM INDUSTRY — KHTN 9, Bài 20 "Tách kim loại và việc sử dụng hợp kim". Nạp SAU chem-nonmetal.js.
   1. Engine `ChemLab.industry` (dữ liệu thuần, có selfTest nối vào OpticsLab.engine.selfTest):
        METHOD / methodOf(M)  — phương pháp tách theo mức hoạt động (sách: Na, Ca, Mg, Al điện phân nóng chảy; Fe, Zn nhiệt luyện;
                                Ag, Au thuỷ luyện; Cu sách không nêu → null)
        classifyFeC(c)        — thép < 2 % C; gang 2–5 % C (c = 2 tính là gang); > 5 % ngoài khung sách
        isInox / isDuralumin  — hợp kim đặc biệt (sách không cho ngưỡng Cr, Ni → chỉ yêu cầu có mặt)
        woodMP(w)             — MÔ HÌNH nhiệt độ nóng chảy hợp kim Bi–Pb–Sn–Cd: đúng 55,5 °C ở 50/25/12,5/12,5 và đúng nhiệt độ
                                nóng chảy đơn chất ở bốn đỉnh; ở giữa là nội suy minh hoạ
        fromOre(...)          — tấn–kg: kim loại thu được từ quặng (độ tinh khiết, hiệu suất), lượng CO cần
        furnace(...)          — lò cao: mô hình tỉ lệ có chất hạn chế (không có nhiệt độ cụ thể)
        converter(...)        — lò thổi: %C, %Si, %Mn giảm theo thời gian (mô hình số mũ, minh hoạ)
        faraday(...)          — khối lượng Al theo dòng điện và thời gian (BỔ SUNG, lí tưởng)
   2. Widget (LabSims): ind-furnace (trọng tâm), ind-method, ind-cell, ind-redox, ind-converter, ind-alloy, ind-calc.
   CÁCH THÊM THIẾT BỊ / QUÁ TRÌNH CÔNG NGHIỆP MỚI (Chương VII…): thêm phương trình vào EXTRA của chem-lab.js (hệ số do balance() tính),
   thêm hàm mô hình thuần vào IND bên dưới + một dòng selfTest, rồi viết widget dùng EnergyLab.sorter (kéo thả thẻ) hoặc
   OpticsLab.makeDrag (tay kéo SVG). Mọi số liệu là mô hình minh hoạ, không phải số liệu nhà máy.
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab, C = window.ChemLab, EL = window.EnergyLab;
  if (!L || !C || !C.engine || !EL) return;
  const { fmt, pr, clamp } = L, E = C.engine;
  const $ = (s, r) => r.querySelector(s), $$ = (s, r) => Array.from(r.querySelectorAll(s));
  const REDUCED = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  let uid = 0;

  /* ----------------------------------------------------------------- ENGINE */
  const METHOD = { K: 'elec', Na: 'elec', Ca: 'elec', Mg: 'elec', Al: 'elec', Zn: 'thermal', Fe: 'thermal', Pb: 'thermal', Ag: 'hydro', Au: 'hydro' };
  const methodOf = (M) => METHOD[M] || null;
  const MP = { Bi: 271, Pb: 327, Sn: 232, Cd: 321 };
  const WOOD = { Bi: 50, Pb: 25, Sn: 12.5, Cd: 12.5 };
  const classifyFeC = (c) => (!(c >= 0) ? null : c < 2 ? 'steel' : c <= 5 ? 'iron' : 'out');
  const isInox = (a) => classifyFeC(a.c) === 'steel' && a.Cr > 0 && a.Ni > 0;
  const isDuralumin = (a) => a.Al > 50 && a.Cu > 0 && a.Mn > 0 && a.Mg > 0;
  function woodMP(w) {
    const sum = (w.Bi + w.Pb + w.Sn + w.Cd) || 1, f = {}; ['Bi', 'Pb', 'Sn', 'Cd'].forEach((k) => (f[k] = w[k] / sum * 100));
    const d = Math.abs(f.Bi - 50) + Math.abs(f.Pb - 25) + Math.abs(f.Sn - 12.5) + Math.abs(f.Cd - 12.5);
    const lin = (f.Bi * MP.Bi + f.Pb * MP.Pb + f.Sn * MP.Sn + f.Cd * MP.Cd) / 100;
    return Math.min(55.5 + 2.16 * d, lin);
  }
  function fromOre(kind, tOre, purity, yld) {                          // kind: 'Fe' | 'Al'; tấn quặng; độ tinh khiết 0–1; hiệu suất 0–1
    const ox = kind === 'Fe' ? 'Fe2O3' : 'Al2O3', Mox = E.molarMass(ox), Mm = E.molarMass(kind), nm = 2;
    const pure = tOre * purity, metal = pure * nm * Mm / Mox * yld, co = kind === 'Fe' ? pure * yld * 3 * E.molarMass('CO') / Mox : 0;
    return { pure, metal, co, ratio: nm * Mm / Mox };
  }
  function furnace(o) {                                                // o: {ore (t/h), coke (t/h), air (0–100 %), limestone: bool}
    const need = 3 * E.molarMass('C') / E.molarMass('Fe2O3'), burnMax = 0.4 * o.air / 100 * o.ore;   // C đốt được/giờ tỉ lệ với gió
    const burnt = Math.min(o.coke, burnMax), reduc = Math.min(o.ore, burnt / need), fe = reduc * 2 * E.molarMass('Fe') / E.molarMass('Fe2O3');
    const co2 = reduc * 3 * E.molarMass('CO2') / E.molarMass('Fe2O3'), exCo = Math.max(0, burnt - reduc * need) * E.molarMass('CO') / E.molarMass('C');
    return { fe, co2, exCo, reduc, burnt, need, slag: o.limestone ? reduc * 0.15 : 0, limiting: o.coke < burnMax ? 'coke' : 'air' };
  }
  function converter(t, flow, init) {                                  // t: đơn vị thời gian; flow: lưu lượng O₂ tương đối (0–2)
    const i = init || { C: 4.0, Si: 1.0, Mn: 0.8 }, te = Math.max(0, t) * clamp(flow, 0, 2);
    return { C: i.C * Math.exp(-te / 8), Si: i.Si * Math.exp(-te / 3), Mn: i.Mn * Math.exp(-te / 5) };
  }
  const faraday = (kA, hours, n) => E.molarMass('Al') * kA * 1000 * hours * 3600 / ((n || 3) * 96485) / 1000;   // kg
  const IND = {
    METHOD, methodOf, classifyFeC, isInox, isDuralumin, woodMP, fromOre, furnace, converter, faraday, MP, WOOD,
    selfTest() {
      const T = [], add = (n, ok, got) => T.push({ name: 'Công nghiệp: ' + n, ok: !!ok, got }), near = (a, b, e) => Math.abs(a - b) <= e;
      add('phương pháp tách theo sách', ['Na', 'Ca', 'Mg', 'Al'].every((m) => methodOf(m) === 'elec') && ['Fe', 'Zn'].every((m) => methodOf(m) === 'thermal') && ['Ag', 'Au'].every((m) => methodOf(m) === 'hydro') && methodOf('Cu') === null);
      add('ngưỡng 2 % và 5 % carbon', classifyFeC(1.99) === 'steel' && classifyFeC(2) === 'iron' && classifyFeC(5) === 'iron' && classifyFeC(5.01) === 'out' && classifyFeC(0.6) === 'steel', [classifyFeC(1.99), classifyFeC(2), classifyFeC(5)]);
      add('thép 0,6 % C + Cr + Ni = inox', isInox({ c: 0.6, Cr: 18, Ni: 8 }) && !isInox({ c: 0.6, Cr: 18, Ni: 0 }) && !isInox({ c: 3, Cr: 18, Ni: 8 }));
      add('đuy-ra: Al + Cu, Mn, Mg', isDuralumin({ Al: 94, Cu: 4, Mn: 1, Mg: 1 }) && !isDuralumin({ Al: 96, Cu: 4, Mn: 0, Mg: 0 }));
      add('hợp kim Wood 50/25/12,5/12,5 → 55,5 °C', near(woodMP(WOOD), 55.5, 1e-9), woodMP(WOOD));
      add('bốn đỉnh = nhiệt độ nóng chảy đơn chất', [['Bi', 271], ['Pb', 327], ['Sn', 232], ['Cd', 321]].every(([k, v]) => { const w = { Bi: 0, Pb: 0, Sn: 0, Cd: 0 }; w[k] = 100; return near(woodMP(w), v, 1e-9); }));
      let bad = 0; for (let a = 0; a <= 100; a += 10) for (let b = 0; a + b <= 100; b += 10) for (let c = 0; a + b + c <= 100; c += 10) { const v = woodMP({ Bi: a, Pb: b, Sn: c, Cd: 100 - a - b - c }); if (!isFinite(v) || v < 55.5 - 1e-9 || v > 327 + 1e-9) bad++; }
      add('hợp kim Wood: không NaN, nằm trong 55,5–327 °C', bad === 0, bad);
      const fe = fromOre('Fe', 1, 1, 1), al = fromOre('Al', 1, 1, 1);
      add('1,0 tấn Fe₂O₃ tinh khiết → 0,70 tấn Fe', near(fe.metal, 0.6994, 0.001), fe.metal);
      add('1,0 tấn Al₂O₃ tinh khiết → 0,53 tấn Al', near(al.metal, 0.5292, 0.001), al.metal);
      add('CO cần cho 1,0 tấn Fe₂O₃ ≈ 0,526 tấn', near(fe.co, 0.5262, 0.002), fe.co);
      add('độ tinh khiết và hiệu suất', near(fromOre('Fe', 2, 0.8, 0.9).metal, 2 * 0.8 * 0.9 * 0.6994, 0.002));
      const f1 = furnace({ ore: 100, coke: 30, air: 100, limestone: true }), f0 = furnace({ ore: 100, coke: 30, air: 0, limestone: true });
      add('lò cao: không gió → không có gang; có gió có gang', f0.fe === 0 && f1.fe > 0 && isFinite(f1.fe) && f1.fe <= 69.95 + 1e-6, [f0.fe, f1.fe]);
      add('lò cao: không có hạn chế khí âm', f1.exCo >= 0 && f1.slag >= 0);
      const c0 = converter(0, 1), c9 = converter(30, 1);
      add('lò thổi: %C giảm đơn điệu, xuống dưới 2 %', c0.C === 4 && c9.C < 2 && converter(10, 1).C < converter(5, 1).C);
      add('Al theo định luật Faraday: 100 kA × 1 h ≈ 33,6 kg', near(faraday(100, 1, 3), 33.56, 0.1), faraday(100, 1, 3));
      ['al-electrolysis', 'fe-co', 'zns-o2', 'zno-c', 'c-o2', 'c-co2', 'co-fe2o3', 'caco3', 'slag'].forEach((id) => { const x = E.extra(id); add('phương trình ' + id + ' cân bằng', x && (() => { const c = E.check({ re: x.re, pr: x.pr }); return c.atoms && c.mass; })(), x && E.eqStr(x)); });
      return T;
    }
  };
  C.industry = IND;
  const prevSelf = L.engine.selfTest; L.engine.selfTest = function () { return prevSelf().concat(IND.selfTest()); };

  /* ----------------------------------------------------------------- tiện ích giao diện */
  const SAFE = ['Không tự thực hiện ở nhà: lò cao, bể điện phân, nhiệt luyện cần nhiệt độ rất cao, dòng điện lớn, khí độc; chỉ làm với giáo viên và đồ bảo hộ trong cơ sở công nghiệp hoặc phòng thí nghiệm.', 'Do not try this at home: blast furnaces, electrolysis cells and smelting need extreme heat, large currents and toxic gases; only with a teacher and protective gear in an industrial or laboratory setting.'];
  const MODEL = ['Số liệu là mô hình minh hoạ để thấy xu hướng, không phải số liệu nhà máy.', 'The figures are an illustrative model that shows trends, not factory data.'];
  const wrap = (body, n) => { body.innerHTML = Array.from({ length: n }, (_, i) => '<div data-s' + i + '></div>').join(''); return Array.from({ length: n }, (_, i) => $('[data-s' + i + ']', body)); };
  const note = (t) => '<p class="olab__hint"><small>' + pr(t[0], t[1]) + '</small></p>';
  const eqLine = (id) => { const x = E.extra(id); return x ? E.eqStr(x) : ''; };
  const ctl = (k, vi, en, min, max, step, val, unit) => '<label class="olab__ctl"><span>' + pr(vi, en) + ' <output data-o="' + k + '">' + fmt(val, step < 1 ? 1 : 0) + '</output>' + (unit || '') + '</span><input type="range" data-p="' + k + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '" aria-label="' + vi + ' / ' + en + '"></label><label class="olab__ctl"><span>' + pr('Hoặc nhập số', 'Or type') + '</span><input type="number" data-n="' + k + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '" style="width:6em" aria-label="' + vi + ' (số / number)"></label>';
  function bindCtl(root, P, onChange) {                                // thanh trượt ↔ ô số đồng bộ hai chiều
    root.addEventListener('input', (e) => {
      const k = e.target.dataset && (e.target.dataset.p || e.target.dataset.n); if (!k || e.target.value === '') return;
      const sl = $('[data-p="' + k + '"]', root), nu = $('[data-n="' + k + '"]', root), v = clamp(+e.target.value, +sl.min, +sl.max);
      P[k] = v; if (e.target === sl) nu.value = v; else sl.value = v; $('[data-o="' + k + '"]', root).textContent = fmt(v, +sl.step < 1 ? 1 : 0); onChange(k);
    });
  }
  const loop = (root, step) => { let vis = true, on = false, last = 0; const tick = (ts) => { if (!root.isConnected) { on = false; return; } const dt = Math.min(0.05, (ts - last) / 1000); last = ts; if (step(dt) !== false && vis) requestAnimationFrame(tick); else on = false; }; const kick = () => { if (on || !vis || REDUCED) return; on = true; last = performance.now(); requestAnimationFrame(tick); }; if ('IntersectionObserver' in window) new IntersectionObserver((es) => { vis = es[0].isIntersecting; if (vis) kick(); }).observe(root); return { kick }; };

  /* =========================================================== W20.4 — LÒ CAO (trọng tâm) */
  function indFurnace(body) {
    const [a, b, c] = wrap(body, 3), id = 'bf' + (++uid), P = { coke: 30, air: 70 }, S = { t: 0, paused: false, fed: {} };
    a.innerHTML = '<div class="olab em chem" data-lab="' + id + '"><p class="olab__hint">' + pr('Kéo quặng sắt, than cốc, đá vôi vào miệng lò (Hình 20.2). Rồi chỉnh lượng than cốc và gió nóng; xem gang, xỉ và khí thải.', 'Drag iron ore, coke and limestone into the furnace mouth (Figure 20.2). Then set the coke and hot air; watch pig iron, slag and waste gas.') + '</p><div class="olab__cols"><div class="olab__stage"><div data-zone="mouth" tabindex="0" role="button" aria-label="Miệng lò cao: kéo hoặc bấm để thả vào / Furnace mouth: drop here"><svg class="olab__svg em__svg" viewBox="0 0 360 330" data-svg></svg></div><div class="pw__zone" data-pool><span class="pw__chip" role="button" tabindex="0" data-chip data-kind="f" data-val="ore">' + pr('Quặng hematite Fe₂O₃', 'Hematite ore Fe₂O₃') + '</span><span class="pw__chip" role="button" tabindex="0" data-chip data-kind="f" data-val="coke">' + pr('Than cốc C', 'Coke C') + '</span><span class="pw__chip" role="button" tabindex="0" data-chip data-kind="f" data-val="lime">' + pr('Đá vôi CaCO₃', 'Limestone CaCO₃') + '</span></div></div><div class="olab__panel"><div data-r="out"></div></div></div><div class="olab__btns"><button type="button" class="btn btn--sm" data-act="pause" aria-pressed="false">' + pr('Tạm dừng', 'Pause') + '</button><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button></div><p class="olab__status" data-r="status" role="status"></p></div>';
    const lab = $('[data-lab="' + id + '"]', a), svg = $('[data-svg]', lab), q = (n) => $('[data-r="' + n + '"]', lab);
    b.innerHTML = ctl('coke', 'Than cốc (tấn/giờ)', 'Coke (t/h)', 0, 60, 1, P.coke, ' t/h') + ctl('air', 'Gió nóng (%)', 'Hot air (%)', 0, 100, 1, P.air, ' %') + note(MODEL) + '<p class="olab__hint"><small>⚠ ' + pr(SAFE[0], SAFE[1]) + '</small></p>';
    const ready = () => S.fed.ore && S.fed.coke && S.fed.lime;
    const out = () => IND.furnace({ ore: 100, coke: P.coke, air: ready() ? P.air : 0, limestone: !!S.fed.lime });
    const STG = [['C + O₂ → CO₂', 0.0], ['C + CO₂ → 2CO', 0.25], ['3CO + Fe₂O₃ → 2Fe + 3CO₂', 0.5], ['CaCO₃ → CaO + CO₂;  CaO + SiO₂ → CaSiO₃', 0.75]];
    function draw() {
      const o = out(), lit = [ready() && o.burnt > 0, ready() && o.burnt > 0, o.reduc > 0, ready() && S.fed.lime];
      let s = '<rect width="360" height="330" fill="#f6f8fc"/><path d="M110 40 H250 L270 140 L255 250 H105 L90 140 Z" fill="#e8d9c8" stroke="#333" stroke-width="3"/>';
      STG.forEach((g, i) => { const y = 255 - i * 52; s += '<rect x="112" y="' + (y - 46) + '" width="136" height="44" fill="' + (lit[i] ? '#ffb347' : '#e8d9c8') + '" opacity="' + (lit[i] ? 0.5 + 0.2 * Math.sin(S.t * 4 + i) : 0.35) + '"/>'; });
      if (ready()) for (let k = 0; k < 14; k++) { const ph = ((S.t * 0.12 + k * 0.071) % 1); s += '<circle cx="' + (120 + (k * 37) % 120) + '" cy="' + (50 + ph * 190).toFixed(1) + '" r="3" fill="' + ['#8a5a3a', '#222', '#f2f2f2'][k % 3] + '"/>'; }
      if (ready() && o.burnt > 0) for (let k = 0; k < 8; k++) { const ph = ((S.t * 0.2 + k * 0.13) % 1); s += '<circle cx="' + (130 + (k * 41) % 100) + '" cy="' + (245 - ph * 190).toFixed(1) + '" r="2.4" fill="none" stroke="#7a90b0" opacity="' + (1 - ph).toFixed(2) + '"/>'; }
      s += '<path d="M250 70 H300 V30" fill="none" stroke="#7a7a7a" stroke-width="4"/><text x="302" y="24" font-size="11">khí thải / waste gas</text><path d="M60 215 H105" stroke="#e0603a" stroke-width="5"/><text x="8" y="210" font-size="11">gió nóng / hot air</text><text x="150" y="30" font-size="11">miệng lò / mouth</text><text x="255" y="280" font-size="11" fill="#1b2433">xỉ / slag</text><text x="255" y="296" font-size="11" fill="#1b2433">gang / pig iron</text><rect x="105" y="250" width="150" height="12" fill="#d9573e"/><rect x="105" y="262" width="150" height="8" fill="#ffb347"/>';
      s += ['ore', 'coke', 'lime'].map((k, i) => '<circle cx="' + (30 + i * 26) + '" cy="40" r="9" fill="' + (S.fed[k] ? ['#8a5a3a', '#222', '#f2f2f2'][i] : 'none') + '" stroke="#555" stroke-dasharray="' + (S.fed[k] ? 0 : 3) + '"/>').join('') + '<text x="12" y="62" font-size="10">quặng · than · đá vôi</text>';
      { const hf = document.activeElement && svg.contains(document.activeElement) && document.activeElement.dataset.h; svg.innerHTML = s; if (hf) { const g = svg.querySelector('[data-h="' + hf + '"]'); if (g) g.focus({ preventScroll: true }); } }
      q('out').innerHTML = ready() ? '<table class="olab__tbl olab__tbl--read"><tbody><tr><th scope="row">' + pr('Gang (Fe)', 'Pig iron (Fe)') + '</th><td>' + fmt(o.fe, 1) + ' t/h</td></tr><tr><th scope="row">' + pr('Xỉ (mô hình)', 'Slag (model)') + '</th><td>' + fmt(o.slag, 1) + ' t/h</td></tr><tr><th scope="row">CO₂</th><td>' + fmt(o.co2, 1) + ' t/h</td></tr><tr><th scope="row">CO</th><td>' + fmt(o.exCo, 1) + ' t/h</td></tr><tr><th scope="row">SO₂</th><td>' + pr('có nếu quặng, than cốc chứa lưu huỳnh', 'present if ore or coke contains sulfur') + '</td></tr><tr><th scope="row">' + pr('Chất hạn chế', 'Limiting factor') + '</th><td>' + (o.limiting === 'coke' ? pr('than cốc', 'coke') : pr('gió nóng', 'hot air')) + '</td></tr></tbody></table><p><small>' + pr('Khí thải chứa CO₂, CO và có thể SO₂: nếu thải thẳng ra môi trường gây hiệu ứng nhà kính và mưa acid, hại sức khoẻ (liên hệ Bài 16: sử dụng năng lượng và môi trường).', 'Waste gas holds CO₂, CO and possibly SO₂: released untreated it adds to the greenhouse effect and acid rain and harms health (link to Lesson 16: energy use and the environment).') + '</small></p>' + '<ul class="chem__eq">' + ['c-o2', 'c-co2', 'co-fe2o3', 'caco3', 'slag'].map((k) => '<li>' + eqLine(k) + '</li>').join('') + '</ul>' : '<p class="muted">' + pr('Cho đủ ba nguyên liệu vào miệng lò để lò chạy.', 'Feed all three raw materials into the mouth to run the furnace.') + '</p>';
    }
    C.dnd(lab, { drop(kind, val, zone) { if (zone !== 'mouth') return; S.fed[val] = true; q('status').textContent = ready() ? '' : ''; draw(); lp.kick(); } });
    const lp = loop(lab, (dt) => { if (!S.paused && ready()) { S.t += dt; draw(); } return !S.paused && ready(); });
    lab.addEventListener('click', (e) => { const x = e.target.closest('[data-act]'); if (!x) return; if (x.dataset.act === 'pause') { S.paused = !S.paused; x.setAttribute('aria-pressed', S.paused); if (!S.paused) lp.kick(); } else { S.fed = {}; S.t = 0; draw(); } });
    bindCtl(b, P, () => { draw(); lp.kick(); });
    // sắp xếp các giai đoạn theo thứ tự sách
    EL.sorter(c, { hint: ['Sắp các giai đoạn sản xuất gang theo thứ tự trong sách (tạo CO → khử oxide sắt → tạo xỉ).', 'Put the stages of making pig iron in the book’s order (make CO → reduce the iron oxide → form slag).'],
      boxes: [{ id: 'g1', vi: 'Giai đoạn 1', en: 'Stage 1', cap: 1 }, { id: 'g2', vi: 'Giai đoạn 2', en: 'Stage 2', cap: 1 }, { id: 'g3', vi: 'Giai đoạn 3', en: 'Stage 3', cap: 1 }, { id: 'g4', vi: 'Giai đoạn 4', en: 'Stage 4', cap: 1 }], ordered: 1,
      items: [{ id: 's1', vi: 'C + O₂ → CO₂ (đốt than cốc)', en: 'C + O₂ → CO₂ (burning coke)', to: ['g1'] }, { id: 's2', vi: 'C + CO₂ → 2CO', en: 'C + CO₂ → 2CO', to: ['g2'] }, { id: 's3', vi: '3CO + Fe₂O₃ → 2Fe + 3CO₂', en: '3CO + Fe₂O₃ → 2Fe + 3CO₂', to: ['g3'] }, { id: 's4', vi: 'CaCO₃ → CaO + CO₂; CaO + SiO₂ → CaSiO₃ (xỉ)', en: 'CaCO₃ → CaO + CO₂; CaO + SiO₂ → CaSiO₃ (slag)', to: ['g4'] }],
      note: ['Vị trí các vùng trong hình chỉ minh hoạ; sách không nêu nhiệt độ từng vùng.', 'Zone positions in the figure are illustrative; the book gives no temperature for each zone.'], explain: ['Sách: tạo CO, CO khử oxide sắt thành sắt (hoà tan ít carbon thành gang), đá vôi phân huỷ rồi tạo xỉ nhẹ nổi lên.', 'The book: make CO, CO reduces the iron oxide to iron (dissolving a little carbon to give pig iron), limestone decomposes and forms light slag that floats.'] });
    draw(); return { state: S };
  }

  /* =========================================================== W20.1 — chọn phương pháp tách */
  function indMethod(body) {
    const M = (id, vi, en, to) => ({ id, vi, en, to: [to] });
    return EL.sorter(body, { hint: ['Kéo kim loại hoặc quặng vào phương pháp tách phù hợp theo mức độ hoạt động hoá học.', 'Drag each metal or ore to the extraction method that fits its reactivity.'],
      boxes: [{ id: 'elec', vi: 'Điện phân nóng chảy', en: 'Molten electrolysis' }, { id: 'thermal', vi: 'Nhiệt luyện', en: 'Thermal reduction' }, { id: 'hydro', vi: 'Thuỷ luyện', en: 'Hydrometallurgy' }],
      items: [M('Na', 'Natri Na', 'Sodium Na', 'elec'), M('Ca', 'Canxi Ca', 'Calcium Ca', 'elec'), M('Mg', 'Magnesium Mg', 'Magnesium Mg', 'elec'), M('bx', 'Quặng bauxite (Al₂O₃)', 'Bauxite ore (Al₂O₃)', 'elec'), M('Fe', 'Sắt Fe', 'Iron Fe', 'thermal'), M('hem', 'Quặng hematite (Fe₂O₃)', 'Hematite ore (Fe₂O₃)', 'thermal'), M('sph', 'Quặng sphalerite (ZnS)', 'Sphalerite ore (ZnS)', 'thermal'), M('Ag', 'Bạc Ag', 'Silver Ag', 'hydro'), M('Au', 'Vàng Au', 'Gold Au', 'hydro')],
      note: ['Đồng (Cu): sách không nêu phương pháp nên không có trong bài này. Làm giàu quặng (loại đất, cát, đá) là bước trước khi tách.', 'Copper (Cu): the book names no method, so it is not in this activity. Ore enrichment (removing soil, sand, rock) comes before extraction.'],
      explain: ['Kim loại càng hoạt động mạnh càng khó khử khỏi hợp chất nên cần điện phân; kim loại yếu dễ bị kim loại mạnh hơn đẩy ra khỏi muối.', 'The more reactive a metal, the harder it is to release from its compounds, so electrolysis is needed; weak metals are easily displaced by a stronger metal.'] });
  }

  /* =========================================================== W20.2 — bể điện phân Al₂O₃ (Hình 20.1) */
  function indCell(body) {
    const [a, b] = wrap(body, 2), P = { kA: 100, h: 1 }, S2 = { cryo: true, t: 0 };
    const items = [{ id: 'anode', vi: 'Cực dương bằng than chì', en: 'Graphite anode (+)', to: ['anode'] }, { id: 'cathode', vi: 'Cực âm bằng than chì', en: 'Graphite cathode (−)', to: ['cathode'] }, { id: 'bath', vi: 'Hỗn hợp Al₂O₃ và cryolite nóng chảy', en: 'Molten Al₂O₃ and cryolite mixture', to: ['bath'] }, { id: 'metal', vi: 'Nhôm lỏng', en: 'Molten aluminium', to: ['metal'] }];
    let r; const svgOf = (S) => {
      const h = (k) => S.box[k].length > 0;
      let s = '<svg class="olab__svg em__svg" viewBox="0 0 360 240" role="img" aria-label="Sơ đồ bể điện phân Al₂O₃ nóng chảy / Molten Al₂O₃ electrolysis cell"><rect width="360" height="240" fill="#f6f8fc"/><path d="M60 80 V200 H300 V80" fill="none" stroke="#333" stroke-width="4"/>';
      if (h('bath')) s += '<rect x="64" y="96" width="232" height="100" fill="#f4b46a" opacity=".75"/>';
      if (h('metal')) s += '<rect x="64" y="176" width="232" height="20" fill="#cfd5de"/>';
      if (h('anode')) s += '<rect x="110" y="30" width="26" height="110" fill="#333"/><rect x="224" y="30" width="26" height="110" fill="#333"/><text x="180" y="22" text-anchor="middle" font-size="12">+ cực dương / anode</text>';
      if (h('cathode')) s += '<rect x="64" y="196" width="232" height="8" fill="#222"/><text x="180" y="224" text-anchor="middle" font-size="12">− cực âm / cathode</text>';
      if (h('bath') && h('anode') && h('cathode')) for (let k = 0; k < 8; k++) { const ph = (S2.t * 0.25 + k * 0.125) % 1, up = k % 2 === 0; s += '<circle cx="' + (150 + k * 12) + '" cy="' + (up ? 190 - ph * 80 : 100 + ph * 80).toFixed(1) + '" r="4" fill="' + (up ? '#7a90b0' : '#d9573e') + '"/>'; }
      s += '<text x="300" y="120" font-size="10">' + (h('bath') ? 'O²⁻ ↑ anode · Al³⁺ ↓ cathode' : '') + '</text>';
      return s + '</svg>';
    };
    const lp = { kick: () => {} };
    r = EL.sorter(a, { hint: ['Lắp bể điện phân Hình 20.1: kéo (hoặc bấm) bốn bộ phận vào đúng vị trí. Bấm Kiểm tra.', 'Assemble the cell of Figure 20.1: drag (or click) the four parts into place. Press Check.'], boxes: [{ id: 'anode', vi: 'Cực dương', en: 'Anode', cap: 1 }, { id: 'cathode', vi: 'Cực âm', en: 'Cathode', cap: 1 }, { id: 'bath', vi: 'Chất điện phân', en: 'Electrolyte', cap: 1 }, { id: 'metal', vi: 'Sản phẩm dưới đáy', en: 'Product at the bottom', cap: 1 }], items, extra: (S) => svgOf(S), note: ['Chuyển động ion chỉ minh hoạ hướng; không phải mô phỏng chi tiết.', 'Ion motion only shows direction; it is not a detailed simulation.'], explain: ['Phản ứng: ' + eqLine('al-electrolysis') + '.', 'Reaction: ' + eqLine('al-electrolysis') + '.'] });
    b.innerHTML = '<div class="olab em chem"><label class="olab__ctl"><span><input type="checkbox" data-cryo checked> ' + pr('Có cryolite', 'With cryolite') + '</span></label><div data-q></div>' + ctl('kA', 'Cường độ dòng (kA)', 'Current (kA)', 10, 200, 5, P.kA, ' kA') + ctl('h', 'Thời gian (giờ)', 'Time (hours)', 1, 24, 1, P.h, ' h') + '<div data-res></div><div class="olab__btns"><button type="button" class="btn btn--sm" data-pause aria-pressed="false">' + pr('Tạm dừng', 'Pause') + '</button></div>' + note(['Khối lượng nhôm tính theo định luật Faraday với hiệu suất 100 % (bổ sung, không in trong sách): m = M·I·t/(n·F), n = 3.', 'The aluminium mass uses Faraday’s law at 100 % efficiency (an extra, not printed in the book): m = M·I·t/(n·F), n = 3.']) + '<p class="olab__hint"><small>⚠ ' + pr(SAFE[0], SAFE[1]) + '</small></p></div>';
    const upd = () => { $('[data-res]', b).innerHTML = '<p><b>' + pr('Nhôm thu được ≈ ', 'Aluminium produced ≈ ') + fmt(IND.faraday(P.kA, P.h, 3), 1) + ' kg</b></p>'; $('[data-q]', b).innerHTML = '<p>' + (S2.cryo ? pr('Có cryolite: hỗn hợp nóng chảy ở nhiệt độ thấp hơn so với Al₂O₃ nguyên chất nên tiết kiệm năng lượng.', 'With cryolite: the mixture melts at a lower temperature than pure Al₂O₃, saving energy.') : pr('Không cryolite: phải duy trì nhiệt độ rất cao để Al₂O₃ nóng chảy, tốn nhiều năng lượng hơn.', 'Without cryolite: a much higher temperature is needed to melt Al₂O₃, costing more energy.')) + '</p><div class="olab__bar" aria-hidden="true"><i style="display:block;height:8px;border-radius:4px;background:#d9573e;width:' + (S2.cryo ? 45 : 100) + '%"></i></div><small>' + pr('năng lượng cần để nấu chảy (tương đối, minh hoạ)', 'energy needed to melt (relative, illustrative)') + '</small>'; };
    bindCtl(b, P, upd);
    b.addEventListener('change', (e) => { if (e.target.matches('[data-cryo]')) { S2.cryo = e.target.checked; upd(); } });
    const tk = loop(a, (dt) => { if (!S2.p) { S2.t += dt; r.render(); } return !S2.p; });
    b.addEventListener('click', (e) => { const x = e.target.closest('[data-pause]'); if (!x) return; S2.p = !S2.p; x.setAttribute('aria-pressed', S2.p); if (!S2.p) tk.kick(); });
    a.addEventListener('pointerup', () => setTimeout(tk.kick, 80)); a.addEventListener('click', () => setTimeout(tk.kick, 80)); tk.kick(); void lp;
    upd(); return { state: S2 };
  }

  /* =========================================================== W20.3 — Fe, Zn, và thử Na bằng nhiệt luyện */
  const PAIR = { 'CO|Fe2O3': 'fe-co', 'O2|ZnS': 'zns-o2', 'C|ZnO': 'zno-c' };
  const CH = { Fe2O3: 'Fe₂O₃', CO: 'CO', C: 'C (than)', ZnS: 'ZnS', ZnO: 'ZnO', O2: 'O₂', Na2O: 'Na₂O' };
  function indRedox(body) {
    const id = 'rd' + (++uid), S = { in: [] };
    body.innerHTML = '<div class="olab em chem" data-lab="' + id + '"><p class="olab__hint">' + pr('Kéo hai chất vào lò nung (nhiệt độ cao) để thấy quá trình tách sắt hoặc kẽm. Thử Na₂O + C để trả lời câu hỏi của sách.', 'Drag two substances into the furnace (high temperature) to see iron or zinc extracted. Try Na₂O + C to answer the book’s question.') + '</p><div class="olab__cols"><div class="olab__stage"><div data-zone="kiln" tabindex="0" role="button" aria-label="Lò nung: kéo hoặc bấm để thả vào / Furnace: drop here"><svg class="olab__svg em__svg" viewBox="0 0 360 180" data-svg></svg></div><div class="pw__zone" data-pool>' + Object.keys(CH).map((k) => '<span class="pw__chip" role="button" tabindex="0" data-chip data-kind="s" data-val="' + k + '">' + CH[k] + '</span>').join('') + '</div></div><div class="olab__panel"><div data-r="res"></div></div></div><div class="olab__btns"><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button></div><p class="olab__status" data-r="status" role="status"></p><p class="olab__hint"><small>⚠ ' + pr(SAFE[0], SAFE[1]) + '</small></p></div>';
    const lab = $('[data-lab="' + id + '"]', body), svg = $('[data-svg]', lab), q = (n) => $('[data-r="' + n + '"]', lab);
    function show() {
      let s = '<rect width="360" height="180" fill="#f6f8fc"/><path d="M80 150 V60 Q80 30 180 30 Q280 30 280 60 V150 Z" fill="#d9a77a" stroke="#333" stroke-width="3"/><rect x="110" y="110" width="140" height="40" fill="#ff8a3a" opacity="' + (S.in.length === 2 ? 0.8 : 0.35) + '"/>';
      S.in.forEach((k, i) => { s += '<text x="' + (130 + i * 90) + '" y="95" text-anchor="middle" font-size="16" font-weight="700">' + CH[k] + '</text>'; });
      svg.innerHTML = s + '<text x="180" y="172" text-anchor="middle" font-size="11">lò nung / furnace (t° cao / high)</text>';
      if (S.in.length < 2) { q('res').innerHTML = '<p class="muted">' + pr('Chọn hai chất.', 'Choose two substances.') + '</p>'; return; }
      const key = S.in.slice().sort().join('|'), ex = PAIR[key];
      if (ex) { const x = E.extra(ex), sp = x.re.concat(x.pr); q('res').innerHTML = '<div class="chem__eq">' + sp.map((t, i) => (i === x.re.length ? ' <span class="chem__arr"><small>t°</small>→</span> ' : (i ? ' + ' : '')) + '<input type="number" min="1" max="9" class="chem__n" data-co="' + i + '" aria-label="Hệ số của ' + E.uni(t.f) + ' / coefficient of ' + E.uni(t.f) + '"> ' + E.uni(t.f)).join('') + '</div><div class="olab__btns"><button type="button" class="btn btn--sm" data-chk="' + ex + '">' + pr('Kiểm tra', 'Check') + '</button></div>' + (ex === 'zns-o2' ? '<p><small>' + pr('Bước 1 tách kẽm: đốt quặng ZnS trong không khí thành ZnO (rồi dùng C khử ZnO).', 'Zinc step 1: roast ZnS in air to give ZnO (then reduce ZnO with C).') + '</small></p>' : ''); q('status').textContent = ''; }
      else if (key === 'C|Na2O') q('res').innerHTML = '<p class="chem__none"><b>⚠ ' + pr('Không dùng nhiệt luyện cho natri.', 'Thermal reduction is not used for sodium.') + '</b> ' + pr('Natri hoạt động hoá học rất mạnh, các chất khử như C, CO, H₂ không khử được oxide của nó thành kim loại; phải điện phân nóng chảy.', 'Sodium is extremely reactive; reducing agents like C, CO, H₂ cannot reduce its compound to the metal; molten electrolysis is needed.') + '</p>';
      else q('res').innerHTML = '<p class="muted">' + pr('Cặp này không phải quá trình tách kim loại trong bài. Thử: Fe₂O₃ + CO, ZnS + O₂, ZnO + C.', 'This pair is not an extraction step in the lesson. Try: Fe₂O₃ + CO, ZnS + O₂, ZnO + C.') + '</p>';
    }
    C.dnd(lab, { drop(kind, val, zone) { if (zone !== 'kiln') return; if (S.in.length >= 2) S.in = []; if (S.in.indexOf(val) < 0) S.in.push(val); show(); } });
    lab.addEventListener('click', (e) => {
      if (e.target.closest('[data-act="reset"]')) { S.in = []; q('status').textContent = ''; show(); return; }
      const k = e.target.closest('[data-chk]'); if (!k) return; const x = E.extra(k.dataset.chk), v = $$('[data-co]', lab).map((i) => +i.value || 0), want = x.re.concat(x.pr).map((t) => t.n);
      const ok = v.every((n) => n > 0) && JSON.stringify(v) === JSON.stringify(want);
      q('status').className = 'olab__status ' + (ok ? 'olab__status--ok' : 'olab__status--warn'); q('status').innerHTML = ok ? '✓ ' + E.eqStr(x) : '✗ ' + pr('Chưa cân bằng: đếm nguyên tử mỗi nguyên tố ở hai vế (hệ số nguyên tối giản).', 'Not balanced: count the atoms of each element on both sides (lowest whole numbers).');
    });
    const cmp = document.createElement('div'); cmp.innerHTML = '<table class="olab__tbl"><thead><tr><th></th><th>' + pr('Tách sắt', 'Extracting iron') + '</th><th>' + pr('Tách kẽm', 'Extracting zinc') + '</th></tr></thead><tbody><tr><th scope="row">' + pr('Giống', 'Similar') + '</th><td colspan="2">' + pr('Đều nhiệt luyện: chất khử (CO hoặc C) lấy oxygen của oxide kim loại ở nhiệt độ cao.', 'Both are thermal reduction: a reducing agent (CO or C) takes oxygen from the metal oxide at high temperature.') + '</td></tr><tr><th scope="row">' + pr('Khác', 'Different') + '</th><td>' + pr('Quặng là oxide Fe₂O₃, khử trực tiếp bằng CO.', 'The ore is the oxide Fe₂O₃, reduced directly by CO.') + '</td><td>' + pr('Quặng là sulfide ZnS: đốt với O₂ thành ZnO trước, rồi khử bằng C.', 'The ore is the sulfide ZnS: roasted with O₂ to ZnO first, then reduced by C.') + '</td></tr></tbody></table>'; body.appendChild(cmp);
    show(); return { state: S };
  }

  /* =========================================================== W20.5 — lò thổi luyện thép (Hình 20.3) */
  function indConverter(body) {
    const id = 'cv' + (++uid), P = { t: 0, flow: 1, th: 2 };
    body.innerHTML = '<div class="olab em chem" data-lab="' + id + '"><p class="olab__hint">' + pr('Mở van O₂ (lưu lượng) và kéo thanh “thời gian thổi”: carbon, silicon, mangan trong gang bị đốt thành oxide. Kéo vạch ngưỡng carbon để xem gang hay thép.', 'Open the O₂ valve (flow) and drag the “blowing time” slider: carbon, silicon and manganese in the pig iron burn to oxides. Drag the carbon threshold line to see pig iron or steel.') + '</p><svg class="olab__svg em__svg" viewBox="0 0 360 290" role="group" aria-label="Lò thổi luyện thép và đồ thị %C / Steel converter and %C graph" data-svg></svg>' + ctl('t', 'Thời gian thổi O₂ (đơn vị tương đối)', 'O₂ blowing time (relative units)', 0, 40, 1, P.t, '') + ctl('flow', 'Van O₂ (lưu lượng tương đối)', 'O₂ valve (relative flow)', 0, 2, 0.1, P.flow, '') + '<div class="olab__btns"><label><input type="checkbox" data-snap checked> ' + pr('Hít vạch ngưỡng về 2 %', 'Snap the threshold to 2 %') + '</label><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button></div><div data-r="res" aria-live="polite"></div>' + note(['Sách quy ước: gang 2–5 % C, thép dưới 2 % C. Đường giảm %C là mô hình số mũ minh hoạ; số trong gang ban đầu (C 4,0 %; Si 1,0 %; Mn 0,8 %) là ví dụ tự chọn.', 'The book’s convention: pig iron 2–5 % C, steel below 2 % C. The falling %C is an illustrative exponential model; the starting figures (C 4.0 %; Si 1.0 %; Mn 0.8 %) are our own example.']) + '<p class="olab__hint"><small>⚠ ' + pr(SAFE[0], SAFE[1]) + '</small></p><p class="olab__status" data-r="status" role="status"></p></div>';
    const lab = $('[data-lab="' + id + '"]', body), svg = $('[data-svg]', lab), q = (n) => $('[data-r="' + n + '"]', lab);
    let snap = true;
    const gx = (t) => 190 + (t / 40) * 150, gy = (c) => 270 - (c / 5) * 130;
    function draw() {
      const cur = IND.converter(P.t, P.flow), cls = IND.classifyFeC(cur.C), thC = cls === null ? null : (cur.C < P.th ? 'steel' : 'iron');
      let s = '<rect width="360" height="290" fill="#f6f8fc"/><path d="M40 90 L100 90 L150 130 V240 Q150 270 100 270 H70 Q20 270 20 240 V130 Z" fill="#e9d2b4" stroke="#333" stroke-width="3"/><rect x="24" y="' + (250 - 90) + '" width="122" height="90" fill="' + (thC === 'steel' ? '#d9dde6' : '#ff9a4a') + '" opacity=".85"/>';
      if (P.flow > 0) s += '<path d="M85 40 V200" stroke="#7a90b0" stroke-width="4" stroke-dasharray="6 5"/><text x="95" y="50" font-size="11">O₂ ↓</text>';
      if (P.t > 0 && P.flow > 0) { s += '<text x="100" y="82" font-size="10" fill="#444">khí CO₂, SO₂ ↑ thoát ra</text><rect x="30" y="160" width="110" height="10" fill="#8f949c" opacity=".6"/><text x="34" y="169" font-size="9">xỉ SiO₂, MnO₂ nổi / slag floats</text>'; }
      s += '<line x1="190" y1="' + gy(0) + '" x2="345" y2="' + gy(0) + '" stroke="#333"/><line x1="190" y1="' + gy(5) + '" x2="190" y2="' + gy(0) + '" stroke="#333"/><text x="192" y="' + (gy(5) - 4) + '" font-size="10">%</text><text x="345" y="' + (gy(0) + 12) + '" text-anchor="end" font-size="10">t</text>';
      [['C', '#222'], ['Si', '#2f6df0'], ['Mn', '#2a8a4a']].forEach(([k, col]) => { let d = ''; for (let t = 0; t <= 40; t += 1) { const v = IND.converter(t, P.flow)[k]; d += (t ? 'L' : 'M') + gx(t).toFixed(1) + ' ' + gy(v).toFixed(1); } s += '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="2.4"/><text x="' + (gx(40) - 2) + '" y="' + (gy(IND.converter(40, P.flow)[k]) - 4) + '" text-anchor="end" font-size="10" fill="' + col + '">' + k + '</text>'; });
      s += '<line x1="' + gx(P.t) + '" y1="' + gy(5) + '" x2="' + gx(P.t) + '" y2="' + gy(0) + '" stroke="#d9573e" stroke-dasharray="4 3"/><circle cx="' + gx(P.t) + '" cy="' + gy(cur.C) + '" r="5" fill="#d9573e"/>';
      s += '<line x1="190" y1="' + gy(P.th) + '" x2="345" y2="' + gy(P.th) + '" stroke="#e0603a" stroke-width="2"/><text x="347" y="' + (gy(P.th) + 4) + '" font-size="10" fill="#e0603a" text-anchor="end" transform="translate(0,-8)">' + fmt(P.th, 1) + ' %</text>';
      s += '<g data-h="th" tabindex="0" role="slider" aria-label="Ngưỡng carbon gang / thép (%) / Carbon threshold pig iron vs steel (%)" aria-valuemin="1" aria-valuemax="5" aria-valuenow="' + fmt(P.th, 1) + '" transform="translate(205,' + gy(P.th) + ')" class="olab__hd olab__hd--src"><circle r="24" class="olab__hit"/><circle r="8" class="olab__dot"/></g>';
      { const hf = document.activeElement && svg.contains(document.activeElement) && document.activeElement.dataset.h; svg.innerHTML = s; if (hf) { const g = svg.querySelector('[data-h="' + hf + '"]'); if (g) g.focus({ preventScroll: true }); } }
      q('res').innerHTML = '<table class="olab__tbl olab__tbl--read"><tbody><tr><th scope="row">C</th><td>' + fmt(cur.C, 2) + ' %</td></tr><tr><th scope="row">Si</th><td>' + fmt(cur.Si, 2) + ' %</td></tr><tr><th scope="row">Mn</th><td>' + fmt(cur.Mn, 2) + ' %</td></tr></tbody></table><p><b>' + (thC === 'steel' ? pr('Đã thành thép', 'Now steel') : pr('Vẫn là gang', 'Still pig iron')) + '</b> ' + pr('(ngưỡng ' + fmt(P.th, 1) + ' %' + (Math.abs(P.th - 2) > 1e-9 ? '; sách quy ước 2 %' : '') + ').', '(threshold ' + fmt(P.th, 1) + ' %' + (Math.abs(P.th - 2) > 1e-9 ? '; the book uses 2 %' : '') + ').') + ' ' + pr('Oxide khí (CO₂, SO₂) thoát theo khí thải; oxide rắn (SiO₂, MnO₂) tạo xỉ nhẹ nổi lên và được tách ra.', 'Gas oxides (CO₂, SO₂) leave with the waste gas; solid oxides (SiO₂, MnO₂) form light slag that floats and is removed.') + '</p>';
      $$('[data-p="t"],[data-n="t"]', lab).forEach((e) => (e.value = P.t)); $('[data-o="t"]', lab).textContent = fmt(P.t, 0);
      if (cur.C < 2 && !draw.done) { draw.done = true; q('status').className = 'olab__status olab__status--ok'; q('status').innerHTML = pr('✓ Carbon xuống dưới 2 %: dừng thổi, thu được thép.', '✓ Carbon is below 2 %: stop blowing, steel is obtained.'); } else if (cur.C >= 2) { draw.done = false; q('status').textContent = ''; }
    }
    L.makeDrag(svg, { th: { move(x, y) { let v = (270 - y) / 130 * 5; v = clamp(Math.round(v * 10) / 10, 1, 5); if (snap && Math.abs(v - 2) < 0.2) v = 2; P.th = v; draw(); }, key(d) { P.th = clamp(Math.round((P.th + d * 0.1) * 10) / 10, 1, 5); draw(); } } });
    svg.addEventListener('keydown', (e) => { if (/^Arrow/.test(e.key)) e.stopPropagation(); });
    bindCtl(lab, P, draw);
    lab.addEventListener('change', (e) => { if (e.target.matches('[data-snap]')) snap = e.target.checked; });
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-act="reset"]')) { P.t = 0; P.flow = 1; P.th = 2; $('[data-p="flow"]', lab).value = 1; $('[data-n="flow"]', lab).value = 1; $('[data-o="flow"]', lab).textContent = '1,0'; draw(); } });
    draw(); return { state: P };
  }

  /* =========================================================== W20.6 — phòng thí nghiệm hợp kim */
  function indAlloy(body) {
    const id = 'al' + (++uid), S = { tab: 'fe', c: 0.6, Cr: 0, Ni: 0, Al: 94, Cu: 4, Mn: 1, Mg: 1, w: Object.assign({}, WOOD), room: 25 };
    body.innerHTML = '<div class="olab em chem" data-lab="' + id + '"><p class="olab__hint">' + pr('Chọn một hợp kim rồi kéo thanh trượt thành phần để xem tên gọi, tính chất và nhiệt độ nóng chảy.', 'Pick an alloy and move the composition sliders to see its name, properties and melting point.') + '</p><div class="olab__btns" role="tablist"><button type="button" class="btn btn--sm" data-tab="fe" aria-pressed="true">' + pr('Sắt – carbon', 'Iron – carbon') + '</button> <button type="button" class="btn btn--sm" data-tab="al" aria-pressed="false">' + pr('Nhôm (đuy-ra)', 'Aluminium (duralumin)') + '</button> <button type="button" class="btn btn--sm" data-tab="wood" aria-pressed="false">' + pr('Hợp kim Wood', 'Wood’s metal') + '</button></div><div data-r="pane"></div><div data-r="res" aria-live="polite"></div></div>';
    const lab = $('[data-lab="' + id + '"]', body), q = (n) => $('[data-r="' + n + '"]', lab);
    function pane() {
      const h = { fe: ctl('c', 'Carbon (%)', 'Carbon (%)', 0, 6, 0.1, S.c, ' %') + ctl('Cr', 'Chromium Cr (%)', 'Chromium Cr (%)', 0, 25, 1, S.Cr, ' %') + ctl('Ni', 'Nickel Ni (%)', 'Nickel Ni (%)', 0, 15, 1, S.Ni, ' %'),
        al: ctl('Cu', 'Đồng Cu (%)', 'Copper Cu (%)', 0, 10, 0.5, S.Cu, ' %') + ctl('Mn', 'Manganese Mn (%)', 'Manganese Mn (%)', 0, 5, 0.5, S.Mn, ' %') + ctl('Mg', 'Magnesium Mg (%)', 'Magnesium Mg (%)', 0, 5, 0.5, S.Mg, ' %'),
        wood: ['Bi', 'Pb', 'Sn', 'Cd'].map((k) => ctl(k, k + ' (%)', k + ' (%)', 0, 100, 0.5, S.w[k], ' %')).join('') + '<div class="olab__btns"><button type="button" class="btn btn--sm" data-preset>' + pr('Về hợp kim Wood (50 / 25 / 12,5 / 12,5)', 'Back to Wood’s metal (50 / 25 / 12.5 / 12.5)') + '</button></div><div data-valve></div>' }[S.tab];
      q('pane').innerHTML = h; res();
    }
    function res() {
      let h = '';
      if (S.tab === 'fe') {
        const k = IND.classifyFeC(S.c), inox = IND.isInox({ c: S.c, Cr: S.Cr, Ni: S.Ni });
        h = '<p><b>' + (inox ? pr('Inox (thép không gỉ)', 'Stainless steel (inox)') : k === 'steel' ? pr('Thép', 'Steel') : k === 'iron' ? pr('Gang', 'Pig (cast) iron') : pr('Ngoài khung bài (> 5 % C)', 'Outside the lesson (> 5 % C)')) + '</b> — ' + pr('carbon ' + fmt(S.c, 1) + ' %', 'carbon ' + fmt(S.c, 1) + ' %') + '</p><p>' + (inox ? pr('Thép có thêm chromium và nickel: cứng, khó gỉ; dùng làm đồ gia dụng, thiết bị y tế. (Sách không nêu ngưỡng % Cr, Ni.)', 'Steel with added chromium and nickel: hard and rust-resistant; used for household goods and medical equipment. (The book gives no % thresholds for Cr, Ni.)') : k === 'steel' ? pr('Thép: cứng, đàn hồi, chịu lực hơn sắt; dùng trong xây dựng, giao thông. Thêm Cr và Ni để thành inox.', 'Steel: harder, more elastic and stronger than iron; used in construction and transport. Add Cr and Ni to make inox.') : k === 'iron' ? pr('Gang: cứng và giòn hơn thép; dùng đúc chi tiết máy, ống dẫn nước, nắp cống.', 'Pig iron: harder and more brittle than steel; used to cast machine parts, water pipes, manhole covers.') : '') + '</p>';
      } else if (S.tab === 'al') {
        const d = IND.isDuralumin({ Al: 100 - S.Cu - S.Mn - S.Mg, Cu: S.Cu, Mn: S.Mn, Mg: S.Mg });
        h = '<p><b>' + (d ? pr('Đuy-ra (duralumin)', 'Duralumin') : pr('Chưa phải đuy-ra', 'Not yet duralumin')) + '</b> — Al ' + fmt(100 - S.Cu - S.Mn - S.Mg, 1) + ' %</p><p>' + (d ? pr('Hợp kim của nhôm với đồng, manganese, magnesium: nhẹ tương đương nhôm nhưng bền và cứng hơn nhiều; dùng chế tạo máy bay, ô tô.', 'An alloy of aluminium with copper, manganese and magnesium: as light as aluminium but much stronger and harder; used for aircraft and cars.') : pr('Đuy-ra cần cả ba kim loại phụ: Cu, Mn, Mg (cho giá trị > 0).', 'Duralumin needs all three additions: Cu, Mn, Mg (set each above 0).')) + '</p>';
      } else {
        const mp = IND.woodMP(S.w), sum = S.w.Bi + S.w.Pb + S.w.Sn + S.w.Cd, exact = ['Bi', 'Pb', 'Sn', 'Cd'].every((k) => Math.abs(S.w[k] - WOOD[k]) < 1e-9);
        h = '<table class="olab__tbl"><thead><tr><th></th><th>Bi</th><th>Pb</th><th>Sn</th><th>Cd</th></tr></thead><tbody><tr><th scope="row">' + pr('Nhiệt độ nóng chảy đơn chất (°C)', 'Melting point of the pure metal (°C)') + '</th><td>271</td><td>327</td><td>232</td><td>321</td></tr></tbody></table><p><b>' + fmt(mp, 1) + ' °C</b> ' + (exact ? pr('(đúng giá trị trong sách: 55,5 °C)', '(the book’s value: 55.5 °C)') : pr('(mô hình nội suy; chỉ 50/25/12,5/12,5 là số của sách)', '(interpolated model; only 50/25/12.5/12.5 is the book’s figure)')) + '</p><p><small>' + pr('Tổng các thành phần: ' + fmt(sum, 1) + ' % — máy tự chuẩn hoá về 100 % khi tính.', 'Sum of components: ' + fmt(sum, 1) + ' % — normalised to 100 % in the calculation.') + '</small></p>' + note(['Điểm nóng chảy thay đổi khi đổi thành phần (sách). Phần nội suy là mô hình minh hoạ, không phải số đo.', 'The melting point changes with composition (book). The interpolation is an illustrative model, not a measurement.']);
        const valve = (mp <= S.room);
        h += '<div data-vv><svg class="olab__svg em__svg" viewBox="0 0 360 120" role="img" aria-label="Van chữa cháy tự động / Fire-sprinkler valve"><rect width="360" height="120" fill="#f6f8fc"/><rect x="160" y="10" width="40" height="30" fill="#8f949c"/><rect x="172" y="40" width="16" height="22" fill="' + (valve ? '#999' : '#d9573e') + '" opacity="' + (valve ? 0.3 : 1) + '"/><text x="212" y="58" font-size="11">' + (valve ? 'hợp kim chảy: van mở / alloy melted: valve open' : 'hợp kim còn rắn: van đóng / alloy solid: valve closed') + '</text>' + (valve ? '<g stroke="#2f8bd0" stroke-width="2.4"><path d="M170 66 l-14 30 M180 68 v34 M190 66 l14 30"/></g>' : '') + '</svg></div>' + ctl('room', 'Nhiệt độ môi trường (°C)', 'Ambient temperature (°C)', 20, 100, 1, S.room, ' °C');
      }
      if (S.tab === 'wood') { q('res').innerHTML = h; } else q('res').innerHTML = h;
    }
    lab.addEventListener('click', (e) => {
      const t = e.target.closest('[data-tab]'); if (t) { S.tab = t.dataset.tab; $$('[data-tab]', lab).forEach((x) => x.setAttribute('aria-pressed', x === t)); pane(); return; }
      if (e.target.closest('[data-preset]')) { S.w = Object.assign({}, WOOD); pane(); }
    });
    lab.addEventListener('input', (e) => {
      const k = e.target.dataset && (e.target.dataset.p || e.target.dataset.n); if (!k || e.target.value === '') return;
      const sl = $('[data-p="' + k + '"]', lab), nu = $('[data-n="' + k + '"]', lab); if (!sl) return; const v = clamp(+e.target.value, +sl.min, +sl.max);
      if (['Bi', 'Pb', 'Sn', 'Cd'].indexOf(k) >= 0) S.w[k] = v; else S[k] = v;
      if (e.target === sl) nu.value = v; else sl.value = v; $('[data-o="' + k + '"]', lab).textContent = fmt(v, +sl.step < 1 ? 1 : 0); res();
      const c = $('[data-p="' + k + '"]', lab); if (c) { /* giữ nguyên vị trí thanh trượt */ }
    });
    pane(); return { state: S };
  }

  /* =========================================================== W20.7 — tính tấn–kg */
  function indCalc(body) {
    const id = 'ic' + (++uid), P = { ore: 1, pur: 100, yld: 100 }, S = { kind: 'Fe' };
    body.innerHTML = '<div class="olab em chem" data-lab="' + id + '"><p class="olab__hint">' + pr('Chọn kim loại cần tách, chỉnh khối lượng quặng, độ tinh khiết và hiệu suất; máy tính kim loại thu được. Rồi tự tính một bài mới và kiểm tra. (Bài tính này là BỔ SUNG, sách không in.)', 'Choose the metal, set the ore mass, purity and yield; the machine computes the metal obtained. Then solve a new problem yourself and check. (This calculation is an EXTRA, not printed in the book.)') + '</p><div class="olab__btns"><button type="button" class="btn btn--sm" data-k="Fe" aria-pressed="true">' + pr('Sắt từ Fe₂O₃', 'Iron from Fe₂O₃') + '</button> <button type="button" class="btn btn--sm" data-k="Al" aria-pressed="false">' + pr('Nhôm từ Al₂O₃', 'Aluminium from Al₂O₃') + '</button></div>' + ctl('ore', 'Khối lượng quặng (tấn)', 'Ore mass (tonnes)', 0.5, 20, 0.5, P.ore, ' t') + ctl('pur', 'Hàm lượng oxide (%)', 'Oxide content (%)', 10, 100, 1, P.pur, ' %') + ctl('yld', 'Hiệu suất (%)', 'Yield (%)', 10, 100, 1, P.yld, ' %') + '<div data-r="res" aria-live="polite"></div><div data-r="task"></div><p class="olab__status" data-r="status" role="status"></p></div>';
    const lab = $('[data-lab="' + id + '"]', body), q = (n) => $('[data-r="' + n + '"]', lab);
    let task = null, tn = 0;
    function show() {
      const r = IND.fromOre(S.kind, P.ore, P.pur / 100, P.yld / 100), ox = S.kind === 'Fe' ? 'Fe₂O₃' : 'Al₂O₃';
      q('res').innerHTML = '<p>' + pr('Oxide ' + ox + ' nguyên chất: ' + fmt(r.pure, 3) + ' tấn. Cứ 1,0 tấn ' + ox + ' cho ' + fmt(r.ratio, 2) + ' tấn kim loại.', 'Pure ' + ox + ': ' + fmt(r.pure, 3) + ' t. Each 1.0 t of ' + ox + ' gives ' + fmt(r.ratio, 2) + ' t of metal.') + '</p><table class="olab__tbl olab__tbl--read"><tbody><tr><th scope="row">' + pr('Kim loại thu được', 'Metal obtained') + ' ' + S.kind + '</th><td>' + fmt(r.metal, 3) + ' ' + pr('tấn', 't') + ' (' + fmt(r.metal * 1000, 0) + ' kg)</td></tr>' + (S.kind === 'Fe' ? '<tr><th scope="row">' + pr('CO cần dùng', 'CO needed') + '</th><td>' + fmt(r.co, 3) + ' ' + pr('tấn', 't') + '</td></tr>' : '') + '</tbody></table><p><small>' + pr(E.eqStr(E.extra(S.kind === 'Fe' ? 'fe-co' : 'al-electrolysis')), E.eqStr(E.extra(S.kind === 'Fe' ? 'fe-co' : 'al-electrolysis'))) + '</small></p>';
    }
    function newTask() { tn++; const ore = [2, 5, 8, 12, 3.5][tn % 5], pur = [80, 60, 75, 90, 70][tn % 5], y = [90, 85, 95, 80, 100][tn % 5], r = IND.fromOre(S.kind, ore, pur / 100, y / 100); task = { ore, pur, y, ans: r.metal }; q('task').innerHTML = '<p><b>' + pr('Bài mới (bổ sung):', 'New problem (extra):') + '</b> ' + pr('Từ ' + fmt(task.ore, 1) + ' tấn quặng chứa ' + task.pur + ' % ' + (S.kind === 'Fe' ? 'Fe₂O₃' : 'Al₂O₃') + ', hiệu suất ' + task.y + ' %, thu được bao nhiêu tấn ' + (S.kind === 'Fe' ? 'sắt' : 'nhôm') + '?', 'From ' + fmt(task.ore, 1) + ' t of ore containing ' + task.pur + ' % ' + (S.kind === 'Fe' ? 'Fe₂O₃' : 'Al₂O₃') + ', yield ' + task.y + ' %, how many tonnes of ' + (S.kind === 'Fe' ? 'iron' : 'aluminium') + ' are obtained?') + '</p><label class="olab__ctl"><span>' + pr('Đáp số (tấn)', 'Answer (t)') + '</span><input type="number" step="0.001" data-ans style="width:7em" aria-label="Đáp số / Answer"></label><div class="olab__btns"><button type="button" class="btn btn--sm" data-chk>' + pr('Kiểm tra', 'Check') + '</button> <button type="button" class="btn btn--sm" data-new>' + pr('Bài khác', 'Another problem') + '</button></div>'; q('status').textContent = ''; }
    bindCtl(lab, P, show);
    lab.addEventListener('click', (e) => {
      const k = e.target.closest('[data-k]'); if (k) { S.kind = k.dataset.k; $$('[data-k]', lab).forEach((x) => x.setAttribute('aria-pressed', x === k)); show(); newTask(); return; }
      if (e.target.closest('[data-new]')) { newTask(); return; }
      if (e.target.closest('[data-chk]')) { const v = parseFloat(String($('[data-ans]', lab).value).replace(',', '.')); const ok = isFinite(v) && Math.abs(v - task.ans) <= 0.01 * task.ans + 0.0005; q('status').className = 'olab__status ' + (ok ? 'olab__status--ok' : 'olab__status--warn'); q('status').innerHTML = ok ? '✓ ' + pr('Đúng: ' + fmt(task.ans, 3) + ' tấn.', 'Correct: ' + fmt(task.ans, 3) + ' t.') : '✗ ' + pr('Chưa đúng. Gợi ý: khối lượng oxide nguyên chất = quặng × hàm lượng; rồi nhân tỉ lệ khối lượng mol 2M(kim loại)/M(oxide) và hiệu suất. Đáp số: ' + fmt(task.ans, 3) + ' tấn.', 'Not right. Hint: pure oxide mass = ore × content; then multiply by 2M(metal)/M(oxide) and the yield. Answer: ' + fmt(task.ans, 3) + ' t.'); }
    });
    show(); newTask(); return { state: P };
  }

  const sims = {
    'ind-furnace': { fn: indFurnace, vi: 'Lò cao luyện gang (Hình 20.2)', en: 'Blast furnace for pig iron (Figure 20.2)', intro: 'Kéo nguyên liệu vào miệng lò.' },
    'ind-method': { fn: indMethod, vi: 'Chọn phương pháp tách kim loại', en: 'Choosing an extraction method', intro: 'Kéo kim loại hoặc quặng vào phương pháp.' },
    'ind-cell': { fn: indCell, vi: 'Bể điện phân aluminium oxide (Hình 20.1)', en: 'Aluminium oxide electrolysis cell (Figure 20.1)', intro: 'Lắp bể điện phân.' },
    'ind-redox': { fn: indRedox, vi: 'Tách sắt và kẽm bằng nhiệt luyện', en: 'Extracting iron and zinc by thermal reduction', intro: 'Kéo hai chất vào lò nung.' },
    'ind-converter': { fn: indConverter, vi: 'Lò thổi luyện thép (Hình 20.3)', en: 'Steel converter (Figure 20.3)', intro: 'Thổi O₂ và theo dõi %C.' },
    'ind-alloy': { fn: indAlloy, vi: 'Phòng thí nghiệm hợp kim', en: 'Alloy lab', intro: 'Chỉnh thành phần hợp kim.' },
    'ind-calc': { fn: indCalc, vi: 'Tính khối lượng kim loại từ quặng', en: 'Metal mass from ore', intro: 'Tính theo tấn.' }
  };
  window.LabSims = Object.assign(window.LabSims || {}, sims);
})();
