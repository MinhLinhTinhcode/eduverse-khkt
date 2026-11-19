/* ==========================================================================
   KHOA HỌC TỰ NHIÊN 9 — CHƯƠNG I. NĂNG LƯỢNG CƠ HỌC
     'khtn9-bai4'  Bài 4. Công và công suất (tr. 21–24)
   NỘI DUNG NGUYÊN BẢN do nhóm dự án soạn theo cấu trúc mục, số hiệu hình/bảng, công thức và số liệu của bài;
   không phải bản chép sách giáo khoa. Hãy đối chiếu với sách in trước khi dùng chính thức.
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
  const FIG = (art, no, vi, en, wide) => ({ t: 'fig', art, no, vi, en, wide });
  const C = (vi, en) => ({ vi, en });

  Object.assign(D.glossary, {
    'phys-work': g('work', '/wɜːk/', 'n', 'công (cơ học)',
      'Trong KHTN: Số đo phần năng lượng truyền từ vật này sang vật khác khi lực làm vật dịch chuyển: A = F·s. (Nghĩa khác: công việc.)', 'The work done by the force is 1 400 J.', 'Công của lực là 1 400 J.'),
    power: g('power', '/ˈpaʊ.ər/', 'n', 'công suất',
      'Trong KHTN: Tốc độ thực hiện công, đo bằng công chia cho thời gian: 𝒫 = A / t. (Nghĩa khác: quyền lực, sức mạnh.)', 'A crane with more power lifts the load faster.', 'Cần cẩu có công suất lớn hơn nâng tải nhanh hơn.'),
    'phys-force': g('force', '/fɔːs/', 'n', 'lực',
      'Trong KHTN: Tác dụng đẩy hoặc kéo lên vật, đo bằng niutơn (N).', 'A force of 700 N lifts the crate.', 'Lực 700 N nâng thùng hàng lên.'),
    displacement: g('displacement', '/dɪsˈpleɪs.mənt/', 'n', 'sự dịch chuyển',
      'Trong KHTN: Quãng đường vật đi được theo một hướng nhất định.', 'The displacement along the force is 2 m.', 'Quãng đường dịch chuyển theo hướng lực là 2 m.'),
    'phys-joule': g('joule', '/dʒuːl/', 'n', 'jun (J)',
      'Trong KHTN: Đơn vị của công và năng lượng; 1 J = 1 N·m.', 'The unit of work is the joule.', 'Đơn vị của công là jun.'),
    watt: g('watt', '/wɒt/', 'n', 'oát (W)',
      'Trong KHTN: Đơn vị của công suất; 1 W = 1 J/s.', 'A 50 W bulb converts 50 J each second.', 'Bóng đèn 50 W chuyển hoá 50 J mỗi giây.'),
    newton: g('newton', '/ˈnjuː.tən/', 'n', 'niutơn (N)',
      'Trong KHTN: Đơn vị của lực.', 'The weight is 500 newtons.', 'Trọng lượng là 500 niutơn.'),
    forklift: g('forklift', '/ˈfɔːk.lɪft/', 'n', 'xe nâng',
      'Trong KHTN: Xe có càng nâng để nâng và chở hàng.', 'The forklift raises the crate to the truck bed.', 'Xe nâng đưa thùng hàng lên sàn xe tải.'),
    crate: g('crate', '/kreɪt/', 'n', 'thùng hàng',
      'Trong KHTN: Hộp hoặc thùng lớn đựng hàng hoá.', 'Each crate weighs 500 N.', 'Mỗi thùng hàng nặng 500 N.'),
    'heat-transfer': g('heat transfer', '/hiːt ˈtræn.sfɜːr/', 'n', 'truyền nhiệt',
      'Trong KHTN: Hình thức truyền năng lượng khi có chênh lệch nhiệt độ (khác với thực hiện công).', 'Heat transfer and doing work are two ways to transfer energy.', 'Truyền nhiệt và thực hiện công là hai cách truyền năng lượng.'),
    angle: g('angle', '/ˈæŋ.ɡəl/', 'n', 'góc',
      'Trong KHTN: Góc α hợp bởi hướng của lực và hướng dịch chuyển.', 'The angle between the force and the motion is 30°.', 'Góc giữa lực và hướng chuyển động là 30°.'),
    'phys-perp': g('perpendicular', '/ˌpɜː.pənˈdɪk.jʊ.lər/', 'adj', 'vuông góc',
      'Trong KHTN: Tạo với nhau góc 90°. Lực vuông góc với hướng dịch chuyển không sinh công.', 'A force perpendicular to the motion does no work.', 'Lực vuông góc với chuyển động không sinh công.'),
    'phys-horse': g('horsepower', '/ˈhɔːs.paʊ.ər/', 'n', 'mã lực (HP)',
      'Trong KHTN: Đơn vị công suất; 1 HP = 746 W.', 'The engine delivers 100 horsepower.', 'Động cơ cho công suất 100 mã lực.'),
    calorie: g('calorie', '/ˈkæl.ər.i/', 'n', 'calo (cal)',
      'Trong KHTN: Đơn vị năng lượng; 1 cal = 4,186 J.', 'One calorie equals 4.186 joules.', 'Một calo bằng 4,186 jun.'),
    'phys-stopwatch': g('stopwatch', '/ˈstɒp.wɒtʃ/', 'n', 'đồng hồ bấm giây',
      'Trong KHTN: Dụng cụ đo khoảng thời gian ngắn.', 'Use a stopwatch to time the lift.', 'Dùng đồng hồ bấm giây để đo thời gian nâng.'),
    'phys-heart': g('heart', '/hɑːt/', 'n', 'tim',
      'Trong KHTN: Cơ quan bơm máu; mỗi lần đập thực hiện một công khoảng 1 J.', 'The heart beats about 70 times a minute.', 'Tim đập khoảng 70 lần mỗi phút.')
  });

  const kj = (v) => String(v).replace('.', ',');

  D.lessons['khtn9-bai4'] = {
    gradeId: 9, number: '4', book: 'Khoa học tự nhiên 9',
    title: { vi: 'Công và công suất', en: 'Work and power' },
    topic: { label: 'Chương', labelEn: 'Chapter', number: 'I', vi: 'Năng lượng cơ học', en: 'Mechanical energy' },
    spreadLabels: ['Công cơ học', 'Công khi lực xiên; công suất', 'Giá trị công suất; luyện tập'],
    pages: [
      { number: 21, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: { vi: 'Mục tiêu. Sau bài học này em sẽ:', en: 'Aims. After this lesson you will:' }, items: [
          { vi: 'Phân tích ví dụ để rút ra: công bằng lực nhân với quãng đường dịch chuyển theo hướng của lực; công suất là tốc độ thực hiện công.', en: 'Analyse examples to see that {work|phys-work} equals force times the {displacement|displacement} along the force, and {power|power} is the rate of doing work.' },
          { vi: 'Liệt kê được một số đơn vị thường dùng đo công và công suất.', en: 'List some common units of work and power.' },
          { vi: 'Tính được công và công suất trong một số trường hợp đơn giản.', en: 'Calculate work and power in simple cases.' }
        ] },
        P('Trong đời sống, ta hay nói cần “tốn công” khi cấy lúa, xây nhà, hay ngồi đợi xe… Công trong mỗi trường hợp đó được xác định như thế nào?', 'In daily life we say a task “takes effort” — planting rice, building a house, even waiting for a bus. How is work really defined in each case?', { badge: 'fire' }),
        { t: 'h2', n: 'I', vi: 'Công', en: 'Work' },
        P('Khi các vật tương tác, năng lượng có thể được truyền từ vật này sang vật khác. Có hai hình thức truyền năng lượng phổ biến là {truyền nhiệt|heat-transfer} và thực hiện công; bài này tìm hiểu hình thức thứ hai.'.replace('{truyền nhiệt|heat-transfer}', 'truyền nhiệt'), 'When objects interact, energy can pass from one to the other. Two common ways are {heat transfer|heat-transfer} and doing work; this lesson looks at the second.'),
        P('Một người đẩy xe hàng trên sàn nằm ngang (Hình 4.1). Sau khi dịch chuyển quãng đường $s$, xe có tốc độ $v$, tức là có động năng. Động năng đó có được do người đã thực hiện một công cơ học.', 'A person pushes a cart across a level floor (Figure 4.1). After a distance $s$ the cart has speed $v$, so it has kinetic energy. It got it because the person did mechanical work.'),
        FIG('khtn4a', '4.1', 'Lực đẩy làm xe hàng dịch chuyển một đoạn s theo hướng của lực', 'The pushing force moves the cart a distance s along the force', true)
      ] },
      { number: 22, blocks: [
        P('Công cơ học (gọi tắt là **công**) là số đo phần năng lượng được truyền từ vật này sang vật khác trong tương tác. Ở Hình 4.1 xe hàng nhận năng lượng nên động năng tăng.', 'Mechanical work (just **work**) measures the energy transferred from one object to another in an interaction. In Figure 4.1 the cart receives energy, so its kinetic energy rises.'),
        { t: 'key', title: { vi: 'Công của lực không đổi', en: 'Work of a constant force' }, blocks: [
          P('Công $A$ của một {lực|phys-force} $F$ không đổi làm vật dịch chuyển quãng đường $s$ theo hướng của lực là:', 'The work $A$ of a constant {force|phys-force} $F$ moving an object a distance $s$ along the force is:'),
          M('A = F \\cdot s', '(4.1)'),
          P('$F$ tính bằng {niutơn|newton} (N), $s$ bằng mét (m). Khi $F = 1$ N và $s = 1$ m thì $A = 1$ N·m = 1 {jun|phys-joule} (J).', '$F$ is in {newtons|newton} (N), $s$ in metres (m). When $F = 1$ N and $s = 1$ m, $A = 1$ N·m = 1 {joule|phys-joule} (J).')
        ] },
        P('Bội của jun: $1\\ \\text{kJ} = 10^{3}\\ \\text{J}$; $1\\ \\text{MJ} = 10^{6}\\ \\text{J}$. Đơn vị khác: $1\\ \\text{BTU} = 1\\,055\\ \\text{J}$; $1\\ \\text{{calo|calorie}}$ ($\\text{cal}$) $= 4{,}186\\ \\text{J}$; $1\\ \\text{kcal} = 1\\,000\\ \\text{cal} = 4\\,186\\ \\text{J}$.'.replace('{calo|calorie}', 'calo'), 'Multiples: $1\\ \\text{kJ} = 10^{3}\\ \\text{J}$; $1\\ \\text{MJ} = 10^{6}\\ \\text{J}$. Other units: $1\\ \\text{BTU} = 1\\,055\\ \\text{J}$; $1\\ \\text{{calorie|calorie}}$ ($\\text{cal}$) $= 4.186\\ \\text{J}$; $1\\ \\text{kcal} = 1\\,000\\ \\text{cal} = 4\\,186\\ \\text{J}$.'.replace('{calorie|calorie}', 'cal')),
        { t: 'ask', style: 'num', lead: { vi: 'Hình 4.2', en: 'Figure 4.2' }, items: [B('Mô tả quá trình thực hiện công ở các ví dụ trong Hình 4.2: xác định lực tác dụng lên vật và quãng đường vật dịch chuyển theo hướng của lực, rồi cho biết trường hợp nào có công cơ học, trường hợp nào không.', 'Describe the work in each example of Figure 4.2: find the force on the object and the distance it moves along the force, and say which cases involve mechanical work and which do not.')] },
        FIG('khtn4b', '4.2', 'Ví dụ các trường hợp có và không có công cơ học', 'Examples with and without mechanical work', true),
        P('Gợi ý: đẩy xe và ném lao có lực làm vật dịch chuyển theo hướng của lực nên có công; ngồi học và giữ tạ đứng yên không có dịch chuyển nên $s = 0$, công bằng 0.', 'Hint: pushing a cart and throwing a javelin involve a force that moves the object along the force, so work is done; sitting and holding a weight still involve no displacement, so $s = 0$ and the work is zero.'),
        { t: 'h3', vi: 'Khi vật dịch chuyển không theo phương của lực', en: 'When the object does not move along the force' },
        P('Nếu lực $F$ hợp với hướng dịch chuyển một góc $\\alpha$ (Hình 4.3), công của lực khi vật đi quãng đường $s$ là:', 'If the force $F$ makes an {angle|angle} $\\alpha$ with the displacement (Figure 4.3), the work done over a distance $s$ is:'),
        M('A = F \\cdot s \\cdot \\cos\\alpha \\qquad (0° \\le \\alpha \\le 90°)', '(4.2)'),
        FIG('khtn4c', '4.3', 'Vật dịch chuyển không theo phương của lực', 'The object moves in a direction other than the force', true)
      ] },
      { number: 23, blocks: [
        P('Nếu vật dịch chuyển theo phương {vuông góc|perpendicular} với lực thì $\\alpha = 90°$, $\\cos\\alpha = 0$ và công của lực đó bằng 0.', 'If the object moves {perpendicular|phys-perp} to the force then $\\alpha = 90°$, $\\cos\\alpha = 0$ and that force does no work.'),
        { t: 'ex', kind: 'example', no: 1, body: [
          P('Một {xe nâng|forklift} tác dụng lực hướng lên theo phương thẳng đứng, độ lớn 700 N, để nâng thùng hàng từ mặt đất lên độ cao 2 m. Tính công của lực nâng.', 'A {forklift|forklift} exerts a vertical upward force of 700 N to raise a {crate|crate} from the ground to a height of 2 m. Find the work done by the lifting force.')
        ], solution: [
          P('Lực hướng lên, dịch chuyển cũng hướng lên nên $\\alpha = 0°$: $A = F s = 700 \\cdot 2 = 1\\,400$ J.', 'The force and the displacement are both upward, so $\\alpha = 0°$: $A = F s = 700 \\cdot 2 = 1\\,400$ J.')
        ] },
        { t: 'h2', n: 'II', vi: 'Công suất', en: 'Power' },
        { t: 'activity', no: 1, title: { vi: 'So sánh hai xe nâng', en: 'Comparing two forklifts' },
          vi: 'Hai xe nâng đưa hai thùng hàng từ mặt đất (điểm A) lên sàn xe tải cao 1 m (điểm B). Xe thứ nhất nâng thùng nặng 500 N hết 10 s; xe thứ hai nâng thùng nặng 700 N hết 15 s. a) Tính công mỗi xe thực hiện. b) So sánh công mỗi xe thực hiện được trong một giây.',
          en: 'Two forklifts raise two crates from the ground (A) to a truck bed 1 m high (B). The first lifts a 500 N crate in 10 s; the second lifts a 700 N crate in 15 s. a) Find the work each does. b) Compare the work each does in one second.', items: [] },
        FIG('khtn4d', '4.4', 'Nâng thùng hàng bằng xe nâng', 'Lifting crates with forklifts', true),
        P('Để đánh giá việc thực hiện công, ta không chỉ quan tâm công lớn hay nhỏ mà còn quan tâm công đó được thực hiện nhanh hay chậm. Đại lượng đặc trưng cho tốc độ thực hiện công là **công suất**.', 'To judge how work is done we care not only how much work but also how fast. The quantity for the rate of doing work is **power**.'),
        { t: 'key', title: { vi: 'Công suất', en: 'Power' }, blocks: [
          P('Nếu trong thời gian $t$ thực hiện được công $A$ thì công suất là:', 'If work $A$ is done in a time $t$, the power is:'),
          M('\\mathcal{P} = \\frac{A}{t}', '(4.3)'),
          P('$A$ tính bằng jun (J), $t$ bằng giây (s); đơn vị công suất là {oát|watt} (W): $1\\ \\text{W} = 1\\ \\text{J/s}$. Bội: $1\\ \\text{kW} = 10^{3}\\ \\text{W}$; $1\\ \\text{MW} = 10^{6}\\ \\text{W}$; $1\\ \\text{GW} = 10^{9}\\ \\text{W}$.', '$A$ is in joules (J), $t$ in seconds (s); the unit of power is the {watt|watt} (W): $1\\ \\text{W} = 1\\ \\text{J/s}$. Multiples: $1\\ \\text{kW} = 10^{3}\\ \\text{W}$; $1\\ \\text{MW} = 10^{6}\\ \\text{W}$; $1\\ \\text{GW} = 10^{9}\\ \\text{W}$.')
        ] },
        P('Đơn vị khác: mã lực $1\\ \\text{{HP|phys-horse}} = 746\\ \\text{W}$ (với “mã lực” tiếng Anh là horsepower); thiết bị sưởi hay làm lạnh dùng BTU/h: $1\\ \\text{BTU/h} = 0{,}293\\ \\text{W}$.'.replace('{HP|phys-horse}', 'HP'), 'Other units: $1\\ \\text{HP} = 746\\ \\text{W}$ ({horsepower|phys-horse}); heaters and air-conditioners use BTU/h: $1\\ \\text{BTU/h} = 0.293\\ \\text{W}$.')
      ] },
      { number: 24, blocks: [
        P('Bảng 4.1. Một số giá trị công suất:', 'Table 4.1. Some values of power:'),
        { t: 'table', head: true, rows: [
          [C('Đối tượng', 'Object'), C('Công suất 𝒫', 'Power 𝒫'), C('Đối tượng', 'Object'), C('Công suất 𝒫', 'Power 𝒫')],
          [C('Ngựa', 'Horse'), C('Khoảng 700 W', 'About 700 W'), C('Tên lửa', 'Rocket'), C('Khoảng 2·10⁷ W', 'About 2·10⁷ W')],
          [C('Ô tô', 'Car'), C('2·10⁴ W – 3·10⁵ W', '2·10⁴ W – 3·10⁵ W'), C('Nhà máy thuỷ điện Hoà Bình', 'Hoa Binh hydropower plant'), C('Khoảng 5·10⁹ W', 'About 5·10⁹ W')],
          [C('Đầu máy xe lửa', 'Locomotive'), C('10⁶ W – 3·10⁶ W', '10⁶ W – 3·10⁶ W'), C('Mặt Trời', 'The Sun'), C('Khoảng 37·10²⁵ W', 'About 37·10²⁵ W')]
        ] },
        { t: 'ask', style: 'num', items: [B('Mỗi lần đập, {tim|phys-heart} người thực hiện một công khoảng 1 J. Hãy đề xuất cách đo công suất của tim bằng một {đồng hồ bấm giây|phys-stopwatch}.'.replace('{tim|phys-heart}', 'tim').replace('{đồng hồ bấm giây|phys-stopwatch}', 'đồng hồ bấm giây'), 'Each beat, the {heart|phys-heart} does about 1 J of work. Propose a way to measure the heart’s power with a {stopwatch|phys-stopwatch}.')] },
        P('Gợi ý: đếm số lần tim đập trong 30 s (ví dụ 35 lần) → công 35 J trong 30 s → $\\mathcal{P} = 35 / 30 \\approx 1{,}2$ W.', 'Hint: count the beats in 30 s (say 35) → 35 J of work in 30 s → $\\mathcal{P} = 35 / 30 \\approx 1.2$ W.'),
        { t: 'key', title: { vi: 'Công suất và năng lượng khác', en: 'Power and other energy' }, blocks: [
          P('Công suất còn dùng để nói tốc độ chuyển hoá các dạng năng lượng khác. Bóng đèn 50 W nghĩa là mỗi giây nó chuyển hoá 50 J điện năng thành quang năng, nhiệt năng…', 'Power also describes how fast other forms of energy change. A 50 W bulb converts 50 J of electrical energy each second into light, heat…')
        ] },
        { t: 'ex', kind: 'example', no: 2, body: [P('Tính công suất của từng xe nâng ở Hình 4.4 và cho biết xe nào làm việc nhanh hơn.', 'Find the power of each forklift in Figure 4.4 and say which works faster.')], solution: [
          P('Xe 1: $A_1 = 500 \\cdot 1 = 500$ J, $\\mathcal{P}_1 = 500 / 10 = 50$ W.', 'Forklift 1: $A_1 = 500 \\cdot 1 = 500$ J, $\\mathcal{P}_1 = 500 / 10 = 50$ W.'),
          P('Xe 2: $A_2 = 700 \\cdot 1 = 700$ J, $\\mathcal{P}_2 = 700 / 15 \\approx 46{,}7$ W.', 'Forklift 2: $A_2 = 700 \\cdot 1 = 700$ J, $\\mathcal{P}_2 = 700 / 15 \\approx 46.7$ W.'),
          P('Xe 2 làm nhiều công hơn nhưng xe 1 có công suất lớn hơn nên làm việc nhanh hơn.', 'Forklift 2 does more work but forklift 1 has the greater power, so it works faster.')
        ] },
        { t: 'head', kind: 'practice', vi: 'Luyện tập', en: 'Practice' },
        { t: 'ex', kind: 'practice', no: 1, body: [P('Một người kéo thùng gỗ trượt 5 m trên sàn bằng lực 40 N hợp với phương ngang góc 60°. Tính công của lực kéo.', 'A person drags a crate 5 m along the floor with a 40 N force at 60° to the horizontal. Find the work of the pulling force.')], solution: [P('$A = F s \\cos\\alpha = 40 \\cdot 5 \\cdot \\cos 60° = 100$ J.', '$A = F s \\cos\\alpha = 40 \\cdot 5 \\cdot \\cos 60° = 100$ J.')] },
        { t: 'ex', kind: 'practice', no: 2, body: [P('Cần cẩu nâng vật nặng 2 000 N lên cao 15 m trong 20 s. Tính công suất của cần cẩu.', 'A crane lifts a 2 000 N load 15 m in 20 s. Find its power.')], solution: [P('$A = 2\\,000 \\cdot 15 = 30\\,000$ J; $\\mathcal{P} = 30\\,000 / 20 = 1\\,500$ W $= 1{,}5$ kW.', '$A = 2\\,000 \\cdot 15 = 30\\,000$ J; $\\mathcal{P} = 30\\,000 / 20 = 1\\,500$ W $= 1.5$ kW.')] },
        { t: 'head', kind: 'apply', vi: 'Vận dụng', en: 'Apply' },
        { t: 'ex', kind: 'apply', no: 1, body: [P('Một chiếc máy bơm 750 W hoạt động liên tục 2 giờ. Tính công mà máy thực hiện, theo jun và theo kJ.', 'A 750 W pump runs for 2 hours. Find the work it does in joules and kilojoules.')], solution: [P('$t = 7\\,200$ s; $A = \\mathcal{P} t = 750 \\cdot 7\\,200 = 5{,}4 \\cdot 10^{6}$ J $= 5\\,400$ kJ.', '$t = 7\\,200$ s; $A = \\mathcal{P} t = 750 \\cdot 7\\,200 = 5.4 \\cdot 10^{6}$ J $= 5\\,400$ kJ.')] },
        { t: 'quiz', title: { vi: 'Tự kiểm tra', en: 'Self-check' }, items: [
          Q('q1', 'Công của lực $F$ làm vật dịch chuyển $s$ theo hướng của lực là:', 'The work of a force $F$ moving an object $s$ along the force is:', [['$A = F / s$', '$A = F / s$'], ['$A = F \\cdot s$', '$A = F \\cdot s$'], ['$A = s / F$', '$A = s / F$'], ['$A = F + s$', '$A = F + s$']], 1, 'Công bằng lực nhân quãng đường theo hướng của lực.', 'Work is force times the distance along the force.'),
          Q('q2', 'Xe nâng dùng lực 700 N nâng thùng hàng lên 2 m. Công là:', 'A forklift raises a crate 2 m with a 700 N force. The work is:', [['350 J', '350 J'], ['702 J', '702 J'], ['1 400 J', '1 400 J'], ['2 800 J', '2 800 J']], 2, '$A = 700 \\cdot 2 = 1\\,400$ J.', '$A = 700 \\cdot 2 = 1\\,400$ J.'),
          Q('q3', 'Lực vuông góc với hướng dịch chuyển thì công của lực:', 'A force perpendicular to the displacement does work:', [['Bằng $F s$', 'Equal to $F s$'], ['Bằng 0', 'Equal to 0'], ['Âm', 'Negative'], ['Lớn nhất', 'The maximum']], 1, '$\\cos 90° = 0$.', '$\\cos 90° = 0$.'),
          Q('q4', 'Lực 60 N, góc $\\alpha = 60°$, dịch chuyển 10 m. Công của lực là:', 'Force 60 N, angle $\\alpha = 60°$, displacement 10 m. The work is:', [['300 J', '300 J'], ['520 J', '520 J'], ['600 J', '600 J'], ['0 J', '0 J']], 0, '$A = 60 \\cdot 10 \\cdot \\cos 60° = 300$ J.', '$A = 60 \\cdot 10 \\cdot \\cos 60° = 300$ J.'),
          Q('q5', 'Công suất là:', 'Power is:', [['Công nhân thời gian', 'Work times time'], ['Tốc độ thực hiện công', 'The rate of doing work'], ['Lực nhân tốc độ góc', 'Force times angular speed'], ['Năng lượng dự trữ', 'Stored energy']], 1, '$\\mathcal{P} = A / t$.', '$\\mathcal{P} = A / t$.'),
          Q('q6', 'Xe nâng 1 (500 N, 1 m, 10 s) có công suất:', 'Forklift 1 (500 N, 1 m, 10 s) has power:', [['5 W', '5 W'], ['50 W', '50 W'], ['500 W', '500 W'], ['5 000 W', '5 000 W']], 1, '$500 / 10 = 50$ W.', '$500 / 10 = 50$ W.'),
          Q('q7', 'Xe nâng 2 (700 N, 1 m, 15 s) có công suất khoảng:', 'Forklift 2 (700 N, 1 m, 15 s) has power about:', [['46,7 W', '46.7 W'], ['50 W', '50 W'], ['105 W', '105 W'], ['700 W', '700 W']], 0, '$700 / 15 \\approx 46{,}7$ W.', '$700 / 15 \\approx 46.7$ W.'),
          Q('q8', 'Bóng đèn 50 W trong 1 giờ chuyển hoá bao nhiêu điện năng?', 'How much electrical energy does a 50 W bulb convert in 1 hour?', [['50 J', '50 J'], ['3 000 J', '3 000 J'], ['180 000 J', '180 000 J'], ['50 kJ', '50 kJ']], 2, '$50 \\cdot 3\\,600 = 180\\,000$ J.', '$50 \\cdot 3\\,600 = 180\\,000$ J.'),
          Q('q9', 'Thực hành ảo (W4.1): giữ F = 60 N, s = 5 m và tăng $\\alpha$ từ 0° đến 90° thì công A:', 'Virtual practical (W4.1): keep F = 60 N, s = 5 m and raise $\\alpha$ from 0° to 90°. The work A:', [['Tăng dần', 'Rises'], ['Giảm dần về 0', 'Falls to 0'], ['Không đổi', 'Stays constant'], ['Đổi dấu', 'Changes sign']], 1, '$A = F s \\cos\\alpha$ giảm từ 300 J về 0.', '$A = F s \\cos\\alpha$ falls from 300 J to 0.'),
          Q('q10', 'Thực hành ảo (W4.2): muốn xe nâng 2 có công suất bằng xe nâng 1 (50 W) khi nâng thùng 700 N lên 1 m thì thời gian là:', 'Virtual practical (W4.2): for forklift 2 to match forklift 1 (50 W) lifting a 700 N crate 1 m, the time must be:', [['10 s', '10 s'], ['14 s', '14 s'], ['15 s', '15 s'], ['20 s', '20 s']], 1, '$t = A / \\mathcal{P} = 700 / 50 = 14$ s.', '$t = A / \\mathcal{P} = 700 / 50 = 14$ s.')
        ] },
        { t: 'key', title: { vi: 'Em đã học', en: 'What you have learned' }, blocks: [
          { t: 'list', items: [
            { vi: 'Công của lực: $A = F s$ (cùng hướng) hoặc $A = F s \\cos\\alpha$; đơn vị jun (J).', en: 'Work of a force: $A = F s$ (along the motion) or $A = F s \\cos\\alpha$; unit joule (J).' },
            { vi: 'Công suất $\\mathcal{P} = \\frac{A}{t}$; đơn vị oát (W), 1 W = 1 J/s.', en: 'Power $\\mathcal{P} = \\frac{A}{t}$; unit watt (W), 1 W = 1 J/s.' }
          ] }
        ] },
        { t: 'key', title: { vi: 'Em có thể', en: 'You can' }, blocks: [
          { t: 'list', items: [{ vi: 'Tính công và công suất trong các trường hợp đơn giản, và so sánh xem thiết bị nào làm việc nhanh hơn.', en: 'Calculate work and power in simple cases and compare which device works faster.' }] }
        ] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          { vi: 'Công đo phần năng lượng được truyền khi lực làm vật dịch chuyển.', en: 'Work measures the energy transferred when a force moves an object.' },
          { vi: 'Lực vuông góc với dịch chuyển không sinh công.', en: 'A force perpendicular to the motion does no work.' },
          { vi: 'Công suất cho biết công được thực hiện nhanh hay chậm.', en: 'Power tells how fast the work is done.' }
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.',
          keys: ['phys-work', 'power', 'phys-force', 'displacement', 'phys-joule', 'watt', 'newton', 'forklift', 'crate', 'heat-transfer', 'angle', 'phys-perp', 'phys-horse', 'calorie', 'phys-stopwatch', 'phys-heart'] }
      ] }
    ]
  };
  /* Dấu {từ|khoá} chỉ có tác dụng trong chuỗi tiếng Anh: bỏ khỏi chuỗi tiếng Việt nếu lỡ viết. */
  (function strip(o) {
    if (Array.isArray(o)) o.forEach(strip);
    else if (o && typeof o === 'object') { for (const k in o) { if (k === 'vi' && typeof o[k] === 'string') o[k] = o[k].replace(/\{([^{}|]+)\|[^{}]+\}/g, '$1'); else strip(o[k]); } }
  })(D.lessons['khtn9-bai4'].pages);
})();
