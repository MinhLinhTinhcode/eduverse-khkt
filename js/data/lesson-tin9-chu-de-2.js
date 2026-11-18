/* ==========================================================================
   TIN HỌC 9 — CHỦ ĐỀ 2. TỔ CHỨC LƯU TRỮ, TÌM KIẾM VÀ TRAO ĐỔI THÔNG TIN
   --------------------------------------------------------------------------
     'tin9-bai2'  Bài 2. Thông tin trong giải quyết vấn đề          (tr. 9–11)
     'tin9-bai3'  Bài 3. Thực hành: Đánh giá chất lượng thông tin   (tr. 12–14)

   Cách đánh số trang giống Bài 1: các trang sách giữ nguyên số trang của sách;
   trang cuối của mỗi bài là phần mở rộng (trắc nghiệm, tóm tắt, từ vựng).
   Lời văn được biên soạn lại, không chép nguyên văn sách giáo khoa.

   Thuật ngữ tiếng Anh: {display|key} hoặc {key}; khoá tra trong glossary
   (các khoá mới của file này khai báo ngay bên dưới, cùng khuôn với glossary.js).
   Hình: { t: 'fig', art: '…' } — hàm vẽ nằm trong js/illustrations-tin.js.
   ========================================================================== */
(function () {
  'use strict';
  const D = (window.TEXTBOOK = window.TEXTBOOK || {});
  D.lessons = D.lessons || {};
  D.glossary = D.glossary || {};

  const g = (word, ipa, pos, vi, ctx, en, viEx) => ({ word, ipa, pos, vi, ctx, ex: { en, vi: viEx } });

  Object.assign(D.glossary, {
    'information-quality': g('information quality', '/ˌɪn.fəˈmeɪ.ʃən ˈkwɒl.ə.ti/', 'n', 'chất lượng thông tin',
      'Mức độ thông tin đáp ứng yêu cầu cụ thể để giải quyết vấn đề; đánh giá qua tính mới, tính chính xác, tính đầy đủ và tính sử dụng được.',
      'Good information quality leads to good decisions.', 'Thông tin có chất lượng tốt giúp đưa ra quyết định đúng.'),
    decision: g('decision', '/dɪˈsɪʒ.ən/', 'n', 'quyết định',
      'Sự lựa chọn cuối cùng sau khi cân nhắc thông tin.',
      'Information is the basis for making a decision.', 'Thông tin là cơ sở để đưa ra quyết định.'),
    criterion: g('criterion', '/kraɪˈtɪə.ri.ən/', 'n', 'tiêu chí (số nhiều: criteria)',
      'Điều kiện dùng làm thước đo khi đánh giá hoặc lựa chọn.',
      'Accuracy is one criterion for judging information.', 'Tính chính xác là một tiêu chí để đánh giá thông tin.'),
    'up-to-date': g('up-to-date', '/ˌʌp.tə ˈdeɪt/', 'adj', 'mới, được cập nhật',
      'Tính mới: thông tin còn phù hợp với thời điểm hiện tại, chưa lỗi thời.',
      'Check that the admission figures are up to date.', 'Hãy kiểm tra xem số liệu tuyển sinh có được cập nhật không.'),
    outdated: g('outdated', '/ˌaʊtˈdeɪ.tɪd/', 'adj', 'lỗi thời, cũ',
      'Thông tin đã cũ, không còn đúng với hiện tại.',
      'An outdated web page can mislead you.', 'Trang web lỗi thời có thể làm em hiểu sai.'),
    accurate: g('accurate', '/ˈæk.jər.ət/', 'adj', 'chính xác',
      'Tính chính xác: thông tin đúng với sự thật, có thể kiểm chứng.',
      'Accurate information can be checked against other sources.', 'Thông tin chính xác có thể đối chiếu với các nguồn khác.'),
    complete: g('complete', '/kəmˈpliːt/', 'adj', 'đầy đủ',
      'Tính đầy đủ: thông tin bao quát nhiều khía cạnh, cho cái nhìn tổng thể.',
      'Complete information covers every aspect of the problem.', 'Thông tin đầy đủ bao quát mọi khía cạnh của vấn đề.'),
    relevant: g('relevant', '/ˈrel.ə.vənt/', 'adj', 'liên quan, phù hợp, sử dụng được',
      'Tính sử dụng được: thông tin liên quan và phù hợp với vấn đề đang cần giải quyết.',
      'Only relevant information helps solve the problem.', 'Chỉ thông tin liên quan mới giúp giải quyết vấn đề.'),
    reliable: g('reliable', '/rɪˈlaɪ.ə.bəl/', 'adj', 'đáng tin cậy',
      'Nguồn hoặc thông tin có thể tin tưởng vì có thẩm quyền và đã được kiểm chứng.',
      'The website of the Department of Education is a reliable source.', 'Trang web của Sở Giáo dục và Đào tạo là nguồn tin đáng tin cậy.'),
    verify: g('verify', '/ˈver.ɪ.faɪ/', 'v', 'kiểm chứng, xác minh',
      'Đối chiếu thông tin với nguồn khác để biết có đúng hay không.',
      'Verify the information before you use it.', 'Hãy kiểm chứng thông tin trước khi sử dụng.'),
    'cross-check': g('cross-check', '/ˈkrɒs tʃek/', 'v', 'đối chiếu',
      'So sánh thông tin từ nhiều nguồn khác nhau để kiểm tra tính chính xác.',
      'Cross-check the news with two other websites.', 'Hãy đối chiếu tin này với hai trang web khác.'),
    'search-engine': g('search engine', '/ˈsɜːtʃ ˌen.dʒɪn/', 'n', 'máy tìm kiếm',
      'Phần mềm tìm thông tin trên Internet theo từ khoá em nhập vào.',
      'A search engine lists web pages that match your keywords.', 'Máy tìm kiếm liệt kê các trang web khớp với từ khoá của em.'),
    keyword: g('keyword', '/ˈkiː.wɜːd/', 'n', 'từ khoá',
      'Từ hoặc cụm từ nhập vào máy tìm kiếm, xác định dựa trên yêu cầu tìm kiếm.',
      'Choose keywords that match your search request.', 'Hãy chọn từ khoá khớp với yêu cầu tìm kiếm.'),
    website: g('website', '/ˈweb.saɪt/', 'n', 'trang web, website',
      'Tập hợp các trang web có chung một địa chỉ trên Internet.',
      'The school website lists its clubs.', 'Trang web của trường liệt kê các câu lạc bộ.'),
    authority: g('authority', '/ɔːˈθɒr.ə.ti/', 'n', 'thẩm quyền, cơ quan có thẩm quyền',
      'Nguồn thông tin có thẩm quyền là nơi chịu trách nhiệm chính thức về nội dung đó.',
      'Admission rules should come from the education authority.', 'Quy định tuyển sinh nên lấy từ cơ quan quản lí giáo dục.'),
    chatbot: g('smart chat tool', '/smɑːt tʃæt tuːl/', 'n', 'công cụ hội thoại thông minh (chatbot)',
      'Công cụ cho em trò chuyện với máy tính, có ứng dụng trí tuệ nhân tạo để trả lời câu hỏi.',
      'A smart chat tool can narrow down the search area.', 'Công cụ hội thoại thông minh có thể thu hẹp phạm vi tìm kiếm.'),
    kol: g('KOL', '/ˌkeɪ.əʊˈel/', 'n', 'KOL (người có ảnh hưởng)',
      'Viết tắt của Key Opinion Leader: người dẫn dắt dư luận chủ chốt, người có ảnh hưởng.',
      'A KOL promoting a product is not proof that it is good.', 'KOL quảng cáo sản phẩm chưa phải là bằng chứng sản phẩm tốt.')
  });

  /* ========================================================================
     BÀI 2. THÔNG TIN TRONG GIẢI QUYẾT VẤN ĐỀ
     ======================================================================== */
  D.lessons['tin9-bai2'] = {
    gradeId: 9,
    number: '2',
    book: 'Tin học 9',
    title: { vi: 'Thông tin trong giải quyết vấn đề', en: 'Information in problem solving' },
    topic: { number: '2', vi: 'Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin', en: 'Organising, searching and exchanging information' },
    spreadLabels: ['Vai trò của chất lượng thông tin', 'Tiêu chí đánh giá chất lượng thông tin', 'Trắc nghiệm, tóm tắt và từ vựng'],
    pages: [
      /* ------------------------------------------------------------ Trang 9 */
      {
        number: 9,
        blocks: [
          { t: 'banner' },
          {
            t: 'goals',
            lead: { vi: 'Sau bài học này em sẽ:', en: 'After this lesson you will:' },
            items: [
              { vi: 'Giải thích được sự cần thiết phải quan tâm đến chất lượng thông tin khi tìm kiếm, tiếp nhận và trao đổi thông tin; nêu được ví dụ minh hoạ.', en: 'Explain why we must care about {information quality|information-quality} when searching for, receiving and exchanging {information}, and give examples.' },
              { vi: 'Giải thích được tính mới, tính chính xác, tính đầy đủ và tính sử dụng được của thông tin; nêu được ví dụ minh hoạ.', en: 'Explain how {up-to-date}, {accurate}, {complete} and {relevant} information is, with examples.' }
            ]
          },
          {
            t: 'talk',
            lines: [
              { who: 'Minh', vi: 'Chào An, bạn đã quyết định chọn trường nào sau khi tốt nghiệp THCS chưa?', en: 'Hi An, have you decided which school to go to after lower secondary school?' },
              { who: 'An', vi: 'Chưa, tớ đang phân vân giữa hai lựa chọn: trường công lập hay trường dân lập.', en: 'Not yet. I cannot choose between a public school and a private one.' },
              { who: 'Minh', vi: 'Trường công lập có học phí thấp, trang thiết bị được Nhà nước đầu tư chắc là phải hơn chứ. Bạn còn băn khoăn gì nữa?', en: 'A public school has low fees and the State invests in its equipment, so it must be better. What else worries you?' },
              { who: 'An', vi: 'Nhưng trường dân lập cũng có ưu điểm: kế hoạch giáo dục linh hoạt, lại có nhiều cơ hội hoạt động và tiếp xúc với các tổ chức, doanh nghiệp.', en: 'But a private school has strengths too: a flexible education plan and many chances to take part in activities and meet organisations and companies.' },
              { who: 'Minh', vi: 'Ừ nhỉ, thế thì bạn cần tìm thêm thông tin. Thông tin trên Internet rất nhiều và dễ tìm, nhưng thông tin hữu ích, có chất lượng cao mới giúp bạn chọn đúng trường.', en: 'You are right, so you need more {information}. There is plenty of it on the {internet} and it is easy to find, but only useful, high-quality information helps you choose the right school.' },
              { who: 'An', vi: 'Vậy tớ sẽ tìm thông tin có chất lượng để chọn trường phù hợp với sở thích và khả năng của mình.', en: 'Then I will look for quality information to choose a school that suits my interests and abilities.' }
            ]
          },
          { t: 'p', plain: true, vi: 'Chúng ta hãy cùng hai bạn tìm hiểu về vai trò của thông tin và chất lượng thông tin trong việc giải quyết những vấn đề được đặt ra trong cuộc sống nhé!', en: 'Let us join the two friends to find out about the role of information and information quality in solving the problems that life sets us.' },
          { t: 'h2', n: '1', vi: 'Vai trò của chất lượng thông tin trong giải quyết vấn đề', en: 'The role of information quality in problem solving' },
          {
            t: 'activity', no: 1,
            title: { vi: 'Chọn trường', en: 'Choosing a school' },
            vi: 'Minh tìm trên Internet thông tin về các trường THPT và gửi cho An địa chỉ trang web giới thiệu một trường THPT. An xem trang web, thấy có nhiều chi tiết ấn tượng, phù hợp với mình (Hình 2.1). Không tìm hiểu thêm nữa, An quyết định chọn trường đó làm nguyện vọng duy nhất của mình.',
            en: 'Minh searched the {internet} for {information} about high schools and sent An the address of a school’s {website}. An read the page and found many impressive details that suited her (Figure 2.1). Without looking any further, An chose that school as her only wish.',
            items: [
              { vi: 'Em hãy cho biết việc Minh chia sẻ thông tin với An và An đã tin tưởng, sử dụng thông tin để chọn trường mà chưa tìm hiểu kĩ có thể xảy ra vấn đề gì.', en: 'What problem could arise when Minh shares the information with An and An trusts and uses it to choose a school without checking it carefully?' }
            ],
            style: 'num',
            art: 'school21', figNo: '2.1',
            figVi: 'Thông tin giới thiệu về một trường THPT', figEn: 'A high school’s introduction'
          }
        ]
      },

      /* ----------------------------------------------------------- Trang 10 */
      {
        number: 10,
        blocks: [
          {
            t: 'cols',
            blocks: [
              {
                t: 'p', badge: 'book',
                vi: 'Tìm được trang web có nhiều thông tin về một trường THPT, Minh đã gửi cho An. Thấy có những lời giới thiệu ấn tượng, An vội vàng ra quyết định mà không kiểm tra xem thông tin có chính xác, đầy đủ và phù hợp với tiêu chí chọn trường của mình hay không. Dựa trên thông tin chưa được kiểm chứng, quyết định của An có thể không đúng. Hơn nữa, việc An chỉ đăng kí một nguyện vọng sẽ làm giảm cơ hội lựa chọn. Để đưa ra quyết định đúng, An cần sử dụng thông tin có chất lượng từ những nguồn đáng tin cậy như trang web của Sở Giáo dục và Đào tạo, ý kiến của giáo viên chủ nhiệm hay của người thân có kinh nghiệm.',
                en: 'Minh found a {website} with a lot of information about a high school and sent it to An. Seeing the impressive introduction, An rushed into a {decision} without checking whether the information was {accurate}, {complete} and suited her own criteria for a school. Because it rested on unchecked information, her decision might be wrong. Applying to only one school also reduces her chances. To decide well, An needs quality information from {reliable} {sources|source}, such as the website of the Department of Education and Training, or the opinion of her class teacher or an experienced relative.'
              },
              {
                t: 'p',
                vi: 'Internet là một kho thông tin khổng lồ. Em có thể tìm thấy nhiều thông tin trên đó nhưng không phải thông tin nào cũng có thể sử dụng để giải quyết vấn đề một cách hiệu quả. Không phải số lượng bản tin mà là chất lượng của thông tin mới thực sự làm cho thông tin trở thành hữu ích. Vì vậy, em cần quan tâm đến chất lượng thông tin khi tìm kiếm, tiếp nhận và trao đổi thông tin.',
                en: 'The {internet} is a huge store of information. You can find a lot there, but not all of it can be used to solve a problem effectively. It is not the number of items but the quality of the information that makes it useful. So you must care about {information quality|information-quality} when you search for, receive and exchange information.'
              }
            ]
          },
          {
            t: 'tip',
            items: [
              { vi: 'Thông tin là cơ sở để đưa ra các quyết định. Cần phải quan tâm đến chất lượng thông tin khi tìm kiếm, tiếp nhận, trao đổi và sử dụng thông tin để có thể đưa ra các quyết định đúng đắn.', en: '{Information} is the basis for making {decisions|decision}. We must care about its quality when we search for, receive, exchange and use it, so that we can make sound decisions.' }
            ],
            plain: true
          },
          {
            t: 'ask', style: 'alpha',
            lead: { vi: 'KOL là thuật ngữ viết tắt của Key Opinion Leader, nghĩa là người dẫn dắt dư luận chủ chốt hay người có ảnh hưởng. Khi em thấy một KOL quảng cáo sản phẩm trên mạng, em sẽ ứng xử thế nào?', en: '{KOL} stands for Key Opinion Leader, meaning an influencer. When you see a KOL advertising a product online, how will you react?' },
            items: [
              { vi: 'Chia sẻ thông tin với người thân vì KOL là một nguồn tin đáng tin cậy.', en: 'Share the information with relatives because a KOL is a {reliable} source.' },
              { vi: 'Sử dụng sản phẩm vì KOL là một đảm bảo cho sản phẩm đã qua kiểm định.', en: 'Use the product because a KOL guarantees that it has been tested.' },
              { vi: 'Cân nhắc, đánh giá chất lượng thông tin trước khi sử dụng sản phẩm.', en: 'Think carefully and judge the {information quality|information-quality} before using the product.' },
              { vi: 'Không sử dụng và cảnh báo người thân về nguồn tin kém chất lượng.', en: 'Do not use it, and warn relatives about the poor-quality source.' }
            ]
          },
          { t: 'h2', n: '2', vi: 'Chất lượng thông tin', en: 'Information quality' },
          {
            t: 'activity', no: 2,
            title: { vi: 'Thông tin hữu ích', en: 'Useful information' },
            vi: 'Em hãy trả lời các câu hỏi sau:',
            en: 'Answer these questions:',
            items: [
              { vi: 'Hãy tìm kiếm và lựa chọn thông tin mà theo em là hữu ích giúp em chọn trường THPT.', en: 'Search for and select the {information} that you think is useful for choosing a high school.' },
              { vi: 'Tại sao thông tin đó là hữu ích đối với việc giải quyết vấn đề chọn trường của em?', en: 'Why is that information useful for solving your problem of choosing a school?' }
            ],
            style: 'num'
          },
          {
            t: 'p', badge: 'book',
            vi: 'Mặc dù thông tin đóng vai trò quan trọng trong việc ra quyết định nhưng không phải thông tin nào cũng hữu ích đối với việc giải quyết vấn đề. **Chất lượng thông tin** thể hiện ở mức độ đáp ứng của thông tin đối với các yêu cầu cụ thể nhằm giải quyết vấn đề, làm thông tin trở nên hữu ích.',
            en: 'Although information plays an important part in making decisions, not all of it is useful for solving a problem. **{Information quality|information-quality}** is the degree to which information meets the specific requirements of solving the problem, which makes the information useful.'
          },
          {
            t: 'p',
            vi: 'Để đánh giá chất lượng thông tin, em cần xem xét các tiêu chí như tính mới, tính chính xác, tính đầy đủ, tính sử dụng được của thông tin (Hình 2.2).',
            en: 'To judge the quality of information, you should look at {criteria|criterion} such as how {up-to-date}, {accurate}, {complete} and {relevant} it is (Figure 2.2).'
          },
          {
            t: 'list',
            items: [
              { vi: '**Tính mới** (tính cập nhật): cho biết thông tin đã bị lỗi thời chưa. Em cần thông tin cập nhật gần nhất vào thời gian nào? Nếu thông tin đã lỗi thời, cũ hoặc chậm trễ, em có thể chọn nhầm trường hoặc bỏ lỡ cơ hội vì không biết những thay đổi của các trường.', en: '**Up to date** (timeliness): shows whether the information has become {outdated}. When was the latest update you need? If the information is outdated, old or late, you may choose the wrong school or miss a chance because you do not know what has changed.' }
            ]
          }
        ]
      },

      /* ----------------------------------------------------------- Trang 11 */
      {
        number: 11,
        blocks: [
          {
            t: 'list',
            items: [
              { vi: '**Tính chính xác**, đúng đắn của thông tin: nội dung có cụ thể không? Có cách để xác minh hay không? Nếu thông tin không chính xác (ví dụ: sai điểm tuyển sinh, sai tên hoặc sai địa chỉ), em có thể sẽ nhầm lẫn và bỏ qua các trường tiềm năng.', en: '**Accuracy** and correctness: is the content specific? Is there a way to {verify} it? If the information is not accurate (for example a wrong admission score, name or address), you may get confused and overlook promising schools.' },
              { vi: '**Tính đầy đủ**: thể hiện sự bao quát nhiều khía cạnh, cho em có được cái nhìn tổng thể về vấn đề được đặt ra. Nếu thông tin không đầy đủ (ví dụ: thiếu chi tiết về học phí, môi trường học tập hoặc độ uy tín), em sẽ không có được cái nhìn toàn diện về các trường.', en: '**Completeness**: covers many aspects and gives you the whole picture of the problem. If the information is not complete (for example it lacks details on fees, the learning environment or reputation), you will not get a full view of the schools.' },
              { vi: '**Tính sử dụng được** (tính liên quan, phù hợp) của thông tin với vấn đề hay câu hỏi được đặt ra: nếu thông tin không liên quan (ví dụ: thông tin về du học nước ngoài hay về trung tâm giáo dục thường xuyên không phù hợp với mục tiêu lựa chọn một trường THPT công lập), em sẽ không sử dụng được và thông tin trở nên vô ích.', en: '**Usability** (relevance): how well the information fits the problem or question. If it is not relevant (for example information about studying abroad or about continuing education centres does not suit the aim of choosing a public high school), you cannot use it and it becomes useless.' }
            ]
          },
          { t: 'fig', art: 'qmap22', no: '2.2', vi: 'Một số tiêu chí đánh giá chất lượng thông tin', en: 'Some criteria for judging information quality' },
          {
            t: 'tip',
            items: [
              { vi: 'Chất lượng thông tin là yếu tố quan trọng, quyết định hiệu quả của việc giải quyết vấn đề.', en: '{Information quality|information-quality} is an important factor that decides how effectively a problem is solved.' },
              { vi: 'Chất lượng thông tin được đánh giá thông qua tính mới, tính chính xác, tính đầy đủ, tính sử dụng được.', en: 'It is judged by how up to date, accurate, complete and usable the information is.' }
            ]
          },
          {
            t: 'ask', style: 'alpha',
            lead: { vi: 'Trong khi tìm thông tin về các trường THPT, bạn An đã không để ý đến thời gian đăng kí nguyện vọng dự thi và xét tuyển vào lớp 10 các trường THPT công lập. Theo em:', en: 'While looking for information about high schools, An paid no attention to the dates for registering wishes and for admission to Grade 10 of public high schools. In your opinion:' },
            items: [
              { vi: 'Sơ suất này vi phạm tiêu chí nào về chất lượng thông tin?', en: 'Which criterion of information quality does this oversight break?' },
              { vi: 'Điều đó có thể dẫn đến khó khăn gì cho bạn An?', en: 'What difficulty could this cause An?' }
            ]
          },
          { t: 'head', kind: 'practice', vi: 'Luyện tập', en: 'Practice' },
          { t: 'p', plain: true, vi: 'Để chuẩn bị cho chuyến tham quan một nông trại, An gọi đến số điện thoại liên lạc được cung cấp trên trang web của nông trại nhưng không được. Minh cho rằng có thể đầu số điện thoại đã thay đổi nhưng nông trại chưa kịp cập nhật lên trang web, nên đã tìm kiếm thông tin trên website của các nhà cung cấp dịch vụ viễn thông. Nhờ đó, Minh đã liên hệ thành công với nông trại. Em hãy nhận xét về chất lượng của thông tin (theo bốn tiêu chí ở Hình 2.2) mà mỗi bạn thu nhận được.', en: 'To prepare for a trip to a farm, An called the contact number given on the farm’s {website}, but it did not work. Minh thought the phone prefix might have changed and the farm had not yet updated its page, so he looked on the websites of telecom providers. Thanks to this he reached the farm. Comment on the quality of the information each friend obtained, using the four criteria in Figure 2.2.' },
          { t: 'head', kind: 'apply', vi: 'Vận dụng', en: 'Apply' },
          { t: 'p', plain: true, vi: 'Em hãy tìm trên Internet thông tin về chiếc máy tính điện tử kĩ thuật số đầu tiên trên thế giới. Đánh giá chất lượng thông tin tìm được.', en: 'Search the {internet} for information about the world’s first electronic digital {computer}. Judge the quality of the information you find.' }
        ]
      },

      /* ----------------------------------------------------------- Trang 12 */
      {
        number: 12,
        blocks: [
          { t: 'head', kind: 'extra', vi: 'Mở rộng: tự kiểm tra', en: 'Extension: self-check' },
          {
            t: 'quiz',
            title: { vi: 'Luyện tập', en: 'Practice' },
            items: [
              {
                id: 'q1',
                vi: 'Đâu KHÔNG phải là tiêu chí đánh giá chất lượng thông tin?',
                en: 'Which of these is NOT a {criterion} for judging {information quality|information-quality}?',
                options: [
                  { vi: 'Tính mới', en: 'How up to date it is' },
                  { vi: 'Tính chính xác', en: 'How accurate it is' },
                  { vi: 'Màu nền của trang web', en: 'The background colour of the web page' },
                  { vi: 'Tính đầy đủ', en: 'How complete it is' }
                ],
                answer: 2,
                whyVi: 'Bốn tiêu chí là tính mới, tính chính xác, tính đầy đủ và tính sử dụng được; màu nền không cho biết thông tin có hữu ích hay không.',
                whyEn: 'The four criteria are being up to date, accurate, complete and usable; a background colour does not tell you whether information is useful.'
              },
              {
                id: 'q2',
                vi: 'Em dùng điểm chuẩn năm 2019 để chọn trường cho năm nay. Em đã vi phạm tiêu chí nào?',
                en: 'You use the 2019 admission scores to choose a school for this year. Which criterion do you break?',
                options: [
                  { vi: 'Tính mới', en: 'Being up to date' },
                  { vi: 'Tính sử dụng được', en: 'Usability' },
                  { vi: 'Không vi phạm tiêu chí nào', en: 'None' },
                  { vi: 'Tính đầy đủ', en: 'Completeness' }
                ],
                answer: 0,
                whyVi: 'Thông tin cũ, đã lỗi thời nên không còn đúng với thời điểm hiện tại.',
                whyEn: 'The information is old and {outdated}, so it no longer fits the present.'
              },
              {
                id: 'q3',
                vi: 'Trang giới thiệu trường không nói gì về học phí. Thông tin này thiếu tiêu chí nào?',
                en: 'A school page says nothing about fees. Which criterion does it lack?',
                options: [
                  { vi: 'Tính chính xác', en: 'Accuracy' },
                  { vi: 'Tính đầy đủ', en: 'Completeness' },
                  { vi: 'Tính mới', en: 'Being up to date' },
                  { vi: 'Tính sử dụng được', en: 'Usability' }
                ],
                answer: 1,
                whyVi: 'Thiếu chi tiết quan trọng như học phí nên em không có cái nhìn toàn diện về trường.',
                whyEn: 'It lacks an important detail such as fees, so you cannot see the school as a whole.'
              },
              {
                id: 'q4',
                vi: 'Nguồn nào đáng tin cậy nhất để tìm thông tin tuyển sinh vào lớp 10?',
                en: 'Which is the most {reliable} source for Grade 10 admission information?',
                options: [
                  { vi: 'Bài đăng của một KOL', en: 'A post by a KOL' },
                  { vi: 'Trang web của Sở Giáo dục và Đào tạo', en: 'The website of the Department of Education and Training' },
                  { vi: 'Tin nhắn không rõ người gửi', en: 'A message from an unknown sender' },
                  { vi: 'Video quảng cáo', en: 'An advertising video' }
                ],
                answer: 1,
                whyVi: 'Cơ quan quản lí giáo dục có thẩm quyền chính thức về thông tin tuyển sinh.',
                whyEn: 'The education authority has official responsibility for admission information.'
              }
            ]
          },
          {
            t: 'summary',
            title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' },
            items: [
              { vi: 'Thông tin là cơ sở để đưa ra quyết định, nên cần quan tâm đến chất lượng thông tin.', en: 'Information is the basis for decisions, so its quality matters.' },
              { vi: 'Không phải số lượng mà là chất lượng thông tin làm cho thông tin hữu ích.', en: 'It is the quality, not the quantity, that makes information useful.' },
              { vi: 'Chất lượng thông tin được đánh giá qua tính mới, tính chính xác, tính đầy đủ và tính sử dụng được.', en: 'Quality is judged by how up to date, accurate, complete and usable the information is.' },
              { vi: 'Nên ưu tiên nguồn tin đáng tin cậy và đối chiếu nhiều nguồn trước khi quyết định.', en: 'Prefer reliable sources and compare several before deciding.' }
            ]
          },
          {
            t: 'vocab',
            title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' },
            hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.',
            keys: ['information-quality', 'decision', 'criterion', 'up-to-date', 'outdated', 'accurate', 'complete', 'relevant', 'reliable', 'verify', 'kol', 'website', 'source', 'internet']
          }
        ]
      }
    ]
  };

  /* ========================================================================
     BÀI 3. THỰC HÀNH: ĐÁNH GIÁ CHẤT LƯỢNG THÔNG TIN
     ======================================================================== */
  D.lessons['tin9-bai3'] = {
    gradeId: 9,
    number: '3',
    book: 'Tin học 9',
    title: { vi: 'Thực hành: Đánh giá chất lượng thông tin', en: 'Practice: Evaluating the quality of information' },
    topic: { number: '2', vi: 'Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin', en: 'Organising, searching and exchanging information' },
    spreadLabels: ['Nhiệm vụ 1: tìm kiếm theo mục đích', 'Nhiệm vụ 2 và tự kiểm tra'],
    pages: [
      /* ----------------------------------------------------------- Trang 12 */
      {
        number: 12,
        blocks: [
          { t: 'banner' },
          {
            t: 'goals',
            lead: { vi: 'Sau bài học này em sẽ:', en: 'After this lesson you will:' },
            items: [
              { vi: 'Tìm kiếm được thông tin để giải quyết vấn đề.', en: 'Be able to {search|search-engine} for information to solve a problem.' },
              { vi: 'Đánh giá được chất lượng thông tin trong giải quyết vấn đề.', en: 'Be able to judge {information quality|information-quality} in problem solving.' }
            ]
          },
          { t: 'p', badge: 'fire', vi: 'Để chuẩn bị cho việc tiếp tục học tập sau khi kết thúc cấp THCS, em cần tìm hiểu thông tin để giải quyết vấn đề lựa chọn môi trường học tập và xu hướng nghề nghiệp trong tương lai, phù hợp với năng lực và nguyện vọng của em. Theo em, làm thế nào để tìm kiếm được thông tin giúp giải quyết vấn đề chọn trường và đánh giá được chất lượng thông tin mà em đã tìm được?', en: 'To prepare for further study after lower secondary school, you need to find {information} that helps you choose a learning environment and a future career direction that suit your abilities and wishes. How can you find information that helps you choose a school, and judge the quality of what you find?' },
          { t: 'h2', n: '1', vi: 'Nhiệm vụ: Tìm kiếm theo mục đích, yêu cầu', en: 'Task: Searching by purpose and requirements' },
          { t: 'h3', vi: 'Yêu cầu', en: 'Requirements' },
          {
            t: 'list',
            items: [
              { vi: 'Xác định mục đích tìm kiếm và những yêu cầu tìm kiếm cụ thể.', en: 'Decide the purpose of the search and the specific search requirements.' },
              { vi: 'Thực hiện tìm kiếm thông tin dựa trên mục đích và yêu cầu đã xác định.', en: 'Search for information based on the purpose and requirements you decided.' }
            ]
          },
          { t: 'h3', vi: 'Hướng dẫn', en: 'Guide' },
          { t: 'h3', vi: 'a) Xác định mục đích, yêu cầu tìm kiếm thông tin', en: 'a) Decide the purpose and requirements of the search' },
          {
            t: 'list',
            items: [
              { vi: 'Mục đích: tìm thông tin về các trường THPT tại địa phương để quyết định lựa chọn nguyện vọng đăng kí.', en: 'Purpose: find information about the high schools in your area so you can decide which to apply for.' },
              { vi: 'Những yêu cầu tìm kiếm có thể là: điểm chuẩn và chỉ tiêu tuyển sinh của trường trong ba năm gần nhất; tỉ lệ học sinh của trường tốt nghiệp THPT và trúng tuyển vào các trường đại học có uy tín; những nhóm môn học mà trường có thế mạnh; các hoạt động ngoại khoá của trường; khoảng cách từ nhà đến trường.', en: 'Possible requirements: the school’s admission scores and quotas for the last three years; the share of its students who pass the high school graduation exam and enter well-known universities; the groups of subjects the school is strong in; its extracurricular activities; the distance from home to school.' }
            ]
          },
          { t: 'h3', vi: 'b) Thực hiện tìm kiếm', en: 'b) Carry out the search' },
          {
            t: 'list',
            items: [
              { vi: 'Sử dụng máy tìm kiếm và các từ khoá tìm kiếm (xác định từ khoá dựa vào yêu cầu tìm kiếm) để tìm thông tin trên Internet. Ví dụ: dùng từ khoá “Olympic Tin học 2023 tỉnh Phú Thọ” để tìm thông tin về thế mạnh của các trường (Hình 3.1).', en: 'Use a {search engine|search-engine} and {keywords|keyword} (chosen from the search requirements) to find information on the {internet}. For example, use the keywords “Olympic Informatics 2023 Phu Tho province” to find out what the schools are strong in (Figure 3.1).' },
              { vi: 'Lưu tóm tắt (nội dung tóm tắt, địa chỉ trang web) của thông tin tìm được vào một tệp để có thể sử dụng trong việc đánh giá ở bước tiếp theo.', en: 'Save a summary (the key content and the web address) of what you find in a file, to use for the evaluation in the next step.' }
            ]
          },
          { t: 'fig', art: 'search31', no: '3.1', vi: 'Kết quả tìm kiếm với từ khoá “Olympic Tin học 2023 tỉnh Phú Thọ”', en: 'Search result for the keywords “Olympic Informatics 2023 Phu Tho province”' }
        ]
      },

      /* ----------------------------------------------------------- Trang 13 */
      {
        number: 13,
        blocks: [
          {
            t: 'list',
            items: [
              { vi: 'Có thể sử dụng công cụ hội thoại thông minh (công cụ tương tác giữa người với máy tính có ứng dụng trí tuệ nhân tạo) để khoanh vùng phạm vi tìm kiếm với những yêu cầu cụ thể. Ví dụ: “Hãy cho biết tên các trường THPT gần Vĩnh Tường, Phú Thọ” để biết các trường có địa điểm ở gần nhà (Hình 3.2).', en: 'You can use a {smart chat tool|chatbot} (a tool for people and computers to interact, built on artificial intelligence) to narrow the search area for specific requirements. For example: “Tell me the names of the high schools near Vinh Tuong, Phu Tho” to learn which schools are close to home (Figure 3.2).' }
            ]
          },
          { t: 'fig', art: 'ai32', no: '3.2', vi: 'Kết quả khi dùng công cụ hội thoại thông minh với yêu cầu “Hãy cho biết tên các trường THPT gần Vĩnh Tường, Phú Thọ”', en: 'The result of asking a smart chat tool: “Tell me the names of the high schools near Vinh Tuong, Phu Tho”', wide: true },
          {
            t: 'list',
            items: [
              { vi: 'Em có thể tìm kiếm thông tin từ nhiều nguồn nhưng lưu ý rằng độ tin cậy của thông tin trên Internet rất khác nhau. Vì vậy, với mỗi yêu cầu cụ thể, nguồn thông tin cần được xem xét về thẩm quyền để đảm bảo tính tin cậy. Ví dụ: thông tin về tuyển sinh vào lớp 10 cần tìm trên website của Sở Giáo dục và Đào tạo. Lưu ý: trang web các Sở Giáo dục và Đào tạo thường có dạng edu.vn (ví dụ phutho.edu.vn) (Hình 3.3).', en: 'You can look for information in many sources, but remember that how far information on the {internet} can be trusted varies a lot. So, for each requirement, check the {authority} of the source to make sure it is {reliable}. For example, information on Grade 10 admission should be looked for on the website of the Department of Education and Training. Note: the addresses of these departments usually end in edu.vn (for example phutho.edu.vn) (Figure 3.3).' }
            ]
          },
          { t: 'fig', art: 'web33', no: '3.3', vi: 'Địa chỉ trang web của Sở Giáo dục và Đào tạo Phú Thọ', en: 'The web address of the Phu Tho Department of Education and Training' },
          {
            t: 'list',
            items: [
              { vi: 'Thông tin về các hoạt động giáo dục và ngoại khoá nên tìm trên website của nhà trường.', en: 'Information about educational and extracurricular activities should be looked for on the school’s own website.' },
              { vi: 'Không phải mọi thông tin đều có thể tìm được trên website của Sở Giáo dục và Đào tạo hoặc của các trường. Thông tin cần được đối chiếu, kiểm chứng trước khi sử dụng.', en: 'Not all information can be found on the websites of the department or of the schools. Information must be {cross-checked|cross-check} and {verified|verify} before it is used.' }
            ]
          }
        ]
      },

      /* ----------------------------------------------------------- Trang 14 */
      {
        number: 14,
        blocks: [
          { t: 'h2', n: '2', vi: 'Nhiệm vụ: Quyết định dựa trên chất lượng thông tin', en: 'Task: Deciding on the basis of information quality' },
          { t: 'h3', vi: 'Yêu cầu', en: 'Requirements' },
          { t: 'p', plain: true, vi: 'Đánh giá chất lượng thông tin tìm được trong Nhiệm vụ 1. Từ đó, đưa ra danh sách lựa chọn nguyện vọng gồm ba trường theo thứ tự ưu tiên mà em thấy phù hợp với năng lực và sở thích của mình.', en: 'Judge the quality of the information found in Task 1. Then draw up a list of three schools to apply for, in priority order, that suit your abilities and interests.' },
          { t: 'h3', vi: 'Hướng dẫn', en: 'Guide' },
          { t: 'h3', vi: 'a) Đánh giá thông tin', en: 'a) Judge the information' },
          {
            t: 'list',
            items: [
              { vi: '**Tính mới:** em cần thông tin được cập nhật gần nhất. Em có thể kiểm tra xem thông tin về trường có bị lỗi thời không bằng cách kiểm tra ngày đăng bài hoặc ngày cuối cùng được đề cập đến trong bài viết.', en: '**Up to date:** you need the most recently updated information. Check whether the information about a school is {outdated} by looking at the date of posting or the latest date mentioned in the article.' },
              { vi: '**Tính chính xác:** em có thể kiểm tra xem thông tin có chính xác không bằng cách đối chiếu thông tin từ những nguồn khác nhau. Chẳng hạn, những đánh giá tiêu cực về một trường THPT qua một sự việc cụ thể cần được kiểm chứng qua nhiều nguồn thông tin khác nhau.', en: '**Accuracy:** you can check that information is accurate by comparing it with other sources. For example, a negative comment about a school based on one particular incident should be verified through several different sources.' },
              { vi: '**Tính đầy đủ:** em cần hình dung về một trường THPT trong một bức tranh tổng thể, gồm nhiều khía cạnh trong yêu cầu tìm kiếm thông tin. Chẳng hạn, thiếu bất kì thông tin nào như điểm chuẩn, học phí, khoảng cách,… thì lựa chọn của em cũng có thể không thực hiện được.', en: '**Completeness:** you need to picture a school as a whole, covering the aspects in your search requirements. If any piece, such as the admission score, fees or distance, is missing, your choice may not be workable.' },
              { vi: '**Tính sử dụng được:** em có thể kiểm tra thông tin tìm được có phù hợp với yêu cầu chọn trường của em không nhờ tiêu đề và nội dung của bài viết, tránh tập trung vào những thông tin chỉ nhằm thu hút sự chú ý của người xem mà không liên quan đến mục đích tìm kiếm.', en: '**Usability:** check, from the title and content of an article, whether the information fits your requirements for choosing a school, and avoid information that only aims to catch attention and has nothing to do with your search.' }
            ]
          },
          { t: 'h3', vi: 'b) Lựa chọn và sắp xếp thứ tự', en: 'b) Choose and put in order' },
          {
            t: 'list',
            items: [
              { vi: 'Dựa trên thông tin tìm được, em có thể lựa chọn các trường phù hợp với năng lực và sở thích của mình. Em cần lưu ý tính khả thi của phương án được chọn.', en: 'Based on what you found, choose the schools that suit your abilities and interests. Keep in mind whether your chosen plan is workable.' },
              { vi: 'Sắp xếp các trường được chọn theo một danh sách ưu tiên. Thứ tự ưu tiên giữa các tiêu chí lựa chọn sẽ giúp em xác định danh sách các trường được chọn một cách thuận lợi hơn.', en: 'Put the chosen schools into a priority list. Ranking your selection criteria will make it easier to decide the list.' }
            ]
          },
          { t: 'head', kind: 'practice', vi: 'Luyện tập', en: 'Practice' },
          { t: 'p', plain: true, vi: 'Em hãy thực hành tìm kiếm thông tin trên Internet để biết về các môn học được dạy ở cấp THPT. Dựa vào các thông tin tìm được, em hãy đưa ra dự kiến chọn các môn học mà em thích ở cấp THPT.', en: 'Search the {internet} to find out which subjects are taught in high school. Using what you find, make a plan of the subjects you would like to choose.' },
          { t: 'head', kind: 'apply', vi: 'Vận dụng', en: 'Apply' },
          { t: 'p', plain: true, vi: 'Em hãy tạo một bài trình chiếu về chủ đề “Chọn môi trường học tập” sau khi kết thúc cấp THCS, với các nguồn thông tin mà em thu thập được.', en: 'Make a presentation on the topic “Choosing a learning environment” after lower secondary school, using the sources of information you collected.' }
        ]
      },

      /* ----------------------------------------------------------- Trang 15 */
      {
        number: 15,
        blocks: [
          { t: 'head', kind: 'extra', vi: 'Mở rộng: tự kiểm tra', en: 'Extension: self-check' },
          {
            t: 'quiz',
            title: { vi: 'Luyện tập', en: 'Practice' },
            items: [
              {
                id: 'q1',
                vi: 'Thông tin tuyển sinh vào lớp 10 nên tìm ở trang web có dạng nào?',
                en: 'On which kind of web address should you look for Grade 10 admission information?',
                options: [
                  { vi: 'Trang web của Sở Giáo dục và Đào tạo (đuôi edu.vn)', en: 'The Department of Education and Training website (ending in edu.vn)' },
                  { vi: 'Một trang mạng xã hội ẩn danh', en: 'An anonymous social media page' },
                  { vi: 'Quảng cáo xuất hiện ngẫu nhiên', en: 'A random advertisement' },
                  { vi: 'Bất kì trang nào hiện đầu tiên', en: 'Whichever page appears first' }
                ],
                answer: 0,
                whyVi: 'Đây là cơ quan có thẩm quyền, nên thông tin đáng tin cậy.',
                whyEn: 'This is the authority, so its information is {reliable}.'
              },
              {
                id: 'q2',
                vi: 'Em thấy một tin tiêu cực về một trường trên một trang. Em nên làm gì?',
                en: 'You see a negative story about a school on one page. What should you do?',
                options: [
                  { vi: 'Tin ngay và loại trường đó', en: 'Believe it at once and drop the school' },
                  { vi: 'Đối chiếu với nhiều nguồn khác trước khi kết luận', en: 'Compare it with several other sources before deciding' },
                  { vi: 'Chia sẻ ngay cho bạn bè', en: 'Share it with friends right away' },
                  { vi: 'Bỏ qua mọi thông tin khác', en: 'Ignore all other information' }
                ],
                answer: 1,
                whyVi: 'Để bảo đảm tính chính xác, cần kiểm chứng qua nhiều nguồn khác nhau.',
                whyEn: 'To make sure it is accurate, it must be verified through several different sources.'
              },
              {
                id: 'q3',
                vi: 'Từ khoá tìm kiếm nên được xác định dựa vào điều gì?',
                en: 'What should the search keywords be based on?',
                options: [
                  { vi: 'Yêu cầu tìm kiếm', en: 'The search requirements' },
                  { vi: 'Màu sắc của trình duyệt', en: 'The colour of the browser' },
                  { vi: 'Số lượng kết quả', en: 'The number of results' },
                  { vi: 'Tên của máy tính', en: 'The name of the computer' }
                ],
                answer: 0,
                whyVi: 'Từ khoá phải phản ánh đúng yêu cầu cụ thể em cần tìm.',
                whyEn: 'Keywords must reflect the specific requirement you want to find.'
              }
            ]
          },
          {
            t: 'summary',
            title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' },
            items: [
              { vi: 'Xác định mục đích và yêu cầu trước, rồi mới chọn từ khoá để tìm kiếm.', en: 'First fix the purpose and requirements, then choose keywords to search.' },
              { vi: 'Chọn nguồn có thẩm quyền; đối chiếu thông tin từ nhiều nguồn.', en: 'Choose authoritative sources and cross-check information from several.' },
              { vi: 'Đánh giá thông tin theo tính mới, chính xác, đầy đủ, sử dụng được rồi mới quyết định.', en: 'Judge information by how up to date, accurate, complete and usable it is before deciding.' }
            ]
          },
          {
            t: 'vocab',
            title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' },
            hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.',
            keys: ['search-engine', 'keyword', 'website', 'authority', 'reliable', 'cross-check', 'verify', 'chatbot', 'information-quality', 'outdated']
          }
        ]
      }
    ]
  };
})();
