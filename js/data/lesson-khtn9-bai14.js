/* ==========================================================================
   KHOA HỌC TỰ NHIÊN 9 — CHƯƠNG IV. ĐIỆN TỪ
     'khtn9-bai14'  Bài 14. Cảm ứng điện từ. Nguyên tắc tạo ra dòng điện xoay chiều (tr. 67–71)
   NỘI DUNG NGUYÊN BẢN do nhóm dự án soạn theo cấu trúc mục, số hiệu hình và số liệu của bài;
   không phải bản chép sách giáo khoa. Hãy đối chiếu với sách in trước khi dùng chính thức.
   Hình 14.7: đọc từ bản quét — biên độ 1,0 A, chu kì 20 ms (f = 50 Hz).
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
    'em-induction': g('electromagnetic induction', '/ɪˌlek.troʊ.mæɡˈnet.ɪk ɪnˈdʌk.ʃən/', 'n', 'cảm ứng điện từ', 'Trong KHTN: Hiện tượng xuất hiện dòng điện trong cuộn dây kín khi số đường sức từ xuyên qua nó biến thiên.', 'Electromagnetic induction produces current without a battery.', 'Cảm ứng điện từ tạo ra dòng điện mà không cần pin.'),
    'em-induced-current': g('induced current', '/ɪnˈdjuːst ˈkʌr.ənt/', 'n', 'dòng điện cảm ứng', 'Trong KHTN: Dòng điện sinh ra trong cuộn dây kín nhờ cảm ứng điện từ.', 'The induced current flows only while the field changes.', 'Dòng điện cảm ứng chỉ chạy khi từ trường biến thiên.'),
    'em-field-line': g('magnetic field line', '/mæɡˈnet.ɪk fiːld laɪn/', 'n', 'đường sức từ', 'Trong KHTN: Đường vẽ để biểu diễn từ trường; càng dày thì từ trường càng mạnh.', 'Field lines leave the north pole.', 'Các đường sức đi ra từ cực Bắc.'),
    'em-flux': g('magnetic flux', '/mæɡˈnet.ɪk flʌks/', 'n', 'từ thông (số đường sức xuyên qua)', 'Trong KHTN: Đại lượng đặc trưng cho số đường sức từ xuyên qua một tiết diện; ở lớp 9 hiểu là “số đường sức xuyên qua”.', 'The flux through the coil increases.', 'Từ thông qua cuộn dây tăng.'),
    'em-permanent-magnet': g('permanent magnet', '/ˈpɜː.mə.nənt ˈmæɡ.nɪt/', 'n', 'nam châm vĩnh cửu', 'Trong KHTN: Nam châm giữ từ tính lâu dài, không cần dòng điện.', 'A bar magnet is a permanent magnet.', 'Thanh nam châm là nam châm vĩnh cửu.'),
    'em-electromagnet': g('electromagnet', '/ɪˌlek.troʊˈmæɡ.nɪt/', 'n', 'nam châm điện', 'Trong KHTN: Cuộn dây có lõi sắt, có từ tính khi có dòng điện chạy qua.', 'An electromagnet works only when current flows.', 'Nam châm điện chỉ hoạt động khi có dòng điện.'),
    'em-coil': g('coil', '/kɔɪl/', 'n', 'cuộn dây', 'Trong KHTN: Dây dẫn quấn thành nhiều vòng. (Nghĩa khác: cuộn, xoắn.)', 'The coil has 200 turns.', 'Cuộn dây có 200 vòng.'),
    'em-galvanometer': g('galvanometer', '/ˌɡæl.vəˈnɒm.ɪ.tər/', 'n', 'điện kế', 'Trong KHTN: Dụng cụ phát hiện dòng điện rất nhỏ; kim lệch sang hai phía theo chiều dòng.', 'The galvanometer needle moves to the right.', 'Kim điện kế lệch sang phải.'),
    'em-led': g('LED', '/ˌel.iːˈdiː/', 'n', 'điốt phát quang (đèn LED)', 'Trong KHTN: Đèn chỉ cho dòng điện đi một chiều và sáng khi có dòng theo chiều đó.', 'The red LED lights when current flows forward.', 'Đèn LED đỏ sáng khi dòng điện đi thuận chiều.'),
    'em-ac': g('alternating current (AC)', '/ˈɔːl.tə.neɪ.tɪŋ ˈkʌr.ənt/', 'n', 'dòng điện xoay chiều', 'Trong KHTN: Dòng điện luân phiên đổi chiều và độ lớn theo thời gian.', 'Mains electricity is alternating current.', 'Điện lưới là dòng điện xoay chiều.'),
    'em-dc': g('direct current (DC)', '/daɪˈrekt ˈkʌr.ənt/', 'n', 'dòng điện một chiều', 'Trong KHTN: Dòng điện có chiều không đổi, ví dụ dòng từ pin.', 'A battery gives direct current.', 'Pin cho dòng điện một chiều.'),
    'em-frequency': g('frequency', '/ˈfriː.kwən.si/', 'n', 'tần số', 'Trong KHTN: Số chu kì dòng điện thực hiện trong một giây, đơn vị hec (Hz).', 'The frequency of mains is 50 Hz.', 'Tần số điện lưới là 50 Hz.'),
    'em-period': g('period', '/ˈpɪə.ri.əd/', 'n', 'chu kì', 'Trong KHTN: Thời gian dòng điện thực hiện một dao động đầy đủ; T = 1/f. (Nghĩa khác: giai đoạn, tiết học.)', 'The period is 20 ms.', 'Chu kì là 20 ms.'),
    'em-slip-ring': g('slip ring', '/slɪp rɪŋ/', 'n', 'vành khuyên', 'Trong KHTN: Vành kim loại gắn với trục quay để dẫn điện ra ngoài.', 'The slip rings rotate with the coil.', 'Các vành khuyên quay cùng khung dây.'),
    'em-brush': g('brush', '/brʌʃ/', 'n', 'chổi quét (điện)', 'Trong KHTN: Thanh than hoặc kim loại ép vào vành khuyên để lấy dòng điện. (Nghĩa khác: cái chổi.)', 'The brush presses on the ring.', 'Chổi quét ép vào vành khuyên.'),
    'em-generator': g('alternator', '/ˈɔːl.tə.neɪ.tər/', 'n', 'máy phát điện xoay chiều', 'Trong KHTN: Máy biến cơ năng thành điện năng dựa trên cảm ứng điện từ.', 'The alternator is driven by a turbine.', 'Máy phát điện xoay chiều được tua bin quay.')
  });

  D.lessons['khtn9-bai14'] = {
    gradeId: 9, number: '14', book: 'Khoa học tự nhiên 9',
    title: { vi: 'Cảm ứng điện từ. Nguyên tắc tạo ra dòng điện xoay chiều', en: 'Electromagnetic induction. Principle of generating alternating current' },
    topic: { label: 'Chương', labelEn: 'Chapter', number: 'IV', vi: 'Điện từ', en: 'Electromagnetism' },
    spreadLabels: ['Mở đầu', 'Cảm ứng điện từ', 'Nam châm điện, LED, bóp cuộn dây', 'Dòng điện xoay chiều', 'Máy phát điện'],
    pages: [
      { number: 67, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: { vi: 'Mục tiêu. Sau bài này em sẽ:', en: 'Aims. After this lesson you will:' }, items: [
          L1('Làm thí nghiệm để rút ra điều kiện xuất hiện dòng điện cảm ứng trong cuộn dây kín.', 'Do experiments to find the condition for an induced current in a closed coil.'),
          L1('Giải thích được nguyên tắc tạo ra dòng điện xoay chiều bằng khung dây quay trong từ trường.', 'Explain the principle of generating alternating current with a coil rotating in a magnetic field.')
        ] },
        { t: 'ask', style: 'num', lead: { vi: 'Khởi động', en: 'Warm-up' }, items: [B('Dòng điện tạo ra từ trường (nam châm điện). Ngược lại, từ trường có thể tạo ra dòng điện hay không?', 'Electric current produces a magnetic field (electromagnet). Can a magnetic field, in turn, produce an electric current?')] },
        { t: 'h2', n: 'I', vi: 'Thí nghiệm về hiện tượng cảm ứng điện từ', en: 'Experiments on electromagnetic induction' },
        { t: 'h3', vi: 'Thí nghiệm 1', en: 'Experiment 1' },
        { t: 'list', items: [
          L1('Chuẩn bị: một thanh nam châm vĩnh cửu, một cuộn dây dẫn có nhiều vòng, một điện kế nhạy, dây nối.', 'Prepare: a permanent bar magnet, a multi-turn coil, a sensitive galvanometer and wires.'),
          L1('Nối hai đầu cuộn dây với điện kế thành mạch kín (Hình 14.1).', 'Connect the ends of the coil to the galvanometer to make a closed circuit (Figure 14.1).')
        ] },
        { t: 'olist', items: [
          L1('Đưa một cực của nam châm lại gần cuộn dây rồi đưa ra xa; quan sát kim điện kế.', 'Move one pole of the magnet towards the coil and then away; watch the needle.'),
          L1('Đặt nam châm đứng yên gần hoặc trong cuộn dây; quan sát kim điện kế.', 'Hold the magnet still near or inside the coil; watch the needle.'),
          L1('Đổi cực của nam châm rồi lặp lại; thử di chuyển nhanh hơn.', 'Swap the pole of the magnet and repeat; try moving faster.')
        ] },
        FIG('khtn14a', '14.1', 'Đưa nam châm lại gần (a) và ra xa (b) cuộn dây nối với điện kế', 'Moving the magnet towards (a) and away from (b) the coil connected to the galvanometer', true),
        { t: 'activity', no: 1, title: { vi: 'Thực hành ảo: nam châm và cuộn dây', en: 'Virtual practical: magnet and coil' },
          vi: 'Kéo nam châm lại gần, ra xa cuộn dây (hoặc đổi sang kéo cuộn dây). Thử đổi cực, tăng số vòng và tốc độ kéo, dừng lại rồi bấm “Ghi nhận” để lập bảng quan sát. Em sẽ thấy dòng điện chỉ xuất hiện khi nam châm đang chuyển động.', en: 'Drag the magnet towards and away from the coil (or switch to dragging the coil). Swap poles, raise the number of turns and the speed, stop, and press “Record” to build the observation table. A current appears only while the magnet is moving.' }
      ] },
      { number: 68, blocks: [
        { t: 'p', vi: 'Quan sát Hình 14.2: khi nam châm chuyển động, số đường sức từ xuyên qua tiết diện S của cuộn dây thay đổi.', en: 'Look at Figure 14.2: as the magnet moves, the number of magnetic field lines through the cross-section S of the coil changes.' },
        FIG('khtn14b', '14.2', 'Các đường sức từ của nam châm xuyên qua tiết diện của cuộn dây', 'Field lines of the magnet passing through the cross-section of the coil', true),
        { t: 'ask', style: 'num', lead: { vi: 'Câu hỏi', en: 'Questions' }, items: [
          B('Khi đưa nam châm lại gần cuộn dây, số đường sức từ xuyên qua tiết diện S tăng hay giảm? Khi đưa ra xa thì sao?', 'When the magnet moves towards the coil, does the number of lines through S increase or decrease? And when it moves away?'),
          B('Khi nam châm đứng yên, số đường sức xuyên qua S có thay đổi không? Kim điện kế chỉ thế nào?', 'When the magnet is at rest, does the number of lines through S change? What does the needle show?')
        ] },
        { t: 'h3', vi: 'Thí nghiệm 2', en: 'Experiment 2' },
        { t: 'p', vi: 'Thay nam châm vĩnh cửu bằng nam châm điện (Hình 14.3). Giữ nam châm điện và cuộn dây đứng yên, đóng rồi mở công tắc K, hoặc thay đổi dòng điện qua nam châm điện; quan sát kim điện kế.', en: 'Replace the permanent magnet with an electromagnet (Figure 14.3). Keep the electromagnet and the coil still; close and open switch K, or change the current through the electromagnet; watch the needle.' },
        FIG('khtn14c', '14.3', 'Nam châm điện và cuộn dây nối với điện kế', 'An electromagnet and a coil connected to the galvanometer', true),
        { t: 'ask', style: 'num', lead: { vi: 'Câu hỏi', en: 'Questions' }, items: [
          B('Khi nào kim điện kế lệch: lúc đóng, lúc mở công tắc, hay khi dòng điện đã ổn định?', 'When does the needle deflect: while closing, while opening, or once the current is steady?'),
          B('Hãy đưa ra giả thuyết về điều kiện để trong cuộn dây xuất hiện dòng điện.', 'State a hypothesis about the condition under which a current appears in the coil.')
        ] },
        { t: 'activity', no: 2, title: { vi: 'Thực hành ảo: nam châm điện', en: 'Virtual practical: the electromagnet' },
          vi: 'Đóng, mở công tắc K hoặc kéo thanh trượt dòng điện; kéo cuộn dây thứ cấp lại gần, ra xa nam châm điện. Kim điện kế chỉ lệch khi dòng điện qua nam châm điện đang thay đổi.', en: 'Close and open switch K or drag the current slider; drag the second coil towards and away from the electromagnet. The needle deflects only while the electromagnet’s current is changing.' }
      ] },
      { number: 69, blocks: [
        { t: 'h2', n: 'II', vi: 'Hiện tượng cảm ứng điện từ', en: 'Electromagnetic induction' },
        { t: 'h3', vi: 'Thí nghiệm 3', en: 'Experiment 3' },
        { t: 'p', vi: 'Đặt một thanh nam châm quay quanh trục ngay trước một cuộn dây kín có hai đèn LED đỏ và vàng mắc song song, ngược cực (Hình 14.4). Quay nam châm và quan sát hai đèn.', en: 'Put a bar magnet that can turn about an axis in front of a closed coil that has a red and a yellow LED connected in parallel with opposite polarity (Figure 14.4). Turn the magnet and watch the two LEDs.' },
        FIG('khtn14d', '14.4', 'Nam châm quay trước cuộn dây có hai đèn LED mắc ngược cực', 'A rotating magnet in front of a coil with two LEDs of opposite polarity', true),
        { t: 'tip', items: [
          L1('Em có biết: đèn LED chỉ cho dòng điện đi theo một chiều. Ở Hình 14.5, đèn Đ₁ sáng khi dòng điện đi từ A đến B, đèn Đ₂ sáng khi dòng điện đi từ B đến A.', 'Did you know? An LED lets current flow in one direction only. In Figure 14.5, D₁ lights when the current goes from A to B, and D₂ lights when it goes from B to A.')
        ] },
        FIG('khtn14e', '14.5', 'Đèn LED chỉ sáng khi dòng điện đi theo chiều thuận', 'An LED lights only for forward current', true),
        { t: 'activity', no: 3, title: { vi: 'Thực hành ảo: nam châm quay và hai đèn LED', en: 'Virtual practical: the rotating magnet and two LEDs' },
          vi: 'Kéo tay nắm đỏ để quay nam châm hoặc bấm “Quay tự động”. Hai đèn LED sáng luân phiên: dòng điện cảm ứng đổi chiều khi cực của nam châm lần lượt tiến lại gần rồi rời xa cuộn dây.', en: 'Drag the red handle to turn the magnet or press “Auto rotate”. The two LEDs light alternately: the induced current reverses as the poles of the magnet approach and then leave the coil.' },
        { t: 'h3', vi: 'Thí nghiệm 4', en: 'Experiment 4' },
        { t: 'p', vi: 'Đặt nam châm đứng yên bên cạnh một cuộn dây mềm kín nối với điện kế. Bóp cuộn dây để thu nhỏ tiết diện rồi thả ra (Hình 14.6).', en: 'Place a stationary magnet beside a flexible closed coil connected to the galvanometer. Squeeze the coil to make its cross-section smaller and then release it (Figure 14.6).' },
        FIG('khtn14f', '14.6', 'Bóp cuộn dây mềm làm thay đổi tiết diện', 'Squeezing a flexible coil changes its cross-section', true),
        { t: 'activity', no: 4, title: { vi: 'Thực hành ảo: bóp cuộn dây', en: 'Virtual practical: squeezing the coil' },
          vi: 'Kéo núm ở đỉnh cuộn dây xuống để bóp và lên để thả. Kim lệch khi tiết diện S đang thay đổi, dừng lại thì kim về 0.', en: 'Drag the knob on top of the coil down to squeeze and up to release. The needle moves while S is changing and returns to 0 when you stop.' }
      ] },
      { number: 70, blocks: [
        { t: 'ask', style: 'num', lead: { vi: 'Câu hỏi', en: 'Questions' }, items: [
          B('Ở Thí nghiệm 3, vì sao hai đèn LED sáng luân phiên mà không sáng cùng lúc?', 'In Experiment 3, why do the two LEDs light alternately rather than together?'),
          B('Ở Thí nghiệm 4, điều gì làm xuất hiện dòng điện trong khi nam châm đứng yên?', 'In Experiment 4, what produces a current while the magnet stays still?')
        ] },
        { t: 'key', title: { vi: 'Kết luận', en: 'Conclusion' }, blocks: [{ t: 'p', vi: 'Khi số đường sức từ xuyên qua tiết diện của một cuộn dây dẫn kín biến thiên thì trong cuộn dây xuất hiện dòng điện cảm ứng. Hiện tượng đó gọi là hiện tượng {cảm ứng điện từ|em-induction}.', en: 'When the number of magnetic field lines through the cross-section of a closed coil changes, an {induced current|em-induced-current} appears in the coil. This is {electromagnetic induction|em-induction}.' }] },
        { t: 'activity', no: 5, title: { vi: 'Dự đoán rồi kiểm tra', en: 'Predict, then check' },
          vi: 'Với mỗi tình huống, hãy dự đoán kim điện kế có lệch không rồi bấm “Chạy”. Chốt điều kiện: mạch kín và số đường sức biến thiên.', en: 'For each situation, predict whether the needle deflects and press “Run”. The rule: a closed circuit and a changing number of field lines.' },
        { t: 'h2', n: 'III', vi: 'Nguyên tắc tạo ra dòng điện xoay chiều', en: 'Principle of generating alternating current' },
        { t: 'p', vi: 'Dòng điện ở lưới điện trong nhà là dòng điện xoay chiều có tần số 50 Hz, tức là cứ mỗi giây dòng điện thực hiện 50 chu kì, đổi chiều 100 lần. Hình 14.7 là đồ thị cường độ dòng điện theo thời gian: chu kì $T = 20\\ \\text{ms}$.', en: 'Household mains current is {alternating current|em-ac} with a {frequency|em-frequency} of 50 Hz: it completes 50 cycles each second and reverses direction 100 times. Figure 14.7 is the graph of current against time: the {period|em-period} is $T = 20\\ \\text{ms}$.' },
        FIG('khtn14g', '14.7', 'Đồ thị cường độ dòng điện xoay chiều theo thời gian', 'Graph of alternating current against time', true),
        M('f = \\frac{1}{T}', '(14.1)'),
        { t: 'activity', no: 6, title: { vi: 'Đọc đồ thị dòng điện xoay chiều', en: 'Reading the AC graph' },
          vi: 'Kéo con trỏ đọc i; tìm các thời điểm i = 0, i cực đại, chu kì T, tần số f và số lần đổi chiều trong 1 s. Thử thêm ba đồ thị khác.', en: 'Drag the cursor to read i; find the times when i = 0 and i is maximum, the period T, the frequency f and the number of reversals per second. Try three other graphs.' }
      ] },
      { number: 71, blocks: [
        { t: 'p', vi: 'Hình 14.8 là mô hình máy phát điện xoay chiều: khung dây dẫn quay trong từ trường của hai cực nam châm. Hai đầu khung nối với hai {vành khuyên|em-slip-ring} quay cùng khung; hai {chổi quét|em-brush} ép sát vành khuyên để đưa dòng điện ra mạch ngoài.', en: 'Figure 14.8 is a model of an {alternator|em-generator}: a coil of wire turns in the field of two magnet poles. The ends of the coil are joined to two {slip rings|em-slip-ring} that turn with it; two {brushes|em-brush} press on the rings to carry the current to the external circuit.' },
        FIG('khtn14h', '14.8', 'Mô hình máy phát điện xoay chiều', 'Model of an alternator', true),
        { t: 'p', vi: 'Hình 14.9: trong từ trường đều, khi khung quay, số đường sức xuyên qua khung lúc nhiều nhất (mặt khung vuông góc với đường sức), lúc bằng 0 (mặt khung song song với đường sức), rồi lại tăng, giảm luân phiên.', en: 'Figure 14.9: in a uniform field, as the coil turns the number of lines through it is at times greatest (the coil face square to the lines) and at times zero (the face parallel to the lines), then rises and falls alternately.' },
        FIG('khtn14i', '14.9', 'Khung dây quay trong từ trường đều', 'A coil rotating in a uniform field', true),
        { t: 'key', title: { vi: 'Nguyên tắc', en: 'Principle' }, blocks: [{ t: 'p', vi: 'Khi khung dây quay trong từ trường, số đường sức xuyên qua khung biến thiên tuần hoàn nên trong khung xuất hiện dòng điện cảm ứng luân phiên đổi chiều. Cũng có thể giữ khung đứng yên và quay nam châm.', en: 'When a coil turns in a magnetic field, the number of lines through it varies periodically, so an induced current appears that alternately reverses. The coil may instead be kept still while the magnet turns.' }] },
        { t: 'activity', no: 7, title: { vi: 'Thực hành ảo: máy phát điện xoay chiều mô hình', en: 'Virtual practical: a model alternator' },
          vi: 'Quay khung dây bằng tay nắm hoặc “Quay tự động”, chọn tần số f. Theo dõi đồ thị i–t vẽ theo thời gian thực, hai đèn LED luân phiên và bóng đèn. Thử chế độ “Nam châm quay, cuộn dây đứng yên”.', en: 'Turn the coil with the handle or “Auto rotate”, and choose the frequency f. Watch the i–t graph drawn in real time, the two alternating LEDs and the bulb. Try the “Rotating magnet, fixed coil” mode.' },
        { t: 'quiz', title: { vi: 'Tự kiểm tra', en: 'Self-check' }, items: [
          Q('q1', 'Dòng điện cảm ứng xuất hiện trong cuộn dây kín khi:', 'An induced current appears in a closed coil when:', [['Có nam châm đặt gần cuộn dây', 'A magnet is near the coil'], ['Số đường sức từ xuyên qua cuộn dây biến thiên', 'The number of field lines through the coil changes'], ['Cuộn dây nằm trong từ trường mạnh', 'The coil is in a strong field'], ['Cuộn dây có nhiều vòng', 'The coil has many turns']], 1, 'Điều kiện là mạch kín và số đường sức biến thiên.', 'The condition is a closed circuit and a changing number of lines.'),
          Q('q2', 'Nam châm đứng yên trong lòng cuộn dây kín. Kim điện kế:', 'A magnet rests inside a closed coil. The galvanometer needle:', [['Lệch sang phải', 'Deflects right'], ['Lệch sang trái', 'Deflects left'], ['Chỉ số 0', 'Reads 0'], ['Dao động liên tục', 'Oscillates']], 2, 'Số đường sức không đổi nên không có dòng điện cảm ứng.', 'The number of lines is constant, so there is no induced current.'),
          Q('q3', 'Đưa cực Bắc lại gần rồi đưa ra xa cuộn dây. Chiều dòng điện cảm ứng:', 'A north pole is moved towards and then away from the coil. The induced current:', [['Không đổi', 'Does not change'], ['Đổi chiều', 'Reverses'], ['Bằng 0 cả hai lần', 'Is zero both times'], ['Luôn tăng', 'Always increases']], 1, 'Số đường sức lúc tăng, lúc giảm nên dòng điện đổi chiều.', 'The number of lines first rises then falls, so the current reverses.'),
          Q('q4', 'Mạch hở (cuộn dây không nối kín), nam châm chuyển động nhanh. Dòng điện cảm ứng:', 'The circuit is open and the magnet moves fast. The induced current:', [['Rất lớn', 'Is very large'], ['Bằng 0', 'Is zero'], ['Nhỏ hơn mạch kín', 'Is smaller than in a closed circuit'], ['Đổi chiều liên tục', 'Reverses continuously']], 1, 'Không có mạch kín thì không có dòng điện.', 'Without a closed circuit there is no current.'),
          Q('q5', 'Ở Thí nghiệm 2, kim điện kế lệch khi:', 'In Experiment 2 the needle deflects when:', [['Dòng điện qua nam châm điện đang thay đổi', 'The electromagnet’s current is changing'], ['Công tắc luôn đóng', 'The switch stays closed'], ['Công tắc luôn mở', 'The switch stays open'], ['Cuộn dây đứng yên', 'The coil is stationary']], 0, 'Dòng thay đổi làm từ trường thay đổi.', 'A changing current changes the field.'),
          Q('q6', 'Hai đèn LED ngược cực nối với cuộn dây có nam châm quay. Hai đèn:', 'Two LEDs of opposite polarity are on a coil with a rotating magnet. The LEDs:', [['Cùng sáng', 'Both stay lit'], ['Cùng tắt', 'Both stay off'], ['Sáng luân phiên', 'Light alternately'], ['Chỉ một đèn sáng', 'Only one lights']], 2, 'Dòng điện đổi chiều nên hai đèn lần lượt sáng.', 'The current reverses, so the LEDs light in turn.'),
          Q('q7', 'Bóp cuộn dây khi nam châm đứng yên làm kim điện kế lệch vì:', 'Squeezing the coil with the magnet at rest moves the needle because:', [['Nam châm yếu đi', 'The magnet weakens'], ['Tiết diện thay đổi nên số đường sức qua cuộn dây thay đổi', 'The area changes, so the lines through the coil change'], ['Cuộn dây nóng lên', 'The coil heats up'], ['Điện trở tăng', 'The resistance increases']], 1, 'Số đường sức = B × S nên khi S đổi thì số đường sức đổi.', 'The number of lines depends on S, so changing S changes it.'),
          Q('q8', 'Tần số của dòng điện xoay chiều lưới điện là 50 Hz. Chu kì là:', 'Mains frequency is 50 Hz. The period is:', [['5 ms', '5 ms'], ['20 ms', '20 ms'], ['50 ms', '50 ms'], ['100 ms', '100 ms']], 1, '$T = 1/f = 1/50 = 0{,}02$ s = 20 ms.', '$T = 1/f = 1/50 = 0.02$ s = 20 ms.'),
          Q('q9', 'Dòng điện 50 Hz đổi chiều bao nhiêu lần trong 1 giây?', 'How many times per second does a 50 Hz current reverse?', [['25', '25'], ['50', '50'], ['100', '100'], ['200', '200']], 2, 'Mỗi chu kì đổi chiều 2 lần nên $2f = 100$.', 'Two reversals per cycle, so $2f = 100$.'),
          Q('q10', 'Trên đồ thị Hình 14.7, dòng điện bằng 0 tại:', 'On the graph in Figure 14.7 the current is zero at:', [['t = 5 ms', 't = 5 ms'], ['t = 10 ms', 't = 10 ms'], ['t = 15 ms', 't = 15 ms'], ['t = 25 ms', 't = 25 ms']], 1, 'Các điểm cắt trục thời gian là 0, 10, 20, 30 ms.', 'The graph crosses the time axis at 0, 10, 20, 30 ms.'),
          Q('q11', 'Một dòng điện xoay chiều có chu kì $T = 0{,}04$ s. Tần số là:', 'An AC current has period $T = 0.04$ s. The frequency is:', [['2,5 Hz', '2.5 Hz'], ['25 Hz', '25 Hz'], ['40 Hz', '40 Hz'], ['250 Hz', '250 Hz']], 1, '$f = 1/T = 25$ Hz.', '$f = 1/T = 25$ Hz.'),
          Q('q12', 'Trong máy phát điện xoay chiều mô hình, vành khuyên và chổi quét có nhiệm vụ:', 'In the model alternator the slip rings and brushes:', [['Tạo từ trường', 'Make the magnetic field'], ['Đưa dòng điện từ khung quay ra mạch ngoài', 'Carry the current from the rotating coil to the outside'], ['Làm khung quay nhanh hơn', 'Make the coil turn faster'], ['Giảm điện trở khung', 'Reduce the coil’s resistance']], 1, 'Chổi quét tì lên vành khuyên để lấy điện.', 'The brushes press on the rings to take the current.'),
          Q('q13', 'Thực hành ảo: tăng tần số quay của khung từ 1 Hz lên 2 Hz. Số lần đổi chiều trong 1 s:', 'Virtual practical: the coil’s rotation frequency rises from 1 Hz to 2 Hz. The reversals per second:', [['Không đổi', 'Unchanged'], ['Tăng gấp đôi', 'Double'], ['Giảm một nửa', 'Halve'], ['Tăng gấp bốn', 'Quadruple']], 1, 'Số lần đổi chiều bằng $2f$.', 'The number of reversals equals $2f$.'),
          Q('q14', 'Khung dây quay trong từ trường đều. Số đường sức qua khung nhiều nhất khi mặt khung:', 'A coil turns in a uniform field. The lines through it are most numerous when its face is:', [['Song song với đường sức', 'Parallel to the lines'], ['Vuông góc với đường sức', 'Perpendicular to the lines'], ['Nghiêng 45°', 'At 45°'], ['Không phụ thuộc vị trí', 'Independent of position']], 1, 'Mặt vuông góc đường sức thì nhiều đường sức xuyên qua nhất.', 'A face square to the lines catches the most lines.')
        ] },
        { t: 'key', title: { vi: 'Em đã học', en: 'What you have learned' }, blocks: [{ t: 'list', items: [
          L1('Dòng điện cảm ứng xuất hiện trong cuộn dây kín khi số đường sức từ xuyên qua nó biến thiên.', 'An induced current appears in a closed coil when the number of field lines through it changes.'),
          L1('Dòng điện xoay chiều có $f = 1/T$ và đổi chiều $2f$ lần mỗi giây.', 'Alternating current has $f = 1/T$ and reverses $2f$ times per second.')
        ] }] },
        { t: 'key', title: { vi: 'Em có thể', en: 'You can' }, blocks: [{ t: 'list', items: [
          L1('Giải thích nguyên tắc máy phát điện xoay chiều mô hình.', 'Explain the principle of the model alternator.'),
          L1('Đọc chu kì và tần số từ đồ thị dòng điện xoay chiều.', 'Read the period and frequency from an AC graph.')
        ] }] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          L1('Cảm ứng điện từ: mạch kín và số đường sức xuyên qua biến thiên ⇒ dòng điện cảm ứng.', 'Electromagnetic induction: a closed circuit and a changing number of lines ⇒ induced current.'),
          L1('Khung dây quay trong từ trường tạo dòng điện xoay chiều; $f = 1/T$.', 'A coil turning in a field produces alternating current; $f = 1/T$.')
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.', keys: ['em-induction', 'em-induced-current', 'em-field-line', 'em-flux', 'em-permanent-magnet', 'em-electromagnet', 'em-coil', 'em-galvanometer', 'em-led', 'em-ac', 'em-dc', 'em-frequency', 'em-period', 'em-slip-ring', 'em-brush', 'em-generator'] }
      ] }
    ]
  };
  (function strip(o) {
    if (Array.isArray(o)) o.forEach(strip);
    else if (o && typeof o === 'object') { for (const k in o) { if (k === 'vi' && typeof o[k] === 'string') o[k] = o[k].replace(/\{([^{}|]+)\|[^{}]+\}/g, '$1'); else strip(o[k]); } }
  })(D.lessons['khtn9-bai14'].pages);
})();
