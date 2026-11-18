/* ==========================================================================
   TOÁN 9 (TẬP MỘT) — CHƯƠNG III: CĂN BẬC HAI VÀ CĂN BẬC BA
   --------------------------------------------------------------------------
   Các bài trong file này (mỗi bài một mục trong TEXTBOOK.lessons):

     'toan9-bai7'   Bài 7.  Căn bậc hai và căn thức bậc hai                    (tr. 44–48)
     'toan9-bai8'   Bài 8.  Khai căn bậc hai với phép nhân và phép chia         (tr. 49–51)
     'toan9-ltc3a'  Luyện tập chung                                             (tr. 52–53)
     'toan9-bai9'   Bài 9.  Biến đổi đơn giản và rút gọn biểu thức chứa căn
                            thức bậc hai                                        (tr. 54–59)
     'toan9-bai10'  Bài 10. Căn bậc ba và căn thức bậc ba                       (tr. 60–62)
     'toan9-ltc3b'  Luyện tập chung                                             (tr. 63–64)
     'toan9-btcc3'  Bài tập cuối chương III                                     (tr. 65)

   Lời văn được biên soạn lại, không chép nguyên văn sách giáo khoa.
   Số liệu của các ví dụ, bài tập giữ nguyên để kiểm tra được kết quả.

   QUY ƯỚC VIẾT NỘI DUNG (giống các file Toán 9 trước)
   • Mỗi chuỗi dùng T`...` (String.raw) để viết LaTeX không phải gõ gấp đôi dấu \.
   • Công thức viết trong $...$: $\sqrt{A}$, $\sqrt[3]{a}$, $\frac{C}{\sqrt{A}+B}$,
     $|a|$, $A\ge 0$, $x\ne 1$. Căn bậc ba viết \sqrt[3]{...}.
   • Thuật ngữ tiếng Anh viết {radicand}; nếu chữ hiển thị khác khoá thì
     {radical expressions|radical-expression}. App đổi thành
       <span class="vocab" data-key="radical-expression">…</span>
     (gạch chân nét đứt, bấm để xem IPA, nghĩa, ví dụ, nghe phát âm).
   • **đậm**, *nghiêng*, [[√]] là phím máy tính.
   • Từ điển nằm ngay đầu file (Object.assign vào TEXTBOOK.glossary); phần giải
     nghĩa luôn bắt đầu bằng "Trong Toán: …".
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
    'square-root': g('square root', '/skweə ruːt/', 'n', 'căn bậc hai',
      'Trong Toán: Số x thoả mãn x² = a. Số a > 0 có hai căn bậc hai đối nhau; căn bậc hai số học là căn không âm, kí hiệu √a.',
      'The square roots of 9 are 3 and −3; the principal square root is 3.', 'Hai căn bậc hai của 9 là 3 và −3; căn bậc hai số học là 3.'),
    'radical-expression': g('radical expression', '/ˈræd.ɪ.kəl ɪkˈspreʃ.ən/', 'n', 'căn thức bậc hai',
      'Trong Toán: Biểu thức có dạng √A, trong đó A là một biểu thức đại số. Còn gọi là square-root expression.',
      '√(x − 2) is a radical expression.', '√(x − 2) là một căn thức bậc hai.'),
    radicand: g('radicand', '/ˈræd.ɪ.kænd/', 'n', 'biểu thức lấy căn, biểu thức dưới dấu căn',
      'Trong Toán: Biểu thức nằm dưới dấu căn. Trong √(x − 2) biểu thức lấy căn là x − 2.',
      'The radicand must be non-negative for √A to be defined.', 'Biểu thức lấy căn phải không âm thì √A mới xác định.'),
    'absolute-value': g('absolute value', '/ˈæb.sə.luːt ˈvæl.juː/', 'n', 'giá trị tuyệt đối',
      'Trong Toán: Khoảng cách từ một số đến 0 trên trục số, kí hiệu |a|; luôn không âm. Ta có √(A²) = |A|.',
      'The absolute value of −3 is 3.', 'Giá trị tuyệt đối của −3 là 3.'),
    identity: g('identity', '/aɪˈden.tə.ti/', 'n', 'hằng đẳng thức',
      'Trong Toán: Đẳng thức đúng với mọi giá trị của các biến, như (a + b)(a − b) = a² − b² hay √(A²) = |A|.',
      'The identity √(A²) = |A| holds for every A.', 'Hằng đẳng thức √(A²) = |A| đúng với mọi A.'),
    'radical-operations': g('multiplication and division of radicals', '/ˌmʌl.tɪ.plɪˈkeɪ.ʃən ənd dɪˈvɪʒ.ən əv ˈræd.ɪ.kəlz/', 'n', 'phép nhân và phép chia căn thức',
      'Trong Toán: Hai quy tắc √A·√B = √(AB) và √A/√B = √(A/B), áp dụng khi các biểu thức dưới căn thích hợp không âm.',
      'Multiplication of radicals: √2·√8 = √16 = 4.', 'Nhân căn thức: √2·√8 = √16 = 4.'),
    'factor-outside': g('bring a factor outside the root', '/brɪŋ ə ˈfæk.tər ˌaʊtˈsaɪd ðə ruːt/', 'v', 'đưa thừa số ra ngoài dấu căn',
      'Trong Toán: Biến đổi √(a²b) = |a|√b, ví dụ √45 = √(3²·5) = 3√5.',
      'Bringing a factor outside the root gives √12 = 2√3.', 'Đưa thừa số ra ngoài dấu căn cho √12 = 2√3.'),
    'factor-inside': g('bring a factor inside the root', '/brɪŋ ə ˈfæk.tər ˌɪnˈsaɪd ðə ruːt/', 'v', 'đưa thừa số vào trong dấu căn',
      'Trong Toán: Biến đổi a√b = √(a²b) khi a ≥ 0 và a√b = −√(a²b) khi a < 0.',
      'Bringing the factor inside the root gives 3√2 = √18.', 'Đưa thừa số vào trong dấu căn cho 3√2 = √18.'),
    'eliminate-denominator': g('eliminate the denominator', '/ɪˈlɪm.ɪ.neɪt ðə dɪˈnɒm.ɪ.neɪ.tər/', 'v', 'khử mẫu (của biểu thức lấy căn)',
      'Trong Toán: Biến đổi căn thức để biểu thức dưới dấu căn không còn mẫu, ví dụ √(4/7) = 2√7/7.',
      'We eliminate the denominator of √(3/5) by multiplying by 5/5.', 'Ta khử mẫu của √(3/5) bằng cách nhân với 5/5.'),
    rationalise: g('rationalise the denominator', '/ˈræʃ.ən.əl.aɪz ðə dɪˈnɒm.ɪ.neɪ.tər/', 'v', 'trục căn thức ở mẫu',
      'Trong Toán: Biến đổi một biểu thức thành biểu thức mới không còn căn ở mẫu, ví dụ 1/√2 = √2/2.',
      'To rationalise 1/√2, multiply the top and bottom by √2.', 'Để trục căn thức ở mẫu của 1/√2, nhân cả tử và mẫu với √2.'),
    conjugate: g('conjugate expressions', '/ˈkɒn.dʒə.ɡət ɪkˈspreʃ.ənz/', 'n', 'biểu thức liên hợp',
      'Trong Toán: Hai biểu thức chỉ khác dấu giữa hai số hạng, như √A + B và √A − B; tích của chúng không còn căn: A − B².',
      'The conjugate of 3 + 2√2 is 3 − 2√2.', 'Biểu thức liên hợp của 3 + 2√2 là 3 − 2√2.'),
    'cube-root': g('cube root', '/kjuːb ruːt/', 'n', 'căn bậc ba',
      'Trong Toán: Số x thoả mãn x³ = a, kí hiệu ∛a. Mọi số thực a đều có đúng một căn bậc ba.',
      'The cube root of −27 is −3.', 'Căn bậc ba của −27 là −3.'),
    'cube-root-expression': g('cube-root expression', '/kjuːb ruːt ɪkˈspreʃ.ən/', 'n', 'căn thức bậc ba',
      'Trong Toán: Biểu thức có dạng ∛A, trong đó A là một biểu thức đại số.',
      '∛(2x + 5) is a cube-root expression.', '∛(2x + 5) là một căn thức bậc ba.'),
    'index-of-root': g('index of a root', '/ˈɪn.deks əv ə ruːt/', 'n', 'chỉ số của căn',
      'Trong Toán: Số nhỏ viết ở góc trên bên trái dấu căn; với căn bậc ba chỉ số là 3 (căn bậc hai thường không ghi chỉ số).',
      'In ∛a, the index of the root is 3.', 'Trong ∛a, chỉ số của căn là 3.')
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
     CHƯƠNG III (dùng chung cho tất cả các phần)
     ======================================================================== */
  const topic = {
    label: 'Chương', labelEn: 'Chapter', number: 'III',
    vi: 'Căn bậc hai và căn bậc ba',
    en: 'Square roots and cube roots'
  };


  /* ========================================================================
     BÀI 7. CĂN BẬC HAI VÀ CĂN THỨC BẬC HAI
     ======================================================================== */
  D.lessons['toan9-bai7'] = {
    gradeId: 9,
    number: '7',
    book: 'Toán 9',
    title: { vi: 'Căn bậc hai và căn thức bậc hai', en: 'Square roots and square root expressions' },
    topic,
    spreadLabels: [
      'Mở đầu và căn bậc hai',
      'Căn thức bậc hai, điều kiện xác định',
      'Bài tập'
    ],
    pages: [
      /* ----------------------------------------------------------- Trang 44 */
      {
        number: 44,
        blocks: [
          { t: 'banner' },
          goals(
            it(T`Nhận biết căn bậc hai của một số thực không âm; tính được căn bậc hai bằng máy tính cầm tay.`, T`Recognise the {square root} of a non-negative real number; find square roots with a {calculator}.`),
            it(T`Nhận biết căn thức bậc hai, điều kiện xác định của căn thức; tính giá trị căn thức tại giá trị cho trước của biến.`, T`Recognise a {radical expression}, its {conditions of existence|conditions-of-existence}; evaluate it at a given value of the variable.`),
            it(T`Dùng hằng đẳng thức $\sqrt{A^2}=|A|$ để đơn giản căn thức bậc hai.`, T`Use the {identity} $\sqrt{A^2}=|A|$ to simplify a radical expression.`)
          ),
          p(T`Trong Vật lí, quãng đường $S$ (tính bằng mét) của một vật rơi tự do được cho bởi công thức $S=4{,}9t^2$, trong đó $t$ là thời gian rơi (tính bằng giây). Hỏi sau bao nhiêu giây thì vật sẽ chạm đất nếu được thả rơi tự do từ độ cao 122,5 mét?`,
            T`In Physics, the distance $S$ (in metres) travelled by a freely falling object is given by $S=4.9t^2$, where $t$ is the falling time (in seconds). How many seconds will an object take to reach the ground if it is dropped freely from a height of 122.5 metres?`, { badge: 'book' }),
          p(T`Để tìm $t$ ta phải giải $4{,}9t^2=122{,}5$, tức là tìm số có bình phương bằng một số cho trước. Đó chính là bài toán tìm căn bậc hai.`,
            T`To find $t$ we must solve $4.9t^2=122.5$, that is, find a number whose square is a given number. That is exactly the problem of finding a square root.`)
        ]
      },

      /* ----------------------------------------------------------- Trang 45 */
      {
        number: 45,
        blocks: [
          h2('1', 'Căn bậc hai', 'Square roots'),
          act(1, { vi: 'Tìm hiểu khái niệm căn bậc hai', en: 'The idea of a square root' },
            T`Tìm các số thực $x$ sao cho $x^2=49$.`, T`Find the real numbers $x$ such that $x^2=49$.`, []),
          key([
            p(T`**Căn bậc hai** của số thực không âm $a$ là số thực $x$ sao cho $x^2=a$.`,
              T`A **{square root}** of a non-negative real number $a$ is a real number $x$ such that $x^2=a$.`)
          ]),
          tip(
            it(T`**Nhận xét.** Số âm không có căn bậc hai.`, T`**Remark.** A {negative number|negative-number} has no square root.`),
            it(T`Số 0 có một căn bậc hai duy nhất là 0.`, T`The number 0 has exactly one square root, namely 0.`),
            it(T`Số dương $a$ có đúng hai căn bậc hai đối nhau là $\sqrt{a}$ (căn bậc hai số học của $a$) và $-\sqrt{a}$.`, T`A positive number $a$ has exactly two square roots, opposites of each other: $\sqrt{a}$ (the principal, or arithmetic, square root of $a$) and $-\sqrt{a}$.`)
          ),
          ex(1, [p(T`Tìm căn bậc hai của 81.`, T`Find the square roots of 81.`)], [
            p(T`Ta có $\sqrt{81}=9$ nên 81 có hai căn bậc hai là 9 và $-9$.`, T`We have $\sqrt{81}=9$, so 81 has two square roots, 9 and $-9$.`)
          ]),
          lt(1, [p(T`Tìm căn bậc hai của 121.`, T`Find the square roots of 121.`)]),
          p(T`**Tính căn bậc hai của một số bằng máy tính cầm tay (MTCT).** Để tính các căn bậc hai của một số $a>0$, chỉ cần tính $\sqrt{a}$. Có thể dễ dàng làm điều này bằng cách sử dụng máy tính cầm tay.`,
            T`**Finding a square root with a calculator.** To find the square roots of a number $a>0$ it is enough to compute $\sqrt{a}$. This is easy with a {calculator}.`, { badge: 'book' }),
          ex(2, [p(T`Sử dụng MTCT, tính căn bậc hai của 11,1 (làm tròn đến chữ số thập phân thứ hai).`, T`Use a calculator to find the square roots of 11.1 (rounded to two decimal places).`)], [
            p(T`Bấm các phím [[√]] [[1]] [[1]] [[.]] [[1]] [[=]] [[S⇔D]], màn hình hiện kết quả là 3,33166625. Làm tròn đến chữ số thập phân thứ hai ta được $\sqrt{11{,}1}\approx 3{,}33$.`,
              T`Press [[√]] [[1]] [[1]] [[.]] [[1]] [[=]] [[S⇔D]]; the screen shows 3.33166625. Rounded to two decimal places, $\sqrt{11.1}\approx 3.33$.`),
            p(T`Vậy căn bậc hai của 11,1 (làm tròn đến chữ số thập phân thứ hai) là 3,33 và $-3{,}33$.`, T`So the square roots of 11.1 (to two decimal places) are 3.33 and $-3.33$.`)
          ]),
          lt(2, [p(T`Sử dụng MTCT tìm căn bậc hai của $\frac{7}{11}$ (làm tròn đến chữ số thập phân thứ hai).`, T`Use a calculator to find the square roots of $\frac{7}{11}$ (rounded to two decimal places).`)]),
          act(2, { vi: 'Tính chất của căn bậc hai', en: 'A property of square roots' },
            T`Tính và so sánh $\sqrt{a^2}$ và $|a|$ trong mỗi trường hợp sau:`, T`Calculate and compare $\sqrt{a^2}$ and $|a|$ in each case:`,
            [it(T`$a=3$;`, T`$a=3$;`), it(T`$a=-3$.`, T`$a=-3$.`)])
        ]
      },

      /* ----------------------------------------------------------- Trang 46 */
      {
        number: 46,
        blocks: [
          key([
            p(T`**Tính chất:** $\sqrt{a^2}=|a|$ với mọi số thực $a$.`, T`**Property:** $\sqrt{a^2}=|a|$ for every real number $a$ (here $|a|$ is the {absolute value|absolute-value} of $a$).`)
          ]),
          ex(3, [p(T`Không sử dụng MTCT, tính: a) $1-\sqrt{2}+\sqrt{(1+\sqrt{2})^2}$; b) $\sqrt{(-3)^2}+3$.`, T`Without a calculator, evaluate: a) $1-\sqrt{2}+\sqrt{(1+\sqrt{2})^2}$; b) $\sqrt{(-3)^2}+3$.`)], [
            p(T`a) Ta có $\sqrt{(1+\sqrt{2})^2}=|1+\sqrt{2}|=1+\sqrt{2}$ nên $1-\sqrt{2}+\sqrt{(1+\sqrt{2})^2}=1-\sqrt{2}+(1+\sqrt{2})=2$.`,
              T`a) We have $\sqrt{(1+\sqrt{2})^2}=|1+\sqrt{2}|=1+\sqrt{2}$, so the expression equals $1-\sqrt{2}+(1+\sqrt{2})=2$.`),
            p(T`b) Ta có $\sqrt{(-3)^2}=|-3|=3$ nên $\sqrt{(-3)^2}+3=3+3=6$.`, T`b) We have $\sqrt{(-3)^2}=|-3|=3$, so $\sqrt{(-3)^2}+3=3+3=6$.`)
          ]),
          lt(3, [
            p(T`a) Không sử dụng MTCT, tính: $\sqrt{6^2}$; $\sqrt{(-5)^2}$; $\sqrt{5}-\sqrt{(\sqrt{5}-1)^2}$.`, T`a) Without a calculator, evaluate: $\sqrt{6^2}$; $\sqrt{(-5)^2}$; $\sqrt{5}-\sqrt{(\sqrt{5}-1)^2}$.`),
            p(T`b) So sánh 3 với $\sqrt{10}$ bằng hai cách: sử dụng MTCT; sử dụng tính chất của căn bậc hai số học đã học ở lớp 7: nếu $0\le a<b$ thì $\sqrt{a}<\sqrt{b}$.`,
              T`b) Compare 3 with $\sqrt{10}$ in two ways: with a calculator; with the property learned in Grade 7: if $0\le a<b$ then $\sqrt{a}<\sqrt{b}$.`)
          ]),
          h2('2', 'Căn thức bậc hai', 'Square root expressions'),
          act(3, { vi: 'Căn thức bậc hai', en: 'Square root expressions' },
            T`Viết biểu thức tính độ dài cạnh huyền $BC$ của tam giác vuông $ABC$, biết $AB=3$ cm và $AC=x$ cm.`,
            T`Write an expression for the hypotenuse $BC$ of the right triangle $ABC$, given $AB=3$ cm and $AC=x$ cm.`, []),
          p(T`Biểu thức nhận được trong Hoạt động 3 có dạng $\sqrt{A}$, trong đó $A$ là một biểu thức đại số. Tổng quát, ta có định nghĩa:`,
            T`The expression obtained in Activity 3 has the form $\sqrt{A}$, where $A$ is an algebraic expression. In general we have the definition:`),
          key([
            p(T`**Căn thức bậc hai** là biểu thức có dạng $\sqrt{A}$, trong đó $A$ là một biểu thức đại số. $A$ được gọi là **biểu thức lấy căn** hoặc **biểu thức dưới dấu căn**.`,
              T`A **{radical expression}** (square root expression) is an expression of the form $\sqrt{A}$, where $A$ is an algebraic expression. $A$ is called the **{radicand}**, or the expression under the root sign.`)
          ]),
          act(4, { vi: 'Điều kiện xác định', en: 'Conditions of existence' },
            T`Cho biểu thức $C=\sqrt{2x-1}$.`, T`Take the expression $C=\sqrt{2x-1}$.`,
            [it(T`Tính giá trị của biểu thức tại $x=5$.`, T`Find the value of the expression at $x=5$.`),
             it(T`Tại $x=0$ có tính được giá trị của biểu thức không? Vì sao?`, T`Can you find its value at $x=0$? Why or why not?`)]),
          key([
            p(T`$\sqrt{A}$ xác định khi $A$ lấy giá trị không âm và ta thường viết là $A\ge 0$. Ta nói $A\ge 0$ là **điều kiện xác định** (hay **điều kiện có nghĩa**) của $\sqrt{A}$.`,
              T`$\sqrt{A}$ is defined when $A$ takes a non-negative value, usually written $A\ge 0$. We say $A\ge 0$ is the **{conditions of existence|conditions-of-existence}** (also called the defined condition, or domain) of $\sqrt{A}$.`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 47 */
      {
        number: 47,
        blocks: [
          ex(4, [
            p(T`Xét căn thức $\sqrt{2x+1}$. a) Tìm điều kiện xác định của căn thức. b) Tính giá trị của căn thức đã cho tại $x=0$ và $x=4$.`,
              T`Consider $\sqrt{2x+1}$. a) Find its conditions of existence. b) Find its value at $x=0$ and $x=4$.`)
          ], [
            p(T`a) Điều kiện xác định của căn thức là $2x+1\ge 0$ hay $x\ge -\frac{1}{2}$.`, T`a) The condition is $2x+1\ge 0$, that is $x\ge -\frac{1}{2}$.`),
            p(T`b) Tại $x=0$ (thoả mãn điều kiện xác định) căn thức có giá trị là $\sqrt{2\cdot 0+1}=1$. Tại $x=4$ (thoả mãn điều kiện xác định) căn thức có giá trị là $\sqrt{2\cdot 4+1}=3$.`,
              T`b) At $x=0$ (the condition holds) the value is $\sqrt{2\cdot 0+1}=1$. At $x=4$ (the condition holds) the value is $\sqrt{2\cdot 4+1}=3$.`)
          ]),
          lt(4, [
            p(T`Cho căn thức $\sqrt{5-2x}$. a) Tìm điều kiện xác định của căn thức. b) Tính giá trị của căn thức tại $x=2$.`,
              T`Take $\sqrt{5-2x}$. a) Find its conditions of existence. b) Find its value at $x=2$.`)
          ]),
          p(T`**Hằng đẳng thức $\sqrt{A^2}=|A|$.** Tương tự như căn bậc hai của một số thực không âm, với $A$ là một biểu thức, ta cũng có:`,
            T`**The identity $\sqrt{A^2}=|A|$.** As for square roots of non-negative numbers, for an expression $A$ we also have:`, { badge: 'book' }),
          key([
            { t: 'list', items: [
              it(T`Với $A\ge 0$ ta có $\sqrt{A}\ge 0$; $(\sqrt{A})^2=A$;`, T`For $A\ge 0$ we have $\sqrt{A}\ge 0$ and $(\sqrt{A})^2=A$;`),
              it(T`$\sqrt{A^2}=|A|$.`, T`$\sqrt{A^2}=|A|$.`)
            ] }
          ]),
          ex(5, [
            p(T`Rút gọn các biểu thức sau: a) $(\sqrt{1-x})^2$ với $x<0$; b) $\sqrt{1-2x+x^2}$ với $x>2$.`,
              T`Simplify: a) $(\sqrt{1-x})^2$ for $x<0$; b) $\sqrt{1-2x+x^2}$ for $x>2$.`)
          ], [
            p(T`a) Từ giả thiết $x<0$ suy ra $1-x>0$. Do đó $(\sqrt{1-x})^2=1-x$ (hằng đẳng thức $(\sqrt{A})^2=A$ với mọi $A\ge 0$).`,
              T`a) From $x<0$ we get $1-x>0$. Hence $(\sqrt{1-x})^2=1-x$ (the {identity} $(\sqrt{A})^2=A$ for all $A\ge 0$).`),
            p(T`b) Áp dụng hằng đẳng thức bình phương của một hiệu và $\sqrt{A^2}=|A|$, ta có $\sqrt{1-2x+x^2}=\sqrt{(1-x)^2}=|1-x|$.`,
              T`b) Using the identity for the square of a difference and $\sqrt{A^2}=|A|$, we get $\sqrt{1-2x+x^2}=\sqrt{(1-x)^2}=|1-x|$.`),
            p(T`Do giả thiết $x>2$ suy ra $1-x<0$ nên $|1-x|=-(1-x)=x-1$. Vì vậy $\sqrt{1-2x+x^2}=x-1$ với $x>2$.`,
              T`Since $x>2$ gives $1-x<0$, we have $|1-x|=-(1-x)=x-1$. So $\sqrt{1-2x+x^2}=x-1$ for $x>2$.`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 48 */
      {
        number: 48,
        blocks: [
          lt(5, [
            p(T`a) Rút gọn biểu thức $x\sqrt{x^6}$ ($x<0$). b) Rút gọn và tính giá trị của biểu thức $x+\sqrt{4x^2-4x+1}$ tại $x=-2{,}5$.`,
              T`a) Simplify $x\sqrt{x^6}$ ($x<0$). b) Simplify and evaluate $x+\sqrt{4x^2-4x+1}$ at $x=-2.5$.`)
          ]),
          vd('', [
            p(T`Trở lại tình huống mở đầu. a) Viết công thức tính thời gian $t$ (giây) cần thiết để vật rơi được quãng đường $S$ (mét). b) Sử dụng công thức tìm được trong câu a, hãy trả lời câu hỏi trong tình huống mở đầu.`,
              T`Back to the opening situation. a) Write a formula for the time $t$ (seconds) an object needs to fall a distance $S$ (metres). b) Use it to answer the question in the opening situation.`)
          ]),
          head('practice', 'Bài tập', 'Exercises'),
          bt('3.1', T`Tìm căn bậc hai của mỗi số sau (làm tròn đến chữ số thập phân thứ hai): a) 24,5; b) $\frac{9}{10}$.`, T`Find the square roots of each number (rounded to two decimal places): a) 24.5; b) $\frac{9}{10}$.`),
          bt('3.2', T`Để chuẩn bị trồng cây trên vỉa hè, người ta để lại những ô đất hình tròn có diện tích khoảng 2 m². Em hãy ước lượng (với độ chính xác 0,005) đường kính của các ô đất đó khoảng bao nhiêu mét?`,
            T`To prepare for planting trees on a pavement, round plots of ground of area about 2 m² are left. Estimate (to within 0.005) the diameter of these plots in metres.`),
          bt('3.3', T`Tìm điều kiện xác định của $\sqrt{x+10}$ và tính giá trị của căn thức tại $x=-1$.`, T`Find the conditions of existence of $\sqrt{x+10}$ and its value at $x=-1$.`),
          bt('3.4', T`Tính: $\sqrt{5{,}1^2}$; $\sqrt{(-4{,}9)^2}$; $-\sqrt{(-0{,}001)^2}$.`, T`Evaluate: $\sqrt{5.1^2}$; $\sqrt{(-4.9)^2}$; $-\sqrt{(-0.001)^2}$.`),
          bt('3.5', T`Rút gọn các biểu thức sau: a) $\sqrt{(2-\sqrt{5})^2}$; b) $3\sqrt{x^2}-x+1$ ($x<0$); c) $\sqrt{x^2-4x+4}$ ($x<2$).`,
            T`Simplify: a) $\sqrt{(2-\sqrt{5})^2}$; b) $3\sqrt{x^2}-x+1$ ($x<0$); c) $\sqrt{x^2-4x+4}$ ($x<2$).`),
          bt('3.6', T`Không dùng MTCT, chứng tỏ biểu thức $A$ có giá trị là số nguyên: $A=\sqrt{(1+2\sqrt{2})^2}-\sqrt{(1-2\sqrt{2})^2}$.`,
            T`Without a calculator, show that $A$ is an integer: $A=\sqrt{(1+2\sqrt{2})^2}-\sqrt{(1-2\sqrt{2})^2}$.`)
        ]
      }
    ]
  };

  /* ========================================================================
     BÀI 8. KHAI CĂN BẬC HAI VỚI PHÉP NHÂN VÀ PHÉP CHIA
     ======================================================================== */
  D.lessons['toan9-bai8'] = {
    gradeId: 9,
    number: '8',
    book: 'Toán 9',
    title: { vi: 'Khai căn bậc hai với phép nhân và phép chia', en: 'Square roots with multiplication and division' },
    topic,
    spreadLabels: [
      'Khai căn bậc hai và phép nhân',
      'Khai căn bậc hai và phép chia, bài tập'
    ],
    pages: [
      /* ----------------------------------------------------------- Trang 49 */
      {
        number: 49,
        blocks: [
          { t: 'banner' },
          goals(
            it(T`Nhận biết cách khai căn bậc hai của một tích, một thương.`, T`Know how to take the square root of a product and of a quotient.`),
            it(T`Biết nhân và chia các căn bậc hai.`, T`Know how to multiply and divide square roots ({multiplication and division of radicals|radical-operations}).`),
            it(T`Vận dụng tính toán đơn giản về căn thức bậc hai của biểu thức đại số.`, T`Do simple calculations with the {radical expressions|radical-expression} of algebraic expressions.`)
          ),
          p(T`Phép tìm căn bậc hai số học của một số hay biểu thức cũng được gọi là **phép khai căn bậc hai**. Phép khai căn bậc hai và phép nhân, phép chia có một mối liên hệ đặc biệt mà chúng ta sẽ tìm hiểu trong bài học này.`,
            T`Finding the principal {square root} of a number or expression is also called **taking the square root**. Taking square roots is closely linked with multiplication and division, and we study that link in this lesson.`, { badge: 'book' }),
          h2('1', 'Khai căn bậc hai và phép nhân', 'Square roots and multiplication'),
          act(1, { vi: 'Liên hệ giữa phép khai căn bậc hai và phép nhân', en: 'How square roots relate to multiplication' },
            T`Tính và so sánh: $\sqrt{100}\cdot\sqrt{4}$ và $\sqrt{100\cdot 4}$.`, T`Calculate and compare: $\sqrt{100}\cdot\sqrt{4}$ and $\sqrt{100\cdot 4}$.`, []),
          key([
            p(T`Với $A$, $B$ là các biểu thức không âm, ta có`, T`For non-negative expressions $A$ and $B$ we have`),
            m(T`\sqrt{A}\cdot\sqrt{B}=\sqrt{AB}`)
          ]),
          tip({
            vi: T`**Chú ý.** Kết quả trên có thể mở rộng cho nhiều biểu thức không âm, chẳng hạn $\sqrt{A}\cdot\sqrt{B}\cdot\sqrt{C}=\sqrt{A\cdot B\cdot C}$ (với $A\ge 0$, $B\ge 0$, $C\ge 0$).`,
            en: T`**Note.** The result extends to more non-negative expressions, for example $\sqrt{A}\cdot\sqrt{B}\cdot\sqrt{C}=\sqrt{A\cdot B\cdot C}$ (for $A\ge 0$, $B\ge 0$, $C\ge 0$).`
          }),
          ex(1, [p(T`Tính: a) $\sqrt{27}\cdot\sqrt{3}$; b) $\sqrt{5}(\sqrt{125}+\sqrt{5})$.`, T`Evaluate: a) $\sqrt{27}\cdot\sqrt{3}$; b) $\sqrt{5}(\sqrt{125}+\sqrt{5})$.`)], [
            p(T`a) $\sqrt{27}\cdot\sqrt{3}=\sqrt{27\cdot 3}=\sqrt{81}=9$.`, T`a) $\sqrt{27}\cdot\sqrt{3}=\sqrt{27\cdot 3}=\sqrt{81}=9$.`),
            p(T`b) $\sqrt{5}(\sqrt{125}+\sqrt{5})=\sqrt{5}\cdot\sqrt{125}+\sqrt{5}\cdot\sqrt{5}=\sqrt{5\cdot 125}+\sqrt{25}=25+5=30$.`,
              T`b) $\sqrt{5}(\sqrt{125}+\sqrt{5})=\sqrt{5}\cdot\sqrt{125}+\sqrt{5}\cdot\sqrt{5}=\sqrt{5\cdot 125}+\sqrt{25}=25+5=30$.`)
          ]),
          ex(2, [p(T`Rút gọn $\sqrt{5x}\cdot\sqrt{20x}$ với $x\ge 0$.`, T`Simplify $\sqrt{5x}\cdot\sqrt{20x}$ for $x\ge 0$.`)], [
            p(T`Ta có $\sqrt{5x}\cdot\sqrt{20x}=\sqrt{5x\cdot 20x}=\sqrt{100x^2}=\sqrt{(10x)^2}=|10x|=10x$ với $x\ge 0$.`,
              T`We have $\sqrt{5x}\cdot\sqrt{20x}=\sqrt{5x\cdot 20x}=\sqrt{100x^2}=\sqrt{(10x)^2}=|10x|=10x$ for $x\ge 0$.`)
          ]),
          lt(1, [p(T`a) Tính $\sqrt{3}\cdot\sqrt{75}$. b) Rút gọn $\sqrt{5ab^3}\cdot\sqrt{5ab}$ (với $a<0$, $b<0$).`, T`a) Evaluate $\sqrt{3}\cdot\sqrt{75}$. b) Simplify $\sqrt{5ab^3}\cdot\sqrt{5ab}$ (for $a<0$, $b<0$).`)])
        ]
      },

      /* ----------------------------------------------------------- Trang 50 */
      {
        number: 50,
        blocks: [
          ex(3, [p(T`Tính $\sqrt{2^2\cdot 3^2\cdot 5^2}$.`, T`Evaluate $\sqrt{2^2\cdot 3^2\cdot 5^2}$.`)], [
            p(T`$\sqrt{2^2\cdot 3^2\cdot 5^2}=\sqrt{2^2}\cdot\sqrt{3^2}\cdot\sqrt{5^2}=2\cdot 3\cdot 5=30$.`, T`$\sqrt{2^2\cdot 3^2\cdot 5^2}=\sqrt{2^2}\cdot\sqrt{3^2}\cdot\sqrt{5^2}=2\cdot 3\cdot 5=30$.`)
          ]),
          tip({
            vi: T`Nếu $A\ge 0$, $B\ge 0$, $C\ge 0$ thì $\sqrt{A^2B^2C^2}=ABC$.`,
            en: T`If $A\ge 0$, $B\ge 0$, $C\ge 0$ then $\sqrt{A^2B^2C^2}=ABC$.`
          }),
          ex(4, [p(T`Rút gọn biểu thức $\sqrt{25a^2b^2}$ (với $a\ge 0$, $b<0$).`, T`Simplify $\sqrt{25a^2b^2}$ (for $a\ge 0$, $b<0$).`)], [
            p(T`Theo giả thiết $a\ge 0$, $b<0$, do đó $\sqrt{25a^2b^2}=\sqrt{25}\cdot\sqrt{a^2}\cdot\sqrt{b^2}=5|a|\cdot|b|=-5ab$.`,
              T`By hypothesis $a\ge 0$ and $b<0$, so $\sqrt{25a^2b^2}=\sqrt{25}\cdot\sqrt{a^2}\cdot\sqrt{b^2}=5|a|\cdot|b|=-5ab$.`)
          ]),
          lt(2, [p(T`a) Tính nhanh $\sqrt{25\cdot 49}$. b) Phân tích thành nhân tử: $\sqrt{ab}-4\sqrt{a}$ (với $a\ge 0$, $b\ge 0$).`, T`a) Evaluate quickly $\sqrt{25\cdot 49}$. b) {Factorise} $\sqrt{ab}-4\sqrt{a}$ (for $a\ge 0$, $b\ge 0$).`)]),
          h2('2', 'Khai căn bậc hai và phép chia', 'Square roots and division'),
          act(2, { vi: 'Liên hệ giữa phép khai căn bậc hai và phép chia', en: 'How square roots relate to division' },
            T`Tính và so sánh: $\sqrt{100}:\sqrt{4}$ và $\sqrt{100:4}$.`, T`Calculate and compare: $\sqrt{100}:\sqrt{4}$ and $\sqrt{100:4}$.`, []),
          key([
            p(T`Nếu $A$, $B$ là các biểu thức với $A\ge 0$, $B>0$ thì`, T`If $A$ and $B$ are expressions with $A\ge 0$ and $B>0$ then`),
            m(T`\frac{\sqrt{A}}{\sqrt{B}}=\sqrt{\frac{A}{B}}`)
          ]),
          ex(5, [p(T`a) Tính $\sqrt{8}:\sqrt{2}$. b) Rút gọn $\sqrt{52a^3}:\sqrt{13a}$ ($a>0$).`, T`a) Evaluate $\sqrt{8}:\sqrt{2}$. b) Simplify $\sqrt{52a^3}:\sqrt{13a}$ ($a>0$).`)], [
            p(T`a) $\sqrt{8}:\sqrt{2}=\sqrt{8:2}=\sqrt{4}=2$.`, T`a) $\sqrt{8}:\sqrt{2}=\sqrt{8:2}=\sqrt{4}=2$.`),
            p(T`b) $\sqrt{52a^3}:\sqrt{13a}=\sqrt{52a^3:(13a)}=\sqrt{4a^2}=\sqrt{(2a)^2}=|2a|=2a$ (do $a>0$).`, T`b) $\sqrt{52a^3}:\sqrt{13a}=\sqrt{52a^3:(13a)}=\sqrt{4a^2}=\sqrt{(2a)^2}=|2a|=2a$ (since $a>0$).`)
          ]),
          lt(3, [p(T`a) Tính $\sqrt{18}:\sqrt{50}$. b) Rút gọn $\sqrt{16ab^2}:\sqrt{4a}$ (với $a>0$, $b<0$).`, T`a) Evaluate $\sqrt{18}:\sqrt{50}$. b) Simplify $\sqrt{16ab^2}:\sqrt{4a}$ (for $a>0$, $b<0$).`)]),
          ex(6, [
            p(T`a) Viết số dưới dấu căn thành một phân số thập phân rồi tính $\sqrt{1{,}69}$. b) Rút gọn $a\cdot\sqrt{\frac{2}{a^2}}$ ($a>0$).`,
              T`a) Write the number under the root as a decimal fraction and evaluate $\sqrt{1.69}$. b) Simplify $a\cdot\sqrt{\frac{2}{a^2}}$ ($a>0$).`)
          ], [
            p(T`a) Ta có $1{,}69=\frac{169}{100}=\frac{13^2}{10^2}$ nên $\sqrt{1{,}69}=\sqrt{\frac{13^2}{10^2}}=\frac{\sqrt{13^2}}{\sqrt{10^2}}=\frac{13}{10}=1{,}3$.`,
              T`a) We have $1.69=\frac{169}{100}=\frac{13^2}{10^2}$, so $\sqrt{1.69}=\sqrt{\frac{13^2}{10^2}}=\frac{\sqrt{13^2}}{\sqrt{10^2}}=\frac{13}{10}=1.3$.`),
            p(T`b) Do $a>0$ nên $a\cdot\sqrt{\frac{2}{a^2}}=a\cdot\frac{\sqrt{2}}{\sqrt{a^2}}=a\cdot\frac{\sqrt{2}}{a}=\sqrt{2}$.`,
              T`b) Since $a>0$, $a\cdot\sqrt{\frac{2}{a^2}}=a\cdot\frac{\sqrt{2}}{\sqrt{a^2}}=a\cdot\frac{\sqrt{2}}{a}=\sqrt{2}$.`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 51 */
      {
        number: 51,
        blocks: [
          lt(4, [p(T`a) Tính $\sqrt{6{,}25}$. b) Rút gọn $(a^2-1)\cdot\sqrt{\frac{5}{(a-1)^2}}$ ($a>1$).`, T`a) Evaluate $\sqrt{6.25}$. b) Simplify $(a^2-1)\cdot\sqrt{\frac{5}{(a-1)^2}}$ ($a>1$).`)]),
          vd('', [
            p(T`Công suất $P$ (W), hiệu điện thế $U$ (V), điện trở $R$ ($\Omega$) trong đoạn mạch một chiều liên hệ với nhau theo công thức $U=\sqrt{PR}$. Nếu công suất tăng gấp 8 lần, điện trở giảm 2 lần thì tỉ số giữa hiệu điện thế lúc đó và hiệu điện thế ban đầu bằng bao nhiêu?`,
              T`Power $P$ (W), voltage $U$ (V) and resistance $R$ ($\Omega$) in a direct-current circuit are related by $U=\sqrt{PR}$. If the power increases 8 times and the resistance decreases 2 times, what is the ratio of the new voltage to the original voltage?`)
          ]),
          { t: 'h3', vi: 'Tranh luận', en: 'Debate' },
          {
            t: 'talk',
            lines: [{ who: 'Vuông', vi: T`Vì $\sqrt{(-3)^2}=-3$ và $\sqrt{(-12)^2}=-12$ nên $\sqrt{(-3)^2\cdot(-12)^2}=(-3)\cdot(-12)=36$.`,
              en: T`Since $\sqrt{(-3)^2}=-3$ and $\sqrt{(-12)^2}=-12$, we get $\sqrt{(-3)^2\cdot(-12)^2}=(-3)\cdot(-12)=36$.` }]
          },
          p(T`Theo em, cách làm của Vuông có đúng không? Vì sao?`, T`In your opinion, is Vuông's working correct? Why or why not?`),
          tip({
            vi: T`*Gợi ý.* Hãy nhớ $\sqrt{A^2}=|A|$ với mọi $A$, và công thức $\sqrt{A}\cdot\sqrt{B}=\sqrt{AB}$ chỉ dùng khi $A\ge 0$, $B\ge 0$. Ở đây $\sqrt{(-3)^2}=|-3|=3$, không phải $-3$.`,
            en: T`*Hint.* Remember $\sqrt{A^2}=|A|$ for every $A$, and $\sqrt{A}\cdot\sqrt{B}=\sqrt{AB}$ is used only when $A\ge 0$ and $B\ge 0$. Here $\sqrt{(-3)^2}=|-3|=3$, not $-3$. (A square root is never negative.)`
          }),
          head('practice', 'Bài tập', 'Exercises'),
          bt('3.7', T`Tính: a) $\sqrt{12}\cdot(\sqrt{12}+\sqrt{3})$; b) $\sqrt{8}\cdot(\sqrt{50}-\sqrt{2})$; c) $(\sqrt{3}+\sqrt{2})^2-2\sqrt{6}$.`, T`Evaluate: a) $\sqrt{12}\cdot(\sqrt{12}+\sqrt{3})$; b) $\sqrt{8}\cdot(\sqrt{50}-\sqrt{2})$; c) $(\sqrt{3}+\sqrt{2})^2-2\sqrt{6}$.`),
          bt('3.8', T`Rút gọn biểu thức $\sqrt{2(a^2-b^2)}\cdot\sqrt{\frac{3}{a+b}}$ (với $a\ge b>0$).`, T`Simplify $\sqrt{2(a^2-b^2)}\cdot\sqrt{\frac{3}{a+b}}$ (for $a\ge b>0$).`),
          bt('3.9', T`Tính: a) $\sqrt{99}:\sqrt{11}$; b) $\sqrt{7{,}84}$; c) $\sqrt{1\,815}:\sqrt{15}$.`, T`Evaluate: a) $\sqrt{99}:\sqrt{11}$; b) $\sqrt{7.84}$; c) $\sqrt{1\,815}:\sqrt{15}$.`),
          bt('3.10', T`Rút gọn $\frac{-3\sqrt{16a}+5a\sqrt{16ab^2}}{2\sqrt{a}}$ (với $a>0$, $b>0$).`, T`Simplify $\frac{-3\sqrt{16a}+5a\sqrt{16ab^2}}{2\sqrt{a}}$ (for $a>0$, $b>0$).`),
          bt('3.11', T`Kích thước màn hình ti vi hình chữ nhật được xác định bởi độ dài đường chéo. Một loại ti vi có tỉ lệ hai cạnh màn hình là 4 : 3. a) Gọi $x$ (inch) là chiều rộng của màn hình ti vi. Viết công thức tính độ dài đường chéo $d$ (inch) của màn hình ti vi theo $x$. b) Tính chiều rộng và chiều dài (theo centimét) của màn hình ti vi loại 40 inch.`,
            T`The size of a rectangular TV screen is given by the length of its diagonal. One type of TV has screen sides in the ratio 4 : 3. a) Let $x$ (inches) be the width of the screen. Write a formula for the diagonal $d$ (inches) in terms of $x$. b) Find the width and length (in centimetres) of a 40-inch TV screen.`)
        ]
      }
    ]
  };

  /* ========================================================================
     LUYỆN TẬP CHUNG (tr. 52–53)
     ======================================================================== */
  D.lessons['toan9-ltc3a'] = {
    gradeId: 9,
    number: 'LT',
    book: 'Toán 9',
    title: { vi: 'Luyện tập chung', en: 'General practice' },
    topic,
    spreadLabels: ['Căn thức bậc hai: ví dụ và bài tập'],
    pages: [
      /* ----------------------------------------------------------- Trang 52 */
      {
        number: 52,
        blocks: [
          { t: 'banner' },
          ex(1, [p(T`Không dùng MTCT, tính giá trị của biểu thức $A=\sqrt{(1-\sqrt{3})^2}-\sqrt{3}$.`, T`Without a calculator, evaluate $A=\sqrt{(1-\sqrt{3})^2}-\sqrt{3}$.`)], [
            p(T`Ta có $A=|1-\sqrt{3}|-\sqrt{3}=(\sqrt{3}-1)-\sqrt{3}=-1$ (hằng đẳng thức $\sqrt{A^2}=|A|$).`,
              T`We have $A=|1-\sqrt{3}|-\sqrt{3}=(\sqrt{3}-1)-\sqrt{3}=-1$ (the {identity} $\sqrt{A^2}=|A|$).`)
          ]),
          ex(2, [p(T`Tính: a) $(2+\sqrt{5})(2-\sqrt{5})$; b) $(\sqrt{5}+\sqrt{2})(\sqrt{5}-\sqrt{2})$.`, T`Evaluate: a) $(2+\sqrt{5})(2-\sqrt{5})$; b) $(\sqrt{5}+\sqrt{2})(\sqrt{5}-\sqrt{2})$.`)], [
            p(T`Sử dụng hằng đẳng thức hiệu của hai bình phương, ta được:`, T`Using the {identity} for a difference of two squares, we get:`),
            p(T`a) $(2+\sqrt{5})(2-\sqrt{5})=2^2-(\sqrt{5})^2=4-5=-1$.`, T`a) $(2+\sqrt{5})(2-\sqrt{5})=2^2-(\sqrt{5})^2=4-5=-1$.`),
            p(T`b) $(\sqrt{5}+\sqrt{2})(\sqrt{5}-\sqrt{2})=(\sqrt{5})^2-(\sqrt{2})^2=5-2=3$.`, T`b) $(\sqrt{5}+\sqrt{2})(\sqrt{5}-\sqrt{2})=(\sqrt{5})^2-(\sqrt{2})^2=5-2=3$.`)
          ]),
          tip({
            vi: T`**Chú ý.** Tổng quát, ta có $(A+\sqrt{B})(A-\sqrt{B})=A^2-B$ với $A$, $B$ là hai biểu thức, $B\ge 0$; và $(\sqrt{A}+\sqrt{B})(\sqrt{A}-\sqrt{B})=A-B$ với $A$, $B$ là hai biểu thức không âm. Ta nói $A+\sqrt{B}$ và $A-\sqrt{B}$; $\sqrt{A}+\sqrt{B}$ và $\sqrt{A}-\sqrt{B}$ là những cặp *biểu thức liên hợp*.`,
            en: T`**Note.** In general, $(A+\sqrt{B})(A-\sqrt{B})=A^2-B$ for expressions $A$, $B$ with $B\ge 0$; and $(\sqrt{A}+\sqrt{B})(\sqrt{A}-\sqrt{B})=A-B$ for non-negative expressions $A$, $B$. We say that $A+\sqrt{B}$ and $A-\sqrt{B}$, and also $\sqrt{A}+\sqrt{B}$ and $\sqrt{A}-\sqrt{B}$, are pairs of *{conjugate expressions|conjugate}*.`
          }),
          ex(3, [
            p(T`Cho biểu thức $P=\frac{x\sqrt{x}+1}{x-\sqrt{x}+1}-1$ với $x\ge 0$. a) Viết $x\sqrt{x}+1$ thành tổng hai lập phương rồi phân tích thành nhân tử để rút gọn biểu thức đã cho. b) Tính giá trị của $P$ tại $x=100$.`,
              T`Let $P=\frac{x\sqrt{x}+1}{x-\sqrt{x}+1}-1$ for $x\ge 0$. a) Write $x\sqrt{x}+1$ as a sum of two cubes and {factorise} it to simplify $P$. b) Find $P$ at $x=100$.`)
          ], [
            p(T`a) Ta có $x\sqrt{x}+1=(\sqrt{x})^3+1^3=(\sqrt{x}+1)\left[(\sqrt{x})^2-\sqrt{x}\cdot 1+1^2\right]=(\sqrt{x}+1)(x-\sqrt{x}+1)$.`,
              T`a) We have $x\sqrt{x}+1=(\sqrt{x})^3+1^3=(\sqrt{x}+1)\left[(\sqrt{x})^2-\sqrt{x}\cdot 1+1^2\right]=(\sqrt{x}+1)(x-\sqrt{x}+1)$.`),
            p(T`Từ đó $P=(\sqrt{x}+1)-1=\sqrt{x}$.`, T`Hence $P=(\sqrt{x}+1)-1=\sqrt{x}$.`),
            p(T`b) Tại $x=100$ (thoả mãn điều kiện) thì $P=\sqrt{100}=10$.`, T`b) At $x=100$ (the condition holds), $P=\sqrt{100}=10$.`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 53 */
      {
        number: 53,
        blocks: [
          head('practice', 'Bài tập', 'Exercises'),
          bt('3.12', T`Rút gọn các biểu thức sau: a) $\sqrt{(\sqrt{3}-\sqrt{2})^2}+\sqrt{(1-\sqrt{2})^2}$; b) $\sqrt{(\sqrt{7}-3)^2}+\sqrt{(\sqrt{7}+3)^2}$.`,
            T`Simplify: a) $\sqrt{(\sqrt{3}-\sqrt{2})^2}+\sqrt{(1-\sqrt{2})^2}$; b) $\sqrt{(\sqrt{7}-3)^2}+\sqrt{(\sqrt{7}+3)^2}$.`),
          bt('3.13', T`Thực hiện phép tính: a) $\sqrt{3}(\sqrt{192}-\sqrt{75})$; b) $\frac{-3\sqrt{18}+5\sqrt{50}-\sqrt{128}}{7\sqrt{2}}$.`,
            T`Evaluate: a) $\sqrt{3}(\sqrt{192}-\sqrt{75})$; b) $\frac{-3\sqrt{18}+5\sqrt{50}-\sqrt{128}}{7\sqrt{2}}$.`),
          bt('3.14', T`Chứng minh rằng: a) $(1-\sqrt{2})^2=3-2\sqrt{2}$; b) $(\sqrt{3}+\sqrt{2})^2=5+2\sqrt{6}$.`, T`Prove that: a) $(1-\sqrt{2})^2=3-2\sqrt{2}$; b) $(\sqrt{3}+\sqrt{2})^2=5+2\sqrt{6}$.`),
          bt('3.15', T`Cho căn thức $\sqrt{x^2-4x+4}$. a) Hãy chứng tỏ rằng căn thức xác định với mọi giá trị của $x$. b) Rút gọn căn thức đã cho với $x\ge 2$. c) Chứng tỏ rằng với mọi $x\ge 2$, biểu thức $\sqrt{x-\sqrt{x^2-4x+4}}$ có giá trị không đổi.`,
            T`Take the radical $\sqrt{x^2-4x+4}$. a) Show that it is defined for every value of $x$. b) Simplify it for $x\ge 2$. c) Show that for all $x\ge 2$ the expression $\sqrt{x-\sqrt{x^2-4x+4}}$ has a constant value.`),
          bt('3.16', T`Vận tốc (m/s) của một vật đang bay được cho bởi công thức $v=\sqrt{\frac{2E}{m}}$, trong đó $E$ là động năng của vật (tính bằng Joule, kí hiệu là J) và $m$ (kg) là khối lượng của vật. Tính vận tốc bay của một vật khi biết vật đó có khối lượng 2,5 kg và động năng 281,25 J.`,
            T`The speed (m/s) of a flying object is given by $v=\sqrt{\frac{2E}{m}}$, where $E$ is its kinetic energy (in joules, J) and $m$ (kg) is its mass. Find the speed of an object of mass 2.5 kg and kinetic energy 281.25 J.`)
        ]
      }
    ]
  };
  /* ========================================================================
     BÀI 9. BIẾN ĐỔI ĐƠN GIẢN VÀ RÚT GỌN BIỂU THỨC CHỨA CĂN THỨC BẬC HAI
     ======================================================================== */
  D.lessons['toan9-bai9'] = {
    gradeId: 9,
    number: '9',
    book: 'Toán 9',
    title: { vi: 'Biến đổi đơn giản và rút gọn biểu thức chứa căn thức bậc hai', en: 'Simple transformations and simplifying expressions with square roots' },
    topic,
    spreadLabels: [
      'Đưa thừa số ra ngoài và vào trong dấu căn',
      'Trục căn thức ở mẫu',
      'Rút gọn biểu thức, bài tập'
    ],
    pages: [
      /* ----------------------------------------------------------- Trang 54 */
      {
        number: 54,
        blocks: [
          { t: 'banner' },
          goals(
            it(T`Thực hiện phép đưa thừa số ra ngoài dấu căn bậc hai, đưa thừa số vào trong dấu căn bậc hai.`, T`{Bring a factor outside|factor-outside} the square root sign, and {bring a factor inside|factor-inside} it.`),
            it(T`Thực hiện phép trục căn thức ở mẫu.`, T`{Rationalise the denominator|rationalise}.`),
            it(T`Rút gọn biểu thức chứa căn bậc hai.`, T`Simplify expressions that contain square roots.`)
          ),
          { t: 'talk', lines: [{ who: 'Vuông', vi: T`Không sử dụng MTCT, có thể so sánh được hai số $a=3\sqrt{2}$ và $b=2\sqrt{3}$ hay không?`,
            en: T`Without a calculator, can we compare the two numbers $a=3\sqrt{2}$ and $b=2\sqrt{3}$?` }] },
          h2('1', 'Đưa thừa số ra ngoài dấu căn', 'Bringing a factor outside the square root'),
          { t: 'h3', vi: 'Cách đưa thừa số ra ngoài dấu căn', en: 'How to bring a factor outside the root' },
          act('', { vi: 'Đưa thừa số ra ngoài dấu căn', en: 'Bringing a factor outside' },
            T`Tính và so sánh $\sqrt{(-3)^2\cdot 25}$ với $|-3|\cdot\sqrt{25}$.`, T`Calculate and compare $\sqrt{(-3)^2\cdot 25}$ with $|-3|\cdot\sqrt{25}$.`, []),
          key([
            p(T`Nếu $a$ là một số và $b$ là một số không âm thì`, T`If $a$ is any number and $b$ is a non-negative number, then`),
            m(T`\sqrt{a^2 b}=|a|\sqrt{b}`)
          ]),
          tip({
            vi: T`**Chú ý.** Phép biến đổi trên gọi là phép đưa thừa số ra ngoài dấu căn.`,
            en: T`**Note.** The transformation above is called {bringing a factor outside|factor-outside} the square root sign.`
          }),
          ex(1, [
            p(T`Viết nhân tử số của biểu thức dưới dấu căn thành tích các luỹ thừa rồi đưa thừa số ra ngoài dấu căn: a) $\sqrt{45}$; b) $\sqrt{243a}$ ($a\ge 0$).`,
              T`Write the numerical factor of the {radicand} as a product of powers, then bring a factor outside the root: a) $\sqrt{45}$; b) $\sqrt{243a}$ ($a\ge 0$).`)
          ], [
            p(T`a) Ta có $45=3^2\cdot 5$ nên $\sqrt{45}=\sqrt{3^2\cdot 5}=3\sqrt{5}$.`, T`a) We have $45=3^2\cdot 5$, so $\sqrt{45}=\sqrt{3^2\cdot 5}=3\sqrt{5}$.`),
            p(T`b) Ta có $243=3\cdot 9^2$ nên $\sqrt{243a}=\sqrt{9^2\cdot 3a}=9\sqrt{3a}$.`, T`b) We have $243=3\cdot 9^2$, so $\sqrt{243a}=\sqrt{9^2\cdot 3a}=9\sqrt{3a}$.`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 55 */
      {
        number: 55,
        blocks: [
          lt(1, [p(T`Đưa thừa số ra ngoài dấu căn: a) $\sqrt{12}$; b) $3\sqrt{27}$; c) $5\sqrt{48}$.`, T`Bring a factor outside the root: a) $\sqrt{12}$; b) $3\sqrt{27}$; c) $5\sqrt{48}$.`)]),
          tip({
            vi: T`**Chú ý.** Khi tính toán với những căn thức bậc hai mà biểu thức dưới dấu căn có mẫu, ta thường *khử mẫu của biểu thức lấy căn* (tức là biến đổi căn thức bậc hai đó thành một biểu thức mà trong căn thức không còn mẫu) như trong ví dụ sau:`,
            en: T`**Note.** When we work with square roots whose {radicand} contains a denominator, we usually *{eliminate the denominator|eliminate-denominator} of the radicand* (that is, we turn the root into an expression whose radical has no denominator left), as in the next example:`
          }),
          ex(2, [p(T`Khử mẫu của biểu thức lấy căn $\sqrt{\frac{4}{7}}$.`, T`Eliminate the denominator of the radicand in $\sqrt{\frac{4}{7}}$.`)], [
            p(T`Nhân cả tử và mẫu của biểu thức lấy căn với 7 và đưa thừa số ra ngoài dấu căn, ta được`, T`Multiply the numerator and the denominator of the radicand by 7 and bring a factor outside the root:`),
            m(T`\sqrt{\frac{4}{7}}=\sqrt{\frac{4\cdot 7}{7^2}}=\sqrt{\left(\frac{2}{7}\right)^2\cdot 7}=\frac{2\sqrt{7}}{7}`)
          ]),
          lt(2, [p(T`Khử mẫu của biểu thức lấy căn $\sqrt{\frac{3}{5}}$.`, T`Eliminate the denominator of the radicand in $\sqrt{\frac{3}{5}}$.`)]),
          { t: 'h3', vi: 'Tranh luận', en: 'Debate' },
          { t: 'talk', lines: [{ who: 'Vuông', vi: T`$\sqrt{(-2)^2\cdot 5}=-2\sqrt{5}$.`, en: T`$\sqrt{(-2)^2\cdot 5}=-2\sqrt{5}$.` }] },
          p(T`Em có đồng ý với cách làm của Vuông không? Vì sao?`, T`Do you agree with Vuông's working? Why or why not?`),
          tip({
            vi: T`*Gợi ý.* Theo công thức $\sqrt{a^2b}=|a|\sqrt{b}$, ta có $\sqrt{(-2)^2\cdot 5}=|-2|\sqrt{5}=2\sqrt{5}$. Căn bậc hai số học luôn không âm nên kết quả $-2\sqrt{5}$ là sai.`,
            en: T`*Hint.* By $\sqrt{a^2b}=|a|\sqrt{b}$ we get $\sqrt{(-2)^2\cdot 5}=|-2|\sqrt{5}=2\sqrt{5}$. A principal square root is never negative, so $-2\sqrt{5}$ is wrong.`
          }),
          h2('2', 'Đưa thừa số vào trong dấu căn', 'Bringing a factor inside the square root'),
          { t: 'h3', vi: 'Cách đưa một thừa số vào trong dấu căn', en: 'How to bring a factor inside the root' },
          act('', { vi: 'Đưa thừa số vào trong dấu căn', en: 'Bringing a factor inside' },
            T`Tính và so sánh: a) $5\cdot\sqrt{4}$ với $\sqrt{5^2\cdot 4}$; b) $-5\cdot\sqrt{4}$ với $-\sqrt{(-5)^2\cdot 4}$.`,
            T`Calculate and compare: a) $5\cdot\sqrt{4}$ with $\sqrt{5^2\cdot 4}$; b) $-5\cdot\sqrt{4}$ with $-\sqrt{(-5)^2\cdot 4}$.`, []),
          key([
            { t: 'list', items: [
              it(T`Nếu $a$ và $b$ là hai số không âm thì $a\sqrt{b}=\sqrt{a^2 b}$.`, T`If $a$ and $b$ are both non-negative, then $a\sqrt{b}=\sqrt{a^2 b}$.`),
              it(T`Nếu $a$ là số âm và $b$ là số không âm thì $a\sqrt{b}=-\sqrt{a^2 b}$.`, T`If $a$ is negative and $b$ is non-negative, then $a\sqrt{b}=-\sqrt{a^2 b}$.`)
            ] }
          ]),
          tip({
            vi: T`**Chú ý.** Các phép biến đổi trên gọi là phép đưa thừa số vào trong dấu căn.`,
            en: T`**Note.** The transformations above are called {bringing a factor inside|factor-inside} the square root sign.`
          })
        ]
      },

      /* ----------------------------------------------------------- Trang 56 */
      {
        number: 56,
        blocks: [
          ex(3, [p(T`Đưa thừa số vào trong dấu căn: a) $5\sqrt{2}$; b) $-2\sqrt{a}$ ($a\ge 0$).`, T`Bring the factor inside the root: a) $5\sqrt{2}$; b) $-2\sqrt{a}$ ($a\ge 0$).`)], [
            p(T`a) $5\sqrt{2}=\sqrt{5^2\cdot 2}=\sqrt{50}$.`, T`a) $5\sqrt{2}=\sqrt{5^2\cdot 2}=\sqrt{50}$.`),
            p(T`b) $-2\sqrt{a}=-\sqrt{2^2\cdot a}=-\sqrt{4a}$.`, T`b) $-2\sqrt{a}=-\sqrt{2^2\cdot a}=-\sqrt{4a}$.`)
          ]),
          ex(4, [p(T`Trả lời câu hỏi trong tình huống mở đầu.`, T`Answer the question in the opening situation.`)], [
            p(T`Ta có $3\sqrt{2}=\sqrt{3^2\cdot 2}=\sqrt{18}$; $2\sqrt{3}=\sqrt{2^2\cdot 3}=\sqrt{12}$.`, T`We have $3\sqrt{2}=\sqrt{3^2\cdot 2}=\sqrt{18}$ and $2\sqrt{3}=\sqrt{2^2\cdot 3}=\sqrt{12}$.`),
            p(T`Vì $\sqrt{12}<\sqrt{18}$ nên $2\sqrt{3}<3\sqrt{2}$.`, T`Since $\sqrt{12}<\sqrt{18}$, we get $2\sqrt{3}<3\sqrt{2}$.`)
          ]),
          lt(3, [p(T`Đưa thừa số vào trong dấu căn: a) $3\sqrt{5}$; b) $-2\sqrt{7}$.`, T`Bring the factor inside the root: a) $3\sqrt{5}$; b) $-2\sqrt{7}$.`)]),
          h2('3', 'Trục căn thức ở mẫu', 'Rationalising the denominator'),
          p(T`Tính toán với các biểu thức có chứa căn ở mẫu thường phức tạp và ta thường tìm cách *trục các căn thức ở mẫu* (tức là biến đổi biểu thức thành một biểu thức mới không chứa căn ở mẫu).`,
            T`Calculations with expressions that have roots in the denominator are often complicated, so we usually try to *{rationalise the denominator|rationalise}* (that is, turn the expression into a new one with no root in the denominator).`),
          { t: 'h3', vi: 'Cách trục căn thức ở mẫu', en: 'How to rationalise a denominator' },
          act(3, { vi: 'Nhân cả tử và mẫu với một căn', en: 'Multiplying by a root' },
            T`Nhân cả tử và mẫu của biểu thức $\frac{3a}{2\sqrt{2}}$ với $\sqrt{2}$ và viết biểu thức nhận được dưới dạng không có căn thức ở mẫu.`,
            T`Multiply the numerator and denominator of $\frac{3a}{2\sqrt{2}}$ by $\sqrt{2}$ and write the result with no root in the denominator.`, []),
          act(4, { vi: 'Dùng biểu thức liên hợp', en: 'Using the conjugate' },
            T`Cho hai biểu thức $\frac{-2}{\sqrt{3}+1}$ và $\frac{1}{\sqrt{3}-\sqrt{2}}$. Hãy thực hiện các yêu cầu sau để viết các biểu thức đó dưới dạng không có căn thức ở mẫu:`,
            T`Take the two expressions $\frac{-2}{\sqrt{3}+1}$ and $\frac{1}{\sqrt{3}-\sqrt{2}}$. Do the following to write them with no root in the denominator:`,
            [
              it(T`Xác định biểu thức liên hợp của mẫu.`, T`Find the {conjugate expression|conjugate} of the denominator.`),
              it(T`Nhân cả tử và mẫu với biểu thức liên hợp của mẫu.`, T`Multiply the numerator and denominator by the conjugate of the denominator.`),
              it(T`Sử dụng hằng đẳng thức hiệu hai bình phương để rút gọn mẫu của biểu thức nhận được.`, T`Use the difference-of-two-squares {identity} to simplify the denominator of the result.`)
            ])
        ]
      },

      /* ----------------------------------------------------------- Trang 57 */
      {
        number: 57,
        blocks: [
          key([
            p(T`Với các biểu thức $A$, $B$ và $B>0$, ta có`, T`For expressions $A$, $B$ with $B>0$:`),
            m(T`\frac{A}{\sqrt{B}}=\frac{A\sqrt{B}}{B}`),
            p(T`Với các biểu thức $A$, $B$, $C$ mà $A\ge 0$, $A\ne B^2$, ta có`, T`For expressions $A$, $B$, $C$ with $A\ge 0$ and $A\ne B^2$:`),
            m(T`\frac{C}{\sqrt{A}+B}=\frac{C(\sqrt{A}-B)}{A-B^2}`),
            m(T`\frac{C}{\sqrt{A}-B}=\frac{C(\sqrt{A}+B)}{A-B^2}`),
            p(T`Với các biểu thức $A$, $B$, $C$ mà $A\ge 0$, $B\ge 0$, $A\ne B$, ta có`, T`For expressions $A$, $B$, $C$ with $A\ge 0$, $B\ge 0$ and $A\ne B$:`),
            m(T`\frac{C}{\sqrt{A}+\sqrt{B}}=\frac{C(\sqrt{A}-\sqrt{B})}{A-B}`),
            m(T`\frac{C}{\sqrt{A}-\sqrt{B}}=\frac{C(\sqrt{A}+\sqrt{B})}{A-B}`)
          ]),
          ex(5, [p(T`Trục căn thức ở mẫu của các biểu thức sau: a) $\frac{2}{3\sqrt{5}}$; b) $\frac{a}{3-2\sqrt{2}}$.`, T`Rationalise the denominators: a) $\frac{2}{3\sqrt{5}}$; b) $\frac{a}{3-2\sqrt{2}}$.`)], [
            p(T`a) Nhân cả tử và mẫu của biểu thức đã cho với $\sqrt{5}$, ta được:`, T`a) Multiply the numerator and denominator by $\sqrt{5}$:`),
            m(T`\frac{2}{3\sqrt{5}}=\frac{2\sqrt{5}}{3(\sqrt{5})^2}=\frac{2\sqrt{5}}{3\cdot 5}=\frac{2\sqrt{5}}{15}`),
            p(T`b) Biểu thức liên hợp của mẫu là $3+2\sqrt{2}$. Nhân cả tử và mẫu của biểu thức đã cho với $3+2\sqrt{2}$, ta được:`, T`b) The {conjugate expression|conjugate} of the denominator is $3+2\sqrt{2}$. Multiply the numerator and denominator by it:`),
            m(T`\frac{a}{3-2\sqrt{2}}=\frac{a(3+2\sqrt{2})}{(3-2\sqrt{2})(3+2\sqrt{2})}=\frac{a(3+2\sqrt{2})}{3^2-(2\sqrt{2})^2}`),
            m(T`=\frac{a(3+2\sqrt{2})}{9-8}=(3+2\sqrt{2})a`)
          ]),
          lt(4, [p(T`Trục căn thức ở mẫu của các biểu thức sau: a) $\frac{-5\sqrt{x^2+1}}{2\sqrt{3}}$; b) $\frac{a^2-2a}{\sqrt{a}+\sqrt{2}}$ ($a\ge 0$, $a\ne 2$).`,
            T`Rationalise the denominators: a) $\frac{-5\sqrt{x^2+1}}{2\sqrt{3}}$; b) $\frac{a^2-2a}{\sqrt{a}+\sqrt{2}}$ ($a\ge 0$, $a\ne 2$).`)]),
          h2('4', 'Rút gọn biểu thức chứa căn thức bậc hai', 'Simplifying expressions with square roots'),
          { t: 'key', title: { vi: 'Ghi nhớ', en: 'Remember' }, blocks: [
            p(T`Khi rút gọn biểu thức có chứa căn thức bậc hai, ta cần phối hợp các phép tính (cộng, trừ, nhân, chia) và các phép biến đổi đã học (đưa thừa số ra ngoài hoặc vào trong dấu căn; khử mẫu của biểu thức lấy căn; trục căn thức ở mẫu).`,
              T`To simplify an expression with square roots, combine the operations (addition, subtraction, multiplication, division) with the transformations we have learned (bringing a factor outside or inside the root; eliminating the denominator of the {radicand|radicand}; rationalising the denominator).`)
          ] }
        ]
      },

      /* ----------------------------------------------------------- Trang 58 */
      {
        number: 58,
        blocks: [
          ex(6, [p(T`Rút gọn biểu thức $A=2\sqrt{3}-\sqrt{75}+\sqrt{(1-\sqrt{3})^2}$.`, T`Simplify $A=2\sqrt{3}-\sqrt{75}+\sqrt{(1-\sqrt{3})^2}$.`)], [
            p(T`Đưa thừa số ra ngoài dấu căn, ta có: $\sqrt{75}=\sqrt{3\cdot 5^2}=5\sqrt{3}$;`, T`Bringing a factor outside the root: $\sqrt{75}=\sqrt{3\cdot 5^2}=5\sqrt{3}$;`),
            m(T`\sqrt{(1-\sqrt{3})^2}=|1-\sqrt{3}|=\sqrt{3}-1`),
            p(T`Do đó $A=2\sqrt{3}-5\sqrt{3}+\sqrt{3}-1=-1-2\sqrt{3}$.`, T`Therefore $A=2\sqrt{3}-5\sqrt{3}+\sqrt{3}-1=-1-2\sqrt{3}$.`)
          ]),
          ex(7, [
            p(T`a) Trục căn thức ở mẫu của các biểu thức $\frac{x^2-1}{\sqrt{x}-1}$; $\frac{x^2-x}{\sqrt{x}+1}$ với $x\ge 0$ và $x\ne 1$.`,
              T`a) Rationalise the denominators of $\frac{x^2-1}{\sqrt{x}-1}$ and $\frac{x^2-x}{\sqrt{x}+1}$ for $x\ge 0$ and $x\ne 1$.`),
            p(T`b) Sử dụng kết quả câu a, rút gọn biểu thức $P=\frac{x^2-1}{\sqrt{x}-1}-\frac{x^2-x}{\sqrt{x}+1}$ với $x\ge 0$ và $x\ne 1$.`,
              T`b) Use part a to simplify $P=\frac{x^2-1}{\sqrt{x}-1}-\frac{x^2-x}{\sqrt{x}+1}$ for $x\ge 0$ and $x\ne 1$.`)
          ], [
            p(T`a) Ta có`, T`a) We have`),
            m(T`\frac{x^2-1}{\sqrt{x}-1}=\frac{(x^2-1)(\sqrt{x}+1)}{(\sqrt{x}-1)(\sqrt{x}+1)}=\frac{(x-1)(x+1)(\sqrt{x}+1)}{x-1}`),
            m(T`=(x+1)(\sqrt{x}+1)=x\sqrt{x}+\sqrt{x}+x+1;`),
            m(T`\frac{x^2-x}{\sqrt{x}+1}=\frac{(x^2-x)(\sqrt{x}-1)}{(\sqrt{x}+1)(\sqrt{x}-1)}=\frac{x(x-1)(\sqrt{x}-1)}{x-1}=x(\sqrt{x}-1)=x\sqrt{x}-x.`),
            p(T`b) Sử dụng kết quả câu a ta có`, T`b) Using part a:`),
            m(T`P=(x\sqrt{x}+\sqrt{x}+x+1)-(x\sqrt{x}-x)=2x+\sqrt{x}+1`)
          ]),
          lt(5, [p(T`Rút gọn biểu thức sau: $\left(\frac{\sqrt{22}-\sqrt{11}}{1-\sqrt{2}}+\frac{\sqrt{21}-\sqrt{7}}{1-\sqrt{3}}\right)(\sqrt{7}-\sqrt{11})$.`,
            T`Simplify: $\left(\frac{\sqrt{22}-\sqrt{11}}{1-\sqrt{2}}+\frac{\sqrt{21}-\sqrt{7}}{1-\sqrt{3}}\right)(\sqrt{7}-\sqrt{11})$.`)]),
          vd('', [
            p(T`Trong thuyết tương đối, khối lượng $m$ (kg) của một vật khi chuyển động với vận tốc $v$ (m/s) được cho bởi công thức`,
              T`In the theory of relativity, the mass $m$ (kg) of an object moving at speed $v$ (m/s) is given by`),
            m(T`m=\frac{m_0}{\sqrt{1-\frac{v^2}{c^2}}}`),
            p(T`trong đó $m_0$ (kg) là khối lượng của vật khi đứng yên, $c$ (m/s) là vận tốc của ánh sáng trong chân không (Theo *Vật lí đại cương*, NXB Giáo dục Việt Nam, 2016).`,
              T`where $m_0$ (kg) is the mass of the object at rest and $c$ (m/s) is the speed of light in a vacuum (from *Vật lí đại cương*, Vietnam Education Publishing House, 2016).`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 59 */
      {
        number: 59,
        blocks: [
          { t: 'olist', style: 'alpha', items: [
            it(T`Viết lại công thức tính khối lượng $m$ dưới dạng không có căn thức ở mẫu.`, T`Rewrite the formula for $m$ with no root in the denominator.`),
            it(T`Tính khối lượng $m$ theo $m_0$ (làm tròn đến chữ số thập phân thứ ba) khi vật chuyển động với vận tốc $v=\frac{1}{10}c$.`, T`Find $m$ in terms of $m_0$ (rounded to the third decimal place) when the object moves at $v=\frac{1}{10}c$.`)
          ] },
          head('practice', 'Bài tập', 'Exercises'),
          bt('3.17', T`Đưa thừa số ra ngoài dấu căn: a) $\sqrt{52}$; b) $\sqrt{27a}$ ($a\ge 0$); c) $\sqrt{50\sqrt{2}+100}$; d) $\sqrt{9\sqrt{5}-18}$.`,
            T`Bring a factor outside the root: a) $\sqrt{52}$; b) $\sqrt{27a}$ ($a\ge 0$); c) $\sqrt{50\sqrt{2}+100}$; d) $\sqrt{9\sqrt{5}-18}$.`),
          bt('3.18', T`Đưa thừa số vào trong dấu căn: a) $4\sqrt{3}$; b) $-2\sqrt{7}$; c) $4\sqrt{\frac{15}{2}}$; d) $-5\sqrt{\frac{16}{5}}$.`,
            T`Bring the factor inside the root: a) $4\sqrt{3}$; b) $-2\sqrt{7}$; c) $4\sqrt{\frac{15}{2}}$; d) $-5\sqrt{\frac{16}{5}}$.`),
          bt('3.19', T`Khử mẫu trong dấu căn: a) $2a\cdot\sqrt{\frac{3}{5}}$; b) $-3x\cdot\sqrt{\frac{5}{x}}$ ($x>0$); c) $-\sqrt{\frac{3a}{b}}$ ($a\ge 0$, $b>0$).`,
            T`Eliminate the denominator inside the root: a) $2a\cdot\sqrt{\frac{3}{5}}$; b) $-3x\cdot\sqrt{\frac{5}{x}}$ ($x>0$); c) $-\sqrt{\frac{3a}{b}}$ ($a\ge 0$, $b>0$).`),
          bt('3.20', T`Trục căn thức ở mẫu: a) $\frac{4+3\sqrt{5}}{\sqrt{5}}$; b) $\frac{1}{\sqrt{5}-2}$; c) $\frac{3+\sqrt{3}}{1-\sqrt{3}}$; d) $\frac{\sqrt{2}}{\sqrt{3}+\sqrt{2}}$.`,
            T`Rationalise the denominator: a) $\frac{4+3\sqrt{5}}{\sqrt{5}}$; b) $\frac{1}{\sqrt{5}-2}$; c) $\frac{3+\sqrt{3}}{1-\sqrt{3}}$; d) $\frac{\sqrt{2}}{\sqrt{3}+\sqrt{2}}$.`),
          bt('3.21', T`Rút gọn các biểu thức sau: a) $2\sqrt{\frac{2}{3}}-4\sqrt{\frac{3}{2}}$; b) $\frac{5\sqrt{48}-3\sqrt{27}+2\sqrt{12}}{\sqrt{3}}$; c) $\frac{1}{3+2\sqrt{2}}+\frac{4\sqrt{2}-4}{2-\sqrt{2}}$.`,
            T`Simplify: a) $2\sqrt{\frac{2}{3}}-4\sqrt{\frac{3}{2}}$; b) $\frac{5\sqrt{48}-3\sqrt{27}+2\sqrt{12}}{\sqrt{3}}$; c) $\frac{1}{3+2\sqrt{2}}+\frac{4\sqrt{2}-4}{2-\sqrt{2}}$.`),
          bt('3.22', T`Rút gọn biểu thức $A=\sqrt{x}\left(\frac{1}{\sqrt{x}+3}-\frac{1}{3-\sqrt{x}}\right)$ ($x\ge 0$, $x\ne 9$).`,
            T`Simplify $A=\sqrt{x}\left(\frac{1}{\sqrt{x}+3}-\frac{1}{3-\sqrt{x}}\right)$ ($x\ge 0$, $x\ne 9$).`)
        ]
      }
    ]
  };

  /* ========================================================================
     BÀI 10. CĂN BẬC BA VÀ CĂN THỨC BẬC BA
     ======================================================================== */
  D.lessons['toan9-bai10'] = {
    gradeId: 9,
    number: '10',
    book: 'Toán 9',
    title: { vi: 'Căn bậc ba và căn thức bậc ba', en: 'Cube roots and cube-root expressions' },
    topic,
    spreadLabels: [
      'Căn bậc ba',
      'Căn thức bậc ba, bài tập'
    ],
    pages: [
      /* ----------------------------------------------------------- Trang 60 */
      {
        number: 60,
        blocks: [
          { t: 'banner' },
          goals(
            it(T`Nhận biết căn bậc ba của một số thực.`, T`Recognise the {cube root} of a real number.`),
            it(T`Tính giá trị đúng, gần đúng của căn bậc ba của một số bằng máy tính cầm tay.`, T`Find exact and approximate values of the cube root of a number with a {calculator}.`),
            it(T`Nhận biết căn thức bậc ba của một biểu thức đại số.`, T`Recognise the {cube-root expression|cube-root-expression} of an algebraic expression.`)
          ),
          p(T`Căn bậc hai của một số thực (dương) có một vai trò quan trọng trong đời sống và toán học. Căn bậc hai của số thực $a$ không âm là các số thực $x$ thoả mãn điều kiện $x^2=a$. Trong bài học này, các em sẽ được làm quen với khái niệm căn bậc ba, một khái niệm tương tự khái niệm căn bậc hai.`,
            T`The {square root} of a (positive) real number plays an important role in life and in mathematics. The square roots of a non-negative real number $a$ are the real numbers $x$ with $x^2=a$. In this lesson you will meet the {cube root}, a concept similar to the square root.`, { badge: 'book' }),
          h2('1', 'Căn bậc ba', 'Cube roots'),
          { t: 'h3', vi: 'Căn bậc ba của một số thực', en: 'The cube root of a real number' },
          act('', { vi: 'Thể tích hình lập phương', en: 'Volume of a cube' },
            T`Kí hiệu $V$ là thể tích của hình lập phương với cạnh $x$. Hãy thay dấu "?" trong bảng sau bằng các giá trị thích hợp.`,
            T`Let $V$ be the volume of a cube with edge $x$. Replace each "?" in the table with a suitable value.`,
            [
              it(T`$x=2$ thì $V=x^3=8$.`, T`$x=2$ gives $V=x^3=8$.`),
              it(T`$x=\;?$ thì $V=27$.`, T`$x=\;?$ gives $V=27$.`),
              it(T`$x=\;?$ thì $V=64$.`, T`$x=\;?$ gives $V=64$.`)
            ]),
          p(T`Tổng quát, ta định nghĩa:`, T`In general, we define:`),
          key([
            p(T`**Căn bậc ba** của số thực $a$ là số thực $x$ thoả mãn $x^3=a$.`, T`The **{cube root}** of a real number $a$ is the real number $x$ satisfying $x^3=a$.`),
            m(T`x=\sqrt[3]{a}\ \Longleftrightarrow\ x^3=a`)
          ]),
          tip({
            vi: T`**Chú ý.** Mỗi số $a$ đều có duy nhất một căn bậc ba. Căn bậc ba của số $a$ được kí hiệu là $\sqrt[3]{a}$. Trong kí hiệu $\sqrt[3]{a}$, số 3 được gọi là *chỉ số* của căn. Phép tìm căn bậc ba của một số gọi là *phép khai căn bậc ba*.`,
            en: T`**Note.** Every number $a$ has exactly one cube root. The cube root of $a$ is written $\sqrt[3]{a}$. In the symbol $\sqrt[3]{a}$ the number 3 is called the *{index|index-of-root}* of the root. Finding the cube root of a number is called *taking the cube root*.`
          }),
          ex(1, [
            p(T`a) Chứng tỏ rằng $\sqrt[3]{64}=4$. b) Tính $\sqrt[3]{0}$ và $\sqrt[3]{-27}$.`, T`a) Show that $\sqrt[3]{64}=4$. b) Evaluate $\sqrt[3]{0}$ and $\sqrt[3]{-27}$.`)
          ], [
            p(T`a) Vì $4^3=64$ nên $\sqrt[3]{64}=4$.`, T`a) Since $4^3=64$, we have $\sqrt[3]{64}=4$.`),
            p(T`b) Vì $0^3=0$ nên $\sqrt[3]{0}=0$. Vì $(-3)^3=-27$ nên $\sqrt[3]{-27}=-3$.`, T`b) Since $0^3=0$, $\sqrt[3]{0}=0$. Since $(-3)^3=-27$, $\sqrt[3]{-27}=-3$.`)
          ]),
          tip({
            vi: T`**Nhận xét.** Từ định nghĩa căn bậc ba, ta có $\left(\sqrt[3]{a}\right)^3=\sqrt[3]{a^3}=a$ với mọi số thực $a$. Do đó có thể giải Ví dụ 1 như sau: $\sqrt[3]{64}=\sqrt[3]{4^3}=4$.`,
            en: T`**Remark.** From the definition, $\left(\sqrt[3]{a}\right)^3=\sqrt[3]{a^3}=a$ for every real number $a$. So Example 1 can also be solved like this: $\sqrt[3]{64}=\sqrt[3]{4^3}=4$.`
          })
        ]
      },

      /* ----------------------------------------------------------- Trang 61 */
      {
        number: 61,
        blocks: [
          lt(1, [p(T`Tính: a) $\sqrt[3]{125}$; b) $\sqrt[3]{0{,}008}$; c) $\sqrt[3]{\frac{-8}{27}}$.`, T`Evaluate: a) $\sqrt[3]{125}$; b) $\sqrt[3]{0.008}$; c) $\sqrt[3]{\frac{-8}{27}}$.`)]),
          { t: 'h3', vi: 'Tính căn bậc ba của một số bằng máy tính cầm tay', en: 'Finding a cube root with a calculator' },
          p(T`Ta có thể sử dụng loại MTCT thích hợp để tính căn bậc ba của một số. Chẳng hạn, để tính $\sqrt[3]{12}$ và $\sqrt[3]{343}$ ta làm như sau:`,
            T`We can use a suitable {calculator} to find the cube root of a number. For example, to find $\sqrt[3]{343}$ and $\sqrt[3]{12}$:`),
          { t: 'steps', items: [
            { label: { vi: '$\\sqrt[3]{343}$', en: '$\\sqrt[3]{343}$' }, vi: T`Bấm các phím [[SHIFT]] [[√]] [[3]] [[4]] [[3]] [[=]]. Kết quả: **7**.`, en: T`Press [[SHIFT]] [[√]] [[3]] [[4]] [[3]] [[=]]. Result: **7**.` },
            { label: { vi: '$\\sqrt[3]{12}$', en: '$\\sqrt[3]{12}$' }, vi: T`Bấm các phím [[SHIFT]] [[√]] [[1]] [[2]] [[=]]. Kết quả: **2,289428485**.`, en: T`Press [[SHIFT]] [[√]] [[1]] [[2]] [[=]]. Result: **2.289428485**.` }
          ] },
          tip({
            vi: T`**Chú ý.** Màn hình MTCT chỉ hiển thị được một số hữu hạn chữ số nên các kết quả là số thập phân vô hạn (tuần hoàn hay không tuần hoàn) đều được làm tròn, chẳng hạn: $\sqrt[3]{12}\approx 2{,}289428485$.`,
            en: T`**Note.** A calculator screen shows only finitely many digits, so any result that is an infinite decimal (recurring or non-recurring) is rounded, for example $\sqrt[3]{12}\approx 2.289428485$.`
          }),
          ex(2, [p(T`Sử dụng MTCT, tính $\sqrt[3]{3{,}25}$ rồi làm tròn kết quả đến chữ số thập phân thứ hai.`, T`Use a {calculator} to find $\sqrt[3]{3.25}$, then round to two decimal places.`)], [
            p(T`Bấm các phím [[SHIFT]] [[√]] [[3]] [[.]] [[2]] [[5]] [[=]], màn hình hiện kết quả 1,481248034. Làm tròn đến chữ số thập phân thứ hai ta được $\sqrt[3]{3{,}25}\approx 1{,}48$.`,
              T`Press [[SHIFT]] [[√]] [[3]] [[.]] [[2]] [[5]] [[=]]; the screen shows 1.481248034. Rounded to two decimal places, $\sqrt[3]{3.25}\approx 1.48$.`)
          ]),
          lt(2, [p(T`Sử dụng MTCT, tính $\sqrt[3]{45}$ và làm tròn kết quả với độ chính xác 0,005.`, T`Use a {calculator} to find $\sqrt[3]{45}$ and round the result with accuracy 0.005.`)]),
          { t: 'h3', vi: 'Thử thách nhỏ', en: 'A small challenge' },
          { t: 'talk', lines: [{ who: 'Tròn', vi: T`Có thể xếp 125 khối lập phương đơn vị (có cạnh bằng 1 cm) thành một khối lập phương lớn được không nhỉ?`,
            en: T`Can 125 unit cubes (each with edge 1 cm) be stacked into one big cube?` }] },
          tip({
            vi: T`*Gợi ý.* Có, vì $125=5^3$: xếp thành khối lập phương lớn có cạnh $\sqrt[3]{125}=5$ cm.`,
            en: T`*Hint.* Yes: since $125=5^3$, they form a big cube with edge $\sqrt[3]{125}=5$ cm.`
          }),
          h2('2', 'Căn thức bậc ba', 'Cube-root expressions'),
          { t: 'h3', vi: 'Nhận biết căn thức bậc ba', en: 'Recognising a cube-root expression' },
          p(T`Tương tự như căn thức bậc hai, ta có định nghĩa sau:`, T`Just like {radical expressions|radical-expression} for square roots, we have the following definition:`),
          key([
            p(T`**Căn thức bậc ba** là biểu thức có dạng $\sqrt[3]{A}$, trong đó $A$ là một biểu thức đại số.`,
              T`A **{cube-root expression|cube-root-expression}** is an expression of the form $\sqrt[3]{A}$, where $A$ is an algebraic expression.`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 62 */
      {
        number: 62,
        blocks: [
          tip({
            vi: T`**Chú ý.** (1) Tương tự căn bậc ba của một số, ta cũng có $\left(\sqrt[3]{A}\right)^3=\sqrt[3]{A^3}=A$ ($A$ là một biểu thức). (2) Để tính giá trị của $\sqrt[3]{A}$ tại những giá trị cho trước của biến, ta thay các giá trị cho trước của biến vào căn thức rồi tính giá trị của biểu thức số nhận được.`,
            en: T`**Note.** (1) As with the cube root of a number, $\left(\sqrt[3]{A}\right)^3=\sqrt[3]{A^3}=A$ ($A$ is an expression). (2) To find the value of $\sqrt[3]{A}$ for given values of the variable, substitute those values into the radical and evaluate the numerical expression you get.`
          }),
          key([
            p(T`**Phần này không có trong sách giáo khoa.** Tương tự căn bậc hai, căn bậc ba có hai tính chất sau, và khác căn bậc hai ở chỗ không cần điều kiện không âm của $A$, $B$:`,
              T`**This part is not in the textbook.** Like square roots, {cube roots|cube-root} have the two properties below. Unlike square roots, they need no non-negativity condition on $A$ and $B$:`),
            m(T`\sqrt[3]{AB}=\sqrt[3]{A}\cdot\sqrt[3]{B}`),
            m(T`\sqrt[3]{\frac{A}{B}}=\frac{\sqrt[3]{A}}{\sqrt[3]{B}}\quad(B\ne 0)`),
            p(T`Ví dụ: $\sqrt[3]{-8\cdot 27}=\sqrt[3]{-8}\cdot\sqrt[3]{27}=(-2)\cdot 3=-6$ và $\sqrt[3]{\frac{-8}{27}}=\frac{\sqrt[3]{-8}}{\sqrt[3]{27}}=-\frac{2}{3}$.`,
              T`For example, $\sqrt[3]{-8\cdot 27}=\sqrt[3]{-8}\cdot\sqrt[3]{27}=(-2)\cdot 3=-6$ and $\sqrt[3]{\frac{-8}{27}}=\frac{\sqrt[3]{-8}}{\sqrt[3]{27}}=-\frac{2}{3}$.`)
          ], { vi: 'Mở rộng', en: 'Extension' }),
          ex(3, [p(T`Tính giá trị của căn thức $\sqrt[3]{2x+5}$ tại: a) $x=60$; b) $x=-6{,}5$.`, T`Find the value of $\sqrt[3]{2x+5}$ at: a) $x=60$; b) $x=-6.5$.`)], [
            p(T`a) Với $x=60$ ta có $\sqrt[3]{2\cdot 60+5}=\sqrt[3]{125}=\sqrt[3]{5^3}=5$.`, T`a) For $x=60$: $\sqrt[3]{2\cdot 60+5}=\sqrt[3]{125}=\sqrt[3]{5^3}=5$.`),
            p(T`b) Với $x=-6{,}5$ ta có $\sqrt[3]{2\cdot(-6{,}5)+5}=\sqrt[3]{-8}=\sqrt[3]{(-2)^3}=-2$.`, T`b) For $x=-6.5$: $\sqrt[3]{2\cdot(-6.5)+5}=\sqrt[3]{-8}=\sqrt[3]{(-2)^3}=-2$.`)
          ]),
          ex(4, [p(T`Rút gọn biểu thức $-x+5+\sqrt[3]{x^3+3x^2+3x+1}$.`, T`Simplify $-x+5+\sqrt[3]{x^3+3x^2+3x+1}$.`)], [
            p(T`Ta có $x^3+3x^2+3x+1=(x+1)^3$ (hằng đẳng thức lập phương của một tổng).`, T`We have $x^3+3x^2+3x+1=(x+1)^3$ (the {identity} for the cube of a sum).`),
            m(T`-x+5+\sqrt[3]{(x+1)^3}=-x+5+(x+1)=6`)
          ]),
          lt(3, [
            p(T`a) Tính giá trị của căn thức $\sqrt[3]{5x-1}$ tại $x=0$ và tại $x=-1{,}4$. b) Rút gọn biểu thức $\sqrt[3]{x^3-3x^2+3x-1}$.`,
              T`a) Find the value of $\sqrt[3]{5x-1}$ at $x=0$ and at $x=-1.4$. b) Simplify $\sqrt[3]{x^3-3x^2+3x-1}$.`)
          ]),
          head('practice', 'Bài tập', 'Exercises'),
          bt('3.23', T`Tính: a) $\sqrt[3]{216}$; b) $\sqrt[3]{-512}$; c) $\sqrt[3]{-0{,}001}$; d) $\sqrt[3]{1{,}331}$.`, T`Evaluate: a) $\sqrt[3]{216}$; b) $\sqrt[3]{-512}$; c) $\sqrt[3]{-0.001}$; d) $\sqrt[3]{1.331}$.`),
          bt('3.24', T`Sử dụng MTCT, tính các căn bậc ba sau đây (làm tròn kết quả đến chữ số thập phân thứ hai): a) $\sqrt[3]{2{,}1}$; b) $\sqrt[3]{-18}$; c) $\sqrt[3]{-28}$; d) $\sqrt[3]{0{,}35}$.`,
            T`Use a {calculator} to evaluate these cube roots (round to two decimal places): a) $\sqrt[3]{2.1}$; b) $\sqrt[3]{-18}$; c) $\sqrt[3]{-28}$; d) $\sqrt[3]{0.35}$.`),
          bt('3.25', T`Một người thợ muốn làm một thùng tôn hình lập phương có thể tích bằng 730 dm³. Em hãy ước lượng chiều dài cạnh thùng khoảng bao nhiêu decimét.`,
            T`A craftsman wants to make a cube-shaped sheet-metal tank with a volume of 730 dm³. Estimate the edge length of the tank in decimetres.`),
          bt('3.26', T`Rút gọn các biểu thức sau: a) $\sqrt[3]{(1-\sqrt{2})^3}$; b) $\sqrt[3]{(2\sqrt{2}+1)^3}$; c) $\left(\sqrt[3]{\sqrt{2}+1}\right)^3$.`,
            T`Simplify: a) $\sqrt[3]{(1-\sqrt{2})^3}$; b) $\sqrt[3]{(2\sqrt{2}+1)^3}$; c) $\left(\sqrt[3]{\sqrt{2}+1}\right)^3$.`),
          bt('3.27', T`Rút gọn rồi tính giá trị của biểu thức $\sqrt[3]{27x^3-27x^2+9x-1}$ tại $x=7$.`,
            T`Simplify, then find the value of $\sqrt[3]{27x^3-27x^2+9x-1}$ at $x=7$.`)
        ]
      }
    ]
  };

  /* ========================================================================
     LUYỆN TẬP CHUNG (tr. 63–64)
     ======================================================================== */
  D.lessons['toan9-ltc3b'] = {
    gradeId: 9,
    number: 'LT',
    book: 'Toán 9',
    title: { vi: 'Luyện tập chung', en: 'General practice' },
    topic,
    spreadLabels: ['Ví dụ: rút gọn và thể tích', 'Bài tập'],
    pages: [
      /* ----------------------------------------------------------- Trang 63 */
      {
        number: 63,
        blocks: [
          { t: 'banner' },
          ex(1, [p(T`Rút gọn biểu thức $A=\sqrt{(\sqrt{3}+1)^2}-\sqrt{3(\sqrt{3}+1)^2}+\sqrt{4}$.`, T`Simplify $A=\sqrt{(\sqrt{3}+1)^2}-\sqrt{3(\sqrt{3}+1)^2}+\sqrt{4}$.`)], [
            m(T`A=\sqrt{(\sqrt{3}+1)^2}-\sqrt{3}\cdot\sqrt{(\sqrt{3}+1)^2}+\sqrt{2^2}=(\sqrt{3}+1)-\sqrt{3}(\sqrt{3}+1)+2=0`)
          ]),
          ex(2, [
            p(T`Cho biểu thức $P=\frac{\sqrt{x}}{\sqrt{x}+1}+\frac{\sqrt{x}}{\sqrt{x}-1}$ với $x\ge 0$ và $x\ne 1$. a) Rút gọn $P$. b) Sử dụng kết quả câu a, tính giá trị của $P$ khi $x=101$.`,
              T`Let $P=\frac{\sqrt{x}}{\sqrt{x}+1}+\frac{\sqrt{x}}{\sqrt{x}-1}$ for $x\ge 0$ and $x\ne 1$. a) Simplify $P$. b) Using part a, find $P$ when $x=101$.`)
          ], [
            p(T`a) Quy đồng mẫu số:`, T`a) Put over a common denominator:`),
            m(T`P=\frac{\sqrt{x}(\sqrt{x}-1)+\sqrt{x}(\sqrt{x}+1)}{(\sqrt{x}+1)(\sqrt{x}-1)}=\frac{x-\sqrt{x}+x+\sqrt{x}}{x-1}=\frac{2x}{x-1}`),
            p(T`b) Khi $x=101$ thì $P=\frac{2\cdot 101}{101-1}=\frac{202}{100}=2{,}02$.`, T`b) When $x=101$: $P=\frac{2\cdot 101}{101-1}=\frac{202}{100}=2.02$.`)
          ]),
          ex(3, [
            p(T`Người ta cần làm một thùng hình lập phương bằng bìa cứng không có nắp trên và có thể tích 216 dm³ để đựng đồ. Tính diện tích bìa cứng cần dùng để làm thùng đựng đó (coi diện tích các mép nối là không đáng kể).`,
              T`A cube-shaped box with no top lid and a volume of 216 dm³ is to be made from cardboard. Find the area of cardboard needed (ignore the area of the joints).`)
          ], [
            p(T`Gọi $x$ (dm, $x>0$) là độ dài cạnh của thùng hình lập phương cần làm. Ta có $x^3=216$, suy ra $x=\sqrt[3]{216}=6$ (dm).`,
              T`Let $x$ (dm, $x>0$) be the edge of the cube. Then $x^3=216$, so $x=\sqrt[3]{216}=6$ (dm).`),
            p(T`Vì thùng đựng không có nắp nên thùng gồm 4 mặt bên và 1 mặt đáy, mỗi mặt là một hình vuông cạnh 6 dm. Do đó diện tích bìa cứng cần dùng là`,
              T`The box has no lid, so it consists of 4 side faces and 1 base, each a square of side 6 dm. The cardboard needed therefore has area`),
            m(T`S=5\cdot 6^2=180\ (\text{dm}^2)`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 64 */
      {
        number: 64,
        blocks: [
          head('practice', 'Bài tập', 'Exercises'),
          bt('3.28', T`Rút gọn các biểu thức sau: a) $\frac{5+3\sqrt{5}}{\sqrt{5}}-\frac{1}{\sqrt{5}-2}$; b) $\sqrt{(\sqrt{7}-2)^2}-\sqrt{63}+\frac{\sqrt{56}}{\sqrt{2}}$; c) $\frac{\sqrt{(\sqrt{3}+\sqrt{2})^2}+\sqrt{(\sqrt{3}-\sqrt{2})^2}}{2\sqrt{12}}$; d) $\frac{\sqrt[3]{(\sqrt{2}+1)^3}-1}{\sqrt{50}}$.`,
            T`Simplify: a) $\frac{5+3\sqrt{5}}{\sqrt{5}}-\frac{1}{\sqrt{5}-2}$; b) $\sqrt{(\sqrt{7}-2)^2}-\sqrt{63}+\frac{\sqrt{56}}{\sqrt{2}}$; c) $\frac{\sqrt{(\sqrt{3}+\sqrt{2})^2}+\sqrt{(\sqrt{3}-\sqrt{2})^2}}{2\sqrt{12}}$; d) $\frac{\sqrt[3]{(\sqrt{2}+1)^3}-1}{\sqrt{50}}$.`),
          bt('3.29', T`Tính giá trị của các biểu thức sau: a) $3\sqrt{45}+\frac{5\sqrt{15}}{\sqrt{3}}-2\sqrt{245}$; b) $\frac{\sqrt{12}-\sqrt{4}}{\sqrt{3}-1}-\frac{\sqrt{21}+\sqrt{7}}{\sqrt{3}+1}+\sqrt{7}$; c) $\frac{3-\sqrt{3}}{1-\sqrt{3}}+\sqrt{3}(2\sqrt{3}-1)+\sqrt{12}$; d) $\frac{\sqrt{3}-1}{\sqrt{2}}+\frac{\sqrt{2}}{\sqrt{3}-1}-\frac{6}{\sqrt{6}}$.`,
            T`Evaluate: a) $3\sqrt{45}+\frac{5\sqrt{15}}{\sqrt{3}}-2\sqrt{245}$; b) $\frac{\sqrt{12}-\sqrt{4}}{\sqrt{3}-1}-\frac{\sqrt{21}+\sqrt{7}}{\sqrt{3}+1}+\sqrt{7}$; c) $\frac{3-\sqrt{3}}{1-\sqrt{3}}+\sqrt{3}(2\sqrt{3}-1)+\sqrt{12}$; d) $\frac{\sqrt{3}-1}{\sqrt{2}}+\frac{\sqrt{2}}{\sqrt{3}-1}-\frac{6}{\sqrt{6}}$.`),
          bt('3.30', T`Giả sử lực $F$ của gió khi thổi theo phương vuông góc với bề mặt cánh buồm của một con thuyền tỉ lệ thuận với bình phương tốc độ của gió, hệ số tỉ lệ là 30. Trong đó, lực $F$ được tính bằng N (Newton) và tốc độ được tính bằng m/s. a) Khi tốc độ của gió là 10 m/s thì lực $F$ là bao nhiêu Newton? b) Nếu cánh buồm chỉ có thể chịu được một áp lực tối đa là 12 000 N thì con thuyền đó có thể đi được trong gió với tốc độ gió tối đa là bao nhiêu?`,
            T`Suppose the force $F$ of wind blowing perpendicular to a boat's sail is directly proportional to the square of the wind speed, with constant of proportionality 30. Here $F$ is in N (newtons) and speed is in m/s. a) When the wind speed is 10 m/s, what is $F$ in newtons? b) If the sail can bear a pressure of at most 12 000 N, what is the maximum wind speed the boat can sail in?`),
          bt('3.31', T`Rút gọn các biểu thức sau: a) $\sqrt[3]{(-x-1)^3}$; b) $\sqrt[3]{8x^3-12x^2+6x-1}$.`, T`Simplify: a) $\sqrt[3]{(-x-1)^3}$; b) $\sqrt[3]{8x^3-12x^2+6x-1}$.`)
        ]
      }
    ]
  };

  /* ========================================================================
     BÀI TẬP CUỐI CHƯƠNG III (tr. 65)
     ======================================================================== */
  D.lessons['toan9-btcc3'] = {
    gradeId: 9,
    number: 'BT',
    book: 'Toán 9',
    title: { vi: 'Bài tập cuối chương III', en: 'Chapter III review exercises' },
    topic,
    spreadLabels: ['Trắc nghiệm và tự luận'],
    pages: [
      {
        number: 65,
        blocks: [
          { t: 'banner' },
          { t: 'h3', vi: 'A. Trắc nghiệm', en: 'A. Multiple choice' },
          bt('3.32', T`Căn bậc hai của 4 là: A. 2; B. $-2$; C. 2 và $-2$; D. $\sqrt{2}$ và $-\sqrt{2}$.`,
            T`The {square root|square-root} of 4 is: A. 2; B. $-2$; C. 2 and $-2$; D. $\sqrt{2}$ and $-\sqrt{2}$.`),
          bt('3.33', T`Căn bậc hai số học của 49 là: A. 7; B. $-7$; C. 7 và $-7$; D. $\sqrt{7}$ và $-\sqrt{7}$.`,
            T`The principal square root of 49 is: A. 7; B. $-7$; C. 7 and $-7$; D. $\sqrt{7}$ and $-\sqrt{7}$.`),
          bt('3.34', T`Rút gọn biểu thức $\sqrt[3]{(4-\sqrt{17})^3}$ ta được: A. $4+\sqrt{17}$; B. $4-\sqrt{17}$; C. $\sqrt{17}-4$; D. $-4-\sqrt{17}$.`,
            T`Simplifying $\sqrt[3]{(4-\sqrt{17})^3}$ gives: A. $4+\sqrt{17}$; B. $4-\sqrt{17}$; C. $\sqrt{17}-4$; D. $-4-\sqrt{17}$.`),
          bt('3.35', T`Độ dài đường kính (mét) của hình tròn có diện tích 4 m² sau khi làm tròn kết quả đến chữ số thập phân thứ hai bằng: A. 2,26; B. 2,50; C. 1,13; D. 1,12.`,
            T`The diameter (in metres) of a circle of area 4 m², rounded to two decimal places, is: A. 2.26; B. 2.50; C. 1.13; D. 1.12.`),
          bt('3.36', T`Một vật rơi tự do từ độ cao 396,9 m. Biết quãng đường chuyển động $S$ (mét) của vật phụ thuộc vào thời gian $t$ (giây) bởi công thức $S=4{,}9t^2$. Vật chạm đất sau: A. 8 giây; B. 5 giây; C. 11 giây; D. 9 giây.`,
            T`An object falls freely from a height of 396.9 m. The distance $S$ (metres) it travels depends on time $t$ (seconds) by $S=4.9t^2$. The object hits the ground after: A. 8 s; B. 5 s; C. 11 s; D. 9 s.`),
          { t: 'h3', vi: 'B. Tự luận', en: 'B. Free-response problems' },
          bt('3.37', T`Không sử dụng MTCT, tính giá trị của biểu thức $A=\sqrt{(\sqrt{3}-2)^2}+\sqrt{4(2+\sqrt{3})^2}-\frac{1}{2-\sqrt{3}}$.`,
            T`Without a calculator, find the value of $A=\sqrt{(\sqrt{3}-2)^2}+\sqrt{4(2+\sqrt{3})^2}-\frac{1}{2-\sqrt{3}}$.`),
          bt('3.38', T`Cho biểu thức $A=\frac{\sqrt{x}+2}{\sqrt{x}-2}-\frac{4}{\sqrt{x}+2}$ ($x\ge 0$ và $x\ne 4$). a) Rút gọn biểu thức $A$. b) Tính giá trị của $A$ tại $x=14$.`,
            T`Let $A=\frac{\sqrt{x}+2}{\sqrt{x}-2}-\frac{4}{\sqrt{x}+2}$ ($x\ge 0$ and $x\ne 4$). a) Simplify $A$. b) Find $A$ at $x=14$.`),
          bt('3.39', T`Biết rằng nhiệt lượng toả ra trên dây dẫn được tính bởi công thức $Q=I^2Rt$, trong đó $Q$ là nhiệt lượng tính bằng đơn vị Joule (J), $R$ là điện trở tính bằng đơn vị Ohm ($\Omega$), $I$ là cường độ dòng điện tính bằng đơn vị Ampe (A), $t$ là thời gian tính bằng giây (s). Dòng điện chạy qua một dây dẫn có $R=10\ \Omega$ trong thời gian 5 giây. a) Thay dấu "?" trong bảng sau bằng các giá trị thích hợp: $I$ (A) = 1; 1,5; 2 thì $Q$ (J) = ?; ?; ?. b) Cường độ dòng điện là bao nhiêu Ampe để nhiệt lượng toả ra trên dây dẫn đạt 800 J?`,
            T`The heat released in a wire is given by $Q=I^2Rt$, where $Q$ is heat in joules (J), $R$ is resistance in ohms ($\Omega$), $I$ is current in amperes (A) and $t$ is time in seconds (s). A current flows through a wire with $R=10\ \Omega$ for 5 seconds. a) Replace each "?" with a suitable value: for $I$ (A) = 1; 1.5; 2 find $Q$ (J) = ?; ?; ?. b) What current (in amperes) makes the heat released reach 800 J?`)
        ]
      }
    ]
  };

})();
