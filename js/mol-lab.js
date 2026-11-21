/* ==========================================================================
   MOL LAB — KHTN 9, Chương VII (hoá hữu cơ). Nạp SAU chem-industry.js. Dùng lại cho Bài 25 trở đi.
   1. ENGINE `MolLab.engine` (dữ liệu thuần, không đụng DOM, chạy được cả trong Node; selfTest nối vào OpticsLab.engine.selfTest)
        Đồ thị phân tử: g = { atoms:[{el,x?,y?}], bonds:[{a,b,o}] }   (o = 1 đơn, 2 đôi, 3 ba; H là nguyên tử thật)
        fromSmiles(s)         — dựng đồ thị từ chuỗi kiểu SMILES (C N O S Cl Br, '=' '#', nhánh (), vòng 1–9), tự bù H
        valence(g)            — trạng thái từng nguyên tử: ok / lack (thiếu liên kết) / over (thừa)
        formula(g)            — công thức phân tử theo quy ước Hill (C, H, rồi theo thứ tự chữ cái) → {plain, uni, counts}
        mass(g)               — khối lượng mol theo số liệu sách (H 1, C 12, N 14, O 16, S 32, Cl 35,5, Br 80)
        stats(g)              — liên thông, số liên kết đôi/ba, số vòng
        canon(g)              — dạng chuẩn hoá (đồng phân = cùng công thức phân tử, khác dạng chuẩn); same(g1,g2)
        isomers(counts, cap)  — liệt kê đồng phân cấu tạo (không tính đồng phân hình học); có ngưỡng an toàn
        classify(g)           — hữu cơ/vô cơ, hydrocarbon/dẫn xuất, mạch hở/vòng, no/không no, alkane/alkene (theo CẤU TRÚC)
        organicFormula(str)   — hữu cơ hay vô cơ theo công thức phân tử (loại CO, CO₂, H₂CO₃, muối carbonate, HCN…)
        nameOf(g)             — tên: alkane C1–C4 (sách), isobutane (ngoài yêu cầu sách), một số chất của bài; null nếu không biết
        condensed(g)          — công thức cấu tạo thu gọn dạng chữ (CH₃–CH(CH₃)–CH₃)
        drawFull(g)           — công thức cấu tạo đầy đủ dạng chuỗi SVG (do engine tự dựng)
        layout(g)             — đặt toạ độ nguyên tử cho bàn lắp ghép
   2. GIAO DIỆN `MolLab.board(body, cfg)` — bàn lắp ghép phân tử kéo thả (chuột/cảm ứng/bàn phím), dùng cho mọi widget.
   CÁCH THÊM NGUYÊN TỬ / NHÓM CHỨC MỚI (Bài 25+): thêm vào VAL và MASS (và màu CLR); thêm chất mới vào KNOWN (tên + SMILES) để nameOf
   nhận ra; nhóm chức mới (–COOH, –OH, –NH₂…) thêm vào hàm `group()` của condensed(). Phản ứng hữu cơ mới: xem khối ORG trong chem-lab.js.
   ========================================================================== */
(function () {
  'use strict';
  const root = typeof window !== 'undefined' ? window : globalThis;
  /* ----------------------------------------------------------------- ENGINE */
  const VAL = { C: 4, H: 1, O: 2, N: 3, Cl: 1, Br: 1, S: 2 };
  const MASS = { H: 1, C: 12, N: 14, O: 16, S: 32, Cl: 35.5, Br: 80 };
  const SUB = '₀₁₂₃₄₅₆₇₈₉';
  const sub = (n) => String(n).replace(/\d/g, (d) => SUB[+d]);
  const ORDER = ['C', 'N', 'O', 'S', 'Cl', 'Br'];
  const mk = () => ({ atoms: [], bonds: [] });
  const clone = (g) => ({ atoms: g.atoms.map((a) => Object.assign({}, a)), bonds: g.bonds.map((b) => Object.assign({}, b)) });
  const nbrs = (g, i) => { const r = []; g.bonds.forEach((b) => { if (b.a === i) r.push({ j: b.b, o: b.o }); else if (b.b === i) r.push({ j: b.a, o: b.o }); }); return r; };
  const deg = (g, i) => nbrs(g, i).reduce((s, n) => s + n.o, 0);
  function valence(g) {
    return g.atoms.map((a, i) => { const v = VAL[a.el] || 0, d = deg(g, i); return d === v ? 'ok' : d < v ? 'lack' : 'over'; });
  }
  function counts(g) { const c = {}; g.atoms.forEach((a) => (c[a.el] = (c[a.el] || 0) + 1)); return c; }
  function hill(c) {
    const ks = Object.keys(c).filter((k) => c[k] > 0), first = c.C ? ['C', 'H'].filter((k) => c[k]) : [];
    const rest = ks.filter((k) => first.indexOf(k) < 0).sort();
    const all = first.concat(rest);
    return { plain: all.map((k) => k + (c[k] > 1 ? c[k] : '')).join(''), uni: all.map((k) => k + (c[k] > 1 ? sub(c[k]) : '')).join(''), counts: c };
  }
  const formula = (g) => hill(counts(g));
  const mass = (g) => g.atoms.reduce((s, a) => s + (MASS[a.el] || 0), 0);
  function components(g) {
    const n = g.atoms.length, seen = new Array(n).fill(false); let k = 0;
    for (let s = 0; s < n; s++) { if (seen[s]) continue; k++; const st = [s]; seen[s] = true; while (st.length) { const v = st.pop(); nbrs(g, v).forEach((x) => { if (!seen[x.j]) { seen[x.j] = true; st.push(x.j); } }); } }
    return k;
  }
  function stats(g) {
    const n = g.atoms.length, comp = n ? components(g) : 0;
    return { connected: n > 0 && comp === 1, comps: comp, doubles: g.bonds.filter((b) => b.o === 2).length, triples: g.bonds.filter((b) => b.o === 3).length, rings: Math.max(0, g.bonds.length - n + comp) };
  }
  /* ---- chuỗi kiểu SMILES → đồ thị (bù H theo hoá trị) */
  function fromSmiles(s) {
    const g = mk(), st = [], ring = {}; let prev = -1, order = 1, i = 0;
    const add = (el) => { g.atoms.push({ el }); const k = g.atoms.length - 1; if (prev >= 0) g.bonds.push({ a: prev, b: k, o: order }); order = 1; prev = k; };
    while (i < s.length) {
      const ch = s[i];
      if (ch === '(') { st.push(prev); i++; } else if (ch === ')') { prev = st.pop(); i++; }
      else if (ch === '=') { order = 2; i++; } else if (ch === '#') { order = 3; i++; } else if (ch === '-') { i++; }
      else if (/\d/.test(ch)) { if (ring[ch] !== undefined) { g.bonds.push({ a: ring[ch], b: prev, o: order }); order = 1; delete ring[ch]; } else ring[ch] = prev; i++; }
      else if (s.substr(i, 2) === 'Cl' || s.substr(i, 2) === 'Br') { add(s.substr(i, 2)); i += 2; }
      else { add(ch); i++; }
    }
    const heavy = g.atoms.length;
    for (let a = 0; a < heavy; a++) { const need = (VAL[g.atoms[a].el] || 0) - deg(g, a); for (let k = 0; k < need; k++) { g.atoms.push({ el: 'H' }); g.bonds.push({ a, b: g.atoms.length - 1, o: 1 }); } }
    return g;
  }
  /* ---- đồ thị nguyên tử nặng (bỏ H) */
  function heavyOf(g) {
    const idx = [], map = {}; g.atoms.forEach((a, i) => { if (a.el !== 'H') { map[i] = idx.length; idx.push(i); } });
    const n = idx.length, A = []; for (let i = 0; i < n; i++) A.push(new Array(n).fill(0));
    g.bonds.forEach((b) => { if (map[b.a] !== undefined && map[b.b] !== undefined) { A[map[b.a]][map[b.b]] = b.o; A[map[b.b]][map[b.a]] = b.o; } });
    return { idx, el: idx.map((i) => g.atoms[i].el), A, n };
  }
  function canonHeavy(el, A) {
    const n = el.length; let budget = 4000, best = null;
    const rank = (sigs) => { const u = Array.from(new Set(sigs)).sort(); return sigs.map((s) => u.indexOf(s)); };
    function refine(col) {
      let cur = col, cnt = new Set(cur).size;
      for (let it = 0; it < n + 2; it++) {
        const sigs = cur.map((c, i) => { const parts = []; for (let j = 0; j < n; j++) if (A[i][j]) parts.push(A[i][j] + ':' + String(cur[j]).padStart(4, '0')); return String(c).padStart(4, '0') + '|' + parts.sort().join(','); });
        const nx = rank(sigs), c2 = new Set(nx).size; cur = nx; if (c2 === cnt) break; cnt = c2;
      }
      return cur;
    }
    function leaf(col) {
      const ord = col.map((c, i) => [c, i]).sort((x, y) => x[0] - y[0]).map((x) => x[1]);
      let s = ord.map((i) => el[i]).join(',') + '|'; for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) s += A[ord[a]][ord[b]];
      return s;
    }
    function search(col) {
      const cls = {}; col.forEach((c, i) => (cls[c] = (cls[c] || []).concat(i)));
      const multi = Object.keys(cls).map(Number).sort((a, b) => a - b).find((k) => cls[k].length > 1);
      if (multi === undefined) { const s = leaf(col); if (best === null || s < best) best = s; return; }
      for (const v of cls[multi]) { if (budget-- <= 0) return; search(refine(col.map((c, i) => c * 2 + (i === v ? 0 : 1)))); }
    }
    if (!n) return '';
    search(refine(rank(el.map((e, i) => e + '#' + A[i].filter(Boolean).length))));
    return best === null ? el.join(',') : best;
  }
  const canon = (g) => { const h = heavyOf(g); return canonHeavy(h.el, h.A); };
  const same = (a, b) => formula(a).plain === formula(b).plain && canon(a) === canon(b);
  /* ---- liệt kê đồng phân cấu tạo từ số nguyên tử mỗi nguyên tố */
  function isomers(cnt, cap) {
    const els = []; ORDER.forEach((e) => { for (let k = 0; k < (cnt[e] || 0); k++) els.push(e); });
    const n = els.length, H = cnt.H || 0; let nodes = 0, truncated = false;
    cap = cap || 300000;
    if (!n || n > 9) return { list: [], truncated: n > 9, keys: [] };
    const sv = els.reduce((s, e) => s + VAL[e], 0), twoB = sv - H;
    if (twoB < 0 || twoB % 2) return { list: [], truncated: false, keys: [] };
    const B = twoB / 2, pairs = []; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) pairs.push([i, j]);
    const cap0 = els.map((e) => VAL[e]), A = []; for (let i = 0; i < n; i++) A.push(new Array(n).fill(0));
    const seen = {}, list = [], keys = [];
    function done() {
      const q = [0], v = new Set([0]); while (q.length) { const x = q.pop(); for (let y = 0; y < n; y++) if (A[x][y] && !v.has(y)) { v.add(y); q.push(y); } }
      if (v.size !== n) return;
      const k = canonHeavy(els, A); if (seen[k]) return; seen[k] = 1; keys.push(k);
      const g = mk(); els.forEach((e) => g.atoms.push({ el: e }));
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (A[i][j]) g.bonds.push({ a: i, b: j, o: A[i][j] });
      for (let i = 0; i < n; i++) { const need = cap0[i] - deg(g, i); for (let t = 0; t < need; t++) { g.atoms.push({ el: 'H' }); g.bonds.push({ a: i, b: g.atoms.length - 1, o: 1 }); } }
      list.push(g);
    }
    const left = cap0.slice();
    (function rec(p, rem) {
      if (truncated) return; if (++nodes > cap) { truncated = true; return; }
      if (rem === 0) { done(); return; }
      if (p >= pairs.length) return;
      const [i, j] = pairs[p];
      for (const o of [1, 0, 2, 3]) {
        if (o > rem || o > left[i] || o > left[j]) continue;
        A[i][j] = A[j][i] = o; left[i] -= o; left[j] -= o;
        rec(p + 1, rem - o);
        left[i] += o; left[j] += o; A[i][j] = A[j][i] = 0;
      }
    })(0, B);
    return { list, truncated, keys };
  }
  /* ---- phân loại */
  const INORG_C = /^(CO|CO2|CS2|HCN|H2CO3)$|CO3|CN$|^CaC2$|^Al4C3$|^SiC$/;
  function parseF(str) { const c = {}; String(str).replace(/([A-Z][a-z]?)(\d*)/g, (m, e, n) => { c[e] = (c[e] || 0) + (n ? +n : 1); return ''; }); return c; }
  function organicFormula(str) {
    const plain = String(str).replace(/[₀-₉]/g, (d) => SUB.indexOf(d)).replace(/\s/g, '');
    const c = parseF(plain.replace(/[()]/g, '')); if (!c.C) return false;
    return !INORG_C.test(plain);
  }
  function classify(g) {
    const c = counts(g), has = (e) => !!c[e], f = formula(g).plain, st = stats(g);
    const onlyO = g.atoms.every((a, i) => a.el !== 'C' || nbrs(g, i).every((x) => g.atoms[x.j].el === 'O'));
    const organic = has('C') && !onlyO && f !== 'CHN' && !INORG_C.test(f);
    const hydro = organic && Object.keys(c).every((e) => e === 'C' || e === 'H');
    const hv = heavyOf(g), cc = []; // liên kết giữa các C
    g.bonds.forEach((b) => { if (g.atoms[b.a].el === 'C' && g.atoms[b.b].el === 'C') cc.push(b.o); });
    const open = st.rings === 0, saturated = g.bonds.every((b) => b.o === 1);
    const doubleCC = cc.filter((o) => o === 2).length;
    const alkane = hydro && open && saturated && st.connected;
    const alkene = hydro && open && st.connected && doubleCC === 1 && st.doubles === 1 && st.triples === 0;
    return { organic, inorganic: !organic, hydrocarbon: hydro, derivative: organic && !hydro, open, ring: !open, saturated, alkane, alkene, connected: st.connected, nC: c.C || 0, hv: hv.n };
  }
  /* ---- tên */
  const KNOWN = [
    ['methane', 'methane', 'C'], ['ethane', 'ethane', 'CC'], ['propane', 'propane', 'CCC'], ['butane', 'butane', 'CCCC'],
    ['isobutane', 'isobutane (2-methylpropane)', 'CC(C)C'], ['ethylene', 'ethylene (ethene)', 'C=C'], ['propylene', 'propylene (propene)', 'C=CC'],
    ['but-2-ene', 'but-2-ene', 'CC=CC'], ['but-1-ene', 'but-1-ene', 'C=CCC'], ['isobutylene', 'isobutylene (2-methylpropene)', 'C=C(C)C'],
    ['butadiene', 'buta-1,3-diene', 'C=CC=C'], ['cyclopropane', 'cyclopropane', 'C1CC1'], ['cyclobutane', 'cyclobutane', 'C1CCC1'], ['methylcyclopropane', 'methylcyclopropane', 'CC1CC1'],
    ['ethanol', 'ethylic alcohol (ethanol)', 'CCO'], ['methanol', 'methanol', 'CO'], ['dimethyl ether', 'dimethyl ether', 'COC'], ['acetic acid', 'acetic acid', 'CC(=O)O'],
    ['methyl chloride', 'methyl chloride (chloromethane)', 'CCl'], ['methylamine', 'methylamine', 'CN'], ['ethyl acetate', 'ethyl acetate', 'CC(=O)OCC'], ['urea', 'urea', 'NC(=O)N'],
    ['benzene', 'benzene', 'C1=CC=CC=C1'], ['propyl acetate', 'propyl acetate', 'CC(=O)OCCC'], ['glycerol', 'glycerol (propane-1,2,3-triol)', 'OCC(O)CO'], ['triacetin', 'triacetin (triester của glycerol)', 'CC(=O)OCC(OC(C)=O)COC(C)=O'], ['glucose (mạch hở)', 'glucose (open chain)', 'OCC(O)C(O)C(O)C(O)C=O'], ['formic acid', 'formic acid (HCOOH)', 'OC=O'], ['acetaldehyde', 'acetaldehyde (CH₃CHO)', 'CC=O'], ['propanol', 'propan-1-ol', 'CCCO'], ['dibromoethane', '1,2-dibromoethane', 'BrCCBr'], ['dibromopropane', '1,2-dibromopropane', 'CC(Br)CBr']
  ];
  const KNAME = {}; KNOWN.forEach((k) => { const g = fromSmiles(k[2]); KNAME[formula(g).plain + '/' + canon(g)] = k[1]; });
  const PREFIX = ['', 'meth', 'eth', 'prop', 'but', 'pent', 'hex', 'hept', 'oct', 'non', 'dec'];
  function nameOf(g) {
    if (!g.atoms.length || !stats(g).connected) return null;
    const k = formula(g).plain + '/' + canon(g); if (KNAME[k]) return KNAME[k];
    const cl = classify(g);
    if (cl.alkane && cl.nC >= 5 && cl.nC <= 10) { const hv = heavyOf(g); let ok = true; for (let i = 0; i < hv.n; i++) if (hv.A[i].filter(Boolean).length > 2) ok = false; if (ok) return PREFIX[cl.nC] + 'ane'; }
    return null;
  }
  const BOOK_NAMES = { methane: 1, ethane: 1, propane: 1, butane: 1 };
  const outOfBook = (nm) => !!nm && !BOOK_NAMES[nm] && !/^(ethylene|propylene|cyclopropane|ethylic|dimethyl|acetic|methyl chloride|urea|methanol|benzene)/.test(nm);
  /* ---- công thức thu gọn dạng chữ */
  function condensed(g) {
    const hv = heavyOf(g), n = hv.n, st = stats(g); if (!n) return '';
    const hOf = (i) => nbrs(g, hv.idx[i]).filter((x) => g.atoms[x.j].el === 'H').length;
    if (st.rings > 0) {
      if (st.rings === 1 && hv.el.every((e) => e === 'C') && hv.el.length === g.bonds.filter((b) => g.atoms[b.a].el !== 'H' && g.atoms[b.b].el !== 'H').length && hv.A.every((r, i) => hOf(i) === 2)) return '(CH' + sub(2) + ')' + sub(n);
      return formula(g).uni + ' (mạch vòng)';
    }
    const adj = hv.A.map((r) => r.map((o, j) => (o ? j : -1)).filter((j) => j >= 0));
    const halo = (i) => (hv.el[i] === 'C' ? adj[i].filter((j) => (hv.el[j] === 'Cl' || hv.el[j] === 'Br') && adj[j].length === 1) : []);
    const lab = (i) => { const e = hv.el[i], h = hOf(i); if (e === 'C') { const hl = halo(i).map((j) => hv.el[j]); const hs = {}; hl.forEach((x) => (hs[x] = (hs[x] || 0) + 1)); return 'C' + (h ? 'H' + (h > 1 ? sub(h) : '') : '') + Object.keys(hs).map((x) => x + (hs[x] > 1 ? sub(hs[x]) : '')).join(''); } return (h ? e + 'H' + (h > 1 ? sub(h) : '') : e); };
    const leafGroup = (i, from) => { // nhóm lá viết gọn
      const e = hv.el[i]; if (adj[i].length !== 1) return null;
      if (e === 'O' && hOf(i) === 1) return 'OH'; if (e === 'N' && hOf(i) === 2) return 'NH' + sub(2); if (e === 'Cl' || e === 'Br') return e;
      return null;
    };
    const cooh = (i) => { if (hv.el[i] !== 'C') return false; const l = adj[i].filter((j) => adj[j].length === 1); const dbl = l.find((j) => hv.el[j] === 'O' && hv.A[i][j] === 2), oh = l.find((j) => hv.el[j] === 'O' && hv.A[i][j] === 1 && hOf(j) === 1); return dbl !== undefined && oh !== undefined && adj[i].length === 3 && hOf(i) === 0 ? [dbl, oh] : false; };
    const hidden = new Set(); for (let i = 0; i < n; i++) { const c = cooh(i); if (c) { hidden.add(c[0]); hidden.add(c[1]); } halo(i).forEach((j) => { if (n > 2 || hv.el[i] === 'C') hidden.add(j); }); }
    const kids = (v, p) => adj[v].filter((j) => j !== p && !hidden.has(j));
    const depth = (v, p) => { let d = 0; kids(v, p).forEach((j) => { d = Math.max(d, 1 + depth(j, v)); }); return d; };
    // đầu mạch chính: đầu xa nhất của đường dài nhất
    let far = (s) => { let best = [s, 0]; (function dfs(v, p, d) { if (d > best[1]) best = [v, d]; kids(v, p).forEach((j) => dfs(j, v, d + 1)); })(s, -1, 0); return best[0]; };
    const vis = [...Array(n).keys()].filter((i) => !hidden.has(i)); let a0 = far(vis[0]), a1 = far(a0);
    const bad = (i) => (hv.el[i] === 'O' && adj[i].length === 1 && hv.A[i][adj[i][0]] === 2) || !!leafGroup(i);
    let rootV = bad(a1) && !bad(a0) ? a0 : a1; if (bad(rootV) && !bad(a1)) rootV = a1;
    function str(v, p, o) {
      const sep = (x) => (x === 2 ? '=' : x === 3 ? '≡' : '–');
      let txt = cooh(v) ? 'COOH' : (leafGroup(v) && p >= 0 ? leafGroup(v) : lab(v));
      const ch = kids(v, p).sort((x, y) => depth(y, v) - depth(x, v) || (leafGroup(x) ? 1 : 0) - (leafGroup(y) ? 1 : 0));
      if (!ch.length) return txt;
      const main = ch[0], br = ch.slice(1);
      br.forEach((j) => { txt += '(' + (hv.A[v][j] === 2 ? '=' : hv.A[v][j] === 3 ? '≡' : '') + str(j, v) + ')'; });
      return txt + sep(hv.A[v][main]) + str(main, v);
    }
    return str(rootV, -1);
  }
  /* ---- bố cục & vẽ */
  const DIRS = [[1, 0], [0, -1], [0, 1], [-1, 0]];
  function layout(g) { // toạ độ lưới (đơn vị = một liên kết); trả về mảng {x,y}
    const n = g.atoms.length, pos = new Array(n).fill(null), hv = heavyOf(g), st = stats(g);
    if (!hv.n) { g.atoms.forEach((a, i) => (pos[i] = { x: i * 1.5, y: 0 })); return pos; }
    const HN = (i) => nbrs(g, i);
    if (st.rings === 1 && st.connected) { // vòng đơn: đa giác đều + nhóm thế hướng ra ngoài
      const seen = new Set(), ringAt = {}; // tìm vòng bằng cách bóc dần lá
      const alive = new Set(hv.idx), dg = (i) => HN(i).filter((x) => alive.has(x.j)).length;
      let ch = true; while (ch) { ch = false; Array.from(alive).forEach((i) => { if (dg(i) <= 1) { alive.delete(i); ch = true; } }); }
      const start = Array.from(alive)[0], order = [start]; let prev = -1, cur = start;
      while (true) { const nx = HN(cur).filter((x) => alive.has(x.j) && x.j !== prev && order.indexOf(x.j) < 0)[0]; if (!nx) break; order.push(nx.j); prev = cur; cur = nx.j; }
      const k = order.length, R = 0.5 / Math.sin(Math.PI / k) * 1.0;
      order.forEach((v, t) => { const ang = -Math.PI / 2 + (2 * Math.PI * t) / k; pos[v] = { x: R * Math.cos(ang), y: R * Math.sin(ang), ang }; });
      const place = (v, ang) => { // trải các nhánh quanh hướng ra ngoài
        const todo = HN(v).filter((x) => !pos[x.j]); const m = todo.length; const spread = m > 1 ? Math.min(1.2, 2.2 / m) : 0;
        todo.forEach((x, t) => { const a = ang + (t - (m - 1) / 2) * spread * (m > 2 ? 1 : 1.4); pos[x.j] = { x: pos[v].x + Math.cos(a), y: pos[v].y + Math.sin(a), ang: a }; });
        todo.forEach((x) => place(x.j, pos[x.j].ang));
      };
      order.forEach((v) => place(v, pos[v].ang));
      return pos;
    }
    // cây (hoặc bỏ qua đóng vòng): lưới, đặt khung nguyên tử nặng trước rồi H
    const occ = {}, key = (x, y) => x + ',' + y;
    const kidsH = (v, p) => HN(v).filter((x) => x.j !== p && g.atoms[x.j].el !== 'H' && !pos[x.j]);
    const depth = (v, p, seen) => { let d = 0; seen = seen || new Set([v]); HN(v).forEach((x) => { if (x.j !== p && g.atoms[x.j].el !== 'H' && !seen.has(x.j)) { seen.add(x.j); d = Math.max(d, 1 + depth(x.j, v, seen)); } }); return d; };
    const far = (s) => { let best = [s, 0]; (function dfs(v, p, d, seen) { if (d > best[1]) best = [v, d]; HN(v).forEach((x) => { if (x.j !== p && g.atoms[x.j].el !== 'H' && !seen.has(x.j)) { seen.add(x.j); dfs(x.j, v, d + 1, seen); } }); })(s, -1, 0, new Set([s])); return best[0]; };
    const r0 = far(far(hv.idx[0])); pos[r0] = { x: 0, y: 0 }; occ[key(0, 0)] = r0;
    (function go(v, dirIn) { // dirIn: hướng đã đi tới v
      const ks = kidsH(v, -1).sort((a, b) => depth(b.j, v) - depth(a.j, v)), px = pos[v].x, py = pos[v].y;
      const order = dirIn ? [dirIn, [0, -1], [0, 1], [1, 0], [-1, 0]] : DIRS;
      ks.forEach((x) => {
        if (pos[x.j]) return;
        const d = order.find((dd) => !occ[key(px + dd[0], py + dd[1])] && !(dirIn && dd[0] === -dirIn[0] && dd[1] === -dirIn[1]));
        if (!d) { pos[x.j] = { x: px + 0.5, y: py + 0.5 + Object.keys(occ).length * 0.01 }; return; }
        pos[x.j] = { x: px + d[0], y: py + d[1] }; occ[key(pos[x.j].x, pos[x.j].y)] = x.j; go(x.j, d);
      });
    })(r0, null);
    g.atoms.forEach((a, i) => { if (a.el !== 'H' && !pos[i]) { pos[i] = { x: 0.5 + i, y: 3 }; } });
    for (let v = 0; v < n; v++) { // gắn H vào ô trống quanh nguyên tử nặng
      if (g.atoms[v].el === 'H' || !pos[v]) continue; let fb = 0;
      HN(v).filter((x) => g.atoms[x.j].el === 'H' && !pos[x.j]).forEach((x) => {
        const d = DIRS.concat([[1, 1], [-1, 1], [1, -1], [-1, -1]]).find((dd) => !occ[key(Math.round((pos[v].x + dd[0]) * 2) / 2, Math.round((pos[v].y + dd[1]) * 2) / 2)]);
        const dd = d || [0.7, 0.7 + 0.3 * fb++]; const px = pos[v].x + dd[0], py = pos[v].y + dd[1]; pos[x.j] = { x: px, y: py }; occ[key(Math.round(px * 2) / 2, Math.round(py * 2) / 2)] = x.j;
      });
    }
    for (let i = 0; i < n; i++) if (!pos[i]) pos[i] = { x: i, y: 2 };
    return pos;
  }
  function drawFull(g, opt) {
    opt = opt || {}; const u = opt.unit || 38, P = layout(g); if (!g.atoms.length) return '';
    let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; P.forEach((p) => { x0 = Math.min(x0, p.x); y0 = Math.min(y0, p.y); x1 = Math.max(x1, p.x); y1 = Math.max(y1, p.y); });
    const W = (x1 - x0) * u + 2 * u, H = (y1 - y0) * u + 2 * u, X = (p) => (p.x - x0) * u + u, Y = (p) => (p.y - y0) * u + u;
    let s = '<svg class="mol__svg" viewBox="0 0 ' + Math.round(W) + ' ' + Math.round(H) + '" width="' + Math.min(Math.round(W), opt.maxW || 520) + '" role="img" aria-label="' + (opt.label || 'Công thức cấu tạo đầy đủ · Full structural formula') + '"><g stroke="currentColor" stroke-width="2" stroke-linecap="round">';
    g.bonds.forEach((b) => {
      const A = P[b.a], B = P[b.b], dx = X(B) - X(A), dy = Y(B) - Y(A), L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, r = 11;
      const ax = X(A) + ux * r, ay = Y(A) + uy * r, bx = X(B) - ux * r, by = Y(B) - uy * r, nx = -uy * 3, ny = ux * 3;
      const ln = (ox, oy) => '<line x1="' + (ax + ox).toFixed(1) + '" y1="' + (ay + oy).toFixed(1) + '" x2="' + (bx + ox).toFixed(1) + '" y2="' + (by + oy).toFixed(1) + '"/>';
      s += b.o === 1 ? ln(0, 0) : b.o === 2 ? ln(nx, ny) + ln(-nx, -ny) : ln(0, 0) + ln(nx * 1.6, ny * 1.6) + ln(-nx * 1.6, -ny * 1.6);
    });
    const hl = opt.hl ? new Set(opt.hl) : null; if (hl) { s += '</g><g fill="#93c5fd" fill-opacity=".55" stroke="#2563eb" stroke-width="1.5">'; g.atoms.forEach((a, i) => { if (hl.has(i)) s += '<circle cx="' + X(P[i]).toFixed(1) + '" cy="' + Y(P[i]).toFixed(1) + '" r="15"/>'; }); }
    s += '</g><g font-family="Be Vietnam Pro,Segoe UI,sans-serif" font-size="17" font-weight="700" text-anchor="middle" fill="currentColor">';
    g.atoms.forEach((a, i) => { s += '<text x="' + X(P[i]).toFixed(1) + '" y="' + (Y(P[i]) + 6).toFixed(1) + '"' + (a.el === 'H' ? ' font-weight="500"' : '') + '>' + a.el + '</text>'; });
    return s + '</g></svg>';
  }
  /* ---- chất mẫu dùng chung cho widget */
  const SUBST = {
    benzene: 'C1=CC=CC=C1', glucose: null, methane: 'C', ethane: 'CC', propane: 'CCC', butane: 'CCCC', isobutane: 'CC(C)C', ethylene: 'C=C', propylene: 'C=CC', cyclopropane: 'C1CC1', cyclobutane: 'C1CCC1',
    ethanol: 'CCO', 'dimethyl ether': 'COC', methanol: 'CO', 'methyl chloride': 'CCl', 'acetic acid': 'CC(=O)O', methylamine: 'CN', 'ethyl acetate': 'CC(=O)OCC', urea: 'NC(=O)N', 'propyl acetate': 'CC(=O)OCCC', 'formic acid': 'OC=O', acetaldehyde: 'CC=O', 'but-2-ene': 'CC=CC', butadiene: 'C=CC=C', isobutylene: 'C=C(C)C'
  };

  function brominate(g) {                                          // phản ứng cộng Br₂ vào liên kết đôi C=C (alkene); null nếu không có C=C
    const k = g.bonds.findIndex((b) => b.o === 2 && g.atoms[b.a].el === 'C' && g.atoms[b.b].el === 'C'); if (k < 0) return null;
    const h = clone(g), A = h.bonds[k].a, B = h.bonds[k].b; h.bonds[k].o = 1;
    [A, B].forEach((c) => { h.atoms.push({ el: 'Br' }); h.bonds.push({ a: c, b: h.atoms.length - 1, o: 1 }); }); return h;
  }
  function chainKind(g) {                                          // 'straight' | 'branched' | 'ring' (Hình 22.3); null nếu không phải hợp chất hữu cơ
    const cl = classify(g); if (!cl.organic || !cl.connected) return null; if (cl.ring) return 'ring';
    const hv = heavyOf(g); for (let i = 0; i < hv.n; i++) if (hv.A[i].filter(Boolean).length >= 3) return 'branched'; return 'straight';
  }

  /* ---- nhóm chức (Bài 26–27): –OH (alcohol), –COOH, ester –COO–, ether –O–, C=O.  Nhận diện theo CẤU TRÚC, trả về chỉ số nguyên tử để tô nền. */
  function groups(g) {
    const r = { oh: [], cooh: [], ester: [], ether: [], carbonyl: [] }, el = (i) => g.atoms[i].el, N = (i) => nbrs(g, i);
    const dblO = (c) => N(c).filter((x) => el(x.j) === 'O' && x.o === 2).map((x) => x.j);
    const hOf = (i) => N(i).filter((x) => el(x.j) === 'H').length;
    g.atoms.forEach((a, i) => {
      if (a.el === 'C') { const d = dblO(i); if (!d.length) return;
        const os = N(i).filter((x) => el(x.j) === 'O' && x.o === 1).map((x) => x.j);
        const acid = os.find((o) => hOf(o) === 1), est = os.find((o) => hOf(o) === 0 && N(o).filter((x) => el(x.j) === 'C').length === 2);
        if (acid !== undefined) r.cooh.push({ c: i, o: d[0], oh: acid, atoms: [i, d[0], acid, N(acid).find((x) => el(x.j) === 'H').j] });
        else if (est !== undefined) r.ester.push({ c: i, o: d[0], o2: est, atoms: [i, d[0], est] });
        else r.carbonyl.push({ c: i, o: d[0], atoms: [i, d[0]] }); }
    });
    g.atoms.forEach((a, i) => {
      if (a.el !== 'O') return; const nb = N(i), cs = nb.filter((x) => el(x.j) === 'C' && x.o === 1), hs = nb.filter((x) => el(x.j) === 'H');
      const inCooh = r.cooh.some((q) => q.atoms.indexOf(i) >= 0), inEst = r.ester.some((q) => q.atoms.indexOf(i) >= 0);
      if (inCooh || inEst || nb.some((x) => x.o === 2)) return;
      if (cs.length === 1 && hs.length === 1) { const c = cs[0].j; if (!dblO(c).length) r.oh.push({ o: i, c, atoms: [i, hs[0].j] }); }
      else if (cs.length === 2 && !hs.length) r.ether.push({ o: i, atoms: [i] });
    });
    return r;
  }
  function family(g) {                                              // 'acid' | 'ester' | 'alcohol' | 'ether' | 'carbonyl' | 'hydrocarbon' | 'other'
    const c = classify(g); if (!c.organic) return 'inorganic'; const q = groups(g);
    if (q.cooh.length) return 'acid'; if (q.ester.length) return 'ester'; if (q.oh.length) return 'alcohol'; if (q.ether.length) return 'ether'; if (q.carbonyl.length) return 'carbonyl';
    return c.hydrocarbon ? 'hydrocarbon' : 'other';
  }
  const hlAtoms = (g, kind) => { const q = groups(g), out = []; (kind === 'cooh' ? q.cooh : kind === 'oh' ? q.oh : kind === 'ester' ? q.ester : kind === 'ether' ? q.ether : q.oh.concat(q.cooh, q.ester)).forEach((x) => x.atoms.forEach((a) => out.push(a))); return out; };
  const reactsNa = (g) => { const q = groups(g); return q.oh.length > 0 || q.cooh.length > 0; };          // thế H của –OH (alcohol) / –COOH bằng Na
  const acidic = (g) => groups(g).cooh.length > 0;                                                  // có tính acid (đổi màu quỳ tím, tác dụng Mg, CuO, NaOH, CaCO₃)
  const uf = (s) => String(s).replace(/(\D)(\d+)/g, (m, a, d) => a + sub(d)).replace(/^(\d+)/, (m, d) => sub(d));
  /* ---- kiểm thử tự động */
  function selfTest() {
    const T = [], add = (n, ok, got) => T.push({ name: n, ok: !!ok, got }), F = (s) => fromSmiles(s);
    const fm = (s) => formula(F(s)).plain, hc = (cnt) => isomers(cnt);
    add('công thức Hill: ethane C₂H₆, ethylene C₂H₄, ethanol C₂H₆O, urea CH₄N₂O, methyl chloride CH₃Cl', fm('CC') === 'C2H6' && fm('C=C') === 'C2H4' && fm('CCO') === 'C2H6O' && fm('NC(=O)N') === 'CH4N2O' && fm('CCl') === 'CH3Cl', [fm('CC'), fm('NC(=O)N'), fm('CCl')].join(','));
    add('khối lượng mol: C₂H₄ = 28; C₄H₁₀ = 58; C₂H₄Br₂ = 188', mass(F('C=C')) === 28 && mass(F('CCCC')) === 58 && mass(F('BrCCBr')) === 188, [mass(F('C=C')), mass(F('CCCC')), mass(F('BrCCBr'))].join(','));
    const vOK = ['C', 'CC', 'C=C', 'CCCC', 'CC(C)C', 'C1CC1', 'CCO', 'CC(=O)O', 'NC(=O)N', 'C1=CC=CC=C1'].every((s) => valence(F(s)).every((v) => v === 'ok'));
    add('mọi chất mẫu đủ hoá trị (không thiếu, không thừa)', vOK);
    const bad = mk(); bad.atoms.push({ el: 'C' }, { el: 'H' }); bad.bonds.push({ a: 0, b: 1, o: 1 });
    const bad2 = mk(); bad2.atoms.push({ el: 'C' }, { el: 'C' }); bad2.bonds.push({ a: 0, b: 1, o: 3 }); const hh = mk(); hh.atoms.push({ el: 'H' }, { el: 'H' }, { el: 'H' }); hh.bonds.push({ a: 0, b: 1, o: 1 }, { a: 0, b: 2, o: 1 });
    add('phát hiện thiếu hoá trị (C chỉ nối H) và thừa hoá trị (H nối 2 H)', valence(bad)[0] === 'lack' && valence(hh)[0] === 'over', valence(bad)[0] + valence(hh)[0]);
    const iso = (c) => hc(c);
    const n4 = iso({ C: 4, H: 10 }), n3 = iso({ C: 3, H: 6 }), n2 = iso({ C: 2, H: 6, O: 1 }), n5 = iso({ C: 5, H: 12 }), n48 = iso({ C: 4, H: 8 }), n6 = iso({ C: 6, H: 14 });
    add('đếm đồng phân: C₄H₁₀ = 2, C₃H₆ = 2, C₂H₆O = 2, C₅H₁₂ = 3, C₄H₈ = 5, C₆H₁₄ = 5', n4.list.length === 2 && n3.list.length === 2 && n2.list.length === 2 && n5.list.length === 3 && n48.list.length === 5 && n6.list.length === 5, [n4, n3, n2, n5, n48, n6].map((x) => x.list.length).join(','));
    add('C₄H₁₀: butane và isobutane khác nhau; hai cách vẽ butane trùng nhau', !same(F('CCCC'), F('CC(C)C')) && same(F('CCCC'), F('C(C)CC')) && same(F('CC(C)C'), F('C(C)(C)C')));
    add('C₂H₆O: ethanol ≠ dimethyl ether; C₃H₆: propene ≠ cyclopropane', !same(F('CCO'), F('COC')) && !same(F('C=CC'), F('C1CC1')));
    const names = ['C', 'CC', 'CCC', 'CCCC', 'CC(C)C'].map((s) => nameOf(F(s)));
    add('tên alkane: methane, ethane, propane, butane, isobutane (2-methylpropane)', names.join('|') === 'methane|ethane|propane|butane|isobutane (2-methylpropane)', names.join('|'));
    add('isobutane đánh dấu "ngoài yêu cầu của sách", butane thì không', outOfBook(names[4]) && !outOfBook(names[3]));
    const co = (s) => classify(F(s));
    add('cyclopropane (C₃H₆) KHÔNG phải alkene, propene là alkene', !co('C1CC1').alkene && co('C=CC').alkene && co('C1CC1').ring && co('C1CC1').saturated);
    add('alkane: CH₄, C₂H₆, C₄H₁₀, isobutane; không phải alkane: C₂H₄, C₂H₅OH, cyclobutane, buta-1,3-diene', ['C', 'CC', 'CCCC', 'CC(C)C'].every((s) => co(s).alkane) && ['C=C', 'CCO', 'C1CCC1', 'C=CC=C'].every((s) => !co(s).alkane));
    add('alkene: C₂H₄, C₃H₆ (propene), but-2-ene, isobutylene; buta-1,3-diene không phải alkene', ['C=C', 'C=CC', 'CC=CC', 'C=C(C)C'].every((s) => co(s).alkene) && !co('C=CC=C').alkene);
    const hy = ['C', 'C=C', 'CCC', 'C=CC'].every((s) => co(s).hydrocarbon) && ['CCl', 'CCO', 'CC(=O)O', 'CN', 'CC(=O)OCC'].every((s) => co(s).derivative);
    add('hydrocarbon: CH₄, CH₂=CH₂, CH₃CH₂CH₃, CH₃CH=CH₂; dẫn xuất: CH₃Cl, C₂H₅OH, CH₃COOH, CH₃NH₂, CH₃COOC₂H₅', hy);
    const org = ['C6H6', 'C6H12O6', 'C2H4', 'CH3Cl', 'CH3OH'].every(organicFormula), ino = ['H2SO4', 'H2CO3', 'CaCO3', 'KNO3', 'NaOH', 'Al2O3', 'CO', 'CO2', 'Na2CO3'].every((f) => !organicFormula(f));
    add('11 chất của câu hỏi: 5 hữu cơ (C₆H₆, C₆H₁₂O₆, C₂H₄, CH₃Cl, CH₃OH), 6 vô cơ (H₂SO₄, H₂CO₃, CaCO₃, KNO₃, NaOH, Al₂O₃); CO, CO₂, Na₂CO₃ vô cơ', org && ino);
    add('urea CO(NH₂)₂ là hữu cơ; CO₂ và H₂CO₃ (dạng đồ thị) là vô cơ', co('NC(=O)N').organic && !classify(F('O=C=O')).organic && !classify(F('OC(=O)O')).organic);
    const cd = ['CC', 'C=C', 'CC(C)C', 'CCO', 'COC', 'CC(=O)O', 'C=CC', 'CC(=O)OCC', 'C1CC1'].map((s) => condensed(F(s)));
    add('thu gọn: CH₃–CH₃, CH₂=CH₂, CH₃–CH(CH₃)–CH₃, CH₃–CH₂–OH, CH₃–O–CH₃, CH₃–COOH, (CH₂)₃', cd[0] === 'CH₃–CH₃' && cd[1] === 'CH₂=CH₂' && cd[2] === 'CH₃–CH(CH₃)–CH₃' && cd[3] === 'CH₃–CH₂–OH' && cd[4] === 'CH₃–O–CH₃' && cd[5] === 'CH₃–COOH' && cd[8] === '(CH₂)₃', cd.join(' ; '));
    const cx = ['CCl', 'BrCCBr', 'CC(Br)CBr', 'C(Cl)(Cl)(Cl)Cl'].map((q) => condensed(F(q)));
    add('thu gọn dẫn xuất halogen: CH₃Cl, CH₂Br–CH₂Br, CH₃–CHBr–CH₂Br, CCl₄', cx[0] === 'CH₃Cl' && cx[1] === 'CH₂Br–CH₂Br' && /^(CH₃–CHBr–CH₂Br|CH₂Br–CHBr–CH₃)$/.test(cx[2]) && cx[3] === 'CCl₄', cx.join(' ; '));
    add('thu gọn propene = CH₂=CH–CH₃ hoặc CH₃–CH=CH₂; ester có đủ nhóm C(=O)', /^(CH₂=CH–CH₃|CH₃–CH=CH₂)$/.test(cd[6]) && cd[7].indexOf('(=O)') > 0, cd[6] + ' ; ' + cd[7]);
    add('vẽ công thức đầy đủ không lỗi cho mọi chất mẫu (có nhãn H, không NaN)', Object.keys(SUBST).filter((k) => SUBST[k]).every((k) => { const sv = drawFull(F(SUBST[k])); return sv.indexOf('NaN') < 0 && sv.indexOf('<text') > 0; }));
    const mcore = mk(); for (let i = 0; i < 40; i++) mcore.atoms.push({ el: 'C' }); for (let i = 1; i < 40; i++) mcore.bonds.push({ a: i - 1, b: i, o: 1 });
    const t0 = Date.now(), big = isomers({ C: 9, H: 20 }, 50000), weird = canon(mcore), nm = nameOf(mcore); add('ngưỡng an toàn: C₉H₂₀ dừng đúng hạn, không treo, không NaN', Date.now() - t0 < 4000 && typeof weird === 'string' && big.list.length > 0 && nm === null, big.list.length + (big.truncated ? '+' : ''));
    add('đồ thị rỗng / một nguyên tử / rời rạc không lỗi', formula(mk()).plain === '' && condensed(mk()) === '' && stats(mk()).connected === false && !stats((() => { const q = mk(); q.atoms.push({ el: 'C' }, { el: 'C' }); return q; })()).connected);
    const eb = brominate(F('C=C')), pb = brominate(F('C=CC')), nb = brominate(F('CC'));
    add('cộng Br₂: C₂H₄ → C₂H₄Br₂ (1,2-dibromoethane); C₃H₆ (propene) → C₃H₆Br₂; ethane không có C=C ⇒ null', eb && formula(eb).plain === 'C2H4Br2' && same(eb, F('BrCCBr')) && pb && formula(pb).plain === 'C3H6Br2' && same(pb, F('CC(Br)CBr')) && nb === null && valence(eb).every((v) => v === 'ok'), eb && formula(eb).plain);
    add('mạch carbon (Hình 22.3): butane thẳng, isobutane nhánh, cyclobutane vòng', chainKind(F('CCCC')) === 'straight' && chainKind(F('CC(C)C')) === 'branched' && chainKind(F('C1CCC1')) === 'ring' && chainKind(F('O')) === null);

    const gq = (q) => groups(F(q)), fam = (q) => family(F(q));
    add('nhóm chức: C₂H₆O có 2 đồng phân, chỉ ethanol có –OH và tác dụng Na; dimethyl ether có –O–', iso({ C: 2, H: 6, O: 1 }).list.length === 2 && gq('CCO').oh.length === 1 && !gq('COC').oh.length && gq('COC').ether.length === 1 && reactsNa(F('CCO')) && !reactsNa(F('COC')), [gq('CCO').oh.length, gq('COC').ether.length].join(','));
    add('acetic acid C₂H₄O₂ có –COOH, tính acid; ethyl acetate là ester, không có –COOH; HCOOH có –COOH; CH₃CHO, CH₃COOC₂H₅ không', formula(F('CC(=O)O')).plain === 'C2H4O2' && gq('CC(=O)O').cooh.length === 1 && acidic(F('CC(=O)O')) && gq('CC(=O)OCC').ester.length === 1 && !gq('CC(=O)OCC').cooh.length && acidic(F('OC=O')) && !acidic(F('CC=O')) && !acidic(F('CC(=O)OCC')), '');
    add('CH₃OH, CH₃CH₂OH tác dụng Na; CH₃CH₃, CH₂=CH₂ thì không; acetic acid tác dụng Na', reactsNa(F('CO')) && reactsNa(F('CCO')) && !reactsNa(F('CC')) && !reactsNa(F('C=C')) && reactsNa(F('CC(=O)O')));
    add('họ chất: ethanol=alcohol, acetic acid=acid, ethyl acetate=ester, ethane=hydrocarbon, dimethyl ether=ether', fam('CCO') === 'alcohol' && fam('CC(=O)O') === 'acid' && fam('CC(=O)OCC') === 'ester' && fam('CC') === 'hydrocarbon' && fam('COC') === 'ether', [fam('CCO'), fam('CC(=O)O'), fam('CC(=O)OCC')].join(','));
    add('khối lượng mol: ethanol 46; acetic acid 60; ethyl acetate 88; propyl acetate 102', mass(F('CCO')) === 46 && mass(F('CC(=O)O')) === 60 && mass(F('CC(=O)OCC')) === 88 && mass(F('CC(=O)OCCC')) === 102 && formula(F('CC(=O)OCC')).plain === 'C4H8O2', '');
    add('tô nhóm chức không lỗi; tên: ethylic alcohol, acetic acid, ethyl acetate, propyl acetate', drawFull(F('CCO'), { hl: hlAtoms(F('CCO'), 'oh') }).indexOf('<circle') > 0 && /ethylic/.test(nameOf(F('CCO'))) && nameOf(F('CC(=O)O')) === 'acetic acid' && nameOf(F('CC(=O)OCC')) === 'ethyl acetate' && nameOf(F('CC(=O)OCCC')) === 'propyl acetate', '');
    add('thu gọn: ethanol CH₃–CH₂–OH; acetic acid CH₃–COOH', condensed(F('CCO')) === 'CH₃–CH₂–OH' && condensed(F('CC(=O)O')) === 'CH₃–COOH', condensed(F('CCO')) + ' ; ' + condensed(F('CC(=O)O')) + ' ; ' + condensed(F('CC(=O)OCC')));
    add('Bài 28: glycerol C₃H₈O₃ (M 92), 3 nhóm –OH; triacetin là triester (3 nhóm –COO–); ethyl acetate không phải triester', formula(F('OCC(O)CO')).plain === 'C3H8O3' && mass(F('OCC(O)CO')) === 92 && polyol(F('OCC(O)CO')) === 3 && triester(F('CC(=O)OCC(OC(C)=O)COC(C)=O')) && !triester(F('CC(=O)OCC')) && !triester(F('OCC(O)CO')), '');
    add('glucose mạch hở C₆H₁₂O₆ (M 180), 5 nhóm –OH và 1 nhóm C=O', formula(F('OCC(O)C(O)C(O)C(O)C=O')).plain === 'C6H12O6' && mass(F('OCC(O)C(O)C(O)C(O)C=O')) === 180 && polyol(F('OCC(O)C(O)C(O)C(O)C=O')) === 5, '');
    return T;
  }

  /* ---- Bài 28: triester (chất béo) — 3 nhóm –COO– cùng gắn vào khung glycerol (3 carbon liên tiếp); polyol = nhiều nhóm –OH. */
  function triester(g) { const r = groups(g); if (r.ester.length !== 3) return false; const cs = r.ester.map((q) => nbrs(g, q.o2).filter((x) => g.atoms[x.j].el === 'C' && x.j !== q.c)[0]); if (cs.some((x) => !x)) return false; const set = cs.map((x) => x.j); return set.every((c) => nbrs(g, c).filter((x) => g.atoms[x.j].el === 'C' && set.indexOf(x.j) >= 0).length >= 1); }
  const polyol = (g) => groups(g).oh.length;
  const engine = { triester, polyol, groups, family, hlAtoms, reactsNa, acidic, brominate, chainKind, uf, VAL, MASS, sub, mk, clone, nbrs, deg, valence, counts, hill, formula, mass, stats, fromSmiles, heavyOf, canon, same, isomers, classify, organicFormula, nameOf, outOfBook, condensed, layout, drawFull, SUBST, KNOWN, selfTest };
  root.MolLab = Object.assign(root.MolLab || {}, { engine });
  /* ----------------------------------------------------------------- GIAO DIỆN: bàn lắp ghép phân tử */
  const L = root.OpticsLab; if (typeof document === 'undefined' || !L) return;
  const { pr } = L, M = engine;
  const $ = (s, r) => r.querySelector(s), $$ = (s, r) => Array.from(r.querySelectorAll(s));
  const CLR = { C: '#4b5563', H: '#f3f4f6', O: '#ef4444', N: '#3b82f6', Cl: '#22c55e', Br: '#a16207', S: '#facc15' };
  const TXT = { H: '#111827', S: '#111827', Cl: '#052e16' };
  const RAD = { H: 13, C: 18, O: 17, N: 17, Cl: 18, Br: 19, S: 18 };
  const VW = 420, VH = 300;
  let uid = 0;
  const SAFE = ['Hiệu ứng cháy, khí dễ cháy, acid đặc và bromine ở đây chỉ để minh hoạ: không tự thực hiện ở nhà; thí nghiệm thật cần giáo viên và dụng cụ bảo hộ.', 'Burning, flammable gases, concentrated acid and bromine are illustrated only: do not try them at home; real experiments need a teacher and protective equipment.'];
  const NOTE = (t) => '<p class="olab__hint"><small>' + pr(t[0], t[1]) + '</small></p>';
  const BTN = (k, vi, en) => '<button type="button" class="btn" data-a="' + k + '">' + pr(vi, en) + '</button>';
  function analyse(g) {
    const v = M.valence(g), st = M.stats(g), f = M.formula(g), cl = M.classify(g), lack = v.filter((x) => x === 'lack').length, over = v.filter((x) => x === 'over').length;
    const valid = g.atoms.length > 0 && !lack && !over && st.connected, name = valid ? M.nameOf(g) : null;
    return { g, v, st, f, M: M.mass(g), cl, lack, over, valid, name, cond: valid ? M.condensed(g) : '', key: valid ? f.plain + '/' + M.canon(g) : null };
  }
  const classText = (a) => { if (!a.valid) return null; const c = a.cl; const p = [];
    p.push(c.organic ? ['hợp chất hữu cơ', 'organic compound'] : ['hợp chất vô cơ', 'inorganic compound']);
    if (c.organic) { p.push(c.hydrocarbon ? ['hydrocarbon', 'hydrocarbon'] : ['dẫn xuất của hydrocarbon', 'hydrocarbon derivative']); p.push(c.open ? ['mạch hở', 'open chain'] : ['mạch vòng', 'ring']);
      if (c.hydrocarbon) p.push(c.saturated ? ['chỉ liên kết đơn', 'single bonds only'] : ['có liên kết bội', 'has multiple bonds']);
      { const fm = M.family(a.g); const T = { alcohol: ['alcohol (nhóm –OH)', 'alcohol (–OH group)'], acid: ['carboxylic acid (nhóm –COOH)', 'carboxylic acid (–COOH group)'], ester: ['ester (nhóm –COO–)', 'ester (–COO– group)'], ether: ['ether (nhóm –O–)', 'ether (–O– group)'] }; if (T[fm]) p.push(T[fm]); if (M.reactsNa(a.g)) p.push(['tác dụng được với Na', 'reacts with Na']); if (M.acidic(a.g)) p.push(['có tính acid', 'acidic']); }
      if (c.alkane) p.push(['alkane', 'alkane']); if (c.alkene) p.push(['alkene (một liên kết đôi C=C, mạch hở)', 'alkene (one C=C, open chain)']); }
    return pr(p.map((x) => x[0]).join(' · '), p.map((x) => x[1]).join(' · ')); };
  function board(body, cfg) {
    cfg = cfg || {}; const id = 'mb' + (++uid), els = cfg.atoms || ['C', 'H', 'O', 'N', 'Cl'], MAX = cfg.max || 28;
    let g = M.mk(), hist = [], fut = [], sel = -1, src = -1, bondMode = false, snap = true, auto = true, drag = null, focusKey = null;
    const presets = cfg.presets || [];
    body.insertAdjacentHTML('beforeend', '<div class="olab em mol" data-mol="' + id + '"><p class="olab__hint">' + pr(cfg.hintVi || 'Kéo nguyên tử C vào bảng rồi nối với H · kéo từ nguyên tử này sang nguyên tử kia để nối.', cfg.hintEn || 'Drag a C atom onto the board and bond it to H · drag from one atom to another to bond.') + '</p>' +
      '<div class="mol__tray" role="group" aria-label="Khay nguyên tử / Atom tray">' + els.map((e) => '<button type="button" class="pw__chip mol__chip" data-el="' + e + '" aria-label="Nguyên tử ' + e + ' (kéo vào bảng hoặc nhấn Enter) / ' + e + ' atom (drag onto the board or press Enter)"><svg width="26" height="26" viewBox="-13 -13 26 26" aria-hidden="true"><circle r="12" fill="' + CLR[e] + '" stroke="#111827" stroke-width="1.5"/><text y="4.5" text-anchor="middle" font-size="12" font-weight="700" fill="' + (TXT[e] || '#fff') + '">' + e + '</text></svg><b>' + e + '</b><small>(' + M.VAL[e] + ')</small></button>').join('') + '</div>' +
      '<div class="olab__btns mol__btns"><label class="pw__chip mol__tog"><input type="checkbox" data-t="bond"> ' + pr('Chế độ nối', 'Bond mode') + '</label><label class="pw__chip mol__tog"><input type="checkbox" data-t="snap" checked> ' + pr('Bắt lưới', 'Snap') + '</label><label class="pw__chip mol__tog"><input type="checkbox" data-t="auto" checked> ' + pr('Tự nối khi thả gần', 'Auto-bond near') + '</label>' +
      BTN('undo', 'Hoàn tác', 'Undo') + BTN('redo', 'Làm lại', 'Redo') + BTN('fillh', 'Bù H', 'Add H') + BTN('tidy', 'Làm đẹp', 'Tidy') + BTN('reset', 'Đặt lại', 'Reset') + BTN('still', 'Tạm dừng nhấp nháy', 'Pause blinking') +
      (presets.length ? '<label class="olab__ctl mol__pre"><span>' + pr('Mẫu có sẵn', 'Preset') + '</span><select data-pre aria-label="Mẫu có sẵn / Preset"><option value="">—</option>' + presets.map((p, i) => '<option value="' + i + '">' + p[0] + ' · ' + p[1] + '</option>').join('') + '</select></label>' : '') + '</div>' +
      '<svg class="olab__svg mol__board" viewBox="0 0 ' + VW + ' ' + VH + '" role="application" aria-label="Bảng lắp ghép phân tử. Tab chọn nguyên tử, mũi tên di chuyển, Enter nối, Delete xoá / Molecule board. Tab selects an atom, arrows move, Enter bonds, Delete removes"></svg>' +
      '<div class="olab__status mol__info" role="status" aria-live="polite"></div><div class="mol__draw" aria-live="off"></div>' + NOTE(SAFE) + (cfg.extra || '') + '</div>');
    const lab = $('[data-mol="' + id + '"]', body), svg = $('.mol__board', lab), info = $('.mol__info', lab), draw = $('.mol__draw', lab);
    const pt = (e) => { const r = svg.getBoundingClientRect(); return { x: (e.clientX - r.left) * VW / (r.width || VW), y: (e.clientY - r.top) * VH / (r.height || VH) }; };
    const snapV = (v) => (snap ? Math.round(v / 20) * 20 : v);
    const lim = (p) => ({ x: Math.max(18, Math.min(VW - 18, p.x)), y: Math.max(18, Math.min(VH - 18, p.y)) });
    const bondOf = (a, b) => g.bonds.findIndex((q) => (q.a === a && q.b === b) || (q.a === b && q.b === a));
    const snapshot = () => JSON.stringify(g);
    function commit() { hist.push(snapshot()); if (hist.length > 60) hist.shift(); fut = []; }
    function addBond(a, b) {
      if (a === b || a < 0 || b < 0) return false; const k = bondOf(a, b);
      commit(); if (k >= 0) g.bonds[k].o = g.bonds[k].o === 1 ? 2 : 1; else g.bonds.push({ a, b, o: 1 }); return true;
    }
    function freeSpot() { for (let r = 0; r < 12; r++) for (let c = 0; c < 8; c++) { const x = 60 + c * 50, y = 50 + r * 50 < VH - 20 ? 50 + r * 50 : 0; if (y && !g.atoms.some((a) => Math.hypot(a.x - x, a.y - y) < 40)) return { x, y }; } return { x: 210, y: 150 }; }
    function place(el, p) {
      if (g.atoms.length >= MAX) { say(pr('Bảng đầy: tối đa ' + MAX + ' nguyên tử.', 'Board full: at most ' + MAX + ' atoms.')); return -1; }
      commit(); p = lim({ x: snapV(p.x), y: snapV(p.y) }); g.atoms.push({ el, x: p.x, y: p.y }); const i = g.atoms.length - 1;
      if (auto) { let best = -1, bd = 52; g.atoms.forEach((a, j) => { if (j === i) return; const d = Math.hypot(a.x - p.x, a.y - p.y); if (d < bd && M.deg(g, j) < (M.VAL[a.el] || 0) && M.deg(g, i) < (M.VAL[el] || 0)) { bd = d; best = j; } }); if (best >= 0) g.bonds.push({ a: best, b: i, o: 1 }); }
      return i;
    }
    function removeAtom(i) { commit(); g.atoms.splice(i, 1); g.bonds = g.bonds.filter((b) => b.a !== i && b.b !== i).map((b) => ({ a: b.a > i ? b.a - 1 : b.a, b: b.b > i ? b.b - 1 : b.b, o: b.o })); sel = src = -1; }
    function fillH() {
      commit(); const n0 = g.atoms.length;
      for (let i = 0; i < n0; i++) { if (g.atoms[i].el === 'H') continue; const need = (M.VAL[g.atoms[i].el] || 0) - M.deg(g, i); const base = Math.atan2(g.atoms[i].y - 150, g.atoms[i].x - 210);
        for (let k = 0; k < need && g.atoms.length < MAX + 12; k++) { const a = base + (k - (need - 1) / 2) * 1.1; const p = lim({ x: g.atoms[i].x + 46 * Math.cos(a), y: g.atoms[i].y + 46 * Math.sin(a) }); g.atoms.push({ el: 'H', x: p.x, y: p.y }); g.bonds.push({ a: i, b: g.atoms.length - 1, o: 1 }); } }
    }
    function tidy() {
      if (!g.atoms.length) return; commit(); const P = M.layout(g); let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; P.forEach((p) => { x0 = Math.min(x0, p.x); y0 = Math.min(y0, p.y); x1 = Math.max(x1, p.x); y1 = Math.max(y1, p.y); });
      const s = Math.min(56, (VW - 80) / Math.max(1, x1 - x0), (VH - 80) / Math.max(1, y1 - y0)), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
      g.atoms.forEach((a, i) => { a.x = VW / 2 + (P[i].x - cx) * s; a.y = VH / 2 + (P[i].y - cy) * s; });
    }
    function setGraph(ng, tidyIt) { commit(); g = M.clone(ng); sel = src = -1; if (tidyIt) { hist.pop(); tidy(); } render(); notify(); }
    function say(h) { info.innerHTML = h; }
    let last = null;
    function notify() { last = analyse(g); cfg.onChange && cfg.onChange(last, g); }
    function paint() {
      const a = last || analyse(g);
      if (!g.atoms.length) { info.innerHTML = pr('Bảng trống. Kéo một nguyên tử từ khay vào bảng.', 'The board is empty. Drag an atom from the tray onto it.'); draw.innerHTML = ''; return; }
      let h = '<b>' + pr('Công thức phân tử', 'Molecular formula') + ': ' + a.f.uni + '</b> · M = ' + L.fmt(a.M, a.M % 1 ? 1 : 0) + ' g/mol';
      if (a.lack) h += '<br><span class="chem__safe">' + pr('Còn ' + a.lack + ' nguyên tử thiếu liên kết (đang nhấp nháy cam).', a.lack + ' atom(s) still lack bonds (blinking orange).') + '</span>';
      if (a.over) h += '<br><span class="chem__safe">' + pr(a.over + ' nguyên tử thừa liên kết (viền đỏ).', a.over + ' atom(s) have too many bonds (red outline).') + '</span>';
      if (!a.st.connected && g.atoms.length > 1) h += '<br>' + pr('Các nguyên tử chưa nối thành một phân tử.', 'The atoms are not joined into one molecule yet.');
      if (a.valid) { h += '<br>' + pr('Liên kết đôi: ' + a.st.doubles + ' · vòng: ' + a.st.rings, 'Double bonds: ' + a.st.doubles + ' · rings: ' + a.st.rings) + '<br>' + classText(a) + (a.name ? '<br>' + pr('Tên', 'Name') + ': <b>' + a.name + '</b>' + (M.outOfBook(a.name) ? ' <small>(' + pr('ngoài yêu cầu của sách', 'beyond the book') + ')</small>' : '') : '') + '<br>' + pr('Công thức thu gọn', 'Condensed') + ': <b>' + a.cond + '</b>'; }
      info.innerHTML = h; draw.innerHTML = a.valid ? '<div class="mol__full">' + M.drawFull(g, { maxW: 360 }) + '</div>' : '';
    }
    function render() {
      const a = (last = analyse(g)); let s = '<rect x="0" y="0" width="' + VW + '" height="' + VH + '" fill="var(--paper)" rx="10" class="mol__bg"/>' + (snap ? '<g stroke="currentColor" stroke-opacity=".08">' + Array.from({ length: 20 }, (_, k) => '<line x1="' + (k * 20 + 20) + '" y1="0" x2="' + (k * 20 + 20) + '" y2="' + VH + '"/>').join('') + Array.from({ length: 14 }, (_, k) => '<line x1="0" y1="' + (k * 20 + 20) + '" x2="' + VW + '" y2="' + (k * 20 + 20) + '"/>').join('') + '</g>' : '');
      g.bonds.forEach((b, k) => { const A = g.atoms[b.a], B = g.atoms[b.b]; if (!A || !B) return; const dx = B.x - A.x, dy = B.y - A.y, Ln = Math.hypot(dx, dy) || 1, nx = -dy / Ln * 3.2, ny = dx / Ln * 3.2;
        const line = (ox, oy) => '<line x1="' + (A.x + ox) + '" y1="' + (A.y + oy) + '" x2="' + (B.x + ox) + '" y2="' + (B.y + oy) + '" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/>';
        s += '<g class="mol__b' + (sel === 'b' + k ? ' is-sel' : '') + '" data-b="' + k + '" tabindex="0" role="button" aria-label="Liên kết ' + (b.o === 1 ? 'đơn' : 'đôi') + ' ' + A.el + '–' + B.el + ': Enter đổi đơn/đôi, Delete xoá / ' + (b.o === 1 ? 'single' : 'double') + ' bond">' + (b.o === 1 ? line(0, 0) : line(nx, ny) + line(-nx, -ny)) + '<line x1="' + A.x + '" y1="' + A.y + '" x2="' + B.x + '" y2="' + B.y + '" stroke="transparent" stroke-width="22"/></g>'; });
      if (drag && drag.mode === 'bond') { const A = g.atoms[drag.i]; if (A) s += '<line x1="' + A.x + '" y1="' + A.y + '" x2="' + drag.x + '" y2="' + drag.y + '" stroke="var(--pen)" stroke-width="3" stroke-dasharray="6 4"/>'; }
      g.atoms.forEach((q, i) => { const st = a.v[i], r = RAD[q.el] || 17;
        s += '<g class="mol__a mol__' + st + (src === i ? ' is-src' : '') + '" data-i="' + i + '" tabindex="0" role="button" aria-label="Nguyên tử ' + q.el + ', hoá trị ' + (M.VAL[q.el]) + ', ' + (st === 'ok' ? 'đủ liên kết' : st === 'lack' ? 'còn thiếu liên kết' : 'thừa liên kết') + ' / ' + q.el + ' atom, valence ' + M.VAL[q.el] + ', ' + (st === 'ok' ? 'complete' : st === 'lack' ? 'needs more bonds' : 'too many bonds') + '" transform="translate(' + q.x + ' ' + q.y + ')">' +
          '<circle r="' + (r + 6) + '" class="mol__ring" fill="none"/><circle r="' + r + '" fill="' + (CLR[q.el] || '#999') + '" stroke="#111827" stroke-width="1.6"/><text y="5" text-anchor="middle" font-size="' + (q.el === 'H' ? 13 : 15) + '" font-weight="700" fill="' + (TXT[q.el] || '#fff') + '" pointer-events="none">' + q.el + '</text><circle r="26" fill="transparent"/></g>'; });
      svg.innerHTML = s;
      if (focusKey) { const f = svg.querySelector(focusKey); if (f) f.focus({ preventScroll: true }); }
      paint();
    }
    /* ---- tương tác */
    function startGhost(e, el) {
      const gh = document.createElement('div'); gh.className = 'mol__ghost'; gh.textContent = el; gh.style.background = CLR[el]; gh.style.color = TXT[el] || '#fff'; document.body.appendChild(gh);
      const mv = (ev) => { gh.style.left = ev.clientX + 'px'; gh.style.top = ev.clientY + 'px'; };
      const up = (ev) => { document.removeEventListener('pointermove', mv); document.removeEventListener('pointerup', up); document.removeEventListener('pointercancel', cn); gh.remove(); const r = svg.getBoundingClientRect(); if (ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom) { place(el, pt(ev)); render(); notify(); } };
      const cn = () => { document.removeEventListener('pointermove', mv); document.removeEventListener('pointerup', up); document.removeEventListener('pointercancel', cn); gh.remove(); };
      mv(e); document.addEventListener('pointermove', mv); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', cn);
    }
    lab.addEventListener('pointerdown', (e) => { const c = e.target.closest('.mol__chip'); if (!c || e.button > 0) return; e.preventDefault(); startGhost(e, c.dataset.el); });
    lab.addEventListener('click', (e) => { const c = e.target.closest('.mol__chip'); if (c && e.detail === 0) { place(c.dataset.el, freeSpot()); render(); notify(); return; }
      const b = e.target.closest('[data-a]'); if (!b) return; const k = b.dataset.a;
      if (k === 'undo') { if (hist.length) { fut.push(snapshot()); g = JSON.parse(hist.pop()); sel = src = -1; render(); notify(); } }
      else if (k === 'redo') { if (fut.length) { hist.push(snapshot()); g = JSON.parse(fut.pop()); render(); notify(); } }
      else if (k === 'fillh') { fillH(); render(); notify(); } else if (k === 'tidy') { tidy(); render(); notify(); }
      else if (k === 'reset') { hist.push(snapshot()); g = M.mk(); sel = src = -1; fut = []; render(); notify(); cfg.onReset && cfg.onReset(); }
      else if (k === 'still') { lab.classList.toggle('mol--still'); b.setAttribute('aria-pressed', lab.classList.contains('mol--still')); } });
    lab.addEventListener('change', (e) => { const t = e.target.dataset && e.target.dataset.t; if (t === 'bond') bondMode = e.target.checked; else if (t === 'snap') { snap = e.target.checked; render(); } else if (t === 'auto') auto = e.target.checked;
      else if (e.target.matches('[data-pre]') && e.target.value !== '') { const p = presets[+e.target.value]; setGraph(M.fromSmiles(p[2]), true); e.target.value = ''; } });
    svg.addEventListener('pointerdown', (e) => {
      const at = e.target.closest('.mol__a'), bd = e.target.closest('.mol__b'); const p = pt(e);
      if (at) { const i = +at.dataset.i; svg.setPointerCapture(e.pointerId); drag = { i, mode: bondMode || e.shiftKey ? 'bond' : 'move', x: p.x, y: p.y, ox: g.atoms[i].x - p.x, oy: g.atoms[i].y - p.y, moved: false, saved: false, pid: e.pointerId }; e.preventDefault(); if (e.target.closest('.mol__a')) focusKey = '[data-i="' + i + '"]'; }
      else if (bd) { const k = +bd.dataset.b; commit(); g.bonds[k].o = g.bonds[k].o === 1 ? 2 : 1; focusKey = '[data-b="' + k + '"]'; render(); notify(); }
    });
    svg.addEventListener('pointermove', (e) => { if (!drag) return; const p = pt(e);
      if (drag.mode === 'move') { if (!drag.saved && Math.hypot(p.x - drag.x, p.y - drag.y) > 3) { commit(); drag.saved = true; } if (drag.saved) { const q = lim({ x: p.x + drag.ox, y: p.y + drag.oy }); g.atoms[drag.i].x = q.x; g.atoms[drag.i].y = q.y; drag.moved = true; render(); } }
      else { drag.x = p.x; drag.y = p.y; render(); } });
    const endDrag = (e) => { if (!drag) return; const d = drag; drag = null;
      if (d.mode === 'move' && d.moved && snap) { const a = g.atoms[d.i]; const q = lim({ x: snapV(a.x), y: snapV(a.y) }); a.x = q.x; a.y = q.y; }
      if (d.mode === 'bond') { const el = document.elementFromPoint(e.clientX, e.clientY), t = el && el.closest && el.closest('.mol__a'); if (t && +t.dataset.i !== d.i) addBond(d.i, +t.dataset.i); }
      else if (!d.moved) { src = src === d.i ? -1 : (src >= 0 ? (addBond(src, d.i), -1) : d.i); }
      render(); notify(); };
    svg.addEventListener('pointerup', endDrag); svg.addEventListener('pointercancel', () => { drag = null; render(); });
    svg.addEventListener('keydown', (e) => {
      const at = e.target.closest && e.target.closest('.mol__a'), bd = e.target.closest && e.target.closest('.mol__b');
      if (e.key.indexOf('Arrow') === 0 && at) { e.preventDefault(); e.stopPropagation(); const i = +at.dataset.i, s = e.shiftKey ? 40 : 10, q = g.atoms[i]; commit(); const n = lim({ x: q.x + (e.key === 'ArrowRight' ? s : e.key === 'ArrowLeft' ? -s : 0), y: q.y + (e.key === 'ArrowDown' ? s : e.key === 'ArrowUp' ? -s : 0) }); q.x = n.x; q.y = n.y; focusKey = '[data-i="' + i + '"]'; render(); notify(); return; }
      if (e.key.indexOf('Arrow') === 0) { e.stopPropagation(); return; }
      if (e.key === 'Enter' || e.key === ' ') { if (at) { e.preventDefault(); const i = +at.dataset.i; if (src < 0) src = i; else { addBond(src, i); src = -1; } focusKey = '[data-i="' + i + '"]'; render(); notify(); } else if (bd) { e.preventDefault(); const k = +bd.dataset.b; commit(); g.bonds[k].o = g.bonds[k].o === 1 ? 2 : 1; focusKey = '[data-b="' + k + '"]'; render(); notify(); } }
      else if (e.key === 'Escape') { src = -1; render(); }
      else if ((e.key === 'Delete' || e.key === 'Backspace') && at) { e.preventDefault(); e.stopPropagation(); removeAtom(+at.dataset.i); focusKey = null; render(); notify(); }
      else if ((e.key === 'Delete' || e.key === 'Backspace') && bd) { e.preventDefault(); e.stopPropagation(); commit(); g.bonds.splice(+bd.dataset.b, 1); focusKey = null; render(); notify(); } });
    svg.addEventListener('blur', () => { focusKey = null; }, true);
    svg.addEventListener('focusin', (e) => { const a = e.target.closest && e.target.closest('.mol__a, .mol__b'); if (a) focusKey = a.classList.contains('mol__a') ? '[data-i="' + a.dataset.i + '"]' : '[data-b="' + a.dataset.b + '"]'; });
    render(); notify();
    return { lab, graph: () => g, analysis: () => last, set: (ng, t) => setGraph(ng, t !== false), clear() { g = M.mk(); hist = []; fut = []; render(); notify(); }, place: (el, p) => { const i = place(el, p || freeSpot()); render(); notify(); return i; }, root: lab, refresh: () => { render(); notify(); } };
  }
  /* kiểm thử giao diện-nhẹ: đồ thị được lắp bằng tay phải khớp engine */
  const prevT = L.engine && L.engine.selfTest; if (prevT) L.engine.selfTest = function () { return prevT().concat(engine.selfTest()); };
  /* ---- tiện ích dùng chung cho widget Chương VII */
  const REDUCED = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  const { fmt, clamp } = L;
  const wrap = (body, n) => { body.innerHTML = Array.from({ length: n }, (_, i) => '<div data-s' + i + '></div>').join(''); return Array.from({ length: n }, (_, i) => $('[data-s' + i + ']', body)); };
  const ctl = (k, vi, en, min, max, step, val, unit) => '<label class="olab__ctl"><span>' + pr(vi, en) + ' <output data-o="' + k + '">' + fmt(val, step < 1 ? 1 : 0) + '</output>' + (unit || '') + '</span><input type="range" data-p="' + k + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '" aria-label="' + vi + ' / ' + en + '"></label><label class="olab__ctl"><span>' + pr('Hoặc nhập số', 'Or type') + '</span><input type="number" data-n="' + k + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '" style="width:6em" aria-label="' + vi + ' (số / number)"></label>';
  function bindCtl(rt, P, onChange) {                                   // thanh trượt ↔ ô số đồng bộ hai chiều
    rt.addEventListener('input', (e) => {
      const k = e.target.dataset && (e.target.dataset.p || e.target.dataset.n); if (!k || e.target.value === '') return;
      const sl = $('[data-p="' + k + '"]', rt), nu = $('[data-n="' + k + '"]', rt); if (!sl) return; const v = clamp(+e.target.value, +sl.min, +sl.max);
      P[k] = v; if (e.target === sl) nu.value = v; else sl.value = v; $('[data-o="' + k + '"]', rt).textContent = fmt(v, +sl.step < 1 ? 1 : 0); onChange(k);
    });
  }
  const setCtl = (rt, P, k, v) => { P[k] = v; const sl = $('[data-p="' + k + '"]', rt), nu = $('[data-n="' + k + '"]', rt), o = $('[data-o="' + k + '"]', rt); if (sl) { sl.value = v; nu.value = v; o.textContent = fmt(v, +sl.step < 1 ? 1 : 0); } };
  const loop = (rt, step) => { let vis = true, on = false, last = 0; const tick = (ts) => { if (!rt.isConnected) { on = false; return; } const dt = Math.min(0.05, (ts - last) / 1000); last = ts; if (step(dt) !== false && vis) requestAnimationFrame(tick); else on = false; }; const kick = () => { if (on || !vis || REDUCED) return; on = true; last = performance.now(); requestAnimationFrame(tick); }; if ('IntersectionObserver' in window) new IntersectionObserver((es) => { vis = es[0].isIntersecting; if (vis) kick(); }).observe(rt); return { kick }; };
  /* kéo thả chung: phần tử [data-drag] → vùng [data-drop]; nhấn chọn rồi nhấn vùng cũng được (bàn phím: Enter) */
  function drag(rt, cb) {
    let sel = null, st = null;
    const mark = () => $$('[data-drag]', rt).forEach((c) => c.classList.toggle('is-sel', sel === c.dataset.drag));
    const zoneAt = (x, y) => { let h = null; $$('[data-drop]', rt).forEach((z) => { const r = z.getBoundingClientRect(), i = x >= r.left && x <= r.right && y >= r.top && y <= r.bottom; z.classList.toggle('is-over', i); if (i) h = z; }); return h; };
    rt.addEventListener('pointerdown', (e) => { const c = e.target.closest('[data-drag]'); if (!c || e.button > 0) return; st = { id: c.dataset.drag, x: e.clientX, y: e.clientY, moved: false, gh: null }; });
    const mv = (e) => { if (!st) return; if (!st.moved && Math.abs(e.clientX - st.x) + Math.abs(e.clientY - st.y) > 8) { st.moved = true; st.gh = document.createElement('div'); st.gh.className = 'mol__ghost'; st.gh.style.background = 'var(--paper)'; st.gh.style.color = 'var(--ink)'; st.gh.textContent = (rt.querySelector('[data-drag="' + st.id + '"]') || {}).dataset ? (rt.querySelector('[data-drag="' + st.id + '"]').dataset.g || st.id) : st.id; document.body.appendChild(st.gh); }
      if (st.gh) { st.gh.style.left = e.clientX + 'px'; st.gh.style.top = e.clientY + 'px'; zoneAt(e.clientX, e.clientY); } };
    const up = (e) => { if (!st) return; const d = st; st = null; if (d.gh) d.gh.remove(); if (d.moved) { const z = zoneAt(e.clientX, e.clientY); $$('[data-drop]', rt).forEach((q) => q.classList.remove('is-over')); if (z) { sel = null; mark(); cb(d.id, z.dataset.drop, z); } } };
    const cn = () => { if (st && st.gh) st.gh.remove(); st = null; $$('[data-drop]', rt).forEach((q) => q.classList.remove('is-over')); };
    document.addEventListener('pointermove', mv); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', cn);
    const tidy = () => { if (!rt.isConnected) { document.removeEventListener('pointermove', mv); document.removeEventListener('pointerup', up); document.removeEventListener('pointercancel', cn); } };
    const iv = setInterval(() => { if (!rt.isConnected) { tidy(); clearInterval(iv); } }, 4000);
    rt.addEventListener('click', (e) => { const c = e.target.closest('[data-drag]'), z = e.target.closest('[data-drop]'); if (c) { sel = sel === c.dataset.drag ? null : c.dataset.drag; mark(); return; } if (z && sel) { const id = sel; sel = null; mark(); cb(id, z.dataset.drop, z); } });
    rt.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('[data-drag],[data-drop]')) { e.preventDefault(); e.stopPropagation(); e.target.click(); } else if (/^Arrow/.test(e.key) && e.target.closest && e.target.closest('[data-drag],[data-drop]')) e.stopPropagation(); });
    return { clear() { sel = null; mark(); }, selected: () => sel };
  }
  const cardOf = (g, name, extra) => '<div class="mol__card"><div class="mol__full">' + M.drawFull(g, { maxW: 200, unit: 30 }) + '</div><b class="mol__f">' + M.formula(g).uni + '</b>' + (name ? '<small>' + name + '</small>' : '') + (extra || '') + '</div>';
  const smi = (s) => M.fromSmiles(s);
  const ui = { wrap, ctl, bindCtl, setCtl, loop, drag, cardOf, smi, REDUCED, $, $$ };
  root.MolLab = Object.assign(root.MolLab || {}, { ui, board, analyse, classText, SAFE, NOTE, CLR });
})();
