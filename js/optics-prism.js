/* ==========================================================================
   OPTICS PRISM — lăng kính, tán sắc, màu sắc, cầu vồng (KHTN 9, Bài 7). Nạp SAU optics-lab.js.
   Engine: prismTrace, nDisp (mô hình Cauchy minh hoạ), rainbowAngle, colourMix, discMix.
   Quy ước: đỉnh lăng kính ở trên, đáy nằm ngang; tia tới hợp pháp tuyến góc i1 (i1 > 0: tia tới từ phía dưới-trái, lệch về đáy).
   Mô hình tán sắc và cầu vồng chỉ mang tính minh hoạ (chiết suất không phải số đo thật của một loại thuỷ tinh cụ thể).
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab; if (!L) return;
  const E = L.engine, { makeDrag, fmt, pr, raf, clamp } = L;
  const $ = (s, r) => r.querySelector(s), $$ = (s, r) => Array.from(r.querySelectorAll(s));
  const RAD = Math.PI / 180; let uid = 0;
  const ps = (vi, en) => '<tspan class="vi">' + vi + '</tspan><tspan class="en" lang="en" dx="6">' + en + '</tspan>';
  const SPEC = [['đỏ', 'red', '#e0393e', 0.65], ['da cam', 'orange', '#f08a24', 0.6], ['vàng', 'yellow', '#f2c500', 0.58], ['lục', 'green', '#2fbf7a', 0.54], ['lam', 'blue', '#2aa7e0', 0.48], ['chàm', 'indigo', '#3b4fd0', 0.44], ['tím', 'violet', '#7b3fe4', 0.4]];

  Object.assign(E, {
    /* Lăng kính góc chiết quang A (độ), chiết suất n, góc tới i1 (độ) → r1, r2, i2, D (độ) hoặc {tir:true} */
    prismTrace(A, n, i1) {
      const s1 = Math.sin(i1 * RAD) / n; if (Math.abs(s1) > 1) return { ok: false, why: 'in' };
      const r1 = Math.asin(s1) / RAD, r2 = A - r1, s2 = n * Math.sin(r2 * RAD);
      if (Math.abs(s2) > 1) return { ok: false, tir: true, r1, r2, i1 };
      const i2 = Math.asin(s2) / RAD;
      return { ok: true, i1, r1, r2, i2, D: i1 + i2 - A };
    },
    /* Chiết suất theo bước sóng (µm), n = B + s·C/λ²; s là độ mạnh tán sắc (1 = giá trị minh hoạ) */
    nDisp(lam, s) { const C = 0.00515, Bv = 1.4978; return Bv + (s == null ? 1 : s) * C / (lam * lam); },
    /* Cầu vồng: góc giữa tia Mặt Trời và tia tới mắt (độ), 1 lần phản xạ, tia tới ở tham số va chạm b = sin i (0..1) */
    rainbowAngle(n, b) { const i = Math.asin(clamp(b, 0, 1)), r = Math.asin(Math.sin(i) / n); return 4 * r / RAD - 2 * i / RAD; },
    rainbowMax(n) { let best = 0, bb = 0; for (let b = 0; b < 1; b += 0.0005) { const a = E.rainbowAngle(n, b); if (a > best) { best = a; bb = b; } } return { angle: best, b: bb }; },
    /* Hấp thụ/phản xạ trên 7 dải màu */
    bands: {
      light: { white: [1, 1, 1, 1, 1, 1, 1], red: [1, 0, 0, 0, 0, 0, 0], green: [0, 0, 0, 1, 0, 0, 0], blue: [0, 0, 0, 0, 1, 1, 0], none: [0, 0, 0, 0, 0, 0, 0] },
      surf: { white: [1, 1, 1, 1, 1, 1, 1], red: [1, 0.5, 0, 0, 0, 0, 0.05], yellow: [0.4, 1, 1, 0.7, 0, 0, 0], green: [0, 0, 0.4, 1, 0.4, 0, 0], blue: [0, 0, 0, 0.2, 1, 1, 0.6], brown: [0.3, 0.2, 0.1, 0.05, 0, 0, 0], black: [0, 0, 0, 0, 0, 0, 0] }
    },
    colourMix(light, refl) {
      const v = light.map((x, i) => x * refl[i]), tot = v.reduce((a, b) => a + b, 0);
      if (tot < 0.05) return { name: 'đen', en: 'black', rgb: '#1a1a1a', tot, v };
      let r = 0, g = 0, b = 0; v.forEach((x, i) => { const c = SPEC[i][2]; r += x * parseInt(c.slice(1, 3), 16); g += x * parseInt(c.slice(3, 5), 16); b += x * parseInt(c.slice(5, 7), 16); });
      const full = light.every((x, i) => x > 0.99) && refl.every((x) => x > 0.99);
      if (full) return { name: 'trắng', en: 'white', rgb: '#ffffff', tot, v };
      const k = 255 / Math.max(r, g, b, 1); let k2 = Math.min(1, 0.45 + tot / 3);
      const rgb = '#' + [r, g, b].map((c) => Math.round(clamp(c * k * k2, 0, 255)).toString(16).padStart(2, '0')).join('');
      let mi = 0; v.forEach((x, i) => { if (x > v[mi]) mi = i; });
      const weak = tot < 0.9; return { name: weak && refl.every((x, i) => x < 0.5 + 0 && true) ? SPEC[mi][0] + ' sẫm' : SPEC[mi][0], en: SPEC[mi][1], rgb, tot, v };
    },
    selfTestPrism() {
      const T = [], near = (a, b, e) => Math.abs(a - b) <= (e == null ? 1e-6 : e), add = (n, ok, got) => T.push({ name: n, ok: !!ok, got });
      let r = E.prismTrace(60, 1.41, 45); add('lăng kính n = 1,41, A = 60°, i₁ = 45° ⇒ r₁ ≈ 30,1°, r₂ ≈ 29,9°, i₂ ≈ 44,7°, D ≈ 29,7° (≈ 30°)', r.ok && near(r.r1, 30, 0.15) && near(r.r2, 30, 0.15) && near(r.i2, 45, 0.5) && near(r.D, 30, 0.5), JSON.stringify(r));
      r = E.prismTrace(60, 1.5, 48.59); add('n = 1,5, A = 60°: góc lệch cực tiểu ở i₁ ≈ 48,6° (D ≈ 37,2°) và r₁ = r₂ = 30°', r.ok && near(r.r1, 30, 0.02) && near(r.D, 37.18, 0.05), r.D);
      let mn = 1e9, at = 0; for (let i = 20; i < 89; i += 0.1) { const q = E.prismTrace(60, 1.5, i); if (q.ok && q.D < mn) { mn = q.D; at = i; } } add('D cực tiểu đạt ở i₁ = i₂ (đối xứng)', near(at, 48.6, 0.2), at);
      r = E.prismTrace(60, 1.5, 5); add('i₁ nhỏ ⇒ phản xạ toàn phần ở mặt bên thứ hai (không có tia ló)', r.ok === false && r.tir === true, JSON.stringify(r));
      r = E.prismTrace(60, 1.5, 48.59); const rr = E.prismTrace(60, 1.5, 48.59), rd = E.prismTrace(60, E.nDisp(0.65), 50), vt = E.prismTrace(60, E.nDisp(0.4), 50); add('tia tím lệch nhiều hơn tia đỏ (n tím > n đỏ)', vt.D > rd.D && E.nDisp(0.4) > E.nDisp(0.65), vt.D + ' > ' + rd.D);
      const rr1 = E.rainbowMax(1.331), rv = E.rainbowMax(1.343); add('cầu vồng: tia đỏ ≈ 42°, tia tím ≈ 40° (khoảng 40°–42°)', near(rr1.angle, 42, 0.8) && near(rv.angle, 40.6, 1.2) && rr1.angle > rv.angle, rr1.angle + '/' + rv.angle);
      let m = E.colourMix(E.bands.light.white, E.bands.surf.white); add('vật trắng dưới ánh sáng trắng ⇒ trắng', m.name === 'trắng', m.name);
      m = E.colourMix(E.bands.light.white, E.bands.surf.red); add('vật đỏ dưới ánh sáng trắng ⇒ đỏ', m.name === 'đỏ', m.name);
      m = E.colourMix(E.bands.light.green, E.bands.surf.red); add('vật đỏ dưới ánh sáng lục ⇒ đen (không có ánh sáng phản xạ)', m.name === 'đen', m.name);
      m = E.colourMix(E.bands.light.white, E.bands.surf.black); add('vật đen hấp thụ mọi ánh sáng', m.name === 'đen', m.name);
      m = E.colourMix(E.bands.light.white, E.bands.surf.green); add('lá lục dưới ánh sáng trắng ⇒ lục', m.name === 'lục', m.name);
      return T;
    }
  });
  const prevSelf = E.selfTest; E.selfTest = function () { return prevSelf().concat(E.selfTestPrism()); };

  /* ------------------------------------------------ Hình học tia qua lăng kính (toạ độ toán, y hướng lên) */
  function prismGeom(A, n, i1, apex, Lf, tFrac) {
    const h = A / 2 * RAD, nL = [-Math.cos(h), Math.sin(h)], nR = [Math.cos(h), Math.sin(h)], dL = [-Math.sin(h), -Math.cos(h)];
    const B = [apex[0] + dL[0] * Lf, apex[1] + dL[1] * Lf], Cc = [apex[0] - dL[0] * Lf * -1 + 0, 0];
    const Cx = [apex[0] + Math.sin(h) * Lf, apex[1] - Math.cos(h) * Lf];
    const I = [apex[0] + dL[0] * Lf * tFrac, apex[1] + dL[1] * Lf * tFrac];
    const rot = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
    const inL = [-nL[0], -nL[1]], tr = E.prismTrace(A, n, i1);
    const d0 = rot(inL, i1 * RAD), res = { B, C: Cx, I, nL, nR, d0, tr, A: apex, h };
    if (!tr.ok && !tr.tir) return res;
    const d1 = rot(inL, tr.r1 * RAD);
    // giao với mặt phải: điểm J = apex + t·(sin h, −cos h)
    const e = [Math.sin(h), -Math.cos(h)], den = d1[0] * e[1] - d1[1] * e[0];
    const s = ((apex[0] - I[0]) * d1[1] - (apex[1] - I[1]) * d1[0]) / (d1[0] * e[1] - d1[1] * e[0] * 1) * -1;
    // giải I + a·d1 = apex + b·e
    const det = d1[0] * -e[1] - (-e[0]) * d1[1], a = ((apex[0] - I[0]) * -e[1] - (-e[0]) * (apex[1] - I[1])) / det, J = [I[0] + a * d1[0], I[1] + a * d1[1]];
    res.d1 = d1; res.J = J;
    if (tr.tir) { const nn = nR, dot = d1[0] * nn[0] + d1[1] * nn[1], rf = [d1[0] - 2 * dot * nn[0], d1[1] - 2 * dot * nn[1]]; res.refl = rf; }
    else { res.d2 = rot(nR, (h - tr.i2 * RAD) - Math.atan2(nR[1], nR[0]) * 0 - h + 0 - (Math.atan2(nR[1], nR[0]) - h) * 0 - h * 0 - (0)); res.d2 = [Math.cos(h - tr.i2 * RAD), Math.sin(h - tr.i2 * RAD)]; }
    return res;
  }
  const px = (p, o) => [o[0] + p[0], o[1] - p[1]];
  const ln = (a, b, c, w, d) => '<line x1="' + a[0].toFixed(1) + '" y1="' + a[1].toFixed(1) + '" x2="' + b[0].toFixed(1) + '" y2="' + b[1].toFixed(1) + '" stroke="' + c + '" stroke-width="' + (w || 2.4) + '" stroke-linecap="round"' + (d ? ' stroke-dasharray="6 4"' : '') + '/>';
  const tx = (p, s, o) => '<text x="' + p[0].toFixed(1) + '" y="' + p[1].toFixed(1) + '" class="olab__lab" text-anchor="' + ((o && o.a) || 'middle') + '"' + (o && o.c ? ' style="fill:' + o.c + '"' : '') + '>' + s + '</text>';

  /* ---------------------------------------------------------- W7.1: tia qua lăng kính */
  function prismLab(body, opt) {
    const o = Object.assign({ A: 60, n: 1.5, i1: 50, task: false }, opt || {}), id = 'op' + (++uid), VW = 560, VH = 320, OR = [280, 40], Lf = 210;
    const S_ = { A: o.A, n: o.n, i1: o.i1, snap: true };
    const ctl = (k, vi, en, min, max, step, unit) => '<label class="olab__ctl"><span>' + pr(vi, en) + ' = <output data-out="' + k + '"></output> ' + unit + '</span><input type="range" data-k="' + k + '" min="' + min + '" max="' + max + '" step="' + step + '"></label>';
    body.innerHTML = '<div class="olab" data-lab="' + id + '"><p class="olab__hint">' + pr('Kéo chấm đỏ (nguồn S) để đổi góc tới i₁; kéo chấm tại đỉnh để đổi góc chiết quang A; đổi chiết suất n bằng thanh trượt. Mũi tên ←/→ đổi i₁ ±1°.', 'Drag the red dot (source S) to change the incidence angle i₁; drag the dot at the apex to change the refracting angle A; change n with the slider. Arrow keys ←/→ change i₁ by 1°.') + '</p>' +
      '<div class="olab__stage"><svg class="olab__svg" viewBox="0 0 ' + VW + ' ' + VH + '" role="group" aria-label="Lăng kính và đường truyền của tia sáng đơn sắc"><g data-r="prism"></g><g data-r="rays"></g><g data-r="labels"></g>' +
      '<g data-h="src" data-r="srch" tabindex="0" role="slider" aria-label="Nguồn sáng S: góc tới i₁ / Source S: incidence angle i₁" aria-valuemin="-80" aria-valuemax="85" class="olab__hd olab__hd--src"><circle r="32" class="olab__hit"/><circle r="9" class="olab__dot"/></g>' +
      '<g data-h="apex" data-r="apexh" tabindex="0" role="slider" aria-label="Đỉnh lăng kính: góc chiết quang A / Apex: refracting angle A" aria-valuemin="20" aria-valuemax="90" class="olab__hd"><circle r="32" class="olab__hit"/><rect x="-8" y="-8" width="16" height="16" rx="4" class="olab__sq"/></g></svg></div>' +
      '<div class="olab__panel">' + ctl('A', 'Góc chiết quang A', 'Refracting angle A', 20, 90, 1, '°') + ctl('n', 'Chiết suất n', 'Refractive index n', 1.2, 2, 0.01, '') + ctl('i1', 'Góc tới i₁', 'Incidence angle i₁', -20, 85, 1, '°') +
      '<div class="olab__btns"><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button>' + (o.task ? '<button type="button" class="btn btn--sm btn--primary" data-act="set">' + pr('Đặt bài tập: n = 1,41, A = 60°, i₁ = 45°', 'Set the exercise: n = 1.41, A = 60°, i₁ = 45°') + '</button>' : '') + '</div>' +
      '<div class="olab__read" data-read aria-live="polite"></div><p class="olab__msg" data-msg role="status" aria-live="polite"></p></div></div>';
    const lab = $('[data-lab="' + id + '"]', body), svg = $('.olab__svg', lab), q = (nm) => $('[data-r="' + nm + '"]', svg);
    const P2 = (p) => px(p, OR);
    function draw() {
      const g = prismGeom(S_.A, S_.n, S_.i1, [0, 0], Lf, 0.5), tr = g.tr;
      const apex = P2([0, 0]), B = P2(g.B), Cc = P2(g.C);
      q('prism').innerHTML = '<polygon points="' + apex + ' ' + B + ' ' + Cc + '" class="olab__prismfill"/>' + tx([apex[0], apex[1] - 12], 'A', { c: 'var(--ink)' });
      // nối tia
      const S0 = [g.I[0] - g.d0[0] * 150, g.I[1] - g.d0[1] * 150], I = P2(g.I), Sp = P2(S0);
      let rays = ln(Sp, I, 'var(--red)') + '', lab_ = '';
      const nl = (P, nv, len) => ln(P2([P[0] - nv[0] * len, P[1] - nv[1] * len]), P2([P[0] + nv[0] * len, P[1] + nv[1] * len]), 'var(--line)', 1.4, 1);
      rays += nl(g.I, g.nL, 50);
      let read;
      if (g.J) {
        const J = P2(g.J); rays += ln(I, J, 'var(--red)') + nl(g.J, g.nR, 50);
        if (tr.ok) { const R = P2([g.J[0] + g.d2[0] * 130, g.J[1] + g.d2[1] * 130]); rays += ln(J, R, 'var(--red)') + ln(I, P2([g.I[0] + g.d0[0] * 260, g.I[1] + g.d0[1] * 260]), 'var(--grey)', 1.2, 1) + ln(J, P2([g.J[0] - g.d2[0] * 130, g.J[1] - g.d2[1] * 130]), 'var(--grey)', 1.2, 1); lab_ += tx([R[0] + 4, R[1] + 4], 'R', { a: 'start' }) + tx([J[0] + 8, J[1] - 10], 'J', { a: 'start' });
          read = '<table class="olab__tbl olab__tbl--read"><tbody><tr><th scope="row">i₁</th><td>' + fmt(tr.i1, 1) + '°</td></tr><tr><th scope="row">r₁ = arcsin(sin i₁ / n)</th><td>' + fmt(tr.r1, 1) + '°</td></tr><tr><th scope="row">r₂ = A − r₁</th><td>' + fmt(tr.r2, 1) + '°</td></tr><tr><th scope="row">i₂ = arcsin(n sin r₂)</th><td>' + fmt(tr.i2, 1) + '°</td></tr><tr><th scope="row">D = i₁ + i₂ − A</th><td><b>' + fmt(tr.D, 1) + '°</b></td></tr></tbody></table><p class="olab__status">' + pr('Tia ló lệch về phía đáy của lăng kính.', 'The emergent ray is deviated toward the base of the prism.') + '</p>';
        } else {
          const rf = P2([g.J[0] + g.refl[0] * 90, g.J[1] + g.refl[1] * 90]); rays += ln(J, rf, 'var(--teal)');
          read = '<p class="olab__status olab__status--warn">' + pr('Tại J: r₂ = ' + fmt(tr.r2, 1) + '° lớn hơn góc tới hạn ⇒ <b>phản xạ toàn phần</b>, không có tia ló ra mặt bên thứ hai.', 'At J: r₂ = ' + fmt(tr.r2, 1) + '° is above the critical angle ⇒ <b>total internal reflection</b>, no ray leaves the second face.') + '</p><table class="olab__tbl olab__tbl--read"><tbody><tr><th scope="row">r₁</th><td>' + fmt(tr.r1, 1) + '°</td></tr><tr><th scope="row">r₂</th><td>' + fmt(tr.r2, 1) + '°</td></tr></tbody></table>';
        }
      } else read = '<p class="olab__status olab__status--warn">' + pr('Góc tới không hợp lệ cho mặt bên này.', 'This incidence angle is not valid for this face.') + '</p>';
      lab_ += tx([Sp[0] - 8, Sp[1] - 6], 'S', { a: 'end' }) + tx([I[0] - 14, I[1] - 8], 'I', { a: 'end' });
      q('rays').innerHTML = rays; q('labels').innerHTML = lab_;
      setA(q('srch'), { transform: 'translate(' + Sp[0] + ',' + Sp[1] + ')', 'aria-valuenow': S_.i1.toFixed(0), 'aria-valuetext': 'i₁ = ' + fmt(S_.i1, 0) + '°' }); setA(q('apexh'), { transform: 'translate(' + apex[0] + ',' + apex[1] + ')', 'aria-valuenow': S_.A.toFixed(0), 'aria-valuetext': 'A = ' + fmt(S_.A, 0) + '°' });
      $('[data-read]', lab).innerHTML = read;
      ['A', 'n', 'i1'].forEach((k) => { const r = $('[data-k="' + k + '"]', lab), out = $('[data-out="' + k + '"]', lab); if (document.activeElement !== r) r.value = S_[k]; out.textContent = fmt(S_[k], k === 'n' ? 2 : 0); });
      if (o.task) { const t = E.prismTrace(60, 1.41, 45); $('[data-msg]', lab).innerHTML = Math.abs(S_.n - 1.41) < 0.005 && S_.A === 60 && S_.i1 === 45 ? pr('Bài tập: r₁ = ' + fmt(t.r1, 1) + '°, r₂ = ' + fmt(t.r2, 1) + '°, i₂ = ' + fmt(t.i2, 1) + '°, D = ' + fmt(t.D, 1) + '° (đường đi cân đối quanh pháp tuyến).', 'Exercise: r₁ = ' + fmt(t.r1, 1) + '°, r₂ = ' + fmt(t.r2, 1) + '°, i₂ = ' + fmt(t.i2, 1) + '°, D = ' + fmt(t.D, 1) + '° (the path is symmetric).') : ''; }
    }
    const setA = (el, a) => { for (const k in a) el.setAttribute(k, a[k]); };
    const redraw = raf(draw);
    makeDrag(svg, {
      src: { move(x, y) { const g = prismGeom(S_.A, S_.n, S_.i1, [0, 0], Lf, 0.5), I = P2(g.I); const th = Math.atan2(-(y - I[1]) * -1 * -1, I[0] - x); const ang = Math.atan2((I[1] - y), (I[0] - x)) / RAD; S_.i1 = clamp(Math.round(ang + S_.A / 2), -20, 85); redraw(); }, key(dd) { S_.i1 = clamp(S_.i1 + dd, -20, 85); redraw(); } },
      apex: { move(x, y) { const g0 = [OR[0], OR[1]]; const dx = x - OR[0]; S_.A = clamp(Math.round(S_.A + dx / 3), 20, 90); redraw(); }, key(dd) { S_.A = clamp(S_.A + dd, 20, 90); redraw(); } }
    });
    lab.addEventListener('input', (e) => { const k = e.target.dataset && e.target.dataset.k; if (!k) return; S_[k] = +e.target.value; draw(); });
    lab.addEventListener('click', (e) => { const b = e.target.closest('[data-act]'); if (!b) return; if (b.dataset.act === 'reset') Object.assign(S_, { A: o.A, n: o.n, i1: o.i1 }); else if (b.dataset.act === 'set') Object.assign(S_, { A: 60, n: 1.41, i1: 45 }); draw(); });
    draw(); return { state: S_, draw };
  }

  /* ---------------------------------------------------------- W7.2: tán sắc */
  function dispLab(body) {
    const id = 'od' + (++uid), VW = 560, VH = 300, OR = [250, 40], Lf = 150;
    const S_ = { s: 2, screenX: 460, filter: 'none', A: 60, i1: 50 };
    body.innerHTML = '<div class="olab" data-lab="' + id + '"><p class="olab__hint">' + pr('Chọn kính lọc đặt vào khe (hoặc không), đổi độ mạnh tán sắc và kéo màn ra xa hay lại gần lăng kính.', 'Pick a filter for the slit (or none), change the dispersion strength and drag the screen farther from or closer to the prism.') + '</p>' +
      '<div class="olab__stage"><svg class="olab__svg" viewBox="0 0 ' + VW + ' ' + VH + '" role="group" aria-label="Tán sắc ánh sáng trắng qua lăng kính"><g data-r="prism"></g><g data-r="rays"></g><g data-r="scr"></g>' +
      '<g data-h="scr" data-r="scrh" tabindex="0" role="slider" aria-label="Màn: vị trí / Screen: position" aria-valuemin="330" aria-valuemax="540" class="olab__hd olab__hd--rot"><circle r="32" class="olab__hit"/><rect x="-8" y="-8" width="16" height="16" rx="4" class="olab__sq"/></g></svg></div>' +
      '<div class="olab__panel"><fieldset class="olab__ctl olab__side"><legend>' + pr('Kính lọc ở khe', 'Filter at the slit') + '</legend>' + [['none', 'Không (ánh sáng trắng)', 'None (white light)'], ['red', 'Lọc đỏ', 'Red filter'], ['green', 'Lọc lục', 'Green filter'], ['violet', 'Lọc tím', 'Violet filter']].map((f, i) => '<label><input type="radio" name="' + id + 'f" value="' + f[0] + '"' + (i ? '' : ' checked') + '> ' + pr(f[1], f[2]) + '</label>').join('') + '</fieldset>' +
      '<label class="olab__ctl"><span>' + pr('Độ mạnh tán sắc', 'Dispersion strength') + ' = <output data-out="s"></output>×</span><input type="range" data-k="s" min="0" max="5" step="0.1"></label>' +
      '<div class="olab__btns"><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button></div><div class="olab__read" data-read aria-live="polite"></div><p class="olab__note">' + pr('Mô hình minh hoạ: chiết suất tăng dần từ đỏ đến tím (n = B + C/λ²); giá trị ở đây chỉ để thấy xu hướng, không phải số đo thật.', 'Illustrative model: the index rises from red to violet (n = B + C/λ²); the values only show the trend, they are not measurements.') + '</p></div></div>';
    const lab = $('[data-lab="' + id + '"]', body), svg = $('.olab__svg', lab), q = (nm) => $('[data-r="' + nm + '"]', svg), P2 = (p) => px(p, OR);
    const setA = (el, a) => { for (const k in a) el.setAttribute(k, a[k]); };
    function draw() {
      const A = S_.A, h = A / 2 * RAD, geo = prismGeom(A, 1.51, S_.i1, [0, 0], Lf, 0.5);
      const apex = P2([0, 0]), B = P2(geo.B), Cc = P2(geo.C);
      q('prism').innerHTML = '<polygon points="' + apex + ' ' + B + ' ' + Cc + '" class="olab__prismfill"/>';
      const sel = S_.filter === 'none' ? SPEC.map((_, i) => i) : S_.filter === 'red' ? [0] : S_.filter === 'green' ? [3] : [6];
      const I = P2(geo.I), Sp = P2([geo.I[0] - geo.d0[0] * 160, geo.I[1] - geo.d0[1] * 160]);
      let rays = ln(Sp, I, S_.filter === 'none' ? '#c9cfdd' : SPEC[sel[0]][2], 4) + ln(Sp, I, '#fff', S_.filter === 'none' ? 1.5 : 0.01);
      let hits = [], devs = [];
      sel.forEach((i) => { const n = E.nDisp(SPEC[i][3], S_.s), g = prismGeom(A, n, S_.i1, [0, 0], Lf, 0.5); if (!g.tr.ok) return; const J = g.J, R = P2([J[0] + g.d2[0] * 400, J[1] + g.d2[1] * 400]), Jp = P2(J); rays += ln(I, Jp, SPEC[i][2], 2.2); const t = (S_.screenX - Jp[0]) / (R[0] - Jp[0]), yy = Jp[1] + t * (R[1] - Jp[1]); rays += ln(Jp, [S_.screenX, yy], SPEC[i][2], 2.6); hits.push([i, yy]); devs.push([i, g.tr.D]); });
      q('rays').innerHTML = rays;
      const sy = hits.length ? hits.reduce((a, b) => a + b[1], 0) / hits.length : 150;
      q('scr').innerHTML = '<rect x="' + (S_.screenX - 4) + '" y="40" width="8" height="240" rx="2" class="olab__screen"/>' + hits.map((h2) => '<rect x="' + (S_.screenX + 4) + '" y="' + (h2[1] - 5) + '" width="30" height="10" rx="2" fill="' + SPEC[h2[0]][2] + '"/>').join('');
      setA(q('scrh'), { transform: 'translate(' + S_.screenX + ',24)', 'aria-valuenow': S_.screenX });
      const Dr = devs.length ? devs.find((d) => d[0] === 0) : null, Dv = devs.find((d) => d[0] === 6);
      const f = S_.filter;
      $('[data-read]', lab).innerHTML = '<p class="olab__status">' + (f === 'none' ? pr('Dải màu từ đỏ (lệch ít nhất) đến tím (lệch nhiều nhất): ' + SPEC.map((c) => c[0]).join(', ') + '.', 'A band from red (deviated least) to violet (most): ' + SPEC.map((c) => c[1]).join(', ') + '.') : pr('Ánh sáng qua kính lọc là <b>đơn sắc</b>: chỉ còn một vệt màu, không bị tán sắc thêm.', 'Light through the filter is <b>monochromatic</b>: a single spot, no further dispersion.')) + '</p>' + (f === 'none' && Dr && Dv ? '<table class="olab__tbl olab__tbl--read"><tbody><tr><th scope="row">D (' + pr('đỏ', 'red') + ')</th><td>' + fmt(Dr[1], 1) + '°</td></tr><tr><th scope="row">D (' + pr('tím', 'violet') + ')</th><td>' + fmt(Dv[1], 1) + '°</td></tr></tbody></table>' : '');
      const sOut = $('[data-out="s"]', lab); sOut.textContent = fmt(S_.s, 1); const r = $('[data-k="s"]', lab); if (document.activeElement !== r) r.value = S_.s;
    }
    const redraw = raf(draw);
    makeDrag(svg, { scr: { move(x) { S_.screenX = clamp(Math.round(x), 330, 540); redraw(); }, key(dd) { S_.screenX = clamp(S_.screenX + dd * 4, 330, 540); redraw(); } } });
    lab.addEventListener('input', (e) => { if (e.target.dataset.k === 's') { S_.s = +e.target.value; draw(); } });
    lab.addEventListener('change', (e) => { if (e.target.name === id + 'f') { S_.filter = e.target.value; draw(); } });
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-act="reset"]')) { Object.assign(S_, { s: 2, screenX: 460, filter: 'none' }); $$('input[name="' + id + 'f"]', lab).forEach((x) => { x.checked = x.value === 'none'; }); draw(); } });
    draw(); return { state: S_, draw };
  }

  /* ---------------------------------------------------------- W7.3: màu sắc của vật */
  const LIGHTS = [['white', 'trắng', 'white'], ['red', 'đỏ', 'red'], ['green', 'lục', 'green'], ['blue', 'lam', 'blue']];
  const SURFS = [['white', 'trắng', 'white'], ['red', 'đỏ', 'red'], ['yellow', 'vàng', 'yellow'], ['green', 'lục', 'green'], ['blue', 'lam', 'blue'], ['black', 'đen', 'black']];
  function colourLab(body, opt) {
    const o = Object.assign({ scene: false }, opt || {}), id = 'oc' + (++uid), S_ = { light: 'white', surf: 'red', filter: 'none' };
    body.innerHTML = '<div class="olab" data-lab="' + id + '"><p class="olab__hint">' + pr('Chọn màu ánh sáng chiếu tới và màu của bề mặt (hoặc cảnh bông hướng dương); xem ánh sáng nào còn phản xạ tới mắt.', 'Choose the colour of the incoming light and the colour of the surface (or the sunflower scene); see which light still reaches the eye.') + '</p>' +
      '<div class="olab__stage"><svg class="olab__svg" viewBox="0 0 560 250" role="group" aria-label="Màu sắc của vật phụ thuộc ánh sáng hấp thụ và phản xạ"><g data-r="scene"></g></svg></div><div class="olab__panel">' +
      '<fieldset class="olab__ctl olab__side"><legend>' + pr('Ánh sáng chiếu tới', 'Incoming light') + '</legend>' + LIGHTS.map((l) => '<label><input type="radio" name="' + id + 'l" value="' + l[0] + '"' + (l[0] === 'white' ? ' checked' : '') + '> ' + pr(l[1], l[2]) + '</label>').join('') + '</fieldset>' +
      (o.scene ? '' : '<fieldset class="olab__ctl olab__side"><legend>' + pr('Màu bề mặt', 'Surface colour') + '</legend>' + SURFS.map((l) => '<label><input type="radio" name="' + id + 's" value="' + l[0] + '"' + (l[0] === 'red' ? ' checked' : '') + '> ' + pr(l[1], l[2]) + '</label>').join('') + '</fieldset>') +
      '<div class="olab__read" data-read aria-live="polite"></div></div></div>';
    const lab = $('[data-lab="' + id + '"]', body), svg = $('.olab__svg', lab), q = $('[data-r="scene"]', svg);
    const bandBar = (x, y, v, w) => v.map((a, i) => '<rect x="' + (x + i * (w / 7)) + '" y="' + y + '" width="' + (w / 7 - 2) + '" height="10" rx="2" fill="' + SPEC[i][2] + '" opacity="' + (0.12 + 0.88 * Math.min(1, a)) + '"/>').join('');
    function draw() {
      const li = E.bands.light[S_.light], lightName = LIGHTS.find((l) => l[0] === S_.light);
      let s = '<circle cx="50" cy="50" r="22" fill="' + (S_.light === 'white' ? '#ffe24a' : SPEC[S_.light === 'red' ? 0 : S_.light === 'green' ? 3 : 4][2]) + '"/>' + '<text x="50" y="96" class="olab__lab" text-anchor="middle">' + ps('Nguồn', 'Source') + '</text>' + bandBar(14, 106, li, 72);
      let out = '';
      if (!o.scene) {
        const rf = E.bands.surf[S_.surf], m = E.colourMix(li, rf), srf = SURFS.find((x) => x[0] === S_.surf);
        s += '<line x1="76" y1="62" x2="230" y2="170" stroke="#d9a900" stroke-width="3"/><rect x="190" y="170" width="170" height="40" rx="6" fill="' + ({ white: '#fff', red: '#e0393e', yellow: '#f2c500', green: '#2fbf7a', blue: '#2a7be0', black: '#222' })[S_.surf] + '" stroke="var(--ink)" stroke-width="2"/>' + bandBar(190, 218, rf, 170) + '<text x="275" y="244" class="olab__lab" text-anchor="middle">' + ps('Bề mặt ' + srf[1] + ': phản xạ các dải được tô đậm', 'Surface ' + srf[2] + ': reflects the bold bands') + '</text>';
        s += m.tot >= 0.05 ? '<line x1="290" y1="168" x2="440" y2="70" stroke="' + m.rgb + '" stroke-width="4"/>' : '<text x="360" y="110" class="olab__lab" text-anchor="middle" style="font-size:22px">✕</text>';
        s += '<circle cx="470" cy="62" r="26" fill="#fff" stroke="var(--ink)" stroke-width="2"/><circle cx="470" cy="62" r="11" fill="' + m.rgb + '" stroke="var(--ink)"/>' + bandBar(398, 106, m.v, 140);
        out = '<p class="olab__status">' + pr('Mắt thấy vật có màu <b>' + m.name + '</b>.', 'The eye sees the surface as <b>' + m.en + '</b>.') + '</p><p class="olab__note">' + pr(m.tot < 0.05 ? 'Ánh sáng chiếu tới bị hấp thụ hết: không có ánh sáng phản xạ tới mắt.' : 'Vật có màu nào là do phản xạ ánh sáng màu đó và hấp thụ các màu còn lại.', m.tot < 0.05 ? 'All the incoming light is absorbed: no light is reflected to the eye.' : 'A surface has the colour it reflects and absorbs the others.') + '</p>';
      } else {
        const parts = [['petal', 'Cánh hoa vàng', 'Yellow petals', E.bands.surf.yellow, 170, 110], ['leaf', 'Lá xanh', 'Green leaf', E.bands.surf.green, 340, 170], ['core', 'Nhuỵ nâu', 'Brown centre', E.bands.surf.brown, 255, 110]];
        s += '<rect x="248" y="150" width="14" height="80" fill="#2fbf7a"/>';
        parts.forEach((p) => { const m = E.colourMix(li, p[3]); p.m = m; });
        for (let k = 0; k < 12; k++) { const a = k * 30 * RAD; s += '<ellipse cx="' + (255 + 52 * Math.cos(a)) + '" cy="' + (110 + 52 * Math.sin(a)) + '" rx="26" ry="11" transform="rotate(' + (k * 30) + ' ' + (255 + 52 * Math.cos(a)) + ' ' + (110 + 52 * Math.sin(a)) + ')" fill="' + parts[0].m.rgb + '" stroke="var(--ink)" stroke-width="1"/>'; }
        s += '<circle cx="255" cy="110" r="32" fill="' + parts[2].m.rgb + '" stroke="var(--ink)" stroke-width="1.5"/><ellipse cx="320" cy="190" rx="44" ry="18" fill="' + parts[1].m.rgb + '" stroke="var(--ink)" stroke-width="1.5" transform="rotate(-20 320 190)"/>';
        out = '<table class="olab__tbl olab__tbl--read"><tbody>' + parts.map((p) => '<tr><th scope="row">' + pr(p[1], p[2]) + '</th><td>' + pr(p.m.name, p.m.en) + '</td></tr>').join('') + '</tbody></table><p class="olab__note">' + pr('Dưới ánh sáng đỏ, lá xanh gần như tối (lá hấp thụ ánh sáng đỏ); dưới ánh sáng lục, cánh hoa vàng vẫn phản xạ lục.', 'Under red light the green leaf looks almost dark (it absorbs red); under green light the yellow petals still reflect green.') + '</p>';
      }
      q.innerHTML = s; $('[data-read]', lab).innerHTML = out;
    }
    lab.addEventListener('change', (e) => { if (e.target.name === id + 'l') S_.light = e.target.value; else if (e.target.name === id + 's') S_.surf = e.target.value; draw(); });
    draw(); return { state: S_, draw };
  }

  /* ---------------------------------------------------------- W7.4: đĩa Newton */
  function discLab(body) {
    const id = 'ow' + (++uid), S_ = { speed: 0, ang: 0, equal: true }, cx = 140, cy = 125, r = 100, stopRAF = { id: 0 };
    body.innerHTML = '<div class="olab" data-lab="' + id + '"><p class="olab__hint">' + pr('Tăng tốc độ quay của đĩa bảy màu: càng quay nhanh các màu càng hoà vào nhau.', 'Raise the spin speed of the seven-colour disc: the faster it spins, the more the colours blend.') + '</p>' +
      '<div class="olab__stage"><svg class="olab__svg" viewBox="0 0 560 250" role="img" aria-label="Đĩa Newton bảy màu quay"><g data-r="disc"></g><g data-r="eye"></g></svg></div><div class="olab__panel">' +
      '<label class="olab__ctl"><span>' + pr('Tốc độ quay', 'Spin speed') + ' = <output data-out="speed"></output> ' + pr('vòng/giây', 'turns/s') + '</span><input type="range" data-k="speed" min="0" max="30" step="1" value="0"></label>' +
      '<div class="olab__btns"><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button></div><div class="olab__read" data-read aria-live="polite"></div><p class="olab__note">' + pr('Mực màu không tinh khiết nên đĩa thật thường cho màu xám nhạt, chưa phải trắng hoàn toàn.', 'Pigments are not pure, so a real disc usually gives a light grey, not a perfect white.') + '</p></div></div>';
    const lab = $('[data-lab="' + id + '"]', body), svg = $('.olab__svg', lab), gd = $('[data-r="disc"]', svg);
    const rgb = SPEC.map((c) => [parseInt(c[2].slice(1, 3), 16), parseInt(c[2].slice(3, 5), 16), parseInt(c[2].slice(5, 7), 16)]);
    const avg = rgb.reduce((a, c) => a.map((v, i) => v + c[i] / 7), [0, 0, 0]);
    const mixc = (w) => { const b = [235, 235, 235]; return 'rgb(' + [0, 1, 2].map((i) => Math.round(clamp((1 - w) * 0 + avg[i] * 0 + (rgb.reduce((a, c) => a + c[i], 0) / 7) * (1 - w) + b[i] * w * 0 + 0, 0, 255))).join(',') + ')'; };
    function draw() {
      const w = clamp((S_.speed - 4) / 14, 0, 1), a0 = S_.ang;
      let s = '', st = -90 + a0;
      SPEC.forEach((c, i) => { const a1 = st + 360 / 7, p = (a) => [cx + r * Math.cos(a * RAD), cy + r * Math.sin(a * RAD)]; const p0 = p(st), p1 = p(a1); s += '<path d="M' + cx + ' ' + cy + ' L' + p0[0].toFixed(1) + ' ' + p0[1].toFixed(1) + ' A' + r + ' ' + r + ' 0 0 1 ' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1) + ' Z" fill="' + c[2] + '" stroke="' + (w > 0.5 ? c[2] : '#fff') + '" stroke-width="1"/>'; st = a1; });
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="rgb(222,222,226)" opacity="' + (w * 0.92).toFixed(2) + '"/><circle cx="' + cx + '" cy="' + cy + '" r="5" fill="var(--ink)"/>';
      gd.innerHTML = s;
      $('[data-r="eye"]', svg).innerHTML = '<text x="400" y="110" class="olab__lab" text-anchor="middle">' + ps('Mắt thấy:', 'The eye sees:') + '</text><circle cx="400" cy="150" r="40" fill="' + (w < 0.05 ? '#cfd5e6' : 'rgb(' + [222, 222, 226].map((v) => Math.round(v * w + 200 * (1 - w))).join(',') + ')') + '" stroke="var(--ink)" stroke-width="2"/><text x="400" y="154" class="olab__lab" text-anchor="middle">' + (w < 0.05 ? ps('bảy màu riêng', 'seven colours') : w < 0.95 ? ps('đang hoà màu…', 'blending…') : ps('trắng đục', 'whitish')) + '</text>';
      $('[data-read]', lab).innerHTML = '<p class="olab__status">' + (S_.speed === 0 ? pr('Đĩa đứng yên: thấy rõ bảy cung màu có cùng độ rộng (mỗi cung 360°/7 ≈ 51,4°).', 'Disc at rest: seven equal sectors (360°/7 ≈ 51.4° each).') : pr('Quay ' + S_.speed + ' vòng/s: mắt không phân biệt được từng màu mà nhận ánh sáng tổng hợp của cả bảy màu.', 'Spinning at ' + S_.speed + ' turns/s: the eye cannot separate the colours and receives the combined light of all seven.')) + '</p>';
      $('[data-out="speed"]', lab).textContent = S_.speed;
    }
    let last = 0, alive = true;
    function loop(ts) { if (!alive || !svg.isConnected) return; if (S_.speed > 0) { S_.ang = (S_.ang + Math.min(S_.speed, 8) * 4) % 360; draw(); } stopRAF.id = requestAnimationFrame(loop); }
    stopRAF.id = requestAnimationFrame(loop);
    lab.addEventListener('input', (e) => { if (e.target.dataset.k === 'speed') { S_.speed = +e.target.value; draw(); } });
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-act="reset"]')) { S_.speed = 0; S_.ang = 0; $('[data-k="speed"]', lab).value = 0; draw(); } });
    const mo = new MutationObserver(() => { if (!svg.isConnected) { alive = false; cancelAnimationFrame(stopRAF.id); mo.disconnect(); } }); mo.observe(document.body, { childList: true, subtree: true });
    draw(); return { state: S_, draw };
  }

  /* ---------------------------------------------------------- W7.5: cầu vồng */
  function rainbowLab(body) {
    const id = 'or' + (++uid), S_ = { b: 0.86 }, cx = 190, cy = 90, R = 78;
    body.innerHTML = '<div class="olab"><div data-lab="' + id + '"><p class="olab__hint">' + pr('Kéo thanh trượt để đổi vị trí tia Mặt Trời tới giọt nước; chú ý góc giữa tia tới và tia ló đạt giá trị lớn nhất ở khoảng 42° (đỏ) và 40° (tím).', 'Move the slider to change where the Sun’s ray hits the raindrop; note the angle between incident and emergent ray peaks near 42° (red) and 40° (violet).') + '</p>' +
      '<div class="olab__stage"><svg class="olab__svg" viewBox="0 0 560 250" role="img" aria-label="Giọt nước mưa tạo cầu vồng"><g data-r="d"></g></svg></div><div class="olab__panel"><label class="olab__ctl"><span>' + pr('Vị trí tia tới (b = sin i)', 'Ray position (b = sin i)') + ' = <output data-out="b"></output></span><input type="range" data-k="b" min="0.05" max="0.99" step="0.01"></label><div class="olab__read" data-read aria-live="polite"></div><p class="olab__note">' + pr('Mô hình minh hoạ: chiết suất nước n = 1,331 (đỏ) và 1,343 (tím).', 'Illustrative model: water index n = 1.331 (red) and 1.343 (violet).') + '</p></div></div></div>';
    const lab = $('[data-lab="' + id + '"]', body), gd = $('[data-r="d"]', lab);
    const path = (n, b, col) => { const i = Math.asin(b), r = Math.asin(b / n), a1 = Math.atan2(-b, -Math.cos(i)), P1 = [cx - R * Math.cos(i), cy - R * Math.sin(i)];
      const a1a = Math.atan2(P1[1] - cy, P1[0] - cx), a2 = a1a + Math.PI - 2 * r, a3 = a2 + Math.PI - 2 * r, Pq = (a) => [cx + R * Math.cos(a), cy + R * Math.sin(a)], P2_ = Pq(a2), P3 = Pq(a3);
      const dev = (Math.PI + 2 * i - 4 * r), out = [Math.cos(dev), Math.sin(dev)], Pe = [P3[0] + out[0] * 60, P3[1] + out[1] * 60];
      return '<polyline points="' + [P1, P2_, P3, Pe].map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ') + '" fill="none" stroke="' + col + '" stroke-width="2.4"/>'; };
    function draw() {
      const nR = 1.331, nV = 1.343, b = S_.b, i = Math.asin(b);
      gd.innerHTML = '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="rgba(120,180,255,.25)" stroke="var(--pen)" stroke-width="2.4"/><line x1="20" y1="' + (cy - b * R) + '" x2="' + (cx - R * Math.cos(i)) + '" y2="' + (cy - b * R) + '" stroke="#d9a900" stroke-width="3"/>' + path(nR, b, '#e0393e') + path(nV, b, '#7b3fe4') +
        '<g transform="translate(330 0)"><text x="0" y="22" class="olab__lab">' + ps('Góc lệch theo b', 'Angle vs b') + '</text><rect x="0" y="34" width="210" height="170" rx="6" fill="none" stroke="var(--line)"/>' +
        [['#e0393e', nR], ['#7b3fe4', nV]].map((c) => '<polyline fill="none" stroke="' + c[0] + '" stroke-width="2" points="' + Array.from({ length: 100 }, (_, k) => { const bb = 0.01 + k * 0.0099; return (bb * 210).toFixed(1) + ',' + (204 - E.rainbowAngle(c[1], bb) / 45 * 160).toFixed(1); }).join(' ') + '"/>').join('') +
        '<line x1="' + (b * 210) + '" y1="34" x2="' + (b * 210) + '" y2="204" stroke="var(--grey)" stroke-dasharray="4 3"/></g>';
      const aR = E.rainbowAngle(nR, b), aV = E.rainbowAngle(nV, b), mR = E.rainbowMax(nR), mV = E.rainbowMax(nV);
      $('[data-read]', lab).innerHTML = '<table class="olab__tbl olab__tbl--read"><tbody><tr><th scope="row">' + pr('Đỏ: góc hiện tại / cực đại', 'Red: now / maximum') + '</th><td>' + fmt(aR, 1) + '° / ' + fmt(mR.angle, 1) + '°</td></tr><tr><th scope="row">' + pr('Tím: góc hiện tại / cực đại', 'Violet: now / maximum') + '</th><td>' + fmt(aV, 1) + '° / ' + fmt(mV.angle, 1) + '°</td></tr></tbody></table><p class="olab__status">' + pr('Nhiều tia tập trung gần góc cực đại nên ta thấy cầu vồng sáng ở khoảng 40°–42° so với phương tia Mặt Trời.', 'Many rays pile up near the maximum angle, so the rainbow is bright near 40°–42° from the direction of the Sun’s rays.') + '</p>';
      $('[data-out="b"]', lab).textContent = fmt(b, 2); const r = $('[data-k="b"]', lab); if (document.activeElement !== r) r.value = b;
    }
    lab.addEventListener('input', (e) => { if (e.target.dataset.k === 'b') { S_.b = +e.target.value; draw(); } });
    draw(); return { state: S_, draw };
  }

  window.LabSims = Object.assign(window.LabSims || {}, {
    'oprism-trace': { fn: (b) => prismLab(b, {}), vi: 'Đường truyền của tia sáng đơn sắc qua lăng kính (Hình 7.6)', en: 'A monochromatic ray through a prism (Figure 7.6)', intro: 'Kéo S đổi góc tới, kéo đỉnh đổi góc chiết quang A.' },
    'oprism-task': { fn: (b) => prismLab(b, { task: true }), vi: 'Bài tập: n = 1,41, A = 60°, i₁ = 45°', en: 'Exercise: n = 1.41, A = 60°, i₁ = 45°', intro: 'Bấm nút để đặt bài tập rồi đọc r₁, r₂, i₂ và D.' },
    'oprism-disp': { fn: dispLab, vi: 'Tán sắc ánh sáng trắng (Hình 7.4, 7.5)', en: 'Dispersion of white light (Figures 7.4, 7.5)', intro: 'Đặt kính lọc, đổi độ mạnh tán sắc, kéo màn.' },
    'oprism-colour': { fn: (b) => colourLab(b, {}), vi: 'Màu sắc của vật (Hình 7.8 – 7.11)', en: 'The colour of objects (Figures 7.8–7.11)', intro: 'Đổi màu ánh sáng và màu bề mặt.' },
    'oprism-scene': { fn: (b) => colourLab(b, { scene: true }), vi: 'Bông hoa hướng dương dưới các ánh sáng khác nhau (Hình 7.10)', en: 'The sunflower under different lights (Figure 7.10)', intro: 'Đổi màu ánh sáng chiếu lên bông hoa.' },
    'oprism-disc': { fn: discLab, vi: 'Đĩa Newton (Hình 7.12)', en: 'Newton’s disc (Figure 7.12)', intro: 'Tăng tốc độ quay để các màu hoà vào nhau.' },
    'oprism-rainbow': { fn: rainbowLab, vi: 'Cầu vồng và giọt nước (Hình 7.13)', en: 'The rainbow and the raindrop (Figure 7.13)', intro: 'Kéo thanh trượt đổi vị trí tia tới giọt nước.' }
  });
  L.prismLab = prismLab;
})();
