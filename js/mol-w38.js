/* ==========================================================================
   MOL W38 — widget Bài 38 "Nucleic acid và gene" (phần 1). Nạp SAU mol-w37.js. Dùng NucleicLab.engine.
   nuc-sort (W38.1) · dna-build (W38.2, kéo nucleotide bổ sung) · dna-size (W38.3) · gene-func (W38.5) · dna-diversity (W38.4) · dna-gel (W38.6, dữ liệu GIẢ)
   Số liên kết hydrogen A–T 2, G–C 3 là kiến thức bổ sung (sách không nêu số). Màu luôn đi kèm chữ cái.
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab, ML = window.MolLab, EL = window.EnergyLab, NL = window.NucleicLab;
  if (!L || !ML || !ML.org || !ML.org28 || !EL || !NL || !NL.engine) return;
  const { pr, fmt } = L, U = ML.ui, O = ML.org, { $ } = U, N = NL.engine, { EXT } = ML.org28;
  const strip = (s) => String(s).replace(/<[^>]+>/g, ''), aria = (vi, en) => strip(vi) + ' / ' + strip(en);
  const COL = { A: '#dc2626', T: '#2563eb', G: '#16a34a', C: '#d97706', U: '#7c3aed' };
  const base = (b, x, y, w) => `<rect x="${x}" y="${y}" width="${w || 22}" height="22" rx="5" fill="${COL[b]}" stroke="#111" stroke-width="1.4"/><text x="${x + (w || 22) / 2}" y="${y + 16}" text-anchor="middle" style="font:800 13px system-ui" fill="#fff">${b}</text>`;
  const numS = (x) => String(Math.round(x)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  ML.org38 = { COL, base, numS };

  /* ------------------------------------------------------------ W38.1 : phân loại nucleic acid */
  function nucSort(body) {
    const IT = [['Gồm hai mạch xoắn kép', 'Two strands in a double helix', ['dna']], ['Thường một mạch', 'Usually single-stranded', ['rna']], ['Có nucleotide loại T (thymine)', 'Has nucleotide T (thymine)', ['dna']], ['Có nucleotide loại U (uracil)', 'Has nucleotide U (uracil)', ['rna']], ['Có A, G, C', 'Has A, G and C', ['dna', 'rna']], ['Đường deoxyribose', 'Deoxyribose sugar', ['dna']], ['Đường ribose', 'Ribose sugar', ['rna']], ['Lưu giữ thông tin di truyền ở nhân tế bào', 'Stores genetic information in the nucleus', ['dna']], ['Đơn phân là nucleotide', 'Monomer is the nucleotide', ['dna', 'rna']]];
    EL.sorter(body, { hint: ['Kéo mỗi thẻ vào DNA, RNA, hoặc cả hai (một thẻ có thể vào cả hai ô).', 'Drag each card into DNA, RNA, or both (a card can go in both boxes).'], multi: 1, boxes: [{ id: 'dna', vi: 'DNA', en: 'DNA' }, { id: 'rna', vi: 'RNA', en: 'RNA' }], items: IT.map((x, i) => ({ id: 'n' + i, vi: x[0], en: x[1], to: x[2] })), explain: ['DNA và RNA đều là nucleic acid cấu tạo từ nucleotide; DNA hai mạch có T, đường deoxyribose; RNA một mạch có U, đường ribose.', 'DNA and RNA are nucleic acids made of nucleotides; DNA is double-stranded with T and deoxyribose; RNA is single-stranded with U and ribose.'], note: ['Đường deoxyribose/ribose và nơi lưu thông tin chi tiết hơn sách là mở rộng nhẹ.', 'Sugar names and the storage detail go slightly beyond the book.'] });
    return {};
  }

  /* ------------------------------------------------------------ W38.2 : lắp mạch bổ sung */
  function dnaBuild(body) {
    const T0 = 'ATGCTGATCACGT', S = { fill: [], modeRna: false };
    body.innerHTML = `<div class="olab em pw" data-lab><p class="olab__hint">${pr('Cho mạch gốc …ATGCTGATCACGT…, kéo từng nucleotide vào đúng vị trí để lắp mạch bổ sung. A–T, G–C.', 'Given the template …ATGCTGATCACGT…, drag each nucleotide into place to build the complementary strand. A–T, G–C.')}</p><div data-area></div><div class="olab__btns"><button type="button" class="btn btn--sm" data-auto>${pr('Gợi ý một vị trí', 'Hint: fill one')}</button><button type="button" class="btn btn--sm" data-reset>${pr('Đặt lại', 'Reset')}</button></div><p class="olab__status" data-st role="status" aria-live="polite"></p></div>`;
    const lab = $('[data-lab]', body), area = $('[data-area]', lab), st = $('[data-st]', lab);
    const comp = N.comp(T0, 'DNA');
    const draw = () => {
      let svg = `<svg viewBox="0 0 ${T0.length * 26 + 10} 90" class="mol__board" role="img" aria-label="${aria('Mạch gốc và mạch bổ sung', 'Template and complementary strand')}">`;
      for (let i = 0; i < T0.length; i++) { const x = 6 + i * 26; svg += base(T0[i], x, 6, 22) + `<line x1="${x + 11}" y1="30" x2="${x + 11}" y2="58" stroke="#64748b" stroke-width="2" stroke-dasharray="3 2"/>`; if (S.fill[i]) svg += base(S.fill[i], x, 60, 22); else svg += `<rect x="${x}" y="60" width="22" height="22" rx="5" fill="none" stroke="#64748b" stroke-dasharray="3 2"/>`; }
      svg += '</svg>';
      let zs = '<div style="display:flex;flex-wrap:wrap;gap:3px">' + [...T0].map((b, i) => O.zone('p' + i, S.fill[i] ? '✓' + S.fill[i] : String(i + 1), aria('Vị trí ' + (i + 1) + ' đối diện ' + b, 'Position ' + (i + 1) + ' opposite ' + b), S.fill[i] ? 'is-ok' : '')).join('') + '</div>';
      area.innerHTML = svg + `<div>${['A', 'T', 'G', 'C'].map((b) => O.chip('b' + b, b, b)).join('')}</div>` + zs + `<p><small>${pr('Mạch gốc 5′ → 3′ ở trên; mạch bổ sung viết theo vị trí tương ứng, không đảo chiều (Hình 38.2).', 'Template on top; the complementary strand is written position by position, not reversed (Figure 38.2).')}</small></p>`;
    };
    const place = (cid, zid) => {
      const i = +String(zid).slice(1), b = String(cid).slice(1);
      if (zid[0] !== 'p' || isNaN(i)) return;
      if (N.pairStatus(T0[i], b, 'DNA').matched) { S.fill[i] = b; O.say(st, true, `✓ ${T0[i]}–${b}: ${N.pairStatus(T0[i], b, 'DNA').hBonds} liên kết hydrogen (kiến thức bổ sung).`, `✓ ${T0[i]}–${b}: ${N.pairStatus(T0[i], b, 'DNA').hBonds} hydrogen bonds (supplementary).`); }
      else O.say(st, false, `${T0[i]} chỉ bắt cặp với ${comp[i]} (A–T, G–C).`, `${T0[i]} pairs only with ${comp[i]} (A–T, G–C).`);
      draw();
      if (S.fill.filter(Boolean).length === T0.length) O.say(st, true, 'Hoàn thành: …TACGACTAGTGCA… — mạch bổ sung. Hai mạch giống hệt nhau về thông tin nên DNA nhân đôi được.', 'Done: …TACGACTAGTGCA… — the complementary strand. Each strand specifies the other, which lets DNA be copied.');
    };
    U.drag(lab, place);
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-reset]')) { S.fill = []; O.say(st, null, ''); draw(); } else if (e.target.closest('[data-auto]')) { for (let i = 0; i < T0.length; i++) if (!S.fill[i]) { S.fill[i] = comp[i]; break; } draw(); } });
    draw(); return {};
  }

  /* ------------------------------------------------------------ W38.3 : kích thước DNA */
  function dnaSize(body) {
    const P = { e: 3 };                                       // 10^e cặp nucleotide ... 0..9
    body.innerHTML = `<div class="olab em" data-lab><p class="olab__hint">${pr('Kéo thanh trượt số cặp nucleotide (thang logarit) để xem chiều dài, số vòng xoắn.', 'Drag the base-pair slider (log scale) to see length and helical turns.')} ${EXT('3,4 Å mỗi cặp và 10 cặp mỗi vòng xoắn là số liệu bổ sung', '3.4 Å per pair and 10 pairs per turn are supplementary figures')}</p>${U.ctl('e', 'Số cặp nucleotide = 10^x', 'Base pairs = 10^x', 1, 9, 0.1, P.e, '')}<div data-area></div></div>`;
    const lab = $('[data-lab]', body), area = $('[data-area]', lab);
    const REF = [[1e3, 'một gene nhỏ (600–1 500 cặp)', 'a small gene (600–1,500 pairs)'], [4.6e6, 'vi khuẩn E. coli (≈ 4,6 triệu cặp)', 'E. coli bacterium (≈ 4.6 million pairs)'], [3.1e9, 'bộ gene người (≈ 3,1 tỉ cặp)', 'human genome (≈ 3.1 billion pairs)']];
    const draw = () => {
      const n = Math.pow(10, P.e), A = N.lengthA(n), nm = A / 10, mm = nm / 1e6;
      const near = REF.reduce((b, r) => (Math.abs(Math.log10(r[0]) - P.e) < Math.abs(Math.log10(b[0]) - P.e) ? r : b), REF[0]);
      area.innerHTML = `<table class="olab__tbl"><tbody><tr><th>${pr('Số cặp nucleotide', 'Base pairs')}</th><td><b>${numS(n)}</b></td></tr><tr><th>${pr('Chiều dài', 'Length')}</th><td>${numS(A)} Å = ${fmt(nm, nm < 10 ? 1 : 0)} nm = ${mm < 0.01 ? fmt(mm * 1000, 2) + ' µm' : fmt(mm, 3) + ' mm'}</td></tr><tr><th>${pr('Số vòng xoắn', 'Helical turns')}</th><td>${numS(N.turns(n))}</td></tr><tr><th>${pr('Gần với', 'Closest to')}</th><td>${pr(near[1], near[2])}</td></tr></tbody></table><p><small>${pr('Bề rộng DNA chỉ khoảng 2 nm nhưng dài hàng trăm micromet nên phải cuộn gấp trong nhân.', 'DNA is only about 2 nm wide yet hundreds of micrometres long, so it is coiled and folded inside the nucleus.')}</small></p>`;
    };
    U.bindCtl(lab, P, draw); draw(); return { state: P };
  }

  /* ------------------------------------------------------------ W38.4 : đa dạng DNA */
  function dnaDiversity(body) {
    const P = { n: 4 };
    body.innerHTML = `<div class="olab em" data-lab><p class="olab__hint">${pr('Mỗi vị trí có 4 lựa chọn A, T, G, C: đoạn n nucleotide có 4ⁿ trình tự khác nhau.', 'Each position has 4 choices (A, T, G, C): a segment of n nucleotides has 4ⁿ different sequences.')}</p>${U.ctl('n', 'Số nucleotide n', 'Nucleotides n', 1, 30, 1, P.n)}<div data-area></div><div class="olab__btns"><button type="button" class="btn btn--sm" data-rnd>${pr('Sinh trình tự ngẫu nhiên', 'Random sequence')}</button></div></div>`;
    const lab = $('[data-lab]', body), area = $('[data-area]', lab); let seed = 5;
    const draw = () => {
      const r = N.prng ? null : null; let s = '', a = seed >>> 0 || 1; for (let i = 0; i < P.n; i++) { a = (Math.imul(a, 1664525) + 1013904223) >>> 0; s += 'ATGC'[a >>> 30]; }
      const c = N.combos(P.n);
      area.innerHTML = `<p style="font-family:monospace;word-break:break-all"><b>${s}</b></p><p>${pr('Số trình tự có thể', 'Possible sequences')}: 4<sup>${P.n}</sup> = <b>${c >= 1e9 ? fmt(c / Math.pow(10, Math.floor(Math.log10(c))), 2) + ' × 10^' + Math.floor(Math.log10(c)) : numS(c)}</b></p><p><small>${pr('Sự đa dạng của DNA nằm ở trình tự và số lượng nucleotide; điều này giải thích vì sao có nhiều gene khác nhau.', 'DNA diversity lies in the order and number of nucleotides; this explains why there are so many different genes.')}</small></p>`;
    };
    U.bindCtl(lab, P, draw);
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-rnd]')) { seed += 977; draw(); } });
    draw(); return { state: P };
  }

  /* ------------------------------------------------------------ W38.5 : gene và chức năng */
  function geneFunc(body) {
    const S = { a: 0, b: 0, show: false };
    const SEQ = 'TTAGCCATGCCTAAGGCTTAGGATCCGTA', GS = 6, GE = 17;           // đoạn tô là “gene” (hư cấu)
    body.innerHTML = `<div class="olab em pw" data-lab><p class="olab__hint">${pr('Một đoạn DNA hư cấu dài ' + SEQ.length + ' nucleotide. Bấm vào hai vị trí để đánh dấu đầu và cuối của một gene; gene là đoạn DNA mang thông tin quy định một sản phẩm (RNA hoặc protein).', 'A fictional DNA stretch of ' + SEQ.length + ' nucleotides. Click two positions to mark the start and end of a gene; a gene is a DNA segment carrying information for a product (RNA or protein).')}</p><div data-area></div><div class="olab__btns"><button type="button" class="btn btn--sm" data-show>${pr('Xem đáp án', 'Show answer')}</button><button type="button" class="btn btn--sm" data-reset>${pr('Đặt lại', 'Reset')}</button></div><p class="olab__status" data-st role="status" aria-live="polite"></p></div>`;
    const lab = $('[data-lab]', body), area = $('[data-area]', lab), st = $('[data-st]', lab);
    const draw = () => {
      const lo = S.b ? Math.min(S.a, S.b) : S.a, hi = S.b ? Math.max(S.a, S.b) : S.a;
      area.innerHTML = '<div style="display:flex;flex-wrap:wrap;gap:2px;font-family:monospace">' + [...SEQ].map((c, i) => { const inS = S.a && i + 1 >= lo && i + 1 <= hi, ans = S.show && i >= GS && i <= GE; return `<button type="button" class="btn btn--sm" data-i="${i + 1}" aria-pressed="${inS ? 'true' : 'false'}" aria-label="${aria('vị trí ' + (i + 1) + ' ' + c, 'position ' + (i + 1) + ' ' + c)}" style="min-width:26px;${inS ? 'outline:3px solid #7c3aed;font-weight:800' : ''}${ans ? ';border-bottom:4px solid #16a34a' : ''}">${c}</button>`; }).join('') + '</div>' + (S.a ? `<p>${pr('Đoạn đã chọn', 'Selected segment')}: ${lo}–${hi} (${hi - lo + 1} ${pr('nucleotide', 'nucleotides')})</p>` : '');
    };
    lab.addEventListener('click', (e) => {
      const b = e.target.closest('[data-i]');
      if (b) { const i = +b.dataset.i; if (!S.a || S.b) { S.a = i; S.b = 0; O.say(st, null, 'Chọn vị trí cuối.', 'Pick the end position.'); } else { S.b = i; const lo = Math.min(S.a, S.b) - 1, hi = Math.max(S.a, S.b) - 1, ok = lo === GS && hi === GE; O.say(st, ok, ok ? 'Đúng ví dụ: đây là đoạn gene hư cấu (khởi đầu ATG…). Mỗi gene là một đoạn DNA xác định, các đoạn còn lại không phải gene này.' : 'Gene hư cấu ở vị trí ' + (GS + 1) + '–' + (GE + 1) + ' (bắt đầu bằng ATG). Thử lại hoặc bấm “Xem đáp án”.', ok ? 'Right: this is the fictional gene (starting ATG…). A gene is one defined segment; the rest does not belong to this gene.' : 'The fictional gene is at ' + (GS + 1) + '–' + (GE + 1) + ' (starts with ATG). Try again or press “Show answer”.'); } draw(); return; }
      if (e.target.closest('[data-show]')) { S.show = true; draw(); } else if (e.target.closest('[data-reset]')) { Object.assign(S, { a: 0, b: 0, show: false }); O.say(st, null, ''); draw(); }
    });
    draw(); return {};
  }

  /* ------------------------------------------------------------ W38.6 : gel DNA (dữ liệu GIẢ) */
  function dnaGel(body) {
    const P = { seed: 4 };
    body.innerHTML = `<div class="olab em" data-lab><p class="olab__hint">${pr('Mỗi người có DNA riêng: bảng băng DNA (dữ liệu giả lập, không phải người thật). Chọn một người con và tìm bố mẹ.', 'Each person has a distinct DNA pattern: DNA band table (simulated data, not real people). Pick a child and find the parents.')} ${EXT('gel điện di là mở rộng ngoài SGK', 'gel electrophoresis is beyond the book')}</p><div data-area></div><div class="olab__btns"><button type="button" class="btn btn--sm" data-new>${pr('Gia đình khác', 'Another family')}</button></div><p class="olab__status" data-st role="status" aria-live="polite"></p></div>`;
    const lab = $('[data-lab]', body), area = $('[data-area]', lab), st = $('[data-st]', lab);
    let sel = 0;
    const draw = () => {
      const F = N.family(P.seed), rows = [['Mẹ', 'Mother', F.mom], ['Bố', 'Father', F.dad], ['Con 1', 'Child 1', F.kids[0]], ['Con 2', 'Child 2', F.kids[1]], ['Người lạ', 'Stranger', F.stranger]];
      const k = F.kids[sel], mm = N.match(F.mom, k), dm = N.match(F.dad, k);
      area.innerHTML = `<label class="olab__ctl"><span>${pr('Chọn người con', 'Pick the child')}</span><select data-c><option value="0"${sel === 0 ? ' selected' : ''}>${pr('Con 1', 'Child 1')}</option><option value="1"${sel === 1 ? ' selected' : ''}>${pr('Con 2', 'Child 2')}</option></select></label><div style="overflow-x:auto"><table class="olab__tbl"><thead><tr><th></th>${F.mom.map((_, i) => `<th>${pr('Vị trí', 'Locus')} ${i + 1}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr><th>${pr(r[0], r[1])}</th>${r[2].map((p, i) => { const sh = r[1] !== 'Child 1' && r[1] !== 'Child 2' && (p[0] === k[i][0] || p[0] === k[i][1] || p[1] === k[i][0] || p[1] === k[i][1]); return `<td>${p[0]}/${p[1]}${sh ? ' ◆' : ''}</td>`; }).join('')}</tr>`).join('')}</tbody></table></div><p><small>◆ = ${pr('có băng trùng với người con đã chọn', 'shares a band with the chosen child')}. ${pr('Số là kích thước băng (đơn vị tuỳ ý).', 'Numbers are band sizes (arbitrary units).')}</small></p>`;
      const kid = N.isChildOf(k, F.mom, F.dad), str = N.isChildOf(k, F.stranger, F.dad);
      O.say(st, null, `Con có băng từ mẹ ở ${mm.shared ? 'một số' : 'không'} vị trí; ${kid ? 'mỗi băng của con đều có ở mẹ hoặc bố ⇒ phù hợp là con của cặp này.' : ''} ${str ? '' : 'Với người lạ thì có băng không khớp ⇒ không phải bố/mẹ.'}`, `${kid ? 'Every band of the child appears in the mother or the father ⇒ consistent with being their child. ' : ''}${str ? '' : 'With the stranger some bands do not match ⇒ not a parent.'}`);
    };
    lab.addEventListener('change', (e) => { if (e.target.matches('[data-c]')) { sel = +e.target.value; draw(); } });
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-new]')) { P.seed += 5; draw(); } });
    draw(); return {};
  }

  window.LabSims = Object.assign(window.LabSims || {}, {
    'nuc-sort': { fn: nucSort, vi: 'Phân loại DNA và RNA', en: 'Sorting DNA and RNA', intro: 'Kéo thẻ vào DNA, RNA hoặc cả hai.' },
    'dna-build': { fn: dnaBuild, vi: 'Lắp mạch bổ sung (Hình 38.2)', en: 'Building the complementary strand (Figure 38.2)', intro: 'Kéo nucleotide vào đúng vị trí.' },
    'dna-size': { fn: dnaSize, vi: 'Kích thước DNA', en: 'DNA size', intro: 'Kéo thanh trượt số cặp.' },
    'dna-diversity': { fn: dnaDiversity, vi: 'Đa dạng DNA: 4ⁿ', en: 'DNA diversity: 4ⁿ', intro: 'Kéo thanh trượt n.' },
    'gene-func': { fn: geneFunc, vi: 'Gene là đoạn DNA', en: 'A gene is a DNA segment', intro: 'Đánh dấu đầu và cuối gene.' },
    'dna-gel': { fn: dnaGel, vi: 'Dấu vân DNA (dữ liệu giả)', en: 'DNA fingerprint (simulated data)', intro: 'Tìm bố mẹ của người con.' }
  });
})();
