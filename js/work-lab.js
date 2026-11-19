/* ==========================================================================
   WORK LAB — mô phỏng công và công suất (KHTN 9, Bài 4): W4.1 (Hình 4.3) và W4.2 (Hình 4.4)
   Dùng lại makeDrag / fmt / pr của optics-lab.js; đăng ký vào window.WorkSims (interactive.js gộp vào SIMS).
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab; if (!L) return;
  const { makeDrag, fmt, pr, raf, clamp } = L;
  const D2R = Math.PI / 180, $ = (s, r) => r.querySelector(s);
  let uid = 0;
  const setA = (el, o) => { for (const k in o) el.setAttribute(k, o[k]); };
  const arrowPts = (x1, y1, x2, y2, h) => { const a = Math.atan2(y2 - y1, x2 - x1); const q = (d) => (x2 - h * Math.cos(a + d)).toFixed(1) + ',' + (y2 - h * Math.sin(a + d)).toFixed(1); return x2.toFixed(1) + ',' + y2.toFixed(1) + ' ' + q(.45) + ' ' + q(-.45); };

  /* công thuần dữ liệu (có thử nghiệm ở workSelfTest) */
  const work = (F, s, alphaDeg) => F * s * Math.cos(alphaDeg * D2R);
  const power = (A, t) => A / t;
  window.workSelfTest = () => [
    ['700 N × 2 m = 1 400 J', Math.abs(work(700, 2, 0) - 1400) < 1e-9],
    ['α = 90° → A = 0', Math.abs(work(50, 4, 90)) < 1e-9],
    ['xe nâng 1: 500 J / 10 s = 50 W', Math.abs(power(work(500, 1, 0), 10) - 50) < 1e-9],
    ['xe nâng 2: 700 J / 15 s ≈ 46,7 W', Math.abs(power(work(700, 1, 0), 15) - 46.6667) < 1e-3]
  ].map((r) => ({ name: r[0], ok: r[1] }));

  function simForce(body) {
    const id = 'ow' + (++uid), X0 = 90, PX = 40, GY = 190;      // 40 px = 1 m
    const S = { F: 60, a: 30, s: 5 };
    body.innerHTML = '<div class="olab" data-lab="' + id + '"><p class="olab__hint">' + pr('Kéo mũi tên đỏ để đổi lực F và góc α; kéo xe (ô vuông xanh) để đổi quãng đường s. Bàn phím: chọn tay nắm rồi dùng mũi tên.', 'Drag the red arrow head to change the force F and the angle α; drag the cart (blue square) to change the distance s. Keyboard: focus a handle and use the arrow keys.') + '</p>' +
      '<div class="olab__cols"><div class="olab__stage"><svg class="olab__svg" viewBox="0 0 480 240" role="group" aria-label="Lực F hợp với hướng dịch chuyển góc α">' +
      '<line x1="20" y1="' + GY + '" x2="470" y2="' + GY + '" class="olab__interface"/><line data-r="trk" y1="' + (GY + 14) + '" y2="' + (GY + 14) + '" stroke="var(--pen)" stroke-width="3"/><text data-r="sT" class="olab__lab" y="' + (GY + 32) + '" text-anchor="middle">s</text>' +
      '<g data-r="cart"><rect x="-34" y="-34" width="68" height="34" rx="5" class="olab__medB" style="fill-opacity:.5"/><circle cx="-18" cy="0" r="7" fill="#fff" stroke="var(--ink)" stroke-width="2"/><circle cx="18" cy="0" r="7" fill="#fff" stroke="var(--ink)" stroke-width="2"/></g>' +
      '<line data-r="proj" class="olab__ray olab__ray--refr" stroke-dasharray="4 3"/><line data-r="F" class="olab__ray olab__ray--inc"/><polygon data-r="FH" class="olab__head olab__head--inc"/><path data-r="arc" fill="none" stroke="var(--ink)" stroke-width="2"/><text data-r="aT" class="olab__lab" text-anchor="middle">α</text>' +
      '<g data-h="F" data-r="Fh" tabindex="0" role="slider" aria-label="Lực F và góc α / Force F and angle α" class="olab__hd olab__hd--src"><circle r="32" class="olab__hit"/><circle r="10" class="olab__dot"/></g>' +
      '<g data-h="cart" data-r="ch" tabindex="0" role="slider" aria-label="Xe, quãng đường s / Cart, distance s" aria-valuemin="0" aria-valuemax="10" class="olab__hd olab__hd--rot"><circle r="32" class="olab__hit"/><rect x="-9" y="-9" width="18" height="18" rx="4" class="olab__sq"/></g></svg></div>' +
      '<div class="olab__panel"><label class="olab__ctl"><span>F = <output data-out="F"></output> N</span><input type="range" data-k="F" min="0" max="100" step="1"></label>' +
      '<label class="olab__ctl"><span>α = <output data-out="a"></output>°</span><input type="range" data-k="a" min="0" max="90" step="1"></label>' +
      '<label class="olab__ctl"><span>s = <output data-out="s"></output> m</span><input type="range" data-k="s" min="0" max="10" step="0.1"></label>' +
      '<div class="olab__btns"><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button></div><div class="olab__read" data-read aria-live="polite"></div></div></div></div>';
    const lab = body.querySelector('[data-lab="' + id + '"]'), svg = $('.olab__svg', lab), q = (n) => $('[data-r="' + n + '"]', svg);
    function draw() {
      const cx = X0 + S.s * PX, cy = GY - 17, tipLen = 20 + S.F * 1.4, ar = S.a * D2R, tx = cx + tipLen * Math.cos(ar), ty = cy - tipLen * Math.sin(ar);
      setA(q('cart'), { transform: 'translate(' + cx + ',' + GY + ')' }); setA(q('ch'), { transform: 'translate(' + cx + ',' + (GY + 14) + ')', 'aria-valuenow': S.s.toFixed(1) });
      setA(q('trk'), { x1: X0, x2: cx }); setA(q('sT'), { x: (X0 + cx) / 2 }); q('sT').textContent = 's = ' + fmt(S.s, 1) + ' m';
      setA(q('F'), { x1: cx, y1: cy, x2: tx, y2: ty }); setA(q('FH'), { points: arrowPts(cx, cy, tx, ty, 12) }); setA(q('Fh'), { transform: 'translate(' + tx + ',' + ty + ')', 'aria-valuenow': S.F, 'aria-valuetext': 'F = ' + S.F + ' N, α = ' + S.a + '°' });
      setA(q('proj'), { x1: cx, y1: cy, x2: tx, y2: cy });
      const r = 38, ax = cx + r * Math.cos(ar), ay = cy - r * Math.sin(ar); setA(q('arc'), { d: 'M' + (cx + r) + ' ' + cy + ' A' + r + ' ' + r + ' 0 0 0 ' + ax.toFixed(1) + ' ' + ay.toFixed(1) }); setA(q('aT'), { x: cx + 56 * Math.cos(ar / 2), y: cy - 56 * Math.sin(ar / 2) + 5 });
      const A = work(S.F, S.s, S.a);
      $('[data-read]', lab).innerHTML = '<table class="olab__tbl olab__tbl--read"><tbody><tr><th scope="row">F·cosα</th><td>' + fmt(S.F * Math.cos(ar), 1) + ' N</td></tr><tr><th scope="row">A = F·s·cosα</th><td><b>' + fmt(A, 1) + ' J</b></td></tr></tbody></table><p class="olab__status">' + (S.a >= 89.5 ? pr('α = 90°: lực vuông góc với hướng dịch chuyển nên công bằng 0.', 'α = 90°: the force is perpendicular to the motion, so the work is zero.') : S.a === 0 ? pr('α = 0°: A = F·s (lực cùng hướng dịch chuyển).', 'α = 0°: A = F·s (force along the motion).') : pr('Chỉ thành phần F·cosα cùng hướng dịch chuyển mới sinh công.', 'Only the component F·cosα along the motion does work.')) + '</p>';
      ['F', 'a', 's'].forEach((k) => { $('[data-k="' + k + '"]', lab).value = S[k]; $('[data-out="' + k + '"]', lab).textContent = k === 's' ? fmt(S[k], 1) : S[k]; });
    }
    const redraw = raf(draw);
    makeDrag(svg, {
      F: { move(x, y) { const cx = X0 + S.s * PX, cy = GY - 17, dx = x - cx, dy = cy - y; S.a = clamp(Math.round(Math.atan2(dy, Math.max(dx, 0.001)) / D2R), 0, 90); S.F = clamp(Math.round((Math.hypot(dx, dy) - 20) / 1.4), 0, 100); redraw(); },
        key(d, sh, ax) { if (ax === 'y') S.a = clamp(S.a + d, 0, 90); else S.F = clamp(S.F + d, 0, 100); redraw(); } },
      cart: { move(x) { S.s = clamp(Math.round((x - X0) / PX * 10) / 10, 0, 10); redraw(); }, key(d) { S.s = clamp(+(S.s + d * 0.1).toFixed(1), 0, 10); redraw(); } }
    });
    lab.addEventListener('input', (e) => { const k = e.target.dataset && e.target.dataset.k; if (k) { S[k] = +e.target.value; draw(); } });
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-act="reset"]')) { Object.assign(S, { F: 60, a: 30, s: 5 }); draw(); } });
    draw(); return { state: S };
  }

  function simForklifts(body) {
    const id = 'ow' + (++uid), S = { w1: 500, t1: 10, w2: 700, t2: 15, h: 1 };
    body.innerHTML = '<div class="olab" data-lab="' + id + '"><p class="olab__hint">' + pr('Đổi trọng lượng thùng hàng, độ cao nâng và thời gian của hai xe nâng (Hình 4.4) để so sánh công và công suất.', 'Change the weight of each crate, the lifting height and each forklift’s time (Figure 4.4) to compare work and power.') + '</p><div class="olab__panel">' +
      ['w1:Trọng lượng thùng 1 (N):Weight of crate 1 (N):100:1000:10', 't1:Thời gian xe 1 (s):Time of forklift 1 (s):2:30:1', 'w2:Trọng lượng thùng 2 (N):Weight of crate 2 (N):100:1000:10', 't2:Thời gian xe 2 (s):Time of forklift 2 (s):2:30:1', 'h:Độ cao nâng h (m):Lifting height h (m):0.5:3:0.1'].map((s) => { const p = s.split(':'); return '<label class="olab__ctl"><span>' + pr(p[1], p[2]) + ' = <output data-out="' + p[0] + '"></output></span><input type="range" data-k="' + p[0] + '" min="' + p[3] + '" max="' + p[4] + '" step="' + p[5] + '"></label>'; }).join('') +
      '<div class="olab__btns"><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button></div><div class="olab__read" data-read aria-live="polite"></div></div></div>';
    const lab = body.querySelector('[data-lab="' + id + '"]');
    function draw() {
      const A1 = work(S.w1, S.h, 0), A2 = work(S.w2, S.h, 0), P1 = power(A1, S.t1), P2 = power(A2, S.t2), mx = Math.max(P1, P2, 1e-9), bar = (v, c) => '<span class="sim__bar sim__bar--' + c + '" style="display:block;height:12px;width:' + (v / mx * 100).toFixed(0) + '%;background:var(--' + (c === 'k' ? 'pen' : 'teal') + ')"></span>';
      ['w1', 't1', 'w2', 't2', 'h'].forEach((k) => { $('[data-k="' + k + '"]', lab).value = S[k]; $('[data-out="' + k + '"]', lab).textContent = fmt(S[k], k === 'h' ? 1 : 0); });
      $('[data-read]', lab).innerHTML = '<table class="olab__tbl olab__tbl--read"><thead><tr><th></th><th>' + pr('Xe nâng 1', 'Forklift 1') + '</th><th>' + pr('Xe nâng 2', 'Forklift 2') + '</th></tr></thead><tbody>' +
        '<tr><th scope="row">A = F·s</th><td>' + fmt(A1, 0) + ' J</td><td>' + fmt(A2, 0) + ' J</td></tr>' +
        '<tr><th scope="row">𝒫 = A / t</th><td><b>' + fmt(P1, 1) + ' W</b></td><td><b>' + fmt(P2, 1) + ' W</b></td></tr>' +
        '<tr><th scope="row">' + pr('Công mỗi giây', 'Work per second') + '</th><td>' + bar(P1, 'k') + '</td><td>' + bar(P2, 'p') + '</td></tr></tbody></table><p class="olab__status">' +
        (Math.abs(P1 - P2) < 0.05 ? pr('Hai xe có công suất bằng nhau.', 'The two forklifts have equal power.') : P1 > P2 ? pr('Xe nâng 1 có công suất lớn hơn: thực hiện công nhanh hơn.', 'Forklift 1 has more power: it does work faster.') : pr('Xe nâng 2 có công suất lớn hơn: thực hiện công nhanh hơn.', 'Forklift 2 has more power: it does work faster.')) + '</p>';
    }
    lab.addEventListener('input', (e) => { const k = e.target.dataset && e.target.dataset.k; if (k) { S[k] = +e.target.value; draw(); } });
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-act="reset"]')) { Object.assign(S, { w1: 500, t1: 10, w2: 700, t2: 15, h: 1 }); draw(); } });
    draw(); return { state: S };
  }

  window.WorkSims = {
    'work-force': { fn: simForce, vi: 'Công và góc α (Hình 4.3)', en: 'Work and the angle α (Figure 4.3)', intro: 'Kéo đầu mũi tên lực để đổi F và α, kéo xe để đổi s; công A = F·s·cosα cập nhật ngay.' },
    'work-forklift': { fn: simForklifts, vi: 'So sánh hai xe nâng (Hình 4.4)', en: 'Comparing two forklifts (Figure 4.4)', intro: 'Đổi trọng lượng, độ cao và thời gian để so sánh công và công suất của hai xe.' }
  };
})();
