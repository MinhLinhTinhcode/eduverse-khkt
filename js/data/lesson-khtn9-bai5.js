/* ==========================================================================
   KHOA HỌC TỰ NHIÊN 9 — CHƯƠNG II. ÁNH SÁNG
     'khtn9-bai5'  Bài 5. Khúc xạ ánh sáng (tr. 25–29)
   NỘI DUNG NGUYÊN BẢN do nhóm dự án soạn theo cấu trúc mục, số hiệu hình/bảng, công thức và số liệu của bài;
   không phải bản chép sách giáo khoa. Hãy đối chiếu với sách in trước khi dùng chính thức.
   Các mô phỏng kéo thả (olab-*) nằm trong js/optics-lab.js và được chèn qua js/interactive.js (PLACE).
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
    refraction: g('refraction', '/rɪˈfræk.ʃən/', 'n', 'sự khúc xạ',
      'Trong KHTN: Hiện tượng tia sáng bị gãy khúc tại mặt phân cách khi truyền từ môi trường trong suốt này sang môi trường trong suốt khác.', 'Refraction makes a straw look bent in a glass of water.', 'Khúc xạ làm chiếc ống hút trông như bị gãy trong cốc nước.'),
    refract: g('refracted', '/rɪˈfræk.tɪd/', 'adj', 'bị khúc xạ',
      'Trong KHTN: Nói về tia sáng đã bị lệch hướng khi đi qua mặt phân cách.', 'The refracted ray bends toward the normal.', 'Tia khúc xạ lệch lại gần pháp tuyến.'),
    'optics-medium': g('medium', '/ˈmiː.di.əm/', 'n', 'môi trường',
      'Trong KHTN: Chất (không khí, nước, thuỷ tinh…) mà ánh sáng truyền qua. Số nhiều: media.', 'Light slows down in a denser medium.', 'Ánh sáng truyền chậm hơn trong môi trường đặc hơn.'),
    transparent: g('transparent', '/trænsˈpær.ənt/', 'adj', 'trong suốt',
      'Trong KHTN: Cho ánh sáng đi qua gần như hoàn toàn, nhìn xuyên qua được.', 'Glass and water are transparent.', 'Thuỷ tinh và nước là các môi trường trong suốt.'),
    interface: g('interface', '/ˈɪn.tə.feɪs/', 'n', 'mặt phân cách',
      'Trong KHTN: Bề mặt ngăn cách hai môi trường, nơi ánh sáng bị khúc xạ hoặc phản xạ.', 'Light bends at the interface between air and water.', 'Ánh sáng bị bẻ ở mặt phân cách giữa không khí và nước.'),
    'incident-ray': g('incident ray', '/ˈɪn.sɪ.dənt reɪ/', 'n', 'tia tới',
      'Trong KHTN: Tia sáng chiếu tới mặt phân cách, kí hiệu SI.', 'The incident ray SI strikes the surface at point I.', 'Tia tới SI chiếu vào mặt phân cách tại điểm I.'),
    'refracted-ray': g('refracted ray', '/rɪˈfræk.tɪd reɪ/', 'n', 'tia khúc xạ',
      'Trong KHTN: Tia sáng đi vào môi trường thứ hai sau khi bị gãy khúc, kí hiệu IK.', 'The refracted ray IK lies on the other side of the normal.', 'Tia khúc xạ IK nằm ở bên kia pháp tuyến.'),
    'optics-normal': g('normal', '/ˈnɔː.məl/', 'n', 'pháp tuyến',
      'Trong KHTN: Đường thẳng vuông góc với mặt phân cách tại điểm tới, kí hiệu NN′. (Nghĩa khác: bình thường.)', 'Angles are measured from the normal.', 'Các góc được đo từ pháp tuyến.'),
    'angle-incidence': g('angle of incidence', '/ˈæŋ.ɡəl əv ˈɪn.sɪ.dəns/', 'n', 'góc tới',
      'Trong KHTN: Góc giữa tia tới và pháp tuyến, kí hiệu i.', 'Increase the angle of incidence to 60°.', 'Hãy tăng góc tới lên 60°.'),
    'angle-refraction': g('angle of refraction', '/ˈæŋ.ɡəl əv rɪˈfræk.ʃən/', 'n', 'góc khúc xạ',
      'Trong KHTN: Góc giữa tia khúc xạ và pháp tuyến, kí hiệu r.', 'The angle of refraction is smaller than the angle of incidence.', 'Góc khúc xạ nhỏ hơn góc tới.'),
    'plane-incidence': g('plane of incidence', '/pleɪn əv ˈɪn.sɪ.dəns/', 'n', 'mặt phẳng tới',
      'Trong KHTN: Mặt phẳng chứa tia tới và pháp tuyến; tia khúc xạ nằm trong mặt phẳng này.', 'The refracted ray stays in the plane of incidence.', 'Tia khúc xạ nằm trong mặt phẳng tới.'),
    'half-disc': g('half-disc block', '/hɑːf dɪsk blɒk/', 'n', 'bản bán trụ',
      'Trong KHTN: Khối thuỷ tinh hình nửa hình tròn, cho tia sáng đi vào theo bán kính nên không bị lệch ở mặt cong.', 'Aim the beam at the centre of the half-disc block.', 'Chiếu chùm sáng vào tâm của bản bán trụ.'),
    protractor: g('protractor', '/prəˈtræk.tər/', 'n', 'thước đo góc, vòng chia độ',
      'Trong KHTN: Dụng cụ hình tròn hoặc nửa tròn có chia độ để đọc góc.', 'Read the angle on the protractor.', 'Đọc góc trên vòng chia độ.'),
    'phys-sine': g('sine', '/saɪn/', 'n', 'sin (sin của góc)',
      'Trong KHTN: Tỉ số cạnh đối trên cạnh huyền của một góc nhọn; đồng âm với “sign”.', 'The sine of 30° is 0.5.', 'Sin của 30° bằng 0,5.'),
    constant: g('constant', '/ˈkɒn.stənt/', 'adj', 'không đổi, hằng số',
      'Trong KHTN: Có giá trị không thay đổi khi các điều kiện khác thay đổi.', 'The ratio sin i / sin r is constant.', 'Tỉ số sin i / sin r là không đổi.'),
    'refractive-index': g('refractive index', '/rɪˈfræk.tɪv ˈɪn.deks/', 'n', 'chiết suất',
      'Trong KHTN: Đại lượng cho biết ánh sáng đi chậm hơn bao nhiêu lần so với trong chân không: n = c / v.', 'The refractive index of water is 1.333.', 'Chiết suất của nước là 1,333.'),
    'relative-index': g('relative refractive index', '/ˈrel.ə.tɪv rɪˈfræk.tɪv ˈɪn.deks/', 'n', 'chiết suất tỉ đối',
      'Trong KHTN: Tỉ số n₂₁ = n₂ / n₁ của môi trường 2 đối với môi trường 1.', 'A relative index above 1 means the ray bends toward the normal.', 'Chiết suất tỉ đối lớn hơn 1 nghĩa là tia lệch lại gần pháp tuyến.'),
    vacuum: g('vacuum', '/ˈvæk.juːm/', 'n', 'chân không',
      'Trong KHTN: Không gian không có vật chất; ánh sáng truyền với tốc độ c = 3·10⁸ m/s.', 'Light travels fastest in a vacuum.', 'Ánh sáng truyền nhanh nhất trong chân không.'),
    'speed-light': g('speed of light', '/spiːd əv laɪt/', 'n', 'tốc độ ánh sáng',
      'Trong KHTN: Tốc độ truyền của ánh sáng; trong chân không c = 3·10⁸ m/s.', 'The speed of light in glass is lower than in air.', 'Tốc độ ánh sáng trong thuỷ tinh nhỏ hơn trong không khí.'),
    'optics-pin': g('pin', '/pɪn/', 'n', 'đinh ghim',
      'Trong KHTN: Cây ghim nhỏ cắm trên tấm xốp để đánh dấu đường đi của tia sáng. (Nghĩa khác: mã PIN.)', 'Stick a pin at point O.', 'Cắm một đinh ghim tại điểm O.'),
    coin: g('coin', '/kɔɪn/', 'n', 'đồng xu',
      'Trong KHTN: Vật nhỏ, dẹt, dùng để quan sát sự khúc xạ qua mặt nước.', 'The coin seems to float higher in the water.', 'Đồng xu có vẻ nổi cao hơn trong nước.'),
    toward: g('toward', '/təˈwɔːd/', 'prep', 'lại gần, hướng về',
      'Trong KHTN: Nói tia lệch lại gần pháp tuyến (toward the normal). Trái nghĩa: away from.', 'The ray bends toward the normal.', 'Tia lệch lại gần pháp tuyến.'),
    'away-from': g('away from', '/əˈweɪ frɒm/', 'prep', 'ra xa',
      'Trong KHTN: Nói tia lệch ra xa pháp tuyến (away from the normal).', 'Light bends away from the normal when it leaves water.', 'Ánh sáng lệch ra xa pháp tuyến khi rời nước.')
  });

  const T51 = [[0, 0], [20, 13], [40, 25], [60, 35], [80, 41]];

  D.lessons['khtn9-bai5'] = {
    gradeId: 9, number: '5', book: 'Khoa học tự nhiên 9',
    title: { vi: 'Khúc xạ ánh sáng', en: 'Refraction of light' },
    topic: { label: 'Chương', labelEn: 'Chapter', number: 'II', vi: 'Ánh sáng', en: 'Light' },
    spreadLabels: ['Hiện tượng khúc xạ', 'Định luật khúc xạ', 'Chiết suất và luyện tập'],
    pages: [
      { number: 25, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: { vi: 'Mục tiêu. Sau bài học này em sẽ:', en: 'Aims. After this lesson you will:' }, items: [
          { vi: 'Làm thí nghiệm chứng tỏ tia sáng bị khúc xạ khi truyền từ môi trường này sang môi trường khác.', en: 'Carry out an experiment showing that a light ray is {refracted|refract} when it passes from one {medium|optics-medium} to another.' },
          { vi: 'Nêu được chiết suất bằng tỉ số tốc độ ánh sáng trong chân không (hoặc không khí) với tốc độ ánh sáng trong môi trường.', en: 'State that the {refractive index|refractive-index} is the ratio of the {speed of light|speed-light} in a {vacuum|vacuum} (or air) to that in the medium.' },
          { vi: 'Rút ra và phát biểu định luật khúc xạ ánh sáng; vận dụng $\\frac{\\sin i}{\\sin r} = n_{21}$ trong các bài toán đơn giản.', en: 'Work out and state the law of refraction; use $\\frac{\\sin i}{\\sin r} = n_{21}$ in simple problems.' },
          { vi: 'Giải thích một số hiện tượng thường gặp bằng sự khúc xạ ánh sáng.', en: 'Explain some everyday phenomena by refraction.' }
        ] },
        P('Vì sao khi trong cốc chưa có nước, ta không nhìn thấy đồng xu ở đáy (hình a); còn giữ nguyên vị trí mắt và cốc, rót nước vào thì lại nhìn thấy đồng xu (hình b)?',
          'Why can we not see the {coin|coin} at the bottom while the cup is empty (picture a), yet see it once water is poured in, with the eye and the cup left where they were (picture b)?', { badge: 'fire' }),
        FIG('khtn5e', '', 'Cốc không có nước (a) và có nước (b)', 'An empty cup (a) and a cup with water (b)', true),
        { t: 'h2', n: 'I', vi: 'Hiện tượng khúc xạ ánh sáng', en: 'The phenomenon of refraction' },
        { t: 'activity', no: 1, title: { vi: 'Thí nghiệm 1: Tìm hiểu hiện tượng khúc xạ ánh sáng', en: 'Experiment 1: Investigating refraction' },
          vi: 'Chuẩn bị: bảng thí nghiệm gắn tấm nhựa in vòng chia độ; một bản bán trụ bằng thuỷ tinh; đèn 12 V – 21 W có khe cài bản chắn sáng; nguồn điện. Tiến hành: bố trí như Hình 5.1; chiếu một chùm sáng hẹp SI vào tâm I của bản bán trụ; quan sát đường đi của chùm sáng.',
          en: 'Prepare: a board with a {protractor|protractor} sheet, a glass {half-disc block|half-disc}, a 12 V – 21 W lamp with a slit, a power supply. Do: set up as in Figure 5.1; shine a narrow beam SI at the centre I of the block; watch the path of the beam.', items: [] },
        FIG('khtn5a', '5.1', 'Bố trí thí nghiệm khúc xạ ánh sáng', 'Setting up the refraction experiment', true)
      ] },
      { number: 26, blocks: [
        { t: 'ask', style: 'num', lead: { vi: 'Trả lời', en: 'Answer' }, items: [B('Chùm sáng truyền từ không khí vào thuỷ tinh bị gãy khúc (lệch khỏi phương truyền ban đầu) tại đâu?', 'Where does the beam, going from air into glass, bend (leave its original direction)?')] },
        { t: 'p', vi: 'Quy ước trên Hình 5.2: I là điểm tới; SI là tia tới; IK là tia khúc xạ; NN′ vuông góc với mặt phân cách tại I là pháp tuyến; góc SIN là góc tới i; góc KIN′ là góc khúc xạ r; mặt phẳng chứa tia tới SI và pháp tuyến NN′ là mặt phẳng tới.',
          en: 'Conventions in Figure 5.2: I is the point of incidence; SI is the {incident ray|incident-ray}; IK is the {refracted ray|refracted-ray}; NN′, perpendicular to the {interface|interface} at I, is the {normal|optics-normal}; angle SIN is the {angle of incidence|angle-incidence} i; angle KIN′ is the {angle of refraction|angle-refraction} r; the plane containing SI and NN′ is the {plane of incidence|plane-incidence}.' },
        FIG('khtn5b', '5.2', 'Đường truyền của chùm tia sáng', 'The path of a light beam', true),
        { t: 'key', title: { vi: 'Hiện tượng khúc xạ ánh sáng', en: 'Refraction of light' }, blocks: [
          P('Hiện tượng tia sáng truyền từ môi trường trong suốt này sang môi trường trong suốt khác bị gãy khúc (lệch khỏi phương truyền ban đầu) tại mặt phân cách giữa hai môi trường gọi là **hiện tượng khúc xạ ánh sáng**.',
            'When a light ray passes from one {transparent|transparent} medium into another and bends at the interface, the effect is called **{refraction|refraction}** of light.')
        ] },
        { t: 'ask', style: 'num', lead: { vi: 'Hình 5.3', en: 'Figure 5.3' }, items: [B('Một tia sáng tới mặt nước cho một tia phản xạ và một tia khúc xạ (Hình 5.3). Vẽ vào vở và bổ sung chiều mũi tên của các tia sáng. (Làm thử bằng mô phỏng bên dưới.)', 'A light ray striking water gives a reflected and a refracted ray (Figure 5.3). Copy the figure and add the arrows. (Try it in the simulation below.)')] },
        FIG('khtn5f', '5.3', 'Một tia sáng tới mặt nước', 'A light ray meeting the water surface', true),
        { t: 'h2', n: 'II', vi: 'Định luật khúc xạ ánh sáng', en: 'The law of refraction' },
        { t: 'activity', no: 2, title: { vi: 'Thí nghiệm 2: Mối liên hệ giữa góc khúc xạ và góc tới', en: 'Experiment 2: Relating the angle of refraction to the angle of incidence' },
          vi: 'Dụng cụ và bố trí như Thí nghiệm 1. Chiếu tia sáng vào điểm tới I (tâm vòng chia độ) lần lượt với góc tới 0°, 20°, 40°, 60°, 80°. Đọc góc khúc xạ tương ứng và ghi vào bảng theo mẫu Bảng 5.1. Em có thể làm trên mô phỏng dưới đây: kéo chấm S để đổi góc tới, bấm “Ghi kết quả”.',
          en: 'Same apparatus and set-up as Experiment 1. Send the ray to I (the centre of the protractor) with angles of incidence 0°, 20°, 40°, 60°, 80°. Read each angle of refraction and fill in a table like Table 5.1. You can do this in the simulation below: drag the dot S to change i and press “Record”.', items: [] }
      ] },
      { number: 27, blocks: [
        { t: 'p', vi: 'Bảng 5.1 (kết quả đo với thuỷ tinh có chiết suất xấp xỉ 1,5; các góc làm tròn đến độ):', en: 'Table 5.1 (measured with glass of refractive index about 1.5; angles rounded to whole degrees):' },
        { t: 'table', head: true, rows: [[C('Góc tới i', 'Angle of incidence i'), C('Góc khúc xạ r', 'Angle of refraction r'), C('sin i', 'sin i'), C('sin r', 'sin r'), C('sin i / sin r', 'sin i / sin r')]].concat(T51.map((r) => {
          const si = Math.sin(r[0] * Math.PI / 180), sr = Math.sin(r[1] * Math.PI / 180), f = (v) => v.toFixed(2).replace('.', ',');
          return [C(r[0] + '°', r[0] + '°'), C(r[1] + '°', r[1] + '°'), C(f(si), f(si)), C(f(sr), f(sr)), r[0] === 0 ? C('—', '—') : C(f(si / sr), f(si / sr))];
        })) },
        P('Chú ý: góc đo bằng vòng chia độ chỉ chính xác tới khoảng 1°, nên tỉ số $\\frac{\\sin i}{\\sin r}$ ở các hàng dao động nhẹ quanh 1,5. Với $i = 0°$ thì $r = 0°$ nên không lập tỉ số.', 'Note: a protractor reads only to about 1°, so the ratio $\\frac{\\sin i}{\\sin r}$ wobbles slightly around 1.5. For $i = 0°$ we get $r = 0°$, so no ratio is formed.'),
        { t: 'ask', style: 'num', lead: { vi: 'Trả lời và thực hiện', en: 'Answer and do' }, items: [
          B('Tia khúc xạ nằm ở phía nào của pháp tuyến so với tia tới?', 'On which side of the normal is the refracted ray, compared with the incident ray?'),
          B('So sánh độ lớn góc tới và góc khúc xạ.', 'Compare the angle of incidence with the angle of refraction.'),
          B('Nhận xét tỉ số giữa sin góc tới và sin góc khúc xạ.', 'Comment on the ratio of the sine of the angle of incidence to the sine of the angle of refraction.')
        ] },
        { t: 'activity', no: 3, title: { vi: 'Thí nghiệm 3: Khảo sát phương của tia khúc xạ', en: 'Experiment 3: The direction of the refracted ray' },
          vi: 'Dụng cụ: bản bán trụ thuỷ tinh, tấm xốp mỏng gắn bảng chia độ, bốn đinh ghim giống nhau, tấm nhựa phẳng. Cắm đinh O (tâm) và A để xác định pháp tuyến OA; cắm đinh B để xác định tia tới BO. Đặt mắt nhìn qua bản bán trụ sao cho đầu đinh O che khuất ảnh đầu đinh B, rồi cắm đinh C sao cho đầu C che khuất ảnh của B và O: khi đó tia khúc xạ là OC. Bỏ bản bán trụ ra, dùng tấm nhựa phẳng kiểm tra xem BO, OA, OC có đồng phẳng không. (Lưu ý: chiều cao đinh bằng khoảng nửa bề dày bản bán trụ để mặt phẳng tới song song với tấm xốp — chi tiết này cần đối chiếu với sách in.)',
          en: 'Apparatus: a glass half-disc, a thin foam board with a protractor, four identical {pins|optics-pin}, a flat plastic sheet. Put pins at O (the centre) and A to mark the normal OA; put a pin at B to mark the incident ray BO. Look through the block so that the head of pin O hides the image of pin B, then place pin C so that its head hides the images of B and O: the refracted ray is then OC. Remove the block and use the flat sheet to check whether BO, OA, OC lie in one plane. (Note: the pins’ height is about half the thickness of the block, so the plane of incidence is parallel to the board — please check this detail against the printed book.)', items: [] },
        FIG('khtn5g', '5.4', 'Thí nghiệm tìm mặt phẳng chứa tia khúc xạ', 'Finding the plane that holds the refracted ray', true)
      ] },
      { number: 28, blocks: [
        { t: 'key', title: { vi: 'Định luật khúc xạ ánh sáng', en: 'The law of refraction' }, blocks: [
          { t: 'list', items: [
            { vi: 'Tia khúc xạ nằm trong mặt phẳng tới và ở phía bên kia pháp tuyến so với tia tới.', en: 'The refracted ray lies in the plane of incidence, on the other side of the normal from the incident ray.' },
            { vi: 'Với hai môi trường trong suốt nhất định, tỉ số giữa sin góc tới và sin góc khúc xạ luôn không đổi:', en: 'For two given transparent media, the ratio of the sine of the angle of incidence to the sine of the angle of refraction is always {constant|constant}:' }
          ] },
          M('\\frac{\\sin i}{\\sin r} = \\text{hằng số}', '(5.1)')
        ] },
        { t: 'ask', style: 'num', lead: { vi: 'Hình 5.5', en: 'Figure 5.5' }, items: [B('Hình 5.5 mô tả tia sáng truyền từ nước ra không khí. Chỉ ra điểm tới, tia tới, tia khúc xạ, vẽ pháp tuyến tại điểm tới. So sánh độ lớn của góc khúc xạ và góc tới.', 'Figure 5.5 shows a ray going from water into air. Identify the point of incidence, the incident ray and the refracted ray, and draw the normal. Compare the angle of refraction with the angle of incidence.')] },
        FIG('khtn5c', '5.5', 'Tia sáng truyền từ nước ra không khí', 'A ray going from water into air', true),
        P('Quay lại câu hỏi mở bài: quan sát đường truyền của tia sáng xuất phát từ đồng xu (Hình 5.6) và vận dụng điều vừa học để trả lời.', 'Back to the opening question: look at the path of a ray leaving the coin (Figure 5.6) and use what you have just learned.'),
        FIG('khtn5d', '5.6', 'Đường truyền của tia sáng xuất phát từ đồng xu', 'The path of a ray leaving the coin', true)
      ] },
      { number: 29, blocks: [
        { t: 'h2', n: 'III', vi: 'Chiết suất của môi trường', en: 'The refractive index of a medium' },
        { t: 'h3', vi: '1. Chiết suất tỉ đối', en: '1. Relative refractive index' },
        P('Tỉ số không đổi $\\frac{\\sin i}{\\sin r}$ gọi là **chiết suất tỉ đối** $n_{21}$ của môi trường 2 (chứa tia khúc xạ) đối với môi trường 1 (chứa tia tới):', 'The constant ratio $\\frac{\\sin i}{\\sin r}$ is called the **{relative refractive index|relative-index}** $n_{21}$ of medium 2 (with the refracted ray) with respect to medium 1 (with the incident ray):'),
        M('\\frac{\\sin i}{\\sin r} = n_{21} = \\frac{n_2}{n_1}', '(5.2)'),
        { t: 'list', items: [
          { vi: 'Nếu $n_{21} > 1$ thì $r < i$: tia khúc xạ lệch lại gần pháp tuyến hơn.', en: 'If $n_{21} > 1$ then $r < i$: the refracted ray bends {toward|toward} the normal.' },
          { vi: 'Nếu $n_{21} < 1$ thì $r > i$: tia khúc xạ lệch ra xa pháp tuyến hơn.', en: 'If $n_{21} < 1$ then $r > i$: the refracted ray bends {away from|away-from} the normal.' }
        ] },
        { t: 'h3', vi: '2. Chiết suất tuyệt đối', en: '2. Absolute refractive index' },
        P('**Chiết suất tuyệt đối** (gọi tắt là chiết suất) của một môi trường là chiết suất tỉ đối của môi trường đó đối với chân không. Nguyên nhân khúc xạ là tốc độ ánh sáng thay đổi khi sang môi trường khác:', 'The **absolute refractive index** (the “index” for short) of a medium is its relative index with respect to a vacuum. Refraction happens because the speed of light changes in the new medium:'),
        M('n = \\frac{c}{v}', '(5.3)'),
        P('Trong đó $c = 3 \\cdot 10^{8}$ m/s là tốc độ ánh sáng trong chân không, $v$ là tốc độ ánh sáng trong môi trường. Chiết suất của chân không bằng 1; của không khí là 1,00029, thường làm tròn là 1.', 'Here $c = 3 \\cdot 10^{8}$ m/s is the speed of light in a vacuum and $v$ is its speed in the medium. The index of a vacuum is 1; that of air is 1.00029, usually rounded to 1.'),
        P('Bảng 5.2. Chiết suất một số môi trường (ở 20 °C; chất khí ở 0 °C, 1 atm):', 'Table 5.2. Refractive index of some media (at 20 °C; gases at 0 °C, 1 atm):'),
        { t: 'table', head: true, rows: [
          [C('Chất rắn', 'Solid'), C('Chiết suất', 'Index'), C('Chất lỏng, chất khí', 'Liquid or gas'), C('Chiết suất', 'Index')],
          [C('Kim cương', 'Diamond'), C('2,419', '2.419'), C('Nước', 'Water'), C('1,333', '1.333')],
          [C('Thuỷ tinh crown', 'Crown glass'), C('1,464 đến 1,532', '1.464 to 1.532'), C('Ethylic alcohol', 'Ethyl alcohol'), C('1,361', '1.361')],
          [C('Thuỷ tinh flint', 'Flint glass'), C('1,603 đến 1,865', '1.603 to 1.865'), C('Không khí', 'Air'), C('1,00029', '1.00029')],
          [C('Nước đá', 'Ice'), C('1,309', '1.309'), C('Khí carbon dioxide', 'Carbon dioxide'), C('1,00045', '1.00045')],
          [C('Muối ăn (NaCl)', 'Table salt (NaCl)'), C('1,544', '1.544'), C('', ''), C('', '')]
        ] },
        { t: 'ask', style: 'num', lead: { vi: 'Câu hỏi', en: 'Questions' }, items: [
          B('Khi tia sáng đi từ môi trường này sang môi trường khác, chiết suất tỉ đối của hai môi trường cho ta biết điều gì về đường đi của tia sáng?', 'When a ray goes from one medium to another, what does the relative index of the two media tell us about the path of the ray?'),
          B('Tính chiết suất của nước, biết tia sáng truyền từ không khí tới với góc tới $i = 60°$ thì góc khúc xạ trong nước là $r = 40°$.', 'Find the refractive index of water, given that a ray from air with $i = 60°$ has $r = 40°$ in the water.')
        ] },
        { t: 'ex', kind: 'example', no: 1, body: [
          P('Tia sáng truyền từ không khí ($n_1 = 1$) vào thuỷ tinh có chiết suất $n_2 = 1{,}5$ với góc tới $60°$. Tính góc khúc xạ và tốc độ ánh sáng trong thuỷ tinh.', 'A ray goes from air ($n_1 = 1$) into glass of index $n_2 = 1.5$ with $i = 60°$. Find the angle of refraction and the speed of light in the glass.')
        ], solution: [
          P('$\\sin r = \\frac{\\sin 60°}{1{,}5} = \\frac{0{,}866}{1{,}5} = 0{,}577$ nên $r \\approx 35{,}3°$ (nhỏ hơn $i$: lệch lại gần pháp tuyến).', '$\\sin r = \\frac{\\sin 60°}{1.5} = \\frac{0.866}{1.5} = 0.577$, so $r \\approx 35.3°$ (smaller than $i$: bends toward the normal).'),
          P('$v = \\frac{c}{n} = \\frac{3 \\cdot 10^{8}}{1{,}5} = 2 \\cdot 10^{8}$ m/s.', '$v = \\frac{c}{n} = \\frac{3 \\cdot 10^{8}}{1.5} = 2 \\cdot 10^{8}$ m/s.')
        ] },
        { t: 'head', kind: 'practice', vi: 'Luyện tập', en: 'Practice' },
        { t: 'ex', kind: 'practice', no: 1, body: [
          P('Chiếu tia sáng từ không khí vào nước ($n = 1{,}333$) với góc tới $40°$. Tính góc khúc xạ.', 'A ray from air enters water ($n = 1.333$) at $i = 40°$. Find the angle of refraction.')
        ], solution: [P('$\\sin r = \\frac{\\sin 40°}{1{,}333} = \\frac{0{,}6428}{1{,}333} = 0{,}4822$ nên $r \\approx 28{,}8°$.', '$\\sin r = \\frac{\\sin 40°}{1.333} = \\frac{0.6428}{1.333} = 0.4822$, so $r \\approx 28.8°$.')] },
        { t: 'ex', kind: 'practice', no: 2, body: [
          P('Tốc độ ánh sáng trong một chất lỏng là $2{,}25 \\cdot 10^{8}$ m/s. Tính chiết suất của chất lỏng.', 'The speed of light in a liquid is $2.25 \\cdot 10^{8}$ m/s. Find its refractive index.')
        ], solution: [P('$n = \\frac{3 \\cdot 10^{8}}{2{,}25 \\cdot 10^{8}} \\approx 1{,}333$: đó là nước.', '$n = \\frac{3 \\cdot 10^{8}}{2.25 \\cdot 10^{8}} \\approx 1.333$: it is water.')] },
        { t: 'head', kind: 'apply', vi: 'Vận dụng', en: 'Apply' },
        { t: 'ex', kind: 'apply', no: 1, body: [
          P('Giải thích vì sao nhìn xuống đáy bể bơi, ta thấy đáy bể “nông hơn” thực tế.', 'Explain why the bottom of a swimming pool looks shallower than it really is.')
        ], solution: [P('Tia sáng từ đáy bể đi ra không khí bị khúc xạ, lệch ra xa pháp tuyến. Mắt nhìn theo tia khúc xạ nên thấy đáy ở vị trí cao hơn vị trí thật.', 'Rays from the bottom are refracted as they leave the water and bend away from the normal. The eye follows the refracted rays back and sees the bottom higher than it really is.')] },
        { t: 'quiz', title: { vi: 'Tự kiểm tra', en: 'Self-check' }, items: [
          Q('q1', 'Hiện tượng khúc xạ ánh sáng là hiện tượng:', 'Refraction of light is the effect in which:', [['Tia sáng bị gãy khúc tại mặt phân cách hai môi trường trong suốt', 'A ray bends at the interface of two transparent media'], ['Tia sáng bị hắt trở lại môi trường cũ', 'A ray bounces back into the first medium'], ['Tia sáng bị hấp thụ hoàn toàn', 'A ray is absorbed completely'], ['Tia sáng đi thẳng qua mọi môi trường', 'A ray goes straight through every medium']], 0, 'Khúc xạ là sự gãy khúc của tia sáng khi sang môi trường trong suốt khác.', 'Refraction is the bending of a ray when it enters another transparent medium.'),
          Q('q2', 'Tia sáng chiếu vuông góc với mặt phân cách ($i = 0°$) thì góc khúc xạ là:', 'A ray hits the interface along the normal ($i = 0°$). The angle of refraction is:', [['0°', '0°'], ['45°', '45°'], ['90°', '90°'], ['Bằng chiết suất', 'Equal to the index']], 0, '$\\sin r = \\frac{n_1}{n_2}\\sin 0° = 0$ nên $r = 0°$: tia đi thẳng.', '$\\sin r = \\frac{n_1}{n_2}\\sin 0° = 0$, so $r = 0°$: the ray goes straight on.'),
          Q('q3', 'Không khí → thuỷ tinh ($n = 1{,}5$), $i = 60°$. Góc khúc xạ gần nhất với:', 'Air → glass ($n = 1.5$), $i = 60°$. The angle of refraction is closest to:', [['30°', '30°'], ['35,3°', '35.3°'], ['40°', '40°'], ['60°', '60°']], 1, '$\\sin r = 0{,}866 / 1{,}5 = 0{,}577$, $r \\approx 35{,}3°$.', '$\\sin r = 0.866 / 1.5 = 0.577$, $r \\approx 35.3°$.'),
          Q('q4', 'Tia sáng từ không khí tới nước với $i = 60°$ thì $r = 40°$. Chiết suất của nước khoảng:', 'A ray from air hits water at $i = 60°$ and $r = 40°$. The index of water is about:', [['1,15', '1.15'], ['1,35', '1.35'], ['1,50', '1.50'], ['1,73', '1.73']], 1, '$n = \\frac{\\sin 60°}{\\sin 40°} = \\frac{0{,}866}{0{,}643} \\approx 1{,}35$.', '$n = \\frac{\\sin 60°}{\\sin 40°} = \\frac{0.866}{0.643} \\approx 1.35$.'),
          Q('q5', 'Chiết suất thuỷ tinh $n = 1{,}5$. Tốc độ ánh sáng trong thuỷ tinh là:', 'Glass has $n = 1.5$. The speed of light in it is:', [['$1 \\cdot 10^{8}$ m/s', '$1 \\cdot 10^{8}$ m/s'], ['$2 \\cdot 10^{8}$ m/s', '$2 \\cdot 10^{8}$ m/s'], ['$3 \\cdot 10^{8}$ m/s', '$3 \\cdot 10^{8}$ m/s'], ['$4{,}5 \\cdot 10^{8}$ m/s', '$4.5 \\cdot 10^{8}$ m/s']], 1, '$v = c / n = 3 \\cdot 10^{8} / 1{,}5 = 2 \\cdot 10^{8}$ m/s.', '$v = c / n = 3 \\cdot 10^{8} / 1.5 = 2 \\cdot 10^{8}$ m/s.'),
          Q('q6', 'Ánh sáng từ không khí vào nước thì tia khúc xạ:', 'When light goes from air into water the refracted ray:', [['Lệch lại gần pháp tuyến', 'Bends toward the normal'], ['Lệch ra xa pháp tuyến', 'Bends away from the normal'], ['Không lệch', 'Does not bend'], ['Nằm trên pháp tuyến', 'Lies on the normal']], 0, '$n_{21} = 1{,}333 > 1$ nên $r < i$.', '$n_{21} = 1.333 > 1$, so $r < i$.'),
          Q('q7', 'Ánh sáng từ nước ra không khí thì:', 'When light goes from water into air:', [['$r < i$', '$r < i$'], ['$r = i$', '$r = i$'], ['$r > i$', '$r > i$'], ['Không có tia khúc xạ với mọi góc tới', 'There is never a refracted ray']], 2, '$n_{21} = 1 / 1{,}333 < 1$ nên $r > i$ (ra xa pháp tuyến).', '$n_{21} = 1 / 1.333 < 1$, so $r > i$ (away from the normal).'),
          Q('q8', 'Chiết suất tỉ đối của nước ($1{,}333$) đối với thuỷ tinh ($1{,}5$) là:', 'The relative index of water (1.333) with respect to glass (1.5) is:', [['0,89', '0.89'], ['1,13', '1.13'], ['1,50', '1.50'], ['2,00', '2.00']], 0, '$n_{21} = n_2 / n_1 = 1{,}333 / 1{,}5 \\approx 0{,}89$.', '$n_{21} = n_2 / n_1 = 1.333 / 1.5 \\approx 0.89$.'),
          Q('q9', 'Trong các chất ở Bảng 5.2, ánh sáng truyền chậm nhất trong:', 'Among the substances in Table 5.2, light travels slowest in:', [['Nước', 'Water'], ['Thuỷ tinh crown', 'Crown glass'], ['Kim cương', 'Diamond'], ['Nước đá', 'Ice']], 2, 'Chiết suất lớn nhất (2,419) nên $v = c / n \\approx 1{,}24 \\cdot 10^{8}$ m/s là nhỏ nhất.', 'It has the largest index (2.419), so $v = c / n \\approx 1.24 \\cdot 10^{8}$ m/s is the smallest.'),
          Q('q10', 'Thực hành ảo (Thí nghiệm 2): với thuỷ tinh $n \\approx 1{,}5$, tăng $i$ từ 20° lên 60° thì tỉ số $\\sin i / \\sin r$:', 'Virtual practical (Experiment 2): with glass $n \\approx 1.5$, as $i$ goes from 20° to 60° the ratio $\\sin i / \\sin r$:', [['Tăng mạnh', 'Rises sharply'], ['Giảm mạnh', 'Falls sharply'], ['Gần như không đổi (≈ 1,5)', 'Stays almost constant (≈ 1.5)'], ['Bằng 0', 'Is 0']], 2, 'Đó là định luật khúc xạ: tỉ số không đổi, bằng $n_{21}$.', 'This is the law of refraction: the ratio is constant and equals $n_{21}$.'),
          Q('q11', 'Thực hành ảo (đồng xu trong cốc): rót nước vào cốc rồi nhìn thấy đồng xu vì:', 'Virtual practical (coin in a cup): pouring water in lets us see the coin because:', [['Đồng xu nổi lên', 'The coin floats up'], ['Tia sáng từ đồng xu bị khúc xạ ở mặt nước nên tới được mắt', 'Rays from the coin are refracted at the surface and reach the eye'], ['Nước làm đồng xu sáng lên', 'Water makes the coin glow'], ['Thành cốc trở nên trong suốt', 'The cup wall turns transparent']], 1, 'Tia khúc xạ ra không khí lệch ra xa pháp tuyến, vượt qua miệng cốc rồi vào mắt.', 'The ray leaving the water bends away from the normal, clears the rim and enters the eye.')
        ] },
        { t: 'key', title: { vi: 'Em đã học', en: 'What you have learned' }, blocks: [
          { t: 'list', items: [
            { vi: 'Khúc xạ là sự gãy khúc của tia sáng tại mặt phân cách hai môi trường trong suốt.', en: 'Refraction is the bending of a ray at the interface of two transparent media.' },
            { vi: 'Định luật khúc xạ: tia khúc xạ nằm trong mặt phẳng tới, ở bên kia pháp tuyến; $\\frac{\\sin i}{\\sin r} = n_{21} = \\frac{n_2}{n_1}$.', en: 'Law of refraction: the refracted ray is in the plane of incidence, across the normal; $\\frac{\\sin i}{\\sin r} = n_{21} = \\frac{n_2}{n_1}$.' },
            { vi: 'Chiết suất tuyệt đối $n = \\frac{c}{v}$.', en: 'Absolute refractive index $n = \\frac{c}{v}$.' }
          ] }
        ] },
        { t: 'key', title: { vi: 'Em có thể', en: 'You can' }, blocks: [
          { t: 'list', items: [{ vi: 'Giải thích vì sao rót nước vào cốc thì nhìn thấy đồng xu, và vì sao đáy bể bơi trông nông hơn thực tế.', en: 'Explain why pouring water into a cup reveals the coin and why a pool looks shallower than it is.' }] }
        ] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          { vi: 'Tia tới, pháp tuyến và tia khúc xạ cùng nằm trong mặt phẳng tới; tia tới và tia khúc xạ ở hai bên pháp tuyến.', en: 'The incident ray, normal and refracted ray lie in the plane of incidence; the two rays are on opposite sides of the normal.' },
          { vi: '$\\frac{\\sin i}{\\sin r} = n_{21} = \\frac{n_2}{n_1}$; nếu $n_2 > n_1$ thì $r < i$, nếu $n_2 < n_1$ thì $r > i$.', en: '$\\frac{\\sin i}{\\sin r} = n_{21} = \\frac{n_2}{n_1}$; if $n_2 > n_1$ then $r < i$, if $n_2 < n_1$ then $r > i$.' },
          { vi: 'Chiết suất $n = c / v$; chân không có $n = 1$.', en: 'Refractive index $n = c / v$; a vacuum has $n = 1$.' }
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.',
          keys: ['refraction', 'refract', 'optics-medium', 'transparent', 'interface', 'incident-ray', 'refracted-ray', 'optics-normal', 'angle-incidence', 'angle-refraction', 'plane-incidence', 'half-disc', 'protractor', 'phys-sine', 'constant', 'refractive-index', 'relative-index', 'vacuum', 'speed-light', 'optics-pin', 'coin', 'toward', 'away-from'] }
      ] }
    ]
  };
  /* Dấu {từ|khoá} chỉ có tác dụng trong chuỗi tiếng Anh: bỏ khỏi chuỗi tiếng Việt nếu lỡ viết. */
  (function strip(o) {
    if (Array.isArray(o)) o.forEach(strip);
    else if (o && typeof o === 'object') { for (const k in o) { if (k === 'vi' && typeof o[k] === 'string') o[k] = o[k].replace(/\{([^{}|]+)\|[^{}]+\}/g, '$1'); else strip(o[k]); } }
  })(D.lessons['khtn9-bai5'].pages);
})();
