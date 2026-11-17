/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đoạn mạch RLC mắc nối tiếp có cảm kháng ZL = ωL, dung kháng ZC = 1/(ωC), tổng trở Z = √(R² + (ZL − ZC)²) và tuân theo định luật Ohm I = U/Z; khi ZL = ZC mạch có cộng hưởng điện, cường độ dòng điện lớn nhất và cùng pha với điện áp.',
  intro:
    'Trong mạch lọc của loa, mạch chọn sóng của máy thu thanh hay chấn lưu của đèn, người ta mắc điện trở, cuộn dây và tụ điện nối tiếp nhau. Với dòng điện xoay chiều, cuộn dây và tụ điện cũng "cản trở" dòng điện, và mức cản trở thay đổi theo tần số. Cường độ dòng điện trong đoạn mạch như vậy phụ thuộc vào điện áp và tần số thế nào?',
  objectives: [
    'Tính được cảm kháng, dung kháng, tổng trở của đoạn mạch RLC mắc nối tiếp.',
    'Vận dụng được định luật Ohm $I = \\dfrac{U}{Z}$ và công thức $\\tan\\varphi = \\dfrac{Z_L - Z_C}{R}$.',
    'Vẽ và sử dụng được giản đồ vectơ của đoạn mạch RLC nối tiếp.',
    'Nêu được điều kiện và đặc điểm của hiện tượng cộng hưởng điện.',
    'Thiết kế và thực hiện được phương án khảo sát đoạn mạch RLC nối tiếp bằng dụng cụ thực hành.',
  ],
  sections: [
    {
      heading: 'Cảm kháng, dung kháng và tổng trở',
      blocks: [
        {
          type: 'p',
          text: 'Đoạn mạch RLC nối tiếp gồm điện trở $R$, cuộn dây thuần cảm có độ tự cảm $L$ và tụ điện có điện dung $C$ mắc nối tiếp. Đặt vào hai đầu đoạn mạch điện áp xoay chiều có tần số góc $\\omega$, trong mạch có dòng điện $i = I_0\\cos(\\omega t + \\varphi_i)$ chạy qua cả ba phần tử.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Cảm kháng và dung kháng',
          text: 'Cảm kháng của cuộn dây $Z_L = \\omega L$ và dung kháng của tụ điện $Z_C = \\dfrac{1}{\\omega C}$ đặc trưng cho mức cản trở dòng điện xoay chiều của cuộn dây và tụ điện; đơn vị là ôm ($\\Omega$). Tần số càng lớn thì cảm kháng càng lớn, còn dung kháng càng nhỏ.',
        },
        {
          type: 'table',
          caption: 'Quan hệ giữa điện áp và cường độ dòng điện trên từng phần tử',
          head: ['Phần tử', 'Định luật Ohm', 'Pha của $u$ so với $i$'],
          rows: [
            ['Điện trở $R$', '$U_R = IR$', 'Cùng pha'],
            ['Cuộn dây thuần cảm $L$', '$U_L = IZ_L$', 'Sớm pha $\\dfrac{\\pi}{2}$'],
            ['Tụ điện $C$', '$U_C = IZ_C$', 'Trễ pha $\\dfrac{\\pi}{2}$'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tổng trở và định luật Ohm',
          text: 'Tổng trở của đoạn mạch: $$Z = \\sqrt{R^2 + (Z_L - Z_C)^2}\\ (\\Omega).$$ Định luật Ohm cho đoạn mạch RLC nối tiếp: $I = \\dfrac{U}{Z}$, $I_0 = \\dfrac{U_0}{Z}$.',
        },
      ],
    },
    {
      heading: 'Giản đồ vectơ và độ lệch pha',
      blocks: [
        {
          type: 'p',
          text: 'Vì $i$ chung cho cả mạch, ta biểu diễn mỗi điện áp bằng một vectơ quay có độ dài bằng giá trị hiệu dụng, góc so với trục dòng điện bằng độ lệch pha so với $i$: $\\vec{U}_R$ cùng hướng với trục $I$, $\\vec{U}_L$ quay lên trên một góc $\\dfrac{\\pi}{2}$, $\\vec{U}_C$ quay xuống dưới một góc $\\dfrac{\\pi}{2}$. Điện áp hai đầu đoạn mạch là tổng vectơ:',
        },
        {
          type: 'tex',
          tex: '\\vec{U} = \\vec{U}_R + \\vec{U}_L + \\vec{U}_C,\\qquad U = \\sqrt{U_R^2 + (U_L - U_C)^2}',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Không cộng các số chỉ vôn kế',
          text: 'Các điện áp hiệu dụng cộng theo vectơ, nên nói chung $U \\ne U_R + U_L + U_C$. Vôn kế đặt vào hai đầu cuộn dây hay tụ điện có thể chỉ số lớn hơn điện áp của nguồn.',
        },
        {
          type: 'p',
          text: 'Độ lệch pha giữa điện áp hai đầu đoạn mạch và cường độ dòng điện, $\\varphi = \\varphi_u - \\varphi_i$, đọc được trên giản đồ:',
        },
        { type: 'tex', tex: '\\tan\\varphi = \\dfrac{Z_L - Z_C}{R} = \\dfrac{U_L - U_C}{U_R}' },
        {
          type: 'list',
          items: [
            '$Z_L > Z_C$: $\\varphi > 0$, $u$ sớm pha hơn $i$ (mạch có tính cảm kháng).',
            '$Z_L < Z_C$: $\\varphi < 0$, $u$ trễ pha hơn $i$ (mạch có tính dung kháng).',
            '$Z_L = Z_C$: $\\varphi = 0$, $u$ cùng pha với $i$.',
          ],
        },
      ],
    },
    {
      heading: 'Cộng hưởng điện',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hiện tượng cộng hưởng điện',
          text: 'Khi $Z_L = Z_C$, tức $\\omega^2 LC = 1$, trong đoạn mạch RLC nối tiếp xảy ra hiện tượng cộng hưởng điện. Tần số cộng hưởng: $$\\omega_0 = \\dfrac{1}{\\sqrt{LC}},\\qquad f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}.$$',
        },
        {
          type: 'list',
          items: [
            'Tổng trở nhỏ nhất, $Z = R$, nên cường độ hiệu dụng lớn nhất: $I_{\\max} = \\dfrac{U}{R}$.',
            'Cường độ dòng điện cùng pha với điện áp hai đầu đoạn mạch; $U_R = U$.',
            '$U_L = U_C$: hai điện áp này ngược pha và triệt tiêu nhau, mỗi điện áp có thể lớn hơn nhiều so với $U$.',
          ],
        },
        {
          type: 'p',
          text: 'Giữ $U$ không đổi và thay đổi tần số, đồ thị $I$ theo $f$ có một đỉnh tại $f_0$. Điện trở $R$ càng nhỏ thì đỉnh càng cao và càng nhọn. Mạch chọn sóng của máy thu thanh dùng tính chất này: chỉnh $C$ để $f_0$ trùng với tần số của đài cần nghe.',
        },
      ],
    },
    {
      heading: 'Dự án: Khảo sát đoạn mạch RLC mắc nối tiếp',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: kiểm chứng định luật Ohm $I = \\dfrac{U}{Z}$ cho đoạn mạch RLC nối tiếp và tìm tần số cộng hưởng của mạch. Dụng cụ: điện trở $10\\ \\Omega$, cuộn dây không lõi thép $400$ vòng, tụ điện $2\\ \\mu\\text{F}$, máy phát âm tần, hai đồng hồ đo điện đa năng, công tắc, bảng lắp mạch, dây nối.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Mắc $R$, $L$, $C$ nối tiếp vào máy phát âm tần. Một đồng hồ đo cường độ dòng điện (mắc nối tiếp, thang mA xoay chiều), một đồng hồ đo điện áp hai đầu đoạn mạch (mắc song song, thang V xoay chiều).',
            'Đặt tần số máy phát ở một giá trị cố định. Tăng dần điện áp hiệu dụng từ $0$ V đến $6$ V; ghi $7$ cặp giá trị $U$, $I$.',
            'Vẽ đường đặc trưng V – A; tính $Z = \\dfrac{U}{I}$ trung bình.',
            'Giữ điện áp không đổi, thay đổi tần số máy phát; ghi $I$ ở mỗi tần số và tìm tần số cho $I$ lớn nhất.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Nộp bảng số liệu, đường đặc trưng V – A và nhận xét về quan hệ giữa $U$ và $I$; đồ thị $I$ theo $f$ và tần số cộng hưởng đo được. Đo hoặc tra độ tự cảm của cuộn dây rồi so sánh với $f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}$; giải thích sai lệch (điện trở của cuộn dây, sai số dụng cụ).',
        },
      ],
    },
  ],
  explore: {
    title: 'Mạch RLC ảo',
    instruction:
      'Kéo các thanh $R$, $L$, $C$ và tần số $f$. Quan sát các vectơ $\\vec{U}_R$, $\\vec{U}_L$, $\\vec{U}_C$ và tổng $\\vec{U}$ trên giản đồ, điểm đỏ trên đồ thị $I$ theo $f$. Tìm tần số làm cường độ dòng điện lớn nhất, rồi giảm $R$ để thấy đỉnh cộng hưởng cao và nhọn hơn.',
  },
  examples: [
    {
      problem:
        'Đoạn mạch gồm $R = 10\\ \\Omega$, cuộn dây thuần cảm $L = \\dfrac{0{,}3}{\\pi}$ H và tụ điện $C = \\dfrac{5 \\cdot 10^{-4}}{\\pi}$ F mắc nối tiếp. Dòng điện trong mạch là $i = 2\\sqrt{2}\\cos(100\\pi t)$ (A). Tính $Z_L$, $Z_C$, $Z$ và viết biểu thức điện áp hai đầu đoạn mạch.',
      steps: [
        '$Z_L = \\omega L = 100\\pi \\cdot \\dfrac{0{,}3}{\\pi} = 30\\ \\Omega$; $Z_C = \\dfrac{1}{\\omega C} = \\dfrac{1}{100\\pi \\cdot \\dfrac{5 \\cdot 10^{-4}}{\\pi}} = 20\\ \\Omega$.',
        '$Z = \\sqrt{10^2 + (30 - 20)^2} = 10\\sqrt{2} \\approx 14{,}14\\ \\Omega$.',
        '$U_0 = I_0 Z = 2\\sqrt{2} \\cdot 10\\sqrt{2} = 40$ V.',
        '$\\tan\\varphi = \\dfrac{30 - 20}{10} = 1$ nên $\\varphi = \\dfrac{\\pi}{4}$; $\\varphi_u = \\varphi_i + \\varphi = \\dfrac{\\pi}{4}$.',
      ],
      answer:
        '$Z_L = 30\\ \\Omega$, $Z_C = 20\\ \\Omega$, $Z = 10\\sqrt{2}\\ \\Omega$; $u = 40\\cos\\left(100\\pi t + \\dfrac{\\pi}{4}\\right)$ (V).',
    },
    {
      problem:
        'Trong đoạn mạch RLC nối tiếp, vôn kế chỉ $U_R = 30$ V, $U_L = 80$ V, $U_C = 40$ V. Tính điện áp hiệu dụng hai đầu đoạn mạch và độ lệch pha giữa $u$ và $i$.',
      steps: [
        'Cộng theo giản đồ vectơ: $U = \\sqrt{U_R^2 + (U_L - U_C)^2} = \\sqrt{30^2 + 40^2} = 50$ V.',
        '$\\tan\\varphi = \\dfrac{U_L - U_C}{U_R} = \\dfrac{40}{30} = \\dfrac{4}{3}$, nên $\\varphi \\approx 53{,}1^\\circ$.',
        '$\\varphi > 0$ nên $u$ sớm pha hơn $i$.',
      ],
      answer: '$U = 50$ V (không phải $150$ V); $u$ sớm pha khoảng $53{,}1^\\circ$ so với $i$.',
    },
    {
      problem:
        'Đoạn mạch có $R = 100\\ \\Omega$, $L = \\dfrac{1}{\\pi}$ H, $C = \\dfrac{10^{-4}}{\\pi}$ F mắc nối tiếp, điện áp hiệu dụng $U = 220$ V, tần số thay đổi được. Tìm tần số cộng hưởng và cường độ hiệu dụng khi đó.',
      steps: [
        '$LC = \\dfrac{1}{\\pi} \\cdot \\dfrac{10^{-4}}{\\pi} = \\dfrac{10^{-4}}{\\pi^2}$, nên $\\omega_0 = \\dfrac{1}{\\sqrt{LC}} = \\dfrac{\\pi}{10^{-2}} = 100\\pi$ rad/s.',
        '$f_0 = \\dfrac{\\omega_0}{2\\pi} = 50$ Hz.',
        'Khi cộng hưởng $Z = R$, nên $I_{\\max} = \\dfrac{U}{R} = \\dfrac{220}{100} = 2{,}2$ A.',
      ],
      answer: '$f_0 = 50$ Hz, $I_{\\max} = 2{,}2$ A.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Cuộn dây thuần cảm có $L = \\dfrac{0{,}5}{\\pi}$ H mắc vào mạng điện tần số $50$ Hz. Cảm kháng của cuộn dây là bao nhiêu ôm?',
      answer: 50,
      unit: 'Ω',
      hints: ['$\\omega = 2\\pi f = 100\\pi$ rad/s.', '$Z_L = \\omega L$.'],
      solution: '$Z_L = \\omega L = 100\\pi \\cdot \\dfrac{0{,}5}{\\pi} = 50\\ \\Omega$.',
    },
    {
      type: 'number',
      prompt:
        'Tụ điện có $C = \\dfrac{10^{-4}}{2\\pi}$ F mắc vào mạng điện tần số $50$ Hz. Dung kháng của tụ là bao nhiêu ôm?',
      answer: 200,
      unit: 'Ω',
      hints: ['$Z_C = \\dfrac{1}{\\omega C}$ với $\\omega = 100\\pi$ rad/s.'],
      solution:
        '$\\omega C = 100\\pi \\cdot \\dfrac{10^{-4}}{2\\pi} = 5 \\cdot 10^{-3}$, nên $Z_C = \\dfrac{1}{5 \\cdot 10^{-3}} = 200\\ \\Omega$.',
    },
    {
      type: 'number',
      prompt:
        'Đoạn mạch RLC nối tiếp có $R = 40\\ \\Omega$, $Z_L = 60\\ \\Omega$, $Z_C = 30\\ \\Omega$. Tổng trở của đoạn mạch là bao nhiêu ôm?',
      answer: 50,
      unit: 'Ω',
      hints: ['$Z = \\sqrt{R^2 + (Z_L - Z_C)^2}$.'],
      solution: '$Z = \\sqrt{40^2 + 30^2} = \\sqrt{2\\,500} = 50\\ \\Omega$.',
    },
    {
      type: 'number',
      prompt:
        'Đặt điện áp hiệu dụng $U = 100$ V vào đoạn mạch ở câu trên. Cường độ dòng điện hiệu dụng là bao nhiêu ampe?',
      answer: 2,
      unit: 'A',
      hints: ['Định luật Ohm cho đoạn mạch RLC: $I = \\dfrac{U}{Z}$.'],
      solution: '$I = \\dfrac{U}{Z} = \\dfrac{100}{50} = 2$ A.',
    },
    {
      type: 'choice',
      prompt:
        'Với đoạn mạch $R = 40\\ \\Omega$, $Z_L = 60\\ \\Omega$, $Z_C = 30\\ \\Omega$, phát biểu nào đúng?',
      options: [
        '$u$ sớm pha hơn $i$, $\\tan\\varphi = 0{,}75$',
        '$u$ trễ pha hơn $i$, $\\tan\\varphi = -0{,}75$',
        '$u$ cùng pha với $i$',
        '$u$ sớm pha hơn $i$, $\\tan\\varphi = \\dfrac{4}{3}$',
      ],
      answer: 0,
      hints: ['$\\tan\\varphi = \\dfrac{Z_L - Z_C}{R}$, xét dấu của kết quả.'],
      solution:
        '$\\tan\\varphi = \\dfrac{60 - 30}{40} = 0{,}75 > 0$ nên $u$ sớm pha hơn $i$ (mạch có tính cảm kháng).',
    },
    {
      type: 'number',
      prompt:
        'Trong đoạn mạch RLC nối tiếp, $U_R = 60$ V, $U_L = 120$ V, $U_C = 40$ V. Điện áp hiệu dụng hai đầu đoạn mạch là bao nhiêu vôn?',
      answer: 100,
      unit: 'V',
      hints: [
        'Các điện áp cộng theo vectơ trên giản đồ, không cộng các số.',
        '$U = \\sqrt{U_R^2 + (U_L - U_C)^2}$.',
      ],
      solution: '$U = \\sqrt{60^2 + (120 - 40)^2} = \\sqrt{3\\,600 + 6\\,400} = 100$ V.',
    },
    {
      type: 'number',
      prompt:
        'Đoạn mạch RLC nối tiếp có $L = \\dfrac{1}{\\pi}$ H và $C = \\dfrac{10^{-4}}{4\\pi}$ F. Tần số cộng hưởng của mạch là bao nhiêu hertz?',
      answer: 100,
      unit: 'Hz',
      hints: [
        'Tính $LC$ rồi $\\omega_0 = \\dfrac{1}{\\sqrt{LC}}$.',
        '$f_0 = \\dfrac{\\omega_0}{2\\pi}$.',
      ],
      solution:
        '$LC = \\dfrac{10^{-4}}{4\\pi^2}$, $\\sqrt{LC} = \\dfrac{10^{-2}}{2\\pi}$, nên $\\omega_0 = 200\\pi$ rad/s và $f_0 = 100$ Hz.',
    },
    {
      type: 'number',
      prompt:
        'Đoạn mạch RLC nối tiếp có $R = 50\\ \\Omega$ đang xảy ra cộng hưởng điện, điện áp hiệu dụng hai đầu mạch là $200$ V. Cường độ hiệu dụng trong mạch là bao nhiêu ampe?',
      answer: 4,
      unit: 'A',
      hints: ['Khi cộng hưởng, tổng trở của mạch bằng bao nhiêu?'],
      solution:
        'Khi cộng hưởng $Z_L = Z_C$ nên $Z = R = 50\\ \\Omega$ và $I = \\dfrac{200}{50} = 4$ A.',
    },
    {
      type: 'multi',
      prompt: 'Khi trong đoạn mạch RLC nối tiếp xảy ra cộng hưởng điện thì',
      options: [
        '$Z_L = Z_C$',
        'cường độ hiệu dụng đạt giá trị lớn nhất $\\dfrac{U}{R}$',
        '$u$ cùng pha với $i$',
        'điện áp hai đầu cuộn dây bằng $0$',
        '$u$ sớm pha $\\dfrac{\\pi}{2}$ so với $i$',
      ],
      answers: [0, 1, 2],
      hints: ['Điều kiện cộng hưởng là $\\omega^2 LC = 1$. Khi đó $\\tan\\varphi$ bằng bao nhiêu?'],
      solution:
        'Cộng hưởng: $Z_L = Z_C$, $Z = R$, $I_{\\max} = \\dfrac{U}{R}$, $\\varphi = 0$. Điện áp $U_L = IZ_L$ không bằng $0$; nó bằng $U_C$ và hai điện áp này ngược pha nên triệt tiêu nhau.',
    },
    {
      type: 'choice',
      prompt:
        'Đoạn mạch RLC nối tiếp đang có $Z_L < Z_C$. Tăng dần tần số của điện áp (giữ $U$ không đổi) nhưng chưa vượt quá tần số cộng hưởng. Cường độ hiệu dụng trong mạch',
      options: ['tăng', 'giảm', 'không đổi', 'bằng $0$'],
      answer: 0,
      hints: ['Khi $f$ tăng, $Z_L$ và $Z_C$ thay đổi thế nào? Hiệu $|Z_L - Z_C|$ thì sao?'],
      solution:
        'Tăng $f$ làm $Z_L$ tăng và $Z_C$ giảm, nên $|Z_L - Z_C|$ giảm dần về $0$ khi tới $f_0$. Tổng trở giảm nên $I = \\dfrac{U}{Z}$ tăng.',
    },
    {
      type: 'choice',
      prompt: 'Trong đoạn mạch xoay chiều chỉ có tụ điện, cường độ dòng điện',
      options: [
        'sớm pha $\\dfrac{\\pi}{2}$ so với điện áp',
        'trễ pha $\\dfrac{\\pi}{2}$ so với điện áp',
        'cùng pha với điện áp',
        'ngược pha với điện áp',
      ],
      answer: 0,
      hints: [
        'Trên giản đồ, $\\vec{U}_C$ quay xuống dưới trục dòng điện một góc $\\dfrac{\\pi}{2}$.',
      ],
      solution:
        'Điện áp trên tụ trễ pha $\\dfrac{\\pi}{2}$ so với dòng điện, tức là dòng điện sớm pha $\\dfrac{\\pi}{2}$ so với điện áp.',
    },
  ],
  takeaways: [
    '$Z_L = \\omega L$, $Z_C = \\dfrac{1}{\\omega C}$, $Z = \\sqrt{R^2 + (Z_L - Z_C)^2}$; định luật Ohm $I = \\dfrac{U}{Z}$.',
    'Giản đồ vectơ: $\\vec{U}_R$ cùng hướng $\\vec{I}$, $\\vec{U}_L$ sớm pha $\\dfrac{\\pi}{2}$, $\\vec{U}_C$ trễ pha $\\dfrac{\\pi}{2}$; $U = \\sqrt{U_R^2 + (U_L - U_C)^2}$.',
    '$\\tan\\varphi = \\dfrac{Z_L - Z_C}{R}$: dương thì $u$ sớm pha hơn $i$, âm thì trễ pha hơn $i$.',
    'Cộng hưởng khi $\\omega^2 LC = 1$: $Z = R$, $I_{\\max} = \\dfrac{U}{R}$, $u$ cùng pha với $i$.',
  ],
};
