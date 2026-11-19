/* ==========================================================================
   KHOA HỌC TỰ NHIÊN 9 — BÀI MỞ ĐẦU
     'khtn9-bai1'  Bài 1. Nhận biết một số dụng cụ, hoá chất. Thuyết trình một vấn đề khoa học (tr. 6–14)
   NỘI DUNG NGUYÊN BẢN do nhóm dự án soạn theo cấu trúc mục, số hiệu hình và các yêu cầu cần đạt của bài;
   không phải bản chép sách giáo khoa. Hãy đối chiếu với sách in trước khi dùng chính thức.
   ========================================================================== */
(function () {
  'use strict';
  const D = (window.TEXTBOOK = window.TEXTBOOK || {});
  D.lessons = D.lessons || {};
  D.glossary = D.glossary || {};
  const g = (word, ipa, pos, vi, ctx, en, viEx) => ({ word, ipa, pos, vi, ctx, ex: { en, vi: viEx } });
  const P = (vi, en, x) => Object.assign({ t: 'p', vi, en }, x || {});
  const Q = (id, vi, en, opts, answer, whyVi, whyEn) => ({ id, vi, en, options: opts.map((o) => ({ vi: o[0], en: o[1] })), answer, whyVi, whyEn });
  const B = (vi, en) => ({ vi, en });
  const T2 = (a, b, c) => [{ vi: a[0], en: a[1] }, { vi: b[0], en: b[1] }, { vi: c[0], en: c[1] }];

  Object.assign(D.glossary, {
    laboratory: g('laboratory', '/ləˈbɒr.ə.tri/', 'n', 'phòng thí nghiệm',
      'Trong KHTN: Căn phòng có dụng cụ, hoá chất và quy tắc an toàn để làm thí nghiệm.', 'Wear a lab coat in the laboratory.', 'Hãy mặc áo choàng khi vào phòng thí nghiệm.'),
    apparatus: g('apparatus', '/ˌæp.əˈreɪ.təs/', 'n', 'bộ dụng cụ, thiết bị',
      'Trong KHTN: Bộ gồm nhiều dụng cụ được lắp lại để làm một thí nghiệm.', 'Set up the apparatus before you start.', 'Hãy lắp bộ dụng cụ trước khi bắt đầu.'),
    equipment: g('equipment', '/ɪˈkwɪp.mənt/', 'n', 'dụng cụ, thiết bị (không đếm được)',
      'Trong KHTN: Tên chung của các dụng cụ và máy dùng cho một công việc; không thêm “s”.', 'Check the equipment before each experiment.', 'Hãy kiểm tra dụng cụ trước mỗi thí nghiệm.'),
    chemical: g('chemical', '/ˈkem.ɪ.kəl/', 'n', 'hoá chất',
      'Trong KHTN: Chất dùng trong thí nghiệm hoá học; cần được bảo quản và dán nhãn.', 'Never taste a chemical.', 'Tuyệt đối không nếm hoá chất.'),
    reagent: g('reagent', '/riˈeɪ.dʒənt/', 'n', 'thuốc thử, chất phản ứng',
      'Trong KHTN: Chất dùng để nhận biết hoặc làm phản ứng với chất khác trong thí nghiệm.', 'Litmus paper is a simple reagent.', 'Giấy quỳ là một thuốc thử đơn giản.'),
    'light-source': g('light source', '/laɪt sɔːs/', 'n', 'nguồn sáng',
      'Trong KHTN: Vật phát ra ánh sáng, như đèn dây tóc hoặc laser trong thí nghiệm quang học.', 'A filament lamp is a light source.', 'Đèn dây tóc là một nguồn sáng.'),
    ray: g('ray', '/reɪ/', 'n', 'tia (sáng)',
      'Trong KHTN: Đường thẳng có mũi tên biểu diễn hướng truyền của ánh sáng.', 'Draw the incident ray with a ruler.', 'Hãy vẽ tia tới bằng thước.'),
    beam: g('beam', '/biːm/', 'n', 'chùm (sáng)',
      'Trong KHTN: Tập hợp nhiều tia sáng đi cùng nhau; chùm hẹp được biểu diễn bằng một tia.', 'A narrow beam passes through the slit.', 'Một chùm hẹp đi qua khe.'),
    laser: g('laser', '/ˈleɪ.zər/', 'n', 'laser',
      'Trong KHTN: Nguồn sáng cho chùm rất hẹp, sáng mạnh; không được chiếu vào mắt.', 'Never point a laser at anyone’s eyes.', 'Không bao giờ chiếu laser vào mắt ai.'),
    slit: g('slit', '/slɪt/', 'n', 'khe hẹp',
      'Trong KHTN: Đường hở dài và hẹp trên tấm chắn để cho chùm sáng hẹp đi qua.', 'The plate has three slits.', 'Tấm chắn có ba khe.'),
    'half-cylinder': g('semicircular block', '/ˌsem.iˈsɜː.kjʊ.lər blɒk/', 'n', 'bản bán trụ',
      'Trong KHTN: Khối thuỷ tinh trong suốt hình nửa hình trụ, dùng nghiên cứu khúc xạ và phản xạ toàn phần.', 'Place the semicircular block on the scale.', 'Hãy đặt bản bán trụ lên bảng chia độ.'),
    'angle-scale': g('angle scale', '/ˈæŋ.ɡəl skeɪl/', 'n', 'bảng chia độ (đo góc)',
      'Trong KHTN: Tấm có vạch chia độ để đọc góc tới, góc phản xạ và góc khúc xạ.', 'Read the angle from the scale.', 'Hãy đọc góc trên bảng chia độ.'),
    lens: g('lens', '/lenz/', 'n', 'thấu kính',
      'Trong KHTN: Khối trong suốt có hai mặt cong (hoặc một mặt cong, một mặt phẳng) làm hội tụ hoặc phân kì chùm sáng.', 'A lens can form an image on a screen.', 'Thấu kính có thể tạo ảnh trên màn chắn.'),
    'converging-lens': g('converging lens', '/kənˈvɜː.dʒɪŋ lenz/', 'n', 'thấu kính hội tụ',
      'Trong KHTN: Thấu kính có phần giữa dày hơn rìa, làm chùm sáng song song hội tụ về một điểm.', 'A converging lens is thicker in the middle.', 'Thấu kính hội tụ dày ở giữa.'),
    'diverging-lens': g('diverging lens', '/daɪˈvɜː.dʒɪŋ lenz/', 'n', 'thấu kính phân kì',
      'Trong KHTN: Thấu kính có phần giữa mỏng hơn rìa, làm chùm sáng song song loe rộng ra.', 'A diverging lens spreads the light out.', 'Thấu kính phân kì làm ánh sáng loe ra.'),
    'optics-screen': g('screen', '/skriːn/', 'n', 'màn chắn, màn hứng ảnh',
      'Trong KHTN: Tấm phẳng đặt sau thấu kính để hứng ảnh thật của vật sáng.', 'Move the screen until the image is sharp.', 'Hãy dịch màn chắn cho tới khi ảnh rõ nét.'),
    'optical-bench': g('optical bench', '/ˈɒp.tɪ.kəl bentʃ/', 'n', 'giá quang học',
      'Trong KHTN: Thanh có thước chia để đặt vật, thấu kính và màn trên cùng một trục và dịch chuyển dễ dàng.', 'Mount the lens on the optical bench.', 'Hãy gắn thấu kính lên giá quang học.'),
    galvanometer: g('galvanometer', '/ˌɡæl.vəˈnɒm.ɪ.tər/', 'n', 'điện kế',
      'Trong KHTN: Dụng cụ phát hiện dòng điện rất nhỏ và cho biết chiều của nó; vạch 0 ở giữa thang đo.', 'The galvanometer needle moved to the right.', 'Kim điện kế lệch sang phải.'),
    multimeter: g('multimeter', '/ˈmʌl.tiˌmiː.tər/', 'n', 'đồng hồ đo điện đa năng',
      'Trong KHTN: Một thiết bị đo được cường độ dòng điện, hiệu điện thế, điện trở…', 'Turn the knob of the multimeter to the voltage range.', 'Hãy xoay núm đồng hồ đa năng sang thang đo hiệu điện thế.'),
    'induced-current': g('induced current', '/ɪnˈdjuːst ˈkʌr.ənt/', 'n', 'dòng điện cảm ứng',
      'Trong KHTN: Dòng điện xuất hiện trong cuộn dây kín khi số đường sức từ xuyên qua cuộn dây thay đổi.', 'Moving a magnet makes an induced current.', 'Di chuyển nam châm sinh ra dòng điện cảm ứng.'),
    coil: g('coil', '/kɔɪl/', 'n', 'cuộn dây',
      'Trong KHTN: Dây dẫn quấn nhiều vòng; dùng để tạo ra hoặc phát hiện dòng điện cảm ứng.', 'Connect the coil to the galvanometer.', 'Hãy nối cuộn dây với điện kế.'),
    led: g('LED', '/ˌel.iːˈdiː/', 'n', 'đèn LED, điốt phát quang',
      'Trong KHTN: Linh kiện chỉ phát sáng khi dòng điện đi vào đúng cực, nên dùng hai LED ngược cực để biết chiều dòng điện cảm ứng.', 'The red LED lights up only for one direction.', 'LED đỏ chỉ sáng với một chiều dòng điện.'),
    funnel: g('funnel', '/ˈfʌn.əl/', 'n', 'phễu',
      'Trong KHTN: Dụng cụ để rót chất lỏng vào bình miệng hẹp hoặc để lọc.', 'Pour the liquid through a funnel.', 'Hãy rót chất lỏng qua phễu.'),
    'separating-funnel': g('separating funnel', '/ˈsep.ə.reɪ.tɪŋ ˈfʌn.əl/', 'n', 'phễu chiết',
      'Trong KHTN: Phễu có khoá, dùng để tách hai chất lỏng không tan vào nhau.', 'Use a separating funnel to separate oil from water.', 'Dùng phễu chiết để tách dầu khỏi nước.'),
    'round-flask': g('round-bottom flask', '/ˌraʊnd ˈbɒt.əm flɑːsk/', 'n', 'bình cầu',
      'Trong KHTN: Bình đáy tròn, chịu nhiệt, dùng để đựng chất lỏng, pha chế, đun nóng hoặc chưng cất.', 'Heat the mixture in a round-bottom flask.', 'Hãy đun hỗn hợp trong bình cầu.'),
    beaker: g('beaker', '/ˈbiː.kər/', 'n', 'cốc thuỷ tinh',
      'Trong KHTN: Cốc có vạch chia thô, dùng pha dung dịch hoặc đun nóng chất lỏng.', 'Dissolve the salt in a beaker of water.', 'Hãy hoà tan muối trong cốc nước.'),
    'evaporating-dish': g('evaporating dish', '/ɪˈvæp.ə.reɪ.tɪŋ dɪʃ/', 'n', 'bát sứ',
      'Trong KHTN: Bát bằng sứ chịu nhiệt, dùng cô cạn dung dịch hoặc đun chất rắn.', 'Heat the solution in an evaporating dish.', 'Hãy đun dung dịch trong bát sứ.'),
    'wire-gauze': g('wire gauze', '/ˈwaɪər ɡɔːz/', 'n', 'lưới tản nhiệt',
      'Trong KHTN: Tấm lưới kim loại đặt giữa ngọn lửa và dụng cụ thuỷ tinh để nhiệt phân tán đều, tránh vỡ.', 'Put a wire gauze under the beaker.', 'Hãy đặt lưới tản nhiệt dưới cốc.'),
    microscope: g('microscope', '/ˈmaɪ.krə.skəʊp/', 'n', 'kính hiển vi',
      'Trong KHTN: Dụng cụ phóng to vật rất nhỏ để quan sát, như tế bào hay nhiễm sắc thể.', 'We observe chromosomes with a microscope.', 'Chúng ta quan sát nhiễm sắc thể bằng kính hiển vi.'),
    chromosome: g('chromosome', '/ˈkrəʊ.mə.səʊm/', 'n', 'nhiễm sắc thể (NST)',
      'Trong KHTN: Cấu trúc mang gene trong nhân tế bào, thấy rõ nhất khi tế bào phân chia.', 'Humans have 46 chromosomes.', 'Người có 46 nhiễm sắc thể.'),
    specimen: g('specimen', '/ˈspes.ɪ.mən/', 'n', 'tiêu bản, mẫu vật',
      'Trong KHTN: Mẫu vật được cố định trên lam kính để quan sát dưới kính hiển vi.', 'Place the specimen on the stage.', 'Hãy đặt tiêu bản lên bàn kính.'),
    'immersion-oil': g('immersion oil', '/ɪˈmɜː.ʃən ɔɪl/', 'n', 'dầu soi kính',
      'Trong KHTN: Dầu trong suốt, chiết suất cao, nhỏ lên tiêu bản khi dùng vật kính 100× để nhìn rõ hơn.', 'Add one drop of immersion oil.', 'Hãy nhỏ một giọt dầu soi kính.'),
    acid: g('acid', '/ˈæs.ɪd/', 'n', 'acid',
      'Trong KHTN: Hợp chất như HCl, H₂SO₄ làm quỳ tím hoá đỏ; thường có tính ăn mòn.', 'Add acid to water, never water to acid.', 'Rót acid vào nước, không rót nước vào acid.'),
    'chem-base': g('base', '/beɪs/', 'n', 'base',
      'Trong KHTN: Hợp chất như NaOH, NH₃ làm quỳ tím hoá xanh. (Nghĩa khác: cơ sở, đáy.)', 'A base turns litmus paper blue.', 'Base làm giấy quỳ hoá xanh.'),
    oxide: g('oxide', '/ˈɒk.saɪd/', 'n', 'oxide',
      'Trong KHTN: Hợp chất của oxygen với một nguyên tố khác, như CuO, CaO.', 'Calcium oxide reacts with water.', 'Calcium oxide phản ứng với nước.'),
    indicator: g('indicator', '/ˈɪn.dɪ.keɪ.tər/', 'n', 'chất chỉ thị',
      'Trong KHTN: Chất đổi màu theo môi trường acid hoặc base, như giấy pH, phenolphthalein.', 'Phenolphthalein is an indicator.', 'Phenolphthalein là một chất chỉ thị.'),
    hazardous: g('hazardous', '/ˈhæz.ə.dəs/', 'adj', 'nguy hiểm, có hại',
      'Trong KHTN: Có thể gây hại cho sức khoẻ hoặc môi trường; thường có biểu tượng cảnh báo trên nhãn.', 'Hazardous chemicals need careful handling.', 'Hoá chất nguy hiểm cần được xử lí cẩn thận.'),
    corrosive: g('corrosive', '/kəˈrəʊ.sɪv/', 'adj', 'ăn mòn',
      'Trong KHTN: Làm hỏng da, kim loại hoặc vật liệu khác, như acid đặc.', 'Concentrated sulfuric acid is corrosive.', 'Sulfuric acid đặc có tính ăn mòn.'),
    volatile: g('volatile', '/ˈvɒl.ə.taɪl/', 'adj', 'dễ bay hơi',
      'Trong KHTN: Dễ chuyển thành hơi ở nhiệt độ thường, hơi có thể độc hoặc dễ cháy.', 'Ethanol is a volatile liquid.', 'Ethanol là chất lỏng dễ bay hơi.'),
    label: g('label', '/ˈleɪ.bəl/', 'n', 'nhãn',
      'Trong KHTN: Mảnh giấy dán trên chai lọ, ghi tên và thông tin của hoá chất.', 'Read the label before you use a chemical.', 'Hãy đọc nhãn trước khi dùng hoá chất.'),
    goggles: g('safety goggles', '/ˈseɪf.ti ˈɡɒɡ.əlz/', 'n', 'kính bảo hộ',
      'Trong KHTN: Kính che kín mắt để tránh hoá chất bắn vào khi làm thí nghiệm.', 'Wear safety goggles when heating liquids.', 'Hãy đeo kính bảo hộ khi đun chất lỏng.'),
    report: g('report', '/rɪˈpɔːt/', 'n', 'báo cáo',
      'Trong KHTN: Văn bản trình bày có cấu trúc về cách làm và kết quả của một nghiên cứu.', 'Write a report on your experiment.', 'Hãy viết báo cáo về thí nghiệm của em.'),
    abstract: g('abstract', '/ˈæb.strækt/', 'n', 'phần tóm tắt',
      'Trong KHTN: Đoạn ngắn tóm lược mục tiêu, phương pháp, kết quả và kết luận. (Tính từ “abstract” là trừu tượng.)', 'Read the abstract first.', 'Hãy đọc phần tóm tắt trước.'),
    introduction: g('introduction', '/ˌɪn.trəˈdʌk.ʃən/', 'n', 'phần giới thiệu, mở đầu',
      'Trong KHTN: Phần nêu vấn đề nghiên cứu, tầm quan trọng và mục tiêu.', 'The introduction states the aim.', 'Phần giới thiệu nêu mục tiêu.'),
    methods: g('method', '/ˈmeθ.əd/', 'n', 'phương pháp',
      'Trong KHTN: Phần mô tả cách làm thí nghiệm, thu thập và xử lí số liệu, liệt kê dụng cụ và hoá chất.', 'The method section lists the materials.', 'Phần phương pháp liệt kê vật liệu.'),
    results: g('results', '/rɪˈzʌlts/', 'n', 'kết quả',
      'Trong KHTN: Phần trình bày số liệu thu được bằng bảng, biểu đồ hoặc hình ảnh.', 'Show the results in a table.', 'Hãy trình bày kết quả trong một bảng.'),
    discussion: g('discussion', '/dɪˈskʌʃ.ən/', 'n', 'thảo luận',
      'Trong KHTN: Phần phân tích ý nghĩa của kết quả và so sánh với các nghiên cứu khác.', 'In the discussion we explain the pattern.', 'Trong phần thảo luận, chúng em giải thích quy luật.'),
    conclusion: g('conclusion', '/kənˈkluː.ʒən/', 'n', 'kết luận',
      'Trong KHTN: Phần tóm tắt các phát hiện chính của nghiên cứu.', 'The conclusion answers the question.', 'Kết luận trả lời câu hỏi nghiên cứu.'),
    reference: g('reference', '/ˈref.ər.əns/', 'n', 'tài liệu tham khảo',
      'Trong KHTN: Nguồn thông tin được liệt kê ở cuối báo cáo.', 'List every reference at the end.', 'Hãy liệt kê mọi tài liệu tham khảo ở cuối bài.'),
    poster: g('poster', '/ˈpəʊ.stər/', 'n', 'báo cáo treo tường, áp phích',
      'Trong KHTN: Tờ khổ lớn (A0, A1) trình bày kết quả nghiên cứu bằng chữ ngắn, hình và biểu đồ.', 'Our poster is A1 and vertical.', 'Báo cáo treo tường của chúng em khổ A1, đặt dọc.'),
    audience: g('audience', '/ˈɔː.di.əns/', 'n', 'người nghe, khán giả',
      'Trong KHTN: Những người nghe hoặc xem phần thuyết trình.', 'Look at your audience when you speak.', 'Hãy nhìn người nghe khi em nói.')
  });

  const FIG = (art, no, vi, en, wide) => ({ t: 'fig', art, no, vi, en, wide });

  D.lessons['khtn9-bai1'] = {
    gradeId: 9, number: '1', book: 'Khoa học tự nhiên 9',
    title: { vi: 'Nhận biết một số dụng cụ, hoá chất. Thuyết trình một vấn đề khoa học', en: 'Recognising some laboratory equipment and chemicals. Presenting a scientific topic' },
    topic: { label: 'Bài mở đầu', labelEn: 'Opening lesson', number: '', vi: 'Dụng cụ, hoá chất và cách trình bày khoa học', en: 'Equipment, chemicals and scientific presentation' },
    spreadLabels: ['Dụng cụ quang học và điện từ', 'Dụng cụ về chất; hoá chất', 'Viết báo cáo khoa học', 'Thuyết trình và báo cáo treo tường', 'Tổng kết bài'],
    pages: [
      { number: 6, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: { vi: 'Mục tiêu. Sau bài học này em sẽ:', en: 'Aims. After this lesson you will:' }, items: [
          { vi: 'Nhận biết được một số dụng cụ và hoá chất dùng trong dạy học môn Khoa học tự nhiên 9.', en: 'Recognise some {equipment|equipment} and {chemicals|chemical} used when learning Natural Science 9.' },
          { vi: 'Trình bày được các bước viết và trình bày báo cáo; làm được bài thuyết trình một vấn đề khoa học.', en: 'Describe the steps of writing and giving a {report|report}, and make a presentation on a scientific topic.' }
        ] },
        P('Muốn kiểm chứng một dự đoán khoa học, em cần làm thí nghiệm. Làm thế nào để chọn được dụng cụ và hoá chất phù hợp, để thí nghiệm vừa thành công vừa an toàn?',
          'To test a scientific prediction you need an experiment. How do you choose suitable equipment and chemicals so that the experiment works and is safe?', { badge: 'fire' }),
        { t: 'h2', n: 'I', vi: 'Giới thiệu một số dụng cụ và cách sử dụng', en: 'Some equipment and how to use it' },
        P('Dụng cụ cơ bản của KHTN 9 gồm ba nhóm: dụng cụ thí nghiệm quang học, dụng cụ thí nghiệm điện từ, và dụng cụ tìm hiểu về chất và sự biến đổi của chất.',
          'The basic equipment of Natural Science 9 falls into three groups: optics, electromagnetism, and the study of substances and their changes.'),
        { t: 'h3', vi: '1. Một số dụng cụ thí nghiệm quang học', en: '1. Some optics equipment' },
        { t: 'h3', vi: 'a) Nguồn sáng', en: 'a) Light sources' },
        P('Để có một chùm sáng hẹp, được vẽ thành một tia sáng, em có thể dùng đèn dây tóc nối với nguồn 12 V cùng tấm chắn có một hoặc nhiều khe hẹp (Hình 1.1a). Cũng có thể dùng nguồn laser của phòng thí nghiệm (Hình 1.1b), mỗi tia được bật tắt bằng một công tắc riêng.',
          'To get a narrow beam, drawn as a single ray, you can use a filament lamp connected to a 12 V supply with a plate that has one or several {slits|slit} (Figure 1.1a). A laboratory {laser|laser} can also be used (Figure 1.1b), each ray with its own switch.'),
        FIG('khtn1a', '1.1', 'Nguồn sáng: a) đèn dây tóc 12 V và tấm chắn khe; b) nguồn laser', 'Light sources: a) a 12 V lamp with a slit plate; b) a laser source', true),
        { t: 'tip', items: [{ vi: 'Lưu ý an toàn: không để tia laser chiếu vào mắt – của mình hay của bất kì ai.', en: 'Safety: never let a laser ray shine into eyes – yours or anyone else’s.' }] }
      ] },
      { number: 7, blocks: [
        { t: 'h3', vi: 'b) Bản bán trụ và bảng chia độ', en: 'b) Semicircular block and angle scale' },
        P('Bản bán trụ là khối thuỷ tinh trong suốt. Bảng chia độ giúp đọc góc tới, góc phản xạ và góc khúc xạ khi nghiên cứu hiện tượng khúc xạ ánh sáng và phản xạ toàn phần (Hình 1.2).',
          'The {semicircular block|half-cylinder} is a clear glass block. The {angle scale|angle-scale} lets you read the angles of incidence, reflection and refraction when studying refraction and total internal reflection (Figure 1.2).'),
        FIG('khtn1b', '1.2', 'Bản bán trụ đặt trên bảng chia độ', 'A semicircular block on an angle scale', true),
        { t: 'h3', vi: 'c) Bộ dụng cụ tìm hiểu tính chất ảnh qua thấu kính', en: 'c) Equipment for studying images formed by lenses' },
        P('Bộ này gồm thấu kính hội tụ (1), thấu kính phân kì (2), màn chắn (3) và vật sáng tạo bằng cách chiếu đèn (4) qua khe hình chữ F (5). Giá quang học đồng trục (6) giúp dịch chuyển vật, thấu kính và màn dễ dàng (Hình 1.3).',
          'The set has a {converging lens|converging-lens} (1), a {diverging lens|diverging-lens} (2), a {screen|optics-screen} (3) and a luminous object made by shining a lamp (4) through an F-shaped slit (5). A coaxial {optical bench|optical-bench} (6) makes it easy to move the object, lens and screen (Figure 1.3).'),
        FIG('khtn1c', '1.3', 'Bộ dụng cụ tìm hiểu tính chất ảnh qua thấu kính', 'Equipment for studying images formed by lenses', true),
        { t: 'ask', style: 'num', lead: { vi: 'Câu hỏi', en: 'Question' }, items: [
          B('Để tạo tia sáng hoặc chùm sáng hẹp, có thể dùng đèn dây tóc và tấm chắn có khe. Em hãy đề xuất một cách làm khác.', 'A narrow beam can be made with a lamp and a slit plate. Suggest another way.')
        ] }
      ] },
      { number: 8, blocks: [
        { t: 'h3', vi: '2. Một số dụng cụ thí nghiệm điện từ', en: '2. Some electromagnetism equipment' },
        { t: 'h3', vi: 'a) Điện kế', en: 'a) Galvanometer' },
        P('Điện kế dùng để phát hiện dòng điện cảm ứng (Hình 1.4). Khi dòng điện đi vào chốt G₁ (hoặc G₂) và đi ra ở chốt âm (−), kim lệch sang phải; khi dòng đi vào chốt âm và ra ở G₁ (hoặc G₂), kim lệch sang trái.',
          'The {galvanometer|galvanometer} detects an {induced current|induced-current} (Figure 1.4). When current enters terminal G₁ (or G₂) and leaves by the negative (−) terminal, the needle moves right; when current enters the negative terminal and leaves by G₁ (or G₂), it moves left.'),
        FIG('khtn1d', '1.4', 'Điện kế có vạch 0 nằm giữa thang đo', 'A galvanometer with zero in the middle of the scale', true),
        { t: 'ask', style: 'num', items: [B('Quan sát điện kế và giải thích vì sao vạch 0 nằm giữa thang đo.', 'Look at the galvanometer and explain why the zero mark is in the middle of the scale.')] },
        { t: 'h3', vi: 'b) Đồng hồ đo điện đa năng', en: 'b) Multimeter' },
        P('Đồng hồ đo điện đa năng đo được nhiều đại lượng như cường độ dòng điện, hiệu điện thế, điện trở… trong mạch điện một chiều và xoay chiều (Hình 1.5). Trước khi đo, em chọn đúng đại lượng và thang đo bằng núm xoay, rồi cắm que đo vào đúng chốt.',
          'A {multimeter|multimeter} measures quantities such as current, voltage and resistance in direct and alternating circuits (Figure 1.5). Before measuring, choose the right quantity and range with the knob, then plug the probes into the right sockets.'),
        FIG('khtn1e', '1.5', 'Đồng hồ đo điện đa năng', 'A multimeter', true)
,
        { t: 'h3', vi: 'c) Cuộn dây dẫn có hai đèn LED', en: 'c) A coil with two LEDs' },
        P('Hai đầu của cuộn dây dẫn được nối với hai đèn LED mắc song song nhưng ngược cực (Hình 1.6a). Vì mỗi LED chỉ sáng với một chiều dòng điện, nên đèn nào sáng cho biết chiều của dòng điện cảm ứng.',
          'The two ends of a {coil|coil} are connected to two {LEDs|led} in parallel but with opposite polarity (Figure 1.6a). Each LED lights up for only one direction of current, so the LED that lights shows the direction of the induced current.'),
        FIG('khtn1f', '1.6', 'Sơ đồ mắc đèn LED với cuộn dây dẫn (a); cuộn dây dẫn kín có hai đèn LED (b)', 'Wiring of the LEDs to the coil (a); a closed coil with two LEDs (b)', true),
        { t: 'h3', vi: '3. Dụng cụ thí nghiệm tìm hiểu về chất và sự biến đổi của chất', en: '3. Equipment for studying substances and their changes' },
        { t: 'table', head: true, rows: [
          [{ vi: 'Dụng cụ', en: 'Item' }, { vi: 'Công dụng', en: 'Use' }],
          [{ vi: 'Phễu', en: '{Funnel|funnel}' }, { vi: 'Rót chất lỏng vào bình miệng hẹp, hoặc dùng để lọc.', en: 'Pour liquids into narrow-necked vessels, or filter.' }],
          [{ vi: 'Phễu chiết', en: '{Separating funnel|separating-funnel}' }, { vi: 'Tách các chất lỏng không tan vào nhau theo phương pháp chiết.', en: 'Separate immiscible liquids by extraction.' }],
          [{ vi: 'Bình cầu', en: '{Round-bottom flask|round-flask}' }, { vi: 'Đựng chất lỏng, pha chế dung dịch, đun nóng, chưng cất.', en: 'Hold liquids, prepare solutions, heat or distil.' }],
          [{ vi: 'Cốc thuỷ tinh', en: '{Beaker|beaker}' }, { vi: 'Trộn hoặc đun nóng chất; thực hiện một số phản ứng toả nhiệt mạnh.', en: 'Mix or heat substances; carry out strongly exothermic reactions.' }],
          [{ vi: 'Bát sứ', en: '{Evaporating dish|evaporating-dish}' }, { vi: 'Cô cạn dung dịch, đun chất rắn.', en: 'Evaporate solutions; heat solids.' }],
          [{ vi: 'Lưới tản nhiệt', en: '{Wire gauze|wire-gauze}' }, { vi: 'Phân tán nhiệt đều khi đun, giúp dụng cụ thuỷ tinh khỏi vỡ.', en: 'Spread heat evenly when heating so glassware does not crack.' }]
        ] }
      ] },
      { number: 9, blocks: [
        FIG('khtn1g', '1.7–1.10', 'Phễu, phễu chiết, bình cầu, cốc thuỷ tinh, bát sứ và lưới tản nhiệt', 'Funnel, separating funnel, round-bottom flask, beaker, evaporating dish and wire gauze', true),
        { t: 'ask', style: 'num', items: [
          B('Phễu, phễu chiết, bình cầu trong phòng thí nghiệm thường làm bằng vật liệu gì? Cần lưu ý điều gì khi sử dụng chúng?', 'What are funnels, separating funnels and flasks usually made of? What should you remember when using them?'),
          B('Khi đun nóng dung dịch trong cốc thuỷ tinh, vì sao cần dùng lưới tản nhiệt?', 'Why do you need a wire gauze when heating a solution in a beaker?')
        ] },
        { t: 'h3', vi: '4. Dụng cụ dùng để quan sát nhiễm sắc thể', en: '4. Equipment for observing chromosomes' },
        P('Muốn quan sát nhiễm sắc thể (NST), em cần kính hiển vi và các tiêu bản cố định NST (Hình 1.11). Khi quan sát ở độ phóng đại lớn (100×), cần nhỏ dầu soi kính. Dầu trong suốt và có chiết suất cao nên mẫu vật rất nhỏ được nhìn rõ hơn.',
          'To observe {chromosomes|chromosome} you need a {microscope|microscope} and fixed {specimens|specimen} (Figure 1.11). At high magnification (100×) you add {immersion oil|immersion-oil}. The oil is transparent with a high refractive index, so very small objects look clearer.'),
        FIG('khtn1h', '1.11', 'Kính hiển vi và tiêu bản cố định nhiễm sắc thể', 'A microscope and a fixed chromosome slide', true)
      ] },
      { number: 10, blocks: [
        { t: 'h2', n: 'II', vi: 'Một số hoá chất cơ bản trong phòng thí nghiệm', en: 'Some basic laboratory chemicals' },
        P('Phòng thí nghiệm hoá học ở trường phổ thông thường có các nhóm hoá chất sau.', 'A school chemistry laboratory usually holds the following groups of chemicals.'),
        { t: 'table', head: true, rows: [
          [{ vi: 'Nhóm', en: 'Group' }, { vi: 'Ví dụ', en: 'Examples' }],
          [{ vi: 'Kim loại', en: 'Metals' }, { vi: 'Na, Fe, Cu…', en: 'Na, Fe, Cu…' }],
          [{ vi: 'Phi kim', en: 'Non-metals' }, { vi: 'S, I₂…', en: 'S, I₂…' }],
          [{ vi: 'Oxide', en: '{Oxides|oxide}' }, { vi: 'CuO, CaO, MnO₂…', en: 'CuO, CaO, MnO₂…' }],
          [{ vi: 'Acid', en: '{Acids|acid}' }, { vi: 'HCl, H₂SO₄…', en: 'HCl, H₂SO₄…' }],
          [{ vi: 'Base', en: '{Bases|chem-base}' }, { vi: 'NaOH, NH₃…', en: 'NaOH, NH₃…' }],
          [{ vi: 'Chất hữu cơ', en: 'Organic compounds' }, { vi: 'CH₃OH, C₆H₁₂O₆…', en: 'CH₃OH, C₆H₁₂O₆…' }],
          [{ vi: 'Chất chỉ thị', en: '{Indicators|indicator}' }, { vi: 'Giấy pH, phenolphthalein…', en: 'pH paper, phenolphthalein…' }]
        ] },
        { t: 'h3', vi: 'Bảo quản hoá chất', en: 'Storing chemicals' },
        P('Hoá chất được đựng trong chai hoặc lọ có nắp và dán nhãn ghi thông tin. Hoá chất dễ bị ánh sáng phân huỷ, như KMnO₄ và AgNO₃, phải đựng trong lọ tối màu, để chỗ tối hoặc bọc kín giấy đen bên ngoài lọ.',
          'Chemicals are kept in capped bottles with a {label|label} giving their details. Chemicals that light decomposes, such as KMnO₄ and AgNO₃, go in dark bottles in a dark place, or in bottles wrapped in black paper.'),
        { t: 'tip', items: [
          { vi: 'Đọc nhãn trước khi dùng; không tự ý nghiền hoặc trộn các hoá chất với nhau.', en: 'Read the label before use; never grind or mix chemicals on your own.' },
          { vi: 'Hoá chất dễ bay hơi, độc hoặc ăn mòn như H₂SO₄ đặc phải dùng trong tủ hút hoặc nơi thoáng, đeo kính bảo hộ và găng tay.', en: '{Volatile|volatile}, toxic or {corrosive|corrosive} chemicals such as concentrated H₂SO₄ must be used in a fume cupboard or well-ventilated place with {goggles|goggles} and gloves.' }
        ] }
      ] },
      { number: 11, blocks: [
        { t: 'activity', no: 1, title: { vi: 'Sử dụng hoá chất và dụng cụ trong phòng thí nghiệm', en: 'Using chemicals and equipment in the laboratory' },
          vi: 'Em hãy đề xuất dụng cụ, hoá chất và thực hiện một thí nghiệm chứng minh tính chất hoá học chung của acid hoặc base (gợi ý: dùng giấy quỳ hoặc phenolphthalein).',
          en: 'Propose the equipment and chemicals, and carry out an experiment to show a general chemical property of an acid or a base (hint: use litmus paper or phenolphthalein).', items: [], style: 'plain' },
        { t: 'ask', style: 'num', lead: { vi: 'Câu hỏi', en: 'Questions' }, items: [
          B('Khi lấy hoá chất rắn hoặc lỏng, cần lưu ý gì để hoá chất giữ được độ tinh khiết và bảo quản được lâu?', 'What should you take care of when taking solid or liquid chemicals so that they stay pure and keep well?'),
          B('Vì sao phải đọc kĩ nhãn hoá chất trước khi dùng?', 'Why must you read the label carefully before using a chemical?'),
          B('Vì sao không được tự ý nghiền, trộn các hoá chất?', 'Why must you never grind or mix chemicals on your own?'),
          B('Cần lưu ý gì khi dùng hoá chất dễ bay hơi, độc hại, nguy hiểm (như H₂SO₄ đặc)?', 'What should you remember when using volatile, toxic or hazardous chemicals (such as concentrated H₂SO₄)?')
        ] },
        { t: 'h2', n: 'III', vi: 'Viết và trình bày báo cáo một vấn đề khoa học', en: 'Writing and presenting a scientific report' },
        P('Kết quả nghiên cứu được viết thành báo cáo theo cách thức chung để người đọc dễ tra cứu, tìm hiểu và sử dụng. Một báo cáo khoa học thường có các phần sau.',
          'Research findings are written as a {report|report} in a common format so that readers can look things up, understand and use them. A scientific report usually has these parts.'),
        { t: 'olist', style: 'num', items: [
          B('Tiêu đề: chính xác, mô tả rõ nội dung của báo cáo.', 'Title: accurate and clear about what the report covers.'),
          B('Tóm tắt: một đoạn ngắn gồm mục tiêu, phương pháp, kết quả, kết luận.', '{Abstract|abstract}: one short paragraph with the aim, method, results and conclusion.'),
          B('Giới thiệu: nêu vấn đề nghiên cứu, tầm quan trọng và mục tiêu.', '{Introduction|introduction}: the problem, why it matters and the aim.'),
          B('Phương pháp: cách làm thí nghiệm hoặc thu thập, xử lí số liệu; liệt kê vật liệu, hoá chất, dụng cụ.', '{Method|methods}: how the experiment or data collection and processing were done; the materials, chemicals and equipment.'),
          B('Kết quả: trình bày số liệu rõ ràng bằng bảng, biểu đồ, hình ảnh.', '{Results|results}: data shown clearly in tables, charts or pictures.'),
          B('Thảo luận: phân tích ý nghĩa kết quả, so sánh với nghiên cứu khác (nếu có).', '{Discussion|discussion}: what the results mean, compared with other studies (if any).'),
          B('Kết luận: tóm tắt phát hiện chính và gợi ý cho nghiên cứu sau.', '{Conclusion|conclusion}: the main findings and suggestions for later work.'),
          B('Tài liệu tham khảo: liệt kê mọi nguồn thông tin đã dùng.', '{References|reference}: every source of information you used.')
        ] }
      ] },
      { number: 12, blocks: [
        { t: 'h3', vi: 'Ví dụ: khung báo cáo khảo sát thói quen đọc sách của học sinh lớp 9', en: 'Example: outline of a report on the reading habits of Grade 9 students' },
        P('Ví dụ dưới đây do nhóm dự án soạn để minh hoạ cấu trúc; số liệu chỉ là giả định.', 'This example was written by the project team to illustrate the structure; the numbers are invented.'),
        { t: 'table', head: true, rows: [
          [{ vi: 'Phần', en: 'Part' }, { vi: 'Nội dung ví dụ', en: 'Example content' }],
          [{ vi: 'Tiêu đề', en: 'Title' }, { vi: 'Khảo sát thời gian đọc sách ngoài giờ học của học sinh lớp 9 tại trường X', en: 'A survey of out-of-class reading time among Grade 9 students at school X' }],
          [{ vi: 'Tóm tắt', en: 'Abstract' }, { vi: 'Khảo sát 40 học sinh bằng phiếu hỏi; học sinh đọc trung bình 3 giờ mỗi tuần.', en: '40 students answered a questionnaire; they read 3 hours a week on average.' }],
          [{ vi: 'Giới thiệu', en: 'Introduction' }, { vi: 'Đọc sách giúp mở rộng vốn từ; mục tiêu là biết thực trạng và nguyên nhân ít đọc.', en: 'Reading builds vocabulary; the aim is to learn the current situation and reasons for reading less.' }],
          [{ vi: 'Phương pháp', en: 'Method' }, { vi: 'Phiếu hỏi 8 câu, chọn ngẫu nhiên 40 học sinh, tính trung bình bằng bảng tính.', en: 'An 8-question form, 40 random students, averages computed in a spreadsheet.' }],
          [{ vi: 'Kết quả', en: 'Results' }, { vi: 'Bảng số giờ đọc theo tuần; biểu đồ cột so sánh nam và nữ.', en: 'A table of weekly hours; a bar chart comparing boys and girls.' }],
          [{ vi: 'Thảo luận', en: 'Discussion' }, { vi: 'Giải thích vì sao thời gian đọc giảm vào tuần thi; so sánh với số liệu của lớp khác.', en: 'Explain why reading time drops in exam weeks; compare with another class.' }],
          [{ vi: 'Kết luận', en: 'Conclusion' }, { vi: 'Thời gian đọc còn ít; đề xuất giờ đọc chung ở thư viện.', en: 'Reading time is low; propose a shared library reading hour.' }],
          [{ vi: 'Tài liệu tham khảo', en: 'References' }, { vi: 'Ghi tác giả, năm, tên tài liệu, nơi đăng.', en: 'Author, year, title and where it was published.' }]
        ] },
        { t: 'ask', style: 'num', lead: { vi: 'Luyện tập', en: 'Practice' }, items: [
          B('So sánh cấu trúc của báo cáo khoa học với các bài báo cáo thực hành, báo cáo thí nghiệm hoặc điều tra mà em đã làm.', 'Compare the structure of a scientific report with the practical, experiment or survey reports you have written.'),
          B('Chọn một hoạt động nghiên cứu hoặc thực hành và viết báo cáo cho hoạt động đó.', 'Choose a research or practical activity and write a report on it.')
        ] }
      ] },
      { number: 13, blocks: [
        { t: 'h2', n: 'IV', vi: 'Bài thuyết trình một vấn đề khoa học', en: 'A presentation on a scientific topic' },
        P('Bài thuyết trình là phiên bản cô đọng, trực quan của bản báo cáo. Em có thể thuyết trình trên phần mềm trình chiếu hoặc trên báo cáo treo tường.',
          'A presentation is a condensed, visual version of the report. You can present with slide software or on a wall poster.'),
        { t: 'h3', vi: '1. Thuyết trình trên phần mềm trình chiếu', en: '1. Presenting with slide software' },
        P('Cấu trúc bài trình chiếu bám sát cấu trúc báo cáo (Hình 1.12):', 'The slides follow the structure of the report (Figure 1.12):'),
        { t: 'olist', style: 'num', items: [
          B('Trang tiêu đề: tiêu đề báo cáo và tên tác giả.', 'Title slide: the report title and the authors.'),
          B('Trang giới thiệu: vấn đề và mục tiêu.', 'Introduction slide: the problem and the aim.'),
          B('Trang phương pháp: cách làm, vật liệu, hoá chất, dụng cụ.', 'Method slide: how it was done; materials, chemicals, equipment.'),
          B('Trang kết quả: dùng biểu đồ, hình ảnh, bảng.', 'Results slide: charts, pictures, tables.'),
          B('Trang thảo luận: phân tích kết quả, so sánh nghiên cứu khác.', 'Discussion slide: analyse results and compare with other studies.'),
          B('Trang kết luận: những phát hiện chính.', 'Conclusion slide: the main findings.'),
          B('Trang câu hỏi: câu hỏi của người nghe và câu trả lời.', 'Question slide: questions from the {audience|audience} and the answers.')
        ] },
        FIG('khtn1i', '1.12', 'Bố cục một bài trình chiếu về một vấn đề khoa học', 'Layout of a slide presentation on a scientific topic', true)
      ] },
      { number: 14, blocks: [
        { t: 'tip', items: [{ vi: 'Khi thuyết trình: dùng ngôn ngữ đơn giản, rõ ràng; tập trung vào thông điệp chính; nhìn và tương tác với người nghe.', en: 'When presenting: use simple, clear language; focus on the main message; look at and interact with the audience.' }] },
        { t: 'h3', vi: '2. Báo cáo treo tường', en: '2. A wall poster' },
        P('Báo cáo treo tường (poster) là hình thức trình bày kết quả nghiên cứu trên một tờ khổ lớn. Em xây dựng nó theo các bước sau.',
          'A wall {poster|poster} presents research results on one large sheet. Build it in these steps.'),
        { t: 'olist', style: 'num', items: [
          B('Khổ giấy và hướng: thường là A0 hoặc A1; đặt dọc hoặc ngang tuỳ nội dung.', 'Size and direction: usually A0 or A1; portrait or landscape depending on the content.'),
          B('Tiêu đề và tác giả: tiêu đề đọc được từ xa; tên tác giả viết dưới tiêu đề.', 'Title and authors: a title readable from a distance; author names below it.'),
          B('Chia khu vực rõ ràng: giới thiệu, phương pháp, kết quả, thảo luận, kết luận; dùng hình, biểu đồ, đồ thị.', 'Clear zones: introduction, method, results, discussion, conclusion; use pictures, charts and graphs.'),
          B('Màu sắc: nền không quá rực, chữ và nền đối lập rõ; phông chữ đơn giản, cỡ chữ phù hợp.', 'Colour: a calm background with strong contrast to the text; a simple font and a suitable size.')
        ] },
        FIG('khtn1j', '1.13', 'Bố cục một báo cáo treo tường khổ lớn', 'Layout of a large wall poster', true)
,
        { t: 'head', kind: 'practice', vi: 'Luyện tập và vận dụng', en: 'Practice and apply' },
        { t: 'ex', kind: 'practice', no: 1, body: [
          P('Xây dựng bản trình chiếu trên phần mềm để thuyết trình kết quả nghiên cứu hoặc thực hành của em.', 'Build a slide deck to present the results of your own research or practical work.')
        ], solution: [P('Gợi ý: 7 trang theo Hình 1.12, mỗi trang không quá 30–40 chữ, ưu tiên hình và biểu đồ.', 'Hint: 7 slides as in Figure 1.12, no more than about 30–40 words each, with a preference for pictures and charts.')] },
        { t: 'ex', kind: 'apply', no: 1, body: [
          P('Trình bày báo cáo với các bạn trong lớp về một vấn đề khoa học em đã chọn, trong 5 phút, rồi trả lời hai câu hỏi của bạn.', 'Present a scientific topic of your choice to your class in 5 minutes, then answer two questions from classmates.')
        ] },
        { t: 'quiz', title: { vi: 'Tự kiểm tra', en: 'Self-check' }, items: [
          Q('q1', 'Dụng cụ nào dùng để phát hiện dòng điện cảm ứng và cho biết chiều của nó?', 'Which instrument detects an induced current and shows its direction?', [['Điện kế', 'Galvanometer'], ['Thước kẹp', 'Vernier calliper'], ['Phễu chiết', 'Separating funnel'], ['Kính lúp', 'Magnifying glass']], 0, 'Điện kế có vạch 0 ở giữa nên kim lệch phải hoặc trái theo chiều dòng điện.', 'The galvanometer has zero in the middle so the needle moves right or left with the direction of current.'),
          Q('q2', 'Vì sao hai đèn LED trên cuộn dây phải mắc ngược cực?', 'Why are the two LEDs on the coil connected with opposite polarity?', [['Để đèn sáng hơn', 'To make them brighter'], ['Để mỗi đèn sáng ứng với một chiều dòng điện', 'So each lights for one direction of current'], ['Để tiết kiệm dây', 'To save wire'], ['Để cuộn dây nóng lên', 'To heat the coil']], 1, 'LED chỉ sáng khi dòng đi vào đúng cực.', 'An LED lights only if current enters the correct terminal.'),
          Q('q3', 'Dụng cụ nào dùng để tách hai chất lỏng không tan vào nhau?', 'Which item separates two immiscible liquids?', [['Bát sứ', 'Evaporating dish'], ['Phễu chiết', 'Separating funnel'], ['Lưới tản nhiệt', 'Wire gauze'], ['Bình cầu', 'Round-bottom flask']], 1, 'Phễu chiết dùng cho phương pháp chiết.', 'The separating funnel is used for extraction.'),
          Q('q4', 'Khi đun cốc thuỷ tinh trên ngọn lửa đèn cồn, nên đặt:', 'When heating a beaker over a flame, you should put:', [['Lưới tản nhiệt dưới cốc', 'A wire gauze under the beaker'], ['Cốc trực tiếp lên lửa', 'The beaker straight on the flame'], ['Giấy dưới cốc', 'Paper under the beaker'], ['Nước dưới cốc', 'Water under the beaker']], 0, 'Lưới phân tán nhiệt, tránh cốc bị vỡ.', 'The gauze spreads the heat and prevents cracking.'),
          Q('q5', 'Vì sao nhỏ dầu soi kính khi quan sát ở vật kính 100×?', 'Why add immersion oil with the 100× objective?', [['Để làm sạch kính', 'To clean the glass'], ['Dầu trong suốt, chiết suất cao nên ảnh rõ hơn', 'The oil is clear with a high refractive index, so the image is sharper'], ['Để tiêu bản chắc hơn', 'To make the slide stronger'], ['Để tiêu bản nóng lên', 'To warm the slide']], 1, 'Dầu giúp nhìn rõ mẫu vật rất nhỏ.', 'The oil helps you see very small objects.'),
          Q('q6', 'KMnO₄ và AgNO₃ nên được bảo quản như thế nào?', 'How should KMnO₄ and AgNO₃ be stored?', [['Lọ trong suốt đặt ngoài nắng', 'In clear bottles in sunlight'], ['Lọ tối màu, để chỗ tối', 'In dark bottles in a dark place'], ['Không cần nắp', 'With no lid'], ['Trộn chung', 'Mixed together']], 1, 'Hai chất này dễ bị ánh sáng phân huỷ.', 'Light decomposes both compounds.'),
          Q('q7', 'Hoá chất nào thuộc nhóm base?', 'Which chemical is a base?', [['HCl', 'HCl'], ['NaOH', 'NaOH'], ['CuO', 'CuO'], ['H₂SO₄', 'H₂SO₄']], 1, 'NaOH là base; HCl, H₂SO₄ là acid; CuO là oxide.', 'NaOH is a base; HCl and H₂SO₄ are acids; CuO is an oxide.'),
          Q('q8', 'Phần nào của báo cáo là đoạn ngắn tóm lược mục tiêu, phương pháp, kết quả và kết luận?', 'Which part of a report briefly sums up the aim, method, results and conclusion?', [['Giới thiệu', 'Introduction'], ['Tóm tắt', 'Abstract'], ['Thảo luận', 'Discussion'], ['Tài liệu tham khảo', 'References']], 1, 'Tóm tắt nằm ngay sau tiêu đề.', 'The abstract comes right after the title.'),
          Q('q9', 'Phần nào liệt kê vật liệu, hoá chất, dụng cụ đã dùng?', 'Which part lists the materials, chemicals and equipment used?', [['Kết quả', 'Results'], ['Kết luận', 'Conclusion'], ['Phương pháp', 'Method'], ['Giới thiệu', 'Introduction']], 2, 'Phương pháp mô tả cách làm và vật dụng.', 'The method describes how and with what.'),
          Q('q10', 'Điều nào KHÔNG phù hợp với báo cáo treo tường?', 'Which is NOT suitable for a wall poster?', [['Tiêu đề đọc được từ xa', 'A title readable from afar'], ['Nhiều hình và biểu đồ', 'Many pictures and charts'], ['Màu nền rực làm khó đọc chữ', 'A bright background that makes text hard to read'], ['Chia khu vực rõ ràng', 'Clear zones']], 2, 'Chữ và nền cần tương phản rõ.', 'Text and background need strong contrast.')
        ] },
        { t: 'key', title: { vi: 'Em đã học', en: 'What you have learned' }, blocks: [
          { t: 'list', items: [
            { vi: 'Nhận biết và biết cách dùng dụng cụ quang học, điện từ, dụng cụ về chất và kính hiển vi.', en: 'Recognise and use optics, electromagnetism, chemistry equipment and the microscope.' },
            { vi: 'Biết các nhóm hoá chất cơ bản và quy tắc bảo quản, sử dụng an toàn.', en: 'Know the basic groups of chemicals and the rules for safe storage and use.' },
            { vi: 'Báo cáo khoa học gồm 8 phần; bài thuyết trình bám theo cấu trúc đó.', en: 'A scientific report has 8 parts; a presentation follows that structure.' }
          ] }
        ] },
        { t: 'key', title: { vi: 'Em có thể', en: 'You can' }, blocks: [
          { t: 'list', items: [
            { vi: 'Chọn dụng cụ, hoá chất phù hợp và làm thí nghiệm an toàn.', en: 'Choose suitable equipment and chemicals and experiment safely.' },
            { vi: 'Viết báo cáo, làm bản trình chiếu hoặc poster về một vấn đề khoa học.', en: 'Write a report and make slides or a poster on a scientific topic.' }
          ] }
        ] },
        { t: 'key', title: { vi: 'Em có biết', en: 'Did you know?' }, blocks: [
          P('Laser có thể gây tổn thương mắt ngay cả khi tia sáng rất yếu, vì thấu kính của mắt hội tụ chùm hẹp lên một điểm nhỏ ở võng mạc. Vì vậy phòng thí nghiệm luôn dặn: không nhìn thẳng vào tia laser.', 'A laser can damage the eye even when it is weak, because the eye’s lens focuses a narrow beam on a tiny spot on the retina. That is why labs always say: never look straight into a laser beam.')
        ] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          { vi: 'Dụng cụ cơ bản gồm nhóm quang học, điện từ và nhóm tìm hiểu chất; mỗi dụng cụ có công dụng và cách dùng riêng.', en: 'Basic equipment includes optics, electromagnetism and substance studies; each item has its own use.' },
          { vi: 'Hoá chất phải có nhãn, bảo quản đúng cách; đọc nhãn, không tự ý trộn, dùng bảo hộ với chất nguy hiểm.', en: 'Chemicals need labels and proper storage; read labels, never mix them yourself, use protection with hazardous ones.' },
          { vi: 'Báo cáo khoa học: tiêu đề, tóm tắt, giới thiệu, phương pháp, kết quả, thảo luận, kết luận, tài liệu tham khảo; thuyết trình bằng trình chiếu hoặc poster.', en: 'A report: title, abstract, introduction, method, results, discussion, conclusion, references; presented with slides or a poster.' }
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.',
          keys: ['laboratory', 'apparatus', 'equipment', 'chemical', 'reagent', 'light-source', 'ray', 'beam', 'laser', 'slit', 'half-cylinder', 'angle-scale', 'lens', 'converging-lens', 'diverging-lens', 'optics-screen', 'optical-bench', 'galvanometer', 'multimeter', 'induced-current', 'coil', 'led', 'funnel', 'separating-funnel', 'round-flask', 'beaker', 'evaporating-dish', 'wire-gauze', 'microscope', 'chromosome', 'specimen', 'immersion-oil', 'acid', 'chem-base', 'oxide', 'indicator', 'hazardous', 'corrosive', 'volatile', 'label', 'goggles', 'report', 'abstract', 'introduction', 'methods', 'results', 'discussion', 'conclusion', 'reference', 'poster', 'audience'] }
      ] }
    ]
  };
})();
