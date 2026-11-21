/* ==========================================================================
   CHEM LIME — engine thuần cho Bài 34 (đá vôi, công nghiệp silicate) và Bài 35 (đốt cháy nhiên liệu). Nạp SAU chem-industry.js, TRƯỚC mol-lab.js.
   Gắn vào ChemLab.engine.LIME; các phản ứng cũng được đăng ký vào ChemLab.engine.ALC.R để dùng chung ô nhập hệ số MolLab.org.coef.
   Hệ số luôn do balance() tính (không viết tay). Khối lượng mol dùng số làm tròn của sách: H 1, C 12, O 16, Na 23, Si 28, S 32, Cl 35,5, Ca 40.
   CÁCH THÊM PHẢN ỨNG: thêm một dòng vào RX (re, pr, điều kiện, book) + một dòng kiểm tra vào selfTest. Chất mới: thêm nguyên tố vào MB nếu cần.
   book:false = bổ sung ngoài sách.
   ========================================================================== */
(function () {
  'use strict';
  const CL = window.ChemLab, L = window.OpticsLab;
  if (!CL || !CL.engine || !CL.engine.ALC || !CL.engine.ORG || !L) return;
  const E = CL.engine, ALC = E.ALC, ORG = E.ORG, mk = ORG.mk, pf = E.parseFormula;
  const LIME = (function () {
    const MB = { H: 1, C: 12, N: 14, O: 16, Na: 23, Si: 28, S: 32, Cl: 35.5, Ca: 40 };
    const mm = (f) => { const m = pf(f); let s = 0; for (const k in m) s += MB[k] * m[k]; return s; };
    const near = (a, b, e) => Math.abs(a - b) <= e;
    const RX = {
      limeDecomp: { re: ['CaCO3'], pr: ['CaO', 'CO2'], c: 't°', book: true },
      slake: { re: ['CaO', 'H2O'], pr: ['Ca(OH)2'], c: '', book: true },
      limewater: { re: ['Ca(OH)2', 'CO2'], pr: ['CaCO3', 'H2O'], c: '', book: false },
      cave: { re: ['CaCO3', 'CO2', 'H2O'], pr: ['Ca(HCO3)2'], c: '', rev: true, book: true },
      limeAcid: { re: ['CaCO3', 'HCl'], pr: ['CaCl2', 'H2O', 'CO2'], c: '', book: false },
      glass2: { re: ['CaO', 'SiO2'], pr: ['CaSiO3'], c: 't°', book: true },
      glass3: { re: ['Na2CO3', 'SiO2'], pr: ['Na2SiO3', 'CO2'], c: 't°', book: true },
      burnC: { re: ['C', 'O2'], pr: ['CO2'], c: 't°', book: true },
      burnCH4: { re: ['CH4', 'O2'], pr: ['CO2', 'H2O'], c: 't°', book: true }
    };
    const R = {}; Object.keys(RX).forEach((k) => { const x = RX[k]; R[k] = mk(x.re, x.pr, x.c, { rev: !!x.rev, book: x.book, id: k }); if (!ALC.R[k]) ALC.R[k] = R[k]; });
    R.burnEtOH = ALC.R.burnEtOH;                                       // C₂H₅OH có sẵn ở Bài 26
    R.glass1 = R.limeDecomp;                                           // phương trình thứ nhất khi nấu thuỷ tinh trùng nhiệt phân đá vôi
    const coefs = (r) => r.re.concat(r.pr).map((s) => s.n);
    const molOf = (r, f) => (r.re.concat(r.pr).find((s) => s.f === f) || { n: 0 }).n;
    /* khối lượng chất cần tìm theo phương trình: m gam chất `from` → ? gam chất `to` (lí thuyết, hiệu suất 100 %) */
    function mass(r, from, to, m) { const a = molOf(r, from), b = molOf(r, to); if (!a || !b || !(m >= 0)) return null; return m / mm(from) / a * b * mm(to); }
    /* nung đá vôi: m (cùng đơn vị), purity 0–1 (phần CaCO₃), yld 0–1 (hiệu suất). Trả về khối lượng CaO, CO₂, phần CaCO₃ chưa phân huỷ, tạp chất, rắn còn lại */
    function kiln(m, purity, yld) {
      purity = Math.min(1, Math.max(0, purity == null ? 1 : purity)); yld = Math.min(1, Math.max(0, yld == null ? 1 : yld)); m = Math.max(0, +m || 0);
      const caco3 = m * purity, used = caco3 * yld, cao = used / mm('CaCO3') * mm('CaO'), co2 = used / mm('CaCO3') * mm('CO2'), left = caco3 - used, imp = m - caco3;
      return { cao, co2, left, imp, solid: cao + left + imp, used, total: m };
    }
    /* tiến trình nung theo nhiệt độ và thời gian t (0–1): dưới Tmin không phân huỷ — Tmin = 800 °C là KIẾN THỨC MỞ RỘNG (sách chỉ nói “nhiệt độ cao”) */
    const TMIN = 800;
    const calc = (T, t) => (T < TMIN ? 0 : Math.min(1, Math.max(0, t) * Math.min(1, 0.4 + (T - TMIN) / 400)));
    /* tôi vôi: gCaO gam CaO + nước → Ca(OH)₂; trả về nước phản ứng, Ca(OH)₂ tạo ra, nước dư (nếu cho nhiều hơn) */
    function slake(gCaO, gWater) { const need = gCaO / mm('CaO') * mm('H2O'), used = Math.min(need, Math.max(0, gWater)), ca = used / mm('H2O') * mm('Ca(OH)2'); return { need, used, ca, leftCaO: gCaO - used / mm('H2O') * mm('CaO'), excess: Math.max(0, gWater - need) }; }
    /* nấu thuỷ tinh: gam CaCO₃, Na₂CO₃, SiO₂ (cát) → CaSiO₃, Na₂SiO₃, CO₂ (bay ra); bảo toàn khối lượng */
    function glass(gCa, gNa, gSi) {
      const nCa = gCa / mm('CaCO3'), nNa = gNa / mm('Na2CO3'), nSi = gSi / mm('SiO2');
      const useCa = Math.min(nCa, nSi), nSiLeft = nSi - useCa, useNa = Math.min(nNa, nSiLeft), siLeft = nSiLeft - useNa;
      const gCaSi = useCa * mm('CaSiO3'), gNaSi = useNa * mm('Na2SiO3'), co2 = (useCa + useNa) * mm('CO2');
      const caLeft = (nCa - useCa) * mm('CaCO3'), naLeft = (nNa - useNa) * mm('Na2CO3'), siO2Left = siLeft * mm('SiO2');
      return { gCaSi, gNaSi, co2, caLeft, naLeft, siO2Left, glass: gCaSi + gNaSi, inMass: gCa + gNa + gSi, outMass: gCaSi + gNaSi + co2 + caLeft + naLeft + siO2Left };
    }
    /* phát thải CO₂ khi đốt 1 g nhiên liệu: CH₄ 2,75; C 3,67; C₂H₅OH 1,91 (g CO₂/g) */
    const FUELS = { CH4: { vi: 'methane (CH₄)', en: 'methane (CH₄)', r: 'burnCH4' }, C: { vi: 'than (C)', en: 'coal (C)', r: 'burnC' }, C2H5OH: { vi: 'ethylic alcohol (C₂H₅OH)', en: 'ethanol (C₂H₅OH)', r: 'burnEtOH' } };
    const co2per = (f) => { const r = R[FUELS[f].r]; return mass(r, f, 'CO2', 1); };
    const co2mass = (f, g) => (+g >= 0 ? g * co2per(f) : null);
    /* năng suất toả nhiệt (kJ/g) theo sách, dạng khoảng */
    const HEATR = { wood: { vi: 'Gỗ', en: 'Wood', lo: 15, hi: 20 }, coal: { vi: 'Than đá', en: 'Coal', lo: 20, hi: 30 }, kero: { vi: 'Dầu hoả', en: 'Kerosene', lo: 42, hi: 45 } };
    const heat = (k, g) => ({ lo: HEATR[k].lo * g, hi: HEATR[k].hi * g });
    const best = () => { const ks = Object.keys(HEATR); return ks.filter((k) => ks.every((j) => j === k || HEATR[k].lo > HEATR[j].hi)); };   // nhiên liệu chắc chắn nhiều nhiệt nhất
    /* MỞ RỘNG: CO₂ trên mỗi kJ — CH₄ dùng 891 kJ/mol (Bài 23); than coi như carbon nguyên chất, dùng khoảng 20–30 kJ/g của sách (giả thiết) */
    const co2perKJ = { ch4: () => co2per('CH4') * mm('CH4') / 891 , coal: () => [co2per('C') / HEATR.coal.hi, co2per('C') / HEATR.coal.lo] };
    /* hỗn hợp xi măng: tỉ lệ thạch cao (% khối lượng); sách nêu khoảng 5 % — cảnh báo định tính nếu lệch quá 2 điểm (MỞ RỘNG) */
    const gypsumState = (p) => (p < 0.5 ? 'none' : Math.abs(p - 5) <= 2 ? 'ok' : p < 5 ? 'low' : 'high');
    /* thuỷ tinh làm nguội: dẻo nếu tốc độ nguội ≤ 0,5 (chuẩn hoá 0–1); nguội quá nhanh → ứng suất → nứt (MỞ RỘNG, định tính) */
    const coolState = (rate) => (rate <= 0.5 ? 'ok' : rate <= 0.75 ? 'stress' : 'crack');
    /* lò nung gốm (định tính, MỞ RỘNG): quá thấp → xốp, mềm, dễ vỡ; vừa → bền; quá cao → biến dạng, hỏng */
    const KILNS = { brick: { lo: 900, hi: 1100 }, porcelain: { lo: 1200, hi: 1400 } };
    const kilnState = (k, T) => (T < KILNS[k].lo ? 'low' : T > KILNS[k].hi ? 'high' : 'ok');
    const cementKiln = (T) => (T < 1400 ? 'low' : T > 1600 ? 'high' : 'ok');
    function selfTest() {
      const T = [], add = (n, ok, got) => T.push({ name: n, ok: !!ok, got }), same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
      add('phương trình cân bằng: CaCO₃ → CaO + CO₂ (1·1·1); CaO + H₂O → Ca(OH)₂ (1·1·1); Ca(OH)₂ + CO₂ → CaCO₃ + H₂O (1·1·1·1)', same(coefs(R.limeDecomp), [1, 1, 1]) && same(coefs(R.slake), [1, 1, 1]) && same(coefs(R.limewater), [1, 1, 1, 1]), coefs(R.limeDecomp).join());
      add('CaCO₃ + CO₂ + H₂O ⇌ Ca(HCO₃)₂ (1·1·1·1, thuận nghịch); CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂', same(coefs(R.cave), [1, 1, 1, 1]) && R.cave.rev === true && same(coefs(R.limeAcid), [1, 2, 1, 1, 1]), coefs(R.limeAcid).join());
      add('nấu thuỷ tinh: CaO + SiO₂ → CaSiO₃ (1·1·1); Na₂CO₃ + SiO₂ → Na₂SiO₃ + CO₂ (1·1·1·1)', same(coefs(R.glass2), [1, 1, 1]) && same(coefs(R.glass3), [1, 1, 1, 1]) && R.glass1 === R.limeDecomp, coefs(R.glass3).join());
      add('đốt cháy: C + O₂ → CO₂ (1·1·1); CH₄ + 2O₂ → CO₂ + 2H₂O (1·2·1·2); C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O (1·3·2·3)', same(coefs(R.burnC), [1, 1, 1]) && same(coefs(R.burnCH4), [1, 2, 1, 2]) && same(coefs(R.burnEtOH), [1, 3, 2, 3]), coefs(R.burnEtOH).join());
      add('khối lượng mol: CaCO₃ 100; CaO 56; CO₂ 44; Ca(OH)₂ 74; Na₂CO₃ 106; SiO₂ 60; Na₂SiO₃ 122; CaSiO₃ 116', mm('CaCO3') === 100 && mm('CaO') === 56 && mm('CO2') === 44 && mm('Ca(OH)2') === 74 && mm('Na2CO3') === 106 && mm('SiO2') === 60 && mm('Na2SiO3') === 122 && mm('CaSiO3') === 116, [mm('CaCO3'), mm('CaO'), mm('CO2'), mm('Ca(OH)2')].join());
      add('100 g CaCO₃ → 56 g CaO + 44 g CO₂; 56 g CaO + 18 g H₂O → 74 g Ca(OH)₂', mass(R.limeDecomp, 'CaCO3', 'CaO', 100) === 56 && mass(R.limeDecomp, 'CaCO3', 'CO2', 100) === 44 && mass(R.slake, 'CaO', 'Ca(OH)2', 56) === 74 && mass(R.slake, 'CaO', 'H2O', 56) === 18, '');
      const k = kiln(1, 0.9, 1);
      add('1 tấn đá vôi chứa 90 % CaCO₃: 0,504 tấn CaO + 0,396 tấn CO₂ (lí thuyết); hiệu suất 80 % → 0,4032 tấn CaO; bảo toàn khối lượng', near(k.cao, 0.504, 1e-9) && near(k.co2, 0.396, 1e-9) && near(kiln(1, 0.9, 0.8).cao, 0.4032, 1e-9) && [kiln(1, 0.9, 0.8), kiln(5, 0.7, 0.35)].every((x) => near(x.solid + x.co2, x.total, 1e-9)), k.cao + ' / ' + k.co2);
      add('lò nung: dưới 800 °C không phân huỷ; trên mức đó tiến trình tăng theo thời gian và nhiệt độ, trong [0,1]', calc(700, 1) === 0 && calc(900, 0.5) > 0 && calc(900, 1) <= calc(1100, 1) && [0, 0.3, 1].every((t) => [0, 800, 950, 1400, 2000].every((Tc) => { const v = calc(Tc, t); return isFinite(v) && v >= 0 && v <= 1; })), '');
      const s = slake(56, 18), s2 = slake(56, 40), s3 = slake(56, 5);
      add('tôi vôi: 56 g CaO cần 18 g nước → 74 g Ca(OH)₂; nước dư; thiếu nước chỉ phản ứng một phần', near(s.used, 18, 1e-9) && near(s.ca, 74, 1e-9) && near(s2.excess, 22, 1e-9) && near(s2.ca, 74, 1e-9) && s3.used === 5 && s3.leftCaO > 0, s.ca);
      const g1 = glass(100, 106, 120);
      add('thuỷ tinh: 100 g CaCO₃ + 106 g Na₂CO₃ + 120 g SiO₂ → 116 g CaSiO₃ + 122 g Na₂SiO₃ + 88 g CO₂ (bay ra); khối lượng bảo toàn', near(g1.gCaSi, 116, 1e-9) && near(g1.gNaSi, 122, 1e-9) && near(g1.co2, 88, 1e-9) && near(g1.glass, 238, 1e-9) && near(g1.inMass, g1.outMass, 1e-9) && near(glass(50, 20, 10).inMass, glass(50, 20, 10).outMass, 1e-9) && glass(0, 0, 0).glass === 0, g1.co2);
      add('CO₂ trên mỗi gam nhiên liệu: CH₄ 2,75; C 3,67; C₂H₅OH 1,91; 46 g C₂H₅OH → 88 g CO₂', near(co2per('CH4'), 2.75, 1e-9) && near(co2per('C'), 44 / 12, 1e-9) && near(co2per('C2H5OH'), 88 / 46, 1e-9) && near(co2mass('C2H5OH', 46), 88, 1e-9) && co2mass('C', -1) === null, [co2per('CH4'), co2per('C'), co2per('C2H5OH')].join());
      const hw = heat('wood', 100), hk = heat('kero', 100);
      add('năng suất toả nhiệt: dầu hoả (42–45) > than đá (20–30) > gỗ (15–20); 100 g dầu hoả: 4 200–4 500 kJ; chỉ dầu hoả chắc chắn nhiều nhất', best().join() === 'kero' && hk.lo === 4200 && hk.hi === 4500 && hw.lo === 1500 && HEATR.coal.hi > HEATR.wood.lo, best().join());
      add('MỞ RỘNG — CO₂ trên mỗi kJ: methane ≈ 0,049 g/kJ nhỏ hơn than (coi là C) 0,122–0,183 g/kJ', near(co2perKJ.ch4(), 0.04938, 1e-4) && near(co2perKJ.coal()[0], 0.12222, 1e-4) && near(co2perKJ.coal()[1], 0.18333, 1e-4) && co2perKJ.ch4() < co2perKJ.coal()[0], co2perKJ.ch4().toFixed(4));
      add('xi măng/thuỷ tinh/gốm (định tính): thạch cao 5 % hợp lệ, 0 và 15 % cảnh báo; nguội chậm đạt, nguội nhanh nứt; lò gạch 900–1100; xi măng 1400–1600', gypsumState(5) === 'ok' && gypsumState(0) === 'none' && gypsumState(15) === 'high' && gypsumState(1) === 'low' && coolState(0.2) === 'ok' && coolState(0.95) === 'crack' && kilnState('brick', 500) === 'low' && kilnState('brick', 1000) === 'ok' && kilnState('porcelain', 1500) === 'high' && cementKiln(1500) === 'ok' && cementKiln(1000) === 'low' && cementKiln(1800) === 'high', '');
      add('không NaN/∞: khối lượng âm, rất lớn hoặc không phải số', [kiln(-1, 2, -1), kiln(NaN, 1, 1), kiln(1e12, 0.5, 0.5), slake(-5, -5)].every((o) => Object.keys(o).every((q) => isFinite(o[q]))) && [glass(-1, -1, -1), glass(1e9, 1e9, 1e9)].every((o) => Object.keys(o).every((q) => isFinite(o[q]))), '');
      return T;
    }
    return { MB, mm, RX, R, coefs, mass, kiln, TMIN, calc, slake, glass, FUELS, co2per, co2mass, HEATR, heat, best, co2perKJ, gypsumState, coolState, KILNS, kilnState, cementKiln, selfTest };
  })();
  E.LIME = LIME;
  { const st = E.selfTest; E.selfTest = function () { return st().concat(LIME.selfTest()); }; }
})();
