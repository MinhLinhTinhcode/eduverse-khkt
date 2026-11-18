/* ==========================================================================
   TOÁN 9 (TẬP MỘT) — CHƯƠNG II: PHƯƠNG TRÌNH VÀ BẤT PHƯƠNG TRÌNH BẬC NHẤT MỘT ẨN
   --------------------------------------------------------------------------
   Các bài trong file này (mỗi bài một mục trong TEXTBOOK.lessons):

     'toan9-bai4'   Bài 4. Phương trình quy về phương trình bậc nhất một ẩn   (tr. 26–30)
     'toan9-bai5'   Bài 5. Bất đẳng thức và tính chất                          (tr. 31–35)
     'toan9-ltc2'   Luyện tập chung                                            (tr. 36–37)
     'toan9-bai6'   Bài 6. Bất phương trình bậc nhất một ẩn                    (tr. 38–41)
     'toan9-btcc2'  Bài tập cuối chương II                                     (tr. 42–43)

   Lời văn được biên soạn lại, không chép nguyên văn sách giáo khoa.
   Số liệu của các ví dụ, bài tập giữ nguyên để kiểm tra được kết quả.

   QUY ƯỚC VIẾT NỘI DUNG (giống file lesson-toan9-chuong2.js)
   • Mỗi chuỗi dùng T`...` (String.raw) để viết LaTeX không phải gõ gấp đôi dấu \.
   • Công thức viết trong $...$, ví dụ  $\frac{x+3}{x}$,  $x\ne -1$,  $a\le b$.
   • Thuật ngữ tiếng Anh viết {inequality}; nếu chữ hiển thị khác khoá thì
     {same-direction inequalities|same-direction}. App đổi thành
       <span class="vocab" data-key="same-direction">…</span>
     (gạch chân nét đứt, bấm để xem IPA, nghĩa, ví dụ, nghe phát âm).
   • **đậm**, *nghiêng*.
   • Từ điển của các bài nằm ngay đầu file (Object.assign vào TEXTBOOK.glossary).
   • Phần giải thích nghĩa luôn bắt đầu bằng "Trong Toán: …"; popup tự lấy nhãn
     môn học từ đó, nên không còn hiện "Trong Tin học" nữa.
   ========================================================================== */
(function () {
  'use strict';

  const D = (window.TEXTBOOK = window.TEXTBOOK || {});
  D.lessons = D.lessons || {};
  D.glossary = D.glossary || {};

  const T = String.raw;

  /* ------------------------------------------------------------------------
     TỪ VỰNG (khoá viết thường, nối bằng dấu gạch)
     ------------------------------------------------------------------------ */
  const g = (word, ipa, pos, vi, ctx, exEn, exVi) => ({ word, ipa, pos, vi, ctx, ex: { en: exEn, vi: exVi } });

  Object.assign(D.glossary, {
    'product-equation': g('product equation', '/ˈprɒd.ʌkt ɪˈkweɪ.ʒən/', 'n', 'phương trình tích',
      'Trong Toán: Phương trình có vế trái là tích của các biểu thức và vế phải bằng 0, như (ax + b)(cx + d) = 0.',
      'To solve a product equation, set each factor equal to zero.', 'Để giải phương trình tích, cho từng nhân tử bằng 0.'),
    'rational-equation': g('rational equation', '/ˈræʃ.ən.əl ɪˈkweɪ.ʒən/', 'n', 'phương trình chứa ẩn ở mẫu',
      'Trong Toán: Phương trình có ẩn nằm ở mẫu của một phân thức (còn nói: equation with the variable in the denominator).',
      'A rational equation needs a condition on x so that no denominator is zero.', 'Phương trình chứa ẩn ở mẫu cần có điều kiện của x để không mẫu nào bằng 0.'),
    'conditions-of-existence': g('conditions of existence', '/kənˈdɪʃ.ənz əv ɪɡˈzɪs.təns/', 'n', 'điều kiện xác định (ĐKXĐ)',
      'Trong Toán: Điều kiện của ẩn để mọi mẫu thức đều khác 0, tức để phương trình có nghĩa. Còn gọi là domain hay defined condition.',
      'The conditions of existence of 1/(x − 1) = 2 is x ≠ 1.', 'Điều kiện xác định của 1/(x − 1) = 2 là x ≠ 1.'),
    denominator: g('denominator', '/dɪˈnɒm.ɪ.neɪ.tər/', 'n', 'mẫu số, mẫu thức',
      'Trong Toán: Phần dưới của phân số hay phân thức; mẫu luôn phải khác 0.',
      'The denominator of 3/x is x.', 'Mẫu của 3/x là x.'),
    'common-denominator': g('common denominator', '/ˈkɒm.ən dɪˈnɒm.ɪ.neɪ.tər/', 'n', 'mẫu chung',
      'Trong Toán: Mẫu thức mà mọi phân thức đều quy về được; quy đồng là đưa về mẫu chung.',
      'Rewrite both sides over a common denominator.', 'Hãy viết hai vế với cùng một mẫu chung.'),
    'clear-denominators': g('clear the denominators', '/klɪə ðə dɪˈnɒm.ɪ.neɪ.təz/', 'v', 'khử mẫu',
      'Trong Toán: Nhân hai vế với mẫu chung (khác 0) để phương trình không còn mẫu.',
      'Multiply by the common denominator to clear the denominators.', 'Nhân với mẫu chung để khử mẫu.'),
    factorise: g('factorise', '/ˈfæk.tə.raɪz/', 'v', 'phân tích thành nhân tử',
      'Trong Toán: Viết một đa thức dưới dạng tích các đa thức. Tiếng Anh Mỹ viết factor.',
      'Factorise x² − 1 as (x − 1)(x + 1).', 'Phân tích x² − 1 thành (x − 1)(x + 1).'),
    inequality: g('inequality', '/ˌɪn.ɪˈkwɒl.ə.ti/', 'n', 'bất đẳng thức',
      'Trong Toán: Hệ thức so sánh hai số hay hai biểu thức bằng một trong các dấu >, <, ≥, ≤.',
      'The inequality 2 < 5 is true.', 'Bất đẳng thức 2 < 5 là đúng.'),
    'left-hand-side': g('left-hand side', '/left hænd saɪd/', 'n', 'vế trái',
      'Trong Toán: Biểu thức đứng bên trái dấu =, >, <, ≥ hay ≤. Viết tắt LHS.',
      'In 7 > 3, the left-hand side is 7.', 'Trong 7 > 3, vế trái là 7.'),
    'right-hand-side': g('right-hand side', '/raɪt hænd saɪd/', 'n', 'vế phải',
      'Trong Toán: Biểu thức đứng bên phải dấu =, >, <, ≥ hay ≤. Viết tắt RHS.',
      'In 7 > 3, the right-hand side is 3.', 'Trong 7 > 3, vế phải là 3.'),
    'same-direction': g('same-direction inequalities', '/seɪm dəˈrek.ʃən ˌɪn.ɪˈkwɒl.ə.tiz/', 'n', 'hai bất đẳng thức cùng chiều',
      'Trong Toán: Hai bất đẳng thức cùng dùng dấu < (hay cùng dùng dấu >), như 1 < 2 và −3 < −2.',
      '1 < 2 and −3 < −2 are same-direction inequalities.', '1 < 2 và −3 < −2 là hai bất đẳng thức cùng chiều.'),
    'opposite-direction': g('opposite-direction inequalities', '/ˈɒp.ə.zɪt dəˈrek.ʃən ˌɪn.ɪˈkwɒl.ə.tiz/', 'n', 'hai bất đẳng thức ngược chiều',
      'Trong Toán: Hai bất đẳng thức, một cái dùng dấu < còn cái kia dùng dấu >, như 1 < 2 và −2 > −3.',
      '1 < 2 and −2 > −3 are opposite-direction inequalities.', '1 < 2 và −2 > −3 là hai bất đẳng thức ngược chiều.'),
    'transitive-property': g('transitive property', '/ˈtræn.sə.tɪv ˈprɒp.ə.ti/', 'n', 'tính chất bắc cầu',
      'Trong Toán: Nếu a < b và b < c thì a < c; thứ tự bắc cầu qua số ở giữa.',
      'By the transitive property, a < b and b < c give a < c.', 'Theo tính chất bắc cầu, a < b và b < c cho a < c.'),
    'linear-inequality': g('linear inequality', '/ˈlɪn.i.ə ˌɪn.ɪˈkwɒl.ə.ti/', 'n', 'bất phương trình bậc nhất',
      'Trong Toán: Bất phương trình dạng ax + b < 0 (hay >, ≤, ≥) với a ≠ 0. Nói đủ: linear inequality in one variable.',
      '3x + 16 ≤ 0 is a linear inequality in one variable.', '3x + 16 ≤ 0 là bất phương trình bậc nhất một ẩn.'),
    'solution-of-inequality': g('solution of an inequality', '/səˈluː.ʃən əv ən ˌɪn.ɪˈkwɒl.ə.ti/', 'n', 'nghiệm của bất phương trình',
      'Trong Toán: Giá trị của ẩn làm bất phương trình trở thành khẳng định đúng.',
      'x = 1 is a solution of the inequality 3x + 8 < 20.', 'x = 1 là một nghiệm của bất phương trình 3x + 8 < 20.'),
    'number-line': g('number line', '/ˈnʌm.bə laɪn/', 'n', 'trục số',
      'Trong Toán: Đường thẳng có các điểm biểu diễn số thực; số bé hơn nằm bên trái số lớn hơn.',
      'Mark −1 and 1.5 on the number line.', 'Hãy đánh dấu −1 và 1,5 trên trục số.'),
    'positive-number': g('positive number', '/ˈpɒz.ə.tɪv ˈnʌm.bə/', 'n', 'số dương',
      'Trong Toán: Số lớn hơn 0.',
      'Multiplying by a positive number keeps the direction of the inequality.', 'Nhân với một số dương thì giữ nguyên chiều bất đẳng thức.'),
    'negative-number': g('negative number', '/ˈneɡ.ə.tɪv ˈnʌm.bə/', 'n', 'số âm',
      'Trong Toán: Số nhỏ hơn 0.',
      'Multiplying by a negative number reverses the inequality.', 'Nhân với một số âm thì đổi chiều bất đẳng thức.'),
    reverse: g('reverse', '/rɪˈvɜːs/', 'v', 'đảo (chiều), đổi chiều',
      'Trong Toán: Đổi dấu < thành >, hay ≤ thành ≥ (khi nhân hay chia hai vế với số âm).',
      'Reverse the inequality sign when you multiply by −1.', 'Hãy đổi chiều dấu bất đẳng thức khi nhân với −1.'),
    'real-number': g('real number', '/rɪəl ˈnʌm.bə/', 'n', 'số thực',
      'Trong Toán: Số biểu diễn được bằng một điểm trên trục số, gồm số hữu tỉ và số vô tỉ.',
      'For two real numbers a and b, exactly one of a < b, a = b, a > b holds.', 'Với hai số thực a và b, đúng một trong a < b, a = b, a > b xảy ra.'),
    'at-least': g('at least', '/ət liːst/', 'adv', 'ít nhất',
      'Trong Toán: Không nhỏ hơn; “ít nhất 16 tuổi” nghĩa là x ≥ 16.',
      'You must be at least 16, so x ≥ 16.', 'Bạn phải từ 16 tuổi trở lên, nên x ≥ 16.'),
    'at-most': g('at most', '/ət məʊst/', 'adv', 'nhiều nhất, tối đa',
      'Trong Toán: Không lớn hơn; “nhiều nhất 45 người” nghĩa là n ≤ 45.',
      'The bus carries at most 45 people, so n ≤ 45.', 'Xe buýt chở nhiều nhất 45 người, nên n ≤ 45.'),
    'arithmetic-mean': g('arithmetic mean', '/ˌær.ɪθˈmet.ɪk miːn/', 'n', 'trung bình cộng',
      'Trong Toán: Tổng các số chia cho số các số; của a và b là (a + b)/2.',
      'The arithmetic mean of 4 and 6 is 5.', 'Trung bình cộng của 4 và 6 là 5.'),
    'geometric-mean': g('geometric mean', '/ˌdʒiː.əˈmet.rɪk miːn/', 'n', 'trung bình nhân',
      'Trong Toán: Căn bậc hai của tích hai số không âm; của a và b là √(ab).',
      'The geometric mean of 4 and 9 is 6.', 'Trung bình nhân của 4 và 9 là 6.')
  });

  /* ------------------------------------------------------------------------
     HÀM TẠO KHỐI
     ------------------------------------------------------------------------ */
  const p = (vi, en, extra) => Object.assign({ t: 'p', vi, en }, extra);
  const m = (tex, label) => ({ t: 'math', tex, label });
  const h2 = (n, vi, en) => ({ t: 'h2', n, vi, en });
  const tip = (...items) => ({ t: 'tip', items });
  const key = (blocks, title) => ({ t: 'key', title, blocks });
  const steps = (items) => ({ t: 'steps', items });
  const st = (n, vi, en, math) => ({ label: { vi: 'Bước ' + n, en: 'Step ' + n }, vi, en, math });
  const ex = (no, body, solution) => ({ t: 'ex', kind: 'example', no, body, solution });
  const lt = (no, body) => ({ t: 'ex', kind: 'practice', no, body });
  const vd = (no, body) => ({ t: 'ex', kind: 'apply', no, body });
  const act = (no, title, vi, en, items, extra) => Object.assign({ t: 'activity', no, title, vi, en, items, style: 'alpha' }, extra);
  const head = (kind, vi, en) => ({ t: 'head', kind, vi, en });
  const fig = (artName, no, vi, en) => ({ t: 'fig', art: artName, no, vi, en });
  const goals = (...items) => ({ t: 'goals', lead: { vi: 'Sau bài học này em sẽ:', en: 'After this lesson you will:' }, items });
  /* Bài tập cuối bài: số hiệu đậm + đề. */
  const bt = (no, vi, en) => p('**' + no + '.** ' + vi, '**' + no + '.** ' + en);
  /* Gói hai dòng vi/en của một ý nhỏ */
  const it = (vi, en) => ({ vi, en });

  /* ========================================================================
     CHƯƠNG II (dùng chung cho cả 5 phần)
     ======================================================================== */
  const topic = {
    label: 'Chương', labelEn: 'Chapter', number: 'II',
    vi: 'Phương trình và bất phương trình bậc nhất một ẩn',
    en: 'Equations and linear inequalities in one unknown'
  };

  /* ========================================================================
     BÀI 4. PHƯƠNG TRÌNH QUY VỀ PHƯƠNG TRÌNH BẬC NHẤT MỘT ẨN
     ======================================================================== */
  D.lessons['toan9-bai4'] = {
    gradeId: 9,
    number: '4',
    book: 'Toán 9',
    title: { vi: 'Phương trình quy về phương trình bậc nhất một ẩn', en: 'Equations that reduce to linear equations in one unknown' },
    topic,
    spreadLabels: [
      'Mở đầu và phương trình tích',
      'Điều kiện xác định, cách giải',
      'Bài tập'
    ],
    pages: [
      /* ----------------------------------------------------------- Trang 26 */
      {
        number: 26,
        blocks: [
          { t: 'banner' },
          goals(
            it(T`Giải được phương trình tích có dạng $(ax+b)(cx+d)=0$.`, T`Solve a {product equation} of the form $(ax+b)(cx+d)=0$.`),
            it(T`Giải được phương trình chứa ẩn ở mẫu quy về phương trình bậc nhất.`, T`Solve a {rational equation} that reduces to a linear equation.`)
          ),
          p(T`Trong một khu vườn hình vuông có cạnh 15 m, người ta làm một lối đi xung quanh vườn có bề rộng $x$ (m) (Hình 2.1). Để diện tích phần đất còn lại là 169 m² thì bề rộng $x$ của lối đi phải là bao nhiêu?`,
            T`A square garden has side 15 m. A path of width $x$ (m) runs all the way around it (Figure 2.1). For the remaining ground to have area 169 m², what must the width $x$ of the path be?`, { badge: 'book' }),
          fig('garden', '2.1', T`Khu vườn có lối đi xung quanh`, T`The garden with a path around it`),
          p(T`Phần đất còn lại là hình vuông cạnh $15-2x$, nên bài toán dẫn đến phương trình $(15-2x)^2=169$. Phương trình này không phải bậc nhất, nhưng ta sẽ thấy nó đưa được về phương trình tích. Ta bắt đầu từ phương trình tích.`,
            T`The remaining ground is a square of side $15-2x$, so the problem leads to the {equation} $(15-2x)^2=169$. It is not linear, but we will see it can be turned into a product equation. We start with product equations.`)
        ]
      },

      /* ----------------------------------------------------------- Trang 27 */
      {
        number: 27,
        blocks: [
          h2('1', 'Phương trình tích', 'Product equations'),
          act(1, { vi: 'Phương trình tích', en: 'Product equations' },
            T`Cho đa thức $P(x)=(x+1)(2x-1)+(x+1)x$.`, T`Take the polynomial $P(x)=(x+1)(2x-1)+(x+1)x$.`,
            [
              it(T`Phân tích đa thức $P(x)$ thành nhân tử.`, T`{Factorise} $P(x)$.`),
              it(T`Giải phương trình $P(x)=0$.`, T`Solve the {equation} $P(x)=0$.`)
            ]),
          key([
            p(T`Để giải **phương trình tích** $(ax+b)(cx+d)=0$, ta giải hai phương trình $ax+b=0$ và $cx+d=0$. Sau đó lấy tất cả các nghiệm của chúng.`,
              T`To solve a **{product equation}** $(ax+b)(cx+d)=0$, solve the two equations $ax+b=0$ and $cx+d=0$. Then take all of their {solutions|solution}.`)
          ]),
          ex(1, [
            p(T`Giải phương trình $(2x+1)(3x-1)=0$.`, T`Solve $(2x+1)(3x-1)=0$.`)
          ], [
            p(T`Từ $(2x+1)(3x-1)=0$ suy ra $2x+1=0$ hoặc $3x-1=0$.`, T`From $(2x+1)(3x-1)=0$ we get $2x+1=0$ or $3x-1=0$.`),
            p(T`• $2x+1=0$ hay $2x=-1$, suy ra $x=-\frac{1}{2}$.`, T`• $2x+1=0$, that is $2x=-1$, so $x=-\frac{1}{2}$.`),
            p(T`• $3x-1=0$ hay $3x=1$, suy ra $x=\frac{1}{3}$.`, T`• $3x-1=0$, that is $3x=1$, so $x=\frac{1}{3}$.`),
            p(T`Vậy phương trình có hai nghiệm là $x=-\frac{1}{2}$ và $x=\frac{1}{3}$.`, T`So the equation has two solutions, $x=-\frac{1}{2}$ and $x=\frac{1}{3}$.`)
          ]),
          ex(2, [
            p(T`Giải phương trình $x^2-x=-2x+2$.`, T`Solve $x^2-x=-2x+2$.`)
          ], [
            p(T`Biến đổi phương trình đã cho về phương trình tích như sau:`, T`Turn the given equation into a product equation as follows:`),
            m(T`x^2-x+2x-2=0`),
            m(T`x(x-1)+2(x-1)=0`),
            m(T`(x+2)(x-1)=0`),
            p(T`Ta giải hai phương trình: $x+2=0$ cho $x=-2$; $x-1=0$ cho $x=1$.`, T`We solve two equations: $x+2=0$ gives $x=-2$; $x-1=0$ gives $x=1$.`),
            p(T`Vậy phương trình có hai nghiệm là $x=-2$ và $x=1$.`, T`So the equation has two solutions, $x=-2$ and $x=1$.`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 28 */
      {
        number: 28,
        blocks: [
          tip({
            vi: T`**Nhận xét.** Ở Ví dụ 2, ta giải phương trình theo hai bước: Bước 1, đưa phương trình về phương trình tích $(ax+b)(cx+d)=0$; Bước 2, giải phương trình tích tìm được.`,
            en: T`**Remark.** In Example 2 we solved the equation in two steps. Step 1: turn it into a product equation $(ax+b)(cx+d)=0$. Step 2: solve the product equation we obtained.`
          }),
          lt(1, [
            p(T`Giải các phương trình: a) $(3x+1)(2-4x)=0$; b) $x^2-3x=2x-6$.`, T`Solve: a) $(3x+1)(2-4x)=0$; b) $x^2-3x=2x-6$.`)
          ]),
          vd('', [p(T`Giải bài toán ở tình huống mở đầu.`, T`Solve the problem from the opening situation.`)]),
          h2('2', 'Phương trình chứa ẩn ở mẫu', 'Rational equations'),
          act(2, { vi: 'Điều kiện xác định của một phương trình', en: 'Conditions of existence of an equation' },
            T`Xét phương trình $x+\frac{1}{x+1}=-1+\frac{1}{x+1}$.`, T`Consider the equation $x+\frac{1}{x+1}=-1+\frac{1}{x+1}$.`,
            [
              it(T`Chuyển các biểu thức chứa ẩn từ vế phải sang vế trái, rồi thu gọn vế trái.`, T`Move the expressions containing the {unknown|unknown} from the {right-hand side} to the {left-hand side}, then simplify the left-hand side.`),
              it(T`Giá trị $x=-1$ có là nghiệm của phương trình đã cho hay không? Vì sao?`, T`Is $x=-1$ a {solution} of the given equation? Why or why not?`)
            ]),
          p(T`Khi giải phương trình chứa ẩn ở mẫu, ta phải chú ý đến điều kiện xác định của phương trình đó. Chẳng hạn, với phương trình trên, để các mẫu có nghĩa thì $x+1\ne 0$, hay $x\ne -1$.`,
            T`When solving a {rational equation}, we must pay attention to its {conditions of existence|conditions-of-existence}. For the equation above, the denominators make sense only if $x+1\ne 0$, that is $x\ne -1$.`),
          key([
            p(T`Với phương trình chứa ẩn ở mẫu, ta thường đặt điều kiện cho ẩn để **tất cả các mẫu thức đều khác 0**, và gọi đó là **điều kiện xác định** (viết tắt là ĐKXĐ) của phương trình.`,
              T`For a rational equation, we usually put a {condition} on the unknown so that **every {denominator} is non-zero**. This is called the **{conditions of existence|conditions-of-existence}** (ĐKXĐ) of the equation.`)
          ]),
          ex(3, [
            p(T`Tìm điều kiện xác định của mỗi phương trình: a) $\frac{5x+2}{x-1}=0$; b) $\frac{1}{x+1}=1+\frac{1}{x-2}$.`,
              T`Find the conditions of existence of each equation: a) $\frac{5x+2}{x-1}=0$; b) $\frac{1}{x+1}=1+\frac{1}{x-2}$.`)
          ], [
            p(T`a) Vì $x-1\ne 0$ khi $x\ne 1$ nên ĐKXĐ của phương trình là $x\ne 1$.`, T`a) Since $x-1\ne 0$ exactly when $x\ne 1$, the condition is $x\ne 1$.`),
            p(T`b) Vì $x+1\ne 0$ khi $x\ne -1$ và $x-2\ne 0$ khi $x\ne 2$ nên ĐKXĐ là $x\ne -1$ và $x\ne 2$.`,
              T`b) Since $x+1\ne 0$ exactly when $x\ne -1$, and $x-2\ne 0$ exactly when $x\ne 2$, the conditions are $x\ne -1$ and $x\ne 2$.`)
          ]),
          lt(2, [
            p(T`Tìm điều kiện xác định của mỗi phương trình: a) $\frac{3x+1}{2x-1}=1$; b) $\frac{x}{x-1}+\frac{x+1}{x}=2$.`,
              T`Find the conditions of existence of each equation: a) $\frac{3x+1}{2x-1}=1$; b) $\frac{x}{x-1}+\frac{x+1}{x}=2$.`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 29 */
      {
        number: 29,
        blocks: [
          act(3, { vi: 'Cách giải phương trình chứa ẩn ở mẫu', en: 'How to solve a rational equation' },
            T`Xét phương trình $\frac{x+3}{x}=\frac{x+9}{x-3}$  (1). Hãy thực hiện các yêu cầu sau để giải phương trình (1):`,
            T`Consider the equation $\frac{x+3}{x}=\frac{x+9}{x-3}$  (1). Carry out these tasks to solve equation (1):`,
            [
              it(T`Tìm điều kiện xác định của phương trình (1);`, T`Find the {conditions of existence|conditions-of-existence} of (1);`),
              it(T`Quy đồng mẫu hai vế của phương trình (1), rồi khử mẫu;`, T`Bring both sides to a {common denominator}, then {clear the denominators|clear-denominators};`),
              it(T`Giải phương trình vừa tìm được;`, T`Solve the equation you obtain;`),
              it(T`Kết luận nghiệm của phương trình (1).`, T`State the {solutions|solution} of (1).`)
            ]),
          p(T`Để giải phương trình chứa ẩn ở mẫu, ta thường thực hiện các bước sau:`, T`To solve a {rational equation}, we usually take these steps:`),
          key([
            steps([
              st(1, T`Tìm điều kiện xác định của phương trình.`, T`Find the {conditions of existence|conditions-of-existence} of the equation.`),
              st(2, T`Quy đồng mẫu hai vế của phương trình rồi khử mẫu.`, T`Bring both sides to a {common denominator} and {clear the denominators|clear-denominators}.`),
              st(3, T`Giải phương trình vừa tìm được.`, T`Solve the equation you have found.`),
              st(4, T`(Kết luận) Trong các giá trị tìm được của ẩn ở Bước 3, giá trị nào thoả mãn điều kiện xác định chính là nghiệm của phương trình đã cho.`,
                T`(Conclusion) Of the values found in Step 3, those that satisfy the conditions of existence are exactly the {solutions|solution} of the given equation.`)
            ])
          ]),
          ex(4, [
            p(T`Giải phương trình $\frac{2}{x+1}+\frac{1}{x-2}=\frac{3}{(x+1)(x-2)}$  (2).`,
              T`Solve $\frac{2}{x+1}+\frac{1}{x-2}=\frac{3}{(x+1)(x-2)}$  (2).`)
          ], [
            p(T`Điều kiện xác định: $x\ne -1$ và $x\ne 2$.`, T`Conditions of existence: $x\ne -1$ and $x\ne 2$.`),
            p(T`Quy đồng mẫu và khử mẫu, ta được`, T`Bringing to a common denominator and clearing it, we get`),
            m(T`2(x-2)+(x+1)=3`, '(2a)'),
            p(T`Giải phương trình (2a): $2x-4+x+1=3$, nên $3x-3=3$, $3x=6$, suy ra $x=2$.`,
              T`Solving (2a): $2x-4+x+1=3$, so $3x-3=3$, $3x=6$, hence $x=2$.`),
            p(T`Giá trị $x=2$ không thoả mãn ĐKXĐ. Vậy phương trình (2) vô nghiệm.`,
              T`The value $x=2$ does not satisfy the conditions of existence. So equation (2) has no solution.`)
          ]),
          lt(3, [
            p(T`Giải phương trình $\frac{1}{x-1}-\frac{4x}{x^3-1}=\frac{x}{x^2+x+1}$.`,
              T`Solve $\frac{1}{x-1}-\frac{4x}{x^3-1}=\frac{x}{x^2+x+1}$.`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 30 */
      {
        number: 30,
        blocks: [
          head('practice', 'Bài tập', 'Exercises'),
          bt('2.1', T`Giải các phương trình: a) $x(x-2)=0$; b) $(2x+1)(3x-2)=0$.`, T`Solve: a) $x(x-2)=0$; b) $(2x+1)(3x-2)=0$.`),
          bt('2.2', T`Giải các phương trình: a) $(x^2-4)+x(x-2)=0$; b) $(2x+1)^2-9x^2=0$.`, T`Solve: a) $(x^2-4)+x(x-2)=0$; b) $(2x+1)^2-9x^2=0$.`),
          bt('2.3', T`Giải các phương trình: a) $\frac{2}{2x+1}+\frac{1}{x+1}=\frac{3}{(2x+1)(x+1)}$; b) $\frac{1}{x+1}-\frac{x}{x^2-x+1}=\frac{3x}{x^3+1}$.`,
            T`Solve: a) $\frac{2}{2x+1}+\frac{1}{x+1}=\frac{3}{(2x+1)(x+1)}$; b) $\frac{1}{x+1}-\frac{x}{x^2-x+1}=\frac{3x}{x^3+1}$.`),
          bt('2.4', T`Bác An có một mảnh đất hình chữ nhật dài 14 m, rộng 12 m. Bác dự định xây nhà trên mảnh đất đó và dành một phần diện tích làm sân vườn như Hình 2.2. Biết diện tích đất làm nhà là 100 m². Hỏi $x$ bằng bao nhiêu mét?`,
            T`Mr An has a rectangular plot 14 m long and 12 m wide. He plans to build a house on it and keep part of the area as a yard, as in Figure 2.2. The house takes up 100 m². What is $x$, in metres?`),
          fig('yard', '2.2', T`Mảnh đất có nhà và sân vườn`, T`The plot with the house and the yard`),
          bt('2.5', T`Hai người cùng làm chung một công việc thì xong trong 8 giờ. Hai người cùng làm được 4 giờ thì người thứ nhất bị điều đi làm việc khác. Người thứ hai tiếp tục làm 12 giờ nữa thì xong công việc. Gọi $x$ là thời gian người thứ nhất làm một mình xong công việc (đơn vị là giờ, $x>0$). a) Hãy biểu thị theo $x$ khối lượng công việc mà người thứ nhất làm được trong 1 giờ, và khối lượng công việc mà người thứ hai làm được trong 1 giờ. b) Hãy lập phương trình theo $x$ và giải phương trình đó. Sau đó cho biết nếu làm một mình thì mỗi người phải làm trong bao lâu mới xong công việc.`,
            T`Two people working together finish a job in 8 hours. After working together for 4 hours, the first person is sent to other work. The second person carries on for 12 more hours and finishes the job. Let $x$ be the time (in hours, $x>0$) the first person needs to do the job alone. a) {Express|express} in terms of $x$ the share of the job each person does in 1 hour. b) Set up an equation in $x$ and solve it. Then say how long each person would need working alone.`)
        ]
      }
    ]
  };

  /* ========================================================================
     BÀI 5. BẤT ĐẲNG THỨC VÀ TÍNH CHẤT
     ======================================================================== */
  D.lessons['toan9-bai5'] = {
    gradeId: 9,
    number: '5',
    book: 'Toán 9',
    title: { vi: 'Bất đẳng thức và tính chất', en: 'Inequalities and their properties' },
    topic,
    spreadLabels: [
      'Mở đầu và khái niệm bất đẳng thức',
      'Tính chất bắc cầu, liên hệ với phép cộng',
      'Liên hệ với phép nhân và bài tập'
    ],
    pages: [
      /* ----------------------------------------------------------- Trang 31 */
      {
        number: 31,
        blocks: [
          { t: 'banner' },
          goals(
            it(T`Nhắc lại thứ tự trên tập số thực (các kí hiệu $>$, $\ge$, $<$, $\le$).`, T`Recall the order on the {real numbers|real-number} (the signs $>$, $\ge$, $<$, $\le$).`),
            it(T`Nhận biết bất đẳng thức; hai bất đẳng thức cùng chiều, ngược chiều.`, T`Recognise an {inequality}; {same-direction inequalities|same-direction} and {opposite-direction inequalities|opposite-direction}.`),
            it(T`Biết tính chất bắc cầu và tính chất của bất đẳng thức liên quan đến phép cộng, phép nhân.`, T`Know the {transitive property} and the properties of inequalities with addition and multiplication.`)
          ),
          p(T`Khi đi đường, ta có thể thấy các biển báo giới hạn tốc độ mà xe cơ giới được phép đi. Em có biết ý nghĩa của biển báo ở Hình 2.3 (báo tốc độ tối đa cho phép theo loại xe, trên từng làn đường) không?`,
            T`On the road we see signs that limit the speed of motor vehicles. Do you know what the sign in Figure 2.3 means (it gives the maximum speed allowed for each type of vehicle, lane by lane)?`, { badge: 'book' }),
          fig('signs', '2.3', T`Biển báo giao thông P.127c`, T`Traffic sign P.127c`),
          h2('1', 'Bất đẳng thức', 'Inequalities'),
          p(T`**Nhắc lại thứ tự trên tập số thực.** Với hai số thực $a$ và $b$ có đúng ba trường hợp: số $a$ bằng số $b$, kí hiệu $a=b$; số $a$ lớn hơn số $b$, kí hiệu $a>b$; số $a$ nhỏ hơn số $b$, kí hiệu $a<b$.`,
            T`**Order on the real numbers.** For two real numbers $a$ and $b$ exactly one of three cases holds: $a$ equals $b$, written $a=b$; $a$ is greater than $b$, written $a>b$; $a$ is less than $b$, written $a<b$.`),
          {
            t: 'ask',
            lead: { vi: T`Thay dấu ? trong các biểu thức sau bằng dấu thích hợp ($=$, $>$, $<$).`, en: T`Replace each ? with a suitable sign ($=$, $>$, $<$).` },
            style: 'alpha',
            items: [
              it(T`$-34{,}2\ ?\ -27$`, T`$-34.2\ ?\ -27$`),
              it(T`$\frac{6}{-8}\ ?\ -\frac{3}{4}$`, T`$\frac{6}{-8}\ ?\ -\frac{3}{4}$`),
              it(T`$2\,024\ ?\ 1\,954$`, T`$2\,024\ ?\ 1\,954$`)
            ]
          },
          p(T`Khi biểu diễn số thực trên trục số, điểm biểu diễn số bé hơn nằm trước điểm biểu diễn số lớn hơn. Chẳng hạn, $-2{,}5<-1<1<1{,}5$.`,
            T`When real numbers are shown on the {number line|number-line}, the point for the smaller number lies before the point for the larger one. For example, $-2.5<-1<1<1.5$.`),
          fig('numline', '', T`Các số $-2{,}5$; $-1$; $0$; $1$; $1{,}5$ trên trục số`, T`The numbers $-2.5$, $-1$, $0$, $1$, $1.5$ on the number line`)
        ]
      },

      /* ----------------------------------------------------------- Trang 32 */
      {
        number: 32,
        blocks: [
          p(T`Số $a$ lớn hơn hoặc bằng số $b$, tức là $a>b$ hoặc $a=b$, kí hiệu là $a\ge b$. Số $a$ nhỏ hơn hoặc bằng số $b$, tức là $a<b$ hoặc $a=b$, kí hiệu là $a\le b$.`,
            T`The number $a$ is greater than or equal to $b$ when $a>b$ or $a=b$, written $a\ge b$. The number $a$ is less than or equal to $b$ when $a<b$ or $a=b$, written $a\le b$.`),
          lt(1, [
            p(T`Biển báo giao thông R.306 (Hình 2.4) báo tốc độ tối thiểu cho các xe cơ giới. Biển có hiệu lực bắt buộc các loại xe cơ giới vận hành với tốc độ không nhỏ hơn trị số ghi trên biển trong điều kiện giao thông thuận lợi và an toàn. Nếu một ô tô đi trên đường đó với tốc độ $a$ (km/h) thì $a$ phải thoả mãn điều kiện nào trong các điều kiện sau?  A. $a<60$;  B. $a>60$;  C. $a\ge 60$;  D. $a\le 60$.`,
              T`Traffic sign R.306 (Figure 2.4) shows a minimum speed for motor vehicles. It requires vehicles to travel at a speed not less than the number on the sign, in good and safe traffic conditions. If a car drives on that road at speed $a$ (km/h), which of these conditions must $a$ satisfy?  A. $a<60$;  B. $a>60$;  C. $a\ge 60$;  D. $a\le 60$.`)
          ]),
          fig('sign60', '2.4', T`Biển báo giao thông R.306`, T`Traffic sign R.306`),
          key([
            p(T`Ta gọi hệ thức dạng $a>b$ (hay $a<b$, $a\ge b$, $a\le b$) là **bất đẳng thức** và gọi $a$ là **vế trái**, $b$ là **vế phải** của bất đẳng thức.`,
              T`A relation of the form $a>b$ (or $a<b$, $a\ge b$, $a\le b$) is called an **{inequality}**; $a$ is its **{left-hand side}** and $b$ is its **{right-hand side}**.`)
          ], { vi: 'Khái niệm bất đẳng thức', en: 'The idea of an inequality' }),
          tip({
            vi: T`**Chú ý.** Hai bất đẳng thức $1<2$ và $-3<-2$ (hay $6>3$ và $8>5$) được gọi là *hai bất đẳng thức cùng chiều*. Hai bất đẳng thức $1<2$ và $-2>-3$ (hay $6>3$ và $5<8$) được gọi là *hai bất đẳng thức ngược chiều*.`,
            en: T`**Note.** The inequalities $1<2$ and $-3<-2$ (or $6>3$ and $8>5$) are called *{same-direction inequalities|same-direction}*. The inequalities $1<2$ and $-2>-3$ (or $6>3$ and $5<8$) are called *{opposite-direction inequalities|opposite-direction}*.`
          }),
          ex(1, [
            p(T`Xác định vế trái và vế phải của các bất đẳng thức: a) $-2>-7$; b) $a^2+1>0$.`, T`Identify the left-hand and right-hand sides of: a) $-2>-7$; b) $a^2+1>0$.`)
          ], [
            p(T`a) Vế trái là $-2$, vế phải là $-7$.`, T`a) The left-hand side is $-2$ and the right-hand side is $-7$.`),
            p(T`b) Vế trái là $a^2+1$, vế phải là $0$.`, T`b) The left-hand side is $a^2+1$ and the right-hand side is $0$.`)
          ]),
          ex(2, [
            p(T`Viết bất đẳng thức để mô tả mỗi tình huống: a) Tuần tới, nhiệt độ $t$ (°C) tại Tokyo là trên $-5$ °C. b) Nhiệt độ $t$ (°C) bảo quản của một loại sữa là dưới 4 °C. c) Để được điều khiển xe máy điện thì số tuổi $x$ của một người phải ít nhất là 16 tuổi.`,
              T`Write an inequality for each situation: a) Next week the temperature $t$ (°C) in Tokyo is above $-5$ °C. b) The storage temperature $t$ (°C) of a type of milk is below 4 °C. c) To ride an electric motorbike, a person's age $x$ must be {at least|at-least} 16.`)
          ], [
            p(T`a) $t>-5$;  b) $t<4$;  c) $x\ge 16$.`, T`a) $t>-5$;  b) $t<4$;  c) $x\ge 16$.`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 33 */
      {
        number: 33,
        blocks: [
          key([
            p(T`Bất đẳng thức có tính chất quan trọng sau: nếu $a<b$ và $b<c$ thì $a<c$ (**tính chất bắc cầu** của bất đẳng thức).`,
              T`Inequalities have this important property: if $a<b$ and $b<c$ then $a<c$ (the **{transitive property}** of inequalities).`),
            fig('transit', '', T`$a<b<c$ trên trục số`, T`$a<b<c$ on the number line`)
          ]),
          tip({
            vi: T`**Chú ý.** Tương tự, các thứ tự lớn hơn ($>$), lớn hơn hoặc bằng ($\ge$), nhỏ hơn hoặc bằng ($\le$) cũng có tính chất bắc cầu.`,
            en: T`**Note.** In the same way, the orders greater than ($>$), greater than or equal to ($\ge$) and less than or equal to ($\le$) are also {transitive|transitive-property}.`
          }),
          ex(3, [
            p(T`Chứng minh $\frac{2\,024}{2\,023}>\frac{2\,021}{2\,022}$.`, T`Prove that $\frac{2\,024}{2\,023}>\frac{2\,021}{2\,022}$.`)
          ], [
            p(T`Ta có $\frac{2\,024}{2\,023}=1+\frac{1}{2\,023}>1$ và $\frac{2\,021}{2\,022}=1-\frac{1}{2\,022}<1$ nên $\frac{2\,024}{2\,023}>\frac{2\,021}{2\,022}$.`,
              T`We have $\frac{2\,024}{2\,023}=1+\frac{1}{2\,023}>1$ and $\frac{2\,021}{2\,022}=1-\frac{1}{2\,022}<1$, so $\frac{2\,024}{2\,023}>\frac{2\,021}{2\,022}$ (by the transitive property).`)
          ]),
          lt(2, [
            p(T`Chứng minh rằng: a) $\frac{2\,024}{1\,000}>1{,}9$; b) $-\frac{2\,022}{2\,023}>-1{,}1$.`, T`Prove that: a) $\frac{2\,024}{1\,000}>1.9$; b) $-\frac{2\,022}{2\,023}>-1.1$.`)
          ]),
          vd(1, [
            p(T`Viết các bất đẳng thức để mô tả tốc độ cho phép trong tình huống mở đầu: a) ô tô ở làn giữa; b) xe máy ở làn bên phải.`,
              T`Write inequalities that describe the allowed speeds in the opening situation: a) a car in the middle lane; b) a motorbike in the right-hand lane.`)
          ]),
          h2('2', 'Liên hệ giữa thứ tự và phép cộng', 'Order and addition'),
          act(1, { vi: 'Liên hệ giữa thứ tự và phép cộng', en: 'How order relates to addition' },
            T`Xét bất đẳng thức $-1<2$  (1).`, T`Consider the {inequality} $-1<2$  (1).`,
            [
              it(T`Cộng 2 vào hai vế của (1) rồi so sánh kết quả thì ta được bất đẳng thức nào?`, T`Add 2 to both sides of (1) and compare the results. Which inequality do you get?`),
              it(T`Cộng $-2$ vào hai vế của (1) rồi so sánh kết quả thì ta được bất đẳng thức nào?`, T`Add $-2$ to both sides of (1) and compare. Which inequality do you get?`),
              it(T`Cộng vào hai vế của (1) với cùng một số $c$ thì ta sẽ được bất đẳng thức nào?`, T`Add the same number $c$ to both sides of (1). Which inequality will you get?`)
            ]),
          key([
            p(T`Khi cộng cùng một số vào hai vế của một bất đẳng thức, ta được bất đẳng thức mới **cùng chiều** với bất đẳng thức đã cho. Với ba số $a$, $b$, $c$, ta có:`,
              T`When the same number is added to both sides of an inequality, we get a new inequality in the **same direction** as the given one. For three numbers $a$, $b$, $c$:`),
            { t: 'list', items: [
              it(T`Nếu $a<b$ thì $a+c<b+c$;`, T`if $a<b$ then $a+c<b+c$;`),
              it(T`Nếu $a\le b$ thì $a+c\le b+c$;`, T`if $a\le b$ then $a+c\le b+c$;`),
              it(T`Nếu $a>b$ thì $a+c>b+c$;`, T`if $a>b$ then $a+c>b+c$;`),
              it(T`Nếu $a\ge b$ thì $a+c\ge b+c$.`, T`if $a\ge b$ then $a+c\ge b+c$.`)
            ] }
          ]),
          ex(4, [
            p(T`Không thực hiện phép tính, hãy so sánh $2\,023+(-19)$ và $2\,024+(-19)$.`, T`Without calculating, compare $2\,023+(-19)$ and $2\,024+(-19)$.`)
          ], [
            p(T`Vì $2\,023<2\,024$ nên $2\,023+(-19)<2\,024+(-19)$ (cộng vào hai vế với cùng một số $-19$).`,
              T`Since $2\,023<2\,024$, we get $2\,023+(-19)<2\,024+(-19)$ (the same number $-19$ is added to both sides).`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 34 */
      {
        number: 34,
        blocks: [
          lt(3, [
            p(T`Không thực hiện phép tính, hãy so sánh: a) $19+2\,023$ và $-31+2\,023$; b) $\sqrt{2}+2$ và $4$.`,
              T`Without calculating, compare: a) $19+2\,023$ and $-31+2\,023$; b) $\sqrt{2}+2$ and $4$.`)
          ]),
          h2('3', 'Liên hệ giữa thứ tự và phép nhân', 'Order and multiplication'),
          act(2, { vi: 'Liên hệ giữa thứ tự và phép nhân', en: 'How order relates to multiplication' },
            T`Cho bất đẳng thức $-2<5$.`, T`Take the {inequality} $-2<5$.`,
            [
              it(T`Nhân hai vế của bất đẳng thức với 7 rồi so sánh kết quả thì ta được bất đẳng thức nào?`, T`Multiply both sides by 7 and compare. Which inequality do you get?`),
              it(T`Nhân hai vế của bất đẳng thức với $-7$ rồi so sánh kết quả thì ta được bất đẳng thức nào?`, T`Multiply both sides by $-7$ and compare. Which inequality do you get?`)
            ]),
          key([
            p(T`– Khi nhân cả hai vế của một bất đẳng thức với cùng một **số dương**, ta được bất đẳng thức mới **cùng chiều** với bất đẳng thức đã cho.`,
              T`– When both sides of an inequality are multiplied by the same **{positive number|positive-number}**, the new inequality has the **same direction** as the given one.`),
            p(T`– Khi nhân cả hai vế của một bất đẳng thức với cùng một **số âm**, ta được bất đẳng thức mới **ngược chiều** với bất đẳng thức đã cho.`,
              T`– When both sides of an inequality are multiplied by the same **{negative number|negative-number}**, the new inequality has the **opposite direction** to the given one.`)
          ]),
          p(T`**Với ba số $a$, $b$, $c$ và $c>0$, ta có:** nếu $a<b$ thì $ac<bc$; nếu $a\le b$ thì $ac\le bc$; nếu $a>b$ thì $ac>bc$; nếu $a\ge b$ thì $ac\ge bc$.`,
            T`**For three numbers $a$, $b$, $c$ with $c>0$:** if $a<b$ then $ac<bc$; if $a\le b$ then $ac\le bc$; if $a>b$ then $ac>bc$; if $a\ge b$ then $ac\ge bc$.`),
          p(T`**Với ba số $a$, $b$, $c$ và $c<0$, ta có:** nếu $a<b$ thì $ac>bc$; nếu $a\le b$ thì $ac\ge bc$; nếu $a>b$ thì $ac<bc$; nếu $a\ge b$ thì $ac\le bc$.`,
            T`**For three numbers $a$, $b$, $c$ with $c<0$:** if $a<b$ then $ac>bc$; if $a\le b$ then $ac\ge bc$; if $a>b$ then $ac<bc$; if $a\ge b$ then $ac\le bc$ (the sign is {reversed|reverse}).`),
          ex(5, [
            p(T`Thay $?$ trong các biểu thức sau bởi dấu thích hợp ($<$, $>$) để được khẳng định đúng: a) $3\cdot(-7)\ ?\ 3\cdot(-5)$; b) $(-3)\cdot(-7)\ ?\ (-3)\cdot(-5)$.`,
              T`Replace ? with a suitable sign ($<$ or $>$) to make a true statement: a) $3\cdot(-7)\ ?\ 3\cdot(-5)$; b) $(-3)\cdot(-7)\ ?\ (-3)\cdot(-5)$.`)
          ], [
            p(T`a) Vì $-7<-5$ và $3>0$ nên $3\cdot(-7)<3\cdot(-5)$ (nhân cả hai vế với cùng một số dương).`,
              T`a) Since $-7<-5$ and $3>0$, we get $3\cdot(-7)<3\cdot(-5)$ (both sides multiplied by the same positive number).`),
            p(T`b) Vì $-7<-5$ và $-3<0$ nên $(-3)\cdot(-7)>(-3)\cdot(-5)$ (nhân cả hai vế với cùng một số âm).`,
              T`b) Since $-7<-5$ and $-3<0$, we get $(-3)\cdot(-7)>(-3)\cdot(-5)$ (both sides multiplied by the same negative number).`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 35 */
      {
        number: 35,
        blocks: [
          lt(4, [
            p(T`Thay $?$ trong các biểu thức sau bởi dấu thích hợp ($<$, $>$) để được khẳng định đúng: a) $13\cdot(-10{,}5)\ ?\ 13\cdot 11{,}2$; b) $(-13)\cdot(-10{,}5)\ ?\ (-13)\cdot 11{,}2$.`,
              T`Replace ? with a suitable sign ($<$ or $>$): a) $13\cdot(-10.5)\ ?\ 13\cdot 11.2$; b) $(-13)\cdot(-10.5)\ ?\ (-13)\cdot 11.2$.`)
          ]),
          vd(2, [
            p(T`Một nhà tài trợ dự kiến tổ chức một buổi đi dã ngoại tập thể nhằm giúp các bạn học sinh vùng cao trải nghiệm thực tế tại một trang trại trong 1 ngày (từ 14h00 ngày hôm trước đến 12h00 ngày hôm sau). Số tiền tài trợ dự kiến là 30 triệu đồng; giá thuê các dịch vụ và phòng nghỉ là 17 triệu đồng một ngày; giá mỗi suất ăn trưa, ăn tối là 60 000 đồng và mỗi suất ăn sáng là 30 000 đồng. Hỏi có thể tổ chức cho nhiều nhất bao nhiêu bạn tham gia được?`,
              T`A sponsor plans a group outing so that students from the highlands can gain hands-on experience at a farm for one day (from 14:00 one day to 12:00 the next). The expected funding is 30 million đồng; hiring services and rooms costs 17 million đồng per day; each lunch or dinner costs 60 000 đồng and each breakfast 30 000 đồng. What is the largest number of students who can take part?`)
          ]),
          head('practice', 'Bài tập', 'Exercises'),
          bt('2.6', T`Dùng kí hiệu để viết bất đẳng thức tương ứng với mỗi trường hợp: a) $x$ nhỏ hơn hoặc bằng $-2$; b) $m$ là số âm; c) $y$ là số dương; d) $p$ lớn hơn hoặc bằng 2 024.`,
            T`Use signs to write the inequality for each case: a) $x$ is less than or equal to $-2$; b) $m$ is a negative number; c) $y$ is a positive number; d) $p$ is greater than or equal to 2 024.`),
          bt('2.7', T`Viết một bất đẳng thức phù hợp trong mỗi trường hợp: a) Bạn phải ít nhất 18 tuổi mới được phép lái ô tô; b) Xe buýt chở được tối đa 45 người; c) Mức lương tối thiểu cho một giờ làm việc của người lao động là 20 000 đồng.`,
            T`Write a suitable inequality for each case: a) You must be {at least|at-least} 18 years old to drive a car; b) A bus carries {at most|at-most} 45 people; c) The minimum wage for one working hour is 20 000 đồng.`),
          bt('2.8', T`Không thực hiện phép tính, hãy chứng minh: a) $2\cdot(-7)+2\,023<2\cdot(-1)+2\,023$; b) $(-3)\cdot(-8)+1\,975>(-3)\cdot(-7)+1\,975$.`,
            T`Without calculating, prove: a) $2\cdot(-7)+2\,023<2\cdot(-1)+2\,023$; b) $(-3)\cdot(-8)+1\,975>(-3)\cdot(-7)+1\,975$.`),
          bt('2.9', T`Cho $a<b$, hãy so sánh: a) $5a+7$ và $5b+7$; b) $-3a-9$ và $-3b-9$.`, T`Given $a<b$, compare: a) $5a+7$ and $5b+7$; b) $-3a-9$ and $-3b-9$.`),
          bt('2.10', T`So sánh hai số $a$ và $b$, nếu: a) $a+1\,954<b+1\,954$; b) $-2a>-2b$.`, T`Compare the numbers $a$ and $b$ if: a) $a+1\,954<b+1\,954$; b) $-2a>-2b$.`),
          bt('2.11', T`Chứng minh rằng: a) $-\frac{2\,023}{2\,024}>-\frac{2\,024}{2\,023}$; b) $\frac{34}{11}>\frac{26}{9}$.`, T`Prove that: a) $-\frac{2\,023}{2\,024}>-\frac{2\,024}{2\,023}$; b) $\frac{34}{11}>\frac{26}{9}$.`)
        ]
      }
    ]
  };

  /* ========================================================================
     LUYỆN TẬP CHUNG (tr. 36–37)
     ======================================================================== */
  D.lessons['toan9-ltc2'] = {
    gradeId: 9,
    number: 'LT',
    book: 'Toán 9',
    title: { vi: 'Luyện tập chung', en: 'General practice' },
    topic,
    spreadLabels: ['Phương trình chứa ẩn ở mẫu và bất đẳng thức'],
    pages: [
      /* ----------------------------------------------------------- Trang 36 */
      {
        number: 36,
        blocks: [
          { t: 'banner' },
          ex(1, [
            p(T`Giải phương trình $\frac{1}{x-1}+\frac{2}{x^2+x+1}=\frac{x^2+x}{x^3-1}$  (1).`,
              T`Solve $\frac{1}{x-1}+\frac{2}{x^2+x+1}=\frac{x^2+x}{x^3-1}$  (1).`)
          ], [
            p(T`ĐKXĐ: $x\ne 1$. Quy đồng mẫu hai vế của phương trình:`, T`Conditions of existence: $x\ne 1$. Bring both sides to a {common denominator}:`),
            m(T`\frac{(x^2+x+1)+2(x-1)}{(x-1)(x^2+x+1)}=\frac{x^2+x}{x^3-1}`),
            m(T`\frac{x^2+3x-1}{x^3-1}=\frac{x^2+x}{x^3-1}`),
            p(T`Suy ra $x^2+3x-1=x^2+x$ hay $2x-1=0$, nên $2x=1$ và $x=\frac{1}{2}$ (thoả mãn ĐKXĐ).`,
              T`Hence $x^2+3x-1=x^2+x$, that is $2x-1=0$, so $2x=1$ and $x=\frac{1}{2}$ (it satisfies the conditions of existence).`),
            p(T`Vậy phương trình (1) có nghiệm là $x=\frac{1}{2}$.`, T`So equation (1) has the {solution} $x=\frac{1}{2}$.`)
          ]),
          ex(2, [
            p(T`Giải phương trình $\frac{x}{x+3}-\frac{2}{x-3}=\frac{-2x-6}{x^2-9}$  (2).`,
              T`Solve $\frac{x}{x+3}-\frac{2}{x-3}=\frac{-2x-6}{x^2-9}$  (2).`)
          ], [
            p(T`ĐKXĐ: $x\ne 3$ và $x\ne -3$. Quy đồng mẫu hai vế của phương trình:`, T`Conditions of existence: $x\ne 3$ and $x\ne -3$. Bring both sides to a common denominator:`),
            m(T`\frac{x(x-3)-2(x+3)}{(x+3)(x-3)}=\frac{-2x-6}{x^2-9}`),
            m(T`\frac{x^2-5x-6}{x^2-9}=\frac{-2x-6}{x^2-9}`),
            p(T`Suy ra $x^2-5x-6=-2x-6$ hay $x^2-3x=0$. Giải phương trình $x(x-3)=0$: $x=0$ (thoả mãn ĐKXĐ) hoặc $x=3$ (không thoả mãn ĐKXĐ).`,
              T`Hence $x^2-5x-6=-2x-6$, that is $x^2-3x=0$. Solving $x(x-3)=0$ gives $x=0$ (satisfies the conditions of existence) or $x=3$ (does not).`),
            p(T`Vậy phương trình (2) có nghiệm là $x=0$.`, T`So equation (2) has the {solution} $x=0$.`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 37 */
      {
        number: 37,
        blocks: [
          ex(3, [
            p(T`Cho $a<b$. Chứng minh rằng: a) $2a+1<2b+2$; b) $-2a-5>-2b-7$.`, T`Given $a<b$, prove that: a) $2a+1<2b+2$; b) $-2a-5>-2b-7$.`)
          ], [
            p(T`a) Từ $a<b$, ta có $2a<2b$. Suy ra $2a+1<2b+1$.  (1)  Vì $1<2$ nên $2b+1<2b+2$.  (2)  Theo tính chất bắc cầu, từ (1) và (2) suy ra $2a+1<2b+2$.`,
              T`a) From $a<b$ we get $2a<2b$, so $2a+1<2b+1$.  (1)  Since $1<2$, we have $2b+1<2b+2$.  (2)  By the {transitive property}, (1) and (2) give $2a+1<2b+2$.`),
            p(T`b) Từ $a<b$, ta có $-2a>-2b$. Suy ra $-2a-5>-2b-5$.  (3)  Vì $-5>-7$ nên $-2b-5>-2b-7$.  (4)  Theo tính chất bắc cầu, từ (3) và (4) suy ra $-2a-5>-2b-7$.`,
              T`b) From $a<b$ we get $-2a>-2b$ (the sign is reversed), so $-2a-5>-2b-5$.  (3)  Since $-5>-7$, we have $-2b-5>-2b-7$.  (4)  By the transitive property, (3) and (4) give $-2a-5>-2b-7$.`)
          ]),
          head('practice', 'Bài tập', 'Exercises'),
          bt('2.12', T`Giải các phương trình: a) $2(x+1)=(5x-1)(x+1)$; b) $(-4x+3)x=(2x+5)x$.`, T`Solve: a) $2(x+1)=(5x-1)(x+1)$; b) $(-4x+3)x=(2x+5)x$.`),
          bt('2.13', T`Để loại bỏ $x\%$ một loại tảo độc khỏi một hồ nước, người ta ước tính chi phí cần bỏ ra là $C(x)=\frac{50x}{100-x}$ (triệu đồng), với $0\le x<100$. Nếu bỏ ra 450 triệu đồng, người ta có thể loại bỏ được bao nhiêu phần trăm loại tảo độc đó?`,
            T`To remove $x\%$ of a toxic alga from a lake, the estimated cost is $C(x)=\frac{50x}{100-x}$ (million đồng), with $0\le x<100$. If 450 million đồng is spent, what percentage of the alga can be removed?`),
          bt('2.14', T`Giải các phương trình: a) $\frac{1}{x+2}-\frac{2}{x^2-2x+4}=\frac{x-4}{x^3+8}$; b) $\frac{2x}{x-4}+\frac{3}{x+4}=\frac{x-12}{x^2-16}$.`,
            T`Solve: a) $\frac{1}{x+2}-\frac{2}{x^2-2x+4}=\frac{x-4}{x^3+8}$; b) $\frac{2x}{x-4}+\frac{3}{x+4}=\frac{x-12}{x^2-16}$.`),
          bt('2.15', T`Cho $a>b$, chứng minh rằng: a) $4a+4>4b+3$; b) $1-3a<3-3b$.`, T`Given $a>b$, prove that: a) $4a+4>4b+3$; b) $1-3a<3-3b$.`)
        ]
      }
    ]
  };

  /* ========================================================================
     BÀI 6. BẤT PHƯƠNG TRÌNH BẬC NHẤT MỘT ẨN
     ======================================================================== */
  D.lessons['toan9-bai6'] = {
    gradeId: 9,
    number: '6',
    book: 'Toán 9',
    title: { vi: 'Bất phương trình bậc nhất một ẩn', en: 'Linear inequalities in one unknown' },
    topic,
    spreadLabels: [
      'Khái niệm và nghiệm của bất phương trình',
      'Cách giải, ví dụ và bài tập'
    ],
    pages: [
      /* ----------------------------------------------------------- Trang 38 */
      {
        number: 38,
        blocks: [
          { t: 'banner' },
          goals(
            it(T`Nhận biết khái niệm bất phương trình bậc nhất một ẩn.`, T`Recognise a {linear inequality} in one {unknown|unknown}.`),
            it(T`Hiểu khái niệm nghiệm của bất phương trình bậc nhất một ẩn.`, T`Understand a {solution of an inequality|solution-of-inequality}.`),
            it(T`Giải được bất phương trình bậc nhất một ẩn.`, T`Solve a linear inequality in one unknown.`)
          ),
          p(T`Bạn Thanh có 100 nghìn đồng. Bạn muốn mua một cái bút giá 18 nghìn đồng và một số quyển vở, mỗi quyển vở giá 7 nghìn đồng. Hỏi bạn Thanh mua được nhiều nhất bao nhiêu quyển vở?`,
            T`Thanh has 100 thousand đồng. She wants to buy a pen costing 18 thousand and some notebooks at 7 thousand each. What is the largest number of notebooks she can buy?`, { badge: 'book' }),
          h2('1', 'Khái niệm bất phương trình bậc nhất một ẩn', 'Linear inequalities in one unknown'),
          p(T`Trong bài toán ở tình huống mở đầu, gọi $x$ (quyển) là số vở mà Thanh có thể mua ($x\in\mathbb{N}^*$) thì $x$ phải thoả mãn hệ thức $7x+18\le 100$. Khi đó ta nói hệ thức $7x+18\le 100$ là **bất phương trình** với ẩn là $x$.`,
            T`In the opening problem, let $x$ (notebooks) be the number she can buy ($x\in\mathbb{N}^*$). Then $x$ must satisfy $7x+18\le 100$. We say that $7x+18\le 100$ is an **inequality** in the unknown $x$.`, { badge: 'book' }),
          p(T`Trong bất phương trình này, ta gọi $7x+18$ là **vế trái**, $100$ là **vế phải**. Ta có thể biến đổi bất phương trình này về dạng $7x-82\le 0$. Hệ thức này là bất phương trình bậc nhất với ẩn là $x$.`,
            T`Here $7x+18$ is the **{left-hand side}** and $100$ is the **{right-hand side}**. We can rewrite it as $7x-82\le 0$. This relation is a linear inequality in the unknown $x$.`),
          key([
            p(T`Bất phương trình dạng $ax+b<0$ (hoặc $ax+b>0$; $ax+b\le 0$; $ax+b\ge 0$), trong đó $a$, $b$ là hai số đã cho, $a\ne 0$, được gọi là **bất phương trình bậc nhất một ẩn** $x$.`,
              T`An inequality of the form $ax+b<0$ (or $ax+b>0$; $ax+b\le 0$; $ax+b\ge 0$), where $a$ and $b$ are given numbers and $a\ne 0$, is called a **{linear inequality} in one unknown** $x$.`)
          ]),
          ex(1, [
            p(T`Bất phương trình nào sau đây là bất phương trình bậc nhất một ẩn $x$? a) $3x+16\le 0$; b) $-5x+5>0$; c) $x^2-4>0$; d) $-3x<0$.`,
              T`Which of these is a linear inequality in the unknown $x$? a) $3x+16\le 0$; b) $-5x+5>0$; c) $x^2-4>0$; d) $-3x<0$.`)
          ], [
            p(T`Các bất phương trình ở câu a), b), d) là bất phương trình bậc nhất một ẩn $x$. Bất phương trình ở câu c) không phải vì $x^2-4$ là một đa thức bậc hai.`,
              T`The inequalities in a), b), d) are linear in $x$. The one in c) is not, because $x^2-4$ is a polynomial of degree two.`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 39 */
      {
        number: 39,
        blocks: [
          lt(1, [
            p(T`Bất phương trình nào sau đây là bất phương trình bậc nhất một ẩn $x$? a) $-3x+7\le 0$; b) $4x-\frac{3}{2}>0$; c) $x^3>0$.`,
              T`Which of these is a linear inequality in the unknown $x$? a) $-3x+7\le 0$; b) $4x-\frac{3}{2}>0$; c) $x^3>0$.`)
          ]),
          p(T`**Nghiệm của bất phương trình.** Xét bất phương trình $3x+8<20$. Khi thay $x=\frac{4}{3}$ vào, ta được $3\cdot\frac{4}{3}+8<20$ là một khẳng định đúng. Ta nói số $\frac{4}{3}$ (hay giá trị $x=\frac{4}{3}$) là một **nghiệm** của bất phương trình. Khi thay $x=5$ vào, ta được $3\cdot 5+8<20$ là một khẳng định sai; ta nói số 5 không phải là nghiệm của bất phương trình.`,
            T`**Solutions of an inequality.** Take $3x+8<20$. Putting $x=\frac{4}{3}$ gives $3\cdot\frac{4}{3}+8<20$, a true statement. We say $\frac{4}{3}$ (or the value $x=\frac{4}{3}$) is a **{solution of the inequality|solution-of-inequality}**. Putting $x=5$ gives $3\cdot 5+8<20$, a false statement, so 5 is not a solution.`),
          key([
            p(T`• Số $x_0$ là một nghiệm của bất phương trình $A(x)<B(x)$ nếu $A(x_0)<B(x_0)$ là khẳng định đúng.`,
              T`• A number $x_0$ is a {solution of the inequality|solution-of-inequality} $A(x)<B(x)$ if $A(x_0)<B(x_0)$ is a true statement.`),
            p(T`• Giải một bất phương trình là tìm tất cả các nghiệm của bất phương trình đó.`,
              T`• To solve an inequality is to find all of its solutions.`)
          ]),
          lt(2, [
            p(T`Trong các số $-2$; $0$; $5$, những số nào là nghiệm của bất phương trình $2x-10<0$?`,
              T`Which of the numbers $-2$, $0$, $5$ are solutions of the inequality $2x-10<0$?`)
          ]),
          h2('2', 'Cách giải bất phương trình bậc nhất một ẩn', 'Solving a linear inequality'),
          act(1, { vi: 'Cách giải bất phương trình bậc nhất một ẩn', en: 'How to solve a linear inequality' },
            T`Xét bất phương trình $5x+3<0$  (1). Hãy thực hiện các yêu cầu sau để giải bất phương trình (1):`,
            T`Consider $5x+3<0$  (1). Carry out these tasks to solve it:`,
            [
              it(T`Sử dụng tính chất của bất đẳng thức, cộng vào hai vế của bất phương trình (1) với $-3$, ta được một bất phương trình, kí hiệu là (2).`,
                T`Using the properties of inequalities, add $-3$ to both sides of (1) to get an inequality, call it (2).`),
              it(T`Sử dụng tính chất của bất đẳng thức, nhân vào hai vế của bất phương trình (2) với $\frac{1}{5}$ (tức là chia cả hai vế cho hệ số của $x$ là 5) để tìm nghiệm của bất phương trình.`,
                T`Using the properties of inequalities, multiply both sides of (2) by $\frac{1}{5}$ (that is, divide both sides by the {coefficient} of $x$, which is 5) to find the solutions.`)
            ]),
          key([
            p(T`Bất phương trình bậc nhất một ẩn $ax+b<0$ ($a\ne 0$) được giải như sau: từ $ax+b<0$ suy ra $ax<-b$. Khi đó:`,
              T`A linear inequality $ax+b<0$ ($a\ne 0$) is solved like this: from $ax+b<0$ we get $ax<-b$. Then:`),
            { t: 'list', items: [
              it(T`Nếu $a>0$ thì $x<-\frac{b}{a}$.`, T`if $a>0$ then $x<-\frac{b}{a}$;`),
              it(T`Nếu $a<0$ thì $x>-\frac{b}{a}$.`, T`if $a<0$ then $x>-\frac{b}{a}$ (the sign is {reversed|reverse}).`)
            ] }
          ]),
          tip({
            vi: T`**Chú ý.** Các bất phương trình $ax+b>0$, $ax+b\le 0$, $ax+b\ge 0$ được giải tương tự.`,
            en: T`**Note.** The inequalities $ax+b>0$, $ax+b\le 0$ and $ax+b\ge 0$ are solved in the same way.`
          })
        ]
      },

      /* ----------------------------------------------------------- Trang 40 */
      {
        number: 40,
        blocks: [
          ex(2, [
            p(T`Giải bất phương trình $-2x-4>0$.`, T`Solve $-2x-4>0$.`)
          ], [
            p(T`Ta có $-2x-4>0$, nên $-2x>0+4$ (cộng hai vế với 4), tức là $-2x>4$.`, T`We have $-2x-4>0$, so $-2x>0+4$ (add 4 to both sides), that is $-2x>4$.`),
            p(T`Nhân hai vế với số âm $-\frac{1}{2}$ và đổi chiều bất đẳng thức: $x<4\cdot\left(-\frac{1}{2}\right)$, tức là $x<-2$.`,
              T`Multiply both sides by the negative number $-\frac{1}{2}$ and reverse the sign: $x<4\cdot\left(-\frac{1}{2}\right)$, that is $x<-2$.`),
            p(T`Vậy nghiệm của bất phương trình là $x<-2$.`, T`So the solution of the inequality is $x<-2$.`)
          ]),
          lt(3, [
            p(T`Giải các bất phương trình: a) $6x+5<0$; b) $-2x-7>0$.`, T`Solve: a) $6x+5<0$; b) $-2x-7>0$.`)
          ]),
          ex(3, [
            p(T`Giải bài toán ở tình huống mở đầu.`, T`Solve the problem from the opening situation.`)
          ], [
            p(T`Gọi $x$ (quyển) là số vở mà Thanh có thể mua. Theo bài ra, ta có bất phương trình $7x+18\le 100$. Khi đó $7x\le 100-18$, tức là $7x\le 82$, suy ra $x\le\frac{82}{7}$.`,
              T`Let $x$ (notebooks) be the number she can buy. By the problem, $7x+18\le 100$. Then $7x\le 100-18$, that is $7x\le 82$, so $x\le\frac{82}{7}$.`),
            p(T`Vì số vở là số tự nhiên nên Thanh có thể mua nhiều nhất 11 quyển vở.`, T`Since the number of notebooks is a {natural number|natural-number}, Thanh can buy at most 11 notebooks.`)
          ]),
          tip({
            vi: T`**Chú ý.** Ta cũng giải được các bất phương trình một ẩn đưa được về dạng $ax+b<0$, $ax+b>0$, $ax+b\le 0$, $ax+b\ge 0$.`,
            en: T`**Note.** We can also solve inequalities in one unknown that can be brought to the form $ax+b<0$, $ax+b>0$, $ax+b\le 0$ or $ax+b\ge 0$.`
          }),
          ex(4, [
            p(T`Giải các bất phương trình: a) $2x+5<3x-4$; b) $-3x+5\ge -4x+3$.`, T`Solve: a) $2x+5<3x-4$; b) $-3x+5\ge -4x+3$.`)
          ], [
            p(T`a) Ta có $2x+5<3x-4$, nên $2x-3x<-4-5$, tức là $-x<-9$, suy ra $x>9$. Vậy nghiệm là $x>9$.`,
              T`a) From $2x+5<3x-4$ we get $2x-3x<-4-5$, that is $-x<-9$, so $x>9$. The solution is $x>9$.`),
            p(T`b) Ta có $-3x+5\ge -4x+3$, nên $-3x+4x\ge 3-5$, suy ra $x\ge -2$. Vậy nghiệm là $x\ge -2$.`,
              T`b) From $-3x+5\ge -4x+3$ we get $-3x+4x\ge 3-5$, so $x\ge -2$. The solution is $x\ge -2$.`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 41 */
      {
        number: 41,
        blocks: [
          ex(5, [
            p(T`Một ngân hàng đang áp dụng lãi suất gửi tiết kiệm kì hạn 12 tháng là 7,4%/năm. Bà Mai dự kiến gửi một khoản tiền vào ngân hàng này và cần số tiền lãi hằng năm ít nhất là 60 triệu để chi tiêu. Hỏi số tiền bà Mai cần gửi tiết kiệm ít nhất là bao nhiêu (làm tròn đến triệu đồng)?`,
              T`A bank offers a 12-month savings interest rate of 7.4% per year. Ms Mai plans to deposit a sum of money and needs yearly interest of {at least|at-least} 60 million to spend. What is the smallest amount she must deposit (rounded to a million đồng)?`)
          ], [
            p(T`Gọi $x$ (triệu đồng) là số tiền bà Mai cần gửi. Tiền lãi trong một năm là $0{,}074\cdot x$ (triệu đồng). Để có tiền lãi ít nhất là 60 triệu đồng/năm thì phải có $0{,}074x\ge 60$.`,
              T`Let $x$ (million đồng) be the amount to deposit. The interest in one year is $0.074\cdot x$ (million đồng). To get at least 60 million a year we need $0.074x\ge 60$.`),
            p(T`Suy ra $x\ge 60:0{,}074$, tức là $x\ge 810{,}81$. Vậy bà Mai cần gửi ngân hàng ít nhất 811 triệu đồng.`,
              T`So $x\ge 60:0.074$, that is $x\ge 810.81$. Ms Mai must deposit at least 811 million đồng.`)
          ]),
          lt(4, [
            p(T`Giải các bất phương trình sau: a) $5x+7>8x-5$; b) $-4x+3\le 3x-1$.`, T`Solve: a) $5x+7>8x-5$; b) $-4x+3\le 3x-1$.`)
          ]),
          vd('', [
            p(T`Trong một cuộc thi tuyển dụng việc làm, ban tổ chức quy định mỗi người ứng tuyển phải trả lời 25 câu hỏi ở vòng sơ tuyển. Mỗi câu hỏi này có sẵn bốn đáp án, trong đó chỉ có một đáp án đúng. Người ứng tuyển chọn đáp án đúng sẽ được cộng thêm 2 điểm, chọn đáp án sai bị trừ đi 1 điểm. Ở vòng sơ tuyển, ban tổ chức tặng cho mỗi người dự thi 5 điểm và theo quy định người ứng tuyển phải trả lời hết 25 câu hỏi; người nào có số điểm từ 25 trở lên mới được dự thi vòng tiếp theo. Hỏi người ứng tuyển phải trả lời chính xác ít nhất bao nhiêu câu hỏi ở vòng sơ tuyển thì mới được vào vòng tiếp theo?`,
              T`In a job recruitment contest, each applicant must answer 25 questions in the first round. Each question has four options and only one is correct. A correct answer adds 2 points; a wrong answer takes away 1 point. Each contestant starts with 5 points, must answer all 25 questions, and needs a score of 25 or more to go to the next round. What is the smallest number of questions an applicant must answer correctly to go through?`)
          ]),
          head('practice', 'Bài tập', 'Exercises'),
          bt('2.16', T`Giải các bất phương trình: a) $x-5\ge 0$; b) $x+5\le 0$; c) $-2x-6>0$; d) $4x-12<0$.`, T`Solve: a) $x-5\ge 0$; b) $x+5\le 0$; c) $-2x-6>0$; d) $4x-12<0$.`),
          bt('2.17', T`Giải các bất phương trình: a) $3x+2>2x+3$; b) $5x+4<-3x-2$.`, T`Solve: a) $3x+2>2x+3$; b) $5x+4<-3x-2$.`),
          bt('2.18', T`Một ngân hàng đang áp dụng lãi suất gửi tiết kiệm kì hạn 1 tháng là 0,4%/tháng. Hỏi nếu muốn có số tiền lãi hằng tháng ít nhất là 3 triệu đồng thì số tiền gửi tiết kiệm ít nhất là bao nhiêu (làm tròn đến triệu đồng)?`,
            T`A bank offers a 1-month savings rate of 0.4% per month. To get monthly interest of at least 3 million đồng, what is the smallest deposit (rounded to a million đồng)?`),
          bt('2.19', T`Một hãng taxi có giá mở cửa là 15 nghìn đồng và giá 12 nghìn đồng cho mỗi kilômét tiếp theo. Hỏi với 200 nghìn đồng thì hành khách có thể di chuyển được tối đa bao nhiêu kilômét (làm tròn đến hàng đơn vị)?`,
            T`A taxi company charges 15 thousand đồng to start and 12 thousand đồng for each further kilometre. With 200 thousand đồng, what is the greatest distance a passenger can travel (rounded to the unit)?`),
          bt('2.20', T`Người ta dùng một loại xe tải để chở sữa tươi cho một nhà máy. Biết mỗi thùng sữa loại 180 ml nặng trung bình 10 kg. Theo khuyến nghị, trọng tải của xe (tức là tổng khối lượng tối đa cho phép mà xe có thể chở) là 5,25 tấn. Hỏi xe có thể chở được tối đa bao nhiêu thùng sữa như vậy, biết bác lái xe nặng 65 kg?`,
            T`A type of lorry carries fresh milk to a factory. Each 180 ml carton box weighs about 10 kg. The recommended load capacity (the greatest total mass the lorry may carry) is 5.25 tonnes. What is the largest number of such boxes it can carry, given that the driver weighs 65 kg?`)
        ]
      }
    ]
  };

  /* ========================================================================
     BÀI TẬP CUỐI CHƯƠNG II (tr. 42–43)
     ======================================================================== */
  D.lessons['toan9-btcc2'] = {
    gradeId: 9,
    number: 'BT',
    book: 'Toán 9',
    title: { vi: 'Bài tập cuối chương II', en: 'End-of-chapter exercises' },
    topic,
    spreadLabels: ['Trắc nghiệm, tự luận và Em có biết'],
    pages: [
      /* ----------------------------------------------------------- Trang 42 */
      {
        number: 42,
        blocks: [
          { t: 'banner' },
          head('practice', 'A. Trắc nghiệm', 'A. Multiple choice'),
          bt('2.21', T`Nghiệm của bất phương trình $-2x+1<0$ là: A. $x<\frac{1}{2}$; B. $x>\frac{1}{2}$; C. $x\le\frac{1}{2}$; D. $x\ge\frac{1}{2}$.`,
            T`The solution of $-2x+1<0$ is: A. $x<\frac{1}{2}$; B. $x>\frac{1}{2}$; C. $x\le\frac{1}{2}$; D. $x\ge\frac{1}{2}$.`),
          bt('2.22', T`Điều kiện xác định của phương trình $\frac{x}{2x+1}+\frac{3}{x-5}=\frac{x}{(2x+1)(x-5)}$ là: A. $x\ne-\frac{1}{2}$; B. $x\ne-\frac{1}{2}$ và $x\ne-5$; C. $x\ne 5$; D. $x\ne-\frac{1}{2}$ và $x\ne 5$.`,
            T`The {conditions of existence|conditions-of-existence} of $\frac{x}{2x+1}+\frac{3}{x-5}=\frac{x}{(2x+1)(x-5)}$ are: A. $x\ne-\frac{1}{2}$; B. $x\ne-\frac{1}{2}$ and $x\ne-5$; C. $x\ne 5$; D. $x\ne-\frac{1}{2}$ and $x\ne 5$.`),
          bt('2.23', T`Phương trình $x-1=m+4$ có nghiệm lớn hơn 1 với: A. $m\ge-4$; B. $m\le 4$; C. $m>-4$; D. $m<-4$.`,
            T`The equation $x-1=m+4$ has a solution greater than 1 when: A. $m\ge-4$; B. $m\le 4$; C. $m>-4$; D. $m<-4$.`),
          bt('2.24', T`Nghiệm của bất phương trình $1-2x\ge 2-x$ là: A. $x>\frac{1}{2}$; B. $x<\frac{1}{2}$; C. $x\le-1$; D. $x\ge-1$.`,
            T`The solution of $1-2x\ge 2-x$ is: A. $x>\frac{1}{2}$; B. $x<\frac{1}{2}$; C. $x\le-1$; D. $x\ge-1$.`),
          bt('2.25', T`Cho $a>b$. Khi đó ta có: A. $2a>3b$; B. $2a>2b+1$; C. $5a+1>5b+1$; D. $-3a<-3b-3$.`,
            T`Given $a>b$, we have: A. $2a>3b$; B. $2a>2b+1$; C. $5a+1>5b+1$; D. $-3a<-3b-3$.`),
          head('practice', 'B. Tự luận', 'B. Written problems'),
          bt('2.26', T`Giải các phương trình: a) $(3x-1)^2-(x+2)^2=0$; b) $x(x+1)=2(x^2-1)$.`, T`Solve: a) $(3x-1)^2-(x+2)^2=0$; b) $x(x+1)=2(x^2-1)$.`),
          bt('2.27', T`Giải các phương trình: a) $\frac{x}{x-5}-\frac{2}{x+5}=\frac{x^2}{x^2-25}$; b) $\frac{1}{x+1}-\frac{x}{x^2-x+1}=\frac{3}{x^3+1}$.`,
            T`Solve: a) $\frac{x}{x-5}-\frac{2}{x+5}=\frac{x^2}{x^2-25}$; b) $\frac{1}{x+1}-\frac{x}{x^2-x+1}=\frac{3}{x^3+1}$.`),
          bt('2.28', T`Cho $a<b$, hãy so sánh: a) $a+b+5$ với $2b+5$; b) $-2a-3$ với $-(a+b)-3$.`, T`Given $a<b$, compare: a) $a+b+5$ with $2b+5$; b) $-2a-3$ with $-(a+b)-3$.`),
          bt('2.29', T`Giải các bất phương trình: a) $2x+3(x+1)>5x-(2x-4)$; b) $(x+1)(2x-1)<2x^2-4x+1$.`, T`Solve: a) $2x+3(x+1)>5x-(2x-4)$; b) $(x+1)(2x-1)<2x^2-4x+1$.`),
          bt('2.30', T`Một hãng viễn thông nước ngoài có hai gói cước. Gói cước A: cước thuê bao hằng tháng 32 USD, 45 phút miễn phí, 0,4 USD cho mỗi phút thêm. Gói cước B: cước thuê bao hằng tháng 44 USD, không có phút miễn phí, 0,25 USD/phút.`,
            T`A foreign telecom company has two plans. Plan A: monthly fee 32 USD, 45 free minutes, 0.4 USD for each extra minute. Plan B: monthly fee 44 USD, no free minutes, 0.25 USD per minute.`)
        ]
      },

      /* ----------------------------------------------------------- Trang 43 */
      {
        number: 43,
        blocks: [
          p(T`a) Hãy viết một phương trình xác định thời gian gọi (phút) mà phí phải trả trong cùng một tháng của hai gói cước là như nhau và giải phương trình đó. b) Nếu khách hàng chỉ gọi tối đa là 180 phút trong 1 tháng thì nên dùng gói cước nào? Nếu khách hàng gọi 500 phút trong 1 tháng thì nên dùng gói cước nào?`,
            T`a) Write an equation for the call time (minutes) at which the monthly cost of the two plans is the same, and solve it. b) If a customer calls at most 180 minutes a month, which plan should they use? If they call 500 minutes a month, which plan should they use?`),
          bt('2.31', T`Thanh tham dự một kì kiểm tra năng lực tiếng Anh gồm 4 bài kiểm tra nghe, nói, đọc và viết. Mỗi bài kiểm tra có điểm là số nguyên từ 0 đến 10. Điểm trung bình của ba bài kiểm tra nghe, nói, đọc của Thanh là 6,7. Hỏi bài kiểm tra viết của Thanh cần được bao nhiêu điểm để điểm trung bình cả 4 bài kiểm tra được từ 7,0 trở lên? Biết điểm trung bình được tính gần đúng đến chữ số thập phân thứ nhất.`,
            T`Thanh takes an English proficiency test made of 4 tests: listening, speaking, reading and writing. Each test is scored with an integer from 0 to 10. Her {arithmetic mean|arithmetic-mean} on the listening, speaking and reading tests is 6.7. What score does she need on the writing test for the mean of all 4 tests to be 7.0 or more? The mean is rounded to one decimal place.`),
          bt('2.32', T`Để lập đội tuyển năng khiếu về bóng rổ của trường, thầy thể dục đưa ra quy định tuyển chọn như sau: mỗi bạn dự tuyển sẽ được ném 15 quả bóng vào rổ, quả bóng vào rổ được cộng 2 điểm; quả bóng ném ra ngoài bị trừ 1 điểm. Nếu bạn nào có số điểm từ 15 điểm trở lên thì sẽ được chọn vào đội tuyển. Hỏi một học sinh muốn được chọn vào đội tuyển thì phải ném ít nhất bao nhiêu quả vào rổ?`,
            T`To form the school basketball team, the PE teacher sets these rules: each candidate throws 15 balls at the basket; a ball in the basket scores 2 points and a ball that misses loses 1 point. A candidate with 15 points or more is chosen. At least how many balls must a student put in the basket to be chosen?`),
          head('extra', 'Em có biết? (Đọc thêm)', 'Did you know? (Further reading)'),
          p(T`**Bất đẳng thức giữa trung bình cộng và trung bình nhân.** Cho hai số $a$, $b\ge 0$. Trung bình cộng của hai số là $\frac{a+b}{2}$; trung bình nhân của hai số là $\sqrt{ab}$. Khi đó ta luôn có`,
            T`**The inequality between the arithmetic and geometric means.** For two numbers $a$, $b\ge 0$, the {arithmetic mean|arithmetic-mean} is $\frac{a+b}{2}$ and the {geometric mean|geometric-mean} is $\sqrt{ab}$. Then we always have`),
          m(T`\frac{a+b}{2}\ge\sqrt{ab}`, '(1)'),
          p(T`Bất đẳng thức (1) được gọi là bất đẳng thức giữa trung bình cộng và trung bình nhân cho hai số không âm $a$ và $b$ (thường viết tắt là *AM-GM*). Ta cũng thường gọi bất đẳng thức trên là bất đẳng thức Cauchy.`,
            T`Inequality (1) is the inequality between the arithmetic and geometric means for two non-negative numbers $a$ and $b$ (usually abbreviated *AM-GM*). It is also often called the Cauchy inequality.`),
          p(T`Cauchy (1789–1857) là một nhà toán học Pháp, giáo sư của Đại học Bách khoa Paris và Viện sĩ Viện hàn lâm khoa học Pháp. Ông có nhiều công trình nghiên cứu toán học có giá trị trong Giải tích, Đại số, Số học, Hệ động lực,…`,
            T`Cauchy (1789–1857) was a French mathematician, a professor at the École Polytechnique in Paris and a member of the French Academy of Sciences. He produced valuable work in Analysis, Algebra, Number Theory, Dynamical Systems and other fields.`)
        ]
      }
    ]
  };
})();
