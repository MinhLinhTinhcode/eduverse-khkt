/* ==========================================================================
   CHEM SERIES — KHTN 9, Bài 19 "Dãy hoạt động hoá học". Nạp SAU chem-lab.js.
   Widget (LabSims): ser-water, ser-acid, ser-salt, ser-order (trọng tâm), ser-predict, ser-pos.
   Dùng lại: ChemLab.bench (ống nghiệm), EnergyLab.sorter (kéo thả thẻ), OpticsLab.makeDrag (tay kéo SVG),
   ChemLab.log (nhật kí thí nghiệm dùng chung → ma trận phản ứng ở ser-order).
   Dãy hoạt động K, Na, Ca, Mg, Al, Zn, Fe, Pb, H, Cu, Ag, Au được IN trong sách (tr. 93): dữ liệu chính thức.
   Nhóm mạnh/trung bình/yếu là GỢI Ý nhất quán với Bài 20 (sách chỉ nêu Na, Ca, Mg, Al mạnh; Fe, Zn trung bình; Ag, Au yếu).
   Mọi hiệu ứng (sủi bọt, màu, thời gian) là MÔ HÌNH minh hoạ. Không tự thực hiện ở nhà.
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab, C = window.ChemLab, EL = window.EnergyLab;
  if (!L || !C || !C.engine || !EL) return;
  const { fmt, pr, clamp } = L, E = C.engine;
  const $ = (s, r) => r.querySelector(s), $$ = (s, r) => Array.from(r.querySelectorAll(s));
  const SAFE = ['Không tự thực hiện ở nhà: thí nghiệm thật với kim loại kiềm, acid hoặc dung dịch bạc nitrate cần giáo viên và dụng cụ bảo hộ (kính, găng tay).', 'Do not try this at home: real experiments with alkali metals, acids or silver nitrate need a teacher and protective equipment (goggles, gloves).'];
  const SERIES = E.ACTIVITY;                                             // K, Na, Ca, Mg, Al, Zn, Fe, Pb, H, Cu, Ag, Au
  const NAME = (M) => (M === 'H' ? 'hydrogen' : (E.METALS[M] ? E.METALS[M].vi.split(' ')[0] : M));
  const log = () => (C.log || {});
  const colOf = (R) => (R === 'H2O' || R === 'steam' ? 'water' : (R === 'HCl' || R === 'H2SO4' ? 'acid' : 'salt'));
  const safeP = () => '<p class="olab__hint"><small>⚠ ' + pr(SAFE[0], SAFE[1]) + '</small></p>';
  const wrap = (body, n) => { body.innerHTML = Array.from({ length: n }, (_, i) => '<div data-s' + i + '></div>').join(''); return Array.from({ length: n }, (_, i) => $('[data-s' + i + ']', body)); };
  const later = (fn) => setTimeout(fn, 60);

  /* ---------- bảng nhật kí: đã thử gì, kết quả ra sao ---------- */
  function logTable(metals, R, vsH) {
    const rows = metals.map((M) => {
      const k = M + '|' + R, v = log()[k];
      const res = v === 'react' ? pr('✓ có phản ứng (sinh H₂)', '✓ reacts (H₂ forms)') : v === 'none' ? pr('✗ không phản ứng', '✗ no reaction') : '<span class="muted">—</span>';
      const cmp = vsH && v ? (v === 'react' ? pr(M + ' đứng trước H', M + ' is before H') : pr(M + ' đứng sau H', M + ' is after H')) : '';
      return '<tr><th scope="row">' + M + '</th><td>' + res + '</td>' + (vsH ? '<td>' + cmp + '</td>' : '') + '</tr>';
    }).join('');
    return '<table class="olab__tbl"><thead><tr><th>' + pr('Kim loại', 'Metal') + '</th><th>' + pr('Kết quả', 'Result') + '</th>' + (vsH ? '<th>' + pr('So với H', 'Compared with H') + '</th>' : '') + '</tr></thead><tbody>' + rows + '</tbody></table>';
  }

  /* ---------- W19.1: Na, Fe, Cu với nước + chia hai nhóm ---------- */
  function serWater(body) {
    const [a, b] = wrap(body, 2);
    C.bench(a, { metals: ['Na', 'Fe', 'Cu'], reagents: ['H2O'], hint: ['Kéo mẫu natri, đinh sắt, dây đồng vào ống nước (Thí nghiệm 1, tham khảo Hình 18.5). Thử cả ba rồi chia nhóm.', 'Drag the sodium sample, the iron nail and the copper wire into the water (Experiment 1, see Figure 18.5). Try all three, then sort them.'] });
    a.insertAdjacentHTML('beforeend', safeP());
    const cfg = { hint: ['Chia ba kim loại thành hai nhóm theo khả năng phản ứng với nước ở điều kiện thường, rồi bấm Kiểm tra. Bảng bên dưới tự ghi các lần thử.', 'Sort the three metals into two groups by whether they react with water at ordinary conditions, then press Check. The table below records your trials.'],
      boxes: [{ id: 'yes', vi: 'Nhóm 1: phản ứng với nước', en: 'Group 1: reacts with water' }, { id: 'no', vi: 'Nhóm 2: không phản ứng', en: 'Group 2: no reaction' }],
      items: [{ id: 'Na', vi: 'Natri Na', en: 'Sodium Na', to: ['yes'] }, { id: 'Fe', vi: 'Sắt Fe', en: 'Iron Fe', to: ['no'] }, { id: 'Cu', vi: 'Đồng Cu', en: 'Copper Cu', to: ['no'] }],
      extra: () => logTable(['Na', 'Fe', 'Cu'], 'H2O', false),
      explain: ['Natri hoạt động mạnh hơn sắt và đồng; sắt và đồng chưa phân biệt được qua nước nên cần thí nghiệm với acid.', 'Sodium is more reactive than iron and copper; water cannot separate iron from copper, so we test with acid next.'] };
    const r = EL.sorter(b, cfg); a.addEventListener('pointerup', () => later(r.render)); a.addEventListener('keyup', () => later(r.render));
    return { state: r.state };
  }

  /* ---------- W19.2: Fe, Cu và các kim loại khác với HCl ---------- */
  function serAcid(body) {
    const [a, b] = wrap(body, 2), ms = ['Fe', 'Cu', 'Mg', 'Zn', 'Al', 'Pb', 'Ag'];
    C.bench(a, { metals: ms, reagents: ['HCl'], rate: true, time: true, hint: ['Kéo đinh sắt vào ống nghiệm HCl · Drag the iron nail into the HCl test tube. Rồi thử dây đồng và các kim loại khác; kéo thanh “thời gian” và “nồng độ”.', 'Then try the copper wire and the others; move the “time” and “concentration” sliders. Same amount of HCl, same concentration for each trial.'] });
    a.insertAdjacentHTML('beforeend', safeP());
    const draw = () => { b.innerHTML = '<p class="olab__hint">' + pr('Bảng so sánh với hydrogen: kim loại đẩy được H₂ ra khỏi acid thì đứng trước H trong dãy.', 'Comparison with hydrogen: a metal that releases H₂ from the acid is before H in the series.') + '</p>' + logTable(ms, 'HCl', true); };
    draw(); a.addEventListener('pointerup', () => later(draw)); a.addEventListener('keyup', () => later(draw));
    return {};
  }

  /* ---------- W19.3: dây đồng xoắn trong AgNO3 theo thời gian ---------- */
  function serSalt(body) {
    const [a, b] = wrap(body, 2);
    C.bench(a, { metals: ['Cu', 'Ag', 'Zn', 'Fe'], reagents: ['AgNO3', 'CuNO32'], time: true, hint: ['Kéo dây đồng (lò xo) vào dung dịch AgNO₃ 2 %, kéo thanh thời gian: bạc xám bám dần, dung dịch hoá xanh. Tự viết và cân bằng phương trình; thử Ag + Cu(NO₃)₂.', 'Drag the copper spring into 2 % AgNO₃ and move the time slider: grey silver builds up and the solution turns blue. Write and balance the equation yourself; try Ag + Cu(NO₃)₂.'] });
    a.insertAdjacentHTML('beforeend', safeP());
    b.innerHTML = '<p class="olab__hint">' + pr('Sau khi quan sát: Cu đẩy Ag ra khỏi muối nên Cu hoạt động hoá học mạnh hơn Ag. Thứ tự rút ra từ ba thí nghiệm: Na, Fe, Cu, Ag và H (H nằm giữa Fe và Cu).', 'After observing: Cu displaces Ag from its salt, so Cu is more reactive than Ag. Order from the three experiments: Na, Fe, Cu, Ag with H between Fe and Cu.') + '</p>';
    return {};
  }

  /* ---------- W19.4 (TRỌNG TÂM): sắp xếp dãy + ma trận phản ứng ---------- */
  function serOrder(body) {
    const [top, mid, mx] = wrap(body, 3);
    let stage = 5, r = null;
    const set5 = ['Na', 'Fe', 'H', 'Cu', 'Ag'], correct = () => (stage === 5 ? SERIES.filter((x) => set5.indexOf(x) >= 0) : SERIES.slice());
    const cardTxt = (M) => (M === 'H' ? { vi: 'Hydrogen H', en: 'Hydrogen H' } : { vi: NAME(M) + ' ' + M, en: E.METALS[M].en + ' ' + M });
    top.innerHTML = '<p class="olab__hint">' + pr('Sắp các thẻ theo thứ tự hoạt động hoá học giảm dần (ô 1 là mạnh nhất). Bước 1: 5 thẻ. Bước 2: cả 12 thẻ. Bấm “Gợi ý” để điền một ô đúng.', 'Arrange the cards by decreasing reactivity (slot 1 is the strongest). Step 1: 5 cards. Step 2: all 12. Press “Hint” to fill one correct slot.') + '</p><div class="olab__btns"><button type="button" class="btn btn--sm" data-st="5" aria-pressed="true">' + pr('Bước 1: 5 thẻ', 'Step 1: 5 cards') + '</button> <button type="button" class="btn btn--sm" data-st="12" aria-pressed="false">' + pr('Bước 2: 12 thẻ', 'Step 2: 12 cards') + '</button> <button type="button" class="btn btn--sm" data-hint>' + pr('Gợi ý', 'Hint') + '</button></div>';
    function mount() {
      const ord = correct();
      r = EL.sorter(mid, { hint: ['Kéo hoặc bấm thẻ rồi bấm ô để đặt.', 'Drag a card, or click a card then a slot.'],
        boxes: ord.map((M, i) => ({ id: 's' + i, vi: (i + 1) + (i === 0 ? ' (mạnh nhất)' : i === ord.length - 1 ? ' (yếu nhất)' : ''), en: (i + 1) + (i === 0 ? ' (strongest)' : i === ord.length - 1 ? ' (weakest)' : ''), cap: 1 })),
        items: ord.map((M, i) => Object.assign({ id: M, to: ['s' + i] }, cardTxt(M))).sort((x, y) => (x.id < y.id ? -1 : 1)), ordered: 1,
        explain: ['Dãy in trong sách: K, Na, Ca, Mg, Al, Zn, Fe, Pb, H, Cu, Ag, Au.', 'Series printed in the book: K, Na, Ca, Mg, Al, Zn, Fe, Pb, H, Cu, Ag, Au.'] });
    }
    function matrix() {
      const lg = log(), ms = Array.from(new Set(Object.keys(lg).map((k) => k.split('|')[0])));
      const order = ms.sort((x, y) => SERIES.indexOf(x) - SERIES.indexOf(y)), cols = ['water', 'acid', 'salt'];
      const cell = (M, c) => { const ks = Object.keys(lg).filter((k) => k.split('|')[0] === M && colOf(k.split('|')[1]) === c); if (!ks.length) return '—'; return ks.some((k) => lg[k] === 'react') ? '✓' : '✗'; };
      mx.innerHTML = '<p class="olab__hint">' + pr('Ma trận phản ứng tự điền từ các thí nghiệm em đã làm ở các hoạt động trước (✓ có phản ứng, ✗ không, — chưa thử).', 'Reaction matrix filled in from the experiments you have done in earlier activities (✓ reaction, ✗ none, — not tried).') + '</p>' +
        (order.length ? '<table class="olab__tbl"><thead><tr><th>' + pr('Kim loại', 'Metal') + '</th><th>' + pr('Nước', 'Water') + '</th><th>' + pr('Acid', 'Acid') + '</th><th>' + pr('Dung dịch muối', 'Salt solution') + '</th></tr></thead><tbody>' + order.map((M) => '<tr><th scope="row">' + M + '</th>' + cols.map((c) => '<td>' + cell(M, c) + '</td>').join('') + '</tr>').join('') + '</tbody></table>' : '<p class="muted">' + pr('Chưa có thí nghiệm nào. Hãy làm các hoạt động phía trên.', 'No experiments yet. Do the activities above first.') + '</p>');
    }
    top.addEventListener('click', (e) => {
      const s = e.target.closest('[data-st]'), h = e.target.closest('[data-hint]');
      if (s) { stage = +s.dataset.st; $$('[data-st]', top).forEach((x) => x.setAttribute('aria-pressed', x === s)); mount(); }
      else if (h && r) { const ord = correct(), S = r.state; const i = ord.findIndex((M, k) => S.box['s' + k].indexOf(M) < 0); if (i < 0) return; const M = ord[i]; Object.keys(S.box).forEach((k) => (S.box[k] = S.box[k].filter((x) => x !== M))); S.box['s' + i] = [M]; S.checked = false; r.render(); }
    });
    mount(); matrix(); document.addEventListener('pointerup', onDoc); function onDoc() { if (!top.isConnected) { document.removeEventListener('pointerup', onDoc); return; } later(matrix); }
    return {};
  }

  /* ---------- W19.5: dự đoán trước khi chạy + thử thách phân biệt hai dung dịch ---------- */
  const PAIRS = [['CuSO4', 'ZnNO32'], ['AgNO3', 'ZnNO32'], ['FeSO4', 'AgNO3'], ['HCl', 'H2O']];
  function serPredict(body) {
    const [a, b] = wrap(body, 2);
    C.bench(a, { metals: ['Mg', 'Zn', 'Al', 'Fe', 'Pb', 'Cu', 'Ag', 'Ca'], reagents: ['H2SO4', 'HCl', 'CuSO4', 'AgNO3', 'FeSO4', 'ZnNO32', 'H2O'], predict: true, hint: ['Chọn kim loại và dung dịch, thả vào ống rồi DỰ ĐOÁN “có / không phản ứng” trước khi máy chạy; máy giải thích theo vị trí trong dãy.', 'Pick a metal and a solution, drop them in, then PREDICT “reaction / no reaction” before the machine runs; it explains by position in the series.'] });
    a.insertAdjacentHTML('beforeend', safeP());
    let pi = 0, score = 0, tries = 0;
    const metals = ['Zn', 'Cu', 'Fe', 'Mg', 'Ag'];
    const nameR = (R) => E.uni(E.REAGENTS[R].f);
    function draw(msg) {
      const p = PAIRS[pi % PAIRS.length];
      b.innerHTML = '<div class="olab pw"><p class="olab__hint"><b>' + pr('Thử thách: chỉ dùng MỘT kim loại để phân biệt hai chất lỏng', 'Challenge: use ONE metal to tell two liquids apart') + '</b><br>' + pr('Hai ống không nhãn: ' + nameR(p[0]) + ' và ' + nameR(p[1]) + '. Kim loại nào cho hiện tượng KHÁC nhau ở hai ống?', 'Two unlabeled tubes: ' + nameR(p[0]) + ' and ' + nameR(p[1]) + '. Which metal behaves DIFFERENTLY in the two?') + '</p><div class="olab__btns">' + metals.map((M) => '<button type="button" class="btn btn--sm" data-ch="' + M + '">' + M + '</button>').join(' ') + ' <button type="button" class="btn btn--sm" data-next>' + pr('Cặp khác', 'Next pair') + '</button></div><p class="olab__status" role="status">' + (msg || '') + '</p></div>';
    }
    b.addEventListener('click', (e) => {
      const n = e.target.closest('[data-next]'); if (n) { pi++; draw(''); return; }
      const c = e.target.closest('[data-ch]'); if (!c) return;
      const M = c.dataset.ch, p = PAIRS[pi % PAIRS.length], r0 = E.react(M, p[0]), r1 = E.react(M, p[1]), a0 = r0.kind === 'react', a1 = r1.kind === 'react';
      tries++; const ok = a0 !== a1; if (ok) score++;
      const d = (rx, R) => (rx.kind === 'react' ? pr(M + ' + ' + nameR(R) + ': phản ứng (' + E.eqStr(rx) + ')', M + ' + ' + nameR(R) + ': reacts (' + E.eqStr(rx) + ')') : pr(M + ' + ' + nameR(R) + ': không phản ứng', M + ' + ' + nameR(R) + ': no reaction'));
      draw((ok ? '<b>✓ ' + pr('Phân biệt được.', 'It tells them apart.') + '</b> ' : '<b>✗ ' + pr('Chưa phân biệt được (cả hai giống nhau).', 'It does not tell them apart (both behave the same).') + '</b> ') + d(r0, p[0]) + '; ' + d(r1, p[1]) + '. ' + pr('Điểm: ' + score + '/' + tries, 'Score: ' + score + '/' + tries));
    });
    draw('');
    return {};
  }

  /* ---------- W19.6: vị trí trong dãy → mạnh / trung bình / yếu ---------- */
  function serPos(body) {
    const id = 'sp' + Math.random().toString(36).slice(2, 7), S = { i: 1 };
    const W = 360, x0 = 22, dx = (W - 2 * x0) / 11, xs = (i) => x0 + i * dx;
    body.innerHTML = '<div class="olab em chem" data-lab="' + id + '"><p class="olab__hint">' + pr('Kéo chấm dọc theo dãy hoạt động (hoặc dùng mũi tên ← →, Shift ±5, thanh trượt, ô số) để xem kim loại đó mạnh, trung bình hay yếu và có phản ứng với nước, acid, muối không.', 'Drag the dot along the series (or use ← → arrows, Shift ±5, the slider or the number box) to see whether the metal is strong, medium or weak and whether it reacts with water, acid or salts.') + '</p><svg class="olab__svg em__svg" viewBox="0 0 360 120" role="group" aria-label="Dãy hoạt động hoá học / Reactivity series" data-svg></svg><label class="olab__ctl"><span>' + pr('Vị trí', 'Position') + ' <output data-out>2</output>/12</span><input type="range" min="1" max="12" step="1" value="2" data-k="pos" aria-label="Vị trí trong dãy / Position in the series"></label><label class="olab__ctl"><span>' + pr('Hoặc nhập số', 'Or type a number') + '</span><input type="number" min="1" max="12" step="1" value="2" data-n style="width:5em"></label><div class="olab__btns"><button type="button" class="btn btn--sm" data-act="reset">' + pr('Đặt lại', 'Reset') + '</button></div><div data-r="res" aria-live="polite"></div><p class="olab__status" data-r="status" role="status"></p><p class="olab__hint"><small>' + pr('Phân nhóm là gợi ý nhất quán với Bài 20 (sách không in ranh giới). Chì phản ứng chậm với acid vì tạo muối ít tan; đây là mô hình.', 'The grouping is a suggestion consistent with Lesson 20 (the book prints no borders). Lead reacts slowly with acid because its salts are sparingly soluble; this is a model.') + '</small></p></div>';
    const lab = $('[data-lab="' + id + '"]', body), svg = $('[data-svg]', lab);
    const col = (M) => (M === 'H' ? '#8fd0f0' : { strong: '#e6735a', mid: '#e8b74a', weak: '#7fb7a0' }[E.groupOf(M)]);
    function draw() {
      const M = SERIES[S.i - 1];
      let s = '<rect x="0" y="0" width="360" height="120" fill="#f6f8fc"/>';
      SERIES.forEach((m, i) => { s += '<rect x="' + (xs(i) - dx / 2 + 1) + '" y="38" width="' + (dx - 2) + '" height="34" rx="5" fill="' + col(m) + '" opacity="' + (i === S.i - 1 ? 1 : 0.55) + '"/><text x="' + xs(i) + '" y="60" text-anchor="middle" font-size="13" font-weight="700" fill="#1b2433">' + m + '</text>'; });
      s += '<text x="22" y="22" font-size="11" fill="#1b2433">' + 'mạnh / strong' + '</text><text x="338" y="22" text-anchor="end" font-size="11" fill="#1b2433">yếu / weak</text><text x="180" y="108" text-anchor="middle" font-size="11" fill="#1b2433">' + (M === 'H' ? 'H: mốc so sánh / reference' : NAME(M) + ' / ' + E.METALS[M].en) + '</text>';
      s += '<g data-h="pos" tabindex="0" role="slider" aria-label="Vị trí trong dãy hoạt động / Position in the series" aria-valuemin="1" aria-valuemax="12" aria-valuenow="' + S.i + '" aria-valuetext="' + M + '" transform="translate(' + xs(S.i - 1) + ',90)" class="olab__hd olab__hd--src"><circle r="24" class="olab__hit"/><circle r="9" class="olab__dot"/></g>';
      { const hf = document.activeElement && svg.contains(document.activeElement) && document.activeElement.dataset.h; svg.innerHTML = s; if (hf) { const g = svg.querySelector('[data-h="' + hf + '"]'); if (g) g.focus({ preventScroll: true }); } }
      $('[data-out]', lab).textContent = S.i; $('[data-k="pos"]', lab).value = S.i; $('[data-n]', lab).value = S.i;
      let h;
      if (M === 'H') h = '<p>' + pr('Hydrogen (H) không phải kim loại; trong dãy nó là mốc: kim loại đứng trước H đẩy được H₂ ra khỏi dung dịch acid.', 'Hydrogen (H) is not a metal; in the series it is the reference: metals before H displace H₂ from acid solutions.') + '</p>';
      else {
        const g = E.groupOf(M), gv = { strong: ['mạnh', 'strong'], mid: ['trung bình', 'medium'], weak: ['yếu', 'weak'] }[g];
        const line = (R, lv, le) => { const rx = E.react(M, R); return '<li>' + pr(lv + ': ' + (rx.kind === 'react' ? 'có — ' + E.eqStr(rx) : 'không phản ứng'), le + ': ' + (rx.kind === 'react' ? 'yes — ' + E.eqStr(rx) : 'no reaction')) + '</li>'; };
        h = '<p><b>' + M + '</b>: ' + pr('hoạt động hoá học ' + gv[0], gv[1] + ' reactivity') + '. ' + pr('Đứng ' + (SERIES.indexOf(M) < SERIES.indexOf('H') ? 'trước' : 'sau') + ' H.', 'It is ' + (SERIES.indexOf(M) < SERIES.indexOf('H') ? 'before' : 'after') + ' H.') + '</p><ul>' + line('H2O', 'Với nước', 'With water') + line('HCl', 'Với dung dịch HCl', 'With HCl solution') + line('CuSO4', 'Với dung dịch CuSO₄', 'With CuSO₄ solution') + '</ul>';
      }
      $('[data-r="res"]', lab).innerHTML = h;
    }
    const set = (v) => { S.i = clamp(Math.round(+v) || 1, 1, 12); draw(); };
    L.makeDrag(svg, { pos: { move(x) { set(Math.round((x - x0) / dx) + 1); }, key(d) { set(S.i + d); } } });
    svg.addEventListener('keydown', (e) => { if (/^Arrow/.test(e.key)) e.stopPropagation(); });
    lab.addEventListener('input', (e) => { if (e.target.matches('[data-k="pos"]') || e.target.matches('[data-n]')) { if (e.target.value === '') return; set(e.target.value); } });
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-act="reset"]')) set(2); });
    draw(); return { state: S };
  }

  const sims = {
    'ser-water': { fn: serWater, vi: 'Thí nghiệm 1: Na, Fe, Cu với nước', en: 'Experiment 1: Na, Fe, Cu with water', intro: 'Kéo kim loại vào nước, rồi chia nhóm.' },
    'ser-acid': { fn: serAcid, vi: 'Thí nghiệm 2: kim loại với dung dịch HCl (Hình 19.1)', en: 'Experiment 2: metals with HCl solution (Figure 19.1)', intro: 'Kéo đinh sắt vào ống HCl.' },
    'ser-salt': { fn: serSalt, vi: 'Thí nghiệm 3: đồng với dung dịch AgNO₃ (Hình 19.2)', en: 'Experiment 3: copper with AgNO₃ solution (Figure 19.2)', intro: 'Kéo dây đồng vào AgNO₃.' },
    'ser-order': { fn: serOrder, vi: 'Xếp dãy hoạt động hoá học', en: 'Build the reactivity series', intro: 'Xếp thẻ theo thứ tự giảm dần.' },
    'ser-predict': { fn: serPredict, vi: 'Dự đoán rồi kiểm tra phản ứng', en: 'Predict, then test the reaction', intro: 'Dự đoán trước khi chạy.' },
    'ser-pos': { fn: serPos, vi: 'Vị trí trong dãy và ý nghĩa', en: 'Position in the series and its meaning', intro: 'Kéo chấm dọc theo dãy.' }
  };
  window.LabSims = Object.assign(window.LabSims || {}, sims);
})();
