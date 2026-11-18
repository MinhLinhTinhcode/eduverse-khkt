/* ==========================================================================
   LUYỆN TẬP: Khởi động · Bài tập cuối tiết · Bài tập về nhà · Bảng xếp hạng lớp
   --------------------------------------------------------------------------
   Câu hỏi được TỰ SINH từ dữ liệu có sẵn của từng bài (câu trắc nghiệm trong
   bài + từ điển thuật ngữ), nên bài nào có từ vựng là có luyện tập ngay,
   không phải soạn thêm. Tiến độ lưu trên máy học sinh (localStorage).
   Bảng xếp hạng không cần máy chủ: mỗi học sinh có "mã hồ sơ" để dán vào
   máy của giáo viên hoặc của bạn, bảng sẽ tự xếp hạng.
   ========================================================================== */
(function () {
  'use strict';
  const D = window.TEXTBOOK;
  const GLOSS = D.glossary;
  const KEY = 'sgk.prog';
  const BOARD = 'sgk.board';
  const fmt = () => window.TextbookFmt;
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const plain = (s) => fmt().plain(s);
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  const MODES = {
    'khoi-dong': { vi: 'Khởi động', en: 'Warm-up', note: 'Làm quen thuật ngữ trước khi đọc bài (khoảng 3 phút).', xp: 2, icon: '🔥' },
    'cuoi-tiet': { vi: 'Bài tập cuối tiết', en: 'End-of-lesson test', note: 'Câu hỏi của bài và từ vựng, có giải thích từng câu.', xp: 5, icon: '✅' },
    've-nha': { vi: 'Bài tập về nhà', en: 'Homework', note: 'Gõ từ, điền từ, ôn câu hỏi. Nộp bài rồi lấy mã gửi giáo viên.', xp: 10, icon: '🏠' },
    /* Bài do giáo viên giao bằng mã (không hiện thành thẻ riêng trong trang luyện tập). */
    /* Bài do giáo viên soạn bằng trợ lý AI (ai.js) và chia sẻ qua mã AI1.… */
    'bai-ai': { vi: 'Bài do AI soạn', en: 'AI-made quiz', note: '', xp: 5, icon: '🤖', hidden: true },
    'bai-giao': { vi: 'Bài giáo viên giao', en: 'Assigned quiz', note: '', xp: 5, icon: '📋', hidden: true }
  };
  /* Các phần luyện tập thường (thẻ lớn) và các trò chơi khởi động (games.js đăng ký thêm). */
  const shown = (game) => Object.keys(MODES).filter((m) => !MODES[m].hidden && !!MODES[m].game === !!game);
  const RUNNERS = {};   // id chế độ → hàm (host, ctx) vẽ trò chơi

  /* ---------- Hồ sơ học sinh (lưu trên máy) ---------- */
  const day = (d) => { d = d || new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  function load() {
    try {
      const p = JSON.parse(window.localStorage.getItem(KEY));
      if (p && typeof p === 'object') return Object.assign({ nick: '', xp: 0, days: [], best: {} }, p);
    } catch (e) { /* trình duyệt chặn lưu trữ */ }
    return { nick: '', xp: 0, days: [], best: {} };
  }
  let prog = load();
  function save() { try { window.localStorage.setItem(KEY, JSON.stringify(prog)); } catch (e) { /* bỏ qua */ } }
  const level = () => Math.floor(prog.xp / 100) + 1;
  /* Báo kết quả của một thuật ngữ cho bộ ôn từ thông minh (review.js). Không có review.js thì bỏ qua. */
  const mark = (key, ok) => { if (key && window.SRS) window.SRS.grade(key, !!ok); };
  function streak() {
    const set = {}; prog.days.forEach((d) => { set[d] = true; });
    const d = new Date(); let n = 0;
    if (!set[day(d)]) d.setDate(d.getDate() - 1);
    while (set[day(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  const hwDone = () => Object.keys(prog.best).filter((k) => prog.best[k]['ve-nha']).length;

  /* Cộng XP theo phần điểm TIẾN BỘ so với lần tốt nhất trước (không "cày" bằng làm lại). */
  function record(lessonKey, mode, score, total) {
    const b = (prog.best[lessonKey] = prog.best[lessonKey] || {});
    const old = b[mode] ? b[mode].s : 0;
    const gain = Math.max(0, score - old) * MODES[mode].xp;
    if (!b[mode] || score >= b[mode].s) b[mode] = { s: score, t: total, d: day() };
    prog.xp += gain;
    if (prog.days.indexOf(day()) < 0) prog.days.push(day());
    save();
    /* Báo cho thanh bên cập nhật thẻ XP. */
    try { document.dispatchEvent(new CustomEvent('sgk:progress', { detail: { kind: 'record', mode: mode, score: score, total: total } })); } catch (e) { /* trình duyệt cũ */ }
    return gain;
  }

  /* ---------- Dữ liệu từ bài học ---------- */
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  const pick = (a, n) => shuffle(a).slice(0, n);

  function vocabKeys(content) {
    const keys = [];
    const add = (k) => { if (GLOSS[k] && keys.indexOf(k) < 0) keys.push(k); };
    content.pages.forEach((p) => p.blocks.forEach((b) => { if (b.t === 'vocab') b.keys.forEach(add); }));
    if (!keys.length) {
      const re = /\{([^{}|"]+?)(?:\|([^{}"]+?))?\}/g; const text = JSON.stringify(content.pages); let m;
      while ((m = re.exec(text))) add((m[2] || m[1]).trim().toLowerCase().replace(/\s+/g, '-'));
    }
    return keys;
  }
  function quizItems(content) {
    const out = [];
    content.pages.forEach((p) => p.blocks.forEach((b) => { if (b.t === 'quiz') b.items.forEach((q) => out.push(q)); }));
    return out;
  }

  const wordOf = (k) => plain(GLOSS[k].word);
  const norm = (s) => String(s).toLowerCase().replace(/[-_/.,;:!?()'"“”‘’]/g, ' ').replace(/\s+/g, ' ').trim();

  function distractors(pool, correctKey, field, n) {
    const right = field(GLOSS[correctKey]);
    const seen = {}; seen[right] = true;
    const out = [];
    shuffle(pool).concat(shuffle(Object.keys(GLOSS))).forEach((k) => {
      if (out.length >= n || k === correctKey || !GLOSS[k]) return;
      const v = field(GLOSS[k]);
      if (!v || seen[v]) return;
      seen[v] = true; out.push(v);
    });
    return out;
  }
  function mcQuestion(k, pool, dir) {
    const e = GLOSS[k];
    const field = dir === 'en2vi' ? (x) => x.vi : (x) => plain(x.word);
    const right = field(e);
    const options = shuffle([right].concat(distractors(pool, k, field, 3)));
    return {
      kind: 'mc', key: k, dir: dir, options: options, answer: options.indexOf(right),
      whyVi: '“' + plain(e.word) + '” nghĩa là “' + e.vi + '”. ' + (e.ctx ? e.ctx : ''), whyEn: e.ex ? e.ex.en : ''
    };
  }
  function typeQuestion(k) { return { kind: 'type', sub: 'word', key: k, answers: [norm(wordOf(k))] }; }
  function fillQuestion(k) {
    const e = GLOSS[k]; if (!e.ex || !e.ex.en) return null;
    const w = wordOf(k).replace(/^to\s+/i, '');
    const esc2 = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp('\\b' + esc2 + '[a-z]{0,3}\\b', 'i');
    const m = e.ex.en.match(re);
    if (!m) return null;
    return { kind: 'type', sub: 'fill', key: k, sentence: e.ex.en.replace(re, '_____'), hintVi: e.ex.vi, answers: [norm(m[0]), norm(w), norm(wordOf(k))] };
  }
  function mcFromQuiz(q) {
    return { kind: 'mc', quiz: true, pvi: q.vi, options: q.options.map((o) => ({ vi: o.vi, en: o.en })), answer: q.answer, whyVi: q.whyVi, whyEn: q.whyEn };
  }

  function build(content, mode) {
    const keys = vocabKeys(content);
    const qs = quizItems(content);
    if (mode === 'khoi-dong') return pick(keys, 6).map((k) => mcQuestion(k, keys, 'en2vi'));
    if (mode === 'cuoi-tiet') {
      const a = pick(qs, 6).map(mcFromQuiz);
      const b = pick(keys, 4).map((k, i) => mcQuestion(k, keys, i % 2 ? 'vi2en' : 'en2vi'));
      return a.concat(b);
    }
    const typed = pick(keys, 5).map(typeQuestion);
    const fills = shuffle(keys).map(fillQuestion).filter(Boolean).slice(0, 5);
    const review = pick(qs, 4).map(mcFromQuiz);
    return typed.concat(fills, review);
  }

  /* ---------- Giao diện câu hỏi ---------- */
  function promptHTML(q, i, withNo) {
    const no = withNo ? '<b class="q__no">Câu ' + (i + 1) + '.</b> ' : '';
    if (q.kind === 'mc' && q.quiz) return '<p class="vi">' + no + fmt().vi(q.pvi) + '</p>';
    const e = GLOSS[q.key];
    if (q.kind === 'mc' && q.dir === 'en2vi') {
      return '<p class="vi">' + no + 'Từ nào có nghĩa tiếng Việt đúng?</p><p class="prac__word" lang="en"><span>' + esc(plain(e.word)) + '</span> <span class="prac__ipa">' + esc(e.ipa || '') + '</span>' +
        ' <button type="button" class="btn-icon prac__say" data-say="' + esc(plain(e.word)) + '" aria-label="Nghe phát âm">🔊</button></p>';
    }
    if (q.kind === 'mc') return '<p class="vi">' + no + 'Chọn từ tiếng Anh có nghĩa:</p><p class="prac__word"><span>' + esc(e.vi) + '</span></p>';
    if (q.sub === 'word') return '<p class="vi">' + no + 'Gõ từ tiếng Anh có nghĩa:</p><p class="prac__word"><span>' + esc(e.vi) + '</span> <span class="prac__ipa">' + esc(e.ipa || '') + '</span></p>';
    return '<p class="vi">' + no + 'Điền từ còn thiếu vào chỗ trống:</p><p class="prac__sent" lang="en">' + esc(q.sentence) + '</p><p class="en prac__hint">Gợi ý: ' + esc(q.hintVi || e.vi) + '</p>';
  }
  function optionHTML(q, o, oi) {
    const body = q.quiz ? '<span class="vi">' + fmt().vi(o.vi) + '</span>' : '<span class="vi">' + esc(o) + '</span>';
    return '<button type="button" class="opt" data-i="' + oi + '"><span class="opt__k" aria-hidden="true">' + 'ABCD'.charAt(oi) + '</span><span class="opt__body">' + body + '</span><span class="opt__mark" aria-hidden="true"></span></button>';
  }
  const whyHTML = (q) => (q.whyVi || q.whyEn) ?
    '<div class="prac__why">' + (q.whyVi ? '<p class="vi">' + fmt().vi(q.whyVi) + '</p>' : '') + (q.whyEn ? '<p class="en" lang="en">' + esc(plain(q.whyEn)) + '</p>' : '') + '</div>' : '';
  const isRight = (q, v) => q.kind === 'mc' ? v === q.answer : q.answers.indexOf(norm(v || '')) >= 0;
  const answerText = (q) => q.kind === 'mc' ? (q.quiz ? plain(q.options[q.answer].vi) : q.options[q.answer]) : wordOf(q.key);

  /* ----- Chế độ từng câu (Khởi động, Cuối tiết): chấm ngay ----- */
  function runSteps(host, ctx) {
    const qs = ctx.qs ? ctx.qs() : build(ctx.content, ctx.mode);
    if (!qs.length) { host.innerHTML = '<p class="prac__empty">Bài này chưa có đủ dữ liệu để tạo câu hỏi.</p>'; return; }
    let i = 0, right = 0;
    const log = [];
    function ask() {
      const q = qs[i];
      host.innerHTML = '<div class="prac__bar"><span>Câu ' + (i + 1) + '/' + qs.length + '</span><span class="prac__prog" role="progressbar" aria-valuemin="0" aria-valuemax="' + qs.length + '" aria-valuenow="' + i + '"><i style="width:' + (i / qs.length * 100) + '%"></i></span></div>' +
        '<div class="prac__q">' + promptHTML(q, i, false) + '</div>' +
        '<div class="q__opts q__opts--2">' + q.options.map((o, oi) => optionHTML(q, o, oi)).join('') + '</div>' +
        '<div class="prac__fb" aria-live="polite"></div>' +
        '<div class="prac__act"><button type="button" class="btn btn--primary" data-next hidden>' + (i === qs.length - 1 ? 'Xem kết quả' : 'Câu tiếp') + '</button></div>';
      $$('.opt', host).forEach((o) => o.addEventListener('click', () => {
        const v = Number(o.dataset.i); const ok = v === q.answer;
        if (ok) right++;
        mark(q.key, ok);
        log.push(ok);
        $$('.opt', host).forEach((x, xi) => { x.disabled = true; x.classList.toggle('is-right', xi === q.answer); x.classList.toggle('is-wrong', xi === v && !ok); });
        $('.prac__fb', host).innerHTML = '<p class="prac__verdict ' + (ok ? 'is-ok' : 'is-bad') + '">' + (ok ? '✔ Đúng rồi!' : '✘ Chưa đúng. Đáp án: ' + esc(answerText(q))) + '</p>' + whyHTML(q);
        const n = $('[data-next]', host); n.hidden = false; n.focus();
      }));
      $('[data-next]', host).addEventListener('click', () => { i++; if (i < qs.length) ask(); else finish(); });
    }
    function finish() {
      const gain = record(ctx.key, ctx.mode, right, qs.length);
      host.innerHTML = resultHTML(ctx, right, qs.length, gain);
      wireResult(host, ctx);
    }
    ask();
  }

  function resultHTML(ctx, s, t, gain, extra) {
    const pct = Math.round(s / t * 100);
    const msg = pct >= 90 ? 'Xuất sắc!' : pct >= 70 ? 'Làm tốt lắm!' : pct >= 50 ? 'Khá rồi, thử lại để cao hơn nhé.' : 'Cần ôn lại bài. Đọc lại rồi làm lần nữa.';
    return '<div class="prac__result"><p class="prac__big">' + s + '<small>/' + t + '</small></p><p class="prac__msg">' + msg + '</p>' +
      '<p class="prac__xp">+' + gain + ' XP' + (gain ? '' : ' (chưa vượt điểm cũ nên không cộng thêm)') + '</p>' + (extra || '') + tokenHTML(ctx, s, t) +
      '<div class="prac__act"><button type="button" class="btn btn--ghost" data-retry>Làm lại</button>' +
      '<a class="btn btn--ghost" href="#/' + ctx.grade.slug + '/' + ctx.meta.slug + '">Đọc bài</a>' +
      '<a class="btn btn--primary" href="#/' + ctx.grade.slug + '/' + ctx.meta.slug + '/luyen-tap">Các phần luyện tập</a></div></div>';
  }
  /* "Mã kết quả" (KQ1.…) gửi giáo viên: chứa biệt danh, mã bài, điểm, ngày và mã kiểm tra. */
  function tokenHTML(ctx, s, t) {
    if (!ctx.tokenFor || !window.Classroom) return '';
    const code = window.Classroom.token({ n: prog.nick || 'Ẩn danh', a: ctx.tokenFor, s: s, t: t });
    return '<div class="prac__code" data-tok data-a="' + esc(ctx.tokenFor) + '" data-s="' + s + '" data-t="' + t + '"><p><b>Mã kết quả</b> (gửi cho giáo viên):</p>' +
      '<label class="tok__nick">Biệt danh trong mã <input type="text" maxlength="20" data-tok-nick value="' + esc(prog.nick) + '" placeholder="VD: CaoThuToan"></label>' +
      '<textarea readonly rows="2" data-tok-out aria-label="Mã kết quả">' + esc(code) + '</textarea>' +
      '<button type="button" class="btn btn--ghost btn--sm" data-tok-copy>Sao chép mã</button></div>';
  }
  function wireResult(host, ctx) {
    const r = $('[data-retry]', host); if (r) r.addEventListener('click', () => runMode(host, ctx));
    const c = $('[data-copy]', host); if (c) c.addEventListener('click', () => copyText(c.dataset.copy, c));
    const box = $('[data-tok]', host);
    if (box) {
      const out = $('[data-tok-out]', box);
      $('[data-tok-nick]', box).addEventListener('input', (e) => {
        prog.nick = e.target.value.trim().slice(0, 20); save();
        out.value = window.Classroom.token({ n: prog.nick || 'Ẩn danh', a: box.dataset.a, s: Number(box.dataset.s), t: Number(box.dataset.t) });
      });
      $('[data-tok-copy]', box).addEventListener('click', (e) => copyText(out.value, e.currentTarget));
    }
  }
  function copyText(text, btn) {
    const done = () => { if (btn) { const o = btn.textContent; btn.textContent = 'Đã sao chép'; setTimeout(() => { btn.textContent = o; }, 1500); } };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, () => fallback());
    else fallback();
    function fallback() { const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch (e) { /* bỏ qua */ } t.remove(); done(); }
  }

  /* ----- Bài tập về nhà: làm hết rồi nộp ----- */
  const enc = (o) => 'SGK1.' + btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  function dec(s) {
    try {
      s = s.trim(); if (s.indexOf('SGK1.') !== 0) return null;
      let b = s.slice(5).replace(/-/g, '+').replace(/_/g, '/'); while (b.length % 4) b += '=';
      return JSON.parse(decodeURIComponent(escape(atob(b))));
    } catch (e) { return null; }
  }
  function runHomework(host, ctx) {
    const qs = build(ctx.content, 've-nha');
    if (!qs.length) { host.innerHTML = '<p class="prac__empty">Bài này chưa có đủ dữ liệu để tạo bài tập.</p>'; return; }
    const items = qs.map((q, i) => {
      const input = q.kind === 'mc'
        ? '<div class="q__opts q__opts--2">' + q.options.map((o, oi) => optionHTML(q, o, oi)).join('') + '</div>'
        : '<input class="prac__in" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Câu trả lời của câu ' + (i + 1) + '">';
      return '<li class="q prac__item" data-i="' + i + '"><div class="prac__q">' + promptHTML(q, i, true) + '</div>' + input + '<div class="prac__fb" aria-live="polite"></div></li>';
    }).join('');
    host.innerHTML = '<p class="prac__intro">Làm tất cả ' + qs.length + ' câu rồi bấm <b>Nộp bài</b>. Câu để trống tính là sai.</p><ol class="quiz prac__list">' + items + '</ol>' +
      '<div class="prac__act"><button type="button" class="btn btn--primary" data-submit>Nộp bài</button></div><div data-out></div>';
    const picked = {};
    $$('.prac__item', host).forEach((li) => {
      const i = Number(li.dataset.i);
      $$('.opt', li).forEach((o) => o.addEventListener('click', () => {
        picked[i] = Number(o.dataset.i);
        $$('.opt', li).forEach((x) => x.classList.toggle('is-picked', x === o));
      }));
    });
    $('[data-submit]', host).addEventListener('click', () => {
      let right = 0;
      $$('.prac__item', host).forEach((li) => {
        const i = Number(li.dataset.i); const q = qs[i];
        const v = q.kind === 'mc' ? picked[i] : $('.prac__in', li).value;
        const ok = isRight(q, v); if (ok) right++;
        mark(q.key, ok);
        if (q.kind === 'mc') $$('.opt', li).forEach((x, xi) => { x.disabled = true; x.classList.toggle('is-right', xi === q.answer); x.classList.toggle('is-wrong', xi === picked[i] && !ok); });
        else { const inp = $('.prac__in', li); inp.disabled = true; inp.classList.add(ok ? 'is-right' : 'is-wrong'); }
        $('.prac__fb', li).innerHTML = '<p class="prac__verdict ' + (ok ? 'is-ok' : 'is-bad') + '">' + (ok ? '✔ Đúng' : '✘ Sai. Đáp án: ' + esc(answerText(q))) + '</p>' + (ok ? '' : whyHTML(q));
      });
      $('[data-submit]', host).hidden = true;
      const gain = record(ctx.key, 've-nha', right, qs.length);
      const out = resultHTML(ctx, right, qs.length, gain);
      const o = $('[data-out]', host); o.innerHTML = out; wireResult(o, ctx); o.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  function runMode(host, ctx) {
    if (RUNNERS[ctx.mode]) RUNNERS[ctx.mode](host, ctx);
    else if (ctx.mode === 've-nha') runHomework(host, ctx);
    else runSteps(host, ctx);
  }
  /* Kết thúc một trò chơi: ghi điểm, cộng XP và hiện kết quả chung (có nút Làm lại). */
  function finishGame(host, ctx, score, total) {
    const gain = record(ctx.key, ctx.mode, score, total);
    host.innerHTML = resultHTML(ctx, score, total, gain);
    wireResult(host, ctx);
    return gain;
  }
  /* Mã bài tập để giáo viên chấm: bài cuối tiết (-CT) và bài về nhà (-VN) của từng bài học. */
  const tokenFor = (key, mode) => !window.Classroom ? '' : window.Classroom.codeOf(key) + ({ 'khoi-dong': '-KD', 'cuoi-tiet': '-CT', 've-nha': '-VN' }[mode] || '');
  /* Trò chơi không sinh mã kết quả (chỉ tích XP). */
  const tokenForMode = (key, mode) => (MODES[mode] && MODES[mode].game ? '' : tokenFor(key, mode));

  /* ---------- Các trang ---------- */
  const cell = (b, m) => b && b[m] ? '<span class="chip chip--ok">' + b[m].s + '/' + b[m].t + '</span>' : '<span class="chip">chưa làm</span>';
  const lessonTitle = (c) => 'Bài ' + c.number + '. ' + c.title.vi;

  /* Trang các phần luyện tập của một bài */
  /* Câu hỏi AI luyện thêm: hiện khi máy có bộ câu hỏi AI của bài này (đã lưu hoặc đi kèm dự án). Chạy hoàn toàn offline. */
  function extraAI(g, meta, key) {
    const sets = window.AI && window.AI.forLesson ? window.AI.forLesson(key) : [];
    if (!sets.length) return '';
    const n = sets.reduce((a, x) => a + x.items.length, 0);
    return '<div class="join"><h2 class="prac__h prac__h--sm">Luyện thêm với câu hỏi AI</h2><p class="prac__note">Máy này có ' + n + ' câu do AI soạn cho bài này, duyệt bởi giáo viên.</p>' +
      sets.slice(0, 3).map((x) => '<a class="btn btn--ghost btn--sm" href="#/' + g.slug + '/' + meta.slug + '/bai-ai/' + esc(x.id) + '">🤖 ' + x.items.length + ' câu (' + esc(x.id) + ')</a>').join(' ') + '</div>';
  }
  function hub(g, meta, content, key, ws, mode) {
    const b = prog.best[key] || {};
    const join = window.Classroom ? '<div class="join"><h2 class="prac__h prac__h--sm">Bài giáo viên giao</h2>' + window.Classroom.joinForm() + '</div>' : '';
    const card = (m) =>
      '<a class="hubcard hubcard--' + m + '" href="#/' + g.slug + '/' + meta.slug + '/' + m + '"><span class="hubcard__ico" aria-hidden="true">' + MODES[m].icon + '</span>' +
      '<span class="hubcard__t">' + MODES[m].vi + '<small class="en" lang="en">' + MODES[m].en + '</small></span><span class="hubcard__n">' + MODES[m].note + '</span>' + cell(b, m) + '</a>';
    const games = shown(true);
    const gameSec = '<div class="hub hub--games">' + games.map(card).join('') + '</div>';
    if (mode === 'tro-choi') {
      return (ws ? '<h2 class="ws__h">Trò chơi khởi động<small class="en" lang="en">Warm-up games</small></h2>' : head(g, content, 'Trò chơi khởi động', meta)) +
        '<p class="prac__intro">Chơi vài phút trước khi đọc bài, hoặc ôn lại từ vựng đúng lúc sắp quên. Mỗi trò chơi đều tích điểm XP.</p>' + gameSec;
    }
    return (ws ? '<h2 class="ws__h">Bài tập và trắc nghiệm<small class="en" lang="en">Exercises and quizzes</small></h2>' : head(g, content, 'Luyện tập', meta)) + '<div class="hub">' + shown(false).map(card).join('') + '</div>' + extraAI(g, meta, key) + join;
  }
  function head(g, content, sub, meta) {
    return '<header class="lessons__head"><nav class="crumbs" aria-label="Đường dẫn"><a href="#/">Trang chủ</a>›<a href="#/' + g.slug + '">' + esc(g.label || 'Lớp ' + g.id) + '</a>›' +
      (meta ? '<a href="#/' + g.slug + '/' + meta.slug + '">Bài ' + esc(content.number) + '</a>›' : '') + '<span aria-current="page">' + esc(sub) + '</span></nav>' +
      '<h1 class="lessons__title"><span class="vi">' + esc(content ? lessonTitle(content) : sub) + '</span>' + (content ? '<span class="en" lang="en">' + esc(content.title.en) + '</span>' : '') + '</h1></header>';
  }

  /* Bảng điểm toàn lớp + hồ sơ + xếp hạng */
  function readBoard() { try { return JSON.parse(window.localStorage.getItem(BOARD)) || {}; } catch (e) { return {}; } }
  function writeBoard(b) { try { window.localStorage.setItem(BOARD, JSON.stringify(b)); } catch (e) { /* bỏ qua */ } }
  const myEntry = () => ({ n: prog.nick || 'Tôi', xp: prog.xp, st: streak(), hw: hwDone(), d: day() });
  function boardHTML() {
    const b = readBoard(); const me = myEntry(); me.me = true;
    const rows = Object.keys(b).map((k) => b[k]).filter((e) => e.n !== me.n).concat([me]).sort((a, c) => c.xp - a.xp || c.hw - a.hw);
    return '<table class="board"><thead><tr><th>Hạng</th><th>Biệt danh</th><th>XP</th><th>Chuỗi ngày</th><th>Bài về nhà</th></tr></thead><tbody>' +
      rows.map((e, i) => '<tr' + (e.me ? ' class="is-me"' : '') + '><td>' + (i < 3 ? ['🥇', '🥈', '🥉'][i] : i + 1) + '</td><td>' + esc(e.n) + (e.me ? ' (bạn)' : '') + '</td><td>' + e.xp + '</td><td>' + e.st + '</td><td>' + e.hw + '</td></tr>').join('') +
      '</tbody></table>';
  }
  function dashboard(g) {
    const all = g.topics.reduce((a, t) => a.concat(t.lessons), []).filter((l) => l.content && D.lessons[l.content]);
    const rows = all.map((l) => {
      const c = D.lessons[l.content]; const b = prog.best[l.content] || {};
      return '<tr><td><a href="#/' + g.slug + '/' + l.slug + '/luyen-tap">Bài ' + esc(c.number) + '. ' + esc(c.title.vi) + '</a></td><td>' + cell(b, 'khoi-dong') + '</td><td>' + cell(b, 'cuoi-tiet') + '</td><td>' + cell(b, 've-nha') + '</td></tr>';
    }).join('');
    const lessonTable = '<h2 class="prac__h">Điểm các bài</h2><div class="tablewrap"><table class="board board--lessons"><thead><tr><th>Bài</th><th>Khởi động</th><th>Cuối tiết</th><th>Về nhà</th></tr></thead><tbody>' + rows + '</tbody></table></div>';
    return head(g, null, 'Luyện tập và xếp hạng') + rankPanel(all.length, lessonTable);
  }
  /* Hồ sơ + bảng xếp hạng (dùng cho trang của khối lớp và cho tab "Bảng xếp hạng"). */
  function rankPanel(lessonCount, middle) {
    const stat = (n, l) => '<div class="stat"><b>' + n + '</b><span>' + l + '</span></div>';
    return '<section class="pracdash"><div class="stats">' + stat(prog.xp, 'điểm XP') + stat('Cấp ' + level(), (100 - prog.xp % 100) + ' XP nữa lên cấp') + stat(streak(), 'ngày học liên tiếp') + stat(hwDone() + '/' + lessonCount, 'bài về nhà đã nộp') + '</div>' +
      '<h2 class="prac__h">Hồ sơ của bạn</h2><form class="nickform" data-nick><label>Biệt danh (không dùng họ tên thật)<input type="text" maxlength="20" value="' + esc(prog.nick) + '" placeholder="VD: CaoThuToan"></label><button class="btn btn--primary btn--sm" type="submit">Lưu</button></form>' +
      (middle || '') +
      '<h2 class="prac__h">Bảng xếp hạng lớp</h2><p class="prac__intro">Không cần máy chủ: mỗi bạn sao chép <b>mã hồ sơ</b> của mình gửi cho cả lớp (hoặc giáo viên), rồi dán các mã vào ô dưới để cùng xếp hạng.</p>' +
      '<div class="prac__code"><p><b>Mã hồ sơ của bạn</b></p><textarea readonly rows="2" data-mycode aria-label="Mã hồ sơ"></textarea><button type="button" class="btn btn--ghost btn--sm" data-copymine>Sao chép mã</button></div>' +
      '<div class="prac__code"><p><b>Dán mã của các bạn</b> (mỗi mã một dòng)</p><textarea rows="3" data-paste placeholder="SGK1...." aria-label="Dán mã hồ sơ của bạn bè"></textarea>' +
      '<button type="button" class="btn btn--primary btn--sm" data-addboard>Thêm vào bảng</button> <button type="button" class="btn btn--ghost btn--sm" data-clearboard>Xoá bảng</button><p class="prac__msg" data-boardmsg aria-live="polite"></p></div>' +
      '<div data-board>' + boardHTML() + '</div><p class="prac__note">Dữ liệu chỉ lưu trên máy này. Xoá dữ liệu trình duyệt sẽ mất điểm.</p></section>';
  }
  function mountDashboard(root) {
    const mc = () => { $('[data-mycode]', root).value = enc(myEntry()); };
    mc();
    $('[data-nick]', root).addEventListener('submit', (e) => { e.preventDefault(); prog.nick = $('input', e.target).value.trim(); save(); mc(); $('[data-board]', root).innerHTML = boardHTML(); });
    $('[data-copymine]', root).addEventListener('click', (e) => copyText($('[data-mycode]', root).value, e.currentTarget));
    $('[data-addboard]', root).addEventListener('click', () => {
      const b = readBoard(); let n = 0;
      $('[data-paste]', root).value.split(/\s+/).forEach((line) => { const o = dec(line); if (o && typeof o.n === 'string' && typeof o.xp === 'number') { b[o.n] = { n: o.n.slice(0, 20), xp: o.xp | 0, st: o.st | 0, hw: o.hw | 0, d: o.d }; n++; } });
      writeBoard(b); $('[data-boardmsg]', root).textContent = n ? 'Đã thêm ' + n + ' mã.' : 'Không đọc được mã nào. Kiểm tra lại, mã bắt đầu bằng SGK1.';
      $('[data-board]', root).innerHTML = boardHTML();
      if (n) $('[data-paste]', root).value = '';
    });
    $('[data-clearboard]', root).addEventListener('click', () => { writeBoard({}); $('[data-board]', root).innerHTML = boardHTML(); $('[data-boardmsg]', root).textContent = 'Đã xoá bảng.'; });
  }

  /* ---------- Lối vào cho app.js ---------- */
  window.Practice = {
    modes: MODES,
    summary() { return { xp: prog.xp, level: level(), streak: streak(), hw: hwDone() }; },
    best(key) { return prog.best[key] || {}; },
    /* ---- Dành cho games.js ---- */
    /* Khung làm bài nhanh ở thanh bên: một câu ngẫu nhiên, đúng được +1 XP (tối đa 10 XP mỗi ngày). */
    quick(content) { return pick(build(content, 'khoi-dong').concat(quizItems(content).map(mcFromQuiz)), 1)[0] || null; },
    bonus(n) {
      const d = day();
      if (!prog.bonus || prog.bonus.d !== d) prog.bonus = { d: d, n: 0 };
      const give = Math.max(0, Math.min(n, 10 - prog.bonus.n));
      if (!give) return 0;
      prog.bonus.n += give; prog.xp += give;
      if (prog.days.indexOf(d) < 0) prog.days.push(d);
      save();
      try { document.dispatchEvent(new CustomEvent('sgk:progress', { detail: { kind: 'quick' } })); } catch (e) { /* trình duyệt cũ */ }
      return give;
    },
    /* Cộng XP thưởng (nhiệm vụ, huy hiệu). Người gọi tự bảo đảm chỉ cộng một lần. */
    award(n) { n = Math.max(0, n | 0); if (!n) return 0; prog.xp += n; save(); try { document.dispatchEvent(new CustomEvent('sgk:progress', { detail: { kind: 'award' } })); } catch (e) { /* bỏ qua */ } return n; },
    mark: mark,
    /* Số liệu cho huy hiệu (quests.js): số bài đạt điểm tuyệt đối, các chế độ đã chơi, XP, chuỗi ngày. */
    stats() {
      let perfect = 0; const modes = {};
      Object.keys(prog.best).forEach((k) => Object.keys(prog.best[k]).forEach((m) => { modes[m] = true; const b = prog.best[k][m]; if (b && b.t && b.s === b.t) perfect++; }));
      return { perfect: perfect, modes: Object.keys(modes), xp: prog.xp, streak: streak() };
    },
    registerMode(id, def, runner) { MODES[id] = Object.assign({ game: true }, def); RUNNERS[id] = runner; },
    vocabKeys: vocabKeys, build: build, shuffle: shuffle, finish: finishGame, record: record,
    promptHTML: promptHTML, optionHTML: optionHTML, whyHTML: whyHTML, answerText: answerText,
    /* Trả về { html, mount(root), title } cho một địa chỉ luyện tập. */
    /* ws = true: dùng trong khung hai cột (không in tiêu đề riêng, vì đã có thanh tab). */
    page(g, meta, mode, arg, ws) {
      if (!meta) return { title: 'Luyện tập và xếp hạng | Sách song ngữ', html: dashboard(g), mount: mountDashboard };
      const content = D.lessons[meta.content];
      const ctx = { grade: g, meta: meta, content: content, key: meta.content, mode: mode, tokenFor: tokenForMode(meta.content, mode) };
      if (mode === 'xep-hang') {
        const all = g.topics.reduce((a, t) => a.concat(t.lessons), []).filter((l) => l.content && D.lessons[l.content]);
        return { title: 'Bảng xếp hạng | ' + lessonTitle(content), html: '<h2 class="ws__h">Bảng xếp hạng<small class="en" lang="en">Leaderboard</small></h2>' + rankPanel(all.length, ''), mount: mountDashboard };
      }
      const isGame = MODES[mode] && MODES[mode].game;
      const back = '<p class="prac__back"><a href="#/' + g.slug + '/' + meta.slug + '/' + (isGame ? 'tro-choi' : 'luyen-tap') + '">‹ ' + (isGame ? 'Trò chơi khởi động' : 'Bài tập và trắc nghiệm') + '</a></p>';
      const top = (name) => ws ? back + '<h2 class="ws__h">' + esc(name) + '<small class="en" lang="en">' + esc(MODES[mode] ? MODES[mode].en : '') + '</small></h2>' : head(g, content, name, meta);
      if (mode === 'bai-giao' && window.Classroom) {
        const p = window.Classroom.parseCode(arg);
        if (!p || p.key !== meta.content) {
          return { title: 'Bài giáo viên giao | ' + lessonTitle(content), html: top('Bài giáo viên giao') + '<p class="prac__empty">Mã bài tập không đúng hoặc không thuộc bài này. Hỏi lại giáo viên rồi nhập lại mã.</p>' + window.Classroom.joinForm(), mount() {} };
        }
        const all = quizItems(content);
        ctx.tokenFor = p.code;
        ctx.qs = () => p.idx.map((i) => mcFromQuiz(all[i]));
        return {
          title: 'Bài ' + p.code + ' | ' + lessonTitle(content),
          html: top('Bài giáo viên giao') + '<p class="prac__intro">Mã bài tập <code>' + esc(p.code) + '</code>, ' + p.idx.length + ' câu. Làm xong em nhận một mã kết quả để gửi giáo viên.</p><section class="prac" data-prac></section>',
          mount(root) { runMode($('[data-prac]', root), ctx); }
        };
      }
      if (mode === 'bai-ai' && window.AI) {
        const set = window.AI.get(arg);
        if (!set || set.key !== meta.content) {
          return { title: 'Bài do AI soạn | ' + lessonTitle(content), html: top('Bài do AI soạn') + '<p class="prac__empty">Chưa có bộ câu hỏi này trên máy. Dán mã AI1 của giáo viên vào ô “Bài giáo viên giao”.</p>' + (window.Classroom ? window.Classroom.joinForm() : ''), mount() {} };
        }
        ctx.tokenFor = set.id;
        ctx.qs = () => set.items.map(mcFromQuiz);
        return {
          title: 'Bài ' + set.id + ' | ' + lessonTitle(content),
          html: top('Bài do AI soạn') + '<p class="prac__intro">Bộ câu hỏi <code>' + esc(set.id) + '</code>, ' + set.items.length + ' câu do trợ lý AI soạn và giáo viên duyệt. Làm xong em nhận mã kết quả để gửi giáo viên.</p><section class="prac" data-prac></section>',
          mount(root) { runMode($('[data-prac]', root), ctx); }
        };
      }
      if (!MODES[mode] || mode === 'tro-choi') return { title: (mode === 'tro-choi' ? 'Trò chơi khởi động' : 'Luyện tập') + ' | ' + lessonTitle(content), html: hub(g, meta, content, meta.content, ws, mode), mount() {} };
      return {
        title: MODES[mode].vi + ' | ' + lessonTitle(content),
        html: top(MODES[mode].vi) + '<section class="prac" data-prac></section>',
        mount(root) { runMode($('[data-prac]', root), ctx); }
      };
    }
  };
})();
