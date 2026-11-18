/* ==========================================================================
   CHUYỂN CHẾ ĐỘ HỌC SINH / GIÁO VIÊN (Role switcher)
   --------------------------------------------------------------------------
   Nút chuyển nằm trên thanh điều hướng, hiện ở mọi màn hình.

   - Vai trò lưu trong localStorage (khoá sgk.role) nên tải lại trang vẫn giữ.
     Lần đầu, nếu máy từng bật chế độ giáo viên cũ (sgk.teacher.on) thì dùng
     lại giá trị đó. Đây là NGUỒN DUY NHẤT: Roles.set() cũng cập nhật
     Classroom.setTeacher nên các mô-đun cũ vẫn đọc đúng.
   - <body data-role="student|teacher"> cho phép CSS ẩn/hiện theo vai trò mà
     không cần viết lại từng mô-đun:  body[data-role="teacher"] .sw--stu { … }
   - Chuyển sang Giáo viên khi đang ở trong một bài thì mở thẳng tab Quản lý
     giáo viên; chuyển về Học sinh khi đang ở tab đó thì quay về nội dung sách.
   - Ghi chú an toàn: đây chỉ là công tắc giao diện trên máy dùng chung, không
     phải đăng nhập. Học sinh vẫn có thể tự bật; mã kết quả có kiểm tra toàn vẹn
     là lớp bảo vệ điểm số, không phải nút này.

   API: Roles.get(), Roles.isTeacher(), Roles.set(role), Roles.switcher()
   ========================================================================== */
(function () {
  'use strict';
  const K = 'sgk.role';
  const ROLES = ['student', 'teacher'];
  const C = () => window.Classroom;

  function stored() {
    try { const v = window.localStorage.getItem(K); if (ROLES.indexOf(v) >= 0) return v; } catch (e) { /* bỏ qua */ }
    return C() && C().teacherOn() ? 'teacher' : 'student';           // di chuyển từ công tắc giáo viên cũ
  }
  let role = stored();

  /* Áp vai trò lên giao diện và đồng bộ với mô-đun lớp học. */
  function apply() {
    if (document.body) document.body.dataset.role = role;
    if (C()) C().setTeacher(role === 'teacher');
    document.querySelectorAll('[data-role-set]').forEach((b) => {
      const on = b.dataset.roleSet === role;
      b.classList.toggle('is-on', on); b.setAttribute('aria-checked', String(on)); b.tabIndex = on ? 0 : -1;
    });
  }

  /* Đi tới màn hình hợp với vai trò, hoặc chỉ vẽ lại trang hiện tại. */
  function navigate() {
    const m = /^#\/([^/]+)\/([^/]+)(?:\/([^/]+))?/.exec(window.location.hash);
    if (m) {                                                          // đang trong một bài: #/lop-9/bai-10a[/…]
      const here = '#/' + m[1] + '/' + m[2];
      const target = role === 'teacher' ? here + '/giao-vien' : (m[3] === 'giao-vien' ? here : null);
      if (target && target !== window.location.hash) { window.location.hash = target; return; }
    }
    window.dispatchEvent(new HashChangeEvent('hashchange'));           // vẽ lại để thanh tab, thanh bên đổi theo vai trò
  }

  function set(next, opts) {
    if (ROLES.indexOf(next) < 0) return;
    const changed = next !== role;
    role = next;
    try { window.localStorage.setItem(K, role); } catch (e) { /* trình duyệt chặn lưu: vẫn đổi trong phiên */ }
    apply();
    if (changed || (opts && opts.go)) navigate();
  }

  /* variant 'compact': bỏ chữ "Chế độ" để vừa thanh công cụ của trang đọc sách. */
  function switcher(variant) {
    const b = (id, ico, pre, name) => '<button type="button" class="role__b' + (role === id ? ' is-on' : '') + '" role="radio" aria-checked="' + (role === id) + '" tabindex="' + (role === id ? 0 : -1) + '" data-role-set="' + id + '">' +
      '<span class="role__i" aria-hidden="true">' + ico + '</span><span class="role__t"><span class="role__p">' + pre + '</span>' + name + '</span></button>';
    return '<div class="role' + (variant === 'compact' ? ' role--compact' : '') + '" role="radiogroup" aria-label="Chế độ sử dụng">' + b('student', '👨‍🎓', 'Chế độ ', 'Học sinh') + b('teacher', '👩‍🏫', 'Chế độ ', 'Giáo viên') + '</div>';
  }

  /* Bấm nút chuyển, nút "Bật chế độ giáo viên" trong trang quản lý, hoặc phím mũi tên trong nhóm. */
  document.addEventListener('click', (e) => {
    const t = e.target.closest ? e.target.closest('[data-role-set], [data-teacher-toggle]') : null;
    if (!t) return;
    set(t.dataset.roleSet || 'teacher', { go: true });
  });
  document.addEventListener('keydown', (e) => {
    if ((e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') || !e.target.closest || !e.target.closest('.role')) return;
    e.preventDefault();
    set(role === 'student' ? 'teacher' : 'student', { go: true });
    const on = document.querySelector('.role__b.is-on'); if (on) on.focus();
  });
  /* Mở nhiều tab trình duyệt: đổi ở tab này thì tab kia cập nhật theo. */
  window.addEventListener('storage', (e) => {
    if (e.key !== K || ROLES.indexOf(e.newValue) < 0 || e.newValue === role) return;
    role = e.newValue; apply(); window.dispatchEvent(new HashChangeEvent('hashchange'));
  });

  apply();
  window.Roles = { get: () => role, isTeacher: () => role === 'teacher', set: set, switcher: switcher, roles: ROLES };
})();
