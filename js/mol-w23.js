/* ==========================================================================
   MOL W23 — widget Bài 23 "Alkane". Nạp SAU mol-w22.js.
   mol-homol (W23.1) · mol-alk (W23.2) · mol-burn (W23.3, thí nghiệm đốt butane) · mol-balance (W23.4) · mol-heat (W23.5) · mol-stable (W23.6)
   Số liệu nhiệt lượng: Bảng ở Bài 23 (CRC Handbook, 97th ed.) qua ChemLab.engine.ORG. Hiệu ứng cháy chỉ minh hoạ.
   ========================================================================== */
(function () {
  'use strict';
  const L = window.OpticsLab, ML = window.MolLab, EL = window.EnergyLab, CL = window.ChemLab;
  if (!L || !ML || !ML.ui || !EL || !CL || !CL.engine.ORG) return;
  const { pr, fmt, clamp } = L, M = ML.engine, U = ML.ui, { $, $$ } = U, E = CL.engine, ORG = E.ORG, uf = M.uf;
  let uid = 0;
  const chain = (n) => M.fromSmiles('C'.repeat(n));
  const eqHtml = (r, fr) => (fr ? ORG.fracStr(r) : E.eqStr(r));
  /* ------------------------------------------------------------ W23.1 : dãy đồng đẳng */
  function homolLab(body) {
    const [a, b] = U.wrap(body, 2), P = { n: 1 }, S = { ext: false };
    a.innerHTML = '<div class="olab em" data-lab><p class="olab__hint">' + pr('Kéo thanh trượt n (1–4 theo sách) để xem công thức, cấu tạo và tên gọi của alkane; để ý khi thêm một nguyên tử C thì thêm mấy nguyên tử H.', 'Move the slider n (1–4 in the book) to see each alkane’s formula, structure and name; notice how many H atoms are added with each extra C.') + '</p><label class="pw__chip mol__tog"><input type="checkbox" data-ext> ' + pr('Mở rộng n = 5–10 (ngoài sách)', 'Extend to n = 5–10 (beyond the book)') + '</label>' + U.ctl('n', 'Số nguyên tử C (n)', 'Number of C atoms (n)', 1, 4, 1, 1, '') + '<div data-r aria-live="polite"></div><p class="olab__hint"><small>' + pr('Công thức chung của alkane: CₙH₂ₙ₊₂ (n ≥ 1). Các alkane hơn kém nhau một hay nhiều nhóm CH₂.', 'General formula of alkanes: CₙH₂ₙ₊₂ (n ≥ 1). Alkanes differ by one or more CH₂ groups.') + '</small></p></div>';
    const lab = $('[data-lab]', a), r = $('[data-r]', lab);
    const show = () => { const g = chain(P.n), f = M.formula(g), nm = M.nameOf(g), prev = P.n > 1 ? M.formula(chain(P.n - 1)) : null;
      r.innerHTML = '<div class="mol__row">' + U.cardOf(g, nm || '') + '</div><p class="mol__f">C' + M.sub(P.n) + 'H' + M.sub(2 * P.n + 2) + ' = ' + f.uni + ' · M = ' + fmt(M.mass(g), 0) + ' g/mol</p><p>' + pr('Thu gọn', 'Condensed') + ': <b>' + M.condensed(g) + '</b></p>' + (nm ? '<p>' + pr('Tên', 'Name') + ': <b>' + nm + '</b>' + (P.n > 4 ? ' <small>(' + pr('ngoài yêu cầu của sách', 'beyond the book') + ')</small>' : '') + '</p>' : '') + (prev ? '<p class="olab__status olab__status--ok">' + pr('Từ n = ' + (P.n - 1) + ' lên n = ' + P.n + ': thêm 1 nhóm CH₂, tức thêm 1 C và 2 H (H tăng từ ' + (2 * P.n) + ' lên ' + (2 * P.n + 2) + ').', 'From n = ' + (P.n - 1) + ' to n = ' + P.n + ': one CH₂ group is added, i.e. 1 C and 2 H (H goes from ' + (2 * P.n) + ' to ' + (2 * P.n + 2) + ').') + '</p>' : ''); };
    U.bindCtl(lab, P, show); show();
    $('[data-ext]', lab).addEventListener('change', (e) => { S.ext = e.target.checked; const mx = S.ext ? 10 : 4; $('[data-p="n"]', lab).max = mx; $('[data-n="n"]', lab).max = mx; if (P.n > mx) U.setCtl(lab, P, 'n', mx); show(); });
    b.innerHTML = '';
    const B = ML.board(b, { presets: [['methane', 'methane', 'C'], ['propane', 'propane', 'CCC'], ['ethene (không phải alkane)', 'ethene (not an alkane)', 'C=C']], extra: '<div class="olab__btns"><button type="button" class="btn btn--primary" data-chk>' + pr('Kiểm tra là alkane', 'Check it is an alkane') + '</button></div><p class="olab__status" data-ck role="status"></p>', hintVi: 'Tự lắp một alkane: chỉ dùng C và H, liên kết đơn, mạch hở. Rồi nhấn Kiểm tra.', hintEn: 'Build an alkane yourself: only C and H, single bonds, open chain. Then press Check.', atoms: ['C', 'H'] });
    B.root.addEventListener('click', (e) => { if (!e.target.closest('[data-chk]')) return; const x = B.analysis(), st = $('[data-ck]', B.root); let m, ok = false;
      if (!x.valid) m = ['Chưa đủ hoá trị hoặc chưa nối thành một phân tử.', 'Valences incomplete or not one molecule yet.'];
      else if (x.cl.alkane) { ok = true; m = ['Đúng, là alkane ' + x.f.uni + (x.name ? ' (' + x.name + ')' : '') + ': hydrocarbon mạch hở, chỉ có liên kết đơn; C' + x.cl.nC + 'H' + (2 * x.cl.nC + 2) + ' khớp CₙH₂ₙ₊₂.', 'Yes, an alkane ' + x.f.uni + (x.name ? ' (' + x.name + ')' : '') + ': open-chain hydrocarbon with single bonds only; it fits CₙH₂ₙ₊₂.']; }
      else m = [x.cl.hydrocarbon ? 'Là hydrocarbon nhưng không phải alkane (có vòng hoặc liên kết đôi).' : 'Không phải hydrocarbon (có nguyên tử khác C, H) nên không phải alkane.', x.cl.hydrocarbon ? 'A hydrocarbon but not an alkane (ring or double bond).' : 'Not a hydrocarbon (atoms other than C, H) so not an alkane.'];
      st.className = 'olab__status ' + (ok ? 'olab__status--ok' : 'olab__status--warn'); st.innerHTML = pr(m[0], m[1]); });
    return { state: P };
  }
  /* ------------------------------------------------------------ W23.2 : alkane hay không */
  const AL = [['A', 'CC'], ['B', 'C=CC'], ['C', 'C=C(C)C'], ['D', 'CCO'], ['E', 'CC(=O)O'], ['G', 'CC(C)C'], ['H', 'C=CC=C'], ['I', 'C']];
  function alkLab(body) {
    const items = AL.map(([l, s]) => { const g = M.fromSmiles(s), c = M.classify(g), t = M.condensed(g); return { id: l, vi: l + ': ' + t, en: l + ': ' + t, g, c, to: [c.alkane ? 'alk' : c.hydrocarbon ? 'hc' : 'non'] }; });
    const why = (it) => it.c.alkane ? ['chỉ có C, H; mạch hở; chỉ liên kết đơn', 'only C and H; open chain; single bonds only'] : it.c.hydrocarbon ? ['chỉ có C, H nhưng có liên kết đôi C=C', 'only C and H but has a C=C double bond'] : ['có nguyên tử O' + (/COOH/.test(M.condensed(it.g)) ? ' (nhóm –COOH)' : ' (nhóm –OH)'), 'contains an O atom'];
    EL.sorter(body, { hint: ['Kéo tám chất A–I vào ba ô. Sau khi kiểm tra, hãy giải thích bằng cấu tạo.', 'Drag the eight substances A–I into three boxes. After checking, explain using the structures.'],
      boxes: [{ id: 'alk', vi: 'Alkane', en: 'Alkane' }, { id: 'hc', vi: 'Hydrocarbon nhưng không phải alkane', en: 'Hydrocarbon but not an alkane' }, { id: 'non', vi: 'Không phải hydrocarbon', en: 'Not a hydrocarbon' }], items,
      extra: (S) => S.checked ? '<ul class="olab__hint">' + items.map((it) => '<li><b>' + it.id + '</b>: ' + pr(why(it)[0], why(it)[1]) + '</li>').join('') + '</ul>' : '' });
    return {};
  }
  /* ------------------------------------------------------------ W23.3 : đốt butane (Hình 23.2) */
  function burnLab(body) {
    const [a, b] = U.wrap(body, 2), id = 'bn' + (++uid), P = { air: 120 }, S = { lx: 330, ly: 235, burn: false, t: 0, fog: 0, flipped: false, poured: false, turb: 0, paused: false, guess: {} };
    a.innerHTML = '<div class="olab em" data-lab="' + id + '"><p class="olab__hint">' + pr('Dự đoán sản phẩm trước. Rồi kéo bật lửa gas tới miệng bình úp ngược, nhấn Đánh lửa; sau đó lật bình, đổ nước vôi trong và lắc (Hình 23.2).', 'Predict the products first. Then drag the gas lighter to the mouth of the inverted flask and press Ignite; afterwards turn the flask over, pour in limewater and shake (Figure 23.2).') + '</p>' +
      '<fieldset class="olab__ctl"><legend>' + pr('Dự đoán: đốt butane tạo ra', 'Prediction: burning butane gives') + '</legend>' + [['H2O', 'H₂O (nước)'], ['CO2', 'CO₂'], ['H2', 'H₂'], ['CO', 'CO (khi thiếu oxygen)']].map((x) => '<label class="pw__chip mol__tog"><input type="checkbox" data-g="' + x[0] + '"> ' + x[1] + '</label>').join('') + '</fieldset>' +
      U.ctl('air', 'Lượng oxygen so với cần thiết', 'Oxygen supplied vs needed', 30, 150, 1, P.air, ' %') +
      '<svg class="olab__svg" viewBox="0 0 420 280" role="img" aria-label="Thí nghiệm đốt butane / Burning butane experiment" data-svg></svg>' +
      '<div class="olab__btns"><button type="button" class="btn btn--primary" data-b="ign">' + pr('Đánh lửa', 'Ignite') + '</button><button type="button" class="btn" data-b="flip">' + pr('Lật bình', 'Turn flask over') + '</button><button type="button" class="btn" data-b="pour">' + pr('Đổ nước vôi trong & lắc', 'Pour limewater & shake') + '</button><button type="button" class="btn" data-b="pause" aria-pressed="false">' + pr('Tạm dừng', 'Pause') + '</button><button type="button" class="btn" data-b="reset">' + pr('Làm lại', 'Reset') + '</button></div><p class="olab__status" data-st role="status"></p></div>';
    const lab = $('[data-lab]', a), svg = $('[data-svg]', lab), st = $('[data-st]', lab), say = (vi, en, c) => { st.className = 'olab__status' + (c ? ' olab__status--' + c : ''); st.innerHTML = pr(vi, en); };
    const near = () => Math.hypot(S.lx - 210, S.ly - 192) < 52, full = () => P.air >= 100;
    function draw() {
      const flip = S.flipped, fogA = Math.min(1, S.fog) * 0.55, soot = !full() && S.fog > 0.3;
      const flask = flip ? 'translate(0,0) rotate(180 210 120)' : 'translate(0,0)';
      let s = '<rect width="420" height="280" rx="10" fill="var(--paper)"/><g transform="' + flask + '"><path d="M165 40 L255 40 L255 70 L290 170 L130 170 L165 70 Z" fill="#dbeafe" fill-opacity=".45" stroke="currentColor" stroke-width="3"/><rect x="190" y="170" width="40" height="40" fill="#dbeafe" fill-opacity=".45" stroke="currentColor" stroke-width="3"/>' +
        '<path d="M165 40 L255 40 L255 70 L290 170 L130 170 L165 70 Z" fill="#9ca3af" fill-opacity="' + fogA.toFixed(2) + '"/>' + (soot ? '<g fill="#111827" fill-opacity="' + Math.min(.8, S.fog).toFixed(2) + '"><circle cx="175" cy="60" r="3"/><circle cx="205" cy="52" r="4"/><circle cx="238" cy="62" r="3"/><circle cx="160" cy="95" r="4"/><circle cx="255" cy="100" r="3"/></g>' : '') +
        (S.poured ? '<path d="M138 140 L282 140 L290 170 L130 170 Z" fill="' + (S.turb > 0 ? '#e5e7eb' : '#bfdbfe') + '" fill-opacity="' + (0.35 + 0.55 * S.turb).toFixed(2) + '"/>' : '') + '</g>';
      if (S.burn && near()) s += '<g class="mol__flame"><path d="M' + S.lx + ' ' + (S.ly - 8) + ' q-12 -20 0 -40 q12 20 0 40z" fill="#fb923c"/><path d="M' + S.lx + ' ' + (S.ly - 10) + ' q-6 -12 0 -24 q6 12 0 24z" fill="#fde047"/></g>';
      s += '<g data-h="lighter" tabindex="0" role="slider" aria-label="Bật lửa gas: kéo hoặc dùng phím mũi tên / Gas lighter: drag or use arrow keys" aria-valuetext="' + (near() ? 'ở miệng bình / at the flask mouth' : 'xa miệng bình / away from the mouth') + '" style="cursor:grab"><rect x="' + (S.lx - 12) + '" y="' + (S.ly - 4) + '" width="24" height="40" rx="6" fill="#2563eb" stroke="#111827" stroke-width="2"/><rect x="' + (S.lx - 5) + '" y="' + (S.ly - 12) + '" width="10" height="10" fill="#6b7280"/><circle cx="' + S.lx + '" cy="' + (S.ly + 16) + '" r="26" fill="transparent"/></g>';
      if (S.poured) s += '<text x="12" y="270" font-size="12" fill="currentColor">' + (S.turb > .6 ? 'Nước vôi trong vẩn đục · Limewater turns cloudy' : 'Lắc… · Shaking…') + '</text>';
      svg.innerHTML = s;
    }
    const act = (k) => {
      if (k === 'ign') { if (S.flipped) { say('Bình đang lật lên, hãy úp ngược bình trước (Làm lại).', 'The flask is turned up; invert it first (Reset).', 'warn'); return; } if (!near()) { say('Kéo bật lửa tới sát miệng bình rồi mới đánh lửa.', 'Drag the lighter right under the flask mouth before igniting.', 'warn'); return; } S.burn = true; S.t = 0; if (U.REDUCED) { S.fog = 1; draw(); report(); } else { say('Ngọn lửa cháy, thành bình dần mờ đi…', 'The flame burns and the flask wall slowly clouds…'); lp.kick(); } }
      else if (k === 'flip') { if (S.fog < .2) { say('Hãy đốt trước để có sản phẩm cháy trong bình.', 'Burn first so the flask holds combustion products.', 'warn'); return; } S.burn = false; S.flipped = !S.flipped; S.poured = false; S.turb = 0; draw(); }
      else if (k === 'pour') { if (!S.flipped) { say('Lật bình lên (miệng hướng lên) rồi mới đổ nước vôi trong.', 'Turn the flask mouth-up before pouring limewater.', 'warn'); return; } S.poured = true; S.turb = U.REDUCED ? (full() ? 1 : .15) : 0; draw(); if (!U.REDUCED) lp.kick(); else report2(); }
      else if (k === 'pause') { S.paused = !S.paused; $('[data-b="pause"]', lab).setAttribute('aria-pressed', S.paused); if (!S.paused) lp.kick(); }
      else if (k === 'reset') { Object.assign(S, { lx: 330, ly: 235, burn: false, t: 0, fog: 0, flipped: false, poured: false, turb: 0 }); st.textContent = ''; draw(); }
    };
    function report() { const g = S.guess, r = ORG.burn('alkane', 4, 'frac');
      say('Thành bình mờ đi vì có hơi nước (H₂O). ' + (full() ? 'Đủ oxygen: cháy hoàn toàn, ngọn lửa xanh; sản phẩm CO₂ và H₂O.' : 'Thiếu oxygen: cháy không hoàn toàn, có muội than (C) và khí CO độc.') + ' ' + (g.H2O ? 'Dự đoán H₂O của bạn đúng.' : 'Bạn chưa dự đoán H₂O; sản phẩm đó làm mờ thành bình.') + ' Phương trình: ' + (full() ? eqHtml(r, true) : '(không hoàn toàn) C₄H₁₀ + O₂ —t°→ C + CO + CO₂ + H₂O'),
        'The wall clouds because of water vapour (H₂O). ' + (full() ? 'Enough oxygen: complete combustion, blue flame; products CO₂ and H₂O.' : 'Too little oxygen: incomplete combustion, soot (C) and poisonous CO.') + ' ' + (g.H2O ? 'Your H₂O prediction is right.' : 'You did not predict H₂O; it clouds the wall.') + ' Equation: ' + (full() ? eqHtml(r, true) : '(incomplete) C₄H₁₀ + O₂ —t°→ C + CO + CO₂ + H₂O'), 'ok'); }
    function report2() { const g = S.guess; say('Nước vôi trong ' + (full() ? 'vẩn đục: có CO₂ (Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O, bổ sung ngoài sách). ' : 'chỉ vẩn đục nhẹ vì thiếu oxygen nên ít CO₂ hơn. ') + (g.CO2 ? 'Dự đoán CO₂ của bạn đúng.' : 'Sản phẩm CO₂ làm đục nước vôi trong.') + ' ' + '⚠ Chỉ minh hoạ: không tự thực hiện ở nhà; thí nghiệm thật cần giáo viên và dụng cụ bảo hộ.',
      'Limewater ' + (full() ? 'turns cloudy: CO₂ is present (Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O, extra to the book). ' : 'turns only slightly cloudy because less CO₂ forms. ') + (g.CO2 ? 'Your CO₂ prediction is right.' : 'CO₂ makes limewater cloudy.') + ' ⚠ Illustration only: do not try at home; real experiments need a teacher and protective equipment.', 'ok'); }
    const lp = U.loop(lab, (dt) => { if (S.paused) return false; let go = false; if (S.burn && S.fog < 1) { S.fog = Math.min(1, S.fog + dt / 2.5); go = true; if (S.fog >= 1) report(); } if (S.poured && S.turb < (full() ? 1 : .15)) { S.turb = Math.min(full() ? 1 : .15, S.turb + dt / 1.5); go = true; if (S.turb >= (full() ? 1 : .15)) report2(); } if (go) draw(); return go; });
    L.makeDrag(svg, { lighter: { move(x, y) { S.lx = clamp(x, 40, 380); S.ly = clamp(y, 150, 250); if (S.burn && !near()) S.burn = false; draw(); }, key(d, sh, axis) { if (axis === 'y') S.ly = clamp(S.ly + d * 6, 150, 250); else S.lx = clamp(S.lx + d * 6, 40, 380); draw(); } } });
    lab.addEventListener('click', (e) => { const k = e.target.closest('[data-b]'); if (k) act(k.dataset.b); });
    lab.addEventListener('change', (e) => { const g = e.target.dataset && e.target.dataset.g; if (g) S.guess[g] = e.target.checked; });
    U.bindCtl(lab, P, () => { if (S.fog >= 1) report(); }); draw();
    b.innerHTML = '<p class="olab__hint"><small>' + pr(ML.SAFE[0], ML.SAFE[1]) + '</small></p>'; return { state: S };
  }
  /* ------------------------------------------------------------ W23.4 : cân bằng phản ứng cháy */
  function balanceLab(body) {
    const [a] = U.wrap(body, 1), P = { n: 4 }, S = { kind: 'alkane', frac: false };
    a.innerHTML = '<div class="olab em" data-lab><p class="olab__hint">' + pr('Chọn loại hydrocarbon và n, rồi nhập hệ số để cân bằng phản ứng cháy hoàn toàn. Nhấn Kiểm tra.', 'Choose the hydrocarbon type and n, then type coefficients to balance complete combustion. Press Check.') + '</p><div class="olab__btns"><button type="button" class="pw__chip" data-k="alkane" aria-pressed="true">CₙH₂ₙ₊₂ (alkane)</button><button type="button" class="pw__chip" data-k="alkene" aria-pressed="false">CₙH₂ₙ (alkene)</button><label class="pw__chip mol__tog"><input type="checkbox" data-fr> ' + pr('Cho phép O₂ phân số', 'Allow fractional O₂') + '</label></div>' + U.ctl('n', 'Số nguyên tử C (n)', 'Number of C atoms (n)', 1, 8, 1, 4, '') + '<div data-r aria-live="polite"></div><div class="olab__btns"><button type="button" class="btn btn--primary" data-chk>' + pr('Kiểm tra', 'Check') + '</button><button type="button" class="btn" data-ans>' + pr('Xem lời giải', 'Show solution') + '</button></div><p class="olab__status" data-st role="status"></p><div data-gen></div></div>';
    const lab = $('[data-lab]', a), r = $('[data-r]', lab), st = $('[data-st]', lab);
    const cur = () => ORG.burn(S.kind, S.kind === 'alkene' ? Math.max(2, P.n) : P.n, 'int'), nn = () => (S.kind === 'alkene' ? Math.max(2, P.n) : P.n);
    const inp = (k) => '<input type="text" inputmode="decimal" class="chem__n" data-c="' + k + '" aria-label="Hệ số ' + k + ' / coefficient ' + k + '">';
    function show() { const f = ORG.burn(S.kind, nn(), 'int').fuel; st.textContent = '';
      r.innerHTML = '<div class="chem__eq" style="white-space:normal">' + inp(0) + uf(f) + ' + ' + inp(1) + 'O₂ <span class="chem__arr"><small>t°</small>→</span> ' + inp(2) + 'CO₂ + ' + inp(3) + 'H₂O</div>';
      const n = nn(), o2 = S.kind === 'alkane' ? (3 * n + 1) / 2 : 3 * n / 2, h2o = S.kind === 'alkane' ? n + 1 : n;
      $('[data-gen]', lab).innerHTML = '<p class="olab__hint"><b>' + pr('Phương trình tổng quát', 'General equation') + ':</b> ' + (S.kind === 'alkane' ? 'CₙH₂ₙ₊₂ + (3n+1)/2 O₂ —t°→ nCO₂ + (n+1)H₂O' : 'CₙH₂ₙ + 3n/2 O₂ —t°→ nCO₂ + nH₂O') + '</p><table class="olab__tbl chem__tbl"><tr><th>n</th><th>' + pr('mol O₂', 'mol O₂') + '</th><th>mol CO₂</th><th>mol H₂O</th></tr><tr><td>' + n + '</td><td>' + fmt(o2, o2 % 1 ? 1 : 0) + '</td><td>' + n + '</td><td>' + h2o + '</td></tr></table><p class="olab__hint"><small>' + pr('Tính cho 1 mol hydrocarbon.', 'For 1 mol of hydrocarbon.') + '</small></p>'; }
    const num = (s) => { s = String(s).trim().replace(',', '.'); if (/^\d+\/\d+$/.test(s)) { const [x, y] = s.split('/').map(Number); return y ? x / y : NaN; } return s === '' ? NaN : Number(s); };
    const good = (v) => isFinite(v) && v > 0;
    lab.addEventListener('click', (e) => {
      const k = e.target.closest('[data-k]'); if (k) { S.kind = k.dataset.k; if (S.kind === 'alkene' && P.n < 2) U.setCtl(lab, P, 'n', 2); $$('[data-k]', lab).forEach((x) => x.setAttribute('aria-pressed', x === k)); show(); return; }
      if (e.target.closest('[data-ans]')) { const s = cur(), fr = S.frac ? ORG.burn(S.kind, nn(), 'frac') : null; st.className = 'olab__status'; st.innerHTML = '<span class="chem__eq">' + (fr ? ORG.fracStr(fr) : E.eqStr(s)) + '</span>'; return; }
      if (!e.target.closest('[data-chk]')) return;
      const v = $$('[data-c]', lab).map((i) => num(i.value)); if (!v.every(good)) { st.className = 'olab__status olab__status--warn'; st.innerHTML = pr('Hãy nhập đủ bốn hệ số (số dương).', 'Please enter all four coefficients (positive numbers).'); return; }
      const f = cur().fuel, c = E.check({ re: [{ f, n: v[0] }, { f: 'O2', n: v[1] }], pr: [{ f: 'CO2', n: v[2] }, { f: 'H2O', n: v[3] }] }), ints = v.every((x) => Math.abs(x - Math.round(x)) < 1e-9), want = cur().re.concat(cur().pr).map((s) => s.n);
      let m, ok = false;
      if (!c.atoms) m = ['Chưa cân bằng: số nguyên tử mỗi nguyên tố hai vế chưa bằng nhau.', 'Not balanced: atom counts differ between the two sides.'];
      else if (!ints && !S.frac) m = ['Đã cân bằng nhưng có hệ số phân số; bật “Cho phép O₂ phân số” hoặc nhân cả phương trình để được số nguyên nhỏ nhất.', 'Balanced, but with a fractional coefficient; allow fractional O₂ or multiply through for the smallest whole numbers.'];
      else if (!ints) { ok = v[0] === 1; m = ok ? ['Đúng với O₂ phân số (hệ số của hydrocarbon là 1).', 'Correct with fractional O₂ (hydrocarbon coefficient 1).'] : ['Cân bằng được nhưng ở chế độ phân số hãy đặt hệ số hydrocarbon là 1.', 'Balanced, but in fractional mode set the hydrocarbon coefficient to 1.']; }
      else { ok = want.every((x, i) => x === v[i]); m = ok ? ['Đúng, hệ số nguyên nhỏ nhất.', 'Correct, the smallest whole numbers.'] : ['Đã cân bằng nhưng chưa phải số nguyên nhỏ nhất (hãy chia cho ước chung).', 'Balanced, but not the smallest whole numbers (divide by the common factor).']; }
      st.className = 'olab__status ' + (ok ? 'olab__status--ok' : 'olab__status--warn'); st.innerHTML = pr(m[0], m[1]); });
    lab.addEventListener('change', (e) => { if (e.target.dataset && e.target.dataset.fr !== undefined) S.frac = e.target.checked; });
    U.bindCtl(lab, P, show); show(); return { state: P };
  }
  /* ------------------------------------------------------------ W23.5 : nhiệt lượng */
  function heatLab(body) {
    const [a, b, c] = U.wrap(body, 3), P = { m: 100, x: 50, kg: 1 }, S = { f: 'CH4' }, FS = ['CH4', 'C2H6', 'C3H8', 'C4H10'], NM = { CH4: 'methane', C2H6: 'ethane', C3H8: 'propane', C4H10: 'butane' };
    a.innerHTML = '<div class="olab em" data-lab><p class="olab__hint">' + pr('Chọn alkane và khối lượng để tính nhiệt toả ra khi đốt hoàn toàn; biểu đồ cột so sánh nhiệt toả ra khi đốt 1 gam.', 'Choose an alkane and a mass to find the heat released on complete combustion; the bars compare the heat from 1 g.') + '</p><div class="olab__btns">' + FS.map((f) => '<button type="button" class="pw__chip" data-f="' + f + '" aria-pressed="' + (f === S.f) + '">' + NM[f] + ' ' + uf(f) + '</button>').join('') + '</div>' + U.ctl('m', 'Khối lượng', 'Mass', 1, 1000, 1, P.m, ' g') + '<div data-r aria-live="polite"></div></div>';
    const lab = $('[data-lab]', a), r = $('[data-r]', lab);
    const show = () => { const per = FS.map((f) => ORG.heatGram(f)), mx = Math.max.apply(null, per), Q = ORG.heatMass(S.f, P.m);
      r.innerHTML = '<p class="olab__status olab__status--ok">' + pr(NM[S.f] + ' ' + uf(S.f) + ' (M = ' + ORG.mm(S.f) + ' g/mol, ' + fmt(ORG.heatMol(S.f), 0) + ' kJ/mol): đốt ' + fmt(P.m, 0) + ' g toả ra ≈ ' + fmt(Q, 0) + ' kJ.', NM[S.f] + ' ' + uf(S.f) + ' (M = ' + ORG.mm(S.f) + ' g/mol, ' + fmt(ORG.heatMol(S.f), 0) + ' kJ/mol): burning ' + fmt(P.m, 0) + ' g releases ≈ ' + fmt(Q, 0) + ' kJ.') + '</p><div role="img" aria-label="Nhiệt toả ra khi đốt 1 g / Heat from 1 g">' + FS.map((f, i) => '<div class="mol__bar' + (per[i] === mx ? ' is-top' : '') + '"><span>' + NM[f] + '</span><i style="width:' + (per[i] / mx * 100).toFixed(1) + '%"></i><b>' + fmt(per[i], 1) + ' kJ/g</b></div>').join('') + '</div><p class="olab__hint"><small>' + pr('Đốt 1 g alkane: methane toả nhiều nhiệt nhất. Số liệu mol theo CRC Handbook, 97th ed. (sách).', 'Per gram, methane releases the most heat. Per-mole data from CRC Handbook, 97th ed. (the book).') + '</small></p>'; };
    a.addEventListener('click', (e) => { const f = e.target.closest('[data-f]'); if (!f) return; S.f = f.dataset.f; $$('[data-f]', a).forEach((x) => x.setAttribute('aria-pressed', x === f)); show(); });
    U.bindCtl(lab, P, show); show();
    b.innerHTML = '<div class="olab em" data-lab2><h4>' + pr('Bình gas: hỗn hợp propane và butane (câu 2)', 'Gas cylinder: propane–butane mix (question 2)') + '</h4><p class="olab__hint">' + pr('Giả thiết: tỉ lệ thể tích bằng tỉ lệ mol (cùng điều kiện), đốt hoàn toàn. Mặc định 1 : 1 và 1 kg.', 'Assumption: volume ratio equals mole ratio (same conditions), complete combustion. Default 1 : 1 and 1 kg.') + '</p>' + U.ctl('x', 'Propane (phần thể tích %)', 'Propane (volume %)', 0, 100, 1, P.x, ' %') + U.ctl('kg', 'Khối lượng khí', 'Mass of gas', 0.5, 15, 0.5, P.kg, ' kg') + '<div data-r2 aria-live="polite"></div></div>';
    const lab2 = $('[data-lab2]', b), r2 = $('[data-r2]', lab2);
    const mix = () => { const m = ORG.mix(P.x / 100, 'C3H8', 'C4H10', P.kg); r2.innerHTML = '<table class="olab__tbl chem__tbl"><tr><td>' + pr('Khối lượng mol trung bình', 'Mean molar mass') + '</td><td>' + fmt(m.M, 1) + ' g/mol</td></tr><tr><td>' + pr('Nhiệt trung bình', 'Mean heat') + '</td><td>' + fmt(m.Q, 0) + ' kJ/mol</td></tr><tr><td>' + pr('Số mol khí', 'Moles of gas') + '</td><td>' + fmt(m.mol, 1) + ' mol</td></tr></table><p class="olab__status olab__status--ok">' + pr('Nhiệt toả ra ≈ ' + fmt(m.kJ, 0) + ' kJ (≈ ' + fmt(m.kJ / 1e4, 1) + '·10⁴ kJ).', 'Heat released ≈ ' + fmt(m.kJ, 0) + ' kJ (≈ ' + fmt(m.kJ / 1e4, 1) + '·10⁴ kJ).') + '</p>'; };
    U.bindCtl(lab2, P, mix); mix();
    const FU = [['propane', 'propane', 'gas', 'bếp gas, bật lửa'], ['butane', 'butane', 'gas', 'bếp gas, bật lửa'], ['xăng', 'petrol', 'liq', 'xe máy, ô tô'], ['dầu hoả', 'kerosene', 'liq', 'đèn dầu, bếp dầu'], ['dầu diesel', 'diesel', 'liq', 'xe tải, tàu'], ['nhiên liệu phản lực', 'jet fuel', 'liq', 'máy bay'], ['nến paraffin', 'paraffin candle', 'sol', 'thắp sáng']];
    EL.sorter(c, { hint: ['Bảng 23.2: kéo từng nhiên liệu vào dạng nhiên liệu của nó.', 'Table 23.2: drag each fuel into its fuel type.'], boxes: [{ id: 'gas', vi: 'Khí hoá lỏng', en: 'Liquefied gas' }, { id: 'liq', vi: 'Nhiên liệu lỏng', en: 'Liquid fuel' }, { id: 'sol', vi: 'Nhiên liệu rắn', en: 'Solid fuel' }], items: FU.map((x, i) => ({ id: 'f' + i, vi: x[0] + ' (' + x[3] + ')', en: x[1], to: [x[2]] })) });
    return { state: P };
  }
  /* ------------------------------------------------------------ W23.6 : alkane khá bền */
  function stableLab(body) {
    const id = 'st' + (++uid), S = { s: null, r: null };
    const SM = [['butane', 'butane C₄H₁₀', 'alk'], ['methane', 'methane CH₄', 'alk'], ['Mg', 'magnesium Mg', 'met'], ['Zn', 'zinc Zn', 'met']], RG = [['HCl', 'dung dịch HCl (acid)', 'HCl solution (acid)'], ['NaOH', 'dung dịch NaOH (base)', 'NaOH solution (base)']];
    body.innerHTML = '<div class="olab em" data-lab="' + id + '"><p class="olab__hint">' + pr('Kéo (hoặc chọn rồi nhấn) mẫu thử vào ống nghiệm acid hoặc base và đọc kết quả. So sánh alkane với kim loại hoạt động mạnh (Bài 19).', 'Drag (or select and press) a sample into the acid or base tube and read the result. Compare alkanes with reactive metals (Lesson 19).') + '</p><div data-s>' + SM.map((x) => '<span class="pw__chip" role="button" tabindex="0" data-drag="' + x[0] + '" data-g="' + x[0] + '">' + x[1] + '</span>').join('') + '</div><div class="olab__cols">' + RG.map((x) => '<div class="pw__zone" role="button" tabindex="0" data-drop="' + x[0] + '"><b>' + pr(x[1], x[2]) + '</b></div>').join('') + '</div><div data-r aria-live="polite"></div><p class="olab__hint"><small>' + pr('Kết quả định tính theo sách: alkane khá bền, ở điều kiện thường không phản ứng với acid, base… Kim loại với NaOH không xét trong sách này.', 'Qualitative, as in the book: alkanes are fairly stable and do not react with acids, bases… at ordinary conditions. Metals with NaOH are not covered here.') + ' ' + pr(ML.SAFE[0], ML.SAFE[1]) + '</small></p></div>';
    const lab = $('[data-lab]', body), r = $('[data-r]', lab);
    U.drag(lab, (s, z) => { const kind = SM.find((x) => x[0] === s)[2]; let h;
      if (kind === 'alk') h = '<p class="olab__status olab__status--ok">' + pr(SM.find((x) => x[0] === s)[1] + ' + ' + z + ': không có hiện tượng, không phản ứng (alkane bền).', SM.find((x) => x[0] === s)[1] + ' + ' + z + ': nothing happens, no reaction (alkanes are stable).') + '</p>';
      else if (z === 'HCl') { const x = E.react(s, 'HCl'); h = x && x.kind === 'react' ? '<p class="olab__status olab__status--warn">' + pr(s + ' phản ứng mạnh, có bọt khí H₂:', s + ' reacts, bubbles of H₂:') + ' <span class="chem__eq">' + E.eqStr(x) + '</span></p>' : '<p class="olab__status">' + pr('Không phản ứng.', 'No reaction.') + '</p>'; }
      else h = '<p class="olab__status">' + pr(s + ' với NaOH: không xét trong sách này.', s + ' with NaOH: not covered in this book.') + '</p>';
      r.innerHTML = h; });
    return {};
  }
  const sims = {
    'mol-homol': { fn: homolLab, vi: 'Dãy đồng đẳng alkane (Bảng 23.1)', en: 'Homologous series of alkanes (Table 23.1)', intro: 'Kéo thanh trượt n.' },
    'mol-alk': { fn: alkLab, vi: 'Chất nào là alkane? (Hình 23.1)', en: 'Which are alkanes? (Figure 23.1)', intro: 'Kéo chất A–I vào ba ô.' },
    'mol-burn': { fn: burnLab, vi: 'Thí nghiệm đốt butane (Hình 23.2)', en: 'Burning butane experiment (Figure 23.2)', intro: 'Kéo bật lửa, đánh lửa, lật bình, đổ nước vôi trong.' },
    'mol-balance': { fn: balanceLab, vi: 'Cân bằng phản ứng cháy của hydrocarbon', en: 'Balancing hydrocarbon combustion', intro: 'Nhập hệ số rồi kiểm tra.' },
    'mol-heat': { fn: heatLab, vi: 'Nhiệt lượng khi đốt alkane và bình gas', en: 'Heat from alkanes and the gas cylinder', intro: 'Chọn alkane, kéo thanh trượt.' },
    'mol-stable': { fn: stableLab, vi: 'Tính bền của alkane', en: 'Stability of alkanes', intro: 'Kéo mẫu vào ống nghiệm.' }
  };
  window.LabSims = Object.assign(window.LabSims || {}, sims);
  /* kiểm thử: phân loại A–I theo sách */
  const prevT = L.engine.selfTest; L.engine.selfTest = function () {
    const T = prevT(), add = (n, ok, got) => T.push({ name: n, ok: !!ok, got }), g = {}; AL.forEach(([l, s]) => { const c = M.classify(M.fromSmiles(s)); g[l] = c.alkane ? 'alk' : c.hydrocarbon ? 'hc' : 'non'; });
    add('Bài 23 câu 2: alkane A, G, I; hydrocarbon không phải alkane B, C, H; không phải hydrocarbon D, E', ['A', 'G', 'I'].every((k) => g[k] === 'alk') && ['B', 'C', 'H'].every((k) => g[k] === 'hc') && ['D', 'E'].every((k) => g[k] === 'non'), JSON.stringify(g));
    return T; };
})();
