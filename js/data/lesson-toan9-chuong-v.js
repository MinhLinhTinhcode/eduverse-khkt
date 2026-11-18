/* ==========================================================================
   TOÁN 9 (TẬP MỘT) — CHƯƠNG V: ĐƯỜNG TRÒN
   --------------------------------------------------------------------------
   Các bài trong file này (mỗi bài một mục trong TEXTBOOK.lessons):

     'toan9-bai13'  Bài 13. Mở đầu về đường tròn                (tr. 83–86)
     'toan9-bai14'  Bài 14. Cung và dây của một đường tròn      (tr. 87–90)
     'toan9-bai15'  Bài 15. Độ dài của cung tròn. Diện tích hình quạt tròn
                    và hình vành khuyên                           (tr. 91–95)
     'toan9-ltc5'   Luyện tập chung                              (tr. 96–98)

   Lời văn được biên soạn lại, không chép nguyên văn sách giáo khoa.
   Số liệu của các ví dụ, bài tập giữ nguyên để kiểm tra được kết quả.

   QUY ƯỚC (giống Chương IV)
   • Chuỗi dùng T`...` (String.raw); công thức trong $...$.
   • Thuật ngữ tiếng Anh viết {circle}; nếu chữ hiển thị khác khoá thì
     {centre of symmetry|centre-of-symmetry}. App đổi thành
       <span class="vocab" data-key="centre-of-symmetry">…</span>
     (gạch chân nét đứt, bấm để xem IPA, nghĩa, ví dụ, nghe phát âm).
   • Hình vẽ: { t: 'fig', art: 'sym53', no: '5.3', vi: '…', en: '…' } — hàm vẽ nằm trong
     js/illustrations-hinh2.js; chữ trong hình có hai dòng Việt/Anh.
   • Cung viết "cung AB", số đo cung viết "sđ AB" (tiếng Anh: m(AB)).
   ========================================================================== */
(function () {
  'use strict';

  const D = (window.TEXTBOOK = window.TEXTBOOK || {});
  D.lessons = D.lessons || {};
  D.glossary = D.glossary || {};

  const T = String.raw;
  const g = (word, ipa, pos, vi, ctx, exEn, exVi) => ({ word, ipa, pos, vi, ctx, ex: { en: exEn, vi: exVi } });

  Object.assign(D.glossary, {
    circle: g('circle', '/ˈsɜː.kəl/', 'n', 'đường tròn',
      'Trong Toán: Hình gồm tất cả các điểm cách một điểm O cho trước một khoảng bằng R (R > 0).',
      'A circle with centre O and radius R is written (O; R).', 'Đường tròn tâm O bán kính R kí hiệu là (O; R).'),
    centre: g('centre', '/ˈsen.tər/', 'n', 'tâm',
      'Trong Toán: Điểm cố định cách đều mọi điểm của đường tròn.',
      'Point O is the centre of the circle.', 'Điểm O là tâm của đường tròn.'),
    radius: g('radius', '/ˈreɪ.di.əs/', 'n', 'bán kính',
      'Trong Toán: Khoảng cách từ tâm đến một điểm bất kì của đường tròn (số nhiều: radii).',
      'The radius R is the distance from O to any point on the circle.', 'Bán kính R là khoảng cách từ O đến mọi điểm trên đường tròn.'),
    diameter: g('diameter', '/daɪˈæm.ɪ.tər/', 'n', 'đường kính',
      'Trong Toán: Dây đi qua tâm của đường tròn; độ dài bằng 2R, là dây lớn nhất.',
      'The diameter of a circle with radius R is 2R.', 'Đường kính của đường tròn bán kính R dài 2R.'),
    chord: g('chord', '/kɔːd/', 'n', 'dây (dây cung)',
      'Trong Toán: Đoạn thẳng nối hai điểm bất kì của một đường tròn.',
      'The segment CD is a chord of the circle.', 'Đoạn CD là một dây của đường tròn.'),
    arc: g('arc', '/ɑːk/', 'n', 'cung (tròn)',
      'Trong Toán: Mỗi phần của đường tròn bị chia bởi hai điểm A và B nằm trên đường tròn đó.',
      'Two points on a circle divide it into two arcs.', 'Hai điểm trên đường tròn chia nó thành hai cung.'),
    'minor-arc': g('minor arc', '/ˈmaɪ.nər ɑːk/', 'n', 'cung nhỏ',
      'Trong Toán: Cung nằm trong góc ở tâm không bẹt; số đo nhỏ hơn 180°.',
      'The minor arc AB measures less than 180 degrees.', 'Cung nhỏ AB có số đo nhỏ hơn 180°.'),
    'major-arc': g('major arc', '/ˈmeɪ.dʒər ɑːk/', 'n', 'cung lớn',
      'Trong Toán: Cung còn lại của đường tròn so với cung nhỏ có chung hai mút; số đo lớn hơn 180°.',
      'The major arc is 360 degrees minus the minor arc.', 'Cung lớn bằng 360° trừ số đo cung nhỏ.'),
    semicircle: g('semicircle', '/ˈsem.iˌsɜː.kəl/', 'n', 'nửa đường tròn',
      'Trong Toán: Cung có hai mút là hai đầu một đường kính; số đo bằng 180°.',
      'A semicircle measures 180 degrees.', 'Nửa đường tròn có số đo 180°.'),
    'central-angle': g('central angle', '/ˈsen.trəl ˈæŋ.ɡəl/', 'n', 'góc ở tâm',
      'Trong Toán: Góc có đỉnh trùng với tâm của đường tròn.',
      'Angle AOB is a central angle of the circle.', 'Góc AOB là một góc ở tâm của đường tròn.'),
    'arc-measure': g('arc measure', '/ɑːk ˈmeʒ.ər/', 'n', 'số đo cung',
      'Trong Toán: Số đo cung nhỏ bằng số đo góc ở tâm chắn cung đó; số đo cung lớn bằng 360° trừ số đo cung nhỏ.',
      'The arc measure of a semicircle is 180 degrees.', 'Số đo của nửa đường tròn là 180 độ.'),
    'central-symmetry': g('central symmetry', '/ˈsen.trəl ˈsɪm.ə.tri/', 'n', 'đối xứng tâm',
      'Trong Toán: M và M′ đối xứng qua điểm I nếu I là trung điểm của đoạn MM′.',
      'Points A and C show central symmetry about O.', 'A và C đối xứng tâm qua O.'),
    'axial-symmetry': g('axial symmetry', '/ˈæk.si.əl ˈsɪm.ə.tri/', 'n', 'đối xứng trục',
      'Trong Toán: M và M′ đối xứng qua đường thẳng d nếu d là đường trung trực của đoạn MM′.',
      'B and C show axial symmetry about line AH.', 'B và C đối xứng trục qua đường thẳng AH.'),
    'centre-of-symmetry': g('centre of symmetry', '/ˈsen.tər əv ˈsɪm.ə.tri/', 'n', 'tâm đối xứng',
      'Trong Toán: Điểm mà hình đối xứng với chính nó qua điểm đó. Tâm của đường tròn là tâm đối xứng duy nhất của nó.',
      'The centre of a circle is its centre of symmetry.', 'Tâm của đường tròn là tâm đối xứng của nó.'),
    'axis-of-symmetry': g('axis of symmetry', '/ˈæk.sɪs əv ˈsɪm.ə.tri/', 'n', 'trục đối xứng',
      'Trong Toán: Đường thẳng mà hình đối xứng với chính nó qua đường thẳng đó. Mỗi đường thẳng qua tâm là một trục đối xứng của đường tròn.',
      'A circle has infinitely many axes of symmetry.', 'Đường tròn có vô số trục đối xứng.'),
    'perpendicular-bisector': g('perpendicular bisector', '/ˌpɜː.pənˈdɪk.jə.lər baɪˈsek.tər/', 'n', 'đường trung trực',
      'Trong Toán: Đường thẳng vuông góc với một đoạn thẳng tại trung điểm của đoạn thẳng đó.',
      'The perpendicular bisector of MM′ is the axis d.', 'Đường trung trực của MM′ chính là trục d.'),
    midpoint: g('midpoint', '/ˈmɪd.pɔɪnt/', 'n', 'trung điểm',
      'Trong Toán: Điểm nằm giữa hai đầu một đoạn thẳng và cách đều hai đầu.',
      'O is the midpoint of segment AB.', 'O là trung điểm của đoạn AB.'),
    compass: g('compass', '/ˈkʌm.pəs/', 'n', 'compa',
      'Trong Toán: Dụng cụ để vẽ đường tròn hoặc cung tròn.',
      'Use a compass to draw a circle.', 'Dùng compa để vẽ một đường tròn.'),
    disc: g('disc', '/dɪsk/', 'n', 'hình tròn',
      'Trong Toán: Hình gồm các điểm nằm trên và nằm trong đường tròn.',
      'A disc includes the circle and its inside.', 'Hình tròn gồm đường tròn và phần bên trong.'),
    median: g('median', '/ˈmiː.di.ən/', 'n', 'đường trung tuyến',
      'Trong Toán: Đoạn thẳng nối một đỉnh của tam giác với trung điểm cạnh đối diện. Trong tam giác vuông, trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền.',
      'The median to the hypotenuse is half of it.', 'Trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền.')
  });

  /* Dòng tiếng Việt không dùng thẻ từ vựng: bỏ {chữ|khoá} chỉ giữ chữ hiển thị */
  const sv = (s) => (typeof s === 'string' ? s.replace(/\{([^{}|]+)\|[^{}]*\}/g, '$1') : s);
  const p = (vi, en, extra) => Object.assign({ t: 'p', vi: sv(vi), en }, extra);
  const m = (tex, label) => ({ t: 'math', tex, label });
  const h2 = (n, vi, en) => ({ t: 'h2', n, vi, en });
  const h3 = (vi, en) => ({ t: 'h3', vi, en });
  const tip = (...items) => ({ t: 'tip', items: items.map((x) => ({ vi: sv(x.vi), en: x.en })) });
  const key = (blocks, title) => ({ t: 'key', title, blocks });
  const ex = (no, body, solution) => ({ t: 'ex', kind: 'example', no, body, solution });
  const lt = (no, body) => ({ t: 'ex', kind: 'practice', no, body });
  const vd = (no, body) => ({ t: 'ex', kind: 'apply', no, body });
  const act = (no, title, vi, en, items, extra) => Object.assign({ t: 'activity', no, title, vi: sv(vi), en, items: items && items.map((x) => ({ vi: sv(x.vi), en: x.en })), style: 'alpha' }, extra);
  const head = (kind, vi, en) => ({ t: 'head', kind, vi, en });
  const fig = (artName, no, vi, en) => ({ t: 'fig', art: artName, no, vi, en });
  const goals = (...items) => ({ t: 'goals', lead: { vi: 'Sau bài học này em sẽ:', en: 'After this lesson you will:' }, items });
  const bt = (no, vi, en) => p('**' + no + '.** ' + vi, '**' + no + '.** ' + en);
  const it = (vi, en) => ({ vi: sv(vi), en });

  const topic = { label: 'Chương', labelEn: 'Chapter', number: 'V', vi: 'Đường tròn', en: 'Circles' };

  /* ========================================================================
     BÀI 13. MỞ ĐẦU VỀ ĐƯỜNG TRÒN
     ======================================================================== */
  D.lessons['toan9-bai13'] = {
    gradeId: 9,
    number: '13',
    book: 'Toán 9',
    title: { vi: 'Mở đầu về đường tròn', en: 'Introduction to circles' },
    topic,
    spreadLabels: ['Đường tròn, điểm thuộc đường tròn', 'Tâm đối xứng và trục đối xứng', 'Ví dụ, luyện tập, bài tập'],
    pages: [
      /* ----------------------------------------------------------- Trang 83 */
      {
        number: 83,
        blocks: [
          { t: 'banner' },
          p(T`Trong đời sống ta gặp rất nhiều hình ảnh của đường tròn hay hình tròn: bánh xe, vành nón, mặt trống, biển báo giao thông… Vậy đường tròn là gì, nó có những tính chất nào? Chương này giúp em khám phá những điều lí thú về đường tròn.`,
            T`In daily life we see many circles and discs: wheels, hat brims, drum faces, traffic signs… So what is a {circle}, and what properties does it have? This chapter helps you discover some interesting facts about circles.`),
          goals(
            it(T`Nhận biết {đường tròn|circle}, {tâm|centre}, {bán kính|radius}; một điểm thuộc hay không thuộc một đường tròn.`, T`Recognise a {circle}, its {centre} and {radius}; tell whether a point lies on a circle.`),
            it(T`Nhận biết hai điểm đối xứng nhau qua một tâm, qua một trục.`, T`Recognise two points that are symmetric about a centre or about an axis.`),
            it(T`Nhận biết {tâm đối xứng|centre-of-symmetry} và {trục đối xứng|axis-of-symmetry} của đường tròn.`, T`Recognise the {centre of symmetry|centre-of-symmetry} and the {axes of symmetry|axis-of-symmetry} of a circle.`)
          ),
          p(T`**Tình huống mở đầu.** Bạn Oanh có một mảnh giấy hình tròn nhưng không còn dấu vết của tâm. Theo em, Oanh làm thế nào để tìm lại được tâm của hình tròn đó?`,
            T`**Opening problem.** Oanh has a round piece of paper, but the mark of its centre has disappeared. How can she find the centre again?`),
          h2('1', 'Đường tròn', 'The circle'),
          h3('Đường tròn, điểm thuộc đường tròn', 'A circle and the points on it'),
          p(T`Ở lớp dưới, em đã biết dùng {compa|compass} để vẽ đường tròn: đặt đầu nhọn tại một điểm cố định, quay đầu bút chì giữ nguyên độ mở của compa. Vậy đường tròn là gì? Ta có định nghĩa sau.`,
            T`In earlier grades you learned to draw a circle with a {compass}: fix the needle at one point and turn the pencil end while keeping the opening unchanged. So what exactly is a circle? Here is the definition.`),
          fig('compass5', '', 'Dùng compa vẽ đường tròn tâm O bán kính R', 'Drawing a circle with a compass: centre O, radius R'),
          key([
            p(T`**Đường tròn tâm $O$ bán kính $R$** ($R>0$), kí hiệu là $(O;\,R)$, là hình gồm tất cả các điểm cách điểm $O$ một khoảng bằng $R$.`,
              T`A **circle with {centre|centre} $O$ and {radius|radius} $R$** ($R>0$), written $(O;\,R)$, is the figure made of all points at distance $R$ from the point $O$.`)
          ], { vi: 'Định nghĩa đường tròn', en: 'Definition of a circle' })
        ]
      },

      /* ----------------------------------------------------------- Trang 84 */
      {
        number: 84,
        blocks: [
          tip({
            vi: T`• Khi không cần để ý đến bán kính, ta kí hiệu đường tròn tâm $O$ là $(O)$. • Nếu $A$ là một điểm của đường tròn $(O)$ thì ta viết $A\in(O)$; khi đó ta còn nói đường tròn $(O)$ *đi qua* điểm $A$, hay điểm $A$ *nằm trên* đường tròn $(O)$.`,
            en: T`• When the radius does not matter, we write the circle with centre $O$ simply as $(O)$. • If $A$ is a point of the circle $(O)$ we write $A\in(O)$; we also say the circle $(O)$ *passes through* $A$, or that $A$ *lies on* the circle $(O)$.`
          }),
          h3('Nhận xét', 'Remarks'),
          p(T`**1)** Trên Hình 5.1, điểm $A$ nằm trên, điểm $C$ nằm trong và điểm $B$ nằm ngoài đường tròn $(O)$. Tổng quát: điểm $M$ *nằm trên* $(O;\,R)$ nếu $OM=R$; *nằm trong* nếu $OM<R$; *nằm ngoài* nếu $OM>R$.`,
            T`**1)** In Figure 5.1, point $A$ lies on, point $C$ lies inside and point $B$ lies outside the circle $(O)$. In general: a point $M$ lies *on* $(O;\,R)$ if $OM=R$; *inside* if $OM<R$; *outside* if $OM>R$.`),
          fig('circ51', '5.1', 'Điểm nằm trên, trong, ngoài đường tròn', 'Points on, inside and outside a circle'),
          p(T`**2)** {Hình tròn|disc} tâm $O$ bán kính $R$ là hình gồm các điểm nằm trên và nằm trong đường tròn $(O;\,R)$.`,
            T`**2)** The {disc} with centre $O$ and radius $R$ is the figure made of the points on and inside the circle $(O;\,R)$.`),
          ex(1, [
            p(T`Gọi $O$ là {trung điểm|midpoint} của đoạn thẳng $AB$. Chứng minh rằng đường tròn $(O;\,OA)$ đi qua $B$.`,
              T`Let $O$ be the {midpoint} of segment $AB$. Prove that the circle $(O;\,OA)$ passes through $B$.`),
            fig('diam52', '5.2', 'Đường tròn đường kính AB', 'The circle with diameter AB')
          ], [
            p(T`Vì $O$ là trung điểm của $AB$ nên $OB=OA$. Do đó $B\in(O;\,OA)$; nói cách khác, đường tròn $(O;\,OA)$ đi qua $B$.`,
              T`Since $O$ is the midpoint of $AB$, $OB=OA$. Hence $B\in(O;\,OA)$; in other words, the circle $(O;\,OA)$ passes through $B$.`)
          ]),
          p(T`**Chú ý.** Đoạn $AB$ trong Ví dụ 1 là một {đường kính|diameter} của đường tròn $(O)$, nên $(O)$ còn gọi là *đường tròn đường kính $AB$*.`,
            T`**Note.** Segment $AB$ in Example 1 is a {diameter} of the circle $(O)$, so $(O)$ is also called the *circle with diameter $AB$*.`),
          lt(1, [p(T`Cho tam giác $ABC$ vuông tại $A$. Chứng minh rằng điểm $A$ thuộc đường tròn đường kính $BC$.`, T`Triangle $ABC$ has a right angle at $A$. Prove that $A$ lies on the circle with diameter $BC$.`)]),
          vd(1, [p(T`Trong mặt phẳng toạ độ $Oxy$, cho các điểm $A(3;\,0)$, $B(-2;\,0)$, $C(0;\,4)$. Vẽ hình và cho biết điểm nào nằm trên, điểm nào nằm trong, điểm nào nằm ngoài đường tròn $(O;\,3)$?`,
            T`In the coordinate plane $Oxy$ take $A(3;\,0)$, $B(-2;\,0)$, $C(0;\,4)$. Draw a figure and say which points lie on, inside and outside the circle $(O;\,3)$.`)])
        ]
      },

      /* ----------------------------------------------------------- Trang 85 */
      {
        number: 85,
        blocks: [
          h2('2', 'Tính đối xứng của đường tròn', 'Symmetry of the circle'),
          h3('Đối xứng tâm và đối xứng trục', 'Central symmetry and axial symmetry'),
          p(T`**1) Đối xứng tâm** (H.5.3). Hai điểm $M$ và $M'$ gọi là *đối xứng với nhau qua điểm $I$* (hay qua tâm $I$) nếu $I$ là trung điểm của đoạn thẳng $MM'$. Chẳng hạn, nếu $O$ là giao điểm hai đường chéo của hình bình hành $ABCD$ thì $OA=OC$ nên $A$ và $C$ đối xứng với nhau qua $O$; tương tự, $B$ và $D$ cũng đối xứng với nhau qua $O$.`,
            T`**1) {Central symmetry|central-symmetry}** (Fig. 5.3). Two points $M$ and $M'$ are *symmetric about the point $I$* (the centre $I$) if $I$ is the midpoint of segment $MM'$. For example, if $O$ is the intersection of the diagonals of parallelogram $ABCD$, then $OA=OC$, so $A$ and $C$ are symmetric about $O$; likewise $B$ and $D$ are symmetric about $O$.`),
          fig('sym53', '5.3', 'Đối xứng tâm', 'Central symmetry'),
          p(T`**2) Đối xứng trục** (H.5.4). Hai điểm $M$ và $M'$ gọi là *đối xứng với nhau qua đường thẳng $d$* (hay qua trục $d$) nếu $d$ là {đường trung trực|perpendicular-bisector} của đoạn thẳng $MM'$. Chẳng hạn, nếu $AH$ là đường cao trong tam giác $ABC$ cân tại $A$ thì $AH$ cũng là đường trung trực của $BC$, nên $B$ và $C$ đối xứng với nhau qua $AH$.`,
            T`**2) {Axial symmetry|axial-symmetry}** (Fig. 5.4). Two points $M$ and $M'$ are *symmetric about the line $d$* (the axis $d$) if $d$ is the {perpendicular bisector|perpendicular-bisector} of segment $MM'$. For example, if $AH$ is the altitude of triangle $ABC$ with $AB=AC$, then $AH$ is also the perpendicular bisector of $BC$, so $B$ and $C$ are symmetric about $AH$.`),
          fig('sym54', '5.4', 'Đối xứng trục', 'Axial symmetry'),
          h3('Tâm và trục đối xứng của đường tròn', 'Centre and axes of symmetry of a circle'),
          act('1', { vi: 'Điểm thuộc đường tròn và phép đối xứng', en: 'Points on a circle and symmetry' },
            T`Chứng minh rằng nếu một điểm thuộc đường tròn $(O)$ thì:`, T`Prove that if a point lies on the circle $(O)$, then:`,
            [
              it(T`điểm đối xứng với nó qua tâm $O$ cũng thuộc $(O)$;`, T`the point symmetric to it about the centre $O$ also lies on $(O)$;`),
              it(T`điểm đối xứng với nó qua một đường thẳng $d$ tuỳ ý đi qua $O$ cũng thuộc $(O)$.`, T`the point symmetric to it about any line $d$ through $O$ also lies on $(O)$.`)
            ]),
          key([
            p(T`Khi đó ta nói $O$ là *tâm đối xứng* của đường tròn $(O)$ và $d$ là *trục đối xứng* của đường tròn $(O)$. Tổng quát:`,
              T`Then $O$ is called the *{centre of symmetry|centre-of-symmetry}* of the circle $(O)$ and $d$ an *{axis of symmetry|axis-of-symmetry}* of it. In general:`),
            p(T`• Đường tròn là hình có tâm đối xứng; tâm của đường tròn là **tâm đối xứng** của nó.`, T`• A circle has a centre of symmetry; its centre is its **centre of symmetry**.`),
            p(T`• Đường tròn là hình có trục đối xứng; mỗi đường thẳng qua tâm của đường tròn là một **trục đối xứng** của nó.`, T`• A circle has axes of symmetry; every line through its centre is an **axis of symmetry**.`)
          ], { vi: 'Tính đối xứng của đường tròn', en: 'Symmetry of a circle' }),
          tip({
            vi: T`Đường tròn có một tâm đối xứng nhưng có vô số trục đối xứng.`,
            en: T`A circle has one centre of symmetry but infinitely many axes of symmetry.`
          })
        ]
      },

      /* ----------------------------------------------------------- Trang 86 */
      {
        number: 86,
        blocks: [
          ex(2, [
            p(T`Cho điểm $M$ nằm trên đường tròn $(O)$ đường kính $AB$. Sử dụng tính đối xứng của $(O)$, hãy nêu cách tìm: a) điểm $N$ đối xứng với $M$ qua tâm $O$; b) điểm $P$ đối xứng với $M$ qua đường thẳng $AB$.`,
              T`Point $M$ lies on the circle $(O)$ with diameter $AB$. Using the symmetry of $(O)$, describe how to find: a) the point $N$ symmetric to $M$ about the centre $O$; b) the point $P$ symmetric to $M$ about the line $AB$.`),
            fig('circ55', '5.5', 'Điểm đối xứng với M qua tâm O và qua trục AB', 'Points symmetric to M about the centre O and the axis AB')
          ], [
            p(T`a) $O$ là tâm đối xứng của $(O)$ nên $N$ vừa thuộc $(O)$, vừa thuộc đường thẳng $OM$. Vậy $N$ là giao điểm (khác $M$) của $(O)$ với đường thẳng $OM$.`,
              T`a) $O$ is the centre of symmetry of $(O)$, so $N$ lies on $(O)$ and on line $OM$. Hence $N$ is the second intersection (other than $M$) of $(O)$ with line $OM$.`),
            p(T`b) $AB$ là trục đối xứng của $(O)$ nên $P$ vừa thuộc $(O)$, vừa thuộc đường vuông góc hạ từ $M$ xuống $AB$. Vậy $P$ là giao điểm (khác $M$) của $(O)$ với đường thẳng qua $M$ vuông góc với $AB$.`,
              T`b) $AB$ is an axis of symmetry of $(O)$, so $P$ lies on $(O)$ and on the perpendicular dropped from $M$ to $AB$. Hence $P$ is the second intersection (other than $M$) of $(O)$ with the line through $M$ perpendicular to $AB$.`)
          ]),
          lt(2, [p(T`Cho đường tròn tâm $O$ và hai điểm $A$, $B$ thuộc $(O)$. Gọi $d$ là đường trung trực của đoạn $AB$. Chứng minh rằng $d$ là một trục đối xứng của $(O)$.`,
            T`Let a circle have centre $O$ and let $A$, $B$ lie on $(O)$. Let $d$ be the {perpendicular bisector|perpendicular-bisector} of segment $AB$. Prove that $d$ is an axis of symmetry of $(O)$.`)]),
          vd(2, [p(T`Trở lại tình huống mở đầu: bằng cách gấp đôi mảnh giấy hình tròn theo hai cách khác nhau, Oanh có thể tìm lại được tâm của hình tròn. Em hãy làm thử xem.`,
            T`Back to the opening problem: by folding the round paper in half in two different ways, Oanh can find the centre again. Try it yourself.`)]),
          tip({
            vi: T`**Gợi ý.** Mỗi nếp gấp là một trục đối xứng, tức là một đường kính. Hai nếp gấp khác nhau cắt nhau tại tâm.`,
            en: T`**Hint.** Each fold line is an axis of symmetry, i.e. a diameter. Two different fold lines meet at the centre.`
          }),
          head('practice', 'Bài tập', 'Exercises'),
          bt('5.1', T`Trong mặt phẳng toạ độ $Oxy$, cho các điểm $M(0;\,2)$, $N(0;\,-3)$ và $P(2;\,-1)$. Vẽ hình và cho biết điểm nào nằm trên, điểm nào nằm trong, điểm nào nằm ngoài đường tròn $(O;\,\sqrt{5})$? Vì sao?`,
            T`In the coordinate plane $Oxy$ take $M(0;\,2)$, $N(0;\,-3)$ and $P(2;\,-1)$. Draw a figure and say which points lie on, inside and outside the circle $(O;\,\sqrt{5})$. Why?`),
          bt('5.2', T`Cho tam giác $ABC$ vuông tại $A$ có $AB=3$ cm, $AC=4$ cm. Chứng minh rằng các điểm $A$, $B$, $C$ thuộc cùng một đường tròn. Tính bán kính của đường tròn đó.`,
            T`Triangle $ABC$ has a right angle at $A$, with $AB=3$ cm and $AC=4$ cm. Prove that $A$, $B$, $C$ lie on one circle and find its radius.`),
          bt('5.3', T`Cho đường tròn $(O)$, đường thẳng $d$ đi qua $O$ và điểm $A$ thuộc $(O)$ nhưng không thuộc $d$. Gọi $B$ là điểm đối xứng với $A$ qua $d$; $C$ và $D$ lần lượt là điểm đối xứng với $A$ và $B$ qua $O$. a) Ba điểm $B$, $C$, $D$ có thuộc $(O)$ không? Vì sao? b) Chứng minh tứ giác $ABCD$ là hình chữ nhật. c) Chứng minh rằng $C$ và $D$ đối xứng với nhau qua $d$.`,
            T`Let $(O)$ be a circle, $d$ a line through $O$, and $A$ a point of $(O)$ not on $d$. Let $B$ be the point symmetric to $A$ about $d$, and $C$, $D$ the points symmetric to $A$, $B$ about $O$. a) Do $B$, $C$, $D$ lie on $(O)$? Why? b) Prove that $ABCD$ is a rectangle. c) Prove that $C$ and $D$ are symmetric about $d$.`),
          bt('5.4', T`Cho hình vuông $ABCD$ có $E$ là giao điểm của hai đường chéo. a) Chứng minh rằng có một đường tròn đi qua bốn điểm $A$, $B$, $C$, $D$. Xác định tâm đối xứng và chỉ ra hai trục đối xứng của đường tròn đó. b) Tính bán kính của đường tròn ở câu a), biết hình vuông có cạnh bằng 3 cm.`,
            T`Square $ABCD$ has diagonals meeting at $E$. a) Prove that a circle passes through $A$, $B$, $C$, $D$. Identify its centre of symmetry and name two of its axes of symmetry. b) Find the radius of that circle if the square has side 3 cm.`)
        ]
      }
    ]
  };

  /* ========================================================================
     BÀI 14. CUNG VÀ DÂY CỦA MỘT ĐƯỜNG TRÒN
     ======================================================================== */
  D.lessons['toan9-bai14'] = {
    gradeId: 9,
    number: '14',
    book: 'Toán 9',
    title: { vi: 'Cung và dây của một đường tròn', en: 'Arcs and chords of a circle' },
    topic,
    spreadLabels: ['Dây và đường kính', 'Góc ở tâm, cung tròn, số đo cung', 'Bài tập'],
    pages: [
      /* ----------------------------------------------------------- Trang 87 */
      {
        number: 87,
        blocks: [
          { t: 'banner' },
          goals(
            it(T`Nhận biết {cung|arc}, {dây cung|chord}, {đường kính|diameter} của đường tròn và quan hệ giữa độ dài dây và đường kính.`, T`Recognise an {arc}, a {chord} and a {diameter} of a circle, and the relation between a chord and the diameter.`),
            it(T`Nhận biết {góc ở tâm|central-angle} và cung bị chắn.`, T`Recognise a {central angle|central-angle} and the arc it intercepts.`),
            it(T`Nhận biết và xác định {số đo của một cung|arc-measure}.`, T`Recognise and find the {measure of an arc|arc-measure}.`)
          ),
          p(T`Trong các cuộc thi đấu thể thao người ta thường tổ chức thi bắn cung. Thuở xưa, cây cung được làm bằng cách buộc một sợi dây (gọi là dây cung) vào hai đầu một đoạn tre có tính đàn hồi cao. Đoạn tre bị kéo căng, cong lại tạo nên hình ảnh của một phần đường tròn, đó cũng chính là hình ảnh của "cung" trong Toán học.`,
            T`Archery is a common sport. In the past a bow was made by tying a string (the bowstring) to both ends of a springy piece of bamboo. When drawn, the bamboo bends into part of a circle, which is exactly the picture of an "{arc}" in mathematics.`),
          h2('1', 'Dây và đường kính của đường tròn', 'Chords and diameters of a circle'),
          h3('Khái niệm dây và đường kính của đường tròn', 'Chord and diameter of a circle'),
          key([
            p(T`• Đoạn thẳng nối hai điểm tuỳ ý của một đường tròn gọi là một **dây** (hay **dây cung**) của đường tròn.`,
              T`• A segment joining any two points of a circle is called a **{chord|chord}** of the circle.`),
            p(T`• Mỗi dây đi qua tâm là một **đường kính** của đường tròn. Đường kính của đường tròn bán kính $R$ có độ dài bằng $2R$.`,
              T`• A chord through the centre is a **{diameter|diameter}**. The diameter of a circle with radius $R$ has length $2R$.`),
            p(T`Trên Hình 5.6, $CD$ là một dây, $AB$ là một đường kính của $(O)$.`, T`In Figure 5.6, $CD$ is a chord and $AB$ is a diameter of $(O)$.`)
          ], { vi: 'Dây và đường kính', en: 'Chord and diameter' }),
          fig('circ56', '5.6', 'Dây CD và đường kính AB', 'Chord CD and diameter AB'),
          h3('Quan hệ giữa dây và đường kính', 'Relation between a chord and the diameter'),
          act('1', { vi: 'So sánh dây với đường kính', en: 'Comparing a chord with the diameter' },
            T`Xét dây $AB$ tuỳ ý không đi qua tâm của đường tròn $(O;\,R)$ (H.5.7). Dựa vào quan hệ giữa các cạnh của tam giác $AOB$, chứng minh $AB<2R$.`,
            T`Take any chord $AB$ not through the centre of the circle $(O;\,R)$ (Fig. 5.7). Using the relation between the sides of triangle $AOB$, prove that $AB<2R$.`,
            null, { art: 'circ57', figNo: '5.7', figVi: 'Dây AB không đi qua tâm', figEn: 'A chord AB not through the centre' }),
          key([
            p(T`**Định lí.** Trong một đường tròn, đường kính là dây cung lớn nhất.`,
              T`**Theorem.** In a circle, the diameter is the longest chord.`)
          ], { vi: 'Định lí', en: 'Theorem' })
        ]
      },

      /* ----------------------------------------------------------- Trang 88 */
      {
        number: 88,
        blocks: [
          ex(1, [
            p(T`Tứ giác lồi $ABCD$ có $∠BAC=∠BDC=90°$. Chứng minh bốn điểm $A$, $B$, $C$, $D$ cùng nằm trên một đường tròn và $AD<BC$.`,
              T`Convex quadrilateral $ABCD$ has $∠BAC=∠BDC=90°$. Prove that $A$, $B$, $C$, $D$ lie on one circle and that $AD<BC$.`),
            fig('circ58', '5.8', 'Bốn điểm cùng thuộc đường tròn đường kính BC', 'Four points on the circle with diameter BC')
          ], [
            p(T`Gọi $O$ là trung điểm của $BC$. Tam giác $ABC$ vuông tại $A$ nên đường {trung tuyến|median} $AO$ bằng nửa cạnh huyền: $OA=OB=OC=\frac{BC}{2}$. Do đó $A$ nằm trên đường tròn $(O)$ đường kính $BC$.`,
              T`Let $O$ be the midpoint of $BC$. Triangle $ABC$ has a right angle at $A$, so its {median} $AO$ equals half the hypotenuse: $OA=OB=OC=\frac{BC}{2}$. So $A$ lies on the circle $(O)$ with diameter $BC$.`),
            p(T`Tương tự, xét tam giác $DBC$ ta có $D\in(O)$. Vậy $AD$ là một dây (không đi qua tâm) của $(O)$; theo định lí trên, $AD<BC$.`,
              T`Likewise, from triangle $DBC$ we get $D\in(O)$. So $AD$ is a chord (not through the centre) of $(O)$, and by the theorem above $AD<BC$.`)
          ]),
          lt(1, [p(T`Cho đường tròn đường kính $BC$. Chứng minh rằng với điểm $A$ bất kì (khác $B$ và $C$) nằm trên đường tròn, ta đều có $BC<AB+AC<2BC$.`,
            T`A circle has diameter $BC$. Prove that for every point $A$ (other than $B$, $C$) on the circle, $BC<AB+AC<2BC$.`)]),
          h2('2', 'Góc ở tâm, cung và số đo của một cung', 'Central angles, arcs and arc measure'),
          h3('Khái niệm góc ở tâm và cung tròn', 'Central angle and arc'),
          p(T`Cho hai điểm $A$ và $B$ cùng thuộc một đường tròn. Hai điểm ấy chia đường tròn thành hai phần, mỗi phần gọi là một **cung tròn** (hay **cung**). Hai điểm $A$ và $B$ gọi là hai mút (hay đầu mút) của mỗi cung đó.`,
            T`Two points $A$ and $B$ on a circle divide it into two parts, each called an **{arc|arc}**. The points $A$ and $B$ are the endpoints of each arc.`),
          key([
            p(T`**Góc ở tâm** là góc có đỉnh trùng với tâm của đường tròn.`, T`A **{central angle|central-angle}** is an angle whose vertex is the centre of the circle.`)
          ], { vi: 'Góc ở tâm', en: 'Central angle' }),
          fig('circ59', '5.9', 'Góc ở tâm AOB và hai cung AmB, AnB', 'The central angle AOB and the arcs AmB, AnB'),
          p(T`Trên Hình 5.9 có hai cung, kí hiệu là $AmB$ và $AnB$, nhưng chỉ có một góc ở tâm là $∠AOB$.`,
            T`Figure 5.9 shows two arcs, written $AmB$ and $AnB$, but only one central angle, $∠AOB$.`),
          p(T`**Chú ý.** • Khi góc $AOB$ không bẹt, cung nằm trong góc $AOB$ gọi là *{cung nhỏ|minor-arc}* (ở Hình 5.9, $AmB$ là cung nhỏ, còn viết gọn là $AB$); cung còn lại, $AnB$, gọi là *{cung lớn|major-arc}*. Khi góc $AOB$ bẹt, mỗi cung $AB$ gọi là một *{nửa đường tròn|semicircle}*. • Ta còn nói góc $AOB$ *chắn* cung $AB$, hay cung $AB$ *bị chắn* bởi góc $AOB$.`,
            T`**Note.** • When angle $AOB$ is not straight, the arc inside angle $AOB$ is the *{minor arc|minor-arc}* (in Figure 5.9, $AmB$ is the minor arc, also written $AB$); the other arc, $AnB$, is the *{major arc|major-arc}*. When angle $AOB$ is straight, each arc $AB$ is a *{semicircle}*. • We also say that angle $AOB$ *intercepts* arc $AB$.`)
        ]
      },

      /* ----------------------------------------------------------- Trang 89 */
      {
        number: 89,
        blocks: [
          ex(2, [
            p(T`Cho ba điểm $A$, $B$, $C$ thuộc đường tròn $(O)$ như Hình 5.10. a) Tìm các góc ở tâm có hai cạnh đi qua hai trong ba điểm $A$, $B$, $C$. b) Tìm các cung có hai mút là hai trong ba điểm $A$, $B$, $C$.`,
              T`Points $A$, $B$, $C$ lie on the circle $(O)$ as in Figure 5.10. a) Find the {central angles|central-angle} whose two sides pass through two of the points $A$, $B$, $C$. b) Find the arcs whose endpoints are two of the points $A$, $B$, $C$.`),
            fig('circ510', '5.10', 'Ba điểm A, B, C trên đường tròn (O)', 'Three points A, B, C on the circle (O)')
          ], [
            p(T`a) Các góc ở tâm là $∠AOB$, $∠BOC$ và $∠COA$.`, T`a) The central angles are $∠AOB$, $∠BOC$ and $∠COA$.`),
            p(T`b) Cung có hai mút $A$, $B$: $AB$ và $ACB$. Cung có hai mút $A$, $C$: $AC$ và $ABC$. Cung có hai mút $B$, $C$: $BAC$ và $BaC$.`,
              T`b) Arcs with endpoints $A$, $B$: $AB$ and $ACB$. With endpoints $A$, $C$: $AC$ and $ABC$. With endpoints $B$, $C$: $BAC$ and $BaC$.`)
          ]),
          h3('Cách xác định số đo của một cung', 'How to find the measure of an arc'),
          key([
            p(T`**1) Số đo của một cung** được xác định như sau: • Số đo của nửa đường tròn bằng $180°$. • Số đo của cung nhỏ bằng số đo của góc ở tâm chắn cung đó. • Số đo của cung lớn bằng hiệu giữa $360°$ và số đo của cung nhỏ có chung hai mút.`,
              T`**1) The {measure of an arc|arc-measure}** is found as follows: • a semicircle measures $180°$. • a minor arc measures the same as the central angle that intercepts it. • a major arc measures $360°$ minus the measure of the minor arc with the same endpoints.`),
            p(T`**2)** Số đo của cung $AB$ kí hiệu là sđ $AB$. Trên Hình 5.9 ta có:`, T`**2)** The measure of arc $AB$ is written $\text{m}(AB)$. In Figure 5.9:`),
            m(T`\text{sđ}\ AmB=∠AOB=\alpha\ \ (0°<\alpha\le 180°)`),
            m(T`\text{sđ}\ AnB=360°-\alpha`)
          ], { vi: 'Số đo cung', en: 'Measure of an arc' }),
          p(T`**Chú ý.** Cung có số đo $n°$ còn gọi là cung $n°$. Cả đường tròn được coi là cung $360°$; đôi khi một điểm được coi là cung $0°$. Hai cung trên một đường tròn gọi là *bằng nhau* nếu chúng có cùng số đo.`,
            T`**Note.** An arc measuring $n°$ is also called an $n°$ arc. The whole circle counts as a $360°$ arc, and sometimes a single point is regarded as a $0°$ arc. Two arcs of one circle are *equal* if they have the same measure.`),
          tip({
            vi: T`**Câu hỏi.** Tại sao số đo cung lớn của một đường tròn luôn lớn hơn $180°$?`,
            en: T`**Question.** Why is the measure of a major arc of a circle always greater than $180°$?`
          }),
          p(T`**Nhận xét.** Nếu $A$ là một điểm thuộc cung $BAC$ thì sđ $BAC$ = sđ $BA$ + sđ $AC$ (H.5.10).`,
            T`**Remark.** If $A$ lies on arc $BAC$, then $\text{m}(BAC)=\text{m}(BA)+\text{m}(AC)$ (Fig. 5.10).`),
          ex(3, [
            p(T`Tính số đo của các cung có các đầu mút là hai trong các điểm $A$, $B$, $C$ trong Hình 5.11, biết rằng $ABC$ là tam giác vuông cân tại đỉnh $A$.`,
              T`Find the measures of the arcs whose endpoints are two of the points $A$, $B$, $C$ in Figure 5.11, given that $ABC$ is an isosceles right triangle with its right angle at $A$.`),
            fig('circ511', '5.11', 'Tam giác ABC vuông cân tại A nội tiếp đường tròn', 'An isosceles right triangle ABC inscribed in the circle')
          ], [
            p(T`$AB$ và $AC$ là các cung nhỏ bị chắn bởi các góc ở tâm $∠AOB$ và $∠AOC$. Vì tam giác $ABC$ vuông cân tại $A$ nên trung tuyến $AO$ cũng là đường cao, tức là $AO\perp BC$. Do đó $∠AOB=∠AOC=90°$, suy ra sđ $AB$ = sđ $AC$ = $90°$.`,
              T`$AB$ and $AC$ are the minor arcs intercepted by the central angles $∠AOB$ and $∠AOC$. Since $ABC$ is isosceles with its right angle at $A$, the median $AO$ is also the altitude, so $AO\perp BC$. Thus $∠AOB=∠AOC=90°$, and $\text{m}(AB)=\text{m}(AC)=90°$.`),
            p(T`$ACB$ là cung lớn có chung hai mút $A$, $B$ với cung nhỏ $AB$ nên sđ $ACB=360°-90°=270°$. Tương tự sđ $ABC=360°-90°=270°$. Ngoài ra còn có hai nửa đường tròn chung hai mút $B$, $C$, mỗi nửa có số đo $180°$.`,
              T`$ACB$ is the major arc sharing endpoints $A$, $B$ with the minor arc $AB$, so $\text{m}(ACB)=360°-90°=270°$. Similarly $\text{m}(ABC)=360°-90°=270°$. There are also two semicircles with endpoints $B$, $C$, each measuring $180°$.`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 90 */
      {
        number: 90,
        blocks: [
          lt(2, [p(T`Cho điểm $C$ nằm trên đường tròn $(O)$. Đường {trung trực|perpendicular-bisector} của đoạn $OC$ cắt $(O)$ tại $A$ và $B$. Tính số đo của các cung $ACB$ và $ABC$.`,
            T`Point $C$ lies on the circle $(O)$. The {perpendicular bisector|perpendicular-bisector} of segment $OC$ meets $(O)$ at $A$ and $B$. Find the measures of arcs $ACB$ and $ABC$.`)]),
          head('practice', 'Bài tập', 'Exercises'),
          bt('5.5', T`Cho nửa đường tròn đường kính $AB$ và một điểm $M$ tuỳ ý thuộc nửa đường tròn đó. Chứng minh rằng khoảng cách từ $M$ đến $AB$ không lớn hơn $\frac{AB}{2}$.`,
            T`Take a semicircle with diameter $AB$ and any point $M$ on it. Prove that the distance from $M$ to $AB$ is at most $\frac{AB}{2}$.`),
          bt('5.6', T`Cho đường tròn $(O;\,5\text{ cm})$ và $AB$ là một dây bất kì của đường tròn đó. Biết $AB=6$ cm. a) Tính khoảng cách từ $O$ đến đường thẳng $AB$. b) Tính $\tan\alpha$ nếu góc ở tâm chắn cung $AB$ bằng $2\alpha$.`,
            T`A circle $(O;\,5\text{ cm})$ has a chord $AB=6$ cm. a) Find the distance from $O$ to line $AB$. b) Find $\tan\alpha$ if the central angle intercepting arc $AB$ is $2\alpha$.`),
          bt('5.7', T`Tâm $O$ của một đường tròn cách dây $AB$ của nó một khoảng 3 cm. Tính bán kính của $(O)$, biết rằng cung nhỏ $AB$ có số đo bằng $100°$ (làm tròn đến hàng phần mười).`,
            T`The centre $O$ of a circle is 3 cm from its chord $AB$. Find the radius of $(O)$ if the minor arc $AB$ measures $100°$ (to one decimal place).`),
          bt('5.8', T`Trên mặt một chiếc đồng hồ có các vạch chia như Hình 5.12, cứ sau mỗi khoảng thời gian 36 phút: a) đầu kim phút vạch nên một cung có số đo bằng bao nhiêu độ? b) đầu kim giờ vạch nên một cung có số đo bằng bao nhiêu độ?`,
            T`On a clock face with marks as in Figure 5.12, in every 36 minutes: a) through how many degrees of arc does the tip of the minute hand sweep? b) through how many degrees does the tip of the hour hand sweep?`),
          tip({
            vi: T`**Gợi ý cho 5.8.** Kim phút quay $360°$ trong 60 phút, kim giờ quay $360°$ trong 12 giờ $=720$ phút.`,
            en: T`**Hint for 5.8.** The minute hand turns $360°$ in 60 minutes; the hour hand turns $360°$ in 12 hours $=720$ minutes.`
          })
        ]
      }
    ]
  };
  /* ========================================================================
     TỪ VỰNG BỔ SUNG CHO BÀI 15 VÀ LUYỆN TẬP CHUNG
     ======================================================================== */
  Object.assign(D.glossary, {
    'arc-length': g('length of an arc', '/leŋθ əv ən ɑːk/', 'n', 'độ dài cung tròn',
      'Trong Toán: Độ dài phần đường tròn nằm giữa hai mút của cung; cung n° của đường tròn bán kính R dài l = nπR/180.',
      'The length of a 90-degree arc is a quarter of the circumference.', 'Cung 90° có độ dài bằng một phần tư chu vi.'),
    circumference: g('circumference', '/səˈkʌm.fər.əns/', 'n', 'chu vi đường tròn',
      'Trong Toán: Độ dài của cả đường tròn, C = 2πR = πd.',
      'The circumference of a circle is 2πR.', 'Chu vi đường tròn bằng 2πR.'),
    pi: g('pi', '/paɪ/', 'n', 'số π (pi)',
      'Trong Toán: Số vô tỉ bằng tỉ số giữa chu vi và đường kính của mọi đường tròn; xấp xỉ 3,14.',
      'Pi is approximately 3.14.', 'Số pi xấp xỉ 3,14.'),
    sector: g('circular sector', '/ˈsɜː.kjə.lər ˈsek.tər/', 'n', 'hình quạt tròn',
      'Trong Toán: Phần hình tròn giới hạn bởi một cung tròn và hai bán kính đi qua hai đầu mút của cung đó.',
      'The area of a sector with a 90-degree arc is a quarter of the disc.', 'Diện tích hình quạt ứng với cung 90° bằng một phần tư hình tròn.'),
    annulus: g('annulus', '/ˈæn.jə.ləs/', 'n', 'hình vành khuyên (hình vành khăn)',
      'Trong Toán: Phần nằm giữa hai đường tròn đồng tâm có bán kính khác nhau; diện tích S = π(R² − r²). Còn gọi là circular ring.',
      'The annulus between radii 3 m and 5 m has area 16π square metres.', 'Hình vành khuyên giữa hai bán kính 3 m và 5 m có diện tích 16π m².'),
    'concentric-circles': g('concentric circles', '/kənˈsen.trɪk ˈsɜː.kəlz/', 'n', 'các đường tròn đồng tâm',
      'Trong Toán: Các đường tròn có cùng tâm nhưng bán kính khác nhau.',
      'A target is made of concentric circles.', 'Tấm bia gồm các đường tròn đồng tâm.'),
    'circular-segment': g('circular segment', '/ˈsɜː.kjə.lər ˈseɡ.mənt/', 'n', 'hình viên phân',
      'Trong Toán: Hình giới hạn bởi một cung nhỏ của đường tròn và dây căng cung đó.',
      'The segment equals the sector minus the triangle.', 'Hình viên phân bằng hình quạt trừ tam giác.'),
    area: g('area', '/ˈeə.ri.ə/', 'n', 'diện tích',
      'Trong Toán: Số đo phần mặt phẳng mà một hình chiếm; hình tròn bán kính R có diện tích πR².',
      'The area of a disc of radius R is πR².', 'Diện tích hình tròn bán kính R là πR².')
  });

  /* ========================================================================
     BÀI 15. ĐỘ DÀI CỦA CUNG TRÒN. DIỆN TÍCH HÌNH QUẠT TRÒN VÀ HÌNH VÀNH KHUYÊN
     ======================================================================== */
  D.lessons['toan9-bai15'] = {
    gradeId: 9,
    number: '15',
    book: 'Toán 9',
    title: { vi: 'Độ dài của cung tròn. Diện tích hình quạt tròn và hình vành khuyên', en: 'Arc length; area of a sector and of an annulus' },
    topic,
    spreadLabels: ['Công thức độ dài cung tròn', 'Hình quạt tròn, hình vành khuyên, diện tích', 'Ví dụ, thực hành, bài tập'],
    pages: [
      /* ----------------------------------------------------------- Trang 91 */
      {
        number: 91,
        blocks: [
          { t: 'banner' },
          goals(
            it(T`Biết hình quạt tròn và hình vành khuyên.`, T`Know what a {circular sector|sector} and an {annulus} are.`),
            it(T`Tính {độ dài cung tròn|arc-length}.`, T`Calculate the {length of an arc|arc-length}.`),
            it(T`Tính diện tích hình quạt tròn và hình vành khuyên.`, T`Calculate the {area} of a sector and of an annulus.`)
          ),
          p(T`**Tình huống mở đầu.** Số người trên một địa bàn đã được tiêm mũi 4 phòng dịch Covid-19 đạt 40% trong tổng số các đối tượng cần được tiêm. Để hoàn thành một biểu đồ hình quạt tròn, Trang cần vẽ hình quạt tròn biểu thị số liệu 40%. Em có thể giúp bạn Trang không?`,
            T`**Opening problem.** In one area, 40% of the people who need it have had the 4th Covid-19 vaccine dose. To finish a pie chart, Trang must draw the {sector} that shows 40%. Can you help her?`),
          h2('1', 'Độ dài của cung tròn', 'Length of an arc'),
          h3('Công thức tính độ dài của cung tròn', 'The formula for the length of an arc'),
          p(T`Người ta chứng minh được rằng tỉ số giữa chu vi và đường kính của một đường tròn luôn bằng một số vô tỉ không đổi, gọi là số $\pi$ (đọc là pi). Ta có thể tìm giá trị gần đúng của $\pi$ nhờ máy tính cầm tay; trong đời sống, ta thường lấy $\pi\approx 3{,}14$. Do đó, độ dài $C$ của đường tròn $(O;\,R)$ có đường kính $d=2R$ là:`,
            T`It can be proved that the ratio of the {circumference} of a circle to its diameter is always the same irrational number, called {pi}. We can find an approximate value of $\pi$ with a calculator; in daily life we usually take $\pi\approx 3.14$. So the circumference $C$ of the circle $(O;\,R)$ with diameter $d=2R$ is:`),
          m(T`C=\pi d=2\pi R\qquad (1)`),
          act('1', { vi: 'Lập công thức độ dài cung', en: 'Deriving the arc-length formula' },
            T`Biết rằng trên một đường tròn, hai cung bằng nhau thì có cùng độ dài và độ dài của cung tỉ lệ với số đo của nó. Hãy lập công thức tính độ dài cung $n°$ của đường tròn bán kính $R$ theo các bước sau:`,
            T`On one circle, equal arcs have equal lengths, and the length of an arc is proportional to its measure. Derive the length of an $n°$ arc of a circle with radius $R$ in these steps:`,
            [
              it(T`Từ (1), tính độ dài của cung $1°$.`, T`From (1), find the length of a $1°$ arc.`),
              it(T`Tính độ dài $l$ của cung $n°$.`, T`Find the length $l$ of an $n°$ arc.`)
            ]),
          key([
            p(T`Độ dài $l$ của cung $n°$ trên đường tròn $(O;\,R)$ là:`, T`The {length|arc-length} $l$ of an $n°$ {arc|arc} on the circle $(O;\,R)$ is:`),
            m(T`l=\frac{n}{180}\pi R\qquad (2)`)
          ], { vi: 'Độ dài cung tròn', en: 'Length of an arc' }),
          p(T`**Nhận xét.** Từ (1) và (2): $l=\frac{n}{360}\pi d=\frac{n}{360}C$, hay $\frac{l}{C}=\frac{n}{360}$. Nghĩa là: tỉ số giữa độ dài cung $n°$ và độ dài đường tròn (cùng bán kính) đúng bằng $\frac{n}{360}$.`,
            T`**Remark.** From (1) and (2): $l=\frac{n}{360}\pi d=\frac{n}{360}C$, i.e. $\frac{l}{C}=\frac{n}{360}$. In words: the ratio of the length of an $n°$ arc to the circumference of the circle (same radius) is exactly $\frac{n}{360}$.`),
          ex(1, [
            p(T`Cho $A$ và $B$ là hai điểm trên đường tròn $(O;\,3\text{ cm})$ sao cho $∠AOB=120°$. Tính số đo và độ dài các cung có hai mút $A$, $B$.`,
              T`Let $A$ and $B$ be two points on the circle $(O;\,3\text{ cm})$ with $∠AOB=120°$. Find the measure and the length of the arcs with endpoints $A$, $B$.`),
            fig('circ513', '5.13', 'Góc ở tâm 120° và hai cung có mút A, B', 'A 120° central angle and the two arcs with endpoints A, B')
          ], [
            p(T`• Cung nhỏ $AB$ bị chắn bởi góc ở tâm $AOB$, nên sđ $AB=∠AOB=120°$. Độ dài $l_1$ của cung $AB$:`,
              T`• The {minor arc|minor-arc} $AB$ is intercepted by the central angle $AOB$, so $\text{m}(AB)=∠AOB=120°$. Its length $l_1$ is:`),
            m(T`l_1=\frac{120}{180}\pi\cdot 3=2\pi\ (\text{cm})`),
            p(T`• Cung lớn $AmB$ có số đo $360°-120°=240°$. Độ dài $l_2$ của cung $AmB$:`,
              T`• The {major arc|major-arc} $AmB$ measures $360°-120°=240°$. Its length $l_2$ is:`),
            m(T`l_2=\frac{240}{180}\pi\cdot 3=4\pi\ (\text{cm})`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 92 */
      {
        number: 92,
        blocks: [
          lt(1, [p(T`Tính độ dài cung $40°$ của đường tròn bán kính 9 cm.`, T`Find the length of a $40°$ arc of a circle with radius 9 cm.`)]),
          vd(1, [
            p(T`Bánh xe (khi bơm căng) của một chiếc xe đạp có đường kính 650 mm. Biết rằng khi giò đĩa quay một vòng thì bánh xe quay được khoảng 3,3 vòng (H.5.14). Hỏi chiếc xe đạp di chuyển được quãng đường dài bao nhiêu mét sau khi người đi xe đạp 10 vòng liên tục?`,
              T`A bicycle wheel (fully inflated) has a diameter of 650 mm. When the pedal crank turns once, the wheel turns about 3.3 times (Fig. 5.14). How many metres does the bicycle travel after the rider pedals 10 full turns?`)
          ]),
          tip({
            vi: T`**Hướng dẫn.** Khi bánh xe quay 3,3 vòng thì mỗi điểm trên bánh xe di chuyển được một độ dài bằng 3,3 lần chu vi đường tròn. Với 10 vòng đạp: $33\cdot\pi\cdot 0{,}65\approx 67{,}4$ m.`,
            en: T`**Hint.** When the wheel turns 3.3 times, each point of the wheel travels 3.3 times the {circumference}. For 10 pedal turns: $33\cdot\pi\cdot 0.65\approx 67.4$ m.`
          }),
          h2('2', 'Hình quạt tròn và hình vành khuyên', 'Circular sector and annulus'),
          h3('Hình tròn, hình quạt tròn và hình vành khuyên', 'Disc, sector and annulus'),
          key([
            p(T`**1) Hình quạt tròn** là phần hình tròn giới hạn bởi một cung tròn và hai bán kính đi qua hai đầu mút của cung đó (H.5.15).`,
              T`**1) A {circular sector|sector}** is the part of a disc bounded by an arc and the two radii through its endpoints (Fig. 5.15).`),
            p(T`**2) Hình vành khuyên** (còn gọi là *hình vành khăn*) (H.5.16) là phần nằm giữa hai đường tròn có cùng tâm và bán kính khác nhau (còn gọi là *hai đường tròn đồng tâm*).`,
              T`**2) An {annulus}** (also called a *circular ring*) (Fig. 5.16) is the part between two circles with the same centre and different radii (also called {concentric circles|concentric-circles}).`)
          ], { vi: 'Hình quạt tròn và hình vành khuyên', en: 'Sector and annulus' }),
          { t: 'figs', items: [
            { art: 'sector515', no: '5.15', vi: 'Hình quạt tròn', en: 'A circular sector' },
            { art: 'annulus516', no: '5.16', vi: 'Hình vành khuyên', en: 'An annulus (circular ring)' }
          ] },
          tip({
            vi: T`**Câu hỏi.** Em hãy tìm một số hình ảnh của hình quạt tròn và hình vành khuyên trong thực tế.`,
            en: T`**Question.** Find some real-life examples of a sector and an annulus.`
          })
        ]
      },

      /* ----------------------------------------------------------- Trang 93 */
      {
        number: 93,
        blocks: [
          h3('Diện tích hình quạt tròn và hình vành khuyên', 'Area of a sector and of an annulus'),
          p(T`Ta đã biết diện tích hình tròn bán kính $R$ được tính theo công thức $S=\pi R^2$. Hãy thực hiện các hoạt động sau để tìm công thức tính diện tích hình quạt tròn và hình vành khuyên.`,
            T`We know that the {area} of a disc of radius $R$ is $S=\pi R^2$. Do the activities below to find the area of a sector and of an annulus.`),
          act('2', { vi: 'Diện tích hình quạt', en: 'Area of a sector' },
            T`Biết rằng hai hình quạt tròn ứng với hai cung bằng nhau trên một đường tròn thì có diện tích bằng nhau, và diện tích hình quạt tròn tỉ lệ với số đo của cung tương ứng. Hãy thiết lập công thức tính diện tích hình quạt tròn bán kính $R$ ứng với cung $n°$:`,
            T`Two sectors belonging to equal arcs of one circle have equal areas, and the area of a sector is proportional to the measure of its arc. Derive the area of a sector with radius $R$ and an $n°$ arc:`,
            [
              it(T`Tính diện tích hình quạt tròn ứng với cung $1°$;`, T`Find the area of the sector with a $1°$ arc;`),
              it(T`Tính diện tích hình quạt tròn ứng với cung $n°$.`, T`Find the area of the sector with an $n°$ arc.`)
            ]),
          act('3', { vi: 'Diện tích hình vành khuyên', en: 'Area of an annulus' },
            T`Thiết lập công thức tính diện tích hình vành khuyên nằm giữa hai đường tròn đồng tâm có bán kính là $R$ và $r$ ($R>r$).`,
            T`Derive the area of the annulus between two concentric circles with radii $R$ and $r$ ($R>r$).`,
            null),
          key([
            p(T`• **Diện tích $S_q$ của hình quạt tròn** bán kính $R$ ứng với cung $n°$:`, T`• The **area $S_q$ of a {sector|sector}** with radius $R$ and an $n°$ arc:`),
            m(T`S_q=\frac{n}{360}\pi R^2=\frac{l\cdot R}{2}\qquad (3)`),
            p(T`• **Diện tích $S_v$ của hình vành khuyên** tạo bởi hai đường tròn đồng tâm có bán kính $R$ và $r$:`, T`• The **area $S_v$ of an {annulus}** formed by two concentric circles with radii $R$ and $r$:`),
            m(T`S_v=\pi(R^2-r^2)\quad (R>r)\qquad (4)`)
          ], { vi: 'Công thức diện tích', en: 'Area formulas' }),
          p(T`**Nhận xét.** Công thức (3) có thể viết là $S_q=\frac{n}{360}S$, hay $\frac{S_q}{S}=\frac{n}{360}=\frac{l}{C}$. Nghĩa là: tỉ số giữa diện tích hình quạt tròn ứng với cung $n°$ và diện tích hình tròn (cùng bán kính) đúng bằng $\frac{n}{360}$, và bằng tỉ số giữa độ dài cung $n°$ và độ dài đường tròn.`,
            T`**Remark.** Formula (3) can be written $S_q=\frac{n}{360}S$, i.e. $\frac{S_q}{S}=\frac{n}{360}=\frac{l}{C}$. In words: the ratio of the area of a sector with an $n°$ arc to the area of the disc (same radius) is exactly $\frac{n}{360}$, and equals the ratio of the arc length to the circumference.`),
          ex(2, [
            p(T`Tính diện tích của hình vành khuyên nằm giữa hai đường tròn đồng tâm có bán kính là 3 m và 5 m.`,
              T`Find the area of the annulus between two concentric circles with radii 3 m and 5 m.`)
          ], [
            p(T`Gọi $S_v$ là diện tích cần tính. Theo (4):`, T`Let $S_v$ be the required area. By (4):`),
            m(T`S_v=\pi(5^2-3^2)=16\pi\ (\text{m}^2)`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 94 */
      {
        number: 94,
        blocks: [
          ex(3, [
            p(T`Tính diện tích của hình quạt tròn bán kính 5 cm và có độ dài cung tương ứng với nó bằng $4\pi$ cm.`,
              T`Find the area of a sector with radius 5 cm whose arc has length $4\pi$ cm.`)
          ], [
            p(T`Ta có $l=4\pi$ cm và $R=5$ cm. Theo (3):`, T`Here $l=4\pi$ cm and $R=5$ cm. By (3):`),
            m(T`S=\frac{l\cdot R}{2}=\frac{4\pi\cdot 5}{2}=10\pi\ (\text{cm}^2)`)
          ]),
          h3('Thực hành', 'Hands-on task'),
          p(T`Trở lại tình huống mở đầu, hãy vẽ (tô màu) hình quạt tròn theo hướng dẫn: – Vẽ đường tròn tâm $O$ (bán kính tuỳ chọn). – Hình quạt tròn cần vẽ ứng với cung có số đo bằng 40% của $360°$; tính số đo của cung cần vẽ ($0{,}4\cdot 360°=144°$). – Vẽ góc ở tâm có số đo tìm được và tô màu hình quạt tròn tương ứng.`,
            T`Back to the opening problem, draw (and colour) the sector as follows: – draw a circle with centre $O$ (any radius); – the arc must measure 40% of $360°$, so find it ($0.4\cdot 360°=144°$); – draw the {central angle|central-angle} of that size and colour the matching sector.`),
          lt(2, [p(T`Tính diện tích của hình quạt tròn đã vẽ trong Thực hành trên nếu bán kính của nó bằng 4 cm.`,
            T`Find the area of the sector drawn in the hands-on task if its radius is 4 cm.`)]),
          tip({
            vi: T`**Gợi ý.** $S_q=\frac{144}{360}\pi\cdot 4^2=6{,}4\pi\approx 20{,}1$ cm².`,
            en: T`**Hint.** $S_q=\frac{144}{360}\pi\cdot 4^2=6.4\pi\approx 20.1$ cm².`
          }),
          vd(2, [
            p(T`Một tấm bia tạo bởi năm đường tròn đồng tâm lần lượt có bán kính là 5 cm, 10 cm, 15 cm, 20 cm và 30 cm (H.5.17). Giả thiết rằng người chơi ném phi tiêu một cách ngẫu nhiên và luôn trúng bia. Tính xác suất ném trúng vòng 8 (hình vành khuyên nằm giữa đường tròn thứ hai và thứ ba), biết rằng xác suất cần tìm bằng tỉ số giữa diện tích của hình vành khuyên tương ứng với diện tích của hình tròn lớn nhất.`,
              T`A dartboard is made of five {concentric circles|concentric-circles} with radii 5 cm, 10 cm, 15 cm, 20 cm and 30 cm (Fig. 5.17). Assume the player throws a dart at random and always hits the board. Find the probability of hitting ring 8 (the {annulus} between the second and third circles), knowing that the probability equals the ratio of that annulus's area to the area of the largest disc.`),
            fig('target517', '5.17', 'Tấm bia gồm năm đường tròn đồng tâm', 'A dartboard of five concentric circles')
          ]),
          tip({
            vi: T`**Gợi ý.** $S_v=\pi(15^2-10^2)=125\pi$; hình tròn lớn nhất có diện tích $900\pi$. Xác suất $=\frac{125}{900}=\frac{5}{36}\approx 0{,}139$.`,
            en: T`**Hint.** $S_v=\pi(15^2-10^2)=125\pi$; the largest disc has area $900\pi$. The probability is $\frac{125}{900}=\frac{5}{36}\approx 0.139$.`
          }),
          head('practice', 'Bài tập', 'Exercises'),
          bt('5.9', T`Cho đường tròn $(O;\,4\text{ cm})$ và ba điểm $A$, $B$, $C$ trên đường tròn đó sao cho tam giác $ABC$ cân tại đỉnh $A$ và số đo của cung nhỏ $BC$ bằng $70°$. a) Giải thích tại sao hai cung nhỏ $AB$ và $AC$ bằng nhau. b) Tính độ dài của các cung $BC$, $AB$ và $AC$ (làm tròn đến hàng phần mười).`,
            T`Take the circle $(O;\,4\text{ cm})$ and three points $A$, $B$, $C$ on it so that triangle $ABC$ is isosceles at $A$ and the minor arc $BC$ measures $70°$. a) Explain why the minor arcs $AB$ and $AC$ are equal. b) Find the lengths of arcs $BC$, $AB$ and $AC$ (to one decimal place).`)
        ]
      },

      /* ----------------------------------------------------------- Trang 95 */
      {
        number: 95,
        blocks: [
          bt('5.10', T`Tính diện tích của hình quạt tròn bán kính 4 cm, ứng với cung $36°$.`,
            T`Find the area of a {sector} with radius 4 cm and a $36°$ arc.`),
          bt('5.11', T`Tính diện tích hình vành khuyên nằm giữa hai đường tròn đồng tâm có bán kính là 6 cm và 4 cm.`,
            T`Find the area of the {annulus} between two concentric circles with radii 6 cm and 4 cm.`),
          bt('5.12', T`Có hai chiếc bánh pizza hình tròn (H.5.18). Chiếc bánh thứ nhất có đường kính 16 cm được cắt thành 6 miếng đều nhau có dạng hình quạt tròn. Chiếc bánh thứ hai có đường kính 18 cm được cắt thành 8 miếng đều nhau có dạng hình quạt tròn. Hãy so sánh diện tích bề mặt của hai miếng bánh cắt ra từ chiếc bánh thứ nhất và thứ hai.`,
            T`There are two round pizzas (Fig. 5.18). The first has diameter 16 cm and is cut into 6 equal sector-shaped slices. The second has diameter 18 cm and is cut into 8 equal sector-shaped slices. Compare the surface areas of one slice from the first pizza and one slice from the second.`),
          bt('5.13', T`Một chiếc quạt giấy khi xoè ra có dạng nửa hình tròn bán kính 2,2 dm như Hình 5.19. Tính diện tích phần giấy của chiếc quạt, biết rằng khi gấp lại, phần giấy có chiều dài khoảng 1,6 dm (làm tròn kết quả đến hàng phần trăm của dm²).`,
            T`A paper fan, when opened, forms a half-disc of radius 2.2 dm as in Figure 5.19. Find the area of the paper part of the fan, knowing that when folded the paper part is about 1.6 dm long (to the nearest hundredth of a dm²).`),
          tip({
            vi: T`**Gợi ý cho 5.13.** Phần giấy là hình vành khuyên nửa: $S=\frac{1}{2}\pi(2{,}2^2-0{,}6^2)\approx 7{,}04$ dm² (bán kính trong $=2{,}2-1{,}6=0{,}6$ dm).`,
            en: T`**Hint for 5.13.** The paper part is half an annulus: $S=\frac{1}{2}\pi(2.2^2-0.6^2)\approx 7.04$ dm² (inner radius $=2.2-1.6=0.6$ dm).`
          })
        ]
      }
    ]
  };

  /* ========================================================================
     LUYỆN TẬP CHUNG (CHƯƠNG V)
     ======================================================================== */
  D.lessons['toan9-ltc5'] = {
    gradeId: 9,
    number: 'LT',
    book: 'Toán 9',
    title: { vi: 'Luyện tập chung', en: 'General practice' },
    topic,
    spreadLabels: ['Ví dụ 1; Ví dụ 2 và bài tập', 'Bài tập 5.17–5.19'],
    pages: [
      {
        number: 96,
        blocks: [
          { t: 'banner' },
          ex(1, [
            p(T`Cho tam giác nhọn $ABC$ cân tại $A$. Từ $B$ và $C$ kẻ lần lượt hai đường cao $BH$ và $CK$ của tam giác $ABC$. a) Chứng minh rằng đường tròn tâm $O$ đường kính $BC$ đi qua $K$ và $H$. b) Chứng minh rằng hai cung nhỏ $BH$ và $CK$ bằng nhau. c) Tính số đo của cung nhỏ $KH$ nếu $∠BAC=40°$.`,
              T`Acute triangle $ABC$ is isosceles at $A$. Draw the altitudes $BH$ and $CK$ from $B$ and $C$. a) Prove that the circle with centre $O$ and {diameter} $BC$ passes through $K$ and $H$. b) Prove that the minor arcs $BH$ and $CK$ are equal. c) Find the measure of the minor arc $KH$ if $∠BAC=40°$.`),
            fig('circ520', '5.20', 'Đường tròn đường kính BC qua K và H', 'The circle with diameter BC through K and H')
          ], [
            p(T`a) Đặt $R=\frac{BC}{2}=OB=OC$; khi đó $(O;\,R)$ là đường tròn đường kính $BC$. $HO$ là đường trung tuyến ứng với cạnh huyền của tam giác vuông $HBC$ nên $OH=\frac{BC}{2}=R$, do đó $H\in(O;\,R)$. Tương tự $K\in(O;\,R)$. Vậy đường tròn $(O;\,R)$ đi qua $K$ và $H$.`,
              T`a) Put $R=\frac{BC}{2}=OB=OC$; then $(O;\,R)$ is the circle with diameter $BC$. $HO$ is the {median} to the hypotenuse of the right triangle $HBC$, so $OH=\frac{BC}{2}=R$ and $H\in(O;\,R)$. Likewise $K\in(O;\,R)$. So the circle $(O;\,R)$ passes through $K$ and $H$.`),
            p(T`b) Hai tam giác vuông $HBC$ và $KCB$ có chung cạnh huyền $BC$ và $∠ABC=∠ACB$ (tam giác $ABC$ cân tại $A$) nên chúng bằng nhau, suy ra $BH=CK$. Do đó $\triangle BOH=\triangle COK$ (vì $BO=CO$, $OH=OK$, $BH=CK$), từ đó $∠BOH=∠COK$. Mặt khác sđ $BH=∠BOH$ và sđ $CK=∠COK$, nên hai cung $BH$ và $CK$ bằng nhau.`,
              T`b) The right triangles $HBC$ and $KCB$ share the hypotenuse $BC$ and $∠ABC=∠ACB$ ($ABC$ is isosceles at $A$), so they are congruent and $BH=CK$. Hence $\triangle BOH=\triangle COK$ (since $BO=CO$, $OH=OK$, $BH=CK$), which gives $∠BOH=∠COK$. As $\text{m}(BH)=∠BOH$ and $\text{m}(CK)=∠COK$, the arcs $BH$ and $CK$ are equal.`),
            p(T`c) Ba tam giác cân $ABC$, $OCH$ và $OBK$ có các góc ở đáy bằng nhau nên ba góc ở đỉnh cũng bằng nhau: $∠BOK=∠HOC=∠BAC=40°$. Mặt khác $∠BOK+∠KOH+∠HOC=∠BOC=180°$, nên $∠KOH=180°-40°-40°=100°$. Vì $∠KOH$ khác góc bẹt nên $KH$ là cung nhỏ, và sđ $KH=∠KOH=100°$.`,
              T`c) The isosceles triangles $ABC$, $OCH$ and $OBK$ have equal base angles, so their apex angles are equal: $∠BOK=∠HOC=∠BAC=40°$. Also $∠BOK+∠KOH+∠HOC=∠BOC=180°$, so $∠KOH=180°-40°-40°=100°$. Since $∠KOH$ is not a straight angle, $KH$ is a minor arc and $\text{m}(KH)=∠KOH=100°$.`)
          ])
        ]
      },
      {
        number: 97,
        blocks: [
          ex(2, [
            p(T`Ta gọi hình giới hạn bởi một cung nhỏ của một đường tròn và dây căng cung đó là *{hình viên phân|circular-segment}*. Lập công thức tính diện tích hình viên phân ứng với cung $90°$, biết bán kính của đường tròn là $R$.`,
              T`The figure bounded by a minor arc of a circle and the chord of that arc is called a *{circular segment|circular-segment}*. Find a formula for the area of the segment belonging to a $90°$ arc, given that the radius of the circle is $R$.`),
            fig('seg521', '5.21', 'Hình viên phân ứng với cung 90°', 'The circular segment of a 90° arc')
          ], [
            p(T`Giả sử $AB$ là cung có số đo $90°$; $S$ là diện tích hình viên phân (phần tô màu), $S_q$ là diện tích hình quạt ứng với cung đó và $S_t$ là diện tích tam giác $OAB$. Ta có:`,
              T`Let $AB$ be the $90°$ arc; $S$ the area of the segment (shaded), $S_q$ the area of the sector for that arc, and $S_t$ the area of triangle $OAB$. Then:`),
            m(T`S_q=\frac{90}{360}\pi R^2=\frac{1}{4}\pi R^2,\qquad S_t=\frac{1}{2}OA\cdot OB=\frac{1}{2}R^2`),
            m(T`S=S_q-S_t=\frac{1}{4}\pi R^2-\frac{1}{2}R^2=R^2\left(\frac{\pi}{4}-\frac{1}{2}\right)`)
          ]),
          head('practice', 'Bài tập', 'Exercises'),
          bt('5.14', T`Cho dây $AB$ không qua tâm của đường tròn $(O)$. Gọi $A'$ và $B'$ là hai điểm lần lượt đối xứng với $A$ và $B$ qua $O$. Hỏi đường trung trực của $A'B'$ có phải là trục đối xứng của $(O)$ hay không? Tại sao?`,
            T`A chord $AB$ of the circle $(O)$ does not pass through the centre. Let $A'$ and $B'$ be the points symmetric to $A$ and $B$ about $O$. Is the {perpendicular bisector|perpendicular-bisector} of $A'B'$ an axis of symmetry of $(O)$? Why?`),
          bt('5.15', T`Cho tam giác $ABC$ không là tam giác vuông. Gọi $H$ và $K$ là chân các đường vuông góc lần lượt hạ từ $B$ và $C$ xuống $AC$ và $AB$. Chứng minh rằng: a) Đường tròn đường kính $BC$ đi qua các điểm $H$ và $K$; b) $KH<BC$.`,
            T`Triangle $ABC$ is not right-angled. Let $H$ and $K$ be the feet of the perpendiculars from $B$ and $C$ to $AC$ and $AB$. Prove that: a) the circle with diameter $BC$ passes through $H$ and $K$; b) $KH<BC$.`),
          bt('5.16', T`Có thể xem *guồng nước* (còn gọi là *cọn nước*) là một công cụ hay cỗ máy có dạng hình tròn, quay được nhờ sức nước chảy (H.5.22a). Guồng nước thường thấy ở các vùng miền núi; nhiều guồng nước được làm bằng tre, dùng để đưa nước lên ruộng cao, giã gạo hoặc làm một số việc khác. Giả sử ngấn nước ngăn cách giữa phần trên và phần dưới nước của một guồng nước được biểu thị bởi cung ứng với một dây dài 4 m và điểm ngập sâu nhất là 0,5 m (trên Hình 5.22b, $AB=4$ m và $HC=0{,}5$ m). Dựa vào đó, em hãy tính bán kính của guồng nước.`,
            T`A *water wheel* is a round device or machine turned by flowing water (Fig. 5.22a). Water wheels are common in mountain regions; many are made of bamboo and used to lift water to high fields, pound rice and do other jobs. Suppose the water line separating the part of the wheel above and below water is an arc with a {chord} 4 m long, and the deepest submerged point is 0.5 m deep (in Fig. 5.22b, $AB=4$ m and $HC=0.5$ m). Find the radius of the wheel.`),
          fig('wheel522', '5.22', 'Guồng nước: dây AB và điểm ngập sâu nhất C', 'A water wheel: chord AB and the deepest point C'),
          tip({
            vi: T`**Gợi ý cho 5.16.** $O$, $H$, $C$ thẳng hàng, $OH=R-0{,}5$ và $AH=2$. Từ tam giác $OHA$ vuông: $R^2=2^2+(R-0{,}5)^2$, suy ra $R=4{,}25$ m.`,
            en: T`**Hint for 5.16.** $O$, $H$, $C$ are collinear, $OH=R-0.5$ and $AH=2$. From right triangle $OHA$: $R^2=2^2+(R-0.5)^2$, so $R=4.25$ m.`
          })
        ]
      },
      {
        number: 98,
        blocks: [
          bt('5.17', T`Cho đường tròn $(O;\,5\text{ cm})$. a) Hãy nêu cách vẽ dây $AB$ sao cho khoảng cách từ điểm $O$ đến dây $AB$ bằng 2,5 cm. b) Tính độ dài của dây $AB$ trong câu a (làm tròn đến hàng phần trăm). c) Tính số đo và độ dài của cung nhỏ $AB$. d) Tính diện tích hình quạt tròn ứng với cung nhỏ $AB$.`,
            T`Take the circle $(O;\,5\text{ cm})$. a) Describe how to draw a {chord} $AB$ whose distance from $O$ is 2.5 cm. b) Find the length of $AB$ in part a (to two decimal places). c) Find the measure and the length of the minor arc $AB$. d) Find the area of the {sector} belonging to the minor arc $AB$.`),
          bt('5.18', T`Ba bộ phận truyền chuyển động của một chiếc xe đạp gồm một giò đĩa (bánh răng gắn với bàn đạp), một chiếc líp (cũng có dạng bánh răng) gắn với bánh xe và bộ xích (H.5.23). Biết rằng giò đĩa có bán kính 15 cm, líp có bán kính 4 cm và bánh xe có đường kính 65 cm. Hỏi khi người đi xe đạp một vòng thì xe chạy được quãng đường dài bao nhiêu mét (làm tròn đến hàng phần chục)?`,
            T`The three parts that transmit motion on a bicycle are the chainring (a gear joined to the pedals), the rear sprocket (also a gear) joined to the wheel, and the chain (Fig. 5.23). The chainring has radius 15 cm, the sprocket radius 4 cm, and the wheel diameter 65 cm. How many metres does the bicycle travel in one full pedal turn (to one decimal place)?`),
          bt('5.19', T`Cho tam giác đều $ABC$ có $AB=2\sqrt{3}$ cm. Nửa đường tròn đường kính $BC$ cắt hai cạnh $AB$ và $AC$ lần lượt tại $D$ và $E$ (khác $B$ và $C$) (H.5.24). a) Chứng tỏ rằng ba cung nhỏ $BD$, $DE$ và $EC$ bằng nhau. Tính số đo mỗi cung ấy. b) Tính diện tích của hình viên phân (xem Ví dụ 2) giới hạn bởi dây $BD$ và cung nhỏ $BD$.`,
            T`Equilateral triangle $ABC$ has $AB=2\sqrt{3}$ cm. The semicircle with {diameter} $BC$ meets sides $AB$ and $AC$ at $D$ and $E$ (other than $B$, $C$) (Fig. 5.24). a) Show that the three minor arcs $BD$, $DE$ and $EC$ are equal and find the measure of each. b) Find the area of the {circular segment|circular-segment} bounded by the chord $BD$ and the minor arc $BD$ (see Example 2).`),
          tip({
            vi: T`**Gợi ý.** 5.18: líp quay $\frac{15}{4}$ vòng khi giò đĩa quay 1 vòng nên xe đi được $\frac{15}{4}\cdot\pi\cdot 0{,}65\approx 7{,}7$ m. 5.19: mỗi cung bằng $60°$; hình viên phân có diện tích $\frac{60}{360}\pi R^2-\frac{\sqrt{3}}{4}R^2$ với $R=\sqrt{3}$ cm.`,
            en: T`**Hints.** 5.18: the sprocket turns $\frac{15}{4}$ times per pedal turn, so the bike travels $\frac{15}{4}\cdot\pi\cdot 0.65\approx 7.7$ m. 5.19: each arc is $60°$; the segment's area is $\frac{60}{360}\pi R^2-\frac{\sqrt{3}}{4}R^2$ with $R=\sqrt{3}$ cm.`
          })
        ]
      }
    ]
  };
})();
