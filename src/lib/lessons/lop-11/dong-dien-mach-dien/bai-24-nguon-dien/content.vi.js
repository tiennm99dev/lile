/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nguồn điện tạo ra và duy trì hiệu điện thế giữa hai cực nhờ lực lạ bên trong nguồn. Suất điện động ℰ = A/q đặc trưng cho khả năng thực hiện công của lực lạ, đơn vị vôn (V). Nguồn có điện trở trong r, nên khi có dòng điện I, hiệu điện thế giữa hai cực là U = ℰ − Ir, nhỏ hơn suất điện động. Định luật Ohm cho toàn mạch: I = ℰ/(R + r); khi đoản mạch (R ≈ 0) dòng điện I = ℰ/r rất lớn.',
  intro:
    'Một viên pin ghi $1{,}5$ V. Đo bằng vôn kế khi pin chưa nối vào mạch, kim chỉ đúng khoảng $1{,}5$ V; nhưng khi pin đang làm sáng một bóng đèn, vôn kế chỉ thấp hơn, và đèn càng “ăn” nhiều dòng điện thì số chỉ càng tụt. Phần hiệu điện thế bị mất đi ở đâu?',
  objectives: [
    'Nêu được nguồn điện có tác dụng tạo ra và duy trì hiệu điện thế nhờ lực lạ.',
    'Định nghĩa được suất điện động $\\mathscr{E} = \\dfrac{A}{q}$ và đơn vị của nó.',
    'Nêu được ảnh hưởng của điện trở trong: $U = \\mathscr{E} - Ir$.',
    'Vận dụng được định luật Ohm cho toàn mạch $I = \\dfrac{\\mathscr{E}}{R + r}$; giải thích được hiện tượng đoản mạch.',
  ],
  sections: [
    {
      heading: 'Nguồn điện',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Nguồn điện',
          text: 'Nguồn điện là thiết bị để tạo ra và duy trì hiệu điện thế giữa hai cực, nhằm duy trì dòng điện trong mạch. Nguồn điện có hai cực: cực dương $(+)$ và cực âm $(-)$.',
        },
        {
          type: 'p',
          text: 'Bên trong nguồn điện có các lực bản chất không phải lực điện, gọi là lực lạ. Lực lạ tách electron khỏi nguyên tử rồi đưa electron về cực âm, để lại cực dương thiếu electron. Nhờ đó giữa hai cực luôn có một hiệu điện thế, kể cả khi dòng điện đang chạy ở mạch ngoài.',
        },
        {
          type: 'list',
          items: [
            'Pin, acquy: lực lạ là lực hoá học (năng lượng hoá học chuyển thành điện năng).',
            'Máy phát điện: lực lạ là lực từ tác dụng lên electron trong dây dẫn chuyển động.',
            'Pin mặt trời: năng lượng ánh sáng giải phóng electron.',
          ],
        },
        {
          type: 'p',
          text: 'Ở mạch ngoài, các điện tích dương dịch chuyển từ cực dương sang cực âm dưới tác dụng của lực điện. Bên trong nguồn, lực lạ phải thực hiện công để đưa các điện tích dương ngược chiều điện trường, từ cực âm về cực dương, khép kín dòng điện.',
        },
      ],
    },
    {
      heading: 'Suất điện động',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Suất điện động',
          text: 'Suất điện động $\\mathscr{E}$ của nguồn điện là đại lượng đặc trưng cho khả năng thực hiện công của lực lạ bên trong nguồn điện, đo bằng thương số giữa công $A$ của lực lạ làm dịch chuyển điện tích dương $q$ ngược chiều điện trường bên trong nguồn và độ lớn của điện tích đó: $$\\mathscr{E} = \\dfrac{A}{q}.$$ Đơn vị của suất điện động là vôn (V): $1$ V $= 1$ J/C.',
        },
        {
          type: 'p',
          text: 'Số vôn ghi trên mỗi nguồn điện (pin $1{,}5$ V, acquy $12$ V…) cho biết suất điện động của nguồn. Suất điện động bằng hiệu điện thế giữa hai cực của nguồn khi mạch hở (không có dòng điện chạy qua nguồn).',
        },
        { type: 'tex', tex: 'A = \\mathscr{E}q' },
      ],
    },
    {
      heading: 'Điện trở trong và định luật Ohm cho toàn mạch',
      blocks: [
        {
          type: 'p',
          text: 'Nguồn điện cũng là một vật dẫn: dòng điện chạy bên trong nguồn cũng bị cản trở. Điện trở của nguồn điện gọi là điện trở trong, kí hiệu $r$. Trên sơ đồ, nguồn có điện trở trong được vẽ như một nguồn lí tưởng nối tiếp với điện trở $r$.',
        },
        {
          type: 'p',
          text: 'Xét mạch kín gồm nguồn $(\\mathscr{E}, r)$ và mạch ngoài có điện trở $R$. Theo định luật bảo toàn năng lượng, công của nguồn bằng tổng nhiệt toả ra ở mạch ngoài và bên trong nguồn: $\\mathscr{E}It = RI^2t + rI^2t$, nên $\\mathscr{E} = IR + Ir$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định luật Ohm cho toàn mạch',
          text: 'Cường độ dòng điện chạy trong mạch kín tỉ lệ thuận với suất điện động của nguồn và tỉ lệ nghịch với điện trở toàn phần của mạch: $$I = \\dfrac{\\mathscr{E}}{R + r}.$$ Hiệu điện thế giữa hai cực của nguồn (cũng là hiệu điện thế mạch ngoài) là $$U = IR = \\mathscr{E} - Ir.$$',
        },
        {
          type: 'p',
          text: 'Như vậy khi nguồn đang cho dòng điện, hiệu điện thế giữa hai cực luôn nhỏ hơn suất điện động một lượng $Ir$ (độ giảm thế bên trong nguồn). Giảm $R$ thì $I$ tăng và $U$ giảm. Đồ thị $U$ theo $I$ là một đoạn thẳng đi xuống, cắt trục $U$ tại $\\mathscr{E}$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đoản mạch',
          text: 'Nếu nối hai cực của nguồn bằng một dây có điện trở rất nhỏ ($R \\approx 0$) thì xảy ra đoản mạch: $I = \\dfrac{\\mathscr{E}}{r}$ rất lớn. Pin, acquy bị đoản mạch nhanh hỏng; với mạng điện gia đình, đoản mạch có thể gây cháy, vì vậy cần dùng cầu chì hoặc aptomat.',
        },
      ],
    },
  ],
  explore: {
    title: 'Pin có điện trở trong',
    instruction:
      'Chỉnh suất điện động $\\mathscr{E}$, điện trở trong $r$ và điện trở mạch ngoài $R$. Quan sát số chỉ ampe kế, vôn kế và thanh chia $\\mathscr{E} = U + Ir$. Giảm dần $R$: dòng điện và hiệu điện thế giữa hai cực thay đổi thế nào?',
  },
  examples: [
    {
      problem:
        'Một acquy có suất điện động $12$ V. Tính công của lực lạ khi dịch chuyển điện tích $5$ C bên trong acquy từ cực âm tới cực dương.',
      steps: [
        'Từ $\\mathscr{E} = \\dfrac{A}{q}$ suy ra $A = \\mathscr{E}q$.',
        '$A = 12 \\cdot 5 = 60$ J.',
      ],
      answer: '$A = 60$ J.',
    },
    {
      problem:
        'Nguồn điện có $\\mathscr{E} = 12$ V, $r = 1$ Ω, mạch ngoài là điện trở $R = 5$ Ω. Tính cường độ dòng điện, hiệu điện thế giữa hai cực của nguồn và độ giảm thế bên trong nguồn.',
      steps: [
        '$I = \\dfrac{\\mathscr{E}}{R + r} = \\dfrac{12}{5 + 1} = 2$ A.',
        '$U = IR = 2 \\cdot 5 = 10$ V.',
        'Độ giảm thế trong nguồn: $Ir = 2 \\cdot 1 = 2$ V. Kiểm tra: $U + Ir = 10 + 2 = 12$ V $= \\mathscr{E}$.',
      ],
      answer: '$I = 2$ A; $U = 10$ V; $Ir = 2$ V.',
    },
    {
      problem:
        'Mắc một nguồn điện với điện trở $R_1 = 2$ Ω thì dòng điện là $1$ A; thay bằng $R_2 = 5$ Ω thì dòng điện là $0{,}5$ A. Tìm suất điện động và điện trở trong của nguồn.',
      steps: [
        'Định luật Ohm cho toàn mạch: $\\mathscr{E} = I_1(R_1 + r) = I_2(R_2 + r)$.',
        '$1 \\cdot (2 + r) = 0{,}5 \\cdot (5 + r) \\Rightarrow 2 + r = 2{,}5 + 0{,}5r \\Rightarrow r = 1$ Ω.',
        '$\\mathscr{E} = 1 \\cdot (2 + 1) = 3$ V.',
      ],
      answer: '$\\mathscr{E} = 3$ V; $r = 1$ Ω.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Nguồn điện là thiết bị',
      options: [
        'tạo ra và duy trì hiệu điện thế giữa hai cực để duy trì dòng điện trong mạch',
        'tạo ra các điện tích mới cho mạch điện',
        'chỉ tích trữ điện tích, không thực hiện công',
        'làm giảm điện trở của mạch ngoài',
      ],
      answer: 0,
      hints: ['Điện tích không tự sinh ra; nguồn điện làm gì để dòng điện chạy mãi?'],
      solution:
        'Nguồn điện tạo ra và duy trì hiệu điện thế giữa hai cực nhờ lực lạ, nhờ đó duy trì dòng điện. Nó không tạo ra điện tích mới.',
    },
    {
      type: 'number',
      prompt:
        'Lực lạ thực hiện công $2{,}7$ J khi dịch chuyển điện tích $1{,}8$ C từ cực âm tới cực dương bên trong một nguồn điện. Tính suất điện động của nguồn (theo V).',
      answer: 1.5,
      unit: 'V',
      tolerance: 0.001,
      hints: ['Dùng $\\mathscr{E} = \\dfrac{A}{q}$.'],
      solution: '$\\mathscr{E} = \\dfrac{2{,}7}{1{,}8} = 1{,}5$ V.',
    },
    {
      type: 'number',
      prompt:
        'Nguồn điện có $\\mathscr{E} = 12$ V, $r = 1$ Ω mắc với điện trở $R = 5$ Ω. Tính cường độ dòng điện trong mạch (theo A).',
      answer: 2,
      unit: 'A',
      tolerance: 0.001,
      hints: ['Định luật Ohm cho toàn mạch: $I = \\dfrac{\\mathscr{E}}{R + r}$.'],
      solution: '$I = \\dfrac{12}{5 + 1} = 2$ A.',
    },
    {
      type: 'number',
      prompt:
        'Một pin có $\\mathscr{E} = 1{,}5$ V, $r = 0{,}5$ Ω mắc với bóng đèn có điện trở $2{,}5$ Ω. Tính hiệu điện thế giữa hai cực của pin (theo V).',
      answer: 1.25,
      unit: 'V',
      tolerance: 0.001,
      hints: ['Tính $I$ trước, rồi $U = IR$ hoặc $U = \\mathscr{E} - Ir$.'],
      solution:
        '$I = \\dfrac{1{,}5}{2{,}5 + 0{,}5} = 0{,}5$ A; $U = \\mathscr{E} - Ir = 1{,}5 - 0{,}5 \\cdot 0{,}5 = 1{,}25$ V ($= IR = 0{,}5 \\cdot 2{,}5$).',
    },
    {
      type: 'number',
      prompt:
        'Pin ở câu trên ($\\mathscr{E} = 1{,}5$ V, $r = 0{,}5$ Ω) bị nối tắt hai cực bằng một dây dẫn có điện trở không đáng kể. Tính cường độ dòng điện đoản mạch (theo A).',
      answer: 3,
      unit: 'A',
      tolerance: 0.001,
      hints: ['Đoản mạch: $R \\approx 0$.'],
      solution: '$I = \\dfrac{\\mathscr{E}}{r} = \\dfrac{1{,}5}{0{,}5} = 3$ A.',
    },
    {
      type: 'choice',
      prompt:
        'Một nguồn điện có điện trở trong khác $0$ được mắc với biến trở. Giảm giá trị biến trở thì',
      options: [
        'cường độ dòng điện tăng, hiệu điện thế giữa hai cực nguồn giảm',
        'cường độ dòng điện tăng, hiệu điện thế giữa hai cực nguồn tăng',
        'cường độ dòng điện giảm, hiệu điện thế giữa hai cực nguồn tăng',
        'cường độ dòng điện và hiệu điện thế giữa hai cực đều không đổi',
      ],
      answer: 0,
      hints: ['Dùng $I = \\dfrac{\\mathscr{E}}{R + r}$ rồi $U = \\mathscr{E} - Ir$.'],
      solution:
        '$R$ giảm thì $R + r$ giảm nên $I$ tăng; khi đó độ giảm thế trong nguồn $Ir$ tăng nên $U = \\mathscr{E} - Ir$ giảm.',
    },
    {
      type: 'number',
      prompt:
        'Đo một pin: khi dòng điện là $0{,}2$ A thì hiệu điện thế giữa hai cực là $1{,}4$ V; khi dòng điện là $0{,}4$ A thì hiệu điện thế là $1{,}3$ V. Tính điện trở trong của pin (theo Ω).',
      answer: 0.5,
      unit: 'Ω',
      tolerance: 0.001,
      hints: [
        'Viết $U = \\mathscr{E} - Ir$ cho cả hai lần đo.',
        'Trừ hai phương trình để khử $\\mathscr{E}$.',
      ],
      solution:
        '$1{,}4 = \\mathscr{E} - 0{,}2r$ và $1{,}3 = \\mathscr{E} - 0{,}4r$. Trừ vế: $0{,}1 = 0{,}2r$ nên $r = 0{,}5$ Ω (và $\\mathscr{E} = 1{,}4 + 0{,}1 = 1{,}5$ V).',
    },
    {
      type: 'number',
      prompt:
        'Nguồn điện có $\\mathscr{E} = 9$ V, $r = 1$ Ω; mạch ngoài gồm $R_1 = 3$ Ω mắc nối tiếp với $R_2 = 5$ Ω. Tính hiệu điện thế giữa hai đầu $R_2$ (theo V).',
      answer: 5,
      unit: 'V',
      tolerance: 0.001,
      hints: [
        'Điện trở mạch ngoài $R = R_1 + R_2$.',
        'Tính $I = \\dfrac{\\mathscr{E}}{R + r}$ rồi $U_2 = IR_2$.',
      ],
      solution: '$R = 3 + 5 = 8$ Ω; $I = \\dfrac{9}{8 + 1} = 1$ A; $U_2 = 1 \\cdot 5 = 5$ V.',
    },
    {
      type: 'choice',
      prompt: 'Số $1{,}5$ V ghi trên một viên pin cho biết',
      options: [
        'suất điện động của pin, bằng hiệu điện thế giữa hai cực khi mạch hở',
        'hiệu điện thế giữa hai cực của pin trong mọi mạch điện',
        'điện trở trong của pin',
        'cường độ dòng điện lớn nhất pin cho được',
      ],
      answer: 0,
      hints: ['Khi pin đang cho dòng điện $I$, hiệu điện thế giữa hai cực là $\\mathscr{E} - Ir$.'],
      solution:
        'Số vôn ghi trên nguồn là suất điện động. Chỉ khi mạch hở ($I = 0$) thì hiệu điện thế giữa hai cực mới bằng $\\mathscr{E}$; khi có dòng điện, $U = \\mathscr{E} - Ir < \\mathscr{E}$.',
    },
  ],
  takeaways: [
    'Nguồn điện tạo ra và duy trì hiệu điện thế giữa hai cực nhờ lực lạ bên trong nguồn.',
    'Suất điện động $\\mathscr{E} = \\dfrac{A}{q}$, đơn vị vôn; bằng hiệu điện thế giữa hai cực khi mạch hở.',
    'Định luật Ohm cho toàn mạch: $I = \\dfrac{\\mathscr{E}}{R + r}$; hiệu điện thế mạch ngoài $U = IR = \\mathscr{E} - Ir$.',
    'Đoản mạch ($R \\approx 0$): $I = \\dfrac{\\mathscr{E}}{r}$ rất lớn, nguy hiểm cho nguồn và mạch điện.',
  ],
};
