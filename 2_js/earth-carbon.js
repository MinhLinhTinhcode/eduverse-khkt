/* ==========================================================================
   EARTH CARBON — mở rộng EarthLab.engine cho Bài 34–35. Nạp SAU earth-lab.js, TRƯỚC mol-lab.js. Không đụng DOM.
   Gắn vào EarthLab.engine: CYCLE (mô hình chu trình carbon), CAVE (hang động đá vôi), OIL (Bảng 35.1 và công cụ vẽ đồ thị),
   HEAT/HYDRATE/GHG/QUARRY/LIFE (mô hình định tính), FOSSIL, CFORMS, MSRC (dữ liệu phân loại).
   SỐ LIỆU TỪ SÁCH: Bảng 35.1 (sản lượng dầu thô thế giới, tỉ thùng); 2021: 95,70 triệu thùng/ngày, 4,177 tỉ m³/ngày, 7,7 tỉ tấn/năm; trữ lượng Việt Nam 2020 (BP): 3,36 tỉ tấn than, 4,4 tỉ thùng dầu, 600 tỉ m³ khí;
   CO₂ khí quyển 0,030 % → 0,040 % (1901–2020), +1,5 °C (EPA); cam kết không quá 2 °C; băng cháy: trên 30 bar, dưới 0 °C.
   MÔ HÌNH GIÁO DỤC ĐỊNH TÍNH (KHÔNG dự báo số liệu thực): chu trình carbon (đơn vị mô hình), hang động, hiệu ứng nhà kính, tác động khai thác đá, chỉ số carbon của em.
   CÁCH THÊM: bể chứa/dòng carbon mới → thêm vào RES0 và flows() (mọi dòng phải là chuyển giữa hai bể để bảo toàn tổng); hành động xanh mới → thêm vào LIFE; thẻ phân loại → FOSSIL/CFORMS/MSRC.
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab, EA = window.EarthLab;
  if (!L || !EA || !EA.engine) return;
  const EE = EA.engine, near = (a, b, e) => Math.abs(a - b) <= e, clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const fin = (x, d) => (isFinite(+x) ? +x : d);
  /* ===================================================== chu trình carbon (đơn vị mô hình; tổng carbon không đổi) */
  const RES0 = { A: 100, B: 100, O: 300, S: 1000, F: 500 };          // khí quyển, sinh vật, đại dương, đất đá/trầm tích, nhiên liệu hoá thạch
  const BASE = { veg: 1, burn: 0, cement: 0, fire: 0, volc: 1, ocean: 1 };
  const total = (s) => s.A + s.B + s.O + s.S + s.F;
  const MAXP = { veg: 5, burn: 100, cement: 100, fire: 100, volc: 100, ocean: 5 };
  function clean(p) { const q = {}; Object.keys(BASE).forEach((k) => (q[k] = clamp(fin(p && p[k], BASE[k]), 0, MAXP[k]))); return q; }
  function flows(s, p, dt) {
    p = clean(p); dt = dt || 0.25;
    const cap = (x, have, share) => Math.max(0, Math.min(x, (share || 0.45) * have / dt));
    return {
      photo: 10 * (s.A / 100) * p.veg,                                // quang hợp: khí quyển → sinh vật
      resp: 9.95 * (s.B / 100),                                       // hô hấp, phân huỷ: sinh vật → khí quyển
      bury: 0.05 * (s.B / 100),                                       // xác sinh vật vùi lấp → trầm tích (muối carbonate)
      dis: 20.05 * (s.A / 100) * p.ocean,                             // hoà tan vào đại dương: khí quyển → đại dương
      out: 20 * (s.O / 300),                                          // đại dương → khí quyển
      sed: 0.05 * (s.O / 300),                                        // lắng đọng carbonate: đại dương → trầm tích
      volc: cap(0.1 * p.volc, s.S),                                   // núi lửa: đất đá → khí quyển
      burn: cap(p.burn, s.F, 0.9),                                         // đốt nhiên liệu hoá thạch: → khí quyển
      cement: cap(p.cement, s.S),                                     // sản xuất vôi, xi măng: đá vôi → khí quyển
      fire: cap(p.fire, s.B)                                          // cháy rừng: sinh vật → khí quyển
    };
  }
  const netAtm = (s, p, dt) => { const f = flows(s, p, dt); return f.resp + f.out + f.volc + f.burn + f.cement + f.fire - f.photo - f.dis; };
  function step(s, p, dt) {
    dt = dt || 0.25; const f = flows(s, p, dt), n = { A: s.A, B: s.B, O: s.O, S: s.S, F: s.F };
    n.A += dt * (f.resp + f.out + f.volc + f.burn + f.cement + f.fire - f.photo - f.dis);
    n.B += dt * (f.photo - f.resp - f.bury - f.fire);
    n.O += dt * (f.dis - f.out - f.sed);
    n.S += dt * (f.bury + f.sed - f.volc - f.cement);
    n.F -= dt * f.burn;
    return n;
  }
  function run(p, years, s0, dt) { dt = dt || 0.25; let s = Object.assign({}, s0 || RES0); const out = [Object.assign({ t: 0 }, s)]; for (let t = dt, i = 0; t <= years + 1e-9; t += dt, i++) { s = step(s, p, dt); out.push(Object.assign({ t: Math.round(t * 1000) / 1000 }, s)); } return out; }
  const co2pct = (A) => 0.030 * A / 100;                              // chuẩn hoá: A = 100 ↔ 0,030 % (mốc 1901 của sách)
  const mission = (p) => { const r = run(p, 100), e = r[r.length - 1]; return { ok: e.A <= 105 && Math.abs(netAtm(e, p)) <= 0.3, A: e.A, net: netAtm(e, p), pct: co2pct(e.A) }; };
  const CYCLE = { RES0, BASE, total, flows, netAtm, step, run, co2pct, mission, clean };
  /* ===================================================== hang động đá vôi (định tính; ghi “mở rộng”) */
  function cave(c, tt, e) {                                           // c: CO₂ hoà tan/mưa acid 0–1; tt: thời gian 0–100; e: phần đọng lại (bay hơi, thoát CO₂) 0–1
    c = clamp(fin(c, 0), 0, 1); tt = clamp(fin(tt, 0), 0, 100); e = clamp(fin(e, 0), 0, 1);
    const D = 0.4 * c * tt, dep = D * e;                                // D: CaCO₃ bị hoà tan (% khối đá ban đầu)
    return { cavity: D, deposit: dep, carried: D - dep, rockLeft: 100 - D };
  }
  /* ===================================================== Bảng 35.1 và công cụ vẽ đồ thị */
  const OIL = (function () {
    const YEARS = [1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016], VALS = [23.7, 24.5, 26.2, 28.2, 30.5, 31.8, 33.2, 35.4];
    const r1 = (x) => Math.round(x * 1000) / 1000;
    const rise = () => r1(VALS[VALS.length - 1] - VALS[0]);           // 11,7 tỉ thùng
    const pct = () => (VALS[VALS.length - 1] - VALS[0]) / VALS[0] * 100;
    const years = () => YEARS[YEARS.length - 1] - YEARS[0];            // 28 năm
    const rate = () => rise() / years();                              // ≈ 0,418 tỉ thùng/năm
    const seg = () => VALS.slice(1).map((v, i) => r1((v - VALS[i]) / (YEARS[i + 1] - YEARS[i])));  // tốc độ từng giai đoạn
    function fit(vals) { vals = vals || VALS; const n = vals.length, mx = YEARS.reduce((a, b) => a + b, 0) / n, my = vals.reduce((a, b) => a + b, 0) / n; let sxy = 0, sxx = 0; vals.forEach((v, i) => { sxy += (YEARS[i] - mx) * (v - my); sxx += (YEARS[i] - mx) * (YEARS[i] - mx); }); const k = sxy / sxx; return { slope: k, at: (y) => my + k * (y - mx) }; }
    /* chấm các điểm học sinh vẽ: user = mảng 8 giá trị; tol = sai số cho phép (tỉ thùng) */
    function grade(user, tol) { tol = tol == null ? 0.5 : tol; const bad = []; VALS.forEach((v, i) => { const u = +(user && user[i]); if (!isFinite(u) || Math.abs(u - v) > tol) bad.push(i); }); return { ok: bad.length === 0, bad, n: VALS.length - bad.length }; }
    const D2021 = { oil: 95.70, gas: 4.177, coal: 7.7 };               // triệu thùng/ngày; tỉ m³/ngày; tỉ tấn/năm
    const VN2020 = { coal: 3.36, oil: 4.4, gas: 600 };                 // tỉ tấn; tỉ thùng; tỉ m³ (BP 2021, đọc từ bản scan)
    const oilYear2021 = () => D2021.oil * 365 / 1000;                  // tỉ thùng/năm tính từ 95,70 triệu thùng/ngày
    return { YEARS, VALS, rise, pct, years, rate, seg, fit, grade, D2021, VN2020, oilYear2021 };
  })();
  /* ===================================================== băng cháy, hiệu ứng nhà kính, khai thác đá, lối sống xanh */
  const hydrate = (P, T) => P > 30 && T < 0;
  const GHG = (function () {
    const CO2_0 = 0.030, CO2_1 = 0.040, CH4_0 = 20, CH4_1 = 50;       // CH₄: thang tương đối (20 = mốc 1901, 50 = mốc 2020) chỉ để minh hoạ
    const warm = (co2, ch4) => clamp(1.5 * (0.85 * (fin(co2, CO2_0) - CO2_0) / (CO2_1 - CO2_0) + 0.15 * (fin(ch4, CH4_0) - CH4_0) / (CH4_1 - CH4_0)), 0, 6);
    const sea = (dT) => Math.round(clamp(dT / 4, 0, 1) * 100), acid = (co2) => Math.round(clamp((fin(co2, CO2_0) - CO2_0) / 0.040, 0, 1) * 100), extreme = (dT) => Math.round(clamp(dT / 3, 0, 1) * 100), layer = (co2, ch4) => clamp(0.15 + 0.85 * (fin(co2, CO2_0) - 0.020) / 0.060 + 0.1 * (fin(ch4, CH4_0) - 20) / 80, 0.1, 1);
    return { CO2_0, CO2_1, CH4_0, CH4_1, warm, sea, acid, extreme, layer, MARK1: 1.5, MARK2: 2 };
  })();
  const QUARRY = (function () {
    const STEPS = ['drill', 'charge', 'blast', 'load', 'haul', 'crush'];
    const MEAS = { spray: { dust: 0.5 }, plant: { erosion: 0.5, habitat: 0.6, dust: 0.85 }, pond: { water: 0.4 }, plan: { all: 0.7 }, blastctl: { noise: 0.6, dust: 0.85 } };
    function impact(scale, on) {
      scale = clamp(fin(scale, 0), 0, 100); on = on || {};
      const base = { dust: 0.9, noise: 0.7, erosion: 0.8, water: 0.6, habitat: 0.85 }, out = {};
      Object.keys(base).forEach((k) => { let v = base[k] * scale; Object.keys(MEAS).forEach((m) => { if (on[m]) { const f = MEAS[m]; v *= f.all != null ? f.all : f[k] != null ? f[k] : 1; } }); out[k] = Math.round(clamp(v, 0, 100)); });
      return out;
    }
    return { STEPS, MEAS, impact };
  })();
  const LIFE = { public: -14, ev: -12, save: -12, e5: -4, bio: -4, tree: -10, sort: -5, reuse: -6, stove: -8 };
  const life = (sel) => { let v = 100; Object.keys(LIFE).forEach((k) => { if (sel && sel[k]) v += LIFE[k]; }); return Math.max(10, Math.round(v)); };
  /* ===================================================== dữ liệu phân loại */
  const FOSSIL = [['coalA', 'Than đá', 'Coal (anthracite/bituminous)', 'solid'], ['coalB', 'Than nâu', 'Lignite (brown coal)', 'solid'], ['peat', 'Than bùn', 'Peat', 'solid'], ['coalC', 'Than mỡ', 'Bituminous (fat) coal', 'solid'],
    ['oil', 'Dầu mỏ', 'Crude oil', 'liquid'], ['gasoil', 'Khí mỏ dầu', 'Associated (oilfield) gas', 'gas'], ['ng', 'Khí thiên nhiên', 'Natural gas', 'gas'], ['hydr', 'Băng cháy', 'Methane hydrate (fire ice)', 'gas'],
    ['wood', 'Củi gỗ', 'Firewood', 'none'], ['bio', 'Sinh khối', 'Biomass', 'none'], ['etoh', 'Xăng pha ethanol (E5)', 'Ethanol blended petrol (E5)', 'none'], ['bdsl', 'Biodiesel', 'Biodiesel', 'none']].map((r) => ({ id: r[0], vi: r[1], en: r[2], st: r[3] }));
  const CFORMS = [['gr', 'Than chì (graphite)', 'Graphite', 'elem'], ['dia', 'Kim cương', 'Diamond', 'elem'], ['co2', 'Carbon dioxide CO₂', 'Carbon dioxide CO₂', 'inorg'], ['caco3', 'Calcium carbonate CaCO₃', 'Calcium carbonate CaCO₃', 'inorg'], ['na2co3', 'Sodium carbonate Na₂CO₃', 'Sodium carbonate Na₂CO₃', 'inorg'],
    ['ch4', 'Methane CH₄', 'Methane CH₄', 'org'], ['glu', 'Glucose C₆H₁₂O₆', 'Glucose C₆H₁₂O₆', 'org'], ['prot', 'Protein', 'Protein', 'org'], ['oil', 'Dầu mỏ (hydrocarbon)', 'Crude oil (hydrocarbons)', 'org'], ['etoh', 'Ethylic alcohol C₂H₅OH', 'Ethanol C₂H₅OH', 'org']].map((r) => ({ id: r[0], vi: r[1], en: r[2], to: r[3] }));
  const MSRC = [['m1', 'Quá trình biến đổi sinh học trong tự nhiên', 'Biological processes in nature', 'nat'], ['m2', 'Quá trình biến đổi địa chất trong tự nhiên', 'Geological processes in nature', 'nat'], ['m3', 'Phân huỷ chất hữu cơ ở bãi rác thải', 'Decomposition of organic waste in landfills', 'man'], ['m4', 'Sản xuất nông nghiệp', 'Agricultural production', 'man'], ['m5', 'Tiêu hoá thức ăn của gia súc', 'Digestion of food in livestock', 'man'],
    ['m6', 'Sản xuất công nghiệp', 'Industrial production', 'man'], ['m7', 'Chế biến, chưng cất, sản xuất khí mỏ dầu', 'Processing, distilling and producing oilfield gas', 'man']].map((r) => ({ id: r[0], vi: r[1], en: r[2], to: r[3] }));
  function selfTestC() {
    const T = [], add = (n, ok, got) => T.push({ name: n, ok: !!ok, got }), C = CYCLE;
    const rnd = (() => { let a = 7; return () => ((a = (a * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff); })();
    add('chu trình carbon: ở mức nền (mọi thanh trượt = 1, đốt/cháy/vôi = 0) hệ cân bằng: CO₂ khí quyển giữ 0,030 % sau 200 năm mô hình', (() => { const r = C.run(C.BASE, 200), e = r[r.length - 1]; return near(e.A, 100, 1e-6) && near(C.co2pct(e.A), 0.030, 1e-8) && near(C.netAtm(C.RES0, C.BASE), 0, 1e-9); })(), '');
    add('tổng carbon được bảo toàn (sai số < 1e-6) với 40 bộ thanh trượt ngẫu nhiên và các giá trị cực đoan; không bể nào âm, không NaN', (() => { let ok = true; const tests = [{ veg: 0, burn: 50, cement: 50, fire: 50, volc: 50, ocean: 0 }, { veg: 5, burn: 0, cement: 0, fire: 0, volc: 0, ocean: 5 }, { veg: NaN, burn: -3, cement: 'x', fire: undefined, volc: 1e9, ocean: 1 }]; for (let i = 0; i < 40; i++) tests.push({ veg: rnd() * 2, burn: rnd() * 10, cement: rnd() * 5, fire: rnd() * 5, volc: rnd() * 5, ocean: rnd() * 2 }); tests.forEach((p) => { const r = C.run(p, 120); r.forEach((s) => { if (!near(C.total(s), 2000, 1e-6) || ['A', 'B', 'O', 'S', 'F'].some((k) => !isFinite(s[k]) || s[k] < -1e-9)) ok = false; }); }); return ok; })(), '');
    const end = (p, y) => { const r = C.run(Object.assign({}, C.BASE, p), y || 100); return r[r.length - 1]; };
    add('đốt nhiên liệu hoá thạch tăng CO₂ khí quyển và giảm bể nhiên liệu; càng đốt nhiều càng tăng; tăng rừng (quang hợp) hạ CO₂; cháy rừng và giảm hấp thụ của đại dương làm tăng', end({ burn: 3 }, 30).A > 100 && end({ burn: 4 }, 30).A > end({ burn: 3 }, 30).A && end({ burn: 3 }, 30).F < 500 && end({ veg: 1.5 }).A < 100 && end({ fire: 2 }).A > 100 && end({ ocean: 0.5 }).A > 100 && end({ cement: 2 }).A > 100, [end({ burn: 3 }, 30).A.toFixed(1), end({ veg: 1.5 }).A.toFixed(1)].join(' '));
    add('chuẩn hoá: 100 đơn vị ↔ 0,030 %; 133,3 đơn vị ↔ 0,040 %', near(C.co2pct(100), 0.030, 1e-12) && near(C.co2pct(400 / 3), 0.040, 1e-9), '');
    add('nhiệm vụ “đưa hệ về cân bằng”: kịch bản mất cân bằng (đốt 3, rừng 0,8, vôi–xi măng 1, cháy rừng 1) không đạt; ngừng đốt/cháy và trồng rừng thì đạt', !C.mission({ veg: 0.8, burn: 3, cement: 1, fire: 1, volc: 1, ocean: 1 }).ok && C.mission(C.BASE).ok && C.mission({ veg: 1.1, burn: 0, cement: 0, fire: 0, volc: 1, ocean: 1 }).ok, JSON.stringify(C.mission({ veg: 0.8, burn: 3, cement: 1, fire: 1, volc: 1, ocean: 1 })));
    const c1 = cave(0.8, 50, 0.3), c0 = cave(0, 100, 0.5), c2 = cave(1, 100, 0);
    add('hang động: bảo toàn khối đá (đá còn lại + nhũ đá + phần theo nước = 100); không có CO₂ thì không hoà tan; e = 0 không tạo nhũ đá; hoà tan tăng theo CO₂ và thời gian', near(c1.rockLeft + c1.deposit + c1.carried, 100, 1e-9) && c0.cavity === 0 && c2.deposit === 0 && cave(0.9, 50, 0).cavity > cave(0.3, 50, 0).cavity && cave(0.5, 80, 0).cavity > cave(0.5, 20, 0).cavity && [cave(NaN, -5, 9), cave(9, 1e9, -1)].every((o) => Object.keys(o).every((k) => isFinite(o[k]))), JSON.stringify(c1));
    add('Bảng 35.1: 8 mốc 1988–2016; tăng 11,7 tỉ thùng (≈ 49,4 %); 28 năm ⇒ ≈ 0,418 tỉ thùng/năm', OIL.VALS.length === 8 && OIL.YEARS[0] === 1988 && OIL.YEARS[7] === 2016 && near(OIL.rise(), 11.7, 1e-9) && near(OIL.pct(), 49.367, 0.01) && OIL.years() === 28 && near(OIL.rate(), 0.41786, 1e-4), OIL.rate().toFixed(4));
    add('tốc độ từng giai đoạn (tỉ thùng/năm): 0,2 · 0,425 · 0,5 · 0,575 · 0,325 · 0,35 · 0,55; đều dương (sản lượng luôn tăng); đường xu hướng dốc ≈ 0,43', OIL.seg().join() === '0.2,0.425,0.5,0.575,0.325,0.35,0.55' && OIL.seg().every((x) => x > 0) && near(OIL.fit().slope, 0.4301, 0.005), OIL.fit().slope.toFixed(4));
    add('chấm đồ thị: đúng số liệu đạt; lệch 2 tỉ thùng ở một điểm bị báo đúng điểm đó; thiếu số không NaN', OIL.grade(OIL.VALS).ok && (() => { const u = OIL.VALS.slice(); u[3] += 2; const g = OIL.grade(u); return !g.ok && g.bad.join() === '3' && g.n === 7; })() && !OIL.grade([]).ok && OIL.grade([]).n === 0, '');
    add('số liệu 2021 và trữ lượng Việt Nam theo sách; 95,70 triệu thùng/ngày ≈ 34,9 tỉ thùng/năm (cùng bậc với Bảng 35.1)', OIL.D2021.oil === 95.70 && OIL.D2021.gas === 4.177 && OIL.D2021.coal === 7.7 && OIL.VN2020.coal === 3.36 && OIL.VN2020.oil === 4.4 && OIL.VN2020.gas === 600 && near(OIL.oilYear2021(), 34.93, 0.01), OIL.oilYear2021().toFixed(2));
    add('băng cháy ổn định khi P > 30 bar và T < 0 °C; không ổn định nếu thiếu một điều kiện', hydrate(40, -5) && !hydrate(20, -5) && !hydrate(40, 5) && !hydrate(30, -5) && !hydrate(40, 0), '');
    add('hiệu ứng nhà kính (mô hình qua hai mốc của sách): 0,030 % ↔ +0 °C; 0,040 % và CH₄ mốc 2020 ↔ +1,5 °C; tăng khí → nóng hơn; các chỉ số trong [0,100]; không NaN', near(GHG.warm(0.030, 20), 0, 1e-9) && near(GHG.warm(0.040, 50), 1.5, 1e-9) && GHG.warm(0.050, 50) > GHG.warm(0.040, 50) && GHG.warm(0.040, 80) > GHG.warm(0.040, 50) && [0.01, 0.03, 0.04, 0.08, NaN].every((c) => { const w = GHG.warm(c, 40); return isFinite(w) && w >= 0 && GHG.sea(w) >= 0 && GHG.sea(w) <= 100 && GHG.acid(c) >= 0 && GHG.acid(c) <= 100 && GHG.layer(c, 40) >= 0.1 && GHG.layer(c, 40) <= 1; }), GHG.warm(0.040, 50));
    add('tác động khai thác đá vôi: quy mô lớn → tác động lớn; mỗi biện pháp giảm đúng chỉ số liên quan; không NaN; trong [0,100]', (() => { const a = QUARRY.impact(80, {}), b = QUARRY.impact(30, {}), c = QUARRY.impact(80, { spray: 1 }), d = QUARRY.impact(80, { plant: 1 }), e = QUARRY.impact(80, { pond: 1 }), f = QUARRY.impact(80, { plan: 1 }); return Object.keys(a).every((k) => a[k] > b[k] && a[k] >= 0 && a[k] <= 100) && c.dust < a.dust && c.noise === a.noise && d.erosion < a.erosion && d.habitat < a.habitat && e.water < a.water && Object.keys(a).every((k) => f[k] < a[k]) && Object.keys(QUARRY.impact(NaN, null)).every((k) => isFinite(QUARRY.impact(NaN, null)[k])); })(), '');
    add('chỉ số carbon của em: chưa chọn = 100; chọn thêm hành động chỉ làm giảm; chọn tất cả > 0 và có sàn 10', life({}) === 100 && life({ public: 1 }) === 86 && life({ public: 1, save: 1 }) < life({ public: 1 }) && life(Object.keys(LIFE).reduce((o, k) => { o[k] = 1; return o; }, {})) >= 10 && Object.keys(LIFE).every((k) => LIFE[k] < 0), life({ public: 1 }));
    add('thẻ phân loại: nhiên liệu hoá thạch 12 thẻ (rắn 4, lỏng 1, khí 3, không phải 4; băng cháy là khí; củi gỗ không phải); carbon 10 thẻ (đơn chất 2, vô cơ 3, hữu cơ 5); nguồn methane 7 thẻ (tự nhiên 2, nhân tạo 5)', FOSSIL.length === 12 && ['solid', 'liquid', 'gas', 'none'].map((s) => FOSSIL.filter((f) => f.st === s).length).join() === '4,1,3,4' && FOSSIL.find((f) => f.id === 'hydr').st === 'gas' && FOSSIL.find((f) => f.id === 'wood').st === 'none' && CFORMS.length === 10 && ['elem', 'inorg', 'org'].map((s) => CFORMS.filter((f) => f.to === s).length).join() === '2,3,5' && MSRC.length === 7 && ['nat', 'man'].map((s) => MSRC.filter((f) => f.to === s).length).join() === '2,5', '');
    return T;
  }
  Object.assign(EE, { CYCLE, CAVE: { cave }, OIL, HYDRATE: { stable: hydrate }, GHG, QUARRY, LIFE: { LIFE, life }, FOSSIL, CFORMS, MSRC });
  EE.selfTestC = selfTestC;
  { const prev = L.engine.selfTest; L.engine.selfTest = function () { return prev().concat(selfTestC()); }; }
})();
