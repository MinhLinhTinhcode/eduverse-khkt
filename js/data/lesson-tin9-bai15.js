/* ==========================================================================
   TIN HỌC 9 — CHỦ ĐỀ 5. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH
     'tin9-bai15'  Bài 15. Bài toán tin học (tr. 60–63)
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
  const Q = (id, vi, en, opts, answer, whyVi, whyEn) => ({ id, vi, en, options: opts.map((o) => ({ vi: o[0], en: o[1] })), answer, whyVi, whyEn });

  Object.assign(D.glossary, {
    'computing-problem': g('computing problem', '/kəmˈpjuː.tɪŋ ˈprɒb.ləm/', 'n', 'bài toán tin học',
      'Bài toán có đầu vào, đầu ra rõ ràng và có thể giải bằng các bước máy tính thực hiện được.',
      'Finding the largest number is a computing problem.', 'Tìm số lớn nhất là một bài toán tin học.'),
    pseudocode: g('pseudocode', '/ˈsjuː.dəʊ.kəʊd/', 'n', 'mã giả',
      'Cách viết thuật toán bằng lời gần giống ngôn ngữ lập trình nhưng không cần đúng cú pháp.',
      'Pseudocode is easy to read and easy to change.', 'Mã giả dễ đọc và dễ sửa.'),
    'program-variable': g('variable', '/ˈveə.ri.ə.bəl/', 'n', 'biến',
      'Vùng nhớ có tên dùng để lưu một giá trị có thể thay đổi trong lúc chạy.',
      'The variable max stores the largest number so far.', 'Biến max lưu số lớn nhất tìm được cho tới lúc này.'),
    sequence: g('sequence', '/ˈsiː.kwəns/', 'n', 'cấu trúc tuần tự',
      'Các bước được thực hiện lần lượt từ trên xuống dưới.',
      'In a sequence the steps run one after another.', 'Trong cấu trúc tuần tự, các bước chạy lần lượt.'),
    branch: g('branch', '/brɑːntʃ/', 'n', 'cấu trúc rẽ nhánh',
      'Chọn thực hiện bước này hoặc bước kia tuỳ điều kiện đúng hay sai.',
      'A branch uses IF … THEN … ELSE.', 'Cấu trúc rẽ nhánh dùng NẾU … THÌ … NẾU KHÔNG.'),
    loop: g('loop', '/luːp/', 'n', 'cấu trúc lặp',
      'Lặp lại một nhóm bước nhiều lần cho đến khi đạt điều kiện dừng.',
      'A loop repeats the steps for each number.', 'Cấu trúc lặp lặp lại các bước cho từng số.'),
    'trace-table': g('trace table', '/treɪs ˈteɪ.bəl/', 'n', 'bảng theo dõi giá trị',
      'Bảng ghi giá trị các biến sau mỗi bước để kiểm tra thuật toán bằng tay.',
      'A trace table shows how max changes.', 'Bảng theo dõi giá trị cho thấy max thay đổi thế nào.'),
    efficient: g('efficient', '/ɪˈfɪʃ.ənt/', 'adj', 'hiệu quả (ít bước, ít tài nguyên)',
      'Giải được bài toán với ít bước hoặc ít bộ nhớ hơn các cách khác.',
      'This algorithm is more efficient than checking every pair.', 'Thuật toán này hiệu quả hơn việc kiểm tra mọi cặp.')
  });

  D.lessons['tin9-bai15'] = {
    gradeId: 9, number: '15', book: 'Tin học 9',
    title: { vi: 'Bài toán tin học', en: 'Computing problems' },
    topic: { number: '5', vi: 'Giải quyết vấn đề với sự trợ giúp của máy tính', en: 'Solving problems with the help of computers' },
    spreadLabels: ['Đầu vào, đầu ra; thuật toán; sơ đồ khối', 'Ba cấu trúc điều khiển; luyện tập; tự kiểm tra'],
    pages: [
      { number: 60, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: { vi: 'Sau bài học này em sẽ:', en: 'After this lesson you will:' }, items: [
          { vi: 'Xác định được đầu vào và đầu ra của một bài toán tin học.', en: 'Identify the {input|input} and {output|output} of a {computing problem|computing-problem}.' },
          { vi: 'Biểu diễn được thuật toán đơn giản bằng sơ đồ khối hoặc mã giả và nhận biết ba cấu trúc điều khiển.', en: 'Represent a simple {algorithm|algorithm} with a {flowchart|flowchart} or {pseudocode|pseudocode} and recognise the three control structures.' }
        ] },
        P('Máy tính chỉ làm được điều gì đó khi em nói rõ cho nó biết dữ liệu nào đi vào, cần kết quả gì và các bước làm ra sao. Việc mô tả đó chính là phát biểu bài toán tin học và viết thuật toán.',
          'A computer can only do something when you tell it clearly which data goes in, what result is wanted and which steps to follow. Describing this is exactly stating a computing problem and writing an algorithm.', { badge: 'fire' }),
        { t: 'h2', n: '1', vi: 'Bài toán tin học: đầu vào và đầu ra', en: 'A computing problem: input and output' },
        { t: 'activity', no: 1, title: { vi: 'Hai bài toán, hai cách hỏi', en: 'Two problems, two ways of asking' },
          vi: 'Bài toán A: "Lớp em có ai cao nhất?". Bài toán B: "Cho danh sách chiều cao của 40 bạn; tìm chiều cao lớn nhất". Theo em, bài toán nào máy tính có thể giải ngay? Vì sao?',
          en: 'Problem A: "Who is the tallest in your class?". Problem B: "Given the list of heights of 40 students, find the greatest height." Which one can a computer solve right away, and why?', items: [], style: 'plain' },
        P('Một bài toán tin học cần nêu rõ **đầu vào** (dữ liệu cho trước) và **đầu ra** (kết quả cần tìm) cùng mối quan hệ giữa chúng. Bài toán B có đầu vào là danh sách 40 số và đầu ra là một số, nên máy tính giải được; bài toán A còn mơ hồ vì chưa nói dữ liệu ở đâu.',
          'A computing problem must state the **input** (the given data), the **output** (the result wanted) and how they are related. Problem B has a list of 40 numbers as input and one number as output, so a computer can solve it; Problem A is vague because it does not say where the data is.'),
        { t: 'fig', art: 'ipo15a', no: '15.1', vi: 'Đầu vào – xử lí – đầu ra', en: 'Input – process – output', wide: true }
      ] },

      { number: 61, blocks: [
        { t: 'h2', n: '2', vi: 'Thuật toán', en: 'Algorithms' },
        P('**Thuật toán** là dãy hữu hạn các bước rõ ràng, thực hiện lần lượt để biến đầu vào thành đầu ra. Một thuật toán tốt phải **rõ ràng** (mỗi bước chỉ có một cách hiểu), **hữu hạn** (dừng sau một số bước) và **đúng** (cho kết quả đúng với mọi đầu vào hợp lệ).',
          'An **algorithm** is a finite series of clear steps, carried out in order, that turns input into output. A good algorithm is **clear** (each step has one meaning), **finite** (it stops after a number of steps) and **correct** (it gives the right result for every valid input).'),
        { t: 'ex', kind: 'example', no: 1, body: [
          P('Tìm số lớn nhất trong ba số a, b, c. Viết thuật toán bằng mã giả.', 'Find the largest of three numbers a, b, c. Write the algorithm in pseudocode.')
        ], solution: [
          { t: 'code', lang: 'Mã giả / Pseudocode', text: 'Nhập a, b, c\nmax ← a\nNếu b > max thì max ← b\nNếu c > max thì max ← c\nĐưa ra max', cap: { vi: 'Biến max luôn giữ số lớn nhất đã xét.', en: 'The variable max always holds the largest number checked so far.' } },
          P('Kiểm tra với a = 4, b = 9, c = 2: max ← 4; b > max (9 > 4) nên max ← 9; c > max (2 > 9) sai nên giữ nguyên; đưa ra 9. Đúng.', 'Check with a = 4, b = 9, c = 2: max ← 4; b > max (9 > 4) so max ← 9; c > max (2 > 9) is false so max stays; output 9. Correct.')
        ] },
        { t: 'h3', vi: 'Sơ đồ khối', en: 'Flowchart' },
        P('Sơ đồ khối biểu diễn thuật toán bằng hình: hình bầu dục cho Bắt đầu và Kết thúc, hình bình hành cho Nhập hoặc Đưa ra, hình chữ nhật cho phép gán hoặc tính toán, hình thoi cho điều kiện rẽ nhánh. Các khối nối nhau bằng mũi tên chỉ thứ tự.',
          'A flowchart draws an algorithm with shapes: ovals for Start and End, parallelograms for Input or Output, rectangles for assignment or calculation and diamonds for a branching condition. Arrows join the shapes to show order.'),
        { t: 'fig', art: 'flow15b', no: '15.2', vi: 'Sơ đồ khối tìm số lớn nhất của ba số', en: 'Flowchart that finds the largest of three numbers', wide: true }
      ] },

      { number: 62, blocks: [
        { t: 'h2', n: '3', vi: 'Ba cấu trúc điều khiển', en: 'Three control structures' },
        { t: 'table', head: true, rows: [
          [{ vi: 'Cấu trúc', en: 'Structure' }, { vi: 'Ý nghĩa', en: 'Meaning' }, { vi: 'Ví dụ', en: 'Example' }],
          [{ vi: 'Tuần tự', en: 'Sequence' }, { vi: 'Làm lần lượt từng bước.', en: 'Do the steps one after another.' }, { vi: 'Nhập a, b rồi tính tổng.', en: 'Input a, b then compute the sum.' }],
          [{ vi: 'Rẽ nhánh', en: 'Branch' }, { vi: 'Chọn việc tuỳ điều kiện.', en: 'Choose the action by a condition.' }, { vi: 'Nếu điểm ≥ 5 thì "Đạt", không thì "Chưa đạt".', en: 'If mark ≥ 5 then "Pass", else "Not yet".' }],
          [{ vi: 'Lặp', en: 'Loop' }, { vi: 'Lặp lại các bước đến khi đủ điều kiện dừng.', en: 'Repeat steps until the stop condition holds.' }, { vi: 'Cộng lần lượt từng số trong danh sách.', en: 'Add every number in the list one by one.' }]
        ] },
        { t: 'ex', kind: 'example', no: 2, body: [
          P('Tính tổng S = 1 + 2 + … + n. Viết mã giả dùng cấu trúc lặp và kiểm tra với n = 4.', 'Compute S = 1 + 2 + … + n. Write pseudocode with a loop and check it for n = 4.')
        ], solution: [
          { t: 'code', lang: 'Mã giả / Pseudocode', text: 'Nhập n\nS ← 0\nVới i từ 1 đến n:\n    S ← S + i\nĐưa ra S', cap: { vi: 'Vòng lặp chạy n lần, mỗi lần cộng thêm i.', en: 'The loop runs n times, adding i each time.' } },
          { t: 'table', head: true, rows: [
            ['i', 'S (trước)', 'S (sau)'],
            ['1', '0', '1'], ['2', '1', '3'], ['3', '3', '6'], ['4', '6', '10']
          ] },
          P('Bảng theo dõi giá trị cho thấy với n = 4, S = 10 = 4×5/2 nên thuật toán đúng.', 'The {trace table|trace-table} shows that for n = 4, S = 10 = 4×5/2, so the algorithm is correct.')
        ] },
        { t: 'tip', items: [
          { vi: 'Biến là vùng nhớ có tên, ví dụ max, S, i; giá trị của biến có thể thay đổi sau mỗi bước.', en: 'A {variable|program-variable} is a named memory place such as max, S or i; its value can change after each step.' },
          { vi: 'Cùng một bài toán có thể có nhiều thuật toán. Thuật toán ít bước hơn thì hiệu quả hơn.', en: 'One problem can have several algorithms. An algorithm with fewer steps is more {efficient|efficient}.' }
        ] }
      ] },

      { number: 63, blocks: [
        { t: 'head', kind: 'practice', vi: 'Luyện tập và vận dụng', en: 'Practice and apply' },
        { t: 'ex', kind: 'practice', no: 1, body: [
          P('Nêu đầu vào và đầu ra của bài toán: "Kiểm tra một số nguyên n là số chẵn hay số lẻ".', 'State the input and output of: "Check whether an integer n is even or odd".')
        ], solution: [P('Đầu vào: số nguyên n. Đầu ra: thông báo "chẵn" hoặc "lẻ". Cấu trúc cần dùng: rẽ nhánh (n chia cho 2 dư 0 hay không).', 'Input: the integer n. Output: the message "even" or "odd". Structure needed: branch (whether n divided by 2 leaves remainder 0).')] },
        { t: 'ex', kind: 'practice', no: 2, body: [
          P('Viết mã giả thuật toán tính điểm trung bình của ba môn x, y, z và đưa ra "Đạt" nếu trung bình từ 5 trở lên, ngược lại đưa ra "Chưa đạt".', 'Write pseudocode that computes the average of three subjects x, y, z and outputs "Pass" if the average is 5 or more, otherwise "Not yet".')
        ], solution: [
          { t: 'code', lang: 'Mã giả / Pseudocode', text: 'Nhập x, y, z\ntb ← (x + y + z) / 3\nNếu tb >= 5 thì đưa ra "Đạt"\nNếu không thì đưa ra "Chưa đạt"' }
        ] },
        { t: 'ex', kind: 'apply', no: 1, body: [
          P('Em hãy nêu một việc em làm hằng ngày (như đánh răng, pha mì) và viết nó thành thuật toán 5–7 bước, chỉ rõ bước nào là rẽ nhánh hoặc lặp.', 'Pick something you do every day (like brushing teeth or cooking noodles) and write it as an algorithm of 5–7 steps, showing which step is a branch or a loop.')
        ] },
        { t: 'quiz', title: { vi: 'Tự kiểm tra', en: 'Self-check' }, items: [
          Q('q1', 'Đầu vào của một bài toán tin học là:', 'The input of a computing problem is:', [['Kết quả cần tìm', 'The result sought'], ['Dữ liệu cho trước', 'The given data'], ['Tên chương trình', 'The name of the program'], ['Màu giao diện', 'The interface colour']], 1, 'Đầu vào là dữ liệu cho trước; đầu ra mới là kết quả.', 'Input is the given data; output is the result.'),
          Q('q2', 'Thuật toán là:', 'An algorithm is:', [['Dãy hữu hạn các bước rõ ràng', 'A finite series of clear steps'], ['Một phần mềm', 'A piece of software'], ['Một thiết bị', 'A device'], ['Một loại biến', 'A kind of variable']], 0, 'Thuật toán phải rõ ràng và hữu hạn.', 'An algorithm must be clear and finite.'),
          Q('q3', 'Hình thoi trong sơ đồ khối biểu diễn:', 'The diamond in a flowchart shows:', [['Bắt đầu', 'Start'], ['Nhập dữ liệu', 'Input'], ['Điều kiện rẽ nhánh', 'A branching condition'], ['Kết thúc', 'End']], 2, 'Hình thoi chứa điều kiện đúng hoặc sai.', 'The diamond holds a true-or-false condition.'),
          Q('q4', 'Cấu trúc nào thích hợp để cộng từng số trong danh sách?', 'Which structure suits adding every number in a list?', [['Tuần tự', 'Sequence'], ['Rẽ nhánh', 'Branch'], ['Lặp', 'Loop'], ['Không cần cấu trúc', 'No structure is needed']], 2, 'Việc lặp lại cho từng số cần vòng lặp.', 'Repeating for each number needs a loop.'),
          Q('q5', 'Sau các bước max ← 4; b = 9 > max nên max ← 9; giá trị max là:', 'After max ← 4; b = 9 > max so max ← 9; the value of max is:', [['4', '4'], ['9', '9'], ['13', '13'], ['0', '0']], 1, 'Biến max được gán lại bằng 9.', 'The variable max is reassigned to 9.'),
          Q('q6', 'Mã giả khác chương trình ở điểm nào?', 'How does pseudocode differ from a program?', [['Không cần đúng cú pháp của ngôn ngữ lập trình', 'It need not follow a programming language’s syntax'], ['Chạy nhanh hơn', 'It runs faster'], ['Dài hơn', 'It is longer'], ['Máy tính hiểu trực tiếp', 'A computer understands it directly']], 0, 'Mã giả viết gần ngôn ngữ tự nhiên, để người đọc.', 'Pseudocode is near natural language, written for people.'),
          Q('q7', 'Bảng theo dõi giá trị dùng để:', 'A trace table is used to:', [['Vẽ biểu đồ', 'Draw a chart'], ['Kiểm tra thuật toán bằng tay', 'Check an algorithm by hand'], ['Lưu mật khẩu', 'Store a password'], ['In văn bản', 'Print a text']], 1, 'Bảng ghi giá trị biến sau mỗi bước.', 'It records variable values after every step.'),
          Q('q8', 'Với n = 4, S = 1 + 2 + 3 + 4 bằng:', 'For n = 4, S = 1 + 2 + 3 + 4 equals:', [['4', '4'], ['8', '8'], ['10', '10'], ['24', '24']], 2, '1+2+3+4 = 10.', '1+2+3+4 = 10.')
        ] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          { vi: 'Bài toán tin học cần nêu rõ đầu vào và đầu ra.', en: 'A computing problem must state its input and output.' },
          { vi: 'Thuật toán là dãy hữu hạn các bước rõ ràng, có thể vẽ bằng sơ đồ khối hoặc viết bằng mã giả.', en: 'An algorithm is a finite series of clear steps that can be drawn as a flowchart or written as pseudocode.' },
          { vi: 'Ba cấu trúc điều khiển: tuần tự, rẽ nhánh và lặp; dùng bảng theo dõi giá trị để kiểm tra thuật toán.', en: 'Three control structures: sequence, branch and loop; use a trace table to check an algorithm.' }
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.',
          keys: ['computing-problem', 'input', 'output', 'algorithm', 'flowchart', 'pseudocode', 'program-variable', 'sequence', 'branch', 'loop', 'trace-table', 'efficient'] }
      ] }
    ]
  };
})();
