/* ==========================================================================
   QUẢN LÝ LỚP HỌC (cho giáo viên) — chạy hoàn toàn offline
   --------------------------------------------------------------------------
   1) MÃ BÀI TẬP  : giáo viên chọn bài + các câu trắc nghiệm → mã ngắn, ví dụ
                    TOAN9-B10      (cả bài)
                    TIN9-B10A-5    (chỉ các câu 1 và 3: "5" là số nhị phân 101 viết hệ 16)
                    Học sinh gõ mã → app dựng lại đúng các câu đó, không cần máy chủ.
   2) MÃ KẾT QUẢ  : học sinh làm xong được cấp "KQ1.xxxx" chứa biệt danh, mã bài,
                    điểm, ngày và mã kiểm tra. Giáo viên dán vào bảng quản lý để
                    giải mã, ghi nhận và tổng hợp điểm cả lớp.
   Lưu ý: mã kiểm tra chỉ giúp phát hiện sửa nhầm, KHÔNG phải bảo mật; không dùng
   cho điểm thi chính thức.
   ========================================================================== */
(function () {
  'use strict';
  const D = window.TEXTBOOK;
  const K_ON = 'sgk.teacher.on', K_RES = 'sgk.teacher.res', K_ASG = 'sgk.teacher.asg';
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = () => window.TextbookFmt;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const read = (k, def) => { try { const v = JSON.parse(window.localStorage.getItem(k)); return v == null ? def : v; } catch (e) { return def; } };
  const write = (k, v) => { try { window.localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* trình duyệt chặn lưu trữ */ } };

  /* ---------- Mã bài ↔ khoá bài học ---------- */
  const codeOf = (key) => String(key).toUpperCase().replace(/-BAI-?/, '-B');
  let codeMap = null;
  function map() {
    if (!codeMap) { codeMap = {}; Object.keys(D.lessons).forEach((k) => { codeMap[codeOf(k)] = k; }); }
    return codeMap;
  }
  function items(key) {
    const out = [];
    const L = D.lessons[key];
    if (L) L.pages.forEach((p) => p.blocks.forEach((b) => { if (b.t === 'quiz') b.items.forEach((q) => out.push(q)); }));
    return out;
  }
  function locate(key) {
    for (let i = 0; i < D.grades.length; i++) {
      const g = D.grades[i];
      for (let j = 0; g.topics && j < g.topics.length; j++) {
        const l = g.topics[j].lessons.find((x) => x.content === key);
        if (l) return { grade: g, lesson: l };
      }
    }
    return null;
  }

  /* Mã bài tập: chọn đủ mọi câu thì chỉ có mã bài; chọn một phần thì thêm "-" và mặt nạ bit (hệ 16). */
  function makeCode(key, idx) {
    const total = items(key).length;
    const sel = idx.slice().sort((a, b) => a - b);
    if (!sel.length) return '';
    if (sel.length === total) return codeOf(key);
    let mask = BigInt(0);
    sel.forEach((i) => { mask |= BigInt(1) << BigInt(i); });
    return codeOf(key) + '-' + mask.toString(16).toUpperCase();
  }
  function parseCode(str) {
    const s = String(str || '').trim().toUpperCase().replace(/\s+/g, '');
    if (!s) return null;
    const m = map();
    let key = m[s], idx = null;
    if (!key) {
      const hit = s.match(/^(.+)-([0-9A-F]+)$/);
      if (!hit || !m[hit[1]]) return null;
      key = m[hit[1]];
      let mask;
      try { mask = BigInt('0x' + hit[2]); } catch (e) { return null; }
      idx = [];
      const n = items(key).length;
      for (let i = 0; i < n; i++) if ((mask >> BigInt(i)) & BigInt(1)) idx.push(i);
      if (!idx.length) return null;
    }
    const all = items(key);
    if (!all.length) return null;
    if (!idx) idx = all.map((q, i) => i);
    return { key: key, idx: idx, code: s, total: all.length };
  }
  /* Học sinh gõ mã → mở đúng bài giáo viên giao. Trả về true nếu mã hợp lệ. */
  function go(str) {
    /* Bộ câu hỏi do AI soạn (AI1.…): nhập vào máy rồi mở bài tương ứng. */
    if (/^\s*AI1\./.test(str) && window.AI) {
      const set = window.AI.importCode(str), loc2 = set && locate(set.key);
      if (!loc2) return false;
      window.location.hash = '#/' + loc2.grade.slug + '/' + loc2.lesson.slug + '/bai-ai/' + set.id;
      return true;
    }
    const p = parseCode(str);
    const loc = p && locate(p.key);
    if (!p || !loc) return false;
    window.location.hash = '#/' + loc.grade.slug + '/' + loc.lesson.slug + '/bai-giao/' + p.code;
    return true;
  }

  /* ---------- Mã kết quả ---------- */
  const SALT = 'sgk|v1|offline';
  function sum(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
    return h.toString(36).slice(0, 6);
  }
  const b64 = (s) => btoa(unescape(encodeURIComponent(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const unb64 = (s) => { let b = s.replace(/-/g, '+').replace(/_/g, '/'); while (b.length % 4) b += '='; return decodeURIComponent(escape(atob(b))); };
  const ymd = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  const sumOf = (o) => sum([o.n, o.a, o.s, o.t, o.d].join('|') + SALT);

  function token(o) {
    const base = { v: 1, n: String(o.n || 'Ẩn danh').slice(0, 20), a: String(o.a), s: o.s | 0, t: o.t | 0, d: o.d || ymd() };
    base.h = sumOf(base);
    return 'KQ1.' + b64(JSON.stringify(base));
  }
  /* Giải mã một mã kết quả; trả về null nếu không đọc được. valid: true/false/null (mã cũ không có kiểm tra). */
  function readToken(str) {
    try {
      const s = String(str).trim();
      if (s.indexOf('KQ1.') === 0) {
        const o = JSON.parse(unb64(s.slice(4)));
        if (typeof o.n !== 'string' || typeof o.a !== 'string' || !(o.t > 0) || o.s < 0 || o.s > o.t) return null;
        return { n: o.n, a: o.a, s: o.s | 0, t: o.t | 0, d: o.d || '', valid: sumOf(o) === o.h };
      }
      if (s.indexOf('SGK1.') === 0) { /* mã nộp bài đời đầu: {n,l,s,t,d} */
        const o = JSON.parse(unb64(s.slice(5)));
        if (typeof o.n !== 'string' || typeof o.l !== 'string' || !(o.t > 0)) return null;
        return { n: o.n, a: codeOf(o.l) + '-VN', s: o.s | 0, t: o.t | 0, d: o.d || '', valid: null };
      }
    } catch (e) { /* mã sai định dạng */ }
    return null;
  }

  /* ---------- Chế độ giáo viên ---------- */
  const teacherOn = () => read(K_ON, false) === true;
  const setTeacher = (b) => write(K_ON, !!b);
  const assignments = () => read(K_ASG, []);
  const results = () => read(K_RES, {});

  const plain = (s) => fmt().plain(s);
  const lessonName = (key) => { const L = D.lessons[key]; return L ? 'Bài ' + L.number + '. ' + L.title.vi : key; };
  function lessonOptions(selected) {
    let html = '';
    D.grades.forEach((g) => {
      if (!g.available || !g.topics) return;
      let opts = '';
      g.topics.forEach((t) => t.lessons.forEach((l) => {
        if (l.content && D.lessons[l.content] && items(l.content).length) {
          opts += '<option value="' + esc(l.content) + '"' + (l.content === selected ? ' selected' : '') + '>' + esc(lessonName(l.content)) + ' (' + items(l.content).length + ' câu)</option>';
        }
      }));
      if (opts) html += '<optgroup label="' + esc(g.subject) + '">' + opts + '</optgroup>';
    });
    return html;
  }
  const qPicker = (key) => items(key).map((q, i) =>
    '<label class="qpick"><input type="checkbox" data-q="' + i + '" checked><span class="qpick__n">' + (i + 1) + '</span><span class="qpick__t"><span class="vi">' + esc(plain(q.vi)) + '</span>' +
    '<span class="en" lang="en">' + esc(plain(q.en)) + '</span></span></label>').join('');

  function copy(text, btn) {
    const done = () => { if (btn) { const o = btn.textContent; btn.textContent = 'Đã sao chép'; setTimeout(() => { btn.textContent = o; }, 1400); } };
    const fb = () => { const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch (e) { /* bỏ qua */ } t.remove(); done(); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fb); else fb();
  }

  function asgTable() {
    const list = assignments();
    if (!list.length) return '<p class="prac__note">Chưa có bài tập nào được tạo trên máy này.</p>';
    return '<div class="tablewrap"><table class="board"><thead><tr><th>Mã bài tập</th><th>Bài học</th><th>Số câu</th><th>Ngày tạo</th><th></th></tr></thead><tbody>' +
      list.map((a, i) => '<tr><td><code>' + esc(a.code) + '</code></td><td>' + esc(lessonName(a.key)) + '</td><td>' + a.n + '</td><td>' + esc(a.d) + '</td>' +
        '<td><button type="button" class="btn btn--ghost btn--sm" data-copyasg="' + esc(a.code) + '">Sao chép</button> <button type="button" class="btn btn--ghost btn--sm" data-delasg="' + i + '" aria-label="Xoá bài tập ' + esc(a.code) + '">Xoá</button></td></tr>').join('') +
      '</tbody></table></div>';
  }

  function resultRows(filter) {
    const r = results();
    return Object.keys(r).map((k) => r[k]).filter((x) => !filter || x.a === filter).sort((a, b) => a.a.localeCompare(b.a) || b.s / b.t - a.s / a.t || a.n.localeCompare(b.n));
  }
  const pct = (x) => Math.round(x.s / x.t * 100);
  function resultHTML(filter) {
    const rows = resultRows(filter);
    const all = Object.keys(results()).map((k) => results()[k]);
    const codes = Array.from(new Set(all.map((x) => x.a))).sort();
    const sel = '<label class="tfilter">Xem bài tập <select data-filter><option value="">Tất cả</option>' + codes.map((c) => '<option value="' + esc(c) + '"' + (c === filter ? ' selected' : '') + '>' + esc(c) + '</option>').join('') + '</select></label>';
    if (!rows.length) return sel + '<p class="prac__note">Chưa có kết quả nào. Dán mã kết quả của học sinh vào ô phía trên.</p>';
    const ps = rows.map(pct);
    const avg = Math.round(ps.reduce((a, b) => a + b, 0) / ps.length);
    const stats = '<div class="stats stats--sm"><div class="stat"><b>' + rows.length + '</b><span>bài nộp</span></div><div class="stat"><b>' + avg + '%</b><span>điểm trung bình</span></div>' +
      '<div class="stat"><b>' + Math.max.apply(null, ps) + '%</b><span>cao nhất</span></div><div class="stat"><b>' + Math.min.apply(null, ps) + '%</b><span>thấp nhất</span></div></div>';
    const detail = '<div class="tablewrap"><table class="board"><thead><tr><th>#</th><th>Biệt danh</th><th>Mã bài tập</th><th>Điểm</th><th>%</th><th>Ngày</th><th>Lần nộp</th><th>Mã</th></tr></thead><tbody>' +
      rows.map((x, i) => '<tr><td>' + (i + 1) + '</td><td>' + esc(x.n) + '</td><td><code>' + esc(x.a) + '</code></td><td>' + x.s + '/' + x.t + '</td><td>' + pct(x) + '%</td><td>' + esc(x.d) + '</td><td>' + (x.c || 1) + '</td>' +
        '<td>' + (x.valid === false ? '<span class="chip chip--bad" title="Mã đã bị sửa hoặc nhập sai">⚠ nghi sửa</span>' : x.valid ? '<span class="chip chip--ok">✔ hợp lệ</span>' : '<span class="chip">mã cũ</span>') + '</td></tr>').join('') + '</tbody></table></div>';
    const by = {};
    rows.forEach((x) => { (by[x.n] = by[x.n] || []).push(pct(x)); });
    const per = '<h3 class="prac__h prac__h--sm">Tổng hợp theo học sinh</h3><div class="tablewrap"><table class="board"><thead><tr><th>Biệt danh</th><th>Số bài đã nộp</th><th>Điểm trung bình</th></tr></thead><tbody>' +
      Object.keys(by).sort((a, b) => by[b].reduce((s, v) => s + v, 0) / by[b].length - by[a].reduce((s, v) => s + v, 0) / by[a].length).map((n) =>
        '<tr><td>' + esc(n) + '</td><td>' + by[n].length + '</td><td>' + Math.round(by[n].reduce((s, v) => s + v, 0) / by[n].length) + '%</td></tr>').join('') + '</tbody></table></div>';
    return sel + stats + detail + per;
  }
  function csv() {
    const q = (v) => '"' + String(v).replace(/"/g, '""') + '"';
    const lines = [['Biệt danh', 'Mã bài tập', 'Điểm', 'Tổng số câu', 'Phần trăm', 'Ngày', 'Lần nộp', 'Mã kiểm tra'].map(q).join(',')];
    resultRows('').forEach((x) => lines.push([x.n, x.a, x.s, x.t, pct(x), x.d, x.c || 1, x.valid === false ? 'nghi sửa' : x.valid ? 'hợp lệ' : 'mã cũ'].map(q).join(',')));
    return '﻿' + lines.join('\r\n');
  }

  /* ---------- Bảng điều khiển giáo viên ---------- */
  /* Bảng giáo viên chia thành 4 ngăn, mỗi lần chỉ hiện một ngăn để trang không dài. */
  const SUBS = [['📋', 'Giao bài'], ['✅', 'Chấm điểm'], ['🤖', 'Trợ lí AI'], ['💬', 'Giao tiếp']];
  const K_SUB = 'sgk.teacher.sub';
  const subNav = () => '<nav class="tsub" role="tablist" aria-label="Công cụ giáo viên">' + SUBS.map((s, i) => '<button type="button" class="tsub__b" role="tab" data-tsub="' + i + '" aria-selected="false">' + s[0] + ' ' + s[1] + '</button>').join('') + '</nav>';
  function mountSubs(root) {
    const cards = $$('.tdash > .tcard', root), btns = $$('[data-tsub]', root);
    if (!cards.length) return;
    const show = (i) => {
      i = Math.max(0, Math.min(cards.length - 1, i | 0));
      cards.forEach((c, k) => { c.hidden = k !== i; });
      btns.forEach((b, k) => { b.classList.toggle('is-on', k === i); b.setAttribute('aria-selected', String(k === i)); });
      write(K_SUB, i);
    };
    btns.forEach((b) => b.addEventListener('click', () => show(Number(b.dataset.tsub))));
    show(Number(read(K_SUB, 0)) || 0);
  }
  function dashboard(preKey) {
    if (!teacherOn()) {
      return '<section class="tdash tdash--off"><h2 class="prac__h">Quản lý lớp học</h2><p class="prac__intro">Khu vực này dành cho giáo viên: tạo mã bài tập, chấm điểm bằng mã kết quả, dùng trợ lí AI và góc giao tiếp tiếng Anh. Bạn đang ở chế độ Học sinh.</p>' +
        '<button type="button" class="btn btn--primary" data-role-set="teacher">👩‍🏫 Chuyển sang chế độ Giáo viên</button></section>';
    }
    const first = preKey && items(preKey).length ? preKey : (Object.keys(D.lessons).find((k) => items(k).length) || '');
    return '<section class="tdash">' + subNav() +
      '<div class="tcard"><h2 class="prac__h">1. Tạo bài tập nhanh</h2>' +
      '<label class="tfilter">Bài học <select data-asg-lesson>' + lessonOptions(first) + '</select></label>' +
      '<div class="tbtns"><button type="button" class="btn btn--ghost btn--sm" data-q-all>Chọn tất cả</button><button type="button" class="btn btn--ghost btn--sm" data-q-none>Bỏ chọn</button><span class="prac__note" data-q-count></span></div>' +
      '<div class="qlist" data-qlist>' + qPicker(first) + '</div>' +
      '<div class="tbtns"><button type="button" class="btn btn--primary" data-make>Tạo mã bài tập</button></div>' +
      '<div class="codebox" data-codebox hidden aria-live="polite"><span class="codebox__l">Mã bài tập</span><code class="codebox__c" data-code></code><button type="button" class="btn btn--ghost btn--sm" data-copycode>Sao chép</button>' +
      '<p class="prac__note">Gửi mã này cho học sinh. Các em mở tab <b>Bài tập &amp; Trắc nghiệm</b>, nhập mã vào ô “Bài giáo viên giao”.</p></div>' +
      '<h3 class="prac__h prac__h--sm">Các bài đã tạo</h3><div data-asglist>' + asgTable() + '</div></div>' +
      '<div class="tcard"><h2 class="prac__h">2. Nhận và chấm kết quả</h2>' +
      '<p class="prac__intro">Học sinh làm xong sẽ nhận một <b>mã kết quả</b> (bắt đầu bằng KQ1.). Dán các mã vào ô dưới, mỗi mã một dòng.</p>' +
      '<textarea rows="4" data-paste class="tarea" placeholder="KQ1.eyJ2Ijox…" aria-label="Dán mã kết quả của học sinh"></textarea>' +
      '<div class="tbtns"><button type="button" class="btn btn--primary" data-add>Ghi nhận kết quả</button><button type="button" class="btn btn--ghost btn--sm" data-csv>Xuất CSV (Excel)</button><button type="button" class="btn btn--ghost btn--sm" data-clear>Xoá danh sách</button></div>' +
      '<p class="prac__msg" data-msg aria-live="polite"></p><div data-results>' + resultHTML('') + '</div></div>' + (window.AI ? window.AI.panel(first) : '') + (window.Phrases ? window.Phrases.panel() : '') + '</section>';
  }
  function mountDashboard(root) {
    if (!$('.tdash', root)) return;
    mountSubs(root);
    if (window.AI) window.AI.mount(root);
    if (window.Phrases) window.Phrases.mount(root);
    const sel = $('[data-asg-lesson]', root);
    if (!sel) return;
    const count = () => {
      const n = $$('[data-q]:checked', root).length, t = $$('[data-q]', root).length;
      $('[data-q-count]', root).textContent = 'Đã chọn ' + n + '/' + t + ' câu';
    };
    count();
    sel.addEventListener('change', () => { $('[data-qlist]', root).innerHTML = qPicker(sel.value); $('[data-codebox]', root).hidden = true; count(); });
    root.addEventListener('change', (e) => { if (e.target.matches('[data-q]')) count(); });
    $('[data-q-all]', root).addEventListener('click', () => { $$('[data-q]', root).forEach((c) => { c.checked = true; }); count(); });
    $('[data-q-none]', root).addEventListener('click', () => { $$('[data-q]', root).forEach((c) => { c.checked = false; }); count(); });
    const showAsg = () => { $('[data-asglist]', root).innerHTML = asgTable(); };
    $('[data-make]', root).addEventListener('click', () => {
      const idx = $$('[data-q]:checked', root).map((c) => Number(c.dataset.q));
      const box = $('[data-codebox]', root);
      if (!idx.length) { $('[data-q-count]', root).textContent = 'Hãy chọn ít nhất 1 câu.'; return; }
      const code = makeCode(sel.value, idx);
      $('[data-code]', root).textContent = code; box.hidden = false;
      const list = assignments().filter((a) => a.code !== code);
      list.unshift({ code: code, key: sel.value, n: idx.length, d: ymd() });
      write(K_ASG, list.slice(0, 50)); showAsg();
    });
    $('[data-copycode]', root).addEventListener('click', (e) => copy($('[data-code]', root).textContent, e.currentTarget));
    root.addEventListener('click', (e) => {
      const c = e.target.closest('[data-copyasg]'); if (c) { copy(c.dataset.copyasg, c); return; }
      const d = e.target.closest('[data-delasg]'); if (d) { const l = assignments(); l.splice(Number(d.dataset.delasg), 1); write(K_ASG, l); showAsg(); }
    });
    const filterNow = () => { const f = $('[data-filter]', root); return f ? f.value : ''; };
    const showRes = (f) => { $('[data-results]', root).innerHTML = resultHTML(f); };
    root.addEventListener('change', (e) => { if (e.target.matches('[data-filter]')) showRes(e.target.value); });
    $('[data-add]', root).addEventListener('click', () => {
      const r = results(); let ok = 0, bad = 0;
      $('[data-paste]', root).value.split(/\s+/).filter(Boolean).forEach((line) => {
        const o = readToken(line);
        if (!o) { bad++; return; }
        const k = o.n + '|' + o.a;
        const old = r[k];
        /* Giữ lần làm điểm cao nhất; đếm số lần nộp. */
        if (!old || o.s / o.t >= old.s / old.t) r[k] = Object.assign({}, o, { c: (old && old.c || 0) + 1 });
        else old.c = (old.c || 1) + 1;
        ok++;
      });
      write(K_RES, r);
      $('[data-msg]', root).textContent = (ok ? 'Đã ghi nhận ' + ok + ' kết quả. ' : '') + (bad ? bad + ' mã không đọc được (kiểm tra lại, mã bắt đầu bằng KQ1.).' : '');
      if (ok) $('[data-paste]', root).value = '';
      showRes(filterNow());
    });
    $('[data-clear]', root).addEventListener('click', () => {
      if (!window.confirm('Xoá toàn bộ danh sách kết quả đã ghi nhận trên máy này?')) return;
      write(K_RES, {}); showRes(''); $('[data-msg]', root).textContent = 'Đã xoá danh sách kết quả.';
    });
    $('[data-csv]', root).addEventListener('click', () => {
      const blob = new Blob([csv()], { type: 'text/csv;charset=utf-8' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'ket-qua-lop-' + ymd() + '.csv';
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    });
  }

  /* Ô nhập mã bài tập cho học sinh (xử lý ở workspace.js bằng một trình nghe chung). */
  const joinForm = () => '<form class="joinform" data-join><label>Mã bài tập <input type="text" data-join-in autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="VD: TIN9-B10A hoặc AI1.…" aria-label="Mã bài tập của giáo viên"></label>' +
    '<button type="submit" class="btn btn--primary btn--sm">Vào làm bài</button><p class="prac__msg" data-join-msg aria-live="polite"></p></form>';

  window.Classroom = {
    codeOf: codeOf, items: items, locate: locate, makeCode: makeCode, parseCode: parseCode, go: go, joinForm: joinForm,
    token: token, readToken: readToken, ymd: ymd,
    teacherOn: teacherOn, setTeacher: setTeacher,
    page(key) { return { html: dashboard(key), mount: mountDashboard }; }
  };
})();
