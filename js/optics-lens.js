/* ==========================================================================
   OPTICS LENS — thấu kính, giá quang học (KHTN 9, Bài 8–9). Nạp SAU optics-lab.js.
   1. Mở rộng OpticsLab.engine (thuần dữ liệu): thinLens, lensRay, imageRays, benchBlur, silberman, bessel, besselPositions
   2. Thành phần kéo thả: lensLab (4 chế độ: class / rays / point / object) và bench (demo / silberman / bessel)
   3. Đăng ký vào window.LabSims (id olens-*, obench-*)
   Quy ước vật lí: trục x hướng sang phải, quang tâm O ở x = 0, y hướng lên; f > 0 hội tụ, f < 0 phân kì;
   vật ở x = −d. Mọi tia dùng phép biến đổi tia mỏng: góc nghiêng sau thấu kính θ′ = θ − y/f.
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab; if (!L) return;
  const E = L.engine, { makeDrag, fmt, pr, raf, clamp } = L;
  const $ = (s, r) => r.querySelector(s), $$ = (s, r) => Array.from(r.querySelectorAll(s));
  const setA = (el, o) => { if (!el) return; for (const k in o) el.setAttribute(k, o[k]); };
  let uid = 0;

  /* ------------------------------------------------------------------ ENGINE */
  Object.assign(E, {
    /* Công thức thấu kính mỏng: 1/f = 1/d + 1/d′ (d′ > 0: ảnh thật, phía sau; d′ < 0: ảnh ảo, cùng phía vật) */
    thinLens(o) {
      const f = o.f, d = o.d, h = o.h == null ? 1 : o.h;
      if (Math.abs(d - f) < 1e-9) return { inf: true, real: null, dp: Infinity, k: Infinity, hp: Infinity, upright: null, enlarged: null, label: 'inf' };
      const dp = d * f / (d - f), k = -dp / d;
      return { inf: false, dp, k, hp: k * h, real: dp > 0, upright: k > 0, enlarged: Math.abs(k) > 1, same: Math.abs(Math.abs(k) - 1) < 1e-9 };
    },
    /* Tia mỏng: tới thấu kính ở độ cao y1 với độ dốc th (tan góc, y tăng khi x tăng) → độ dốc sau thấu kính */
    lensRay(y1, th, f) { return th - y1 / f; },
    /* Dựng ảnh bằng tia đặc biệt cho điểm (−d, h). Trả về các tia: {y1 (độ cao tại thấu kính), th (độ dốc tới), thp (độ dốc ló)} */
    imageRays(d, h, f) {
      const rays = [{ k: 'O', y1: 0, th: -h / d }, { k: 'par', y1: h, th: 0 }];
      if (Math.abs(f - d) > 1e-9) { const th = h / (f - d); rays.push({ k: 'F', y1: h + th * d, th }); }
      rays.forEach((r) => { r.thp = E.lensRay(r.y1, r.th, f); });
      return rays;
    },
    /* độ nhoè (đơn vị: mm trên màn) khi màn ở xs (so với thấu kính), ảnh thật ở dp; khẩu độ a */
    benchBlur(xs, dp, a) { return !isFinite(dp) || dp <= 0 ? Infinity : a * Math.abs(xs - dp) / dp; },
    silberman(d, dp) { return (d + dp) / 4; },
    bessel(Ld, l) { return (Ld * Ld - l * l) / (4 * Ld); },
    besselPositions(Ld, f) { const D = Ld * Ld - 4 * Ld * f; if (D < 0) return null; const s = Math.sqrt(D); return [(Ld - s) / 2, (Ld + s) / 2]; },
    selfTestLens() {
      const T = [], near = (a, b, e) => Math.abs(a - b) <= (e == null ? 1e-6 : e), add = (n, ok, got) => T.push({ name: n, ok: !!ok, got });
      let r = E.thinLens({ f: 10, d: 20, h: 3 }); add('hội tụ d = 2f ⇒ d′ = 2f, k = −1, ảnh thật ngược chiều bằng vật', near(r.dp, 20) && near(r.k, -1) && r.real && !r.upright && r.same, r.dp);
      r = E.thinLens({ f: 10, d: 10 }); add('d = f ⇒ ảnh ở vô cực (không NaN)', r.inf === true && !isNaN(r.dp), r.dp);
      r = E.thinLens({ f: 10, d: 5, h: 2 }); add('d < f ⇒ ảnh ảo, cùng chiều, lớn hơn (d′ = −10, k = 2)', near(r.dp, -10) && near(r.k, 2) && !r.real && r.upright && r.enlarged, r.dp);
      r = E.thinLens({ f: 10, d: 30 }); add('d > 2f ⇒ ảnh thật, nhỏ hơn (d′ = 15, k = −0,5)', near(r.dp, 15) && near(r.k, -0.5) && r.real && !r.enlarged, r.dp);
      r = E.thinLens({ f: 10, d: 15 }); add('f < d < 2f ⇒ ảnh thật, lớn hơn (d′ = 30, k = −2)', near(r.dp, 30) && near(r.k, -2) && r.real && r.enlarged, r.dp);
      for (const d of [2, 5, 10, 25, 80]) { r = E.thinLens({ f: -10, d, h: 1 }); if (!(r.dp < 0 && !r.real && r.upright && !r.enlarged && r.k > 0 && r.k < 1)) add('phân kì d = ' + d + ' ⇒ ảnh ảo, cùng chiều, nhỏ hơn', false, r.k); }
      add('phân kì: mọi d (2…80) đều cho ảnh ảo cùng chiều nhỏ hơn vật', !T.some((x) => /phân kì d =/.test(x.name)), null);
      const rays = E.imageRays(30, 3, 10), res = rays.map((q) => { const x = 15; return q.y1 + q.thp * x; });
      add('ba tia đặc biệt cắt nhau tại ảnh (d = 30, f = 10 ⇒ x′ = 15, y′ = −1,5)', res.every((y) => near(y, -1.5, 1e-9)) && near(E.imageRays(30, 3, 10)[0].thp, -0.1, 1e-9), res.join(','));
      const rv = E.imageRays(5, 2, 10).map((q) => q.y1 + q.thp * (-10)); add('ảnh ảo: đường kéo dài của ba tia ló cùng đi qua (−10; 4)', rv.every((y) => near(y, 4, 1e-9)), rv.join(','));
      add('tia qua quang tâm truyền thẳng; tia song song trục (hội tụ) ló qua F', near(E.imageRays(30, 3, 10)[1].y1 + E.imageRays(30, 3, 10)[1].thp * 10, 0), null);
      add('Silberman: d = d′ = 200 mm ⇒ f = 100 mm', near(E.silberman(200, 200), 100), null);
      add('Bessel: L = 400, l = 200 ⇒ f = 75 mm; L = 4f ⇒ l = 0', near(E.bessel(400, 200), 75) && near(E.bessel(400, 0), 100), null);
      const bp = E.besselPositions(400, 75), bq = E.besselPositions(400, 100), br = E.besselPositions(350, 100);
      add('Bessel: hai vị trí cho ảnh rõ cách nhau l, và f tính lại bằng đúng f; L = 4f ⇒ một vị trí; L < 4f ⇒ không có', bp && near(E.bessel(400, bp[1] - bp[0]), 75) && bq && near(bq[1] - bq[0], 0) && br === null, null);
      add('Silberman và Bessel cho cùng f khi không nhiễu (f = 100)', near(E.silberman(200, 200), E.bessel(500, E.besselPositions(500, 100)[1] - E.besselPositions(500, 100)[0])), null);
      add('độ nhoè = 0 khi màn đúng chỗ, > 0 khi lệch; vô cực khi không có ảnh thật', E.benchBlur(200, 200, 20) === 0 && E.benchBlur(210, 200, 20) > 0 && E.benchBlur(100, -50, 20) === Infinity, null);
      return T;
    }
  });
  const baseSelf = E.selfTest;
  E.selfTest = function () { return baseSelf().concat(E.selfTestLens()); };

  /* ---------------------------------------------------------- LENS LAB (SVG) */
  const VW = 560, VH = 290, CY = 145, S = 16;                  // 20 px = 1 cm
  const tr = (x, y, cx) => [cx + x * S, CY - y * S];
  const lensShape = (cx, f, h, w) => {
    const top = CY - h, bot = CY + h, a = f > 0 ? w : 0, b = f > 0 ? 0 : w;
    if (f > 0) return 'M' + cx + ' ' + top + ' Q ' + (cx + w * 2.2) + ' ' + CY + ' ' + cx + ' ' + bot + ' Q ' + (cx - w * 2.2) + ' ' + CY + ' ' + cx + ' ' + top + ' Z';
    return 'M' + (cx - w) + ' ' + top + ' L ' + (cx + w) + ' ' + top + ' Q ' + (cx - w * 0.2) + ' ' + CY + ' ' + (cx + w) + ' ' + bot + ' L ' + (cx - w) + ' ' + bot + ' Q ' + (cx + w * 1.4) + ' ' + CY + ' ' + (cx - w) + ' ' + top + ' Z';
  };
  const lineP = (a, b, cls, extra) => '<line class="' + cls + '" x1="' + a[0].toFixed(1) + '" y1="' + a[1].toFixed(1) + '" x2="' + b[0].toFixed(1) + '" y2="' + b[1].toFixed(1) + '" ' + (extra || '') + '/>';
  const textP = (p, t, cls, anch) => '<text class="olab__lab ' + (cls || '') + '" x="' + p[0].toFixed(1) + '" y="' + p[1].toFixed(1) + '" text-anchor="' + (anch || 'middle') + '">' + t + '</text>';
  const headTri = (a, b, cls) => { const ang = Math.atan2(b[1] - a[1], b[0] - a[0]), h = 9, q = (d) => (b[0] - h * Math.cos(ang + d)).toFixed(1) + ',' + (b[1] - h * Math.sin(ang + d)).toFixed(1); return '<polygon class="olab__head ' + cls + '" points="' + b[0].toFixed(1) + ',' + b[1].toFixed(1) + ' ' + q(.45) + ' ' + q(-.45) + '"/>'; };

  function lensLab(body, opt) {
    const o = Object.assign({ mode: 'object', f: 5, d: 8, h: 2, cx: 290, ft: 'conv', task: null, table: false, snap: true }, opt || {}), id = 'ol' + (++uid);
    const S_ = { f: Math.abs(o.f), conv: o.f > 0, d: o.d, h: o.h, cx: o.cx, y: 2, tilt: 0, three: true, snap: o.snap, prisms: false, ray: 'par', hy: 1.5, rows: [], guess: null };
    const fs = () => (S_.conv ? S_.f : -S_.f);
    const modeHint = { class: ['Kéo chấm đỏ để đổi độ cao chùm song song; đổi loại thấu kính, f và độ nghiêng của chùm.', 'Drag the red dot to change the beam height; change the lens type, f and the beam tilt.'], rays: ['Kéo tay nắm đỏ để đổi tia tới; chọn loại tia. Bật “lăng kính nhỏ” để xem vì sao tia lệch.', 'Drag the red handle to change the incoming ray; choose the ray type. Turn on “small prisms” to see why rays bend.'], point: ['Kéo điểm sáng S (chấm đỏ) tới mọi vị trí; thử dự đoán S′ bằng chấm xanh rồi bấm “Kiểm tra”.', 'Drag the point source S (red dot) anywhere; try to predict S′ with the blue dot and press “Check”.'], object: ['Kéo vật AB (chân hoặc đầu mũi tên) để đổi d và h, kéo thấu kính để đổi d, đổi f bằng thanh trượt.', 'Drag the object AB (foot or tip) to change d and h, drag the lens to change d, change f with the slider.'] }[o.mode];
    const ctl = (k, lab, en, min, max, step, out) => '<label class="olab__ctl"><span>' + pr(lab, en) + ' = <output data-out="' + k + '"></output> ' + (out || '') + '</span><input type="range" data-k="' + k + '" min="' + min + '" max="' + max + '" step="' + step + '"></label>';
    body.innerHTML = '<div class="olab" data-lab="' + id + '"><p class="olab__hint">' + pr(modeHint[0], modeHint[1]) + '</p>' +
      (o.task ? '<div class="olab__task"><p class="olab__taskq">' + pr(o.task.vi, o.task.en) + '</p><div class="olab__taskrow">' + (o.task.ask ? '<label>' + o.task.ask + ' = <input type="number" class="olab__in" data-ans step="0.1" inputmode="decimal"> cm</label>' : '') + '<button type="button" class="btn btn--sm" data-act="check">' + pr('Kiểm tra', 'Check') + '</button><span class="olab__fb" data-fb role="status" aria-live="polite"></span></div></div>' : '') +
      '<div class="olab__stage"><svg class="olab__svg" viewBox="0 0 ' + VW + ' ' + VH + '" role="group" aria-label="Thấu kính, trục chính, các tia sáng và ảnh">' +
      '<line class="olab__axis" x1="10" y1="' + CY + '" x2="' + (VW - 10) + '" y2="' + CY + '"/><g data-r="grid"></g><g data-r="rays"></g><g data-r="shapes"></g>' +
      '<g data-r="lens"><path data-r="lensP" class="olab__lens"/></g>' +
      (o.mode === 'object' ? '<g data-h="obj" data-r="objh" tabindex="0" role="slider" aria-label="Vật AB: khoảng cách d / Object AB: distance d" class="olab__hd olab__hd--rot"><circle r="32" class="olab__hit"/><rect x="-8" y="-8" width="16" height="16" rx="4" class="olab__sq"/></g><g data-h="tip" data-r="tiph" tabindex="0" role="slider" aria-label="Đầu vật B: chiều cao h / Tip B: height h" class="olab__hd olab__hd--src"><circle r="32" class="olab__hit"/><circle r="9" class="olab__dot"/></g><g data-h="lens" data-r="lensh" tabindex="0" role="slider" aria-label="Thấu kính: vị trí / Lens: position" class="olab__hd olab__hd--rot"><circle r="32" class="olab__hit"/><rect x="-8" y="-8" width="16" height="16" rx="4" class="olab__sq"/></g>' : '') +
      (o.mode === 'point' ? '<g data-h="S" data-r="Sh" tabindex="0" role="slider" aria-label="Điểm sáng S / Light point S" class="olab__hd olab__hd--src"><circle r="32" class="olab__hit"/><circle r="9" class="olab__dot"/></g><g data-h="guess" data-r="gh" tabindex="0" role="slider" aria-label="Dự đoán S′ / Guess S′" class="olab__hd"><circle r="32" class="olab__hit"/><circle r="8" class="olab__pin olab__pin--c" style="fill:var(--pen)"/></g>' : '') +
      ((o.mode === 'class' || o.mode === 'rays') ? '<g data-h="beam" data-r="beamh" tabindex="0" role="slider" aria-label="Độ cao của tia tới / Height of the incoming ray" class="olab__hd olab__hd--src"><circle r="32" class="olab__hit"/><circle r="9" class="olab__dot"/></g>' : '') +
      '</svg></div><div class="olab__panel">' +
      '<fieldset class="olab__ctl olab__side"><legend>' + pr('Loại thấu kính', 'Lens type') + '</legend><label><input type="radio" name="' + id + 't" value="conv"' + (S_.conv ? ' checked' : '') + '> ' + pr('Hội tụ (rìa mỏng)', 'Converging (thin-edged)') + '</label><label><input type="radio" name="' + id + 't" value="div"' + (S_.conv ? '' : ' checked') + '> ' + pr('Phân kì (rìa dày)', 'Diverging (thick-edged)') + '</label></fieldset>' +
      ctl('f', 'Tiêu cự f', 'Focal length f', 2, 8, 0.5, 'cm') + (o.mode === 'object' ? ctl('d', 'Khoảng cách vật d', 'Object distance d', 0.5, 14, 0.1, 'cm') + ctl('h', 'Chiều cao vật h', 'Object height h', 0.5, 4, 0.1, 'cm') : '') +
      (o.mode === 'class' ? ctl('tilt', 'Độ nghiêng của chùm', 'Tilt of the beam', -15, 15, 1, '°') : '') +
      (o.mode === 'rays' ? '<fieldset class="olab__ctl olab__side"><legend>' + pr('Loại tia', 'Ray type') + '</legend><label><input type="radio" name="' + id + 'r" value="par" checked> ' + pr('Song song trục chính', 'Parallel to axis') + '</label><label><input type="radio" name="' + id + 'r" value="O"> ' + pr('Qua quang tâm O', 'Through O') + '</label><label><input type="radio" name="' + id + 'r" value="obl"> ' + pr('Tia xiên', 'Oblique ray') + '</label></fieldset>' : '') +
      '<div class="olab__opts">' + (o.mode === 'object' ? '<label><input type="checkbox" data-k="snap" checked> ' + pr('Hít vào d = 2f, d = f', 'Snap to d = 2f, d = f') + '</label><label><input type="checkbox" data-k="three" checked> ' + pr('Dựng bằng 3 tia', 'Use 3 rays') + '</label>' : '') + (o.mode === 'rays' ? '<label><input type="checkbox" data-k="prisms"> ' + pr('Mô hình lăng kính nhỏ', 'Small-prism model') + '</label>' : '') + '</div>' +
      '<div class="olab__btns"><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button>' + (o.mode === 'object' && o.table ? '<button type="button" class="btn btn--sm btn--primary" data-act="rec">' + pr('Ghi kết quả', 'Record') + '</button><button type="button" class="btn btn--sm" data-act="clear">' + pr('Xoá bảng', 'Clear table') + '</button>' : '') + (o.mode === 'point' ? '<button type="button" class="btn btn--sm btn--primary" data-act="gcheck">' + pr('Kiểm tra', 'Check') + '</button>' : '') + '</div>' +
      '<div class="olab__read" data-read aria-live="polite"></div>' + (o.table ? '<div class="tablewrap"><table class="olab__tbl" data-tbl></table></div>' : '') + '<p class="olab__msg" data-msg role="status" aria-live="polite"></p></div></div>';
    const lab = $('[data-lab="' + id + '"]', body), svg = $('.olab__svg', lab), q = (n) => $('[data-r="' + n + '"]', svg);
    const lensX = () => S_.cx;
    const P = (x, y) => tr(x, y, lensX());
    const cmFromPx = (px, py) => [(px - lensX()) / S, (CY - py) / S];
    const snapD = (d) => { if (!S_.snap || o.mode !== 'object') return d; const f = S_.f; for (const t of [2 * f, f]) if (Math.abs(d - t) < 0.2) return t; return d; };

    function rayLine(x0, y0, x1, y1, cls, dashed) { return lineP(P(x0, y0), P(x1, y1), cls, dashed ? 'stroke-dasharray="6 4"' : ''); }
    const XR = (VW - lensX()) / S - 0.2, XL = -(lensX() - 10) / S;
    function drawObject(d, h, f, cfg) {            // vật AB (hoặc điểm S) ở x = −d
      let out = '', I = E.thinLens({ f, d, h }), rays = E.imageRays(d, h, f).filter((r) => r.k === 'O' || r.k === 'par' || (S_.three && r.k === 'F'));
      rays.forEach((r) => {
        const lensY = r.y1, thp = r.thp, xe = XR;
        out += rayLine(-d, h, 0, lensY, 'olab__ray olab__ray--inc');
        out += rayLine(0, lensY, xe, lensY + thp * xe, 'olab__ray olab__ray--' + (r.k === 'F' ? 'refl' : 'refr'));
        if (!I.inf && !I.real) out += rayLine(0, lensY, I.dp, I.hp, 'olab__ray olab__ray--virt', true);   // đường kéo dài của tia ló
      });
      return { svg: out, I };
    }
    function draw() {
      const f = fs(), cx = lensX(), mode = o.mode;
      setA(q('lensP'), { d: lensShape(cx, f, 100, 12), class: 'olab__lens ' + (f > 0 ? 'olab__lens--conv' : 'olab__lens--div') });
      let grid = '', shapes = '', rays = '', read = '', ex = null;
      // O, F, F′, 2F
      const mk = (x, t, c) => { const p = P(x, 0); return '<circle class="olab__I" cx="' + p[0] + '" cy="' + p[1] + '" r="3.5"/>' + textP([p[0], p[1] + 18], t, c); };
      grid += mk(0, 'O'); grid += mk(S_.f, f > 0 ? "F′" : 'F'); grid += mk(-S_.f, f > 0 ? 'F' : "F′");
      if (mode === 'object') { grid += '<circle class="olab__I" cx="' + P(2 * S_.f, 0)[0] + '" cy="' + CY + '" r="2.5" opacity=".55"/>' + textP([P(2 * S_.f, 0)[0], CY + 18], "2F′", 'olab__tick') + '<circle class="olab__I" cx="' + P(-2 * S_.f, 0)[0] + '" cy="' + CY + '" r="2.5" opacity=".55"/>' + textP([P(-2 * S_.f, 0)[0], CY + 18], '2F', 'olab__tick'); }
      if (mode === 'object') {
        const d = S_.d, h = S_.h, r = drawObject(d, h, f), I = r.I; rays = r.svg; ex = I;
        const a = P(-d, 0), b = P(-d, h);
        shapes += lineP(a, b, 'olab__obj') + headTri(a, b, 'olab__head--obj') + textP([a[0], a[1] + 18], 'A') + textP([b[0] - 12, b[1] - 4], 'B');
        if (!I.inf && isFinite(I.dp) && Math.abs(I.dp) < 22) { const ia = P(I.dp, 0), ib = P(I.dp, I.hp); shapes += lineP(ia, ib, 'olab__img' + (I.real ? '' : ' olab__img--virt')) + headTri(ia, ib, I.real ? 'olab__head--img' : 'olab__head--imgv') + textP([ia[0], ia[1] + (I.hp >= 0 ? 18 : -8)], "A′") + textP([ib[0] + 14, ib[1] + (I.hp >= 0 ? -4 : 12)], "B′"); }
        setA(q('objh'), { transform: 'translate(' + a[0] + ',' + a[1] + ')', 'aria-valuenow': d.toFixed(1), 'aria-valuetext': 'd = ' + fmt(d, 1) + ' cm' }); setA(q('tiph'), { transform: 'translate(' + b[0] + ',' + b[1] + ')', 'aria-valuenow': h.toFixed(1) }); setA(q('lensh'), { transform: 'translate(' + cx + ',' + (CY + 118) + ')', 'aria-valuenow': cx });
        const cls = I.inf ? pr('Ảnh ở vô cực: các tia ló song song.', 'The image is at infinity: the emergent rays are parallel.') : pr((I.real ? 'ảnh <b>thật</b>' : 'ảnh <b>ảo</b>') + ', ' + (I.upright ? '<b>cùng chiều</b>' : '<b>ngược chiều</b>') + ' vật, ' + (I.same ? '<b>bằng</b>' : I.enlarged ? '<b>lớn hơn</b>' : '<b>nhỏ hơn</b>') + ' vật', (I.real ? '<b>real</b>' : '<b>virtual</b>') + ' image, ' + (I.upright ? '<b>upright</b>' : '<b>inverted</b>') + ', ' + (I.same ? '<b>the same size as</b>' : I.enlarged ? '<b>magnified</b>' : '<b>diminished</b>') + ' compared with the object');
        read = '<table class="olab__tbl olab__tbl--read"><tbody><tr><th scope="row">f</th><td>' + fmt(f, 1) + ' cm (' + (f > 0 ? 'hội tụ' : 'phân kì') + ')</td></tr><tr><th scope="row">d</th><td>' + fmt(d, 1) + ' cm  (' + fmt(d / S_.f, 2) + ' f)</td></tr><tr><th scope="row">d′</th><td>' + (I.inf ? '∞' : fmt(I.dp, 1) + ' cm') + '</td></tr><tr><th scope="row">h′</th><td>' + (I.inf ? '∞' : fmt(I.hp, 1) + ' cm') + '</td></tr><tr><th scope="row">k = −d′/d</th><td>' + (I.inf ? '∞' : fmt(I.k, 2)) + '</td></tr></tbody></table><p class="olab__status">' + cls + '</p>';
      } else if (mode === 'point') {
        const d = S_.d, h = S_.y, r = drawObject(d, h, f), I = r.I; rays = r.svg; ex = I;
        const a = P(-d, h); shapes += '<circle class="olab__dot" cx="' + a[0] + '" cy="' + a[1] + '" r="6"/>' + textP([a[0], a[1] - 14], 'S');
        if (!I.inf && isFinite(I.dp) && Math.abs(I.dp) < 22) { const b = P(I.dp, I.hp); shapes += '<circle class="olab__img-dot' + (I.real ? '' : ' olab__img-dot--virt') + '" cx="' + b[0] + '" cy="' + b[1] + '" r="6"/>' + textP([b[0], b[1] - 14], "S′"); }
        setA(q('Sh'), { transform: 'translate(' + a[0] + ',' + a[1] + ')', 'aria-valuenow': d.toFixed(1), 'aria-valuetext': 'd = ' + fmt(d, 1) + ' cm, độ cao ' + fmt(h, 1) + ' cm' });
        const g = S_.guess || [Math.min(8, 22), -1], gp = P(g[0], g[1]); setA(q('gh'), { transform: 'translate(' + gp[0] + ',' + gp[1] + ')', 'aria-valuenow': g[0].toFixed(1) });
        read = '<p class="olab__status">' + (I.inf ? pr('S nằm ở tiêu điểm: S′ ở vô cực.', 'S is at the focal point: S′ is at infinity.') : I.real ? pr('S′ là ảnh <b>thật</b> (giao điểm của các tia ló).', 'S′ is a <b>real</b> image (where the emergent rays meet).') : pr('S′ là ảnh <b>ảo</b> (giao điểm của đường kéo dài các tia ló).', 'S′ is a <b>virtual</b> image (where the extensions of the emergent rays meet).')) + '</p><p class="olab__note">' + pr('Nếu S nằm trên trục chính (h = 0) thì S′ cũng nằm trên trục chính.', 'If S is on the principal axis (h = 0), S′ is also on the axis.') + '</p>';
        if (!S_.guess) S_.guess = [6, -1];
      } else {   // class / rays
        const heights = mode === 'class' ? [-2.5, -1.5, -0.5, 0.5, 1.5, 2.5] : [S_.hy], th = Math.tan(S_.tilt * Math.PI / 180);
        const kind = mode === 'rays' ? S_.ray : 'par';
        const beamY = mode === 'class' ? S_.hy : S_.hy;
        let list = [];
        if (mode === 'class') list = heights.map((y) => ({ y1: y + S_.hy * 0, th }));        // chùm song song, có thể nghiêng
        else if (kind === 'par') list = [{ y1: S_.hy, th: 0 }]; else if (kind === 'O') list = [{ y1: 0, th: Math.tan((S_.hy / 3) * 0.5) * -1 }]; else list = [{ y1: S_.hy, th: 0.18 }];
        if (mode === 'rays' && kind === 'O') list[0].th = -S_.hy / 5;
        list.forEach((r, i) => {
          const xs = -XL * 0.97, y0 = r.y1 + r.th * (-xs) * -1;
          const yStart = r.y1 - r.th * (-xs + 0) ; // y at x = xs
          const thp = E.lensRay(r.y1, r.th, f), xe = XR;
          rays += rayLine(xs, r.y1 + r.th * xs, 0, r.y1, 'olab__ray olab__ray--inc') + rayLine(0, r.y1, xe, r.y1 + thp * xe, 'olab__ray olab__ray--refr');
          if (f < 0) rays += rayLine(0, r.y1, -S_.f * 0 + f * 1 + 0, r.y1 + thp * (f), 'olab__ray olab__ray--virt', true);
        });
        if (mode === 'rays' && S_.prisms) {           // mô hình lăng kính nhỏ: các dải có góc lệch ∝ độ cao
          for (let y = -4; y <= 4; y += 1) { const p0 = P(0, y), dev = -y / f; shapes += '<polygon class="olab__miniprism" points="' + (p0[0] - 9) + ',' + (p0[1] - 9) + ' ' + (p0[0] + 9) + ',' + (p0[1] - 9) + ' ' + (p0[0] + (f > 0 ? (y > 0 ? 3 : -3) : (y > 0 ? -3 : 3)) * Math.abs(y) / 3) + ',' + (p0[1] + 9) + '"/>'; }
          shapes += textP([P(0, 5)[0], 22], pr('Gần rìa lệch nhiều, gần trục lệch ít', 'Near the edge the ray bends more, near the axis less').replace(/<[^>]+>/g, ''), 'olab__tick');
        }
        const hp = P(-XL * 0 - 8, S_.hy); setA(q('beamh'), { transform: 'translate(' + P(-8, S_.hy)[0] + ',' + P(-8, S_.hy)[1] + ')', 'aria-valuenow': S_.hy.toFixed(1), 'aria-valuetext': 'độ cao ' + fmt(S_.hy, 1) + ' cm' });
        if (mode === 'class') { const Fp = P(S_.f, 0), tilt = Math.tan(S_.tilt * Math.PI / 180); const yF = f > 0 ? -f * tilt : 0; grid += f > 0 ? '<circle cx="' + Fp[0] + '" cy="' + P(0, yF)[1] + '" r="4" class="olab__img-dot"/>' : ''; }
        read = '<p class="olab__status">' + (f > 0 ? pr('Thấu kính hội tụ: chùm tia song song trục chính cho chùm tia ló hội tụ tại tiêu điểm chính F′; f = OF′ = ' + fmt(S_.f, 1) + ' cm.', 'Converging lens: a beam parallel to the axis comes out converging at the principal focus F′; f = OF′ = ' + fmt(S_.f, 1) + ' cm.') : pr('Thấu kính phân kì: chùm tia song song trục chính cho chùm tia ló phân kì; đường kéo dài của các tia ló đi qua tiêu điểm chính F (ảnh), f = ' + fmt(S_.f, 1) + ' cm.', 'Diverging lens: a beam parallel to the axis comes out diverging; the extensions of the emergent rays pass through the principal focus F; f = ' + fmt(S_.f, 1) + ' cm.')) + '</p>' + (mode === 'class' && S_.tilt !== 0 && f > 0 ? '<p class="olab__note">' + pr('Chùm song song nghiêng hội tụ tại một điểm trên tiêu diện (mở rộng, ngoài sách).', 'A tilted parallel beam focuses on the focal plane (an extension beyond the book).') + '</p>' : '');
      }
      q('rays').innerHTML = rays; q('shapes').innerHTML = shapes; q('grid').innerHTML = grid; $('[data-read]', lab).innerHTML = read;
      ['f', 'd', 'h', 'tilt'].forEach((k) => { const r = $('[data-k="' + k + '"]', lab); if (r) { const v = k === 'f' ? S_.f : S_[k]; if (document.activeElement !== r) r.value = v; const out = $('[data-out="' + k + '"]', lab); if (out) out.textContent = fmt(v, k === 'tilt' ? 0 : 1); } });
      if (o.table) renderTbl();
      last = ex;
    }
    let last = null;
    const redraw = raf(draw);
    function renderTbl() {
      const t = $('[data-tbl]', lab); if (!t) return; const conv = S_.conv;
      t.innerHTML = '<caption>' + (conv ? pr('Bảng 8.1 (của em)', 'Table 8.1 (yours)') : pr('Bảng 8.2 (của em)', 'Table 8.2 (yours)')) + '</caption><thead><tr><th>' + pr('Khoảng cách vật d', 'Distance d') + '</th><th>' + pr('Thật / ảo', 'Real / virtual') + '</th><th>' + pr('Cùng / ngược chiều', 'Upright / inverted') + '</th><th>' + pr('Lớn hơn / nhỏ hơn', 'Larger / smaller') + '</th></tr></thead><tbody>' + (S_.rows.length ? S_.rows.map((r) => '<tr><td>' + r.c[0] + '</td><td>' + r.c[1] + '</td><td>' + r.c[2] + '</td><td>' + r.c[3] + '</td></tr>').join('') : '<tr><td colspan="4" class="olab__empty">' + pr('Chưa có dòng nào — bấm “Ghi kết quả”.', 'No rows yet — press “Record”.') + '</td></tr>') + '</tbody>';
    }
    function record() {
      const I = last, f = fs(); if (!I || I.inf) { $('[data-msg]', lab).innerHTML = pr('Ở d = f không có ảnh rõ: hãy dịch vật ra khỏi tiêu điểm.', 'At d = f there is no image: move the object off the focus.'); return; }
      const rel = S_.d > S_.f ? 'd > f' : 'd < f';
      S_.rows.push({ c: [rel + ' (d = ' + fmt(S_.d, 1) + ' cm)', pr(I.real ? 'Ảnh thật' : 'Ảnh ảo', I.real ? 'Real' : 'Virtual'), pr(I.upright ? 'Cùng chiều' : 'Ngược chiều', I.upright ? 'Upright' : 'Inverted'), pr(I.same ? 'Bằng vật' : I.enlarged ? 'Lớn hơn vật' : 'Nhỏ hơn vật', I.same ? 'Same size' : I.enlarged ? 'Larger' : 'Smaller')] });
      renderTbl();
    }
    function check() {
      const t = o.task, fb = $('[data-fb]', lab), I = last, f = S_.f; let ok = false, txt = '';
      if (t.kind === 'equal') { const ans = $('[data-ans]', lab).value; const byDrag = I && !I.inf && I.real && Math.abs(Math.abs(I.k) - 1) < 0.04; const byAns = ans !== '' && Math.abs(+String(ans).replace(',', '.') - 2 * f) < 0.2; ok = byDrag || byAns; txt = ok ? '✓ ' + pr('Đúng: d = 2f = ' + fmt(2 * f, 1) + ' cm, khi đó d′ = 2f và ảnh bằng vật, ngược chiều.', 'Correct: d = 2f = ' + fmt(2 * f, 1) + ' cm; then d′ = 2f and the image is the same size, inverted.') : pr('Chưa đúng. Kéo vật tới khi ảnh là ảnh thật và cao bằng vật.', 'Not yet. Drag the object until the image is real and as tall as the object.'); }
      else if (t.kind === 'inf') { ok = S_.conv && Math.abs(S_.d - f) < 0.15; txt = ok ? '✓ ' + pr('Đúng: S ở tiêu điểm (d = f) nên S′ ở vô cực.', 'Correct: S is at the focal point (d = f), so S′ is at infinity.') : pr('Chưa đúng. Hãy đặt S trên trục chính, cách thấu kính đúng một tiêu cự.', 'Not yet. Place S so that it is one focal length from the lens.'); }
      fb.className = 'olab__fb ' + (ok ? 'is-ok' : 'is-no'); fb.innerHTML = txt;
    }
    makeDrag(svg, {
      obj: { move(x) { const c = cmFromPx(x, CY); S_.d = clamp(snapD(-c[0]), 0.5, 14); redraw(); }, key(dd) { S_.d = clamp(+(S_.d - dd * 0.1).toFixed(2), 0.5, 14); redraw(); } },
      tip: { move(x, y) { const c = cmFromPx(x, y); S_.h = clamp(+c[1].toFixed(1), 0.5, 4); redraw(); }, key(dd, sh, ax) { S_.h = clamp(+(S_.h + dd * 0.1).toFixed(1), 0.5, 4); redraw(); } },
      lens: { move(x) { const shift = x - lensX(); const d0 = S_.d, oldx = lensX() - d0 * S; S_.cx = clamp(Math.round(x), oldx + 0.5 * S, oldx + 14 * S); S_.cx = clamp(S_.cx, 150, 460); S_.d = clamp(snapD((S_.cx - oldx) / S), 0.5, 14); S_.cx = Math.round(oldx + S_.d * S); redraw(); }, key(dd) { S_.d = clamp(+(S_.d + dd * 0.1).toFixed(2), 0.5, 14); redraw(); } },
      S: { move(x, y) { const c = cmFromPx(x, y); S_.d = clamp(-c[0], 0.5, 12); S_.y = clamp(+c[1].toFixed(1), -3.5, 3.5); if (o.snap && Math.abs(S_.d - S_.f) < 0.2) S_.d = S_.f; redraw(); }, key(dd, sh, ax) { if (ax === 'y') S_.y = clamp(+(S_.y + dd * 0.1).toFixed(1), -3.5, 3.5); else S_.d = clamp(+(S_.d - dd * 0.1).toFixed(2), 0.5, 12); redraw(); } },
      guess: { move(x, y) { const c = cmFromPx(x, y); S_.guess = [clamp(c[0], -12, 12), clamp(c[1], -5, 5)]; redraw(); }, key(dd, sh, ax) { const g = S_.guess || [6, -1]; S_.guess = ax === 'y' ? [g[0], g[1] + dd * 0.1] : [g[0] + dd * 0.1, g[1]]; redraw(); } },
      beam: { move(x, y) { S_.hy = clamp(+((CY - y) / S).toFixed(1), -3.5, 3.5); if (S_.hy === 0 && o.mode === 'rays') S_.hy = 0.1; redraw(); }, key(dd) { S_.hy = clamp(+(S_.hy + dd * 0.1).toFixed(1), -3.5, 3.5); redraw(); } }
    });
    lab.addEventListener('input', (e) => { const k = e.target.dataset && e.target.dataset.k; if (!k) return; if (e.target.type === 'checkbox') S_[k] = e.target.checked; else S_[k === 'f' ? 'f' : k] = +e.target.value; if (k === 'f' && o.mode === 'object') S_.d = snapD(S_.d); if (k === 'd') { S_.d = snapD(S_.d); } if (o.mode === 'object' && (k === 'd' || k === 'f')) S_.cx = clamp(S_.cx, 150, 460); draw(); });
    lab.addEventListener('change', (e) => { if (e.target.name === id + 't') { S_.conv = e.target.value === 'conv'; if (o.table) S_.rows = []; draw(); } else if (e.target.name === id + 'r') { S_.ray = e.target.value; draw(); } });
    lab.addEventListener('click', (e) => {
      const b = e.target.closest('[data-act]'); if (!b) return; const a = b.dataset.act;
      if (a === 'reset') { Object.assign(S_, { f: Math.abs(o.f), conv: o.f > 0, d: o.d, h: o.h, cx: o.cx, tilt: 0, hy: 1.5, y: 2, rows: [], guess: null, ray: 'par' }); const fb = $('[data-fb]', lab); if (fb) fb.textContent = ''; $$('input[name="' + id + 't"]', lab).forEach((x) => { x.checked = x.value === (S_.conv ? 'conv' : 'div'); }); draw(); }
      else if (a === 'rec') record(); else if (a === 'clear') { S_.rows = []; renderTbl(); }
      else if (a === 'check') check();
      else if (a === 'gcheck') { const I = E.thinLens({ f: fs(), d: S_.d, h: S_.y }), g = S_.guess, msg = $('[data-msg]', lab); if (I.inf) msg.innerHTML = pr('S ở tiêu điểm: ảnh ở vô cực, không có điểm S′ trên hình.', 'S is at the focus: the image is at infinity, there is no S′ on the page.'); else { const err = Math.hypot(g[0] - I.dp, g[1] - I.hp); msg.innerHTML = err < 0.6 ? '✓ ' + pr('Đúng: S′ nằm tại giao điểm các tia ló (hoặc đường kéo dài của chúng).', 'Correct: S′ lies where the emergent rays (or their extensions) cross.') : pr('Chưa đúng: lệch ' + fmt(err, 1) + ' cm. Theo dõi hai tia đặc biệt (qua O và song song trục) rồi kéo chấm xanh tới giao điểm.', 'Not yet: off by ' + fmt(err, 1) + ' cm. Follow the two special rays (through O and parallel to the axis) and drag the blue dot to where they cross.'); } }
    });
    if (o.mode === 'rays') S_.hy = 2;
    draw(); return { state: S_, draw, get image() { return last; } };
  }

  /* --------------------------------------------------- GIÁ QUANG HỌC (bench) */
  /* Đơn vị: mm. Giá dài 0–700 mm ↔ x = 20 + 0,8·mm. Thấu kính f_thật = o.f (mm). */
  function bench(body, opt) {
    const o = Object.assign({ mode: 'demo', f: 100, h: 20, noise: false }, opt || {}), id = 'ob' + (++uid), W = 600, H = 250, RY = 205, K = 0.8, X0 = 20, A_ = 24;
    const S_ = { conv: o.f > 0, xo: 60, xl: 260, xs: 480, eye: false, rows: [], noise: o.noise, truef: false, bs: [], L: 500, name: '', cls: '' };
    if (o.mode === 'silberman') { S_.xl = 300; S_.xo = 255; S_.xs = 345; }
    if (o.mode === 'bessel') { S_.xo = 60; S_.xs = 60 + S_.L; S_.xl = 120; }
    const F_ = () => (S_.conv ? Math.abs(o.f) : -Math.abs(o.f));
    const px = (mm) => X0 + K * mm, mmOf = (p) => (p - X0) / K;
    let ticks = ''; for (let m = 0; m <= 700; m += 10) { const x = px(m), t = m % 100 === 0 ? 14 : m % 50 === 0 ? 10 : 6; ticks += '<line x1="' + x + '" y1="' + RY + '" x2="' + x + '" y2="' + (RY + t) + '" class="olab__ticks"/>'; if (m % 100 === 0) ticks += '<text class="olab__tick" x="' + x + '" y="' + (RY + 26) + '" text-anchor="middle">' + m + '</text>'; }
    const lglyph = '<g data-r="gly"><path d="M-3 -16 L9 -16 M-3 -16 L-3 16 M-3 0 L6 0" class="olab__glyph"/></g>';
    const inputs = (n) => { let h = ''; for (let i = 1; i <= n; i++) h += '<tr data-row="' + i + '"><th scope="row">' + i + '</th>' + ['d', 'dp', 'h', 'hp'].map((k) => '<td><input class="olab__in" type="number" step="1" inputmode="decimal" data-cell="' + k + '" aria-label="' + k + ' lần ' + i + '"></td>').join('') + '</tr>'; return h; };
    body.innerHTML = '<div class="olab" data-lab="' + id + '"><p class="olab__hint">' + pr(o.mode === 'bessel' ? 'Vật và màn cách nhau L (chọn bằng thanh trượt). Kéo thấu kính dọc giá để tìm hai vị trí cho ảnh rõ nét; bấm “Ghi vị trí” tại mỗi vị trí.' : o.mode === 'silberman' ? 'Kéo thấu kính, vật chữ F và màn dọc giá quang học (thước mm). Dùng nút “Dịch ra xa bằng nhau” để vật và màn rời thấu kính đều nhau tới khi ảnh rõ nét; đọc d, d′, h, h′ trên thước rồi điền Bảng 9.1.' : 'Kéo vật chữ F, thấu kính và màn dọc giá quang học. Bàn phím: chọn một vật rồi dùng mũi tên (±1 mm, Shift ±5 mm).', o.mode === 'bessel' ? 'The object and screen are L apart (choose with the slider). Drag the lens along the bench to find the two positions giving a sharp image; press “Record position” at each.' : o.mode === 'silberman' ? 'Drag the lens, the F-shaped object and the screen along the optical bench (mm ruler). Use “Move apart equally” until the image is sharp, read d, d′, h, h′ on the ruler and fill Table 9.1.' : 'Drag the F object, the lens and the screen along the optical bench. Keyboard: focus an item, use the arrow keys (±1 mm, Shift ±5 mm).') + '</p>' +
      '<div class="olab__stage"><svg class="olab__svg" viewBox="0 0 ' + W + ' ' + H + '" role="group" aria-label="Giá quang học với vật, thấu kính và màn">' +
      '<defs><filter id="' + id + 'b" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur data-r="blurf" stdDeviation="0"/></filter></defs>' +
      '<rect class="olab__rail" x="' + (X0 - 10) + '" y="' + (RY - 6) + '" width="' + (700 * K + 20) + '" height="8" rx="3"/>' + ticks + '<line class="olab__axis" x1="' + X0 + '" y1="95" x2="' + (X0 + 700 * K) + '" y2="95"/>' +
      '<g data-r="beams"></g>' +
      '<g data-h="obj" data-r="obj" tabindex="0" role="slider" aria-label="Vật chữ F, vị trí / F object, position" aria-valuemin="0" aria-valuemax="700" class="olab__hd"><rect x="-6" y="55" width="12" height="40" rx="2" class="olab__slide"/><g transform="translate(0 75)">' + lglyph.replace('data-r="gly"', 'data-r="og"') + '</g><circle r="30" cy="75" class="olab__hit"/></g>' +
      '<g data-h="lens" data-r="lens" tabindex="0" role="slider" aria-label="Thấu kính, vị trí / Lens, position" aria-valuemin="0" aria-valuemax="700" class="olab__hd"><path data-r="lensP" class="olab__lens" transform="translate(0 95)"/><circle r="30" cy="95" class="olab__hit"/></g>' +
      '<g data-h="scr" data-r="scr" tabindex="0" role="slider" aria-label="Màn, vị trí / Screen, position" aria-valuemin="0" aria-valuemax="700" class="olab__hd"><rect x="-4" y="40" width="8" height="110" rx="2" class="olab__screen"/><g data-r="screenTicks"></g><g data-r="imgg" transform="translate(0 95)" filter="url(#' + id + 'b)"><g data-r="ig"><path d="M-3 -16 L9 -16 M-3 -16 L-3 16 M-3 0 L6 0" class="olab__glyph olab__glyph--img"/></g></g><circle r="34" cy="95" class="olab__hit"/></g>' +
      '<g data-r="virt"></g><text data-r="tag" class="olab__lab" x="' + (W / 2) + '" y="22" text-anchor="middle"></text></svg></div>' +
      '<div class="olab__panel">' + (o.mode === 'demo' ? '<fieldset class="olab__ctl olab__side"><legend>' + pr('Loại thấu kính', 'Lens type') + '</legend><label><input type="radio" name="' + id + 't" value="conv" checked> ' + pr('Hội tụ', 'Converging') + '</label><label><input type="radio" name="' + id + 't" value="div"> ' + pr('Phân kì', 'Diverging') + '</label></fieldset><div class="olab__opts"><label><input type="checkbox" data-k="eye"> ' + pr('Đặt mắt sau thấu kính (xem ảnh ảo)', 'Look through the lens (to see a virtual image)') + '</label></div>' : '') +
      (o.mode === 'bessel' ? '<label class="olab__ctl"><span>' + pr('Khoảng cách vật – màn L', 'Object–screen distance L') + ' = <output data-out="L"></output> mm</span><input type="range" data-k="L" min="300" max="600" step="10" value="500"></label>' : '') +
      '<div class="olab__btns"><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button>' + (o.mode === 'silberman' ? '<button type="button" class="btn btn--sm" data-act="out">' + pr('Dịch ra xa bằng nhau', 'Move apart equally') + '</button><button type="button" class="btn btn--sm" data-act="in">' + pr('Dịch lại gần', 'Move closer') + '</button>' : '') + (o.mode === 'bessel' ? '<button type="button" class="btn btn--sm btn--primary" data-act="bpos">' + pr('Ghi vị trí', 'Record position') + '</button>' : '') + '</div>' +
      '<div class="olab__opts">' + (o.mode === 'silberman' ? '<label><input type="checkbox" data-k="noise"> ' + pr('Có nhiễu đo (±1–2 mm)', 'Measurement noise (±1–2 mm)') + '</label>' : '') + (o.mode !== 'demo' ? '<label><input type="checkbox" data-k="truef"> ' + pr('Hiện tiêu cự ghi trên thấu kính', 'Show the focal length printed on the lens') + '</label>' : '') + '</div>' +
      '<div class="olab__read" data-read aria-live="polite"></div>' +
      (o.mode === 'silberman' ? '<div class="olab__rep"><label class="olab__ctl"><span>' + pr('Họ và tên', 'Name') + '</span><input class="olab__in" data-k="name" type="text" maxlength="60"></label><label class="olab__ctl"><span>' + pr('Lớp', 'Class') + '</span><input class="olab__in" data-k="cls" type="text" maxlength="20"></label></div><div class="tablewrap"><table class="olab__tbl" data-tbl91><caption>' + pr('Bảng 9.1 (đơn vị mm)', 'Table 9.1 (mm)') + '</caption><thead><tr><th>' + pr('Lần đo', 'Trial') + '</th><th>d</th><th>d′</th><th>h</th><th>h′</th></tr></thead><tbody>' + inputs(3) + '<tr class="olab__avg"><th scope="row">' + pr('Trung bình', 'Mean') + '</th><td data-avg="d"></td><td data-avg="dp"></td><td data-avg="h"></td><td data-avg="hp"></td></tr></tbody></table></div><div class="olab__btns"><button type="button" class="btn btn--sm btn--primary" data-act="take">' + pr('Lấy số đo hiện tại', 'Take current reading') + '</button><button type="button" class="btn btn--sm" data-act="report">' + pr('Xuất báo cáo', 'Export report') + '</button></div><div class="olab__read" data-calc aria-live="polite"></div>' : '') +
      '<p class="olab__msg" data-msg role="status" aria-live="polite"></p></div></div>';
    const lab = $('[data-lab="' + id + '"]', body), svg = $('.olab__svg', lab), q = (n) => $('[data-r="' + n + '"]', svg);
    const range = o.mode === 'bessel' ? { obj: [0, 0], scr: [0, 0] } : null;
    const MM = (v) => Math.round(clamp(v, 0, 700));
    function blurOf() {
      const f = F_(), d = S_.xl - S_.xo, s = S_.xs - S_.xl; if (d <= 0 || s <= 0) return { none: true, reason: 'order' };
      const I = E.thinLens({ f, d, h: o.h }); if (I.inf || !I.real) return { none: true, reason: I.inf ? 'inf' : 'virt', I };
      return { none: false, I, blur: E.benchBlur(s, I.dp, A_), s };
    }
    function draw() {
      const f = F_(), d = S_.xl - S_.xo, s = S_.xs - S_.xl, I = d > 0 ? E.thinLens({ f, d, h: o.h }) : null, bl = blurOf();
      const xo = px(S_.xo), xl = px(S_.xl), xs = px(S_.xs);
      setA(q('obj'), { transform: 'translate(' + xo + ',0)', 'aria-valuenow': S_.xo, 'aria-valuetext': S_.xo + ' mm' }); setA(q('lens'), { transform: 'translate(' + xl + ',0)', 'aria-valuenow': S_.xl, 'aria-valuetext': S_.xl + ' mm' }); setA(q('scr'), { transform: 'translate(' + xs + ',0)', 'aria-valuenow': S_.xs, 'aria-valuetext': S_.xs + ' mm' });
      const hh = o.h * 0.8;
      setA(q('og'), { transform: 'translate(0 0) scale(' + (o.h / 20) + ')' });
      setA(q('lensP'), { d: S_.conv ? 'M0 -52 Q 14 0 0 52 Q -14 0 0 -52 Z' : 'M-9 -52 L9 -52 Q 0 0 9 52 L-9 52 Q 0 0 -9 -52 Z', class: 'olab__lens ' + (S_.conv ? 'olab__lens--conv' : 'olab__lens--div') });
      // ảnh trên màn
      let tag = '', rd = '', beams = '', virt = '';
      const m = I && !I.inf ? I.k : 0;
      if (bl.none || !I) { setA(q('imgg'), { visibility: 'hidden' }); }
      else {
        const sc = Math.abs(bl.I.k) * (o.h / 20), blurPx = clamp(bl.blur * 0.55, 0, 14);
        setA(q('ig'), { transform: 'scale(' + (sc) + ',' + (-sc) + ')' }); setA(q('blurf'), { stdDeviation: blurPx.toFixed(2) });
        setA(q('imgg'), { visibility: 'visible', opacity: clamp(1 - blurPx / 18, 0.25, 1).toFixed(2) });
      }
      // đường tia tới/ló đơn giản (chùm từ đỉnh vật)
      if (I && d > 0 && !I.inf && !bl.none) { const y0 = 95 - o.h * 0.8 * 1.0; beams += '<line class="olab__ray olab__ray--inc" opacity=".55" x1="' + xo + '" y1="' + (95 - hh) + '" x2="' + xl + '" y2="' + (95 - hh * 0.0 - 0) + '"/><line class="olab__ray olab__ray--refr" opacity=".55" x1="' + xl + '" y1="95" x2="' + xs + '" y2="' + (95 + (xs - xl) * (hh / (xl - xo))) + '"/>'; }
      // ảnh ảo (mắt)
      if (S_.eye && I && !I.inf && !I.real && d > 0) { const vx = px(S_.xl + I.dp), vh = Math.abs(I.k) * o.h * 0.8; virt = '<g transform="translate(' + vx + ',95) scale(' + (Math.abs(I.k) * o.h / 20) + ')" opacity=".7"><path d="M-3 -16 L9 -16 M-3 -16 L-3 16 M-3 0 L6 0" class="olab__glyph olab__glyph--virt"/></g>'; }
      q('virt').innerHTML = virt; q('beams').innerHTML = beams;
      const tag_ = $('[data-r="tag"]', svg); tag_.textContent = S_.truef || o.mode === 'demo' ? (S_.conv ? 'f = ' + Math.abs(o.f) + ' mm' : 'f = −' + Math.abs(o.f) + ' mm') : '';
      // ô đọc
      let st;
      if (d <= 0) st = pr('Vật phải nằm bên trái thấu kính.', 'The object must be to the left of the lens.'); else if (s <= 0) st = pr('Màn phải nằm bên phải thấu kính.', 'The screen must be to the right of the lens.');
      else if (I.inf) st = pr('d = f: chùm tia ló song song, không có ảnh trên màn.', 'd = f: the emergent beam is parallel; there is no image on the screen.');
      else if (!I.real) st = S_.conv ? pr('d < f: <b>không hứng được ảnh trên màn</b> (ảnh ảo). Bật “Đặt mắt sau thấu kính” để quan sát ảnh ảo cùng chiều, lớn hơn vật.', 'd < f: <b>no image can be caught on the screen</b> (virtual). Turn on “Look through the lens” to see an upright, magnified image.') : pr('Thấu kính phân kì: <b>không hứng được ảnh</b> trên màn. Bật “Đặt mắt sau thấu kính” để thấy ảnh ảo cùng chiều, nhỏ hơn vật.', 'Diverging lens: <b>no image on the screen</b>. Turn on “Look through the lens” to see an upright, smaller virtual image.');
      else st = bl.blur < 1.2 ? pr('<b>Ảnh rõ nét</b> trên màn: ảnh thật, ngược chiều, ' + (I.same ? 'bằng vật' : I.enlarged ? 'lớn hơn vật' : 'nhỏ hơn vật') + '.', '<b>A sharp image</b> on the screen: real, inverted, ' + (I.same ? 'the same size as the object' : I.enlarged ? 'magnified' : 'diminished') + '.') : pr('Ảnh bị nhoè: dịch màn (hoặc thấu kính) để ảnh nét hơn.', 'The image is blurred: move the screen (or the lens) to sharpen it.');
      if (o.mode === 'demo') rd = '<table class="olab__tbl olab__tbl--read"><tbody><tr><th scope="row">d</th><td>' + (d > 0 ? d + ' mm' : '—') + '</td></tr><tr><th scope="row">' + pr('Màn cách thấu kính', 'Screen to lens') + '</th><td>' + (s > 0 ? s + ' mm' : '—') + '</td></tr><tr><th scope="row">d′ (' + pr('lí thuyết', 'theory') + ')</th><td>' + (I && !I.inf ? fmt(I.dp, 0) + ' mm' : '∞') + '</td></tr></tbody></table>';
      else rd = '<table class="olab__tbl olab__tbl--read"><tbody><tr><th scope="row">' + pr('Vị trí vật / thấu kính / màn', 'Object / lens / screen positions') + '</th><td>' + S_.xo + ' / ' + S_.xl + ' / ' + S_.xs + ' mm</td></tr><tr><th scope="row">d = ' + pr('vật tới thấu kính', 'object to lens') + '</th><td>' + (d > 0 ? d : '—') + ' mm</td></tr><tr><th scope="row">d′ = ' + pr('thấu kính tới màn', 'lens to screen') + '</th><td>' + (s > 0 ? s : '—') + ' mm</td></tr>' + (S_.truef ? '<tr><th scope="row">f ' + pr('ghi trên thấu kính', 'printed on the lens') + '</th><td>' + Math.abs(o.f) + ' mm</td></tr>' : '') + '</tbody></table>';
      $('[data-read]', lab).innerHTML = rd + '<p class="olab__status">' + st + '</p>';
      if (o.mode === 'bessel') besselNote();
      if (o.mode === 'silberman') calcAvg();
      const ox = $('[data-out="L"]', lab); if (ox) ox.textContent = S_.L;
      $$('[data-out]', lab).forEach(() => 0);
    }
    function sharp() { const b = blurOf(); return !b.none && b.blur < 1.2; }
    function besselNote() {
      const f = F_(), pos = E.besselPositions(S_.L, Math.abs(o.f)), m = $('[data-msg]', lab);
      let t = '';
      if (!pos) t = pr('L = ' + S_.L + ' mm < 4f: không có vị trí nào của thấu kính cho ảnh rõ nét trên màn.', 'L = ' + S_.L + ' mm < 4f: no lens position gives a sharp image on the screen.');
      else if (S_.bs.length) { const l = S_.bs.length > 1 ? Math.abs(S_.bs[1] - S_.bs[0]) : null; t = pr('Vị trí đã ghi: ' + S_.bs.join(' mm, ') + ' mm.', 'Recorded positions: ' + S_.bs.join(' mm, ') + ' mm.') + (l != null ? ' ' + pr('l = ' + l + ' mm ⇒ <b>f = (L² − l²)/(4L) = ' + fmt(E.bessel(S_.L, l), 1) + ' mm</b>.', 'l = ' + l + ' mm ⇒ <b>f = (L² − l²)/(4L) = ' + fmt(E.bessel(S_.L, l), 1) + ' mm</b>.') : ''); }
      m.innerHTML = t;
    }
    const noiseV = () => (S_.noise ? Math.round((Math.random() * 2 - 1) * 2) : 0);
    function take() {
      const d = S_.xl - S_.xo, dp = S_.xs - S_.xl, I = d > 0 ? E.thinLens({ f: F_(), d, h: o.h }) : null; const bl0 = blurOf(); if (!I || I.inf || !I.real || bl0.none || bl0.blur > 3) { $('[data-msg]', lab).innerHTML = pr('Chưa có ảnh rõ nét trên màn: hãy điều chỉnh vị trí trước.', 'There is no sharp image on the screen yet: adjust the positions first.'); return; }
      const rows = $$('tr[data-row]', lab), row = rows.find((r) => !$$('input', r).some((x) => x.value !== '')) || rows[rows.length - 1];
      const val = { d: d + noiseV(), dp: dp + noiseV(), h: o.h + noiseV(), hp: Math.round(Math.abs(I.k) * o.h) + noiseV() };
      $$('input[data-cell]', row).forEach((x) => { x.value = val[x.dataset.cell]; }); calcAvg();
    }
    function nums() { const out = { d: [], dp: [], h: [], hp: [] }; $$('tr[data-row]', lab).forEach((r) => { const v = {}; $$('input[data-cell]', r).forEach((x) => { v[x.dataset.cell] = x.value === '' ? NaN : +String(x.value).replace(',', '.'); }); if (!isNaN(v.d) && !isNaN(v.dp)) { out.d.push(v.d); out.dp.push(v.dp); if (!isNaN(v.h)) out.h.push(v.h); if (!isNaN(v.hp)) out.hp.push(v.hp); } }); return out; }
    const mean = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : NaN);
    function calcAvg() {
      const n = nums(), set = (k, v) => { const c = $('[data-avg="' + k + '"]', lab); if (c) c.textContent = isNaN(v) ? '' : fmt(v, 1); };
      set('d', mean(n.d)); set('dp', mean(n.dp)); set('h', mean(n.h)); set('hp', mean(n.hp));
      const box = $('[data-calc]', lab); if (!box) return;
      if (!n.d.length) { box.innerHTML = ''; return; }
      const fbar = (mean(n.d) + mean(n.dp)) / 4, same = !isNaN(mean(n.h)) && !isNaN(mean(n.hp)) ? Math.abs(mean(n.h) - mean(n.hp)) <= 2 : null;
      box.innerHTML = '<p class="olab__status">' + pr('<b>f̄ = (d̄ + d̄′)/4 = ' + fmt(fbar, 1) + ' mm</b> (' + n.d.length + ' lần đo).', '<b>f̄ = (d̄ + d̄′)/4 = ' + fmt(fbar, 1) + ' mm</b> (' + n.d.length + ' trials).') + (same == null ? '' : ' ' + (same ? pr('h̄ ≈ h̄′: đúng với d = 2f (ảnh bằng vật).', 'h̄ ≈ h̄′: as expected for d = 2f (image the same size).') : pr('h̄ khác h̄′: ảnh chưa rõ nét hoặc d chưa bằng 2f.', 'h̄ differs from h̄′: the image is not sharp or d is not 2f yet.'))) + (S_.truef ? ' ' + pr('So với f ghi trên thấu kính (' + Math.abs(o.f) + ' mm): sai lệch ' + fmt(Math.abs(fbar - Math.abs(o.f)), 1) + ' mm.', 'Compared with the printed f (' + Math.abs(o.f) + ' mm): difference ' + fmt(Math.abs(fbar - Math.abs(o.f)), 1) + ' mm.') : '') + '</p>';
    }
    function report() {
      const n = nums(), name = S_.name || '…', cls = S_.cls || '…', fbar = n.d.length ? (mean(n.d) + mean(n.dp)) / 4 : NaN;
      const rows = $$('tr[data-row]', lab).map((r, i) => (i + 1) + ';' + $$('input[data-cell]', r).map((x) => x.value).join(';')).join('\n');
      const txt = 'BÁO CÁO THỰC HÀNH / PRACTICAL REPORT\nHọ tên / Name: ' + name + '\nLớp / Class: ' + cls + '\nBài 9: Đo tiêu cự của thấu kính hội tụ / Measuring the focal length of a converging lens\nMục đích / Aim: xác định tiêu cự bằng phương pháp đối xứng (Silberman), f = (d + d′)/4.\nChuẩn bị / Apparatus: nguồn sáng, vật chữ F, thấu kính hội tụ, màn, giá quang học.\nCác bước / Steps: 1) đo h; 2) đặt vật và màn sát thấu kính rồi dịch ra xa bằng nhau đến khi ảnh rõ nét, ghi d, d′; 3) đo h′; lặp lại 3 lần.\nKết quả / Results (mm)\nlần;d;d′;h;h′\n' + rows + '\nTrung bình / Mean: d̄ = ' + (n.d.length ? fmt(mean(n.d), 1) : '') + '; d̄′ = ' + (n.dp.length ? fmt(mean(n.dp), 1) : '') + '\nf̄ = (d̄ + d̄′)/4 = ' + (isNaN(fbar) ? '…' : fmt(fbar, 1) + ' mm') + '\n';
      L.copyText ? L.copyText(txt) : null;
      try { const blob = new Blob(['﻿' + txt], { type: 'text/plain;charset=utf-8' }), a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'bao-cao-thuc-hanh-bai9.txt'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); } catch (e) { /* bỏ qua */ }
      $('[data-msg]', lab).innerHTML = pr('Đã tạo báo cáo (tải về tệp .txt).', 'Report created (downloaded as a .txt file).');
    }
    const redraw = raf(draw);
    const place = (who, mm) => { mm = MM(mm); if (o.mode === 'bessel') { if (who !== 'lens') return; S_.xl = clamp(mm, S_.xo + 5, S_.xs - 5); return; } if (who === 'obj') S_.xo = clamp(mm, 0, S_.xl - 5); else if (who === 'lens') S_.xl = clamp(mm, S_.xo + 5, S_.xs - 5); else S_.xs = clamp(mm, S_.xl + 5, 700); };
    makeDrag(svg, ['obj', 'lens', 'scr'].reduce((h, who) => { h[who] = { move(x) { place(who, mmOf(x)); redraw(); }, key(dd) { place(who, S_['x' + (who === 'obj' ? 'o' : who === 'lens' ? 'l' : 's')] + dd); redraw(); } }; return h; }, {}));
    lab.addEventListener('input', (e) => { const k = e.target.dataset && e.target.dataset.k; if (e.target.dataset.cell) { calcAvg(); return; } if (!k) return; if (e.target.type === 'checkbox') S_[k] = e.target.checked; else if (k === 'name' || k === 'cls') S_[k] = e.target.value; else if (k === 'L') { S_.L = +e.target.value; S_.xs = S_.xo + S_.L; S_.xl = clamp(S_.xl, S_.xo + 5, S_.xs - 5); S_.bs = []; } draw(); });
    lab.addEventListener('change', (e) => { if (e.target.name === id + 't') { S_.conv = e.target.value === 'conv'; draw(); } });
    lab.addEventListener('click', (e) => {
      const b = e.target.closest('[data-act]'); if (!b) return; const a = b.dataset.act;
      if (a === 'reset') { Object.assign(S_, { xo: o.mode === 'silberman' ? 255 : 60, xl: o.mode === 'silberman' ? 300 : o.mode === 'bessel' ? 120 : 260, xs: o.mode === 'silberman' ? 345 : o.mode === 'bessel' ? 60 + S_.L : 480, eye: false, bs: [] }); $$('input[data-cell]', lab).forEach((x) => { x.value = ''; }); const ey = $('[data-k="eye"]', lab); if (ey) ey.checked = false; draw(); }
      else if (a === 'out') { const st = 5; S_.xo = Math.max(0, S_.xo - st); S_.xs = Math.min(700, S_.xs + st); draw(); }
      else if (a === 'in') { const st = 5; if (S_.xl - S_.xo > 10 && S_.xs - S_.xl > 10) { S_.xo += st; S_.xs -= st; } draw(); }
      else if (a === 'take') take(); else if (a === 'report') report();
      else if (a === 'bpos') { if (sharp()) { S_.bs.push(S_.xl - S_.xo); if (S_.bs.length > 2) S_.bs = S_.bs.slice(-2); S_.bs.sort((x, y) => x - y); } else $('[data-msg]', lab).innerHTML = pr('Ảnh chưa rõ nét: hãy kéo thấu kính tới vị trí cho ảnh nét rồi ghi.', 'The image is not sharp yet: drag the lens to a sharp position, then record.'); draw(); if (!sharp()) $('[data-msg]', lab).innerHTML = pr('Ảnh chưa rõ nét: hãy kéo thấu kính tới vị trí cho ảnh nét rồi ghi.', 'The image is not sharp yet: drag the lens to a sharp position, then record.'); }
    });
    draw(); return { state: S_, draw };
  }

  /* ---------------------------------------------------------- ĐĂNG KÝ */
  const T_EQ = { kind: 'equal', ask: 'd', vi: 'Thực hành ảo: kéo vật để ảnh là ảnh thật và cao bằng vật (hoặc nhập d). Khi đó d bằng bao nhiêu (f = 5 cm)?', en: 'Virtual practical: drag the object so the image is real and as tall as the object (or type d). What is d then (f = 5 cm)?' };
  const T_INF = { kind: 'inf', vi: 'Thực hành ảo: kéo S để S′ ở vô cực. Khi đó S cách thấu kính bao nhiêu?', en: 'Virtual practical: drag S so that S′ is at infinity. How far is S from the lens?' };
  root_reg();
  function root_reg() {
    window.LabSims = Object.assign(window.LabSims || {}, {
      'olens-class': { fn: (b) => lensLab(b, { mode: 'class', f: 5 }), vi: 'Phân loại thấu kính và tiêu điểm (Hình 8.2, 8.3, 8.5)', en: 'Classifying lenses and the focus (Figures 8.2, 8.3, 8.5)', intro: 'Đổi loại thấu kính, tiêu cự f và độ nghiêng của chùm; kéo chấm đỏ để đổi độ cao chùm.' },
      'olens-rays': { fn: (b) => lensLab(b, { mode: 'rays', f: 5 }), vi: 'Đường truyền của tia sáng qua thấu kính (Hình 8.6, 8.7, 8.8)', en: 'Rays through a lens (Figures 8.6, 8.7, 8.8)', intro: 'Chọn loại tia, kéo tay nắm đỏ; bật mô hình lăng kính nhỏ để giải thích.' },
      'olens-point': { fn: (b) => lensLab(b, { mode: 'point', f: 5, d: 9 }), vi: 'Vẽ ảnh của điểm sáng S (Hình 8.10)', en: 'Imaging a point source S (Figure 8.10)', intro: 'Kéo S tới mọi vị trí, dự đoán S′ bằng chấm xanh rồi kiểm tra.' },
      'olens-point-task': { fn: (b) => lensLab(b, { mode: 'point', f: 5, d: 9, task: T_INF }), vi: 'Thực hành ảo: S′ ở vô cực', en: 'Virtual practical: S′ at infinity', intro: 'Kéo S sao cho S′ ở vô cực rồi bấm “Kiểm tra”.' },
      'olens-object': { fn: (b) => lensLab(b, { mode: 'object', f: 5, d: 8, h: 2, table: true }), vi: 'Dựng ảnh của vật AB (Hình 8.11, Bảng 8.1, 8.2)', en: 'Constructing the image of AB (Figure 8.11, Tables 8.1, 8.2)', intro: 'Kéo vật hoặc thấu kính để đổi d; đổi f và loại thấu kính; bấm “Ghi kết quả” để điền Bảng 8.1 hoặc 8.2.' },
      'olens-object-task': { fn: (b) => lensLab(b, { mode: 'object', f: 5, d: 8, h: 2, task: T_EQ }), vi: 'Thực hành ảo: ảnh thật bằng vật', en: 'Virtual practical: a real image the size of the object', intro: 'Kéo vật tới khi ảnh thật cao bằng vật rồi bấm “Kiểm tra”.' },
      'obench-demo': { fn: (b) => bench(b, { mode: 'demo', f: 100 }), vi: 'Băng ghế quang học (Hình 8.9, 8.12)', en: 'The optical bench (Figures 8.9, 8.12)', intro: 'Kéo vật, thấu kính và màn; so sánh thấu kính hội tụ và phân kì.' },
      'obench-silberman': { fn: (b) => bench(b, { mode: 'silberman', f: 100 }), vi: 'Bàn thí nghiệm ảo: phương pháp đối xứng (Hình 9.1, Bảng 9.1)', en: 'Virtual lab bench: the symmetric method (Figure 9.1, Table 9.1)', intro: 'Dịch vật và màn ra xa đều nhau tới khi ảnh rõ nét, đọc d, d′, h, h′ và điền Bảng 9.1.' },
      'obench-bessel': { fn: (b) => bench(b, { mode: 'bessel', f: 100 }), vi: 'Phương pháp Bessel (Hình 9.2)', en: 'The Bessel method (Figure 9.2)', intro: 'Giữ L cố định, kéo thấu kính tới hai vị trí cho ảnh rõ nét và tính f = (L² − l²)/(4L).' }
    });
  }
  L.lensLab = lensLab; L.bench = bench;
})();
