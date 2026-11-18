/* ==========================================================================
   TOÁN 9 (TẬP MỘT) — CHƯƠNG: PHƯƠNG TRÌNH VÀ HỆ HAI PHƯƠNG TRÌNH BẬC NHẤT HAI ẨN
   --------------------------------------------------------------------------
   File này khai báo 3 bài học (mỗi bài một mục trong TEXTBOOK.lessons):

     'toan9-bai1'  Bài 1. Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn
     'toan9-bai2'  Bài 2. Giải hệ hai phương trình bậc nhất hai ẩn
     'toan9-bai3'  Bài 3. Giải bài toán bằng cách lập hệ phương trình

   Lời văn được biên soạn lại, không chép nguyên văn sách giáo khoa.
   Số liệu của các ví dụ giữ nguyên để kiểm tra được kết quả.

   QUY ƯỚC VIẾT NỘI DUNG
   • Mỗi chuỗi dùng T`...` (String.raw) để viết LaTeX không phải gõ gấp đôi dấu \.
   • Công thức viết trong $...$, ví dụ  $\frac{5-x}{2}$,  $x_0$,  $(x;\,y)\in\mathbb{R}$.
     Hệ phương trình: $\begin{cases} x+y=17 \\ 10x+3y=100 \end{cases}$
   • Thuật ngữ tiếng Anh viết {linear equation}; nếu chữ hiển thị khác khoá thì
     {equations|equation}. App sẽ đổi thành
       <span class="vocab" data-key="linear-equation">linear equation</span>
     (gạch chân nét đứt, bấm để xem IPA, nghĩa, ví dụ, nghe phát âm).
   • **đậm**, *nghiêng*, [[MODE]] (phím máy tính bấm được).
   • Từ điển của bài nằm ngay đầu file này (Object.assign vào TEXTBOOK.glossary),
     nên chỉ cần nạp một file là đủ.
   ========================================================================== */
(function () {
  'use strict';

  const D = (window.TEXTBOOK = window.TEXTBOOK || {});
  D.lessons = D.lessons || {};
  D.glossary = D.glossary || {};

  const T = String.raw;

  /* ------------------------------------------------------------------------
     TỪ VỰNG TOÁN HỌC (khoá viết thường, nối bằng dấu gạch)
     ------------------------------------------------------------------------ */
  const g = (word, ipa, pos, vi, ctx, exEn, exVi) => ({ word, ipa, pos, vi, ctx, ex: { en: exEn, vi: exVi } });

  Object.assign(D.glossary, {
    'linear-equation': g('linear equation', '/ˈlɪn.i.ə ɪˈkweɪ.ʒən/', 'n', 'phương trình bậc nhất',
      'Trong Toán: Phương trình mà các ẩn chỉ có bậc 1, như ax + by = c.',
      'The equation 2x + y = 5 is a linear equation in two unknowns.', 'Phương trình 2x + y = 5 là phương trình bậc nhất hai ẩn.'),
    'system-of-linear-equations': g('system of linear equations', '/ˈsɪs.təm əv ˈlɪn.i.ə ɪˈkweɪ.ʒənz/', 'n', 'hệ phương trình bậc nhất',
      'Trong Toán: Hai hay nhiều phương trình bậc nhất được xét cùng lúc, cần tìm giá trị của ẩn thoả mãn tất cả.',
      'A system of linear equations can have one solution, none, or infinitely many.', 'Một hệ phương trình bậc nhất có thể có một nghiệm, vô nghiệm hoặc vô số nghiệm.'),
    unknown: g('unknown', '/ʌnˈnəʊn/', 'n', 'ẩn (số)',
      'Trong Toán: Đại lượng chưa biết, thường kí hiệu bằng x, y, cần đi tìm.',
      'In 2x + 3 = 9, x is the unknown.', 'Trong 2x + 3 = 9, x là ẩn.'),
    equation: g('equation', '/ɪˈkweɪ.ʒən/', 'n', 'phương trình',
      'Trong Toán: Đẳng thức có chứa ẩn; giải phương trình là tìm giá trị của ẩn làm hai vế bằng nhau.',
      'Solve the equation to find x.', 'Hãy giải phương trình để tìm x.'),
    solution: g('solution', '/səˈluː.ʃən/', 'n', 'nghiệm; lời giải',
      'Trong Toán: Giá trị (hoặc cặp giá trị) của ẩn làm cho phương trình đúng. Cũng có nghĩa là lời giải của bài toán.',
      'The pair (2; 1) is a solution of the system.', 'Cặp số (2; 1) là một nghiệm của hệ.'),
    'common-solution': g('common solution', '/ˈkɒm.ən səˈluː.ʃən/', 'n', 'nghiệm chung',
      'Trong Toán: Cặp số đồng thời là nghiệm của cả hai phương trình trong hệ.',
      'A solution of the system is a common solution of both equations.', 'Nghiệm của hệ là nghiệm chung của cả hai phương trình.'),
    'ordered-pair': g('ordered pair', '/ˈɔː.dəd peə/', 'n', 'cặp số (có thứ tự)',
      'Trong Toán: Hai số viết theo thứ tự, như (x; y). Thứ tự đổi thì cặp số khác đi.',
      '(1; 2) and (2; 1) are different ordered pairs.', '(1; 2) và (2; 1) là hai cặp số khác nhau.'),
    coefficient: g('coefficient', '/ˌkəʊ.ɪˈfɪʃ.ənt/', 'n', 'hệ số',
      'Trong Toán: Số đứng nhân với ẩn; trong 3x + 2y = 7, các hệ số là 3 và 2.',
      'The coefficient of y in 3x + 2y = 7 is 2.', 'Hệ số của y trong 3x + 2y = 7 là 2.'),
    'substitution-method': g('substitution method', '/ˌsʌb.stɪˈtjuː.ʃən ˈmeθ.əd/', 'n', 'phương pháp thế',
      'Trong Toán: Cách giải hệ phương trình bằng việc biểu diễn một ẩn theo ẩn kia rồi thế vào phương trình còn lại.',
      'Use the substitution method to solve the system.', 'Hãy dùng phương pháp thế để giải hệ phương trình.'),
    'elimination-method': g('elimination method', '/ɪˌlɪm.ɪˈneɪ.ʃən ˈmeθ.əd/', 'n', 'phương pháp cộng đại số',
      'Trong Toán: Cách giải hệ bằng việc cộng hoặc trừ từng vế hai phương trình để làm mất một ẩn. Còn gọi là addition method.',
      'The elimination method removes one unknown by adding the equations.', 'Phương pháp cộng đại số làm mất một ẩn bằng cách cộng các phương trình.'),
    substitute: g('substitute', '/ˈsʌb.stɪ.tʃuːt/', 'v', 'thế vào',
      'Trong Toán: Thay một biểu thức hay một giá trị vào chỗ của ẩn.',
      'Substitute y = 2x − 3 into the second equation.', 'Thế y = 2x − 3 vào phương trình thứ hai.'),
    express: g('express', '/ɪkˈspres/', 'v', 'biểu diễn',
      'Trong Toán: Viết một đại lượng theo các đại lượng khác, như y theo x.',
      'Express y in terms of x.', 'Hãy biểu diễn y theo x.'),
    variable: g('variable', '/ˈveə.ri.ə.bəl/', 'n', 'biến (số)',
      'Trong Toán: Kí hiệu như x, y có thể nhận nhiều giá trị khác nhau.',
      'The expression has two variables, x and y.', 'Biểu thức có hai biến là x và y.'),
    'no-solution': g('no solution', '/nəʊ səˈluː.ʃən/', 'n', 'vô nghiệm',
      'Trong Toán: Không có giá trị nào của ẩn thoả mãn hệ thức.',
      'The system has no solution.', 'Hệ phương trình vô nghiệm.'),
    'infinitely-many': g('infinitely many', '/ˈɪn.fɪ.nət.li ˈmen.i/', 'adj', 'vô số',
      'Trong Toán: Nhiều đến mức không đếm hết được.',
      'The equation has infinitely many solutions.', 'Phương trình có vô số nghiệm.'),
    'straight-line': g('straight line', '/streɪt laɪn/', 'n', 'đường thẳng',
      'Trong Toán: Đường không cong; các nghiệm của ax + by = c tạo thành một đường thẳng.',
      'Draw a straight line through A and B.', 'Hãy vẽ đường thẳng đi qua A và B.'),
    'coordinate-plane': g('coordinate plane', '/kəʊˈɔː.dɪ.nət pleɪn/', 'n', 'mặt phẳng toạ độ',
      'Trong Toán: Mặt phẳng có hai trục Ox, Oy để xác định vị trí các điểm.',
      'Plot the point on the coordinate plane.', 'Hãy biểu diễn điểm trên mặt phẳng toạ độ.'),
    intersection: g('intersection', '/ˌɪn.təˈsek.ʃən/', 'n', 'giao điểm',
      'Trong Toán: Điểm chung của hai đường, như hai đường thẳng cắt nhau.',
      'The intersection of the two lines is M(1; 2).', 'Giao điểm của hai đường thẳng là M(1; 2).'),
    calculator: g('calculator', '/ˈkæl.kjə.leɪ.tə/', 'n', 'máy tính (cầm tay)',
      'Trong Toán: Thiết bị dùng để tính toán, giải hệ phương trình nhanh.',
      'Use a calculator to check your answer.', 'Hãy dùng máy tính cầm tay để kiểm tra kết quả.'),
    condition: g('condition', '/kənˈdɪʃ.ən/', 'n', 'điều kiện',
      'Trong Toán: Yêu cầu mà giá trị của ẩn phải thoả mãn, như x > 0.',
      'Check that the solution meets the condition.', 'Hãy kiểm tra nghiệm có thoả mãn điều kiện không.'),
    'natural-number': g('natural number', '/ˈnætʃ.rəl ˈnʌm.bə/', 'n', 'số tự nhiên',
      'Trong Toán: Các số 0, 1, 2, 3, …',
      '294 and 712 are natural numbers.', '294 và 712 là các số tự nhiên.'),
    quotient: g('quotient', '/ˈkwəʊ.ʃənt/', 'n', 'thương (của phép chia)',
      'Trong Toán: Kết quả của phép chia.',
      'The quotient of 10 divided by 2 is 5.', 'Thương của 10 chia 2 là 5.'),
    remainder: g('remainder', '/rɪˈmeɪn.də/', 'n', 'số dư',
      'Trong Toán: Phần còn lại khi phép chia không hết.',
      'When 7 is divided by 2, the remainder is 1.', 'Khi chia 7 cho 2, số dư là 1.'),
    fraction: g('fraction', '/ˈfræk.ʃən/', 'n', 'phân số',
      'Trong Toán: Số viết dưới dạng a/b; công việc mỗi ngày làm được thường là một phân số.',
      'Each team does a fraction of the job every day.', 'Mỗi đội làm được một phần công việc mỗi ngày.'),
    'word-problem': g('word problem', '/wɜːd ˈprɒb.ləm/', 'n', 'bài toán có lời văn',
      'Trong Toán: Bài toán cho bằng lời, cần chuyển thành phương trình hay hệ phương trình để giải.',
      'Set up a system of equations to solve the word problem.', 'Hãy lập hệ phương trình để giải bài toán có lời văn.')
  });

  /* ------------------------------------------------------------------------
     HÀM TẠO KHỐI (cho gọn khi viết nội dung)
     ------------------------------------------------------------------------ */
  const p = (vi, en, extra) => Object.assign({ t: 'p', vi, en }, extra);
  const m = (tex, label) => ({ t: 'math', tex, label });
  /* Hệ phương trình hiển thị riêng một dòng: sys('x+y=17', '10x+3y=100') */
  const sys = (rows, label) => m('\\begin{cases}' + rows.join(' \\\\ ') + '\\end{cases}', label);
  const h2 = (n, vi, en) => ({ t: 'h2', n, vi, en });
  const h3 = (vi, en) => ({ t: 'h3', vi, en });
  const tip = (...items) => ({ t: 'tip', items });
  const key = (blocks, title) => ({ t: 'key', title, blocks });
  const steps = (items) => ({ t: 'steps', items });
  const st = (n, vi, en, math) => ({ label: { vi: 'Bước ' + n, en: 'Step ' + n }, vi, en, math });
  const ex = (no, body, solution) => ({ t: 'ex', kind: 'example', no, body, solution });
  const lt = (no, body) => ({ t: 'ex', kind: 'practice', no, body });
  const vd = (no, body) => ({ t: 'ex', kind: 'apply', no, body });
  const table = (rows, math) => ({ t: 'table', rows, math });

  /* ========================================================================
     BÀI 1. KHÁI NIỆM PHƯƠNG TRÌNH VÀ HỆ HAI PHƯƠNG TRÌNH BẬC NHẤT HAI ẨN
     ======================================================================== */
  const topic = {
    label: 'Chương', labelEn: 'Chapter', number: 'I',
    vi: 'Phương trình và hệ hai phương trình bậc nhất hai ẩn',
    en: 'Equations and systems of two linear equations in two unknowns'
  };

  D.lessons['toan9-bai1'] = {
    gradeId: 9,
    number: '1',
    book: 'Toán 9',
    title: { vi: 'Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn', en: 'Linear equations and systems of two linear equations in two unknowns' },
    topic,
    spreadLabels: [
      'Mở đầu và phương trình bậc nhất hai ẩn',
      'Ví dụ về nghiệm của phương trình',
      'Hệ hai phương trình bậc nhất hai ẩn'
    ],
    pages: [
      /* ------------------------------------------------------------ Trang 5 */
      {
        number: 5,
        blocks: [
          { t: 'banner' },
          {
            t: 'goals',
            lead: { vi: 'Sau bài học này em sẽ:', en: 'After this lesson you will:' },
            items: [
              { vi: T`Nhận biết được phương trình bậc nhất hai ẩn và hệ hai phương trình bậc nhất hai ẩn.`, en: T`Recognise a {linear equation} and a {system of linear equations} in two {unknowns|unknown}.` },
              { vi: T`Nhận biết được nghiệm của phương trình và nghiệm của hệ hai phương trình bậc nhất hai ẩn.`, en: T`Recognise a {solution} of an {equation} and of a system of two equations.` }
            ]
          },
          p(T`Xét một bài toán dân gian: có 17 quả cam và quýt đem chia cho 100 người. Mỗi quả quýt được cắt làm 3 miếng, mỗi quả cam được cắt làm 10 miếng, và số miếng vừa đủ để mỗi người nhận một miếng. Hỏi có bao nhiêu quả mỗi loại?`,
            T`Consider an old folk puzzle: 17 oranges and tangerines are shared among 100 people. Each tangerine is cut into 3 pieces, each orange into 10 pieces, and the pieces are exactly enough for one piece per person. How many fruits of each kind are there?`, { badge: 'book' }),
          p(T`Bài toán có hai đại lượng chưa biết (số cam và số quýt). Liệu ta có giải được giống như cách lập một phương trình một ẩn không? Trước hết hãy tìm hiểu về phương trình và hệ hai phương trình bậc nhất hai ẩn.`,
            T`The puzzle has two {unknowns|unknown} (the number of oranges and of tangerines). Can we solve it the way we set up an {equation} with one unknown? First, let us study linear equations and systems of two linear equations.`),
          h2('1', 'Phương trình bậc nhất hai ẩn', 'Linear equations in two unknowns'),
          {
            t: 'activity', no: 1,
            title: { vi: 'Khái niệm phương trình bậc nhất hai ẩn', en: 'The idea of a linear equation in two unknowns' },
            vi: T`Gọi $x$ là số cam, $y$ là số quýt ($x$, $y$ là số nguyên dương nhỏ hơn 17).`,
            en: T`Let $x$ be the number of oranges and $y$ the number of tangerines ($x$ and $y$ are positive integers less than 17).`,
            style: 'num',
            items: [
              { vi: T`Tổng số cam và quýt là 17. Hãy viết một hệ thức giữa hai biến $x$ và $y$.`, en: T`The oranges and tangerines add up to 17. Write a relation between the two {variables|variable} $x$ and $y$.` },
              { vi: T`Mỗi quả cam cắt 10 miếng, mỗi quả quýt cắt 3 miếng, tổng cộng 100 miếng. Hãy viết hệ thức tương ứng.`, en: T`Each orange gives 10 pieces and each tangerine 3, making 100 pieces in all. Write the matching relation.` }
            ]
          },
          p(T`Hai hệ thức vừa viết, $x+y=17$ và $10x+3y=100$, là những ví dụ về phương trình bậc nhất hai ẩn.`,
            T`The two relations you just wrote, $x+y=17$ and $10x+3y=100$, are examples of linear equations in two unknowns.`),
          key([
            p(T`**Phương trình bậc nhất hai ẩn** $x$ và $y$ là hệ thức có dạng`, T`A **{linear equation} in two {unknowns|unknown}** $x$ and $y$ is a relation of the form`),
            m(T`ax+by=c`, '(1)'),
            p(T`trong đó $a$, $b$, $c$ là các số đã biết, và ít nhất một trong hai số $a$, $b$ khác 0 (tức là $a\ne 0$ hoặc $b\ne 0$).`,
              T`where $a$, $b$, $c$ are given numbers and at least one of $a$, $b$ is not zero (that is, $a\ne 0$ or $b\ne 0$). Here $a$ and $b$ are the {coefficients|coefficient}.`),
            p(T`Nếu thay $x=x_0$, $y=y_0$ vào mà $ax_0+by_0=c$ là một khẳng định đúng thì cặp số $(x_0;\,y_0)$ gọi là một **nghiệm** của phương trình (1).`,
              T`If putting $x=x_0$ and $y=y_0$ makes $ax_0+by_0=c$ a true statement, the {ordered pair} $(x_0;\,y_0)$ is called a **{solution}** of equation (1).`)
          ])
        ]
      },

      /* ------------------------------------------------------------ Trang 6 */
      {
        number: 6,
        blocks: [
          ex(1, [
            p(T`a) Trong các hệ thức $4x+3y=5$; $0x+y=-1$; $0x+0y=3$, hệ thức nào là phương trình bậc nhất hai ẩn, hệ thức nào không phải?`,
              T`a) Among the relations $4x+3y=5$; $0x+y=-1$; $0x+0y=3$, which are linear equations in two unknowns and which are not?`),
            p(T`b) Trong hai cặp số $(2;\,-1)$ và $(1;\,0)$, cặp nào là nghiệm của phương trình $4x+3y=5$?`,
              T`b) Of the pairs $(2;\,-1)$ and $(1;\,0)$, which is a {solution} of $4x+3y=5$?`)
          ], [
            p(T`a) Cả ba hệ thức đều có dạng $ax+by=c$. Nhưng chỉ $4x+3y=5$ và $0x+y=-1$ có $a\ne 0$ hoặc $b\ne 0$, nên chúng là phương trình bậc nhất hai ẩn. Hệ thức $0x+0y=3$ có $a=b=0$ nên không phải.`,
              T`a) All three have the form $ax+by=c$. But only $4x+3y=5$ and $0x+y=-1$ satisfy $a\ne 0$ or $b\ne 0$, so they are linear equations. The relation $0x+0y=3$ has $a=b=0$, so it is not.`),
            p(T`b) $(2;\,-1)$ là nghiệm vì $4\cdot 2+3\cdot(-1)=5$.`, T`b) $(2;\,-1)$ is a {solution} because $4\cdot 2+3\cdot(-1)=5$.`),
            p(T`$(1;\,0)$ *không* là nghiệm vì $4\cdot 1+3\cdot 0=4\ne 5$.`, T`$(1;\,0)$ is *not* a solution because $4\cdot 1+3\cdot 0=4\ne 5$.`)
          ]),
          lt(1, [p(T`Hãy viết một phương trình bậc nhất hai ẩn và chỉ ra một nghiệm của nó.`, T`Write a {linear equation} in two {unknowns|unknown} and give one of its solutions.`)]),
          ex(2, [
            p(T`Giả sử $(x;\,y)$ là nghiệm của phương trình bậc nhất hai ẩn $x+2y=5$.`, T`Suppose $(x;\,y)$ is a {solution} of the linear equation $x+2y=5$.`),
            p(T`a) Hoàn thành bảng sau, từ đó suy ra 5 nghiệm của phương trình.`, T`a) Complete the table below, and so find 5 solutions of the equation.`),
            table([['x', '-2', '-1', '0', '?', '?'], ['y', '?', '?', '?', '1', '2']], true),
            p(T`b) Biểu diễn $y$ theo $x$. Từ đó cho biết phương trình có bao nhiêu nghiệm?`, T`b) {Express|express} $y$ in terms of $x$. How many solutions does the equation have?`)
          ], [
            p(T`a) Ta có bảng:`, T`a) The table is:`),
            table([['x', '-2', '-1', '0', '3', '1'], ['y', '\\frac{7}{2}', '3', '\\frac{5}{2}', '1', '2']], true),
            p(T`Vậy 5 nghiệm là $\left(-2;\,\frac{7}{2}\right)$, $(-1;\,3)$, $\left(0;\,\frac{5}{2}\right)$, $(3;\,1)$, $(1;\,2)$.`,
              T`So five solutions are $\left(-2;\,\frac{7}{2}\right)$, $(-1;\,3)$, $\left(0;\,\frac{5}{2}\right)$, $(3;\,1)$, $(1;\,2)$.`),
            p(T`b) Ta có $y=\frac{5-x}{2}$. Với mỗi giá trị tuỳ ý của $x$ ta luôn tính được một giá trị $y$ tương ứng, nên phương trình có vô số nghiệm.`,
              T`b) We have $y=\frac{5-x}{2}$. For any value of $x$ we can always find a matching $y$, so the equation has {infinitely many|infinitely-many} solutions.`)
          ]),
          tip({
            vi: T`**Chú ý.** Mỗi phương trình bậc nhất hai ẩn đều có vô số nghiệm. Ví dụ tiếp theo cho thấy cách viết các nghiệm và biểu diễn chúng trên hình.`,
            en: T`**Note.** Every linear equation in two unknowns has {infinitely many|infinitely-many} solutions. The next example shows how to write them and show them in a picture.`
          })
        ]
      },

      /* ------------------------------------------------------------ Trang 7 */
      {
        number: 7,
        blocks: [
          ex(3, [
            p(T`Viết nghiệm và biểu diễn hình học tất cả các nghiệm của mỗi phương trình: a) $x+2y=3$; b) $0x+y=-2$; c) $x+0y=3$.`,
              T`Write the solutions, and show them geometrically, for each equation: a) $x+2y=3$; b) $0x+y=-2$; c) $x+0y=3$.`)
          ], [
            p(T`a) Viết $x+2y=3$ thành $y=-0{,}5x+1{,}5$. Mỗi cặp $(x;\,-0{,}5x+1{,}5)$ với $x\in\mathbb{R}$ tuỳ ý là một nghiệm. Đó là toạ độ các điểm của đường thẳng $d: x+2y=3$. Để vẽ $d$ chỉ cần hai điểm, chẳng hạn $A(0;\,1{,}5)$ và $B(3;\,0)$.`,
              T`a) Write $x+2y=3$ as $y=-0.5x+1.5$. Every pair $(x;\,-0.5x+1.5)$ with any $x\in\mathbb{R}$ is a {solution}. These are the coordinates of the points on the {straight line} $d: x+2y=3$. To draw $d$ you only need two points, for example $A(0;\,1.5)$ and $B(3;\,0)$.`),
            p(T`b) $0x+y=-2$ viết gọn là $y=-2$. Nghiệm là $(x;\,-2)$ với $x\in\mathbb{R}$ tuỳ ý: các điểm của đường thẳng song song với trục hoành, cắt trục tung tại $(0;\,-2)$.`,
              T`b) $0x+y=-2$ is simply $y=-2$. The solutions are $(x;\,-2)$ for any $x\in\mathbb{R}$: the points of the line parallel to the horizontal axis that crosses the vertical axis at $(0;\,-2)$.`),
            p(T`c) $x+0y=3$ viết gọn là $x=3$. Nghiệm là $(3;\,y)$ với $y\in\mathbb{R}$ tuỳ ý: các điểm của đường thẳng song song với trục tung, cắt trục hoành tại $(3;\,0)$.`,
              T`c) $x+0y=3$ is simply $x=3$. The solutions are $(3;\,y)$ for any $y\in\mathbb{R}$: the points of the line parallel to the vertical axis that crosses the horizontal axis at $(3;\,0)$.`)
          ]),
          tip({
            vi: T`**Nhận xét.** Trong mặt phẳng toạ độ, tập hợp các điểm có toạ độ $(x;\,y)$ thoả mãn phương trình $ax+by=c$ là một đường thẳng, gọi là *đường thẳng* $ax+by=c$.`,
            en: T`**Remark.** In the {coordinate plane}, the set of points $(x;\,y)$ that satisfy $ax+by=c$ is a {straight line}, called the *line* $ax+by=c$.`
          }),
          lt(2, [
            p(T`Viết nghiệm và biểu diễn hình học tất cả các nghiệm của mỗi phương trình: a) $2x-3y=5$; b) $0x+y=3$; c) $x+0y=-2$.`,
              T`Write the solutions, and show them geometrically, for each equation: a) $2x-3y=5$; b) $0x+y=3$; c) $x+0y=-2$.`)
          ]),
          h2('2', 'Hệ hai phương trình bậc nhất hai ẩn', 'Systems of two linear equations in two unknowns'),
          p(T`**Khái niệm hệ hai phương trình bậc nhất hai ẩn và nghiệm của nó.** Ở bài toán mở đầu ta có hai phương trình $x+y=17$ và $10x+3y=100$. Muốn giải bài toán, cần tìm các giá trị của $x$ và $y$ thoả mãn đồng thời cả hai phương trình. Khi đó ta có hệ phương trình`,
            T`**The idea of a system of two linear equations and its solution.** In the opening puzzle we have two equations, $x+y=17$ and $10x+3y=100$. To solve it we must find values of $x$ and $y$ that satisfy both at once. Then we have the system`, { badge: 'book' }),
          sys(['x+y=17', '10x+3y=100'])
        ]
      },

      /* ------------------------------------------------------------ Trang 8 */
      {
        number: 8,
        blocks: [
          key([
            p(T`1. Một cặp gồm hai phương trình bậc nhất hai ẩn $ax+by=c$ và $a'x+b'y=c'$ gọi là một **hệ hai phương trình bậc nhất hai ẩn**. Ta thường viết:`,
              T`1. A pair of linear equations $ax+by=c$ and $a'x+b'y=c'$ is called a **system of two linear equations in two {unknowns|unknown}**. We usually write:`),
            sys(['ax+by=c', "a'x+b'y=c'"], '(*)'),
            p(T`2. Cặp số $(x_0;\,y_0)$ là một **nghiệm** của hệ (*) nếu nó đồng thời là nghiệm của cả hai phương trình của hệ.`,
              T`2. An {ordered pair} $(x_0;\,y_0)$ is a **{solution}** of system (*) if it is a solution of both equations at the same time.`)
          ]),
          tip({
            vi: T`Mỗi nghiệm của hệ (*) chính là một *nghiệm chung* của hai phương trình trong hệ.`,
            en: T`Each solution of system (*) is a *{common solution}* of the two equations in the system.`
          }),
          ex(4, [
            p(T`Trong các hệ sau, hệ nào *không* phải là hệ hai phương trình bậc nhất hai ẩn? Vì sao?`, T`Which of these systems is *not* a system of two linear equations in two unknowns? Why?`),
            p(T`a) $\begin{cases} 2x=-6 \\ 5x+4y=1 \end{cases}$   b) $\begin{cases} x+2y=-3 \\ 0x+0y=1 \end{cases}$   c) $\begin{cases} 3x-y=1 \\ x+y=3 \end{cases}$`,
              T`a) $\begin{cases} 2x=-6 \\ 5x+4y=1 \end{cases}$   b) $\begin{cases} x+2y=-3 \\ 0x+0y=1 \end{cases}$   c) $\begin{cases} 3x-y=1 \\ x+y=3 \end{cases}$`)
          ], [
            p(T`Hệ b) không phải, vì phương trình thứ hai $0x+0y=1$ không là phương trình bậc nhất hai ẩn (cả hai hệ số đều bằng 0).`,
              T`System b) is not, because its second equation $0x+0y=1$ is not a linear equation in two unknowns (both {coefficients|coefficient} are zero).`)
          ]),
          ex(5, [
            p(T`Giải thích vì sao cặp số $(1;\,2)$ là một nghiệm của hệ $\begin{cases} 2x-y=0 \\ x+y=3 \end{cases}$`,
              T`Explain why the pair $(1;\,2)$ is a {solution} of the system $\begin{cases} 2x-y=0 \\ x+y=3 \end{cases}$`)
          ], [
            p(T`Khi $x=1$ và $y=2$:`, T`When $x=1$ and $y=2$:`),
            p(T`• $2x-y=2\cdot 1-2=0$, nên $(1;\,2)$ là nghiệm của phương trình thứ nhất;`, T`• $2x-y=2\cdot 1-2=0$, so $(1;\,2)$ is a solution of the first equation;`),
            p(T`• $x+y=1+2=3$, nên $(1;\,2)$ là nghiệm của phương trình thứ hai.`, T`• $x+y=1+2=3$, so $(1;\,2)$ is a solution of the second equation.`),
            p(T`Vậy $(1;\,2)$ là nghiệm chung của hai phương trình, tức là một nghiệm của hệ.`, T`So $(1;\,2)$ is a {common solution} of both equations, that is, a solution of the system.`)
          ]),
          tip({
            vi: T`**Chú ý.** Trong Ví dụ 5, $M(1;\,2)$ vừa thuộc đường thẳng $d_1: 2x-y=0$, vừa thuộc đường thẳng $d_2: x+y=3$. Vậy $M$ là giao điểm của hai đường thẳng.`,
            en: T`**Note.** In Example 5, the point $M(1;\,2)$ lies on the line $d_1: 2x-y=0$ and on the line $d_2: x+y=3$. So $M$ is the {intersection} of the two lines.`
          })
        ]
      },

      /* ------------------------------------------------------------ Trang 9 */
      {
        number: 9,
        blocks: [
          lt(3, [
            p(T`Trong hai cặp số $(0;\,-2)$ và $(2;\,-1)$, cặp nào là nghiệm của hệ $\begin{cases} x-2y=4 \\ 4x+3y=5 \end{cases}$ ?`,
              T`Of the pairs $(0;\,-2)$ and $(2;\,-1)$, which is a {solution} of the system $\begin{cases} x-2y=4 \\ 4x+3y=5 \end{cases}$ ?`)
          ]),
          vd(1, [
            p(T`Xét bài toán dân gian ở phần mở đầu. Gọi $x$ là số cam, $y$ là số quýt ($x,\,y\in\mathbb{N}^*$). Ta có hệ`,
              T`Go back to the folk puzzle. Let $x$ be the number of oranges and $y$ the number of tangerines ($x,\,y\in\mathbb{N}^*$). We get the system`),
            sys(['x+y=17', '10x+3y=100']),
            p(T`Trong hai cặp số $(10;\,7)$ và $(7;\,10)$, cặp nào là nghiệm của hệ trên? Từ đó cho biết một phương án về số cam và số quýt thoả mãn bài toán.`,
              T`Of the pairs $(10;\,7)$ and $(7;\,10)$, which is a solution of this system? Hence give one possible answer for the number of oranges and tangerines.`)
          ])
        ]
      }
    ]
  };

  /* ========================================================================
     BÀI 2. GIẢI HỆ HAI PHƯƠNG TRÌNH BẬC NHẤT HAI ẨN
     ======================================================================== */
  D.lessons['toan9-bai2'] = {
    gradeId: 9,
    number: '2',
    book: 'Toán 9',
    title: { vi: 'Giải hệ hai phương trình bậc nhất hai ẩn', en: 'Solving a system of two linear equations in two unknowns' },
    topic,
    spreadLabels: [
      'Mở đầu và phương pháp thế',
      'Luyện tập và phương pháp cộng đại số',
      'Cộng đại số và máy tính cầm tay',
      'Vận dụng và em có biết'
    ],
    pages: [
      /* ----------------------------------------------------------- Trang 11 */
      {
        number: 11,
        blocks: [
          { t: 'banner' },
          {
            t: 'goals',
            lead: { vi: 'Sau bài học này em sẽ:', en: 'After this lesson you will:' },
            items: [
              { vi: T`Hiểu hai cách giải: *phương pháp thế* và *phương pháp cộng đại số*.`, en: T`Understand two ways to solve a system: the {substitution method} and the {elimination method}.` },
              { vi: T`Giải được hệ hai phương trình bậc nhất hai ẩn bằng một trong hai phương pháp đó hoặc bằng máy tính cầm tay.`, en: T`Solve a system of two linear equations by either method, or with a {calculator}.` }
            ]
          },
          p(T`Một mảnh vườn chia thành nhiều luống, mỗi luống trồng cùng một số cây cải bắp. Hãy tính số cây cải bắp trồng trên mảnh vườn, biết rằng: nếu thêm 8 luống nhưng mỗi luống trồng ít đi 3 cây thì cả vườn ít hơn 108 cây; nếu bớt 4 luống nhưng mỗi luống trồng thêm 2 cây thì cả vườn nhiều hơn 64 cây.`,
            T`A garden is divided into beds, and every bed holds the same number of cabbages. Find how many cabbages are planted in the garden, given that: with 8 more beds but 3 fewer cabbages in each bed, the garden has 108 fewer cabbages; with 4 fewer beds but 2 more cabbages in each bed, it has 64 more.`, { badge: 'book' }),
          h2('1', 'Phương pháp thế', 'The substitution method'),
          {
            t: 'activity', no: 1,
            title: { vi: 'Làm quen với phương pháp thế', en: 'Getting to know the substitution method' },
            vi: T`Cho hệ phương trình $\begin{cases} x+y=3 \\ 2x-3y=1 \end{cases}$. Hãy giải hệ theo hướng dẫn:`,
            en: T`Take the system $\begin{cases} x+y=3 \\ 2x-3y=1 \end{cases}$. Solve it by following these hints:`,
            style: 'num',
            items: [
              { vi: T`Từ phương trình thứ nhất, biểu diễn $y$ theo $x$, rồi thế vào phương trình thứ hai để được phương trình một ẩn $x$. Giải phương trình đó để tìm $x$.`, en: T`From the first equation {express} $y$ in terms of $x$, then {substitute} into the second equation to get an equation in $x$ only. Solve it to find $x$.` },
              { vi: T`Dùng giá trị $x$ vừa tìm để tính $y$, rồi viết nghiệm của hệ.`, en: T`Use the value of $x$ to find $y$, and write down the {solution} of the system.` }
            ]
          },
          key([
            steps([
              st(1, T`Từ một phương trình của hệ, biểu diễn một ẩn theo ẩn kia, rồi thế vào phương trình còn lại để được phương trình chỉ còn một ẩn.`,
                T`From one equation, {express} one unknown in terms of the other, then {substitute} it into the other equation to get an equation with one unknown.`),
              st(2, T`Giải phương trình một ẩn vừa nhận được, từ đó suy ra nghiệm của hệ đã cho.`,
                T`Solve that one-unknown equation, and from it find the {solution} of the given system.`)
            ])
          ], { vi: 'Cách giải hệ phương trình bằng phương pháp thế', en: 'Solving a system by substitution' }),
          ex(1, [
            p(T`Giải hệ $\begin{cases} 2x-y=3 \\ x+2y=4 \end{cases}$ bằng phương pháp thế.`, T`Solve $\begin{cases} 2x-y=3 \\ x+2y=4 \end{cases}$ by {substitution|substitution-method}.`)
          ], [
            p(T`Từ phương trình thứ nhất ta có $y=2x-3$. Thế vào phương trình thứ hai: $x+2(2x-3)=4$, hay $5x-6=4$, suy ra $x=2$.`,
              T`From the first equation, $y=2x-3$. Substituting into the second: $x+2(2x-3)=4$, that is $5x-6=4$, so $x=2$.`),
            p(T`Từ đó $y=2\cdot 2-3=1$. Vậy hệ có nghiệm là $(2;\,1)$.`, T`Then $y=2\cdot 2-3=1$. So the system has the {solution} $(2;\,1)$.`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 12 */
      {
        number: 12,
        blocks: [
          lt(1, [
            p(T`Giải các hệ sau bằng phương pháp thế: a) $\begin{cases} x-3y=2 \\ -2x+5y=1 \end{cases}$   b) $\begin{cases} 4x+y=-1 \\ 7x+2y=-3 \end{cases}$`,
              T`Solve by substitution: a) $\begin{cases} x-3y=2 \\ -2x+5y=1 \end{cases}$   b) $\begin{cases} 4x+y=-1 \\ 7x+2y=-3 \end{cases}$`)
          ]),
          tip({
            vi: T`Tuỳ theo hệ, ta chọn biểu diễn $x$ theo $y$ hoặc $y$ theo $x$ cho tiện tính.`,
            en: T`Depending on the system, we may {express} $x$ in terms of $y$ or $y$ in terms of $x$, whichever is easier.`
          }),
          ex(2, [
            p(T`Giải hệ $\begin{cases} x-y=-2 \\ 2x-2y=8 \end{cases}$ bằng phương pháp thế.`, T`Solve $\begin{cases} x-y=-2 \\ 2x-2y=8 \end{cases}$ by substitution.`)
          ], [
            p(T`Từ phương trình thứ nhất, $x=y-2$. Thế vào phương trình thứ hai: $2(y-2)-2y=8$, hay $0y-4=8$. (1)`,
              T`From the first equation, $x=y-2$. Substituting into the second: $2(y-2)-2y=8$, that is $0y-4=8$. (1)`),
            p(T`Không có giá trị nào của $y$ thoả mãn (1), nên hệ đã cho **vô nghiệm**.`, T`No value of $y$ satisfies (1), so the system has **{no solution|no-solution}**.`)
          ]),
          lt(2, [p(T`Giải hệ $\begin{cases} -2x+y=3 \\ 4x-2y=-4 \end{cases}$ bằng phương pháp thế.`, T`Solve $\begin{cases} -2x+y=3 \\ 4x-2y=-4 \end{cases}$ by substitution.`)]),
          ex(3, [
            p(T`Giải hệ $\begin{cases} -x+y=-2 \\ 3x-3y=6 \end{cases}$ bằng phương pháp thế.`, T`Solve $\begin{cases} -x+y=-2 \\ 3x-3y=6 \end{cases}$ by substitution.`)
          ], [
            p(T`Từ phương trình thứ nhất, $y=x-2$. (2) Thế vào phương trình thứ hai: $3x-3(x-2)=6$, hay $0x=0$. (3)`,
              T`From the first equation, $y=x-2$. (2) Substituting into the second: $3x-3(x-2)=6$, that is $0x=0$. (3)`),
            p(T`Mọi giá trị của $x$ đều thoả mãn (3), và $y$ tính theo (2). Vậy hệ có **vô số nghiệm** dạng $(x;\,x-2)$ với $x\in\mathbb{R}$ tuỳ ý.`,
              T`Every value of $x$ satisfies (3), and $y$ follows from (2). So the system has **{infinitely many|infinitely-many} solutions** of the form $(x;\,x-2)$ with any $x\in\mathbb{R}$.`)
          ]),
          lt(3, [p(T`Giải hệ $\begin{cases} x+3y=-1 \\ 3x+9y=-3 \end{cases}$ bằng phương pháp thế.`, T`Solve $\begin{cases} x+3y=-1 \\ 3x+9y=-3 \end{cases}$ by substitution.`)]),
          vd(1, [
            p(T`Quay lại bài toán vườn cải bắp. Gọi $x$ là số luống, $y$ là số cây cải bắp ở mỗi luống ($x,\,y\in\mathbb{N}^*$).`,
              T`Back to the cabbage garden. Let $x$ be the number of beds and $y$ the number of cabbages in each bed ($x,\,y\in\mathbb{N}^*$).`),
            p(T`a) Lập hệ phương trình với hai ẩn $x$, $y$.  b) Giải hệ vừa lập để trả lời bài toán.`,
              T`a) Set up a system of equations in $x$ and $y$.  b) Solve it to answer the puzzle.`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 13 */
      {
        number: 13,
        blocks: [
          h2('2', 'Phương pháp cộng đại số', 'The addition (elimination) method'),
          {
            t: 'activity', no: 2,
            title: { vi: 'Làm quen với phương pháp cộng đại số', en: 'Getting to know the elimination method' },
            vi: T`Cho hệ $\begin{cases} 2x+2y=3 \\ x-2y=6 \end{cases}$. Hệ số của $y$ trong hai phương trình là hai số đối nhau (tổng bằng 0). Dựa vào đó, hãy giải hệ:`,
            en: T`Take the system $\begin{cases} 2x+2y=3 \\ x-2y=6 \end{cases}$. The {coefficients|coefficient} of $y$ in the two equations are opposite numbers (they add up to 0). Use this to solve it:`,
            style: 'num',
            items: [
              { vi: T`Cộng từng vế hai phương trình để được phương trình một ẩn $x$. Giải phương trình này để tìm $x$.`, en: T`Add the two equations side by side to get an equation in $x$ only. Solve it to find $x$.` },
              { vi: T`Thế giá trị $x$ vào một trong hai phương trình để tìm $y$, rồi viết nghiệm của hệ.`, en: T`{Substitute} the value of $x$ into either equation to find $y$, and write the {solution}.` }
            ]
          },
          key([
            p(T`Để giải hệ hai phương trình bậc nhất hai ẩn mà *hệ số của cùng một ẩn trong hai phương trình bằng nhau hoặc đối nhau*, ta làm như sau:`,
              T`To solve a system in which *the {coefficients|coefficient} of the same unknown in the two equations are equal or opposite*, do this:`),
            steps([
              st(1, T`Cộng hoặc trừ từng vế của hai phương trình để được phương trình chỉ còn một ẩn.`, T`Add or subtract the two equations side by side to get an equation with only one unknown.`),
              st(2, T`Giải phương trình một ẩn vừa nhận được, từ đó suy ra nghiệm của hệ đã cho.`, T`Solve that equation, and from it find the {solution} of the given system.`)
            ])
          ], { vi: 'Cách giải hệ phương trình bằng phương pháp cộng đại số', en: 'Solving a system by the elimination method' }),
          ex(4, [
            p(T`Giải hệ $\begin{cases} -2x+5y=12 \\ 2x+3y=4 \end{cases}$ bằng phương pháp cộng đại số.`, T`Solve $\begin{cases} -2x+5y=12 \\ 2x+3y=4 \end{cases}$ by the {elimination method}.`)
          ], [
            p(T`Cộng từng vế hai phương trình ta được $8y=16$, suy ra $y=2$.`, T`Adding the two equations side by side gives $8y=16$, so $y=2$.`),
            p(T`Thế $y=2$ vào phương trình thứ hai: $2x+3\cdot 2=4$, hay $2x=-2$, suy ra $x=-1$. Vậy hệ có nghiệm $(-1;\,2)$.`,
              T`Substituting $y=2$ into the second equation: $2x+3\cdot 2=4$, that is $2x=-2$, so $x=-1$. The solution is $(-1;\,2)$.`)
          ]),
          ex(5, [
            p(T`Giải hệ $\begin{cases} 5x-7y=9 \\ 5x-3y=1 \end{cases}$ bằng phương pháp cộng đại số.`, T`Solve $\begin{cases} 5x-7y=9 \\ 5x-3y=1 \end{cases}$ by the elimination method.`)
          ], [
            p(T`Trừ từng vế hai phương trình: $(5x-5x)+(-7y+3y)=9-1$, hay $-4y=8$, suy ra $y=-2$.`,
              T`Subtracting side by side: $(5x-5x)+(-7y+3y)=9-1$, that is $-4y=8$, so $y=-2$.`),
            p(T`Thế $y=-2$ vào phương trình thứ nhất: $5x-7\cdot(-2)=9$, hay $5x+14=9$, suy ra $x=-1$. Vậy hệ có nghiệm $(-1;\,-2)$.`,
              T`Substituting $y=-2$ into the first equation: $5x-7\cdot(-2)=9$, that is $5x+14=9$, so $x=-1$. The solution is $(-1;\,-2)$.`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 14 */
      {
        number: 14,
        blocks: [
          lt(4, [
            p(T`Giải các hệ sau bằng phương pháp cộng đại số: a) $\begin{cases} -4x+3y=0 \\ 4x-5y=-8 \end{cases}$   b) $\begin{cases} 4x+3y=0 \\ x+3y=9 \end{cases}$`,
              T`Solve by the elimination method: a) $\begin{cases} -4x+3y=0 \\ 4x-5y=-8 \end{cases}$   b) $\begin{cases} 4x+3y=0 \\ x+3y=9 \end{cases}$`)
          ]),
          tip({
            vi: T`**Chú ý.** Nếu hệ không có hai hệ số của cùng một ẩn bằng nhau hay đối nhau, ta nhân hai vế của mỗi phương trình với một số thích hợp (khác 0) để đưa về trường hợp đã xét.`,
            en: T`**Note.** If no unknown has equal or opposite {coefficients|coefficient} in the two equations, multiply both sides of each equation by a suitable non-zero number to reach the case above.`
          }),
          ex(6, [
            p(T`Giải hệ $\begin{cases} 3x+2y=7 \\ 2x-3y=-4 \end{cases}$ bằng phương pháp cộng đại số.`, T`Solve $\begin{cases} 3x+2y=7 \\ 2x-3y=-4 \end{cases}$ by the elimination method.`)
          ], [
            p(T`Nhân hai vế của phương trình thứ nhất với 3 và hai vế của phương trình thứ hai với 2, ta được:`,
              T`Multiply both sides of the first equation by 3 and both sides of the second by 2:`),
            sys(['9x+6y=21', '4x-6y=-8']),
            p(T`Cộng từng vế hai phương trình của hệ mới: $13x=13$, hay $x=1$.`, T`Adding the new equations side by side: $13x=13$, so $x=1$.`),
            p(T`Thế $x=1$ vào phương trình thứ nhất của hệ ban đầu: $3\cdot 1+2y=7$, suy ra $y=2$. Vậy hệ có nghiệm $(1;\,2)$.`,
              T`Substituting $x=1$ into the first original equation: $3\cdot 1+2y=7$, so $y=2$. The solution is $(1;\,2)$.`)
          ]),
          lt(5, [p(T`Giải hệ $\begin{cases} 4x+3y=6 \\ -5x+2y=4 \end{cases}$ bằng phương pháp cộng đại số.`, T`Solve $\begin{cases} 4x+3y=6 \\ -5x+2y=4 \end{cases}$ by the elimination method.`)]),
          ex(7, [
            p(T`Giải hệ $\begin{cases} 3x-5y=2 \\ -6x+10y=-4 \end{cases}$ bằng phương pháp cộng đại số.`, T`Solve $\begin{cases} 3x-5y=2 \\ -6x+10y=-4 \end{cases}$ by the elimination method.`)
          ], [
            p(T`Chia hai vế của phương trình thứ hai cho 2, ta được hệ $\begin{cases} 3x-5y=2 \\ -3x+5y=-2 \end{cases}$`,
              T`Divide both sides of the second equation by 2 to get $\begin{cases} 3x-5y=2 \\ -3x+5y=-2 \end{cases}$`),
            p(T`Cộng từng vế hai phương trình ta có $0x+0y=0$, hệ thức này đúng với mọi giá trị của $x$ và $y$. Với $x$ tuỳ ý, $y$ tính từ $3x-5y=2$, suy ra $y=\frac{3}{5}x-\frac{2}{5}$.`,
              T`Adding side by side gives $0x+0y=0$, which is true for all $x$ and $y$. For any $x$, $y$ comes from $3x-5y=2$, so $y=\frac{3}{5}x-\frac{2}{5}$.`),
            p(T`Vậy hệ có **vô số nghiệm** $\left(x;\,\frac{3}{5}x-\frac{2}{5}\right)$ với $x\in\mathbb{R}$.`,
              T`So the system has **{infinitely many|infinitely-many} solutions** $\left(x;\,\frac{3}{5}x-\frac{2}{5}\right)$ with $x\in\mathbb{R}$.`)
          ]),
          lt(6, [p(T`Giải hệ $\begin{cases} -0{,}5x+0{,}5y=1 \\ -2x+2y=8 \end{cases}$ bằng phương pháp cộng đại số.`, T`Solve $\begin{cases} -0.5x+0.5y=1 \\ -2x+2y=8 \end{cases}$ by the elimination method.`)])
        ]
      },

      /* ----------------------------------------------------------- Trang 15 */
      {
        number: 15,
        blocks: [
          h2('3', 'Sử dụng máy tính cầm tay để tìm nghiệm của hệ hai phương trình bậc nhất hai ẩn', 'Using a calculator to find the solution of a system'),
          key([
            p(T`Để tìm nghiệm bằng máy tính cầm tay (MTCT), ta cần dùng loại máy có chức năng này (thường có phím [[MODE]]). Trước hết, viết hệ cần giải dưới dạng`,
              T`To find the solution with a handheld {calculator}, use a model that has this function (it usually has a [[MODE]] key). First write the system in the form`),
            sys(['a_1x+b_1y=c_1', 'a_2x+b_2y=c_2']),
            p(T`Chẳng hạn, hệ $\begin{cases} 2x+3y-4=0 \\ 5x+6y-7=0 \end{cases}$ viết lại thành $\begin{cases} 2x+3y=4 \\ 5x+6y=7 \end{cases}$ Khi đó $a_1=2$, $b_1=3$, $c_1=4$; $a_2=5$, $b_2=6$, $c_2=7$. Lần lượt thực hiện các bước (với máy thích hợp):`,
              T`For example, $\begin{cases} 2x+3y-4=0 \\ 5x+6y-7=0 \end{cases}$ is rewritten as $\begin{cases} 2x+3y=4 \\ 5x+6y=7 \end{cases}$ Then $a_1=2$, $b_1=3$, $c_1=4$; $a_2=5$, $b_2=6$, $c_2=7$. Follow these steps (on a suitable model):`),
            steps([
              st(1, T`Vào chức năng giải hệ hai phương trình bậc nhất hai ẩn bằng cách bấm [[MODE]] [[5]] [[1]]. Con trỏ nằm ở vị trí $a_1$.`,
                T`Enter the function for systems of two linear equations by pressing [[MODE]] [[5]] [[1]]. The cursor sits at $a_1$.`),
              st(2, T`Nhập các số $a_1=2$, $b_1=3$, $c_1=4$; $a_2=5$, $b_2=6$, $c_2=7$ bằng cách bấm: [[2]] [[=]] [[3]] [[=]] [[4]] [[=]] [[5]] [[=]] [[6]] [[=]] [[7]] [[=]]`,
                T`Enter the numbers $a_1=2$, $b_1=3$, $c_1=4$; $a_2=5$, $b_2=6$, $c_2=7$ by pressing: [[2]] [[=]] [[3]] [[=]] [[4]] [[=]] [[5]] [[=]] [[6]] [[=]] [[7]] [[=]]`),
              st(3, T`Đọc kết quả: sau bước 2, bấm [[=]] màn hình cho $x=-1$; bấm tiếp [[=]] màn hình cho $y=2$. Nghiệm của hệ là $(-1;\,2)$.`,
                T`Read the result: after step 2, press [[=]] and the screen shows $x=-1$; press [[=]] again and it shows $y=2$. The {solution} is $(-1;\,2)$.`)
            ])
          ], { vi: 'Cách tìm nghiệm bằng máy tính cầm tay', en: 'Finding the solution with a handheld calculator' }),
          tip({
            vi: T`**Chú ý.** 1. Muốn xoá số vừa nhập, bấm [[AC]]; muốn sửa số đã nhập, di chuyển con trỏ đến vị trí đó rồi nhập số mới.`,
            en: T`**Notes.** 1. To clear the number you just typed, press [[AC]]; to change a number entered earlier, move the cursor there and type the new one.`
          }, {
            vi: T`2. Bấm phím [[▲]] hoặc [[▼]] để chuyển qua lại giữa giá trị của $x$ và $y$ trong kết quả.`,
            en: T`2. Press [[▲]] or [[▼]] to switch between the values of $x$ and $y$ in the result.`
          }, {
            vi: T`3. Nếu máy báo “Infinite Sol” thì hệ có vô số nghiệm; nếu báo “No-Solution” thì hệ vô nghiệm.`,
            en: T`3. If the screen says “Infinite Sol”, the system has {infinitely many|infinitely-many} solutions; if it says “No-Solution”, the system has no solution.`
          }),
          { t: 'ex', kind: 'hands', body: [
            p(T`Dùng MTCT thích hợp để tìm nghiệm của các hệ: a) $\begin{cases} 2x+3y=-4 \\ -3x-7y=13 \end{cases}$   b) $\begin{cases} 2x+3y=1 \\ -x-1{,}5y=1 \end{cases}$   c) $\begin{cases} 8x-2y-6=0 \\ 4x-y-3=0 \end{cases}$`,
              T`Use a suitable {calculator} to find the solution of each system: a) $\begin{cases} 2x+3y=-4 \\ -3x-7y=13 \end{cases}$   b) $\begin{cases} 2x+3y=1 \\ -x-1.5y=1 \end{cases}$   c) $\begin{cases} 8x-2y-6=0 \\ 4x-y-3=0 \end{cases}$`)
          ] }
        ]
      },

      /* ----------------------------------------------------------- Trang 16 */
      {
        number: 16,
        blocks: [
          vd(2, [
            p(T`Thực hiện lần lượt các yêu cầu sau để tính số mililít dung dịch acid HCl nồng độ 20% và số mililít dung dịch acid HCl nồng độ 5% cần dùng để pha 2 lít dung dịch acid HCl nồng độ 10%.`,
              T`Carry out the tasks in turn to find how many millilitres of 20% HCl acid solution and of 5% HCl acid solution are needed to make 2 litres of 10% HCl acid solution.`),
            p(T`a) Gọi $x$ là số mililít dung dịch 20%, $y$ là số mililít dung dịch 5% cần lấy. Hãy biểu diễn qua $x$ và $y$: thể tích dung dịch 10% nhận được sau khi trộn; tổng số mililít acid HCl nguyên chất có trong hai dung dịch.`,
              T`a) Let $x$ be the millilitres of the 20% solution and $y$ the millilitres of the 5% solution. {Express|express} in terms of $x$ and $y$: the volume of the 10% solution obtained after mixing; the total millilitres of pure HCl in the two solutions.`),
            p(T`b) Từ kết quả câu a, lập hệ hai phương trình bậc nhất với hai ẩn $x$, $y$ và giải hệ để tính số mililít cần lấy của mỗi dung dịch.`,
              T`b) From part a, set up a system of two linear equations in $x$ and $y$, and solve it to find how many millilitres of each solution are needed.`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 17 */
      {
        number: 17,
        blocks: [
          { t: 'head', kind: 'extra', vi: 'Em có biết? Giải hệ bằng phương pháp hình học', en: 'Did you know? Solving a system geometrically' },
          p(T`Mỗi nghiệm của một phương trình bậc nhất hai ẩn là một cặp số $(x_0;\,y_0)$, và có thể xem là toạ độ của một điểm trên mặt phẳng $Oxy$. Người ta đã chứng minh được: tập hợp các điểm có toạ độ thoả mãn $ax+by=c$ tạo thành một đường thẳng, kí hiệu $\Delta: ax+by=c$.`,
            T`Each {solution} of a linear equation in two unknowns is a pair $(x_0;\,y_0)$, which can be seen as the coordinates of a point in the plane $Oxy$. It has been proved that the points whose coordinates satisfy $ax+by=c$ form a {straight line}, written $\Delta: ax+by=c$.`),
          {
            t: 'list',
            items: [
              { vi: T`Khi $a\ne 0$ và $b\ne 0$: $\Delta$ trùng với đồ thị hàm số $y=-\frac{a}{b}x+\frac{c}{b}$.`, en: T`When $a\ne 0$ and $b\ne 0$: $\Delta$ is the graph of $y=-\frac{a}{b}x+\frac{c}{b}$.` },
              { vi: T`Khi $a=0$ và $b\ne 0$: phương trình đưa về $y=m$ (với $m=\frac{c}{b}$); $\Delta$ song song hoặc trùng với trục hoành.`, en: T`When $a=0$ and $b\ne 0$: the equation becomes $y=m$ (with $m=\frac{c}{b}$); $\Delta$ is parallel or equal to the horizontal axis.` },
              { vi: T`Khi $a\ne 0$ và $b=0$: phương trình đưa về $x=n$ (với $n=\frac{c}{a}$); $\Delta$ song song hoặc trùng với trục tung.`, en: T`When $a\ne 0$ and $b=0$: the equation becomes $x=n$ (with $n=\frac{c}{a}$); $\Delta$ is parallel or equal to the vertical axis.` }
            ]
          },
          p(T`Nghiệm chung của hệ (*) ứng với điểm chung của hai đường thẳng $\Delta: ax+by=c$ và $\Delta': a'x+b'y=c'$. Vì vậy chỉ có thể xảy ra 3 trường hợp:`,
            T`A {common solution} of system (*) matches a common point of the lines $\Delta: ax+by=c$ and $\Delta': a'x+b'y=c'$. So only three cases can occur:`),
          {
            t: 'olist', style: 'num',
            items: [
              { vi: T`$\Delta$ và $\Delta'$ cắt nhau (một điểm chung): hệ có một nghiệm duy nhất.`, en: T`$\Delta$ and $\Delta'$ cross (one common point): the system has exactly one {solution}.` },
              { vi: T`$\Delta$ và $\Delta'$ song song (không có điểm chung): hệ vô nghiệm.`, en: T`$\Delta$ and $\Delta'$ are parallel (no common point): the system has {no solution|no-solution}.` },
              { vi: T`$\Delta$ và $\Delta'$ trùng nhau (mọi điểm đều chung): hệ có vô số nghiệm.`, en: T`$\Delta$ and $\Delta'$ coincide (every point is common): the system has {infinitely many|infinitely-many} solutions.` }
            ]
          }
        ]
      }
    ]
  };

  /* ========================================================================
     BÀI 3. GIẢI BÀI TOÁN BẰNG CÁCH LẬP HỆ PHƯƠNG TRÌNH
     ======================================================================== */
  D.lessons['toan9-bai3'] = {
    gradeId: 9,
    number: '3',
    book: 'Toán 9',
    title: { vi: 'Giải bài toán bằng cách lập hệ phương trình', en: 'Solving word problems by setting up a system of equations' },
    topic,
    spreadLabels: [
      'Ba bước lập hệ phương trình',
      'Bài toán làm chung, làm riêng'
    ],
    pages: [
      /* ----------------------------------------------------------- Trang 21 */
      {
        number: 21,
        blocks: [
          { t: 'banner' },
          {
            t: 'goals',
            lead: { vi: 'Sau bài học này em sẽ:', en: 'After this lesson you will:' },
            items: [
              { vi: T`Giải được một số bài toán bằng cách lập hệ phương trình bậc nhất hai ẩn.`, en: T`Solve some {word problems|word-problem} by setting up a system of two linear equations.` }
            ]
          },
          p(T`**Bài toán.** Một vật nặng 124 g, có thể tích 15 cm³, là hợp kim của đồng và kẽm. Hỏi trong vật có bao nhiêu gam đồng và bao nhiêu gam kẽm, biết rằng 1 cm³ đồng nặng 8,9 g và 1 cm³ kẽm nặng 7 g?`,
            T`**Problem.** An object of mass 124 g and volume 15 cm³ is an alloy of copper and zinc. How many grams of copper and how many grams of zinc does it contain, given that 1 cm³ of copper has mass 8.9 g and 1 cm³ of zinc has mass 7 g?`, { badge: 'book' }),
          {
            t: 'activity', no: 1,
            title: { vi: 'Giải bài toán bằng cách lập hệ phương trình', en: 'Solving a problem by setting up a system' },
            vi: T`Xét bài toán trên. Gọi $x$ là số gam đồng, $y$ là số gam kẽm cần tính.`,
            en: T`Take the problem above. Let $x$ be the grams of copper and $y$ the grams of zinc to be found.`,
            style: 'num',
            items: [
              { vi: T`Biểu thị khối lượng của vật qua $x$ và $y$.`, en: T`{Express|express} the mass of the object using $x$ and $y$.` },
              { vi: T`Biểu thị thể tích của vật qua $x$ và $y$.`, en: T`Express the volume of the object using $x$ and $y$.` },
              { vi: T`Giải hệ gồm hai phương trình nhận được ở hai ý trên, rồi trả lời bài toán.`, en: T`Solve the system made of the two equations above, and answer the problem.` }
            ]
          },
          key([
            p(T`**Nhận xét.** Các bước giải một bài toán bằng cách lập hệ phương trình:`, T`**Remark.** The steps for solving a problem by setting up a system of equations:`),
            steps([
              st(1, T`Lập hệ phương trình: chọn ẩn (thường là hai ẩn) và đặt điều kiện thích hợp cho ẩn; biểu diễn các đại lượng chưa biết theo ẩn và các đại lượng đã biết; lập hệ phương trình biểu thị mối quan hệ giữa các đại lượng.`,
                T`Set up the system: choose the {unknowns|unknown} (usually two) and give them suitable {conditions|condition}; {express} the unknown quantities with the unknowns and the known quantities; write a system showing how the quantities are related.`),
              st(2, T`Giải hệ phương trình.`, T`Solve the system.`),
              st(3, T`Trả lời: kiểm tra xem nghiệm nào thoả mãn, nghiệm nào không thoả mãn điều kiện của ẩn, rồi kết luận.`,
                T`Answer: check which {solutions|solution} meet the {conditions|condition} of the unknowns and which do not, then state the conclusion.`)
            ])
          ]),
          ex(1, [
            p(T`Tìm hai số tự nhiên có tổng bằng 1 006, biết rằng nếu lấy số lớn chia cho số nhỏ thì được thương là 2 và số dư là 124.`,
              T`Find two {natural numbers|natural-number} whose sum is 1 006, given that when the larger is divided by the smaller, the {quotient} is 2 and the {remainder} is 124.`)
          ], [
            p(T`• Gọi hai số là $x$ và $y$ với $x<y$. Số dư của phép chia $y$ cho $x$ là 124 nên $x>124$. Điều kiện: $x,\,y\in\mathbb{N}$ và $124<x<y$.`,
              T`• Let the numbers be $x$ and $y$ with $x<y$. The remainder of $y$ divided by $x$ is 124, so $x>124$. {Conditions|condition}: $x,\,y\in\mathbb{N}$ and $124<x<y$.`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 22 */
      {
        number: 22,
        blocks: [
          {
            t: 'ex', kind: 'example', no: 1, body: [], solution: [
              p(T`Tổng hai số là 1 006 nên $x+y=1\,006$. Chia $y$ cho $x$ được thương 2, dư 124 nên $y=2x+124$. Ta có hệ`,
                T`The sum is 1 006, so $x+y=1\,006$. Dividing $y$ by $x$ gives quotient 2 and remainder 124, so $y=2x+124$. We get the system`),
              sys(['x+y=1006', 'y=2x+124']),
              p(T`• Giải hệ: thế $y=2x+124$ vào phương trình đầu: $3x+124=1\,006$, hay $3x=882$, suy ra $x=294$. Từ đó $y=2\cdot 294+124=712$.`,
                T`• Solve: {substitute} $y=2x+124$ into the first equation: $3x+124=1\,006$, that is $3x=882$, so $x=294$. Then $y=2\cdot 294+124=712$.`),
              p(T`• Các giá trị $x=294$, $y=712$ thoả mãn điều kiện. Vậy hai số cần tìm là 294 và 712.`,
                T`• The values $x=294$ and $y=712$ meet the {conditions|condition}. So the two numbers are 294 and 712.`)
            ]
          },
          lt(1, [
            p(T`Một xe khách đi từ Thành phố Hồ Chí Minh đến Cần Thơ, quãng đường dài 170 km. Sau khi xe khách xuất phát 1 giờ 40 phút, một xe tải bắt đầu đi từ Cần Thơ về Thành phố Hồ Chí Minh (cùng tuyến đường) và gặp xe khách sau đó 40 phút. Tính vận tốc của mỗi xe, biết mỗi giờ xe khách đi nhanh hơn xe tải 15 km.`,
              T`A coach travels from Ho Chi Minh City to Can Tho, a distance of 170 km. 1 hour 40 minutes after the coach leaves, a lorry starts from Can Tho towards Ho Chi Minh City (on the same road) and meets the coach 40 minutes later. Find the speed of each vehicle, given that the coach goes 15 km/h faster than the lorry.`),
            p(T`*Gợi ý.* Gọi $x$ (km/h) là vận tốc xe tải, $y$ (km/h) là vận tốc xe khách ($x,\,y>0$). Hai xe đi ngược chiều gặp nhau khi tổng quãng đường hai xe đã đi bằng 170 km.`,
              T`*Hint.* Let $x$ (km/h) be the lorry’s speed and $y$ (km/h) the coach’s speed ($x,\,y>0$). Two vehicles travelling in opposite directions meet when their distances add up to 170 km.`)
          ]),
          ex(2, [
            p(T`Hai đội công nhân cùng làm một đoạn đường thì xong trong 24 ngày. Mỗi ngày, đội I làm được nhiều gấp rưỡi đội II. Hỏi nếu làm một mình thì mỗi đội làm xong đoạn đường đó trong bao lâu? (Giả sử năng suất mỗi đội không đổi.)`,
              T`Two teams of workers together finish a stretch of road in 24 days. Each day, team I does one and a half times as much as team II. How long would each team take to finish it alone? (Assume each team’s work rate stays constant.)`)
          ], [
            p(T`• Gọi $x$ là số ngày đội I làm một mình xong việc, $y$ là số ngày đội II làm một mình xong việc. Điều kiện: $x>0$, $y>0$. Mỗi ngày đội I làm được $\frac{1}{x}$ công việc, đội II làm được $\frac{1}{y}$ công việc.`,
              T`• Let $x$ be the days team I needs alone and $y$ the days team II needs alone. {Conditions|condition}: $x>0$, $y>0$. Each day team I does $\frac{1}{x}$ of the job and team II does $\frac{1}{y}$ of the job (a {fraction} of the work).`),
            p(T`Đội I làm gấp rưỡi đội II: $\frac{1}{x}=\frac{3}{2}\cdot\frac{1}{y}$. (1)  Hai đội làm chung 24 ngày xong: $\frac{1}{x}+\frac{1}{y}=\frac{1}{24}$. (2)`,
              T`Team I works 1.5 times as fast as team II: $\frac{1}{x}=\frac{3}{2}\cdot\frac{1}{y}$. (1)  Together they finish in 24 days: $\frac{1}{x}+\frac{1}{y}=\frac{1}{24}$. (2)`),
            p(T`• Đặt $u=\frac{1}{x}$ và $v=\frac{1}{y}$, ta có hệ bậc nhất hai ẩn mới $u$, $v$:`, T`• Put $u=\frac{1}{x}$ and $v=\frac{1}{y}$ to get a new linear system in $u$ and $v$:`),
            sys(['u=\\frac{3}{2}v', 'u+v=\\frac{1}{24}'], '(II)')
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 23 */
      {
        number: 23,
        blocks: [
          {
            t: 'ex', kind: 'example', no: 2, body: [], solution: [
              p(T`Giải hệ (II): thế $u=\frac{3}{2}v$ vào $u+v=\frac{1}{24}$ ta được $\frac{3}{2}v+v=\frac{1}{24}$, hay $\frac{5}{2}v=\frac{1}{24}$, suy ra $v=\frac{1}{60}$. Do đó $u=\frac{3}{2}\cdot\frac{1}{60}=\frac{1}{40}$.`,
                T`Solve (II): {substitute} $u=\frac{3}{2}v$ into $u+v=\frac{1}{24}$ to get $\frac{3}{2}v+v=\frac{1}{24}$, that is $\frac{5}{2}v=\frac{1}{24}$, so $v=\frac{1}{60}$. Then $u=\frac{3}{2}\cdot\frac{1}{60}=\frac{1}{40}$.`),
              p(T`Từ $u=\frac{1}{x}=\frac{1}{40}$ suy ra $x=40$; từ $v=\frac{1}{y}=\frac{1}{60}$ suy ra $y=60$. Các giá trị này thoả mãn điều kiện của ẩn.`,
                T`From $u=\frac{1}{x}=\frac{1}{40}$ we get $x=40$; from $v=\frac{1}{y}=\frac{1}{60}$ we get $y=60$. Both values meet the {conditions|condition}.`),
              p(T`*Trả lời:* Nếu làm một mình, đội I xong đoạn đường trong 40 ngày, đội II xong trong 60 ngày.`,
                T`*Answer:* Working alone, team I finishes the road in 40 days and team II in 60 days.`)
            ]
          },
          lt(2, [
            p(T`Nếu hai vòi nước cùng chảy vào một bể không có nước thì bể đầy sau 1 giờ 20 phút. Nếu mở riêng vòi thứ nhất trong 10 phút và vòi thứ hai trong 12 phút thì chỉ được $\frac{2}{15}$ bể. Hỏi nếu mở riêng từng vòi thì thời gian để mỗi vòi chảy đầy bể là bao nhiêu phút?`,
              T`If two taps run together into an empty tank, it fills in 1 hour 20 minutes. If the first tap alone runs for 10 minutes and the second alone for 12 minutes, only $\frac{2}{15}$ of the tank is filled. How many minutes would each tap alone take to fill the tank?`)
          ])
        ]
      }
    ]
  };
})();
