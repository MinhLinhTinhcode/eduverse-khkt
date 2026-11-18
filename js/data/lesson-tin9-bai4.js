/* ==========================================================================
   TIN HỌC 9 — CHỦ ĐỀ 3. ĐẠO ĐỨC, PHÁP LUẬT VÀ VĂN HOÁ TRONG MÔI TRƯỜNG SỐ
     'tin9-bai4'  Bài 4. Một số vấn đề pháp lí về sử dụng dịch vụ Internet (tr. 15–19)
   Trang 20 là phần mở rộng (trắc nghiệm, tóm tắt, từ vựng).
   Lời văn được biên soạn lại, không chép nguyên văn sách giáo khoa.
   ========================================================================== */
(function () {
  'use strict';
  const D = (window.TEXTBOOK = window.TEXTBOOK || {});
  D.lessons = D.lessons || {};
  D.glossary = D.glossary || {};
  const g = (word, ipa, pos, vi, ctx, en, viEx) => ({ word, ipa, pos, vi, ctx, ex: { en, vi: viEx } });

  Object.assign(D.glossary, {
    'negative-impact': g('negative impact', '/ˈneɡ.ə.tɪv ˈɪm.pækt/', 'n', 'tác động tiêu cực',
      'Ảnh hưởng xấu mà công nghệ số có thể gây ra cho con người và xã hội.',
      'Digital technology can have a negative impact on health.', 'Công nghệ số có thể tác động tiêu cực đến sức khoẻ.'),
    addiction: g('addiction', '/əˈdɪk.ʃən/', 'n', 'sự nghiện',
      'Tình trạng không kiểm soát được việc sử dụng, ví dụ nghiện Internet hay trò chơi điện tử.',
      'Playing games for too long can lead to addiction.', 'Chơi trò chơi quá lâu có thể dẫn đến nghiện.'),
    privacy: g('privacy', '/ˈprɪv.ə.si/', 'n', 'quyền riêng tư',
      'Quyền giữ kín thông tin cá nhân, không bị người khác biết hoặc sử dụng trái phép.',
      'Leaked personal data puts your privacy at risk.', 'Dữ liệu cá nhân bị lộ khiến quyền riêng tư bị đe doạ.'),
    'personal-information': g('personal information', '/ˈpɜː.sən.əl ˌɪn.fəˈmeɪ.ʃən/', 'n', 'thông tin cá nhân',
      'Thông tin về một người như họ tên, số điện thoại, địa chỉ nhà, tài khoản ngân hàng.',
      'Never share personal information with strangers.', 'Đừng bao giờ chia sẻ thông tin cá nhân với người lạ.'),
    steal: g('steal', '/stiːl/', 'v', 'đánh cắp',
      'Lấy trộm, ví dụ đánh cắp dữ liệu hay tài khoản.',
      'Hackers steal bank account data.', 'Tin tặc đánh cắp dữ liệu tài khoản ngân hàng.'),
    unemployment: g('unemployment', '/ˌʌn.ɪmˈplɔɪ.mənt/', 'n', 'thất nghiệp',
      'Tình trạng người lao động mất việc, có thể tăng khi tự động hoá phát triển.',
      'Automation may increase unemployment.', 'Tự động hoá có thể làm tăng thất nghiệp.'),
    'electronic-waste': g('electronic waste', '/ˌel.ekˈtrɒn.ɪk weɪst/', 'n', 'rác thải điện tử',
      'Thiết bị số lỗi thời bị thải bỏ, gây nguy hại cho môi trường.',
      'Old phones become electronic waste.', 'Điện thoại cũ trở thành rác thải điện tử.'),
    anonymous: g('anonymous', '/əˈnɒn.ɪ.məs/', 'adj', 'ẩn danh',
      'Không để lộ danh tính thật khi hoạt động trên mạng.',
      'Chatting with anonymous people can be unsafe.', 'Trò chuyện với người ẩn danh có thể không an toàn.'),
    law: g('law', '/lɔː/', 'n', 'luật, pháp luật',
      'Quy định do Quốc hội ban hành mà mọi người phải tuân theo.',
      'The Law on Cybersecurity was issued in 2018.', 'Luật An ninh mạng được ban hành năm 2018.'),
    decree: g('decree', '/dɪˈkriː/', 'n', 'nghị định',
      'Văn bản của Chính phủ hướng dẫn thi hành luật.',
      'Decree 72/2013/ND-CP regulates Internet services.', 'Nghị định 72/2013/NĐ-CP quy định về dịch vụ Internet.'),
    cybersecurity: g('cybersecurity', '/ˈsaɪ.bə.sɪˌkjʊə.rə.ti/', 'n', 'an ninh mạng',
      'Hoạt động bảo vệ an ninh quốc gia và trật tự, an toàn xã hội trên không gian mạng.',
      'The Law on Cybersecurity bans some online acts.', 'Luật An ninh mạng nghiêm cấm một số hành vi trên mạng.'),
    'information-security': g('information security', '/ˌɪn.fəˈmeɪ.ʃən sɪˈkjʊə.rə.ti/', 'n', 'an toàn thông tin',
      'Bảo vệ thông tin và hệ thống khỏi truy cập, sửa đổi hay phá hoại trái phép.',
      'Information security protects data from attacks.', 'An toàn thông tin bảo vệ dữ liệu khỏi các cuộc tấn công.'),
    copyright: g('copyright', '/ˈkɒp.i.raɪt/', 'n', 'bản quyền',
      'Quyền của chủ sở hữu đối với tác phẩm, dữ liệu, phần mềm; dùng không phép là vi phạm.',
      'Using software without a licence breaks copyright.', 'Dùng phần mềm không có giấy phép là vi phạm bản quyền.'),
    'intellectual-property': g('intellectual property', '/ˌɪn.təˈlek.tʃu.əl ˈprɒp.ə.ti/', 'n', 'sở hữu trí tuệ',
      'Quyền đối với sản phẩm của trí óc như văn bản, hình ảnh, chương trình.',
      'Copying someone’s code violates intellectual property.', 'Sao chép mã của người khác vi phạm sở hữu trí tuệ.'),
    malware: g('malware', '/ˈmæl.weər/', 'n', 'phần mềm độc hại',
      'Phần mềm (như virus máy tính) gây hại cho máy tính và dữ liệu.',
      'Malware spreads through fake links.', 'Phần mềm độc hại lan truyền qua các liên kết giả.'),
    virus: g('computer virus', '/kəmˈpjuː.tə ˈvaɪ.rəs/', 'n', 'virus máy tính',
      'Một loại phần mềm độc hại tự lây lan và phá hoại.',
      'Do not click links that may spread a virus.', 'Đừng bấm vào liên kết có thể lây virus.'),
    spam: g('spam', '/spæm/', 'n', 'thư rác, tin nhắn rác',
      'Thư hoặc tin nhắn quảng cáo gửi nhiều lần cho người không muốn nhận.',
      'Spam fills up your inbox.', 'Thư rác làm đầy hộp thư của em.'),
    cyberbullying: g('cyberbullying', '/ˈsaɪ.bəˌbʊl.i.ɪŋ/', 'n', 'bắt nạt qua mạng',
      'Dùng lời nói, hình ảnh, video để chỉ trích, hạ nhục người khác trên mạng.',
      'Cyberbullying hurts victims deeply.', 'Bắt nạt qua mạng làm tổn thương nạn nhân sâu sắc.'),
    ethics: g('ethics', '/ˈeθ.ɪks/', 'n', 'đạo đức',
      'Chuẩn mực về điều nên và không nên làm trong ứng xử.',
      'Online ethics means respecting others.', 'Đạo đức trên mạng là tôn trọng người khác.'),
    'digital-culture': g('digital culture', '/ˈdɪdʒ.ɪ.təl ˈkʌl.tʃər/', 'n', 'văn hoá số',
      'Cách ứng xử lịch sự, văn minh khi hoạt động trong môi trường số.',
      'Polite words are part of digital culture.', 'Lời nói lịch sự là một phần của văn hoá số.'),
    'illegal-act': g('illegal act', '/ɪˈliː.ɡəl ækt/', 'n', 'hành vi vi phạm pháp luật',
      'Hành vi trái với quy định của pháp luật.',
      'Spreading false news can be an illegal act.', 'Phát tán tin sai sự thật có thể là hành vi vi phạm pháp luật.')
  });

  D.lessons['tin9-bai4'] = {
    gradeId: 9, number: '4', book: 'Tin học 9',
    title: { vi: 'Một số vấn đề pháp lí về sử dụng dịch vụ Internet', en: 'Some legal issues in using Internet services' },
    topic: { number: '3', vi: 'Đạo đức, pháp luật và văn hoá trong môi trường số', en: 'Ethics, law and culture in the digital environment' },
    spreadLabels: ['Tác động tiêu cực của công nghệ số', 'Sử dụng Internet đúng luật', 'Các văn bản pháp luật và hành vi cần tránh', 'Trắc nghiệm, tóm tắt và từ vựng'],
    pages: [
      { number: 15, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: { vi: 'Sau bài học này em sẽ:', en: 'After this lesson you will:' }, items: [
          { vi: 'Trình bày được một số tác động tiêu cực của công nghệ kĩ thuật số đối với đời sống con người và xã hội, nêu được ví dụ minh hoạ.', en: 'Describe some {negative impacts|negative-impact} of digital technology on people and society, with examples.' },
          { vi: 'Nêu được một số nội dung liên quan đến luật Công nghệ thông tin, nghị định về sử dụng dịch vụ Internet, các khía cạnh pháp lí của việc sở hữu, sử dụng và trao đổi thông tin.', en: 'State some content of the {law} on information technology and the {decree} on Internet services, and the legal aspects of owning, using and exchanging information.' },
          { vi: 'Nêu được một số hành vi vi phạm pháp luật, trái đạo đức, thiếu văn hoá khi hoạt động trong môi trường số qua một vài ví dụ.', en: 'Give examples of acts that break the law, are unethical or lack {culture|digital-culture} in the digital environment.' }
        ] },
        { t: 'p', badge: 'fire', vi: 'Trong thời đại kĩ thuật số phát triển, hầu hết thông tin đều ở dạng số. Điều này khiến cho đời sống xã hội thay đổi toàn diện. Công nghệ kĩ thuật số giúp cho mọi việc của con người trong lao động, sản xuất, học tập hay giải trí,… thuận tiện, dễ dàng và nhanh chóng hơn. Bên cạnh những tác động tích cực đó, công nghệ kĩ thuật số cũng có những tác động tiêu cực đến con người. Em hãy thảo luận với bạn và kể ra một vài tác động tiêu cực đó.', en: 'In the age of digital technology almost all {information} is in digital form, which changes social life completely. Digital technology makes work, production, study and entertainment easier and faster. Besides these positive effects it also has {negative impacts|negative-impact} on people. Discuss with a friend and name a few.' },
        { t: 'h2', n: '1', vi: 'Một số tác động tiêu cực của công nghệ kĩ thuật số', en: 'Some negative impacts of digital technology' },
        { t: 'activity', no: 1, title: { vi: 'Mặt trái của công nghệ kĩ thuật số', en: 'The downside of digital technology' },
          vi: '1. Chọn những phương án nói về tác động tiêu cực của công nghệ kĩ thuật số tới đời sống con người và xã hội.',
          en: '1. Choose the options that describe {negative impacts|negative-impact} of digital technology on people and society.',
          items: [
            { vi: 'Quyền riêng tư dễ bị ảnh hưởng.', en: '{Privacy} is easily affected.' },
            { vi: 'Dữ liệu tài khoản ngân hàng bị đánh cắp.', en: 'Bank account data is {stolen|steal}.' },
            { vi: 'Giao dịch trong thương mại tăng nhanh nhờ ứng dụng ngân hàng số.', en: 'Trade transactions speed up thanks to digital banking apps.' },
            { vi: 'Ô nhiễm do rác thải từ những thiết bị công nghệ số lỗi thời.', en: 'Pollution from the {electronic waste|electronic-waste} of outdated digital devices.' }
          ], style: 'alpha' },
        { t: 'p', plain: true, vi: '2. Em hãy kể thêm một vài tác động tiêu cực của công nghệ kĩ thuật số đối với xã hội.', en: '2. Name more negative impacts of digital technology on society.' },
        { t: 'p', badge: 'book', vi: 'Dù công nghệ kĩ thuật số thúc đẩy mọi lĩnh vực và đem lại cuộc sống hiện đại, thông minh, tiện lợi hơn, ta vẫn không thể phủ nhận những tác động tiêu cực của nó. Đối với con người, công nghệ số ảnh hưởng xấu đến sức khoẻ thể chất và tinh thần như nghiện Internet, ít giao tiếp, mất ngủ,…; và ảnh hưởng đến quyền riêng tư, như thông tin cá nhân có thể bị rò rỉ và sử dụng bất hợp pháp vì dữ liệu số bị đánh cắp dễ dàng hơn, với quy mô lớn hơn.', en: 'Although digital technology drives every field and brings a more modern, smarter and more convenient life, its {negative impacts|negative-impact} cannot be denied. For people it harms physical and mental health, for example Internet {addiction}, less face-to-face contact and loss of sleep; and it affects {privacy}: {personal information|personal-information} can leak and be used illegally because digital data is {stolen|steal} more easily and on a larger scale.' }
      ] },

      { number: 16, blocks: [
        { t: 'p', vi: 'Bên cạnh các ứng dụng nâng cao chất lượng đời sống, vẫn có những ứng dụng hỗ trợ và phổ biến tệ nạn trên mạng như lừa đảo, tổ chức đánh bạc trực tuyến,… Công nghệ phát triển, tự động hoá ứng dụng nhiều dẫn đến nguy cơ thất nghiệp tăng và khiến một bộ phận người dân yếu thế như người già, người khuyết tật hoặc người dân ở vùng khó khăn ngày càng tụt hậu. Đó là những tác động tiêu cực đối với xã hội. Ngoài ra, công nghệ phát triển nhanh khiến thiết bị số nhanh chóng lỗi thời; thiết bị số bị thải ra nhiều sẽ tạo ra rác thải điện tử nguy hại cho môi trường.', en: 'Besides apps that raise quality of life, some apps support and spread online vices such as {fraud|scam} and online gambling. Fast technology and wide automation raise the risk of {unemployment}, and leave vulnerable groups, such as old people, people with disabilities and people in poor areas, further behind. These are {negative impacts|negative-impact} on society. Also, fast-changing technology makes digital devices outdated quickly, and many discarded devices create {electronic waste|electronic-waste} that harms the environment.' },
        { t: 'p', vi: 'Một số ví dụ cụ thể:', en: 'Some specific examples:' },
        { t: 'list', items: [
          { vi: 'Chơi trò chơi điện tử quá nhiều, liên tục có thể gây nghiện. Không được chơi sẽ cảm thấy bứt rứt, khó chịu, không kiểm soát được cảm xúc.', en: 'Playing electronic games too much and too often can cause {addiction}. Not being allowed to play makes you restless, upset and unable to control your feelings.' },
          { vi: 'Quá lệ thuộc vào công nghệ kĩ thuật số để giải quyết những vấn đề nhỏ trong cuộc sống (học sinh nhờ trí tuệ nhân tạo làm bài tập về nhà, làm văn,…).', en: 'Depending too much on digital technology to solve small problems in life (students asking artificial intelligence to do their homework or essays).' },
          { vi: 'Trò chuyện trực tuyến với đối tượng ẩn danh hay mạo danh dẫn đến nguy cơ mất an toàn do có thể lộ thông tin cá nhân.', en: 'Chatting online with {anonymous} or fake-identity people risks your safety because you may reveal {personal information|personal-information}.' },
          { vi: 'Thông tin số có thể bị đánh cắp, gây thiệt hại cho người sử dụng. Ví dụ: việc lộ thông tin tài khoản ngân hàng có thể bị mất tiền trong tài khoản (Hình 4.1).', en: 'Digital information can be {stolen|steal} and harm its users. For example, leaking bank account details can empty the account (Figure 4.1).' },
          { vi: 'Thông tin về cha mẹ, số điện thoại, địa chỉ nhà của học sinh có thể bị đánh cắp và bị các đối tượng xấu lợi dụng, giả danh liên hệ để lừa cha mẹ học sinh.', en: 'A student’s information about parents, phone number and home address can be stolen and used by bad actors who pretend to be someone else to trick the parents.' }
        ] },
        { t: 'fig', art: 'theft41', no: '4.1', vi: 'Thông tin số có thể bị đánh cắp', en: 'Digital information can be stolen' },
        { t: 'tip', items: [{ vi: 'Ngoài các tác động tích cực, công nghệ kĩ thuật số còn có một số tác động tiêu cực lên đời sống con người và xã hội.', en: 'Besides its positive effects, digital technology also has some {negative impacts|negative-impact} on people’s lives and on society.' }], plain: true },
        { t: 'ask', style: 'alpha', lead: { vi: '1. Phương án nào sau đây KHÔNG phải là tác động tiêu cực của công nghệ kĩ thuật số đến đời sống con người?', en: '1. Which of the following is NOT a negative impact of digital technology on people’s lives?' }, items: [
          { vi: 'Nhờ trí tuệ nhân tạo làm bài tập về nhà.', en: 'Asking artificial intelligence to do homework.' },
          { vi: 'Truy cập mạng xã hội trong nhiều giờ.', en: 'Using social media for many hours.' },
          { vi: 'Thường xuyên sử dụng phần mềm soạn thảo văn bản để làm báo cáo.', en: 'Regularly using a word processor to write reports.' },
          { vi: 'Vừa ăn vừa xem video trên trang YouTube.', en: 'Watching videos on YouTube while eating.' }
        ] },
        { t: 'ask', style: 'alpha', lead: { vi: '2. Những phương án nào sau đây là tác động tiêu cực của công nghệ kĩ thuật số đến xã hội?', en: '2. Which of the following are negative impacts of digital technology on society?' }, items: [
          { vi: 'Thông tin cá nhân của con người được số hoá.', en: 'People’s personal information is digitised.' },
          { vi: 'Sử dụng thiết bị số liên tục trong thời gian dài ảnh hưởng đến sức khoẻ thể chất và tinh thần của lớp trẻ.', en: 'Using digital devices continuously for long periods harms young people’s physical and mental health.' },
          { vi: 'Gia tăng ô nhiễm môi trường.', en: 'More environmental pollution.' },
          { vi: 'Làm gia tăng tỉ lệ thất nghiệp.', en: 'A higher {unemployment} rate.' }
        ] }
      ] },

      { number: 17, blocks: [
        { t: 'h2', n: '2', vi: 'Sử dụng dịch vụ Internet đúng luật', en: 'Using Internet services within the law' },
        { t: 'activity', no: 2, title: { vi: 'Sử dụng dịch vụ Internet đúng luật', en: 'Using Internet services lawfully' },
          vi: '1. Những hành vi nào sau đây vi phạm pháp luật, trái đạo đức, thiếu văn hoá?',
          en: '1. Which of these acts break the law, are unethical or lack culture?',
          items: [
            { vi: 'Tải về một hình ảnh trên Internet khi chưa có sự cho phép của chủ sở hữu và sử dụng như là của mình.', en: 'Downloading an image from the {internet} without the owner’s permission and using it as your own.' },
            { vi: 'Sử dụng ngôn ngữ phản cảm khi giao tiếp trên mạng xã hội.', en: 'Using offensive language when communicating on social media.' },
            { vi: 'Chúc mừng sinh nhật bạn trên mạng xã hội.', en: 'Wishing a friend a happy birthday on social media.' },
            { vi: 'Đăng hình ảnh, video bôi nhọ, xúc phạm tập thể hoặc cá nhân lên mạng.', en: 'Posting images or videos that defame or insult a group or a person online.' }
          ], style: 'alpha' },
        { t: 'p', plain: true, vi: '2. Em hãy kể thêm một số hành vi vi phạm pháp luật, trái đạo đức, thiếu văn hoá của người sử dụng dịch vụ Internet.', en: '2. Name more acts by Internet users that break the law, are unethical or lack culture.' },
        { t: 'h3', vi: 'a) Những hành vi vi phạm pháp luật, trái đạo đức, thiếu văn hoá khi hoạt động trong môi trường số', en: 'a) Acts that break the law, are unethical or lack culture in the digital environment' },
        { t: 'p', badge: 'book', vi: 'Ở lớp 7 em đã biết ứng xử khi giao tiếp qua mạng cần theo đúng quy tắc và bằng ngôn ngữ lịch sự, có văn hoá; đã biết cách ứng xử hợp lí khi gặp những thông tin trên mạng có nội dung xấu, không phù hợp lứa tuổi. Ở lớp 8, em cũng đã nhận biết một số biểu hiện vi phạm đạo đức và pháp luật, biểu hiện thiếu văn hoá khi sử dụng công nghệ kĩ thuật số. Em có thể nhận biết một số hành vi vi phạm pháp luật, trái đạo đức, thiếu văn hoá trong môi trường mạng (Hình 4.2), ví dụ như:', en: 'In Grade 7 you learned to follow the rules and use polite, cultured language online, and to react sensibly to bad or age-inappropriate content. In Grade 8 you learned to recognise signs of breaking {ethics} and the law, and of lacking culture, when using digital technology. You can recognise some acts that break the law, are unethical or lack culture online (Figure 4.2), for example:' },
        { t: 'list', items: [
          { vi: 'Viết bài, đăng tin tức hoặc chia sẻ bài đăng sai sự thật hoặc không phù hợp lên mạng. Tuỳ theo nội dung thông tin và hậu quả mà những hành vi đó có thể là vi phạm pháp luật hay vi phạm đạo đức.', en: 'Writing, posting or sharing false or unsuitable content online. Depending on the content and the consequences, such acts may break the law or break {ethics}.' },
          { vi: 'Làm lộ thông tin của cá nhân hay tổ chức mà không được phép, gây ảnh hưởng đến uy tín và danh dự của cá nhân hay tổ chức là hành vi vi phạm pháp luật.', en: 'Revealing information about a person or an organisation without permission, harming their reputation and honour, is an {illegal act|illegal-act}.' },
          { vi: 'Gửi thư rác hay tin nhắn rác với mục đích quảng cáo mà người được gửi không muốn nhận. Quảng cáo bằng tin nhắn không phải là hành vi xấu và không vi phạm pháp luật, nhưng nếu gửi nhiều mà người nhận đã có phản ứng không muốn nhận thì trở thành hành vi quấy nhiễu.', en: 'Sending {spam} to advertise to people who do not want it. Advertising by message is not bad or illegal in itself, but if you keep sending after the receiver has shown they do not want it, it becomes harassment.' },
          { vi: 'Sử dụng dữ liệu của người khác không xin phép hay sử dụng phần mềm không có bản quyền là hành vi vi phạm pháp luật. Những sản phẩm được số hoá và đưa lên mạng rất dễ bị sao chép, phát tán, sửa đổi gây thiệt hại cho chủ sở hữu.', en: 'Using other people’s data without permission, or using software without {copyright|copyright} (a licence), is an illegal act. Digitised products put online are easy to copy, spread and alter, which harms their owners.' },
          { vi: 'Dùng lời nói xúc phạm, đăng bình luận đả kích, khiêm nhã, quấy rối hoặc kêu gọi tẩy chay; thậm chí dùng hình ảnh, video nhằm chỉ trích, hạ nhục người khác.', en: 'Using insulting words, posting attacking or rude comments, harassing or calling for boycotts, even using images or videos to blame or humiliate others ({cyberbullying}).' },
          { vi: 'Bằng các hình thức như giả mạo ngân hàng, cơ quan nhà nước, người thân,… tạo liên kết hoặc gọi điện lừa đảo dưới dạng trúng thưởng, từ thiện, gây tò mò,… nhằm lừa đảo chiếm tài khoản, lấy cắp thông tin, chiếm đoạt tài sản, tống tiền.', en: '{Fraud|scam} by pretending to be a bank, a state agency or a relative, creating links or making calls disguised as prizes, charity or curiosity, in order to take over accounts, steal information, seize property or blackmail.' },
          { vi: 'Ứng xử thiếu văn hoá: trên các diễn đàn, mạng xã hội, có những người tranh luận thiếu văn hoá, không tôn trọng người đối thoại, thậm chí dùng từ ngữ phản cảm.', en: 'Lack of culture: on forums and social media some people argue rudely, do not respect the other person, and even use offensive words.' }
        ] }
      ] },

      { number: 18, blocks: [
        { t: 'fig', art: 'tree42', no: '4.2', vi: 'Một số hành vi vi phạm pháp luật, trái đạo đức, thiếu văn hoá trong môi trường số', en: 'Some acts that break the law, are unethical or lack culture in the digital environment', wide: true },
        { t: 'h3', vi: 'b) Sử dụng dịch vụ Internet đúng luật', en: 'b) Using Internet services lawfully' },
        { t: 'p', badge: 'book', vi: 'Ở lớp 7 em đã biết chỉ ra ví dụ truy cập không hợp lệ vào các nguồn thông tin, ở lớp 8 em đã biết cách bảo đảm được các sản phẩm số do em tạo ra thể hiện được đạo đức, tính văn hoá và không vi phạm pháp luật.', en: 'In Grade 7 you learned to give examples of illegal access to sources of information; in Grade 8 you learned to make sure the digital products you create show {ethics} and culture and do not break the law.' },
        { t: 'list', items: [
          { vi: 'Năm 2006, Quốc hội ban hành **Luật Công nghệ thông tin số 67/2006/QH11** quy định chi tiết về quyền và trách nhiệm của tổ chức, cá nhân tham gia ứng dụng và phát triển công nghệ thông tin cũng như các hành vi bị nghiêm cấm.', en: 'In 2006 the National Assembly issued the **Law on Information Technology No. 67/2006/QH11**, which sets out the rights and duties of organisations and individuals who apply and develop information technology, and the acts that are strictly forbidden.' },
          { vi: 'Năm 2013, Chính phủ ban hành **Nghị định số 72/2013/NĐ-CP** quy định chi tiết việc quản lí, cung cấp, sử dụng dịch vụ Internet, thông tin trên mạng, trò chơi điện tử trên mạng; bảo đảm an toàn thông tin và an ninh thông tin; quyền và nghĩa vụ của tổ chức, cá nhân tham gia việc quản lí, cung cấp, sử dụng dịch vụ Internet, thông tin trên mạng, trò chơi điện tử trên mạng. Trong nghị định này cũng ghi rõ các hành vi bị cấm.', en: 'In 2013 the Government issued **Decree No. 72/2013/ND-CP**, which sets out the management, provision and use of Internet services, online information and online games; ensuring {information security|information-security}; and the rights and duties of those who manage, provide and use them. It also lists the forbidden acts.' },
          { vi: 'Năm 2018, Quốc hội ban hành **Luật An ninh mạng** quy định về hoạt động bảo vệ an ninh quốc gia và bảo đảm trật tự, an toàn xã hội trên không gian mạng; trách nhiệm của cơ quan, tổ chức, cá nhân có liên quan. Trong đó có ghi rõ các hành vi bị nghiêm cấm về an ninh mạng.', en: 'In 2018 the National Assembly issued the **Law on {Cybersecurity|cybersecurity}**, covering the protection of national security and the keeping of social order and safety in cyberspace, and the duties of the bodies, organisations and individuals concerned. It lists the acts that are strictly forbidden.' }
        ] },
        { t: 'p', vi: 'Tóm lại, người sử dụng Internet, mạng xã hội phải trang bị cho mình những kiến thức cần thiết để bảo đảm sử dụng không gian mạng có trách nhiệm, không vi phạm pháp luật. Có thể nêu ra một số hành vi cần tránh như sau:', en: 'In short, people who use the {internet} and social media must equip themselves with the knowledge needed to use cyberspace responsibly and lawfully. Some acts to avoid:' },
        { t: 'list', items: [
          { vi: '**Hành vi vi phạm pháp luật về an ninh quốc gia, trật tự, an toàn xã hội.** Chẳng hạn, không xem xét kĩ mà đã chia sẻ, phát tán thông tin chưa kiểm chứng, bình luận sai trái, chi tiết bịa đặt,… vì như vậy là đã vô tình tiếp tay cho kẻ xấu phát tán thông tin vi phạm pháp luật.', en: '**Acts against national security, public order and safety.** For example, sharing unverified information or posting wrong comments and invented details without thinking, which unwittingly helps bad actors spread illegal information.' },
          { vi: '**Hành vi vi phạm quyền nhân thân, uy tín của cá nhân và tổ chức.** Chẳng hạn, đăng hình ảnh, địa chỉ nhà, biển số xe,… của người khác hoặc các thông tin cá nhân, thông tin của tổ chức, doanh nghiệp,… mà không có sự đồng ý của họ cũng là vi phạm pháp luật.', en: '**Acts violating the personal rights and reputation of individuals and organisations.** For example, posting someone’s photo, home address or licence plate, or the {personal information|personal-information} of an organisation or business, without their consent is also illegal.' },
          { vi: '**Hành vi vi phạm pháp luật liên quan đến sở hữu trí tuệ, sở hữu tài sản, đánh bạc,…** Chẳng hạn, tuỳ tiện chia sẻ đoạn văn, bài thơ, bức ảnh, đoạn mã chương trình hay sản phẩm số của người khác khi không được phép hoặc truy cập trang web tổ chức đánh bạc trực tuyến trái pháp luật,…', en: '**Illegal acts involving {intellectual property|intellectual-property}, property ownership, gambling, …** For example, freely sharing someone else’s passage, poem, picture, program code or digital product without permission, or visiting illegal online gambling sites.' }
        ] }
      ] },

      { number: 19, blocks: [
        { t: 'list', items: [
          { vi: '**Hành vi vi phạm đến việc bảo đảm an toàn thông tin trên không gian mạng.** Chẳng hạn, làm phát tán virus máy tính thông qua truy cập các liên kết lừa đảo nhận thưởng hoặc gây tò mò.', en: '**Acts that threaten {information security|information-security} in cyberspace.** For example, spreading a computer {virus} by opening fraudulent links that promise prizes or arouse curiosity.' },
          { vi: '**Hành vi tuyên truyền, quảng cáo, giới thiệu sản phẩm, dịch vụ không phù hợp quy định của pháp luật, trái với thuần phong, mĩ tục, lối sống văn minh,…** Chẳng hạn, quảng cáo vũ khí, buôn bán động vật quý hiếm,…', en: '**Promoting, advertising or introducing products and services against the law or against good customs and a civilised way of life.** For example, advertising weapons or trading rare animals.' },
          { vi: '**Hành vi xuyên tạc lịch sử, phủ nhận thành tựu cách mạng, phá hoại khối đại đoàn kết toàn dân tộc, xúc phạm hoặc phân biệt đối xử về tôn giáo, về giới, về chủng tộc, về vùng miền,…**', en: '**Distorting history, denying revolutionary achievements, breaking national unity, or insulting or discriminating on grounds of religion, gender, race or region.**' }
        ] },
        { t: 'tip', items: [
          { vi: 'Khi hoạt động trong môi trường số, sử dụng các dịch vụ Internet, người sử dụng cần có trách nhiệm, ứng xử lành mạnh, có văn hoá và không vi phạm pháp luật.', en: 'When working in the digital environment and using Internet services, users must be responsible, behave in a healthy and cultured way and not break the law.' },
          { vi: 'Khi hoạt động trong môi trường số, em cần cẩn trọng, tránh vi phạm bản quyền khi sử dụng dữ liệu, phần mềm và cảnh giác với các giao tiếp trên mạng. Đồng thời khi giao tiếp cũng luôn thể hiện là người có văn hoá, tôn trọng mọi người.', en: 'In the digital environment be careful not to infringe {copyright} when using data and software, and be alert in online communication. Always show yourself to be a cultured person who respects everyone.' }
        ] },
        { t: 'ask', style: 'alpha', lead: { vi: '1. Hành vi nào sau đây khi hoạt động trong môi trường số không vi phạm pháp luật, trái đạo đức, thiếu văn hoá?', en: '1. Which of these acts in the digital environment does NOT break the law, is not unethical and does not lack culture?' }, items: [
          { vi: 'Đăng bài hoặc bình luận gây mâu thuẫn vùng miền.', en: 'Posting or commenting in a way that stirs up regional conflict.' },
          { vi: 'Quảng cáo bán hàng hoá, dịch vụ bị cấm.', en: 'Advertising banned goods or services.' },
          { vi: 'Sử dụng trái phép tài khoản mạng của tổ chức, cá nhân khác.', en: 'Using another organisation’s or person’s network account without permission.' },
          { vi: 'Chia sẻ thông tin về lớp học ngôn ngữ lập trình trực tuyến.', en: 'Sharing information about an online programming-language class.' }
        ] },
        { t: 'p', plain: true, vi: '2. Minh nhận được một liên kết lạ từ một bạn mới quen trên mạng yêu cầu chia sẻ liên kết này cho 5 bạn và truy cập liên kết để nhận được một phần quà là chiếc ba lô rất đẹp. Theo em, Minh có nên làm theo yêu cầu đó không? Tại sao?', en: '2. Minh gets a strange link from a new online friend asking him to share it with 5 friends and open it to receive a prize, a very nice backpack. In your opinion, should Minh do it? Why?' },
        { t: 'head', kind: 'practice', vi: 'Luyện tập', en: 'Practice' },
        { t: 'ask', style: 'alpha', lead: { vi: '1. Em hãy cho biết những cách nào sau đây giúp em tránh được các tác động tiêu cực khi sử dụng công nghệ kĩ thuật số.', en: '1. Which of these help you avoid the negative impacts of using digital technology?' }, items: [
          { vi: 'Không sử dụng thiết bị số trong thời gian dài và liên tục.', en: 'Not using digital devices for long, continuous periods.' },
          { vi: 'Không xem các video phản cảm.', en: 'Not watching offensive videos.' },
          { vi: 'Giảm thời gian dùng điện thoại để nói chuyện với gia đình.', en: 'Cutting the time you use the phone to talk with your family.' },
          { vi: 'Tham gia luyện tập thể dục thể thao.', en: 'Taking part in sport and exercise.' }
        ] },
        { t: 'p', plain: true, vi: '2. Em hãy lấy ví dụ về một hành vi vi phạm pháp luật, một hành vi trái đạo đức khi hoạt động trong môi trường số.', en: '2. Give an example of one act that breaks the law and one unethical act in the digital environment.' },
        { t: 'head', kind: 'apply', vi: 'Vận dụng', en: 'Apply' },
        { t: 'p', plain: true, vi: 'Em hãy tìm hiểu các hành vi bị cấm trong *Luật Công nghệ thông tin số 67/2006/QH11* và *Nghị định số 72/2013/NĐ-CP*. Các hành vi bị cấm trong hai văn bản này giống và khác nhau như thế nào?', en: 'Find out about the forbidden acts in the *Law on Information Technology No. 67/2006/QH11* and *Decree No. 72/2013/ND-CP*. How are the forbidden acts in the two documents alike and different?' }
      ] },

      { number: 20, blocks: [
        { t: 'head', kind: 'extra', vi: 'Mở rộng: tự kiểm tra', en: 'Extension: self-check' },
        { t: 'quiz', title: { vi: 'Luyện tập', en: 'Practice' }, items: [
          { id: 'q1', vi: 'Hành vi nào là tác động tiêu cực của công nghệ số đối với xã hội?', en: 'Which is a negative impact of digital technology on society?',
            options: [{ vi: 'Giao dịch ngân hàng số nhanh hơn', en: 'Faster digital banking' }, { vi: 'Rác thải điện tử gia tăng', en: 'More {electronic waste|electronic-waste}' }, { vi: 'Học trực tuyến thuận tiện', en: 'Convenient online learning' }, { vi: 'Tra cứu thông tin nhanh', en: 'Quick information lookup' }],
            answer: 1, whyVi: 'Thiết bị số lỗi thời bị thải ra nhiều tạo rác thải điện tử nguy hại cho môi trường.', whyEn: 'Many discarded outdated devices create e-waste that harms the environment.' },
          { id: 'q2', vi: 'Tải ảnh trên mạng về và dùng như của mình khi chưa được phép là hành vi gì?', en: 'What is downloading a picture online and using it as your own without permission?',
            options: [{ vi: 'Vi phạm bản quyền, vi phạm pháp luật', en: 'Infringing {copyright}, an illegal act' }, { vi: 'Hành vi bình thường', en: 'Normal behaviour' }, { vi: 'Hành vi được khuyến khích', en: 'Encouraged behaviour' }, { vi: 'Chỉ là thiếu lịch sự', en: 'Just impolite' }],
            answer: 0, whyVi: 'Dùng dữ liệu của người khác không xin phép là hành vi vi phạm pháp luật.', whyEn: 'Using other people’s data without permission is illegal.' },
          { id: 'q3', vi: 'Văn bản nào quy định về hoạt động bảo vệ an ninh quốc gia và trật tự, an toàn xã hội trên không gian mạng?', en: 'Which document regulates protecting national security and social order and safety in cyberspace?',
            options: [{ vi: 'Luật An ninh mạng (2018)', en: 'The Law on Cybersecurity (2018)' }, { vi: 'Luật Giao thông đường bộ', en: 'The Road Traffic Law' }, { vi: 'Luật Giáo dục', en: 'The Law on Education' }, { vi: 'Luật Đất đai', en: 'The Land Law' }],
            answer: 0, whyVi: 'Luật An ninh mạng ban hành năm 2018 quy định nội dung này.', whyEn: 'The Law on Cybersecurity, issued in 2018, covers this.' },
          { id: 'q4', vi: 'Nhận được liên kết lạ hứa tặng quà nếu chia sẻ cho 5 bạn, em nên làm gì?', en: 'You get a strange link promising a gift if you share it with 5 friends. What should you do?',
            options: [{ vi: 'Chia sẻ ngay cho bạn bè', en: 'Share it with friends at once' }, { vi: 'Không bấm vào và cảnh báo mọi người', en: 'Do not open it, and warn others' }, { vi: 'Nhập thông tin cá nhân để nhận quà', en: 'Enter personal details to get the gift' }, { vi: 'Bấm vào xem thử', en: 'Click to see' }],
            answer: 1, whyVi: 'Đây có thể là liên kết lừa đảo, phát tán virus hoặc đánh cắp thông tin.', whyEn: 'It may be a scam link that spreads a virus or steals information.' }
        ] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          { vi: 'Công nghệ số có tác động tiêu cực: nghiện, lộ quyền riêng tư, mất cắp dữ liệu, thất nghiệp, rác thải điện tử.', en: 'Digital technology has negative impacts: addiction, loss of privacy, data theft, unemployment, e-waste.' },
          { vi: 'Luật Công nghệ thông tin 2006, Nghị định 72/2013/NĐ-CP và Luật An ninh mạng 2018 quy định việc sử dụng Internet và các hành vi bị cấm.', en: 'The 2006 Law on IT, Decree 72/2013/ND-CP and the 2018 Law on Cybersecurity regulate Internet use and list forbidden acts.' },
          { vi: 'Cần tôn trọng bản quyền, không phát tán tin sai, không lừa đảo, ứng xử lịch sự, có văn hoá trên mạng.', en: 'Respect copyright, do not spread false news, do not scam, and behave politely and with culture online.' }
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.',
          keys: ['negative-impact', 'addiction', 'privacy', 'personal-information', 'steal', 'unemployment', 'electronic-waste', 'anonymous', 'law', 'decree', 'cybersecurity', 'information-security', 'copyright', 'intellectual-property', 'malware', 'virus', 'spam', 'cyberbullying', 'ethics', 'digital-culture', 'illegal-act', 'scam'] }
      ] }
    ]
  };
})();
