/* ==========================================================================
   TOÁN 9 (TẬP HAI) — CHƯƠNG VI: HÀM SỐ y = ax² (a ≠ 0). PHƯƠNG TRÌNH BẬC HAI MỘT ẨN
   --------------------------------------------------------------------------
   Các bài trong file này (mỗi bài một mục trong TEXTBOOK.lessons):

     'toan9-bai18'  Bài 18. Hàm số y = ax² (a ≠ 0)                 (tr. 4–9)
     'toan9-bai19'  Bài 19. Phương trình bậc hai một ẩn            (tr. 10–17)
     'toan9-bai20'  Bài 20. Định lí Viète và ứng dụng              (tr. 21–24)

   Chưa làm (để lượt sau): Luyện tập chung tr. 18–20, Bài 21 (tr. 25+), Bài tập cuối chương VI.

   Lời văn được biên soạn lại, không chép nguyên văn sách giáo khoa.
   Số liệu của ví dụ, bài tập giữ nguyên để kiểm tra được kết quả.

   QUY ƯỚC (giống các file trước)
   • Chuỗi dùng T`...` (String.raw); công thức trong $...$.
   • Thuật ngữ tiếng Anh viết {discriminant|discriminant}: phần trước dấu | là chữ hiển thị,
     phần sau là khoá trong glossary. App đổi thành
       <span class="vocab" data-key="discriminant">…</span>
     (gạch chân nét đứt, bấm để xem IPA, nghĩa, ví dụ, nghe phát âm).
     Dòng tiếng Việt KHÔNG chứa thẻ này (hàm sv() bỏ thẻ nếu có).
   • Hình vẽ: { t: 'fig', art: 'par62', no: '6.2', … } — hàm vẽ nằm trong js/illustrations-hinh4.js;
     đồ thị được tính từ công thức nên đúng toạ độ.
   • Bảng giá trị: { t: 'table', math: true, rows: [['x', '−3', …], ['y', …]] }.
     Bảng song ngữ: { t: 'table', head: true, rows: [[{vi,en}, …], …] }.
   ========================================================================== */
(function () {
  'use strict';

  const D = (window.TEXTBOOK = window.TEXTBOOK || {});
  D.lessons = D.lessons || {};
  D.glossary = D.glossary || {};

  const T = String.raw;
  const g = (word, ipa, pos, vi, ctx, exEn, exVi) => ({ word, ipa, pos, vi, ctx, ex: { en: exEn, vi: exVi } });

  /* ------------------------------------------------------------------------
     TỪ ĐIỂN (khoá mới; dùng lại các khoá cũ: coefficient, unknown, variable, equation,
     solution, calculator, product-equation, factorise, coordinate-plane …)
     ------------------------------------------------------------------------ */
  Object.assign(D.glossary, {
    function: g('function', '/ˈfʌŋk.ʃən/', 'n', 'hàm số',
      'Trong Toán: Quy tắc cho mỗi giá trị của x đúng một giá trị của y; ví dụ y = ax² là một hàm số xác định với mọi số thực x.',
      'The area S = πr² is a function of the radius r.', 'Diện tích S = πr² là một hàm số của bán kính r.'),
    'graph-of-function': g('graph of a function', '/ɡrɑːf əv ə ˈfʌŋk.ʃən/', 'n', 'đồ thị hàm số',
      'Trong Toán: Tập hợp tất cả các điểm (x; y) trên mặt phẳng toạ độ với y là giá trị của hàm số tại x.',
      'The graph of y = ax² is a curve called a parabola.', 'Đồ thị của y = ax² là một đường cong gọi là parabol.'),
    parabola: g('parabola', '/pəˈræb.ə.lə/', 'n', 'parabol (đường cong là đồ thị của y = ax²)',
      'Trong Toán: Đường cong là đồ thị của hàm số y = ax² (a ≠ 0); có đỉnh O và trục đối xứng Oy.',
      'The cable of the bridge has the shape of a parabola.', 'Dây cáp của cây cầu có dạng một parabol.'),
    vertex: g('vertex', '/ˈvɜː.teks/', 'n', 'đỉnh (của parabol)',
      'Trong Toán: Điểm thấp nhất (khi a > 0) hoặc cao nhất (khi a < 0) của parabol y = ax²; đó là gốc toạ độ O.',
      'The vertex of the parabola y = ax² is the origin.', 'Đỉnh của parabol y = ax² là gốc toạ độ.'),
    'parabola-axis': g('axis of symmetry of the parabola', '/ˈæk.sɪs əv ˈsɪm.ə.tri əv ðə pəˈræb.ə.lə/', 'n', 'trục đối xứng của parabol',
      'Trong Toán: Đường thẳng mà khi gấp theo đó hai nửa parabol chồng khít lên nhau; với y = ax² đó là trục tung Oy.',
      'The y-axis is the axis of symmetry of the parabola y = ax².', 'Trục tung Oy là trục đối xứng của parabol y = ax².'),
    'table-of-values': g('table of values', '/ˈteɪ.bəl əv ˈvæl.juːz/', 'n', 'bảng giá trị',
      'Trong Toán: Bảng ghi các cặp giá trị tương ứng (x; y) của một hàm số để vẽ đồ thị.',
      'Complete the table of values for y = 2x².', 'Hoàn thành bảng giá trị của hàm số y = 2x².'),
    'symmetric-points': g('symmetric points', '/sɪˈmet.rɪk pɔɪnts/', 'n', 'hai điểm đối xứng nhau',
      'Trong Toán: Hai điểm (x; y) và (−x; y) đối xứng nhau qua trục tung Oy.',
      'A and A′ are symmetric points about the y-axis.', 'A và A′ là hai điểm đối xứng nhau qua trục tung.'),
    'x-axis': g('x-axis', '/ˈeks ˌæk.sɪs/', 'n', 'trục hoành (Ox)',
      'Trong Toán: Trục nằm ngang của mặt phẳng toạ độ.',
      'For a > 0 the parabola lies above the x-axis.', 'Khi a > 0, parabol nằm phía trên trục hoành.'),
    'y-axis': g('y-axis', '/ˈwaɪ ˌæk.sɪs/', 'n', 'trục tung (Oy)',
      'Trong Toán: Trục thẳng đứng của mặt phẳng toạ độ.',
      'The graph is symmetric about the y-axis.', 'Đồ thị đối xứng nhau qua trục tung.'),
    origin: g('origin', '/ˈɒr.ɪ.dʒɪn/', 'n', 'gốc toạ độ',
      'Trong Toán: Điểm O(0; 0), giao của hai trục toạ độ.',
      'The vertex of the parabola is the origin O.', 'Đỉnh của parabol là gốc toạ độ O.'),
    'quadratic-equation': g('quadratic equation', '/kwɒˈdræt.ɪk ɪˈkweɪ.ʒən/', 'n', 'phương trình bậc hai (một ẩn)',
      'Trong Toán: Phương trình có dạng ax² + bx + c = 0, trong đó x là ẩn, a, b, c là các số cho trước và a ≠ 0.',
      '2x² − 3x + 1 = 0 is a quadratic equation.', '2x² − 3x + 1 = 0 là một phương trình bậc hai.'),
    'incomplete-quadratic': g('incomplete quadratic equation', '/ˌɪn.kəmˈpliːt kwɒˈdræt.ɪk ɪˈkweɪ.ʒən/', 'n', 'phương trình bậc hai khuyết',
      'Trong Toán: Phương trình bậc hai thiếu hệ số b (b = 0) hoặc thiếu số hạng tự do (c = 0).',
      'The equation 2x² − 4x = 0 is an incomplete quadratic equation.', 'Phương trình 2x² − 4x = 0 là phương trình bậc hai khuyết.'),
    'free-term': g('constant term', '/ˈkɒn.stənt tɜːm/', 'n', 'số hạng tự do',
      'Trong Toán: Số hạng không chứa ẩn (hệ số c trong ax² + bx + c).',
      'If the constant term is zero, factor out x.', 'Nếu số hạng tự do bằng 0, hãy đặt x làm nhân tử chung.'),
    'common-factor': g('common factor', '/ˈkɒm.ən ˈfæk.tər/', 'n', 'nhân tử chung',
      'Trong Toán: Thừa số có mặt trong mọi số hạng của một biểu thức.',
      'Take out the common factor 2x.', 'Đặt nhân tử chung 2x ra ngoài.'),
    'perfect-square': g('perfect square', '/ˈpɜː.fekt skweər/', 'n', 'bình phương của một biểu thức',
      'Trong Toán: Biểu thức có dạng (A + B)² hoặc (A − B)².',
      'Add a number to both sides to get a perfect square on the left.', 'Cộng cùng một số vào hai vế để vế trái thành một bình phương.'),
    'completing-square': g('completing the square', '/kəmˈpliː.tɪŋ ðə skweər/', 'n', 'biến đổi thành bình phương (hoàn thiện bình phương)',
      'Trong Toán: Cộng thêm một số vào hai vế để vế trái trở thành bình phương của một biểu thức.',
      'We solve x² − 4x = 1 by completing the square.', 'Ta giải x² − 4x = 1 bằng cách biến đổi vế trái thành bình phương.'),
    discriminant: g('discriminant', '/dɪˈskrɪm.ɪ.nənt/', 'n', 'biệt thức (Δ = b² − 4ac)',
      'Trong Toán: Biểu thức Δ = b² − 4ac; dấu của nó cho biết phương trình bậc hai có hai nghiệm phân biệt, nghiệm kép hay vô nghiệm.',
      'Compute the discriminant before solving.', 'Hãy tính biệt thức trước khi giải.'),
    delta: g('delta', '/ˈdel.tə/', 'n', 'đenta (chữ cái Hy Lạp Δ)',
      'Trong Toán: Chữ cái Hy Lạp Δ, dùng làm kí hiệu của biệt thức b² − 4ac.',
      'Δ is read as "delta".', 'Δ đọc là "đenta".'),
    'distinct-roots': g('two distinct roots', '/tuː dɪˈstɪŋkt ruːts/', 'n', 'hai nghiệm phân biệt',
      'Trong Toán: Hai nghiệm khác nhau; xảy ra khi Δ > 0.',
      'If Δ > 0, the equation has two distinct roots.', 'Nếu Δ > 0, phương trình có hai nghiệm phân biệt.'),
    'double-root': g('double root', '/ˈdʌb.əl ruːt/', 'n', 'nghiệm kép',
      'Trong Toán: Hai nghiệm trùng nhau x₁ = x₂; xảy ra khi Δ = 0.',
      'If Δ = 0, the equation has a double root.', 'Nếu Δ = 0, phương trình có nghiệm kép.'),
    'no-real-roots': g('no real roots', '/nəʊ rɪəl ruːts/', 'n', 'vô nghiệm',
      'Trong Toán: Không có số thực nào thoả mãn phương trình; xảy ra khi Δ < 0.',
      'If Δ < 0, the equation has no real roots.', 'Nếu Δ < 0, phương trình vô nghiệm.'),
    root: g('root', '/ruːt/', 'n', 'nghiệm (của phương trình)',
      'Trong Toán: Giá trị của ẩn làm cho hai vế của phương trình bằng nhau.',
      'x = 2 is a root of x² − 4 = 0.', 'x = 2 là một nghiệm của x² − 4 = 0.'),
    'quadratic-formula': g('quadratic formula', '/kwɒˈdræt.ɪk ˈfɔː.mjə.lə/', 'n', 'công thức nghiệm của phương trình bậc hai',
      'Trong Toán: Công thức x = (−b ± √Δ)/(2a) cho nghiệm của ax² + bx + c = 0 khi Δ ≥ 0.',
      'Apply the quadratic formula to find the roots.', 'Áp dụng công thức nghiệm để tìm các nghiệm.'),
    'reduced-formula': g('reduced quadratic formula', '/rɪˈdjuːst kwɒˈdræt.ɪk ˈfɔː.mjə.lə/', 'n', 'công thức nghiệm thu gọn',
      'Trong Toán: Khi b = 2b′, dùng Δ′ = b′² − ac và x = (−b′ ± √Δ′)/a.',
      'Use the reduced formula when b is even.', 'Dùng công thức nghiệm thu gọn khi b là số chẵn.'),
    'mental-solving': g('finding roots by inspection', '/ˈfaɪn.dɪŋ ruːts baɪ ɪnˈspek.ʃən/', 'n', 'tính nhẩm nghiệm',
      'Trong Toán: Tìm nghiệm mà không cần dùng công thức, nhờ quan sát hệ số hoặc dùng hệ thức Viète.',
      'Finding roots by inspection saves time.', 'Tính nhẩm nghiệm giúp tiết kiệm thời gian.'),
    'vieta-formulas': g("Vieta's formulas", '/viˈeɪ.tɑːz ˈfɔː.mjə.lə/', 'n', 'hệ thức Viète (định lí Viète)',
      'Trong Toán: Nếu x₁, x₂ là hai nghiệm của ax² + bx + c = 0 thì x₁ + x₂ = −b/a và x₁x₂ = c/a.',
      "Vieta's formulas relate the roots to the coefficients.", 'Hệ thức Viète liên hệ giữa các nghiệm và các hệ số.'),
    'sum-and-product': g('sum and product', '/sʌm ənd ˈprɒd.ʌkt/', 'n', 'tổng và tích',
      'Trong Toán: Tổng x₁ + x₂ và tích x₁x₂ của hai số (hai nghiệm).',
      'Find two numbers given their sum and product.', 'Tìm hai số khi biết tổng và tích của chúng.'),
    'zero-product': g('zero-product property', '/ˈzɪə.rəʊ ˈprɒd.ʌkt ˈprɒp.ə.ti/', 'n', 'tính chất tích bằng 0',
      'Trong Toán: Nếu A · B = 0 thì A = 0 hoặc B = 0.',
      'By the zero-product property, x = 0 or x − 2 = 0.', 'Theo tính chất tích bằng 0, x = 0 hoặc x − 2 = 0.'),
    'significant-decimal': g('decimal places', '/ˈdes.ɪ.məl ˈpleɪ.sɪz/', 'n', 'chữ số thập phân',
      'Trong Toán: Số chữ số sau dấu phẩy khi làm tròn.',
      'Round to two decimal places.', 'Làm tròn đến chữ số thập phân thứ hai.'),
    'suspension-bridge': g('suspension bridge', '/səˈspen.ʃən brɪdʒ/', 'n', 'cầu treo',
      'Trong Toán: Cầu có mặt cầu được treo bằng dây cáp; dây cáp chính thường có dạng parabol.',
      'The cable of a suspension bridge is a parabola.', 'Dây cáp của cầu treo là một parabol.')
  });

  /* ------------------------------------------------------------------------
     HÀM TRỢ GIÚP KHỐI NỘI DUNG
     ------------------------------------------------------------------------ */
  const sv = (s) => (typeof s === 'string' ? s.replace(/\{([^{}|]+)\|[^{}]*\}/g, '$1') : s);
  const p = (vi, en, extra) => Object.assign({ t: 'p', vi: sv(vi), en }, extra);
  const m = (tex, label) => ({ t: 'math', tex, label });
  const h2 = (n, vi, en) => ({ t: 'h2', n, vi, en });
  const h3 = (vi, en) => ({ t: 'h3', vi, en });
  const tip = (...items) => ({ t: 'tip', items: items.map((x) => ({ vi: sv(x.vi), en: x.en })) });
  const key = (blocks, title) => ({ t: 'key', title, blocks });
  const ex = (no, body, solution) => ({ t: 'ex', kind: 'example', no, body, solution });
  const lt = (no, body) => ({ t: 'ex', kind: 'practice', no, body });
  const vd = (no, body) => ({ t: 'ex', kind: 'apply', no, body });
  const act = (no, title, vi, en, items, extra) => Object.assign({ t: 'activity', no, title, vi: sv(vi), en, items: items && items.map((x) => ({ vi: sv(x.vi), en: x.en })), style: 'alpha' }, extra);
  const head = (kind, vi, en) => ({ t: 'head', kind, vi, en });
  const fig = (artName, no, vi, en) => ({ t: 'fig', art: artName, no, vi, en });
  const goals = (...items) => ({ t: 'goals', lead: { vi: 'Sau bài học này em sẽ:', en: 'After this lesson you will:' }, items });
  const bt = (no, vi, en) => p('**' + no + '.** ' + vi, '**' + no + '.** ' + en);
  const it = (vi, en) => ({ vi: sv(vi), en });
  const c = (vi, en) => ({ vi: sv(vi), en });   /* ô bảng song ngữ */
  const vt = (rows) => ({ t: 'table', math: true, rows });  /* bảng giá trị */

  const topic = { label: 'Chương', labelEn: 'Chapter', number: 'VI', vi: 'Hàm số y = ax². Phương trình bậc hai', en: 'The function y = ax². Quadratic equations' };

  /* ========================================================================
     BÀI 18. HÀM SỐ y = ax² (a ≠ 0)
     ======================================================================== */
  D.lessons['toan9-bai18'] = {
    gradeId: 9,
    number: '18',
    book: 'Toán 9',
    title: { vi: 'Hàm số y = ax² (a ≠ 0)', en: 'The function y = ax² (a ≠ 0)' },
    topic,
    spreadLabels: ['Hàm số y = ax²', 'Đồ thị của hàm số y = ax²', 'Bài tập'],
    pages: [
      /* ----------------------------------------------------------- Trang 4 */
      {
        number: 4,
        blocks: [
          { t: 'banner' },
          p(T`Chương này trình bày cách vẽ và tính chất của {đồ thị|graph-of-function} hàm số $y=ax^2$ ($a\ne 0$), cách giải phương trình bậc hai một ẩn và những ứng dụng thực tiễn liên quan.`,
            T`This chapter shows how to draw the {graph|graph-of-function} of $y=ax^2$ ($a\ne 0$) and what its properties are, how to solve quadratic equations in one variable, and how these ideas are used in practice.`),
          goals(
            it(T`Thiết lập bảng giá trị của hàm số $y=ax^2$ ($a\ne 0$).`,
              T`Set up a {table of values|table-of-values} for the {function|function} $y=ax^2$ ($a\ne 0$).`),
            it(T`Vẽ đồ thị của hàm số $y=ax^2$ ($a\ne 0$).`,
              T`Draw the graph of $y=ax^2$ ($a\ne 0$).`),
            it(T`Nhận biết tính đối xứng, trục đối xứng và đỉnh của đồ thị hàm số $y=ax^2$ ($a\ne 0$).`,
              T`Recognise the symmetry, the {axis of symmetry|parabola-axis} and the {vertex|vertex} of the graph of $y=ax^2$ ($a\ne 0$).`),
            it(T`Giải quyết một số vấn đề thực tiễn gắn với hàm số $y=ax^2$ ($a\ne 0$).`,
              T`Solve practical problems that involve the function $y=ax^2$ ($a\ne 0$).`)
          ),
          p(T`**Tình huống mở đầu.** Một cây cầu treo có trụ tháp đôi cao 75 m so với mặt cầu và cách nhau 400 m. Các dây cáp có dạng đồ thị của hàm số $y=ax^2$ ($a\ne 0$) như Hình 6.1 và được treo trên các đỉnh tháp. Tìm chiều cao $CH$ của dây cáp, biết điểm $H$ cách tâm $O$ của cây cầu 100 m (giả sử mặt cầu bằng phẳng).`,
            T`**Opening problem.** A {suspension bridge|suspension-bridge} has two towers 75 m high above the road deck, 400 m apart. The cables are the graph of a function $y=ax^2$ ($a\ne 0$), as in Fig. 6.1, and hang from the tops of the towers. Find the height $CH$ of the cable if the point $H$ is 100 m from the centre $O$ of the bridge (assume the deck is level).`),
          fig('bridge61', '6.1', 'Cầu treo: dây cáp là một phần của đồ thị y = ax²', 'A suspension bridge: the cable is part of the graph of y = ax²'),
          h2('1', 'Hàm số y = ax² (a ≠ 0)', 'The function y = ax² (a ≠ 0)'),
          h3('Nhận biết hàm số y = ax² (a ≠ 0)', 'Recognising the function y = ax² (a ≠ 0)')
        ]
      },

      /* ----------------------------------------------------------- Trang 5 */
      {
        number: 5,
        blocks: [
          act('1', { vi: 'Vật rơi tự do', en: 'A freely falling object' },
            T`Khi thả một vật rơi tự do và bỏ qua sức cản của không khí, quãng đường chuyển động $s$ (mét) của vật được cho bởi công thức $s=4{,}9t^2$, trong đó $t$ (giây) là thời gian chuyển động.`,
            T`When an object is dropped and air resistance is ignored, the distance $s$ (metres) it falls is given by $s=4.9t^2$, where $t$ (seconds) is the time of motion.`,
            [
              it(T`Hoàn thành bảng sau vào vở:`, T`Complete the following table in your notebook:`),
              it(T`Giả sử một vật rơi tự do từ độ cao 19,6 m so với mặt đất. Hỏi sau bao lâu vật chạm đất?`, T`An object falls freely from a height of 19.6 m above the ground. How long until it hits the ground?`)
            ]),
          vt([['t (giây)', '0', '1', '2'], ['s (m)', '?', '?', '?']]),
          act('2', { vi: 'Diện tích hình tròn', en: 'Area of a circle' },
            T`a) Viết công thức tính diện tích $S$ của hình tròn bán kính $r$. b) Hoàn thành bảng sau vào vở (lấy $\pi=3{,}14$ và làm tròn kết quả đến chữ số thập phân thứ hai):`,
            T`a) Write the formula for the area $S$ of a circle of radius $r$. b) Complete the table (take $\pi=3.14$ and round to two {decimal places|significant-decimal}):`,
            null),
          vt([['r (cm)', '1', '2', '3', '4'], ['S (cm²)', '?', '?', '?', '?']]),
          p(T`Công thức tính $s$ theo $t$ (Hoạt động 1) và tính $S$ theo $r$ (Hoạt động 2) biểu thị những hàm số cùng một dạng. Ta gọi đó là *hàm số* $y=ax^2$ ($a\ne 0$).`,
            T`The formulas for $s$ in terms of $t$ (Activity 1) and for $S$ in terms of $r$ (Activity 2) describe functions of the same form. We call them *the {function|function}* $y=ax^2$ ($a\ne 0$).`),
          tip({
            vi: T`**Nhận xét.** Hàm số $y=ax^2$ ($a\ne 0$) xác định với mọi giá trị $x$ thuộc $\mathbb{R}$.`,
            en: T`**Remark.** The function $y=ax^2$ ($a\ne 0$) is defined for every value of $x$ in $\mathbb{R}$.`
          }),
          ex(1, [
            p(T`Cho hàm số $y=\frac{3}{2}x^2$. Hoàn thành bảng giá trị sau vào vở:`,
              T`Given $y=\frac{3}{2}x^2$, complete the following {table of values|table-of-values}:`),
            vt([['x', '−3', '−2', '−1', '0', '1', '2', '3'], [T`y=\frac{3}{2}x^2`, '?', '?', '?', '?', '?', '?', '?']])
          ], [
            p(T`Thay lần lượt từng giá trị của $x$ vào công thức, chẳng hạn $x=-3$ thì $y=\frac{3}{2}\cdot 9=\frac{27}{2}$. Ta có bảng giá trị:`,
              T`Substitute each value of $x$ into the formula; for example $x=-3$ gives $y=\frac{3}{2}\cdot 9=\frac{27}{2}$. The table of values is:`),
            vt([['x', '−3', '−2', '−1', '0', '1', '2', '3'], [T`y=\frac{3}{2}x^2`, T`\frac{27}{2}`, '6', T`\frac{3}{2}`, '0', T`\frac{3}{2}`, '6', T`\frac{27}{2}`]])
          ]),
          lt(1, [
            p(T`Cho hàm số $y=-\frac{3}{2}x^2$. Hoàn thành bảng giá trị sau vào vở:`,
              T`Given $y=-\frac{3}{2}x^2$, complete the following table of values:`),
            vt([['x', '−3', '−2', '−1', '0', '1', '2', '3'], [T`y=-\frac{3}{2}x^2`, '?', '?', '?', '?', '?', '?', '?']])
          ]),
          vd(1, [
            p(T`Cho hình chóp tứ giác đều có đáy là hình vuông cạnh $a$ (cm) và chiều cao 15 cm. a) Viết công thức tính thể tích $V$ của hình chóp theo $a$ và tính giá trị của $V$ khi $a=5$ cm. b) Nếu độ dài cạnh đáy tăng lên hai lần thì thể tích của hình chóp thay đổi thế nào?`,
              T`A regular square pyramid has a square base of side $a$ (cm) and height 15 cm. a) Write a formula for the volume $V$ in terms of $a$ and find $V$ when $a=5$ cm. b) How does the volume change if the side of the base is doubled?`)
          ])
        ]
      },

      /* ----------------------------------------------------------- Trang 6 */
      {
        number: 6,
        blocks: [
          h2('2', 'Đồ thị của hàm số y = ax² (a ≠ 0)', 'The graph of y = ax² (a ≠ 0)'),
          h3('Cách vẽ đồ thị hàm số y = ax² (a ≠ 0)', 'How to draw the graph of y = ax² (a ≠ 0)'),
          act('3', { vi: 'Đồ thị của y = 2x²', en: 'The graph of y = 2x²' },
            T`Cho hàm số $y=2x^2$.`,
            T`Given the function $y=2x^2$.`,
            [
              it(T`Hoàn thành bảng giá trị sau vào vở:`, T`Complete the following table of values:`),
              it(T`Trong mặt phẳng toạ độ $Oxy$, biểu diễn các điểm $(x;\,y)$ trong bảng. Bằng cách làm tương tự, lấy nhiều điểm $(x;\,2x^2)$ với $x\in\mathbb{R}$ rồi nối lại, ta được đồ thị của hàm số $y=2x^2$.`,
                T`In the {coordinate plane|coordinate-plane} $Oxy$, plot the points $(x;\,y)$ of the table. Doing the same for many points $(x;\,2x^2)$ with $x\in\mathbb{R}$ and joining them gives the graph of $y=2x^2$.`)
            ]),
          vt([['x', '−3', '−2', '−1', '0', '1', '2', '3'], [T`y=2x^2`, '?', '?', '?', '?', '?', '?', '?']]),
          key([
            p(T`• Lập bảng ghi một số cặp giá trị tương ứng của $x$ và $y$.`,
              T`• Make a table of some corresponding values of $x$ and $y$.`),
            p(T`• Trong mặt phẳng toạ độ $Oxy$, biểu diễn các cặp điểm $(x;\,y)$ của bảng rồi nối chúng lại thành một đường cong: đó là đồ thị của hàm số $y=ax^2$ ($a\ne 0$).`,
              T`• In the plane $Oxy$ plot the points $(x;\,y)$ of the table and join them with a smooth curve: this is the {graph|graph-of-function} of $y=ax^2$ ($a\ne 0$).`)
          ], { vi: 'Cách vẽ đồ thị hàm số y = ax² (a ≠ 0)', en: 'Drawing the graph of y = ax² (a ≠ 0)' }),
          ex(2, [
            p(T`Vẽ đồ thị của hàm số $y=-\frac{1}{4}x^2$.`,
              T`Draw the graph of $y=-\frac{1}{4}x^2$.`)
          ], [
            p(T`Lập bảng một số giá trị tương ứng của $x$ và $y$:`, T`Make a table of corresponding values of $x$ and $y$:`),
            vt([['x', '−4', '−2', '−1', '0', '1', '2', '4'], [T`y=-\frac{1}{4}x^2`, '−4', '−1', T`-\frac{1}{4}`, '0', T`-\frac{1}{4}`, '−1', '−4']]),
            p(T`Biểu diễn các điểm $(-4;\,-4)$, $(-2;\,-1)$, $\left(-1;\,-\frac{1}{4}\right)$, $(0;\,0)$, $\left(1;\,-\frac{1}{4}\right)$, $(2;\,-1)$ và $(4;\,-4)$ trên mặt phẳng toạ độ $Oxy$ rồi nối chúng lại, ta được đồ thị của hàm số $y=-\frac{1}{4}x^2$ như Hình 6.2.`,
              T`Plot the points $(-4;\,-4)$, $(-2;\,-1)$, $\left(-1;\,-\frac{1}{4}\right)$, $(0;\,0)$, $\left(1;\,-\frac{1}{4}\right)$, $(2;\,-1)$ and $(4;\,-4)$ in the plane $Oxy$ and join them: this is the graph of $y=-\frac{1}{4}x^2$ shown in Fig. 6.2.`),
            fig('par62', '6.2', 'Đồ thị của hàm số y = −x²/4', 'The graph of y = −x²/4')
          ]),
          h3('Nhận biết tính đối xứng của đồ thị hàm số y = ax² (a ≠ 0)', 'Recognising the symmetry of the graph of y = ax² (a ≠ 0)'),
          act('4', { vi: 'Đồ thị của y = 2x² (H.6.3)', en: 'The graph of y = 2x² (Fig. 6.3)' },
            T`Xét đồ thị của hàm số $y=2x^2$ đã vẽ ở Hoạt động 3 (Hình 6.3).`,
            T`Look at the graph of $y=2x^2$ drawn in Activity 3 (Fig. 6.3).`,
            [
              it(T`Đồ thị nằm phía trên hay phía dưới trục hoành? Điểm nào là điểm thấp nhất của đồ thị?`,
                T`Does the graph lie above or below the {x-axis|x-axis}? Which point of the graph is the lowest?`),
              it(T`So sánh hoành độ và tung độ của các cặp điểm thuộc đồ thị: $A(1;\,2)$ và $A'(-1;\,2)$; $B(2;\,8)$ và $B'(-2;\,8)$. Từ đó nhận xét về vị trí giữa các cặp điểm nêu trên.`,
                T`Compare the abscissas and ordinates of the pairs of points on the graph: $A(1;\,2)$ and $A'(-1;\,2)$; $B(2;\,8)$ and $B'(-2;\,8)$. What does this say about the position of each pair?`)
            ]),
          fig('par63', '6.3', 'Đồ thị của y = 2x²: A, A′ và B, B′ đối xứng nhau qua Oy', 'The graph of y = 2x²: A, A′ and B, B′ are symmetric about the y-axis')
        ]
      },

      /* ----------------------------------------------------------- Trang 7 */
      {
        number: 7,
        blocks: [
          p(T`c) Tìm điểm $C$ có hoành độ $x=\frac{1}{2}$ thuộc đồ thị. Xác định toạ độ của điểm $C'$ đối xứng với $C$ qua trục tung $Oy$ và cho biết điểm $C'$ có thuộc đồ thị đã cho hay không.`,
            T`c) Find the point $C$ of the graph with abscissa $x=\frac{1}{2}$. Give the coordinates of the point $C'$ symmetric to $C$ about the {y-axis|y-axis} $Oy$ and say whether $C'$ also lies on the graph.`),
          tip({
            vi: T`Hai điểm $(x;\,y)$ và $(-x;\,y)$ đối xứng nhau qua trục tung $Oy$.`,
            en: T`The two points $(x;\,y)$ and $(-x;\,y)$ are {symmetric|symmetric-points} about the y-axis $Oy$.`
          }),
          key([
            p(T`Đồ thị của hàm số $y=ax^2$ ($a\ne 0$) là một đường cong, gọi là đường *parabol*, có các tính chất sau:`,
              T`The graph of $y=ax^2$ ($a\ne 0$) is a curve called a *{parabola|parabola}*, with these properties:`),
            p(T`• Có đỉnh là gốc toạ độ $O$;`, T`• Its {vertex|vertex} is the {origin|origin} $O$;`),
            p(T`• Có trục đối xứng là $Oy$;`, T`• Its {axis of symmetry|parabola-axis} is $Oy$;`),
            p(T`• Nằm phía trên trục hoành nếu $a>0$ và nằm phía dưới trục hoành nếu $a<0$.`,
              T`• It lies above the x-axis if $a>0$ and below the x-axis if $a<0$.`)
          ], { vi: 'Đồ thị của hàm số y = ax² (a ≠ 0)', en: 'The graph of y = ax² (a ≠ 0)' }),
          fig('par64', '6.4', 'Đồ thị của hàm số y = ax² (a ≠ 0): a > 0 và a < 0', 'The graph of y = ax² (a ≠ 0): a > 0 and a < 0'),
          ex(3, [
            p(T`a) Vẽ đồ thị của hàm số $y=-2x^2$. b) Tìm toạ độ các điểm thuộc đồ thị có tung độ bằng $-\frac{1}{2}$ và nhận xét về tính đối xứng giữa các điểm đó.`,
              T`a) Draw the graph of $y=-2x^2$. b) Find the coordinates of the points of the graph whose ordinate is $-\frac{1}{2}$ and comment on the symmetry between them.`)
          ], [
            p(T`a) Lập bảng một số giá trị tương ứng giữa $x$ và $y$:`, T`a) Make a table of corresponding values of $x$ and $y$:`),
            vt([['x', '−2', '−1', '0', '1', '2'], [T`y=-2x^2`, '−8', '−2', '0', '−2', '−8']]),
            p(T`Biểu diễn các điểm $(-2;\,-8)$, $(-1;\,-2)$, $(0;\,0)$, $(1;\,-2)$ và $(2;\,-8)$ trên mặt phẳng toạ độ $Oxy$ rồi nối chúng lại, ta được đồ thị của hàm số $y=-2x^2$ như Hình 6.5.`,
              T`Plot the points $(-2;\,-8)$, $(-1;\,-2)$, $(0;\,0)$, $(1;\,-2)$ and $(2;\,-8)$ in the plane $Oxy$ and join them to get the graph of $y=-2x^2$ (Fig. 6.5).`),
            fig('par65', '6.5', 'Đồ thị của hàm số y = −2x²', 'The graph of y = −2x²'),
            p(T`b) Ta có $y=-\frac{1}{2}$ nên $-2x^2=-\frac{1}{2}$, hay $x^2=\frac{1}{4}$. Suy ra $x=\frac{1}{2}$ hoặc $x=-\frac{1}{2}$.`,
              T`b) For $y=-\frac{1}{2}$ we get $-2x^2=-\frac{1}{2}$, so $x^2=\frac{1}{4}$. Hence $x=\frac{1}{2}$ or $x=-\frac{1}{2}$.`),
            p(T`Vậy có hai điểm cần tìm là $\left(\frac{1}{2};\,-\frac{1}{2}\right)$ và $\left(-\frac{1}{2};\,-\frac{1}{2}\right)$. Hai điểm này đối xứng với nhau qua trục tung $Oy$.`,
              T`So the two points are $\left(\frac{1}{2};\,-\frac{1}{2}\right)$ and $\left(-\frac{1}{2};\,-\frac{1}{2}\right)$. They are symmetric about the y-axis $Oy$.`)
          ]),
          tip({
            vi: T`**Nhận xét.** Khi vẽ đồ thị hàm số $y=ax^2$ ($a\ne 0$), ta cần xác định tối thiểu 5 điểm thuộc đồ thị: gốc toạ độ $O$ và hai cặp điểm đối xứng với nhau qua trục tung $Oy$.`,
            en: T`**Remark.** To draw the graph of $y=ax^2$ ($a\ne 0$) we need at least 5 points of it: the origin $O$ and two pairs of points symmetric about the y-axis $Oy$.`
          }, {
            vi: T`Vì đồ thị của hàm số $y=ax^2$ ($a\ne 0$) nhận trục tung $Oy$ làm trục đối xứng, ta có thể lập bảng giá trị với những giá trị $x$ không âm và vẽ phần đồ thị tương ứng ở bên phải trục tung; sau đó lấy đối xứng phần đã vẽ qua trục tung để được đồ thị của hàm số đã cho.`,
            en: T`Since the graph of $y=ax^2$ ($a\ne 0$) is symmetric about the y-axis, we can build the table with non-negative values of $x$, draw the part to the right of the y-axis, then reflect it in the y-axis to get the whole graph.`
          })
        ]
      },

      /* ----------------------------------------------------------- Trang 8 */
      {
        number: 8,
        blocks: [
          lt(2, [
            p(T`Vẽ đồ thị của hàm số $y=\frac{1}{2}x^2$. Tìm các điểm thuộc đồ thị có tung độ bằng 2 và nhận xét về tính đối xứng giữa các điểm đó.`,
              T`Draw the graph of $y=\frac{1}{2}x^2$. Find the points of the graph with ordinate 2 and comment on the symmetry between them.`)
          ]),
          vd(2, [
            p(T`Giải quyết bài toán ở tình huống mở đầu.`,
              T`Solve the problem of the opening situation.`)
          ]),
          head('practice', 'Bài tập', 'Exercises'),
          bt('6.1', T`Cho hàm số $y=0{,}25x^2$. Hoàn thành bảng giá trị sau vào vở:`,
            T`Given $y=0.25x^2$, complete the following table of values:`),
          vt([['x', '−3', '−2', '−1', '0', '1', '2', '3'], ['y', '?', '?', '?', '?', '?', '?', '?']]),
          bt('6.2', T`Cho hình lăng trụ đứng có đáy là hình vuông cạnh $a$ (cm) và chiều cao 10 cm. a) Viết công thức tính thể tích $V$ của hình lăng trụ theo $a$ và tính giá trị của $V$ khi $a=2$ cm. b) Nếu độ dài cạnh đáy tăng lên hai lần thì thể tích của hình lăng trụ thay đổi thế nào?`,
            T`A right prism has a square base of side $a$ (cm) and height 10 cm. a) Write a formula for its volume $V$ in terms of $a$ and find $V$ when $a=2$ cm. b) How does the volume change if the side of the base is doubled?`),
          bt('6.3', T`Diện tích toàn phần $S$ (cm²) của hình lập phương, tức là tổng diện tích xung quanh và diện tích của hai mặt đáy, là một hàm số của độ dài cạnh $a$ (cm). a) Viết công thức của hàm số này. b) Sử dụng công thức nhận được ở câu a để tính độ dài cạnh của một hình lập phương có diện tích toàn phần là 54 cm².`,
            T`The total surface area $S$ (cm²) of a cube, i.e. the lateral area plus the areas of the two bases, is a function of the edge length $a$ (cm). a) Write the formula of this function. b) Use it to find the edge of a cube whose total surface area is 54 cm².`),
          bt('6.4', T`Vẽ đồ thị của các hàm số sau: a) $y=3x^2$; b) $y=-\frac{1}{3}x^2$.`,
            T`Draw the graphs of the following functions: a) $y=3x^2$; b) $y=-\frac{1}{3}x^2$.`),
          bt('6.5', T`Biết rằng đường cong trong Hình 6.6 là một parabol $y=ax^2$. a) Tìm hệ số $a$. b) Tìm tung độ của điểm thuộc parabol có hoành độ $x=-2$. c) Tìm các điểm thuộc parabol có tung độ $y=8$.`,
            T`The curve in Fig. 6.6 is a {parabola|parabola} $y=ax^2$. a) Find the {coefficient|coefficient} $a$. b) Find the ordinate of the point of the parabola with abscissa $x=-2$. c) Find the points of the parabola with ordinate $y=8$.`),
          fig('par66', '6.6', 'Parabol y = ax² đi qua các điểm (±1; 0,5) và (±2; 2)', 'A parabola y = ax² through the points (±1; 0.5) and (±2; 2)')
        ]
      },

      /* ----------------------------------------------------------- Trang 9 */
      {
        number: 9,
        blocks: [
          bt('6.6', T`Trong Hình 6.7 có hai đường cong là đồ thị của hai hàm số $y=-3x^2$ và $y=x^2$. Hãy cho biết đường nào là đồ thị của hàm số $y=-3x^2$.`,
            T`The two curves in Fig. 6.7 are the graphs of $y=-3x^2$ and $y=x^2$. Which curve is the graph of $y=-3x^2$?`),
          fig('par67', '6.7', 'Hai parabol y = x² và y = −3x²', 'The two parabolas y = x² and y = −3x²'),
          bt('6.7', T`Một cổng vòm được thiết kế dạng parabol $y=ax^2$ như Hình 6.8. Biết chiều rộng của chân cổng là $AB=6$ m và chiều cao của cổng là $OI=4{,}5$ m. a) Tìm hệ số $a$ dựa vào các dữ kiện trên. Từ đó, tính độ dài đoạn $HK$ biết $H$ cách điểm chính giữa cổng $I$ là 2 m. b) Để vận chuyển hàng qua cổng, người ta dự định sử dụng một xe tải có chiều rộng 2 m, chiều cao 3 m. Hỏi xe tải này có thể đi qua được cổng vòm đó hay không?`,
            T`An archway is designed as a parabola $y=ax^2$, as in Fig. 6.8. The width of its base is $AB=6$ m and its height is $OI=4.5$ m. a) Find the coefficient $a$ from these data, and then the length of $HK$ given that $H$ is 2 m from the middle point $I$ of the archway. b) To carry goods through the archway a truck 2 m wide and 3 m high is planned. Can the truck pass through?`),
          fig('arch68', '6.8', 'Cổng vòm dạng parabol: AB = 6 m, OI = 4,5 m', 'A parabolic archway: AB = 6 m, OI = 4.5 m')
        ]
      }
    ]
  };

  /* ========================================================================
     BÀI 19. PHƯƠNG TRÌNH BẬC HAI MỘT ẨN
     ======================================================================== */
  D.lessons['toan9-bai19'] = {
    gradeId: 9,
    number: '19',
    book: 'Toán 9',
    title: { vi: 'Phương trình bậc hai một ẩn', en: 'Quadratic equations in one variable' },
    topic,
    spreadLabels: ['Định nghĩa và phương trình khuyết', 'Giải bằng biến đổi, công thức nghiệm', 'Biệt thức Δ, công thức thu gọn, máy tính', 'Bài tập'],
    pages: [
      /* ---------------------------------------------------------- Trang 10 */
      {
        number: 10,
        blocks: [
          { t: 'banner' },
          goals(
            it(T`Nhận biết khái niệm {phương trình bậc hai một ẩn|quadratic-equation}.`,
              T`Recognise the notion of a {quadratic equation|quadratic-equation} in one variable.`),
            it(T`Giải phương trình bậc hai một ẩn bằng {công thức nghiệm|quadratic-formula} và {biệt thức|discriminant}.`,
              T`Solve quadratic equations with the {quadratic formula|quadratic-formula} and the {discriminant|discriminant}.`),
            it(T`Tính nghiệm của phương trình bậc hai một ẩn bằng máy tính cầm tay.`,
              T`Find the roots of a quadratic equation with a handheld {calculator|calculator}.`),
            it(T`Vận dụng phương trình bậc hai vào giải quyết bài toán thực tiễn.`,
              T`Use quadratic equations to solve real-life problems.`)
          ),
          p(T`**Tình huống mở đầu.** Trên một mảnh đất hình chữ nhật có kích thước 28 m × 16 m, người ta dự định làm một bể bơi có đường đi xung quanh (Hình 6.9). Hỏi bề rộng của đường đi là bao nhiêu để diện tích của bể bơi là 288 m²?`,
            T`**Opening problem.** On a rectangular plot of land measuring 28 m × 16 m a swimming pool with a path around it is planned (Fig. 6.9). How wide should the path be so that the area of the pool is 288 m²?`),
          fig('pool69', '6.9', 'Bể bơi và đường đi xung quanh', 'The swimming pool and the path around it'),
          h2('1', 'Định nghĩa phương trình bậc hai một ẩn', 'Definition of a quadratic equation in one variable'),
          h3('Nhận biết phương trình bậc hai một ẩn', 'Recognising a quadratic equation in one variable'),
          act('1', { vi: 'Trở lại bài toán mở đầu', en: 'Back to the opening problem' },
            T`Xét bài toán trong tình huống mở đầu. Gọi $x$ (m) là bề rộng của đường đi ($0<x<8$).`,
            T`Consider the opening problem. Let $x$ (m) be the width of the path ($0<x<8$).`,
            [
              it(T`Tính chiều dài và chiều rộng của bể bơi theo $x$.`, T`Express the length and the width of the pool in terms of $x$.`),
              it(T`Dựa vào kết quả câu a, tính diện tích của bể bơi theo $x$.`, T`Using part a, express the area of the pool in terms of $x$.`),
              it(T`Sử dụng giả thiết và kết quả câu b, hãy viết phương trình để tìm $x$.`, T`Using the hypothesis and part b, write an equation to find $x$.`)
            ]),
          key([
            p(T`**Phương trình bậc hai một ẩn** (nói gọn là phương trình bậc hai) là phương trình có dạng`,
              T`A **{quadratic equation|quadratic-equation} in one variable** (a quadratic equation for short) is an equation of the form`),
            m(T`ax^2+bx+c=0,`),
            p(T`trong đó $x$ là ẩn; $a$, $b$, $c$ là những số cho trước gọi là *hệ số* và $a\ne 0$.`,
              T`where $x$ is the {unknown|unknown}, and $a$, $b$, $c$ are given numbers called {coefficients|coefficient}, with $a\ne 0$.`)
          ], { vi: 'Định nghĩa phương trình bậc hai một ẩn', en: 'Definition of a quadratic equation' })
        ]
      },

      /* ---------------------------------------------------------- Trang 11 */
      {
        number: 11,
        blocks: [
          ex(1, [
            p(T`Trong các phương trình sau, những phương trình nào là phương trình bậc hai ẩn $x$? Chỉ rõ các hệ số $a$, $b$, $c$ của mỗi phương trình bậc hai đó.`,
              T`Which of the following equations are quadratic equations in $x$? State the coefficients $a$, $b$, $c$ of each quadratic equation.`),
            p(T`a) $2x^2-3x+1=0$;  b) $x^2-3=0$;  c) $\left(\frac{1}{x}\right)^2+3\cdot\frac{1}{x}+2=0$;  d) $-5x^2=0$.`,
              T`a) $2x^2-3x+1=0$;  b) $x^2-3=0$;  c) $\left(\frac{1}{x}\right)^2+3\cdot\frac{1}{x}+2=0$;  d) $-5x^2=0$.`)
          ], [
            p(T`a) Phương trình $2x^2-3x+1=0$ là phương trình bậc hai với $a=2$, $b=-3$, $c=1$.`,
              T`a) $2x^2-3x+1=0$ is a quadratic equation with $a=2$, $b=-3$, $c=1$.`),
            p(T`b) Phương trình $x^2-3=0$ là phương trình bậc hai ẩn $x$ với $a=1$, $b=0$, $c=-3$.`,
              T`b) $x^2-3=0$ is a quadratic equation in $x$ with $a=1$, $b=0$, $c=-3$.`),
            p(T`c) Phương trình $\left(\frac{1}{x}\right)^2+3\cdot\frac{1}{x}+2=0$ không phải là phương trình bậc hai.`,
              T`c) $\left(\frac{1}{x}\right)^2+3\cdot\frac{1}{x}+2=0$ is not a quadratic equation.`),
            p(T`d) Phương trình $-5x^2=0$ là phương trình bậc hai ẩn $x$ với $a=-5$, $b=0$, $c=0$.`,
              T`d) $-5x^2=0$ is a quadratic equation in $x$ with $a=-5$, $b=0$, $c=0$.`)
          ]),
          lt(1, [
            p(T`Trong các phương trình sau, những phương trình nào là phương trình bậc hai ẩn $x$? Chỉ rõ các hệ số $a$, $b$, $c$ của mỗi phương trình bậc hai đó. a) $x^2+5=0$; b) $2x^2+7x=0$; c) $\frac{x^2-2x+5}{x}=0$; d) $0{,}5x^2=0$.`,
              T`Which of the following are quadratic equations in $x$? State $a$, $b$, $c$ for each one. a) $x^2+5=0$; b) $2x^2+7x=0$; c) $\frac{x^2-2x+5}{x}=0$; d) $0.5x^2=0$.`)
          ]),
          tip({
            vi: T`**Tranh luận.** Bạn nói: "Phương trình (ẩn $x$) $mx^2+2x+1=0$ ($m$ là một số cho trước) là một phương trình bậc hai với $a=m$, $b=2$, $c=1$." Ý kiến của em thế nào? (Gợi ý: hãy xét điều kiện của hệ số $a$.)`,
            en: T`**Discussion.** A friend says: "The equation (in $x$) $mx^2+2x+1=0$ ($m$ a given number) is a quadratic equation with $a=m$, $b=2$, $c=1$." What do you think? (Hint: check the condition on the coefficient $a$.)`
          }),
          h2('2', 'Cách giải phương trình bậc hai một ẩn có dạng đặc biệt', 'Solving quadratic equations of special forms'),
          h3('Cách giải phương trình bậc hai một ẩn dạng khuyết', 'Solving incomplete quadratic equations'),
          p(T`Giải một phương trình bậc hai là tìm tất cả các nghiệm của nó. Dưới đây, qua một số ví dụ đơn giản, ta trình bày cách giải phương trình dạng $ax^2+bx+c=0$ ($a\ne 0$) mà khuyết số hạng bậc nhất ($b=0$) hoặc khuyết số hạng tự do ($c=0$), bằng phương pháp đặt nhân tử chung đưa về dạng tích hoặc dùng hằng đẳng thức để đưa vế trái về một bình phương.`,
            T`To solve a quadratic equation is to find all its {roots|root}. Through a few simple examples we show how to solve $ax^2+bx+c=0$ ($a\ne 0$) when the linear term is missing ($b=0$) or the {constant term|free-term} is missing ($c=0$): either take out a {common factor|common-factor} to get a product, or use an identity to turn the left side into a {perfect square|perfect-square}. These are {incomplete quadratic equations|incomplete-quadratic}.`),
          key([
            p(T`• Nếu $A\cdot B=0$ thì $A=0$ hoặc $B=0$.`,
              T`• If $A\cdot B=0$ then $A=0$ or $B=0$ (the {zero-product property|zero-product}).`),
            p(T`• Nếu $A^2=B$ ($B\ge 0$) thì $A=\sqrt{B}$ hoặc $A=-\sqrt{B}$.`,
              T`• If $A^2=B$ ($B\ge 0$) then $A=\sqrt{B}$ or $A=-\sqrt{B}$.`)
          ], { vi: 'Hai điều cần nhớ', en: 'Two facts to remember' }),
          ex(2, [
            p(T`Giải các phương trình sau: a) $2x^2-4x=0$; b) $3x^2+8x=0$.`,
              T`Solve the equations: a) $2x^2-4x=0$; b) $3x^2+8x=0$.`)
          ], [
            p(T`a) $2x^2-4x=0$, tức là $2x(x-2)=0$. Suy ra $x=0$ hoặc $x=2$. Vậy phương trình có hai nghiệm: $x_1=0$, $x_2=2$.`,
              T`a) $2x^2-4x=0$ gives $2x(x-2)=0$, so $x=0$ or $x=2$. The equation has two roots: $x_1=0$, $x_2=2$.`),
            p(T`b) $3x^2+8x=0$, tức là $x(3x+8)=0$. Suy ra $x=0$ hoặc $x=-\frac{8}{3}$. Vậy phương trình có hai nghiệm: $x_1=0$, $x_2=-\frac{8}{3}$.`,
              T`b) $3x^2+8x=0$ gives $x(3x+8)=0$, so $x=0$ or $x=-\frac{8}{3}$. The roots are $x_1=0$, $x_2=-\frac{8}{3}$.`)
          ])
        ]
      },

      /* ---------------------------------------------------------- Trang 12 */
      {
        number: 12,
        blocks: [
          lt(2, [
            p(T`Giải các phương trình sau: a) $2x^2+6x=0$; b) $5x^2+11x=0$.`,
              T`Solve: a) $2x^2+6x=0$; b) $5x^2+11x=0$.`)
          ]),
          ex(3, [
            p(T`Giải các phương trình sau: a) $x^2-9=0$; b) $(x+1)^2=3$.`,
              T`Solve: a) $x^2-9=0$; b) $(x+1)^2=3$.`)
          ], [
            p(T`a) $x^2-9=0$ nên $x^2=9$, suy ra $x=3$ hoặc $x=-3$. Vậy phương trình có hai nghiệm: $x_1=3$, $x_2=-3$.`,
              T`a) $x^2-9=0$ gives $x^2=9$, so $x=3$ or $x=-3$. The roots are $x_1=3$, $x_2=-3$.`),
            p(T`b) $(x+1)^2=3$ nên $x+1=\sqrt{3}$ hoặc $x+1=-\sqrt{3}$, suy ra $x=-1+\sqrt{3}$ hoặc $x=-1-\sqrt{3}$. Vậy phương trình có hai nghiệm: $x_1=-1+\sqrt{3}$, $x_2=-1-\sqrt{3}$.`,
              T`b) $(x+1)^2=3$ gives $x+1=\sqrt{3}$ or $x+1=-\sqrt{3}$, so $x=-1+\sqrt{3}$ or $x=-1-\sqrt{3}$. The roots are $x_1=-1+\sqrt{3}$, $x_2=-1-\sqrt{3}$.`)
          ]),
          lt(3, [
            p(T`Giải các phương trình sau: a) $x^2-25=0$; b) $(x+3)^2=5$.`,
              T`Solve: a) $x^2-25=0$; b) $(x+3)^2=5$.`)
          ]),
          tip({
            vi: T`**Chú ý.** Để giải phương trình bậc hai dạng $x^2+bx=c$, ta có thể cộng thêm vào hai vế của phương trình cùng một số thích hợp để vế trái có thể biến đổi thành một bình phương. Từ đó có thể giải phương trình đã cho.`,
            en: T`**Note.** To solve an equation of the form $x^2+bx=c$, add a suitable number to both sides so that the left side becomes a {perfect square|perfect-square} (this is {completing the square|completing-square}). The equation can then be solved.`
          }),
          ex(4, [
            p(T`Cho phương trình $x^2-4x=1$. a) Hãy cộng vào cả hai vế của phương trình với cùng một số thích hợp để được một phương trình mà vế trái có thể biến đổi thành một bình phương. b) Dựa vào câu a và cách giải Ví dụ 3b, hãy giải phương trình đã cho.`,
              T`Given $x^2-4x=1$. a) Add the same suitable number to both sides to get an equation whose left side can be turned into a square. b) Using part a and the method of Example 3b, solve the equation.`)
          ], [
            p(T`a) $x^2-4x=1$. Cộng 4 vào hai vế: $x^2-4x+4=1+4$, tức là $(x-2)^2=5$.`,
              T`a) From $x^2-4x=1$, add 4 to both sides: $x^2-4x+4=1+4$, i.e. $(x-2)^2=5$.`),
            p(T`b) Từ kết quả câu a: $x-2=\sqrt{5}$ hoặc $x-2=-\sqrt{5}$, suy ra $x=2+\sqrt{5}$ hoặc $x=2-\sqrt{5}$. Vậy phương trình có hai nghiệm: $x_1=2+\sqrt{5}$, $x_2=2-\sqrt{5}$.`,
              T`b) Hence $x-2=\sqrt{5}$ or $x-2=-\sqrt{5}$, so $x=2+\sqrt{5}$ or $x=2-\sqrt{5}$. The roots are $x_1=2+\sqrt{5}$, $x_2=2-\sqrt{5}$.`)
          ])
        ]
      },

      /* ---------------------------------------------------------- Trang 13 */
      {
        number: 13,
        blocks: [
          lt(4, [
            p(T`Cho phương trình $x^2+6x=1$. Hãy cộng vào cả hai vế của phương trình với cùng một số thích hợp để được một phương trình mà vế trái có thể biến đổi thành một bình phương. Từ đó, hãy giải phương trình đã cho.`,
              T`Given $x^2+6x=1$. Add the same suitable number to both sides so that the left side becomes a square, and then solve the equation.`)
          ]),
          h2('3', 'Công thức nghiệm của phương trình bậc hai', 'The formula for the roots of a quadratic equation'),
          h3('Xây dựng công thức nghiệm của phương trình bậc hai', 'Deriving the quadratic formula'),
          act('4', { vi: 'Giải 2x² − 8x + 3 = 0 từng bước', en: 'Solving 2x² − 8x + 3 = 0 step by step' },
            T`Thực hiện lần lượt các bước sau để giải phương trình $2x^2-8x+3=0$.`,
            T`Carry out the following steps to solve $2x^2-8x+3=0$.`,
            [
              it(T`Chuyển hạng tử tự do sang vế phải.`, T`Move the constant term to the right-hand side.`),
              it(T`Chia cả hai vế của phương trình cho hệ số của $x^2$.`, T`Divide both sides by the coefficient of $x^2$.`),
              it(T`Thêm vào hai vế của phương trình nhận được ở câu b với cùng một số để vế trái có thể biến đổi thành một bình phương. Từ đó tìm nghiệm $x$.`,
                T`Add the same number to both sides of the equation from part b so that the left side becomes a square. Then find $x$.`)
            ]),
          h3('Cách giải phương trình bậc hai', 'How to solve a quadratic equation'),
          p(T`Tương tự Hoạt động 4, để giải phương trình bậc hai $ax^2+bx+c=0$ ($a\ne 0$) trong trường hợp tổng quát, ta làm như sau:`,
            T`Just as in Activity 4, to solve the general quadratic equation $ax^2+bx+c=0$ ($a\ne 0$) we proceed as follows:`),
          p(T`– Chuyển hạng tử tự do $c$ sang vế phải: $ax^2+bx=-c$.`,
            T`– Move the constant term $c$ to the right: $ax^2+bx=-c$.`),
          p(T`– Chia cả hai vế cho hệ số $a$ của $x^2$: $x^2+\frac{b}{a}x=-\frac{c}{a}$.`,
            T`– Divide both sides by the coefficient $a$ of $x^2$: $x^2+\frac{b}{a}x=-\frac{c}{a}$.`),
          p(T`– Cộng vào hai vế với $\frac{b^2}{4a^2}$ để vế trái biến đổi thành bình phương của một biểu thức:`,
            T`– Add $\frac{b^2}{4a^2}$ to both sides so that the left side becomes the square of an expression:`),
          m(T`x^2+\frac{b}{a}x+\frac{b^2}{4a^2}=-\frac{c}{a}+\frac{b^2}{4a^2}\quad\text{hay}\quad\left(x+\frac{b}{2a}\right)^2=\frac{b^2-4ac}{4a^2}.`),
          p(T`Kí hiệu $\Delta=b^2-4ac$ và gọi là *biệt thức* của phương trình ($\Delta$ đọc là "đenta"). Khi đó, ta có thể viết lại phương trình cuối dưới dạng`,
            T`Write $\Delta=b^2-4ac$ and call it the {discriminant|discriminant} of the equation ($\Delta$ is read "{delta|delta}"). The last equation can then be written as`),
          m(T`\left(x+\frac{b}{2a}\right)^2=\frac{\Delta}{4a^2}.`),
          p(T`Từ đây, ta có kết quả sau:`, T`This leads to the following result:`),
          key([
            p(T`Xét phương trình bậc hai một ẩn $ax^2+bx+c=0$ ($a\ne 0$). Tính biệt thức $\Delta=b^2-4ac$.`,
              T`Consider $ax^2+bx+c=0$ ($a\ne 0$). Compute the discriminant $\Delta=b^2-4ac$.`),
            p(T`• Nếu $\Delta>0$ thì phương trình có hai nghiệm phân biệt:`,
              T`• If $\Delta>0$, the equation has {two distinct roots|distinct-roots}:`),
            m(T`x_1=\frac{-b+\sqrt{\Delta}}{2a};\qquad x_2=\frac{-b-\sqrt{\Delta}}{2a}.`),
            p(T`• Nếu $\Delta=0$ thì phương trình có nghiệm kép $x_1=x_2=-\frac{b}{2a}$.`,
              T`• If $\Delta=0$, the equation has a {double root|double-root} $x_1=x_2=-\frac{b}{2a}$.`),
            p(T`• Nếu $\Delta<0$ thì phương trình vô nghiệm.`,
              T`• If $\Delta<0$, the equation has {no real roots|no-real-roots}.`)
          ], { vi: 'Công thức nghiệm của phương trình bậc hai', en: 'The quadratic formula' }),
          { t: 'table', head: true, rows: [
            [c('Dấu của $\\Delta$', 'Sign of $\\Delta$'), c('Số nghiệm', 'Number of roots'), c('Nghiệm', 'Roots')],
            [c('$\\Delta>0$', '$\\Delta>0$'), c('Hai nghiệm phân biệt', 'Two distinct roots'), c('$x=\\frac{-b\\pm\\sqrt{\\Delta}}{2a}$', '$x=\\frac{-b\\pm\\sqrt{\\Delta}}{2a}$')],
            [c('$\\Delta=0$', '$\\Delta=0$'), c('Nghiệm kép', 'A double root'), c('$x_1=x_2=-\\frac{b}{2a}$', '$x_1=x_2=-\\frac{b}{2a}$')],
            [c('$\\Delta<0$', '$\\Delta<0$'), c('Vô nghiệm', 'No real roots'), c('—', '—')]
          ] }
        ]
      },

      /* ---------------------------------------------------------- Trang 14 */
      {
        number: 14,
        blocks: [
          ex(5, [
            p(T`Cho phương trình $3x^2+7x-1=0$. a) Xác định các hệ số $a$, $b$, $c$. b) Tính biệt thức $\Delta$. c) Áp dụng công thức nghiệm, giải phương trình đã cho.`,
              T`Given $3x^2+7x-1=0$. a) Identify the coefficients $a$, $b$, $c$. b) Compute the discriminant $\Delta$. c) Solve the equation with the quadratic formula.`)
          ], [
            p(T`a) Ta có: $a=3$, $b=7$, $c=-1$.`, T`a) We have $a=3$, $b=7$, $c=-1$.`),
            p(T`b) Ta có: $\Delta=b^2-4ac=7^2-4\cdot 3\cdot(-1)=49+12=61$.`,
              T`b) $\Delta=b^2-4ac=7^2-4\cdot 3\cdot(-1)=49+12=61$.`),
            p(T`c) Do $\Delta>0$, áp dụng công thức nghiệm, phương trình có hai nghiệm phân biệt:`,
              T`c) Since $\Delta>0$, the quadratic formula gives two distinct roots:`),
            m(T`x_1=\frac{-7+\sqrt{61}}{6},\qquad x_2=\frac{-7-\sqrt{61}}{6}.`)
          ]),
          ex(6, [
            p(T`Giải các phương trình sau: a) $x^2-6x+9=0$; b) $2x^2+3x+5=0$.`,
              T`Solve: a) $x^2-6x+9=0$; b) $2x^2+3x+5=0$.`)
          ], [
            p(T`a) Ta có $\Delta=(-6)^2-4\cdot 1\cdot 9=0$. Do đó, phương trình có nghiệm kép:`,
              T`a) $\Delta=(-6)^2-4\cdot 1\cdot 9=0$, so the equation has a double root:`),
            m(T`x_1=x_2=-\frac{b}{2a}=-\frac{-6}{2}=3.`),
            p(T`b) Ta có $\Delta=3^2-4\cdot 2\cdot 5=9-40=-31<0$. Do đó, phương trình vô nghiệm.`,
              T`b) $\Delta=3^2-4\cdot 2\cdot 5=9-40=-31<0$, so the equation has no real roots.`)
          ]),
          lt(5, [
            p(T`Áp dụng công thức nghiệm, giải các phương trình sau: a) $2x^2-5x+1=0$; b) $x^2+8x+16=0$; c) $x^2-x+1=0$.`,
              T`Use the quadratic formula to solve: a) $2x^2-5x+1=0$; b) $x^2+8x+16=0$; c) $x^2-x+1=0$.`)
          ]),
          tip({
            vi: T`**Thử thách nhỏ.** Có thể nói gì về nghiệm của phương trình bậc hai $ax^2+bx+c=0$ nếu $a$ và $c$ trái dấu? (Gợi ý: xét dấu của $-4ac$.)`,
            en: T`**Small challenge.** What can you say about the roots of $ax^2+bx+c=0$ if $a$ and $c$ have opposite signs? (Hint: look at the sign of $-4ac$.)`
          }),
          p(T`**Chú ý.** Xét phương trình bậc hai $ax^2+bx+c=0$ ($a\ne 0$), với $b=2b'$ và $Δ′=b'^2-ac$.`,
            T`**Note.** Consider $ax^2+bx+c=0$ ($a\ne 0$) with $b=2b'$ and $Δ′=b'^2-ac$.`),
          key([
            p(T`• Nếu $Δ′>0$ thì phương trình có hai nghiệm phân biệt:`,
              T`• If $Δ′>0$, there are two distinct roots:`),
            m(T`x_1=\frac{-b'+\sqrt{Δ′}}{a};\qquad x_2=\frac{-b'-\sqrt{Δ′}}{a}.`),
            p(T`• Nếu $Δ′=0$ thì phương trình có nghiệm kép $x_1=x_2=-\frac{b'}{a}$.`,
              T`• If $Δ′=0$, there is a double root $x_1=x_2=-\frac{b'}{a}$.`),
            p(T`• Nếu $Δ′<0$ thì phương trình vô nghiệm.`,
              T`• If $Δ′<0$, there are no real roots.`),
            p(T`Các công thức ở trên gọi là *công thức nghiệm thu gọn*.`,
              T`These are called the {reduced quadratic formula|reduced-formula}.`)
          ], { vi: 'Công thức nghiệm thu gọn (b = 2b′)', en: 'The reduced formula (b = 2b′)' })
        ]
      },

      /* ---------------------------------------------------------- Trang 15 */
      {
        number: 15,
        blocks: [
          ex(7, [
            p(T`Xác định $a$, $b'$, $c$ rồi dùng công thức nghiệm thu gọn giải các phương trình sau: a) $2x^2+6x+1=0$; b) $x^2-4\sqrt{3}x+12=0$.`,
              T`Identify $a$, $b'$, $c$ and use the reduced formula to solve: a) $2x^2+6x+1=0$; b) $x^2-4\sqrt{3}x+12=0$.`)
          ], [
            p(T`a) Ta có: $a=2$, $b'=3$, $c=1$ và $Δ′=3^2-2\cdot 1=7>0$. Do đó, phương trình có hai nghiệm phân biệt: $x_1=\frac{-3+\sqrt{7}}{2}$; $x_2=\frac{-3-\sqrt{7}}{2}$.`,
              T`a) $a=2$, $b'=3$, $c=1$ and $Δ′=3^2-2\cdot 1=7>0$. So there are two distinct roots: $x_1=\frac{-3+\sqrt{7}}{2}$; $x_2=\frac{-3-\sqrt{7}}{2}$.`),
            p(T`b) Ta có: $a=1$, $b'=-2\sqrt{3}$, $c=12$ và $Δ′=(-2\sqrt{3})^2-1\cdot 12=0$. Do đó, phương trình có nghiệm kép: $x_1=x_2=2\sqrt{3}$.`,
              T`b) $a=1$, $b'=-2\sqrt{3}$, $c=12$ and $Δ′=(-2\sqrt{3})^2-1\cdot 12=0$. So there is a double root: $x_1=x_2=2\sqrt{3}$.`)
          ]),
          lt(6, [
            p(T`Xác định $a$, $b'$, $c$ rồi dùng công thức nghiệm thu gọn giải các phương trình sau: a) $3x^2+8x-3=0$; b) $x^2+6\sqrt{2}x+2=0$.`,
              T`Identify $a$, $b'$, $c$ and use the reduced formula to solve: a) $3x^2+8x-3=0$; b) $x^2+6\sqrt{2}x+2=0$.`)
          ]),
          vd(3, [
            p(T`Giải bài toán trong tình huống mở đầu. (Gợi ý: phương trình là $(28-2x)(16-2x)=288$, đưa về $x^2-22x+40=0$; nghiệm thoả mãn $0<x<8$ là $x=2$, tức là đường đi rộng 2 m.)`,
              T`Solve the opening problem. (Hint: the equation is $(28-2x)(16-2x)=288$, which reduces to $x^2-22x+40=0$; the root with $0<x<8$ is $x=2$, so the path is 2 m wide.)`)
          ]),
          h2('4', 'Tìm nghiệm của phương trình bậc hai bằng máy tính cầm tay', 'Finding the roots of a quadratic equation with a calculator'),
          p(T`Sử dụng máy tính cầm tay, ta có thể dễ dàng tìm nghiệm của các phương trình bậc hai một ẩn.`,
            T`With a handheld {calculator|calculator} we can easily find the roots of quadratic equations in one variable.`),
          ex(8, [
            p(T`Sử dụng máy tính cầm tay, tìm nghiệm của các phương trình sau: a) $2x^2-5x-4=0$; b) $9x^2-12x+4=0$; c) $-3x^2+4x-2=0$.`,
              T`Use a calculator to find the roots of: a) $2x^2-5x-4=0$; b) $9x^2-12x+4=0$; c) $-3x^2+4x-2=0$.`)
          ], [
            p(T`Với một loại máy tính cầm tay, sau khi mở máy ta bấm phím [[MODE]] [[5]] [[3]] để chuyển về chế độ giải phương trình bậc hai. Tiếp theo, với từng phương trình ta thực hiện như sau:`,
              T`On one type of calculator, after switching on we press [[MODE]] [[5]] [[3]] to enter the quadratic-equation mode. Then, for each equation:`),
            p(T`**a)** $2x^2-5x-4=0$. Bấm: [[2]] [[=]] [[−]] [[5]] [[=]] [[−]] [[4]] [[=]] [[=]]. Màn hình hiện $X_1=\frac{5+\sqrt{57}}{4}$; bấm tiếp [[=]] được $X_2=\frac{5-\sqrt{57}}{4}$. Phương trình có hai nghiệm phân biệt: $x_1=\frac{5+\sqrt{57}}{4}$; $x_2=\frac{5-\sqrt{57}}{4}$.`,
              T`**a)** $2x^2-5x-4=0$. Press [[2]] [[=]] [[−]] [[5]] [[=]] [[−]] [[4]] [[=]] [[=]]. The screen shows $X_1=\frac{5+\sqrt{57}}{4}$; press [[=]] again to get $X_2=\frac{5-\sqrt{57}}{4}$. Two distinct roots: $x_1=\frac{5+\sqrt{57}}{4}$; $x_2=\frac{5-\sqrt{57}}{4}$.`),
            p(T`**b)** $9x^2-12x+4=0$. Bấm: [[9]] [[=]] [[−]] [[1]] [[2]] [[=]] [[4]] [[=]] [[=]]. Màn hình hiện $X=\frac{2}{3}$: phương trình có nghiệm kép $x_1=x_2=\frac{2}{3}$.`,
              T`**b)** $9x^2-12x+4=0$. Press [[9]] [[=]] [[−]] [[1]] [[2]] [[=]] [[4]] [[=]] [[=]]. The screen shows $X=\frac{2}{3}$: a double root $x_1=x_2=\frac{2}{3}$.`),
            p(T`**c)** $-3x^2+4x-2=0$. Bấm: [[−]] [[3]] [[=]] [[4]] [[=]] [[−]] [[2]] [[=]] [[=]]. Màn hình hiện $X_1=\frac{2}{3}+\frac{\sqrt{2}}{3}i$; bấm tiếp [[=]] được $X_2=\frac{2}{3}-\frac{\sqrt{2}}{3}i$. Có chữ $i$ nên các nghiệm không thực: phương trình vô nghiệm.`,
              T`**c)** $-3x^2+4x-2=0$. Press [[−]] [[3]] [[=]] [[4]] [[=]] [[−]] [[2]] [[=]] [[=]]. The screen shows $X_1=\frac{2}{3}+\frac{\sqrt{2}}{3}i$; press [[=]] again to get $X_2=\frac{2}{3}-\frac{\sqrt{2}}{3}i$. The letter $i$ means the roots are not real: the equation has no real roots.`)
          ])
        ]
      },

      /* ---------------------------------------------------------- Trang 16 */
      {
        number: 16,
        blocks: [
          tip({
            vi: T`**Chú ý.** Để hiển thị kết quả xấp xỉ ở dạng số thập phân sau khi nhận kết quả, ta bấm phím [[S⇔D]].`,
            en: T`**Note.** To show an approximate result as a decimal after getting the result, press [[S⇔D]].`
          }),
          lt(7, [
            p(T`Sử dụng máy tính cầm tay, tìm nghiệm của các phương trình sau: a) $5x^2+2\sqrt{10}x+2=0$; b) $3x^2-5x+7=0$; c) $4x^2-11x+1=0$.`,
              T`Use a calculator to find the roots of: a) $5x^2+2\sqrt{10}x+2=0$; b) $3x^2-5x+7=0$; c) $4x^2-11x+1=0$.`)
          ]),
          head('practice', 'Bài tập', 'Exercises'),
          bt('6.8', T`Đưa các phương trình sau về dạng $ax^2+bx+c=0$ và xác định các hệ số $a$, $b$, $c$ của phương trình đó. a) $3x^2+2x-1=x^2-x$; b) $(2x+1)^2=x^2+1$.`,
            T`Bring the equations to the form $ax^2+bx+c=0$ and identify the coefficients $a$, $b$, $c$. a) $3x^2+2x-1=x^2-x$; b) $(2x+1)^2=x^2+1$.`),
          bt('6.9', T`Giải các phương trình sau: a) $2x^2+\frac{1}{3}x=0$; b) $(3x+2)^2=5$.`,
            T`Solve: a) $2x^2+\frac{1}{3}x=0$; b) $(3x+2)^2=5$.`),
          bt('6.10', T`Không cần giải phương trình, hãy xác định các hệ số $a$, $b$, $c$, tính biệt thức $\Delta$ và xác định số nghiệm của mỗi phương trình sau: a) $11x^2+13x-1=0$; b) $9x^2+42x+49=0$; c) $x^2-2x+3=0$.`,
            T`Without solving, identify $a$, $b$, $c$, compute the {discriminant|discriminant} $\Delta$ and determine the number of roots of each equation: a) $11x^2+13x-1=0$; b) $9x^2+42x+49=0$; c) $x^2-2x+3=0$.`)
        ]
      },

      /* ---------------------------------------------------------- Trang 17 */
      {
        number: 17,
        blocks: [
          bt('6.11', T`Áp dụng công thức nghiệm của phương trình bậc hai, giải các phương trình sau: a) $x^2-2\sqrt{5}x+2=0$; b) $4x^2+28x+49=0$; c) $3x^2-3\sqrt{2}x+1=0$.`,
            T`Use the quadratic formula to solve: a) $x^2-2\sqrt{5}x+2=0$; b) $4x^2+28x+49=0$; c) $3x^2-3\sqrt{2}x+1=0$.`),
          bt('6.12', T`Sử dụng máy tính cầm tay, tìm nghiệm của các phương trình sau: a) $0{,}1x^2+2{,}5x-0{,}2=0$; b) $0{,}01x^2-0{,}05x+0{,}0625=0$; c) $1{,}2x^2+0{,}75x+2{,}5=0$.`,
            T`Use a calculator to find the roots of: a) $0.1x^2+2.5x-0.2=0$; b) $0.01x^2-0.05x+0.0625=0$; c) $1.2x^2+0.75x+2.5=0$.`),
          bt('6.13', T`Độ cao $h$ (mét) so với mặt đất của một vật được phóng thẳng đứng lên trên từ mặt đất với vận tốc ban đầu $v_0=19{,}6$ m/s cho bởi công thức $h=19{,}6t-4{,}9t^2$, ở đó $t$ (giây) là thời gian kể từ khi phóng. Hỏi sau bao lâu kể từ khi phóng, vật sẽ rơi trở lại mặt đất?`,
            T`The height $h$ (metres) above the ground of an object thrown straight up from the ground with initial speed $v_0=19.6$ m/s is $h=19.6t-4.9t^2$, where $t$ (seconds) is the time since launch. How long after launch does the object fall back to the ground?`),
          bt('6.14', T`Kích thước màn hình ti vi hình chữ nhật được xác định bằng độ dài đường chéo. Ti vi truyền thống có định dạng 4 : 3, nghĩa là tỉ lệ giữa chiều dài và chiều rộng của màn hình là 4 : 3. Hỏi diện tích của màn hình ti vi truyền thống 37 in là bao nhiêu? Diện tích của màn hình ti vi LCD 37 in có định dạng 16 : 9 là bao nhiêu? Màn hình ti vi nào có diện tích lớn hơn? Ở đây, diện tích của các màn hình được tính bằng inch vuông.`,
            T`The size of a rectangular TV screen is given by the length of its diagonal. A traditional TV has the 4 : 3 format, meaning the ratio of the length to the width of the screen is 4 : 3. What is the area of a 37-inch traditional TV screen? What is the area of a 37-inch LCD TV in the 16 : 9 format? Which screen has the larger area? Areas are measured in square inches.`),
          bt('6.15', T`Một mảnh vườn hình chữ nhật có chiều rộng nhỏ hơn chiều dài 6 m và có diện tích bằng 280 m². Tính các kích thước của mảnh vườn đó.`,
            T`A rectangular garden is 6 m narrower than it is long and has area 280 m². Find its dimensions.`)
        ]
      }
    ]
  };

  /* ========================================================================
     BÀI 20. ĐỊNH LÍ VIÈTE VÀ ỨNG DỤNG
     ======================================================================== */
  D.lessons['toan9-bai20'] = {
    gradeId: 9,
    number: '20',
    book: 'Toán 9',
    title: { vi: 'Định lí Viète và ứng dụng', en: "Vieta's theorem and its applications" },
    topic,
    spreadLabels: ['Định lí Viète', 'Tính nhẩm nghiệm, tìm hai số khi biết tổng và tích', 'Bài tập'],
    pages: [
      /* ---------------------------------------------------------- Trang 21 */
      {
        number: 21,
        blocks: [
          { t: 'banner' },
          goals(
            it(T`Giải thích {định lí Viète|vieta-formulas}.`,
              T`Explain {Vieta's theorem|vieta-formulas}.`),
            it(T`Vận dụng định lí Viète để {tính nhẩm nghiệm|mental-solving} của phương trình bậc hai, tìm hai số khi biết {tổng và tích|sum-and-product} của chúng.`,
              T`Use Vieta's theorem to find roots of a quadratic equation by inspection and to find two numbers when their {sum and product|sum-and-product} are known.`)
          ),
          p(T`**Tình huống mở đầu.** Bác An có 40 m hàng rào lưới thép. Bác muốn dùng nó để rào xung quanh một mảnh đất trồng (đủ rộng) thành một mảnh vườn hình chữ nhật có diện tích 96 m² để trồng rau. Tính chiều dài và chiều rộng của mảnh vườn đó.`,
            T`**Opening problem.** Mr An has 40 m of wire fencing. He wants to use it to fence a (large enough) plot into a rectangular vegetable garden of area 96 m². Find the length and the width of the garden.`),
          fig('fence620', '', 'Mảnh vườn hình chữ nhật: chu vi 40 m, diện tích 96 m²', 'A rectangular garden: perimeter 40 m, area 96 m²'),
          h2('1', 'Định lí Viète', "Vieta's theorem"),
          h3('Khám phá định lí Viète', "Discovering Vieta's theorem"),
          act('1', { vi: 'Hai nghiệm của phương trình bậc hai', en: 'The two roots of a quadratic equation' },
            T`Xét phương trình bậc hai $ax^2+bx+c=0$ ($a\ne 0$). Giả sử $\Delta=b^2-4ac\ge 0$.`,
            T`Consider $ax^2+bx+c=0$ ($a\ne 0$) and suppose $\Delta=b^2-4ac\ge 0$.`,
            [
              it(T`Nhắc lại công thức tính hai nghiệm $x_1$, $x_2$ của phương trình trên.`, T`Recall the formulas for the two roots $x_1$, $x_2$ of this equation.`),
              it(T`Từ kết quả câu a, hãy tính $x_1+x_2$ và $x_1x_2$.`, T`From part a, compute $x_1+x_2$ and $x_1x_2$.`)
            ]),
          p(T`Từ kết quả của Hoạt động 2, ta có định lí Viète như sau:`,
            T`The result of this activity is {Vieta's theorem|vieta-formulas}:`),
          key([
            p(T`**Định lí Viète.** Nếu $x_1$, $x_2$ là hai nghiệm của phương trình $ax^2+bx+c=0$ ($a\ne 0$) thì`,
              T`**Vieta's theorem.** If $x_1$, $x_2$ are the two roots of $ax^2+bx+c=0$ ($a\ne 0$), then`),
            m(T`\begin{cases}x_1+x_2=-\frac{b}{a}\\ x_1x_2=\frac{c}{a}.\end{cases}`)
          ], { vi: 'Định lí Viète', en: "Vieta's theorem" }),
          ex(1, [
            p(T`Không giải phương trình, hãy tính biệt thức $\Delta$ (hoặc $Δ′$) để kiểm tra điều kiện có nghiệm, rồi tính tổng và tích các nghiệm của các phương trình bậc hai sau: a) $2x^2+11x+7=0$; b) $4x^2-12x+9=0$.`,
              T`Without solving, compute the {discriminant|discriminant} $\Delta$ (or $Δ′$) to check that roots exist, then find the sum and the product of the roots: a) $2x^2+11x+7=0$; b) $4x^2-12x+9=0$.`)
          ], [
            p(T`a) Ta có $\Delta=11^2-4\cdot 2\cdot 7=65>0$ nên phương trình có hai nghiệm phân biệt $x_1$, $x_2$. Theo định lí Viète: $x_1+x_2=-\frac{11}{2}$; $x_1x_2=\frac{7}{2}$.`,
              T`a) $\Delta=11^2-4\cdot 2\cdot 7=65>0$, so there are two distinct roots $x_1$, $x_2$. By Vieta's theorem: $x_1+x_2=-\frac{11}{2}$; $x_1x_2=\frac{7}{2}$.`),
            p(T`b) Ta có $Δ′=(-6)^2-4\cdot 9=0$ nên phương trình có hai nghiệm trùng nhau $x_1$, $x_2$. Theo định lí Viète: $x_1+x_2=-\frac{-12}{4}=3$; $x_1x_2=\frac{9}{4}$.`,
              T`b) $Δ′=(-6)^2-4\cdot 9=0$, so the two roots coincide ({double root|double-root}). By Vieta's theorem: $x_1+x_2=-\frac{-12}{4}=3$; $x_1x_2=\frac{9}{4}$.`)
          ])
        ]
      },

      /* ---------------------------------------------------------- Trang 22 */
      {
        number: 22,
        blocks: [
          lt(1, [
            p(T`Không giải phương trình, hãy tính biệt thức $\Delta$ (hoặc $Δ′$) để kiểm tra điều kiện có nghiệm, rồi tính tổng và tích các nghiệm của các phương trình bậc hai sau: a) $2x^2-7x+3=0$; b) $25x^2-20x+4=0$; c) $2\sqrt{2}x^2-4=0$.`,
              T`Without solving, compute $\Delta$ (or $Δ′$) to check that roots exist, then find the sum and product of the roots: a) $2x^2-7x+3=0$; b) $25x^2-20x+4=0$; c) $2\sqrt{2}x^2-4=0$.`)
          ]),
          tip({
            vi: T`**Tranh luận.** Bạn nói: "Không cần giải, tớ biết ngay tổng và tích hai nghiệm của phương trình $x^2-x+1=0$ đều bằng 1." Ý kiến của em thế nào? (Gợi ý: hãy kiểm tra biệt thức $\Delta$ trước.)`,
            en: T`**Discussion.** A friend says: "No need to solve, I can see at once that the sum and the product of the roots of $x^2-x+1=0$ both equal 1." What do you think? (Hint: check the discriminant $\Delta$ first.)`
          }),
          h2('2', 'Áp dụng định lí Viète để tính nhẩm nghiệm', "Using Vieta's theorem to find roots by inspection"),
          h3('Giải phương trình bậc hai khi biết một nghiệm của nó', 'Solving a quadratic equation when one root is known'),
          act('3', { vi: 'Phương trình 2x² − 7x + 5 = 0', en: 'The equation 2x² − 7x + 5 = 0' },
            T`Cho phương trình $2x^2-7x+5=0$.`,
            T`Given $2x^2-7x+5=0$.`,
            [
              it(T`Xác định các hệ số $a$, $b$, $c$ rồi tính $a+b+c$.`, T`Identify $a$, $b$, $c$ and compute $a+b+c$.`),
              it(T`Chứng tỏ rằng $x_1=1$ là một nghiệm của phương trình.`, T`Show that $x_1=1$ is a root of the equation.`),
              it(T`Dùng định lí Viète để tìm nghiệm còn lại $x_2$ của phương trình.`, T`Use Vieta's theorem to find the other root $x_2$.`)
            ]),
          act('4', { vi: 'Phương trình 3x² + 5x + 2 = 0', en: 'The equation 3x² + 5x + 2 = 0' },
            T`Cho phương trình $3x^2+5x+2=0$.`,
            T`Given $3x^2+5x+2=0$.`,
            [
              it(T`Xác định các hệ số $a$, $b$, $c$ rồi tính $a-b+c$.`, T`Identify $a$, $b$, $c$ and compute $a-b+c$.`),
              it(T`Chứng tỏ rằng $x_1=-1$ là một nghiệm của phương trình.`, T`Show that $x_1=-1$ is a root of the equation.`),
              it(T`Dùng định lí Viète để tìm nghiệm còn lại $x_2$ của phương trình.`, T`Use Vieta's theorem to find the other root $x_2$.`)
            ]),
          key([
            p(T`Xét phương trình $ax^2+bx+c=0$ ($a\ne 0$).`,
              T`Consider the equation $ax^2+bx+c=0$ ($a\ne 0$).`),
            p(T`• Nếu $a+b+c=0$ thì phương trình có một nghiệm là $x_1=1$, còn nghiệm kia là $x_2=\frac{c}{a}$.`,
              T`• If $a+b+c=0$, one root is $x_1=1$ and the other root is $x_2=\frac{c}{a}$.`),
            p(T`• Nếu $a-b+c=0$ thì phương trình có một nghiệm là $x_1=-1$, còn nghiệm kia là $x_2=-\frac{c}{a}$.`,
              T`• If $a-b+c=0$, one root is $x_1=-1$ and the other root is $x_2=-\frac{c}{a}$.`)
          ], { vi: 'Tính nhẩm nghiệm', en: 'Finding roots by inspection' })
        ]
      },

      /* ---------------------------------------------------------- Trang 23 */
      {
        number: 23,
        blocks: [
          ex(2, [
            p(T`Bằng cách nhẩm nghiệm, hãy giải các phương trình sau: a) $x^2-6x+5=0$; b) $5x^2+14x+9=0$.`,
              T`By inspection, solve: a) $x^2-6x+5=0$; b) $5x^2+14x+9=0$.`)
          ], [
            p(T`a) Ta có $a+b+c=1+(-6)+5=0$ nên phương trình có hai nghiệm: $x_1=1$, $x_2=5$.`,
              T`a) $a+b+c=1+(-6)+5=0$, so the roots are $x_1=1$, $x_2=5$.`),
            p(T`b) Ta có $a-b+c=5-14+9=0$ nên phương trình có hai nghiệm: $x_1=-1$, $x_2=-\frac{9}{5}$.`,
              T`b) $a-b+c=5-14+9=0$, so the roots are $x_1=-1$, $x_2=-\frac{9}{5}$.`)
          ]),
          ex(3, [
            p(T`Giải phương trình $x^2-7x+12=0$, biết phương trình có một nghiệm là $x_1=3$.`,
              T`Solve $x^2-7x+12=0$, given that one root is $x_1=3$.`)
          ], [
            p(T`Gọi $x_2$ là nghiệm còn lại của phương trình. Theo định lí Viète, ta có $x_1x_2=12$. Do đó $x_2=\frac{12}{x_1}=\frac{12}{3}=4$. Vậy phương trình có hai nghiệm: $x_1=3$, $x_2=4$.`,
              T`Let $x_2$ be the other root. By Vieta's theorem $x_1x_2=12$, so $x_2=\frac{12}{x_1}=\frac{12}{3}=4$. The roots are $x_1=3$, $x_2=4$.`)
          ]),
          lt(2, [
            p(T`Tính nhẩm nghiệm của các phương trình sau: a) $3x^2-11x+8=0$; b) $4x^2+15x+11=0$; c) $x^2+2\sqrt{2}x+2=0$, biết phương trình có một nghiệm là $x=-\sqrt{2}$.`,
              T`Find the roots by inspection: a) $3x^2-11x+8=0$; b) $4x^2+15x+11=0$; c) $x^2+2\sqrt{2}x+2=0$, given that one root is $x=-\sqrt{2}$.`)
          ]),
          tip({
            vi: T`**Thử thách nhỏ.** Bạn Vuông nói: "Hãy tìm một phương trình bậc hai mà tổng và tích các nghiệm của phương trình là hai số đối nhau." Bạn Tròn đáp: "Tớ tìm ra rồi! Đó là phương trình $x^2+x+1=0$." Em có đồng ý với ý kiến của Tròn không? Vì sao?`,
            en: T`**Small challenge.** One friend says: "Find a quadratic equation whose sum and product of roots are opposite numbers." Another replies: "Found it! It is $x^2+x+1=0$." Do you agree? Why (not)?`
          }),
          h2('3', 'Tìm hai số khi biết tổng và tích của chúng', 'Finding two numbers when their sum and product are known'),
          h3('Thiết lập phương trình bậc hai để tìm hai số khi biết tổng và tích của chúng', 'Setting up a quadratic equation to find two numbers from their sum and product'),
          act('5', { vi: 'Tổng S = 5 và tích P = 6', en: 'Sum S = 5 and product P = 6' },
            T`Giả sử hai số có tổng $S=5$ và tích $P=6$. Thực hiện các bước sau để lập phương trình bậc hai nhận hai số đó làm nghiệm.`,
            T`Suppose two numbers have sum $S=5$ and product $P=6$. Follow the steps to set up a quadratic equation whose roots are these two numbers.`,
            [
              it(T`Gọi một số là $x$. Tính số kia theo $x$.`, T`Call one number $x$. Express the other number in terms of $x$.`),
              it(T`Sử dụng kết quả câu a và giả thiết, hãy lập phương trình để tìm $x$.`, T`Using part a and the hypothesis, write an equation to find $x$.`)
            ]),
          key([
            p(T`Nếu hai số có tổng bằng $S$ và tích bằng $P$ thì hai số đó là hai nghiệm của phương trình bậc hai`,
              T`If two numbers have sum $S$ and product $P$, they are the two roots of the quadratic equation`),
            m(T`x^2-Sx+P=0.`),
            p(T`Điều kiện để có hai số đó là $S^2-4P\ge 0$.`,
              T`Such numbers exist if and only if $S^2-4P\ge 0$.`)
          ], { vi: 'Tìm hai số khi biết tổng và tích', en: 'Two numbers from their sum and product' })
        ]
      },

      /* ---------------------------------------------------------- Trang 24 */
      {
        number: 24,
        blocks: [
          ex(4, [
            p(T`Tìm hai số biết tổng của chúng bằng 9, tích của chúng bằng 20.`,
              T`Find two numbers whose sum is 9 and whose product is 20.`)
          ], [
            p(T`Hai số cần tìm là hai nghiệm của phương trình $x^2-9x+20=0$. Ta có $\Delta=(-9)^2-4\cdot 1\cdot 20=1$; $\sqrt{\Delta}=1$.`,
              T`The two numbers are the roots of $x^2-9x+20=0$. Here $\Delta=(-9)^2-4\cdot 1\cdot 20=1$ and $\sqrt{\Delta}=1$.`),
            p(T`Suy ra phương trình có hai nghiệm: $x_1=\frac{9-1}{2}=4$; $x_2=\frac{9+1}{2}=5$. Vậy hai số cần tìm là 4 và 5.`,
              T`So the roots are $x_1=\frac{9-1}{2}=4$ and $x_2=\frac{9+1}{2}=5$. The two numbers are 4 and 5.`)
          ]),
          lt(3, [
            p(T`Tìm hai số biết tổng của chúng bằng $-11$, tích của chúng bằng 28.`,
              T`Find two numbers whose sum is $-11$ and whose product is 28.`)
          ]),
          vd(4, [
            p(T`Giải bài toán trong tình huống mở đầu. (Gợi ý: nửa chu vi là 20 m, diện tích là 96 m², nên chiều dài và chiều rộng là hai nghiệm của $x^2-20x+96=0$; đó là 12 m và 8 m.)`,
              T`Solve the opening problem. (Hint: the semi-perimeter is 20 m and the area 96 m², so the length and width are the roots of $x^2-20x+96=0$, namely 12 m and 8 m.)`)
          ]),
          head('practice', 'Bài tập', 'Exercises'),
          bt('6.23', T`Không giải phương trình, hãy tính tổng và tích các nghiệm (nếu có) của các phương trình sau: a) $x^2-12x+8=0$; b) $2x^2+11x-5=0$; c) $3x^2-10=0$; d) $x^2-x+3=0$.`,
            T`Without solving, find the sum and product of the roots (if any) of: a) $x^2-12x+8=0$; b) $2x^2+11x-5=0$; c) $3x^2-10=0$; d) $x^2-x+3=0$.`),
          bt('6.24', T`Tính nhẩm nghiệm của các phương trình sau: a) $2x^2-9x+7=0$; b) $3x^2+11x+8=0$; c) $7x^2-15x+2=0$, biết phương trình có một nghiệm $x_1=2$.`,
            T`Find the roots by inspection: a) $2x^2-9x+7=0$; b) $3x^2+11x+8=0$; c) $7x^2-15x+2=0$, given that one root is $x_1=2$.`),
          bt('6.25', T`Tìm hai số $u$ và $v$, biết: a) $u+v=20$, $uv=99$; b) $u+v=2$, $uv=15$.`,
            T`Find two numbers $u$ and $v$ such that: a) $u+v=20$, $uv=99$; b) $u+v=2$, $uv=15$.`),
          bt('6.26', T`Chứng tỏ rằng nếu phương trình bậc hai $ax^2+bx+c=0$ có hai nghiệm là $x_1$ và $x_2$ thì đa thức $ax^2+bx+c$ phân tích được thành nhân tử như sau: $ax^2+bx+c=a(x-x_1)(x-x_2)$. Áp dụng: phân tích các đa thức sau thành nhân tử: a) $x^2+11x+18$; b) $3x^2+5x-2$.`,
            T`Show that if $ax^2+bx+c=0$ has roots $x_1$ and $x_2$, then the polynomial factorises as $ax^2+bx+c=a(x-x_1)(x-x_2)$. Application: {factorise|factorise} a) $x^2+11x+18$; b) $3x^2+5x-2$.`),
          bt('6.27', T`Một bể bơi hình chữ nhật có diện tích 300 m² và chu vi là 74 m. Tính các kích thước của bể bơi này.`,
            T`A rectangular swimming pool has area 300 m² and perimeter 74 m. Find its dimensions.`)
        ]
      }
    ]
  };
})();
