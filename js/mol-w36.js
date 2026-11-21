/* ==========================================================================
   MOL W36 — widget Bài 36 "Khái quát về di truyền học". Nạp SAU mol-w35b.js. Dùng GenLab.engine (gen-lab.js).
   gen-inherit (W36.1) · pea-garden (W36.2, trọng tâm: kéo hạt phấn) · gen-blend (W36.5) · gen-terms (W36.3) · cross-builder (W36.4, trọng tâm)
   Dụng cụ chung: ML.org36 = { flower, seed, bars, tbl, rng } — dùng lại ở Bài 37.
   Màu KHÔNG là kênh thông tin duy nhất: hoa tím có nhãn chữ “tím”, hoa trắng viền nét đứt + nhãn “trắng”; hạt vàng/xanh có nhãn, trơn/nhăn có hoa văn.
   Nhãn “bổ sung/mở rộng”: bước khử nhị khi thụ phấn chéo, mô hình hoà trộn (định tính), mô phỏng ngẫu nhiên.
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab, ML = window.MolLab, EL = window.EnergyLab, GL = window.GenLab;
  if (!L || !ML || !ML.org || !ML.org34 || !ML.org28 || !EL || !GL || !GL.engine) return;
  const { pr, fmt, clamp } = L, U = ML.ui, O = ML.org, { $, $$ } = U, G = GL.engine, { EXT } = ML.org28;
  const strip = (s) => String(s).replace(/<[^>]+>/g, ''), aria = (vi, en) => strip(vi) + ' / ' + strip(en), f1 = (x) => fmt(x, 1), f2 = (x) => fmt(x, 2);
  const PUR = '#7c3aed', GRN = '#65a30d', YEL = '#eab308';

  /* ------------------------------------------------------------ biểu tượng và biểu đồ dùng chung */
  const flower = (purple, x, y, s, lab) => { s = s || 1; const c = purple ? PUR : '#fff', st = purple ? '#4c1d95' : '#334155'; let p = ''; for (let i = 0; i < 5; i++) { const a = i * 1.2566; p += `<ellipse cx="${x + Math.cos(a) * 9 * s}" cy="${y + Math.sin(a) * 9 * s}" rx="${7 * s}" ry="${5 * s}" transform="rotate(${i * 72} ${x + Math.cos(a) * 9 * s} ${y + Math.sin(a) * 9 * s})" fill="${c}" stroke="${st}" stroke-width="1.6"${purple ? '' : ' stroke-dasharray="3 2"'}/>`; } return p + `<circle cx="${x}" cy="${y}" r="${4 * s}" fill="#facc15" stroke="#854d0e" stroke-width="1.2"/>` + (lab ? `<text x="${x}" y="${y + 26 * s}" text-anchor="middle" style="font:700 9px system-ui" fill="currentColor">${lab}</text>` : ''); };
  const seed = (yellow, smooth, x, y, r, lab) => { r = r || 12; let s = `<circle cx="${x}" cy="${y}" r="${r}" fill="${yellow ? YEL : GRN}" stroke="#1f2937" stroke-width="1.6"/>`; if (smooth) s += `<path d="M${x - r * 0.5} ${y - r * 0.4} Q${x} ${y - r * 0.9} ${x + r * 0.5} ${y - r * 0.4}" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>`; else s += `<path d="M${x - r * 0.7} ${y - r * 0.2} q${r * 0.3} ${-r * 0.5} ${r * 0.5} 0 t${r * 0.5} 0 t${r * 0.5} 0 M${x - r * 0.6} ${y + r * 0.35} q${r * 0.3} ${-r * 0.5} ${r * 0.5} 0 t${r * 0.5} 0 t${r * 0.4} 0" fill="none" stroke="#1f2937" stroke-width="1.2"/>`; return s + (lab ? `<text x="${x}" y="${y + r + 11}" text-anchor="middle" style="font:700 9px system-ui" fill="currentColor">${lab}</text>` : ''); };
  /* cột đếm: items [{vi,en,n,exp?}] */
  const bars = (items, tot) => { const mx = Math.max(1, ...items.map((i) => Math.max(i.n, i.exp || 0))); return `<div class="gl__bars" style="display:grid;gap:6px">${items.map((i) => `<div><small>${pr(i.vi, i.en)}: <b>${i.n}</b>${i.exp != null ? ` · ${pr('lí thuyết', 'expected')} ${f2(i.exp)}` : ''}${tot ? ` (${f1(100 * i.n / Math.max(1, tot))} %)` : ''}</small><div style="background:var(--line,#e5e7eb);height:14px;border-radius:7px;overflow:hidden"><div style="width:${100 * i.n / mx}%;height:100%;background:${i.c || '#2563eb'}"></div></div></div>`).join('')}</div>`; };
  const rng = (seed0) => { let s = seed0 >>> 0 || 1; return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296; };
  const ratioTxt = (d, r) => (r > 0 ? fmt(d / r, 2) + ' : 1' : '—');
  ML.org36 = { flower, seed, bars, rng, ratioTxt, PUR, GRN, YEL };

  /* ------------------------------------------------------------ W36.1 : di truyền hay biến dị */
  function genInherit(body) {
    const [a, b] = U.wrap(body, 2);
    const IT = [['Con thứ nhất tóc xoăn như bố mẹ', 'First child has curly hair like the parents', 'h'], ['Con thứ hai tóc thẳng, khác bố mẹ', 'Second child has straight hair, unlike the parents', 'v'], ['Con có nhóm máu giống bố', 'Child has the same blood group as the father', 'h'], ['Con mắt nâu giống mẹ', 'Child has brown eyes like the mother', 'h'], ['Con cao hơn hẳn bố mẹ', 'Child is much taller than both parents', 'v'], ['Con có màu mắt mà bố mẹ không có', 'Child has an eye colour neither parent has', 'v'], ['Hoa tím sinh ra cây hoa tím', 'A purple flower gives purple-flowered plants', 'h'], ['Hạt trơn × hạt trơn, đời con có cả hạt nhăn', 'Smooth × smooth gives some wrinkled seeds', 'v'], ['Mèo con có bộ lông vằn giống mèo mẹ', 'A kitten has tabby fur like its mother', 'h'], ['Một con trong đàn có lông trắng khác cả đàn', 'One animal in the herd has white fur unlike the rest', 'v']];
    EL.sorter(a, { hint: ['Gia đình: bố mẹ tóc xoăn, con thứ nhất tóc xoăn, con thứ hai tóc thẳng. Kéo từng thẻ vào “di truyền” (giống bố mẹ) hoặc “biến dị” (khác bố mẹ).', 'A family: curly-haired parents, a first child with curly hair, a second child with straight hair. Drag each card into “heredity” (like the parents) or “variation” (different from the parents).'], boxes: [{ id: 'h', vi: 'Di truyền', en: 'Heredity' }, { id: 'v', vi: 'Biến dị', en: 'Variation' }], items: IT.map((x, i) => ({ id: 'i' + i, vi: x[0], en: x[1], to: [x[2]] })), explain: ['Di truyền: con giống bố mẹ ở một đặc điểm; biến dị: con khác bố mẹ. Cả hai do gene (nhân tố di truyền) quy định.', 'Heredity: children are like their parents in a feature; variation: children differ. Both are controlled by genes (hereditary factors).'] });
    ML.org34.note(b, 'bai36.example', 'Ví dụ của em về di truyền và biến dị (chỉ lưu trong trình duyệt này):', 'Your own example of heredity and variation (saved only in this browser):', 3);
    return {};
  }

  /* ------------------------------------------------------------ W36.2 : vườn đậu ảo — kéo hạt phấn */
  function peaGarden(body) {
    const S = { step: 0, seed: 1, n: 200, emas: false, pol: false, f1: false, f2: false }, NS = [10, 50, 200, 1000, 8000];
    body.innerHTML = `<div class="olab em pw" data-lab><p class="olab__hint">${pr('Kéo hạt phấn sang nhuỵ hoa cây kia · Drag the pollen to the other plant’s stigma', '')}</p><p class="olab__hint"><small>${pr('Thao tác: ① cắt bỏ nhị của cây hoa trắng (bước khử nhị, bổ sung ngoài sách) → ② kéo hạt phấn từ cây hoa tím sang nhuỵ cây hoa trắng → xem F₁ → ③ cho F₁ thụ phấn → F₂.', 'Steps: ① remove the stamens of the white plant (emasculation — supplementary, not in the book) → ② drag pollen from the purple plant to the white plant’s stigma → see F₁ → ③ let F₁ pollinate → F₂.')}</small></p><div data-area></div><div class="olab__btns"><button type="button" class="btn btn--sm" data-reset>${pr('Đặt lại', 'Reset')}</button><button type="button" class="btn btn--sm" data-demo>${pr('Làm mẫu từng bước', 'Show next step')}</button></div><p class="olab__status" data-st role="status" aria-live="polite"></p></div>`;
    const lab = $('[data-lab]', body), area = $('[data-area]', lab), st = $('[data-st]', lab);
    const draw = () => {
      let h = '';
      const pl = (purple, lab2) => `<svg viewBox="0 0 90 70" width="90" role="img" aria-label="${aria(lab2[0], lab2[1])}">${flower(purple, 45, 28, 1.3, purple ? 'tím · purple' : 'trắng · white')}</svg>`;
      if (S.step < 2) {
        h += `<div class="olab__cols"><div>${pl(true, ['Cây P hoa tím thuần chủng (AA)', 'Purebred purple P plant (AA)'])}<br>${O.chip('pollen', '🌼 hạt phấn của cây tím', '🌼 pollen of the purple plant')}</div><div>${pl(false, ['Cây P hoa trắng thuần chủng (aa)', 'Purebred white P plant (aa)'])}<br>${O.chip('scissors', '✂ cắt nhị (khử nhị)', '✂ remove stamens')}${O.zone('stamen', S.emas ? '✓ đã khử nhị' : 'nhị hoa cây trắng', aria('Nhị hoa cây trắng', 'Stamens of the white plant'))}${O.zone('stigma', S.pol ? '✓ đã thụ phấn' : 'nhuỵ hoa cây trắng', aria('Nhuỵ hoa cây trắng', 'Stigma of the white plant'))}</div></div>`;
      } else {
        const r = G.sample('Aa', 'Aa', S.f2 ? S.n : 0, S.seed), D = r ? (r.pheno.D || 0) : 0, rr = r ? (r.pheno.r || 0) : 0;
        h += `<div><b>${pr('F₁: 100 % hoa tím (Aa)', 'F₁: 100 % purple (Aa)')}</b><br>${pl(true, ['Cây F₁ hoa tím', 'F₁ purple plant'])}${pl(true, ['Cây F₁ hoa tím', 'F₁ purple plant'])}</div>`;
        if (!S.f2) h += `<div>${O.chip('pf1', '🌼 hạt phấn của cây F₁ này', '🌼 pollen of this F₁ plant')}${O.zone('stf1', 'nhuỵ hoa cây F₁ kia', aria('Nhuỵ hoa cây F₁ kia', 'Stigma of the other F₁ plant'))}<button type="button" class="btn btn--sm" data-self>${pr('Hoặc: cho tự thụ phấn', 'Or: self-pollinate')}</button></div>`;
        else h += `<div><b>F₂</b>${EXT('mô phỏng ngẫu nhiên có hạt giống', 'seeded random simulation')}<label class="olab__ctl"><span>${pr('Số cây F₂', 'Number of F₂ plants')} <output data-o="n">${S.n}</output></span><input type="range" data-n min="0" max="4" step="1" value="${NS.indexOf(S.n)}" aria-label="${aria('Số cây F₂', 'Number of F₂ plants')}"></label>${bars([{ vi: 'hoa tím', en: 'purple', n: D, exp: S.n * 0.75, c: PUR }, { vi: 'hoa trắng', en: 'white', n: rr, exp: S.n * 0.25, c: '#94a3b8' }], S.n)}<p><b>${pr('Tỉ lệ tím : trắng', 'Purple : white')} = ${ratioTxt(D, rr)}</b> (${pr('lí thuyết 3 : 1', 'expected 3 : 1')})</p><div class="olab__btns"><button type="button" class="btn btn--sm" data-again>${pr('Thí nghiệm lại (kết quả hơi khác)', 'Repeat (the result differs slightly)')}</button></div></div>`;
      }
      area.innerHTML = h;
    };
    const next = (msgVi, msgEn, ok) => O.say(st, ok, msgVi, msgEn);
    const act = (cid, zid) => {
      if (S.step === 0 && cid === 'scissors' && zid === 'stamen') { S.emas = true; next('✓ Đã cắt nhị cây hoa trắng để nó không tự thụ phấn. Giờ kéo hạt phấn sang nhuỵ.', '✓ Stamens of the white plant removed so it cannot self-pollinate. Now drag the pollen to the stigma.', true); }
      else if (S.step === 0 && cid === 'pollen' && zid === 'stigma') { if (!S.emas) { next('Hãy cắt nhị cây hoa trắng trước (khử nhị) để tránh tự thụ phấn.', 'First remove the white plant’s stamens (emasculation) to avoid self-pollination.', false); return; } S.pol = true; S.step = 2; next('✓ Thụ phấn chéo xong. F₁ cho 100 % hoa tím: hoa tím là tính trạng trội, hoa trắng là tính trạng lặn.', '✓ Cross-pollination done. F₁ is 100 % purple: purple is dominant, white is recessive.', true); }
      else if (S.step === 2 && cid === 'pf1' && zid === 'stf1') { S.f2 = true; next('✓ F₂: hoa trắng xuất hiện lại. Nhân tố di truyền không hoà trộn.', '✓ F₂: white flowers reappear. Hereditary factors do not blend.', true); }
      else next('Chưa đúng: hãy kéo vật đúng sang đúng ô.', 'Not quite: drag the right item to the right box.', false);
      draw();
    };
    U.drag(lab, act);
    lab.addEventListener('click', (e) => { if (e.target.closest('[data-self]')) { S.f2 = true; next('✓ F₁ tự thụ phấn cho F₂ có cả hoa tím và hoa trắng.', '✓ F₁ self-pollinated gives F₂ with purple and white.', true); draw(); } else if (e.target.closest('[data-again]')) { S.seed += 17; draw(); } else if (e.target.closest('[data-reset]')) { Object.assign(S, { step: 0, seed: 1, n: 200, emas: false, pol: false, f1: false, f2: false }); next('', '', null); draw(); } else if (e.target.closest('[data-demo]')) { if (S.step === 0 && !S.emas) act('scissors', 'stamen'); else if (S.step === 0) act('pollen', 'stigma'); else if (!S.f2) act('pf1', 'stf1'); } });
    lab.addEventListener('input', (e) => { if (e.target.matches('input[data-n]')) { S.n = NS[+e.target.value] || 200; draw(); const r = $('input[data-n]', lab); r && r.focus(); } });
    draw(); return {};
  }

  /* ------------------------------------------------------------ W36.5 : hoà trộn hay nhân tố di truyền */
  function genBlend(body) {
    const P = { g: 2 };
    body.innerHTML = `<div class="olab em" data-lab><p class="olab__hint">${pr('Kéo thanh trượt số thế hệ, so sánh hai ý tưởng.', 'Drag the generation slider and compare the two ideas.')} ${EXT('mô hình hoà trộn chỉ minh hoạ định tính', 'the blending model is only a qualitative illustration')}</p>${U.ctl('g', 'Số thế hệ sau P', 'Generations after P', 0, 6, 1, P.g)}<div class="olab__cols"><div data-a></div><div data-b></div></div><p class="olab__status" data-st role="status" aria-live="polite"></p></div>`;
    const lab = $('[data-lab]', body), A = $('[data-a]', lab), B = $('[data-b]', lab), st = $('[data-st]', lab);
    const paint = () => {
      const bl = G.blend(P.g), last = bl[bl.length - 1];
      const shade = (t) => `hsl(262 ${Math.round(60 * (1 - Math.abs(t - 0.5) * 2) + 15)}% ${Math.round(88 - 40 * t)}%)`;
      A.innerHTML = `<b>${pr('Mô hình hoà trộn', 'Blending model')}</b><svg viewBox="0 0 260 ${24 * bl.length + 10}" class="mol__board" role="img" aria-label="${aria('Màu hoa các thế hệ theo mô hình hoà trộn', 'Flower colours by generation, blending model')}">` + bl.map((r, i) => `<text x="4" y="${20 + i * 24}" style="font:700 10px system-ui" fill="currentColor">${i === 0 ? 'P' : 'F' + i}</text><rect x="30" y="${6 + i * 24}" width="200" height="14" rx="4" fill="#fff" stroke="#334155" stroke-dasharray="3 2"/><rect x="${30 + 200 * r.lo}" y="${6 + i * 24}" width="${Math.max(2, 200 * (r.hi - r.lo))}" height="14" rx="4" fill="${shade(0.5)}" stroke="#4c1d95"/>`).join('') + `</svg><small>${pr('Màu dồn dần về trung gian; màu thuần (tím, trắng) biến mất.', 'Colours drift to an intermediate shade; the pure colours (purple, white) disappear.')}</small>`;
      let m = ''; for (let i = 0; i <= P.g; i++) { const y = 20 + i * 24; m += `<text x="4" y="${y}" style="font:700 10px system-ui" fill="currentColor">${i === 0 ? 'P' : 'F' + i}</text>` + (i === 0 ? flower(true, 50, y - 7, 0.6) + flower(false, 100, y - 7, 0.6) : i === 1 ? flower(true, 50, y - 7, 0.6) + flower(true, 80, y - 7, 0.6) : flower(true, 50, y - 7, 0.6) + flower(true, 80, y - 7, 0.6) + flower(true, 110, y - 7, 0.6) + flower(false, 140, y - 7, 0.6)) + `<text x="170" y="${y}" style="font:600 10px system-ui" fill="currentColor">${i === 0 ? 'tím · trắng' : i === 1 ? '100 % tím' : '3 tím : 1 trắng'}</text>`; }
      B.innerHTML = `<b>${pr('Mô hình nhân tố di truyền (Mendel)', 'Hereditary-factor model (Mendel)')}</b><svg viewBox="0 0 260 ${24 * (P.g + 1) + 10}" class="mol__board" role="img" aria-label="${aria('Hoa các thế hệ theo mô hình Mendel', 'Flowers by generation, Mendel’s model')}">${m}</svg><small>${pr('Nhân tố không pha trộn: hoa trắng tái xuất hiện ở F₂ và các đời sau.', 'Factors do not mix: white flowers reappear in F₂ and later.')}</small>`;
      O.say(st, null, P.g >= 2 ? `Sau ${P.g} thế hệ: mô hình hoà trộn chỉ còn màu gần trung gian (độ chênh ${f2(last.hi - last.lo)}), mô hình Mendel vẫn có hoa trắng. Vì Mendel nêu nhân tố di truyền riêng rẽ, không hoà trộn nên ý tưởng đó là cơ sở của khái niệm gene.` : 'Tăng số thế hệ để thấy khác biệt.', P.g >= 2 ? `After ${P.g} generations the blending model keeps only near-intermediate colours (spread ${f2(last.hi - last.lo)}) while Mendel’s model still has white flowers. Because Mendel proposed separate factors that do not blend, the idea is the basis of the gene concept.` : 'Raise the number of generations to see the difference.');
    };
    U.bindCtl(lab, P, paint); paint(); return { state: P };
  }

  /* ------------------------------------------------------------ W36.3 : thuật ngữ kéo thẻ */
  function genTerms(body) {
    const [a, b] = U.wrap(body, 2);
    const IT = [['hạt vàng', 'yellow seed', ['dom', 'ph']], ['hạt xanh', 'green seed', ['rec', 'ph']], ['hoa tím', 'purple flower', ['dom', 'ph']], ['hoa trắng', 'white flower', ['rec', 'ph']], ['thân cao', 'tall stem', ['dom', 'ph']], ['thân thấp', 'short stem', ['rec', 'ph']], ['AA', 'AA', ['hom', 'ge']], ['Aa', 'Aa', ['het', 'ge']], ['aa', 'aa', ['hom', 'ge']]];
    EL.sorter(a, { hint: ['Kéo mỗi thẻ vào mọi ô đúng (một thẻ có thể thuộc nhiều ô): trội, lặn, đồng hợp, dị hợp, kiểu hình, kiểu gene. Giả sử A trội hoàn toàn.', 'Drag each card into every correct box (a card can belong to several): dominant, recessive, homozygous, heterozygous, phenotype, genotype. Assume A is completely dominant.'], multi: 1, boxes: [{ id: 'dom', vi: 'Tính trạng trội', en: 'Dominant trait' }, { id: 'rec', vi: 'Tính trạng lặn', en: 'Recessive trait' }, { id: 'hom', vi: 'Đồng hợp', en: 'Homozygous' }, { id: 'het', vi: 'Dị hợp', en: 'Heterozygous' }, { id: 'ph', vi: 'Kiểu hình', en: 'Phenotype' }, { id: 'ge', vi: 'Kiểu gene', en: 'Genotype' }], items: IT.map((x, i) => ({ id: 't' + i, vi: x[0], en: x[1], to: x[2] })), explain: ['Tính trạng trội biểu hiện khi đồng hợp trội hoặc dị hợp; lặn chỉ biểu hiện khi đồng hợp lặn. Hạt vàng, hoa tím, thân cao là kiểu hình; AA, Aa, aa là kiểu gene.', 'A dominant trait shows when homozygous-dominant or heterozygous; a recessive one only when homozygous-recessive. Yellow seed, purple flower, tall stem are phenotypes; AA, Aa, aa are genotypes.'] });
    const DEF = [['Tính trạng tương phản', 'Contrasting traits', 'Hai trạng thái trái ngược của một loại tính trạng', 'Two opposite states of one kind of trait'], ['Allele', 'Allele', 'Các trạng thái khác nhau của cùng một gene', 'Different states of the same gene'], ['Thuần chủng', 'Purebred', 'Kiểu gene quy định tính trạng đó là đồng hợp', 'The genotype for that trait is homozygous'], ['Dòng thuần', 'Pure line', 'Đồng hợp về tất cả các cặp gene đang xét', 'Homozygous for all gene pairs considered'], ['Kiểu hình', 'Phenotype', 'Tổ hợp các tính trạng của cơ thể', 'The combination of the body’s traits'], ['Kiểu gene', 'Genotype', 'Tổ hợp các gene trong tế bào', 'The combination of genes in the cell']];
    EL.sorter(b, { hint: ['Đố nhanh: kéo từng định nghĩa vào đúng thuật ngữ.', 'Quick quiz: drag each definition to the right term.'], boxes: DEF.map((d, i) => ({ id: 'd' + i, vi: d[0], en: d[1] })), items: DEF.map((d, i) => ({ id: 'e' + i, vi: d[2], en: d[3], to: ['d' + i] })), explain: ['Thuật ngữ theo sách Bài 36, mục III.', 'Terms as in Lesson 36, section III.'] });
    return {};
  }

  /* ------------------------------------------------------------ W36.4 : dựng sơ đồ lai bằng kéo thả */
  function crossBuilder(body) {
    const K = { t: 3 };                                              // mặc định: chiều cao (thân cao × thân thấp)
    const T = () => G.TRAITS[K.t], nm = (r) => pr(r[0], r[1]);
    body.innerHTML = `<div class="olab em pw" data-lab><p class="olab__hint">${pr('Bài tập sách: thân cao × thân thấp thuần chủng. Kéo kí hiệu và kiểu gene vào sơ đồ P → G → F₁ → F₂, rồi bấm “Kiểm tra”.', 'Book exercise: purebred tall × short. Drag symbols and genotypes into the diagram P → G → F₁ → F₂, then press “Check”.')}</p><label class="olab__ctl"><span>${pr('Tính trạng', 'Trait')}</span><select data-trait>${G.TRAITS.map((t, i) => `<option value="${i}"${i === K.t ? ' selected' : ''}>${t.name[0]} / ${t.name[1]}</option>`).join('')}</select></label><div data-area></div><div class="olab__btns"><button type="button" class="btn btn--sm btn--primary" data-chk>${pr('Kiểm tra', 'Check')}</button><button type="button" class="btn btn--sm" data-reset>${pr('Đặt lại', 'Reset')}</button></div><p class="olab__status" data-st role="status" aria-live="polite"></p></div>`;
    const lab = $('[data-lab]', body), area = $('[data-area]', lab), st = $('[data-st]', lab);
    let S = {};
    const ZN = [['p1', 'P (♀)', 'P (♀)'], ['p2', '× P (♂)', '× P (♂)'], ['g1', 'G của P (♀)', 'G of P (♀)'], ['g2', 'G của P (♂)', 'G of P (♂)'], ['f1', 'F₁ kiểu gene', 'F₁ genotype'], ['f1p', 'F₁ kiểu hình', 'F₁ phenotype'], ['f2', 'F₂ tỉ lệ kiểu hình', 'F₂ phenotype ratio'], ['dom', 'Tính trạng trội là', 'The dominant trait is']];
    const chips = () => { const t = T(), l = t.letter, lo = l.toLowerCase(); return [[l + l, l + l], [lo + lo, lo + lo], [l + lo, l + lo], [l, l], [lo, lo], ['f_' + t.dom[0], t.dom[0], t.dom[1]], ['f_' + t.rec[0], t.rec[0], t.rec[1]], ['d_' + t.dom[0], t.dom[0], t.dom[1]], ['d_' + t.rec[0], t.rec[0], t.rec[1]], ['3 : 1', '3 : 1', '3 : 1'], ['1 : 1', '1 : 1', '1 : 1'], ['100 %', '100 %', '100 %']]; };
    const render = (res) => {
      const used = Object.keys(S).map((z) => S[z]), CH = chips();
      area.innerHTML = O.zone('pool', CH.filter((c) => used.indexOf(c[0]) < 0).map((c) => O.chip(c[0], c[1], c[2] || c[1])).join('') || '<small>…</small>', aria('Khay thẻ', 'Card tray')) + `<div class="olab__cols">${ZN.map((z) => { const cid = S[z[0]], c = cid && CH.find((x) => x[0] === cid); return O.zone(z[0], `<small>${pr(z[1], z[2])}:</small> ` + (c ? O.chip(c[0], c[1], c[2] || c[1]) : '…'), aria(z[1], z[2]), res && res[z[0]] === true ? 'is-ok' : res && res[z[0]] === false ? 'is-bad' : ''); }).join('')}</div>`;
    };
    const place = (cid, zid) => { Object.keys(S).forEach((z) => { if (S[z] === cid) delete S[z]; }); if (zid !== 'pool') S[zid] = cid; O.say(st, null, ''); render(); };
    U.drag(lab, place);
    lab.addEventListener('change', (e) => { if (e.target.matches('[data-trait]')) { K.t = +e.target.value; S = {}; render(); } });
    lab.addEventListener('click', (e) => {
      if (e.target.closest('[data-reset]')) { S = {}; O.say(st, null, ''); render(); return; }
      if (!e.target.closest('[data-chk]')) return;
      const t = T(), l = t.letter, lo = l.toLowerCase(), x = G.cross(l + l, lo + lo), c2 = G.cross(l + lo, l + lo), res = {};
      const pset = [S.p1, S.p2].sort().join('|'), want = [l + l, lo + lo].sort().join('|');
      res.p1 = S.p1 ? [l + l, lo + lo].indexOf(S.p1) >= 0 && pset === want : null; res.p2 = res.p1;
      const gp = [S.g1, S.g2].sort().join('|'); res.g1 = S.g1 && S.g2 ? gp === [l, lo].sort().join('|') && ((S.p1 === l + l && S.g1 === l) || (S.p1 === lo + lo && S.g1 === lo)) : null; res.g2 = res.g1;
      res.f1 = S.f1 ? S.f1 === l + lo && Object.keys(x.geno).join() === l + lo : null;
      res.f1p = S.f1p ? S.f1p === 'f_' + t.dom[0] : null;
      res.f2 = S.f2 ? S.f2 === G.ratio(c2.pheno) : null;
      res.dom = S.dom ? S.dom === 'd_' + t.dom[0] : null;
      render(res);
      const left = ZN.filter((z) => !S[z[0]]).length, bad = ZN.filter((z) => res[z[0]] === false);
      if (left) O.say(st, false, `Còn ${left} ô chưa điền.`, `${left} boxes still empty.`);
      else if (bad.length) O.say(st, false, 'Chưa đúng ở: ' + bad.map((z) => z[1]).join('; ') + '. Gợi ý: P thuần chủng là AA và aa; mỗi giao tử chỉ mang một allele; F₁ là Aa.', 'Not right at: ' + bad.map((z) => z[2]).join('; ') + '. Hint: purebred P is AA and aa; each gamete carries one allele; F₁ is Aa.');
      else O.say(st, true, `✓ Đúng! P: ${l + l} × ${lo + lo}; G: ${l}, ${lo}; F₁: ${l + lo} (100 % ${t.dom[0]}); F₂: 1 ${l + l} : 2 ${l + lo} : 1 ${lo + lo} ⇒ 3 ${t.dom[0]} : 1 ${t.rec[0]}. ${t.dom[0]} là tính trạng trội.`, `✓ Correct! P: ${l + l} × ${lo + lo}; G: ${l}, ${lo}; F₁: ${l + lo} (100 % ${t.dom[1]}); F₂: 1 ${l + l} : 2 ${l + lo} : 1 ${lo + lo} ⇒ 3 ${t.dom[1]} : 1 ${t.rec[1]}. ${t.dom[1]} is the dominant trait.`);
    });
    render(); return {};
  }

  window.LabSims = Object.assign(window.LabSims || {}, {
    'gen-inherit': { fn: genInherit, vi: 'Di truyền hay biến dị?', en: 'Heredity or variation?', intro: 'Kéo thẻ vào di truyền hoặc biến dị.' },
    'pea-garden': { fn: peaGarden, vi: 'Vườn đậu ảo của Mendel (Hình 36.1)', en: 'Mendel’s virtual pea garden (Figure 36.1)', intro: 'Kéo hạt phấn sang nhuỵ hoa cây kia.' },
    'gen-blend': { fn: genBlend, vi: 'Hoà trộn hay nhân tố di truyền?', en: 'Blending or hereditary factors?', intro: 'Kéo thanh trượt số thế hệ.' },
    'gen-terms': { fn: genTerms, vi: 'Thuật ngữ di truyền', en: 'Genetic terms', intro: 'Kéo thẻ vào ô đúng.' },
    'cross-builder': { fn: crossBuilder, vi: 'Dựng sơ đồ lai', en: 'Building a cross diagram', intro: 'Kéo kí hiệu và kiểu gene vào sơ đồ.' }
  });
})();
