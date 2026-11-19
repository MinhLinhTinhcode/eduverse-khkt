/* ==========================================================================
   KHOA HỌC TỰ NHIÊN 9 — CHƯƠNG II. ÁNH SÁNG
     'khtn9-bai10'  Bài 10. Kính lúp. Bài tập thấu kính (tr. 50–52)
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
  const L1 = (vi, en) => ({ vi, en });

  Object.assign(D.glossary, {
    'optics-magnifier': g('magnifying glass', '/ˈmæɡ.nɪ.faɪ.ɪŋ ɡlɑːs/', 'n', 'kính lúp', 'Trong KHTN: Thấu kính hội tụ có tiêu cự ngắn (cỡ vài cm) dùng để quan sát các vật nhỏ.', 'A watchmaker uses a magnifying glass.', 'Thợ sửa đồng hồ dùng kính lúp.'),
    'optics-angular-mag': g('angular magnification', '/ˈæŋ.ɡjə.lər ˌmæɡ.nɪ.fɪˈkeɪ.ʃən/', 'n', 'số bội giác', 'Trong KHTN: Tỉ số G = β/α giữa góc trông ảnh qua dụng cụ và góc trông vật khi nhìn bằng mắt thường; với kính lúp G = 25/f.', 'This magnifier has an angular magnification of 5.', 'Kính lúp này có số bội giác bằng 5.'),
    'optics-visual-angle': g('visual angle', '/ˈvɪʒ.u.əl ˈæŋ.ɡəl/', 'n', 'góc trông vật', 'Trong KHTN: Góc tạo bởi hai tia sáng từ hai điểm đầu, cuối của vật tới mắt.', 'The visual angle gets smaller as the object moves away.', 'Góc trông vật nhỏ đi khi vật ra xa.'),
    'optics-resolving-power': g('resolving power', '/rɪˈzɒl.vɪŋ ˈpaʊ.ər/', 'n', 'năng suất phân li', 'Trong KHTN: Góc trông tối thiểu ε để mắt còn phân biệt được hai điểm; trung bình ε ≈ 1′ (một phút cung).', 'The resolving power of the eye is about one arcminute.', 'Năng suất phân li của mắt cỡ một phút cung.'),
    'optics-near-point': g('near point', '/nɪə pɔɪnt/', 'n', 'điểm cực cận', 'Trong KHTN: Điểm gần mắt nhất mà mắt còn nhìn rõ (khoảng 25 cm ở mắt không tật).', 'The near point of a normal eye is about 25 cm.', 'Điểm cực cận của mắt bình thường cách mắt khoảng 25 cm.'),
    'optics-far-point': g('far point', '/fɑː pɔɪnt/', 'n', 'điểm cực viễn', 'Trong KHTN: Điểm xa mắt nhất mà mắt còn nhìn rõ (vô cực ở mắt không tật).', 'For a normal eye the far point is at infinity.', 'Với mắt bình thường điểm cực viễn ở vô cực.'),
    'optics-accommodation': g('accommodation', '/əˌkɒm.əˈdeɪ.ʃən/', 'n', 'sự điều tiết (của mắt)', 'Trong KHTN: Sự thay đổi tiêu cự của thể thuỷ tinh để ảnh rõ nét trên võng mạc. (Nghĩa khác: chỗ ở.)', 'Accommodation happens automatically.', 'Sự điều tiết xảy ra hoàn toàn tự nhiên.'),
    'optics-scale-drawing': g('scale drawing', '/skeɪl ˈdrɔː.ɪŋ/', 'n', 'bản vẽ theo tỉ lệ (tỉ lệ xích)', 'Trong KHTN: Cách vẽ trong đó mỗi độ dài thật ứng với một độ dài cố định trên giấy, ví dụ 1 ô = 1 cm.', 'Make a scale drawing on graph paper.', 'Vẽ theo tỉ lệ trên giấy kẻ ô.'),
    'optics-retina': g('retina', '/ˈret.ɪ.nə/', 'n', 'võng mạc (màng lưới)', 'Trong KHTN: Lớp tế bào thị giác ở đáy mắt, nơi ảnh thật của vật hiện lên.', 'The image forms on the retina.', 'Ảnh hiện lên trên võng mạc.')
  });

  D.lessons['khtn9-bai10'] = {
    gradeId: 9, number: '10', book: 'Khoa học tự nhiên 9',
    title: { vi: 'Kính lúp. Bài tập thấu kính', en: 'Magnifying glass. Lens exercises' },
    topic: { label: 'Chương', labelEn: 'Chapter', number: 'II', vi: 'Ánh sáng', en: 'Light' },
    spreadLabels: ['Kính lúp và góc trông', 'Vẽ sơ đồ theo tỉ lệ'],
    pages: [
      { number: 50, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: { vi: 'Mục tiêu. Sau bài này em sẽ:', en: 'Aims. After this lesson you will:' }, items: [
          L1('Mô tả được cấu tạo và sử dụng được kính lúp.', 'Describe the structure of a {magnifying glass|optics-magnifier} and use it.'),
          L1('Vẽ được sơ đồ theo tỉ lệ để giải các bài tập đơn giản về thấu kính hội tụ.', 'Draw a {scale drawing|optics-scale-drawing} to solve simple converging-lens exercises.')
        ] },
        { t: 'ask', style: 'num', lead: { vi: 'Khởi động', en: 'Warm-up' }, items: [B('Tại sao người thợ sửa đồng hồ phải dùng kính lúp khi làm việc?', 'Why must a watch repairer use a magnifying glass at work?')] },
        { t: 'h2', n: 'I', vi: 'Cấu tạo kính lúp', en: 'The structure of a magnifying glass' },
        P('Kính lúp là dụng cụ quang bổ trợ cho mắt để quan sát vật nhỏ. Về cấu tạo, kính lúp là một **thấu kính hội tụ có tiêu cự ngắn** (cỡ vài cm), thường có khung bảo vệ kèm tay cầm (Hình 10.1) hoặc đeo trực tiếp vào mắt. Mỗi kính lúp có một **số bội giác** xác định, ghi trên khung và kí hiệu 2×, 5×, 10×, 20×… theo quy ước:',
          'A magnifying glass is an optical aid for the eye to view small objects. Structurally it is a **converging lens of short focal length** (a few cm), usually in a frame with a handle (Figure 10.1) or worn directly on the eye. Each magnifier has a definite **{angular magnification|optics-angular-mag}**, printed on the frame as 2×, 5×, 10×, 20×… by the convention:'),
        FIG('khtn10a', '10.1', 'Kính lúp và việc dùng kính lúp để đọc sách', 'A magnifying glass and reading with it', true),
        M('G = \\frac{25}{f}', '(10.1)'),
        P('Trong đó $G$ là số bội giác, $f$ là tiêu cự của thấu kính tính bằng cm. Kính lúp có số bội giác càng lớn thì quan sát được vật càng nhỏ.', 'Here $G$ is the angular magnification and $f$ the focal length in cm. The larger the magnification, the smaller the object you can see.'),
        { t: 'ask', style: 'num', lead: { vi: 'Trả lời', en: 'Answer' }, items: [B('Trả lời câu hỏi mở đầu.', 'Answer the warm-up question.'), B('Nêu một số ứng dụng của kính lúp trong cuộc sống.', 'Give some uses of the magnifying glass in daily life.')] },
        { t: 'head', kind: 'practice', vi: 'Em có biết: góc trông vật', en: 'Did you know: the visual angle' },
        P('Ở lớp 8 ta biết: muốn nhìn rõ một vật thì ảnh thật của vật tạo bởi mắt phải hiện trên {võng mạc|optics-retina}. Nhưng việc có nhìn thấy vật nhỏ hay không còn tuỳ kích thước ảnh trên võng mạc, mà kích thước này phụ thuộc vào {góc trông vật|optics-visual-angle} $\\alpha$ — góc tạo bởi hai tia sáng từ hai điểm A và B của vật tới mắt (Hình 10.2).',
          'In grade 8 we learnt that for the eye to see an object, a real image must form on the {retina|optics-retina}. Whether a small object can be seen also depends on the size of that image, which depends on the {visual angle|optics-visual-angle} $\\alpha$ — the angle between the two rays from points A and B of the object to the eye (Figure 10.2).'),
        FIG('khtn10b', '10.2', 'Góc trông vật α', 'The visual angle α', true),
        { t: 'activity', no: 1, title: { vi: 'Thực hành ảo: góc trông và năng suất phân li', en: 'Virtual practical: visual angle and resolving power' },
          vi: 'Kéo vật ra xa hoặc lại gần, đổi kích thước $h$ và năng suất phân li $\\varepsilon$; xem khi nào $\\alpha \\ge \\varepsilon$ thì mắt phân biệt được hai đầu A, B. Thử bật kính lúp.', en: 'Drag the object away or closer, change its size $h$ and the resolving power $\\varepsilon$; see when $\\alpha \\ge \\varepsilon$ lets the eye tell A and B apart. Try switching on the magnifier.' }
      ] },
      { number: 51, blocks: [
        P('Để mắt còn phân biệt được hai điểm A, B thì góc trông vật phải lớn hơn một giá trị tối thiểu gọi là **{năng suất phân li|optics-resolving-power}** $\\varepsilon$ (epsilon) của mắt. Khi đó ảnh B′ và A′ của hai điểm rơi vào hai tế bào thị giác kề nhau. Năng suất phân li thay đổi theo từng người, giá trị trung bình là $\\varepsilon = \\alpha_{min} \\approx 1\'$ (một phút cung).',
          'For the eye to tell points A and B apart, the visual angle must exceed a minimum value, the **{resolving power|optics-resolving-power}** $\\varepsilon$ of the eye. Then the images of the two points fall on two neighbouring visual cells. It varies between people, with an average $\\varepsilon = \\alpha_{min} \\approx 1\'$ (one arcminute).'),
        P('Muốn quan sát vật nhỏ ở góc trông $\\alpha$, ta dùng kính lúp tạo ảnh ảo cùng chiều có góc trông ảnh $\\beta$ lớn hơn (Hình 10.3). Đại lượng đặc trưng cho tác dụng này là số bội giác:', 'To view a small object at visual angle $\\alpha$ we use a magnifier to form an upright virtual image with a larger angle $\\beta$ (Figure 10.3). The quantity describing this is the angular magnification:'),
        M('G = \\frac{\\beta}{\\alpha}', '(10.2)'),
        FIG('khtn10c', '10.3', 'Ảnh ảo qua kính lúp có góc trông ảnh β lớn hơn góc trông vật α', 'The virtual image through the magnifier has a visual angle β larger than α', true),
        { t: 'h2', n: 'II', vi: 'Cách quan sát một vật nhỏ qua kính lúp', en: 'How to observe a small object with a magnifier' },
        P('Khi quan sát, mắt nhìn **ảnh ảo** của vật qua kính (Hình 10.4). Muốn thế phải đặt vật trong khoảng từ quang tâm O của kính đến tiêu điểm chính F, tức $d < f$.', 'The eye looks at the **virtual image** of the object (Figure 10.4). So the object must lie between the optical centre O and the focus F, i.e. $d < f$.'),
        FIG('khtn10d', '10.4', 'Tạo ảnh qua kính lúp khi d < f', 'Image formation by a magnifier when d < f', true),
        P('Ngoài ra ảnh phải nằm trong **khoảng nhìn rõ** của mắt. Với mắt không có tật khúc xạ, khoảng nhìn rõ từ khoảng 25 cm ({điểm cực cận|optics-near-point}) đến vô cực ({điểm cực viễn|optics-far-point}).', 'The image must also lie in the eye’s **range of clear vision**. For an eye without refractive defect it extends from about 25 cm (the {near point|optics-near-point}) to infinity (the {far point|optics-far-point}).'),
        { t: 'list', items: [
          L1('Ảnh ở điểm cực cận: gọi là ngắm chừng ở cực cận.', 'Image at the near point: viewing at the near point.'),
          L1('Vật đặt tại $d = f$: ảnh ở vô cực (Hình 10.5) — ngắm chừng ở vô cực, mắt không phải điều tiết.', 'Object at $d = f$: image at infinity (Figure 10.5) — relaxed viewing, no accommodation needed.')
        ] },
        FIG('khtn10e', '10.5', 'Vật ở tiêu điểm: ảnh ở vô cực', 'Object at the focus: image at infinity', true),
        P('Để quan sát vật nhỏ, đặt kính sát vật rồi từ từ dịch kính ra xa tới khi thấy rõ vật. Số bội giác $G$ ghi trên kính là số bội giác khi **ngắm chừng ở vô cực**: $G = 25/f$.', 'To view a small object, place the lens right against it and slowly move it away until the object is clear. The $G$ printed on the lens is the magnification for **relaxed viewing at infinity**: $G = 25/f$.'),
        { t: 'ask', style: 'num', lead: { vi: 'Trả lời', en: 'Answer' }, items: [
          B('Để quan sát ảnh qua kính lúp, phải đặt vật trong khoảng nào trước kính?', 'To see an image through a magnifier, where in front of the lens must the object be?'),
          B('Vẽ ảnh của vật qua kính lúp khi ngắm chừng ở cực cận.', 'Draw the image of the object through the magnifier when viewing at the near point.')
        ] },
        { t: 'activity', no: 2, title: { vi: 'Thực hành ảo: kính lúp', en: 'Virtual practical: the magnifier' },
          vi: 'Kéo vật AB trong khoảng O–F; bấm “Ngắm chừng ở vô cực” và “Ngắm chừng ở cực cận”, ghi $d$, $d\'$, $G$. Với $f = 5$ cm so sánh $G = 25/f = 5$ và $G = 1 + 25/f = 6$.', en: 'Drag the object AB between O and F; press “Relaxed” and “Near-point viewing” and note $d$, $d\'$, $G$. With $f = 5$ cm compare $G = 25/f = 5$ and $G = 1 + 25/f = 6$.' },
        { t: 'h2', n: 'III', vi: 'Vẽ sơ đồ tạo ảnh qua thấu kính hội tụ', en: 'Drawing the image formation by a converging lens' },
        P('Khi vật hoặc ảnh quá lớn hay quá nhỏ, ta vẽ sơ đồ tạo ảnh theo một **tỉ lệ xích** xác định:', 'When the object or image is very large or very small, draw the diagram to a definite **scale**:'),
        { t: 'olist', items: [L1('**Bước 1.** Chọn tỉ lệ xích thích hợp.', '**Step 1.** Choose a suitable scale.')] }
      ] },
      { number: 52, blocks: [
        { t: 'olist', items: [
          L1('**Bước 2.** Xác định tiêu cự $f$, các khoảng cách $d$, $d\'$ và độ cao $h$, $h\'$ theo cùng tỉ lệ xích đã chọn.', '**Step 2.** Convert the focal length $f$, the distances $d$, $d\'$ and heights $h$, $h\'$ to the chosen scale.'),
          L1('**Bước 3.** Vẽ sơ đồ tạo ảnh với các giá trị đã xác định.', '**Step 3.** Draw the image-formation diagram with those values.')
        ] },
        FIG('khtn10f', '10.6', 'Giấy kẻ ô: 1 ô = 1 cm; vật AB cao 2 cm, d = 7,5 cm, f = 5 cm', 'Graph paper: 1 cell = 1 cm; AB is 2 cm high, d = 7.5 cm, f = 5 cm', true),
        { t: 'head', kind: 'practice', vi: 'Luyện tập', en: 'Practice' },
        { t: 'ex', kind: 'practice', no: 1, body: [P('Vật AB cao $2\\ \\text{cm}$ vuông góc trục chính của thấu kính hội tụ, cách thấu kính $7{,}5\\ \\text{cm}$, A nằm trên trục chính; $f = 5\\ \\text{cm}$. a) Dùng giấy kẻ ô (1 ô = 1 cm) vẽ ảnh như Hình 10.6. b) Xác định vị trí và đặc điểm của ảnh (thật hay ảo, cùng chiều hay ngược chiều).', 'Object AB, $2\\ \\text{cm}$ high, is perpendicular to the axis of a converging lens, $7.5\\ \\text{cm}$ from it, A on the axis; $f = 5\\ \\text{cm}$. a) On graph paper (1 cell = 1 cm) draw the image as in Figure 10.6. b) Give the position and nature of the image (real or virtual, upright or inverted).')], solution: [
          P('Vẽ tia song song trục (ló qua $F\'$) và tia qua $O$; chúng cắt nhau ở $B\'$. Tính: $d\' = \\frac{d f}{d - f} = \\frac{7{,}5 \\cdot 5}{2{,}5} = 15\\ \\text{cm}$; $k = -\\frac{d\'}{d} = -2$ nên $h\' = 2 \\cdot 2 = 4\\ \\text{cm}$. Ảnh là **ảnh thật, ngược chiều**, cách thấu kính $15\\ \\text{cm}$, cao $4\\ \\text{cm}$ (gấp đôi vật).', 'Draw the ray parallel to the axis (it emerges through $F\'$) and the ray through $O$; they meet at $B\'$. Compute: $d\' = \\frac{d f}{d - f} = \\frac{7.5 \\cdot 5}{2.5} = 15\\ \\text{cm}$; $k = -\\frac{d\'}{d} = -2$ so $h\' = 2 \\cdot 2 = 4\\ \\text{cm}$. The image is **real and inverted**, $15\\ \\text{cm}$ from the lens and $4\\ \\text{cm}$ high (twice the object).')] },
        { t: 'ex', kind: 'practice', no: 2, body: [P('Vật AB cao $h = 3\\ \\text{cm}$ vuông góc trước thấu kính hội tụ $f = 5\\ \\text{cm}$, A trên trục chính, $d = 2f$. a) Dựng ảnh $A\'B\'$ theo đúng tỉ lệ. b) Tính chiều cao ảnh $h\'$ và khoảng cách $d\'$ từ ảnh đến quang tâm.', 'Object AB, $h = 3\\ \\text{cm}$, stands in front of a converging lens $f = 5\\ \\text{cm}$, A on the axis, $d = 2f$. a) Construct the image $A\'B\'$ to scale. b) Find the image height $h\'$ and the distance $d\'$ from the image to the optical centre.')], solution: [
          P('$d = 10\\ \\text{cm}$: $d\' = \\frac{10 \\cdot 5}{10 - 5} = 10\\ \\text{cm}$; $k = -1$ nên $h\' = h = 3\\ \\text{cm}$ (ảnh thật, ngược chiều, bằng vật). Cũng suy ra từ hai tam giác đồng dạng: $\\frac{h\'}{h} = \\frac{d\'}{d} = 1$.', '$d = 10\\ \\text{cm}$: $d\' = \\frac{10 \\cdot 5}{10 - 5} = 10\\ \\text{cm}$; $k = -1$ so $h\' = h = 3\\ \\text{cm}$ (real, inverted, same size). It also follows from similar triangles: $\\frac{h\'}{h} = \\frac{d\'}{d} = 1$.')] },
        { t: 'activity', no: 3, title: { vi: 'Thực hành ảo: giấy kẻ ô', en: 'Virtual practical: graph paper' },
          vi: 'Chọn Bài 1 hoặc Bài 2, kéo điểm đỏ $B\'$ tới chỗ em nghĩ là đỉnh ảnh rồi bấm “Kiểm tra”; bấm “Hiện lời giải” để xem hai tia đặc biệt.', en: 'Choose Task 1 or Task 2, drag the red point $B\'$ to where you think the image tip is and press “Check”; press “Show solution” to see the two special rays.' },
        { t: 'head', kind: 'practice', vi: 'Em có biết: sự điều tiết của mắt', en: 'Did you know: accommodation of the eye' },
        P('Khi nhìn một vật, ảnh của vật hiện rõ trên võng mạc. Thực ra lúc đó cơ vòng đỡ thể thuỷ tinh đã co dãn một chút, làm thay đổi tiêu cự của thể thuỷ tinh để ảnh rõ nét. Quá trình đó là {sự điều tiết|optics-accommodation} của mắt; nó xảy ra hoàn toàn tự nhiên.', 'When we look at an object its image appears sharp on the retina. In fact the ring muscle holding the lens flexes a little, changing the focal length of the eye lens so the image stays sharp. This is the {accommodation|optics-accommodation} of the eye; it happens quite naturally.'),
        { t: 'activity', no: 4, title: { vi: 'Thực hành ảo: điều tiết', en: 'Virtual practical: accommodation' },
          vi: 'Kéo vật gần hoặc xa mắt, quan sát tiêu cự thể thuỷ tinh thay đổi; gần hơn 25 cm ảnh sẽ mờ.', en: 'Drag the object near or far and watch the eye lens’s focal length change; closer than 25 cm the image blurs.' },
        { t: 'quiz', title: { vi: 'Tự kiểm tra', en: 'Self-check' }, items: [
          Q('q1', 'Kính lúp là:', 'A magnifying glass is:', [['Thấu kính hội tụ có tiêu cự ngắn', 'A converging lens of short focal length'], ['Thấu kính phân kì', 'A diverging lens'], ['Gương cầu lõm', 'A concave mirror'], ['Lăng kính', 'A prism']], 0, 'Kính lúp dùng thấu kính hội tụ tiêu cự cỡ vài cm.', 'It is a converging lens with a focal length of a few cm.'),
          Q('q2', 'Kính lúp có $f = 5\\ \\text{cm}$ thì số bội giác là:', 'A magnifier with $f = 5\\ \\text{cm}$ has magnification:', [['5×', '5×'], ['25×', '25×'], ['0,2×', '0.2×'], ['10×', '10×']], 0, '$G = 25/f = 25/5 = 5$.', '$G = 25/f = 25/5 = 5$.'),
          Q('q3', 'Kính lúp ghi 10× có tiêu cự:', 'A magnifier marked 10× has focal length:', [['2,5 cm', '2.5 cm'], ['25 cm', '25 cm'], ['10 cm', '10 cm'], ['0,4 cm', '0.4 cm']], 0, '$f = 25/G = 2{,}5\\ \\text{cm}$.', '$f = 25/G = 2.5\\ \\text{cm}$.'),
          Q('q4', 'Để dùng kính lúp, phải đặt vật:', 'To use a magnifier the object must be:', [['Trong khoảng từ quang tâm đến tiêu điểm', 'Between the optical centre and the focus'], ['Xa hơn tiêu điểm', 'Beyond the focus'], ['Tại $2f$', 'At $2f$'], ['Bất kì chỗ nào', 'Anywhere']], 0, 'Phải có $d < f$ thì mới có ảnh ảo cùng chiều, lớn hơn vật.', 'We need $d < f$ for an upright, magnified virtual image.'),
          Q('q5', 'Vật đặt tại $d = f$ thì ảnh:', 'An object at $d = f$ gives an image:', [['Ở vô cực', 'At infinity'], ['Tại $2f$', 'At $2f$'], ['Ở sát kính', 'Next to the lens'], ['Bằng vật', 'Equal to the object']], 0, 'Chùm ló song song nên ảnh ở vô cực (ngắm chừng ở vô cực).', 'The emergent beam is parallel so the image is at infinity (relaxed viewing).'),
          Q('q6', 'Ảnh của vật qua kính lúp ($d < f$) là ảnh:', 'The image through a magnifier ($d < f$) is:', [['Thật, ngược chiều', 'Real, inverted'], ['Ảo, cùng chiều, lớn hơn vật', 'Virtual, upright, magnified'], ['Ảo, ngược chiều', 'Virtual, inverted'], ['Thật, nhỏ hơn vật', 'Real, smaller']], 1, 'Chỉ có ảnh ảo mới nhìn thấy qua kính bằng mắt đặt sau kính.', 'It is a virtual image that the eye behind the lens sees.'),
          Q('q7', 'Khoảng nhìn rõ của mắt không tật là:', 'The range of clear vision of a normal eye is:', [['Từ 25 cm đến vô cực', 'From 25 cm to infinity'], ['Từ 0 đến 25 cm', 'From 0 to 25 cm'], ['Từ 10 cm đến 1 m', 'From 10 cm to 1 m'], ['Chỉ ở vô cực', 'Only at infinity']], 0, 'Điểm cực cận cách mắt khoảng 25 cm, điểm cực viễn ở vô cực.', 'The near point is about 25 cm away; the far point is at infinity.'),
          Q('q8', 'Hai điểm A, B tạo góc trông $0{,}5\'$. Với $\\varepsilon = 1\'$, mắt:', 'Two points A, B subtend $0.5\'$. With $\\varepsilon = 1\'$ the eye:', [['Phân biệt được', 'Can resolve them'], ['Không phân biệt được', 'Cannot resolve them'], ['Nhìn thấy ảnh ảo', 'Sees a virtual image'], ['Phải điều tiết', 'Must accommodate']], 1, '$\\alpha = 0{,}5\' < \\varepsilon$: hai điểm nhoà thành một.', '$\\alpha = 0.5\' < \\varepsilon$: the two points blur into one.'),
          Q('q9', 'Vật cao $2\\ \\text{cm}$ cách thấu kính hội tụ $f = 5\\ \\text{cm}$ một khoảng $7{,}5\\ \\text{cm}$. Ảnh cách thấu kính:', 'An object $2\\ \\text{cm}$ high is $7.5\\ \\text{cm}$ from a converging lens with $f = 5\\ \\text{cm}$. The image is this far from the lens:', [['7,5 cm', '7.5 cm'], ['10 cm', '10 cm'], ['15 cm', '15 cm'], ['2,5 cm', '2.5 cm']], 2, '$d\' = 7{,}5 \\cdot 5/(7{,}5 - 5) = 15\\ \\text{cm}$.', '$d\' = 7.5 \\cdot 5/(7.5 - 5) = 15\\ \\text{cm}$.'),
          Q('q10', 'Ảnh ở câu trên cao và có đặc điểm:', 'The image in the previous question has height and nature:', [['4 cm, thật, ngược chiều', '4 cm, real, inverted'], ['4 cm, ảo, cùng chiều', '4 cm, virtual, upright'], ['1 cm, thật, ngược chiều', '1 cm, real, inverted'], ['2 cm, thật, cùng chiều', '2 cm, real, upright']], 0, '$|k| = d\'/d = 2$ nên $h\' = 4\\ \\text{cm}$; $d > f$ nên ảnh thật, ngược chiều.', '$|k| = d\'/d = 2$ so $h\' = 4\\ \\text{cm}$; since $d > f$ it is real and inverted.'),
          Q('q11', 'Vật cao $3\\ \\text{cm}$ đặt ở $d = 2f$ ($f = 5\\ \\text{cm}$). Ảnh có $h\'$ và $d\'$:', 'An object $3\\ \\text{cm}$ high at $d = 2f$ ($f = 5\\ \\text{cm}$). The image has $h\'$ and $d\'$:', [['3 cm và 10 cm', '3 cm and 10 cm'], ['6 cm và 10 cm', '6 cm and 10 cm'], ['3 cm và 5 cm', '3 cm and 5 cm'], ['1,5 cm và 10 cm', '1.5 cm and 10 cm']], 0, '$d\' = 2f = 10\\ \\text{cm}$ và $h\' = h$.', '$d\' = 2f = 10\\ \\text{cm}$ and $h\' = h$.'),
          Q('q12', 'Thực hành ảo: kính lúp $5\\times$ ($f = 5\\ \\text{cm}$). Để ngắm chừng ở vô cực phải đặt vật cách kính:', 'Virtual practical: a $5\\times$ magnifier ($f = 5\\ \\text{cm}$). For relaxed viewing at infinity the object must be this far from the lens:', [['5 cm', '5 cm'], ['2,5 cm', '2.5 cm'], ['25 cm', '25 cm'], ['10 cm', '10 cm']], 0, 'Ngắm chừng ở vô cực khi $d = f = 5\\ \\text{cm}$ (ảnh ở vô cực, $G = 25/f = 5$).', 'Relaxed viewing needs $d = f = 5\\ \\text{cm}$ (image at infinity, $G = 25/f = 5$).'),
          Q('q13', 'Khi vật tiến lại gần mắt (không quá 25 cm), tiêu cự thể thuỷ tinh:', 'As an object comes closer to the eye (not nearer than 25 cm), the focal length of the eye lens:', [['Giảm (mắt điều tiết)', 'Decreases (the eye accommodates)'], ['Tăng', 'Increases'], ['Không đổi', 'Stays the same'], ['Bằng 25 cm', 'Equals 25 cm']], 0, 'Thể thuỷ tinh phồng lên, tiêu cự giảm để ảnh vẫn rơi đúng võng mạc.', 'The lens bulges and its focal length shortens so the image stays on the retina.')
        ] },
        { t: 'key', title: { vi: 'Em đã học', en: 'What you have learned' }, blocks: [{ t: 'list', items: [
          L1('Kính lúp là thấu kính hội tụ tiêu cự ngắn; số bội giác $G = 25/f$ (ngắm chừng ở vô cực); vật đặt trong khoảng O–F cho ảnh ảo lớn hơn.', 'A magnifier is a short-focus converging lens; $G = 25/f$ (relaxed viewing); an object between O and F gives a larger virtual image.'),
          L1('Vẽ ảnh theo tỉ lệ xích trên giấy kẻ ô; dùng $d\' = \\frac{d f}{d - f}$ để kiểm tra.', 'Draw images to scale on graph paper; check with $d\' = \\frac{d f}{d - f}$.')
        ] }] },
        { t: 'key', title: { vi: 'Em có thể', en: 'You can' }, blocks: [{ t: 'list', items: [
          L1('Giải thích vì sao thợ sửa đồng hồ dùng kính lúp và chọn kính lúp phù hợp.', 'Explain why a watch repairer uses a magnifier and choose a suitable one.'),
          L1('Giải thích sự điều tiết của mắt khi nhìn vật gần và xa.', 'Explain accommodation when looking at near and far objects.')
        ] }] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          L1('$G = \\beta/\\alpha$; với kính lúp $G = 25/f$ khi ngắm chừng ở vô cực ($d = f$).', '$G = \\beta/\\alpha$; for a magnifier $G = 25/f$ in relaxed viewing ($d = f$).'),
          L1('Mắt phân biệt hai điểm khi góc trông $\\alpha \\ge \\varepsilon \\approx 1\'$.', 'The eye resolves two points when the visual angle $\\alpha \\ge \\varepsilon \\approx 1\'$.')
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.', keys: ['optics-magnifier', 'optics-angular-mag', 'optics-visual-angle', 'optics-resolving-power', 'optics-near-point', 'optics-far-point', 'optics-accommodation', 'optics-scale-drawing', 'optics-retina', 'focal-length'] }
      ] }
    ]
  };
  (function strip(o) {
    if (Array.isArray(o)) o.forEach(strip);
    else if (o && typeof o === 'object') { for (const k in o) { if (k === 'vi' && typeof o[k] === 'string') o[k] = o[k].replace(/\{([^{}|]+)\|[^{}]+\}/g, '$1'); else strip(o[k]); } }
  })(D.lessons['khtn9-bai10'].pages);
})();
