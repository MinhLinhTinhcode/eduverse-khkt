/* ==========================================================================
   KHOA HỌC TỰ NHIÊN 9 — CHƯƠNG IV. ĐIỆN TỪ
     'khtn9-bai15'  Bài 15. Tác dụng của dòng điện xoay chiều (tr. 72–74)
   NỘI DUNG NGUYÊN BẢN do nhóm dự án soạn theo cấu trúc mục và số hiệu hình của bài;
   không phải bản chép sách giáo khoa. Hãy đối chiếu với sách in trước khi dùng chính thức.
   ========================================================================== */
(function () {
  'use strict';
  const D = (window.TEXTBOOK = window.TEXTBOOK || {});
  D.lessons = D.lessons || {};
  D.glossary = D.glossary || {};
  const g = (word, ipa, pos, vi, ctx, en, viEx) => ({ word, ipa, pos, vi, ctx, ex: { en, vi: viEx } });
  const Q = (id, vi, en, opts, answer, whyVi, whyEn) => ({ id, vi, en, options: opts.map((o) => ({ vi: o[0], en: o[1] })), answer, whyVi, whyEn });
  const B = (vi, en) => ({ vi, en });
  const FIG = (art, no, vi, en, wide) => ({ t: 'fig', art, no, vi, en, wide });
  const L1 = (vi, en) => ({ vi, en });

  Object.assign(D.glossary, {
    'fx-heating': g('heating effect', '/ˈhiː.tɪŋ ɪˈfekt/', 'n', 'tác dụng nhiệt', 'Trong KHTN: Dòng điện chạy qua vật dẫn làm vật nóng lên.', 'A hair dryer uses the heating effect.', 'Máy sấy tóc dùng tác dụng nhiệt.'),
    'fx-luminous': g('luminous effect', '/ˈluː.mɪ.nəs ɪˈfekt/', 'n', 'tác dụng phát sáng', 'Trong KHTN: Dòng điện làm một số vật (dây tóc, chất huỳnh quang, LED) phát sáng.', 'A bulb shows the luminous effect.', 'Bóng đèn thể hiện tác dụng phát sáng.'),
    'fx-magnetic': g('magnetic effect', '/mæɡˈnet.ɪk ɪˈfekt/', 'n', 'tác dụng từ', 'Trong KHTN: Dòng điện tạo ra từ trường, ví dụ nam châm điện.', 'An electromagnet uses the magnetic effect.', 'Nam châm điện dùng tác dụng từ.'),
    'fx-physiological': g('physiological effect', '/ˌfɪz.i.əˈlɒdʒ.ɪ.kəl ɪˈfekt/', 'n', 'tác dụng sinh lí', 'Trong KHTN: Tác dụng của dòng điện lên cơ thể sinh vật, như làm co cơ.', 'The physiological effect can be dangerous.', 'Tác dụng sinh lí có thể nguy hiểm.'),
    'fx-defibrillator': g('defibrillator', '/diːˈfɪb.rɪ.leɪ.tər/', 'n', 'máy khử rung tim', 'Trong KHTN: Thiết bị y tế phát các xung điện ngắn để đưa tim trở lại nhịp bình thường.', 'A defibrillator sends short electrical pulses.', 'Máy khử rung tim phát các xung điện ngắn.'),
    'fx-substation': g('transformer substation', '/trænsˈfɔː.mər ˈsʌb.steɪ.ʃən/', 'n', 'trạm biến áp', 'Trong KHTN: Nơi đặt máy biến áp; có điện áp rất cao, nguy hiểm, không được lại gần.', 'Stay away from the transformer substation.', 'Hãy tránh xa trạm biến áp.'),
    'fx-safety': g('electrical safety', '/ɪˈlek.trɪ.kəl ˈseɪf.ti/', 'n', 'an toàn điện', 'Trong KHTN: Các quy tắc để dùng điện mà không gây nguy hiểm cho người và thiết bị.', 'Electrical safety saves lives.', 'An toàn điện cứu mạng người.')
  });

  D.lessons['khtn9-bai15'] = {
    gradeId: 9, number: '15', book: 'Khoa học tự nhiên 9',
    title: { vi: 'Tác dụng của dòng điện xoay chiều', en: 'Effects of alternating current' },
    topic: { label: 'Chương', labelEn: 'Chapter', number: 'IV', vi: 'Điện từ', en: 'Electromagnetism' },
    spreadLabels: ['Tác dụng nhiệt, sáng, từ', 'Sinh lí và an toàn'],
    pages: [
      { number: 72, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: { vi: 'Mục tiêu. Sau bài này em sẽ:', en: 'Aims. After this lesson you will:' }, items: [
          L1('Nêu được các tác dụng của dòng điện xoay chiều (nhiệt, phát sáng, từ, sinh lí) và lấy được ví dụ minh hoạ.', 'Name the effects of alternating current (heating, luminous, magnetic, physiological) and give examples.')
        ] },
        { t: 'h2', n: 'I', vi: 'Tác dụng nhiệt', en: 'Heating effect' },
        { t: 'p', vi: 'Khi có dòng điện chạy qua, các vật dẫn nóng lên. Máy sấy tóc (Hình 15.1) dùng dây nung nóng để làm khô tóc; bàn là, ấm đun nước, bếp điện cũng hoạt động nhờ tác dụng này.', en: 'When current flows, conductors become warm. A hair dryer (Figure 15.1) uses a heating wire to dry hair; irons, kettles and electric stoves work in the same way.' },
        FIG('khtn15a', '15.1', 'Máy sấy tóc biến điện năng thành nhiệt', 'A hair dryer turns electrical energy into heat', true),
        { t: 'h2', n: 'II', vi: 'Tác dụng phát sáng', en: 'Luminous effect' },
        { t: 'p', vi: 'Dòng điện làm một số vật phát sáng. Đèn ống huỳnh quang (Hình 15.2) phát sáng nhờ lớp chất huỳnh quang; bóng đèn sợi đốt (Hình 15.3) có dây tóc nóng sáng; đèn LED phát sáng khi có dòng điện đi theo chiều thuận.', en: 'Current makes some objects glow. A fluorescent tube (Figure 15.2) glows through its fluorescent coating; an incandescent bulb (Figure 15.3) has a hot glowing filament; an LED lights when current flows forward.' },
        FIG('khtn15b', '15.2', 'Đèn ống huỳnh quang', 'A fluorescent tube', true),
        FIG('khtn15c', '15.3', 'Bóng đèn sợi đốt', 'An incandescent bulb', true),
        { t: 'activity', no: 1, title: { vi: 'Phân loại thiết bị theo tác dụng của dòng điện', en: 'Sorting devices by the effect of current' },
          vi: 'Kéo các thiết bị vào bốn ô: nhiệt, phát sáng, từ, sinh lí. Một thiết bị có thể thuộc nhiều ô (máy sấy tóc, bóng sợi đốt).', en: 'Drag the devices into four boxes: heating, luminous, magnetic, physiological. One device can belong to several boxes (hair dryer, incandescent bulb).' },
        { t: 'activity', no: 2, title: { vi: 'Thực hành ảo: dây tóc nóng sáng', en: 'Virtual practical: the glowing filament' },
          vi: 'Thay đổi hiệu điện thế và tần số, quan sát công suất P = U²/R, độ sáng và sự nhấp nháy ở tần số thấp.', en: 'Change the voltage and frequency; watch the power P = U²/R, the brightness and the flicker at low frequency.' }
      ] },
      { number: 73, blocks: [
        { t: 'h2', n: 'III', vi: 'Tác dụng từ', en: 'Magnetic effect' },
        { t: 'p', vi: 'Cuộn dây quấn quanh lõi sắt khi có dòng điện chạy qua sẽ hút được các vật bằng sắt, ví dụ chiếc đinh sắt (Hình 15.4). Với dòng điện một chiều, hai đầu cuộn dây có cực từ cố định; với dòng điện xoay chiều, cực từ đổi liên tục theo chiều dòng điện nhưng cuộn dây vẫn hút được sắt.', en: 'A coil wound on an iron core attracts iron objects, such as a nail (Figure 15.4), when current flows. With direct current the ends of the coil have fixed poles; with alternating current the poles swap with the direction of the current, yet the coil still attracts iron.' },
        FIG('khtn15d', '15.4', 'Cuộn dây có lõi sắt hút đinh sắt', 'A coil with an iron core attracts an iron nail', true),
        { t: 'ask', style: 'num', lead: { vi: 'Câu hỏi', en: 'Questions' }, items: [
          B('Khi dùng dòng điện xoay chiều, cuộn dây có hút được đinh sắt không? Vì sao?', 'With alternating current, can the coil attract the nail? Why?'),
          B('Chỉ ra điểm khác nhau về cực từ của cuộn dây khi dùng dòng điện một chiều và xoay chiều.', 'Point out how the poles of the coil differ between direct and alternating current.')
        ] },
        { t: 'tip', items: [
          L1('Em có biết: nam châm điện dùng dòng điện xoay chiều có thể tách bột sắt ra khỏi hỗn hợp (Hình 15.5). Tác dụng từ còn được dùng trong rơ-le, động cơ điện, máy chụp cộng hưởng từ (MRI) và tàu đệm từ.', 'Did you know? An electromagnet driven by alternating current can separate iron powder from a mixture (Figure 15.5). The magnetic effect is also used in relays, electric motors, MRI machines and maglev trains.')
        ] },
        FIG('khtn15e', '15.5', 'Nam châm điện tách bột sắt khỏi hỗn hợp', 'An electromagnet separating iron powder from a mixture', true),
        { t: 'activity', no: 1, title: { vi: 'Thực hành ảo: tác dụng từ, một chiều và xoay chiều', en: 'Virtual practical: the magnetic effect, DC and AC' },
          vi: 'Đổi giữa dòng một chiều và xoay chiều, kéo thanh trượt dòng điện và số vòng dây; quan sát lực hút, cực từ và kim la bàn.', en: 'Switch between DC and AC, move the sliders for current and number of turns; watch the pull, the poles and the compass needle.' }
      ] },
      { number: 74, blocks: [
        { t: 'h2', n: 'IV', vi: 'Tác dụng sinh lí', en: 'Physiological effect' },
        { t: 'p', vi: 'Dòng điện đi qua cơ thể có thể làm các cơ co lại; dòng điện đủ lớn có thể làm tim ngừng đập. Ngược lại, máy khử rung tim (Hình 15.6) dùng các xung điện ngắn, có quãng nghỉ, do nhân viên y tế được đào tạo điều khiển để đưa tim trở lại nhịp bình thường.', en: 'Current passing through the body can make muscles contract; a large enough current can stop the heart. In contrast, a defibrillator (Figure 15.6) uses short electrical pulses with rests in between, operated by trained medical staff, to restore a normal heartbeat.' },
        FIG('khtn15f', '15.6', 'Máy khử rung tim phát các xung điện ngắn', 'A defibrillator delivers short electrical pulses', true),
        { t: 'key', title: { vi: 'Lưu ý an toàn', en: 'Safety note' }, blocks: [{ t: 'p', vi: 'Không được đến gần các trạm biến áp và các thiết bị điện cao áp: điện áp rất lớn có thể gây nguy hiểm đến tính mạng ngay cả khi không chạm trực tiếp.', en: 'Never go near transformer substations or high-voltage equipment: very high voltage can be fatal even without direct contact.' }] },
        { t: 'activity', no: 1, title: { vi: 'An toàn khi dùng điện', en: 'Staying safe with electricity' },
          vi: 'Phân loại các thẻ thành “nên” và “không nên” làm. Phần này chỉ có chữ, không có hình ảnh gây sốc.', en: 'Sort the cards into “do” and “don’t”. This part uses text only, with no shocking images.' },
        { t: 'quiz', title: { vi: 'Tự kiểm tra', en: 'Self-check' }, items: [
          Q('q1', 'Máy sấy tóc hoạt động chủ yếu nhờ tác dụng nào của dòng điện?', 'A hair dryer works mainly through which effect of current?', [['Tác dụng nhiệt (và từ ở động cơ)', 'Heating (and magnetic in the motor)'], ['Chỉ tác dụng phát sáng', 'Luminous only'], ['Tác dụng sinh lí', 'Physiological'], ['Không có tác dụng nào', 'None']], 0, 'Dây nung nóng làm nóng không khí; động cơ quạt dùng tác dụng từ.', 'The heating wire warms the air; the fan motor uses the magnetic effect.'),
          Q('q2', 'Bóng đèn sợi đốt phát sáng vì:', 'An incandescent bulb glows because:', [['Dây tóc bị nung nóng', 'The filament is heated'], ['Có chất huỳnh quang', 'It has a fluorescent coating'], ['Có nam châm', 'It has a magnet'], ['Dòng điện đứng yên', 'The current is still']], 0, 'Dây tóc nóng tới nhiệt độ cao nên phát sáng.', 'The filament is heated to a high temperature and glows.'),
          Q('q3', 'Đèn LED sáng khi:', 'An LED lights when:', [['Dòng điện đi theo chiều thuận', 'Current flows in the forward direction'], ['Dòng đi theo chiều bất kì', 'Current flows in either direction'], ['Không có dòng điện', 'There is no current'], ['Chỉ khi có nam châm', 'Only with a magnet']], 0, 'LED chỉ cho dòng đi một chiều.', 'An LED passes current one way only.'),
          Q('q4', 'Cuộn dây lõi sắt có dòng xoay chiều chạy qua:', 'An iron-core coil carrying alternating current:', [['Không hút được sắt', 'Cannot attract iron'], ['Vẫn hút được sắt', 'Still attracts iron'], ['Chỉ đẩy sắt', 'Only repels iron'], ['Chỉ hút nhôm', 'Only attracts aluminium']], 1, 'Lực hút luôn hướng vào lõi dù cực từ đổi.', 'The pull always acts towards the core even as the poles swap.'),
          Q('q5', 'Với dòng một chiều, hai đầu cuộn dây:', 'With direct current the two ends of the coil:', [['Có cực từ cố định', 'Have fixed poles'], ['Đổi cực 100 lần mỗi giây', 'Swap poles 100 times per second'], ['Không có từ trường', 'Have no field'], ['Cùng là cực Bắc', 'Are both north poles']], 0, 'Chiều dòng không đổi nên cực không đổi.', 'The current direction is constant so the poles are constant.'),
          Q('q6', 'Dòng điện xoay chiều 50 Hz làm cực từ của cuộn dây đổi chiều:', 'A 50 Hz alternating current makes the coil’s poles swap:', [['50 lần/s', '50 times/s'], ['100 lần/s', '100 times/s'], ['25 lần/s', '25 times/s'], ['1 lần/s', 'once per second']], 1, 'Dòng đổi chiều $2f = 100$ lần/s.', 'The current reverses $2f = 100$ times/s.'),
          Q('q7', 'Dây điện trở $R = 10\\ \\Omega$ có dòng $2\\ \\text{A}$ chạy qua. Công suất toả nhiệt:', 'A $10\\ \\Omega$ wire carries $2\\ \\text{A}$. The heat power is:', [['20 W', '20 W'], ['40 W', '40 W'], ['5 W', '5 W'], ['80 W', '80 W']], 1, '$P = I^2R = 4 \\times 10 = 40$ W.', '$P = I^2R = 4 \\times 10 = 40$ W.'),
          Q('q8', 'Nam châm điện không được dùng trong:', 'An electromagnet is NOT used in:', [['Rơ-le', 'A relay'], ['Loa điện', 'A loudspeaker'], ['Bàn là thuần điện trở', 'A plain resistive iron heating element'], ['Cần cẩu sắt vụn', 'A scrap-iron crane']], 2, 'Bàn là dùng tác dụng nhiệt.', 'An iron uses the heating effect.'),
          Q('q9', 'Máy khử rung tim phát:', 'A defibrillator delivers:', [['Dòng điện liên tục rất lớn', 'A very large continuous current'], ['Các xung điện ngắn, có quãng nghỉ', 'Short pulses with rests'], ['Ánh sáng mạnh', 'Bright light'], ['Từ trường mạnh', 'A strong magnetic field']], 1, 'Máy dùng xung điện ngắn do người được đào tạo điều khiển.', 'It uses short pulses, operated by trained staff.'),
          Q('q10', 'Ở tần số thấp (2 – 10 Hz), đèn dây tóc nhấp nháy vì:', 'At low frequency (2 – 10 Hz) a filament lamp flickers because:', [['Công suất p(t) dao động', 'The power p(t) oscillates'], ['Dây tóc đứt', 'The filament breaks'], ['Điện trở bằng 0', 'The resistance is zero'], ['Dòng một chiều', 'The current is direct']], 0, 'p(t) = u²/R biến đổi, mắt thấy được khi f nhỏ.', 'p(t) = u²/R varies, and the eye notices it when f is low.'),
          Q('q11', 'Điều nào đúng về trạm biến áp?', 'Which is true about a transformer substation?', [['Có thể đến gần để nhặt diều', 'You may approach it to fetch a kite'], ['Không được đến gần', 'You must not go near'], ['An toàn nếu đứng gần', 'Safe if you stand close'], ['Chỉ nguy hiểm khi trời mưa', 'Dangerous only in rain']], 1, 'Điện áp rất cao, nguy hiểm đến tính mạng.', 'The voltage is very high and can be fatal.'),
          Q('q12', 'Thực hành ảo: tăng số vòng dây từ 200 lên 400 (cùng dòng điện). Lực hút:', 'Virtual practical: the number of turns rises from 200 to 400 (same current). The pull:', [['Không đổi', 'Is unchanged'], ['Tăng gấp bốn (mô hình ∝ (NI)²)', 'Quadruples (model ∝ (NI)²)'], ['Giảm một nửa', 'Halves'], ['Bằng 0', 'Is zero']], 1, 'Trong mô hình minh hoạ, lực ∝ (N·I)².', 'In the illustrative model the force is ∝ (N·I)².'),
          Q('q13', 'Điều cần làm trước khi sửa một thiết bị điện:', 'Before repairing an electrical appliance you should:', [['Ngắt nguồn điện', 'Disconnect the power'], ['Chạm vào dây để thử', 'Touch the wires to test'], ['Đứng chân trần trên sàn ướt', 'Stand barefoot on a wet floor'], ['Không cần làm gì', 'Do nothing']], 0, 'Luôn ngắt điện trước khi sửa.', 'Always switch off first.')
        ] },
        { t: 'key', title: { vi: 'Em đã học', en: 'What you have learned' }, blocks: [{ t: 'list', items: [
          L1('Dòng điện xoay chiều có tác dụng nhiệt, phát sáng, từ và sinh lí.', 'Alternating current has heating, luminous, magnetic and physiological effects.'),
          L1('Nam châm điện dùng dòng xoay chiều vẫn hút được sắt dù cực từ liên tục đổi.', 'An AC electromagnet still attracts iron even though its poles keep swapping.')
        ] }] },
        { t: 'key', title: { vi: 'Em có thể', en: 'You can' }, blocks: [{ t: 'list', items: [
          L1('Phân loại thiết bị điện theo tác dụng của dòng điện.', 'Classify electrical devices by the effect of current they use.'),
          L1('Nêu quy tắc an toàn điện cơ bản.', 'State basic electrical safety rules.')
        ] }] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          L1('Nhiệt (máy sấy, bàn là), phát sáng (đèn), từ (nam châm điện), sinh lí (co cơ, khử rung tim).', 'Heating (dryer, iron), luminous (lamps), magnetic (electromagnet), physiological (muscle contraction, defibrillation).'),
          L1('Không lại gần trạm biến áp; ngắt điện trước khi sửa chữa.', 'Stay away from substations; switch off before repairs.')
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.', keys: ['fx-heating', 'fx-luminous', 'fx-magnetic', 'fx-physiological', 'fx-defibrillator', 'fx-substation', 'fx-safety'] }
      ] }
    ]
  };
  (function strip(o) {
    if (Array.isArray(o)) o.forEach(strip);
    else if (o && typeof o === 'object') { for (const k in o) { if (k === 'vi' && typeof o[k] === 'string') o[k] = o[k].replace(/\{([^{}|]+)\|[^{}]+\}/g, '$1'); else strip(o[k]); } }
  })(D.lessons['khtn9-bai15'].pages);
})();
