/* ==========================================================================
   ÔN TỪ THÔNG MINH (lặp lại ngắt quãng) + BẢN ĐỒ THÀNH THẠO + SỔ LỖI SAI
   --------------------------------------------------------------------------
   Ý tưởng lấy từ phương pháp hộp Leitner (Quizlet "Learn", Duolingo ôn lỗi):
   mỗi thuật ngữ nằm trong một "hộp" 0 đến 5. Trả lời đúng thì lên hộp và lần
   ôn kế tiếp xa hơn (1, 3, 7, 14, 30 ngày); trả lời sai thì về hộp 0 và quay
   lại ngay. Mức thành thạo kiểu Khan Academy hiển thị thành bản đồ màu.

   Dữ liệu chỉ nằm trong localStorage (khoá sgk.srs), không cần máy chủ.
   Mọi chỗ chấm một thuật ngữ gọi Practice.mark(key, đúng/sai) → SRS.grade.

     SRS.grade(key, ok)   ghi kết quả một lần trả lời
     SRS.due(keys)        các từ đến hạn ôn (cả từ chưa từng học)
     SRS.level(key)       0 chưa học, 1 đang học, 2 khá, 3 thành thạo
     SRS.wrong(keys)      các từ đang ở hộp 0 và từng sai
     SRS.totals()         {reviews, mastered} cho huy hiệu

   Chế độ trong tab "Trò chơi": on-tu (Ôn từ thông minh), so-loi (Sổ lỗi sai).
   Thanh bên: Review.side(g, meta) vẽ bản đồ thành thạo của bài.
   ========================================================================== */
(function () {
  'use strict';
  const D = window.TEXTBOOK, GLOSS = D.glossary;
  const K = 'sgk.srs', META = '~', GAP = [0, 1, 3, 7, 14, 30];
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const plain = (s) => window.TextbookFmt.plain(s);
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  /* Số ngày tính theo giờ địa phương để "ngày mới" bắt đầu lúc nửa đêm của học sinh. */
  const today = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 864e5);

  /* ---------------------------------------------------------------- Lõi SRS */
  function load() { try { const v = JSON.parse(window.localStorage.getItem(K)); return v && typeof v === 'object' ? v : {}; } catch (e) { return {}; } }
  function store(s) { try { window.localStorage.setItem(K, JSON.stringify(s)); } catch (e) { /* bỏ qua */ } }

  function grade(key, ok) {
    if (!key || !GLOSS[key]) return;
    const s = load(), c = s[key] || { b: 0, d: 0, w: 0, n: 0 };
    c.n++; c.b = ok ? Math.min(c.b + 1, 5) : 0;
    if (!ok) c.w++;
    c.d = today() + GAP[c.b];
    s[key] = c;
    const m = s[META] || { r: 0 }; m.r++; s[META] = m;
    store(s);
    try { document.dispatchEvent(new CustomEvent('sgk:srs', { detail: { key: key, ok: !!ok } })); } catch (e) { /* trình duyệt cũ */ }
  }
  const cellOf = (key) => load()[key] || null;
  const level = (key) => { const c = cellOf(key); return !c ? 0 : c.b >= 5 ? 3 : c.b >= 3 ? 2 : 1; };
  function due(keys) {
    const s = load(), t = today();
    return keys.filter((k) => !s[k] || s[k].d <= t);
  }
  const wrong = (keys) => { const s = load(); return keys.filter((k) => s[k] && s[k].b === 0 && s[k].w > 0); };
  function totals() {
    const s = load();
    return { reviews: (s[META] && s[META].r) || 0, mastered: Object.keys(s).filter((k) => k !== META && s[k].b >= 5).length };
  }
  /* Sắp xếp để ôn: từ vừa sai trước, rồi từ mới, rồi từ quá hạn lâu nhất. */
  function order(keys) {
    const s = load();
    const rank = (k) => { const c = s[k]; return !c ? 1 : (c.b === 0 && c.w > 0 ? 0 : 2); };
    return keys.slice().sort((a, b) => rank(a) - rank(b) || ((s[a] ? s[a].d : 0) - (s[b] ? s[b].d : 0)));
  }

  window.SRS = { grade: grade, due: due, level: level, wrong: wrong, totals: totals, cell: cellOf };

  /* Từ đây trở xuống cần hệ thống luyện tập; thiếu practice.js thì chỉ giữ lõi SRS. */
  const P = window.Practice;
  if (!P) return;

  const termsOf = (content) => P.vocabKeys(content).filter((k) => GLOSS[k] && GLOSS[k].vi);
  const word = (k) => plain(GLOSS[k].word);
  const LV = ['Chưa học', 'Đang học', 'Khá', 'Thành thạo'];

  /* ---------------------------------------------------------------- Bản đồ thành thạo */
  function counts(keys) {
    const c = [0, 0, 0, 0];
    keys.forEach((k) => { c[level(k)]++; });
    return c;
  }
  function mapHTML(content) {
    const keys = termsOf(content);
    if (!keys.length) return '<p class="prac__note">Bài này chưa có thuật ngữ.</p>';
    const c = counts(keys), d = due(keys).length;
    return '<ul class="sm" aria-label="Mức thành thạo từng thuật ngữ">' + keys.map((k) =>
      '<li><span class="vocab sm__c sm__c--' + level(k) + '" role="button" tabindex="0" aria-expanded="false" data-key="' + esc(k) + '" lang="en" title="' + esc(LV[level(k)]) + '">' + esc(word(k)) + '</span></li>').join('') + '</ul>' +
      '<p class="sm__key">' + LV.map((n, i) => '<span class="sm__k"><i class="sm__c sm__c--' + i + '" aria-hidden="true"></i>' + n + ' <b>' + c[i] + '</b></span>').join('') + '</p>' +
      '<p class="sm__due">' + (d ? '<b>' + d + '</b> từ đến hạn ôn hôm nay' : 'Hôm nay đã ôn đủ. Hẹn bạn ngày mai!') + '</p>';
  }
  function side(g, meta) {
    const content = D.lessons[meta.content];
    if (!content || !termsOf(content).length) return '';
    const keys = termsOf(content), d = due(keys).length, w = wrong(keys).length, base = '#/' + g.slug + '/' + meta.slug + '/';
    return '<section class="sw"><h2 class="sw__h">Bản đồ thành thạo<small class="en" lang="en">Mastery map</small></h2>' +
      '<div data-srsmap data-srs-content="' + esc(meta.content) + '">' + mapHTML(content) + '</div>' +
      '<div class="sm__act"><a class="btn btn--primary btn--sm" href="' + base + 'on-tu">🧠 Ôn từ thông minh</a>' +
      '<a class="btn btn--ghost btn--sm" href="' + base + 'so-loi" data-srs-wrong>📕 Sổ lỗi sai (' + w + ')</a></div></section>';
  }
  /* Điểm mới ghi → vẽ lại bản đồ và bộ đếm lỗi sai. */
  document.addEventListener('sgk:srs', () => {
    const box = $('[data-srsmap]');
    if (!box) return;
    const content = D.lessons[box.dataset.srsContent];
    if (!content) return;
    box.innerHTML = mapHTML(content);
    const a = $('[data-srs-wrong]');
    if (a) a.textContent = '📕 Sổ lỗi sai (' + wrong(termsOf(content)).length + ')';
  });

  /* ---------------------------------------------------------------- Giọng đọc */
  function voiceInfo() {
    const ok = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
    if (!ok) return { can: false, local: false };
    const v = (window.speechSynthesis.getVoices() || []).filter((x) => /^en/i.test(x.lang || ''));
    if (!v.length) return { can: true, local: true };               // danh sách giọng nạp chậm: cứ cho thử
    return { can: true, local: v.some((x) => x.localService) };
  }
  const say = (host, text) => {                                       // dùng bộ phát âm chung (giữ giọng Anh/Mỹ đã chọn)
    const b = document.createElement('button');
    b.type = 'button'; b.hidden = true; b.dataset.say = text; host.appendChild(b); b.click(); b.remove();
  };

  /* ---------------------------------------------------------------- Câu hỏi ôn */
  const shuffle = P.shuffle;
  function distract(k, pool, pick, n) {
    const seen = {}, out = [], right = pick(GLOSS[k]);
    seen[right] = true;
    shuffle(pool).concat(shuffle(Object.keys(GLOSS))).forEach((x) => {
      if (out.length >= n || x === k || !GLOSS[x]) return;
      const v = pick(GLOSS[x]);
      if (!v || seen[v]) return;
      seen[v] = true; out.push(v);
    });
    return out;
  }
  /* Dạng câu hỏi theo mức: mới học thì xem từ Anh chọn nghĩa; khá thì xem nghĩa chọn từ; thành thạo thì nghe và chọn. */
  function question(k, pool, canListen) {
    const lv = level(k), e = GLOSS[k];
    const kind = lv >= 3 && canListen ? 'listen' : lv >= 2 ? 'vi2en' : 'en2vi';
    const pick = kind === 'en2vi' ? (x) => x.vi : (x) => plain(x.word);
    const right = pick(e), options = shuffle([right].concat(distract(k, pool, pick, 3)));
    return { kind: 'mc', key: k, dir: kind, options: options, answer: options.indexOf(right),
      whyVi: '“' + word(k) + '” nghĩa là “' + e.vi + '”. ' + (e.ctx || ''), whyEn: e.ex ? e.ex.en : '' };
  }
  const promptOf = (q, i) => q.dir === 'listen'
    ? '<p class="vi"><b class="q__no">Câu ' + (i + 1) + '.</b> Nghe và chọn từ đúng.</p><p class="prac__word"><button type="button" class="btn btn--ghost btn--sm" data-say="' + esc(word(q.key)) + '" aria-label="Nghe lại">🔊 Nghe lại</button></p>'
    : P.promptHTML(q, i, true);

  function runQuestions(host, ctx, keys, pool) {
    const canL = voiceInfo().can;
    const qs = keys.map((k) => question(k, pool, canL));
    let i = 0, right = 0;
    function ask() {
      const q = qs[i];
      host.innerHTML = '<div class="prac__bar"><span>Từ ' + (i + 1) + '/' + qs.length + '</span><span class="prac__prog" role="progressbar" aria-valuemin="0" aria-valuemax="' + qs.length + '" aria-valuenow="' + i + '"><i style="width:' + (i / qs.length * 100) + '%"></i></span></div>' +
        '<div class="prac__q">' + promptOf(q, i) + '</div><div class="q__opts q__opts--2">' + q.options.map((o, oi) => P.optionHTML(q, o, oi)).join('') + '</div>' +
        '<div class="prac__fb" aria-live="polite"></div><div class="prac__act"><button type="button" class="btn btn--primary" data-next hidden>' + (i === qs.length - 1 ? 'Xem kết quả' : 'Câu tiếp') + '</button></div>';
      if (q.dir === 'listen') say(host, word(q.key));
      $$('.opt', host).forEach((o) => o.addEventListener('click', () => {
        const v = Number(o.dataset.i), ok = v === q.answer;
        if (ok) right++;
        P.mark(q.key, ok);
        $$('.opt', host).forEach((x, xi) => { x.disabled = true; x.classList.toggle('is-right', xi === q.answer); x.classList.toggle('is-wrong', xi === v && !ok); });
        const c = cellOf(q.key), nxt = c && c.b ? 'Lần ôn kế tiếp sau ' + GAP[c.b] + ' ngày.' : 'Từ này sẽ quay lại sớm.';
        $('.prac__fb', host).innerHTML = '<p class="prac__verdict ' + (ok ? 'is-ok' : 'is-bad') + '">' + (ok ? '✔ Đúng rồi! ' : '✘ Chưa đúng. Đáp án: ' + esc(P.answerText(q)) + '. ') + nxt + '</p>' + P.whyHTML(q);
        const n = $('[data-next]', host); n.hidden = false; n.focus();
      }));
      $('[data-next]', host).addEventListener('click', () => { i++; if (i < qs.length) ask(); else P.finish(host, ctx, right, qs.length); });
    }
    ask();
  }

  /* ---------------------------------------------------------------- Hai chế độ */
  const MAX_Q = 8;
  function start(host, ctx, intro, keys, pool, note) {
    const vi = voiceInfo();
    host.innerHTML = '<p class="prac__intro">' + intro + '</p>' + (note ? '<p class="prac__note">' + note + '</p>' : '') +
      '<div class="sm__wrap">' + mapHTML(ctx.content) + '</div>' +
      (!vi.can ? '<p class="prac__note">Trình duyệt này chưa hỗ trợ đọc thành tiếng nên câu “nghe và chọn” sẽ không xuất hiện.</p>' : !vi.local ? '<p class="prac__note">Máy này chỉ có giọng đọc tiếng Anh cần Internet. Khi mất mạng, câu “nghe và chọn” có thể không phát tiếng.</p>' : '') +
      '<div class="prac__act"><button type="button" class="btn btn--primary" data-go>Bắt đầu ôn ' + keys.length + ' từ</button></div>';
    $('[data-go]', host).addEventListener('click', () => runQuestions(host, ctx, keys, pool));
  }
  function runReview(host, ctx) {
    const pool = termsOf(ctx.content);
    if (!pool.length) { host.innerHTML = '<p class="prac__empty">Bài này chưa có thuật ngữ để ôn.</p>'; return; }
    const d = due(pool);
    if (d.length) {
      const keys = order(d).slice(0, MAX_Q);
      start(host, ctx, 'Có <b>' + d.length + '</b> từ đến hạn ôn. Từ làm sai quay lại ngay, từ làm đúng được giãn ra 1, 3, 7, 14, 30 ngày.', keys, pool, d.length > MAX_Q ? 'Mỗi lượt ôn ' + MAX_Q + ' từ. Làm xong có thể ôn tiếp.' : '');
    } else {
      const s = load();
      const early = pool.slice().sort((a, b) => (s[a] ? s[a].d : 0) - (s[b] ? s[b].d : 0)).slice(0, 6);
      start(host, ctx, 'Hôm nay bạn đã ôn hết các từ đến hạn. Muốn, bạn vẫn có thể ôn trước vài từ sắp đến hạn.', early, pool, 'Ôn trước vẫn được tính XP, nhưng không làm lịch ôn xa hơn quá mức cần thiết.');
    }
  }
  function runMistakes(host, ctx) {
    const pool = termsOf(ctx.content), w = wrong(pool);
    if (!w.length) {
      host.innerHTML = '<p class="prac__empty">Chưa có thuật ngữ nào bạn đang sai trong bài này. Hãy chơi “Ôn từ thông minh” hoặc “Thử thách nhanh”, từ làm sai sẽ được ghi vào đây.</p>' +
        '<div class="sm__wrap">' + mapHTML(ctx.content) + '</div>';
      return;
    }
    start(host, ctx, 'Sổ lỗi sai có <b>' + w.length + '</b> thuật ngữ: ' + w.slice(0, 8).map((k) => '<span class="vocab" role="button" tabindex="0" aria-expanded="false" data-key="' + esc(k) + '" lang="en">' + esc(word(k)) + '</span>').join(', ') + (w.length > 8 ? '…' : '') + '. Đúng liên tiếp thì từ sẽ rời khỏi sổ.', order(w).slice(0, MAX_Q), pool, '');
  }

  P.registerMode('on-tu', { vi: 'Ôn từ thông minh', en: 'Smart review', note: 'Từ sai quay lại sớm, từ đúng được giãn ra 1, 3, 7, 14 ngày.', xp: 2, icon: '🧠' }, runReview);
  P.registerMode('so-loi', { vi: 'Sổ lỗi sai', en: 'Mistake notebook', note: 'Tự gom những thuật ngữ bạn từng làm sai để ôn lại.', xp: 2, icon: '📕' }, runMistakes);

  window.Review = { side: side, mapHTML: mapHTML, counts: counts };
})();
