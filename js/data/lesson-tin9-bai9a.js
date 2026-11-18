/* ==========================================================================
   TIN HỌC 9 — ĐỊNH HƯỚNG CHỦ ĐỀ a. SỬ DỤNG BẢNG TÍNH ĐIỆN TỬ NÂNG CAO
     'tin9-bai9a'  Bài 9a. Sử dụng công cụ xác thực dữ liệu (tr. 34–40)
   Trang 41 là phần mở rộng. Lời văn được biên soạn lại, không chép nguyên văn.
   ========================================================================== */
(function () {
  'use strict';
  const D = (window.TEXTBOOK = window.TEXTBOOK || {});
  D.lessons = D.lessons || {};
  D.glossary = D.glossary || {};
  const g = (word, ipa, pos, vi, ctx, en, viEx) => ({ word, ipa, pos, vi, ctx, ex: { en, vi: viEx } });

  Object.assign(D.glossary, {
    'data-validation': g('data validation', '/ˈdeɪ.tə ˌvæl.ɪˈdeɪ.ʃən/', 'n', 'xác thực dữ liệu',
      'Công cụ của phần mềm bảng tính hạn chế kiểu dữ liệu hoặc giá trị nhập vào ô tính, giúp dữ liệu chính xác.',
      'Data Validation only accepts numbers greater than 0.', 'Xác thực dữ liệu chỉ chấp nhận số lớn hơn 0.'),
    worksheet: g('worksheet', '/ˈwɜːk.ʃiːt/', 'n', 'trang tính',
      'Một bảng gồm các hàng và cột trong tệp bảng tính, ví dụ trang tính Chi tiêu.',
      'Name the current worksheet “Chi tiêu”.', 'Đặt tên cho trang tính hiện hành là “Chi tiêu”.'),
    cell: g('cell', '/sel/', 'n', 'ô tính',
      'Giao của một hàng và một cột trong trang tính, chứa dữ liệu hoặc công thức.',
      'Select cells B3 to B10.', 'Chọn các ô từ B3 đến B10.'),
    'drop-down-list': g('drop-down list', '/ˈdrɒp.daʊn lɪst/', 'n', 'danh sách thả xuống',
      'Danh sách hiện ra khi bấm vào ô để em chọn một mục có sẵn thay vì gõ.',
      'Choose the expense from the drop-down list.', 'Chọn khoản chi từ danh sách thả xuống.'),
    income: g('income', '/ˈɪn.kʌm/', 'n', 'khoản thu, thu nhập',
      'Tiền gia đình nhận được, như lương, thưởng, làm thêm.',
      'The Income sheet records the family’s earnings.', 'Trang tính Thu nhập ghi các khoản thu của gia đình.'),
    expense: g('expense', '/ɪkˈspens/', 'n', 'khoản chi, chi tiêu',
      'Tiền gia đình bỏ ra cho ở, ăn, di chuyển, học tập, sức khoẻ,…',
      'Each expense has a date, a category and an amount.', 'Mỗi khoản chi có ngày, loại và số tiền.'),
    'financial-management': g('financial management', '/faɪˈnæn.ʃəl ˈmæn.ɪdʒ.mənt/', 'n', 'quản lí tài chính',
      'Theo dõi và cân đối các khoản thu, chi để chi tiêu hợp lí.',
      'A spreadsheet helps with family financial management.', 'Bảng tính giúp quản lí tài chính gia đình.'),
    'whole-number': g('whole number', '/həʊl ˈnʌm.bər/', 'n', 'số nguyên',
      'Kiểu dữ liệu chỉ chấp nhận các số nguyên (Whole number).',
      'This cell accepts only a whole number.', 'Ô này chỉ chấp nhận số nguyên.'),
    decimal: g('decimal', '/ˈdes.ɪ.məl/', 'n', 'số thập phân',
      'Kiểu dữ liệu chỉ chấp nhận số thập phân (Decimal).',
      'Choose Decimal to allow 2.5.', 'Chọn Decimal để cho phép nhập 2,5.'),
    'text-length': g('text length', '/tekst leŋkθ/', 'n', 'độ dài văn bản',
      'Hạn chế số kí tự của văn bản nhập vào ô.',
      'Use Text length to limit the characters.', 'Dùng Text length để giới hạn số kí tự.'),
    'error-alert': g('error alert', '/ˈer.ər əˈlɜːt/', 'n', 'thông báo lỗi',
      'Hộp thông báo hiện ra khi dữ liệu nhập sai yêu cầu xác thực.',
      'The error alert tells you to enter a number greater than 0.', 'Thông báo lỗi nhắc nhập số lớn hơn 0.'),
    'input-message': g('input message', '/ˈɪn.pʊt ˈmes.ɪdʒ/', 'n', 'thông báo nhập liệu',
      'Lời nhắc hiện ra khi chọn ô, cho biết cần nhập dữ liệu như thế nào.',
      'The input message appears when the cell is selected.', 'Thông báo nhập liệu hiện ra khi chọn ô.'),
    source: g('source', '/sɔːs/', 'n', 'nguồn',
      'Trong Data Validation, vùng chứa danh sách các giá trị được phép.',
      'Enter F2:F10 in the Source box.', 'Nhập F2:F10 vào ô Source.'),
    'data-type': g('data type', '/ˈdeɪ.tə taɪp/', 'n', 'kiểu dữ liệu',
      'Loại giá trị của dữ liệu: số, văn bản, ngày tháng, thời gian.',
      'Choose the data type that fits the problem.', 'Chọn kiểu dữ liệu phù hợp với bài toán.'),
    ribbon: g('ribbon tab', '/ˈrɪb.ən tæb/', 'n', 'dải lệnh',
      'Hàng thẻ lệnh trên đầu cửa sổ phần mềm, như Home, Insert, Data.',
      'Open the Data ribbon tab.', 'Mở dải lệnh Data.')
  });


  D.lessons['tin9-bai9a'] = {
    gradeId: 9, number: '9a', book: 'Tin học 9',
    title: { vi: 'Sử dụng công cụ xác thực dữ liệu', en: 'Using the Data Validation tool' },
    topic: { number: 'a', label: 'Định hướng', vi: 'Sử dụng bảng tính điện tử nâng cao', en: 'Advanced use of spreadsheets' },
    spreadLabels: ['Công cụ xác thực dữ liệu', 'Các kiểu dữ liệu cho phép; thực hành', 'Thông báo nhập liệu, thông báo lỗi', 'Luyện tập; tự kiểm tra'],
    pages: [
      { number: 34, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: { vi: 'Sau bài học này em sẽ:', en: 'After this lesson you will:' }, items: [
          { vi: 'Sử dụng được công cụ xác thực dữ liệu (Data Validation) của phần mềm bảng tính để giải quyết bài toán quản lí tài chính.', en: 'Be able to use the {Data Validation|data-validation} tool of spreadsheet software to solve a {financial management|financial-management} problem.' }
        ] },
        { t: 'p', badge: 'fire', vi: 'Ở các lớp trước, em đã biết sử dụng các công cụ cơ bản của phần mềm bảng tính để giải quyết bài toán trong thực tế. Trong chủ đề này, em sẽ tiếp tục tìm hiểu và sử dụng các công cụ nâng cao của phần mềm bảng tính để giải quyết bài toán thực tế (bài toán quản lí tài chính gia đình) bằng cách hoàn thành một dự án nhỏ (dự án **Quản lí tài chính gia đình**).', en: 'In earlier grades you used the basic tools of spreadsheet software to solve real problems. In this topic you will go on to use its advanced tools to solve a real problem, managing family finances, by completing a small project: **Family financial management**.' },
        { t: 'p', plain: true, vi: 'Dự án gồm các nội dung sau đây:', en: 'The project has these parts:' },
        { t: 'list', items: [
          { vi: 'Xây dựng cấu trúc của bảng tính cho bài toán quản lí tài chính gia đình.', en: 'Build the structure of a {spreadsheet} for the family-finance problem.' },
          { vi: 'Sử dụng một số công cụ cơ bản và nâng cao của phần mềm bảng tính để giải quyết bài toán.', en: 'Use some basic and advanced spreadsheet tools to solve the problem.' }
        ] },
        { t: 'p', plain: true, vi: 'Em hãy khám phá kiến thức để thực hiện dự án nhé.', en: 'Explore the knowledge you need to carry out the project.' },
        { t: 'h2', n: '1', vi: 'Công cụ xác thực dữ liệu', en: 'The Data Validation tool' },
        { t: 'activity', no: 1, title: { vi: 'Xây dựng cấu trúc bảng tính', en: 'Building the spreadsheet structure' },
          vi: 'Dựa trên hiểu biết về những khoản chi tiêu của gia đình, em hãy cho biết:',
          en: 'Based on what you know about family spending, answer:',
          items: [
            { vi: 'Chi tiêu gia đình gồm những khoản mục gì?', en: 'What items does family spending include?' },
            { vi: 'Nêu cấu trúc một bảng tính điện tử quản lí tài chính mà em thấy phù hợp với gia đình em.', en: 'Describe the structure of a financial {spreadsheet} that suits your family.' }
          ], style: 'num' },
        { t: 'h3', vi: 'a) Sử dụng bảng tính để quản lí tài chính gia đình', en: 'a) Using a spreadsheet to manage family finances' },
        { t: 'p', badge: 'book', vi: 'Ưu điểm nổi bật của phần mềm bảng tính là xử lí dữ liệu tự động. Sử dụng chương trình bảng tính để quản lí tài chính sẽ giúp kiểm soát được tình hình chi tiêu một cách cụ thể, trực quan, từ đó điều chỉnh chi tiêu sao cho phù hợp với thu nhập gia đình và mục tiêu phát triển. Có nhiều cách khác nhau để quản lí tài chính gia đình hiệu quả. Ví dụ: lên kế hoạch chi tiết cho từng khoản chi tiêu, theo dõi ngân sách định kì, quản lí các khoản tiết kiệm và đầu tư,… Mỗi gia đình lại có các khoản mục tài chính khác nhau. Các khoản mục đó thường được phân thành hai loại là **Thu** và **Chi**. Do vậy, thông tin lưu trữ trong bảng tính điện tử quản lí tài chính gia đình sẽ gồm ít nhất hai loại đó. Ví dụ về các khoản thu, chi thường có của một gia đình được minh hoạ ở Hình 9a.1.', en: 'The great strength of spreadsheet software is automatic data processing. Using a spreadsheet to manage finances lets you control spending concretely and visually, then adjust it to the family’s {income} and development goals. There are many ways to manage family finances well: planning each kind of spending in detail, tracking the budget regularly, managing savings and investment, and so on. Every family has different financial items, usually split into two kinds, **Income** and **Expense**, so the information stored in the spreadsheet has at least those two kinds. Typical income and expense items of a family are shown in Figure 9a.1.' }
      ] },

      { number: 35, blocks: [
        { t: 'fig', art: 'lists91', no: '9a.1', vi: 'Khoản mục thu, chi gia đình', en: 'Family income and expense items' },
        { t: 'h3', vi: 'b) Công cụ xác thực dữ liệu', en: 'b) The data-validation tool' },
        { t: 'p', badge: 'book', vi: 'Khi dùng bảng tính để quản lí tài chính gia đình, em có thể lưu trữ dữ liệu Thu và Chi trên cùng một trang tính hoặc ở hai trang tính khác nhau. Hình 9a.2 minh hoạ trang tính **Chi tiêu** ghi lại các khoản chi của một gia đình (các khoản thu được lưu ở trang tính **Thu nhập**). Trong Hình 9a.2, em có thể thấy danh sách các khoản chi được lưu ở cột F. Khi cập nhật thông tin về khoản chi cho dữ liệu ở cột B, em chỉ cần chọn trong danh sách đã có.', en: 'When you use a spreadsheet for family finances you can store Income and Expense data on one {worksheet} or on two different ones. Figure 9a.2 shows the **Chi tiêu** (Expenses) worksheet recording a family’s {expenses|expense} (the income is stored on the **Thu nhập** worksheet). In Figure 9a.2 the list of expense items is stored in column F. When you update an expense in column B you only need to choose from the existing {drop-down list|drop-down-list}.' },
        { t: 'fig', art: 'sheet92', no: '9a.2', vi: 'Trang tính ghi thông tin chi tiêu của gia đình, dữ liệu mỗi ô ở cột B được lấy từ danh sách các khoản chi ở cột F', en: 'A worksheet recording family spending; each cell in column B takes its data from the list of expenses in column F', wide: true },
        { t: 'p', plain: true, vi: 'Để hạn chế loại dữ liệu hoặc giá trị của dữ liệu khi nhập vào ô tính, em sử dụng **công cụ xác thực dữ liệu** (Data Validation). Hình 9a.3 minh hoạ một ví dụ khác cần sử dụng công cụ này khi cập nhật dữ liệu.', en: 'To limit the kind or the value of data typed into a {cell}, use the **{Data Validation|data-validation}** tool. Figure 9a.3 shows another example where this tool is needed when updating data.' },
        { t: 'fig', art: 'sheet93', no: '9a.3', vi: 'Dữ liệu khi nhập vào ô tính của cột Số tiền (nghìn đồng) phải là dữ liệu kiểu số và có giá trị lớn hơn 0', en: 'Data typed into the Amount (thousand dong) column must be numbers greater than 0', wide: true }
      ] },

      { number: 36, blocks: [
        { t: 'p', plain: true, vi: 'Để sử dụng công cụ xác thực dữ liệu, trong nhóm lệnh **Data Tools** của dải lệnh **Data**, chọn **Data Validation** (Hình 9a.4). Hộp thoại **Data Validation** xuất hiện. Tại ô **Allow** trong thẻ **Settings**, em lựa chọn kiểu dữ liệu hoặc giá trị dữ liệu cho phù hợp với yêu cầu của từng bài toán cụ thể (Hình 9a.5).', en: 'To use Data Validation, in the **Data Tools** group of the **Data** {ribbon tab|ribbon} choose **Data Validation** (Figure 9a.4). The **Data Validation** dialog box appears. In the **Allow** box on the **Settings** tab choose the {data type|data-type} or value that fits the specific problem (Figure 9a.5).' },
        { t: 'fig', art: 'dvbtn94', no: '9a.4', vi: 'Nút lệnh Data Validation trong nhóm lệnh Data Tools', en: 'The Data Validation button in the Data Tools group' },
        { t: 'fig', art: 'dvallow95', no: '9a.5', vi: 'Lựa chọn kiểu dữ liệu hoặc giá trị dữ liệu', en: 'Choosing the data type or value' },
        { t: 'p', plain: true, vi: 'Ý nghĩa của mỗi kiểu dữ liệu hoặc giá trị dữ liệu ở Hình 9a.5 được giải thích trong Bảng 9a.1.', en: 'The meaning of each data type or value in Figure 9a.5 is explained in Table 9a.1.' },
        { t: 'h3', vi: 'Bảng 9a.1. Các kiểu dữ liệu hoặc giá trị dữ liệu cho phép', en: 'Table 9a.1. Allowed data types or values' },
        { t: 'table', rows: [
          ['Any value', { vi: 'Bất kì giá trị nào', en: 'Any value at all' }],
          ['Whole number', { vi: 'Số nguyên – ô tính chỉ chấp nhận các số nguyên', en: 'Whole numbers – the cell accepts only whole numbers' }],
          ['Decimal', { vi: 'Số thập phân – ô tính chỉ chấp nhận các số thập phân', en: 'Decimals – the cell accepts only decimal numbers' }],
          ['List', { vi: 'Danh sách – chọn dữ liệu từ danh sách thả xuống', en: 'List – choose data from a drop-down list' }],
          ['Date', { vi: 'Ngày tháng – ô tính chỉ chấp nhận dữ liệu ngày tháng', en: 'Date – the cell accepts only dates' }],
          ['Time', { vi: 'Thời gian – ô tính chỉ chấp nhận dữ liệu thời gian', en: 'Time – the cell accepts only times' }],
          ['Text length', { vi: 'Độ dài văn bản – hạn chế độ dài của văn bản nhập vào ô tính', en: 'Text length – limits the length of text typed into the cell' }],
          ['Custom', { vi: 'Tuỳ chỉnh – cho công thức tuỳ chỉnh', en: 'Custom – lets you give a custom formula' }]
        ] },
        { t: 'tip', items: [{ vi: 'Công cụ xác thực dữ liệu (Data Validation) hạn chế kiểu dữ liệu hoặc giá trị dữ liệu nhập vào ô tính, giúp cho việc nhập dữ liệu được chính xác và thoả mãn những yêu cầu bài toán đặt ra.', en: 'The {Data Validation|data-validation} tool limits the data type or value typed into a cell, so data entry is accurate and meets the requirements of the problem.' }], plain: true }
      ] },

      { number: 37, blocks: [
        { t: 'p', plain: true, vi: 'Trang tính **Thu nhập** trong Hình 9a.6 lưu dữ liệu về các khoản thu của gia đình. Em hãy quan sát Hình 9a.6 và cho biết dữ liệu ở cột B cần được thiết lập để thoả mãn điều kiện xác thực nào.', en: 'The **Thu nhập** (Income) worksheet in Figure 9a.6 stores the family’s {income}. Look at Figure 9a.6 and say which validation condition the data in column B must satisfy.' },
        { t: 'fig', art: 'thu96', no: '9a.6', vi: 'Trang tính lưu các khoản thu của gia đình', en: 'The worksheet storing the family’s income', wide: true },
        { t: 'h2', n: '2', vi: 'Thực hành: Sử dụng công cụ xác thực dữ liệu để tạo bảng tính quản lí tài chính gia đình', en: 'Practice: Using Data Validation to build a family-finance spreadsheet' },
        { t: 'p', plain: true, vi: '**Nhiệm vụ 1:** Tạo bảng tính có trang tính **Chi tiêu** theo mẫu trong Hình 9a.2. Sử dụng công cụ xác thực dữ liệu cho các khoản chi của gia đình.', en: '**Task 1:** Make a spreadsheet with a **Chi tiêu** worksheet following the sample in Figure 9a.2. Use Data Validation for the family’s expenses.' },
        { t: 'h3', vi: 'Hướng dẫn', en: 'Guide' },
        { t: 'p', plain: true, vi: '*(Hướng dẫn sau đây sử dụng phần mềm Microsoft Excel phiên bản 2016 để minh hoạ.)*', en: '*(The guide below uses Microsoft Excel 2016 as an illustration.)*' },
        { t: 'h3', vi: 'a) Tạo trang tính lưu các khoản chi', en: 'a) Create the worksheet of expenses' },
        { t: 'list', items: [
          { vi: 'Khởi động phần mềm bảng tính. Đặt tên cho trang tính hiện hành là **Chi tiêu**.', en: 'Start the spreadsheet software. Name the current {worksheet} **Chi tiêu**.' },
          { vi: 'Tạo bảng và nhập dữ liệu khoản chi (cột F) như minh hoạ ở Hình 9a.7.', en: 'Make the table and enter the expense items (column F) as in Figure 9a.7.' }
        ] },
        { t: 'fig', art: 'sheet97', no: '9a.7', vi: 'Trang tính lưu các khoản chi', en: 'The worksheet storing the expenses', wide: true },
        { t: 'h3', vi: 'b) Sử dụng công cụ xác thực dữ liệu thuộc danh sách cho trước', en: 'b) Use Data Validation with a given list' },
        { t: 'p', plain: true, vi: 'Để dữ liệu ở mỗi ô của cột B là một mục trong danh sách cho trước ở cột F, em thực hiện như sau:', en: 'To make every cell in column B an item of the given list in column F:' },
        { t: 'list', items: [
          { vi: 'Chọn các ô của cột B để nhập dữ liệu thoả mãn điều kiện xác thực, ví dụ các ô từ B3 đến B10.', en: 'Select the cells of column B where data must meet the validation condition, for example B3 to B10.' },
          { vi: 'Trong nhóm lệnh **Data Tools** của dải lệnh **Data**, chọn **Data Validation** (Hình 9a.4), hộp thoại **Data Validation** xuất hiện.', en: 'In the **Data Tools** group of the **Data** tab choose **Data Validation** (Figure 9a.4); the dialog box appears.' }
        ] }
      ] },

      { number: 38, blocks: [
        { t: 'list', items: [
          { vi: 'Trong thẻ **Settings**, nhập yêu cầu xác thực dữ liệu cho từng tiêu chí, cụ thể là:', en: 'On the **Settings** tab enter the validation requirement for each criterion, namely:' }
        ] },
        { t: 'list', items: [
          { vi: '**Allow**: Dữ liệu nhập vào cột Khoản chi cần thuộc danh sách cho trước, vì vậy em chọn giá trị là **List** để chọn dữ liệu từ danh sách thả xuống.', en: '**Allow**: Data typed in the Expense column must belong to a given list, so choose **List** to pick data from a drop-down list.' },
          { vi: '**Source**: Là vùng dữ liệu chứa danh sách. Chọn vùng dữ liệu chứa danh sách các khoản chi là **F2:F10**, khi đó địa chỉ của vùng được đưa vào ô **Source** (Hình 9a.8). Chọn **OK** để hoàn thành công việc.', en: '**{Source|source}**: the data range that holds the list. Select the range holding the list of expenses, **F2:F10**; its address goes into the **Source** box (Figure 9a.8). Click **OK** to finish.' }
        ] },
        { t: 'fig', art: 'dv98', no: '9a.8', vi: 'Chọn vùng dữ liệu chứa danh sách các khoản chi', en: 'Selecting the range that holds the list of expenses' },
        { t: 'list', items: [
          { vi: 'Nhập dữ liệu cho trang tính, trong đó dữ liệu cột B được lấy từ danh sách thả xuống (Hình 9a.2).', en: 'Enter data in the worksheet; data in column B is taken from the {drop-down list|drop-down-list} (Figure 9a.2).' },
          { vi: 'Lưu tệp bảng tính với tên TaiChinhGiaDinh.xlsx.', en: 'Save the spreadsheet with the name TaiChinhGiaDinh.xlsx.' }
        ] },
        { t: 'p', plain: true, vi: '**Nhiệm vụ 2:** Em hãy sử dụng công cụ xác thực dữ liệu để xác thực cho dữ liệu cột **Số tiền (nghìn đồng)** (cột D) chỉ chấp nhận kiểu số lớn hơn 0 và yêu cầu này hiển thị trên màn hình khi nhập dữ liệu như minh hoạ ở Hình 9a.3.', en: '**Task 2:** Use Data Validation so that the **Số tiền (nghìn đồng)** column (column D) accepts only numbers greater than 0, and so that this requirement is shown on screen while typing, as in Figure 9a.3.' },
        { t: 'h3', vi: 'Hướng dẫn', en: 'Guide' },
        { t: 'list', items: [
          { vi: 'Chọn trang tính **Chi tiêu**.', en: 'Choose the **Chi tiêu** worksheet.' },
          { vi: 'Chọn vùng sẽ nhập liệu của cột **Số tiền (nghìn đồng)**, ví dụ vùng D3:D10.', en: 'Select the area where the **Amount** column will be typed, for example D3:D10.' },
          { vi: 'Chọn **Data/Data Tools/Data Validation**, hộp thoại **Data Validation** xuất hiện.', en: 'Choose **Data/Data Tools/Data Validation**; the dialog box appears.' },
          { vi: 'Trong thẻ **Settings**, nhập yêu cầu xác thực dữ liệu như minh hoạ trong Hình 9a.9: Allow = **Whole number**, Data = **greater than**, Minimum = **0**.', en: 'On the **Settings** tab enter the requirement as in Figure 9a.9: Allow = **Whole number**, Data = **greater than**, Minimum = **0**.' }
        ] },
        { t: 'fig', art: 'dv99', no: '9a.9', vi: 'Nhập các yêu cầu xác thực dữ liệu của cột Số tiền', en: 'Entering the validation requirements of the Amount column' }
      ] },

      { number: 39, blocks: [
        { t: 'list', items: [{ vi: 'Trong thẻ **Input Message**, nhập nội dung thông báo như Hình 9a.10.', en: 'On the **Input Message** tab enter the message as in Figure 9a.10.' }] },
        { t: 'fig', art: 'msg910', no: '9a.10', vi: 'Nhập nội dung thông báo sẽ hiển thị khi nhập dữ liệu', en: 'Entering the message that shows while typing data' },
        { t: 'list', items: [{ vi: 'Trong thẻ **Error Alert**, nhập nội dung thông báo lỗi khi nhập dữ liệu như Hình 9a.11.', en: 'On the **Error Alert** tab enter the {error alert|error-alert} text as in Figure 9a.11.' }] },
        { t: 'fig', art: 'alert911', no: '9a.11', vi: 'Nhập nội dung thông báo lỗi', en: 'Entering the error message' },
        { t: 'list', items: [{ vi: 'Nhập thêm dữ liệu vào bảng. Nếu em nhập dữ liệu không đúng với yêu cầu xác thực của ô thì màn hình sẽ xuất hiện thông báo như Hình 9a.12.', en: 'Type more data into the table. If the data does not meet the cell’s validation requirement, a message like Figure 9a.12 appears.' }] },
        { t: 'fig', art: 'alert912', no: '9a.12', vi: 'Thông báo xuất hiện khi dữ liệu nhập vào ô tính không đúng kiểu hoặc không đúng giá trị cho phép', en: 'The message that appears when data typed into a cell has the wrong type or an invalid value' },
        { t: 'list', items: [{ vi: 'Lưu tệp.', en: 'Save the file.' }] }
      ] },

      { number: 40, blocks: [
        { t: 'head', kind: 'practice', vi: 'Luyện tập', en: 'Practice' },
        { t: 'olist', style: 'num', items: [
          { vi: 'Mở tệp bảng tính TaiChinhGiaDinh.xlsx và thực hiện các yêu cầu sau: a) Tạo thêm một trang tính mới, đặt tên là **Thu nhập**. b) Nhập dữ liệu khoản thu (cột F), nhập nội dung các khoản thu của gia đình như minh hoạ ở Hình 9a.6, trong đó sử dụng công cụ xác thực dữ liệu để khoản thu ở cột B được lấy từ danh sách ở cột F.', en: 'Open TaiChinhGiaDinh.xlsx and: a) add a new worksheet named **Thu nhập**; b) enter the income items (column F) and the family’s income as in Figure 9a.6, using Data Validation so that the income item in column B is taken from the list in column F.' },
          { vi: 'Mở trang tính **Thu nhập** trong tệp bảng tính TaiChinhGiaDinh.xlsx (Hình 9a.13). Sử dụng công cụ xác thực dữ liệu để hạn chế kiểu dữ liệu và giá trị dữ liệu cho cột **Số tiền (nghìn đồng)** tương tự như yêu cầu của trang tính **Chi tiêu**. Hãy nhập thêm ít nhất ba hàng dữ liệu vào bảng.', en: 'Open the **Thu nhập** worksheet (Figure 9a.13). Use Data Validation to limit the data type and value in the **Amount** column as on the **Chi tiêu** worksheet, then add at least three more rows of data.' }
        ] },
        { t: 'fig', art: 'thu913', no: '9a.13', vi: 'Trang tính lưu các khoản thu', en: 'The worksheet storing the income', wide: true },
        { t: 'head', kind: 'apply', vi: 'Vận dụng', en: 'Apply' },
        { t: 'p', plain: true, vi: 'Em hãy tạo bảng tính để quản lí tài chính cho dự án **Triển lãm tin học**. Nhập dữ liệu các khoản thu, chi của dự án. Trong đó, các khoản thu (ví dụ như: kinh phí tài trợ, quỹ lớp,…) được lưu ở một trang tính (Hình 9a.14), các khoản chi cho triển lãm (ví dụ như: mua văn phòng phẩm, in tài liệu,…) được lưu ở một trang tính khác (Hình 9a.15). Hãy sử dụng công cụ xác thực dữ liệu để việc nhập dữ liệu các khoản thu, chi được chính xác. Lưu tệp bảng tính với tên KinhPhiTrienLam.xlsx.', en: 'Make a spreadsheet to manage the finances of the **Informatics Exhibition** project and enter its income and expenses. Income (for example sponsorship and class fund) goes on one worksheet (Figure 9a.14), and the exhibition’s expenses (for example stationery and printing) on another (Figure 9a.15). Use Data Validation to make the entries accurate. Save the file as KinhPhiTrienLam.xlsx.' },
        { t: 'fig', art: 'sheet914', no: '9a.14', vi: 'Trang tính lưu các khoản thu', en: 'The worksheet storing the income', wide: true },
        { t: 'fig', art: 'sheet915', no: '9a.15', vi: 'Trang tính lưu các khoản chi', en: 'The worksheet storing the expenses', wide: true }
      ] },

      { number: 41, blocks: [
        { t: 'head', kind: 'extra', vi: 'Mở rộng: tự kiểm tra', en: 'Extension: self-check' },
        { t: 'quiz', title: { vi: 'Luyện tập', en: 'Practice' }, items: [
          { id: 'q1', vi: 'Công cụ Data Validation nằm trong nhóm lệnh nào của dải lệnh Data?', en: 'In which group of the Data tab is Data Validation?',
            options: [{ vi: 'Data Tools', en: 'Data Tools' }, { vi: 'Forecast', en: 'Forecast' }, { vi: 'Sort & Filter', en: 'Sort & Filter' }, { vi: 'Outline', en: 'Outline' }],
            answer: 0, whyVi: 'Theo Hình 9a.4, nút Data Validation thuộc nhóm Data Tools.', whyEn: 'In Figure 9a.4 the button belongs to the Data Tools group.' },
          { id: 'q2', vi: 'Muốn ô chỉ cho chọn một khoản chi có sẵn từ danh sách, ô Allow chọn giá trị nào?', en: 'To let a cell take only an existing item from a list, what do you choose in Allow?',
            options: [{ vi: 'List', en: 'List' }, { vi: 'Date', en: 'Date' }, { vi: 'Time', en: 'Time' }, { vi: 'Any value', en: 'Any value' }],
            answer: 0, whyVi: 'List cho chọn dữ liệu từ danh sách thả xuống, vùng danh sách đặt ở ô Source.', whyEn: 'List lets you choose data from a drop-down list, whose range goes in Source.' },
          { id: 'q3', vi: 'Để chỉ cho nhập số lớn hơn 0, em chọn Data và Minimum như thế nào?', en: 'To accept only numbers greater than 0, what do you set in Data and Minimum?',
            options: [{ vi: 'Data: greater than; Minimum: 0', en: 'Data: greater than; Minimum: 0' }, { vi: 'Data: between; Minimum: 10', en: 'Data: between; Minimum: 10' }, { vi: 'Data: less than; Minimum: 0', en: 'Data: less than; Minimum: 0' }, { vi: 'Không cần thiết lập', en: 'No setting needed' }],
            answer: 0, whyVi: 'Đây là thiết lập ở Hình 9a.9.', whyEn: 'This is the setting in Figure 9a.9.' },
          { id: 'q4', vi: 'Thẻ nào dùng để nhập thông báo hiện ra khi nhập sai dữ liệu?', en: 'Which tab holds the message shown when data is entered wrongly?',
            options: [{ vi: 'Error Alert', en: 'Error Alert' }, { vi: 'Input Message', en: 'Input Message' }, { vi: 'Settings', en: 'Settings' }, { vi: 'Home', en: 'Home' }],
            answer: 0, whyVi: 'Thẻ Error Alert chứa nội dung thông báo lỗi; Input Message là lời nhắc khi chọn ô.', whyEn: 'Error Alert holds the error text; Input Message is the prompt when the cell is selected.' }
        ] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          { vi: 'Bảng tính quản lí tài chính gia đình gồm hai loại khoản mục: Thu và Chi.', en: 'A family-finance spreadsheet has two kinds of items: Income and Expense.' },
          { vi: 'Data Validation hạn chế kiểu hoặc giá trị dữ liệu nhập vào ô: Any value, Whole number, Decimal, List, Date, Time, Text length, Custom.', en: 'Data Validation limits the type or value of data: Any value, Whole number, Decimal, List, Date, Time, Text length, Custom.' },
          { vi: 'Các bước: chọn ô → Data/Data Tools/Data Validation → Settings (Allow, Source) → Input Message → Error Alert → OK.', en: 'Steps: select cells → Data/Data Tools/Data Validation → Settings (Allow, Source) → Input Message → Error Alert → OK.' }
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.',
          keys: ['data-validation', 'worksheet', 'cell', 'drop-down-list', 'income', 'expense', 'financial-management', 'whole-number', 'decimal', 'text-length', 'error-alert', 'input-message', 'source', 'data-type', 'ribbon', 'spreadsheet'] }
      ] }
    ]
  };
})();
