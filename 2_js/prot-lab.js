/* ==========================================================================
   PROT LAB — engine thuần cho Bài 31 (Protein) và Bài 32 (Polymer). Nạp SAU chem-lab.js, TRƯỚC mol-w31.js.
   Gắn vào ChemLab.engine.PRO và nối selfTest vào chuỗi selfTest chung. Không đụng DOM.
   CÁCH THÊM: amino acid mới → thêm vào AA (công thức {C,H,N,O} + tên); monomer mới → thêm vào MONO (công thức, mắt xích);
   mẫu sợi → thêm vào FIBRE; vật dụng 5R → thêm vào R5.
   ========================================================================== */
(function () {
  'use strict';
  const CL = window.ChemLab, L = window.OpticsLab;
  if (!CL || !CL.engine || !L) return;
  const E = CL.engine, PRO = (function () {
    const MB = { H: 1, C: 12, N: 14, O: 16, Cl: 35.5 };
    const near = (a, b, e) => Math.abs(a - b) <= e;
    /* ---- amino acid (sách: alanine và glycine) ---- */
    const AA = {
      gly: { vi: 'Glycine', en: 'Glycine', ab: 'Gly', f: { C: 2, H: 5, N: 1, O: 2 }, side: 'H' },
      ala: { vi: 'Alanine', en: 'Alanine', ab: 'Ala', f: { C: 3, H: 7, N: 1, O: 2 }, side: 'CH₃' }
    };
    const fm = (f) => ['C', 'H', 'N', 'O', 'Cl'].filter((k) => f[k]).map((k) => k + (f[k] > 1 ? f[k] : '')).join('');
    const sub = (s) => String(s).replace(/\d/g, (d) => '₀₁₂₃₄₅₆₇₈₉'[d]);
    const M = (f) => Object.keys(f).reduce((s, k) => s + MB[k] * f[k], 0);
    /* chuỗi peptide: seq = ['gly','ala',…]; n amino acid → n−1 liên kết peptide, tách n−1 H₂O */
    function peptide(seq) {
      const n = seq.length, f = { C: 0, H: 0, N: 0, O: 0 };
      seq.forEach((k) => Object.keys(AA[k].f).forEach((e) => (f[e] += AA[k].f[e])));
      const w = Math.max(0, n - 1); f.H -= 2 * w; f.O -= w;
      return { n, bonds: w, water: w, f, formula: sub(fm(f)), M: M(f), sumAA: seq.reduce((s, k) => s + M(AA[k].f), 0), name: seq.map((k) => AA[k].ab).join('–') };
    }
    /* số chuỗi khác nhau có thể xếp từ một bộ amino acid (hoán vị lặp) */
    function arrangements(counts) {
      const fact = (n) => (n < 2 ? 1 : n * fact(n - 1)), tot = Object.keys(counts).reduce((s, k) => s + counts[k], 0);
      return Math.round(fact(tot) / Object.keys(counts).reduce((p, k) => p * fact(counts[k]), 1));
    }
    function hydrolyse(seq) { const p = peptide(seq); return { aa: seq.slice(), water: p.water, massBefore: p.M, massWater: 18 * p.water, massAfter: p.sumAA, ok: near(p.M + 18 * p.water, p.sumAA, 1e-9) }; }
    /* thuỷ phân theo thời gian (định tính): số liên kết còn lại */
    function hydProgress(n, cat, t) { const k = cat === 'enzyme' ? 0.5 : (cat === 'acid' || cat === 'base') ? 0.25 : 0; const total = n - 1, cut = Math.min(total, Math.round(total * (1 - Math.exp(-k * t)))); return { total, cut, bondsLeft: total - cut }; }
    /* ---- thí nghiệm lòng trắng trứng: ống 1 HCl 1 M; ống 2 hơ nhẹ ~1 phút; ống 3 đun đến khét ---- */
    function egg(o) {
      o = o || {};
      const hcl = o.hcl > 0, heat = o.heat | 0;                              // heat: 0 không, 1 hơ nhẹ, 2 đun mạnh đến khét
      if (heat >= 2) return { state: 'burnt', vi: 'bị phân huỷ/cháy: chuyển nâu, đen, có chất bay hơi và mùi khét', en: 'decomposed/burnt: turns brown-black, volatile products and a burnt smell', smell: true };
      if (hcl || heat === 1) return { state: 'coag', vi: 'đông tụ: đục, vón thành khối trắng', en: 'coagulated: cloudy, clots into a white mass', smell: false };
      return { state: 'clear', vi: 'chưa đổi: dung dịch nhớt, trong', en: 'unchanged: a clear, viscous liquid', smell: false };
    }
    /* ---- sợi: đốt thử (chỉ minh hoạ định tính) ---- */
    const FIBRE = {
      silk: { vi: 'Tơ tằm', en: 'Silk', protein: true, burn: 'khét như tóc cháy; tàn vụn, dễ nát', burnEn: 'burnt smell like burning hair; crumbly ash' },
      wool: { vi: 'Len lông cừu', en: 'Wool', protein: true, burn: 'khét như tóc cháy; tàn vụn, dễ nát', burnEn: 'burnt smell like burning hair; crumbly ash' },
      nylon: { vi: 'Tơ nylon', en: 'Nylon', protein: false, burn: 'co lại, chảy thành giọt cứng; mùi khác mùi tóc cháy (khí độc, không tự đốt)', burnEn: 'shrinks and melts into hard beads; a smell unlike burning hair (toxic fumes, never try it)' },
      cotton: { vi: 'Bông vải', en: 'Cotton', protein: false, ext: true, burn: 'cháy như giấy, không có mùi khét tóc (mở rộng)', burnEn: 'burns like paper, no burnt-hair smell (extension)' }
    };
    /* ---- polymer ---- */
    const MONO = {
      ethylene: { vi: 'ethylene', en: 'ethylene', mono: 'CH₂=CH₂', f: { C: 2, H: 4 }, unit: '–CH₂–CH₂–', poly: '(–CH₂–CH₂–)ₙ', short: 'PE', polyVi: 'polyethylene', book: true },
      propylene: { vi: 'propylene', en: 'propylene', mono: 'CH₂=CH–CH₃', f: { C: 3, H: 6 }, unit: '–CH₂–CH(CH₃)–', poly: '(–CH₂–CH(CH₃)–)ₙ', short: 'PP', polyVi: 'polypropylene', book: true },
      vinyl: { vi: 'vinyl chloride', en: 'vinyl chloride', mono: 'CH₂=CHCl', f: { C: 2, H: 3, Cl: 1 }, unit: '–CH₂–CHCl–', poly: '(–CH₂–CHCl–)ₙ', short: 'PVC', polyVi: 'polyvinyl chloride', book: false }
    };
    const unitM = (k) => M(MONO[k].f), polyM = (k, n) => unitM(k) * n;
    const polymerise = (k, n, gMono) => ({ eq: 'n' + MONO[k].mono + ' → ' + MONO[k].poly, M: polyM(k, n), mass: gMono, massPoly: gMono, ok: true });
    const cond = (o) => !!(o && o.t && o.p && o.xt);                       // cần đủ t°, p, xúc tác
    /* ---- phân loại polymer thiên nhiên/tổng hợp ---- */
    const NAT = ['starch', 'cellulose', 'protein', 'rubber', 'silk', 'wool'], SYN = ['PE', 'PP', 'nylon', 'PVC'];
    const kind = (k) => (NAT.indexOf(k) >= 0 ? 'nat' : SYN.indexOf(k) >= 0 ? 'syn' : null);
    /* ---- cấu trúc mạch ---- */
    const chainType = (branch, cross) => (cross > 0 ? 'network' : branch > 0 ? 'branched' : 'linear');
    const CHAIN = { linear: 'amylose', branched: 'amylopectin, glycogen', network: 'nhựa bakelite, cao su lưu hoá' };
    /* ---- cao su: dãn theo lực, trở về; nhiệt độ ---- */
    const rubber = (force, temp) => ({ stretch: Math.round(100 * (1 - Math.exp(-force / 30))), returns: temp > -20 && temp < 80, state: temp >= 150 ? 'chảy (quá nóng)' : temp <= -20 ? 'giòn, cứng (quá lạnh)' : 'đàn hồi' });
    /* ---- 5R: mỗi vật có bin đúng (có thể nhiều đáp án chấp nhận được) ---- */
    const R5 = [
      ['bag', 'Túi nilon dùng một lần', 'Single-use plastic bag', ['refuse', 'reduce']],
      ['bottle', 'Chai nhựa đã dùng, sạch', 'Used clean plastic bottle', ['recycle']],
      ['straw', 'Ống hút nhựa', 'Plastic straw', ['refuse', 'reduce']],
      ['foam', 'Hộp xốp đựng thức ăn nhanh', 'Foam fast-food box', ['refuse']],
      ['cup', 'Cốc nhựa dùng một lần', 'Single-use plastic cup', ['refuse', 'reduce']],
      ['flask', 'Bình nước dùng nhiều lần', 'Reusable water bottle', ['reuse']],
      ['jar', 'Hũ nhựa còn tốt, đựng đồ khô', 'A good plastic jar kept for dry goods', ['reuse']],
      ['bag2', 'Túi vải mang đi chợ', 'Cloth shopping bag', ['reuse', 'reduce']],
      ['bio', 'Túi làm từ nguyên liệu phân huỷ sinh học', 'Bag made from biodegradable material', ['renew']],
      ['tech', 'Đổi công nghệ: vật liệu làm từ nguyên liệu tái tạo', 'Switch technology: material from renewable feedstock', ['renew']],
      ['bin', 'Gom, phân loại nhựa để đưa đi tái chế', 'Collect and sort plastic for recycling', ['recycle']],
      ['box', 'Hộp nhựa cũ biến thành chậu trồng cây', 'Old plastic box turned into a plant pot', ['reuse']]
    ];
    const bins = ['renew', 'refuse', 'reduce', 'reuse', 'recycle'];
    function sortScore(ans) { let ok = 0; R5.forEach((r) => { if (ans[r[0]] && r[3].indexOf(ans[r[0]]) >= 0) ok++; }); return { ok, total: R5.length }; }
    /* ---- vật liệu polymer (bảng phân loại) ---- */
    const MAT = {
      plastic: { vi: 'Chất dẻo', en: 'Plastic', ex: 'túi, hộp, chai (PE…)', why: 'dẻo: biến dạng khi chịu nhiệt, áp lực và giữ được hình khi thôi tác dụng' },
      fibre: { vi: 'Tơ', en: 'Fibre', ex: 'tơ tằm, len, nylon, polyester', why: 'mạch không phân nhánh, kéo được thành sợi' },
      rubber: { vi: 'Cao su', en: 'Rubber', ex: 'lốp xe, gioăng, áo lặn', why: 'đàn hồi: bị biến dạng khi có lực, trở lại hình cũ khi thôi lực' },
      composite: { vi: 'Composite', en: 'Composite', ex: 'gỗ nhựa composite, vỏ tàu', why: 'tổ hợp vật liệu cốt (sợi, hạt) và vật liệu nền (polymer)' }
    };
    function selfTest() {
      const T = [], add = (n, ok, got) => T.push({ name: n, ok: !!ok, got });
      const ga = peptide(['gly', 'ala']), ag = peptide(['ala', 'gly']);
      add('dipeptide Gly–Ala = C₅H₁₀N₂O₃, M = 146 = 75 + 89 − 18', ga.formula === 'C₅H₁₀N₂O₃' && ga.M === 146 && M(AA.gly.f) === 75 && M(AA.ala.f) === 89 && ga.sumAA - 18 === 146, ga.formula + ' ' + ga.M);
      add('Ala–Gly và Gly–Ala cùng công thức, M nhưng khác thứ tự; 1 amino acid: 0 liên kết', ag.M === ga.M && ag.name !== ga.name && peptide(['gly']).bonds === 0 && peptide(['gly']).M === 75, ag.name);
      add('số liên kết peptide = n − 1, nước tách ra = n − 1; thuỷ phân bảo toàn khối lượng', [2, 3, 5, 8].every((n) => { const s = []; for (let i = 0; i < n; i++) s.push(i % 2 ? 'ala' : 'gly'); const p = peptide(s), h = hydrolyse(s); return p.bonds === n - 1 && h.ok && h.water === n - 1; }), '');
      add('số cách xếp: 2 amino acid khác nhau → 2; 2 Gly + 1 Ala → 3; 3 Gly + 2 Ala → 10', arrangements({ gly: 1, ala: 1 }) === 2 && arrangements({ gly: 2, ala: 1 }) === 3 && arrangements({ gly: 3, ala: 2 }) === 10, '');
      add('lòng trắng trứng: HCl → đông tụ; hơ nhẹ → đông tụ; đun mạnh → khét; không làm gì → không đổi', egg({ hcl: 3 }).state === 'coag' && egg({ heat: 1 }).state === 'coag' && egg({ heat: 2 }).state === 'burnt' && egg({ heat: 2 }).smell && egg({}).state === 'clear', '');
      add('tơ tằm và len là protein (khét như tóc cháy); nylon thì không', FIBRE.silk.protein && FIBRE.wool.protein && !FIBRE.nylon.protein, '');
      add('M mắt xích: PE 28, PP 42, PVC 62,5; n = 1000: 28 000 và 42 000', unitM('ethylene') === 28 && unitM('propylene') === 42 && unitM('vinyl') === 62.5 && polyM('ethylene', 1000) === 28000 && polyM('propylene', 1000) === 42000, '');
      add('trùng hợp bảo toàn khối lượng: n·M monomer = M polymer; cần đủ t°, p, xt', ['ethylene', 'propylene', 'vinyl'].every((k) => near(unitM(k) * 250, polyM(k, 250), 1e-9)) && polymerise('ethylene', 1000, 28).massPoly === 28 && cond({ t: 1, p: 1, xt: 1 }) && !cond({ t: 1, p: 1 }), '');
      add('mạch: không nhánh / phân nhánh / mạng không gian', chainType(0, 0) === 'linear' && chainType(2, 0) === 'branched' && chainType(2, 1) === 'network' && chainType(0, 3) === 'network', '');
      add('phân loại: tinh bột, cellulose, protein, cao su thiên nhiên = thiên nhiên; PE, PP, nylon = tổng hợp', ['starch', 'cellulose', 'protein', 'rubber'].every((k) => kind(k) === 'nat') && ['PE', 'PP', 'nylon'].every((k) => kind(k) === 'syn'), '');
      add('5R: 12 vật dụng, mọi vật có ≥ 1 thùng đúng; chấm đúng hết = 12/12; không NaN', R5.length === 12 && R5.every((r) => r[3].length >= 1 && r[3].every((b) => bins.indexOf(b) >= 0)) && sortScore(R5.reduce((o, r) => { o[r[0]] = r[3][0]; return o; }, {})).ok === 12 && sortScore({}).ok === 0, '');
      add('cao su: lực lớn dãn nhiều, thôi lực trở lại; quá lạnh giòn, quá nóng chảy; không NaN', rubber(60, 25).stretch > rubber(10, 25).stretch && rubber(60, 25).returns && rubber(10, -40).state.indexOf('giòn') === 0 && rubber(10, 160).state.indexOf('chảy') === 0 && isFinite(rubber(0, 25).stretch), '');
      return T;
    }
    return { AA, MB, M, fm, sub, peptide, arrangements, hydrolyse, hydProgress, egg, FIBRE, MONO, unitM, polyM, polymerise, cond, NAT, SYN, kind, chainType, CHAIN, rubber, R5, bins, sortScore, MAT, selfTest };
  })();
  E.PRO = PRO;
  { const st = E.selfTest; E.selfTest = function () { return st().concat(PRO.selfTest()); }; }
})();
