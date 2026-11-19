/* ==========================================================================
   CIRCUIT LAB — phòng thí nghiệm mạch điện một chiều (KHTN 9, Bài 11–12). Nạp SAU optics-lab.js.
   1. Engine thuần dữ liệu `CircuitLab.engine`: giải mạch bằng phương pháp thế nút (MNA)
        solve(circuit), rEqSeries, rEqParallel, wireR, colourCode, selfTest
   2. Giao diện: `board` (bảng lắp mạch kéo thả: linh kiện, dây nối, đồng hồ có vạch chia, bảng số liệu, đồ thị),
      `ohmLab`, `wireLab`, `bandsLab`, `compareLab` ; đăng ký vào window.LabSims (id circ-*).
   Quy ước: mỗi linh kiện có các chân `id.a`, `id.b` (và `id.c` với biến trở). Dây nối nối hai chân (điện trở 0).
   Nguồn: chân a là cực dương. Dòng điện của linh kiện tính theo chiều a → b.
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab; if (!L) return;
  const { makeDrag, fmt, pr, raf, clamp } = L;
  const $ = (s, r) => r.querySelector(s), $$ = (s, r) => Array.from(r.querySelectorAll(s));
  let uid = 0;

  /* ------------------------------------------------------------------ ENGINE */
  const GMIN = 1e-9, R_WIRE = 1e-4, R_VOLT = 1e7, R_AMM = 1e-4;
  const pinsOf = (t) => (t === 'rheo' ? ['a', 'b', 'c'] : ['a', 'b']);
  function solveLinear(A, b) {
    const n = b.length;
    for (let i = 0; i < n; i++) {
      let p = i; for (let r = i + 1; r < n; r++) if (Math.abs(A[r][i]) > Math.abs(A[p][i])) p = r;
      if (Math.abs(A[p][i]) < 1e-15) return null;
      [A[i], A[p]] = [A[p], A[i]]; [b[i], b[p]] = [b[p], b[i]];
      for (let r = i + 1; r < n; r++) { const f = A[r][i] / A[i][i]; if (f) { for (let c = i; c < n; c++) A[r][c] -= f * A[i][c]; b[r] -= f * b[i]; } }
    }
    const x = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) { let s = b[i]; for (let c = i + 1; c < n; c++) s -= A[i][c] * x[c]; x[i] = s / A[i][i]; }
    return x;
  }
  /* circuit = { elements:[{id,type,value,frac,closed}], wires:[['id.a','id.b'],...] }
     type: src (value = V), res (Ω), lamp (Ω, vr = hiệu điện thế định mức), rheo (value = R0 Ω, frac 0..1), sw (closed), amm, vol */
  function solve(c) {
    const out = { ok: true, warn: [], el: {}, nodeV: {}, Rtd: null };
    const parent = {}; const find = (x) => { if (parent[x] == null) parent[x] = x; while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
    c.elements.forEach((e) => pinsOf(e.type).forEach((p) => find(e.id + '.' + p)));
    (c.wires || []).forEach((w) => { if (parent[w[0]] != null && parent[w[1]] != null) parent[find(w[0])] = find(w[1]); });
    const roots = []; const idx = {}; Object.keys(parent).forEach((k) => { const r = find(k); if (idx[r] == null) { idx[r] = roots.length; roots.push(r); } });
    const nid = (pin) => idx[find(pin)];
    const srcs = c.elements.filter((e) => e.type === 'src');
    let gnd = srcs.length ? nid(srcs[0].id + '.b') : 0;
    // phát hiện chập: hai cực của nguồn cùng nút
    for (const s of srcs) if (nid(s.id + '.a') === nid(s.id + '.b')) { out.ok = false; out.warn.push('short'); }
    if (!out.ok) { c.elements.forEach((e) => { out.el[e.id] = { I: 0, V: 0 }; }); return out; }
    const N = roots.length, vmap = []; let k = 0; for (let i = 0; i < N; i++) vmap[i] = i === gnd ? -1 : k++;
    const nv = k, M = nv + srcs.length, A = Array.from({ length: M }, () => new Array(M).fill(0)), b = new Array(M).fill(0);
    const G = (i, j, g) => { const a = vmap[i], c2 = vmap[j]; if (a >= 0) { A[a][a] += g; if (c2 >= 0) A[a][c2] -= g; } if (c2 >= 0) { A[c2][c2] += g; if (a >= 0) A[c2][a] -= g; } };
    for (let i = 0; i < N; i++) if (vmap[i] >= 0) A[vmap[i]][vmap[i]] += GMIN;
    const rOf = [];
    c.elements.forEach((e) => {
      const na = nid(e.id + '.a'), nb = nid(e.id + '.b');
      if (e.type === 'res' || e.type === 'lamp') { const R = Math.max(e.value, 1e-6); rOf.push([e, na, nb, R]); G(na, nb, 1 / R); }
      else if (e.type === 'amm') { rOf.push([e, na, nb, R_AMM]); G(na, nb, 1 / R_AMM); }
      else if (e.type === 'vol') { rOf.push([e, na, nb, R_VOLT]); G(na, nb, 1 / R_VOLT); }
      else if (e.type === 'sw') { if (e.closed) { rOf.push([e, na, nb, R_WIRE]); G(na, nb, 1 / R_WIRE); } else rOf.push([e, na, nb, Infinity]); }
      else if (e.type === 'rheo') { const nc = nid(e.id + '.c'), f = clamp(e.frac == null ? 0.5 : e.frac, 0, 1), R1 = Math.max(f * e.value, 1e-3), R2 = Math.max((1 - f) * e.value, 1e-3); e._r = [[na, nc, R1], [nc, nb, R2]]; G(na, nc, 1 / R1); G(nc, nb, 1 / R2); }
    });
    srcs.forEach((s, j) => { const na = vmap[nid(s.id + '.a')], nb = vmap[nid(s.id + '.b')], row = nv + j; if (na >= 0) { A[na][row] += 1; A[row][na] += 1; } if (nb >= 0) { A[nb][row] -= 1; A[row][nb] -= 1; } b[row] = s.value; });
    const x = solveLinear(A, b);
    if (!x) { out.ok = false; out.warn.push('singular'); c.elements.forEach((e) => { out.el[e.id] = { I: 0, V: 0 }; }); return out; }
    const V = (n) => (vmap[n] >= 0 ? x[vmap[n]] : 0);
    c.elements.forEach((e) => { out.el[e.id] = { I: 0, V: V(nid(e.id + '.a')) - V(nid(e.id + '.b')) }; });
    rOf.forEach(([e, na, nb, R]) => { const v = V(na) - V(nb); out.el[e.id].V = v; out.el[e.id].I = isFinite(R) ? v / R : 0; });
    c.elements.filter((e) => e.type === 'rheo').forEach((e) => { const v = V(nid(e.id + '.a')) - V(nid(e.id + '.b')); out.el[e.id].V = v; out.el[e.id].I = (V(nid(e.id + '.a')) - V(nid(e.id + '.c'))) / Math.max(e._r[0][2], 1e-3); });
    srcs.forEach((s, j) => { out.el[s.id].I = -x[nv + j]; out.el[s.id].V = s.value; });   // dòng ra khỏi cực dương theo chiều ngoài mạch: a → b trong nguồn là âm
    // kiểm tra mắc sai
    c.elements.forEach((e) => {
      const o = out.el[e.id];
      if (e.type === 'amm' && Math.abs(o.I) > 20) { out.warn.push('amm-parallel:' + e.id); o.over = true; }
      if (e.type === 'vol' && Math.abs(o.V) > 1e-6) { /* bình thường */ }
      if (e.type === 'lamp') { const P = o.V * o.I, Pr = (e.vr || 2.5) * (e.vr || 2.5) / e.value; o.P = P; o.bright = clamp(P / Pr, 0, 2); o.burn = o.V > 1.6 * (e.vr || 2.5); }
      if (e.type === 'res') o.P = o.V * o.I;
    });
    const ms = srcs.map((s) => Math.abs(out.el[s.id].I)); if (ms.some((i) => i > 20)) { out.warn.push('overload'); out.ok = false; }
    const vols = c.elements.filter((e) => e.type === 'vol'); vols.forEach((e) => { const o = out.el[e.id]; const col = rOf.find((r) => r[0] === e); });
    // vôn kế mắc nối tiếp: dòng trong vôn kế rất nhỏ nhưng vôn kế chiếm gần hết điện áp nguồn
    c.elements.filter((e) => e.type === 'vol').forEach((e) => { const o = out.el[e.id]; if (srcs.length && Math.abs(o.V) > 0.9 * Math.abs(srcs[0].value) && Math.abs(o.I) < 1e-4 && c.elements.filter((q) => q.type !== 'vol' && q.type !== 'src' && q.type !== 'sw').some((q) => Math.abs(out.el[q.id].I) < 1e-5)) out.warn.push('vol-series:' + e.id); });
    return out;
  }
  const rEqSeries = (rs) => rs.reduce((a, b) => a + b, 0);
  const rEqParallel = (rs) => 1 / rs.reduce((a, b) => a + 1 / b, 0);
  const wireR = (rho, l, S) => rho * l / S;
  const CODE = { den: [0, 0], nau: [1, 1], do: [2, 2], cam: [3, 3], vang: [4, 4], luc: [5, 5], lam: [6, 6], tim: [7, 7], xam: [8, 8], trang: [9, 9] };
  const BAND = [['đen', 'black', '#1a1a1a', 0], ['nâu', 'brown', '#8a5a2b', 1], ['đỏ', 'red', '#e0393e', 2], ['da cam', 'orange', '#f08a24', 3], ['vàng', 'yellow', '#f2c500', 4], ['lục', 'green', '#2fbf7a', 5], ['lam', 'blue', '#2a7be0', 6], ['tím', 'violet', '#7b3fe4', 7], ['xám', 'grey', '#8f98ab', 8], ['trắng', 'white', '#ffffff', 9]];
  const MULT4 = [['vàng ánh kim', 'gold', '#c9a227', -1, 0.05], ['bạc', 'silver', '#b9bfcc', -2, 0.10]];
  /* d1, d2: chỉ số 0..9 của vòng 1, 2; m: số mũ (0..9, hoặc −1/−2 cho vàng ánh kim/bạc); tol: 0.05 hoặc 0.10 */
  function colourCode(d1, d2, m, tol) { const R = (d1 * 10 + d2) * Math.pow(10, m); return { R, tol: R * tol, text: R }; }
  function valueToBands(R) { let m = 0, v = R; if (v < 10) { while (v < 10 && m > -2) { v *= 10; m--; } } while (v >= 100 && m < 9) { v /= 10; m++; } const n = Math.round(v); return { d1: Math.floor(n / 10), d2: n % 10, m }; }

  const E = {
    solve, rEqSeries, rEqParallel, wireR, colourCode, valueToBands, BAND, MULT4,
    /* điện trở suất ở 20 °C (Ω·m), Bảng 11.3 */
    RHO: { 'Bạc': 1.47e-8, 'Đồng': 1.70e-8, 'Vàng': 2.35e-8, 'Nhôm': 2.80e-8, 'Tungsten': 5.50e-8, 'Sắt': 12.00e-8, 'Nikelin': 40.00e-8, 'Manganin': 43.00e-8, 'Constantan': 50.00e-8, 'Nicrom': 110.00e-8 },
    /* dựng mạch nhanh: nguồn + danh sách (nối tiếp) */
    build(spec) { return spec; },
    selfTest() {
      const T = [], near = (a, b, e) => Math.abs(a - b) <= (e == null ? 1e-6 : e), add = (n, ok, got) => T.push({ name: n, ok: !!ok, got });
      const circ = (els, wires) => ({ elements: els, wires });
      let r;
      // nối tiếp 2 Ω + 3 Ω, I = 1 A ⇒ U = 5 V
      r = solve(circ([{ id: 's', type: 'src', value: 5 }, { id: 'r1', type: 'res', value: 2 }, { id: 'r2', type: 'res', value: 3 }], [['s.a', 'r1.a'], ['r1.b', 'r2.a'], ['r2.b', 's.b']]));
      add('nối tiếp 2 Ω + 3 Ω: I = 1 A, U₁ = 2 V, U₂ = 3 V (R_tđ = 5 Ω)', r.ok && near(r.el.r1.I, 1, 1e-6) && near(r.el.r1.V, 2, 1e-6) && near(r.el.r2.V, 3, 1e-6) && near(rEqSeries([2, 3]), 5), r.el.r1.I);
      // song song 20 Ω // 40 Ω ở 24 V
      r = solve(circ([{ id: 's', type: 'src', value: 24 }, { id: 'r1', type: 'res', value: 20 }, { id: 'r2', type: 'res', value: 40 }], [['s.a', 'r1.a'], ['s.a', 'r2.a'], ['r1.b', 's.b'], ['r2.b', 's.b']]));
      add('song song 20 Ω // 40 Ω ở 24 V: R_tđ ≈ 13,33 Ω; I₁ = 1,2 A; I₂ = 0,6 A; I = 1,8 A', r.ok && near(rEqParallel([20, 40]), 40 / 3, 1e-9) && near(r.el.r1.I, 1.2, 1e-6) && near(r.el.r2.I, 0.6, 1e-6) && near(r.el.s.I, 1.8, 1e-6), r.el.s.I);
      // Bảng 12.1 (nối tiếp, 12 V)
      const ser = (a, b) => { const q = solve(circ([{ id: 's', type: 'src', value: 12 }, { id: 'r1', type: 'res', value: a }, { id: 'r2', type: 'res', value: b }, { id: 'a1', type: 'amm' }], [['s.a', 'a1.a'], ['a1.b', 'r1.a'], ['r1.b', 'r2.a'], ['r2.b', 's.b']])); return q.el.a1.I; };
      add('Bảng 12.1: 6+10 Ω ⇒ 0,75 A; 6+16 Ω ⇒ 0,545 A (sách ghi 0,54); 10+16 Ω ⇒ 0,46 A', near(ser(6, 10), 0.75, 1e-3) && near(ser(6, 16), 0.5454, 1e-3) && near(ser(10, 16), 0.4615, 1e-3), ser(6, 16));
      // Bảng 12.2 (song song, 6 V, 10 Ω và 6 Ω)
      r = solve(circ([{ id: 's', type: 'src', value: 6 }, { id: 'a1', type: 'amm' }, { id: 'r1', type: 'res', value: 10 }, { id: 'r2', type: 'res', value: 6 }, { id: 'a2', type: 'amm' }, { id: 'a3', type: 'amm' }],
        [['s.a', 'a1.a'], ['a1.b', 'a2.a'], ['a1.b', 'a3.a'], ['a2.b', 'r1.a'], ['a3.b', 'r2.a'], ['r1.b', 's.b'], ['r2.b', 's.b']]));
      add('Bảng 12.2: A₁ = 1,60 A; A₂ = 0,60 A; A₃ = 1,00 A (I = I₁ + I₂)', near(r.el.a1.I, 1.6, 2e-3) && near(r.el.a2.I, 0.6, 2e-3) && near(r.el.a3.I, 1.0, 2e-3), [r.el.a1.I, r.el.a2.I, r.el.a3.I].join(','));
      // định luật Ohm, Bảng 11.2 với R = 6 Ω
      const ohm = (U) => solve(circ([{ id: 's', type: 'src', value: U }, { id: 'r', type: 'res', value: 6 }, { id: 'a', type: 'amm' }], [['s.a', 'a.a'], ['a.b', 'r.a'], ['r.b', 's.b']])).el.a.I;
      add('Bảng 11.2 (R = 6 Ω): I = 0; 0,5; 1,0; 1,5; 2,0 A ứng với U = 0; 3; 6; 9; 12 V', [0, 3, 6, 9, 12].every((U, i) => near(ohm(U), [0, 0.5, 1, 1.5, 2][i], 1e-4)), ohm(6));
      add('bài 1: 12 Ω, 0,5 A ⇒ U = 6 V; 2 V ↔ 0,4 A ⇒ R = 5 Ω, 0,8 A ⇒ U = 4 V', near(12 * 0.5, 6) && near(2 / 0.4, 5, 1e-9) && near(5 * 0.8, 4, 1e-9), null);
      add('R = ρ·l/S: dây đồng 150 m, 2 mm², ρ = 1,7·10⁻⁸ ⇒ 1,275 Ω; R₁/R₂ = 1/4 (l₁ = l₂/2, S₁ = 2S₂)', near(wireR(1.7e-8, 150, 2e-6), 1.275, 1e-9) && near(wireR(1, 0.5, 2) / wireR(1, 1, 1), 0.25, 1e-12), wireR(1.7e-8, 150, 2e-6));
      const cc = colourCode(4, 7, 0, 0.05); add('điện trở vòng màu vàng–tím–đen–vàng ánh kim = 47 ± 2,35 Ω', near(cc.R, 47) && near(cc.tol, 2.35, 1e-9), cc.R);
      const vb = valueToBands(47); add('giá trị → vòng màu: 47 Ω ⇒ vàng, tím, đen; 4,7 kΩ ⇒ vàng, tím, đỏ', vb.d1 === 4 && vb.d2 === 7 && vb.m === 0 && (() => { const q = valueToBands(4700); return q.d1 === 4 && q.d2 === 7 && q.m === 2; })(), JSON.stringify(vb));
      // mạch hở
      r = solve(circ([{ id: 's', type: 'src', value: 6 }, { id: 'r', type: 'res', value: 6 }, { id: 'k', type: 'sw', closed: false }], [['s.a', 'k.a'], ['k.b', 'r.a'], ['r.b', 's.b']]));
      add('công tắc hở: I = 0, không NaN', r.ok && near(r.el.r.I, 0, 1e-9) && !Number.isNaN(r.el.r.I), r.el.r.I);
      // chập
      r = solve(circ([{ id: 's', type: 'src', value: 6 }, { id: 'r', type: 'res', value: 6 }], [['s.a', 's.b']]));
      add('chập nguồn (dây nối hai cực): báo short, không NaN/∞', !r.ok && r.warn.includes('short') && Number.isFinite(r.el.r.I), r.warn.join());
      // ampe kế song song với nguồn
      r = solve(circ([{ id: 's', type: 'src', value: 12 }, { id: 'a', type: 'amm' }], [['s.a', 'a.a'], ['a.b', 's.b']]));
      add('ampe kế mắc trực tiếp vào nguồn: cảnh báo, giá trị hữu hạn', r.warn.some((w) => w.startsWith('amm-parallel') || w === 'overload') && Number.isFinite(r.el.a.I), r.warn.join());
      // vôn kế mắc nối tiếp
      r = solve(circ([{ id: 's', type: 'src', value: 6 }, { id: 'v', type: 'vol' }, { id: 'r', type: 'res', value: 6 }], [['s.a', 'v.a'], ['v.b', 'r.a'], ['r.b', 's.b']]));
      add('vôn kế mắc nối tiếp: dòng gần 0 và cảnh báo', r.warn.some((w) => w.startsWith('vol-series')) && Math.abs(r.el.r.I) < 1e-5, r.warn.join());
      // vôn kế song song với R đọc U = IR
      r = solve(circ([{ id: 's', type: 'src', value: 12 }, { id: 'r', type: 'res', value: 6 }, { id: 'v', type: 'vol' }], [['s.a', 'r.a'], ['r.b', 's.b'], ['r.a', 'v.a'], ['r.b', 'v.b']]));
      add('vôn kế mắc song song với R đọc đúng U = 12 V', near(r.el.v.V, 12, 1e-3), r.el.v.V);
      // hỗn hợp: R1 nối tiếp (R2 // R3)
      r = solve(circ([{ id: 's', type: 'src', value: 12 }, { id: 'r1', type: 'res', value: 4 }, { id: 'r2', type: 'res', value: 6 }, { id: 'r3', type: 'res', value: 12 }], [['s.a', 'r1.a'], ['r1.b', 'r2.a'], ['r1.b', 'r3.a'], ['r2.b', 's.b'], ['r3.b', 's.b']]));
      add('hỗn hợp 4 Ω + (6 Ω // 12 Ω) ⇒ R_tđ = 8 Ω, I = 1,5 A, U₂ = 6 V', near(r.el.r1.I, 1.5, 1e-6) && near(r.el.r2.V, 6, 1e-6), r.el.r1.I);
      // biến trở chia thế: 12 V, R0 = 20 Ω, con chạy 0,5, không tải ⇒ U_AC = 6 V
      r = solve(circ([{ id: 's', type: 'src', value: 12 }, { id: 'p', type: 'rheo', value: 20, frac: 0.5 }, { id: 'v', type: 'vol' }], [['s.a', 'p.a'], ['p.b', 's.b'], ['v.a', 'p.c'], ['v.b', 'p.b']]));
      add('biến trở chia thế f = 0,5, không tải: U = 6 V', near(r.el.v.V, 6, 1e-3), r.el.v.V);
      // độ sáng đèn ∝ P
      const lamp = (R) => solve(circ([{ id: 's', type: 'src', value: 12 }, { id: 'r', type: 'res', value: R }, { id: 'l', type: 'lamp', value: 6.25, vr: 2.5 }], [['s.a', 'r.a'], ['r.b', 'l.a'], ['l.b', 's.b']])).el.l;
      add('điện trở càng lớn đèn càng tối (độ sáng ∝ P)', lamp(60).bright < lamp(30).bright && lamp(30).bright < lamp(20).bright, lamp(60).bright + '<' + lamp(30).bright);
      return T;
    }
  };
  L.circuit = E;
  L.engine.circuit = E;
  const prevSelf = L.engine.selfTest; L.engine.selfTest = function () { return prevSelf().concat(E.selfTest()); };
  window.CircuitLab = { engine: E };
})();
