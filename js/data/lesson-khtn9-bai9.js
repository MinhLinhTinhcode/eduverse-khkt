/* ==========================================================================
   KHOA HỌC TỰ NHIÊN 9 — CHƯƠNG II. ÁNH SÁNG
     'khtn9-bai9'  Bài 9. Thực hành đo tiêu cự của thấu kính hội tụ (tr. 47–49)
   NỘI DUNG NGUYÊN BẢN do nhóm dự án soạn theo cấu trúc mục, số hiệu hình/bảng, công thức và số liệu của bài;
   không phải bản chép sách giáo khoa. Hãy đối chiếu với sách in trước khi dùng chính thức.
   ========================================================================== */
(function () {
  'use strict';
  const D = (window.TEXTBOOK = window.TEXTBOOK || {});
  D.lessons = D.lessons || {};
  D.glossary = D.glossary || {};
  const g = (word, ipa, pos, vi, ctx, en, viEx) => ({ word, ipa, pos, vi, ctx, ex: { en, vi: viEx } });
  const P = (vi, en, x) => Object.assign({ t: 'p', vi, en }, x || {});
  const Q = (id, vi, en, opts, answer, whyVi, whyEn) => ({ id, vi, en, options: opts.map((o) => ({ vi: o[0], en: o[1] })), answer, whyVi, whyEn });
  const B = (vi, en) => ({ vi, en });
  const FIG = (art, no, vi, en, wide) => ({ t: 'fig', art, no, vi, en, wide });

  Object.assign(D.glossary, {
    'symmetric-method': g('symmetric method', '/sɪˈmet.rɪk ˈmeθ.əd/', 'n', 'phương pháp đối xứng (Silbermann)', 'Trong KHTN: Cách đo tiêu cự bằng cách đặt vật và màn cách thấu kính những khoảng bằng nhau (d = d′ = 2f).', 'The symmetric method uses d = d′.', 'Phương pháp đối xứng dùng d = d′.'),
    'displacement-method': g('displacement method', '/dɪsˈpleɪs.mənt ˈmeθ.əd/', 'n', 'phương pháp hoán vị (Bessel)', 'Trong KHTN: Cách đo tiêu cự bằng hai vị trí của thấu kính cho ảnh rõ nét khi vật và màn đứng yên.', 'The displacement method needs two lens positions.', 'Phương pháp hoán vị cần hai vị trí của thấu kính.'),
    'phys-mean': g('average', '/ˈæv.ər.ɪdʒ/', 'n', 'giá trị trung bình', 'Trong KHTN: Tổng các lần đo chia cho số lần đo; Mỹ cũng nói mean.', 'Take the average of three readings.', 'Lấy trung bình của ba lần đo.'),
    'meas-error': g('measurement error', '/ˈmeʒ.ə.mənt ˈer.ər/', 'n', 'sai số đo', 'Trong KHTN: Độ lệch giữa giá trị đo được và giá trị thật; giảm bằng cách đo nhiều lần.', 'Repeating the trial reduces the measurement error.', 'Đo lặp lại làm giảm sai số đo.'),
    sharp: g('sharp', '/ʃɑːp/', 'adj', 'rõ nét', 'Trong KHTN: Nói ảnh có đường nét rõ, không bị nhoè. (Nghĩa khác: sắc, nhọn.)', 'Move the screen until the image is sharp.', 'Dịch màn tới khi ảnh rõ nét.'),
    ruler: g('ruler', '/ˈruː.lər/', 'n', 'thước', 'Trong KHTN: Dụng cụ có vạch chia để đo độ dài, ở đây là thước mm trên giá quang học.', 'Read the position on the ruler.', 'Đọc vị trí trên thước.')
  });

  D.lessons['khtn9-bai9'] = {
    gradeId: 9, number: '9', book: 'Khoa học tự nhiên 9',
    title: { vi: 'Thực hành đo tiêu cự của thấu kính hội tụ', en: 'Practical: measuring the focal length of a converging lens' },
    topic: { label: 'Chương', labelEn: 'Chapter', number: 'II', vi: 'Ánh sáng', en: 'Light' },
    spreadLabels: ['Chuẩn bị', 'Tiến hành và báo cáo'],
    pages: [
      { number: 47, blocks: [
        { t: 'banner' },
        { t: 'goals', lead: { vi: 'Mục tiêu. Sau bài thực hành em sẽ:', en: 'Aims. After this practical you will:' }, items: [
          { vi: 'Đo được tiêu cự của thấu kính hội tụ bằng dụng cụ thực hành.', en: 'Measure the {focal length|focal-length} of a converging lens with lab equipment.' }
        ] },
        P('Ta biết chùm tia song song trục chính qua thấu kính hội tụ cho chùm ló đi qua tiêu điểm chính. Vậy có thể đo tiêu cự bằng cách đo trực tiếp khoảng cách từ quang tâm O tới tiêu điểm F không? Cách đó có nhược điểm gì?', 'A parallel beam through a converging lens passes through the principal focus. Could we measure $f$ by measuring directly the distance from O to F? What is the drawback of that?', { badge: 'fire' }),
        { t: 'tip', items: [{ vi: 'Nhược điểm của cách đo trực tiếp: khó xác định đúng vị trí quang tâm O (nằm bên trong thấu kính) và vị trí điểm hội tụ F (chùm sáng thực tế không hội tụ thành một điểm hoàn hảo), nên sai số lớn.', en: 'Drawback of direct measurement: it is hard to locate O (inside the lens) and the exact focus F (a real beam does not meet in a perfect point), so the error is large.' }] },
        { t: 'h2', n: 'I', vi: 'Chuẩn bị', en: 'Preparation' },
        { t: 'h3', vi: '1. Dụng cụ', en: '1. Equipment' },
        { t: 'list', items: [
          { vi: 'Nguồn sáng (1); vật sáng bằng kính mờ hình chữ F (2); thấu kính hội tụ (3); màn chắn (4);', en: 'Light source (1); a frosted-glass F-shaped object (2); a converging lens (3); a {screen|optics-screen} (4);' },
          { vi: 'Giá quang học đồng trục (5); nguồn điện và dây nối (6).', en: 'A coaxial {optical bench|optical-bench} (5); power supply and leads (6).' }
        ] },
        FIG('khtn9a', '9.1', 'Bố trí thí nghiệm đo tiêu cự của thấu kính hội tụ', 'Setting up the experiment to measure the focal length of a converging lens', true),
        { t: 'h3', vi: '2. Phương pháp đối xứng (Silbermann)', en: '2. The symmetric (Silbermann) method' },
        P('Dựng ảnh của vật $AB$ cao $h$, vuông góc với trục chính, cách thấu kính $d = 2f$. Hai tia đặc biệt (tia qua O và tia song song trục) cho ảnh $A\'B\'$ nằm cách thấu kính $d\' = 2f$: các tam giác tạo bởi tia qua O bằng nhau nên $d\' = d$ và $h\' = h$. Ảnh bằng vật, ngược chiều.',
          'Construct the image of the object $AB$ of height $h$, perpendicular to the axis, at $d = 2f$. The two special rays (through O and parallel to the axis) give an image $A\'B\'$ at $d\' = 2f$: the triangles formed by the ray through O are congruent, so $d\' = d$ and $h\' = h$. The image is as big as the object, inverted.'),
        { t: 'math', tex: 'd = d\' = 2f \\quad\\Rightarrow\\quad f = \\frac{d + d\'}{4}', label: '(9.1)' }
      ] },
      { number: 48, blocks: [
        { t: 'ask', style: 'num', lead: { vi: 'Chứng minh', en: 'Prove' }, items: [
          B('Dựa vào hình vẽ chứng minh khi $d = 2f$ thì khoảng cách từ ảnh tới thấu kính bằng khoảng cách từ vật tới thấu kính.', 'From the drawing prove that when $d = 2f$ the image is as far from the lens as the object.'),
          B('Ảnh có kích thước thế nào so với vật?', 'How does the image size compare with the object?'),
          B('Chứng minh $f = \\frac{d + d\'}{4}$. (Gợi ý: dùng $d = d\' = 2f$; trong mô phỏng thấy $d\' = d$ khi ảnh bằng vật.)', 'Prove $f = \\frac{d + d\'}{4}$. (Hint: use $d = d\' = 2f$; in the simulation $d\' = d$ when the image equals the object.)')
        ] },
        { t: 'h2', n: 'II', vi: 'Cách tiến hành', en: 'Procedure' },
        { t: 'olist', items: [
          { vi: '**Bước 1.** Đo chiều cao $h$ của vật chữ F.', en: '**Step 1.** Measure the height $h$ of the F object.' },
          { vi: '**Bước 2.** Bố trí như Hình 9.1. Đặt vật và màn sát thấu kính, rồi dịch đồng thời vật và màn ra xa dần thấu kính những khoảng bằng nhau cho đến khi thấy ảnh {rõ nét|sharp} trên màn; ghi $d$ và $d\'$ vào Bảng 9.1.', en: '**Step 2.** Set up as in Figure 9.1. Put the object and screen close to the lens, then move both away together by equal amounts until a {sharp|sharp} image appears on the screen; record $d$ and $d\'$ in Table 9.1.' },
          { vi: '**Bước 3.** Đo chiều cao $h\'$ của ảnh. Lặp lại thí nghiệm hai lần nữa. Tính giá trị trung bình $\\bar d$, $\\bar d\'$ rồi $\\bar f = \\frac{\\bar d + \\bar d\'}{4}$.', en: '**Step 3.** Measure the image height $h\'$. Repeat twice more. Compute the {averages|phys-mean} $\\bar d$, $\\bar d\'$ and then $\\bar f = \\frac{\\bar d + \\bar d\'}{4}$.' }
        ] },
        { t: 'ask', style: 'num', lead: { vi: 'Thực hành ảo (mô phỏng Hình 9.1)', en: 'Virtual practical (simulation of Figure 9.1)' }, items: [B('Kéo thấu kính, vật và màn dọc giá quang học (có thước mm); dùng nút “Dịch ra xa bằng nhau”; khi ảnh nét, bấm “Lấy số đo hiện tại” để điền Bảng 9.1. Làm đủ 3 lần (thử bật “Có nhiễu đo”).', 'Drag the lens, object and screen along the bench (mm ruler); use “Move apart equally”; when the image is sharp press “Take current reading” to fill Table 9.1. Do 3 trials (try “Measurement noise”).')] }
      ] },
      { number: 49, blocks: [
        { t: 'h2', n: 'III', vi: 'Kết quả — báo cáo thực hành', en: 'Results — practical report' },
        { t: 'p', vi: 'Mẫu báo cáo: Họ và tên, Lớp. 1) Mục đích: đo tiêu cự của thấu kính hội tụ bằng dụng cụ thực hành. 2) Chuẩn bị: các dụng cụ đã nêu. 3) Các bước tiến hành. 4) Kết quả: hoàn thành Bảng 9.1 (đơn vị mm).', en: 'Report template: Name, Class. 1) Aim: measure the focal length of a converging lens. 2) Equipment listed above. 3) Steps. 4) Results: complete Table 9.1 (mm).' },
        { t: 'table', head: true, rows: [
          [{ vi: 'Lần đo', en: 'Trial' }, { vi: 'Vật đến thấu kính d (mm)', en: 'Object to lens d (mm)' }, { vi: 'Ảnh đến thấu kính d′ (mm)', en: 'Image to lens d′ (mm)' }, { vi: 'Cao vật h (mm)', en: 'Object height h (mm)' }, { vi: 'Cao ảnh h′ (mm)', en: 'Image height h′ (mm)' }],
          [{ vi: '1', en: '1' }, { vi: 'd₁ = ?', en: 'd₁ = ?' }, { vi: 'd′₁ = ?', en: 'd′₁ = ?' }, { vi: 'h₁ = ?', en: 'h₁ = ?' }, { vi: 'h′₁ = ?', en: 'h′₁ = ?' }],
          [{ vi: '2', en: '2' }, { vi: 'd₂ = ?', en: 'd₂ = ?' }, { vi: 'd′₂ = ?', en: 'd′₂ = ?' }, { vi: 'h₂ = ?', en: 'h₂ = ?' }, { vi: 'h′₂ = ?', en: 'h′₂ = ?' }],
          [{ vi: '3', en: '3' }, { vi: 'd₃ = ?', en: 'd₃ = ?' }, { vi: 'd′₃ = ?', en: 'd′₃ = ?' }, { vi: 'h₃ = ?', en: 'h₃ = ?' }, { vi: 'h′₃ = ?', en: 'h′₃ = ?' }],
          [{ vi: 'Trung bình', en: 'Mean' }, { vi: 'd̄ = ?', en: 'd̄ = ?' }, { vi: 'd̄′ = ?', en: 'd̄′ = ?' }, { vi: 'h̄ = ?', en: 'h̄ = ?' }, { vi: 'h̄′ = ?', en: 'h̄′ = ?' }]
        ] },
        { t: 'ask', style: 'num', lead: { vi: 'Trả lời', en: 'Answer' }, items: [
          B('Nhận xét về chiều cao $h$ của vật và $h\'$ của ảnh.', 'Comment on the object height $h$ and image height $h\'$.'),
          B('So sánh $\\bar f$ với tiêu cự ghi trên thấu kính. Nguyên nhân gây {sai số đo|meas-error}?', 'Compare $\\bar f$ with the focal length printed on the lens. What causes the {measurement error|meas-error}?'),
          B('So sánh ưu, nhược điểm của phương pháp Silbermann với đo trực tiếp OF.', 'Compare the pros and cons of the Silbermann method with direct measurement of OF.')
        ] },
        { t: 'head', kind: 'practice', vi: 'Em có biết: phương pháp Bessel', en: 'Did you know: the Bessel method' },
        P('Phương pháp hoán vị (Bessel): đặt vật và màn cách nhau $L$ (cố định). Dịch thấu kính để tìm **hai vị trí** cho ảnh rõ nét trên màn; gọi $l$ là khoảng cách giữa hai vị trí đó (Hình 9.2). Tiêu cự được tính từ:',
          'The {displacement method|displacement-method} (Bessel): fix the object and screen a distance $L$ apart. Move the lens to find **two positions** that give a sharp image; let $l$ be the distance between them (Figure 9.2). The focal length is:'),
        { t: 'math', tex: 'f = \\frac{L^2 - l^2}{4L}, \\qquad L > 4f', label: '(9.2)' },
        FIG('khtn9b', '9.2', 'Minh hoạ phương pháp Bessel', 'The Bessel method', true),
        { t: 'tip', items: [{ vi: 'Ví dụ: $f = 100\\ \\text{mm}$, $L = 500\\ \\text{mm}$: hai vị trí cách vật 138 mm và 362 mm nên $l = 224\\ \\text{mm}$ và $f = (500^2 - 224^2)/(4 \\cdot 500) = 100\\ \\text{mm}$. Nếu $L < 4f$ thì không có vị trí nào cho ảnh nét; nếu $L = 4f$ chỉ có một vị trí (đó chính là phương pháp đối xứng).', en: 'Example: $f = 100\\ \\text{mm}$, $L = 500\\ \\text{mm}$: the two positions are 138 mm and 362 mm from the object, so $l = 224\\ \\text{mm}$ and $f = (500^2 - 224^2)/(4 \\cdot 500) = 100\\ \\text{mm}$. If $L < 4f$ no position gives a sharp image; if $L = 4f$ there is just one (the symmetric method).' }] },
        { t: 'quiz', title: { vi: 'Tự kiểm tra', en: 'Self-check' }, items: [
          Q('q1', 'Trong phương pháp đối xứng, ảnh rõ nét khi vật và màn cách thấu kính:', 'In the symmetric method the image is sharp when the object and screen are from the lens:', [['Những khoảng bằng nhau, mỗi khoảng $2f$', 'Equal distances, each $2f$'], ['Một khoảng $f$', 'One distance $f$'], ['Vật $f$, màn $2f$', 'Object $f$, screen $2f$'], ['Vật $2f$, màn $4f$', 'Object $2f$, screen $4f$']], 0, 'Khi $d = d\' = 2f$ ảnh thật, bằng vật, ngược chiều.', 'When $d = d\' = 2f$ the image is real, same size, inverted.'),
          Q('q2', 'Công thức tính tiêu cự theo phương pháp đối xứng là:', 'The focal length by the symmetric method is:', [['$f = (d + d\')/4$', '$f = (d + d\')/4$'], ['$f = d + d\'$', '$f = d + d\'$'], ['$f = (d + d\')/2$', '$f = (d + d\')/2$'], ['$f = d\'/4$', '$f = d\'/4$']], 0, 'Từ $d = d\' = 2f$ suy ra $f = (d + d\')/4$.', 'From $d = d\' = 2f$ we get $f = (d + d\')/4$.'),
          Q('q3', 'Một lần đo cho $d = 205\\ \\text{mm}$, $d\' = 195\\ \\text{mm}$. Tiêu cự khoảng:', 'A trial gives $d = 205\\ \\text{mm}$, $d\' = 195\\ \\text{mm}$. The focal length is about:', [['100 mm', '100 mm'], ['200 mm', '200 mm'], ['50 mm', '50 mm'], ['400 mm', '400 mm']], 0, '$(205 + 195)/4 = 100\\ \\text{mm}$.', '$(205 + 195)/4 = 100\\ \\text{mm}$.'),
          Q('q4', 'Ba lần đo $d$: 198, 204, 201 mm; $d\'$: 202, 196, 199 mm. $\\bar f$ bằng:', 'Three trials of $d$: 198, 204, 201 mm; $d\'$: 202, 196, 199 mm. $\\bar f$ is:', [['100,0 mm', '100.0 mm'], ['200,0 mm', '200.0 mm'], ['99,0 mm', '99.0 mm'], ['101,5 mm', '101.5 mm']], 0, '$\\bar d = 201$, $\\bar d\' = 199$ nên $\\bar f = 400/4 = 100{,}0\\ \\text{mm}$.', '$\\bar d = 201$, $\\bar d\' = 199$ so $\\bar f = 400/4 = 100.0\\ \\text{mm}$.'),
          Q('q5', 'Khi $d = d\' = 2f$, chiều cao ảnh $h\'$ so với vật $h$:', 'When $d = d\' = 2f$ the image height $h\'$ compared with $h$ is:', [['$h\' = h$', '$h\' = h$'], ['$h\' = 2h$', '$h\' = 2h$'], ['$h\' = h/2$', '$h\' = h/2$'], ['$h\' = 0$', '$h\' = 0$']], 0, '$|k| = d\'/d = 1$.', '$|k| = d\'/d = 1$.'),
          Q('q6', 'Phương pháp Bessel: $L = 400\\ \\text{mm}$, $l = 200\\ \\text{mm}$. Tiêu cự là:', 'Bessel method: $L = 400\\ \\text{mm}$, $l = 200\\ \\text{mm}$. The focal length is:', [['75 mm', '75 mm'], ['100 mm', '100 mm'], ['150 mm', '150 mm'], ['50 mm', '50 mm']], 0, '$f = (400^2 - 200^2)/(4 \\cdot 400) = 120000/1600 = 75\\ \\text{mm}$.', '$f = (400^2 - 200^2)/(4 \\cdot 400) = 120000/1600 = 75\\ \\text{mm}$.'),
          Q('q7', 'Với $f = 100\\ \\text{mm}$, phải chọn khoảng cách vật – màn $L$ ít nhất bằng:', 'With $f = 100\\ \\text{mm}$ the object–screen distance $L$ must be at least:', [['400 mm', '400 mm'], ['200 mm', '200 mm'], ['100 mm', '100 mm'], ['300 mm', '300 mm']], 0, 'Phải có $L \\ge 4f = 400\\ \\text{mm}$ mới có ảnh rõ nét trên màn.', 'Need $L \\ge 4f = 400\\ \\text{mm}$ for a sharp image on the screen.'),
          Q('q8', 'Vì sao nên đo 3 lần rồi lấy trung bình?', 'Why measure 3 times and take the average?', [['Để giảm ảnh hưởng của sai số ngẫu nhiên', 'To reduce the effect of random error'], ['Để $f$ lớn hơn', 'To make $f$ larger'], ['Vì màn chỉ chạy 3 vị trí', 'Because the screen only has 3 positions'], ['Không có lí do', 'No reason']], 0, 'Các lần đo dao động quanh giá trị thật; trung bình làm giảm sai số.', 'Readings scatter around the true value; the mean reduces the error.'),
          Q('q9', 'Ảnh trên màn trong thí nghiệm này là ảnh:', 'The image on the screen in this experiment is:', [['Thật, ngược chiều', 'Real, inverted'], ['Ảo, cùng chiều', 'Virtual, upright'], ['Ảo, ngược chiều', 'Virtual, inverted'], ['Thật, cùng chiều', 'Real, upright']], 0, 'Hứng được trên màn nên là ảnh thật, và vật ngoài tiêu cự nên ngược chiều.', 'It is caught on a screen so it is real, and the object is outside the focus so it is inverted.'),
          Q('q10', 'Thực hành ảo (Bessel): $f = 100\\ \\text{mm}$, $L = 500\\ \\text{mm}$. Hai vị trí cho ảnh nét cách nhau $l$ bằng khoảng:', 'Virtual practical (Bessel): $f = 100\\ \\text{mm}$, $L = 500\\ \\text{mm}$. The two sharp-image positions are $l$ apart, about:', [['224 mm', '224 mm'], ['100 mm', '100 mm'], ['300 mm', '300 mm'], ['500 mm', '500 mm']], 0, '$l = \\sqrt{L^2 - 4Lf} = \\sqrt{250000 - 200000} = 223{,}6\\ \\text{mm}$.', '$l = \\sqrt{L^2 - 4Lf} = \\sqrt{250000 - 200000} = 223.6\\ \\text{mm}$.')
        ] },
        { t: 'key', title: { vi: 'Em đã học', en: 'What you have learned' }, blocks: [{ t: 'list', items: [{ vi: 'Cách đo tiêu cự thấu kính hội tụ theo phương pháp Silbermann: $f = (d + d\')/4$.', en: 'Measuring the focal length of a converging lens by the Silbermann method: $f = (d + d\')/4$.' }] }] },
        { t: 'key', title: { vi: 'Em có thể', en: 'You can' }, blocks: [{ t: 'list', items: [{ vi: 'Tự đo tiêu cự của một thấu kính, trình bày báo cáo và nhận xét sai số.', en: 'Measure the focal length of a lens yourself, write the report and comment on the error.' }] }] },
        { t: 'summary', title: { vi: 'Tóm tắt bài học', en: 'Lesson summary' }, items: [
          { vi: 'Silbermann: dịch vật và màn ra xa bằng nhau tới khi ảnh nét thì $d = d\' = 2f$, $f = (d + d\')/4$; đo 3 lần rồi lấy trung bình.', en: 'Silbermann: move the object and screen apart equally until the image is sharp; then $d = d\' = 2f$ and $f = (d + d\')/4$; take the mean of 3 trials.' },
          { vi: 'Bessel: $f = (L^2 - l^2)/(4L)$ với $L > 4f$.', en: 'Bessel: $f = (L^2 - l^2)/(4L)$ with $L > 4f$.' }
        ] },
        { t: 'vocab', title: { vi: 'Từ vựng trong bài', en: 'Words from this lesson' }, hint: 'Bấm vào từ để xem ví dụ, bấm loa để nghe.', keys: ['symmetric-method', 'displacement-method', 'phys-mean', 'meas-error', 'sharp', 'ruler', 'focal-length', 'optics-screen', 'optical-bench'] }
      ] }
    ]
  };
  (function strip(o) {
    if (Array.isArray(o)) o.forEach(strip);
    else if (o && typeof o === 'object') { for (const k in o) { if (k === 'vi' && typeof o[k] === 'string') o[k] = o[k].replace(/\{([^{}|]+)\|[^{}]+\}/g, '$1'); else strip(o[k]); } }
  })(D.lessons['khtn9-bai9'].pages);
})();
