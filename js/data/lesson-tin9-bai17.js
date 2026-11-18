/* ==========================================================================
   TIN HỌC 9 — CHỦ ĐỀ 6. HƯỚNG NGHIỆP VỚI TIN HỌC
     'tin9-bai17'  Bài 17. Tin học và thế giới nghề nghiệp (tr. 68–71)
   NỘI DUNG NGUYÊN BẢN do nhóm dự án soạn theo tên bài và yêu cầu cần đạt của Chương trình
   Tin học 2018; thông tin về nghề chỉ mang tính giới thiệu, cần cập nhật theo thực tế.
   ========================================================================== */
(function () {
  'use strict';
  const D = (window.TEXTBOOK = window.TEXTBOOK || {});
  D.lessons = D.lessons || {};
  D.glossary = D.glossary || {};
  const g = (word, ipa, pos, vi, ctx, en, viEx) => ({ word, ipa, pos, vi, ctx, ex: { en, vi: viEx } });
  const P = (vi, en, x) => Object.assign({ t: 'p', vi, en }, x || {});
  const Q = (id, vi, en, opts, answer, whyVi, whyEn) => ({ id, vi, en, options: opts.map((o) => ({ vi: o[0], en: o[1] })), answer, whyVi, whyEn });

  Object.assign(D.glossary, {
    career: g('career', '/kəˈrɪər/', 'n', 'nghề nghiệp, sự nghiệp',
      'Công việc lâu dài của một người, gắn với kiến thức và kĩ năng.',
      'She wants a career in software.', 'Bạn ấy muốn theo nghề phần mềm.'),
    'it-industry': g('IT industry', '/ˌaɪˈtiː ˈɪn.də.stri/', 'n', 'ngành công nghệ thông tin',
      'Lĩnh vực tạo ra và vận hành phần cứng, phần mềm, mạng và dịch vụ số.',
      'The IT industry needs many kinds of workers.', 'Ngành công nghệ thông tin cần nhiều loại người lao động.'),
    'software-developer': g('software developer', '/ˈsɒft.weər dɪˈvel.ə.pər/', 'n', 'lập trình viên, người phát triển phần mềm',
      'Người thiết kế, viết và kiểm thử phần mềm.',
      'A software developer writes and tests programs.', 'Lập trình viên viết và kiểm thử chương trình.'),
    'network-engineer': g('network engineer', '/ˈnet.wɜːk ˌen.dʒɪˈnɪər/', 'n', 'kĩ sư mạng',
      'Người thiết kế, lắp đặt và bảo trì hệ thống mạng máy tính.',
      'A network engineer keeps the school network running.', 'Kĩ sư mạng giữ cho mạng trường hoạt động.'),
    'data-analyst': g('data analyst', '/ˈdeɪ.tə ˈæn.ə.lɪst/', 'n', 'chuyên viên phân tích dữ liệu',
      'Người thu thập, làm sạch và đọc dữ liệu để rút ra kết luận.',
      'A data analyst finds patterns in numbers.', 'Chuyên viên phân tích dữ liệu tìm quy luật trong các con số.'),
    'security-specialist': g('security specialist', '/sɪˈkjʊə.rɪ.ti ˈspeʃ.ə.lɪst/', 'n', 'chuyên gia an toàn thông tin',
      'Người bảo vệ hệ thống và dữ liệu khỏi truy cập và tấn công trái phép.',
      'A security specialist protects user accounts.', 'Chuyên gia an toàn thông tin bảo vệ tài khoản người dùng.'),
    'digital-designer': g('digital designer', '/ˈdɪdʒ.ɪ.təl dɪˈzaɪ.nər/', 'n', 'nhà thiết kế số',
      'Người tạo ra hình ảnh, giao diện, video hoặc trò chơi bằng công cụ máy tính.',
      'A digital designer draws the app screens.', 'Nhà thiết kế số vẽ các màn hình của ứng dụng.'),
    skill: g('skill', '/skɪl/', 'n', 'kĩ năng',
      'Khả năng làm tốt một việc nhờ luyện tập.',
      'Teamwork is an important skill.', 'Làm việc nhóm là một kĩ năng quan trọng.'),
    'lifelong-learning': g('lifelong learning', '/ˈlaɪf.lɒŋ ˈlɜː.nɪŋ/', 'n', 'học tập suốt đời',
      'Luôn học thêm kiến thức mới trong suốt cuộc đời làm việc.',
      'Technology changes, so lifelong learning matters.', 'Công nghệ thay đổi nên học tập suốt đời rất quan trọng.'),
    'job-market': g('job market', '/dʒɒb ˈmɑː.kɪt/', 'n', 'thị trường lao động',
      'Nơi người cần việc và nơi cần người gặp nhau; cho biết nghề nào đang cần nhiều nhân lực.',
      'The job market needs more data analysts.', 'Thị trường lao động cần thêm chuyên viên phân tích dữ liệu.'),
    'career-path': g('career path', '/kəˈrɪər pɑːθ/', 'n', 'con đường nghề nghiệp',
      'Chuỗi học tập và công việc dẫn tới một nghề.',
      'Choose a career path that fits your strengths.', 'Hãy chọn con đường nghề nghiệp hợp với thế mạnh của em.')
  });

  D.lessons['tin9-bai17'] = {
    gradeId: 9, number: '17', book: 'Tin học 9',
    title: { vi: 'Tin học và thế giới nghề nghiệp', en: 'Informatics and the world of work' },
    topic: { number: '6', vi: 'Hướng nghiệp với tin học', en: 'Careers in informatics' },
    spreadLabels: ['Tin học trong đời sống nghề nghiệp; các nhóm nghề', 'Kĩ năng, con đường học tập; tự kiểm tra'],
    pages: [
      { number: 68, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: { vi: 'Sau bài học này em sẽ:', en: 'After this lesson you will:' }, items: [
          { vi: 'Kể được một số nghề trong ngành công nghệ thông tin và nghề khác có dùng tin học.', en: 'Name some jobs in the {IT industry|it-industry} and other jobs that use informatics.' },
          { vi: 'Nêu được kĩ năng, con đường học tập và yêu cầu đạo đức của các nghề đó để bước đầu chọn hướng đi.', en: 'State the {skills|skill}, learning {paths|career-path} and {ethics|ethics} of those jobs so you can begin choosing a direction.' }
        ] },
        P('Hầu hết nghề nghiệp ngày nay đều dùng máy tính: bác sĩ xem ảnh chụp bằng phần mềm, nông dân theo dõi thời tiết bằng điện thoại, người bán hàng nhận đơn qua mạng. Hiểu thế giới nghề nghiệp giúp em biết nên học gì ở trường để chuẩn bị cho tương lai.',
          'Almost every {career|career} today uses computers: doctors read scans with software, farmers follow the weather on phones, shop owners take orders online. Understanding the world of work helps you know what to learn at school to prepare for the future.', { badge: 'fire' }),
        { t: 'h2', n: '1', vi: 'Các nhóm nghề liên quan đến tin học', en: 'Groups of jobs related to informatics' },
        { t: 'activity', no: 1, title: { vi: 'Ai đứng sau ứng dụng em dùng?', en: 'Who is behind the app you use?' },
          vi: 'Em hãy chọn một ứng dụng hoặc trò chơi em hay dùng. Theo em, những ai đã tham gia làm ra và duy trì ứng dụng đó? Mỗi người làm công việc gì?',
          en: 'Pick an app or game you often use. Who do you think helped to make and run it? What does each person do?', items: [], style: 'plain' },
        { t: 'fig', art: 'job17a', no: '17.1', vi: 'Các nhóm nghề liên quan đến tin học', en: 'Groups of jobs related to informatics', wide: true }
      ] },

      { number: 69, blocks: [
        { t: 'h3', vi: 'Bảng 17.1. Một số nghề tiêu biểu', en: 'Table 17.1. Some typical jobs' },
        { t: 'table', head: true, rows: [
          [{ vi: 'Nghề', en: 'Job' }, { vi: 'Công việc chính', en: 'Main work' }, { vi: 'Kiến thức, kĩ năng nổi bật', en: 'Key knowledge and skills' }],
          [{ vi: 'Lập trình viên', en: 'Software developer' }, { vi: 'Thiết kế, viết, kiểm thử và bảo trì phần mềm.', en: 'Designs, writes, tests and maintains software.' }, { vi: 'Thuật toán, ngôn ngữ lập trình, tư duy logic.', en: 'Algorithms, programming languages, logical thinking.' }],
          [{ vi: 'Kĩ sư mạng', en: 'Network engineer' }, { vi: 'Lắp đặt, cấu hình và giữ cho mạng hoạt động ổn định.', en: 'Installs, configures and keeps networks running.' }, { vi: 'Mạng máy tính, thiết bị mạng, xử lí sự cố.', en: 'Computer networks, network devices, troubleshooting.' }],
          [{ vi: 'Chuyên viên phân tích dữ liệu', en: 'Data analyst' }, { vi: 'Thu thập, làm sạch, phân tích và trình bày dữ liệu.', en: 'Collects, cleans, analyses and presents data.' }, { vi: 'Bảng tính, thống kê, trực quan hoá dữ liệu.', en: 'Spreadsheets, statistics, data visualisation.' }],
          [{ vi: 'Chuyên gia an toàn thông tin', en: 'Security specialist' }, { vi: 'Phát hiện nguy cơ, bảo vệ hệ thống và dữ liệu.', en: 'Spots risks and protects systems and data.' }, { vi: 'An toàn thông tin, pháp luật, cẩn trọng.', en: 'Information security, the law, carefulness.' }],
          [{ vi: 'Nhà thiết kế số', en: 'Digital designer' }, { vi: 'Thiết kế giao diện, đồ hoạ, video, trò chơi.', en: 'Designs interfaces, graphics, videos and games.' }, { vi: 'Mĩ thuật, phần mềm đồ hoạ, sáng tạo.', en: 'Art, graphics software, creativity.' }]
        ] },
        P('Ngoài ra còn rất nhiều nghề không thuộc ngành công nghệ thông tin nhưng cần tin học: kế toán dùng bảng tính, kiến trúc sư dùng phần mềm thiết kế, giáo viên dùng học liệu số, nhà báo dùng công cụ biên tập. Những người này vừa giỏi chuyên môn vừa dùng tin học thành thạo.',
          'Many more jobs are outside the IT industry but still need informatics: accountants use spreadsheets, architects use design software, teachers use digital resources, journalists use editing tools. These people are good at their own field and also skilled with computers.'),
        { t: 'ex', kind: 'example', no: 1, body: [
          P('Bạn An thích phân tích số liệu khảo sát và vẽ biểu đồ, ít thích viết chương trình dài. Những nghề nào trong Bảng 17.1 phù hợp hơn?', 'An enjoys analysing survey data and drawing charts but not writing long programs. Which jobs in Table 17.1 fit better?')
        ], solution: [
          P('Chuyên viên phân tích dữ liệu phù hợp nhất vì dùng bảng tính, thống kê và biểu đồ (đúng với các kĩ năng ở Bài 10a–13a). Nhà thiết kế số có thể phù hợp nếu An thích trình bày đẹp. Việc chọn nghề nên dựa trên sở thích, năng lực và cơ hội việc làm, không chỉ một yếu tố.', 'A {data analyst|data-analyst} fits best because the work uses spreadsheets, statistics and charts (the skills of Lessons 10a–13a). A {digital designer|digital-designer} may fit if An likes attractive presentation. Choosing a job should rest on interests, abilities and job opportunities, not just one factor.')
        ] }
      ] },

      { number: 70, blocks: [
        { t: 'h2', n: '2', vi: 'Kĩ năng, đạo đức và con đường học tập', en: 'Skills, ethics and learning paths' },
        { t: 'h3', vi: 'Kĩ năng cần có', en: 'Skills you need' },
        { t: 'list', items: [
          { vi: '**Tư duy máy tính**: chia nhỏ vấn đề, viết thuật toán, kiểm tra kết quả (Bài 14–16).', en: '**Computational thinking**: decompose problems, write algorithms, test results (Lessons 14–16).' },
          { vi: '**Làm việc nhóm và giao tiếp**: trình bày rõ ràng, phối hợp qua công cụ số.', en: '**Teamwork and communication**: present clearly and cooperate through digital tools.' },
          { vi: '**Tiếng Anh**: tài liệu và thuật ngữ công nghệ phần lớn bằng tiếng Anh.', en: '**English**: most technology documents and terms are in English.' },
          { vi: '**Học tập suốt đời**: công nghệ đổi mới liên tục nên phải thường xuyên học thêm.', en: '**{Lifelong learning|lifelong-learning}**: technology keeps changing, so you must keep learning.' }
        ] },
        { t: 'h3', vi: 'Đạo đức nghề nghiệp', en: 'Professional ethics' },
        P('Người làm nghề tin học có thể tiếp cận dữ liệu của nhiều người. Vì vậy họ phải tôn trọng quyền riêng tư, tôn trọng bản quyền, không xâm nhập hệ thống khi chưa được phép và trung thực về chất lượng sản phẩm. Những yêu cầu này gắn với các quy định pháp luật em đã học ở Bài 4.',
          'People working in informatics can reach the data of many users. So they must respect privacy and copyright, never break into a system without permission and be honest about product quality. These requirements link with the legal rules you learnt in Lesson 4.'),
        { t: 'h3', vi: 'Con đường học tập', en: 'Learning paths' },
        P('Ở trường phổ thông, em học Tin học, Toán và tiếng Anh vững vàng; có thể tham gia câu lạc bộ lập trình, cuộc thi khoa học kĩ thuật. Sau phổ thông, em có thể học đại học, cao đẳng hoặc trường nghề thuộc các ngành về công nghệ thông tin, khoa học dữ liệu, an toàn thông tin hoặc ngành chuyên môn có ứng dụng tin học. Các chương trình đào tạo thay đổi, em nên tìm hiểu thông tin cập nhật trên trang web chính thức của nhà trường và cơ quan quản lí giáo dục.',
          'At school, build strong Informatics, Mathematics and English; join a programming club or a science and engineering contest. After school you can study at a university, college or vocational school in IT, data science, information security or a specialist field that uses informatics. Programmes change, so look up current information on the official websites of schools and education authorities.'),
        { t: 'tip', items: [
          { vi: 'Hãy xem thị trường lao động như một nguồn thông tin tham khảo, không phải lệnh phải theo. Nghề phù hợp là nghề em có hứng thú, có năng lực và có cơ hội phát triển.', en: 'Treat the {job market|job-market} as a source of reference, not an order to obey. A suitable job is one you enjoy, can do well and can grow in.' }
        ] }
      ] },

      { number: 71, blocks: [
        { t: 'head', kind: 'practice', vi: 'Luyện tập và vận dụng', en: 'Practice and apply' },
        { t: 'ex', kind: 'practice', no: 1, body: [
          P('Nối nghề với công việc chính: (1) kĩ sư mạng; (2) chuyên gia an toàn thông tin; (3) nhà thiết kế số; (a) bảo vệ dữ liệu khỏi truy cập trái phép; (b) lắp đặt và giữ mạng hoạt động; (c) thiết kế giao diện và đồ hoạ.', 'Match each job with its main work: (1) network engineer; (2) security specialist; (3) digital designer; (a) protects data from unauthorised access; (b) installs and keeps networks running; (c) designs interfaces and graphics.')
        ], solution: [P('(1)–(b); (2)–(a); (3)–(c).', '(1)–(b); (2)–(a); (3)–(c).')] },
        { t: 'ex', kind: 'apply', no: 1, body: [
          P('Em hãy lập bảng thông tin về một nghề em quan tâm gồm: công việc chính, kĩ năng cần có, môn học liên quan, con đường học tập và yêu cầu đạo đức. Trình bày bằng bảng tính hoặc phần mềm trình chiếu trong 2 phút.', 'Make an information table about a job you are interested in: main work, needed skills, related subjects, learning path and ethical requirements. Present it in a spreadsheet or slides in 2 minutes.')
        ] },
        { t: 'quiz', title: { vi: 'Tự kiểm tra', en: 'Self-check' }, items: [
          Q('q1', 'Nghề nào thuộc nhóm làm ra phần mềm?', 'Which job belongs to the group that makes software?', [['Lập trình viên', 'Software developer'], ['Kế toán', 'Accountant'], ['Lái xe', 'Driver'], ['Thợ may', 'Tailor']], 0, 'Lập trình viên thiết kế, viết và kiểm thử phần mềm.', 'A software developer designs, writes and tests software.'),
          Q('q2', 'Nghề nào chủ yếu bảo vệ hệ thống và dữ liệu khỏi tấn công?', 'Which job mainly protects systems and data from attacks?', [['Nhà thiết kế số', 'Digital designer'], ['Chuyên gia an toàn thông tin', 'Security specialist'], ['Chuyên viên phân tích dữ liệu', 'Data analyst'], ['Nhà báo', 'Journalist']], 1, 'Đó là nhiệm vụ của chuyên gia an toàn thông tin.', 'That is the work of a security specialist.'),
          Q('q3', 'Công việc nào cần dùng bảng tính và thống kê nhiều nhất?', 'Which work uses spreadsheets and statistics most?', [['Phân tích dữ liệu', 'Data analysis'], ['Chụp ảnh nghệ thuật', 'Art photography'], ['Trồng cây', 'Growing plants'], ['Lái máy bay', 'Flying a plane']], 0, 'Phân tích dữ liệu dựa trên bảng tính và thống kê.', 'Data analysis is built on spreadsheets and statistics.'),
          Q('q4', 'Vì sao học tập suốt đời quan trọng với nghề tin học?', 'Why is lifelong learning important for IT jobs?', [['Vì công nghệ thay đổi liên tục', 'Because technology keeps changing'], ['Vì không có trường học', 'Because there are no schools'], ['Vì không cần kĩ năng', 'Because no skills are needed'], ['Vì máy tính tự học thay', 'Because computers learn for you']], 0, 'Công nghệ mới xuất hiện thường xuyên.', 'New technology appears often.'),
          Q('q5', 'Điều nào thuộc đạo đức nghề nghiệp của người làm tin học?', 'Which belongs to the professional ethics of IT workers?', [['Tôn trọng quyền riêng tư của người dùng', 'Respecting users’ privacy'], ['Dùng dữ liệu người khác khi chưa được phép', 'Using other people’s data without permission'], ['Sao chép phần mềm trái phép', 'Copying software illegally'], ['Che giấu lỗi sản phẩm', 'Hiding product faults']], 0, 'Tôn trọng quyền riêng tư là chuẩn mực cơ bản.', 'Respecting privacy is a basic standard.'),
          Q('q6', 'Em nên chọn nghề dựa trên:', 'You should choose a job based on:', [['Chỉ lời bạn bè', 'Only friends’ words'], ['Sở thích, năng lực và cơ hội phát triển', 'Interests, abilities and chances to grow'], ['Chỉ mức lương hiện tại', 'Only the current salary'], ['Ngẫu nhiên', 'Chance']], 1, 'Nên cân nhắc nhiều yếu tố.', 'Weigh several factors.'),
          Q('q7', 'Nghề nào không thuộc ngành công nghệ thông tin nhưng vẫn cần tin học?', 'Which job is outside IT yet still needs informatics?', [['Kế toán dùng bảng tính', 'An accountant using spreadsheets'], ['Lập trình viên', 'Software developer'], ['Kĩ sư mạng', 'Network engineer'], ['Chuyên gia an toàn thông tin', 'Security specialist']], 0, 'Kế toán thuộc lĩnh vực tài chính nhưng dùng bảng tính hằng ngày.', 'Accounting is in finance but uses spreadsheets every day.'),
          Q('q8', 'Môn học nào hỗ trợ tốt cho học lập trình ở bậc phổ thông?', 'Which school subject supports learning programming well?', [['Toán', 'Mathematics'], ['Chỉ Thể dục', 'Only Physical Education'], ['Không môn nào', 'None'], ['Chỉ Âm nhạc', 'Only Music']], 0, 'Toán rèn tư duy logic cần cho thuật toán.', 'Mathematics trains the logical thinking needed for algorithms.')
        ] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          { vi: 'Có nhiều nhóm nghề trong ngành công nghệ thông tin và rất nhiều nghề khác cần tin học.', en: 'There are many job groups in IT and many other jobs that need informatics.' },
          { vi: 'Kĩ năng chính: tư duy máy tính, làm việc nhóm, tiếng Anh, học tập suốt đời; kèm đạo đức nghề nghiệp.', en: 'Main skills: computational thinking, teamwork, English, lifelong learning, together with professional ethics.' },
          { vi: 'Chọn nghề dựa trên sở thích, năng lực và thông tin cập nhật về con đường học tập, việc làm.', en: 'Choose a job by interests, abilities and up-to-date information on learning paths and work.' }
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.',
          keys: ['career', 'it-industry', 'software-developer', 'network-engineer', 'data-analyst', 'security-specialist', 'digital-designer', 'skill', 'lifelong-learning', 'ethics', 'job-market', 'career-path'] }
      ] }
    ]
  };
})();
