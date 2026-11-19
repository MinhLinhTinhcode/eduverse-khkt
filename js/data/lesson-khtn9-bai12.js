/* ==========================================================================
   KHOA HỌC TỰ NHIÊN 9 — CHƯƠNG III. ĐIỆN
     'khtn9-bai12'  Bài 12. Đoạn mạch nối tiếp, song song (tr. 60–63)
   NỘI DUNG NGUYÊN BẢN do nhóm dự án soạn theo cấu trúc mục, số hiệu hình/bảng, công thức và số liệu của bài;
   không phải bản chép sách giáo khoa. Hãy đối chiếu với sách in trước khi dùng chính thức.
   Lưu ý số liệu: Bảng 12.1 in 0,54 A cho cặp R₁, R₃ (12/22 ≈ 0,545 A); các số khác khớp I = U/R_tđ.
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
  const L1 = (vi, en) => ({ vi, en });

  Object.assign(D.glossary, {
    'elec-series': g('series', '/ˈsɪə.riːz/', 'n', 'nối tiếp', 'Trong KHTN: Cách mắc các linh kiện nối đuôi nhau thành một đường duy nhất, cùng một dòng điện đi qua. (Nghĩa khác: chuỗi, loạt phim.)', 'Two bulbs in series share one current.', 'Hai bóng mắc nối tiếp có chung một dòng điện.'),
    'elec-parallel': g('parallel', '/ˈpær.ə.lel/', 'adj', 'song song', 'Trong KHTN: Cách mắc các linh kiện vào cùng hai điểm nút, mỗi linh kiện nằm trên một nhánh riêng. (Nghĩa khác: song song nhau trong hình học.)', 'The bulbs are connected in parallel.', 'Các bóng đèn được mắc song song.'),
    'elec-equivalent-resistance': g('equivalent resistance', '/ɪˈkwɪv.ə.lənt rɪˈzɪs.təns/', 'n', 'điện trở tương đương', 'Trong KHTN: Điện trở có thể thay thế cả đoạn mạch mà dòng điện vẫn như cũ khi hiệu điện thế không đổi.', 'The equivalent resistance of 2 Ω and 3 Ω in series is 5 Ω.', 'Điện trở tương đương của 2 Ω và 3 Ω nối tiếp là 5 Ω.'),
    'elec-branch': g('branch', '/brɑːntʃ/', 'n', 'nhánh (mạch)', 'Trong KHTN: Một đường riêng của mạch song song giữa hai nút. (Nghĩa khác: cành cây.)', 'Each branch has its own current.', 'Mỗi nhánh có dòng điện riêng.'),
    'elec-main-circuit': g('main circuit', '/meɪn ˈsɜː.kɪt/', 'n', 'mạch chính', 'Trong KHTN: Phần mạch chứa nguồn, nơi dòng điện chưa tách ra các nhánh.', 'The main-circuit current is the sum of the branch currents.', 'Dòng ở mạch chính bằng tổng dòng các nhánh.'),
    'elec-node': g('node', '/noʊd/', 'n', 'nút (mạch điện)', 'Trong KHTN: Điểm nơi từ ba dây dẫn trở lên gặp nhau, dòng điện tách ra hoặc nhập lại.', 'Current splits at the node.', 'Dòng điện tách ra tại nút.'),
    'elec-source': g('power source', '/ˈpaʊ.ər sɔːs/', 'n', 'nguồn điện', 'Trong KHTN: Thiết bị tạo ra hiệu điện thế để duy trì dòng điện trong mạch, như pin, ắc quy.', 'A 12 V power source drives the circuit.', 'Nguồn điện 12 V làm mạch hoạt động.')
  });

  D.lessons['khtn9-bai12'] = {
    gradeId: 9, number: '12', book: 'Khoa học tự nhiên 9',
    title: { vi: 'Đoạn mạch nối tiếp, song song', en: 'Series and parallel circuits' },
    topic: { label: 'Chương', labelEn: 'Chapter', number: 'III', vi: 'Điện', en: 'Electricity' },
    spreadLabels: ['Đoạn mạch nối tiếp', 'Song song và ôn tập'],
    pages: [
      { number: 60, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: { vi: 'Mục tiêu. Sau bài này em sẽ:', en: 'Aims. After this lesson you will:' }, items: [
          L1('Làm thí nghiệm để rút ra: ở đoạn mạch nối tiếp, cường độ dòng điện như nhau tại mọi điểm; ở đoạn mạch song song, cường độ dòng ở mạch chính bằng tổng cường độ dòng ở các nhánh.', 'Experiment to find that in a {series|elec-series} circuit the current is the same everywhere, and in a {parallel|elec-parallel} circuit the main current equals the sum of the branch currents.'),
          L1('Tính được cường độ dòng điện trong đoạn mạch nối tiếp, song song đơn giản.', 'Calculate currents in simple series and parallel circuits.'),
          L1('Nêu và dùng công thức điện trở tương đương của đoạn mạch nối tiếp, song song.', 'State and use the formulas for the {equivalent resistance|elec-equivalent-resistance} of series and parallel circuits.'),
          L1('Lắp mạch điện và đo cường độ dòng điện trong mạch nối tiếp và song song.', 'Build circuits and measure currents in series and parallel circuits.')
        ] },
        { t: 'ask', style: 'num', lead: { vi: 'Khởi động', en: 'Warm-up' }, items: [B('Có hai bóng đèn, dây nối và nguồn điện. Mắc các đèn thế nào vào hai cực nguồn để khi một bóng cháy thì bóng kia vẫn sáng? Vẽ sơ đồ mạch điện.', 'You have two bulbs, leads and a power source. How should the bulbs be connected to the two terminals so that when one burns out the other stays lit? Draw the circuit diagram.')] },
        { t: 'activity', no: 1, title: { vi: 'Thực hành ảo: nối tiếp hay song song?', en: 'Virtual practical: series or parallel?' },
          vi: 'Chọn số bóng giống nhau và so sánh hai cách mắc với nguồn 6 V. Bấm “Một bóng cháy” để xem mỗi cách mắc ứng xử thế nào, rồi trả lời câu khởi động.', en: 'Choose the number of identical bulbs and compare the two ways of connecting them to a 6 V source. Press “One bulb burns out” to see how each behaves, then answer the warm-up question.' },
        { t: 'h2', n: 'I', vi: 'Đoạn mạch nối tiếp', en: 'Series circuits' },
        { t: 'h3', vi: '1. Điện trở của đoạn mạch nối tiếp', en: '1. Resistance of a series circuit' },
        P('Đoạn mạch gồm các điện trở nối đuôi nhau như Hình 12.1 gọi là đoạn mạch nối tiếp. {Điện trở tương đương|elec-equivalent-resistance} của đoạn mạch là điện trở có thể thay thế cả các điện trở đó mà khi đặt cùng hiệu điện thế vào hai đầu đoạn mạch, dòng điện qua mạch vẫn như trước.', 'Resistors joined end to end as in Figure 12.1 form a series circuit. The {equivalent resistance|elec-equivalent-resistance} is the resistance that can replace them so that, with the same voltage across the circuit, the current stays the same.'),
        FIG('khtn12a', '12.1', 'Sơ đồ đoạn mạch nối tiếp (a) và mạch điện có hai bóng đèn nối tiếp (b)', 'A series circuit diagram (a) and a circuit with two bulbs in series (b)', true),
        M('R_{td} = R_1 + R_2', '(12.1)'),
        M('R_{td} = R_1 + R_2 + \\dots + R_n', '(12.2)')
      ] },
      { number: 61, blocks: [
        { t: 'h3', vi: '2. Đặc điểm của đoạn mạch nối tiếp', en: '2. Features of a series circuit' },
        { t: 'list', items: [
          L1('Chuẩn bị: nguồn một chiều 12 V; ba điện trở $R_1 = 6\\ \\Omega$, $R_2 = 10\\ \\Omega$, $R_3 = 16\\ \\Omega$; hai ampe kế giới hạn đo 3 A, độ chia nhỏ nhất 0,01 A; công tắc, dây nối.', 'Prepare: a 12 V DC source; three resistors $R_1 = 6\\ \\Omega$, $R_2 = 10\\ \\Omega$, $R_3 = 16\\ \\Omega$; two ammeters with range 3 A and smallest division 0.01 A; a switch and leads.')
        ] },
        FIG('khtn12b', '12.2', 'Sơ đồ mạch điện thí nghiệm tìm hiểu đặc điểm mạch nối tiếp', 'Circuit diagram: features of a series circuit', true),
        { t: 'olist', items: [
          L1('Mắc $R_1$ và $R_2$ cùng hai ampe kế theo sơ đồ Hình 12.2.', 'Connect $R_1$ and $R_2$ with the two ammeters as in Figure 12.2.'),
          L1('Đóng công tắc, đọc số chỉ hai ampe kế và ghi vào Bảng 12.1.', 'Close the switch, read both ammeters and note them in Table 12.1.'),
          L1('Lặp lại với cặp $R_1$, $R_3$ rồi cặp $R_2$, $R_3$.', 'Repeat with the pair $R_1$, $R_3$ and then $R_2$, $R_3$.')
        ] },
        { t: 'table', head: true, rows: [
          [C('Điện trở mắc vào mạch', 'Resistors in the circuit'), C('A₁ (A)', 'A₁ (A)'), C('A₂ (A)', 'A₂ (A)')],
          [C('$R_1$ và $R_2$', '$R_1$ and $R_2$'), C('0,75', '0.75'), C('0,75', '0.75')],
          [C('$R_1$ và $R_3$', '$R_1$ and $R_3$'), C('0,54', '0.54'), C('0,54', '0.54')],
          [C('$R_2$ và $R_3$', '$R_2$ and $R_3$'), C('0,46', '0.46'), C('0,46', '0.46')]
        ] },
        { t: 'p', vi: 'Bảng 12.1. (Kiểm tra: $I = U/R_{td}$; ví dụ $12/16 = 0{,}75$ A; $12/22 \\approx 0{,}545$ A, sách ghi làm tròn 0,54 A; $12/26 \\approx 0{,}46$ A.)', en: 'Table 12.1. (Check: $I = U/R_{eq}$; e.g. $12/16 = 0.75$ A; $12/22 \\approx 0.545$ A, which the book rounds to 0.54 A; $12/26 \\approx 0.46$ A.)' },
        { t: 'activity', no: 2, title: { vi: 'Thực hành ảo: đo dòng trong mạch nối tiếp (Bảng 12.1)', en: 'Virtual practical: current in a series circuit (Table 12.1)' },
          vi: 'Nối $R_1$ với $R_2$ nối tiếp (đã có ampe kế $A_1$); đặt thêm ampe kế $A_2$ ở chỗ khác, đóng công tắc, bấm “Ghi kết quả”. Lặp lại với cặp $R_1,R_3$ và $R_2,R_3$ (kéo thêm dây hoặc tháo dây bằng “Xoá”). Thử đổi vị trí ampe kế: số chỉ có đổi không?', en: 'Wire $R_1$ in series with $R_2$ (ammeter $A_1$ is already there); put $A_2$ somewhere else, close the switch and press “Record”. Repeat with $R_1,R_3$ and $R_2,R_3$ (add wires or remove them with “Delete”). Move an ammeter: does the reading change?' },
        { t: 'key', title: { vi: 'Kết luận', en: 'Conclusion' }, blocks: [
          P('Trong đoạn mạch gồm hai điện trở nối tiếp: $I = I_1 = I_2$. Với $n$ điện trở nối tiếp:', 'In a circuit of two resistors in series: $I = I_1 = I_2$. With $n$ resistors in series:'),
          M('I = I_1 = I_2 = \\dots = I_n', '(12.3)')
        ] },
        { t: 'ex', kind: 'example', no: 1, body: [P('Hai điện trở $R_1 = 2\\ \\Omega$, $R_2 = 3\\ \\Omega$ mắc nối tiếp; dòng điện qua $R_1$ là $1\\ \\text{A}$. Tính: a) điện trở tương đương; b) hiệu điện thế giữa hai đầu mỗi điện trở; c) hiệu điện thế giữa hai đầu đoạn mạch.', 'Two resistors $R_1 = 2\\ \\Omega$, $R_2 = 3\\ \\Omega$ are in series; the current through $R_1$ is $1\\ \\text{A}$. Find: a) the equivalent resistance; b) the voltage across each resistor; c) the voltage across the whole circuit.')], solution: [
          P('a) $R_{td} = 2 + 3 = 5\\ \\Omega$. b) Nối tiếp nên $I_2 = I_1 = 1\\ \\text{A}$: $U_1 = I R_1 = 2\\ \\text{V}$, $U_2 = I R_2 = 3\\ \\text{V}$. c) $U = U_1 + U_2 = 5\\ \\text{V}$ (cũng bằng $I R_{td} = 5$ V).', 'a) $R_{eq} = 2 + 3 = 5\\ \\Omega$. b) In series $I_2 = I_1 = 1\\ \\text{A}$: $U_1 = I R_1 = 2\\ \\text{V}$, $U_2 = I R_2 = 3\\ \\text{V}$. c) $U = U_1 + U_2 = 5\\ \\text{V}$ (also $I R_{eq} = 5$ V).')] },
        { t: 'h2', n: 'II', vi: 'Đoạn mạch song song', en: 'Parallel circuits' },
        { t: 'h3', vi: '1. Điện trở của đoạn mạch song song', en: '1. Resistance of a parallel circuit' },
        P('Đoạn mạch gồm các điện trở mắc vào hai điểm chung như Hình 12.3a gọi là đoạn mạch song song. Hai điểm chung gọi là {nút|elec-node}; mỗi đường riêng giữa hai nút là một {nhánh|elec-branch}.', 'Resistors joined between two common points as in Figure 12.3a form a parallel circuit. The common points are {nodes|elec-node}; each separate path between them is a {branch|elec-branch}.'),
        FIG('khtn12c', '12.3', 'Sơ đồ đoạn mạch song song (a) và mạch điện có hai bóng đèn song song (b)', 'A parallel circuit diagram (a) and a circuit with two bulbs in parallel (b)', true)
      ] },
      { number: 62, blocks: [
        P('Điện trở tương đương của đoạn mạch gồm hai điện trở mắc song song:', 'The equivalent resistance of two resistors in parallel:'),
        M('\\frac{1}{R_{td}} = \\frac{1}{R_1} + \\frac{1}{R_2}', '(12.4)'),
        P('Với $n$ điện trở mắc song song:', 'With $n$ resistors in parallel:'),
        M('\\frac{1}{R_{td}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\dots + \\frac{1}{R_n}', '(12.5)'),
        { t: 'h3', vi: '2. Đặc điểm của đoạn mạch song song', en: '2. Features of a parallel circuit' },
        { t: 'list', items: [
          L1('Chuẩn bị: nguồn một chiều 6 V; hai điện trở $R_1 = 10\\ \\Omega$, $R_2 = 6\\ \\Omega$; ba ampe kế giới hạn đo 3 A, độ chia nhỏ nhất 0,01 A; công tắc, dây nối.', 'Prepare: a 6 V DC source; two resistors $R_1 = 10\\ \\Omega$, $R_2 = 6\\ \\Omega$; three ammeters with range 3 A and smallest division 0.01 A; a switch and leads.')
        ] },
        FIG('khtn12d', '12.4', 'Sơ đồ mạch điện thí nghiệm tìm hiểu đặc điểm mạch song song', 'Circuit diagram: features of a parallel circuit', true),
        { t: 'olist', items: [
          L1('Mắc hai điện trở và ba ampe kế theo sơ đồ Hình 12.4.', 'Connect the two resistors and three ammeters as in Figure 12.4.'),
          L1('Đóng công tắc, đọc dòng ở {mạch chính|elec-main-circuit} (ampe kế $A_1$) và ở hai nhánh (ampe kế $A_2$, $A_3$), ghi vào Bảng 12.2.', 'Close the switch and read the current in the {main circuit|elec-main-circuit} (ammeter $A_1$) and in the two branches ($A_2$, $A_3$); record them in Table 12.2.')
        ] },
        { t: 'table', head: true, rows: [
          [C('Ampe kế', 'Ammeter'), C('Số chỉ', 'Reading')],
          [C('$A_1$: $I$', '$A_1$: $I$'), C('1,60 A', '1.60 A')], [C('$A_2$: $I_1$', '$A_2$: $I_1$'), C('0,60 A', '0.60 A')], [C('$A_3$: $I_2$', '$A_3$: $I_2$'), C('1,00 A', '1.00 A')]
        ] },
        { t: 'p', vi: 'Bảng 12.2. Số chỉ các ampe kế trong mạch song song (nguồn 6 V; $R_1 = 10\\ \\Omega$, $R_2 = 6\\ \\Omega$).', en: 'Table 12.2. Ammeter readings in the parallel circuit (6 V source; $R_1 = 10\\ \\Omega$, $R_2 = 6\\ \\Omega$).' },
        { t: 'activity', no: 3, title: { vi: 'Thực hành ảo: đo dòng trong mạch song song (Bảng 12.2)', en: 'Virtual practical: current in a parallel circuit (Table 12.2)' },
          vi: 'Nối $R_1$ và $R_2$ song song giữa hai nút (A₂ nối tiếp $R_1$, A₃ nối tiếp $R_2$, A₁ ở mạch chính), đóng công tắc rồi bấm “Ghi kết quả”. So sánh $I$ với $I_1 + I_2$.', en: 'Wire $R_1$ and $R_2$ in parallel between two nodes ($A_2$ in series with $R_1$, $A_3$ with $R_2$, $A_1$ in the main line), close the switch and press “Record”. Compare $I$ with $I_1 + I_2$.' },
        { t: 'key', title: { vi: 'Kết luận', en: 'Conclusion' }, blocks: [
          P('Dòng ở mạch chính của hai điện trở song song: $I = I_1 + I_2$; với $n$ điện trở song song:', 'Main current of two resistors in parallel: $I = I_1 + I_2$; with $n$ resistors in parallel:'),
          M('I = I_1 + I_2 + \\dots + I_n', '(12.6)')
        ] },
        { t: 'ex', kind: 'example', no: 2, body: [P('Hai điện trở $R_1 = 20\\ \\Omega$ và $R_2 = 40\\ \\Omega$ mắc song song vào hiệu điện thế $24\\ \\text{V}$. a) Tính điện trở tương đương. b) Tính cường độ dòng điện ở mạch chính.', 'Two resistors $R_1 = 20\\ \\Omega$ and $R_2 = 40\\ \\Omega$ are in parallel across $24\\ \\text{V}$. a) Find the equivalent resistance. b) Find the main current.')], solution: [
          P('a) $\\frac{1}{R_{td}} = \\frac{1}{20} + \\frac{1}{40} = \\frac{3}{40}$ nên $R_{td} = \\frac{40}{3} \\approx 13{,}3\\ \\Omega$. b) $I = \\frac{U}{R_{td}} = \\frac{24}{40/3} = 1{,}8\\ \\text{A}$ (kiểm tra: $I_1 = 1{,}2$ A, $I_2 = 0{,}6$ A, tổng $1{,}8$ A).', 'a) $\\frac{1}{R_{eq}} = \\frac{1}{20} + \\frac{1}{40} = \\frac{3}{40}$ so $R_{eq} = \\frac{40}{3} \\approx 13.3\\ \\Omega$. b) $I = \\frac{U}{R_{eq}} = \\frac{24}{40/3} = 1.8\\ \\text{A}$ (check: $I_1 = 1.2$ A, $I_2 = 0.6$ A, sum $1.8$ A).')] }
      ] },
      { number: 63, blocks: [
        { t: 'head', kind: 'practice', vi: 'Em có biết: hiệu điện thế và điện trở', en: 'Did you know: voltage and resistance' },
        { t: 'list', items: [
          L1('Nối tiếp: $U = I R_1 + I R_2 + \\dots = U_1 + U_2 + \\dots + U_n$ (vì cùng $I$); $R_{td}$ lớn hơn mọi điện trở thành phần.', 'In series: $U = I R_1 + I R_2 + \\dots = U_1 + U_2 + \\dots + U_n$ (same $I$); $R_{eq}$ is larger than any single resistor.'),
          L1('Song song: $U_1 = U_2 = \\dots = U_n = U$ (cùng hai nút); $R_{td}$ nhỏ hơn mọi điện trở thành phần.', 'In parallel: $U_1 = U_2 = \\dots = U_n = U$ (same two nodes); $R_{eq}$ is smaller than any single resistor.')
        ] },
        { t: 'head', kind: 'practice', vi: 'Vận dụng', en: 'Apply' },
        { t: 'ex', kind: 'apply', no: 1, body: [P('Giải thích vì sao đèn, ti vi, tủ lạnh… trong nhà được mắc song song với nguồn điện.', 'Explain why lamps, TVs and fridges at home are connected in parallel to the supply.')], solution: [P('Mắc song song thì mỗi thiết bị nhận đúng hiệu điện thế định mức của nguồn, hoạt động độc lập: tắt hay hỏng một thiết bị không làm các thiết bị khác ngừng. Nếu mắc nối tiếp, hiệu điện thế bị chia nhỏ và hỏng một cái là cả mạch hở.', 'In parallel each appliance gets the full rated voltage of the supply and works independently: switching off or breaking one does not stop the others. In series the voltage would be shared and one failure opens the whole circuit.')] },
        { t: 'activity', no: 4, title: { vi: 'Thiết kế dây đèn “cành đào, cành mai ngày Tết”', en: 'Design Tet lights for “peach and apricot branches”' },
          vi: 'Nối bốn bóng đèn thành mạch theo cách em chọn (nối tiếp, song song hoặc hỗn hợp). Đóng công tắc rồi bấm “Một bóng cháy”: dây đèn tốt là dây mà các bóng còn lại vẫn sáng. Thử vẽ sơ đồ trong vở.', en: 'Wire the four bulbs your way (series, parallel or mixed). Close the switch and press “One bulb burns out”: a good string keeps the other bulbs lit. Try drawing the diagram in your notebook.' },
        { t: 'quiz', title: { vi: 'Tự kiểm tra', en: 'Self-check' }, items: [
          Q('q1', 'Trong đoạn mạch nối tiếp, cường độ dòng điện:', 'In a series circuit the current is:', [['Bằng nhau tại mọi điểm', 'The same everywhere'], ['Lớn nhất ở điện trở nhỏ nhất', 'Largest in the smallest resistor'], ['Giảm dần dọc mạch', 'Decreasing along the circuit'], ['Bằng tổng các nhánh', 'The sum of branches']], 0, 'Chỉ có một đường đi nên cùng một dòng điện đi qua mọi linh kiện.', 'There is only one path, so the same current flows through every part.'),
          Q('q2', 'Điện trở tương đương của $2\\ \\Omega$ và $3\\ \\Omega$ mắc nối tiếp là:', 'The equivalent resistance of $2\\ \\Omega$ and $3\\ \\Omega$ in series is:', [['1,2 Ω', '1.2 Ω'], ['5 Ω', '5 Ω'], ['6 Ω', '6 Ω'], ['2,5 Ω', '2.5 Ω']], 1, '$R_{td} = 2 + 3 = 5\\ \\Omega$.', '$R_{eq} = 2 + 3 = 5\\ \\Omega$.'),
          Q('q3', 'Hai điện trở $2\\ \\Omega$, $3\\ \\Omega$ nối tiếp, dòng $1\\ \\text{A}$. Hiệu điện thế hai đầu $R_1$ là:', 'Resistors $2\\ \\Omega$, $3\\ \\Omega$ in series carry $1\\ \\text{A}$. The voltage across $R_1$ is:', [['2 V', '2 V'], ['3 V', '3 V'], ['5 V', '5 V'], ['0,5 V', '0.5 V']], 0, '$U_1 = I R_1 = 1 \\cdot 2 = 2\\ \\text{V}$.', '$U_1 = I R_1 = 1 \\cdot 2 = 2\\ \\text{V}$.'),
          Q('q4', 'Hiệu điện thế hai đầu đoạn mạch của q3 là:', 'The voltage across the whole circuit in q3 is:', [['2 V', '2 V'], ['3 V', '3 V'], ['5 V', '5 V'], ['6 V', '6 V']], 2, '$U = U_1 + U_2 = 2 + 3 = 5\\ \\text{V}$.', '$U = U_1 + U_2 = 2 + 3 = 5\\ \\text{V}$.'),
          Q('q5', 'Công thức điện trở tương đương của hai điện trở song song là:', 'The equivalent resistance of two resistors in parallel is:', [['$R_1 + R_2$', '$R_1 + R_2$'], ['$\\frac{1}{R_1} + \\frac{1}{R_2}$', '$\\frac{1}{R_1} + \\frac{1}{R_2}$'], ['$\\frac{R_1 R_2}{R_1 + R_2}$', '$\\frac{R_1 R_2}{R_1 + R_2}$'], ['$R_1 R_2$', '$R_1 R_2$']], 2, 'Từ $\\frac{1}{R_{td}} = \\frac{1}{R_1} + \\frac{1}{R_2}$ suy ra $R_{td} = \\frac{R_1 R_2}{R_1 + R_2}$.', 'From $\\frac{1}{R_{eq}} = \\frac{1}{R_1} + \\frac{1}{R_2}$ we get $R_{eq} = \\frac{R_1 R_2}{R_1 + R_2}$.'),
          Q('q6', '$20\\ \\Omega$ song song $40\\ \\Omega$ có điện trở tương đương:', '$20\\ \\Omega$ in parallel with $40\\ \\Omega$ has equivalent resistance:', [['60 Ω', '60 Ω'], ['30 Ω', '30 Ω'], ['13,3 Ω', '13.3 Ω'], ['10 Ω', '10 Ω']], 2, '$\\frac{20 \\cdot 40}{60} = 13{,}3\\ \\Omega$, nhỏ hơn cả hai điện trở.', '$\\frac{20 \\cdot 40}{60} = 13.3\\ \\Omega$, smaller than both.'),
          Q('q7', 'Hai điện trở trên mắc vào $24\\ \\text{V}$: dòng ở mạch chính là:', 'The two resistors above are across $24\\ \\text{V}$: the main current is:', [['0,4 A', '0.4 A'], ['1,8 A', '1.8 A'], ['0,6 A', '0.6 A'], ['3,6 A', '3.6 A']], 1, '$I = 24/13{,}3 = 1{,}8\\ \\text{A}$.', '$I = 24/13.3 = 1.8\\ \\text{A}$.'),
          Q('q8', 'Dòng qua $R_1 = 20\\ \\Omega$ và $R_2 = 40\\ \\Omega$ (24 V) lần lượt là:', 'The currents through $R_1 = 20\\ \\Omega$ and $R_2 = 40\\ \\Omega$ (24 V) are:', [['1,2 A và 0,6 A', '1.2 A and 0.6 A'], ['0,6 A và 1,2 A', '0.6 A and 1.2 A'], ['0,9 A và 0,9 A', '0.9 A and 0.9 A'], ['1,8 A và 1,8 A', '1.8 A and 1.8 A']], 0, 'Song song nên cùng $24\\ \\text{V}$: $I_1 = 24/20 = 1{,}2$ A; $I_2 = 24/40 = 0{,}6$ A.', 'Same $24\\ \\text{V}$: $I_1 = 24/20 = 1.2$ A; $I_2 = 24/40 = 0.6$ A.'),
          Q('q9', 'Điện trở tương đương của đoạn mạch song song:', 'The equivalent resistance of a parallel circuit is:', [['Lớn hơn mọi điện trở thành phần', 'Larger than every single resistor'], ['Nhỏ hơn mọi điện trở thành phần', 'Smaller than every single resistor'], ['Bằng tổng các điện trở', 'The sum of the resistors'], ['Bằng điện trở lớn nhất', 'Equal to the largest']], 1, 'Thêm nhánh song song mở thêm đường cho dòng nên $R_{td}$ giảm.', 'Each extra branch opens another path so $R_{eq}$ falls.'),
          Q('q10', 'Thiết bị điện trong nhà được mắc song song để:', 'Home appliances are connected in parallel so that:', [['Mỗi thiết bị nhận đủ hiệu điện thế và hoạt động độc lập', 'Each gets the full voltage and works independently'], ['Dòng qua chúng nhỏ hơn', 'Less current flows'], ['Điện trở tăng', 'The resistance increases'], ['Tiết kiệm dây dẫn', 'It saves wire']], 0, 'Các nhánh song song có chung hiệu điện thế và độc lập với nhau.', 'Parallel branches share the voltage and are independent.'),
          Q('q11', 'Hai bóng nối tiếp, một bóng bị cháy (đứt dây tóc). Bóng còn lại:', 'Two bulbs are in series and one burns out (filament breaks). The other bulb:', [['Sáng hơn', 'Gets brighter'], ['Tắt', 'Goes out'], ['Sáng như cũ', 'Stays the same'], ['Nhấp nháy', 'Flickers']], 1, 'Mạch bị hở nên không có dòng điện nữa.', 'The circuit opens so no current flows.'),
          Q('q12', 'Theo Bảng 12.2, $I_1 = 0{,}60$ A và $I_2 = 1{,}00$ A. Dòng ở mạch chính là:', 'In Table 12.2, $I_1 = 0.60$ A and $I_2 = 1.00$ A. The main current is:', [['0,40 A', '0.40 A'], ['0,60 A', '0.60 A'], ['1,00 A', '1.00 A'], ['1,60 A', '1.60 A']], 3, '$I = I_1 + I_2 = 1{,}60\\ \\text{A}$.', '$I = I_1 + I_2 = 1.60\\ \\text{A}$.'),
          Q('q13', 'Thực hành ảo: cần $R_{td} = 4\\ \\Omega$ từ hai điện trở $6\\ \\Omega$ và $12\\ \\Omega$. Phải mắc:', 'Virtual practical: you need $R_{eq} = 4\\ \\Omega$ from $6\\ \\Omega$ and $12\\ \\Omega$. You must connect them:', [['Nối tiếp', 'In series'], ['Song song', 'In parallel'], ['Chỉ dùng một điện trở', 'Use just one'], ['Không làm được', 'Impossible']], 1, 'Song song: $\\frac{6 \\cdot 12}{18} = 4\\ \\Omega$; nối tiếp cho $18\\ \\Omega$.', 'Parallel: $\\frac{6 \\cdot 12}{18} = 4\\ \\Omega$; series gives $18\\ \\Omega$.'),
          Q('q14', 'Nguồn 12 V nối với $R_1 = 6\\ \\Omega$ và $R_2 = 10\\ \\Omega$ nối tiếp. Dòng điện là:', 'A 12 V source feeds $R_1 = 6\\ \\Omega$ and $R_2 = 10\\ \\Omega$ in series. The current is:', [['0,75 A', '0.75 A'], ['2 A', '2 A'], ['1,2 A', '1.2 A'], ['0,5 A', '0.5 A']], 0, '$I = 12/16 = 0{,}75\\ \\text{A}$ (khớp Bảng 12.1).', '$I = 12/16 = 0.75\\ \\text{A}$ (matches Table 12.1).')
        ] },
        { t: 'key', title: { vi: 'Em đã học', en: 'What you have learned' }, blocks: [{ t: 'list', items: [
          L1('Nối tiếp: $I = I_1 = I_2$; $R_{td} = R_1 + R_2$; $U = U_1 + U_2$.', 'Series: $I = I_1 = I_2$; $R_{eq} = R_1 + R_2$; $U = U_1 + U_2$.'),
          L1('Song song: $I = I_1 + I_2$; $\\frac{1}{R_{td}} = \\frac{1}{R_1} + \\frac{1}{R_2}$; $U = U_1 = U_2$.', 'Parallel: $I = I_1 + I_2$; $\\frac{1}{R_{eq}} = \\frac{1}{R_1} + \\frac{1}{R_2}$; $U = U_1 = U_2$.')
        ] }] },
        { t: 'key', title: { vi: 'Em có thể', en: 'You can' }, blocks: [{ t: 'list', items: [
          L1('Giải thích vì sao thiết bị điện trong nhà được mắc song song.', 'Explain why household appliances are connected in parallel.'),
          L1('Thiết kế sơ đồ mạch điện dùng bóng đèn trang trí “cành đào, cành mai ngày Tết”.', 'Design a circuit of decorative bulbs for Tet “peach and apricot branches”.')
        ] }] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          L1('Nối tiếp: cùng dòng, $R_{td} = \\sum R_i$ (lớn hơn mỗi điện trở).', 'Series: same current, $R_{eq} = \\sum R_i$ (larger than each resistor).'),
          L1('Song song: cùng hiệu điện thế, $I = \\sum I_i$, $\\frac{1}{R_{td}} = \\sum \\frac{1}{R_i}$ (nhỏ hơn mỗi điện trở).', 'Parallel: same voltage, $I = \\sum I_i$, $\\frac{1}{R_{eq}} = \\sum \\frac{1}{R_i}$ (smaller than each resistor).')
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.', keys: ['elec-series', 'elec-parallel', 'elec-equivalent-resistance', 'elec-branch', 'elec-main-circuit', 'elec-node', 'elec-source', 'elec-ammeter', 'elec-voltage', 'elec-resistor'] }
      ] }
    ]
  };
  (function strip(o) {
    if (Array.isArray(o)) o.forEach(strip);
    else if (o && typeof o === 'object') { for (const k in o) { if (k === 'vi' && typeof o[k] === 'string') o[k] = o[k].replace(/\{([^{}|]+)\|[^{}]+\}/g, '$1'); else strip(o[k]); } }
  })(D.lessons['khtn9-bai12'].pages);
})();
