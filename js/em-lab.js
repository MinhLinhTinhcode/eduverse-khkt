/* ==========================================================================
   EM LAB — cảm ứng điện từ, máy phát điện xoay chiều (KHTN 9, Bài 14). Nạp SAU optics-lab.js.
   1. Engine thuần dữ liệu `EmLab.engine` (MÔ HÌNH MINH HOẠ, không nhằm tính chính xác):
        fluxMagnet(d,s)  thông lượng qua cuộn dây của nam châm thanh (lưỡng cực trên trục), d = khoảng cách cực gần (cm)
        Induction        e = −N·ΔΦ/Δt theo SAI PHÂN THỜI GIAN THẬT (cửa sổ 120 ms); đứng yên ⇒ e = 0; mạch hở ⇒ i = 0
        genFlux/genEmf/ledState/period/reversalsPerSecond      máy phát khung quay đều
        selfTest()
   2. Giao diện (đăng ký vào LabSims): em-magnet (W14.1)  em-electro (W14.2)  em-rotmagnet (W14.3)
        em-squeeze (W14.4)  em-conditions (W14.5)  em-generator (W14.6)  em-graph (W14.7)
   Quy ước: kim điện kế lệch PHẢI khi i > 0; đưa cực Bắc lại gần cuộn dây ⇒ Φ tăng ⇒ i > 0 (lệch phải).
   Cách thêm thành phần mới: thêm hàm engine vào E, một widget trả về {state}, và một mục trong window.LabSims.
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab; if (!L) return;
  const { makeDrag, fmt, pr, raf, clamp } = L;
  const $ = (s, r) => r.querySelector(s), $$ = (s, r) => Array.from(r.querySelectorAll(s));
  const setA = (el, o) => { for (const k in o) el.setAttribute(k, o[k]); };
  let uid = 0;

  /* ------------------------------------------------------------------ ENGINE */
  const A_COIL = 3, H_MAG = 2.5, WIN = 0.12;                     // bán kính cuộn dây, nửa chiều dài nam châm (cm); cửa sổ sai phân (s)
  const fluxMagnet = (d, s) => (s || 1) * 10 * A_COIL * A_COIL / Math.pow(A_COIL * A_COIL + Math.pow(d + H_MAG, 2), 1.5);
  function Induction(N, R) {
    const o = { N: N || 200, R: R || 10, closed: true, hist: [], K: 0.03 };
    o.push = function (t, phi) { this.hist.push([t, phi]); while (this.hist.length > 2 && this.hist[0][0] < t - 1) this.hist.shift(); };
    o.emf = function (now) {
      const h = this.hist; if (h.length < 2) return 0;
      const last = h[h.length - 1];
      let ref = null; for (let k = h.length - 1; k >= 0; k--) { if (h[k][0] <= now - WIN) { ref = h[k]; break; } ref = h[k]; }
      if (now - last[0] > WIN) return 0;                         // đứng yên quá lâu ⇒ không còn biến thiên
      const dt = last[0] - ref[0]; if (dt <= 1e-4) return 0;
      return -this.N * (last[1] - ref[1]) / dt;                  // e = −N ΔΦ/Δt
    };
    o.current = function (now) { return this.closed ? -this.emf(now) / this.R : 0; };   // i > 0: kim lệch phải (đã đổi dấu theo quy ước)
    o.deflect = function (now) { return Math.tanh(this.K * this.current(now) * 1); };
    return o;
  }
  /* máy phát: khung quay đều với tần số f (Hz), Φ = Φ0 cos(2πft), e = 2πf Φ0 sin(2πft) */
  const period = (f) => 1 / f, reversalsPerSecond = (f) => 2 * f;
  const genFlux = (t, f, P0) => (P0 || 1) * Math.cos(2 * Math.PI * f * t);
  const genEmf = (t, f, P0) => (P0 || 1) * 2 * Math.PI * f * Math.sin(2 * Math.PI * f * t);
  const iAC = (t, f, I0, ph) => I0 * Math.sin(2 * Math.PI * f * t + (ph || 0));            // i(t) của đồ thị 14.7: I0 = 1,0 A, f = 50 Hz
  const ledState = (i) => (i > 0.02 ? 'D1' : i < -0.02 ? 'D2' : 'off');                    // D1 sáng khi dòng A→B; D2 sáng khi B→A
  const E = {
    fluxMagnet, Induction, period, reversalsPerSecond, genFlux, genEmf, iAC, ledState, A_COIL, H_MAG,
    selfTest() {
      const T = [], add = (n, ok, got) => T.push({ name: n, ok: !!ok, got }), near = (a, b, e) => Math.abs(a - b) <= e;
      // đưa cực Bắc lại gần: d giảm 10 → 4 cm trong 0,5 s
      const run = (s, d0, d1, sec, N, R, closed) => { const I = Induction(N, R); I.closed = closed !== false; let t = 0, max = 0; for (let k = 0; k <= 50; k++) { t = k * sec / 50; I.push(t, fluxMagnet(d0 + (d1 - d0) * k / 50, s)); const i = I.current(t); if (Math.abs(i) > Math.abs(max)) max = i; } return { I, max, t }; };
      let r = run(1, 10, 4, 0.5);
      add('Φ tăng khi cực Bắc lại gần (d 10 → 4 cm)', fluxMagnet(4, 1) > fluxMagnet(10, 1), fluxMagnet(4, 1));
      add('đưa cực Bắc lại gần: i > 0 (kim lệch phải)', r.max > 0, r.max);
      const rr = run(1, 4, 10, 0.5); add('đưa cực Bắc ra xa: i đổi chiều (< 0)', rr.max < 0, rr.max);
      const rs = run(-1, 10, 4, 0.5); add('đổi cực (Nam lại gần): chiều dòng đảo ngược', rs.max < 0, rs.max);
      const fast = run(1, 10, 4, 0.25), slow = run(1, 10, 4, 1); add('kéo nhanh hơn ⇒ |i| lớn hơn', Math.abs(fast.max) > Math.abs(slow.max), Math.abs(fast.max) + ' > ' + Math.abs(slow.max));
      const I = Induction(200, 10); I.push(0, fluxMagnet(5, 1)); I.push(0.5, fluxMagnet(5, 1)); I.push(1, fluxMagnet(5, 1)); add('đứng yên ⇒ i = 0', I.current(1) === 0, I.current(1));
      const J = Induction(200, 10); J.push(0, fluxMagnet(10, 1)); J.push(0.1, fluxMagnet(4, 1)); const moving = J.current(0.1); add('sau khi dừng quá 120 ms kim về 0', moving > 0 && J.current(0.5) === 0, moving);
      const op = run(1, 10, 4, 0.5, 200, 10, false); add('mạch hở ⇒ i = 0 dù nam châm chuyển động', op.max === 0, op.max);
      const n1 = run(1, 10, 4, 0.5, 100, 10), n2 = run(1, 10, 4, 0.5, 400, 10); add('số vòng N tăng ⇒ |i| tăng (tỉ lệ)', near(n2.max / n1.max, 4, 1e-6), n2.max / n1.max);
      // máy phát
      const f = 50; add('f = 50 Hz ⇒ T = 20 ms, đổi chiều 100 lần/s', near(period(f), 0.02, 1e-12) && reversalsPerSecond(f) === 100, period(f));
      let flips = 0, prev = Math.sign(iAC(0.00001, f, 1)); for (let k = 1; k <= 100000; k++) { const s = Math.sign(iAC(k * 1e-5 + 1e-7, f, 1)); if (s !== prev && s !== 0) { flips++; prev = s; } }
      add('đếm trên 1 s mô phỏng: số lần i đổi dấu = 2f = 100', flips === 100 || flips === 99, flips);
      add('i(t) khớp Hình 14.7: i(5 ms) = 1,0 A; i(10 ms) ≈ 0; i(15 ms) = −1,0 A; i(25 ms) = 1,0 A', near(iAC(0.005, 50, 1), 1, 1e-9) && near(iAC(0.01, 50, 1), 0, 1e-9) && near(iAC(0.015, 50, 1), -1, 1e-9) && near(iAC(0.025, 50, 1), 1, 1e-9), iAC(0.005, 50, 1));
      add('e = −dΦ/dt cho khung quay: e(t) = 2πf·Φ0·sin(2πft); biên độ tăng theo f', near(genEmf(1 / 200, 50, 1), 2 * Math.PI * 50, 1e-9) && genEmf(1 / 400, 100, 1) > genEmf(1 / 200, 50, 1) * 1.9, genEmf(1 / 200, 50, 1));
      add('LED ngược cực: i > 0 ⇒ Đ₁ sáng, i < 0 ⇒ Đ₂ sáng, i = 0 ⇒ tắt cả hai', ledState(0.5) === 'D1' && ledState(-0.5) === 'D2' && ledState(0) === 'off', ledState(0.5));
      return T;
    }
  };
  L.engine.em = E;
  const prevSelf = L.engine.selfTest; L.engine.selfTest = function () { return prevSelf().concat(E.selfTest()); };

  /* ------------------------------------------------------------------ TIỆN ÍCH GIAO DIỆN */
  /* vòng lặp chỉ chạy khi widget hiển thị; step(dt, tSec) trả false khi có thể nghỉ */
  function loop(root, step) {
    let vis = true, on = false, last = 0;
    const tick = (ts) => { if (!root.isConnected) { on = false; return; } const dt = Math.min(0.05, (ts - last) / 1000); last = ts; const keep = step(dt, ts / 1000); if (keep !== false && vis) requestAnimationFrame(tick); else on = false; };
    const kick = () => { if (on || !vis) return; on = true; last = performance.now(); requestAnimationFrame(tick); };
    if ('IntersectionObserver' in window) new IntersectionObserver((es) => { vis = es[0].isIntersecting; if (vis) kick(); }).observe(root);
    return { kick };
  }
  const nowS = () => performance.now() / 1000;
  /* điện kế có vạch chia: g = nhóm <g> tại (cx,cy), trả về hàm đặt kim (−1…1) */
  const galvSVG = (cx, cy, R) => {
    let t = '<path d="M' + (cx - R * Math.sin(1.05)).toFixed(1) + ' ' + (cy - R * Math.cos(1.05)).toFixed(1) + ' A' + R + ' ' + R + ' 0 0 1 ' + (cx + R * Math.sin(1.05)).toFixed(1) + ' ' + (cy - R * Math.cos(1.05)).toFixed(1) + '" fill="none" class="cl__arc"/>';
    for (let k = -10; k <= 10; k++) { const a = k / 10 * 1.05, big = k % 5 === 0, r1 = R, r2 = R - (big ? 10 : 6); t += '<line x1="' + (cx + r1 * Math.sin(a)).toFixed(1) + '" y1="' + (cy - r1 * Math.cos(a)).toFixed(1) + '" x2="' + (cx + r2 * Math.sin(a)).toFixed(1) + '" y2="' + (cy - r2 * Math.cos(a)).toFixed(1) + '" class="cl__tick' + (big ? ' cl__tick--big' : '') + '"/>'; }
    return '<rect x="' + (cx - R - 8) + '" y="' + (cy - R - 8) + '" width="' + (2 * R + 16) + '" height="' + (R + 40) + '" rx="10" class="cl__meter"/>' + t + '<text x="' + cx + '" y="' + (cy - R * 0.45) + '" class="cl__mL" text-anchor="middle">G</text><text x="' + (cx - R * 0.8) + '" y="' + (cy + 18) + '" class="cl__num" text-anchor="middle">−</text><text x="' + cx + '" y="' + (cy + 18) + '" class="cl__num" text-anchor="middle">0</text><text x="' + (cx + R * 0.8) + '" y="' + (cy + 18) + '" class="cl__num" text-anchor="middle">+</text>' +
      '<g data-r="needle" transform="translate(' + cx + ',' + cy + ')"><line y1="6" y2="-' + (R - 4) + '" class="cl__needle"/></g><circle cx="' + cx + '" cy="' + cy + '" r="5" class="cl__hub"/>';
  };
  const needleTo = (svg, v) => { const n = $('[data-r="needle"]', svg); if (n) n.setAttribute('transform', n.getAttribute('transform').replace(/rotate\([^)]*\)/, '').trim() + ' rotate(' + (clamp(v, -1, 1) * 60).toFixed(1) + ')'); };
  const loopsSVG = (cx, cy, rx, ry, n, cls) => { let s = ''; for (let k = 0; k < n; k++) s += '<ellipse cx="' + (cx + (k - (n - 1) / 2) * 5) + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="none" class="' + (cls || 'em__coil') + '"/>'; return s; };
  const magnetSVG = (x, y, len, h, northRight) => '<g data-r="mag"><rect x="' + (x - len / 2) + '" y="' + (y - h / 2) + '" width="' + len / 2 + '" height="' + h + '" class="' + (northRight ? 'em__S' : 'em__N') + '"/><rect x="' + x + '" y="' + (y - h / 2) + '" width="' + len / 2 + '" height="' + h + '" class="' + (northRight ? 'em__N' : 'em__S') + '"/><text x="' + (x - len / 4) + '" y="' + (y + 5) + '" class="em__pole" text-anchor="middle">' + (northRight ? 'S' : 'N') + '</text><text x="' + (x + len / 4) + '" y="' + (y + 5) + '" class="em__pole" text-anchor="middle">' + (northRight ? 'N' : 'S') + '</text></g>';
  const resetBtn = (lab, fn) => { const b = $('[data-act="reset"]', lab); if (b) b.onclick = fn; };

  /* ------------------------------------------------------------------ W14.1: NAM CHÂM THANH VÀ CUỘN DÂY */
  function magnetLab(body) {
    const id = 'em' + (++uid), PX = 20, CX = 410, CYY = 110, ML = 90;
    const S = { mx: 150, coilX: CX, north: true, mode: 'magnet', N: 200, R: 10, closed: true, rows: [], lastMove: 0, needle: 0 };
    const ind = Induction(S.N, S.R);
    body.innerHTML = '<div class="olab em" data-lab="' + id + '"><p class="olab__hint">' + pr('Kéo thanh nam châm lại gần hoặc ra xa cuộn dây (hoặc đổi sang kéo cuộn dây) và quan sát kim điện kế. Kéo nhanh thì kim lệch nhiều, dừng lại thì kim về 0. Mô hình minh hoạ, không nhằm tính chính xác.', 'Drag the bar magnet towards or away from the coil (or switch to dragging the coil) and watch the galvanometer. Drag faster for a bigger deflection; stop and the needle returns to 0. An illustrative model, not an exact calculation.') + '</p>' +
      '<div class="olab__btns"><button type="button" class="btn btn--sm" data-act="pole" aria-pressed="false">' + pr('Đổi cực (Bắc ↔ Nam)', 'Swap pole (N ↔ S)') + '</button><button type="button" class="btn btn--sm" data-act="mode" aria-pressed="false">' + pr('Đang kéo: nam châm', 'Dragging: the magnet') + '</button><button type="button" class="btn btn--sm" data-act="closed" aria-pressed="true">' + pr('Mạch kín', 'Closed circuit') + '</button><button type="button" class="btn btn--sm" data-act="rec">' + pr('Ghi nhận', 'Record') + '</button><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button></div>' +
      '<div class="olab__cols"><div class="olab__stage"><svg class="olab__svg em__svg" viewBox="0 0 560 350" role="group" aria-label="Nam châm, cuộn dây và điện kế / Magnet, coil and galvanometer">' +
      '<rect width="560" height="350" class="cl__bg"/><g data-r="coilG"></g><g data-r="fieldG"></g><g data-r="magG"></g>' +
      '<g data-r="wires"></g><g data-r="gal">' + galvSVG(140, 280, 62) + '</g>' +
      '<g data-h="mover" data-r="oh" tabindex="0" role="slider" aria-label="Kéo nam châm hoặc cuộn dây (mũi tên ±1 cm) / Drag the magnet or coil (arrows ±1 cm)" class="olab__hd olab__hd--src"><circle r="32" class="olab__hit"/><circle r="9" class="olab__dot"/></g>' +
      '<text data-r="lines" x="14" y="24" class="cl__lab"></text></svg></div><div class="olab__panel"><label class="olab__ctl"><span>N = <output data-out="N"></output> ' + pr('vòng', 'turns') + '</span><input type="range" data-k="N" min="50" max="1000" step="50"></label>' +
      '<label class="olab__ctl"><span>R = <output data-out="R"></output> Ω</span><input type="range" data-k="R" min="1" max="20" step="1"></label><div class="olab__read" data-r="read" aria-live="polite"></div></div></div>' +
      '<table class="olab__tbl" data-r="tbl"><caption>' + pr('Bảng quan sát', 'Observation table') + '</caption><thead><tr><th>' + pr('Chuyển động', 'Motion') + '</th><th>' + pr('Cực lại gần cuộn dây', 'Pole facing the coil') + '</th><th>' + pr('Số đường sức', 'Field lines') + '</th><th>' + pr('Kim điện kế', 'Needle') + '</th></tr></thead><tbody></tbody></table><p class="olab__status" data-r="status" role="status"></p></div>';
    const lab = $('[data-lab="' + id + '"]', body), svg = $('.olab__svg', lab), q = (n) => $('[data-r="' + n + '"]', lab);
    let trend = 0, lastPhi = null, lastT = 0;
    const dCm = () => clamp((S.coilX - (S.mx + ML / 2)) / PX, 0.5, 40);
    const phiNow = () => fluxMagnet(dCm(), S.north ? 1 : -1);
    function sample() { const t = nowS(); ind.N = S.N; ind.R = S.R; ind.closed = S.closed; const phi = phiNow(); ind.push(t, phi); if (lastPhi != null && Math.abs(phi - lastPhi) > 1e-4) { trend = Math.sign(phi - lastPhi) * (S.north ? 1 : -1) * (S.north ? 1 : 1); S.lastMove = t; trendSign = Math.sign(Math.abs(phi) - Math.abs(lastPhi)); } lastPhi = phi; }
    let trendSign = 0;
    function render() {
      const t = nowS(), moving = t - S.lastMove < WIN, n = Math.min(8, 3 + Math.round(S.N / 200));
      q('coilG').innerHTML = loopsSVG(S.coilX, CYY, 16, 50, n) + '<text x="' + S.coilX + '" y="' + (CYY + 76) + '" class="cl__lab" text-anchor="middle">N = ' + S.N + '</text>';
      let f = ''; for (let k = 1; k <= 4; k++) { const o = 8 + k * 9; f += '<path d="M' + (S.mx + ML / 2) + ' ' + CYY + ' C ' + (S.mx + ML / 2 + 80) + ' ' + (CYY - o * 1.7) + ', ' + (S.mx - ML / 2 - 80) + ' ' + (CYY - o * 1.7) + ', ' + (S.mx - ML / 2) + ' ' + CYY + '" class="em__fl"/><path d="M' + (S.mx + ML / 2) + ' ' + CYY + ' C ' + (S.mx + ML / 2 + 80) + ' ' + (CYY + o * 1.7) + ', ' + (S.mx - ML / 2 - 80) + ' ' + (CYY + o * 1.7) + ', ' + (S.mx - ML / 2) + ' ' + CYY + '" class="em__fl"/>'; }
      q('fieldG').innerHTML = f; q('magG').innerHTML = magnetSVG(S.mx, CYY, ML, 30, S.north);
      const hx = S.mode === 'magnet' ? S.mx : S.coilX; setA(q('oh'), { transform: 'translate(' + hx + ',' + (CYY - 62) + ')', 'aria-valuenow': hx });
      q('wires').innerHTML = '<path d="M' + S.coilX + ' ' + (CYY + 50) + ' V 335 H 202" class="cl__wire"/>' + (S.closed ? '<path d="M' + S.coilX + ' ' + (CYY - 50) + ' H 500 V 335 H 202" class="cl__wire"/><path d="M202 335 V 292" class="cl__wire"/>' : '<path d="M' + S.coilX + ' ' + (CYY - 50) + ' H 500 V 320" class="cl__wire"/><path d="M500 320 L 490 302" class="cl__blade" stroke="currentColor" fill="none"/><text x="470" y="294" class="cl__lab">' + pr('hở', 'open') + '</text>'.replace(/<span[^>]*>/g, '').replace(/<\/span>/g, '') + '');
      const lines = Math.round(Math.abs(phiNow()) * 1.4); q('lines').textContent = 'Số đường sức xuyên qua tiết diện ≈ ' + lines + (moving ? (trendSign > 0 ? '  ↑ tăng' : trendSign < 0 ? '  ↓ giảm' : '') : '  (không đổi)');
      const dd = ind.deflect(t); S.needle += (dd - S.needle) * 0.35; needleTo(q('gal'), S.needle);
      const i = ind.current(t);
      q('read').innerHTML = '<table class="olab__tbl olab__tbl--read"><tbody><tr><th scope="row">d</th><td>' + fmt(dCm(), 1) + ' cm</td></tr><tr><th scope="row">Φ (đv)</th><td>' + fmt(phiNow(), 2) + '</td></tr><tr><th scope="row">i (mA, tương đối)</th><td>' + fmt(i * 0.1, 1) + '</td></tr></tbody></table>';
      const st = q('status'); st.innerHTML = !S.closed ? pr('Mạch hở: dù nam châm chuyển động cũng không có dòng điện (i = 0).', 'Open circuit: even with the magnet moving there is no current (i = 0).') : moving ? pr(trendSign > 0 ? 'Số đường sức xuyên qua cuộn dây đang tăng ⇒ xuất hiện dòng điện cảm ứng.' : 'Số đường sức xuyên qua cuộn dây đang giảm ⇒ dòng điện cảm ứng đổi chiều.', trendSign > 0 ? 'The number of field lines through the coil is increasing ⇒ an induced current appears.' : 'The number of field lines through the coil is decreasing ⇒ the induced current reverses.') : pr('Không chuyển động: số đường sức không đổi ⇒ không có dòng điện cảm ứng.', 'No motion: the number of field lines is steady ⇒ no induced current.');
      $$('[data-k]', lab).forEach((e) => { e.value = S[e.dataset.k]; $('[data-out="' + e.dataset.k + '"]', lab).textContent = S[e.dataset.k]; });
      return moving || Math.abs(S.needle) > 0.004 || Math.abs(dd) > 0.004;
    }
    const lp = loop(lab, () => { sample(); return render(); });
    const mv = (x) => { if (S.mode === 'magnet') S.mx = clamp(Math.round(x), 60, S.coilX - ML / 2 - 6); else S.coilX = clamp(Math.round(x), S.mx + ML / 2 + 6, 520); sample(); lp.kick(); };
    makeDrag(svg, { mover: { move(x) { mv(x); }, key(dir, sh) { mv((S.mode === 'magnet' ? S.mx : S.coilX) + dir * (sh ? 50 : 10)); } } });
    lab.addEventListener('input', (e) => { const k = e.target.dataset && e.target.dataset.k; if (k) { S[k] = +e.target.value; lp.kick(); render(); } });
    lab.addEventListener('click', (e) => {
      const a = e.target.closest('[data-act]'); if (!a) return; const k = a.dataset.act;
      if (k === 'pole') { S.north = !S.north; a.setAttribute('aria-pressed', !S.north); lastPhi = null; sample(); }
      else if (k === 'mode') { S.mode = S.mode === 'magnet' ? 'coil' : 'magnet'; a.setAttribute('aria-pressed', S.mode === 'coil'); a.innerHTML = pr(S.mode === 'magnet' ? 'Đang kéo: nam châm' : 'Đang kéo: cuộn dây', S.mode === 'magnet' ? 'Dragging: the magnet' : 'Dragging: the coil'); }
      else if (k === 'closed') { S.closed = !S.closed; a.setAttribute('aria-pressed', S.closed); a.innerHTML = pr(S.closed ? 'Mạch kín' : 'Mạch hở', S.closed ? 'Closed circuit' : 'Open circuit'); }
      else if (k === 'rec') { const t = nowS(), moving = t - S.lastMove < WIN, i = ind.current(t); S.rows.push([moving ? (trendSign > 0 ? 'lại gần / approaching' : 'ra xa / receding') : 'đứng yên / still', S.north ? 'Bắc / N' : 'Nam / S', moving ? (trendSign > 0 ? 'tăng / ↑' : 'giảm / ↓') : 'không đổi / –', Math.abs(i) < 0.5 ? '0' : i > 0 ? 'phải / right' : 'trái / left']); q('tbl').querySelector('tbody').innerHTML = S.rows.map((r) => '<tr>' + r.map((c) => '<td>' + c + '</td>').join('') + '</tr>').join(''); }
      else if (k === 'reset') { Object.assign(S, { mx: 150, coilX: CX, north: true, mode: 'magnet', N: 200, R: 10, closed: true, rows: [], needle: 0, lastMove: 0 }); ind.hist = []; lastPhi = null; trendSign = 0; q('tbl').querySelector('tbody').innerHTML = ''; $$('[data-act]', lab).forEach((b) => { if (b.dataset.act === 'closed') { b.setAttribute('aria-pressed', 'true'); b.innerHTML = pr('Mạch kín', 'Closed circuit'); } else if (b.dataset.act === 'mode') { b.setAttribute('aria-pressed', 'false'); b.innerHTML = pr('Đang kéo: nam châm', 'Dragging: the magnet'); } else if (b.dataset.act === 'pole') b.setAttribute('aria-pressed', 'false'); }); }
      lp.kick(); render();
    });
    sample(); render(); return { state: S, ind, step: (x) => { mv(x); } };
  }

  /* ------------------------------------------------------------------ W14.2: NAM CHÂM ĐIỆN, ĐÓNG/MỞ CÔNG TẮC */
  function electroLab(body) {
    const id = 'ee' + (++uid), S = { on: false, I: 1, Icur: 0, x2: 380, needle: 0, last: 0, Iprev: 0, rows: [] };
    body.innerHTML = '<div class="olab em" data-lab="' + id + '"><p class="olab__hint">' + pr('Đóng hoặc mở công tắc K, hoặc kéo thanh trượt dòng điện: kim điện kế chỉ lệch ĐÚNG LÚC dòng điện (nam châm điện) đang thay đổi, rồi về 0 khi dòng điện không đổi. Kéo cuộn dây bên phải lại gần hoặc ra xa nam châm điện.', 'Close or open switch K, or drag the current slider: the galvanometer deflects ONLY while the electromagnet’s current is changing, then returns to 0 when it is steady. Drag the right-hand coil towards or away from the electromagnet.') + '</p>' +
      '<div class="olab__cols"><div class="olab__stage"><svg class="olab__svg em__svg" viewBox="0 0 560 300" role="group" aria-label="Nam châm điện và cuộn dây nối điện kế / Electromagnet and coil with galvanometer"><rect width="560" height="300" class="cl__bg"/>' +
      '<rect x="110" y="100" width="150" height="40" class="em__core"/><g data-r="prim"></g><g data-r="sec"></g><path d="M110 150 V215 H60 M260 150 V215 H320" class="cl__wire" fill="none"/><g data-r="kw"></g><g data-r="gal">' + galvSVG(420, 250, 62) + '</g>' +
      '<path data-r="w2" class="cl__wire" fill="none"/><g data-h="coil2" data-r="oh" tabindex="0" role="slider" aria-label="Cuộn dây thứ cấp, khoảng cách (mũi tên) / Secondary coil position (arrows)" class="olab__hd olab__hd--src"><circle r="32" class="olab__hit"/><circle r="9" class="olab__dot"/></g>' +
      '<text x="14" y="24" class="cl__lab">' + 'nam châm điện / electromagnet' + '</text></svg></div><div class="olab__panel"><div class="olab__btns"><button type="button" class="btn btn--sm" data-act="sw" aria-pressed="false">' + pr('Công tắc K: đang mở', 'Switch K: open') + '</button><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button></div>' +
      '<label class="olab__ctl"><span>I = <output data-out="I"></output> A</span><input type="range" data-k="I" min="0" max="2" step="0.1"></label><div class="olab__read" data-r="read" aria-live="polite"></div></div></div><p class="olab__status" data-r="status" role="status"></p></div>';
    const lab = $('[data-lab="' + id + '"]', body), svg = $('.olab__svg', lab), q = (n) => $('[data-r="' + n + '"]', lab);
    const target = () => (S.on ? S.I : 0), TAU = 0.08;
    const coupling = () => 1 / Math.pow(1 + Math.pow((S.x2 - 260) / 90, 2), 1.5);
    function render(dt) {
      const prev = S.Icur; S.Icur += (target() - S.Icur) * (1 - Math.exp(-dt / TAU)); if (Math.abs(S.Icur - target()) < 0.002) S.Icur = target();
      const dI = dt > 0 ? (S.Icur - prev) / dt : 0, e = -coupling() * 120 * dI, i = -e / 10, t = nowS();
      const dd = Math.tanh(0.012 * i * 8); S.needle += (dd - S.needle) * 0.35; needleTo(q('gal'), S.needle);
      q('prim').innerHTML = loopsSVG(185, 120, 14, 36, 6, 'em__coil') + '<text x="185" y="172" class="cl__lab" text-anchor="middle">I = ' + fmt(S.Icur, 2) + ' A</text>' + (S.Icur > 0.02 ? '<g class="em__fl" opacity="' + clamp(S.Icur / 2, 0.2, 1).toFixed(2) + '"><path d="M260 120 C 330 40 70 40 110 120"/><path d="M260 120 C 330 200 70 200 110 120"/></g>' : '');
      q('sec').innerHTML = loopsSVG(S.x2, 120, 14, 36, 6, 'em__coil') + '<text x="' + S.x2 + '" y="172" class="cl__lab" text-anchor="middle">' + 'cuộn dây / coil' + '</text>';
      q('kw').innerHTML = '<circle cx="60" cy="215" r="3.5" class="cl__pt"/><circle cx="90" cy="215" r="3.5" class="cl__pt"/><line x1="60" y1="215" x2="' + (S.on ? 90 : 84) + '" y2="' + (S.on ? 215 : 198) + '" class="cl__blade"/><text x="75" y="238" class="cl__lab" text-anchor="middle">K</text><path d="M60 215 V250 H320 V215" class="cl__wire" fill="none"/>';
      q('w2').setAttribute('d', 'M' + S.x2 + ' 156 V 200 H 330 V 250 H 358 M' + S.x2 + ' 84 V 60 H 490 V 250 H 482');
      setA(q('oh'), { transform: 'translate(' + S.x2 + ',60)', 'aria-valuenow': S.x2 });
      q('read').innerHTML = '<table class="olab__tbl olab__tbl--read"><tbody><tr><th scope="row">I</th><td>' + fmt(S.Icur, 2) + ' A</td></tr><tr><th scope="row">ΔI/Δt</th><td>' + fmt(dI, 1) + ' A/s</td></tr><tr><th scope="row">i (mA)</th><td>' + fmt(i * 0.1, 1) + '</td></tr></tbody></table>';
      const ch = Math.abs(dI) > 0.05; q('status').innerHTML = ch ? pr(dI > 0 ? 'Dòng điện qua nam châm điện đang TĂNG ⇒ số đường sức qua cuộn dây tăng ⇒ kim lệch.' : 'Dòng điện qua nam châm điện đang GIẢM ⇒ số đường sức qua cuộn dây giảm ⇒ kim lệch ngược chiều.', dI > 0 ? 'The electromagnet current is RISING ⇒ more field lines through the coil ⇒ the needle deflects.' : 'The electromagnet current is FALLING ⇒ fewer field lines ⇒ the needle deflects the other way.') : pr('Dòng điện không đổi ⇒ số đường sức không đổi ⇒ kim về 0 (dù công tắc đang đóng).', 'The current is steady ⇒ the number of field lines is steady ⇒ the needle is at 0 (even with the switch closed).');
      $('[data-k="I"]', lab).value = S.I; $('[data-out="I"]', lab).textContent = fmt(S.I, 1);
      return ch || Math.abs(S.needle) > 0.004 || Math.abs(S.Icur - target()) > 0.002;
    }
    const lp = loop(lab, (dt) => render(dt));
    const mv = (x) => { S.x2 = clamp(Math.round(x), 290, 470); lp.kick(); render(0); };
    makeDrag(svg, { coil2: { move(x) { mv(x); }, key(dir, sh) { mv(S.x2 + dir * (sh ? 25 : 5)); } } });
    lab.addEventListener('input', (e) => { if (e.target.dataset && e.target.dataset.k === 'I') { S.I = +e.target.value; lp.kick(); } });
    lab.addEventListener('click', (e) => { const a = e.target.closest('[data-act]'); if (!a) return; if (a.dataset.act === 'sw') { S.on = !S.on; a.setAttribute('aria-pressed', S.on); a.innerHTML = pr(S.on ? 'Công tắc K: đang đóng' : 'Công tắc K: đang mở', S.on ? 'Switch K: closed' : 'Switch K: open'); } else { Object.assign(S, { on: false, I: 1, Icur: 0, x2: 380, needle: 0 }); const sw = $('[data-act="sw"]', lab); sw.setAttribute('aria-pressed', 'false'); sw.innerHTML = pr('Công tắc K: đang mở', 'Switch K: open'); } lp.kick(); });
    render(0); return { state: S };
  }

  /* ------------------------------------------------------------------ W14.3 + W14.6: NAM CHÂM / KHUNG DÂY QUAY ----- */
  /* mode 'magnet' (W14.3): nam châm quay trước cuộn dây đứng yên, hai LED ngược cực; mode 'gen' (W14.6): khung dây quay, có đồ thị i–t */
  function rotLab(body, mode) {
    const gen = mode === 'gen', id = 'er' + (++uid), S = { th: 0, f: gen ? 1 : 0.5, auto: false, t: 0, hist: [], magRot: false, ampF: false, flicker: true, paused: false, cursor: null, needle: 0 };
    body.innerHTML = '<div class="olab em" data-lab="' + id + '"><p class="olab__hint">' + (gen ? pr('Quay khung dây trong từ trường bằng tay nắm (hoặc bấm “Quay tự động” và chọn tần số f). Đồ thị i theo t vẽ theo thời gian thực; kéo con trỏ trên đồ thị để đọc i. Ở f nhỏ đèn nhấp nháy rõ, ở 50 Hz mắt không phân biệt được (minh hoạ).', 'Turn the coil in the magnetic field with the handle (or press “Auto rotate” and choose the frequency f). The graph of i against t is drawn in real time; drag the cursor on the graph to read i. At low f the lamp flickers visibly; at 50 Hz the eye cannot tell (illustrative).') : pr('Quay nam châm (kéo tay nắm đỏ hoặc bấm “Quay tự động”) trước cuộn dây kín có hai đèn LED đỏ, vàng mắc song song ngược cực: hai đèn sáng luân phiên theo chiều dòng điện cảm ứng.', 'Turn the magnet (drag the red handle or press “Auto rotate”) in front of the closed coil with a red and a yellow LED in parallel, opposite polarity: the two LEDs light alternately with the direction of the induced current.')) + '</p>' +
      '<div class="olab__btns"><button type="button" class="btn btn--sm" data-act="auto" aria-pressed="false">' + pr('Quay tự động', 'Auto rotate') + '</button>' + (gen ? '<button type="button" class="btn btn--sm" data-act="mag" aria-pressed="false">' + pr('Nam châm quay, cuộn dây đứng yên', 'Rotating magnet, fixed coil') + '</button><label class="olab__ctl"><input type="checkbox" data-k="ampF"> ' + pr('Biên độ tăng theo f (thực tế)', 'Amplitude grows with f (realistic)') + '</label>' : '') + '<button type="button" class="btn btn--sm" data-act="pause" aria-pressed="false">' + pr('Tạm dừng nhấp nháy', 'Pause flicker') + '</button><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button></div>' +
      '<p class="olab__status olab__status--warn" data-r="warn" hidden>' + pr('Cảnh báo nhấp nháy: ở tần số thấp đèn nhấp nháy. Bấm “Tạm dừng nhấp nháy” nếu thấy khó chịu.', 'Flicker warning: at low frequency the lamps flicker. Press “Pause flicker” if it bothers you.') + '</p>' +
      '<div class="olab__cols"><div class="olab__stage"><svg class="olab__svg em__svg" viewBox="0 0 560 ' + (gen ? 430 : 270) + '" role="group" aria-label="' + (gen ? 'Máy phát điện xoay chiều mô hình / Model AC generator' : 'Nam châm quay và hai đèn LED / Rotating magnet and two LEDs') + '"><rect width="560" height="' + (gen ? 430 : 270) + '" class="cl__bg"/><g data-r="scene"></g>' +
      '<g data-h="rot" data-r="oh" tabindex="0" role="slider" aria-label="Tay nắm quay (mũi tên ±5°) / Rotation handle (arrows ±5°)" aria-valuemin="0" aria-valuemax="360" class="olab__hd olab__hd--src"><circle r="32" class="olab__hit"/><circle r="9" class="olab__dot"/></g>' +
      (gen ? '<g data-r="graph"></g><g data-h="cur" data-r="ch" tabindex="0" role="slider" aria-label="Con trỏ thời gian trên đồ thị (mũi tên) / Time cursor on the graph (arrows)" class="olab__hd"><circle r="32" class="olab__hit"/><rect x="-5" y="-12" width="10" height="24" rx="3" class="olab__dot"/></g>' : '') + '</svg></div>' +
      '<div class="olab__panel"><label class="olab__ctl"><span>f = <output data-out="f"></output> Hz</span><input type="range" data-k="f" min="' + (gen ? 0.5 : 0.2) + '" max="' + (gen ? 50 : 3) + '" step="' + (gen ? 0.5 : 0.1) + '"></label><div class="olab__read" data-r="read" aria-live="polite"></div></div></div><p class="olab__status" data-r="status" role="status"></p></div>';
    const lab = $('[data-lab="' + id + '"]', body), svg = $('.olab__svg', lab), q = (n) => $('[data-r="' + n + '"]', lab);
    const CXm = gen ? 150 : 150, CYm = 120, W = 560;
    const I0 = () => (S.ampF ? Math.max(0.01, S.f / 50) : 1);
    const iNow = () => iAC(S.t, S.f, I0(), 0);                // đồ thị bắt đầu từ i = 0 ở t = 0 giống Hình 14.7
    let thSet = false;
    const iFromTheta = () => Math.sin(S.th);                  // chiều dòng cảm ứng theo góc quay, e ∝ −dΦ/dt ∝ sin θ
    function drawScene(i) {
      const ledD1 = ledState(i) === 'D1', ledD2 = ledState(i) === 'D2', lvl = clamp(Math.abs(i), 0, 1), flicker = !S.paused && S.f > 8 ? 0.5 : 0;
      const ledHtml = (x, y, col, on, lab2) => '<g transform="translate(' + x + ',' + y + ')"><circle r="16" fill="' + (on ? col : '#cfd5e6') + '" opacity="' + (on ? (0.45 + 0.55 * lvl).toFixed(2) : 1) + '" stroke="currentColor" stroke-width="2"/><path d="M-6 -7 L8 0 L-6 7 Z" fill="currentColor" opacity=".55"/><text y="32" class="cl__lab" text-anchor="middle">' + lab2 + '</text></g>';
      let s = '';
      if (gen) {
        const ang = S.magRot ? 0 : S.th, cxg = 150, cyg = 130;
        s += '<rect x="60" y="60" width="50" height="140" class="em__N"/><text x="85" y="135" class="em__pole" text-anchor="middle">N</text><rect x="190" y="60" width="50" height="140" class="em__S"/><text x="215" y="135" class="em__pole" text-anchor="middle">S</text>';
        for (let k = 0; k < 5; k++) s += '<line x1="112" y1="' + (80 + k * 25) + '" x2="188" y2="' + (80 + k * 25) + '" class="em__fl"/>';
        if (S.magRot) { const m = S.th; s += '<g transform="translate(150,130) rotate(' + (m * 180 / Math.PI).toFixed(1) + ')"><rect x="-44" y="-12" width="44" height="24" class="em__N"/><rect x="0" y="-12" width="44" height="24" class="em__S"/></g><ellipse cx="150" cy="130" rx="6" ry="64" fill="none" class="em__coil"/>'; }
        else { const w = Math.cos(ang); s += '<ellipse cx="150" cy="130" rx="' + Math.max(2, Math.abs(w) * 46).toFixed(1) + '" ry="58" fill="none" class="em__coil"/><line x1="150" y1="70" x2="150" y2="190" stroke="currentColor" stroke-dasharray="3 4" opacity=".5"/>'; }
        s += '<text x="150" y="226" class="cl__lab" text-anchor="middle">' + 'vành khuyên + chổi quét / slip rings + brushes' + '</text><circle cx="130" cy="206" r="7" class="em__ring"/><circle cx="170" cy="206" r="7" class="em__ring"/><rect x="124" y="214" width="12" height="8" class="em__brush"/><rect x="164" y="214" width="12" height="8" class="em__brush"/>';
        s += '<path d="M130 222 V250 H300 M170 222 V262 H300" class="cl__wire" fill="none"/>';
        s += ledHtml(330, 235, '#e0393e', ledD1, 'Đ₁ (A→B)') + ledHtml(400, 235, '#f2c500', ledD2, 'Đ₂ (B→A)');
        const b = clamp(Math.abs(i) * (S.f > 12 && !S.paused ? 0.7 : 1), 0, 1); s += '<g transform="translate(480,120)"><circle r="' + (24 + 14 * b).toFixed(0) + '" fill="#ffe24a" opacity="' + (0.15 + 0.7 * b).toFixed(2) + '"/><circle r="20" fill="#fff3a8" stroke="currentColor" stroke-width="2"/><path d="M-10 -10 L10 10 M10 -10 L-10 10" stroke="currentColor"/><text y="48" class="cl__lab" text-anchor="middle">' + 'bóng đèn / bulb' + '</text></g>';
      } else {
        s += '<ellipse cx="400" cy="120" rx="16" ry="56" fill="none" class="em__coil"/>' + loopsSVG(400, 120, 16, 56, 4);
        const ang = S.th; s += '<g transform="translate(220,120) rotate(' + (ang * 180 / Math.PI).toFixed(1) + ')"><rect x="-70" y="-15" width="70" height="30" class="em__S"/><rect x="0" y="-15" width="70" height="30" class="em__N"/><text x="-35" y="5" class="em__pole" text-anchor="middle">S</text><text x="35" y="5" class="em__pole" text-anchor="middle">N</text></g><circle cx="220" cy="120" r="4" class="cl__hub"/>';
        s += '<path d="M400 176 V210 H330 M400 64 V40 H480 V210 H430" class="cl__wire" fill="none"/>' + ledHtml(300, 212, '#e0393e', ledD1, 'Đ₁ (A→B)') + ledHtml(370, 212, '#f2c500', ledD2, 'Đ₂ (B→A)');
      }
      q('scene').innerHTML = s;
      const R = gen ? 78 : 0; const hx = gen ? (S.magRot ? CXm + Math.cos(S.th) * 44 : CXm + Math.cos(S.th) * 0) : 220 + Math.cos(S.th) * 70, hy = gen ? 130 - Math.sin(S.th) * 0 : 120 + Math.sin(S.th) * 70;
      if (gen) setA(q('oh'), { transform: 'translate(' + (S.magRot ? 150 + Math.cos(S.th) * 44 : 150 + Math.cos(S.th) * 46) + ',' + (S.magRot ? 130 + Math.sin(S.th) * 44 : 70) + ')', 'aria-valuenow': Math.round(((S.th * 180 / Math.PI) % 360 + 360) % 360) });
      else setA(q('oh'), { transform: 'translate(' + hx + ',' + hy + ')', 'aria-valuenow': Math.round(((S.th * 180 / Math.PI) % 360 + 360) % 360) });
    }
    /* đồ thị i–t như Hình 14.7: t (×10⁻³ s), i (A); cửa sổ 3 chu kì */
    function drawGraph() {
      if (!gen) return; const T = 1 / S.f, win = 3 * T, gx = 40, gy = 270, gw = 500, gh = 90, I = I0(), tr = Math.floor(S.t / win), t0 = tr * win;
      const X = (t) => gx + (t - t0) / win * gw, Y = (v) => gy - 140 + 0 - v / 1.2 * gh + 0;
      const base = 362; const Yv = (v) => base - v / 1.2 * 52 - 0;
      let h = '<rect x="30" y="296" width="520" height="126" fill="var(--paper)" stroke="var(--line)"/><line x1="40" y1="' + Yv(0) + '" x2="545" y2="' + Yv(0) + '" class="cl__axis"/><line x1="40" y1="300" x2="40" y2="420" class="cl__axis"/><text x="46" y="308" class="cl__num">i (A)</text><text x="500" y="' + (Yv(0) - 4) + '" class="cl__num">t (' + (T < 0.05 ? '×10⁻³ s' : 's') + ')</text>';
      [1, 0.5, 0, -0.5, -1].forEach((v) => { h += '<line x1="36" y1="' + Yv(v) + '" x2="545" y2="' + Yv(v) + '" stroke="var(--line)" stroke-width="1" opacity=".6"/><text x="34" y="' + (Yv(v) + 3) + '" class="cl__num" text-anchor="end">' + fmt(v, 1) + '</text>'; });
      for (let k = 0; k <= 6; k++) { const tt = t0 + k * win / 6, xx = X(tt); h += '<line x1="' + xx.toFixed(1) + '" y1="300" x2="' + xx.toFixed(1) + '" y2="418" stroke="var(--line)" stroke-width="1" opacity=".5"/><text x="' + xx.toFixed(1) + '" y="' + (Yv(0) + 14) + '" class="cl__num" text-anchor="middle">' + fmt(T < 0.05 ? tt * 1000 : tt, T < 0.05 ? 0 : 1) + '</text>'; }
      let d = ''; const nP = 160; for (let k = 0; k <= nP; k++) { const tt = t0 + k * win / nP; if (tt > S.t) break; d += (d ? 'L' : 'M') + X(tt).toFixed(1) + ' ' + Yv(iAC(tt, S.f, I, 0)).toFixed(1); }
      h += '<path d="' + d + '" fill="none" stroke="var(--pen)" stroke-width="2.6"/>';
      const ct = S.cursor == null ? clamp(S.t, t0, t0 + win) : clamp(S.cursor, t0, t0 + win);
      h += '<line x1="' + X(ct).toFixed(1) + '" y1="300" x2="' + X(ct).toFixed(1) + '" y2="418" stroke="var(--red)" stroke-width="1.6" stroke-dasharray="4 3"/><circle cx="' + X(ct).toFixed(1) + '" cy="' + Yv(iAC(ct, S.f, I, 0)).toFixed(1) + '" r="5" fill="var(--red)"/>';
      q('graph').innerHTML = h; setA(q('ch'), { transform: 'translate(' + X(ct).toFixed(1) + ',' + Yv(0) + ')' });
      S._gx = { X0: gx, gw, win, t0, I }; S._ct = ct;
    }
    function render() {
      const i = gen ? iNow() * 1 : iFromTheta();
      drawScene(gen ? (S.magRot || true ? iNow() : i) : i); drawGraph();
      const T = 1 / S.f, ct = gen ? (S._ct != null ? S._ct : S.t) : S.t, ic = gen ? iAC(ct, S.f, I0(), 0) : i;
      const rev = reversalsPerSecond(S.f);
      q('read').innerHTML = '<table class="olab__tbl olab__tbl--read"><tbody>' + (gen ? '<tr><th scope="row">T = 1/f</th><td>' + fmt(T * 1000, T < 0.1 ? 1 : 0) + ' ms</td></tr><tr><th scope="row">f</th><td>' + fmt(S.f, 1) + ' Hz</td></tr><tr><th scope="row">' + pr('Số lần đổi chiều trong 1 s', 'Reversals per second') + '</th><td>' + fmt(rev, 0) + '</td></tr><tr><th scope="row">i (' + fmt(ct * 1000, 1) + ' ms)</th><td>' + fmt(ic, 2) + ' A</td></tr><tr><th scope="row">i<sub>max</sub></th><td>' + fmt(I0(), 2) + ' A</td></tr>' : '<tr><th scope="row">θ</th><td>' + fmt(((S.th * 180 / Math.PI) % 360 + 360) % 360, 0) + '°</td></tr><tr><th scope="row">i</th><td>' + (Math.abs(ic) < 0.05 ? '0' : ic > 0 ? '+ (A→B)' : '− (B→A)') + '</td></tr>') + '</tbody></table>';
      const lit = ledState(gen ? iNow() : i), st = q('status'); const nowI = gen ? iNow() : i;
      st.innerHTML = gen ? (S.f > 12 && !S.paused ? pr('f lớn: đèn đổi trạng thái quá nhanh, mắt thấy sáng đều; nhưng dòng điện vẫn đổi chiều ' + fmt(rev, 0) + ' lần mỗi giây.', 'At large f the lamp changes too fast: the eye sees steady light, yet the current still reverses ' + fmt(rev, 0) + ' times per second.') : pr('Số đường sức xuyên qua khung dây tăng, giảm luân phiên ⇒ dòng điện xoay chiều; ' + (lit === 'D1' ? 'Đ₁ sáng (dòng A→B).' : lit === 'D2' ? 'Đ₂ sáng (dòng B→A).' : 'đang đổi chiều.'), 'Field lines through the coil alternately rise and fall ⇒ alternating current; ' + (lit === 'D1' ? 'D₁ is lit (current A→B).' : lit === 'D2' ? 'D₂ is lit (current B→A).' : 'the current is reversing.'))) : pr('Nam châm quay: số đường sức qua cuộn dây tăng, giảm luân phiên ⇒ hai đèn LED sáng luân phiên' + (lit === 'D1' ? ' (Đ₁ sáng).' : lit === 'D2' ? ' (Đ₂ sáng).' : '.'), 'The magnet turns: the field lines through the coil alternately rise and fall ⇒ the two LEDs light alternately' + (lit === 'D1' ? ' (D₁ lit).' : lit === 'D2' ? ' (D₂ lit).' : '.'));
      q('warn').hidden = !(S.auto && !S.paused && ((gen && S.f >= 2 && S.f <= 15) || (!gen && S.f > 2)));
      $('[data-k="f"]', lab).value = S.f; $('[data-out="f"]', lab).textContent = fmt(S.f, 1);
      return S.auto || true;
    }
    let lastT = 0;
    const lp = loop(lab, (dt) => { if (S.auto) { S.th += 2 * Math.PI * S.f * dt; } if (gen) { if (S.auto) S.t += dt; } else S.t += S.auto ? dt : 0; render(); return S.auto; });
    makeDrag(svg, {
      rot: { move(x, y) { const cx = gen ? 150 : 220, cy = gen ? 130 : 120; let a = Math.atan2(y - cy, x - cx); const d0 = S.th; if (gen && !S.magRot) a = Math.acos(clamp((x - cx) / 46, -1, 1)) * (y < cy + 1 ? 1 : 1); const dTh = ((a - d0 + Math.PI * 3) % (2 * Math.PI)) - Math.PI; S.th = d0 + dTh; if (gen) S.t += Math.abs(dTh) / (2 * Math.PI * S.f); render(); }, key(dir, sh) { const d = dir * (sh ? 25 : 5) * Math.PI / 180; S.th += d; if (gen) S.t += Math.abs(d) / (2 * Math.PI * S.f); render(); } },
      cur: { move(x) { if (!S._gx) return; S.cursor = clamp(S._gx.t0 + (x - S._gx.X0) / S._gx.gw * S._gx.win, S._gx.t0, S._gx.t0 + S._gx.win); render(); }, key(dir, sh) { const T = 1 / S.f; S.cursor = clamp((S.cursor == null ? S.t : S.cursor) + dir * T / (sh ? 20 : 100), S._gx.t0, S._gx.t0 + S._gx.win); render(); } }
    });
    lab.addEventListener('input', (e) => { const k = e.target.dataset && e.target.dataset.k; if (!k) return; if (k === 'ampF') S.ampF = e.target.checked; else { S.f = +e.target.value; S.hist = []; } render(); });
    lab.addEventListener('click', (e) => {
      const a = e.target.closest('[data-act]'); if (!a) return; const k = a.dataset.act;
      if (k === 'auto') { S.auto = !S.auto; a.setAttribute('aria-pressed', S.auto); a.innerHTML = pr(S.auto ? 'Dừng quay' : 'Quay tự động', S.auto ? 'Stop' : 'Auto rotate'); S.cursor = null; }
      else if (k === 'mag') { S.magRot = !S.magRot; a.setAttribute('aria-pressed', S.magRot); }
      else if (k === 'pause') { S.paused = !S.paused; a.setAttribute('aria-pressed', S.paused); if (S.paused) S.auto = false; const au = $('[data-act="auto"]', lab); au.setAttribute('aria-pressed', S.auto); au.innerHTML = pr('Quay tự động', 'Auto rotate'); }
      else if (k === 'reset') { Object.assign(S, { th: 0, f: gen ? 1 : 0.5, auto: false, t: 0, cursor: null, magRot: false, paused: false, ampF: false }); $$('[data-act]', lab).forEach((b) => b.setAttribute('aria-pressed', 'false')); const au = $('[data-act="auto"]', lab); au.innerHTML = pr('Quay tự động', 'Auto rotate'); }
      lp.kick(); render();
    });
    render(); return { state: S, render };
  }

  /* ------------------------------------------------------------------ W14.4: BÓP CUỘN DÂY (ĐỔI TIẾT DIỆN) */
  function squeezeLab(body) {
    const id = 'es' + (++uid), S = { ry: 50, N: 200, R: 10, needle: 0, rows: [] }, ind = Induction(200, 10);
    body.innerHTML = '<div class="olab em" data-lab="' + id + '"><p class="olab__hint">' + pr('Nam châm đứng yên. Kéo núm ở đỉnh cuộn dây để bóp hoặc thả (đổi tiết diện S): kim điện kế chỉ lệch khi S ĐANG thay đổi, về 0 khi S dừng.', 'The magnet stays still. Drag the knob on top of the coil to squeeze or release it (changing the cross-section S): the galvanometer deflects only WHILE S is changing, and returns to 0 when S stops.') + '</p>' +
      '<div class="olab__cols"><div class="olab__stage"><svg class="olab__svg em__svg" viewBox="0 0 560 300" role="group" aria-label="Cuộn dây mềm bị bóp / A flexible coil being squeezed"><rect width="560" height="300" class="cl__bg"/>' +
      '<g transform="translate(60,100)"><rect x="0" y="-14" width="70" height="28" class="em__S"/><rect x="70" y="-14" width="70" height="28" class="em__N"/><text x="35" y="5" class="em__pole" text-anchor="middle">S</text><text x="105" y="5" class="em__pole" text-anchor="middle">N</text></g>' +
      '<g data-r="fl"></g><g data-r="coil"></g><g data-r="gal">' + galvSVG(420, 250, 62) + '</g><path data-r="w" class="cl__wire" fill="none"/>' +
      '<g data-h="ry" data-r="oh" tabindex="0" role="slider" aria-label="Bóp cuộn dây, nửa chiều cao (mũi tên) / Squeeze the coil, half height (arrows)" class="olab__hd olab__hd--src"><circle r="32" class="olab__hit"/><circle r="9" class="olab__dot"/></g></svg></div>' +
      '<div class="olab__panel"><label class="olab__ctl"><span>N = <output data-out="N"></output></span><input type="range" data-k="N" min="50" max="1000" step="50"></label><div class="olab__read" data-r="read" aria-live="polite"></div></div></div><p class="olab__status" data-r="status" role="status"></p></div>';
    const lab = $('[data-lab="' + id + '"]', body), svg = $('.olab__svg', lab), q = (n) => $('[data-r="' + n + '"]', lab);
    let last = nowS(), moved = 0;
    const phi = () => 0.05 * S.ry * 20;                              // Φ = B·S, S ∝ chiều cao (đv tương đối)
    function sample() { ind.N = S.N; const t = nowS(); ind.push(t, phi() * 0.02); moved = t; }
    function render() {
      const t = nowS(); const S0 = S.ry / 50;
      let f = ''; for (let k = -2; k <= 2; k++) f += '<line x1="200" y1="' + (100 + k * 16) + '" x2="520" y2="' + (100 + k * 16) + '" class="em__fl" opacity=".55"/>'; q('fl').innerHTML = f;
      q('coil').innerHTML = loopsSVG(360, 100, 18, S.ry, 3 + Math.round(S.N / 300)) + '<text x="360" y="' + (100 + S.ry + 16) + '" class="cl__lab" text-anchor="middle">S ∝ ' + fmt(S0, 2) + '</text>';
      q('w').setAttribute('d', 'M360 ' + (100 + S.ry) + ' V 200 H 300 V 240 H 358 M360 ' + (100 - S.ry) + ' V 40 H 500 V 240 H 482');
      setA(q('oh'), { transform: 'translate(360,' + (100 - S.ry) + ')', 'aria-valuenow': S.ry });
      const dd = ind.deflect(t); S.needle += (dd - S.needle) * 0.35; needleTo(q('gal'), S.needle); const i = ind.current(t);
      q('read').innerHTML = '<table class="olab__tbl olab__tbl--read"><tbody><tr><th scope="row">S</th><td>' + fmt(S0, 2) + ' (đv/units)</td></tr><tr><th scope="row">i (mA)</th><td>' + fmt(i * 0.1, 1) + '</td></tr></tbody></table>';
      const mv = t - moved < WIN; q('status').innerHTML = mv ? pr('Tiết diện cuộn dây đang thay đổi ⇒ số đường sức xuyên qua biến thiên ⇒ có dòng điện cảm ứng (kim lệch).', 'The coil cross-section is changing ⇒ the number of field lines through it changes ⇒ an induced current (the needle moves).') : pr('Tiết diện không đổi ⇒ số đường sức không đổi ⇒ kim về 0.', 'The cross-section is steady ⇒ the number of field lines is steady ⇒ needle at 0.');
      $('[data-k="N"]', lab).value = S.N; $('[data-out="N"]', lab).textContent = S.N;
      return mv || Math.abs(S.needle) > 0.004 || Math.abs(dd) > 0.004;
    }
    const lp = loop(lab, () => { sample(); return render(); });
    const mv = (y) => { S.ry = clamp(Math.round(100 - y), 15, 75); sample(); lp.kick(); };
    makeDrag(svg, { ry: { move(x, y) { mv(y); }, key(dir, sh) { S.ry = clamp(S.ry + dir * (sh ? 10 : 2) * 1, 15, 75); sample(); lp.kick(); render(); } } });
    lab.addEventListener('input', (e) => { if (e.target.dataset && e.target.dataset.k === 'N') { S.N = +e.target.value; render(); lp.kick(); } });
    sample(); render(); return { state: S };
  }

  /* ------------------------------------------------------------------ W14.5: ĐIỀU KIỆN XUẤT HIỆN DÒNG ĐIỆN CẢM ỨNG */
  function conditionsLab(body) {
    const id = 'ec' + (++uid), CASES = [
      ['Nam châm đứng yên gần cuộn dây kín', 'A magnet at rest near a closed coil', false, 'Không có biến thiên số đường sức.', 'No change in field lines.'],
      ['Nam châm lại gần cuộn dây kín', 'A magnet moving towards a closed coil', true, 'Số đường sức xuyên qua cuộn dây tăng.', 'Field lines through the coil increase.'],
      ['Nam châm lại gần cuộn dây HỞ', 'A magnet moving towards an OPEN coil', false, 'Mạch hở nên không có dòng điện (dù số đường sức vẫn biến thiên).', 'The circuit is open, so no current flows (even though the number of lines changes).'],
      ['Cuộn dây kín quay trong từ trường đều', 'A closed coil rotating in a uniform field', true, 'Số đường sức qua tiết diện tăng, giảm luân phiên.', 'Field lines through the coil alternately rise and fall.'],
      ['Cuộn dây kín tịnh tiến trong từ trường đều, vẫn vuông góc đường sức', 'A closed coil translating inside a uniform field, staying square to the lines', false, 'Số đường sức qua cuộn dây không đổi.', 'The number of lines through the coil does not change.'],
      ['Bóp cuộn dây kín làm giảm tiết diện (nam châm đứng yên)', 'Squeezing a closed coil to reduce its area (magnet at rest)', true, 'Tiết diện giảm ⇒ số đường sức giảm.', 'Area decreases ⇒ field lines decrease.'],
      ['Nam châm điện: dòng điện đang tăng, cuộn dây kín gần đó', 'Electromagnet with rising current, closed coil nearby', true, 'Từ trường mạnh lên ⇒ số đường sức tăng.', 'The field grows ⇒ lines increase.'],
      ['Nam châm điện: dòng điện không đổi, cuộn dây kín gần đó', 'Electromagnet with steady current, closed coil nearby', false, 'Từ trường không đổi ⇒ số đường sức không đổi.', 'Steady field ⇒ steady lines.']
    ];
    const S = { sel: [], ans: {}, score: 0 };
    body.innerHTML = '<div class="olab em" data-lab="' + id + '"><p class="olab__hint">' + pr('Với mỗi tình huống, dự đoán kim điện kế có lệch hay không, rồi bấm “Chạy” để kiểm tra. Chốt điều kiện: mạch KÍN và số đường sức BIẾN THIÊN.', 'For each situation predict whether the galvanometer deflects, then press “Run” to check. The rule: the circuit must be CLOSED and the number of field lines must CHANGE.') + '</p><div data-r="list"></div><p class="olab__status" data-r="status" role="status"></p></div>';
    const lab = $('[data-lab="' + id + '"]', body), q = (n) => $('[data-r="' + n + '"]', lab);
    function render() {
      q('list').innerHTML = '<table class="olab__tbl"><thead><tr><th>#</th><th>' + pr('Tình huống', 'Situation') + '</th><th>' + pr('Dự đoán', 'Prediction') + '</th><th></th><th>' + pr('Kết quả', 'Result') + '</th></tr></thead><tbody>' + CASES.map((c, i) => { const a = S.ans[i]; const res = a ? '<b>' + (c[2] ? pr('Kim lệch', 'Deflects') : pr('Kim ở 0', 'Stays at 0')) + '</b> ' + (a.pred === c[2] ? '✔' : '✘') + '<br><small>' + pr(c[3], c[4]) + '</small>' : '–'; return '<tr><td>' + (i + 1) + '</td><td>' + pr(c[0], c[1]) + '</td><td><label><input type="radio" name="' + id + 'r' + i + '" data-i="' + i + '" value="1"' + (S.sel[i] === true ? ' checked' : '') + '> ' + pr('lệch', 'moves') + '</label> <label><input type="radio" name="' + id + 'r' + i + '" data-i="' + i + '" value="0"' + (S.sel[i] === false ? ' checked' : '') + '> ' + pr('về 0', 'zero') + '</label></td><td><button type="button" class="btn btn--sm" data-run="' + i + '">' + pr('Chạy', 'Run') + '</button></td><td>' + res + '</td></tr>'; }).join('') + '</tbody></table>';
      const done = Object.keys(S.ans).length, right = Object.values(S.ans).filter((a) => a.pred === a.truth).length;
      q('status').innerHTML = done ? pr('Đúng ' + right + '/' + done + '. Điều kiện có dòng điện cảm ứng: cuộn dây dẫn KÍN và số đường sức từ xuyên qua tiết diện BIẾN THIÊN.', 'Right ' + right + '/' + done + '. Condition for an induced current: a CLOSED coil and a CHANGING number of field lines through it.') : '';
    }
    lab.addEventListener('change', (e) => { const i = e.target.dataset && e.target.dataset.i; if (i != null) S.sel[+i] = e.target.value === '1'; });
    lab.addEventListener('click', (e) => { const b = e.target.closest('[data-run]'); if (!b) return; const i = +b.dataset.run; if (S.sel[i] == null) { q('status').innerHTML = pr('Hãy chọn dự đoán trước khi chạy.', 'Pick a prediction first.'); return; } S.ans[i] = { pred: S.sel[i], truth: CASES[i][2] }; render(); });
    render(); return { state: S, CASES };
  }

  /* ------------------------------------------------------------------ W14.7: ĐỌC ĐỒ THỊ DÒNG ĐIỆN XOAY CHIỀU ----- */
  function graphLab(body) {
    const id = 'eg' + (++uid), VARS = [{ A: 1, T: 20 }, { A: 1, T: 40 }, { A: 0.5, T: 20 }, { A: 2, T: 10 }];
    const S = { v: 0, cur: 5, task: 'zero', msg: '' }, CUR = 0;
    body.innerHTML = '<div class="olab em" data-lab="' + id + '"><p class="olab__hint">' + pr('Kéo con trỏ đỏ dọc trục thời gian để đọc i. Làm lần lượt các nhiệm vụ rồi bấm “Kiểm tra”. Đồ thị đầu tiên chính là Hình 14.7.', 'Drag the red cursor along the time axis to read i. Do the tasks in turn and press “Check”. The first graph is Figure 14.7.') + '</p>' +
      '<div class="olab__btns" data-r="vars"></div><div class="olab__cols"><div class="olab__stage"><svg class="olab__svg em__svg" viewBox="0 0 560 300" role="group" aria-label="Đồ thị i theo t / Graph of i against t"><g data-r="g"></g><g data-h="cur" data-r="ch" tabindex="0" role="slider" aria-label="Con trỏ thời gian (mũi tên ±1 ms) / Time cursor (arrows ±1 ms)" class="olab__hd olab__hd--src"><circle r="32" class="olab__hit"/><circle r="9" class="olab__dot"/></g></svg></div>' +
      '<div class="olab__panel"><div data-r="read" class="olab__read" aria-live="polite"></div><label class="olab__ctl"><span>' + pr('Nhiệm vụ', 'Task') + '</span><select data-r="task" class="olab__sel"><option value="zero">' + 'Tìm một thời điểm i = 0 (t > 0) / Find a time with i = 0 (t > 0)' + '</option><option value="max">' + 'Tìm thời điểm i cực đại đầu tiên / First time i is maximum' + '</option><option value="period">' + 'Chu kì T (ms) / Period T (ms)' + '</option><option value="freq">' + 'Tần số f (Hz) / Frequency f (Hz)' + '</option><option value="rev">' + 'Số lần đổi chiều trong 1 s / Reversals per second' + '</option></select></label><label>' + pr('Đáp số', 'Answer') + ' <input type="text" inputmode="decimal" data-r="ans" size="7" aria-label="Đáp số / answer"></label> <button type="button" class="btn btn--sm" data-act="chk">' + pr('Kiểm tra', 'Check') + '</button></div></div><p class="olab__status" data-r="status" role="status"></p></div>';
    const lab = $('[data-lab="' + id + '"]', body), svg = $('.olab__svg', lab), q = (n) => $('[data-r="' + n + '"]', lab);
    q('vars').innerHTML = VARS.map((v, i) => '<button type="button" class="btn btn--sm" data-v="' + i + '" aria-pressed="' + (i === 0) + '">' + pr('Đồ thị ' + (i + 1) + (i === 0 ? ' (Hình 14.7)' : ''), 'Graph ' + (i + 1) + (i === 0 ? ' (Fig. 14.7)' : '')) + '</button>').join('');
    const gx0 = 70, gw = 450, gy0 = 150, gh = 110;
    function render() {
      const V = VARS[S.v], tMax = V.T * 1.5, X = (t) => gx0 + t / tMax * gw, Y = (a) => gy0 - a / (V.A * 1.2) * gh;
      let h = '<rect width="560" height="300" class="cl__bg"/>';
      for (let k = 0; k <= 6; k++) { const t = tMax * k / 6; h += '<line x1="' + X(t) + '" y1="20" x2="' + X(t) + '" y2="285" stroke="var(--line)"/>'; }
      [-1, -0.5, 0, 0.5, 1].forEach((m) => { const a = m * V.A; h += '<line x1="' + gx0 + '" y1="' + Y(a) + '" x2="530" y2="' + Y(a) + '" stroke="var(--line)"/><text x="' + (gx0 - 6) + '" y="' + (Y(a) + 4) + '" class="cl__num" text-anchor="end">' + fmt(a, 1) + '</text>'; });
      h += '<path d="M' + gx0 + ' 20 V285 M' + gx0 + ' ' + Y(0) + ' H 535" class="cl__axis"/><text x="' + (gx0 + 6) + '" y="16" class="cl__num">i (A)</text><text x="500" y="' + (Y(0) - 8) + '" class="cl__num">t (×10⁻³ s)</text>';
      for (let k = 0; k <= 6; k++) { const t = tMax * k / 6; h += '<text x="' + X(t) + '" y="' + (Y(0) + 16) + '" class="cl__num" text-anchor="middle">' + fmt(t, t % 1 ? 1 : 0) + '</text>'; }
      let d = ''; for (let k = 0; k <= 180; k++) { const t = tMax * k / 180; d += (k ? 'L' : 'M') + X(t).toFixed(1) + ' ' + Y(V.A * Math.sin(2 * Math.PI * t / V.T)).toFixed(1); }
      const iv = V.A * Math.sin(2 * Math.PI * S.cur / V.T);
      h += '<path d="' + d + '" fill="none" stroke="var(--pen)" stroke-width="2.8"/><line x1="' + X(S.cur) + '" y1="20" x2="' + X(S.cur) + '" y2="285" stroke="var(--red)" stroke-dasharray="4 3"/>';
      q('g').innerHTML = h; setA(q('ch'), { transform: 'translate(' + X(S.cur) + ',' + Y(iv) + ')', 'aria-valuenow': S.cur });
      q('read').innerHTML = '<table class="olab__tbl olab__tbl--read"><tbody><tr><th scope="row">t</th><td>' + fmt(S.cur, 1) + ' ms</td></tr><tr><th scope="row">i</th><td>' + fmt(iv, 2) + ' A</td></tr></tbody></table>';
      $$('[data-v]', lab).forEach((b) => b.setAttribute('aria-pressed', +b.dataset.v === S.v));
      q('status').innerHTML = S.msg ? pr(S.msg[0], S.msg[1]) : ''; q('status').classList.toggle('olab__status--ok', S.msg && S.msg[2] === 'ok'); q('status').classList.toggle('olab__status--warn', S.msg && S.msg[2] === 'bad');
      S._X = { gx0, gw, tMax };
    }
    const redraw = raf(render);
    makeDrag(svg, { cur: { move(x) { S.cur = clamp(Math.round((x - gx0) / gw * VARS[S.v].T * 1.5 * 2) / 2, 0, VARS[S.v].T * 1.5); S.msg = ''; redraw(); }, key(dir, sh) { S.cur = clamp(S.cur + dir * (sh ? 5 : 1), 0, VARS[S.v].T * 1.5); redraw(); } } });
    lab.addEventListener('click', (e) => {
      const b = e.target.closest('[data-v]'); if (b) { S.v = +b.dataset.v; S.cur = 5; S.msg = ''; render(); return; }
      if (!e.target.closest('[data-act="chk"]')) return; const V = VARS[S.v], k = q('task').value, T = V.T, f = 1000 / T; let ok = false, ans = parseFloat((q('ans').value || '').replace(',', '.'));
      const iv = V.A * Math.sin(2 * Math.PI * S.cur / T);
      if (k === 'zero') { ok = S.cur > 0 && Math.abs(iv) < 0.03 * V.A; S.msg = ok ? ['Đúng! Tại t = ' + fmt(S.cur, 1) + ' ms dòng điện bằng 0 và đổi chiều: các thời điểm i = 0 cách nhau T/2 = ' + fmt(T / 2, 0) + ' ms.', 'Correct! At t = ' + fmt(S.cur, 1) + ' ms the current is 0 and reverses: zeros are T/2 = ' + fmt(T / 2, 0) + ' ms apart.', 'ok'] : ['Chưa đúng: kéo con trỏ tới chỗ đồ thị cắt trục thời gian (i = 0), cách gốc một nửa chu kì.', 'Not yet: drag the cursor to where the graph crosses the time axis (i = 0), half a period from the origin.', 'bad']; }
      else if (k === 'max') { ok = Math.abs(S.cur - T / 4) <= 0.6; S.msg = ok ? ['Đúng! i cực đại ' + fmt(V.A, 1) + ' A tại t = T/4 = ' + fmt(T / 4, 1) + ' ms.', 'Correct! i is maximum ' + fmt(V.A, 1) + ' A at t = T/4 = ' + fmt(T / 4, 1) + ' ms.', 'ok'] : ['Chưa đúng: kéo con trỏ tới đỉnh đầu tiên của đồ thị.', 'Not yet: drag the cursor to the first peak.', 'bad']; }
      else { const want = k === 'period' ? T : k === 'freq' ? f : 2 * f; ok = isFinite(ans) && Math.abs(ans - want) <= want * 0.02; S.msg = ok ? ['Đúng! ' + (k === 'period' ? 'T = ' + fmt(T, 0) + ' ms' : k === 'freq' ? 'f = 1/T = 1000/' + fmt(T, 0) + ' = ' + fmt(f, 0) + ' Hz' : 'số lần đổi chiều = 2f = ' + fmt(2 * f, 0) + ' lần/s') + '.', 'Correct! ' + (k === 'period' ? 'T = ' + fmt(T, 0) + ' ms' : k === 'freq' ? 'f = 1/T = ' + fmt(f, 0) + ' Hz' : 'reversals = 2f = ' + fmt(2 * f, 0) + ' per second') + '.', 'ok'] : ['Chưa đúng. Chu kì là thời gian một dao động đầy đủ (từ 0 lên cực đại, xuống cực tiểu rồi về 0); f = 1/T; mỗi chu kì đổi chiều 2 lần.', 'Not yet. The period is one complete cycle; f = 1/T; the current reverses twice per cycle.', 'bad']; }
      render();
    });
    render(); return { state: S, VARS };
  }

  window.LabSims = Object.assign(window.LabSims || {}, {
    'em-magnet': { fn: magnetLab, vi: 'Nam châm và cuộn dây (Hình 14.1, 14.2)', en: 'Magnet and coil (Figures 14.1, 14.2)', intro: 'Kéo nam châm lại gần, ra xa cuộn dây; đổi cực; xem số đường sức và kim điện kế.' },
    'em-electro': { fn: electroLab, vi: 'Nam châm điện và cuộn dây (Hình 14.3)', en: 'Electromagnet and coil (Figure 14.3)', intro: 'Đóng, mở công tắc hoặc đổi dòng điện: kim chỉ lệch khi dòng đang thay đổi.' },
    'em-rotmagnet': { fn: (b) => rotLab(b, 'magnet'), vi: 'Nam châm quay và hai đèn LED (Hình 14.4, 14.5)', en: 'A rotating magnet and two LEDs (Figures 14.4, 14.5)', intro: 'Quay nam châm: hai đèn LED ngược cực sáng luân phiên.' },
    'em-squeeze': { fn: squeezeLab, vi: 'Thay đổi tiết diện cuộn dây (Hình 14.6)', en: 'Changing the coil’s cross-section (Figure 14.6)', intro: 'Bóp hoặc thả cuộn dây mềm: kim lệch khi tiết diện đang thay đổi.' },
    'em-conditions': { fn: conditionsLab, vi: 'Điều kiện xuất hiện dòng điện cảm ứng', en: 'When does an induced current appear?', intro: 'Dự đoán rồi kiểm tra từng tình huống.' },
    'em-generator': { fn: (b) => rotLab(b, 'gen'), vi: 'Máy phát điện xoay chiều mô hình (Hình 14.8, 14.9) và đồ thị (Hình 14.7)', en: 'Model AC generator (Figures 14.8, 14.9) and graph (Figure 14.7)', intro: 'Quay khung dây, xem đồ thị i–t vẽ theo thời gian thực.' },
    'em-graph': { fn: graphLab, vi: 'Đọc đồ thị dòng điện xoay chiều (Hình 14.7)', en: 'Reading the alternating-current graph (Figure 14.7)', intro: 'Kéo con trỏ để đọc i, T, f và số lần đổi chiều.' }
  });
  window.EmLab = { engine: E, loop, galvSVG, needleTo, loopsSVG, magnetSVG };
})();
