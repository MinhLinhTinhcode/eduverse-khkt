/* ==========================================================================
   TIN HỌC 9 — CHỦ ĐỀ 5. GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH
     'tin9-bai14'  Bài 14. Giải quyết vấn đề (tr. 56–59)
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
    'problem-solving': g('problem solving', '/ˈprɒb.ləm ˈsɒl.vɪŋ/', 'n', 'giải quyết vấn đề',
      'Quá trình đi từ tình huống ban đầu đến mục tiêu mong muốn qua các bước có kế hoạch.',
      'Problem solving works best when you follow clear steps.', 'Giải quyết vấn đề hiệu quả nhất khi em làm theo các bước rõ ràng.'),
    problem: g('problem', '/ˈprɒb.ləm/', 'n', 'vấn đề, bài toán',
      'Tình huống có mục tiêu cần đạt nhưng chưa biết ngay cách làm.',
      'The class has a problem: the library is too noisy.', 'Lớp có một vấn đề: thư viện quá ồn.'),
    goal: g('goal', '/ɡəʊl/', 'n', 'mục tiêu',
      'Kết quả mong muốn cần đạt được khi giải quyết vấn đề.',
      'The goal is to collect 500 books for the school.', 'Mục tiêu là quyên góp 500 quyển sách cho trường.'),
    constraint: g('constraint', '/kənˈstreɪnt/', 'n', 'ràng buộc, điều kiện hạn chế',
      'Giới hạn về thời gian, tiền bạc, thiết bị hoặc quy định mà lời giải phải tuân theo.',
      'The budget is a constraint on the party.', 'Ngân sách là một ràng buộc đối với buổi liên hoan.'),
    decompose: g('decompose', '/ˌdiː.kəmˈpəʊz/', 'v', 'chia nhỏ (vấn đề)',
      'Chia vấn đề lớn thành nhiều vấn đề nhỏ dễ giải quyết hơn.',
      'First decompose the project into small tasks.', 'Trước hết hãy chia dự án thành các việc nhỏ.'),
    'problem-solution': g('solution', '/səˈluː.ʃən/', 'n', 'giải pháp, lời giải',
      'Cách làm hoặc kết quả giúp đạt mục tiêu của vấn đề.',
      'Each group proposed a different solution.', 'Mỗi nhóm đề xuất một giải pháp khác nhau.'),
    option: g('option', '/ˈɒp.ʃən/', 'n', 'phương án',
      'Một trong nhiều cách có thể chọn để giải quyết vấn đề.',
      'We compared three options before choosing.', 'Chúng em so sánh ba phương án trước khi chọn.'),
    plan: g('plan', '/plæn/', 'n', 'kế hoạch',
      'Danh sách các việc cần làm, thứ tự và người thực hiện.',
      'A clear plan saves time.', 'Một kế hoạch rõ ràng tiết kiệm thời gian.'),
    evaluate: g('evaluate', '/ɪˈvæl.ju.eɪt/', 'v', 'đánh giá',
      'So sánh kết quả thực tế với mục tiêu để biết giải pháp đã tốt chưa.',
      'After the event we evaluate the result.', 'Sau sự kiện, chúng em đánh giá kết quả.'),
    'test-case': g('test case', '/test keɪs/', 'n', 'ca kiểm thử, dữ liệu thử',
      'Bộ dữ liệu mẫu cùng kết quả mong đợi dùng để thử xem lời giải có đúng không.',
      'Try a test case with small numbers first.', 'Hãy thử một ca kiểm thử với số nhỏ trước.'),
    tool: g('tool', '/tuːl/', 'n', 'công cụ',
      'Phần mềm hoặc thiết bị hỗ trợ con người làm việc, như bảng tính, phần mềm vẽ sơ đồ.',
      'A spreadsheet is a useful tool for budgets.', 'Bảng tính là công cụ hữu ích cho ngân sách.'),
    iterate: g('iterate', '/ˈɪt.ə.reɪt/', 'v', 'lặp lại và cải tiến',
      'Làm lại nhiều vòng, mỗi vòng sửa những chỗ chưa tốt của vòng trước.',
      'Good designers iterate until the result works.', 'Người thiết kế giỏi lặp lại và cải tiến cho đến khi kết quả dùng tốt.')
  });

  D.lessons['tin9-bai14'] = {
    gradeId: 9, number: '14', book: 'Tin học 9',
    title: { vi: 'Giải quyết vấn đề', en: 'Problem solving' },
    topic: { number: '5', vi: 'Giải quyết vấn đề với sự trợ giúp của máy tính', en: 'Solving problems with the help of computers' },
    spreadLabels: ['Vấn đề và các bước giải quyết', 'Ví dụ; chia nhỏ vấn đề; tự kiểm tra'],
    pages: [
      { number: 56, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: { vi: 'Sau bài học này em sẽ:', en: 'After this lesson you will:' }, items: [
          { vi: 'Nêu được các bước giải quyết một vấn đề và vai trò của máy tính trong từng bước.', en: 'Name the steps of {problem solving|problem-solving} and the role of computers in each step.' },
          { vi: 'Biết chia nhỏ vấn đề, so sánh các phương án và đánh giá kết quả.', en: 'Know how to {decompose|decompose} a problem, compare {options|option} and {evaluate|evaluate} the result.' }
        ] },
        P('Tổ chức một buổi quyên góp sách, lập thời gian biểu ôn thi hay chọn tuyến đường đi học ngắn nhất đều là các vấn đề cần cách giải quyết có hệ thống. Máy tính không tự nghĩ ra vấn đề, nhưng giúp em tính nhanh, lưu trữ và kiểm tra kết quả.',
          'Organising a book drive, making a revision timetable or choosing the shortest way to school are all problems that need a systematic solution. A computer does not invent the problem, but it helps you compute fast, store data and check results.', { badge: 'fire' }),
        { t: 'h2', n: '1', vi: 'Vấn đề và mục tiêu', en: 'Problems and goals' },
        { t: 'activity', no: 1, title: { vi: 'Lớp em cần làm gì?', en: 'What does your class need to do?' },
          vi: 'Lớp 9A muốn quyên góp 300 quyển sách cho thư viện trường trong 3 tuần, ngân sách in áp phích là 100 nghìn đồng. Em hãy chỉ ra: tình huống ban đầu, mục tiêu và những điều kiện hạn chế của vấn đề này.',
          en: 'Class 9A wants to collect 300 books for the school library in 3 weeks, with a poster budget of 100 thousand dong. State the starting situation, the {goal|goal} and the {constraints|constraint} of this {problem|problem}.', items: [], style: 'plain' },
        P('Một vấn đề được mô tả bằng ba điều: **tình huống ban đầu** (đang có gì), **mục tiêu** (muốn đạt gì) và **ràng buộc** (thời gian, tiền, quy định…). Mô tả rõ ba điều này là việc đầu tiên, vì vấn đề mơ hồ sẽ cho ra giải pháp sai hướng.',
          'A problem is described by three things: the **starting situation** (what we have), the **goal** (what we want) and the **constraints** (time, money, rules…). Describing these three clearly comes first, because a vague problem produces a solution that misses the point.'),
        { t: 'h2', n: '2', vi: 'Các bước giải quyết vấn đề', en: 'Steps of problem solving' },
        { t: 'fig', art: 'ps14a', no: '14.1', vi: 'Năm bước giải quyết vấn đề, có thể quay lại để điều chỉnh', en: 'Five steps of problem solving, with a way back to adjust', wide: true }
      ] },

      { number: 57, blocks: [
        { t: 'h3', vi: 'Bảng 14.1. Năm bước và vai trò của máy tính', en: 'Table 14.1. Five steps and the role of the computer' },
        { t: 'table', head: true, rows: [
          [{ vi: 'Bước', en: 'Step' }, { vi: 'Việc cần làm', en: 'What to do' }, { vi: 'Máy tính hỗ trợ', en: 'How a computer helps' }],
          [{ vi: '1. Xác định vấn đề', en: '1. Identify the problem' }, { vi: 'Nêu tình huống, mục tiêu, ràng buộc.', en: 'State the situation, goal and constraints.' }, { vi: 'Tìm thông tin, đọc dữ liệu có sẵn.', en: 'Search for information and read existing data.' }],
          [{ vi: '2. Tìm các phương án', en: '2. Find options' }, { vi: 'Nghĩ ra nhiều cách khác nhau.', en: 'Think of several different ways.' }, { vi: 'Sơ đồ tư duy, trao đổi nhóm trực tuyến.', en: 'Mind maps and online group chat.' }],
          [{ vi: '3. Chọn và thiết kế', en: '3. Choose and design' }, { vi: 'So sánh phương án, chọn một cách, lập kế hoạch.', en: 'Compare options, choose one and write a plan.' }, { vi: 'Bảng tính so sánh chi phí; phần mềm lập kế hoạch.', en: 'Spreadsheets to compare cost; planning software.' }],
          [{ vi: '4. Thực hiện', en: '4. Carry out' }, { vi: 'Làm theo kế hoạch.', en: 'Follow the plan.' }, { vi: 'Phần mềm ứng dụng, chương trình máy tính.', en: 'Application software and computer programs.' }],
          [{ vi: '5. Kiểm tra, đánh giá', en: '5. Test and evaluate' }, { vi: 'So kết quả với mục tiêu; sửa nếu chưa đạt.', en: 'Compare the result with the goal; fix if not met.' }, { vi: 'Biểu đồ, thống kê, chạy thử với dữ liệu mẫu.', en: 'Charts, statistics and trial runs with sample data.' }]
        ] },
        { t: 'ex', kind: 'example', no: 1, body: [
          P('Em cần chọn một trong ba cách in áp phích cho đợt quyên góp sách với ngân sách 100 nghìn đồng: (A) in màu 10 tờ giá 8 nghìn/tờ; (B) in trắng đen 25 tờ giá 3 nghìn/tờ; (C) tự vẽ tay, chi phí giấy màu 30 nghìn. Phương án nào phù hợp?', 'You must pick one of three ways to print posters for the book drive with a budget of 100 thousand dong: (A) 10 colour posters at 8 thousand each; (B) 25 black-and-white posters at 3 thousand each; (C) hand-drawn, with 30 thousand for coloured paper. Which option fits?')
        ], solution: [
          P('Tính chi phí: A = 10 × 8 = 80; B = 25 × 3 = 75; C = 30 (nghìn đồng). Cả ba đều trong ngân sách 100. Theo mục tiêu "nhiều người nhìn thấy", B có số tờ nhiều nhất nên phủ rộng hơn, còn A bắt mắt hơn. Khi hai tiêu chí mâu thuẫn, em cần quyết định tiêu chí ưu tiên và ghi lại lí do chọn.', 'Costs: A = 10 × 8 = 80; B = 25 × 3 = 75; C = 30 (thousand dong). All three are within the 100 budget. For the goal "many people see it", B has the most sheets so it reaches wider, while A is more eye-catching. When two criteria conflict, decide the priority and record the reason for the choice.')
        ] },
        { t: 'tip', items: [
          { vi: 'Giải quyết vấn đề không phải đường thẳng một chiều: nếu bước 5 cho thấy chưa đạt mục tiêu, em quay lại bước phù hợp để điều chỉnh rồi làm lại.', en: 'Problem solving is not a one-way line: if step 5 shows the goal is not met, go back to the right step, adjust and try again ({iterate|iterate}).' },
          { vi: 'Ghi chép từng bước giúp em và người khác kiểm tra, sửa lỗi nhanh hơn.', en: 'Writing down each step lets you and others check and fix mistakes faster.' }
        ] }
      ] },

      { number: 58, blocks: [
        { t: 'h2', n: '3', vi: 'Chia nhỏ vấn đề', en: 'Breaking a problem into parts' },
        P('Vấn đề lớn khó giải quyết một lần. Em chia thành các vấn đề nhỏ hơn, giải từng phần rồi ghép lại. Mỗi phần nhỏ nên có đầu vào, kết quả và người phụ trách rõ ràng.',
          'A big problem is hard to solve at once. Split it into smaller problems, solve each part and put them together. Each small part should have a clear input, result and person in charge.'),
        { t: 'ex', kind: 'example', no: 2, body: [
          P('Chia vấn đề "Tổ chức buổi chợ sách của lớp" thành các việc nhỏ.', 'Break the problem "Organising the class book fair" into smaller tasks.')
        ], solution: [
          { t: 'olist', items: [
            { vi: 'Thu thập sách: kêu gọi, ghi danh sách người tặng (bảng tính).', en: 'Collect books: appeal for donations and record donors (spreadsheet).' },
            { vi: 'Phân loại và định giá: chia theo thể loại, ghi giá.', en: 'Sort and price: group by genre and record prices.' },
            { vi: 'Truyền thông: thiết kế áp phích, đăng tin lên trang lớp.', en: 'Publicity: design posters and post news on the class page.' },
            { vi: 'Bán hàng: lập bảng thu chi, tính tiền bằng công thức.', en: 'Sales: build an income and spending table and compute with formulas.' },
            { vi: 'Tổng kết: tính tổng thu, so với mục tiêu, vẽ biểu đồ.', en: 'Wrap-up: compute the total, compare with the goal and draw a chart.' }
          ], style: 'num' },
          P('Việc 4 và 5 dùng đúng kiến thức bảng tính ở các Bài 10a–13a, nên có thể giao cho nhóm giỏi bảng tính.', 'Tasks 4 and 5 use exactly the spreadsheet knowledge of Lessons 10a–13a, so they can go to the group strongest in spreadsheets.')
        ] },
        { t: 'h3', vi: 'Kiểm thử bằng dữ liệu mẫu', en: 'Testing with sample data' },
        P('Trước khi dùng giải pháp thật, em nên thử với một vài ca kiểm thử nhỏ mà em biết trước kết quả. Ví dụ, công thức tính tổng thu nên được thử với 2–3 dòng mà em tự cộng nhẩm được; nếu kết quả khớp, em mới tin vào công thức khi dữ liệu lên đến hàng trăm dòng.',
          'Before using the real solution, try a few small {test cases|test-case} whose answers you already know. For example, test a total-income formula with 2–3 rows you can add in your head; only when the result matches should you trust the formula with hundreds of rows.')
      ] },

      { number: 59, blocks: [
        { t: 'head', kind: 'practice', vi: 'Luyện tập và vận dụng', en: 'Practice and apply' },
        { t: 'ex', kind: 'practice', no: 1, body: [
          P('Sắp xếp các việc sau theo thứ tự đúng của các bước giải quyết vấn đề: (a) so sánh chi phí ba phương án; (b) chạy thử và đối chiếu với mục tiêu; (c) nêu rõ mục tiêu và ngân sách; (d) đề xuất nhiều cách làm; (e) làm theo kế hoạch đã chọn.', 'Put these tasks in the right order of the problem-solving steps: (a) compare the cost of three options; (b) run a trial and check against the goal; (c) state the goal and budget; (d) suggest several ways; (e) follow the chosen plan.')
        ], solution: [P('Thứ tự đúng: (c) → (d) → (a) → (e) → (b).', 'The right order: (c) → (d) → (a) → (e) → (b).')] },
        { t: 'ex', kind: 'apply', no: 1, body: [
          P('Em hãy chọn một vấn đề thật ở lớp hoặc ở nhà (ví dụ: sắp xếp thời gian ôn thi). Nêu tình huống, mục tiêu, ràng buộc, chia vấn đề thành 3–5 việc nhỏ và nói máy tính có thể hỗ trợ ở bước nào.', 'Choose a real problem at school or at home (for example, arranging revision time). State the situation, goal and constraints, split it into 3–5 small tasks and say at which step a computer can help.')
        ] },
        { t: 'quiz', title: { vi: 'Tự kiểm tra', en: 'Self-check' }, items: [
          Q('q1', 'Một vấn đề được mô tả đầy đủ khi nêu rõ:', 'A problem is fully described when it states:', [['Tình huống ban đầu, mục tiêu và ràng buộc', 'The starting situation, goal and constraints'], ['Chỉ mục tiêu', 'Only the goal'], ['Chỉ tên người làm', 'Only the name of the doer'], ['Chỉ thời gian', 'Only the time']], 0, 'Ba thành phần này giúp hiểu đúng vấn đề.', 'These three parts give a correct understanding of the problem.'),
          Q('q2', 'Bước đầu tiên khi giải quyết vấn đề là:', 'The first step of problem solving is:', [['Thực hiện ngay', 'Carry it out at once'], ['Xác định vấn đề', 'Identify the problem'], ['Đánh giá kết quả', 'Evaluate the result'], ['Chọn công cụ', 'Choose a tool']], 1, 'Chưa hiểu rõ vấn đề thì khó có giải pháp đúng.', 'Without understanding the problem it is hard to find a right solution.'),
          Q('q3', 'Vì sao nên chia nhỏ vấn đề?', 'Why decompose a problem?', [['Vì mỗi phần nhỏ dễ giải quyết và giao việc hơn', 'Each small part is easier to solve and assign'], ['Để làm lâu hơn', 'To take longer'], ['Để không cần kiểm tra', 'So no checking is needed'], ['Vì máy tính yêu cầu', 'Because the computer demands it']], 0, 'Chia nhỏ giúp quản lí và kiểm tra từng phần.', 'Splitting helps manage and check each part.'),
          Q('q4', 'Ngân sách 100 nghìn đồng của một buổi liên hoan là ví dụ về:', 'A 100 thousand dong budget for a party is an example of:', [['Mục tiêu', 'A goal'], ['Ràng buộc', 'A constraint'], ['Kết quả', 'A result'], ['Công cụ', 'A tool']], 1, 'Ngân sách giới hạn cách làm nên là ràng buộc.', 'A budget limits how you can act, so it is a constraint.'),
          Q('q5', 'Khi kết quả chưa đạt mục tiêu, em nên:', 'When the result does not meet the goal you should:', [['Bỏ cuộc', 'Give up'], ['Giấu kết quả', 'Hide the result'], ['Quay lại bước phù hợp để điều chỉnh', 'Go back to the right step and adjust'], ['Đổi mục tiêu cho dễ', 'Change the goal to make it easier']], 2, 'Giải quyết vấn đề có thể lặp lại và cải tiến.', 'Problem solving can be repeated and improved.'),
          Q('q6', 'Ca kiểm thử dùng để:', 'A test case is used to:', [['Trang trí báo cáo', 'Decorate a report'], ['Thử lời giải với dữ liệu biết trước kết quả', 'Try the solution on data whose answer is known'], ['Xoá dữ liệu cũ', 'Delete old data'], ['In ấn', 'Print']], 1, 'Biết trước kết quả mới đối chiếu được.', 'Only a known answer can be compared.'),
          Q('q7', 'Bảng tính giúp ích nhiều nhất ở bước nào?', 'In which step does a spreadsheet help most?', [['So sánh chi phí các phương án', 'Comparing the cost of options'], ['Nghĩ ra vấn đề', 'Inventing the problem'], ['Đặt tên lớp', 'Naming the class'], ['Không giúp được', 'It cannot help']], 0, 'Bảng tính tính toán và so sánh số liệu nhanh.', 'A spreadsheet computes and compares figures quickly.'),
          Q('q8', 'Trong ví dụ áp phích, nếu hai tiêu chí mâu thuẫn thì em nên:', 'In the poster example, if two criteria conflict you should:', [['Chọn ngẫu nhiên', 'Choose at random'], ['Quyết định tiêu chí ưu tiên và ghi lí do', 'Decide the priority and record the reason'], ['Không làm gì', 'Do nothing'], ['Chọn cách rẻ nhất luôn', 'Always pick the cheapest']], 1, 'Ưu tiên rõ ràng giúp chọn có căn cứ.', 'A clear priority gives a reasoned choice.')
        ] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          { vi: 'Vấn đề được mô tả bằng tình huống ban đầu, mục tiêu và ràng buộc.', en: 'A problem is described by its starting situation, goal and constraints.' },
          { vi: 'Năm bước: xác định vấn đề, tìm phương án, chọn và thiết kế, thực hiện, kiểm tra và đánh giá; có thể quay lại điều chỉnh.', en: 'Five steps: identify, find options, choose and design, carry out, test and evaluate; you can go back and adjust.' },
          { vi: 'Chia nhỏ vấn đề và thử với dữ liệu mẫu giúp giải quyết chính xác; máy tính hỗ trợ ở mọi bước.', en: 'Decomposing and testing with sample data gives accurate solutions; computers help at every step.' }
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.',
          keys: ['problem-solving', 'problem', 'goal', 'constraint', 'decompose', 'problem-solution', 'option', 'plan', 'evaluate', 'test-case', 'tool', 'iterate'] }
      ] }
    ]
  };
})();
