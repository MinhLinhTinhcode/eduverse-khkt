/* ==========================================================================
   MOL W37 — widget Bài 37 "Các quy luật di truyền của Mendel". Nạp SAU mol-w36.js. Dùng GenLab.engine.
   mendel-table (W37.1) · punnett-mono (W37.2) · meiosis-sim (W37.3) · test-cross (W37.4) · punnett-di (W37.5, 4×4) · cross-lab (W37.6) · diversity (W37.7)
   Số liệu bảng 37.1 và 2 thí nghiệm lưỡng tính lấy từ GenLab.MENDEL (cần đối chiếu sách in). Màu luôn đi kèm chữ.
   Nhãn “mở rộng”: mô phỏng ngẫu nhiên, lai ≥ 3 cặp gene, số liệu 2ⁿ/4ⁿ cho n lớn.
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab, ML = window.MolLab, EL = window.EnergyLab, GL = window.GenLab;
  if (!L || !ML || !ML.org || !ML.org36 || !ML.org28 || !GL || !GL.engine) return;
  const { pr, fmt } = L, U = ML.ui, O = ML.org, { $ } = U, G = GL.engine, { EXT } = ML.org28, { bars, ratioTxt } = ML.org36;
  const strip = (s) => String(s).replace(/<[^>]+>/g, ''), aria = (vi, en) => strip(vi) + ' / ' + strip(en), f2 = (x) => fmt(x, 2);
  const GENO3 = ['AA', 'Aa', 'aa'];
  const pName = (t, key) => (key === 'D' ? t.dom : t.rec);                       // 'D' / 'r'

  /* ------------------------------------------------------------ W37.1 : bảng 37.1 và hai tính trạng */
  function mendelTable(body) {
    const M = G.MENDEL, S = { shown: {}, di: false };
    body.innerHTML = `<div class="olab em" data-lab><p class="olab__hint">${pr('Bảng số liệu F₂ của Mendel (số đếm lấy từ sách, cần đối chiếu bản in). Bấm “Tính tỉ lệ” từng hàng.', 'Mendel’s F₂ counts (numbers read from the book — check against the printed copy). Press “Compute ratio” in each row.')}</p><div data-area></div><div class="olab__btns"><button type="button" class="btn btn--sm" data-di>${pr('Hai tính trạng cùng lúc (vàng/xanh × trơn/nhăn)', 'Two traits together (yellow/green × smooth/wrinkled)')}</button><button type="button" class="btn btn--sm" data-reset>${pr('Đặt lại', 'Reset')}</button></div><p class="olab__status" data-st role="status" aria-live="polite"></p></div>`;
    const lab = $('[data-lab]', body), area = $('[data-area]', lab), st = $('[data-st]', lab);
    const draw = () => {
      let h = `<table class="olab__tbl"><thead><tr><th>${pr('Tính trạng P', 'P trait')}</th><th>${pr('Trội F₂', 'Dominant F₂')}</th><th>${pr('Lặn F₂', 'Recessive F₂')}</th><th>${pr('Tỉ lệ trội : lặn', 'Dom : rec ratio')}</th></tr></thead><tbody>`;
      M.T371.forEach((r) => { h += `<tr><td>${pr(r.P[0], r.P[1])}</td><td>${r.dom} ${pr(r.names[0][0], r.names[0][1])}</td><td>${r.rec} ${pr(r.names[1][0], r.names[1][1])}</td><td>${S.shown[r.id] ? `<b>${f2(M.ratio2(r.dom, r.rec))} : 1</b> ≈ 3 : 1` : `<button type="button" class="btn btn--sm" data-r="${r.id}">${pr('Tính tỉ lệ', 'Compute ratio')}</button>`}</td></tr>`; });
      h += '</tbody></table>';
      if (S.di) { const D = M.DI, n = M.totalDi(), th = M.theoryDi(n); h += `<h4>${pr('Hai tính trạng: F₂ có ' + n + ' hạt', 'Two traits: F₂ has ' + n + ' seeds')}</h4>` + bars([{ vi: 'vàng, trơn', en: 'yellow, smooth', n: D.yt, exp: th[0] }, { vi: 'vàng, nhăn', en: 'yellow, wrinkled', n: D.yn, exp: th[1], c: '#d97706' }, { vi: 'xanh, trơn', en: 'green, smooth', n: D.xt, exp: th[2], c: '#16a34a' }, { vi: 'xanh, nhăn', en: 'green, wrinkled', n: D.xn, exp: th[3], c: '#64748b' }], n) + `<p><b>${pr('Quy về', 'Scaled')}: ${M.scaled().map((x) => f2(x)).join(' : ')} ≈ 9 : 3 : 3 : 1</b></p><p>${pr('Xét riêng: vàng ' + (D.yt + D.yn) + ' : xanh ' + (D.xt + D.xn) + ' ≈ 3 : 1; trơn ' + (D.yt + D.xt) + ' : nhăn ' + (D.yn + D.xn) + ' ≈ 3 : 1 ⇒ hai cặp tính trạng di truyền độc lập.', 'Each alone: yellow ' + (D.yt + D.yn) + ' : green ' + (D.xt + D.xn) + ' ≈ 3 : 1; smooth ' + (D.yt + D.xt) + ' : wrinkled ' + (D.yn + D.xn) + ' ≈ 3 : 1 ⇒ the two pairs of traits are inherited independently.')}</p>`; }
      area.innerHTML = h;
    };
    lab.addEventListener('click', (e) => { const r = e.target.closest('[data-r]'); if (r) { S.shown[r.dataset.r] = 1; if (Object.keys(S.shown).length === M.T371.length) O.say(st, true, 'Cả bốn tính trạng đều cho tỉ lệ trội : lặn ≈ 3 : 1 ở F₂.', 'All four traits give a dominant : recessive ratio ≈ 3 : 1 in F₂.'); draw(); } else if (e.target.closest('[data-di]')) { S.di = !S.di; draw(); } else if (e.target.closest('[data-reset]')) { S.shown = {}; S.di = false; O.say(st, null, ''); draw(); } });
    draw(); return {};
  }

  /* ------------------------------------------------------------ W37.2 : Punnett 2×2 */
  const grid = (X, tr, opt) => {
    opt = opt || {}; let h = `<div style="overflow-x:auto" tabindex="0" role="group" aria-label="${aria('Bảng Punnett', 'Punnett square')}"><table class="olab__tbl"><thead><tr><th>♀ \\ ♂</th>` + X.cols.map((c) => `<th>${c.g}${c.n > 1 ? '×' + c.n : ''}</th>`).join('') + '</tr></thead><tbody>';
    X.cells.forEach((row, i) => { h += `<tr><th>${X.rows[i].g}${X.rows[i].n > 1 ? '×' + X.rows[i].n : ''}</th>` + row.map((c) => `<td><b>${c.geno}</b>${tr && c.pheno.length === 1 ? '<br><small>' + pr(pName(tr, c.pheno)[0], pName(tr, c.pheno)[1]) + '</small>' : '<br><small>' + c.pheno.split('').map((k) => (k === 'D' ? '▲' : '▽')).join('') + '</small>'}</td>`).join('') + '</tr>'; });
    return h + '</tbody></table></div>';
  };
  const summary = (X, tr) => {
    const gk = Object.keys(X.geno).sort(), pk = Object.keys(X.pheno).sort((a, b) => X.pheno[b] - X.pheno[a]);
    return `<p><b>${pr('Kiểu gene', 'Genotype')}:</b> ${gk.map((k) => X.geno[k] + ' ' + k).join(' : ')} (${G.ratio(X.geno)})</p><p><b>${pr('Kiểu hình', 'Phenotype')}:</b> ${pk.map((k) => X.pheno[k] + ' ' + (tr && k.length === 1 ? strip(pName(tr, k)[0]) : (k.split('').map((c) => (c === 'D' ? '▲' : '▽')).join('')))).join(' : ')} (${G.ratio(X.pheno)})${tr ? '' : `<br><small>▲ = ${pr('trội', 'dominant')}, ▽ = ${pr('lặn', 'recessive')}</small>`}</p>`;
  };
  function punnettMono(body) {
    const P = { a: 1, b: 1, t: 0 };
    const sel = (id, v) => `<select data-p="${id}" aria-label="${id}">${GENO3.map((g, i) => `<option value="${i}"${i === v ? ' selected' : ''}>${g}</option>`).join('')}</select>`;
    body.innerHTML = `<div class="olab em" data-lab><p class="olab__hint">${pr('Chọn kiểu gene của bố mẹ, xem bảng Punnett.', 'Choose the parents’ genotypes and read the Punnett square.')}</p><label class="olab__ctl"><span>${pr('Tính trạng', 'Trait')}</span><select data-t>${G.TRAITS.map((t, i) => `<option value="${i}">${t.name[0]} / ${t.name[1]}</option>`).join('')}</select></label><div class="olab__cols"><label>${pr('Mẹ ♀', 'Mother ♀')} ${sel('a', P.a)}</label><label>${pr('Bố ♂', 'Father ♂')} ${sel('b', P.b)}</label></div><div data-area></div><div class="olab__btns"><button type="button" class="btn btn--sm" data-reset>${pr('Đặt lại (Aa × Aa)', 'Reset (Aa × Aa)')}</button></div></div>`;
    const lab = $('[data-lab]', body), area = $('[data-area]', lab);
    const draw = () => {
      const tr = G.TRAITS[P.t], l = tr.letter, mk = (g) => g.replace(/A/g, l).replace(/a/g, l.toLowerCase()), X = G.cross(mk(GENO3[P.a]), mk(GENO3[P.b]));
      area.innerHTML = `<p>${pr('Giao tử mẹ', 'Maternal gametes')}: ${X.rows.map((r) => r.g).join(', ')} · ${pr('bố', 'paternal')}: ${X.cols.map((r) => r.g).join(', ')}</p>` + grid(X, tr) + summary(X, tr);
    };
    lab.addEventListener('change', (e) => { if (e.target.matches('[data-p]')) { P[e.target.dataset.p] = +e.target.value; draw(); } else if (e.target.matches('[data-t]')) { P.t = +e.target.value; draw(); } });
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-reset]')) { P.a = 1; P.b = 1; lab.querySelectorAll('[data-p]').forEach((s) => (s.value = '1')); draw(); } });
    draw(); return {};
  }

  /* ------------------------------------------------------------ W37.3 : giảm phân và thụ tinh */
  function meiosisSim(body) {
    const S = { step: 0, m: null, f: null };
    body.innerHTML = `<div class="olab em pw" data-lab><p class="olab__hint">${pr('Cơ thể mẹ và bố đều Aa. Bấm “Giảm phân”, rồi chọn một giao tử mỗi bên để thụ tinh. (Hình 37.3 vẽ lại bằng mô phỏng.)', 'Both parents are Aa. Press “Meiosis”, then pick one gamete from each side to fertilise. (Figure 37.3 redrawn as a simulation.)')}</p><div data-area></div><div class="olab__btns"><button type="button" class="btn btn--sm btn--primary" data-meio>${pr('Giảm phân', 'Meiosis')}</button><button type="button" class="btn btn--sm" data-rand>${pr('Chọn ngẫu nhiên', 'Pick at random')}</button><button type="button" class="btn btn--sm" data-reset>${pr('Đặt lại', 'Reset')}</button></div><p class="olab__status" data-st role="status" aria-live="polite"></p></div>`;
    const lab = $('[data-lab]', body), area = $('[data-area]', lab), st = $('[data-st]', lab);
    const cell = (alleles, lab2) => `<svg viewBox="0 0 90 56" width="90" role="img" aria-label="${aria(lab2[0], lab2[1])}"><ellipse cx="45" cy="28" rx="40" ry="22" fill="none" stroke="currentColor" stroke-width="2"/>${alleles.map((a, i) => `<rect x="${alleles.length === 1 ? 38 : 24 + i * 24}" y="16" width="14" height="24" rx="6" fill="${a === 'A' ? '#7c3aed' : '#f8fafc'}" stroke="#334155" stroke-width="2"${a === 'A' ? '' : ' stroke-dasharray="3 2"'}/><text x="${alleles.length === 1 ? 45 : 31 + i * 24}" y="33" text-anchor="middle" style="font:700 11px system-ui" fill="${a === 'A' ? '#fff' : '#111'}">${a}</text>`).join('')}</svg>`;
    const draw = () => {
      const mom = cell(['A', 'a'], ['Tế bào mẹ Aa', 'Mother cell Aa']), dad = cell(['A', 'a'], ['Tế bào bố Aa', 'Father cell Aa']);
      let h = `<div class="olab__cols"><div><b>♀</b><br>${mom}</div><div><b>♂</b><br>${dad}</div></div>`;
      if (S.step >= 1) h += `<div class="olab__cols"><div>${['A', 'a'].map((g) => O.chip('m' + g, g + ' ♀', g + ' ♀', S.m === g ? 'is-sel' : '')).join('')}</div><div>${['A', 'a'].map((g) => O.chip('f' + g, g + ' ♂', g + ' ♂', S.f === g ? 'is-sel' : '')).join('')}</div></div><p><small>${pr('Mỗi tế bào Aa giảm phân cho hai loại giao tử A và a, mỗi loại mang một allele (xác suất bằng nhau).', 'Each Aa cell gives two kinds of gametes, A and a, each with one allele (equal chance).')}</small></p>`;
      if (S.m && S.f) { const g = S.m <= S.f ? S.m + S.f : S.f + S.m; h += `<p><b>${pr('Hợp tử', 'Zygote')}: ${S.m} + ${S.f} → ${g}</b> (${pr(g === 'aa' ? 'hoa trắng/lặn' : 'trội', g === 'aa' ? 'recessive' : 'dominant')})</p>${cell([g[0], g[1]], ['Hợp tử ' + g, 'Zygote ' + g])}`; }
      area.innerHTML = h;
    };
    const pick = (cid) => { if (cid[0] === 'm') S.m = cid[1]; else S.f = cid[1]; draw(); if (S.m && S.f) O.say(st, true, 'Thụ tinh kết hợp ngẫu nhiên một giao tử đực với một giao tử cái ⇒ 4 tổ hợp có xác suất bằng nhau.', 'Fertilisation joins one male and one female gamete at random ⇒ 4 equally likely combinations.'); };
    lab.addEventListener('click', (e) => { const c = e.target.closest('[data-drag]'); if (c && S.step >= 1) { pick(c.dataset.drag); return; } if (e.target.closest('[data-meio]')) { S.step = 1; draw(); O.say(st, null, 'Đã giảm phân: hai loại giao tử mỗi bên.', 'Meiosis done: two kinds of gametes per side.'); } else if (e.target.closest('[data-rand]')) { S.step = 1; S.m = Math.random() < 0.5 ? 'A' : 'a'; S.f = Math.random() < 0.5 ? 'A' : 'a'; draw(); } else if (e.target.closest('[data-reset]')) { Object.assign(S, { step: 0, m: null, f: null }); O.say(st, null, ''); draw(); } });
    lab.addEventListener('keydown', (e) => { if (e.key === 'Enter') { const c = e.target.closest('[data-drag]'); if (c && S.step >= 1) { e.preventDefault(); pick(c.dataset.drag); } } });
    draw(); return {};
  }

  /* ------------------------------------------------------------ W37.4 : lai phân tích */
  function testCross(body) {
    const S = { seed: 7, hidden: null, n: 8, guess: null, done: false }, NS = [2, 4, 8, 20, 100];
    const roll = () => { const r = G.prng(S.seed * 31 + 5)(); S.hidden = r < 0.5 ? 'AA' : 'Aa'; };
    roll();
    body.innerHTML = `<div class="olab em" data-lab><p class="olab__hint">${pr('Một cây hoa tím có kiểu gene giấu kín (AA hay Aa?). Lai với cây hoa trắng aa rồi đếm đời con để đoán.', 'A purple plant hides its genotype (AA or Aa?). Cross it with a white aa plant and count the offspring to decide.')}</p>${U.ctl('n', 'Số cây con', 'Offspring count', 0, 4, 1, 2)}<div data-area></div><div class="olab__btns"><button type="button" class="btn btn--sm" data-a>AA</button><button type="button" class="btn btn--sm" data-b>Aa</button><button type="button" class="btn btn--sm" data-new>${pr('Cây khác', 'Another plant')}</button></div><p class="olab__status" data-st role="status" aria-live="polite"></p></div>`;
    const lab = $('[data-lab]', body), area = $('[data-area]', lab), st = $('[data-st]', lab), P = { n: 2 };
    const draw = () => {
      S.n = NS[P.n]; const r = G.sample(S.hidden, 'aa', S.n, S.seed), D = r.pheno.D || 0, rr = r.pheno.r || 0, X = G.testCross(S.hidden);
      area.innerHTML = `<p>${pr('Phép lai', 'Cross')}: <b>? × aa</b> → ${S.n} ${pr('cây con', 'offspring')}</p>` + bars([{ vi: 'hoa tím', en: 'purple', n: D, c: '#7c3aed' }, { vi: 'hoa trắng', en: 'white', n: rr, c: '#94a3b8' }], S.n) + (S.done ? `<p><b>${pr('Cây giấu kín là ' + S.hidden, 'The hidden plant was ' + S.hidden)}</b> · ${pr('lí thuyết', 'theory')}: ${G.ratio(X.pheno)}</p>` : '');
    };
    U.bindCtl(lab, P, draw);
    lab.addEventListener('click', (e) => {
      const g = e.target.closest('[data-a],[data-b]'); if (g) { const guess = g.hasAttribute('data-a') ? 'AA' : 'Aa', r = G.sample(S.hidden, 'aa', S.n, S.seed), inf = G.infer(r.pheno.D || 0, r.pheno.r || 0); S.done = true; draw();
        if (guess === S.hidden) O.say(st, true, `✓ Đúng, cây là ${S.hidden}. ` + (S.hidden === 'Aa' ? 'Chỉ cần một cây hoa trắng ở đời con là kết luận được dị hợp.' : 'Toàn hoa tím: đồng hợp (càng nhiều con càng chắc chắn).'), `✓ Correct, the plant is ${S.hidden}. ` + (S.hidden === 'Aa' ? 'One white offspring is enough to show it is heterozygous.' : 'All purple: homozygous (more offspring means more certainty).'));
        else O.say(st, false, `Chưa đúng — đáp án là ${S.hidden}. ` + (inf.kind === 'het' ? 'Có cây hoa trắng ở đời con ⇒ bố/mẹ phải mang allele a.' : 'Cần xét nhiều cây con hơn.'), `Not right — it is ${S.hidden}. ` + (inf.kind === 'het' ? 'A white offspring means the parent carries allele a.' : 'Look at more offspring.')); return; }
      if (e.target.closest('[data-new]')) { S.seed += 11; S.done = false; roll(); O.say(st, null, ''); draw(); }
    });
    draw(); return {};
  }

  /* ------------------------------------------------------------ W37.5 : Punnett 4×4 (hai cặp gene) */
  function punnettDi(body) {
    const P = { a: 'AaBb', b: 'AaBb', n: 556 };
    const OPT = ['AaBb', 'AABB', 'aabb', 'AaBB', 'AABb', 'Aabb', 'aaBb'];
    const sel = (id) => `<select data-p="${id}">${OPT.map((g) => `<option${g === P[id] ? ' selected' : ''}>${g}</option>`).join('')}</select>`;
    body.innerHTML = `<div class="olab em" data-lab><p class="olab__hint">${pr('A: hạt vàng, a: hạt xanh; B: hạt trơn, b: hạt nhăn. Chọn bố mẹ; bảng 4 × 4 cuộn ngang được trên điện thoại.', 'A: yellow, a: green; B: smooth, b: wrinkled. Choose parents; the 4 × 4 table scrolls sideways on a phone.')}</p><div class="olab__cols"><label>${pr('Mẹ', 'Mother')} ${sel('a')}</label><label>${pr('Bố', 'Father')} ${sel('b')}</label></div><div data-area></div><div class="olab__btns"><button type="button" class="btn btn--sm" data-reset>${pr('Đặt lại', 'Reset')}</button></div></div>`;
    const lab = $('[data-lab]', body), area = $('[data-area]', lab);
    const NM = { DD: ['vàng, trơn', 'yellow, smooth'], Dr: ['vàng, nhăn', 'yellow, wrinkled'], rD: ['xanh, trơn', 'green, smooth'], rr: ['xanh, nhăn', 'green, wrinkled'] };
    const draw = () => {
      const X = G.cross(P.a, P.b); let h = `<p>${pr('Giao tử mẹ', 'Maternal gametes')}: ${X.rows.map((r) => r.g).join(', ')}<br>${pr('Giao tử bố', 'Paternal gametes')}: ${X.cols.map((r) => r.g).join(', ')}</p>` + grid(X, null).replace(/<br><small>[^<]*<\/small>/g, (m) => m) + `<p><small>${pr('Ô ghi kiểu gene; ▲▽ = trội/lặn của cặp A rồi cặp B.', 'Cells show the genotype; ▲▽ = dominant/recessive of pair A then pair B.')}</small></p>`;
      h += bars(Object.keys(NM).map((k) => ({ vi: NM[k][0], en: NM[k][1], n: X.pheno[k] || 0, c: { DD: '#eab308', Dr: '#d97706', rD: '#16a34a', rr: '#64748b' }[k] })), X.total) + `<p><b>${pr('Tỉ lệ kiểu hình', 'Phenotype ratio')}: ${G.ratio(X.pheno)}</b> · ${pr('kiểu gene', 'genotype')}: ${Object.keys(X.geno).length} ${pr('loại', 'kinds')} (${G.ratio(X.geno)})</p>`;
      if (P.a === 'AaBb' && P.b === 'AaBb') { const M = G.MENDEL, n = M.totalDi(); h += `<p>${pr('So với thí nghiệm của Mendel (n = ' + n + '): lí thuyết ' + M.theoryDi(n).map(f2).join(' : ') + ', thực tế ' + [G.MENDEL.DI.yt, G.MENDEL.DI.yn, G.MENDEL.DI.xt, G.MENDEL.DI.xn].join(' : ') + '.', 'Compared with Mendel’s experiment (n = ' + n + '): expected ' + M.theoryDi(n).map(f2).join(' : ') + ', observed ' + [G.MENDEL.DI.yt, G.MENDEL.DI.yn, G.MENDEL.DI.xt, G.MENDEL.DI.xn].join(' : ') + '.')}</p>`; }
      area.innerHTML = h;
    };
    lab.addEventListener('change', (e) => { if (e.target.matches('[data-p]')) { P[e.target.dataset.p] = e.target.value; draw(); } });
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-reset]')) { P.a = 'AaBb'; P.b = 'AaBb'; lab.querySelectorAll('[data-p]').forEach((s) => (s.value = 'AaBb')); draw(); } });
    draw(); return {};
  }

  /* ------------------------------------------------------------ W37.6 : phòng lai tự do */
  function crossLab(body) {
    const P = { a: 'AaBb', b: 'aabb', n: 1000, seed: 3 };
    body.innerHTML = `<div class="olab em" data-lab><p class="olab__hint">${pr('Gõ kiểu gene (tối đa 3 cặp, ví dụ AaBb hoặc AaBbCc; mỗi cặp viết hoa trước). Bấm “Lai”.', 'Type genotypes (up to 3 pairs, e.g. AaBb or AaBbCc; capital letter first). Press “Cross”.')} ${EXT('lai 3 cặp gene vượt chương trình', 'three-pair crosses go beyond the syllabus')}</p><div class="olab__cols"><label>${pr('Mẹ', 'Mother')} <input type="text" data-p="a" value="${P.a}" maxlength="6" size="8" aria-label="mother genotype"></label><label>${pr('Bố', 'Father')} <input type="text" data-p="b" value="${P.b}" maxlength="6" size="8" aria-label="father genotype"></label></div><div class="olab__btns"><button type="button" class="btn btn--sm btn--primary" data-go>${pr('Lai', 'Cross')}</button><button type="button" class="btn btn--sm" data-again>${pr('Mô phỏng lại', 'Re-simulate')}</button><button type="button" class="btn btn--sm" data-reset>${pr('Đặt lại', 'Reset')}</button></div><div data-area></div><p class="olab__status" data-st role="status" aria-live="polite"></p></div>`;
    const lab = $('[data-lab]', body), area = $('[data-area]', lab), st = $('[data-st]', lab);
    const go = () => {
      const X = G.cross(P.a, P.b);
      if (!X) { area.innerHTML = ''; O.say(st, false, 'Không hợp lệ: hai cơ thể phải cùng các gene theo cùng thứ tự (ví dụ AaBb × aabb), chữ hoa trước, tối đa 3 cặp.', 'Invalid: both parents need the same genes in the same order (e.g. AaBb × aabb), capital first, max 3 pairs.'); return; }
      O.say(st, null, '');
      const k = X.rows.length * X.cols.length, small = k <= 16;
      let h = `<p>${pr('Giao tử', 'Gametes')}: ♀ ${X.rows.map((r) => r.g + (r.n > 1 ? '×' + r.n : '')).join(', ')} · ♂ ${X.cols.map((r) => r.g + (r.n > 1 ? '×' + r.n : '')).join(', ')}</p>`;
      h += small ? grid(X, null) : `<p><small>${pr('Bảng quá lớn (' + k + ' ô) nên chỉ hiện tổng hợp.', 'The table is too big (' + k + ' cells), so only the summary is shown.')}</small></p>`;
      h += summary(X, null);
      const r = G.sample(P.a, P.b, P.n, P.seed), keys = Object.keys(r.pheno).sort();
      h += `<h4>${pr('Mô phỏng ' + P.n + ' đời con', 'Simulated ' + P.n + ' offspring')} ${EXT('ngẫu nhiên có hạt giống', 'seeded random')}</h4>` + bars(keys.map((q) => ({ vi: q.split('').map((c) => (c === 'D' ? '▲' : '▽')).join(''), en: '', n: r.pheno[q], exp: P.n * X.pheno[q] / X.total })), P.n);
      area.innerHTML = h;
    };
    lab.addEventListener('input', (e) => { if (e.target.matches('[data-p]')) { P[e.target.dataset.p] = e.target.value.trim(); } });
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-go]')) go(); else if (e.target.closest('[data-again]')) { P.seed += 13; go(); } else if (e.target.closest('[data-reset]')) { Object.assign(P, { a: 'AaBb', b: 'aabb', seed: 3 }); lab.querySelectorAll('[data-p]').forEach((s) => (s.value = P[s.dataset.p])); go(); } });
    go(); return {};
  }

  /* ------------------------------------------------------------ W37.7 : đa dạng 2ⁿ / 4ⁿ */
  function diversity(body) {
    const P = { k: 2 };
    body.innerHTML = `<div class="olab em" data-lab><p class="olab__hint">${pr('Cơ thể dị hợp về k cặp gene phân li độc lập: số loại giao tử và số tổ hợp.', 'An organism heterozygous for k independently assorting gene pairs: number of gamete types and combinations.')} ${EXT('k lớn là suy rộng ngoài SGK', 'large k is an extension beyond the book')}</p>${U.ctl('k', 'Số cặp gene dị hợp k', 'Heterozygous gene pairs k', 1, 23, 1, P.k)}<div data-area></div><p class="olab__status" data-st role="status" aria-live="polite"></p></div>`;
    const lab = $('[data-lab]', body), area = $('[data-area]', lab), st = $('[data-st]', lab);
    const fmtN = (x) => (x >= 1e9 ? x.toExponential(2).replace('e+', ' × 10^').replace('.', ',') : String(Math.round(x)).replace(/\B(?=(\d{3})+(?!\d))/g, ' '));
    const draw = () => {
      const g = G.gametesCount(P.k), c = G.combosCount(P.k);
      area.innerHTML = `<table class="olab__tbl"><tbody><tr><th>${pr('Loại giao tử mỗi bố mẹ', 'Gamete types per parent')} 2<sup>${P.k}</sup></th><td><b>${fmtN(g)}</b></td></tr><tr><th>${pr('Tổ hợp giao tử', 'Gamete combinations')} 4<sup>${P.k}</sup></th><td><b>${fmtN(c)}</b></td></tr><tr><th>${pr('Kiểu hình (trội hoàn toàn)', 'Phenotypes (complete dominance)')} 2<sup>${P.k}</sup></th><td>${fmtN(g)}</td></tr><tr><th>${pr('Kiểu gene', 'Genotypes')} 3<sup>${P.k}</sup></th><td>${fmtN(Math.pow(3, P.k))}</td></tr></tbody></table>`;
      O.say(st, null, P.k === 2 ? 'k = 2: 4 loại giao tử, 16 tổ hợp, đúng bảng 4 × 4.' : P.k === 23 ? 'k = 23 (số cặp nhiễm sắc thể người): hơn 8 triệu loại giao tử, chưa kể trao đổi chéo (mở rộng).' : 'Mỗi cặp gene dị hợp thêm vào làm số giao tử nhân đôi.', P.k === 2 ? 'k = 2: 4 gamete types, 16 combinations — the 4 × 4 square.' : P.k === 23 ? 'k = 23 (the number of human chromosome pairs): over 8 million gamete types, not counting crossing over (extension).' : 'Each extra heterozygous pair doubles the gamete types.');
    };
    U.bindCtl(lab, P, draw); draw(); return { state: P };
  }

  window.LabSims = Object.assign(window.LabSims || {}, {
    'mendel-table': { fn: mendelTable, vi: 'Bảng số liệu Mendel (Bảng 37.1)', en: 'Mendel’s data (Table 37.1)', intro: 'Tính tỉ lệ trội : lặn.' },
    'punnett-mono': { fn: punnettMono, vi: 'Bảng Punnett một cặp tính trạng', en: 'Monohybrid Punnett square', intro: 'Chọn kiểu gene bố mẹ.' },
    'meiosis-sim': { fn: meiosisSim, vi: 'Giảm phân và thụ tinh (Hình 37.3)', en: 'Meiosis and fertilisation (Figure 37.3)', intro: 'Chọn giao tử để thụ tinh.' },
    'test-cross': { fn: testCross, vi: 'Lai phân tích', en: 'Test cross', intro: 'Đoán kiểu gene cây giấu kín.' },
    'punnett-di': { fn: punnettDi, vi: 'Bảng Punnett 4 × 4 (hai cặp tính trạng)', en: 'Dihybrid 4 × 4 Punnett square', intro: 'Chọn bố mẹ AaBb…' },
    'cross-lab': { fn: crossLab, vi: 'Phòng lai tự do', en: 'Free cross lab', intro: 'Gõ kiểu gene và lai.' },
    'diversity': { fn: diversity, vi: 'Đa dạng di truyền 2ⁿ và 4ⁿ', en: 'Genetic diversity 2ⁿ and 4ⁿ', intro: 'Kéo thanh trượt k.' }
  });
})();
