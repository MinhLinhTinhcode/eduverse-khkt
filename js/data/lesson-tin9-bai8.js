/* ==========================================================================
   TIN HỌC 9 — CHỦ ĐỀ 4. ỨNG DỤNG TIN HỌC
     'tin9-bai8'  Bài 8. Thực hành: Sử dụng công cụ trực quan trình bày
                  thông tin trong trao đổi và hợp tác (tr. 30–33)
   Trang 34 là phần mở rộng. Lời văn được biên soạn lại, không chép nguyên văn.
   ========================================================================== */
(function () {
  'use strict';
  const D = (window.TEXTBOOK = window.TEXTBOOK || {});
  D.lessons = D.lessons || {};
  D.glossary = D.glossary || {};
  const g = (word, ipa, pos, vi, ctx, en, viEx) => ({ word, ipa, pos, vi, ctx, ex: { en, vi: viEx } });

  Object.assign(D.glossary, {
    hyperlink: g('hyperlink', '/ˈhaɪ.pə.lɪŋk/', 'n', 'đường liên kết, siêu liên kết',
      'Địa chỉ gắn vào một nhánh hay trang để mở ngay trang web hoặc tệp khác, ví dụ video trên Internet.',
      'Insert a hyperlink to the video on the Internet.', 'Chèn đường liên kết đến video trên Internet.'),
    topic: g('topic', '/ˈtɒp.ɪk/', 'n', 'chủ đề (nhánh)',
      'Một nhánh trong sơ đồ tư duy hoặc nội dung chính của một bài.',
      'Create the main topic and the sub-topics.', 'Tạo chủ đề chính và các chủ đề nhánh.'),
    'slide': g('slide', '/slaɪd/', 'n', 'trang chiếu',
      'Một trang trong bài trình chiếu.',
      'Add a slide about Blaise Pascal.', 'Thêm một trang chiếu về Blaise Pascal.'),
    'insert-video': g('insert', '/ɪnˈsɜːt/', 'v', 'chèn',
      'Đưa thêm hình ảnh, video, đường liên kết vào sơ đồ hay trang chiếu.',
      'Insert a video into the slide.', 'Chèn video vào trang chiếu.'),
    'file-name': g('file name', '/faɪl neɪm/', 'n', 'tên tệp',
      'Tên dùng để lưu và nhận biết một tệp, ví dụ LuocSu.emm.',
      'Save the file with the name LuocSu.emm.', 'Lưu tệp với tên LuocSu.emm.'),
    outline: g('outline slide', '/ˈaʊt.laɪn slaɪd/', 'n', 'trang dàn ý',
      'Trang chiếu liệt kê các mục nội dung chính của bài trình chiếu.',
      'The outline slide lists five items.', 'Trang dàn ý liệt kê năm mục.'),
    dialog: g('dialog box', '/ˈdaɪ.ə.lɒɡ bɒks/', 'n', 'hộp thoại',
      'Cửa sổ nhỏ xuất hiện để em chọn tuỳ chọn hoặc nhập thông tin.',
      'Choose a file in the Open dialog box.', 'Chọn tệp trong hộp thoại Open.'),
    generation: g('generation', '/ˌdʒen.əˈreɪ.ʃən/', 'n', 'thế hệ',
      'Giai đoạn phát triển của máy tính điện tử, ví dụ thế hệ thứ nhất (1945–1955).',
      'ENIAC belongs to the first generation of computers.', 'ENIAC thuộc thế hệ máy tính đầu tiên.')
  });

  D.lessons['tin9-bai8'] = {
    gradeId: 9, number: '8', book: 'Tin học 9',
    title: { vi: 'Thực hành: Sử dụng công cụ trực quan trình bày thông tin trong trao đổi và hợp tác', en: 'Practice: Using visual tools to present information in exchange and collaboration' },
    topic: { number: '4', vi: 'Ứng dụng tin học', en: 'Applied informatics' },
    spreadLabels: ['Nhiệm vụ 1: sơ đồ tư duy có đính kèm', 'Nhiệm vụ 2, 3: bài trình chiếu', 'Tự kiểm tra'],
    pages: [
      { number: 30, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: { vi: 'Sau bài học này em sẽ:', en: 'After this lesson you will:' }, items: [
          { vi: 'Sử dụng được hình ảnh, biểu đồ, video một cách hợp lí.', en: 'Be able to use pictures, {charts|chart} and videos sensibly.' },
          { vi: 'Tạo được sơ đồ tư duy có đính kèm văn bản, hình ảnh, video và trang tính.', en: 'Make a {mind map|mind-map} with attached text, pictures, videos and spreadsheets.' },
          { vi: 'Tạo được bài trình chiếu có sử dụng hình ảnh, biểu đồ và video hợp lí.', en: 'Make a {presentation} that uses pictures, charts and videos sensibly.' }
        ] },
        { t: 'p', badge: 'fire', vi: 'Trong Bài 7 em đã biết cách sử dụng sơ đồ tư duy và bài trình chiếu trong trao đổi và hợp tác. Em cũng biết cách sử dụng hình ảnh, biểu đồ và video hợp lí để trình bày thông tin. Bài học này hướng dẫn em tạo sơ đồ tư duy có dữ liệu đính kèm và bài trình chiếu sử dụng hình ảnh, biểu đồ, video hợp lí đồng thời hướng dẫn em thực hành sử dụng bài trình chiếu và sơ đồ tư duy trong trao đổi, hợp tác.', en: 'In Lesson 7 you learned to use mind maps and presentations to exchange information and collaborate, and to use pictures, charts and videos sensibly. This lesson shows you how to make a mind map with attached data and a presentation with sensible pictures, charts and videos, and how to practise using them for exchange and collaboration.' },
        { t: 'h2', n: '1', vi: 'Nhiệm vụ 1: Sử dụng phần mềm tạo sơ đồ tư duy có đính kèm dữ liệu', en: 'Task 1: Using software to make a mind map with attached data' },
        { t: 'h3', vi: 'Yêu cầu', en: 'Requirements' },
        { t: 'p', plain: true, vi: 'Sử dụng phần mềm tạo sơ đồ tư duy như minh hoạ trong Hình 7.1 với dữ liệu đính kèm đã chuẩn bị hoặc được cung cấp, ví dụ:', en: 'Use mind-map software to make the map in Figure 7.1 with attached data that you have prepared or been given, for example:' },
        { t: 'list', items: [
          { vi: 'Tệp bảng tính có tên là KinhPhi.xlsx để tính toán chi phí triển lãm (Hình 8.1).', en: 'A {spreadsheet} file named KinhPhi.xlsx to calculate the cost of the exhibition (Figure 8.1).' },
          { vi: 'Tệp hình ảnh có tên là Pascaline.png, minh hoạ cho máy tính cơ học Pascaline.', en: 'A picture file named Pascaline.png illustrating the Pascaline mechanical calculator.' },
          { vi: 'Tệp văn bản có tên là CharlesBabbage.docx chứa tiểu sử nhà khoa học Charles Babbage.', en: 'A text file named CharlesBabbage.docx with the biography of the scientist Charles Babbage.' },
          { vi: 'Đường liên kết đến video về nhà khoa học Charles Babbage trên Internet.', en: 'A {hyperlink} to a video about Charles Babbage on the {internet}.' }
        ] },
        { t: 'fig', art: 'sheet81', no: '8.1', vi: 'Bảng tính chi phí cho phần nội dung Lược sử công cụ tính toán', en: 'The cost spreadsheet for “History of Computing Tools”' },
        { t: 'h3', vi: 'Hướng dẫn', en: 'Guide' },
        { t: 'h3', vi: 'a) Tạo sơ đồ tư duy', en: 'a) Make the mind map' },
        { t: 'list', items: [
          { vi: 'Khởi động phần mềm tạo sơ đồ tư duy MindMaple Lite.', en: 'Start the mind-map software MindMaple Lite.' },
          { vi: 'Tạo một sơ đồ tư duy mới với chủ đề chính và các chủ đề nhánh như Hình 7.1.', en: 'Create a new mind map with the main {topic} and sub-topics as in Figure 7.1.' },
          { vi: 'Lưu tệp với tên LuocSu.emm.', en: 'Save the file with the {file name|file-name} LuocSu.emm.' }
        ] },
        { t: 'h3', vi: 'b) Đính kèm tệp', en: 'b) Attach files' },
        { t: 'list', items: [
          { vi: 'Chọn nhánh của sơ đồ tư duy cần đính kèm tệp.', en: 'Select the node of the mind map to which you want to {attach|attach} a file.' },
          { vi: 'Chọn **Insert/Attachment/Attachment** như minh hoạ trong Hình 8.2.', en: 'Choose **Insert/Attachment/Attachment** as shown in Figure 8.2.' }
        ] }
      ] },

      { number: 31, blocks: [
        { t: 'fig', art: 'ribbon82', no: '8.2', vi: 'Đính kèm tệp vào sơ đồ tư duy', en: 'Attaching a file to the mind map', wide: true },
        { t: 'fig', art: 'open83', no: '8.3', vi: 'Chọn tệp từ thư mục lưu trữ để chèn vào sơ đồ tư duy', en: 'Choosing a file from the folder to insert into the mind map', wide: true },
        { t: 'list', items: [
          { vi: 'Khi hộp thoại mở tệp xuất hiện, chọn tệp cần chèn như minh hoạ ở Hình 8.3. Nháy chuột chọn **Open**. Biểu tượng tệp đính kèm xuất hiện ở nhánh của sơ đồ (Hình 7.1).', en: 'When the file-open {dialog box|dialog} appears, choose the file to insert as in Figure 8.3 and click **Open**. The attachment icon appears on the node of the map (Figure 7.1).' },
          { vi: 'Thực hiện tương tự để hoàn thành việc đính kèm các tệp văn bản, hình ảnh, bảng tính vào sơ đồ tư duy.', en: 'Do the same to attach the text, picture and spreadsheet files to the mind map.' }
        ] },
        { t: 'h3', vi: 'c) Đính kèm đường liên kết', en: 'c) Attach a hyperlink' },
        { t: 'list', items: [
          { vi: 'Chọn nhánh của sơ đồ tư duy cần đính kèm đường liên kết.', en: 'Select the node that needs the {hyperlink}.' },
          { vi: 'Chọn **Insert/Hyperlink**. Khi hộp thoại **Hyperlink** xuất hiện, sao chép đường liên kết đến video vào ô **Link to:** (Hình 8.4).', en: 'Choose **Insert/Hyperlink**. When the **Hyperlink** dialog box appears, copy the link to the video into the **Link to:** box (Figure 8.4).' }
        ] },
        { t: 'fig', art: 'link84', no: '8.4', vi: 'Chèn đường liên kết đến video trên Internet', en: 'Inserting a link to a video on the Internet', wide: true },
        { t: 'list', items: [{ vi: 'Chọn **OK** để hoàn thành việc chèn đường liên kết.', en: 'Click **OK** to finish {inserting|insert-video} the link.' }] }
      ] },

      { number: 32, blocks: [
        { t: 'h2', n: '2', vi: 'Nhiệm vụ 2: Trình bày sơ đồ tư duy', en: 'Task 2: Presenting the mind map' },
        { t: 'h3', vi: 'Yêu cầu', en: 'Requirements' },
        { t: 'p', plain: true, vi: 'Trình bày sơ đồ tư duy trước nhóm để các thành viên trao đổi, bổ sung nội dung cho sơ đồ tư duy.', en: 'Present the mind map to the group so that members can discuss and add content to it.' },
        { t: 'h3', vi: 'Hướng dẫn', en: 'Guide' },
        { t: 'list', items: [
          { vi: 'Lựa chọn một trong các cách sử dụng sơ đồ tư duy để trình bày thông tin (mà em đã học ở Bài 7). Chọn một thành viên đóng vai trò trưởng nhóm trình bày nội dung chuẩn bị về *Lược sử công cụ tính toán*.', en: 'Choose one of the ways of using a mind map to present information (learned in Lesson 7). Choose a member as group leader to present the prepared content on the *History of Computing Tools*.' },
          { vi: 'Trao đổi, thảo luận để bổ sung thêm nội dung cần chuẩn bị.', en: 'Discuss to add more content that needs preparing.' },
          { vi: 'Phân công công việc để các thành viên của nhóm tiếp tục hoàn thành những nội dung cần chuẩn bị.', en: 'Share out the work so members can continue finishing the content to be prepared.' }
        ] },
        { t: 'h2', n: '3', vi: 'Nhiệm vụ 3: Tạo bài trình chiếu có sử dụng hình ảnh, sơ đồ, video hợp lí', en: 'Task 3: Making a presentation with sensible pictures, diagrams and videos' },
        { t: 'h3', vi: 'Yêu cầu', en: 'Requirements' },
        { t: 'p', plain: true, vi: 'Tạo bài trình chiếu chủ đề *Lược sử công cụ tính toán* có sử dụng hình ảnh, sơ đồ, video hợp lí.', en: 'Make a presentation on *History of Computing Tools* that uses pictures, diagrams and videos sensibly.' },
        { t: 'h3', vi: 'Hướng dẫn', en: 'Guide' },
        { t: 'list', items: [
          { vi: 'Khởi động phần mềm trình chiếu.', en: 'Start the presentation software.' },
          { vi: 'Tạo trang tiêu đề, nhập tiêu đề *Lược sử công cụ tính toán*.', en: 'Create a title {slide}, and type the title *History of Computing Tools*.' },
          { vi: 'Tạo trang dàn ý. Nhập nội dung theo mẫu ở Hình 8.5.', en: 'Create an {outline slide|outline}. Enter the content as in Figure 8.5.' },
          { vi: 'Sử dụng mẫu có sẵn (tìm trên Internet hoặc giáo viên cung cấp) để tạo sơ đồ dòng thời gian về *Lược sử công cụ tính toán* tương tự Hình 8.6.', en: 'Use a ready-made template (found on the Internet or given by the teacher) to make a {timeline} of the *History of Computing Tools* like Figure 8.6.' }
        ] },
        { t: 'fig', art: 'outline85', no: '8.5', vi: 'Nội dung trang dàn ý', en: 'The content of the outline slide' }
      ] },

      { number: 33, blocks: [
        { t: 'fig', art: 'timeline86', no: '8.6', vi: 'Sơ đồ dòng thời gian Lược sử công cụ tính toán', en: 'Timeline of the history of computing tools', wide: true },
        { t: 'list', items: [
          { vi: 'Tạo thêm trang chiếu để trình bày nội dung về Blaise Pascal và máy tính cơ học đầu tiên. Chèn hình ảnh minh hoạ máy tính Pascaline vào trang chiếu.', en: 'Add a slide on Blaise Pascal and the first mechanical calculator. Insert a picture of the Pascaline into the slide.' },
          { vi: 'Tạo thêm trang chiếu để trình bày nội dung về Charles Babbage và máy tính đa năng. Nháy chuột chọn **Insert**, chọn **Video/Insert Video from This Device** để chèn thêm video minh hoạ đã chuẩn bị vào trang chiếu.', en: 'Add a slide on Charles Babbage and the general-purpose machine. Click **Insert**, then **Video/Insert Video from This Device** to insert the prepared video into the slide.' },
          { vi: 'Lưu bài trình chiếu với tên là LuocSuMayTinh.', en: 'Save the presentation with the name LuocSuMayTinh.' }
        ] },
        { t: 'head', kind: 'practice', vi: 'Luyện tập', en: 'Practice' },
        { t: 'ask', style: 'alpha', lead: { vi: 'Em thực hiện các yêu cầu sau với bài trình chiếu LuocSuMayTinh:', en: 'Do the following with the presentation LuocSuMayTinh:' }, items: [
          { vi: 'Lựa chọn một trong các cách sử dụng bài trình chiếu trình bày thông tin ở Bài 7 để một thành viên đóng vai trò trưởng nhóm trình bày trước tập thể.', en: 'Choose one of the ways of using a presentation from Lesson 7 so that a member acting as group leader presents to everyone.' },
          { vi: 'Các thành viên trao đổi, thảo luận để rà soát nội dung bài trình chiếu theo các yêu cầu được nêu trong Nhiệm vụ 3.', en: 'Members discuss and review the content of the presentation against the requirements of Task 3.' },
          { vi: 'Chỉnh sửa bài trình chiếu theo kết quả thảo luận ở Câu b.', en: 'Edit the presentation according to the result of the discussion in part b.' }
        ] },
        { t: 'head', kind: 'apply', vi: 'Vận dụng', en: 'Apply' },
        { t: 'p', plain: true, vi: 'Em hãy sử dụng phần mềm để bổ sung vào bài trình chiếu LuocSuMayTinh nội dung về đặc điểm của máy tính từng thế hệ. Yêu cầu: Sử dụng công cụ trực quan một cách hợp lí. Sau đó hãy phân công một bạn trong nhóm chia sẻ bài trình chiếu với các bạn khác để cùng hoàn chỉnh sản phẩm cho **Triển lãm tin học**.', en: 'Use software to add to LuocSuMayTinh the characteristics of each {generation|generation} of computers. Requirement: use visual tools sensibly. Then assign a group member to share the presentation with the others to finish the product together for the **Informatics Exhibition**.' }
      ] },

      { number: 34, blocks: [
        { t: 'head', kind: 'extra', vi: 'Mở rộng: tự kiểm tra', en: 'Extension: self-check' },
        { t: 'quiz', title: { vi: 'Luyện tập', en: 'Practice' }, items: [
          { id: 'q1', vi: 'Để đính kèm tệp vào một nhánh của sơ đồ tư duy, em chọn lệnh nào?', en: 'Which command attaches a file to a node of the mind map?',
            options: [{ vi: 'Insert/Attachment/Attachment', en: 'Insert/Attachment/Attachment' }, { vi: 'File/Print', en: 'File/Print' }, { vi: 'View/Zoom', en: 'View/Zoom' }, { vi: 'Review/Spelling', en: 'Review/Spelling' }],
            answer: 0, whyVi: 'Theo Hình 8.2, lệnh đính kèm nằm ở thẻ Insert.', whyEn: 'In Figure 8.2 the attach command is on the Insert tab.' },
          { id: 'q2', vi: 'Muốn gắn đường liên kết video vào nhánh, em chọn lệnh nào?', en: 'Which command adds a video link to a node?',
            options: [{ vi: 'Insert/Hyperlink', en: 'Insert/Hyperlink' }, { vi: 'Home/Bold', en: 'Home/Bold' }, { vi: 'Tools/Options', en: 'Tools/Options' }, { vi: 'File/Exit', en: 'File/Exit' }],
            answer: 0, whyVi: 'Dán đường liên kết vào ô Link to của hộp thoại Hyperlink.', whyEn: 'Paste the link into the Link to box of the Hyperlink dialog box.' },
          { id: 'q3', vi: 'Để chèn video có sẵn trong máy vào trang chiếu, em dùng lệnh nào?', en: 'To insert a video stored on the computer into a slide, use:',
            options: [{ vi: 'Insert/Video/Insert Video from This Device', en: 'Insert/Video/Insert Video from This Device' }, { vi: 'Design/Themes', en: 'Design/Themes' }, { vi: 'View/Ruler', en: 'View/Ruler' }, { vi: 'File/Close', en: 'File/Close' }],
            answer: 0, whyVi: 'Đây là lệnh được nêu trong Nhiệm vụ 3.', whyEn: 'This is the command given in Task 3.' }
        ] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          { vi: 'Sơ đồ tư duy có thể đính kèm tệp (Insert/Attachment) và đường liên kết (Insert/Hyperlink).', en: 'A mind map can carry attached files (Insert/Attachment) and hyperlinks (Insert/Hyperlink).' },
          { vi: 'Bài trình chiếu gồm trang tiêu đề, trang dàn ý, sơ đồ dòng thời gian, hình ảnh và video.', en: 'A presentation has a title slide, an outline slide, a timeline, pictures and videos.' },
          { vi: 'Trình bày, thảo luận, phân công và chỉnh sửa cùng nhóm để hoàn thiện sản phẩm.', en: 'Present, discuss, share out work and edit together to finish the product.' }
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.',
          keys: ['hyperlink', 'topic', 'slide', 'insert-video', 'file-name', 'outline', 'dialog', 'generation', 'attach', 'timeline', 'mind-map', 'presentation'] }
      ] }
    ]
  };
})();
