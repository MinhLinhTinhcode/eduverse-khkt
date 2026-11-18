/* ==========================================================================
   MƯA THUẬT NGỮ (Term rain)
   --------------------------------------------------------------------------
   Lấy ý tưởng từ chế độ "Gravity" của Quizlet: nghĩa tiếng Việt (hoặc tiếng
   đọc mẫu) rơi dần xuống, học sinh gõ đúng thuật ngữ tiếng Anh trước khi nó
   chạm đáy. Luyện chính tả thuật ngữ và, ở chế độ nghe, luyện nghe – viết.

   - 10 thuật ngữ mỗi ván, 3 mạng, mỗi từ rơi nhanh dần.
   - Gõ đúng là tự bắn (hoặc nhấn Enter). Điểm = số từ bắn trúng, tối đa 10.
   - Mỗi từ trúng hoặc trượt đều báo cho bộ ôn từ thông minh (Practice.mark).
   - Đăng ký qua Practice.registerMode nên dùng chung XP, "Làm lại", địa chỉ
     #/lop-9/bai-10a/mua-thuat-ngu. Dữ liệu tự sinh từ từ điển của bài.
   ========================================================================== */
(function () {
  'use strict';
  const P = window.Practice;
  if (!P) return;
  const GLOSS = window.TEXTBOOK.glossary;
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const plain = (s) => window.TextbookFmt.plain(s);
  const $ = (s, r) => (r || document).querySelector(s);
  const TOTAL = 10, LIVES = 3, MIN_TERMS = 4, FIELD_H = 340;

  const termsOf = (ctx) => P.vocabKeys(ctx.content).filter((k) => GLOSS[k] && GLOSS[k].vi && GLOSS[k].word);
  const word = (k) => plain(GLOSS[k].word);
  /* So sánh không phân biệt hoa thường, bỏ khoảng trắng và dấu câu: "Data-Validation" = "data validation". */
  const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '');
  const canSpeak = () => 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  const reduced = () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const say = (host, text) => {                                  // dùng bộ phát âm chung của sách (giữ giọng Anh/Mỹ)
    const b = document.createElement('button');
    b.type = 'button'; b.hidden = true; b.dataset.say = text; host.appendChild(b); b.click(); b.remove();
  };

  function runRain(host, ctx) {
    const pool = termsOf(ctx);
    if (pool.length < MIN_TERMS) { host.innerHTML = '<p class="prac__empty">Bài này có ít thuật ngữ nên chưa tạo được trò chơi. Hãy thử “Ôn từ thông minh”.</p>'; return; }
    host.innerHTML = '<p class="prac__intro">Thuật ngữ rơi xuống như mưa. Gõ đúng từ tiếng Anh trước khi nó chạm đáy. Bạn có ' + LIVES + ' mạng, mỗi ván tối đa ' + TOTAL + ' từ.</p>' +
      '<div class="prac__act"><button type="button" class="btn btn--primary" data-rmode="vi">🌧️ Nhìn nghĩa, gõ từ tiếng Anh</button>' +
      (canSpeak() ? '<button type="button" class="btn btn--ghost" data-rmode="listen">🎧 Nghe, gõ từ tiếng Anh</button>' : '') + '</div>' +
      '<p class="prac__note">Chế độ nghe phát âm từ bằng giọng đọc của máy (Anh hoặc Mỹ chọn ở thanh công cụ). Bấm vào giọt mưa để nghe lại.</p>';
    host.addEventListener('click', function once(e) {
      const b = e.target.closest('[data-rmode]');
      if (!b) return;
      host.removeEventListener('click', once);
      play(host, ctx, pool, b.dataset.rmode);
    });
  }

  function play(host, ctx, pool, mode) {
    const keys = P.shuffle(pool).slice(0, Math.min(TOTAL, pool.length)), n = keys.length;
    let spawned = 0, score = 0, lives = LIVES, over = false, last = 0, sinceSpawn = 1e9;
    const falling = [];                                            // {k, el, y, speed}
    const slow = reduced() ? 1.6 : 1;

    host.innerHTML = '<div class="rn"><p class="mg__bar"><span data-rn-lives aria-label="Số mạng còn lại"></span><span data-rn-score>Điểm: 0/' + n + '</span><span data-rn-left>Còn ' + n + ' từ</span></p>' +
      '<div class="rn__field" data-field aria-live="off"></div>' +
      '<form class="rn__form" data-rn-form autocomplete="off"><input type="text" class="rn__in" data-rn-in placeholder="Gõ từ tiếng Anh rồi nhấn Enter" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Gõ từ tiếng Anh"><button type="submit" class="btn btn--primary">Bắn</button>' + (mode === 'listen' ? '<button type="button" class="btn btn--ghost" data-rn-replay>🔊 Nghe lại</button>' : '') + '</form>' +
      '<p class="rn__fb" data-rn-fb aria-live="polite"></p></div>';
    const root = $('.rn', host), field = $('[data-field]', root), input = $('[data-rn-in]', root), fb = $('[data-rn-fb]', root);
    const hud = () => {
      $('[data-rn-lives]', root).textContent = '❤️'.repeat(lives) + '🖤'.repeat(LIVES - lives);
      $('[data-rn-score]', root).textContent = 'Điểm: ' + score + '/' + n;
      $('[data-rn-left]', root).textContent = 'Còn ' + (n - spawned + falling.length) + ' từ';
    };
    hud(); input.focus();

    function spawn() {
      const k = keys[spawned++];
      const el = document.createElement(mode === 'listen' ? 'button' : 'div');
      el.className = 'rn__w';
      if (mode === 'listen') { el.type = 'button'; el.dataset.say = word(k); el.setAttribute('aria-label', 'Nghe lại'); el.textContent = '🔊'; }
      else el.textContent = GLOSS[k].vi;
      el.style.left = (4 + Math.random() * 56) + '%';
      field.appendChild(el);
      const secs = Math.max(6, 11 - spawned * 0.4) * slow;        // rơi nhanh dần: 11 giây xuống còn 6 giây
      falling.push({ k: k, el: el, y: -34, speed: (FIELD_H + 34) / secs });
      if (mode === 'listen') say(root, word(k));
      hud();
    }
    function drop(w, cls, text) {
      const i = falling.indexOf(w); if (i >= 0) falling.splice(i, 1);
      w.el.classList.add(cls);
      if (text) { w.el.textContent = text; }
      window.setTimeout(() => w.el.remove(), 800);
    }
    function end() {
      if (over) return; over = true;
      window.setTimeout(() => { if (host.isConnected) P.finish(host, ctx, score, n); }, 600);
    }

    function fire() {
      const typed = norm(input.value);
      if (!typed) return false;
      const hits = falling.filter((w) => norm(word(w.k)) === typed).sort((a, b) => b.y - a.y);
      if (!hits.length) return false;
      const w = hits[0];
      score++; P.mark(w.k, true);
      drop(w, 'is-hit', word(w.k));
      fb.textContent = '✔ ' + word(w.k) + ' = ' + GLOSS[w.k].vi;
      input.value = ''; hud();
      return true;
    }
    input.addEventListener('input', () => {
      const typed = norm(input.value);
      if (!typed) return;
      /* Chỉ tự bắn khi không còn từ nào dài hơn bắt đầu bằng cùng chữ ("data" và "data validation"). */
      const longer = falling.some((w) => { const x = norm(word(w.k)); return x !== typed && x.indexOf(typed) === 0; });
      if (!longer) fire();
    });
    $('[data-rn-form]', root).addEventListener('submit', (e) => {
      e.preventDefault();
      if (!fire() && input.value) { fb.textContent = '✘ Chưa có từ nào khớp.'; input.select(); }
    });

    const rp = $('[data-rn-replay]', root);                       // đọc lại từ đang ở thấp nhất (giọt mưa di chuyển khó bấm)
    if (rp) rp.addEventListener('click', () => { const w = falling.slice().sort((a, b) => b.y - a.y)[0]; if (w) say(root, word(w.k)); input.focus(); });

    function frame(t) {
      if (!host.isConnected || over) return;
      const dt = Math.min(0.05, (t - (last || t)) / 1000); last = t;
      sinceSpawn += dt * 1000;
      if (spawned < n && sinceSpawn >= Math.max(1500, 2600 - spawned * 90) && falling.length < 4) { spawn(); sinceSpawn = 0; }
      for (let i = falling.length - 1; i >= 0; i--) {
        const w = falling[i];
        w.y += w.speed * dt;
        w.el.style.transform = 'translateY(' + w.y.toFixed(1) + 'px)';
        if (w.y >= FIELD_H - 34) {                                 // chạm đáy
          P.mark(w.k, false); lives--;
          drop(w, 'is-miss', word(w.k));
          fb.textContent = '✘ Trượt: ' + word(w.k) + ' = ' + GLOSS[w.k].vi;
          hud();
        }
      }
      if (lives <= 0 || (spawned >= n && !falling.length)) { end(); return; }
      window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  }

  P.registerMode('mua-thuat-ngu', { vi: 'Mưa thuật ngữ', en: 'Term rain', note: 'Thuật ngữ rơi xuống, gõ đúng từ tiếng Anh trước khi chạm đáy. Có chế độ nghe.', xp: 1, icon: '🌧️' }, runRain);
})();
