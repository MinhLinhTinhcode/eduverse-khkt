/* ==========================================================================
   GEN LAB — engine di truyền Mendel (Bài 36–37; dùng lại cho Bài 39+). Không đụng DOM. Nạp SAU optics-lab.js, TRƯỚC các mol-w36/37/38.
   Gắn vào window.GenLab.engine:
     parse(str)      "AaBb" → {genes:[["A","a"],["B","b"]]} hoặc null nếu sai (không bao giờ ném lỗi, không treo)
     zyg(pair)       "hom-dom" | "het" | "hom-rec";  isPure(gt)
     gametes(gt)     danh sách giao tử (đa tập, 2^k mục) ; gametesDistinct(gt) → [{g, n}] ; combine(ga, gb)
     cross(p1, p2)   ô Punnett: {rows, cols, cells[r][c], geno:{kiểu gene:số ô}, pheno:{kiểu hình:số ô}, total}
     ratio(counts)   chuỗi tỉ lệ tối giản "3 : 1", "9 : 3 : 3 : 1"
     testCross(gt)   lai phân tích với cơ thể đồng hợp lặn;  infer(nDom, nRec)  suy kiểu gene từ đời con
     sample(p1,p2,n,seed)  mô phỏng ngẫu nhiên (PRNG có hạt giống → tái lập được)
     MENDEL          Bảng 37.1 và thí nghiệm hai tính trạng (556 hạt), tỉ lệ làm tròn 2 chữ số, số lượng lí thuyết
     TRAITS          cấu hình tính trạng (màu hoa, màu hạt, dạng hạt, chiều cao)
     blend(n)        mô hình "hoà trộn" (định tính, mở rộng) so với mô hình Mendel
     gametesCount(k), combosCount(k)   2^k, 4^k (đa dạng loài giao phối, mô hình đơn giản bỏ qua liên kết gene)
   CÁCH THÊM tính trạng mới: thêm một mục vào TRAITS {id, letter, dom:[vi,en], rec:[vi,en]} (letter: chữ cái in hoa, duy nhất trong một phép lai).
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab;
  if (!L || !L.engine) return;
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const MAXG = 4;                                                    // tối đa 4 cặp gene
  const TRAITS = [
    { id: 'flower', letter: 'A', dom: ['hoa tím', 'purple flower'], rec: ['hoa trắng', 'white flower'], name: ['màu hoa', 'flower colour'] },
    { id: 'seedcol', letter: 'A', dom: ['hạt vàng', 'yellow seed'], rec: ['hạt xanh', 'green seed'], name: ['màu hạt', 'seed colour'] },
    { id: 'seedshape', letter: 'B', dom: ['hạt trơn', 'smooth seed'], rec: ['hạt nhăn', 'wrinkled seed'], name: ['dạng hạt', 'seed shape'] },
    { id: 'height', letter: 'A', dom: ['thân cao', 'tall stem'], rec: ['thân thấp', 'short stem'], name: ['chiều cao cây', 'plant height'] }
  ];
  /* ------------------------------------------------------------ kiểu gene */
  function parse(s) {
    if (typeof s !== 'string') return null;
    s = s.replace(/\s+/g, '');
    if (!s || s.length % 2 || s.length > MAXG * 2 || !/^[A-Za-z]+$/.test(s)) return null;
    const genes = [], seen = {};
    for (let i = 0; i < s.length; i += 2) {
      const a = s[i], b = s[i + 1];
      if (a.toLowerCase() !== b.toLowerCase()) return null;
      const k = a.toLowerCase(); if (seen[k]) return null; seen[k] = 1;
      genes.push(a <= b ? [a, b] : [b, a]);                          // chữ hoa đứng trước (A < a theo mã ASCII)
    }
    return { genes };
  }
  const str = (gt) => gt.genes.map((p) => p[0] + p[1]).join('');
  const zyg = (p) => (p[0] !== p[1] ? 'het' : p[0] === p[0].toUpperCase() ? 'hom-dom' : 'hom-rec');
  const isPure = (gt) => gt.genes.every((p) => p[0] === p[1]);
  const lower = (gt) => ({ genes: gt.genes.map((p) => [p[0].toLowerCase(), p[0].toLowerCase()]) });
  /* ------------------------------------------------------------ giao tử */
  function gametes(gt) {                                             // đa tập 2^k (k = số gene), mỗi gene chọn 1 trong 2 allele
    let out = [''];
    gt.genes.forEach((p) => { const nx = []; out.forEach((g) => { nx.push(g + p[0]); nx.push(g + p[1]); }); out = nx; });
    return out;
  }
  function gametesDistinct(gt) {
    const m = {}, order = [];
    gametes(gt).forEach((g) => { if (!(g in m)) { m[g] = 0; order.push(g); } m[g]++; });
    return order.map((g) => ({ g, n: m[g] }));
  }
  function combine(ga, gb) {                                         // ghép giao tử đực và cái → kiểu gene (chữ hoa trước)
    let s = '';
    for (let i = 0; i < ga.length; i++) { const a = ga[i], b = gb[i]; s += a <= b ? a + b : b + a; }
    return s;
  }
  const phenoKey = (gt, traits) => gt.genes.map((p, i) => { const dom = p[0] === p[0].toUpperCase(); return dom ? 'D' : 'r'; }).join('');
  function phenoName(gt, traits) {                                   // traits: mảng cấu hình theo thứ tự gene
    return gt.genes.map((p, i) => { const t = traits && traits[i]; const dom = p[0] === p[0].toUpperCase(); return t ? (dom ? t.dom : t.rec) : [dom ? 'trội' : 'lặn', dom ? 'dominant' : 'recessive']; });
  }
  /* ------------------------------------------------------------ ô Punnett */
  function cross(a, b) {
    const p1 = typeof a === 'string' ? parse(a) : a, p2 = typeof b === 'string' ? parse(b) : b;
    if (!p1 || !p2 || p1.genes.length !== p2.genes.length) return null;
    for (let i = 0; i < p1.genes.length; i++) if (p1.genes[i][0].toLowerCase() !== p2.genes[i][0].toLowerCase()) return null;
    const rows = gametesDistinct(p1), cols = gametesDistinct(p2), geno = {}, pheno = {}, cells = [];
    let total = 0;
    rows.forEach((r) => { const line = []; cols.forEach((c) => { const g = combine(r.g, c.g), w = r.n * c.n, ph = phenoKey(parse(g)); line.push({ geno: g, pheno: ph, w }); geno[g] = (geno[g] || 0) + w; pheno[ph] = (pheno[ph] || 0) + w; total += w; }); cells.push(line); });
    return { rows, cols, cells, geno, pheno, total };
  }
  function ratio(counts) {
    const v = (Array.isArray(counts) ? counts : Object.keys(counts).map((k) => counts[k])).map((x) => Math.round(+x || 0)).filter((x) => x > 0).sort((a, b) => b - a);
    if (!v.length) return '';
    const g = v.reduce((x, y) => gcd(x, y));
    return v.map((x) => x / g).join(' : ');
  }
  /* ------------------------------------------------------------ lai phân tích */
  function testCross(gt) { const t = typeof gt === 'string' ? parse(gt) : gt; if (!t) return null; return cross(t, lower(t)); }
  function infer(nDom, nRec) {
    nDom = +nDom || 0; nRec = +nRec || 0;
    if (nDom + nRec <= 0) return { kind: 'none' };
    if (nRec > 0) return { kind: 'het', geno: 'Aa' };               // có kiểu hình lặn ở đời con ⇒ cây kiểm tra dị hợp
    return { kind: 'hom', geno: 'AA', sure: nDom >= 20 };           // toàn trội: đồng hợp (số con ít thì chỉ "có thể")
  }
  /* ------------------------------------------------------------ ngẫu nhiên có hạt giống */
  function prng(seed) { let a = (seed >>> 0) || 1; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function sample(a, b, n, seed) {
    const p1 = typeof a === 'string' ? parse(a) : a, p2 = typeof b === 'string' ? parse(b) : b, X = cross(p1, p2);
    if (!X) return null;
    n = Math.max(0, Math.min(200000, Math.floor(+n || 0)));
    const r = prng(seed == null ? 1 : seed), geno = {}, pheno = {};
    for (let i = 0; i < n; i++) {
      let s = '';
      p1.genes.forEach((p, k) => { const x = p[r() < 0.5 ? 0 : 1], y = p2.genes[k][r() < 0.5 ? 0 : 1]; s += x <= y ? x + y : y + x; });
      geno[s] = (geno[s] || 0) + 1; const ph = phenoKey(parse(s)); pheno[ph] = (pheno[ph] || 0) + 1;
    }
    return { n, geno, pheno, theory: X };
  }
  /* ------------------------------------------------------------ số liệu Mendel (đọc từ bảng trong sách; cần đối chiếu sách in) */
  const T371 = [
    { id: 'seedshape', P: ['trơn × nhăn', 'smooth × wrinkled'], dom: 5474, rec: 1850, ratio: 2.96, names: [['hạt trơn', 'smooth'], ['hạt nhăn', 'wrinkled']] },
    { id: 'seedcol', P: ['vàng × xanh', 'yellow × green'], dom: 6022, rec: 2001, ratio: 3.01, names: [['hạt vàng', 'yellow'], ['hạt xanh', 'green']] },
    { id: 'height', P: ['cao × thấp', 'tall × short'], dom: 787, rec: 277, ratio: 2.84, names: [['thân cao', 'tall'], ['thân thấp', 'short']] },
    { id: 'flower', P: ['tím × trắng', 'purple × white'], dom: 705, rec: 224, ratio: 3.15, names: [['hoa tím', 'purple'], ['hoa trắng', 'white']] }
  ];
  const DI = { yt: 315, yn: 108, xt: 101, xn: 32 };                   // vàng trơn, vàng nhăn, xanh trơn, xanh nhăn
  const r2 = (x) => Math.round(x * 100) / 100;
  const MENDEL = {
    T371,
    DI,
    ratio2: (dom, rec) => (rec > 0 ? r2(dom / rec) : 0),
    totalDi: () => DI.yt + DI.yn + DI.xt + DI.xn,                     // 556
    theoryDi: (n) => [9, 3, 3, 1].map((k) => (k / 16) * n),            // 312,75 ; 104,25 ; 104,25 ; 34,75 với n = 556
    perTrait: () => ({ yel: DI.yt + DI.yn, gre: DI.xt + DI.xn, smo: DI.yt + DI.xt, wri: DI.yn + DI.xn }),
    scaled: () => [DI.yt, DI.yn, DI.xt, DI.xn].map((x) => x / DI.xn)  // ≈ 9,84 : 3,38 : 3,16 : 1
  };
  /* ------------------------------------------------------------ mô hình hoà trộn (định tính, mở rộng) */
  function blend(n) {                                                // sau mỗi thế hệ, độ chênh giữa các cây giảm một nửa và màu dồn về trung bình
    n = Math.max(0, Math.min(12, Math.floor(+n || 0)));
    const out = [];
    for (let g = 0; g <= n; g++) { const spread = g === 0 ? 1 : Math.pow(0.5, g); out.push({ gen: g, lo: 0.5 - spread / 2, hi: 0.5 + spread / 2 }); }
    return out;
  }
  const gametesCount = (k) => Math.pow(2, Math.max(0, Math.min(30, Math.floor(+k) || 0)));
  const combosCount = (k) => Math.pow(4, Math.max(0, Math.min(15, Math.floor(+k) || 0)));
  /* ------------------------------------------------------------ kiểm thử */
  function selfTestG() {
    const T = [], add = (n, ok, got) => T.push({ name: n, ok: !!ok, got }), E = GL;
    const near = (a, b, e) => Math.abs(a - b) <= e;
    add('AA × aa → 100% Aa, kiểu hình 100% trội', (() => { const x = E.cross('AA', 'aa'); return x.total === 4 && x.geno.Aa === 4 && x.pheno.D === 4 && E.ratio(x.pheno) === '1'; })(), '');
    add('Aa × Aa → 1 AA : 2 Aa : 1 aa, kiểu hình 3 : 1, đúng 4 ô', (() => { const x = E.cross('Aa', 'Aa'); return x.total === 4 && x.geno.AA === 1 && x.geno.Aa === 2 && x.geno.aa === 1 && E.ratio(x.pheno) === '3 : 1' && E.ratio(x.geno) === '2 : 1 : 1'; })(), '');
    add('AaBb × AaBb → 16 ô, kiểu hình 9 : 3 : 3 : 1, 9 loại kiểu gene tỉ lệ 1:2:1:2:4:2:1:2:1', (() => { const x = E.cross('AaBb', 'AaBb'); const v = Object.keys(x.geno).map((k) => x.geno[k]).sort((a, b) => a - b).join(','); return x.total === 16 && Object.keys(x.geno).length === 9 && E.ratio(x.pheno) === '9 : 3 : 3 : 1' && v === '1,1,1,1,2,2,2,2,4' && x.rows.length === 4 && x.cols.length === 4; })(), '');
    add('AaBb cho 4 loại giao tử AB, Ab, aB, ab (tỉ lệ bằng nhau); AABb chỉ 2 loại', (() => { const a = E.gametesDistinct(E.parse('AaBb')).map((o) => o.g).sort().join(','), b = E.gametesDistinct(E.parse('AABb')).map((o) => o.g).sort().join(','); return a === 'AB,Ab,aB,ab' && b === 'AB,Ab' && E.gametesDistinct(E.parse('AaBb')).every((o) => o.n === 1); })(), '');
    add('lai phân tích: Aa × aa → 1 : 1; AA × aa → 100%; AaBb × aabb → 1 : 1 : 1 : 1', (() => { const a = E.testCross('Aa'), b = E.testCross('AA'), c = E.testCross('AaBb'); return E.ratio(a.pheno) === '1 : 1' && E.ratio(b.pheno) === '1' && E.ratio(c.pheno) === '1 : 1 : 1 : 1' && a.total === 4; })(), '');
    add('suy kiểu gene từ lai phân tích: 100% trội ⇒ đồng hợp; có lặn ⇒ dị hợp; 0 con ⇒ chưa kết luận', E.infer(20, 0).kind === 'hom' && E.infer(5, 5).kind === 'het' && E.infer(0, 0).kind === 'none' && E.infer(3, 0).sure === false, '');
    add('Bảng 37.1: tỉ lệ làm tròn 2 chữ số khớp bảng sách 2,96 / 3,01 / 2,84 / 3,15', E.MENDEL.T371.every((r) => near(E.MENDEL.ratio2(r.dom, r.rec), r.ratio, 1e-9)), E.MENDEL.T371.map((r) => E.MENDEL.ratio2(r.dom, r.rec)).join(' '));
    add('hai tính trạng: tổng 556 hạt; vàng : xanh = 423 : 133 ≈ 3,18; trơn : nhăn = 416 : 140 ≈ 2,97; lí thuyết 312,75 / 104,25 / 104,25 / 34,75', (() => { const p = E.MENDEL.perTrait(), t = E.MENDEL.theoryDi(556); return E.MENDEL.totalDi() === 556 && p.yel === 423 && p.gre === 133 && p.smo === 416 && p.wri === 140 && near(E.MENDEL.ratio2(p.yel, p.gre), 3.18, 1e-9) && near(E.MENDEL.ratio2(p.smo, p.wri), 2.97, 1e-9) && near(t[0], 312.75, 1e-9) && near(t[1], 104.25, 1e-9) && near(t[3], 34.75, 1e-9); })(), '');
    add('tỉ lệ thực nghiệm chia cho 32 ≈ 9,84 : 3,38 : 3,16 : 1', (() => { const s = E.MENDEL.scaled().map((x) => r2(x)); return s[0] === 9.84 && s[1] === 3.38 && s[2] === 3.16 && s[3] === 1; })(), '');
    add('chuỗi sai không treo, không ném lỗi: Aab, A, ABab, "", 123, null, quá dài → null', ['Aab', 'A', 'ABab', '', '123', null, undefined, 'AaBbCcDdEe', 'Aa Aa', {}, 5].every((s) => E.parse(s) === null), '');
    add('parse chuẩn hoá: aA → Aa; "Aa Bb" → AaBb; zyg đúng', (() => { const g = E.parse('aABb'); return g && E.str(g) === 'AaBb' && E.zyg(['A', 'A']) === 'hom-dom' && E.zyg(['A', 'a']) === 'het' && E.zyg(['a', 'a']) === 'hom-rec' && E.isPure(E.parse('AAbb')) && !E.isPure(g); })(), '');
    add('cross từ hai gene khác nhau hoặc khác số gene → null (không NaN)', E.cross('Aa', 'Bb') === null && E.cross('Aa', 'AaBb') === null && E.cross('xx', 'Aa') === null, '');
    add('mô phỏng có hạt giống: cùng hạt giống cho cùng kết quả; hạt giống khác cho kết quả khác; tổng bằng n', (() => { const a = E.sample('Aa', 'Aa', 1000, 5), b = E.sample('Aa', 'Aa', 1000, 5), c = E.sample('Aa', 'Aa', 1000, 6); return JSON.stringify(a.geno) === JSON.stringify(b.geno) && JSON.stringify(a.geno) !== JSON.stringify(c.geno) && a.n === 1000 && Object.keys(a.geno).reduce((s, k) => s + a.geno[k], 0) === 1000; })(), '');
    add('định luật số lớn (định tính): n = 8000 tỉ lệ trội : lặn gần 3 : 1 hơn so với n = 8 (trung bình nhiều hạt giống)', (() => { const dev = (n) => { let s = 0; for (let k = 1; k <= 30; k++) { const x = E.sample('Aa', 'Aa', n, k * 7 + 1), d = x.pheno.D || 0, r = x.pheno.r || 0; s += Math.abs(d / Math.max(1, d + r) - 0.75); } return s / 30; }; return dev(8000) < dev(8) && dev(8000) < 0.02; })(), '');
    add('mô phỏng AaBb × AaBb với 16 000 con: 9 : 3 : 3 : 1 trong sai số 1,2 điểm phần trăm', (() => { const x = E.sample('AaBb', 'AaBb', 16000, 3), exp = { DD: 9, Dr: 3, rD: 3, rr: 1 }; return Object.keys(exp).every((k) => Math.abs((x.pheno[k] || 0) / 16000 - exp[k] / 16) < 0.012); })(), '');
    add('đa dạng giao phối: 2^n giao tử, 4^n tổ hợp: n = 1 → 2/4; n = 2 → 4/16; n = 3 → 8/64; n = 10 → 1024 / 1048576', E.gametesCount(1) === 2 && E.combosCount(1) === 4 && E.gametesCount(2) === 4 && E.combosCount(2) === 16 && E.gametesCount(3) === 8 && E.combosCount(3) === 64 && E.gametesCount(10) === 1024 && E.combosCount(10) === 1048576, '');
    add('mô hình hoà trộn: độ chênh giảm dần và màu dồn về giữa; số thế hệ cực đoan không NaN', (() => { const b = E.blend(5); return b[0].lo === 0 && b[0].hi === 1 && b[5].hi - b[5].lo < b[1].hi - b[1].lo && E.blend(-3).length === 1 && E.blend(1e9).length === 13 && E.blend('x').length === 1; })(), '');
    return T;
  }
  const GL = window.GenLab = { engine: { parse, str, zyg, isPure, lower, gametes, gametesDistinct, combine, phenoKey, phenoName, cross, ratio, testCross, infer, sample, prng, MENDEL, TRAITS, blend, gametesCount, combosCount, selfTestG } };
  GL.selfTestG = selfTestG;
  { const prev = L.engine.selfTest; L.engine.selfTest = function () { return prev().concat(selfTestG()); }; }
  Object.keys(GL.engine).forEach((k) => { GL[k] = GL.engine[k]; });
})();
