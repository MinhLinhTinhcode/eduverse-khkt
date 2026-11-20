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

## Khoa học tự nhiên 9 (Bài 1–6) và cách thêm bài KHTN

Môn nằm ở `#/khtn-9`, mã bài tập tự sinh `KHTN9-B1`, `KHTN9-B2`, `KHTN9-B3`. Nội dung do nhóm dự án soạn lại theo cấu trúc sách, **không** chép nguyên văn; hãy đối chiếu với sách in.

Thêm bài mới (ví dụ Bài 4):
1. `js/data/catalog.js`: thêm `{ slug: 'bai-4', number: '4', vi, en, content: 'khtn9-bai4' }` vào chương tương ứng của `khtn-9` (hoặc thêm chủ đề mới).
2. Tạo `js/data/lesson-khtn9-bai4.js` (copy `lesson-khtn9-bai2.js` làm khung): `D.glossary` (ctx bắt đầu bằng "Trong KHTN: ", không dùng `$…$`), rồi `D.lessons['khtn9-bai4']` với `pages` theo số trang sách (trang lẻ đầu bài đứng riêng).
3. Hình SVG: thêm hàm vào `js/illustrations-khtn.js` và đăng ký vào `Object.assign(T.art, …)`.
4. `index.html`: thêm thẻ `<script>` của file bài, đặt cùng nhóm với `lesson-khtn9-bai*.js`.
5. Mô phỏng (tuỳ chọn): thêm vào `SIMS` và `PLACE` trong `js/interactive.js`.
6. Công thức: `$W_{\text{đ}} = \frac{1}{2}mv^{2}$`; `{từ|khoá}` chỉ dùng trong chuỗi tiếng Anh.

## Khoa học tự nhiên 9 — Đợt 2 (Bài 4–6) và phòng thí nghiệm quang học

Bài 4 (Công và công suất, Chương I), Bài 5 (Khúc xạ ánh sáng) và Bài 6 (Phản xạ toàn phần) thuộc Chương II. Ánh sáng (`#/khtn-9/bai-5/25`…). Nội dung là bản **soạn lại nguyên bản** theo cấu trúc, số hiệu hình/bảng và số liệu của sách; hãy đối chiếu với sách in.

| Tệp | Vai trò |
|---|---|
| `js/optics-lab.js` | Engine quang học thuần dữ liệu (`OpticsLab.engine`: `refract`, `criticalAngle`, `reflect`, `fresnel`, `refractVec`, `reflectVec`, `fiber`, `mirage`, `selfTest`) + các thành phần SVG kéo thả (bản bán trụ trên vòng chia độ, đồng xu trong cốc, bài tập mũi tên, sợi quang, ảo ảnh). Đăng ký mô phỏng vào `window.LabSims` |
| `js/work-lab.js` | Mô phỏng công (Hình 4.3) và so sánh hai xe nâng (Hình 4.4), đăng ký vào `window.WorkSims` |
| `js/optics-lab.test.html` | Mở bằng `file://` để xem bảng kiểm thử engine (Snell, góc tới hạn, phản xạ toàn phần, i = 0°, i = i_th, i = 90°…) |
| `js/interactive.js` | Gộp `LabSims`, `WorkSims` vào `SIMS`; `PLACE` có thêm trường `nth` (chèn sau khối thứ n cùng loại) |
| `css/styles.css` | Phần cuối: lớp `.olab*` |

**Thêm bề mặt / thành phần mới (lăng kính, thấu kính — Bài 7–10):**
1. Viết hàm thuần dữ liệu trong `engine` (ví dụ `prism(n, A, i)` trả về góc lệch, `thinLens(f, d)` trả về vị trí ảnh) và thêm phép thử vào `selfTest()`.
2. Viết hàm dựng giao diện `fn(body, options)` theo mẫu `halfdisk()`: dựng SVG một lần, mỗi khung hình chỉ `setAttribute`; dùng `makeDrag(svg, { tên: { move(x, y), key(d, shift, axis) } })` cho kéo thả chuột/cảm ứng + bàn phím (đặt `data-h="tên"` và `tabindex="0"` cho tay nắm, thêm vòng `olab__hit` r ≥ 30 để chạm dễ).
3. Đăng ký vào `window.LabSims['olab-…'] = { fn, vi, en, intro }` rồi thêm một dòng vào `PLACE` của `interactive.js`.

## Khoa học tự nhiên 9 — Đợt 3 (Bài 7–9): lăng kính, thấu kính, thực hành đo tiêu cự

| Tệp | Nội dung |
|---|---|
| `js/data/lesson-khtn9-bai7.js` | Bài 7 Lăng kính (tr. 34–39): cấu tạo, tán sắc, đường truyền tia đơn sắc, màu sắc của vật, em có biết (chiết suất theo màu, cầu vồng). 12 câu hỏi |
| `js/data/lesson-khtn9-bai8.js` | Bài 8 Thấu kính (tr. 40–46): phân loại, trục chính – quang tâm – tiêu điểm, đường truyền tia, mô hình lăng kính nhỏ, ảnh thật/ảo, Bảng 8.1/8.2. 12 câu hỏi |
| `js/data/lesson-khtn9-bai9.js` | Bài 9 Thực hành đo tiêu cự (tr. 47–49): phương pháp đối xứng (Silbermann), Bảng 9.1, báo cáo, phương pháp Bessel. 10 câu hỏi |
| `js/optics-lens.js` | Mở rộng `OpticsLab.engine`: `thinLens`, `lensRay`, `imageRays`, `benchBlur`, `silberman`, `bessel`, `besselPositions`; thành phần `lensLab` (class/rays/point/object) và `bench` (demo/silberman/bessel) |
| `js/optics-prism.js` | Mở rộng engine: `prismTrace`, `nDisp` (tán sắc kiểu Cauchy, minh hoạ), `rainbowAngle/rainbowMax`, `colourMix`; thành phần lăng kính, tán sắc, màu sắc, đĩa Newton, cầu vồng |
| `js/illustrations-khtn.js` | 16 hình mới `khtn7a–h`, `khtn8a–f`, `khtn9a–b` |

Hai tệp `optics-lens.js`, `optics-prism.js` nạp **sau** `optics-lab.js` (xem `index.html`). Mô phỏng đăng ký trong `window.LabSims` với id `olens-*`, `obench-*`, `oprism-*`; gắn vào trang bằng một dòng trong `PLACE` của `js/interactive.js` (`nth` chọn khối thứ n cùng loại).

**Thêm một linh kiện quang mới (ví dụ Bài 10 – kính lúp):**
1. Viết hàm thuần dữ liệu trong `OpticsLab.engine` (vd. `magnifier({f, d})` dùng lại `thinLens`) và thêm phép thử vào một hàm `selfTestXxx()`, nối vào `E.selfTest`.
2. Dùng lại `lensLab(body, {mode:'object', f, d, h})` hoặc `bench(...)`; nếu cần chế độ mới, thêm một nhánh `mode` trong `lensLab`.
3. Đăng ký `window.LabSims['olens-kinh-lup'] = {fn, vi, en, intro}` rồi thêm dòng `PLACE`.
4. Mọi nhãn bên trong `<svg>` dùng chuỗi thường (hoặc `<tspan class="vi/en">`), **không** dùng `pr()` vì thẻ `<span>` làm hỏng ngữ cảnh SVG.

## Khoa học tự nhiên 9 — Đợt 4 (Bài 10–12): kính lúp, điện trở và định luật Ohm, mạch nối tiếp/song song

**Tệp mới:** `js/data/lesson-khtn9-bai10.js`, `-bai11.js`, `-bai12.js`; `js/circuit-lab.js` (engine mạch, thuần dữ liệu); `js/circuit-ui.js` (bảng lắp mạch kéo-thả và các mô phỏng); `js/optics-mag.js` (kính lúp, góc trông, giấy kẻ ô, điều tiết); `js/circuit-lab.test.html` (trang tự kiểm tra, mở bằng trình duyệt).
**Tệp sửa:** `index.html` (thẻ script), `js/data/catalog.js` (Bài 10; Chương III với Bài 11, 12), `js/interactive.js` (PLACE), `js/illustrations-khtn.js` (15 hình: 10.1–10.6, 11.1–11.5, 12.1–12.4), `js/optics-lab.js` (xuất thêm `copyText`, `toCSV`), `css/styles.css`.

**Engine mạch (`CircuitLab.engine`)** giải mạch một chiều bằng phương pháp thế nút. Linh kiện: nguồn `src`, điện trở `res`, bóng đèn `lamp`, biến trở `rheo`, công tắc `sw`, ampe kế `amm`, vôn kế `vol`; dây nối là cặp chân `['id.a','id.b']`. Phát hiện mạch hở, chập nguồn, ampe kế mắc song song, vôn kế mắc nối tiếp; không bao giờ trả NaN/∞. `selfTest()` có 17 phép thử (Bảng 11.2, 12.1, 12.2, 2 Ω + 3 Ω, 20 Ω // 40 Ω, ρl/S, vòng màu…); cùng `OpticsLab.engine.selfTest()` tổng cộng 73 phép thử.

**Thêm linh kiện mới (Bài 13, Chương IV):**
1. `circuit-lab.js`: thêm kiểu vào `pinsOf` và nhánh xử lý trong `solve` (ghi chú điện trở/nguồn trong ma trận `G`/hàng nguồn).
2. `circuit-ui.js`: thêm vào `PINS` (vị trí chân), `NAMES`, `DRAW` (hình vẽ) và một dòng trong `TRAY`.
3. Muốn có mạch mẫu: thêm hàm vào `PRESETS`; muốn bài kiểm tra: thêm vào `T` và truyền `task` cho `board`.

**Mô phỏng:** `circ-h111`, `circ-ohm`, `circ-ohmlaw`, `circ-wire`, `circ-bands` (Bài 11); `circ-compare`, `circ-series`, `circ-parallel`, `circ-ex1`, `circ-ex2`, `circ-design` (Bài 12); `omag-angle`, `omag-glass`, `omag-scale`, `omag-eye` (Bài 10).
**Lưu ý:** số liệu Bảng 11.3, 11.4 đọc từ bản quét; Bảng 12.1 sách in 0,54 A cho cặp R₁, R₃ (tính ra 0,545 A). Hình 11.4 dùng khung biểu tượng Ω thay chân dung. Nội dung là bản soạn lại, cần đối chiếu sách in.

## Khoa học tự nhiên 9 — Đợt 5 (Bài 13–15): năng lượng điện, cảm ứng điện từ, dòng điện xoay chiều

**Tệp mới:** `js/data/lesson-khtn9-bai13.js` (tr. 64–66), `-bai14.js` (tr. 67–71), `-bai15.js` (tr. 72–74); `js/em-lab.js` (engine điện từ + 7 mô phỏng Bài 14); `js/em-effects.js` (4 mô phỏng Bài 15); `js/circuit-power.js` (engine năng lượng/công suất + 4 mô phỏng Bài 13).
**Tệp sửa:** `index.html` (thẻ script), `js/data/catalog.js` (Bài 13 trong Chương III; Chương IV. Điện từ mới có Bài 14, 15), `js/interactive.js` (PLACE), `js/illustrations-khtn.js` (17 hình: 13.1, 13.2, 14.1–14.9, 15.1–15.6), `css/styles.css`, `js/circuit-lab.test.html`.

**Engine (`EmLab.engine`):** `fluxMagnet`, `Induction` (e = −N·ΔΦ/Δt theo sai phân thời gian thực, đứng yên ⇒ 0, mạch hở ⇒ i = 0), `iAC`, `ledState`, `fx` (P = I²R, lực hút), `pow` (W = UIt, 𝒫 = UI, kWh, R = U²đm/𝒫đm, trạng thái dưới/đúng/quá định mức, tiền điện). `OpticsLab.engine.selfTest()` tổng cộng 97 phép thử, tất cả đạt.
**Quy ước:** kim điện kế lệch phải khi i > 0; đưa cực Bắc lại gần cuộn dây ⇒ i > 0. Đây là MÔ HÌNH MINH HOẠ (lưỡng cực trên trục), không nhằm tính chính xác.

**Thêm thành phần mới (Chương V trở đi):**
- `em-lab.js`: thêm hàm engine vào `E`, viết một widget `(body)` trả về `{state}`, rồi đăng ký trong `window.LabSims`.
- `circuit-power.js`: thêm một dòng vào `DEVICES` (id, vi, en, Ur, Pr, `ill:1` nếu là số minh hoạ); W13.2 và W13.4 tự nhận.
- Gắn vào bài bằng một dòng PLACE trong `interactive.js`.

**Mô phỏng:** `pow-wui`, `pow-rated`, `pow-label`, `pow-bill` (Bài 13); `em-magnet`, `em-electro`, `em-rotmagnet`, `em-squeeze`, `em-conditions`, `em-graph`, `em-generator` (Bài 14); `eff-sort`, `eff-heat`, `eff-magnet`, `eff-safety` (Bài 15).
**Lưu ý:** công suất nồi cơm, quạt, tủ lạnh là số minh hoạ; giá điện do học sinh nhập (2 000 đồng/kWh chỉ là ví dụ, không phải giá hiện hành); Hình 14.7 đọc từ bản quét (biên độ 1,0 A, T = 20 ms); nhấp nháy ở tần số thấp và "50 Hz mắt không phân biệt" chỉ mang tính minh hoạ. Nội dung là bản soạn lại, cần đối chiếu sách in.

## Khoa học tự nhiên 9 — Đợt 6 (Bài 16–18): năng lượng với cuộc sống, kim loại

**Tệp mới:** `js/data/lesson-khtn9-bai16.js` (tr. 75–79), `-bai17.js` (tr. 80–86), `-bai18.js` (tr. 87–91); `js/energy-lab.js` (engine năng lượng + 8 mô phỏng + bộ kéo thả `EnergyLab.sorter`); `js/chem-lab.js` (kho dữ liệu hoá học, bộ cân bằng, 9 mô phỏng). 11 hình mới trong `illustrations-khtn.js`; PLACE trong `interactive.js`; CSS `chem__*`; `catalog.js` (Chương V, Chương VI); `index.html`.

**Engine năng lượng (`EnergyLab.engine`):** pin 𝒫 = S·G·η·cosθ (θ giữa pháp tuyến và tia sáng), gió 𝒫 = ½ρAv³C_p (C_p = 0,45 ≤ 0,59, có v khởi động/định mức/ngắt), thuỷ điện 𝒫 = ηρgQh, sóng 𝒫/m = ρg²H²T/(64π). Tất cả là MÔ HÌNH MINH HOẠ; chỉ Hình 16.4 (50/25/14/11 %) và Hình 16.5 là số của sách.
**Engine hoá học (`ChemLab.engine`):** `balance` (ma trận nguyên tố + khử Gauss phân số), `check` (bảo toàn nguyên tử, khối lượng), `react(M,R)` (phản ứng, "không phản ứng" hoặc ngoài phạm vi), `stoich` (Vm mặc định 24,79 L/mol; chọn được 22,4), `ACTIVITY` (dãy hoạt động — TỔNG HỢP, sách chưa in).

**Thêm chất / phản ứng mới (Bài 19+):** kim loại mới → `METALS` (val, rank, màu, tính chất); chất mới → `REAGENTS` và một nhánh trong `build()`; trường hợp đặc biệt → sửa trong `build()`/`OBS`. Hệ số luôn do `balance()` tính. Thêm một dòng vào `selfTest()` và, nếu là phương trình trong sách, vào `BOOK`.
**Mô phỏng:** `en-living, en-water, en-oil, en-oilorder, en-pros, en-price, en-oilres` (Bài 16); `en-class, en-solar, en-wind, en-wave, en-waveparts, en-hydro, en-hydroimpact, en-actions, en-matrix` (Bài 17); `chem-phys, chem-o2, chem-cl, chem-water, chem-hcl, chem-zn, chem-salt, chem-free, chem-use` (Bài 18).
**Cần đối chiếu sách in:** số ở Hình 16.4–16.5 đọc từ bản quét; mục "Em có thể" và "Em đã học" của Bài 17, "Em có thể" của Bài 16, 18 không đọc được nên viết chung.

## Đợt 7 — KHTN 9, Chương VI (tiếp): Bài 19, 20, 21

**Bài mới** (trang sách = trang PDF − 2): Bài 19 *Dãy hoạt động hoá học* (tr. 92–94), Bài 20 *Tách kim loại và việc sử dụng hợp kim* (tr. 95–99), Bài 21 *Sự khác nhau cơ bản giữa phi kim và kim loại* (tr. 100–102). Dừng đúng cuối Bài 21 (Bài 22 thuộc Chương VII, chưa làm).

**File mới:** `js/data/lesson-khtn9-bai19.js`, `-bai20.js`, `-bai21.js`; `js/chem-series.js` (ser-*), `js/chem-nonmetal.js` (nm-*), `js/chem-industry.js` (ind-*, engine `ChemLab.industry` có selfTest). Hình mới trong `js/illustrations-khtn.js`: khtn19a–b, 20a–c, 21a–b (tự vẽ). Đã sửa: `chem-lab.js` (engine + bàn thí nghiệm: nồng độ, thời gian, dự đoán, nhật kí `ChemLab.log`), `energy-lab.js` (`sorter` trả thêm `render`, `lab`), `catalog.js`, `index.html`, `interactive.js` (PLACE), `circuit-lab.test.html`.

**Cách thêm phản ứng / thiết bị công nghiệp cho Chương VII (Bài 22+):** (1) thêm phương trình vào `EXTRA` trong `chem-lab.js` (hệ số do `balance()` tính); (2) thêm nguyên tố mới vào `ELEMENTS` nếu cần; (3) thêm hàm mô hình thuần vào `IND` trong `chem-industry.js` + một dòng `selfTest`; (4) viết widget bằng `EnergyLab.sorter` (kéo thả thẻ), `ChemLab.bench` (ống nghiệm), `ChemLab.dnd` (chip → vùng), `OpticsLab.makeDrag` (tay kéo SVG; phím mũi tên đã được `makeDrag` nhân Shift ×5 — đừng nhân lại; sau khi vẽ lại SVG phải trả focus cho tay kéo); (5) khai báo trong `LabSims` và `PLACE`.

**Mô hình / bổ sung (không in trong sách):** nhiệt độ nóng chảy hợp kim Wood ngoài tỉ lệ 50/25/12,5/12,5 (nội suy, đúng 55,5 °C và đúng 4 đỉnh); khối lượng Al theo định luật Faraday; lò cao theo tỉ lệ có chất hạn chế; %C, %Si, %Mn trong lò thổi (hàm mũ); ví dụ Mg–O, CaO, Na₂O, CO₂, P₂O₅; bài tính tấn–kg; lớp lọc nước; độ dẫn điện tương đối. Ngưỡng inox (Cr, Ni) sách không nêu. Em đã học / Em có thể của Bài 19 và 21 và Em có thể của Bài 20 soạn theo mục tiêu bài vì bản quét bị cắt.

## Đợt 8 – Khoa học tự nhiên 9, Chương VII (Bài 22–24)

Bài 22 *Giới thiệu về hợp chất hữu cơ*, Bài 23 *Alkane*, Bài 24 *Alkene* (sách tr. 103–113). Dừng đúng cuối Bài 24; Bài 25 (Nguồn nhiên liệu) chưa làm.

**File mới:** `js/mol-lab.js` (thư viện phân tử dùng lại cho Bài 25+: engine thuần + bảng lắp ghép + kéo thả), `js/mol-w22.js`, `js/mol-w23.js`, `js/mol-w24.js` (19 mô phỏng), `js/data/lesson-khtn9-bai22/23/24.js`. **Sửa:** `chem-lab.js` (thêm `E.ORG`: phản ứng cháy, cộng Br₂, trùng hợp, nhiệt cháy), `illustrations-khtn.js` (9 hình), `interactive.js` (PLACE), `catalog.js`, `styles.css`, `index.html`.

**Thêm nguyên tử / nhóm chức / phản ứng cho Bài 25+:**
- Nguyên tử mới: thêm vào `VAL` (hoá trị) và `MASS` (khối lượng) trong `mol-lab.js`, thêm màu vào `CLR`/`TXT`, rồi đưa ký hiệu vào `cfg.atoms` của `MolLab.board`.
- Nhóm chức / tên chất: thêm vào `SUBST`, `KNOWN` (nhận tên) và `classify`.
- Phản ứng: thêm hàm trong `ORG` của `chem-lab.js` (trả về `{kind, left, right, ...}`) kèm một dòng trong `ORG.selfTest`.

**Lưu ý kiểm tra với sách in:** nội dung là diễn đạt lại; "Em đã học / Em có thể" của Bài 23 không đọc được trên bản scan nên dùng lời riêng; nước vôi trong và mục đích bình NaOH là phần bổ sung ngoài sách; số đồng phân do máy đếm (C₄H₁₀=2, C₃H₆=2, C₂H₆O=2). Nhiệt bình gas 1 : 1 theo mol, 1 kg ≈ 49 980 kJ.
