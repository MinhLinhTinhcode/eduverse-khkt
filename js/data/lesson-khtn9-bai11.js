/* ==========================================================================
   KHOA HỌC TỰ NHIÊN 9 — CHƯƠNG III. ĐIỆN
     'khtn9-bai11'  Bài 11. Điện trở. Định luật Ohm (tr. 53–59)
   NỘI DUNG NGUYÊN BẢN do nhóm dự án soạn theo cấu trúc mục, số hiệu hình/bảng, công thức và số liệu của bài;
   không phải bản chép sách giáo khoa. Hãy đối chiếu với sách in trước khi dùng chính thức.
   Số liệu Bảng 11.3 đọc từ bản quét: cần đối chiếu lại với sách in.
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
    'elec-resistance': g('resistance', '/rɪˈzɪs.təns/', 'n', 'điện trở (đại lượng)', 'Trong KHTN: Đại lượng đặc trưng cho mức cản trở dòng điện của một đoạn dây dẫn; đo bằng ôm (Ω). (Nghĩa khác: sự chống lại, sức đề kháng.)', 'The resistance of this wire is 5 ohms.', 'Điện trở của đoạn dây này là 5 ôm.'),
    'elec-resistor': g('resistor', '/rɪˈzɪs.tər/', 'n', 'điện trở (linh kiện)', 'Trong KHTN: Linh kiện được chế tạo để có một giá trị điện trở xác định trong mạch.', 'Each resistor has coloured bands on its body.', 'Mỗi điện trở có các vòng màu trên thân.'),
    'elec-rheostat': g('rheostat', '/ˈriː.ə.stæt/', 'n', 'biến trở', 'Trong KHTN: Điện trở có thể thay đổi giá trị bằng con chạy, dùng để điều chỉnh dòng điện hoặc hiệu điện thế.', 'Slide the rheostat to change the current.', 'Dịch con chạy biến trở để đổi cường độ dòng điện.'),
    'elec-ammeter': g('ammeter', '/ˈæm.iː.tər/', 'n', 'ampe kế', 'Trong KHTN: Dụng cụ đo cường độ dòng điện; luôn mắc nối tiếp với phần cần đo.', 'Connect the ammeter in series.', 'Mắc ampe kế nối tiếp.'),
    'elec-voltmeter': g('voltmeter', '/ˈvoʊlt.mi.tər/', 'n', 'vôn kế', 'Trong KHTN: Dụng cụ đo hiệu điện thế; luôn mắc song song với phần cần đo.', 'The voltmeter reads 6 volts.', 'Vôn kế chỉ 6 vôn.'),
    'elec-current': g('current', '/ˈkʌr.ənt/', 'n', 'cường độ dòng điện', 'Trong KHTN: Đại lượng cho biết mức mạnh yếu của dòng điện; kí hiệu I, đơn vị ampe (A). (Nghĩa khác: dòng nước, hiện tại.)', 'A larger voltage drives a larger current.', 'Hiệu điện thế lớn hơn tạo ra dòng điện lớn hơn.'),
    'elec-voltage': g('voltage', '/ˈvoʊl.tɪdʒ/', 'n', 'hiệu điện thế (điện áp)', 'Trong KHTN: Đại lượng tạo ra dòng điện chạy qua một đoạn mạch; kí hiệu U, đơn vị vôn (V).', 'The voltage across the lamp is 2.5 V.', 'Hiệu điện thế giữa hai đầu đèn là 2,5 V.'),
    'elec-ohms-law': g('Ohm’s law', '/oʊmz lɔː/', 'n', 'định luật Ohm', 'Trong KHTN: I = U/R: cường độ dòng điện qua đoạn dây tỉ lệ thuận với hiệu điện thế và tỉ lệ nghịch với điện trở.', 'Ohm’s law links current, voltage and resistance.', 'Định luật Ohm liên hệ cường độ, hiệu điện thế và điện trở.'),
    'elec-ohm': g('ohm', '/oʊm/', 'n', 'ôm (đơn vị điện trở)', 'Trong KHTN: Đơn vị điện trở, kí hiệu Ω; 1 Ω = 1 V / 1 A.', 'The resistor is 47 ohms.', 'Điện trở này là 47 ôm.'),
    'elec-resistivity': g('resistivity', '/ˌriː.zɪˈstɪv.ə.ti/', 'n', 'điện trở suất', 'Trong KHTN: Đặc trưng cho khả năng cản trở dòng điện của một chất; kí hiệu ρ, đơn vị Ω·m.', 'Copper has a low resistivity.', 'Đồng có điện trở suất nhỏ.'),
    'elec-cross-section': g('cross-sectional area', '/ˌkrɒs ˈsek.ʃən.əl ˈeə.ri.ə/', 'n', 'tiết diện', 'Trong KHTN: Diện tích mặt cắt vuông góc với chiều dài dây; kí hiệu S, đơn vị m² (hay mm²).', 'A thicker wire has a larger cross-sectional area.', 'Dây dày hơn có tiết diện lớn hơn.'),
    'elec-conductor': g('conductor', '/kənˈdʌk.tər/', 'n', 'vật dẫn điện', 'Trong KHTN: Vật cho dòng điện chạy qua dễ dàng, như kim loại.', 'Copper is a good conductor.', 'Đồng là vật dẫn điện tốt.'),
    'elec-insulator': g('insulator', '/ˈɪn.sjə.leɪ.tər/', 'n', 'vật cách điện', 'Trong KHTN: Vật hầu như không cho dòng điện chạy qua, như nhựa, sứ, cao su.', 'Plastic is an insulator.', 'Nhựa là vật cách điện.'),
    'elec-colour-code': g('colour code', '/ˈkʌl.ər koʊd/', 'n', 'quy ước vòng màu', 'Trong KHTN: Cách dùng các vòng màu trên thân điện trở để chỉ trị số và sai số.', 'Read the colour code from the end with the bands close together.', 'Đọc vòng màu từ đầu có các vòng gần nhau.'),
    'elec-tolerance': g('tolerance', '/ˈtɒl.ər.əns/', 'n', 'sai số cho phép', 'Trong KHTN: Mức chênh lệch cho phép của trị số điện trở, ví dụ ±5 %. (Nghĩa khác: sự chịu đựng.)', 'The gold band means a tolerance of 5 %.', 'Vòng vàng ánh kim cho sai số 5 %.'),
    'elec-short-circuit': g('short circuit', '/ʃɔːt ˈsɜː.kɪt/', 'n', 'đoản mạch (chập mạch)', 'Trong KHTN: Hai điểm có hiệu điện thế khác nhau bị nối bằng dây có điện trở rất nhỏ, dòng điện rất lớn, rất nguy hiểm.', 'A short circuit can start a fire.', 'Chập mạch có thể gây cháy.'),
    'elec-circuit': g('circuit', '/ˈsɜː.kɪt/', 'n', 'mạch điện', 'Trong KHTN: Đường kín gồm nguồn, dây nối và các linh kiện cho dòng điện chạy qua.', 'Draw the circuit diagram.', 'Vẽ sơ đồ mạch điện.'),
    'elec-switch': g('switch', '/swɪtʃ/', 'n', 'công tắc', 'Trong KHTN: Dụng cụ đóng hoặc ngắt mạch điện. (Nghĩa khác: chuyển đổi.)', 'Close the switch to light the bulb.', 'Đóng công tắc để đèn sáng.')
  });

  const L1 = (vi, en) => ({ vi, en });
  D.lessons['khtn9-bai11'] = {
    gradeId: 9, number: '11', book: 'Khoa học tự nhiên 9',
    title: { vi: 'Điện trở. Định luật Ohm', en: 'Resistance. Ohm’s law' },
    topic: { label: 'Chương', labelEn: 'Chapter', number: 'III', vi: 'Điện', en: 'Electricity' },
    spreadLabels: ['Mở đầu', 'Điện trở và thí nghiệm', 'Đồ thị và định luật Ohm', 'Ví dụ và điện trở suất', 'Điện trở trong kĩ thuật và ôn tập'],
    pages: [
      { number: 53, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: { vi: 'Mục tiêu. Sau bài này em sẽ:', en: 'Aims. After this lesson you will:' }, items: [
          L1('Làm thí nghiệm đơn giản để nêu được điện trở có tác dụng cản trở dòng điện trong mạch.', 'Do a simple experiment showing that {resistance|elec-resistance} opposes the current in a circuit.'),
          L1('Làm thí nghiệm để xây dựng định luật Ohm: cường độ dòng điện qua một đoạn dây tỉ lệ thuận với hiệu điện thế giữa hai đầu và tỉ lệ nghịch với điện trở của nó.', 'Do an experiment to establish {Ohm’s law|elec-ohms-law}: the current through a piece of wire is proportional to the voltage across it and inversely proportional to its resistance.'),
          L1('Nêu được (không cần thành lập) công thức tính điện trở của dây dẫn theo chiều dài, tiết diện và điện trở suất.', 'State (without deriving) the formula for the resistance of a wire in terms of length, cross-section and {resistivity|elec-resistivity}.'),
          L1('Dùng công thức đó để tính điện trở của một đoạn dây dẫn.', 'Use that formula to calculate the resistance of a piece of wire.')
        ] },
        { t: 'ask', style: 'num', lead: { vi: 'Khởi động', en: 'Warm-up' }, items: [
          B('Nếu lần lượt thay điện trở trong sơ đồ mạch điện (Hình 11.1) bằng các điện trở khác nhau thì số chỉ của ampe kế có thay đổi không?', 'If you replace the resistor in the circuit diagram (Figure 11.1) by different resistors in turn, does the ammeter reading change?'),
          B('Nếu đổi sang các nguồn điện khác nhau thì cường độ dòng điện qua điện trở có thay đổi không?', 'If you use different power sources, does the current through the resistor change?')
        ] },
        { t: 'h2', n: 'I', vi: 'Điện trở', en: 'Resistance' },
        { t: 'h3', vi: 'Thí nghiệm tìm hiểu tính chất của điện trở', en: 'Experiment: properties of a resistor' },
        { t: 'list', items: [
          L1('Chuẩn bị: nguồn điện một chiều 12 V; một bóng đèn 2,5 V; ba vật dẫn là ba điện trở $R_1$, $R_2$, $R_3$; công tắc và dây nối.', 'Prepare: a 12 V DC source; a 2.5 V {bulb|elec-bulb}; three conductors, the resistors $R_1$, $R_2$, $R_3$; a {switch|elec-switch} and leads.')
        ] },
        FIG('khtn11a', '11.1', 'Sơ đồ mạch điện tìm hiểu tính chất của điện trở', 'Circuit diagram for studying the properties of a resistor', true),
        { t: 'olist', items: [
          L1('Mắc điện trở $R_1$ vào mạch điện theo sơ đồ Hình 11.1.', 'Connect resistor $R_1$ in the circuit as in Figure 11.1.'),
          L1('Đóng công tắc, quan sát độ sáng bóng đèn và ghi vào Bảng 11.1.', 'Close the switch, watch the brightness of the bulb and note it in Table 11.1.'),
          L1('Lần lượt thay $R_1$ bằng $R_2$ rồi $R_3$; mỗi lần quan sát độ sáng bóng đèn và ghi vào Bảng 11.1.', 'Replace $R_1$ by $R_2$ and then $R_3$; each time observe the brightness and note it in Table 11.1.')
        ] },
        { t: 'activity', no: 1, title: { vi: 'Thực hành ảo: đổi điện trở, xem độ sáng', en: 'Virtual practical: swap the resistor, watch the brightness' },
          vi: 'Trong mạch mô phỏng $R_1$ đã được nối. Tháo dây nối $R_1$ bằng nút “Xoá” rồi nối $R_2$ hoặc $R_3$ vào chỗ đó (kéo từ chấm tròn này sang chấm tròn kia). Độ sáng bóng đèn tỉ lệ với công suất $\\mathcal{P} = U I$ của nó.',
          en: 'In the simulated circuit $R_1$ is already wired. Remove its wire with “Delete” and connect $R_2$ or $R_3$ instead (drag from one dot to another). The bulb brightness is proportional to its power $\\mathcal{P} = U I$.' }
      ] },
      { number: 54, blocks: [
        { t: 'table', head: true, rows: [
          [C('Vật dẫn', 'Conductor'), C('Mô tả độ sáng của bóng đèn', 'Brightness of the bulb')],
          [C('Điện trở $R_1$', 'Resistor $R_1$'), C('?', '?')],
          [C('Điện trở $R_2$', 'Resistor $R_2$'), C('?', '?')],
          [C('Điện trở $R_3$', 'Resistor $R_3$'), C('?', '?')]
        ] },
        { t: 'ask', style: 'num', lead: { vi: 'Thực hiện yêu cầu', en: 'Task' }, items: [B('So sánh độ sáng của bóng đèn trong ba trường hợp và rút ra kết luận về tính chất của điện trở.', 'Compare the brightness in the three cases and draw a conclusion about the property of resistance.')] },
        { t: 'key', title: { vi: 'Kết luận', en: 'Conclusion' }, blocks: [{ t: 'list', items: [
          L1('Điện trở có tác dụng cản trở dòng điện.', 'Resistance opposes the current.'),
          L1('Các điện trở khác nhau cản trở dòng điện khác nhau.', 'Different resistors oppose the current by different amounts.')
        ] }] },
        { t: 'h2', n: 'II', vi: 'Sự phụ thuộc của cường độ dòng điện vào hiệu điện thế', en: 'How the current depends on the voltage' },
        { t: 'h3', vi: '1. Thí nghiệm', en: '1. Experiment' },
        { t: 'list', items: [
          L1('Chuẩn bị: nguồn điện một chiều 12 V; một {biến trở|elec-rheostat}; một {ampe kế|elec-ammeter} và một {vôn kế|elec-voltmeter}; vật dẫn là một điện trở; công tắc và dây nối.', 'Prepare: a 12 V DC source; a {rheostat|elec-rheostat}; an {ammeter|elec-ammeter} and a {voltmeter|elec-voltmeter}; a resistor as the conductor; a switch and leads.')
        ] },
        FIG('khtn11b', '11.2', 'Sơ đồ mạch điện tìm hiểu sự phụ thuộc của cường độ dòng điện vào hiệu điện thế', 'Circuit diagram: how the current depends on the voltage', true),
        { t: 'olist', items: [
          L1('Mắc mạch điện theo sơ đồ Hình 11.2.', 'Build the circuit as in Figure 11.2.'),
          L1('Đóng khoá K, điều chỉnh biến trở để hiệu điện thế giữa hai đầu đoạn mạch AB lần lượt là 0 V, 3 V, 6 V, 9 V, 12 V; ghi số chỉ ampe kế mỗi lần vào Bảng 11.2.', 'Close K and adjust the rheostat so the voltage across AB is 0 V, 3 V, 6 V, 9 V, 12 V in turn; record the ammeter reading each time in Table 11.2.')
        ] },
        { t: 'table', head: true, rows: [
          [C('Lần đo', 'Trial'), C('U (V)', 'U (V)'), C('I (A)', 'I (A)')],
          [C('1', '1'), C('0', '0'), C('0,0', '0.0')], [C('2', '2'), C('3', '3'), C('0,5', '0.5')], [C('3', '3'), C('6', '6'), C('?', '?')], [C('4', '4'), C('9', '9'), C('1,5', '1.5')], [C('5', '5'), C('12', '12'), C('?', '?')]
        ] },
        { t: 'activity', no: 2, title: { vi: 'Thực hành ảo: thí nghiệm định luật Ohm (Bảng 11.2)', en: 'Virtual practical: the Ohm’s law experiment (Table 11.2)' },
          vi: 'Bấm “Đặt U” để kéo con chạy biến trở tới hiệu điện thế mong muốn (hoặc tự kéo con chạy), đọc ampe kế trên thang chia vạch rồi bấm “Ghi kết quả”. Ô “?” trong sách (ở 6 V và 12 V) em tự đo được. Sau khi ghi từ 3 cặp trở lên, đồ thị $I$–$U$ hiện bên cạnh. Mặc định điện trở $R = 6\\ \\Omega$.',
          en: 'Press “Set U” to slide the rheostat to the wanted voltage (or drag the slider yourself), read the ammeter on its graduated scale and press “Record”. The “?” cells of the book (at 6 V and 12 V) are for you to measure. With 3 or more pairs the $I$–$U$ graph appears beside the table. By default $R = 6\\ \\Omega$.' }
      ] },
      { number: 55, blocks: [
        { t: 'ask', style: 'num', lead: { vi: 'Thực hiện các yêu cầu sau', en: 'Do the following' }, items: [
          B('Nhận xét sự thay đổi của cường độ dòng điện qua vật dẫn khi thay đổi hiệu điện thế giữa hai đầu vật dẫn.', 'Describe how the current through the conductor changes when the voltage across it changes.'),
          B('Rút ra mối quan hệ giữa cường độ dòng điện qua vật dẫn và hiệu điện thế giữa hai đầu vật dẫn.', 'State the relation between the current through the conductor and the voltage across it.'),
          B('Dự đoán giá trị cường độ dòng điện ở các ô còn trống của Bảng 11.2.', 'Predict the current in the blank cells of Table 11.2.')
        ] },
        { t: 'h3', vi: '2. Đồ thị biểu diễn sự phụ thuộc của $I$ vào $U$', en: '2. Graph of $I$ against $U$' },
        FIG('khtn11c', '11.3', 'Hệ toạ độ để biểu diễn sự phụ thuộc của cường độ dòng điện vào hiệu điện thế', 'Axes to plot the current against the voltage', true),
        { t: 'ask', style: 'num', lead: { vi: 'Làm theo', en: 'Do this' }, items: [
          B('Chọn trục tung là $I$ (A), trục hoành là $U$ (V) như Hình 11.3; dùng số liệu thí nghiệm để vẽ đồ thị $I$ theo $U$.', 'Take $I$ (A) on the vertical axis and $U$ (V) on the horizontal axis as in Figure 11.3; plot $I$ against $U$ from your data.'),
          B('Đồ thị là đường cong hay đường thẳng? Có đi qua gốc toạ độ không?', 'Is the graph a curve or a straight line? Does it pass through the origin?')
        ] },
        { t: 'key', title: { vi: 'Kết luận', en: 'Conclusion' }, blocks: [P('Đồ thị biểu diễn sự phụ thuộc của cường độ dòng điện vào hiệu điện thế là một **đường thẳng đi qua gốc toạ độ**.', 'The graph of current against voltage is a **straight line through the origin**.')] },
        { t: 'h2', n: 'III', vi: 'Định luật Ohm', en: 'Ohm’s law' },
        { t: 'h3', vi: '1. Điện trở của đoạn dây dẫn', en: '1. The resistance of a piece of wire' },
        P('Từ số liệu Bảng 11.2, hãy tính thương số $\\frac{U}{I}$ ở mỗi lần đo (với 3 lần đo có $I \\neq 0$). Em nhận xét gì? Thí nghiệm với các đoạn dây khác cho cùng kết quả: thương số $\\frac{U}{I}$ không đổi với mỗi đoạn dây.',
          'From Table 11.2 compute the quotient $\\frac{U}{I}$ for each trial (the three with $I \\neq 0$). What do you notice? Other pieces of wire give the same result: $\\frac{U}{I}$ stays constant for each piece.'),
        { t: 'key', title: { vi: 'Kết luận', en: 'Conclusion' }, blocks: [{ t: 'list', items: [
          L1('Thương số $\\frac{U}{I}$ không đổi đối với mỗi đoạn dây dẫn gọi là điện trở của đoạn dây đó, kí hiệu $R$.', 'The constant quotient $\\frac{U}{I}$ of a piece of wire is called its resistance, symbol $R$.'),
          L1('Các đoạn dây khác nhau có $R = \\frac{U}{I}$ khác nhau. Với cùng hiệu điện thế, dây nào cho dòng nhỏ hơn thì $R$ lớn hơn.', 'Different wires have different $R = \\frac{U}{I}$. With the same voltage, the wire that gives the smaller current has the larger $R$.'),
          L1('Giá trị $R$ đặc trưng cho sự cản trở dòng điện của đoạn dây.', 'The value of $R$ measures how strongly the wire opposes the current.')
        ] }] }
      ] },
      { number: 56, blocks: [
        { t: 'h3', vi: '2. Đơn vị điện trở', en: '2. The unit of resistance' },
        P('Trong $R = \\frac{U}{I}$, nếu $U$ tính bằng vôn (V) và $I$ bằng ampe (A) thì $R$ tính bằng {ôm|elec-ohm} (Ω):', 'In $R = \\frac{U}{I}$, if $U$ is in volts (V) and $I$ in amperes (A) then $R$ is in {ohms|elec-ohm} (Ω):'),
        M('1\\ \\Omega = \\frac{1\\ \\text{V}}{1\\ \\text{A}}', '(11.1)'),
        { t: 'list', items: [
          L1('Ước của ôm: miliôm, $1\\ \\text{m}\\Omega = 0{,}001\\ \\Omega$.', 'Sub-unit: milliohm, $1\\ \\text{m}\\Omega = 0.001\\ \\Omega$.'),
          L1('Bội của ôm: kilôôm, $1\\ \\text{k}\\Omega = 1\\,000\\ \\Omega$; mêgaôm, $1\\ \\text{M}\\Omega = 1\\,000\\,000\\ \\Omega$.', 'Multiples: kilohm, $1\\ \\text{k}\\Omega = 1{,}000\\ \\Omega$; megohm, $1\\ \\text{M}\\Omega = 1{,}000{,}000\\ \\Omega$.')
        ] },
        { t: 'h3', vi: '3. Định luật Ohm', en: '3. Ohm’s law' },
        P('Các thí nghiệm trên cho phép phát biểu định luật mang tên nhà vật lí Georg Simon Ohm:', 'The experiments above give the law named after the physicist Georg Simon Ohm:'),
        { t: 'key', title: { vi: 'Định luật Ohm', en: 'Ohm’s law' }, blocks: [
          P('Cường độ dòng điện chạy qua một đoạn dây dẫn **tỉ lệ thuận** với hiệu điện thế giữa hai đầu đoạn dây và **tỉ lệ nghịch** với điện trở của nó.', 'The current through a piece of wire is **directly proportional** to the voltage across it and **inversely proportional** to its resistance.'),
          M('I = \\frac{U}{R}', '(11.2)'),
          P('$I$: cường độ dòng điện (A); $U$: hiệu điện thế (V); $R$: điện trở (Ω).', '$I$: current (A); $U$: voltage (V); $R$: resistance (Ω).')
        ] },
        { t: 'head', kind: 'practice', vi: 'Luyện tập', en: 'Practice' },
        { t: 'ex', kind: 'practice', no: 1, body: [P('Bóng đèn xe máy khi sáng có điện trở $12\\ \\Omega$ và dòng điện qua dây tóc là $0{,}5\\ \\text{A}$. Tính hiệu điện thế giữa hai đầu dây tóc.', 'A motorbike bulb has resistance $12\\ \\Omega$ and a current of $0.5\\ \\text{A}$ while lit. Find the voltage across the filament.')], solution: [P('$U = I R = 0{,}5 \\cdot 12 = 6\\ \\text{V}$.', '$U = I R = 0.5 \\cdot 12 = 6\\ \\text{V}$.')] },
        { t: 'ex', kind: 'practice', no: 2, body: [P('Khi hiệu điện thế giữa hai đầu một đoạn mạch là $2\\ \\text{V}$ thì dòng điện là $0{,}4\\ \\text{A}$. Hiệu điện thế phải bằng bao nhiêu để dòng điện là $0{,}8\\ \\text{A}$?', 'With $2\\ \\text{V}$ across a section the current is $0.4\\ \\text{A}$. What voltage is needed for $0.8\\ \\text{A}$?')], solution: [P('$R = \\frac{2}{0{,}4} = 5\\ \\Omega$ (không đổi), nên $U\' = I\' R = 0{,}8 \\cdot 5 = 4\\ \\text{V}$. (Dòng gấp đôi thì $U$ gấp đôi.)', '$R = \\frac{2}{0.4} = 5\\ \\Omega$ (unchanged), so $U\' = I\' R = 0.8 \\cdot 5 = 4\\ \\text{V}$. (Double the current needs double the voltage.)')] },
        { t: 'activity', no: 3, title: { vi: 'Thực hành ảo: $I = U/R$ trên hai đồ thị', en: 'Virtual practical: $I = U/R$ on two graphs' },
          vi: 'Kéo thanh trượt $U$ và $R$; điểm đỏ chạy trên đồ thị $I$–$U$ (với $R$ cố định) và $I$–$R$ (với $U$ cố định). Làm thêm phần “Tìm đại lượng còn thiếu”.', en: 'Move the $U$ and $R$ sliders; the red point moves along the $I$–$U$ graph (fixed $R$) and the $I$–$R$ graph (fixed $U$). Then try “Find the missing quantity”.' },
        { t: 'head', kind: 'practice', vi: 'Em có biết: Georg Simon Ohm', en: 'Did you know: Georg Simon Ohm' },
        FIG('khtn11d', '11.4', 'Biểu tượng ôm (Ω) — khung thay cho chân dung Georg Simon Ohm (1789 – 1854)', 'The ohm symbol (Ω), standing in for a portrait of Georg Simon Ohm (1789 – 1854)', false),
        P('Georg Simon Ohm sinh năm 1789 ở Erlangen (Đức), làm giáo viên dạy vật lí và ước mơ trở thành giáo sư đại học. Ông công bố định luật mang tên mình năm 1827, nhưng lúc đầu chưa được công nhận; hơn mười năm sau, công trình mới được đánh giá đúng và nhiều năm nữa tính tổng quát của định luật mới được chấp nhận hoàn toàn. Để ghi nhớ ông, đơn vị điện trở được đặt tên là ôm.',
          'Georg Simon Ohm was born in 1789 in Erlangen (Germany), worked as a physics teacher and dreamed of becoming a university professor. He published his law in 1827 but it was not accepted at first; over ten years later his work was recognised, and only many years after that was the generality of the law fully accepted. The unit of resistance is named the ohm in his honour.')
      ] },
      { number: 57, blocks: [
        { t: 'h2', n: 'IV', vi: 'Điện trở của dây dẫn phụ thuộc vào kích thước và bản chất của dây', en: 'Resistance depends on the size and material of the wire' },
        P('Các thí nghiệm cho thấy điện trở của một đoạn dây **tỉ lệ thuận với chiều dài**, **tỉ lệ nghịch với {tiết diện|elec-cross-section}** và phụ thuộc vào **bản chất** của chất làm dây:', 'Experiments show that the resistance of a piece of wire is **proportional to its length**, **inversely proportional to its {cross-section|elec-cross-section}** and depends on the **material**:'),
        M('R = \\rho \\frac{l}{S}', '(11.3)'),
        { t: 'list', items: [
          L1('$R$: điện trở của đoạn dây (Ω); $\\rho$ (đọc là rô): điện trở suất của chất làm dây (Ω·m).', '$R$: resistance of the piece of wire (Ω); $\\rho$ (rho): resistivity of the material (Ω·m).'),
          L1('$l$: chiều dài đoạn dây (m); $S$: tiết diện dây (m²).', '$l$: length of the wire (m); $S$: cross-sectional area (m²).')
        ] },
        { t: 'table', head: true, rows: [
          [C('Chất (20 °C)', 'Material (20 °C)'), C('ρ (Ω·m)', 'ρ (Ω·m)'), C('Chất (20 °C)', 'Material (20 °C)'), C('ρ (Ω·m)', 'ρ (Ω·m)')],
          [C('Bạc', 'Silver'), C('1,47·10⁻⁸', '1.47·10⁻⁸'), C('Nikelin', 'Nickelin'), C('40,00·10⁻⁸', '40.00·10⁻⁸')],
          [C('Đồng', 'Copper'), C('1,70·10⁻⁸', '1.70·10⁻⁸'), C('Manganin', 'Manganin'), C('43,00·10⁻⁸', '43.00·10⁻⁸')],
          [C('Vàng', 'Gold'), C('2,35·10⁻⁸', '2.35·10⁻⁸'), C('Constantan', 'Constantan'), C('50,00·10⁻⁸', '50.00·10⁻⁸')],
          [C('Nhôm', 'Aluminium'), C('2,80·10⁻⁸', '2.80·10⁻⁸'), C('Nicrom', 'Nichrome'), C('110,00·10⁻⁸', '110.00·10⁻⁸')],
          [C('Tungsten', 'Tungsten'), C('5,50·10⁻⁸', '5.50·10⁻⁸'), C('Sắt', 'Iron'), C('12,00·10⁻⁸', '12.00·10⁻⁸')]
        ] },
        { t: 'p', vi: 'Bảng 11.3. Điện trở suất của một số chất ở nhiệt độ phòng (20 °C). Số liệu đọc từ bản quét, cần đối chiếu lại với sách in.', en: 'Table 11.3. Resistivity of some materials at room temperature (20 °C). Values read from the scan; please check against the printed book.' },
        { t: 'head', kind: 'practice', vi: 'Luyện tập', en: 'Practice' },
        { t: 'ex', kind: 'practice', no: 1, body: [P('Hai đoạn dây đồng: dây thứ nhất có chiều dài bằng một nửa dây thứ hai nhưng tiết diện gấp đôi. So sánh điện trở của hai dây.', 'Two copper wires: the first is half as long as the second but has twice the cross-section. Compare their resistances.')], solution: [P('$\\frac{R_1}{R_2} = \\frac{l_1}{l_2} \\cdot \\frac{S_2}{S_1} = \\frac{1}{2} \\cdot \\frac{1}{2} = \\frac{1}{4}$: điện trở dây thứ nhất bằng một phần tư điện trở dây thứ hai.', '$\\frac{R_1}{R_2} = \\frac{l_1}{l_2} \\cdot \\frac{S_2}{S_1} = \\frac{1}{2} \\cdot \\frac{1}{2} = \\frac{1}{4}$: the first wire has a quarter of the resistance of the second.')] },
        { t: 'ex', kind: 'practice', no: 2, body: [P('Tính điện trở của đoạn dây đồng dài $150\\ \\text{m}$, tiết diện $2\\ \\text{mm}^2$, biết $\\rho = 1{,}7 \\cdot 10^{-8}\\ \\Omega\\cdot\\text{m}$.', 'Find the resistance of a copper wire $150\\ \\text{m}$ long with cross-section $2\\ \\text{mm}^2$, given $\\rho = 1.7 \\cdot 10^{-8}\\ \\Omega\\cdot\\text{m}$.')], solution: [P('$S = 2\\ \\text{mm}^2 = 2 \\cdot 10^{-6}\\ \\text{m}^2$; $R = \\rho \\frac{l}{S} = 1{,}7 \\cdot 10^{-8} \\cdot \\frac{150}{2 \\cdot 10^{-6}} = 1{,}275\\ \\Omega$.', '$S = 2\\ \\text{mm}^2 = 2 \\cdot 10^{-6}\\ \\text{m}^2$; $R = \\rho \\frac{l}{S} = 1.7 \\cdot 10^{-8} \\cdot \\frac{150}{2 \\cdot 10^{-6}} = 1.275\\ \\Omega$.')] },
        { t: 'activity', no: 4, title: { vi: 'Thực hành ảo: điện trở của dây dẫn', en: 'Virtual practical: the resistance of a wire' },
          vi: 'Chọn vật liệu, đổi chiều dài $l$ và tiết diện $S$ để xem $R = \\rho l/S$ thay đổi. Bật “So sánh hai dây” và thử lại bài tập 1: $l_1 = 1$ m, $S_1 = 2$ mm²; $l_2 = 2$ m, $S_2 = 1$ mm².', en: 'Choose the material and change $l$ and $S$ to watch $R = \\rho l/S$. Turn on “Compare two wires” and redo exercise 1: $l_1 = 1$ m, $S_1 = 2$ mm²; $l_2 = 2$ m, $S_2 = 1$ mm².' }
      ] },
      { number: 58, blocks: [
        { t: 'h2', n: 'V', vi: 'Điện trở trong kĩ thuật', en: 'Resistors in engineering' },
        P('Trong kĩ thuật người ta dùng nhiều {điện trở|elec-resistor} nhỏ với trị số từ vài ôm đến hàng triệu ôm, chế tạo bằng một lớp than hoặc kim loại mỏng phủ ngoài một lớp cách điện (thường là sứ). Trị số được ghi trên điện trở hoặc biểu thị bằng các vòng màu ({quy ước vòng màu|elec-colour-code}).',
          'Engineering uses many small {resistors|elec-resistor} from a few ohms to millions of ohms, made from a thin layer of carbon or metal coated with an insulating layer (often ceramic). The value is printed on the resistor or shown by coloured bands (the {colour code|elec-colour-code}).'),
        FIG('khtn11e', '11.5', 'Điện trở bốn vòng màu (vàng, tím, đen, vàng ánh kim)', 'A four-band resistor (yellow, violet, black, gold)', true),
        { t: 'table', head: true, rows: [
          [C('Màu', 'Colour'), C('Chữ số (vòng 1, 2)', 'Digit (bands 1, 2)'), C('Số mũ (vòng 3)', 'Multiplier (band 3)'), C('Sai số (vòng 4)', 'Tolerance (band 4)')],
          [C('Đen', 'Black'), C('0', '0'), C('×10⁰', '×10⁰'), C('', '')], [C('Nâu', 'Brown'), C('1', '1'), C('×10¹', '×10¹'), C('', '')], [C('Đỏ', 'Red'), C('2', '2'), C('×10²', '×10²'), C('', '')],
          [C('Da cam', 'Orange'), C('3', '3'), C('×10³', '×10³'), C('', '')], [C('Vàng', 'Yellow'), C('4', '4'), C('×10⁴', '×10⁴'), C('', '')], [C('Lục', 'Green'), C('5', '5'), C('×10⁵', '×10⁵'), C('', '')],
          [C('Lam', 'Blue'), C('6', '6'), C('×10⁶', '×10⁶'), C('', '')], [C('Tím', 'Violet'), C('7', '7'), C('×10⁷', '×10⁷'), C('', '')], [C('Xám', 'Grey'), C('8', '8'), C('×10⁸', '×10⁸'), C('', '')], [C('Trắng', 'White'), C('9', '9'), C('×10⁹', '×10⁹'), C('', '')],
          [C('Vàng ánh kim', 'Gold'), C('', ''), C('×10⁻¹', '×10⁻¹'), C('±5 %', '±5 %')], [C('Bạc', 'Silver'), C('', ''), C('×10⁻²', '×10⁻²'), C('±10 %', '±10 %')]
        ] },
        { t: 'p', vi: 'Bảng 11.4. Quy định trị số của điện trở bốn vòng màu. Các chữ số và số mũ đọc từ bản quét, cần đối chiếu lại với sách in.', en: 'Table 11.4. Colour code of a four-band resistor. Digits and multipliers read from the scan; please check against the printed book.' },
        P('Hai vòng đầu cho hai chữ số, vòng thứ ba cho luỹ thừa của 10 nhân với hai chữ số ấy, vòng thứ tư (luôn là vàng ánh kim hoặc bạc) cho {sai số|elec-tolerance}:', 'The first two bands give two digits, the third gives the power of ten, the fourth (always gold or silver) gives the {tolerance|elec-tolerance}:'),
        M('R = \\overline{ab} \\times 10^{c} \\pm \\text{sai số}', '(11.4)'),
        P('Ví dụ (Hình 11.5): vàng, tím, đen ứng với 4, 7, 0 nên $R = 47 \\times 10^{0} = 47\\ \\Omega$; vòng vàng ánh kim là $\\pm 5\\ \\%$, tức $47 \\cdot 0{,}05 = 2{,}35\\ \\Omega$. Viết $R = 47{,}00 \\pm 2{,}35\\ \\Omega$.', 'Example (Figure 11.5): yellow, violet, black mean 4, 7, 0 so $R = 47 \\times 10^{0} = 47\\ \\Omega$; the gold band is $\\pm 5\\ \\%$, i.e. $47 \\cdot 0.05 = 2.35\\ \\Omega$. Write $R = 47.00 \\pm 2.35\\ \\Omega$.'),
        { t: 'activity', no: 5, title: { vi: 'Thực hành ảo: đọc điện trở vòng màu', en: 'Virtual practical: reading a colour-coded resistor' },
          vi: 'Chọn màu cho từng vòng và đọc trị số. Chuyển sang “Đố vui” để đọc điện trở ngẫu nhiên, hoặc “Ngược lại” để chọn vòng màu cho một giá trị cho trước.', en: 'Pick a colour for each band and read the value. Switch to “Quiz” for random resistors, or “Reverse” to choose bands for a given value.' }
      ] },
      { number: 59, blocks: [
        { t: 'head', kind: 'practice', vi: 'Vận dụng', en: 'Apply' },
        { t: 'ex', kind: 'apply', no: 1, body: [P('Vì sao dây điện trong nhà thường làm bằng đồng, còn đường dây tải điện cao áp ngoài trời hay dùng nhôm?', 'Why is house wiring usually copper, while overhead high-voltage lines often use aluminium?')], solution: [P('Đồng có điện trở suất nhỏ ($1{,}70 \\cdot 10^{-8}\\ \\Omega\\cdot\\text{m}$) nên dây nhỏ gọn mà ít toả nhiệt. Nhôm có $\\rho = 2{,}80 \\cdot 10^{-8}\\ \\Omega\\cdot\\text{m}$ lớn hơn một chút nhưng nhẹ và rẻ hơn, hợp với đường dây dài phải treo trên cột (dùng dây có tiết diện lớn hơn để bù).', 'Copper has a low resistivity ($1.70 \\cdot 10^{-8}\\ \\Omega\\cdot\\text{m}$), so thin wires warm little. Aluminium has a somewhat larger $\\rho = 2.80 \\cdot 10^{-8}\\ \\Omega\\cdot\\text{m}$ but is lighter and cheaper, suiting long lines hung on poles (a larger cross-section compensates).')] },
        { t: 'ex', kind: 'apply', no: 2, body: [P('Chập mạch ({đoản mạch|elec-short-circuit}) nguy hiểm vì sao? Nêu cách phòng tránh.', 'Why is a {short circuit|elec-short-circuit} dangerous? How can it be prevented?')], solution: [P('Khi hai dây bị nối trực tiếp, điện trở rất nhỏ nên theo $I = U/R$ dòng điện rất lớn, toả nhiệt mạnh có thể gây cháy. Phòng tránh: dùng dây có vỏ cách điện nguyên vẹn, không để dây hở chạm nhau, dùng cầu chì hoặc aptomat để tự ngắt mạch khi dòng quá lớn.', 'When two wires touch directly the resistance is tiny so by $I = U/R$ the current is huge and the heating can start a fire. Prevention: use wires with intact insulation, keep bare wires apart, and use a fuse or circuit breaker that cuts the circuit when the current is too large.')] },
        { t: 'quiz', title: { vi: 'Tự kiểm tra', en: 'Self-check' }, items: [
          Q('q1', 'Điện trở có tác dụng nào sau đây?', 'What does a resistor do?', [['Cản trở dòng điện', 'Opposes the current'], ['Tạo ra dòng điện', 'Creates current'], ['Làm tăng hiệu điện thế', 'Raises the voltage'], ['Không có tác dụng', 'Nothing']], 0, 'Điện trở càng lớn thì dòng điện càng bị cản trở nhiều.', 'The larger the resistance the more the current is opposed.'),
          Q('q2', 'Đơn vị của điện trở là:', 'The unit of resistance is:', [['Vôn (V)', 'Volt (V)'], ['Ampe (A)', 'Ampere (A)'], ['Ôm (Ω)', 'Ohm (Ω)'], ['Oát (W)', 'Watt (W)']], 2, '$1\\ \\Omega = 1\\ \\text{V}/1\\ \\text{A}$.', '$1\\ \\Omega = 1\\ \\text{V}/1\\ \\text{A}$.'),
          Q('q3', 'Biểu thức của định luật Ohm là:', 'The expression of Ohm’s law is:', [['$I = U/R$', '$I = U/R$'], ['$I = U \\cdot R$', '$I = U \\cdot R$'], ['$I = R/U$', '$I = R/U$'], ['$I = U + R$', '$I = U + R$']], 0, 'Dòng điện tỉ lệ thuận với $U$ và tỉ lệ nghịch với $R$.', 'Current is proportional to $U$ and inversely proportional to $R$.'),
          Q('q4', 'Bóng đèn có $R = 12\\ \\Omega$, dòng điện $0{,}5\\ \\text{A}$. Hiệu điện thế hai đầu bóng là:', 'A bulb has $R = 12\\ \\Omega$ and current $0.5\\ \\text{A}$. The voltage across it is:', [['24 V', '24 V'], ['6 V', '6 V'], ['2 V', '2 V'], ['12,5 V', '12.5 V']], 1, '$U = IR = 0{,}5 \\cdot 12 = 6\\ \\text{V}$.', '$U = IR = 0.5 \\cdot 12 = 6\\ \\text{V}$.'),
          Q('q5', 'Với $2\\ \\text{V}$ thì $I = 0{,}4\\ \\text{A}$. Muốn $I = 0{,}8\\ \\text{A}$ phải đặt hiệu điện thế:', 'With $2\\ \\text{V}$ the current is $0.4\\ \\text{A}$. For $0.8\\ \\text{A}$ the voltage must be:', [['1 V', '1 V'], ['2 V', '2 V'], ['4 V', '4 V'], ['8 V', '8 V']], 2, '$R = 5\\ \\Omega$ nên $U = 0{,}8 \\cdot 5 = 4\\ \\text{V}$.', '$R = 5\\ \\Omega$ so $U = 0.8 \\cdot 5 = 4\\ \\text{V}$.'),
          Q('q6', 'Đồ thị $I$ theo $U$ của một điện trở là:', 'The $I$–$U$ graph of a resistor is:', [['Đường cong đi qua gốc toạ độ', 'A curve through the origin'], ['Đường thẳng đi qua gốc toạ độ', 'A straight line through the origin'], ['Đường thẳng song song trục hoành', 'A line parallel to the U axis'], ['Đường thẳng không qua gốc toạ độ', 'A straight line not through the origin']], 1, '$I$ tỉ lệ thuận với $U$ nên đồ thị là đường thẳng qua gốc toạ độ.', '$I$ is proportional to $U$ so the graph is a straight line through the origin.'),
          Q('q7', 'Theo Bảng 11.2 (điện trở $6\\ \\Omega$), khi $U = 6\\ \\text{V}$ thì $I$ bằng:', 'In Table 11.2 (resistor $6\\ \\Omega$) with $U = 6\\ \\text{V}$ the current is:', [['0,5 A', '0.5 A'], ['1,0 A', '1.0 A'], ['1,5 A', '1.5 A'], ['2,0 A', '2.0 A']], 1, '$I = 6/6 = 1{,}0\\ \\text{A}$; ở $12\\ \\text{V}$ là $2{,}0\\ \\text{A}$.', '$I = 6/6 = 1.0\\ \\text{A}$; at $12\\ \\text{V}$ it is $2.0\\ \\text{A}$.'),
          Q('q8', 'Giữ $U$ không đổi, tăng $R$ lên gấp đôi thì $I$:', 'With $U$ fixed, doubling $R$ makes $I$:', [['Tăng gấp đôi', 'Double'], ['Giảm một nửa', 'Halve'], ['Không đổi', 'Stay the same'], ['Tăng gấp bốn', 'Quadruple']], 1, '$I = U/R$ tỉ lệ nghịch với $R$.', '$I = U/R$ is inversely proportional to $R$.'),
          Q('q9', 'Dây đồng dài $150\\ \\text{m}$, tiết diện $2\\ \\text{mm}^2$, $\\rho = 1{,}7 \\cdot 10^{-8}\\ \\Omega\\cdot\\text{m}$ có điện trở:', 'A copper wire $150\\ \\text{m}$ long, $2\\ \\text{mm}^2$, $\\rho = 1.7 \\cdot 10^{-8}\\ \\Omega\\cdot\\text{m}$ has resistance:', [['0,1275 Ω', '0.1275 Ω'], ['1,275 Ω', '1.275 Ω'], ['12,75 Ω', '12.75 Ω'], ['127,5 Ω', '127.5 Ω']], 1, '$R = 1{,}7 \\cdot 10^{-8} \\cdot 150/(2 \\cdot 10^{-6}) = 1{,}275\\ \\Omega$.', '$R = 1.7 \\cdot 10^{-8} \\cdot 150/(2 \\cdot 10^{-6}) = 1.275\\ \\Omega$.'),
          Q('q10', 'Dây A dài bằng nửa dây B nhưng tiết diện gấp đôi (cùng chất). Tỉ số $R_A/R_B$ là:', 'Wire A is half as long as wire B but has twice the cross-section (same material). $R_A/R_B$ is:', [['1/4', '1/4'], ['1/2', '1/2'], ['2', '2'], ['4', '4']], 0, '$\\frac{1}{2} \\cdot \\frac{1}{2} = \\frac{1}{4}$.', '$\\frac{1}{2} \\cdot \\frac{1}{2} = \\frac{1}{4}$.'),
          Q('q11', 'Điện trở có các vòng màu vàng, tím, đen, vàng ánh kim có giá trị:', 'A resistor with bands yellow, violet, black, gold has the value:', [['$47 \\pm 2{,}35\\ \\Omega$', '$47 \\pm 2.35\\ \\Omega$'], ['$470 \\pm 23{,}5\\ \\Omega$', '$470 \\pm 23.5\\ \\Omega$'], ['$4{,}7\\ \\Omega$', '$4.7\\ \\Omega$'], ['$47 \\pm 4{,}7\\ \\Omega$', '$47 \\pm 4.7\\ \\Omega$']], 0, 'Vàng = 4, tím = 7, đen = ×10⁰ ⇒ 47 Ω; ±5 % của 47 là 2,35 Ω.', 'Yellow = 4, violet = 7, black = ×10⁰ ⇒ 47 Ω; ±5 % of 47 is 2.35 Ω.'),
          Q('q12', 'Thực hành ảo: với $R = 6\\ \\Omega$, kéo con chạy để dòng điện $I = 1{,}2\\ \\text{A}$. Hiệu điện thế $U$ khi đó là:', 'Virtual practical: with $R = 6\\ \\Omega$, slide the rheostat so $I = 1.2\\ \\text{A}$. The voltage $U$ is then:', [['7,2 V', '7.2 V'], ['5 V', '5 V'], ['0,2 V', '0.2 V'], ['72 V', '72 V']], 0, '$U = IR = 1{,}2 \\cdot 6 = 7{,}2\\ \\text{V}$ (nằm giữa hai điểm 6 V và 9 V của Bảng 11.2).', '$U = IR = 1.2 \\cdot 6 = 7.2\\ \\text{V}$ (between the 6 V and 9 V points of Table 11.2).'),
          Q('q13', 'Dây nikelin ($40 \\cdot 10^{-8}$) và dây đồng ($1{,}7 \\cdot 10^{-8}$) cùng chiều dài, cùng tiết diện. Điện trở dây nikelin lớn hơn dây đồng khoảng:', 'A nickelin wire ($40 \\cdot 10^{-8}$) and a copper wire ($1.7 \\cdot 10^{-8}$) have the same length and cross-section. The nickelin wire has about how many times the resistance?', [['2 lần', '2 times'], ['10 lần', '10 times'], ['23,5 lần', '23.5 times'], ['100 lần', '100 times']], 2, '$40/1{,}7 \\approx 23{,}5$ (cùng $l$, $S$ nên $R$ tỉ lệ với $\\rho$).', '$40/1.7 \\approx 23.5$ (same $l$, $S$ so $R$ is proportional to $\\rho$).')
        ] },
        { t: 'key', title: { vi: 'Em đã học', en: 'What you have learned' }, blocks: [{ t: 'list', items: [
          L1('Điện trở cản trở dòng điện; $R = U/I$, đơn vị ôm (Ω). Định luật Ohm: $I = U/R$; đồ thị $I$–$U$ là đường thẳng qua gốc toạ độ.', 'Resistance opposes the current; $R = U/I$, unit ohm (Ω). Ohm’s law: $I = U/R$; the $I$–$U$ graph is a straight line through the origin.'),
          L1('Điện trở dây dẫn $R = \\rho l/S$; đọc trị số điện trở theo vòng màu.', 'Resistance of a wire $R = \\rho l/S$; reading resistor values from the colour bands.')
        ] }] },
        { t: 'key', title: { vi: 'Em có thể', en: 'You can' }, blocks: [{ t: 'list', items: [
          L1('Giải thích vì sao dây trong nhà dùng đồng và đường dây cao áp hay dùng nhôm.', 'Explain why house wiring uses copper and overhead lines often use aluminium.'),
          L1('Nêu nguyên nhân gây chập mạch và cách phòng tránh.', 'Give the causes of short circuits and how to prevent them.')
        ] }] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          L1('Định luật Ohm: $I = U/R$ ($I$ tỉ lệ thuận với $U$, tỉ lệ nghịch với $R$).', 'Ohm’s law: $I = U/R$ ($I$ proportional to $U$, inversely proportional to $R$).'),
          L1('Điện trở dây: $R = \\rho l/S$ ($\\rho$ tra ở Bảng 11.3).', 'Wire resistance: $R = \\rho l/S$ ($\\rho$ from Table 11.3).')
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.', keys: ['elec-resistance', 'elec-resistor', 'elec-rheostat', 'elec-ammeter', 'elec-voltmeter', 'elec-current', 'elec-voltage', 'elec-ohms-law', 'elec-ohm', 'elec-resistivity', 'elec-cross-section', 'elec-conductor', 'elec-insulator', 'elec-colour-code', 'elec-tolerance', 'elec-short-circuit', 'elec-circuit', 'elec-switch', 'elec-bulb'] }
      ] }
    ]
  };
  /* `elec-bulb` được định nghĩa ở đây (dùng chung cho Bài 12) */
  D.glossary['elec-bulb'] = g('bulb', '/bʌlb/', 'n', 'bóng đèn', 'Trong KHTN: Thiết bị biến điện năng thành ánh sáng; độ sáng tăng theo công suất P = UI. (Nghĩa khác: củ, hành.)', 'The bulb lights when the switch is closed.', 'Bóng đèn sáng khi đóng công tắc.');
  (function strip(o) {
    if (Array.isArray(o)) o.forEach(strip);
    else if (o && typeof o === 'object') { for (const k in o) { if (k === 'vi' && typeof o[k] === 'string') o[k] = o[k].replace(/\{([^{}|]+)\|[^{}]+\}/g, '$1'); else strip(o[k]); } }
  })(D.lessons['khtn9-bai11'].pages);
})();
