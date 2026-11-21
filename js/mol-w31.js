/* ==========================================================================
   MOL W31 — widget Bài 31 "Protein". Nạp SAU mol-w30.js và prot-lab.js.
   pep-build (W31.1, trọng tâm) · egg-lab (W31.2, trọng tâm) · pro-hyd (W31.3) · fibre-burn (W31.4) · pro-role (W31.5)
   Số liệu và kết quả do ChemLab.engine.PRO quyết định. Nhãn “mở rộng/bổ sung”: bông vải, mô hình phân tử, đường cong thời gian.
   Đun nóng, HCl và đốt sợi chỉ minh hoạ định tính; không đốt vật liệu tổng hợp vì khí độc.
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab, ML = window.MolLab, EL = window.EnergyLab, CL = window.ChemLab;
  if (!L || !ML || !ML.org || !EL || !CL || !CL.engine.PRO || !ML.org28) return;
  const { pr, fmt } = L, U = ML.ui, O = ML.org, { $, $$ } = U, PRO = CL.engine.PRO, AA = PRO.AA;
  const NOTE = ML.NOTE(ML.org28.SAFE2), EXT = ML.org28.EXT;
  const COL = { gly: '#bfdbfe', ala: '#bbf7d0' };

  /* ---- vẽ chuỗi amino acid: ô màu; liên kết peptide –CO–NH– tô đỏ; mark = chỉ số liên kết đã bị cắt ---- */
  function chainSvg(seq, cut) {
    cut = cut || {}; const W = 80, G = 64, n = seq.length, vw = Math.max(320, 20 + n * W + (n - 1) * G);
    let s = '<svg viewBox="0 0 ' + vw + ' 150" class="mol__board" role="img" aria-label="' + pr('Chuỗi ' + n + ' amino acid: ' + seq.map((k) => AA[k].ab).join('–'), 'Chain of ' + n + ' amino acids: ' + seq.map((k) => AA[k].ab).join('–')).replace(/<[^>]+>/g, ' ') + '" style="max-width:' + Math.max(320, vw) + 'px">';
    seq.forEach((k, i) => {
      const x = 10 + i * (W + G);
      s += '<rect x="' + x + '" y="30" width="' + W + '" height="70" rx="10" fill="' + COL[k] + '" stroke="#374151" stroke-width="2"/><text x="' + (x + W / 2) + '" y="55" text-anchor="middle" style="font:700 15px system-ui">' + AA[k].ab + '</text><text x="' + (x + W / 2) + '" y="74" text-anchor="middle" style="font:12px system-ui">R = ' + AA[k].side + '</text><text x="' + (x + 6) + '" y="96" style="font:11px system-ui">H₂N</text><text x="' + (x + W - 6) + '" y="96" text-anchor="end" style="font:11px system-ui">COOH</text>';
      if (i < n - 1) {
        const x0 = x + W, gone = cut[i];
        s += gone ? '<line x1="' + x0 + '" y1="65" x2="' + (x0 + G) + '" y2="65" stroke="#9ca3af" stroke-width="2" stroke-dasharray="3 4"/><text x="' + (x0 + G / 2) + '" y="55" text-anchor="middle" style="font:700 10px system-ui" fill="#2563eb">+H₂O</text>'
          : '<line x1="' + x0 + '" y1="65" x2="' + (x0 + G) + '" y2="65" stroke="#dc2626" stroke-width="5"/><text x="' + (x0 + G / 2) + '" y="52" text-anchor="middle" style="font:700 10px system-ui" fill="#dc2626">–CO–NH–</text><text x="' + (x0 + G / 2) + '" y="122" text-anchor="middle" style="font:10px system-ui" fill="#2563eb">−H₂O</text>';
      }
    });
    return s + '</svg>';
  }

  /* ------------------------------------------------------------ W31.1 : lắp chuỗi protein */
  function pepBuild(body) {
    const S = { seq: [], hyd: false };
    body.innerHTML = '<div class="olab em" data-lab><p class="olab__hint">' + pr('Kéo amino acid (alanine, glycine) vào vùng chuỗi: –COOH của chất này nối với –NH₂ của chất kia, tách 1 H₂O và tạo liên kết peptide –CO–NH– (Hình 31.1).', 'Drag amino acids (alanine, glycine) into the chain area: the –COOH of one joins the –NH₂ of the next, releasing one H₂O and forming a peptide bond –CO–NH– (Figure 31.1).') + '</p><div class="olab__btns">' + O.chip('gly', 'Glycine (Gly)', 'Glycine (Gly)') + O.chip('ala', 'Alanine (Ala)', 'Alanine (Ala)') +
      '<button type="button" class="btn btn--sm" data-undo>' + pr('Bỏ cái cuối', 'Remove last') + '</button><button type="button" class="btn btn--sm" data-flip>' + pr('Đảo thứ tự', 'Reverse order') + '</button><button type="button" class="btn btn--sm" data-hyd>' + pr('Thuỷ phân', 'Hydrolyse') + '</button><button type="button" class="btn btn--sm" data-reset>' + pr('Đặt lại', 'Reset') + '</button></div>' +
      O.zone('chain', '<div data-svg style="overflow-x:auto"></div>', 'Vùng chuỗi: thả amino acid vào đây / Chain area: drop amino acids here', '') + '<div data-info></div><p class="olab__status" data-st role="status"></p>' +
      '<p class="olab__hint"><small>' + pr('Điểm giống nhau: đều có nhóm –NH₂ và –COOH; khác nhau: gốc R (Gly: H; Ala: CH₃). Công thức: glycine H₂N–CH₂–COOH; alanine H₂N–CH(CH₃)–COOH.', 'Alike: both have –NH₂ and –COOH; different: the R group (Gly: H; Ala: CH₃). Glycine is H₂N–CH₂–COOH; alanine is H₂N–CH(CH₃)–COOH.') + '</small></p>' +
      EXT('Chỉ có hai amino acid như trong Hình 31.1; protein thật gồm hàng trăm amino acid. Sơ đồ minh hoạ, không vẽ đủ nguyên tử. Thêm amino acid mới: thêm vào AA trong prot-lab.js.', 'Only the two amino acids of Figure 31.1; real proteins have hundreds. Schematic, atoms not fully drawn. To add an amino acid, add it to AA in prot-lab.js.') + '</div>';
    const lab = $('[data-lab]', body), st = $('[data-st]', lab), svg = $('[data-svg]', lab), info = $('[data-info]', lab);
    const paint = () => {
      if (!S.seq.length) { svg.innerHTML = '<p>' + pr('Chưa có amino acid. Kéo glycine hoặc alanine vào đây.', 'No amino acids yet. Drag glycine or alanine here.') + '</p>'; info.innerHTML = ''; return; }
      const cut = {}; if (S.hyd) for (let i = 0; i < S.seq.length - 1; i++) cut[i] = 1;
      svg.innerHTML = chainSvg(S.seq, cut);
      const p = PRO.peptide(S.seq), cnt = {}; S.seq.forEach((k) => (cnt[k] = (cnt[k] || 0) + 1));
      info.innerHTML = '<div class="mol__card"><b class="mol__f">' + p.name + '</b> · ' + (S.hyd ? pr('đã thuỷ phân thành ' + p.n + ' amino acid tự do', 'hydrolysed to ' + p.n + ' free amino acids') : pr('công thức ', 'formula ') + '<b>' + p.formula + '</b>') + '<br><small>' + pr('n = ' + p.n + ' amino acid · ' + p.bonds + ' liên kết peptide · tách ' + p.water + ' H₂O', 'n = ' + p.n + ' amino acids · ' + p.bonds + ' peptide bonds · ' + p.water + ' H₂O released') + '<br>M = ' + fmt(p.sumAA, 0) + ' − 18 × ' + p.water + ' = <b>' + fmt(p.M, 0) + '</b> amu</small></div>' +
        (p.n >= 2 ? '<p><small>' + pr('Bộ amino acid này xếp được ' + PRO.arrangements(cnt) + ' chuỗi khác nhau (thứ tự khác ⇒ chuỗi khác, cùng M).', 'This set of amino acids can be arranged into ' + PRO.arrangements(cnt) + ' different chains (a different order is a different chain, same M).') + '</small></p>' : '');
    };
    U.drag(lab, (cid) => {
      if (S.hyd) { O.say(st, false, 'Chuỗi đã bị thuỷ phân; bấm Đặt lại để lắp lại.', 'The chain was hydrolysed; press Reset to build again.'); return; }
      if (S.seq.length >= 8) { O.say(st, false, 'Đủ 8 amino acid (đủ để minh hoạ).', '8 amino acids is enough for the illustration.'); return; }
      S.seq.push(cid); paint();
      O.say(st, true, S.seq.length === 1 ? 'Đã có ' + AA[cid].vi + '. Kéo thêm amino acid thứ hai để tạo liên kết peptide.' : 'Nối –COOH với –NH₂, tách 1 H₂O: có ' + (S.seq.length - 1) + ' liên kết peptide.', S.seq.length === 1 ? AA[cid].en + ' added. Drag a second amino acid to form a peptide bond.' : 'Joined –COOH to –NH₂, releasing 1 H₂O: ' + (S.seq.length - 1) + ' peptide bond(s).'); });
    lab.addEventListener('click', (e) => {
      if (e.target.closest('[data-reset]')) { S.seq = []; S.hyd = false; paint(); O.say(st, null, ''); }
      else if (e.target.closest('[data-undo]')) { if (!S.hyd) S.seq.pop(); paint(); }
      else if (e.target.closest('[data-flip]')) { if (S.seq.length < 2 || S.hyd) return; const a = PRO.peptide(S.seq); S.seq.reverse(); paint(); const b = PRO.peptide(S.seq); O.say(st, null, 'Đảo thứ tự: ' + a.name + ' → ' + b.name + '. Cùng công thức ' + b.formula + ' và M = ' + b.M + ' nhưng là hai chuỗi khác nhau.', 'Reversed: ' + a.name + ' → ' + b.name + '. Same formula ' + b.formula + ' and M = ' + b.M + ' but two different chains.'); }
      else if (e.target.closest('[data-hyd]')) { if (S.seq.length < 2) { O.say(st, false, 'Cần ít nhất 2 amino acid nối với nhau.', 'You need at least two joined amino acids.'); return; } S.hyd = true; paint(); const h = PRO.hydrolyse(S.seq); O.say(st, true, 'Thuỷ phân: thêm ' + h.water + ' H₂O cắt ' + h.water + ' liên kết peptide: ' + h.massBefore + ' + ' + h.massWater + ' = ' + h.massAfter + ' (bảo toàn khối lượng).', 'Hydrolysis: ' + h.water + ' H₂O cut ' + h.water + ' peptide bonds: ' + h.massBefore + ' + ' + h.massWater + ' = ' + h.massAfter + ' (mass conserved).'); }
    });
    paint(); return {};
  }

  /* ------------------------------------------------------------ W31.2 : ba ống lòng trắng trứng */
  function eggLab(body) {
    const T = [{ hcl: 0, heat: 0 }, { hcl: 0, heat: 0 }, { hcl: 0, heat: 0 }], S = { mol: false, last: -1 };
    const tube = (i) => { const r = PRO.egg(T[i]), fill = r.state === 'burnt' ? '#78350f' : r.state === 'coag' ? '#fafaf9' : '#fef3c7';
      return '<svg viewBox="0 0 90 150" width="80" role="img" aria-label="' + pr('Ống ' + (i + 1) + ': ' + r.vi, 'Tube ' + (i + 1) + ': ' + r.en).replace(/<[^>]+>/g, ' ') + '"><path d="M22 10 V120 a23 23 0 0 0 46 0 V10" fill="none" stroke="#374151" stroke-width="3"/><path d="M24 62 V120 a21 21 0 0 0 42 0 V62 Z" fill="' + fill + '" stroke="' + (r.state === 'clear' ? '#fbbf24' : '#9ca3af') + '" stroke-width="1.5"/>' +
        (r.state === 'coag' ? '<circle cx="40" cy="95" r="6" fill="#e5e7eb"/><circle cx="55" cy="105" r="8" fill="#e5e7eb"/><circle cx="46" cy="120" r="7" fill="#f3f4f6"/>' : '') + (r.state === 'burnt' ? '<path d="M38 52 q-6 -10 2 -18 M52 50 q6 -10 -2 -20" fill="none" stroke="#6b7280" stroke-width="2.5"/>' : '') + (T[i].heat ? '<path d="M45 138 q-8 -8 0 -16 q8 8 0 16" fill="' + (T[i].heat > 1 ? '#ef4444' : '#f59e0b') + '"/>' : '') + '</svg>'; };
    const molSvg = (state) => state === 'burnt' ? '<svg viewBox="0 0 160 50" width="170" aria-hidden="true">' + [10, 40, 70, 100, 130].map((x, i) => '<circle cx="' + x + '" cy="' + (18 + (i % 2) * 14) + '" r="6" fill="#92400e"/>').join('') + '</svg>' : state === 'coag' ? '<svg viewBox="0 0 160 50" width="170" aria-hidden="true"><path d="M20 25 q20 -25 40 0 t40 0 t40 0" fill="none" stroke="#6b7280" stroke-width="4"/><path d="M20 35 q20 -20 40 0 t40 0 t40 0" fill="none" stroke="#6b7280" stroke-width="4"/></svg>' : '<svg viewBox="0 0 160 50" width="170" aria-hidden="true"><path d="M10 25 q10 -22 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0" fill="none" stroke="#2563eb" stroke-width="4"/></svg>';
    body.innerHTML = '<div class="olab em" data-lab><p class="olab__hint">' + pr('Làm theo sách: kéo ống nhỏ giọt HCl 1 M vào ống (1); kéo ngọn lửa nhỏ (hơ nhẹ khoảng 1 phút) vào ống (2); kéo ngọn lửa mạnh (đun đến khi có mùi khét) vào ống (3). Mỗi ống chứa khoảng 2 mL lòng trắng trứng.', 'Follow the book: drag the 1 M HCl dropper onto tube (1); drag the small flame (warm gently for about 1 minute) onto tube (2); drag the strong flame (heat until a burnt smell) onto tube (3). Each tube holds about 2 mL of egg white.') + '</p><div class="olab__btns">' + O.chip('hcl', 'HCl 1 M (vài giọt)', 'HCl 1 M (a few drops)') + O.chip('f1', 'Hơ nhẹ ~1 phút', 'Warm gently ~1 min') + O.chip('f2', 'Đun mạnh đến khét', 'Heat strongly until burnt') + '<button type="button" class="btn btn--sm" data-mol>' + pr('Mô hình phân tử', 'Molecule model') + '</button><button type="button" class="btn btn--sm" data-reset>' + pr('Đặt lại', 'Reset') + '</button></div><div class="olab__cols" data-tubes></div><div data-obs></div><p class="olab__status" data-st role="status"></p>' +
      EXT('Mô hình phân tử (chuỗi xoắn – đông lại – cắt vụn) là sơ đồ minh hoạ bổ sung, không có trong sách. Sách chỉ nêu: đông tụ dưới tác dụng của acid, base hoặc nhiệt độ; đun nóng mạnh thì phân huỷ hoặc cháy, có mùi khét.', 'The molecule model (coiled – clumped – cut up) is an extra schematic, not in the book. The book only says: coagulates under acid, base or heat; strong heating decomposes or burns it with a burnt smell.') + NOTE + '</div>';
    const lab = $('[data-lab]', body), st = $('[data-st]', lab), box = $('[data-tubes]', lab), obs = $('[data-obs]', lab);
    const paint = () => { box.innerHTML = T.map((_, i) => O.zone('t' + i, '<b>' + pr('Ống (' + (i + 1) + ')', 'Tube (' + (i + 1) + ')') + '</b><div style="text-align:center">' + tube(i) + '</div><small>' + pr(PRO.egg(T[i]).vi, PRO.egg(T[i]).en) + '</small>' + (S.mol ? '<div style="text-align:center">' + molSvg(PRO.egg(T[i]).state) + '</div>' : ''), 'Ống nghiệm ' + (i + 1) + ' / Test tube ' + (i + 1), '')).join('');
      const done = T.map((t) => PRO.egg(t).state); obs.innerHTML = done.every((x) => x !== 'clear') ? '<div class="mol__card"><b>' + pr('Kết luận (sách)', 'Conclusion (book)') + '</b><br>' + pr('Protein bị đông tụ dưới tác dụng của acid, base hoặc nhiệt độ; khi bị đun nóng ở nhiệt độ cao và không có nước, protein bị phân huỷ hoặc cháy, tạo chất bay hơi có mùi khét.', 'Proteins coagulate under acid, base or heat; heated strongly without water they decompose or burn, giving volatile products and a burnt smell.') + '</div>' : ''; };
    U.drag(lab, (cid, zid) => { const i = +zid.slice(1), t = T[i];
      if (cid === 'hcl') t.hcl += 3; else t.heat = Math.max(t.heat, cid === 'f1' ? 1 : 2);
      S.last = i; paint(); const r = PRO.egg(t);
      O.say(st, r.state !== 'clear' ? true : null, 'Ống (' + (i + 1) + '): ' + r.vi + (r.smell ? ' (mùi khét)' : '') + '.', 'Tube (' + (i + 1) + '): ' + r.en + (r.smell ? ' (burnt smell)' : '') + '.'); });
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-reset]')) { T.forEach((t) => { t.hcl = 0; t.heat = 0; }); paint(); O.say(st, null, ''); } else if (e.target.closest('[data-mol]')) { S.mol = !S.mol; paint(); } });
    paint(); return {};
  }

  /* ------------------------------------------------------------ W31.3 : thuỷ phân protein */
  function proHyd(body) {
    const seq = ['gly', 'ala', 'gly', 'gly', 'ala'], P = { t: 0 }, S = { water: false, cat: null };
    body.innerHTML = '<div class="olab em" data-lab><p class="olab__hint">' + pr('Kéo H₂O và một xúc tác (acid, base hoặc enzyme) vào chuỗi; thanh trượt thời gian (định tính) cho thấy các liên kết peptide bị cắt dần thành amino acid.', 'Drag H₂O and a catalyst (acid, base or enzyme) onto the chain; the time slider (qualitative) shows peptide bonds being cut into amino acids.') + '</p>' + U.ctl('t', 'Thời gian (định tính)', 'Time (qualitative)', 0, 20, 1, P.t, '') +
      '<div class="olab__btns">' + O.chip('h2o', 'H₂O', 'H₂O') + O.chip('acid', 'Acid (xúc tác)', 'Acid (catalyst)') + O.chip('base', 'Base (xúc tác)', 'Base (catalyst)') + O.chip('enzyme', 'Enzyme (xúc tác)', 'Enzyme (catalyst)') + '<button type="button" class="btn btn--sm" data-reset>' + pr('Đặt lại', 'Reset') + '</button></div>' +
      O.zone('chain', '<div data-svg style="overflow-x:auto"></div>', 'Chuỗi peptide: thả H₂O và xúc tác / Peptide chain: drop H₂O and a catalyst', '') + '<p data-eq></p><p class="olab__status" data-st role="status"></p>' +
      EXT('Tốc độ theo thời gian chỉ là mô hình định tính (enzyme nhanh hơn acid, base); sách không nêu số liệu. Chuỗi 5 amino acid để minh hoạ; protein thật rất dài.', 'Rate against time is a qualitative model (enzyme faster than acid or base); the book gives no figures. A 5-amino-acid chain is used for illustration; real proteins are very long.') + NOTE + '</div>';
    const lab = $('[data-lab]', body), st = $('[data-st]', lab), svg = $('[data-svg]', lab);
    const paint = () => { const ready = S.water && S.cat, pg = ready ? PRO.hydProgress(seq.length, S.cat, P.t) : { cut: 0, total: seq.length - 1, bondsLeft: seq.length - 1 }, cut = {}; for (let i = 0; i < pg.cut; i++) cut[i] = 1;
      svg.innerHTML = chainSvg(seq, cut); $('[data-eq]', lab).innerHTML = '<span class="mol__f">' + pr('Protein + H₂O → amino acid', 'Protein + H₂O → amino acids') + '</span> <small>(' + (S.cat ? pr({ acid: 'xúc tác acid', base: 'xúc tác base', enzyme: 'xúc tác enzyme' }[S.cat], { acid: 'acid catalyst', base: 'base catalyst', enzyme: 'enzyme catalyst' }[S.cat]) : pr('chưa có xúc tác', 'no catalyst yet')) + ') · ' + pr('còn ' + pg.bondsLeft + '/' + pg.total + ' liên kết peptide', pg.bondsLeft + '/' + pg.total + ' peptide bonds left') + '</small>';
      if (ready && pg.bondsLeft === 0) O.say(st, true, 'Thuỷ phân hoàn toàn tạo ra các amino acid cấu thành protein; phản ứng xảy ra tại liên kết peptide.', 'Complete hydrolysis gives the amino acids that make up the protein; the reaction occurs at the peptide bonds.'); };
    U.bindCtl(lab, P, paint);
    U.drag(lab, (cid) => { if (cid === 'h2o') S.water = true; else S.cat = cid; paint(); if (!(S.water && S.cat)) O.say(st, null, S.water ? 'Đã có H₂O; còn thiếu xúc tác (acid, base hoặc enzyme).' : 'Đã có xúc tác; còn thiếu H₂O.', S.water ? 'H₂O added; a catalyst (acid, base or enzyme) is still missing.' : 'Catalyst added; H₂O is still missing.'); else O.say(st, true, 'Đã đủ H₂O và xúc tác: kéo thanh thời gian để xem liên kết peptide bị cắt.', 'H₂O and a catalyst are in place: drag the time slider to watch the peptide bonds being cut.'); });
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-reset]')) { S.water = false; S.cat = null; U.setCtl(lab, P, 't', 0); paint(); O.say(st, null, ''); } });
    paint(); return { state: P };
  }

  /* ------------------------------------------------------------ W31.4 : phân biệt tơ tằm với tơ nylon */
  function fibreBurn(body) {
    const S = { done: {} }, ks = ['silk', 'wool', 'nylon', 'cotton'];
    body.innerHTML = '<div class="olab em" data-lab><p class="olab__hint">' + pr('Kéo từng mẫu sợi vào ngọn lửa mô phỏng: tơ tằm và len (protein) khét như tóc cháy; nylon thì khác. Chỉ minh hoạ định tính.', 'Drag each fibre sample into the simulated flame: silk and wool (protein) smell like burning hair; nylon differs. Qualitative illustration only.') + '</p><div class="olab__btns">' + ks.map((k) => O.chip(k, PRO.FIBRE[k].vi, PRO.FIBRE[k].en)).join('') + '<button type="button" class="btn btn--sm" data-reset>' + pr('Đặt lại', 'Reset') + '</button></div>' +
      O.zone('flame', '<div style="text-align:center"><svg viewBox="0 0 80 90" width="70" aria-hidden="true"><path d="M40 85 q-28 -22 0 -62 q28 40 0 62" fill="#f97316"/><path d="M40 82 q-14 -14 0 -36 q14 22 0 36" fill="#fde047"/></svg><br><b>' + pr('Ngọn lửa đèn cồn (mô phỏng)', 'Spirit-lamp flame (simulated)') + '</b></div>', 'Ngọn lửa: thả mẫu sợi vào đây / Flame: drop a fibre sample here', '') + '<div data-tab></div><p class="olab__status" data-st role="status"></p>' +
      EXT('Bông vải là mẫu mở rộng; sách chỉ so tơ tằm, len lông cừu (protein) với tơ nylon. Mô tả mùi và tàn là định tính.', 'Cotton is an extra sample; the book only compares silk and wool (protein) with nylon. Smell and ash descriptions are qualitative.') + '<p class="olab__hint"><small>' + pr('Cảnh báo: không tự đốt vật liệu tổng hợp vì khí độc; thí nghiệm thật cần giáo viên và dụng cụ bảo hộ.', 'Warning: never burn synthetic materials yourself because of toxic fumes; a real experiment needs a teacher and protective equipment.') + '</small></p></div>';
    const lab = $('[data-lab]', body), st = $('[data-st]', lab), tab = $('[data-tab]', lab);
    const paint = () => { const rows = ks.filter((k) => S.done[k]); tab.innerHTML = rows.length ? '<table class="tbl"><thead><tr><th>' + pr('Mẫu', 'Sample') + '</th><th>' + pr('Khi đốt', 'When burnt') + '</th><th>' + pr('Protein?', 'Protein?') + '</th></tr></thead><tbody>' + rows.map((k) => '<tr><td>' + pr(PRO.FIBRE[k].vi, PRO.FIBRE[k].en) + '</td><td>' + pr(PRO.FIBRE[k].burn, PRO.FIBRE[k].burnEn) + '</td><td>' + (PRO.FIBRE[k].protein ? '✓' : '✗') + '</td></tr>').join('') + '</tbody></table>' : ''; };
    U.drag(lab, (cid) => { S.done[cid] = 1; paint(); const f = PRO.FIBRE[cid]; O.say(st, f.protein ? true : null, f.vi + ': ' + f.burn + '.', f.en + ': ' + f.burnEn + '.');
      if (S.done.silk && S.done.nylon) O.say(st, true, 'Cách phân biệt: đốt thử, tơ tằm (tơ tự nhiên, protein) có mùi khét đặc trưng giống tóc cháy; tơ nylon (tơ tổng hợp) thì không.', 'To tell them apart: burn a sample; silk (natural, protein) gives the characteristic burnt smell like hair, while nylon (synthetic) does not.'); });
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-reset]')) { S.done = {}; paint(); O.say(st, null, ''); } });
    paint(); return {};
  }

  /* ------------------------------------------------------------ W31.5 : vai trò protein */
  function proRole(body) {
    const IT = [['cơ bắp', 'muscle', 'st'], ['da, tóc', 'skin, hair', 'st'], ['các enzyme (xúc tác phản ứng sinh hoá)', 'enzymes (catalysts of biochemical reactions)', 'ca'], ['các loại hormone', 'hormones', 'ho'], ['hemoglobin chuyển oxygen đến tế bào', 'haemoglobin carrying oxygen to cells', 'tr'], ['sữa', 'milk', 'fo'], ['trứng', 'eggs', 'fo'], ['thịt, cá', 'meat, fish', 'fo'], ['kén tằm (tơ tằm)', 'silkworm cocoon (silk)', 'fi']];
    EL.sorter(body, { hint: ['Hình 31.2 và mục III: kéo từng thẻ vào vai trò hoặc ứng dụng của protein.', 'Figure 31.2 and section III: drag each card to a role or use of protein.'], boxes: [{ id: 'st', vi: 'Cấu trúc', en: 'Structure' }, { id: 'ca', vi: 'Xúc tác', en: 'Catalyst' }, { id: 'ho', vi: 'Nội tiết tố', en: 'Hormone' }, { id: 'tr', vi: 'Vận chuyển', en: 'Transport' }, { id: 'fo', vi: 'Nguồn thực phẩm', en: 'Food source' }, { id: 'fi', vi: 'Sợi tự nhiên', en: 'Natural fibre' }],
      items: IT.map((x, i) => ({ id: 'r' + i, vi: x[0], en: x[1], to: [x[2]] })),
      note: ['Chọn thực phẩm giàu protein cho chế độ ăn hằng ngày là kiến thức chung theo sách (mục Em có thể), không phải khẩu phần cụ thể cho từng người; hỏi bác sĩ hoặc chuyên gia dinh dưỡng khi cần.', 'Choosing protein-rich food for daily meals is general knowledge from the book (“I can” box), not a personal diet; ask a doctor or nutrition expert when needed.'] });
    return {};
  }

  window.LabSims = Object.assign(window.LabSims || {}, {
    'pep-build': { fn: pepBuild, vi: 'Lắp chuỗi protein từ amino acid (Hình 31.1)', en: 'Building a protein chain from amino acids (Figure 31.1)', intro: 'Kéo amino acid vào vùng chuỗi.' },
    'egg-lab': { fn: eggLab, vi: 'Thí nghiệm lòng trắng trứng', en: 'The egg-white experiment', intro: 'Kéo HCl và ngọn lửa vào từng ống.' },
    'pro-hyd': { fn: proHyd, vi: 'Thuỷ phân protein', en: 'Hydrolysis of a protein', intro: 'Kéo H₂O và xúc tác vào chuỗi.' },
    'fibre-burn': { fn: fibreBurn, vi: 'Phân biệt tơ tằm với tơ nylon', en: 'Telling silk from nylon', intro: 'Kéo mẫu sợi vào ngọn lửa.' },
    'pro-role': { fn: proRole, vi: 'Vai trò và ứng dụng của protein (Hình 31.2)', en: 'Roles and uses of protein (Figure 31.2)', intro: 'Kéo thẻ vào vai trò.' }
  });
})();
