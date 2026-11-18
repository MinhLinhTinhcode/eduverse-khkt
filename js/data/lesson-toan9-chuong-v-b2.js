/* ==========================================================================
   TOÁN 9 (TẬP MỘT) — CHƯƠNG V: ĐƯỜNG TRÒN  (tiếp theo)
   --------------------------------------------------------------------------
   Các bài trong file này (mỗi bài một mục trong TEXTBOOK.lessons):

     'toan9-bai16'  Bài 16. Vị trí tương đối của đường thẳng và đường tròn  (tr. 99–103)
     'toan9-bai17'  Bài 17. Vị trí tương đối của hai đường tròn             (tr. 104–107)

   Lời văn được biên soạn lại, không chép nguyên văn sách giáo khoa.
   Số liệu của các ví dụ, bài tập giữ nguyên để kiểm tra được kết quả.

   QUY ƯỚC (giống các file trước)
   • Chuỗi dùng T`...` (String.raw); công thức trong $...$.
   • Thuật ngữ tiếng Anh viết {tangent line|tangent-line}: phần trước dấu | là chữ hiển thị,
     phần sau là khoá trong glossary. App đổi thành
       <span class="vocab" data-key="tangent-line">…</span>
     (gạch chân nét đứt, bấm để xem IPA, nghĩa, ví dụ, nghe phát âm).
     Dòng tiếng Việt KHÔNG chứa thẻ này (hàm sv() bỏ thẻ nếu có).
   • Hình vẽ: { t: 'fig', art: 'line526', no: '5.26', … } — hàm vẽ nằm trong js/illustrations-hinh3.js.
   • Bảng song ngữ: { t: 'table', head: true, rows: [[{vi,en}, …], …] } — mỗi ô là {vi, en}.
   ========================================================================== */
(function () {
  'use strict';

  const D = (window.TEXTBOOK = window.TEXTBOOK || {});
  D.lessons = D.lessons || {};
  D.glossary = D.glossary || {};

  const T = String.raw;
  const g = (word, ipa, pos, vi, ctx, exEn, exVi) => ({ word, ipa, pos, vi, ctx, ex: { en: exEn, vi: exVi } });

  /* ------------------------------------------------------------------------
     TỪ ĐIỂN (khoá mới, không trùng 'tangent' của lượng giác)
     ------------------------------------------------------------------------ */
  Object.assign(D.glossary, {
    'relative-position': g('relative position', '/ˈrel.ə.tɪv pəˈzɪʃ.ən/', 'n', 'vị trí tương đối',
      'Trong Toán: Cách hai hình đặt đối với nhau, xét theo số điểm chung (ví dụ: đường thẳng và đường tròn cắt nhau, tiếp xúc hay không giao nhau).',
      'There are three relative positions of a line and a circle.', 'Đường thẳng và đường tròn có ba vị trí tương đối.'),
    intersecting: g('intersecting', '/ˌɪn.təˈsek.tɪŋ/', 'adj', 'cắt nhau',
      'Trong Toán: Hai hình có đúng hai điểm chung (đường thẳng và đường tròn), hoặc hai đường tròn có đúng hai giao điểm.',
      'A line is intersecting a circle if they have exactly two common points.', 'Đường thẳng cắt đường tròn khi chúng có đúng hai điểm chung.'),
    secant: g('secant', '/ˈsiː.kənt/', 'n', 'cát tuyến (đường thẳng cắt đường tròn)',
      'Trong Toán: Đường thẳng cắt đường tròn tại hai điểm phân biệt.',
      'The line a is a secant of the circle (O).', 'Đường thẳng a là một cát tuyến của đường tròn (O).'),
    'tangent-line': g('tangent line', '/ˈtæn.dʒənt laɪn/', 'n', 'tiếp tuyến',
      'Trong Toán: Đường thẳng chỉ có một điểm chung với đường tròn; nó vuông góc với bán kính tại tiếp điểm. (Không nhầm với tang trong lượng giác.)',
      'The tangent line at H is perpendicular to the radius OH.', 'Tiếp tuyến tại H vuông góc với bán kính OH.'),
    'point-of-tangency': g('point of tangency', '/pɔɪnt əv ˈtæn.dʒən.si/', 'n', 'tiếp điểm',
      'Trong Toán: Điểm chung duy nhất của đường thẳng (hoặc đường tròn) với đường tròn mà nó tiếp xúc.',
      'H is the point of tangency of the line a and the circle.', 'H là tiếp điểm của đường thẳng a và đường tròn.'),
    disjoint: g('disjoint', '/dɪsˈdʒɔɪnt/', 'adj', 'không giao nhau',
      'Trong Toán: Hai hình không có điểm chung nào.',
      'The line and the circle are disjoint when d is greater than R.', 'Đường thẳng và đường tròn không giao nhau khi d lớn hơn R.'),
    'common-point': g('common point', '/ˈkɒm.ən pɔɪnt/', 'n', 'điểm chung',
      'Trong Toán: Điểm thuộc cả hai hình đang xét.',
      'A tangent line has exactly one common point with the circle.', 'Tiếp tuyến có đúng một điểm chung với đường tròn.'),
    'distance-to-line': g('distance from the centre to the line', '/ˈdɪs.təns frəm ðə ˈsen.tər tə ðə laɪn/', 'n', 'khoảng cách từ tâm đến đường thẳng',
      'Trong Toán: Độ dài đoạn vuông góc hạ từ tâm O xuống đường thẳng a; kí hiệu d = OH, với H là chân đường vuông góc.',
      'Let d be the distance from the centre O to the line a.', 'Gọi d là khoảng cách từ tâm O đến đường thẳng a.'),
    'foot-of-perpendicular': g('foot of the perpendicular', '/fʊt əv ðə ˌpɜː.pənˈdɪk.jə.lər/', 'n', 'chân đường vuông góc',
      'Trong Toán: Giao điểm của đường thẳng với đường vuông góc hạ từ một điểm xuống nó.',
      'H is the foot of the perpendicular from O to a.', 'H là chân đường vuông góc hạ từ O xuống a.'),
    'tangent-criterion': g('criterion for a tangent', '/kraɪˈtɪə.ri.ən fɔːr ə ˈtæn.dʒənt/', 'n', 'dấu hiệu nhận biết tiếp tuyến',
      'Trong Toán: Một đường thẳng đi qua điểm trên đường tròn và vuông góc với bán kính tại điểm đó là tiếp tuyến của đường tròn.',
      'Use the criterion for a tangent to show CB is a tangent.', 'Dùng dấu hiệu nhận biết tiếp tuyến để chứng tỏ CB là tiếp tuyến.'),
    'intersecting-tangents': g('intersecting tangents', '/ˌɪn.təˈsek.tɪŋ ˈtæn.dʒənts/', 'n', 'hai tiếp tuyến cắt nhau',
      'Trong Toán: Hai tiếp tuyến của cùng một đường tròn cắt nhau tại một điểm nằm ngoài đường tròn.',
      'The intersecting tangents MA and MB have equal lengths.', 'Hai tiếp tuyến cắt nhau MA và MB có độ dài bằng nhau.'),
    perpendicular: g('perpendicular', '/ˌpɜː.pənˈdɪk.jə.lər/', 'adj', 'vuông góc',
      'Trong Toán: Hai đường thẳng (hoặc đoạn thẳng) tạo với nhau góc 90°; kí hiệu ⊥.',
      'The tangent is perpendicular to the radius at the point of tangency.', 'Tiếp tuyến vuông góc với bán kính tại tiếp điểm.'),
    'angle-bisector': g('angle bisector', '/ˈæŋ.ɡəl baɪˈsek.tər/', 'n', 'tia phân giác của góc',
      'Trong Toán: Tia xuất phát từ đỉnh của góc và chia góc đó thành hai góc bằng nhau.',
      'MO is the angle bisector of angle AMB.', 'MO là tia phân giác của góc AMB.'),
    equidistant: g('equidistant', '/ˌiː.kwɪˈdɪs.tənt/', 'adj', 'cách đều',
      'Trong Toán: Có khoảng cách bằng nhau đến các điểm (hoặc các đường) đã cho.',
      'M is equidistant from the two points of tangency.', 'M cách đều hai tiếp điểm.'),
    'parallel-lines': g('parallel lines', '/ˈpær.ə.lel laɪnz/', 'n', 'đường thẳng song song',
      'Trong Toán: Hai đường thẳng không có điểm chung; khoảng cách giữa chúng luôn không đổi.',
      'Equally spaced parallel lines are drawn on the paper.', 'Trên tờ giấy có vẽ các đường thẳng song song cách đều.'),
    theorem: g('theorem', '/ˈθɪə.rəm/', 'n', 'định lí',
      'Trong Toán: Mệnh đề đã được chứng minh là đúng.',
      'Theorem 2 describes two intersecting tangents.', 'Định lí 2 nói về hai tiếp tuyến cắt nhau.'),
    'intersecting-circles': g('intersecting circles', '/ˌɪn.təˈsek.tɪŋ ˈsɜː.kəlz/', 'n', 'hai đường tròn cắt nhau',
      'Trong Toán: Hai đường tròn có đúng hai điểm chung (hai giao điểm), khi R − R′ < OO′ < R + R′.',
      'Two circles with exactly two common points are intersecting circles.', 'Hai đường tròn có đúng hai điểm chung là hai đường tròn cắt nhau.'),
    'externally-tangent': g('externally tangent', '/ɪkˈstɜː.nəl.i ˈtæn.dʒənt/', 'adj', 'tiếp xúc ngoài',
      'Trong Toán: Hai đường tròn có duy nhất một điểm chung và nằm ở hai phía của tiếp tuyến chung tại điểm đó; OO′ = R + R′.',
      'The two circles are externally tangent because OO′ = R + R′.', 'Hai đường tròn tiếp xúc ngoài vì OO′ = R + R′.'),
    'internally-tangent': g('internally tangent', '/ɪnˈtɜː.nəl.i ˈtæn.dʒənt/', 'adj', 'tiếp xúc trong',
      'Trong Toán: Hai đường tròn có duy nhất một điểm chung và đường tròn nhỏ nằm trong đường tròn lớn; OO′ = R − R′ > 0.',
      'The circles are internally tangent when OO′ = R − R′.', 'Hai đường tròn tiếp xúc trong khi OO′ = R − R′.'),
    'outside-each-other': g('outside each other', '/ˌaʊtˈsaɪd iːtʃ ˈʌð.ər/', 'adj', 'ở ngoài nhau',
      'Trong Toán: Hai đường tròn không có điểm chung và mỗi đường tròn nằm ngoài đường tròn kia; OO′ > R + R′.',
      'Two circles outside each other have no common point.', 'Hai đường tròn ở ngoài nhau không có điểm chung.'),
    'one-inside-the-other': g('one inside the other', '/wʌn ɪnˈsaɪd ði ˈʌð.ər/', 'adj', 'đựng nhau',
      'Trong Toán: Hai đường tròn không có điểm chung và đường tròn này nằm trong đường tròn kia; OO′ < R − R′ (đường tròn lớn đựng đường tròn nhỏ).',
      'The circle (O) contains the circle (O′) when OO′ < R − R′.', 'Đường tròn (O) đựng đường tròn (O′) khi OO′ < R − R′.'),
    collinear: g('collinear', '/kəˈlɪn.i.ər/', 'adj', 'thẳng hàng',
      'Trong Toán: Nằm trên cùng một đường thẳng.',
      'The point of tangency is collinear with the two centres.', 'Tiếp điểm thẳng hàng với hai tâm.')
  });

  /* ------------------------------------------------------------------------
     HÀM TIỆN ÍCH
     ------------------------------------------------------------------------ */
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
  const c = (vi, en) => ({ vi: sv(vi), en });   /* ô bảng song ngữ */

  const topic = { label: 'Chương', labelEn: 'Chapter', number: 'V', vi: 'Đường tròn', en: 'Circles' };

  /* ========================================================================
     BÀI 16. VỊ TRÍ TƯƠNG ĐỐI CỦA ĐƯỜNG THẲNG VÀ ĐƯỜNG TRÒN
     ======================================================================== */
  D.lessons['toan9-bai16'] = {
    gradeId: 9,
    number: '16',
    book: 'Toán 9',
    title: { vi: 'Vị trí tương đối của đường thẳng và đường tròn', en: 'Relative positions of a line and a circle' },
    topic,
    spreadLabels: ['Ba vị trí tương đối', 'Dấu hiệu nhận biết tiếp tuyến', 'Hai tiếp tuyến cắt nhau, bài tập'],
    pages: [
      /* ----------------------------------------------------------- Trang 99 */
      {
        number: 99,
        blocks: [
          { t: 'banner' },
          goals(
            it(T`Mô tả và vẽ ba {vị trí tương đối|relative-position} của đường thẳng và đường tròn: cắt nhau, tiếp xúc nhau, không giao nhau.`,
              T`Describe and draw the three {relative positions|relative-position} of a line and a circle: {intersecting}, tangent and {disjoint}.`),
            it(T`Nhận biết {tiếp tuyến|tangent-line} của đường tròn bằng định nghĩa hoặc dấu hiệu nhận biết.`,
              T`Recognise a {tangent line|tangent-line} of a circle from the definition or from the {criterion for a tangent|tangent-criterion}.`),
            it(T`Dùng tính chất của {hai tiếp tuyến cắt nhau|intersecting-tangents} để giải toán.`,
              T`Use the properties of {intersecting tangents|intersecting-tangents} to solve problems.`)
          ),
          p(T`**Tình huống mở đầu.** Người ta gieo một đồng xu hình tròn, bán kính 1 cm, lên tờ giấy phẳng có vẽ những {đường thẳng song song|parallel-lines} cách đều, khoảng cách giữa hai đường kề nhau luôn bằng 2 cm. Có thể xảy ra những trường hợp nào? a) Đồng xu đè lên một đường thẳng (che khuất một phần của nó); b) đồng xu không đè lên đường thẳng nào; c) đồng xu đè lên nhiều hơn một đường thẳng. Vì sao?`,
            T`**Opening problem.** A round coin of radius 1 cm is tossed on a flat sheet of paper with equally spaced {parallel lines|parallel-lines}; neighbouring lines are always 2 cm apart. Which cases can happen? a) The coin covers part of one line; b) the coin covers no line; c) the coin covers more than one line. Why?`),
          h2('1', 'Vị trí tương đối của đường thẳng và đường tròn', 'Relative positions of a line and a circle'),
          h3('Số điểm chung của đường thẳng và đường tròn', 'Number of common points of a line and a circle'),
          act('1', { vi: 'Đường thẳng a và điểm O', en: 'A line a and a point O' },
            T`Cho đường thẳng $a$ và điểm $O$. Gọi $H$ là {chân đường vuông góc|foot-of-perpendicular} hạ từ $O$ xuống $a$, và $A$ là một điểm thuộc tia $OH$. Trong mỗi trường hợp sau, hãy vẽ đường tròn $(O;\,OA)$ và cho biết đường thẳng $a$ và đường tròn đó có bao nhiêu {điểm chung|common-point}.`,
            T`Given a line $a$ and a point $O$, let $H$ be the {foot of the perpendicular|foot-of-perpendicular} from $O$ to $a$ and $A$ a point on ray $OH$. In each case below, draw the circle $(O;\,OA)$ and say how many {common points|common-point} it has with $a$.`,
            [
              it(T`$OH<OA$;`, T`$OH<OA$;`),
              it(T`$OH=OA$ (khi đó $A$ trùng $H$);`, T`$OH=OA$ (then $A$ coincides with $H$);`),
              it(T`$OH>OA$.`, T`$OH>OA$.`)
            ]),
          tip({
            vi: T`**Gợi ý.** Điểm của đường thẳng $a$ nằm trên đường tròn $(O;\,OA)$ khi và chỉ khi nó cách $O$ đúng một khoảng bằng $OA$. Hãy so sánh $OA$ với khoảng cách ngắn nhất từ $O$ đến $a$, tức là $OH$.`,
            en: T`**Hint.** A point of $a$ lies on $(O;\,OA)$ exactly when its distance from $O$ equals $OA$. Compare $OA$ with the shortest distance from $O$ to $a$, which is $OH$.`
          })
        ]
      },

      /* ---------------------------------------------------------- Trang 100 */
      {
        number: 100,
        blocks: [
          key([
            p(T`**1)** Đường thẳng $a$ và đường tròn $(O)$ gọi là *cắt nhau* nếu chúng có đúng hai điểm chung (H.5.26a). Khi đó $a$ còn gọi là một {cát tuyến|secant} của $(O)$.`,
              T`**1)** A line $a$ and a circle $(O)$ are *{intersecting|intersecting}* if they have exactly two common points (Fig. 5.26a). Then $a$ is also called a {secant} of $(O)$.`),
            p(T`**2)** Đường thẳng $a$ và đường tròn $(O)$ gọi là *tiếp xúc với nhau* nếu chúng có duy nhất một điểm chung $H$. Điểm chung ấy gọi là **{tiếp điểm|point-of-tangency}**. Khi đó, đường thẳng $a$ còn gọi là **{tiếp tuyến|tangent-line}** của đường tròn $(O)$ tại $H$ (H.5.26b).`,
              T`**2)** A line $a$ and a circle $(O)$ are *tangent to each other* if they have exactly one common point $H$. That point is the **{point of tangency|point-of-tangency}**. The line $a$ is then called a **{tangent line|tangent-line}** of the circle $(O)$ at $H$ (Fig. 5.26b).`),
            p(T`**3)** Đường thẳng $a$ và đường tròn $(O)$ gọi là *không giao nhau* nếu chúng không có điểm chung (H.5.26c).`,
              T`**3)** A line $a$ and a circle $(O)$ are *{disjoint|disjoint}* (non-intersecting) if they have no common point (Fig. 5.26c).`)
          ], { vi: 'Ba vị trí tương đối', en: 'The three relative positions' }),
          h3('Nhận xét', 'Remarks'),
          p(T`**1)** Cho đường thẳng $a$ và đường tròn $(O;\,R)$. Gọi $d$ là khoảng cách từ tâm $O$ đến đường thẳng $a$. Từ Hoạt động 1 ta thấy:`,
            T`**1)** Let $a$ be a line and $(O;\,R)$ a circle. Let $d$ be the {distance from the centre|distance-to-line} $O$ to the line $a$. From Activity 1 we see:`),
          key([
            { t: 'table', head: true, rows: [
              [c('Vị trí tương đối', 'Relative position'), c('Hệ thức giữa $d$ và $R$', 'Relation between $d$ and $R$'), c('Số điểm chung', 'Common points')],
              [c('Đường thẳng cắt đường tròn', 'The line {intersects|intersecting} the circle'), c('$d<R$ (H.5.26a)', '$d<R$ (Fig. 5.26a)'), c('2', '2')],
              [c('Đường thẳng tiếp xúc đường tròn', 'The line is {tangent|tangent-line} to the circle'), c('$d=R$ (H.5.26b)', '$d=R$ (Fig. 5.26b)'), c('1', '1')],
              [c('Đường thẳng và đường tròn không giao nhau', 'The line and circle are {disjoint|disjoint}'), c('$d>R$ (H.5.26c)', '$d>R$ (Fig. 5.26c)'), c('0', '0')]
            ] }
          ], { vi: 'Số điểm chung và khoảng cách $d$', en: 'Common points and the distance $d$' }),
          fig('line526', '5.26', 'Ba vị trí tương đối của đường thẳng a và đường tròn (O; R)', 'The three relative positions of a line a and a circle (O; R)'),
          p(T`**2)** Nếu đường thẳng $a$ tiếp xúc với đường tròn $(O)$ tại $H$ thì $OH$ ⊥ $a$ — tiếp tuyến vuông góc với bán kính đi qua tiếp điểm.`,
            T`**2)** If a line $a$ is tangent to the circle $(O)$ at $H$, then $OH$ ⊥ $a$: a tangent is {perpendicular|perpendicular} to the radius through the point of tangency.`),
          lt(1, [
            p(T`Cho đường thẳng $a$ và điểm $O$ cách $a$ một khoảng bằng 4 cm. Không vẽ hình, hãy dự đoán mỗi đường tròn sau cắt, tiếp xúc hay không cắt đường thẳng $a$. Tại sao? a) $(O;\,3\text{ cm})$; b) $(O;\,5\text{ cm})$; c) $(O;\,4\text{ cm})$.`,
              T`A line $a$ and a point $O$ are 4 cm apart. Without drawing, predict whether each circle intersects, touches or misses the line $a$. Why? a) $(O;\,3\text{ cm})$; b) $(O;\,5\text{ cm})$; c) $(O;\,4\text{ cm})$.`)
          ]),
          h2('2', 'Dấu hiệu nhận biết tiếp tuyến của đường tròn', 'Recognising a tangent of a circle'),
          h3('Đường thẳng và đường tròn tiếp xúc nhau khi nào?', 'When are a line and a circle tangent?'),
          act('2', { vi: 'Đoạn OH và đường thẳng a', en: 'Segment OH and the line a' },
            T`Cho đoạn thẳng $OH$ và đường thẳng $a$ vuông góc với $OH$ tại $H$.`,
            T`Given a segment $OH$ and a line $a$ perpendicular to $OH$ at $H$.`,
            [
              it(T`Xác định khoảng cách từ $O$ đến đường thẳng $a$.`, T`Find the distance from $O$ to the line $a$.`),
              it(T`Nếu vẽ đường tròn $(O;\,OH)$ thì đường tròn này và đường thẳng $a$ có vị trí tương đối như thế nào?`, T`If you draw the circle $(O;\,OH)$, what is its relative position to $a$?`)
            ]),
          key([
            p(T`**Định lí 1** (dấu hiệu nhận biết tiếp tuyến). Nếu một đường thẳng đi qua một điểm nằm trên một đường tròn và vuông góc với bán kính đi qua điểm đó thì đường thẳng ấy là một tiếp tuyến của đường tròn.`,
              T`**Theorem 1** (criterion for a tangent). If a line passes through a point of a circle and is {perpendicular|perpendicular} to the radius through that point, then the line is a {tangent|tangent-line} of the circle.`)
          ], { vi: 'Dấu hiệu nhận biết tiếp tuyến', en: 'Criterion for a tangent' })
        ]
      },

      /* ---------------------------------------------------------- Trang 101 */
      {
        number: 101,
        blocks: [
          ex(1, [
            p(T`Cho $AB$ là một dây không đi qua tâm của đường tròn $(O)$. Đường thẳng qua $O$ và vuông góc với $AB$ cắt tiếp tuyến tại $A$ của $(O)$ ở điểm $C$. Chứng minh rằng $CB$ là một tiếp tuyến của $(O)$.`,
              T`Let $AB$ be a chord of the circle $(O)$ not through the centre. The line through $O$ perpendicular to $AB$ meets the tangent at $A$ at a point $C$. Prove that $CB$ is a tangent of $(O)$.`),
            fig('tang527', '5.27', 'CA là tiếp tuyến thì CB cũng là tiếp tuyến', 'If CA is tangent, then CB is tangent too')
          ], [
            p(T`Gọi $D$ là giao điểm của $AB$ và $OC$.`, T`Let $D$ be the intersection of $AB$ and $OC$.`),
            p(T`Trong tam giác cân $AOB$ ($OA=OB$), đường cao $OD$ (vì $OC$ ⊥ $AB$) cũng là đường phân giác của góc $O$, suy ra $∠O_1=∠O_2$.`,
              T`In the {isosceles triangle|isosceles-triangle} $AOB$ ($OA=OB$) the altitude $OD$ (since $OC$ ⊥ $AB$) is also the {angle bisector|angle-bisector} at $O$, so $∠O_1=∠O_2$.`),
            p(T`Ta có $△AOC=△BOC$ (c.g.c), vì $OC$ là cạnh chung, $∠O_1=∠O_2$ và $OA=OB$.`,
              T`Then $△AOC=△BOC$ (SAS), because $OC$ is common, $∠O_1=∠O_2$ and $OA=OB$.`),
            p(T`Từ đó $∠OBC=∠OAC=90°$ (do $CA$ là tiếp tuyến), tức là $CB$ vuông góc với bán kính $OB$ tại $B$. Theo Định lí 1, $CB$ cũng là tiếp tuyến của $(O)$.`,
              T`Hence $∠OBC=∠OAC=90°$ (as $CA$ is a tangent), i.e. $CB$ is perpendicular to the radius $OB$ at $B$. By Theorem 1, $CB$ is also a tangent of $(O)$.`)
          ]),
          lt(2, [
            p(T`Cho một hình vuông có độ dài mỗi cạnh bằng 6 cm và hai đường chéo cắt nhau tại $I$. Chứng minh rằng đường tròn $(I;\,3\text{ cm})$ tiếp xúc với cả bốn cạnh của hình vuông.`,
              T`A square has side 6 cm and its diagonals meet at $I$. Prove that the circle $(I;\,3\text{ cm})$ is tangent to all four sides of the square.`)
          ]),
          tip({
            vi: T`**Thực hành.** Cho đường thẳng $a$ và điểm $M$ không thuộc $a$. Hãy vẽ đường tròn tâm $M$ tiếp xúc với $a$.`,
            en: T`**Practice.** Given a line $a$ and a point $M$ not on $a$, draw the circle with centre $M$ that is tangent to $a$.`
          }),
          vd(1, [
            p(T`Trở lại tình huống mở đầu: đồng xu đè lên một đường thẳng khi đường tròn (viền ngoài của đồng xu) và đường thẳng ấy cắt nhau. Bằng cách xét vị trí của tâm đồng xu trong một dải nằm giữa hai đường thẳng song song cạnh nhau, hãy chứng minh rằng chỉ xảy ra các trường hợp a và b, không thể xảy ra trường hợp c.`,
              T`Back to the opening problem: the coin covers a line when its rim (a circle) and the line are {intersecting|intersecting}. By considering where the coin's centre lies in the strip between two neighbouring parallel lines, show that only cases a and b can occur, never case c.`)
          ]),
          h2('3', 'Hai tiếp tuyến cắt nhau của một đường tròn', 'Two intersecting tangents of a circle'),
          h3('Tính chất của hai tiếp tuyến cắt nhau', 'Properties of two intersecting tangents'),
          act('3', { vi: 'Dựng hai tiếp tuyến từ điểm M', en: 'Drawing two tangents from a point M' },
            T`Cho điểm $M$ ở bên ngoài một đường tròn tâm $O$. Dùng thước và compa thực hiện các bước sau:`,
            T`Let $M$ be a point outside a circle with centre $O$. Use a ruler and compass:`,
            [
              it(T`Vẽ đường tròn đường kính $MO$, cắt đường tròn $(O)$ tại $A$ và $B$.`, T`Draw the circle with diameter $MO$; it meets the circle $(O)$ at $A$ and $B$.`),
              it(T`Vẽ và chứng tỏ các đường thẳng $MA$, $MB$ là hai tiếp tuyến của $(O)$.`, T`Draw the lines $MA$, $MB$ and show they are tangents of $(O)$.`)
            ]),
          p(T`$MA$ và $MB$ gọi là *hai tiếp tuyến cắt nhau* của đường tròn $(O)$.`,
            T`$MA$ and $MB$ are called two *{intersecting tangents|intersecting-tangents}* of the circle $(O)$.`)
        ]
      },

      /* ---------------------------------------------------------- Trang 102 */
      {
        number: 102,
        blocks: [
          act('4', { vi: 'Hai tam giác OMA và OMB', en: 'Triangles OMA and OMB' },
            T`Dựa vào hình vẽ có được sau Hoạt động 3 và xét hai tam giác $OMA$, $OMB$, hãy chứng minh:`,
            T`Using the figure from Activity 3 and the triangles $OMA$, $OMB$, prove that:`,
            [
              it(T`$MA=MB$;`, T`$MA=MB$;`),
              it(T`$MO$ là tia phân giác của góc $AMB$;`, T`$MO$ is the {angle bisector|angle-bisector} of angle $AMB$;`),
              it(T`$OM$ là tia phân giác của góc $AOB$.`, T`$OM$ is the angle bisector of angle $AOB$.`)
            ]),
          key([
            p(T`**Định lí 2.** Nếu hai tiếp tuyến của đường tròn $(O)$ cắt nhau tại điểm $M$ thì:`,
              T`**Theorem 2.** If two tangents of the circle $(O)$ meet at a point $M$, then:`),
            p(T`• điểm $M$ cách đều hai tiếp điểm: $MA=MB$;`, T`• $M$ is {equidistant|equidistant} from the two points of tangency: $MA=MB$;`),
            p(T`• $MO$ là tia phân giác của góc tạo bởi hai tiếp tuyến: $∠AMO=∠BMO$;`, T`• $MO$ bisects the angle between the two tangents: $∠AMO=∠BMO$;`),
            p(T`• $OM$ là tia phân giác của góc tạo bởi hai bán kính qua hai tiếp điểm: $∠AOM=∠BOM$.`, T`• $OM$ bisects the angle between the two radii to the points of tangency: $∠AOM=∠BOM$.`)
          ], { vi: 'Tính chất của hai tiếp tuyến cắt nhau', en: 'Property of intersecting tangents' }),
          fig('tang528', '5.28', 'Hai tiếp tuyến MA, MB cắt nhau tại M', 'Two tangents MA and MB meeting at M'),
          ex(2, [
            p(T`Cho hai tiếp tuyến $MA$ và $MB$ của đường tròn $(O;\,R)$ ($A$ và $B$ là hai tiếp điểm). a) Chứng minh rằng $OM$ ⊥ $AB$. b) Tính $MA$ và $MB$, biết $R=2$ cm và $MO=4$ cm.`,
              T`$MA$ and $MB$ are tangents of the circle $(O;\,R)$ with points of tangency $A$ and $B$. a) Prove that $OM$ ⊥ $AB$. b) Find $MA$ and $MB$ if $R=2$ cm and $MO=4$ cm.`),
            fig('tang529', '5.29', 'Ví dụ 2: R = 2 cm, MO = 4 cm', 'Example 2: R = 2 cm, MO = 4 cm')
          ], [
            p(T`a) $MA$ và $MB$ là hai tiếp tuyến cắt nhau của $(O)$ nên theo Định lí 2, $OM$ là tia phân giác của góc $AOB$. Trong tam giác cân $AOB$ ($OA=OB$), đường phân giác $OM$ cũng là đường cao, nên $OM$ ⊥ $AB$.`,
              T`a) By Theorem 2, $OM$ bisects the angle $AOB$. In the isosceles triangle $AOB$ ($OA=OB$) the bisector $OM$ is also the altitude, so $OM$ ⊥ $AB$.`),
            p(T`b) Tam giác $OAM$ vuông tại $A$ (vì $MA$ tiếp xúc với $(O)$ tại $A$), $OA=R=2$ cm, $OM=4$ cm. Theo {định lí Pythagore|pythagorean-theorem}: $AM^2+OA^2=OM^2$, suy ra`,
              T`b) Triangle $OAM$ has a right angle at $A$ ($MA$ is tangent at $A$), with $OA=R=2$ cm and $OM=4$ cm. By the {Pythagorean theorem|pythagorean-theorem}: $AM^2+OA^2=OM^2$, so`),
            m(T`AM^2=OM^2-OA^2=4^2-2^2=12.`),
            p(T`Vậy $AM=\sqrt{12}=2\sqrt{3}$ (cm). Theo tính chất của hai tiếp tuyến cắt nhau, $BM=AM=2\sqrt{3}$ cm.`,
              T`Hence $AM=\sqrt{12}=2\sqrt{3}$ cm. By the property of intersecting tangents, $BM=AM=2\sqrt{3}$ cm.`)
          ])
        ]
      },

      /* ---------------------------------------------------------- Trang 103 */
      {
        number: 103,
        blocks: [
          tip({
            vi: T`**Thử thách nhỏ.** Cho góc $xMy$ và điểm $A$ thuộc tia $Mx$. Hãy vẽ đường tròn tâm $O$ tiếp xúc với cả hai cạnh của góc $xMy$ sao cho $A$ là một trong hai tiếp điểm.`,
            en: T`**Small challenge.** Given an angle $xMy$ and a point $A$ on ray $Mx$, draw the circle with centre $O$ tangent to both sides of the angle so that $A$ is one of the two points of tangency.`
          }),
          head('practice', 'Bài tập', 'Exercises'),
          bt('5.20', T`Bạn Thanh cắt 4 hình tròn bằng giấy có bán kính lần lượt là 4 cm, 6 cm, 7 cm và 8 cm để dán trang trí lên một mảnh giấy, trên đó có vẽ trước hai đường thẳng song song $a$ và $b$ cách nhau 6 cm. Nếu dán sao cho tâm của cả 4 hình tròn đều nằm trên đường thẳng $b$ thì hình tròn nào che khuất một phần của đường thẳng $a$, hình tròn nào không?`,
            T`Thanh cuts four paper discs of radii 4 cm, 6 cm, 7 cm and 8 cm and glues them on a sheet with two {parallel lines|parallel-lines} $a$ and $b$ that are 6 cm apart. If all four centres lie on the line $b$, which discs cover part of the line $a$ and which do not?`),
          bt('5.21', T`Cho đường tròn $(O)$ đi qua ba đỉnh $A$, $B$, $C$ của một tam giác cân tại $A$. Chứng minh rằng đường thẳng đi qua $A$ và song song với $BC$ là một tiếp tuyến của $(O)$.`,
            T`The circle $(O)$ passes through the vertices $A$, $B$, $C$ of a triangle with $AB=AC$. Prove that the line through $A$ parallel to $BC$ is a tangent of $(O)$.`),
          bt('5.22', T`Cho góc $xOy$ với tia phân giác $Ot$ và điểm $A$ trên cạnh $Ox$, điểm $B$ trên cạnh $Oy$ sao cho $OA=OB$. Đường thẳng qua $A$ vuông góc với $Ox$ cắt $Ot$ tại $M$. Chứng minh rằng $OA$ và $OB$ là hai tiếp tuyến cắt nhau của đường tròn $(M;\,MA)$.`,
            T`Angle $xOy$ has bisector $Ot$; $A$ lies on $Ox$ and $B$ on $Oy$ with $OA=OB$. The line through $A$ perpendicular to $Ox$ meets $Ot$ at $M$. Prove that $OA$ and $OB$ are two intersecting tangents of the circle $(M;\,MA)$.`),
          bt('5.23', T`Cho $SA$ và $SB$ là hai tiếp tuyến cắt nhau của đường tròn $(O)$ ($A$ và $B$ là hai tiếp điểm). Gọi $M$ là một điểm tuỳ ý trên cung nhỏ $AB$. Tiếp tuyến của $(O)$ tại $M$ cắt $SA$ tại $E$ và cắt $SB$ tại $F$. a) Chứng minh rằng chu vi của tam giác $SEF$ bằng $SA+SB$. b) Giả sử $M$ là giao điểm của đoạn $SO$ với đường tròn $(O)$. Chứng minh rằng $SE=SF$.`,
            T`$SA$ and $SB$ are intersecting tangents of $(O)$ with points of tangency $A$, $B$. Let $M$ be any point on the minor arc $AB$. The tangent at $M$ meets $SA$ at $E$ and $SB$ at $F$. a) Prove that the perimeter of triangle $SEF$ equals $SA+SB$. b) Suppose $M$ is the intersection of segment $SO$ with $(O)$. Prove that $SE=SF$.`)
        ]
      }
    ]
  };

  /* ========================================================================
     BÀI 17. VỊ TRÍ TƯƠNG ĐỐI CỦA HAI ĐƯỜNG TRÒN
     ======================================================================== */
  D.lessons['toan9-bai17'] = {
    gradeId: 9,
    number: '17',
    book: 'Toán 9',
    title: { vi: 'Vị trí tương đối của hai đường tròn', en: 'Relative positions of two circles' },
    topic,
    spreadLabels: ['Cắt nhau và tiếp xúc nhau', 'Không giao nhau, bảng tổng kết, bài tập'],
    pages: [
      /* ---------------------------------------------------------- Trang 104 */
      {
        number: 104,
        blocks: [
          { t: 'banner' },
          goals(
            it(T`Nhận biết các {vị trí tương đối|relative-position} của hai đường tròn: {cắt nhau|intersecting-circles}, tiếp xúc nhau, không giao nhau.`,
              T`Recognise the {relative positions|relative-position} of two circles: {intersecting|intersecting-circles}, tangent and {disjoint}.`),
            it(T`Dùng hệ thức giữa $OO'$ với $R$ và $R'$ để xác định vị trí của hai đường tròn.`,
              T`Use the relation between $OO'$, $R$ and $R'$ to decide the position of two circles.`)
          ),
          p(T`**Mở đầu.** Nguyệt thực là hiện tượng Mặt Trăng bị bóng của Trái Đất che khuất toàn bộ (nguyệt thực toàn phần) hay một phần (H.5.30). Vì Mặt Trăng và bóng Trái Đất được xem là có dạng hình tròn nên nguyệt thực cho ta một hình ảnh thực tế về vị trí tương đối của hai đường tròn. Sau đây, khi nói hai đường tròn mà không giải thích gì thêm, ta hiểu đó là *hai đường tròn phân biệt*.`,
            T`**Introduction.** A lunar eclipse happens when the Moon is covered, wholly or partly, by the Earth's shadow (Fig. 5.30). The Moon and the shadow are taken as discs, so an eclipse shows a real picture of the {relative position|relative-position} of two circles. From now on, "two circles" means two *distinct* circles.`),
          h2('1', 'Hai đường tròn cắt nhau', 'Two intersecting circles'),
          h3('Tìm hiểu hai đường tròn cắt nhau', 'Exploring intersecting circles'),
          act('1', { vi: 'Hai đường tròn (O; OA) và (O′; O′A)', en: 'The circles (O; OA) and (O′; O′A)' },
            T`Trong tam giác $OO'A$ (H.5.31), giả sử $O'A<OA$. Theo bất đẳng thức tam giác, $OA-O'A<OO'<OA+O'A$. Hãy vẽ hai đường tròn $(O;\,OA)$ và $(O';\,O'A)$ và cho biết hai đường tròn đó có mấy điểm chung.`,
            T`In triangle $OO'A$ (Fig. 5.31) suppose $O'A<OA$. By the triangle inequality, $OA-O'A<OO'<OA+O'A$. Draw the circles $(O;\,OA)$ and $(O';\,O'A)$ and say how many common points they have.`),
          key([
            p(T`Nếu hai đường tròn có đúng hai điểm chung thì ta nói đó là **{hai đường tròn cắt nhau|intersecting-circles}**. Hai điểm chung gọi là hai *giao điểm* của chúng.`,
              T`If two circles have exactly two common points, they are called **{intersecting circles|intersecting-circles}**. The two common points are their *points of intersection*.`)
          ], { vi: 'Hai đường tròn cắt nhau', en: 'Intersecting circles' }),
          fig('circ532', '5.32', 'Hai đường tròn (O; R) và (O′; R′) cắt nhau tại A và B', 'The circles (O; R) and (O′; R′) intersecting at A and B'),
          h3('Nhận xét', 'Remark'),
          p(T`Từ Hoạt động 1: hai đường tròn $(O;\,R)$ và $(O';\,R')$ cắt nhau khi`,
            T`From Activity 1: the circles $(O;\,R)$ and $(O';\,R')$ {intersect|intersecting-circles} when`),
          m(T`R-R'<OO'<R+R'\quad(R>R').`),
          ex(1, [
            p(T`Cho hai điểm $O$ và $O'$ sao cho $OO'=5$ cm. Hãy giải thích tại sao hai đường tròn $(O;\,4\text{ cm})$ và $(O';\,3\text{ cm})$ cắt nhau.`,
              T`Points $O$ and $O'$ satisfy $OO'=5$ cm. Explain why the circles $(O;\,4\text{ cm})$ and $(O';\,3\text{ cm})$ intersect.`)
          ], [
            p(T`Đặt $R=4$ cm, $R'=3$ cm. Ta thấy $1\text{ cm}<5\text{ cm}<7\text{ cm}$, nên $R-R'<OO'<R+R'$. Do đó hai đường tròn đã cho cắt nhau.`,
              T`Put $R=4$ cm and $R'=3$ cm. Since $1\text{ cm}<5\text{ cm}<7\text{ cm}$, we have $R-R'<OO'<R+R'$, so the two circles intersect.`)
          ])
        ]
      },

      /* ---------------------------------------------------------- Trang 105 */
      {
        number: 105,
        blocks: [
          lt(1, [
            p(T`Cho đường tròn $(O;\,5\text{ cm})$ và điểm $I$ cách $O$ một khoảng 2 cm. Xác định vị trí tương đối của đường tròn đã cho và đường tròn $(I;\,r)$ trong mỗi trường hợp: a) $r=4$ cm; b) $r=6$ cm.`,
              T`A circle $(O;\,5\text{ cm})$ and a point $I$ with $OI=2$ cm are given. Find the relative position of the given circle and the circle $(I;\,r)$ if a) $r=4$ cm; b) $r=6$ cm.`)
          ]),
          h2('2', 'Hai đường tròn tiếp xúc nhau', 'Two tangent circles'),
          h3('Tìm hiểu hai đường tròn tiếp xúc nhau', 'Exploring tangent circles'),
          act('2', { vi: 'Hai trường hợp OO′ = OA + O′A và OO′ = OA − O′A', en: 'The cases OO′ = OA + O′A and OO′ = OA − O′A' },
            T`Trên Hình 5.33a, $OO'=OA+O'A$ (điểm $A$ nằm giữa $O$ và $O'$); trên Hình 5.33b, $OO'=OA-O'A$ (điểm $O'$ nằm giữa $O$ và $A$). Trong mỗi trường hợp, hãy vẽ hai đường tròn $(O;\,OA)$ và $(O';\,O'A)$ và cho biết chúng có mấy điểm chung.`,
            T`In Fig. 5.33a, $OO'=OA+O'A$ ($A$ lies between $O$ and $O'$); in Fig. 5.33b, $OO'=OA-O'A$ ($O'$ lies between $O$ and $A$). In each case draw $(O;\,OA)$ and $(O';\,O'A)$ and say how many common points they have.`),
          key([
            p(T`Nếu hai đường tròn có duy nhất một điểm chung thì ta nói đó là **hai đường tròn tiếp xúc nhau**. Điểm chung gọi là **{tiếp điểm|point-of-tangency}** của chúng.`,
              T`If two circles have exactly one common point, they are **tangent circles**. That point is their **{point of tangency|point-of-tangency}**.`)
          ], { vi: 'Hai đường tròn tiếp xúc nhau', en: 'Tangent circles' }),
          fig('circ534', '5.34', 'Tiếp xúc ngoài (a) và tiếp xúc trong (b)', 'Externally tangent (a) and internally tangent (b) circles'),
          tip({
            vi: T`**Chú ý.** Người ta còn phân biệt hai trường hợp: hai đường tròn *tiếp xúc ngoài* (H.5.34a) và hai đường tròn *tiếp xúc trong* (H.5.34b).`,
            en: T`**Note.** Two cases are distinguished: circles that are {externally tangent|externally-tangent} (Fig. 5.34a) and circles that are {internally tangent|internally-tangent} (Fig. 5.34b).`
          }),
          h3('Nhận xét', 'Remarks'),
          p(T`**1)** Từ Hoạt động 2: hai đường tròn $(O;\,R)$ và $(O';\,R')$ tiếp xúc ngoài khi $OO'=R+R'$, và tiếp xúc trong khi $OO'=R-R'$ ($R>R'$).`,
            T`**1)** From Activity 2: the circles $(O;\,R)$ and $(O';\,R')$ are externally tangent when $OO'=R+R'$ and internally tangent when $OO'=R-R'$ ($R>R'$).`),
          p(T`**2)** Nếu hai đường tròn tiếp xúc nhau thì tiếp điểm thẳng hàng với hai tâm.`,
            T`**2)** If two circles are tangent, the point of tangency is {collinear|collinear} with the two centres.`),
          ex(2, [
            p(T`Cho hai điểm $O$ và $O'$ sao cho $OO'=5$ cm. Giải thích tại sao hai đường tròn $(O;\,3\text{ cm})$ và $(O';\,2\text{ cm})$ tiếp xúc với nhau. Chúng tiếp xúc trong hay tiếp xúc ngoài?`,
              T`Points $O$, $O'$ satisfy $OO'=5$ cm. Explain why the circles $(O;\,3\text{ cm})$ and $(O';\,2\text{ cm})$ are tangent. Are they internally or externally tangent?`)
          ], [
            p(T`Đặt $R=3$ cm và $R'=2$ cm, ta thấy $5=3+2$, nghĩa là $OO'=R+R'$. Vậy hai đường tròn đã cho tiếp xúc ngoài với nhau.`,
              T`Put $R=3$ cm and $R'=2$ cm. Then $5=3+2$, i.e. $OO'=R+R'$, so the two circles are externally tangent.`)
          ]),
          lt(2, [
            p(T`Cho hai điểm $O$ và $O'$ sao cho $OO'=3$ cm. Giải thích tại sao hai đường tròn $(O;\,8\text{ cm})$ và $(O';\,5\text{ cm})$ tiếp xúc với nhau. Chúng tiếp xúc trong hay tiếp xúc ngoài?`,
              T`Points $O$, $O'$ satisfy $OO'=3$ cm. Explain why the circles $(O;\,8\text{ cm})$ and $(O';\,5\text{ cm})$ are tangent. Internally or externally?`)
          ])
        ]
      },

      /* ---------------------------------------------------------- Trang 106 */
      {
        number: 106,
        blocks: [
          h2('3', 'Hai đường tròn không giao nhau', 'Two disjoint circles'),
          h3('Tìm hiểu hai đường tròn không giao nhau', 'Exploring disjoint circles'),
          act('3', { vi: 'Hai trường hợp OO′ > OA + O′B và OO′ < OA − O′B', en: 'The cases OO′ > OA + O′B and OO′ < OA − O′B' },
            T`Trên Hình 5.35a ta có $OO'>OA+O'B$; trên Hình 5.35b ta có $OO'<OA-O'B$. Trong mỗi trường hợp, hãy vẽ hai đường tròn $(O;\,OA)$ và $(O';\,O'B)$ và cho biết chúng có điểm chung nào không.`,
            T`In Fig. 5.35a, $OO'>OA+O'B$; in Fig. 5.35b, $OO'<OA-O'B$. In each case draw $(O;\,OA)$ and $(O';\,O'B)$ and say whether they have any common point.`),
          key([
            p(T`Nếu hai đường tròn không có điểm chung nào thì ta nói đó là **hai đường tròn không giao nhau** ({non-intersecting|disjoint}).`,
              T`If two circles have no common point, they are called **{disjoint|disjoint}** (non-intersecting) circles.`)
          ], { vi: 'Hai đường tròn không giao nhau', en: 'Disjoint circles' }),
          fig('circ536', '5.36', 'Hai đường tròn ở ngoài nhau (a) và đường tròn này đựng đường tròn kia (b)', 'Circles outside each other (a) and one circle inside the other (b)'),
          tip({
            vi: T`**Chú ý.** Người ta còn phân biệt hai trường hợp: hai đường tròn *ở ngoài nhau* (H.5.36a) và đường tròn này *đựng* đường tròn kia (H.5.36b).`,
            en: T`**Note.** Two cases are distinguished: two circles {outside each other|outside-each-other} (Fig. 5.36a) and a circle that contains the other, i.e. one {inside the other|one-inside-the-other} (Fig. 5.36b).`
          }),
          h3('Nhận xét', 'Remarks'),
          p(T`• Hai đường tròn $(O;\,R)$ và $(O';\,R')$ *ở ngoài nhau* khi $OO'>R+R'$.`,
            T`• The circles $(O;\,R)$ and $(O';\,R')$ are *outside each other* when $OO'>R+R'$.`),
          p(T`• Đường tròn $(O;\,R)$ *đựng* đường tròn $(O';\,R')$ khi $R>R'$ và $OO'<R-R'$. Đặc biệt, khi $O$ trùng $O'$ và $R\ne R'$ thì ta có hai đường tròn *đồng tâm* ({concentric circles|concentric-circles}).`,
            T`• The circle $(O;\,R)$ *contains* the circle $(O';\,R')$ when $R>R'$ and $OO'<R-R'$. In particular, if $O$ coincides with $O'$ and $R\ne R'$, we get {concentric circles|concentric-circles}.`),
          ex(3, [
            p(T`Xác định vị trí tương đối của hai đường tròn $(O;\,3\text{ cm})$ và $(O';\,5\text{ cm})$, biết rằng $OO'>8$ cm.`,
              T`Determine the relative position of the circles $(O;\,3\text{ cm})$ and $(O';\,5\text{ cm})$, given $OO'>8$ cm.`)
          ], [
            p(T`Đặt $R=3$ cm và $R'=5$ cm, ta có $OO'>8\text{ cm}=R+R'$. Vậy $(O;\,3\text{ cm})$ và $(O';\,5\text{ cm})$ là hai đường tròn ở ngoài nhau.`,
              T`Put $R=3$ cm, $R'=5$ cm. Then $OO'>8\text{ cm}=R+R'$, so the two circles are outside each other.`)
          ]),
          lt(3, [
            p(T`Cho hai điểm $O$ và $O'$ sao cho $OO'=2$ cm. Xác định vị trí tương đối của hai đường tròn $(O;\,5\text{ cm})$ và $(O';\,r)$, biết rằng $r<3$ cm.`,
              T`Points $O$, $O'$ satisfy $OO'=2$ cm. Find the relative position of $(O;\,5\text{ cm})$ and $(O';\,r)$ given $r<3$ cm.`)
          ]),
          tip({
            vi: T`**Thực hành.** Để mô phỏng nguyệt thực, hãy cắt hai hình tròn từ giấy: hình thứ nhất màu sáng tượng trưng cho Mặt Trăng, hình thứ hai màu tối (to hơn) tượng trưng cho bóng Trái Đất. Sắp xếp để: a) mô phỏng nguyệt thực một phần — hai đường tròn có vị trí tương đối nào? b) mô phỏng nguyệt thực toàn phần — hai đường tròn có vị trí tương đối nào?`,
            en: T`**Practice.** To model a lunar eclipse, cut two paper discs: a light one for the Moon and a larger dark one for the Earth's shadow. Arrange them to model a) a partial eclipse — what is the relative position of the two circles? b) a total eclipse — what is the relative position?`
          })
        ]
      },

      /* ---------------------------------------------------------- Trang 107 */
      {
        number: 107,
        blocks: [
          tip({
            vi: T`**Tranh luận.** Tròn cho rằng: nói "hai đường tròn không cắt nhau" cũng có nghĩa là "hai đường tròn không giao nhau". Theo em, Tròn đúng hay sai? *(Gợi ý: hai đường tròn tiếp xúc nhau có cắt nhau không? Có giao nhau không?)*`,
            en: T`**Debate.** Tròn claims that "two circles do not intersect" means the same as "two circles are disjoint". Is Tròn right? *(Hint: do two tangent circles "intersect"? Are they "disjoint"?)*`
          }),
          h3('Bảng tổng kết', 'Summary table'),
          p(T`Với hai đường tròn $(O;\,R)$ và $(O';\,R')$ ($R\ge R'$), ta có bảng tổng kết sau:`,
            T`For two circles $(O;\,R)$ and $(O';\,R')$ with $R\ge R'$ we get the following summary:`),
          key([
            { t: 'table', head: true, rows: [
              [c(T`Vị trí tương đối của hai đường tròn $(O;\,R)$ và $(O';\,R')$ ($R\ge R'$)`, T`Relative position of the circles $(O;\,R)$ and $(O';\,R')$ ($R\ge R'$)`),
                c(T`Số điểm chung`, T`Common points`),
                c(T`Hệ thức giữa $OO'$ với $R$ và $R'$`, T`Relation between $OO'$, $R$ and $R'$`)],
              [c(T`Hai đường tròn cắt nhau`, T`{Intersecting circles|intersecting-circles}`),
                c('2', '2'), c(T`$R-R'<OO'<R+R'$`, T`$R-R'<OO'<R+R'$`)],
              [c(T`Tiếp xúc ngoài`, T`{Externally tangent|externally-tangent}`),
                c('1', '1'), c(T`$OO'=R+R'$`, T`$OO'=R+R'$`)],
              [c(T`Tiếp xúc trong`, T`{Internally tangent|internally-tangent}`),
                c('1', '1'), c(T`$OO'=R-R'>0$`, T`$OO'=R-R'>0$`)],
              [c(T`Ở ngoài nhau`, T`{Outside each other|outside-each-other} ({disjoint|disjoint})`),
                c('0', '0'), c(T`$OO'>R+R'$`, T`$OO'>R+R'$`)],
              [c(T`$(O)$ đựng $(O')$`, T`$(O)$ contains $(O')$ ({one inside the other|one-inside-the-other})`),
                c('0', '0'), c(T`$OO'<R-R'$`, T`$OO'<R-R'$`)],
              [c(T`Đồng tâm (trường hợp riêng của đựng nhau)`, T`{Concentric circles|concentric-circles} (a special case of containing)`),
                c('0', '0'), c(T`$OO'=0$, $R\ne R'$`, T`$OO'=0$, $R\ne R'$`)]
            ] }
          ], { vi: 'Vị trí tương đối của hai đường tròn', en: 'Relative positions of two circles' }),
          fig('circ5sum', '', 'Sáu vị trí của hai đường tròn', 'Six positions of two circles'),
          head('practice', 'Bài tập', 'Exercises'),
          bt('5.24', T`Hình 5.37 cho thấy hình ảnh của những đường tròn (là viền ngoài của các sản phẩm) qua cách trình bày một số sản phẩm mây tre đan. Bằng cách đánh số các đường tròn, em hãy chỉ ra một vài cặp đường tròn cắt nhau và vài cặp đường tròn không giao nhau.`,
            T`Fig. 5.37 shows circles (the rims of woven bamboo products) in a display. By numbering the circles, point out a few pairs of intersecting circles and a few pairs of disjoint circles.`),
          bt('5.25', T`Cho hai điểm $O$ và $O'$ cách nhau 5 cm. Mỗi đường tròn sau có vị trí tương đối thế nào đối với đường tròn $(O;\,3\text{ cm})$? a) $(O';\,3\text{ cm})$; b) $(O';\,1\text{ cm})$; c) $(O';\,8\text{ cm})$.`,
            T`Points $O$, $O'$ are 5 cm apart. What is the relative position of each circle to $(O;\,3\text{ cm})$? a) $(O';\,3\text{ cm})$; b) $(O';\,1\text{ cm})$; c) $(O';\,8\text{ cm})$.`),
          bt('5.26', T`Cho ba điểm thẳng hàng $O$, $A$ và $O'$. Với mỗi trường hợp sau, hãy viết hệ thức giữa các độ dài $OO'$, $OA$ và $O'A$ rồi xét xem hai đường tròn $(O;\,OA)$ và $(O';\,O'A)$ tiếp xúc trong hay tiếp xúc ngoài với nhau; vẽ hình để khẳng định dự đoán. a) $A$ nằm giữa $O$ và $O'$; b) $O$ nằm giữa $A$ và $O'$; c) $O'$ nằm giữa $A$ và $O$.`,
            T`$O$, $A$, $O'$ are collinear. In each case write the relation between $OO'$, $OA$, $O'A$, then decide whether $(O;\,OA)$ and $(O';\,O'A)$ are internally or externally tangent; draw a figure to check. a) $A$ is between $O$ and $O'$; b) $O$ is between $A$ and $O'$; c) $O'$ is between $A$ and $O$.`),
          bt('5.27', T`Cho hai đường tròn $(O)$ và $(O')$ tiếp xúc ngoài với nhau tại $A$. Một đường thẳng qua $A$ cắt $(O)$ tại $B$ và cắt $(O')$ tại $C$. Chứng minh rằng $OB$ ∥ $O'C$.`,
            T`Circles $(O)$ and $(O')$ are externally tangent at $A$. A line through $A$ meets $(O)$ at $B$ and $(O')$ at $C$. Prove that $OB$ ∥ $O'C$.`)
        ]
      }
    ]
  };
})();
