/* ==========================================================================
   KHOA HỌC TỰ NHIÊN 9 — CHƯƠNG I. NĂNG LƯỢNG CƠ HỌC
     'khtn9-bai2'  Bài 2. Động năng. Thế năng (tr. 15–17)
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
    'kinetic-energy': g('kinetic energy', '/kɪˈnet.ɪk ˈen.ə.dʒi/', 'n', 'động năng',
      'Trong KHTN: Năng lượng mà vật có được do chuyển động: W_đ = ½mv².', 'A fast hammer has a lot of kinetic energy.', 'Một chiếc búa nhanh có nhiều động năng.'),
    'potential-energy': g('potential energy', '/pəˈten.ʃəl ˈen.ə.dʒi/', 'n', 'thế năng',
      'Trong KHTN: Năng lượng dự trữ của vật do vị trí (độ cao, độ biến dạng…) trong một trường lực.', 'Water in a high lake has potential energy.', 'Nước trong hồ ở trên cao có thế năng.'),
    'gravitational-pe': g('gravitational potential energy', '/ˌɡræv.ɪˈteɪ.ʃən.əl pəˈten.ʃəl ˈen.ə.dʒi/', 'n', 'thế năng trọng trường',
      'Trong KHTN: Thế năng của vật ở một độ cao so với gốc thế năng: W_t = P·h.', 'Gravitational potential energy grows with height.', 'Thế năng trọng trường tăng theo độ cao.'),
    'elastic-pe': g('elastic potential energy', '/ɪˈlæs.tɪk pəˈten.ʃəl ˈen.ə.dʒi/', 'n', 'thế năng đàn hồi',
      'Trong KHTN: Năng lượng dự trữ trong lò xo, dây cung, dây chun khi bị nén hoặc kéo dãn.', 'A stretched bow stores elastic potential energy.', 'Cây cung bị kéo căng dự trữ thế năng đàn hồi.'),
    'phys-mass': g('mass', '/mæs/', 'n', 'khối lượng',
      'Trong KHTN: Lượng chất của vật, đo bằng kg; khối lượng càng lớn thì vật càng khó thay đổi chuyển động.', 'The mass of the ball is 0.45 kg.', 'Khối lượng của quả bóng là 0,45 kg.'),
    'phys-speed': g('speed', '/spiːd/', 'n', 'tốc độ',
      'Trong KHTN: Quãng đường vật đi được trong một đơn vị thời gian, đơn vị m/s.', 'The speed of the car doubled.', 'Tốc độ của ô tô tăng gấp đôi.'),
    'phys-weight': g('weight', '/weɪt/', 'n', 'trọng lượng',
      'Trong KHTN: Lực hút của Trái Đất lên vật, đo bằng niutơn (N): P = 10m ở gần mặt đất.', 'The weight of a 2 kg object is 20 N.', 'Trọng lượng của vật 2 kg là 20 N.'),
    'phys-height': g('height', '/haɪt/', 'n', 'độ cao',
      'Trong KHTN: Khoảng cách thẳng đứng từ vật đến gốc thế năng.', 'Measure the height from the table.', 'Hãy đo độ cao tính từ mặt bàn.'),
    joule: g('joule', '/dʒuːl/', 'n', 'jun (J)',
      'Trong KHTN: Đơn vị của năng lượng và công; 1 J = 1 N·m.', 'The ball has 22.5 joules of kinetic energy.', 'Quả bóng có 22,5 jun động năng.'),
    'reference-level': g('reference level', '/ˈref.ər.əns ˈlev.əl/', 'n', 'gốc thế năng',
      'Trong KHTN: Vị trí được chọn làm mốc có độ cao bằng 0 để tính thế năng.', 'Choose the ground as the reference level.', 'Hãy chọn mặt đất làm gốc thế năng.'),
    reservoir: g('reservoir', '/ˈrez.ə.vwɑːr/', 'n', 'hồ chứa nước',
      'Trong KHTN: Hồ lớn tích trữ nước, thường ở sau đập thuỷ điện.', 'The reservoir stores water at height.', 'Hồ chứa tích trữ nước ở trên cao.'),
    dam: g('dam', '/dæm/', 'n', 'đập nước',
      'Trong KHTN: Công trình chắn dòng chảy để tạo hồ chứa.', 'The dam holds back the river.', 'Đập chặn dòng sông lại.'),
    hydropower: g('hydropower', '/ˈhaɪ.drəʊˌpaʊ.ər/', 'n', 'thuỷ điện',
      'Trong KHTN: Điện được tạo ra nhờ nước chảy từ cao xuống làm quay tua-bin.', 'Vietnam produces a lot of hydropower.', 'Việt Nam sản xuất nhiều thuỷ điện.'),
    'phys-store': g('store', '/stɔːr/', 'v', 'tích trữ, dự trữ',
      'Trong KHTN: Giữ năng lượng lại để dùng sau. (Danh từ “store”: cửa hàng.)', 'A raised weight stores energy.', 'Vật được nâng lên dự trữ năng lượng.'),
    proportional: g('proportional', '/prəˈpɔː.ʃən.əl/', 'adj', 'tỉ lệ (thuận)',
      'Trong KHTN: Hai đại lượng tăng gấp bao nhiêu lần thì đại lượng kia cũng tăng gấp bấy nhiêu lần.', 'Potential energy is proportional to height.', 'Thế năng tỉ lệ thuận với độ cao.'),
    squared: g('squared', '/skweəd/', 'adj', 'bình phương',
      'Trong KHTN: Nhân một số với chính nó; v² đọc là “v squared”.', 'Kinetic energy depends on speed squared.', 'Động năng phụ thuộc vào bình phương tốc độ.'),
    double: g('double', '/ˈdʌb.əl/', 'v', 'tăng gấp đôi',
      'Trong KHTN: Làm cho giá trị lớn gấp hai lần.', 'If the speed doubles, the kinetic energy quadruples.', 'Nếu tốc độ gấp đôi thì động năng tăng gấp bốn.')
  });

  const FIG = (art, no, vi, en, wide) => ({ t: 'fig', art, no, vi, en, wide });

  D.lessons['khtn9-bai2'] = {
    gradeId: 9, number: '2', book: 'Khoa học tự nhiên 9',
    title: { vi: 'Động năng. Thế năng', en: 'Kinetic energy. Potential energy' },
    topic: { label: 'Chương', labelEn: 'Chapter', number: 'I', vi: 'Năng lượng cơ học', en: 'Mechanical energy' },
    spreadLabels: ['Động năng', 'Thế năng; luyện tập'],
    pages: [
      { number: 15, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: { vi: 'Mục tiêu. Sau bài học này em sẽ:', en: 'Aims. After this lesson you will:' }, items: [
          { vi: 'Viết được biểu thức tính động năng của vật.', en: 'Write the expression for the {kinetic energy|kinetic-energy} of an object.' },
          { vi: 'Viết được biểu thức tính thế năng của vật ở gần mặt đất.', en: 'Write the expression for the {potential energy|gravitational-pe} of an object near the ground.' }
        ] },
        P('Khi chơi xích đu, động năng của người chơi thay đổi thế nào trong lúc đi từ vị trí cao nhất A xuống vị trí thấp nhất O?', 'On a swing, how does the player’s kinetic energy change while moving from the highest point A to the lowest point O?', { badge: 'fire' }),
        FIG('khtn2d', '2.4', 'Người chơi xích đu: A là vị trí cao nhất, O là vị trí thấp nhất', 'A swing: A is the highest point, O the lowest', true),
        { t: 'h2', n: 'I', vi: 'Động năng', en: 'Kinetic energy' },
        P('Viên bi lăn đến đập vào viên bi khác làm chuyển động của chúng thay đổi. Gió thổi căng buồm, đẩy thuyền đi. Dòng nước chảy làm quay bánh xe nước. Năng lượng mà vật có được do chuyển động như trong các ví dụ trên gọi là **động năng**.',
          'A rolling marble that hits another changes how both move. Wind fills a sail and pushes the boat. Flowing water turns a water wheel. The energy an object has because it moves, as in all these examples, is called **{kinetic energy|kinetic-energy}**.'),
        P('Ở Hình 2.1, búa càng nặng và đập càng nhanh thì thanh thép càng bị biến dạng nhiều, chứng tỏ động năng của búa càng lớn. Vậy động năng của vật phụ thuộc vào **khối lượng** và **tốc độ** của nó.',
          'In Figure 2.1, the heavier the hammer and the faster it strikes, the more the steel bar is deformed, which shows the hammer’s kinetic energy is greater. So the kinetic energy of an object depends on its **{mass|phys-mass}** and **{speed|phys-speed}**.'),
        FIG('khtn2a', '2.1', 'Búa đập vào thanh thép làm thanh biến dạng', 'A hammer strikes a steel bar and deforms it', true)
      ] },
      { number: 16, blocks: [
        { t: 'ask', style: 'num', lead: { vi: 'Câu hỏi', en: 'Question' }, items: [
          B('Quan sát Hình 2.2 và cho biết vật nào có động năng lớn nhất. Hãy giải thích.', 'Look at Figure 2.2 and say which object has the greatest kinetic energy. Explain.')
        ] },
        FIG('khtn2b', '2.2', 'a) Quả bóng; b) Ô tô đang di chuyển; c) Máy bay đang chuyển động', 'a) A ball; b) A moving car; c) A flying plane', true),
        { t: 'key', title: { vi: 'Biểu thức tính động năng', en: 'Expression for kinetic energy' }, blocks: [
          P('Vật có khối lượng $m$ chuyển động với tốc độ $v$ có động năng:', 'An object of mass $m$ moving at speed $v$ has kinetic energy:'),
          M('W_{\\text{đ}} = \\frac{1}{2}\\,m\\,v^{2}', '(2.1)'),
          { t: 'list', items: [
            { vi: '$m$: khối lượng của vật, đơn vị kilôgam (kg).', en: '$m$: the mass of the object, in kilograms (kg).' },
            { vi: '$v$: tốc độ của vật, đơn vị mét trên giây (m/s).', en: '$v$: the speed of the object, in metres per second (m/s).' },
            { vi: '$W_{\\text{đ}}$: động năng của vật, đơn vị jun (J).', en: '$W_{\\text{đ}}$: the kinetic energy, in {joules|joule} (J).' }
          ] }
        ] },
        { t: 'ex', kind: 'example', no: 1, body: [
          P('Tính động năng của quả bóng đá có khối lượng $m = 0{,}45$ kg đang bay với tốc độ $v = 10$ m/s.', 'Find the kinetic energy of a football of mass $m = 0.45$ kg flying at $v = 10$ m/s.')
        ], solution: [
          M('W_{\\text{đ}} = \\frac{1}{2} \\cdot 0{,}45 \\cdot 10^{2} = 22{,}5\\ \\text{J}', ''),
          P('Động năng của quả bóng là **22,5 J**.', 'The kinetic energy of the ball is **22.5 J**.')
        ] },
        { t: 'ex', kind: 'example', no: 2, body: [
          P('Một ô tô khối lượng 1 000 kg chạy với tốc độ 10 m/s, sau đó tăng lên 20 m/s. Động năng của ô tô tăng bao nhiêu lần?', 'A 1 000 kg car moves at 10 m/s, then speeds up to 20 m/s. By what factor does its kinetic energy increase?')
        ], solution: [
          P('Lúc đầu: $W_{\\text{đ1}} = \\frac{1}{2} \\cdot 1000 \\cdot 10^{2} = 50\\,000$ J. Lúc sau: $W_{\\text{đ2}} = \\frac{1}{2} \\cdot 1000 \\cdot 20^{2} = 200\\,000$ J.',
            'At first: $W_{\\text{k1}} = \\frac{1}{2} \\cdot 1000 \\cdot 10^{2} = 50\\,000$ J. Then: $W_{\\text{k2}} = \\frac{1}{2} \\cdot 1000 \\cdot 20^{2} = 200\\,000$ J.'),
          P('Tốc độ gấp đôi thì động năng tăng **4 lần**, vì động năng tỉ lệ với $v^{2}$.', 'When the speed {doubles|double}, the kinetic energy increases **4 times**, because it is proportional to $v^{2}$ ({squared|squared}).')
        ] },
        { t: 'ask', style: 'num', lead: { vi: 'Luyện tập', en: 'Practice' }, items: [
          B('Động năng của một ô tô thay đổi thế nào nếu tốc độ của xe tăng gấp đôi?', 'How does the kinetic energy of a car change if its speed doubles?'),
          B('Tính động năng của quả bóng đá khối lượng $m = 0{,}45$ kg đang bay với tốc độ $v = 10$ m/s.', 'Find the kinetic energy of a football of mass $m = 0.45$ kg flying at $v = 10$ m/s.'),
          B('Trả lời câu hỏi ở phần mở đầu bài (xích đu).', 'Answer the opening question about the swing.')
        ] }
      ] },
      { number: 17, blocks: [
        { t: 'h2', n: 'II', vi: 'Thế năng', en: 'Potential energy' },
        P('**Thế năng trọng trường** (gọi tắt là thế năng) là năng lượng của vật khi ở một độ cao nhất định so với mặt đất hoặc so với vị trí được chọn làm gốc thế năng.',
          '**{Gravitational potential energy|gravitational-pe}** is the energy an object has at a certain {height|phys-height} above the ground, or above a position chosen as the {reference level|reference-level}.'),
        P('Để dự trữ năng lượng, người ta xây đập ngăn dòng chảy tạo thành hồ chứa. Nước trong hồ càng nhiều và ở càng cao thì năng lượng tích trữ càng lớn (Hình 2.3).',
          'To {store|phys-store} energy, people build a {dam|dam} across a river to form a {reservoir|reservoir}. The more water there is and the higher it is, the more energy is stored (Figure 2.3).'),
        FIG('khtn2c', '2.3', 'Sơ đồ đập thuỷ điện', 'Diagram of a hydroelectric dam', true),
        { t: 'ask', style: 'num', items: [B('Giải thích vì sao để khai thác tối đa thế năng của nước, người ta đặt máy phát điện ở vị trí càng thấp so với mực nước hồ chứa.', 'Explain why, to get the most from the water’s potential energy, the generator is placed as low as possible below the reservoir’s water level.')] },
        { t: 'key', title: { vi: 'Biểu thức tính thế năng trọng trường', en: 'Expression for gravitational potential energy' }, blocks: [
          M('W_{\\text{t}} = P\\,h', '(2.2)'),
          { t: 'list', items: [
            { vi: '$P$: trọng lượng của vật, đơn vị niutơn (N); $P = 10m$ với $m$ tính bằng kg.', en: '$P$: the {weight|phys-weight} of the object, in newtons (N); $P = 10m$ with $m$ in kg.' },
            { vi: '$h$: độ cao của vật so với gốc thế năng, đơn vị mét (m).', en: '$h$: the height above the reference level, in metres (m).' },
            { vi: '$W_{\\text{t}}$: thế năng trọng trường, đơn vị jun (J).', en: '$W_{\\text{t}}$: the gravitational potential energy, in joules (J).' }
          ] },
          P('Thế năng **tỉ lệ thuận** với trọng lượng và với độ cao. Giá trị của thế năng phụ thuộc vào gốc thế năng đã chọn.', 'Potential energy is **{proportional|proportional}** to weight and to height. Its value depends on the reference level you choose.')
        ] },
        { t: 'ex', kind: 'example', no: 3, body: [
          P('Một công nhân vác bao xi măng nặng 500 N trên vai, đứng trên sân thượng toà nhà cao 20 m so với mặt đất. Độ cao của bao xi măng so với mặt sân thượng là 1,4 m. Tính thế năng của bao xi măng khi chọn gốc thế năng: a) tại mặt sân thượng; b) tại mặt đất.',
            'A worker carries a 500 N bag of cement on his shoulder on the roof terrace of a building 20 m above the ground. The bag is 1.4 m above the terrace floor. Find the potential energy of the bag when the reference level is: a) the terrace floor; b) the ground.')
        ], solution: [
          P('a) Gốc ở mặt sân thượng: $h = 1{,}4$ m nên $W_{\\text{t}} = 500 \\cdot 1{,}4 = 700$ J.', 'a) Reference at the terrace: $h = 1.4$ m so $W_{\\text{p}} = 500 \\cdot 1.4 = 700$ J.'),
          P('b) Gốc ở mặt đất: $h = 20 + 1{,}4 = 21{,}4$ m nên $W_{\\text{t}} = 500 \\cdot 21{,}4 = 10\\,700$ J.', 'b) Reference at the ground: $h = 20 + 1.4 = 21.4$ m so $W_{\\text{p}} = 500 \\cdot 21.4 = 10\\,700$ J.'),
          P('Cùng một vật nhưng gốc thế năng khác nhau cho giá trị thế năng khác nhau.', 'The same object gives different potential energies for different reference levels.')
        ] },
        { t: 'ask', style: 'num', lead: { vi: 'Luyện tập', en: 'Practice' }, items: [
          B('So sánh thế năng trọng trường của hai vật ở cùng một độ cao so với gốc thế năng, biết khối lượng vật thứ nhất gấp 3 lần khối lượng vật thứ hai.', 'Compare the gravitational potential energy of two objects at the same height above the reference level, if the first has 3 times the mass of the second.'),
          B('Em hãy làm bài toán bao xi măng ở Ví dụ 3 với số liệu: trọng lượng 300 N, sân thượng cao 12 m, bao ở độ cao 1,5 m so với sân thượng.', 'Redo Example 3 with a 300 N bag, a terrace 12 m high and the bag 1.5 m above the terrace.')
        ] },
        { t: 'tip', items: [{ vi: 'Ngoài thế năng trọng trường, vật còn dự trữ năng lượng dưới dạng thế năng khác, như thế năng đàn hồi của lò xo hay dây cung bị biến dạng.', en: 'Besides gravitational potential energy, objects store energy in other forms, such as the {elastic potential energy|elastic-pe} of a deformed spring or bowstring.' }] },
        { t: 'quiz', title: { vi: 'Tự kiểm tra', en: 'Self-check' }, items: [
          Q('q1', 'Động năng của vật phụ thuộc vào:', 'The kinetic energy of an object depends on:', [['Khối lượng và độ cao', 'Mass and height'], ['Khối lượng và tốc độ', 'Mass and speed'], ['Chỉ độ cao', 'Height only'], ['Màu sắc', 'Colour']], 1, 'Công thức $W_đ = \\frac{1}{2}mv^2$ có m và v.', 'The formula $W_k = \\frac{1}{2}mv^2$ contains m and v.'),
          Q('q2', 'Đơn vị của động năng trong hệ SI là:', 'The SI unit of kinetic energy is:', [['Niutơn (N)', 'Newton (N)'], ['Jun (J)', 'Joule (J)'], ['Oát (W)', 'Watt (W)'], ['Mét (m)', 'Metre (m)']], 1, 'Năng lượng đo bằng jun.', 'Energy is measured in joules.'),
          Q('q3', 'Tốc độ tăng gấp 3 lần thì động năng:', 'If the speed triples, the kinetic energy:', [['Tăng 3 lần', 'Triples'], ['Tăng 6 lần', 'Grows 6 times'], ['Tăng 9 lần', 'Grows 9 times'], ['Không đổi', 'Stays the same']], 2, '$3^2 = 9$.', '$3^2 = 9$.'),
          Q('q4', 'Quả bóng 0,45 kg bay 10 m/s có động năng:', 'A 0.45 kg ball moving at 10 m/s has kinetic energy:', [['4,5 J', '4.5 J'], ['22,5 J', '22.5 J'], ['45 J', '45 J'], ['225 J', '225 J']], 1, '$\\frac{1}{2}\\cdot 0{,}45\\cdot 100 = 22{,}5$ J.', '$\\frac{1}{2}\\cdot 0.45\\cdot 100 = 22.5$ J.'),
          Q('q5', 'Hai vật cùng tốc độ, vật nào có động năng lớn hơn?', 'Two objects have the same speed. Which has more kinetic energy?', [['Vật có khối lượng lớn hơn', 'The one with greater mass'], ['Vật có khối lượng nhỏ hơn', 'The one with smaller mass'], ['Như nhau', 'Equal'], ['Không so sánh được', 'Cannot be compared']], 0, 'Động năng tỉ lệ thuận với khối lượng.', 'Kinetic energy is proportional to mass.'),
          Q('q6', 'Công thức tính thế năng trọng trường là:', 'The formula for gravitational potential energy is:', [['$W_t = mv^2$', '$W_p = mv^2$'], ['$W_t = Ph$', '$W_p = Ph$'], ['$W_t = P/h$', '$W_p = P/h$'], ['$W_t = h/P$', '$W_p = h/P$']], 1, 'Thế năng bằng trọng lượng nhân độ cao.', 'Potential energy is weight times height.'),
          Q('q7', 'Vật nặng 2 kg ở độ cao 5 m so với mặt đất (lấy g = 10 m/s²) có thế năng:', 'A 2 kg object 5 m above the ground (g = 10 m/s²) has potential energy:', [['10 J', '10 J'], ['50 J', '50 J'], ['100 J', '100 J'], ['200 J', '200 J']], 2, '$P = 20$ N; $W = 20\\cdot 5 = 100$ J.', '$P = 20$ N; $W = 20\\cdot 5 = 100$ J.'),
          Q('q8', 'Thế năng của vật phụ thuộc vào:', 'The potential energy of an object depends on:', [['Gốc thế năng được chọn', 'The chosen reference level'], ['Tên người đo', 'Who measures it'], ['Màu của vật', 'The colour of the object'], ['Nhiệt độ phòng', 'Room temperature']], 0, 'Độ cao h được tính từ gốc thế năng.', 'Height h is measured from the reference level.'),
          Q('q9', 'Vì sao nước ở hồ chứa trên cao có năng lượng?', 'Why does water in a high reservoir have energy?', [['Vì có thế năng', 'It has potential energy'], ['Vì có màu xanh', 'It is blue'], ['Vì rất lạnh', 'It is very cold'], ['Vì đứng yên nên không có', 'It has none because it is at rest']], 0, 'Độ cao tạo ra thế năng trọng trường.', 'Height gives gravitational potential energy.'),
          Q('q10', 'Xích đu từ A (cao nhất) xuống O (thấp nhất), động năng của người chơi:', 'On a swing from A (highest) to O (lowest), the player’s kinetic energy:', [['Giảm dần', 'Decreases'], ['Không đổi', 'Stays constant'], ['Tăng dần', 'Increases'], ['Luôn bằng 0', 'Is always zero']], 2, 'Tốc độ tăng dần nên động năng tăng.', 'The speed rises, so the kinetic energy rises.')
        ] },
        { t: 'key', title: { vi: 'Em đã học', en: 'What you have learned' }, blocks: [
          { t: 'list', items: [
            { vi: 'Động năng: $W_{\\text{đ}} = \\frac{1}{2}mv^{2}$ ($m$ tính bằng kg, $v$ bằng m/s, $W_{\\text{đ}}$ bằng J).', en: 'Kinetic energy: $W_{\\text{k}} = \\frac{1}{2}mv^{2}$ ($m$ in kg, $v$ in m/s, $W_{\\text{k}}$ in J).' },
            { vi: 'Thế năng trọng trường: $W_{\\text{t}} = Ph$ ($P$ tính bằng N, $h$ bằng m, $W_{\\text{t}}$ bằng J).', en: 'Gravitational potential energy: $W_{\\text{p}} = Ph$ ($P$ in N, $h$ in m, $W_{\\text{p}}$ in J).' }
          ] }
        ] },
        { t: 'key', title: { vi: 'Em có thể', en: 'You can' }, blocks: [
          { t: 'list', items: [
            { vi: 'Tính động năng, thế năng của các vật.', en: 'Calculate the kinetic and potential energy of objects.' },
            { vi: 'Giải thích nguyên lí tích trữ năng lượng dưới dạng thế năng, ví dụ ở hồ chứa thuỷ điện.', en: 'Explain how energy is stored as potential energy, for example in a hydro reservoir.' }
          ] }
        ] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          { vi: 'Động năng là năng lượng do chuyển động; tăng theo khối lượng và theo bình phương tốc độ.', en: 'Kinetic energy is energy of motion; it grows with mass and with the square of speed.' },
          { vi: 'Thế năng trọng trường là năng lượng do độ cao; $W_{\\text{t}} = Ph$ và phụ thuộc gốc thế năng.', en: 'Gravitational potential energy comes from height; $W_{\\text{p}} = Ph$ and depends on the reference level.' },
          { vi: 'Đơn vị của năng lượng là jun (J).', en: 'The unit of energy is the joule (J).' }
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.',
          keys: ['kinetic-energy', 'potential-energy', 'gravitational-pe', 'elastic-pe', 'phys-mass', 'phys-speed', 'phys-weight', 'phys-height', 'joule', 'reference-level', 'reservoir', 'dam', 'hydropower', 'phys-store', 'proportional', 'squared', 'double'] }
      ] }
    ]
  };
})();
