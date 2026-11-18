/* ==========================================================================
   NHÓM KHỐI LỚP: "Lớp 9" gồm hai môn "Toán 9" và "Tin học 9"
   --------------------------------------------------------------------------
   Đường dẫn của từng môn (#/toan-9, #/lop-9 …) và mã bài tập không đổi, nên
   liên kết cũ vẫn dùng được. File này chỉ thêm tầng "Lớp 9" ở phía trên:

     Trang chủ  → thẻ "Lớp 9" (thu gọn) → bấm để mở hai môn
     Thanh nav  → nút "Lớp 9" (#/khoi-9); khi đang ở một môn, hiện thêm hai
                  nút môn bên cạnh
     #/khoi-9   → trang Lớp 9: hai môn, mỗi môn có danh sách chương/bài
     #/toan-9   → danh sách chương/bài của môn (như trước)

   Thêm khối mới (ví dụ Lớp 8 có nhiều môn): thêm một mục vào GROUPS.
   ========================================================================== */
(function () {
  'use strict';
  const D = window.TEXTBOOK;
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (s, r) => (r || document).querySelector(s);

  const GROUPS = [
    { slug: 'khoi-9', id: 9, label: 'Lớp 9', en: 'Grade 9', subjects: ['toan-9', 'lop-9'] }
  ];
  const gradeBySlug = (slug) => D.grades.find((g) => g.slug === slug);
  const groupOf = (slug) => GROUPS.find((x) => x.slug === slug || x.subjects.indexOf(slug) >= 0) || null;
  const members = (grp) => grp.subjects.map(gradeBySlug).filter(Boolean);
  const lessonsOf = (g) => (g.topics || []).reduce((a, t) => a.concat(t.lessons), []);
  const stats = (g) => {
    const all = lessonsOf(g);
    return { topics: (g.topics || []).length, lessons: all.length, ready: all.filter((l) => l.content && D.lessons[l.content]).length };
  };

  /* Thanh điều hướng chính: thay hai nút môn của cùng khối bằng một nút "Lớp 9". */
  function nav(activeSlug) {
    const grp = groupOf(activeSlug);
    const done = {};
    return D.grades.map((g) => {
      const x = GROUPS.find((q) => q.subjects.indexOf(g.slug) >= 0);
      if (x) {
        if (done[x.slug]) return '';
        done[x.slug] = true;
        const on = grp === x;
        let html = '<a class="pill pill--group' + (activeSlug === x.slug ? ' is-current' : on ? ' is-on' : '') + '" href="#/' + x.slug + '"' + (activeSlug === x.slug ? ' aria-current="page"' : '') + '>' + esc(x.label) + '</a>';
        if (on) {
          html += members(x).map((m) => '<a class="pill pill--sub' + (m.slug === activeSlug ? ' is-current' : '') + '" href="#/' + m.slug + '"' + (m.slug === activeSlug ? ' aria-current="page"' : '') + '>' + esc(m.short ? m.short + ' ' + m.id : m.subject) + '</a>').join('');
        }
        return html;
      }
      return g.available
        ? '<a class="pill' + (g.slug === activeSlug ? ' is-current' : '') + '" href="#/' + g.slug + '"' + (g.slug === activeSlug ? ' aria-current="page"' : '') + '>' + esc(g.label || 'Lớp ' + g.id) + '</a>'
        : '<button type="button" class="pill is-soon" data-soon="' + g.id + '" aria-disabled="true" title="Đang cập nhật">' + esc(g.label || 'Lớp ' + g.id) + '</button>';
    }).join('');
  }

  /* Kệ sách ở trang chủ: các lớp chưa có nội dung giữ nguyên, Lớp 9 là một thẻ bấm để mở rộng. */
  function shelf(icons) {
    const done = {};
    let panel = '';
    const items = D.grades.map((g) => {
      const x = GROUPS.find((q) => q.subjects.indexOf(g.slug) >= 0);
      if (x) {
        if (done[x.slug]) return '';
        done[x.slug] = true;
        panel += panelHTML(x, true);
        return '<li><button type="button" class="cover cover--' + x.id + ' cover--group is-open" data-group-toggle="' + x.slug + '" aria-expanded="false" aria-controls="grp-' + x.slug + '" aria-label="' + esc(x.label) + ': mở để chọn môn học">' +
          '<span class="cover__spine" aria-hidden="true"></span><span class="cover__sub">Lớp</span><span class="cover__num">' + x.id + '</span>' +
          '<span class="cover__state">' + icons.right + '<span>Chọn môn</span></span></button></li>';
      }
      const inner = '<span class="cover__spine" aria-hidden="true"></span><span class="cover__sub">' + esc(g.short || 'Tin học') + '</span><span class="cover__num">' + g.id + '</span>' +
        '<span class="cover__state">' + icons.clock + '<span>Đang cập nhật</span></span>';
      return '<li><button type="button" class="cover cover--' + g.id + ' is-soon" data-soon="' + g.id + '" aria-disabled="true" aria-label="' + esc(g.subject) + ', đang cập nhật">' + inner + '</button></li>';
    }).join('');
    return '<ul class="shelf__books">' + items + '</ul>' + panel;
  }

  /* Hai môn của một khối: thẻ môn + danh sách chương/bài (bấm "Xem các chương" để mở). */
  function subjectCard(g) {
    const s = stats(g);
    const topics = g.topics.map((t, i) => '<li class="lvl__topic"><p class="lvl__tt"><span class="vi">' + esc(t.vi) + '</span><span class="en" lang="en">' + esc(t.en) + '</span></p><ul class="lvl__lessons">' +
      t.lessons.map((l) => {
        const ok = l.content && D.lessons[l.content];
        return '<li>' + (ok ? '<a href="#/' + g.slug + '/' + l.slug + '"><b>' + esc(l.number) + '</b> ' + esc(l.vi) + '</a>' : '<span class="lvl__soon"><b>' + esc(l.number) + '</b> ' + esc(l.vi) + ' <small>(đang cập nhật)</small></span>') + '</li>';
      }).join('') + '</ul></li>').join('');
    return '<article class="lvl__card lvl__card--' + (g.short === 'Toán' ? 'math' : 'info') + '"><header class="lvl__head"><h3 class="lvl__name"><span class="vi">' + esc(g.subject) + '</span><span class="en" lang="en">' + esc(g.subjectEn || '') + '</span></h3>' +
      '<p class="lvl__meta">' + s.topics + ' ' + (g.short === 'Toán' ? 'chương' : 'chủ đề') + ', ' + s.ready + '/' + s.lessons + ' bài đã sẵn sàng</p></header>' +
      '<div class="lvl__act"><a class="btn btn--primary btn--sm" href="#/' + g.slug + '">Mở danh sách bài</a></div>' +
      '<details class="lvl__det"><summary>Xem các ' + (g.short === 'Toán' ? 'chương' : 'chủ đề') + ' và bài học</summary><ol class="lvl__topics">' + topics + '</ol></details></article>';
  }
  function panelHTML(grp, hidden) {
    return '<section class="lvl lvl--panel" id="grp-' + grp.slug + '"' + (hidden ? ' hidden' : '') + ' aria-label="Các môn học của ' + esc(grp.label) + '">' +
      '<h3 class="lvl__title"><span class="vi">Chọn môn học của ' + esc(grp.label) + '</span><span class="en" lang="en">Choose a subject in ' + esc(grp.en) + '</span></h3>' +
      '<div class="lvl__grid">' + members(grp).map(subjectCard).join('') + '</div></section>';
  }

  /* Trang riêng của khối (#/khoi-9). */
  function page(grp) {
    return '<header class="lessons__head"><nav class="crumbs" aria-label="Đường dẫn"><a href="#/">Trang chủ</a><span aria-hidden="true">›</span><span aria-current="page">' + esc(grp.label) + '</span></nav>' +
      '<h1 class="lessons__title"><span class="vi">' + esc(grp.label) + '</span><span class="en" lang="en">' + esc(grp.en) + '</span></h1>' +
      '<p class="lessons__sum">Lớp 9 có ' + members(grp).length + ' môn học. Chọn một môn để xem danh sách chương và bài học.</p></header>' + panelHTML(grp, false);
  }

  /* Đường dẫn cho trang danh sách bài của một môn: Trang chủ › Lớp 9 › Toán 9. */
  function crumb(g) {
    const x = GROUPS.find((q) => q.subjects.indexOf(g.slug) >= 0);
    return x ? '<a href="#/' + x.slug + '">' + esc(x.label) + '</a><span aria-hidden="true">›</span>' : '';
  }

  /* Bấm thẻ "Lớp 9" trên trang chủ: mở hoặc thu gọn bảng chọn môn. */
  document.addEventListener('click', (e) => {
    const b = e.target.closest ? e.target.closest('[data-group-toggle]') : null;
    if (!b) return;
    const box = document.getElementById('grp-' + b.dataset.groupToggle);
    if (!box) return;
    const open = box.hidden;
    box.hidden = !open;
    b.setAttribute('aria-expanded', String(open));
    b.classList.toggle('is-expanded', open);
    if (open) { const first = $('a', box); if (first && box.scrollIntoView) box.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
  });

  window.Levels = { groups: GROUPS, group: (slug) => GROUPS.find((x) => x.slug === slug) || null, groupOf: groupOf, nav: nav, shelf: shelf, page: page, crumb: crumb };
})();
