/* ==========================================================================
   BÀI 1. THẾ GIỚI KĨ THUẬT SỐ  (Tin học 9, Chủ đề 1)
   --------------------------------------------------------------------------
   Bố cục trang 5–8 theo mẫu sách giấy. Lời văn do dự án tự biên soạn lại,
   không chép nguyên văn sách giáo khoa. Trang 9–10 là phần mở rộng.

   Cú pháp trong chuỗi văn bản:
     **chữ đậm**   *chữ nghiêng*
     {digital}                → từ vựng có gạch chân, tra trong glossary.js
     {devices|device}         → hiện "devices", tra khoá "device"

   Các loại khối (t):
     banner, goals, talk, h2, h3, activity, cols (gom khối thành 2 cột),
     p, list, olist, tip, ask, head, fig, figs, bits, quiz, summary, vocab
   ========================================================================== */
window.TEXTBOOK = window.TEXTBOOK || {};
window.TEXTBOOK.lessons = window.TEXTBOOK.lessons || {};

window.TEXTBOOK.lessons['tin9-bai1'] = {
  gradeId: 9,
  number: '1',
  book: 'Tin học 9',
  title: { vi: 'Thế giới kĩ thuật số', en: 'The digital world' },
  topic: { number: '1', vi: 'Máy tính và cộng đồng', en: 'Computers and the community' },

  /* Tên hiển thị trong ô chọn trang (mỗi cặp trang một tên). */
  spreadLabels: [
    'Mở đầu bài học',
    'Thiết bị có bộ xử lí và khả năng của máy tính',
    'Tác động lên giáo dục, luyện tập, vận dụng',
    'Mở rộng: thử nghiệm và trắc nghiệm',
    'Tóm tắt và từ vựng'
  ],

  pages: [
    /* ------------------------------------------------------------ Trang 5 */
    {
      number: 5,
      blocks: [
        { t: 'banner' },
        {
          t: 'goals',
          lead: { vi: 'Sau bài học này em sẽ:', en: 'After this lesson you will:' },
          items: [
            { vi: 'Nhận ra các thiết bị có bộ xử lí thông tin có mặt khắp nơi và nêu được ví dụ.', en: 'Recognise that devices with an information {processor} are everywhere, and give examples.' },
            { vi: 'Nêu được khả năng của máy tính và một số ứng dụng thực tế trong khoa học kĩ thuật và đời sống.', en: 'Describe what computers can do and some real uses in science, engineering and daily life.' },
            { vi: 'Giải thích được tác động của công nghệ thông tin lên giáo dục và xã hội qua các ví dụ cụ thể.', en: 'Explain how information {technology} affects education and {society}, using specific examples.' }
          ]
        },
        {
          t: 'talk',
          lines: [
            { who: 'An', vi: 'Bộ xử lí được ví như “bộ não” của máy tính. Nhưng chẳng lẽ chỉ máy tính mới có bộ xử lí sao?', en: 'The {processor} is like the “brain” of a {computer}. But surely only computers have one?' },
            { who: 'Khoa', vi: 'Không đâu. Nhiều thiết bị điện tử khác cũng cần bộ xử lí để hoạt động, như ti vi thông minh hay robot hút bụi,…', en: 'Not at all. Many other electronic {devices|device} need a processor to work, such as smart TVs or vacuum {robots|robot}.' },
            { who: 'An', vi: 'Vậy là quanh ta còn rất nhiều thiết bị như thế nữa.', en: 'So there must be many more of them around us.' }
          ]
        },
        { t: 'h2', n: '1', vi: 'Thế giới kĩ thuật số', en: 'The digital world' },
        {
          t: 'activity', no: 1,
          title: { vi: 'Tìm hiểu ti vi kĩ thuật số', en: 'Exploring the digital TV' },
          vi: 'Phần lớn ti vi ngày nay là ti vi kĩ thuật số (Hình 1.1). Em hãy quan sát và trả lời:',
          en: 'Most TVs today are {digital} TVs (Figure 1.1). Look closely and answer:',
          items: [
            { vi: 'Bộ điều khiển gửi cho ti vi thông tin đầu vào nào?', en: 'What {input} does the {remote control|remote-control} send to the TV?' },
            { vi: 'Đầu ra của ti vi thay đổi ra sao?', en: 'How does the TV’s {output} change?' },
            { vi: 'Ti vi có xử lí thông tin không?', en: 'Does the TV {process|process-v} {information}?' }
          ],
          style: 'num',
          art: 'tv', figNo: '1.1',
          figVi: 'Ti vi kĩ thuật số', figEn: 'A digital TV'
        },
        {
          t: 'cols',
          blocks: [
            {
              t: 'p', badge: 'book',
              vi: 'Khi em bấm nút đổi kênh trên bộ điều khiển, một tín hiệu được gửi tới ti vi. Ti vi phải xử lí tín hiệu ấy rồi mới chuyển sang kênh em muốn xem. Vì vậy, bên trong ti vi có một bộ xử lí thông tin.',
              en: 'When you press the channel button on the remote, a {signal} is sent to the TV. The TV must process that signal before it switches to the channel you want. This is why a TV has an information {processor} inside.'
            },
            {
              t: 'p',
              vi: 'Bộ xử lí thông tin (gọi tắt là **bộ xử lí**) là bộ phận quan trọng của máy tính. Nó làm việc với dữ liệu dưới dạng dãy **bit**. Nhưng bộ xử lí không chỉ nằm trong máy tính hay điện thoại thông minh. Nó còn được gắn vào nhiều thiết bị khác để giúp chúng xử lí mọi loại thông tin có thể số hoá.',
              en: 'The information processor (or simply the **processor**) is a key part of a computer. It works with {data} in the form of sequences of {bits|bit}. But processors are not only inside computers and {smartphones|smartphone}. They are built into many other {devices|device} so that these can handle any kind of information that can be digitised.'
            },
            {
              t: 'list',
              items: [
                {
                  vi: 'Trong nhà, ti vi, tủ lạnh, máy giặt,… được gắn bộ xử lí nên có thêm nhiều tính năng và hoạt động linh hoạt. Ngày nay, cả bếp điện, nồi cơm điện, thậm chí đèn và quạt cũng có thể có bộ xử lí để tiện lợi hơn.',
                  en: 'At home, TVs, fridges and washing machines have processors, so they gain more features and work more flexibly. Today even electric hobs, rice cookers, lamps and fans may have one to be more convenient.'
                }
              ]
            }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------ Trang 6 */
    {
      number: 6,
      blocks: [
        {
          t: 'cols',
          blocks: [
            {
              t: 'list',
              items: [
                { vi: 'Hệ thống nhận diện khuôn mặt ở cơ quan, máy chiếu trong lớp học, bảng điện tử báo chuyến bay, máy rút tiền tự động (ATM), cổng thu phí tự động trên đường cao tốc,… đều là thiết bị có bộ xử lí, xuất hiện trong mọi lĩnh vực của đời sống.', en: 'Face-recognition systems in offices, classroom projectors, electronic flight boards, cash machines ({ATMs|atm}) and automatic toll gates on motorways are all devices with processors, found in every area of life.' },
                { vi: 'Quầy thanh toán trong siêu thị, băng chuyền tự động trong nhà máy, dây chuyền lắp ráp bằng robot hay hệ thống tưới cây tự động,… là những ví dụ về thiết bị có bộ xử lí trong thương mại, công nghiệp và nông nghiệp hiện đại.', en: 'Supermarket checkouts, automatic conveyor belts in factories, {robot} assembly lines and automatic irrigation systems are examples of processor-controlled equipment in modern trade, industry and farming.' }
              ]
            },
            {
              t: 'p',
              vi: 'Các thiết bị có bộ xử lí hiện diện xung quanh ta và ngày càng quen thuộc. Đó có thể là vật dụng cá nhân, đồ dùng trong gia đình hoặc thiết bị chuyên dụng ở nhiều lĩnh vực như công nghiệp, nông nghiệp, thương mại, giáo dục, y tế, giao thông,… Sự đa dạng ấy tạo nên **thế giới kĩ thuật số**.',
              en: 'Devices with processors are all around us and are becoming more familiar. They may be personal items, household appliances or special equipment in industry, farming, trade, education, healthcare and transport. This variety makes up the **{digital} world**.'
            }
          ]
        },
        {
          t: 'tip',
          items: [
            { vi: 'Thiết bị có bộ xử lí giúp con người tự động hoá một phần việc xử lí thông tin, và có mặt trong hầu hết các lĩnh vực kinh tế, xã hội và đời sống.', en: 'Devices with processors help people automate part of {information} handling, and appear in almost every area of the economy, {society} and daily life.' }
          ],
          plain: true
        },
        {
          t: 'ask', style: 'num',
          items: [
            { vi: 'Em hãy ghép *ô tô tự lái*, *máy chụp cắt lớp*, *bảng điện tử*, *robot lắp ráp* với từng thiết bị trong Hình 1.2.', en: 'Match *self-driving car*, *scanner*, *flight board* and *assembly robot* with the devices in Figure 1.2.' },
            { vi: 'Những thiết bị trong Hình 1.2 thường xuất hiện ở đâu trong thực tế?', en: 'Where do the devices in Figure 1.2 usually appear in real life?' }
          ]
        },
        { t: 'fig', art: 'devices4', no: '1.2', vi: 'Thiết bị có bộ xử lí', en: 'Devices with processors', wide: true },
        { t: 'h2', n: '2', vi: 'Ứng dụng thực tế của máy tính trong khoa học kĩ thuật và đời sống', en: 'Real uses of computers in science, engineering and daily life' },
        {
          t: 'activity', no: 2,
          title: { vi: 'Máy tính thật là cần thiết', en: 'Computers are truly useful' },
          vi: 'Em hãy nêu một số khả năng của máy tính giúp nó hỗ trợ con người đắc lực trong cuộc sống.',
          en: 'Name some abilities of a {computer} that let it support people so well in life.'
        },
        {
          t: 'cols',
          blocks: [
            { t: 'h3', vi: 'a) Khả năng của máy tính', en: 'a) What computers can do' },
            {
              t: 'p', badge: 'book',
              vi: 'Máy tính là thiết bị điện tử hỗ trợ con người trong rất nhiều hoạt động, nhờ có khả năng tính toán nhanh và chính xác, lưu trữ dung lượng lớn, và kết nối toàn cầu với tốc độ cao.',
              en: 'A computer is an electronic {device} that supports people in many activities, thanks to fast and accurate calculation, large {memory|memory} capacity and high-speed global connection.'
            },
            {
              t: 'list',
              items: [
                { vi: 'Máy tính thực hiện hàng tỉ phép tính mỗi giây một cách bền bỉ và chính xác, giúp con người giải được những bài toán phức tạp.', en: 'A computer can do billions of calculations a second, tirelessly and accurately, helping people solve complex problems.' },
                { vi: 'Máy tính lưu trữ và xử lí nhiều loại dữ liệu như văn bản, hình ảnh, âm thanh, video,… với dung lượng lớn và truy xuất nhanh khi cần.', en: 'A computer stores and processes many kinds of {data}, such as text, images, sound and video, in large amounts and retrieves them quickly when needed.' }
              ]
            }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------ Trang 7 */
    {
      number: 7,
      blocks: [
        {
          t: 'cols',
          blocks: [
            {
              t: 'list',
              items: [
                { vi: 'Các máy tính có thể kết nối với nhau thành mạng toàn cầu Internet, giúp em truy cập thông tin, dịch vụ và giải trí phong phú.', en: 'Computers can connect to each other to form the global {Internet|internet}, giving you access to a wealth of information, services and entertainment.' }
              ]
            },
            { t: 'h3', vi: 'b) Ứng dụng của máy tính trong khoa học kĩ thuật và đời sống', en: 'b) Uses of computers in science, engineering and daily life' },
            {
              t: 'p', indent: true,
              vi: 'Công nghệ máy tính phát triển nhanh nên đã trở thành công cụ đắc lực hỗ trợ con người ở hầu hết các lĩnh vực. Ví dụ:',
              en: 'Computer {technology} is advancing so fast that it has become a powerful tool supporting people in almost every field. For example:'
            },
            {
              t: 'list',
              items: [
                { vi: 'Máy tính hiệu năng cao tính toán các bài toán khoa học kĩ thuật, chẳng hạn mô phỏng dòng chảy của chất lỏng hay chất khí, việc mà làm thí nghiệm thật rất khó.', en: 'High-performance computers do science and engineering calculations, such as simulating the flow of liquids and gases, which is very hard to test in real life.' },
                { vi: 'Siêu máy tính thực hiện các phép tính phức tạp trong hoá học, vật lí, công nghệ vật liệu hay dự báo thời tiết,…', en: 'A {supercomputer} carries out complex calculations in chemistry, physics, materials science and weather forecasting.' },
                { vi: 'Công nghệ thông tin được dùng trên các vệ tinh nhân tạo để nghiên cứu vũ trụ. Kính viễn vọng không gian Hubble (Hình 1.3) là một trong những cỗ máy xử lí thông tin đắt tiền nhất từng được chế tạo.', en: 'Information technology is used on artificial satellites to study space. The Hubble Space Telescope (Figure 1.3) is one of the most expensive information-processing machines ever built.' },
                { vi: 'Trong y tế, bác sĩ dùng máy tính để hiểu cơ thể người và chẩn đoán bệnh. Bệnh viện dùng máy tính để quản lí dữ liệu người bệnh và bác sĩ.', en: 'In healthcare, doctors use computers to understand the human body and diagnose illness. Hospitals use them to manage records of patients and doctors.' },
                { vi: 'Trong nghiên cứu, các nhà khoa học tìm tài liệu tham khảo từ kho dữ liệu số hoá, lưu trên thiết bị lưu trữ hoặc Internet.', en: 'In research, scientists find reference material in digitised {data} collections stored on {devices|device} or the {Internet|internet}.' },
                { vi: 'Trong giao thông, máy tính điều khiển xe tự lái (Hình 1.4), điều khiển hệ thống đèn tín hiệu,…', en: 'In transport, computers control self-driving cars (Figure 1.4) and traffic-light systems.' },
                { vi: 'Trong đời sống hằng ngày, hầu như mọi dịch vụ thiết yếu như gửi hàng, di chuyển, mua thực phẩm, đọc báo,… đều làm được bằng vài lần nhấp chuột. Nhiều người nhờ máy tính mà làm việc hiệu quả ngay tại nhà.', en: 'In daily life, almost every essential service, such as sending parcels, travelling, buying food or reading the news, takes just a few clicks. Many people work effectively from home with a computer’s help.' },
                { vi: 'Máy tính có nhiều lựa chọn giải trí nên được rất nhiều người dùng. Qua máy tính, em có thể nghe nhạc, xem phim và trò chuyện với bạn, hay chơi những trò chơi hấp dẫn.', en: 'Computers offer many kinds of entertainment, so they are widely used. With one you can listen to music, watch films, chat with friends and play exciting games.' }
              ]
            }
          ]
        },
        {
          t: 'figs',
          items: [
            { art: 'hubble', no: '1.3', vi: 'Kính viễn vọng Hubble', en: 'The Hubble Space Telescope' },
            { art: 'car', no: '1.4', vi: 'Ô tô tự lái do máy tính điều khiển', en: 'A self-driving car controlled by a computer' }
          ]
        },
        {
          t: 'tip',
          items: [
            { vi: 'Máy tính tính toán nhanh, bền bỉ, chính xác; lưu trữ dữ liệu dung lượng lớn; kết nối toàn cầu với tốc độ cao.', en: 'Computers calculate quickly, tirelessly and accurately; store large amounts of {data}; and connect worldwide at high speed.' },
            { vi: 'Máy tính được ứng dụng hiệu quả trong nhiều lĩnh vực của khoa học kĩ thuật và đời sống.', en: 'Computers are used effectively in many fields of science, engineering and daily life.' }
          ]
        },
        { t: 'h2', n: '3', vi: 'Tác động của công nghệ thông tin lên giáo dục và xã hội', en: 'The impact of information technology on education and society' },
        {
          t: 'activity', no: 3,
          title: { vi: 'Tác động của công nghệ thông tin', en: 'The impact of information technology' },
          vi: 'Em hãy kể một số ví dụ cho thấy tác động của công nghệ thông tin lên giáo dục và xã hội.',
          en: 'Give some examples showing how information {technology} affects education and {society}.'
        }
      ]
    },

    /* ------------------------------------------------------------ Trang 8 */
    {
      number: 8,
      blocks: [
        {
          t: 'cols',
          blocks: [
            {
              t: 'p', badge: 'book',
              vi: 'Con người dùng công nghệ thông tin để khám phá tri thức mới, kết nối bản thân với thế giới và hỗ trợ việc học tập, lao động. Về mặt xã hội, công nghệ thông tin mang lại phương tiện mới giúp mọi người dễ giao tiếp với nhau. Nếu biết dùng một cách tích cực, đó sẽ là nguồn lực làm cuộc sống của chúng ta dễ dàng hơn.',
              en: 'People use information {technology} to discover new knowledge, connect themselves with the world and support learning and work. For {society}, it brings new ways for people to communicate easily. If we use it positively, it becomes a resource that makes our lives easier.'
            },
            {
              t: 'list',
              items: [
                { vi: 'Công nghệ thông tin đem đến những phương tiện giao tiếp hiệu quả như thư điện tử, tin nhắn, mạng xã hội,… giúp con người bớt phụ thuộc vào không gian và thời gian. Ngày nay ai cũng có thể trò chuyện và nhìn thấy người thân dễ dàng, dù ở rất xa nhau hay đang di chuyển.', en: 'It provides effective ways to communicate, such as email, messages and social media, so people depend less on place and time. Today anyone can easily chat with and see their family, even when far apart or on the move.' },
                { vi: 'Công nghệ thông tin còn giúp con người chuyển giao và tiếp cận thông tin dễ dàng.', en: 'It also lets people pass on and reach {information} more easily.' }
              ]
            },
            {
              t: 'p',
              vi: 'Trong giáo dục, công nghệ thông tin giúp mọi người chia sẻ kiến thức, kĩ năng và cổ vũ thái độ sống tích cực. Ngày nay, ai cũng có thể bổ sung hiểu biết về bất kì lĩnh vực nào, ở mọi nơi, vào mọi lúc bằng Internet. Nhiều dữ liệu hiện có trên Internet là miễn phí.',
              en: 'In education, information technology helps people share knowledge and skills and encourages a positive outlook. Today anyone can add to their knowledge of any subject, anywhere, at any time through the {Internet|internet}. Much of the {data} online is free.'
            },
            {
              t: 'p',
              vi: 'Tuy nhiên, dùng công nghệ không đúng cách và thiếu trách nhiệm có thể gây tác động tiêu cực, như ảnh hưởng xấu đến sức khoẻ thể chất và tinh thần.',
              en: 'However, using technology the wrong way, or without {responsibility|responsible}, can have negative effects, such as harming physical and mental health.'
            },
            {
              t: 'p',
              vi: 'Nói chung, công nghệ thông tin có tác động tích cực đến con người và xã hội nhiều hơn so với tác động tiêu cực. Tuy vậy, cách chúng ta sử dụng sẽ quyết định tác động của nó có lợi hay có hại.',
              en: 'In general, information technology has more positive than negative effects on people and society. Still, how we use it decides whether its effect is helpful or harmful.'
            }
          ]
        },
        {
          t: 'tip',
          items: [
            { vi: 'Công nghệ thông tin có tác động mạnh mẽ, đem lại những thay đổi tích cực trong xã hội, trong đó có giáo dục.', en: 'Information technology has a powerful effect, bringing positive changes to {society}, including education.' },
            { vi: 'Cần sử dụng công nghệ thông tin đúng cách để tránh những tác động tiêu cực đến cuộc sống.', en: 'It must be used properly to avoid negative effects on our lives.' }
          ]
        },
        {
          t: 'ask', style: 'alpha',
          lead: { vi: 'Em hãy:', en: 'Please:' },
          items: [
            { vi: 'Kể về một ứng dụng của công nghệ thông tin mà em thường xuyên sử dụng.', en: 'Tell us about an application of information technology you use often.' },
            { vi: 'Nêu những tác động tích cực của ứng dụng đó và cách em sử dụng nó hằng ngày.', en: 'Describe its positive effects and how you use it every day.' }
          ]
        },
        { t: 'head', kind: 'practice', vi: 'Luyện tập', en: 'Practice' },
        {
          t: 'olist', style: 'num',
          items: [
            { vi: 'Hãy tưởng tượng các hoạt động quanh em sẽ thay đổi thế nào nếu một ngày mọi bộ xử lí biến mất, các thiết bị gắn bộ xử lí không hoạt động nữa.', en: 'Imagine how the things around you would change if, one day, every {processor} vanished and all the devices that contain one stopped working.' },
            { vi: 'Hãy kể một ví dụ về kiến thức, kĩ năng hoặc nội dung thú vị, nhiều ý nghĩa mà em học được từ nguồn thông tin trên Internet.', en: 'Give an example of interesting, meaningful knowledge, a skill or some content you learned from an {Internet|internet} {source}.' }
          ]
        },
        { t: 'head', kind: 'apply', vi: 'Vận dụng', en: 'Apply' },
        { t: 'p', plain: true, vi: 'Em hãy tìm hiểu và trả lời các câu hỏi sau:', en: 'Find out and answer these questions:' },
        {
          t: 'olist', style: 'alpha',
          items: [
            { vi: 'Đồng hồ thông minh có những chức năng nào khác với đồng hồ thông thường?', en: 'What functions does a smartwatch have that an ordinary watch does not?' },
            { vi: 'Tại sao đồng hồ thông minh cần có bộ xử lí?', en: 'Why does a smartwatch need a processor?' }
          ]
        }
      ]
    },

    /* ------------------------------------------------------------ Trang 9 */
    {
      number: 9,
      blocks: [
        { t: 'head', kind: 'extra', vi: 'Mở rộng: thử nghiệm và tự kiểm tra', en: 'Extension: experiment and self-check' },
          {
            t: 'bits',
            title: { vi: 'Thử nghiệm: bit và kí tự', en: 'Try it: bits and characters' },
            vi: 'Bấm vào từng bit để đổi giữa 0 và 1, hoặc gõ một kí tự vào ô bên dưới. Máy tính lưu mỗi kí tự cơ bản bằng một byte.',
            en: 'Click each bit to switch between 0 and 1, or type a {character} in the box below. A computer stores each basic character in one byte.'
          }
        ,
        {
          t: 'quiz',
          title: { vi: 'Luyện tập', en: 'Practice' },
          items: [
            {
              id: 'q1',
              vi: 'Thiết bị nào sau đây có bộ xử lí thông tin?',
              en: 'Which of the following has an {information} {processor}?',
              options: [
                { vi: 'Thước kẻ', en: 'A ruler' },
                { vi: 'Máy ATM', en: 'An {ATM|atm}' },
                { vi: 'Quyển sách giấy', en: 'A paper book' },
                { vi: 'Cây bút chì', en: 'A pencil' }
              ],
              answer: 1,
              whyVi: 'Máy ATM là thiết bị số: nhận thẻ và lệnh của em, xử lí rồi đưa ra tiền hoặc thông tin.',
              whyEn: 'An ATM is a digital device: it takes your card and commands, processes them and gives out cash or information.'
            },
            {
              id: 'q2',
              vi: 'Ba bước làm việc của thiết bị số, theo đúng thứ tự, là gì?',
              en: 'What are the three working steps of a digital {device}, in the right order?',
              options: [
                { vi: 'Xử lí → nhập → xuất', en: 'Process → input → output' },
                { vi: 'Nhập → xử lí → xuất', en: 'Input → process → output' },
                { vi: 'Xuất → nhập → xử lí', en: 'Output → input → process' },
                { vi: 'Nhập → xuất → xử lí', en: 'Input → output → process' }
              ],
              answer: 1,
              whyVi: 'Thiết bị nhận thông tin vào trước, xử lí, rồi mới đưa thông tin ra.',
              whyEn: 'A device receives the input first, then processes it, and only then produces the output.'
            },
            {
              id: 'q3',
              vi: 'Thiết bị số dùng những chữ số nào để biểu diễn thông tin?',
              en: 'Which digits do digital devices use to represent information?',
              options: [
                { vi: '1 và 2', en: '1 and 2' },
                { vi: '0 và 1', en: '0 and 1' },
                { vi: '0 đến 9', en: '0 to 9' },
                { vi: '1 và 10', en: '1 and 10' }
              ],
              answer: 1,
              whyVi: 'Thiết bị số chỉ có hai trạng thái nên dùng hai chữ số 0 và 1 (bit).',
              whyEn: 'Digital devices have only two states, so they use the two digits 0 and 1 ({bits|bit}).'
            },
            {
              id: 'q4',
              vi: 'Cách làm nào thể hiện việc sử dụng công nghệ có trách nhiệm?',
              en: 'Which action shows {responsible} use of technology?',
              options: [
                { vi: 'Dùng chung một mật khẩu và gửi cho bạn bè', en: 'Using one password and sending it to friends' },
                { vi: 'Đặt giờ dùng thiết bị và kiểm tra nguồn tin trước khi chia sẻ', en: 'Setting time limits and checking the source before sharing news' },
                { vi: 'Chia sẻ mọi tin nhận được', en: 'Sharing every message you receive' },
                { vi: 'Thức khuya chơi trò chơi mỗi ngày', en: 'Staying up late to play games every day' }
              ],
              answer: 1,
              whyVi: 'Đặt giờ dùng và kiểm tra nguồn tin giúp em tránh lạm dụng và tránh lan truyền tin giả.',
              whyEn: 'Setting time limits and checking sources helps you avoid overuse and stops fake news from spreading.'
            }
          ]
        },
      ]
    },

    /* ----------------------------------------------------------- Trang 10 */
    {
      number: 10,
      blocks: [
        {
          t: 'summary',
          title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' },
          items: [
            { vi: 'Thiết bị số có bộ xử lí thông tin và xuất hiện ở khắp nơi.', en: 'Digital devices have an information processor and are everywhere.' },
            { vi: 'Thiết bị số làm việc theo ba bước: thông tin vào, xử lí, thông tin ra.', en: 'Digital devices work in three steps: input, processing and output.' },
            { vi: 'Thông tin trong thiết bị số được biểu diễn bằng các bit 0 và 1.', en: 'Information in digital devices is represented by bits: 0 and 1.' },
            { vi: 'Máy tính tính toán nhanh, lưu trữ nhiều, làm việc liên tục và kết nối qua mạng.', en: 'Computers calculate quickly, store a lot, work non-stop and connect over networks.' },
            { vi: 'Công nghệ số thay đổi giáo dục và xã hội, nên cần dùng một cách có trách nhiệm.', en: 'Digital technology is changing education and society, so we must use it responsibly.' }
          ]
        },
        {
          t: 'vocab',
          title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' },
          hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.',
          keys: [
            'digital', 'device', 'information', 'technology', 'process-v', 'society',
            'computer', 'processor', 'input', 'output', 'memory', 'signal',
            'bit', 'byte', 'digitisation', 'data', 'network', 'software'
          ]
        }
      ]
    }
  ]
};
