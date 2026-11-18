/* ==========================================================================
   TIN HỌC 9 — CHỦ ĐỀ 4. ỨNG DỤNG TIN HỌC
     'tin9-bai6'  Bài 6. Thực hành: Khai thác phần mềm mô phỏng (tr. 23–26)
   Trang 27 là phần mở rộng. Lời văn được biên soạn lại, không chép nguyên văn.
   ========================================================================== */
(function () {
  'use strict';
  const D = (window.TEXTBOOK = window.TEXTBOOK || {});
  D.lessons = D.lessons || {};
  D.glossary = D.glossary || {};
  const g = (word, ipa, pos, vi, ctx, en, viEx) => ({ word, ipa, pos, vi, ctx, ex: { en, vi: viEx } });

  Object.assign(D.glossary, {
    'energy-conversion': g('energy conversion', '/ˈen.ə.dʒi kənˈvɜː.ʃən/', 'n', 'chuyển hoá năng lượng',
      'Quá trình năng lượng chuyển từ dạng này sang dạng khác, ví dụ cơ năng thành điện năng.',
      'The simulation shows energy conversion step by step.', 'Mô phỏng cho thấy sự chuyển hoá năng lượng từng bước.'),
    energy: g('energy', '/ˈen.ə.dʒi/', 'n', 'năng lượng',
      'Khả năng sinh công; có nhiều dạng như cơ, điện, nhiệt, quang, hoá.',
      'Heat is a form of energy.', 'Nhiệt là một dạng năng lượng.'),
    circuit: g('circuit', '/ˈsɜː.kɪt/', 'n', 'mạch điện',
      'Hệ thống gồm nguồn, dây nối và thiết bị để dòng điện chạy qua.',
      'Build a simple circuit with a battery and a bulb.', 'Hãy lắp một mạch điện đơn giản gồm pin và bóng đèn.'),
    current: g('electric current', '/ɪˈlek.trɪk ˈkʌr.ənt/', 'n', 'dòng điện, cường độ dòng điện',
      'Dòng các hạt mang điện chuyển động; cường độ đo bằng ampe.',
      'The ammeter shows the current in the bulb.', 'Ampe kế cho biết cường độ dòng điện qua bóng đèn.'),
    ammeter: g('ammeter', '/ˈæm.iː.tər/', 'n', 'ampe kế',
      'Dụng cụ đo cường độ dòng điện, phải mắc nối tiếp với đoạn mạch cần đo.',
      'Connect the ammeter in series with the bulb.', 'Hãy mắc ampe kế nối tiếp với bóng đèn.'),
    voltmeter: g('voltmeter', '/ˈvɒlt.miː.tər/', 'n', 'vôn kế',
      'Dụng cụ đo hiệu điện thế (điện áp), mắc song song với đoạn mạch cần đo.',
      'A voltmeter is connected in parallel.', 'Vôn kế được mắc song song.'),
    'in-series': g('in series', '/ɪn ˈsɪə.riːz/', 'adv', 'nối tiếp',
      'Mắc thiết bị nối đuôi nhau trên cùng một nhánh của mạch.',
      'Connect the ammeter in series.', 'Hãy mắc ampe kế nối tiếp.'),
    'in-parallel': g('in parallel', '/ɪn ˈpær.ə.lel/', 'adv', 'song song',
      'Mắc thiết bị vào hai đầu của đoạn mạch.',
      'The voltmeter is connected in parallel.', 'Vôn kế được mắc song song.'),
    resistor: g('resistor', '/rɪˈzɪs.tər/', 'n', 'điện trở',
      'Linh kiện cản trở dòng điện trong mạch.',
      'Change the value of the resistor and watch the current.', 'Hãy đổi giá trị điện trở và quan sát dòng điện.'),
    voltage: g('voltage', '/ˈvəʊl.tɪdʒ/', 'n', 'điện áp, hiệu điện thế',
      'Đại lượng đo bằng vôn, gây ra dòng điện trong mạch.',
      'The battery gives a voltage of 9 V.', 'Pin cho điện áp 9 V.'),
    'geometry-software': g('geometry software', '/dʒiˈɒm.ə.tri ˈsɒft.weər/', 'n', 'phần mềm hình học',
      'Phần mềm vẽ và đo các hình hình học, như Geometer’s Sketchpad, GeoGebra.',
      'Geometry software can measure segments exactly.', 'Phần mềm hình học đo chính xác các đoạn thẳng.'),
    'golden-ratio': g('golden ratio', '/ˈɡəʊl.dən ˈreɪ.ʃi.əʊ/', 'n', 'tỉ lệ vàng',
      'Tỉ số (1 + √5)/2 ≈ 1,618 xuất hiện giữa các đoạn thẳng trong ngôi sao năm cánh đều.',
      'The golden ratio is about 1.618.', 'Tỉ lệ vàng xấp xỉ 1,618.'),
    segment: g('line segment', '/laɪn ˈseɡ.mənt/', 'n', 'đoạn thẳng',
      'Phần đường thẳng giới hạn bởi hai điểm.',
      'Measure the length of segment AB.', 'Hãy đo độ dài đoạn thẳng AB.'),
    measure: g('measure', '/ˈmeʒ.ər/', 'v', 'đo',
      'Xác định độ dài, cường độ,… bằng dụng cụ hoặc công cụ phần mềm.',
      'Use the Measure menu to find a length.', 'Dùng mục Measure để tìm độ dài.')
  });

  D.lessons['tin9-bai6'] = {
    gradeId: 9, number: '6', book: 'Tin học 9',
    title: { vi: 'Thực hành: Khai thác phần mềm mô phỏng', en: 'Practice: Using simulation software' },
    topic: { number: '4', vi: 'Ứng dụng tin học', en: 'Applied informatics' },
    spreadLabels: ['Nhiệm vụ 1: chuyển hoá năng lượng', 'Nhiệm vụ 2 và 3 (phần đầu)', 'Tỉ lệ vàng; luyện tập; tự kiểm tra'],
    pages: [
      { number: 23, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: { vi: 'Sau bài học này em sẽ:', en: 'After this lesson you will:' }, items: [
          { vi: 'Nêu được những kiến thức đã thu nhận từ việc khai thác một vài phần mềm mô phỏng.', en: 'State the knowledge gained from using a few {simulation programs|simulation-software}.' },
          { vi: 'Nhận biết được sự mô phỏng thế giới thực nhờ máy tính có thể giúp con người khám phá tri thức và giải quyết vấn đề.', en: 'Recognise that computer {simulation} of the real world can help people discover knowledge and solve problems.' }
        ] },
        { t: 'p', badge: 'fire', vi: 'Phần mềm mô phỏng trình bày các hiện tượng khoa học bằng cách sử dụng hình ảnh động hay ba chiều, giúp em cảm nhận được sự vận động của các đối tượng. Bằng cách tương tác, khám phá nhiều chức năng của phần mềm mô phỏng dạng thí nghiệm ảo, em không chỉ bổ sung kiến thức về khoa học, toán học, học cách giải quyết một số vấn đề đặt ra trong công nghệ mà còn có thể phát hiện được những điều mới mẻ.', en: 'Simulation software presents scientific phenomena with animation or 3-D images, so you can feel how objects move. By {interacting|interact} with and exploring the many functions of a {virtual experiment|virtual-experiment}, you not only add to your knowledge of science and maths and learn to solve some technology problems, but may also discover new things.' },
        { t: 'h2', n: '1', vi: 'Nhiệm vụ 1. Chuyển hoá năng lượng', en: 'Task 1. Energy conversion' },
        { t: 'h3', vi: 'Yêu cầu', en: 'Requirements' },
        { t: 'list', items: [
          { vi: 'Sử dụng phần mềm mô phỏng quá trình năng lượng được chuyển hoá từ dạng này qua dạng khác.', en: 'Use simulation software to model how {energy} is converted from one form to another.' },
          { vi: 'Kể tên một số dạng năng lượng và nêu ví dụ về quá trình chuyển hoá giữa những dạng năng lượng đó.', en: 'Name some forms of energy and give examples of conversion between them.' }
        ] },
        { t: 'h3', vi: 'Hướng dẫn', en: 'Guide' },
        { t: 'h3', vi: 'a) Mở cửa sổ mô phỏng một số dạng năng lượng và sự chuyển hoá năng lượng', en: 'a) Open the window that simulates some forms of energy and their conversion' },
        { t: 'list', items: [
          { vi: 'Khởi động trình duyệt web. Nhập https://phet.colorado.edu/ vào thanh địa chỉ để mở trang PhET.', en: 'Start a web browser. Type https://phet.colorado.edu/ in the address bar to open the PhET page.' },
          { vi: 'Di chuyển đến cuối trang web, chọn ngôn ngữ hiển thị là **Tiếng Việt** (Hình 6.1).', en: 'Scroll to the bottom of the page and set the display language to **Vietnamese** (Figure 6.1).' },
          { vi: 'Chọn mục **CÁC MÔ PHỎNG**. Chọn **Hoá học** (Hình 6.2).', en: 'Choose **SIMULATIONS**. Choose **Chemistry** (Figure 6.2).' },
          { vi: 'Nháy chuột vào biểu tượng **Năng lượng: các dạng và sự chuyển hoá** để chọn nội dung mô phỏng (Hình 6.3). Nháy chuột vào nút ▶ để mở cửa sổ tương tác.', en: 'Click the **Energy: Forms and Changes** icon to choose the simulation (Figure 6.3). Click the ▶ button to open the interactive window.' }
        ] },
        { t: 'figs', items: [
          { art: 'lang61', no: '6.1', vi: 'Chọn ngôn ngữ hiển thị là Tiếng Việt', en: 'Choose Vietnamese as the display language' },
          { art: 'menu62', no: '6.2', vi: 'Chọn lĩnh vực hoá học', en: 'Choose the chemistry category' },
          { art: 'sim63', no: '6.3', vi: 'Chọn nội dung mô phỏng', en: 'Choose the simulation' }
        ] },
        { t: 'p', plain: true, vi: '*Lưu ý:* Em cũng có thể truy cập trực tiếp mô phỏng “Năng lượng: các dạng và sự chuyển hoá” qua đường liên kết phet.colorado.edu/vi/simulations/energy-forms-and-changes.', en: '*Note:* You can also go straight to the “Energy Forms and Changes” simulation at phet.colorado.edu/vi/simulations/energy-forms-and-changes.' }
      ] },

      { number: 24, blocks: [
        { t: 'h3', vi: 'b) Tương tác với phần mềm', en: 'b) Interact with the software' },
        { t: 'p', plain: true, vi: 'Trong cửa sổ, em có thể quan sát được sự chuyển hoá của các dạng năng lượng thông qua những biểu tượng. Em cũng có thể tương tác với ứng dụng bằng cách chọn nguồn năng lượng, thiết bị chuyển hoá năng lượng và thiết bị tiêu thụ năng lượng (Hình 6.4).', en: 'In the window you can watch forms of energy being converted, shown by icons. You can also {interact} with the application by choosing an energy source, a device that converts energy and a device that uses it (Figure 6.4).' },
        { t: 'list', items: [
          { vi: 'Thay đổi nguồn năng lượng: người đạp xe, ánh sáng mặt trời, vòi nước chảy, ấm nước sôi.', en: 'Change the energy source: a person cycling, sunlight, running tap water, a boiling kettle.' },
          { vi: 'Thay đổi thiết bị chuyển hoá năng lượng thành điện năng: pin mặt trời và máy phát điện.', en: 'Change the device that converts energy into electricity: a solar cell and a generator.' },
          { vi: 'Thay đổi thiết bị tiêu thụ điện: bếp điện, bóng đèn sợi đốt, bóng đèn compact, quạt điện.', en: 'Change the device that uses electricity: an electric stove, a filament bulb, a compact bulb, an electric fan.' }
        ] },
        { t: 'h3', vi: 'c) Nêu kiến thức thu nhận được', en: 'c) State what you learned' },
        { t: 'list', items: [
          { vi: 'Em quan sát được những dạng năng lượng nào?', en: 'Which forms of energy did you observe?' },
          { vi: 'Nêu một tình huống năng lượng được chuyển hoá từ dạng này sang dạng khác.', en: 'Give one situation where energy is converted from one form to another.' }
        ] },
        { t: 'fig', art: 'energy64', no: '6.4', vi: 'Mô phỏng một số dạng năng lượng và sự chuyển hoá năng lượng', en: 'Simulating some forms of energy and their conversion', wide: true },
        { t: 'h2', n: '2', vi: 'Nhiệm vụ 2. Đo cường độ dòng điện', en: 'Task 2. Measuring electric current' },
        { t: 'h3', vi: 'Yêu cầu', en: 'Requirements' },
        { t: 'p', plain: true, vi: 'Sử dụng phần mềm thí nghiệm ảo lắp ráp mạch điện một chiều. Giải quyết vấn đề đo cường độ dòng điện đi qua một điện trở, chẳng hạn một bóng đèn.', en: 'Use virtual-experiment software to build a direct-current {circuit}, and solve the problem of measuring the {current|current} through a {resistor}, for example a bulb.' },
        { t: 'h3', vi: 'Hướng dẫn', en: 'Guide' },
        { t: 'h3', vi: 'a) Truy cập phần mềm mô phỏng', en: 'a) Open the simulation software' },
        { t: 'list', items: [
          { vi: 'Thực hiện tương tự Nhiệm vụ 1, chọn **CÁC MÔ PHỎNG**. Chọn **Vật lý**.', en: 'As in Task 1, choose **SIMULATIONS**, then **Physics**.' },
          { vi: 'Chọn **Bộ lắp ráp mạch điện: DC – Phòng thí nghiệm ảo** để vào phòng thí nghiệm ảo lắp ráp mạch điện.', en: 'Choose **Circuit Construction Kit: DC – Virtual Lab** to enter the virtual lab for building circuits.' }
        ] },
        { t: 'h3', vi: 'b) Vẽ mạch điện', en: 'b) Draw the circuit' },
        { t: 'list', items: [
          { vi: 'Kéo các biểu tượng Pin, Đèn tròn, Ampe kế, Công tắc và Dây nối, thả vào vùng hiển thị.', en: 'Drag the Battery, Bulb, {Ammeter|ammeter}, Switch and Wire icons into the display area.' },
          { vi: 'Kết nối các thành phần của mạch điện (Hình 6.5a).', en: 'Connect the parts of the circuit (Figure 6.5a).' }
        ] },
        { t: 'p', plain: true, vi: '*Lưu ý:* Ampe kế cần mắc nối tiếp với đoạn mạch điện cần đo cường độ dòng điện và không mắc trực tiếp vào hai cực của nguồn điện (Hình 6.5b).', en: '*Note:* An {ammeter} must be connected {in series|in-series} with the part of the circuit whose current you measure, and never directly across the two poles of the power source (Figure 6.5b).' }
      ] },

      { number: 25, blocks: [
        { t: 'figs', items: [
          { art: 'amp65a', no: '6.5a', vi: 'a) Lắp Ampe kế đúng cách', en: 'a) The ammeter connected correctly' },
          { art: 'amp65b', no: '6.5b', vi: 'b) Sự cố có thể xảy ra khi lắp Ampe kế không đúng cách', en: 'b) What can go wrong when the ammeter is connected wrongly' }
        ] },
        { t: 'h3', vi: 'c) Trình bày giải pháp', en: 'c) Present the solution' },
        { t: 'ask', style: 'alpha', lead: { vi: 'Tương tác với phần mềm và nêu giải pháp đo cường độ dòng điện trên một đoạn của mạch điện bằng cách trả lời các câu hỏi sau:', en: 'Interact with the software and state how to measure the current in one part of a circuit by answering:' }, items: [
          { vi: 'Em cần dùng thiết bị nào để đo cường độ dòng điện trên mạch điện?', en: 'Which device do you need to measure current in a circuit?' },
          { vi: 'Thiết bị đó được nối song song hay nối tiếp với mạch điện cần đo?', en: 'Is that device connected {in parallel|in-parallel} or {in series|in-series} with the part of the circuit you measure?' }
        ] },
        { t: 'h2', n: '3', vi: 'Nhiệm vụ 3. Tỉ lệ vàng trong ngôi sao năm cánh', en: 'Task 3. The golden ratio in a five-pointed star' },
        { t: 'h3', vi: 'Yêu cầu', en: 'Requirements' },
        { t: 'p', plain: true, vi: 'Sử dụng công cụ đo và tính toán trong phần mềm mô phỏng hình học. Khám phá tri thức về tỉ lệ các đoạn thẳng xuất hiện trong một ngôi sao có năm cánh đều nhau.', en: 'Use the measuring and calculating tools in {geometry software|geometry-software} to discover the ratios of the line segments in a star with five equal points.' },
        { t: 'h3', vi: 'Hướng dẫn', en: 'Guide' },
        { t: 'p', plain: true, vi: '*(Hướng dẫn sau đây sử dụng phần mềm Geometer’s Sketchpad để minh hoạ.)*', en: '*(The guide below uses Geometer’s Sketchpad as an illustration.)*' },
        { t: 'h3', vi: 'a) Truy cập phần mềm và mở tệp dữ liệu', en: 'a) Open the software and the data file' },
        { t: 'list', items: [
          { vi: 'Khởi động phần mềm Geometer’s Sketchpad. Mở tệp TyLeVang.gsp bằng cách chọn **File/Open** hoặc nhấn tổ hợp phím [[Ctrl]] + [[O]] và chọn tệp. Tệp dữ liệu đã có sẵn một ngôi sao năm cánh (Hình 6.8a).', en: 'Start Geometer’s Sketchpad. Open the file TyLeVang.gsp with **File/Open** or by pressing [[Ctrl]] + [[O]] and choosing the file. It already contains a five-pointed star (Figure 6.8a).' },
          { vi: 'Em hãy di chuyển ngôi sao này bằng cách chọn đỉnh hoặc cạnh của nó và kéo thả chuột đến vị trí khác. Kích thước ngôi sao được điều chỉnh bằng cách kéo thả điểm P hoặc điểm Q để độ dài đoạn thẳng PQ thay đổi.', en: 'Move the star by selecting a vertex or an edge and dragging it elsewhere. Resize the star by dragging point P or point Q so that the length of {segment|segment} PQ changes.' }
        ] },
        { t: 'fig', art: 'star66', no: '6.6', vi: 'Đo độ dài các đoạn thẳng của ngôi sao năm cánh', en: 'Measuring the lengths of the segments of the star' }
      ] },

      { number: 26, blocks: [
        { t: 'h3', vi: 'b) Đo độ dài', en: 'b) Measure the lengths' },
        { t: 'list', items: [
          { vi: 'Sử dụng công cụ chọn đối tượng để chọn đoạn thẳng AB (Hình 6.6) và chọn **Measure/Length** để đo độ dài đoạn AB đã chọn.', en: 'Use the selection tool to pick segment AB (Figure 6.6) and choose **Measure/Length** to {measure} its length.' },
          { vi: 'Tương tự như vậy, em sẽ đo được độ dài các đoạn thẳng BC, AC và AD.', en: 'In the same way, measure segments BC, AC and AD.' }
        ] },
        { t: 'h3', vi: 'c) Tính tỉ lệ', en: 'c) Calculate the ratio' },
        { t: 'list', items: [
          { vi: 'Mở công cụ tính bằng cách gõ tổ hợp phím **Alt + =** hoặc chọn **Number/Calculate…** (**Measure/Calculate…** với Geometer’s Sketchpad 4.x).', en: 'Open the calculator by pressing **Alt + =** or choosing **Number/Calculate…** (**Measure/Calculate…** in Geometer’s Sketchpad 4.x).' },
          { vi: 'Nhập biểu thức cần tính bằng bàn phím, bàn phím ảo hoặc sử dụng chuột để chọn các giá trị đã được đo hoặc tính trước trên màn hình (Hình 6.7).', en: 'Enter the expression with the keyboard, the on-screen keypad, or by clicking the values already measured or calculated on screen (Figure 6.7).' }
        ] },
        { t: 'fig', art: 'calc67', no: '6.7', vi: 'Tính tỉ lệ các đoạn thẳng', en: 'Calculating the ratio of segments' },
        { t: 'h3', vi: 'd) Khám phá tri thức', en: 'd) Discover knowledge' },
        { t: 'list', items: [
          { vi: 'Thay đổi kích thước ngôi sao bằng cách kéo thả điểm P hoặc điểm Q, em sẽ thấy số đo các đoạn thẳng AB, BC, AC và AD cũng thay đổi theo.', en: 'Resize the star by dragging P or Q and you will see the measures of AB, BC, AC and AD change too.' },
          { vi: 'Điều đáng kinh ngạc là dù độ dài của các đoạn thẳng thay đổi nhưng tỉ lệ giữa chúng không thay đổi, luôn bằng nhau và xấp xỉ 1,62. Chính xác hơn, ta sẽ có: $\\frac{AB}{BC} = \\frac{AC}{AB} = \\frac{AD}{AC} = \\frac{1 + \\sqrt{5}}{2} \\approx 1,618034$.', en: 'Surprisingly, although the lengths change, the ratios between them do not: they stay equal and about 1.62. More exactly: $\\frac{AB}{BC} = \\frac{AC}{AB} = \\frac{AD}{AC} = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618034$.' },
          { vi: 'Tỉ lệ trên có tính chất đặc biệt, được gọi là **tỉ lệ vàng**. Nếu một hình chữ nhật có tỉ lệ hai cạnh là tỉ lệ vàng thì sau khi cắt bỏ một hình vuông, phần còn lại là một hình chữ nhật cũng có tỉ lệ hai cạnh là tỉ lệ vàng (Hình 6.8b). Một hình chữ nhật như vậy được gọi là hình chữ nhật tỉ lệ vàng.', en: 'This ratio is special and is called the **{golden ratio|golden-ratio}**. If a rectangle has sides in the golden ratio, then after cutting off a square the remaining rectangle also has sides in the golden ratio (Figure 6.8b). Such a rectangle is called a golden rectangle.' }
        ] },
        { t: 'fig', art: 'gold68', no: '6.8', vi: 'Ngôi sao năm cánh và hình chữ nhật tỉ lệ vàng', en: 'The five-pointed star and the golden rectangle', wide: true },
        { t: 'head', kind: 'practice', vi: 'Luyện tập', en: 'Practice' },
        { t: 'p', plain: true, vi: 'Em hãy nêu giải pháp đo điện áp giữa hai đầu một điện trở bằng cách sử dụng phần mềm mô phỏng.', en: 'Describe how to measure the {voltage} across a resistor using simulation software.' },
        { t: 'head', kind: 'apply', vi: 'Vận dụng', en: 'Apply' },
        { t: 'p', plain: true, vi: 'Trong phần mềm mô phỏng, em có thể lắp ráp mạch điện gồm: nguồn điện, công tắc, điện trở, ampe kế, vôn kế. Bằng cách thay đổi trị số của các linh kiện, hãy khám phá quy luật phụ thuộc lẫn nhau giữa điện trở, cường độ dòng điện qua nó và điện áp giữa hai đầu điện trở đó.', en: 'In the simulation you can build a circuit with a power source, a switch, a resistor, an {ammeter} and a {voltmeter}. By changing the values of the components, discover how the resistance, the current through it and the voltage across it depend on one another.' }
      ] },

      { number: 27, blocks: [
        { t: 'head', kind: 'extra', vi: 'Mở rộng: tự kiểm tra', en: 'Extension: self-check' },
        { t: 'quiz', title: { vi: 'Luyện tập', en: 'Practice' }, items: [
          { id: 'q1', vi: 'Ampe kế phải được mắc như thế nào trong mạch điện?', en: 'How must an ammeter be connected in a circuit?',
            options: [{ vi: 'Nối tiếp với đoạn mạch cần đo', en: 'In series with the part to be measured' }, { vi: 'Song song với hai cực của nguồn điện', en: 'In parallel across the poles of the source' }, { vi: 'Mắc ở đâu cũng được', en: 'Anywhere' }, { vi: 'Không cần mắc', en: 'It need not be connected' }],
            answer: 0, whyVi: 'Mắc trực tiếp vào hai cực của nguồn có thể gây sự cố (Hình 6.5b).', whyEn: 'Connecting it directly across the source can cause a fault (Figure 6.5b).' },
          { id: 'q2', vi: 'Trang web nào chứa các mô phỏng vật lí, hoá học dùng trong bài?', en: 'Which website holds the physics and chemistry simulations used in this lesson?',
            options: [{ vi: 'phet.colorado.edu', en: 'phet.colorado.edu' }, { vi: 'trycolors.com', en: 'trycolors.com' }, { vi: 'edu.vn', en: 'edu.vn' }, { vi: 'traffic-simulation.de', en: 'traffic-simulation.de' }],
            answer: 0, whyVi: 'Trang PhET có nhiều mô phỏng thuộc các lĩnh vực khoa học.', whyEn: 'PhET offers many simulations across the sciences.' },
          { id: 'q3', vi: 'Tỉ lệ vàng xấp xỉ bằng bao nhiêu?', en: 'About what is the golden ratio?',
            options: [{ vi: '1,62', en: '1.62' }, { vi: '2,5', en: '2.5' }, { vi: '3,14', en: '3.14' }, { vi: '0,5', en: '0.5' }],
            answer: 0, whyVi: 'Tỉ lệ vàng là (1 + √5)/2 ≈ 1,618.', whyEn: 'The golden ratio is (1 + √5)/2 ≈ 1.618.' }
        ] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          { vi: 'PhET cho phép mô phỏng chuyển hoá năng lượng và lắp mạch điện ảo.', en: 'PhET simulates energy conversion and lets you build virtual circuits.' },
          { vi: 'Ampe kế mắc nối tiếp; vôn kế mắc song song.', en: 'An ammeter goes in series; a voltmeter goes in parallel.' },
          { vi: 'Phần mềm hình học cho phép đo, tính và khám phá tri thức như tỉ lệ vàng.', en: 'Geometry software lets you measure, calculate and discover knowledge such as the golden ratio.' }
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.',
          keys: ['energy-conversion', 'energy', 'circuit', 'current', 'ammeter', 'voltmeter', 'in-series', 'in-parallel', 'resistor', 'voltage', 'geometry-software', 'golden-ratio', 'segment', 'measure'] }
      ] }
    ]
  };
})();
