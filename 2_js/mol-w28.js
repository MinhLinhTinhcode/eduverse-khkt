/* ==========================================================================
   MOL W28 — widget Bài 28 "Lipid" (Chương IX). Nạp SAU mol-w27.js (dùng MolLab.org, ChemLab.engine.CHO).
   lipid-sort (W28.1) · fat-build (W28.2, trọng tâm) · saponify (W28.3, trọng tâm) · fat-use (W28.4) · lipid-role (W28.5)
   Công thức, M, khối lượng xà phòng/glycerol do ChemLab.engine.CHO tính (tristearin 890 → 918 + 92). Hiệu ứng chỉ minh hoạ.
   Mục “mở rộng/bổ sung” (tên acid béo, dầu lỏng–mỡ rắn theo số C=C) ngoài sách đều có nhãn. Giọng giáo dục sức khoẻ, không đưa chế độ ăn.
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab, ML = window.MolLab, EL = window.EnergyLab, CL = window.ChemLab;
  if (!L || !ML || !ML.org || !EL || !CL || !CL.engine.CHO) return;
  const { pr, fmt, clamp } = L, U = ML.ui, O = ML.org, { $, $$ } = U, E = CL.engine, ALC = E.ALC, CHO = E.CHO, uni = E.uni;
  Object.keys(CHO.R).forEach((k) => { if (!ALC.R[k]) ALC.R[k] = CHO.R[k]; });          // để O.coefBind chấm được các phản ứng mới
  const NOTE = ML.NOTE(ML.SAFE), EXT = (vi, en) => '<small class="olab__hint">(' + pr(vi, en) + ')</small>', f1 = (x) => fmt(x, 1);
  const SAFE2 = ['Hoá chất (NaOH, benzene…) và đun nóng chỉ mang tính minh hoạ: không tự thực hiện ở nhà; thí nghiệm thật cần giáo viên và dụng cụ bảo hộ.', 'Chemicals (NaOH, benzene …) and heating are illustrations only: do not try this at home; real experiments need a teacher and protective equipment.'];
  const wait = (body) => { const w = U.wrap(body, 1); return w; };
  window.MolLab.org28 = { EXT, SAFE2 };

  /* ------------------------------------------------------------ W28.1 : phân loại lipid + tính tan */
  const SOL = { oil: ['Dầu ăn', 'Cooking oil', { water: 0, petrol: 1, benzene: 1 }], fat: ['Mỡ lợn', 'Pork fat', { water: 0, petrol: 1, benzene: 1 }], sugar: ['Đường', 'Sugar', { water: 1, petrol: 0, benzene: 0 }], salt: ['Muối ăn', 'Table salt', { water: 1, petrol: 0, benzene: 0 }] };
  function lipidSort(body) {
    const [a, b] = U.wrap(body, 2);
    EL.sorter(a, { hint: ['Kéo từng thẻ vào ô chất béo, sáp hoặc không phải lipid (Hình 28.1).', 'Drag each card into fats, waxes or not lipids (Figure 28.1).'],
      boxes: [{ id: 'fat', vi: 'Chất béo', en: 'Fats' }, { id: 'wax', vi: 'Sáp', en: 'Waxes' }, { id: 'no', vi: 'Không phải lipid', en: 'Not lipids' }],
      items: [['dầu thực vật', 'vegetable oil', 'fat'], ['mỡ động vật', 'animal fat', 'fat'], ['bơ', 'butter', 'fat'], ['dầu cá', 'fish oil', 'fat'], ['vỏ quả bơ (lớp sáp)', 'avocado skin (wax layer)', 'wax'], ['bề mặt lá cọ (lớp sáp)', 'palm-leaf surface (wax layer)', 'wax'], ['nước', 'water', 'no'], ['đường', 'sugar', 'no'], ['muối ăn', 'table salt', 'no'], ['xăng', 'petrol', 'no']].map((x, i) => ({ id: 'l' + i, vi: x[0], en: x[1], to: [x[2]] })),
      note: ['Lipid: hợp chất hữu cơ có trong tế bào sống, không tan trong nước, tan được trong một số dung môi hữu cơ (xăng, dầu hoả…). Chất béo là nguồn dự trữ năng lượng chính; sáp chống nước và tác động có hại.', 'Lipids are organic compounds in living cells, insoluble in water but soluble in some organic solvents (petrol, kerosene …). Fats are the main energy store; waxes give waterproofing and protection.'] });
    b.innerHTML = '<div class="olab em" data-lab><p class="olab__hint">' + pr('Thử tính tan: kéo mẫu vào cốc nước, xăng hoặc benzene (chỉ minh hoạ, benzene độc).', 'Test solubility: drag a sample into the water, petrol or benzene beaker (illustration only; benzene is toxic).') + '</p><div class="olab__btns">' + Object.keys(SOL).map((k) => O.chip(k, SOL[k][0], SOL[k][1])).join('') + '</div><div class="olab__cols">' +
      [['water', 'Nước', 'Water'], ['petrol', 'Xăng', 'Petrol'], ['benzene', 'Benzene', 'Benzene']].map((z) => O.zone(z[0], '<b>' + pr(z[1], z[2]) + '</b><div data-r="' + z[0] + '"></div>', 'Cốc ' + z[1] + ' / ' + z[2] + ' beaker', '')).join('') + '</div><p class="olab__status" data-st role="status"></p><ul data-log></ul>' + NOTE + '</div>';
    const lab = $('[data-lab]', b), st = $('[data-st]', lab), log = $('[data-log]', lab), seen = {};
    U.drag(lab, (cid, zid) => { const s = SOL[cid], dis = s[2][zid]; seen[cid + '|' + zid] = dis;
      $('[data-r="' + zid + '"]', lab).innerHTML = '<span>' + pr(s[0], s[1]) + (dis ? ' ✓' : ' ✗') + '</span>';
      const lip = cid === 'oil' || cid === 'fat', where = { water: ['nước', 'water'], petrol: ['xăng', 'petrol'], benzene: ['benzene', 'benzene'] }[zid];
      O.say(st, dis ? true : null, s[0] + (dis ? ': tan trong ' : ': không tan trong ') + where[0] + (!dis && lip && zid === 'water' ? ' — nổi lên trên mặt nước vì nhẹ hơn nước.' : '.'), s[1] + (dis ? ': dissolves in ' : ': does not dissolve in ') + where[1] + (!dis && lip && zid === 'water' ? ' — it floats because it is lighter than water.' : '.'));
      log.innerHTML = Object.keys(seen).map((k) => { const p = k.split('|'); return '<li><b>' + pr(SOL[p[0]][0], SOL[p[0]][1]) + '</b> / ' + pr({ water: 'nước', petrol: 'xăng', benzene: 'benzene' }[p[1]], p[1]) + ': ' + pr(seen[k] ? 'tan' : 'không tan', seen[k] ? 'dissolves' : 'does not dissolve') + '</li>'; }).join(''); });
    return {};
  }

  /* ------------------------------------------------------------ W28.2 : lắp phân tử chất béo (triester) */
  const ACIDS = [['C15H31', 'C₁₅H₃₁–COOH'], ['C17H35', 'C₁₇H₃₅–COOH'], ['C17H33', 'C₁₇H₃₃–COOH'], ['C17H31', 'C₁₇H₃₁–COOH']];
  function fatBuild(body) {
    const S = { slot: [null, null, null], hyd: false, water: 0 };
    body.innerHTML = '<div class="olab em" data-lab><p class="olab__hint">' + pr('Kéo acid béo R–COOH vào từng nhóm –OH của glycerol; mỗi lần ghép nối ra 1 phân tử H₂O. Chọn 3 gốc R giống hoặc khác nhau.', 'Drag a fatty acid R–COOH onto each –OH of glycerol; each joining releases one H₂O. Pick three R groups, the same or different.') + '</p>' +
      '<div class="olab__btns">' + ACIDS.map((x) => O.chip(x[0], x[1], x[1])).join('') + '</div><div data-svg></div><div class="olab__cols">' + [0, 1, 2].map((i) => O.zone('s' + i, '<b>' + pr('Nhóm –OH ' + (i + 1), '–OH group ' + (i + 1)) + '</b><div data-sl="' + i + '"></div>', 'Nhóm –OH số ' + (i + 1) + ' của glycerol / –OH group ' + (i + 1) + ' of glycerol', '')).join('') + '</div>' +
      '<div class="olab__btns"><button type="button" class="btn btn--sm" data-hyd>' + pr('Thuỷ phân (thêm H₂O)', 'Hydrolyse (add H₂O)') + '</button><button type="button" class="btn btn--sm" data-reset>' + pr('Đặt lại', 'Reset') + '</button></div><p class="olab__status" data-st role="status"></p><div data-info></div>' + EXT('Tên acid béo và nhận xét dầu lỏng/mỡ rắn là phần mở rộng, định tính; sách chỉ nêu R thường là –C₁₅H₃₁, –C₁₇H₃₅, –C₁₇H₃₃, –C₁₇H₃₁…', 'Acid names and the liquid-oil / solid-fat remark are extensions, qualitative; the book only says R is usually –C₁₅H₃₁, –C₁₇H₃₅, –C₁₇H₃₃, –C₁₇H₃₁ …') + NOTE + '</div>';
    const lab = $('[data-lab]', body), st = $('[data-st]', lab), svgH = $('[data-svg]', lab), info = $('[data-info]', lab);
    function chain(x0, y, k) { const n = CHO.FA[k].n; let d = 'M' + x0 + ' ' + y, mk = ''; for (let i = 1; i <= n; i++) d += ' L' + (x0 + i * 9) + ' ' + (y + (i % 2 ? -6 : 6)); const dbl = k === 'C17H33' ? [9] : k === 'C17H31' ? [9, 12] : [];
      dbl.forEach((p) => { mk += '<line x1="' + (x0 + p * 9 + 3) + '" y1="' + (y + (p % 2 ? -3 : 9)) + '" x2="' + (x0 + (p + 1) * 9 + 3) + '" y2="' + (y + ((p + 1) % 2 ? -3 : 9)) + '" stroke="#ea580c" stroke-width="2"/>'; });
      return '<path d="' + d + '" fill="none" stroke="#4b5563" stroke-width="2.5" stroke-linejoin="round"/>' + mk; }
    function draw() { const ys = [30, 78, 126]; let s = '<svg viewBox="0 0 330 160" class="mol__board" role="img" aria-label="Glycerol và acid béo / Glycerol and fatty acids"><line x1="26" y1="30" x2="26" y2="126" stroke="#4b5563" stroke-width="3"/>';
      ys.forEach((y, i) => { const k = S.slot[i]; s += '<circle cx="26" cy="' + y + '" r="9" fill="#9ca3af"/><text x="26" y="' + (y + 4) + '" text-anchor="middle" style="font-size:11px" fill="#fff">C</text>';
        if (!k || S.hyd) s += '<line x1="35" y1="' + y + '" x2="58" y2="' + y + '" stroke="#4b5563" stroke-width="3"/><text x="62" y="' + (y + 5) + '" style="font-size:13px" font-weight="700" fill="#dc2626">OH</text>';
        else s += '<line x1="35" y1="' + y + '" x2="54" y2="' + y + '" stroke="#4b5563" stroke-width="3"/><circle cx="60" cy="' + y + '" r="7" fill="#ef4444"/><line x1="66" y1="' + y + '" x2="84" y2="' + y + '" stroke="#4b5563" stroke-width="3"/><circle cx="88" cy="' + y + '" r="8" fill="#9ca3af"/><line x1="88" y1="' + (y - 8) + '" x2="88" y2="' + (y - 18) + '" stroke="#4b5563" stroke-width="3"/><circle cx="88" cy="' + (y - 22) + '" r="6" fill="#ef4444"/>' + chain(94, y, k).replace(/M94/, 'M94'); });
      svgH.innerHTML = s + '</svg>'; }
    function paint() { draw(); [0, 1, 2].forEach((i) => { $('[data-sl="' + i + '"]', lab).innerHTML = S.slot[i] && !S.hyd ? '<span>' + ACIDS.find((x) => x[0] === S.slot[i])[1] + '</span>' : '<small>—</small>'; });
      const full = S.slot.every(Boolean);
      if (!full) { info.innerHTML = '<p class="olab__hint">' + pr('Đã nối ' + S.slot.filter(Boolean).length + '/3 acid béo; đã tách ' + S.water + ' phân tử H₂O.', 'Joined ' + S.slot.filter(Boolean).length + '/3 fatty acids; ' + S.water + ' H₂O molecules released.') + '</p>'; return; }
      const r = S.slot, F = CHO.fatF(r), M = CHO.fatM(r), same = r[0] === r[1] && r[1] === r[2], u = CHO.unsat(r);
      info.innerHTML = '<div class="mol__card"><b class="mol__f">' + uni(F) + '</b> <small>M = ' + M + ' · (RCOO)₃C₃H₅</small></div><p>' + pr(same ? 'Ba gốc R giống nhau.' : 'Ba gốc R khác nhau — vẫn là một chất béo (R có thể giống hoặc khác nhau).', same ? 'The three R groups are identical.' : 'The three R groups differ — still a fat (R can be the same or different).') + ' ' + pr('Tổng số liên kết C=C ở các gốc R: ' + u + '.', 'Total C=C bonds in the R groups: ' + u + '.') + '</p><p>' + O.eq({ re: [{ f: 'C3H5(OH)3', n: 1 }, { f: 'RCOOH', n: 3 }], pr: [{ f: '(RCOO)3C3H5', n: 1 }, { f: 'H2O', n: 3 }], rev: true, cond: 'H₂SO₄ đặc, t°' }) + '</p>' + EXT(u >= 2 ? 'Nhiều liên kết C=C: thường gặp ở dầu (lỏng).' : u === 0 ? 'Không có liên kết C=C: thường gặp ở mỡ (rắn).' : 'Có ít liên kết C=C: tính chất trung gian.', u >= 2 ? 'Many C=C bonds: typical of oils (liquid).' : u === 0 ? 'No C=C bonds: typical of fats (solid).' : 'A few C=C bonds: in-between properties.'); }
    U.drag(lab, (cid, zid) => { if (S.hyd) return; const i = +zid.slice(1); if (!S.slot[i]) S.water++; S.slot[i] = cid; paint(); O.say(st, true, 'Ghép acid béo vào nhóm –OH số ' + (i + 1) + ': tách ra 1 phân tử H₂O (liên kết –COO– hình thành).', 'Fatty acid joined to –OH ' + (i + 1) + ': one H₂O is released (an –COO– link forms).'); });
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-reset]')) { S.slot = [null, null, null]; S.hyd = false; S.water = 0; paint(); O.say(st, null, ''); }
      else if (e.target.closest('[data-hyd]')) { if (!S.slot.every(Boolean)) { O.say(st, false, 'Hãy lắp đủ 3 acid béo trước khi thuỷ phân.', 'Attach all three fatty acids before hydrolysing.'); return; } S.hyd = true; draw(); O.say(st, true, 'Thuỷ phân: chất béo + 3H₂O → glycerol C₃H₅(OH)₃ + 3 acid béo R–COOH (xúc tác acid hoặc enzyme lipase). Ba nhóm –OH của glycerol xuất hiện trở lại.', 'Hydrolysis: fat + 3H₂O → glycerol C₃H₅(OH)₃ + 3 fatty acids R–COOH (acid or lipase catalyst). The three –OH groups of glycerol reappear.'); } });
    paint(); return {};
  }

  /* ------------------------------------------------------------ W28.3 : xà phòng hoá */
  const FATS = { tri: { vi: 'tristearin (C₁₇H₃₅COO)₃C₃H₅', en: 'tristearin (C₁₇H₃₅COO)₃C₃H₅', r: ['C17H35', 'C17H35', 'C17H35'] }, olein: { vi: 'triolein (C₁₇H₃₃COO)₃C₃H₅', en: 'triolein (C₁₇H₃₃COO)₃C₃H₅', r: ['C17H33', 'C17H33', 'C17H33'] }, mix: { vi: 'chất béo hỗn hợp (C₁₇H₃₅, C₁₇H₃₃, C₁₅H₃₁)', en: 'mixed fat (C₁₇H₃₅, C₁₇H₃₃, C₁₅H₃₁)', r: ['C17H35', 'C17H33', 'C15H31'] } };
  function saponify(body) {
    const [a, b] = U.wrap(body, 2), P = { m: 890, n: 120, T: 25 }, S = { fat: false, base: false, kind: 'tri' };
    a.innerHTML = '<div class="olab em" data-lab><p class="olab__hint">' + pr('Kéo chất béo và NaOH vào bình, rồi kéo đèn cồn để đun (hoặc kéo thanh nhiệt độ ≥ 80 °C). Chỉnh khối lượng để thấy NaOH đủ, thiếu hay dư.', 'Drag the fat and NaOH into the flask, then drag the spirit lamp to heat (or move the temperature slider to ≥ 80 °C). Change the masses to see NaOH enough, too little or in excess.') + '</p>' +
      '<label class="olab__ctl"><span>' + pr('Loại chất béo', 'Type of fat') + '</span><select data-kind>' + Object.keys(FATS).map((k) => '<option value="' + k + '">' + FATS[k].vi + '</option>').join('') + '</select></label>' +
      U.ctl('m', 'Khối lượng chất béo', 'Mass of fat', 0, 1780, 10, P.m, ' g') + U.ctl('n', 'Khối lượng NaOH', 'Mass of NaOH', 0, 300, 5, P.n, ' g') + U.ctl('T', 'Nhiệt độ', 'Temperature', 20, 100, 5, P.T, ' °C') +
      '<div class="olab__btns">' + O.chip('fat', 'Chất béo', 'Fat') + O.chip('base', 'NaOH', 'NaOH') + O.chip('lamp', 'Đèn cồn (đun nóng)', 'Spirit lamp (heat)') + '<button type="button" class="btn btn--sm" data-reset>' + pr('Đặt lại', 'Reset') + '</button></div>' +
      '<div class="olab__cols">' + O.zone('flask', '<div data-v></div>', 'Bình phản ứng: thả chất béo, NaOH, đèn cồn vào đây / Flask: drop the fat, NaOH and lamp here', 'mol__tube') + '<div data-res></div></div><p class="olab__status" data-st role="status"></p><div data-co></div>' + NOTE + '</div>';
    const lab = $('[data-lab]', a), st = $('[data-st]', lab), res = $('[data-res]', lab), v = $('[data-v]', lab);
    $('[data-co]', lab).innerHTML = O.coef(ALC.R.soapStear); O.coefBind(lab);
    const calc = () => { const f = FATS[S.kind]; return CHO.soap(f.r, P.m, P.n); };
    function paint() { const ready = S.fat && S.base && P.T >= 80 && P.m > 0 && P.n > 0, s = calc(), f = FATS[S.kind];
      const layers = !(S.fat || S.base) ? [] : ready ? [{ h: clamp((s.soapG + s.glyG) / 1500, 0.05, 0.6), col: '#e5e7eb' }, { h: clamp(s.fatLeft / 1500, 0, 0.3), col: '#fde68a' }] : [{ h: S.base ? 0.25 : 0, col: '#bfdbfe' }, { h: S.fat ? clamp(P.m / 1800, 0.05, 0.4) : 0, col: '#fde68a' }].filter((x) => x.h > 0);
      v.innerHTML = O.tube({ layers, heat: P.T >= 80, bub: ready ? 4 : 0, t: 0, label: 'Bình xà phòng hoá / Saponification flask' });
      if (!ready) { res.innerHTML = '<p class="olab__hint">' + pr('Cần có chất béo, NaOH và đun nóng (≥ 80 °C). ' + (S.fat ? '' : '○ chưa có chất béo. ') + (S.base ? '' : '○ chưa có NaOH. ') + (P.T >= 80 ? '' : '○ chưa đun nóng.'), 'Fat, NaOH and heating (≥ 80 °C) are all needed. ' + (S.fat ? '' : '○ no fat yet. ') + (S.base ? '' : '○ no NaOH yet. ') + (P.T >= 80 ? '' : '○ not heated yet.')) + '</p>'; return; }
      const lim = s.limiting === 'cả hai' ? ['Vừa đủ: chất béo và NaOH cùng hết.', 'Exactly enough: the fat and NaOH are both used up.'] : s.limiting === 'NaOH' ? ['Thiếu NaOH: còn dư ' + f1(s.fatLeft) + ' g chất béo chưa xà phòng hoá.', 'Too little NaOH: ' + f1(s.fatLeft) + ' g of fat is left unsaponified.'] : ['Dư NaOH: còn ' + f1(s.baseLeft) + ' g NaOH chưa phản ứng.', 'NaOH in excess: ' + f1(s.baseLeft) + ' g of NaOH is left.'];
      res.innerHTML = '<div class="mol__card"><b>' + pr('Xà phòng (muối Na của acid béo)', 'Soap (sodium salts of the fatty acids)') + '</b>: <b>' + f1(s.soapG) + ' g</b><br><b>' + pr('Glycerol', 'Glycerol') + '</b>: <b>' + f1(s.glyG) + ' g</b><br><small>' + pr('Chất béo phản ứng ' + f1(s.fatUsed) + ' g + NaOH ' + f1(3 * s.use * 40) + ' g = ' + f1(s.fatUsed + 3 * s.use * 40) + ' g = xà phòng + glycerol (bảo toàn khối lượng)', 'Fat used ' + f1(s.fatUsed) + ' g + NaOH ' + f1(3 * s.use * 40) + ' g = ' + f1(s.fatUsed + 3 * s.use * 40) + ' g = soap + glycerol (mass is conserved)') + '</small></div><p>' + O.eq({ re: [{ f: '(RCOO)3C3H5', n: 1 }, { f: 'NaOH', n: 3 }], pr: [{ f: 'RCOONa', n: 3 }, { f: 'C3H5(OH)3', n: 1 }], cond: 't°' }) + '</p>';
      O.say(st, s.limiting === 'cả hai' ? true : null, lim[0], lim[1]); }
    U.bindCtl(lab, P, paint);
    lab.addEventListener('change', (e) => { if (e.target.matches('[data-kind]')) { S.kind = e.target.value; paint(); } });
    U.drag(lab, (cid) => { if (cid === 'fat') S.fat = true; else if (cid === 'base') S.base = true; else if (cid === 'lamp') U.setCtl(lab, P, 'T', 90); paint(); });
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-reset]')) { S.fat = S.base = false; U.setCtl(lab, P, 'm', 890); U.setCtl(lab, P, 'n', 120); U.setCtl(lab, P, 'T', 25); paint(); O.say(st, null, ''); } });
    paint();
    /* xà phòng thủ công: bấm theo đúng thứ tự */
    const ST = [['Đun chất béo với dung dịch kiềm', 'Heat the fat with alkali solution'], ['Tách muối natri của acid béo', 'Separate the sodium salts of the fatty acids'], ['Trộn phụ gia, hương liệu, chất tạo màu', 'Mix in additives, fragrance and colouring'], ['Ép thành bánh xà phòng', 'Press into soap bars']], ORD = [0, 1, 2, 3], shuf = [2, 0, 3, 1], seq = [];
    b.innerHTML = '<div class="olab em" data-lab><p class="olab__hint">' + pr('Làm xà phòng thủ công: bấm các bước theo đúng thứ tự (khung “Xà phòng thủ công” trong sách).', 'Hand-made soap: press the steps in the right order (the “Hand-made soap” box in the book).') + '</p><div class="olab__btns">' + shuf.map((i) => '<button type="button" class="btn btn--sm" data-s="' + i + '">' + pr(ST[i][0], ST[i][1]) + '</button>').join('') + '<button type="button" class="btn btn--sm" data-r>' + pr('Làm lại', 'Again') + '</button></div><p class="olab__status" data-st role="status"></p><p>' + EXT('Tìm hiểu cách làm xà phòng từ dầu ăn, mỡ thừa là hoạt động trong sách; thí nghiệm thật dùng kiềm mạnh, cần người lớn và dụng cụ bảo hộ.', 'Finding out how to make soap from used cooking oil is an activity in the book; the real experiment uses strong alkali and needs an adult and protective equipment.') + '</p></div>';
    const l2 = $('[data-lab]', b), s2 = $('[data-st]', l2);
    l2.addEventListener('click', (e) => { if (e.target.closest('[data-r]')) { seq.length = 0; $$('[data-s]', l2).forEach((x) => { x.disabled = false; }); O.say(s2, null, ''); return; } const x = e.target.closest('[data-s]'); if (!x) return; const i = +x.dataset.s;
      if (i !== ORD[seq.length]) { O.say(s2, false, 'Chưa đúng thứ tự: chất béo đun với kiềm → tách muối → trộn phụ gia → ép bánh.', 'Not the right order: heat fat with alkali → separate the salts → mix additives → press into bars.'); return; }
      seq.push(i); x.disabled = true; O.say(s2, seq.length === 4 ? true : null, seq.length === 4 ? '✓ Đúng: xà phòng thủ công đã thành bánh.' : 'Đúng, bước tiếp theo?', seq.length === 4 ? '✓ Correct: the hand-made soap is pressed into bars.' : 'Correct; what comes next?'); });
    return { state: P };
  }

  /* ------------------------------------------------------------ W28.4 : ứng dụng và dùng chất béo đúng cách */
  function fatUse(body) {
    const [a, b] = U.wrap(body, 2);
    EL.sorter(a, { hint: ['Kéo từng sản phẩm vào lĩnh vực sử dụng chất béo.', 'Drag each product into the field where fats are used.'],
      boxes: [{ id: 'food', vi: 'Thực phẩm', en: 'Food' }, { id: 'cos', vi: 'Mĩ phẩm – dược phẩm', en: 'Cosmetics – medicine' }, { id: 'fuel', vi: 'Nhiên liệu', en: 'Fuel' }, { id: 'soap', vi: 'Sản xuất xà phòng', en: 'Making soap' }],
      items: [['dầu ăn', 'cooking oil', 'food'], ['bơ', 'butter', 'food'], ['kem dưỡng ẩm', 'moisturiser', 'cos'], ['thuốc', 'medicine', 'cos'], ['dầu diesel sinh học', 'biodiesel', 'fuel'], ['xà phòng bánh', 'soap bar', 'soap']].map((x, i) => ({ id: 'u' + i, vi: x[0], en: x[1], to: [x[2]] })) });
    EL.sorter(b, { hint: ['Đĩa ăn khoẻ (theo gợi ý của sách): kéo thực phẩm vào ô ưu tiên hoặc hạn chế.', 'Healthy plate (the book’s advice): drag each food into prefer or limit.'],
      boxes: [{ id: 'pre', vi: 'Ưu tiên', en: 'Prefer' }, { id: 'lim', vi: 'Hạn chế', en: 'Limit' }],
      items: [['dầu thực vật (hướng dương, đậu nành, lạc…)', 'vegetable oils (sunflower, soya, peanut …)', 'pre'], ['cá, hải sản giàu omega-3', 'fish and seafood rich in omega-3', 'pre'], ['các loại hạt (lạc, vừng, hạnh nhân, óc chó…)', 'nuts and seeds (peanut, sesame, almond, walnut …)', 'pre'], ['mỡ lợn, mỡ bò', 'lard, beef fat', 'lim'], ['bơ nhân tạo', 'margarine', 'lim'], ['đồ chiên, nướng ở nhiệt độ cao', 'foods fried or grilled at high heat', 'lim'], ['thức ăn nhanh', 'fast food', 'lim']].map((x, i) => ({ id: 'p' + i, vi: x[0], en: x[1], to: [x[2]] })),
      note: ['Béo phì là tình trạng tích tụ mỡ quá mức, liên quan đến nhiều bệnh (tim mạch, đột quỵ, đái tháo đường…). Đây chỉ là kiến thức chung theo sách, không phải chế độ ăn riêng; hãy hỏi bác sĩ hoặc chuyên gia dinh dưỡng khi cần.', 'Obesity is excess fat build-up linked to many diseases (heart disease, stroke, diabetes …). This is general knowledge from the book, not a personal diet; ask a doctor or nutrition expert when needed.'] });
    return {};
  }

  /* ------------------------------------------------------------ W28.5 : vai trò của lipid */
  function lipidRole(body) {
    EL.sorter(body, { hint: ['Kéo từng ý vào vai trò đúng của lipid.', 'Drag each statement to the right role of lipids.'],
      boxes: [{ id: 'cell', vi: 'Tham gia cấu tạo tế bào', en: 'Part of cell structure' }, { id: 'energy', vi: 'Tích luỹ năng lượng', en: 'Energy store' }, { id: 'wax', vi: 'Chống nước, bảo vệ (sáp)', en: 'Waterproofing, protection (wax)' }],
      items: [['có mặt trong tế bào sống', 'present in living cells', 'cell'], ['thành phần của màng tế bào', 'part of the cell membrane', 'cell'], ['nguồn dự trữ năng lượng chính', 'the main energy store', 'energy'], ['chất béo trong mỡ động vật, dầu thực vật', 'fats in animal fat and vegetable oil', 'energy'], ['lớp phủ trên lá, thân, quả', 'coating on leaves, stems, fruit', 'wax'], ['lớp phủ da, lông của một số động vật', 'coating on the skin and fur of some animals', 'wax']].map((x, i) => ({ id: 'r' + i, vi: x[0], en: x[1], to: [x[2]] })),
      note: ['Ý “thành phần của màng tế bào” là cách nêu mục tiêu 3 của bài (lipid tham gia cấu tạo tế bào); sách chỉ nói lipid có trong tế bào sống.', 'The “cell membrane” statement restates aim 3 of the lesson (lipids take part in cell structure); the book itself only says lipids occur in living cells.'] });
    return {};
  }
  const sims = {
    'lipid-sort': { fn: lipidSort, vi: 'Phân loại lipid và thử tính tan (Hình 28.1)', en: 'Classifying lipids and testing solubility (Figure 28.1)', intro: 'Kéo thẻ vào ô; kéo mẫu vào cốc.' },
    'fat-build': { fn: fatBuild, vi: 'Lắp phân tử chất béo từ glycerol và acid béo', en: 'Building a fat from glycerol and fatty acids', intro: 'Kéo acid béo vào nhóm –OH của glycerol.' },
    saponify: { fn: saponify, vi: 'Phản ứng xà phòng hoá', en: 'Saponification', intro: 'Kéo chất béo, NaOH, đèn cồn vào bình.' },
    'fat-use': { fn: fatUse, vi: 'Ứng dụng và sử dụng chất béo đúng cách', en: 'Uses of fats and using them wisely', intro: 'Kéo thẻ vào ô.' },
    'lipid-role': { fn: lipidRole, vi: 'Vai trò của lipid', en: 'Roles of lipids', intro: 'Kéo ý vào vai trò.' }
  };
  window.LabSims = Object.assign(window.LabSims || {}, sims);
})();
