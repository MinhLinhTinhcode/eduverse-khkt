# Sách giáo khoa song ngữ tương tác

Web app mô phỏng **sách giáo khoa Tin học song ngữ**: tiếng Việt ở trên, tiếng Anh ở dưới.
Hiện có Tin học 9 (Bài 1–17, mục lục 17 bài đều có nội dung) và Toán 9. Các khối lớp khác hiện "Đang cập nhật".

> Bài 12a, 13a, 14, 15, 16, 17 là **nội dung nguyên bản do nhóm dự án soạn** theo tên bài trong mục lục và yêu cầu cần đạt của Chương trình Tin học 2018, không phải bản chép sách giáo khoa; số trang là của bản này. Bài 16 dùng Python để minh hoạ. Cần đối chiếu với sách in trước khi dùng chính thức.

Viết bằng HTML, CSS và JavaScript thuần. Không cần cài đặt, không cần máy chủ.

## 1. Cách mở để chạy thử

1. Mở thư mục `KHKT` (trên màn hình nền).
2. **Nhấp đúp vào `index.html`**. Trình duyệt sẽ tự mở trang.
   Nếu máy mở bằng chương trình khác: chuột phải vào `index.html` → **Mở bằng (Open with)** → **Chrome** hoặc **Edge**.
3. Ở trang chủ bấm **"Vào học Tin học 9"** (hoặc bìa sách số 9) → bấm **Bài 1 – Học ngay**.

Nên dùng **Chrome hoặc Edge** bản mới. Có mạng thì phông chữ đẹp hơn (Be Vietnam Pro, Literata); không có mạng
vẫn dùng bình thường với phông chữ có sẵn trong máy.

## 2. Cách dùng

| Việc cần làm | Cách làm |
| --- | --- |
| Ẩn / hiện tiếng Anh | Công tắc **Tiếng Anh** trên thanh công cụ, hoặc phím **E** |
| Xem từ vựng | Bấm vào **từ gạch chân nét đứt** trong phần tiếng Anh: hiện phiên âm IPA, nghĩa trong Tin học, câu ví dụ |
| Nghe phát âm | Bấm **nút loa** trong bảng từ vựng (nút nhỏ phát cả câu ví dụ) |
| Đổi giọng đọc | Nút **Anh / Mỹ** trên thanh công cụ |
| Đổi cỡ chữ | Nút **A−** và **A+** |
| Lật trang | Nút **Trang sau / Trang trước**, phím **← →**, hoặc ô chọn trang; ô chọn trang cho phép nhảy tới từng cặp trang (bài gồm trang 5–10) |
| Đóng bảng từ vựng | Bấm ra ngoài, bấm nút **×**, hoặc phím **Esc** |

Cài đặt (ẩn tiếng Anh, cỡ chữ, giọng đọc) được trình duyệt nhớ cho lần mở sau.
Trang 5–8 dàn theo sách giấy; trang 9–10 là phần **mở rộng**. Trong bài còn có khung **Thử nghiệm** (bấm từng bit để đổi 0/1, xem số thập phân và kí tự) và **Luyện tập** (4 câu trắc nghiệm có giải thích).

### Nếu không nghe thấy tiếng

Phát âm dùng giọng đọc có sẵn trong máy (Web Speech API), nên cần có **giọng tiếng Anh**.

- Kiểm tra âm lượng và loa.
- Dùng **Microsoft Edge**: có sẵn các giọng "Natural" rất tự nhiên.
- Windows: **Cài đặt → Thời gian và ngôn ngữ → Giọng nói → Thêm giọng nói**, chọn *English (United Kingdom)* hoặc *English (United States)*.
- Android / iPhone: bật giọng đọc tiếng Anh trong phần Trợ năng của máy.

## 3. Cấu trúc thư mục

```
KHKT/
├─ index.html                  Khung trang, nạp CSS và JS
├─ README.md                   File này
├─ css/
│  └─ styles.css               Toàn bộ giao diện (màu, chữ, trang sách, popup…)
└─ js/
   ├─ app.js                   Logic: màn hình chọn lớp, trình đọc 2 trang, popup từ vựng, phát âm, bài tập
   ├─ icons.js                 Bộ biểu tượng SVG
   ├─ illustrations.js         Hình minh họa SVG trong bài (Hình 1.1 – 1.4…)
   └─ data/
      ├─ catalog.js            Danh sách khối lớp và bài học (bài nào đã sẵn sàng)
      ├─ glossary.js           Từ điển thuật ngữ: IPA, nghĩa, ví dụ
      └─ lesson-tin9-bai1.js   Nội dung Bài 1 (từng trang, từng khối)
```

Các file JS dùng thẻ `<script>` thường (không dùng module) nên mở trực tiếp bằng đường dẫn `file://` vẫn chạy.

## 4. Thêm nội dung

### Thêm một từ vựng
Mở `js/data/glossary.js`, thêm một mục (khoá viết thường, dùng dấu gạch nối thay khoảng trắng):

```js
keyboard: {
  word: 'keyboard', ipa: '/ˈkiː.bɔːd/', pos: 'n',
  vi: 'bàn phím',
  ctx: 'Thiết bị nhập dùng để gõ chữ và lệnh vào máy tính.',
  ex: { en: 'I type my homework on the keyboard.', vi: 'Em gõ bài tập bằng bàn phím.' }
}
```

`pos` là `n` (danh từ), `v` (động từ), `adj` (tính từ) hoặc `adv` (phó từ). Nếu cách đọc khác cách viết (ví dụ ATM), thêm `say: 'A T M'`.

### Đánh dấu từ vựng trong bài
Trong chuỗi tiếng Anh của file bài học:

| Viết | Hiển thị | Tra trong từ điển |
| --- | --- | --- |
| `{digital}` | digital | `digital` |
| `{devices\|device}` | devices | `device` |
| `**chữ đậm**` | **chữ đậm** | (không tra) |

Nếu quên thêm từ vào `glossary.js`, từ đó hiện như chữ thường và trình duyệt báo cảnh báo trong Console (phím F12).

### Thêm một bài học mới
1. Sao chép `js/data/lesson-tin9-bai1.js` thành file mới, ví dụ `js/data/lesson-tin9-bai2.js`; đổi khoá `'tin9-bai1'` thành `'tin9-bai2'` và sửa nội dung các trang.
2. Trong `js/data/catalog.js`, thêm `content: 'tin9-bai2'` vào đúng bài (ví dụ dòng `bai-2`).
3. Trong `index.html`, thêm một dòng `<script src="js/data/lesson-tin9-bai2.js"></script>` ngay sau dòng của Bài 1.
4. Mở lại `index.html` (nhấn Ctrl + F5).

Mỗi trang gồm danh sách khối (`blocks`). Các loại khối: `banner` (dải tiêu đề chủ đề + bài), `goals` (mục tiêu, hộp hồng),
`talk` (hội thoại An – Khoa), `h2` / `h3` (đề mục), `activity` (Hoạt động, có thể kèm hình), `cols` (gom khối thành 2 cột),
`p` (đoạn song ngữ, `badge:'book'` thêm linh vật), `list`, `olist` (1. 2. hoặc a) b)), `tip` (hộp hồng bóng đèn),
`ask` (hộp xanh dấu hỏi), `head` (LUYỆN TẬP, VẬN DỤNG), `fig` / `figs` (hình), `bits` (thử nghiệm bit), `quiz`, `summary`, `vocab`.
Chữ nghiêng viết `*như vầy*`. Xem mẫu trong `lesson-tin9-bai1.js`.

Trang chẵn nằm bên trái, trang lẻ nằm bên phải; thêm trang mới chỉ cần thêm một mục `number` vào danh sách `pages`.

### Thêm hình minh họa
Hình vẽ bằng SVG trong `js/illustrations.js` (đối tượng `TEXTBOOK.art`). Thêm một hàm mới, rồi gọi trong bài bằng
`{ t: 'fig', art: 'tenHinh', no: '1.5', vi: '…', en: '…' }`.

## 5. Lưu ý về nội dung

Nội dung bài học được **biên soạn lại**, bám theo mục tiêu và mạch kiến thức của bài "Thế giới kĩ thuật số" trong
chương trình Tin học 9; **không sao chép nguyên văn** sách giáo khoa. Các hình minh họa do dự án tự vẽ.
Tên bài trong danh sách chỉ nhằm mô phỏng mục lục. Nếu cần dùng nguyên văn sách giáo khoa, hãy xin phép
đơn vị giữ bản quyền của sách.

## Cấu trúc mô-đun (bản cập nhật)

| File | Việc của nó |
|---|---|
| `js/data/lesson-tin9-bai12a.js … bai17.js` | Dữ liệu 6 bài mới (khối `code` hiển thị mã nguồn/mã giả). Hình vẽ ở `js/illustrations-tin2.js`. |
| `js/levels.js` | Nhóm "Lớp 9" (Toán 9 + Tin học 9): thẻ ở trang chủ, nút trên thanh điều hướng, trang `#/khoi-9`. Thêm khối mới: thêm một mục vào `GROUPS`. |
| `js/games.js` | Ba trò chơi khởi động (ghép cặp, thẻ ghi nhớ, thử thách 3 câu) tự sinh từ từ điển thuật ngữ. Đăng ký qua `Practice.registerMode`. |
| `js/interactive.js` | Mô phỏng Toán 9 (SVG, kéo thả) và Tin học 9 (bảng tính COUNTIF/SUMIF). Thêm mô phỏng: viết hàm, đăng ký vào `SIMS`, thêm một dòng vào `PLACE`. |
| `js/classroom.js` | Mã bài tập và mã kết quả cho giáo viên. |
| `js/workspace.js` | Khung hai cột, tab, thanh bên (tra từ, XP, điều hướng nhanh). |
| `js/practice.js` | Khởi động, bài cuối tiết, bài về nhà, XP, xếp hạng. |

Thứ tự nạp trong `index.html`: dữ liệu → hình minh hoạ → `classroom` → `practice` → `games` → `workspace` → `interactive` → `levels` → `app`.
Thiếu một mô-đun thì app vẫn chạy, chỉ mất tính năng của mô-đun đó.

### Trợ lí AI, làm bài nhanh, tab Trò chơi (bản mới)

| Tệp | Vai trò |
|---|---|
| `js/ai.js` | Gọi Google Gemini để soạn câu hỏi song ngữ từ đoạn SGK; ngân hàng câu hỏi AI (localStorage `sgk.ai.sets`); mã chia sẻ `AI1.…`; giao diện trong tab Quản lý giáo viên |
| `js/workspace.js` | Tab `🎮 Trò chơi khởi động`, khung **Làm bài nhanh** ở thanh bên (+1 XP/câu đúng, tối đa 10 XP/ngày) |

- Chỉ tính năng AI cần Internet. Khoá API lưu trong localStorage của máy giáo viên (không an toàn tuyệt đối): dùng máy cá nhân, đặt hạn mức thấp, bấm "Xoá khoá" khi xong.
- Học sinh dán mã `AI1.…` vào ô "Bài giáo viên giao" để làm bài, hoàn toàn ngoại tuyến; kết quả vẫn ra mã `KQ1.…` để giáo viên dán chấm.

| `js/phrases.js` | Góc giao tiếp: 54 câu tiếng Anh dùng trong lớp theo 8 tình huống, có tìm kiếm, lọc và nút loa (Web Speech API); nằm trong tab Quản lý giáo viên |

### Bản mở rộng: ôn thông minh, mưa thuật ngữ, nhiệm vụ, AI dự phòng

| Tệp | Vai trò |
|---|---|
| `js/review.js` | Lặp lại ngắt quãng (hộp Leitner 1, 3, 7, 14, 30 ngày), chế độ **Ôn từ thông minh** và **Sổ lỗi sai**, **bản đồ thành thạo** ở thanh bên. Dữ liệu `sgk.srs` |
| `js/rain.js` | Trò chơi **Mưa thuật ngữ** (gõ từ trước khi chạm đáy, có chế độ nghe) |
| `js/quests.js` | **Nhiệm vụ ngày** (+5 XP mỗi nhiệm vụ) và 9 **huy hiệu**. Dữ liệu `sgk.quests`, `sgk.badges` |
| `js/ai.js` | Thêm chuỗi dự phòng: bộ nhớ đệm → Gemini → ngân hàng đã lưu → tự sinh câu điền khuyết từ từ điển; cầu dao 2 lỗi nghỉ 5 phút; **Sinh sẵn cho mọi bài**, xuất/nhập ngân hàng |
| `js/data/ai-bank.js` | Ngân hàng AI đi kèm dự án (mặc định rỗng). Dùng nút "Xuất thành ai-bank.js" rồi chép đè tệp này |

**Chuẩn bị phòng thi mất mạng:** ở nhà có Internet, vào tab Quản lý giáo viên, nhập khoá, bấm "Sinh sẵn cho mọi bài", rồi "Xuất thành ai-bank.js" và chép vào `js/data/`. Khi mở app ở phòng thi, câu hỏi AI đã có sẵn và hiện ở mục "Luyện thêm với câu hỏi AI". Thiếu cả ngân hàng thì nút "Tạo từ từ điển" vẫn chạy.

### Chuyển chế độ Học sinh / Giáo viên

| Tệp | Vai trò |
|---|---|
| `js/roles.js` | Nút chuyển 👨‍🎓 Chế độ Học sinh \| 👩‍🏫 Chế độ Giáo viên trên thanh điều hướng (trang chủ, danh sách bài, trang đọc sách, các tab). Lưu ở `sgk.role`, đặt `<body data-role>` |

- **Học sinh:** không có tab Quản lý giáo viên; thấy XP, nhiệm vụ, bản đồ thành thạo, làm bài nhanh, ô nhập mã bài.
- **Giáo viên:** tab Quản lý giáo viên đứng đầu và mở thẳng khi vừa chuyển vai. Bảng này có 4 ngăn (Giao bài, Chấm điểm, Trợ lí AI, Giao tiếp), mỗi lần hiện một ngăn. Thanh bên ẩn các khối dành cho học sinh.
- Thêm khối chỉ dành cho học sinh: gắn class `sw--stu`. Muốn ẩn/hiện theo vai trò ở nơi khác: dùng CSS `body[data-role="teacher"] …`.
- Đây là công tắc giao diện, không phải đăng nhập.


## Tài khoản cục bộ (js/auth.js)
Đăng ký / đăng nhập ngay trên trình duyệt, **không cần máy chủ**. Mỗi tài khoản (Học sinh hoặc Giáo viên, PIN 4 số) có XP, cấp độ, thẻ ôn từ, nhiệm vụ và bài tập đã giao riêng. Khách vẫn dùng bình thường. Có "Xuất mã tài khoản" / "Khôi phục từ mã" để chuyển sang thiết bị khác.
Cơ chế: `auth.js` (nạp đầu tiên) đổi khoá `sgk.*` thành `u.<username>.sgk.*` khi đang đăng nhập, nên các mô-đun cũ không phải sửa.
**Giới hạn:** đây không phải bảo mật thật. Dữ liệu nằm trong localStorage, PIN chỉ chống dùng nhầm; ai cũng đăng ký được "Giáo viên"; mã tài khoản cần giữ kín. Muốn tài khoản dùng chung nhiều máy thì cần máy chủ (Firebase/Supabase).
