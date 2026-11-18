/* ==========================================================================
   GÓC GIAO TIẾP CỦA GIÁO VIÊN (Teacher Communication Corner)
   --------------------------------------------------------------------------
   Câu lệnh tiếng Anh dùng trong lớp song ngữ, chia theo tình huống. Mỗi câu
   có nút loa dùng chung bộ phát âm của sách ([data-say], Web Speech API, theo
   giọng Anh/Mỹ chọn trên thanh công cụ), nên chạy ngoại tuyến.

   Thêm câu mới: thêm một dòng [en, vi] vào nhóm tương ứng trong GROUPS.
   Dấu "..." trong câu là chỗ giáo viên điền (số trang, tên học sinh…).
   Giao diện: Phrases.panel() trả HTML, Phrases.mount(root) gắn lọc/tìm kiếm.
   ========================================================================== */
(function () {
  'use strict';
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');

  const GROUPS = [
    { id: 'mo-dau', vi: 'Bắt đầu tiết học', items: [
      ['Good morning, everyone. Please take your seats.', 'Chào cả lớp. Mời các em ngồi vào chỗ.'],
      ['Let\'s get started.', 'Chúng ta bắt đầu nhé.'],
      ['Who is absent today?', 'Hôm nay ai vắng?'],
      ['Today we are going to learn about...', 'Hôm nay chúng ta sẽ học về...'],
      ['The aim of this lesson is to...', 'Mục tiêu của bài học này là...'],
      ['Let\'s review what we learned last time.', 'Cùng ôn lại bài lần trước nhé.']
    ] },
    { id: 'sach', vi: 'Làm việc với sách', items: [
      ['Let\'s open your book to page...', 'Chúng ta mở sách đến trang...'],
      ['Look at the picture on page...', 'Hãy nhìn hình ở trang...'],
      ['Read the text silently.', 'Đọc thầm đoạn văn.'],
      ['Read it aloud, please.', 'Em đọc to lên nhé.'],
      ['Underline the key words.', 'Gạch chân các từ khoá.'],
      ['Click on the underlined word to see its meaning.', 'Bấm vào từ gạch chân để xem nghĩa.'],
      ['Listen and repeat after me.', 'Nghe và đọc theo cô/thầy.']
    ] },
    { id: 'hoi-dap', vi: 'Hỏi và trả lời', items: [
      ['Raise your hand if you know the answer.', 'Ai biết đáp án thì giơ tay.'],
      ['Can anyone tell me...?', 'Có em nào cho cô/thầy biết... không?'],
      ['Who would like to try?', 'Em nào muốn thử?'],
      ['What do you think?', 'Em nghĩ sao?'],
      ['Do you have any questions?', 'Các em có câu hỏi nào không?'],
      ['Could you say that again, please?', 'Em nói lại được không?'],
      ['What does this word mean?', 'Từ này nghĩa là gì?'],
      ['How do you say it in English?', 'Nói điều này bằng tiếng Anh thế nào?'],
      ['How do you spell it?', 'Từ này đánh vần thế nào?']
    ] },
    { id: 'khen', vi: 'Khen và động viên', items: [
      ['Well done!', 'Làm tốt lắm!'],
      ['Great job. That\'s correct.', 'Giỏi lắm. Đúng rồi.'],
      ['Good try. Let\'s look at it again.', 'Cố gắng tốt. Mình xem lại nhé.'],
      ['Not quite. Try again.', 'Chưa đúng hẳn. Em thử lại nhé.'],
      ['Don\'t worry, mistakes help us learn.', 'Đừng lo, sai sót giúp ta học tốt hơn.'],
      ['Let\'s give him a big hand.', 'Cả lớp cùng vỗ tay cho bạn nào.']
    ] },
    { id: 'hoat-dong', vi: 'Tổ chức hoạt động', items: [
      ['Work in pairs.', 'Làm việc theo cặp.'],
      ['Get into groups of four.', 'Chia thành nhóm bốn người.'],
      ['Discuss with your partner.', 'Thảo luận với bạn bên cạnh.'],
      ['You have five minutes to finish.', 'Các em có năm phút để hoàn thành.'],
      ['Time is up. Please stop writing.', 'Hết giờ. Các em dừng viết.'],
      ['Each group, please present your answer.', 'Mỗi nhóm hãy trình bày đáp án.'],
      ['Let\'s play a warm-up game.', 'Chúng ta chơi một trò khởi động nhé.']
    ] },
    { id: 'quan-lop', vi: 'Giữ trật tự', items: [
      ['Quiet, please.', 'Các em trật tự nào.'],
      ['Eyes on me, please.', 'Các em nhìn lên cô/thầy.'],
      ['One at a time, please.', 'Mỗi lần một bạn nói.'],
      ['Please pay attention.', 'Các em chú ý nhé.'],
      ['Put your phones away.', 'Cất điện thoại đi.'],
      ['Stand up. Sit down.', 'Đứng lên. Ngồi xuống.']
    ] },
    { id: 'may-tinh', vi: 'Dạy Tin học và Toán', items: [
      ['Turn on your computer and open the spreadsheet.', 'Bật máy tính và mở bảng tính.'],
      ['Click on cell B2 and type the formula.', 'Bấm vào ô B2 và nhập công thức.'],
      ['Press Enter to see the result.', 'Nhấn Enter để xem kết quả.'],
      ['Save your file before you close it.', 'Lưu tệp trước khi đóng.'],
      ['Let\'s solve this equation step by step.', 'Ta giải phương trình này từng bước.'],
      ['Substitute the value of x into the formula.', 'Thay giá trị của x vào công thức.'],
      ['Draw the graph on the coordinate plane.', 'Vẽ đồ thị trên mặt phẳng toạ độ.'],
      ['Check your answer.', 'Kiểm tra lại đáp án.']
    ] },
    { id: 'ket-thuc', vi: 'Kết thúc và giao bài', items: [
      ['That\'s all for today.', 'Hôm nay học đến đây.'],
      ['For homework, please do exercise... on page...', 'Bài về nhà: làm bài tập... trang...'],
      ['Please enter the assignment code on the website.', 'Hãy nhập mã bài tập trên trang web.'],
      ['Send me your result code by tomorrow.', 'Gửi cho cô/thầy mã kết quả trước ngày mai.'],
      ['See you next lesson. Goodbye, class.', 'Hẹn gặp lại tiết sau. Chào cả lớp.']
    ] }
  ];

  const total = () => GROUPS.reduce((n, g) => n + g.items.length, 0);

  function listHTML(group, q) {
    const key = norm(q || '');
    let out = '', n = 0;
    GROUPS.forEach((g) => {
      if (group && group !== 'all' && g.id !== group) return;
      const rows = g.items.filter((it) => !key || norm(it[0]).indexOf(key) >= 0 || norm(it[1]).indexOf(key) >= 0);
      if (!rows.length) return;
      n += rows.length;
      out += '<h3 class="phr__g">' + esc(g.vi) + '</h3><ul class="phr__l">' + rows.map((it) =>
        '<li class="phr__i"><div class="phr__t"><span class="en" lang="en">' + esc(it[0]) + '</span><span class="vi">' + esc(it[1]) + '</span></div>' +
        '<button type="button" class="btn-icon prac__say" data-say="' + esc(it[0].replace(/\.\.\./g, ' ')) + '" aria-label="Nghe câu: ' + esc(it[0]) + '">🔊</button></li>').join('') + '</ul>';
    });
    return out || '<p class="prac__note">Không tìm thấy câu nào. Thử từ khoá khác.</p>';
  }

  function panel() {
    return '<div class="tcard tcard--phr"><h2 class="prac__h">4. Góc giao tiếp tiếng Anh trong lớp</h2>' +
      '<p class="prac__intro">' + total() + ' câu thường dùng khi dạy song ngữ. Bấm 🔊 để nghe mẫu (giọng Anh hoặc Mỹ chọn ở thanh công cụ), dấu “...” là chỗ thầy cô tự điền.</p>' +
      '<div class="phr__bar"><input type="search" class="sw__in" data-phr-q placeholder="Tìm câu (tiếng Anh hoặc tiếng Việt)" aria-label="Tìm câu giao tiếp" autocomplete="off">' +
      '<select data-phr-g aria-label="Chọn tình huống"><option value="all">Tất cả tình huống</option>' + GROUPS.map((g) => '<option value="' + g.id + '">' + esc(g.vi) + '</option>').join('') + '</select></div>' +
      '<div data-phr-list aria-live="polite">' + listHTML('all', '') + '</div></div>';
  }

  function mount(root) {
    const box = $('.tcard--phr', root);
    if (!box) return;
    const q = $('[data-phr-q]', box), g = $('[data-phr-g]', box), out = $('[data-phr-list]', box);
    const draw = () => { out.innerHTML = listHTML(g.value, q.value); };
    q.addEventListener('input', draw);
    g.addEventListener('change', draw);
  }

  window.Phrases = { groups: GROUPS, panel: panel, mount: mount, total: total };
})();
