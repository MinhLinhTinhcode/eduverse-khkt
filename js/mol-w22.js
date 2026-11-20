/* ==========================================================================
   MOL W22 — widget Bài 22 "Giới thiệu về hợp chất hữu cơ". Nạp SAU mol-lab.js.
   mol-sort (W22.1) · mol-board (W22.2, trọng tâm) · mol-iso (W22.3) · mol-fig222 (W22.4) · mol-hc (W22.5) · mol-hist (W22.6)
   Mọi đáp án do engine MolLab / ChemLab tính (không gõ tay): organicFormula, classify, isomers, same, condensed.
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab, ML = window.MolLab, EL = window.EnergyLab, CL = window.ChemLab;
  if (!L || !ML || !ML.ui || !EL || !CL) return;
  const { pr } = L, M = ML.engine, U = ML.ui, { $, $$ } = U, ORG = CL.engine.ORG, uf = M.uf;
  let uid = 0;
  const reasonOrg = (f) => {
    const c = {}; String(f).replace(/([A-Z][a-z]?)(\d*)/g, (m, e, n) => { c[e] = 1; return ''; });
    if (!c.C) return ['không có carbon ⇒ vô cơ', 'no carbon ⇒ inorganic'];
    if (M.organicFormula(f)) return ['hợp chất của carbon ⇒ hữu cơ', 'a carbon compound ⇒ organic'];
    return /CO3/.test(f) ? ['có carbon nhưng là muối carbonate / acid carbonic ⇒ vô cơ', 'has carbon but is a carbonate / carbonic acid ⇒ inorganic'] : ['có carbon nhưng là oxide của carbon ⇒ vô cơ', 'has carbon but is an oxide of carbon ⇒ inorganic'];
  };
  /* ------------------------------------------------------------ W22.1 */
  function sortLab(body) {
    const [a, b] = U.wrap(body, 2);
    const base = ['C6H6', 'H2SO4', 'C6H12O6', 'H2CO3', 'CaCO3', 'KNO3', 'C2H4', 'NaOH', 'Al2O3', 'CH3Cl', 'CH3OH'], more = ['CO', 'CO2', 'Na2CO3', 'CO(NH2)2', 'CH4'];
    const mkItems = (fs) => fs.map((f) => ({ id: f, vi: uf(f), en: uf(f), f, to: [M.organicFormula(f) ? 'org' : 'inorg'] }));
    const cfg = {
      hint: ['Kéo từng công thức vào ô hữu cơ hoặc vô cơ rồi nhấn Kiểm tra. Hãy tự nêu lí do trước khi xem lời giải.', 'Drag each formula into organic or inorganic, then press Check. State your own reason before reading the explanation.'],
      boxes: [{ id: 'org', vi: 'Hợp chất hữu cơ', en: 'Organic compounds' }, { id: 'inorg', vi: 'Hợp chất vô cơ', en: 'Inorganic compounds' }],
      items: mkItems(base.concat(more)),
      note: ['Quy ước của sách: hợp chất của carbon là hợp chất hữu cơ, trừ carbon monoxide, carbon dioxide, các muối carbonate… Urea CO(NH₂)₂ và CH₄ được thêm để luyện tập (bổ sung).', 'The book’s convention: carbon compounds are organic, except carbon monoxide, carbon dioxide, carbonates… Urea CO(NH₂)₂ and CH₄ are extra practice items.'],
      explain: ['', ''],
      extra: (S) => S.checked ? '<ul class="olab__hint">' + Object.keys(S.box).map((k) => S.box[k].map((i) => { const r = reasonOrg(i); return '<li><b>' + uf(i) + '</b>: ' + pr(r[0], r[1]) + '</li>'; }).join('')).join('') + '</ul>' : ''
    };
    EL.sorter(a, cfg);
    const P = { score: 0, n: 0, cur: null }; b.innerHTML = '<div class="olab em" data-q><h4>' + pr('Đố nhanh', 'Quick quiz') + '</h4><p class="mol__f" data-f></p><div class="olab__btns"><button type="button" class="btn" data-k="org">' + pr('Hữu cơ', 'Organic') + '</button><button type="button" class="btn" data-k="inorg">' + pr('Vô cơ', 'Inorganic') + '</button><button type="button" class="btn btn--sm" data-k="next">' + pr('Câu khác', 'Another') + '</button></div><p class="olab__status" data-st role="status"></p></div>';
    const q = $('[data-q]', b), nxt = () => { P.cur = base.concat(more)[Math.floor(Math.random() * (base.length + more.length))]; $('[data-f]', q).textContent = uf(P.cur); };
    q.addEventListener('click', (e) => { const k = e.target.closest('[data-k]'); if (!k) return; if (k.dataset.k === 'next') { nxt(); return; } const ok = (M.organicFormula(P.cur) ? 'org' : 'inorg') === k.dataset.k; P.n++; if (ok) P.score++; const r = reasonOrg(P.cur); $('[data-st]', q).className = 'olab__status ' + (ok ? 'olab__status--ok' : 'olab__status--warn'); $('[data-st]', q).innerHTML = pr((ok ? 'Đúng. ' : 'Chưa đúng. ') + uf(P.cur) + ': ' + r[0] + '. Điểm ' + P.score + '/' + P.n, (ok ? 'Correct. ' : 'Not quite. ') + uf(P.cur) + ': ' + r[1] + '. Score ' + P.score + '/' + P.n); nxt(); });
    nxt(); return {};
  }
  /* ------------------------------------------------------------ W22.2 + W22.3 : bộ lắp ghép */
  const PRESETS = [['methane CH₄', 'methane CH₄', 'C'], ['ethane C₂H₆', 'ethane C₂H₆', 'CC'], ['ethylene C₂H₄', 'ethylene C₂H₄', 'C=C'], ['butane', 'butane', 'CCCC'], ['isobutane', 'isobutane', 'CC(C)C'], ['ethanol', 'ethanol', 'CCO'], ['dimethyl ether', 'dimethyl ether', 'COC'], ['cyclopropane', 'cyclopropane', 'C1CC1']];
  function boardLab(body) {
    const saved = []; let rt;
    const extra = '<div class="olab__btns"><button type="button" class="btn btn--primary" data-save>' + pr('Lưu cấu tạo này', 'Save this structure') + '</button></div><p class="olab__status" data-sv role="status"></p><div class="mol__row" data-list></div>';
    const B = ML.board(body, { presets: PRESETS, atoms: ['C', 'H', 'O', 'N', 'Cl'], extra, hintVi: 'Kéo nguyên tử C vào bảng rồi nối với H · kéo từ nguyên tử này sang nguyên tử kia để nối, nhấn vào liên kết để đổi đơn ↔ đôi.', hintEn: 'Drag a C atom onto the board and bond it to H · drag from one atom to another to bond; click a bond to switch single ↔ double.' });
    rt = B.root; const sv = $('[data-sv]', rt), list = $('[data-list]', rt);
    const draw = () => { list.innerHTML = saved.map((s) => U.cardOf(s.g, s.name)).join(''); };
    rt.addEventListener('click', (e) => { if (!e.target.closest('[data-save]')) return; const a = B.analysis();
      if (!a.valid) { sv.className = 'olab__status olab__status--warn'; sv.innerHTML = pr('Chưa lưu được: cần đủ hoá trị cho mọi nguyên tử và nối thành một phân tử.', 'Cannot save yet: every atom needs full valence and all atoms must form one molecule.'); return; }
      if (saved.some((s) => s.key === a.key)) { sv.className = 'olab__status'; sv.innerHTML = pr('Cấu tạo này đã được lưu.', 'This structure is already saved.'); return; }
      saved.push({ g: M.clone(a.g), key: a.key, name: a.name }); sv.className = 'olab__status olab__status--ok'; sv.innerHTML = pr('Đã lưu ' + a.f.uni + ' (' + saved.length + ' cấu tạo).', 'Saved ' + a.f.uni + ' (' + saved.length + ' structures).'); draw(); });
    return B;
  }
  const TARGETS = { C4H10: { c: { C: 4, H: 10 }, vi: 'C₄H₁₀', cls: 'a' }, C3H6: { c: { C: 3, H: 6 }, vi: 'C₃H₆', cls: 'b' }, C2H6O: { c: { C: 2, H: 6, O: 1 }, vi: 'C₂H₆O', cls: 'c' } };
  const KIND = { straight: ['mạch hở, không phân nhánh', 'open chain, unbranched'], branched: ['mạch hở, phân nhánh', 'open chain, branched'], ring: ['mạch vòng', 'ring'] };
  function isoLab(body) {
    const id = 'iso' + (++uid), S = { t: 'C4H10', found: {} }; let all = null, B = null;
    const extra = '<div class="olab__btns"><button type="button" class="btn btn--primary" data-save>' + pr('Kiểm tra & lưu cấu tạo', 'Check & save structure') + '</button></div><p class="olab__status" data-sv role="status"></p><div class="mol__meter" aria-hidden="true"><i data-m style="width:0"></i></div><div class="mol__row" data-list></div><div data-prop></div>';
    const holder = document.createElement('div'); body.appendChild(holder);
    holder.insertAdjacentHTML('beforeend', '<div class="olab__btns" data-tg role="group" aria-label="Công thức phân tử / Molecular formula">' + Object.keys(TARGETS).map((k) => '<button type="button" class="pw__chip" data-t="' + k + '" aria-pressed="' + (k === S.t) + '">' + TARGETS[k].vi + '</button>').join('') + '</div><p class="olab__status" data-goal></p>');
    const bd = document.createElement('div'); body.appendChild(bd);
    B = ML.board(bd, { presets: [], extra, hintVi: 'Hãy lắp mọi cấu tạo có thể có của công thức phân tử đã chọn (đủ hoá trị, nối thành một phân tử), rồi nhấn Kiểm tra & lưu. Hệ thống chỉ cho biết đã tìm được bao nhiêu cấu tạo.', hintEn: 'Build every possible structure of the chosen molecular formula (full valence, one molecule), then press Check & save. The tool only tells you how many you have found.' });
    const rt = B.root, sv = $('[data-sv]', rt), list = $('[data-list]', rt), goal = $('[data-goal]', holder), prop = $('[data-prop]', rt);
    const setTarget = (k) => { S.t = k; all = M.isomers(TARGETS[k].c); S.found[k] = S.found[k] || {}; $$('[data-t]', holder).forEach((x) => x.setAttribute('aria-pressed', x.dataset.t === k)); show(); };
    function show() {
      const f = S.found[S.t], n = Object.keys(f).length, N = all.list.length;
      goal.innerHTML = pr('Lắp các cấu tạo của ' + TARGETS[S.t].vi + ': đã tìm được ' + n + '/' + N + ' đồng phân.', 'Build the structures of ' + TARGETS[S.t].vi + ': found ' + n + '/' + N + ' isomers.');
      $('[data-m]', rt).style.width = (N ? n / N * 100 : 0) + '%';
      list.innerHTML = Object.keys(f).map((k) => { const s = f[k]; const kd = M.chainKind(s.g); return U.cardOf(s.g, s.name, '<small>' + pr(KIND[kd][0], KIND[kd][1]) + '</small>'); }).join('');
      let h = ''; if (n === N) { h = '<p class="olab__status olab__status--ok">' + pr('Đã tìm đủ ' + N + ' cấu tạo. Các chất này có cùng công thức phân tử nhưng cấu tạo khác nhau nên gọi là đồng phân; cấu tạo khác nên tính chất khác nhau.', 'All ' + N + ' structures found. Same molecular formula, different structures: they are isomers, and different structures give different properties.') + '</p>';
        if (S.t === 'C2H6O') h += '<table class="olab__tbl chem__tbl"><caption>' + pr('Bảng 22.1 (phần C₂H₆O)', 'Table 22.1 (the C₂H₆O part)') + '</caption><tr><th>' + pr('Chất', 'Substance') + '</th><th>' + pr('Cấu tạo', 'Structure') + '</th><th>' + pr('Thể', 'State') + '</th><th>' + pr('Tan trong nước', 'Water') + '</th><th>' + pr('Tác dụng với Na', 'With Na') + '</th></tr>' + ORG.SUBS.filter((x) => x.f === 'C2H6O').map((x) => '<tr><td>' + pr(x.vi, x.en) + '</td><td>' + x.s + '</td><td>' + pr(x.state === 'gas' ? 'khí' : 'lỏng', x.state) + '</td><td>' + pr(x.sol, x.solEn) + '</td><td>' + pr(x.na ? 'có' : 'không', x.na ? 'yes' : 'no') + '</td></tr>').join('') + '</table>'; }
      prop.innerHTML = h;
    }
    holder.addEventListener('click', (e) => { const t = e.target.closest('[data-t]'); if (t) setTarget(t.dataset.t); });
    rt.addEventListener('click', (e) => { if (!e.target.closest('[data-save]')) return; const a = B.analysis(), T = TARGETS[S.t], need = M.hill(Object.assign({}, T.c)).plain; let m, cl = 'olab__status olab__status--warn';
      if (!a.valid) m = ['Chưa hợp lệ: còn nguyên tử thiếu/thừa liên kết hoặc chưa nối thành một phân tử.', 'Not valid yet: some atoms lack or exceed bonds, or the atoms are not one molecule.'];
      else if (a.f.plain !== need) m = ['Công thức phân tử đang là ' + a.f.uni + ', cần ' + T.vi + '.', 'The molecular formula is ' + a.f.uni + ' but ' + T.vi + ' is needed.'];
      else if (S.found[S.t][a.key]) m = ['Cấu tạo này trùng với một cấu tạo đã lưu (chỉ xoay hoặc lật).', 'This is the same as a saved structure (only rotated or flipped).'];
      else { S.found[S.t][a.key] = { g: M.clone(a.g), name: a.name }; m = ['Đúng, một cấu tạo mới!', 'Yes, a new structure!']; cl = 'olab__status olab__status--ok'; }
      sv.className = cl; sv.innerHTML = pr(m[0], m[1]); show(); });
    setTarget('C4H10'); return {};
  }
  /* ------------------------------------------------------------ W22.4 : đọc Hình 22.2 */
  const F222 = [
    { n: '①', s: 'C4H10', kind: 'mf' }, { n: '②', s: 'CCCC', kind: 'sf', alt: ['CH3CH2CH2CH3'] }, { n: '③', s: 'CC(C)C', kind: 'sf', alt: ['CH3CH(CH3)CH3', 'CH3CHCH3CH3'] },
    { n: '④', s: 'C2H6O', kind: 'mf' }, { n: '⑤', s: 'CCO', kind: 'sf', alt: ['CH3CH2OH', 'C2H5OH'] }, { n: '⑥', s: 'COC', kind: 'sf', alt: ['CH3OCH3'] }
  ];
  const normC = (s) => String(s).replace(/[₀-₉]/g, (d) => '₀₁₂₃₄₅₆₇₈₉'.indexOf(d)).replace(/[-−–—\s·.]/g, '').toUpperCase();
  function fig222(body) {
    const [a, b, c] = U.wrap(body, 3);
    const nameOf = (x) => (x.kind === 'mf' ? uf(x.s) : M.condensed(M.fromSmiles(x.s)));
    EL.sorter(a, { hint: ['Hình 22.2: kéo mỗi cách viết ①–⑥ vào ô công thức phân tử hoặc công thức cấu tạo.', 'Figure 22.2: drag each notation ①–⑥ into molecular formula or structural formula.'],
      boxes: [{ id: 'mf', vi: 'Công thức phân tử', en: 'Molecular formula' }, { id: 'sf', vi: 'Công thức cấu tạo', en: 'Structural formula' }],
      items: F222.map((x) => ({ id: x.n, vi: x.n + ' ' + nameOf(x), en: x.n + ' ' + nameOf(x), to: [x.kind] })),
      note: ['Bố cục sáu công thức theo mô tả của sách; hãy đối chiếu với hình in.', 'The six notations follow the book’s description; compare with the printed figure.'] });
    const P = { pair: 0 }, pairs = [[1, 2], [4, 5]];
    b.innerHTML = '<div class="olab em"><h4>' + pr('So sánh các cặp', 'Compare the pairs') + '</h4><div class="olab__btns"><button type="button" class="pw__chip" data-p="0" aria-pressed="true">② – ③</button><button type="button" class="pw__chip" data-p="1" aria-pressed="false">⑤ – ⑥</button></div><div data-cmp></div></div>';
    const cmp = () => { const [i, j] = pairs[P.pair], g1 = M.fromSmiles(F222[i].s), g2 = M.fromSmiles(F222[j].s), sf = M.formula(g1).plain === M.formula(g2).plain, ss = M.same(g1, g2);
      $('[data-cmp]', b).innerHTML = '<div class="mol__row">' + U.cardOf(g1, F222[i].n) + U.cardOf(g2, F222[j].n) + '</div><p class="olab__status olab__status--ok">' + pr('Cùng công thức phân tử: ' + (sf ? 'có (' + M.formula(g1).uni + ')' : 'không') + ' · Cùng cấu tạo: ' + (ss ? 'có' : 'không — hai chất khác nhau, gọi là đồng phân.'), 'Same molecular formula: ' + (sf ? 'yes (' + M.formula(g1).uni + ')' : 'no') + ' · Same structure: ' + (ss ? 'yes' : 'no — two different substances, called isomers.')) + '</p>'; };
    b.addEventListener('click', (e) => { const t = e.target.closest('[data-p]'); if (!t) return; P.pair = +t.dataset.p; $$('[data-p]', b).forEach((x) => x.setAttribute('aria-pressed', x === t)); cmp(); }); cmp();
    const S = { k: 1 }; c.innerHTML = '<div class="olab em"><h4>' + pr('Viết công thức thu gọn', 'Write the condensed formula') + '</h4><div data-d></div><label class="olab__ctl"><span>' + pr('Nhập công thức thu gọn (dùng số thường, ví dụ CH3-CH2-OH)', 'Type the condensed formula (plain digits, e.g. CH3-CH2-OH)') + '</span><input type="text" data-in autocomplete="off" style="max-width:20em" aria-label="Công thức thu gọn / Condensed formula"></label><div class="olab__btns"><button type="button" class="btn btn--primary" data-chk>' + pr('Kiểm tra', 'Check') + '</button><button type="button" class="btn" data-nx>' + pr('Chất khác', 'Another') + '</button></div><p class="olab__status" data-st role="status"></p></div>';
    const q = (s) => $(s, c), cur = () => F222[S.k];
    const pick = () => { const o = [1, 2, 4, 5].filter((i) => i !== S.k); S.k = o[Math.floor(Math.random() * o.length)]; q('[data-d]').innerHTML = '<div class="mol__row">' + U.cardOf(M.fromSmiles(cur().s), cur().n) + '</div>'; q('[data-in]').value = ''; q('[data-st]').textContent = ''; };
    c.addEventListener('click', (e) => { if (e.target.closest('[data-nx]')) { pick(); return; } if (!e.target.closest('[data-chk]')) return;
      const x = cur(), want = normC(M.condensed(M.fromSmiles(x.s))), got = normC(q('[data-in]').value), ok = got === want || (x.alt || []).map(normC).indexOf(got) >= 0;
      q('[data-st]').className = 'olab__status ' + (ok ? 'olab__status--ok' : 'olab__status--warn'); q('[data-st]').innerHTML = pr(ok ? 'Đúng: ' + M.condensed(M.fromSmiles(x.s)) : 'Chưa đúng. Gộp các nguyên tử H vào nguyên tử C hoặc O mà chúng liên kết.', ok ? 'Correct: ' + M.condensed(M.fromSmiles(x.s)) : 'Not yet. Merge each H into the C or O it is bonded to.'); });
    pick(); return {};
  }
  /* ------------------------------------------------------------ W22.5 */
  const HC = [['CH4', 'C'], ['CH3Cl', 'CCl'], ['CH2=CH2', 'C=C'], ['CH3CH2OH', 'CCO'], ['CH3COOH', 'CC(=O)O'], ['CH3NH2', 'CN'], ['CH3CH2CH3', 'CCC'], ['CH3CH=CH2', 'C=CC'], ['CH3COOCH2CH3', 'CC(=O)OCC']];
  function hcLab(body) {
    const items = HC.map(([t, s]) => { const g = M.fromSmiles(s), cl = M.classify(g), ex = Object.keys(M.counts(g)).filter((e) => e !== 'C' && e !== 'H'); return { id: t, vi: uf(t), en: uf(t), g, ex, to: [cl.hydrocarbon ? 'hc' : 'dv'] }; });
    EL.sorter(body, { hint: ['Kéo từng chất vào ô hydrocarbon hoặc dẫn xuất của hydrocarbon. Gợi ý: nhìn xem ngoài C và H còn nguyên tử nào.', 'Drag each substance into hydrocarbon or hydrocarbon derivative. Hint: look for atoms other than C and H.'],
      boxes: [{ id: 'hc', vi: 'Hydrocarbon (chỉ C và H)', en: 'Hydrocarbon (only C and H)' }, { id: 'dv', vi: 'Dẫn xuất của hydrocarbon (có thêm O, N, Cl…)', en: 'Hydrocarbon derivative (also O, N, Cl…)' }], items,
      extra: (S) => S.checked ? '<ul class="olab__hint">' + items.map((it) => '<li><b>' + it.vi + '</b>: ' + (it.ex.length ? pr('ngoài C, H còn có nguyên tử ' + it.ex.join(', ') + ' ⇒ dẫn xuất', 'also contains ' + it.ex.join(', ') + ' ⇒ derivative') : pr('chỉ có C và H ⇒ hydrocarbon', 'only C and H ⇒ hydrocarbon')) + '</li>').join('') + '</ul>' : '' });
    return {};
  }
  /* ------------------------------------------------------------ W22.6 */
  function histLab(body) {
    const P = { y: 1800 }, EV = [
      [1806, 'Jöns Jacob Berzelius dùng thuật ngữ “hợp chất hữu cơ” cho các chất lấy từ sinh vật.', 'Jöns Jacob Berzelius uses the term “organic compounds” for substances obtained from living things.'],
      [1828, 'Friedrich Wöhler tổng hợp urea từ chất vô cơ, cho thấy không cần “lực sống”.', 'Friedrich Wöhler makes urea from inorganic substances, showing no “vital force” is needed.']];
    body.innerHTML = '<div class="olab em" data-lab>' + '<p class="olab__hint">' + pr('Kéo thanh trượt năm để xem hai mốc trong mục “Em có biết”.', 'Move the year slider to see the two milestones in “Do you know?”.') + '</p>' + U.ctl('y', 'Năm', 'Year', 1800, 1850, 1, P.y, '') + '<div data-r></div><p class="olab__hint"><small>' + pr('Quan niệm “lực sống”: chất hữu cơ chỉ do cơ thể sống tạo ra. Thông tin lịch sử theo sách; ngày tháng chi tiết không nêu.', 'The “vital force” idea: organic substances can only be made by living bodies. Historical information follows the book; no further dates are given.') + '</small></p></div>';
    const lab = $('[data-lab]', body), r = $('[data-r]', lab);
    const show = () => { const done = EV.filter((e) => P.y >= e[0]); r.innerHTML = '<div class="mol__row">' + EV.map((e) => '<div class="mol__card' + (P.y >= e[0] ? ' is-found' : '') + '"><b>' + e[0] + '</b><small>' + pr(e[1], e[2]) + '</small></div>').join('') + '</div><p class="olab__status ' + (P.y >= 1828 ? 'olab__status--ok' : '') + '">' + pr(P.y >= 1828 ? 'Từ đó, hoá hữu cơ nghiên cứu mọi hợp chất của carbon, kể cả chất tổng hợp.' : P.y >= 1806 ? 'Lúc này người ta tin hợp chất hữu cơ cần “lực sống”.' : 'Chưa có thuật ngữ “hợp chất hữu cơ”.', P.y >= 1828 ? 'From then on organic chemistry studies all carbon compounds, including synthetic ones.' : P.y >= 1806 ? 'People still believed organic compounds need a “vital force”.' : 'The term “organic compounds” does not exist yet.') + '</p>'; };
    U.bindCtl(lab, P, show); show(); return { state: P };
  }
  const sims = {
    'mol-sort': { fn: sortLab, vi: 'Phân loại hợp chất hữu cơ và vô cơ', en: 'Sorting organic and inorganic compounds', intro: 'Kéo công thức vào hai ô.' },
    'mol-board': { fn: boardLab, vi: 'Bộ lắp ghép phân tử', en: 'Molecular model kit', intro: 'Kéo nguyên tử vào bảng và nối liên kết.' },
    'mol-iso': { fn: isoLab, vi: 'Tìm các đồng phân cấu tạo', en: 'Finding structural isomers', intro: 'Lắp mọi cấu tạo của công thức đã cho.' },
    'mol-fig222': { fn: fig222, vi: 'Đọc Hình 22.2: công thức phân tử và cấu tạo', en: 'Reading Figure 22.2', intro: 'Phân biệt công thức phân tử và cấu tạo.' },
    'mol-hc': { fn: hcLab, vi: 'Hydrocarbon hay dẫn xuất?', en: 'Hydrocarbon or derivative?', intro: 'Kéo chất vào hai ô.' },
    'mol-hist': { fn: histLab, vi: 'Lịch sử hoá học hữu cơ', en: 'History of organic chemistry', intro: 'Kéo thanh trượt năm.' }
  };
  window.LabSims = Object.assign(window.LabSims || {}, sims);
})();
