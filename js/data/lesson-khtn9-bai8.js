/* ==========================================================================
   KHOA HỌC TỰ NHIÊN 9 — CHƯƠNG II. ÁNH SÁNG
     'khtn9-bai8'  Bài 8. Thấu kính (tr. 40–46)
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
    'thin-edged': g('thin-edged', '/θɪn edʒd/', 'adj', 'rìa mỏng', 'Trong KHTN: Nói thấu kính có phần rìa mỏng hơn phần giữa.', 'A thin-edged lens is thicker in the middle.', 'Thấu kính rìa mỏng dày hơn ở giữa.'),
    'thick-edged': g('thick-edged', '/θɪk edʒd/', 'adj', 'rìa dày', 'Trong KHTN: Nói thấu kính có phần rìa dày hơn phần giữa.', 'A thick-edged lens is thinner in the middle.', 'Thấu kính rìa dày mỏng hơn ở giữa.'),
    'optical-centre': g('optical centre', '/ˈɒp.tɪ.kəl ˈsen.tər/', 'n', 'quang tâm', 'Trong KHTN: Điểm O của thấu kính mà mọi tia tới O đều truyền thẳng.', 'A ray through the optical centre is not bent.', 'Tia đi qua quang tâm không bị lệch.'),
    'principal-axis': g('principal axis', '/ˈprɪn.sɪ.pəl ˈæk.sɪs/', 'n', 'trục chính', 'Trong KHTN: Đường thẳng đi qua quang tâm và vuông góc với tiết diện thẳng của thấu kính.', 'Draw the principal axis first.', 'Hãy vẽ trục chính trước.'),
    'focal-point': g('principal focus', '/ˈprɪn.sɪ.pəl ˈfəʊ.kəs/', 'n', 'tiêu điểm chính', 'Trong KHTN: Điểm F trên trục chính mà chùm tia song song trục chính hội tụ tại đó (hoặc đường kéo dài của chùm ló đi qua).', 'Parallel rays meet at the principal focus.', 'Các tia song song hội tụ tại tiêu điểm chính.'),
    'focal-length': g('focal length', '/ˈfəʊ.kəl leŋθ/', 'n', 'tiêu cự', 'Trong KHTN: Khoảng cách OF từ quang tâm đến tiêu điểm chính, kí hiệu f.', 'A lens with a short focal length bends light strongly.', 'Thấu kính có tiêu cự ngắn làm lệch ánh sáng mạnh.'),
    'ray-diagram': g('ray diagram', '/reɪ ˈdaɪ.ə.ɡræm/', 'n', 'sơ đồ tia sáng', 'Trong KHTN: Hình vẽ các tia sáng đặc biệt để tìm ảnh của vật.', 'Use a ray diagram to find the image.', 'Dùng sơ đồ tia sáng để tìm ảnh.'),
    'real-image': g('real image', '/rɪəl ˈɪm.ɪdʒ/', 'n', 'ảnh thật', 'Trong KHTN: Ảnh hứng được trên màn, do các tia ló thật sự giao nhau tạo ra.', 'A real image can be caught on a screen.', 'Ảnh thật có thể hứng được trên màn.'),
    'virtual-image': g('virtual image', '/ˈvɜː.tʃu.əl ˈɪm.ɪdʒ/', 'n', 'ảnh ảo', 'Trong KHTN: Ảnh không hứng được trên màn; chỉ thấy khi nhìn qua thấu kính, do đường kéo dài của các tia ló giao nhau.', 'You cannot catch a virtual image on a screen.', 'Không hứng được ảnh ảo trên màn.'),
    inverted: g('inverted', '/ɪnˈvɜː.tɪd/', 'adj', 'ngược chiều', 'Trong KHTN: Nói ảnh quay đầu xuống so với vật.', 'A real image is inverted.', 'Ảnh thật ngược chiều với vật.'),
    upright: g('upright', '/ˈʌp.raɪt/', 'adj', 'cùng chiều', 'Trong KHTN: Nói ảnh có chiều giống vật. (Nghĩa khác: thẳng đứng.)', 'A virtual image is upright.', 'Ảnh ảo cùng chiều với vật.'),
    magnified: g('magnified', '/ˈmæɡ.nɪ.faɪd/', 'adj', 'lớn hơn vật (phóng đại)', 'Trong KHTN: Nói ảnh có kích thước lớn hơn vật.', 'The image is magnified.', 'Ảnh lớn hơn vật.'),
    diminished: g('diminished', '/dɪˈmɪn.ɪʃt/', 'adj', 'nhỏ hơn vật (thu nhỏ)', 'Trong KHTN: Nói ảnh có kích thước nhỏ hơn vật.', 'A diverging lens gives a diminished image.', 'Thấu kính phân kì cho ảnh nhỏ hơn vật.'),
    flame: g('candle flame', '/ˈkæn.dəl fleɪm/', 'n', 'ngọn nến', 'Trong KHTN: Vật sáng đơn giản dùng để tạo ảnh qua thấu kính.', 'The candle flame is the object.', 'Ngọn nến là vật.')
  });

  const L1 = { vi: 'Mục tiêu. Sau bài học này em sẽ:', en: 'Aims. After this lesson you will:' };
  D.lessons['khtn9-bai8'] = {
    gradeId: 9, number: '8', book: 'Khoa học tự nhiên 9',
    title: { vi: 'Thấu kính', en: 'Lenses' },
    topic: { label: 'Chương', labelEn: 'Chapter', number: 'II', vi: 'Ánh sáng', en: 'Light' },
    spreadLabels: ['Cấu tạo và tiêu điểm', 'Đường truyền của tia sáng', 'Tạo ảnh qua thấu kính', 'Ôn tập'],
    pages: [
      { number: 40, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: L1, items: [
          { vi: 'Nêu được khái niệm quang tâm, trục chính, tiêu điểm chính và tiêu cự của thấu kính.', en: 'State what the {optical centre|optical-centre}, {principal axis|principal-axis}, {principal focus|focal-point} and {focal length|focal-length} of a lens are.' },
          { vi: 'Làm thí nghiệm để rút ra đường đi của một số tia sáng qua thấu kính.', en: 'Do experiments to find how some rays travel through a lens.' },
          { vi: 'Giải thích nguyên lí hoạt động của thấu kính bằng sự khúc xạ của các lăng kính nhỏ.', en: 'Explain how a lens works using refraction in small prisms.' },
          { vi: 'Vẽ được ảnh của vật qua thấu kính.', en: 'Draw the image of an object formed by a lens.' },
          { vi: 'Làm thí nghiệm chứng tỏ ảnh thật hứng được trên màn, ảnh ảo thì không.', en: 'Show by experiment that a {real image|real-image} can be caught on a screen and a {virtual image|virtual-image} cannot.' }
        ] },
        P('Thấu kính có trong ống nhòm, kính lúp, kính hiển vi và cả trong mắt của chúng ta. Ánh sáng đi qua thấu kính có thể tạo ra ảnh của vật như thế nào?', 'Lenses are found in binoculars, magnifying glasses, microscopes and in our own eyes. How can light passing through a {lens|lens} form an image of an object?', { badge: 'fire' }),
        { t: 'h2', n: 'I', vi: 'Cấu tạo thấu kính và phân loại', en: 'Structure and types of lenses' },
        P('**Thấu kính** là một khối trong suốt, đồng chất (thuỷ tinh, nhựa…), giới hạn bởi hai mặt cong hoặc bởi một mặt cong và một mặt phẳng (Hình 8.1). Dựa vào hình dạng, ta chia thành hai loại: thấu kính **rìa mỏng** (phần rìa mỏng hơn phần giữa) và thấu kính **rìa dày** (phần rìa dày hơn phần giữa) (Hình 8.2).',
          'A **lens** is a transparent, uniform block (glass, plastic…) bounded by two curved surfaces or by one curved and one flat surface (Figure 8.1). By shape there are two kinds: **{thin-edged|thin-edged}** lenses (the rim is thinner than the middle) and **{thick-edged|thick-edged}** lenses (the rim is thicker than the middle) (Figure 8.2).'),
        FIG('khtn8a', '8.2–8.3', 'Thấu kính rìa mỏng (hội tụ) và rìa dày (phân kì); chùm tia song song qua mỗi loại', 'A thin-edged (converging) and a thick-edged (diverging) lens, with parallel beams through each', true),
        { t: 'key', title: { vi: 'Phân loại', en: 'Classification' }, blocks: [
          { t: 'list', items: [
            { vi: 'Chùm sáng song song qua thấu kính **rìa mỏng** cho chùm tia ló **hội tụ**: đó là thấu kính hội tụ.', en: 'A parallel beam through a **thin-edged** lens emerges **converging**: a {converging lens|converging-lens}.' },
            { vi: 'Chùm sáng song song qua thấu kính **rìa dày** cho chùm tia ló **phân kì**: đó là thấu kính phân kì.', en: 'A parallel beam through a **thick-edged** lens emerges **diverging**: a {diverging lens|diverging-lens}.' }
          ] }
        ] }
      ] },
      { number: 41, blocks: [
        { t: 'ask', style: 'num', lead: { vi: 'Thực hiện', en: 'Do' }, items: [
          B('Quan sát độ dày, mỏng ở rìa so với phần giữa của các thấu kính trong phòng thí nghiệm rồi phân loại chúng thành hội tụ hoặc phân kì.', 'Compare the rim with the middle of the lenses in the lab and sort them into converging and diverging.'),
          B('Ống kính máy ảnh gồm nhiều thấu kính để ảnh rõ nét. Trong hệ bốn thấu kính (1), (2), (3), (4) ở Hình 8.4, em hãy chỉ ra thấu kính hội tụ và thấu kính phân kì (dựa vào hình dạng của tiết diện).', 'A camera lens has several lenses for a sharp picture. In the four-lens system (1)–(4) of Figure 8.4, say which are converging and which are diverging (from the shape of the cross-section).')
        ] },
        { t: 'h2', n: 'II', vi: 'Trục chính, quang tâm, tiêu điểm chính và tiêu cự', en: 'Principal axis, optical centre, principal focus and focal length' },
        P('Từ thí nghiệm ở Hình 8.3, ta vẽ đường truyền của tia sáng như Hình 8.5. (Dùng mô phỏng bên dưới: đổi loại thấu kính, tiêu cự f và độ nghiêng của chùm tia.)', 'From the experiment of Figure 8.3 we draw the rays as in Figure 8.5. (Use the simulation below: change the lens type, the focal length f and the tilt of the beam.)'),
        FIG('khtn8b', '8.5', 'Trục chính, quang tâm O, tiêu điểm chính F và tiêu cự f của hai loại thấu kính', 'Principal axis, optical centre O, principal focus F and focal length f for the two lens types', true),
        { t: 'key', title: { vi: 'Các điểm và đường đặc biệt', en: 'Special points and lines' }, blocks: [
          { t: 'list', items: [
            { vi: '**Quang tâm O**: điểm của thấu kính mà mọi tia sáng tới O đều truyền thẳng.', en: '**Optical centre O**: the point of the lens where every ray hitting it passes straight on.' },
            { vi: '**Trục chính**: đường thẳng đi qua O và vuông góc với tiết diện thẳng của thấu kính.', en: '**Principal axis**: the line through O perpendicular to the cross-section of the lens.' },
            { vi: '**Tiêu điểm chính F**: chùm tia tới song song trục chính cho chùm tia ló hội tụ tại F (thấu kính hội tụ), hoặc đường kéo dài của chùm tia ló hội tụ tại F (thấu kính phân kì).', en: '**Principal focus F**: a beam parallel to the axis emerges converging at F (converging lens), or the extensions of the emergent rays meet at F (diverging lens).' },
            { vi: '**Tiêu cự**: $f = OF$.', en: '**Focal length**: $f = OF$.' }
          ] }
        ] },
        { t: 'ask', style: 'num', items: [B('Chỉ ra trục chính, quang tâm và tiêu điểm chính của các thấu kính trong Hình 8.3.', 'Point out the principal axis, optical centre and principal focus of the lenses in Figure 8.3.')] }
      ] },
      { number: 42, blocks: [
        { t: 'h2', n: 'III', vi: 'Đường truyền của tia sáng qua thấu kính', en: 'The path of light rays through a lens' },
        { t: 'activity', no: 1, title: { vi: 'Thí nghiệm về đường truyền tia sáng qua thấu kính', en: 'Experiment: rays through a lens' },
          vi: 'Chiếu lần lượt ba tia lên thấu kính hội tụ: (a) tia song song với trục chính; (b) tia đi qua quang tâm O; (c) tia xiên bất kì (Hình 8.6). Quan sát và vẽ đường đi của từng tia ló. Lặp lại với thấu kính phân kì. Trong mô phỏng: kéo tay nắm đỏ, chọn loại tia.',
          en: 'Send three rays in turn at a converging lens: (a) parallel to the axis; (b) through the optical centre O; (c) any oblique ray (Figure 8.6). Observe and draw each emergent ray. Repeat with a diverging lens. In the simulation: drag the red handle and choose the ray type.' },
        { t: 'ask', style: 'num', lead: { vi: 'Rút ra', en: 'Conclude' }, items: [
          B('Tia tới song song trục chính cho tia ló thế nào ở thấu kính hội tụ và ở thấu kính phân kì?', 'How does a ray parallel to the axis emerge from a converging lens and from a diverging lens?'),
          B('Tia tới đi qua quang tâm O truyền như thế nào?', 'How does a ray through the optical centre O travel?')
        ] },
        { t: 'h3', vi: 'Giải thích bằng mô hình lăng kính nhỏ', en: 'Explaining with a small-prism model' },
        P('Có thể xem thấu kính hội tụ là nhiều lăng kính nhỏ ghép lại, các đáy hướng về trục chính (Hình 8.7); thấu kính phân kì là các lăng kính nhỏ có đáy hướng ra rìa (Hình 8.8). Mỗi lăng kính làm tia sáng lệch về phía đáy của nó; tia càng xa trục càng gặp lăng kính có góc chiết quang lớn nên lệch càng nhiều. Ở giữa thấu kính, hai mặt gần song song nên tia gần như không lệch. (Ở đây ta bỏ qua hiện tượng tán sắc.)',
          'A converging lens can be seen as many small prisms with their bases toward the axis (Figure 8.7); a diverging lens as small prisms with their bases toward the rim (Figure 8.8). Each prism bends a ray toward its base; the farther a ray from the axis, the larger the refracting angle it meets, so the more it bends. At the centre the two faces are almost parallel, so a ray is hardly bent. (We ignore dispersion here.)'),
        FIG('khtn8c', '8.7–8.8', 'Mô hình thấu kính gồm các lăng kính nhỏ', 'The small-prism model of a lens', true)
      ] },
      { number: 43, blocks: [
        { t: 'key', title: { vi: 'Đường đi của hai tia đặc biệt', en: 'Two special rays' }, blocks: [
          { t: 'list', items: [
            { vi: 'Tia qua quang tâm O: truyền thẳng, không đổi hướng.', en: 'A ray through the optical centre O: goes straight on.' },
            { vi: 'Tia song song với trục chính: tia ló (hoặc đường kéo dài của nó) đi qua tiêu điểm chính F.', en: 'A ray parallel to the principal axis: the emergent ray (or its extension) passes through the principal focus F.' }
          ] }
        ] },
        { t: 'h2', n: 'IV', vi: 'Ảnh của vật tạo bởi thấu kính', en: 'Images formed by lenses' },
        { t: 'h3', vi: '1. Ảnh thật và ảnh ảo', en: '1. Real and virtual images' },
        P('Nhắc lại: **ảnh thật** là ảnh hứng được trên màn, do các tia ló thật sự cắt nhau tạo ra; **ảnh ảo** là ảnh không hứng được trên màn, ta chỉ thấy khi nhìn qua thấu kính, do đường kéo dài của các tia ló cắt nhau tạo ra (Hình 8.9).',
          'Recall: a **real image** can be caught on a screen and is made where the emergent rays really cross; a **virtual image** cannot be caught on a screen, we see it by looking through the lens, and it is made where the extensions of the emergent rays cross (Figure 8.9).'),
        { t: 'h3', vi: '2. Vẽ ảnh của một điểm sáng', en: '2. Drawing the image of a point source' },
        P('Để vẽ ảnh $S\'$ của điểm sáng $S$, vẽ hai trong các tia đặc biệt xuất phát từ $S$ rồi tìm giao điểm của hai tia ló (nét liền) hoặc giao điểm của đường kéo dài của chúng (nét đứt) (Hình 8.10).',
          'To draw the image $S\'$ of a point source $S$, draw two special rays from $S$ and find where the two emergent rays cross (solid lines) or where their extensions cross (dashed lines) (Figure 8.10).'),
        FIG('khtn8d', '8.10', 'Dựng ảnh S′ của điểm sáng S bằng hai tia đặc biệt', 'Constructing the image S′ of the point S with two special rays', true),
        { t: 'ask', style: 'num', lead: { vi: 'Thực hành ảo', en: 'Virtual practical' }, items: [B('Kéo S tới mọi vị trí, dự đoán S′ rồi kiểm tra. Kéo S để S′ ở vô cực: khi đó S cách thấu kính bao nhiêu?', 'Drag S anywhere, predict S′ and check. Drag S so that S′ is at infinity: how far is S from the lens then?')] }
      ] },
      { number: 44, blocks: [
        { t: 'h3', vi: '3. Vẽ ảnh của vật AB', en: '3. Drawing the image of an object AB' },
        P('Vật sáng $AB$ đặt vuông góc với trục chính, $A$ nằm trên trục. Ảnh $A\'B\'$ cũng vuông góc với trục, nên chỉ cần dựng ảnh $B\'$ của $B$ rồi hạ vuông góc xuống trục để được $A\'$ (Hình 8.11). Quy ước: **ảnh thật vẽ bằng mũi tên nét liền, ảnh ảo vẽ bằng mũi tên nét đứt.**',
          'The object $AB$ is perpendicular to the axis with $A$ on it. The image $A\'B\'$ is also perpendicular to the axis, so find the image $B\'$ of $B$ and drop a perpendicular to the axis to get $A\'$ (Figure 8.11). Convention: **a real image is drawn with a solid arrow, a virtual image with a dashed arrow.**'),
        FIG('khtn8e', '8.11', 'Dựng ảnh của vật AB qua thấu kính hội tụ: a) d > f; b) d < f', 'Constructing the image of AB through a converging lens: a) d > f; b) d < f', true),
        { t: 'math', tex: '\\frac{1}{f} = \\frac{1}{d} + \\frac{1}{d\'} \\quad\\Rightarrow\\quad d\' = \\frac{d\\,f}{d - f}, \\qquad k = \\frac{h\'}{h} = -\\frac{d\'}{d}', label: '(8.1) (mở rộng, ngoài sách)' },
        P('Công thức (8.1) là phần mở rộng: nó cho cùng kết quả với cách dựng hình. Ở thấu kính phân kì dùng $f < 0$. Nếu $d\' > 0$ ảnh thật, nếu $d\' < 0$ ảnh ảo; $k < 0$ ảnh ngược chiều, $k > 0$ cùng chiều; $|k| > 1$ ảnh lớn hơn vật.',
          'Formula (8.1) is an extension: it gives the same result as the construction. For a diverging lens use $f < 0$. If $d\' > 0$ the image is real, if $d\' < 0$ virtual; $k < 0$ means inverted, $k > 0$ upright; $|k| > 1$ means magnified.'),
        { t: 'ex', kind: 'example', no: 1, body: [P('Vật $AB$ cao $2\\ \\text{cm}$ đặt cách thấu kính hội tụ $f = 10\\ \\text{cm}$ một khoảng $d = 15\\ \\text{cm}$. Tìm vị trí, chiều cao và tính chất của ảnh.', 'An object $AB$ $2\\ \\text{cm}$ tall stands $d = 15\\ \\text{cm}$ from a converging lens of $f = 10\\ \\text{cm}$. Find the position, height and nature of the image.')],
          solution: [P('$d\' = \\frac{15 \\cdot 10}{15 - 10} = 30\\ \\text{cm}$; $k = -\\frac{30}{15} = -2$; $h\' = 4\\ \\text{cm}$. Ảnh **thật, ngược chiều, lớn hơn vật**, cách thấu kính $30\\ \\text{cm}$.', '$d\' = \\frac{15 \\cdot 10}{15 - 10} = 30\\ \\text{cm}$; $k = -\\frac{30}{15} = -2$; $h\' = 4\\ \\text{cm}$. The image is **real, inverted, magnified**, $30\\ \\text{cm}$ from the lens.')] }
      ] },
      { number: 45, blocks: [
        { t: 'activity', no: 2, title: { vi: 'Thực hành ảo: dựng ảnh và điền Bảng 8.1, 8.2', en: 'Virtual practical: construct images and fill Tables 8.1, 8.2' },
          vi: 'Dùng mô phỏng bên dưới: đặt vật ở $d > f$ rồi $d < f$ với thấu kính hội tụ; bấm “Ghi kết quả” để điền Bảng 8.1. Đổi sang thấu kính phân kì và làm tương tự cho Bảng 8.2. Gợi ý: kéo vật tới các vị trí $d = 2f$ và $d = f$ (có điểm hít).',
          en: 'Use the simulation below: put the object at $d > f$ then $d < f$ for the converging lens and press “Record” to fill Table 8.1. Switch to the diverging lens and do the same for Table 8.2. Hint: drag the object to $d = 2f$ and $d = f$ (snap points).' },
        { t: 'ask', style: 'num', lead: { vi: 'Thí nghiệm 1 (trên giá quang học)', en: 'Experiment 1 (optical bench)' }, items: [
          B('Dùng thấu kính hội tụ, đặt vật ở $d > f$ và dịch màn: ảnh hứng được trên màn là ảnh thật hay ảo? Ảnh cùng chiều hay ngược chiều với vật?', 'With the converging lens put the object at $d > f$ and move the screen: is the image caught on the screen real or virtual? Upright or inverted?'),
          B('Đặt vật ở $d < f$: quan sát ảnh bằng cách nào? Ảnh có hứng được trên màn không?', 'Put the object at $d < f$: how do you see the image? Can it be caught on the screen?')
        ] },
        { t: 'ask', style: 'num', lead: { vi: 'Thí nghiệm 2 (thấu kính phân kì)', en: 'Experiment 2 (diverging lens)' }, items: [
          B('Ảnh ảo qua thấu kính hội tụ và qua thấu kính phân kì giống và khác nhau ở điểm nào?', 'How are the virtual images from the converging and the diverging lens alike and different?'),
          B('Nêu các cách phân biệt thấu kính hội tụ và thấu kính phân kì.', 'Give ways to tell a converging from a diverging lens.')
        ] },
        { t: 'tip', items: [{ vi: 'Các cách phân biệt: (1) rìa mỏng hay dày; (2) chùm song song cho chùm ló hội tụ hay phân kì; (3) hứng được ảnh thật trên màn (chỉ thấu kính hội tụ); (4) nhìn chữ qua thấu kính: ảnh lớn hơn (hội tụ) hay nhỏ hơn (phân kì) khi vật gần.', en: 'Ways to tell them apart: (1) thin or thick rim; (2) a parallel beam emerges converging or diverging; (3) a real image can be caught on a screen (converging only); (4) look at print through the lens: magnified (converging) or smaller (diverging) when the object is close.' }] },
        { t: 'key', title: { vi: 'Tổng hợp về ảnh của vật qua thấu kính', en: 'Summary of images formed by lenses' }, blocks: [
          { t: 'table', head: true, rows: [
            [C('Thấu kính', 'Lens'), C('Vị trí vật', 'Object position'), C('Ảnh', 'Image')],
            [C('Hội tụ', 'Converging'), C('d > f', 'd > f'), C('Thật, ngược chiều với vật', 'Real, inverted')],
            [C('Hội tụ', 'Converging'), C('d < f', 'd < f'), C('Ảo, cùng chiều, lớn hơn vật', 'Virtual, upright, magnified')],
            [C('Phân kì', 'Diverging'), C('Mọi d', 'Any d'), C('Ảo, cùng chiều, nhỏ hơn vật', 'Virtual, upright, diminished')]
          ] }
        ] }
      ] },
      { number: 46, blocks: [
        { t: 'head', kind: 'practice', vi: 'Luyện tập', en: 'Practice' },
        { t: 'ex', kind: 'practice', no: 1, body: [P('Vật cao $3\\ \\text{cm}$ cách thấu kính hội tụ $f = 12\\ \\text{cm}$ một khoảng $36\\ \\text{cm}$. Tính khoảng cách ảnh và chiều cao ảnh.', 'An object $3\\ \\text{cm}$ tall is $36\\ \\text{cm}$ from a converging lens of $f = 12\\ \\text{cm}$. Find the image distance and height.')], solution: [P('$d\' = \\frac{36 \\cdot 12}{36 - 12} = 18\\ \\text{cm}$; $k = -0{,}5$; $h\' = 1{,}5\\ \\text{cm}$ (thật, ngược chiều, nhỏ hơn vật).', '$d\' = \\frac{36 \\cdot 12}{36 - 12} = 18\\ \\text{cm}$; $k = -0.5$; $h\' = 1.5\\ \\text{cm}$ (real, inverted, diminished).')] },
        { t: 'ex', kind: 'practice', no: 2, body: [P('Thấu kính hội tụ $f = 10\\ \\text{cm}$. Vật ở $d = 5\\ \\text{cm}$. Mô tả ảnh.', 'A converging lens has $f = 10\\ \\text{cm}$. The object is at $d = 5\\ \\text{cm}$. Describe the image.')], solution: [P('$d\' = \\frac{5 \\cdot 10}{5 - 10} = -10\\ \\text{cm}$; $k = 2$: ảnh **ảo**, cùng chiều, lớn gấp 2, cách thấu kính $10\\ \\text{cm}$ (cùng phía với vật).', '$d\' = \\frac{5 \\cdot 10}{5 - 10} = -10\\ \\text{cm}$; $k = 2$: a **virtual**, upright image twice as tall, $10\\ \\text{cm}$ from the lens on the object’s side.')] },
        { t: 'head', kind: 'apply', vi: 'Vận dụng', en: 'Apply' },
        { t: 'ex', kind: 'apply', no: 1, body: [P('Một chai nhựa trong suốt đựng đầy nước có thể dùng làm “thấu kính”. Nó thuộc loại nào? Giải thích.', 'A clear plastic bottle filled with water can act as a “lens”. Which kind? Explain.')], solution: [P('Phần giữa dày hơn rìa nên giống thấu kính hội tụ: nó có thể gom ánh sáng Mặt Trời (nguy hiểm nếu để gần vật dễ cháy) và phóng to chữ ở gần chai.', 'It is thicker in the middle than at the rim, so it behaves like a converging lens: it can gather sunlight (a fire hazard near flammable things) and magnify print placed close behind it.')] },
        { t: 'quiz', title: { vi: 'Tự kiểm tra', en: 'Self-check' }, items: [
          Q('q1', 'Thấu kính rìa mỏng là thấu kính:', 'A thin-edged lens is a:', [['Hội tụ', 'Converging lens'], ['Phân kì', 'Diverging lens'], ['Luôn cho ảnh ảo', 'Lens that always gives a virtual image'], ['Không có tiêu điểm', 'Lens without a focus']], 0, 'Chùm song song qua thấu kính rìa mỏng cho chùm ló hội tụ.', 'A parallel beam through a thin-edged lens emerges converging.'),
          Q('q2', 'Tia tới đi qua quang tâm O của thấu kính sẽ:', 'A ray hitting the optical centre O will:', [['Truyền thẳng', 'Go straight on'], ['Đi qua tiêu điểm', 'Pass through the focus'], ['Bị phản xạ', 'Be reflected'], ['Song song trục chính', 'Become parallel to the axis']], 0, 'Đó là định nghĩa của quang tâm.', 'That is the definition of the optical centre.'),
          Q('q3', 'Tia tới song song trục chính của thấu kính hội tụ cho tia ló:', 'A ray parallel to the axis of a converging lens emerges:', [['Đi qua tiêu điểm chính F′', 'Through the principal focus F′'], ['Song song trục chính', 'Parallel to the axis'], ['Qua quang tâm O', 'Through O'], ['Đi ngược trở lại', 'Back the way it came']], 0, 'Tia ló đi qua tiêu điểm chính.', 'The emergent ray passes through the principal focus.'),
          Q('q4', 'Ảnh thật là ảnh:', 'A real image is one that:', [['Hứng được trên màn', 'Can be caught on a screen'], ['Chỉ nhìn thấy qua thấu kính', 'Is seen only through the lens'], ['Luôn cùng chiều với vật', 'Is always upright'], ['Luôn nhỏ hơn vật', 'Is always smaller']], 0, 'Ảnh thật hứng được trên màn chắn.', 'A real image can be caught on a screen.'),
          Q('q5', 'Vật đặt trong khoảng tiêu cự của thấu kính hội tụ cho ảnh:', 'An object inside the focal length of a converging lens gives an image that is:', [['Ảo, cùng chiều, lớn hơn vật', 'Virtual, upright, magnified'], ['Thật, ngược chiều, lớn hơn vật', 'Real, inverted, magnified'], ['Thật, ngược chiều, nhỏ hơn vật', 'Real, inverted, diminished'], ['Ảo, ngược chiều', 'Virtual, inverted']], 0, 'Khi $d < f$ ảnh là ảnh ảo, cùng chiều, lớn hơn vật (kính lúp).', 'For $d < f$ the image is virtual, upright, magnified (magnifying glass).'),
          Q('q6', 'Vật ở mọi vị trí trước thấu kính phân kì luôn cho ảnh:', 'An object at any position in front of a diverging lens gives an image that is:', [['Ảo, cùng chiều, nhỏ hơn vật', 'Virtual, upright, diminished'], ['Thật, ngược chiều', 'Real, inverted'], ['Ảo, lớn hơn vật', 'Virtual, magnified'], ['Ảnh ở vô cực', 'At infinity']], 0, 'Thấu kính phân kì chỉ cho ảnh ảo, cùng chiều, nhỏ hơn vật.', 'A diverging lens only gives virtual, upright, diminished images.'),
          Q('q7', 'Thấu kính hội tụ $f = 10\\ \\text{cm}$, vật $d = 15\\ \\text{cm}$. Khoảng cách ảnh $d\'$ bằng:', 'Converging lens $f = 10\\ \\text{cm}$, object at $d = 15\\ \\text{cm}$. The image distance $d\'$ is:', [['30 cm', '30 cm'], ['6 cm', '6 cm'], ['15 cm', '15 cm'], ['−30 cm', '−30 cm']], 0, '$d\' = 15 \\cdot 10 / 5 = 30\\ \\text{cm}$.', '$d\' = 15 \\cdot 10 / 5 = 30\\ \\text{cm}$.'),
          Q('q8', 'Với thấu kính hội tụ, khi $d = 2f$ thì ảnh:', 'With a converging lens, when $d = 2f$ the image is:', [['Thật, ngược chiều, bằng vật, $d\' = 2f$', 'Real, inverted, same size, $d\' = 2f$'], ['Ảo, bằng vật', 'Virtual, same size'], ['Thật, lớn gấp 2', 'Real, twice as big'], ['Ở vô cực', 'At infinity']], 0, '$d\' = 2f \\cdot f/(2f - f) = 2f$ và $k = -1$.', '$d\' = 2f \\cdot f/(2f - f) = 2f$ and $k = -1$.'),
          Q('q9', 'Thấu kính hội tụ $f = 12\\ \\text{cm}$, vật cao 3 cm ở $d = 36\\ \\text{cm}$. Chiều cao ảnh là:', 'Converging lens $f = 12\\ \\text{cm}$, object 3 cm tall at $d = 36\\ \\text{cm}$. The image height is:', [['1,5 cm', '1.5 cm'], ['3 cm', '3 cm'], ['6 cm', '6 cm'], ['0,5 cm', '0.5 cm']], 0, '$d\' = 18\\ \\text{cm}$, $|k| = 0{,}5$ nên $h\' = 1{,}5\\ \\text{cm}$.', '$d\' = 18\\ \\text{cm}$, $|k| = 0.5$, so $h\' = 1.5\\ \\text{cm}$.'),
          Q('q10', 'Vật ở đúng tiêu điểm của thấu kính hội tụ ($d = f$). Chùm tia ló:', 'An object exactly at the focus of a converging lens ($d = f$). The emergent beam is:', [['Song song, ảnh ở vô cực', 'Parallel, image at infinity'], ['Hội tụ tại màn', 'Converging on the screen'], ['Phân kì mạnh', 'Strongly diverging'], ['Bị phản xạ', 'Reflected']], 0, 'Khi $d = f$ thì $d\' \\to \\infty$: chùm ló song song.', 'When $d = f$, $d\' \\to \\infty$: the emergent beam is parallel.'),
          Q('q11', 'Thực hành ảo: thấu kính hội tụ $f = 5\\ \\text{cm}$. Kéo vật để ảnh thật cao bằng vật thì $d$ bằng:', 'Virtual practical: a converging lens $f = 5\\ \\text{cm}$. Drag the object so the real image is as tall as the object: $d$ is:', [['10 cm', '10 cm'], ['5 cm', '5 cm'], ['2,5 cm', '2.5 cm'], ['15 cm', '15 cm']], 0, 'Ảnh bằng vật khi $d = 2f = 10\\ \\text{cm}$ (và $d\' = 10\\ \\text{cm}$).', 'The image equals the object when $d = 2f = 10\\ \\text{cm}$ (and $d\' = 10\\ \\text{cm}$).'),
          Q('q12', 'Thấu kính phân kì $|f| = 10\\ \\text{cm}$, vật ở $d = 20\\ \\text{cm}$. Ảnh cách thấu kính khoảng:', 'A diverging lens $|f| = 10\\ \\text{cm}$, object at $d = 20\\ \\text{cm}$. The image is about:', [['6,7 cm, ảo, cùng phía vật', '6.7 cm, virtual, on the object’s side'], ['20 cm, thật', '20 cm, real'], ['6,7 cm, thật', '6.7 cm, real'], ['30 cm, ảo', '30 cm, virtual']], 0, '$d\' = 20 \\cdot (-10)/(20 + 10) = -6{,}67\\ \\text{cm}$ và $k = 1/3$.', '$d\' = 20 \\cdot (-10)/(20 + 10) = -6.67\\ \\text{cm}$ and $k = 1/3$.')
        ] },
        { t: 'key', title: { vi: 'Em đã học', en: 'What you have learned' }, blocks: [{ t: 'list', items: [
          { vi: 'Thấu kính hội tụ (rìa mỏng) và phân kì (rìa dày); quang tâm O, trục chính, tiêu điểm F, tiêu cự $f = OF$.', en: 'Converging (thin-edged) and diverging (thick-edged) lenses; optical centre O, principal axis, focus F, focal length $f = OF$.' },
          { vi: 'Hai tia đặc biệt và cách dựng ảnh; ảnh thật hứng được trên màn, ảnh ảo thì không.', en: 'Two special rays and image construction; a real image can be caught on a screen, a virtual one cannot.' }
        ] }] },
        { t: 'key', title: { vi: 'Em có thể', en: 'You can' }, blocks: [{ t: 'list', items: [{ vi: 'Vẽ ảnh của vật qua thấu kính và phân biệt hai loại thấu kính. Thử chế tạo “thấu kính” từ chai nước (có người lớn giúp, tránh để ánh nắng hội tụ gây cháy).', en: 'Draw the image of an object through a lens and tell the two lens types apart. Try a water-bottle “lens” (with an adult; avoid focusing sunlight where it could start a fire).' }] }] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          { vi: 'Vật ngoài tiêu cự của thấu kính hội tụ cho ảnh thật, ngược chiều; trong tiêu cự cho ảnh ảo, cùng chiều, lớn hơn vật.', en: 'Outside the focal length a converging lens gives a real, inverted image; inside it, a virtual, upright, magnified one.' },
          { vi: 'Thấu kính phân kì luôn cho ảnh ảo, cùng chiều, nhỏ hơn vật.', en: 'A diverging lens always gives a virtual, upright, diminished image.' },
          { vi: 'Mở rộng: $1/f = 1/d + 1/d\'$, $k = -d\'/d$.', en: 'Extension: $1/f = 1/d + 1/d\'$, $k = -d\'/d$.' }
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.', keys: ['lens', 'converging-lens', 'diverging-lens', 'thin-edged', 'thick-edged', 'optical-centre', 'principal-axis', 'focal-point', 'focal-length', 'ray-diagram', 'real-image', 'virtual-image', 'inverted', 'upright', 'magnified', 'diminished', 'optics-screen', 'optical-bench', 'flame'] }
      ] }
    ]
  };
  (function strip(o) {
    if (Array.isArray(o)) o.forEach(strip);
    else if (o && typeof o === 'object') { for (const k in o) { if (k === 'vi' && typeof o[k] === 'string') o[k] = o[k].replace(/\{([^{}|]+)\|[^{}]+\}/g, '$1'); else strip(o[k]); } }
  })(D.lessons['khtn9-bai8'].pages);
})();
