/* ==========================================================================
   TIN HỌC 9 — ĐỊNH HƯỚNG CHỦ ĐỀ a. SỬ DỤNG BẢNG TÍNH ĐIỆN TỬ NÂNG CAO
     'tin9-bai10a'  Bài 10a. Sử dụng hàm COUNTIF (tr. 41–44)
   Trang 45 là phần mở rộng. Lời văn được biên soạn lại, không chép nguyên văn.
   ========================================================================== */
(function () {
  'use strict';
  const D = (window.TEXTBOOK = window.TEXTBOOK || {});
  D.lessons = D.lessons || {};
  D.glossary = D.glossary || {};
  const g = (word, ipa, pos, vi, ctx, en, viEx) => ({ word, ipa, pos, vi, ctx, ex: { en, vi: viEx } });

  Object.assign(D.glossary, {
    countif: g('COUNTIF', '/ˈkaʊnt ɪf/', 'n', 'hàm đếm theo điều kiện',
      'Hàm của phần mềm bảng tính đếm số ô trong một vùng thoả mãn một điều kiện.',
      'COUNTIF counts the cells that meet the condition.', 'Hàm COUNTIF đếm các ô thoả mãn điều kiện.'),
    formula: g('formula', '/ˈfɔː.mjə.lə/', 'n', 'công thức',
      'Biểu thức bắt đầu bằng dấu = trong ô tính, dùng để tính toán.',
      'Type the formula in cell G2.', 'Nhập công thức vào ô G2.'),
    range: g('range', '/reɪndʒ/', 'n', 'phạm vi, vùng dữ liệu',
      'Tham số của hàm: vùng các ô cần kiểm tra, ví dụ B3:B10.',
      'The range is B3:B10.', 'Phạm vi là B3:B10.'),
    criteria: g('criteria', '/kraɪˈtɪə.ri.ə/', 'n', 'điều kiện kiểm tra',
      'Tham số của hàm: điều kiện mà ô phải thoả mãn để được đếm (hoặc cộng).',
      'The criteria can be a number, a text or a cell address.', 'Điều kiện có thể là số, chữ hoặc địa chỉ ô.'),
    'absolute-reference': g('absolute reference', '/ˈæb.sə.luːt ˈref.ər.əns/', 'n', 'địa chỉ tuyệt đối',
      'Địa chỉ ô có dấu \\$, không thay đổi khi sao chép công thức, ví dụ \\$B\\$3.',
      'Use an absolute reference so the range does not move.', 'Dùng địa chỉ tuyệt đối để vùng dữ liệu không dịch chuyển.'),
    'relative-reference': g('relative reference', '/ˈrel.ə.tɪv ˈref.ər.əns/', 'n', 'địa chỉ tương đối',
      'Địa chỉ ô không có dấu \\$, thay đổi theo vị trí khi sao chép công thức, ví dụ F2.',
      'F2 is a relative reference and becomes F3 when copied down.', 'F2 là địa chỉ tương đối và thành F3 khi sao chép xuống.'),
    'copy-formula': g('copy a formula', '/ˈkɒp.i ə ˈfɔː.mjə.lə/', 'v', 'sao chép công thức',
      'Chép công thức sang ô khác để tính cho nhiều dòng mà không phải gõ lại.',
      'Copy the formula from G2 to G10.', 'Sao chép công thức từ G2 sang G10.'),
    wildcard: g('wildcard', '/ˈwaɪld.kɑːd/', 'n', 'kí tự đại diện',
      'Dấu * thay cho một dãy kí tự bất kì, ví dụ "Y*" là xâu bắt đầu bằng Y.',
      'The wildcard * stands for any characters.', 'Kí tự đại diện * thay cho các kí tự bất kì.'),
    'test-condition': g('condition', '/kənˈdɪʃ.ən/', 'n', 'điều kiện (để kiểm tra)',
      'Trong bảng tính: yêu cầu mà một ô phải thoả mãn để được đếm hoặc cộng, ví dụ ">100".',
      'COUNTIF counts the cells that meet the condition.', 'COUNTIF đếm các ô thoả mãn điều kiện.'),
    survey: g('survey', '/ˈsɜː.veɪ/', 'n', 'khảo sát',
      'Cuộc thu thập ý kiến hoặc thông tin từ nhiều người, rồi tổng hợp kết quả.',
      'Make a survey about choosing a high school.', 'Thực hiện khảo sát về việc chọn trường THPT.'),
    summarise: g('summarise data', '/ˈsʌm.ə.raɪz ˈdeɪ.tə/', 'v', 'tổng hợp dữ liệu',
      'Gộp dữ liệu chi tiết thành số liệu ngắn gọn như số lần, tổng tiền.',
      'Summarise the data to see how often each expense occurs.', 'Tổng hợp dữ liệu để biết mỗi khoản chi xảy ra bao nhiêu lần.'),
    balance: g('balance', '/ˈbæl.əns/', 'n', 'cân đối thu chi',
      'Tình trạng tổng thu và tổng chi hợp lí với nhau.',
      'Is the family’s income and spending balanced?', 'Thu nhập và chi tiêu của gia đình đã cân đối chưa?')
  });

  const ex = (items) => items;

  D.lessons['tin9-bai10a'] = {
    gradeId: 9, number: '10a', book: 'Tin học 9',
    title: { vi: 'Sử dụng hàm COUNTIF', en: 'Using the COUNTIF function' },
    topic: { number: 'a', label: 'Định hướng', vi: 'Sử dụng bảng tính điện tử nâng cao', en: 'Advanced use of spreadsheets' },
    spreadLabels: ['Mở đầu; hàm COUNTIF', 'Công thức, địa chỉ tuyệt đối; thực hành', 'Luyện tập, vận dụng; tự kiểm tra'],
    pages: [
      { number: 41, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: { vi: 'Sau bài học này em sẽ:', en: 'After this lesson you will:' }, items: [
          { vi: 'Sử dụng được hàm đếm theo điều kiện COUNTIF trong giải quyết bài toán thực tế về quản lí tài chính.', en: 'Be able to use the conditional counting function {COUNTIF|countif} to solve a real {financial management|financial-management} problem.' }
        ] },
        { t: 'p', badge: 'fire', vi: 'Trong các bài học trước, em đã sử dụng công cụ xác thực dữ liệu để nhập dữ liệu chính xác cho bảng tính quản lí tài chính gia đình. Để việc chi tiêu của gia đình được kiểm soát thường xuyên hoặc định kì theo khoảng thời gian nào đó tuỳ vào mỗi gia đình, dữ liệu thu và chi cần được tổng hợp để trả lời những câu hỏi sau:', en: 'In earlier lessons you used {Data Validation|data-validation} to enter accurate data in the family-finance spreadsheet. So that a family can control its spending regularly or periodically, depending on the family, the income and expense data must be {summarised|summarise} to answer these questions:' },
        { t: 'list', items: [
          { vi: 'Mỗi khoản chi đã được chi bao nhiêu lần?', en: 'How many times has each {expense} been paid?' },
          { vi: 'Mỗi khoản thu đã được thu bao nhiêu lần?', en: 'How many times has each {income} been received?' },
          { vi: 'Tổng số tiền đã chi tiêu của từng khoản chi là bao nhiêu?', en: 'What is the total amount spent on each expense?' },
          { vi: 'Tổng số tiền thu nhập của từng khoản thu là bao nhiêu?', en: 'What is the total income from each source?' },
          { vi: 'Thu nhập và chi tiêu của gia đình đã cân đối chưa?', en: 'Are the family’s income and spending in {balance}?' }
        ] },
        { t: 'p', plain: true, vi: 'Những bài học tiếp theo của chủ đề này sẽ hướng dẫn em trả lời các câu hỏi trên, giúp cho việc chi tiêu của gia đình được kiểm soát hiệu quả.', en: 'The next lessons of this topic show you how to answer these questions, so the family’s spending is controlled effectively.' },
        { t: 'h2', n: '1', vi: 'Hàm COUNTIF', en: 'The COUNTIF function' },
        { t: 'activity', no: 1, title: { vi: 'Các khoản chi được tổng hợp như thế nào?', en: 'How are the expenses summarised?' },
          vi: 'Giả sử dữ liệu chi tiêu đã cập nhật trong vùng A3:D10 (Hình 10a.1). Theo em, công thức tại các ô G2, G3,…, G10 là gì để em có thể biết số lần chi tiêu của mỗi khoản?',
          en: 'Suppose the spending data are already entered in the range A3:D10 (Figure 10a.1). In your opinion, what {formula} goes in cells G2, G3, …, G10 so that you can tell how many times each expense occurred?',
          items: [], style: 'plain' },
        { t: 'fig', art: 'sheet10a1', no: '10a.1', vi: 'Bảng dữ liệu về các khoản chi', en: 'The data table of expenses', wide: true }
      ] },

      { number: 42, blocks: [
        { t: 'p', badge: 'book', vi: 'Để đếm số ô tính mà dữ liệu của ô thoả mãn một điều kiện nào đó, em sử dụng hàm đếm theo điều kiện COUNTIF. Bảng 10a.1 dưới đây là một số ví dụ sử dụng hàm này.', en: 'To count the cells whose data meet some {condition|test-condition}, use the conditional counting function {COUNTIF|countif}. Table 10a.1 gives a few examples.' },
        { t: 'h3', vi: 'Bảng 10a.1. Một số ví dụ sử dụng hàm COUNTIF', en: 'Table 10a.1. Some examples of using COUNTIF' },
        { t: 'table', head: true, rows: [
          ['STT', { vi: 'Yêu cầu tính toán', en: 'What to calculate' }, { vi: 'Công thức tính', en: 'Formula' }],
          ['1', { vi: 'Đếm số ô trong vùng A1:A4 chứa giá trị số lớn hơn 100.', en: 'Count the cells in A1:A4 that hold a number greater than 100.' }, '=COUNTIF(A1:A4,">100")'],
          ['2', { vi: 'Đếm số ô trong vùng A1:A4 chứa từ Yes.', en: 'Count the cells in A1:A4 that contain the word Yes.' }, '=COUNTIF(A1:A4,"Yes")'],
          ['3', { vi: 'Đếm số ô trong vùng A1:A4 chứa xâu kí tự bắt đầu bằng chữ cái Y.', en: 'Count the cells in A1:A4 holding text that starts with the letter Y.' }, '=COUNTIF(A1:A4,"Y*")'],
          ['4', { vi: 'Đếm số ô trong vùng A1:A4 chứa giá trị giống như ô D2.', en: 'Count the cells in A1:A4 whose value equals that of cell D2.' }, '=COUNTIF(A1:A4,D2)']
        ] },
        { t: 'p', plain: true, vi: 'Công thức chung của COUNTIF là: **=COUNTIF(range, criteria)**. Trong đó, ý nghĩa của các tham số như sau:', en: 'The general {formula} of COUNTIF is **=COUNTIF(range, criteria)**. The parameters mean:' },
        { t: 'list', items: [
          { vi: '**range**: phạm vi chứa các ô tính cần kiểm tra để đếm.', en: '**{range}**: the range of cells to be checked and counted.' },
          { vi: '**criteria**: điều kiện kiểm tra các ô tính trong phạm vi range.', en: '**{criteria}**: the condition used to check the cells in the range.' }
        ] },
        { t: 'p', plain: true, vi: 'Trong Hình 10a.1, để biết mỗi khoản chi đã được chi bao nhiêu lần, em dùng hàm COUNTIF để đếm số ô tính trong vùng B3:B10 chứa mỗi khoản chi. Như vậy, công thức ở ô G2 là =COUNTIF(\\$B\\$3:\\$B\\$10,"Ở") cho biết khoản Ở đã được chi bao nhiêu lần. Tuy nhiên, tên của khoản chi này đã được lưu ở ô F2, vì vậy công thức tại ô G2 được sửa lại là =COUNTIF(\\$B\\$3:\\$B\\$10,F2) như Hình 10a.2. Khi sao chép công thức này sang các ô còn lại từ G3 đến G10, công thức sẽ trả về kết quả là số lần chi của các khoản chi còn lại.', en: 'In Figure 10a.1, to find how many times each expense was paid, use COUNTIF to count the cells in B3:B10 that hold that expense. So the formula in G2 is =COUNTIF(\\$B\\$3:\\$B\\$10,"Ở"), telling how many times Ở (Housing) was paid. But since the name of this expense is already stored in F2, the formula in G2 is rewritten as =COUNTIF(\\$B\\$3:\\$B\\$10,F2), as in Figure 10a.2. When you {copy this formula|copy-formula} to the remaining cells G3 to G10, it returns how many times each of the other expenses was paid.' },
        { t: 'fig', art: 'sheet10a2', no: '10a.2', vi: 'Công thức tính số lần chi của mỗi khoản chi', en: 'The formula that counts how many times each expense was paid', wide: true },
        { t: 'tip', items: [
          { vi: 'Hàm COUNTIF đếm số ô tính trong vùng dữ liệu (range) thoả mãn điều kiện (criteria).', en: 'COUNTIF counts the cells in a data range that meet the criteria.' },
          { vi: 'Công thức: =COUNTIF(range, criteria). range là phạm vi chứa các ô tính cần kiểm tra để đếm; criteria là điều kiện kiểm tra các ô tính trong phạm vi range.', en: 'Formula: =COUNTIF(range, criteria). The range holds the cells to check and count; the criteria is the condition for the cells in the range.' }
        ], plain: true }
      ] },

      { number: 43, blocks: [
        { t: 'ask', style: 'alpha', lead: { vi: 'Trong Hình 10a.2, công thức ở ô G2 là =COUNTIF(\\$B\\$3:\\$B\\$10,F2). Em hãy trả lời các câu hỏi sau:', en: 'In Figure 10a.2 the formula in G2 is =COUNTIF(\\$B\\$3:\\$B\\$10,F2). Answer:' }, items: [
          { vi: 'Khi sao chép công thức trên sang các ô G3,…, G10 công thức sẽ thay đổi như thế nào?', en: 'When this formula is copied to G3, …, G10, how does it change?' },
          { vi: 'Nếu bỏ các dấu \\$ thì công thức ở ô G2 sẽ là =COUNTIF(B3:B10,F2). Sau khi sao chép công thức này sang các ô từ G3 đến G10, kết quả trả về tại các ô đó có đúng không? Tại sao?', en: 'Without the \\$ signs the formula in G2 would be =COUNTIF(B3:B10,F2). After copying it to G3 through G10, are the results right? Why?' }
        ] },
        { t: 'tip', items: [
          { vi: 'Gợi ý: dấu \\$ giữ nguyên địa chỉ khi sao chép. \\$B\\$3:\\$B\\$10 là địa chỉ tuyệt đối, còn F2 là địa chỉ tương đối nên đổi thành F3, F4,… khi sao chép xuống.', en: 'Hint: the \\$ sign keeps an address fixed when copying. \\$B\\$3:\\$B\\$10 is an {absolute reference|absolute-reference}, while F2 is a {relative reference|relative-reference} and becomes F3, F4, … when copied down.' }
        ], plain: true },
        { t: 'h2', n: '2', vi: 'Thực hành: Sử dụng hàm COUNTIF', en: 'Practice: Using the COUNTIF function' },
        { t: 'p', plain: true, vi: '**Nhiệm vụ:** Sử dụng hàm COUNTIF để tổng hợp chi tiêu theo mỗi khoản.', en: '**Task:** Use COUNTIF to summarise spending by expense.' },
        { t: 'h3', vi: 'Hướng dẫn', en: 'Guide' },
        { t: 'h3', vi: 'a) Tính số lần chi của mỗi khoản chi trong trang tính Chi tiêu', en: 'a) Count how many times each expense was paid on the Chi tiêu worksheet' },
        { t: 'list', items: [
          { vi: 'Mở tệp bảng tính TaiChinhGiaDinh.xlsx, chọn trang tính **Chi tiêu**.', en: 'Open TaiChinhGiaDinh.xlsx and choose the **Chi tiêu** {worksheet}.' },
          { vi: 'Nhập dữ liệu cho trang tính để được kết quả tương tự như Hình 10a.1.', en: 'Enter data so the result looks like Figure 10a.1.' },
          { vi: 'Tại ô G2, nhập công thức =COUNTIF(\\$B\\$3:\\$B\\$10,F2) như minh hoạ trong Hình 10a.2.', en: 'In G2 type =COUNTIF(\\$B\\$3:\\$B\\$10,F2) as in Figure 10a.2.' },
          { vi: 'Sao chép công thức trong ô G2 sang các ô từ G3 đến G10.', en: 'Copy the formula in G2 to the cells G3 to G10.' },
          { vi: 'Lưu bảng tính.', en: 'Save the spreadsheet.' }
        ] },
        { t: 'h3', vi: 'b) Tính số lần thu của mỗi khoản thu trong trang tính Thu nhập', en: 'b) Count how many times each income was received on the Thu nhập worksheet' },
        { t: 'list', items: [
          { vi: 'Chọn trang tính **Thu nhập**.', en: 'Choose the **Thu nhập** worksheet.' },
          { vi: 'Nhập dữ liệu cho trang tính để được nội dung tương tự như Hình 10a.3.', en: 'Enter data so the content looks like Figure 10a.3.' }
        ] },
        { t: 'fig', art: 'thu10a3', no: '10a.3', vi: 'Bảng dữ liệu về các khoản thu', en: 'The data table of income', wide: true },
        { t: 'list', items: [
          { vi: 'Tại ô G2, nhập công thức =COUNTIF(\\$B\\$3:\\$B\\$8,F2) để tính số lần thu của khoản Lương (Hình 10a.4).', en: 'In G2 type =COUNTIF(\\$B\\$3:\\$B\\$8,F2) to count how many times Lương (salary) was received (Figure 10a.4).' }
        ] },
        { t: 'fig', art: 'thu10a4', no: '10a.4', vi: 'Nhập công thức tại ô G2', en: 'Typing the formula in cell G2', wide: true }
      ] },

      { number: 44, blocks: [
        { t: 'list', items: [
          { vi: 'Sao chép công thức trong ô G2 sang các ô từ G3 đến G6 để tính số lần thu của các khoản thu còn lại (Hình 10a.5).', en: 'Copy the formula in G2 to the cells G3 to G6 to count the other income items (Figure 10a.5).' },
          { vi: 'Lưu tệp.', en: 'Save the file.' }
        ] },
        { t: 'fig', art: 'thu10a5', no: '10a.5', vi: 'Sao chép công thức trong ô G2 sang các ô từ G3 đến G6', en: 'Copying the formula in G2 to the cells G3 to G6', wide: true },
        { t: 'head', kind: 'practice', vi: 'Luyện tập', en: 'Practice' },
        { t: 'olist', style: 'num', items: [
          { vi: 'Em hãy bổ sung thêm một số dòng dữ liệu thu, chi vào cả hai trang tính **Thu nhập** và **Chi tiêu**. Hãy điều chỉnh công thức COUNTIF ở cột G để kết quả tổng hợp số lần thu, chi của mỗi khoản được chính xác.', en: 'Add some more rows of income and expense data to both the **Thu nhập** and **Chi tiêu** worksheets. Adjust the COUNTIF formula in column G so the counts of income and expenses stay accurate.' },
          { vi: 'Em hãy thực hiện cuộc khảo sát về việc chọn trường THPT của các bạn trong lớp. Nhập thông tin mà em thu thập được vào bảng tính và sử dụng hàm COUNTIF để tổng hợp kết quả khảo sát như minh hoạ ở Hình 10a.6.', en: 'Run a {survey} among your classmates about choosing a high school. Enter the information you collect in a spreadsheet and use COUNTIF to summarise the results as in Figure 10a.6.' }
        ] },
        { t: 'fig', art: 'survey10a6', no: '10a.6', vi: 'Kết quả khảo sát về việc chọn trường THPT', en: 'Survey results about choosing a high school', wide: true },
        { t: 'head', kind: 'apply', vi: 'Vận dụng', en: 'Apply' },
        { t: 'p', plain: true, vi: 'Em hãy mở bảng tính KinhPhiTrienLam.xlsx đã tạo ở phần Vận dụng, Bài 9a và sử dụng hàm COUNTIF để tính số lần thu của mỗi khoản thu, số lần chi của mỗi khoản chi của dự án **Triển lãm tin học**. Lưu tệp sau khi hoàn thành công việc.', en: 'Open KinhPhiTrienLam.xlsx, made in the Apply part of Lesson 9a, and use COUNTIF to count how many times each income and each expense of the **Informatics Exhibition** project occurred. Save the file when you finish.' }
      ] },

      { number: 45, blocks: [
        { t: 'head', kind: 'extra', vi: 'Mở rộng: tự kiểm tra', en: 'Extension: self-check' },
        { t: 'quiz', title: { vi: 'Luyện tập', en: 'Practice' }, items: [
          { id: 'q1', vi: 'Hàm COUNTIF dùng để làm gì?', en: 'What is COUNTIF used for?',
            options: [{ vi: 'Đếm số ô thoả mãn một điều kiện', en: 'Counting the cells that meet a condition' }, { vi: 'Tính tổng các ô', en: 'Adding up cells' }, { vi: 'Tìm số lớn nhất', en: 'Finding the largest number' }, { vi: 'Sắp xếp dữ liệu', en: 'Sorting data' }],
            answer: 0, whyVi: 'COUNTIF đếm số ô tính trong vùng dữ liệu thoả mãn điều kiện.', whyEn: 'COUNTIF counts the cells in a range that meet the condition.' },
          { id: 'q2', vi: 'Công thức chung của COUNTIF là gì?', en: 'What is the general formula of COUNTIF?',
            options: [{ vi: '=COUNTIF(range, criteria)', en: '=COUNTIF(range, criteria)' }, { vi: '=COUNTIF(criteria)', en: '=COUNTIF(criteria)' }, { vi: '=COUNTIF(sum_range)', en: '=COUNTIF(sum_range)' }, { vi: '=COUNTIF(range; criteria; sum)', en: '=COUNTIF(range; criteria; sum)' }],
            answer: 0, whyVi: 'Hàm có hai tham số: range và criteria.', whyEn: 'The function has two parameters: range and criteria.' },
          { id: 'q3', vi: 'Công thức =COUNTIF(A1:A4,">100") đếm gì?', en: 'What does =COUNTIF(A1:A4,">100") count?',
            options: [{ vi: 'Số ô trong A1:A4 có giá trị lớn hơn 100', en: 'Cells in A1:A4 with a value greater than 100' }, { vi: 'Tổng các số lớn hơn 100', en: 'The sum of numbers greater than 100' }, { vi: 'Số ô chứa chữ 100', en: 'Cells containing the text 100' }, { vi: 'Số ô bằng 100', en: 'Cells equal to 100' }],
            answer: 0, whyVi: 'Điều kiện ">100" chọn các ô có giá trị lớn hơn 100; kết quả là số lượng ô đó.', whyEn: 'The condition ">100" selects cells greater than 100; the result is how many.' },
          { id: 'q4', vi: 'Vì sao trong =COUNTIF(\\$B\\$3:\\$B\\$10,F2) phải có các dấu \\$ ở vùng B3:B10?', en: 'Why must the range B3:B10 carry \\$ signs in =COUNTIF(\\$B\\$3:\\$B\\$10,F2)?',
            options: [{ vi: 'Để vùng dữ liệu không đổi khi sao chép công thức', en: 'So the range does not change when the formula is copied' }, { vi: 'Để tính ra số tiền', en: 'To produce an amount of money' }, { vi: 'Để định dạng ô', en: 'To format the cell' }, { vi: 'Không có tác dụng gì', en: 'They have no effect' }],
            answer: 0, whyVi: 'Địa chỉ tuyệt đối giữ nguyên vùng B3:B10; F2 là địa chỉ tương đối nên đổi theo từng dòng.', whyEn: 'An absolute reference keeps B3:B10 fixed; F2 is relative and follows each row.' }
        ] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          { vi: 'Hàm COUNTIF đếm số ô tính trong vùng dữ liệu thoả mãn điều kiện.', en: 'COUNTIF counts the cells in a data range that meet a condition.' },
          { vi: 'Công thức: =COUNTIF(range, criteria).', en: 'Formula: =COUNTIF(range, criteria).' },
          { vi: 'Dùng địa chỉ tuyệt đối (\\$B\\$3:\\$B\\$10) cho vùng dữ liệu và địa chỉ tương đối (F2) cho điều kiện để sao chép công thức xuống các ô bên dưới.', en: 'Use an absolute reference (\\$B\\$3:\\$B\\$10) for the range and a relative one (F2) for the criteria so the formula can be copied down.' }
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.',
          keys: ['countif', 'formula', 'range', 'criteria', 'test-condition', 'absolute-reference', 'relative-reference', 'copy-formula', 'wildcard', 'survey', 'summarise', 'balance', 'worksheet', 'expense', 'income'] }
      ] }
    ]
  };
})();
