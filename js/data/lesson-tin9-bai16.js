/* ==========================================================================
   TIN HỌC 9 — CHỦ ĐỀ 5. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH
     'tin9-bai16'  Bài 16. Thực hành: Lập chương trình máy tính (tr. 64–67)
   NỘI DUNG NGUYÊN BẢN do nhóm dự án soạn. Mã minh hoạ viết bằng Python vì cú pháp ngắn,
   dễ đọc; GV nên chuyển sang ngôn ngữ lập trình mà sách và nhà trường sử dụng.
   ========================================================================== */
(function () {
  'use strict';
  const D = (window.TEXTBOOK = window.TEXTBOOK || {});
  D.lessons = D.lessons || {};
  D.glossary = D.glossary || {};
  const g = (word, ipa, pos, vi, ctx, en, viEx) => ({ word, ipa, pos, vi, ctx, ex: { en, vi: viEx } });
  const P = (vi, en, x) => Object.assign({ t: 'p', vi, en }, x || {});
  const Q = (id, vi, en, opts, answer, whyVi, whyEn) => ({ id, vi, en, options: opts.map((o) => ({ vi: o[0], en: o[1] })), answer, whyVi, whyEn });

  Object.assign(D.glossary, {
    program: g('program', '/ˈprəʊ.ɡræm/', 'n', 'chương trình máy tính',
      'Dãy lệnh viết bằng ngôn ngữ lập trình để máy tính thực hiện một công việc.',
      'The program asks for the number of kWh.', 'Chương trình hỏi số kWh điện.'),
    'programming-language': g('programming language', '/ˈprəʊ.ɡræm.ɪŋ ˈlæŋ.ɡwɪdʒ/', 'n', 'ngôn ngữ lập trình',
      'Ngôn ngữ có quy tắc riêng dùng để viết chương trình.',
      'Python is a popular programming language.', 'Python là một ngôn ngữ lập trình phổ biến.'),
    'source-code': g('source code', '/sɔːs kəʊd/', 'n', 'mã nguồn',
      'Văn bản các câu lệnh do người lập trình viết, trước khi máy tính chạy.',
      'Save the source code in a file with the .py ending.', 'Lưu mã nguồn vào tệp có đuôi .py.'),
    syntax: g('syntax', '/ˈsɪn.tæks/', 'n', 'cú pháp',
      'Quy tắc viết đúng câu lệnh trong một ngôn ngữ lập trình.',
      'A missing colon is a syntax mistake.', 'Thiếu dấu hai chấm là lỗi cú pháp.'),
    debug: g('debug', '/ˌdiːˈbʌɡ/', 'v', 'gỡ lỗi',
      'Tìm và sửa lỗi trong chương trình.',
      'Debug the program with a small test case.', 'Hãy gỡ lỗi chương trình bằng một ca kiểm thử nhỏ.'),
    run: g('run', '/rʌn/', 'v', 'chạy (chương trình)',
      'Ra lệnh cho máy tính thực hiện các câu lệnh của chương trình.',
      'Run the program and type 120.', 'Chạy chương trình và gõ 120.'),
    integer: g('integer', '/ˈɪn.tɪ.dʒər/', 'n', 'số nguyên',
      'Số không có phần thập phân, như −3, 0, 25.',
      'Convert the text into an integer with int().', 'Đổi chuỗi thành số nguyên bằng int().'),
    string: g('string', '/strɪŋ/', 'n', 'chuỗi kí tự',
      'Dãy kí tự đặt trong dấu nháy, như "Xin chào".',
      'The string "Hello" has five characters.', 'Chuỗi "Hello" có năm kí tự.'),
    indentation: g('indentation', '/ˌɪn.denˈteɪ.ʃən/', 'n', 'thụt lề',
      'Khoảng trống đầu dòng cho biết lệnh nào thuộc khối if hoặc vòng lặp.',
      'Python uses indentation to group lines.', 'Python dùng thụt lề để gom các dòng lệnh.'),
    comment: g('comment', '/ˈkɒm.ent/', 'n', 'chú thích',
      'Dòng ghi chú cho người đọc, máy tính bỏ qua; trong Python bắt đầu bằng dấu #.',
      'A comment explains what the line does.', 'Chú thích giải thích dòng lệnh làm gì.'),
    'error-message': g('error message', '/ˈer.ər ˈmes.ɪdʒ/', 'n', 'thông báo lỗi',
      'Dòng chữ máy tính hiện ra khi chương trình có lỗi, thường cho biết dòng gây lỗi.',
      'Read the error message to find the line with the mistake.', 'Hãy đọc thông báo lỗi để tìm dòng bị sai.')
  });

  D.lessons['tin9-bai16'] = {
    gradeId: 9, number: '16', book: 'Tin học 9',
    title: { vi: 'Thực hành: Lập chương trình máy tính', en: 'Practice: Writing a computer program' },
    topic: { number: '5', vi: 'Giải quyết vấn đề với sự trợ giúp của máy tính', en: 'Solving problems with the help of computers' },
    spreadLabels: ['Từ thuật toán đến chương trình', 'Rẽ nhánh, lặp; gỡ lỗi; tự kiểm tra'],
    pages: [
      { number: 64, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: { vi: 'Sau bài học này em sẽ:', en: 'After this lesson you will:' }, items: [
          { vi: 'Viết, chạy và sửa được chương trình đơn giản có nhập dữ liệu, rẽ nhánh và lặp.', en: 'Write, {run|run} and fix a simple {program|program} with input, branches and loops.' },
          { vi: 'Biết đọc thông báo lỗi và gỡ lỗi bằng dữ liệu thử.', en: 'Know how to read an {error message|error-message} and {debug|debug} with test data.' }
        ] },
        P('Ở Bài 15, em đã viết thuật toán bằng mã giả. Bây giờ em chuyển thuật toán đó thành chương trình để máy tính tự chạy. Bài này dùng ngôn ngữ Python làm ví dụ vì cú pháp ngắn gọn; nếu lớp em dùng ngôn ngữ khác, em vẫn áp dụng cùng các ý tưởng.',
          'In Lesson 15 you wrote algorithms in pseudocode. Now you turn an algorithm into a program that the computer runs by itself. This lesson uses Python as the example because its {syntax|syntax} is short; if your class uses another language, the same ideas still apply.', { badge: 'fire' }),
        { t: 'h2', n: '1', vi: 'Từ thuật toán đến chương trình', en: 'From algorithm to program' },
        { t: 'activity', no: 1, title: { vi: 'Bài toán tính tiền điện', en: 'The electricity bill problem' },
          vi: 'Một hộ gia đình trả 1 800 đồng cho mỗi kWh trong 50 kWh đầu và 2 000 đồng cho mỗi kWh từ kWh thứ 51 trở đi. Hãy nêu đầu vào, đầu ra và cho biết thuật toán cần cấu trúc điều khiển nào.',
          en: 'A household pays 1 800 dong per kWh for the first 50 kWh and 2 000 dong per kWh from the 51st kWh on. State the input and output and say which control structure the algorithm needs.', items: [], style: 'plain' },
        P('Đầu vào là số kWh đã dùng k. Đầu ra là số tiền phải trả. Vì cách tính khác nhau tuỳ k ≤ 50 hay k > 50 nên cần cấu trúc rẽ nhánh (Hình 16.1).',
          'The input is the kWh used, k. The output is the amount to pay. Since the calculation differs depending on whether k ≤ 50 or k > 50, a branch is needed (Figure 16.1).'),
        { t: 'fig', art: 'flow16a', no: '16.1', vi: 'Sơ đồ khối tính tiền điện theo hai mức giá', en: 'Flowchart of the electricity bill with two price levels', wide: true }
      ] },

      { number: 65, blocks: [
        { t: 'h3', vi: 'Chương trình Python tính tiền điện', en: 'The Python program for the bill' },
        { t: 'code', lang: 'Python', text: '# Tính tiền điện hai mức giá\nk = int(input("Nhập số kWh: "))\nif k <= 50:\n    tien = k * 1800\nelse:\n    tien = 50 * 1800 + (k - 50) * 2000\nprint("Số tiền phải trả:", tien, "đồng")', cap: { vi: 'Chương trình 16.1: tính tiền điện', en: 'Program 16.1: computing the electricity bill' } },
        { t: 'table', head: true, rows: [
          [{ vi: 'Dòng lệnh', en: 'Line' }, { vi: 'Ý nghĩa', en: 'Meaning' }],
          ['k = int(input("..."))', { vi: 'Hiện lời nhắc, nhận dữ liệu gõ vào (là chuỗi), đổi thành số nguyên bằng int() và lưu vào biến k.', en: 'Shows the prompt, receives the typed text (a {string|string}), converts it to an {integer|integer} with int() and stores it in variable k.' }],
          ['if k <= 50:', { vi: 'Kiểm tra điều kiện; dấu hai chấm báo bắt đầu khối lệnh.', en: 'Tests the condition; the colon starts the block.' }],
          ['    tien = k * 1800', { vi: 'Các dòng thụt vào là lệnh thuộc khối if; * là phép nhân.', en: 'Lines {indented|indentation} belong to the if block; * is multiplication.' }],
          ['else:', { vi: 'Khối lệnh chạy khi điều kiện sai.', en: 'The block that runs when the condition is false.' }],
          ['print(...)', { vi: 'Đưa kết quả ra màn hình.', en: 'Shows the result on screen.' }]
        ] },
        { t: 'ex', kind: 'example', no: 1, body: [
          P('Chạy Chương trình 16.1 với k = 40 và k = 120. Kết quả mong đợi là gì?', 'Run Program 16.1 with k = 40 and k = 120. What results do you expect?')
        ], solution: [
          P('Với k = 40: 40 × 1 800 = 72 000 đồng. Với k = 120: 50 × 1 800 + 70 × 2 000 = 90 000 + 140 000 = 230 000 đồng. Hai giá trị này là hai ca kiểm thử; nên thử thêm k = 50 (đúng ranh giới): 50 × 1 800 = 90 000 đồng.', 'With k = 40: 40 × 1 800 = 72 000 dong. With k = 120: 50 × 1 800 + 70 × 2 000 = 90 000 + 140 000 = 230 000 dong. These two are {test cases|test-case}; also try k = 50 (exactly on the boundary): 50 × 1 800 = 90 000 dong.')
        ] },
        { t: 'tip', items: [
          { vi: 'Python phân biệt chữ hoa, chữ thường và dùng thụt lề (thường 4 dấu cách) để nhóm lệnh. Dòng bắt đầu bằng # là chú thích, máy bỏ qua.', en: 'Python is case-sensitive and uses indentation (usually 4 spaces) to group lines. A line starting with # is a {comment|comment}, ignored by the computer.' }
        ] }
      ] },

      { number: 66, blocks: [
        { t: 'h2', n: '2', vi: 'Cấu trúc lặp và gỡ lỗi', en: 'Loops and debugging' },
        { t: 'code', lang: 'Python', text: '# Tính tổng 1 + 2 + ... + n\nn = int(input("Nhập n: "))\nS = 0\nfor i in range(1, n + 1):\n    S = S + i\nprint("Tổng là", S)', cap: { vi: 'Chương trình 16.2: tính tổng bằng vòng lặp for', en: 'Program 16.2: a sum with a for loop' } },
        P('Lệnh range(1, n + 1) tạo các giá trị i = 1, 2, …, n (không gồm n + 1). Mỗi lần lặp, biến S được cộng thêm i. Với n = 4, chương trình in ra 10.', 'The command range(1, n + 1) produces i = 1, 2, …, n (not including n + 1). Each pass adds i to S. With n = 4 the program prints 10.'),
        { t: 'h3', vi: 'Các lỗi thường gặp', en: 'Common mistakes' },
        { t: 'table', head: true, rows: [
          [{ vi: 'Lỗi', en: 'Mistake' }, { vi: 'Biểu hiện', en: 'Symptom' }, { vi: 'Cách sửa', en: 'Fix' }],
          [{ vi: 'Thiếu dấu hai chấm sau if, else, for', en: 'Missing colon after if, else, for' }, { vi: 'Thông báo lỗi cú pháp ở dòng đó.', en: 'A syntax error is reported on that line.' }, { vi: 'Thêm dấu hai chấm.', en: 'Add the colon.' }],
          [{ vi: 'Thụt lề sai', en: 'Wrong indentation' }, { vi: 'Lỗi thụt lề, hoặc chạy sai khối.', en: 'An indentation error or the wrong block runs.' }, { vi: 'Căn các dòng cùng khối bằng số dấu cách bằng nhau.', en: 'Align the lines of a block with the same number of spaces.' }],
          [{ vi: 'Quên int() khi nhập số', en: 'Forgetting int() when reading a number' }, { vi: 'Lỗi khi so sánh hoặc nhân chuỗi với số.', en: 'An error when comparing or multiplying text with a number.' }, { vi: 'Đổi sang số bằng int().', en: 'Convert with int().' }],
          [{ vi: 'Sai điều kiện ranh giới (< thay vì <=)', en: 'Wrong boundary condition (< instead of <=)' }, { vi: 'Không có thông báo lỗi nhưng kết quả sai ở k = 50.', en: 'No error message but a wrong result at k = 50.' }, { vi: 'Thử các giá trị ở ranh giới.', en: 'Test the boundary values.' }]
        ] },
        { t: 'tip', items: [
          { vi: 'Khi chương trình báo lỗi, em hãy đọc dòng cuối của thông báo lỗi trước: nó cho biết loại lỗi và số dòng. Sửa từng lỗi một rồi chạy lại.', en: 'When the program reports a mistake, read the last line of the error message first: it tells the kind of mistake and the line number. Fix one mistake at a time and run again.' }
        ] }
      ] },

      { number: 67, blocks: [
        { t: 'head', kind: 'practice', vi: 'Thực hành và luyện tập', en: 'Practice and exercises' },
        { t: 'ex', kind: 'hands', no: 1, body: [
          P('Thực hành trên máy tính:', 'Practice on the computer:'),
          { t: 'olist', items: [
            { vi: 'Gõ Chương trình 16.1 vào trình soạn thảo, lưu tệp tienDien.py và chạy.', en: 'Type Program 16.1 into the editor, save it as tienDien.py and run it.' },
            { vi: 'Thử các giá trị k = 40, 50, 51, 120 và đối chiếu với kết quả em tính tay.', en: 'Try k = 40, 50, 51 and 120 and compare with your hand calculation.' },
            { vi: 'Cố ý xoá dấu hai chấm sau else, chạy lại, đọc thông báo lỗi rồi sửa.', en: 'Deliberately delete the colon after else, run again, read the error message and fix it.' },
            { vi: 'Sửa chương trình để có ba mức giá: 50 kWh đầu 1 800 đồng, 50 kWh tiếp theo 2 000 đồng, từ kWh thứ 101 trở đi 2 500 đồng.', en: 'Change the program to have three price levels: 1 800 dong for the first 50 kWh, 2 000 dong for the next 50 kWh, 2 500 dong from the 101st kWh on.' }
          ], style: 'num' }
        ] },
        { t: 'ex', kind: 'practice', no: 1, body: [
          P('Viết chương trình nhập số nguyên n và in "chẵn" nếu n chia hết cho 2, ngược lại in "lẻ". (Gợi ý: dùng n % 2 == 0.)', 'Write a program that reads an integer n and prints "chẵn" (even) if n is divisible by 2, otherwise "lẻ" (odd). (Hint: use n % 2 == 0.)')
        ], solution: [
          { t: 'code', lang: 'Python', text: 'n = int(input("Nhập n: "))\nif n % 2 == 0:\n    print("chẵn")\nelse:\n    print("lẻ")' }
        ] },
        { t: 'ex', kind: 'apply', no: 1, body: [
          P('Viết chương trình nhập 5 điểm kiểm tra bằng vòng lặp for, tính điểm trung bình và in kết quả "Đạt" nếu từ 5 trở lên.', 'Write a program that reads 5 test marks with a for loop, computes the average and prints "Đạt" (Pass) if it is 5 or more.')
        ] },
        { t: 'quiz', title: { vi: 'Tự kiểm tra', en: 'Self-check' }, items: [
          Q('q1', 'Chương trình máy tính là:', 'A computer program is:', [['Dãy lệnh viết bằng ngôn ngữ lập trình', 'A series of commands in a programming language'], ['Một loại bàn phím', 'A kind of keyboard'], ['Một tệp ảnh', 'An image file'], ['Một trang web', 'A web page']], 0, 'Chương trình là các lệnh để máy tính thực hiện.', 'A program is commands for the computer to carry out.'),
          Q('q2', 'Lệnh nào đổi dữ liệu nhập thành số nguyên?', 'Which command converts the input to an integer?', [['print()', 'print()'], ['int()', 'int()'], ['range()', 'range()'], ['else', 'else']], 1, 'int() đổi chuỗi thành số nguyên.', 'int() converts a string to an integer.'),
          Q('q3', 'Trong Python, khối lệnh của if được xác định bằng:', 'In Python the block of an if is marked by:', [['Dấu ngoặc nhọn', 'Curly braces'], ['Thụt lề', 'Indentation'], ['Màu chữ', 'Text colour'], ['Dấu chấm phẩy', 'Semicolons']], 1, 'Python dùng thụt lề để nhóm lệnh.', 'Python uses indentation to group commands.'),
          Q('q4', 'Với k = 120, Chương trình 16.1 in ra số tiền:', 'For k = 120, Program 16.1 prints the amount:', [['216 000', '216 000'], ['230 000', '230 000'], ['240 000', '240 000'], ['90 000', '90 000']], 1, '90 000 + 70 × 2 000 = 230 000.', '90 000 + 70 × 2 000 = 230 000.'),
          Q('q5', 'Chương trình 16.2 với n = 5 in ra:', 'Program 16.2 with n = 5 prints:', [['10', '10'], ['15', '15'], ['5', '5'], ['20', '20']], 1, '1+2+3+4+5 = 15.', '1+2+3+4+5 = 15.'),
          Q('q6', 'Dòng bắt đầu bằng # trong Python là:', 'A line starting with # in Python is:', [['Lệnh in', 'A print command'], ['Chú thích', 'A comment'], ['Lỗi', 'An error'], ['Vòng lặp', 'A loop']], 1, 'Chú thích được máy bỏ qua.', 'Comments are ignored by the computer.'),
          Q('q7', 'Gỡ lỗi nghĩa là:', 'Debugging means:', [['Xoá chương trình', 'Deleting the program'], ['Tìm và sửa lỗi', 'Finding and fixing mistakes'], ['Tắt máy', 'Turning off the computer'], ['Đổi tên tệp', 'Renaming the file']], 1, 'Gỡ lỗi là tìm và sửa lỗi.', 'Debugging is finding and fixing mistakes.'),
          Q('q8', 'Vì sao nên thử k = 50 khi kiểm tra chương trình tiền điện?', 'Why try k = 50 when testing the bill program?', [['Vì 50 là giá trị ở ranh giới của điều kiện', 'Because 50 is a boundary value of the condition'], ['Vì 50 đẹp', 'Because 50 looks nice'], ['Vì máy chỉ nhận 50', 'Because the computer accepts only 50'], ['Không có lí do', 'No reason']], 0, 'Lỗi hay xảy ra ở ranh giới như < và <=.', 'Mistakes often occur at boundaries such as < versus <=.')
        ] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          { vi: 'Chương trình được viết từ thuật toán: nhập dữ liệu, xử lí (rẽ nhánh, lặp), đưa kết quả.', en: 'A program is written from an algorithm: input, processing (branch, loop), output.' },
          { vi: 'Phải theo cú pháp: dấu hai chấm, thụt lề, int() khi nhập số.', en: 'Follow the syntax: colons, indentation, int() when reading numbers.' },
          { vi: 'Gỡ lỗi bằng cách đọc thông báo lỗi và thử các ca kiểm thử, nhất là giá trị ở ranh giới.', en: 'Debug by reading error messages and trying test cases, especially boundary values.' }
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.',
          keys: ['program', 'programming-language', 'source-code', 'syntax', 'debug', 'run', 'data-type', 'integer', 'string', 'indentation', 'comment', 'error-message'] }
      ] }
    ]
  };
})();
