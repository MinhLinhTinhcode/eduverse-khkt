/* ==========================================================================
   MOL W38B — Bài 38 (phần 2): RNA, mốc thời gian gene, PHÒNG THÍ NGHIỆM DNA & RNA (Sandbox S1–S9, S10 chỉ để móc) và ôn Chương XI.
   rna-lab · gene-timeline · dna-lab · ch11-review. Nạp SAU mol-w38.js. Dữ liệu hư cấu hoàn toàn; không chỉnh sửa gene người.
   Mọi nội dung ngoài SGK dán nhãn “mở rộng (ngoài SGK)”. Màu luôn kèm chữ cái.
   Thêm ca mới: sửa mảng CASES (S6/S8) hoặc GENES trong nucleic-lab.js (xem README Đợt 13).
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab, ML = window.MolLab, EL = window.EnergyLab, NL = window.NucleicLab;
  if (!L || !ML || !ML.org || !ML.org38 || !ML.org28 || !NL || !NL.engine) return;
  const { pr, fmt } = L, U = ML.ui, O = ML.org, { $ } = U, N = NL.engine, { EXT } = ML.org28, { COL, base } = ML.org38;
  const strip = (s) => String(s).replace(/<[^>]+>/g, ''), aria = (vi, en) => strip(vi) + ' / ' + strip(en);
  const EXTL = EXT('mở rộng (ngoài SGK)', 'extension (beyond the book)');
  const seqSvg = (s, hl, w) => { w = w || 20; return `<svg viewBox="0 0 ${s.length * (w + 3) + 6} 30" class="mol__board" role="img" aria-label="${aria('Chuỗi ' + s, 'Sequence ' + s)}">` + [...s].map((c, i) => `<g${hl && hl.indexOf(i) >= 0 ? ' stroke="#111" stroke-width="3"' : ''}>${base(c, 3 + i * (w + 3), 4, w)}</g>`).join('') + '</svg>'; };

  /* ------------------------------------------------------------ W38.7 : RNA */
  function rnaLab(body) {
    const S = { t: 'TACGACTAGTGCA' };
    body.innerHTML = `<div class="olab em" data-lab><p class="olab__hint">${pr('RNA có U thay cho T và thường một mạch. Nhập mạch gốc DNA (A, T, G, C) để xem trình tự RNA bổ sung.', 'RNA has U instead of T and is usually single-stranded. Enter a DNA template (A, T, G, C) to see the complementary RNA.')} ${EXTL}</p><label class="olab__ctl"><span>${pr('Mạch gốc DNA', 'DNA template')}</span><input type="text" data-in value="${S.t}" maxlength="30" aria-label="DNA template"></label><div data-area></div><div class="olab__btns"><button type="button" class="btn btn--sm" data-reset>${pr('Đặt lại', 'Reset')}</button></div></div>`;
    const lab = $('[data-lab]', body), area = $('[data-area]', lab);
    const draw = () => { const c = N.clean(S.t, 'DNA'), r = N.transcribePreview(c.seq); area.innerHTML = (c.bad ? `<p class="olab__hint">${pr('Đã bỏ ký tự không hợp lệ.', 'Invalid characters removed.')}</p>` : '') + `<p>DNA: ${seqSvg(c.seq)}</p><p>RNA: ${seqSvg(r)}</p><p><small>${pr('Quy tắc: A→U, T→A, G→C, C→G. Ở RNA, A bắt cặp U. (Bài 39 sẽ nói về phiên mã.)', 'Rule: A→U, T→A, G→C, C→G. In RNA, A pairs with U. (Lesson 39 covers transcription.)')}</small></p>`; };
    lab.addEventListener('input', (e) => { if (e.target.matches('[data-in]')) { S.t = e.target.value; draw(); } });
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-reset]')) { S.t = 'TACGACTAGTGCA'; $('[data-in]', lab).value = S.t; draw(); } });
    draw(); return {};
  }

  /* ------------------------------------------------------------ W38.8 : mốc thời gian */
  function geneTimeline(body) {
    const E = [[1866, 'Mendel công bố các quy luật từ thí nghiệm trên đậu', 'Mendel publishes laws from his pea experiments'], [1909, 'Johannsen đặt tên “gene”', 'Johannsen coins the word “gene”'], [1953, 'Watson và Crick đề xuất cấu trúc xoắn kép của DNA', 'Watson and Crick propose the double-helix structure of DNA']];
    body.innerHTML = `<div class="olab em" data-lab><p class="olab__hint">${pr('Kéo thanh trượt dọc theo thời gian.', 'Slide along the timeline.')} ${EXTL}</p>${U.ctl('y', 'Năm', 'Year', 1860, 1960, 1, 1866, '')}<div data-area></div><p><small>${pr('Các mốc này lấy từ tài liệu tham khảo ngoài SGK; cần đối chiếu nguồn trước khi trích dẫn.', 'These dates come from references outside the book; verify before citing.')}</small></p></div>`;
    const lab = $('[data-lab]', body), area = $('[data-area]', lab), P = { y: 1866 };
    const draw = () => { area.innerHTML = '<ul>' + E.map((x) => `<li${P.y >= x[0] ? ' style="font-weight:700"' : ' style="opacity:.55"'}>${P.y >= x[0] ? '✔' : '○'} ${x[0]}: ${pr(x[1], x[2])}</li>`).join('') + '</ul>'; };
    U.bindCtl(lab, P, draw); draw(); return { state: P };
  }

  /* ------------------------------------------------------------ PHÒNG THÍ NGHIỆM DNA & RNA */
  function dnaLab(body) {
    const TABS = [['s1', 'S1 Bắt cặp', 'S1 Pairing'], ['s2', 'S2 Trò chơi bổ sung', 'S2 Complement game'], ['s3', 'S3 Liên kết H', 'S3 H-bonds'], ['s4', 'S4 Đột biến', 'S4 Mutation'], ['s5', 'S5 RNA', 'S5 RNA'], ['s6', 'S6 Tìm gene', 'S6 Find the gene'], ['s7', 'S7 Gene → tính trạng', 'S7 Gene → trait'], ['s8', 'S8 Pháp y', 'S8 Forensics'], ['s9', 'S9 Sửa chữa', 'S9 Repair']];
    const S = { tab: 's1', rna: false, b1: 'A', b2: 'T', game: { seed: 1, score: 0, rounds: 0 }, ed: N.Editor('ATGCCTAAG', 'DNA'), gene: 'flower', s3: 'GCGCGCGC', s5: 'GGGAAACCC', s6: { seed: 1, sel: [] }, s7: 'ATGCCTAAG', s8: { seed: 2, pick: null }, s9: { seed: 1 } };
    body.innerHTML = `<div class="olab em pw" data-lab><p class="olab__hint">${pr('Phòng thí nghiệm DNA & RNA: chuỗi hư cấu, tự do thử. Chọn một thẻ bên dưới.', 'DNA & RNA sandbox: fictional sequences, experiment freely. Pick a tab below.')} ${EXTL}</p><div role="tablist" class="olab__btns">${TABS.map((t) => `<button type="button" role="tab" class="btn btn--sm" data-tab="${t[0]}">${pr(t[1], t[2])}</button>`).join('')}</div><div data-area></div><p class="olab__hint"><small>${pr('S10 (nhân đôi DNA và phiên mã) sẽ mở ở Bài 39–40. Không có chỉnh sửa gene người trong phòng này.', 'S10 (DNA replication and transcription) opens in Lessons 39–40. There is no human gene editing here.')}</small></p><p class="olab__status" data-st role="status" aria-live="polite"></p></div>`;
    const lab = $('[data-lab]', body), area = $('[data-area]', lab), st = $('[data-st]', lab);
    const say = (ok, vi, en) => O.say(st, ok, vi, en);
    const mode = () => (S.rna ? 'RNA' : 'DNA'), bs = () => (S.rna ? 'AUGC' : 'ATGC');
    const r = (seed, n) => { let a = (seed * 2654435761) >>> 0; return () => ((a = (Math.imul(a, 1664525) + 1013904223) >>> 0) / 4294967296) * n; };
    const rndSeq = (seed, n, al) => { const g = r(seed, 4); let s = ''; for (let i = 0; i < n; i++) s += (al || 'ATGC')[Math.floor(g())]; return s; };
    const bsel = (id, v) => `<select data-sel="${id}">${[...bs()].map((b) => `<option${b === v ? ' selected' : ''}>${b}</option>`).join('')}</select>`;

    const V = {
      s1() {
        const ps = N.pairStatus(S.b1, S.b2, mode());
        return `<label><input type="checkbox" data-rna${S.rna ? ' checked' : ''}> RNA (A–U)</label><div class="olab__cols"><label>${pr('Nucleotide mạch 1', 'Strand 1 nucleotide')} ${bsel('b1', S.b1)}</label><label>${pr('Nucleotide mạch 2', 'Strand 2 nucleotide')} ${bsel('b2', S.b2)}</label></div><svg viewBox="0 0 140 70" width="200" class="mol__board" role="img" aria-label="${aria('Hai nucleotide đối diện', 'Two opposing nucleotides')}">${base(S.b1, 14, 6, 30)}${base(S.b2, 96, 6, 30)}<line x1="46" y1="17" x2="94" y2="17" stroke="${ps.matched ? '#16a34a' : '#dc2626'}" stroke-width="3" ${ps.matched ? '' : 'stroke-dasharray="4 4"'}/><text x="70" y="50" text-anchor="middle" style="font:700 11px system-ui" fill="currentColor">${ps.matched ? '✓ ' + pr('vừa khít', 'fits') : '✗ ' + pr('lệch', 'mismatch')}</text></svg><p><b>${ps.matched ? pr('Bắt cặp đúng: ' + ps.hBonds + ' liên kết hydrogen (bổ sung)', 'Correct pair: ' + ps.hBonds + ' hydrogen bonds (supplementary)') : pr('Không bắt cặp: A–' + (S.rna ? 'U' : 'T') + ' và G–C mới đúng.', 'No pairing: only A–' + (S.rna ? 'U' : 'T') + ' and G–C are correct.')}</b></p>`;
      },
      s2() {
        const G = S.game, T = rndSeq(G.seed, 8, bs()), want = N.comp(T, mode());
        G.cur = G.cur || ''; G.T = T; G.want = want;
        return `<p>${pr('Gõ mạch bổ sung của', 'Type the complement of')} ${seqSvg(T)}</p><label class="olab__ctl"><span>${pr('Đáp án', 'Answer')}</span><input type="text" data-ans maxlength="8" value="${G.cur}" aria-label="answer"></label><div class="olab__btns"><button type="button" class="btn btn--sm btn--primary" data-chk2>${pr('Kiểm tra', 'Check')}</button><button type="button" class="btn btn--sm" data-next2>${pr('Câu khác', 'Next')}</button></div><p>${pr('Điểm', 'Score')}: <b>${G.score}</b> / ${G.rounds}</p>`;
      },
      s3() {
        const c = N.clean(S.s3, 'DNA'), e = c.seq, p = N.percent(e, 'DNA');
        return `<label class="olab__ctl"><span>${pr('Mạch DNA', 'DNA strand')}</span><input type="text" data-s3 maxlength="40" value="${S.s3}" aria-label="strand"></label><div class="olab__btns"><button type="button" class="btn btn--sm" data-p3="ATATATAT">AT…</button><button type="button" class="btn btn--sm" data-p3="GCGCGCGC">GC…</button><button type="button" class="btn btn--sm" data-p3="ATGCATGC">ATGC…</button></div>${seqSvg(e.slice(0, 20))}<table class="olab__tbl"><tbody><tr><th>${pr('Số cặp', 'Pairs')}</th><td>${e.length}</td></tr><tr><th>%GC</th><td>${fmt(N.gcContent(e, 'DNA'), 1)} %</td></tr><tr><th>${pr('Liên kết hydrogen (2 cho A–T, 3 cho G–C)', 'Hydrogen bonds (2 for A–T, 3 for G–C)')}</th><td><b>${N.hBonds(e, 'DNA')}</b></td></tr><tr><th>${pr('Chỉ số bền', 'Stability index')}</th><td>${fmt(N.stabilityIndex(e, 'DNA'), 1)} / 100</td></tr></tbody></table><p><small>${pr('Nhiều cặp G–C ⇒ nhiều liên kết hydrogen hơn ⇒ hai mạch bám chặt hơn (kiến thức bổ sung).', 'More G–C pairs ⇒ more hydrogen bonds ⇒ strands hold together more firmly (supplementary).')}</small></p>`;
      },
      s4() {
        const E = S.ed, sq = E.seq, g = N.GENES[S.gene], ph = N.phenoOf(S.gene, sq), lg = E.state.log, last = lg[lg.length - 1];
        return `<label class="olab__ctl"><span>${pr('Gene hư cấu', 'Fictional gene')}</span><select data-gene>${Object.keys(N.GENES).map((k) => `<option value="${k}"${k === S.gene ? ' selected' : ''}>${N.GENES[k].name[0]} / ${N.GENES[k].name[1]}</option>`).join('')}</select></label>` + `<div style="display:flex;flex-wrap:wrap;gap:3px">${[...sq].map((c, i) => `<button type="button" class="btn btn--sm" data-pos="${i}" aria-label="${aria('vị trí ' + (i + 1) + ' ' + c, 'position ' + (i + 1) + ' ' + c)}" style="min-width:30px;border-bottom:4px solid ${COL[c]}">${c}</button>`).join('')}</div><div class="olab__cols"><label>${pr('Nucleotide', 'Nucleotide')} <select data-nb>${[...'ATGC'].map((b) => `<option>${b}</option>`).join('')}</select></label><label>${pr('Vị trí', 'Position')} <input type="number" data-np min="1" max="${sq.length + 1}" value="1" style="width:4em"></label></div><div class="olab__btns"><button type="button" class="btn btn--sm" data-op="sub">${pr('Thay', 'Substitute')}</button><button type="button" class="btn btn--sm" data-op="ins">${pr('Chèn', 'Insert')}</button><button type="button" class="btn btn--sm" data-op="del">${pr('Xoá', 'Delete')}</button><button type="button" class="btn btn--sm" data-op="und">${pr('Hoàn tác', 'Undo')}</button><button type="button" class="btn btn--sm" data-op="red">${pr('Làm lại', 'Redo')}</button><button type="button" class="btn btn--sm" data-op="res">${pr('Về gốc', 'Original')}</button></div><p><b>${pr('Kiểu hình', 'Phenotype')}: ${ph ? pr(ph.vi, ph.en) : '—'}</b>${ph && ph.nonstandard ? ' <small>(' + pr('trình tự lạ — quy tắc hư cấu tính là allele ' + ph.allele, 'unfamiliar sequence — the fictional rule counts it as allele ' + ph.allele) + ')</small>' : ''}</p><p><small>${pr('Allele chuẩn', 'Reference alleles')}: ${g.alleles.map((a) => a.seq + ' = ' + a.vi).join(' · ')}</small></p>` + (last ? `<p>${pr('Lần sửa cuối', 'Last edit')}: ${last.text} — <b>${last.d.kind || last.d}</b></p>` : '') + `<p><small>${pr('Đột biến có thể làm đổi tính trạng nhưng không phải lúc nào cũng vậy. Đây là gene hư cấu; không thao tác trên gene người.', 'A mutation can change a trait but not always. This is a fictional gene; no human genes are edited.')}</small></p>`;
      },
      s5() {
        const t = N.clean(S.s5, 'RNA').seq, m = N.clean(S.s5, 'DNA').seq, n = t.length;
        let st2 = 0, i = 0, j = n - 1; const pairs = []; while (i < j && N.pairStatus(t[i], t[j], 'RNA').matched) { pairs.push([i, j]); i++; j--; }
        return `<label class="olab__ctl"><span>${pr('Chuỗi RNA (A, U, G, C)', 'RNA sequence (A, U, G, C)')}</span><input type="text" data-s5 maxlength="24" value="${S.s5.replace(/T/g, 'U')}" aria-label="RNA"></label><div class="olab__btns"><button type="button" class="btn btn--sm" data-p5="GGGAAACCC">GGGAAACCC</button><button type="button" class="btn btn--sm" data-p5="GCGAAAGCGC">GCGAAAGCGC</button></div>${seqSvg(t, pairs.flat())}<p>${pairs.length ? pr('Hai đầu bắt cặp được ' + pairs.length + ' cặp ⇒ chuỗi gấp thành cuống–vòng (các nucleotide viền đen). Đây là gợi ý cho cách tRNA gấp lại.', 'The two ends can pair in ' + pairs.length + ' pairs ⇒ the chain folds into a stem–loop (outlined bases). This hints at how tRNA folds.') : pr('Hai đầu không bắt cặp, không có cuống.', 'The ends do not pair, so there is no stem.')}</p><p><small>${pr('RNA một mạch vẫn có thể bắt cặp bổ sung giữa các đoạn của chính nó (mở rộng).', 'Single-stranded RNA can still pair with itself between segments (extension).')}</small></p>`;
      },
      s6() {
        const Q = S.s6, sq = rndSeq(Q.seed, 30, 'ATGC').replace(/(.{6})./, '$1A'), pos = []; let k = -1; const s2 = sq.slice(0, 9) + 'ATG' + sq.slice(12, 22) + 'ATG' + sq.slice(25); Q.s = s2; for (let q = 0; q <= s2.length - 3; q++) if (s2.substr(q, 3) === 'ATG') pos.push(q); Q.pos = pos;
        return `<p>${pr('Bấm vào mọi chỗ bắt đầu bằng ATG (vị trí khởi đầu của gene hư cấu).', 'Click every place that starts with ATG (start of a fictional gene).')}</p><div style="display:flex;flex-wrap:wrap;gap:2px;font-family:monospace">${[...s2].map((c, i) => `<button type="button" class="btn btn--sm" data-q="${i}" aria-pressed="${Q.sel.indexOf(i) >= 0}" style="min-width:26px${Q.sel.indexOf(i) >= 0 ? ';outline:3px solid #7c3aed' : ''}">${c}</button>`).join('')}</div><div class="olab__btns"><button type="button" class="btn btn--sm btn--primary" data-chk6>${pr('Kiểm tra', 'Check')}</button><button type="button" class="btn btn--sm" data-new6>${pr('Chuỗi khác', 'New sequence')}</button></div>`;
      },
      s7() {
        const ph = N.phenoOf(S.gene === 'flower' || S.gene === 'tail' || S.gene === 'body' ? S.gene : 'flower', S.s7), A = ph && ph.allele === 'A', cl = A ? { flower: '#7c3aed', tail: '#16a34a', body: '#2563eb' }[S.gene] : { flower: '#ffffff', tail: '#64748b', body: '#f97316' }[S.gene];
        return `<label class="olab__ctl"><span>${pr('Gene hư cấu', 'Fictional gene')}</span><select data-gene7>${Object.keys(N.GENES).map((k) => `<option value="${k}"${k === S.gene ? ' selected' : ''}>${N.GENES[k].name[0]} / ${N.GENES[k].name[1]}</option>`).join('')}</select></label><label class="olab__ctl"><span>${pr('Trình tự gene', 'Gene sequence')}</span><input type="text" data-s7 maxlength="12" value="${S.s7}" aria-label="gene"></label><div class="olab__btns">${N.GENES[S.gene].alleles.map((a) => `<button type="button" class="btn btn--sm" data-p7="${a.seq}">${a.id}: ${a.seq}</button>`).join('')}</div><svg viewBox="0 0 150 90" width="200" class="mol__board" role="img" aria-label="${aria('Sinh vật ảo', 'Virtual organism')}"><ellipse cx="75" cy="50" rx="45" ry="28" fill="${S.gene === 'body' ? cl : '#fde68a'}" stroke="#111" stroke-width="2"${S.gene === 'body' && !A ? '' : ''}/>${S.gene === 'flower' ? `<circle cx="75" cy="40" r="12" fill="${cl}" stroke="#4c1d95" stroke-width="2"${A ? '' : ' stroke-dasharray="3 2"'}/>` : ''}${S.gene === 'tail' ? (A ? '<path d="M118 50 q20 -20 5 -30 q-14 -9 -4 10" fill="none" stroke="#111" stroke-width="3"/>' : '<path d="M118 50 l28 0" stroke="#111" stroke-width="3"/>') : ''}<text x="75" y="86" text-anchor="middle" style="font:700 10px system-ui" fill="currentColor">${ph ? strip(pr(ph.vi, ph.en)) : ''}</text></svg><p><b>${pr('Allele', 'Allele')} ${ph ? ph.allele : '?'} ⇒ ${ph ? pr(ph.vi, ph.en) : ''}</b></p><p><small>${pr('Trình tự gene → quy định tính trạng (mô hình hư cấu).', 'Gene sequence → determines the trait (fictional model).')}</small></p>`;
      },
      s8() {
        const F = N.family(S.s8.seed), Q = S.s8;
        return `<p>${pr('Hiện trường để lại DNA. So với ba nghi phạm (dữ liệu giả lập, hư cấu).', 'DNA was left at the scene. Compare with three suspects (simulated, fictional data).')}</p><div style="overflow-x:auto"><table class="olab__tbl"><thead><tr><th></th>${F.scene.map((_, i) => `<th>${i + 1}</th>`).join('')}<th>${pr('Khớp', 'Match')}</th></tr></thead><tbody><tr><th>${pr('Hiện trường', 'Scene')}</th>${F.scene.map((p) => `<td>${p[0]}/${p[1]}</td>`).join('')}<td></td></tr>${F.suspects.map((s, k) => { const m = N.match(s, F.scene); return `<tr><th><button type="button" class="btn btn--sm" data-sus="${k}" aria-pressed="${Q.pick === k}">${pr('Nghi phạm', 'Suspect')} ${k + 1}</button></th>${s.map((p) => `<td>${p[0]}/${p[1]}</td>`).join('')}<td><b>${m.shared}/${m.total}</b></td></tr>`; }).join('')}</tbody></table></div><div class="olab__btns"><button type="button" class="btn btn--sm" data-new8>${pr('Vụ khác', 'New case')}</button></div>`;
      },
      s9() {
        const sq = rndSeq(S.s9.seed + 40, 12, 'ATGC'), tp = N.comp(sq, 'DNA'), bad = Math.floor(r(S.s9.seed + 3, 12)()), wrong = [...tp].map((c, i) => (i === bad ? 'ACGT'.replace(c, '')[0] : c)).join('');
        S.s9.sq = sq; S.s9.tp = tp; S.s9.bad = bad; S.s9.cur = S.s9.cur || wrong; const cur = S.s9.cur;
        return `<p>${pr('Một cặp nucleotide bắt cặp sai. Bấm vào nucleotide sai ở mạch dưới để sửa theo mạch trên.', 'One base pair is mismatched. Click the wrong nucleotide in the lower strand to repair it from the upper strand.')}</p><div style="display:flex;gap:2px;font-family:monospace">${[...sq].map((c) => `<span style="width:28px;text-align:center;background:${COL[c]};color:#fff;font-weight:800;border-radius:4px">${c}</span>`).join('')}</div><div style="display:flex;gap:2px;font-family:monospace;margin-top:4px">${[...cur].map((c, i) => `<button type="button" data-fix="${i}" class="btn btn--sm" aria-label="${aria('vị trí ' + (i + 1) + ' ' + c + (N.pairStatus(sq[i], c, 'DNA').matched ? ' đúng cặp' : ' sai cặp'), 'position ' + (i + 1) + ' ' + c + (N.pairStatus(sq[i], c, 'DNA').matched ? ' paired' : ' mismatched'))}" style="min-width:28px;background:${COL[c]};color:#fff;font-weight:800;${N.pairStatus(sq[i], c, 'DNA').matched ? '' : 'outline:3px dashed #111'}">${c}${N.pairStatus(sq[i], c, 'DNA').matched ? '' : '✗'}</button>`).join('')}</div><div class="olab__btns"><button type="button" class="btn btn--sm" data-new9>${pr('Ca khác', 'New case')}</button></div><p><small>${pr('Tế bào có cơ chế sửa chữa DNA; trò chơi chỉ minh hoạ ý tưởng đó.', 'Cells have DNA-repair mechanisms; this game only illustrates the idea.')}</small></p>`;
      }
    };
    const draw = () => { area.innerHTML = V[S.tab](); lab.querySelectorAll('[data-tab]').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tab === S.tab))); };
    const setTab = (t) => { S.tab = t; say(null, ''); draw(); };
    lab.addEventListener('change', (e) => {
      const t = e.target, sel = t.dataset.sel;
      if (sel) { S[sel] = t.value; draw(); } else if (t.matches('[data-rna]')) { S.rna = t.checked; S.b1 = 'A'; S.b2 = S.rna ? 'U' : 'T'; S.game.cur = ''; draw(); } else if (t.matches('[data-gene]')) { S.gene = t.value; S.ed = N.Editor(N.GENES[S.gene].ref, 'DNA'); draw(); } else if (t.matches('[data-gene7]')) { S.gene = t.value; S.s7 = N.GENES[S.gene].ref; draw(); }
    });
    lab.addEventListener('input', (e) => { const t = e.target; if (t.matches('[data-s3]')) { S.s3 = t.value; const pos = t.selectionStart; draw(); const n = $('[data-s3]', lab); n.focus(); try { n.setSelectionRange(pos, pos); } catch (x) {} } else if (t.matches('[data-s5]')) { S.s5 = t.value.toUpperCase().replace(/T/g, 'U'); const pos = t.selectionStart; draw(); const n = $('[data-s5]', lab); n.focus(); try { n.setSelectionRange(pos, pos); } catch (x) {} } else if (t.matches('[data-s7]')) { S.s7 = t.value.toUpperCase(); const pos = t.selectionStart; draw(); const n = $('[data-s7]', lab); n.focus(); try { n.setSelectionRange(pos, pos); } catch (x) {} } else if (t.matches('[data-ans]')) S.game.cur = t.value.toUpperCase(); });
    lab.addEventListener('click', (e) => {
      const t = e.target, q = (s) => t.closest(s);
      if (q('[data-tab]')) return setTab(q('[data-tab]').dataset.tab);
      if (q('[data-chk2]')) { const G = S.game, ok = N.clean(G.cur, mode()).seq === G.want; G.rounds++; if (ok) G.score++; say(ok, ok ? '✓ Đúng! ' + G.want : 'Chưa đúng. Đáp án: ' + G.want, ok ? '✓ Correct! ' + G.want : 'Not right. Answer: ' + G.want); G.cur = ''; G.seed++; draw(); return; }
      if (q('[data-next2]')) { S.game.seed++; S.game.cur = ''; draw(); return; }
      if (q('[data-p3]')) { S.s3 = q('[data-p3]').dataset.p3; draw(); return; }
      if (q('[data-p5]')) { S.s5 = q('[data-p5]').dataset.p5; draw(); return; }
      if (q('[data-p7]')) { S.s7 = q('[data-p7]').dataset.p7; draw(); return; }
      if (q('[data-pos]')) { const i = +q('[data-pos]').dataset.pos; $('[data-np]', lab).value = i + 1; return; }
      if (q('[data-op]')) { const o = q('[data-op]').dataset.op, i = Math.max(1, +$('[data-np]', lab).value || 1) - 1, b = $('[data-nb]', lab).value, E = S.ed; if (o === 'sub') E.substitute(i, b); else if (o === 'ins') E.insert(i, b); else if (o === 'del') E.remove(i); else if (o === 'und') E.undo(); else if (o === 'red') E.redo(); else if (o === 'res') E.reset(N.GENES[S.gene].ref); draw(); const lg = E.state.log, d = lg.length && lg[lg.length - 1].d; if (d && o !== 'und' && o !== 'res') say(null, 'Loại: ' + (d.kind || d) + (N.phenoOf(S.gene, E.seq).allele !== N.GENES[S.gene].alleles[0].id ? ' — tính trạng đã đổi.' : ' — tính trạng giữ nguyên.'), 'Type: ' + (d.kind || d) + (N.phenoOf(S.gene, E.seq).allele !== N.GENES[S.gene].alleles[0].id ? ' — the trait changed.' : ' — the trait stayed.')); return; }
      if (q('[data-q]')) { const i = +q('[data-q]').dataset.q, a = S.s6.sel, k = a.indexOf(i); if (k >= 0) a.splice(k, 1); else a.push(i); draw(); return; }
      if (q('[data-chk6]')) { const a = S.s6.sel.slice().sort((x, y) => x - y).join(), w = S.s6.pos.join(); say(a === w, a === w ? '✓ Tìm đủ ' + S.s6.pos.length + ' vị trí ATG.' : 'Chưa đủ/chưa đúng: có ' + S.s6.pos.length + ' vị trí ATG.', a === w ? '✓ Found all ' + S.s6.pos.length + ' ATG sites.' : 'Not yet: there are ' + S.s6.pos.length + ' ATG sites.'); return; }
      if (q('[data-new6]')) { S.s6.seed++; S.s6.sel = []; draw(); return; }
      if (q('[data-sus]')) { const k = +q('[data-sus]').dataset.sus, F = N.family(S.s8.seed); S.s8.pick = k; draw(); say(k === F.culprit, k === F.culprit ? '✓ Nghi phạm ' + (k + 1) + ' khớp toàn bộ vị trí với hiện trường (dữ liệu giả lập).' : 'Nghi phạm ' + (k + 1) + ' có vị trí không khớp ⇒ loại.', k === F.culprit ? '✓ Suspect ' + (k + 1) + ' matches every locus of the scene (simulated data).' : 'Suspect ' + (k + 1) + ' has mismatching loci ⇒ excluded.'); return; }
      if (q('[data-new8]')) { S.s8.seed++; S.s8.pick = null; say(null, ''); draw(); return; }
      if (q('[data-fix]')) { const i = +q('[data-fix]').dataset.fix, c = S.s9.cur; if (i === S.s9.bad) { S.s9.cur = c.slice(0, i) + S.s9.tp[i] + c.slice(i + 1); draw(); say(true, '✓ Sửa đúng: nucleotide đã bắt cặp theo mạch khuôn.', '✓ Repaired: the nucleotide now pairs with its template.'); } else say(false, 'Cặp này vốn đã đúng. Hãy tìm nucleotide có dấu ✗.', 'This pair is already fine. Find the nucleotide marked ✗.'); return; }
      if (q('[data-new9]')) { S.s9.seed++; S.s9.cur = ''; say(null, ''); draw(); }
    });
    setTab('s1'); return {};
  }

  /* ------------------------------------------------------------ ôn Chương XI */
  function ch11Review(body) {
    const Q = [['Kiểu gene Aa × Aa cho tỉ lệ kiểu hình (trội hoàn toàn) là', 'Aa × Aa gives (complete dominance) phenotype ratio', ['3 trội : 1 lặn', '1 : 1', '1 : 2 : 1', '9 : 3 : 3 : 1'], ['3 dominant : 1 recessive', '1 : 1', '1 : 2 : 1', '9 : 3 : 3 : 1'], 0], ['Lai phân tích dùng cơ thể mang tính trạng lặn có kiểu gene', 'A test cross uses the recessive parent with genotype', ['aa', 'Aa', 'AA', 'AB'], ['aa', 'Aa', 'AA', 'AB'], 0], ['Cơ thể AaBb cho bao nhiêu loại giao tử?', 'How many gamete types does AaBb give?', ['4', '2', '8', '16'], ['4', '2', '8', '16'], 0], ['Mạch bổ sung của 5′-ATGC-3′ (viết theo vị trí) là', 'The complement of ATGC (position by position) is', ['TACG', 'ATGC', 'UACG', 'CGTA'], ['TACG', 'ATGC', 'UACG', 'CGTA'], 0], ['Nucleotide chỉ có ở RNA là', 'The nucleotide found only in RNA is', ['U', 'T', 'A', 'G'], ['U', 'T', 'A', 'G'], 0], ['Gene là', 'A gene is', ['một đoạn DNA mang thông tin quy định sản phẩm', 'một loại protein', 'một nhiễm sắc thể', 'một tế bào'], ['a DNA segment carrying information for a product', 'a kind of protein', 'a chromosome', 'a cell'], 0]];
    const S = { a: {} };
    body.innerHTML = `<div class="olab em" data-lab><p class="olab__hint">${pr('Ôn nhanh Chương XI: chọn đáp án, nhận phản hồi ngay.', 'Quick review of Chapter XI: choose an answer for instant feedback.')}</p><div data-area></div><div class="olab__btns"><button type="button" class="btn btn--sm" data-reset>${pr('Làm lại', 'Reset')}</button></div></div>`;
    const lab = $('[data-lab]', body), area = $('[data-area]', lab);
    const draw = () => { const done = Object.keys(S.a).length, ok = Object.keys(S.a).filter((k) => S.a[k] === Q[k][4]).length; area.innerHTML = Q.map((q, i) => `<fieldset><legend>${i + 1}. ${pr(q[0], q[1])}</legend>${q[2].map((o, j) => `<label style="display:block"><input type="radio" name="q${i}" value="${j}"${S.a[i] === j ? ' checked' : ''}> ${pr(o, q[3][j])}</label>`).join('')}${S.a[i] != null ? `<small>${S.a[i] === q[4] ? '✓ ' + pr('Đúng', 'Correct') : '✗ ' + pr('Chưa đúng — đáp án: ', 'Not right — answer: ') + pr(q[2][q[4]], q[3][q[4]])}</small>` : ''}</fieldset>`).join('') + `<p><b>${pr('Điểm', 'Score')}: ${ok} / ${Q.length}</b> (${done}/${Q.length})</p>`; };
    lab.addEventListener('change', (e) => { if (e.target.name && e.target.name[0] === 'q') { S.a[+e.target.name.slice(1)] = +e.target.value; draw(); } });
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-reset]')) { S.a = {}; draw(); } });
    draw(); return {};
  }

  window.LabSims = Object.assign(window.LabSims || {}, {
    'rna-lab': { fn: rnaLab, vi: 'RNA bổ sung từ DNA', en: 'RNA from a DNA template', intro: 'Nhập mạch gốc DNA.' },
    'gene-timeline': { fn: geneTimeline, vi: 'Mốc thời gian về gene', en: 'Gene timeline', intro: 'Kéo thanh trượt năm.' },
    'dna-lab': { fn: dnaLab, vi: 'Phòng thí nghiệm DNA & RNA', en: 'DNA & RNA sandbox', intro: 'Chọn một thẻ thí nghiệm.' },
    'ch11-review': { fn: ch11Review, vi: 'Ôn tập Chương XI', en: 'Chapter XI review', intro: 'Chọn đáp án.' }
  });
})();
