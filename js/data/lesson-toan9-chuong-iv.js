/* ==========================================================================
   TOÁN 9 (TẬP MỘT) — CHƯƠNG IV: HỆ THỨC LƯỢNG TRONG TAM GIÁC VUÔNG
   --------------------------------------------------------------------------
   Các bài trong file này (mỗi bài một mục trong TEXTBOOK.lessons):

     'toan9-bai11'  Bài 11. Tỉ số lượng giác của góc nhọn                       (tr. 66–73)
     'toan9-bai12'  Bài 12. Một số hệ thức giữa cạnh, góc trong tam giác vuông   (tr. 74–78)
     'toan9-ltc4'   Luyện tập chung                                             (tr. 79–80)
     'toan9-btcc4'  Bài tập cuối chương IV                                      (tr. 81–82)

   Lời văn được biên soạn lại, không chép nguyên văn sách giáo khoa.
   Số liệu của các ví dụ, bài tập giữ nguyên để kiểm tra được kết quả.

   QUY ƯỚC VIẾT NỘI DUNG (giống các file Toán 9 trước)
   • Mỗi chuỗi dùng T`...` (String.raw) để viết LaTeX không phải gõ gấp đôi dấu \.
   • Công thức trong $...$: $\sin\alpha$, $\tan\alpha$, $\frac{AC}{BC}$, $30°$, $\triangle ABC$,
     $∠B$. Hỗ trợ \sin \cos \tan \cot \alpha \beta \triangle. Viết góc bằng ký tự ° ′ ″.
   • Thuật ngữ tiếng Anh viết {hypotenuse}; nếu chữ hiển thị khác khoá thì
     {acute angles|acute-angle}. App đổi thành
       <span class="vocab" data-key="acute-angle">…</span>
     (gạch chân nét đứt, bấm để xem IPA, nghĩa, ví dụ, nghe phát âm).
   • Hình vẽ: { t: 'fig', art: 'tri42', no: '4.2', vi: '…', en: '…' } — hàm vẽ nằm trong
     js/illustrations-hinh.js; chữ trong hình có hai dòng Việt/Anh (class "en").
   • **đậm**, *nghiêng*, [[sin]] là phím máy tính.
   • Từ điển nằm ngay đầu file; phần giải nghĩa luôn bắt đầu bằng "Trong Toán: …".
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
    'right-triangle': g('right triangle', '/ˈraɪt ˈtraɪ.æŋ.ɡəl/', 'n', 'tam giác vuông',
      'Trong Toán: Tam giác có một góc vuông (90°). Cạnh đối diện góc vuông là cạnh huyền.',
      'Triangle ABC is a right triangle with a right angle at A.', 'Tam giác ABC là tam giác vuông tại A.'),
    'acute-angle': g('acute angle', '/əˈkjuːt ˈæŋ.ɡəl/', 'n', 'góc nhọn',
      'Trong Toán: Góc có số đo nhỏ hơn 90°. Hai góc còn lại của tam giác vuông đều là góc nhọn.',
      'An acute angle is smaller than 90 degrees.', 'Góc nhọn nhỏ hơn 90 độ.'),
    hypotenuse: g('hypotenuse', '/haɪˈpɒt.ə.njuːs/', 'n', 'cạnh huyền',
      'Trong Toán: Cạnh đối diện góc vuông của tam giác vuông; đây là cạnh dài nhất.',
      'The hypotenuse is the longest side of a right triangle.', 'Cạnh huyền là cạnh dài nhất của tam giác vuông.'),
    'opposite-side': g('opposite side', '/ˈɒp.ə.zɪt saɪd/', 'n', 'cạnh đối',
      'Trong Toán: Cạnh nằm đối diện với một góc nhọn đang xét trong tam giác vuông.',
      'The opposite side of angle B is AC.', 'Cạnh đối của góc B là AC.'),
    'adjacent-side': g('adjacent side', '/əˈdʒeɪ.sənt saɪd/', 'n', 'cạnh kề',
      'Trong Toán: Cạnh góc vuông nằm kề góc nhọn đang xét (không phải cạnh huyền).',
      'The adjacent side of angle B is AB.', 'Cạnh kề của góc B là AB.'),
    sine: g('sine', '/saɪn/', 'n', 'sin (sin của góc nhọn)',
      'Trong Toán: Tỉ số giữa cạnh đối và cạnh huyền, kí hiệu sin α.',
      'The sine of angle B is AC divided by BC.', 'Sin của góc B bằng AC chia BC.'),
    cosine: g('cosine', '/ˈkəʊ.saɪn/', 'n', 'côsin',
      'Trong Toán: Tỉ số giữa cạnh kề và cạnh huyền, kí hiệu cos α.',
      'The cosine of angle B is AB divided by BC.', 'Côsin của góc B bằng AB chia BC.'),
    tangent: g('tangent', '/ˈtæn.dʒənt/', 'n', 'tang',
      'Trong Toán: Tỉ số giữa cạnh đối và cạnh kề, kí hiệu tan α. (Ở chương đường tròn, tangent còn nghĩa là tiếp tuyến.)',
      'The tangent of 45 degrees is 1.', 'Tang của 45 độ bằng 1.'),
    cotangent: g('cotangent', '/kəʊˈtæn.dʒənt/', 'n', 'côtang',
      'Trong Toán: Tỉ số giữa cạnh kề và cạnh đối, kí hiệu cot α; bằng 1 chia tan α.',
      'The cotangent is the reciprocal of the tangent.', 'Côtang là nghịch đảo của tang.'),
    'trigonometric-ratio': g('trigonometric ratio', '/ˌtrɪɡ.ə.nəˈmet.rɪk ˈreɪ.ʃi.əʊ/', 'n', 'tỉ số lượng giác',
      'Trong Toán: Một trong bốn tỉ số sin, côsin, tang, côtang của góc nhọn, tính từ độ dài các cạnh của tam giác vuông.',
      'The four trigonometric ratios depend only on the angle.', 'Bốn tỉ số lượng giác chỉ phụ thuộc vào góc.'),
    'complementary-angles': g('complementary angles', '/ˌkɒm.plɪˈmen.tər.i ˈæŋ.ɡəlz/', 'n', 'hai góc phụ nhau',
      'Trong Toán: Hai góc có tổng số đo bằng 90°. Với hai góc phụ nhau, sin góc này bằng côsin góc kia.',
      '35 degrees and 55 degrees are complementary angles.', '35° và 55° là hai góc phụ nhau.'),
    'similar-triangles': g('similar triangles', '/ˈsɪm.ɪ.lər ˈtraɪ.æŋ.ɡəlz/', 'n', 'các tam giác đồng dạng',
      'Trong Toán: Hai tam giác có các góc bằng nhau từng đôi một và các cạnh tương ứng tỉ lệ.',
      'Similar triangles have equal angles and proportional sides.', 'Tam giác đồng dạng có các góc bằng nhau và các cạnh tỉ lệ.'),
    'pythagorean-theorem': g('Pythagorean theorem', '/paɪˌθæɡ.əˈriː.ən ˈθɪə.rəm/', 'n', 'định lí Pythagore',
      'Trong Toán: Trong tam giác vuông, bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông.',
      'By the Pythagorean theorem, BC² = AB² + AC².', 'Theo định lí Pythagore, BC² = AB² + AC².'),
    'slope-angle': g('slope angle', '/sləʊp ˈæŋ.ɡəl/', 'n', 'góc dốc',
      'Trong Toán: Góc tạo bởi mặt dốc và mặt phẳng nằm ngang.',
      'The slope angle of the ramp is about 5.7 degrees.', 'Góc dốc của đoạn dốc khoảng 5,7 độ.'),
    'isosceles-triangle': g('isosceles triangle', '/aɪˈsɒs.ə.liːz ˈtraɪ.æŋ.ɡəl/', 'n', 'tam giác cân',
      'Trong Toán: Tam giác có hai cạnh bằng nhau; tam giác vuông cân có hai góc nhọn đều bằng 45°.',
      'An isosceles right triangle has two 45-degree angles.', 'Tam giác vuông cân có hai góc 45°.'),
    'equilateral-triangle': g('equilateral triangle', '/ˌiː.kwɪˈlæt.ər.əl ˈtraɪ.æŋ.ɡəl/', 'n', 'tam giác đều',
      'Trong Toán: Tam giác có ba cạnh bằng nhau và ba góc đều bằng 60°.',
      'Each angle of an equilateral triangle is 60 degrees.', 'Mỗi góc của tam giác đều bằng 60°.'),
    altitude: g('altitude', '/ˈæl.tɪ.tjuːd/', 'n', 'đường cao',
      'Trong Toán: Đoạn thẳng kẻ từ một đỉnh vuông góc xuống cạnh đối diện.',
      'The altitude AH is perpendicular to BC.', 'Đường cao AH vuông góc với BC.')
  });

  /* ------------------------------------------------------------------------
     HÀM TẠO KHỐI
     ------------------------------------------------------------------------ */
  /* Dòng tiếng Việt không dùng thẻ từ vựng: bỏ {chữ|khoá} chỉ giữ chữ hiển thị */
  const sv = (s) => (typeof s === 'string' ? s.replace(/\{([^{}|]+)\|[^{}]*\}/g, '$1') : s);
  const p = (vi, en, extra) => Object.assign({ t: 'p', vi: sv(vi), en }, extra);
  const m = (tex, label) => ({ t: 'math', tex, label });
  const h2 = (n, vi, en) => ({ t: 'h2', n, vi, en });
  const tip = (...items) => ({ t: 'tip', items: items.map((x) => ({ vi: sv(x.vi), en: x.en })) });
  const key = (blocks, title) => ({ t: 'key', title, blocks });
  const steps = (items) => ({ t: 'steps', items });
  const st = (n, vi, en, math) => ({ label: { vi: 'Bước ' + n, en: 'Step ' + n }, vi, en, math });
  const ex = (no, body, solution) => ({ t: 'ex', kind: 'example', no, body, solution });
  const lt = (no, body) => ({ t: 'ex', kind: 'practice', no, body });
  const vd = (no, body) => ({ t: 'ex', kind: 'apply', no, body });
  const act = (no, title, vi, en, items, extra) => Object.assign({ t: 'activity', no, title, vi: sv(vi), en, items: items && items.map((x) => ({ vi: sv(x.vi), en: x.en })), style: 'alpha' }, extra);
  const head = (kind, vi, en) => ({ t: 'head', kind, vi, en });
  const fig = (artName, no, vi, en) => ({ t: 'fig', art: artName, no, vi, en });
  const goals = (...items) => ({ t: 'goals', lead: { vi: 'Sau bài học này em sẽ:', en: 'After this lesson you will:' }, items });
  /* Bài tập cuối bài: số hiệu đậm + đề. */
  const bt = (no, vi, en) => p('**' + no + '.** ' + vi, '**' + no + '.** ' + en);
  /* Gói hai dòng vi/en của một ý nhỏ */
  const it = (vi, en) => ({ vi: sv(vi), en });

  /* ========================================================================
     CHƯƠNG IV (dùng chung cho tất cả các phần)
     ======================================================================== */
  const topic = {
    label: 'Chương', labelEn: 'Chapter', number: 'IV',
    vi: 'Hệ thức lượng trong tam giác vuông',
    en: 'Right-triangle trigonometry'
  };

  /* ========================================================================
     BÀI 11. TỈ SỐ LƯỢNG GIÁC CỦA GÓC NHỌN
     ======================================================================== */
  D.lessons['toan9-bai11'] = {
    gradeId: 9,
    number: '11',
    book: 'Toán 9',
    title: { vi: 'Tỉ số lượng giác của góc nhọn', en: 'Trigonometric ratios of an acute angle' },
    topic,
    spreadLabels: [
      'Khái niệm tỉ số lượng giác',
      'Sin, côsin, tang, côtang; góc 30°, 45°, 60°',
      'Góc phụ nhau; dùng máy tính',
      'Vận dụng, bài tập, em có biết'
    ],
    pages: [
      /* ----------------------------------------------------------- Trang 66 */
      {
        number: 66,
        blocks: [
          { t: 'banner' },
          p(T`Trong chương này ta xét các tỉ số độ dài hai cạnh của một tam giác vuông. Ta sẽ thấy các tỉ số này đặc trưng cho độ lớn của hai góc nhọn của tam giác vuông đó. Nói cách khác, nếu biết được mỗi tỉ số này, ta sẽ biết được độ lớn của hai góc nhọn.`,
            T`In this chapter we look at the ratios of the lengths of two sides of a {right triangle|right-triangle}. These ratios describe the size of the two {acute angles|acute-angle} of that triangle. In other words, if we know one of these ratios, we know how large the two acute angles are.`, { badge: 'book' }),
          goals(
            it(T`Nhận biết sin, côsin, tang, côtang của góc nhọn.`, T`Recognise the {sine}, {cosine}, {tangent} and {cotangent} of an {acute angle|acute-angle}.`),
            it(T`Giải thích bảng tỉ số lượng giác của các góc $30°$, $45°$, $60°$.`, T`Explain the table of {trigonometric ratios|trigonometric-ratio} of $30°$, $45°$ and $60°$.`),
            it(T`Giải thích quan hệ giữa tỉ số lượng giác của hai góc phụ nhau.`, T`Explain the relation between the trigonometric ratios of {complementary angles|complementary-angles}.`),
            it(T`Biết dùng máy tính cầm tay để tính sin, côsin, tang, côtang của một góc nhọn.`, T`Use a {calculator} to find the sine, cosine, tangent and cotangent of an acute angle.`)
          ),
          p(T`Ta có thể xác định "góc dốc" $\alpha$ của một đoạn đường dốc khi biết độ dài của dốc là $a$ và độ cao của đỉnh dốc so với đường nằm ngang là $h$ không? (H.4.1). (Trong các toà chung cư, người ta thường thiết kế đoạn dốc cho người đi xe lăn với góc dốc bé hơn $6°$.)`,
            T`Can we find the "{slope angle|slope-angle}" $\alpha$ of a ramp when we know its length $a$ and the height $h$ of its top above the horizontal ground? (Fig. 4.1). (In apartment buildings, wheelchair ramps are usually designed with a slope angle smaller than $6°$.)`),
          { t: 'fig', art: 'slope', no: '4.1', vi: 'Dốc có góc dốc α', en: 'A ramp with slope angle α' }
        ]
      },

      /* ----------------------------------------------------------- Trang 67 */
      {
        number: 67,
        blocks: [
          h2('1', 'Khái niệm tỉ số lượng giác của một góc nhọn', 'Trigonometric ratios of an acute angle'),
          p(T`Cho tam giác $ABC$ vuông tại $A$. Xét góc nhọn $B$. Cạnh $AC$ gọi là *cạnh đối* của góc $B$, cạnh $AB$ gọi là *cạnh kề* của góc $B$ (H.4.2).`,
            T`Take triangle $ABC$ with a right angle at $A$. Look at the acute angle $B$. Side $AC$ is called the *{opposite side|opposite-side}* of angle $B$ and side $AB$ the *{adjacent side|adjacent-side}* of angle $B$ (Fig. 4.2). The longest side $BC$ is the *{hypotenuse}*.`),
          { t: 'figs', items: [
            { art: 'tri42', no: '4.2', vi: 'Cạnh đối, cạnh kề, cạnh huyền của góc B', en: 'Opposite side, adjacent side and hypotenuse for angle B' },
            { art: 'tri43', no: '4.3', vi: 'Tam giác ABC vuông tại A, xét góc C', en: 'Right triangle ABC (right angle at A), looking at angle C' }
          ] },
          tip({
            vi: T`**Câu hỏi.** Xét góc $C$ của tam giác $ABC$ vuông tại $A$ (H.4.3). Hãy chỉ ra cạnh đối và cạnh kề của góc $C$.`,
            en: T`**Question.** Look at angle $C$ of triangle $ABC$ with a right angle at $A$ (Fig. 4.3). Name the opposite side and the adjacent side of angle $C$.`
          }),
          { t: 'h3', vi: 'Khái niệm sin, côsin, tang, côtang của góc nhọn α', en: 'The sine, cosine, tangent and cotangent of an acute angle α' },
          act(1, { vi: 'Các tam giác vuông cùng góc nhọn', en: 'Right triangles with the same acute angle' },
            T`Cho tam giác $ABC$ vuông tại $A$ và tam giác $A'B'C'$ vuông tại $A'$ có $∠B=∠B'=\alpha$. Chứng minh rằng:`,
            T`Take triangle $ABC$ with a right angle at $A$ and triangle $A'B'C'$ with a right angle at $A'$, where $∠B=∠B'=\alpha$. Prove that:`,
            [
              it(T`$\triangle ABC ∽ \triangle A'B'C'$ (đồng dạng);`, T`$\triangle ABC ∽ \triangle A'B'C'$ ({similar triangles|similar-triangles});`),
              it(T`$\frac{AC}{BC}=\frac{A'C'}{B'C'}$; $\frac{AB}{BC}=\frac{A'B'}{B'C'}$; $\frac{AC}{AB}=\frac{A'C'}{A'B'}$; $\frac{AB}{AC}=\frac{A'B'}{A'C'}$.`, T`$\frac{AC}{BC}=\frac{A'C'}{B'C'}$; $\frac{AB}{BC}=\frac{A'B'}{B'C'}$; $\frac{AC}{AB}=\frac{A'C'}{A'B'}$; $\frac{AB}{AC}=\frac{A'B'}{A'C'}$.`)
            ]),
          tip({
            vi: T`**Nhận xét.** Trong Hình 4.4, các tam giác vuông có cùng một góc nhọn $\alpha$ là đồng dạng với nhau. Vì vậy các tỉ số giữa cạnh đối và cạnh huyền (cạnh kề và cạnh huyền), cạnh đối và cạnh kề (cạnh kề và cạnh đối) của góc nhọn $\alpha$ là như nhau, cho dù độ dài các cạnh đối (các cạnh kề) của góc $\alpha$ và các cạnh huyền có thể khác nhau với từng tam giác.`,
            en: T`**Remark.** In Figure 4.4, all right triangles that share the same acute angle $\alpha$ are similar. So the ratios opposite : hypotenuse (adjacent : hypotenuse) and opposite : adjacent (adjacent : opposite) of angle $\alpha$ are the same, even though the lengths of the opposite sides (adjacent sides) and hypotenuses may differ from triangle to triangle.`
          }),
          { t: 'fig', art: 'similar44', no: '4.4', vi: 'Các tam giác vuông có cùng góc nhọn α đồng dạng', en: 'Right triangles with the same acute angle α are similar' }
        ]
      },

      /* ----------------------------------------------------------- Trang 68 */
      {
        number: 68,
        blocks: [
          p(T`Cho góc nhọn $\alpha$. Xét tam giác $ABC$ vuông tại $A$ có góc nhọn $B$ bằng $\alpha$ (H.4.5). Ta có:`,
            T`Take an acute angle $\alpha$. Consider triangle $ABC$ with a right angle at $A$ and acute angle $B$ equal to $\alpha$ (Fig. 4.5). Then:`),
          { t: 'fig', art: 'tri45', no: '4.5', vi: 'Tam giác ABC vuông tại A có góc B bằng α', en: 'Triangle ABC with a right angle at A and angle B equal to α' },
          key([
            { t: 'list', items: [
              it(T`Tỉ số giữa cạnh đối của góc $\alpha$ và cạnh huyền gọi là sin của $\alpha$, kí hiệu $\sin\alpha$.`, T`The ratio of the side opposite $\alpha$ to the hypotenuse is the **{sine}** of $\alpha$, written $\sin\alpha$.`),
              it(T`Tỉ số giữa cạnh kề của góc $\alpha$ và cạnh huyền gọi là côsin của $\alpha$, kí hiệu $\cos\alpha$.`, T`The ratio of the side adjacent to $\alpha$ to the hypotenuse is the **{cosine}** of $\alpha$, written $\cos\alpha$.`),
              it(T`Tỉ số giữa cạnh đối và cạnh kề của góc $\alpha$ gọi là tang của $\alpha$, kí hiệu $\tan\alpha$.`, T`The ratio of the opposite side to the adjacent side of $\alpha$ is the **{tangent}** of $\alpha$, written $\tan\alpha$.`),
              it(T`Tỉ số giữa cạnh kề và cạnh đối của góc $\alpha$ gọi là côtang của $\alpha$, kí hiệu $\cot\alpha$.`, T`The ratio of the adjacent side to the opposite side of $\alpha$ is the **{cotangent}** of $\alpha$, written $\cot\alpha$.`)
            ] }
          ], { vi: 'Định nghĩa', en: 'Definition' }),
          tip({
            vi: T`**Chú ý.** Ta có:`,
            en: T`**Note.** We have:`
          }),
          m(T`\sin\alpha=\frac{AC}{BC};\quad \cos\alpha=\frac{AB}{BC};\quad \tan\alpha=\frac{AC}{AB};\quad \cot\alpha=\frac{AB}{AC}=\frac{1}{\tan\alpha}`),
          p(T`Nói bằng lời: sin = đối / huyền; cos = kề / huyền; tan = đối / kề; cot = kề / đối = 1 / tan.`,
            T`In words: sine = opposite / hypotenuse; cosine = adjacent / hypotenuse; tangent = opposite / adjacent; cotangent = adjacent / opposite = 1 / tangent.`),
          tip({
            vi: T`$\sin\alpha$, $\cos\alpha$, $\tan\alpha$, $\cot\alpha$ gọi là các *tỉ số lượng giác* của góc nhọn $\alpha$. $\sin$, $\cos$ của góc nhọn luôn dương và bé hơn 1 vì trong tam giác vuông, cạnh huyền dài nhất.`,
            en: T`$\sin\alpha$, $\cos\alpha$, $\tan\alpha$, $\cot\alpha$ are called the *{trigonometric ratios|trigonometric-ratio}* of the acute angle $\alpha$. The sine and cosine of an acute angle are always positive and less than 1, because the hypotenuse is the longest side of a right triangle.`
          }),
          ex(1, [
            p(T`Cho tam giác $ABC$ vuông tại $A$, có $AB=3$ cm, $AC=4$ cm (H.4.6). Hãy tính các tỉ số lượng giác $\sin\alpha$, $\cos\alpha$, $\tan\alpha$ với $\alpha=∠B$.`,
              T`Take triangle $ABC$ with a right angle at $A$, $AB=3$ cm and $AC=4$ cm (Fig. 4.6). Find the trigonometric ratios $\sin\alpha$, $\cos\alpha$, $\tan\alpha$ for $\alpha=∠B$.`),
            { t: 'fig', art: 'tri46', no: '4.6', vi: 'Tam giác vuông có AB = 3 cm, AC = 4 cm', en: 'A right triangle with AB = 3 cm and AC = 4 cm' }
          ], [
            p(T`Xét $\triangle ABC$ vuông tại $A$, $∠B=\alpha$. Theo định lí Pythagore, ta có:`, T`In $\triangle ABC$ with a right angle at $A$ and $∠B=\alpha$, the {Pythagorean theorem|pythagorean-theorem} gives:`),
            m(T`BC^2=AC^2+AB^2=4^2+3^2=25\ \Rightarrow\ BC=5\ (\text{cm})`),
            p(T`Theo định nghĩa của tỉ số lượng giác sin, côsin, tang, ta có:`, T`By the definitions of sine, cosine and tangent:`),
            m(T`\sin\alpha=\frac{AC}{BC}=\frac{4}{5},\quad \cos\alpha=\frac{AB}{BC}=\frac{3}{5},\quad \tan\alpha=\frac{AC}{AB}=\frac{4}{3}`)
          ]),
          tip({
            vi: T`$\sin\alpha$ còn được viết là $\sin ∠B$ hay $\sin B$. Tương tự cho $\cos\alpha$, $\tan\alpha$ và $\cot\alpha$.`,
            en: T`$\sin\alpha$ can also be written $\sin ∠B$ or $\sin B$. The same goes for $\cos\alpha$, $\tan\alpha$ and $\cot\alpha$.`
          }),
          lt(1, [p(T`Cho tam giác $ABC$ vuông tại $A$ có $AB=5$ cm, $AC=12$ cm. Hãy tính các tỉ số lượng giác của góc $B$.`, T`Take triangle $ABC$ with a right angle at $A$, $AB=5$ cm and $AC=12$ cm. Find the trigonometric ratios of angle $B$.`)])
        ]
      },

      /* ----------------------------------------------------------- Trang 69 */
      {
        number: 69,
        blocks: [
          { t: 'h3', vi: 'Giá trị lượng giác sin, côsin, tang, côtang của các góc 30°, 45°, 60°', en: 'Trigonometric values of 30°, 45° and 60°' },
          act(2, { vi: 'Tam giác vuông cân', en: 'The isosceles right triangle' },
            T`Cho tam giác $ABC$ vuông cân tại $A$ và $AB=AC=a$ (H.4.7a).`,
            T`Take the {isosceles|isosceles-triangle} right triangle $ABC$ with a right angle at $A$ and $AB=AC=a$ (Fig. 4.7a).`,
            [
              it(T`Hãy tính $BC$ và các tỉ số $\frac{AB}{BC}$, $\frac{AC}{BC}$. Từ đó suy ra $\sin 45°$, $\cos 45°$.`, T`Find $BC$ and the ratios $\frac{AB}{BC}$, $\frac{AC}{BC}$. Deduce $\sin 45°$ and $\cos 45°$.`),
              it(T`Hãy tính các tỉ số $\frac{AB}{AC}$ và $\frac{AC}{AB}$. Từ đó suy ra $\tan 45°$, $\cot 45°$.`, T`Find the ratios $\frac{AB}{AC}$ and $\frac{AC}{AB}$. Deduce $\tan 45°$ and $\cot 45°$.`)
            ], { art: 'iso47', figNo: '4.7a', figVi: 'Tam giác vuông cân', figEn: 'An isosceles right triangle' }),
          act(3, { vi: 'Tam giác đều', en: 'The equilateral triangle' },
            T`Xét tam giác đều $ABC$ có cạnh bằng $2a$.`,
            T`Take the {equilateral triangle|equilateral-triangle} $ABC$ with side $2a$.`,
            [
              it(T`Tính đường cao $AH$ của tam giác $ABC$ (H.4.7b).`, T`Find the {altitude|altitude} $AH$ of triangle $ABC$ (Fig. 4.7b).`),
              it(T`Tính $\sin 30°$, $\cos 30°$, $\sin 60°$ và $\cos 60°$.`, T`Find $\sin 30°$, $\cos 30°$, $\sin 60°$ and $\cos 60°$.`),
              it(T`Tính $\tan 30°$, $\cot 30°$, $\tan 60°$ và $\cot 60°$.`, T`Find $\tan 30°$, $\cot 30°$, $\tan 60°$ and $\cot 60°$.`)
            ], { art: 'equi47', figNo: '4.7b', figVi: 'Tam giác đều có đường cao AH', figEn: 'An equilateral triangle with altitude AH' }),
          p(T`Từ Hoạt động 2 và Hoạt động 3, ta có bảng sau:`, T`From Activities 2 and 3 we get the following table:`),
          key([
            { t: 'table', math: true, rows: [
              ['α', '30°', '45°', '60°'],
              [T`\sin\alpha`, T`\frac{1}{2}`, T`\frac{\sqrt{2}}{2}`, T`\frac{\sqrt{3}}{2}`],
              [T`\cos\alpha`, T`\frac{\sqrt{3}}{2}`, T`\frac{\sqrt{2}}{2}`, T`\frac{1}{2}`],
              [T`\tan\alpha`, T`\frac{\sqrt{3}}{3}`, '1', T`\sqrt{3}`],
              [T`\cot\alpha`, T`\sqrt{3}`, '1', T`\frac{\sqrt{3}}{3}`]
            ] }
          ], { vi: 'Bảng giá trị lượng giác đặc biệt', en: 'Table of special trigonometric values' }),
          ex(2, [
            p(T`Cho tam giác $ABC$ vuông tại $A$ có $∠C=30°$ và $BC=a$ (H.4.8). Tính các cạnh $AB$, $AC$ theo $a$.`,
              T`Take triangle $ABC$ with a right angle at $A$, $∠C=30°$ and $BC=a$ (Fig. 4.8). Express $AB$ and $AC$ in terms of $a$.`),
            { t: 'fig', art: 'tri48', no: '4.8', vi: 'Tam giác vuông có góc C bằng 30° và BC = a', en: 'A right triangle with ∠C = 30° and BC = a' }
          ], [
            p(T`Ta có $\sin C=\frac{AB}{BC}$, suy ra $AB=BC\cdot\sin C=a\cdot\sin 30°$, mà $\sin 30°=\frac{1}{2}$ nên $AB=\frac{a}{2}$.`,
              T`We have $\sin C=\frac{AB}{BC}$, so $AB=BC\cdot\sin C=a\cdot\sin 30°$. Since $\sin 30°=\frac{1}{2}$, $AB=\frac{a}{2}$.`),
            p(T`Tương tự, $\cos C=\frac{AC}{BC}$, suy ra $AC=BC\cdot\cos C=a\cdot\cos 30°=\frac{a\sqrt{3}}{2}$.`,
              T`Similarly $\cos C=\frac{AC}{BC}$, so $AC=BC\cdot\cos C=a\cdot\cos 30°=\frac{a\sqrt{3}}{2}$.`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 70 */
      {
        number: 70,
        blocks: [
          lt(2, [p(T`Cho tam giác $ABC$ vuông tại $A$ có $∠C=45°$ và $AB=c$. Tính $BC$ và $AC$ theo $c$.`, T`Take triangle $ABC$ with a right angle at $A$, $∠C=45°$ and $AB=c$. Express $BC$ and $AC$ in terms of $c$.`)]),
          h2('2', 'Tỉ số lượng giác của hai góc phụ nhau', 'Trigonometric ratios of complementary angles'),
          { t: 'h3', vi: 'Tỉ số lượng giác của hai góc phụ nhau', en: 'Trigonometric ratios of two complementary angles' },
          act(4, { vi: 'Hai góc nhọn của tam giác vuông', en: 'The two acute angles of a right triangle' },
            T`Cho tam giác $ABC$ vuông tại $C$, có $∠A=\alpha$, $∠B=\beta$ (H.4.9). Hãy viết các tỉ số lượng giác của góc $\alpha$, $\beta$ theo độ dài các cạnh của tam giác $ABC$. Trong các tỉ số đó, cho biết các cặp tỉ số bằng nhau.`,
            T`Take triangle $ABC$ with a right angle at $C$, $∠A=\alpha$ and $∠B=\beta$ (Fig. 4.9). Write the trigonometric ratios of $\alpha$ and $\beta$ in terms of the side lengths of triangle $ABC$. Which of these ratios are equal in pairs?`,
            [], { art: 'compl49', figNo: '4.9', figVi: 'Tam giác vuông tại C với hai góc phụ nhau α và β', figEn: 'A triangle with a right angle at C and complementary angles α and β' }),
          key([
            p(T`Nếu hai góc phụ nhau thì sin góc này bằng côsin góc kia, tang góc này bằng côtang góc kia.`,
              T`If two angles are {complementary|complementary-angles}, then the sine of one equals the cosine of the other, and the tangent of one equals the cotangent of the other.`)
          ], { vi: 'Định lí', en: 'Theorem' }),
          tip({
            vi: T`**Chú ý.** Cho $\alpha$ và $\beta$ là hai góc phụ nhau (H.4.9), khi đó $\alpha+\beta=90°$ và`,
            en: T`**Note.** Let $\alpha$ and $\beta$ be complementary angles (Fig. 4.9). Then $\alpha+\beta=90°$ and`
          }),
          m(T`\sin\alpha=\cos\beta,\quad \cos\alpha=\sin\beta,\quad \tan\alpha=\cot\beta,\quad \cot\alpha=\tan\beta`),
          tip({
            vi: T`Hai góc phụ nhau có thể coi là hai góc nhọn của một tam giác vuông.`,
            en: T`Two complementary angles can be seen as the two acute angles of a right triangle.`
          }),
          ex(3, [
            p(T`Hãy viết các tỉ số lượng giác sau thành tỉ số lượng giác của góc nhỏ hơn $45°$: $\sin 60°$, $\cos 75°$, $\sin 52°30'$, $\tan 80°$, $\cot 82°$.`,
              T`Rewrite the following trigonometric ratios as ratios of angles smaller than $45°$: $\sin 60°$, $\cos 75°$, $\sin 52°30'$, $\tan 80°$, $\cot 82°$.`)
          ], [
            m(T`\sin 60°=\cos(90°-60°)=\cos 30°;\qquad \cos 75°=\sin(90°-75°)=\sin 15°;`),
            m(T`\sin 52°30'=\cos(90°-52°30')=\cos 37°30';`),
            m(T`\tan 80°=\cot(90°-80°)=\cot 10°;\qquad \cot 82°=\tan(90°-82°)=\tan 8°.`)
          ]),
          tip({
            vi: T`Về số đo góc, dưới đơn vị độ ($°$) còn có các đơn vị phút ($'$) và giây ($''$) với $1°=60'$, $1'=60''$.`,
            en: T`Besides degrees ($°$), angles are measured in minutes ($'$) and seconds ($''$), where $1°=60'$ and $1'=60''$.`
          }),
          lt(3, [p(T`Hãy giải thích tại sao $\sin 35°=\cos 55°$, $\tan 35°=\cot 55°$.`, T`Explain why $\sin 35°=\cos 55°$ and $\tan 35°=\cot 55°$.`)])
        ]
      },

      /* ----------------------------------------------------------- Trang 71 */
      {
        number: 71,
        blocks: [
          h2('3', 'Sử dụng máy tính cầm tay tính tỉ số lượng giác của một góc nhọn', 'Finding trigonometric ratios of an acute angle with a calculator'),
          ex(4, [
            p(T`Dùng MTCT, tính $\sin 27°$, $\cos 32°15'$, $\tan 52°12'$ và $\cot 35°23'$ (làm tròn đến chữ số thập phân thứ ba).`,
              T`Use a {calculator} to find $\sin 27°$, $\cos 32°15'$, $\tan 52°12'$ and $\cot 35°23'$ (rounded to three decimal places).`)
          ], [
            { t: 'table', rows: [
              ['Để tính', 'Bấm phím', 'Kết quả'],
              ['sin 27°', '[[sin]] [[2]] [[7]] [[°′″]] [[=]]', '0,4539904997'],
              ['cos 32°15′', '[[cos]] [[3]] [[2]] [[°′″]] [[1]] [[5]] [[°′″]] [[=]]', '0,8457278217'],
              ['tan 52°12′', '[[tan]] [[5]] [[2]] [[°′″]] [[1]] [[2]] [[°′″]] [[=]]', '1,289192232'],
              ['cot 35°23′', '[[tan]] [[3]] [[5]] [[°′″]] [[2]] [[3]] [[°′″]] [[=]] [[x⁻¹]] [[=]]', '1,408003909']
            ] },
            p(T`Làm tròn đến chữ số thập phân thứ ba ta được $\sin 27°\approx 0{,}454$; $\cos 32°15'\approx 0{,}846$; $\tan 52°12'\approx 1{,}289$; $\cot 35°23'\approx 1{,}408$.`,
              T`Rounded to three decimal places: $\sin 27°\approx 0.454$; $\cos 32°15'\approx 0.846$; $\tan 52°12'\approx 1.289$; $\cot 35°23'\approx 1.408$.`),
            p(T`Lưu ý, $\cot 35°23'=\frac{1}{\tan 35°23'}$.`, T`Note that $\cot 35°23'=\frac{1}{\tan 35°23'}$.`)
          ]),
          tip({
            vi: T`**Nhận xét.** Để tính $\cot 35°23'$, ta có thể tính trực tiếp như trên, hoặc có thể tìm góc phụ với góc $35°23'$ là $54°37'$ rồi dùng MTCT tính $\tan 54°37'$ và suy ra kết quả.`,
            en: T`**Remark.** To find $\cot 35°23'$ we can compute it directly as above, or find the complementary angle $54°37'$ and use the calculator for $\tan 54°37'$.`
          }),
          lt(4, [p(T`Sử dụng MTCT tính các tỉ số lượng giác và làm tròn kết quả đến chữ số thập phân thứ ba: a) $\sin 40°54'$; b) $\cos 52°15'$; c) $\tan 69°36'$; d) $\cot 25°18'$.`,
            T`Use a calculator to find these trigonometric ratios, rounded to three decimal places: a) $\sin 40°54'$; b) $\cos 52°15'$; c) $\tan 69°36'$; d) $\cot 25°18'$.`)]),
          tip({
            vi: T`**Chú ý.** Sử dụng MTCT, ta còn có thể tìm được góc khi biết một trong các tỉ số lượng giác của góc đó.`,
            en: T`**Note.** With a calculator we can also find an angle when we know one of its trigonometric ratios.`
          }),
          ex(5, [
            p(T`Dùng MTCT, tìm các góc (làm tròn đến phút) biết $\sin\alpha_1=0{,}3214$; $\cos\alpha_2=0{,}4321$; $\tan\alpha_3=1{,}2742$ và $\cot\alpha_4=1{,}5384$.`,
              T`Use a calculator to find the angles (rounded to the nearest minute) given $\sin\alpha_1=0.3214$; $\cos\alpha_2=0.4321$; $\tan\alpha_3=1.2742$ and $\cot\alpha_4=1.5384$.`)
          ], [
            { t: 'table', rows: [
              ['Biết', 'Bấm phím', 'Kết quả', 'Bấm tiếp [[°′″]]'],
              ['sin α₁ = 0,3214', '[[SHIFT]] [[sin]] [[0]] [[.]] [[3]] [[2]] [[1]] [[4]] [[=]]', '18,74761209', '18°44′51,4″'],
              ['cos α₂ = 0,4321', '[[SHIFT]] [[cos]] [[0]] [[.]] [[4]] [[3]] [[2]] [[1]] [[=]]', '64,39909458', '64°23′56,74″'],
              ['tan α₃ = 1,2742', '[[SHIFT]] [[tan]] [[1]] [[.]] [[2]] [[7]] [[4]] [[2]] [[=]]', '51,87495892', '51°52′29,85″'],
              ['cot α₄ = 1,5384', '[[SHIFT]] [[tan]] [[1]] [[.]] [[5]] [[3]] [[8]] [[4]] [[x⁻¹]] [[=]]', '33,02491482', '33°1′29,69″']
            ] },
            p(T`Làm tròn đến phút ta được $\alpha_1\approx 18°45'$; $\alpha_2\approx 64°24'$; $\alpha_3\approx 51°52'$; $\alpha_4\approx 33°1'$.`,
              T`Rounded to the nearest minute: $\alpha_1\approx 18°45'$; $\alpha_2\approx 64°24'$; $\alpha_3\approx 51°52'$; $\alpha_4\approx 33°1'$.`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 72 */
      {
        number: 72,
        blocks: [
          tip({
            vi: T`**Chú ý.** Để tìm góc $\alpha$ khi biết $\cot\alpha$, ta có thể tìm góc $(90°-\alpha)$ (vì $\tan(90°-\alpha)=\cot\alpha$) rồi suy ra $\alpha$.`,
            en: T`**Note.** To find $\alpha$ when you know $\cot\alpha$, find the angle $(90°-\alpha)$ first (since $\tan(90°-\alpha)=\cot\alpha$) and then deduce $\alpha$.`
          }),
          lt(5, [p(T`Dùng MTCT, tìm các góc $\alpha$ (làm tròn đến phút), biết: a) $\sin\alpha=0{,}3782$; b) $\cos\alpha=0{,}6251$; c) $\tan\alpha=2{,}154$; d) $\cot\alpha=3{,}253$.`,
            T`Use a calculator to find the angles $\alpha$ (rounded to the nearest minute) when: a) $\sin\alpha=0.3782$; b) $\cos\alpha=0.6251$; c) $\tan\alpha=2.154$; d) $\cot\alpha=3.253$.`)]),
          vd('', [
            p(T`Trở lại bài toán ở tình huống mở đầu. Trong một toà chung cư, biết đoạn dốc vào sảnh toà nhà dài 4 m, độ cao của đỉnh dốc bằng 0,4 m. a) Hãy tính góc dốc. b) Hỏi góc đó có đúng tiêu chuẩn của dốc cho người đi xe lăn không?`,
              T`Back to the opening problem. In an apartment building, the ramp into the lobby is 4 m long and the top of the ramp is 0.4 m high. a) Find the slope angle. b) Does this angle meet the standard for wheelchair ramps?`)
          ]),
          { t: 'h3', vi: 'Tranh luận', en: 'Debate' },
          p(T`Để tính khoảng cách giữa hai địa điểm $A$, $B$ không đo trực tiếp được, chẳng hạn $A$ và $B$ là hai địa điểm ở hai bên sông, người ta lấy điểm $C$ về phía bờ sông có chứa $B$ sao cho tam giác $ABC$ vuông tại $B$. Ở bên bờ sông chứa $B$, người ta đo được $∠ACB=\alpha$ và $BC=a$ (H.4.10). Với các dữ liệu đó, đã tính được khoảng cách $AB$ chưa? Nếu được, hãy tính $AB$, biết $\alpha=55°$, $a=70$ m.`,
            T`To find the distance between two places $A$ and $B$ that cannot be measured directly, for example on opposite banks of a river, we pick a point $C$ on the bank of $B$ so that triangle $ABC$ has a right angle at $B$. On $B$'s bank we measure $∠ACB=\alpha$ and $BC=a$ (Fig. 4.10). With this data, can $AB$ be found yet? If so, find $AB$ for $\alpha=55°$ and $a=70$ m.`),
          { t: 'fig', art: 'river410', no: '4.10', vi: 'Đo khoảng cách AB hai bên sông', en: 'Measuring the distance AB across a river' },
          { t: 'talk', lines: [
            { who: 'Vuông', vi: T`Không thể tính được $AB$ vì trong tam giác vuông $ABC$, theo định lí Pythagore, phải biết được hai cạnh mới tính được cạnh thứ ba.`,
              en: T`$AB$ cannot be found: in the right triangle $ABC$ the Pythagorean theorem needs two sides before the third can be found.` },
            { who: 'Tròn', vi: T`Với các dữ liệu đã biết là có thể tính được khoảng cách $AB$ rồi.`,
              en: T`With the data we already have, the distance $AB$ can be found.` }
          ] },
          p(T`Em hãy cho biết ý kiến của mình.`, T`What is your opinion?`),
          tip({
            vi: T`*Gợi ý.* Tròn đúng: $\tan\alpha=\frac{AB}{BC}$ nên $AB=a\cdot\tan\alpha=70\cdot\tan 55°\approx 100{,}0$ (m).`,
            en: T`*Hint.* Tròn is right: $\tan\alpha=\frac{AB}{BC}$, so $AB=a\cdot\tan\alpha=70\cdot\tan 55°\approx 100.0$ m.`
          })
        ]
      },

      /* ----------------------------------------------------------- Trang 73 */
      {
        number: 73,
        blocks: [
          head('practice', 'Bài tập', 'Exercises'),
          bt('4.1', T`Cho tam giác $ABC$ vuông tại $A$. Tính các tỉ số lượng giác sin, côsin, tang, côtang của các góc nhọn $B$ và $C$ khi biết: a) $AB=8$ cm, $BC=17$ cm; b) $AC=0{,}9$ cm, $AB=1{,}2$ cm.`,
            T`Take triangle $ABC$ with a right angle at $A$. Find the sine, cosine, tangent and cotangent of the acute angles $B$ and $C$ when: a) $AB=8$ cm, $BC=17$ cm; b) $AC=0.9$ cm, $AB=1.2$ cm.`),
          bt('4.2', T`Cho tam giác vuông có một góc nhọn $60°$ và cạnh kề với góc $60°$ bằng 3 cm. Hãy tính cạnh đối của góc này.`,
            T`A right triangle has an acute angle of $60°$ and the side adjacent to it is 3 cm. Find the side opposite this angle.`),
          bt('4.3', T`Cho tam giác vuông có một góc nhọn bằng $30°$ và cạnh đối với góc này bằng 5 cm. Tính độ dài cạnh huyền của tam giác.`,
            T`A right triangle has an acute angle of $30°$ and the opposite side is 5 cm. Find the length of the hypotenuse.`),
          bt('4.4', T`Cho hình chữ nhật có chiều dài và chiều rộng lần lượt là 3 và $\sqrt{3}$. Tính góc giữa đường chéo và cạnh ngắn hơn của hình chữ nhật (sử dụng bảng giá trị lượng giác trang 69).`,
            T`A rectangle has length 3 and width $\sqrt{3}$. Find the angle between the diagonal and the shorter side (use the table of trigonometric values on page 69).`),
          bt('4.5', T`a) Viết các tỉ số lượng giác sau thành tỉ số lượng giác của các góc nhỏ hơn $45°$: $\sin 55°$, $\cos 62°$, $\tan 57°$, $\cot 64°$. b) Tính $\frac{\tan 25°}{\cot 65°}$, $\tan 34°-\cot 56°$.`,
            T`a) Rewrite as trigonometric ratios of angles smaller than $45°$: $\sin 55°$, $\cos 62°$, $\tan 57°$, $\cot 64°$. b) Evaluate $\frac{\tan 25°}{\cot 65°}$ and $\tan 34°-\cot 56°$.`),
          bt('4.6', T`Dùng MTCT, tính (làm tròn đến chữ số thập phân thứ ba): a) $\sin 40°12'$; b) $\cos 52°54'$; c) $\tan 63°36'$; d) $\cot 35°20'$.`,
            T`Use a calculator (round to three decimal places): a) $\sin 40°12'$; b) $\cos 52°54'$; c) $\tan 63°36'$; d) $\cot 35°20'$.`),
          bt('4.7', T`Dùng MTCT, tìm số đo của góc nhọn $x$ (làm tròn đến phút), biết rằng: a) $\sin x=0{,}2368$; b) $\cos x=0{,}6224$; c) $\tan x=1{,}236$; d) $\cot x=2{,}154$.`,
            T`Use a calculator to find the acute angle $x$ (rounded to the nearest minute) when: a) $\sin x=0.2368$; b) $\cos x=0.6224$; c) $\tan x=1.236$; d) $\cot x=2.154$.`),
          head('extra', 'Em có biết', 'Did you know?'),
          p(T`**Lịch sử ra đời các từ sin, côsin, tang, côtang.** Ở thế kỉ II, nhà thiên văn người Hy Lạp Ptolemy (85–165) đã nghiên cứu mối liên hệ giữa độ dài cung tròn và dây căng cung tròn đó. Sau đó, những nhà thiên văn người Hindu đã nghiên cứu mối liên hệ giữa bán cung và nửa dây, gọi dây căng cung là *jiva*. Nhà thiên văn người Ả Rập Al-Battani (850–929) đã phiên âm *jiva* thành *djiba* mà nghĩa đen là "nếp gấp". Đến năm 1150, nhà phiên dịch người Ý Gerard de Cremone (1114–1187) dịch *djiba* sang tiếng Latinh thành *sinus*, viết tắt là sin.`,
            T`**Where the words sine, cosine, tangent and cotangent come from.** In the 2nd century the Greek astronomer Ptolemy (85–165) studied the link between the length of an arc of a circle and the chord that spans it. Later, Hindu astronomers studied the link between half the arc and half the chord, calling the chord *jiva*. The Arab astronomer Al-Battani (850–929) transcribed *jiva* as *djiba*, which literally means "a fold". In 1150 the Italian translator Gerard de Cremone (1114–1187) translated *djiba* into Latin as *sinus*, shortened to sin.`),
          p(T`Năm 1583, nhà vật lí và toán học người Đức Thomas Finck đã đưa vào từ "tang" (trong từ ngữ khoa học Ả Rập, chữ *tang* có nghĩa là bóng của một vật) và các kí hiệu sin.com, tan.com (chữ com là viết tắt của chữ *complementary*, ý nói góc phụ). Mãi 40 năm sau, người ta mới dùng kí hiệu côsin, côtang thay cho sin.com, tan.com. (Theo Stella Baruk, *Dictionnaire de mathématiques élémentaires*, Seuil, Pháp, 1992.)`,
            T`In 1583 the German physicist and mathematician Thomas Finck introduced the word "tangent" (in Arabic scientific language, *tang* means the shadow of an object) and the symbols sin.com and tan.com (com is short for *complementary*, meaning the complementary angle). Only 40 years later did people use the symbols cosine and cotangent in place of sin.com and tan.com. (After Stella Baruk, *Dictionnaire de mathématiques élémentaires*, Seuil, France, 1992.)`)
        ]
      }
    ]
  };

  /* ========================================================================
     TỪ VỰNG BỔ SUNG CHO BÀI 12, LUYỆN TẬP CHUNG, BÀI TẬP CUỐI CHƯƠNG IV
     ======================================================================== */
  const h3 = (vi, en) => ({ t: 'h3', vi, en });
  Object.assign(D.glossary, {
    leg: g('leg', '/leɡ/', 'n', 'cạnh góc vuông',
      'Trong Toán: Mỗi cạnh trong hai cạnh tạo nên góc vuông của tam giác vuông (khác cạnh huyền).',
      'Each leg of the right triangle is shorter than the hypotenuse.', 'Mỗi cạnh góc vuông ngắn hơn cạnh huyền.'),
    'solve-right-triangle': g('solving a right triangle', '/ˈsɒlv.ɪŋ ə ˈraɪt ˈtraɪ.æŋ.ɡəl/', 'n', 'giải tam giác vuông',
      'Trong Toán: Tìm tất cả các cạnh và các góc chưa biết của tam giác vuông khi đã biết hai cạnh, hoặc một cạnh và một góc nhọn.',
      'Solving a right triangle means finding all its sides and angles.', 'Giải tam giác vuông là tìm mọi cạnh và mọi góc của nó.'),
    theodolite: g('theodolite', '/θiˈɒd.əl.aɪt/', 'n', 'giác kế',
      'Trong Toán: Dụng cụ đo góc, dùng để ngắm đỉnh một vật cao và đọc góc nhìn so với phương nằm ngang.',
      'A theodolite measures the angle to the top of a tower.', 'Giác kế đo góc nhìn lên đỉnh tháp.'),
    shadow: g('shadow', '/ˈʃæd.əʊ/', 'n', 'bóng (của vật)',
      'Trong Toán: Đoạn trên mặt đất do tia nắng tạo ra; cùng với vật và tia nắng tạo thành một tam giác vuông.',
      'The shadow of the tree is 25 metres long.', 'Bóng của cây dài 25 mét.'),
    trapezoid: g('trapezoid', '/ˈtræp.ə.zɔɪd/', 'n', 'hình thang',
      'Trong Toán: Tứ giác có hai cạnh đối song song. Hình thang vuông có thêm hai góc vuông kề một cạnh bên.',
      'The dam has a trapezoid cross-section.', 'Mặt cắt ngang của đập có dạng hình thang.'),
    rhombus: g('rhombus', '/ˈrɒm.bəs/', 'n', 'hình thoi',
      'Trong Toán: Tứ giác có bốn cạnh bằng nhau; hai đường chéo vuông góc và cắt nhau tại trung điểm mỗi đường.',
      'The diagonals of a rhombus are perpendicular.', 'Hai đường chéo của hình thoi vuông góc với nhau.'),
    diagonal: g('diagonal', '/daɪˈæɡ.ən.əl/', 'n', 'đường chéo',
      'Trong Toán: Đoạn thẳng nối hai đỉnh không kề nhau của một đa giác.',
      'The diagonal of the rectangle makes an angle with its side.', 'Đường chéo hình chữ nhật tạo với cạnh một góc.')
  });

  /* ========================================================================
     BÀI 12. MỘT SỐ HỆ THỨC GIỮA CẠNH, GÓC TRONG TAM GIÁC VUÔNG VÀ ỨNG DỤNG
     ======================================================================== */
  D.lessons['toan9-bai12'] = {
    gradeId: 9,
    number: '12',
    book: 'Toán 9',
    title: { vi: 'Một số hệ thức giữa cạnh, góc trong tam giác vuông và ứng dụng', en: 'Relations between sides and angles in a right triangle, and applications' },
    topic,
    spreadLabels: [
      'Cạnh huyền và cạnh góc vuông',
      'Hai cạnh góc vuông; giải tam giác vuông',
      'Giải tam giác vuông, bài tập'
    ],
    pages: [
      /* ----------------------------------------------------------- Trang 74 */
      {
        number: 74,
        blocks: [
          { t: 'banner' },
          goals(
            it(T`Giải thích một số hệ thức về cạnh và góc trong {right triangle|right-triangle}.`, T`Explain some relations between sides and angles in a {right triangle|right-triangle}.`),
            it(T`Biết {giải tam giác vuông|solve-right-triangle}.`, T`Know how to carry out {solving a right triangle|solve-right-triangle}.`),
            it(T`Giải quyết một số vấn đề thực tiễn gắn với tỉ số lượng giác của góc nhọn.`, T`Solve real-life problems that use the trigonometric ratios of an {acute angle|acute-angle}.`)
          ),
          p(T`Để đo chiều cao một toà lâu đài (H.4.11), người ta đặt {giác kế|theodolite} thẳng đứng tại điểm $M$ rồi quay ống ngắm sao cho nhìn thấy đỉnh $P'$ dưới góc nhọn $\alpha$. Sau đó đặt giác kế tại điểm $N$ với $NM=20$ m thì nhìn thấy đỉnh $P'$ dưới góc nhọn $\beta$ ($\beta<\alpha$). Biết giác kế cao 1,6 m, hãy tính chiều cao của toà lâu đài.`,
            T`To measure the height of a castle (Fig. 4.11), a {theodolite} is set up upright at point $M$ and its sight is turned until the top $P'$ is seen at the acute angle $\alpha$. The theodolite is then placed at point $N$ with $NM=20$ m and the top $P'$ is seen at the acute angle $\beta$ ($\beta<\alpha$). The instrument is 1.6 m tall. Find the height of the castle.`),
          fig('castle411', '4.11', 'Đo chiều cao toà lâu đài', 'Measuring the height of a castle'),
          h2('1', 'Hệ thức giữa cạnh huyền và cạnh góc vuông', 'Relation between the hypotenuse and a leg'),
          h3('Công thức tính cạnh góc vuông theo cạnh huyền và sin, côsin của các góc nhọn', 'A leg in terms of the hypotenuse and the sine or cosine of the acute angles'),
          act('1', { vi: 'Viết tỉ số lượng giác', en: 'Write the ratios' },
            T`Cho tam giác $ABC$ vuông tại $A$, cạnh huyền $a$ và hai cạnh góc vuông $b$, $c$ (H.4.12).`,
            T`Take triangle $ABC$ with a right angle at $A$, hypotenuse $a$ and {legs|leg} $b$, $c$ (Fig. 4.12).`,
            [
              it(T`Viết các tỉ số lượng giác sin, côsin của góc $B$ và góc $C$ theo độ dài các cạnh của tam giác.`, T`Write the sine and cosine of angle $B$ and angle $C$ using the side lengths.`),
              it(T`Tính mỗi cạnh góc vuông $b$ và $c$ theo cạnh huyền $a$ và các tỉ số lượng giác ở câu a).`, T`Express each leg $b$ and $c$ through the hypotenuse $a$ and the ratios from part a).`)
            ], { art: 'tri412', figNo: '4.12', figVi: 'Tam giác ABC vuông tại A', figEn: 'Right triangle ABC with the right angle at A' }),
          key([
            p(T`**Định lí 1.** Trong tam giác vuông, mỗi cạnh góc vuông bằng cạnh huyền nhân với sin góc đối hoặc nhân với côsin góc kề.`,
              T`**Theorem 1.** In a right triangle, each {leg|leg} equals the {hypotenuse} times the {sine} of the opposite angle, or times the {cosine} of the adjacent angle.`)
          ], { vi: 'Định lí 1', en: 'Theorem 1' }),
          p(T`**Chú ý.** Trong tam giác $ABC$ vuông tại $A$ (H.4.12) ta có:`, T`**Note.** In triangle $ABC$ with a right angle at $A$ (Fig. 4.12):`),
          m(T`b=a\cdot\sin B=a\cdot\cos C;\quad c=a\cdot\sin C=a\cdot\cos B`)
        ]
      },

      /* ----------------------------------------------------------- Trang 75 */
      {
        number: 75,
        blocks: [
          ex(1, [
            p(T`Một máy bay bay lên với vận tốc 500 km/h. Đường bay lên tạo với phương nằm ngang một góc $30°$ (H.4.13). Hỏi sau 1,2 phút máy bay lên cao được bao nhiêu kilômét theo phương thẳng đứng?`,
              T`A plane climbs at 500 km/h. Its flight path makes an angle of $30°$ with the horizontal (Fig. 4.13). After 1.2 minutes, how many kilometres has it risen vertically?`),
            fig('plane413', '4.13', 'Máy bay bay lên', 'A plane climbing')
          ], [
            p(T`Giả sử $AB$ là đoạn đường bay trong 1,2 phút thì $BH$ chính là độ cao đạt được. Vì 1,2 phút $=\frac{1}{50}$ giờ nên:`,
              T`Let $AB$ be the distance flown in 1.2 minutes; then $BH$ is the height gained. Since 1.2 minutes $=\frac{1}{50}$ hour:`),
            m(T`AB=500\cdot\frac{1}{50}=10\ (\text{km})`),
            p(T`Tam giác $ABH$ vuông tại $H$ có $∠A=30°$. Theo Định lí 1:`, T`Triangle $ABH$ has a right angle at $H$ and $∠A=30°$. By Theorem 1:`),
            m(T`BH=AB\cdot\sin A=10\cdot\sin 30°=10\cdot\frac{1}{2}=5\ (\text{km})`),
            p(T`Vậy sau 1,2 phút máy bay lên cao được 5 km.`, T`So after 1.2 minutes the plane has risen 5 km.`)
          ]),
          lt(1, [
            p(T`**1.** Một chiếc thang dài 3 m. Cần đặt chân thang cách chân tường bao nhiêu mét (làm tròn đến chữ số thập phân thứ hai) để thang tạo với mặt đất góc "an toàn" $65°$ (H.4.14)?`,
              T`**1.** A ladder is 3 m long. How far from the foot of the wall (to two decimal places) must its foot be placed so that it makes the "safe" angle of $65°$ with the ground (Fig. 4.14)?`),
            fig('ladder414', '4.14', 'Thang dựa tường', 'A ladder against a wall'),
            p(T`**2.** Một khúc sông rộng khoảng 250 m. Một con đò bị dòng nước đẩy xiên nên phải chèo khoảng 320 m mới sang được bờ bên kia. Hỏi dòng nước đã đẩy con đò đi lệch một góc $\alpha$ bằng bao nhiêu độ (làm tròn đến phút) (H.4.15)?`,
              T`**2.** A river is about 250 m wide. A ferry pushed sideways by the current has to row about 320 m to reach the far bank. By what angle $\alpha$ (to the nearest minute) did the current push it off course (Fig. 4.15)?`),
            fig('ferry415', '4.15', 'Con đò qua sông', 'A ferry crossing a river')
          ]),
          h2('2', 'Hệ thức giữa hai cạnh góc vuông', 'Relation between the two legs'),
          h3('Công thức tính cạnh góc vuông theo cạnh góc vuông kia và tang, côtang của các góc nhọn', 'A leg in terms of the other leg and the tangent or cotangent of the acute angles'),
          act('2', { vi: 'Tang và côtang', en: 'Tangent and cotangent' },
            T`Xét tam giác $ABC$ trong Hình 4.16.`, T`Look at triangle $ABC$ in Figure 4.16.`,
            [
              it(T`Viết các tỉ số lượng giác tang, côtang của góc $B$ và góc $C$ theo $b$, $c$.`, T`Write the {tangent} and {cotangent} of angle $B$ and angle $C$ using $b$ and $c$.`),
              it(T`Tính mỗi cạnh góc vuông $b$ và $c$ theo cạnh góc vuông kia và các tỉ số lượng giác nói trên của góc $B$ và góc $C$.`, T`Express each leg $b$ and $c$ through the other leg and these ratios of angles $B$ and $C$.`)
            ], { art: 'tri412', figNo: '4.16', figVi: 'Tam giác ABC vuông tại A', figEn: 'Right triangle ABC with the right angle at A' })
        ]
      },

      /* ----------------------------------------------------------- Trang 76 */
      {
        number: 76,
        blocks: [
          key([
            p(T`**Định lí 2.** Trong tam giác vuông, mỗi cạnh góc vuông bằng cạnh góc vuông kia nhân với tang góc đối hoặc nhân với côtang góc kề.`,
              T`**Theorem 2.** In a right triangle, each {leg|leg} equals the other leg times the {tangent} of the opposite angle, or times the {cotangent} of the adjacent angle.`)
          ], { vi: 'Định lí 2', en: 'Theorem 2' }),
          p(T`**Chú ý.** Trong tam giác $ABC$ vuông tại $A$ (H.4.16) ta có:`, T`**Note.** In triangle $ABC$ with a right angle at $A$ (Fig. 4.16):`),
          m(T`b=c\cdot\tan B=c\cdot\cot C;\quad c=b\cdot\tan C=b\cdot\cot B`),
          ex(2, [
            p(T`Các tia nắng mặt trời tạo với mặt đất một góc xấp xỉ $34°$ và {bóng|shadow} của một toà tháp trên mặt đất dài 8,6 m (H.4.17). Tính chiều cao của toà tháp (làm tròn đến mét).`,
              T`The sun's rays make an angle of about $34°$ with the ground, and the {shadow} of a tower on the ground is 8.6 m long (Fig. 4.17). Find the height of the tower (to the nearest metre).`),
            fig('shadow417', '4.17', 'Bóng của toà tháp', 'The shadow of a tower')
          ], [
            p(T`Đường cao $h$ của tháp đối diện với góc $34°$ (góc giữa tia nắng và bóng tháp). Theo Định lí 2:`,
              T`The height $h$ of the tower is opposite the $34°$ angle (between the sun's ray and the shadow). By Theorem 2:`),
            m(T`h=8{,}6\cdot\tan 34°\approx 6\ (\text{m})`),
            p(T`Vậy tháp cao khoảng 6 m.`, T`So the tower is about 6 m tall.`)
          ]),
          lt(2, [
            p(T`Bóng trên mặt đất của một cây dài 25 m. Tính chiều cao của cây (làm tròn đến dm), biết tia nắng mặt trời tạo với mặt đất góc $40°$ (H.4.18).`,
              T`The shadow of a tree on the ground is 25 m long. Find the height of the tree (to the nearest decimetre) when the sun's rays make an angle of $40°$ with the ground (Fig. 4.18).`)
          ]),
          h2('3', 'Giải tam giác vuông', 'Solving right triangles'),
          ex(3, [
            p(T`Cho tam giác vuông $ABC$ với các cạnh góc vuông $AB=5$, $AC=8$ (H.4.19). Hãy tính cạnh $BC$ (làm tròn đến chữ số thập phân thứ nhất) và các góc $B$, $C$ (làm tròn đến độ).`,
              T`Right triangle $ABC$ has {legs|leg} $AB=5$ and $AC=8$ (Fig. 4.19). Find side $BC$ (to one decimal place) and angles $B$, $C$ (to the nearest degree).`),
            fig('tri419', '4.19', 'Giải tam giác vuông ABC', 'Solving right triangle ABC')
          ], [
            p(T`**Cách 1.** Theo {định lí Pythagore|pythagorean-theorem}:`, T`**Method 1.** By the {Pythagorean theorem|pythagorean-theorem}:`),
            m(T`BC=\sqrt{AB^2+AC^2}=\sqrt{5^2+8^2}\approx 9{,}4`),
            p(T`Ta có $\tan C=\frac{AB}{AC}=\frac{5}{8}=0{,}625$. Từ đó tìm được $∠C\approx 32°$, suy ra $∠B=90°-∠C\approx 58°$.`,
              T`We have $\tan C=\frac{AB}{AC}=\frac{5}{8}=0.625$, which gives $∠C\approx 32°$, so $∠B=90°-∠C\approx 58°$.`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 77 */
      {
        number: 77,
        blocks: [
          p(T`**Cách 2.** Sau khi có $∠C\approx 32°$, ta tính cạnh $BC$ từ $\sin C=\frac{AB}{BC}$:`, T`**Method 2.** Once $∠C\approx 32°$ is known, find $BC$ from $\sin C=\frac{AB}{BC}$:`),
          m(T`\sin 32°\approx\frac{5}{BC}\ \Rightarrow\ BC\approx\frac{5}{\sin 32°}\approx 9{,}4`),
          lt(3, [
            p(T`Cho tam giác vuông $ABC$ có cạnh góc vuông $AB=4$, cạnh huyền $BC=8$. Tính cạnh $AC$ (làm tròn đến chữ số thập phân thứ ba) và các góc $B$, $C$ (làm tròn đến độ).`,
              T`Right triangle $ABC$ has leg $AB=4$ and hypotenuse $BC=8$. Find $AC$ (to three decimal places) and angles $B$, $C$ (to the nearest degree).`)
          ]),
          ex(4, [
            p(T`Cho tam giác $ABC$ vuông tại $A$ có $AB=3$, $∠B=42°$ (H.4.20). Tính góc $C$ và các cạnh $AC$, $BC$ (làm tròn đến chữ số thập phân thứ ba).`,
              T`Triangle $ABC$ has a right angle at $A$, $AB=3$ and $∠B=42°$ (Fig. 4.20). Find angle $C$ and sides $AC$, $BC$ (to three decimal places).`),
            fig('tri420', '4.20', 'Biết AB = 3 và góc B = 42°', 'Given AB = 3 and angle B = 42°')
          ], [
            m(T`∠C=90°-∠B=90°-42°=48°`),
            m(T`AC=AB\cdot\tan B=3\cdot\tan 42°\approx 2{,}701`),
            p(T`Theo định nghĩa côsin của góc nhọn, $\cos B=\frac{AB}{BC}$, suy ra:`, T`By the definition of the {cosine}, $\cos B=\frac{AB}{BC}$, so:`),
            m(T`BC=\frac{AB}{\cos B}=\frac{3}{\cos 42°}\approx 4{,}037`)
          ]),
          key([
            p(T`Trong một tam giác vuông, nếu biết trước hai cạnh (hoặc một góc nhọn và một cạnh) thì ta tìm được tất cả các cạnh và các góc còn lại. Bài toán này gọi là bài toán **giải tam giác vuông**. Ví dụ 3, Luyện tập 3 và Ví dụ 4 đều là các bài toán giải tam giác vuông.`,
              T`In a right triangle, if two sides (or one acute angle and one side) are known, we can find every remaining side and angle. This problem is called *{solving a right triangle|solve-right-triangle}*. Example 3, Practice 3 and Example 4 are all problems of solving a right triangle.`)
          ], { vi: 'Giải tam giác vuông là gì?', en: 'What does "solving a right triangle" mean?' }),
          tip({
            vi: T`**Câu hỏi.** 1) Nêu cách giải tam giác $ABC$ vuông tại $A$ khi biết hai cạnh $AB=c$, $AC=b$ hoặc $AB=c$, $BC=a$ mà không dùng định lí Pythagore (H.4.21). 2) Nêu cách giải tam giác $ABC$ vuông tại $A$ khi biết cạnh góc vuông $AB$ (hoặc cạnh huyền $BC$) và góc $B$.`,
            en: T`**Questions.** 1) Describe how to solve right triangle $ABC$ (right angle at $A$) when two sides $AB=c$, $AC=b$ or $AB=c$, $BC=a$ are known, without using the Pythagorean theorem (Fig. 4.21). 2) Describe how to solve it when the leg $AB$ (or the hypotenuse $BC$) and angle $B$ are known.`
          }),
          fig('tri412', '4.21', 'Tam giác vuông với cạnh a, b, c', 'A right triangle with sides a, b, c'),
          lt(4, [p(T`Giải tam giác $ABC$ vuông tại $A$, biết $BC=9$, $∠C=53°$.`, T`Solve triangle $ABC$ with a right angle at $A$, given $BC=9$ and $∠C=53°$.`)]),
          vd(1, [
            p(T`Giải bài toán ở tình huống mở đầu (đo chiều cao toà lâu đài) với $\alpha=27°$ và $\beta=19°$ (làm tròn đến chữ số thập phân thứ hai).`,
              T`Solve the opening problem (the height of the castle) with $\alpha=27°$ and $\beta=19°$ (to two decimal places).`)
          ]),
          tip({
            vi: T`**Gợi ý.** Đặt $d=M'H$. Từ hai tam giác vuông $M'P'H$ và $N'P'H$: $P'H=d\tan 27°=(d+20)\tan 19°$, suy ra $d\approx 41{,}69$ m, $P'H\approx 21{,}24$ m. Cộng chiều cao giác kế 1,6 m: toà lâu đài cao khoảng $22{,}84$ m.`,
            en: T`**Hint.** Let $d=M'H$. From the two right triangles $M'P'H$ and $N'P'H$: $P'H=d\tan 27°=(d+20)\tan 19°$, so $d\approx 41.69$ m and $P'H\approx 21.24$ m. Adding the 1.6 m instrument height, the castle is about $22.84$ m tall.`
          })
        ]
      },

      /* ----------------------------------------------------------- Trang 78 */
      {
        number: 78,
        blocks: [
          head('practice', 'Bài tập', 'Exercises'),
          bt('4.8', T`Giải tam giác $ABC$ vuông tại $A$ có $BC=a$, $AC=b$, $AB=c$ trong các trường hợp (góc làm tròn đến độ, độ dài làm tròn đến hàng đơn vị): a) $a=21$, $b=18$; b) $b=10$, $∠C=30°$; c) $c=5$, $b=3$.`,
            T`Solve right triangle $ABC$ (right angle at $A$, $BC=a$, $AC=b$, $AB=c$) in these cases (angles to the nearest degree, lengths to the nearest unit): a) $a=21$, $b=18$; b) $b=10$, $∠C=30°$; c) $c=5$, $b=3$.`),
          bt('4.9', T`Tính góc nghiêng $\alpha$ của thùng xe chở rác (H.4.22): thùng dài 4 m, đáy xe dài 5 m (làm tròn đến độ).`,
            T`Find the tilt angle $\alpha$ of the dump truck bed (Fig. 4.22): the bed is 4 m long and the truck base 5 m (to the nearest degree).`),
          bt('4.10', T`Tìm góc nghiêng $\alpha$ và chiều rộng $AB$ của mái nhà kho trong Hình 4.23: nhà rộng 15 m, mái cao hơn tường 0,9 m (góc làm tròn đến độ, độ dài làm tròn đến dm).`,
            T`Find the slope angle $\alpha$ and the width $AB$ of the warehouse roof in Figure 4.23: the building is 15 m wide and the roof rises 0.9 m above the wall (angle to the nearest degree, length to the nearest decimetre).`),
          bt('4.11', T`Tính các góc của {hình thoi|rhombus} có hai {đường chéo|diagonal} dài $2\sqrt{3}$ và $2$.`,
            T`Find the angles of a {rhombus} whose two {diagonals|diagonal} are $2\sqrt{3}$ and $2$ long.`),
          bt('4.12', T`Cho {hình thang|trapezoid} $ABCD$ ($AD\parallel BC$) có $AD=16$ cm, $BC=4$ cm và $∠A=∠B=∠ACD=90°$. a) Kẻ đường cao $CE$ của tam giác $ACD$. Chứng minh $∠ADC=∠ACE$. Tính sin của các góc $ADC$, $ACE$ và suy ra $AC^2=AE\cdot AD$. Từ đó tính $AC$. b) Tính góc $D$ của hình thang.`,
            T`In {trapezoid} $ABCD$ ($AD\parallel BC$) we have $AD=16$ cm, $BC=4$ cm and $∠A=∠B=∠ACD=90°$. a) Draw the {altitude|altitude} $CE$ of triangle $ACD$. Prove $∠ADC=∠ACE$. Find the sines of angles $ADC$ and $ACE$ and deduce $AC^2=AE\cdot AD$; then find $AC$. b) Find angle $D$ of the trapezoid.`),
          bt('4.13', T`Một người đứng tại điểm $A$, cách gương phẳng đặt nằm trên mặt đất tại điểm $B$ là 1,2 m, nhìn thấy hình phản chiếu qua gương $B$ của ngọn cây (cây mọc thẳng đứng, gốc ở $C$ cách $B$ là 4,8 m, $B$ nằm giữa $A$ và $C$). Biết khoảng cách từ mặt đất đến mắt người đó là 1,65 m. Tính chiều cao của cây (H.4.24).`,
            T`A person stands at $A$, 1.2 m from a flat mirror lying on the ground at $B$, and sees the top of a tree reflected in the mirror (the tree stands upright with its base $C$ at 4.8 m from $B$, and $B$ lies between $A$ and $C$). The person's eyes are 1.65 m above the ground. Find the height of the tree (Fig. 4.24).`),
          tip({
            vi: T`**Gợi ý cho 4.13.** Tia tới và tia phản xạ tạo với mặt đất hai góc bằng nhau, nên hai tam giác vuông (chỗ người và chỗ cây) có cùng một góc nhọn: chiều cao cây $=4{,}8\cdot\frac{1{,}65}{1{,}2}=6{,}6$ m.`,
            en: T`**Hint for 4.13.** The incoming and reflected rays make equal angles with the ground, so the two right triangles (at the person and at the tree) share an acute angle: tree height $=4.8\cdot\frac{1.65}{1.2}=6.6$ m.`
          })
        ]
      }
    ]
  };

  /* ========================================================================
     LUYỆN TẬP CHUNG (CHƯƠNG IV)
     ======================================================================== */
  D.lessons['toan9-ltc4'] = {
    gradeId: 9,
    number: 'LT',
    book: 'Toán 9',
    title: { vi: 'Luyện tập chung', en: 'General practice' },
    topic,
    spreadLabels: ['Ví dụ về tỉ số lượng giác và giải tam giác', 'Bài tập luyện tập chung'],
    pages: [
      {
        number: 79,
        blocks: [
          { t: 'banner' },
          ex(1, [
            p(T`Cho tam giác $ABC$ vuông tại $A$, $AB=5$ cm, $AC=12$ cm. a) Tính các tỉ số lượng giác của góc $B$. b) Từ kết quả câu a) suy ra các tỉ số lượng giác của góc $C$.`,
              T`Triangle $ABC$ has a right angle at $A$, $AB=5$ cm and $AC=12$ cm. a) Find the {trigonometric ratios|trigonometric-ratio} of angle $B$. b) From part a), deduce the ratios of angle $C$.`),
            fig('tri425', '4.25', 'Tam giác vuông có AB = 5 cm, AC = 12 cm', 'A right triangle with AB = 5 cm and AC = 12 cm')
          ], [
            p(T`a) Theo định lí Pythagore, $BC^2=5^2+12^2=169$, nên $BC=13$ cm. Khi đó:`, T`a) By the Pythagorean theorem, $BC^2=5^2+12^2=169$, so $BC=13$ cm. Then:`),
            m(T`\sin B=\frac{12}{13};\quad \cos B=\frac{5}{13};\quad \tan B=\frac{12}{5};\quad \cot B=\frac{5}{12}`),
            p(T`b) Vì $∠B+∠C=90°$ (hai {góc phụ nhau|complementary-angles}) nên:`, T`b) Since $∠B+∠C=90°$ ({complementary angles|complementary-angles}):`),
            m(T`\sin C=\cos B=\frac{5}{13};\quad \cos C=\sin B=\frac{12}{13};\quad \tan C=\cot B=\frac{5}{12};\quad \cot C=\tan B=\frac{12}{5}`)
          ]),
          ex(2, [
            p(T`Một bức tường đang xây dở có dạng hình thang vuông $ABCD$, vuông góc ở $A$ và $D$, $AB=1$ m, $CD=4$ m, $AD=6$ m (H.4.26). a) Góc $\alpha$ tạo bởi đường thẳng $BC$ và mặt đất $AD$ có số đo xấp xỉ bao nhiêu (làm tròn đến phút)? b) Tính độ dài cạnh $BC$ (làm tròn đến chữ số thập phân thứ nhất).`,
              T`A half-built wall is a right {trapezoid|trapezoid} $ABCD$ with right angles at $A$ and $D$, $AB=1$ m, $CD=4$ m, $AD=6$ m (Fig. 4.26). a) What is the angle $\alpha$ between line $BC$ and the ground $AD$ (to the nearest minute)? b) Find the length of $BC$ (to one decimal place).`),
            fig('wall426', '4.26', 'Bức tường hình thang vuông', 'A wall shaped like a right trapezoid')
          ], [
            p(T`a) Gọi $I$ là giao điểm của $AD$ và $BC$. Qua $B$ kẻ đường thẳng song song với $AD$ cắt $CD$ tại $E$; khi đó $∠EBC=∠DIC=\alpha$ (đồng vị). Tứ giác $ABED$ là hình chữ nhật nên $BE=AD=6$ m, $EC=CD-ED=4-1=3$ m. Trong tam giác $BCE$ vuông tại $E$:`,
              T`a) Let $I$ be the intersection of $AD$ and $BC$. Through $B$ draw a line parallel to $AD$ meeting $CD$ at $E$; then $∠EBC=∠DIC=\alpha$ (corresponding angles). $ABED$ is a rectangle, so $BE=AD=6$ m and $EC=CD-ED=4-1=3$ m. In triangle $BCE$ with a right angle at $E$:`),
            m(T`\tan\alpha=\frac{EC}{BE}=\frac{3}{6}=\frac{1}{2}\ \Rightarrow\ \alpha\approx 26°34′`),
            p(T`b) Theo định lí Pythagore: $BC^2=BE^2+EC^2=6^2+3^2=45$, nên $BC=3\sqrt{5}\approx 6{,}7$ m. (Cách khác: $BC=\frac{EC}{\sin\alpha}\approx\frac{3}{\sin 26°34′}\approx 6{,}7$ m.)`,
              T`b) By the Pythagorean theorem, $BC^2=BE^2+EC^2=6^2+3^2=45$, so $BC=3\sqrt{5}\approx 6.7$ m. (Alternatively, $BC=\frac{EC}{\sin\alpha}\approx\frac{3}{\sin 26°34′}\approx 6.7$ m.)`)
          ])
        ]
      },
      {
        number: 80,
        blocks: [
          head('practice', 'Bài tập', 'Exercises'),
          bt('4.14', T`Một cuốn sách khổ $17\times 24$ cm (rộng 17 cm, dài 24 cm). Gọi $\alpha$ là góc giữa {đường chéo|diagonal} và cạnh 17 cm. Tính $\sin\alpha$, $\cos\alpha$ (làm tròn đến chữ số thập phân thứ hai) và số đo $\alpha$ (làm tròn đến độ).`,
            T`A book measures $17\times 24$ cm (17 cm wide, 24 cm long). Let $\alpha$ be the angle between the {diagonal} and the 17 cm side. Find $\sin\alpha$, $\cos\alpha$ (two decimal places) and $\alpha$ (nearest degree).`),
          bt('4.15', T`Cho tam giác $ABC$ có chân đường cao $AH$ nằm giữa $B$ và $C$. Biết $HB=3$ cm, $HC=6$ cm, $∠HAC=60°$. Tính độ dài các cạnh (làm tròn đến cm) và số đo các góc của tam giác $ABC$ (làm tròn đến độ).`,
            T`In triangle $ABC$ the foot $H$ of the {altitude|altitude} $AH$ lies between $B$ and $C$. Given $HB=3$ cm, $HC=6$ cm and $∠HAC=60°$, find the side lengths (to the nearest cm) and the angles (to the nearest degree) of $ABC$.`),
          bt('4.16', T`Tìm chiều rộng $d$ của dòng sông trong Hình 4.27, biết hai góc quan sát đều bằng $40°$ và khoảng cách giữa hai điểm quan sát là 50 m (làm tròn đến mét).`,
            T`Find the width $d$ of the river in Figure 4.27, given that both viewing angles are $40°$ and the two viewing points are 50 m apart (to the nearest metre).`),
          bt('4.17', T`Tính các số liệu còn thiếu (dấu "?") ở Hình 4.28, với góc làm tròn đến độ, độ dài làm tròn đến chữ số thập phân thứ nhất.`,
            T`Find the missing values (marked "?") in Figure 4.28, with angles to the nearest degree and lengths to one decimal place.`),
          bt('4.18', T`Cần tính khoảng cách giữa hai địa điểm $A$, $B$ ở hai bên hồ nước. Biết $CA=90$ m, $CB=150$ m và $∠ACB=120°$ (H.4.29). Hãy tính $AB$.`,
            T`We want the distance between points $A$ and $B$ on opposite sides of a lake. Given $CA=90$ m, $CB=150$ m and $∠ACB=120°$ (Fig. 4.29), find $AB$.`),
          bt('4.19', T`Mặt cắt ngang của một đập ngăn nước có dạng {hình thang|trapezoid} $ABCD$ (H.4.30). Mặt trên $AB=3$ m, độ dốc sườn $AD$ là $\tan D=1{,}25$, độ dốc sườn $BC$ là $\tan C=1{,}5$, chiều cao đập là 3,5 m. Tính chiều rộng $CD$ của chân đập và độ dài các sườn $AD$, $BC$ (làm tròn đến dm).`,
            T`The cross-section of a dam is a {trapezoid} $ABCD$ (Fig. 4.30). The top $AB=3$ m, the slope of side $AD$ is $\tan D=1.25$, the slope of side $BC$ is $\tan C=1.5$ and the dam is 3.5 m high. Find the width $CD$ of the base and the lengths of the sides $AD$ and $BC$ (to the nearest decimetre).`),
          bt('4.20', T`Một tàu ngầm đang ở trên mặt biển bắt đầu lặn theo đường thẳng tạo với mặt nước một góc $21°$ (H.4.31). a) Khi đi được 200 m thì tàu ở độ sâu bao nhiêu mét (làm tròn đến m)? b) Nếu tốc độ tàu là 9 km/h thì sau bao lâu (tính từ lúc bắt đầu lặn) tàu ở độ sâu 200 m?`,
            T`A submarine on the surface starts to dive along a straight line that makes an angle of $21°$ with the water surface (Fig. 4.31). a) After travelling 200 m, how deep is it (to the nearest metre)? b) At 9 km/h, how long after the start of the dive does it reach a depth of 200 m?`)
        ]
      }
    ]
  };

  /* ========================================================================
     BÀI TẬP CUỐI CHƯƠNG IV
     ======================================================================== */
  D.lessons['toan9-btcc4'] = {
    gradeId: 9,
    number: 'BT',
    book: 'Toán 9',
    title: { vi: 'Bài tập cuối chương IV', en: 'End-of-chapter exercises (Chapter IV)' },
    topic,
    spreadLabels: ['Trắc nghiệm và tự luận', 'Tự luận, đố vui'],
    pages: [
      {
        number: 81,
        blocks: [
          { t: 'banner' },
          head('practice', 'A. Trắc nghiệm', 'A. Multiple choice'),
          bt('4.21', T`Trong Hình 4.32, $\cos\alpha$ bằng: A. $\frac{5}{3}$; B. $\frac{3}{4}$; C. $\frac{3}{5}$; D. $\frac{4}{5}$.`,
            T`In Figure 4.32, $\cos\alpha$ equals: A. $\frac{5}{3}$; B. $\frac{3}{4}$; C. $\frac{3}{5}$; D. $\frac{4}{5}$.`),
          fig('tri432', '4.32', 'Tam giác vuông có các cạnh 3, 4, 5', 'A right triangle with sides 3, 4, 5'),
          bt('4.22', T`Trong tam giác $MNP$ vuông tại $M$ (H.4.33), $\sin∠MNP$ bằng: A. $\frac{PN}{NM}$; B. $\frac{MP}{PN}$; C. $\frac{MN}{PN}$; D. $\frac{MN}{MP}$.`,
            T`In triangle $MNP$ with a right angle at $M$ (Fig. 4.33), $\sin∠MNP$ equals: A. $\frac{PN}{NM}$; B. $\frac{MP}{PN}$; C. $\frac{MN}{PN}$; D. $\frac{MN}{MP}$.`),
          bt('4.23', T`Trong tam giác $ABC$ vuông tại $A$ (H.4.34), $\tan B$ bằng: A. $\frac{AB}{AC}$; B. $\frac{AC}{AB}$; C. $\frac{AB}{BC}$; D. $\frac{BC}{AC}$.`,
            T`In triangle $ABC$ with a right angle at $A$ (Fig. 4.34), $\tan B$ equals: A. $\frac{AB}{AC}$; B. $\frac{AC}{AB}$; C. $\frac{AB}{BC}$; D. $\frac{BC}{AC}$.`),
          bt('4.24', T`Với mọi góc nhọn $\alpha$, ta có: A. $\sin(90°-\alpha)=\cos\alpha$; B. $\tan(90°-\alpha)=\cos\alpha$; C. $\cot(90°-\alpha)=1-\tan\alpha$; D. $\cot(90°-\alpha)=\sin\alpha$.`,
            T`For every acute angle $\alpha$: A. $\sin(90°-\alpha)=\cos\alpha$; B. $\tan(90°-\alpha)=\cos\alpha$; C. $\cot(90°-\alpha)=1-\tan\alpha$; D. $\cot(90°-\alpha)=\sin\alpha$.`),
          bt('4.25', T`Giá trị $\tan 30°$ bằng: A. $\sqrt{3}$; B. $\frac{\sqrt{3}}{2}$; C. $\frac{1}{\sqrt{3}}$; D. $1$.`,
            T`The value of $\tan 30°$ is: A. $\sqrt{3}$; B. $\frac{\sqrt{3}}{2}$; C. $\frac{1}{\sqrt{3}}$; D. $1$.`),
          head('practice', 'B. Tự luận', 'B. Written problems'),
          bt('4.26', T`Xét các tam giác vuông có một góc nhọn bằng hai lần góc nhọn còn lại. Hỏi các tam giác đó có đồng dạng với nhau không? Tính sin và côsin của góc nhọn lớn hơn.`,
            T`Consider right triangles in which one acute angle is twice the other. Are these triangles {similar|similar-triangles}? Find the sine and cosine of the larger acute angle.`),
          bt('4.27', T`Hình 4.35 là mô hình một túp lều: đáy rộng 4,4 m, chiều cao 1,8 m. Tìm góc $\alpha$ giữa cạnh mái lều và mặt đất (làm tròn đến phút).`,
            T`Figure 4.35 shows a model of a tent: the base is 4.4 m wide and the height 1.8 m. Find the angle $\alpha$ between the roof edge and the ground (to the nearest minute).`)
        ]
      },
      {
        number: 82,
        blocks: [
          bt('4.28', T`Một cây cao bị gãy, ngọn cây đổ xuống mặt đất. Ba điểm: gốc cây, điểm gãy, ngọn cây tạo thành một tam giác vuông. Đoạn cây gãy tạo với mặt đất góc $20°$ và chắn ngang lối đi một đoạn 5 m (H.4.36). Hỏi trước khi gãy cây cao khoảng bao nhiêu mét (làm tròn đến hàng phần mười)?`,
            T`A tall tree breaks and its top falls to the ground. The base, the break point and the top form a right triangle. The broken part makes an angle of $20°$ with the ground and blocks a path over a distance of 5 m (Fig. 4.36). About how tall was the tree before it broke (to one decimal place)?`),
          bt('4.29', T`Cho tam giác $ABC$ vuông tại $A$, có $∠B=\alpha$ (H.4.37). a) Viết các tỉ số lượng giác $\sin\alpha$, $\cos\alpha$. b) Sử dụng định lí Pythagore, chứng minh rằng $\sin^2\alpha+\cos^2\alpha=1$.`,
            T`Triangle $ABC$ has a right angle at $A$ and $∠B=\alpha$ (Fig. 4.37). a) Write $\sin\alpha$ and $\cos\alpha$. b) Use the Pythagorean theorem to prove that $\sin^2\alpha+\cos^2\alpha=1$.`),
          fig('tri412', '4.37', 'Tam giác vuông với góc nhọn B = α', 'A right triangle with acute angle B = α'),
          bt('4.30', T`**Đố vui: Chu vi Trái Đất bằng bao nhiêu?** Khoảng năm 200 trước Công nguyên, Eratosthenes, nhà toán học và thiên văn học người Hy Lạp, ước lượng "chu vi" của Trái Đất (chu vi đường Xích Đạo) nhờ hai quan sát. (1) Hằng năm cứ vào trưa ngày Hạ chí (21/6), tia sáng mặt trời chiếu thẳng xuống đáy một cái giếng sâu ở thành phố Syene, tức là tia sáng chiếu thẳng đứng. (2) Cũng vào trưa ngày đó, ở thành phố Alexandria cách Syene 800 km, ông thấy một tháp cao 25 m có bóng trên mặt đất dài 3,1 m. Từ hai quan sát trên, ông có thể tính xấp xỉ "chu vi" của Trái Đất như thế nào? (Trên Hình 4.38, $O$ là tâm Trái Đất, $S$ là Syene, $A$ là Alexandria, $H$ là đỉnh tháp, bóng của tháp là đoạn $AB$.)`,
            T`**Fun puzzle: how long is the circumference of the Earth?** Around 200 BC the Greek mathematician and astronomer Eratosthenes estimated the "circumference" of the Earth (the length of the Equator) from two observations. (1) Every year at noon on the summer solstice (21 June), the sun's rays shine straight down a deep well in the city of Syene, so the rays are vertical. (2) At noon on the same day in Alexandria, 800 km from Syene, he saw a 25 m tower casting a 3.1 m {shadow|shadow} on the ground. From these two observations, how could he estimate the circumference of the Earth? (In Figure 4.38, $O$ is the centre of the Earth, $S$ is Syene, $A$ is Alexandria, $H$ is the top of the tower, and its shadow is segment $AB$.)`),
          tip({
            vi: T`**Gợi ý.** Góc giữa tia nắng và tháp là $\alpha$ với $\tan\alpha=\frac{3{,}1}{25}$, nên $\alpha\approx 7°$. Đó cũng là góc ở tâm $∠SOA$, ứng với cung 800 km. Cả vòng $360°$ dài khoảng $800\cdot\frac{360}{7}\approx 41\,000$ km.`,
            en: T`**Hint.** The angle between the sun's ray and the tower is $\alpha$ with $\tan\alpha=\frac{3.1}{25}$, so $\alpha\approx 7°$. This is also the central angle $∠SOA$, which spans 800 km of arc. A full $360°$ is then about $800\cdot\frac{360}{7}\approx 41{,}000$ km.`
          })
        ]
      }
    ]
  };

})();
