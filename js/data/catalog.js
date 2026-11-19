/* ==========================================================================
   DANH MỤC KHỐI LỚP VÀ BÀI HỌC
   --------------------------------------------------------------------------
   - Khối lớp có `available: true` mới mở được.
   - Bài học có trường `content` (trỏ tới một bài trong TEXTBOOK.lessons)
     là bài đã sẵn sàng; bài không có `content` sẽ hiện "Đang cập nhật".
   - Để thêm bài mới: viết file js/data/lesson-....js rồi thêm `content`
     vào đúng bài ở dưới (xem README.md).
   ========================================================================== */
window.TEXTBOOK = window.TEXTBOOK || {};
window.TEXTBOOK.lessons = window.TEXTBOOK.lessons || {};

window.TEXTBOOK.grades = [
  { id: 6, slug: 'lop-6', subject: 'Tin học 6', available: false },
  { id: 7, slug: 'lop-7', subject: 'Tin học 7', available: false },
  { id: 8, slug: 'lop-8', subject: 'Tin học 8', available: false },
  {
    id: 9,
    slug: 'lop-9',
    subject: 'Tin học 9',
    label: 'Tin 9',
    short: 'Tin học',
    subjectEn: 'Informatics 9',
    available: true,
    topics: [
      {
        vi: 'Máy tính và cộng đồng',
        en: 'Computers and the community',
        lessons: [
          { slug: 'bai-1', number: '1', vi: 'Thế giới kĩ thuật số', en: 'The digital world', content: 'tin9-bai1' }
        ]
      },
      {
        vi: 'Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
        en: 'Organising, searching and exchanging information',
        lessons: [
          { slug: 'bai-2', number: '2', vi: 'Thông tin trong giải quyết vấn đề', en: 'Information in problem solving', content: 'tin9-bai2' },
          { slug: 'bai-3', number: '3', vi: 'Thực hành: Đánh giá chất lượng thông tin', en: 'Practice: Evaluating the quality of information', content: 'tin9-bai3' }
        ]
      },
      {
        vi: 'Đạo đức, pháp luật và văn hoá trong môi trường số',
        en: 'Ethics, law and culture in the digital environment',
        lessons: [
          { slug: 'bai-4', number: '4', vi: 'Một số vấn đề pháp lí về sử dụng dịch vụ Internet', en: 'Legal issues in using Internet services', content: 'tin9-bai4' }
        ]
      },
      {
        vi: 'Ứng dụng tin học',
        en: 'Applications of informatics',
        lessons: [
          { slug: 'bai-5', number: '5', vi: 'Tìm hiểu phần mềm mô phỏng', en: 'Exploring simulation software', content: 'tin9-bai5' },
          { slug: 'bai-6', number: '6', vi: 'Thực hành: Khai thác phần mềm mô phỏng', en: 'Practice: Using simulation software', content: 'tin9-bai6' },
          { slug: 'bai-7', number: '7', vi: 'Trình bày thông tin trong trao đổi và hợp tác', en: 'Presenting information when communicating and collaborating', content: 'tin9-bai7' },
          { slug: 'bai-8', number: '8', vi: 'Thực hành: Sử dụng công cụ trực quan trình bày thông tin trong trao đổi và hợp tác', en: 'Practice: Using visual tools to present information', content: 'tin9-bai8' },
          { slug: 'bai-9a', number: '9a', vi: 'Sử dụng công cụ xác thực dữ liệu', en: 'Using data validation tools', content: 'tin9-bai9a' },
          { slug: 'bai-10a', number: '10a', vi: 'Sử dụng hàm COUNTIF', en: 'Using the COUNTIF function', content: 'tin9-bai10a' },
          { slug: 'bai-11a', number: '11a', vi: 'Sử dụng hàm SUMIF', en: 'Using the SUMIF function', content: 'tin9-bai11a' },
          { slug: 'bai-12a', number: '12a', vi: 'Sử dụng hàm IF', en: 'Using the IF function', content: 'tin9-bai12a' },
          { slug: 'bai-13a', number: '13a', vi: 'Hoàn thiện bảng tính quản lí tài chính gia đình', en: 'Completing a family finance spreadsheet', content: 'tin9-bai13a' }
        ]
      },
      {
        vi: 'Giải quyết vấn đề với sự trợ giúp của máy tính',
        en: 'Solving problems with the help of computers',
        lessons: [
          { slug: 'bai-14', number: '14', vi: 'Giải quyết vấn đề', en: 'Problem solving', content: 'tin9-bai14' },
          { slug: 'bai-15', number: '15', vi: 'Bài toán tin học', en: 'Computing problems', content: 'tin9-bai15' },
          { slug: 'bai-16', number: '16', vi: 'Thực hành: Lập chương trình máy tính', en: 'Practice: Writing a computer program', content: 'tin9-bai16' }
        ]
      },
      {
        vi: 'Hướng nghiệp với tin học',
        en: 'Careers in informatics',
        lessons: [
          { slug: 'bai-17', number: '17', vi: 'Tin học và thế giới nghề nghiệp', en: 'Informatics and the world of work', content: 'tin9-bai17' }
        ]
      }
    ]
  }
  ,
  {
    id: 9,
    slug: 'toan-9',
    subject: 'Toán 9',
    subjectEn: 'Mathematics 9',
    label: 'Toán 9',
    short: 'Toán',
    available: true,
    topics: [
      {
        vi: 'Chương I. Phương trình và hệ hai phương trình bậc nhất hai ẩn',
        en: 'Chapter I. Equations and systems of two linear equations in two unknowns',
        lessons: [
          { slug: 'bai-1', number: '1', vi: 'Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn', en: 'Linear equations and systems of two linear equations', content: 'toan9-bai1' },
          { slug: 'bai-2', number: '2', vi: 'Giải hệ hai phương trình bậc nhất hai ẩn', en: 'Solving a system of two linear equations', content: 'toan9-bai2' },
          { slug: 'bai-3', number: '3', vi: 'Giải bài toán bằng cách lập hệ phương trình', en: 'Solving word problems with a system of equations', content: 'toan9-bai3' }
        ]
      },
      {
        vi: 'Chương II. Phương trình và bất phương trình bậc nhất một ẩn',
        en: 'Chapter II. Equations and linear inequalities in one unknown',
        lessons: [
          { slug: 'bai-4', number: '4', vi: 'Phương trình quy về phương trình bậc nhất một ẩn', en: 'Equations that reduce to linear equations in one unknown', content: 'toan9-bai4' },
          { slug: 'bai-5', number: '5', vi: 'Bất đẳng thức và tính chất', en: 'Inequalities and their properties', content: 'toan9-bai5' },
          { slug: 'luyen-tap-chung-2', number: 'LT', vi: 'Luyện tập chung', en: 'General practice', content: 'toan9-ltc2' },
          { slug: 'bai-6', number: '6', vi: 'Bất phương trình bậc nhất một ẩn', en: 'Linear inequalities in one unknown', content: 'toan9-bai6' },
          { slug: 'bai-tap-cuoi-chuong-2', number: 'BT', vi: 'Bài tập cuối chương II', en: 'End-of-chapter exercises', content: 'toan9-btcc2' }
        ]
      },
      {
        vi: 'Chương III. Căn bậc hai và căn bậc ba',
        en: 'Chapter III. Square roots and cube roots',
        lessons: [
          { slug: 'bai-7', number: '7', vi: 'Căn bậc hai và căn thức bậc hai', en: 'Square roots and radical expressions', content: 'toan9-bai7' },
          { slug: 'bai-8', number: '8', vi: 'Khai căn bậc hai với phép nhân và phép chia', en: 'Square roots with multiplication and division', content: 'toan9-bai8' },
          { slug: 'luyen-tap-chung-3', number: 'LT', vi: 'Luyện tập chung', en: 'General practice', content: 'toan9-ltc3a' },
          { slug: 'bai-9', number: '9', vi: 'Biến đổi đơn giản và rút gọn biểu thức chứa căn thức bậc hai', en: 'Simple transformations and simplifying expressions with square roots', content: 'toan9-bai9' },
          { slug: 'bai-10', number: '10', vi: 'Căn bậc ba và căn thức bậc ba', en: 'Cube roots and cube-root expressions', content: 'toan9-bai10' },
          { slug: 'luyen-tap-chung-4', number: 'LT', vi: 'Luyện tập chung', en: 'General practice', content: 'toan9-ltc3b' },
          { slug: 'bai-tap-cuoi-chuong-3', number: 'BT', vi: 'Bài tập cuối chương III', en: 'End-of-chapter exercises', content: 'toan9-btcc3' }
        ]
      },
      {
        vi: 'Chương IV. Hệ thức lượng trong tam giác vuông',
        en: 'Chapter IV. Right-triangle trigonometry',
        lessons: [
          { slug: 'bai-11', number: '11', vi: 'Tỉ số lượng giác của góc nhọn', en: 'Trigonometric ratios of an acute angle', content: 'toan9-bai11' },
          { slug: 'bai-12', number: '12', vi: 'Một số hệ thức giữa cạnh, góc trong tam giác vuông và ứng dụng', en: 'Relations between sides and angles in a right triangle, and applications', content: 'toan9-bai12' },
          { slug: 'luyen-tap-chung-5', number: 'LT', vi: 'Luyện tập chung', en: 'General practice', content: 'toan9-ltc4' },
          { slug: 'bai-tap-cuoi-chuong-4', number: 'BT', vi: 'Bài tập cuối chương IV', en: 'End-of-chapter exercises', content: 'toan9-btcc4' }
        ]
      },
      {
        vi: 'Chương V. Đường tròn',
        en: 'Chapter V. Circles',
        lessons: [
          { slug: 'bai-13', number: '13', vi: 'Mở đầu về đường tròn', en: 'Introduction to circles', content: 'toan9-bai13' },
          { slug: 'bai-14', number: '14', vi: 'Cung và dây của một đường tròn', en: 'Arcs and chords of a circle', content: 'toan9-bai14' },
          { slug: 'bai-15', number: '15', vi: 'Độ dài của cung tròn. Diện tích hình quạt tròn và hình vành khuyên', en: 'Arc length; area of a sector and of an annulus', content: 'toan9-bai15' },
          { slug: 'luyen-tap-chung-6', number: 'LT', vi: 'Luyện tập chung', en: 'General practice', content: 'toan9-ltc5' },
          { slug: 'bai-16', number: '16', vi: 'Vị trí tương đối của đường thẳng và đường tròn', en: 'Relative positions of a line and a circle', content: 'toan9-bai16' },
          { slug: 'bai-17', number: '17', vi: 'Vị trí tương đối của hai đường tròn', en: 'Relative positions of two circles', content: 'toan9-bai17' }
        ]
      },
      {
        vi: 'Chương VI. Hàm số y = ax² (a ≠ 0). Phương trình bậc hai một ẩn',
        en: 'Chapter VI. The function y = ax² (a ≠ 0). Quadratic equations in one variable',
        lessons: [
          { slug: 'bai-18', number: '18', vi: 'Hàm số y = ax² (a ≠ 0)', en: 'The function y = ax² (a ≠ 0)', content: 'toan9-bai18' },
          { slug: 'bai-19', number: '19', vi: 'Phương trình bậc hai một ẩn', en: 'Quadratic equations in one variable', content: 'toan9-bai19' },
          { slug: 'bai-20', number: '20', vi: 'Định lí Viète và ứng dụng', en: "Vieta's theorem and its applications", content: 'toan9-bai20' }
        ]
      }
    ]
  }
  ,
  {
    id: 9,
    slug: 'khtn-9',
    subject: 'Khoa học tự nhiên 9',
    subjectEn: 'Natural Science 9',
    label: 'KHTN 9',
    short: 'KHTN',
    available: true,
    topics: [
      {
        vi: 'Bài mở đầu',
        en: 'Opening lesson',
        lessons: [
          { slug: 'bai-1', number: '1', vi: 'Nhận biết một số dụng cụ, hoá chất. Thuyết trình một vấn đề khoa học', en: 'Recognising some laboratory equipment and chemicals. Presenting a scientific topic', content: 'khtn9-bai1' }
        ]
      },
      {
        vi: 'Chương I. Năng lượng cơ học',
        en: 'Chapter I. Mechanical energy',
        lessons: [
          { slug: 'bai-2', number: '2', vi: 'Động năng. Thế năng', en: 'Kinetic energy. Potential energy', content: 'khtn9-bai2' },
          { slug: 'bai-3', number: '3', vi: 'Cơ năng', en: 'Mechanical energy', content: 'khtn9-bai3' },
          { slug: 'bai-4', number: '4', vi: 'Công và công suất', en: 'Work and power', content: 'khtn9-bai4' }
        ]
      },
      {
        vi: 'Chương II. Ánh sáng',
        en: 'Chapter II. Light',
        lessons: [
          { slug: 'bai-5', number: '5', vi: 'Khúc xạ ánh sáng', en: 'Refraction of light', content: 'khtn9-bai5' },
          { slug: 'bai-6', number: '6', vi: 'Phản xạ toàn phần', en: 'Total internal reflection', content: 'khtn9-bai6' }
        ]
      }
    ]
  }
];
