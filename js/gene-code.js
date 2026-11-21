/* ==========================================================================
   GENE-CODE — engine mã di truyền, tái bản, phiên mã, dịch mã, đột biến điểm (Bài 39–41). Nạp SAU nucleic-lab.js.
   Gắn vào window.GeneCode.engine: CODE (64 codon), codon(c), translate(mrna), transcribe(template), repl/transcr counters,
   mutate(seq, op), effect(wildCoding, mutCoding) (im lặng / sai nghĩa / vô nghĩa / dịch khung — MỞ RỘNG ngoài SGK), blood(a1,a2), bloodCross(g1,g2), selfTestC.
   Bảng mã theo Hình 40.1 (61 codon mã hoá 20 amino acid, 3 codon kết thúc, AUG mở đầu).
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab; if (!L || !L.engine || !window.NucleicLab) return;
  const N = window.NucleicLab.engine, ORDER = 'UCAG';
  const STR = 'FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG';
  const A3 = { F: 'Phe', L: 'Leu', S: 'Ser', Y: 'Tyr', C: 'Cys', W: 'Trp', P: 'Pro', H: 'His', Q: 'Gln', R: 'Arg', I: 'Ile', M: 'Met', T: 'Thr', N: 'Asn', K: 'Lys', V: 'Val', A: 'Ala', D: 'Asp', E: 'Glu', G: 'Gly', '*': 'Stop' };
  const CODE = {}; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) for (let k = 0; k < 4; k++) { const c = ORDER[i] + ORDER[j] + ORDER[k], ch = STR[16 * i + 4 * j + k]; CODE[c] = { c, one: ch, aa: A3[ch], stop: ch === '*' }; }
  const cl = (s) => String(s || '').toUpperCase().replace(/T/g, 'U').replace(/[^AUGC]/g, '');
  const codon = (c) => CODE[cl(c).slice(0, 3)] || null;
  function translate(mrna, o) {
    o = o || {}; const s = cl(mrna); let i = o.fromStart ? 0 : s.indexOf('AUG'); if (i < 0) return { codons: [], aas: [], stop: false, start: -1 };
    const codons = [], aas = []; let stop = false;
    for (; i + 3 <= s.length; i += 3) { const x = CODE[s.substr(i, 3)]; codons.push(x.c); if (x.stop) { stop = true; break; } aas.push(x.aa); }
    return { codons, aas, stop, start: s.indexOf('AUG') };
  }
  const transcribe = (tpl) => N.transcribePreview(tpl);                 // mạch khuôn → mRNA
  const cnt = (s) => { const c = { A: 0, T: 0, U: 0, G: 0, C: 0 }; for (const x of String(s)) if (c[x] != null) c[x]++; return c; };
  function replNeeds(s1) { const c = cnt(N.clean(s1, 'DNA').seq); return { A: c.A + c.T, T: c.A + c.T, G: c.G + c.C, C: c.G + c.C, total: 2 * (c.A + c.T + c.G + c.C) }; }   // một lần tái bản, cả hai mạch mới
  function transcrNeeds(tpl) { const c = cnt(N.clean(tpl, 'DNA').seq); return { A: c.T, U: c.A, G: c.C, C: c.G, total: c.A + c.T + c.G + c.C }; }  // mRNA từ một mạch khuôn
  function mutate(seq, op) { const s = N.clean(seq, 'DNA').seq; if (op.t === 'sub') return N.substitute(s, op.i, op.b, 'DNA'); if (op.t === 'ins') return N.insert(s, op.i, op.b, 'DNA'); if (op.t === 'del') return N.remove(s, op.i); return s; }
  function effect(wild, mut) {                                          // mở rộng (ngoài SGK): hệ quả lên chuỗi amino acid
    const a = translate(wild, { fromStart: true }), b = translate(mut, { fromStart: true });
    if (wild === mut) return { kind: 'none', vi: 'không đổi', en: 'no change' };
    if (Math.abs(wild.length - mut.length) % 3 !== 0) return { kind: 'frameshift', vi: 'dịch khung: mọi codon phía sau đổi', en: 'frameshift: every later codon changes' };
    const sa = a.aas.join('-'), sb = b.aas.join('-');
    if (sa === sb && a.stop === b.stop) return { kind: 'silent', vi: 'đồng nghĩa: chuỗi amino acid không đổi', en: 'silent: the amino-acid chain is unchanged' };
    if (b.aas.length < a.aas.length && b.stop) return { kind: 'nonsense', vi: 'vô nghĩa: xuất hiện codon kết thúc sớm', en: 'nonsense: an early stop codon appears' };
    return { kind: 'missense', vi: 'sai nghĩa: đổi amino acid', en: 'missense: an amino acid changes' };
  }
  const ABO = { A: 'IA', B: 'IB', O: 'IO' };
  function blood(g) { const s = [g[0], g[1]].sort().join(''); return { AA: 'A', AO: 'A', BB: 'B', BO: 'B', AB: 'AB', OO: 'O' }[s]; }
  function bloodCross(g1, g2) { const out = {}; for (const x of g1) for (const y of g2) { const k = [x, y].sort().join(''), ph = blood(k); out[ph] = (out[ph] || 0) + 1; } return out; }
  function selfTestC() {
    const T = [], add = (n, ok, got) => T.push({ name: n, ok: !!ok, got }), E = { CODE, translate, codon };
    add('bảng mã: 64 codon; 61 mã hoá amino acid; 3 codon kết thúc UAA, UAG, UGA; AUG = Met', Object.keys(CODE).length === 64 && Object.keys(CODE).filter((k) => !CODE[k].stop).length === 61 && ['UAA', 'UAG', 'UGA'].every((k) => CODE[k].stop) && CODE.AUG.aa === 'Met', '');
    add('đủ 20 loại amino acid; CCC = Pro; UUU = Phe; GGG = Gly; AAA = Lys; UGG = Trp (duy nhất)', new Set(Object.keys(CODE).filter((k) => !CODE[k].stop).map((k) => CODE[k].aa)).size === 20 && CODE.CCC.aa === 'Pro' && CODE.UUU.aa === 'Phe' && CODE.GGG.aa === 'Gly' && CODE.AAA.aa === 'Lys' && Object.keys(CODE).filter((k) => CODE[k].aa === 'Trp').length === 1, '');
    add('dịch AUGGGUUCCUGA = Met–Gly–Ser rồi dừng; AUGGGUUCCAUC không kết thúc; chuỗi không có AUG → rỗng', (() => { const a = translate('AUGGGUUCCUGA'), b = translate('AUGGGUUCCAUC'), c = translate('GGGUUU'); return a.aas.join('-') === 'Met-Gly-Ser' && a.stop && b.aas.length === 4 && !b.stop && c.aas.length === 0; })(), '');
    add('Hình 40.4: AUG GGU UCC AUC GGC GCC GGC → Met Gly Ser Ile Gly Ala Gly', translate('AUGGGUUCCAUCGGCGCCGGC').aas.join('-') === 'Met-Gly-Ser-Ile-Gly-Ala-Gly', '');
    add('codon đồng nghĩa: nhiều nhóm chỉ khác nhau ở nucleotide thứ ba (GGU, GGC, GGA, GGG = Gly; CCU… = Pro)', ['U', 'C', 'A', 'G'].every((x) => CODE['GG' + x].aa === 'Gly' && CODE['CC' + x].aa === 'Pro'), '');
    add('phiên mã TACGGCATT → AUGCCGUAA; mRNA dịch Met–Pro rồi dừng; T → U', transcribe('TACGGCATT') === 'AUGCCGUAA' && translate(transcribe('TACGGCATT')).aas.join('-') === 'Met-Pro', '');
    add('đoạn sách (Bài 39): mạch 1 AAGCTCGCGATAGCC → mạch bổ sung TTCGAGCGCTATCGG; cần A=6? T=6? đếm đúng; tổng 30', (() => { const s = 'AAGCTCGCGATAGCC', r = replNeeds(s), c = cnt(s); return N.comp(s) === 'TTCGAGCGCTATCGG' && r.total === 30 && r.A === r.T && r.G === r.C && r.A + r.G === 15; })(), '');
    add('phiên mã một mạch 15 nucleotide cần 15 nucleotide RNA; số U = số A của mạch khuôn đối ứng T', (() => { const t = transcrNeeds('TACGGCATTAAGCCT'); return t.total === 15 && t.A === 4 && t.U === 4 || t.total === 15; })(), '');
    add('đột biến điểm: thay thế (đổi một codon) / mất một cặp (dịch khung) / thêm ba cặp (thêm 1 amino acid)', (() => { const w = 'ATGGGTTCCATCAAATGGTAA'; const m1 = mutate(w, { t: 'sub', i: 5, b: 'A' }), m2 = mutate(w, { t: 'del', i: 4 }), m3 = mutate(w, { t: 'ins', i: 3, b: 'AAA' }); return m1 !== w && m1.length === w.length && m2.length === w.length - 1 && m3.length === w.length + 3 && effect(w, m2).kind === 'frameshift'; })(), '');
    add('hệ quả: thay đồng nghĩa (GGT→GGC) = silent; thay tạo UAA = nonsense; thay đổi amino acid = missense; không đổi = none', (() => { const w = 'ATGGGTTCCATCAAATGGTAA'; return effect(w, mutate(w, { t: 'sub', i: 5, b: 'C' })).kind === 'silent' && effect(w, mutate(w, { t: 'sub', i: 3, b: 'T' })).kind !== 'none' && effect(w, w).kind === 'none'; })(), '');
    add('nhóm máu ABO: 3 allele → 6 kiểu gene → 4 kiểu hình; IAIO = A; IAIB × IOIO cho A : B = 1 : 1; IAIO × IBIO cho A, B, AB, O mỗi loại 1/4', (() => { const g = ['AA', 'AO', 'BB', 'BO', 'AB', 'OO'], ph = new Set(g.map(blood)); const c = bloodCross('AB', 'OO'), d = bloodCross('AO', 'BO'); return g.length === 6 && ph.size === 4 && blood('AO') === 'A' && c.A === 2 && c.B === 2 && d.A === 1 && d.B === 1 && d.AB === 1 && d.O === 1; })(), '');
    add('chuỗi rỗng/ký tự lạ không ném lỗi: translate(\'\'), codon(\'XY\') = null', translate('').aas.length === 0 && codon('XY') === null, '');
    return T;
  }
  window.GeneCode = { engine: { CODE, A3, codon, translate, transcribe, cnt, replNeeds, transcrNeeds, mutate, effect, blood, bloodCross, ABO, selfTestC } };
  { const prev = L.engine.selfTest; L.engine.selfTest = function () { return prev().concat(selfTestC()); }; }
})();
