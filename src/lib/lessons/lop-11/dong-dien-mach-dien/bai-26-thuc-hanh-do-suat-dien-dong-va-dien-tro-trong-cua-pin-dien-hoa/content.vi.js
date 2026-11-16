/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hành đo suất điện động và điện trở trong của pin điện hoá bằng phép đo gián tiếp: mắc pin nối tiếp với điện trở bảo vệ R0, biến trở, ampe kế và khoá K, vôn kế mắc giữa hai cực pin. Thay đổi biến trở, ghi các cặp (I, U), vẽ đồ thị U theo I: đó là đường thẳng U = ℰ − Ir. Kéo dài đường thẳng cắt trục U tại I = 0 cho ℰ; độ dốc của đường thẳng cho r.',
  intro:
    'Pin dùng lâu thì đèn pin sáng yếu dần, dù vôn kế đo hai cực pin khi để riêng vẫn chỉ gần $1{,}5$ V. Nguyên nhân là pin cũ có điện trở trong lớn hơn. Làm thế nào đo được điện trở trong, một đại lượng nằm “bên trong” pin, mà không thể dùng ôm kế đo trực tiếp?',
  objectives: [
    'Thiết kế được phương án đo gián tiếp suất điện động và điện trở trong của pin dựa vào $U = \\mathscr{E} - Ir$.',
    'Lắp được mạch điện, đo được các cặp giá trị $U$, $I$ khi thay đổi biến trở.',
    'Vẽ được đồ thị $U$ theo $I$, từ đó xác định được $\\mathscr{E}$ và $r$, đánh giá được sai số.',
  ],
  sections: [
    {
      heading: 'Cơ sở lí thuyết và dụng cụ',
      blocks: [
        {
          type: 'p',
          text: 'Không thể đo trực tiếp $\\mathscr{E}$ và $r$ bằng đồng hồ đo điện: vôn kế mắc vào hai cực pin vẫn có dòng điện nhỏ chạy qua pin nên chỉ cho $U = \\mathscr{E} - Ir$; còn ôm kế không đo được điện trở của một vật đang là nguồn điện. Vì vậy ta đo gián tiếp qua các cặp giá trị $U$, $I$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cơ sở của phép đo',
          text: 'Pin có suất điện động $\\mathscr{E}$, điện trở trong $r$ cho dòng điện $I$ thì hiệu điện thế giữa hai cực là $$U = \\mathscr{E} - Ir.$$ Đồ thị $U$ theo $I$ là đường thẳng: cắt trục $U$ (ứng với $I = 0$) tại $U_0 = \\mathscr{E}$; độ dốc cho $r = \\dfrac{U_M - U_N}{I_N - I_M}$ với hai điểm $M$, $N$ bất kì trên đường thẳng.',
        },
        {
          type: 'table',
          caption: 'Dụng cụ cho mỗi nhóm',
          head: ['Dụng cụ', 'Ghi chú'],
          rows: [
            ['Pin điện hoá loại $1{,}5$ V', 'Một pin mới và một pin cũ, đặt trong đế pin'],
            ['Biến trở $R$', 'Khoảng $0$ – $100$ Ω'],
            ['Điện trở bảo vệ $R_0$', 'Khoảng $20$ Ω, giữ dòng điện qua pin không quá $100$ mA'],
            [
              'Hai đồng hồ đo điện đa năng',
              'Một dùng làm ampe kế (thang mA), một làm vôn kế (thang $2$ V hoặc $20$ V một chiều)',
            ],
            ['Khoá K, dây nối', 'Ngắt mạch giữa các lần đo'],
          ],
        },
        {
          type: 'p',
          text: 'Sơ đồ: pin, điện trở bảo vệ $R_0$, biến trở $R$, ampe kế và khoá K mắc nối tiếp thành mạch kín; vôn kế mắc song song giữa hai cực của pin. Điện trở bảo vệ tránh cho dòng điện quá lớn (gần như đoản mạch) khi biến trở được chỉnh về $0$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lưu ý an toàn và độ chính xác',
          text: 'Kiểm tra cực của đồng hồ và chọn đúng thang đo trước khi đóng mạch. Chỉ đóng khoá K trong lúc đọc số chỉ rồi ngắt ngay: để mạch kín lâu, pin bị nóng và phân cực, $\\mathscr{E}$ và $r$ thay đổi làm kết quả sai lệch.',
        },
      ],
    },
    {
      heading: 'Tiến hành thí nghiệm và báo cáo',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: xác định suất điện động $\\mathscr{E}$ và điện trở trong $r$ của một pin cũ và một pin mới, rồi so sánh hai pin.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Lắp mạch theo sơ đồ, khoá K mở. Đặt biến trở ở giá trị lớn nhất, khoảng $100$ Ω.',
            'Đóng khoá K, đọc số chỉ $I$ của ampe kế và $U$ của vôn kế, ghi vào bảng rồi ngắt khoá K.',
            'Giảm giá trị biến trở (ví dụ mỗi lần $10$ – $20$ Ω), lặp lại bước 2 để có ít nhất $5$ cặp $(I, U)$.',
            'Vẽ các điểm $(I, U)$ lên hệ trục, kẻ đường thẳng đi gần các điểm nhất và kéo dài cắt trục $U$ tại $U_0$: $\\mathscr{E} = U_0$.',
            'Chọn hai điểm $M$, $N$ cách xa nhau trên đường thẳng, tính $r = \\dfrac{U_M - U_N}{I_N - I_M}$.',
            'Làm lại với pin còn lại.',
          ],
        },
        {
          type: 'table',
          caption: 'Bảng kết quả (pin …, $R_0 = \\ldots$ Ω)',
          head: ['Lần đo', '$R$ (Ω)', '$I$ (mA)', '$U$ (V)'],
          rows: [
            ['$1$', '$100$', '...', '...'],
            ['$2$', '...', '...', '...'],
            ['$3$', '...', '...', '...'],
            ['$4$', '...', '...', '...'],
            ['$5$', '...', '...', '...'],
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: dán bảng số liệu và đồ thị $U$ theo $I$ của hai pin; ghi $\\mathscr{E}$, $r$ của từng pin. Ước lượng sai số từ đồ thị: vẽ thêm hai đường thẳng dốc nhất và thoải nhất còn đi qua vùng các điểm đo; nửa hiệu các giá trị đọc được cho $\\Delta\\mathscr{E}$ và $\\Delta r$. Viết kết quả $\\mathscr{E} = \\overline{\\mathscr{E}} \\pm \\Delta\\mathscr{E}$, $r = \\overline{r} \\pm \\Delta r$. Nhận xét: pin cũ khác pin mới thế nào? Nêu các nguyên nhân sai số.',
        },
        {
          type: 'p',
          text: 'Ở phần Khám phá có một bàn thí nghiệm ảo với pin mới hoặc pin cũ có $\\mathscr{E}$, $r$ chưa biết. Em chỉnh biến trở, ghi số liệu, đọc $\\mathscr{E}$ và $r$ từ đồ thị rồi nhập để kiểm tra.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bàn thí nghiệm đo pin',
    instruction:
      'Chọn pin mới hoặc pin cũ. Đặt biến trở, bấm “Đóng K, đọc số chỉ rồi ngắt” để ghi một cặp $(I, U)$; đo ít nhất $5$ giá trị biến trở khác nhau. Đường thẳng xanh là đường đi gần các điểm đo nhất. Đọc $\\mathscr{E}$ tại chỗ đường thẳng cắt trục $U$, tính $r$ từ hai điểm trên đường thẳng, nhập rồi bấm Kiểm tra.',
  },
  examples: [
    {
      problem:
        'Một nhóm vẽ được đồ thị $U$ theo $I$ của một pin là đường thẳng đi qua hai điểm $M(24$ mA; $1{,}44$ V$)$ và $N(64$ mA; $1{,}34$ V$)$. Tính điện trở trong và suất điện động của pin.',
      steps: [
        'Đổi $I_M = 0{,}024$ A, $I_N = 0{,}064$ A.',
        '$r = \\dfrac{U_M - U_N}{I_N - I_M} = \\dfrac{1{,}44 - 1{,}34}{0{,}064 - 0{,}024} = \\dfrac{0{,}10}{0{,}040} = 2{,}5$ Ω.',
        'Từ $U_M = \\mathscr{E} - I_Mr$: $\\mathscr{E} = 1{,}44 + 0{,}024 \\cdot 2{,}5 = 1{,}50$ V. Đó cũng là chỗ đường thẳng cắt trục $U$.',
      ],
      answer: '$r = 2{,}5$ Ω; $\\mathscr{E} = 1{,}50$ V.',
    },
    {
      problem:
        'Với pin ở ví dụ trên và điện trở bảo vệ $R_0 = 20$ Ω, khi biến trở được chỉnh về $0$ thì ampe kế chỉ bao nhiêu? Nếu không có $R_0$ thì sao?',
      steps: [
        'Có $R_0$: $I = \\dfrac{\\mathscr{E}}{R_0 + r} = \\dfrac{1{,}5}{20 + 2{,}5} \\approx 0{,}067$ A $= 67$ mA, dưới $100$ mA.',
        'Không có $R_0$ (bỏ qua điện trở ampe kế và dây nối): $I = \\dfrac{\\mathscr{E}}{r} = \\dfrac{1{,}5}{2{,}5} = 0{,}6$ A: gần như đoản mạch, pin nóng và nhanh hỏng.',
      ],
      answer: 'Khoảng $67$ mA khi có $R_0$; khoảng $0{,}6$ A nếu bỏ $R_0$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trong mạch đo, điện trở bảo vệ $R_0$ được mắc nối tiếp với pin để',
      options: [
        'hạn chế dòng điện qua pin khi biến trở được chỉnh về giá trị nhỏ',
        'làm tăng suất điện động của pin',
        'đo điện trở trong của pin trực tiếp',
        'làm cho vôn kế chỉ đúng suất điện động',
      ],
      answer: 0,
      hints: ['Chuyện gì xảy ra nếu biến trở bằng $0$ và mạch không có $R_0$?'],
      solution:
        'Khi $R = 0$, nếu không có $R_0$ thì mạch gần như đoản mạch, $I = \\dfrac{\\mathscr{E}}{r}$ rất lớn. $R_0$ giữ dòng điện nhỏ (dưới $100$ mA), bảo vệ pin và đồng hồ.',
    },
    {
      type: 'number',
      prompt:
        'Đồ thị $U$ theo $I$ của một pin đi qua hai điểm ($20$ mA; $1{,}40$ V) và ($60$ mA; $1{,}28$ V). Tính điện trở trong của pin (theo Ω).',
      answer: 3,
      unit: 'Ω',
      tolerance: 0.01,
      hints: ['Đổi mA ra A.', '$r = \\dfrac{U_M - U_N}{I_N - I_M}$.'],
      solution:
        '$r = \\dfrac{1{,}40 - 1{,}28}{0{,}060 - 0{,}020} = \\dfrac{0{,}12}{0{,}04} = 3$ Ω.',
    },
    {
      type: 'number',
      prompt: 'Với pin ở câu trên, tính suất điện động của pin (theo V).',
      answer: 1.46,
      unit: 'V',
      tolerance: 0.005,
      hints: ['Dùng $U = \\mathscr{E} - Ir$ với một điểm và $r$ vừa tìm.'],
      solution: '$\\mathscr{E} = U + Ir = 1{,}40 + 0{,}020 \\cdot 3 = 1{,}46$ V.',
    },
    {
      type: 'number',
      prompt:
        'Kéo dài đồ thị $U$ theo $I$ của một pin, đường thẳng cắt trục $U$ tại $1{,}5$ V và cắt trục $I$ (ứng với $U = 0$) tại $0{,}5$ A. Tính điện trở trong của pin (theo Ω).',
      answer: 3,
      unit: 'Ω',
      tolerance: 0.01,
      hints: ['Tại $U = 0$: $0 = \\mathscr{E} - I_mr$.'],
      solution:
        'Cắt trục $U$ cho $\\mathscr{E} = 1{,}5$ V. Tại $U = 0$: $r = \\dfrac{\\mathscr{E}}{I_m} = \\dfrac{1{,}5}{0{,}5} = 3$ Ω.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao trong khi làm thí nghiệm không nên đóng khoá K trong thời gian dài?',
      options: [
        'Vì pin bị nóng và phân cực, suất điện động và điện trở trong thay đổi làm kết quả sai lệch',
        'Vì ampe kế sẽ chỉ số âm',
        'Vì điện trở bảo vệ sẽ bị mất tác dụng',
        'Vì vôn kế cần mạch hở mới chỉ được số',
      ],
      answer: 0,
      hints: ['Pin cho dòng điện liên tục thì bên trong pin xảy ra điều gì?'],
      solution:
        'Dòng điện kéo dài làm pin nóng lên và bị phân cực, $\\mathscr{E}$ và $r$ thay đổi trong lúc đo, các cặp số liệu không còn ứng với cùng một pin; pin cũng nhanh hết.',
    },
    {
      type: 'choice',
      prompt:
        'So với đồ thị $U$ theo $I$ của một pin mới cùng loại, đồ thị của pin đã dùng lâu thường',
      options: [
        'dốc hơn và cắt trục $U$ ở giá trị thấp hơn',
        'thoải hơn và cắt trục $U$ ở giá trị cao hơn',
        'song song và trùng với đồ thị của pin mới',
        'là đường cong đi lên',
      ],
      answer: 0,
      hints: [
        'Pin cũ có $\\mathscr{E}$ và $r$ thay đổi thế nào? Độ dốc của đồ thị ứng với đại lượng nào?',
      ],
      solution:
        'Pin cũ có suất điện động nhỏ hơn (cắt trục $U$ thấp hơn) và điện trở trong lớn hơn (đường thẳng dốc hơn, vì độ dốc bằng $r$).',
    },
    {
      type: 'choice',
      prompt: 'Có thể dùng vôn kế mắc vào hai cực của pin để đo chính xác suất điện động không?',
      options: [
        'Chỉ gần đúng: vẫn có dòng điện nhỏ qua vôn kế nên số chỉ là $\\mathscr{E} - Ir$, hơi nhỏ hơn $\\mathscr{E}$',
        'Được, vôn kế luôn chỉ đúng $\\mathscr{E}$',
        'Không, vôn kế chỉ đo được điện trở trong',
        'Được, nhưng chỉ khi mắc thêm biến trở song song với vôn kế',
      ],
      answer: 0,
      hints: ['Vôn kế có điện trở rất lớn nhưng không phải vô cùng lớn.'],
      solution:
        'Vôn kế có điện trở lớn nhưng hữu hạn nên vẫn có dòng điện nhỏ $I$ qua pin; số chỉ $U = \\mathscr{E} - Ir$ chỉ gần bằng $\\mathscr{E}$. Vì thế ta xác định $\\mathscr{E}$ bằng cách kéo dài đồ thị tới $I = 0$.',
    },
  ],
  takeaways: [
    'Đo gián tiếp $\\mathscr{E}$ và $r$ nhờ $U = \\mathscr{E} - Ir$: đo nhiều cặp $(I, U)$ khi thay đổi biến trở.',
    'Mạch đo: pin, $R_0$, biến trở, ampe kế, khoá K nối tiếp; vôn kế mắc giữa hai cực pin; chỉ đóng K khi đọc số chỉ.',
    'Đồ thị $U$ theo $I$ là đường thẳng: cắt trục $U$ tại $\\mathscr{E}$, độ dốc $r = \\dfrac{U_M - U_N}{I_N - I_M}$.',
    'Pin cũ có suất điện động nhỏ hơn và điện trở trong lớn hơn pin mới.',
  ],
};
