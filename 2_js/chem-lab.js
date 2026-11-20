/* ==========================================================================
   CHEM LAB — Kim loại (KHTN 9, Bài 18; dùng lại cho Bài 19+). Nạp SAU energy-lab.js.
   1. Engine `ChemLab.engine` (dữ liệu thuần, không phụ thuộc giao diện):
        ELEMENTS (khối lượng mol), METALS (dữ liệu minh hoạ), parseFormula, molarMass,
        balance(reactants, products) — cân bằng bằng đại số tuyến tính (ma trận nguyên tố, khử Gauss phân số),
        check(eq) — bảo toàn nguyên tử và khối lượng, react(metal, reagent) — tra phản ứng hoặc "không phản ứng",
        ACTIVITY (dãy hoạt động hoá học — TỔNG HỢP, sách chưa in), stoich (mol, khối lượng, thể tích khí, Vm cấu hình được).
   2. Widget (LabSims): chem-phys, chem-o2, chem-cl, chem-water, chem-hcl, chem-zn, chem-salt, chem-free, chem-use.
   CÁCH THÊM CHẤT / PHẢN ỨNG (Bài 19+):
     • Chất mới: thêm công thức vào ELEMENTS nếu có nguyên tố mới; kim loại mới thêm vào METALS (sym, vi, en, val, rank, màu, tính chất).
     • Phản ứng mới: thêm một dòng vào OVERRIDE (khoá 'M|R') nếu khác quy tắc chung, hoặc thêm thuốc thử mới vào REAGENTS
       và một nhánh trong build(); hệ số luôn do balance() tính, không viết tay. Rồi thêm một dòng kiểm tra vào selfTest().
   Mọi giá trị định lượng là MÔ HÌNH MINH HOẠ (điều kiện chuẩn: Vm mặc định 24,79 L/mol ở 25 °C, 1 bar).
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab; if (!L) return;
  const { fmt, pr, clamp } = L;
  const $ = (s, r) => r.querySelector(s), $$ = (s, r) => Array.from(r.querySelectorAll(s));
  const REDUCED = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  let uid = 0;
  /* ----------------------------------------------------------------- DỮ LIỆU */
  const ELEMENTS = { H: 1.008, C: 12.011, N: 14.007, O: 15.999, Na: 22.990, Mg: 24.305, Al: 26.982, S: 32.06, Cl: 35.45, K: 39.098, Ca: 40.078, Cr: 51.996, P: 30.974, Pb: 207.2, Si: 28.085, Mn: 54.938, Ni: 58.693, Bi: 208.98, Sn: 118.71, Cd: 112.41, Br: 79.904, F: 18.998, Fe: 55.845, Cu: 63.546, Zn: 65.38, Ag: 107.87, W: 183.84, Hg: 200.59, Au: 196.97 };
  /* rank: mức hoạt động minh hoạ (10 mạnh nhất). cond: dẻo?; sigma: độ dẫn điện tương đối so với Cu = 100 (minh hoạ, đối chiếu Bảng 11.3); k: dẫn nhiệt tương đối; mp: nhiệt độ nóng chảy °C (làm tròn) */
  const METALS = {
    Na: { vi: 'natri (sodium)', en: 'sodium', val: 1, rank: 9, mal: 1, sigma: 32, k: 15, mp: 98, color: '#d9dde6', note: 'mềm, cắt được bằng dao' },
    K: { vi: 'kali (potassium)', en: 'potassium', val: 1, rank: 10, mal: 1, sigma: 22, k: 10, mp: 63, color: '#d9dde6', note: 'mềm' },
    Ca: { vi: 'canxi (calcium)', en: 'calcium', val: 2, rank: 8, mal: 1, sigma: 28, k: 20, mp: 842, color: '#cfd3da', note: '' },
    Mg: { vi: 'magnesium', en: 'magnesium', val: 2, rank: 7, mal: 1, sigma: 38, k: 30, mp: 650, color: '#cdd2da', note: '' },
    Al: { vi: 'nhôm (aluminium)', en: 'aluminium', val: 3, rank: 6, mal: 1, sigma: 61, k: 55, mp: 660, color: '#c9ced6', note: '' },
    Zn: { vi: 'kẽm (zinc)', en: 'zinc', val: 2, rank: 5, mal: 1, sigma: 28, k: 30, mp: 420, color: '#b8c4cf', note: '' },
    Fe: { vi: 'sắt (iron)', en: 'iron', val: 2, rank: 4, mal: 1, sigma: 17, k: 20, mp: 1538, color: '#8f949c', note: '' },
    Pb: { vi: 'chì (lead)', en: 'lead', val: 2, rank: 3.8, mal: 1, sigma: 8, k: 8, mp: 327, color: '#7f8691', note: '' },
    Cu: { vi: 'đồng (copper)', en: 'copper', val: 2, rank: 2, mal: 1, sigma: 100, k: 100, mp: 1085, color: '#c9733a', note: '' },
    Ag: { vi: 'bạc (silver)', en: 'silver', val: 1, rank: 1, mal: 1, sigma: 105, k: 107, mp: 962, color: '#e3e6ec', note: '' },
    Au: { vi: 'vàng (gold)', en: 'gold', val: 3, rank: 0, mal: 1, sigma: 70, k: 80, mp: 1064, color: '#e9c43a', note: '' },
    Hg: { vi: 'thuỷ ngân (mercury)', en: 'mercury', val: 2, rank: 1.5, mal: 0, sigma: 2, k: 2, mp: -39, color: '#cfd5de', note: 'lỏng ở nhiệt độ thường' },
    W: { vi: 'tungsten', en: 'tungsten', val: 6, rank: 1.2, mal: 0, sigma: 31, k: 40, mp: 3422, color: '#7d8288', note: '' },
    Cr: { vi: 'chromium', en: 'chromium', val: 3, rank: 4.5, mal: 0, sigma: 13, k: 15, mp: 1907, color: '#b6bcc6', note: '' }
  };
  const NONMETAL = { glass: ['thuỷ tinh', 'glass'], wood: ['gỗ', 'wood'], rubber: ['cao su', 'rubber'], ceramic: ['sứ', 'porcelain'], brick: ['gạch', 'brick'] };
  const ACTIVITY = ['K', 'Na', 'Ca', 'Mg', 'Al', 'Zn', 'Fe', 'Pb', 'H', 'Cu', 'Ag', 'Au'];       // DÃY HOẠT ĐỘNG HOÁ HỌC — in trong sách Bài 19 (tr. 93)
  const REAGENTS = {
    O2: { f: 'O2', vi: 'khí oxygen O₂', en: 'oxygen gas O₂', col: '#e6f2ff' },
    Cl2: { f: 'Cl2', vi: 'khí chlorine Cl₂', en: 'chlorine gas Cl₂', col: '#d8e57a' },
    S: { f: 'S', vi: 'lưu huỳnh (sulfur) S', en: 'sulfur S', col: '#f2e04a' },
    H2O: { f: 'H2O', vi: 'nước (nhiệt độ thường)', en: 'water (room temperature)', col: '#dcefff' },
    steam: { f: 'H2O', vi: 'hơi nước (nhiệt độ cao)', en: 'steam (high temperature)', col: '#eef6ff' },
    HCl: { f: 'HCl', vi: 'dung dịch hydrochloric acid HCl', en: 'hydrochloric acid solution HCl', col: '#eef2f6' },
    CuSO4: { f: 'CuSO4', vi: 'dung dịch copper(II) sulfate CuSO₄', en: 'copper(II) sulfate solution CuSO₄', col: '#4aa0e8' },
    AgNO3: { f: 'AgNO3', vi: 'dung dịch silver nitrate AgNO₃', en: 'silver nitrate solution AgNO₃', col: '#eef2f6' },
    H2SO4: { f: 'H2SO4', vi: 'dung dịch sulfuric acid loãng H₂SO₄', en: 'dilute sulfuric acid H₂SO₄', col: '#eef2f6' },
    ZnNO32: { f: 'Zn(NO3)2', vi: 'dung dịch zinc nitrate Zn(NO₃)₂', en: 'zinc nitrate solution Zn(NO₃)₂', col: '#eef2f6' },
    CuNO32: { f: 'Cu(NO3)2', vi: 'dung dịch copper(II) nitrate Cu(NO₃)₂', en: 'copper(II) nitrate solution Cu(NO₃)₂', col: '#4aa0e8' },
    FeSO4: { f: 'FeSO4', vi: 'dung dịch iron(II) sulfate FeSO₄', en: 'iron(II) sulfate solution FeSO₄', col: '#d5ecd0' }
  };
  /* ----------------------------------------------------------------- CÔNG THỨC & CÂN BẰNG */
  function parseFormula(f) {
    let i = 0;
    (function () { })();
    function grp() { const m = {}; while (i < f.length) { const c = f[i]; if (c === '(') { i++; const sub = grp(); if (f[i] !== ')') throw new Error('thiếu )'); i++; const n = num(); for (const k in sub) m[k] = (m[k] || 0) + sub[k] * n; } else if (c === ')') break; else if (/[A-Z]/.test(c)) { let s = c; i++; while (i < f.length && /[a-z]/.test(f[i])) s += f[i++]; if (!(s in ELEMENTS)) throw new Error('nguyên tố lạ ' + s); m[s] = (m[s] || 0) + num(); } else throw new Error('ký tự lạ ' + c); } return m; }
    function num() { let s = ''; while (i < f.length && /[0-9]/.test(f[i])) s += f[i++]; return s ? +s : 1; }
    const r = grp(); if (i < f.length) throw new Error('dư ký tự'); return r;
  }
  const molarMass = (f) => { const m = parseFormula(f); let s = 0; for (const k in m) s += ELEMENTS[k] * m[k]; return s; };
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  function balance(re, pr_) {
    const sp = re.concat(pr_), ms = sp.map(parseFormula), els = []; ms.forEach((m) => { for (const k in m) if (els.indexOf(k) < 0) els.push(k); });
    const rows = els.map((e) => ms.map((m, j) => [(m[e] || 0) * (j < re.length ? 1 : -1), 1]));     // phân số [tử, mẫu]
    const n = sp.length, R = rows.length, piv = [];
    const add = (a, b) => red([a[0] * b[1] + b[0] * a[1], a[1] * b[1]]), mul = (a, b) => red([a[0] * b[0], a[1] * b[1]]), neg = (a) => [-a[0], a[1]], inv = (a) => red([a[1], a[0]]);
    function red(a) { const g = gcd(a[0], a[1]) || 1; let s = a[1] < 0 ? -1 : 1; return [s * a[0] / g, s * a[1] / g]; }
    let r = 0;
    for (let c = 0; c < n && r < R; c++) { let p = -1; for (let k = r; k < R; k++) if (rows[k][c][0] !== 0) { p = k; break; } if (p < 0) continue; [rows[r], rows[p]] = [rows[p], rows[r]]; const iv = inv(rows[r][c]); rows[r] = rows[r].map((x) => mul(x, iv)); for (let k = 0; k < R; k++) if (k !== r && rows[k][c][0] !== 0) { const f = rows[k][c]; rows[k] = rows[k].map((x, j) => add(x, neg(mul(f, rows[r][j])))); } piv.push(c); r++; }
    const free = []; for (let c = 0; c < n; c++) if (piv.indexOf(c) < 0) free.push(c);
    if (free.length !== 1) return null;                              // không có nghiệm duy nhất (phương trình sai hoặc quá tự do)
    const fc = free[0], sol = new Array(n).fill(null).map(() => [0, 1]); sol[fc] = [1, 1];
    piv.forEach((pc, k) => { sol[pc] = neg(rows[k][fc]); });
    let L2 = 1; sol.forEach((x) => { L2 = L2 * x[1] / gcd(L2, x[1]); });
    let co = sol.map((x) => x[0] * (L2 / x[1])); const g = co.reduce((a, b) => gcd(a, b), 0) || 1; co = co.map((x) => x / g);
    if (co.some((x) => x <= 0)) return null; return co;
  }
  function check(eq) {                                                // eq: {re:[{f,n}], pr:[{f,n}]}
    const tally = (side) => { const t = {}; let mass = 0; side.forEach((s) => { const m = parseFormula(s.f); for (const k in m) t[k] = (t[k] || 0) + m[k] * s.n; mass += molarMass(s.f) * s.n; }); return { t, mass }; };
    const a = tally(eq.re), b = tally(eq.pr); const ks = Object.keys(a.t).concat(Object.keys(b.t)); const ok = ks.every((k) => (a.t[k] || 0) === (b.t[k] || 0));
    return { atoms: ok, mass: Math.abs(a.mass - b.mass) < 1e-6, left: a.mass, right: b.mass };
  }
  /* ----------------------------------------------------------------- PHẢN ỨNG */
  const gcdI = gcd;
  function ionic(M, n, A, m, poly) { const g = gcdI(n, m), a = m / g, b = n / g; return M + (a > 1 ? a : '') + (b > 1 ? (poly ? '(' + A + ')' : A) + b : A); }
  function ionic2(M, n, A, m, poly) { const g = gcdI(n, m), a = m / g, b = n / g; return M + (a > 1 ? a : '') + (b > 1 ? (poly ? '(' + A + ')' : A) + b : A); }
  const ANION = { O: [2, 0], Cl: [1, 0], S: [2, 0], OH: [1, 1], NO3: [1, 1], SO4: [2, 1] };
  const salt = (M, n, A) => ionic2(M, n, A, ANION[A][0], ANION[A][1]);
  const HOT = { H2SO4: '', ZnNO32: '', CuNO32: '', O2: 't°', Cl2: 't°', S: 't°', steam: 't° cao', H2O: '', HCl: '', CuSO4: '', AgNO3: '', FeSO4: '' };
  const OBS = {
    'Fe|O2': ['Dây sắt nóng đỏ cháy sáng trong bình oxygen, tạo khói màu nâu đỏ (oxide sắt từ Fe₃O₄).', 'The red-hot iron wire burns brightly in oxygen, forming reddish-brown fumes (iron oxide Fe₃O₄).'],
    'Al|O2': ['Bột nhôm rắc lên ngọn lửa cháy sáng, tạo chất rắn màu trắng Al₂O₃.', 'Aluminium powder sprinkled in a flame burns brightly and forms white solid Al₂O₃.'],
    'Na|Cl2': ['Natri nóng chảy cháy trong khí chlorine (màu vàng lục), tạo tinh thể muối ăn màu trắng NaCl.', 'Molten sodium burns in chlorine (yellow-green) forming white crystals of table salt NaCl.'],
    'Fe|Cl2': ['Dây sắt nóng đỏ cháy trong khí chlorine, tạo muối iron(III) chloride màu nâu đỏ.', 'Red-hot iron wire burns in chlorine forming reddish-brown iron(III) chloride.'],
    'Na|H2O': ['Natri chạy trên mặt nước, tan dần, có khí thoát ra, toả nhiều nhiệt; dung dịch thành bazơ NaOH.', 'Sodium skims over the water and dissolves, gas bubbles off, much heat is released; NaOH solution forms.'],
    'Fe|CuSO4': ['Đinh sắt phủ lớp đồng màu đỏ; dung dịch xanh lam nhạt dần thành lục nhạt (FeSO₄).', 'The iron nail gets a red copper coating; the blue solution fades to pale green (FeSO₄).'],
    'Cu|AgNO3': ['Dây đồng phủ dần chất rắn màu xám bạc (Ag); dung dịch từ không màu chuyển sang xanh (ion Cu²⁺).', 'The copper wire gets coated with a silvery-grey solid (Ag); the colourless solution turns blue (Cu²⁺ ions).'],
    'Zn|AgNO3': ['Viên kẽm phủ chất rắn màu xám bạc (Ag); dung dịch vẫn không màu (Zn²⁺ không màu).', 'The zinc piece gets a silvery-grey coating (Ag); the solution stays colourless (Zn²⁺ is colourless).'],
    'Ca|H2O': ['Canxi tan, có bọt khí H₂, toả nhiều nhiệt; nước đục vì Ca(OH)₂ ít tan.', 'Calcium dissolves with H₂ bubbles and much heat; the water turns cloudy because Ca(OH)₂ is sparingly soluble.'],
    'Zn|HCl': ['Kẽm tan, có bọt khí H₂ thoát ra đều.', 'Zinc dissolves and bubbles of H₂ rise steadily.'],
    'Fe|HCl': ['Sắt tan chậm, có bọt khí H₂; dung dịch thành iron(II) chloride (lục nhạt).', 'Iron dissolves slowly with H₂ bubbles; iron(II) chloride solution forms (pale green).']
  };
  const BOOK = { 'Cu|AgNO3': 1, 'Zn|AgNO3': 1, 'Mg|H2SO4': 1, 'Zn|H2SO4': 1, 'Ca|H2O': 1, 'Fe|O2': 1, 'Al|O2': 1, 'Na|Cl2': 1, 'Fe|Cl2': 1, 'Cu|Cl2': 1, 'Al|S': 1, 'Na|H2O': 1, 'Zn|steam': 1, 'Fe|steam': 1, 'Fe|HCl': 1, 'Al|HCl': 1, 'Fe|CuSO4': 1, 'Zn|O2': 1, 'Cu|O2': 1, 'Zn|HCl': 1, 'Mg|HCl': 1, 'Mg|S': 1, 'Zn|S': 1 };
  const NOREACT_WHY = {
    O2: ['Kim loại hoạt động hoá học yếu (như vàng) không phản ứng với oxygen.', 'A weakly reactive metal (such as gold) does not react with oxygen.'],
    H2O: ['Kim loại hoạt động yếu (Cu, Ag, Au…) không tác dụng với nước; Mg, Al, Zn, Fe không phản ứng đáng kể ở nhiệt độ thường.', 'Weakly reactive metals (Cu, Ag, Au …) do not react with water; Mg, Al, Zn, Fe show no appreciable reaction at room temperature.'],
    steam: ['Kim loại hoạt động yếu (Cu, Ag, Au…) không tác dụng với hơi nước.', 'Weakly reactive metals (Cu, Ag, Au …) do not react with steam.'],
    HCl: ['Kim loại đứng sau hydrogen trong dãy hoạt động (Cu, Ag, Au…) không đẩy được hydrogen khỏi acid.', 'Metals after hydrogen in the activity series (Cu, Ag, Au …) cannot displace hydrogen from acid.'],
    salt: ['Kim loại yếu hơn kim loại trong muối không đẩy được nó ra khỏi dung dịch muối.', 'A metal weaker than the metal in the salt cannot displace it from solution.'],
    S: ['Không xét trong bài.', 'Not covered in the lesson.']
  };
  const SALTS = { CuSO4: { X: 'Cu', A: 'SO4' }, AgNO3: { X: 'Ag', A: 'NO3' }, FeSO4: { X: 'Fe', A: 'SO4' }, ZnNO32: { X: 'Zn', A: 'NO3' }, CuNO32: { X: 'Cu', A: 'NO3' } };
  const rank = (m) => METALS[m].rank, HR = 3.5;                        // hydrogen xếp giữa Fe (4) và Cu (2)
  function build(M, R) {                                              // trả về {re:[f], pr:[f], cond, note} hoặc null (không phản ứng) hoặc 'out'
    const md = METALS[M], v = md.val, rk = rank(M); let pr_, re;
    if (['Hg', 'W', 'Cr'].indexOf(M) >= 0 && R !== 'O2') return 'out';
    switch (R) {
      case 'O2': if (rk <= 0.5) return null; if (M === 'Ag') return null; if (M === 'Fe') { re = ['Fe', 'O2']; pr_ = ['Fe3O4']; } else { re = [M, 'O2']; pr_ = [salt(M, v, 'O')]; } break;
      case 'Cl2': if (M === 'Au' || M === 'Ag') return 'out'; { const n = M === 'Fe' ? 3 : v; re = [M, 'Cl2']; pr_ = [salt(M, n, 'Cl')]; } break;
      case 'S': if (M === 'Au' || M === 'Ag') return 'out'; re = [M, 'S']; pr_ = [salt(M, v, 'S')]; break;
      case 'H2O': if (['K', 'Na', 'Ca'].indexOf(M) >= 0) { re = [M, 'H2O']; pr_ = [salt(M, v, 'OH'), 'H2']; break; } return null;
      case 'steam': if (rk <= 2) return null; if (['K', 'Na', 'Ca'].indexOf(M) >= 0) { re = [M, 'H2O']; pr_ = [salt(M, v, 'OH'), 'H2']; } else if (M === 'Fe') { re = ['Fe', 'H2O']; pr_ = ['Fe3O4', 'H2']; } else { re = [M, 'H2O']; pr_ = [salt(M, v, 'O'), 'H2']; } break;
      case 'HCl': if (rk <= HR) return null; re = [M, 'HCl']; pr_ = [salt(M, v, 'Cl'), 'H2']; break;
      case 'H2SO4': if (rk <= HR) return null; re = [M, 'H2SO4']; pr_ = [salt(M, v, 'SO4'), 'H2']; break;
      case 'CuSO4': case 'AgNO3': case 'FeSO4': case 'ZnNO32': case 'CuNO32': { const sd = SALTS[R]; if (['K', 'Na', 'Ca'].indexOf(M) >= 0) return 'outw'; if (M === sd.X) return 'self'; if (rk <= rank(sd.X)) return null; re = [M, REAGENTS[R].f]; pr_ = [salt(M, v, sd.A), sd.X]; break; }
      default: return 'out';
    }
    return { re, pr: pr_, cond: HOT[R] };
  }
  const sideOf = (a) => a.map((x) => x); void sideOf;
  function react(M, R) {
    const b = build(M, R);
    if (b === 'outw') return { kind: 'out', why: ['K, Na, Ca tác dụng với nước trước nên không đẩy được kim loại ra khỏi dung dịch muối (ghi chú của sách: “trừ K, Na, Ca…”).', 'K, Na and Ca react with water first, so they do not displace a metal from a salt solution (the book’s note: “except K, Na, Ca …”).'] };
    if (b === 'out') return { kind: 'out', why: ['Phản ứng này không nằm trong phạm vi bài học nên không mô phỏng.', 'This reaction is outside the lesson, so it is not simulated.'] };
    if (b === 'self') return { kind: 'out', why: ['Cùng một kim loại với kim loại trong muối: không có phản ứng để xét.', 'Same metal as in the salt: nothing to compare.'] };
    if (b === null) { const g = R === 'O2' || R === 'S' ? NOREACT_WHY.O2 : (SALTS[R] ? NOREACT_WHY.salt : R === 'H2SO4' ? NOREACT_WHY.HCl : NOREACT_WHY[R]); return { kind: 'none', why: g }; }
    const co = balance(b.re, b.pr); const reac = b.re.map((f, i) => ({ f, n: co[i] })), prod = b.pr.map((f, i) => ({ f, n: co[b.re.length + i] }));
    const key = M + '|' + R, o = OBS[key] || genObs(M, R, b);
    return { kind: 'react', M, R, re: reac, pr: prod, cond: b.cond, obs: o, book: !!BOOK[key], eq: { re: reac, pr: prod } };
  }
  function genObs(M, R, b) {
    const nm = METALS[M].vi.split(' ')[0];
    const by = { O2: ['Kim loại cháy hoặc bị phủ lớp oxide khi đun nóng trong khí oxygen.', 'The metal burns or gets an oxide coating when heated in oxygen.'], Cl2: ['Kim loại cháy trong khí chlorine tạo muối chloride.', 'The metal burns in chlorine forming a chloride salt.'], S: ['Kim loại hoá hợp với lưu huỳnh khi đun nóng, tạo muối sulfide.', 'The metal combines with sulfur on heating, forming a sulfide.'], H2O: ['Kim loại phản ứng mạnh với nước, có khí H₂ và toả nhiều nhiệt.', 'The metal reacts vigorously with water, giving H₂ and much heat.'], steam: ['Ở nhiệt độ cao kim loại tác dụng với hơi nước, tạo oxide (hoặc hydroxide) và khí H₂.', 'At high temperature the metal reacts with steam giving an oxide (or hydroxide) and H₂.'], HCl: ['Kim loại tan, có bọt khí H₂ thoát ra.', 'The metal dissolves and H₂ bubbles are released.'], CuSO4: ['Có chất rắn màu đỏ (đồng) bám lên kim loại; màu xanh của dung dịch nhạt dần.', 'Red solid (copper) coats the metal; the blue colour of the solution fades.'], AgNO3: ['Có chất rắn màu xám bạc (bạc) bám lên kim loại.', 'A silvery-grey solid (silver) coats the metal.'], H2SO4: ['Kim loại tan, có bọt khí H₂ thoát ra.', 'The metal dissolves and H₂ bubbles are released.'], ZnNO32: ['Có chất rắn màu xám (kẽm) bám lên kim loại.', 'A grey solid (zinc) coats the metal.'], CuNO32: ['Có chất rắn màu đỏ (đồng) bám lên kim loại; màu xanh nhạt dần.', 'Red solid (copper) coats the metal; the blue colour fades.'], FeSO4: ['Có chất rắn màu xám (sắt) bám lên kim loại; dung dịch đổi màu.', 'A grey solid (iron) coats the metal; the solution changes colour.'] };
    void nm; void b; return by[R];
  }
  const eqStr = (rx) => rx.re.map((s) => (s.n > 1 ? s.n : '') + uni(s.f)).join(' + ') + ' ' + (rx.cond ? '—' + rx.cond + '→' : '→') + ' ' + rx.pr.map((s) => (s.n > 1 ? s.n : '') + uni(s.f)).join(' + ');
  const SUB = '₀₁₂₃₄₅₆₇₈₉';
  const uni = (f) => f.replace(/[0-9]/g, (d) => SUB[+d]);
  const eqHTML = (rx) => rx.re.map((s) => (s.n > 1 ? s.n : '') + uni(s.f)).join(' + ') + ' <span class="chem__arr"><small>' + (rx.cond || '') + '</small>→</span> ' + rx.pr.map((s) => (s.n > 1 ? s.n : '') + uni(s.f)).join(' + ');
  /* thể tích khí / khối lượng / thể tích dung dịch — Vm cấu hình được */
  const VM = { std: 24.79, stp: 22.4 };
  const stoich = {
    molesFromV: (V_L, Vm) => V_L / Vm, gasV: (n, Vm) => n * Vm,
    znHCl(V_mL, Vm, cM) { const n = V_mL / 1000 / Vm; return { nH2: n, nZn: n, mZn: n * ELEMENTS.Zn, nHCl: 2 * n, vHCl_mL: 2 * n / (cM || 1) * 1000 }; },
    h2Produced(mZn, vHCl_mL, cM, Vm) { const nZn = mZn / ELEMENTS.Zn, nHCl = vHCl_mL / 1000 * cM, nH2 = Math.min(nZn, nHCl / 2); return { nH2, V_mL: nH2 * Vm * 1000, limiting: nZn <= nHCl / 2 ? 'Zn' : 'HCl', nZn, nHCl }; }
  };

  /* ----------------------------------------------------------------- PHẢN ỨNG CÔNG NGHIỆP VÀ KHÁC (Bài 20, 21) */
  const EXTRA = {
    'al-electrolysis': { re: ['Al2O3'], pr: ['Al', 'O2'], cond: 'điện phân nóng chảy, cryolite', vi: 'Tách nhôm từ aluminium oxide', en: 'Extracting aluminium from aluminium oxide', book: 1 },
    'fe-co': { re: ['Fe2O3', 'CO'], pr: ['Fe', 'CO2'], cond: 't°', vi: 'Tách sắt từ iron(III) oxide bằng CO', en: 'Extracting iron from iron(III) oxide with CO', book: 1 },
    'zns-o2': { re: ['ZnS', 'O2'], pr: ['ZnO', 'SO2'], cond: 't°', vi: 'Đốt quặng zinc sulfide', en: 'Roasting zinc sulfide ore', book: 1 },
    'zno-c': { re: ['ZnO', 'C'], pr: ['Zn', 'CO'], cond: 't°', vi: 'Khử zinc oxide bằng carbon', en: 'Reducing zinc oxide with carbon', book: 1 },
    'c-o2': { re: ['C', 'O2'], pr: ['CO2'], cond: 't°', vi: 'Than cốc cháy', en: 'Coke burns', book: 1 },
    'c-co2': { re: ['C', 'CO2'], pr: ['CO'], cond: 't°', vi: 'Tạo khí CO', en: 'Forming CO', book: 1 },
    'co-fe2o3': { re: ['CO', 'Fe2O3'], pr: ['Fe', 'CO2'], cond: 't°', vi: 'CO khử oxide sắt', en: 'CO reduces the iron oxide', book: 1 },
    'caco3': { re: ['CaCO3'], pr: ['CaO', 'CO2'], cond: 't°', vi: 'Đá vôi phân huỷ', en: 'Limestone decomposes', book: 1 },
    'slag': { re: ['CaO', 'SiO2'], pr: ['CaSiO3'], cond: 't°', vi: 'Tạo xỉ', en: 'Slag formation', book: 1 },
    'mg-o2': { re: ['Mg', 'O2'], pr: ['MgO'], cond: 't°', vi: 'Magnesium cháy', en: 'Magnesium burns', book: 1 },
    's-o2': { re: ['S', 'O2'], pr: ['SO2'], cond: 't°', vi: 'Lưu huỳnh cháy', en: 'Sulfur burns', book: 1 },
    'na-cl2': { re: ['Na', 'Cl2'], pr: ['NaCl'], cond: 't°', vi: 'Natri với chlorine', en: 'Sodium with chlorine', book: 1 },
    'na-o2': { re: ['Na', 'O2'], pr: ['Na2O'], cond: 't°', vi: 'Natri cháy trong oxygen', en: 'Sodium burns in oxygen', book: 0 },
    'ca-o2': { re: ['Ca', 'O2'], pr: ['CaO'], cond: 't°', vi: 'Canxi cháy trong oxygen', en: 'Calcium burns in oxygen', book: 0 },
    'c-o2b': { re: ['C', 'O2'], pr: ['CO2'], cond: 't°', vi: 'Carbon cháy trong oxygen', en: 'Carbon burns in oxygen', book: 0 },
    'p-o2': { re: ['P', 'O2'], pr: ['P2O5'], cond: 't°', vi: 'Phosphorus cháy trong oxygen', en: 'Phosphorus burns in oxygen', book: 0 },
    'mg-cl2': { re: ['Mg', 'Cl2'], pr: ['MgCl2'], cond: 't°', vi: 'Magnesium với chlorine', en: 'Magnesium with chlorine', book: 0 }
  };
  function extra(id) { const x = EXTRA[id]; if (!x) return null; const co = balance(x.re, x.pr), reac = x.re.map((f, i) => ({ f, n: co[i] })), prod = x.pr.map((f, i) => ({ f, n: co[x.re.length + i] })); return { id, re: reac, pr: prod, cond: x.cond, vi: x.vi, en: x.en, book: !!x.book, eq: { re: reac, pr: prod } }; }
  /* khối lượng chất mong muốn từ khối lượng chất cho trước (theo phương trình), có độ tinh khiết và hiệu suất */
  function massOf(rx, given, m, wanted, purity, yld) {
    const all = rx.re.concat(rx.pr), g = all.find((s) => s.f === given), w = all.find((s) => s.f === wanted); if (!g || !w) return NaN;
    return m * (purity == null ? 1 : purity) * (yld == null ? 1 : yld) / molarMass(g.f) / g.n * w.n * molarMass(w.f);
  }
  const SIDE = { strong: ['K', 'Na', 'Ca', 'Mg', 'Al'], mid: ['Zn', 'Fe', 'Pb'], weak: ['Cu', 'Ag', 'Au'] };
  const pos = (M) => ACTIVITY.indexOf(M);
  function explain(M, R) {                                              // giải thích theo vị trí trong dãy (vi, en)
    const r = react(M, R);
    if (r.kind === 'out') return r.why;
    if (R === 'H2O' || R === 'steam') { const ok = ['K', 'Na', 'Ca'].indexOf(M) >= 0; return ok ? [M + ' là kim loại hoạt động hoá học mạnh (K, Na, Ca…) nên tác dụng với nước ở điều kiện thường, giải phóng H₂.', M + ' is a strongly reactive metal (K, Na, Ca …), so it reacts with water at room temperature, releasing H₂.'] : r.kind === 'react' ? ['Ở nhiệt độ cao ' + M + ' mới tác dụng với hơi nước.', M + ' reacts only with steam at high temperature.'] : [M + ' không phải K, Na, Ca nên không tác dụng với nước ở điều kiện thường.', M + ' is not K, Na or Ca, so it does not react with water at room temperature.']; }
    if (R === 'HCl' || R === 'H2SO4') return r.kind === 'react' ? [M + ' đứng trước H trong dãy nên đẩy được hydrogen khỏi dung dịch acid.', M + ' is before H in the series, so it displaces hydrogen from the acid solution.'] : [M + ' đứng sau H trong dãy nên không đẩy được hydrogen khỏi acid.', M + ' is after H in the series, so it cannot displace hydrogen from the acid.'];
    if (SALTS[R]) { const X = SALTS[R].X; return r.kind === 'react' ? [M + ' đứng trước ' + X + ' trong dãy nên đẩy ' + X + ' ra khỏi dung dịch muối.', M + ' is before ' + X + ' in the series, so it displaces ' + X + ' from the salt solution.'] : [M + ' đứng sau ' + X + ' trong dãy nên không đẩy được ' + X + ' ra khỏi dung dịch muối.', M + ' is after ' + X + ' in the series, so it cannot displace ' + X + ' from the salt solution.']; }
    return r.why || ['', ''];
  }
  const groupOf = (M) => (SIDE.strong.indexOf(M) >= 0 ? 'strong' : SIDE.mid.indexOf(M) >= 0 ? 'mid' : 'weak');
  const E = {
    EXTRA, extra, massOf, explain, groupOf, SALTS, pos,
    ELEMENTS, METALS, REAGENTS, ACTIVITY, VM, parseFormula, molarMass, balance, check, react, stoich, uni, eqStr, build,
    metalsList: () => Object.keys(METALS),
    selfTest() {
      const T = [], add = (n, ok, got) => T.push({ name: n, ok: !!ok, got }), same = (a, b) => JSON.stringify(a) === JSON.stringify(b), near = (a, b, e) => Math.abs(a - b) <= e;
      const BOOKEQ = [['Fe', 'O2', [3, 2, 1]], ['Al', 'O2', [4, 3, 2]], ['Na', 'Cl2', [2, 1, 2]], ['Fe', 'Cl2', [2, 3, 2]], ['Cu', 'Cl2', [1, 1, 1]], ['Al', 'S', [2, 3, 1]], ['Na', 'H2O', [2, 2, 2, 1]], ['Zn', 'steam', [1, 1, 1, 1]], ['Fe', 'steam', [3, 4, 1, 4]], ['Fe', 'HCl', [1, 2, 1, 1]], ['Al', 'HCl', [2, 6, 2, 3]], ['Zn', 'HCl', [1, 2, 1, 1]], ['Mg', 'HCl', [1, 2, 1, 1]], ['Fe', 'CuSO4', [1, 1, 1, 1]], ['Mg', 'S', [1, 1, 1]], ['Zn', 'S', [1, 1, 1]], ['Zn', 'O2', [2, 1, 2]], ['Cu', 'O2', [2, 1, 2]]];
      const bad = BOOKEQ.filter(([M, R, c]) => { const r = react(M, R); return r.kind !== 'react' || !same(r.re.concat(r.pr).map((s) => s.n), c); });
      add('18 phương trình trong bài cân bằng đúng hệ số', bad.length === 0, bad.map((b) => b[0] + '+' + b[1]).join(','));
      let all = 0, ok = 0, mass = 0; Object.keys(METALS).forEach((M) => Object.keys(REAGENTS).forEach((R) => { const r = react(M, R); if (r.kind === 'react') { all++; const c = check(r.eq); if (c.atoms) ok++; if (c.mass) mass++; } }));
      add('mọi phản ứng sinh tự động bảo toàn nguyên tử (' + all + ')', all > 40 && ok === all, ok + '/' + all);
      add('bảo toàn khối lượng (tổng m chất tham gia = tổng m sản phẩm)', mass === all, mass + '/' + all);
      const nr = [['Au', 'O2'], ['Cu', 'HCl'], ['Cu', 'H2O'], ['Ag', 'HCl'], ['Au', 'HCl'], ['Cu', 'FeSO4'], ['Au', 'CuSO4'], ['Ag', 'CuSO4'], ['Cu', 'steam'], ['Zn', 'H2O']].filter(([M, R]) => react(M, R).kind !== 'none');
      add('nhận ra “không phản ứng” (Au+O₂, Cu+HCl, Cu+H₂O, Cu+FeSO₄, Ag+CuSO₄…)', nr.length === 0, nr.join(';'));
      add('khối lượng mol: Fe₃O₄ = 231,53; CuSO₄ = 159,61; Al₂O₃ = 101,96', near(molarMass('Fe3O4'), 231.533, 0.01) && near(molarMass('CuSO4'), 159.61, 0.02) && near(molarMass('Al2O3'), 101.96, 0.02), molarMass('Fe3O4'));
      add('bộ phân tích công thức có ngoặc: Al₂(SO₄)₃ = 342,15; Ca(OH)₂ = 74,09', near(molarMass('Al2(SO4)3'), 342.15, 0.05) && near(molarMass('Ca(OH)2'), 74.09, 0.02), molarMass('Al2(SO4)3'));
      add('cân bằng tổng quát (ma trận nguyên tố): C₂H₆ + O₂ → CO₂ + H₂O = 2,7,4,6', same(balance(['C2H6', 'O2'], ['CO2', 'H2O']), [2, 7, 4, 6]), String(balance(['C2H6', 'O2'], ['CO2', 'H2O'])));
      add('cân bằng Fe + O₂ → Fe₂O₃ = 4,3,2; phương trình không thể cân bằng (Fe + O₂ → NaCl) trả null', same(balance(['Fe', 'O2'], ['Fe2O3']), [4, 3, 2]) && balance(['Fe', 'O2'], ['NaCl']) === null, String(balance(['Fe', 'O2'], ['Fe2O3'])));
      const z = stoich.znHCl(250, VM.std, 1); add('Zn + 2HCl, 250 mL H₂ (Vm = 24,79): n ≈ 0,01008 mol; m(Zn) ≈ 0,659 g; V(HCl 1 M) ≈ 20,2 mL', near(z.nH2, 0.010085, 2e-5) && near(z.mZn, 0.6594, 0.002) && near(z.vHCl_mL, 20.17, 0.05), z.mZn + '/' + z.vHCl_mL);
      const z2 = stoich.znHCl(250, VM.stp, 1); add('với Vm = 22,4: m(Zn) ≈ 0,730 g, V(HCl) ≈ 22,3 mL (thay đổi theo Vm)', near(z2.mZn, 0.7297, 0.003) && near(z2.vHCl_mL, 22.32, 0.05), z2.mZn);
      const hp = stoich.h2Produced(0.6594, 20.17, 1, VM.std); add('Zn dư/HCl dư: xác định chất hết (limiting) và V(H₂)', near(hp.V_mL, 250, 1) && stoich.h2Produced(1, 10, 1, VM.std).limiting === 'HCl' && stoich.h2Produced(0.1, 50, 1, VM.std).limiting === 'Zn', hp.V_mL);
      const hits = Object.keys(METALS).filter((M) => ['Mg', 'Al', 'Zn', 'Fe'].indexOf(M) >= 0).every((M) => react(M, 'CuSO4').kind === 'react' && react(M, 'FeSO4').kind === (M === 'Fe' ? 'out' : 'react'));
      add('dãy hoạt động (tổng hợp): kim loại đứng trước Cu đẩy được Cu; Cu không đẩy được Fe; Fe đẩy được Cu', hits && ACTIVITY.indexOf('Mg') < ACTIVITY.indexOf('Cu') && ACTIVITY.indexOf('Cu') < ACTIVITY.indexOf('Au') && react('Cu', 'FeSO4').kind === 'none', ACTIVITY.join(' '));
      let nan = 0; Object.keys(METALS).forEach((M) => Object.keys(REAGENTS).forEach((R) => { const r = react(M, R); if (r.kind === 'react') r.re.concat(r.pr).forEach((s) => { if (!isFinite(s.n) || s.n <= 0 || s.n !== Math.round(s.n)) nan++; if (!isFinite(molarMass(s.f))) nan++; }); }));
      add('không có NaN/∞, hệ số nguyên dương', nan === 0, nan);
      /* ---- Đợt 7: Bài 19–21 ---- */
      const cf = (r) => r.re.concat(r.pr).map((x) => x.n);
      const B19 = [['Cu', 'AgNO3', [1, 2, 1, 2]], ['Zn', 'AgNO3', [1, 2, 1, 2]], ['Mg', 'H2SO4', [1, 1, 1, 1]], ['Zn', 'H2SO4', [1, 1, 1, 1]], ['Ca', 'H2O', [1, 2, 1, 1]], ['Al', 'H2SO4', [2, 3, 1, 3]], ['Fe', 'H2SO4', [1, 1, 1, 1]]];
      const b19 = B19.filter(([M, R, c]) => { const r = react(M, R); return r.kind !== 'react' || !same(cf(r), c); });
      add('Bài 19: Cu/Zn + AgNO₃, Mg/Zn + H₂SO₄ loãng, Ca + H₂O… cân bằng đúng', b19.length === 0, b19.map((b) => b[0] + b[1]).join(','));
      const nr19 = [['Ag', 'H2SO4'], ['Cu', 'H2O'], ['Fe', 'H2O'], ['Ag', 'CuSO4'], ['Cu', 'ZnNO32'], ['Fe', 'ZnNO32'], ['Ag', 'CuNO32'], ['Au', 'AgNO3']].filter(([M, R]) => react(M, R).kind !== 'none');
      add('Bài 19: Ag + H₂SO₄, Cu/Fe + nước, Cu + Zn(NO₃)₂, Ag + Cu(NO₃)₂ không phản ứng', nr19.length === 0, nr19.join(';'));
      const ra = ACTIVITY.filter((x) => x !== 'H').map((x) => METALS[x].rank); const dec = ra.every((v, i) => i === 0 || ra[i - 1] > v);
      add('dãy hoạt động in trong sách: K, Na, Ca, Mg, Al, Zn, Fe, Pb, H, Cu, Ag, Au (12 phần tử, mức giảm dần, H giữa Pb và Cu)', ACTIVITY.length === 12 && dec && ACTIVITY.indexOf('H') === ACTIVITY.indexOf('Pb') + 1 && ACTIVITY.indexOf('H') + 1 === ACTIVITY.indexOf('Cu') && METALS.Pb.rank > HR && HR > METALS.Cu.rank, ACTIVITY.join(' '));
      let mism = 0; ['Mg', 'Al', 'Zn', 'Fe', 'Pb', 'Cu', 'Ag', 'Au'].forEach((M) => Object.keys(SALTS).forEach((R) => { const X = SALTS[R].X; if (M === X) return; const r = react(M, R); if ((r.kind === 'react') !== (pos(M) < pos(X))) mism++; }));
      add('kim loại đứng trước đẩy được kim loại đứng sau khỏi muối (mọi cặp Mg…Au × 5 muối) — khớp vị trí trong dãy', mism === 0, mism);
      let mism2 = 0; ['K', 'Na', 'Ca', 'Mg', 'Al', 'Zn', 'Fe', 'Pb', 'Cu', 'Ag', 'Au'].forEach((M) => ['HCl', 'H2SO4'].forEach((R) => { if ((react(M, R).kind === 'react') !== (pos(M) < pos('H'))) mism2++; }));
      add('kim loại đứng trước H phản ứng với acid loãng, đứng sau H thì không (11 kim loại × 2 acid)', mism2 === 0, mism2);
      add('K, Na, Ca với dung dịch muối: không đẩy kim loại, tác dụng với nước trước (ngoại lệ của sách)', ['K', 'Na', 'Ca'].every((M) => react(M, 'CuSO4').kind === 'out' && /nước/.test(react(M, 'CuSO4').why[0])), '');
      add('Pb đứng trước H: phản ứng với HCl, đẩy được Cu khỏi CuSO₄; không đẩy được Fe khỏi FeSO₄', react('Pb', 'HCl').kind === 'react' && react('Pb', 'CuSO4').kind === 'react' && react('Pb', 'FeSO4').kind === 'none', '');
      const EX = { 'al-electrolysis': [2, 4, 3], 'fe-co': [1, 3, 2, 3], 'zns-o2': [2, 3, 2, 2], 'zno-c': [1, 1, 1, 1], 'c-o2': [1, 1, 1], 'c-co2': [1, 1, 2], 'co-fe2o3': [3, 1, 2, 3], 'caco3': [1, 1, 1], 'slag': [1, 1, 1], 'mg-o2': [2, 1, 2], 's-o2': [1, 1, 1], 'na-cl2': [2, 1, 2], 'na-o2': [4, 1, 2], 'p-o2': [4, 5, 2], 'mg-cl2': [1, 1, 1] };
      const badEx = Object.keys(EX).filter((k) => !same(cf(extra(k)), EX[k]));
      add('Bài 20, 21: ' + Object.keys(EX).length + ' phương trình công nghiệp/phi kim cân bằng đúng (điện phân, nhiệt luyện, lò cao, xỉ…)', badEx.length === 0, badEx.join(','));
      const cons = Object.keys(EXTRA).filter((k) => { const c = check(extra(k).eq); return !(c.atoms && c.mass); });
      add('mọi phương trình công nghiệp bảo toàn nguyên tử và khối lượng', cons.length === 0, cons.join(','));
      const fe = massOf(extra('fe-co'), 'Fe2O3', 1, 'Fe'), al = massOf(extra('al-electrolysis'), 'Al2O3', 1, 'Al'), co = massOf(extra('fe-co'), 'Fe2O3', 1, 'CO'), fe2 = massOf(extra('fe-co'), 'Fe2O3', 1, 'Fe', 0.8, 0.9);
      add('1,0 tấn Fe₂O₃ tinh khiết ⇒ 0,70 tấn Fe (≈0,699); 1,0 tấn Al₂O₃ ⇒ 0,53 tấn Al; CO cần 0,526 tấn; độ tinh khiết 80 %, hiệu suất 90 % ⇒ 0,503 tấn', near(fe, 0.6994, 0.001) && near(al, 0.5293, 0.001) && near(co, 0.5261, 0.001) && near(fe2, 0.5036, 0.001), fe + '/' + al + '/' + co + '/' + fe2);
      add('theo số của sách (M = 160 và 56; 102 và 27): 0,70 và 0,53 tấn', near(56 * 2 / 160, 0.70, 1e-9) && near(27 * 4 / 204, 0.5294, 0.001), '');
      return T;
    }
  };
  /* ===================================================================== ORG — hoá hữu cơ (Chương VII, Bài 22–24)
     Dữ liệu thuần, tự cân bằng bằng balance(): cháy CₙH₂ₙ₊₂ và CₙH₂ₙ (số mol O₂ phân số hoặc số nguyên), cộng Br₂, trùng hợp,
     nhiệt lượng theo Bảng ở Bài 23 (CRC Handbook, 97th ed.), hỗn hợp theo tỉ lệ mol, dữ liệu chất (Bảng 22.1, ethylene −104 °C / −169 °C).
     Khối lượng mol dùng số của sách (H 1, C 12, O 16, Br 80), khác ELEMENTS ở trên (Br 79,904).
     CÁCH THÊM PHẢN ỨNG HỮU CƠ MỚI (Bài 25+): thêm hàm sinh {re:[f…], pr:[f…], cond} rồi gọi mk() — hệ số do balance() tính; thêm một dòng vào selfTest. */
  const ORG = (function () {
    const MB = { H: 1, C: 12, N: 14, O: 16, S: 32, Cl: 35.5, Br: 80 };
    const mm = (f) => { const m = parseFormula(f); let s = 0; for (const k in m) s += MB[k] * m[k]; return s; };
    const alk = (n) => 'C' + (n > 1 ? n : '') + 'H' + (2 * n + 2), ene = (n) => 'C' + n + 'H' + (2 * n);
    const mk = (re, pr, cond, extra) => { const co = balance(re, pr); if (!co) return null; const R = re.map((f, i) => ({ f, n: co[i] })), P = pr.map((f, i) => ({ f, n: co[re.length + i] })); return Object.assign({ re: R, pr: P, cond, eq: { re: R, pr: P } }, extra || {}); };
    const frac = (a, b) => { const g = (x, y) => (y ? g(y, x % y) : x), d = g(a, b); a /= d; b /= d; return b === 1 ? String(a) : a + '/' + b; };
    function burn(kind, n, mode) {                                   // kind: 'alkane' | 'alkene'; mode: 'int' | 'frac'
      const f = kind === 'alkane' ? alk(n) : ene(n), r = mk([f, 'O2'], ['CO2', 'H2O'], 't°', { fuel: f });
      if (!r || mode !== 'frac') return r;
      const o2 = kind === 'alkane' ? [3 * n + 1, 2] : [3 * n, 2], h2o = kind === 'alkane' ? n + 1 : n;
      return { re: [{ f, n: 1 }, { f: 'O2', n: 0, txt: frac(o2[0], o2[1]) }], pr: [{ f: 'CO2', n }, { f: 'H2O', n: h2o }], cond: 't°', fuel: f, o2: o2[0] / o2[1] };
    }
    const fracStr = (rx) => rx.re.map((s) => (s.txt ? s.txt : s.n > 1 ? s.n : '') + uni(s.f)).join(' + ') + ' —' + (rx.cond || '') + '→ ' + rx.pr.map((s) => (s.n > 1 ? s.n : '') + uni(s.f)).join(' + ');
    const addBr2 = (f) => mk([f, 'Br2'], [f + 'Br2'], '', { kind: 'add' });
    const polymer = (f, n) => ({ monomer: f, n, M: mm(f) * n, mono: mm(f) });
    const HEAT = { CH4: 891, C2H6: 1561, C3H8: 2220, C4H10: 2878 };          // kJ/mol (Bài 23)
    const heatMol = (f) => HEAT[f] || null, heatGram = (f) => (HEAT[f] ? HEAT[f] / mm(f) : null);
    const heatMass = (f, g) => (HEAT[f] ? HEAT[f] * g / mm(f) : null);
    function mix(x1, f1, f2, kg) {                                   // x1 = phần mol của f1 (tỉ lệ thể tích = tỉ lệ mol cùng điều kiện)
      const x2 = 1 - x1, M = x1 * mm(f1) + x2 * mm(f2), Q = x1 * HEAT[f1] + x2 * HEAT[f2], mol = 1000 * kg / M;
      return { M, Q, mol, kJ: mol * Q };
    }
    const SUBS = [
      { key: 'CH3Cl', vi: 'methyl chloride', en: 'methyl chloride', f: 'CH3Cl', s: 'CH₃Cl', state: 'gas', sol: 'rất ít tan', solEn: 'very slightly soluble', na: false },
      { key: 'ethanol', vi: 'ethylic alcohol', en: 'ethylic alcohol (ethanol)', f: 'C2H6O', s: 'CH₃–CH₂–OH', smi: 'CCO', state: 'liquid', sol: 'tan vô hạn', solEn: 'miscible in all proportions', na: true },
      { key: 'dme', vi: 'dimethyl ether', en: 'dimethyl ether', f: 'C2H6O', s: 'CH₃–O–CH₃', smi: 'COC', state: 'gas', sol: 'tan ít', solEn: 'slightly soluble', na: false }
    ];
    const ETHYLENE = { liquefy: -104, solid: -169 };
    const stateAt = (T) => (T <= ETHYLENE.solid ? 'solid' : T <= ETHYLENE.liquefy ? 'liquid' : 'gas');
    function selfTest() {
      const T = [], add = (n, ok, got) => T.push({ name: n, ok: !!ok, got }), near = (a, b, e) => Math.abs(a - b) <= e, same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
      const co = (r) => r.re.concat(r.pr).map((s) => s.n);
      add('cháy CH₄: 1 · 2 · 1 · 2; C₂H₆: 2 · 7 · 4 · 6; C₃H₈: 1 · 5 · 3 · 4; C₄H₁₀: 2 · 13 · 8 · 10', same(co(burn('alkane', 1)), [1, 2, 1, 2]) && same(co(burn('alkane', 2)), [2, 7, 4, 6]) && same(co(burn('alkane', 3)), [1, 5, 3, 4]) && same(co(burn('alkane', 4)), [2, 13, 8, 10]), co(burn('alkane', 2)).join());
      add('cháy C₂H₄: 1 · 3 · 2 · 2; C₃H₆: 2 · 9 · 6 · 6', same(co(burn('alkene', 2)), [1, 3, 2, 2]) && same(co(burn('alkene', 3)), [2, 9, 6, 6]), co(burn('alkene', 3)).join());
      let allBal = true, cons = 0; for (let n = 1; n <= 12; n++) ['alkane', 'alkene'].forEach((k) => { if (k === 'alkene' && n < 2) return; const r = burn(k, n); if (!r) { allBal = false; return; } const c = check({ re: r.re, pr: r.pr }); if (c.atoms && c.mass) cons++; else allBal = false; });
      add('cháy tổng quát cân bằng và bảo toàn nguyên tử, khối lượng với n = 1…12 (' + cons + ' phản ứng)', allBal && cons === 23, cons);
      add('công thức tổng quát: O₂ = (3n+1)/2 đúng với n = 1…12; C₄H₁₀ + 13/2 O₂', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].every((n) => { const r = burn('alkane', n, 'int'), q = burn('alkane', n, 'frac'); return near(q.o2, (3 * n + 1) / 2, 1e-9) && r.re[1].n / r.re[0].n === q.o2; }) && burn('alkane', 4, 'frac').re[1].txt === '13/2', fracStr(burn('alkane', 4, 'frac')));
      const a1 = addBr2('C2H4'), a2 = addBr2('C3H6');
      add('cộng Br₂: C₂H₄ + Br₂ → C₂H₄Br₂ và C₃H₆ + Br₂ → C₃H₆Br₂ (hệ số 1:1:1), M(C₂H₄Br₂) = 188', a1 && a2 && same(co(a1), [1, 1, 1]) && same(co(a2), [1, 1, 1]) && mm('C2H4Br2') === 188, mm('C2H4Br2'));
      add('M: C₂H₄ = 28, C₃H₆ = 42, CH₄ = 16, C₄H₁₀ = 58; polymer (C₂H₄)ₙ = 28n', mm('C2H4') === 28 && mm('C3H6') === 42 && mm('CH4') === 16 && mm('C4H10') === 58 && polymer('C2H4', 100).M === 2800 && polymer('C3H6', 10).M === 420, '');
      const per = ['CH4', 'C2H6', 'C3H8', 'C4H10'].map(heatGram);
      add('nhiệt 1 g: CH₄ 55,7; C₂H₆ 52,0; C₃H₈ 50,5; C₄H₁₀ 49,6 kJ; CH₄ lớn nhất, giảm dần', near(per[0], 55.69, 0.01) && near(per[1], 52.03, 0.01) && near(per[2], 50.45, 0.01) && near(per[3], 49.62, 0.01) && per[0] > per[1] && per[1] > per[2] && per[2] > per[3], per.map((x) => x.toFixed(2)).join(' '));
      const m = mix(0.5, 'C3H8', 'C4H10', 1);
      add('bình gas propane : butane = 1 : 1 (mol): M = 51; 2 549 kJ/mol; 1 kg ≈ 49 980 kJ', near(m.M, 51, 1e-9) && near(m.Q, 2549, 1e-9) && near(m.kJ, 49980, 1), m.kJ.toFixed(1));
      add('hỗn hợp: x = 1 là propane nguyên chất (50 454 kJ/kg); x = 0 là butane (49 621 kJ/kg)', near(mix(1, 'C3H8', 'C4H10', 1).kJ, 2220 / 44 * 1000, 1e-6) && near(mix(0, 'C3H8', 'C4H10', 1).kJ, 2878 / 58 * 1000, 1e-6));
      add('ethylene: khí ở 25 °C, lỏng ở −104 °C, rắn ở −169 °C; Bảng 22.1: ethanol tác dụng Na, dimethyl ether không', stateAt(25) === 'gas' && stateAt(-104) === 'liquid' && stateAt(-150) === 'liquid' && stateAt(-169) === 'solid' && SUBS[1].na && !SUBS[2].na && !SUBS[0].na && SUBS[1].f === SUBS[2].f, '');
      add('không NaN/∞: n = 0, âm hoặc rất lớn cho kết quả null hoặc hợp lệ', [0, -1, 1000].every((n) => { const r = burn('alkane', n); return r === null || r.re.every((s) => isFinite(s.n)); }), '');
      return T;
    }
    return { MB, mm, alk, ene, burn, fracStr, addBr2, polymer, HEAT, heatMol, heatGram, heatMass, mix, SUBS, ETHYLENE, stateAt, selfTest, mk };
  })();
  E.ORG = ORG; { const st0 = E.selfTest; E.selfTest = function () { return st0().concat(ORG.selfTest()); }; }

  /* ===================================================================== ALC — ethylic alcohol, acetic acid, nhiên liệu (Chương VII–VIII, Bài 25–27)
     Dữ liệu thuần, hệ số luôn do balance() tính. Thêm phản ứng mới (Bài 28+): thêm một dòng vào RX (re, pr, điều kiện, vi, en, book:true/false),
     rồi thêm một dòng kiểm tra vào selfTest. Chất mới: thêm vào SUB2 (tên, công thức, nhiệt độ sôi, khối lượng riêng). book:false = bổ sung ngoài sách. */
  const ALC = (function () {
    const mk = ORG.mk, mm = ORG.mm, Vm = 24.79;                         // thể tích mol chất khí 25 °C, 1 bar (L/mol) — số liệu sách KHTN 9
    const D_ET = 0.789, D_AC = 1.045;                                  // g/mL (20 °C; 25 °C)
    const RX = {
      burnEtOH: { re: ['C2H5OH', 'O2'], pr: ['CO2', 'H2O'], c: 't°', book: true },
      burnMeOH: { re: ['CH3OH', 'O2'], pr: ['CO2', 'H2O'], c: 't°', book: false },
      burnAcOH: { re: ['CH3COOH', 'O2'], pr: ['CO2', 'H2O'], c: 't°', book: true },
      naEtOH: { re: ['C2H5OH', 'Na'], pr: ['C2H5ONa', 'H2'], c: '', book: true },
      naMeOH: { re: ['CH3OH', 'Na'], pr: ['CH3ONa', 'H2'], c: '', book: true },
      hydration: { re: ['C2H4', 'H2O'], pr: ['C2H5OH'], c: 't°, H⁺', book: true },
      ferment: { re: ['C6H12O6'], pr: ['C2H5OH', 'CO2'], c: 'enzyme', book: true },
      acetify: { re: ['C2H5OH', 'O2'], pr: ['CH3COOH', 'H2O'], c: 'men giấm', book: true },
      acMg: { re: ['CH3COOH', 'Mg'], pr: ['(CH3COO)2Mg', 'H2'], c: '', book: true },
      acZn: { re: ['CH3COOH', 'Zn'], pr: ['(CH3COO)2Zn', 'H2'], c: '', book: true },
      acCuO: { re: ['CH3COOH', 'CuO'], pr: ['(CH3COO)2Cu', 'H2O'], c: '', book: true },
      acZnO: { re: ['CH3COOH', 'ZnO'], pr: ['(CH3COO)2Zn', 'H2O'], c: '', book: true },
      acNaOH: { re: ['CH3COOH', 'NaOH'], pr: ['CH3COONa', 'H2O'], c: '', book: true },
      acKOH: { re: ['CH3COOH', 'KOH'], pr: ['CH3COOK', 'H2O'], c: '', book: true },
      acCaCO3: { re: ['CH3COOH', 'CaCO3'], pr: ['(CH3COO)2Ca', 'CO2', 'H2O'], c: '', book: true },
      acMgCO3: { re: ['CH3COOH', 'MgCO3'], pr: ['(CH3COO)2Mg', 'CO2', 'H2O'], c: '', book: true },
      ester: { re: ['CH3COOH', 'C2H5OH'], pr: ['CH3COOC2H5', 'H2O'], c: 'H₂SO₄ đặc, t°', rev: true, book: true },
      esterPr: { re: ['CH3COOH', 'C3H7OH'], pr: ['CH3COOC3H7', 'H2O'], c: 'H₂SO₄ đặc, t°', rev: true, book: true }
    };
    const R = {}; Object.keys(RX).forEach((k) => { const x = RX[k]; R[k] = mk(x.re, x.pr, x.c, { rev: !!x.rev, book: x.book, id: k }); });
    const SUB2 = {
      ethanol: { vi: 'ethylic alcohol', en: 'ethylic alcohol (ethanol)', f: 'C2H5OH', bp: 78.3, d: D_ET, misc: true },
      acetic: { vi: 'acetic acid', en: 'acetic acid', f: 'CH3COOH', bp: 118, d: D_AC, misc: true },
      water: { vi: 'nước', en: 'water', f: 'H2O', bp: 100, d: 1, misc: true },
      oil: { vi: 'dầu ăn', en: 'cooking oil', f: null, bp: null, d: null, misc: false }
    };
    const pureMl = (ml, deg) => ml * deg / 100;                       // mL ethylic alcohol nguyên chất trong ml dung dịch độ deg
    const pureG = (ml, deg) => pureMl(ml, deg) * D_ET;
    const dilute = (v1, d1, d2) => ({ v2: v1 * d1 / d2, water: v1 * d1 / d2 - v1 });  // pha loãng: giữ nguyên lượng cồn nguyên chất (coi thể tích cộng được — gần đúng)
    const fermentG = (gluc) => gluc * 2 * mm('C2H6O') / mm('C6H12O6');                  // lí thuyết: 180 g glucose → 92 g
    const fermentCO2 = (gluc) => gluc * 2 * mm('CO2') / mm('C6H12O6');
    const acetifyG = (et) => et * mm('C2H4O2') / mm('C2H6O');                           // 46 → 60
    const gasL = (g, f) => g / mm(f) * Vm;                                              // lít khí ở 25 °C, 1 bar
    const esterG = (gAc, gEt, gMolEster) => { const nA = gAc / 60, nE = gEt / 46, n = Math.min(nA, nE); return { n, g: n * (gMolEster || 88), limiting: Math.abs(nA - nE) < 1e-9 ? 'cả hai' : nA < nE ? 'acid' : 'alcohol' }; };
    const biofuel = (litre, pct) => ({ eth: litre * pct / 100, gas: litre * (1 - pct / 100) });
    const neutral = (nBase, drops, perDrop) => { const done = Math.min(nBase, drops * perDrop); return { rest: Math.max(0, nBase - done), neutral: Math.abs(nBase - drops * perDrop) < 1e-9, over: Math.max(0, drops * perDrop - nBase) }; };
    const litmus = (kind) => (kind === 'acid' ? 'đỏ' : kind === 'base' ? 'xanh' : 'tím');       // quỳ tím
    const phenol = (kind) => (kind === 'base' ? 'hồng' : 'không màu');
    const ACID = {                                                    // acetic acid tác dụng được với chất nào (W27.4)
      Zn: { react: true, rx: 'acZn', vi: 'sủi bọt khí H₂, kẽm tan dần', en: 'H₂ bubbles, zinc dissolves' },
      KOH: { react: true, rx: 'acKOH', vi: 'trung hoà (không thấy dấu hiệu rõ nếu không có chỉ thị)', en: 'neutralisation (no visible sign without an indicator)' },
      ZnO: { react: true, rx: 'acZnO', vi: 'chất rắn tan dần', en: 'the solid dissolves' },
      NaCl: { react: false, vi: 'không phản ứng', en: 'no reaction' },
      MgCO3: { react: true, rx: 'acMgCO3', vi: 'sủi bọt khí CO₂, chất rắn tan', en: 'CO₂ bubbles, solid dissolves' },
      Cu: { react: false, vi: 'không phản ứng (Cu đứng sau H trong dãy hoạt động)', en: 'no reaction (Cu is below H in the reactivity series)' },
      Mg: { react: true, rx: 'acMg', vi: 'sủi bọt khí H₂', en: 'H₂ bubbles' },
      CuO: { react: true, rx: 'acCuO', vi: 'chất rắn đen tan, dung dịch xanh (đun nhẹ)', en: 'the black solid dissolves, solution turns blue (gentle heating)' },
      NaOH: { react: true, rx: 'acNaOH', vi: 'mất màu hồng của phenolphthalein', en: 'pink colour of phenolphthalein disappears' },
      CaCO3: { react: true, rx: 'acCaCO3', vi: 'sủi bọt khí CO₂, đá vôi tan', en: 'CO₂ bubbles, limestone dissolves' }
    };
    const fmtEq = (r) => r.re.map((s) => (s.n > 1 ? s.n : '') + uni(s.f)).join(' + ') + (r.rev ? ' ⇌' : ' →') + (r.cond ? '(' + r.cond + ')' : '') + ' ' + r.pr.map((s) => (s.n > 1 ? s.n : '') + uni(s.f)).join(' + ');
    function selfTest() {
      const T = [], add = (n, ok, got) => T.push({ name: n, ok: !!ok, got }), near = (a, b, e) => Math.abs(a - b) <= e, same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
      const co = (r) => r.re.concat(r.pr).map((s) => s.n);
      add('mọi phương trình Bài 25–27 cân bằng được (' + Object.keys(RX).length + ' phản ứng) và bảo toàn nguyên tử, khối lượng', Object.keys(R).every((k) => { const r = R[k]; if (!r) return false; const c = check({ re: r.re, pr: r.pr }); return c.atoms && c.mass; }), Object.keys(R).filter((k) => !R[k]).join());
      add('cháy C₂H₅OH: 1 · 3 · 2 · 3; CH₃COOH: 1 · 2 · 2 · 2; CH₃OH: 2 · 3 · 2 · 4', same(co(R.burnEtOH), [1, 3, 2, 3]) && same(co(R.burnAcOH), [1, 2, 2, 2]) && same(co(R.burnMeOH), [2, 3, 2, 4]), co(R.burnMeOH).join());
      add('natri: 2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂; 2CH₃OH + 2Na → 2CH₃ONa + H₂', same(co(R.naEtOH), [2, 2, 2, 1]) && same(co(R.naMeOH), [2, 2, 2, 1]), co(R.naEtOH).join());
      add('điều chế: C₂H₄ + H₂O → C₂H₅OH (1·1·1); lên men C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂; C₂H₅OH + O₂ → CH₃COOH + H₂O (1·1·1·1)', same(co(R.hydration), [1, 1, 1]) && same(co(R.ferment), [1, 2, 2]) && same(co(R.acetify), [1, 1, 1, 1]), '');
      add('acetic acid: Mg 2·1·1·1; Zn 2·1·1·1; CuO 2·1·1·1; NaOH 1·1·1·1; KOH 1·1·1·1; CaCO₃ 2·1·1·1·1; MgCO₃ 2·1·1·1·1; ZnO 2·1·1·1', same(co(R.acMg), [2, 1, 1, 1]) && same(co(R.acZn), [2, 1, 1, 1]) && same(co(R.acCuO), [2, 1, 1, 1]) && same(co(R.acNaOH), [1, 1, 1, 1]) && same(co(R.acKOH), [1, 1, 1, 1]) && same(co(R.acCaCO3), [2, 1, 1, 1, 1]) && same(co(R.acMgCO3), [2, 1, 1, 1, 1]) && same(co(R.acZnO), [2, 1, 1, 1]), '');
      add('ester hoá: 1·1·1·1 (thuận nghịch ⇌), propyl acetate 1·1·1·1; M: 46, 60, 88, 102', same(co(R.ester), [1, 1, 1, 1]) && R.ester.rev && same(co(R.esterPr), [1, 1, 1, 1]) && mm('C2H6O') === 46 && mm('C2H4O2') === 60 && mm('C4H8O2') === 88 && mm('C5H10O2') === 102, '');
      add('lên men lí thuyết: 180 g glucose → 92 g ethylic alcohol + 88 g CO₂; 1 g glucose → 0,511 g', near(fermentG(180), 92, 1e-9) && near(fermentCO2(180), 88, 1e-9) && near(fermentG(1), 0.5111, 1e-3), fermentG(180));
      add('lên men giấm lí thuyết: 46 g ethylic alcohol → 60 g acetic acid', near(acetifyG(46), 60, 1e-9), acetifyG(46));
      add('độ cồn: 100 mL cồn 70° có 70 mL (55,23 g) ethylic alcohol; rượu 40° 500 mL có 200 mL (157,8 g)', near(pureMl(100, 70), 70, 1e-9) && near(pureG(100, 70), 55.23, 1e-6) && near(pureMl(500, 40), 200, 1e-9) && near(pureG(500, 40), 157.8, 1e-6), pureG(100, 70));
      add('pha loãng: 100 mL cồn 96° thành 70° ⇒ 137,1 mL (thêm 37,1 mL nước, gần đúng cộng thể tích)', near(dilute(100, 96, 70).v2, 137.142857, 1e-4) && near(dilute(100, 96, 70).water, 37.142857, 1e-4), dilute(100, 96, 70).v2);
      add('xăng E5: 10 L xăng sinh học chứa 0,5 L ethylic alcohol và 9,5 L xăng; E0 và E20 hợp lệ', near(biofuel(10, 5).eth, 0.5, 1e-9) && near(biofuel(10, 5).gas, 9.5, 1e-9) && biofuel(10, 0).eth === 0 && near(biofuel(10, 20).eth, 2, 1e-9), '');
      add('thể tích khí 25 °C: 23 g C₂H₅OH + Na → 0,25 mol H₂ = 6,20 L; 1 mol CO₂ = 24,79 L', near(23 / 46 / 2 * Vm, 6.19750, 1e-4) && near(gasL(44, 'CO2'), 24.79, 1e-9), '');
      add('ester: 6 g acetic acid + 4,6 g ethylic alcohol ⇒ 0,1 mol, lí thuyết 8,8 g ethyl acetate (đủ cả hai)', near(esterG(6, 4.6).g, 8.8, 1e-9) && esterG(6, 4.6).limiting === 'cả hai', esterG(6, 4.6).g);
      add('trung hoà: 5 đơn vị NaOH + 5 giọt (mỗi giọt 1 đơn vị) ⇒ trung hoà, mất màu hồng; 6 giọt ⇒ acid dư', neutral(5, 5, 1).neutral && !neutral(5, 4, 1).neutral && neutral(5, 6, 1).over === 1 && litmus('acid') === 'đỏ' && phenol('base') === 'hồng' && phenol('neutral') === 'không màu', '');
      add('acetic acid tác dụng: Zn, KOH, ZnO, MgCO₃ có; NaCl, Cu không (đúng đáp án sách)', ['Zn', 'KOH', 'ZnO', 'MgCO3'].every((k) => ACID[k].react) && !ACID.NaCl.react && !ACID.Cu.react && ['Zn', 'KOH', 'ZnO', 'MgCO3', 'Mg', 'CuO', 'NaOH', 'CaCO3'].every((k) => R[ACID[k].rx]), '');
      add('không NaN/∞: độ cồn 0°–96°, thể tích 0, glucose 0', [0, 96].every((d) => isFinite(pureMl(0, d)) && isFinite(pureG(250, d))) && fermentG(0) === 0 && isFinite(dilute(100, 96, 96).v2), '');
      return T;
    }
    return { RX, R, SUB2, ACID, Vm, D_ET, D_AC, pureMl, pureG, dilute, fermentG, fermentCO2, acetifyG, gasL, esterG, biofuel, neutral, litmus, phenol, fmtEq, selfTest };
  })();
  E.ALC = ALC; { const st1 = E.selfTest; E.selfTest = function () { return st1().concat(ALC.selfTest()); }; }
  /* ===================================================================== CHO — lipid, carbohydrate (Chương IX, Bài 28–30)
     Chất béo (RCOO)₃C₃H₅ dựng từ 3 gốc R (C₁₅H₃₁, C₁₇H₃₅, C₁₇H₃₃, C₁₇H₃₁): công thức, M, xà phòng hoá, thuỷ phân; carbohydrate Cₙ(H₂O)ₘ;
     tráng bạc, lên men, thuỷ phân saccharose/tinh bột; thử iodine. Khối lượng mol dùng số của sách (H 1, C 12, O 16, Na 23, Ag 108).
     CÁCH THÊM: chất béo mới → thêm gốc vào FA; phản ứng mới → thêm vào RX (hệ số do balance() tính) + một dòng selfTest; mẫu thử iodine/Tollens → thêm vào SAMPLES. */
  const CHO = (function () {
    const MB = { H: 1, C: 12, N: 14, O: 16, Na: 23, K: 39, Ag: 108 };
    const mm = (f) => { const m = parseFormula(f); let s = 0; for (const k in m) s += MB[k] * m[k]; return s; };
    const mk = ORG.mk;
    const FA = { C15H31: { n: 15, h: 31, vi: 'palmitic', en: 'palmitic' }, C17H35: { n: 17, h: 35, vi: 'stearic', en: 'stearic' }, C17H33: { n: 17, h: 33, vi: 'oleic (1 liên kết C=C)', en: 'oleic (one C=C)' }, C17H31: { n: 17, h: 31, vi: 'linoleic (2 liên kết C=C)', en: 'linoleic (two C=C)' } };
    const fatF = (r) => { let C = 3 + 3, H = 5; r.forEach((k) => { C += FA[k].n; H += FA[k].h; }); return 'C' + C + 'H' + H + 'O6'; };           // (RCOO)₃C₃H₅
    const fatM = (r) => mm(fatF(r));
    const soapF = (k) => k + 'COONa' ; const soapFormula = (k) => 'C' + (FA[k].n + 1) + 'H' + FA[k].h + 'NaO2';
    const soapM = (k) => mm(soapFormula(k));
    const acidF = (k) => 'C' + (FA[k].n + 1) + 'H' + (FA[k].h + 1) + 'O2';
    const unsat = (r) => r.reduce((a, k) => a + (k === 'C17H33' ? 1 : k === 'C17H31' ? 2 : 0), 0);   // tổng số liên kết C=C ở các gốc R
    const RX = {
      soapStear: { re: ['(C17H35COO)3C3H5', 'NaOH'], pr: ['C17H35COONa', 'C3H5(OH)3'], c: 't°', book: true },
      soapOlein: { re: ['(C17H33COO)3C3H5', 'NaOH'], pr: ['C17H33COONa', 'C3H5(OH)3'], c: 't°', book: false },
      soapKOH: { re: ['(C17H35COO)3C3H5', 'KOH'], pr: ['C17H35COOK', 'C3H5(OH)3'], c: 't°', book: true },
      hydrol: { re: ['(C17H35COO)3C3H5', 'H2O'], pr: ['C3H5(OH)3', 'C17H35COOH'], c: 'acid hoặc enzyme lipase, t°', book: true },
      ester3: { re: ['C3H5(OH)3', 'C17H35COOH'], pr: ['(C17H35COO)3C3H5', 'H2O'], c: 'H₂SO₄ đặc, t°', book: false, rev: true },
      silver: { re: ['C6H12O6', 'Ag2O'], pr: ['C6H12O7', 'Ag'], c: 'dd NH₃, t°', book: true },
      silverFull: { re: ['C6H12O6', 'AgNO3', 'NH3', 'H2O'], pr: ['C6H15NO7', 'Ag', 'NH4NO3'], c: '', book: true },       // C₆H₁₂O₆ = C₅H₁₁O₅CHO; C₆H₁₅NO₇ = C₅H₁₁O₅COONH₄ (gluconate amoni) — chú thích chân trang sách
      ferment: { re: ['C6H12O6'], pr: ['C2H5OH', 'CO2'], c: 'enzyme', book: true },
      sucHyd: { re: ['C12H22O11', 'H2O'], pr: ['C6H12O6'], c: 'enzyme hoặc acid, t°', book: true },         // 1 glucose + 1 fructose (cùng C₆H₁₂O₆): hệ số 2 = glucose + fructose
      starchHyd: { re: ['C6H10O5', 'H2O'], pr: ['C6H12O6'], c: 'enzyme hoặc acid, t°', book: true },       // 1 mắt xích C₆H₁₀O₅ (n lần)
      photo: { re: ['CO2', 'H2O'], pr: ['C6H12O6', 'O2'], c: 'ánh sáng, chất diệp lục', book: false }      // Hình 30.1 chỉ có sơ đồ; phương trình là bổ sung
    };
    const R = {}; Object.keys(RX).forEach((k) => { const x = RX[k]; R[k] = mk(x.re, x.pr, x.c, { rev: !!x.rev, book: x.book, id: k }); });
    /* phương trình đầy đủ ở chú thích: hệ nghiệm không duy nhất (2 tham số) nên balance() từ chối; dùng hệ số của sách và để check() xác minh. */
    { const f = RX.silverFull, cf = [1, 2, 3, 1, 1, 2, 2], re = f.re.map((x, i) => ({ f: x, n: cf[i] })), pr_ = f.pr.map((x, i) => ({ f: x, n: cf[f.re.length + i] })); R.silverFull = { re, pr: pr_, cond: f.c, eq: { re, pr: pr_ }, rev: false, book: true, id: 'silverFull' }; }
    const fmtEq = (r) => ALC.fmtEq(r);
    const soap = (r, gFat, gNaOH) => {                                // xà phòng hoá theo mol; r = 3 gốc R; trả về lí thuyết
      const M = fatM(r), nF = gFat / M, nB = gNaOH / 40, use = Math.min(nF, nB / 3), lim = Math.abs(nF - nB / 3) < 1e-9 ? 'cả hai' : nF < nB / 3 ? 'chất béo' : 'NaOH';
      const soapG = r.reduce((a, k) => a + use * soapM(k), 0), glyG = use * 92, fatLeft = Math.max(0, (nF - use) * M), baseLeft = Math.max(0, (nB - 3 * use) * 40);
      return { M, nF, nB, use, limiting: lim, soapG, glyG, fatUsed: use * M, fatLeft, baseLeft, check: use * M + 3 * use * 40 - soapG - glyG };
    };
    const agG = (gGluc) => gGluc / 180 * 2 * 108;
    const fermentG = (g) => g * 2 * 46 / 180, fermentCO2 = (g) => g * 2 * 44 / 180;
    const sucHydG = (g) => ({ glucose: g * 180 / 342, fructose: g * 180 / 342, water: g * 18 / 342 });
    const starchGluc = (g) => g * 180 / 162;                          // lí thuyết, hiệu suất 100%
    const polyM = (n) => 162 * n;
    const cnh2om = (f) => { const m = parseFormula(f), C = m.C || 0, H = m.H || 0, O = m.O || 0, ok = C > 0 && O > 0 && H === 2 * O && Object.keys(m).every((e) => 'CHO'.indexOf(e) >= 0); return { C, H, O, n: C, m: O, fits: ok, str: ok ? 'C' + C + '(H₂O)' + O : null }; };
    const SAMPLES = {                                                  // mẫu thử iodine / Tollens
      paste: { vi: 'hồ tinh bột', en: 'starch paste', starch: true, red: false, book: true },
      cellu: { vi: 'bột cellulose (giấy lọc)', en: 'cellulose (filter paper)', starch: false, red: false, book: true },
      gluc: { vi: 'dung dịch glucose', en: 'glucose solution', starch: false, red: true, book: true },
      sucr: { vi: 'dung dịch saccharose', en: 'sucrose solution', starch: false, red: false, book: true },
      water: { vi: 'nước', en: 'water', starch: false, red: false, book: true },
      rice: { vi: 'cơm', en: 'cooked rice', starch: true, red: false, book: false },
      potato: { vi: 'lát khoai', en: 'potato slice', starch: true, red: false, book: false },
      cassava: { vi: 'sắn luộc', en: 'boiled cassava', starch: true, red: false, book: false }
    };
    const iodine = (k, remain) => { const s = SAMPLES[k]; const f = s.starch ? (remain == null ? 1 : remain) : 0; return f > 0.25 ? 'xanh tím' : f > 0.08 ? 'xanh tím nhạt' : 'không đổi màu'; };
    const tollensNH3 = (drops, need) => drops <= 0 ? 'trống' : drops < need ? 'kết tủa' : drops === need ? 'trong' : 'thừa';   // thêm từ từ NH₃ đến khi kết tủa tan hết
    const mirror = (k, T, t) => { const s = SAMPLES[k]; if (!s || !s.red) return 0; return Math.max(0, Math.min(1, (T - 60) / 20)) * Math.max(0, Math.min(1, t / 5)); };   // gương bạc: từ ~70–80 °C, ~5 phút
    const starchRemain = (acidMl, boil, min) => (acidMl > 0 && boil) ? Math.exp(-min / 3) : 1;      // mô hình định tính: còn lại theo thời gian (min)
    function selfTest() {
      const T = [], add = (n, ok, got) => T.push({ name: n, ok: !!ok, got }), near = (a, b, e) => Math.abs(a - b) <= e, same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
      const co = (r) => r.re.concat(r.pr).map((s) => s.n);
      add('mọi phương trình Bài 28–30 cân bằng được (' + Object.keys(RX).length + ') và bảo toàn nguyên tử, khối lượng', Object.keys(R).every((k) => { const r = R[k]; if (!r) return false; const c = check({ re: r.re, pr: r.pr }); return c === true || (c && c.ok !== false); }), Object.keys(R).filter((k) => !R[k]).join());
      add('xà phòng hoá tristearin: 1·3·3·1; tripalmitin/triolein tương tự', same(co(R.soapStear), [1, 3, 3, 1]) && same(co(R.soapOlein), [1, 3, 3, 1]) && same(co(R.soapKOH), [1, 3, 3, 1]), co(R.soapStear).join());
      add('thuỷ phân tristearin trong acid 1·3·1·3; ester hoá glycerol 1·3·1·3', same(co(R.hydrol), [1, 3, 1, 3]) && same(co(R.ester3), [1, 3, 1, 3]) && R.ester3.rev, co(R.hydrol).join());
      add('tráng bạc: C₆H₁₂O₆ + Ag₂O → C₆H₁₂O₇ + 2Ag (1·1·1·2); phương trình đầy đủ trong chú thích sách 1·2·3·1·1·2·2', same(co(R.silver), [1, 1, 1, 2]) && same(co(R.silverFull), [1, 2, 3, 1, 1, 2, 2]), co(R.silverFull).join());
      add('lên men 1·2·2; thuỷ phân saccharose 1·1·2 (glucose + fructose); tinh bột 1·1·1 (mỗi mắt xích); quang hợp 6·6·1·6 (bổ sung)', same(co(R.ferment), [1, 2, 2]) && same(co(R.sucHyd), [1, 1, 2]) && same(co(R.starchHyd), [1, 1, 1]) && same(co(R.photo), [6, 6, 1, 6]), co(R.photo).join());
      add('M tristearin C₅₇H₁₁₀O₆ = 890; glycerol 92; C₁₇H₃₅COONa 306; NaOH 40', fatF(['C17H35', 'C17H35', 'C17H35']) === 'C57H110O6' && fatM(['C17H35', 'C17H35', 'C17H35']) === 890 && mm('C3H5(OH)3') === 92 && soapM('C17H35') === 306, fatF(['C17H35', 'C17H35', 'C17H35']));
      add('bảo toàn khối lượng: 890 + 120 = 1010 = 918 + 92; từ 890 g chất béo và NaOH đủ thu 918 g xà phòng và 92 g glycerol', (() => { const s = soap(['C17H35', 'C17H35', 'C17H35'], 890, 120); return near(s.soapG, 918, 1e-6) && near(s.glyG, 92, 1e-6) && near(s.check, 0, 1e-6) && s.limiting === 'cả hai'; })(), '');
      add('thiếu/dư NaOH: 890 g chất béo + 60 g NaOH ⇒ NaOH hết (chất béo dư 445 g); 890 g + 200 g ⇒ chất béo hết, dư 80 g NaOH', (() => { const a = soap(['C17H35', 'C17H35', 'C17H35'], 890, 60), b = soap(['C17H35', 'C17H35', 'C17H35'], 890, 200); return a.limiting === 'NaOH' && near(a.fatLeft, 445, 1e-6) && b.limiting === 'chất béo' && near(b.baseLeft, 80, 1e-6); })(), '');
      add('gốc R khác nhau: C₁₇H₃₅, C₁₇H₃₃, C₁₅H₃₁ ⇒ C₅₅H₁₀₄O₆, M 860; số liên kết C=C = 1', fatF(['C17H35', 'C17H33', 'C15H31']) === 'C55H104O6' && fatM(['C17H35', 'C17H33', 'C15H31']) === 860 && unsat(['C17H35', 'C17H33', 'C15H31']) === 1 && unsat(['C17H31', 'C17H33', 'C17H35']) === 3, fatF(['C17H35', 'C17H33', 'C15H31']));
      add('M: glucose 180, saccharose 342, mắt xích 162; 342 + 18 = 180 + 180', mm('C6H12O6') === 180 && mm('C12H22O11') === 342 && mm('C6H10O5') === 162 && mm('C12H22O11') + mm('H2O') === 2 * mm('C6H12O6'), '');
      add('180 g glucose tráng bạc → 216 g Ag; 90 g → 108 g', near(agG(180), 216, 1e-9) && near(agG(90), 108, 1e-9), agG(180));
      add('lên men 180 g glucose → 92 g C₂H₅OH + 88 g CO₂ (180 = 92 + 88)', near(fermentG(180), 92, 1e-9) && near(fermentCO2(180), 88, 1e-9), '');
      add('thuỷ phân 342 g saccharose + 18 g nước → 180 g glucose + 180 g fructose', near(sucHydG(342).glucose, 180, 1e-9) && near(sucHydG(342).fructose, 180, 1e-9) && near(sucHydG(342).water, 18, 1e-9), '');
      add('tinh bột: 162 g → 180 g glucose; 1 kg → 1,111 kg; (C₆H₁₀O₅)ₙ với n = 1000 ⇒ M = 162 000', near(starchGluc(162), 180, 1e-9) && near(starchGluc(1000), 1111.111, 1e-3) && polyM(1000) === 162000 && polyM(1) === 162, '');
      add('Cₙ(H₂O)ₘ: glucose C₆(H₂O)₆, saccharose C₁₂(H₂O)₁₁, mắt xích C₆(H₂O)₅; C₂H₅OH không thoả; CH₃COOH thoả công thức nhưng không phải carbohydrate (chỉ là kiểm tra điều kiện)', cnh2om('C6H12O6').str === 'C6(H₂O)6' && cnh2om('C12H22O11').str === 'C12(H₂O)11' && cnh2om('C6H10O5').str === 'C6(H₂O)5' && !cnh2om('C2H5OH').fits && cnh2om('CH3COOH').fits, cnh2om('CH3COOH').str);
      add('iodine: hồ tinh bột xanh tím; cellulose, glucose, saccharose, nước không đổi; sau thuỷ phân hết thì mất màu', iodine('paste') === 'xanh tím' && ['cellu', 'gluc', 'sucr', 'water'].every((k) => iodine(k) === 'không đổi màu') && iodine('paste', starchRemain(1, true, 10)) === 'không đổi màu' && iodine('paste', starchRemain(0, true, 10)) === 'xanh tím' && iodine('paste', starchRemain(1, false, 10)) === 'xanh tím', starchRemain(1, true, 10));
      add('Tollens: chỉ glucose có gương bạc, cần ≥ 70–80 °C và ~5 phút; saccharose không; NH₃ vừa đủ thì kết tủa tan', mirror('gluc', 80, 5) === 1 && mirror('gluc', 60, 5) === 0 && mirror('gluc', 80, 0) === 0 && mirror('sucr', 90, 5) === 0 && tollensNH3(2, 4) === 'kết tủa' && tollensNH3(4, 4) === 'trong' && tollensNH3(6, 4) === 'thừa', mirror('gluc', 70, 5));
      add('không NaN/∞: khối lượng 0, thời gian 0', [soap(['C17H35', 'C17H35', 'C17H35'], 0, 0)].every((s) => isFinite(s.soapG) && isFinite(s.check)) && isFinite(starchRemain(1, true, 0)) && agG(0) === 0 && isFinite(sucHydG(0).water), '');
      return T;
    }
    return { FA, RX, R, SAMPLES, fatF, fatM, soapM, soapFormula, acidF, unsat, soap, agG, fermentG, fermentCO2, sucHydG, starchGluc, polyM, cnh2om, iodine, tollensNH3, mirror, starchRemain, mm, fmtEq, selfTest };
  })();
  E.CHO = CHO; { const st2 = E.selfTest; E.selfTest = function () { return st2().concat(CHO.selfTest()); }; }
  L.engine.chem = E;
  const prev = L.engine.selfTest; L.engine.selfTest = function () { return prev().concat(E.selfTest()); };

  /* ----------------------------------------------------------------- GIAO DIỆN: kéo thả chung */
  function dnd(lab, hooks) {                                           // chip [data-chip] (data-kind, data-val) → vùng [data-zone]
    let drag = null, sel = null;
    const zones = () => $$('[data-zone]', lab);
    const over = (x, y) => { let h = null; zones().forEach((z) => { const r = z.getBoundingClientRect(), i = x >= r.left && x <= r.right && y >= r.top && y <= r.bottom; z.classList.toggle('is-over', i); if (i) h = z; }); return h; };
    const mark = () => $$('[data-chip]', lab).forEach((c) => c.classList.toggle('is-sel', sel && c.dataset.kind === sel.kind && c.dataset.val === sel.val));
    lab.addEventListener('pointerdown', (e) => { const c = e.target.closest('[data-chip]'); if (!c) return; drag = { kind: c.dataset.kind, val: c.dataset.val, x: e.clientX, y: e.clientY, moved: false, el: c }; c.setPointerCapture && c.setPointerCapture(e.pointerId); });
    lab.addEventListener('pointermove', (e) => { if (!drag) return; if (Math.abs(e.clientX - drag.x) + Math.abs(e.clientY - drag.y) > 8) { drag.moved = true; drag.el.classList.add('is-drag'); over(e.clientX, e.clientY); } });
    lab.addEventListener('pointerup', (e) => { if (!drag) return; const d = drag; drag = null; d.el.classList.remove('is-drag'); const z = over(e.clientX, e.clientY); zones().forEach((q) => q.classList.remove('is-over')); if (d.moved) { if (z) hooks.drop(d.kind, d.val, z.dataset.zone); } else { sel = (sel && sel.kind === d.kind && sel.val === d.val) ? null : { kind: d.kind, val: d.val }; mark(); } });
    lab.addEventListener('pointercancel', () => { drag = null; zones().forEach((q) => q.classList.remove('is-over')); $$('.is-drag', lab).forEach((q) => q.classList.remove('is-drag')); });
    lab.addEventListener('keydown', (e) => { const c = e.target.closest && e.target.closest('[data-chip]'); const z = e.target.closest && e.target.closest('[data-zone]'); if (/^Arrow/.test(e.key) && (c || z)) e.stopPropagation(); if ((e.key === 'Enter' || e.key === ' ') && c) { e.preventDefault(); e.stopPropagation(); sel = { kind: c.dataset.kind, val: c.dataset.val }; mark(); } else if ((e.key === 'Enter' || e.key === ' ') && z && sel) { e.preventDefault(); e.stopPropagation(); hooks.drop(sel.kind, sel.val, z.dataset.zone); } });
    lab.addEventListener('click', (e) => { const z = e.target.closest('[data-zone]'); if (z && sel && !e.target.closest('[data-chip]')) { hooks.drop(sel.kind, sel.val, z.dataset.zone); sel = null; mark(); } });
    return { clear() { sel = null; mark(); } };
  }
  const chipM = (M) => '<span class="pw__chip" role="button" tabindex="0" data-chip data-kind="metal" data-val="' + M + '" aria-label="' + M + ' ' + METALS[M].vi + '"><b>' + M + '</b> <small>' + METALS[M].vi.split(' ')[0] + '</small></span>';
  const chipR = (R) => '<span class="pw__chip" role="button" tabindex="0" data-chip data-kind="reagent" data-val="' + R + '" aria-label="' + REAGENTS[R].vi + '">' + pr(REAGENTS[R].vi, REAGENTS[R].en) + '</span>';
  const tubeSVG = (S, rx, prog) => {                                      // S: {M,R}; prog 0..1
    const R = S.R && REAGENTS[S.R], base = R ? R.col : '#f4f6fa', M = S.M && METALS[S.M];
    const gas = S.R === 'O2' || S.R === 'Cl2', solid = S.R === 'S', liquid = R && !gas && !solid;
    let blue = base; if (rx && rx.kind === 'react' && SALTS[S.R]) blue = mix(REAGENTS[S.R].col, S.M === 'Cu' ? '#4aa0e8' : S.M === 'Fe' ? '#d5ecd0' : '#e6f0f6', prog);
    let s = '<rect width="360" height="300" fill="#f6f8fc"/>';
    s += '<path d="M120 40 V235 Q120 262 150 262 H210 Q240 262 240 235 V40" fill="' + (gas ? (S.R === 'Cl2' ? mix('#fff', '#dce87c', 0.8) : '#f2f8ff') : '#fff') + '" stroke="#333" stroke-width="3"/>';
    if (liquid) s += '<path d="M123 120 H237 V235 Q237 259 150 259 H210 Q234 259 237 235 Z" fill="' + blue + '" opacity=".9"/><rect x="123" y="120" width="114" height="118" fill="' + blue + '" opacity=".9"/>';
    if (solid) s += '<path d="M130 250 q50 -22 100 0 v6 h-100 z" fill="#f2e04a"/>';
    if (M && S.R) {
      const y = liquid ? 150 + 60 * Math.min(1, prog * 3) * 0 : 140, rxn = rx && rx.kind === 'react', f = rxn ? clamp(1 - prog * 0.5, 0.4, 1) : 1;
      s += '<g transform="translate(160,' + (liquid ? 130 : 110) + ')"><rect width="40" height="' + (110 * f).toFixed(0) + '" rx="6" fill="' + M.color + '" stroke="#555" stroke-width="2"/>';
      if (rxn && SALTS[S.R]) s += '<rect x="-2" y="0" width="44" height="' + (110 * prog).toFixed(0) + '" rx="6" fill="' + (SALTS[S.R].X === 'Cu' ? '#c0603a' : SALTS[S.R].X === 'Ag' ? '#d9dde4' : METALS[SALTS[S.R].X].color) + '" opacity=".85"/>';
      s += '<text x="20" y="' + (55 * f).toFixed(0) + '" text-anchor="middle" font-size="16" font-weight="700" fill="#222">' + S.M + '</text></g>';
    }
    if (rx && rx.kind === 'react') {
      const bub = /H2/.test(rx.pr.map((q) => q.f).join(' ')) && (S.R === 'HCl' || S.R === 'H2SO4' || S.R === 'H2O' || S.R === 'steam'), n = bub ? Math.max(1, Math.round((3 + METALS[S.M].rank * 1.4) * (S.k || 1))) : 0;
      for (let i = 0; i < n; i++) { const ph = (prog * 3 + i * 0.37) % 1; s += '<circle cx="' + (136 + (i * 53) % 90) + '" cy="' + (235 - ph * 190).toFixed(1) + '" r="' + (3 + (i % 3)) + '" fill="#fff" stroke="#6a8cb0" opacity="' + (1 - ph * 0.5).toFixed(2) + '"/>'; }
      if (gas && prog > 0.05) s += '<g fill="none" stroke="#ffb000" stroke-width="3" opacity="' + (0.6 + 0.4 * Math.sin(prog * 25)).toFixed(2) + '"><path d="M150 120 l-14 -16 M200 120 l14 -16 M175 118 v-22"/></g>';
      if (S.R === 'H2O' && (S.M === 'Na' || S.M === 'K')) s += '<circle cx="' + (140 + prog * 80) + '" cy="124" r="9" fill="#e8ecf4" stroke="#555"/>';
    }
    if (!S.M && !S.R) s += '<text x="180" y="150" text-anchor="middle" font-size="14" fill="#7a8aa6">Kéo kim loại và chất vào ống / drag a metal and a reagent in</text>';
    return s + '<text x="180" y="290" text-anchor="middle" font-size="13" fill="#123">' + (S.R ? (REAGENTS[S.R].vi + ' / ' + REAGENTS[S.R].en) : '') + '</text>';
  };
  function mix(a, b, t) { const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b); return '#' + A.map((x, i) => Math.round(x + (B[i] - x) * t).toString(16).padStart(2, '0')).join(''); }
  /* ----------------------------------------------------------------- BÀN THÍ NGHIỆM (dùng cho chem-o2/cl/water/hcl/salt/free) */
  function bench(body, cfg) {
    const id = 'cb' + (++uid), S = { M: null, R: cfg.reagents.length === 1 ? cfg.reagents[0] : null, prog: 1, run: 0, notes: [], coef: {}, k: 1, guess: null };
    body.innerHTML = '<div class="olab em chem" data-lab="' + id + '"><p class="olab__hint">' + pr(cfg.hint[0], cfg.hint[1]) + '</p><div class="olab__cols"><div class="olab__stage"><div data-zone="tube" tabindex="0" role="button" aria-label="Ống nghiệm: kéo hoặc bấm để thả vào / Test tube: drop here"><svg class="olab__svg em__svg" viewBox="0 0 360 300" role="img" aria-label="Ống nghiệm / Test tube" data-r="tube"></svg></div></div><div class="olab__panel"><div data-r="chipsM"></div>' + (cfg.reagents.length > 1 ? '<div data-r="chipsR"></div>' : '') + '' + (cfg.rate ? '<label class="olab__ctl"><span>' + pr('Nồng độ acid (tương đối)', 'Acid concentration (relative)') + ' ×<output data-out="rate">1</output></span><input type="range" data-rate min="0.4" max="2" step="0.1" value="1"></label>' : '') + (cfg.time ? '<label class="olab__ctl"><span>' + pr('Thời gian', 'Time') + ' <output data-out="time">100</output> %</span><input type="range" data-time min="0" max="100" step="1" value="100"></label>' : '') + '<div class="olab__btns"><button type="button" class="btn btn--sm" data-act="go">' + pr('Chạy lại', 'Replay') + '</button><button type="button" class="btn btn--sm" data-act="pause" aria-pressed="false">' + pr('Tạm dừng', 'Pause') + '</button><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button></div></div></div><div data-r="res" aria-live="polite"></div><div data-r="note"></div><p class="olab__status" data-r="status" role="status"></p></div>';
    const lab = $('[data-lab="' + id + '"]', body), q = (n) => $('[data-r="' + n + '"]', lab);
    q('chipsM').innerHTML = '<div class="pw__zone" data-pool>' + cfg.metals.map(chipM).join('') + '</div>';
    if (q('chipsR')) q('chipsR').innerHTML = '<div class="pw__zone" data-pool>' + cfg.reagents.map(chipR).join('') + '</div>';
    let paused = false, raf = 0, vis = true, t0 = 0;
    const cur = () => (S.M && S.R ? react(S.M, S.R) : null);
    function result() {
      const rx = cur(); if (!rx) { q('res').innerHTML = ''; q('note').innerHTML = ''; return; }
      let h = '';
      if (rx.kind === 'react') {
        h = '<div class="chem__eq">' + eqHTML(rx) + '</div><p>' + pr(rx.obs[0], rx.obs[1]) + '</p>' + (rx.book ? '' : '<p><small>' + pr('Phương trình này được tính tự động theo quy tắc chung, không in trực tiếp trong sách (tổng hợp).', 'This equation is generated by general rules and is not printed in the book (our own synthesis).') + '</small></p>') + (['O2', 'Cl2', 'steam'].indexOf(S.R) >= 0 || S.M === 'Na' || S.M === 'K' ? '<p class="chem__safe"><small>' + pr('Hiệu ứng chỉ để minh hoạ — không tự thực hiện ở nhà; thí nghiệm thật cần giáo viên và dụng cụ bảo hộ.', 'The effect is only an illustration — do not try it at home; real experiments need a teacher and protective equipment.') + '</small></p>' : '') + coefUI(rx);
      } else if (rx.kind === 'none') h = '<p class="chem__none"><b>' + pr('Không phản ứng.', 'No reaction.') + '</b> ' + pr(rx.why[0], rx.why[1]) + '</p>';
      else h = '<p><small>' + pr(rx.why[0], rx.why[1]) + '</small></p>';
      q('res').innerHTML = h;
    }
    function coefUI(rx) {
      const sp = rx.re.concat(rx.pr), k = S.M + '|' + S.R;
      return '<div class="chem__coef"><small>' + pr('Tự viết hệ số rồi bấm kiểm tra:', 'Write the coefficients yourself, then check:') + '</small><div>' + sp.map((s, i) => (i === rx.re.length ? ' <span class="chem__arr"><small>' + (rx.cond || '') + '</small>→</span> ' : (i ? ' + ' : '')) + '<input type="number" min="1" max="12" class="chem__n" data-co="' + i + '" aria-label="Hệ số của ' + s.f + ' / coefficient of ' + s.f + '" value="' + ((S.coef[k] || [])[i] || '') + '"> ' + uni(s.f)).join('') + '</div><button type="button" class="btn btn--sm" data-act="chk">' + pr('Kiểm tra', 'Check') + '</button> <span data-r="cres"></span></div>';
    }
    function draw() { const rx = cur(); $('[data-r="tube"]', lab).innerHTML = tubeSVG(S, rx, S.prog); }
    function stepper(ts) { raf = 0; if (!lab.isConnected) return; if (!paused && S.prog < 1) { S.prog = clamp((ts - t0) / 4000, 0, 1); draw(); } if (S.prog < 1 && vis && !paused) raf = requestAnimationFrame(stepper); }
    function kick() { if (raf || !vis || paused) return; raf = requestAnimationFrame(stepper); }
    function start() { const rx = cur(); (window.ChemLab = window.ChemLab || {}).log = window.ChemLab.log || {}; if (rx) window.ChemLab.log[S.M + '|' + S.R] = rx.kind; if (cfg.predict && S.guess) setTimeout(() => verdict(rx), 0); S.prog = (REDUCED || !rx || rx.kind !== 'react') ? 1 : 0; t0 = performance.now(); draw(); result(); if (rx && rx.kind === 'react') { S.notes.push([S.M, S.R, rx.kind]); note(); } else if (rx) { S.notes.push([S.M, S.R, rx.kind]); note(); } kick(); status(); }
    function verdict(rx) { if (!rx || !S.guess) return; const yes = rx.kind === 'react', ok = (S.guess === 'yes') === yes, why = explain(S.M, S.R); q('status').className = 'olab__status ' + (ok ? 'olab__status--ok' : 'olab__status--warn'); q('status').innerHTML = (ok ? '✓ ' + pr('Dự đoán đúng. ', 'Correct prediction. ') : '✗ ' + pr('Dự đoán chưa đúng. ', 'Not quite. ')) + pr(why[0], why[1]); S.guess = null; }
    function note() { const rows = S.notes.slice(-8).map((n) => { const r = react(n[0], n[1]); return '<tr><td>' + n[0] + '</td><td>' + uni(REAGENTS[n[1]].f) + (n[1] === 'steam' ? ' (hơi / steam)' : '') + '</td><td>' + (r.kind === 'react' ? eqStr(r) : r.kind === 'none' ? pr('không phản ứng', 'no reaction') : '—') + '</td></tr>'; }).join(''); q('note').innerHTML = '<details open><summary>' + pr('Sổ thí nghiệm tự động', 'Automatic lab notebook') + '</summary><table class="olab__tbl chem__tbl"><thead><tr><th>' + pr('Kim loại', 'Metal') + '</th><th>' + pr('Chất', 'Reagent') + '</th><th>' + pr('Kết quả', 'Result') + '</th></tr></thead><tbody>' + rows + '</tbody></table><button type="button" class="btn btn--sm" data-act="copy">' + pr('Sao chép CSV', 'Copy CSV') + '</button></details>'; }
    function status() { const rx = cur(); q('status').innerHTML = rx ? '' : pr('Chọn một kim loại' + (cfg.reagents.length > 1 ? ' và một chất' : '') + ' rồi kéo vào ống nghiệm.', 'Pick a metal' + (cfg.reagents.length > 1 ? ' and a reagent' : '') + ' and drag it into the tube.'); }
    function ask() { q('res').innerHTML = '<p><b>' + pr('Dự đoán trước khi chạy:', 'Predict before running:') + '</b> ' + S.M + ' + ' + uni(REAGENTS[S.R].f) + '</p><button type="button" class="btn btn--sm" data-guess="yes">' + pr('Có phản ứng', 'Reaction') + '</button> <button type="button" class="btn btn--sm" data-guess="no">' + pr('Không phản ứng', 'No reaction') + '</button>'; q('note').innerHTML = ''; S.prog = 1; draw(); }
    const dd = dnd(lab, { drop(kind, val, zone) { if (zone !== 'tube') return; if (kind === 'metal') S.M = val; else if (cfg.reagents.indexOf(val) >= 0) S.R = val; else return; if (cfg.reagents.length === 1) S.R = cfg.reagents[0]; if (cfg.predict && S.M && S.R) { ask(); return; } start(); } });
    if ('IntersectionObserver' in window) new IntersectionObserver((es) => { vis = es[0].isIntersecting; if (vis) kick(); }).observe(lab);
    lab.addEventListener('input', (e) => { if (e.target.matches('[data-rate]')) { S.k = +e.target.value; $('[data-out="rate"]', lab).textContent = fmt(S.k, 1); draw(); } else if (e.target.matches('[data-time]')) { paused = true; S.prog = +e.target.value / 100; $('[data-out="time"]', lab).textContent = e.target.value; draw(); } });
    lab.addEventListener('click', (e) => {
      const gq = e.target.closest('[data-guess]'); if (gq) { S.guess = gq.dataset.guess; start(); return; }
      const a = e.target.closest('[data-act]'); if (!a) return;
      if (a.dataset.act === 'go') { if (cfg.predict) { ask(); return; } start(); }
      else if (a.dataset.act === 'pause') { paused = !paused; a.setAttribute('aria-pressed', paused); if (!paused) { t0 = performance.now() - S.prog * 4000; kick(); } }
      else if (a.dataset.act === 'reset') { S.M = null; S.R = cfg.reagents.length === 1 ? cfg.reagents[0] : null; S.prog = 1; S.notes = []; dd.clear(); draw(); q('res').innerHTML = ''; q('note').innerHTML = ''; status(); }
      else if (a.dataset.act === 'chk') { const rx = cur(), k = S.M + '|' + S.R, v = $$('[data-co]', lab).map((i) => +i.value || 0); S.coef[k] = v; const want = rx.re.concat(rx.pr).map((s) => s.n), g = v.reduce((x, y) => gcd(x, y), 0) || 1, norm = v.map((x) => x / g); const ok = v.every((x) => x > 0) && JSON.stringify(v) === JSON.stringify(want); const ratio = v.every((x) => x > 0) && JSON.stringify(norm) === JSON.stringify(want); $('[data-r="cres"]', lab).innerHTML = ok ? '<b style="color:var(--teal-d)">✓ ' + pr('Đúng!', 'Correct!') + '</b>' : ratio ? '<b>' + pr('Đúng tỉ lệ nhưng chưa tối giản.', 'Right ratio but not in lowest terms.') + '</b>' : '<b style="color:var(--red)">✗ ' + pr('Chưa đúng; đếm số nguyên tử mỗi nguyên tố hai vế.', 'Not yet; count the atoms of each element on both sides.') + '</b>' + ' (' + pr('đáp án', 'answer') + ': ' + want.join(', ') + ')'; }
      else if (a.dataset.act === 'copy') { const csv = 'metal,reagent,result\n' + S.notes.map((n) => { const r = react(n[0], n[1]); return n[0] + ',' + n[1] + ',"' + (r.kind === 'react' ? eqStr(r) : r.kind) + '"'; }).join('\n'); L.copyText && L.copyText(csv); }
    });
    draw(); status(); return { state: S, cfg, lab };
  }
  const BENCH = {
    'chem-o2': { metals: ['Fe', 'Al', 'Zn', 'Cu', 'Mg', 'Au'], reagents: ['O2'], hint: ['Kéo một kim loại vào bình khí oxygen (đun nóng). Quan sát, rồi tự viết hệ số phương trình. Au không phản ứng; Al, Zn tạo lớp oxide mỏng bảo vệ.', 'Drag a metal into the oxygen jar (heated). Observe, then write the coefficients yourself. Au does not react; Al and Zn form a thin protective oxide layer.'] },
    'chem-cl': { metals: ['Na', 'Fe', 'Cu', 'Al', 'Mg', 'Zn'], reagents: ['Cl2', 'S'], hint: ['Chọn khí chlorine hoặc lưu huỳnh, kéo kim loại vào. Mg, Zn + S để em tự viết. Muối tạo thành là chloride hoặc sulfide.', 'Pick chlorine or sulfur and drag a metal in. Mg, Zn + S are for you to write. The salts formed are chlorides or sulfides.'] },
    'chem-water': { metals: ['K', 'Na', 'Ca', 'Mg', 'Zn', 'Fe', 'Cu', 'Ag', 'Au'], reagents: ['H2O', 'steam'], hint: ['Kéo kim loại vào nước thường hoặc hơi nước nóng. K, Na, Ca tạo hydroxide + H₂; Zn, Fe với hơi nước tạo oxide + H₂; Cu, Ag, Au không phản ứng.', 'Drag a metal into cold water or hot steam. K, Na, Ca give hydroxide + H₂; Zn, Fe with steam give oxide + H₂; Cu, Ag, Au do not react.'] },
    'chem-hcl': { metals: ['Fe', 'Al', 'Zn', 'Mg', 'Cu', 'Ag'], reagents: ['HCl'], hint: ['Kéo kim loại vào ống đựng dung dịch HCl. Tốc độ sủi bọt tăng theo mức hoạt động hoá học; Cu, Ag không phản ứng.', 'Drag a metal into the HCl tube. Bubbling speeds up with reactivity; Cu and Ag do not react.'] },
    'chem-salt': { metals: ['Fe', 'Zn', 'Al', 'Mg', 'Cu', 'Ag', 'Au'], reagents: ['CuSO4', 'AgNO3', 'FeSO4'], hint: ['Chọn dung dịch muối rồi kéo kim loại vào. Kim loại mạnh hơn đẩy kim loại yếu hơn ra khỏi muối; Cu + FeSO₄ không phản ứng.', 'Pick a salt solution and drag a metal in. A stronger metal displaces a weaker one from its salt; Cu + FeSO₄ does not react.'] },
    'chem-free': { metals: ['Na', 'K', 'Ca', 'Mg', 'Al', 'Zn', 'Fe', 'Cu', 'Ag', 'Au'], reagents: ['O2', 'Cl2', 'S', 'H2O', 'steam', 'HCl', 'CuSO4', 'AgNO3', 'FeSO4'], hint: ['Bàn thí nghiệm tự do: kéo một kim loại và một chất vào ống; máy hiện hiện tượng, phương trình hoặc “không phản ứng” kèm giải thích. Sổ thí nghiệm ghi lại các lần thử.', 'Free bench: drag a metal and a reagent into the tube; the engine shows the observation, the equation or “no reaction” with an explanation. The notebook records every trial.'] }
  };
  /* ----------------------------------------------------------------- bảng cân bằng tự do (dưới bàn tự do) */
  function balancerExtra(body) {
    const id = 'bl' + (++uid);
    body.insertAdjacentHTML('beforeend', '<div class="olab em chem" data-lab="' + id + '" style="margin-top:12px"><p class="olab__hint">' + pr('Máy cân bằng phương trình: nhập vế trái và vế phải, ví dụ Fe + O2 → Fe3O4. Máy lập ma trận nguyên tố và giải bằng đại số tuyến tính, rồi kiểm tra bảo toàn nguyên tử và khối lượng.', 'Equation balancer: enter the left and right sides, e.g. Fe + O2 → Fe3O4. It builds the element matrix, solves it by linear algebra and checks conservation of atoms and mass.') + '</p><label>' + pr('Phương trình', 'Equation') + ' <input type="text" data-eq value="Al + HCl -> AlCl3 + H2" style="width:min(100%,320px)" aria-label="Phương trình / equation"></label> <button type="button" class="btn btn--sm" data-act="bal">' + pr('Cân bằng', 'Balance') + '</button><div data-r="out" aria-live="polite"></div></div>');
    const lab = $('[data-lab="' + id + '"]', body);
    const run = () => { const v = $('[data-eq]', lab).value.replace(/→|=>|==>|=/g, '->'); const parts = v.split('->'); const out = $('[data-r="out"]', lab); if (parts.length !== 2) { out.innerHTML = '<p>' + pr('Dùng “->” để ngăn hai vế.', 'Use “->” to separate the two sides.') + '</p>'; return; } try { const re = parts[0].split('+').map((s) => s.trim()).filter(Boolean), pr_ = parts[1].split('+').map((s) => s.trim()).filter(Boolean); const co = balance(re, pr_); if (!co) { out.innerHTML = '<p>' + pr('Không cân bằng được (công thức sai hoặc không có nghiệm duy nhất).', 'Cannot balance (wrong formula or no unique solution).') + '</p>'; return; } const eq = { re: re.map((f, i) => ({ f, n: co[i] })), pr: pr_.map((f, i) => ({ f, n: co[re.length + i] })) }; const c = check(eq); out.innerHTML = '<div class="chem__eq">' + eqHTML({ re: eq.re, pr: eq.pr, cond: '' }) + '</div><p>' + pr('Bảo toàn nguyên tử: ', 'Atoms conserved: ') + (c.atoms ? '✓' : '✗') + ' · ' + pr('Khối lượng hai vế (g/mol theo hệ số): ', 'Mass each side (g/mol by coefficients): ') + fmt(c.left, 2) + ' = ' + fmt(c.right, 2) + '</p>'; } catch (e) { out.innerHTML = '<p>' + pr('Lỗi công thức: ', 'Formula error: ') + e.message + '</p>'; } };
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-act="bal"]')) run(); });
    lab.addEventListener('keydown', (e) => { e.stopPropagation(); if (e.key === 'Enter') run(); });
    run();
  }
  /* ----------------------------------------------------------------- Zn + HCl: tính toán */
  function znLab(body) {
    const id = 'zn' + (++uid), S = { m: 0.5, v: 15, Vm: 24.79, goal: 250 };
    body.innerHTML = '<div class="olab em chem" data-lab="' + id + '"><p class="olab__hint">' + pr('Zn + 2HCl → ZnCl₂ + H₂. Kéo thanh trượt khối lượng kẽm và thể tích dung dịch HCl 1 M; bình hứng khí có vạch chia cho thấy V(H₂). Nhiệm vụ: tìm lượng vừa đủ để thu 250 mL H₂ (điều kiện chuẩn, Vm chọn được).', 'Zn + 2HCl → ZnCl₂ + H₂. Drag the zinc-mass and 1 M HCl-volume sliders; the graduated gas vessel shows V(H₂). Task: find the amounts that give exactly 250 mL of H₂ (standard conditions, Vm selectable).') + '</p><div class="olab__cols"><div class="olab__stage"><svg class="olab__svg em__svg" viewBox="0 0 360 300" role="img" aria-label="Bình hứng khí hydrogen có vạch chia / Graduated gas-collection vessel" data-r="svg"></svg></div><div class="olab__panel"><label class="olab__ctl"><span>m(Zn) = <output data-out="m"></output> g</span><input type="range" data-k="m" min="0" max="2" step="0.01"></label><label class="olab__ctl"><span>V(HCl 1 M) = <output data-out="v"></output> mL</span><input type="range" data-k="v" min="0" max="60" step="0.5"></label><label>' + pr('Thể tích mol Vm', 'Molar volume Vm') + ' <select data-vm><option value="24.79">24,79 L/mol (25 °C, 1 bar)</option><option value="22.4">22,4 L/mol (0 °C, 1 atm)</option></select></label><div class="olab__read" data-r="read" aria-live="polite"></div><div class="olab__btns"><button type="button" class="btn btn--sm" data-act="chk">' + pr('Kiểm tra: thu đúng 250 mL', 'Check: collect exactly 250 mL') + '</button><button type="button" class="btn btn--sm" data-act="ans">' + pr('Xem đáp án', 'Show answer') + '</button><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button></div></div></div><p class="olab__status" data-r="status" role="status"></p></div>';
    const lab = $('[data-lab="' + id + '"]', body), q = (n) => $('[data-r="' + n + '"]', lab);
    function render() {
      const h = stoich.h2Produced(S.m, S.v, 1, S.Vm), V = h.V_mL, y = 260 - clamp(V / 300, 0, 1) * 200;
      let s = '<rect width="360" height="300" fill="#f6f8fc"/><rect x="40" y="200" width="90" height="70" fill="#dcefff" stroke="#333" stroke-width="2"/><rect x="48" y="' + (270 - clamp(S.v / 60, 0, 1) * 62) + '" width="74" height="' + (clamp(S.v / 60, 0, 1) * 62) + '" fill="#cfe2f5"/><text x="85" y="292" text-anchor="middle" font-size="12">HCl 1 M</text><rect x="60" y="245" width="' + (clamp(S.m / 2, 0, 1) * 50) + '" height="8" fill="#9fb0c3"/><path d="M130 215 Q190 215 220 180 V60" fill="none" stroke="#555" stroke-width="3"/><rect x="210" y="50" width="70" height="215" fill="#fff" stroke="#333" stroke-width="3"/><rect x="213" y="' + (265 - 0) + '" width="64" height="0" fill="none"/><rect x="213" y="' + y.toFixed(1) + '" width="64" height="' + (262 - y).toFixed(1) + '" fill="#cfe6ff" opacity=".7"/>';
      for (let k = 0; k <= 300; k += 50) { const yy = 260 - k / 300 * 200; s += '<line x1="280" y1="' + yy + '" x2="292" y2="' + yy + '" stroke="#333"/><text x="296" y="' + (yy + 4) + '" font-size="11">' + k + '</text>'; }
      s += '<line x1="213" y1="' + (260 - S.goal / 300 * 200) + '" x2="277" y2="' + (260 - S.goal / 300 * 200) + '" stroke="var(--red)" stroke-dasharray="4 3"/><text x="214" y="42" font-size="12">V(H₂) mL</text>';
      q('svg').innerHTML = s;
      q('read').innerHTML = '<table class="olab__tbl olab__tbl--read"><tbody><tr><th scope="row">n(Zn)</th><td>' + fmt(h.nZn, 4) + ' mol</td></tr><tr><th scope="row">n(HCl)</th><td>' + fmt(h.nHCl, 4) + ' mol</td></tr><tr><th scope="row">' + pr('Chất hết', 'Limiting') + '</th><td>' + h.limiting + '</td></tr><tr><th scope="row">V(H₂)</th><td><b>' + fmt(V, 1) + ' mL</b></td></tr></tbody></table>';
      $$('[data-k]', lab).forEach((e) => { e.value = S[e.dataset.k]; $('[data-out="' + e.dataset.k + '"]', lab).textContent = fmt(S[e.dataset.k], e.dataset.k === 'm' ? 2 : 1); }); $('[data-vm]', lab).value = String(S.Vm);
    }
    lab.addEventListener('input', (e) => { const k = e.target.dataset && e.target.dataset.k; if (k) { S[k] = +e.target.value; render(); } if (e.target.matches && e.target.matches('[data-vm]')) { S.Vm = +e.target.value; render(); } });
    lab.addEventListener('change', (e) => { if (e.target.matches && e.target.matches('[data-vm]')) { S.Vm = +e.target.value; render(); } });
    lab.addEventListener('click', (e) => { const a = e.target.closest('[data-act]'); if (!a) return; const t = stoich.znHCl(S.goal, S.Vm, 1);
      if (a.dataset.act === 'reset') { Object.assign(S, { m: 0.5, v: 15 }); q('status').innerHTML = ''; render(); }
      else if (a.dataset.act === 'ans') { q('status').innerHTML = pr('n(H₂) = ' + fmt(S.goal / 1000 / S.Vm, 5) + ' mol ⇒ m(Zn) = ' + fmt(t.mZn, 3) + ' g; n(HCl) = ' + fmt(t.nHCl, 5) + ' mol ⇒ V(HCl 1 M) = ' + fmt(t.vHCl_mL, 1) + ' mL (Vm = ' + fmt(S.Vm, 2) + ' L/mol).', 'n(H₂) = ' + fmt(S.goal / 1000 / S.Vm, 5) + ' mol ⇒ m(Zn) = ' + fmt(t.mZn, 3) + ' g; n(HCl) = ' + fmt(t.nHCl, 5) + ' mol ⇒ V(1 M HCl) = ' + fmt(t.vHCl_mL, 1) + ' mL (Vm = ' + fmt(S.Vm, 2) + ' L/mol).'); }
      else { const h = stoich.h2Produced(S.m, S.v, 1, S.Vm), ok = Math.abs(h.V_mL - S.goal) <= 0.02 * S.goal, exact = Math.abs(S.m - t.mZn) <= 0.02 && Math.abs(S.v - t.vHCl_mL) <= 0.7; q('status').className = 'olab__status ' + (ok && exact ? 'olab__status--ok' : 'olab__status--warn'); q('status').innerHTML = ok && exact ? pr('Đúng! Zn và HCl đều vừa đủ, thu được ' + fmt(h.V_mL, 0) + ' mL H₂.', 'Correct! Zn and HCl are just enough, giving ' + fmt(h.V_mL, 0) + ' mL H₂.') : ok ? pr('Thu đủ 250 mL nhưng có chất dư; hãy tìm lượng vừa đủ.', 'You get 250 mL but one reagent is in excess; find the exact amounts.') : pr('Hiện thu ' + fmt(h.V_mL, 0) + ' mL; chất hết là ' + h.limiting + '. Điều chỉnh để đủ 250 mL.', 'Now you collect ' + fmt(h.V_mL, 0) + ' mL; the limiting reagent is ' + h.limiting + '. Adjust to reach 250 mL.'); } });
    render(); return { state: S };
  }
  /* ----------------------------------------------------------------- tính chất vật lí */
  function physLab(body) {
    const id = 'ph' + (++uid), S = { sample: null, test: null, game: null };
    const TESTS = [['hammer', 'Đập bằng búa', 'Hammer test'], ['circuit', 'Mắc vào mạch điện (bóng đèn)', 'Put in a circuit (bulb)'], ['heat', 'Nhúng cán vào nước nóng', 'Dip the handle in hot water'], ['shine', 'Soi dưới ánh sáng', 'Look under light']];
    body.innerHTML = '<div class="olab em chem" data-lab="' + id + '"><p class="olab__hint">' + pr('Kéo một mẫu vật vào một ô thử nghiệm: búa (dẻo), mạch điện (dẫn điện), nước nóng (dẫn nhiệt), ánh sáng (ánh kim). Số liệu độ dẫn là ví dụ minh hoạ, hãy đối chiếu Bảng 11.3 của sách.', 'Drag a sample into a test box: hammer (malleable), circuit (conducts electricity), hot water (conducts heat), light (lustre). Conductivity figures are illustrative; compare with Table 11.3 of the book.') + '</p><div class="pw__zone" data-pool>' + Object.keys(METALS).filter((m) => ['Cu', 'Al', 'Fe', 'Au', 'Ag', 'W', 'Hg', 'Zn'].indexOf(m) >= 0).map(chipM).join('') + Object.keys(NONMETAL).map((k) => '<span class="pw__chip" role="button" tabindex="0" data-chip data-kind="nm" data-val="' + k + '">' + pr(NONMETAL[k][0], NONMETAL[k][1]) + '</span>').join('') + '</div><div class="olab__cols">' + TESTS.map((t) => '<div class="pw__zone" data-zone="' + t[0] + '" tabindex="0" role="button"><b>' + pr(t[1], t[2]) + '</b></div>').join('') + '</div><div data-r="res" aria-live="polite"></div><div class="chem__game"><b>' + pr('Trò chơi kỉ lục', 'Records game') + '</b> <span data-r="gq"></span><div data-r="go"></div></div><p class="olab__status" data-r="status" role="status"></p></div>';
    const lab = $('[data-lab="' + id + '"]', body), q = (n) => $('[data-r="' + n + '"]', lab);
    const info = (kind, val) => kind === 'metal' ? Object.assign({ name: METALS[val].vi, en: METALS[val].en, metal: true }, METALS[val]) : { name: NONMETAL[val][0], en: NONMETAL[val][1], metal: false, mal: 0, sigma: 0, k: 1, mp: 800, color: '#bdb4a2' };
    function show(kind, val, test) {
      const m = info(kind, val); let t, v, ok = true;
      if (test === 'hammer') { ok = !!m.mal; t = ok ? 'Bị dát mỏng, biến dạng dẻo (không vỡ).' : (m.metal ? 'Hg là chất lỏng nên không dát được.' : 'Vỡ vụn hoặc không biến dạng dẻo.'); v = ok ? 'It flattens without breaking (malleable).' : (m.metal ? 'Hg is liquid, so it cannot be hammered.' : 'It shatters or does not deform plastically.'); }
      else if (test === 'circuit') { ok = m.sigma > 0; const bright = clamp(m.sigma / 100, 0, 1); t = ok ? 'Bóng đèn sáng, độ sáng tương đối ' + fmt(bright * 100, 0) + ' % so với đồng (ví dụ).' : 'Bóng đèn không sáng: không dẫn điện.'; v = ok ? 'The bulb lights, relative brightness ' + fmt(bright * 100, 0) + ' % vs copper (example).' : 'The bulb stays off: no conduction.'; }
      else if (test === 'heat') { ok = m.k > 5; t = ok ? 'Cán nóng lên nhanh, độ dẫn nhiệt tương đối ' + fmt(m.k, 0) + ' (đồng = 100, ví dụ).' : 'Cán hầu như không nóng: dẫn nhiệt kém.'; v = ok ? 'The handle warms quickly; relative conductivity ' + fmt(m.k, 0) + ' (Cu = 100, example).' : 'The handle hardly warms: poor conductor.'; }
      else { ok = m.metal; t = ok ? 'Bề mặt sáng lấp lánh (ánh kim).' : 'Bề mặt xỉn, không có ánh kim.'; v = ok ? 'A bright shiny surface (metallic lustre).' : 'A dull surface, no metallic lustre.'; }
      q('res').innerHTML = '<p><b>' + pr(m.name.split(' ')[0] || m.name, m.en) + ' — ' + test + ':</b> ' + pr(t, v) + (m.metal && m.mp ? ' <small>' + pr('Nhiệt độ nóng chảy ≈ ', 'Melting point ≈ ') + fmt(m.mp, 0) + ' °C</small>' : '') + '</p>';
    }
    const GAME = [['Kim loại dẻo nhất', 'The most malleable metal', 'Au'], ['Kim loại dẫn điện tốt nhất', 'The best electrical conductor', 'Ag'], ['Kim loại dẫn nhiệt tốt nhất', 'The best thermal conductor', 'Ag'], ['Kim loại có nhiệt độ nóng chảy cao nhất', 'The metal with the highest melting point', 'W'], ['Kim loại có nhiệt độ nóng chảy thấp nhất', 'The metal with the lowest melting point', 'Hg']];
    let gi = 0; const gshow = () => { const g = GAME[gi % GAME.length]; q('gq').innerHTML = pr(g[0] + '?', g[1] + '?'); q('go').innerHTML = ['Au', 'Ag', 'Cu', 'W', 'Hg', 'Fe'].map((m) => '<button type="button" class="btn btn--sm" data-ans="' + m + '">' + m + '</button>').join(' '); };
    dnd(lab, { drop(kind, val, zone) { if (zone === 'pool') return; show(kind, val, zone); } });
    lab.addEventListener('click', (e) => { const a = e.target.closest('[data-ans]'); if (!a) return; const g = GAME[gi % GAME.length], ok = a.dataset.ans === g[2]; q('status').className = 'olab__status ' + (ok ? 'olab__status--ok' : 'olab__status--warn'); q('status').innerHTML = ok ? pr('Đúng: ' + g[2] + ' (' + METALS[g[2]].vi + ').', 'Correct: ' + g[2] + ' (' + METALS[g[2]].en + ').') : pr('Chưa đúng; thử lại.', 'Not yet; try again.'); if (ok) { gi++; gshow(); } });
    gshow(); return { state: S };
  }
  const USE = {
    hint: ['Kéo kim loại vào ứng dụng phù hợp rồi chọn tính chất làm căn cứ. Mỗi ứng dụng dựa vào một tính chất vật lí (Hình 18.1).', 'Drag each metal to a suitable use and pick the property it relies on. Each use depends on a physical property (Figure 18.1).'],
    ordered: 0, multi: 0,
    boxes: [{ id: 'wire', vi: 'Lõi dây điện — dẫn điện tốt', en: 'Electric wire core — conducts well' }, { id: 'pot', vi: 'Xoong, nồi, chảo — dẫn nhiệt, nhẹ', en: 'Cookware — conducts heat, light' }, { id: 'jew', vi: 'Trang sức — ánh kim, dẻo, bền', en: 'Jewellery — lustre, malleable, durable' }, { id: 'bridge', vi: 'Cầu, khung nhà — cứng, chịu lực', en: 'Bridges, frames — strong, load-bearing' }],
    items: [{ id: 'cu', vi: 'Đồng (Cu)', en: 'Copper (Cu)', to: ['wire'] }, { id: 'al', vi: 'Nhôm (Al)', en: 'Aluminium (Al)', to: ['pot', 'wire'] }, { id: 'au', vi: 'Vàng (Au)', en: 'Gold (Au)', to: ['jew'] }, { id: 'fe', vi: 'Thép (Fe)', en: 'Steel (Fe)', to: ['bridge'] }, { id: 'ag', vi: 'Bạc (Ag)', en: 'Silver (Ag)', to: ['jew'] }],
    note: ['Dây điện thường dùng đồng và nhôm, không dùng sắt vì điện trở suất của sắt lớn hơn (đối chiếu Bảng 11.3). Nhôm cũng có thể dùng làm dây dẫn.', 'Wires are usually copper and aluminium, not iron, because iron’s resistivity is greater (compare Table 11.3). Aluminium can also serve as a conductor.'],
    explain: ['Ứng dụng dựa trên tính chất vật lí của kim loại.', 'Each use relies on a physical property of the metal.']
  };
  const sims = {
    'chem-phys': { fn: physLab, vi: 'Tính chất vật lí của kim loại (Hình 18.1)', en: 'Physical properties of metals (Figure 18.1)', intro: 'Kéo mẫu vào ô thử.' },
    'chem-o2': { fn: (b) => bench(b, BENCH['chem-o2']), vi: 'Kim loại tác dụng với oxygen (Hình 18.2)', en: 'Metals and oxygen (Figure 18.2)', intro: 'Kéo kim loại vào bình O₂.' },
    'chem-cl': { fn: (b) => bench(b, BENCH['chem-cl']), vi: 'Kim loại tác dụng với chlorine và lưu huỳnh (Hình 18.3–18.4)', en: 'Metals with chlorine and sulfur (Figures 18.3–18.4)', intro: 'Chọn chất, kéo kim loại.' },
    'chem-water': { fn: (b) => bench(b, BENCH['chem-water']), vi: 'Kim loại tác dụng với nước và hơi nước', en: 'Metals with water and steam', intro: 'Kéo kim loại vào nước.' },
    'chem-hcl': { fn: (b) => bench(b, BENCH['chem-hcl']), vi: 'Kim loại tác dụng với dung dịch HCl', en: 'Metals with hydrochloric acid', intro: 'Kéo kim loại vào HCl.' },
    'chem-zn': { fn: znLab, vi: 'Tính lượng kẽm và HCl (điều chế H₂)', en: 'Zinc and HCl amounts (making H₂)', intro: 'Kéo thanh trượt để thu 250 mL H₂.' },
    'chem-salt': { fn: (b) => bench(b, BENCH['chem-salt']), vi: 'Kim loại tác dụng với dung dịch muối (Hình 18.5)', en: 'Metals with salt solutions (Figure 18.5)', intro: 'Chọn muối, kéo kim loại.' },
    'chem-free': { fn: (b) => { const r = bench(b, BENCH['chem-free']); balancerExtra(b); return r; }, vi: 'Bàn thí nghiệm tự do kim loại', en: 'Free metals bench', intro: 'Kéo kim loại và chất vào ống.' },
    'chem-use': { fn: (b) => window.EnergyLab.sorter(b, USE), vi: 'Chọn kim loại theo ứng dụng', en: 'Choosing a metal for a purpose', intro: 'Kéo kim loại vào ứng dụng.' }
  };
  window.LabSims = Object.assign(window.LabSims || {}, sims);
  window.ChemLab = Object.assign(window.ChemLab || {}, { engine: E, bench, BENCH, dnd, chipM, chipR, tubeSVG, REDUCED });
})();
