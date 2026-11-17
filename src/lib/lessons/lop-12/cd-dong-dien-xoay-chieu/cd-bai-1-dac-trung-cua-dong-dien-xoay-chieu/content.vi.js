/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Dòng điện xoay chiều hình sin được đặc trưng bởi giá trị tức thời, giá trị cực đại, giá trị hiệu dụng (bằng giá trị cực đại chia căn hai), chu kì, tần số và độ lệch pha giữa điện áp và cường độ dòng điện.',
  intro:
    'Ổ cắm điện trong nhà ghi "220 V – 50 Hz". Con số 220 V có phải là điện áp lớn nhất giữa hai lỗ cắm không? 50 Hz cho biết điều gì về dòng điện chạy qua bóng đèn? Bài này giúp em đọc đúng các đại lượng đặc trưng của dòng điện xoay chiều, đo chúng bằng đồng hồ đo điện đa năng và tính công suất toả nhiệt của dòng điện xoay chiều.',
  objectives: [
    'Viết được biểu thức của điện áp và cường độ dòng điện xoay chiều hình sin, nêu được ý nghĩa của giá trị tức thời, giá trị cực đại, pha ban đầu.',
    'Nêu được định nghĩa giá trị hiệu dụng và so sánh được giá trị hiệu dụng với giá trị cực đại.',
    'Tính được chu kì, tần số, độ lệch pha; đọc được các đại lượng này từ đồ thị.',
    'Nêu được công suất toả nhiệt trung bình trên điện trở bằng một nửa công suất cực đại.',
    'Thiết kế và thực hiện được phương án đo tần số, điện áp xoay chiều bằng đồng hồ đo điện đa năng.',
  ],
  sections: [
    {
      heading: 'Điện áp và cường độ dòng điện xoay chiều',
      blocks: [
        {
          type: 'p',
          text: 'Khi khung dây phẳng diện tích $S$ quay đều với tốc độ góc $\\omega$ trong từ trường đều $\\vec{B}$, từ thông qua khung là $\\Phi = BS\\cos(\\omega t + \\varphi_0)$. Theo định luật Faraday, trong khung xuất hiện suất điện động cảm ứng biến thiên điều hoà:',
        },
        {
          type: 'tex',
          tex: 'e = -\\dfrac{\\mathrm{d}\\Phi}{\\mathrm{d}t} = E_0\\cos(\\omega t + \\varphi_e),\\qquad E_0 = \\omega BS',
        },
        {
          type: 'p',
          text: 'Nối hai đầu khung với mạch ngoài, giữa hai đầu đoạn mạch có điện áp xoay chiều và trong mạch có dòng điện xoay chiều cùng tần số góc $\\omega$:',
        },
        {
          type: 'tex',
          tex: 'u = U_0\\cos(\\omega t + \\varphi_u),\\qquad i = I_0\\cos(\\omega t + \\varphi_i)',
        },
        {
          type: 'table',
          caption: 'Các đại lượng trong biểu thức của dòng điện xoay chiều',
          head: ['Đại lượng', 'Kí hiệu, đơn vị', 'Ý nghĩa'],
          rows: [
            [
              'Giá trị tức thời',
              '$u$ (V), $i$ (A)',
              'Giá trị của điện áp, cường độ dòng điện tại thời điểm $t$; có thể dương, âm hoặc bằng $0$.',
            ],
            [
              'Giá trị cực đại',
              '$U_0$ (V), $I_0$ (A)',
              'Giá trị lớn nhất mà điện áp, cường độ dòng điện có thể đạt được.',
            ],
            ['Tần số góc', '$\\omega$ (rad/s)', 'Cho biết tốc độ biến thiên của $u$, $i$.'],
            [
              'Pha ban đầu',
              '$\\varphi_u$, $\\varphi_i$ (rad)',
              'Xác định giá trị của $u$, $i$ tại thời điểm $t = 0$.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Chu kì và tần số',
          text: 'Chu kì $T$ là khoảng thời gian ngắn nhất để dòng điện lặp lại trạng thái cũ; tần số $f$ là số chu kì trong một giây: $$T = \\dfrac{2\\pi}{\\omega}\\ (\\text{s}),\\qquad f = \\dfrac{1}{T} = \\dfrac{\\omega}{2\\pi}\\ (\\text{Hz}).$$ Lưới điện ở Việt Nam có $f = 50$ Hz: trong mỗi chu kì dòng điện đổi chiều hai lần, nên mỗi giây đổi chiều $100$ lần.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Độ lệch pha',
          text: 'Độ lệch pha giữa điện áp và cường độ dòng điện là $\\varphi = \\varphi_u - \\varphi_i$. Nếu $\\varphi > 0$ thì $u$ sớm pha hơn $i$; nếu $\\varphi < 0$ thì $u$ trễ pha hơn $i$; nếu $\\varphi = 0$ thì $u$ và $i$ cùng pha; nếu $\\varphi = \\pm\\pi$ thì $u$ và $i$ ngược pha.',
        },
        {
          type: 'p',
          text: 'Trên đồ thị, đại lượng sớm pha hơn đạt cực đại trước. Độ lệch pha $\\varphi$ ứng với khoảng thời gian lệch nhau $\\Delta t = \\dfrac{|\\varphi|}{2\\pi}T$: lệch nhau một phần tư chu kì là lệch pha $\\dfrac{\\pi}{2}$ (vuông pha).',
        },
      ],
    },
    {
      heading: 'Giá trị hiệu dụng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Cường độ dòng điện hiệu dụng',
          text: 'Cường độ hiệu dụng $I$ của dòng điện xoay chiều bằng cường độ của dòng điện không đổi mà khi chạy qua cùng một điện trở trong cùng một khoảng thời gian thì toả ra nhiệt lượng như nhau.',
        },
        {
          type: 'p',
          text: 'Với dòng điện xoay chiều hình sin, giá trị hiệu dụng bằng giá trị cực đại chia cho $\\sqrt{2}$. Điện áp hiệu dụng và suất điện động hiệu dụng cũng được định nghĩa như vậy:',
        },
        {
          type: 'tex',
          tex: 'I = \\dfrac{I_0}{\\sqrt{2}},\\qquad U = \\dfrac{U_0}{\\sqrt{2}},\\qquad E = \\dfrac{E_0}{\\sqrt{2}}',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Các số ghi trên thiết bị là giá trị hiệu dụng',
          text: 'Số $220$ V ghi trên ổ cắm, số chỉ của vôn kế, ampe kế xoay chiều và của đồng hồ đo điện đa năng ở thang đo xoay chiều (dấu $\\sim$) đều là giá trị hiệu dụng. Điện áp cực đại của lưới điện $220$ V là $U_0 = 220\\sqrt{2} \\approx 311$ V.',
        },
      ],
    },
    {
      heading: 'Đoạn mạch chỉ có điện trở. Công suất toả nhiệt',
      blocks: [
        {
          type: 'p',
          text: 'Đặt điện áp xoay chiều vào hai đầu một điện trở $R$. Thí nghiệm với dao động kí (Hình 1.2 trong sách) cho thấy $u$ và $i$ có cùng tần số và cùng pha, và tỉ số giữa điện áp hiệu dụng và cường độ hiệu dụng đúng bằng $R$:',
        },
        { type: 'tex', tex: 'i = \\dfrac{u}{R},\\qquad I = \\dfrac{U}{R}' },
        {
          type: 'p',
          text: 'Đó là định luật Ohm cho đoạn mạch xoay chiều chỉ có điện trở, giống như với dòng điện không đổi. Công suất toả nhiệt tức thời trên điện trở là',
        },
        {
          type: 'tex',
          tex: 'p = Ri^2 = RI_0^2\\cos^2(\\omega t + \\varphi_i) = \\dfrac{1}{2}RI_0^2 + \\dfrac{1}{2}RI_0^2\\cos(2\\omega t + 2\\varphi_i)',
        },
        {
          type: 'p',
          text: 'Số hạng thứ hai biến thiên điều hoà nên có giá trị trung bình bằng $0$ trong một chu kì. Vì vậy:',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công suất toả nhiệt',
          text: 'Công suất toả nhiệt trung bình: $P = \\dfrac{1}{2}RI_0^2 = RI^2$. Công suất toả nhiệt cực đại: $P_{\\max} = RI_0^2$. Công suất trung bình bằng một nửa công suất cực đại, và tính bằng giá trị hiệu dụng thì có cùng công thức như với dòng điện không đổi.',
        },
      ],
    },
    {
      heading: 'Đo tần số và điện áp xoay chiều',
      blocks: [
        {
          type: 'list',
          items: [
            'Đo tần số: cắm hai que đo vào chốt ghi Hz và chốt COM, vặn núm về thang đo Hz, rồi đặt hai que đo vào hai đầu đoạn mạch cần đo.',
            'Đo điện áp xoay chiều: cắm que đo vào chốt V và chốt COM, vặn núm về thang đo điện áp xoay chiều (V có dấu $\\sim$), mắc đồng hồ song song với đoạn mạch. Số chỉ là điện áp hiệu dụng.',
            'Dùng cảm biến điện áp nối với máy tính: màn hình vẽ đồ thị $u$ theo $t$. Đo khoảng thời gian giữa hai đỉnh liên tiếp được chu kì $T$; đọc giá trị cực đại $U_0$ rồi tính $U = \\dfrac{U_0}{\\sqrt{2}}$.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'An toàn',
          text: 'Chỉ làm thí nghiệm với máy phát âm tần hoặc biến áp nguồn có điện áp thấp. Không đo trực tiếp điện lưới $220$ V khi không có giáo viên hướng dẫn; luôn chọn thang đo lớn hơn giá trị cần đo trước khi nối mạch.',
        },
      ],
    },
    {
      heading: 'Dự án: Đo tần số và điện áp hiệu dụng của dòng điện xoay chiều',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: đo tần số và điện áp hiệu dụng giữa hai đầu một điện trở, rồi khảo sát xem điện áp giữa hai đầu tụ điện hoặc cuộn dây có thay đổi khi tần số thay đổi không. Dụng cụ: máy phát âm tần, điện trở $10\\ \\Omega$, một tụ điện hoặc cuộn dây nhiều vòng, đồng hồ đo điện đa năng, bảng lắp mạch, dây nối.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ sơ đồ mạch: máy phát âm tần nối với điện trở; đồng hồ đo mắc song song với điện trở.',
            'Thí nghiệm A: để đồng hồ ở thang đo Hz. Đổi điện áp ra của máy phát ba lần, mỗi lần ghi số chỉ tần số. Tính giá trị trung bình.',
            'Thí nghiệm B: để đồng hồ ở thang đo V $\\sim$. Đổi tần số của máy phát ba lần, mỗi lần ghi số chỉ điện áp. Tính giá trị trung bình.',
            'Thay điện trở bằng tụ điện hoặc cuộn dây, lặp lại thí nghiệm B.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Nộp sơ đồ mạch, các bảng số liệu và giá trị trung bình. Trả lời: tần số có phụ thuộc điện áp không? Điện áp đo được là giá trị cực đại hay hiệu dụng, vì sao? Với điện trở, điện áp có đổi khi tần số đổi không; với tụ điện hoặc cuộn dây thì sao?',
        },
      ],
    },
  ],
  explore: {
    title: 'Dao động kí ảo',
    instruction:
      'Chỉnh giá trị cực đại, tần số và pha ban đầu của $u$ và $i$, quan sát hai kênh của dao động kí. Kéo trên đồ thị để đọc giá trị tức thời. Sau đó thử đọc các màn hình bí ẩn: tìm điện áp hiệu dụng, tần số và độ lệch pha.',
  },
  examples: [
    {
      problem:
        'Điện áp giữa hai đầu điện trở $R = 10\\ \\Omega$ được ghi bằng dao động kí: hai đỉnh liên tiếp cách nhau $4$ ô, mỗi ô ứng với $0{,}005$ s; đỉnh cao nhất ứng với $3$ V; tại $t = 0$ điện áp bằng $0$ và đang giảm. a) Tìm tần số, giá trị cực đại, giá trị hiệu dụng và pha ban đầu. b) Viết biểu thức $u$ và $i$. c) Tính công suất toả nhiệt trung bình.',
      steps: [
        'Chu kì $T = 4 \\cdot 0{,}005 = 0{,}02$ s, nên $f = \\dfrac{1}{T} = 50$ Hz và $\\omega = 2\\pi f = 100\\pi$ rad/s.',
        '$U_0 = 3$ V, $U = \\dfrac{3}{\\sqrt{2}} \\approx 2{,}12$ V.',
        'Tại $t = 0$: $u = 3\\cos\\varphi_u = 0$ nên $\\cos\\varphi_u = 0$; $u$ đang giảm nên $\\varphi_u = \\dfrac{\\pi}{2}$.',
        '$u = 3\\cos\\left(100\\pi t + \\dfrac{\\pi}{2}\\right)$ (V). Mạch chỉ có $R$ nên $i$ cùng pha với $u$: $i = \\dfrac{u}{R} = 0{,}3\\cos\\left(100\\pi t + \\dfrac{\\pi}{2}\\right)$ (A).',
        '$P = \\dfrac{1}{2}RI_0^2 = \\dfrac{1}{2} \\cdot 10 \\cdot 0{,}3^2 = 0{,}45$ W.',
      ],
      answer:
        '$f = 50$ Hz, $U_0 = 3$ V, $U \\approx 2{,}12$ V, $\\varphi_u = \\dfrac{\\pi}{2}$; $i = 0{,}3\\cos\\left(100\\pi t + \\dfrac{\\pi}{2}\\right)$ (A); $P = 0{,}45$ W.',
    },
    {
      problem:
        'Cho $u = 200\\cos\\left(100\\pi t - \\dfrac{\\pi}{6}\\right)$ (V) và $i = 2\\cos\\left(100\\pi t + \\dfrac{\\pi}{3}\\right)$ (A). Tìm độ lệch pha giữa $u$ và $i$, cho biết đại lượng nào sớm pha hơn và sớm hơn bao lâu.',
      steps: [
        '$\\varphi = \\varphi_u - \\varphi_i = -\\dfrac{\\pi}{6} - \\dfrac{\\pi}{3} = -\\dfrac{\\pi}{2}$.',
        '$\\varphi < 0$ nên $u$ trễ pha $\\dfrac{\\pi}{2}$ so với $i$, tức $i$ sớm pha $\\dfrac{\\pi}{2}$ so với $u$.',
        '$T = \\dfrac{2\\pi}{100\\pi} = 0{,}02$ s, nên $\\Delta t = \\dfrac{\\pi/2}{2\\pi}T = \\dfrac{T}{4} = 0{,}005$ s.',
      ],
      answer:
        '$\\varphi = -\\dfrac{\\pi}{2}$: $i$ sớm pha $\\dfrac{\\pi}{2}$ so với $u$, đạt cực đại sớm hơn $0{,}005$ s.',
    },
    {
      problem:
        'Một máy sấy tóc ghi $220$ V – $1\\,100$ W, dùng ở mạng điện $220$ V – $50$ Hz. Coi máy như một điện trở. Tính cường độ hiệu dụng, cường độ cực đại qua máy và điện áp cực đại của mạng điện.',
      steps: [
        'Máy hoạt động đúng định mức nên $I = \\dfrac{P}{U} = \\dfrac{1\\,100}{220} = 5$ A.',
        '$I_0 = I\\sqrt{2} = 5\\sqrt{2} \\approx 7{,}07$ A.',
        '$U_0 = U\\sqrt{2} = 220\\sqrt{2} \\approx 311$ V.',
      ],
      answer: '$I = 5$ A, $I_0 \\approx 7{,}07$ A, $U_0 \\approx 311$ V.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Dùng đồng hồ đo điện đa năng ở thang đo điện áp xoay chiều để đo điện áp giữa hai đầu một điện trở. Số chỉ của đồng hồ là',
      options: [
        'điện áp hiệu dụng',
        'điện áp cực đại',
        'điện áp tức thời tại lúc đọc',
        'điện áp trung bình trong một chu kì',
      ],
      answer: 0,
      hints: [
        'Các số ghi trên thiết bị điện và số chỉ của dụng cụ đo xoay chiều là loại giá trị nào?',
      ],
      solution:
        'Đồng hồ đo xoay chiều chỉ giá trị hiệu dụng. Điện áp trung bình trong một chu kì của điện áp hình sin bằng $0$.',
    },
    {
      type: 'match',
      prompt:
        'Ghép mỗi kí hiệu với tên gọi của nó trong biểu thức $i = I_0\\cos(\\omega t + \\varphi_i)$.',
      left: ['$i$', '$I_0$', '$\\omega$', '$\\varphi_i$'],
      right: [
        'Cường độ dòng điện tức thời',
        'Cường độ dòng điện cực đại',
        'Tần số góc',
        'Pha ban đầu',
        'Cường độ dòng điện hiệu dụng',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Cường độ hiệu dụng được kí hiệu là $I$, không có trong biểu thức này.'],
      solution:
        '$i$ là giá trị tức thời, $I_0$ là giá trị cực đại, $\\omega$ là tần số góc (rad/s), $\\varphi_i$ là pha ban đầu (rad). Cường độ hiệu dụng là $I = \\dfrac{I_0}{\\sqrt{2}}$.',
    },
    {
      type: 'number',
      prompt:
        'Điện áp giữa hai đầu một đoạn mạch là $u = 220\\sqrt{2}\\cos\\left(100\\pi t + \\dfrac{\\pi}{3}\\right)$ (V). Tần số của dòng điện là bao nhiêu hertz?',
      answer: 50,
      unit: 'Hz',
      hints: ['$\\omega = 100\\pi$ rad/s.', '$f = \\dfrac{\\omega}{2\\pi}$.'],
      solution: '$f = \\dfrac{\\omega}{2\\pi} = \\dfrac{100\\pi}{2\\pi} = 50$ Hz.',
    },
    {
      type: 'number',
      prompt: 'Với điện áp ở câu trên, điện áp hiệu dụng giữa hai đầu đoạn mạch là bao nhiêu vôn?',
      answer: 220,
      unit: 'V',
      hints: ['Giá trị cực đại là hệ số đứng trước dấu $\\cos$.'],
      solution: '$U_0 = 220\\sqrt{2}$ V nên $U = \\dfrac{U_0}{\\sqrt{2}} = 220$ V.',
    },
    {
      type: 'number',
      prompt:
        'Vẫn với $u = 220\\sqrt{2}\\cos\\left(100\\pi t + \\dfrac{\\pi}{3}\\right)$ (V), tính điện áp tức thời tại $t = 0$ (làm tròn đến một chữ số thập phân).',
      answer: 155.6,
      tolerance: 0.1,
      unit: 'V',
      hints: ['Thay $t = 0$ vào biểu thức: $u = 220\\sqrt{2}\\cos\\dfrac{\\pi}{3}$.'],
      solution:
        '$u = 220\\sqrt{2} \\cdot \\cos\\dfrac{\\pi}{3} = 220\\sqrt{2} \\cdot \\dfrac{1}{2} = 110\\sqrt{2} \\approx 155{,}6$ V.',
    },
    {
      type: 'choice',
      prompt:
        'Cho $u = U_0\\cos\\left(100\\pi t + \\dfrac{\\pi}{6}\\right)$ và $i = I_0\\cos\\left(100\\pi t - \\dfrac{\\pi}{3}\\right)$. Phát biểu nào đúng?',
      options: [
        '$u$ sớm pha $\\dfrac{\\pi}{2}$ so với $i$',
        '$u$ trễ pha $\\dfrac{\\pi}{2}$ so với $i$',
        '$u$ sớm pha $\\dfrac{\\pi}{6}$ so với $i$',
        '$u$ và $i$ ngược pha',
      ],
      answer: 0,
      hints: ['Tính $\\varphi = \\varphi_u - \\varphi_i$ và xét dấu của nó.'],
      solution:
        '$\\varphi = \\dfrac{\\pi}{6} - \\left(-\\dfrac{\\pi}{3}\\right) = \\dfrac{\\pi}{2} > 0$ nên $u$ sớm pha $\\dfrac{\\pi}{2}$ so với $i$ (vuông pha).',
    },
    {
      type: 'number',
      prompt:
        'Một bàn là ghi $220$ V – $1\\,000$ W hoạt động đúng định mức. Tính cường độ dòng điện cực đại qua bàn là, coi bàn là như một điện trở (làm tròn đến hai chữ số thập phân).',
      answer: 6.43,
      tolerance: 0.01,
      unit: 'A',
      hints: ['Tính cường độ hiệu dụng $I = \\dfrac{P}{U}$ trước.', '$I_0 = I\\sqrt{2}$.'],
      solution:
        '$I = \\dfrac{1\\,000}{220} \\approx 4{,}545$ A, nên $I_0 = I\\sqrt{2} \\approx 4{,}545 \\cdot 1{,}414 \\approx 6{,}43$ A.',
    },
    {
      type: 'number',
      prompt:
        'Dòng điện $i = 2\\cos(100\\pi t)$ (A) chạy qua điện trở $R = 50\\ \\Omega$. Công suất toả nhiệt trung bình trên điện trở là bao nhiêu oát?',
      answer: 100,
      unit: 'W',
      hints: ['Công suất trung bình $P = \\dfrac{1}{2}RI_0^2$, bằng một nửa công suất cực đại.'],
      solution:
        '$P = \\dfrac{1}{2}RI_0^2 = \\dfrac{1}{2} \\cdot 50 \\cdot 2^2 = 100$ W. Công suất cực đại là $P_{\\max} = RI_0^2 = 200$ W.',
    },
    {
      type: 'number',
      prompt:
        'Trên màn hình dao động kí, hai đỉnh liên tiếp của đồ thị điện áp cách nhau $5$ ô, mỗi ô ứng với $2$ ms. Tần số của điện áp là bao nhiêu hertz?',
      answer: 100,
      unit: 'Hz',
      hints: [
        'Khoảng cách giữa hai đỉnh liên tiếp là một chu kì.',
        'Đổi ms ra s rồi tính $f = \\dfrac{1}{T}$.',
      ],
      solution: '$T = 5 \\cdot 2 = 10$ ms $= 0{,}01$ s, nên $f = \\dfrac{1}{0{,}01} = 100$ Hz.',
    },
    {
      type: 'multi',
      prompt: 'Những phát biểu nào đúng về đoạn mạch xoay chiều chỉ có điện trở $R$?',
      options: [
        '$u$ và $i$ cùng pha',
        '$I = \\dfrac{U}{R}$',
        'Công suất toả nhiệt trung bình bằng $RI_0^2$',
        '$i$ sớm pha $\\dfrac{\\pi}{2}$ so với $u$',
      ],
      answers: [0, 1],
      hints: ['Nhớ lại kết quả thí nghiệm với dao động kí: hai đồ thị đạt cực đại cùng lúc.'],
      solution:
        'Với mạch chỉ có $R$: $u$, $i$ cùng pha và $I = \\dfrac{U}{R}$. Công suất trung bình là $\\dfrac{1}{2}RI_0^2 = RI^2$; $RI_0^2$ là công suất cực đại.',
    },
  ],
  takeaways: [
    '$u = U_0\\cos(\\omega t + \\varphi_u)$, $i = I_0\\cos(\\omega t + \\varphi_i)$; $T = \\dfrac{2\\pi}{\\omega}$, $f = \\dfrac{1}{T}$.',
    'Giá trị hiệu dụng: $I = \\dfrac{I_0}{\\sqrt{2}}$, $U = \\dfrac{U_0}{\\sqrt{2}}$; dụng cụ đo và số ghi trên thiết bị là giá trị hiệu dụng.',
    'Độ lệch pha $\\varphi = \\varphi_u - \\varphi_i$: dương thì $u$ sớm pha hơn $i$, âm thì $u$ trễ pha hơn $i$.',
    'Mạch chỉ có $R$: $u$, $i$ cùng pha, $I = \\dfrac{U}{R}$; $P = \\dfrac{1}{2}RI_0^2 = RI^2 = \\dfrac{P_{\\max}}{2}$.',
  ],
};
