/* ==========================================================================
   KHOA HỌC TỰ NHIÊN 9 — CHƯƠNG II. ÁNH SÁNG
     'khtn9-bai7'  Bài 7. Lăng kính (tr. 34–39)
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

  Object.assign(D.glossary, {
    prism: g('prism', '/ˈprɪz.əm/', 'n', 'lăng kính', 'Trong KHTN: Khối trong suốt đồng chất, giới hạn bởi hai mặt phẳng không song song, thường là lăng trụ tam giác.', 'A glass prism splits white light.', 'Lăng kính thuỷ tinh tách ánh sáng trắng.'),
    'refracting-angle': g('refracting angle', '/rɪˈfræk.tɪŋ ˈæŋ.ɡəl/', 'n', 'góc chiết quang (góc ở đỉnh)', 'Trong KHTN: Góc A hợp bởi hai mặt bên của lăng kính. Còn gọi: apex angle.', 'The refracting angle of this prism is 60°.', 'Góc chiết quang của lăng kính này là 60°.'),
    'lateral-face': g('lateral face', '/ˈlæt.ər.əl feɪs/', 'n', 'mặt bên', 'Trong KHTN: Mỗi mặt phẳng trong hai mặt giới hạn lăng kính mà ánh sáng đi vào hoặc đi ra.', 'Light enters the first lateral face.', 'Ánh sáng đi vào mặt bên thứ nhất.'),
    edge: g('edge', '/edʒ/', 'n', 'cạnh (của lăng kính)', 'Trong KHTN: Giao tuyến của hai mặt bên. (Nghĩa khác: mép, rìa.)', 'The edge is opposite the base.', 'Cạnh đối diện với đáy.'),
    base: g('base', '/beɪs/', 'n', 'đáy (của lăng kính)', 'Trong KHTN: Mặt đối diện với cạnh của lăng kính. (Nghĩa khác: cơ sở, bazơ.)', 'Light is deviated toward the base.', 'Ánh sáng lệch về phía đáy.'),
    'principal-section': g('principal section', '/ˈprɪn.sɪ.pəl ˈsek.ʃən/', 'n', 'mặt phẳng tiết diện chính', 'Trong KHTN: Mặt phẳng bất kì vuông góc với các cạnh của lăng kính.', 'Draw rays in the principal section.', 'Vẽ các tia trong mặt phẳng tiết diện chính.'),
    'deviation-angle': g('angle of deviation', '/ˈæŋ.ɡəl əv ˌdiː.viˈeɪ.ʃən/', 'n', 'góc lệch', 'Trong KHTN: Góc D hợp bởi tia tới và tia ló khi ánh sáng đi qua lăng kính.', 'The angle of deviation depends on n and A.', 'Góc lệch phụ thuộc n và A.'),
    dispersion: g('dispersion', '/dɪˈspɜː.ʒən/', 'n', 'sự tán sắc', 'Trong KHTN: Hiện tượng chùm ánh sáng trắng bị tách thành các chùm màu khác nhau khi qua lăng kính.', 'Dispersion makes a rainbow of colours.', 'Sự tán sắc tạo dải màu như cầu vồng.'),
    spectrum: g('spectrum', '/ˈspek.trəm/', 'n', 'quang phổ', 'Trong KHTN: Dải màu thu được khi tán sắc ánh sáng trắng. (Số nhiều: spectra.)', 'The spectrum goes from red to violet.', 'Quang phổ đi từ đỏ đến tím.'),
    'white-light': g('white light', '/waɪt laɪt/', 'n', 'ánh sáng trắng', 'Trong KHTN: Ánh sáng chứa đủ các màu từ đỏ đến tím, như ánh sáng Mặt Trời.', 'Sunlight is white light.', 'Ánh sáng Mặt Trời là ánh sáng trắng.'),
    monochromatic: g('monochromatic light', '/ˌmɒn.əʊ.krəˈmæt.ɪk laɪt/', 'n', 'ánh sáng đơn sắc', 'Trong KHTN: Ánh sáng có một màu nhất định, không bị tán sắc khi qua lăng kính.', 'A laser gives monochromatic light.', 'Laser cho ánh sáng đơn sắc.'),
    filter: g('colour filter', '/ˈkʌl.ər ˈfɪl.tər/', 'n', 'tấm lọc màu', 'Trong KHTN: Tấm trong suốt có màu, chỉ cho một màu đi qua và hấp thụ các màu khác. Mỹ viết: color filter.', 'A red filter lets only red light through.', 'Tấm lọc đỏ chỉ cho ánh sáng đỏ đi qua.'),
    absorb: g('absorb', '/əbˈzɔːb/', 'v', 'hấp thụ', 'Trong KHTN: Giữ lại năng lượng ánh sáng của một màu, không cho phản xạ hay truyền qua.', 'A black object absorbs all colours.', 'Vật đen hấp thụ mọi màu.'),
    reflect: g('reflect', '/rɪˈflekt/', 'v', 'phản xạ', 'Trong KHTN: Hắt ánh sáng trở lại.', 'A red object reflects red light.', 'Vật đỏ phản xạ ánh sáng đỏ.'),
    rainbow: g('rainbow', '/ˈreɪn.bəʊ/', 'n', 'cầu vồng', 'Trong KHTN: Dải sáng nhiều màu hình cung do ánh sáng Mặt Trời khúc xạ, phản xạ toàn phần và tán sắc trong giọt nước mưa.', 'A rainbow appears after the rain.', 'Cầu vồng xuất hiện sau cơn mưa.')
  });

  const L1 = { vi: 'Mục tiêu. Sau bài học này em sẽ:', en: 'Aims. After this lesson you will:' };
  D.lessons['khtn9-bai7'] = {
    gradeId: 9, number: '7', book: 'Khoa học tự nhiên 9',
    title: { vi: 'Lăng kính', en: 'Prisms' },
    topic: { label: 'Chương', labelEn: 'Chapter', number: 'II', vi: 'Ánh sáng', en: 'Light' },
    spreadLabels: ['Cấu tạo và tán sắc', 'Truyền ánh sáng qua lăng kính', 'Màu sắc của vật'],
    pages: [
      { number: 34, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: L1, items: [
          { vi: 'Vẽ được sơ đồ đường truyền của tia sáng qua lăng kính.', en: 'Draw the path of a ray through a {prism|prism}.' },
          { vi: 'Làm thí nghiệm với lăng kính để tạo quang phổ của ánh sáng trắng.', en: 'Do an experiment with a prism to make the {spectrum|spectrum} of white light.' },
          { vi: 'Giải thích định tính sự tán sắc ánh sáng Mặt Trời qua lăng kính.', en: 'Explain qualitatively the {dispersion|dispersion} of sunlight by a prism.' },
          { vi: 'Từ kết quả thí nghiệm nêu được khái niệm ánh sáng màu (đơn sắc).', en: 'From the experiment state what coloured ({monochromatic|monochromatic}) light is.' },
          { vi: 'Nêu được màu sắc của vật phụ thuộc ánh sáng bị vật hấp thụ và phản xạ.', en: 'State that the colour of an object depends on the light it {absorbs|absorb} and {reflects|reflect}.' },
          { vi: 'Giải thích một số hiện tượng đơn giản về màu sắc trong thực tế.', en: 'Explain some simple everyday colour phenomena.' }
        ] },
        P('Ánh sáng từ đèn sợi đốt hoặc từ Mặt Trời, sau khi đi qua lăng kính, tạo thành một dải màu từ đỏ đến tím. Lăng kính có tác dụng gì trong hiện tượng này?', 'Light from a filament lamp or the Sun forms a band of colours from red to violet after passing through a prism. What does the prism do here?', { badge: 'fire' }),
        { t: 'h2', n: 'I', vi: 'Cấu tạo của lăng kính', en: 'Structure of a prism' },
        P('**Lăng kính** là một khối trong suốt, đồng chất, giới hạn bởi hai mặt phẳng không song song, thường có dạng lăng trụ tam giác (Hình 7.1). Hai mặt phẳng giới hạn đó là các **mặt bên**; giao tuyến của chúng là **cạnh**; mặt đối diện với cạnh là **đáy**. Góc $A$ hợp bởi hai mặt bên là **góc chiết quang** (góc ở đỉnh). Mặt phẳng vuông góc với các cạnh gọi là **mặt phẳng tiết diện chính** (Hình 7.3).',
          'A **prism** is a transparent, uniform block bounded by two non-parallel planes, usually a triangular prism (Figure 7.1). The two bounding planes are the **{lateral faces|lateral-face}**; their line of intersection is the **{edge|edge}**; the face opposite the edge is the **{base|base}**. The angle $A$ between the lateral faces is the **{refracting angle|refracting-angle}** (apex angle). A plane perpendicular to the edges is a **{principal section|principal-section}** (Figure 7.3).'),
        FIG('khtn7a', '7.1–7.3', 'Các phần tử của lăng kính và mặt phẳng tiết diện chính', 'The parts of a prism and its principal section', true),
        { t: 'key', title: { vi: 'Đặc trưng quang học', en: 'Optical characteristics' }, blocks: [{ t: 'list', items: [{ vi: 'Về phương diện quang học, lăng kính được đặc trưng bởi góc chiết quang $A$ và chiết suất $n$ của chất làm lăng kính.', en: 'Optically a prism is described by its refracting angle $A$ and the refractive index $n$ of its material.' }] }] },
        { t: 'ask', style: 'num', items: [B('Chỉ ra góc chiết quang, mặt bên, cạnh và đáy của lăng kính trong phòng thí nghiệm.', 'Point out the refracting angle, lateral faces, edge and base of a prism in your lab.')] }
      ] },
      { number: 35, blocks: [
        { t: 'h2', n: 'II', vi: 'Hiện tượng tán sắc ánh sáng', en: 'Dispersion of light' },
        { t: 'activity', no: 1, title: { vi: 'Thí nghiệm 1: tìm hiểu hiện tượng tán sắc ánh sáng', en: 'Experiment 1: dispersion of light' },
          vi: 'Chuẩn bị: lăng kính gắn trên giá (1); đèn ánh sáng trắng có khe hẹp (2); màn hứng chùm sáng (3); nguồn điện và dây nối (4); tấm kính lọc màu đỏ và màu tím (5). Tiến hành: bố trí như Hình 7.4; chiếu chùm sáng trắng hẹp vào mặt bên của lăng kính, dịch màn phía sau lăng kính để hứng vệt sáng. Mô tả đường đi của tia sáng, ghi thứ tự các màu trên màn và cho biết các màu đó nói lên điều gì về thành phần của ánh sáng tới.',
          en: 'Prepare: a prism on a stand (1); a white lamp with a narrow slit (2); a screen (3); power supply and leads (4); a red and a violet colour {filter|filter} (5). Do: set up as in Figure 7.4; shine a narrow white beam on a lateral face of the prism and move the screen behind it to catch the light. Describe the path of the ray, write the order of colours on the screen and say what they tell you about the incoming light.' },
        FIG('khtn7b', '7.4', 'Bố trí thí nghiệm hiện tượng tán sắc ánh sáng', 'Setting up the dispersion experiment', true),
        { t: 'key', title: { vi: 'Tán sắc và quang phổ', en: 'Dispersion and spectrum' }, blocks: [
          P('Chiếu một chùm ánh sáng trắng hẹp qua lăng kính ta thu được **dải màu** từ đỏ đến tím: đó là **quang phổ** của ánh sáng trắng. Hiện tượng này gọi là **sự tán sắc ánh sáng**.', 'A narrow beam of {white light|white-light} through a prism gives a **band of colours** from red to violet: the **spectrum** of white light. This effect is called **dispersion**.')
        ] },
        { t: 'ask', style: 'num', items: [B('Mô tả hiện tượng tán sắc ánh sáng. (Thử trên mô phỏng bên dưới: kéo màn, đổi độ mạnh tán sắc.)', 'Describe dispersion. (Try the simulation below: drag the screen, change the dispersion strength.)')] }
      ] },
      { number: 36, blocks: [
        P('Dải màu gồm bảy màu nằm sát nhau: **đỏ, da cam, vàng, lục, lam, chàm, tím** (Hình 7.5). Lăng kính tách riêng các chùm sáng màu có sẵn trong chùm ánh sáng trắng, cho mỗi chùm đi theo một phương khác nhau.', 'The band has seven neighbouring colours: **red, orange, yellow, green, blue, indigo, violet** (Figure 7.5). The prism separates the coloured beams already present in the white beam and sends each in a different direction.'),
        FIG('khtn7c', '7.5', 'Quang phổ của ánh sáng trắng: bảy màu', 'The spectrum of white light: seven colours', true),
        { t: 'activity', no: 2, title: { vi: 'Thí nghiệm 2: dùng kính lọc màu', en: 'Experiment 2: using colour filters' },
          vi: 'Dùng dụng cụ như Thí nghiệm 1. Lần lượt đặt kính lọc màu đỏ rồi màu tím chắn vào khe hẹp của nguồn sáng, dịch màn để hứng vệt sáng. Ánh sáng qua kính lọc có bị tách thành nhiều màu không? So sánh góc lệch của tia đỏ và tia tím.',
          en: 'Use the equipment of Experiment 1. Place the red and then the violet filter at the slit and move the screen to catch the spot. Does light through a filter split into colours? Compare the deviation of the red and violet rays.' },
        { t: 'key', title: { vi: 'Ánh sáng đơn sắc', en: 'Monochromatic light' }, blocks: [P('**Ánh sáng đơn sắc** là ánh sáng có một màu nhất định và không bị tán sắc khi đi qua lăng kính.', '**{Monochromatic light|monochromatic}** has one definite colour and is not dispersed by a prism.')] },
        { t: 'ask', style: 'num', items: [B('Ở phần mở đầu, hãy giải thích sự tán sắc ánh sáng Mặt Trời qua lăng kính.', 'Using the opening question, explain the dispersion of sunlight by a prism.')] },
        { t: 'h2', n: 'III', vi: 'Sự truyền ánh sáng đơn sắc qua lăng kính', en: 'A monochromatic ray through a prism' },
        P('Xét lăng kính chiết suất $n$ đặt trong không khí, chỉ xét tia đơn sắc nằm trong mặt phẳng tiết diện chính. Tia $SI$ tới mặt bên $AB$ với góc tới $i_1$, bị khúc xạ với góc khúc xạ $r_1$; tia $IJ$ tới mặt bên $AC$ với góc tới $r_2$ rồi ló ra theo tia $JR$ với góc khúc xạ $i_2$. Góc $D$ hợp bởi tia tới $SI$ và tia ló $JR$ là **góc lệch**.',
          'Take a prism of index $n$ in air and only a monochromatic ray in the principal section. The ray $SI$ meets face $AB$ at incidence angle $i_1$ and is refracted at angle $r_1$; the ray $IJ$ meets face $AC$ at angle $r_2$ and leaves as $JR$ at angle $i_2$. The angle $D$ between $SI$ and $JR$ is the **{deviation|deviation-angle}**.'),
        FIG('khtn7d', '7.6', 'Đường truyền của tia sáng đơn sắc qua lăng kính', 'The path of a monochromatic ray through a prism', true)
      ] },
      { number: 37, blocks: [
        { t: 'math', tex: 'r_1 = \\arcsin\\frac{\\sin i_1}{n},\\quad r_2 = A - r_1,\\quad i_2 = \\arcsin(n \\sin r_2),\\quad D = i_1 + i_2 - A', label: '(7.1) (mở rộng, ngoài sách)' },
        P('Khi tia sáng truyền từ không khí vào lăng kính, tia khúc xạ lệch lại gần pháp tuyến (vì $n > 1$). Khi ra khỏi lăng kính, tia khúc xạ lệch xa pháp tuyến. Kết quả: tia ló lệch về phía **đáy** của lăng kính. Nếu $n\\sin r_2 > 1$ thì không có tia ló mà xảy ra phản xạ toàn phần tại mặt bên thứ hai.',
          'Entering the prism from air the ray bends toward the normal (since $n > 1$). Leaving it bends away from the normal. Result: the emergent ray is deviated toward the **base** of the prism. If $n\\sin r_2 > 1$ there is no emergent ray; total internal reflection happens at the second face.'),
        { t: 'ask', style: 'num', lead: { vi: 'Quan sát Hình 7.6', en: 'Look at Figure 7.6' }, items: [
          B('Vì sao khi ánh sáng đi từ không khí vào lăng kính, tia khúc xạ $IJ$ lệch gần pháp tuyến hơn tia tới $SI$?', 'Why does the refracted ray $IJ$ bend nearer the normal than $SI$ when light goes from air into the prism?'),
          B('Vì sao khi ra khỏi lăng kính, tia $JR$ lệch xa pháp tuyến hơn tia $IJ$?', 'Why does $JR$ bend farther from the normal than $IJ$ on leaving?'),
          B('Biết chiết suất của lăng kính lớn nhất với tia tím, nhỏ nhất với tia đỏ, hãy giải thích sự tán sắc ánh sáng.', 'Given that the index is largest for violet and smallest for red, explain dispersion.')
        ] },
        { t: 'tip', items: [{ vi: 'Gợi ý câu 3: vì $n_{\\text{tím}} > n_{\\text{đỏ}}$ nên tại mỗi mặt bên tia tím bị khúc xạ mạnh hơn, góc lệch $D_{\\text{tím}} > D_{\\text{đỏ}}$: các màu đi theo các phương khác nhau.', en: 'Hint for 3: since $n_{\\text{violet}} > n_{\\text{red}}$, violet is refracted more at each face, so $D_{\\text{violet}} > D_{\\text{red}}$: colours leave in different directions.' }] },
        { t: 'ask', style: 'num', lead: { vi: 'Bài tập', en: 'Exercises' }, items: [
          B('Hình nào trong Hình 7.7 (A, B, C, D) chỉ đúng đường đi của tia sáng qua lăng kính đặt trong không khí? (Hãy kiểm tra bằng mô phỏng: tia ló phải lệch về phía đáy.)', 'Which of Figure 7.7 (A–D) shows the path of a ray through a prism in air correctly? (Check with the simulation: the emergent ray must bend toward the base.)'),
          B('Lăng kính thuỷ tinh $n = 1{,}41$, tiết diện chính là tam giác đều $ABC$. Chiếu tia sáng tới mặt bên $AB$ với $i_1 = 45°$. Vẽ đường truyền của tia sáng.', 'A glass prism with $n = 1.41$ and an equilateral principal section $ABC$. A ray meets face $AB$ at $i_1 = 45°$. Draw the path of the ray.')
        ] },
        { t: 'ex', kind: 'example', no: 1, body: [P('Tính $r_1$, $r_2$, $i_2$ và $D$ cho bài tập 2 ở trên.', 'Compute $r_1$, $r_2$, $i_2$ and $D$ for exercise 2 above.')], solution: [P('$\\sin r_1 = \\frac{\\sin 45°}{1{,}41} = 0{,}5015$ nên $r_1 \\approx 30{,}1°$; $r_2 = 60° - 30{,}1° = 29{,}9°$; $\\sin i_2 = 1{,}41 \\sin 29{,}9° = 0{,}7032$ nên $i_2 \\approx 44{,}7°$; $D = 45° + 44{,}7° - 60° \\approx 29{,}7° \\approx 30°$. Đường đi gần đối xứng quanh pháp tuyến ($r_1 \\approx r_2 \\approx 30°$, $i_2 \\approx i_1$).', '$\\sin r_1 = \\frac{\\sin 45°}{1.41} = 0.5015$ so $r_1 \\approx 30.1°$; $r_2 = 60° - 30.1° = 29.9°$; $\\sin i_2 = 1.41 \\sin 29.9° = 0.7032$ so $i_2 \\approx 44.7°$; $D = 45° + 44.7° - 60° \\approx 29.7° \\approx 30°$. The path is almost symmetric ($r_1 \\approx r_2 \\approx 30°$, $i_2 \\approx i_1$).')] }
      ] },
      { number: 38, blocks: [
        { t: 'h2', n: 'IV', vi: 'Màu sắc của vật', en: 'The colour of objects' },
        { t: 'ask', style: 'num', items: [
          B('Khi nào mắt ta nhìn thấy một vật?', 'When do we see an object?'),
          B('Khi thấy các vật màu xanh, đỏ, trắng thì có ánh sáng màu nào truyền từ vật tới mắt?', 'When we see blue, red and white objects, which light travels from the object to the eye?'),
          B('Ban đêm, khi không có nguồn sáng, ta thấy các vật có màu gì?', 'At night with no light source, what colour do we see?')
        ] },
        { t: 'key', title: { vi: 'Màu sắc của vật', en: 'Colour of objects' }, blocks: [{ t: 'list', items: [
          { vi: 'Màu của một vật phụ thuộc vào màu ánh sáng bị vật **hấp thụ** và **phản xạ**.', en: 'The colour of an object depends on the light it **absorbs** and **reflects**.' },
          { vi: 'Dưới ánh sáng trắng, vật có màu nào là do nó phản xạ ánh sáng màu đó vào mắt và hấp thụ các màu còn lại.', en: 'Under white light an object has the colour it reflects to the eye; it absorbs the others.' },
          { vi: 'Vật màu đen hấp thụ mọi ánh sáng màu, không có ánh sáng phản xạ; ta nhận ra vật đen vì nó nằm cạnh các vật có màu khác.', en: 'A black object absorbs all colours and reflects none; we notice it because it lies next to coloured objects.' }
        ] }] },
        FIG('khtn7e', '7.8', 'Minh hoạ sự nhìn thấy màu sắc của các bề mặt', 'How we see the colour of surfaces', true),
        { t: 'ask', style: 'num', items: [
          B('Biểu diễn các tia sáng tới mắt đối với vật mà ta thấy có màu trắng (Hình 7.9). (Gợi ý: vật trắng phản xạ cả bảy màu.)', 'Draw the rays reaching the eye from an object that looks white (Figure 7.9). (Hint: a white object reflects all seven colours.)'),
          B('Giải thích vì sao ta thấy cánh hoa hướng dương màu vàng, lá màu xanh và nhuỵ màu nâu (Hình 7.10). Thử trên mô phỏng bằng các ánh sáng màu khác nhau.', 'Explain why a sunflower’s petals look yellow, the leaves green and the centre brown (Figure 7.10). Try different coloured lights in the simulation.')
        ] }
      ] },
      { number: 39, blocks: [
        P('Người ta có thể tạo ánh sáng đơn sắc bằng cách chiếu ánh sáng trắng qua một **tấm lọc màu** (kính màu hay giấy bóng kính màu). Tấm lọc màu nào thì hấp thụ ít ánh sáng màu đó nhưng hấp thụ mạnh các màu khác (Hình 7.11).', 'Monochromatic light can be made by passing white light through a **colour {filter|filter}** (coloured glass or cellophane). A filter of a given colour absorbs little light of that colour but absorbs the other colours strongly (Figure 7.11).'),
        FIG('khtn7f', '7.11', 'Ánh sáng trắng truyền qua tấm lọc màu lục', 'White light through a green filter', true),
        { t: 'key', title: { vi: 'Em đã học', en: 'What you have learned' }, blocks: [{ t: 'list', items: [
          { vi: 'Lăng kính là khối trong suốt, đồng chất, thường là lăng trụ tam giác; tạo được quang phổ của ánh sáng trắng.', en: 'A prism is a transparent uniform block, usually triangular; it makes the spectrum of white light.' },
          { vi: 'Dải màu gồm đỏ, da cam, vàng, lục, lam, chàm, tím; ánh sáng đơn sắc không bị tán sắc.', en: 'The spectrum has red, orange, yellow, green, blue, indigo, violet; monochromatic light is not dispersed.' },
          { vi: 'Màu của vật do ánh sáng phản xạ và hấp thụ.', en: 'An object’s colour comes from the light it reflects and absorbs.' }
        ] }] },
        { t: 'key', title: { vi: 'Em có thể', en: 'You can' }, blocks: [{ t: 'list', items: [
          { vi: 'Vẽ đường truyền của tia sáng qua lăng kính, giải thích sự tán sắc ánh sáng Mặt Trời và màu sắc của vật.', en: 'Draw the path of a ray through a prism and explain the dispersion of sunlight and the colour of objects.' },
          { vi: 'Làm đĩa trộn màu (Hình 7.12): cắt bìa tròn, chia bảy cung tô bảy màu, xuyên sợi dây qua hai lỗ rồi quay nhanh: các màu hoà thành màu trắng đục.', en: 'Make a colour-mixing disc (Figure 7.12): cut a card circle, divide it into seven sectors coloured with the seven colours, thread a string through two holes and spin it fast: the colours blend into a whitish colour.' }
        ] }] },
        { t: 'head', kind: 'apply', vi: 'Em có biết', en: 'Did you know' },
        { t: 'h3', vi: '1. Chiết suất của môi trường', en: '1. Refractive index of a medium' },
        P('Chiết suất của một môi trường trong suốt đối với các ánh sáng màu khác nhau thì khác nhau: nhỏ nhất với ánh sáng đỏ, tăng dần qua da cam, vàng… và lớn nhất với ánh sáng tím.', 'The refractive index of a transparent medium differs for different colours: smallest for red, increasing through orange, yellow… and largest for violet.'),
        { t: 'h3', vi: '2. Cầu vồng', en: '2. The rainbow' },
        P('Sau cơn mưa có nắng, các giọt nước nhỏ li ti còn lơ lửng trong khí quyển. Tia sáng Mặt Trời trong giọt nước bị khúc xạ, phản xạ toàn phần và tán sắc; ánh sáng mỗi màu tạo với phương tia tới của Mặt Trời một góc gần như không đổi nên mắt ta nhận được ánh sáng theo hình cung. Khi nhìn cầu vồng, Mặt Trời ở sau lưng ta, hướng nhìn hợp với phương tia sáng Mặt Trời một góc từ $40°$ đến $42°$ (Hình 7.13).',
          'After a sunny shower tiny drops still hang in the air. Inside a drop the Sun’s rays are refracted, totally reflected and dispersed; light of each colour leaves at a nearly constant angle to the incoming sunlight, so the eye receives it along an arc. Looking at a {rainbow|rainbow} the Sun is behind you and your line of sight makes an angle of $40°$ to $42°$ with the Sun’s rays (Figure 7.13).'),
        FIG('khtn7h', '7.13', 'Đường truyền của tia sáng qua giọt nước khi có cầu vồng', 'The path of a ray through a raindrop when a rainbow forms', true),
        { t: 'quiz', title: { vi: 'Tự kiểm tra', en: 'Self-check' }, items: [
          Q('q1', 'Các màu của quang phổ ánh sáng trắng theo thứ tự từ đỏ là:', 'The colours of the white-light spectrum from red are:', [['Đỏ, da cam, vàng, lục, lam, chàm, tím', 'Red, orange, yellow, green, blue, indigo, violet'], ['Đỏ, vàng, da cam, lục, lam, tím, chàm', 'Red, yellow, orange, green, blue, violet, indigo'], ['Tím, chàm, lam, lục, vàng, da cam, đỏ', 'Violet, indigo, blue, green, yellow, orange, red (reading from red)'], ['Đỏ, lục, lam, vàng, da cam, chàm, tím', 'Red, green, blue, yellow, orange, indigo, violet']], 0, 'Thứ tự đúng: đỏ, da cam, vàng, lục, lam, chàm, tím.', 'The right order: red, orange, yellow, green, blue, indigo, violet.'),
          Q('q2', 'Tia ló ra khỏi lăng kính đặt trong không khí lệch về phía:', 'The ray leaving a prism in air is deviated toward the:', [['Đáy', 'Base'], ['Cạnh', 'Edge'], ['Không lệch', 'Nowhere (no deviation)'], ['Phía tia tới', 'Side of the incident ray']], 0, 'Tia ló luôn lệch về phía đáy của lăng kính.', 'The emergent ray is always deviated toward the base.'),
          Q('q3', 'Chiết suất của thuỷ tinh lăng kính lớn nhất đối với ánh sáng màu:', 'The index of prism glass is largest for light of colour:', [['Tím', 'Violet'], ['Đỏ', 'Red'], ['Lục', 'Green'], ['Vàng', 'Yellow']], 0, 'Chiết suất tăng từ đỏ đến tím.', 'The index increases from red to violet.'),
          Q('q4', 'Trong dải quang phổ, tia bị lệch nhiều nhất là:', 'In the spectrum the most deviated ray is:', [['Tia tím', 'Violet'], ['Tia đỏ', 'Red'], ['Tia lục', 'Green'], ['Tất cả lệch như nhau', 'All the same']], 0, 'Chiết suất lớn nhất nên góc lệch lớn nhất.', 'Largest index, so largest deviation.'),
          Q('q5', 'Ánh sáng đơn sắc qua lăng kính:', 'Monochromatic light through a prism:', [['Không bị tán sắc', 'Is not dispersed'], ['Tách thành bảy màu', 'Splits into seven colours'], ['Chuyển thành ánh sáng trắng', 'Becomes white'], ['Bị hấp thụ hoàn toàn', 'Is fully absorbed']], 0, 'Ánh sáng đơn sắc không bị tán sắc.', 'Monochromatic light is not dispersed.'),
          Q('q6', 'Lăng kính $n = 1{,}41$, $A = 60°$, $i_1 = 45°$. Góc khúc xạ $r_1$ khoảng:', 'A prism $n = 1.41$, $A = 60°$, $i_1 = 45°$. The refraction angle $r_1$ is about:', [['30,1°', '30.1°'], ['45°', '45°'], ['22°', '22°'], ['60°', '60°']], 0, '$\\sin r_1 = \\sin 45°/1{,}41 = 0{,}5015$ nên $r_1 \\approx 30{,}1°$.', '$\\sin r_1 = \\sin 45°/1.41 = 0.5015$ so $r_1 \\approx 30.1°$.'),
          Q('q7', 'Với bài toán trên, góc lệch $D$ gần bằng:', 'For the same prism the deviation $D$ is about:', [['30°', '30°'], ['15°', '15°'], ['45°', '45°'], ['60°', '60°']], 0, '$D = 45° + 44{,}7° - 60° \\approx 29{,}7°$.', '$D = 45° + 44.7° - 60° \\approx 29.7°$.'),
          Q('q8', 'Lăng kính thuỷ tinh $n = 1{,}5$, $A = 60°$, $i_1 = 10°$. Điều gì xảy ra ở mặt bên thứ hai?', 'A glass prism $n = 1.5$, $A = 60°$, $i_1 = 10°$. What happens at the second face?', [['Phản xạ toàn phần, không có tia ló', 'Total internal reflection, no emergent ray'], ['Tia ló lệch về đỉnh', 'The ray leaves toward the apex'], ['Tia ló song song tia tới', 'The ray leaves parallel to the incident ray'], ['Tia ló vuông góc mặt bên', 'The ray leaves perpendicular to the face']], 0, '$r_1 \\approx 6{,}6°$, $r_2 \\approx 53{,}4°$ lớn hơn góc tới hạn $41{,}8°$: $n \\sin r_2 \\approx 1{,}2 > 1$.', '$r_1 \\approx 6.6°$, $r_2 \\approx 53.4°$ exceeds the critical angle $41.8°$: $n \\sin r_2 \\approx 1.2 > 1$.'),
          Q('q9', 'Dưới ánh sáng trắng, quả cà chua đỏ phản xạ chủ yếu ánh sáng màu:', 'Under white light a red tomato mainly reflects:', [['Đỏ', 'Red'], ['Lục', 'Green'], ['Mọi màu', 'All colours'], ['Không màu nào', 'No colour']], 0, 'Vật có màu nào là do phản xạ màu đó.', 'An object has the colour it reflects.'),
          Q('q10', 'Thực hành ảo: chiếu ánh sáng lục lên vật màu đỏ, ta thấy vật có màu:', 'Virtual practical: green light on a red object. The object looks:', [['Đen (gần như tối)', 'Black (almost dark)'], ['Đỏ', 'Red'], ['Lục', 'Green'], ['Trắng', 'White']], 0, 'Vật đỏ hấp thụ ánh sáng lục và không phản xạ ánh sáng nào tới mắt.', 'A red object absorbs green and sends no light to the eye.'),
          Q('q11', 'Vật màu đen:', 'A black object:', [['Hấp thụ mọi ánh sáng màu', 'Absorbs all colours'], ['Phản xạ mọi màu', 'Reflects all colours'], ['Chỉ phản xạ màu đỏ', 'Only reflects red'], ['Phát ra ánh sáng đen', 'Emits black light']], 0, 'Vật đen không phản xạ ánh sáng nào.', 'A black object reflects no light.'),
          Q('q12', 'Cầu vồng thấy được khi hướng nhìn hợp với tia sáng Mặt Trời một góc khoảng:', 'A rainbow is seen when the line of sight makes an angle with the Sun’s rays of about:', [['40° – 42°', '40°–42°'], ['10° – 20°', '10°–20°'], ['60° – 70°', '60°–70°'], ['90°', '90°']], 0, 'Màu tím ở khoảng 40°, màu đỏ ở khoảng 42°.', 'Violet is near 40°, red near 42°.')
        ] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          { vi: 'Lăng kính tán sắc ánh sáng trắng thành bảy màu; tia tím lệch nhiều nhất, tia đỏ lệch ít nhất.', en: 'A prism disperses white light into seven colours; violet deviates most, red least.' },
          { vi: 'Công thức mở rộng: $r_1 = \\arcsin(\\sin i_1/n)$, $r_2 = A - r_1$, $D = i_1 + i_2 - A$.', en: 'Extension: $r_1 = \\arcsin(\\sin i_1/n)$, $r_2 = A - r_1$, $D = i_1 + i_2 - A$.' },
          { vi: 'Màu của vật do ánh sáng phản xạ và hấp thụ; cầu vồng là tán sắc trong giọt nước mưa.', en: 'An object’s colour comes from reflection and absorption; a rainbow is dispersion in raindrops.' }
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.', keys: ['prism', 'refracting-angle', 'lateral-face', 'edge', 'base', 'principal-section', 'deviation-angle', 'dispersion', 'spectrum', 'white-light', 'monochromatic', 'filter', 'absorb', 'reflect', 'rainbow'] }
      ] }
    ]
  };
  (function strip(o) {
    if (Array.isArray(o)) o.forEach(strip);
    else if (o && typeof o === 'object') { for (const k in o) { if (k === 'vi' && typeof o[k] === 'string') o[k] = o[k].replace(/\{([^{}|]+)\|[^{}]+\}/g, '$1'); else strip(o[k]); } }
  })(D.lessons['khtn9-bai7'].pages);
})();
