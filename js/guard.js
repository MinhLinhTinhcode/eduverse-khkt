/* EduVerse – hạn chế dán/sao chép để học sinh tự làm bài (giảm, không ngăn tuyệt đối việc dùng AI).
   Tắt toàn bộ: đặt window.EV_GUARD = { enabled: false } trước khi nạp tệp này, hoặc xoá thẻ script trong index.html. */
(function () {
  'use strict';
  var C = { enabled: true, answer: '.prac__in, .rn__in', maxCps: 12, maxJump: 8, noCopyBook: true };
  if (typeof window !== 'undefined' && window.EV_GUARD) for (var k in window.EV_GUARD) C[k] = window.EV_GUARD[k];

  /* Trả về true nếu lần gõ này hợp lệ. s = {v: giá trị cũ, log: [[thời điểm, số kí tự thêm]]} */
  function allowed(s, add, now, inputType, composing) {
    if (composing || inputType === 'insertCompositionText' || inputType === 'insertReplacementText') return true;
    if (add <= 0) return true;
    if (add > C.maxJump) return false;
    var sum = add, keep = [];
    for (var i = 0; i < s.log.length; i++) if (now - s.log[i][0] < 1000) { keep.push(s.log[i]); sum += s.log[i][1]; }
    s.log = keep;
    if (sum > C.maxCps) return false;
    s.log.push([now, add]);
    return true;
  }
  if (typeof window !== 'undefined') window.EV_GUARD_CHECK = allowed;
  if (!C.enabled || typeof document === 'undefined') return;

  var box, timer;
  function toast(msg) {
    if (!box) {
      box = document.createElement('div');
      box.setAttribute('role', 'status'); box.setAttribute('aria-live', 'polite');
      box.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);max-width:90vw;padding:10px 16px;border-radius:10px;background:#1f2937;color:#fff;font:600 15px/1.4 sans-serif;z-index:99999;box-shadow:0 4px 14px rgba(0,0,0,.3);display:none';
      document.body.appendChild(box);
    }
    box.textContent = msg; box.style.display = 'block';
    clearTimeout(timer); timer = setTimeout(function () { box.style.display = 'none'; }, 2600);
  }
  function isAns(t) { return !!(t && t.matches && t.matches(C.answer)); }

  function blockPaste(e) { if (isAns(e.target)) { e.preventDefault(); toast('Ô này không cho dán. Hãy tự gõ câu trả lời nhé.'); } }
  document.addEventListener('paste', blockPaste, true);
  document.addEventListener('drop', blockPaste, true);
  document.addEventListener('beforeinput', function (e) {
    if (isAns(e.target) && /^insertFrom(Paste|Drop|Yank)/.test(e.inputType || '')) blockPaste(e);
  }, true);

  var state = new WeakMap();
  document.addEventListener('input', function (e) {
    var t = e.target; if (!isAns(t)) return;
    var s = state.get(t); if (!s) { s = { v: '', log: [] }; state.set(t, s); }
    var v = t.value, ok = allowed(s, v.length - s.v.length, Date.now(), e.inputType, e.isComposing);
    if (!ok) { t.value = s.v; toast('Gõ quá nhanh hoặc dán nhiều chữ một lúc. Hãy tự gõ từng chữ nhé.'); return; }
    s.v = v;
  }, true);

  if (C.noCopyBook) {
    var st = document.createElement('style');
    st.textContent = '.page__body{-webkit-user-select:none;user-select:none}.page__body input,.page__body textarea{-webkit-user-select:text;user-select:text}';
    document.head.appendChild(st);
    ['copy', 'cut', 'dragstart'].forEach(function (ev) {
      document.addEventListener(ev, function (e) {
        var n = e.target, el = n && n.nodeType === 1 ? n : n && n.parentElement;
        if (el && el.closest && el.closest('.page__body') && !el.closest('input,textarea')) {
          e.preventDefault(); toast('Nội dung bài học không cho sao chép.');
        }
      }, true);
    });
  }
})();
