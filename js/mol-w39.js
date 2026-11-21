/* ==========================================================================
   MOL W39 — widget Bài 39–41 (Đợt 14). Nạp SAU mol-w38b.js. Dùng GeneCode.engine (gene-code.js) và NucleicLab.engine.
   Bài 39: dna-replic · transcribe-lab · repl-trans
   Bài 40: code-count · codon-table · nirenberg · translate-lab · gene-trait · ch11-review2
   Bài 41: gene-mut · abo-blood · mut-effect
   Màu luôn kèm chữ cái; có bàn phím (chọn rồi đặt); nhãn “mở rộng (ngoài SGK)”; dữ liệu hư cấu.
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab, ML = window.MolLab, EL = window.EnergyLab, NL = window.NucleicLab, GC = window.GeneCode;
  if (!L || !ML || !ML.org || !ML.org38 || !ML.org28 || !EL || !NL || !GC) return;
  const { pr, fmt } = L, U = ML.ui, O = ML.org, { $ } = U, N = NL.engine, C = GC.engine, { EXT } = ML.org28, { COL, base, numS } = ML.org38;
  const strip = (s) => String(s).replace(/<[^>]+>/g, ''), aria = (vi, en) => strip(vi) + ' / ' + strip(en);
  const EXTL = EXT('mở rộng (ngoài SGK)', 'extension (beyond the book)');
  const seqRow = (s, hl) => `<div style="display:flex;flex-wrap:wrap;gap:2px">` + [...s].map((c, i) => `<span style="min-width:22px;text-align:center;padding:2px;border-radius:4px;background:${COL[c] || '#94a3b8'};color:#fff;font:800 13px monospace${hl && hl.indexOf(i) >= 0 ? ';outline:3px solid #111' : ''}">${c}</span>`).join('') + '</div>';
  const mcq = (body, hv, he, Q) => {
    const S = { a: {} };
    body.innerHTML = `<div class="olab em" data-lab><p class="olab__hint">${pr(hv, he)}</p><div data-area></div><div class="olab__btns"><button type="button" class="btn btn--sm" data-reset>${pr('Làm lại', 'Reset')}</button></div></div>`;
    const lab = $('[data-lab]', body), area = $('[data-area]', lab);
    const draw = () => { const ok = Object.keys(S.a).filter((k) => S.a[k] === Q[k][4]).length; area.innerHTML = Q.map((q, i) => `<fieldset><legend>${i + 1}. ${pr(q[0], q[1])}</legend>${q[2].map((o, j) => `<label style="display:block"><input type="radio" name="q${i}" value="${j}"${S.a[i] === j ? ' checked' : ''}> ${pr(o, q[3][j])}</label>`).join('')}${S.a[i] != null ? `<small>${S.a[i] === q[4] ? '✓ ' + pr('Đúng', 'Correct') : '✗ ' + pr('Chưa đúng — đáp án: ', 'Not right — answer: ') + pr(q[2][q[4]], q[3][q[4]])}</small>` : ''}</fieldset>`).join('') + `<p><b>${pr('Điểm', 'Score')}: ${ok} / ${Q.length}</b></p>`; };
    lab.addEventListener('change', (e) => { if (e.target.name && e.target.name[0] === 'q') { S.a[+e.target.name.slice(1)] = +e.target.value; draw(); } });
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-reset]')) { S.a = {}; draw(); } });
    draw(); return {};
  };

  /* ------------------------------------------------------------ W39.1 : tái bản DNA */
  function dnaReplic(body) {
    const S1 = 'AAGCTCGCGATAGCC', S2 = N.comp(S1, 'DNA'), S = { st: 0, a: [], b: [] };
    body.innerHTML = `<div class="olab em pw" data-lab><p class="olab__hint">${pr('Đoạn DNA trong câu hỏi của sách. Bấm tháo xoắn, kéo nucleotide tự do vào từng vị trí của hai mạch khuôn (A–T, G–C), rồi xem hai DNA mới.', 'The DNA segment from the book’s question. Press unwind, drag free nucleotides onto each template (A–T, G–C), then see the two new DNA molecules.')}</p><div data-area></div><div class="olab__btns"><button type="button" class="btn btn--sm btn--primary" data-unw>${pr('1. Tháo xoắn (enzyme)', '1. Unwind (enzyme)')}</button><button type="button" class="btn btn--sm" data-auto>${pr('Tự điền giúp', 'Fill for me')}</button><button type="button" class="btn btn--sm" data-reset>${pr('Đặt lại', 'Reset')}</button></div><p class="olab__status" data-st role="status" aria-live="polite"></p></div>`;
    const lab = $('[data-lab]', body), area = $('[data-area]', lab), st = $('[data-st]', lab);
    const zones = (pre, tpl, arr) => '<div style="display:flex;flex-wrap:wrap;gap:2px">' + [...tpl].map((c, i) => O.zone(pre + i, arr[i] ? arr[i] : String(i + 1), aria('đối diện ' + c, 'opposite ' + c), arr[i] ? 'is-ok' : '')).join('') + '</div>';
    const draw = () => {
      let h = `<p><b>${pr('Mạch 1 (khuôn)', 'Strand 1 (template)')}</b></p>${seqRow(S1)}`;
      if (S.st === 0) h += `<p><b>${pr('Mạch 2', 'Strand 2')}</b> (${pr('đang xoắn với mạch 1', 'coiled with strand 1')})</p>${seqRow(S2)}`;
      else {
        h += `<p>${pr('Mạch mới bên mạch 1', 'New strand beside strand 1')}</p>${zones('n1-', S1, S.a)}<p><b>${pr('Mạch 2 (khuôn)', 'Strand 2 (template)')}</b></p>${seqRow(S2)}<p>${pr('Mạch mới bên mạch 2', 'New strand beside strand 2')}</p>${zones('n2-', S2, S.b)}<div>${['A', 'T', 'G', 'C'].map((b) => O.chip('b' + b, b, b)).join('')}</div>`;
        const full = S.a.filter(Boolean).length === S1.length && S.b.filter(Boolean).length === S2.length;
        if (full) { const r = C.replNeeds(S1); h += `<h4>${pr('Giai đoạn 3: hai DNA mới', 'Stage 3: two new DNA molecules')}</h4><p>DNA 1: ${pr('mạch cũ', 'old strand')} ${S1} + ${pr('mạch mới', 'new strand')} ${S.a.join('')}</p><p>DNA 2: ${pr('mạch cũ', 'old strand')} ${S2} + ${pr('mạch mới', 'new strand')} ${S.b.join('')}</p><p><b>${pr('Hai DNA mới giống hệt nhau và giống DNA ban đầu.', 'The two new DNA molecules are identical to each other and to the original.')}</b> ${pr('Nucleotide tự do đã dùng', 'Free nucleotides used')}: ${r.total} (A = ${r.A}, T = ${r.T}, G = ${r.G}, C = ${r.C}).</p>`; }
      }
      area.innerHTML = h;
    };
    const place = (cid, zid) => {
      const m = /^n([12])-(\d+)$/.exec(zid); if (!m) return; const i = +m[2], b = String(cid).slice(1), tpl = m[1] === '1' ? S1 : S2, arr = m[1] === '1' ? S.a : S.b;
      if (N.pairStatus(tpl[i], b, 'DNA').matched) { arr[i] = b; O.say(st, true, `✓ ${tpl[i]}–${b}: ${N.pairStatus(tpl[i], b, 'DNA').hBonds} liên kết hydrogen (bổ sung ngoài SGK).`, `✓ ${tpl[i]}–${b}: ${N.pairStatus(tpl[i], b, 'DNA').hBonds} hydrogen bonds (supplementary).`); } else O.say(st, false, `${tpl[i]} chỉ ghép với ${N.comp(tpl[i], 'DNA')} (A–T, G–C).`, `${tpl[i]} pairs only with ${N.comp(tpl[i], 'DNA')} (A–T, G–C).`);
      draw();
    };
    U.drag(lab, place);
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-unw]')) { S.st = 1; O.say(st, true, 'Enzyme tháo xoắn tách DNA thành hai mạch đơn. Giờ ghép nucleotide.', 'The unwinding enzyme separates DNA into two single strands. Now add nucleotides.'); draw(); } else if (e.target.closest('[data-auto]')) { S.st = 1; S.a = [...N.comp(S1, 'DNA')]; S.b = [...N.comp(S2, 'DNA')]; draw(); } else if (e.target.closest('[data-reset]')) { Object.assign(S, { st: 0, a: [], b: [] }); O.say(st, null, ''); draw(); } });
    draw(); return {};
  }

  /* ------------------------------------------------------------ W39.2 : phiên mã */
  function transcribeLab(body) {
    const X = 'TACGGCATTCCG', Y = N.comp(X, 'DNA'), S = { tpl: null, m: [] };
    body.innerHTML = `<div class="olab em pw" data-lab><p class="olab__hint">${pr('Một đoạn gene (mô hình) có hai mạch. Chọn mạch khuôn, rồi kéo nucleotide RNA vào từng vị trí (A–U, T–A, G–C, C–G).', 'A model gene segment with two strands. Choose the template strand, then drag RNA nucleotides into place (A–U, T–A, G–C, C–G).')} ${EXTL}</p><div data-area></div><div class="olab__btns"><button type="button" class="btn btn--sm" data-pick="X">${pr('Mạch khuôn = mạch trên', 'Template = upper strand')}</button><button type="button" class="btn btn--sm" data-pick="Y">${pr('Mạch khuôn = mạch dưới', 'Template = lower strand')}</button><button type="button" class="btn btn--sm" data-auto>${pr('Tự điền', 'Fill for me')}</button><button type="button" class="btn btn--sm" data-reset>${pr('Đặt lại', 'Reset')}</button></div><p class="olab__status" data-st role="status" aria-live="polite"></p></div>`;
    const lab = $('[data-lab]', body), area = $('[data-area]', lab), st = $('[data-st]', lab);
    const tpl = () => (S.tpl === 'X' ? X : Y);
    const draw = () => {
      let h = `<p>${pr('Mạch trên', 'Upper strand')} 3′ ${seqRow(X)}</p><p>${pr('Mạch dưới', 'Lower strand')} 5′ ${seqRow(Y)}</p>`;
      if (S.tpl) { const t = tpl(); h += `<p><b>${pr('Mạch khuôn đã chọn', 'Chosen template')}: ${S.tpl === 'X' ? pr('mạch trên', 'upper') : pr('mạch dưới', 'lower')}</b></p><p>mRNA</p><div style="display:flex;flex-wrap:wrap;gap:2px">${[...t].map((c, i) => O.zone('m' + i, S.m[i] || String(i + 1), aria('đối diện ' + c, 'opposite ' + c), S.m[i] ? 'is-ok' : '')).join('')}</div><div>${['A', 'U', 'G', 'C'].map((b) => O.chip('r' + b, b, b)).join('')}</div>`;
        if (S.m.filter(Boolean).length === t.length) { const r = S.m.join(''), tl = C.translate(r); h += `<p><b>mRNA: ${r}</b></p><p>${pr('Dịch thử', 'Trial translation')}: ${tl.aas.length ? tl.aas.join(' – ') + (tl.stop ? ' – (stop)' : '') : pr('không có AUG mở đầu', 'no AUG start')}</p><p><small>${pr('So với mạch còn lại: chỉ khác T → U.', 'Compared with the other strand: only T → U differs.')}</small></p>`; } }
      area.innerHTML = h;
    };
    const place = (cid, zid) => {
      if (!S.tpl) { O.say(st, false, 'Chọn mạch khuôn trước.', 'Choose the template strand first.'); return; }
      const i = +String(zid).slice(1), b = String(cid).slice(1), t = tpl();
      if (zid[0] !== 'm' || isNaN(i)) return; const want = N.transcribePreview(t)[i];
      if (b === want) { S.m[i] = b; O.say(st, true, `✓ ${t[i]} → ${b}`, `✓ ${t[i]} → ${b}`); } else O.say(st, false, `${t[i]} ghép với ${want} (A–U, T–A, G–C, C–G).`, `${t[i]} pairs with ${want} (A–U, T–A, G–C, C–G).`);
      draw();
    };
    U.drag(lab, place);
    lab.addEventListener('click', (e) => { const p = e.target.closest('[data-pick]'); if (p) { S.tpl = p.dataset.pick; S.m = []; O.say(st, null, 'RNA polymerase tách hai mạch; một mạch làm khuôn.', 'RNA polymerase separates the strands; one is the template.'); draw(); } else if (e.target.closest('[data-auto]')) { if (!S.tpl) S.tpl = 'X'; S.m = [...N.transcribePreview(tpl())]; draw(); } else if (e.target.closest('[data-reset]')) { S.tpl = null; S.m = []; O.say(st, null, ''); draw(); } });
    draw(); return {};
  }

  /* ------------------------------------------------------------ W39.3 : so sánh + đếm nucleotide */
  function replTrans(body) {
    const [a, b] = U.wrap(body, 2);
    const IT = [['Sản phẩm là DNA', 'Product is DNA', ['re']], ['Sản phẩm là RNA', 'Product is RNA', ['tr']], ['Dùng cả hai mạch DNA làm khuôn', 'Uses both DNA strands as templates', ['re']], ['Dùng một mạch của gene làm khuôn', 'Uses one strand of a gene as template', ['tr']], ['Theo nguyên tắc bổ sung', 'Follows complementary pairing', ['re', 'tr']], ['Có nucleotide T', 'Has nucleotide T', ['re']], ['Có nucleotide U', 'Has nucleotide U', ['tr']], ['Diễn ra trong nhân (sinh vật nhân thực)', 'Takes place in the nucleus (eukaryotes)', ['re', 'tr']], ['Cần enzyme', 'Needs enzymes', ['re', 'tr']], ['Tạo hai DNA giống nhau', 'Makes two identical DNA molecules', ['re']]];
    EL.sorter(a, { hint: ['Kéo mỗi thẻ vào tái bản DNA, phiên mã hoặc cả hai.', 'Drag each card into DNA replication, transcription or both.'], multi: 1, boxes: [{ id: 're', vi: 'Tái bản DNA', en: 'DNA replication' }, { id: 'tr', vi: 'Phiên mã', en: 'Transcription' }], items: IT.map((x, i) => ({ id: 'c' + i, vi: x[0], en: x[1], to: x[2] })), explain: ['Tái bản tạo DNA từ cả hai mạch; phiên mã tạo RNA từ một mạch.', 'Replication makes DNA from both strands; transcription makes RNA from one strand.'] });
    b.innerHTML = `<div class="olab em" data-lab><p class="olab__hint">${pr('Bộ đếm nucleotide: nhập một mạch DNA (A, T, G, C) để biết số nucleotide mỗi loại cần cho một lần tái bản và cho phiên mã mạch đó làm khuôn.', 'Nucleotide counter: enter a DNA strand (A, T, G, C) to see how many nucleotides of each kind one round of replication and transcription from it as template need.')}</p><label class="olab__ctl"><span>${pr('Mạch DNA', 'DNA strand')}</span><input type="text" data-in value="AAGCTCGCGATAGCC" maxlength="40" aria-label="DNA strand"></label><div data-area></div></div>`;
    const lab = $('[data-lab]', b), area = $('[data-area]', lab);
    const draw = () => { const s = N.clean($('[data-in]', lab).value, 'DNA').seq, r = C.replNeeds(s), t = C.transcrNeeds(s); area.innerHTML = `<table class="olab__tbl"><thead><tr><th></th><th>A</th><th>T</th><th>U</th><th>G</th><th>C</th><th>${pr('Tổng', 'Total')}</th></tr></thead><tbody><tr><th>${pr('Tái bản (1 lần)', 'Replication (once)')}</th><td>${r.A}</td><td>${r.T}</td><td>0</td><td>${r.G}</td><td>${r.C}</td><td><b>${r.total}</b></td></tr><tr><th>${pr('Phiên mã (mạch này làm khuôn)', 'Transcription (this strand as template)')}</th><td>0</td><td>0</td><td>${t.U}</td><td>${t.G}</td><td>${t.C}</td><td><b>${t.total}</b></td></tr></tbody></table><p><small>${pr('Tái bản cần nucleotide A, T, G, C bằng tổng số A+T hoặc G+C của cả hai mạch; phiên mã cần A, U, G, C.', 'Replication needs A, T, G, C totalling the A+T or G+C of both strands; transcription needs A, U, G, C.')}</small></p>`; };
    lab.addEventListener('input', (e) => { if (e.target.matches('[data-in]')) draw(); }); draw(); return {};
  }

  /* ------------------------------------------------------------ W40.1 : Bảng 40.1 */
  function codeCount(body) {
    const P = { n: 3 };
    body.innerHTML = `<div class="olab em" data-lab><p class="olab__hint">${pr('Kéo thanh trượt n: số loại mã (bộ n nucleotide) là 4ⁿ. Tìm n nhỏ nhất đủ mã hoá 20 amino acid.', 'Drag n: the number of code words (runs of n nucleotides) is 4ⁿ. Find the smallest n able to encode 20 amino acids.')}</p>${U.ctl('n', 'Số nucleotide trong mã n', 'Nucleotides per code word n', 1, 6, 1, P.n)}<div data-area></div><p class="olab__status" data-st role="status" aria-live="polite"></p></div>`;
    const lab = $('[data-lab]', body), area = $('[data-area]', lab), st = $('[data-st]', lab);
    const draw = () => { let h = `<table class="olab__tbl"><thead><tr><th>n</th><th>${pr('Số loại mã', 'Code words')}</th><th>${pr('Đủ cho 20 amino acid?', 'Enough for 20 amino acids?')}</th></tr></thead><tbody>`; for (let n = 1; n <= 6; n++) h += `<tr${n === P.n ? ' style="font-weight:700;background:rgba(124,58,237,.12)"' : ''}><td>${n}</td><td>4<sup>${n}</sup> = ${numS(Math.pow(4, n))}</td><td>${Math.pow(4, n) >= 20 ? '✔ ' + pr('đủ', 'enough') : '✗ ' + pr('thiếu', 'too few')}</td></tr>`; area.innerHTML = h + '</tbody></table>'; O.say(st, P.n === 3 ? true : null, P.n === 3 ? 'n = 3: 64 mã ≥ 20, tiết kiệm nhất (n = 2 chỉ có 16). Đó là bộ ba (codon).' : P.n < 3 ? `n = ${P.n}: chỉ ${Math.pow(4, P.n)} mã, chưa đủ cho 20 amino acid.` : `n = ${P.n}: dư thừa, tế bào không cần nhiều nucleotide như vậy.`, P.n === 3 ? 'n = 3: 64 code words ≥ 20, the most economical (n = 2 gives only 16). This is the triplet (codon).' : P.n < 3 ? `n = ${P.n}: only ${Math.pow(4, P.n)} words, not enough for 20 amino acids.` : `n = ${P.n}: more than needed; the cell does not need so many nucleotides.`); };
    U.bindCtl(lab, P, draw); draw(); return { state: P };
  }

  /* ------------------------------------------------------------ W40.2 : bảng mã */
  function codonTable(body) {
    const S = { sel: 'AUG', hl: false, mrna: 'AUGUUUGGGCCCUAA' };
    body.innerHTML = `<div class="olab em" data-lab><p class="olab__hint">${pr('Bảng mã di truyền (Hình 40.1): bấm một codon. Bật “tô codon cùng nghĩa” để thấy chúng thường khác nhau ở nucleotide thứ ba.', 'The genetic-code table (Figure 40.1): click a codon. Turn on “highlight synonymous codons” to see they usually differ in the third nucleotide.')}</p><label><input type="checkbox" data-hl> ${pr('Tô codon cùng nghĩa với codon đang chọn', 'Highlight codons synonymous with the selected one')}</label><div data-area style="overflow-x:auto"></div><label class="olab__ctl"><span>${pr('Dịch nhanh mRNA (từ AUG)', 'Quick translate an mRNA (from AUG)')}</span><input type="text" data-in value="${S.mrna}" maxlength="45" aria-label="mRNA"></label><div data-out></div><p class="olab__status" data-st role="status" aria-live="polite"></p></div>`;
    const lab = $('[data-lab]', body), area = $('[data-area]', lab), st = $('[data-st]', lab), out = $('[data-out]', lab);
    const draw = () => {
      const sel = C.CODE[S.sel]; let h = '<table class="olab__tbl"><thead><tr><th>1\\2</th>' + [...'UCAG'].map((b) => `<th>${b}</th>`).join('') + '</tr></thead><tbody>';
      [...'UCAG'].forEach((a) => { h += `<tr><th>${a}</th>` + [...'UCAG'].map((b) => '<td>' + [...'UCAG'].map((c) => { const k = a + b + c, x = C.CODE[k], same = S.hl && sel && (x.one === sel.one); return `<button type="button" class="btn btn--sm" data-c="${k}" aria-pressed="${k === S.sel}" style="display:block;width:100%;font:600 11px monospace;${k === S.sel ? 'outline:3px solid #7c3aed;' : ''}${same ? 'background:rgba(34,197,94,.35);' : ''}${x.stop ? 'border:2px dashed #dc2626;' : ''}">${k} ${x.stop ? pr('KT', 'Stop') : x.aa}</button>`; }).join('') + '</td>').join('') + '</tr>'; });
      area.innerHTML = h + '</tbody></table>';
      O.say(st, null, sel ? `${S.sel}: ${sel.stop ? 'codon kết thúc' : sel.aa}${S.sel === 'AUG' ? ' (codon mở đầu, mã hoá methionine)' : ''}.` : '', sel ? `${S.sel}: ${sel.stop ? 'stop codon' : sel.aa}${S.sel === 'AUG' ? ' (start codon, codes for methionine)' : ''}.` : '');
      const t = C.translate(S.mrna); out.innerHTML = `<p>${pr('Chuỗi amino acid', 'Amino-acid chain')}: <b>${t.aas.length ? t.aas.join(' – ') : '—'}</b>${t.stop ? ' ⏹ (stop)' : ''}</p>`;
    };
    lab.addEventListener('click', (e) => { const c = e.target.closest('[data-c]'); if (c) { S.sel = c.dataset.c; draw(); } });
    lab.addEventListener('change', (e) => { if (e.target.matches('[data-hl]')) { S.hl = e.target.checked; draw(); } });
    lab.addEventListener('input', (e) => { if (e.target.matches('[data-in]')) { S.mrna = e.target.value.toUpperCase(); out.innerHTML = ''; const t = C.translate(S.mrna); out.innerHTML = `<p>${pr('Chuỗi amino acid', 'Amino-acid chain')}: <b>${t.aas.length ? t.aas.join(' – ') : '—'}</b>${t.stop ? ' ⏹ (stop)' : ''}</p>`; } });
    draw(); return {};
  }

  /* ------------------------------------------------------------ W40.3 : thí nghiệm Nirenberg */
  function nirenberg(body) {
    const OPT = ['CCC', 'UUU', 'AAA', 'GGG'];
    body.innerHTML = `<div class="olab em" data-lab><p class="olab__hint">${pr('Ống nghiệm có đủ thành phần tổng hợp protein trừ mRNA. Chọn mRNA lặp lại một bộ ba rồi bấm “thêm vào ống nghiệm”. Thí nghiệm gốc dùng CCC; các mRNA khác là mở rộng.', 'The tube holds everything for protein synthesis except mRNA. Choose an mRNA repeating one triplet and press “add to the tube”. The original used CCC; the others are an extension.')}</p><label class="olab__ctl"><span>mRNA</span><select data-m>${OPT.map((o) => `<option>${o}</option>`).join('')}</select></label><div class="olab__btns"><button type="button" class="btn btn--sm btn--primary" data-add>${pr('Thêm vào ống nghiệm', 'Add to the tube')}</button><button type="button" class="btn btn--sm" data-reset>${pr('Đặt lại', 'Reset')}</button></div><div data-area></div><p class="olab__status" data-st role="status" aria-live="polite"></p></div>`;
    const lab = $('[data-lab]', body), area = $('[data-area]', lab), st = $('[data-st]', lab);
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-add]')) { const m = $('[data-m]', lab).value, x = C.codon(m); area.innerHTML = `<p>mRNA: ${m} ${m} ${m} ${m}…</p><div style="display:flex;gap:4px;flex-wrap:wrap">${[1, 2, 3, 4, 5].map(() => `<span style="padding:4px 8px;border-radius:12px;background:#a7f3d0;border:1px solid #065f46;font-weight:700">${x.aa}</span>`).join('')}</div>`; O.say(st, true, `Chuỗi tạo ra chỉ gồm ${x.aa} ⇒ ${m} mã hoá ${x.aa}.`, `The chain made has only ${x.aa} ⇒ ${m} codes for ${x.aa}.`); } else if (e.target.closest('[data-reset]')) { area.innerHTML = ''; O.say(st, null, ''); } });
    return {};
  }

  /* ------------------------------------------------------------ W40.4 : dịch mã từng bước */
  function translateLab(body) {
    const S = { mrna: 'AUGGGUUCCAUCGGCGCCGGCUGA', k: 0 };
    body.innerHTML = `<div class="olab em pw" data-lab><p class="olab__hint">${pr('Ribosome trượt trên mRNA từng codon. Bấm “dịch một codon”: tRNA có bộ ba đối mã bắt cặp với codon và mang amino acid vào chuỗi.', 'The ribosome slides along the mRNA codon by codon. Press “translate one codon”: the tRNA with the matching anticodon pairs with the codon and brings its amino acid into the chain.')}</p><label class="olab__ctl"><span>mRNA 5′→3′</span><input type="text" data-in value="${S.mrna}" maxlength="45" aria-label="mRNA"></label><div data-area></div><div class="olab__btns"><button type="button" class="btn btn--sm btn--primary" data-step>${pr('Dịch một codon', 'Translate one codon')}</button><button type="button" class="btn btn--sm" data-all>${pr('Dịch hết', 'Translate all')}</button><button type="button" class="btn btn--sm" data-reset>${pr('Đặt lại', 'Reset')}</button></div><p class="olab__status" data-st role="status" aria-live="polite"></p></div>`;
    const lab = $('[data-lab]', body), area = $('[data-area]', lab), st = $('[data-st]', lab);
    const cods = () => { const s = N.clean(S.mrna.replace(/U/g, 'T'), 'DNA').seq.replace(/T/g, 'U'), i = s.indexOf('AUG'); if (i < 0) return { s, i, c: [] }; const c = []; for (let j = i; j + 3 <= s.length; j += 3) c.push(s.substr(j, 3)); return { s, i, c }; };
    const draw = () => {
      const { s, i, c } = cods(); if (i < 0) { area.innerHTML = `<p>${pr('Không có codon mở đầu AUG: dịch mã không bắt đầu.', 'No AUG start codon: translation does not begin.')}</p>`; return; }
      const chain = []; let stopped = false; for (let j = 0; j < S.k && j < c.length; j++) { const x = C.CODE[c[j]]; if (x.stop) { stopped = true; break; } chain.push(x.aa); }
      const cur = S.k < c.length && !stopped ? c[S.k] : null, ant = cur ? N.comp(cur.replace(/U/g, 'T'), 'DNA').replace(/T/g, 'U') : '';
      area.innerHTML = `<div style="display:flex;flex-wrap:wrap;gap:3px">${c.map((x, j) => `<span style="padding:2px 4px;border-radius:5px;border:2px solid ${j === S.k ? '#7c3aed' : '#94a3b8'};font:700 12px monospace;${j < S.k ? 'opacity:.55' : ''}${C.CODE[x].stop ? ';border-style:dashed' : ''}">${x}</span>`).join('')}</div>${cur ? `<p>${pr('Codon hiện tại', 'Current codon')}: <b>${cur}</b> · ${pr('bộ ba đối mã của tRNA', 'tRNA anticodon')}: <b>${ant}</b> → ${C.CODE[cur].stop ? pr('codon kết thúc', 'stop codon') : C.CODE[cur].aa}</p>` : `<p><b>${stopped ? pr('Gặp codon kết thúc: chuỗi được giải phóng.', 'Stop codon reached: the chain is released.') : pr('Hết mRNA.', 'End of mRNA.')}</b></p>`}<p>${pr('Chuỗi polypeptide', 'Polypeptide')}: <b>${chain.join(' – ') || '—'}</b></p>`;
    };
    const step = () => { const { c, i } = cods(); if (i < 0) return draw(); if (S.k < c.length) { const x = C.CODE[c[S.k]]; if (S.k === 0) O.say(st, true, 'Giai đoạn mở đầu: tRNA mang Met gắn vào AUG trên ribosome.', 'Initiation: the Met tRNA binds AUG on the ribosome.'); else if (x.stop) O.say(st, true, 'Giai đoạn kết thúc: gặp codon kết thúc.', 'Termination: a stop codon is reached.'); else O.say(st, true, 'Giai đoạn kéo dài: thêm ' + x.aa + ' vào chuỗi.', 'Elongation: ' + x.aa + ' is added to the chain.'); S.k++; } draw(); };
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-step]')) step(); else if (e.target.closest('[data-all]')) { const { c } = cods(); S.k = c.length; draw(); } else if (e.target.closest('[data-reset]')) { S.k = 0; O.say(st, null, ''); draw(); } });
    lab.addEventListener('input', (e) => { if (e.target.matches('[data-in]')) { S.mrna = e.target.value.toUpperCase(); S.k = 0; draw(); } });
    draw(); return {};
  }

  /* ------------------------------------------------------------ W40.5 : gene → tính trạng */
  function geneTrait(body) {
    const [a, b] = U.wrap(body, 2);
    const IT = [['mạch khuôn DNA (gene)', 'DNA template (gene)', ['p1']], ['RNA polymerase', 'RNA polymerase', ['p1']], ['tRNA có bộ ba đối mã', 'tRNA with an anticodon', ['p2']], ['ribosome', 'ribosome', ['p2']], ['mRNA', 'mRNA', ['s1']], ['chuỗi polypeptide (protein)', 'polypeptide (protein)', ['s2']], ['diễn ra ở nhân (sinh vật nhân thực)', 'takes place in the nucleus (eukaryotes)', ['p1']], ['diễn ra tại ribosome', 'takes place on the ribosome', ['p2']]];
    EL.sorter(a, { hint: ['Hình 40.5: gene (DNA) → 1 → mRNA → 2 → protein → tính trạng. Kéo thẻ vào quá trình 1 (phiên mã), quá trình 2 (dịch mã) hoặc sản phẩm.', 'Figure 40.5: gene (DNA) → 1 → mRNA → 2 → protein → trait. Drag cards into process 1 (transcription), process 2 (translation) or a product.'], boxes: [{ id: 'p1', vi: 'Quá trình 1: phiên mã', en: 'Process 1: transcription' }, { id: 'p2', vi: 'Quá trình 2: dịch mã', en: 'Process 2: translation' }, { id: 's1', vi: 'Sản phẩm của 1', en: 'Product of 1' }, { id: 's2', vi: 'Sản phẩm của 2', en: 'Product of 2' }], items: IT.map((x, i) => ({ id: 'g' + i, vi: x[0], en: x[1], to: x[2] })), explain: ['Gene → (phiên mã) → mRNA → (dịch mã) → protein → tính trạng; môi trường có thể tác động.', 'Gene → (transcription) → mRNA → (translation) → protein → trait; the environment can act.'] });
    b.innerHTML = `<div class="olab em" data-lab><p class="olab__hint">${pr('Môi trường tác động lên biểu hiện gene. Cẩm tú cầu có cùng gene nhưng màu hoa phụ thuộc pH đất; cà chua: ức chế dịch mã gene tạo ethylene làm quả chín chậm.', 'The environment acts on gene expression. A hydrangea has the same gene but its flower colour depends on soil pH; tomato: blocking translation of the ethylene gene slows ripening.')} ${EXTL}</p>${U.ctl('ph', 'pH của đất', 'Soil pH', 4, 8, 0.5, 5)}<label><input type="checkbox" data-eth> ${pr('Ức chế dịch mã gene tổng hợp ethylene (cà chua)', 'Block translation of the ethylene gene (tomato)')}</label><div data-area></div></div>`;
    const lab = $('[data-lab]', b), area = $('[data-area]', lab), P = { ph: 5 };
    const draw = () => { const blue = P.ph < 5.5, eth = $('[data-eth]', lab).checked; area.innerHTML = `<p>${pr('Hoa cẩm tú cầu', 'Hydrangea flower')}: <b>${blue ? pr('xanh dương (đất chua)', 'blue (acid soil)') : P.ph > 6.5 ? pr('hồng (đất kiềm nhẹ)', 'pink (slightly alkaline soil)') : pr('tím (trung gian)', 'purple (intermediate)')}</b> <span style="display:inline-block;width:16px;height:16px;border-radius:50%;background:${blue ? '#3b82f6' : P.ph > 6.5 ? '#ec4899' : '#8b5cf6'};border:1px solid #111"></span></p><p>${pr('Cà chua', 'Tomato')}: <b>${eth ? pr('quả chín chậm (ít ethylene)', 'fruit ripens slowly (little ethylene)') : pr('quả chín bình thường (có ethylene)', 'fruit ripens normally (ethylene present)')}</b></p><p><small>${pr('Cùng một gene, môi trường hoặc tác nhân nhân tạo có thể thay đổi tính trạng. (Màu hoa theo pH là mô hình định tính.)', 'The same gene, but environment or an artificial agent can change the trait. (Colour by pH is a qualitative model.)')}</small></p>`; };
    U.bindCtl(lab, P, draw); lab.addEventListener('change', (e) => { if (e.target.matches('[data-eth]')) draw(); }); draw(); return {};
  }

  /* ------------------------------------------------------------ ôn Bài 39–41 */
  function ch11Review2(body) {
    return mcq(body, 'Ôn nhanh Bài 39–41: chọn đáp án, nhận phản hồi ngay.', 'Quick review of Lessons 39–41: pick an answer for instant feedback.', [
      ['Một lần tái bản DNA tạo', 'One round of DNA replication makes', ['2 DNA giống nhau', '1 RNA', '4 protein', '1 DNA khác'], ['2 identical DNA molecules', '1 RNA', '4 proteins', '1 different DNA'], 0],
      ['Phiên mã tạo', 'Transcription makes', ['RNA từ gene', 'DNA từ RNA', 'protein từ DNA', 'lipid'], ['RNA from a gene', 'DNA from RNA', 'protein from DNA', 'lipid'], 0],
      ['Số codon mã hoá amino acid', 'The number of codons coding for amino acids', ['61', '64', '20', '3'], ['61', '64', '20', '3'], 0],
      ['Dịch mã diễn ra ở', 'Translation takes place at the', ['ribosome', 'màng tế bào', 'nhân con', 'ti thể'], ['ribosome', 'cell membrane', 'nucleolus', 'mitochondrion'], 0],
      ['Thứ tự đúng của dòng thông tin', 'The correct order of the information flow', ['DNA → mRNA → protein → tính trạng', 'protein → DNA → mRNA', 'mRNA → tính trạng → DNA', 'tính trạng → protein → DNA'], ['DNA → mRNA → protein → trait', 'protein → DNA → mRNA', 'mRNA → trait → DNA', 'trait → protein → DNA'], 0],
      ['Đột biến điểm KHÔNG gồm dạng', 'A point mutation is NOT', ['mất một cặp nhiễm sắc thể', 'mất một cặp nucleotide', 'thêm một cặp nucleotide', 'thay một cặp nucleotide'], ['loss of a chromosome pair', 'loss of one nucleotide pair', 'addition of one nucleotide pair', 'replacement of one nucleotide pair'], 0],
      ['Kiểu gene IᴬIᴮ có nhóm máu', 'Genotype IᴬIᴮ gives group', ['AB', 'A', 'B', 'O'], ['AB', 'A', 'B', 'O'], 0],
      ['Tần số đột biến một gene mỗi lần tái bản khoảng', 'Mutation frequency of a gene per replication is about', ['10⁻⁶ đến 10⁻⁴', '1 đến 10', '0,5', '10⁻²⁰'], ['10⁻⁶ to 10⁻⁴', '1 to 10', '0.5', '10⁻²⁰'], 0]]);
  }

  /* ------------------------------------------------------------ W41.1 : tạo đột biến điểm */
  function geneMut(body) {
    const W = 'ATGGGTTCCATCAAATGGTAA', S = { seq: W, hist: [] };
    body.innerHTML = `<div class="olab em pw" data-lab><p class="olab__hint">${pr('Gene mô hình (mạch mã hoá, 21 nucleotide). Chọn vị trí và nucleotide rồi mất, thêm hoặc thay thế một cặp; xem dạng đột biến và (mở rộng) hệ quả lên chuỗi amino acid.', 'A model gene (coding strand, 21 nucleotides). Pick a position and nucleotide, then delete, insert or replace one pair; see the kind of mutation and (extension) the effect on the amino-acid chain.')} ${EXTL}</p><div data-area></div><div class="olab__cols"><label>${pr('Vị trí', 'Position')} <input type="number" data-pos min="1" max="22" value="6" style="width:4em"></label><label>${pr('Nucleotide', 'Nucleotide')} <select data-b>${[...'ATGC'].map((b) => `<option>${b}</option>`).join('')}</select></label></div><div class="olab__btns"><button type="button" class="btn btn--sm" data-op="sub">${pr('Thay thế', 'Replace')}</button><button type="button" class="btn btn--sm" data-op="ins">${pr('Thêm', 'Insert')}</button><button type="button" class="btn btn--sm" data-op="del">${pr('Mất', 'Delete')}</button><button type="button" class="btn btn--sm" data-undo>${pr('Hoàn tác', 'Undo')}</button><button type="button" class="btn btn--sm" data-reset>${pr('Allele kiểu dại', 'Wild-type allele')}</button></div><p class="olab__status" data-st role="status" aria-live="polite"></p></div>`;
    const lab = $('[data-lab]', body), area = $('[data-area]', lab), st = $('[data-st]', lab);
    const tr = (s) => C.translate(s.replace(/T/g, 'U'), { fromStart: true });
    const draw = () => { const wt = tr(W), mt = tr(S.seq), diff = [...S.seq].map((c, i) => (c !== W[i] ? i : -1)).filter((i) => i >= 0); area.innerHTML = `<p>${pr('Kiểu dại', 'Wild type')}: ${seqRow(W)}</p><p>${pr('Allele hiện tại', 'Current allele')} (${S.seq.length} ${pr('cặp', 'pairs')}): ${seqRow(S.seq, S.seq.length === W.length ? diff : [])}</p><p>${pr('Chuỗi amino acid kiểu dại', 'Wild-type chain')}: <b>${wt.aas.join(' – ')}${wt.stop ? ' ⏹' : ''}</b></p><p>${pr('Chuỗi amino acid hiện tại', 'Current chain')}: <b>${mt.aas.join(' – ') || '—'}${mt.stop ? ' ⏹' : ''}</b></p>`; };
    const op = (t) => { const i = Math.max(1, Math.min(S.seq.length + (t === 'ins' ? 1 : 0), +$('[data-pos]', lab).value || 1)) - 1, b = $('[data-b]', lab).value, ns = C.mutate(S.seq, { t, i, b }); if (ns === S.seq) { O.say(st, false, 'Không có thay đổi (chọn nucleotide khác với hiện tại).', 'No change (choose a different nucleotide).'); return; } const d = N.diff(S.seq, ns); S.hist.push(S.seq); S.seq = ns; draw(); const ef = C.effect(W, ns), kind = { substitution: ['thay thế một cặp', 'replacement of one pair'], insertion: ['thêm một cặp', 'addition of one pair'], deletion: ['mất một cặp', 'loss of one pair'] }[d.type] || ['đột biến nhiều bước', 'multi-step mutation']; O.say(st, true, `Đột biến điểm: ${kind[0]}. Hệ quả (mở rộng): ${ef.vi}.`, `Point mutation: ${kind[1]}. Effect (extension): ${ef.en}.`); };
    lab.addEventListener('click', (e) => { const o = e.target.closest('[data-op]'); if (o) op(o.dataset.op); else if (e.target.closest('[data-undo]')) { if (S.hist.length) S.seq = S.hist.pop(); draw(); } else if (e.target.closest('[data-reset]')) { S.seq = W; S.hist = []; O.say(st, null, ''); draw(); } });
    draw(); return {};
  }

  /* ------------------------------------------------------------ W41.2 : nhóm máu ABO */
  function aboBlood(body) {
    const S = { g1: null, g2: null }, GENO = ['AA', 'AO', 'BB', 'BO', 'AB', 'OO'], nm = (g) => 'I' + g[0] + 'I' + g[1];
    const [a, b] = U.wrap(body, 2);
    const draw = () => {
      const k = S.g1 && S.g2 ? [S.g1, S.g2].sort().join('') : '';
      a.innerHTML = `<div class="olab em pw" data-lab><p class="olab__hint">${pr('Kéo hai allele (Iᴬ, Iᴮ, Iᴼ) vào cặp gene để tạo kiểu gene và đọc nhóm máu.', 'Drag two alleles (Iᴬ, Iᴮ, Iᴼ) into the gene pair to make a genotype and read the blood group.')}</p><div>${['A', 'B', 'O'].map((x) => O.chip('a' + x, 'I' + x, 'I' + x)).join('')}</div><div class="olab__cols">${O.zone('z1', S.g1 ? 'I' + S.g1 : 'allele 1', 'allele 1', S.g1 ? 'is-ok' : '')}${O.zone('z2', S.g2 ? 'I' + S.g2 : 'allele 2', 'allele 2', S.g2 ? 'is-ok' : '')}</div>${k ? `<p><b>${pr('Kiểu gene', 'Genotype')} ${nm(k)} → ${pr('nhóm máu', 'blood group')} ${C.blood(k)}</b></p>` : ''}<table class="olab__tbl"><thead><tr><th>${pr('Nhóm máu', 'Group')}</th><th>${pr('Kiểu gene', 'Genotypes')}</th></tr></thead><tbody>${['A', 'B', 'AB', 'O'].map((p) => `<tr><td>${p}</td><td>${GENO.filter((g) => C.blood(g) === p).map(nm).join(', ')}</td></tr>`).join('')}</tbody></table><p class="olab__status" data-st role="status" aria-live="polite"></p><div class="olab__btns"><button type="button" class="btn btn--sm" data-reset>${pr('Đặt lại', 'Reset')}</button></div></div>`;
    };
    draw(); const lab1 = $('[data-lab]', a);
    U.drag(a, (cid, zid) => { const x = String(cid).slice(1); if (zid === 'z1') S.g1 = x; else if (zid === 'z2') S.g2 = x; draw(); });
    a.addEventListener('click', (e) => { if (e.target.closest('[data-reset]')) { S.g1 = S.g2 = null; draw(); } });
    const P = { m: 'AO', f: 'BO' };
    b.innerHTML = `<div class="olab em" data-lab><p class="olab__hint">${pr('Lai nhóm máu: chọn kiểu gene của bố và mẹ.', 'Blood-group cross: choose the father’s and mother’s genotypes.')}</p><div class="olab__cols"><label>${pr('Mẹ', 'Mother')} <select data-p="m">${GENO.map((g) => `<option value="${g}"${g === P.m ? ' selected' : ''}>${nm(g)} (${C.blood(g)})</option>`).join('')}</select></label><label>${pr('Bố', 'Father')} <select data-p="f">${GENO.map((g) => `<option value="${g}"${g === P.f ? ' selected' : ''}>${nm(g)} (${C.blood(g)})</option>`).join('')}</select></label></div><div data-out></div></div>`;
    const lab = $('[data-lab]', b), out = $('[data-out]', lab);
    const dr = () => { const r = C.bloodCross(P.m, P.f), tot = Object.values(r).reduce((x, y) => x + y, 0); out.innerHTML = `<table class="olab__tbl"><thead><tr><th>♀\\♂</th>${[...P.f].map((x) => `<th>I${x}</th>`).join('')}</tr></thead><tbody>${[...P.m].map((x) => `<tr><th>I${x}</th>${[...P.f].map((y) => `<td>${nm([x, y].sort().join(''))}<br><small>${C.blood([x, y].sort().join(''))}</small></td>`).join('')}</tr>`).join('')}</tbody></table><p><b>${pr('Nhóm máu con', 'Children’s groups')}:</b> ${Object.keys(r).map((p) => `${p} ${r[p]}/${tot}`).join(' · ')}</p>`; };
    lab.addEventListener('change', (e) => { if (e.target.matches('[data-p]')) { P[e.target.dataset.p] = e.target.value; dr(); } }); dr(); return {};
  }

  /* ------------------------------------------------------------ W41.3 : có lợi/có hại + tần số */
  function mutEffect(body) {
    const [a, b] = U.wrap(body, 2);
    const IT = [['Lúa CM5 chịu mặn, năng suất cao', 'Rice CM5: salt tolerant, high yield', ['u']], ['Nấm penicillin đột biến tạo nhiều kháng sinh', 'Mutant penicillin fungus makes much more antibiotic', ['u']], ['Ngô ngọt có nhiều đường trong hạt', 'Sweet maize with much sugar in the grain', ['u']], ['Lợn song sinh dính liền thân', 'A conjoined-twin pig', ['h']], ['Thiếu máu hồng cầu hình liềm', 'Sickle cell anaemia', ['h']], ['Củ cải đường lá đốm trắng do thiếu diệp lục', 'Sugar beet with white leaf blotches from lack of chlorophyll', ['h']], ['Đột biến thay codon bằng codon đồng nghĩa', 'A mutation to a synonymous codon', ['n']]];
    EL.sorter(a, { hint: ['Kéo mỗi ví dụ vào có lợi, có hại hoặc trung tính (đối với con người / thể đột biến).', 'Drag each example into useful, harmful or neutral (for humans / the mutant).'], boxes: [{ id: 'u', vi: 'Có lợi', en: 'Useful' }, { id: 'h', vi: 'Có hại', en: 'Harmful' }, { id: 'n', vi: 'Trung tính', en: 'Neutral' }], items: IT.map((x, i) => ({ id: 'm' + i, vi: x[0], en: x[1], to: x[2] })), explain: ['Tính có lợi hay có hại tuỳ tổ hợp gene và môi trường; một số đột biến trung tính.', 'Whether a mutation is useful or harmful depends on gene combination and environment; some are neutral.'] });
    const P = { f: 5, n: 6 };
    b.innerHTML = `<div class="olab em" data-lab><p class="olab__hint">${pr('Ước lượng số đột biến: tần số 10⁻ˣ mỗi gene mỗi lần tái bản (sách nêu 10⁻⁶–10⁻⁴); số lần tái bản 10ʸ.', 'Estimate mutations: frequency 10⁻ˣ per gene per replication (the book gives 10⁻⁶–10⁻⁴); 10ʸ replications.')} ${EXTL}</p>${U.ctl('f', 'x trong 10⁻ˣ', 'x in 10⁻ˣ', 4, 6, 1, P.f)}${U.ctl('n', 'y trong 10ʸ lần tái bản', 'y in 10ʸ replications', 2, 9, 1, P.n)}<div data-area></div></div>`;
    const lab = $('[data-lab]', b), area = $('[data-area]', lab);
    const draw = () => { const e = Math.pow(10, P.n - P.f); area.innerHTML = `<p>${pr('Số đột biến kì vọng', 'Expected mutations')}: 10<sup>${P.n}</sup> × 10<sup>−${P.f}</sup> = <b>${e >= 1 ? numS(e) : fmt(e, 3)}</b></p><p><small>${pr('Đây chỉ là giá trị kì vọng của một gene; thực tế dao động ngẫu nhiên. Tia UV, X, γ làm tăng tần số.', 'This is only the expected value for one gene; in reality it fluctuates randomly. UV, X and γ rays raise the frequency.')}</small></p>`; };
    U.bindCtl(lab, P, draw); draw(); return {};
  }

  window.LabSims = Object.assign(window.LabSims || {}, {
    'dna-replic': { fn: dnaReplic, vi: 'Tái bản DNA (Hình 39.1)', en: 'DNA replication (Figure 39.1)', intro: 'Tháo xoắn, kéo nucleotide, xem hai DNA mới.' },
    'transcribe-lab': { fn: transcribeLab, vi: 'Phiên mã (Hình 39.2)', en: 'Transcription (Figure 39.2)', intro: 'Chọn mạch khuôn, kéo nucleotide RNA.' },
    'repl-trans': { fn: replTrans, vi: 'So sánh tái bản – phiên mã; đếm nucleotide', en: 'Replication vs transcription; counting nucleotides', intro: 'Kéo thẻ; nhập mạch DNA.' },
    'code-count': { fn: codeCount, vi: 'Bảng 40.1: số loại mã', en: 'Table 40.1: number of code words', intro: 'Kéo thanh trượt n.' },
    'codon-table': { fn: codonTable, vi: 'Bảng mã di truyền (Hình 40.1)', en: 'The genetic-code table (Figure 40.1)', intro: 'Bấm một codon.' },
    'nirenberg': { fn: nirenberg, vi: 'Thí nghiệm giải mã di truyền (Hình 40.2)', en: 'The code-cracking experiment (Figure 40.2)', intro: 'Chọn mRNA rồi thêm vào ống nghiệm.' },
    'translate-lab': { fn: translateLab, vi: 'Dịch mã từng bước (Hình 40.4)', en: 'Translation step by step (Figure 40.4)', intro: 'Bấm “dịch một codon”.' },
    'gene-trait': { fn: geneTrait, vi: 'Từ gene đến tính trạng (Hình 40.5)', en: 'From gene to trait (Figure 40.5)', intro: 'Kéo thẻ; đổi pH đất.' },
    'ch11-review2': { fn: ch11Review2, vi: 'Ôn tập Bài 39–41', en: 'Review of Lessons 39–41', intro: 'Chọn đáp án.' },
    'gene-mut': { fn: geneMut, vi: 'Tạo đột biến điểm (Hình 41.1)', en: 'Creating point mutations (Figure 41.1)', intro: 'Mất, thêm, thay thế một cặp.' },
    'abo-blood': { fn: aboBlood, vi: 'Nhóm máu ABO', en: 'ABO blood groups', intro: 'Kéo allele; lai nhóm máu.' },
    'mut-effect': { fn: mutEffect, vi: 'Có lợi, có hại, trung tính; tần số đột biến', en: 'Useful, harmful, neutral; mutation frequency', intro: 'Kéo thẻ; kéo thanh trượt.' }
  });
})();
