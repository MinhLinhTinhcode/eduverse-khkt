/* ==========================================================================
   NHIỆM VỤ NGÀY VÀ HUY HIỆU
   --------------------------------------------------------------------------
   Lấy ý tưởng từ "Daily Quests" và huy hiệu của Duolingo, rút gọn để chạy
   hoàn toàn trên máy học sinh (localStorage), không cần máy chủ.

   - Mỗi ngày có 3 nhiệm vụ: "Ôn thuật ngữ" luôn có, hai nhiệm vụ còn lại xoay
     vòng theo ngày. Hoàn thành mỗi nhiệm vụ được +5 XP (một lần mỗi ngày).
   - Huy hiệu được tính từ số liệu sẵn có (Practice.stats, SRS.totals), mở
     khoá thì báo bằng thông báo ngắn và ghi ngày đạt.
   - Số đếm lấy từ các sự kiện: sgk:srs (mỗi từ được chấm) và sgk:progress
     (ghi điểm một bài, làm bài nhanh).

   Quests.side() trả HTML cho thanh bên; tự vẽ lại khi có tiến triển mới.
   ========================================================================== */
(function () {
  'use strict';
  const P = window.Practice;
  if (!P) return;
  const KQ = 'sgk.quests', KB = 'sgk.badges', REWARD = 5;
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (s, r) => (r || document).querySelector(s);
  const read = (k, d) => { try { const v = JSON.parse(window.localStorage.getItem(k)); return v && typeof v === 'object' ? v : d; } catch (e) { return d; } };
  const write = (k, v) => { try { window.localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* bỏ qua */ } };
  const ymd = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  const dayNo = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 864e5);

  /* ---------- Nhiệm vụ ---------- */
  const POOL = {
    review: { ico: '🧠', vi: 'Ôn 6 thuật ngữ', goal: 6, ctr: 'reviews' },
    game: { ico: '🎮', vi: 'Chơi 2 trò chơi', goal: 2, ctr: 'games' },
    test: { ico: '📝', vi: 'Làm 1 bài tập trắc nghiệm', goal: 1, ctr: 'tests' },
    quick: { ico: '⚡', vi: 'Trả lời đúng 3 câu ở “Làm bài nhanh”', goal: 3, ctr: 'quick' },
    rain: { ico: '🌧️', vi: 'Chơi “Mưa thuật ngữ”', goal: 1, ctr: 'rain' }
  };
  const ROTATE = ['game', 'test', 'quick', 'rain'];
  const todayIds = () => { const n = dayNo(); return ['review', ROTATE[n % 4], ROTATE[(n + 2) % 4]]; };

  function state() {
    const q = read(KQ, null), d = ymd();
    if (q && q.d === d) return q;
    return { d: d, c: { reviews: 0, games: 0, tests: 0, quick: 0, rain: 0 }, done: {} };
  }
  const saveState = (q) => write(KQ, q);
  const cur = (q, id) => Math.min(q.c[POOL[id].ctr] || 0, POOL[id].goal);

  function toast(msg) {
    const box = $('#toast');
    if (!box) return;
    box.textContent = msg; box.classList.add('is-show');
    window.setTimeout(() => box.classList.remove('is-show'), 3600);
  }

  /* ---------- Huy hiệu ---------- */
  const BADGES = [
    { id: 'khoi-dau', ico: '🌱', vi: 'Khởi đầu', need: 'Hoàn thành bài đầu tiên', ok: (s) => s.modes.length >= 1 },
    { id: 'tuyet-doi', ico: '🎯', vi: 'Điểm tuyệt đối', need: 'Đạt điểm tối đa một bài', ok: (s) => s.perfect >= 1 },
    { id: 'tho-san', ico: '📚', vi: 'Thợ săn từ vựng', need: 'Trả lời 50 lượt thuật ngữ', ok: (s) => s.reviews >= 50 },
    { id: 'thanh-thao', ico: '🏅', vi: 'Thành thạo 5 từ', need: 'Đưa 5 thuật ngữ lên mức thành thạo', ok: (s) => s.mastered >= 5 },
    { id: 'chuoi-3', ico: '🔥', vi: 'Chuỗi 3 ngày', need: 'Học liên tiếp 3 ngày', ok: (s) => s.streak >= 3 },
    { id: 'chuoi-7', ico: '🌋', vi: 'Chuỗi 7 ngày', need: 'Học liên tiếp 7 ngày', ok: (s) => s.streak >= 7 },
    { id: 'da-nang', ico: '🧩', vi: 'Đa năng', need: 'Thử 5 chế độ luyện tập khác nhau', ok: (s) => s.modes.length >= 5 },
    { id: 'cap-3', ico: '⭐', vi: 'Lên cấp 3', need: 'Đạt 200 XP', ok: (s) => s.xp >= 200 },
    { id: 'du-ngay', ico: '🧭', vi: 'Đủ nhiệm vụ', need: 'Xong cả 3 nhiệm vụ trong một ngày', ok: (s) => s.allQuests }
  ];
  function snapshot(q) {
    const st = P.stats(), t = window.SRS ? window.SRS.totals() : { reviews: 0, mastered: 0 };
    return { modes: st.modes, perfect: st.perfect, xp: st.xp, streak: st.streak, reviews: t.reviews, mastered: t.mastered,
      allQuests: todayIds().every((id) => q.done[id]) || !!read(KB, {})['du-ngay'] };
  }
  function checkBadges(q) {
    const have = read(KB, {}), s = snapshot(q), fresh = [];
    BADGES.forEach((b) => { if (!have[b.id] && b.ok(s)) { have[b.id] = ymd(); fresh.push(b); } });
    if (fresh.length) { write(KB, have); toast('Huy hiệu mới: ' + fresh.map((b) => b.ico + ' ' + b.vi).join(', ')); }
  }

  /* ---------- Cập nhật khi có tiến triển ---------- */
  function bump(field) {
    const q = state();
    q.c[field] = (q.c[field] || 0) + 1;
    const gained = [];
    todayIds().forEach((id) => { if (!q.done[id] && cur(q, id) >= POOL[id].goal) { q.done[id] = true; gained.push(id); } });
    saveState(q);
    if (gained.length) { P.award(REWARD * gained.length); toast('Xong nhiệm vụ: ' + gained.map((id) => POOL[id].vi).join(', ') + '. +' + REWARD * gained.length + ' XP'); }
    checkBadges(q);
    refresh();
  }
  document.addEventListener('sgk:srs', () => bump('reviews'));
  document.addEventListener('sgk:progress', (e) => {
    const d = e && e.detail;
    if (!d) return;
    if (d.kind === 'quick') bump('quick');
    else if (d.kind === 'record') {
      const m = P.modes[d.mode];
      if (m && m.game) { bump('games'); if (d.mode === 'mua-thuat-ngu') bump('rain'); } else bump('tests');
    } else if (d.kind === 'award') { checkBadges(state()); refresh(); }
  });

  /* ---------- Giao diện thanh bên ---------- */
  function inner() {
    const q = state(), have = read(KB, {});
    const list = todayIds().map((id) => {
      const x = POOL[id], c = cur(q, id), done = !!q.done[id];
      return '<li class="qs__i' + (done ? ' is-done' : '') + '"><span class="qs__ico" aria-hidden="true">' + (done ? '✔' : x.ico) + '</span><span class="qs__t">' + esc(x.vi) +
        '<span class="qs__bar" role="progressbar" aria-valuemin="0" aria-valuemax="' + x.goal + '" aria-valuenow="' + c + '"><i style="width:' + (c / x.goal * 100) + '%"></i></span></span><span class="qs__n">' + c + '/' + x.goal + '</span></li>';
    }).join('');
    const n = BADGES.filter((b) => have[b.id]).length;
    const badges = BADGES.map((b) => have[b.id]
      ? '<li class="bd is-on" title="' + esc(b.vi + ' (' + have[b.id] + ')') + '"><span aria-hidden="true">' + b.ico + '</span><small>' + esc(b.vi) + '</small></li>'
      : '<li class="bd" title="Chưa mở: ' + esc(b.need) + '"><span aria-hidden="true">🔒</span><small>' + esc(b.vi) + '</small></li>').join('');
    return '<ul class="qs">' + list + '</ul><p class="qs__h">Huy hiệu <b>' + n + '/' + BADGES.length + '</b></p><ul class="bds">' + badges + '</ul>';
  }
  function refresh() { const box = $('[data-quests]'); if (box) box.innerHTML = inner(); }
  function side() {
    return '<section class="sw"><h2 class="sw__h">Nhiệm vụ hôm nay<small class="en" lang="en">Daily quests</small></h2><div data-quests>' + inner() + '</div></section>';
  }

  window.Quests = { side: side, badges: BADGES, today: todayIds };
})();
