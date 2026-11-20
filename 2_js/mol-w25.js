/* ==========================================================================
   MOL W25 — dụng cụ dùng chung cho hoá hữu cơ Bài 25–27 (`MolLab.org`) + widget Bài 25 "Nguồn nhiên liệu". Nạp SAU mol-w24.js.
   MolLab.org: chip/zone (HTML kéo thả cho U.drag), tube (ống nghiệm SVG có bọt khí, chất rắn, lớp, đèn cồn), coef (ô nhập hệ số, engine chấm),
               rot3d (mô hình quả cầu–que xoay được, kéo hoặc phím mũi tên), eq (phương trình dạng chữ), say (dòng trạng thái).
   Widget: oil-field (W25.1) · distill (W25.2) · fuel-sort (W25.3) · fuel-safe (W25.4). Hiệu ứng chỉ minh hoạ; không ghi nhiệt độ vì sách không ghi.
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab, ML = window.MolLab, EL = window.EnergyLab, CL = window.ChemLab;
  if (!L || !ML || !ML.ui || !EL || !CL || !CL.engine.ALC) return;
  const { pr, fmt, clamp } = L, M = ML.engine, U = ML.ui, { $, $$ } = U, E = CL.engine, ALC = E.ALC, uni = E.uni;
  let uid = 0;
  const NOTE = ML.NOTE(ML.SAFE);
  /* ------------------------------------------------------------ dụng cụ dùng chung */
  const O = {
    chip: (id, vi, en, extra) => '<span class="pw__chip" role="button" tabindex="0" data-drag="' + id + '" data-g="' + vi.replace(/"/g, '') + '"' + (extra || '') + '>' + pr(vi, en) + '</span>',
    zone: (id, inner, aria, cls) => '<div class="pw__zone ' + (cls || '') + '" data-drop="' + id + '" role="button" tabindex="0" aria-label="' + aria + '">' + (inner || '') + '</div>',
    say: (el, ok, vi, en) => { el.className = 'olab__status' + (ok === true ? ' olab__status--ok' : ok === false ? ' olab__status--warn' : ''); el.innerHTML = vi ? pr(vi, en) : ''; },
    eq: (r) => ALC.fmtEq(r),
    tube(o) {                                                         // ống nghiệm SVG 120×150
      const lv = clamp(o.level == null ? 0.5 : o.level, 0, 1), H = 100, yb = 120, y0 = yb - lv * H, col = o.col || '#dbeafe', t = o.t || 0;
      let s = '<svg viewBox="0 0 120 150" width="' + (o.w || 120) + '" role="img" aria-label="' + (o.label || 'Ống nghiệm / Test tube') + '"><path d="M30 10 L90 10 L90 112 Q90 126 60 126 Q30 126 30 112Z" fill="#e0f2fe" fill-opacity=".35"/>';
      if (o.layers) { let y = yb; o.layers.forEach((l) => { const h = l.h * H; y -= h; s += '<rect x="31" y="' + y.toFixed(1) + '" width="58" height="' + h.toFixed(1) + '" fill="' + l.col + '" fill-opacity=".92"/>'; }); }
      else if (lv > 0) s += '<path d="M31 ' + y0.toFixed(1) + ' H89 V112 Q89 124 60 124 Q31 124 31 112Z" fill="' + col + '" fill-opacity=".9"/>';
      if (o.solid) s += '<circle cx="60" cy="116" r="' + (o.solid.r || 6) + '" fill="' + o.solid.col + '" stroke="#374151" stroke-width="1"/>';
      for (let i = 0; i < (o.bub || 0); i++) { const span = Math.max(20, lv * H - 6), y = yb - 8 - ((t * 28 + i * 23) % span); s += '<circle cx="' + (40 + (i * 13) % 40) + '" cy="' + y.toFixed(1) + '" r="' + (2 + (i % 3) * 0.8) + '" fill="#fff" stroke="#6b7280" stroke-width=".8"/>'; }
      s += '<path d="M30 10 L90 10 L90 112 Q90 126 60 126 Q30 126 30 112Z" fill="none" stroke="currentColor" stroke-width="3"/>';
      if (o.heat) s += '<path d="M60 146 q-12 -10 0 -20 q12 10 0 20z" fill="#fb923c"/><path d="M60 144 q-6 -6 0 -12 q6 6 0 12z" fill="#fde047"/>';
      return s + '</svg>';
    },
    coef(rx) {                                                        // ô nhập hệ số cho phản ứng rx (đối tượng từ ALC.R)
      const sp = rx.re.concat(rx.pr);
      return '<div class="chem__coef" data-coef="' + rx.id + '"><small>' + pr('Tự viết hệ số rồi bấm kiểm tra:', 'Write the coefficients yourself, then check:') + '</small><div>' + sp.map((s, i) => (i === rx.re.length ? ' <b>' + (rx.rev ? '⇌' : '→') + '</b><small>' + (rx.cond || '') + '</small> ' : (i ? ' + ' : '')) + '<input type="number" min="1" max="20" step="1" data-co style="width:3.4em" aria-label="hệ số / coefficient ' + s.f + '"> ' + uni(s.f)).join('') + '</div><button type="button" class="btn btn--sm" data-cochk>' + pr('Kiểm tra', 'Check') + '</button> <span class="olab__status" data-coout role="status"></span></div>';
    },
    coefBind(rt) {                                                    // dùng một lần cho cả widget (uỷ quyền sự kiện)
      rt.addEventListener('click', (e) => { const b = e.target.closest('[data-cochk]'); if (!b) return; const box = b.closest('[data-coef]'), rx = ALC.R[box.dataset.coef], out = $('[data-coout]', box);
        const v = $$('[data-co]', box).map((i) => +i.value || 0), want = rx.re.concat(rx.pr).map((s) => s.n); if (v.some((x) => x <= 0)) { O.say(out, false, 'Hãy điền đủ hệ số (số nguyên dương).', 'Fill in every coefficient (positive integers).'); return; }
        const g = v.reduce((a, c) => { while (c) { const t = a % c; a = c; c = t; } return a; }, 0) || 1, norm = v.map((x) => x / g), ok = norm.every((x, i) => x === want[i]);
        O.say(out, ok, ok ? (v.every((x, i) => x === want[i]) ? '✓ Đúng, ' + O.eq(rx) : '✓ Đúng tỉ lệ; dạng nguyên nhỏ nhất: ' + O.eq(rx)) : 'Chưa cân bằng. Đếm số nguyên tử mỗi nguyên tố hai vế.', ok ? (v.every((x, i) => x === want[i]) ? '✓ Correct, ' + O.eq(rx) : '✓ Right ratio; smallest whole numbers: ' + O.eq(rx)) : 'Not balanced. Count the atoms of each element on both sides.'); });
    },
    rot3d(host, A, B, opt) {                                          // mô hình quả cầu–que xoay được; trả về {draw, setHl}
      opt = opt || {}; const S = { ay: 0.6, ax: 0.3, hl: null, auto: !U.REDUCED, drag: null }, id = 'r3' + (++uid);
      host.innerHTML = '<svg viewBox="0 0 320 220" class="mol__board" tabindex="0" role="img" aria-label="' + (opt.label || 'Mô hình phân tử, kéo hoặc dùng phím mũi tên để xoay / Molecular model, drag or use arrow keys to turn') + '" data-h="rot"></svg>';
      const svg = $('svg', host), CL3 = { C: '#6b7280', H: '#f3f4f6', O: '#ef4444', Na: '#8b5cf6' };
      function draw() {
        const ca = Math.cos(S.ay), sa = Math.sin(S.ay), cb = Math.cos(S.ax), sb = Math.sin(S.ax), k = opt.k || 52;
        const P = A.map((a) => { const x1 = a[1] * ca + a[3] * sa, z1 = -a[1] * sa + a[3] * ca, y2 = a[2] * cb - z1 * sb, z2 = a[2] * sb + z1 * cb; return { x: 160 + x1 * k, y: 110 + y2 * k, z: z2, el: a[0] }; });
        let s = B.map((b) => '<line x1="' + P[b[0]].x.toFixed(1) + '" y1="' + P[b[0]].y.toFixed(1) + '" x2="' + P[b[1]].x.toFixed(1) + '" y2="' + P[b[1]].y.toFixed(1) + '" stroke="#4b5563" stroke-width="' + (b[2] === 2 ? 7 : 4) + '" stroke-linecap="round"/>').join('');
        P.map((q, i) => [q, i]).sort((u, v) => u[0].z - v[0].z).forEach((pi) => { const q = pi[0], r = (q.el === 'H' ? 11 : 17) * (1 + q.z * 0.04); if (S.hl && S.hl.indexOf(pi[1]) >= 0) s += '<circle cx="' + q.x.toFixed(1) + '" cy="' + q.y.toFixed(1) + '" r="' + (r + 8).toFixed(1) + '" fill="#93c5fd" fill-opacity=".6" stroke="#2563eb" stroke-width="2"/>'; s += '<circle cx="' + q.x.toFixed(1) + '" cy="' + q.y.toFixed(1) + '" r="' + r.toFixed(1) + '" fill="' + CL3[q.el] + '" stroke="#111827" stroke-width="1.5"/>' + (q.el !== 'H' ? '<text x="' + q.x.toFixed(1) + '" y="' + (q.y + 5).toFixed(1) + '" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">' + q.el + '</text>' : ''); });
        svg.innerHTML = s;
      }
      svg.addEventListener('pointerdown', (e) => { S.drag = { x: e.clientX, y: e.clientY, ay: S.ay, ax: S.ax }; S.auto = false; svg.setPointerCapture(e.pointerId); });
      svg.addEventListener('pointermove', (e) => { if (!S.drag) return; S.ay = S.drag.ay + (e.clientX - S.drag.x) * 0.012; S.ax = clamp(S.drag.ax + (e.clientY - S.drag.y) * 0.012, -1.2, 1.2); draw(); });
      svg.addEventListener('pointerup', () => { S.drag = null; }); svg.addEventListener('pointercancel', () => { S.drag = null; });
      svg.addEventListener('keydown', (e) => { const d = { ArrowLeft: [-0.2, 0], ArrowRight: [0.2, 0], ArrowUp: [0, -0.2], ArrowDown: [0, 0.2] }[e.key]; if (d) { e.preventDefault(); e.stopPropagation(); S.auto = false; S.ay += d[0]; S.ax = clamp(S.ax + d[1], -1.2, 1.2); draw(); } });
      const lp = U.loop(host, (dt) => { if (!S.auto) return false; S.ay += dt * 0.5; draw(); return true; }); draw(); if (S.auto) lp.kick();
      return { draw, S, setHl(h) { S.hl = h; draw(); }, auto(on) { S.auto = on; if (on) lp.kick(); } };
    }
  };
  ML.org = O;

  /* ------------------------------------------------------------ W25.1 : mặt cắt mỏ dầu (Hình 25.1) */
  const LAYERS = [
    { id: 'gas', from: 0, to: 25, col: '#fff3b0', vi: 'Lớp khí (khí mỏ dầu, khí đồng hành)', en: 'Gas layer (oil-field gas, associated gas)', info: ['Chủ yếu là methane (khoảng 75%) cùng một số hydrocarbon khí khác.', 'Mainly methane (about 75%) with some other gaseous hydrocarbons.'] },
    { id: 'oil', from: 25, to: 60, col: '#3a2f2a', vi: 'Lớp dầu lỏng có hoà tan khí', en: 'Liquid oil with dissolved gas', info: ['Hỗn hợp phức tạp của nhiều loại hydrocarbon và một lượng nhỏ các hợp chất khác.', 'A complex mixture of many hydrocarbons and a small amount of other compounds.'] },
    { id: 'water', from: 60, to: 80, col: '#8ec5e8', vi: 'Lớp nước mặn', en: 'Salt water layer', info: ['Nằm dưới đáy mỏ dầu.', 'At the bottom of the oil field.'] },
    { id: 'rock', from: 80, to: 100, col: '#b8a07a', vi: 'Các lớp đất đá', en: 'Layers of rock', info: ['Bên dưới các lớp trên là đất đá.', 'Layers of rock lie beneath.'] }
  ];
  function oilField(body) {
    const id = 'of' + (++uid), P = { d: 0 }, S = { lab: {}, tapped: false };
    body.innerHTML = '<div class="olab em" data-lab="' + id + '"><p class="olab__hint">' + pr('Kéo thanh trượt độ sâu (hoặc kéo thẻ nhãn vào đúng lớp). Nhấn Khai thác khi mũi khoan chạm lớp khí.', 'Move the depth slider (or drag the label cards onto the right layer). Press Extract once the drill reaches the gas layer.') + '</p>' +
      U.ctl('d', 'Độ sâu mũi khoan', 'Drill depth', 0, 100, 1, 0, ' %') + '<div class="olab__btns" data-chips>' + [['gas', 'Khí mỏ dầu', 'Oil-field gas'], ['oil', 'Dầu lỏng hoà tan khí', 'Liquid oil with dissolved gas'], ['water', 'Nước mặn', 'Salt water'], ['rock', 'Đất đá', 'Rock']].map((c) => O.chip(c[0], c[1], c[2])).join('') + '</div>' +
      '<div class="org__field" data-field style="position:relative;border:2px solid var(--ink);border-radius:12px;overflow:hidden;height:260px">' + LAYERS.map((l) => '<div data-drop="' + l.id + '" role="button" tabindex="0" aria-label="Lớp ' + l.vi + ' / ' + l.en + ': thả thẻ nhãn vào đây" style="position:absolute;left:0;right:0;top:' + l.from + '%;height:' + (l.to - l.from) + '%;background:' + l.col + ';color:' + (l.id === 'oil' ? '#fff' : '#111') + ';padding:4px 8px;font-size:.85rem" class="pw__zone"><span data-tag="' + l.id + '"></span></div>').join('') + '<div data-bit style="position:absolute;left:50%;top:0;width:6px;margin-left:-3px;height:0;background:#374151;z-index:3;border-radius:3px"></div></div>' +
      '<div class="olab__btns"><button type="button" class="btn btn--sm" data-tap>' + pr('Khai thác', 'Extract') + '</button><button type="button" class="btn btn--sm" data-chk>' + pr('Kiểm tra nhãn', 'Check labels') + '</button><button type="button" class="btn btn--sm" data-reset>' + pr('Đặt lại', 'Reset') + '</button></div><p class="olab__status" data-st role="status"></p><p data-info></p>' + NOTE + '</div>';
    const lab = $('[data-lab]', body), st = $('[data-st]', lab), info = $('[data-info]', lab), bit = $('[data-bit]', lab);
    const layerAt = (d) => LAYERS.find((l) => d >= l.from && d < l.to) || LAYERS[3];
    function paint() { bit.style.height = P.d + '%'; const l = layerAt(P.d); info.innerHTML = '<b>' + pr(l.vi, l.en) + '.</b> ' + pr(l.info[0], l.info[1]) + (l.id === 'gas' ? ' ' + pr('Với khí thiên nhiên: khoan xuống mỏ khí, khí tự phun lên vì áp suất trong mỏ lớn hơn áp suất khí quyển.', 'For natural gas: drill into the gas field and the gas rises by itself because the pressure in the field exceeds atmospheric pressure.') : '');
      LAYERS.forEach((q) => { const t = $('[data-tag="' + q.id + '"]', lab), c = S.lab[q.id]; t.innerHTML = c ? '<b>' + c.vi + '</b>' : ''; }); }
    U.bindCtl(lab, P, paint); paint();
    U.drag(lab, (cid, zid) => { S.lab[zid] = { vi: ({ gas: 'Khí mỏ dầu', oil: 'Dầu lỏng hoà tan khí', water: 'Nước mặn', rock: 'Đất đá' })[cid], id: cid }; paint(); O.say(st, null, ''); });
    lab.addEventListener('click', (e) => {
      if (e.target.closest('[data-tap]')) { if (P.d < 25) O.say(st, false, 'Mũi khoan chưa tới lớp dầu và khí: kéo thanh trượt sâu hơn.', 'The drill has not reached the oil and gas yet: drag the slider deeper.'); else O.say(st, true, 'Khoan, thu dầu và khí → loại bỏ tạp chất để có dầu thô → vận chuyển (ống dẫn hoặc tàu chở dầu) đến nhà máy lọc dầu.', 'Drill and collect oil and gas → remove impurities to get crude oil → transport (pipeline or tanker) to the refinery.'); }
      else if (e.target.closest('[data-chk]')) { const bad = LAYERS.filter((l) => !S.lab[l.id] || S.lab[l.id].id !== l.id).length; O.say(st, bad === 0, bad ? 'Còn ' + bad + ' lớp chưa đúng hoặc chưa gắn nhãn. Thứ tự từ trên xuống: khí, dầu, nước mặn, đất đá.' : '✓ Đúng: khí ở trên, dầu lỏng ở giữa, nước mặn ở đáy, bên dưới là đất đá.', bad ? bad + ' layer(s) wrong or unlabelled. Top to bottom: gas, oil, salt water, rock.' : '✓ Correct: gas on top, liquid oil in the middle, salt water at the bottom, rock below.'); }
      else if (e.target.closest('[data-reset]')) { S.lab = {}; U.setCtl(lab, P, 'd', 0); paint(); O.say(st, null, ''); }
    });
    return { state: P };
  }

  /* ------------------------------------------------------------ W25.2 : tháp chưng cất (Bảng 25.1) */
  const FR = [
    { id: 'lpg', vi: 'Khí hoá lỏng', en: 'Liquefied gas', use: 'gas' }, { id: 'light', vi: 'Dầu nhẹ', en: 'Light oil', use: 'solv' }, { id: 'naph', vi: 'Naphtha nhẹ', en: 'Light naphtha', use: 'solv' },
    { id: 'pet', vi: 'Xăng', en: 'Petrol', use: 'petrol' }, { id: 'ker', vi: 'Dầu hoả', en: 'Kerosene', use: 'jet' }, { id: 'dsl', vi: 'Dầu diesel', en: 'Diesel oil', use: 'diesel' },
    { id: 'lub', vi: 'Dầu bôi trơn', en: 'Lubricating oil', use: 'lube' }, { id: 'wax', vi: 'Sáp paraffin', en: 'Paraffin wax', use: 'wax' }, { id: 'bit', vi: 'Nhựa đường', en: 'Bitumen', use: 'bit' }
  ];
  const USES = [['gas', 'Sưởi ấm, bếp gas', 'Heating, gas stoves'], ['solv#1', 'Dung môi', 'Solvent'], ['solv#2', 'Dung môi', 'Solvent'], ['petrol', 'Động cơ đốt trong (xe máy, ô tô)', 'Internal-combustion engines (motorbikes, cars)'], ['jet', 'Động cơ phản lực', 'Jet engines'], ['diesel', 'Động cơ diesel và lò nung', 'Diesel engines and furnaces'], ['lube', 'Chất bôi trơn', 'Lubricant'], ['wax', 'Sáp bóng, sáp dầu khoáng', 'Polish wax, mineral wax'], ['bit', 'Mặt đường nhựa, giấy dầu lợp mái', 'Asphalt roads, roofing felt']];
  function distillLab(body) {
    const id = 'ds' + (++uid), P = { h: 0 }, S = { put: {} };
    body.innerHTML = '<div class="olab em" data-lab="' + id + '"><p class="olab__hint">' + pr('Kéo thanh trượt mức nung: dầu thô bay hơi, các phân đoạn tách ra theo thứ tự từ nhẹ (trên) đến nặng (dưới). Rồi kéo thẻ ứng dụng vào đúng phân đoạn (Bảng 25.1).', 'Move the heating slider: crude oil vaporises and fractions separate from light (top) to heavy (bottom). Then drag each use card onto its fraction (Table 25.1).') + '</p>' + U.ctl('h', 'Mức nung (tương đối)', 'Heating level (relative)', 0, 100, 1, 0, ' %') +
      '<div class="olab__btns" data-chips>' + USES.map((u) => O.chip(u[0], u[1], u[2])).join('') + '</div><div data-rows></div><div class="olab__btns"><button type="button" class="btn btn--sm" data-chk>' + pr('Kiểm tra', 'Check') + '</button><button type="button" class="btn btn--sm" data-reset>' + pr('Đặt lại', 'Reset') + '</button></div><p class="olab__status" data-st role="status"></p>' +
      '<p class="olab__hint"><small>' + pr('Mô hình minh hoạ: bản sách không ghi khoảng nhiệt độ cụ thể của từng phân đoạn nên ở đây chỉ sắp theo thứ tự nhẹ → nặng, không nêu số. Naphtha: hỗn hợp hydrocarbon lỏng, dùng sản xuất xăng, làm dung môi hoặc nguyên liệu điều chế ethylene.', 'Illustration: the book gives no temperature range for each fraction, so fractions are only ordered light → heavy, with no numbers. Naphtha is a mixture of liquid hydrocarbons used to make petrol, as a solvent or as feedstock for ethylene.') + '</small></p></div>';
    const lab = $('[data-lab]', body), rows = $('[data-rows]', lab), st = $('[data-st]', lab);
    function paint() { rows.innerHTML = FR.map((f, i) => { const thr = (i + 1) / FR.length * 100, on = clamp((P.h - (thr - 100 / FR.length)) / (100 / FR.length), 0, 1), u = S.put[f.id];
      return '<div class="mol__bar" style="grid-template-columns:9em 1fr 12em"><b>' + pr(f.vi, f.en) + '</b><div class="mol__meter" role="img" aria-label="' + f.vi + ': ' + Math.round(on * 100) + '%"><i style="width:' + Math.round(on * 100) + '%;background:hsl(' + (40 - i * 4) + ',80%,' + (60 - i * 3) + '%)"></i></div>' + O.zone(f.id, u ? '<b>' + u.vi + '</b>' : '', 'Phân đoạn ' + f.vi + ': thả thẻ ứng dụng vào đây / ' + f.en + ' fraction: drop a use card here', '') + '</div>'; }).join(''); }
    U.bindCtl(lab, P, paint); paint();
    U.drag(lab, (cid, zid) => { const u = USES.find((x) => x[0] === cid); S.put[zid] = { vi: u[1], id: cid }; Object.keys(S.put).forEach((k) => { if (k !== zid && S.put[k].id === cid) delete S.put[k]; }); paint(); O.say(st, null, ''); });
    lab.addEventListener('click', (e) => {
      if (e.target.closest('[data-chk]')) { const bad = FR.filter((f) => !S.put[f.id] || S.put[f.id].id.split('#')[0] !== f.use); O.say(st, bad.length === 0, bad.length ? 'Chưa đúng ở: ' + bad.map((f) => f.vi).join(', ') + '.' : '✓ Đúng toàn bộ Bảng 25.1.', bad.length ? 'Not yet right for: ' + bad.map((f) => f.en).join(', ') + '.' : '✓ All of Table 25.1 is correct.'); }
      else if (e.target.closest('[data-reset]')) { S.put = {}; U.setCtl(lab, P, 'h', 0); paint(); O.say(st, null, ''); }
    });
    return { state: P };
  }

  /* ------------------------------------------------------------ W25.3 : phân loại nhiên liệu (Hình 25.2) */
  const FUELS = [['wood', 'Gỗ', 'Wood', 'solid'], ['coal', 'Than đá', 'Coal', 'solid'], ['fat', 'Mỡ', 'Fat', 'solid'], ['petrol', 'Xăng', 'Petrol', 'liquid'], ['diesel', 'Dầu diesel', 'Diesel oil', 'liquid'], ['ethanol', 'Ethanol', 'Ethanol', 'liquid'], ['biopet', 'Xăng sinh học', 'Biofuel petrol', 'liquid'], ['h2', 'Hydrogen', 'Hydrogen', 'gas'], ['ch4', 'Methane', 'Methane', 'gas'], ['c3', 'Propane', 'Propane', 'gas'], ['c4', 'Butane', 'Butane', 'gas'], ['ng', 'Khí thiên nhiên', 'Natural gas', 'gas'], ['og', 'Khí mỏ dầu', 'Oil-field gas', 'gas']];
  function fuelSort(body) {
    const [a, b] = U.wrap(body, 2), P = { p: 0 };
    EL.sorter(a, { hint: ['Kéo từng nhiên liệu vào cột rắn, lỏng hoặc khí (trạng thái ở điều kiện thường).', 'Drag each fuel into solid, liquid or gas (state at ordinary conditions).'], boxes: [{ id: 'solid', vi: 'Nhiên liệu rắn', en: 'Solid fuels' }, { id: 'liquid', vi: 'Nhiên liệu lỏng', en: 'Liquid fuels' }, { id: 'gas', vi: 'Nhiên liệu khí', en: 'Gaseous fuels' }],
      items: FUELS.map((f) => ({ id: f[0], vi: f[1], en: f[2], to: [f[3]] })), note: ['Nhiên liệu là những chất cháy được, khi cháy toả nhiệt và phát sáng.', 'A fuel is a substance that can burn, giving off heat and light.'] });
    b.innerHTML = '<div class="olab em" data-lab><p class="olab__hint">' + pr('Butane (Bài 23) ở điều kiện thường là khí; kéo thanh “độ nén” để thấy khí hoá lỏng khi bị nén (minh hoạ, không có số).', 'Butane (Lesson 23) is a gas at ordinary conditions; move the “compression” slider to see it liquefy under pressure (illustration, no numbers).') + '</p>' + U.ctl('p', 'Độ nén', 'Compression', 0, 100, 1, 0, ' %') + '<div data-cyl></div><p class="olab__status" data-st role="status"></p></div>';
    const lab = $('[data-lab]', b), cyl = $('[data-cyl]', lab), st = $('[data-st]', lab);
    function paint() { const liq = clamp((P.p - 55) / 45, 0, 1) * 70, gasH = 100 - liq;
      cyl.innerHTML = '<svg viewBox="0 0 120 150" width="120" role="img" aria-label="Bình chứa butane / Butane cylinder"><rect x="25" y="20" width="70" height="110" rx="14" fill="#e5e7eb" stroke="currentColor" stroke-width="3"/><rect x="27" y="' + (128 - liq).toFixed(1) + '" width="66" height="' + liq.toFixed(1) + '" fill="#f59e0b"/>' + (P.p < 55 ? [0, 1, 2, 3, 4, 5].map((i) => '<circle cx="' + (40 + (i % 3) * 20) + '" cy="' + (45 + Math.floor(i / 3) * 30) + '" r="4" fill="#93c5fd"/>').join('') : '') + '<text x="60" y="12" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor">C₄H₁₀</text></svg>';
      O.say(st, null, P.p < 55 ? 'Butane ở thể khí (các phân tử xa nhau).' : liq < 70 ? 'Nén thêm: một phần butane đã hoá lỏng ở đáy bình.' : 'Butane hoá lỏng gần hết: nén được nhiều khí vào bình nhỏ (như khí hoá lỏng LPG).', P.p < 55 ? 'Butane is a gas (molecules far apart).' : liq < 70 ? 'Compress more: some butane has liquefied at the bottom.' : 'Butane has mostly liquefied: a lot of gas fits in a small cylinder (like LPG).'); }
    U.bindCtl(lab, P, paint); paint(); return { state: P };
  }

  /* ------------------------------------------------------------ W25.4 : dùng nhiên liệu an toàn */
  function fuelSafe(body) {
    const [a, b, c] = U.wrap(body, 3), P = { v: 70 }, S = { burn: true, seq: [], bad: 0 };
    const IT = [['i1', 'Đặt bình gas nơi thông thoáng, xa nguồn nhiệt', 'Keep the gas cylinder in a ventilated place, away from heat', 1], ['i2', 'Mở cửa sổ khi đun nấu bằng gas', 'Open a window when cooking with gas', 1], ['i3', 'Kiểm tra rò rỉ gas thường xuyên', 'Check for gas leaks regularly', 1], ['i4', 'Tắt bếp, tắt thiết bị khi không dùng', 'Switch off stoves and appliances when not in use', 1], ['i5', 'Bảo dưỡng xe máy, ô tô định kì; ưu tiên phương tiện công cộng', 'Service vehicles regularly; prefer public transport', 1], ['i6', 'Dùng bình gas đạt tiêu chuẩn', 'Use a cylinder that meets the standard', 1], ['i7', 'Đốt than trong phòng kín để sưởi', 'Burn charcoal in a closed room for heating', 0], ['i8', 'Để bình gas cạnh bếp đang cháy', 'Leave the gas cylinder next to a burning stove', 0], ['i9', 'Bật công tắc điện khi ngửi thấy mùi gas', 'Switch on an electric light when you smell gas', 0]];
    EL.sorter(a, { hint: ['Kéo từng việc vào ô “An toàn, hiệu quả” hoặc “Nguy hiểm”.', 'Drag each action into “Safe and efficient” or “Dangerous”.'], boxes: [{ id: 'ok', vi: 'An toàn, hiệu quả', en: 'Safe and efficient' }, { id: 'no', vi: 'Nguy hiểm', en: 'Dangerous' }], items: IT.map((x) => ({ id: x[0], vi: x[1], en: x[2], to: [x[3] ? 'ok' : 'no'] })) });
    b.innerHTML = '<div class="olab em" data-lab><p class="olab__hint">' + pr('Kéo thanh “độ thông thoáng” khi đốt than trong phòng: thiếu oxygen thì cháy không hoàn toàn, sinh khí CO độc (Bài 23).', 'Move the “ventilation” slider while charcoal burns in a room: with too little oxygen combustion is incomplete and poisonous CO forms (Lesson 23).') + '</p>' + U.ctl('v', 'Độ thông thoáng', 'Ventilation', 0, 100, 1, 70, ' %') + '<label class="mol__tog"><input type="checkbox" data-burn checked> ' + pr('Đang đốt than trong phòng', 'Charcoal is burning in the room') + '</label><div class="mol__meter" aria-hidden="true"><i data-risk style="width:0"></i></div><p class="olab__status" data-st role="status"></p></div>';
    const lab = $('[data-lab]', b), st = $('[data-st]', lab), risk = $('[data-risk]', lab);
    function paint() { const r = S.burn ? Math.round(100 - P.v) : 0; risk.style.width = r + '%'; risk.style.background = r > 60 ? '#dc2626' : r > 30 ? '#f59e0b' : '#16a34a';
      O.say(st, r <= 30 ? true : false, !S.burn ? 'Không có nguồn đốt: không sinh khí độc.' : r > 60 ? 'Nguy hiểm: phòng kín, thiếu oxygen ⇒ sinh nhiều khí CO, dễ ngộ độc.' : r > 30 ? 'Cần mở thêm cửa để thông thoáng.' : 'Thông thoáng: cháy gần hoàn toàn, ít CO; vẫn không nên đốt than trong phòng ngủ.', !S.burn ? 'No fire, no poisonous gas.' : r > 60 ? 'Dangerous: closed room, too little oxygen ⇒ much CO, risk of poisoning.' : r > 30 ? 'Open more doors to ventilate.' : 'Well ventilated: nearly complete burning, little CO; still do not burn charcoal in a bedroom.'); }
    U.bindCtl(lab, P, paint); lab.addEventListener('change', (e) => { if (e.target.matches('[data-burn]')) { S.burn = e.target.checked; paint(); } }); paint();
    const STEPS = [['s2', 'Mở cửa sổ, cửa ra vào', 'Open windows and doors'], ['s3', 'Không bật tắt công tắc điện, không châm lửa', 'Do not switch electrics or light a flame'], ['s1', 'Tắt van bình gas', 'Close the cylinder valve']], ORDER = ['s1', 's2', 's3'];
    c.innerHTML = '<div class="olab em" data-lab><p class="olab__hint">' + pr('Ngửi thấy mùi gas rò: bấm các bước theo đúng thứ tự (tắt van trước, rồi mở cửa, không bật điện).', 'You smell leaking gas: press the steps in the right order (close the valve first, then open doors, no electrics).') + '</p><div class="olab__btns">' + STEPS.map((s) => '<button type="button" class="btn" data-s="' + s[0] + '">' + pr(s[1], s[2]) + '</button>').join('') + '<button type="button" class="btn btn--sm" data-r>' + pr('Làm lại', 'Again') + '</button></div><p class="olab__status" data-st role="status"></p></div>';
    const l3 = $('[data-lab]', c), s3 = $('[data-st]', l3);
    l3.addEventListener('click', (e) => { if (e.target.closest('[data-r]')) { S.seq = []; $$('[data-s]', l3).forEach((x) => { x.disabled = false; }); O.say(s3, null, ''); return; } const x = e.target.closest('[data-s]'); if (!x) return; const want = ORDER[S.seq.length];
      if (x.dataset.s !== want) { O.say(s3, false, 'Chưa đúng thứ tự: cần tắt van gas trước, sau đó mở cửa, và không bật điện.', 'Not the right order: close the gas valve first, then open doors, and no electrics.'); return; } S.seq.push(want); x.disabled = true; O.say(s3, S.seq.length === 3 ? true : null, S.seq.length === 3 ? '✓ Đúng. Sau đó rời khu vực và nhờ người lớn kiểm tra bình gas.' : 'Đúng, tiếp tục bước sau.', S.seq.length === 3 ? '✓ Correct. Then leave the area and ask an adult to check the cylinder.' : 'Right, go on to the next step.'); });
    return { state: P };
  }
  const sims = {
    'oil-field': { fn: oilField, vi: 'Mặt cắt mỏ dầu (Hình 25.1)', en: 'Cross-section of an oil field (Figure 25.1)', intro: 'Kéo độ sâu, kéo nhãn vào đúng lớp.' },
    distill: { fn: distillLab, vi: 'Tháp chưng cất dầu mỏ (Bảng 25.1)', en: 'Crude-oil distillation tower (Table 25.1)', intro: 'Kéo mức nung, kéo ứng dụng vào phân đoạn.' },
    'fuel-sort': { fn: fuelSort, vi: 'Phân loại nhiên liệu (Hình 25.2)', en: 'Classifying fuels (Figure 25.2)', intro: 'Kéo nhiên liệu vào ba cột.' },
    'fuel-safe': { fn: fuelSafe, vi: 'Sử dụng nhiên liệu an toàn', en: 'Using fuels safely', intro: 'Kéo việc làm vào đúng ô; chỉnh độ thông thoáng.' }
  };
  window.LabSims = Object.assign(window.LabSims || {}, sims);
})();
