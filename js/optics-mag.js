/* ==========================================================================
   OPTICS MAG — kính lúp, góc trông vật, dựng ảnh theo tỉ lệ, điều tiết của mắt (KHTN 9, Bài 10). Nạp SAU optics-lens.js.
   Engine thêm vào OpticsLab.engine.mag:  G25(f), image(d,f), angles(h,d,f), accommodation(d), selfTest()
   Giao diện (đăng ký vào LabSims):  omag-glass (W10.1)  omag-angle (W10.2)  omag-scale (W10.3)  omag-eye (W10.4)
   Quy ước: đơn vị cm; điểm cực cận Cc = 25 cm; d′ < 0 là ảnh ảo.
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab; if (!L) return;
  const { makeDrag, fmt, pr, raf, clamp } = L;
  const $ = (s, r) => r.querySelector(s);
  let uid = 0;
  const setA = (el, o) => { for (const k in o) el.setAttribute(k, o[k]); };
  const NEAR = 25;

  /* ---------------------------------------------------------------- ENGINE */
  const image = (d, f) => {                 // thấu kính hội tụ f > 0
    if (Math.abs(d - f) < 1e-9) return { dp: Infinity, k: Infinity, virt: true, inf: true };
    const dp = d * f / (d - f), k = -dp / d;       // k > 0: cùng chiều; k < 0: ngược chiều
    return { dp, k, virt: dp < 0, inf: false };
  };
  const mag = {
    NEAR,
    image,
    G25: (f) => NEAR / f,                                         // ngắm chừng ở vô cực
    Gnear: (f) => 1 + NEAR / f,                                   // ngắm chừng ở cực cận (mắt sát kính)
    dNear: (f) => NEAR * f / (NEAR + f),                          // vị trí vật khi ảnh ở cực cận
    G: (d) => NEAR / d,                                           // G = β/α = 25/d (mắt sát kính, tan góc)
    /* α, β theo phút cung với h, d cùng đơn vị (cm) */
    angles(h, d, f) { const a = Math.atan(h / NEAR), b = Math.atan(h / d); return { alpha: a, beta: b, G: Math.tan(b) / Math.tan(a) }; },
    arcmin: (rad) => rad * 180 / Math.PI * 60,
    alphaArcmin: (h, D) => Math.atan(h / D) * 180 / Math.PI * 60,
    /* mắt: tiêu cự thể thuỷ tinh để ảnh rơi đúng võng mạc (d′ = 1,7 cm); giới hạn ở cực cận */
    EYE: 1.7,
    fEye(d) { return d === Infinity ? this.EYE : d * this.EYE / (d + this.EYE); },
    selfTest() {
      const T = [], near = (a, b, e) => Math.abs(a - b) <= (e == null ? 1e-6 : e), add = (n, ok, got) => T.push({ name: n, ok: !!ok, got });
      let r = image(7.5, 5);
      add('Bài 10 VD1: d = 7,5, f = 5 ⇒ d′ = 15 cm, ảnh thật ngược chiều, h′ = 2 × 2 = 4 cm', near(r.dp, 15) && near(r.k, -2) && near(Math.abs(r.k) * 2, 4), r.dp);
      r = image(10, 5); add('Bài 10 VD2: d = 2f = 10 ⇒ d′ = 10 cm, h′ = h = 3 cm', near(r.dp, 10) && near(Math.abs(r.k) * 3, 3), r.dp);
      add('kính lúp f = 5 cm ⇒ G = 25/f = 5×', near(mag.G25(5), 5), mag.G25(5));
      r = image(3, 5); add('vật trong tiêu cự (d = 3, f = 5): ảnh ảo, cùng chiều, lớn hơn (d′ = −7,5; k = 2,5)', r.virt && near(r.dp, -7.5) && near(r.k, 2.5), r.dp);
      r = image(5, 5); add('d = f ⇒ ảnh ở vô cực (ngắm chừng ở vô cực)', r.inf && r.dp === Infinity, r.dp);
      add('ngắm chừng ở cực cận: d = 25f/(25+f) cho |d′| = 25 cm', near(Math.abs(image(mag.dNear(5), 5).dp), 25, 1e-9), mag.dNear(5));
      add('G (cực cận) = 1 + 25/f = 6 với f = 5 cm', near(mag.Gnear(5), 6) && near(mag.G(mag.dNear(5)), 6, 1e-9), mag.Gnear(5));
      const a = mag.angles(0.1, 5, 5); add('G = tanβ/tanα = 25/d = 5 khi d = f = 5 cm', near(a.G, 5, 1e-9), a.G);
      add('vật 0,1 mm ở 25 cm: α ≈ 1,38′ (≥ ε = 1′: nhìn được); vật 0,05 mm: ≈ 0,69′ (< 1′); qua kính 5×: ≈ 3,4′', near(mag.alphaArcmin(0.01, 25), 1.375, 0.01) && mag.alphaArcmin(0.005, 25) < 1 && mag.alphaArcmin(0.005, 25) * 5 > 3, mag.alphaArcmin(0.01, 25));
      add('điều tiết: f mắt giảm từ 1,7 cm (vô cực) xuống ≈ 1,59 cm (25 cm)', near(mag.fEye(Infinity), 1.7) && near(mag.fEye(25), 1.5918, 1e-3) && mag.fEye(25) < mag.fEye(100), mag.fEye(25));
      return T;
    }
  };
  L.engine.mag = mag;
  const prevSelf = L.engine.selfTest; L.engine.selfTest = function () { return prevSelf().concat(mag.selfTest()); };

  /* ---------------------------------------------------------------- W10.1 KÍNH LÚP */
  function glass(body, o) {
    o = Object.assign({ f: 5, d: 3.5 }, o || {});
    const id = 'om' + (++uid), PX = 11, cx = 410, CY = 150, H = 1.5;
    const S = { f: o.f, d: o.d, snap: true };
    body.innerHTML = '<div class="olab" data-lab="' + id + '"><p class="olab__hint">' + pr('Kéo vật AB (mũi tên xanh) lại gần hoặc ra xa kính; kéo thanh trượt f để đổi kính. Ảnh ảo vẽ nét đứt. Thử đưa vật đến đúng tiêu điểm F và đến vị trí cho ảnh ở điểm cực cận (25 cm).', 'Drag the object AB (blue arrow) towards or away from the lens; use the f slider to change the lens. The virtual image is dashed. Try putting the object exactly at F and at the place that puts the image at the near point (25 cm).') + '</p>' +
      '<div class="olab__cols"><div class="olab__stage"><svg class="olab__svg" viewBox="0 0 560 290" role="group" aria-label="Kính lúp: vật, thấu kính, ảnh ảo / Magnifier: object, lens, virtual image">' +
      '<line x1="10" y1="150" x2="550" y2="150" class="olab__axis"/><path data-r="lens" class="olab__lens olab__lens--conv"/>' +
      '<line data-r="vray1" class="olab__ray olab__ray--refr" stroke-dasharray="5 4"/><line data-r="vray2" class="olab__ray olab__ray--refr" stroke-dasharray="5 4"/>' +
      '<line data-r="ray1a" class="olab__ray olab__ray--inc"/><line data-r="ray1b" class="olab__ray olab__ray--refr"/><line data-r="ray2a" class="olab__ray olab__ray--inc"/><line data-r="ray2b" class="olab__ray olab__ray--refr"/>' +
      '<g data-r="imgG"><line data-r="img" class="olab__img olab__img--virt" stroke-dasharray="4 3"/><polygon data-r="imgH" class="olab__head--imgv"/><text data-r="imgT" class="olab__lab olab__lab--img"></text></g>' +
      '<line data-r="obj" class="olab__obj" stroke-width="4"/><polygon data-r="objH" class="olab__head--obj"/><text data-r="objA" class="olab__lab" text-anchor="middle">A</text><text data-r="objB" class="olab__lab" text-anchor="middle">B</text>' +
      '<circle data-r="Fl" r="3.6" class="olab__focus"/><circle data-r="Fr" r="3.6" class="olab__focus"/><text data-r="FlT" class="olab__lab" text-anchor="middle">F</text><text data-r="FrT" class="olab__lab" text-anchor="middle">F′</text><text x="' + cx + '" y="172" class="olab__lab" text-anchor="middle">O</text>' +
      '<g data-r="eye"><ellipse cx="528" cy="150" rx="12" ry="18" fill="#fff" stroke="currentColor" stroke-width="2"/><circle cx="525" cy="150" r="5" fill="#1f46d0"/></g>' +
      '<g data-h="obj" data-r="oh" tabindex="0" role="slider" aria-label="Vị trí vật, khoảng cách d (cm) / Object position, distance d (cm)" aria-valuemin="0.5" aria-valuemax="14" class="olab__hd olab__hd--src"><circle r="32" class="olab__hit"/><circle r="9" class="olab__dot"/></g></svg></div>' +
      '<div class="olab__panel"><label class="olab__ctl"><span>f = <output data-out="f"></output> cm</span><input type="range" data-k="f" min="2" max="10" step="0.5"></label>' +
      '<label class="olab__ctl"><span>d = <output data-out="d"></output> cm</span><input type="range" data-k="d" min="0.5" max="14" step="0.1"></label>' +
      '<label class="olab__ctl"><input type="checkbox" data-k="snap" checked> ' + pr('Bắt dính d = f và ảnh ở 25 cm', 'Snap to d = f and image at 25 cm') + '</label>' +
      '<div class="olab__btns"><button type="button" class="btn btn--sm" data-act="inf">' + pr('Ngắm chừng ở vô cực', 'Relaxed (image at ∞)') + '</button><button type="button" class="btn btn--sm" data-act="near">' + pr('Ngắm chừng ở cực cận', 'Near-point viewing') + '</button><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button></div><div class="olab__read" data-r="read" aria-live="polite"></div></div></div><p class="olab__status" data-r="status" role="status"></p></div>';
    const lab = body.querySelector('[data-lab="' + id + '"]'), svg = $('.olab__svg', lab), q = (n) => $('[data-r="' + n + '"]', svg);
    const lensD = (h) => { const w = 14; return 'M' + cx + ' ' + (CY - h) + ' Q ' + (cx + w * 2) + ' ' + CY + ' ' + cx + ' ' + (CY + h) + ' Q ' + (cx - w * 2) + ' ' + CY + ' ' + cx + ' ' + (CY - h) + ' Z'; };
    const head = (x, y, up) => { const s = up ? -1 : 1; return (x - 6) + ',' + (y - s * -9 * 0 + (up ? 10 : -10)) + ' ' + x + ',' + y + ' ' + (x + 6) + ',' + (y + (up ? 10 : -10)); };
    function draw() {
      const f = S.f, d = S.d, r = image(d, f), xO = cx - d * PX, yT = CY - H * PX, FP = f * PX;
      setA(q('lens'), { d: lensD(82) });
      setA(q('obj'), { x1: xO, y1: CY, x2: xO, y2: yT + 8 }); setA(q('objH'), { points: head(xO, yT, true) });
      setA(q('objA'), { x: xO, y: CY + 18 }); q('objA').textContent = 'A'; setA(q('objB'), { x: xO, y: yT - 8 }); q('objB').textContent = 'B';
      setA(q('Fl'), { cx: cx - FP, cy: CY }); setA(q('Fr'), { cx: cx + FP, cy: CY }); setA(q('FlT'), { x: cx - FP, y: CY + 18 }); setA(q('FrT'), { x: cx + FP, y: CY + 18 });
      setA(q('oh'), { transform: 'translate(' + xO + ',' + CY + ')', 'aria-valuenow': d.toFixed(1), 'aria-valuetext': 'd = ' + fmt(d, 1) + ' cm' });
      // tia 1: song song trục -> qua F′ ; tia 2: qua O
      const yAtX = (x, y0, x0, y1, x1) => y0 + (y1 - y0) * (x - x0) / (x1 - x0);
      setA(q('ray1a'), { x1: xO, y1: yT, x2: cx, y2: yT });
      const xe = 520, y1e = yAtX(xe, yT, cx, CY, cx + FP);
      setA(q('ray1b'), { x1: cx, y1: yT, x2: xe, y2: y1e });
      setA(q('ray2a'), { x1: xO, y1: yT, x2: cx, y2: CY });
      const y2e = yAtX(xe, yT, xO, CY, cx); setA(q('ray2b'), { x1: cx, y1: CY, x2: xe, y2: y2e });
      const G = q('imgG'); G.style.display = 'none'; setA(q('vray1'), { x1: 0, y1: 0, x2: 0, y2: 0 }); setA(q('vray2'), { x1: 0, y1: 0, x2: 0, y2: 0 });
      let stat = '', warn = false;
      const dTip = mag.dNear(f);
      if (r.inf) { stat = pr('d = f: các tia ló song song, ảnh ở vô cực — ngắm chừng ở vô cực, mắt không phải điều tiết. G = 25/f.', 'd = f: the emergent rays are parallel, the image is at infinity — relaxed viewing, the eye need not accommodate. G = 25/f.'); }
      else if (r.virt) {
        const xi = cx + r.dp * PX, yi = CY - r.k * H * PX;
        G.style.display = ''; setA(q('img'), { x1: xi, y1: CY, x2: xi, y2: yi }); setA(q('imgH'), { points: head(xi, yi, true) }); setA(q('imgT'), { x: xi, y: CY + 18 }); q('imgT').textContent = 'A′B′';
        setA(q('vray1'), { x1: cx, y1: yT, x2: xi, y2: yi }); setA(q('vray2'), { x1: xO, y1: yT, x2: xi, y2: yi });
        const dist = Math.abs(r.dp);
        if (dist < NEAR - 0.5) { warn = true; stat = pr('Ảnh ảo ở cách kính ' + fmt(dist, 1) + ' cm, gần hơn điểm cực cận (25 cm): mắt thường không nhìn rõ. Đưa vật lại gần tiêu điểm hơn.', 'The virtual image is ' + fmt(dist, 1) + ' cm from the lens, closer than the near point (25 cm): a normal eye cannot see it clearly. Move the object closer to F.'); }
        else stat = pr('Ảnh ảo, cùng chiều, lớn hơn vật, nằm trong khoảng nhìn rõ của mắt (25 cm đến vô cực): quan sát được.', 'A virtual, upright, magnified image inside the eye’s clear-vision range (25 cm to infinity): you can see it.');
      } else {
        warn = true;
        const xi = cx + r.dp * PX; if (xi < 505 && xi > cx) { G.style.display = ''; const yi = CY - r.k * H * PX; setA(q('img'), { x1: xi, y1: CY, x2: xi, y2: yi, 'stroke-dasharray': '' }); setA(q('imgH'), { points: head(xi, yi, yi < CY) }); setA(q('imgT'), { x: xi, y: CY + 18 }); q('imgT').textContent = 'A′B′'; }
        stat = pr('Vật ngoài tiêu cự (d > f): ảnh thật, ngược chiều — không phải cách dùng kính lúp. Phải đặt vật trong khoảng từ O đến F (d < f).', 'Object outside the focus (d > f): a real, inverted image — not how a magnifier works. Put the object between O and F (d < f).');
      }
      lab.querySelector('[data-r="status"]').innerHTML = stat; lab.querySelector('[data-r="status"]').classList.toggle('olab__status--warn', warn);
      const dp = r.inf ? '∞' : fmt(r.dp, 1) + ' cm' + (r.virt ? ' (ảo / virtual)' : ' (thật / real)'), k = r.inf ? '∞' : fmt(r.k, 2);
      const a = mag.angles(H, d, f), al = mag.arcmin(a.alpha), be = mag.arcmin(a.beta);
      $('[data-r="read"]', lab).innerHTML = '<table class="olab__tbl olab__tbl--read"><tbody><tr><th scope="row">d</th><td>' + fmt(d, 1) + ' cm</td></tr><tr><th scope="row">d′</th><td>' + dp + '</td></tr><tr><th scope="row">k = −d′/d</th><td>' + k + '</td></tr>' +
        '<tr><th scope="row">α (vật ở 25 cm)</th><td>' + fmt(al, 0) + '′</td></tr><tr><th scope="row">β (qua kính)</th><td>' + fmt(be, 0) + '′</td></tr><tr><th scope="row">G = β/α = 25/d</th><td><b>' + fmt(a.G, 2) + '</b></td></tr><tr><th scope="row">25/f</th><td>' + fmt(mag.G25(f), 1) + '×</td></tr></tbody></table>';
      ['f', 'd'].forEach((kk) => { $('[data-k="' + kk + '"]', lab).value = S[kk]; $('[data-out="' + kk + '"]', lab).textContent = fmt(S[kk], 1); });
    }
    const redraw = raf(draw);
    const setD = (v) => { v = clamp(v, 0.5, 14); if (S.snap) { const t = [S.f, mag.dNear(S.f)]; t.forEach((x) => { if (Math.abs(v - x) < 0.12) v = x; }); } S.d = Math.round(v * 1000) / 1000; redraw(); };
    makeDrag(svg, { obj: { move(x) { setD((cx - x) / PX); }, key(dir) { setD(S.d + dir * 0.1); } } });
    lab.addEventListener('input', (e) => { const k = e.target.dataset && e.target.dataset.k; if (!k) return; if (k === 'snap') S.snap = e.target.checked; else if (k === 'd') setD(+e.target.value); else { S[k] = +e.target.value; redraw(); } });
    lab.addEventListener('click', (e) => { const a = e.target.closest('[data-act]'); if (!a) return; if (a.dataset.act === 'inf') { S.d = S.f; draw(); } else if (a.dataset.act === 'near') { S.d = Math.round(mag.dNear(S.f) * 1000) / 1000; draw(); } else { S.f = o.f; S.d = o.d; draw(); } });
    draw(); return { state: S };
  }

  /* ---------------------------------------------------------------- W10.2 GÓC TRÔNG VẬT VÀ NĂNG SUẤT PHÂN LI */
  function angle(body) {
    const id = 'oa' + (++uid), S = { h: 0.1, D: 25, eps: 1, lens: false, f: 5 };
    body.innerHTML = '<div class="olab" data-lab="' + id + '"><p class="olab__hint">' + pr('Kéo vật ra xa hoặc lại gần mắt, đổi kích thước vật h (mm) và năng suất phân li ε của mắt. Mắt chỉ phân biệt hai đầu A, B khi góc trông vật α ≥ ε. Bật kính lúp để xem góc trông ảnh β = G·α.', 'Drag the object away from or towards the eye, change its size h (mm) and the eye’s resolving power ε. The eye resolves A and B only if the visual angle α ≥ ε. Turn the magnifier on to see β = G·α.') + '</p>' +
      '<div class="olab__cols"><div class="olab__stage"><svg class="olab__svg" viewBox="0 0 560 220" role="group" aria-label="Góc trông vật / Visual angle">' +
      '<ellipse cx="500" cy="110" rx="16" ry="22" fill="#fff" stroke="currentColor" stroke-width="2"/><circle cx="496" cy="110" r="6" fill="#1f46d0"/>' +
      '<line data-r="r1" class="olab__ray olab__ray--inc"/><line data-r="r2" class="olab__ray olab__ray--inc"/><path data-r="arc" fill="none" stroke="#6c4be8" stroke-width="2"/><text data-r="aT" class="olab__lab" fill="#6c4be8"></text>' +
      '<line data-r="ob" class="olab__obj" stroke-width="5"/><text data-r="oT" class="olab__lab" text-anchor="middle"></text><rect data-r="lensIcon" width="8" height="70" rx="4" class="olab__lens olab__lens--conv" style="display:none"/>' +
      '<g data-h="ob" data-r="oh" tabindex="0" role="slider" aria-label="Khoảng cách từ vật đến mắt (cm) / Distance from object to eye (cm)" aria-valuemin="10" aria-valuemax="100" class="olab__hd olab__hd--src"><circle r="32" class="olab__hit"/><circle r="9" class="olab__dot"/></g></svg></div>' +
      '<div class="olab__panel"><label class="olab__ctl"><span>h = <output data-out="h"></output> mm</span><input type="range" data-k="h" min="0.02" max="1" step="0.01"></label><label class="olab__ctl"><span>D = <output data-out="D"></output> cm</span><input type="range" data-k="D" min="10" max="100" step="1"></label>' +
      '<label class="olab__ctl"><span>ε = <output data-out="eps"></output>′</span><input type="range" data-k="eps" min="0.5" max="3" step="0.1"></label><label class="olab__ctl"><input type="checkbox" data-k="lens"> ' + pr('Dùng kính lúp (ngắm chừng ở vô cực)', 'Use a magnifier (relaxed viewing)') + '</label>' +
      '<label class="olab__ctl"><span>f = <output data-out="f"></output> cm</span><input type="range" data-k="f" min="1" max="10" step="0.5"></label><div class="olab__btns"><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button></div><div class="olab__read" data-r="read" aria-live="polite"></div></div></div><p class="olab__status" data-r="status" role="status"></p></div>';
    const lab = body.querySelector('[data-lab="' + id + '"]'), svg = $('.olab__svg', lab), q = (n) => $('[data-r="' + n + '"]', svg);
    const X0 = 484, SC = 4;                        // 4 px mỗi cm
    function draw() {
      const x = X0 - S.D * SC, hpx = clamp(S.h * 40, 6, 80), yT = 110 - hpx / 2, yB = 110 + hpx / 2;
      setA(q('ob'), { x1: x, y1: yT, x2: x, y2: yB }); setA(q('oT'), { x: x, y: yB + 20 }); q('oT').textContent = 'AB';
      setA(q('r1'), { x1: x, y1: yT, x2: 486, y2: 110 }); setA(q('r2'), { x1: x, y1: yB, x2: 486, y2: 110 });
      const R = 60, ang = Math.atan2(hpx / 2, 486 - x), ax1 = 486 - R * Math.cos(ang), ay1 = 110 - R * Math.sin(ang), ay2 = 110 + R * Math.sin(ang);
      setA(q('arc'), { d: 'M' + ax1.toFixed(1) + ' ' + ay1.toFixed(1) + ' A' + R + ' ' + R + ' 0 0 0 ' + ax1.toFixed(1) + ' ' + ay2.toFixed(1) }); setA(q('aT'), { x: ax1 - 20, y: 114 }); q('aT').textContent = S.lens ? 'β' : 'α';
      const li = q('lensIcon'); li.style.display = S.lens ? '' : 'none'; setA(li, { x: 486 - 26, y: 75 });
      setA(q('oh'), { transform: 'translate(' + x + ',110)', 'aria-valuenow': S.D });
      const hcm = S.h / 10, alpha = mag.alphaArcmin(hcm, S.D), G = S.lens ? mag.G25(S.f) : 1, beta = Math.atan(Math.tan(alpha / 60 * Math.PI / 180) * G) * 180 / Math.PI * 60, ok = beta >= S.eps;
      $('[data-r="read"]', lab).innerHTML = '<table class="olab__tbl olab__tbl--read"><tbody><tr><th scope="row">α = h/D</th><td>' + fmt(alpha, 2) + '′</td></tr>' + (S.lens ? '<tr><th scope="row">G = 25/f</th><td>' + fmt(G, 1) + '×</td></tr><tr><th scope="row">β = G·α</th><td>' + fmt(beta, 2) + '′</td></tr>' : '') + '<tr><th scope="row">ε</th><td>' + fmt(S.eps, 1) + '′</td></tr></tbody></table>';
      const st = lab.querySelector('[data-r="status"]'); st.innerHTML = ok ? pr('Góc trông ≥ ε: mắt phân biệt được hai đầu A, B của vật.', 'The visual angle ≥ ε: the eye can tell A and B apart.') : pr('Góc trông < ε: hai đầu A, B nhoà thành một điểm. Hãy lại gần hơn hoặc dùng kính lúp.', 'The visual angle < ε: A and B blur into one point. Move closer or use the magnifier.'); st.classList.toggle('olab__status--warn', !ok);
      [['h', 2], ['D', 0], ['eps', 1], ['f', 1]].forEach((p) => { $('[data-k="' + p[0] + '"]', lab).value = S[p[0]]; $('[data-out="' + p[0] + '"]', lab).textContent = fmt(S[p[0]], p[1]); }); $('[data-k="lens"]', lab).checked = S.lens;
    }
    const redraw = raf(draw);
    makeDrag(svg, { ob: { move(x) { S.D = clamp(Math.round((X0 - x) / SC), 10, 100); redraw(); }, key(dir) { S.D = clamp(S.D - dir, 10, 100); redraw(); } } });
    lab.addEventListener('input', (e) => { const k = e.target.dataset && e.target.dataset.k; if (!k) return; S[k] = k === 'lens' ? e.target.checked : +e.target.value; redraw(); });
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-act="reset"]')) { Object.assign(S, { h: 0.1, D: 25, eps: 1, lens: false, f: 5 }); draw(); } });
    draw(); return { state: S };
  }

  /* ---------------------------------------------------------------- W10.3 DỰNG ẢNH TRÊN GIẤY KẺ Ô */
  function scale(body, o) {
    o = Object.assign({ h: 2, d: 7.5, f: 5, task: 1 }, o || {});
    const id = 'os' + (++uid), PX = 25, cx = 300, CY = 150, GX0 = 25, GX1 = 575, GY0 = 20, GY1 = 280;    // 1 ô = 1 cm = 25 px
    const S = { h: o.h, d: o.d, f: o.f, bx: null, by: null, r1: true, r2: true, solved: false, msg: '' };
    const preset = (t) => t === 2 ? { h: 3, d: 10, f: 5 } : { h: 2, d: 7.5, f: 5 };
    body.innerHTML = '<div class="olab" data-lab="' + id + '"><p class="olab__hint">' + pr('Giấy kẻ ô: 1 ô = 1 cm. Kéo B (đỉnh vật), F để đặt đề; hai tia đặc biệt đã vẽ sẵn. Kéo điểm đỏ B′ tới chỗ em dự đoán là đỉnh ảnh rồi bấm “Kiểm tra”.', 'Graph paper: 1 cell = 1 cm. Drag B (object tip) and F to set up the problem; the two special rays are drawn. Drag the red point B′ to where you think the image tip is, then press “Check”.') + '</p>' +
      '<div class="olab__btns"><button type="button" class="btn btn--sm" data-task="1">' + pr('Bài 1: h = 2 cm, d = 7,5 cm, f = 5 cm', 'Task 1: h = 2 cm, d = 7.5 cm, f = 5 cm') + '</button><button type="button" class="btn btn--sm" data-task="2">' + pr('Bài 2: h = 3 cm, d = 2f, f = 5 cm', 'Task 2: h = 3 cm, d = 2f, f = 5 cm') + '</button></div>' +
      '<div class="olab__cols"><div class="olab__stage"><svg class="olab__svg" viewBox="0 0 600 300" role="group" aria-label="Giấy kẻ ô dựng ảnh / Graph paper image construction"><g data-r="grid"></g>' +
      '<line x1="' + GX0 + '" y1="' + CY + '" x2="' + GX1 + '" y2="' + CY + '" class="olab__axis"/><path data-r="lens" class="olab__lens olab__lens--conv"/>' +
      '<line data-r="a1" class="olab__ray olab__ray--inc"/><line data-r="a2" class="olab__ray olab__ray--refr"/><line data-r="b1" class="olab__ray olab__ray--inc"/><line data-r="b2" class="olab__ray olab__ray--refr"/>' +
      '<line data-r="sol" class="olab__img" style="display:none"/><line data-r="obj" class="olab__obj" stroke-width="4"/><polygon data-r="objH" class="olab__head--obj"/><text data-r="ta" class="olab__lab" text-anchor="middle">A</text><text data-r="tb" class="olab__lab" text-anchor="middle">B</text>' +
      '<circle data-r="F1" r="4" class="olab__focus"/><circle data-r="F2" r="4" class="olab__focus"/><text data-r="tF1" class="olab__lab" text-anchor="middle">F</text><text data-r="tF2" class="olab__lab" text-anchor="middle">F′</text><text x="' + cx + '" y="' + (CY + 16) + '" class="olab__lab" text-anchor="middle">O</text>' +
      '<g data-h="B" data-r="hB" tabindex="0" role="slider" aria-label="Đỉnh vật B: kéo để đổi d và h / Object tip B: drag to change d and h" class="olab__hd olab__hd--src"><circle r="32" class="olab__hit"/><circle r="8" class="olab__dot"/></g>' +
      '<g data-h="F" data-r="hF" tabindex="0" role="slider" aria-label="Tiêu điểm F: kéo để đổi f / Focus F: drag to change f" class="olab__hd"><circle r="32" class="olab__hit"/><circle r="7" class="olab__dot"/></g>' +
      '<g data-h="Bp" data-r="hBp" tabindex="0" role="slider" aria-label="Đỉnh ảnh B′ em dự đoán / Your guess for the image tip B′" class="olab__hd olab__hd--img"><circle r="32" class="olab__hit"/><circle r="8" class="olab__dot"/><text y="-14" class="olab__lab" text-anchor="middle">B′?</text></g></svg></div>' +
      '<div class="olab__panel"><div class="olab__btns"><button type="button" class="btn btn--sm" data-act="chk">' + pr('Kiểm tra', 'Check') + '</button><button type="button" class="btn btn--sm" data-act="show">' + pr('Hiện lời giải', 'Show solution') + '</button><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button></div><label class="olab__ctl"><input type="checkbox" data-k="snap" checked> ' + pr('Bắt dính ô 0,5 cm', 'Snap to 0.5 cm') + '</label><div class="olab__read" data-r="read" aria-live="polite"></div></div></div><p class="olab__status" data-r="status" role="status"></p></div>';
    const lab = body.querySelector('[data-lab="' + id + '"]'), svg = $('.olab__svg', lab), q = (n) => $('[data-r="' + n + '"]', svg);
    let snap = true; const U = (cm) => cm * PX;
    let gh = ''; for (let x = GX0; x <= GX1; x += PX) gh += '<line x1="' + x + '" y1="' + GY0 + '" x2="' + x + '" y2="' + GY1 + '" class="olab__gridline"/>'; for (let y = GY0 - 5 + 5; y <= GY1; y += PX) gh += '<line x1="' + GX0 + '" y1="' + y + '" x2="' + GX1 + '" y2="' + y + '" class="olab__gridline"/>'; q('grid').innerHTML = gh;
    const lensD = () => 'M' + cx + ' 28 Q ' + (cx + 28) + ' ' + CY + ' ' + cx + ' 272 Q ' + (cx - 28) + ' ' + CY + ' ' + cx + ' 28 Z';
    function truth() { const r = image(S.d, S.f); return { dp: r.dp, hp: r.k * S.h, r }; }
    function draw() {
      const xO = cx - U(S.d), yB = CY - U(S.h), FP = U(S.f);
      setA(q('lens'), { d: lensD() }); setA(q('obj'), { x1: xO, y1: CY, x2: xO, y2: yB + 8 }); setA(q('objH'), { points: (xO - 6) + ',' + (yB + 10) + ' ' + xO + ',' + yB + ' ' + (xO + 6) + ',' + (yB + 10) });
      setA(q('ta'), { x: xO, y: CY + 16 }); setA(q('tb'), { x: xO, y: yB - 8 });
      setA(q('F1'), { cx: cx - FP, cy: CY }); setA(q('F2'), { cx: cx + FP, cy: CY }); setA(q('tF1'), { x: cx - FP, y: CY + 16 }); setA(q('tF2'), { x: cx + FP, y: CY + 16 });
      const show = S.solved, vis = (e, on) => { e.style.display = on ? '' : 'none'; };
      ['a1', 'a2', 'b1', 'b2'].forEach((n) => vis(q(n), show));
      if (show) {
        setA(q('a1'), { x1: xO, y1: yB, x2: cx, y2: yB }); const xe = GX1, ye = yB + (CY - yB) * (xe - cx) / FP; setA(q('a2'), { x1: cx, y1: yB, x2: xe, y2: ye });
        setA(q('b1'), { x1: xO, y1: yB, x2: cx, y2: CY }); const y2e = yB + (CY - yB) * (xe - xO) / (cx - xO); setA(q('b2'), { x1: cx, y1: CY, x2: xe, y2: y2e });
      }
      const t = truth(), ok = isFinite(t.dp);
      const sol = q('sol'); vis(sol, show && ok && t.dp > 0); if (show && ok && t.dp > 0) setA(sol, { x1: cx + U(t.dp), y1: CY, x2: cx + U(t.dp), y2: CY - U(t.hp) });
      if (S.bx == null) { S.bx = 3; S.by = -1; }
      setA(q('hB'), { transform: 'translate(' + xO + ',' + yB + ')' }); setA(q('hF'), { transform: 'translate(' + (cx - FP) + ',' + CY + ')' }); setA(q('hBp'), { transform: 'translate(' + (cx + U(S.bx)) + ',' + (CY - U(S.by)) + ')' });
      $('[data-r="read"]', lab).innerHTML = '<table class="olab__tbl olab__tbl--read"><tbody><tr><th scope="row">h</th><td>' + fmt(S.h, 1) + ' cm</td></tr><tr><th scope="row">d</th><td>' + fmt(S.d, 1) + ' cm</td></tr><tr><th scope="row">f</th><td>' + fmt(S.f, 1) + ' cm</td></tr>' + (show ? '<tr><th scope="row">d′</th><td><b>' + (ok ? fmt(t.dp, 1) + ' cm' : '∞') + '</b></td></tr><tr><th scope="row">h′</th><td><b>' + (ok ? fmt(Math.abs(t.hp), 1) + ' cm' : '∞') + '</b></td></tr>' : '') + '</tbody></table>';
      const st = lab.querySelector('[data-r="status"]'); st.innerHTML = S.msg ? pr(S.msg[0], S.msg[1]) : ''; st.classList.toggle('olab__status--warn', S.msg && S.msg[2] === 'bad'); st.classList.toggle('olab__status--ok', S.msg && S.msg[2] === 'ok');
    }
    const redraw = raf(draw), sn = (v) => (snap ? Math.round(v * 2) / 2 : Math.round(v * 10) / 10);
    makeDrag(svg, {
      B: { move(x, y) { S.d = clamp(sn((cx - x) / PX), 0.5, 11); S.h = clamp(sn((CY - y) / PX), 0.5, 5); S.solved = false; S.msg = ''; redraw(); }, key(dir, sh, ax) { if (ax === 'y') S.h = clamp(S.h + dir * 0.5, 0.5, 5); else S.d = clamp(S.d - dir * 0.5, 0.5, 11); S.solved = false; redraw(); } },
      F: { move(x) { S.f = clamp(sn((cx - x) / PX), 1, 10); S.solved = false; S.msg = ''; redraw(); }, key(dir) { S.f = clamp(S.f - dir * 0.5, 1, 10); redraw(); } },
      Bp: { move(x, y) { S.bx = clamp(sn((x - cx) / PX), -10, 10); S.by = clamp(sn((CY - y) / PX), -5.5, 5.5); redraw(); }, key(dir, sh, ax) { if (ax === 'y') S.by += dir * 0.5; else S.bx += dir * 0.5; redraw(); } }
    });
    lab.addEventListener('input', (e) => { if (e.target.dataset && e.target.dataset.k === 'snap') snap = e.target.checked; });
    lab.addEventListener('click', (e) => {
      const tk = e.target.closest('[data-task]'), a = e.target.closest('[data-act]');
      if (tk) { Object.assign(S, preset(+tk.dataset.task), { solved: false, msg: '' }); S.bx = 3; S.by = -1; draw(); return; }
      if (!a) return; const t = truth();
      if (a.dataset.act === 'show') { S.solved = true; S.msg = ['Lời giải: hai tia đặc biệt cắt nhau tại B′. Đọc trên giấy kẻ ô và so với d′ = d·f/(d − f).', 'Solution: the two special rays meet at B′. Read it off the grid and compare with d′ = d·f/(d − f).']; }
      else if (a.dataset.act === 'chk') {
        if (!isFinite(t.dp)) S.msg = ['Vật đặt tại F: ảnh ở vô cực, không có điểm B′ để đánh dấu.', 'Object at F: the image is at infinity, so there is no B′ to mark.', 'bad'];
        else if (t.dp < 0) S.msg = ['Ảnh ảo nằm cùng phía với vật (d′ = ' + fmt(t.dp, 1) + ' cm); đặt B′ ở phía bên trái kính, trên đường kéo dài của các tia.', 'The image is virtual, on the same side as the object (d′ = ' + fmt(t.dp, 1) + ' cm); put B′ on the left, on the extended rays.', 'bad'];
        else { const ex = t.dp, ey = t.hp, dist = Math.hypot(S.bx - ex, S.by - ey); S.msg = dist <= 0.55 ? ['Đúng! Ảnh thật, ngược chiều, d′ = ' + fmt(t.dp, 1) + ' cm và h′ = ' + fmt(Math.abs(t.hp), 1) + ' cm.', 'Correct! A real, inverted image with d′ = ' + fmt(t.dp, 1) + ' cm and h′ = ' + fmt(Math.abs(t.hp), 1) + ' cm.', 'ok'] : ['Chưa đúng: B′ phải ở giao điểm của tia song song trục (qua F′) và tia qua O. Bấm “Hiện lời giải” để xem.', 'Not yet: B′ is where the ray parallel to the axis (through F′) meets the ray through O. Press “Show solution”.', 'bad']; if (dist <= 0.55) S.solved = true; }
      } else { Object.assign(S, preset(1), { solved: false, msg: '' }); S.bx = 3; S.by = -1; }
      draw();
    });
    draw(); return { state: S };
  }

  /* ---------------------------------------------------------------- W10.4 ĐIỀU TIẾT CỦA MẮT */
  function eye(body) {
    const id = 'oe' + (++uid), S = { D: 100 };
    body.innerHTML = '<div class="olab" data-lab="' + id + '"><p class="olab__hint">' + pr('Kéo vật gần hoặc xa mắt. Thể thuỷ tinh tự phồng lên (tiêu cự giảm) để ảnh rơi đúng trên võng mạc — đó là sự điều tiết. Gần hơn 25 cm (điểm cực cận), mắt không điều tiết được nữa và ảnh mờ.', 'Drag the object near or far. The eye lens bulges (shorter focal length) to keep the image on the retina — accommodation. Closer than 25 cm (the near point) the eye cannot accommodate further and the image blurs.') + '</p>' +
      '<div class="olab__cols"><div class="olab__stage"><svg class="olab__svg" viewBox="0 0 560 240" role="group" aria-label="Mô hình mắt / Eye model"><rect x="150" y="40" width="300" height="160" rx="70" fill="#fff" stroke="currentColor" stroke-width="2.5"/>' +
      '<path d="M410 55 Q440 120 410 185" fill="none" stroke="#e0393e" stroke-width="5"/><text x="430" y="30" class="olab__lab">võng mạc / retina</text><path data-r="lens" class="olab__lens olab__lens--conv"/><line x1="10" y1="120" x2="450" y2="120" class="olab__axis"/>' +
      '<line data-r="r1" class="olab__ray olab__ray--inc"/><line data-r="r2" class="olab__ray olab__ray--refr"/><line data-r="r3" class="olab__ray olab__ray--inc"/><line data-r="r4" class="olab__ray olab__ray--refr"/>' +
      '<line data-r="ob" class="olab__obj" stroke-width="4"/>' +
      '<g data-h="ob" data-r="oh" tabindex="0" role="slider" aria-label="Khoảng cách vật đến mắt (cm) / Object distance (cm)" aria-valuemin="10" aria-valuemax="200" class="olab__hd olab__hd--src"><circle r="32" class="olab__hit"/><circle r="9" class="olab__dot"/></g></svg></div>' +
      '<div class="olab__panel"><label class="olab__ctl"><span>d = <output data-out="D"></output> cm</span><input type="range" data-k="D" min="10" max="200" step="1"></label><div class="olab__btns"><button type="button" class="btn btn--sm" data-act="far">' + pr('Vật ở xa', 'Far object') + '</button><button type="button" class="btn btn--sm" data-act="near">' + pr('Vật ở 25 cm', 'Object at 25 cm') + '</button></div><div class="olab__read" data-r="read" aria-live="polite"></div></div></div><p class="olab__status" data-r="status" role="status"></p></div>';
    const lab = body.querySelector('[data-lab="' + id + '"]'), svg = $('.olab__svg', lab), q = (n) => $('[data-r="' + n + '"]', svg);
    const LX = 190, CYy = 120, RX = 410, DEYE = mag.EYE, PXc = (RX - LX) / DEYE, OBJH = 36;
    const xOf = (d) => 160 - (d - 10) * 0.7;
    function draw() {
      const d = S.D, fmin = mag.fEye(NEAR), f = d >= NEAR ? mag.fEye(d) : fmin, dp = d * f / (d - f), blurry = d < NEAR - 0.5;
      const bulge = 22 + (DEYE - f) / (DEYE - fmin) * 18, x = xOf(d), yB = CYy - OBJH, xi = LX + dp * PXc;
      setA(q('lens'), { d: 'M' + LX + ' 70 Q ' + (LX + bulge * 1.6) + ' ' + CYy + ' ' + LX + ' 170 Q ' + (LX - bulge * 1.6) + ' ' + CYy + ' ' + LX + ' 70 Z' });
      setA(q('ob'), { x1: x, y1: CYy, x2: x, y2: yB }); setA(q('oh'), { transform: 'translate(' + x + ',' + CYy + ')', 'aria-valuenow': d });
      const tip = CYy + (CYy - yB) * (xi - LX) / (LX - x), xe = Math.min(xi, RX), at = (y0) => y0 + (tip - y0) * (xe - LX) / (xi - LX);
      setA(q('r1'), { x1: x, y1: yB, x2: LX, y2: yB }); setA(q('r2'), { x1: LX, y1: yB, x2: xe, y2: at(yB) });
      setA(q('r3'), { x1: x, y1: yB, x2: LX, y2: CYy }); setA(q('r4'), { x1: LX, y1: CYy, x2: xe, y2: at(CYy) });
      $('[data-r="read"]', lab).innerHTML = '<table class="olab__tbl olab__tbl--read"><tbody><tr><th scope="row">d</th><td>' + fmt(d, 0) + ' cm</td></tr><tr><th scope="row">f (thể thuỷ tinh / eye lens)</th><td><b>' + fmt(f, 3) + ' cm</b></td></tr><tr><th scope="row">d′</th><td>' + fmt(dp, 3) + ' cm (võng mạc / retina: ' + fmt(DEYE, 1) + ' cm)</td></tr></tbody></table>';
      const st = lab.querySelector('[data-r="status"]'); st.innerHTML = blurry ? pr('Vật gần hơn điểm cực cận: tiêu cự thể thuỷ tinh đã nhỏ nhất, ảnh rơi sau võng mạc nên bị mờ. Dùng kính lúp để nhìn rõ.', 'The object is closer than the near point: the lens is already at its shortest focal length, so the image falls behind the retina and is blurred. A magnifier helps.') : pr('Thể thuỷ tinh tự điều chỉnh để ảnh rõ nét trên võng mạc. Vật càng gần, tiêu cự càng nhỏ.', 'The eye lens adjusts so the image is sharp on the retina. The nearer the object, the shorter the focal length.'); st.classList.toggle('olab__status--warn', blurry);
      $('[data-k="D"]', lab).value = d; $('[data-out="D"]', lab).textContent = fmt(d, 0);
    }
    const redraw = raf(draw);
    makeDrag(svg, { ob: { move(x) { S.D = clamp(Math.round(10 + (160 - x) / 0.7), 10, 200); redraw(); }, key(dir) { S.D = clamp(S.D + dir * 5, 10, 200); redraw(); } } });
    lab.addEventListener('input', (e) => { if (e.target.dataset && e.target.dataset.k === 'D') { S.D = +e.target.value; draw(); } });
    lab.addEventListener('click', (e) => { const a = e.target.closest('[data-act]'); if (!a) return; S.D = a.dataset.act === 'far' ? 200 : 25; draw(); });
    draw(); return { state: S };
  }

  window.LabSims = Object.assign(window.LabSims || {}, {
    'omag-glass': { fn: glass, vi: 'Kính lúp (Hình 10.4, 10.5)', en: 'The magnifying glass (Figures 10.4, 10.5)', intro: 'Kéo vật trong khoảng từ O đến F để thấy ảnh ảo lớn hơn; đưa vật tới F để ngắm chừng ở vô cực.' },
    'omag-angle': { fn: angle, vi: 'Góc trông vật và năng suất phân li (Hình 10.2, 10.3)', en: 'Visual angle and resolving power (Figures 10.2, 10.3)', intro: 'Đổi kích thước và khoảng cách vật; so α với ε; bật kính lúp để thấy β = G·α.' },
    'omag-scale': { fn: scale, vi: 'Dựng ảnh trên giấy kẻ ô (Hình 10.6)', en: 'Scale drawing on graph paper (Figure 10.6)', intro: 'Đặt vật và tiêu điểm, đoán vị trí đỉnh ảnh B′ rồi kiểm tra bằng hai tia đặc biệt.' },
    'omag-eye': { fn: eye, vi: 'Sự điều tiết của mắt', en: 'Accommodation of the eye', intro: 'Kéo vật gần hoặc xa để xem thể thuỷ tinh thay đổi tiêu cự.' }
  });
})();
