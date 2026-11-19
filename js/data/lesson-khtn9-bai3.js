/* ==========================================================================
   KHOA HỌC TỰ NHIÊN 9 — CHƯƠNG I. NĂNG LƯỢNG CƠ HỌC
     'khtn9-bai3'  Bài 3. Cơ năng (tr. 18–20)
   NỘI DUNG NGUYÊN BẢN do nhóm dự án soạn theo cấu trúc mục, số hiệu hình, công thức và dạng bài tập
   của bài; không phải bản chép sách giáo khoa. Hãy đối chiếu với sách in trước khi dùng chính thức.
   Quy ước: g = 10 m/s² (trọng lượng P = 10m, đơn vị N).
   ========================================================================== */
(function () {
  'use strict';
  const D = (window.TEXTBOOK = window.TEXTBOOK || {});
  D.lessons = D.lessons || {};
  D.glossary = D.glossary || {};
  const g = (word, ipa, pos, vi, ctx, en, viEx) => ({ word, ipa, pos, vi, ctx, ex: { en, vi: viEx } });
  const P = (vi, en, x) => Object.assign({ t: 'p', vi, en }, x || {});
  const M = (tex, label) => ({ t: 'math', tex, label });
  const Q = (id, vi, en, opts, answer, whyVi, whyEn) => ({ id, vi, en, options: opts.map((o) => ({ vi: o[0], en: o[1] })), answer, whyVi, whyEn });
  const B = (vi, en) => ({ vi, en });

  Object.assign(D.glossary, {
    'mechanical-energy': g('mechanical energy', '/mɪˈkæn.ɪ.kəl ˈen.ə.dʒi/', 'n', 'cơ năng',
      'Trong KHTN: Tổng động năng và thế năng của vật: W = W_đ + W_t.', 'The mechanical energy of the ball is 60 J.', 'Cơ năng của quả bóng là 60 J.'),
    conservation: g('conservation of energy', '/ˌkɒn.səˈveɪ.ʃən əv ˈen.ə.dʒi/', 'n', 'sự bảo toàn năng lượng',
      'Trong KHTN: Năng lượng không tự sinh ra hay mất đi, chỉ chuyển từ dạng này sang dạng khác; cơ năng được bảo toàn khi không có lực cản.', 'Energy conservation explains the pendulum.', 'Sự bảo toàn năng lượng giải thích chuyển động của con lắc.'),
    conserved: g('conserved', '/kənˈsɜːvd/', 'adj', 'được bảo toàn',
      'Trong KHTN: Giữ nguyên giá trị theo thời gian.', 'Mechanical energy is conserved when there is no friction.', 'Cơ năng được bảo toàn khi không có ma sát.'),
    transformation: g('transformation', '/ˌtræns.fəˈmeɪ.ʃən/', 'n', 'sự chuyển hoá',
      'Trong KHTN: Quá trình một dạng năng lượng biến thành dạng khác, như thế năng thành động năng.', 'The transformation of potential energy into kinetic energy.', 'Sự chuyển hoá thế năng thành động năng.'),
    pendulum: g('pendulum', '/ˈpen.djʊ.ləm/', 'n', 'con lắc',
      'Trong KHTN: Vật nặng treo bằng dây, dao động qua lại quanh vị trí thấp nhất.', 'A simple pendulum swings back and forth.', 'Con lắc đơn dao động qua lại.'),
    'phys-friction': g('friction', '/ˈfrɪk.ʃən/', 'n', 'ma sát',
      'Trong KHTN: Lực cản xuất hiện khi hai bề mặt trượt trên nhau, làm cơ năng chuyển thành nhiệt.', 'Friction slows the pendulum down.', 'Ma sát làm con lắc chậm dần.'),
    'air-resistance': g('air resistance', '/eə rɪˈzɪs.təns/', 'n', 'lực cản không khí',
      'Trong KHTN: Lực của không khí cản chuyển động của vật, làm một phần cơ năng thành nhiệt.', 'Air resistance is small for a heavy ball.', 'Lực cản không khí nhỏ với quả cầu nặng.'),
    'pile-driver': g('pile driver', '/ˈpaɪl ˌdraɪ.vər/', 'n', 'búa máy đóng cọc',
      'Trong KHTN: Máy nâng đầu búa nặng lên cao rồi thả rơi để đóng cọc xuống đất.', 'The pile driver hammers the pile into the ground.', 'Búa máy đóng cọc xuống đất.'),
    'phys-pile': g('pile', '/paɪl/', 'n', 'cọc',
      'Trong KHTN: Thanh dài bằng gỗ, bê tông hoặc thép đóng xuống đất làm móng. (Nghĩa khác: đống.)', 'The pile sinks deeper with each blow.', 'Cọc ngập sâu thêm sau mỗi nhát búa.'),
    juggling: g('juggling', '/ˈdʒʌɡ.lɪŋ/', 'n', 'trò tung hứng',
      'Trong KHTN: Tung và bắt nhiều vật liên tục.', 'Juggling shows how height and speed change together.', 'Tung hứng cho thấy độ cao và tốc độ thay đổi cùng nhau.'),
    'phys-ascend': g('rise', '/raɪz/', 'v', 'đi lên, tăng lên',
      'Trong KHTN: Chuyển động hướng lên hoặc tăng về giá trị.', 'The ball rises, then falls.', 'Quả bóng đi lên rồi rơi xuống.'),
    'phys-descend': g('fall', '/fɔːl/', 'v', 'rơi xuống, giảm',
      'Trong KHTN: Chuyển động hướng xuống dưới dưới tác dụng của trọng lực.', 'As it falls, its speed increases.', 'Khi rơi, tốc độ của nó tăng lên.'),
    'free-fall': g('free fall', '/friː fɔːl/', 'n', 'rơi tự do',
      'Trong KHTN: Rơi chỉ dưới tác dụng của trọng lực, bỏ qua lực cản không khí.', 'In free fall, mechanical energy is conserved.', 'Khi rơi tự do, cơ năng được bảo toàn.'),
    'phys-sum': g('sum', '/sʌm/', 'n', 'tổng',
      'Trong KHTN: Kết quả của phép cộng.', 'Mechanical energy is the sum of kinetic and potential energy.', 'Cơ năng là tổng của động năng và thế năng.'),
    'phys-heat': g('thermal energy', '/ˈθɜː.məl ˈen.ə.dʒi/', 'n', 'nhiệt năng',
      'Trong KHTN: Năng lượng của chuyển động nhiệt của các hạt; do ma sát, cơ năng giảm và nhiệt năng tăng.', 'Friction turns mechanical energy into thermal energy.', 'Ma sát biến cơ năng thành nhiệt năng.'),
    'phys-jump': g('long jump', '/lɒŋ dʒʌmp/', 'n', 'nhảy xa',
      'Trong KHTN: Môn thể thao chạy lấy đà rồi bật nhảy xa nhất có thể.', 'A fast run-up helps in the long jump.', 'Chạy đà nhanh giúp nhảy xa.')
  });

  const FIG = (art, no, vi, en, wide) => ({ t: 'fig', art, no, vi, en, wide });
  const v = (J, m) => Math.sqrt(2 * J / m);

  D.lessons['khtn9-bai3'] = {
    gradeId: 9, number: '3', book: 'Khoa học tự nhiên 9',
    title: { vi: 'Cơ năng', en: 'Mechanical energy' },
    topic: { label: 'Chương', labelEn: 'Chapter', number: 'I', vi: 'Năng lượng cơ học', en: 'Mechanical energy' },
    spreadLabels: ['Cơ năng và sự chuyển hoá', 'Xe thế năng; luyện tập'],
    pages: [
      { number: 18, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: { vi: 'Mục tiêu. Sau bài học này em sẽ:', en: 'Aims. After this lesson you will:' }, items: [
          { vi: 'Nêu được cơ năng là tổng động năng và thế năng của vật.', en: 'State that {mechanical energy|mechanical-energy} is the sum of kinetic and potential energy of an object.' },
          { vi: 'Vận dụng khái niệm cơ năng để phân tích sự chuyển hoá năng lượng trong một số trường hợp đơn giản.', en: 'Use the idea of mechanical energy to analyse energy {transformations|transformation} in some simple cases.' }
        ] },
        P('Khi dùng búa máy đóng cọc, đầu búa được nâng lên một độ cao rồi thả rơi xuống cọc. Trong lúc rơi, động năng và thế năng của đầu búa chuyển hoá qua lại như thế nào?',
          'A {pile driver|pile-driver} lifts its hammer head to a certain height and drops it on the {pile|phys-pile}. While it falls, how do the hammer’s kinetic and potential energy change into each other?', { badge: 'fire' }),
        FIG('khtn3e', '3.5', 'Búa máy đóng cọc', 'A pile driver', true),
        { t: 'h2', n: 'I', vi: 'Cơ năng', en: 'Mechanical energy' },
        P('Trong trò tung hứng (Hình 3.1), khi bóng đi lên, độ cao tăng dần nên thế năng tăng, đồng thời tốc độ giảm dần nên động năng giảm. Khi bóng rơi xuống thì ngược lại: thế năng giảm, động năng tăng. Vậy động năng và thế năng có thể chuyển hoá qua lại.',
          'In {juggling|juggling} (Figure 3.1), as a ball {rises|phys-ascend} its height grows so its potential energy grows, while its speed falls so its kinetic energy falls. When it {falls|phys-descend} the opposite happens: potential energy decreases and kinetic energy increases. So kinetic and potential energy can change into each other.'),
        FIG('khtn3a', '3.1', 'Người chơi tung hứng bóng', 'A person juggling balls', true)
      ] },
      { number: 19, blocks: [
        { t: 'key', title: { vi: 'Cơ năng', en: 'Mechanical energy' }, blocks: [
          P('Tổng động năng và thế năng của vật gọi là **cơ năng**:', 'The {sum|phys-sum} of the kinetic and potential energy of an object is its **mechanical energy**:'),
          M('W = W_{\\text{đ}} + W_{\\text{t}} = \\frac{1}{2}\\,m\\,v^{2} + P\\,h', '(3.1)'),
          P('Đơn vị của cơ năng là jun (J).', 'The unit of mechanical energy is the joule (J).')
        ] },
        { t: 'ask', style: 'num', items: [B('Lấy ví dụ về trường hợp vật vừa có động năng, vừa có thế năng. Mô tả sự chuyển hoá (nếu có) giữa động năng và thế năng của vật đó.', 'Give an example of an object that has both kinetic and potential energy. Describe any change between them.')] },
        { t: 'ex', kind: 'example', no: 1, body: [
          P('Vật có khối lượng $m = 1{,}5$ kg được thả rơi từ độ cao $h = 4$ m so với mặt đất. Chọn gốc thế năng ở mặt đất, tính tốc độ của vật ngay khi chạm đất, biết toàn bộ thế năng chuyển hoá thành động năng.',
            'A 1.5 kg object is dropped from a height $h = 4$ m above the ground. With the reference level at the ground, find its speed just before it hits the ground, given that all its potential energy turns into kinetic energy.')
        ], solution: [
          P('Trọng lượng $P = 10 \\cdot 1{,}5 = 15$ N. Thế năng lúc đầu: $W_{\\text{t}} = 15 \\cdot 4 = 60$ J, động năng lúc đầu bằng 0, nên cơ năng $W = 60$ J.', 'Weight $P = 10 \\cdot 1.5 = 15$ N. Initial potential energy: $W_{\\text{p}} = 15 \\cdot 4 = 60$ J, initial kinetic energy is 0, so $W = 60$ J.'),
          P('Ngay trước khi chạm đất, $h = 0$ nên toàn bộ cơ năng là động năng:', 'Just before landing, $h = 0$, so all the mechanical energy is kinetic:'),
          M('\\frac{1}{2}\\,m\\,v^{2} = 60 \\ \\Rightarrow\\ v = \\sqrt{\\frac{2 \\cdot 60}{1{,}5}} = \\sqrt{80} \\approx 8{,}9\\ \\text{m/s}', ''),
          P('Tốc độ của vật khoảng **8,9 m/s**.', 'The speed of the object is about **8.9 m/s**.')
        ] },
        { t: 'h2', n: 'II', vi: 'Sự chuyển hoá năng lượng', en: 'Energy transformations' },
        P('Nếu cơ năng của vật không chuyển hoá thành dạng năng lượng khác thì tổng động năng và thế năng luôn không đổi: cơ năng của vật được **bảo toàn**. Hình 3.3 cho thấy vật 1,5 kg rơi từ 4 m: khi thế năng giảm bao nhiêu thì động năng tăng bấy nhiêu, còn tổng luôn bằng 60 J.',
          'If the mechanical energy of an object does not turn into other forms, the sum of its kinetic and potential energy stays constant: the mechanical energy is **{conserved|conserved}**. Figure 3.3 shows a 1.5 kg object falling from 4 m: whatever potential energy is lost, the same amount of kinetic energy is gained, and the total stays at 60 J.'),
        FIG('khtn3c', '3.3', 'Cột thế năng và động năng của vật 1,5 kg rơi từ độ cao 4 m', 'Potential and kinetic energy bars of a 1.5 kg object falling from 4 m', true),
        P('Trong nhiều trường hợp, cơ năng chuyển hoá thành dạng năng lượng khác (nhiệt năng do ma sát và lực cản không khí); khi đó cơ năng **không** được bảo toàn.',
          'In many cases mechanical energy turns into other forms (thermal energy because of {friction|phys-friction} and {air resistance|air-resistance}); then mechanical energy is **not** conserved.')
      ] },
      { number: 20, blocks: [
        { t: 'activity', no: 1, title: { vi: 'Thí nghiệm về sự chuyển hoá động năng – thế năng', en: 'An experiment on the kinetic–potential energy change' },
          vi: 'Chuẩn bị: con lắc đơn gồm vật nặng và sợi dây không dãn, treo vào giá thí nghiệm. Tiến hành: kéo vật nặng đến vị trí A ở độ cao h rồi thả nhẹ; vật chuyển động đến vị trí thấp nhất O, tiếp tục lên và dừng lại ở điểm B (Hình 3.2), sau đó chuyển động ngược lại. So sánh độ cao của B với A và quan sát con lắc sau một thời gian dài.',
          en: 'Prepare: a simple {pendulum|pendulum}, a bob on an inextensible string hung from a stand. Do: pull the bob to A at height h and release gently; it swings down to the lowest point O, rises and stops at B (Figure 3.2), then swings back. Compare the height of B with A, and watch the pendulum for a long time.', items: [], style: 'plain' },
        FIG('khtn3b', '3.2', 'Thí nghiệm chuyển động của con lắc đơn', 'The motion of a simple pendulum', true),
        { t: 'ask', style: 'num', lead: { vi: 'Câu hỏi', en: 'Questions' }, items: [
          B('Nhận xét về sự chuyển hoá giữa động năng và thế năng của vật nặng khi đi từ A đến O và từ O đến B.', 'Describe the change between kinetic and potential energy of the bob from A to O and from O to B.'),
          B('Độ cao của B so với A như thế nào? Điều đó nói lên điều gì về cơ năng?', 'How does the height of B compare with A? What does that say about mechanical energy?'),
          B('Vì sao sau một thời gian, con lắc dừng lại?', 'Why does the pendulum stop after a while?')
        ] },
        { t: 'tip', items: [
          { vi: 'Gợi ý: ở A vật đứng yên, chỉ có thế năng; ở O thế năng nhỏ nhất, động năng lớn nhất; ở B lại chỉ còn thế năng. Thực tế B thấp hơn A một chút vì ma sát và lực cản không khí, và cuối cùng con lắc dừng lại.', en: 'Hint: at A the bob is at rest and has only potential energy; at O potential energy is least and kinetic energy greatest; at B only potential energy is left. In practice B is slightly lower than A because of friction and air resistance, and in the end the pendulum stops.' }
        ] },
        { t: 'head', kind: 'practice', vi: 'Luyện tập', en: 'Practice' },
        { t: 'ex', kind: 'practice', no: 1, body: [
          P('Xe thế năng có cấu tạo như Hình 3.4: quả nặng nối với trục xe qua một ròng rọc cố định bằng sợi dây mềm, không dãn, quấn nhiều vòng quanh trục xe. Khi thả quả nặng rơi, dây kéo bánh xe lăn và xe chuyển động. a) Mô tả sự chuyển hoá năng lượng từ khi thả đến khi quả nặng chạm sàn xe. b) Độ cao ban đầu của quả nặng so với sàn xe là 8 cm, khối lượng quả nặng $m_1 = 20$ g, khối lượng xe $m_2 = 50$ g. Tính tốc độ của xe ngay khi quả nặng chạm sàn, coi toàn bộ thế năng của quả nặng chuyển hoá thành động năng (của cả quả nặng và xe, chuyển động cùng tốc độ). c) Trong thực tế, tốc độ này nhỏ hơn giá trị tính được. Hãy giải thích.',
            'A potential-energy cart is built as in Figure 3.4: a weight is joined to the cart axle over a fixed pulley by a soft, inextensible string wound several times round the axle. When the weight falls, the string pulls the wheels so the cart moves. a) Describe the energy transformation from release until the weight reaches the cart floor. b) The weight starts 8 cm above the cart floor, with mass $m_1 = 20$ g and cart mass $m_2 = 50$ g. Find the cart’s speed when the weight reaches the floor, assuming all the weight’s potential energy becomes kinetic energy (of the weight and the cart, moving at the same speed). c) In practice this speed is smaller than the computed value. Explain.')
        ], solution: [
          P('a) Quả nặng rơi: thế năng giảm, động năng của quả nặng và xe tăng.', 'a) As the weight falls, its potential energy decreases and the kinetic energy of the weight and the cart increases.'),
          P('b) $W_{\\text{t}} = m_1 g h = 0{,}02 \\cdot 10 \\cdot 0{,}08 = 0{,}016$ J. Khi đó $\\frac{1}{2}(m_1 + m_2)v^{2} = 0{,}016$ nên $v = \\sqrt{\\frac{2 \\cdot 0{,}016}{0{,}07}} \\approx 0{,}68$ m/s.', 'b) $W_{\\text{p}} = m_1 g h = 0.02 \\cdot 10 \\cdot 0.08 = 0.016$ J. Then $\\frac{1}{2}(m_1 + m_2)v^{2} = 0.016$ so $v = \\sqrt{\\frac{2 \\cdot 0.016}{0.07}} \\approx 0.68$ m/s.'),
          P('c) Ma sát ở trục, ròng rọc và bánh xe, cùng lực cản không khí, làm một phần cơ năng chuyển thành nhiệt nên động năng thực tế nhỏ hơn.', 'c) Friction at the axle, pulley and wheels, plus air resistance, turns part of the mechanical energy into heat, so the real kinetic energy is smaller.')
        ] },
        FIG('khtn3d', '3.4', 'Xe thế năng', 'A potential-energy cart', true)
,
        { t: 'ex', kind: 'practice', no: 2, body: [
          P('Quả bóng 0,5 kg được ném thẳng đứng lên với tốc độ 10 m/s từ mặt đất. Bỏ qua lực cản không khí. a) Tính cơ năng của bóng. b) Tính độ cao lớn nhất bóng đạt tới.', 'A 0.5 kg ball is thrown straight up from the ground at 10 m/s. Ignore air resistance. a) Find its mechanical energy. b) Find the maximum height it reaches.')
        ], solution: [
          P('a) Tại mặt đất $h = 0$: $W = \\frac{1}{2} \\cdot 0{,}5 \\cdot 10^{2} = 25$ J.', 'a) At the ground $h = 0$: $W = \\frac{1}{2} \\cdot 0.5 \\cdot 10^{2} = 25$ J.'),
          P('b) Ở điểm cao nhất $v = 0$ nên $W = Ph$ hay $25 = 5h$, suy ra $h = 5$ m.', 'b) At the top $v = 0$ so $W = Ph$, i.e. $25 = 5h$, giving $h = 5$ m.')
        ] },
        { t: 'head', kind: 'apply', vi: 'Vận dụng', en: 'Apply' },
        { t: 'ex', kind: 'apply', no: 1, body: [
          P('Giải thích vì sao để nhảy xa được, vận động viên cần chạy lấy đà đủ nhanh và bật cao tại vị trí giậm nhảy.', 'Explain why, to make a long jump, an athlete needs a fast enough run-up and a high take-off at the jumping spot.')
        ], solution: [
          P('Chạy nhanh làm động năng ban đầu lớn; bật cao làm thế năng lớn. Cơ năng càng lớn thì người nhảy càng bay xa trước khi chạm đất.', 'A fast run-up gives a large initial kinetic energy; a high take-off gives a large potential energy. The greater the mechanical energy, the farther the jumper travels before landing.')
        ] },
        { t: 'quiz', title: { vi: 'Tự kiểm tra', en: 'Self-check' }, items: [
          Q('q1', 'Cơ năng của vật bằng:', 'The mechanical energy of an object equals:', [['Động năng', 'Kinetic energy'], ['Thế năng', 'Potential energy'], ['Tổng động năng và thế năng', 'The sum of kinetic and potential energy'], ['Hiệu động năng và thế năng', 'The difference of kinetic and potential energy']], 2, 'Cơ năng là tổng hai dạng năng lượng.', 'Mechanical energy is the sum of the two forms.'),
          Q('q2', 'Quả bóng đi lên thì:', 'As a ball rises:', [['Thế năng tăng, động năng giảm', 'Potential energy rises, kinetic energy falls'], ['Cả hai tăng', 'Both rise'], ['Cả hai giảm', 'Both fall'], ['Thế năng giảm, động năng tăng', 'Potential falls, kinetic rises']], 0, 'Độ cao tăng, tốc độ giảm.', 'Height rises, speed falls.'),
          Q('q3', 'Vật rơi tự do, không có lực cản: cơ năng', 'For an object in free fall with no drag, the mechanical energy:', [['Tăng dần', 'Increases'], ['Giảm dần', 'Decreases'], ['Không đổi', 'Stays constant'], ['Bằng 0', 'Is zero']], 2, 'Cơ năng được bảo toàn.', 'Mechanical energy is conserved.'),
          Q('q4', 'Vật 1,5 kg rơi từ 4 m chạm đất với tốc độ khoảng:', 'A 1.5 kg object falls from 4 m and lands at about:', [['4,5 m/s', '4.5 m/s'], ['6,3 m/s', '6.3 m/s'], ['8,9 m/s', '8.9 m/s'], ['40 m/s', '40 m/s']], 2, '$v = \\sqrt{2gh} = \\sqrt{80} \\approx 8{,}9$ m/s.', '$v = \\sqrt{2gh} = \\sqrt{80} \\approx 8.9$ m/s.'),
          Q('q5', 'Ở vị trí thấp nhất O của con lắc đơn:', 'At the lowest point O of a pendulum:', [['Động năng lớn nhất', 'Kinetic energy is greatest'], ['Động năng bằng 0', 'Kinetic energy is zero'], ['Thế năng lớn nhất', 'Potential energy is greatest'], ['Cơ năng bằng 0', 'Mechanical energy is zero']], 0, 'Tốc độ lớn nhất tại O.', 'Speed is greatest at O.'),
          Q('q6', 'Vì sao con lắc đơn cuối cùng dừng lại?', 'Why does a simple pendulum finally stop?', [['Cơ năng chuyển thành nhiệt do ma sát và lực cản', 'Mechanical energy turns into heat through friction and drag'], ['Trọng lực biến mất', 'Gravity disappears'], ['Dây dãn ra', 'The string stretches'], ['Thế năng tăng mãi', 'Potential energy keeps rising']], 0, 'Cơ năng không được bảo toàn khi có lực cản.', 'Mechanical energy is not conserved when drag acts.'),
          Q('q7', 'Vật 2 kg ở độ cao 5 m, đang đứng yên (g = 10 m/s²). Cơ năng (gốc ở mặt đất) là:', 'A 2 kg object rests at 5 m (g = 10 m/s²). Its mechanical energy (ground as reference) is:', [['10 J', '10 J'], ['50 J', '50 J'], ['100 J', '100 J'], ['0 J', '0 J']], 2, 'Chỉ có thế năng: $20\\cdot 5 = 100$ J.', 'Only potential energy: $20\\cdot 5 = 100$ J.'),
          Q('q8', 'Bóng 0,5 kg ném lên với 10 m/s, bỏ qua lực cản, lên cao tối đa:', 'A 0.5 kg ball thrown up at 10 m/s with no drag rises at most:', [['2,5 m', '2.5 m'], ['5 m', '5 m'], ['10 m', '10 m'], ['20 m', '20 m']], 1, '$25 = 5h \\Rightarrow h = 5$ m.', '$25 = 5h \\Rightarrow h = 5$ m.'),
          Q('q9', 'Trong búa máy đóng cọc, khi đầu búa rơi xuống:', 'In a pile driver, as the hammer falls:', [['Thế năng chuyển hoá thành động năng', 'Potential energy turns into kinetic energy'], ['Động năng chuyển hoá thành thế năng', 'Kinetic energy turns into potential energy'], ['Không có chuyển hoá', 'No change occurs'], ['Cơ năng tăng thêm', 'Mechanical energy increases']], 0, 'Độ cao giảm, tốc độ tăng.', 'Height drops, speed grows.'),
          Q('q10', 'Phát biểu nào đúng khi cơ năng được bảo toàn?', 'Which is correct when mechanical energy is conserved?', [['Động năng tăng bao nhiêu thì thế năng giảm bấy nhiêu', 'Kinetic energy gained equals potential energy lost'], ['Động năng và thế năng luôn bằng nhau', 'Kinetic and potential energy are always equal'], ['Thế năng luôn bằng 0', 'Potential energy is always 0'], ['Động năng luôn bằng 0', 'Kinetic energy is always 0']], 0, 'Tổng $W_đ + W_t$ không đổi.', 'The sum $W_k + W_p$ stays constant.')
        ] },
        { t: 'key', title: { vi: 'Em đã học', en: 'What you have learned' }, blocks: [
          { t: 'list', items: [
            { vi: 'Động năng và thế năng có thể chuyển hoá qua lại lẫn nhau.', en: 'Kinetic and potential energy can change into each other.' },
            { vi: 'Cơ năng của vật là tổng động năng và thế năng: $W = W_{\\text{đ}} + W_{\\text{t}} = \\frac{1}{2}mv^{2} + Ph$ (đơn vị J).', en: 'The mechanical energy of an object is the sum of kinetic and potential energy: $W = W_{\\text{k}} + W_{\\text{p}} = \\frac{1}{2}mv^{2} + Ph$ (unit J).' }
          ] }
        ] },
        { t: 'key', title: { vi: 'Em có thể', en: 'You can' }, blocks: [
          { t: 'list', items: [{ vi: 'Giải thích được vì sao để nhảy xa cần chạy lấy đà nhanh và bật cao tại vị trí giậm nhảy.', en: 'Explain why a long jumper needs a fast run-up and a high take-off.' }] }
        ] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          { vi: 'Cơ năng = động năng + thế năng.', en: 'Mechanical energy = kinetic energy + potential energy.' },
          { vi: 'Khi không có ma sát và lực cản, cơ năng được bảo toàn: động năng và thế năng chuyển hoá cho nhau, tổng không đổi.', en: 'Without friction or drag, mechanical energy is conserved: kinetic and potential energy change into each other and the total stays the same.' },
          { vi: 'Khi có ma sát hoặc lực cản, một phần cơ năng chuyển thành nhiệt nên cơ năng giảm dần.', en: 'With friction or drag, part of the mechanical energy becomes heat, so it decreases gradually.' }
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.',
          keys: ['mechanical-energy', 'conservation', 'conserved', 'transformation', 'pendulum', 'phys-friction', 'air-resistance', 'pile-driver', 'phys-pile', 'juggling', 'phys-ascend', 'phys-descend', 'free-fall', 'phys-sum', 'phys-heat', 'phys-jump'] }
      ] }
    ]
  };
})();
