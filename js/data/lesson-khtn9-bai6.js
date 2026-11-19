/* ==========================================================================
   KHOA HỌC TỰ NHIÊN 9 — CHƯƠNG II. ÁNH SÁNG
     'khtn9-bai6'  Bài 6. Phản xạ toàn phần (tr. 30–33)
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
    tir: g('total internal reflection', '/ˈtəʊ.təl ɪnˈtɜː.nəl rɪˈflek.ʃən/', 'n', 'phản xạ toàn phần',
      'Trong KHTN: Hiện tượng toàn bộ tia tới bị phản xạ ở mặt phân cách, không còn tia khúc xạ.', 'Total internal reflection traps light inside the glass.', 'Phản xạ toàn phần giữ ánh sáng ở bên trong thuỷ tinh.'),
    'optics-reflection': g('reflection', '/rɪˈflek.ʃən/', 'n', 'sự phản xạ',
      'Trong KHTN: Hiện tượng tia sáng bị hắt trở lại môi trường cũ tại mặt phân cách. (Nghĩa khác: hình phản chiếu.)', 'Reflection and refraction often happen together.', 'Phản xạ và khúc xạ thường xảy ra cùng lúc.'),
    'critical-angle': g('critical angle', '/ˈkrɪt.ɪ.kəl ˈæŋ.ɡəl/', 'n', 'góc tới hạn',
      'Trong KHTN: Góc tới nhỏ nhất gây phản xạ toàn phần, kí hiệu i_th; khi đó góc khúc xạ bằng 90°.', 'The critical angle of glass in air is about 41.8°.', 'Góc tới hạn của thuỷ tinh đối với không khí khoảng 41,8°.'),
    denser: g('optically denser', '/ˈɒp.tɪ.kəl.i ˈden.sər/', 'adj', 'chiết quang hơn',
      'Trong KHTN: Có chiết suất lớn hơn; ánh sáng đi chậm hơn trong môi trường này.', 'Glass is optically denser than air.', 'Thuỷ tinh chiết quang hơn không khí.'),
    increase: g('increase', '/ɪnˈkriːs/', 'v', 'tăng lên',
      'Trong KHTN: Làm giá trị của đại lượng lớn hơn (góc tới, độ sáng…).', 'Increase the angle of incidence step by step.', 'Tăng dần góc tới từng bước.'),
    mirage: g('mirage', '/ˈmɪr.ɑːʒ/', 'n', 'ảo ảnh',
      'Trong KHTN: Hình ảnh giả do tia sáng bị cong và phản xạ toàn phần trong các lớp không khí nóng lạnh khác nhau.', 'A mirage looks like water on a hot road.', 'Ảo ảnh trông như vũng nước trên đường nóng.'),
    layer: g('layer', '/ˈleɪ.ər/', 'n', 'lớp',
      'Trong KHTN: Phần mỏng của không khí hay vật liệu nằm chồng lên nhau, mỗi lớp có chiết suất riêng.', 'The air is divided into thin layers.', 'Không khí được chia thành các lớp mỏng.'),
    'optical-fibre': g('optical fibre', '/ˈɒp.tɪ.kəl ˈfaɪ.bər/', 'n', 'sợi quang',
      'Trong KHTN: Sợi thuỷ tinh hoặc chất dẻo trong suốt dẫn ánh sáng nhờ phản xạ toàn phần. Mỹ viết: fiber.', 'An optical fibre is thinner than a hair.', 'Sợi quang mảnh hơn sợi tóc.'),
    'fibre-core': g('core', '/kɔːr/', 'n', 'lõi (sợi quang)',
      'Trong KHTN: Phần trong cùng của sợi quang, có chiết suất n₁ lớn hơn lớp vỏ. (Nghĩa khác: hạt nhân, lõi táo.)', 'Light travels along the core.', 'Ánh sáng truyền dọc theo lõi.'),
    cladding: g('cladding', '/ˈklæd.ɪŋ/', 'n', 'lớp vỏ (sợi quang)',
      'Trong KHTN: Lớp bao quanh lõi, có chiết suất n₂ nhỏ hơn lõi.', 'The cladding has a lower index than the core.', 'Lớp vỏ có chiết suất thấp hơn lõi.'),
    cable: g('cable', '/ˈkeɪ.bəl/', 'n', 'cáp',
      'Trong KHTN: Bó nhiều sợi (dây dẫn hay sợi quang) bọc chung.', 'An optical cable carries many fibres.', 'Một cáp quang chứa nhiều sợi quang.'),
    endoscope: g('endoscope', '/ˈen.də.skəʊp/', 'n', 'ống nội soi',
      'Trong KHTN: Dụng cụ y học dùng sợi quang để quan sát bên trong cơ thể.', 'An endoscope lets doctors see inside the stomach.', 'Ống nội soi giúp bác sĩ nhìn vào bên trong dạ dày.'),
    'optics-data': g('data', '/ˈdeɪ.tə/', 'n', 'dữ liệu',
      'Trong KHTN: Thông tin được truyền đi, chẳng hạn bằng xung ánh sáng trong sợi quang.', 'Optical fibres carry internet data.', 'Sợi quang truyền dữ liệu internet.'),
    grazing: g('grazing', '/ˈɡreɪ.zɪŋ/', 'adj', 'sát mặt, lướt qua',
      'Trong KHTN: Nói tia đi sát mặt phân cách (góc khúc xạ gần 90°).', 'A grazing ray travels along the surface.', 'Tia lướt sát mặt phân cách.')
  });

  D.lessons['khtn9-bai6'] = {
    gradeId: 9, number: '6', book: 'Khoa học tự nhiên 9',
    title: { vi: 'Phản xạ toàn phần', en: 'Total internal reflection' },
    topic: { label: 'Chương', labelEn: 'Chapter', number: 'II', vi: 'Ánh sáng', en: 'Light' },
    spreadLabels: ['Thí nghiệm và góc tới hạn', 'Ứng dụng: ảo ảnh, sợi quang'],
    pages: [
      { number: 30, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: { vi: 'Mục tiêu. Sau bài học này em sẽ:', en: 'Aims. After this lesson you will:' }, items: [
          { vi: 'Làm thí nghiệm để rút ra điều kiện xảy ra phản xạ toàn phần và xác định góc tới hạn.', en: 'Carry out an experiment to find when {total internal reflection|tir} occurs and to measure the {critical angle|critical-angle}.' },
          { vi: 'Vận dụng phản xạ toàn phần để giải thích một số hiện tượng thường gặp.', en: 'Use total internal reflection to explain some everyday phenomena.' }
        ] },
        P('Khi ánh sáng đi từ bản bán trụ thuỷ tinh ra không khí với góc tới $41°$, ta thấy đồng thời tia phản xạ và tia khúc xạ, góc khúc xạ gần bằng $90°$. Nếu góc tới tiếp tục tăng lên $60°$ thì tia sáng sẽ truyền như thế nào?',
          'Light leaves a glass half-disc into air with $i = 41°$: both a reflected and a refracted ray are seen, and the angle of refraction is close to $90°$. If the angle of incidence is raised to $60°$, how will the light travel?', { badge: 'fire' }),
        { t: 'h2', n: 'I', vi: 'Ánh sáng truyền từ môi trường chiết suất lớn vào môi trường chiết suất nhỏ hơn', en: 'Light from a medium of larger index into one of smaller index' },
        { t: 'activity', no: 1, title: { vi: 'Thí nghiệm về phản xạ toàn phần', en: 'Experiment on total internal reflection' },
          vi: 'Chuẩn bị: bảng thí nghiệm gắn tấm nhựa in vòng chia độ; bản bán trụ thuỷ tinh; đèn 12 V – 21 W có khe; nguồn điện. Tiến hành: bố trí như Hình 6.1; chiếu chùm sáng hẹp đi từ bản bán trụ ra không khí; tăng dần góc tới i, quan sát chùm tia phản xạ và chùm tia khúc xạ; ghi đặc điểm nhìn thấy vào bảng theo mẫu Bảng 6.1. Em có thể thử trên mô phỏng bên dưới.',
          en: 'Prepare: a board with a protractor sheet, a glass half-disc, a 12 V – 21 W lamp with a slit, a power supply. Do: set up as in Figure 6.1; send a narrow beam from the block into air; {increase|increase} the angle of incidence i gradually and watch the reflected and refracted beams; record what you see in a table like Table 6.1. You can try it in the simulation below.', items: [] },
        FIG('khtn6a', '6.1', 'Bố trí thí nghiệm về phản xạ toàn phần', 'Setting up the total internal reflection experiment', true)
      ] },
      { number: 31, blocks: [
        { t: 'p', vi: 'Bảng 6.1 (mẫu ghi kết quả; $i_{\\text{th}}$ là góc tới hạn):', en: 'Table 6.1 (a record sheet; $i_{\\text{th}}$ is the critical angle):' },
        { t: 'table', head: true, rows: [
          [C('Góc tới', 'Angle of incidence'), C('Tia khúc xạ', 'Refracted ray'), C('Tia phản xạ', 'Reflected ray')],
          [C('i nhỏ', 'small i'), C('Độ sáng giảm dần khi tăng i', 'Dimmer as i grows'), C('Độ sáng tăng dần khi tăng i', 'Brighter as i grows')],
          [C('i = i_th', 'i = i_th'), C('Bắt đầu không nhìn thấy', 'Just disappearing'), C('Rất sáng', 'Very bright')],
          [C('i > i_th', 'i > i_th'), C('Không còn nhìn thấy', 'No longer visible'), C('Rất sáng', 'Very bright')]
        ] },
        { t: 'ask', style: 'num', lead: { vi: 'Trả lời', en: 'Answer' }, items: [
          B('Góc khúc xạ lớn hơn hay nhỏ hơn góc tới?', 'Is the angle of refraction larger or smaller than the angle of incidence?'),
          B('Khi nào sẽ xảy ra hiện tượng chỉ có tia phản xạ?', 'When will only a reflected ray remain?')
        ] },
        { t: 'h2', n: 'II', vi: 'Hiện tượng phản xạ toàn phần', en: 'Total internal reflection' },
        { t: 'h3', vi: '1. Định nghĩa', en: '1. Definition' },
        { t: 'key', title: { vi: 'Phản xạ toàn phần', en: 'Total internal reflection' }, blocks: [
          P('**Phản xạ toàn phần** là hiện tượng toàn bộ tia tới bị phản xạ trở lại, xảy ra ở mặt phân cách giữa hai môi trường trong suốt.', '**Total internal {reflection|optics-reflection}** is the effect in which the whole incident ray is reflected back at the interface between two transparent media.')
        ] },
        { t: 'h3', vi: '2. Góc tới hạn phản xạ toàn phần', en: '2. The critical angle' },
        P('Khi có tia khúc xạ, định luật khúc xạ viết là $n_1 \\sin i = n_2 \\sin r$, suy ra $\\sin r = \\frac{n_1}{n_2} \\sin i$. Nếu $n_1 > n_2$ (ánh sáng đi từ môi trường chiết quang hơn) thì $\\sin r > \\sin i$ nên $r > i$: tia khúc xạ lệch ra xa pháp tuyến. Khi tăng $i$ thì $r$ cũng tăng; đến khi $r = 90°$ thì $i$ đạt giá trị $i_{\\text{th}}$ gọi là **góc tới hạn**:',
          'While a refracted ray exists, the law reads $n_1 \\sin i = n_2 \\sin r$, so $\\sin r = \\frac{n_1}{n_2} \\sin i$. If $n_1 > n_2$ (light leaves the {optically denser|denser} medium) then $\\sin r > \\sin i$ and $r > i$: the ray bends away from the normal. As $i$ grows, $r$ grows too; when $r = 90°$, $i$ reaches the value $i_{\\text{th}}$, the **critical angle**:'),
        M('n_1 \\sin i_{\\text{th}} = n_2 \\sin 90° \\ \\Rightarrow\\ \\sin i_{\\text{th}} = \\frac{n_2}{n_1}', '(6.1)'),
        P('Khi $i > i_{\\text{th}}$ thì không còn tia khúc xạ; toàn bộ ánh sáng bị phản xạ ở mặt phân cách.', 'When $i > i_{\\text{th}}$ there is no refracted ray; all the light is reflected at the interface.'),
        { t: 'ask', style: 'num', lead: { vi: 'Câu hỏi', en: 'Questions' }, items: [
          B('Tính góc tới hạn khi tia sáng đi từ bản bán trụ thuỷ tinh ($n_1 = 1{,}5$) ra không khí ($n_2 = 1$).', 'Find the critical angle for light going from a glass half-disc ($n_1 = 1.5$) into air ($n_2 = 1$).'),
          B('Dùng dụng cụ ở Hình 6.1 xác định $i_{\\text{th}}$, so sánh với kết quả câu 1 và nhận xét. (Làm trên mô phỏng: kéo S tới khi tia khúc xạ vừa sát mặt phân cách.)', 'Use the set-up of Figure 6.1 to find $i_{\\text{th}}$, compare it with question 1 and comment. (In the simulation: drag S until the refracted ray just grazes the surface.)')
        ] }
      ] },
      { number: 32, blocks: [
        { t: 'h3', vi: '3. Điều kiện để có phản xạ toàn phần', en: '3. Conditions for total internal reflection' },
        { t: 'key', title: { vi: 'Điều kiện phản xạ toàn phần', en: 'Conditions' }, blocks: [
          { t: 'list', items: [
            { vi: 'Ánh sáng truyền từ môi trường có chiết suất $n_1$ tới môi trường có chiết suất $n_2$ với $n_1 > n_2$.', en: 'Light goes from a medium of index $n_1$ into one of index $n_2$ with $n_1 > n_2$.' },
            { vi: 'Góc tới lớn hơn hoặc bằng góc tới hạn: $i \\ge i_{\\text{th}}$.', en: 'The angle of incidence is at least the critical angle: $i \\ge i_{\\text{th}}$.' }
          ] }
        ] },
        { t: 'ex', kind: 'example', no: 1, body: [
          P('Chiếu một tia sáng từ nước ($n_1 = \\frac{4}{3}$) tới mặt phân cách với không khí ($n_2 = 1$). a) Tính góc khúc xạ khi góc tới bằng $30°$. b) Khi góc tới bằng $60°$ có tia khúc xạ không? Vì sao?', 'A ray goes from water ($n_1 = \\frac{4}{3}$) to the interface with air ($n_2 = 1$). a) Find the angle of refraction when $i = 30°$. b) Is there a refracted ray when $i = 60°$? Why?')
        ], solution: [
          P('a) $\\sin r = \\frac{4}{3} \\sin 30° = \\frac{2}{3} \\approx 0{,}667$ nên $r \\approx 41{,}8°$.', 'a) $\\sin r = \\frac{4}{3} \\sin 30° = \\frac{2}{3} \\approx 0.667$, so $r \\approx 41.8°$.'),
          P('b) Góc tới hạn: $\\sin i_{\\text{th}} = \\frac{1}{4/3} = 0{,}75$ nên $i_{\\text{th}} \\approx 48{,}6°$. Vì $60° > 48{,}6°$ nên **không có tia khúc xạ** (nếu tính, $\\sin r = \\frac{4}{3} \\sin 60° \\approx 1{,}155 > 1$ là vô lý); toàn bộ ánh sáng bị phản xạ.', 'b) Critical angle: $\\sin i_{\\text{th}} = \\frac{1}{4/3} = 0.75$, so $i_{\\text{th}} \\approx 48.6°$. Since $60° > 48.6°$ there is **no refracted ray** (the formula would give $\\sin r = \\frac{4}{3} \\sin 60° \\approx 1.155 > 1$, impossible); all the light is reflected.')
        ] },
        { t: 'h2', n: 'III', vi: 'Một số ứng dụng của phản xạ toàn phần', en: 'Some applications of total internal reflection' },
        { t: 'h3', vi: '1. Giải thích hiện tượng ảo ảnh', en: '1. Explaining the mirage' },
        P('Đi trên đường nhựa vào ngày nắng nóng, ta thấy ở phía xa dường như có lớp nước phản chiếu ánh sáng, nhưng đến gần thì mặt đường lại khô ráo (Hình 6.2). Đó là một dạng ảo ảnh thường gặp.', 'Driving on a hot day we see what looks like water ahead, reflecting the light; but as we come closer the road is dry (Figure 6.2). This is a common kind of {mirage|mirage}.'),
        FIG('khtn6b', '6.2', 'Hiện tượng ảo ảnh trên đường nhựa', 'A mirage on a tarmac road', true)
      ] },
      { number: 33, blocks: [
        P('Giải thích: lớp không khí càng gần mặt đường càng nóng nên chiết suất càng nhỏ; càng lên cao chiết suất càng tăng. Chia không khí thành nhiều {lớp|layer} mỏng. Tia sáng đi xiên xuống từ A, qua từng lớp có chiết suất nhỏ dần, góc khúc xạ lớn hơn góc tới nên tia bị bẻ dần ra xa pháp tuyến. Tới lớp thấp, góc tới vượt góc tới hạn, tia bị phản xạ toàn phần và đi lên tới mắt O (Hình 6.3). Khi các lớp rất mỏng, đường đi trở thành một đường cong. Mắt thấy tia như xuất phát từ A′ đối xứng với A qua mặt đường, nên có cảm giác có lớp nước phản xạ.'.replace('{lớp|layer}', 'lớp'),
          'The air nearest the road is hottest and has the smallest index; the index rises with height. Divide the air into thin {layers|layer}. A ray going down from A crosses layers of ever smaller index; the angle of refraction exceeds the angle of incidence, so the ray bends progressively away from the normal. In a low layer the angle of incidence passes the critical angle, the ray is totally reflected and rises to the eye O (Figure 6.3). With very thin layers the path becomes a smooth curve. The eye sees the ray as coming from A′, the mirror point of A below the road, which feels like a pool of water.'),
        FIG('khtn6c', '6.3', 'Đường đi của tia sáng qua các lớp không khí trên đường nhựa (n₁ > n₂ > … > n₅)', 'The path of a ray through the air layers over a hot road (n₁ > n₂ > … > n₅)', true),
        { t: 'ask', style: 'num', items: [B('Giải thích vì sao chỉ quan sát được ảo ảnh ở khoảng cách rất xa, khi lại gần thì không thấy nữa. (Thử trên mô phỏng: kéo người quan sát O lại gần A.)', 'Explain why a mirage is seen only far away and disappears as we come near. (Try the simulation: drag the observer O closer to A.)')] },
        { t: 'h3', vi: '2. Sợi quang và cáp quang', en: '2. Optical fibre and cable' },
        P('**Cáp quang** là bó các **sợi quang**. Mỗi sợi quang là một dây trong suốt dẫn sáng nhờ phản xạ toàn phần. Sợi gồm lõi bằng thuỷ tinh hoặc chất dẻo có chiết suất $n_1$, bao quanh bởi lớp vỏ có chiết suất $n_2 < n_1$. Tia SI vào mặt cắt MN thì bị khúc xạ; tia khúc xạ tới mặt tiếp xúc lõi – vỏ với góc tới lớn hơn góc tới hạn nên bị phản xạ toàn phần, và hiện tượng lặp lại nhiều lần (Hình 6.4). Sợi quang được dùng để truyền {dữ liệu|data} trong công nghệ thông tin và trong y học, ví dụ {ống nội soi|endoscope}.'.replace('{dữ liệu|data}', 'dữ liệu').replace('{ống nội soi|endoscope}', 'ống nội soi'),
          'An optical **{cable|cable}** is a bundle of **{optical fibres|optical-fibre}**. Each fibre is a transparent thread that guides light by total internal reflection. It has a {core|fibre-core} of glass or plastic with index $n_1$ surrounded by {cladding|cladding} of index $n_2 < n_1$. A ray SI entering the end face MN is refracted, meets the core–cladding boundary at more than the critical angle and is totally reflected, again and again (Figure 6.4). Fibres carry {data|optics-data} in information technology and are used in medicine, for example in the {endoscope|endoscope}.'),
        FIG('khtn6d', '6.4', 'Đường truyền của chùm tia sáng trong sợi quang', 'The path of a light beam in an optical fibre', true),
        { t: 'ask', style: 'num', lead: { vi: 'Thực hiện', en: 'Do' }, items: [
          B('Giải thích sự truyền ánh sáng trong sợi quang.', 'Explain how light travels in an optical fibre.'),
          B('Nêu một số ứng dụng của sợi quang trong y học và công nghệ thông tin.', 'Name some uses of optical fibres in medicine and information technology.')
        ] },
        { t: 'head', kind: 'practice', vi: 'Luyện tập', en: 'Practice' },
        { t: 'ex', kind: 'practice', no: 1, body: [P('Tính góc tới hạn khi ánh sáng đi từ kim cương ($n = 2{,}419$) ra không khí.', 'Find the critical angle for light from diamond ($n = 2.419$) into air.')], solution: [P('$\\sin i_{\\text{th}} = \\frac{1}{2{,}419} = 0{,}4134$ nên $i_{\\text{th}} \\approx 24{,}4°$ — rất nhỏ nên kim cương dễ có phản xạ toàn phần, lấp lánh.', '$\\sin i_{\\text{th}} = \\frac{1}{2.419} = 0.4134$, so $i_{\\text{th}} \\approx 24.4°$ — so small that total reflection is easy, hence the sparkle.')] },
        { t: 'ex', kind: 'practice', no: 2, body: [P('Sợi quang có lõi $n_1 = 1{,}5$ và vỏ $n_2 = 1{,}4$. Tính góc tới hạn tại mặt tiếp xúc lõi – vỏ.', 'An optical fibre has core $n_1 = 1.5$ and cladding $n_2 = 1.4$. Find the critical angle at the core–cladding boundary.')], solution: [P('$\\sin i_{\\text{th}} = \\frac{1{,}4}{1{,}5} = 0{,}9333$ nên $i_{\\text{th}} \\approx 69{,}0°$. Tia tới mặt lõi – vỏ với góc lớn hơn $69°$ (tức nghiêng nhỏ hơn $21°$ so với trục sợi) sẽ bị giữ lại trong lõi.', '$\\sin i_{\\text{th}} = \\frac{1.4}{1.5} = 0.9333$, so $i_{\\text{th}} \\approx 69.0°$. A ray meeting the boundary at more than $69°$ (less than $21°$ from the fibre axis) stays in the core.')] },
        { t: 'head', kind: 'apply', vi: 'Vận dụng', en: 'Apply' },
        { t: 'ex', kind: 'apply', no: 1, body: [P('Vì sao một viên kim cương cắt đúng cách lại sáng lấp lánh hơn thuỷ tinh thường?', 'Why does a well-cut diamond sparkle more than ordinary glass?')], solution: [P('Chiết suất cao nên góc tới hạn nhỏ; nhiều tia sáng bị phản xạ toàn phần nhiều lần bên trong rồi mới thoát ra theo các mặt cắt.', 'Its high index gives a small critical angle; many rays are totally reflected several times inside before leaving by the facets.')] },
        { t: 'quiz', title: { vi: 'Tự kiểm tra', en: 'Self-check' }, items: [
          Q('q1', 'Điều kiện cần để có phản xạ toàn phần là ánh sáng đi từ môi trường:', 'A necessary condition for total internal reflection is that light goes from a medium:', [['Chiết suất nhỏ sang chiết suất lớn', 'Of smaller to larger index'], ['Chiết suất lớn sang chiết suất nhỏ', 'Of larger to smaller index'], ['Bất kì sang bất kì', 'Of any to any'], ['Chân không sang không khí', 'Vacuum to air']], 1, 'Cần $n_1 > n_2$ (kèm $i \\ge i_{\\text{th}}$).', 'We need $n_1 > n_2$ (and $i \\ge i_{\\text{th}}$).'),
          Q('q2', 'Góc tới hạn của thuỷ tinh ($n = 1{,}5$) đối với không khí là:', 'The critical angle of glass ($n = 1.5$) in air is:', [['30,0°', '30.0°'], ['41,8°', '41.8°'], ['48,6°', '48.6°'], ['60,0°', '60.0°']], 1, '$\\sin i_{\\text{th}} = 1/1{,}5 = 0{,}667$ nên $i_{\\text{th}} \\approx 41{,}8°$.', '$\\sin i_{\\text{th}} = 1/1.5 = 0.667$, so $i_{\\text{th}} \\approx 41.8°$.'),
          Q('q3', 'Góc tới hạn của nước ($n = \\frac{4}{3}$) đối với không khí khoảng:', 'The critical angle of water ($n = \\frac{4}{3}$) in air is about:', [['41,8°', '41.8°'], ['48,6°', '48.6°'], ['53,1°', '53.1°'], ['90°', '90°']], 1, '$\\sin i_{\\text{th}} = 0{,}75$ nên $i_{\\text{th}} \\approx 48{,}6°$.', '$\\sin i_{\\text{th}} = 0.75$, so $i_{\\text{th}} \\approx 48.6°$.'),
          Q('q4', 'Nước → không khí, $i = 30°$. Góc khúc xạ khoảng:', 'Water → air, $i = 30°$. The angle of refraction is about:', [['22,5°', '22.5°'], ['30°', '30°'], ['41,8°', '41.8°'], ['Không có tia khúc xạ', 'No refracted ray']], 2, '$\\sin r = \\frac{4}{3} \\cdot 0{,}5 = 0{,}667$, $r \\approx 41{,}8°$.', '$\\sin r = \\frac{4}{3} \\cdot 0.5 = 0.667$, $r \\approx 41.8°$.'),
          Q('q5', 'Nước → không khí, $i = 60°$. Điều gì xảy ra?', 'Water → air, $i = 60°$. What happens?', [['Có tia khúc xạ, $r \\approx 41{,}8°$', 'A refracted ray with $r \\approx 41.8°$'], ['Có tia khúc xạ, $r = 60°$', 'A refracted ray with $r = 60°$'], ['Phản xạ toàn phần', 'Total internal reflection'], ['Tia sáng bị hấp thụ', 'The ray is absorbed']], 2, '$60° > i_{\\text{th}} = 48{,}6°$ nên chỉ còn tia phản xạ.', '$60° > i_{\\text{th}} = 48.6°$, so only a reflected ray remains.'),
          Q('q6', 'Ánh sáng đi từ không khí vào thuỷ tinh. Có thể xảy ra phản xạ toàn phần không?', 'Light goes from air into glass. Can total internal reflection occur?', [['Có, khi $i > 41{,}8°$', 'Yes, when $i > 41.8°$'], ['Có, khi $i = 90°$', 'Yes, when $i = 90°$'], ['Không, vì $n_1 < n_2$', 'No, because $n_1 < n_2$'], ['Có, nếu thuỷ tinh đủ dày', 'Yes, if the glass is thick enough']], 2, 'Cần đi từ môi trường chiết quang hơn sang kém hơn; ở đây thì ngược lại.', 'The light must go from the denser to the less dense medium; here it is the other way round.'),
          Q('q7', 'Kim cương ($n = 2{,}419$) đối với không khí có góc tới hạn gần nhất với:', 'Diamond ($n = 2.419$) in air has a critical angle closest to:', [['24,4°', '24.4°'], ['41,8°', '41.8°'], ['48,6°', '48.6°'], ['65,6°', '65.6°']], 0, '$\\sin i_{\\text{th}} = 1/2{,}419 = 0{,}413$, $i_{\\text{th}} \\approx 24{,}4°$.', '$\\sin i_{\\text{th}} = 1/2.419 = 0.413$, $i_{\\text{th}} \\approx 24.4°$.'),
          Q('q8', 'Khi $i = i_{\\text{th}}$ thì góc khúc xạ bằng:', 'When $i = i_{\\text{th}}$ the angle of refraction is:', [['0°', '0°'], ['$i_{\\text{th}}$', '$i_{\\text{th}}$'], ['45°', '45°'], ['90°', '90°']], 3, 'Theo định nghĩa góc tới hạn, $r = 90°$ (tia khúc xạ lướt sát mặt phân cách).', 'By definition of the critical angle, $r = 90°$ (the refracted ray grazes the surface).'),
          Q('q9', 'Trong sợi quang, ánh sáng bị giữ trong lõi nhờ:', 'In an optical fibre light is kept in the core by:', [['Sự hấp thụ của vỏ', 'Absorption in the cladding'], ['Phản xạ toàn phần ở mặt tiếp xúc lõi – vỏ', 'Total reflection at the core–cladding boundary'], ['Từ trường', 'A magnetic field'], ['Lực hấp dẫn', 'Gravity']], 1, 'Lõi có chiết suất lớn hơn vỏ nên tia tới mặt lõi – vỏ với góc lớn bị phản xạ toàn phần.', 'The core has a larger index than the cladding, so rays meeting the boundary at a large angle are totally reflected.'),
          Q('q10', 'Sợi quang có $n_1 = 1{,}5$, $n_2 = 1{,}4$. Góc tới hạn lõi – vỏ khoảng:', 'A fibre has $n_1 = 1.5$, $n_2 = 1.4$. The core–cladding critical angle is about:', [['41,8°', '41.8°'], ['62,5°', '62.5°'], ['69,0°', '69.0°'], ['75,0°', '75.0°']], 2, '$\\sin i_{\\text{th}} = 1{,}4/1{,}5 = 0{,}933$, $i_{\\text{th}} \\approx 69{,}0°$.', '$\\sin i_{\\text{th}} = 1.4/1.5 = 0.933$, $i_{\\text{th}} \\approx 69.0°$.'),
          Q('q11', 'Thực hành ảo (ảo ảnh): vì sao khi lại gần thì ảo ảnh biến mất?', 'Virtual practical (mirage): why does the mirage vanish as you approach?', [['Mặt đường nguội đi', 'The road cools'], ['Tia từ vật tới mắt khi ở gần không kịp bị phản xạ toàn phần, tia chỉ đi xuống mặt đường', 'At short range the rays reaching the eye are not totally reflected but meet the ground'], ['Mắt không nhìn xa được', 'The eye cannot focus far away'], ['Ánh sáng đổi màu', 'The light changes colour']], 1, 'Cần quãng đường ngang đủ dài để tia cong xuống rồi phản xạ toàn phần và lên tới mắt.', 'A long enough horizontal distance is needed for the ray to curve down, reflect totally and rise to the eye.')
        ] },
        { t: 'key', title: { vi: 'Em đã học', en: 'What you have learned' }, blocks: [
          { t: 'list', items: [
            { vi: 'Phản xạ toàn phần xảy ra khi $n_1 > n_2$ và $i \\ge i_{\\text{th}}$, với $\\sin i_{\\text{th}} = \\frac{n_2}{n_1}$.', en: 'Total internal reflection occurs when $n_1 > n_2$ and $i \\ge i_{\\text{th}}$, with $\\sin i_{\\text{th}} = \\frac{n_2}{n_1}$.' },
            { vi: 'Ảo ảnh trên đường nóng và sợi quang đều là ứng dụng của phản xạ toàn phần.', en: 'The mirage over a hot road and the optical fibre both rely on total internal reflection.' }
          ] }
        ] },
        { t: 'key', title: { vi: 'Em có thể', en: 'You can' }, blocks: [
          { t: 'list', items: [{ vi: 'Giải thích vì sao có ảo ảnh trên đường nhựa nắng nóng và vì sao sợi quang truyền được ánh sáng.', en: 'Explain the mirage on a sunny road and why optical fibres carry light.' }] }
        ] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          { vi: 'Góc tới hạn: $\\sin i_{\\text{th}} = \\frac{n_2}{n_1}$ (chỉ có khi $n_1 > n_2$); thuỷ tinh 1,5 → 41,8°, nước → 48,6°.', en: 'Critical angle: $\\sin i_{\\text{th}} = \\frac{n_2}{n_1}$ (only when $n_1 > n_2$); glass 1.5 → 41.8°, water → 48.6°.' },
          { vi: 'Khi $i > i_{\\text{th}}$ không có tia khúc xạ, toàn bộ ánh sáng phản xạ.', en: 'For $i > i_{\\text{th}}$ there is no refracted ray; all the light is reflected.' },
          { vi: 'Ứng dụng: ảo ảnh, sợi quang (truyền dữ liệu, nội soi).', en: 'Uses: the mirage, optical fibres (data, endoscopes).' }
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.',
          keys: ['tir', 'optics-reflection', 'critical-angle', 'denser', 'increase', 'mirage', 'layer', 'optical-fibre', 'fibre-core', 'cladding', 'cable', 'endoscope', 'optics-data', 'grazing'] }
      ] }
    ]
  };
  /* Dấu {từ|khoá} chỉ có tác dụng trong chuỗi tiếng Anh: bỏ khỏi chuỗi tiếng Việt nếu lỡ viết. */
  (function strip(o) {
    if (Array.isArray(o)) o.forEach(strip);
    else if (o && typeof o === 'object') { for (const k in o) { if (k === 'vi' && typeof o[k] === 'string') o[k] = o[k].replace(/\{([^{}|]+)\|[^{}]+\}/g, '$1'); else strip(o[k]); } }
  })(D.lessons['khtn9-bai6'].pages);
})();
