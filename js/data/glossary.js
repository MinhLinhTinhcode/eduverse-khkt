/* ==========================================================================
   TỪ ĐIỂN THUẬT NGỮ (dùng cho popup khi bấm vào từ gạch chân)
   --------------------------------------------------------------------------
   Khoá (key) viết thường, dùng dấu gạch nối thay khoảng trắng.
   Trong bài học, đánh dấu từ bằng cú pháp:
        {digital}            → hiện "digital", tra khoá "digital"
        {devices|device}     → hiện "devices", tra khoá "device"
        {Internet|internet}  → hiện "Internet", tra khoá "internet"

   Mỗi mục gồm:
     word : từ gốc hiển thị trong popup
     say  : (không bắt buộc) chữ để đọc, dùng khi cách đọc khác cách viết
     ipa  : phiên âm quốc tế (IPA), theo kiểu Cambridge Dictionary (giọng Anh)
     pos  : loại từ  n | v | adj | adv
     vi   : nghĩa tiếng Việt theo ngữ cảnh
     ctx  : giải thích ngắn trong ngữ cảnh Tin học
     ex   : { en, vi } câu ví dụ gắn với bài học
   ========================================================================== */
window.TEXTBOOK = window.TEXTBOOK || {};

window.TEXTBOOK.glossary = {
  digital: {
    word: 'digital', ipa: '/ˈdɪdʒ.ɪ.təl/', pos: 'adj',
    vi: 'thuộc kĩ thuật số; ở dạng số',
    ctx: 'Nói về thông tin hoặc thiết bị làm việc với dữ liệu được biểu diễn bằng các số 0 và 1.',
    ex: { en: 'A smartphone is a digital device.', vi: 'Điện thoại thông minh là một thiết bị số.' }
  },
  device: {
    word: 'device', ipa: '/dɪˈvaɪs/', pos: 'n',
    vi: 'thiết bị',
    ctx: 'Máy hoặc dụng cụ điện tử có chức năng riêng, như máy tính, điện thoại, máy in.',
    ex: { en: 'My tablet is the device I use most for homework.', vi: 'Máy tính bảng là thiết bị em dùng nhiều nhất để làm bài tập.' }
  },
  information: {
    word: 'information', ipa: '/ˌɪn.fəˈmeɪ.ʃən/', pos: 'n',
    vi: 'thông tin',
    ctx: 'Những điều giúp ta hiểu biết về sự vật, hiện tượng. Trong máy tính, thông tin được lưu dưới dạng dữ liệu.',
    ex: { en: 'Digital devices store information as bits.', vi: 'Thiết bị số lưu trữ thông tin dưới dạng bit.' }
  },
  technology: {
    word: 'technology', ipa: '/tekˈnɒl.ə.dʒi/', pos: 'n',
    vi: 'công nghệ',
    ctx: 'Các phương pháp và công cụ dùng kiến thức khoa học để phục vụ sản xuất và đời sống.',
    ex: { en: 'Digital technology makes online learning possible.', vi: 'Công nghệ số giúp việc học trực tuyến trở nên khả thi.' }
  },
  'process-v': {
    word: 'process', ipa: '/ˈprəʊ.ses/', pos: 'v',
    vi: 'xử lí (thông tin, dữ liệu)',
    ctx: 'Tính toán, biến đổi hoặc sắp xếp dữ liệu theo chương trình để có kết quả.',
    ex: { en: 'A computer can process millions of numbers in a second.', vi: 'Máy tính có thể xử lí hàng triệu con số trong một giây.' }
  },
  process: {
    word: 'process', ipa: '/ˈprəʊ.ses/', pos: 'n',
    vi: 'quá trình',
    ctx: 'Chuỗi các bước được thực hiện lần lượt để đạt một kết quả.',
    ex: { en: 'Digitisation is the process of turning information into bits.', vi: 'Số hoá là quá trình biến thông tin thành các bit.' }
  },
  society: {
    word: 'society', ipa: '/səˈsaɪ.ə.ti/', pos: 'n',
    vi: 'xã hội',
    ctx: 'Cộng đồng người cùng sống và có quan hệ với nhau; công nghệ số ngày càng ảnh hưởng đến xã hội.',
    ex: { en: 'Digital technology is changing society.', vi: 'Công nghệ số đang làm thay đổi xã hội.' }
  },
  computer: {
    word: 'computer', ipa: '/kəmˈpjuː.tər/', pos: 'n',
    vi: 'máy tính',
    ctx: 'Thiết bị điện tử nhận, lưu trữ và xử lí thông tin theo chương trình.',
    ex: { en: 'I do my homework on a computer.', vi: 'Em làm bài tập trên máy tính.' }
  },
  processor: {
    word: 'processor', ipa: '/ˈprəʊ.ses.ər/', pos: 'n',
    vi: 'bộ xử lí',
    ctx: 'Bộ phận “bộ não” của thiết bị số, thực hiện các lệnh và phép tính (còn gọi là CPU).',
    ex: { en: 'A faster processor makes a computer run more smoothly.', vi: 'Bộ xử lí nhanh hơn giúp máy tính chạy mượt hơn.' }
  },
  smartphone: {
    word: 'smartphone', ipa: '/ˈsmɑːt.fəʊn/', pos: 'n',
    vi: 'điện thoại thông minh',
    ctx: 'Điện thoại có bộ xử lí mạnh, kết nối được Internet và cài được ứng dụng.',
    ex: { en: 'I use my smartphone to check the weather.', vi: 'Em dùng điện thoại thông minh để xem thời tiết.' }
  },
  supercomputer: {
    word: 'supercomputer', ipa: '/ˈsuː.pəˌkɒmˈpjuː.tər/', pos: 'n',
    vi: 'siêu máy tính',
    ctx: 'Máy tính có tốc độ tính toán cực cao, dùng cho các bài toán khoa học rất lớn.',
    ex: { en: 'A supercomputer helps forecast the weather.', vi: 'Siêu máy tính giúp dự báo thời tiết.' }
  },
  robot: {
    word: 'robot', ipa: '/ˈrəʊ.bɒt/', pos: 'n',
    vi: 'rô-bốt, người máy',
    ctx: 'Máy được lập trình để tự làm việc, thường dùng trong nhà máy, y tế, thăm dò.',
    ex: { en: 'Robots assemble cars in this factory.', vi: 'Rô-bốt lắp ráp ô tô trong nhà máy này.' }
  },
  atm: {
    word: 'ATM', say: 'A T M', ipa: '/ˌeɪ.tiːˈem/', pos: 'n',
    vi: 'máy rút tiền tự động',
    ctx: 'Thiết bị số của ngân hàng, cho phép rút tiền và kiểm tra tài khoản bằng thẻ.',
    ex: { en: 'The ATM checks your card before it gives out cash.', vi: 'Máy ATM kiểm tra thẻ của em trước khi trả tiền.' }
  },
  'remote-control': {
    word: 'remote control', ipa: '/rɪˌməʊt kənˈtrəʊl/', pos: 'n',
    vi: 'điều khiển từ xa',
    ctx: 'Thiết bị cầm tay gửi lệnh đến ti vi hay thiết bị khác bằng tín hiệu không dây.',
    ex: { en: 'I press a button on the remote control to change the channel.', vi: 'Em bấm một nút trên điều khiển từ xa để đổi kênh.' }
  },
  command: {
    word: 'command', ipa: '/kəˈmɑːnd/', pos: 'n',
    vi: 'lệnh',
    ctx: 'Yêu cầu gửi cho thiết bị hoặc máy tính để nó thực hiện một việc.',
    ex: { en: 'Typing a command tells the computer what to do.', vi: 'Gõ một lệnh để cho máy tính biết cần làm gì.' }
  },
  input: {
    word: 'input', ipa: '/ˈɪn.pʊt/', pos: 'n',
    vi: 'thông tin vào, đầu vào',
    ctx: 'Dữ liệu hoặc lệnh được đưa vào thiết bị để xử lí.',
    ex: { en: 'Pressing a key on the keyboard is an input.', vi: 'Nhấn một phím trên bàn phím là một thông tin vào.' }
  },
  output: {
    word: 'output', ipa: '/ˈaʊt.pʊt/', pos: 'n',
    vi: 'thông tin ra, đầu ra',
    ctx: 'Kết quả thiết bị đưa ra sau khi xử lí, như hình ảnh, âm thanh, văn bản.',
    ex: { en: 'The screen shows the output of the program.', vi: 'Màn hình hiển thị kết quả đầu ra của chương trình.' }
  },
  memory: {
    word: 'memory', ipa: '/ˈmem.ər.i/', pos: 'n',
    vi: 'bộ nhớ',
    ctx: 'Nơi lưu dữ liệu và chương trình trong thiết bị số.',
    ex: { en: 'Photos are saved in the phone’s memory.', vi: 'Ảnh được lưu trong bộ nhớ của điện thoại.' }
  },
  screen: {
    word: 'screen', ipa: '/skriːn/', pos: 'n',
    vi: 'màn hình',
    ctx: 'Bộ phận hiển thị hình ảnh và chữ cho người dùng.',
    ex: { en: 'A volume bar appears on the screen.', vi: 'Thanh âm lượng hiện lên trên màn hình.' }
  },
  signal: {
    word: 'signal', ipa: '/ˈsɪɡ.nəl/', pos: 'n',
    vi: 'tín hiệu',
    ctx: 'Sự thay đổi (điện, ánh sáng, sóng…) dùng để mang thông tin. Tín hiệu số chỉ có hai mức: 0 và 1.',
    ex: { en: 'A digital signal has only two levels.', vi: 'Tín hiệu số chỉ có hai mức.' }
  },
  analogue: {
    word: 'analogue', ipa: '/ˈæn.ə.lɒɡ/', pos: 'adj',
    vi: 'tương tự (liên tục)',
    ctx: 'Biểu diễn thông tin bằng đại lượng thay đổi liên tục, như đồng hồ kim.',
    ex: { en: 'An analogue clock shows the time with moving hands.', vi: 'Đồng hồ kim hiển thị thời gian bằng các kim quay.' }
  },
  bit: {
    word: 'bit', ipa: '/bɪt/', pos: 'n',
    vi: 'bit (đơn vị thông tin nhỏ nhất)',
    ctx: 'Một chữ số nhị phân, chỉ nhận giá trị 0 hoặc 1.',
    ex: { en: 'One bit can be either 0 or 1.', vi: 'Một bit chỉ có thể là 0 hoặc 1.' }
  },
  byte: {
    word: 'byte', ipa: '/baɪt/', pos: 'n',
    vi: 'byte (8 bit)',
    ctx: 'Đơn vị đo lượng thông tin, bằng 8 bit.',
    ex: { en: 'One byte is made of eight bits.', vi: 'Một byte gồm tám bit.' }
  },
  binary: {
    word: 'binary', ipa: '/ˈbaɪ.nər.i/', pos: 'adj',
    vi: 'nhị phân',
    ctx: 'Hệ đếm chỉ dùng hai chữ số 0 và 1.',
    ex: { en: 'Computers use the binary system.', vi: 'Máy tính dùng hệ nhị phân.' }
  },
  character: {
    word: 'character', ipa: '/ˈkær.ək.tər/', pos: 'n',
    vi: 'kí tự',
    ctx: 'Một chữ cái, chữ số hoặc dấu được lưu trong máy tính; mỗi kí tự có một mã riêng.',
    ex: { en: 'Each character is stored as a group of bits.', vi: 'Mỗi kí tự được lưu thành một nhóm bit.' }
  },
  convert: {
    word: 'convert', ipa: '/kənˈvɜːt/', pos: 'v',
    vi: 'chuyển đổi',
    ctx: 'Đổi thông tin từ dạng này sang dạng khác, ví dụ từ âm thanh sang dãy bit.',
    ex: { en: 'A microphone converts sound into a digital signal.', vi: 'Micro chuyển đổi âm thanh thành tín hiệu số.' }
  },
  digitisation: {
    word: 'digitisation', ipa: '/ˌdɪdʒ.ɪ.taɪˈzeɪ.ʃən/', pos: 'n',
    vi: 'sự số hoá',
    ctx: 'Quá trình chuyển thông tin (chữ, ảnh, âm thanh…) thành dãy bit.',
    ex: { en: 'Digitisation lets us keep old photos on a computer.', vi: 'Số hoá giúp ta lưu những bức ảnh cũ trong máy tính.' }
  },
  data: {
    word: 'data', ipa: '/ˈdeɪ.tə/', pos: 'n',
    vi: 'dữ liệu',
    ctx: 'Thông tin được ghi lại dưới dạng mà máy tính có thể lưu trữ và xử lí.',
    ex: { en: 'Digital libraries store a huge amount of data.', vi: 'Thư viện số lưu trữ lượng dữ liệu khổng lồ.' }
  },
  network: {
    word: 'network', ipa: '/ˈnet.wɜːk/', pos: 'n',
    vi: 'mạng (máy tính)',
    ctx: 'Hệ thống các thiết bị được nối với nhau để trao đổi dữ liệu.',
    ex: { en: 'All the computers in our school are on one network.', vi: 'Tất cả máy tính trong trường em nằm trong cùng một mạng.' }
  },
  software: {
    word: 'software', ipa: '/ˈsɒft.weər/', pos: 'n',
    vi: 'phần mềm',
    ctx: 'Các chương trình giúp máy tính thực hiện công việc cụ thể.',
    ex: { en: 'We use drawing software to design posters.', vi: 'Chúng em dùng phần mềm vẽ để thiết kế áp phích.' }
  },
  online: {
    word: 'online', ipa: '/ˌɒnˈlaɪn/', pos: 'adj',
    vi: 'trực tuyến',
    ctx: 'Đang kết nối Internet hoặc diễn ra qua Internet.',
    ex: { en: 'I join an online class on Saturdays.', vi: 'Em tham gia một lớp học trực tuyến vào thứ Bảy.' }
  },
  internet: {
    word: 'Internet', ipa: '/ˈɪn.tə.net/', pos: 'n',
    vi: 'Internet, mạng toàn cầu',
    ctx: 'Mạng máy tính toàn cầu nối hàng tỉ thiết bị với nhau.',
    ex: { en: 'You need the Internet to join a video call.', vi: 'Em cần Internet để tham gia cuộc gọi video.' }
  },
  wireless: {
    word: 'wireless', ipa: '/ˈwaɪə.ləs/', pos: 'adj',
    vi: 'không dây',
    ctx: 'Kết nối bằng sóng như Wi-Fi hay Bluetooth thay cho dây cáp.',
    ex: { en: 'Wireless headphones connect to a phone by Bluetooth.', vi: 'Tai nghe không dây kết nối với điện thoại bằng Bluetooth.' }
  },
  benefit: {
    word: 'benefit', ipa: '/ˈben.ɪ.fɪt/', pos: 'n',
    vi: 'lợi ích',
    ctx: 'Điều tốt mà công nghệ mang lại, ví dụ tìm kiếm thông tin nhanh chóng.',
    ex: { en: 'One benefit of the Internet is fast communication.', vi: 'Một lợi ích của Internet là liên lạc nhanh chóng.' }
  },
  risk: {
    word: 'risk', ipa: '/rɪsk/', pos: 'n',
    vi: 'rủi ro',
    ctx: 'Điều có thể gây hại khi dùng thiết bị số, ví dụ bị lộ thông tin cá nhân.',
    ex: { en: 'Sharing your password is a big risk.', vi: 'Chia sẻ mật khẩu là một rủi ro lớn.' }
  },
  scam: {
    word: 'scam', ipa: '/skæm/', pos: 'n',
    vi: 'trò lừa đảo',
    ctx: 'Hành vi lừa người dùng trên mạng để chiếm đoạt tiền hoặc thông tin.',
    ex: { en: 'A message asking for your password is probably a scam.', vi: 'Tin nhắn hỏi mật khẩu của em có thể là lừa đảo.' }
  },
  'fake-news': {
    word: 'fake news', ipa: '/ˌfeɪk ˈnjuːz/', pos: 'n',
    vi: 'tin giả',
    ctx: 'Thông tin sai sự thật nhưng được lan truyền như thật trên mạng.',
    ex: { en: 'Check the source so you do not share fake news.', vi: 'Hãy kiểm tra nguồn để không chia sẻ tin giả.' }
  },
  password: {
    word: 'password', ipa: '/ˈpɑːs.wɜːd/', pos: 'n',
    vi: 'mật khẩu',
    ctx: 'Dãy kí tự bí mật dùng để bảo vệ tài khoản.',
    ex: { en: 'Use a strong password with letters, numbers and symbols.', vi: 'Hãy dùng mật khẩu mạnh gồm chữ, số và kí hiệu.' }
  },
  source: {
    word: 'source', ipa: '/sɔːs/', pos: 'n',
    vi: 'nguồn (thông tin)',
    ctx: 'Nơi thông tin xuất phát; cần kiểm tra nguồn trước khi tin hoặc chia sẻ.',
    ex: { en: 'Always check the source of a news story.', vi: 'Hãy luôn kiểm tra nguồn của một bản tin.' }
  },
  responsible: {
    word: 'responsible', ipa: '/rɪˈspɒn.sə.bəl/', pos: 'adj',
    vi: 'có trách nhiệm',
    ctx: 'Biết cân nhắc hậu quả khi dùng công nghệ và tôn trọng người khác.',
    ex: { en: 'A responsible user respects other people online.', vi: 'Người dùng có trách nhiệm biết tôn trọng người khác trên mạng.' }
  }
};
