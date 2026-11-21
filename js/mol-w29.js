/* ==========================================================================
   MOL W29 — widget Bài 29 "Carbohydrate. Glucose và saccharose". Nạp SAU mol-w28.js.
   carb-formula (W29.1) · sugar-phys (W29.2) · tollens (W29.3, trọng tâm) · gluc-ferment (W29.4) · suc-hyd (W29.5) · carb-use (W29.6)
   Số liệu do ChemLab.engine.CHO tính (180 g glucose → 216 g Ag; → 92 g C₂H₅OH + 88 g CO₂; 342 g saccharose → 180 g + 180 g). Hiệu ứng chỉ minh hoạ.
   Nhãn “mở rộng/bổ sung”: nhiệt độ–enzyme, thuỷ phân saccharose rồi thử tráng bạc. Hoá chất (AgNO₃, NH₃) và đun nóng chỉ minh hoạ.
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab, ML = window.MolLab, EL = window.EnergyLab, CL = window.ChemLab;
  if (!L || !ML || !ML.org || !EL || !CL || !CL.engine.CHO || !ML.org28) return;
  const { pr, fmt, clamp } = L, U = ML.ui, O = ML.org, { $, $$ } = U, E = CL.engine, ALC = E.ALC, CHO = E.CHO, uni = E.uni;
  const NOTE = ML.NOTE(ML.org28.SAFE2), EXT = ML.org28.EXT, f1 = (x) => fmt(x, 1);

  /* ------------------------------------------------------------ W29.1 : công thức Cn(H2O)m */
  const CARB = [['glu', 'glucose C₆H₁₂O₆', 'glucose C₆H₁₂O₆', 'C6H12O6', 'carb'], ['suc', 'saccharose C₁₂H₂₂O₁₁', 'sucrose C₁₂H₂₂O₁₁', 'C12H22O11', 'carb'], ['sta', 'tinh bột — mắt xích C₆H₁₀O₅', 'starch — unit C₆H₁₀O₅', 'C6H10O5', 'carb'], ['cel', 'cellulose — mắt xích C₆H₁₀O₅', 'cellulose — unit C₆H₁₀O₅', 'C6H10O5', 'carb'], ['eth', 'ethylic alcohol C₂H₆O', 'ethylic alcohol C₂H₆O', 'C2H5OH', 'no'], ['ace', 'acetic acid C₂H₄O₂ (kiểm tra điều kiện)', 'acetic acid C₂H₄O₂ (check the condition)', 'CH3COOH', 'no']];
  function carbFormula(body) {
    const [a, b, c] = U.wrap(body, 3), P = { n: 6, m: 6 };
    EL.sorter(a, { hint: ['Kéo từng chất vào ô carbohydrate hoặc không phải carbohydrate (Hình 29.1).', 'Drag each substance into carbohydrate or not a carbohydrate (Figure 29.1).'],
      boxes: [{ id: 'carb', vi: 'Carbohydrate', en: 'Carbohydrates' }, { id: 'no', vi: 'Không phải carbohydrate', en: 'Not carbohydrates' }],
      items: CARB.map((x) => ({ id: x[0], vi: x[1], en: x[2], to: [x[4]] })),
      note: ['Carbohydrate chứa C, H, O và thường có công thức chung Cₙ(H₂O)ₘ. “Thường” vì điều kiện này chưa đủ: acetic acid C₂H₄O₂ viết được dạng C₂(H₂O)₂ nhưng không phải carbohydrate.', 'Carbohydrates contain C, H and O and usually have the general formula Cₙ(H₂O)ₘ. “Usually”, because the form alone is not enough: acetic acid C₂H₄O₂ can be written C₂(H₂O)₂ but is not a carbohydrate.'] });
    b.innerHTML = '<div class="olab em"><p class="olab__hint">' + pr('Viết lại công thức phân tử dạng Cₙ(H₂O)ₘ (máy tính từ số nguyên tử).', 'Rewriting each molecular formula as Cₙ(H₂O)ₘ (computed from the atom counts).') + '</p><table class="tbl"><thead><tr><th>' + pr('Chất', 'Substance') + '</th><th>' + pr('Số nguyên tử C · H · O', 'Atoms C · H · O') + '</th><th>Cₙ(H₂O)ₘ</th></tr></thead><tbody>' + CARB.map((x) => { const r = CHO.cnh2om(x[3]); return '<tr><td>' + pr(x[1], x[2]) + '</td><td>' + r.C + ' · ' + r.H + ' · ' + r.O + '</td><td>' + (r.fits ? '<b>' + r.str + '</b>' : '<small>' + pr('không viết được (H ≠ 2·O)', 'cannot (H ≠ 2·O)') + '</small>') + '</td></tr>'; }).join('') + '</tbody></table></div>';
    c.innerHTML = '<div class="olab em" data-lab><p class="olab__hint">' + pr('Thanh trượt n và m: lắp công thức Cₙ(H₂O)ₘ và xem máy nhận ra chất nào.', 'Sliders n and m: build Cₙ(H₂O)ₘ and see which substance the engine recognises.') + '</p>' + U.ctl('n', 'n (số nguyên tử C)', 'n (number of C atoms)', 1, 12, 1, P.n, '') + U.ctl('m', 'm (số phân tử H₂O)', 'm (number of H₂O units)', 1, 12, 1, P.m, '') + '<p class="olab__status" data-st role="status"></p><div data-o></div></div>';
    const lab = $('[data-lab]', c), st = $('[data-st]', lab), out = $('[data-o]', lab);
    const paint = () => { const f = 'C' + P.n + 'H' + (2 * P.m) + 'O' + P.m, hit = CARB.find((x) => { const q = CHO.cnh2om(x[3]); return q.fits && q.C === P.n && q.O === P.m; });
      out.innerHTML = '<div class="mol__card"><b class="mol__f">C' + P.n + '(H₂O)' + P.m + ' = ' + uni(f) + '</b> <small>M = ' + CHO.mm(f) + '</small></div>';
      O.say(st, hit ? true : null, hit ? 'Trùng với ' + hit[1] + '.' : 'Đúng dạng Cₙ(H₂O)ₘ nhưng không phải chất nào trong bài.', hit ? 'Matches ' + hit[2] + '.' : 'Fits the Cₙ(H₂O)ₘ form but is not one of the substances in the lesson.'); };
    U.bindCtl(lab, P, paint); paint(); return {};
  }

  /* ------------------------------------------------------------ W29.2 : so sánh tính chất vật lí */
  function sugarPhys(body) {
    const [a, b, c] = U.wrap(body, 3), P = { v: 10 };
    a.innerHTML = '<div class="olab em" data-lab><p class="olab__hint">' + pr('Kéo thanh thể tích tinh thể để tính khối lượng (m = d · V). Số liệu theo sách (CRC Handbook, 97th ed.).', 'Move the crystal-volume slider to find the mass (m = d · V). Data from the book (CRC Handbook, 97th ed.).') + '</p>' + U.ctl('v', 'Thể tích tinh thể', 'Crystal volume', 0, 100, 1, P.v, ' cm³') + '<table class="tbl"><thead><tr><th></th><th>Glucose C₆H₁₂O₆</th><th>Saccharose C₁₂H₂₂O₁₁</th></tr></thead><tbody><tr><th>' + pr('Trạng thái, màu', 'State, colour') + '</th><td colspan="2">' + pr('tinh thể không màu', 'colourless crystals') + '</td></tr><tr><th>' + pr('Mùi · vị', 'Smell · taste') + '</th><td colspan="2">' + pr('không mùi · vị ngọt', 'odourless · sweet') + '</td></tr><tr><th>' + pr('Tính tan', 'Solubility') + '</th><td colspan="2">' + pr('tan tốt trong nước', 'dissolve well in water') + '</td></tr><tr><th>' + pr('Khối lượng riêng', 'Density') + '</th><td>1,56 g/cm³</td><td>1,58 g/cm³</td></tr><tr><th>' + pr('Khối lượng', 'Mass') + '</th><td data-mg></td><td data-ms></td></tr></tbody></table></div>';
    const l1 = $('[data-lab]', a), paint = () => { $('[data-mg]', l1).textContent = fmt(1.56 * P.v, 2) + ' g'; $('[data-ms]', l1).textContent = fmt(1.58 * P.v, 2) + ' g'; }; U.bindCtl(l1, P, paint); paint();
    b.innerHTML = '<div class="olab em" data-lab><p class="olab__hint">' + pr('Kéo thìa đường vào cốc nước.', 'Drag a spoonful of sugar into the glass of water.') + '</p><div class="olab__btns">' + O.chip('glu', 'Thìa glucose', 'Spoon of glucose') + O.chip('suc', 'Thìa saccharose', 'Spoon of sucrose') + '<button type="button" class="btn btn--sm" data-reset>' + pr('Đặt lại', 'Reset') + '</button></div><div class="olab__cols">' + O.zone('cup', '<div data-v></div>', 'Cốc nước: thả đường vào đây / Glass of water: drop sugar here', 'mol__tube') + '</div><p class="olab__status" data-st role="status"></p></div>';
    const l2 = $('[data-lab]', b), st = $('[data-st]', l2), v = $('[data-v]', l2), paintCup = (s) => { v.innerHTML = O.tube({ level: 0.55, col: s ? '#e0f2fe' : '#e0f2fe', solid: s === 'drop' ? { col: '#ffffff', r: 5 } : null, label: 'Cốc nước / Glass of water' }); }; paintCup(null);
    U.drag(l2, (cid) => { paintCup('drop'); setTimeout(() => { if (l2.isConnected) paintCup(null); }, 700); O.say(st, true, (cid === 'glu' ? 'Glucose' : 'Saccharose') + ' tan tốt trong nước, tạo dung dịch không màu, vị ngọt.', (cid === 'glu' ? 'Glucose' : 'Sucrose') + ' dissolves well in water, giving a colourless sweet solution.'); });
    l2.addEventListener('click', (e) => { if (e.target.closest('[data-reset]')) { paintCup(null); O.say(st, null, ''); } });
    EL.sorter(c, { hint: ['Kéo nguồn tự nhiên vào đường tương ứng.', 'Drag each natural source to the matching sugar.'], boxes: [{ id: 'glu', vi: 'Glucose', en: 'Glucose' }, { id: 'suc', vi: 'Saccharose', en: 'Sucrose' }],
      items: [['quả nho chín', 'ripe grapes', 'glu'], ['máu (nguồn năng lượng cho tế bào)', 'blood (energy for cells)', 'glu'], ['trái cây chín', 'ripe fruit', 'glu'], ['cây mía', 'sugar cane', 'suc'], ['củ cải đường', 'sugar beet', 'suc'], ['thốt nốt', 'palmyra palm sap', 'suc']].map((x, i) => ({ id: 's' + i, vi: x[0], en: x[1], to: [x[2]] })) });
    return {};
  }

  /* ------------------------------------------------------------ W29.3 : thí nghiệm tráng bạc (trọng tâm) */
  const NEED = 4;                                                    // số giọt NH₃ làm kết tủa tan hết (mô hình)
  function tollens(body) {
    const [a, b] = U.wrap(body, 2), P = { T: 75, t: 5, g: 180 }, S = { ag: false, nh3: 0, sample: null, bath: false };
    a.innerHTML = '<div class="olab em" data-lab><p class="olab__hint">' + pr('Làm theo sách: (1) kéo AgNO₃ 1% vào ống; (2) nhỏ từng giọt NH₃ 5% đến khi kết tủa tan hết; (3) thả glucose 10% (hoặc saccharose để so sánh); (4) kéo ống vào cốc nước nóng (70–80 °C, khoảng 5 phút).', 'Follow the book: (1) drag 1% AgNO₃ into the tube; (2) add 5% NH₃ drop by drop until the precipitate dissolves; (3) add 10% glucose (or sucrose to compare); (4) put the tube in the hot-water beaker (70–80 °C, about 5 minutes).') + '</p>' +
      U.ctl('T', 'Nhiệt độ cốc nước nóng', 'Temperature of the hot-water bath', 20, 90, 5, P.T, ' °C') + U.ctl('t', 'Thời gian đun', 'Heating time', 0, 5, 0.5, P.t, ' min') +
      '<div class="olab__btns">' + O.chip('ag', 'AgNO₃ 1% (1 mL)', 'AgNO₃ 1% (1 mL)') + O.chip('nh3', 'Giọt NH₃ 5%', 'Drop of NH₃ 5%') + O.chip('gluc', 'Glucose 10% (1 mL)', 'Glucose 10% (1 mL)') + O.chip('sucr', 'Saccharose 10% (1 mL)', 'Sucrose 10% (1 mL)') + '<button type="button" class="btn btn--sm" data-reset>' + pr('Đặt lại', 'Reset') + '</button></div>' +
      '<div class="olab__cols">' + O.zone('tube', '<div data-v></div>', 'Ống nghiệm: thả hoá chất vào đây / Test tube: drop the chemicals here', 'mol__tube') + O.zone('bath', '<b>' + pr('Cốc nước nóng', 'Hot-water beaker') + '</b><br><small>' + pr('Kéo thẻ “Ống nghiệm” vào đây', 'Drag the “Test tube” card here') + '</small>', 'Cốc nước nóng / Hot-water beaker', '') + '</div><div class="olab__btns">' + O.chip('tubechip', 'Ống nghiệm (đã chuẩn bị)', 'Test tube (prepared)') + '</div><p class="olab__status" data-st role="status"></p><div data-info></div></div>';
    const lab = $('[data-lab]', a), st = $('[data-st]', lab), v = $('[data-v]', lab), info = $('[data-info]', lab);
    const state = () => CHO.tollensNH3(S.nh3, NEED), clear = () => S.ag && (state() === 'trong' || state() === 'thừa');
    function paint() { const m = S.bath && clear() && S.sample ? CHO.mirror(S.sample, P.T, P.t) : 0, sn = state();
      let svg = O.tube({ level: S.ag ? 0.3 + (S.sample ? 0.08 : 0) : 0, col: S.ag && sn === 'kết tủa' ? '#8d6e63' : '#e0f2fe', heat: false, label: 'Ống nghiệm Tollens / Tollens test tube' });
      svg = svg.replace('</svg>', '<rect x="31" y="40" width="4" height="78" fill="#d1d5db" opacity="' + m.toFixed(2) + '"/><rect x="85" y="40" width="4" height="78" fill="#d1d5db" opacity="' + m.toFixed(2) + '"/><rect x="31" y="100" width="58" height="12" fill="#d1d5db" opacity="' + (m * 0.8).toFixed(2) + '"/></svg>');
      v.innerHTML = svg;
      info.innerHTML = '<p class="olab__hint">' + pr('Trong ống: ' + (S.ag ? 'AgNO₃' : 'chưa có gì') + (S.nh3 ? ' + ' + S.nh3 + ' giọt NH₃' : '') + (S.sample ? ' + ' + (S.sample === 'gluc' ? 'glucose' : 'saccharose') : '') + (S.bath ? ' · đang trong cốc nước nóng' : '') + '.', 'In the tube: ' + (S.ag ? 'AgNO₃' : 'nothing yet') + (S.nh3 ? ' + ' + S.nh3 + ' drops NH₃' : '') + (S.sample ? ' + ' + (S.sample === 'gluc' ? 'glucose' : 'sucrose') : '') + (S.bath ? ' · in the hot-water beaker' : '') + '.') + '</p>' + '<div class="mol__card"><b>' + pr('Tính theo phương trình', 'Stoichiometry') + '</b>: ' + pr(P.g + ' g glucose → ' + f1(CHO.agG(P.g)) + ' g Ag', P.g + ' g of glucose → ' + f1(CHO.agG(P.g)) + ' g of Ag') + ' <small>(' + pr('M glucose 180, Ag 108; 180 g → 216 g', 'M glucose 180, Ag 108; 180 g → 216 g') + ')</small></div>'; return m; }
    const speak = (m) => { if (!S.bath) return;
      if (!S.ag) O.say(st, false, 'Ống còn trống: cần AgNO₃ trước.', 'The tube is empty: AgNO₃ is needed first.');
      else if (state() === 'kết tủa' || state() === 'trống') O.say(st, false, 'Kết tủa chưa tan hết: nhỏ thêm NH₃ từng giọt trước khi thêm glucose.', 'The precipitate has not dissolved: add more NH₃ drop by drop before adding glucose.');
      else if (!S.sample) O.say(st, false, 'Chưa có chất cần thử (glucose hoặc saccharose).', 'No sample to test yet (glucose or sucrose).');
      else if (S.sample === 'sucr') O.say(st, null, 'Saccharose không có phản ứng tráng bạc: thành ống vẫn trong suốt.', 'Sucrose does not give the silver-mirror reaction: the tube wall stays clear.');
      else if (P.T < 70) O.say(st, false, 'Nước chưa đủ nóng (cần khoảng 70–80 °C): chưa thấy lớp bạc.', 'The water is not hot enough (about 70–80 °C needed): no silver layer yet.');
      else if (m < 1) O.say(st, null, 'Lớp bạc đang bám dần lên thành ống… (cần khoảng 5 phút).', 'The silver is gradually coating the wall … (about 5 minutes needed).');
      else O.say(st, true, 'Thành ống sáng như gương: bạc kim loại tạo thành. ' + O.eq(CHO.R.silver) + (state() === 'thừa' ? ' (đã dùng hơi thừa NH₃).' : ''), 'The wall shines like a mirror: metallic silver formed. ' + O.eq(CHO.R.silver) + (state() === 'thừa' ? ' (slightly too much NH₃ was used).' : '')); };
    U.bindCtl(lab, P, () => speak(paint()));
    U.drag(lab, (cid, zid) => {
      if (zid === 'tube' && cid === 'ag') { S.ag = true; paint(); O.say(st, null, 'Đã cho 1 mL AgNO₃ 1% vào ống nghiệm.', '1 mL of 1% AgNO₃ added to the test tube.'); return; }
      if (zid === 'tube' && cid === 'nh3') { if (!S.ag) { O.say(st, false, 'Cho AgNO₃ vào ống trước, rồi mới nhỏ NH₃.', 'Put the AgNO₃ in first, then add NH₃.'); return; } S.nh3++; paint(); const s = state(); O.say(st, s === 'trong' ? true : s === 'thừa' ? false : null, s === 'kết tủa' ? 'Xuất hiện kết tủa nâu; nhỏ tiếp NH₃ và lắc đều.' : s === 'trong' ? '✓ Kết tủa tan hoàn toàn: dừng đúng lúc (dung dịch Tollens).' : 'Thừa NH₃: dư không cần thiết, nên dừng ngay khi kết tủa tan.', s === 'kết tủa' ? 'A brown precipitate appears; keep adding NH₃ and shake.' : s === 'trong' ? '✓ The precipitate has dissolved completely: stopped at the right moment (Tollens reagent).' : 'Excess NH₃: more than needed; stop as soon as the precipitate dissolves.'); return; }
      if (zid === 'tube' && (cid === 'gluc' || cid === 'sucr')) { if (state() === 'kết tủa' || state() === 'trống') { O.say(st, false, 'Chưa thể thả mẫu: phải nhỏ NH₃ đến khi kết tủa tan hoàn toàn.', 'The sample cannot be added yet: add NH₃ until the precipitate dissolves completely.'); return; } S.sample = cid; paint(); O.say(st, null, 'Đã cho 1 mL ' + (cid === 'gluc' ? 'glucose' : 'saccharose') + ' 10% vào ống, lắc đều. Giờ đặt ống vào cốc nước nóng.', '1 mL of 10% ' + (cid === 'gluc' ? 'glucose' : 'sucrose') + ' added and shaken. Now place the tube in the hot water.'); return; }
      if (zid === 'bath' && cid === 'tubechip') { S.bath = true; speak(paint()); return; }
      O.say(st, false, 'Thả hoá chất vào ống nghiệm, thả “Ống nghiệm” vào cốc nước nóng.', 'Drop chemicals into the test tube and the “Test tube” card into the hot-water beaker.'); });
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-reset]')) { S.ag = false; S.nh3 = 0; S.sample = null; S.bath = false; U.setCtl(lab, P, 'T', 75); U.setCtl(lab, P, 't', 5); paint(); O.say(st, null, ''); } });
    paint();
    b.innerHTML = '<div class="olab em" data-lab><p class="olab__hint">' + pr('Cân bằng phương trình (dạng đơn giản và dạng đầy đủ ở chú thích sách).', 'Balance the equation (the simple form and the full form from the book’s footnote).') + '</p><div data-c1></div><div data-c2></div>' + EXT('Chế độ “tráng gương” (kéo vật thuỷ tinh vào ống) là ứng dụng nêu trong sách; ở đây chỉ mô tả bằng lời.', 'The “silvering” mode (dropping a glass object in the tube) is an application named in the book; it is only described in words here.') + NOTE + '</div>';
    const l2 = $('[data-lab]', b); $('[data-c1]', l2).innerHTML = O.coef(ALC.R.silver); $('[data-c2]', l2).innerHTML = O.coef(ALC.R.silverFull); O.coefBind(l2);
    return { state: P };
  }

  /* ------------------------------------------------------------ W29.4 : lên men glucose */
  function glucFerment(body) {
    const P = { g: 180, T: 35 }, S = { p: 0, run: false, t: 0 };
    body.innerHTML = '<div class="olab em" data-lab><p class="olab__hint">' + pr('Kéo thanh khối lượng glucose, chỉnh nhiệt độ rồi bấm Bắt đầu: glucose lên men tạo ethylic alcohol và CO₂.', 'Set the mass of glucose and the temperature, then press Start: glucose ferments to ethylic alcohol and CO₂.') + '</p>' + U.ctl('g', 'Khối lượng glucose', 'Mass of glucose', 0, 360, 10, P.g, ' g') + U.ctl('T', 'Nhiệt độ', 'Temperature', 10, 60, 5, P.T, ' °C') +
      '<div class="olab__btns"><button type="button" class="btn btn--sm btn--primary" data-go>' + pr('Bắt đầu lên men', 'Start fermenting') + '</button><button type="button" class="btn btn--sm" data-reset>' + pr('Đặt lại', 'Reset') + '</button></div><div class="olab__cols"><div data-v></div><div data-res></div></div><p class="olab__status" data-st role="status"></p><div data-co></div>' +
      EXT('Ảnh hưởng của nhiệt độ đến enzyme (hoạt động tốt ở khoảng vừa phải) là phần bổ sung, định tính; sách chỉ nêu “dưới tác dụng của enzyme”.', 'The effect of temperature on the enzyme (works best in a moderate range) is an extra, qualitative; the book only says “under the action of an enzyme”.') + NOTE + '</div>';
    const lab = $('[data-lab]', body), st = $('[data-st]', lab), v = $('[data-v]', lab), res = $('[data-res]', lab);
    $('[data-co]', lab).innerHTML = O.coef(CHO.R.ferment); O.coefBind(lab);
    const act = () => Math.max(0, 1 - Math.pow((P.T - 35) / 25, 2));
    function paint() { const done = S.p >= 1, et = CHO.fermentG(P.g), co = CHO.fermentCO2(P.g);
      v.innerHTML = O.tube({ level: 0.55, col: done ? '#fde68a' : '#fef9c3', bub: S.run ? Math.round(2 + 8 * act()) : 0, t: S.t, label: 'Bình lên men / Fermentation flask' });
      res.innerHTML = '<div class="mol__card"><b>' + pr('Lí thuyết', 'Theoretical') + '</b>: ' + pr(P.g + ' g glucose → ' + f1(et) + ' g C₂H₅OH + ' + f1(co) + ' g CO₂', P.g + ' g glucose → ' + f1(et) + ' g C₂H₅OH + ' + f1(co) + ' g CO₂') + '<br><small>' + pr('Bảo toàn: ' + P.g + ' = ' + f1(et) + ' + ' + f1(co), 'Conservation: ' + P.g + ' = ' + f1(et) + ' + ' + f1(co)) + '</small></div><div class="mol__meter" role="img" aria-label="tiến độ"><i style="width:' + Math.round(clamp(S.p, 0, 1) * 100) + '%"></i></div><small>' + pr('Hoạt tính enzyme (định tính): ' + Math.round(act() * 100) + '%', 'Enzyme activity (qualitative): ' + Math.round(act() * 100) + '%') + '</small>'; }
    const lp = U.loop(lab, (dt) => { if (!S.run) return false; S.t += dt; S.p += dt * 0.25 * act(); if (S.p >= 1) { S.p = 1; S.run = false; paint(); O.say(st, true, 'Lên men xong: ' + O.eq(CHO.R.ferment) + ' — dùng sản xuất bia, rượu (liên hệ Bài 26).', 'Fermentation finished: ' + O.eq(CHO.R.ferment) + ' — used to make beer and wine (see Lesson 26).'); return false; } paint(); return true; });
    U.bindCtl(lab, P, () => { paint(); if (S.run && act() === 0) O.say(st, false, 'Nhiệt độ quá cao/thấp: enzyme gần như không hoạt động.', 'Too hot/cold: the enzyme hardly works.'); });
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-go]')) { if (P.g <= 0) { O.say(st, false, 'Chưa có glucose.', 'No glucose yet.'); return; } if (act() <= 0) { O.say(st, false, 'Nhiệt độ này enzyme không hoạt động; chỉnh về khoảng 25–45 °C.', 'The enzyme is inactive at this temperature; set it to about 25–45 °C.'); return; } S.p = 0; S.run = true; S.t = 0; O.say(st, null, 'Bọt CO₂ nổi lên…', 'CO₂ bubbles rise …'); if (U.REDUCED) { S.p = 1; S.run = false; paint(); } else lp.kick(); paint(); }
      else if (e.target.closest('[data-reset]')) { S.p = 0; S.run = false; paint(); O.say(st, null, ''); } });
    paint(); return { state: P };
  }

  /* ------------------------------------------------------------ W29.5 : thuỷ phân saccharose */
  function sucHyd(body) {
    const P = { g: 342 }, S = { cat: 'none', T: 25, split: false };
    body.innerHTML = '<div class="olab em" data-lab><p class="olab__hint">' + pr('Chọn xúc tác (acid hoặc enzyme), rồi kéo H₂O vào liên kết giữa hai nửa của phân tử saccharose (sơ đồ minh hoạ).', 'Pick a catalyst (acid or enzyme), then drag H₂O onto the link between the two halves of the sucrose molecule (schematic).') + '</p>' +
      '<label class="olab__ctl"><span>' + pr('Xúc tác', 'Catalyst') + '</span><select data-cat><option value="none">' + 'không / none' + '</option><option value="acid">acid (đun nóng) / acid (heated)</option><option value="enzyme">enzyme</option></select></label>' + U.ctl('g', 'Khối lượng saccharose', 'Mass of sucrose', 0, 684, 18, P.g, ' g') +
      '<div class="olab__btns">' + O.chip('h2o', 'H₂O', 'H₂O') + '<button type="button" class="btn btn--sm" data-reset>' + pr('Đặt lại', 'Reset') + '</button><button type="button" class="btn btn--sm" data-toll>' + pr('Thử tráng bạc (mở rộng)', 'Test with Tollens (extension)') + '</button></div>' + O.zone('link', '<div data-svg></div>', 'Liên kết giữa hai nửa phân tử saccharose: thả H₂O vào đây / Link between the two halves of sucrose: drop H₂O here', '') +
      '<p class="olab__status" data-st role="status"></p><div data-res></div><div data-co></div>' + EXT('Thử tráng bạc trước/sau thuỷ phân là phần mở rộng: sau thuỷ phân có glucose nên cho phản ứng tráng bạc.', 'Testing before/after hydrolysis is an extension: afterwards glucose is present, so the silver-mirror test works.') + NOTE + '</div>';
    const lab = $('[data-lab]', body), st = $('[data-st]', lab), svg = $('[data-svg]', lab), res = $('[data-res]', lab);
    $('[data-co]', lab).innerHTML = O.coef(CHO.R.sucHyd); O.coefBind(lab);
    const hex = (cx, cy, r, f) => '<polygon points="' + [0, 1, 2, 3, 4, 5].map((i) => (cx + r * Math.cos(Math.PI / 3 * i)).toFixed(1) + ',' + (cy + r * Math.sin(Math.PI / 3 * i)).toFixed(1)).join(' ') + '" fill="' + f + '" stroke="#374151" stroke-width="2"/>';
    const pen = (cx, cy, r, f) => '<polygon points="' + [0, 1, 2, 3, 4].map((i) => (cx + r * Math.cos(Math.PI * 2 / 5 * i - Math.PI / 2)).toFixed(1) + ',' + (cy + r * Math.sin(Math.PI * 2 / 5 * i - Math.PI / 2)).toFixed(1)).join(' ') + '" fill="' + f + '" stroke="#374151" stroke-width="2"/>';
    const txt = (x, y, s, c) => '<text x="' + x + '" y="' + y + '" text-anchor="middle" style="font-size:12px" font-weight="700" fill="' + (c || '#111827') + '">' + s + '</text>';
    function draw() { svg.innerHTML = '<svg viewBox="0 0 360 130" class="mol__board" role="img" aria-label="' + (S.split ? 'Glucose và fructose / Glucose and fructose' : 'Phân tử saccharose / Sucrose molecule') + '">' + (S.split
      ? hex(90, 60, 38, '#bfdbfe') + txt(90, 64, 'glucose') + txt(90, 112, 'C₆H₁₂O₆') + pen(270, 60, 38, '#fed7aa') + txt(270, 64, 'fructose') + txt(270, 112, 'C₆H₁₂O₆') + txt(180, 64, '+', '#6b7280') + txt(180, 84, 'cùng công thức, khác cấu tạo', '#6b7280')
      : hex(100, 60, 38, '#bfdbfe') + txt(100, 64, 'glucose') + '<line x1="138" y1="60" x2="172" y2="60" stroke="#374151" stroke-width="3"/><circle cx="180" cy="60" r="9" fill="#ef4444"/>' + txt(180, 64, 'O', '#fff') + '<line x1="189" y1="60" x2="222" y2="60" stroke="#374151" stroke-width="3"/>' + pen(260, 60, 38, '#fed7aa') + txt(260, 64, 'fructose') + txt(180, 116, 'C₁₂H₂₂O₁₁ — sơ đồ minh hoạ', '#6b7280')) + '</svg>'; }
    function paintRes() { const r = CHO.sucHydG(P.g); res.innerHTML = '<div class="mol__card"><b>' + pr('Tính theo phương trình', 'Stoichiometry') + '</b>: ' + pr(P.g + ' g saccharose + ' + f1(r.water) + ' g H₂O → ' + f1(r.glucose) + ' g glucose + ' + f1(r.fructose) + ' g fructose', P.g + ' g sucrose + ' + f1(r.water) + ' g H₂O → ' + f1(r.glucose) + ' g glucose + ' + f1(r.fructose) + ' g fructose') + '<br><small>' + pr('342 + 18 = 180 + 180', '342 + 18 = 180 + 180') + '</small></div>'; }
    U.bindCtl(lab, P, paintRes);
    lab.addEventListener('change', (e) => { if (e.target.matches('[data-cat]')) S.cat = e.target.value; });
    U.drag(lab, () => { if (S.cat === 'none') { O.say(st, false, 'Cần xúc tác: acid (đun nóng) hoặc enzyme.', 'A catalyst is needed: acid (heated) or enzyme.'); return; } S.split = true; draw(); O.say(st, true, 'Nước cắt liên kết giữa hai nửa: ' + O.eq(CHO.R.sucHyd) + ' (hệ số 2 = 1 glucose + 1 fructose).', 'Water cuts the link between the halves: ' + O.eq(CHO.R.sucHyd) + ' (coefficient 2 = 1 glucose + 1 fructose).'); });
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-reset]')) { S.split = false; draw(); O.say(st, null, ''); } else if (e.target.closest('[data-toll]')) { O.say(st, S.split ? true : null, S.split ? 'Sau thuỷ phân: có glucose nên dung dịch cho phản ứng tráng bạc (mở rộng).' : 'Trước thuỷ phân: saccharose không tráng bạc.', S.split ? 'After hydrolysis glucose is present, so the solution gives the silver-mirror test (extension).' : 'Before hydrolysis: sucrose does not give the silver-mirror test.'); } });
    draw(); paintRes(); return { state: P };
  }

  /* ------------------------------------------------------------ W29.6 : vai trò và ứng dụng */
  function carbUse(body) {
    const [a, b, c] = U.wrap(body, 3);
    const AP = [['gương soi', 'mirror', 'glu', 'sil'], ['rượu vang', 'wine', 'glu', 'fer'], ['dịch truyền glucose', 'glucose drip', 'glu', 'en'], ['nước trái cây', 'fruit juice', 'suc', 'sw'], ['bánh kẹo', 'sweets', 'suc', 'sw']];
    EL.sorter(a, { hint: ['Kéo ứng dụng vào cột glucose hoặc saccharose (Hình 29.3).', 'Drag each use to glucose or sucrose (Figure 29.3).'], boxes: [{ id: 'glu', vi: 'Glucose', en: 'Glucose' }, { id: 'suc', vi: 'Saccharose', en: 'Sucrose' }], items: AP.map((x, i) => ({ id: 'a' + i, vi: x[0], en: x[1], to: [x[2]] })) });
    EL.sorter(b, { hint: ['Nối từng ứng dụng với tính chất tương ứng.', 'Link each use with its property.'], boxes: [{ id: 'sil', vi: 'Phản ứng tráng bạc', en: 'Silver-mirror reaction' }, { id: 'fer', vi: 'Lên men rượu', en: 'Alcoholic fermentation' }, { id: 'en', vi: 'Cung cấp năng lượng', en: 'Gives energy' }, { id: 'sw', vi: 'Vị ngọt (chất tạo ngọt)', en: 'Sweet taste (sweetener)' }], items: AP.map((x, i) => ({ id: 'b' + i, vi: x[0], en: x[1], to: [x[3]] })) });
    EL.sorter(c, { hint: ['Kéo từng ý vào ô thông tin: lợi ích hoặc nguy cơ khi tiêu thụ quá nhiều đường lâu dài.', 'Drag each point into benefit or risk of eating too much sugar for a long time.'], boxes: [{ id: 'ben', vi: 'Vai trò / lợi ích', en: 'Role / benefit' }, { id: 'risk', vi: 'Nguy cơ nếu dùng quá nhiều', en: 'Risk if overused' }],
      items: [['cung cấp năng lượng cho tế bào', 'gives energy to cells', 'ben'], ['nguyên liệu công nghiệp thực phẩm', 'raw material of the food industry', 'ben'], ['béo phì', 'obesity', 'risk'], ['tiểu đường', 'diabetes', 'risk'], ['bệnh tim mạch', 'heart disease', 'risk']].map((x, i) => ({ id: 'c' + i, vi: x[0], en: x[1], to: [x[2]] })),
      note: ['Glucose là nguồn năng lượng chính của tế bào; saccharose dùng nhiều trong bánh kẹo, đồ uống. Tiêu thụ quá nhiều glucose, saccharose trong thời gian dài có nguy cơ béo phì, tiểu đường, tim mạch… (kiến thức chung, không có số liệu).', 'Glucose is the main energy source of cells; sucrose is widely used in sweets and drinks. Eating too much glucose or sucrose for a long time risks obesity, diabetes and heart disease … (general knowledge, no figures).'] });
    return {};
  }
  const sims = {
    'carb-formula': { fn: carbFormula, vi: 'Công thức Cₙ(H₂O)ₘ của carbohydrate (Hình 29.1)', en: 'The Cₙ(H₂O)ₘ formula of carbohydrates (Figure 29.1)', intro: 'Kéo chất vào ô; thử thanh trượt n, m.' },
    'sugar-phys': { fn: sugarPhys, vi: 'So sánh tính chất vật lí của glucose và saccharose (Hình 29.2)', en: 'Comparing glucose and sucrose (Figure 29.2)', intro: 'Thanh thể tích; kéo thìa đường vào cốc.' },
    tollens: { fn: tollens, vi: 'Thí nghiệm tráng bạc của glucose', en: 'The silver-mirror test of glucose', intro: 'Kéo hoá chất vào ống nghiệm theo thứ tự.' },
    'gluc-ferment': { fn: glucFerment, vi: 'Lên men rượu của glucose', en: 'Alcoholic fermentation of glucose', intro: 'Chỉnh glucose và nhiệt độ rồi bắt đầu.' },
    'suc-hyd': { fn: sucHyd, vi: 'Thuỷ phân saccharose', en: 'Hydrolysis of sucrose', intro: 'Chọn xúc tác, kéo H₂O vào liên kết.' },
    'carb-use': { fn: carbUse, vi: 'Vai trò và ứng dụng của glucose, saccharose (Hình 29.3)', en: 'Roles and uses of glucose and sucrose (Figure 29.3)', intro: 'Kéo thẻ vào ô.' }
  };
  window.LabSims = Object.assign(window.LabSims || {}, sims);
})();
