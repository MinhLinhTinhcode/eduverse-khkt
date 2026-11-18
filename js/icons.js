/* ==========================================================================
   Bộ biểu tượng SVG dùng chung.
   Mỗi biểu tượng vẽ trên lưới 24×24, nét theo màu chữ (currentColor)
   nên chỉ cần đổi `color` trong CSS là đổi được màu.
   ========================================================================== */
(function () {
  'use strict';

  const line = (inner) =>
    '<svg class="ico" viewBox="0 0 24 24" width="1em" height="1em" fill="none" ' +
    'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ' +
    'aria-hidden="true" focusable="false">' + inner + '</svg>';

  window.ICONS = {
    speaker: line('<path d="M11 5 6.5 9H3v6h3.5L11 19V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>'),
    close: line('<path d="M6 6l12 12M18 6 6 18"/>'),
    left: line('<path d="M15 5l-7 7 7 7"/>'),
    right: line('<path d="M9 5l7 7-7 7"/>'),
    down: line('<path d="M6 9l6 6 6-6"/>'),
    list: line('<path d="M4 6h16M4 12h16M4 18h10"/>'),
    clock: line('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    help: line('<circle cx="12" cy="12" r="9"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1.1.9-1.1 1.7"/><path d="M12 17h.01"/>'),
    check: line('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
    refresh: line('<path d="M20 11a8 8 0 0 0-14.5-4M4 5v3.5h3.5"/><path d="M4 13a8 8 0 0 0 14.5 4M20 19v-3.5h-3.5"/>'),

    /* Biểu tượng của các khung trong sách */
    target: line('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>'),
    bolt: line('<path d="M13 3 5 14h6l-1 7 8-11h-6l1-7z"/>'),
    bulb: line('<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>'),
    bookmark: line('<path d="M7 3h10v18l-5-4-5 4V3z"/>'),
    question: line('<circle cx="12" cy="12" r="9"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1.1.9-1.1 1.7"/><path d="M12 17h.01"/>'),
    pencil: line('<path d="M4 20l1-4L16.5 4.5a2 2 0 0 1 3 3L8 19l-4 1z"/><path d="M14 7l3 3"/>'),
    flag: line('<path d="M6 21V4"/><path d="M6 5c3-2 5 2 8 0s4-1 4-1v9s-1-1-4 1-5-2-8 0"/>'),
    alert: line('<path d="M12 4 3 20h18L12 4z"/><path d="M12 10v4M12 17h.01"/>'),
    flask: line('<path d="M9 3h6M10 3v6L5 19a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 19l-5-10V3"/><path d="M7.5 15h9"/>'),
    book: line('<path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5z"/><path d="M12 6.5v13"/>'),

    /* Biểu tượng cho danh sách "khả năng của máy tính" */
    database: line('<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>'),
    cycle: line('<path d="M20 11a8 8 0 0 0-14.5-4M4 5v3.5h3.5"/><path d="M4 13a8 8 0 0 0 14.5 4M20 19v-3.5h-3.5"/>'),
    share: line('<circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="6" r="2.6"/><circle cx="18" cy="18" r="2.6"/><path d="M8.3 10.8 15.7 7.2M8.3 13.2l7.4 3.6"/>'),
    grid: line('<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>'),

    /* Logo: quyển sách mở, gạch chân nét đứt màu vàng (giống gạch chân từ vựng). */
    logo:
      '<svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true" focusable="false">' +
      '<rect width="32" height="32" rx="9" fill="#1f46d0"/>' +
      '<path d="M16 11.2c-2-1.5-4.8-2-8-1.6v12.4c3.2-.4 6 .1 8 1.6 2-1.5 4.8-2 8-1.6V9.6c-3.2-.4-6 .1-8 1.6z" fill="#fff"/>' +
      '<path d="M16 11.2v12.4" stroke="#1f46d0" stroke-width="1.6"/>' +
      '<path d="M8.5 26.6h15" stroke="#ffe24a" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="3.2 3"/>' +
      '</svg>'
  };

  /* Linh vật tròn (viền xanh ngọc) dùng ở đầu đoạn, giống sách giấy */
  const mascot = (inner) =>
    '<svg class="mascot__svg" viewBox="0 0 56 56" aria-hidden="true" focusable="false">' +
    '<circle cx="28" cy="28" r="25" fill="#d6f0f0" stroke="#2bb3b0" stroke-width="3.5"/>' + inner + '</svg>';
  const eyes = (y) =>
    '<ellipse cx="22" cy="' + y + '" rx="4.6" ry="5.4" fill="#fff" stroke="#14224a" stroke-width="1.6"/><ellipse cx="34" cy="' + y + '" rx="4.6" ry="5.4" fill="#fff" stroke="#14224a" stroke-width="1.6"/>' +
    '<circle cx="23" cy="' + (y + 1) + '" r="1.8" fill="#14224a"/><circle cx="35" cy="' + (y + 1) + '" r="1.8" fill="#14224a"/>';
  window.MASCOTS = {
    fire: mascot(
      '<path d="M28 9c3 7 11 11 11 21a11 11 0 0 1-22 0c0-5 3-8 5-11 1 3 2 4 4 4-1-5-1-9 2-14z" fill="#f0453a" stroke="#14224a" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M28 26c2 4 5 6 5 10a5 5 0 0 1-10 0c0-3 3-5 5-10z" fill="#ffc83d"/>' + eyes(33) ),
    book: mascot(
      '<path d="M10 22l18 5 18-5v21l-18 5-18-5z" fill="#fff" stroke="#e0393e" stroke-width="3" stroke-linejoin="round"/><path d="M28 27v21" stroke="#e0393e" stroke-width="2.6"/>' +
      '<path d="M15 28l9 2.6M15 34l9 2.6M32 30.6l9-2.6M32 36.6l9-2.6" stroke="#9aa8c7" stroke-width="1.6" stroke-linecap="round"/>' +
      '<ellipse cx="22" cy="17" rx="4.6" ry="5.4" fill="#fff" stroke="#14224a" stroke-width="1.6"/><ellipse cx="34" cy="17" rx="4.6" ry="5.4" fill="#fff" stroke="#14224a" stroke-width="1.6"/><circle cx="23" cy="18" r="1.8" fill="#14224a"/><circle cx="35" cy="18" r="1.8" fill="#14224a"/>'),
    bulb: mascot(
      '<path d="M28 9a12 12 0 0 0-6.5 22c1.5 1 2 2.4 2 4h9c0-1.600.5-3 2-4A12 12 0 0 0 28 9z" fill="#fff6bf" stroke="#14224a" stroke-width="2" stroke-linejoin="round"/>' +
      '<rect x="23" y="37" width="10" height="5" rx="2" fill="#9aa8c7" stroke="#14224a" stroke-width="1.6"/><rect x="24.500" y="43" width="7" height="3.500" rx="1.700" fill="#14224a"/>' +
      '<circle cx="24" cy="22" r="2" fill="#14224a"/><circle cx="32" cy="22" r="2" fill="#14224a"/><path d="M24.500 27q3.500 3 7 0" stroke="#14224a" stroke-width="1.800" fill="none" stroke-linecap="round"/>' +
      '<path d="M8 12l5 3M6 20l5 1M48 12l-5 3M50 20l-5 1" stroke="#2bb3b0" stroke-width="2.400" stroke-linecap="round"/>'),
    ask: mascot(
      '<path d="M18 21c0-6 4-10 10-10s10 4 10 9c0 4-3 6-6 8-2 1-3 2.500-3 4.500v1" fill="none" stroke="#e0393e" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M18 21c0-6 4-10 10-10s10 4 10 9c0 4-3 6-6 8-2 1-3 2.500-3 4.500v1" fill="none" stroke="#f0453a" stroke-width="3.500" stroke-linecap="round"/>' +
      '<circle cx="29" cy="46" r="4" fill="#f0453a" stroke="#e0393e" stroke-width="1.600"/>' +
      '<circle cx="20" cy="23" r="2" fill="#14224a"/><circle cx="31" cy="21" r="2" fill="#14224a"/>'),
    pad: mascot(
      '<rect x="13" y="12" width="26" height="33" rx="3" fill="#fff" stroke="#2f6fd0" stroke-width="2.600"/><path d="M18 21h16M18 27h16M18 33h10" stroke="#9fb4e6" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M34 42l14-18 4 3-14 18-6 3z" fill="#2f86ff" stroke="#14224a" stroke-width="1.800" stroke-linejoin="round"/>' +
      '<circle cx="21" cy="16" r="2" fill="#14224a"/><circle cx="31" cy="16" r="2" fill="#14224a"/>'),
    monitor: mascot(
      '<rect x="10" y="11" width="36" height="26" rx="4" fill="#fff" stroke="#2f6fd0" stroke-width="2.600"/><rect x="14" y="15" width="28" height="18" rx="2" fill="#2f86ff"/>' +
      '<path d="M16 29l7-7 5 4 8-8" stroke="#fff" stroke-width="2.400" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M22 44h12M28 37v7" stroke="#2f6fd0" stroke-width="2.600" stroke-linecap="round"/><rect x="14" y="46" width="28" height="4" rx="2" fill="#9fb4e6"/>')
  };
})();
