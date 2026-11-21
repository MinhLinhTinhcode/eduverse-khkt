/* ==========================================================================
   SÁCH GIÁO KHOA SONG NGỮ TƯƠNG TÁC — logic chính
   --------------------------------------------------------------------------
   Các phần trong file này:
     1. Tiện ích & lưu cài đặt
     2. Định dạng văn bản song ngữ + đánh dấu từ vựng
     3. Hiển thị từng loại khối trong trang sách
     4. Trình đọc (2 trang mở, lật trang, thanh công cụ)
     5. Popup từ vựng
     6. Phát âm (Web Speech API)
     7. Tiện ích tương tác: thử nghiệm bit, câu hỏi luyện tập
     8. Màn hình chọn lớp, danh sách bài
     9. Điều hướng (router theo #hash) và sự kiện chung
   ========================================================================== */
(function () {
  'use strict';

  const D = window.TEXTBOOK;
  const ICON = window.ICONS;
  const ART = D.art;
  const GLOSS = D.glossary;

  /* ======================================================================
     1. TIỆN ÍCH & LƯU CÀI ĐẶT
     ====================================================================== */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const $app = $('#app');

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* localStorage có thể bị chặn (chế độ riêng tư…) nên luôn bọc try/catch. */
  const store = {
    get(key, fallback) {
      try {
        const v = window.localStorage.getItem('sgk.' + key);
        return v === null ? fallback : JSON.parse(v);
      } catch (e) { return fallback; }
    },
    set(key, value) {
      try { window.localStorage.setItem('sgk.' + key, JSON.stringify(value)); } catch (e) { /* bỏ qua */ }
    }
  };

  const SCALES = [0.9, 1, 1.1, 1.2, 1.3];
  const state = {
    showEn: store.get('showEn', true),
    scale: SCALES.indexOf(store.get('scale', 1)) >= 0 ? store.get('scale', 1) : 1,
    accent: store.get('accent', 'en-GB') === 'en-US' ? 'en-US' : 'en-GB',
    hintSeen: store.get('hintSeen', false),
    quiz: {},        // đáp án đã chọn trong phiên (mất khi tải lại trang)
    reader: null     // thông tin bài đang đọc
  };

  let toastTimer = null;
  function toast(message) {
    const box = $('#toast');
    if (!box) return;
    box.textContent = message;
    box.classList.add('is-show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => box.classList.remove('is-show'), 3600);
  }

  /* ======================================================================
     2. ĐỊNH DẠNG VĂN BẢN SONG NGỮ
     ====================================================================== */
  const bold = (s) => esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[\[(.+?)\]\]/g, '<kbd class="key">$1</kbd>');
  const VOCAB_MARK = /\{([^{}|]+?)(?:\|([^{}]+?))?\}/g;
  const keyOf = (shown, key) => (key || shown).trim().toLowerCase().replace(/\s+/g, '-');

  /* ---- Công thức toán: viết trong $...$ theo cú pháp LaTeX rút gọn ----------
     Hỗ trợ: \frac{a}{b}, x_0, x^2, \begin{cases} ... \\ ... \end{cases},
     \mathbb{R}, \neq, \in, \cdot, \Delta, \le, \ge, \to, \text{...}.
     Các đoạn $...$ được tách ra trước, nên dấu { } của LaTeX không bị nhầm
     với dấu {từ|khoá} của từ vựng. */
  const SYMBOLS = { cdot: '·', neq: '≠', ne: '≠', in: '∈', Delta: 'Δ', le: '≤', leq: '≤', ge: '≥', geq: '≥', to: '→', rightarrow: '→', Rightarrow: '⇒', times: '×', approx: '≈', pm: '±', quad: ' ', ',': ' ', ';': ' ', ' ': ' ', '%': '%' };
  const BB = { R: 'ℝ', N: 'ℕ', Z: 'ℤ', Q: 'ℚ' };
  function tex(src) {
    const cases = (body) =>
      '<span class="sys"><span class="sys__brace" aria-hidden="true"></span><span class="sys__rows">' +
      body.split('\\\\').map((r) => '<span class="sys__row">' + tex(r) + '</span>').join('') + '</span></span>';
    let i = 0;
    let prev = '';
    const s = String(src);
    const group = () => {
      if (s[i] !== '{') return s[i++] || '';
      let d = 0, j = i;
      do { if (s[j] === '{') d++; else if (s[j] === '}') d--; j++; } while (d > 0 && j < s.length);
      const inner = s.slice(i + 1, j - 1);
      i = j;
      return inner;
    };
    let out = '';
    while (i < s.length) {
      const c = s[i];
      if (c === '\\') {
        const m = /^\\([A-Za-z]+|.)/.exec(s.slice(i));
        const name = m[1];
        i += m[0].length;
        if (name === 'frac') { const a = group(); const b = group(); out += '<span class="frac"><span class="frac__n">' + tex(a) + '</span><span class="frac__d">' + tex(b) + '</span></span>'; }
        else if (name === 'begin') {
          const env = group();
          const end = '\\end{' + env + '}';
          const k = s.indexOf(end, i);
          const body = s.slice(i, k < 0 ? s.length : k);
          i = k < 0 ? s.length : k + end.length;
          out += env === 'cases' ? cases(body) : esc(body);
        }
        else if (name === 'sqrt') {
          let idx = '';
          if (s[i] === '[') { const k = s.indexOf(']', i); idx = s.slice(i + 1, k < 0 ? s.length : k); i = k < 0 ? s.length : k + 1; }
          const g = group();
          out += '<span class="sqrt' + (idx ? ' sqrt--n' : '') + '">' + (idx ? '<sup class="sqrt__i">' + esc(idx) + '</sup>' : '') + '<span class="sqrt__s">√</span><span class="sqrt__r">' + tex(g) + '</span></span>';
        }
        else if (name === 'alpha' || name === 'beta' || name === 'gamma' || name === 'pi') out += '<i>' + ({ alpha: 'α', beta: 'β', gamma: 'γ', pi: 'π' })[name] + '</i>';
        else if (name === 'triangle') out += '<span class="rm">△</span>';
        else if (name === 'sin' || name === 'cos' || name === 'tan' || name === 'cot') out += '<span class="fn">' + name + '</span>';
        else if (name === 'text') out += '<span class="rm">' + esc(group()) + '</span>';
        else if (name === 'mathbb') { const g = group(); out += '<span class="bb">' + (BB[g] || esc(g)) + '</span>'; }
        else if (name === 'left' || name === 'right') { /* bỏ qua, giữ nguyên dấu ngoặc theo sau */ }
        else if (SYMBOLS[name] !== undefined) { const sp = '\u2003\u2009\u2005 '.indexOf(SYMBOLS[name]) >= 0 || name === '%'; out += '<span class="' + (sp ? 'sp' : 'op') + '">' + SYMBOLS[name] + '</span>'; prev = sp ? prev : ''; continue; }
        prev = 'x';
      } else if (c === '_' || c === '^') {
        i++;
        const g = group();
        out += (c === '_' ? '<sub>' : '<sup>') + tex(g) + (c === '_' ? '</sub>' : '</sup>');
        prev = 'x';
      } else if (c === '{') { out += tex(group()); prev = 'x'; }
      else if (/[A-Za-z]/.test(c)) { out += '<i>' + c + '</i>'; i++; prev = 'x'; }
      else if (c === ' ') { i++; }
      else if (c === '-' || c === '+' || c === '=' || c === '<' || c === '>') {
        const unary = prev === '' || prev === '(' || prev === '[' || prev === ';' || prev === ',' || prev === 'o';
        const sym = c === '-' ? '−' : esc(c);
        out += unary && (c === '-' || c === '+') ? sym : '<span class="op">' + sym + '</span>';
        prev = 'o'; i++;
      }
      else { out += esc(c); prev = c; i++; }
    }
    return out;
  }
  const MATH = /\$([^$]+)\$/g;
  function withMath(s, fn) {
    const saved = [];
    /* \$ = dấu đô la thật (địa chỉ tuyệt đối trong bảng tính, ví dụ \$B\$3), không mở công thức. */
    const t = String(s).replace(/\\\$/g, '\u0003').replace(MATH, (m, x) => { saved.push(x); return '\u0001' + (saved.length - 1) + '\u0002'; });
    return fn(t).replace(/\u0001(\d+)\u0002/g, (m, n) => '<span class="m">' + tex(saved[n]) + '</span>').replace(/\u0003/g, '$');
  }

  /* Văn bản tiếng Việt: in đậm / nghiêng + công thức. */
  const vi = (s) => withMath(s, bold);

  /* Văn bản tiếng Anh: như trên + biến {từ|khoá} thành từ gạch chân bấm được. */
  const en = (s) =>
    withMath(s, (t) => bold(t).replace(VOCAB_MARK, (m, shown, key) => {
      const k = keyOf(shown, key);
      if (!GLOSS[k]) {
        if (window.console) console.warn('[Sách song ngữ] Chưa có từ "' + k + '" trong glossary.js');
        return shown;
      }
      return vocabSpan(k, shown);
    }));

  function vocabSpan(key, shown) {
    return '<span class="vocab" role="button" tabindex="0" aria-haspopup="dialog" aria-expanded="false" data-key="' +
      esc(key) + '">' + shown + '</span>';
  }

  /* Cặp "Việt ở trên – Anh ở dưới". */
  const pair = (v, e, cls) =>
    '<div class="bi' + (cls ? ' ' + cls : '') + '"><p class="vi">' + vi(v) + '</p><p class="en" lang="en">' + en(e) + '</p></div>';
  /* Tiêu đề viết HOA: giữ nguyên chữ thường cho công thức dạng y = ax² (a ≠ 0) */
  const nc = (h) => h.replace(/(\b[xy]\s*=\s*\S+(?:\s*\([^)]*\))?)/g, '<span class="nc">$1</span>');
  const spans = (v, e) => '<span class="vi">' + vi(v) + '</span><span class="en" lang="en">' + en(e) + '</span>';
  const tag = (icon, t) =>
    '<h3 class="box__tag">' + ICON[icon] + '<span class="vi">' + esc(t.vi) + '</span><span class="en" lang="en">' + esc(t.en) + '</span></h3>';
  const art = (name) => (ART[name] ? ART[name]() : '');
  const mas = (k) => '<span class="mascot mascot--' + k + '" aria-hidden="true">' + ((window.MASCOTS || {})[k] || '') + '</span>';
  const figCap = (no, v, e) =>
    '<figcaption><span class="vi">' + (no ? 'Hình ' + esc(no) + '. ' : '') + vi(v) + '</span><span class="en" lang="en">' + (no ? 'Figure ' + esc(no) + '. ' : '') + en(e) + '</span></figcaption>';

  /* ======================================================================
     3. HIỂN THỊ TỪNG LOẠI KHỐI TRONG TRANG SÁCH
     ====================================================================== */
  const R = {
    p: (b) => {
      const body = pair(b.vi, b.en, b.indent ? 'bi--indent' : '');
      return b.badge ? '<div class="withbadge">' + mas(b.badge) + body + '</div>' : body;
    },

    /* Dải tiêu đề: tên chủ đề (xanh dương) + dải sọc xanh lá có nhãn "BÀI n" */
    banner: (b, ctx) => {
      const L = ctx.lesson;
      return '<header class="banner">' +
        '<div class="banner__topic"><span class="banner__lab vi">' + esc(L.topic.label || 'Chủ đề') + '</span>' +
        '<div class="banner__band"><p class="banner__row"><b class="banner__no">' + esc(L.topic.number) + '.</b>' +
        '<span class="banner__tt vi">' + nc(esc(L.topic.vi)) + '</span></p>' +
        '<p class="banner__sub en" lang="en">' + esc(L.topic.labelEn || 'Topic') + ' ' + esc(L.topic.number) + '. ' + esc(L.topic.en) + '</p></div></div>' +
        '<div class="banner__lesson"><div class="banner__ribbon" role="img" aria-label="Bài ' + esc(L.number) + '"><span aria-hidden="true">Bài</span><b aria-hidden="true">' + esc(L.number) + '</b></div>' +
        '<div class="banner__text"><h1 class="banner__title vi">' + nc(esc(L.title.vi)) + '</h1><p class="banner__en en" lang="en">' + esc(L.title.en) + '</p></div></div></header>';
    },

    /* Hộp mục tiêu màu hồng */
    goals: (b) =>
      '<section class="goals"><p class="goals__lead">' + spans(b.lead.vi, b.lead.en) + '</p><ul class="goals__list">' +
      b.items.map((it) => '<li class="bi"><span class="vi">' + vi(it.vi) + '</span><span class="en" lang="en">' + en(it.en) + '</span></li>').join('') + '</ul></section>',

    /* Hội thoại An – Khoa */
    talk: (b) =>
      '<section class="talk">' + mas('fire') + '<ul class="talk__list">' + b.lines.map((l) =>
        '<li><b class="talk__who">' + esc(l.who) + ':</b>' + pair(l.vi, l.en) + '</li>').join('') + '</ul></section>',

    h2: (b) =>
      '<h2 class="sec"><span class="sec__n" aria-hidden="true">' + esc(b.n) + '.</span>' +
      '<span class="sec__t"><span class="sr-only">Mục ' + esc(b.n) + '. </span>' + nc(spans(b.vi, b.en)) + '</span></h2>',

    h3: (b) => '<h3 class="sub">' + spans(b.vi, b.en) + '</h3>',

    /* Tiêu đề lớn có linh vật: Luyện tập, Vận dụng… */
    head: (b) =>
      '<h2 class="hd hd--' + b.kind + '">' + mas({ practice: 'pad', apply: 'monitor' }[b.kind] || 'fire') + '<span class="hd__t">' + spans(b.vi, b.en) + '</span></h2>',

    fig: (b) =>
      '<figure class="fig' + (b.wide ? ' fig--wide' : '') + '"><div class="fig__art">' + art(b.art) + '</div>' + figCap(b.no, b.vi, b.en) + '</figure>',

    figs: (b) => '<div class="figs">' + b.items.map((f) => R.fig(f)).join('') + '</div>',

    /* Hoạt động: khung viền xanh, nhãn "Hoạt động n" bên trái, hình minh hoạ bên phải */
    activity: (b) => {
      const items = b.items ? '<ol class="olist olist--' + (b.style || 'num') + '">' +
        b.items.map((it) => '<li>' + pair(it.vi, it.en) + '</li>').join('') + '</ol>' : '';
      const fig = b.art ? '<figure class="act__fig"><div class="fig__art">' + art(b.art) + '</div>' + figCap(b.figNo, b.figVi, b.figEn) + '</figure>' : '';
      return '<section class="act"><h3 class="act__head"><span class="act__tab"><span class="vi">Hoạt động ' + esc(b.no) + '</span><span class="en" lang="en">Activity ' + esc(b.no) + '</span></span>' +
        '<span class="act__title">' + spans(b.title.vi, b.title.en) + '</span></h3>' +
        '<div class="act__body' + (b.art ? ' act__body--fig' : '') + '"><div class="act__text">' + pair(b.vi, b.en) + items + '</div>' + fig + '</div></section>';
    },

    /* Gom nhiều khối vào bố cục 2 cột như trang sách giấy */
    cols: (b, ctx) => '<div class="cols">' + b.blocks.map((x) => (R[x.t] ? R[x.t](x, ctx) : '')).join('') + '</div>',

    list: (b) =>
      '<ul class="bul">' + b.items.map((it) =>
        '<li class="bi"><span class="vi">' + vi(it.vi) + '</span><span class="en" lang="en">' + en(it.en) + '</span></li>').join('') + '</ul>',

    olist: (b) =>
      '<ol class="olist olist--' + (b.style || 'num') + '">' + b.items.map((it) => '<li>' + pair(it.vi, it.en) + '</li>').join('') + '</ol>',

    /* Hộp hồng có bóng đèn: ghi nhớ */
    tip: (b) =>
      '<aside class="tip' + (b.items.length === 1 ? ' tip--one' : '') + '">' + mas('bulb') + '<ul class="tip__list">' +
      b.items.map((it) => '<li>' + pair(it.vi, it.en) + '</li>').join('') + '</ul></aside>',

    /* Hộp xanh nhạt có dấu hỏi: câu hỏi cho em */
    ask: (b) =>
      '<section class="qbox">' + mas('ask') + '<div class="qbox__body">' + (b.lead ? '<p class="qbox__lead">' + spans(b.lead.vi, b.lead.en) + '</p>' : '') +
      '<ol class="olist olist--' + (b.style || 'num') + '">' + b.items.map((it) => '<li>' + pair(it.vi, it.en) + '</li>').join('') + '</ol></div></section>',

    /* ---- Khối dành cho môn Toán ------------------------------------------ */

    /* Công thức hiển thị riêng một dòng; label là số hiệu như (1), (*). */
    math: (b) =>
      '<div class="mathblk"><span class="mathblk__f">' + '<span class="m">' + tex(b.tex) + '</span></span>' +
      (b.label ? '<span class="mathblk__no">' + esc(b.label) + '</span>' : '') + '</div>',

    /* Khung kiến thức trọng tâm (nền vàng, vạch xanh bên trái). */
    key: (b, ctx) =>
      '<section class="keybox">' + (b.title ? '<h4 class="keybox__t">' + spans(b.title.vi, b.title.en) + '</h4>' : '') +
      b.blocks.map((x) => R[x.t](x, ctx)).join('') + '</section>',

    /* Các bước giải: mỗi bước có nhãn "Bước n." */
    steps: (b) =>
      '<ol class="steps">' + b.items.map((it) =>
        '<li><div class="bi"><p class="vi">' + vi('*' + it.label.vi + '.* ' + it.vi) + '</p><p class="en" lang="en">' + en('*' + it.label.en + '.* ' + it.en) + '</p></div>' +
        (it.math ? R.math({ tex: it.math }) : '') + '</li>').join('') + '</ol>',

    /* Bảng giá trị. rows: mảng các hàng; cột đầu là tiêu đề hàng. math:true → ô là công thức. */
    table: (b) =>
      '<div class="tblwrap"><table class="vtbl' + (b.cls ? ' ' + b.cls : '') + '"><tbody>' + b.rows.map((r, ri) =>
        '<tr>' + r.map((c, i) => {
          const cell = c && typeof c === 'object'
            ? '<span class="vi">' + vi(c.vi) + '</span><span class="en" lang="en">' + en(c.en) + '</span>'
            : b.math ? '<span class="m">' + tex(c) + '</span>' : vi(c);
          return (i === 0 || (b.head && ri === 0)) ? '<th scope="' + (b.head && ri === 0 ? 'col' : 'row') + '">' + cell + '</th>' : '<td' + (c === '?' ? ' class="q0"' : '') + '>' + cell + '</td>';
        }).join('') + '</tr>').join('') + '</tbody></table></div>',

    /* Ví dụ / Luyện tập / Vận dụng / Thực hành: nhãn màu + đề bài + lời giải. */
    ex: (b, ctx) => {
      const L = {
        example: { vi: 'Ví dụ', en: 'Example' },
        practice: { vi: 'Luyện tập', en: 'Practice' },
        apply: { vi: 'Vận dụng', en: 'Apply' },
        hands: { vi: 'Thực hành', en: 'Hands-on' }
      }[b.kind || 'example'];
      const num = b.no ? ' ' + b.no : '';
      return '<section class="ex ex--' + (b.kind || 'example') + '"><h4 class="ex__tab"><span class="vi">' + L.vi + num + '</span><span class="en" lang="en">' + L.en + num + '</span></h4>' +
        '<div class="ex__body">' + b.body.map((x) => R[x.t](x, ctx)).join('') +
        (b.solution ? '<div class="ex__sol"><p class="ex__solt"><span class="vi">Giải</span><span class="en" lang="en">Solution</span></p>' + b.solution.map((x) => R[x.t](x, ctx)).join('') + '</div>' : '') +
        '</div></section>';
    },

    /* Thử nghiệm: 8 bit ↔ số thập phân ↔ kí tự ASCII */
    bits: (b) => {
      const buttons = [128, 64, 32, 16, 8, 4, 2, 1].map((w, i) =>
        '<button type="button" class="bit" data-i="' + i + '" aria-pressed="false" aria-label="Bit giá trị ' + w + '">' +
        '<span class="bit__w">' + w + '</span><span class="bit__v">0</span></button>').join('');
      return '<section class="box box--lab" data-widget="bits">' + tag('flask', b.title) + pair(b.vi, b.en) +
        '<div class="bits" role="group" aria-label="Tám bit, bấm để đổi 0 và 1">' + buttons + '</div>' +
        '<div class="lab-out">' +
        '<div class="lab-out__cell"><span class="lab-out__k">' + spans('Dãy bit', 'Bits') + '</span><output class="lab-out__v js-bin">0100 0001</output></div>' +
        '<div class="lab-out__cell"><span class="lab-out__k">' + spans('Số thập phân', 'Decimal') + '</span><output class="lab-out__v js-dec">65</output></div>' +
        '<div class="lab-out__cell"><span class="lab-out__k">' + spans('Kí tự', 'Character') + '</span><output class="lab-out__v lab-out__v--chr js-chr">A</output></div>' +
        '</div>' +
        '<label class="lab-in"><span class="lab-in__k"><span class="vi">Gõ một kí tự:</span><span class="en" lang="en">Type a character:</span></span>' +
        '<input class="js-in" type="text" maxlength="1" value="A" autocomplete="off" spellcheck="false" aria-label="Gõ một kí tự để xem dãy bit của nó"></label>' +
        '<p class="lab-msg js-msg" aria-live="polite"></p></section>';
    },

    quiz: (b) => {
      /* Đáp án ngắn thì xếp 2 cột cho gọn trang; đáp án dài giữ 1 cột để không bị ngắt dòng khó đọc. */
      const plain = (s) => String(s).replace(/\{([^{}|]+)(?:\|[^{}]+)?\}/g, '$1');
      const items = b.items.map((q, qi) => {
        const compact = q.options.every((o) => plain(o.vi).length <= 16 && plain(o.en).length <= 18);
        const opts = q.options.map((o, oi) =>
          '<button type="button" class="opt" data-i="' + oi + '"><span class="opt__k" aria-hidden="true">' + 'ABCD'.charAt(oi) + '</span>' +
          '<span class="opt__body">' + spans(o.vi, o.en) + '</span><span class="opt__mark" aria-hidden="true"></span></button>').join('');
        return '<li class="q" data-id="' + esc(q.id) + '" data-answer="' + q.answer + '">' +
          '<div class="q__text bi"><p class="vi"><b class="q__no">Câu ' + (qi + 1) + '.</b> ' + vi(q.vi) + '</p>' +
          '<p class="en" lang="en"><b class="q__no">Question ' + (qi + 1) + '.</b> ' + en(q.en) + '</p></div>' +
          '<div class="q__opts' + (compact ? ' q__opts--2' : '') + '" role="group" aria-label="Đáp án của câu ' + (qi + 1) + '">' + opts + '</div>' +
          '<div class="q__why" hidden><p class="q__verdict" aria-live="polite"></p>' + pair(q.whyVi, q.whyEn) + '</div></li>';
      }).join('');
      return '<section class="box box--practice" data-widget="quiz">' + tag('check', b.title) +
        '<ol class="quiz">' + items + '</ol>' +
        '<div class="quiz__foot"><p class="quiz__score" aria-live="polite"></p>' +
        '<button type="button" class="btn btn--ghost btn--sm quiz__reset" hidden>' + ICON.refresh + '<span>Làm lại</span></button></div></section>';
    },

    summary: (b) =>
      '<section class="box box--sum">' + tag('list', b.title) + '<ul class="bul bul--tick">' +
      b.items.map((it) => '<li class="bi"><span class="vi">' + vi(it.vi) + '</span><span class="en" lang="en">' + en(it.en) + '</span></li>').join('') +
      '</ul></section>',

    /* Bảng từ vựng của bài: từ, phiên âm, nghĩa, nút loa */
    vocab: (b) => {
      const rows = b.keys.filter((k) => GLOSS[k]).map((k) => {
        const e = GLOSS[k];
        return '<li class="vrow">' +
          '<button type="button" class="say say--sm" data-say="' + esc(e.say || e.word) + '" aria-label="Nghe phát âm từ ' + esc(e.word) + '">' + ICON.speaker + '</button>' +
          '<span class="vrow__w" lang="en">' + vocabSpan(k, esc(e.word)) + '</span>' +
          '<span class="vrow__ipa ipa">' + esc(e.ipa) + '</span>' +
          '<span class="vrow__vi">' + esc(e.vi) + '</span></li>';
      }).join('');
      return '<section class="box box--vocab">' + tag('book', b.title) +
        '<p class="box__hint">' + esc(b.hint || '') + '</p><ul class="vlist">' + rows + '</ul></section>';
    }
  };

  /* ======================================================================
     4. TRÌNH ĐỌC: 2 TRANG MỞ
     ====================================================================== */

  /* Gom các trang thành từng cặp: trang chẵn bên trái, trang lẻ bên phải. */
  function buildSpreads(content) {
    const spreads = [];
    content.pages.forEach((p) => {
      const last = spreads[spreads.length - 1];
      if (p.number % 2 === 0) spreads.push({ left: p, right: null });
      else if (last && last.left && !last.right && last.left.number === p.number - 1) last.right = p;
      else spreads.push({ left: null, right: p });
    });
    return spreads;
  }

  function spreadIndexFor(spreads, pageNumber) {
    const i = spreads.findIndex((s) => (s.left && s.left.number === pageNumber) || (s.right && s.right.number === pageNumber));
    return i < 0 ? 0 : i;
  }

  function pageHTML(page, side, ctx) {
    if (!page) return '<article class="page page--' + side + ' page--blank" aria-hidden="true"></article>';
    const body = page.blocks.map((b) => (R[b.t] ? R[b.t](b, ctx) : '')).join('');
    return '<article class="page page--' + side + '" aria-label="Trang ' + page.number + '">' +
      '<div class="page__body">' + body + '</div>' +
      '<footer class="page__foot"><span class="pageno">' + page.number + '</span></footer></article>';
  }

  function openReader(grade, meta, pageParam) {
    const content = D.lessons[meta.content];
    const path = grade.slug + '/' + meta.slug;
    const spreads = buildSpreads(content);
    const idx = pageParam ? spreadIndexFor(spreads, Number(pageParam)) : 0;

    /* Đang đọc đúng bài này rồi (bấm mục lục trong trang): chỉ cần lật trang. */
    if (state.reader && state.reader.path === path && document.body.classList.contains('is-reader')) {
      showSpread(idx, idx > state.reader.idx ? 1 : -1);
      return;
    }
    setView('reader', 'Bài ' + content.number + '. ' + content.title.vi + ' | ' + content.book);
    state.reader = { grade: grade, meta: meta, content: content, path: path, spreads: spreads, idx: idx, ctx: { lesson: content, path: path } };
    mountReader();
    showSpread(idx, 0);
  }

  function mountReader() {
    const r = state.reader;
    const L = r.content;
    const options = r.spreads.map((s, i) => {
      const a = s.left ? s.left.number : s.right.number;
      const b = s.right ? s.right.number : a;
      const name = (L.spreadLabels && L.spreadLabels[i]) || '';
      return '<option value="' + i + '">Trang ' + (a === b ? a : a + '–' + b) + (name ? ': ' + esc(name) : '') + '</option>';
    }).join('');

    $app.innerHTML =
      '<header class="bar bar--reader">' +
      '<a class="bar__back" href="#/' + r.grade.slug + '" aria-label="Về danh sách bài của ' + esc(r.grade.subject) + '">' + ICON.left + '<span>' + esc(r.grade.subject) + '</span></a>' +
      '<p class="bar__title"><b>Bài ' + esc(L.number) + '</b><span>' + esc(L.title.vi) + '</span></p>' +
      '<div class="bar__tools">' +
      '<button type="button" class="switch" id="toggle-en" role="switch" aria-checked="' + state.showEn + '" title="Ẩn hoặc hiện phần tiếng Anh (phím E)">' +
      '<span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span><span class="switch__label">Tiếng Anh</span></button>' +
      '<div class="seg" role="group" aria-label="Cỡ chữ">' +
      '<button type="button" data-scale="-1" aria-label="Giảm cỡ chữ" title="Giảm cỡ chữ">A<small>−</small></button>' +
      '<button type="button" data-scale="1" aria-label="Tăng cỡ chữ" title="Tăng cỡ chữ">A<small>+</small></button></div>' +
      '<div class="seg seg--voice" role="group" aria-label="Giọng đọc tiếng Anh"><span class="seg__ico" aria-hidden="true">' + ICON.speaker + '</span>' +
      '<button type="button" data-accent="en-GB" aria-pressed="' + (state.accent === 'en-GB') + '" title="Giọng Anh – Anh">Anh</button>' +
      '<button type="button" data-accent="en-US" aria-pressed="' + (state.accent === 'en-US') + '" title="Giọng Anh – Mỹ">Mỹ</button></div>' +
      '<label class="jump"><span class="sr-only">Chuyển đến trang</span><select id="jump">' + options + '</select></label>' +
      '<button type="button" class="btn-icon" data-open-help aria-label="Cách dùng" title="Cách dùng">' + ICON.help + '</button>' +
      '</div></header>' +
      (state.hintSeen ? '' :
        '<div class="hint" role="note"><span class="hint__ico">' + ICON.bulb + '</span>' +
        '<p>Bấm vào <span class="hint__demo">từ gạch chân</span> trong phần tiếng Anh để xem phiên âm, nghĩa trong môn học và nghe phát âm.</p>' +
        '<button type="button" class="btn btn--ghost btn--sm" data-hint-ok>Đã hiểu</button></div>') +
      '<main id="main" class="desk"><div class="book" id="book"></div>' +
      '<nav class="flip" aria-label="Lật trang">' +
      '<button type="button" class="btn btn--ghost" id="flip-prev">' + ICON.left + '<span>Trang trước</span></button>' +
      '<p class="flip__info" id="flip-info" aria-live="polite"></p>' +
      '<button type="button" class="btn btn--primary" id="flip-next"><span>Trang sau</span>' + ICON.right + '</button></nav></main>';
    applyEn();
  }

  /* Hiện một cặp trang. dir: 1 = lật tới, -1 = lật lùi, 0 = không hiệu ứng */
  function showSpread(idx, dir) {
    const r = state.reader;
    if (!r) return;
    idx = Math.max(0, Math.min(r.spreads.length - 1, idx));
    closeVocab();
    Speech.stop();
    r.idx = idx;

    const s = r.spreads[idx];
    const book = $('#book');
    book.innerHTML = '<div class="spread' + (dir > 0 ? ' turn-next' : dir < 0 ? ' turn-prev' : '') + '">' +
      pageHTML(s.left, 'left', r.ctx) + pageHTML(s.right, 'right', r.ctx) + '</div>';
    initWidgets(book);

    const a = s.left ? s.left.number : s.right.number;
    const b = s.right ? s.right.number : a;
    $('#flip-info').textContent = 'Trang ' + (a === b ? a : a + '–' + b) + ' / ' + r.content.pages[r.content.pages.length - 1].number;
    $('#flip-prev').disabled = idx === 0;
    $('#flip-next').disabled = idx === r.spreads.length - 1;
    $('#jump').value = String(idx);

    /* Đồng bộ địa chỉ trang mà không thêm vào lịch sử trình duyệt. */
    try { window.history.replaceState(null, '', '#/' + r.path + '/' + a); } catch (e) { /* mở bằng file:// vẫn ổn */ }
    window.scrollTo(0, 0);
  }

  const flip = (dir) => { if (state.reader) showSpread(state.reader.idx + dir, dir); };

  function applyEn() {
    document.body.classList.toggle('en-off', !state.showEn);
    const sw = $('#toggle-en');
    if (sw) sw.setAttribute('aria-checked', String(state.showEn));
  }

  function toggleEn() {
    state.showEn = !state.showEn;
    store.set('showEn', state.showEn);
    closeVocab();
    applyEn();
  }

  function applyScale() {
    document.documentElement.style.setProperty('--scale', String(state.scale));
  }

  function changeScale(dir) {
    const i = Math.max(0, Math.min(SCALES.length - 1, SCALES.indexOf(state.scale) + dir));
    state.scale = SCALES[i];
    store.set('scale', state.scale);
    closeVocab();
    applyScale();
    if (i === 0 || i === SCALES.length - 1) toast(i === 0 ? 'Đã đạt cỡ chữ nhỏ nhất.' : 'Đã đạt cỡ chữ lớn nhất.');
  }

  function setAccent(accent) {
    state.accent = accent;
    store.set('accent', accent);
    $$('[data-accent]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.accent === accent)));
    /* "Microsoft Ryan Online (Natural) - English (United Kingdom)" → "Ryan Online (Natural)" */
    const name = Speech.voiceName(accent).replace(/^Microsoft\s+/i, '').replace(/\s+-\s+.*$/, '');
    toast('Giọng đọc: ' + (accent === 'en-GB' ? 'Anh – Anh' : 'Anh – Mỹ') + (name ? ' (' + name + ')' : '') + '.');
  }

  /* ======================================================================
     5. POPUP TỪ VỰNG
     ====================================================================== */
  const POS = { n: 'danh từ', v: 'động từ', adj: 'tính từ', adv: 'phó từ' };
  const pop = { el: null, anchor: null };

  /* Nhãn môn học lấy từ chính câu giải thích: "Trong Toán: ..." → nhãn "Trong Toán".
     Câu không có tiền tố thì mặc định là Tin học (các bài Tin học viết như vậy). */
  function ctxHTML(ctx) {
    const m = /^\s*Trong\s+([^:]{1,24}):\s*/.exec(ctx || '');
    const subject = m ? m[1] : 'Tin học';
    const body = m ? ctx.slice(m[0].length) : ctx;
    return '<p class="vpop__ctx"><b>Trong ' + esc(subject) + ':</b> ' + esc(body) + '</p>';
  }

  function popupHTML(e) {
    const pos = POS[e.pos] || '';
    return '<span class="vpop__arrow" aria-hidden="true"></span>' +
      '<button type="button" class="vpop__x" data-close aria-label="Đóng">' + ICON.close + '</button>' +
      '<div class="vpop__head"><div>' +
      '<p class="vpop__word" id="vpop-title" lang="en">' + esc(e.word) + '</p>' +
      '<p class="vpop__meta"><span class="ipa">' + esc(e.ipa) + '</span>' + (pos ? '<span class="vpop__pos">' + pos + '</span>' : '') + '</p>' +
      '</div>' +
      '<button type="button" class="say say--lg" data-say="' + esc(e.say || e.word) + '" aria-label="Nghe phát âm từ ' + esc(e.word) + '">' + ICON.speaker + '</button></div>' +
      '<p class="vpop__vi">' + esc(e.vi) + '</p>' +
      ctxHTML(e.ctx) +
      '<div class="vpop__ex"><p class="vpop__ex-k">Ví dụ</p>' +
      '<div class="vpop__ex-row"><p class="vpop__ex-en" lang="en">' + esc(e.ex.en) + '</p>' +
      '<button type="button" class="say say--sm" data-say="' + esc(e.ex.en) + '" aria-label="Nghe câu ví dụ">' + ICON.speaker + '</button></div>' +
      '<p class="vpop__ex-vi">' + esc(e.ex.vi) + '</p></div>';
  }

  function openVocab(anchor, viaKeyboard) {
    const entry = GLOSS[anchor.dataset.key];
    if (!entry) return;
    if (pop.anchor === anchor) { closeVocab(); return; }   // bấm lần nữa để đóng
    closeVocab();
    pop.anchor = anchor;
    anchor.classList.add('is-active');
    anchor.setAttribute('aria-expanded', 'true');
    pop.el.innerHTML = popupHTML(entry);
    pop.el.hidden = false;
    placePopup();
    if (viaKeyboard) { const first = $('.say', pop.el); if (first) first.focus(); }
  }

  function closeVocab(returnFocus) {
    if (!pop.anchor) return;
    const a = pop.anchor;
    a.classList.remove('is-active');
    a.setAttribute('aria-expanded', 'false');
    pop.anchor = null;
    pop.el.hidden = true;
    pop.el.innerHTML = '';
    Speech.stop();
    if (returnFocus && a.isConnected) a.focus();
  }

  /* Đặt popup cạnh từ: ưu tiên bên dưới, hết chỗ thì lên trên; luôn nằm trong màn hình. */
  function placePopup() {
    const a = pop.anchor;
    if (!a || !a.isConnected) { closeVocab(); return; }
    const el = pop.el;
    el.style.visibility = 'hidden';
    el.style.left = '0px';
    el.style.top = '0px';

    const rect = a.getClientRects()[0] || a.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    const pw = el.offsetWidth;
    const ph = el.offsetHeight;
    const gap = 12, edge = 10;
    const bar = $('.bar');
    const barH = bar ? bar.getBoundingClientRect().bottom > 0 ? bar.offsetHeight : 0 : 0;

    let left = rect.left + rect.width / 2 - pw / 2;
    left = Math.max(edge, Math.min(left, vw - pw - edge));

    const spaceBelow = vh - rect.bottom - gap - edge;
    const spaceAbove = rect.top - barH - gap - edge;
    const below = spaceBelow >= ph || spaceBelow >= spaceAbove;
    const top = below ? rect.bottom + gap : rect.top - gap - ph;

    el.classList.toggle('is-above', !below);
    el.style.left = Math.round(left + window.pageXOffset) + 'px';
    el.style.top = Math.round(top + window.pageYOffset) + 'px';
    el.style.setProperty('--arrow-x', Math.round(Math.max(22, Math.min(rect.left + rect.width / 2 - left, pw - 22))) + 'px');
    el.style.visibility = '';

    /* Popup chạm mép dưới màn hình: cuộn nhẹ trang để thấy trọn. */
    const overflow = top + ph + edge - vh;
    if (below && overflow > 0) window.scrollBy({ top: overflow, behavior: 'smooth' });
  }

  /* ======================================================================
     6. PHÁT ÂM — Web Speech API (window.speechSynthesis)
     ====================================================================== */
  const Speech = (function () {
    const supported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
    let voices = [];
    let current = null;      // giữ tham chiếu để trình duyệt không thu gom khi đang đọc
    let activeBtn = null;
    let warned = false;

    function refresh() { if (supported) voices = window.speechSynthesis.getVoices() || []; }
    if (supported) {
      refresh();
      if (window.speechSynthesis.addEventListener) window.speechSynthesis.addEventListener('voiceschanged', refresh);
      else window.speechSynthesis.onvoiceschanged = refresh;   // giọng đọc nạp bất đồng bộ
    }

    const lang = (v) => (v.lang || '').toLowerCase().replace('_', '-');

    /* Chọn giọng: đúng vùng (en-GB / en-US) trước, giọng "Natural"/"Google" chất lượng hơn. */
    function pick(accent) {
      const want = accent.toLowerCase();
      const exact = voices.filter((v) => lang(v) === want);
      const pool = exact.length ? exact : voices.filter((v) => lang(v).indexOf('en') === 0);
      const score = (v) => (/natural|neural/i.test(v.name) ? 4 : 0) + (/google/i.test(v.name) ? 3 : 0) + (/online/i.test(v.name) ? 1 : 0) + (v.default ? 0.5 : 0);
      return pool.slice().sort((a, b) => score(b) - score(a))[0] || null;
    }

    const mark = (btn, on) => { if (btn) btn.classList.toggle('is-speaking', on); };

    function stop() {
      if (!supported) return;
      window.speechSynthesis.cancel();
      mark(activeBtn, false);
      activeBtn = null;
      current = null;
    }

    function speak(text, btn, rate) {
      if (!supported) {
        toast('Trình duyệt này chưa hỗ trợ đọc thành tiếng. Hãy mở bằng Chrome, Edge hoặc Safari.');
        return;
      }
      refresh();
      window.speechSynthesis.cancel();
      mark(activeBtn, false);

      const u = new window.SpeechSynthesisUtterance(text);
      const v = pick(state.accent);
      if (v) u.voice = v;
      u.lang = v ? v.lang : state.accent;
      u.rate = rate || 0.9;
      u.pitch = 1;

      const finish = () => { if (current !== u) return; mark(btn, false); current = null; activeBtn = null; };
      u.onend = finish;
      u.onerror = (ev) => {
        finish();
        if (ev && ev.error && ev.error !== 'interrupted' && ev.error !== 'canceled') {
          toast('Chưa phát được âm thanh. Hãy kiểm tra loa và giọng đọc tiếng Anh trên máy.');
        }
      };
      current = u;
      activeBtn = btn;
      mark(btn, true);

      if (voices.length && !voices.some((x) => lang(x).indexOf('en') === 0) && !warned) {
        warned = true;
        toast('Máy chưa có giọng đọc tiếng Anh. Hãy thêm trong Cài đặt → Thời gian và ngôn ngữ → Giọng nói.');
      }
      /* Chrome đôi khi bỏ qua speak() ngay sau cancel(), nên chờ một nhịp ngắn. */
      window.setTimeout(() => { if (current === u) window.speechSynthesis.speak(u); }, 60);
    }

    return { supported: supported, speak: speak, stop: stop, voiceName: (accent) => { const v = pick(accent); return v ? v.name : ''; } };
  })();

  /* ======================================================================
     7. TIỆN ÍCH TƯƠNG TÁC
     ====================================================================== */
  function initWidgets(root) {
    $$('[data-widget="bits"]', root).forEach(initBits);
    $$('[data-widget="quiz"]', root).forEach(initQuiz);
  }

  function charInfo(n) {
    if (n === 32) return { text: '␣', note: 'Đây là dấu cách.' };
    if (n < 32 || n === 127) return { text: '∅', note: 'Đây là kí tự điều khiển, không in ra được.' };
    if (n > 127) return { text: '—', note: 'Giá trị này nằm ngoài bảng mã ASCII (0–127).' };
    return { text: String.fromCharCode(n), note: '' };
  }

  function initBits(box) {
    const btns = $$('.bit', box);
    const bin = $('.js-bin', box), dec = $('.js-dec', box), chr = $('.js-chr', box);
    const input = $('.js-in', box), msg = $('.js-msg', box);
    let value = 65;                                           // chữ A

    function render(keepInput) {
      btns.forEach((b, i) => {
        const on = (value >> (7 - i)) & 1;
        b.classList.toggle('is-on', on === 1);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        $('.bit__v', b).textContent = on;
      });
      const s = value.toString(2);
      const bits = new Array(9 - s.length).join('0') + s;
      bin.textContent = bits.slice(0, 4) + ' ' + bits.slice(4);
      dec.textContent = value;
      const c = charInfo(value);
      chr.textContent = c.text;
      msg.textContent = c.note;
      if (!keepInput) input.value = value >= 32 && value < 127 ? String.fromCharCode(value) : '';
    }

    btns.forEach((b, i) => b.addEventListener('click', () => { value ^= 1 << (7 - i); render(false); }));
    input.addEventListener('focus', () => input.select());
    input.addEventListener('click', () => input.select());
    input.addEventListener('input', () => {
      const ch = Array.from(input.value)[0];
      if (!ch) return;
      const code = ch.codePointAt(0);
      if (code > 127) {
        msg.textContent = 'Chỉ nhập kí tự trong bảng mã ASCII: chữ cái không dấu, chữ số, dấu câu.';
        input.value = value >= 32 && value < 127 ? String.fromCharCode(value) : '';
        return;
      }
      value = code;
      render(true);
    });
    render(false);
  }

  function initQuiz(box) {
    const items = $$('.q', box);
    const score = $('.quiz__score', box);
    const reset = $('.quiz__reset', box);

    function paint(q) {
      const chosen = state.quiz[q.dataset.id];
      const answer = Number(q.dataset.answer);
      const done = chosen !== undefined;
      $$('.opt', q).forEach((o, i) => {
        o.classList.toggle('is-right', done && i === answer);
        o.classList.toggle('is-wrong', done && i === chosen && i !== answer);
        o.disabled = done;
      });
      const why = $('.q__why', q);
      why.hidden = !done;
      if (done) {
        const ok = chosen === answer;
        why.classList.toggle('is-ok', ok);
        why.classList.toggle('is-bad', !ok);
        $('.q__verdict', why).innerHTML = ok
          ? ICON.check + '<span class="vi">Đúng rồi!</span><span class="en" lang="en">Correct!</span>'
          : ICON.close + '<span class="vi">Chưa đúng. Đáp án là ' + 'ABCD'.charAt(answer) + '.</span><span class="en" lang="en">Not quite. The answer is ' + 'ABCD'.charAt(answer) + '.</span>';
      }
    }

    function summary() {
      const answered = items.filter((q) => state.quiz[q.dataset.id] !== undefined);
      const right = answered.filter((q) => state.quiz[q.dataset.id] === Number(q.dataset.answer)).length;
      score.innerHTML = answered.length
        ? '<span class="vi">Đã làm ' + answered.length + '/' + items.length + ' câu, đúng ' + right + ' câu.</span>' +
          '<span class="en" lang="en">' + answered.length + ' of ' + items.length + ' answered, ' + right + ' correct.</span>'
        : '';
      reset.hidden = answered.length === 0;
    }

    items.forEach((q) => {
      $$('.opt', q).forEach((o) => o.addEventListener('click', () => {
        if (state.quiz[q.dataset.id] !== undefined) return;
        state.quiz[q.dataset.id] = Number(o.dataset.i);
        paint(q);
        summary();
      }));
      paint(q);
    });
    reset.addEventListener('click', () => {
      items.forEach((q) => { delete state.quiz[q.dataset.id]; paint(q); });
      summary();
    });
    summary();
  }

  /* ======================================================================
     8. MÀN HÌNH CHỌN LỚP VÀ DANH SÁCH BÀI
     ====================================================================== */
  function navHTML(activeSlug) {
    const pills = D.grades.map((g) => g.available
      ? '<a class="pill' + (g.slug === activeSlug ? ' is-current' : '') + '" href="#/' + g.slug + '"' + (g.slug === activeSlug ? ' aria-current="page"' : '') + '>' + (g.label || 'Lớp ' + g.id) + '</a>'
      : '<button type="button" class="pill is-soon" data-soon="' + g.id + '" aria-disabled="true" title="Đang cập nhật">' + (g.label || 'Lớp ' + g.id) + '</button>').join('');
    return '<header class="bar bar--top">' +
      '<a class="brand" href="#/"><span class="brand__mark">' + ICON.logo + '</span>' +
      '<span class="brand__name">Sách song ngữ<small class="en" lang="en">Bilingual textbook</small></span></a>' +
      '<nav class="gradenav" aria-label="Chọn khối lớp">' + pills + '</nav>' +
      '<button type="button" class="btn btn--ghost btn--sm" data-open-help>' + ICON.help + '<span>Cách dùng</span></button></header>';
  }

  function setView(name, title) {
    document.body.classList.remove('is-home', 'is-lessons', 'is-reader');
    document.body.classList.add('is-' + name);
    document.title = title ? title : 'Sách giáo khoa song ngữ tương tác';
    if (name !== 'reader') state.reader = null;
    if (name !== 'reader') document.body.classList.remove('en-off');
    closeVocab();
  }

  /* Đếm số trang và số từ vựng của một bài (để hiện trong danh sách). */
  function lessonStats(content) {
    const text = JSON.stringify(content.pages);
    const keys = {};
    const re = /\{([^{}|"]+?)(?:\|([^{}"]+?))?\}/g;
    let m;
    while ((m = re.exec(text))) keys[keyOf(m[1], m[2])] = true;
    return { pages: content.pages.length, words: Object.keys(keys).filter((k) => GLOSS[k]).length };
  }

  function renderHome() {
    setView('home', 'Sách giáo khoa song ngữ tương tác');

    const covers = D.grades.map((g) => {
      const inner =
        '<span class="cover__spine" aria-hidden="true"></span>' +
        '<span class="cover__sub">' + (g.short || 'Tin học') + '</span>' +
        '<span class="cover__num">' + g.id + '</span>' +
        '<span class="cover__state">' + (g.available ? ICON.right + '<span>Mở sách</span>' : ICON.clock + '<span>Đang cập nhật</span>') + '</span>';
      return '<li>' + (g.available
        ? '<a class="cover cover--' + g.id + (g.short === 'Toán' ? ' cover--math' : '') + ' is-open" href="#/' + g.slug + '" aria-label="Mở sách ' + esc(g.subject) + '">' + inner + '</a>'
        : '<button type="button" class="cover cover--' + g.id + ' is-soon" data-soon="' + g.id + '" aria-disabled="true" aria-label="' + esc(g.subject) + ', đang cập nhật">' + inner + '</button>') + '</li>';
    }).join('');

    $app.innerHTML = navHTML(null) +
      '<main id="main" class="home">' +
      '<section class="hero">' +
      '<div class="hero__copy">' +
      '<h1 class="hero__title"><span class="vi">Đọc Tin học bằng hai ngôn ngữ</span><span class="en" lang="en">Read Informatics in two languages</span></h1>' +
      '<p class="hero__lead">Sách giáo khoa song ngữ tương tác: tiếng Việt ở trên, tiếng Anh ở dưới. Bấm vào từ gạch chân để xem phiên âm, nghĩa trong Tin học và nghe phát âm.</p>' +
      '<div class="hero__cta"><a class="btn btn--primary btn--lg" href="#/lop-9"><span>Vào học Tin học 9</span>' + ICON.right + '</a> <a class="btn btn--lg btn--ghost" href="#/toan-9"><span>Vào học Toán 9</span></a>' +
      '<p class="hero__note">Hiện có Tin học 9 (Bài 1) và Toán 9 (Chương I, bài 1–3). Các bài khác đang được cập nhật.</p></div></div>' +
      '<div class="demo"><article class="demo__page" aria-label="Một đoạn mẫu trong sách">' +
      '<p class="demo__head"><b>Bài 1</b> Thế giới kĩ thuật số</p>' +
      pair('Thiết bị số nhận, lưu trữ và xử lí thông tin.', 'A {digital} {device|device} can receive, store and {process|process-v} {information}.') +
      '<div class="demo__skel" aria-hidden="true"><i></i><i></i><i></i><i></i></div></article></div>' +
      '</section>' +
      '<section class="shelf" aria-labelledby="shelf-h"><h2 id="shelf-h" class="shelf__h"><span class="vi">Chọn khối lớp</span><span class="en" lang="en">Choose a grade</span></h2>' +
      '<ul class="shelf__books">' + covers + '</ul></section>' +
      '<footer class="foot"><p>Sản phẩm mô phỏng sách giáo khoa song ngữ phục vụ học tập. Nội dung bài học được biên soạn lại theo mục tiêu của chương trình, không phải bản sao của sách in.</p></footer>' +
      '</main>';

    window.scrollTo(0, 0);
    /* Mở sẵn popup mẫu để người xem thấy ngay tính năng chính. */
    const demoWord = $('.demo .vocab[data-key="process-v"]') || $('.demo .vocab');
    /* Chỉ mở sẵn khi ví dụ nằm cạnh phần giới thiệu (màn hình rộng); trên điện thoại popup sẽ che nút "Vào học". */
    const sideBySide = !window.matchMedia || window.matchMedia('(min-width: 1001px)').matches;
    const show = () => { if (sideBySide && demoWord && demoWord.isConnected && !pop.anchor) openVocab(demoWord, false); };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(show); else window.setTimeout(show, 300);
  }

  function renderGrade(g) {
    setView('lessons', g.subject + ' | Sách song ngữ');
    const all = g.topics.reduce((acc, t) => acc.concat(t.lessons), []);
    const ready = all.filter((l) => l.content && D.lessons[l.content]).length;

    const topics = g.topics.map((t, ti) => {
      const rows = t.lessons.map((l) => {
        const content = l.content && D.lessons[l.content];
        const titles = '<span class="lesson__t vi">' + esc(l.vi) + '</span><span class="lesson__en en" lang="en">' + esc(l.en) + '</span>';
        if (content) {
          const st = lessonStats(content);
          return '<li class="lesson is-ready"><a class="lesson__link" href="#/' + g.slug + '/' + l.slug + '">' +
            '<span class="lesson__n">' + esc(l.number) + '</span>' +
            '<span class="lesson__body">' + titles + '<span class="lesson__meta">' + st.pages + ' trang, ' + st.words + ' từ vựng có phiên âm</span></span>' +
            '<span class="btn btn--primary lesson__go"><span>Học ngay</span>' + ICON.right + '</span></a></li>';
        }
        return '<li class="lesson is-soon"><span class="lesson__n">' + esc(l.number) + '</span>' +
          '<span class="lesson__body">' + titles + '</span>' +
          '<span class="soon">' + ICON.clock + '<span>Đang cập nhật</span></span></li>';
      }).join('');
      return '<section class="topic" aria-labelledby="topic-' + ti + '"><h2 class="topic__h" id="topic-' + ti + '">' +
        '<span class="topic__n">Chủ đề ' + (ti + 1) + '</span><span class="topic__t"><span class="vi">' + esc(t.vi) + '</span><span class="en" lang="en">' + esc(t.en) + '</span></span></h2>' +
        '<ol class="lesson-list">' + rows + '</ol></section>';
    }).join('');

    $app.innerHTML = navHTML(g.slug) +
      '<main id="main" class="lessons">' +
      '<header class="lessons__head">' +
      '<nav class="crumbs" aria-label="Đường dẫn"><a href="#/">Trang chủ</a>' + ICON.right + '<span aria-current="page">' + esc(g.label || 'Lớp ' + g.id) + '</span></nav>' +
      '<h1 class="lessons__title"><span class="vi">' + esc(g.subject) + '</span><span class="en" lang="en">' + esc(g.subjectEn || '') + '</span></h1>' +
      '<p class="lessons__sum">' + all.length + ' bài trong ' + g.topics.length + ' chủ đề. ' + ready + ' bài đã sẵn sàng, các bài còn lại đang được cập nhật.</p></header>' +
      topics + '</main>';
    window.scrollTo(0, 0);
  }

  /* ======================================================================
     9. ĐIỀU HƯỚNG VÀ SỰ KIỆN CHUNG
     ====================================================================== */
  function findLesson(g, slug) {
    for (let i = 0; i < g.topics.length; i++) {
      const l = g.topics[i].lessons.find((x) => x.slug === slug);
      if (l) return l;
    }
    return null;
  }

  /* Địa chỉ dạng  #/lop-9/bai-1/6  = lớp 9, bài 1, mở cặp trang chứa trang 6. */
  function route() {
    const parts = window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    const g = parts[0] && D.grades.find((x) => x.slug === parts[0]);

    if (!parts.length) { renderHome(); return; }
    if (!g || !g.available) {
      renderHome();
      if (g) toast(g.subject + ' đang được cập nhật. Hiện có thể học Tin học 9.');
      return;
    }
    if (!parts[1]) { renderGrade(g); return; }

    const lesson = findLesson(g, parts[1]);
    if (!lesson || !lesson.content || !D.lessons[lesson.content]) {
      renderGrade(g);
      toast('Bài này đang được cập nhật.');
      return;
    }
    openReader(g, lesson, parts[2]);
  }

  function openHelp() {
    const d = $('#help');
    if (!d) return;
    if (typeof d.showModal === 'function') { if (!d.open) d.showModal(); } else d.setAttribute('open', '');
  }

  document.addEventListener('click', (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;

    const word = t.closest('.vocab');
    if (word) { e.preventDefault(); openVocab(word, false); return; }

    const say = t.closest('[data-say]');
    if (say) { Speech.speak(say.dataset.say, say, say.classList.contains('say--lg') ? 0.82 : 0.92); return; }

    if (t.closest('[data-close]')) { closeVocab(true); return; }

    const soon = t.closest('[data-soon]');
    if (soon) { toast('Lớp ' + soon.dataset.soon + ' đang được cập nhật. Hiện có thể học Tin học 9.'); return; }

    if (t.closest('[data-open-help]')) { openHelp(); return; }
    if (t.closest('[data-hint-ok]')) {
      state.hintSeen = true; store.set('hintSeen', true);
      const hint = $('.hint'); if (hint) hint.remove();
      return;
    }
    if (t.closest('#toggle-en')) { toggleEn(); return; }

    const sc = t.closest('[data-scale]');
    if (sc) { changeScale(Number(sc.dataset.scale)); return; }
    const ac = t.closest('[data-accent]');
    if (ac) { setAccent(ac.dataset.accent); return; }

    if (t.closest('#flip-prev')) { flip(-1); return; }
    if (t.closest('#flip-next')) { flip(1); return; }

    if (!t.closest('#vpop')) closeVocab();
  });

  document.addEventListener('change', (e) => {
    if (e.target && e.target.id === 'jump' && state.reader) {
      const to = Number(e.target.value);
      showSpread(to, to > state.reader.idx ? 1 : -1);
    }
  });

  document.addEventListener('keydown', (e) => {
    const t = e.target;
    if ((e.key === 'Enter' || e.key === ' ') && t.classList && t.classList.contains('vocab')) {
      e.preventDefault();
      openVocab(t, true);
      return;
    }
    if (e.key === 'Escape') { if (pop.anchor) closeVocab(true); return; }

    const typing = t && /^(input|textarea|select)$/i.test(t.tagName);
    if (typing || e.ctrlKey || e.metaKey || e.altKey || !state.reader) return;
    if (document.querySelector('dialog[open]')) return;
    if (e.key === 'ArrowRight') flip(1);
    else if (e.key === 'ArrowLeft') flip(-1);
    else if (e.key === 'e' || e.key === 'E') toggleEn();
  });

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => { if (pop.anchor) placePopup(); }, 120);
  });
  window.addEventListener('hashchange', route);

  /* ---------- Khởi động ---------- */
  function boot() {
    pop.el = $('#vpop');
    applyScale();
    $$('[data-ico]').forEach((el) => { el.innerHTML = ICON[el.dataset.ico] || ''; });
    const help = $('#help');
    if (help) help.addEventListener('click', (e) => { if (e.target === help) help.close(); });
    route();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
