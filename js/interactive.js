/* ==========================================================================
   THAO TÁC TRỰC QUAN (Interactive operations) cho Toán 9 và Tin học 9
   --------------------------------------------------------------------------
   Mỗi mô phỏng là một hàm độc lập: init(vùng_chứa, cấu_hình). Muốn thêm mô
   phỏng mới chỉ cần:
     1. viết hàm sim...(body, cfg) và đăng ký vào SIMS;
     2. thêm một dòng vào PLACE để chèn nó vào đúng trang của bài.
   Không sửa file dữ liệu bài học: inject() tự chèn khối { t: 'sim', id, cfg }
   vào dữ liệu khi trang web nạp. app.js chỉ cần hai dòng (R.sim và
   Interactive.mount trong initWidgets).

   Toán 9 (SVG, kéo thả, thanh trượt)       Tin học 9 (bảng tính mô phỏng)
     linear   đường thẳng, hệ 2 phương trình   countif  hàm COUNTIF
     numline  bất phương trình trên trục số    sumif    hàm SUMIF
     trig     tỉ số lượng giác của góc nhọn
     circle   vị trí điểm và đường tròn
     fntable  bảng giá trị căn bậc hai
   Mọi thao tác dùng được bằng bàn phím (thanh trượt, phím mũi tên trên
   tay nắm). Phím mũi tên trên tay nắm không làm lật trang sách
   (stopPropagation chặn trình nghe phím của app.js).
   ========================================================================== */
(function () {
  'use strict';
  const D = window.TEXTBOOK;
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const MINUS = '−';

  /* ---------- Định dạng số theo kiểu Việt Nam (dấu phẩy thập phân) ---------- */
  const num = (v, d) => { const r = +(+v).toFixed(d == null ? 2 : d); return String(Object.is(r, -0) ? 0 : r).replace('.', ',').replace('-', MINUS); };
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const RELS = { '<': '<', '<=': '≤', '>': '>', '>=': '≥' };
  const flipRel = { '<': '>', '<=': '>=', '>': '<', '>=': '<=' };
  const holds = (v, rel, p) => { const e = 1e-9; return rel === '<' ? v < p - e : rel === '<=' ? v <= p + e : rel === '>' ? v > p + e : v >= p - e; };

  /* ---------- Thành phần giao diện dùng chung ---------- */
  const slider = (key, label, min, max, step, val) =>
    '<label class="sim__ctl"><span>' + label + ' = <output data-out="' + key + '">' + num(val) + '</output></span>' +
    '<input type="range" data-k="' + key + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '"></label>';
  const pair = (vi, en) => '<span class="vi">' + vi + '</span><span class="en" lang="en">' + en + '</span>';

  /* Hệ trục toạ độ: đổi qua lại giữa toạ độ toán học và toạ độ SVG. */
  function plane(W, H, xr, yr) {
    const sx = (x) => (x - xr[0]) / (xr[1] - xr[0]) * W;
    const sy = (y) => H - (y - yr[0]) / (yr[1] - yr[0]) * H;
    let grid = '';
    for (let x = Math.ceil(xr[0]); x <= Math.floor(xr[1]); x++) {
      grid += '<line class="sim__g' + (x === 0 ? ' sim__g--axis' : '') + '" x1="' + sx(x) + '" y1="0" x2="' + sx(x) + '" y2="' + H + '"/>';
      if (x !== 0 && x % 2 === 0) grid += '<text class="sim__tick" x="' + sx(x) + '" y="' + (sy(0) + 14) + '" text-anchor="middle">' + num(x, 0) + '</text>';
    }
    for (let y = Math.ceil(yr[0]); y <= Math.floor(yr[1]); y++) {
      grid += '<line class="sim__g' + (y === 0 ? ' sim__g--axis' : '') + '" x1="0" y1="' + sy(y) + '" x2="' + W + '" y2="' + sy(y) + '"/>';
      if (y !== 0 && y % 2 === 0) grid += '<text class="sim__tick" x="' + (sx(0) - 6) + '" y="' + (sy(y) + 4) + '" text-anchor="end">' + num(y, 0) + '</text>';
    }
    grid += '<text class="sim__tick" x="' + (W - 8) + '" y="' + (sy(0) - 6) + '" text-anchor="end">x</text><text class="sim__tick" x="' + (sx(0) + 8) + '" y="12">y</text>';
    return { sx: sx, sy: sy, grid: grid, ix: (px) => px / W * (xr[1] - xr[0]) + xr[0], iy: (py) => (H - py) / H * (yr[1] - yr[0]) + yr[0] };
  }

  /* Kéo thả trên SVG (chuột, cảm ứng, bút). cb(px, py) nhận toạ độ trong viewBox. */
  function drag(svg, W, H, cb, canStart) {
    let on = false;
    const at = (e) => { const r = svg.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * W, (e.clientY - r.top) / r.height * H]; };
    svg.addEventListener('pointerdown', (e) => {
      const p = at(e);
      if (canStart && !canStart(e, p)) return;
      on = true; svg.setPointerCapture(e.pointerId); cb(p[0], p[1]); e.preventDefault();
    });
    svg.addEventListener('pointermove', (e) => { if (on) { const p = at(e); cb(p[0], p[1]); } });
    const off = () => { on = false; };
    svg.addEventListener('pointerup', off); svg.addEventListener('pointercancel', off);
  }


  /* ======================================================================
     TOÁN 9
     ====================================================================== */

  /* ---------- 1. Đường thẳng ax + by = c và hệ hai phương trình ---------- */
  function eqText(a, b, c) {
    let s = '';
    const term = (k, v) => {
      if (!k) return;
      const abs = Math.abs(k), body = (abs === 1 ? '' : num(abs, 0)) + v;
      s += s === '' ? (k < 0 ? MINUS : '') + body : ' ' + (k < 0 ? MINUS : '+') + ' ' + body;
    };
    term(a, 'x'); term(b, 'y');
    return (s || '0') + ' = ' + num(c, 0);
  }
  function simLinear(body, cfg) {
    const sys = cfg.mode === 'system';
    const W = 360, H = 360, R = 6, P = plane(W, H, [-R, R], [-R, R]);
    const eq = sys ? [{ a: 1, b: 1, c: 3 }, { a: 1, b: -1, c: 1 }] : [{ a: 2, b: 1, c: 4 }];
    const pt = { x: 1, y: 2 };
    const colors = ['sim__ln1', 'sim__ln2'];
    const ctl = eq.map((e, i) => '<fieldset class="sim__fs"><legend>' + (sys ? 'Phương trình (' + (i + 1) + ')' : 'Phương trình') + ' <b data-eq-t="' + i + '"></b></legend>' +
      slider('a' + i, 'a', -5, 5, 1, e.a) + slider('b' + i, 'b', -5, 5, 1, e.b) + slider('c' + i, 'c', -10, 10, 1, e.c) + '</fieldset>').join('');
    body.innerHTML = '<div class="sim__cols"><div class="sim__panel">' + ctl + '</div>' +
      '<div class="sim__panel"><svg class="sim__svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Đồ thị đường thẳng" data-svg></svg></div></div>' +
      '<div class="sim__read" aria-live="polite" data-read></div>' + (sys ? '' : '<div data-table></div>');
    const svg = $('[data-svg]', body);

    const seg = (e) => e.b !== 0 ? [[-2 * R, (e.c + e.a * 2 * R) / e.b], [2 * R, (e.c - e.a * 2 * R) / e.b]] : e.a !== 0 ? [[e.c / e.a, -2 * R], [e.c / e.a, 2 * R]] : null;
    function update() {
      let g = P.grid;
      eq.forEach((e, i) => { const s = seg(e); if (s) g += '<line class="' + colors[i] + '" x1="' + P.sx(s[0][0]) + '" y1="' + P.sy(s[0][1]) + '" x2="' + P.sx(s[1][0]) + '" y2="' + P.sy(s[1][1]) + '"/>'; });
      let read = '';
      eq.forEach((e, i) => { $('[data-eq-t="' + i + '"]', body).textContent = eqText(e.a, e.b, e.c); });
      if (sys) {
        const [e1, e2] = eq, Dt = e1.a * e2.b - e2.a * e1.b;
        if (e1.a === 0 && e1.b === 0 || e2.a === 0 && e2.b === 0) read = '<p class="sim__warn">Mỗi phương trình cần a và b không đồng thời bằng 0.</p>';
        else if (Dt !== 0) {
          const x = (e1.c * e2.b - e2.c * e1.b) / Dt, y = (e1.a * e2.c - e2.a * e1.c) / Dt;
          g += '<circle class="sim__pt" cx="' + P.sx(x) + '" cy="' + P.sy(y) + '" r="6"/>';
          read = '<p class="vi"><b>Hệ có nghiệm duy nhất</b> (x; y) = (' + num(x) + '; ' + num(y) + '). Hai đường thẳng cắt nhau.</p><p class="en" lang="en">The system has exactly one solution: the two lines intersect.</p>';
        } else if (e1.a * e2.c - e2.a * e1.c === 0 && e1.b * e2.c - e2.b * e1.c === 0) {
          read = '<p class="vi"><b>Hệ có vô số nghiệm.</b> Hai đường thẳng trùng nhau.</p><p class="en" lang="en">Infinitely many solutions: the lines coincide.</p>';
        } else {
          read = '<p class="vi"><b>Hệ vô nghiệm.</b> Hai đường thẳng song song.</p><p class="en" lang="en">No solution: the lines are parallel.</p>';
        }
      } else {
        const e = eq[0];
        g += '<circle class="sim__pt" cx="' + P.sx(pt.x) + '" cy="' + P.sy(pt.y) + '" r="6"/><text class="sim__lab" x="' + (P.sx(pt.x) + 9) + '" y="' + (P.sy(pt.y) - 8) + '">(' + num(pt.x, 0) + '; ' + num(pt.y, 0) + ')</text>';
        if (e.a === 0 && e.b === 0) read = '<p class="sim__warn">Cần a và b không đồng thời bằng 0 thì đây mới là phương trình bậc nhất hai ẩn.</p>';
        else {
          const v = e.a * pt.x + e.b * pt.y, ok = v === e.c;
          read = '<p class="vi">Bấm vào đồ thị để chọn một điểm. Thay (x; y) = (' + num(pt.x, 0) + '; ' + num(pt.y, 0) + '): vế trái = ' + num(v, 0) + ', vế phải = ' + num(e.c, 0) + '. ' +
            (ok ? '<b class="sim__ok">Cặp số này là một nghiệm</b>' : '<b class="sim__no">Cặp số này không là nghiệm</b>') + ' của phương trình.</p>' +
            '<p class="en" lang="en">Click the graph to choose a point. It is a solution only if it lies on the line.</p>';
          let rows = '';
          for (let x = -3; x <= 3; x++) rows += '<td>' + num(x, 0) + '</td>';
          let ys = '';
          for (let x = -3; x <= 3; x++) ys += '<td>' + (e.b !== 0 ? num((e.c - e.a * x) / e.b) : (x === e.c / e.a ? 'mọi y' : '—')) + '</td>';
          $('[data-table]', body).innerHTML = '<div class="tablewrap"><table class="sim__tbl"><tbody><tr><th scope="row">x</th>' + rows + '</tr><tr><th scope="row">y</th>' + ys + '</tr></tbody></table></div>';
        }
      }
      svg.innerHTML = g;
      $('[data-read]', body).innerHTML = read;
    }
    body.addEventListener('input', (e) => {
      const k = e.target.dataset && e.target.dataset.k; if (!k) return;
      const i = Number(k.slice(1)); eq[i][k.charAt(0)] = Number(e.target.value);
      $('[data-out="' + k + '"]', body).textContent = num(e.target.value, 0); update();
    });
    if (!sys) drag(svg, W, H, (px, py) => { pt.x = clamp(Math.round(P.ix(px)), -R, R); pt.y = clamp(Math.round(P.iy(py)), -R, R); update(); });
    update();
  }

  /* ---------- 2. Bất phương trình mx + n ⋚ p trên trục số ---------- */
  function simNumline(body) {
    const W = 640, H = 150, A = -12, B = 12, X0 = 24, X1 = W - 24;
    const sx = (v) => X0 + (v - A) / (B - A) * (X1 - X0), ix = (px) => A + (px - X0) / (X1 - X0) * (B - A);
    const st = { m: 2, n: 1, p: 7, rel: '<', t: 0 };
    body.innerHTML = '<div class="sim__cols"><div class="sim__panel"><fieldset class="sim__fs"><legend>Bất phương trình <b data-ineq></b></legend>' +
      slider('m', 'm', -3, 3, 1, st.m) + slider('n', 'n', -6, 6, 1, st.n) + slider('p', 'p', -6, 6, 1, st.p) +
      '<label class="sim__ctl"><span>Dấu so sánh</span><select data-rel><option value="<">&lt;</option><option value="<=">≤</option><option value=">">&gt;</option><option value=">=">≥</option></select></label></fieldset></div>' +
      '<div class="sim__panel"><svg class="sim__svg sim__svg--wide" viewBox="0 0 ' + W + ' ' + H + '" role="group" aria-label="Trục số" data-svg></svg>' +
      '<p class="sim__hint">Kéo chấm cam (hoặc chọn rồi nhấn phím mũi tên) để thử một giá trị của x.</p></div></div><div class="sim__read" aria-live="polite" data-read></div>';
    const svg = $('[data-svg]', body), rel = $('[data-rel]', body);
    rel.value = st.rel;
    const axisY = 78;

    function update() {
      const { m, n, p } = st;
      let g = '<line class="sim__axis" x1="' + X0 + '" y1="' + axisY + '" x2="' + X1 + '" y2="' + axisY + '"/>';
      for (let v = A; v <= B; v++) g += '<line class="sim__g" x1="' + sx(v) + '" y1="' + (axisY - 5) + '" x2="' + sx(v) + '" y2="' + (axisY + 5) + '"/>' + (v % 2 === 0 ? '<text class="sim__tick" x="' + sx(v) + '" y="' + (axisY + 24) + '" text-anchor="middle">' + num(v, 0) + '</text>' : '');
      const ineq = (m === 0 ? '0' : (m === 1 ? '' : m === -1 ? MINUS : num(m, 0)) + 'x') + ' ' + (n < 0 ? MINUS + ' ' + num(-n, 0) : '+ ' + num(n, 0)) + ' ' + RELS[st.rel] + ' ' + num(p, 0);
      $('[data-ineq]', body).textContent = ineq;
      let read = '';
      if (m === 0) {
        const all = holds(n, st.rel, p);
        read = '<p class="vi">Khi m = 0 thì đây không còn là bất phương trình bậc nhất. ' + (all ? '<b>Mọi số x đều là nghiệm</b>' : '<b>Bất phương trình vô nghiệm</b>') + ' vì ' + num(n, 0) + ' ' + RELS[st.rel] + ' ' + num(p, 0) + (all ? ' đúng.' : ' sai.') + '</p>';
        if (all) g += '<line class="sim__sol" x1="' + X0 + '" y1="' + axisY + '" x2="' + X1 + '" y2="' + axisY + '"/>';
      } else {
        const k = (p - n) / m, r2 = m > 0 ? st.rel : flipRel[st.rel];
        const toRight = r2 === '>' || r2 === '>=';
        const from = clamp(k, A, B);
        g += '<line class="sim__sol" x1="' + sx(from) + '" y1="' + axisY + '" x2="' + (toRight ? X1 : X0) + '" y2="' + axisY + '"/>';
        if (k >= A && k <= B) g += '<circle class="' + (r2.length === 2 ? 'sim__end sim__end--on' : 'sim__end') + '" cx="' + sx(k) + '" cy="' + axisY + '" r="7"/><text class="sim__lab" x="' + sx(k) + '" y="' + (axisY - 16) + '" text-anchor="middle">' + num(k) + '</text>';
        read = '<p class="vi"><b>Nghiệm: x ' + RELS[r2] + ' ' + num(k) + '.</b> ' + (m < 0 ? 'Chia cả hai vế cho số âm (m = ' + num(m, 0) + ') nên <b>đổi chiều</b> bất đẳng thức. ' : '') +
          'Chấm ' + (r2.length === 2 ? 'đặc' : 'rỗng') + ' nghĩa là ' + num(k) + (r2.length === 2 ? ' là' : ' không là') + ' nghiệm.</p>' +
          '<p class="en" lang="en">Dividing by a negative number reverses the inequality.</p>';
      }
      const t = st.t, val = m * t + n, ok = holds(val, st.rel, p);
      g += '<g class="sim__handle" data-h tabindex="0" role="slider" aria-label="Giá trị thử của x" aria-valuemin="' + A + '" aria-valuemax="' + B + '" aria-valuenow="' + t + '" aria-valuetext="x bằng ' + num(t) + '">' +
        '<circle cx="' + sx(t) + '" cy="' + axisY + '" r="11"/><text x="' + sx(t) + '" y="' + (axisY + 48) + '" text-anchor="middle" class="sim__lab">x = ' + num(t) + '</text></g>';
      svg.innerHTML = g;
      $('[data-read]', body).innerHTML = read + '<p class="vi">Thử x = ' + num(t) + ': ' + (m === 0 ? '0' : num(m, 0) + '·' + num(t)) + ' + ' + num(n, 0) + ' = ' + num(val) + ' ' + (ok ? '<b class="sim__ok">thoả</b>' : '<b class="sim__no">không thoả</b>') + ' điều kiện ' + RELS[st.rel] + ' ' + num(p, 0) + '.</p>';
    }
    const refocus = () => { const h = $('[data-h]', svg); if (h) h.focus({ preventScroll: true }); };
    body.addEventListener('input', (e) => {
      const k = e.target.dataset && e.target.dataset.k; if (!k) return;
      st[k] = Number(e.target.value); $('[data-out="' + k + '"]', body).textContent = num(e.target.value, 0); update();
    });
    rel.addEventListener('change', () => { st.rel = rel.value; update(); });
    drag(svg, W, H, (px) => { st.t = clamp(Math.round(ix(px) * 2) / 2, A, B); update(); });
    svg.addEventListener('keydown', (e) => {
      const d = { ArrowLeft: -0.5, ArrowRight: 0.5, ArrowDown: -0.5, ArrowUp: 0.5 }[e.key];
      if (d === undefined || !e.target.closest('[data-h]')) return;
      e.preventDefault(); e.stopPropagation(); st.t = clamp(st.t + d, A, B); update(); refocus();
    });
    update();
  }

  /* ---------- 3. Tỉ số lượng giác của góc nhọn ---------- */
  function simTrig(body) {
    const W = 380, H = 300, Bx = 36, By = 262, HYP = 300;       // BC = 10 đơn vị = 300 px
    const st = { a: 35 };
    body.innerHTML = '<div class="sim__cols"><div class="sim__panel">' + slider('a', 'Góc α (độ)', 5, 85, 1, st.a) +
      '<div class="sim__btns"><span>Góc đặc biệt:</span><button type="button" class="btn btn--ghost btn--sm" data-set="30">30°</button><button type="button" class="btn btn--ghost btn--sm" data-set="45">45°</button><button type="button" class="btn btn--ghost btn--sm" data-set="60">60°</button></div>' +
      '<div class="tablewrap"><table class="sim__tbl sim__tbl--l" data-tbl></table></div></div>' +
      '<div class="sim__panel"><svg class="sim__svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Tam giác vuông ABC" data-svg></svg><p class="sim__hint">Kéo đỉnh C hoặc dùng thanh trượt để đổi góc.</p></div></div><div class="sim__read" aria-live="polite" data-read></div>';
    const svg = $('[data-svg]', body);
    function update() {
      const r = st.a * Math.PI / 180, s = Math.sin(r), c = Math.cos(r), tn = Math.tan(r);
      const Ax = Bx + HYP * c * 0.85, Cy = By - HYP * s * 0.85, Cx = Ax;           // thu nhỏ 15% cho vừa khung
      let g = '<polygon class="sim__tri" points="' + Bx + ',' + By + ' ' + Ax + ',' + By + ' ' + Cx + ',' + Cy + '"/>' +
        '<path class="sim__rt" d="M' + (Ax - 14) + ',' + By + ' L' + (Ax - 14) + ',' + (By - 14) + ' L' + Ax + ',' + (By - 14) + '"/>' +
        '<path class="sim__arc" d="M' + (Bx + 46) + ',' + By + ' A46,46 0 0 0 ' + (Bx + 46 * c) + ',' + (By - 46 * s) + '"/>' +
        '<text class="sim__lab" x="' + (Bx + 56) + '" y="' + (By - 8) + '">α = ' + num(st.a, 0) + '°</text>' +
        '<text class="sim__lab" x="' + (Bx - 12) + '" y="' + (By + 16) + '">B</text><text class="sim__lab" x="' + (Ax + 6) + '" y="' + (By + 16) + '">A</text><text class="sim__lab" x="' + (Cx + 8) + '" y="' + (Cy - 4) + '">C</text>' +
        '<text class="sim__side" x="' + ((Bx + Ax) / 2) + '" y="' + (By + 18) + '" text-anchor="middle">cạnh kề AB</text>' +
        '<text class="sim__side" x="' + (Ax + 8) + '" y="' + ((By + Cy) / 2) + '">cạnh đối AC</text>' +
        '<text class="sim__side" x="' + ((Bx + Cx) / 2 - 8) + '" y="' + ((By + Cy) / 2 - 8) + '" text-anchor="end">cạnh huyền BC</text>' +
        '<g class="sim__handle" data-h tabindex="0" role="slider" aria-label="Góc alpha" aria-valuemin="5" aria-valuemax="85" aria-valuenow="' + st.a + '" aria-valuetext="' + st.a + ' độ"><circle cx="' + Cx + '" cy="' + Cy + '" r="11"/></g>';
      svg.innerHTML = g;
      const f = (v) => num(v, 3);
      $('[data-tbl]', body).innerHTML = '<tbody><tr><th scope="row">sin α = đối / huyền</th><td>' + f(s) + '</td></tr><tr><th scope="row">cos α = kề / huyền</th><td>' + f(c) + '</td></tr>' +
        '<tr><th scope="row">tan α = đối / kề</th><td>' + f(tn) + '</td></tr><tr><th scope="row">cot α = kề / đối</th><td>' + f(1 / tn) + '</td></tr></tbody>';
      $('[data-read]', body).innerHTML = '<p class="vi">Lấy BC = 10: AC = ' + num(10 * s) + ', AB = ' + num(10 * c) + '. Kiểm tra: sin²α + cos²α = ' + f(s * s + c * c) + '; sin α ÷ cos α = ' + f(s / c) + ' = tan α. ' +
        (st.a === 30 ? '<b>Với 30°: sin α = 0,5.</b> ' : st.a === 45 ? '<b>Với 45°: sin α = cos α.</b> ' : st.a === 60 ? '<b>Với 60°: cos α = 0,5.</b> ' : '') +
        (st.a > 45 ? 'Góc càng lớn, sin α càng tăng và cos α càng giảm.' : 'Nhận xét: sin α < cos α khi α < 45°.') + '</p><p class="en" lang="en">sin² + cos² = 1 for every acute angle; tan = sin ÷ cos.</p>';
    }
    body.addEventListener('input', (e) => { if (e.target.dataset && e.target.dataset.k === 'a') { st.a = Number(e.target.value); $('[data-out="a"]', body).textContent = num(st.a, 0); update(); } });
    body.addEventListener('click', (e) => { const b = e.target.closest('[data-set]'); if (b) { st.a = Number(b.dataset.set); $('[data-k="a"]', body).value = st.a; $('[data-out="a"]', body).textContent = st.a; update(); } });
    drag(svg, W, H, (px, py) => { st.a = clamp(Math.round(Math.atan2(By - py, px - Bx) * 180 / Math.PI), 5, 85); $('[data-k="a"]', body).value = st.a; $('[data-out="a"]', body).textContent = st.a; update(); });
    svg.addEventListener('keydown', (e) => {
      const d = { ArrowLeft: -1, ArrowDown: -1, ArrowRight: 1, ArrowUp: 1 }[e.key];
      if (d === undefined) return;
      e.preventDefault(); e.stopPropagation(); st.a = clamp(st.a + d, 5, 85); $('[data-k="a"]', body).value = st.a; $('[data-out="a"]', body).textContent = st.a; update(); const h = $('[data-h]', svg); if (h) h.focus({ preventScroll: true });
    });
    update();
  }

  /* ---------- 4. Vị trí của một điểm đối với đường tròn ---------- */
  function simCircle(body) {
    const S = 360, U = 30, O = S / 2;                              // 1 đơn vị = 30 px
    const st = { r: 3, x: 1.5, y: 1 };
    body.innerHTML = '<div class="sim__cols"><div class="sim__panel">' + slider('r', 'Bán kính R', 1, 5, 0.5, st.r) +
      '<p class="sim__hint">Kéo điểm M (hoặc chọn rồi nhấn phím mũi tên) để xem vị trí của M đối với đường tròn (O; R).</p></div>' +
      '<div class="sim__panel"><svg class="sim__svg" viewBox="0 0 ' + S + ' ' + S + '" role="group" aria-label="Đường tròn tâm O và điểm M" data-svg></svg></div></div><div class="sim__read" aria-live="polite" data-read></div>';
    const svg = $('[data-svg]', body);
    function update() {
      const d = Math.hypot(st.x, st.y), pos = Math.abs(d - st.r) < 0.06 ? 'on' : d < st.r ? 'in' : 'out';
      const mx = O + st.x * U, my = O - st.y * U;
      svg.innerHTML = '<circle class="sim__circ" cx="' + O + '" cy="' + O + '" r="' + st.r * U + '"/>' +
        '<line class="sim__rad" x1="' + O + '" y1="' + O + '" x2="' + (O + st.r * U) + '" y2="' + O + '"/><text class="sim__side" x="' + (O + st.r * U / 2) + '" y="' + (O + 16) + '" text-anchor="middle">R = ' + num(st.r) + '</text>' +
        '<line class="sim__om sim__om--' + pos + '" x1="' + O + '" y1="' + O + '" x2="' + mx + '" y2="' + my + '"/>' +
        '<circle class="sim__pt sim__pt--o" cx="' + O + '" cy="' + O + '" r="4"/><text class="sim__lab" x="' + (O - 14) + '" y="' + (O + 16) + '">O</text>' +
        '<g class="sim__handle sim__handle--' + pos + '" data-h tabindex="0" role="application" aria-label="Điểm M. OM = ' + num(d) + ', R = ' + num(st.r) + '"><circle cx="' + mx + '" cy="' + my + '" r="11"/></g><text class="sim__lab" x="' + (mx + 14) + '" y="' + (my - 12) + '">M</text>';
      const t = { in: ['nằm trong', 'OM < R', 'inside'], on: ['nằm trên', 'OM = R', 'on'], out: ['nằm ngoài', 'OM > R', 'outside'] }[pos];
      $('[data-read]', body).innerHTML = '<p class="vi">OM = ' + num(d) + ' và R = ' + num(st.r) + ' nên <b>' + t[1] + '</b>: điểm M <b>' + t[0] + '</b> đường tròn (O; R).</p><p class="en" lang="en">M lies ' + t[2] + ' the circle.</p>';
    }
    body.addEventListener('input', (e) => { if (e.target.dataset && e.target.dataset.k === 'r') { st.r = Number(e.target.value); $('[data-out="r"]', body).textContent = num(st.r); update(); } });
    drag(svg, S, S, (px, py) => { st.x = clamp(Math.round((px - O) / U * 20) / 20, -5.8, 5.8); st.y = clamp(Math.round((O - py) / U * 20) / 20, -5.8, 5.8); update(); });
    svg.addEventListener('keydown', (e) => {
      const d = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] }[e.key];
      if (!d) return;
      e.preventDefault(); e.stopPropagation(); st.x = clamp(st.x + d[0] * 0.25, -5.8, 5.8); st.y = clamp(st.y + d[1] * 0.25, -5.8, 5.8); update(); const h = $('[data-h]', svg); if (h) h.focus({ preventScroll: true });
    });
    update();
  }

  /* ---------- 5. Bảng giá trị của căn bậc hai ---------- */
  function simFnTable(body) {
    const st = { x0: 0, step: 1, x: 2 };
    body.innerHTML = '<div class="sim__cols"><div class="sim__panel">' +
      '<label class="sim__ctl"><span>Nhập số x để tính √x</span><input type="number" step="any" data-x value="' + st.x + '" aria-label="Số x"></label>' +
      slider('x0', 'Bảng bắt đầu từ x', 0, 100, 1, st.x0) +
      '<label class="sim__ctl"><span>Bước nhảy</span><select data-step><option value="1">1</option><option value="2">2</option><option value="5">5</option><option value="10">10</option></select></label></div>' +
      '<div class="sim__panel"><div class="tablewrap"><table class="sim__tbl" data-tbl></table></div></div></div><div class="sim__read" aria-live="polite" data-read></div>';
    const isSq = (v) => Number.isInteger(v) && Number.isInteger(Math.sqrt(v));
    function update() {
      const x = st.x;
      $('[data-read]', body).innerHTML = x < 0
        ? '<p class="vi">x = ' + num(x) + ' là số âm nên <b>không có căn bậc hai</b> (bình phương của mọi số thực đều không âm).</p>'
        : '<p class="vi">√' + num(x) + ' ≈ <b>' + num(Math.sqrt(x), 4) + '</b>. ' + (isSq(x) ? 'Đây là <b>số chính phương</b> nên căn bậc hai là số nguyên.' : 'Không phải số chính phương: nằm giữa ' + Math.floor(Math.sqrt(x)) + ' và ' + (Math.floor(Math.sqrt(x)) + 1) + '.') + ' Kiểm tra: (√' + num(x) + ')² = ' + num(Math.sqrt(x) * Math.sqrt(x), 4) + '.</p><p class="en" lang="en">Perfect squares have whole-number square roots.</p>';
      let rows = '<thead><tr><th scope="col">x</th><th scope="col">√x</th><th scope="col">Chính phương?</th></tr></thead><tbody>';
      for (let i = 0; i < 8; i++) { const v = st.x0 + i * st.step; rows += '<tr' + (isSq(v) ? ' class="is-hit"' : '') + '><td>' + num(v, 0) + '</td><td>' + num(Math.sqrt(v), 3) + '</td><td>' + (isSq(v) ? 'Có' : '') + '</td></tr>'; }
      $('[data-tbl]', body).innerHTML = rows + '</tbody>';
    }
    body.addEventListener('input', (e) => {
      if (e.target.matches('[data-x]')) { st.x = e.target.value === '' ? 0 : Number(e.target.value); update(); }
      else if (e.target.dataset && e.target.dataset.k === 'x0') { st.x0 = Number(e.target.value); $('[data-out="x0"]', body).textContent = st.x0; update(); }
    });
    body.addEventListener('change', (e) => { if (e.target.matches('[data-step]')) { st.step = Number(e.target.value); update(); } });
    update();
  }

  /* ======================================================================
     TIN HỌC 9: bảng tính mô phỏng (COUNTIF, SUMIF)
     ====================================================================== */
  const DATA = {
    countif: {
      cols: ['Họ tên', 'Điểm', 'Xếp loại'], numeric: [1],
      rows: [['Lan', 9, 'Giỏi'], ['Minh', 7, 'Khá'], ['Hà', 8, 'Giỏi'], ['Nam', 5, 'Trung bình'], ['Linh', 10, 'Giỏi'], ['Đức', 6, 'Trung bình'], ['An', 8, 'Giỏi'], ['Bình', 7, 'Khá']],
      formula: '=COUNTIF(B2:B9,">=8")',
      presets: [['Điểm từ 8 trở lên', '=COUNTIF(B2:B9,">=8")'], ['Điểm dưới 6', '=COUNTIF(B2:B9,"<6")'], ['Xếp loại Giỏi', '=COUNTIF(C2:C9,"Giỏi")'], ['Không phải Khá', '=COUNTIF(C2:C9,"<>Khá")'], ['Điểm đúng bằng ô B2', '=COUNTIF(B2:B9,B2)']]
    },
    sumif: {
      cols: ['Khoản chi', 'Số tiền (nghìn đồng)'], numeric: [1],
      rows: [['Ăn uống', 600], ['Học tập', 250], ['Giải trí', 150], ['Ăn uống', 420], ['Đi lại', 180], ['Học tập', 300], ['Giải trí', 90], ['Ăn uống', 510]],
      formula: '=SUMIF(A2:A9,"Ăn uống",B2:B9)',
      presets: [['Tổng tiền ăn uống', '=SUMIF(A2:A9,"Ăn uống",B2:B9)'], ['Tổng tiền học tập', '=SUMIF(A2:A9,"Học tập",B2:B9)'], ['Các khoản trên 300', '=SUMIF(B2:B9,">300")'], ['Các khoản không phải giải trí', '=SUMIF(A2:A9,"<>Giải trí",B2:B9)'], ['Khoản bắt đầu bằng chữ Đ', '=SUMIF(A2:A9,"Đ*",B2:B9)']]
    }
  };
  const colName = (i) => String.fromCharCode(65 + i);
  const parseNum = (v) => { const s = String(v == null ? '' : v).trim(); return /^-?\d+([.,]\d+)?$/.test(s) ? Number(s.replace(',', '.')) : null; };
  const refRe = /^\$?([A-Za-z])\$?(\d{1,3})$/;
  function parseRange(s) {
    const m = String(s).trim().split(':');
    const one = (t) => { const r = refRe.exec(t.trim()); return r ? { c: r[1].toUpperCase().charCodeAt(0) - 65, r: Number(r[2]) } : null; };
    const a = one(m[0]), b = m.length === 2 ? one(m[1]) : a;
    if (!a || !b || m.length > 2) return null;
    return { c1: Math.min(a.c, b.c), c2: Math.max(a.c, b.c), r1: Math.min(a.r, b.r), r2: Math.max(a.r, b.r) };
  }
  const rangeText = (g) => colName(g.c1) + g.r1 + ':' + colName(g.c2) + g.r2;
  /* Tách đối số theo dấu , hoặc ; nằm ngoài dấu ngoặc kép. */
  function splitArgs(s) {
    const out = []; let cur = '', q = false;
    for (let i = 0; i < s.length; i++) {
      const ch = s.charAt(i);
      if (ch === '"') q = !q;
      if (!q && (ch === ',' || ch === ';')) { out.push(cur); cur = ''; } else cur += ch;
    }
    if (q) return null;
    out.push(cur); return out.map((x) => x.trim());
  }
  function wildcard(pat, text) {
    const re = new RegExp('^' + pat.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$', 'i');
    return re.test(text);
  }
  function makeTest(raw) {
    const m = /^(>=|<=|<>|=|>|<)?([\s\S]*)$/.exec(String(raw).trim());
    const op = m[1] || '=', operand = m[2].trim(), n = parseNum(operand);
    const words = { '>=': 'lớn hơn hoặc bằng', '<=': 'nhỏ hơn hoặc bằng', '<>': 'khác', '=': 'bằng', '>': 'lớn hơn', '<': 'nhỏ hơn' }[op];
    const test = (v) => {
      const vn = parseNum(v);
      if (n !== null) {
        if (vn === null) return op === '<>';
        return op === '=' ? vn === n : op === '<>' ? vn !== n : op === '>' ? vn > n : op === '<' ? vn < n : op === '>=' ? vn >= n : vn <= n;
      }
      const eq = wildcard(operand, String(v == null ? '' : v));
      return op === '=' ? eq : op === '<>' ? !eq : false;
    };
    return { test: test, text: words + (n !== null ? ' ' + num(n, 4) : ' “' + operand + '”'), textOnlyOp: n === null && op !== '=' && op !== '<>' };
  }

  /* Tính một công thức COUNTIF/SUMIF trên bảng cells (mảng dòng; dòng 1 là tiêu đề). */
  function evaluate(src, cells, ncols) {
    const f = String(src).trim();
    const m = /^=\s*(COUNTIF|SUMIF)\s*\(([\s\S]*)\)\s*$/i.exec(f);
    if (!/^=/.test(f)) return { err: 'Công thức phải bắt đầu bằng dấu =, ví dụ =COUNTIF(B2:B9,">=8").' };
    if (!m) return { err: 'Mô phỏng này hiểu hàm COUNTIF và SUMIF. Kiểm tra tên hàm và dấu ngoặc.' };
    const fn = m[1].toUpperCase(), args = splitArgs(m[2]);
    if (!args) return { err: 'Thiếu dấu ngoặc kép đóng. Điều kiện chữ phải đặt trong “ ”.' };
    const need = fn === 'COUNTIF' ? [2, 2] : [2, 3];
    if (args.length < need[0] || args.length > need[1]) return { err: fn + ' cần ' + (fn === 'COUNTIF' ? '2' : '2 hoặc 3') + ' đối số, bạn đang nhập ' + args.length + '. Các đối số cách nhau bằng dấu phẩy.' };
    const rg = parseRange(args[0]);
    if (!rg) return { err: 'Vùng điều kiện “' + args[0] + '” chưa đúng. Viết dạng B2:B9.' };
    const inGrid = (g) => g.r1 >= 1 && g.r2 <= cells.length && g.c2 < ncols;
    if (!inGrid(rg)) return { err: 'Vùng ' + rangeText(rg) + ' nằm ngoài bảng dữ liệu (cột A–' + colName(ncols - 1) + ', dòng 1–' + cells.length + ').' };
    const val = (r, c) => (cells[r - 1] ? cells[r - 1][c] : '');
    let crit = args[1];
    if (/^"[\s\S]*"$/.test(crit)) crit = crit.slice(1, -1);
    else if (refRe.test(crit)) { const rr = refRe.exec(crit); const c = rr[1].toUpperCase().charCodeAt(0) - 65, r = Number(rr[2]); if (r < 1 || r > cells.length || c >= ncols) return { err: 'Ô ' + crit + ' nằm ngoài bảng.' }; crit = String(val(r, c)); }
    else if (parseNum(crit) === null) return { err: 'Điều kiện chữ phải đặt trong dấu ngoặc kép, ví dụ "Giỏi".' };
    const t = makeTest(crit);
    let sg = null;
    if (fn === 'SUMIF') {
      sg = args[2] ? parseRange(args[2]) : rg;
      if (!sg) return { err: 'Vùng tính tổng “' + args[2] + '” chưa đúng.' };
      sg = { c1: sg.c1, r1: sg.r1, c2: sg.c1 + (rg.c2 - rg.c1), r2: sg.r1 + (rg.r2 - rg.r1) };
      if (!inGrid(sg)) return { err: 'Vùng tính tổng ' + rangeText(sg) + ' nằm ngoài bảng dữ liệu.' };
    }
    const hit = [], sum = [];
    let count = 0, total = 0, cellsN = 0;
    for (let r = rg.r1; r <= rg.r2; r++) for (let c = rg.c1; c <= rg.c2; c++) {
      cellsN++;
      if (!t.test(val(r, c))) continue;
      count++; hit.push(colName(c) + r);
      if (sg) { const rr = sg.r1 + (r - rg.r1), cc = sg.c1 + (c - rg.c1), sv = parseNum(val(rr, cc)); sum.push(colName(cc) + rr); if (sv !== null) total += sv; }
    }
    return { fn: fn, rg: rg, sg: sg, hit: hit, sum: sum, value: fn === 'COUNTIF' ? count : total, count: count, cellsN: cellsN, cond: t, textOnlyOp: t.textOnlyOp };
  }

  function simSheet(body, cfg) {
    const data = DATA[cfg.kind] || DATA.countif, ncols = data.cols.length;
    const fresh = () => [data.cols.slice()].concat(data.rows.map((r) => r.map((v) => String(v))));
    let cells = fresh();
    const table = () => {
      let h = '<thead><tr><th class="sheet__corner"></th>' + data.cols.map((_, i) => '<th scope="col">' + colName(i) + '</th>').join('') + '</tr></thead><tbody>';
      cells.forEach((row, r) => {
        h += '<tr><th scope="row">' + (r + 1) + '</th>' + row.map((v, c) => r === 0
          ? '<td class="sheet__head" data-cell="' + colName(c) + (r + 1) + '">' + esc(v) + '</td>'
          : '<td data-cell="' + colName(c) + (r + 1) + '"><input class="sheet__in' + (data.numeric.indexOf(c) >= 0 ? ' is-num' : '') + '" data-r="' + r + '" data-c="' + c + '" value="' + esc(v) + '" aria-label="Ô ' + colName(c) + (r + 1) + '"></td>').join('') + '</tr>';
      });
      return h + '</tbody>';
    };
    body.innerHTML = '<div class="sheet__fx"><label class="sheet__fxl"><span class="sheet__fxi" aria-hidden="true">fx</span><input type="text" class="sheet__formula" data-f value="' + esc(data.formula) + '" spellcheck="false" autocomplete="off" aria-label="Công thức"></label></div>' +
      '<div class="sim__btns"><span>Thử nhanh:</span>' + data.presets.map((p, i) => '<button type="button" class="btn btn--ghost btn--sm" data-p="' + i + '">' + esc(p[0]) + '</button>').join('') + '<button type="button" class="btn btn--ghost btn--sm" data-reset>Đặt lại dữ liệu</button></div>' +
      '<div class="sim__cols sim__cols--sheet"><div class="tablewrap"><table class="sheet" data-sheet>' + table() + '</table></div>' +
      '<div class="sheet__res" aria-live="polite" data-res></div></div>';
    const fIn = $('[data-f]', body), tb = $('[data-sheet]', body), res = $('[data-res]', body);

    function run() {
      $$('td', tb).forEach((td) => td.classList.remove('is-hit', 'is-sum', 'is-range'));
      const r = evaluate(fIn.value, cells, ncols);
      fIn.classList.toggle('is-bad', !!r.err);
      if (r.err) { res.innerHTML = '<p class="sim__warn" role="alert">' + esc(r.err) + '</p>'; return; }
      const cell = (a) => $('[data-cell="' + a + '"]', tb);
      for (let rr = r.rg.r1; rr <= r.rg.r2; rr++) for (let c = r.rg.c1; c <= r.rg.c2; c++) { const el = cell(colName(c) + rr); if (el) el.classList.add('is-range'); }
      r.hit.forEach((a) => { const el = cell(a); if (el) el.classList.add('is-hit'); });
      r.sum.forEach((a) => { const el = cell(a); if (el) el.classList.add('is-sum'); });
      const sumVals = r.sum.map((a) => num(parseNum(cells[Number(a.slice(1)) - 1][a.charCodeAt(0) - 65]) || 0, 4));
      res.innerHTML = '<p class="sheet__val"><span>Kết quả</span><b>' + num(r.value, 4) + '</b></p>' +
        '<ol class="sheet__steps"><li>Vùng điều kiện <b>' + rangeText(r.rg) + '</b> gồm ' + r.cellsN + ' ô.</li>' +
        '<li>Điều kiện: ô có giá trị <b>' + esc(r.cond.text) + '</b>.</li>' +
        '<li>Có <b>' + r.count + '</b> ô thoả' + (r.hit.length ? ': ' + r.hit.join(', ') + ' (tô vàng).' : '.') + '</li>' +
        (r.fn === 'SUMIF' ? '<li>Cộng các ô tương ứng ở <b>' + rangeText(r.sg) + '</b> (tô xanh)' + (sumVals.length ? ': ' + sumVals.join(' + ') + ' = <b>' + num(r.value, 4) + '</b>.' : ': chưa có ô nào để cộng, kết quả bằng 0.') + '</li>' : '') + '</ol>' +
        (r.textOnlyOp ? '<p class="sim__warn">Dấu so sánh &lt; &gt; chỉ so sánh số. Với chữ, hãy dùng = hoặc &lt;&gt;.</p>' : '') +
        '<p class="en" lang="en">' + (r.fn === 'COUNTIF' ? 'COUNTIF counts the cells in the range that meet the condition.' : 'SUMIF adds the cells in the sum range whose matching cell meets the condition.') + '</p>';
    }
    fIn.addEventListener('input', run);
    tb.addEventListener('input', (e) => { const t = e.target; if (t.matches('.sheet__in')) { cells[Number(t.dataset.r)][Number(t.dataset.c)] = t.value; run(); } });
    body.addEventListener('click', (e) => {
      const p = e.target.closest('[data-p]');
      if (p) { fIn.value = data.presets[Number(p.dataset.p)][1]; run(); return; }
      if (e.target.closest('[data-reset]')) { cells = fresh(); tb.innerHTML = table(); fIn.value = data.formula; run(); }
    });
    run();
  }

  /* ---------- Khoa học tự nhiên 9: động năng, thế năng, cơ năng (g = 10) ---------- */
  const G = 10;
  const bars = (items, W, H, top) => {
    /* items: [{label, val, cls}] vẽ cột theo thang chung 0..top */
    const bw = 56, gap = (W - items.length * bw) / (items.length + 1);
    let o = '<line class="sim__g sim__g--axis" x1="10" y1="' + (H - 28) + '" x2="' + (W - 10) + '" y2="' + (H - 28) + '"/>';
    items.forEach((it, i) => {
      const x = gap + i * (bw + gap), h = Math.max(0, it.val / top * (H - 70));
      o += '<rect class="sim__bar sim__bar--' + it.cls + '" x="' + x + '" y="' + (H - 28 - h) + '" width="' + bw + '" height="' + h + '" rx="4"/>' +
        '<text class="sim__lab" x="' + (x + bw / 2) + '" y="' + (H - 32 - h) + '" text-anchor="middle">' + num(it.val, 1) + ' J</text>' +
        '<text class="sim__side" x="' + (x + bw / 2) + '" y="' + (H - 10) + '" text-anchor="middle">' + it.label + '</text>';
    });
    return o;
  };

  function simEnergy(body) {
    const W = 380, H = 270, st = { m: 2, v: 5, h: 3 };
    body.innerHTML = '<div class="sim__cols"><div class="sim__panel">' + slider('m', 'Khối lượng m (kg)', 0.1, 10, 0.1, st.m) + slider('v', 'Tốc độ v (m/s)', 0, 20, 0.5, st.v) + slider('h', 'Độ cao h (m)', 0, 20, 0.5, st.h) +
      '<div class="tablewrap"><table class="sim__tbl sim__tbl--l" data-tbl></table></div></div>' +
      '<div class="sim__panel"><svg class="sim__svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Cột động năng, thế năng và cơ năng" data-svg></svg></div></div>' +
      '<div class="sim__read" data-read></div>';
    function update() {
      const P = G * st.m, wd = 0.5 * st.m * st.v * st.v, wt = P * st.h, wc = wd + wt, top = Math.max(wc, 1);
      $('[data-svg]', body).innerHTML = bars([{ label: 'Wđ', val: wd, cls: 'k' }, { label: 'Wt', val: wt, cls: 'p' }, { label: 'W = Wđ + Wt', val: wc, cls: 'm' }], W, H, top);
      $('[data-tbl]', body).innerHTML = '<tbody><tr><th scope="row">Trọng lượng P = 10m</th><td>' + num(P, 1) + ' N</td></tr>' +
        '<tr><th scope="row">Động năng Wđ = ½mv²</th><td>' + num(wd, 2) + ' J</td></tr>' +
        '<tr><th scope="row">Thế năng Wt = P·h</th><td>' + num(wt, 2) + ' J</td></tr>' +
        '<tr><th scope="row">Cơ năng W = Wđ + Wt</th><td>' + num(wc, 2) + ' J</td></tr></tbody>';
      $('[data-read]', body).innerHTML = '<p class="vi">Gấp đôi tốc độ thì động năng tăng 4 lần; gấp đôi độ cao thì thế năng tăng 2 lần. Hãy thử để kiểm tra.</p>' +
        '<p class="en" lang="en">Doubling the speed makes the kinetic energy 4 times larger; doubling the height doubles the potential energy. Try it and see.</p>';
    }
    body.addEventListener('input', (e) => {
      const k = e.target.dataset && e.target.dataset.k;
      if (!k || !(k in st)) return;
      st[k] = Number(e.target.value); $('[data-out="' + k + '"]', body).textContent = num(st[k]); update();
    });
    update();
  }

  function simFall(body) {
    const W = 380, H = 270, st = { m: 1.5, h0: 4, h: 4 };
    body.innerHTML = '<div class="sim__cols"><div class="sim__panel">' + slider('m', 'Khối lượng m (kg)', 0.5, 5, 0.5, st.m) + slider('h0', 'Độ cao thả h₀ (m)', 1, 10, 0.5, st.h0) + slider('h', 'Độ cao hiện tại h (m)', 0, 10, 0.5, st.h) +
      '<div class="tablewrap"><table class="sim__tbl sim__tbl--l" data-tbl></table></div></div>' +
      '<div class="sim__panel"><svg class="sim__svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Cột thế năng, động năng và cơ năng của vật rơi" data-svg></svg></div></div>' +
      '<div class="sim__read" data-read></div>';
    function update() {
      st.h = Math.min(st.h, st.h0);
      const hs = $('[data-k="h"]', body); hs.max = st.h0; hs.value = st.h; $('[data-out="h"]', body).textContent = num(st.h);
      const P = G * st.m, wc = P * st.h0, wt = P * st.h, wd = wc - wt, v = Math.sqrt(2 * wd / st.m);
      $('[data-svg]', body).innerHTML = bars([{ label: 'Wt', val: wt, cls: 'p' }, { label: 'Wđ', val: wd, cls: 'k' }, { label: 'W (không đổi)', val: wc, cls: 'm' }], W, H, Math.max(wc, 1));
      $('[data-tbl]', body).innerHTML = '<tbody><tr><th scope="row">Thế năng Wt = P·h</th><td>' + num(wt, 2) + ' J</td></tr>' +
        '<tr><th scope="row">Động năng Wđ = W − Wt</th><td>' + num(wd, 2) + ' J</td></tr>' +
        '<tr><th scope="row">Cơ năng W = P·h₀</th><td>' + num(wc, 2) + ' J</td></tr>' +
        '<tr><th scope="row">Tốc độ v = √(2Wđ/m)</th><td>' + num(v, 2) + ' m/s</td></tr></tbody>';
      $('[data-read]', body).innerHTML = '<p class="vi">Kéo h từ h₀ về 0: Wt giảm bao nhiêu thì Wđ tăng bấy nhiêu, còn W giữ nguyên. Khi h = 0, v = √(2·g·h₀).</p>' +
        '<p class="en" lang="en">Slide h from h₀ down to 0: the potential energy lost equals the kinetic energy gained, and W stays the same. At h = 0, v = √(2·g·h₀).</p>';
    }
    body.addEventListener('input', (e) => {
      const k = e.target.dataset && e.target.dataset.k;
      if (!k || !(k in st)) return;
      st[k] = Number(e.target.value); $('[data-out="' + k + '"]', body).textContent = num(st[k]); update();
    });
    update();
  }

  /* ======================================================================
     ĐĂNG KÝ, VỊ TRÍ CHÈN VÀ LỐI VÀO CHO app.js
     ====================================================================== */
  const SIMS = {
    linear: { fn: simLinear, vi: 'Thử ax + by = c', en: 'Explore the line ax + by = c', intro: 'Kéo các thanh trượt a, b, c và quan sát đường thẳng thay đổi.' },
    system: { fn: (b) => simLinear(b, { mode: 'system' }), vi: 'Thử hệ hai phương trình', en: 'Explore a system of two equations', intro: 'Thay đổi hệ số của hai phương trình, xem hai đường thẳng cắt nhau, song song hay trùng nhau.' },
    numline: { fn: simNumline, vi: 'Bất phương trình trên trục số', en: 'An inequality on the number line', intro: 'Đổi hệ số và dấu, quan sát tập nghiệm, rồi kéo chấm cam để thử một giá trị.' },
    trig: { fn: simTrig, vi: 'Tỉ số lượng giác của góc nhọn', en: 'Trigonometric ratios of an acute angle', intro: 'Đổi góc α và xem sin, cos, tan, cot thay đổi thế nào.' },
    circle: { fn: simCircle, vi: 'Điểm và đường tròn', en: 'A point and a circle', intro: 'Kéo điểm M và so sánh OM với bán kính R.' },
    fntable: { fn: simFnTable, vi: 'Bảng giá trị căn bậc hai', en: 'A table of square roots', intro: 'Nhập một số, hoặc đổi điểm bắt đầu của bảng để tìm các số chính phương.' },
    countif: { fn: (b) => simSheet(b, { kind: 'countif' }), vi: 'Thử hàm COUNTIF', en: 'Try the COUNTIF function', intro: 'Sửa công thức hoặc dữ liệu trong bảng, kết quả thay đổi ngay. Ô thoả điều kiện được tô vàng.' },
    energy: { fn: simEnergy, vi: 'Động năng, thế năng, cơ năng', en: 'Kinetic, potential and mechanical energy', intro: 'Đổi khối lượng m, tốc độ v và độ cao h (g = 10) rồi xem Wđ, Wt và W thay đổi thế nào.' },
    fall: { fn: simFall, vi: 'Cơ năng của vật rơi', en: 'Mechanical energy of a falling object', intro: 'Thả vật từ độ cao h₀ rồi kéo thanh h để xem cơ năng không đổi.' },
    sumif: { fn: (b) => simSheet(b, { kind: 'sumif' }), vi: 'Thử hàm SUMIF', en: 'Try the SUMIF function', intro: 'Sửa điều kiện, vùng điều kiện hoặc vùng tính tổng và xem tổng thay đổi.' }
  };

  Object.assign(SIMS, window.LabSims || {}, window.WorkSims || {});

  /* Chèn sau khối thứ `nth` (mặc định 1) có loại `after` của trang `page` (không có thì chèn cuối trang). */
  const PLACE = [
    { lesson: 'toan9-bai1', page: 5, after: 'activity', id: 'linear' },
    { lesson: 'toan9-bai2', page: 11, after: 'activity', id: 'system' },
    { lesson: 'toan9-bai6', page: 39, after: 'key', id: 'numline' },
    { lesson: 'toan9-bai7', page: 45, after: 'key', id: 'fntable' },
    { lesson: 'toan9-bai11', page: 68, after: 'key', id: 'trig' },
    { lesson: 'toan9-bai13', page: 85, after: 'key', id: 'circle' },
    { lesson: 'tin9-bai10a', page: 44, after: 'fig', id: 'countif' },
    { lesson: 'tin9-bai11a', page: 46, after: 'tip', id: 'sumif' },
    { lesson: 'khtn9-bai2', page: 17, after: 'key', id: 'energy' },
    { lesson: 'khtn9-bai3', page: 19, after: 'ex', id: 'fall' },
    { lesson: 'khtn9-bai4', page: 22, after: 'fig', id: 'work-force' },
    { lesson: 'khtn9-bai4', page: 23, after: 'key', id: 'work-forklift' },
    { lesson: 'khtn9-bai5', page: 25, after: 'fig', id: 'olab-coin' },
    { lesson: 'khtn9-bai5', page: 26, after: 'key', id: 'olab-arrows' },
    { lesson: 'khtn9-bai5', page: 26, after: 'activity', id: 'olab-halfdisk' },
    { lesson: 'khtn9-bai5', page: 27, after: 'fig', id: 'olab-pins' },
    { lesson: 'khtn9-bai5', page: 28, after: 'fig', id: 'olab-media' },
    { lesson: 'khtn9-bai5', page: 29, after: 'ex', id: 'olab-task5' },
    { lesson: 'khtn9-bai6', page: 30, after: 'fig', id: 'olab-tir' },
    { lesson: 'khtn9-bai6', page: 32, after: 'ex', id: 'olab-water' },
    { lesson: 'khtn9-bai6', page: 33, after: 'ask', id: 'olab-mirage' },
    { lesson: 'khtn9-bai6', page: 33, after: 'fig', nth: 2, id: 'olab-fiber' }
  ];
  function inject() {
    PLACE.forEach((p) => {
      const L = D.lessons && D.lessons[p.lesson];
      const page = L && L.pages.find((x) => x.number === p.page);
      if (!page || page.blocks.some((b) => b.t === 'sim' && b.id === p.id)) return;
      let i = -1, seen = 0;
      page.blocks.forEach((b, k) => { if (b.t === p.after && ++seen === (p.nth || 1)) i = k; });
      page.blocks.splice(i < 0 ? page.blocks.length : i + 1, 0, { t: 'sim', id: p.id });
    });
  }
  inject();

  window.Interactive = {
    sims: SIMS,
    placeholder(b) {
      const s = SIMS[b.id];
      if (!s) return '';
      return '<section class="sim" data-sim="' + esc(b.id) + '" aria-label="' + esc(s.vi) + '"><header class="sim__head"><span class="sim__tag" aria-hidden="true">Thử ngay</span>' +
        '<h3 class="sim__h">' + pair(esc(s.vi), esc(s.en)) + '</h3></header><p class="sim__intro">' + esc(s.intro) + '</p><div class="sim__body" data-sim-body></div></section>';
    },
    /* Dựng các mô phỏng trong vùng root (gọi sau mỗi lần vẽ trang). */
    mount(root) {
      $$('[data-sim]:not([data-ready])', root).forEach((el) => {
        el.setAttribute('data-ready', '');
        try { SIMS[el.dataset.sim].fn($('[data-sim-body]', el), {}); } catch (e) { el.querySelector('[data-sim-body]').textContent = 'Không dựng được mô phỏng này.'; }
      });
    }
  };
})();
