/* ==========================================================================
   KHOA HỌC TỰ NHIÊN 9 — CHƯƠNG III. ĐIỆN
     'khtn9-bai13'  Bài 13. Năng lượng của dòng điện và công suất điện (tr. 64–66)
   NỘI DUNG NGUYÊN BẢN do nhóm dự án soạn theo cấu trúc mục, số hiệu hình, công thức và số liệu của bài;
   không phải bản chép sách giáo khoa. Hãy đối chiếu với sách in trước khi dùng chính thức.
   Số liệu tự tính: xem circuit-power.js (selfTest). Giá điện chỉ là ví dụ do học sinh nhập.
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
  const L1 = (vi, en) => ({ vi, en });

  Object.assign(D.glossary, {
    'pw-energy': g('electrical energy', '/ɪˈlek.trɪ.kəl ˈen.ə.dʒi/', 'n', 'điện năng', 'Trong KHTN: Năng lượng của dòng điện; W = UIt.', 'The motor uses electrical energy.', 'Động cơ tiêu thụ điện năng.'),
    'pw-power': g('electrical power', '/ɪˈlek.trɪ.kəl ˈpaʊ.ər/', 'n', 'công suất điện', 'Trong KHTN: Điện năng tiêu thụ trong một giây; 𝒫 = UI.', 'The power of the bulb is 66 W.', 'Công suất của bóng đèn là 66 W.'),
    'pw-rated-power': g('rated power', '/ˈreɪ.tɪd ˈpaʊ.ər/', 'n', 'công suất định mức', 'Trong KHTN: Công suất khi thiết bị hoạt động bình thường ở hiệu điện thế định mức.', 'The rated power is printed on the bulb.', 'Công suất định mức được ghi trên bóng đèn.'),
    'pw-rated-voltage': g('rated voltage', '/ˈreɪ.tɪd ˈvəʊl.tɪdʒ/', 'n', 'hiệu điện thế định mức', 'Trong KHTN: Hiệu điện thế mà thiết bị được thiết kế để dùng.', 'Connect it to its rated voltage.', 'Hãy nối nó vào hiệu điện thế định mức.'),
    'pw-watt': g('watt', '/wɒt/', 'n', 'oát (W)', 'Trong KHTN: Đơn vị công suất, 1 W = 1 J/s.', 'A 60-watt bulb.', 'Bóng đèn 60 oát.'),
    'pw-kwh': g('kilowatt-hour', '/ˈkɪl.ə.wɒt ˈaʊə/', 'n', 'ki-lô-oát giờ (kWh)', 'Trong KHTN: Đơn vị điện năng; 1 kWh = 3,6·10⁶ J.', 'The meter counts kilowatt-hours.', 'Công tơ đếm số ki-lô-oát giờ.'),
    'pw-joule': g('joule', '/dʒuːl/', 'n', 'jun (J)', 'Trong KHTN: Đơn vị năng lượng trong hệ SI.', 'The energy is 10 800 joules.', 'Năng lượng là 10 800 jun.'),
    'pw-meter': g('electricity meter', '/ɪˌlekˈtrɪs.ɪ.ti ˈmiː.tər/', 'n', 'công tơ điện', 'Trong KHTN: Dụng cụ đo điện năng tiêu thụ, đơn vị kWh.', 'Read the electricity meter every month.', 'Đọc công tơ điện mỗi tháng.'),
    'pw-consumption': g('consumption', '/kənˈsʌmp.ʃən/', 'n', 'sự tiêu thụ', 'Trong KHTN: Lượng điện năng đã dùng.', 'Energy consumption fell.', 'Lượng điện tiêu thụ đã giảm.'),
    'pw-tariff': g('tariff', '/ˈtær.ɪf/', 'n', 'giá điện (biểu giá)', 'Trong KHTN: Giá tiền cho mỗi kWh điện, do công ty điện lực quy định.', 'Check the current tariff.', 'Hãy kiểm tra biểu giá điện hiện hành.')
  });

  D.lessons['khtn9-bai13'] = {
    gradeId: 9, number: '13', book: 'Khoa học tự nhiên 9',
    title: { vi: 'Năng lượng của dòng điện và công suất điện', en: 'Electrical energy and electrical power' },
    topic: { label: 'Chương', labelEn: 'Chapter', number: 'III', vi: 'Điện', en: 'Electricity' },
    spreadLabels: ['Điện năng và công suất', 'Công suất định mức, công tơ điện'],
    pages: [
      { number: 64, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: { vi: 'Mục tiêu. Sau bài này em sẽ:', en: 'Aims. After this lesson you will:' }, items: [
          L1('Nêu được điện năng là năng lượng của dòng điện; viết và dùng công thức $W = UIt$.', 'State that electrical energy is the energy of current; write and use $W = UIt$.'),
          L1('Nêu và dùng công thức công suất $\\mathcal{P} = UI$; hiểu số ghi trên thiết bị (công suất định mức).', 'State and use the power formula $\\mathcal{P} = UI$; understand the rated power on a device.'),
          L1('Tính được điện năng tiêu thụ và tiền điện, biết đọc công tơ điện.', 'Calculate the energy consumed and the cost, and read an electricity meter.')
        ] },
        { t: 'h2', n: 'I', vi: 'Điện năng', en: 'Electrical energy' },
        { t: 'ask', style: 'num', lead: { vi: 'Câu hỏi', en: 'Questions' }, items: [
          B('Nêu ví dụ cho thấy dòng điện có năng lượng.', 'Give examples showing that electric current carries energy.'),
          B('Các thiết bị điện (động cơ, bóng đèn, bếp điện…) biến đổi điện năng thành những dạng năng lượng nào?', 'Into which forms of energy do electrical devices (motors, bulbs, stoves…) convert electrical energy?')
        ] },
        P('Điện năng tiêu thụ của một đoạn mạch có hiệu điện thế $U$, cường độ dòng điện $I$ trong thời gian $t$ là:', 'The electrical energy consumed by a circuit section with voltage $U$ and current $I$ over time $t$ is:'),
        M('W = UIt', '(13.1)'),
        P('Đơn vị: $U$ (V), $I$ (A), $t$ (s) thì $W$ tính bằng {jun|pw-joule} (J). Với đoạn mạch chỉ có điện trở, $I = U/R$ nên $W = \\frac{U^2}{R}t = I^2Rt$.', 'Units: with $U$ in V, $I$ in A and $t$ in s, $W$ is in {joules|pw-joule} (J). For a purely resistive section $I = U/R$, so $W = \\frac{U^2}{R}t = I^2Rt$.'),
        { t: 'ex', kind: 'example', no: 1, body: [P('Một động cơ điện hoạt động ở hiệu điện thế $12\\ \\text{V}$ với cường độ dòng điện $0{,}5\\ \\text{A}$ trong $30$ phút. Tính điện năng động cơ tiêu thụ.', 'An electric motor runs at $12\\ \\text{V}$ with a current of $0.5\\ \\text{A}$ for $30$ minutes. Calculate the electrical energy it consumes.')], solution: [P('$t = 30 \\times 60 = 1800$ s; $W = UIt = 12 \\times 0{,}5 \\times 1800 = 10\\,800$ J.', '$t = 30 \\times 60 = 1800$ s; $W = UIt = 12 \\times 0.5 \\times 1800 = 10{,}800$ J.')] },
        { t: 'ex', kind: 'example', no: 2, body: [P('Một bóng đèn có điện trở $12\\ \\Omega$ được nối vào hiệu điện thế $3{,}5\\ \\text{V}$ và sáng trong $4$ phút. Tính điện năng bóng đèn tiêu thụ.', 'A bulb of resistance $12\\ \\Omega$ is connected to $3.5\\ \\text{V}$ and lights for $4$ minutes. Calculate the electrical energy it consumes.')], solution: [P('$I = U/R = 3{,}5/12 \\approx 0{,}292$ A; $t = 240$ s; $W = \\frac{U^2}{R}t = \\frac{3{,}5^2 \\times 240}{12} = 245$ J.', '$I = U/R = 3.5/12 \\approx 0.292$ A; $t = 240$ s; $W = \\frac{U^2}{R}t = \\frac{3.5^2 \\times 240}{12} = 245$ J.')] },
        { t: 'activity', no: 1, title: { vi: 'Thực hành ảo: tính điện năng W = UIt', en: 'Virtual practical: computing W = UIt' },
          vi: 'Kéo U, I, t và quan sát 𝒫, W (J và kWh). Chọn “Bài 1”, “Bài 2” để làm hai ví dụ, nhập đáp số rồi bấm “Kiểm tra”.', en: 'Move U, I, t and watch 𝒫 and W (J and kWh). Pick “Ex. 1” or “Ex. 2”, enter your answer and press “Check”.' }
      ] },
      { number: 65, blocks: [
        { t: 'h2', n: 'II', vi: 'Công suất điện', en: 'Electrical power' },
        P('{Công suất điện|pw-power} là điện năng tiêu thụ trong một đơn vị thời gian: $\\mathcal{P} = W/t$. Từ $W = UIt$ suy ra:', '{Electrical power|pw-power} is the electrical energy consumed per unit time: $\\mathcal{P} = W/t$. From $W = UIt$ we get:'),
        M('\\mathcal{P} = UI', '(13.2)'),
        P('Đơn vị của công suất là {oát|pw-watt} (W): $1\\ \\text{W} = 1\\ \\text{J/s}$; $1\\ \\text{kW} = 1000\\ \\text{W}$.', 'The unit of power is the {watt|pw-watt} (W): $1\\ \\text{W} = 1\\ \\text{J/s}$; $1\\ \\text{kW} = 1000\\ \\text{W}$.'),
        { t: 'ex', kind: 'example', no: 3, body: [P('Bóng đèn $220\\ \\text{V}$ có cường độ dòng điện $0{,}3\\ \\text{A}$, dùng trong $3$ giờ. Tính công suất và điện năng tiêu thụ.', 'A $220\\ \\text{V}$ bulb draws $0.3\\ \\text{A}$ and is used for $3$ hours. Calculate its power and the energy consumed.')], solution: [P('$\\mathcal{P} = UI = 220 \\times 0{,}3 = 66$ W; $W = \\mathcal{P}t = 66 \\times 10\\,800 = 712\\,800$ J $\\approx 0{,}198$ kWh.', '$\\mathcal{P} = UI = 220 \\times 0.3 = 66$ W; $W = \\mathcal{P}t = 66 \\times 10{,}800 = 712{,}800$ J $\\approx 0.198$ kWh.')] },
        { t: 'h2', n: 'III', vi: 'Công suất định mức', en: 'Rated power' },
        P('Trên các thiết bị điện thường ghi hai số: {hiệu điện thế định mức|pw-rated-voltage} và {công suất định mức|pw-rated-power}. Ví dụ bóng đèn ở Hình 13.1 ghi $220\\ \\text{V} - 60\\ \\text{W}$: khi dùng ở $220\\ \\text{V}$ thì công suất của đèn là $60\\ \\text{W}$.', 'Electrical devices usually show two numbers: the {rated voltage|pw-rated-voltage} and the {rated power|pw-rated-power}. For example the bulb in Figure 13.1 shows $220\\ \\text{V} - 60\\ \\text{W}$: used on $220\\ \\text{V}$ its power is $60\\ \\text{W}$.'),
        FIG('khtn13a', '13.1', 'Bóng đèn ghi 220 V – 60 W', 'A bulb marked 220 V – 60 W', true),
        { t: 'ask', style: 'num', lead: { vi: 'Câu hỏi', en: 'Questions' }, items: [
          B('Nêu ý nghĩa các số ghi trên bóng đèn pin $2{,}5\\ \\text{V} - 2{,}5\\ \\text{W}$, bàn là $220\\ \\text{V} - 1\\,000\\ \\text{W}$ và bóng đèn $110\\ \\text{V} - 100\\ \\text{W}$; tính cường độ dòng điện định mức của mỗi thiết bị.', 'State the meaning of the numbers on a $2.5\\ \\text{V} - 2.5\\ \\text{W}$ torch bulb, a $220\\ \\text{V} - 1{,}000\\ \\text{W}$ iron and a $110\\ \\text{V} - 100\\ \\text{W}$ bulb; find the rated current of each.'),
          B('Bóng đèn $220\\ \\text{V} - 60\\ \\text{W}$ sáng bình thường trong $4$ giờ. Tính điện năng tiêu thụ và cường độ dòng điện qua đèn.', 'A $220\\ \\text{V} - 60\\ \\text{W}$ bulb lights normally for $4$ hours. Find the energy consumed and the current through it.')
        ] },
        { t: 'activity', no: 2, title: { vi: 'Thực hành ảo: công suất định mức', en: 'Virtual practical: rated power' },
          vi: 'Chọn thiết bị và đổi hiệu điện thế từ 0 đến 250 V: quan sát độ sáng, cường độ dòng điện, công suất thực so với định mức; thử bóng 110 V – 100 W trên 220 V.', en: 'Pick a device and change the voltage from 0 to 250 V: watch the brightness, current and actual power compared with the rating; try the 110 V – 100 W bulb on 220 V.' },
        { t: 'activity', no: 3, title: { vi: 'Thực hành ảo: ý nghĩa các số ghi trên thiết bị', en: 'Virtual practical: what the numbers mean' },
          vi: 'Chọn nguồn đúng cho từng thiết bị rồi đọc I = 𝒫/U và điện trở R = U²/𝒫.', en: 'Choose the right source for each device and read I = 𝒫/U and the resistance R = U²/𝒫.' }
      ] },
      { number: 66, blocks: [
        { t: 'tip', items: [
          L1('Em có biết: {công tơ điện|pw-meter} dùng để đo điện năng tiêu thụ. Công tơ cơ (Hình 13.2a) có đĩa quay và các chữ số; công tơ điện tử (Hình 13.2b) hiện số trên màn hình. Hiệu hai số chỉ ở hai thời điểm là điện năng tiêu thụ, tính bằng {kWh|pw-kwh}: mỗi số đếm ứng với $1\\ \\text{kWh} = 3{,}6 \\cdot 10^6\\ \\text{J}$.', 'Did you know? An {electricity meter|pw-meter} measures the electrical energy consumed. A mechanical meter (Figure 13.2a) has a spinning disc and digits; an electronic meter (Figure 13.2b) shows the number on a screen. The difference between two readings is the energy consumed, in {kWh|pw-kwh}: each count equals $1\\ \\text{kWh} = 3.6 \\cdot 10^6\\ \\text{J}$.')
        ] },
        FIG('khtn13b', '13.2', 'Công tơ điện cơ (a) và công tơ điện tử (b)', 'Mechanical (a) and electronic (b) electricity meters', true),
        { t: 'activity', no: 1, title: { vi: 'Thực hành ảo: công tơ điện và tiền điện', en: 'Virtual practical: the meter and the bill' },
          vi: 'Bật các thiết bị trong nhà, chọn công suất và số giờ dùng mỗi ngày; đọc số công tơ lúc đầu và cuối tháng rồi trừ để tìm điện năng; tự nhập giá điện để tính tiền (giá mặc định chỉ là ví dụ).', en: 'Switch on the appliances at home, choose each one’s power and daily hours; read the meter at the start and end of the month and subtract to find the energy; enter your own tariff to find the cost (the default is only an example).' },
        { t: 'quiz', title: { vi: 'Tự kiểm tra', en: 'Self-check' }, items: [
          Q('q1', 'Công thức tính điện năng tiêu thụ của đoạn mạch là:', 'The formula for the electrical energy consumed is:', [['$W = U/It$', '$W = U/It$'], ['$W = UIt$', '$W = UIt$'], ['$W = UI/t$', '$W = UI/t$'], ['$W = I/Ut$', '$W = I/Ut$']], 1, '$W = UIt$ (J khi U: V, I: A, t: s).', '$W = UIt$ (J with U in V, I in A, t in s).'),
          Q('q2', 'Động cơ $12\\ \\text{V}$, $0{,}5\\ \\text{A}$ chạy $30$ phút tiêu thụ:', 'A $12\\ \\text{V}$, $0.5\\ \\text{A}$ motor running for $30$ min consumes:', [['180 J', '180 J'], ['10 800 J', '10,800 J'], ['6 J', '6 J'], ['360 J', '360 J']], 1, '$12 \\times 0{,}5 \\times 1800 = 10\\,800$ J.', '$12 \\times 0.5 \\times 1800 = 10,800$ J.'),
          Q('q3', 'Bóng $3{,}5\\ \\text{V}$, $12\\ \\Omega$ sáng $4$ phút. Điện năng tiêu thụ xấp xỉ:', 'A $3.5\\ \\text{V}$, $12\\ \\Omega$ bulb lights for $4$ min. The energy is about:', [['245 J', '245 J'], ['70 J', '70 J'], ['3,5 J', '3.5 J'], ['980 J', '980 J']], 0, '$U^2t/R = 12{,}25 \\times 240/12 = 245$ J.', '$U^2t/R = 12.25 \\times 240/12 = 245$ J.'),
          Q('q4', 'Công suất điện được tính bằng:', 'Electrical power is calculated by:', [['$\\mathcal{P} = U/I$', '$\\mathcal{P} = U/I$'], ['$\\mathcal{P} = UI$', '$\\mathcal{P} = UI$'], ['$\\mathcal{P} = I/U$', '$\\mathcal{P} = I/U$'], ['$\\mathcal{P} = U + I$', '$\\mathcal{P} = U + I$']], 1, '$\\mathcal{P} = UI = W/t$.', '$\\mathcal{P} = UI = W/t$.'),
          Q('q5', 'Bóng $220\\ \\text{V}$, $0{,}3\\ \\text{A}$ có công suất:', 'A $220\\ \\text{V}$, $0.3\\ \\text{A}$ bulb has power:', [['66 W', '66 W'], ['73 W', '73 W'], ['660 W', '660 W'], ['6,6 W', '6.6 W']], 0, '$220 \\times 0{,}3 = 66$ W.', '$220 \\times 0.3 = 66$ W.'),
          Q('q6', 'Dùng bóng ở câu q5 trong $3$ giờ, điện năng tiêu thụ xấp xỉ:', 'Using the bulb of q5 for $3$ h, the energy is about:', [['0,198 kWh', '0.198 kWh'], ['0,66 kWh', '0.66 kWh'], ['198 kWh', '198 kWh'], ['2 kWh', '2 kWh']], 0, '$66\\ \\text{W} \\times 3\\ \\text{h} = 198\\ \\text{Wh} = 0{,}198$ kWh.', '$66\\ \\text{W} \\times 3\\ \\text{h} = 198\\ \\text{Wh} = 0.198$ kWh.'),
          Q('q7', 'Số ghi $220\\ \\text{V} - 60\\ \\text{W}$ trên bóng đèn có nghĩa là:', 'The marking $220\\ \\text{V} - 60\\ \\text{W}$ on a bulb means:', [['Hiệu điện thế định mức 220 V, công suất định mức 60 W', 'Rated voltage 220 V, rated power 60 W'], ['Luôn tiêu thụ 60 W', 'It always uses 60 W'], ['Chịu được tối đa 220 W', 'It tolerates at most 220 W'], ['Dòng điện 220 A', 'The current is 220 A']], 0, 'Đó là các giá trị khi thiết bị hoạt động bình thường.', 'These are the values in normal operation.'),
          Q('q8', 'Dòng điện định mức của bóng $220\\ \\text{V} - 60\\ \\text{W}$:', 'The rated current of a $220\\ \\text{V} - 60\\ \\text{W}$ bulb:', [['0,273 A', '0.273 A'], ['3,67 A', '3.67 A'], ['13 200 A', '13,200 A'], ['0,0045 A', '0.0045 A']], 0, '$I = \\mathcal{P}/U = 60/220 \\approx 0{,}273$ A.', '$I = \\mathcal{P}/U = 60/220 \\approx 0.273$ A.'),
          Q('q9', 'Dòng điện định mức của bàn là $220\\ \\text{V} - 1\\,000\\ \\text{W}$:', 'The rated current of a $220\\ \\text{V} - 1{,}000\\ \\text{W}$ iron:', [['4,55 A', '4.55 A'], ['0,22 A', '0.22 A'], ['220 A', '220 A'], ['1 A', '1 A']], 0, '$1000/220 \\approx 4{,}55$ A.', '$1000/220 \\approx 4.55$ A.'),
          Q('q10', 'Đèn $220\\ \\text{V} - 60\\ \\text{W}$ sáng bình thường $4$ giờ tiêu thụ:', 'A $220\\ \\text{V} - 60\\ \\text{W}$ lamp lit normally for $4$ h consumes:', [['0,24 kWh', '0.24 kWh'], ['0,06 kWh', '0.06 kWh'], ['2,4 kWh', '2.4 kWh'], ['240 kWh', '240 kWh']], 0, '$60 \\times 4 = 240$ Wh $= 0{,}24$ kWh $= 864\\,000$ J.', '$60 \\times 4 = 240$ Wh $= 0.24$ kWh $= 864,000$ J.'),
          Q('q11', '$1\\ \\text{kWh}$ bằng:', '$1\\ \\text{kWh}$ equals:', [['$3{,}6 \\cdot 10^6$ J', '$3.6 \\cdot 10^6$ J'], ['$3\\,600$ J', '$3,600$ J'], ['$10^3$ J', '$10^3$ J'], ['$36 \\cdot 10^6$ J', '$36 \\cdot 10^6$ J']], 0, '$1000\\ \\text{W} \\times 3600\\ \\text{s} = 3{,}6 \\cdot 10^6$ J.', '$1000\\ \\text{W} \\times 3600\\ \\text{s} = 3.6 \\cdot 10^6$ J.'),
          Q('q12', 'Bóng $100\\ \\text{W}$ dùng $5$ giờ mỗi ngày trong $30$ ngày tiêu thụ:', 'A $100\\ \\text{W}$ bulb used $5$ h a day for $30$ days consumes:', [['15 kWh', '15 kWh'], ['1,5 kWh', '1.5 kWh'], ['150 kWh', '150 kWh'], ['0,5 kWh', '0.5 kWh']], 0, '$0{,}1 \\times 5 \\times 30 = 15$ kWh.', '$0.1 \\times 5 \\times 30 = 15$ kWh.'),
          Q('q13', 'Công tơ chỉ $2573$ kWh đầu tháng và $2598$ kWh cuối tháng. Điện năng tiêu thụ:', 'The meter reads $2573$ kWh at the start and $2598$ kWh at the end. The energy consumed:', [['25 kWh', '25 kWh'], ['2598 kWh', '2598 kWh'], ['5171 kWh', '5171 kWh'], ['2,5 kWh', '2.5 kWh']], 0, 'Lấy số cuối trừ số đầu: $2598 - 2573 = 25$ kWh.', 'End minus start: $2598 - 2573 = 25$ kWh.'),
          Q('q14', 'Thực hành ảo: bóng $110\\ \\text{V} - 100\\ \\text{W}$ nối vào $220\\ \\text{V}$ (R không đổi) thì công suất thực là:', 'Virtual practical: a $110\\ \\text{V} - 100\\ \\text{W}$ bulb on $220\\ \\text{V}$ (R unchanged) has actual power:', [['400 W (bóng có thể cháy)', '400 W (it may burn out)'], ['100 W', '100 W'], ['200 W', '200 W'], ['50 W', '50 W']], 0, '$R = 110^2/100 = 121\\ \\Omega$; $\\mathcal{P} = 220^2/121 = 400$ W.', '$R = 110^2/100 = 121\\ \\Omega$; $\\mathcal{P} = 220^2/121 = 400$ W.')
        ] },
        { t: 'key', title: { vi: 'Em đã học', en: 'What you have learned' }, blocks: [{ t: 'list', items: [
          L1('Điện năng $W = UIt$; công suất $\\mathcal{P} = UI$; $1\\ \\text{kWh} = 3{,}6 \\cdot 10^6\\ \\text{J}$.', 'Energy $W = UIt$; power $\\mathcal{P} = UI$; $1\\ \\text{kWh} = 3.6 \\cdot 10^6\\ \\text{J}$.'),
          L1('Số ghi trên thiết bị là hiệu điện thế và công suất định mức.', 'The numbers on a device are its rated voltage and rated power.')
        ] }] },
        { t: 'key', title: { vi: 'Em có thể', en: 'You can' }, blocks: [{ t: 'list', items: [
          L1('Tính điện năng tiêu thụ trong một tháng và tiền điện của các thiết bị trong gia đình.', 'Calculate the monthly energy and cost of the appliances in your home.'),
          L1('Đọc được công tơ điện.', 'Read an electricity meter.')
        ] }] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          L1('$W = UIt = \\mathcal{P}t$; $\\mathcal{P} = UI$; đơn vị J, W, kWh.', '$W = UIt = \\mathcal{P}t$; $\\mathcal{P} = UI$; units J, W, kWh.'),
          L1('Dùng thiết bị đúng hiệu điện thế định mức thì công suất bằng công suất định mức.', 'Used at the rated voltage, a device’s power equals its rated power.')
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.', keys: ['pw-energy', 'pw-power', 'pw-rated-power', 'pw-rated-voltage', 'pw-watt', 'pw-kwh', 'pw-joule', 'pw-meter', 'pw-consumption', 'pw-tariff'] }
      ] }
    ]
  };
  (function strip(o) {
    if (Array.isArray(o)) o.forEach(strip);
    else if (o && typeof o === 'object') { for (const k in o) { if (k === 'vi' && typeof o[k] === 'string') o[k] = o[k].replace(/\{([^{}|]+)\|[^{}]+\}/g, '$1'); else strip(o[k]); } }
  })(D.lessons['khtn9-bai13'].pages);
})();
