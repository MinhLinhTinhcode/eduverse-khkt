/* ==========================================================================
   MOL W33 — widget Bài 33 "Sơ lược về hoá học vỏ Trái Đất và khai thác tài nguyên". Nạp SAU mol-w32.js và earth-lab.js.
   earth-chart (W33.1, trọng tâm) · earth-remark · crust-section (W33.2) · res-sort (W33.5) · rock-test (W33.3) · crust-forms (W33.4) · sustain (W33.5)
   Số liệu từ EarthLab.engine (Bảng 33.1, CRC Handbook 97th ed.). Nhãn “bổ sung/mở rộng”: thử đá bằng HCl, mô hình cân bằng khai thác (KHÔNG phải số liệu thực), hậu quả khai thác cát theo hiểu biết chung.
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab, ML = window.MolLab, EL = window.EnergyLab;
  if (!L || !ML || !ML.org || !EL || !window.EarthLab || !ML.org28) return;
  const { pr, fmt } = L, U = ML.ui, O = ML.org, { $, $$ } = U, EE = window.EarthLab.engine, EX = ML.org28.EXT;
  const COLS = ['#2563eb', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#84cc16', '#9ca3af'];
  const comma = (x, d) => fmt(x, d == null ? 2 : d);

  /* ------------------------------------------------------------ W33.1 : biểu đồ thành phần vỏ Trái Đất */
  function earthChart(body) {
    const P = {}; EE.EL.forEach((x) => (P[x.sym] = 0));
    body.innerHTML = '<div class="olab em" data-lab><p class="olab__hint">' + pr('Bảng 33.1: kéo thanh trượt (hoặc nhập số) cho từng nguyên tố để dựng biểu đồ tròn và biểu đồ cột; bấm “Chấm” để so với số liệu của sách (sai số cho phép ±1 điểm phần trăm).', 'Table 33.1: move each element’s slider (or type a number) to build the pie and bar charts; press “Check” to compare with the book’s data (±1 percentage point allowed).') + '</p><div data-sl>' + EE.EL.map((x) => U.ctl(x.sym, x.sym + ' (' + x.name + ')', x.sym + ' (' + x.name + ')', 0, 60, 0.05, 0, ' %')).join('') + '</div><div class="olab__btns"><button type="button" class="btn btn--sm btn--primary" data-chk>' + pr('Chấm', 'Check') + '</button><button type="button" class="btn btn--sm" data-ans>' + pr('Hiện số liệu sách', 'Show the book’s data') + '</button><button type="button" class="btn btn--sm" data-reset>' + pr('Đặt lại', 'Reset') + '</button></div><div class="olab__cols"><div data-pie></div><div data-bar></div></div><p data-sum></p><p class="olab__status" data-st role="status"></p>' + EX('Nhận xét: kéo thẻ đúng/sai ở bài “Nhận xét về hàm lượng”. Giá trị đọc từ bản scan Bảng 33.1; các nguyên tố khác = 100 − tổng.', 'Remarks: drag the true/false cards in the “Remarks on abundance” task. Values read from the scan of Table 33.1; other elements = 100 − sum.') + '</div>';
    const lab = $('[data-lab]', body), st = $('[data-st]', lab);
    const paint = () => {
      const pie = EE.pie(P); let s = '<svg viewBox="0 0 200 200" class="mol__board" role="img" aria-label="' + pr('Biểu đồ tròn thành phần các nguyên tố', 'Pie chart of the elements').replace(/<[^>]+>/g, ' ') + '" style="max-width:260px">';
      pie.forEach((q, i) => { if (q.v <= 0 || q.a1 - q.a0 < 0.01) return; const r = 85, c = 100, f = (a) => [c + r * Math.sin(a * Math.PI / 180), c - r * Math.cos(a * Math.PI / 180)], p0 = f(q.a0), p1 = f(Math.min(q.a1, q.a0 + 359.99)); s += '<path d="M100 100 L' + p0[0].toFixed(1) + ' ' + p0[1].toFixed(1) + ' A85 85 0 ' + ((q.a1 - q.a0) > 180 ? 1 : 0) + ' 1 ' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1) + ' Z" fill="' + COLS[i] + '" stroke="#fff" stroke-width="1.5"><title>' + q.sym + ' ' + comma(q.v) + ' %</title></path>'; });
      $('[data-pie]', lab).innerHTML = s + '</svg><small>' + pie.filter((q) => q.v > 0).map((q) => '<span style="color:' + COLS[pie.indexOf(q)] + '">■</span> ' + q.sym + ' ' + comma(q.v)).join(' · ') + '</small>';
      let b = '<svg viewBox="0 0 280 200" class="mol__board" role="img" aria-label="' + pr('Biểu đồ cột thành phần các nguyên tố', 'Bar chart of the elements').replace(/<[^>]+>/g, ' ') + '" style="max-width:340px">';
      EE.EL.forEach((x, i) => { const h = Math.min(60, P[x.sym]) / 60 * 150; b += '<rect x="' + (14 + i * 32) + '" y="' + (170 - h) + '" width="24" height="' + h + '" fill="' + COLS[i] + '"/><text x="' + (26 + i * 32) + '" y="186" text-anchor="middle" style="font:700 11px system-ui">' + x.sym + '</text><text x="' + (26 + i * 32) + '" y="' + (166 - h) + '" text-anchor="middle" style="font:10px system-ui">' + comma(P[x.sym], 1) + '</text>'; });
      $('[data-bar]', lab).innerHTML = b + '</svg>';
      const sum = EE.EL.reduce((a, x) => a + P[x.sym], 0); $('[data-sum]', lab).innerHTML = pr('Tổng 8 nguyên tố: ' + comma(sum) + ' % · các nguyên tố khác: ' + comma(Math.max(0, 100 - sum)) + ' %', 'Sum of the 8 elements: ' + comma(sum) + ' % · other elements: ' + comma(Math.max(0, 100 - sum)) + ' %');
    };
    U.bindCtl(lab, P, paint);
    lab.addEventListener('click', (e) => {
      if (e.target.closest('[data-chk]')) { const g = EE.grade(P, 1); O.say(st, g.ok, g.ok ? '✓ Đúng! O và Si chiếm ' + comma(EE.of('O') + EE.of('Si')) + ' %; tổng 8 nguyên tố = ' + comma(EE.total()) + ' %, còn lại ' + comma(EE.other()) + ' %.' : 'Chưa khớp ở: ' + g.bad.join(', ') + '. Xem lại Bảng 33.1.', g.ok ? '✓ Correct! O and Si make up ' + comma(EE.of('O') + EE.of('Si')) + ' %; the 8 elements total ' + comma(EE.total()) + ' %, leaving ' + comma(EE.other()) + ' %.' : 'Not matching for: ' + g.bad.join(', ') + '. Look at Table 33.1 again.'); }
      else if (e.target.closest('[data-ans]')) { EE.EL.forEach((x) => U.setCtl(lab, P, x.sym, x.pct)); paint(); O.say(st, null, 'Đây là số liệu Bảng 33.1.', 'These are the values of Table 33.1.'); }
      else if (e.target.closest('[data-reset]')) { EE.EL.forEach((x) => U.setCtl(lab, P, x.sym, 0)); paint(); O.say(st, null, ''); }
    });
    paint(); return { state: P };
  }
  function earthRemark(body) {
    const IT = [['Oxygen và silicon chiếm hơn 74 % khối lượng vỏ Trái Đất', 'ok'], ['Oxygen là nguyên tố có hàm lượng lớn nhất', 'ok'], ['Nhôm nhiều hơn sắt', 'ok'], ['Kali nhiều hơn natri', 'no'], ['Magnesium nhiều hơn natri', 'no'], ['Calcium nhiều hơn nhôm', 'no'], ['Tám nguyên tố này chiếm tổng cộng khoảng 99,09 %', 'ok'], ['Các nguyên tố còn lại chiếm khoảng 0,91 %', 'ok'], ['Silicon chiếm ít hơn sắt', 'no']];
    EL.sorter(body, { hint: ['Đọc biểu đồ và nhận xét: kéo từng nhận xét vào Đúng hoặc Sai (theo Bảng 33.1).', 'Read the chart and comment: drag each remark to True or False (using Table 33.1).'], boxes: [{ id: 'ok', vi: 'Đúng', en: 'True' }, { id: 'no', vi: 'Sai', en: 'False' }], items: IT.map((x, i) => ({ id: 'q' + i, vi: x[0], en: x[0], to: [x[1]] })), note: ['Số liệu: O 46,10; Si 28,20; Al 8,23; Fe 5,63; Ca 4,15; Na 2,36; K 2,09; Mg 2,33.', 'Data: O 46.10; Si 28.20; Al 8.23; Fe 5.63; Ca 4.15; Na 2.36; K 2.09; Mg 2.33.'] });
    return {};
  }

  /* ------------------------------------------------------------ W33.2 : mặt cắt vỏ Trái Đất */
  function crustSection(body) {
    const P = { d: 5 }, S = { k: 'land' };
    body.innerHTML = '<div class="olab em" data-lab><p class="olab__hint">' + pr('Kéo “Vỏ lục địa” hoặc “Vỏ dưới đáy đại dương” vào mặt cắt, rồi kéo thanh trượt độ sâu của mũi khoan: vỏ Trái Đất dày trung bình khoảng 35 km (lục địa) và 7 km (đáy đại dương).', 'Drag “Continental crust” or “Crust under the ocean floor” onto the section, then move the drill-depth slider: the Earth’s crust averages about 35 km (continents) and 7 km (ocean floor).') + '</p>' + U.ctl('d', 'Độ sâu mũi khoan', 'Drill depth', 0, 40, 1, P.d, ' km') + '<div class="olab__btns">' + O.chip('land', 'Vỏ lục địa', 'Continental crust') + O.chip('sea', 'Vỏ dưới đáy đại dương', 'Crust under the ocean floor') + '</div>' + O.zone('sec', '<div data-svg></div>', 'Mặt cắt: thả loại vỏ / Section: drop a crust type', '') + '<p class="olab__status" data-st role="status"></p>' + EX('Sơ đồ không đúng tỉ lệ; sách chỉ nêu vỏ Trái Đất là phần cứng (đất, đá) ngoài cùng và bề dày trung bình 7 km / 35 km (CRC Handbook, 97th ed.). Phần dưới vỏ không thuộc nội dung bài.', 'Not to scale; the book only says the crust is the outer hard part (soil, rock) with an average thickness of 7 km / 35 km (CRC Handbook, 97th ed.). What lies below the crust is outside this lesson.') + '</div>';
    const lab = $('[data-lab]', body), st = $('[data-st]', lab), svg = $('[data-svg]', lab);
    const paint = () => { const th = S.k === 'land' ? 35 : 7, pxk = 3.6, h = th * pxk, dd = Math.min(P.d, 40); let s = '<svg viewBox="0 0 300 190" class="mol__board" role="img" aria-label="' + pr('Mặt cắt vỏ Trái Đất', 'Cross-section of the crust').replace(/<[^>]+>/g, ' ') + '">' + (S.k === 'sea' ? '<rect x="0" y="0" width="300" height="20" fill="#93c5fd"/><text x="8" y="14" style="font:11px system-ui">nước biển</text>' : '');
      s += '<rect x="30" y="20" width="240" height="' + h + '" fill="#d6c0a0" stroke="#374151" stroke-width="2"/><rect x="30" y="' + (20 + h) + '" width="240" height="' + (190 - 20 - h) + '" fill="#fca5a5" opacity=".5"/><text x="150" y="' + (20 + h / 2) + '" text-anchor="middle" style="font:700 12px system-ui">' + pr('Vỏ Trái Đất (đất, đá)', 'Earth’s crust (soil, rock)').replace(/<[^>]+>/g, '') + ' ≈ ' + th + ' km</text>';
      s += '<line x1="150" y1="14" x2="150" y2="' + (20 + dd * pxk) + '" stroke="#dc2626" stroke-width="4"/><polygon points="144,' + (20 + dd * pxk) + ' 156,' + (20 + dd * pxk) + ' 150,' + (28 + dd * pxk) + '" fill="#dc2626"/>';
      svg.innerHTML = s + '</svg>'; const inside = P.d <= th; O.say(st, inside ? null : false, inside ? 'Mũi khoan ở độ sâu ' + P.d + ' km, còn trong lớp vỏ (dày khoảng ' + th + ' km).' : 'Độ sâu ' + P.d + ' km đã vượt bề dày trung bình của vỏ (' + th + ' km).', inside ? 'The drill is at ' + P.d + ' km, still inside the crust (about ' + th + ' km thick).' : P.d + ' km is deeper than the average crust thickness (' + th + ' km).'); };
    U.bindCtl(lab, P, paint); U.drag(lab, (cid) => { S.k = cid; paint(); });
    paint(); return { state: P };
  }
  function resSort(body) {
    EL.sorter(body, { hint: ['Mục III: kéo từng tài nguyên khai thác từ vỏ Trái Đất vào nhóm sản phẩm/ứng dụng.', 'Section III: drag each resource taken from the crust to its group of products or uses.'], boxes: [{ id: 'fuel', vi: 'Nhiên liệu (mỏ dầu, mỏ than, mỏ khí thiên nhiên)', en: 'Fuels (oil, coal and natural gas fields)' }, { id: 'metal', vi: 'Kim loại, hợp kim (quặng giàu nhôm, sắt, đồng…)', en: 'Metals and alloys (ores rich in Al, Fe, Cu …)' }, { id: 'chem', vi: 'Hoá chất, phân bón (S, P, N)', en: 'Chemicals and fertilisers (S, P, N)' }, { id: 'build', vi: 'Vật liệu xây dựng, công nghiệp silicate', en: 'Building materials, silicate industry' }],
      items: EE.RES.map((r) => ({ id: r.id, vi: r.vi, en: r.en, to: [r.to] })), note: ['Cát là phần tìm hiểu của hoạt động trong sách (thành phần SiO₂); ở đây xếp vào vật liệu xây dựng theo hiểu biết chung.', 'Sand is part of the book’s research activity (composition SiO₂); here it is put under building materials from general knowledge.'] });
    return {};
  }

  /* ------------------------------------------------------------ W33.3 : phân loại đá và thử đá */
  function rockTest(body) {
    const [a, b] = U.wrap(body, 2), S = { done: {} }, ks = ['quartz', 'dolomite', 'granite', 'marble', 'limestone'];
    a.innerHTML = '<div class="olab em" data-lab><p class="olab__hint">' + pr('Hình 33.1 (vẽ lại): kéo ống nhỏ giọt HCl vào từng viên đá. Carbonate sủi bọt khí CO₂; SiO₂ và muối silicate thì không.', 'Figure 33.1 (redrawn): drag the HCl dropper onto each rock. Carbonates fizz and give off CO₂; SiO₂ and silicates do not.') + '</p><div class="olab__btns">' + O.chip('hcl', 'Ống nhỏ giọt HCl', 'HCl dropper') + '<button type="button" class="btn btn--sm" data-reset>' + pr('Đặt lại', 'Reset') + '</button></div><div class="olab__cols">' + ks.map((k) => O.zone(k, '<svg viewBox="0 0 70 50" width="64" aria-hidden="true"><path d="M8 40 L16 14 L40 8 L62 22 L56 42 Z" fill="' + (EE.ROCKS[k].carb ? '#e5e7eb' : '#d6d3d1') + '" stroke="#374151" stroke-width="2"/></svg><br><b>' + pr(EE.ROCKS[k].vi, EE.ROCKS[k].en) + '</b><br><small>' + EE.ROCKS[k].comp + '</small><div data-r></div>', EE.ROCKS[k].en, '')).join('') + '</div><p class="olab__status" data-st role="status"></p>' + EX('Thử đá bằng HCl là phần bổ sung (liên quan đến Bài 34); đá vôi thêm vào để so sánh. Hình đá do nhóm dự án vẽ lại, không chép từ sách. Hoá chất chỉ minh hoạ.', 'Testing rocks with HCl is an extra (related to Lesson 34); limestone is added for comparison. The rock pictures are redrawn by the project team, not copied from the book. Chemicals are illustrations only.') + ML.NOTE(ML.org28.SAFE2) + '</div>';
    const lab = $('[data-lab]', a), st = $('[data-st]', lab);
    U.drag(lab, (cid, zid) => { S.done[zid] = 1; const r = EE.acid(zid), z = $('[data-drop="' + zid + '"]', lab); const box = z.querySelector('[data-r]'); box.innerHTML = r.fizz ? '<small>💧 sủi bọt ↑CO₂</small>' : '<small>— không sủi bọt</small>';
      O.say(st, r.fizz ? true : null, EE.ROCKS[zid].vi + (r.fizz ? ': sủi bọt, giải phóng khí CO₂ ⇒ có muối carbonate.' : ': không sủi bọt ⇒ không phải carbonate (SiO₂ hoặc muối silicate).'), EE.ROCKS[zid].en + (r.fizz ? ': it fizzes and gives off CO₂ ⇒ it contains a carbonate.' : ': no fizzing ⇒ not a carbonate (SiO₂ or a silicate).')); });
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-reset]')) { $$('[data-r]', lab).forEach((x) => (x.innerHTML = '')); O.say(st, null, ''); } });
    const IT = ks.filter((k) => !EE.ROCKS[k].ext).concat(['limestone']).map((k) => ({ id: k, vi: EE.ROCKS[k].vi + ' — ' + EE.ROCKS[k].comp, en: EE.ROCKS[k].en + ' — ' + EE.ROCKS[k].comp, to: [EE.ROCKS[k].cls] }));
    EL.sorter(b, { hint: ['Hoạt động 2: các chất trong thành phần chính của đá thuộc loại hợp chất nào? Kéo đá vào oxide, muối silicate hoặc muối carbonate.', 'Task 2: which kind of compound are the main substances of these rocks? Drag each rock to oxide, silicate salt or carbonate salt.'], boxes: [{ id: 'oxide', vi: 'Oxide', en: 'Oxide' }, { id: 'silicate', vi: 'Muối silicate', en: 'Silicate salt' }, { id: 'carbonate', vi: 'Muối carbonate', en: 'Carbonate salt' }], items: IT, note: ['Câu 1: các loại đá này tạo thành chủ yếu từ O, Si, Ca, Mg, C, Al, Na, K…', 'Question 1: these rocks are made mainly of O, Si, Ca, Mg, C, Al, Na, K …'] });
    return {};
  }
  function crustForms(body) {
    const IT = [['SiO₂', 'oxide'], ['Al₂O₃', 'oxide'], ['cát trắng, thạch anh (SiO₂)', 'oxide'], ['quặng bauxite (nhiều Al₂O₃)', 'oxide'], ['mica, feldspar, đá hoa cương', 'silicate'], ['CaCO₃', 'carbonate'], ['MgCO₃', 'carbonate'], ['CaCO₃·MgCO₃ (dolomite)', 'carbonate'], ['đá vôi, đá phấn, đá cẩm thạch', 'carbonate']];
    EL.sorter(body, { hint: ['Mục II: kéo từng chất hoặc ví dụ vào oxide, muối silicate hoặc muối carbonate.', 'Section II: drag each substance or example to oxide, silicate salt or carbonate salt.'], boxes: [{ id: 'oxide', vi: 'Oxide', en: 'Oxides' }, { id: 'silicate', vi: 'Muối silicate', en: 'Silicate salts' }, { id: 'carbonate', vi: 'Muối carbonate', en: 'Carbonate salts' }], items: IT.map((x, i) => ({ id: 'c' + i, vi: x[0], en: x[0], to: [x[1]] })), note: ['Thành phần chủ yếu của khoáng chất là oxide và muối.', 'The main components of the minerals are oxides and salts.'] });
    return {};
  }

  /* ------------------------------------------------------------ W33.5 : khai thác – bảo vệ */
  function sustain(body) {
    const P = { rate: 70, rec: 20, sav: 20 };
    body.innerHTML = '<div class="olab em" data-lab><p class="olab__hint">' + pr('Mô hình giáo dục (không phải số liệu thực): chỉnh tốc độ khai thác, tái chế và tiết kiệm để xem chỉ số định tính “trữ lượng còn lại” và “chất thải/ô nhiễm”.', 'A teaching model (not real data): change the extraction rate, recycling and saving to see the qualitative indices “remaining reserve” and “waste / pollution”.') + '</p>' + U.ctl('rate', 'Tốc độ khai thác', 'Extraction rate', 0, 100, 5, P.rate, '') + U.ctl('rec', 'Sử dụng vật liệu tái chế', 'Use of recycled material', 0, 100, 5, P.rec, '') + U.ctl('sav', 'Tiết kiệm nguyên liệu, nhiên liệu', 'Saving raw materials and fuel', 0, 100, 5, P.sav, '') +
      '<div>' + pr('Trữ lượng còn lại', 'Remaining reserve') + '<div class="mol__meter" role="img" aria-label="reserve"><i data-r style="width:0"></i></div>' + pr('Chất thải / ô nhiễm', 'Waste / pollution') + '<div class="mol__meter" role="img" aria-label="waste"><i data-w style="width:0;background:#dc2626"></i></div></div><p class="olab__status" data-st role="status"></p>' +
      '<div class="olab__btns"><button type="button" class="btn btn--sm" data-sand>' + pr('Tình huống: khai thác cát trái phép', 'Scenario: illegal sand mining') + '</button></div><div data-sandinfo></div>' +
      EX('Các chỉ số 0–100 chỉ để so sánh xu hướng, không phải số liệu thực tế. Hậu quả của khai thác cát trái phép nêu theo hiểu biết chung (sách chỉ đặt câu hỏi).', 'The 0–100 indices only compare trends and are not real data. The consequences of illegal sand mining are from general knowledge (the book only poses the question).') + '</div>';
    const lab = $('[data-lab]', body), st = $('[data-st]', lab);
    const paint = () => { const r = EE.balance(P.rate, P.rec, P.sav); $('[data-r]', lab).style.width = r.reserve + '%'; $('[data-w]', lab).style.width = r.waste + '%'; O.say(st, r.label === 'bền vững hơn' ? true : r.label === 'cạn kiệt nhanh' ? false : null, 'Trữ lượng ' + r.reserve + ', chất thải ' + r.waste + ': ' + r.label + '. Khai thác ít hơn, tái chế và tiết kiệm nhiều hơn giúp phát triển bền vững.', 'Reserve ' + r.reserve + ', waste ' + r.waste + ': ' + ({ 'bền vững hơn': 'more sustainable', 'cạn kiệt nhanh': 'running out fast', 'cần điều chỉnh': 'needs adjusting' }[r.label]) + '. Mining less and recycling and saving more supports sustainable development.'); };
    U.bindCtl(lab, P, paint);
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-sand]')) $('[data-sandinfo]', lab).innerHTML = '<div class="mol__card"><b>' + pr('Cát (chủ yếu SiO₂) dùng làm vật liệu xây dựng, thuỷ tinh…', 'Sand (mainly SiO₂) is used for building, glass …') + '</b><ul><li>' + pr('Khai thác trái phép ở lòng sông, bãi biển có thể làm sạt lở bờ, thay đổi dòng chảy, hại sinh vật.', 'Illegal mining in river beds and on beaches can cause bank erosion, change the flow and harm living things.') + '</li><li>' + pr('Cát là tài nguyên hữu hạn: cần khai thác có kiểm soát, tiết kiệm và tái sử dụng vật liệu.', 'Sand is a limited resource: mine it under control, save it and reuse materials.') + '</li></ul></div>'; });
    paint(); return { state: P };
  }

  window.LabSims = Object.assign(window.LabSims || {}, {
    'earth-chart': { fn: earthChart, vi: 'Dựng biểu đồ thành phần vỏ Trái Đất (Bảng 33.1)', en: 'Building charts of the Earth’s crust (Table 33.1)', intro: 'Kéo thanh trượt để dựng biểu đồ tròn, cột.' },
    'earth-remark': { fn: earthRemark, vi: 'Nhận xét về hàm lượng các nguyên tố', en: 'Remarks on the abundance of elements', intro: 'Kéo nhận xét vào Đúng hoặc Sai.' },
    'crust-section': { fn: crustSection, vi: 'Mặt cắt vỏ Trái Đất', en: 'Cross-section of the Earth’s crust', intro: 'Chọn loại vỏ và kéo độ sâu mũi khoan.' },
    'res-sort': { fn: resSort, vi: 'Tài nguyên → sản phẩm', en: 'Resource → product', intro: 'Kéo tài nguyên vào nhóm sản phẩm.' },
    'rock-test': { fn: rockTest, vi: 'Phân loại đá và thử đá (Hình 33.1)', en: 'Classifying and testing rocks (Figure 33.1)', intro: 'Kéo HCl vào đá; phân loại hợp chất.' },
    'crust-forms': { fn: crustForms, vi: 'Các dạng chất chủ yếu trong vỏ Trái Đất', en: 'The main kinds of substance in the crust', intro: 'Kéo chất vào oxide hoặc muối.' },
    sustain: { fn: sustain, vi: 'Cân bằng khai thác – bảo vệ tài nguyên', en: 'Balancing extraction and protection of resources', intro: 'Chỉnh ba thanh trượt.' }
  });
})();
