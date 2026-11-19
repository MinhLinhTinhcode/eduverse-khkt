/* ==========================================================================
   CIRCUIT POWER — năng lượng điện, công suất, công suất định mức, công tơ điện (KHTN 9, Bài 13). Nạp SAU em-effects.js.
   Engine `EmLab.engine.pow` (đưa vào self-test chung):
     energyJ(U,I,t)=U·I·t   powerW(U,I)=U·I   kWh(J)=J/3,6·10⁶   ratedR(Ur,Pr)=Ur²/Pr
     actual(U,Ur,Pr) → {R,I,P,ratio,state}  (state: off | dim | ok | over | burn)   bill(kWh,giá)
   Widgets (LabSims): pow-wui (W13.1)  pow-rated (W13.2)  pow-label (W13.3)  pow-bill (W13.4)
   Công suất của nồi cơm, quạt, tủ lạnh… là số MINH HOẠ (ghi rõ trong giao diện). Giá điện do học sinh nhập; mặc định chỉ là ví dụ.
   Cách thêm thiết bị: thêm một dòng vào DEVICES (id, vi, en, Ur, Pr, illustrative?) — W13.2 và W13.4 tự nhận.
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab; if (!L || !window.EmLab) return;
  const { fmt, pr, clamp, copyText, toCSV } = L;
  const $ = (s, r) => r.querySelector(s), $$ = (s, r) => Array.from(r.querySelectorAll(s));
  let uid = 0;
  const KWH = 3.6e6;
  const DEVICES = [
    { id: 'b60', vi: 'Bóng 220 V – 60 W', en: 'Bulb 220 V – 60 W', Ur: 220, Pr: 60 },
    { id: 'b100', vi: 'Bóng 110 V – 100 W', en: 'Bulb 110 V – 100 W', Ur: 110, Pr: 100 },
    { id: 'torch', vi: 'Bóng đèn pin 2,5 V – 2,5 W', en: 'Torch bulb 2.5 V – 2.5 W', Ur: 2.5, Pr: 2.5 },
    { id: 'iron', vi: 'Bàn là 220 V – 1 000 W', en: 'Iron 220 V – 1,000 W', Ur: 220, Pr: 1000 },
    { id: 'rice', vi: 'Nồi cơm điện 220 V – 700 W (số minh hoạ)', en: 'Rice cooker 220 V – 700 W (illustrative)', Ur: 220, Pr: 700, ill: 1 },
    { id: 'fan', vi: 'Quạt điện 220 V – 50 W (số minh hoạ)', en: 'Fan 220 V – 50 W (illustrative)', Ur: 220, Pr: 50, ill: 1 },
    { id: 'fridge', vi: 'Tủ lạnh 220 V – 100 W (số minh hoạ)', en: 'Fridge 220 V – 100 W (illustrative)', Ur: 220, Pr: 100, ill: 1 }
  ];
  const pow = {
    energyJ: (U, I, t) => U * I * t, powerW: (U, I) => U * I, kWh: (J) => J / KWH, ratedR: (Ur, Pr) => Ur * Ur / Pr,
    actual(U, Ur, Pr) { const R = Ur * Ur / Pr, P = U * U / R, I = U / R, ratio = P / Pr, state = U <= 0.5 ? 'off' : ratio > 1.44 ? 'burn' : ratio > 1.05 ? 'over' : ratio < 0.9 ? 'dim' : 'ok'; return { R, I, P, ratio, state }; },
    bill: (kWh, price) => kWh * price
  };
  window.EmLab.engine.pow = pow;
  const E = window.EmLab.engine, prevT = E.selfTest;
  E.selfTest = function () {
    const T = prevT().concat(), add = (n, ok, got) => T.push({ name: n, ok: !!ok, got }), near = (a, b, e) => Math.abs(a - b) <= e;
    add('động cơ 12 V, 0,5 A, 30 phút: W = 10 800 J', pow.energyJ(12, 0.5, 1800) === 10800, pow.energyJ(12, 0.5, 1800));
    add('bóng 3,5 V, 12 Ω, 4 phút: I ≈ 0,292 A; W = U²t/R = 245 J', near(3.5 / 12, 0.2917, 1e-3) && near(3.5 * 3.5 * 240 / 12, 245, 1e-9) && near(pow.energyJ(3.5, 3.5 / 12, 240), 245, 1e-9), pow.energyJ(3.5, 3.5 / 12, 240));
    add('220 V, 0,3 A: P = 66 W; 3 h: 712 800 J ≈ 0,198 kWh', pow.powerW(220, 0.3) === 66 && near(pow.energyJ(220, 0.3, 10800), 712800, 1e-6) && near(pow.kWh(712800), 0.198, 1e-9), pow.kWh(712800));
    add('nhãn: 2,5 W/2,5 V ⇒ 1 A; 1 000 W/220 V ≈ 4,55 A; 100 W/110 V ≈ 0,909 A', near(2.5 / 2.5, 1, 1e-12) && near(1000 / 220, 4.545, 1e-3) && near(100 / 110, 0.909, 1e-3), 1000 / 220);
    add('220 V – 60 W: I ≈ 0,273 A; 4 h: 864 000 J = 0,24 kWh; R ≈ 807 Ω', near(60 / 220, 0.2727, 1e-3) && near(pow.energyJ(220, 60 / 220, 4 * 3600), 864000, 1e-6) && near(pow.kWh(864000), 0.24, 1e-12) && near(pow.ratedR(220, 60), 806.67, 0.01), pow.ratedR(220, 60));
    add('1 kWh = 3,6·10⁶ J; bóng 100 W × 5 h × 30 ngày = 15 kWh', KWH === 3.6e6 && near(0.1 * 5 * 30, 15, 1e-12), 0.1 * 5 * 30);
    add('đúng định mức: P = Pđm; 110 V–100 W trên 220 V: P = 400 W (quá tải, cháy); 220 V–60 W trên 110 V: 15 W (tối)', near(pow.actual(220, 220, 60).P, 60, 1e-9) && near(pow.actual(220, 110, 100).P, 400, 1e-9) && pow.actual(220, 110, 100).state === 'burn' && near(pow.actual(110, 220, 60).P, 15, 1e-9) && pow.actual(110, 220, 60).state === 'dim', pow.actual(220, 110, 100).P);
    return T;
  };

  const loop = (root, step) => { let vis = true, on = false, last = 0; const tick = (ts) => { if (!root.isConnected) { on = false; return; } const dt = Math.min(0.05, (ts - last) / 1000); last = ts; if (step(dt) !== false && vis) requestAnimationFrame(tick); else on = false; }; const kick = () => { if (on || !vis) return; on = true; last = performance.now(); requestAnimationFrame(tick); }; if ('IntersectionObserver' in window) new IntersectionObserver((es) => { vis = es[0].isIntersecting; if (vis) kick(); }).observe(root); return { kick }; };
  const num = (s) => parseFloat(String(s).replace(',', '.'));

  /* ---------------------------------------------------- W13.1: W = UIt và P = UI */
  function wuiLab(body) {
    const id = 'pw' + (++uid), S = { U: 220, I: 0.3, tMin: 180, mode: 'free', ans: '' };
    const EX = { free: null, ex1: { U: 12, I: 0.5, tMin: 30, q: 'Động cơ 12 V, 0,5 A chạy 30 phút: điện năng tiêu thụ bao nhiêu J?', qe: 'A motor on 12 V, 0.5 A runs for 30 min: how many joules of electrical energy does it use?', a: 10800, unit: 'J' }, ex2: { U: 3.5, I: 3.5 / 12, tMin: 4, q: 'Bóng đèn 3,5 V, điện trở 12 Ω sáng 4 phút: điện năng tiêu thụ bao nhiêu J? (gợi ý: I = U/R)', qe: 'A 3.5 V, 12 Ω bulb lights for 4 min: how much electrical energy does it use, in joules? (hint: I = U/R)', a: 245, unit: 'J' }, ex3: { U: 220, I: 0.3, tMin: 180, q: 'Bóng đèn 220 V, 0,3 A dùng 3 giờ: công suất bao nhiêu W và điện năng bao nhiêu kWh?', qe: 'A 220 V, 0.3 A bulb used for 3 h: what is its power and its energy in kWh?', a: 0.198, unit: 'kWh' } };
    body.innerHTML = '<div class="olab pw" data-lab="' + id + '"><p class="olab__hint">' + pr('Kéo các thanh trượt U, I, t: công suất 𝒫 = UI và điện năng W = UIt (J và kWh) cập nhật ngay. Chọn một bài tập rồi nhập đáp số và bấm “Kiểm tra”.', 'Move the U, I, t sliders: power 𝒫 = UI and energy W = UIt (in J and kWh) update at once. Pick an exercise, enter your answer and press “Check”.') + '</p>' +
      '<label class="olab__ctl"><span>' + pr('Chế độ', 'Mode') + '</span><select class="olab__sel" data-r="mode"><option value="free">' + 'Tự do / Free play' + '</option><option value="ex1">' + 'Bài 1: động cơ / Ex. 1: motor' + '</option><option value="ex2">' + 'Bài 2: bóng đèn 12 Ω / Ex. 2: 12 Ω bulb' + '</option><option value="ex3">' + 'Ví dụ: bóng 220 V, 0,3 A / Example: 220 V, 0.3 A bulb' + '</option></select></label>' +
      '<div class="olab__cols"><div class="olab__panel"><label class="olab__ctl"><span>U = <output data-out="U"></output> V</span><input type="range" data-k="U" min="0" max="250" step="0.5"></label><label class="olab__ctl"><span>I = <output data-out="I"></output> A</span><input type="range" data-k="I" min="0" max="5" step="0.01"></label><label class="olab__ctl"><span>t = <output data-out="tMin"></output> ' + pr('phút', 'min') + '</span><input type="range" data-k="tMin" min="0" max="600" step="1"></label><label>U <input type="text" inputmode="decimal" size="5" data-n="U" aria-label="U"></label> <label>I <input type="text" inputmode="decimal" size="5" data-n="I" aria-label="I"></label> <label>t <input type="text" inputmode="decimal" size="5" data-n="tMin" aria-label="t"></label></div><div class="olab__panel"><div class="olab__read" data-r="read" aria-live="polite"></div><div data-r="exq"></div></div></div><p class="olab__status" data-r="status" role="status"></p><div class="olab__btns"><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button></div></div>';
    const lab = $('[data-lab="' + id + '"]', body), q = (n) => $('[data-r="' + n + '"]', lab);
    function render() {
      const t = S.tMin * 60, P = pow.powerW(S.U, S.I), W = pow.energyJ(S.U, S.I, t), kwh = pow.kWh(W);
      q('read').innerHTML = '<table class="olab__tbl olab__tbl--read"><tbody><tr><th scope="row">𝒫 = UI</th><td>' + fmt(P, 2) + ' W</td></tr><tr><th scope="row">t</th><td>' + fmt(t, 0) + ' s</td></tr><tr><th scope="row">W = UIt</th><td>' + fmt(W, 1) + ' J</td></tr><tr><th scope="row">W</th><td>' + fmt(kwh, 4) + ' kWh</td></tr></tbody></table>';
      $$('[data-k]', lab).forEach((e) => { e.value = S[e.dataset.k]; $('[data-out="' + e.dataset.k + '"]', lab).textContent = fmt(S[e.dataset.k], e.dataset.k === 'I' ? 3 : 1); });
      $$('[data-n]', lab).forEach((e) => { if (document.activeElement !== e) e.value = fmt(S[e.dataset.n], 3); });
      const ex = EX[S.mode]; q('exq').innerHTML = ex ? '<p><b>' + pr(ex.q, ex.qe) + '</b></p><label>' + pr('Đáp số', 'Answer') + ' (' + ex.unit + ') <input type="text" inputmode="decimal" size="8" data-r="ans" aria-label="Đáp số / answer"></label> <button type="button" class="btn btn--sm" data-act="chk">' + pr('Kiểm tra', 'Check') + '</button>' : '';
    }
    lab.addEventListener('input', (e) => { const k = e.target.dataset && e.target.dataset.k, n = e.target.dataset && e.target.dataset.n; if (k) { S[k] = +e.target.value; } else if (n) { const v = num(e.target.value); if (isFinite(v)) S[n] = clamp(v, 0, n === 'U' ? 250 : n === 'I' ? 5 : 600); } else return; q('status').textContent = ''; render(); });
    lab.addEventListener('change', (e) => { if (e.target.dataset.r === 'mode') { S.mode = e.target.value; const ex = EX[S.mode]; if (ex) { S.U = ex.U; S.I = ex.I; S.tMin = ex.tMin; } q('status').textContent = ''; render(); const sel = q('mode'); sel.value = S.mode; } });
    lab.addEventListener('click', (e) => {
      const a = e.target.closest('[data-act]'); if (!a) return;
      if (a.dataset.act === 'reset') { Object.assign(S, { U: 220, I: 0.3, tMin: 180, mode: 'free' }); q('mode').value = 'free'; q('status').textContent = ''; render(); return; }
      const ex = EX[S.mode], v = num(q('ans').value), tol = ex.a * 0.02; if (!isFinite(v)) { q('status').innerHTML = pr('Hãy nhập một số.', 'Enter a number.'); return; }
      const ok = Math.abs(v - ex.a) <= tol; q('status').className = 'olab__status ' + (ok ? 'olab__status--ok' : 'olab__status--warn');
      q('status').innerHTML = ok ? pr('Đúng! ' + (S.mode === 'ex3' ? '𝒫 = 220 × 0,3 = 66 W; W = 66 × 10 800 = 712 800 J ≈ 0,198 kWh.' : S.mode === 'ex1' ? 'W = UIt = 12 × 0,5 × 1 800 = 10 800 J.' : 'W = U²t/R = 3,5² × 240 / 12 = 245 J.'), 'Correct! ' + (S.mode === 'ex3' ? '𝒫 = 220 × 0.3 = 66 W; W = 66 × 10,800 = 712,800 J ≈ 0.198 kWh.' : S.mode === 'ex1' ? 'W = UIt = 12 × 0.5 × 1,800 = 10,800 J.' : 'W = U²t/R = 3.5² × 240 / 12 = 245 J.')) : pr('Chưa đúng. Đổi t ra giây (1 phút = 60 s) rồi dùng W = UIt; 1 kWh = 3,6·10⁶ J.', 'Not yet. Convert t to seconds (1 min = 60 s) and use W = UIt; 1 kWh = 3.6·10⁶ J.');
    });
    render(); return { state: S };
  }

  /* ---------------------------------------------------- W13.2: CÔNG SUẤT ĐỊNH MỨC */
  function ratedLab(body) {
    const id = 'pr' + (++uid), S = { dev: 'b60', U: 220, t: 0 };
    body.innerHTML = '<div class="olab pw" data-lab="' + id + '"><p class="olab__hint">' + pr('Chọn thiết bị, rồi kéo thanh trượt hiệu điện thế 0 – 250 V (hoặc bấm “Cắm vào ổ 220 V”). Thử bóng 110 V – 100 W trên 220 V và bóng 220 V – 60 W trên 110 V. Độ sáng minh hoạ ∝ công suất thực tế.', 'Pick a device, then move the voltage slider 0 – 250 V (or press “Plug into the 220 V socket”). Try the 110 V – 100 W bulb on 220 V and the 220 V – 60 W bulb on 110 V. Illustrative brightness ∝ actual power.') + '</p>' +
      '<label class="olab__ctl"><span>' + pr('Thiết bị', 'Device') + '</span><select class="olab__sel" data-r="dev">' + DEVICES.map((d) => '<option value="' + d.id + '">' + d.vi + ' / ' + d.en + '</option>').join('') + '</select></label>' +
      '<div class="olab__cols"><div class="olab__stage"><svg class="olab__svg em__svg" viewBox="0 0 560 220" role="img" aria-label="Thiết bị và công suất / Device and power"><rect width="560" height="220" class="cl__bg"/><g data-r="sc"></g></svg></div><div class="olab__panel"><label class="olab__ctl"><span>U = <output data-out="U"></output> V</span><input type="range" data-k="U" min="0" max="250" step="0.5"></label><div class="olab__btns"><button type="button" class="btn btn--sm" data-act="socket">' + pr('Cắm vào ổ 220 V', 'Plug into the 220 V socket') + '</button><button type="button" class="btn btn--sm" data-act="rated">' + pr('Đặt đúng định mức', 'Set to rated voltage') + '</button></div><div class="olab__read" data-r="read" aria-live="polite"></div></div></div><p class="olab__status" data-r="status" role="status"></p></div>';
    const lab = $('[data-lab="' + id + '"]', body), q = (n) => $('[data-r="' + n + '"]', lab);
    const dev = () => DEVICES.find((d) => d.id === S.dev);
    function render() {
      const d = dev(), a = pow.actual(S.U, d.Ur, d.Pr), b = clamp(a.ratio, 0, 1.6) / 1.6, burn = a.state === 'burn';
      const bulb = /^b|torch/.test(d.id);
      let s = bulb ? '<circle cx="110" cy="100" r="' + (48 + 24 * b).toFixed(0) + '" fill="#ffe24a" opacity="' + (burn ? 0 : (b * 0.55).toFixed(2)) + '"/><circle cx="110" cy="100" r="44" fill="' + (burn ? '#9a9a9a' : '#fff6bf') + '" stroke="currentColor" stroke-width="2.4"/>' + (burn ? '<path d="M96 112 L104 92 M112 92 L122 112" stroke="currentColor" stroke-width="2" fill="none"/>' : '<path d="M92 112 L98 84 L108 112 L118 84 L128 112" fill="none" stroke="' + (b > 0.15 ? '#ff7a1a' : '#555') + '" stroke-width="' + (2 + 2 * b).toFixed(1) + '"/>') + '<rect x="90" y="144" width="40" height="28" fill="#d8dde8" stroke="currentColor" stroke-width="2"/>' : '<rect x="50" y="64" width="120" height="86" rx="10" fill="#e6e9f2" stroke="currentColor" stroke-width="2.4"/><text x="110" y="112" text-anchor="middle" class="cl__lab">' + d.vi.split(' ')[0] + '</text><rect x="62" y="74" width="' + (96 * clamp(a.ratio, 0, 1.4) / 1.4).toFixed(0) + '" height="8" fill="var(--pen)"/>';
      s += '<text x="110" y="198" text-anchor="middle" class="cl__lab">' + d.Ur + ' V – ' + d.Pr + ' W</text>';
      const bars = [['𝒫đm', d.Pr, '#8fa2e8'], ['𝒫', a.P, a.state === 'over' || burn ? '#e0393e' : a.state === 'dim' ? '#f0b24a' : '#2fbf7a']], mx = Math.max(d.Pr, a.P, 1);
      bars.forEach((r, i) => { s += '<text x="230" y="' + (70 + i * 44) + '" class="cl__lab">' + r[0] + ' = ' + fmt(r[1], 1) + ' W</text><rect x="230" y="' + (78 + i * 44) + '" width="' + Math.max(2, 290 * r[1] / mx).toFixed(0) + '" height="16" rx="4" fill="' + r[2] + '"/>'; });
      q('sc').innerHTML = s;
      q('read').innerHTML = '<table class="olab__tbl olab__tbl--read"><tbody><tr><th scope="row">R = U²đm/𝒫đm</th><td>' + fmt(a.R, 1) + ' Ω</td></tr><tr><th scope="row">I = U/R</th><td>' + fmt(a.I, 3) + ' A</td></tr><tr><th scope="row">𝒫 = U²/R</th><td>' + fmt(a.P, 1) + ' W (' + fmt(a.ratio * 100, 0) + ' %)</td></tr></tbody></table>';
      const m = { off: ['Chưa có điện.', 'No power.'], dim: ['U thấp hơn định mức: công suất thực nhỏ hơn, bóng sáng yếu.', 'U is below the rating: the actual power is lower and the bulb is dim.'], ok: ['Gần đúng định mức: thiết bị hoạt động bình thường.', 'Close to the rating: the device works normally.'], over: ['U cao hơn định mức: công suất lớn hơn mức cho phép, nên giảm U.', 'U exceeds the rating: the power is above the allowed value, so reduce U.'], burn: ['Quá tải nhiều: thiết bị có thể bị cháy!', 'Heavy overload: the device may burn out!'] }[a.state];
      q('status').className = 'olab__status' + (a.state === 'burn' || a.state === 'over' ? ' olab__status--warn' : a.state === 'ok' ? ' olab__status--ok' : ''); q('status').innerHTML = pr(m[0], m[1]) + (d.ill ? ' <small>' + pr('(Công suất của thiết bị này là số minh hoạ.)', '(This device’s power is an illustrative figure.)') + '</small>' : '');
      $('[data-k="U"]', lab).value = S.U; $('[data-out="U"]', lab).textContent = fmt(S.U, 1); q('dev').value = S.dev;
    }
    lab.addEventListener('input', (e) => { if (e.target.dataset && e.target.dataset.k === 'U') { S.U = +e.target.value; render(); } });
    lab.addEventListener('change', (e) => { if (e.target.dataset.r === 'dev') { S.dev = e.target.value; render(); } });
    lab.addEventListener('click', (e) => { const a = e.target.closest('[data-act]'); if (!a) return; S.U = a.dataset.act === 'socket' ? 220 : dev().Ur; render(); });
    render(); return { state: S };
  }

  /* ---------------------------------------------------- W13.3: Ý NGHĨA SỐ GHI TRÊN THIẾT BỊ */
  function labelLab(body) {
    const id = 'pl' + (++uid), T = [DEVICES[2], DEVICES[3], DEVICES[1]], SRC = [2.5, 110, 220], S = { pick: {}, done: false };
    body.innerHTML = '<div class="olab pw" data-lab="' + id + '"><p class="olab__hint">' + pr('Mỗi thiết bị ghi hai số: hiệu điện thế định mức và công suất định mức. Chọn nguồn đúng cho từng thiết bị rồi xem I = 𝒫/U và R.', 'Each device shows two numbers: rated voltage and rated power. Choose the right source for each device and see I = 𝒫/U and R.') + '</p><div data-r="list"></div><p class="olab__status" data-r="status" role="status"></p></div>';
    const lab = $('[data-lab="' + id + '"]', body), q = (n) => $('[data-r="' + n + '"]', lab);
    function render() {
      q('list').innerHTML = '<table class="olab__tbl"><thead><tr><th>' + pr('Thiết bị', 'Device') + '</th><th>' + pr('Nguồn nối vào', 'Source') + '</th><th>I = 𝒫/U (A)</th><th>R = U²/𝒫 (Ω)</th><th>' + pr('Kết quả', 'Result') + '</th></tr></thead><tbody>' + T.map((d, i) => { const p = S.pick[i], a = p == null ? null : pow.actual(p, d.Ur, d.Pr); return '<tr><td>' + pr(d.vi, d.en) + '</td><td>' + SRC.map((v) => '<button type="button" class="btn btn--sm' + (p === v ? ' is-on' : '') + '" aria-pressed="' + (p === v) + '" data-i="' + i + '" data-v="' + v + '">' + fmt(v, 1) + ' V</button>').join(' ') + '</td><td>' + fmt(d.Pr / d.Ur, 3) + '</td><td>' + fmt(d.Ur * d.Ur / d.Pr, 1) + '</td><td>' + (a ? (a.state === 'ok' ? '✔ ' + pr('Đúng định mức', 'At rating') : '✘ ' + pr(a.state === 'dim' ? 'Quá yếu (' + fmt(a.P, 1) + ' W)' : 'Quá tải (' + fmt(a.P, 0) + ' W)', a.state === 'dim' ? 'Too dim (' + fmt(a.P, 1) + ' W)' : 'Overloaded (' + fmt(a.P, 0) + ' W)')) : '–') + '</td></tr>'; }).join('') + '</tbody></table>';
      const ok = T.filter((d, i) => S.pick[i] === d.Ur).length; q('status').innerHTML = Object.keys(S.pick).length ? pr('Đúng ' + ok + '/3. Hiệu điện thế định mức cho biết nên nối thiết bị vào nguồn bao nhiêu vôn; công suất định mức cho biết công suất khi hoạt động bình thường.', 'Right ' + ok + '/3. The rated voltage tells you which source to use; the rated power is the power in normal operation.') : '';
    }
    lab.addEventListener('click', (e) => { const b = e.target.closest('[data-i]'); if (!b) return; S.pick[+b.dataset.i] = +b.dataset.v; render(); });
    render(); return { state: S };
  }

  /* ---------------------------------------------------- W13.4: CÔNG TƠ ĐIỆN VÀ HOÁ ĐƠN */
  function billLab(body) {
    const id = 'pb' + (++uid), S = { use: {}, price: 2000, days: 30, meter: 'mech', start: 2573, rows: [], ans: '', disc: 0 };
    DEVICES.filter((d) => ['b60', 'rice', 'fan', 'fridge', 'iron'].indexOf(d.id) >= 0).forEach((d, i) => (S.use[d.id] = { on: d.id === 'b60' || d.id === 'fridge', n: 1, P: d.Pr, h: { b60: 5, rice: 1.5, fan: 6, fridge: 24, iron: 0.5 }[d.id] }));
    body.innerHTML = '<div class="olab pw" data-lab="' + id + '"><p class="olab__hint">' + pr('Bật các thiết bị trong nhà, chọn công suất và số giờ dùng mỗi ngày: công tơ đếm điện năng cả tháng (1 kWh = 3,6·10⁶ J). Hãy đọc số đầu và cuối rồi trừ để tìm điện năng tiêu thụ.', 'Switch on the appliances in the house, choose each one’s power and daily hours: the meter counts the month’s energy (1 kWh = 3.6·10⁶ J). Read the start and end values and subtract to find the energy used.') + '</p>' +
      '<div data-r="devs"></div><div class="olab__btns"><button type="button" class="btn btn--sm" data-act="meter" aria-pressed="false">' + pr('Công tơ: cơ (đĩa quay)', 'Meter: mechanical (spinning disc)') + '</button><label>' + pr('Số ngày', 'Days') + ' <input type="number" min="1" max="31" data-k="days" size="3" style="width:64px"></label><label>' + pr('Giá 1 kWh (đồng) — tự nhập', 'Price per kWh (đồng) — enter your own') + ' <input type="text" inputmode="decimal" data-k="price" size="7" style="width:90px"></label></div><p class="olab__status olab__status--warn">' + pr('Giá 2 000 đồng/kWh chỉ là ví dụ để tính; hãy kiểm tra giá điện hiện hành của công ty điện lực.', 'The 2,000 đồng/kWh price is only an example for practice; check the current tariff from the electricity company.') + '</p>' +
      '<div class="olab__cols"><div class="olab__panel" data-r="meter"></div><div class="olab__panel"><div class="olab__read" data-r="read" aria-live="polite"></div><div class="pw__bars" data-r="bars"></div></div></div>' +
      '<div class="olab__panel"><b>' + pr('Bài tập đọc công tơ', 'Meter-reading exercise') + '</b><br><label>' + pr('Số đầu tháng', 'Start of month') + ' <output data-r="startv"></output></label> · <label>' + pr('Số cuối tháng em đọc được', 'End reading you see') + ' <output data-r="endv"></output></label><br><label>' + pr('Điện năng tiêu thụ (kWh) = số cuối − số đầu', 'Energy used (kWh) = end − start') + ' <input type="text" inputmode="decimal" size="8" data-r="ans"></label> <button type="button" class="btn btn--sm" data-act="chk">' + pr('Kiểm tra', 'Check') + '</button> <button type="button" class="btn btn--sm" data-act="csv">' + pr('Chép bảng (CSV)', 'Copy table (CSV)') + '</button></div><p class="olab__status" data-r="status" role="status"></p></div>';
    const lab = $('[data-lab="' + id + '"]', body), q = (n) => $('[data-r="' + n + '"]', lab);
    const total = () => { let k = 0; const rows = []; DEVICES.forEach((d) => { const u = S.use[d.id]; if (u && u.on) { const e = u.P * u.n * u.h * S.days / 1000; k += e; rows.push([d, e, u]); } }); return { k, rows }; };
    function drawDevs() { q('devs').innerHTML = '<table class="olab__tbl"><thead><tr><th></th><th>' + pr('Thiết bị', 'Appliance') + '</th><th>𝒫 (W)</th><th>' + pr('Giờ/ngày', 'h/day') + '</th></tr></thead><tbody>' + Object.keys(S.use).map((i) => { const d = DEVICES.find((x) => x.id === i), u = S.use[i]; return '<tr><td><input type="checkbox" data-d="' + i + '" data-f="on"' + (u.on ? ' checked' : '') + ' aria-label="' + d.vi + '"></td><td>' + pr(d.vi, d.en) + '</td><td><input type="number" min="1" max="3000" step="1" data-d="' + i + '" data-f="P" value="' + u.P + '" style="width:76px"></td><td><input type="number" min="0" max="24" step="0.5" data-d="' + i + '" data-f="h" value="' + u.h + '" style="width:64px"></td></tr>'; }).join('') + '</tbody></table>'; }
    function render() {
      const T = total(), end = S.start + T.k;
      q('read').innerHTML = '<table class="olab__tbl olab__tbl--read"><tbody><tr><th scope="row">' + pr('Điện năng cả tháng', 'Energy for the month') + '</th><td>' + fmt(T.k, 2) + ' kWh = ' + fmt(T.k * 3.6, 1) + '·10⁶ J</td></tr><tr><th scope="row">' + pr('Tiền điện (theo giá em nhập)', 'Cost (your price)') + '</th><td>' + fmt(pow.bill(T.k, S.price), 0) + ' đồng</td></tr></tbody></table>';
      const mx = Math.max(1, ...T.rows.map((r) => r[1]));
      q('bars').innerHTML = T.rows.map((r) => '<div><small>' + pr(r[0].vi.split(' (')[0], r[0].en.split(' (')[0]) + ': ' + fmt(r[1], 1) + ' kWh</small><div class="pw__bar" style="width:' + (r[1] / mx * 100).toFixed(1) + '%"></div></div>').join('');
      const digits = String(Math.floor(end)).padStart(5, '0'), tenth = Math.floor((end % 1) * 10);
      q('meter').innerHTML = S.meter === 'mech' ? '<div><div class="pw__digits" aria-label="' + digits + ',' + tenth + ' kWh">' + digits.split('').map((c) => '<b>' + c + '</b>').join('') + '<b>' + tenth + '</b></div> kWh<br><svg viewBox="0 0 120 120" width="130" height="130" role="img" aria-label="Đĩa quay của công tơ cơ / Spinning disc of the mechanical meter"><circle cx="60" cy="60" r="54" fill="#f1f3f8" stroke="currentColor" stroke-width="3"/><g class="pw__disc" style="transform-origin:60px 60px;transform:rotate(' + (S.disc % 360).toFixed(1) + 'deg)"><circle cx="60" cy="60" r="38" fill="#fff" stroke="currentColor"/><path d="M60 22 A38 38 0 0 1 98 60 L60 60 Z" fill="#222"/></g></svg></div>' : '<div><span class="pw__lcd">' + fmt(end, 1).replace(',', '.') + '</span> kWh<br><small>' + pr('Đèn xung nháy theo công suất', 'The pulse light blinks with the power') + ' <span style="color:' + (Math.floor(S.disc / 180) % 2 ? '#e0393e' : '#888') + '">●</span></small></div>';
      q('startv').textContent = fmt(S.start, 0) + ' kWh'; q('endv').textContent = fmt(end, 1) + ' kWh';
    }
    const lp = loop(lab, (dt) => { const T = total(); S.disc += Math.min(720, T.k * 2 + 20) * dt * 3; const m = q('meter').querySelector('.pw__disc'); if (m) m.style.transform = 'rotate(' + (S.disc % 360).toFixed(1) + 'deg)'; if (S.meter !== 'mech') render(); return true; });
    lab.addEventListener('input', (e) => { const t = e.target; if (t.dataset.d) { const u = S.use[t.dataset.d]; if (t.dataset.f === 'on') u.on = t.checked; else u[t.dataset.f] = clamp(+t.value || 0, 0, 3000); } else if (t.dataset.k === 'days') S.days = clamp(+t.value || 1, 1, 31); else if (t.dataset.k === 'price') { const v = num(t.value); if (isFinite(v)) S.price = Math.max(0, v); } else return; render(); });
    lab.addEventListener('click', (e) => {
      const a = e.target.closest('[data-act]'); if (!a) return; const k = a.dataset.act;
      if (k === 'meter') { S.meter = S.meter === 'mech' ? 'elec' : 'mech'; a.setAttribute('aria-pressed', S.meter === 'elec'); a.innerHTML = pr(S.meter === 'mech' ? 'Công tơ: cơ (đĩa quay)' : 'Công tơ: điện tử', S.meter === 'mech' ? 'Meter: mechanical (spinning disc)' : 'Meter: electronic'); render(); }
      else if (k === 'chk') { const T = total(), v = num(q('ans').value); const st = q('status'); if (!isFinite(v)) { st.innerHTML = pr('Hãy nhập một số.', 'Enter a number.'); return; } const ok = Math.abs(v - T.k) <= Math.max(0.1, T.k * 0.02); st.className = 'olab__status ' + (ok ? 'olab__status--ok' : 'olab__status--warn'); st.innerHTML = ok ? pr('Đúng! Điện năng = số cuối − số đầu = ' + fmt(T.k, 2) + ' kWh.', 'Correct! Energy = end − start = ' + fmt(T.k, 2) + ' kWh.') : pr('Chưa đúng: lấy số cuối trừ số đầu (đã hiện ở trên).', 'Not yet: subtract the start reading from the end reading (shown above).'); }
      else if (k === 'csv') { const T = total(); const csv = toCSV(['thiet_bi', 'P_W', 'gio_ngay', 'ngay', 'kWh'], T.rows.map((r) => [r[0].vi, r[2].P, r[2].h, S.days, fmt(r[1], 3)])); copyText(csv, () => { q('status').textContent = 'Đã chép bảng CSV / CSV copied.'; }); }
    });
    drawDevs(); lab.querySelector('[data-k="days"]').value = S.days; lab.querySelector('[data-k="price"]').value = S.price; render(); lp.kick(); return { state: S };
  }

  window.LabSims = Object.assign(window.LabSims || {}, {
    'pow-wui': { fn: wuiLab, vi: 'Điện năng W = UIt và công suất 𝒫 = UI', en: 'Electrical energy W = UIt and power 𝒫 = UI', intro: 'Kéo U, I, t; làm bài tập.' },
    'pow-rated': { fn: ratedLab, vi: 'Công suất định mức (Hình 13.1)', en: 'Rated power (Figure 13.1)', intro: 'Đổi hiệu điện thế, xem độ sáng và công suất thực.' },
    'pow-label': { fn: labelLab, vi: 'Ý nghĩa các số ghi trên thiết bị', en: 'What the numbers on a device mean', intro: 'Chọn nguồn đúng cho từng thiết bị.' },
    'pow-bill': { fn: billLab, vi: 'Công tơ điện và tiền điện (Hình 13.2)', en: 'Electricity meter and bill (Figure 13.2)', intro: 'Tính điện năng cả tháng.' }
  });
})();
