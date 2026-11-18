/* ==========================================================================
   KHÔNG GIAN HỌC TẬP HAI CỘT: thanh tab + thanh bên (tra từ, XP, điều hướng nhanh)
   --------------------------------------------------------------------------
   - Cột trái (65%): nội dung của tab đang mở.
   - Cột phải (35%): thanh bên cố định khi cuộn.
   - Mỗi tab là một địa chỉ riêng nên nút Quay lại / chia sẻ liên kết vẫn đúng:
       Nội dung sách       #/lop-9/bai-10a
       Bài tập trắc nghiệm #/lop-9/bai-10a/luyen-tap  (và các phần con)
       Bảng xếp hạng       #/lop-9/bai-10a/xep-hang
       Quản lý giáo viên   #/lop-9/bai-10a/giao-vien
   - Từ trong thanh bên dùng đúng thẻ .vocab của app.js nên popup phiên âm,
     nghĩa và nút nghe phát âm hoạt động y như trong bài.
   ========================================================================== */
(function () {
  'use strict';
  const D = window.TEXTBOOK;
  const GLOSS = D.glossary;
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const plain = (s) => window.TextbookFmt.plain(s);

  const TABS = [
    { id: 'noi-dung', ico: '📖', vi: 'Nội dung sách', path: '' },
    { id: 'bai-tap', ico: '📝', vi: 'Bài tập &amp; Trắc nghiệm', path: '/luyen-tap' },
    { id: 'tro-choi', ico: '🎮', vi: 'Trò chơi khởi động', path: '/tro-choi' },
    { id: 'xep-hang', ico: '🏆', vi: 'Bảng xếp hạng', path: '/xep-hang' },
    { id: 'giao-vien', ico: '⚙️', vi: 'Quản lý giáo viên', path: '/giao-vien', teacher: true }
  ];
  const teacherOn = () => !!(window.Classroom && window.Classroom.teacherOn());
  const base = (g, meta) => '#/' + g.slug + '/' + meta.slug;

  /* Thanh tab theo vai trò.
     Học sinh: không có tab giáo viên (trừ khi đang mở đúng địa chỉ đó).
     Giáo viên: tab "Quản lý giáo viên" đứng đầu và nổi bật. */
  function tabs(g, meta, active) {
    const teacher = teacherOn();
    const list = TABS.filter((t) => !t.teacher || teacher || t.id === active);
    if (teacher) list.sort((x, y) => (y.teacher ? 1 : 0) - (x.teacher ? 1 : 0));          // sort ổn định: giữ thứ tự các tab còn lại
    return '<div class="wtabs"><nav class="wtabs__nav" aria-label="Các phần của bài học">' + list.map((t) =>
      '<a class="wtab' + (t.id === active ? ' is-active' : '') + (t.teacher ? ' wtab--teacher' : '') + '" href="' + base(g, meta) + t.path + '"' + (t.id === active ? ' aria-current="page"' : '') +
      (t.teacher ? ' data-tab-teacher' : '') + '><span aria-hidden="true">' + t.ico + '</span> ' + t.vi + '</a>').join('') + '</nav></div>';
  }

  /* ---------- Thuật ngữ của bài ---------- */
  const keysCache = {};
  function lessonKeys(content) {
    if (!content) return Object.keys(GLOSS);
    if (keysCache[content.number + content.title.vi]) return keysCache[content.number + content.title.vi];
    const out = [];
    const re = /\{([^{}|"]+?)(?:\|([^{}"]+?))?\}/g;
    const text = JSON.stringify(content.pages);
    let m;
    while ((m = re.exec(text))) { const k = (m[2] || m[1]).trim().toLowerCase().replace(/\s+/g, '-'); if (GLOSS[k] && out.indexOf(k) < 0) out.push(k); }
    keysCache[content.number + content.title.vi] = out;
    return out;
  }
  const fold = (s) => String(s).toLowerCase().replace(/đ/g, 'd').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
  function find(q, own) {
    const f = fold(q);
    if (!f) return own.slice(0, 8);
    const hit = (k) => { const e = GLOSS[k]; return fold(plain(e.word)).indexOf(f) >= 0 || fold(e.vi).indexOf(f) >= 0; };
    const first = own.filter(hit);
    return first.concat(Object.keys(GLOSS).filter((k) => first.indexOf(k) < 0 && hit(k))).slice(0, 8);
  }
  function glossList(keys) {
    if (!keys.length) return '<li class="gl__none">Không tìm thấy thuật ngữ. Thử gõ ngắn hơn hoặc không dấu.</li>';
    return keys.map((k) => {
      const e = GLOSS[k]; const w = plain(e.word);
      return '<li class="gl__i"><span class="vocab gl__w" role="button" tabindex="0" aria-expanded="false" data-key="' + esc(k) + '" lang="en">' + esc(w) + '</span>' +
        '<span class="ipa gl__ipa">' + esc(e.ipa || '') + '</span><button type="button" class="say say--sm" data-say="' + esc(w) + '" aria-label="Nghe phát âm từ ' + esc(w) + '">' + ((window.ICONS && window.ICONS.speaker) || '🔊') + '</button>' +
        '<span class="gl__vi">' + esc(e.vi) + '</span></li>';
    }).join('');
  }

  /* ---------- Thẻ XP ---------- */
  function xpCard() {
    const p = window.Practice ? window.Practice.summary() : { xp: 0, level: 1, streak: 0, hw: 0 };
    const into = p.xp % 100;
    return '<div class="xpc"><p class="xpc__lv"><b>Cấp ' + p.level + '</b><span>' + p.xp + ' XP</span></p>' +
      '<span class="xpc__bar" role="progressbar" aria-label="Tiến độ lên cấp" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + into + '"><i style="width:' + into + '%"></i></span>' +
      '<p class="xpc__n">Còn ' + (100 - into) + ' XP nữa lên cấp ' + (p.level + 1) + '</p>' +
      '<p class="xpc__s"><span><b>' + p.streak + '</b> ngày liên tiếp</span><span><b>' + p.hw + '</b> bài về nhà</span></p></div>';
  }

  /* ---------- Điều hướng nhanh trong bài ---------- */
  function quickNav(g, meta, content) {
    const items = (window.TextbookFmt.toc ? window.TextbookFmt.toc(content) : []).filter((it) => it.lv === 1);
    const modes = window.Practice ? Object.keys(window.Practice.modes).filter((m) => !window.Practice.modes[m].hidden) : [];
    const mlinks = modes.map((m) => '<a class="qn__a qn__a--m" href="' + base(g, meta) + '/' + m + '">' + window.Practice.modes[m].icon + ' ' + window.Practice.modes[m].vi + '</a>').join('');
    const slinks = items.map((it) => '<a class="qn__a" href="' + base(g, meta) + '/' + it.page + '"><span>' + esc(it.vi) + '</span><small>tr. ' + it.page + '</small></a>').join('');
    return '<nav class="qn" aria-label="Điều hướng nhanh">' + (slinks ? '<p class="qn__k">Các phần của bài</p>' + slinks : '') + (mlinks ? '<p class="qn__k">Luyện tập</p>' + mlinks : '') + '</nav>';
  }

  /* ---------- Khung làm bài nhanh (thanh bên) ----------
     Một câu ngẫu nhiên của bài; đúng được +1 XP (tối đa 10 XP/ngày, do Practice.bonus kiểm soát). */
  const qq = { q: null, box: null };
  function quickQuizHTML(q) {
    const P = window.Practice;
    if (!q) return '<p class="prac__note">Bài này chưa có câu hỏi.</p>';
    return '<div class="qq__q">' + P.promptHTML(q, 0, false) + '</div><div class="qq__opts">' + q.options.map((o, i) => P.optionHTML(q, o, i)).join('') + '</div>' +
      '<div class="qq__fb" aria-live="polite"></div><button type="button" class="btn btn--ghost btn--sm qq__next" data-qq-next>Câu khác</button>';
  }
  function quickQuizLoad(box) {
    if (!window.Practice || !window.Practice.quick) { box.innerHTML = ''; return; }
    const content = D.lessons[box.dataset.qqContent];
    qq.q = window.Practice.quick(content);
    box.innerHTML = quickQuizHTML(qq.q);
  }
  document.addEventListener('click', (e) => {
    const box = e.target.closest ? e.target.closest('[data-qq]') : null;
    if (!box) return;
    if (e.target.closest('[data-qq-next]')) { box.dataset.done = ''; quickQuizLoad(box); return; }
    const opt = e.target.closest('.opt');
    if (!opt || box.dataset.done === '1' || !qq.q) return;
    const P = window.Practice, i = Number(opt.dataset.i), ok = i === qq.q.answer;
    box.dataset.done = '1';
    $$('.opt', box).forEach((b) => { b.disabled = true; if (Number(b.dataset.i) === qq.q.answer) b.classList.add('is-right'); });
    if (!ok) opt.classList.add('is-wrong');
    const gain = ok ? P.bonus(1) : 0;
    $('.qq__fb', box).innerHTML = '<p class="qq__v ' + (ok ? 'is-ok' : 'is-no') + '">' + (ok ? 'Đúng rồi!' + (gain ? ' +1 XP' : ' (hôm nay đã đủ 10 XP từ mục này)') : 'Chưa đúng. Đáp án: ' + esc(P.answerText(qq.q))) + '</p>' + P.whyHTML(qq.q);
  });

  /* ---------- Thanh bên ---------- */
  /* Đánh dấu khối chỉ dành cho học sinh: CSS ẩn khi body[data-role="teacher"]. */
  const stu = (html) => html.replace('<section class="sw">', '<section class="sw sw--stu">');
  function side(g, meta) {
    const content = D.lessons[meta.content];
    const own = lessonKeys(content);
    return '<aside class="ws__side" aria-label="Công cụ học tập">' +
      '<section class="sw"><h2 class="sw__h">Tra cứu thuật ngữ<small class="en" lang="en">Glossary</small></h2>' +
      '<input type="search" class="sw__in" data-gsearch placeholder="Gõ tiếng Anh hoặc tiếng Việt" aria-label="Tra cứu thuật ngữ" autocomplete="off">' +
      '<ul class="gl" data-gresults aria-live="polite">' + glossList(find('', own)) + '</ul></section>' +
      '<section class="sw sw--stu"><h2 class="sw__h">Điểm XP của bạn</h2><div data-xpcard>' + xpCard() + '</div></section>' +
      (window.Quests ? stu(window.Quests.side()) : '') +
      (window.Review ? stu(window.Review.side(g, meta)) : '') +
      '<section class="sw sw--stu"><h2 class="sw__h">Làm bài nhanh<small class="en" lang="en">Quick quiz</small></h2><div class="qq" data-qq data-qq-content="' + esc(meta.content) + '" data-qq-init></div></section>' +
      '<section class="sw"><h2 class="sw__h">Điều hướng nhanh</h2>' + quickNav(g, meta, content) + '</section>' +
      (window.Classroom ? '<section class="sw sw--stu"><h2 class="sw__h">Bài giáo viên giao</h2>' + window.Classroom.joinForm() + '</section>' : '') +
      '</aside>';
  }

  /* Khung hai cột cho các tab ngoài "Nội dung sách". */
  function shell(g, meta, active, mainHTML) {
    return '<div class="ws ws--' + active + '">' + tabs(g, meta, active) + '<div class="ws__grid">' + mainHTML + side(g, meta) + '</div></div>';
  }

  function mount(root, g, meta) {
    $$('[data-qq-init]', root || document).forEach((b) => { b.removeAttribute('data-qq-init'); b.dataset.done = ''; quickQuizLoad(b); });
    const box = $('[data-gsearch]', root || document);
    if (!box) return;
    const own = lessonKeys(D.lessons[meta.content]);
    box.addEventListener('input', () => { $('[data-gresults]').innerHTML = glossList(find(box.value, own)); });
  }

  /* ---------- Sự kiện chung (gắn một lần) ---------- */
  document.addEventListener('sgk:progress', () => { const c = $('[data-xpcard]'); if (c) c.innerHTML = xpCard(); });

  document.addEventListener('submit', (e) => {
    const f = e.target.closest ? e.target.closest('[data-join]') : null;
    if (!f) return;
    e.preventDefault();
    const msg = $('[data-join-msg]', f);
    if (!window.Classroom.go($('[data-join-in]', f).value)) msg.textContent = 'Mã chưa đúng. Kiểm tra lại với giáo viên (VD: TIN9-B10A).';
  });

  window.Workspace = { tabs: tabs, side: side, shell: shell, mount: mount };
})();
