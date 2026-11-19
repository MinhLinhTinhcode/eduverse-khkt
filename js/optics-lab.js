/* ==========================================================================
   OPTICS LAB — phòng thí nghiệm quang học ảo, kéo thả được (KHTN 9, Bài 5–6; dùng lại cho Bài 7–10)

   1. Engine thuần dữ liệu (không đụng DOM):  OpticsLab.engine
        refract(n1, n2, i)        → { tir, r, sinR }        (độ)
        criticalAngle(n1, n2)     → góc tới hạn (độ) hoặc null khi n1 ≤ n2
        reflect(i)                → i
        fresnel(n1, n2, i)        → { R, T }  (mô hình Fresnel trung bình hai phân cực — chỉ để minh hoạ độ sáng)
        refractVec(d, n, n1, n2)  → { dir, tir }  khúc xạ theo vectơ (d: hướng tia, n: pháp tuyến hướng về phía tia tới)
        reflectVec(d, n)          → hướng tia phản xạ
        traceFlat(...)            → dùng cho đồng xu, cáp quang
        selfTest()                → mảng kết quả kiểm tra; trang js/optics-lab.test.html in ra bảng
   2. Thành phần giao diện (SVG + Pointer Events, có bàn phím):  halfdisk, coin, arrows, fiber, mirage
   3. Đăng ký vào cơ chế mô phỏng của interactive.js:  window.LabSims  (id → {fn, vi, en, intro})

   THÊM MỘT BỀ MẶT / THÀNH PHẦN MỚI (ví dụ lăng kính, thấu kính):
     - Viết hàm thuần dữ liệu trong engine (vd. prism(n, A, i) hoặc thinLens(f, d)), thêm vào selfTest().
     - Viết hàm dựng giao diện fn(body, options) theo mẫu halfdisk(): dựng SVG một lần, mỗi khung hình chỉ setAttribute;
       dùng makeDrag(svg, handlers) để có kéo thả + phím mũi tên.
     - Đăng ký vào LabSims, rồi chèn { t:'sim', id:'...' } vào trang bài học.
   ========================================================================== */
(function () {
  'use strict';
  const root = typeof window !== 'undefined' ? window : globalThis;
  const D2R = Math.PI / 180, R2D = 180 / Math.PI;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const wrap180 = (a) => ((a + 180) % 360 + 360) % 360 - 180;

  /* ------------------------------------------------------------------ ENGINE */
  const E = {
    refract(n1, n2, i) {
      const s = n1 / n2 * Math.sin(i * D2R);
      if (s > 1 + 1e-12) return { tir: true, r: null, sinR: s };
      const sc = Math.min(1, s);
      return { tir: false, r: Math.asin(sc) * R2D, sinR: sc };
    },
    criticalAngle(n1, n2) { return n1 > n2 ? Math.asin(n2 / n1) * R2D : null; },
    reflect(i) { return i; },
    fresnel(n1, n2, i) {
      const si = Math.sin(i * D2R), ci = Math.cos(i * D2R), st = n1 / n2 * si;
      if (st >= 1) return { R: 1, T: 0 };
      const ct = Math.sqrt(1 - st * st);
      const rs = (n1 * ci - n2 * ct) / (n1 * ci + n2 * ct), rp = (n2 * ci - n1 * ct) / (n2 * ci + n1 * ct);
      const Rr = clamp((rs * rs + rp * rp) / 2, 0, 1);
      return { R: Rr, T: 1 - Rr };
    },
    dot: (a, b) => a[0] * b[0] + a[1] * b[1],
    refractVec(d, n, n1, n2) {
      const cosi = -(d[0] * n[0] + d[1] * n[1]), eta = n1 / n2, k = 1 - eta * eta * (1 - cosi * cosi);
      if (k < 0) return { dir: null, tir: true };
      const c = eta * cosi - Math.sqrt(k);
      return { dir: [eta * d[0] + c * n[0], eta * d[1] + c * n[1]], tir: false };
    },
    reflectVec(d, n) { const p = 2 * (d[0] * n[0] + d[1] * n[1]); return [d[0] - p * n[0], d[1] - p * n[1]]; },
    /* Cáp quang thẳng: tia vào mặt đầu với góc theta (độ, so với trục), lõi n1, vỏ n2.
       Trả về các điểm gãy khúc (đơn vị bất kì), số lần phản xạ toàn phần và liệu ánh sáng có thoát ra khỏi lõi không. */
    fiber(theta, n1, n2, halfW, len, maxBounce) {
      const t = theta * D2R, d0 = [Math.cos(t), Math.sin(t)], rv = E.refractVec(d0, [-1, 0], 1, n1);
      const pts = [[0, 0]]; let bounces = 0, leaks = null;
      if (rv.tir) return { pts, bounces: 0, leaks: null, ok: false };
      let d = rv.dir, p = [0, 0];
      const ith = E.criticalAngle(n1, n2);
      for (let k = 0; k < (maxBounce || 40); k++) {
        const wall = d[1] > 0 ? halfW : -halfW;
        const tHit = d[1] === 0 ? Infinity : (wall - p[1]) / d[1], tEnd = (len - p[0]) / d[0];
        if (tEnd <= tHit) { pts.push([len, p[1] + d[1] * tEnd]); return { pts, bounces, leaks: null, ok: true }; }
        p = [p[0] + d[0] * tHit, wall]; pts.push(p);
        const ci = Math.abs(d[1]), inc = Math.acos(ci) * R2D;       // góc tới so với pháp tuyến của thành
        if (ith != null && inc >= ith - 1e-9) { d = [d[0], -d[1]]; bounces++; }
        else {
          const nr = E.refractVec(d, [0, d[1] > 0 ? -1 : 1], n1, n2);
          leaks = { at: p, dir: nr.dir || [d[0], d[1]] }; return { pts, bounces, leaks, ok: true };
        }
      }
      return { pts, bounces, leaks: null, ok: true };
    },
    acceptanceAngle(n1, n2) { const v = n1 * n1 - n2 * n2; return v <= 0 ? 0 : v >= 1 ? 90 : Math.asin(Math.sqrt(v)) * R2D; },
    /* Ảo ảnh: chiết suất không khí theo độ cao y (px): n(y) = nInf − Δ·exp(−y/h0); Δ tỉ lệ độ chênh nhiệt (phóng đại để dễ thấy). */
    airIndex(y, dT, h0) { return 1.0003 - 0.0015 * dT * Math.exp(-Math.max(0, y) / h0); },
    mirage(xA, yA, xO, yO, dT, h0) {
      if (dT <= 0) return null;
      const nOf = (y) => E.airIndex(y, dT, h0), DX = 1;
      /* bắn tia từ A với góc phát phi (độ, dưới đường nằm ngang); p = n·cos(θ) không đổi (định luật Snell cho các lớp mỏng) */
      const shoot = (phi, keep) => {
        const p = nOf(yA) * Math.cos(phi * D2R), pts = keep ? [[xA, yA]] : null;
        let x = xA, y = yA, sg = -1, hit = null;
        for (let k = 0; k < 4000 && x < xO; k++) {
          const n = nOf(y), v = n * n - p * p;
          let vv = v; if (vv <= 1e-9) { if (sg < 0) sg = 1; vv = 1e-9; }
          const slope = Math.sqrt(vv) / p;
          y += sg * Math.min(slope * 6, 30) * DX; x += DX;
          if (y <= 0) return { fail: true };
          if (keep) pts.push([x, y]);
        }
        return { y, pts, x, up: sg > 0 };
      };
      let prev = null, found = null;
      for (let phi = 0.2; phi <= 40; phi += 0.1) {
        const r = shoot(phi, false);
        if (r.fail || !r.up) { prev = null; continue; }
        const d = r.y - yO;
        if (prev && prev.d * d <= 0) { found = [prev.phi, phi]; break; }
        prev = { phi, d };
      }
      if (!found) return { visible: false, dmin: null };
      let lo = found[0], hi = found[1];
      for (let k = 0; k < 30; k++) { const m = (lo + hi) / 2, rl = shoot(lo, false), rm = shoot(m, false); if (rl.fail || rm.fail) break; if ((rl.y - yO) * (rm.y - yO) <= 0) hi = m; else lo = m; }
      const r = shoot((lo + hi) / 2, true), pts = r.pts, L = pts[pts.length - 1], Q = pts[pts.length - 8], slope = (L[1] - Q[1]) / (L[0] - Q[0]);
      return { visible: true, pts, yTurn: Math.min.apply(null, pts.map((q) => q[1])), image: [xA, L[1] - slope * (L[0] - xA)] };
    },
    selfTest() {
      const T = [], near = (a, b, e) => Math.abs(a - b) <= (e == null ? 0.05 : e);
      const add = (n, ok, got) => T.push({ name: n, ok: !!ok, got });
      add('i = 0 → r = 0', E.refract(1, 1.5, 0).r === 0, E.refract(1, 1.5, 0).r);
      const r60 = E.refract(1, 1.5, 60).r; add('thuỷ tinh 1,5: i = 60° → r ≈ 35,3°', near(r60, 35.26, 0.05), r60);
      const r20 = E.refract(1, 1.5, 20).r; add('i = 20° → r ≈ 13,2°', near(r20, 13.17, 0.05), r20);
      const rw = E.refract(1, 1.333, 60).r; add('không khí → nước, i = 60° → r ≈ 40,5°', near(rw, 40.5, 0.1), rw);
      add('n = 1,5 → i_th ≈ 41,8°', near(E.criticalAngle(1.5, 1), 41.81, 0.01), E.criticalAngle(1.5, 1));
      add('nước (4/3) → không khí: i_th ≈ 48,6°', near(E.criticalAngle(4 / 3, 1), 48.59, 0.01), E.criticalAngle(4 / 3, 1));
      add('n1 ≤ n2 → không có góc tới hạn', E.criticalAngle(1, 1.5) === null && E.criticalAngle(1, 1) === null, null);
      const w30 = E.refract(4 / 3, 1, 30); add('nước → không khí, i = 30° → r ≈ 41,8°', near(w30.r, 41.81, 0.01), w30.r);
      const w60 = E.refract(4 / 3, 1, 60); add('nước → không khí, i = 60° → phản xạ toàn phần (sin r ≈ 1,155)', w60.tir && near(w60.sinR, 1.1547, 0.001), w60.sinR);
      const eq = E.refract(1.5, 1, E.criticalAngle(1.5, 1)); add('i = i_th → r = 90° (biên)', !eq.tir && near(eq.r, 90, 0.01), eq.r);
      const e90 = E.refract(1, 1.5, 90); add('i = 90° (đi từ không khí): r = i_th ≈ 41,8°, không NaN', near(e90.r, 41.81, 0.01) && !isNaN(e90.r), e90.r);
      const t90 = E.refract(1.5, 1, 90); add('i = 90° (thuỷ tinh → không khí): phản xạ toàn phần', t90.tir === true && !isNaN(t90.sinR), t90.sinR);
      add('sin i / sin r = n21 = 1,5', near(Math.sin(40 * D2R) / Math.sin(E.refract(1, 1.5, 40).r * D2R), 1.5, 1e-9), null);
      const fr0 = E.fresnel(1, 1.5, 0); add('Fresnel: i = 0, R = 4 %', near(fr0.R, 0.04, 0.001), fr0.R);
      add('Fresnel: R + T = 1; TIR cho R = 1', near(E.fresnel(1, 1.5, 70).R + E.fresnel(1, 1.5, 70).T, 1, 1e-12) && E.fresnel(1.5, 1, 60).R === 1, null);
      const rv = E.refractVec([Math.sin(60 * D2R), Math.cos(60 * D2R)], [0, -1], 1, 1.5);
      add('refractVec khớp refract (i = 60°)', near(Math.atan2(rv.dir[0], rv.dir[1]) * R2D, 35.26, 0.05), Math.atan2(rv.dir[0], rv.dir[1]) * R2D);
      add('acceptanceAngle(1,5; 1,4) ≈ 32,6°', near(E.acceptanceAngle(1.5, 1.4), 32.61, 0.05), E.acceptanceAngle(1.5, 1.4));
      const f = E.fiber(10, 1.5, 1.4, 1, 100, 60); add('cáp quang: tia 10° vào được dẫn đến cuối (có phản xạ toàn phần)', f.bounces > 0 && !f.leaks, f.bounces);
      const f2 = E.fiber(50, 1.5, 1.4, 1, 100, 60); add('cáp quang: tia 50° (> góc nhận sáng) thoát ra khỏi lõi', !!f2.leaks, f2.bounces);
      const mi = E.mirage(40, 120, 300, 34, 40, 14); add('ảo ảnh: người quan sát ở xa → có tia phản xạ toàn phần', mi && mi.visible, mi && mi.visible);
      const mj = E.mirage(40, 120, 80, 34, 40, 14); add('ảo ảnh: người quan sát ở gần → không có ảo ảnh', mj && !mj.visible, mj && mj.visible);
      return T;
    }
  };

  /* ------------------------------------------------------------ TIỆN ÍCH CHUNG */
  const MEDIA = [
    { id: 'air', vi: 'Không khí', en: 'Air', n: 1 },
    { id: 'ice', vi: 'Nước đá', en: 'Ice', n: 1.309 },
    { id: 'water', vi: 'Nước', en: 'Water', n: 1.333 },
    { id: 'alcohol', vi: 'Ethylic alcohol', en: 'Ethyl alcohol', n: 1.361 },
    { id: 'crown', vi: 'Thuỷ tinh crown', en: 'Crown glass', n: 1.5 },
    { id: 'salt', vi: 'Muối ăn (NaCl)', en: 'Table salt (NaCl)', n: 1.544 },
    { id: 'flint', vi: 'Thuỷ tinh flint', en: 'Flint glass', n: 1.7 },
    { id: 'diamond', vi: 'Kim cương', en: 'Diamond', n: 2.419 }
  ];
  let uid = 0;
  const fmt = (v, d) => { const r = +(+v).toFixed(d == null ? 1 : d); return String(Object.is(r, -0) ? 0 : r).replace('.', ',').replace('-', '−'); };
  const pr = (vi, en) => '<span class="vi">' + vi + '</span><span class="en" lang="en">' + en + '</span>';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const setA = (el, o) => { if (!el) return; for (const k in o) el.setAttribute(k, o[k]); };
  const raf = (fn) => { let q = 0; return () => { if (q) return; q = requestAnimationFrame(() => { q = 0; fn(); }); }; };

  /* Kéo thả bằng Pointer Events (chuột, cảm ứng, bút) + bàn phím. handlers[tên] = { move(x, y, ev), key(dir, shift, axis) } */
  function makeDrag(svg, handlers) {
    let cur = null;
    const pt = (e) => { const m = svg.getScreenCTM(); if (!m) return [0, 0]; const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; const q = p.matrixTransform(m.inverse()); return [q.x, q.y]; };
    const hOf = (e) => e.target.closest ? e.target.closest('[data-h]') : null;
    svg.addEventListener('pointerdown', (e) => {
      const h = hOf(e); if (!h || !handlers[h.dataset.h]) return;
      cur = h.dataset.h; try { svg.setPointerCapture(e.pointerId); } catch (x) { /* bỏ qua */ }
      h.classList.add('is-drag'); svg.classList.add('is-dragging'); e.preventDefault(); h.focus && h.focus({ preventScroll: true });
      const p = pt(e); handlers[cur].move(p[0], p[1], e);
    });
    svg.addEventListener('pointermove', (e) => { if (!cur) return; const p = pt(e); handlers[cur].move(p[0], p[1], e); });
    const end = () => { if (!cur) return; cur = null; svg.classList.remove('is-dragging'); $$('.is-drag', svg).forEach((x) => x.classList.remove('is-drag')); };
    svg.addEventListener('pointerup', end); svg.addEventListener('pointercancel', end); svg.addEventListener('lostpointercapture', end);
    svg.addEventListener('keydown', (e) => {
      const h = hOf(e); if (!h || !handlers[h.dataset.h] || !handlers[h.dataset.h].key) return;
      const k = e.key, st = e.shiftKey ? 5 : 1;
      let dir = 0, axis = 'x';
      if (k === 'ArrowRight') dir = st; else if (k === 'ArrowLeft') dir = -st; else if (k === 'ArrowUp') { dir = st; axis = 'y'; } else if (k === 'ArrowDown') { dir = -st; axis = 'y'; } else return;
      e.preventDefault(); e.stopPropagation(); handlers[h.dataset.h].key(dir, e.shiftKey, axis);
    });
  }

  const toCSV = (head, rows) => [head.join(';')].concat(rows.map((r) => r.join(';'))).join('\n');
  function copyText(txt, done) {
    const ok = () => done && done(true);
    try { if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(txt).then(ok, () => fallback()); return; } } catch (e) { /* tiếp */ }
    fallback();
    function fallback() { try { const t = document.createElement('textarea'); t.value = txt; t.style.position = 'fixed'; t.style.opacity = '0'; document.body.appendChild(t); t.select(); const r = document.execCommand('copy'); t.remove(); done && done(r); } catch (e) { done && done(false); } }
  }

  const mediaSel = (key, val) => '<select data-k="' + key + '" class="olab__sel">' + MEDIA.map((m) => '<option value="' + m.n + '"' + (Math.abs(m.n - val) < 1e-6 ? ' selected' : '') + '>' + m.vi + ' (n = ' + fmt(m.n, 3) + ')</option>').join('') + '</select>';

  /* ------------------------------------------------- BẢN BÁN TRỤ + VÒNG CHIA ĐỘ */
  /* opt: nA (phía mặt phẳng hướng lên), nB (bản bán trụ), w (góc nguồn), media (chọn chất), table ('snell'|'tir'),
          graph, pins, task {kind:'r'|'ith', value, vi, en}, lockSide */
  function halfdisk(body, opt) {
    const o = Object.assign({ nA: 1, nB: 1.5, w: 35, media: false, table: 'snell', graph: true, pins: false, task: null, nameA: 'không khí', nameAen: 'air', nameB: 'thuỷ tinh', nameBen: 'glass' }, opt || {});
    const id = 'ol' + (++uid), W = 440, cx = 220, cy = 220, R = 190, RD = 150;
    const S = { w: o.w, rot: 0, nA: o.nA, nB: o.nB, snap: 0, normal: true, labels: true, rows: [], pinC: 215, showRef: !o.pins };
    const P = (th, r) => [cx + r * Math.sin(th * D2R), cy - r * Math.cos(th * D2R)];
    const f2 = (p) => p[0].toFixed(1) + ',' + p[1].toFixed(1);
    const arcPath = (a1, a2, r) => { const p1 = P(a1, r), p2 = P(a2, r); return 'M' + f2(p1) + ' A' + r + ' ' + r + ' 0 0 ' + (a2 > a1 ? 1 : 0) + ' ' + f2(p2); };
    const arrowPts = (a, b, t) => { const x = a[0] + (b[0] - a[0]) * t, y = a[1] + (b[1] - a[1]) * t, ang = Math.atan2(b[1] - a[1], b[0] - a[0]), h = 11; const q = (d) => [x - h * Math.cos(ang + d), y - h * Math.sin(ang + d)]; return x.toFixed(1) + ',' + y.toFixed(1) + ' ' + f2(q(.4)) + ' ' + f2(q(-.4)); };
    const ticks = (() => { let d = ''; for (let f = 0; f <= 90; f++) { const L = f % 10 === 0 ? 14 : f % 5 === 0 ? 10 : 6; [f, -f, 180 - f, -180 + f].forEach((th) => { d += 'M' + f2(P(th, RD)) + 'L' + f2(P(th, RD + L)); }); } return d; })();
    const labs = (() => { let s = ''; [[0, 0], [10, 0], [20, 0], [30, 0], [40, 0], [50, 0], [60, 0], [70, 0], [80, 0], [90, 0]].forEach((q) => { const f = q[0]; const set = f === 0 ? [0, 180] : f === 90 ? [90, -90] : [f, -f, 180 - f, -180 + f]; set.forEach((th) => { const p = P(th, RD + 28); s += '<text class="olab__tick" x="' + p[0].toFixed(1) + '" y="' + (p[1] + 4).toFixed(1) + '" text-anchor="middle">' + f + '°</text>'; }); }); return s; })();

    const taskHtml = o.task ? '<div class="olab__task"><p class="olab__taskq">' + pr(o.task.vi, o.task.en) + '</p><div class="olab__taskrow">' +
      (o.task.kind === 'r' ? '<label>i = <input type="number" class="olab__in" data-ans step="0.1" inputmode="decimal"> °</label>' : '') +
      '<button type="button" class="btn btn--sm" data-act="check">' + pr('Kiểm tra', 'Check') + '</button><span class="olab__fb" data-fb role="status" aria-live="polite"></span></div></div>' : '';

    body.innerHTML =
      '<div class="olab" data-lab="' + id + '"><p class="olab__hint">' + pr('Kéo chấm đỏ để đổi góc tới, kéo ô vuông để xoay bản bán trụ cùng thang chia độ. Bàn phím: chọn tay nắm rồi dùng mũi tên (Shift = 5°).', 'Drag the red dot to change the angle of incidence; drag the square to rotate the block with its scale. Keyboard: focus a handle and use the arrow keys (Shift = 5°).') + '</p>' + taskHtml +
      '<div class="olab__cols"><div class="olab__stage"><svg class="olab__svg" viewBox="0 0 ' + W + ' ' + W + '" role="group" aria-label="Bản bán trụ, vòng tròn chia độ và các tia sáng">' +
      '<g data-r="grp"><rect data-r="tA" x="' + (cx - RD) + '" y="' + (cy - RD) + '" width="' + 2 * RD + '" height="' + RD + '" class="olab__medA"/>' +
      '<path data-r="tB" d="M' + (cx - RD) + ' ' + cy + ' A' + RD + ' ' + RD + ' 0 0 0 ' + (cx + RD) + ' ' + cy + ' Z" class="olab__medB"/>' +
      '<path d="' + ticks + '" class="olab__ticks"/>' + labs +
      '<line class="olab__interface" x1="' + (cx - RD - 14) + '" y1="' + cy + '" x2="' + (cx + RD + 14) + '" y2="' + cy + '"/>' +
      '<line data-r="nrm" class="olab__normal" x1="' + cx + '" y1="' + (cy - R) + '" x2="' + cx + '" y2="' + (cy + R) + '"/>' +
      '<path data-r="arcI" class="olab__arc olab__arc--i"/><path data-r="arcR" class="olab__arc olab__arc--r"/><path data-r="arcL" class="olab__arc olab__arc--l"/>' +
      '<line data-r="refl" class="olab__ray olab__ray--refl" x1="' + cx + '" y1="' + cy + '"/><polygon data-r="reflH" class="olab__head olab__head--refl"/>' +
      '<line data-r="refr" class="olab__ray olab__ray--refr" x1="' + cx + '" y1="' + cy + '"/><polygon data-r="refrH" class="olab__head olab__head--refr"/>' +
      '<line data-r="ithl" class="olab__ith"/><text data-r="ithT" class="olab__lab olab__lab--ith" text-anchor="middle"></text>' +
      '<text data-r="tI" class="olab__lab olab__lab--i" text-anchor="middle"></text><text data-r="tR" class="olab__lab olab__lab--r" text-anchor="middle"></text><text data-r="tL" class="olab__lab olab__lab--l" text-anchor="middle"></text>' +
      (o.pins ? '<g data-r="pinA"><circle r="6" class="olab__pin"/><text class="olab__lab" y="-10" text-anchor="middle">A</text></g><g data-h="pinC" data-r="pinCg" tabindex="0" role="slider" aria-label="Đinh ghim C / Pin C" aria-valuemin="95" aria-valuemax="265" class="olab__hd olab__hd--pin"><circle r="32" class="olab__hit"/><circle r="8" class="olab__pin olab__pin--c"/><text class="olab__lab" y="-14" text-anchor="middle">C</text></g>' : '') +
      '</g>' +
      '<line data-r="inc" class="olab__ray olab__ray--inc" x1="' + cx + '" y1="' + cy + '"/><polygon data-r="incH" class="olab__head olab__head--inc"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="5" class="olab__I"/><text x="' + (cx + 10) + '" y="' + (cy + 18) + '" class="olab__lab">I</text>' +
      '<g data-h="src" data-r="src" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="90" class="olab__hd olab__hd--src"><circle r="32" class="olab__hit"/><circle r="11" class="olab__dot"/><text class="olab__lab olab__lab--s" y="-17" text-anchor="middle">' + (o.pins ? 'B' : 'S') + '</text></g>' +
      '<g data-h="rot" data-r="rot" tabindex="0" role="slider" aria-valuemin="-60" aria-valuemax="60" aria-label="Xoay bản bán trụ / Rotate the block" class="olab__hd olab__hd--rot"><circle r="32" class="olab__hit"/><rect x="-9" y="-9" width="18" height="18" rx="4" class="olab__sq"/></g>' +
      '</svg></div>' +
      '<div class="olab__panel">' + '<div class="olab__rowc">' +
      '<label class="olab__ctl"><span>' + pr('Góc tới i (°)', 'Angle of incidence i (°)') + '</span><span class="olab__pair"><input type="range" data-k="i" min="0" max="89" step="0.5" value="35"><input type="number" class="olab__in" data-k="in" min="0" max="89" step="0.5" value="35" inputmode="decimal"></span></label>' +
      '<label class="olab__ctl"><span>' + pr('Xoay bản bán trụ (°)', 'Rotate the block (°)') + '</span><span class="olab__pair"><input type="range" data-k="rot" min="-60" max="60" step="1" value="0"><output data-out="rot">0</output></span></label>' +
      '<fieldset class="olab__ctl olab__side"><legend>' + pr('Ánh sáng đi từ', 'Light comes from') + '</legend><label><input type="radio" name="' + id + 's" value="A" checked> <span data-lblA></span></label><label><input type="radio" name="' + id + 's" value="B"> <span data-lblB></span></label></fieldset>' +
      (o.media ? '<div class="olab__media"><label class="olab__ctl"><span>' + pr('Môi trường phía trên (A)', 'Upper medium (A)') + '</span>' + mediaSel('mA', S.nA) + '</label><label class="olab__ctl"><span>' + pr('Bản bán trụ (B)', 'The half-disc (B)') + '</span>' + mediaSel('mB', S.nB) + '</label>' +
        '<label class="olab__ctl"><span>' + pr('Hoặc chọn n tuỳ ý cho B', 'Or choose any n for B') + ' = <output data-out="nB">' + fmt(S.nB, 2) + '</output></span><input type="range" data-k="nB" min="1" max="2.5" step="0.01" value="' + S.nB + '"></label></div>' : '') +
      '<div class="olab__opts"><label>' + pr('Hít vào vạch', 'Snap') + ' <select data-k="snap" class="olab__sel"><option value="0">' + 'Tắt / Off' + '</option><option value="1">1°</option><option value="5">5°</option></select></label>' +
      '<label><input type="checkbox" data-k="normal" checked> ' + pr('Pháp tuyến', 'Normal') + '</label><label><input type="checkbox" data-k="labels" checked> ' + pr('Nhãn góc', 'Angle labels') + '</label>' +
      (o.pins ? '<label><input type="checkbox" data-k="showRef"> ' + pr('Hiện tia khúc xạ thật', 'Show the real refracted ray') + '</label>' : '') + '</div>' +
      '<div class="olab__btns"><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button>' + (o.pins ? '' : '<button type="button" class="btn btn--sm btn--primary" data-act="rec">' + pr('Ghi kết quả', 'Record') + '</button><button type="button" class="btn btn--sm" data-act="clear">' + pr('Xoá bảng', 'Clear table') + '</button><button type="button" class="btn btn--sm" data-act="csv">' + pr('Sao chép CSV', 'Copy CSV') + '</button>') + '</div></div>' +
      '<div class="olab__read" data-read aria-live="polite"></div>' +
      (o.graph && !o.pins ? '<div class="olab__graphwrap"><svg class="olab__graph" viewBox="0 0 190 170" role="img" aria-label="Đồ thị sin r theo sin i"><g data-r="gr"></g></svg><p class="olab__gcap">' + pr('Đồ thị sin r theo sin i: đường thẳng khi chưa có phản xạ toàn phần', 'sin r against sin i: a straight line until total internal reflection') + '</p></div>' : '') +
      (o.pins ? '' : '<div class="tablewrap"><table class="olab__tbl" data-tbl></table></div>') +
      '<p class="olab__msg" data-msg role="status" aria-live="polite"></p></div></div></div>';

    const lab = $('[data-lab="' + id + '"]', body), svg = $('.olab__svg', lab);
    const q = (n) => $('[data-r="' + n + '"]', svg);
    const E_ = {}; ['grp', 'tA', 'tB', 'nrm', 'arcI', 'arcR', 'arcL', 'refl', 'reflH', 'refr', 'refrH', 'ithl', 'ithT', 'tI', 'tR', 'tL', 'inc', 'incH', 'src', 'rot', 'pinA', 'pinCg'].forEach((n) => { E_[n] = q(n); });

    function nameOf(n, side) {
      const m = MEDIA.find((x) => Math.abs(x.n - n) < 1e-6);
      if (m) return m;
      return side === 'A' ? { vi: o.nameA, en: o.nameAen } : { vi: o.nameB, en: o.nameBen };
    }
    function calc() {
      const rel = wrap180(S.w - S.rot), top = Math.abs(rel) < 90, s = rel < 0 ? -1 : 1;
      const i = top ? Math.abs(rel) : 180 - Math.abs(rel);
      const n1 = top ? S.nA : S.nB, n2 = top ? S.nB : S.nA;
      const rf = E.refract(n1, n2, i), fr = E.fresnel(n1, n2, i);
      return { rel, top, s, i, n1, n2, rf, fr, posRefl: -rel, posRefr: rf.tir ? null : (top ? 180 + s * rf.r : -s * rf.r), ith: E.criticalAngle(n1, n2) };
    }
    const opac = (x) => Math.max(.14, Math.min(1, Math.sqrt(x) * 1.25));
    let last = null;
    function draw() {
      const c = last = calc(), Pw = (th, r) => P(th + S.rot, r);
      setA(E_.grp, { transform: 'rotate(' + S.rot + ' ' + cx + ' ' + cy + ')' });
      setA(E_.tA, { 'fill-opacity': clamp((S.nA - 1) * 0.3 + 0.04, 0.04, 0.7) }); setA(E_.tB, { 'fill-opacity': clamp((S.nB - 1) * 0.3 + 0.1, 0.08, 0.75) });
      setA(E_.nrm, { visibility: S.normal ? 'visible' : 'hidden' });
      const A0 = P(S.w, R), I0 = [cx, cy];
      setA(E_.inc, { x2: A0[0], y2: A0[1] }); setA(E_.incH, { points: arrowPts(A0, I0, .5) });
      setA(E_.src, { transform: 'translate(' + A0[0].toFixed(1) + ',' + A0[1].toFixed(1) + ')', 'aria-valuenow': c.i.toFixed(1), 'aria-valuetext': 'i = ' + fmt(c.i, 1) + '°', 'aria-label': (o.pins ? 'Đinh ghim B, ' : 'Nguồn sáng, ') + 'góc tới ' + fmt(c.i, 1) + '° / angle of incidence ' + fmt(c.i, 1) + '°' });
      const RH = P(S.rot - 90, 205); setA(E_.rot, { transform: 'translate(' + RH[0].toFixed(1) + ',' + RH[1].toFixed(1) + ')', 'aria-valuenow': S.rot, 'aria-valuetext': S.rot + '°' });
      // tia phản xạ (cục bộ)
      const showRefl = true;
      const rl = P(c.posRefl, R); setA(E_.refl, { x2: rl[0], y2: rl[1], 'stroke-opacity': opac(c.fr.R), visibility: showRefl ? 'visible' : 'hidden' }); setA(E_.reflH, { points: arrowPts(I0, rl, .55), 'fill-opacity': opac(c.fr.R) });
      const showRefr = !c.rf.tir && (S.showRef || !o.pins);
      if (showRefr) { const rr = P(c.posRefr, R); setA(E_.refr, { x2: rr[0], y2: rr[1], visibility: 'visible', 'stroke-opacity': opac(c.fr.T) }); setA(E_.refrH, { points: arrowPts(I0, rr, .55), visibility: 'visible', 'fill-opacity': opac(c.fr.T) }); }
      else { setA(E_.refr, { visibility: 'hidden' }); setA(E_.refrH, { visibility: 'hidden' }); }
      // cung và nhãn góc
      const thn = c.top ? 0 : 180, dI = wrap180(c.rel - thn);
      setA(E_.arcI, { d: arcPath(thn, thn + dI, 62), visibility: S.labels && c.i > 0.4 ? 'visible' : 'hidden' });
      const tIp = P(thn + dI / 2, 86); setA(E_.tI, { x: tIp[0], y: tIp[1] + 4, visibility: S.labels && c.i > 0.4 ? 'visible' : 'hidden' }); E_.tI.textContent = 'i = ' + fmt(c.i, 1) + '°';
      if (showRefr) { const thr = c.top ? 180 : 0, dR = wrap180(c.posRefr - thr); setA(E_.arcR, { d: arcPath(thr, thr + dR, 62), visibility: S.labels && c.rf.r > 0.4 ? 'visible' : 'hidden' }); const tRp = P(thr + dR / 2, 86); setA(E_.tR, { x: tRp[0], y: tRp[1] + 4, visibility: S.labels && c.rf.r > 0.4 ? 'visible' : 'hidden' }); E_.tR.textContent = 'r = ' + fmt(c.rf.r, 1) + '°'; }
      else { setA(E_.arcR, { visibility: 'hidden' }); setA(E_.tR, { visibility: 'hidden' }); }
      setA(E_.arcL, { visibility: 'hidden' });
      const tLp = P(-c.rel * 0 + (c.top ? 0 : 180) + (-c.s) * 28, 112); setA(E_.tL, { x: tLp[0], y: tLp[1], visibility: 'hidden' });
      // vạch góc tới hạn
      const ithEl = E_.ithl;
      if (c.ith != null && o.table === 'tir') { const a = P(thn + c.s * c.ith, RD - 2), b = P(thn + c.s * c.ith, R); setA(ithEl, { x1: a[0], y1: a[1], x2: b[0], y2: b[1], visibility: 'visible' }); const tp = P(thn + c.s * c.ith, R + 14); setA(E_.ithT, { x: tp[0], y: tp[1], visibility: 'visible' }); E_.ithT.textContent = 'i_th'; } else { setA(ithEl, { visibility: 'hidden' }); setA(E_.ithT, { visibility: 'hidden' }); }
      if (o.pins) { const pa = P(0, 112); setA(E_.pinA, { transform: 'translate(' + pa[0] + ',' + pa[1] + ')' }); const pc = P(S.pinC, 120); setA(E_.pinCg, { transform: 'translate(' + pc[0].toFixed(1) + ',' + pc[1].toFixed(1) + ')', 'aria-valuenow': S.pinC.toFixed(0), 'aria-valuetext': 'góc ' + Math.round(S.pinC) + '°' }); }
      // bảng đọc
      const nm1 = nameOf(c.n1, c.top ? 'A' : 'B'), nm2 = nameOf(c.n2, c.top ? 'B' : 'A');
      let st;
      if (c.rf.tir) st = pr('<b>Phản xạ toàn phần</b>: không còn tia khúc xạ', '<b>Total internal reflection</b>: no refracted ray');
      else if (c.ith != null && Math.abs(c.i - c.ith) < 0.6) st = pr('Sát góc tới hạn: tia khúc xạ gần như sát mặt phân cách', 'At the critical angle: the refracted ray almost grazes the surface');
      else st = pr('Có tia khúc xạ và tia phản xạ', 'Both a refracted and a reflected ray');
      const sinI = Math.sin(c.i * D2R), sinR = c.rf.sinR;
      const rows = [
        [pr('Môi trường tia tới → tia khúc xạ', 'Incident → refracting medium'), nm1.vi + ' → ' + nm2.vi + ' (<span lang="en">' + nm1.en + ' → ' + nm2.en + '</span>)'],
        ['i', fmt(c.i, 1) + '°'], ['r', c.rf.tir ? '—' : fmt(c.rf.r, 1) + '°'], ['i′ (' + 'phản xạ / reflected' + ')', fmt(c.i, 1) + '°'],
        ['sin i', fmt(sinI, 3)], ['sin r', c.rf.tir ? fmt(sinR, 3) + ' > 1' : fmt(sinR, 3)],
        ['sin i / sin r', c.rf.tir || sinR === 0 ? '—' : fmt(sinI / sinR, 3)], ['n₂₁ = n₂ / n₁', fmt(c.n2 / c.n1, 3)],
        [pr('Góc tới hạn i_th', 'Critical angle i_th'), c.ith == null ? pr('không có (n₁ ≤ n₂)', 'none (n₁ ≤ n₂)') : fmt(c.ith, 1) + '°'],
        [pr('Độ sáng (minh hoạ, mô hình Fresnel)', 'Brightness (illustrative, Fresnel model)'), pr('phản xạ ', 'reflected ') + fmt(c.fr.R * 100, 0) + ' % · ' + pr('khúc xạ ', 'refracted ') + fmt(c.fr.T * 100, 0) + ' %']
      ];
      $('[data-read]', lab).innerHTML = '<table class="olab__tbl olab__tbl--read"><tbody>' + rows.map((r) => '<tr><th scope="row">' + r[0] + '</th><td>' + r[1] + '</td></tr>').join('') + '</tbody></table><p class="olab__status">' + st + '</p>';
      const msg = $('[data-msg]', lab);
      if (o.table === 'tir' && c.ith == null) msg.innerHTML = pr('n₁ ≤ n₂ nên không thể có phản xạ toàn phần: hãy cho ánh sáng đi từ môi trường chiết suất lớn hơn.', 'Because n₁ ≤ n₂, total internal reflection cannot occur: send the light from the medium with the larger index.');
      else msg.textContent = '';
      // tên hai phía
      $('[data-lblA]', lab).innerHTML = pr(nameOf(S.nA, 'A').vi + ' (A)', nameOf(S.nA, 'A').en + ' (A)'); $('[data-lblB]', lab).innerHTML = pr(nameOf(S.nB, 'B').vi + ' (B)', nameOf(S.nB, 'B').en + ' (B)');
      // đồng bộ điều khiển
      const ri = $('[data-k="i"]', lab), ni = $('[data-k="in"]', lab); if (document.activeElement !== ni) ni.value = (+c.i.toFixed(1)); ri.value = Math.min(89, c.i);
      const rr = $('[data-k="rot"]', lab); rr.value = S.rot; $('[data-out="rot"]', lab).textContent = S.rot;
      $$('input[name="' + id + 's"]', lab).forEach((x) => { x.checked = x.value === (c.top ? 'A' : 'B'); });
      drawGraph(c);
      if (o.pins) pinStatus(c);
    }
    function drawGraph(c) {
      const g = $('[data-r="gr"]', lab); if (!g) return;
      const X = (v) => 30 + v * 140, Y = (v) => 140 - v * 120, k = c.n1 / c.n2, xe = Math.min(1, 1 / k);
      let h = '<line class="olab__ax" x1="30" y1="140" x2="175" y2="140"/><line class="olab__ax" x1="30" y1="140" x2="30" y2="12"/><text class="olab__tick" x="172" y="156" text-anchor="end">sin i</text><text class="olab__tick" x="26" y="18" text-anchor="end">sin r</text><text class="olab__tick" x="30" y="154" text-anchor="middle">0</text><text class="olab__tick" x="170" y="154" text-anchor="middle">1</text><text class="olab__tick" x="22" y="26" text-anchor="end">1</text>';
      h += '<line class="olab__gl" x1="' + X(0) + '" y1="' + Y(0) + '" x2="' + X(xe) + '" y2="' + Y(Math.min(1, k * xe)) + '"/>';
      if (k * 1 > 1) h += '<line class="olab__gl olab__gl--tir" x1="' + X(xe) + '" y1="' + Y(1) + '" x2="' + X(1) + '" y2="' + Y(1) + '"/>';
      S.rows.forEach((r) => { if (r.sinI != null && r.sinR != null) h += '<circle cx="' + X(r.sinI) + '" cy="' + Y(r.sinR) + '" r="3.5" class="olab__gp"/>'; });
      h += '<circle cx="' + X(Math.sin(c.i * D2R)) + '" cy="' + Y(Math.min(1, c.rf.sinR)) + '" r="6" class="olab__gc"/>';
      g.innerHTML = h;
    }
    function pinStatus(c) {
      const msg = $('[data-msg]', lab);
      if (!c.top) { msg.innerHTML = pr('Hãy đặt nguồn B ở phía trên (không khí).', 'Place pin B in the upper side (air).'); return; }
      const dev = Math.abs(wrap180(S.pinC - c.posRefr));
      msg.innerHTML = dev <= 1.5 ? pr('<b>✓ O, B, C thẳng hàng qua bản bán trụ</b>: đầu đinh C che khuất ảnh của B và O. Tia khúc xạ là OC, nằm cùng mặt phẳng tới, ở bên kia pháp tuyến.', '<b>✓ O, B and C line up through the block</b>: pin C hides the images of B and O. The refracted ray is OC, in the plane of incidence on the other side of the normal.')
        : pr('Kéo đinh C quanh O cho tới khi nhìn qua bản bán trụ thấy đầu C che khuất ảnh của B và O. Lệch hiện nay ' + fmt(dev, 1) + '°.', 'Drag pin C around O until, looking through the block, C hides the images of B and O. Current error ' + fmt(dev, 1) + '°.');
    }
    const redraw = raf(draw);

    /* chuyển (i, bên, dấu) thành góc nguồn trong hệ toạ độ thế giới */
    function setI(i, side, sign) {
      i = clamp(i, 0, 89.9); const s = sign || (last ? last.s : 1) || 1;
      const rel = side === 'A' ? s * i : s * (180 - i);
      S.w = wrap180(S.rot + rel);
    }
    const snapI = (i) => (S.snap ? Math.round(i / S.snap) * S.snap : i);
    makeDrag(svg, {
      src: { move(x, y) { const wa = Math.atan2(x - cx, -(y - cy)) * R2D; const rel = wrap180(wa - S.rot), top = Math.abs(rel) < 90; let i = top ? Math.abs(rel) : 180 - Math.abs(rel); i = snapI(clamp(i, 0, 89.9)); setI(i, top ? 'A' : 'B', rel < 0 ? -1 : 1); redraw(); },
        key(d) { const c = calc(); let i = clamp(c.i + d, 0, 89.9); setI(i, c.top ? 'A' : 'B', c.s); redraw(); } },
      rot: { move(x, y) { const wa = Math.atan2(x - cx, -(y - cy)) * R2D; const keepI = calc(); S.rot = clamp(Math.round(wrap180(wa + 90)), -60, 60); S.w = wrap180(S.w); redraw(); },
        key(d) { S.rot = clamp(S.rot + d, -60, 60); redraw(); } },
      pinC: { move(x, y) { const wa = Math.atan2(x - cx, -(y - cy)) * R2D - S.rot; let a = ((wa % 360) + 360) % 360; S.pinC = clamp(a, 95, 265); redraw(); }, key(d) { S.pinC = clamp(S.pinC + d * 0.5, 95, 265); redraw(); } }
    });
    lab.addEventListener('input', (e) => {
      const k = e.target.dataset && e.target.dataset.k; if (!k) return;
      const c = calc();
      if (k === 'i' || k === 'in') { if (e.target.value === '') return; setI(snapI(+e.target.value), c.top ? 'A' : 'B', c.s); }
      else if (k === 'rot') S.rot = +e.target.value;
      else if (k === 'mA' || k === 'mB') { S[k === 'mA' ? 'nA' : 'nB'] = +e.target.value; if (k === 'mB') { $('[data-k="nB"]', lab).value = S.nB; $('[data-out="nB"]', lab).textContent = fmt(S.nB, 2); } }
      else if (k === 'nB') { S.nB = +e.target.value; $('[data-out="nB"]', lab).textContent = fmt(S.nB, 2); }
      else if (k === 'snap') S.snap = +e.target.value;
      else if (k === 'normal') S.normal = e.target.checked;
      else if (k === 'labels') S.labels = e.target.checked;
      else if (k === 'showRef') S.showRef = e.target.checked;
      draw();
    });
    lab.addEventListener('change', (e) => { if (e.target.name === id + 's') { const c = calc(); setI(c.i, e.target.value, c.s); draw(); } });
    function check() {
      const c = calc(), fb = $('[data-fb]', lab); let ok = false, txt = '';
      const t = o.task;
      if (t.kind === 'r') {
        const exp = Math.asin(Math.sin(t.value * D2R) * S.nB / S.nA) * R2D, ans = $('[data-ans]', lab).value;
        const byAns = ans !== '' && Math.abs(+String(ans).replace(',', '.') - exp) <= 0.6, byDrag = c.top && !c.rf.tir && Math.abs(c.rf.r - t.value) <= 0.8;
        ok = byAns || byDrag; txt = ok ? '✓ ' + pr('Đúng: sin i = n · sin r nên i ≈ ' + fmt(exp, 1) + '°.', 'Correct: sin i = n · sin r so i ≈ ' + fmt(exp, 1) + '°.') : pr('Chưa đúng. Hãy kéo tia tới để r = ' + t.value + '° rồi đọc i, hoặc dùng sin i = n · sin r.', 'Not yet. Drag the ray so that r = ' + t.value + '° and read i, or use sin i = n · sin r.');
      } else {
        const exp = E.criticalAngle(S.nB, S.nA);
        ok = exp != null && !c.top && Math.abs(c.i - exp) <= 0.8; txt = ok ? '✓ ' + pr('Đúng: i_th ≈ ' + fmt(exp, 1) + '° — tia khúc xạ vừa sát mặt phân cách.', 'Correct: i_th ≈ ' + fmt(exp, 1) + '° — the refracted ray just grazes the surface.') : pr('Cho ánh sáng đi từ trong nước ra không khí rồi tăng góc tới đến khi tia khúc xạ vừa sát mặt phân cách (r = 90°).', 'Send the light from the water into the air and increase i until the refracted ray just grazes the surface (r = 90°).');
      }
      fb.className = 'olab__fb ' + (ok ? 'is-ok' : 'is-no'); fb.innerHTML = txt;
    }
    function record() {
      const c = last; let r;
      if (o.table === 'tir') {
        const kind = c.rf.tir ? 'gt' : (c.ith != null && Math.abs(c.i - c.ith) <= 0.6 ? 'eq' : 'lt');
        const ref = { lt: ['Độ sáng giảm dần khi tăng i', 'Dimmer as i grows'], eq: ['Bắt đầu không nhìn thấy', 'Just disappearing'], gt: ['Không còn nhìn thấy', 'No longer visible'] }[kind];
        const rfl = kind === 'lt' ? ['Độ sáng tăng dần khi tăng i', 'Brighter as i grows'] : ['Rất sáng', 'Very bright'];
        r = { cells: [fmt(c.i, 1) + '°', pr(ref[0], ref[1]), pr(rfl[0], rfl[1])], csv: [fmt(c.i, 1), ref[0], rfl[0]], sinI: Math.sin(c.i * D2R), sinR: c.rf.tir ? null : c.rf.sinR };
      } else {
        const sI = Math.sin(c.i * D2R);
        r = { cells: [fmt(c.i, 1) + '°', c.rf.tir ? '—' : fmt(c.rf.r, 1) + '°', fmt(sI, 3), c.rf.tir ? '—' : fmt(c.rf.sinR, 3), c.rf.tir || c.rf.sinR === 0 ? '—' : fmt(sI / c.rf.sinR, 3)], csv: [fmt(c.i, 1), c.rf.tir ? '' : fmt(c.rf.r, 1), fmt(sI, 3), c.rf.tir ? '' : fmt(c.rf.sinR, 3), c.rf.tir || c.rf.sinR === 0 ? '' : fmt(sI / c.rf.sinR, 3)], sinI: sI, sinR: c.rf.tir ? null : c.rf.sinR };
      }
      S.rows.push(r); renderTbl(); drawGraph(c);
    }
    function renderTbl() {
      const t = $('[data-tbl]', lab); if (!t) return;
      const head = o.table === 'tir' ? [pr('Góc tới', 'Incidence'), pr('Tia khúc xạ', 'Refracted ray'), pr('Tia phản xạ', 'Reflected ray')] : ['i', 'r', 'sin i', 'sin r', 'sin i / sin r'];
      t.innerHTML = '<caption>' + (o.table === 'tir' ? pr('Bảng 6.1 (của em)', 'Table 6.1 (yours)') : pr('Bảng 5.1 (của em)', 'Table 5.1 (yours)')) + '</caption><thead><tr>' + head.map((h) => '<th scope="col">' + h + '</th>').join('') + '</tr></thead><tbody>' +
        (S.rows.length ? S.rows.map((r) => '<tr>' + r.cells.map((x) => '<td>' + x + '</td>').join('') + '</tr>').join('') : '<tr><td colspan="' + head.length + '" class="olab__empty">' + pr('Chưa có dòng nào — bấm “Ghi kết quả”.', 'No rows yet — press “Record”.') + '</td></tr>') + '</tbody>';
    }
    lab.addEventListener('click', (e) => {
      const b = e.target.closest('[data-act]'); if (!b) return; const a = b.dataset.act;
      if (a === 'reset') { S.w = o.w; S.rot = 0; S.nA = o.nA; S.nB = o.nB; S.pinC = 215; S.rows = []; S.snap = 0; $$('[data-k="snap"]', lab).forEach((x) => { x.value = '0'; }); if (o.media) { $('[data-k="mA"]', lab).value = o.nA; $('[data-k="mB"]', lab).value = o.nB; $('[data-k="nB"]', lab).value = o.nB; $('[data-out="nB"]', lab).textContent = fmt(o.nB, 2); } renderTbl(); const fb = $('[data-fb]', lab); if (fb) fb.textContent = ''; draw(); }
      else if (a === 'rec') record();
      else if (a === 'clear') { S.rows = []; renderTbl(); draw(); }
      else if (a === 'csv') { const head = o.table === 'tir' ? ['i', 'tia khuc xa', 'tia phan xa'] : ['i', 'r', 'sin i', 'sin r', 'sin i / sin r']; copyText(toCSV(head, S.rows.map((r) => r.csv)), (ok) => { $('[data-msg]', lab).innerHTML = ok ? pr('Đã sao chép bảng (CSV).', 'Table copied (CSV).') : pr('Không sao chép được — hãy chọn và chép bảng bằng tay.', 'Could not copy — select the table by hand.'); }); }
      else if (a === 'check') check();
    });
    // trạng thái ban đầu
    setI(o.w > 0 ? Math.min(o.w, 89) : 0, o.startSide || 'A', 1); S.w = o.startSide === 'B' ? wrap180(180 - o.w) : o.w;
    renderTbl(); draw();
    return { state: S, calc, draw };
  }

  /* --------------------------------------------------------- ĐỒNG XU TRONG CỐC */
  function coin(body, opt) {
    const o = Object.assign({ n: 1.333 }, opt || {});
    const W = 520, H = 330, CX0 = 200, CX1 = 340, CTOP = 150, CBOT = 280;
    const S = { ex: 150, ey: 40, xc: 250, hw: 0, n: o.n };
    const id = 'oc' + (++uid);
    body.innerHTML = '<div class="olab" data-lab="' + id + '"><p class="olab__hint">' + pr('Kéo con mắt, đồng xu và mặt nước (ô vuông ở thành cốc). Rót nước vào cốc để xem điều gì xảy ra. Bàn phím: chọn tay nắm rồi dùng mũi tên.', 'Drag the eye, the coin and the water surface (square on the cup wall). Pour water into the cup and see what happens. Keyboard: focus a handle and use the arrow keys.') + '</p>' +
      '<div class="olab__stage"><svg class="olab__svg" viewBox="0 0 ' + W + ' ' + H + '" role="group" aria-label="Con mắt, cốc có đồng xu và nước">' +
      '<rect data-r="water" class="olab__water" x="' + CX0 + '" width="' + (CX1 - CX0) + '"/>' +
      '<path class="olab__cup" d="M' + CX0 + ' ' + CTOP + ' V' + CBOT + ' H' + CX1 + ' V' + CTOP + '"/><line class="olab__table" x1="10" y1="' + CBOT + '" x2="' + (W - 10) + '" y2="' + CBOT + '"/>' +
      '<line data-r="surf" class="olab__surf" x1="' + CX0 + '" x2="' + CX1 + '"/>' +
      '<line data-r="blk" class="olab__ray olab__ray--blk"/><text data-r="blkX" class="olab__x" text-anchor="middle">✕</text>' +
      '<line data-r="r1" class="olab__ray olab__ray--refr"/><line data-r="r2" class="olab__ray olab__ray--inc"/><line data-r="r3" class="olab__ray olab__ray--virt"/>' +
      '<ellipse data-r="app" class="olab__coin olab__coin--virt" rx="22" ry="6"/>' +
      '<g data-h="coin" data-r="coin" tabindex="0" role="slider" aria-label="Đồng xu / Coin" class="olab__hd"><circle r="32" class="olab__hit"/><ellipse rx="22" ry="6" class="olab__coin"/></g>' +
      '<g data-h="eye" data-r="eye" tabindex="0" role="slider" aria-label="Mắt / Eye" class="olab__hd"><circle r="32" class="olab__hit"/><ellipse rx="20" ry="12" class="olab__eye"/><circle r="6" class="olab__pupil"/></g>' +
      '<g data-h="water" data-r="wh" tabindex="0" role="slider" aria-label="Mực nước / Water level" aria-valuemin="0" aria-valuemax="' + (CBOT - CTOP) + '" class="olab__hd"><circle r="32" class="olab__hit"/><rect x="-9" y="-9" width="18" height="18" rx="4" class="olab__sq"/></g>' +
      '</svg></div><div class="olab__panel"><label class="olab__ctl"><span>' + pr('Mực nước', 'Water level') + ' = <output data-out="hw">0</output> %</span><input type="range" data-k="hw" min="0" max="100" step="1" value="0"></label>' +
      '<label class="olab__ctl"><span>' + pr('Chất lỏng', 'Liquid') + '</span><select data-k="n" class="olab__sel">' + MEDIA.filter((m) => m.n > 1).map((m) => '<option value="' + m.n + '"' + (m.id === 'water' ? ' selected' : '') + '>' + m.vi + ' (n = ' + fmt(m.n, 3) + ')</option>').join('') + '</select></label>' +
      '<div class="olab__btns"><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button></div><p class="olab__status" data-st role="status" aria-live="polite"></p></div></div>';
    const lab = $('[data-lab="' + id + '"]', body), svg = $('.olab__svg', lab), q = (n) => $('[data-r="' + n + '"]', svg);
    function draw() {
      const ys = CBOT - (CBOT - CTOP) * S.hw / 100, P = [S.xc, CBOT - 5], eye = [S.ex, S.ey];
      setA(q('water'), { y: ys, height: CBOT - ys, visibility: S.hw > 0 ? 'visible' : 'hidden' }); setA(q('surf'), { y1: ys, y2: ys, visibility: S.hw > 0 ? 'visible' : 'hidden' });
      setA(q('coin'), { transform: 'translate(' + P[0] + ',' + P[1] + ')', 'aria-valuenow': Math.round(S.xc) }); setA(q('eye'), { transform: 'translate(' + eye[0] + ',' + eye[1] + ')' }); setA(q('wh'), { transform: 'translate(' + CX1 + ',' + ys + ')', 'aria-valuenow': Math.round(CBOT - ys) });
      ['r1', 'r2', 'r3', 'blk'].forEach((n) => setA(q(n), { visibility: 'hidden' })); setA(q('blkX'), { visibility: 'hidden' }); setA(q('app'), { visibility: 'hidden' });
      const st = $('[data-st]', lab); let vis = false, text;
      const crossY = (a, b) => a[1] + (CX0 - a[0]) * (b[1] - a[1]) / (b[0] - a[0]);
      if (S.hw <= 0) {
        const cy = crossY(P, eye); vis = cy <= CTOP;
        setA(q('blk'), { x1: P[0], y1: P[1], x2: eye[0], y2: eye[1], visibility: 'visible', class: 'olab__ray ' + (vis ? 'olab__ray--inc' : 'olab__ray--blk') });
        if (!vis) setA(q('blkX'), { x: CX0, y: cy + 5, visibility: 'visible' });
        text = vis ? pr('Không có nước nhưng mắt ở đủ cao nên vẫn nhìn thấy đồng xu theo đường thẳng.', 'No water, but the eye is high enough to see the coin along a straight line.') : pr('Không có nước: tia thẳng từ đồng xu tới mắt bị thành cốc chắn lại, nên không nhìn thấy đồng xu.', 'No water: the straight line from the coin to the eye is blocked by the cup wall, so the coin is hidden.');
      } else {
        let root = null, prevF = null, prevX = null;
        const F = (xq) => { const Q = [xq, ys], d1 = [Q[0] - P[0], Q[1] - P[1]], l = Math.hypot(d1[0], d1[1]); const rv = E.refractVec([d1[0] / l, d1[1] / l], [0, 1], S.n, 1); if (rv.tir) return NaN; return (eye[0] - Q[0]) * rv.dir[1] - (eye[1] - Q[1]) * rv.dir[0]; };
        for (let k = 0; k <= 300; k++) { const xq = CX0 + (CX1 - CX0) * k / 300, f = F(xq); if (isNaN(f)) { prevF = null; continue; } if (prevF != null && prevF * f <= 0) { let a = prevX, b = xq; for (let t = 0; t < 40; t++) { const m = (a + b) / 2; if (F(a) * F(m) <= 0) b = m; else a = m; } root = (a + b) / 2; break; } prevF = f; prevX = xq; }
        if (root == null) text = pr('Không có tia nào từ đồng xu tới mắt qua mặt nước (hãy thử đổi vị trí mắt hoặc đồng xu).', 'No ray from the coin reaches the eye through the surface (try moving the eye or the coin).');
        else {
          const Q = [root, ys], d1 = [Q[0] - P[0], Q[1] - P[1]], l = Math.hypot(d1[0], d1[1]), rv = E.refractVec([d1[0] / l, d1[1] / l], [0, 1], S.n, 1), d2 = rv.dir;
          const toEye = (eye[0] - Q[0]) * d2[0] + (eye[1] - Q[1]) * d2[1] > 0, cy = crossY(Q, eye); vis = toEye && cy <= CTOP;
          setA(q('r1'), { x1: P[0], y1: P[1], x2: Q[0], y2: Q[1], visibility: 'visible', 'stroke-opacity': vis ? 1 : .35 }); setA(q('r2'), { x1: Q[0], y1: Q[1], x2: eye[0], y2: eye[1], visibility: 'visible', 'stroke-opacity': vis ? 1 : .35 });
          if (vis && d2[0] < 0) { const t = (Q[0] - S.xc) / d2[0]; const ya = Q[1] - t * d2[1]; if (Q[0] < S.xc && ya <= CBOT && ya > ys) { setA(q('r3'), { x1: Q[0], y1: Q[1], x2: S.xc, y2: ya, visibility: 'visible' }); setA(q('app'), { cx: S.xc, cy: ya, visibility: 'visible' }); } }
          if (!vis) setA(q('blkX'), { x: CX0, y: cy + 5, visibility: 'visible' });
          text = vis ? pr('Có nước: tia từ đồng xu bị khúc xạ khi ra khỏi mặt nước (n = ' + fmt(S.n, 3) + ') và lệch xa pháp tuyến, nên mắt nhìn thấy đồng xu <b>ở vị trí cao hơn</b> (nét đứt).', 'With water: the ray from the coin is refracted as it leaves the surface (n = ' + fmt(S.n, 3) + ') and bends away from the normal, so the eye sees the coin <b>higher up</b> (dashed).') : pr('Có nước nhưng tia khúc xạ vẫn bị thành cốc chắn: hãy nâng mắt lên hoặc rót thêm nước.', 'There is water but the refracted ray is still blocked by the wall: raise the eye or add more water.');
        }
      }
      st.innerHTML = text;
    }
    const redraw = raf(draw);
    makeDrag(svg, {
      eye: { move(x, y) { S.ex = clamp(x, 25, CX0 - 20); S.ey = clamp(y, 25, CBOT - 20); redraw(); }, key(d, sh, ax) { if (ax === 'y') S.ey = clamp(S.ey - d * 4, 25, CBOT - 20); else S.ex = clamp(S.ex + d * 4, 25, CX0 - 20); redraw(); } },
      coin: { move(x) { S.xc = clamp(x, CX0 + 24, CX1 - 24); redraw(); }, key(d) { S.xc = clamp(S.xc + d * 4, CX0 + 24, CX1 - 24); redraw(); } },
      water: { move(x, y) { S.hw = clamp(Math.round((CBOT - y) / (CBOT - CTOP) * 100), 0, 100); $('[data-k="hw"]', lab).value = S.hw; $('[data-out="hw"]', lab).textContent = S.hw; redraw(); }, key(d, sh, ax) { S.hw = clamp(S.hw + (ax === 'y' ? d : d), 0, 100); $('[data-k="hw"]', lab).value = S.hw; $('[data-out="hw"]', lab).textContent = S.hw; redraw(); } }
    });
    lab.addEventListener('input', (e) => { const k = e.target.dataset && e.target.dataset.k; if (k === 'hw') { S.hw = +e.target.value; $('[data-out="hw"]', lab).textContent = S.hw; } else if (k === 'n') S.n = +e.target.value; draw(); });
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-act="reset"]')) { Object.assign(S, { ex: 150, ey: 40, xc: 250, hw: 0, n: o.n }); $('[data-k="hw"]', lab).value = 0; $('[data-out="hw"]', lab).textContent = 0; draw(); } });
    draw(); return { state: S, draw };
  }

  /* ------------------------------------- HÌNH 5.3: ĐẶT CHIỀU MŨI TÊN CỦA CÁC TIA */
  function arrows(body) {
    const id = 'oa' + (++uid), I = [240, 150], n = 1.333, i = 45, r = E.refract(1, n, i).r;
    const pos = (th, L) => [I[0] + L * Math.sin(th * D2R), I[1] - L * Math.cos(th * D2R)];
    const rays = [{ k: 'inc', name: ['tia tới', 'incident ray'], end: pos(-i, 130), toI: true }, { k: 'refl', name: ['tia phản xạ', 'reflected ray'], end: pos(i, 130), toI: false }, { k: 'refr', name: ['tia khúc xạ', 'refracted ray'], end: pos(180 - r, 130), toI: false }];
    const S = { dir: {}, checked: false };
    const shuffle = () => { rays.forEach((x) => { S.dir[x.k] = Math.random() < 0.5; }); if (rays.every((x) => S.dir[x.k] === x.toI)) S.dir.inc = !S.dir.inc; S.checked = false; };
    shuffle();
    body.innerHTML = '<div class="olab" data-lab="' + id + '"><p class="olab__hint">' + pr('Một tia sáng tới mặt nước cho một tia phản xạ và một tia khúc xạ (Hình 5.3). Bấm vào mũi tên (hoặc nhấn Enter/Space khi đang chọn) để đổi chiều, rồi bấm “Kiểm tra”.', 'A light ray striking the water gives a reflected and a refracted ray (Figure 5.3). Click an arrow (or press Enter/Space when focused) to flip it, then press “Check”.') + '</p>' +
      '<div class="olab__stage"><svg class="olab__svg" viewBox="0 0 480 300" role="group" aria-label="Mặt nước và ba tia sáng"><rect x="20" y="150" width="440" height="130" class="olab__water"/><line x1="20" y1="150" x2="460" y2="150" class="olab__surf"/>' +
      '<line x1="240" y1="30" x2="240" y2="270" class="olab__normal"/><text x="250" y="42" class="olab__lab">N</text><text x="250" y="268" class="olab__lab">N′</text><text x="40" y="140" class="olab__lab">' + 'Không khí / Air' + '</text><text x="40" y="272" class="olab__lab">' + 'Nước / Water' + '</text>' +
      rays.map((x) => '<line class="olab__ray olab__ray--' + x.k + '" x1="' + I[0] + '" y1="' + I[1] + '" x2="' + x.end[0].toFixed(1) + '" y2="' + x.end[1].toFixed(1) + '"/><g data-ray="' + x.k + '" tabindex="0" role="button" aria-label="Chiều mũi tên của ' + x.name[0] + ' / arrow of the ' + x.name[1] + '" class="olab__hd olab__arrowbtn"><circle r="32" class="olab__hit"/><polygon class="olab__head olab__head--' + x.k + '" points="-11,-8 11,0 -11,8"/></g><text data-mark="' + x.k + '" class="olab__lab olab__lab--s" text-anchor="middle"></text>').join('') +
      '<circle cx="240" cy="150" r="5" class="olab__I"/></svg></div><div class="olab__panel"><div class="olab__btns"><button type="button" class="btn btn--sm btn--primary" data-act="check">' + pr('Kiểm tra', 'Check') + '</button><button type="button" class="btn btn--sm" data-act="mix">' + pr('Đặt lại', 'Reset') + '</button></div><p class="olab__status" data-st role="status" aria-live="polite"></p></div></div>';
    const lab = $('[data-lab="' + id + '"]', body);
    function draw() {
      rays.forEach((x) => {
        const g = $('[data-ray="' + x.k + '"]', lab), p = pos(x.k === 'inc' ? -i : x.k === 'refl' ? i : 180 - r, 80), toI = S.dir[x.k];
        const a = Math.atan2(I[1] - x.end[1], I[0] - x.end[0]) * R2D; g.setAttribute('transform', 'translate(' + p[0].toFixed(1) + ',' + p[1].toFixed(1) + ') rotate(' + (toI ? a : a + 180) + ')');
        const m = $('[data-mark="' + x.k + '"]', lab); const ok = S.dir[x.k] === x.toI; m.textContent = S.checked ? (ok ? '✓' : '✗') : ''; m.setAttribute('x', (p[0] + 4).toFixed(1)); m.setAttribute('y', (p[1] - 22).toFixed(1)); m.setAttribute('class', 'olab__lab olab__lab--s ' + (ok ? 'is-ok' : 'is-no'));
      });
      $('[data-st]', lab).innerHTML = S.checked ? (rays.every((x) => S.dir[x.k] === x.toI) ? pr('<b>✓ Đúng:</b> tia tới đi vào điểm tới I; tia phản xạ và tia khúc xạ đi ra khỏi I.', '<b>✓ Correct:</b> the incident ray points into I; the reflected and refracted rays point away from I.') : pr('Chưa đúng ở các tia có dấu ✗. Gợi ý: ánh sáng đi từ nguồn tới điểm tới, rồi đi ra xa.', 'Not yet right where marked ✗. Hint: light travels from the source to the point of incidence, then away.')) : '';
    }
    const flip = (k) => { S.dir[k] = !S.dir[k]; S.checked = false; draw(); };
    lab.addEventListener('click', (e) => { const g = e.target.closest('[data-ray]'); if (g) { flip(g.dataset.ray); return; } const b = e.target.closest('[data-act]'); if (!b) return; if (b.dataset.act === 'check') { S.checked = true; draw(); } else { shuffle(); draw(); } });
    lab.addEventListener('keydown', (e) => { const g = e.target.closest && e.target.closest('[data-ray]'); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); flip(g.dataset.ray); } });
    draw(); return { state: S };
  }

  /* ------------------------------------------------------------ CÁP QUANG (6.4) */
  function fiber(body) {
    const id = 'of' + (++uid), W = 560, H = 260, X0 = 90, X1 = 520, YC = 130, HW = 34;
    const S = { th: 12, n1: 1.5, n2: 1.4 };
    body.innerHTML = '<div class="olab" data-lab="' + id + '"><p class="olab__hint">' + pr('Kéo chấm đỏ quanh đầu sợi quang để đổi góc vào θ; đổi chiết suất lõi n₁ và vỏ n₂ bằng thanh trượt. Bàn phím: chọn chấm đỏ rồi dùng ↑ ↓.', 'Drag the red dot around the fibre end to change the entry angle θ; change core n₁ and cladding n₂ with the sliders. Keyboard: focus the red dot and use ↑ ↓.') + '</p>' +
      '<div class="olab__stage"><svg class="olab__svg" viewBox="0 0 ' + W + ' ' + H + '" role="group" aria-label="Mặt cắt sợi quang">' +
      '<rect class="olab__clad" x="' + X0 + '" y="' + (YC - HW - 18) + '" width="' + (X1 - X0) + '" height="' + (2 * HW + 36) + '"/><rect class="olab__core" x="' + X0 + '" y="' + (YC - HW) + '" width="' + (X1 - X0) + '" height="' + 2 * HW + '"/>' +
      '<line x1="' + X0 + '" y1="' + (YC - HW - 18) + '" x2="' + X0 + '" y2="' + (YC + HW + 18) + '" class="olab__interface"/><line class="olab__normal" x1="' + (X0 - 80) + '" y1="' + YC + '" x2="' + (X0 + 20) + '" y2="' + YC + '"/>' +
      '<text x="' + (X1 - 6) + '" y="' + (YC - 8) + '" text-anchor="end" class="olab__lab">' + 'Lõi n₁ / Core n₁' + '</text><text x="' + (X1 - 6) + '" y="' + (YC - HW - 24) + '" text-anchor="end" class="olab__lab">' + 'Vỏ n₂ / Cladding n₂' + '</text>' +
      '<polyline data-r="path" class="olab__ray olab__ray--inc" fill="none"/><line data-r="leak" class="olab__ray olab__ray--refr"/><line data-r="inc" class="olab__ray olab__ray--inc"/>' +
      '<g data-h="src" data-r="src" tabindex="0" role="slider" aria-label="Nguồn sáng, góc vào / Source, entry angle" aria-valuemin="-80" aria-valuemax="80" class="olab__hd olab__hd--src"><circle r="32" class="olab__hit"/><circle r="11" class="olab__dot"/></g></svg></div>' +
      '<div class="olab__panel"><label class="olab__ctl"><span>' + pr('Góc vào θ (°)', 'Entry angle θ (°)') + ' = <output data-out="th">12</output></span><input type="range" data-k="th" min="-80" max="80" step="1" value="12"></label>' +
      '<label class="olab__ctl"><span>' + pr('Chiết suất lõi n₁', 'Core index n₁') + ' = <output data-out="n1">1,50</output></span><input type="range" data-k="n1" min="1.2" max="2" step="0.01" value="1.5"></label>' +
      '<label class="olab__ctl"><span>' + pr('Chiết suất vỏ n₂', 'Cladding index n₂') + ' = <output data-out="n2">1,40</output></span><input type="range" data-k="n2" min="1" max="1.99" step="0.01" value="1.4"></label>' +
      '<div class="olab__btns"><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button></div><div class="olab__read" data-read aria-live="polite"></div></div></div>';
    const lab = $('[data-lab="' + id + '"]', body), svg = $('.olab__svg', lab), q = (n) => $('[data-r="' + n + '"]', svg);
    function draw() {
      if (S.n2 >= S.n1) S.n2 = Math.max(1, S.n1 - 0.01);
      const t = S.th * D2R, Sx = X0 - 80 * Math.cos(t), Sy = YC - 80 * Math.sin(t);
      setA(q('src'), { transform: 'translate(' + Sx.toFixed(1) + ',' + Sy.toFixed(1) + ')', 'aria-valuenow': S.th, 'aria-valuetext': S.th + '°' }); setA(q('inc'), { x1: Sx, y1: Sy, x2: X0, y2: YC });
      const f = E.fiber(S.th, S.n1, S.n2, HW, X1 - X0, 60), pts = f.pts.map((p) => (X0 + p[0]).toFixed(1) + ',' + (YC + p[1]).toFixed(1)).join(' ');
      setA(q('path'), { points: pts });
      if (f.leaks) { const a = f.leaks.at, d = f.leaks.dir; setA(q('leak'), { x1: X0 + a[0], y1: YC + a[1], x2: X0 + a[0] + d[0] * 60, y2: YC + a[1] + d[1] * 60, visibility: 'visible' }); } else setA(q('leak'), { visibility: 'hidden' });
      const acc = E.acceptanceAngle(S.n1, S.n2), ith = E.criticalAngle(S.n1, S.n2);
      let st = f.leaks ? pr('<b>Ánh sáng thoát ra khỏi lõi</b>: góc tới tại mặt tiếp xúc lõi–vỏ nhỏ hơn góc tới hạn.', '<b>The light leaks out of the core</b>: the angle of incidence at the core–cladding boundary is smaller than the critical angle.') : pr('<b>Phản xạ toàn phần liên tiếp:</b> ' + f.bounces + ' lần, ánh sáng được dẫn tới cuối sợi.', '<b>Repeated total internal reflection:</b> ' + f.bounces + ' times; the light is guided to the end of the fibre.');
      $('[data-read]', lab).innerHTML = '<table class="olab__tbl olab__tbl--read"><tbody><tr><th scope="row">' + pr('Góc tới hạn lõi–vỏ i_th', 'Core–cladding critical angle i_th') + '</th><td>' + fmt(ith, 1) + '°</td></tr><tr><th scope="row">' + pr('Góc nhận sáng tối đa (sin θ = √(n₁² − n₂²))', 'Maximum acceptance angle (sin θ = √(n₁² − n₂²))') + '</th><td>' + fmt(acc, 1) + '°</td></tr></tbody></table><p class="olab__status">' + st + '</p><p class="olab__note">' + pr('Mô hình mặt cắt phẳng của sợi thẳng; không tính tổn hao và độ cong.', 'A flat cross-section model of a straight fibre; losses and bending are ignored.') + '</p>';
    }
    const redraw = raf(draw);
    makeDrag(svg, { src: { move(x, y) { S.th = clamp(Math.round(Math.atan2(YC - y, X0 - x) * R2D), -80, 80); sync(); redraw(); }, key(d, sh, ax) { S.th = clamp(S.th + d, -80, 80); sync(); redraw(); } } });
    const sync = () => { $('[data-k="th"]', lab).value = S.th; $('[data-out="th"]', lab).textContent = S.th; };
    lab.addEventListener('input', (e) => { const k = e.target.dataset && e.target.dataset.k; if (!k) return; S[k] = +e.target.value; $('[data-out="' + k + '"]', lab).textContent = k === 'th' ? S.th : fmt(S[k], 2); if (k === 'n1' && S.n2 >= S.n1) { S.n2 = Math.max(1, S.n1 - 0.01); $('[data-k="n2"]', lab).value = S.n2; $('[data-out="n2"]', lab).textContent = fmt(S.n2, 2); } draw(); });
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-act="reset"]')) { Object.assign(S, { th: 12, n1: 1.5, n2: 1.4 }); ['th', 'n1', 'n2'].forEach((k) => { $('[data-k="' + k + '"]', lab).value = S[k]; $('[data-out="' + k + '"]', lab).textContent = k === 'th' ? S.th : fmt(S[k], 2); }); draw(); } });
    draw(); return { state: S };
  }

  /* ------------------------------------------------ ẢO ẢNH TRÊN ĐƯỜNG NHỰA (6.2–6.3) */
  function mirage(body) {
    const id = 'om' + (++uid), W = 560, H = 270, ROAD = 235, X0 = 30, H0 = 14;
    const S = { dT: 40, xA: 60, yA: 120, xO: 470, yO: 34 };
    body.innerHTML = '<div class="olab" data-lab="' + id + '"><p class="olab__hint">' + pr('Kéo vật A và người quan sát O; đổi nhiệt độ mặt đường. Mặt đường càng nóng, không khí sát mặt đường càng có chiết suất nhỏ. Độ chênh chiết suất và tỉ lệ chiều dọc được phóng đại để dễ thấy.', 'Drag the object A and the observer O; change the road temperature. The hotter the road, the smaller the refractive index of the air next to it. The index difference and the vertical scale are exaggerated so that it is visible.') + '</p>' +
      '<div class="olab__stage"><svg class="olab__svg" viewBox="0 0 ' + W + ' ' + H + '" role="group" aria-label="Các lớp không khí trên mặt đường nóng, vật A, người quan sát O và ảnh ảo A′">' +
      '<defs><linearGradient id="' + id + 'g" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ffb199" stop-opacity=".75"/><stop offset="1" stop-color="#cfe0ff" stop-opacity=".15"/></linearGradient></defs>' +
      '<rect x="' + X0 + '" y="20" width="' + (W - 2 * X0) + '" height="' + (ROAD - 20) + '" fill="url(#' + id + 'g)"/><rect x="' + X0 + '" y="' + ROAD + '" width="' + (W - 2 * X0) + '" height="22" class="olab__road"/>' +
      '<polyline data-r="path" class="olab__ray olab__ray--inc" fill="none"/><line data-r="vray" class="olab__ray olab__ray--virt"/><text data-r="Aimg" class="olab__lab" text-anchor="middle"></text><circle data-r="imgdot" r="6" class="olab__pin olab__pin--virt"/>' +
      '<g data-h="A" data-r="A" tabindex="0" role="slider" aria-label="Vật A / Object A" class="olab__hd"><circle r="32" class="olab__hit"/><circle r="9" class="olab__dot"/><text y="-14" class="olab__lab" text-anchor="middle">A</text></g>' +
      '<g data-h="O" data-r="O" tabindex="0" role="slider" aria-label="Người quan sát O / Observer O" class="olab__hd"><circle r="32" class="olab__hit"/><ellipse rx="13" ry="8" class="olab__eye"/><circle r="4" class="olab__pupil"/><text y="-14" class="olab__lab" text-anchor="middle">O</text></g></svg></div>' +
      '<div class="olab__panel"><label class="olab__ctl"><span>' + pr('Nhiệt độ mặt đường hơn không khí', 'Road temperature above the air') + ' = <output data-out="dT">40</output> °C</span><input type="range" data-k="dT" min="0" max="60" step="1" value="40"></label>' +
      '<div class="olab__btns"><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button></div><div class="olab__read" data-read aria-live="polite"></div></div></div>';
    const lab = $('[data-lab="' + id + '"]', body), svg = $('.olab__svg', lab), q = (n) => $('[data-r="' + n + '"]', svg);
    const Y = (y) => ROAD - y;
    function draw() {
      setA(q('A'), { transform: 'translate(' + S.xA + ',' + Y(S.yA) + ')' }); setA(q('O'), { transform: 'translate(' + S.xO + ',' + Y(S.yO) + ')' });
      const m = E.mirage(S.xA, S.yA, S.xO, S.yO, S.dT, H0); let st;
      if (!m || !m.visible) { setA(q('path'), { points: '' }); setA(q('vray'), { visibility: 'hidden' }); setA(q('imgdot'), { visibility: 'hidden' }); q('Aimg').textContent = '';
        st = S.dT <= 0 ? pr('Mặt đường không nóng hơn không khí: chiết suất các lớp bằng nhau nên ánh sáng đi thẳng, không có ảo ảnh.', 'The road is no hotter than the air: all layers have the same index, so light travels straight and there is no mirage.') : pr('<b>Không có ảo ảnh</b>: người quan sát ở quá gần (hoặc vật quá thấp), tia sáng từ A không kịp bị phản xạ toàn phần rồi tới O.', '<b>No mirage</b>: the observer is too close (or the object too low); a ray from A cannot undergo total reflection and still reach O.'); }
      else {
        setA(q('path'), { points: m.pts.map((p) => p[0].toFixed(1) + ',' + Y(p[1]).toFixed(1)).join(' ') });
        const L = m.pts[m.pts.length - 1], Qp = m.pts[m.pts.length - 6], im = m.image;
        setA(q('vray'), { x1: L[0], y1: Y(L[1]), x2: im[0], y2: Y(im[1]), visibility: 'visible' }); setA(q('imgdot'), { cx: im[0], cy: Y(im[1]), visibility: 'visible' }); setA(q('Aimg'), { x: im[0], y: Y(im[1]) + 20 }); q('Aimg').textContent = 'A′';
        st = pr('<b>Có ảo ảnh</b>: tia từ A đi xuống cong dần (chiết suất giảm khi xuống thấp), tới lớp sát mặt đường thì phản xạ toàn phần rồi đi lên tới O. Mắt thấy ảnh A′ đối xứng với A qua mặt đường — như có lớp nước phản chiếu.', '<b>A mirage forms</b>: the ray from A curves as it goes down (the index falls toward the road), is totally reflected in the layer near the road and rises to O. The eye sees an image A′ below the road, as if water were reflecting the scene.');
      }
      $('[data-read]', lab).innerHTML = '<p class="olab__status">' + st + '</p>' + (false ? '<p class="olab__note">' + pr('Khoảng cách ngang nhỏ nhất để thấy ảo ảnh ≈ ' + fmt(m.dmin, 0) + ' (đơn vị hình vẽ); hiện nay là ' + fmt(S.xO - S.xA, 0) + '.', 'Smallest horizontal distance for a mirage ≈ ' + fmt(m.dmin, 0) + ' (drawing units); now ' + fmt(S.xO - S.xA, 0) + '.') + '</p>' : '');
    }
    const redraw = raf(draw);
    makeDrag(svg, {
      A: { move(x, y) { S.xA = clamp(x, X0 + 10, S.xO - 40); S.yA = clamp(ROAD - y, 40, 180); redraw(); }, key(d, sh, ax) { if (ax === 'y') S.yA = clamp(S.yA + d * 4, 40, 180); else S.xA = clamp(S.xA + d * 4, X0 + 10, S.xO - 40); redraw(); } },
      O: { move(x, y) { S.xO = clamp(x, S.xA + 40, 530); S.yO = clamp(ROAD - y, 12, 90); redraw(); }, key(d, sh, ax) { if (ax === 'y') S.yO = clamp(S.yO + d * 4, 12, 90); else S.xO = clamp(S.xO + d * 4, S.xA + 40, 530); redraw(); } }
    });
    lab.addEventListener('input', (e) => { if (e.target.dataset.k === 'dT') { S.dT = +e.target.value; $('[data-out="dT"]', lab).textContent = S.dT; draw(); } });
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-act="reset"]')) { Object.assign(S, { dT: 40, xA: 60, yA: 120, xO: 470, yO: 34 }); $('[data-k="dT"]', lab).value = 40; $('[data-out="dT"]', lab).textContent = 40; draw(); } });
    draw(); return { state: S };
  }

  /* ------------------------------------------------- ĐĂNG KÝ VÀO interactive.js */
  const TASK_R = { kind: 'r', value: 30, vi: 'Thực hành ảo: tia sáng đi từ không khí vào thuỷ tinh n = 1,5. Kéo tia tới (hoặc tính) để góc khúc xạ r = 30°. Khi đó góc tới i bằng bao nhiêu?', en: 'Virtual practical: light goes from air into glass of n = 1.5. Drag the ray (or calculate) so that the angle of refraction r = 30°. What is the angle of incidence i then?' };
  const TASK_TH = { kind: 'ith', vi: 'Thực hành ảo: ánh sáng đi từ nước ra không khí. Tăng góc tới cho đến khi tia khúc xạ vừa sát mặt phân cách (r = 90°). Đó là góc tới hạn.', en: 'Virtual practical: light goes from water into air. Increase the angle of incidence until the refracted ray just grazes the surface (r = 90°). That is the critical angle.' };
  root.LabSims = Object.assign(root.LabSims || {}, {
    'olab-halfdisk': { fn: (b) => halfdisk(b, { graph: true }), vi: 'Thí nghiệm khúc xạ với bản bán trụ (Hình 5.1, 5.2, Bảng 5.1)', en: 'Refraction with a half-disc block (Figures 5.1, 5.2, Table 5.1)', intro: 'Kéo chấm đỏ S để đổi góc tới, kéo ô vuông để xoay bản bán trụ; bấm “Ghi kết quả” để điền bảng như Bảng 5.1.' },
    'olab-media': { fn: (b) => halfdisk(b, { media: true, nB: 1.333, graph: true }), vi: 'Chọn hai môi trường: tia bị bẻ lại gần hay ra xa pháp tuyến?', en: 'Choose two media: does the ray bend toward or away from the normal?', intro: 'Đổi môi trường A, B (hoặc n tuỳ ý) và xem n₂₁ = sin i / sin r = n₂ / n₁.' },
    'olab-pins': { fn: (b) => halfdisk(b, { pins: true, graph: false }), vi: 'Thí nghiệm 3 với đinh ghim (Hình 5.4)', en: 'Experiment 3 with pins (Figure 5.4)', intro: 'O ở tâm, A trên pháp tuyến, B trên tia tới. Kéo đinh C cho tới khi O, B, C thẳng hàng qua bản bán trụ.' },
    'olab-coin': { fn: (b) => coin(b), vi: 'Đồng xu trong cốc (câu hỏi mở đầu, Hình 5.6)', en: 'The coin in the cup (opening question, Figure 5.6)', intro: 'Kéo mắt, đồng xu và mực nước để xem vì sao rót nước vào thì nhìn thấy đồng xu.' },
    'olab-arrows': { fn: (b) => arrows(b), vi: 'Bài tập Hình 5.3: bổ sung chiều mũi tên của các tia', en: 'Exercise for Figure 5.3: add the arrows to the rays', intro: 'Bấm vào mũi tên để đổi chiều rồi kiểm tra.' },
    'olab-task5': { fn: (b) => halfdisk(b, { graph: false, task: TASK_R, table: 'snell' }), vi: 'Thực hành ảo: tìm góc tới để r = 30°', en: 'Virtual practical: find i so that r = 30°', intro: 'Kéo tia tới hoặc tính rồi bấm “Kiểm tra”.' },
    'olab-tir': { fn: (b) => halfdisk(b, { nA: 1, nB: 1.5, w: 20, startSide: 'B', table: 'tir', graph: false }), vi: 'Thí nghiệm phản xạ toàn phần (Hình 6.1, Bảng 6.1)', en: 'The total internal reflection experiment (Figure 6.1, Table 6.1)', intro: 'Ánh sáng đi từ thuỷ tinh ra không khí. Tăng dần góc tới, quan sát tia khúc xạ mờ dần, rồi bấm “Ghi kết quả” cho ba trường hợp i nhỏ, i = i_th, i > i_th.', nameA: 'không khí', nameB: 'thuỷ tinh' },
    'olab-water': { fn: (b) => halfdisk(b, { nA: 1, nB: 1.333, w: 30, startSide: 'B', table: 'tir', graph: false, task: TASK_TH, nameB: 'nước', nameBen: 'water' }), vi: 'Nước → không khí: tìm góc tới hạn', en: 'Water → air: find the critical angle', intro: 'Thử i = 30° rồi i = 60°, sau đó tìm i_th ≈ 48,6°.' },
    'olab-fiber': { fn: (b) => fiber(b), vi: 'Cáp quang (Hình 6.4)', en: 'The optical fibre (Figure 6.4)', intro: 'Kéo nguồn sáng ở đầu sợi để đổi góc vào; đổi n₁, n₂ để thấy khi nào ánh sáng bị dẫn hoặc thoát ra.' },
    'olab-mirage': { fn: (b) => mirage(b), vi: 'Ảo ảnh trên đường nhựa (Hình 6.2, 6.3)', en: 'A mirage on a hot road (Figures 6.2, 6.3)', intro: 'Kéo vật A và người quan sát O, đổi nhiệt độ mặt đường để xem ảo ảnh A′ xuất hiện khi nào.' }
  });
  /* tay nắm kéo thả dùng chung cho work-lab.js */
  root.OpticsLab = { engine: E, media: MEDIA, makeDrag, fmt, pr, raf, clamp, halfdisk, coin, arrows, fiber, mirage, version: '1.0' };
})();
