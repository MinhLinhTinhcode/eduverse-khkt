/* ==========================================================================
   NUCLEIC LAB — engine DNA / RNA (Bài 38; dùng lại cho Bài 39–40). Không đụng DOM. Nạp SAU gen-lab.js, TRƯỚC mol-w36/37/38.
   Gắn vào window.NucleicLab.engine:
     clean(seq, mode)   chuẩn hoá chuỗi (chữ hoa, bỏ khoảng trắng / gạch nối / ′; ký tự lạ bị loại và được báo) — không treo với chuỗi rất dài
     comp(seq, mode)    mạch bổ sung CÙNG THỨ TỰ vị trí (A–T, G–C; RNA: A–U);  revcomp(seq)  đọc ngược 5′→3′
     count, percent, gcContent, hBonds (A–T = 2, G–C = 3: BỔ SUNG, giả thiết), stabilityIndex (định tính, mở rộng)
     lengthA(n) = 3,4 Å × n;  turns(n) = n / 10;  combos(n) = 4ⁿ;  PITCH = 34 Å, DIAM = 20 Å, BP_PER_TURN = 10
     pairStatus(b1, b2, mode)  {matched, hBonds, geometry:'vừa'|'lệch'}  (cặp lệch = mismatch: MỞ RỘNG ngoài SGK)
     Editor(seq, mode)  substitute / insert / remove / invert / duplicate / swapPair, undo / redo, nhật ký;  diff(a, b)
     transcribePreview(template)  mạch khuôn → mRNA (A→U, T→A, G→C, C→G): CHỈ CHUẨN BỊ, dùng ở Bài 39
     GENES (allele hư cấu → tính trạng), phenoOf(geneId, seq)  — MỞ RỘNG, hư cấu, không phải gene thật
     family(seed)  hồ sơ giả lập cho gel (huyết thống / hiện trường) — dữ liệu GIẢ, không dùng thông tin thật
   Mọi phần ngoài SGK (cặp lệch, độ ổn định, đột biến, sửa lỗi, gene hư cấu) được giao diện gắn nhãn “mở rộng”.
   CÁCH THÊM gene hư cấu mới: thêm vào GENES {id, name, ref, alleles:[{id, seq, vi, en}], rule(seq)} rồi chạy selfTest (kiểm tra nhất quán).
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab;
  if (!L || !L.engine) return;
  const PITCH = 34, DIAM = 20, BP_PER_TURN = 10, BP_LEN = PITCH / BP_PER_TURN;     // 3,4 Å
  const HB = { AT: 2, TA: 2, AU: 2, UA: 2, GC: 3, CG: 3 };
  const BASES = { DNA: 'ATGC', RNA: 'AUGC' };
  const PAIR = { DNA: { A: 'T', T: 'A', G: 'C', C: 'G' }, RNA: { A: 'U', U: 'A', G: 'C', C: 'G' } };
  const MAXLEN = 200000;
  const modeOf = (m) => (m === 'RNA' ? 'RNA' : 'DNA');
  function clean(seq, mode) {
    mode = modeOf(mode);
    const ok = BASES[mode], bad = [];
    let out = '', s = typeof seq === 'string' ? seq : '';
    if (s.length > MAXLEN) s = s.slice(0, MAXLEN);
    for (let i = 0; i < s.length; i++) {
      const ch = s[i].toUpperCase();
      if (ok.indexOf(ch) >= 0) out += ch;
      else if (!/[\s\-–—′'`.,0-9]/.test(ch) && bad.length < 20) bad.push(ch);
    }
    return { seq: out, bad };
  }
  function comp(seq, mode) { mode = modeOf(mode); const m = PAIR[mode], c = clean(seq, mode).seq; let o = ''; for (let i = 0; i < c.length; i++) o += m[c[i]]; return o; }
  const rev = (s) => { let o = ''; for (let i = s.length - 1; i >= 0; i--) o += s[i]; return o; };
  const revcomp = (seq, mode) => rev(comp(seq, mode));
  function count(seq, mode) { const c = clean(seq, mode).seq, r = { A: 0, T: 0, U: 0, G: 0, C: 0 }; for (let i = 0; i < c.length; i++) r[c[i]]++; return r; }
  function percent(seq, mode) { const c = count(seq, mode), n = clean(seq, mode).seq.length, r = {}; Object.keys(c).forEach((k) => (r[k] = n ? (100 * c[k]) / n : 0)); return r; }
  function gcContent(seq, mode) { const c = count(seq, mode), n = c.A + c.T + c.U + c.G + c.C; return n ? (100 * (c.G + c.C)) / n : 0; }
  function hBonds(seq, mode) { const c = count(seq, mode); return 2 * (c.A + c.T + c.U) + 3 * (c.G + c.C); }     // mỗi vị trí của mạch gốc ứng với một cặp bổ sung
  function stabilityIndex(seq, mode) { const n = clean(seq, mode).seq.length; return n ? (100 * hBonds(seq, mode)) / (3 * n) : 0; }   // 66,7 (toàn A–T) … 100 (toàn G–C); định tính
  const lengthA = (n) => BP_LEN * Math.max(0, +n || 0), turns = (n) => Math.max(0, +n || 0) / BP_PER_TURN, combos = (n) => Math.pow(4, Math.max(0, Math.min(500, Math.floor(+n) || 0)));
  function pairStatus(b1, b2, mode) {
    mode = modeOf(mode); b1 = String(b1 || '').toUpperCase(); b2 = String(b2 || '').toUpperCase();
    const ok = BASES[mode];
    if (ok.indexOf(b1) < 0 || ok.indexOf(b2) < 0) return { matched: false, hBonds: 0, geometry: 'lệch', invalid: true };
    const m = PAIR[mode][b1] === b2;
    return { matched: m, hBonds: m ? HB[b1 + b2] : 0, geometry: m ? 'vừa' : 'lệch' };
  }
  /* ------------------------------------------------------------ chỉnh sửa chuỗi */
  const rngOk = (s, i) => Number.isInteger(i) && i >= 0 && i <= s.length;
  function substitute(s, i, b, mode) { const c = clean(b, mode).seq[0]; if (!c || !Number.isInteger(i) || i < 0 || i >= s.length) return s; return s.slice(0, i) + c + s.slice(i + 1); }
  function insert(s, i, b, mode) { const c = clean(b, mode).seq; if (!c || !rngOk(s, i) || s.length + c.length > MAXLEN) return s; return s.slice(0, i) + c + s.slice(i); }
  function remove(s, i) { if (!Number.isInteger(i) || i < 0 || i >= s.length) return s; return s.slice(0, i) + s.slice(i + 1); }
  function invert(s, i, j) { if (!rngOk(s, i) || !rngOk(s, j)) return s; if (i > j) { const t = i; i = j; j = t; } return s.slice(0, i) + rev(s.slice(i, j + 1)) + s.slice(j + 1); }
  function duplicate(s, i, j) { if (!rngOk(s, i) || !rngOk(s, j)) return s; if (i > j) { const t = i; i = j; j = t; } const seg = s.slice(i, j + 1); if (s.length + seg.length > MAXLEN) return s; return s.slice(0, j + 1) + seg + s.slice(j + 1); }
  function swapPair(s, i, mode) { mode = modeOf(mode); if (!Number.isInteger(i) || i < 0 || i >= s.length) return s; const m = PAIR[mode]; return s.slice(0, i) + (m[s[i]] || s[i]) + s.slice(i + 1); }
  function diff(a, b) {
    a = String(a || ''); b = String(b || '');
    if (a === b) return { type: 'none', count: 0, at: -1 };
    if (a.length === b.length) {
      let first = -1, last = -1, cnt = 0;
      for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) { if (first < 0) first = i; last = i; cnt++; }
      if (cnt === 1) return { type: 'substitution', count: 1, at: first };
      if (b.slice(first, last + 1) === rev(a.slice(first, last + 1))) return { type: 'inversion', count: cnt, at: first };
      return { type: 'substitution', count: cnt, at: first };
    }
    const lo = a.length < b.length ? a : b, hi = a.length < b.length ? b : a, k = hi.length - lo.length;
    let p = 0; while (p < lo.length && lo[p] === hi[p]) p++;
    let q = 0; while (q < lo.length - p && lo[lo.length - 1 - q] === hi[hi.length - 1 - q]) q++;
    if (p + q < lo.length) return { type: 'complex', count: k, at: p };
    if (a.length > b.length) return { type: 'deletion', count: k, at: p };
    const seg = hi.slice(p, p + k);
    const dup = (p >= k && lo.slice(p - k, p) === seg) || lo.slice(p, p + k) === seg;
    return { type: dup ? 'duplication' : 'insertion', count: k, at: p };
  }
  function Editor(seq, mode) {
    mode = modeOf(mode);
    const st = { mode, seq: clean(seq, mode).seq, past: [], future: [], log: [] };
    const apply = (name, ns, text) => { if (ns === st.seq) return false; st.past.push({ seq: st.seq, log: st.log.length }); if (st.past.length > 500) st.past.shift(); st.future.length = 0; st.log.push({ op: name, text, d: diff(st.seq, ns) }); st.seq = ns; return true; };
    return {
      state: st,
      get seq() { return st.seq; },
      substitute(i, b) { const o = st.seq[i]; return apply('substitute', substitute(st.seq, i, b, mode), `vị trí ${i + 1}: ${o} → ${String(b).toUpperCase()}`); },
      insert(i, b) { return apply('insert', insert(st.seq, i, b, mode), `chèn ${String(b).toUpperCase()} trước vị trí ${i + 1}`); },
      remove(i) { return apply('delete', remove(st.seq, i), `xoá vị trí ${i + 1}`); },
      invert(i, j) { return apply('invert', invert(st.seq, i, j), `đảo đoạn ${Math.min(i, j) + 1}–${Math.max(i, j) + 1}`); },
      duplicate(i, j) { return apply('duplicate', duplicate(st.seq, i, j), `lặp đoạn ${Math.min(i, j) + 1}–${Math.max(i, j) + 1}`); },
      swapPair(i) { return apply('swapPair', swapPair(st.seq, i, mode), `đổi cặp ở vị trí ${i + 1}`); },
      undo() { const p = st.past.pop(); if (!p) return false; st.future.push({ seq: st.seq, log: st.log.slice(p.log) }); st.seq = p.seq; st.log.length = p.log; return true; },
      redo() { const f = st.future.pop(); if (!f) return false; st.past.push({ seq: st.seq, log: st.log.length }); st.seq = f.seq; f.log.forEach((x) => st.log.push(x)); return true; },
      reset(s) { st.seq = clean(s == null ? '' : s, mode).seq; st.past.length = 0; st.future.length = 0; st.log.length = 0; }
    };
  }
  function transcribePreview(template) { const m = { A: 'U', T: 'A', G: 'C', C: 'G' }, c = clean(template, 'DNA').seq; let o = ''; for (let i = 0; i < c.length; i++) o += m[c[i]]; return o; }   // Bài 39
  /* ------------------------------------------------------------ gene hư cấu (S7, mở rộng) */
  const GENES = {
    flower: { id: 'flower', name: ['màu hoa (hư cấu)', 'flower colour (fictional)'], ref: 'ATGCCTAAG', alleles: [{ id: 'A', seq: 'ATGCCTAAG', vi: 'hoa tím', en: 'purple flower' }, { id: 'a', seq: 'ATGCCTTAG', vi: 'hoa trắng', en: 'white flower' }],
      rule: (s) => (s.length === 9 && s.slice(0, 3) === 'ATG' && s[6] === 'A' ? 'A' : 'a') },
    tail: { id: 'tail', name: ['hình đuôi (hư cấu)', 'tail shape (fictional)'], ref: 'ATGGGCTC', alleles: [{ id: 'A', seq: 'ATGGGCTC', vi: 'đuôi xoắn', en: 'curly tail' }, { id: 'a', seq: 'ATGGGATC', vi: 'đuôi thẳng', en: 'straight tail' }],
      rule: (s) => (s.length === 8 && s.slice(0, 3) === 'ATG' && s[5] === 'C' ? 'A' : 'a') },
    body: { id: 'body', name: ['màu thân (hư cấu)', 'body colour (fictional)'], ref: 'ATGCGCCA', alleles: [{ id: 'A', seq: 'ATGCGCCA', vi: 'thân xanh dương', en: 'blue body' }, { id: 'a', seq: 'ATGCGTCA', vi: 'thân cam', en: 'orange body' }],
      rule: (s) => (s.length === 8 && s.slice(0, 3) === 'ATG' && s[5] === 'C' ? 'A' : 'a') }
  };
  function phenoOf(id, seq) { const g = GENES[id]; if (!g) return null; const c = clean(seq, 'DNA').seq, k = g.rule(c), al = g.alleles.find((x) => x.id === k); return { allele: k, vi: al.vi, en: al.en, nonstandard: c !== g.alleles[0].seq && c !== g.alleles[1].seq }; }
  /* ------------------------------------------------------------ hồ sơ giả lập cho gel (dữ liệu GIẢ) */
  function prng(seed) { let a = (seed >>> 0) || 1; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const LOCI = 6, RANGE = [5, 16];
  function family(seed) {
    const r = prng(seed || 1), pick = () => RANGE[0] + Math.floor(r() * (RANGE[1] - RANGE[0] + 1));
    const person = () => { const p = []; for (let i = 0; i < LOCI; i++) { let a = pick(), b = pick(); p.push([Math.min(a, b), Math.max(a, b)]); } return p; };
    const child = (m, d) => m.map((pm, i) => { const a = pm[r() < 0.5 ? 0 : 1], b = d[i][r() < 0.5 ? 0 : 1]; return [Math.min(a, b), Math.max(a, b)]; });
    const mom = person(), dad = person(), stranger = person(), kid1 = child(mom, dad), kid2 = child(mom, dad);
    let guard = 0; while (guard++ < 50 && match(stranger, kid1).shared >= LOCI) stranger[0] = [pick(), pick()].sort((x, y) => x - y);   // bảo đảm người lạ không trùng hoàn toàn
    const suspects = [person(), person(), person()], culprit = Math.floor(r() * 3), scene = suspects[culprit].map((x) => x.slice());
    return { mom, dad, kids: [kid1, kid2], stranger, suspects, culprit, scene };
  }
  const alleleSet = (p) => { const s = []; p.forEach((x, i) => s.push(i + ':' + x[0], i + ':' + x[1])); return s; };
  function match(a, b) { let shared = 0; a.forEach((x, i) => { if (x[0] === b[i][0] && x[1] === b[i][1]) shared++; }); return { shared, total: a.length }; }
  function isChildOf(kid, mom, dad) { return kid.every((p, i) => { const ok = (x, y) => (x === mom[i][0] || x === mom[i][1]) && (y === dad[i][0] || y === dad[i][1]); return ok(p[0], p[1]) || ok(p[1], p[0]); }); }
  /* ------------------------------------------------------------ kiểm thử */
  function selfTestN() {
    const T = [], add = (n, ok, got) => T.push({ name: n, ok: !!ok, got }), E = NL, near = (a, b, e) => Math.abs(a - b) <= e;
    add('bổ sung của ATGCTGATCACGT = TACGACTAGTGCA (cùng thứ tự); revcomp đúng; RNA: AUGC ↔ UACG', E.comp('ATGCTGATCACGT') === 'TACGACTAGTGCA' && E.revcomp('ATGCTGATCACGT') === 'ACGTGATCAGCAT' && E.comp('AUGC', 'RNA') === 'UACG', E.comp('ATGCTGATCACGT'));
    add('34 Å / 10 cặp = 3,4 Å; 1 000 cặp = 3 400 Å = 340 nm; 1 500 cặp = 5 100 Å; số chu kì = n / 10', near(E.lengthA(10), 34, 1e-9) && near(E.lengthA(1000), 3400, 1e-9) && near(E.lengthA(1500), 5100, 1e-9) && near(E.turns(1000), 100, 1e-9) && E.PITCH / E.BP_PER_TURN === 3.4 && near(E.PITCH / E.BP_PER_TURN * 10, 34, 1e-9), '');
    add('4ⁿ: n = 1 → 4; n = 2 → 16; n = 10 → 1 048 576; n = 20 → 1,0995e12; đầu vào lạ không NaN', E.combos(1) === 4 && E.combos(2) === 16 && E.combos(10) === 1048576 && near(E.combos(20), Math.pow(4, 20), 1) && !isNaN(E.combos('x')) && E.combos(-4) === 1, '');
    add('pairStatus: đủ 16 tổ hợp DNA — chỉ A–T, T–A, G–C, C–G khớp (liên kết hydrogen 2/2/3/3); 12 cặp còn lại lệch, 0 liên kết', (() => { const B = 'ATGC'; let ok = true, m = 0; for (const x of B) for (const y of B) { const s = E.pairStatus(x, y); const good = (x + y === 'AT' || x + y === 'TA' || x + y === 'GC' || x + y === 'CG'); if (s.matched !== good) ok = false; if (good) { m++; if (s.hBonds !== (x === 'A' || x === 'T' ? 2 : 3) || s.geometry !== 'vừa') ok = false; } else if (s.hBonds !== 0 || s.geometry !== 'lệch') ok = false; } return ok && m === 4; })(), '');
    add('pairStatus RNA: 16 tổ hợp — chỉ A–U, U–A, G–C, C–G khớp; T không hợp lệ trong RNA', (() => { const B = 'AUGC'; let ok = true; for (const x of B) for (const y of B) { const s = E.pairStatus(x, y, 'RNA'), good = ['AU', 'UA', 'GC', 'CG'].indexOf(x + y) >= 0; if (s.matched !== good) ok = false; } return ok && E.pairStatus('T', 'A', 'RNA').invalid === true && E.pairStatus('A', 'U', 'DNA').matched === false; })(), '');
    add('đếm A,T,G,C; %GC; liên kết hydrogen (A–T = 2, G–C = 3, giả thiết); ATGC → 10; chỉ số ổn định tăng theo tỉ lệ G–C', (() => { const c = E.count('AATTGC'); return c.A === 2 && c.T === 2 && c.G === 1 && c.C === 1 && near(E.gcContent('AATTGC'), 100 / 3, 1e-9) && E.hBonds('ATGC') === 10 && E.stabilityIndex('GGGC') > E.stabilityIndex('GATC') && E.stabilityIndex('AAAA') < E.stabilityIndex('GCGC') && E.hBonds('') === 0; })(), '');
    add('diff chi tiết: ATGCTGATC → ATGCAGATC = thay 1; → ATGACTGATC = thêm 1; → ATGTGATC = mất 1; → ATGTCGATC = đảo; → ATGCTGCTGATC = lặp', (() => { const a = 'ATGCTGATC'; return E.diff(a, 'ATGCAGATC').type === 'substitution' && E.diff(a, 'ATGCAGATC').count === 1 && E.diff(a, 'ATGACTGATC').type === 'insertion' && E.diff(a, 'ATGTGATC').type === 'deletion' && E.diff(a, 'ATGTCGATC').type === 'inversion' && E.diff(a, 'ATGCTGCTGATC').type === 'duplication' && E.diff(a, a).type === 'none'; })(), '');
    add('Editor: thay/chèn/xoá/đảo/lặp đúng; hoàn tác và làm lại không lệch trạng thái; nhật ký ghi đủ', (() => { const e = E.Editor('ATGCTGATC'); e.substitute(4, 'A'); const s1 = e.seq; e.insert(0, 'C'); e.remove(2); e.invert(1, 3); e.duplicate(0, 1); const s5 = e.seq, n = e.state.log.length; for (let i = 0; i < 5; i++) e.undo(); const back = e.seq; for (let i = 0; i < 5; i++) e.redo(); return s1 === 'ATGCAGATC' && back === 'ATGCTGATC' && e.seq === s5 && n === 5 && e.state.log.length === 5 && e.undo() && e.undo() && e.redo() && e.seq !== back; })(), '');
    add('Editor: thao tác sai (vị trí ngoài vùng, ký tự lạ, chuỗi rỗng) không đổi chuỗi và không ném lỗi', (() => { const e = E.Editor('ATGC'); e.substitute(9, 'A'); e.substitute(1, 'X'); e.insert(99, 'A'); e.insert(1, 'Z'); e.remove(-1); e.remove(7); e.invert(-2, 40); e.duplicate(7, 9); const z = E.Editor(''); z.remove(0); z.undo(); z.redo(); return e.seq === 'ATGC' && e.state.log.length === 0 && z.seq === '' && E.diff('', '').type === 'none'; })(), '');
    add('đột biến một cặp: mất một cặp làm mọi vị trí phía sau dịch chuyển; thay thế giữ nguyên độ dài', (() => { const e = E.Editor('ATGCTGATCACGT'), a = e.seq; e.remove(3); const b = e.seq; return b.length === a.length - 1 && b.slice(3) === a.slice(4) && E.diff(a, b).type === 'deletion'; })(), '');
    add('transcribePreview(ATGC) = UACG (mạch khuôn → mRNA; dùng ở Bài 39)', E.transcribePreview('ATGC') === 'UACG' && E.transcribePreview('') === '', '');
    add('chuỗi rỗng, ký tự lạ, rất dài (> 200 000) không treo và không NaN', (() => { const t0 = Date.now(); const big = 'ATGC'.repeat(60000); const r = E.clean(big), c = E.count(big), g = E.gcContent(''), p = E.percent('', 'RNA'); const z = E.clean('A T-G′C xyz 12'); return r.seq.length === 200000 && c.A === 50000 && g === 0 && p.A === 0 && z.seq === 'ATGC' && z.bad.join('') === 'XYZ' && E.comp(null) === '' && E.clean(undefined).seq === '' && (Date.now() - t0) < 3000; })(), '');
    add('gene hư cấu: allele A → hoa tím, đổi MỘT nucleotide (vị trí 7: A → T) → hoa trắng; bảng ánh xạ nhất quán cho mọi gene', (() => { const g = E.GENES; const f = E.phenoOf('flower', g.flower.alleles[0].seq), w = E.phenoOf('flower', 'ATGCCTTAG'); const consistent = Object.keys(g).every((k) => g[k].alleles.every((a) => E.phenoOf(k, a.seq).allele === a.id) && g[k].alleles[0].seq !== g[k].alleles[1].seq && g[k].alleles[0].seq.length === g[k].alleles[1].seq.length && E.diff(g[k].alleles[0].seq, g[k].alleles[1].seq).type === 'substitution' && E.diff(g[k].alleles[0].seq, g[k].alleles[1].seq).count === 1); return f.allele === 'A' && f.vi === 'hoa tím' && w.allele === 'a' && w.vi === 'hoa trắng' && consistent && E.phenoOf('nope', 'ATG') === null; })(), '');
    add('hồ sơ giả lập: con mang một nửa allele của bố và một nửa của mẹ; người lạ thường không; hiện trường khớp đúng một nghi phạm; cùng hạt giống → cùng hồ sơ', (() => { let ok = true; for (let s = 1; s <= 40; s++) { const f = E.family(s); if (!f.kids.every((k) => E.isChildOf(k, f.mom, f.dad))) ok = false; const m = f.suspects.map((x) => E.match(x, f.scene).shared === 6); if (m.filter(Boolean).length < 1 || !m[f.culprit]) ok = false; } return ok && JSON.stringify(E.family(9)) === JSON.stringify(E.family(9)) && JSON.stringify(E.family(9)) !== JSON.stringify(E.family(10)); })(), '');
    return T;
  }
  const NL = window.NucleicLab = { engine: { clean, comp, revcomp, count, percent, gcContent, hBonds, stabilityIndex, lengthA, turns, combos, pairStatus, substitute, insert, remove, invert, duplicate, swapPair, diff, Editor, transcribePreview, GENES, phenoOf, family, match, isChildOf, PITCH, DIAM, BP_PER_TURN, BP_LEN, HB, BASES, PAIR, selfTestN } };
  Object.keys(NL.engine).forEach((k) => { NL[k] = NL.engine[k]; });
  { const prev = L.engine.selfTest; L.engine.selfTest = function () { return prev().concat(selfTestN()); }; }
})();
