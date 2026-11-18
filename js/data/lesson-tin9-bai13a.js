/* ==========================================================================
   TIN HỌC 9 — ĐỊNH HƯỚNG CHỦ ĐỀ a. SỬ DỤNG BẢNG TÍNH ĐIỆN TỬ NÂNG CAO
     'tin9-bai13a'  Bài 13a. Hoàn thiện bảng tính quản lí tài chính gia đình (tr. 52–55)
   NỘI DUNG NGUYÊN BẢN do nhóm dự án soạn theo tên bài và yêu cầu cần đạt của Chương trình
   Tin học 2018; không phải bản chép sách giáo khoa. Hãy đối chiếu với sách in khi có.
   ========================================================================== */
(function () {
  'use strict';
  const D = (window.TEXTBOOK = window.TEXTBOOK || {});
  D.lessons = D.lessons || {};
  D.glossary = D.glossary || {};
  const g = (word, ipa, pos, vi, ctx, en, viEx) => ({ word, ipa, pos, vi, ctx, ex: { en, vi: viEx } });
  const P = (vi, en, x) => Object.assign({ t: 'p', vi, en }, x || {});

  Object.assign(D.glossary, {
    savings: g('savings', '/ˈseɪ.vɪŋz/', 'n', 'tiền tiết kiệm',
      'Phần tiền thu nhập còn lại sau khi đã chi tiêu, được giữ lại cho kế hoạch sau.',
      'The family puts part of its income into savings each month.', 'Mỗi tháng gia đình để dành một phần thu nhập vào tiền tiết kiệm.'),
    surplus: g('surplus', '/ˈsɜː.pləs/', 'n', 'số dư dương (thu lớn hơn chi)',
      'Số tiền còn lại khi tổng thu lớn hơn tổng chi.',
      'A surplus means income is greater than spending.', 'Số dư dương nghĩa là thu lớn hơn chi.'),
    deficit: g('deficit', '/ˈdef.ɪ.sɪt/', 'n', 'số thiếu hụt (chi lớn hơn thu)',
      'Số tiền bị thiếu khi tổng chi lớn hơn tổng thu.',
      'A deficit warns the family to cut some spending.', 'Thiếu hụt là lời cảnh báo gia đình cần cắt giảm một số khoản chi.'),
    'summary-table': g('summary table', '/ˈsʌm.ər.i ˈteɪ.bəl/', 'n', 'bảng tổng hợp',
      'Bảng ngắn gọn dùng hàm để gom dữ liệu chi tiết thành các con số chính.',
      'The summary table shows total income, total spending and the balance.', 'Bảng tổng hợp cho biết tổng thu, tổng chi và số dư.'),
    'column-chart': g('column chart', '/ˈkɒl.əm tʃɑːt/', 'n', 'biểu đồ cột',
      'Biểu đồ dùng các cột cao thấp khác nhau để so sánh giá trị giữa các nhóm.',
      'A column chart makes it easy to see which expense is largest.', 'Biểu đồ cột giúp dễ thấy khoản chi nào lớn nhất.'),
    'conditional-formatting': g('conditional formatting', '/kənˈdɪʃ.ən.əl ˈfɔː.mæt.ɪŋ/', 'n', 'định dạng có điều kiện',
      'Tự động đổi màu hoặc kiểu ô khi giá trị của ô thoả mãn một điều kiện.',
      'Conditional formatting turns a cell red when spending is over the limit.', 'Định dạng có điều kiện làm ô chuyển màu đỏ khi chi tiêu vượt hạn mức.'),
    category: g('category', '/ˈkæt.ə.ɡər.i/', 'n', 'nhóm, khoản mục',
      'Nhóm dùng để phân loại các khoản thu hoặc chi, như Ăn uống, Học tập.',
      'Each expense belongs to one category.', 'Mỗi khoản chi thuộc về một khoản mục.'),
    'data-entry': g('data entry', '/ˈdeɪ.tə ˈen.tri/', 'n', 'nhập dữ liệu',
      'Việc gõ các số liệu thu, chi vào bảng tính.',
      'Data validation reduces mistakes during data entry.', 'Xác thực dữ liệu làm giảm sai sót khi nhập dữ liệu.'),
    'monthly-report': g('monthly report', '/ˈmʌn.θli rɪˈpɔːt/', 'n', 'báo cáo tháng',
      'Bảng hoặc trang tính trình bày kết quả thu, chi của cả tháng.',
      'Every month the family prints a short monthly report.', 'Mỗi tháng gia đình in một báo cáo tháng ngắn gọn.'),
    review: g('review', '/rɪˈvjuː/', 'v', 'xem xét lại, rà soát',
      'Kiểm tra lại số liệu và kế hoạch để rút ra điều chỉnh.',
      'At the end of the month the family reviews its spending.', 'Cuối tháng gia đình xem xét lại các khoản chi.')
  });

  const Q = (id, vi, en, opts, answer, whyVi, whyEn) => ({ id, vi, en, options: opts.map((o) => ({ vi: o[0], en: o[1] })), answer, whyVi, whyEn });

  D.lessons['tin9-bai13a'] = {
    gradeId: 9, number: '13a', book: 'Tin học 9',
    title: { vi: 'Hoàn thiện bảng tính quản lí tài chính gia đình', en: 'Completing a family finance spreadsheet' },
    topic: { number: 'a', label: 'Định hướng', vi: 'Sử dụng bảng tính điện tử nâng cao', en: 'Advanced use of spreadsheets' },
    spreadLabels: ['Mở đầu; thiết kế bảng; bảng tổng hợp', 'Biểu đồ; thực hành; tự kiểm tra'],
    pages: [
      { number: 52, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: { vi: 'Sau bài học này em sẽ:', en: 'After this lesson you will:' }, items: [
          { vi: 'Kết hợp các hàm COUNTIF, SUMIF và IF để hoàn thiện bảng tính quản lí tài chính gia đình.', en: 'Combine COUNTIF, SUMIF and IF to complete a family finance spreadsheet.' },
          { vi: 'Lập được bảng tổng hợp, biểu đồ cột và định dạng có điều kiện để đọc nhanh kết quả.', en: 'Build a {summary table|summary-table}, a {column chart|column-chart} and {conditional formatting|conditional-formatting} to read results quickly.' }
        ] },
        P('Ở ba bài trước, em đã học đếm, cộng và nhận xét theo điều kiện. Bài này gom các công cụ đó vào một bảng tính hoàn chỉnh để gia đình bạn Khoa theo dõi thu, chi và số dư của mỗi tháng.',
          'In the last three lessons you learnt to count, add and comment by a condition. This lesson brings those tools into one complete spreadsheet so Khoa’s family can follow income, spending and the {balance|balance} of each month.', { badge: 'fire' }),
        { t: 'h2', n: '1', vi: 'Thiết kế bảng tính', en: 'Designing the spreadsheet' },
        { t: 'activity', no: 1, title: { vi: 'Bảng tính cần có những gì?', en: 'What must the spreadsheet contain?' },
          vi: 'Gia đình muốn biết: tháng này thu bao nhiêu, chi bao nhiêu, còn dư hay thiếu, khoản nào chi nhiều nhất. Em hãy liệt kê những vùng dữ liệu và những kết quả mà bảng tính cần có để trả lời bốn câu hỏi đó.',
          en: 'The family wants to know: how much came in this month, how much went out, whether there is a {surplus|surplus} or a {deficit|deficit}, and which expense is largest. List the data areas and results the spreadsheet needs to answer these four questions.', items: [], style: 'plain' },
        P('Một bảng tính tài chính tốt thường chia làm ba vùng: **vùng nhập dữ liệu** (từng khoản thu, chi), **vùng tổng hợp** (kết quả tính bằng hàm) và **vùng trình bày** (biểu đồ, màu sắc). Mỗi vùng làm một việc nên dễ kiểm tra và sửa.',
          'A good finance spreadsheet usually has three areas: a **data-entry area** (each income and expense), a **summary area** (results computed by functions) and a **presentation area** (charts, colours). Each area does one job, so it is easy to check and fix.'),
        { t: 'fig', art: 'fam13a1', no: '13a.1', vi: 'Vùng nhập dữ liệu (bên trái) và vùng tổng hợp (bên phải)', en: 'The data-entry area (left) and the summary area (right)', wide: true },
        { t: 'h3', vi: 'Vùng nhập dữ liệu', en: 'The data-entry area' },
        P('Mỗi dòng ghi một khoản: tên khoản mục, loại (Thu hoặc Chi) và số tiền. Em dùng công cụ xác thực dữ liệu ở Bài 9a để cột Loại chỉ cho chọn "Thu" hoặc "Chi", và cột Số tiền chỉ nhận số không âm. Nhờ đó việc nhập dữ liệu ít sai hơn.',
          'Each row records one item: the {category|category} name, the type (Thu or Chi) and the amount. Use the data validation tool from Lesson 9a so the Type column accepts only "Thu" or "Chi" and the Amount column accepts only non-negative numbers. That makes {data entry|data-entry} less error-prone.')
      ] },

      { number: 53, blocks: [
        { t: 'h2', n: '2', vi: 'Bảng tổng hợp', en: 'The summary table' },
        P('Bảng tổng hợp dùng các hàm đã học. Giả sử loại nằm ở cột B và số tiền ở cột C, từ dòng 3 đến dòng 30.', 'The summary table uses the functions you have learnt. Suppose the type is in column B and the amount in column C, from row 3 to row 30.'),
        { t: 'table', head: true, rows: [
          [{ vi: 'Chỉ tiêu', en: 'Item' }, { vi: 'Công thức', en: 'Formula' }, { vi: 'Ý nghĩa', en: 'Meaning' }],
          [{ vi: 'Tổng thu', en: 'Total income' }, '=SUMIF(\\$B\\$3:\\$B\\$30,"Thu",\\$C\\$3:\\$C\\$30)', { vi: 'Cộng các số tiền có loại là Thu.', en: 'Adds the amounts whose type is Thu.' }],
          [{ vi: 'Tổng chi', en: 'Total spending' }, '=SUMIF(\\$B\\$3:\\$B\\$30,"Chi",\\$C\\$3:\\$C\\$30)', { vi: 'Cộng các số tiền có loại là Chi.', en: 'Adds the amounts whose type is Chi.' }],
          [{ vi: 'Số dư', en: 'Balance' }, '=F2-F3', { vi: 'Tổng thu trừ tổng chi (giả sử F2 là tổng thu, F3 là tổng chi).', en: 'Total income minus total spending (assume F2 is income, F3 is spending).' }],
          [{ vi: 'Số khoản chi', en: 'Number of expenses' }, '=COUNTIF(\\$B\\$3:\\$B\\$30,"Chi")', { vi: 'Đếm số dòng có loại là Chi.', en: 'Counts the rows whose type is Chi.' }],
          [{ vi: 'Nhận xét', en: 'Comment' }, '=IF(F4>=0,"Còn dư","Thiếu hụt")', { vi: 'Số dư không âm thì "Còn dư", ngược lại "Thiếu hụt".', en: 'A non-negative balance gives "Còn dư", otherwise "Thiếu hụt".' }]
        ] },
        { t: 'ex', kind: 'example', no: 1, body: [
          P('Gia đình có tổng thu 13 500, tổng chi 6 900 (nghìn đồng). Tính số dư và cho biết ô Nhận xét hiện gì.', 'The family has total income 13 500 and total spending 6 900 (thousand dong). Find the balance and say what the Comment cell shows.')
        ], solution: [
          P('Số dư = 13 500 − 6 900 = 6 600. Vì 6 600 ≥ 0 nên =IF(F4>=0,"Còn dư","Thiếu hụt") hiện "Còn dư".', 'Balance = 13 500 − 6 900 = 6 600. Since 6 600 ≥ 0, =IF(F4>=0,"Còn dư","Thiếu hụt") shows "Còn dư".')
        ] },
        { t: 'ex', kind: 'example', no: 2, body: [
          P('Viết công thức tính tỉ lệ phần trăm khoản Ăn uống trong tổng chi, biết Ăn uống ở ô G5 và tổng chi ở ô F3. Làm tròn một chữ số thập phân.', 'Write a formula for the percentage that Ăn uống takes in total spending, given Ăn uống in G5 and total spending in F3. Round to one decimal place.')
        ], solution: [
          P('**=ROUND(G5/F3*100,1)**. Với G5 = 4 200 và F3 = 6 900 thì 4 200 ÷ 6 900 × 100 ≈ 60,9 (%). Hàm ROUND(số, n) làm tròn số đến n chữ số thập phân.', '**=ROUND(G5/F3*100,1)**. With G5 = 4 200 and F3 = 6 900, 4 200 ÷ 6 900 × 100 ≈ 60.9 (%). ROUND(number, n) rounds a number to n decimal places.')
        ] },
        { t: 'tip', items: [
          { vi: 'Dùng địa chỉ tuyệt đối (\\$B\\$3:\\$B\\$30) cho vùng dữ liệu để công thức vẫn đúng khi sao chép. Nên chọn vùng đủ rộng để thêm dòng mới vẫn được tính.', en: 'Use {absolute references|absolute-reference} (\\$B\\$3:\\$B\\$30) for the data range so the formula stays correct when copied. Choose a range wide enough that new rows are still counted.' }
        ] }
      ] },

      { number: 54, blocks: [
        { t: 'h2', n: '3', vi: 'Biểu đồ và định dạng có điều kiện', en: 'Charts and conditional formatting' },
        P('Con số chính xác nhưng khó so sánh bằng mắt. Biểu đồ cột giúp thấy ngay khoản nào chi nhiều nhất, còn định dạng có điều kiện giúp ô tự đổi màu khi có điều bất thường.', 'Exact numbers are hard to compare by eye. A column chart shows at once which expense is largest, and conditional formatting lets a cell change colour by itself when something unusual happens.'),
        { t: 'fig', art: 'bar13a2', no: '13a.2', vi: 'Biểu đồ cột chi tiêu theo từng khoản', en: 'Column chart of spending by item', wide: true },
        { t: 'h3', vi: 'Tạo biểu đồ cột', en: 'Creating a column chart' },
        { t: 'steps', items: [
          { label: { vi: 'Bước 1', en: 'Step 1' }, vi: 'Chọn vùng gồm tên khoản mục và tổng tiền chi của từng khoản (không chọn dòng tổng cộng).', en: 'Select the area with the category names and the spending of each (not the grand total row).' },
          { label: { vi: 'Bước 2', en: 'Step 2' }, vi: 'Mở thẻ Insert (Chèn), chọn Column Chart (Biểu đồ cột).', en: 'Open the Insert tab and choose Column Chart.' },
          { label: { vi: 'Bước 3', en: 'Step 3' }, vi: 'Đặt tiêu đề biểu đồ, ghi đơn vị (nghìn đồng) ở trục tung, kiểm tra tên các cột.', en: 'Give the chart a title, write the unit (thousand dong) on the vertical axis and check the column labels.' }
        ] },
        { t: 'h3', vi: 'Định dạng có điều kiện', en: 'Conditional formatting' },
        P('Để tô đỏ ô nhận xét khi chi vượt hạn mức, em chọn vùng D2:D5, mở Conditional Formatting (Định dạng có điều kiện), chọn luật so sánh văn bản "bằng" và nhập "Vượt mức", rồi chọn màu nền đỏ nhạt. Từ đó, mỗi khi hàm IF trả về "Vượt mức", ô tự chuyển đỏ mà em không phải tô tay.',
          'To colour the comment cell red when spending is over the limit, select D2:D5, open Conditional Formatting, choose the text rule "equal to", enter "Vượt mức" and pick a light red fill. From then on, whenever IF returns "Vượt mức" the cell turns red without you colouring it by hand.'),
        { t: 'ex', kind: 'example', no: 3, body: [
          P('Em muốn tô vàng mọi ô trong cột Số dư có giá trị âm. Nên đặt luật nào?', 'You want to fill yellow every cell in the Balance column whose value is negative. Which rule should you set?')
        ], solution: [
          P('Chọn cột Số dư, thêm luật "Cell Value less than" (giá trị ô nhỏ hơn) 0 và chọn màu vàng. Luật dựa trên điều kiện nên ô tự đổi màu mỗi khi số liệu thay đổi.', 'Select the Balance column, add the rule "Cell Value less than" 0 and choose yellow. The rule is based on a condition, so the cell changes colour whenever the data changes.')
        ] }
      ] },

      { number: 55, blocks: [
        { t: 'head', kind: 'practice', vi: 'Thực hành và luyện tập', en: 'Practice and exercises' },
        { t: 'ex', kind: 'hands', no: 1, body: [
          P('Em hãy hoàn thiện bảng tính tháng 10 của gia đình bạn Khoa:', 'Complete the October spreadsheet of Khoa’s family:'),
          { t: 'olist', items: [
            { vi: 'Nhập dữ liệu như Hình 13a.1; dùng xác thực dữ liệu để cột Loại chỉ nhận Thu hoặc Chi.', en: 'Enter the data as in Figure 13a.1; use data validation so the Type column accepts only Thu or Chi.' },
            { vi: 'Lập bảng tổng hợp: Tổng thu, Tổng chi, Số dư, Số khoản chi và Nhận xét bằng SUMIF, COUNTIF, IF.', en: 'Build the summary: Total income, Total spending, Balance, Number of expenses and Comment with SUMIF, COUNTIF and IF.' },
            { vi: 'Thêm cột Tỉ lệ (%) cho từng khoản chi so với tổng chi.', en: 'Add a Percent (%) column for each expense against total spending.' },
            { vi: 'Vẽ biểu đồ cột chi tiêu theo khoản và đặt luật tô đỏ ô có Nhận xét "Thiếu hụt".', en: 'Draw a column chart of spending by item and set a rule that colours red any cell showing "Thiếu hụt".' },
            { vi: 'Đổi một khoản chi thành rất lớn để Số dư âm và quan sát Nhận xét cùng màu ô thay đổi.', en: 'Change one expense to a very large value so the Balance becomes negative and watch the Comment and cell colour change.' }
          ], style: 'num' }
        ] },
        { t: 'ex', kind: 'practice', no: 1, body: [
          P('Tháng này gia đình thu 9 000 và chi 9 800 (nghìn đồng). Số dư là bao nhiêu và ô Nhận xét hiện gì?', 'This month the family earns 9 000 and spends 9 800 (thousand dong). What is the balance and what does the Comment cell show?')
        ], solution: [P('Số dư = 9 000 − 9 800 = −800 < 0 nên hiện "Thiếu hụt".', 'Balance = 9 000 − 9 800 = −800 < 0, so it shows "Thiếu hụt".')] },
        { t: 'ex', kind: 'apply', no: 1, body: [
          P('Em hãy lập bảng theo dõi thu chi cá nhân của mình trong một tuần (tiền tiêu vặt, tiền mua sách, ăn sáng…). Dùng bảng tổng hợp và biểu đồ để chỉ ra khoản em chi nhiều nhất và nêu một cách tiết kiệm.', 'Build a table to track your own income and spending for one week (pocket money, books, breakfast…). Use a summary table and a chart to show your largest expense and suggest one way to save.')
        ] },
        { t: 'quiz', title: { vi: 'Tự kiểm tra', en: 'Self-check' }, items: [
          Q('q1', 'Bảng tính tài chính nên chia thành những vùng nào?', 'Which areas should a finance spreadsheet be divided into?', [['Nhập dữ liệu, tổng hợp, trình bày', 'Data entry, summary, presentation'], ['Chỉ một vùng duy nhất', 'Only one area'], ['Hai vùng: văn bản và hình ảnh', 'Two areas: text and images'], ['Không cần chia vùng', 'No division is needed']], 0, 'Ba vùng giúp mỗi vùng làm một việc, dễ kiểm tra và sửa.', 'Three areas let each do one job, so it is easy to check and fix.'),
          Q('q2', 'Hàm nào cộng các số tiền có loại là "Chi"?', 'Which function adds the amounts whose type is "Chi"?', [['COUNTIF', 'COUNTIF'], ['SUMIF', 'SUMIF'], ['IF', 'IF'], ['ROUND', 'ROUND']], 1, 'SUMIF cộng theo điều kiện; COUNTIF chỉ đếm.', 'SUMIF adds by a condition; COUNTIF only counts.'),
          Q('q3', 'Số dư được tính bằng:', 'The balance is computed as:', [['Tổng chi − Tổng thu', 'Total spending − total income'], ['Tổng thu − Tổng chi', 'Total income − total spending'], ['Tổng thu + Tổng chi', 'Total income + total spending'], ['Số khoản chi', 'Number of expenses']], 1, 'Số dư là phần còn lại: thu trừ chi.', 'The balance is what remains: income minus spending.'),
          Q('q4', 'Khi tổng chi lớn hơn tổng thu, số dư là:', 'When total spending is greater than total income, the balance is:', [['Dương', 'Positive'], ['Bằng 0', 'Zero'], ['Âm (thiếu hụt)', 'Negative (a deficit)'], ['Không xác định', 'Undefined']], 2, 'Chi nhiều hơn thu nên thiếu hụt, số dư âm.', 'Spending exceeds income, so there is a deficit and the balance is negative.'),
          Q('q5', 'Biểu đồ cột thích hợp nhất để làm gì?', 'What is a column chart best suited for?', [['So sánh giá trị giữa các khoản', 'Comparing values between items'], ['Viết văn bản dài', 'Writing long text'], ['Sắp xếp tên theo vần', 'Sorting names alphabetically'], ['Nhập dữ liệu', 'Entering data']], 0, 'Chiều cao cột cho thấy ngay khoản nào lớn hơn.', 'Column height shows at once which item is larger.'),
          Q('q6', 'Định dạng có điều kiện giúp gì?', 'What does conditional formatting do?', [['Tự đổi màu ô khi thoả điều kiện', 'Changes a cell’s colour automatically when a condition is met'], ['Tự nhập số liệu', 'Enters data automatically'], ['Xoá các ô trống', 'Deletes empty cells'], ['Đổi tên trang tính', 'Renames the worksheet']], 0, 'Định dạng có điều kiện đổi màu hoặc kiểu ô dựa trên giá trị.', 'Conditional formatting changes colour or style based on the value.'),
          Q('q7', 'Vì sao dùng địa chỉ tuyệt đối trong công thức tổng hợp?', 'Why use absolute references in summary formulas?', [['Để vùng dữ liệu không bị lệch khi sao chép', 'So the data range does not shift when copied'], ['Để công thức dài hơn', 'To make the formula longer'], ['Để đổi màu ô', 'To change cell colour'], ['Không có lí do', 'There is no reason']], 0, 'Dấu \\$ giữ nguyên vùng dữ liệu khi sao chép công thức.', 'The \\$ sign keeps the data range fixed when the formula is copied.'),
          Q('q8', 'Xác thực dữ liệu giúp ích gì cho cột Loại?', 'How does data validation help the Type column?', [['Chỉ cho nhập Thu hoặc Chi, giảm sai sót', 'Accepts only Thu or Chi, reducing mistakes'], ['Tự tính tổng', 'Totals automatically'], ['Vẽ biểu đồ', 'Draws a chart'], ['Sắp xếp dữ liệu', 'Sorts the data']], 0, 'Danh sách cho phép đảm bảo mọi dòng ghi đúng giá trị.', 'An allowed list makes sure every row has a valid value.')
        ] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          { vi: 'Bảng tính tài chính gồm vùng nhập dữ liệu, vùng tổng hợp và vùng trình bày.', en: 'A finance spreadsheet has a data-entry area, a summary area and a presentation area.' },
          { vi: 'Kết hợp SUMIF, COUNTIF và IF để tính tổng thu, tổng chi, số dư và nhận xét.', en: 'Combine SUMIF, COUNTIF and IF to compute total income, total spending, balance and comment.' },
          { vi: 'Biểu đồ cột và định dạng có điều kiện giúp đọc kết quả nhanh và phát hiện bất thường.', en: 'Column charts and conditional formatting help read results fast and spot anything unusual.' }
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.',
          keys: ['savings', 'surplus', 'deficit', 'summary-table', 'column-chart', 'conditional-formatting', 'category', 'data-entry', 'monthly-report', 'review', 'balance', 'income', 'expense'] }
      ] }
    ]
  };
})();
