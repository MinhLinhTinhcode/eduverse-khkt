/* ==========================================================================
   TIN HỌC 9 — CHỦ ĐỀ 4. ỨNG DỤNG TIN HỌC
     'tin9-bai5'  Bài 5. Tìm hiểu phần mềm mô phỏng (tr. 20–22)
   Trang 23 là phần mở rộng. Lời văn được biên soạn lại, không chép nguyên văn.
   ========================================================================== */
(function () {
  'use strict';
  const D = (window.TEXTBOOK = window.TEXTBOOK || {});
  D.lessons = D.lessons || {};
  D.glossary = D.glossary || {};
  const g = (word, ipa, pos, vi, ctx, en, viEx) => ({ word, ipa, pos, vi, ctx, ex: { en, vi: viEx } });

  Object.assign(D.glossary, {
    simulation: g('simulation', '/ˌsɪm.jəˈleɪ.ʃən/', 'n', 'sự mô phỏng',
      'Cách dùng máy tính để thể hiện trực quan hoạt động của một đối tượng hay hiện tượng.',
      'A simulation lets you watch an electric circuit work.', 'Mô phỏng cho phép em quan sát mạch điện hoạt động.'),
    'simulation-software': g('simulation software', '/ˌsɪm.jəˈleɪ.ʃən ˈsɒft.weər/', 'n', 'phần mềm mô phỏng',
      'Phần mềm thể hiện trực quan sự vận động của một đối tượng, cho phép người dùng tương tác và tìm hiểu cách đối tượng hoạt động.',
      'Simulation software lets you test ideas safely.', 'Phần mềm mô phỏng cho phép em thử ý tưởng một cách an toàn.'),
    simulate: g('simulate', '/ˈsɪm.jə.leɪt/', 'v', 'mô phỏng',
      'Tạo ra mô hình trên máy tính bắt chước hoạt động của sự vật thật.',
      'This program simulates a chemistry experiment.', 'Chương trình này mô phỏng một thí nghiệm hoá học.'),
    'virtual-experiment': g('virtual experiment', '/ˈvɜː.tʃu.əl ɪkˈsper.ɪ.mənt/', 'n', 'thí nghiệm ảo',
      'Thí nghiệm thực hiện trên máy tính bằng phần mềm mô phỏng.',
      'A virtual experiment costs nothing and is safe.', 'Thí nghiệm ảo không tốn kém và an toàn.'),
    interact: g('interact', '/ˌɪn.təˈrækt/', 'v', 'tương tác',
      'Tác động qua lại giữa người dùng và phần mềm, ví dụ chọn và thay đổi tỉ lệ các màu.',
      'You can interact with the software by changing the ratios.', 'Em có thể tương tác với phần mềm bằng cách đổi tỉ lệ.'),
    colour: g('colour mixing', '/ˈkʌl.ə ˈmɪk.sɪŋ/', 'n', 'pha màu',
      'Trộn các màu cơ bản theo tỉ lệ để tạo màu mới.',
      'Colour mixing needs a lot of practice.', 'Pha màu cần nhiều luyện tập.'),
    'colour-system': g('colour system', '/ˈkʌl.ə ˈsɪs.təm/', 'n', 'hệ màu',
      'Tập các màu cơ bản và cách kết hợp chúng, như RGB, CMYK, RYB.',
      'RGB and CMYK are different colour systems.', 'RGB và CMYK là các hệ màu khác nhau.'),
    experiment: g('experiment', '/ɪkˈsper.ɪ.mənt/', 'n', 'thí nghiệm',
      'Việc làm thử để quan sát và tìm hiểu một hiện tượng.',
      'A physics experiment can be simulated.', 'Thí nghiệm vật lí có thể được mô phỏng.'),
    flowchart: g('flowchart', '/ˈfləʊ.tʃɑːt/', 'n', 'sơ đồ khối',
      'Sơ đồ mô tả thuật toán bằng các khối và mũi tên.',
      'Flowgorithm runs an algorithm drawn as a flowchart.', 'Flowgorithm chạy thuật toán vẽ dưới dạng sơ đồ khối.'),
    algorithm: g('algorithm', '/ˈæl.ɡə.rɪ.ðəm/', 'n', 'thuật toán',
      'Dãy hữu hạn các bước chỉ dẫn máy tính thực hiện để giải quyết một vấn đề.',
      'An algorithm can be tested before it is coded.', 'Thuật toán có thể được chạy thử trước khi viết mã.'),
    'low-cost': g('low-cost', '/ləʊ kɒst/', 'adj', 'chi phí thấp',
      'Tốn ít tiền, vật liệu và thời gian.',
      'Simulation is a low-cost way to study an object.', 'Mô phỏng là cách tìm hiểu đối tượng với chi phí thấp.')
  });

  D.lessons['tin9-bai5'] = {
    gradeId: 9, number: '5', book: 'Tin học 9',
    title: { vi: 'Tìm hiểu phần mềm mô phỏng', en: 'Exploring simulation software' },
    topic: { number: '4', vi: 'Ứng dụng tin học', en: 'Applied informatics' },
    spreadLabels: ['Phần mềm mô phỏng và ví dụ', 'Lợi ích; luyện tập; tự kiểm tra'],
    pages: [
      { number: 20, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: { vi: 'Sau bài học này em sẽ:', en: 'After this lesson you will:' }, items: [
          { vi: 'Nêu được ví dụ phần mềm mô phỏng. Nhận ra được ích lợi của phần mềm mô phỏng.', en: 'Give examples of {simulation software|simulation-software} and see its benefits.' }
        ] },
        { t: 'talk', lines: [
          { who: 'Minh', vi: 'Pha màu để vẽ tưởng là đơn giản nhưng rất phức tạp. Tớ pha màu nhiều lần mà chưa tạo ra được màu cánh sen ưng ý.', en: 'Mixing paint colours looks simple but is really hard. I have tried many times and still cannot make the lotus-petal colour I want.' },
          { who: 'An', vi: 'Đúng là pha màu cần nhiều kinh nghiệm. Bạn sẽ phải tốn nhiều thời gian và màu vẽ đấy.', en: 'Right, {colour mixing|colour} takes a lot of experience. You will spend a lot of time and paint.' },
          { who: 'Minh', vi: 'Tớ đã trộn nhiều màu đến mức, màu trở nên xỉn đục và không dùng được nữa.', en: 'I mixed so many colours that the paint turned dull and muddy and could not be used again.' },
          { who: 'An', vi: 'Theo tớ, để tập pha màu mà tiết kiệm được thời gian và màu vẽ thì bạn nên sử dụng phần mềm mô phỏng trước khi thực hành pha màu.', en: 'I think that to practise mixing and save time and paint, you should use {simulation software|simulation-software} before you mix real colours.' }
        ] },
        { t: 'h2', n: '1', vi: 'Phần mềm mô phỏng', en: 'Simulation software' },
        { t: 'activity', no: 1, title: { vi: 'Pha màu', en: 'Mixing colours' },
          vi: 'Trong thực tế, khi pha màu, em chỉ có thể thay đổi tỉ lệ (giữa các màu) trong hỗn hợp màu đã pha bằng cách trộn thêm màu. Việc bổ sung nhiều màu có thể dẫn đến hỗn hợp màu xỉn đục và không dùng được nữa. Điều đó xảy ra nhiều lần, khiến em mất nhiều thời gian và giảm hứng thú đối với việc pha màu. Phần mềm mô phỏng pha màu (Hình 5.1) cho phép em chọn màu, tăng giảm tỉ lệ các màu và giúp em nhìn thấy màu kết quả được tạo ra trên màn hình. Em hãy cho biết việc sử dụng phần mềm mô phỏng pha màu để tập pha màu và tìm hiểu về màu sắc có những lợi ích gì?',
          en: 'In real life, when you mix colours you can only change the ratio of the colours in a mixture by adding more paint, and adding too many can make the mixture dull and unusable. This happens often, wasting your time and reducing your interest. A colour-mixing {simulation|simulation} (Figure 5.1) lets you choose colours, raise or lower their ratios, and see the result on the screen. What are the benefits of using colour-mixing simulation software to practise mixing and to learn about colour?',
          art: 'mix51', figNo: '5.1', figVi: 'Phần mềm mô phỏng pha màu', figEn: 'A colour-mixing simulator' },
        { t: 'p', badge: 'book', vi: 'Em có thể tìm thấy những phần mềm pha màu trên Internet bằng từ khoá “mixing colors simulator”. Em có thể tương tác với phần mềm bằng cách chọn và thay đổi tỉ lệ của các màu đã cho và quan sát màu kết quả. Việc tạo ra màu mới một cách dễ dàng giúp em tiết kiệm vật liệu, thời gian, qua đó hứng thú đối với việc tạo ra những màu mới và tìm hiểu về những hệ màu khác nhau. Tuy không phải màu vẽ thật nhưng màu và cách tạo màu trong phần mềm có thể giúp em hình dung ra sự kết hợp của các màu và tập pha màu một cách hiệu quả.', en: 'You can find colour-mixing programs on the {internet} with the keywords “mixing colors simulator”. You {interact} with the software by choosing and changing the ratios of the given colours and watching the resulting colour. Making new colours easily saves materials and time, so you become more interested in creating new colours and in learning about different {colour systems|colour-system}. It is not real paint, but the colours and the way they are made can help you picture how colours combine and practise mixing effectively.' }
      ] },

      { number: 21, blocks: [
        { t: 'p', vi: 'Phần mềm mô phỏng là phương tiện giúp em quan sát và hình dung ra những hiện tượng khó hoặc không thể trải nghiệm trong thực tế, giúp em giải quyết nhiều vấn đề trong học tập, ví dụ như:', en: '{Simulation software|simulation-software} helps you observe and picture phenomena that are hard or impossible to experience in real life, and helps you solve many learning problems, for example:' },
        { t: 'list', items: [
          { vi: 'Phần mềm Crocodile Physics hay phần mềm trực tuyến phet.colorado.edu mô phỏng nhiều thí nghiệm vật lí (Hình 5.2).', en: 'Crocodile Physics, or the online software at phet.colorado.edu, {simulates|simulate} many physics {experiments|experiment} (Figure 5.2).' },
          { vi: 'Phần mềm Crocodile Chemistry hay ChemLab mô phỏng thí nghiệm hoá học.', en: 'Crocodile Chemistry or ChemLab simulates chemistry experiments.' },
          { vi: 'Những phần mềm như GeoGebra, Cabri II plus, Cabri 3D, Geometer’s Sketchpad,… giúp em vẽ các hình hình học và giải toán.', en: 'Programs such as GeoGebra, Cabri II Plus, Cabri 3D and Geometer’s Sketchpad help you draw geometric figures and solve maths problems.' },
          { vi: 'Phần mềm Flowgorithm cho phép em chạy thử thuật toán dạng sơ đồ khối trước khi cài đặt trong một ngôn ngữ lập trình.', en: 'Flowgorithm lets you run an {algorithm} drawn as a {flowchart} before you code it in a programming language.' }
        ] },
        { t: 'p', vi: 'Bên cạnh đó, phần mềm mô phỏng còn có thể được sử dụng trong nhiều lĩnh vực khác, chẳng hạn:', en: 'Simulation software can also be used in many other fields, for example:' },
        { t: 'list', items: [
          { vi: 'Nghiên cứu chuyển động và tương tác giữa các phân tử trong những điều kiện khác nhau (physics.weber.edu/schroeder/md).', en: 'Studying the motion of molecules and how they interact under different conditions (physics.weber.edu/schroeder/md).' },
          { vi: 'Nghiên cứu và xây dựng các giải pháp giao thông nhằm giảm bớt hiện tượng tắc nghẽn giao thông trong các thành phố (traffic-simulation.de).', en: 'Studying and designing traffic solutions to reduce congestion in cities (traffic-simulation.de).' }
        ] },
        { t: 'fig', art: 'circuit52', no: '5.2', vi: 'Thí nghiệm ảo lắp ráp mạch điện đơn giản trên trang phet.colorado.edu', en: 'A virtual experiment assembling a simple circuit at phet.colorado.edu', wide: true },
        { t: 'tip', items: [{ vi: 'Phần mềm mô phỏng thể hiện trực quan sự vận động của một đối tượng, cho phép người dùng tương tác và tìm hiểu cách thức hoạt động của đối tượng đó.', en: '{Simulation software|simulation-software} shows the motion of an object visually, and lets users {interact} with it and find out how it works.' }], plain: true },
        { t: 'p', plain: true, vi: 'Em hãy kể tên một phần mềm mô phỏng mà em biết. Phần mềm đó mô phỏng hoạt động của đối tượng nào?', en: 'Name a simulation program you know. Which object’s behaviour does it simulate?' },
        { t: 'h2', n: '2', vi: 'Lợi ích của phần mềm mô phỏng', en: 'Benefits of simulation software' },
        { t: 'activity', no: 2, title: { vi: 'Lợi ích của phần mềm mô phỏng', en: 'Benefits of simulation software' },
          vi: 'Phần mềm mô phỏng pha màu có những lợi ích gì trong việc tìm hiểu và tập pha trộn màu theo cách thông thường?',
          en: 'What benefits does colour-mixing simulation software have for learning and practising colour mixing compared with the usual way?' },
        { t: 'p', badge: 'book', vi: 'Phần mềm mô phỏng pha màu giúp em học cách tạo ra màu mới từ những màu đã cho mà vẫn tiết kiệm được thời gian và vật liệu. Ngoài ra, bằng cách thay đổi các lựa chọn của phần mềm, em có thể tìm hiểu được những hệ màu cơ bản khác nhau như RGB (đỏ, lục, lam), CMYK (xanh lơ, hồng sẫm, vàng, đen) hay RYB (đỏ, vàng, lam).', en: 'Colour-mixing simulation shows you how to make new colours from given ones while saving time and materials. By changing the software’s options you can also explore basic {colour systems|colour-system} such as RGB (red, green, blue), CMYK (cyan, magenta, yellow, black) and RYB (red, yellow, blue).' }
      ] },

      { number: 22, blocks: [
        { t: 'p', vi: 'Phần mềm mô phỏng có những lợi ích như:', en: 'Simulation software has benefits such as:' },
        { t: 'list', items: [
          { vi: 'Giúp người sử dụng làm quen, tìm hiểu, nghiên cứu hoạt động của một đối tượng, sự vật với chi phí thấp.', en: 'It helps users get familiar with, study and research how an object works at {low cost|low-cost}.' },
          { vi: 'Giúp người sử dụng nghiên cứu những nội dung lí thuyết một cách trực quan, sinh động bằng cách tương tác với phần mềm.', en: 'It helps users study theory in a visual and lively way by {interacting|interact} with the software.' },
          { vi: 'Tạo ra nhiều tình huống để luyện tập hoặc nghiên cứu đối tượng một cách đầy đủ hơn.', en: 'It creates many situations for practice or for studying the object more fully.' },
          { vi: 'Hạn chế những tình huống có thể làm hỏng thiết bị hoặc gây nguy hiểm cho con người.', en: 'It avoids situations that could damage equipment or endanger people.' }
        ] },
        { t: 'p', vi: 'Tuy nhiên, các phần mềm mô phỏng có chất lượng khác nhau. Em cần lưu ý sử dụng các phần mềm có chất lượng cao và không vi phạm bản quyền.', en: 'However, simulation programs differ in quality. Use high-quality software that does not infringe {copyright}.' },
        { t: 'tip', items: [{ vi: 'Lợi ích của phần mềm mô phỏng là hỗ trợ nghiên cứu đối tượng một cách toàn diện, sinh động và an toàn với chi phí thấp hơn nghiên cứu trực tiếp trong thực tế.', en: 'The benefit of simulation software is that it supports studying an object in a complete, lively and safe way at a lower cost than studying it directly in reality.' }], plain: true },
        { t: 'p', plain: true, vi: 'Em hãy cho biết lợi ích của phần mềm mô phỏng mà em đã kể tên ở phần Câu hỏi của Mục 1.', en: 'State the benefits of the simulation software you named in the question of Section 1.' },
        { t: 'head', kind: 'practice', vi: 'Luyện tập', en: 'Practice' },
        { t: 'ask', style: 'alpha', lead: { vi: 'Em hãy tìm một phần mềm mô phỏng hỗ trợ học tập và trả lời các câu hỏi sau:', en: 'Find a simulation program that supports learning and answer:' }, items: [
          { vi: 'Phần mềm đó mô phỏng hoạt động nào?', en: 'Which activity does it simulate?' },
          { vi: 'Phần mềm đó giúp em làm gì?', en: 'What does it help you do?' },
          { vi: 'Phần mềm đó có những lợi ích gì?', en: 'What benefits does it have?' }
        ] },
        { t: 'head', kind: 'apply', vi: 'Vận dụng', en: 'Apply' },
        { t: 'ask', style: 'alpha', lead: { vi: 'Em hãy tìm kiếm trên Internet một phần mềm mô phỏng pha màu để tìm hiểu hệ màu CMYK và cho biết các màu đỏ (Red), lục (Green) và lam (Blue) lần lượt được tạo ra từ những màu nào trong ba màu cơ bản xanh lơ (Cyan), hồng sẫm (Magenta) và vàng (Yellow) của hệ màu CMYK bằng cách trả lời các câu hỏi sau:', en: 'Find a colour-mixing simulator on the {internet} to explore the CMYK system, and say which of the three basic colours Cyan, Magenta and Yellow make Red, Green and Blue, by answering:' }, items: [
          { vi: 'Cyan + Yellow = ? (Hình 5.3)', en: 'Cyan + Yellow = ? (Figure 5.3)' },
          { vi: 'Cyan + Magenta = ?', en: 'Cyan + Magenta = ?' },
          { vi: 'Magenta + Yellow = ?', en: 'Magenta + Yellow = ?' }
        ] },
        { t: 'fig', art: 'cups53', no: '5.3', vi: 'Pha màu', en: 'Mixing colours' }
      ] },

      { number: 23, blocks: [
        { t: 'head', kind: 'extra', vi: 'Mở rộng: tự kiểm tra', en: 'Extension: self-check' },
        { t: 'quiz', title: { vi: 'Luyện tập', en: 'Practice' }, items: [
          { id: 'q1', vi: 'Phần mềm mô phỏng là gì?', en: 'What is simulation software?',
            options: [{ vi: 'Phần mềm thể hiện trực quan hoạt động của một đối tượng và cho phép tương tác', en: 'Software that shows an object’s behaviour visually and lets you interact' }, { vi: 'Phần mềm chỉ để chơi trò chơi', en: 'Software only for playing games' }, { vi: 'Phần mềm diệt virus', en: 'Anti-virus software' }, { vi: 'Phần mềm nén tệp', en: 'File compression software' }],
            answer: 0, whyVi: 'Phần mềm mô phỏng thể hiện trực quan sự vận động của đối tượng và cho phép người dùng tương tác.', whyEn: 'It shows the motion of an object visually and lets users interact.' },
          { id: 'q2', vi: 'Phần mềm nào cho phép chạy thử thuật toán dạng sơ đồ khối?', en: 'Which program lets you run an algorithm drawn as a flowchart?',
            options: [{ vi: 'GeoGebra', en: 'GeoGebra' }, { vi: 'Flowgorithm', en: 'Flowgorithm' }, { vi: 'ChemLab', en: 'ChemLab' }, { vi: 'Crocodile Physics', en: 'Crocodile Physics' }],
            answer: 1, whyVi: 'Flowgorithm chạy thử thuật toán trước khi cài đặt trong ngôn ngữ lập trình.', whyEn: 'Flowgorithm tests an algorithm before it is coded.' },
          { id: 'q3', vi: 'Đâu KHÔNG phải lợi ích của phần mềm mô phỏng?', en: 'Which is NOT a benefit of simulation software?',
            options: [{ vi: 'Chi phí thấp', en: 'Low cost' }, { vi: 'An toàn, tránh làm hỏng thiết bị', en: 'Safe, avoids damaging equipment' }, { vi: 'Luôn thay thế hoàn toàn thí nghiệm thật', en: 'Always fully replaces the real experiment' }, { vi: 'Tạo nhiều tình huống luyện tập', en: 'Creates many practice situations' }],
            answer: 2, whyVi: 'Mô phỏng hỗ trợ nghiên cứu nhưng không phải lúc nào cũng thay thế hoàn toàn thực tế.', whyEn: 'Simulation supports study but does not always replace reality.' }
        ] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          { vi: 'Phần mềm mô phỏng thể hiện trực quan sự vận động của đối tượng và cho phép tương tác.', en: 'Simulation software shows an object’s motion visually and allows interaction.' },
          { vi: 'Ví dụ: phet.colorado.edu, Crocodile Physics, ChemLab, GeoGebra, Flowgorithm, trycolors.com.', en: 'Examples: phet.colorado.edu, Crocodile Physics, ChemLab, GeoGebra, Flowgorithm, trycolors.com.' },
          { vi: 'Lợi ích: chi phí thấp, trực quan, an toàn, nhiều tình huống luyện tập; cần chọn phần mềm chất lượng, không vi phạm bản quyền.', en: 'Benefits: low cost, visual, safe, many practice situations; choose quality software that respects copyright.' }
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.',
          keys: ['simulation', 'simulation-software', 'simulate', 'virtual-experiment', 'interact', 'colour', 'colour-system', 'experiment', 'flowchart', 'algorithm', 'low-cost', 'copyright'] }
      ] }
    ]
  };
})();
