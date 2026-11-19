/* ==========================================================================
   EM EFFECTS — tác dụng của dòng điện xoay chiều (KHTN 9, Bài 15). Nạp SAU em-lab.js.
   Widgets (LabSims): eff-sort (W15.1)  eff-magnet (W15.2)  eff-heat (W15.3)  eff-safety (W15.4)
   Mô hình MINH HOẠ: độ sáng ∝ công suất, lực hút ∝ (N·I)², nhấp nháy ở tần số thấp; ở 50 Hz mắt không phân biệt.
   Engine: EmLab.engine.fx  { power(I,R), tempRise(P), force(N,I,phase), classify(device) }.
   Không có hình ảnh gây sốc điện; phần an toàn chỉ là chữ và thẻ thao tác.
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab; if (!L || !window.EmLab) return;
  const { fmt, pr, clamp } = L;
  const $ = (s, r) => r.querySelector(s), $$ = (s, r) => Array.from(r.querySelectorAll(s));
  let uid = 0;
  const DEV = [
    { id: 'dryer', vi: 'Máy sấy tóc', en: 'Hair dryer', fx: ['heat', 'mag'] },
    { id: 'iron', vi: 'Bàn là', en: 'Electric iron', fx: ['heat'] },
    { id: 'kettle', vi: 'Ấm đun nước', en: 'Electric kettle', fx: ['heat'] },
    { id: 'fluo', vi: 'Đèn ống huỳnh quang', en: 'Fluorescent tube', fx: ['light'] },
    { id: 'incan', vi: 'Bóng đèn sợi đốt', en: 'Incandescent bulb', fx: ['light', 'heat'] },
    { id: 'ledl', vi: 'Đèn LED chiếu sáng', en: 'LED lamp', fx: ['light'] },
    { id: 'emag', vi: 'Nam châm điện (cần cẩu sắt vụn)', en: 'Electromagnet (scrap crane)', fx: ['mag'] },
    { id: 'relay', vi: 'Rơ-le điện từ', en: 'Electromagnetic relay', fx: ['mag'] },
    { id: 'speaker', vi: 'Loa điện', en: 'Loudspeaker', fx: ['mag'] },
    { id: 'defib', vi: 'Máy khử rung tim (xung điện ngắn)', en: 'Defibrillator (short pulses)', fx: ['phys'] }
  ];
  const BOX = [['heat', 'Tác dụng nhiệt', 'Heating effect'], ['light', 'Tác dụng phát sáng', 'Luminous effect'], ['mag', 'Tác dụng từ', 'Magnetic effect'], ['phys', 'Tác dụng sinh lí', 'Physiological effect']];
  const fx = {
    power: (I, R) => I * I * R, tempRise: (P, k) => P * (k || 0.02),
    force: (N, I, phase) => { const f = N * I; return f * f * (phase == null ? 1 : Math.sin(phase) * Math.sin(phase)); },   // AC: lực ∝ i² dao động ở 2f
    classify: (id) => (DEV.find((d) => d.id === id) || { fx: [] }).fx.slice()
  };
  window.EmLab.engine.fx = fx;
  const E = window.EmLab.engine;
  const prevT = E.selfTest;
  E.selfTest = function () {
    const T = prevT().concat(), add = (n, ok, got) => T.push({ name: n, ok: !!ok, got });
    add('P = I²R: 2 A qua 10 Ω ⇒ 40 W', fx.power(2, 10) === 40, fx.power(2, 10));
    add('lực hút điện từ: AC dao động giữa 0 và N²I², DC không đổi', fx.force(100, 1, Math.PI / 2) === 1e4 && fx.force(100, 1, 0) === 0 && fx.force(100, 1) === 1e4, fx.force(100, 1, Math.PI / 2));
    add('máy sấy tóc có tác dụng nhiệt và từ (động cơ)', fx.classify('dryer').indexOf('heat') >= 0 && fx.classify('dryer').indexOf('mag') >= 0, fx.classify('dryer'));
    return T;
  };
  /* gộp vào self-test tổng của OpticsLab */
  const base = L.engine.selfTest; L.engine.selfTest = function () { return base().concat(fx.power(2, 10) === 40 ? [] : [{ name: 'fx', ok: false }]); };

  function loop(root, step) {
    let vis = true, on = false, last = 0;
    const tick = (ts) => { if (!root.isConnected) { on = false; return; } const dt = Math.min(0.05, (ts - last) / 1000); last = ts; const keep = step(dt, ts / 1000); if (keep !== false && vis) requestAnimationFrame(tick); else on = false; };
    const kick = () => { if (on || !vis) return; on = true; last = performance.now(); requestAnimationFrame(tick); };
    if ('IntersectionObserver' in window) new IntersectionObserver((es) => { vis = es[0].isIntersecting; if (vis) kick(); }).observe(root);
    return { kick };
  }

  /* ---------------------------------------------------- W15.1: PHÂN LOẠI THIẾT BỊ (kéo thả hoặc chạm) */
  function sortLab(body) {
    const id = 'es' + (++uid), S = { box: {}, sel: null, checked: false };
    DEV.forEach((d) => (S.box[d.id] = []));
    body.innerHTML = '<div class="olab pw" data-lab="' + id + '"><p class="olab__hint">' + pr('Kéo mỗi thiết bị vào ô tác dụng của dòng điện mà nó dùng (một thiết bị có thể thuộc nhiều ô), hoặc bấm thiết bị rồi bấm ô. Bấm “Kiểm tra” để xem phản hồi.', 'Drag each device into the box of the current effect it uses (a device may belong to several boxes), or click a device and then a box. Press “Check” for feedback.') + '</p><div data-r="pool"></div><div class="olab__cols" data-r="boxes"></div><div class="olab__btns"><button type="button" class="btn btn--sm" data-act="chk">' + pr('Kiểm tra', 'Check') + '</button><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button></div><p class="olab__status" data-r="status" role="status"></p></div>';
    const lab = $('[data-lab="' + id + '"]', body), q = (n) => $('[data-r="' + n + '"]', lab);
    const chip = (d, boxK) => { let cls = 'pw__chip'; if (S.sel === d.id) cls += ' is-sel'; if (S.checked && boxK) cls += d.fx.indexOf(boxK) >= 0 ? ' is-ok' : ' is-bad'; return '<span class="' + cls + '" role="button" tabindex="0" data-dev="' + d.id + '"' + (boxK ? ' data-from="' + boxK + '"' : '') + '>' + pr(d.vi, d.en) + '</span>'; };
    function render() {
      const placed = {}; BOX.forEach((b) => S.box[b[0]] = S.box[b[0]] || []);
      q('pool').innerHTML = '<div class="pw__zone" data-zone="pool">' + DEV.map((d) => chip(d, null)).join('') + '</div>';
      q('boxes').innerHTML = BOX.map((b) => '<div class="pw__zone" data-zone="' + b[0] + '"><b>' + pr(b[1], b[2]) + '</b><br>' + (S.box[b[0]] || []).map((i) => chip(DEV.find((d) => d.id === i), b[0])).join('') + '</div>').join('');
    }
    function place(devId, boxK, fromK) {
      if (boxK === 'pool') { if (fromK) S.box[fromK] = S.box[fromK].filter((x) => x !== devId); }
      else if (S.box[boxK].indexOf(devId) < 0) S.box[boxK].push(devId);
      S.checked = false; S.sel = null; render();
    }
    let drag = null;
    lab.addEventListener('pointerdown', (e) => { const c = e.target.closest('[data-dev]'); if (!c) return; drag = { id: c.dataset.dev, from: c.dataset.from, x: e.clientX, y: e.clientY, moved: false, el: c }; c.setPointerCapture && c.setPointerCapture(e.pointerId); });
    lab.addEventListener('pointermove', (e) => { if (!drag) return; if (Math.abs(e.clientX - drag.x) + Math.abs(e.clientY - drag.y) > 8) { drag.moved = true; drag.el.classList.add('is-drag'); $$('.pw__zone', lab).forEach((z) => { const r = z.getBoundingClientRect(); z.classList.toggle('is-over', e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom); }); } });
    lab.addEventListener('pointerup', (e) => { if (!drag) return; const d = drag; drag = null; d.el.classList.remove('is-drag'); const zs = $$('.pw__zone', lab); let hit = null; zs.forEach((z) => { const r = z.getBoundingClientRect(); z.classList.remove('is-over'); if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) hit = z.dataset.zone; }); if (d.moved && hit) place(d.id, hit, d.from); else if (!d.moved) { S.sel = S.sel === d.id ? null : d.id; render(); } });
    lab.addEventListener('keydown', (e) => { const c = e.target.closest && e.target.closest('[data-dev]'); if (c && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); e.stopPropagation(); S.sel = S.sel === c.dataset.dev ? null : c.dataset.dev; render(); } else if (c && e.key === 'Delete' && c.dataset.from) { place(c.dataset.dev, 'pool', c.dataset.from); } if (/^Arrow/.test(e.key) && c) e.stopPropagation(); });
    lab.addEventListener('click', (e) => {
      const z = e.target.closest('[data-zone]'); if (z && S.sel && !e.target.closest('[data-dev]') && z.dataset.zone !== 'pool') { place(S.sel, z.dataset.zone); return; }
      const a = e.target.closest('[data-act]'); if (!a) return;
      if (a.dataset.act === 'reset') { DEV.forEach((d) => (S.box[d.id] = [])); BOX.forEach((b) => (S.box[b[0]] = [])); S.checked = false; S.sel = null; q('status').textContent = ''; render(); }
      else { S.checked = true; let ok = 0, tot = 0, miss = 0; BOX.forEach((b) => { S.box[b[0]].forEach((i) => { tot++; if (DEV.find((d) => d.id === i).fx.indexOf(b[0]) >= 0) ok++; }); }); DEV.forEach((d) => d.fx.forEach((k) => { if (S.box[k].indexOf(d.id) < 0) miss++; })); render(); q('status').innerHTML = pr('Đặt đúng ' + ok + '/' + tot + ' thiết bị vào ô; còn thiếu ' + miss + ' vị trí. Gợi ý: máy sấy tóc có dây nung (nhiệt) và động cơ (từ); bóng sợi đốt vừa sáng vừa nóng.', 'Correct placements ' + ok + '/' + tot + '; still missing ' + miss + '. Hint: a hair dryer has a heating wire (heat) and a motor (magnetic); an incandescent bulb gives light and heat.'); }
    });
    render(); return { state: S };
  }

  /* ---------------------------------------------------- W15.2: TÁC DỤNG TỪ — AC so với DC */
  function magEffectLab(body) {
    const id = 'ef' + (++uid), S = { ac: true, I: 1, N: 200, ph: 0, t: 0, needle: 0, slow: 1 };
    body.innerHTML = '<div class="olab em" data-lab="' + id + '"><p class="olab__hint">' + pr('Cuộn dây có lõi sắt hút chiếc đinh. Chuyển giữa dòng điện một chiều (DC) và xoay chiều (AC): ở DC lực hút không đổi và hai đầu cuộn có cực cố định; ở AC lực hút dao động rất nhanh (làm chậm lại để quan sát) và kim la bàn chỉ rung.', 'A coil with an iron core attracts the nail. Switch between direct (DC) and alternating (AC) current: with DC the pull is steady and the ends have fixed poles; with AC the pull oscillates very fast (slowed down here so you can see it) and the compass needle just trembles.') + '</p>' +
      '<div class="olab__btns"><button type="button" class="btn btn--sm" data-act="mode" aria-pressed="true">' + pr('Đang dùng: xoay chiều (AC)', 'Using: alternating (AC)') + '</button><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button></div>' +
      '<div class="olab__cols"><div class="olab__stage"><svg class="olab__svg em__svg" viewBox="0 0 560 280" role="group" aria-label="Cuộn dây lõi sắt và đinh / Iron-core coil and nail"><rect width="560" height="280" class="cl__bg"/><g data-r="sc"></g></svg></div><div class="olab__panel"><label class="olab__ctl"><span>I = <output data-out="I"></output> A</span><input type="range" data-k="I" min="0" max="3" step="0.1"></label><label class="olab__ctl"><span>N = <output data-out="N"></output> ' + pr('vòng', 'turns') + '</span><input type="range" data-k="N" min="50" max="1000" step="50"></label><div class="olab__read" data-r="read" aria-live="polite"></div></div></div><p class="olab__status" data-r="status" role="status"></p></div>';
    const lab = $('[data-lab="' + id + '"]', body), q = (n) => $('[data-r="' + n + '"]', lab);
    function render() {
      const phase = S.ph, F = S.ac ? fx.force(S.N, S.I, phase) : fx.force(S.N, S.I), Fmax = 1000 * 3 * 1000 * 3 || 1, rel = clamp(F / (1e6 * 9) * 4, 0, 1), gap = 40 - 30 * rel;
      const left = S.ac ? (Math.sin(phase) >= 0 ? 'N' : 'S') : 'N', right = left === 'N' ? 'S' : 'N';
      let s = '<rect x="80" y="100" width="190" height="40" fill="#9aa3b2" stroke="currentColor" stroke-width="2"/>';
      for (let k = 0; k < 9; k++) s += '<ellipse cx="' + (110 + k * 18) + '" cy="120" rx="9" ry="34" fill="none" stroke="#b8651c" stroke-width="3"/>';
      s += '<text x="76" y="158" class="em__pole" fill="currentColor" style="fill:var(--ink)" text-anchor="end">' + (S.I > 0 ? left : '') + '</text><text x="274" y="158" class="em__pole" style="fill:var(--ink)">' + (S.I > 0 ? right : '') + '</text>';
      s += '<g transform="translate(' + (276 + gap) + ',120)"><rect x="0" y="-5" width="70" height="10" rx="3" fill="#5b6270"/><polygon points="70,-5 84,0 70,5" fill="#5b6270"/></g>';
      const ang = S.ac ? Math.sin(S.t * 40) * 6 * clamp(S.I, 0, 1) : clamp(S.I, 0, 1) * 70;
      s += '<g transform="translate(420,210)"><circle r="34" fill="#fff" stroke="currentColor" stroke-width="2"/><g transform="rotate(' + (ang).toFixed(1) + ')"><polygon points="0,-28 5,0 -5,0" fill="#e0393e"/><polygon points="0,28 5,0 -5,0" fill="#6f8fe0"/></g><text y="52" text-anchor="middle" class="cl__lab">' + 'la bàn / compass' + '</text></g>';
      s += '<text x="20" y="30" class="cl__lab">' + (S.ac ? 'AC: lực hút dao động (làm chậm) / pull oscillates (slowed)' : 'DC: lực hút không đổi / steady pull') + '</text>';
      q('sc').innerHTML = s;
      q('read').innerHTML = '<table class="olab__tbl olab__tbl--read"><tbody><tr><th scope="row">N·I</th><td>' + fmt(S.N * S.I, 0) + '</td></tr><tr><th scope="row">' + pr('Lực hút (tương đối)', 'Pull (relative)') + '</th><td>' + fmt(rel * 100, 0) + ' %</td></tr><tr><th scope="row">' + pr('Cực của đầu phải', 'Pole at right end') + '</th><td>' + (S.I > 0 ? right : '–') + '</td></tr></tbody></table>';
      q('status').innerHTML = S.ac ? pr('Dòng xoay chiều đổi chiều 100 lần/s nên cực từ cũng đổi 100 lần/s; lực hút luôn hướng vào lõi sắt nhưng dao động giữa 0 và cực đại. Đinh sắt vẫn bị hút (ở thật, dao động quá nhanh để thấy).', 'The AC reverses 100 times per second so the poles also swap 100 times per second; the pull always acts on the iron but oscillates between 0 and its maximum. The nail is still attracted (in reality the oscillation is too fast to see).') : pr('Dòng một chiều: cực từ cố định, lực hút không đổi; nam châm điện cũng hút các vật bằng sắt.', 'Direct current: fixed poles and a steady pull; the electromagnet attracts iron objects too.');
      $$('[data-k]', lab).forEach((e) => { e.value = S[e.dataset.k]; $('[data-out="' + e.dataset.k + '"]', lab).textContent = fmt(S[e.dataset.k], e.dataset.k === 'I' ? 1 : 0); });
    }
    const lp = loop(lab, (dt) => { S.t += dt; S.ph += dt * 6; render(); return true; });
    lab.addEventListener('input', (e) => { const k = e.target.dataset && e.target.dataset.k; if (k) { S[k] = +e.target.value; render(); } });
    lab.addEventListener('click', (e) => { const a = e.target.closest('[data-act]'); if (!a) return; if (a.dataset.act === 'mode') { S.ac = !S.ac; a.setAttribute('aria-pressed', S.ac); a.innerHTML = pr(S.ac ? 'Đang dùng: xoay chiều (AC)' : 'Đang dùng: một chiều (DC)', S.ac ? 'Using: alternating (AC)' : 'Using: direct (DC)'); } else { Object.assign(S, { ac: true, I: 1, N: 200 }); const m = $('[data-act="mode"]', lab); m.setAttribute('aria-pressed', 'true'); m.innerHTML = pr('Đang dùng: xoay chiều (AC)', 'Using: alternating (AC)'); } render(); lp.kick(); });
    render(); lp.kick(); return { state: S };
  }

  /* ---------------------------------------------------- W15.3: TÁC DỤNG NHIỆT VÀ PHÁT SÁNG */
  function heatLab(body) {
    const id = 'eh' + (++uid), S = { U: 220, f: 50, R: 807, t: 0, paused: false, kind: 'incan' };
    body.innerHTML = '<div class="olab em" data-lab="' + id + '"><p class="olab__hint">' + pr('Dòng điện xoay chiều qua dây tóc làm nóng dây (công suất P = I²R) nên dây phát sáng. Kéo thanh trượt hiệu điện thế và tần số: ở tần số thấp đèn nhấp nháy, ở 50 Hz mắt không phân biệt được (minh hoạ).', 'Alternating current through a filament heats it (power P = I²R) so it glows. Move the voltage and frequency sliders: at low frequency the lamp flickers; at 50 Hz the eye cannot tell (illustrative).') + '</p>' +
      '<div class="olab__btns"><button type="button" class="btn btn--sm" data-act="pause" aria-pressed="false">' + pr('Tạm dừng nhấp nháy', 'Pause flicker') + '</button><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button></div><p class="olab__status olab__status--warn" data-r="warn" hidden>' + pr('Cảnh báo nhấp nháy: bấm “Tạm dừng nhấp nháy” nếu thấy khó chịu.', 'Flicker warning: press “Pause flicker” if it bothers you.') + '</p>' +
      '<div class="olab__cols"><div class="olab__stage"><svg class="olab__svg em__svg" viewBox="0 0 560 240" role="img" aria-label="Bóng đèn sợi đốt và đồ thị công suất / Bulb and power graph"><rect width="560" height="240" class="cl__bg"/><g data-r="sc"></g></svg></div><div class="olab__panel"><label class="olab__ctl"><span>U = <output data-out="U"></output> V (' + pr('hiệu dụng', 'rms') + ')</span><input type="range" data-k="U" min="0" max="250" step="5"></label><label class="olab__ctl"><span>f = <output data-out="f"></output> Hz</span><input type="range" data-k="f" min="1" max="50" step="1"></label><div class="olab__read" data-r="read" aria-live="polite"></div></div></div><p class="olab__status" data-r="status" role="status"></p></div>';
    const lab = $('[data-lab="' + id + '"]', body), q = (n) => $('[data-r="' + n + '"]', lab);
    const Prated = 60, Urated = 220, R = Urated * Urated / Prated;
    function render() {
      const P = S.U * S.U / R, I = S.U / R, T = 25 + P * 40, tt = S.t;
      const inst = S.f <= 12 && !S.paused ? Math.pow(Math.sin(2 * Math.PI * S.f * tt), 2) * 2 : 1;      // p(t) = 2·P·sin² quanh giá trị trung bình P
      const b = clamp(P / Prated * Math.min(inst, 2) / 1.2, 0, 1), over = S.U > 230;
      let s = '<circle cx="130" cy="100" r="' + (50 + 14 * b).toFixed(0) + '" fill="#ffe24a" opacity="' + (b * 0.6).toFixed(2) + '"/><circle cx="130" cy="100" r="46" fill="' + (over ? '#ffd0d0' : '#fff6bf') + '" stroke="currentColor" stroke-width="2.4"/><path d="M110 112 L116 82 L126 112 L136 82 L146 112" fill="none" stroke="' + (b > 0.1 ? '#ff7a1a' : '#555') + '" stroke-width="' + (2 + b * 2).toFixed(1) + '"/><rect x="110" y="146" width="40" height="30" fill="#d8dde8" stroke="currentColor" stroke-width="2"/>';
      s += '<text x="130" y="200" text-anchor="middle" class="cl__lab">220 V – 60 W</text><text x="130" y="216" text-anchor="middle" class="cl__num">' + 'T dây tóc ≈ ' + fmt(T, 0) + ' °C (minh hoạ / illustrative)' + '</text>';
      let d = '', dp = ''; for (let k = 0; k <= 160; k++) { const x = 270 + k * 1.7, ts = k / 160 * 3 / S.f; d += (k ? 'L' : 'M') + x.toFixed(1) + ' ' + (110 - 70 * Math.sin(2 * Math.PI * S.f * ts) * (S.U / 250)).toFixed(1); dp += (k ? 'L' : 'M') + x.toFixed(1) + ' ' + (190 - 60 * Math.pow(Math.sin(2 * Math.PI * S.f * ts), 2) * Math.pow(S.U / 250, 2)).toFixed(1); }
      s += '<line x1="270" y1="110" x2="545" y2="110" class="cl__axis"/><path d="' + d + '" fill="none" stroke="var(--pen)" stroke-width="2.2"/><text x="272" y="28" class="cl__lab">u(t)</text><line x1="270" y1="190" x2="545" y2="190" class="cl__axis"/><path d="' + dp + '" fill="none" stroke="var(--red)" stroke-width="2.2"/><text x="272" y="136" class="cl__lab">p(t) = u²/R ≥ 0</text>';
      q('sc').innerHTML = s;
      q('read').innerHTML = '<table class="olab__tbl olab__tbl--read"><tbody><tr><th scope="row">I</th><td>' + fmt(I, 3) + ' A</td></tr><tr><th scope="row">P = U²/R</th><td>' + fmt(P, 1) + ' W</td></tr><tr><th scope="row">R</th><td>' + fmt(R, 0) + ' Ω</td></tr></tbody></table>';
      q('status').innerHTML = over ? pr('U lớn hơn định mức nhiều: dây tóc quá nóng, có thể cháy.', 'U is well above the rating: the filament is too hot and may burn out.') : S.f <= 12 && !S.paused ? pr('f thấp: công suất p(t) dao động nên đèn nhấp nháy; dây tóc nóng nên sáng cả khi dòng đổi chiều.', 'At low f the power p(t) oscillates so the lamp flickers; the filament’s heat keeps it glowing as the current reverses.') : pr('Công suất trung bình P = U²/R. Ở 50 Hz p(t) biến đổi 100 lần/s, mắt chỉ thấy độ sáng đều.', 'The mean power is P = U²/R. At 50 Hz p(t) varies 100 times per second and the eye sees steady light.');
      q('warn').hidden = !(S.f >= 2 && S.f <= 12 && !S.paused);
      $$('[data-k]', lab).forEach((e) => { e.value = S[e.dataset.k]; $('[data-out="' + e.dataset.k + '"]', lab).textContent = S[e.dataset.k]; });
      return true;
    }
    const lp = loop(lab, (dt) => { S.t += dt; render(); return !(S.paused || S.f > 12) || (S._f !== S.f ? ((S._f = S.f), true) : false); });
    lab.addEventListener('input', (e) => { const k = e.target.dataset && e.target.dataset.k; if (k) { S[k] = +e.target.value; render(); lp.kick(); } });
    lab.addEventListener('click', (e) => { const a = e.target.closest('[data-act]'); if (!a) return; if (a.dataset.act === 'pause') { S.paused = !S.paused; a.setAttribute('aria-pressed', S.paused); } else { Object.assign(S, { U: 220, f: 50, paused: false }); $('[data-act="pause"]', lab).setAttribute('aria-pressed', 'false'); } render(); lp.kick(); });
    render(); lp.kick(); return { state: S };
  }

  /* ---------------------------------------------------- W15.4: AN TOÀN ĐIỆN — thẻ nên / không nên */
  function safetyLab(body) {
    const id = 'ey' + (++uid), CARDS = [
      ['Tắt nguồn (rút phích hoặc ngắt cầu dao) trước khi sửa thiết bị điện.', 'Switch off (unplug or trip the breaker) before repairing an appliance.', true],
      ['Dùng dụng cụ có cán cách điện khi làm việc với điện.', 'Use tools with insulated handles when working with electricity.', true],
      ['Chạm vào dây điện trần để kiểm tra xem còn điện không.', 'Touch a bare wire to check whether it is live.', false],
      ['Đến gần trạm biến áp và leo lên cột điện cao thế để nhặt diều.', 'Go near a transformer substation or climb a high-voltage pole to fetch a kite.', false],
      ['Cầm thiết bị điện khi tay ướt hoặc đứng chân trần trên sàn ướt.', 'Handle electrical equipment with wet hands or while standing barefoot on a wet floor.', false],
      ['Thay dây điện hỏng, bọc kín chỗ nối bằng vật liệu cách điện.', 'Replace a damaged cable and cover joints with insulating material.', true]
    ];
    const S = { ans: {}, done: false };
    body.innerHTML = '<div class="olab" data-lab="' + id + '"><p class="olab__hint">' + pr('Phân loại từng thẻ: nên làm hay không nên làm. Điện lưới nguy hiểm đến tính mạng; mô phỏng này chỉ có chữ, không có hình ảnh gây sốc.', 'Sort each card: should do or should not do. Mains electricity can be fatal; this widget uses text only, with no shocking images.') + '</p><div data-r="list"></div><p class="olab__status" data-r="status" role="status"></p><div class="olab__btns"><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button></div></div>';
    const lab = $('[data-lab="' + id + '"]', body), q = (n) => $('[data-r="' + n + '"]', lab);
    function render() {
      q('list').innerHTML = CARDS.map((c, i) => { const a = S.ans[i]; const res = a == null ? '' : (a === c[2] ? ' ✔' : ' ✘ ' + pr('Chưa đúng', 'Not right')); return '<div class="pw__zone" style="margin:6px 0;min-height:0"><p style="margin:0 0 6px">' + pr(c[0], c[1]) + '</p><button type="button" class="btn btn--sm" data-i="' + i + '" data-v="1">' + pr('Nên', 'Do') + '</button> <button type="button" class="btn btn--sm" data-i="' + i + '" data-v="0">' + pr('Không nên', 'Don’t') + '</button><b>' + res + '</b></div>'; }).join('');
      const n = Object.keys(S.ans).length, ok = Object.keys(S.ans).filter((i) => S.ans[i] === CARDS[i][2]).length;
      q('status').innerHTML = n ? pr('Đúng ' + ok + '/' + n + '. Nhớ: không lại gần trạm biến áp; ngắt điện trước khi sửa; không chạm dây điện trần.', 'Right ' + ok + '/' + n + '. Remember: stay away from transformer substations; switch off before repairs; never touch bare wires.') : '';
    }
    lab.addEventListener('click', (e) => { const b = e.target.closest('[data-i]'); if (b) { S.ans[+b.dataset.i] = b.dataset.v === '1'; render(); } else if (e.target.closest('[data-act="reset"]')) { S.ans = {}; render(); } });
    render(); return { state: S, CARDS };
  }

  window.LabSims = Object.assign(window.LabSims || {}, {
    'eff-sort': { fn: sortLab, vi: 'Phân loại tác dụng của dòng điện', en: 'Sorting the effects of electric current', intro: 'Kéo thiết bị vào ô nhiệt, sáng, từ, sinh lí.' },
    'eff-magnet': { fn: magEffectLab, vi: 'Tác dụng từ: dòng một chiều và xoay chiều (Hình 15.4, 15.5)', en: 'Magnetic effect: DC and AC (Figures 15.4, 15.5)', intro: 'Cuộn dây lõi sắt hút đinh; đổi DC/AC.' },
    'eff-heat': { fn: heatLab, vi: 'Tác dụng nhiệt và phát sáng (Hình 15.1–15.3)', en: 'Heating and luminous effects (Figures 15.1–15.3)', intro: 'Dây tóc nóng sáng; công suất P = U²/R.' },
    'eff-safety': { fn: safetyLab, vi: 'An toàn khi dùng điện', en: 'Electrical safety', intro: 'Phân loại nên / không nên.' }
  });
})();
