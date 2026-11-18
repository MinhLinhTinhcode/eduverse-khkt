/* ==========================================================================
   TIN HỌC 9 — ĐỊNH HƯỚNG CHỦ ĐỀ a. SỬ DỤNG BẢNG TÍNH ĐIỆN TỬ NÂNG CAO
     'tin9-bai12a'  Bài 12a. Sử dụng hàm IF (tr. 48–51)

   NỘI DUNG NGUYÊN BẢN do nhóm dự án soạn theo tên bài trong mục lục và yêu cầu cần đạt
   của Chương trình Tin học 2018. Đây KHÔNG phải bản chép lại sách giáo khoa: số trang,
   ví dụ và câu hỏi đều do nhóm tự đặt. Khi có sách in, hãy đối chiếu và chỉnh lại.
   ========================================================================== */
(function () {
  'use strict';
  const D = (window.TEXTBOOK = window.TEXTBOOK || {});
  D.lessons = D.lessons || {};
  D.glossary = D.glossary || {};
  const g = (word, ipa, pos, vi, ctx, en, viEx) => ({ word, ipa, pos, vi, ctx, ex: { en, vi: viEx } });
  const P = (vi, en, x) => Object.assign({ t: 'p', vi, en }, x || {});
  const LI = (rows) => ({ t: 'list', items: rows.map((r) => ({ vi: r[0], en: r[1] })) });

  Object.assign(D.glossary, {
    'if-function': g('IF', '/ɪf/', 'n', 'hàm điều kiện IF',
      'Hàm của phần mềm bảng tính trả về kết quả này hoặc kết quả kia tuỳ điều kiện đúng hay sai.',
      'The IF function shows one result if the test is true and another if it is false.', 'Hàm IF cho kết quả này nếu điều kiện đúng và kết quả kia nếu điều kiện sai.'),
    'logical-test': g('logical_test', '/ˈlɒdʒ.ɪ.kəl test/', 'n', 'biểu thức điều kiện',
      'Phép so sánh cho kết quả đúng (TRUE) hoặc sai (FALSE), ví dụ C2>B2.',
      'The logical_test C2>B2 is true when the spending is above the limit.', 'Biểu thức điều kiện C2>B2 đúng khi chi tiêu vượt hạn mức.'),
    'value-if-true': g('value_if_true', '/ˈvæl.juː ɪf truː/', 'n', 'giá trị khi đúng',
      'Kết quả mà hàm IF trả về khi biểu thức điều kiện đúng.',
      'Here value_if_true is the text "Vượt mức".', 'Ở đây giá trị khi đúng là văn bản "Vượt mức".'),
    'value-if-false': g('value_if_false', '/ˈvæl.juː ɪf fɔːls/', 'n', 'giá trị khi sai',
      'Kết quả mà hàm IF trả về khi biểu thức điều kiện sai.',
      'If you leave out value_if_false, the cell may show FALSE.', 'Nếu bỏ trống giá trị khi sai, ô có thể hiện FALSE.'),
    'comparison-operator': g('comparison operator', '/kəmˈpær.ɪ.sən ˈɒp.ə.reɪ.tər/', 'n', 'toán tử so sánh',
      'Kí hiệu dùng để so sánh hai giá trị, như >, <, >=, <=, =, <>.',
      'The comparison operator <> means "not equal to".', 'Toán tử so sánh <> có nghĩa là "khác".'),
    'nested-if': g('nested IF', '/ˈnes.tɪd ɪf/', 'n', 'hàm IF lồng nhau',
      'Dùng một hàm IF làm giá trị khi sai (hoặc khi đúng) của hàm IF khác để xử lí nhiều trường hợp.',
      'A nested IF lets one formula choose among several results.', 'Hàm IF lồng nhau giúp một công thức chọn trong nhiều kết quả.'),
    'text-string': g('text string', '/tekst strɪŋ/', 'n', 'chuỗi văn bản',
      'Dãy kí tự đặt trong dấu nháy kép khi viết vào công thức, ví dụ "Đạt".',
      'A text string in a formula must be written in double quotes.', 'Chuỗi văn bản trong công thức phải đặt trong dấu nháy kép.'),
    'logical-value': g('logical value', '/ˈlɒdʒ.ɪ.kəl ˈvæl.juː/', 'n', 'giá trị logic',
      'Một trong hai giá trị TRUE (đúng) hoặc FALSE (sai) do phép so sánh tạo ra.',
      'The test 5>3 gives the logical value TRUE.', 'Phép so sánh 5>3 cho giá trị logic TRUE.'),
    classify: g('classify', '/ˈklæs.ɪ.faɪ/', 'v', 'phân loại, xếp loại',
      'Xếp mỗi đối tượng vào một nhóm theo tiêu chí, như xếp loại điểm số.',
      'A nested IF can classify marks as Good, Pass or Fail.', 'Hàm IF lồng nhau có thể xếp loại điểm thành Tốt, Đạt hoặc Chưa đạt.'),
    'list-separator': g('list separator', '/lɪst ˈsep.ə.reɪ.tər/', 'n', 'dấu phân cách đối số',
      'Dấu ngăn cách các đối số của hàm, là dấu phẩy hoặc dấu chấm phẩy tuỳ cài đặt khu vực.',
      'Depending on the region, the list separator is a comma or a semicolon.', 'Tuỳ khu vực, dấu phân cách đối số là dấu phẩy hoặc dấu chấm phẩy.'),
    budget: g('budget', '/ˈbʌdʒ.ɪt/', 'n', 'hạn mức chi tiêu, ngân sách',
      'Số tiền dự định chi cho một khoản trong một khoảng thời gian.',
      'The family set a monthly budget for each expense.', 'Gia đình đặt hạn mức chi tiêu hằng tháng cho từng khoản.')
  });

  D.lessons['tin9-bai12a'] = {
    gradeId: 9, number: '12a', book: 'Tin học 9',
    title: { vi: 'Sử dụng hàm IF', en: 'Using the IF function' },
    topic: { number: 'a', label: 'Định hướng', vi: 'Sử dụng bảng tính điện tử nâng cao', en: 'Advanced use of spreadsheets' },
    spreadLabels: ['Mở đầu; công thức hàm IF', 'Hàm IF trong chi tiêu; thực hành; tự kiểm tra'],
    pages: [
      { number: 48, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: { vi: 'Sau bài học này em sẽ:', en: 'After this lesson you will:' }, items: [
          { vi: 'Biết dùng hàm IF để bảng tính tự đưa ra kết quả khác nhau tuỳ theo điều kiện đúng hay sai.', en: 'Know how to use the {IF function|if-function} so a spreadsheet gives different results depending on whether a condition is true or false.' },
          { vi: 'Viết được hàm IF lồng nhau để xếp loại theo nhiều mức và áp dụng vào bảng tính quản lí tài chính gia đình.', en: 'Be able to write a {nested IF|nested-if} to {classify|classify} data into several levels and apply it to the family finance spreadsheet.' }
        ] },
        P('Ở các bài trước, em đã dùng COUNTIF để đếm và SUMIF để tính tổng theo điều kiện. Nhưng nhiều lúc em không cần một con số, mà cần bảng tính tự nhận xét: khoản chi nào đã vượt hạn mức, bạn nào đạt yêu cầu. Việc đó do hàm IF đảm nhiệm.',
          'In earlier lessons you used COUNTIF to count and SUMIF to add up by a condition. But sometimes you do not need a number; you need the spreadsheet to comment by itself: which expense has gone over its limit, which student has met the requirement. The IF function does that job.', { badge: 'fire' }),
        { t: 'h2', n: '1', vi: 'Hàm IF', en: 'The IF function' },
        { t: 'activity', no: 1, title: { vi: 'Máy tính tự nhận xét', en: 'The computer comments by itself' },
          vi: 'Gia đình bạn Khoa đặt hạn mức chi tiêu mỗi tháng cho từng khoản. Cuối tháng, bạn nhập số tiền thực chi vào bảng. Em hãy nêu cách để cột "Nhận xét" tự hiện "Vượt mức" khi thực chi lớn hơn hạn mức và hiện "Trong mức" trong trường hợp còn lại, mà không phải kiểm tra từng dòng bằng mắt.',
          en: 'Khoa’s family sets a monthly {budget|budget} for each expense. At the end of the month he enters the amount actually spent. Describe how the "Nhận xét" (Comment) column could show "Vượt mức" (Over) when the spending is above the budget and "Trong mức" (Within) otherwise, without checking every row by eye.',
          items: [], style: 'plain' },
        { t: 'fig', art: 'if12a1', no: '12a.1', vi: 'Hàm IF chọn một trong hai kết quả theo điều kiện', en: 'The IF function chooses one of two results by a condition', wide: true },
        P('Hàm IF kiểm tra một điều kiện. Nếu điều kiện **đúng**, hàm trả về kết quả thứ nhất; nếu điều kiện **sai**, hàm trả về kết quả thứ hai. Nhờ vậy, một công thức có thể đưa ra nhận xét khác nhau cho từng dòng dữ liệu.',
          'IF tests a condition. If the condition is **true**, it returns the first result; if it is **false**, it returns the second. So one formula can give a different comment for each row of data.')
      ] },

      { number: 49, blocks: [
        { t: 'h3', vi: 'Công thức của hàm IF', en: 'The formula of IF' },
        P('Công thức chung: **=IF(logical_test, value_if_true, value_if_false)**. Ý nghĩa các tham số:',
          'General formula: **=IF(logical_test, value_if_true, value_if_false)**. The parameters mean:'),
        LI([
          ['**logical_test**: biểu thức điều kiện, cho kết quả đúng hoặc sai, ví dụ C2>B2.', '**{logical_test|logical-test}**: the condition, which gives true or false, for example C2>B2.'],
          ['**value_if_true**: kết quả khi điều kiện đúng.', '**{value_if_true|value-if-true}**: the result when the condition is true.'],
          ['**value_if_false**: kết quả khi điều kiện sai.', '**{value_if_false|value-if-false}**: the result when the condition is false.']
        ]),
        P('Biểu thức điều kiện được tạo bằng các toán tử so sánh trong Bảng 12a.1. Phép so sánh luôn cho một trong hai giá trị logic: TRUE (đúng) hoặc FALSE (sai).',
          'The condition is built from the {comparison operators|comparison-operator} in Table 12a.1. A comparison always gives one of two {logical values|logical-value}: TRUE or FALSE.'),
        { t: 'h3', vi: 'Bảng 12a.1. Các toán tử so sánh', en: 'Table 12a.1. Comparison operators' },
        { t: 'table', head: true, rows: [
          [{ vi: 'Toán tử', en: 'Operator' }, { vi: 'Ý nghĩa', en: 'Meaning' }, { vi: 'Ví dụ (kết quả)', en: 'Example (result)' }],
          ['=', { vi: 'Bằng', en: 'Equal to' }, '5=5 (TRUE)'],
          ['<>', { vi: 'Khác', en: 'Not equal to' }, '5<>5 (FALSE)'],
          ['>', { vi: 'Lớn hơn', en: 'Greater than' }, '7>5 (TRUE)'],
          ['<', { vi: 'Nhỏ hơn', en: 'Less than' }, '7<5 (FALSE)'],
          ['>=', { vi: 'Lớn hơn hoặc bằng', en: 'Greater than or equal to' }, '5>=5 (TRUE)'],
          ['<=', { vi: 'Nhỏ hơn hoặc bằng', en: 'Less than or equal to' }, '7<=5 (FALSE)']
        ] },
        { t: 'h3', vi: 'Bảng 12a.2. Ví dụ về hàm IF', en: 'Table 12a.2. Examples of IF' },
        { t: 'table', head: true, rows: [
          [{ vi: 'Công thức', en: 'Formula' }, { vi: 'Kết quả và giải thích', en: 'Result and explanation' }],
          ['=IF(5>3,"Đúng","Sai")', { vi: 'Hiện Đúng, vì 5>3 là TRUE.', en: 'Shows Đúng (True), because 5>3 is TRUE.' }],
          ['=IF(A1>=5,"Đạt","Chưa đạt")', { vi: 'Nếu A1 chứa 6 thì hiện Đạt; nếu A1 chứa 4 thì hiện Chưa đạt.', en: 'If A1 holds 6 it shows Đạt (Pass); if A1 holds 4 it shows Chưa đạt (Not yet).' }],
          ['=IF(B1>100,B1-100,0)', { vi: 'Kết quả là một số: phần vượt quá 100 của B1, hoặc 0 nếu không vượt.', en: 'The result is a number: the part of B1 above 100, or 0 if it does not exceed.' }]
        ] },
        { t: 'tip', items: [
          { vi: 'Văn bản trong công thức phải đặt trong dấu nháy kép, ví dụ "Đạt". Số và địa chỉ ô thì không cần nháy.', en: 'A {text string|text-string} in a formula must be in double quotes, such as "Đạt". Numbers and cell addresses need no quotes.' },
          { vi: 'Tuỳ cài đặt khu vực của máy, các đối số có thể được ngăn cách bằng dấu phẩy (,) hoặc dấu chấm phẩy (;). Nếu máy báo lỗi, em hãy thử đổi dấu còn lại.', en: 'Depending on the region setting, the {list separator|list-separator} may be a comma (,) or a semicolon (;). If the computer reports an error, try the other one.' }
        ] }
      ] },

      { number: 50, blocks: [
        { t: 'h2', n: '2', vi: 'Hàm IF trong quản lí chi tiêu', en: 'IF in managing spending' },
        P('Trang tính Hạn mức dưới đây ghi hạn mức và số tiền thực chi tháng 10 của gia đình bạn Khoa (đơn vị: nghìn đồng).',
          'The Hạn mức worksheet below shows the budget and the amount actually spent in October by Khoa’s family (unit: thousand dong).'),
        { t: 'table', head: true, cls: 'vtbl--sheet', rows: [
          ['', 'A', 'B', 'C', 'D'],
          ['1', { vi: 'Khoản chi', en: 'Expense' }, { vi: 'Hạn mức', en: 'Budget' }, { vi: 'Thực chi', en: 'Spent' }, { vi: 'Nhận xét', en: 'Comment' }],
          ['2', 'Ăn uống', '2000', '2350', { vi: 'Vượt mức', en: 'Over' }],
          ['3', 'Học tập', '800', '650', { vi: 'Trong mức', en: 'Within' }],
          ['4', 'Đi lại', '500', '500', { vi: 'Trong mức', en: 'Within' }],
          ['5', 'Giải trí', '300', '420', { vi: 'Vượt mức', en: 'Over' }]
        ] },
        { t: 'ex', kind: 'example', no: 1, body: [
          P('Viết công thức ở ô D2 để hiện "Vượt mức" nếu thực chi lớn hơn hạn mức, ngược lại hiện "Trong mức". Sau đó sao chép xuống các ô D3:D5.', 'Write a formula in D2 that shows "Vượt mức" if the amount spent is greater than the budget, otherwise "Trong mức". Then copy it down to D3:D5.')
        ], solution: [
          P('Điều kiện là thực chi lớn hơn hạn mức, tức C2>B2. Công thức ở ô D2 là **=IF(C2>B2,"Vượt mức","Trong mức")**.', 'The condition is "spent is greater than budget", that is C2>B2. The formula in D2 is **=IF(C2>B2,"Vượt mức","Trong mức")**.'),
          P('Khi sao chép xuống, địa chỉ C2 và B2 là địa chỉ tương đối nên tự đổi thành C3 và B3, C4 và B4, … Ở dòng Đi lại, thực chi bằng hạn mức nên C4>B4 sai, kết quả là "Trong mức".', 'When copied down, C2 and B2 are {relative references|relative-reference}, so they change to C3 and B3, C4 and B4, … In the Đi lại row the amount equals the budget, so C4>B4 is false and the result is "Trong mức".')
        ] },
        { t: 'ex', kind: 'example', no: 2, body: [
          P('Ở ô E2, em muốn hiện số tiền vượt hạn mức, và hiện 0 nếu không vượt. Viết công thức.', 'In E2 you want to show the amount over the budget, and 0 if it is not over. Write the formula.')
        ], solution: [
          P('Công thức: **=IF(C2>B2,C2-B2,0)**. Ở dòng Ăn uống kết quả là 350; Học tập là 0; Đi lại là 0; Giải trí là 120. Như vậy kết quả của hàm IF có thể là một phép tính, không chỉ là văn bản.', 'Formula: **=IF(C2>B2,C2-B2,0)**. The Ăn uống row gives 350; Học tập gives 0; Đi lại gives 0; Giải trí gives 120. So the result of IF can be a calculation, not only text.')
        ] },
        { t: 'h2', n: '3', vi: 'Hàm IF lồng nhau', en: 'Nested IF' },
        P('Khi cần chia thành nhiều hơn hai trường hợp, em đặt một hàm IF vào vị trí "giá trị khi sai" của hàm IF khác. Cách này gọi là hàm IF lồng nhau. Hàm được kiểm tra lần lượt từ ngoài vào trong và dừng ở điều kiện đúng đầu tiên.',
          'When you need more than two cases, put one IF in the "value if false" position of another IF. This is called a nested IF. The test goes from the outside in and stops at the first true condition.'),
        { t: 'ex', kind: 'example', no: 3, body: [
          P('Điểm trung bình môn Tin học ở ô B2. Xếp loại: từ 8 trở lên là "Tốt"; từ 6,5 đến dưới 8 là "Khá"; từ 5 đến dưới 6,5 là "Đạt"; dưới 5 là "Chưa đạt". Viết công thức.', 'The average mark in Informatics is in B2. Classify: 8 or above is "Tốt" (Good); 6.5 up to below 8 is "Khá" (Fair); 5 up to below 6.5 is "Đạt" (Pass); below 5 is "Chưa đạt" (Not yet). Write the formula.')
        ], solution: [
          P('**=IF(B2>=8,"Tốt",IF(B2>=6.5,"Khá",IF(B2>=5,"Đạt","Chưa đạt")))**', '**=IF(B2>=8,"Tốt",IF(B2>=6.5,"Khá",IF(B2>=5,"Đạt","Chưa đạt")))**'),
          P('Kiểm tra: 9 cho "Tốt"; 7 cho "Khá"; 6,5 cho "Khá"; 5,5 cho "Đạt"; 4 cho "Chưa đạt". Em phải sắp xếp điều kiện từ mức cao xuống thấp; nếu đặt B2>=5 lên trước thì điểm 9 cũng bị xếp "Đạt".', 'Check: 9 gives "Tốt"; 7 gives "Khá"; 6.5 gives "Khá"; 5.5 gives "Đạt"; 4 gives "Chưa đạt". Order the conditions from the highest level down; if B2>=5 came first, a mark of 9 would also be called "Đạt".'),
          P('Nếu máy dùng dấu phẩy làm dấu thập phân, em viết 6,5 và ngăn cách các đối số bằng dấu chấm phẩy.', 'If the computer uses a comma as the decimal mark, write 6,5 and separate the arguments with semicolons.')
        ] }
      ] },

      { number: 51, blocks: [
        { t: 'head', kind: 'practice', vi: 'Thực hành và luyện tập', en: 'Practice and exercises' },
        { t: 'ex', kind: 'hands', no: 1, body: [
          P('Em hãy lập trang tính Hạn mức theo bảng ở trang 50 và thực hiện:', 'Build the Hạn mức worksheet from the table on page 50 and do the following:'),
          { t: 'olist', items: [
            { vi: 'Nhập công thức ở D2 để nhận xét "Vượt mức" hoặc "Trong mức" rồi sao chép xuống D5.', en: 'Enter the formula in D2 to comment "Vượt mức" or "Trong mức", then copy it down to D5.' },
            { vi: 'Thêm cột E "Vượt bao nhiêu" bằng công thức =IF(C2>B2,C2-B2,0).', en: 'Add column E "How much over" with the formula =IF(C2>B2,C2-B2,0).' },
            { vi: 'Đổi thực chi của Giải trí thành 250 và quan sát nhận xét thay đổi.', en: 'Change the Giải trí amount to 250 and watch the comment change.' },
            { vi: 'Dùng COUNTIF đếm số khoản "Vượt mức" trong cột D.', en: 'Use COUNTIF to count the "Vượt mức" items in column D.' }
          ], style: 'num' }
        ] },
        { t: 'ex', kind: 'practice', no: 1, body: [
          P('Cột B chứa số buổi nghỉ học của từng bạn. Viết công thức ở C2 để hiện "Cần nhắc nhở" nếu nghỉ quá 3 buổi, ngược lại để trống (dùng hai dấu nháy kép liền nhau "").', 'Column B holds each student’s number of absences. Write a formula in C2 that shows "Cần nhắc nhở" (Needs a reminder) if the absences exceed 3, otherwise leaves the cell empty (use two double quotes together "").')
        ], solution: [
          P('**=IF(B2>3,"Cần nhắc nhở","")**', '**=IF(B2>3,"Cần nhắc nhở","")**')
        ] },
        { t: 'ex', kind: 'apply', no: 1, body: [
          P('Một ứng dụng đặt vé tính phí vận chuyển: đơn từ 500 nghìn đồng trở lên được miễn phí, đơn dưới 500 nghìn đồng phí 30 nghìn đồng. Tổng tiền hàng ở ô B2. Viết công thức tính phí vận chuyển ở C2.', 'A shop app charges delivery: orders of 500 thousand dong or more are free; orders under 500 thousand dong pay 30 thousand dong. The goods total is in B2. Write the formula for the delivery fee in C2.')
        ], solution: [
          P('**=IF(B2>=500,0,30)**. Nếu B2 là 520 thì phí là 0; nếu B2 là 480 thì phí là 30.', '**=IF(B2>=500,0,30)**. If B2 is 520 the fee is 0; if B2 is 480 the fee is 30.')
        ] },
        { t: 'quiz', title: { vi: 'Tự kiểm tra', en: 'Self-check' }, items: [
          { id: 'q1', vi: 'Hàm IF dùng để làm gì?', en: 'What is the IF function used for?',
            options: [{ vi: 'Trả về kết quả khác nhau tuỳ điều kiện đúng hay sai', en: 'Returning different results depending on whether a condition is true or false' }, { vi: 'Đếm số ô thoả mãn điều kiện', en: 'Counting the cells that meet a condition' }, { vi: 'Cộng các ô thoả mãn điều kiện', en: 'Adding the cells that meet a condition' }, { vi: 'Sắp xếp dữ liệu', en: 'Sorting data' }],
            answer: 0, whyVi: 'IF kiểm tra điều kiện rồi chọn một trong hai kết quả; đếm là COUNTIF, cộng theo điều kiện là SUMIF.', whyEn: 'IF tests a condition and picks one of two results; counting is COUNTIF and conditional adding is SUMIF.' },
          { id: 'q2', vi: 'Trong =IF(logical_test, value_if_true, value_if_false), kết quả khi điều kiện sai nằm ở tham số nào?', en: 'In =IF(logical_test, value_if_true, value_if_false), which parameter holds the result when the condition is false?',
            options: [{ vi: 'logical_test', en: 'logical_test' }, { vi: 'value_if_true', en: 'value_if_true' }, { vi: 'value_if_false', en: 'value_if_false' }, { vi: 'Không có tham số nào', en: 'None of them' }],
            answer: 2, whyVi: 'Tham số thứ ba, value_if_false, là kết quả khi điều kiện sai.', whyEn: 'The third parameter, value_if_false, is the result when the test is false.' },
          { id: 'q3', vi: '=IF(5>3,"Đúng","Sai") cho kết quả nào?', en: 'What does =IF(5>3,"Đúng","Sai") return?',
            options: [{ vi: 'Sai', en: 'Sai' }, { vi: 'Đúng', en: 'Đúng' }, { vi: 'TRUE', en: 'TRUE' }, { vi: 'Lỗi', en: 'An error' }],
            answer: 1, whyVi: '5>3 đúng nên hàm trả về giá trị khi đúng là "Đúng".', whyEn: '5>3 is true so the function returns the value-if-true, "Đúng".' },
          { id: 'q4', vi: 'Với B2 = 500, C2 = 500, công thức =IF(C2>B2,"Vượt mức","Trong mức") cho kết quả nào?', en: 'With B2 = 500 and C2 = 500, what does =IF(C2>B2,"Vượt mức","Trong mức") return?',
            options: [{ vi: 'Vượt mức', en: 'Vượt mức' }, { vi: 'Trong mức', en: 'Trong mức' }, { vi: '0', en: '0' }, { vi: 'FALSE', en: 'FALSE' }],
            answer: 1, whyVi: '500>500 sai (hai số bằng nhau) nên kết quả là "Trong mức".', whyEn: '500>500 is false (the numbers are equal), so the result is "Trong mức".' },
          { id: 'q5', vi: 'Toán tử nào có nghĩa là "khác" trong bảng tính?', en: 'Which operator means "not equal to" in a spreadsheet?',
            options: [{ vi: '!=', en: '!=' }, { vi: '<>', en: '<>' }, { vi: '=>', en: '=>' }, { vi: '><', en: '><' }],
            answer: 1, whyVi: 'Trong bảng tính, "khác" được viết là <>.', whyEn: 'In a spreadsheet "not equal to" is written <>.' },
          { id: 'q6', vi: 'Khi chuỗi văn bản xuất hiện trong công thức, em phải làm gì?', en: 'When a text string appears in a formula, what must you do?',
            options: [{ vi: 'Đặt trong dấu ngoặc đơn', en: 'Put it in parentheses' }, { vi: 'Đặt trong dấu nháy kép', en: 'Put it in double quotes' }, { vi: 'Viết hoa toàn bộ', en: 'Write it all in capitals' }, { vi: 'Không cần làm gì', en: 'Nothing' }],
            answer: 1, whyVi: 'Văn bản phải nằm trong dấu nháy kép, ví dụ "Đạt".', whyEn: 'Text must be in double quotes, for example "Đạt".' },
          { id: 'q7', vi: '=IF(B2>=8,"Tốt",IF(B2>=5,"Đạt","Chưa đạt")) với B2 = 6 cho kết quả nào?', en: 'What does =IF(B2>=8,"Tốt",IF(B2>=5,"Đạt","Chưa đạt")) return when B2 = 6?',
            options: [{ vi: 'Tốt', en: 'Tốt' }, { vi: 'Chưa đạt', en: 'Chưa đạt' }, { vi: 'Đạt', en: 'Đạt' }, { vi: 'FALSE', en: 'FALSE' }],
            answer: 2, whyVi: '6>=8 sai nên xét tiếp; 6>=5 đúng nên kết quả là "Đạt".', whyEn: '6>=8 is false so it tests on; 6>=5 is true so the result is "Đạt".' },
          { id: 'q8', vi: 'Vì sao dùng hàm IF lồng nhau?', en: 'Why use a nested IF?',
            options: [{ vi: 'Khi cần xử lí hơn hai trường hợp', en: 'When more than two cases must be handled' }, { vi: 'Để công thức chạy nhanh hơn', en: 'To make the formula run faster' }, { vi: 'Để đếm số ô', en: 'To count cells' }, { vi: 'Vì một hàm IF không dùng được với số', en: 'Because one IF cannot work with numbers' }],
            answer: 0, whyVi: 'Một IF chỉ chia hai trường hợp; IF lồng nhau cho phép chia nhiều mức.', whyEn: 'One IF splits only two cases; a nested IF allows several levels.' }
        ] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          { vi: 'Hàm IF trả về kết quả này nếu điều kiện đúng và kết quả kia nếu điều kiện sai.', en: 'IF returns one result if the condition is true and another if it is false.' },
          { vi: 'Công thức: =IF(logical_test, value_if_true, value_if_false). Văn bản đặt trong dấu nháy kép.', en: 'Formula: =IF(logical_test, value_if_true, value_if_false). Text goes in double quotes.' },
          { vi: 'Hàm IF lồng nhau xử lí nhiều mức; điều kiện được xét từ trên xuống, nên sắp xếp từ mức cao xuống thấp.', en: 'A nested IF handles several levels; conditions are tested from the top down, so order them from the highest level to the lowest.' }
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.',
          keys: ['if-function', 'logical-test', 'value-if-true', 'value-if-false', 'comparison-operator', 'nested-if', 'text-string', 'logical-value', 'classify', 'list-separator', 'budget'] }
      ] }
    ]
  };
})();
