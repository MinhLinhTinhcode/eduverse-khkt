/* ==========================================================================
   TIN HỌC 9 — ĐỊNH HƯỚNG CHỦ ĐỀ a. SỬ DỤNG BẢNG TÍNH ĐIỆN TỬ NÂNG CAO
     'tin9-bai11a'  Bài 11a. Sử dụng hàm SUMIF (tr. 45–46, bản mẫu)
   Bản PDF mẫu chỉ có hai trang đầu của bài; phần thực hành, luyện tập và vận dụng
   sẽ được bổ sung khi có phần còn lại của sách. Trang 47 là phần mở rộng.
   ========================================================================== */
(function () {
  'use strict';
  const D = (window.TEXTBOOK = window.TEXTBOOK || {});
  D.lessons = D.lessons || {};
  D.glossary = D.glossary || {};
  const g = (word, ipa, pos, vi, ctx, en, viEx) => ({ word, ipa, pos, vi, ctx, ex: { en, vi: viEx } });

  Object.assign(D.glossary, {
    sumif: g('SUMIF', '/ˈsʌm ɪf/', 'n', 'hàm tính tổng theo điều kiện',
      'Hàm của phần mềm bảng tính cộng các giá trị của những ô thoả mãn một điều kiện.',
      'SUMIF adds up the values that meet the condition.', 'Hàm SUMIF cộng các giá trị thoả mãn điều kiện.'),
    'sum-range': g('sum_range', '/sʌm reɪndʒ/', 'n', 'vùng cần tính tổng',
      'Tham số tuỳ chọn của SUMIF: vùng chứa các giá trị sẽ được cộng.',
      'If sum_range is omitted, SUMIF adds the cells in range.', 'Nếu bỏ qua sum_range, SUMIF cộng các ô trong range.'),
    total: g('total', '/ˈtəʊ.təl/', 'n', 'tổng',
      'Kết quả của phép cộng nhiều giá trị, ví dụ tổng tiền theo từng khoản chi.',
      'The total spent on housing is 920 thousand dong.', 'Tổng tiền chi cho khoản Ở là 920 nghìn đồng.'),
    optional: g('optional', '/ˈɒp.ʃən.əl/', 'adj', 'tuỳ chọn',
      'Không bắt buộc phải có, như tham số đặt trong dấu [ ] của công thức.',
      'The third parameter is optional.', 'Tham số thứ ba là tuỳ chọn.')
  });

  D.lessons['tin9-bai11a'] = {
    gradeId: 9, number: '11a', book: 'Tin học 9',
    title: { vi: 'Sử dụng hàm SUMIF', en: 'Using the SUMIF function' },
    topic: { number: 'a', label: 'Định hướng', vi: 'Sử dụng bảng tính điện tử nâng cao', en: 'Advanced use of spreadsheets' },
    spreadLabels: ['Mở đầu; hàm SUMIF', 'Ví dụ, công thức; tự kiểm tra'],
    pages: [
      { number: 45, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: { vi: 'Sau bài học này em sẽ:', en: 'After this lesson you will:' }, items: [
          { vi: 'Biết sử dụng hàm tính tổng theo điều kiện SUMIF để giải quyết bài toán quản lí tài chính gia đình.', en: 'Know how to use the conditional sum function {SUMIF|sumif} to solve the family {financial management|financial-management} problem.' }
        ] },
        { t: 'p', badge: 'fire', vi: 'Trong bài học trước, em đã sử dụng hàm đếm theo điều kiện để biết được số lần thu, chi theo từng khoản mục. Bài học này sẽ hướng dẫn em tính tổng theo các khoản chi tiêu, giúp quản lí tài chính gia đình hiệu quả.', en: 'In the last lesson you used the conditional counting function to find how many times each income or expense item occurred. This lesson shows how to compute totals by expense, which helps manage family finances effectively.' },
        { t: 'h2', n: '1', vi: 'Hàm SUMIF', en: 'The SUMIF function' },
        { t: 'activity', no: 1, title: { vi: 'Tổng hợp chi tiêu theo từng khoản', en: 'Summarising spending by expense' },
          vi: 'Hình 11a.1 là trang tính Chi tiêu đã được bổ sung thêm cột Tổng tiền. Theo em, con số 920 ở ô H2 mang ý nghĩa gì? Công thức ở ô H2 liên quan đến những dữ liệu nào trong vùng dữ liệu A3:D10?',
          en: 'Figure 11a.1 shows the Chi tiêu {worksheet} with a new Tổng tiền (Total) column. What does the number 920 in H2 mean? Which data in the range A3:D10 does the {formula} in H2 use?',
          items: [], style: 'plain' },
        { t: 'fig', art: 'sum11a1', no: '11a.1', vi: 'Trang tính Chi tiêu đã bổ sung thêm cột Tổng tiền', en: 'The Chi tiêu worksheet with a Tổng tiền column added', wide: true },
        { t: 'p', badge: 'book', vi: 'Trong bài toán quản lí tài chính gia đình, em cần biết tổng số tiền thu, chi theo từng khoản để cân đối sao cho hợp lí. Ví dụ: với việc chi tiêu, nhìn vào dữ liệu tổng hợp, em có thể tránh được việc chi quá nhiều cho những nhu cầu không thiết yếu. Để tính tổng số tiền theo từng khoản mục, em sử dụng hàm tính tổng theo điều kiện SUMIF.', en: 'In family financial management you need the {total|total} income and expense of each item to balance them sensibly. For example, from the summarised data you can avoid spending too much on non-essential needs. To total the money by item, use the conditional sum function SUMIF.' },
        { t: 'p', plain: true, vi: 'Công thức chung của hàm SUMIF là: **=SUMIF(range, criteria, [sum_range])**. Trong đó, ý nghĩa của các tham số như sau:', en: 'The general formula of SUMIF is **=SUMIF(range, criteria, [sum_range])**. The parameters mean:' },
        { t: 'list', items: [
          { vi: '**range**: phạm vi chứa các giá trị cần kiểm tra hoặc tính tổng các giá trị nếu không có tham số sum_range.', en: '**{range}**: the range holding the values to check, or to add up if there is no sum_range.' },
          { vi: '**criteria**: điều kiện kiểm tra.', en: '**{criteria}**: the condition to test.' },
          { vi: '**sum_range** (tuỳ chọn): phạm vi chứa các giá trị cần tính tổng; nếu sum_range bị bỏ qua thì tính tổng các ô trong tham số range thoả mãn điều kiện.', en: '**{sum_range|sum-range}** ({optional}): the range holding the values to add up; if sum_range is left out, the cells in range that meet the condition are added.' }
        ] },
        { t: 'p', plain: true, vi: 'Có hai dạng sử dụng hàm SUMIF như ví dụ trong Bảng 11a.1.', en: 'SUMIF can be used in two forms, as in the examples of Table 11a.1.' }
      ] },

      { number: 46, blocks: [
        { t: 'h3', vi: 'Bảng 11a.1. Ví dụ sử dụng hàm SUMIF', en: 'Table 11a.1. Examples of using SUMIF' },
        { t: 'table', head: true, rows: [
          [{ vi: 'Công thức tính', en: 'Formula' }, { vi: 'Ý nghĩa', en: 'Meaning' }],
          ['=SUMIF(A1:A5,">5")', { vi: 'Giả sử vùng dữ liệu A1:A5 chứa các số 5, 3, 7, 8, 2; công thức sẽ tính tổng các giá trị lớn hơn 5 trong vùng A1:A5. Kết quả là 15.', en: 'Suppose A1:A5 holds 5, 3, 7, 8, 2; the formula adds the values greater than 5 in A1:A5. The result is 15.' }],
          ['=SUMIF(A2:A5,"Khoa",B2:B5)', { vi: 'Tính tổng các giá trị trong vùng B2:B5 với các ô tương ứng trong vùng A2:A5 có giá trị là "Khoa". Kết quả trả về là tổng tiền mà Khoa đã chi (750,000 trong ví dụ: 500,000 + 250,000).', en: 'Adds the values in B2:B5 whose matching cells in A2:A5 equal "Khoa". The result is the total Khoa spent (750,000 in the example: 500,000 + 250,000).' }]
        ] },
        { t: 'p', plain: true, vi: 'Trong Hình 11a.1, tại ô H2, em dùng hàm SUMIF để tính tổng tiền của khoản chi Ở. Trong đó, phạm vi chứa giá trị cần kiểm tra ở cột Khoản chi là B3:B10, điều kiện kiểm tra là tên của khoản chi Ở, phạm vi chứa các giá trị cần tính tổng ở cột Số tiền là D3:D10. Do đó, công thức tại ô H2 là =SUMIF(B3:B10,"Ở",D3:D10).', en: 'In Figure 11a.1, in H2 you use SUMIF to total the money for the expense Ở (Housing). The range to check, in the Khoản chi column, is B3:B10; the criteria is the name of the expense Ở; the range to add, in the Số tiền column, is D3:D10. So the formula in H2 is =SUMIF(B3:B10,"Ở",D3:D10).' },
        { t: 'p', plain: true, vi: 'Nhưng vì tên khoản chi Ở đã được lưu ở ô F2 nên để dữ liệu đảm bảo chính xác khi sao chép sang các ô khác, điều kiện kiểm tra cần thay đổi thành F2 và các địa chỉ trong công thức phải là địa chỉ tuyệt đối. Khi đó, công thức tại ô H2 là =SUMIF(\\$B\\$3:\\$B\\$10,F2,\\$D\\$3:\\$D\\$10) như minh hoạ trong Hình 11a.2.', en: 'But since the name Ở is already stored in F2, to stay accurate when copied to other cells the criteria must become F2 and the ranges in the formula must be {absolute references|absolute-reference}. The formula in H2 is then =SUMIF(\\$B\\$3:\\$B\\$10,F2,\\$D\\$3:\\$D\\$10), as in Figure 11a.2.' },
        { t: 'fig', art: 'sum11a2', no: '11a.2', vi: 'Công thức tính tổng số tiền của khoản chi Ở', en: 'The formula that totals the money of the expense Ở', wide: true },
        { t: 'tip', items: [
          { vi: 'Hàm SUMIF tính tổng giá trị của những ô thoả mãn một điều kiện nào đó.', en: 'SUMIF adds the values of the cells that meet a condition.' },
          { vi: 'Công thức: =SUMIF(range, criteria, [sum_range]). range: phạm vi chứa các giá trị cần kiểm tra hoặc tính tổng nếu không có sum_range; criteria: điều kiện kiểm tra; sum_range (tuỳ chọn): phạm vi chứa các giá trị cần tính tổng.', en: 'Formula: =SUMIF(range, criteria, [sum_range]). range holds the values to check (or to add when there is no sum_range); criteria is the condition; sum_range (optional) holds the values to add.' }
        ], plain: true }
      ] },

      { number: 47, blocks: [
        { t: 'head', kind: 'extra', vi: 'Mở rộng: tự kiểm tra', en: 'Extension: self-check' },
        { t: 'p', plain: true, vi: '*Bản mẫu của sách chỉ có phần lí thuyết của bài này; các phần Thực hành, Luyện tập và Vận dụng sẽ được bổ sung sau.*', en: '*The sample of the book contains only the theory part of this lesson; the Practice, Exercises and Apply parts will be added later.*' },
        { t: 'quiz', title: { vi: 'Luyện tập', en: 'Practice' }, items: [
          { id: 'q1', vi: 'Hàm SUMIF dùng để làm gì?', en: 'What is SUMIF used for?',
            options: [{ vi: 'Tính tổng các ô thoả mãn một điều kiện', en: 'Adding the cells that meet a condition' }, { vi: 'Đếm số ô thoả mãn điều kiện', en: 'Counting the cells that meet a condition' }, { vi: 'Tìm giá trị nhỏ nhất', en: 'Finding the smallest value' }, { vi: 'Làm tròn số', en: 'Rounding numbers' }],
            answer: 0, whyVi: 'SUMIF cộng giá trị của những ô thoả mãn điều kiện; đếm là việc của COUNTIF.', whyEn: 'SUMIF adds the values of cells meeting a condition; counting is COUNTIF’s job.' },
          { id: 'q2', vi: 'Trong =SUMIF(range, criteria, [sum_range]), tham số nào là tuỳ chọn?', en: 'In =SUMIF(range, criteria, [sum_range]), which parameter is optional?',
            options: [{ vi: 'sum_range', en: 'sum_range' }, { vi: 'range', en: 'range' }, { vi: 'criteria', en: 'criteria' }, { vi: 'Cả ba tham số', en: 'All three' }],
            answer: 0, whyVi: 'Tham số trong dấu [ ] là tuỳ chọn; nếu bỏ qua, SUMIF cộng các ô trong range.', whyEn: 'The parameter in [ ] is optional; if omitted SUMIF adds the cells in range.' },
          { id: 'q3', vi: '=SUMIF(A1:A5,">5") với A1:A5 là 5, 3, 7, 8, 2 cho kết quả bao nhiêu?', en: '=SUMIF(A1:A5,">5") with A1:A5 = 5, 3, 7, 8, 2 returns what?',
            options: [{ vi: '15', en: '15' }, { vi: '2', en: '2' }, { vi: '25', en: '25' }, { vi: '8', en: '8' }],
            answer: 0, whyVi: 'Các số lớn hơn 5 là 7 và 8, tổng bằng 15.', whyEn: 'The numbers greater than 5 are 7 and 8, whose sum is 15.' },
          { id: 'q4', vi: 'Ở ô H2 của Hình 11a.2, vùng cần tính tổng tiền là vùng nào?', en: 'In cell H2 of Figure 11a.2, which range is added up?',
            options: [{ vi: '\\$D\\$3:\\$D\\$10', en: '\\$D\\$3:\\$D\\$10' }, { vi: '\\$B\\$3:\\$B\\$10', en: '\\$B\\$3:\\$B\\$10' }, { vi: 'F2', en: 'F2' }, { vi: '\\$A\\$3:\\$A\\$10', en: '\\$A\\$3:\\$A\\$10' }],
            answer: 0, whyVi: 'Cột Số tiền là D3:D10; B3:B10 là vùng kiểm tra khoản chi, F2 là điều kiện.', whyEn: 'The Amount column is D3:D10; B3:B10 is the range checked and F2 the criteria.' }
        ] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          { vi: 'Hàm SUMIF tính tổng giá trị của những ô thoả mãn một điều kiện.', en: 'SUMIF adds the values of the cells that meet a condition.' },
          { vi: 'Công thức: =SUMIF(range, criteria, [sum_range]).', en: 'Formula: =SUMIF(range, criteria, [sum_range]).' },
          { vi: 'Công thức tính tổng tiền của một khoản chi: =SUMIF(\\$B\\$3:\\$B\\$10,F2,\\$D\\$3:\\$D\\$10); sao chép xuống để tính cho các khoản còn lại.', en: 'To total one expense: =SUMIF(\\$B\\$3:\\$B\\$10,F2,\\$D\\$3:\\$D\\$10); copy it down for the other expenses.' }
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.',
          keys: ['sumif', 'sum-range', 'total', 'optional', 'range', 'criteria', 'formula', 'absolute-reference', 'countif', 'financial-management'] }
      ] }
    ]
  };
})();
