/* ==========================================================================
   TÀI KHOẢN CỤC BỘ (Local account system)
   --------------------------------------------------------------------------
   Không có máy chủ. Mọi thứ nằm trong localStorage của trình duyệt.

   - Danh sách tài khoản:  eduverse_users  (mảng {username, name, role, salt, hash, created})
   - Tài khoản đang dùng:  eduverse_session (username) — không có thì là "Khách".
   - TÁCH DỮ LIỆU THEO NGƯỜI DÙNG: các mô-đun cũ đều lưu dưới khoá "sgk.*". Mô-đun
     này chặn getItem/setItem/removeItem của localStorage và đổi "sgk.x" thành
     "u.<username>.sgk.x" khi đang đăng nhập, nên XP, cấp độ, thẻ ôn từ, nhiệm vụ,
     bài tập đã giao, kết quả… của mỗi người nằm riêng mà KHÔNG phải sửa các mô-đun cũ.
     Vì vậy auth.js phải nạp TRƯỚC mọi mô-đun khác đọc dữ liệu.
     Khách (chưa đăng nhập) dùng khoá cũ không tiền tố, nên dữ liệu cũ không mất.
     Ngoại lệ dùng chung cả máy: sgk.board (bảng xếp hạng trên máy).
   - Đăng nhập / đăng xuất / khôi phục xong sẽ tải lại trang để mọi mô-đun nạp lại
     đúng dữ liệu của người đó.

   GHI CHÚ AN TOÀN (nói thẳng): đây là tài khoản trên MỘT TRÌNH DUYỆT, không phải
   tài khoản trên máy chủ. Mã PIN 4 số chỉ ngăn người khác vô tình dùng nhầm tài
   khoản, không chống được người cố ý (dữ liệu nằm trong localStorage, mã PIN chỉ có
   10 000 khả năng). Ai đăng ký "Giáo viên" cũng được. "Mã tài khoản" chứa dấu vết
   PIN và toàn bộ tiến độ, hãy giữ kín như mật khẩu. Không đưa dữ liệu nhạy cảm vào.

   API: Auth.user(), Auth.users(), Auth.register(o), Auth.login(u, pin), Auth.logout(),
        Auth.exportToken(), Auth.importToken(text, {overwrite}), Auth.level(),
        Auth.chip(variant), Auth.loginButton(variant), Auth.open(tab), Auth.notice(msg)
   ========================================================================== */
(function () {
  'use strict';
  const USERS = 'eduverse_users', SESSION = 'eduverse_session', LOCK = 'eduverse_lock';
  const SHARED = { 'sgk.board': 1 };                          // dùng chung cả máy
  const NO_EXPORT = { 'sgk.ai.cfg': 1, 'sgk.ai.cache': 1 };   // khoá API và bộ nhớ đệm không đưa vào mã
  const NAME_RE = /^[a-z0-9_]{3,20}$/, PIN_RE = /^\d{4}$/, TOKEN = 'EVA1.';
  const ROLE_VI = { student: 'Học sinh', teacher: 'Giáo viên' }, ROLE_SHORT = { student: 'HS', teacher: 'GV' };

  /* ---------- Truy cập localStorage nguyên bản (không qua bộ chặn) ---------- */
  let LS = null;
  try { LS = window.localStorage; } catch (e) { LS = null; }
  const proto = window.Storage && window.Storage.prototype;
  const rawGet = proto && proto.getItem, rawSet = proto && proto.setItem, rawDel = proto && proto.removeItem;
  const rg = (k) => { try { return LS ? rawGet.call(LS, k) : null; } catch (e) { return null; } };
  const rs = (k, v) => { try { if (LS) rawSet.call(LS, k, v); return true; } catch (e) { return false; } };
  const rd = (k) => { try { if (LS) rawDel.call(LS, k); } catch (e) { /* bỏ qua */ } };
  const rkeys = () => { const a = []; try { for (let i = 0; LS && i < LS.length; i++) a.push(LS.key(i)); } catch (e) { /* bỏ qua */ } return a; };
  const readJSON = (k, d) => { try { const v = JSON.parse(rg(k)); return v == null ? d : v; } catch (e) { return d; } };

  /* ---------- Băm PIN (cyrb53 lặp nhiều vòng; đủ để không lưu PIN dạng rõ) ---------- */
  function cyrb53(str, seed) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0; i < str.length; i++) { const c = str.charCodeAt(i); h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677); }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
  }
  const hashPin = (pin, salt, username) => { let h = salt + ':' + username + ':' + pin; for (let i = 0; i < 3000; i++) h = cyrb53(h, i & 7); return h; };
  const makeSalt = () => { try { const a = new Uint32Array(3); window.crypto.getRandomValues(a); return Array.prototype.map.call(a, (n) => n.toString(36)).join(''); } catch (e) { return Math.random().toString(36).slice(2) + Date.now().toString(36); } };

  /* ---------- Danh sách tài khoản ---------- */
  const listUsers = () => { const a = readJSON(USERS, []); return Array.isArray(a) ? a.filter((u) => u && NAME_RE.test(u.username || '')) : []; };
  const saveUsers = (a) => rs(USERS, JSON.stringify(a));
  const findUser = (name) => listUsers().find((u) => u.username === name) || null;

  let current = null;
  { const s = rg(SESSION); if (s) current = findUser(s); }

  /* ---------- Bộ chặn: đổi khoá sgk.* theo tài khoản đang dùng ---------- */
  const prefix = (u) => 'u.' + u + '.';
  const mapKey = (k) => (current && typeof k === 'string' && k.indexOf('sgk.') === 0 && !SHARED[k] ? prefix(current.username) + k : k);
  if (proto && rawGet) {
    const wrap = (name, orig) => {
      proto[name] = function (k, v) {
        if (this === LS) k = mapKey(k);
        return arguments.length > 1 ? orig.call(this, k, v) : orig.call(this, k);
      };
    };
    wrap('getItem', rawGet); wrap('setItem', rawSet); wrap('removeItem', rawDel);
  }

  /* Khoá dữ liệu của một tài khoản: {"sgk.prog": "...", ...} */
  function dataOf(username, forExport) {
    const p = prefix(username), out = {};
    rkeys().forEach((k) => { if (k.indexOf(p) === 0) { const base = k.slice(p.length); if (base.indexOf('sgk.') === 0 && !(forExport && NO_EXPORT[base])) out[base] = rg(k); } });
    return out;
  }
  function clearData(username) { const p = prefix(username); rkeys().forEach((k) => { if (k.indexOf(p) === 0) rd(k); }); }
  function writeData(username, d) { const p = prefix(username); Object.keys(d).forEach((k) => rs(p + k, d[k])); }
  /* Dữ liệu "Khách" hiện có trên máy này (khoá không tiền tố). */
  function guestData() { const o = {}; rkeys().forEach((k) => { if (k.indexOf('sgk.') === 0 && !SHARED[k] && !NO_EXPORT[k]) o[k] = rg(k); }); return o; }

  const progOf = (username) => { try { return JSON.parse(rg(prefix(username) + 'sgk.prog')) || {}; } catch (e) { return {}; } };
  const levelOf = (username) => Math.floor((Number(progOf(username).xp) || 0) / 100) + 1;
  const xpOf = (username) => Number(progOf(username).xp) || 0;

  const reload = () => { window.location.reload(); };
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const initial = (n) => (String(n || '?').trim().split(/\s+/).pop() || '?').charAt(0).toUpperCase();

  /* ---------- Khoá tạm khi nhập sai PIN nhiều lần ---------- */
  function lockLeft(username) { const l = readJSON(LOCK, {})[username]; return l && l.until > Date.now() ? Math.ceil((l.until - Date.now()) / 1000) : 0; }
  function failPin(username) {
    const all = readJSON(LOCK, {}), l = all[username] || { n: 0, until: 0 };
    l.n += 1; if (l.n >= 5) { l.until = Date.now() + 30000; l.n = 0; }
    all[username] = l; rs(LOCK, JSON.stringify(all));
  }
  function okPin(username) { const all = readJSON(LOCK, {}); delete all[username]; rs(LOCK, JSON.stringify(all)); }

  /* ======================================================================
     Nghiệp vụ
     ====================================================================== */
  function register(o) {
    const name = String(o.name || '').trim().replace(/\s+/g, ' ');
    const username = String(o.username || '').trim().toLowerCase();
    const role = o.role === 'teacher' ? 'teacher' : 'student', pin = String(o.pin || '');
    if (name.length < 2 || name.length > 50) return { ok: false, error: 'Họ và tên cần từ 2 đến 50 kí tự.' };
    if (!NAME_RE.test(username)) return { ok: false, error: 'Tên đăng nhập gồm 3–20 kí tự: chữ thường không dấu, số hoặc dấu gạch dưới, viết liền.' };
    if (!PIN_RE.test(pin)) return { ok: false, error: 'Mã PIN gồm đúng 4 chữ số.' };
    if (findUser(username)) return { ok: false, error: 'Tên đăng nhập này đã có trên máy. Hãy chọn tên khác.' };
    const salt = makeSalt();
    const acc = { username: username, name: name, role: role, salt: salt, hash: hashPin(pin, salt, username), created: Date.now() };
    const all = listUsers(); all.push(acc);
    if (!saveUsers(all)) return { ok: false, error: 'Trình duyệt đang chặn lưu dữ liệu, không tạo được tài khoản.' };
    clearData(username);
    const base = o.migrate ? guestData() : {};
    base['sgk.role'] = role;
    base['sgk.teacher.on'] = JSON.stringify(role === 'teacher');
    let prog = {}; try { prog = JSON.parse(base['sgk.prog'] || '{}') || {}; } catch (e) { prog = {}; }
    if (!prog.nick) prog.nick = username;                    // biệt danh = tên đăng nhập, không phải họ tên thật
    base['sgk.prog'] = JSON.stringify(Object.assign({ xp: 0, days: [], best: {} }, prog));
    writeData(username, base);
    rs(SESSION, username);
    return { ok: true, user: acc };
  }

  function login(username, pin) {
    const acc = findUser(String(username || '').toLowerCase());
    if (!acc) return { ok: false, error: 'Không tìm thấy tài khoản này.' };
    const left = lockLeft(acc.username);
    if (left) return { ok: false, error: 'Nhập sai nhiều lần. Hãy thử lại sau ' + left + ' giây.' };
    if (hashPin(String(pin || ''), acc.salt, acc.username) !== acc.hash) { failPin(acc.username); return { ok: false, error: 'Mã PIN chưa đúng.' }; }
    okPin(acc.username);
    rs(prefix(acc.username) + 'sgk.role', acc.role);
    rs(SESSION, acc.username);
    return { ok: true, user: acc };
  }

  function logout() { rd(SESSION); }

  /* ---------- Mã chuyển thiết bị ---------- */
  const b64 = (s) => window.btoa(unescape(encodeURIComponent(s)));
  const unb64 = (s) => decodeURIComponent(escape(window.atob(s)));
  function exportToken() {
    if (!current) return '';
    const u = { username: current.username, name: current.name, role: current.role, salt: current.salt, hash: current.hash };
    const d = dataOf(current.username, true);
    const body = { v: 1, t: Date.now(), xp: xpOf(current.username), u: u, d: d };
    body.c = cyrb53(JSON.stringify(u) + JSON.stringify(d), 11);
    return TOKEN + b64(JSON.stringify(body));
  }
  function parseToken(text) {
    const t = String(text || '').replace(/\s+/g, '');
    if (t.indexOf(TOKEN) !== 0) return { ok: false, error: 'Đây không phải mã tài khoản (phải bắt đầu bằng EVA1.).' };
    let body;
    try { body = JSON.parse(unb64(t.slice(TOKEN.length))); } catch (e) { return { ok: false, error: 'Mã bị sai hoặc bị cắt mất. Hãy sao chép lại đủ toàn bộ mã.' }; }
    if (!body || body.v !== 1 || !body.u || !body.d || typeof body.d !== 'object') return { ok: false, error: 'Mã không đúng định dạng.' };
    const u = body.u;
    if (!NAME_RE.test(u.username || '') || !u.name || !u.salt || !u.hash || (u.role !== 'student' && u.role !== 'teacher')) return { ok: false, error: 'Thông tin tài khoản trong mã không hợp lệ.' };
    if (body.c !== cyrb53(JSON.stringify(u) + JSON.stringify(body.d), 11)) return { ok: false, error: 'Mã bị sửa hoặc hỏng, không khôi phục được.' };
    const keys = Object.keys(body.d);
    if (keys.some((k) => k.indexOf('sgk.') !== 0 || typeof body.d[k] !== 'string')) return { ok: false, error: 'Dữ liệu trong mã không hợp lệ.' };
    return { ok: true, body: body };
  }
  function importToken(text, opts) {
    const r = parseToken(text); if (!r.ok) return r;
    const u = r.body.u, exists = findUser(u.username);
    if (exists && !(opts && opts.overwrite)) return { ok: false, exists: true, username: u.username, error: 'Tài khoản "' + u.username + '" đã có trên máy này.' };
    const acc = { username: u.username, name: String(u.name).slice(0, 50), role: u.role, salt: u.salt, hash: u.hash, created: Date.now() };
    const all = listUsers().filter((x) => x.username !== acc.username); all.push(acc);
    if (!saveUsers(all)) return { ok: false, error: 'Trình duyệt đang chặn lưu dữ liệu.' };
    clearData(acc.username); writeData(acc.username, r.body.d);
    rs(prefix(acc.username) + 'sgk.role', acc.role);
    rs(SESSION, acc.username);
    return { ok: true, user: acc };
  }

  /* ======================================================================
     Giao diện: nút / thẻ trên thanh điều hướng và hộp thoại <dialog>
     ====================================================================== */
  function notice(msg) {
    const box = document.getElementById('toast'); if (!box) { return; }
    box.textContent = msg; box.classList.add('is-show');
    window.setTimeout(() => box.classList.remove('is-show'), 3600);
  }
  function chip(variant) {
    if (!current) return '';
    return '<button type="button" class="acct' + (variant === 'compact' ? ' acct--compact' : '') + '" data-auth-open="profile" aria-haspopup="dialog" title="Hồ sơ và tài khoản">' +
      '<span class="acct__av" aria-hidden="true">' + esc(initial(current.name)) + '</span>' +
      '<span class="acct__t"><b>' + esc(current.name) + '</b><small>' + ROLE_SHORT[current.role] + ' · Cấp ' + levelOf(current.username) + '</small></span></button>';
  }
  function loginButton(variant) {
    return '<button type="button" class="btn btn--primary btn--sm acct__login" data-auth-open="login">' +
      '<span aria-hidden="true">🔐</span><span class="acct__lt">' + (variant === 'compact' ? 'Đăng nhập' : 'Đăng nhập / Tạo tài khoản') + '</span></button>';
  }

  let dlg = null;
  function ensureDialog() {
    if (dlg && dlg.isConnected) return dlg;
    dlg = document.createElement('dialog');
    dlg.className = 'auth'; dlg.setAttribute('aria-labelledby', 'auth-title');
    document.body.appendChild(dlg);
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });          // bấm nền để đóng
    return dlg;
  }
  const field = (id, label, input, hint) => '<label class="auth__f" for="' + id + '"><span>' + label + '</span>' + input + (hint ? '<small>' + hint + '</small>' : '') + '</label>';
  const msg = (id) => '<p class="auth__msg" id="' + id + '" role="alert" aria-live="assertive"></p>';

  function tabsHTML(active) {
    const t = (id, label) => '<button type="button" class="auth__tab' + (active === id ? ' is-on' : '') + '" role="tab" aria-selected="' + (active === id) + '" data-auth-tab="' + id + '">' + label + '</button>';
    return '<div class="auth__tabs" role="tablist">' + t('login', 'Đăng nhập') + t('register', 'Tạo tài khoản mới') + t('restore', 'Khôi phục từ mã') + '</div>';
  }
  function panelLogin() {
    const us = listUsers();
    if (!us.length) return '<p class="auth__hint">Máy này chưa có tài khoản nào. Hãy <button type="button" class="auth__link" data-auth-tab="register">tạo tài khoản mới</button> hoặc <button type="button" class="auth__link" data-auth-tab="restore">khôi phục từ mã</button>.</p>';
    const list = us.map((u, i) => '<label class="auth__acct"><input type="radio" name="auth-who" value="' + esc(u.username) + '"' + (i === 0 ? ' checked' : '') + '>' +
      '<span class="acct__av" aria-hidden="true">' + esc(initial(u.name)) + '</span><span class="auth__who"><b>' + esc(u.name) + '</b><small>@' + esc(u.username) + ' · ' + ROLE_VI[u.role] + ' · Cấp ' + levelOf(u.username) + '</small></span></label>').join('');
    return '<form class="auth__form" data-auth-login autocomplete="off"><div class="auth__list" role="radiogroup" aria-label="Chọn tài khoản">' + list + '</div>' +
      field('auth-pin', 'Mã PIN (4 chữ số)', '<input id="auth-pin" name="pin" type="password" inputmode="numeric" pattern="\\d{4}" maxlength="4" autocomplete="off" required>') +
      msg('auth-msg-l') + '<div class="auth__act"><button type="submit" class="btn btn--primary">Đăng nhập</button><button type="button" class="btn btn--ghost" data-auth-close>Dùng với tư cách Khách</button></div></form>';
  }
  function panelRegister() {
    const hasGuest = Object.keys(guestData()).length > 0 && !current;
    return '<form class="auth__form" data-auth-register autocomplete="off">' +
      field('auth-name', 'Họ và tên thật', '<input id="auth-name" name="name" type="text" maxlength="50" autocomplete="off" required>') +
      field('auth-user', 'Tên đăng nhập', '<input id="auth-user" name="username" type="text" maxlength="20" autocapitalize="off" spellcheck="false" autocomplete="off" required>', 'Viết liền, không dấu: chữ thường, số hoặc dấu gạch dưới (3–20 kí tự).') +
      '<fieldset class="auth__roles"><legend>Vai trò</legend>' +
      '<label><input type="radio" name="role" value="student" checked><span>👨‍🎓 Học sinh</span></label><label><input type="radio" name="role" value="teacher"><span>👩‍🏫 Giáo viên</span></label></fieldset>' +
      field('auth-pin2', 'Mã PIN bảo vệ (4 chữ số)', '<input id="auth-pin2" name="pin" type="password" inputmode="numeric" pattern="\\d{4}" maxlength="4" autocomplete="off" required>', 'Chỉ để tránh dùng nhầm tài khoản trên máy dùng chung. Hãy nhớ mã này.') +
      (hasGuest ? '<label class="auth__chk"><input type="checkbox" name="migrate" checked><span>Chuyển điểm XP và tiến độ đang có trên máy này (Khách) vào tài khoản mới</span></label>' : '') +
      msg('auth-msg-r') + '<div class="auth__act"><button type="submit" class="btn btn--primary">Tạo tài khoản</button></div></form>';
  }
  function panelRestore() {
    return '<form class="auth__form" data-auth-restore>' +
      '<p class="auth__hint">Dán <b>mã tài khoản</b> (bắt đầu bằng <code>EVA1.</code>) xuất từ thiết bị khác. Tài khoản và tiến độ sẽ được khôi phục trên máy này.</p>' +
      field('auth-code', 'Mã tài khoản', '<textarea id="auth-code" name="code" rows="4" spellcheck="false" autocomplete="off" required></textarea>') +
      msg('auth-msg-s') + '<div class="auth__act"><button type="submit" class="btn btn--primary">Khôi phục</button></div></form>';
  }
  function panelProfile() {
    const u = current, token = exportToken();
    return '<div class="auth__me"><span class="acct__av acct__av--lg" aria-hidden="true">' + esc(initial(u.name)) + '</span>' +
      '<div><h2 id="auth-title" class="auth__name">' + esc(u.name) + '</h2><p class="auth__sub">@' + esc(u.username) + ' · <span class="auth__role auth__role--' + u.role + '">' + ROLE_VI[u.role] + '</span></p></div></div>' +
      '<dl class="auth__stats"><div><dt>Cấp độ</dt><dd>' + levelOf(u.username) + '</dd></div><div><dt>Điểm XP</dt><dd>' + xpOf(u.username) + '</dd></div><div><dt>Chế độ</dt><dd>' + ROLE_VI[u.role] + '</dd></div></dl>' +
      '<section class="auth__sec"><h3>Mã chuyển thiết bị</h3><p class="auth__hint">Sao chép mã này sang điện thoại hoặc máy tính khác, rồi chọn “Khôi phục từ mã” để dùng tiếp. <b>Giữ kín mã</b> như mật khẩu. Mã không chứa khoá API Gemini.</p>' +
      '<div class="auth__act"><button type="button" class="btn btn--ghost btn--sm" data-auth-export>📤 Xuất mã tài khoản</button></div>' +
      '<div data-auth-exportbox hidden><textarea class="auth__code" readonly rows="4" aria-label="Mã tài khoản" data-auth-token>' + esc(token) + '</textarea>' +
      '<div class="auth__act"><button type="button" class="btn btn--primary btn--sm" data-auth-copy>Sao chép mã</button><button type="button" class="btn btn--ghost btn--sm" data-auth-download>Tải về tệp .txt</button></div></div></section>' +
      '<section class="auth__sec"><h3>Khôi phục từ mã</h3>' + panelRestore() + '</section>' +
      '<div class="auth__act auth__act--end"><button type="button" class="btn btn--ghost" data-auth-switch>Đổi tài khoản</button><button type="button" class="btn btn--primary" data-auth-logout>Đăng xuất</button></div>';
  }

  function open(tab) {
    const d = ensureDialog();
    if (current && tab !== 'login' && tab !== 'register' && tab !== 'restore') tab = 'profile';
    if (current && tab === 'profile') {
      d.innerHTML = '<div class="auth__box">' + closeBtn() + panelProfile() + '</div>';
    } else {
      tab = tab === 'register' || tab === 'restore' ? tab : 'login';
      d.innerHTML = '<div class="auth__box">' + closeBtn() + '<h2 id="auth-title" class="auth__title">Tài khoản</h2><p class="auth__lead">Mỗi tài khoản có điểm XP, cấp độ và bài tập riêng trên thiết bị này. Chưa cần thì cứ dùng với tư cách Khách.</p>' +
        tabsHTML(tab) + '<div class="auth__panel">' + (tab === 'register' ? panelRegister() : tab === 'restore' ? panelRestore() : panelLogin()) + '</div></div>';
    }
    if (!d.open) { try { d.showModal(); } catch (e) { d.setAttribute('open', ''); } }
    const f = d.querySelector('input:not([type=radio]):not([type=checkbox]), textarea, button.auth__tab.is-on');
    if (f && f.focus) { try { f.focus(); } catch (e) { /* bỏ qua */ } }
  }
  const closeBtn = () => '<button type="button" class="auth__x" data-auth-close aria-label="Đóng">×</button>';
  const setMsg = (id, text) => { const m = dlg && dlg.querySelector('#' + id); if (m) m.textContent = text || ''; };

  document.addEventListener('click', (e) => {
    const t = e.target.closest ? e.target.closest('[data-auth-open],[data-auth-tab],[data-auth-close],[data-auth-logout],[data-auth-switch],[data-auth-export],[data-auth-copy],[data-auth-download]') : null;
    if (!t) return;
    if (t.dataset.authOpen !== undefined) { open(t.dataset.authOpen); return; }
    if (t.dataset.authTab !== undefined) { open(t.dataset.authTab); return; }
    if (t.dataset.authClose !== undefined) { if (dlg) dlg.close(); return; }
    if (t.dataset.authLogout !== undefined) { logout(); reload(); return; }
    if (t.dataset.authSwitch !== undefined) { logout(); reload(); return; }
    if (t.dataset.authExport !== undefined) { const box = dlg.querySelector('[data-auth-exportbox]'); box.hidden = false; const ta = box.querySelector('textarea'); ta.value = exportToken(); ta.focus(); ta.select(); return; }
    if (t.dataset.authCopy !== undefined) {
      const ta = dlg.querySelector('[data-auth-token]'); ta.focus(); ta.select();
      const done = () => { t.textContent = 'Đã sao chép ✔'; };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(ta.value).then(done, () => { try { document.execCommand('copy'); done(); } catch (x) { /* người dùng tự Ctrl+C */ } });
      else { try { document.execCommand('copy'); done(); } catch (x) { /* người dùng tự Ctrl+C */ } }
      return;
    }
    if (t.dataset.authDownload !== undefined) {
      const ta = dlg.querySelector('[data-auth-token]'), blob = new Blob([ta.value], { type: 'text/plain;charset=utf-8' }), a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = 'ma-tai-khoan-' + (current ? current.username : 'eduverse') + '.txt'; document.body.appendChild(a); a.click(); a.remove();
      window.setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    }
  });

  document.addEventListener('submit', (e) => {
    const f = e.target;
    if (f.matches && f.matches('[data-auth-login]')) {
      e.preventDefault();
      const who = f.querySelector('input[name=auth-who]:checked'), r = login(who ? who.value : '', f.elements.pin.value);
      if (r.ok) reload(); else { setMsg('auth-msg-l', r.error); f.elements.pin.value = ''; f.elements.pin.focus(); }
    } else if (f.matches && f.matches('[data-auth-register]')) {
      e.preventDefault();
      const r = register({ name: f.elements.name.value, username: f.elements.username.value, role: f.elements.role.value, pin: f.elements.pin.value, migrate: !!(f.elements.migrate && f.elements.migrate.checked) });
      if (r.ok) reload(); else setMsg('auth-msg-r', r.error);
    } else if (f.matches && f.matches('[data-auth-restore]')) {
      e.preventDefault();
      const code = f.elements.code.value, parsed = parseToken(code);
      if (!parsed.ok) { setMsg('auth-msg-s', parsed.error); return; }
      const run = (over) => { const r = importToken(code, { overwrite: over }); if (r.ok) reload(); else setMsg('auth-msg-s', r.error); };
      if (findUser(parsed.body.u.username)) {
        const m = f.querySelector('.auth__msg');
        m.innerHTML = 'Tài khoản “' + esc(parsed.body.u.username) + '” đã có trên máy này. Khôi phục sẽ <b>ghi đè</b> tiến độ hiện có. <button type="button" class="auth__link" data-auth-yes>Ghi đè và khôi phục</button>';
        m.querySelector('[data-auth-yes]').addEventListener('click', () => run(true));
      } else run(false);
    }
  });

  /* Đổi tài khoản ở tab khác: tải lại để dữ liệu khớp. */
  window.addEventListener('storage', (e) => { if (e.key === SESSION) reload(); });

  window.Auth = {
    user: () => current, isLoggedIn: () => !!current, users: listUsers,
    register: register, login: login, logout: logout,
    exportToken: exportToken, importToken: importToken, level: () => (current ? levelOf(current.username) : 0),
    chip: chip, loginButton: loginButton, open: open, notice: notice
  };
})();
