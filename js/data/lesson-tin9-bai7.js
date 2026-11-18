/* ==========================================================================
   TIN HỌC 9 — CHỦ ĐỀ 4. ỨNG DỤNG TIN HỌC
     'tin9-bai7'  Bài 7. Trình bày thông tin trong trao đổi và hợp tác (tr. 27–29)
   Trang 30 là phần mở rộng. Lời văn được biên soạn lại, không chép nguyên văn.
   ========================================================================== */
(function () {
  'use strict';
  const D = (window.TEXTBOOK = window.TEXTBOOK || {});
  D.lessons = D.lessons || {};
  D.glossary = D.glossary || {};
  const g = (word, ipa, pos, vi, ctx, en, viEx) => ({ word, ipa, pos, vi, ctx, ex: { en, vi: viEx } });

  Object.assign(D.glossary, {
    presentation: g('presentation', '/ˌprez.ənˈteɪ.ʃən/', 'n', 'bài trình chiếu, bài thuyết trình',
      'Tập hợp các trang chiếu dùng để trình bày thông tin trước người nghe.',
      'A presentation helps you explain your ideas to the group.', 'Bài trình chiếu giúp em giải thích ý tưởng cho cả nhóm.'),
    'mind-map': g('mind map', '/maɪnd mæp/', 'n', 'sơ đồ tư duy',
      'Sơ đồ có nhánh toả ra từ một ý chính, giúp trình bày và liên kết các ý tưởng.',
      'A mind map shows the whole picture on one page.', 'Sơ đồ tư duy cho thấy toàn cảnh trên một trang.'),
    collaboration: g('collaboration', '/kəˌlæb.əˈreɪ.ʃən/', 'n', 'sự cộng tác, hợp tác',
      'Nhiều người cùng làm việc để hoàn thành một mục tiêu chung.',
      'Online tools support collaboration in a team.', 'Công cụ trực tuyến hỗ trợ việc cộng tác trong nhóm.'),
    collaborate: g('collaborate', '/kəˈlæb.ə.reɪt/', 'v', 'cộng tác, cùng làm việc',
      'Cùng nhau thực hiện một công việc hay dự án.',
      'We collaborate on the project in real time.', 'Chúng em cùng cộng tác làm dự án theo thời gian thực.'),
    'real-time': g('real time', '/rɪəl taɪm/', 'n', 'thời gian thực',
      'Diễn ra ngay lúc đó, mọi thành viên thấy thay đổi tức thì.',
      'Edit the document together in real time.', 'Cùng chỉnh sửa tài liệu theo thời gian thực.'),
    attach: g('attach', '/əˈtætʃ/', 'v', 'đính kèm',
      'Gắn thêm tệp văn bản, ảnh, video hay trang tính vào một nội dung.',
      'You can attach a file to a node of the mind map.', 'Em có thể đính kèm tệp vào một nhánh của sơ đồ tư duy.'),
    attachment: g('attachment', '/əˈtætʃ.mənt/', 'n', 'tệp đính kèm',
      'Tệp được gắn thêm vào một nội dung khác.',
      'Each attachment explains the idea in detail.', 'Mỗi tệp đính kèm giải thích chi tiết ý tưởng.'),
    spreadsheet: g('spreadsheet', '/ˈspred.ʃiːt/', 'n', 'trang tính, bảng tính',
      'Bảng gồm hàng và cột dùng để lưu và tính toán dữ liệu.',
      'Attach a spreadsheet with the budget.', 'Đính kèm trang tính dự kiến thu chi.'),
    node: g('node', '/nəʊd/', 'n', 'nhánh, nút (của sơ đồ)',
      'Một ô chứa ý trong sơ đồ tư duy, nối với ô khác bằng đường nhánh.',
      'Add a new node to the mind map.', 'Thêm một nhánh mới vào sơ đồ tư duy.'),
    timeline: g('timeline', '/ˈtaɪm.laɪn/', 'n', 'sơ đồ dòng thời gian',
      'Sơ đồ trình bày các sự kiện theo thứ tự thời gian.',
      'A timeline suits a history topic.', 'Sơ đồ dòng thời gian phù hợp với chủ đề lịch sử.'),
    chart: g('chart', '/tʃɑːt/', 'n', 'biểu đồ',
      'Hình thể hiện số liệu một cách trực quan.',
      'Use a chart to show the numbers clearly.', 'Dùng biểu đồ để thể hiện số liệu rõ ràng.'),
    visual: g('visual tool', '/ˈvɪʒ.u.əl tuːl/', 'n', 'công cụ trực quan',
      'Hình ảnh, biểu đồ, video dùng để minh hoạ và truyền tải thông tin.',
      'Choose the visual tool that best illustrates the message.', 'Chọn công cụ trực quan minh hoạ tốt nhất thông điệp.')
  });

  D.lessons['tin9-bai7'] = {
    gradeId: 9, number: '7', book: 'Tin học 9',
    title: { vi: 'Trình bày thông tin trong trao đổi và hợp tác', en: 'Presenting information in exchange and collaboration' },
    topic: { number: '4', vi: 'Ứng dụng tin học', en: 'Applied informatics' },
    spreadLabels: ['Dự án Triển lãm tin học', 'Cách chia sẻ; đính kèm tệp; luyện tập', 'Tự kiểm tra'],
    pages: [
      { number: 27, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: { vi: 'Sau bài học này em sẽ:', en: 'After this lesson you will:' }, items: [
          { vi: 'Sử dụng được bài trình chiếu và sơ đồ tư duy trong trao đổi thông tin và hợp tác.', en: 'Be able to use a {presentation} and a {mind map|mind-map} to exchange information and {collaborate}.' },
          { vi: 'Biết được khả năng đính kèm tệp văn bản, ảnh, video, trang tính vào sơ đồ tư duy.', en: 'Know that text files, pictures, videos and {spreadsheets|spreadsheet} can be {attached|attach} to a mind map.' }
        ] },
        { t: 'p', badge: 'fire', vi: 'Dự án **Triển lãm tin học.** “Trải qua quá trình học tập môn Tin học, chúng ta đã có những hiểu biết gì và tạo được những sản phẩm nào?” Đó là câu hỏi đặt ra với các bạn học sinh lớp 9A. Để tổng kết một chặng đường học tập môn Tin học, các bạn đã quyết định tổ chức **Triển lãm tin học**. Có rất nhiều ý tưởng về sản phẩm trưng bày trong triển lãm. Có nhóm trưng bày sổ lưu niệm của lớp đã làm từ lớp 6. Có nhóm trưng bày bộ sưu tập hình ảnh về CLB Tin học được thành lập từ lớp 8. Nhóm khác lại muốn tạo sản phẩm là một số trò chơi bằng ngôn ngữ lập trình trực quan,… Nhóm ba bạn An, Minh, Khoa lựa chọn sản phẩm là bài trình bày về nội dung *Lược sử công cụ tính toán* để tham gia triển lãm.', en: 'The **Informatics Exhibition** project. “Through our study of Informatics, what do we now understand and what products have we made?” That is the question facing the students of Class 9A. To sum up their Informatics journey they decided to hold an **Informatics Exhibition**. There were many ideas for exhibits: a class keepsake album made since Grade 6; a photo collection of the Informatics Club set up in Grade 8; some games made in a visual programming language. The group of An, Minh and Khoa chose a presentation on the *History of Computing Tools*.' },
        { t: 'p', plain: true, vi: 'Việc tổ chức một hoạt động như **Triển lãm tin học** cần làm việc nhóm, cần sự cộng tác của nhiều người. Có nhiều công cụ hỗ trợ thực hiện hoạt động cộng tác, trong đó có sơ đồ tư duy và bài trình chiếu. Tuy nhiên, việc sử dụng sơ đồ tư duy hay bài trình chiếu không chỉ là vấn đề kĩ thuật, mà cần được hướng dẫn về cách làm việc hợp tác để công cụ hỗ trợ hiệu quả cho một nhóm cùng nhau thực hiện dự án.', en: 'Organising an event like the **Informatics Exhibition** needs teamwork and the {collaboration} of many people. Many tools support collaboration, among them the mind map and the presentation. But using them is not only a technical matter: you also need guidance on working together so that the tools help a whole group carry out a project effectively.' },
        { t: 'h2', n: '1', vi: 'Trình bày thông tin trong trao đổi và hợp tác', en: 'Presenting information in exchange and collaboration' },
        { t: 'activity', no: 1, title: { vi: 'Sử dụng sơ đồ tư duy hoặc bài trình chiếu để chia sẻ thông tin', en: 'Sharing information with a mind map or a presentation' },
          vi: 'Sơ đồ tư duy và bài trình chiếu là những công cụ giúp trình bày thông tin trong trao đổi và hợp tác. Em hãy cho biết có thể sử dụng các công cụ này như thế nào cho việc trình bày nội dung *Lược sử công cụ tính toán* trong **Triển lãm tin học**.',
          en: 'Mind maps and presentations help you present information when exchanging ideas and collaborating. How can these tools be used to present *History of Computing Tools* at the **Informatics Exhibition**?' },
        { t: 'p', badge: 'book', vi: 'Sơ đồ tư duy hay bài trình chiếu đều là những công cụ hiệu quả để trình bày thông tin. Để sử dụng sơ đồ tư duy hoặc bài trình chiếu trong trao đổi và hợp tác, em có thể tiến hành theo một số cách sau đây:', en: 'Both mind maps and presentations are effective tools for presenting information. To use them for exchange and collaboration you can proceed in several ways:' },
        { t: 'list', items: [
          { vi: '**Sử dụng sơ đồ tư duy hoặc bài trình chiếu để trình bày trực tiếp:** Đây là cách dễ dàng nhất để cộng tác vì em có thể diễn giải bức tranh toàn cảnh, làm rõ các nội dung chi tiết và trực tiếp trả lời các câu hỏi mà người nghe đặt ra.', en: '**Present directly with a mind map or a presentation:** This is the easiest way to collaborate, because you can explain the whole picture, clarify details and answer listeners’ questions on the spot.' }
        ] }
      ] },

      { number: 28, blocks: [
        { t: 'list', items: [
          { vi: '**Chia sẻ sơ đồ tư duy hoặc bài trình chiếu để các thành viên khác xem:** Khi không có điều kiện trình bày trực tiếp, em có thể chia sẻ sơ đồ tư duy hoặc bài trình chiếu để các thành viên khác xem. Để thuận lợi cho người xem, nên sử dụng hình ảnh, biểu đồ, video một cách hợp lí để làm rõ thông tin. Sơ đồ tư duy nên được trình bày trong một trang và có thể đính kèm tệp văn bản, hình ảnh, video, trang tính để trình bày chi tiết.', en: '**Share the mind map or presentation for others to view:** When you cannot present in person, share it so other members can look at it. To help viewers, use pictures, {charts|chart} and videos sensibly to make the information clear. A mind map should fit on one page and may have text files, pictures, videos and spreadsheets {attached|attach} for detail.' },
          { vi: '**Chia sẻ sơ đồ tư duy hoặc bài trình chiếu để các thành viên khác chủ động cập nhật:** Em có thể sử dụng phần mềm để tạo sơ đồ tư duy hoặc bài trình chiếu trực tuyến để các thành viên trong nhóm có thể chỉnh sửa. Mỗi thành viên có thể chủ động chỉnh sửa theo thời gian phù hợp với mình.', en: '**Share it so that other members can update it themselves:** Use software to make an online mind map or presentation that group members can edit. Each member can edit at a time that suits them.' },
          { vi: '**Chia sẻ sơ đồ tư duy hoặc bài trình chiếu để cộng tác theo thời gian thực:** Em có thể sử dụng phần mềm tạo sơ đồ tư duy hoặc bài trình chiếu trực tuyến để tất cả các thành viên cùng chỉnh sửa sản phẩm trực tuyến. Việc mở một kênh hội thoại để các thành viên trao đổi trong quá trình hoàn thiện sản phẩm là rất cần thiết.', en: '**Share it to collaborate in {real time|real-time}:** Use online mind-map or presentation software so that all members edit the product together online. Opening a chat channel for members to talk while finishing the product is very useful.' }
        ] },
        { t: 'p', vi: 'Để sử dụng các công cụ trực quan như hình ảnh, biểu đồ và video một cách hợp lí trong trình bày thông tin, em cần chú ý:', en: 'To use {visual tools|visual} such as pictures, charts and videos sensibly when presenting information, take care to:' },
        { t: 'list', items: [
          { vi: '**Sử dụng đúng công cụ trực quan:** Sử dụng công cụ trực quan theo nguyên tắc đơn giản và rõ ràng, chọn loại công cụ minh hoạ tốt nhất để truyền tải thông điệp. Ví dụ: nếu trình bày tiến trình lịch sử thì sơ đồ dòng thời gian sẽ phát huy hiệu quả.', en: '**Use the right visual tool:** Keep it simple and clear, and pick the tool that best illustrates the message. For example, a {timeline} works well for presenting a historical process.' },
          { vi: '**Đảm bảo chất lượng dữ liệu:** Cần đảm bảo rằng công cụ trực quan có thể xem được từ khoảng cách xa. Hình ảnh phải sắc nét và có bố cục hợp lí. Có thể sử dụng màu sắc để tăng sự chú ý của người xem và cải thiện khả năng hiển thị thông tin.', en: '**Ensure the quality of the data:** The visual tool must be readable from a distance. Pictures must be sharp and well laid out. Colour can be used to draw attention and improve how clearly information is shown.' }
        ] },
        { t: 'tip', items: [
          { vi: 'Em có thể sử dụng bài trình chiếu và sơ đồ tư duy trong trao đổi thông tin và hợp tác theo các cách sau: trình bày trực tiếp; chia sẻ để các thành viên khác xem độc lập; chia sẻ để các thành viên khác cập nhật độc lập; chia sẻ để cộng tác theo thời gian thực.', en: 'You can use presentations and mind maps to exchange information and collaborate by: presenting directly; sharing for others to view on their own; sharing for others to update on their own; sharing to collaborate in real time.' },
          { vi: 'Để sử dụng hình ảnh, biểu đồ và video hợp lí, em cần chú ý: sử dụng đúng công cụ trực quan; đảm bảo chất lượng dữ liệu.', en: 'To use pictures, charts and videos sensibly: use the right visual tool and ensure the quality of the data.' }
        ] },
        { t: 'p', plain: true, vi: 'Em hãy chỉ ra những kiến thức về tạo sơ đồ tư duy và bài trình chiếu mà em cần được bổ sung để việc trao đổi, hợp tác được hiệu quả.', en: 'Point out what you still need to learn about making mind maps and presentations so that exchange and collaboration are effective.' },
        { t: 'h2', n: '2', vi: 'Khả năng đính kèm tệp văn bản, ảnh, video, trang tính vào sơ đồ tư duy', en: 'Attaching text files, pictures, videos and spreadsheets to a mind map' },
        { t: 'p', badge: 'book', vi: 'Khi tạo sơ đồ tư duy bằng phần mềm, em có thể đính kèm tệp văn bản, hình ảnh, video và trang tính vào sơ đồ tư duy để minh hoạ chi tiết cho nội dung cần trình bày. Hình 7.1 minh hoạ sơ đồ tư duy mà nhóm các bạn An, Minh, Khoa trình bày ý tưởng về nội dung *Lược sử công cụ tính toán*, trong đó một số nhánh của sơ đồ có đính kèm dữ liệu. Thao tác đính kèm dữ liệu sẽ được hướng dẫn cụ thể trong Bài 8.', en: 'When you make a mind map with software you can {attach|attach} text files, pictures, videos and {spreadsheets|spreadsheet} to it to illustrate the content in detail. Figure 7.1 shows the mind map in which An, Minh and Khoa present their idea on the *History of Computing Tools*; some {nodes|node} carry attached data. How to attach data is explained in Lesson 8.' }
      ] },

      { number: 29, blocks: [
        { t: 'fig', art: 'mind71', no: '7.1', vi: 'Sơ đồ tư duy trình bày ý tưởng Triển lãm tin học của nhóm An, Minh và Khoa', en: 'The mind map presenting the Informatics Exhibition idea of An, Minh and Khoa', wide: true },
        { t: 'tip', items: [{ vi: 'Có thể đính kèm tệp văn bản, hình ảnh, video, trang tính vào sơ đồ tư duy giúp trình bày thông tin đầy đủ và hiệu quả.', en: 'Attaching text files, pictures, videos and spreadsheets to a mind map helps present information fully and effectively.' }], plain: true },
        { t: 'p', plain: true, vi: 'Em hãy chỉ ra các loại dữ liệu được đính kèm vào sơ đồ tư duy ở Hình 7.1.', en: 'Point out the kinds of data attached to the mind map in Figure 7.1.' },
        { t: 'head', kind: 'practice', vi: 'Luyện tập', en: 'Practice' },
        { t: 'olist', style: 'num', items: [
          { vi: 'Em hãy nhận xét về tính hợp lí và lợi ích của những dữ liệu đính kèm trong sơ đồ tư duy ở Hình 7.1 khi trình bày thông tin trong trao đổi và hợp tác.', en: 'Comment on how sensible and useful the attached data in the mind map in Figure 7.1 are when presenting information in exchange and collaboration.' },
          { vi: 'Em hãy nêu những cách mà nhóm các bạn An, Minh và Khoa sử dụng sơ đồ tư duy ở Hình 7.1 trong trao đổi và hợp tác để hoàn thành công việc chuẩn bị nội dung *Lược sử công cụ tính toán* cho **Triển lãm tin học**.', en: 'State the ways An, Minh and Khoa can use the mind map in Figure 7.1 to exchange ideas and collaborate to finish preparing *History of Computing Tools* for the **Informatics Exhibition**.' }
        ] },
        { t: 'head', kind: 'apply', vi: 'Vận dụng', en: 'Apply' },
        { t: 'p', plain: true, vi: 'Em hãy tạo sơ đồ tư duy trình bày nội dung mà em muốn trưng bày trong **Triển lãm tin học**. Hãy ghi ra những thông tin dạng văn bản, hình ảnh, video và trang tính cần đính kèm vào sơ đồ tư duy để minh hoạ chi tiết cho nội dung mà em đã chọn. Hãy chia sẻ sơ đồ tư duy với các bạn cùng nhóm theo cách phù hợp với em.', en: 'Make a mind map presenting what you want to show at the **Informatics Exhibition**. List the text, pictures, videos and spreadsheets to attach to it to illustrate your chosen content in detail. Share the mind map with your group in a way that suits you.' }
      ] },

      { number: 30, blocks: [
        { t: 'head', kind: 'extra', vi: 'Mở rộng: tự kiểm tra', en: 'Extension: self-check' },
        { t: 'quiz', title: { vi: 'Luyện tập', en: 'Practice' }, items: [
          { id: 'q1', vi: 'Muốn cả nhóm cùng sửa một sơ đồ tư duy ngay lúc đó, em nên làm gì?', en: 'To let the whole group edit one mind map at the same moment, you should:',
            options: [{ vi: 'Chia sẻ để cộng tác theo thời gian thực', en: 'Share it for real-time collaboration' }, { vi: 'Chỉ in ra giấy', en: 'Just print it' }, { vi: 'Gửi ảnh chụp màn hình', en: 'Send a screenshot' }, { vi: 'Không chia sẻ', en: 'Not share it' }],
            answer: 0, whyVi: 'Phần mềm trực tuyến cho phép mọi thành viên cùng chỉnh sửa theo thời gian thực.', whyEn: 'Online software lets every member edit in real time.' },
          { id: 'q2', vi: 'Trình bày tiến trình lịch sử, công cụ trực quan phù hợp nhất là gì?', en: 'To present a historical process, which visual tool suits best?',
            options: [{ vi: 'Sơ đồ dòng thời gian', en: 'A timeline' }, { vi: 'Ảnh nền ngẫu nhiên', en: 'A random background picture' }, { vi: 'Biểu đồ tròn bất kì', en: 'Any pie chart' }, { vi: 'Chỉ chữ nhỏ', en: 'Only small text' }],
            answer: 0, whyVi: 'Sơ đồ dòng thời gian thể hiện các sự kiện theo thứ tự thời gian.', whyEn: 'A timeline shows events in time order.' },
          { id: 'q3', vi: 'Dữ liệu nào có thể đính kèm vào nhánh của sơ đồ tư duy?', en: 'Which data can be attached to a node of a mind map?',
            options: [{ vi: 'Tệp văn bản, ảnh, video, trang tính', en: 'Text files, pictures, videos, spreadsheets' }, { vi: 'Chỉ ảnh', en: 'Only pictures' }, { vi: 'Không thể đính kèm', en: 'Nothing can be attached' }, { vi: 'Chỉ video', en: 'Only videos' }],
            answer: 0, whyVi: 'Bài học nêu rõ bốn loại dữ liệu này.', whyEn: 'The lesson names these four kinds of data.' }
        ] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          { vi: 'Sơ đồ tư duy và bài trình chiếu giúp trình bày thông tin, trao đổi và hợp tác.', en: 'Mind maps and presentations help present information, exchange ideas and collaborate.' },
          { vi: 'Bốn cách dùng: trình bày trực tiếp; chia sẻ để xem; chia sẻ để cập nhật; cộng tác thời gian thực.', en: 'Four ways: present directly; share to view; share to update; collaborate in real time.' },
          { vi: 'Dùng đúng công cụ trực quan, đảm bảo chất lượng dữ liệu; có thể đính kèm tệp, ảnh, video, trang tính.', en: 'Use the right visual tool and good data quality; files, pictures, videos and spreadsheets can be attached.' }
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.',
          keys: ['presentation', 'mind-map', 'collaboration', 'collaborate', 'real-time', 'attach', 'attachment', 'spreadsheet', 'node', 'timeline', 'chart', 'visual'] }
      ] }
    ]
  };
})();
