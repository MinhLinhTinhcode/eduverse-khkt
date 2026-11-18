/* ==========================================================================
   TRÒ CHƠI KHỞI ĐỘNG (Warm-up games)
   --------------------------------------------------------------------------
   Ba trò chơi ngắn, TỰ SINH từ từ điển thuật ngữ của từng bài (không phải
   soạn thêm dữ liệu). Cả ba cắm vào hệ thống luyện tập qua
   Practice.registerMode, nên dùng chung XP, chuỗi ngày học, địa chỉ
   (#/lop-9/bai-10a/ghep-cap …) và nút "Làm lại" của practice.js.

     ghep-cap   Ghép cặp thuật ngữ Anh – Việt (6 cặp, trừ điểm khi ghép sai)
     the-nho    Thẻ ghi nhớ: lật thẻ, tự đánh giá "đã nhớ / chưa nhớ"
     thu-thach  Thử thách nhanh: 3 câu trắc nghiệm, mỗi câu 15 giây

   Nút nghe phát âm dùng thuộc tính data-say và từ dùng thẻ .vocab, nên
   được app.js xử lí như mọi nơi khác (IPA, giọng Anh/Mỹ không đổi).
   ========================================================================== */
(function () {
  'use strict';
  const P = window.Practice;
  if (!P) return;                                   // thiếu practice.js thì bỏ qua, app vẫn chạy
  const GLOSS = window.TEXTBOOK.glossary;
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const plain = (s) => window.TextbookFmt.plain(s);
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const MIN_TERMS = 4;

  const termsOf = (ctx) => P.vocabKeys(ctx.content).filter((k) => GLOSS[k] && GLOSS[k].vi);
  const word = (k) => plain(GLOSS[k].word);
  const mmss = (ms) => { const s = Math.floor(ms / 1000); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
  const tooFew = (host) => { host.innerHTML = '<p class="prac__empty">Bài này có ít thuật ngữ nên chưa tạo được trò chơi. Hãy thử “Bài tập cuối tiết”.</p>'; };
  /* Dừng bộ đếm khi học sinh rời trang (phần tử không còn trong tài liệu). */
  const every = (host, ms, fn) => { const id = window.setInterval(() => { if (!host.isConnected) window.clearInterval(id); else fn(); }, ms); return () => window.clearInterval(id); };
  const learnedRow = (k) => {
    const e = GLOSS[k], w = word(k);
    return '<li class="mg__row"><span class="vocab" role="button" tabindex="0" aria-expanded="false" data-key="' + esc(k) + '" lang="en">' + esc(w) + '</span> ' +
      '<span class="ipa">' + esc(e.ipa || '') + '</span> <button type="button" class="btn-icon prac__say" data-say="' + esc(w) + '" aria-label="Nghe phát âm từ ' + esc(w) + '">🔊</button> <span class="mg__vi">' + esc(e.vi) + '</span></li>';
  };

  /* ---------------------------------------------------------------- Ghép cặp */
  function runMatch(host, ctx) {
    const all = termsOf(ctx);
    if (all.length < MIN_TERMS) { tooFew(host); return; }
    const keys = P.shuffle(all).slice(0, 6), n = keys.length;
    const en = P.shuffle(keys), vi = P.shuffle(keys);
    let picked = null, matched = 0, miss = 0, busy = false;
    const bad = {};                                    // từ đã ghép sai ít nhất một lần (chỉ báo cho bộ ôn từ một lần)
    const t0 = Date.now();

    const btn = (side, k) => '<li><button type="button" class="mg__b" data-side="' + side + '" data-k="' + esc(k) + '" aria-pressed="false"' + (side === 'en' ? ' lang="en"' : '') + '>' +
      (side === 'en' ? '<span>' + esc(word(k)) + '</span><small class="ipa">' + esc(GLOSS[k].ipa || '') + '</small>' : '<span>' + esc(GLOSS[k].vi) + '</span>') + '</button></li>';
    host.innerHTML = '<p class="prac__intro">Bấm một từ tiếng Anh, rồi bấm nghĩa tiếng Việt của nó. Ghép đủ ' + n + ' cặp. Mỗi lần ghép sai bị trừ 1 điểm.</p>' +
      '<div class="mg"><p class="mg__bar"><span data-mg-n>0/' + n + ' cặp</span><span data-mg-miss>Ghép sai: 0</span><span data-mg-time>0:00</span></p>' +
      '<div class="mg__cols"><ul class="mg__col" aria-label="Từ tiếng Anh">' + en.map((k) => btn('en', k)).join('') + '</ul>' +
      '<ul class="mg__col" aria-label="Nghĩa tiếng Việt">' + vi.map((k) => btn('vi', k)).join('') + '</ul></div>' +
      '<ul class="mg__done" data-mg-done aria-live="polite"></ul></div>';
    const root = $('.mg', host);                      // người nghe gắn vào root, bị bỏ đi khi vẽ lại (Làm lại)
    const stop = every(host, 1000, () => { $('[data-mg-time]', host).textContent = mmss(Date.now() - t0); });
    const clear = () => { picked = null; $$('.mg__b', host).forEach((b) => { b.setAttribute('aria-pressed', 'false'); b.classList.remove('is-pick'); }); };

    root.addEventListener('click', (e) => {
      const b = e.target.closest('.mg__b');
      if (!b || busy || b.disabled) return;
      if (!picked || picked.dataset.side === b.dataset.side) {            // chọn mới (hoặc đổi sang nút khác cùng cột)
        clear(); picked = b; b.setAttribute('aria-pressed', 'true'); b.classList.add('is-pick'); return;
      }
      const a = picked, ok = a.dataset.k === b.dataset.k;
      if (ok) {
        [a, b].forEach((x) => { x.disabled = true; x.classList.remove('is-pick'); x.classList.add('is-done'); x.setAttribute('aria-pressed', 'true'); });
        picked = null; matched++;
        if (!bad[a.dataset.k]) P.mark(a.dataset.k, true);
        $('[data-mg-done]', host).insertAdjacentHTML('afterbegin', learnedRow(a.dataset.k));
        $('[data-mg-n]', host).textContent = matched + '/' + n + ' cặp';
        if (matched === n) { stop(); window.setTimeout(() => { if (host.isConnected) P.finish(host, ctx, Math.max(0, n - miss), n); }, 700); }
      } else {
        miss++; busy = true;
        [a, b].forEach((x) => { if (!bad[x.dataset.k]) { bad[x.dataset.k] = true; P.mark(x.dataset.k, false); } });
        $('[data-mg-miss]', host).textContent = 'Ghép sai: ' + miss;
        [a, b].forEach((x) => x.classList.add('is-bad'));
        window.setTimeout(() => { [a, b].forEach((x) => x.classList.remove('is-bad')); clear(); busy = false; }, 550);
      }
    });
  }

  /* ---------------------------------------------------------------- Thẻ ghi nhớ */
  function runCards(host, ctx) {
    const all = termsOf(ctx);
    if (all.length < MIN_TERMS) { tooFew(host); return; }
    const keys = P.shuffle(all).slice(0, 8), n = keys.length;
    const queue = keys.slice(), first = {}, again = {};
    let known = 0, flipped = false;
    host.innerHTML = '<div data-fcroot></div>';
    const root = $('[data-fcroot]', host);

    function paint() {
      const k = queue[0], e = GLOSS[k], w = word(k);
      const front = '<span class="fc__w" lang="en">' + esc(w) + '</span><span class="ipa fc__ipa">' + esc(e.ipa || '') + '</span><span class="fc__hint">Bấm để lật thẻ</span>';
      const back = '<span class="fc__vi">' + esc(e.vi) + '</span>' + (e.ex ? '<span class="fc__ex" lang="en">' + esc(plain(e.ex.en)) + '</span><span class="fc__exvi">' + esc(plain(e.ex.vi)) + '</span>' : '');
      root.innerHTML = '<div class="fc"><p class="mg__bar"><span>Đã xem ' + Object.keys(first).length + '/' + n + ' thẻ</span><span>Đã nhớ: ' + known + '</span></p>' +
        '<div class="fc__row"><button type="button" class="fc__card' + (flipped ? ' is-flipped' : '') + '" data-flip aria-label="' + (flipped ? 'Mặt sau: nghĩa tiếng Việt. Bấm để lật lại' : 'Mặt trước: từ tiếng Anh. Bấm để lật thẻ') + '">' + (flipped ? back : front) + '</button>' +
        '<button type="button" class="btn-icon prac__say" data-say="' + esc(w) + '" aria-label="Nghe phát âm">🔊</button></div>' +
        '<div class="prac__act">' + (flipped
          ? '<button type="button" class="btn btn--ghost" data-no>✘ Chưa nhớ <kbd>←</kbd></button><button type="button" class="btn btn--primary" data-yes>✔ Đã nhớ <kbd>→</kbd></button>'
          : '<button type="button" class="btn btn--primary" data-flipbtn>Lật thẻ</button>') + '</div>' +
        '<p class="prac__note">Thẻ chưa nhớ sẽ quay lại một lần ở cuối bộ. Điểm tính theo số thẻ nhớ ngay lần đầu.</p></div>';
      (flipped ? $('[data-yes]', root) : $('[data-flip]', root)).focus();
    }
    const flip = () => { flipped = !flipped; paint(); };
    function answer(yes) {
      const k = queue.shift();
      if (first[k] === undefined) { first[k] = yes; P.mark(k, yes); if (yes) known++; }
      if (!yes && !again[k]) { again[k] = true; queue.push(k); }
      flipped = false;
      if (!queue.length) { P.finish(host, ctx, known, n); return; }
      paint();
    }
    root.addEventListener('click', (e) => {
      if (e.target.closest('[data-flip], [data-flipbtn]')) flip();
      else if (e.target.closest('[data-yes]')) answer(true);
      else if (e.target.closest('[data-no]')) answer(false);
    });
    root.addEventListener('keydown', (e) => {
      if (!flipped) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); answer(true); } else if (e.key === 'ArrowLeft') { e.preventDefault(); answer(false); }
    });
    paint();
  }

  /* ---------------------------------------------------------------- Thử thách nhanh */
  const SECONDS = 15;
  function runChallenge(host, ctx) {
    const qs = P.shuffle(P.build(ctx.content, 'khoi-dong')).slice(0, 3);
    if (qs.length < 3) { tooFew(host); return; }
    let i = 0, right = 0, stopTimer = null;

    function ask() {
      const q = qs[i], t0 = Date.now();
      host.innerHTML = '<div class="prac__bar"><span>Câu ' + (i + 1) + '/3</span><span class="tc__t" aria-hidden="true"><i data-tc></i></span><b class="tc__s" data-tc-s>' + SECONDS + ' s</b></div>' +
        '<div class="prac__q">' + P.promptHTML(q, i, false) + '</div>' +
        '<div class="q__opts q__opts--2">' + q.options.map((o, oi) => P.optionHTML(q, o, oi)).join('') + '</div>' +
        '<div class="prac__fb" aria-live="polite"></div>' +
        '<div class="prac__act"><button type="button" class="btn btn--primary" data-next hidden>' + (i === 2 ? 'Xem kết quả' : 'Câu tiếp') + '</button></div>';
      const opts = $$('.opt', host), bar = $('[data-tc]', host), lab = $('[data-tc-s]', host);
      function settle(v) {                                  // v = chỉ số đã chọn, hoặc -1 nếu hết giờ
        if (stopTimer) { stopTimer(); stopTimer = null; }
        const ok = v === q.answer; if (ok) right++;
        P.mark(q.key, ok);
        opts.forEach((x, xi) => { x.disabled = true; x.classList.toggle('is-right', xi === q.answer); x.classList.toggle('is-wrong', xi === v && !ok); });
        $('.prac__fb', host).innerHTML = '<p class="prac__verdict ' + (ok ? 'is-ok' : 'is-bad') + '">' + (ok ? '✔ Đúng rồi!' : v < 0 ? '⏱ Hết giờ. Đáp án: ' + esc(P.answerText(q)) : '✘ Chưa đúng. Đáp án: ' + esc(P.answerText(q))) + '</p>' + P.whyHTML(q);
        const nx = $('[data-next]', host); nx.hidden = false; nx.focus();
      }
      opts.forEach((o) => o.addEventListener('click', () => settle(Number(o.dataset.i))));
      $('[data-next]', host).addEventListener('click', () => { i++; if (i < 3) ask(); else P.finish(host, ctx, right, 3); });
      stopTimer = every(host, 100, () => {
        const left = Math.max(0, SECONDS * 1000 - (Date.now() - t0));
        bar.style.width = (left / (SECONDS * 10)) + '%';
        lab.textContent = Math.ceil(left / 1000) + ' s';
        if (left <= 0) settle(-1);
      });
    }
    ask();
  }

  P.registerMode('ghep-cap', { vi: 'Ghép cặp thuật ngữ', en: 'Term matching', note: 'Ghép từ tiếng Anh với nghĩa tiếng Việt. Ít ghép sai thì điểm cao.', xp: 2, icon: '🧩' }, runMatch);
  P.registerMode('the-nho', { vi: 'Thẻ ghi nhớ', en: 'Flashcards', note: 'Lật thẻ, nghe phát âm, tự đánh giá đã nhớ hay chưa.', xp: 1, icon: '🃏' }, runCards);
  P.registerMode('thu-thach', { vi: 'Thử thách nhanh 3 câu', en: 'Quick challenge', note: 'Ba câu, mỗi câu 15 giây. Trả lời nhanh và đúng để tích XP.', xp: 3, icon: '⚡' }, runChallenge);

  /* Dải khởi động đặt ở đầu mỗi bài học (app.js gọi khi dựng trình đọc). */
  window.Games = {
    strip(g, meta) {
      const content = window.TEXTBOOK.lessons[meta.content];
      if (!content || termsOf({ content: content }).length < MIN_TERMS) return '';
      const base = '#/' + g.slug + '/' + meta.slug + '/';
      const best = P.best(meta.content);
      const link = (id) => '<a class="btn btn--ghost btn--sm" href="' + base + id + '">' + P.modes[id].icon + ' ' + P.modes[id].vi + (best[id] ? ' <span class="chip chip--ok">' + best[id].s + '/' + best[id].t + '</span>' : '') + '</a>';
      return '<aside class="warm" aria-label="Khởi động trước khi đọc bài"><p class="warm__t"><b>⚡ Khởi động</b><span class="en" lang="en">Warm up before you read</span></p>' +
        '<div class="warm__b">' + link('ghep-cap') + link('the-nho') + link('thu-thach') + '</div></aside>';
    }
  };
})();
