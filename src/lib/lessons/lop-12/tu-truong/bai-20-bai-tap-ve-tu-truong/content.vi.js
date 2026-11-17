/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập giải bài tập về từ trường: xác định chiều và độ lớn lực từ F = BIL sin α, đo cảm ứng từ, tính từ thông Φ = BS cos α, xác định chiều dòng điện cảm ứng bằng định luật Lenz, tính suất điện động cảm ứng theo định luật Faraday, suất điện động của máy phát điện xoay chiều, bài toán máy biến áp và hao phí truyền tải điện năng.',
  intro:
    'Chương Từ trường nối hai ý lớn: từ trường tác dụng lực lên dòng điện, và từ thông biến thiên sinh ra dòng điện. Bài này ôn lại các công thức, luyện cách xác định chiều bằng quy tắc bàn tay trái, quy tắc nắm tay phải và định luật Lenz, rồi vận dụng vào máy phát điện, máy biến áp và truyền tải điện năng.',
  objectives: [
    'Xác định được chiều lực từ bằng quy tắc bàn tay trái và tính được $F = BIL\\sin\\alpha$; xác định được $B$ từ số liệu đo lực từ.',
    'Tính được từ thông $\\Phi = NBS\\cos\\alpha$ và suất điện động cảm ứng $e_c = -N\\dfrac{\\Delta\\Phi}{\\Delta t}$.',
    'Xác định được chiều dòng điện cảm ứng bằng định luật Lenz.',
    'Giải được bài toán máy phát điện xoay chiều, máy biến áp và hao phí truyền tải điện năng.',
  ],
  sections: [
    {
      heading: 'Tóm tắt kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Công thức, quy tắc'],
          rows: [
            [
              'Lực từ lên đoạn dây dẫn mang dòng điện',
              '$F = BIL\\sin\\alpha$ ($\\alpha$ là góc giữa dây và $\\vec{B}$); chiều theo quy tắc bàn tay trái',
            ],
            ['Cảm ứng từ (dây vuông góc với đường sức)', '$B = \\dfrac{F}{IL}$, đơn vị tesla (T)'],
            [
              'Từ thông',
              '$\\Phi = NBS\\cos\\alpha$ ($\\alpha$ là góc giữa pháp tuyến $\\vec{n}$ và $\\vec{B}$), đơn vị vêbe (Wb)',
            ],
            [
              'Suất điện động cảm ứng',
              '$e_c = -N\\dfrac{\\Delta\\Phi}{\\Delta t}$; thanh dẫn chuyển động vuông góc với đường sức: $|e_c| = Blv$',
            ],
            [
              'Chiều dòng điện cảm ứng',
              'Định luật Lenz: từ trường cảm ứng chống lại sự biến thiên của từ thông; dùng quy tắc nắm tay phải để suy ra chiều dòng điện',
            ],
            [
              'Máy phát điện xoay chiều',
              '$e = E_0\\cos(\\omega t + \\varphi_0)$, $E_0 = NBS\\omega$, $\\omega = 2\\pi f$',
            ],
            ['Máy biến áp lí tưởng', '$\\dfrac{U_1}{U_2} = \\dfrac{N_1}{N_2}$, $U_1I_1 = U_2I_2$'],
            [
              'Hao phí truyền tải',
              '$\\Delta P = I^2R = \\dfrac{P^2R}{U^2}$ (hệ số công suất bằng 1)',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Phương pháp giải',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Bài toán lực từ: xác định góc $\\alpha$ giữa dây và $\\vec{B}$; đổi chiều dài ra mét; dùng quy tắc bàn tay trái cho chiều: lực từ vuông góc với cả dây và $\\vec{B}$.',
            'Bài toán từ thông: xác định đúng góc giữa $\\vec{n}$ và $\\vec{B}$ (nếu đề cho góc $\\beta$ giữa mặt phẳng khung và $\\vec{B}$ thì $\\alpha = 90^\\circ - \\beta$); đổi diện tích ra m².',
            'Bài toán chiều dòng điện cảm ứng: xác định chiều $\\vec{B}$ qua mạch, xét từ thông tăng hay giảm, suy ra chiều $\\vec{B}_c$ (ngược chiều $\\vec{B}$ nếu tăng, cùng chiều nếu giảm), rồi dùng quy tắc nắm tay phải.',
            'Bài toán độ lớn suất điện động: tính $\\Delta\\Phi$ qua một vòng, nhân với số vòng $N$ rồi chia cho $\\Delta t$; nếu mạch kín có điện trở $R$ thì $i_c = \\dfrac{|e_c|}{R}$.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi thường gặp',
          text: 'Nhầm góc giữa mặt phẳng khung với góc $\\alpha$ trong $\\Phi = BS\\cos\\alpha$; quên đổi cm², cm ra m², m; dùng bàn tay phải cho lực từ (lực từ dùng bàn tay trái, chiều từ trường của dòng điện dùng nắm tay phải).',
        },
      ],
    },
  ],
  explore: {
    title: 'Xác định chiều bằng hình vẽ',
    instruction:
      'Mỗi bài có một hình vẽ. Kéo đầu mũi tên đỏ (hoặc dùng phím mũi tên) để chỉ chiều lực từ hay chiều dòng điện cảm ứng; với vòng dây, kéo nút tròn dọc theo vòng dây theo chiều dòng điện. Bấm "Kiểm tra", đọc lời giải rồi sang bài tiếp.',
  },
  examples: [
    {
      problem:
        'Một đoạn dây dẫn dài $5$ cm đặt nằm ngang, vuông góc với các đường sức từ của một nam châm, được gắn với một cân điện tử. Khi cho dòng điện $I = 4$ A chạy qua dây, số chỉ của cân tăng thêm $2{,}0$ g. Lấy $g = 9{,}8$ m/s². Tính cảm ứng từ của nam châm.',
      steps: [
        'Số chỉ của cân tăng thêm do lực từ tác dụng lên dây: $F = \\Delta m \\cdot g = 2{,}0 \\cdot 10^{-3} \\cdot 9{,}8 = 1{,}96 \\cdot 10^{-2}$ N.',
        'Dây vuông góc với đường sức nên $\\sin\\alpha = 1$: $B = \\dfrac{F}{IL} = \\dfrac{1{,}96 \\cdot 10^{-2}}{4 \\cdot 0{,}05}$.',
        '$B = 0{,}098$ T.',
      ],
      answer: '$B \\approx 0{,}098$ T.',
    },
    {
      problem:
        'Một khung dây phẳng diện tích $40$ cm² đặt trong từ trường đều $B = 0{,}1$ T; mặt phẳng khung hợp với các đường sức từ góc $30^\\circ$. Tính từ thông qua khung.',
      steps: [
        'Góc giữa pháp tuyến và $\\vec{B}$: $\\alpha = 90^\\circ - 30^\\circ = 60^\\circ$.',
        '$S = 40$ cm² $= 4 \\cdot 10^{-3}$ m².',
        '$\\Phi = BS\\cos\\alpha = 0{,}1 \\cdot 4 \\cdot 10^{-3} \\cdot 0{,}5 = 2 \\cdot 10^{-4}$ Wb.',
      ],
      answer: '$\\Phi = 2 \\cdot 10^{-4}$ Wb.',
    },
    {
      problem:
        'Thanh dẫn $MN$ dài $0{,}5$ m trượt đều với vận tốc $2$ m/s trên hai thanh ray nằm ngang nối kín qua điện trở $R = 0{,}5\\ \\Omega$ (bỏ qua điện trở thanh và ray). Từ trường đều $B = 0{,}2$ T vuông góc với mặt phẳng ray. Tính cường độ dòng điện trong mạch và lực từ tác dụng lên thanh.',
      steps: [
        'Suất điện động cảm ứng: $|e_c| = Blv = 0{,}2 \\cdot 0{,}5 \\cdot 2 = 0{,}2$ V.',
        'Cường độ dòng điện: $I = \\dfrac{|e_c|}{R} = \\dfrac{0{,}2}{0{,}5} = 0{,}4$ A.',
        'Thanh vuông góc với $\\vec{B}$ nên lực từ $F = BIl = 0{,}2 \\cdot 0{,}4 \\cdot 0{,}5 = 0{,}04$ N. Theo định luật Lenz, lực này ngược chiều chuyển động, cản trở thanh.',
      ],
      answer: '$I = 0{,}4$ A; $F = 0{,}04$ N, ngược chiều chuyển động của thanh.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Một khung dây hình chữ nhật mang dòng điện đặt trong từ trường đều, mặt phẳng khung vuông góc với các đường sức từ; $\\vec{B}$ hướng ra khỏi mặt phẳng hình vẽ và dòng điện chạy ngược chiều kim đồng hồ. Lực từ tác dụng lên khung',
      options: [
        'có xu hướng kéo dãn khung, không làm khung quay',
        'có xu hướng nén khung lại',
        'làm khung quay quanh một cạnh',
        'bằng 0 trên mọi cạnh của khung',
      ],
      answer: 0,
      hints: [
        'Dùng quy tắc bàn tay trái cho từng cạnh: lực từ nằm trong mặt phẳng khung, vuông góc với cạnh.',
        'Thử với cạnh bên phải: dòng điện chạy lên trên, $\\vec{B}$ hướng ra.',
      ],
      solution:
        'Với cạnh bên phải, dòng điện chạy lên, $\\vec{B}$ hướng ra: lực từ hướng sang phải, ra ngoài khung. Tương tự, lực trên mọi cạnh đều nằm trong mặt phẳng khung và hướng ra ngoài; các lực trên hai cạnh đối diện cùng giá, ngược chiều nên không tạo ra mômen quay. Lực từ kéo dãn khung.',
    },
    {
      type: 'number',
      prompt:
        'Một đoạn dây dẫn dài $20$ cm mang dòng điện $5$ A đặt trong từ trường đều $B = 0{,}4$ T, dây hợp với các đường sức từ góc $30^\\circ$. Lực từ tác dụng lên đoạn dây bằng bao nhiêu niutơn?',
      answer: 0.2,
      unit: 'N',
      hints: ['$F = BIL\\sin\\alpha$, với $L$ tính bằng mét.'],
      solution:
        '$F = 0{,}4 \\cdot 5 \\cdot 0{,}2 \\cdot \\sin 30^\\circ = 0{,}4 \\cdot 5 \\cdot 0{,}2 \\cdot 0{,}5 = 0{,}2$ N.',
    },
    {
      type: 'number',
      prompt:
        'Một đoạn dây dẫn dài $5$ cm đặt vuông góc với các đường sức của một từ trường đều. Khi dòng điện qua dây là $3$ A thì lực từ tác dụng lên dây là $0{,}03$ N. Cảm ứng từ bằng bao nhiêu tesla?',
      answer: 0.2,
      unit: 'T',
      hints: ['Dây vuông góc với đường sức: $B = \\dfrac{F}{IL}$.'],
      solution: '$B = \\dfrac{0{,}03}{3 \\cdot 0{,}05} = 0{,}2$ T.',
    },
    {
      type: 'number',
      prompt:
        'Trong thí nghiệm đo cảm ứng từ bằng cân điện tử, đoạn dây dài $4{,}0$ cm nằm ngang, vuông góc với đường sức từ. Khi cho dòng điện $5{,}0$ A chạy qua dây, số chỉ của cân tăng thêm $2{,}0$ g. Lấy $g = 9{,}8$ m/s². Cảm ứng từ bằng bao nhiêu tesla?',
      answer: 0.098,
      tolerance: 0.001,
      unit: 'T',
      hints: [
        'Phần số chỉ tăng thêm của cân ứng với lực từ: $F = \\Delta m \\cdot g$, với $\\Delta m$ tính bằng kg.',
        'Sau đó $B = \\dfrac{F}{IL}$.',
      ],
      solution:
        '$F = 2{,}0 \\cdot 10^{-3} \\cdot 9{,}8 = 1{,}96 \\cdot 10^{-2}$ N, nên $B = \\dfrac{1{,}96 \\cdot 10^{-2}}{5{,}0 \\cdot 0{,}04} = 0{,}098$ T.',
    },
    {
      type: 'number',
      prompt:
        'Một khung dây phẳng diện tích $50$ cm² đặt trong từ trường đều $B = 0{,}2$ T; mặt phẳng khung hợp với các đường sức từ góc $30^\\circ$. Từ thông qua khung bằng bao nhiêu mWb?',
      answer: 0.5,
      unit: 'mWb',
      hints: [
        'Góc $30^\\circ$ là góc giữa mặt phẳng khung và $\\vec{B}$, nên $\\alpha = 60^\\circ$.',
        'Đổi $50$ cm² $= 5 \\cdot 10^{-3}$ m².',
      ],
      solution:
        '$\\Phi = 0{,}2 \\cdot 5 \\cdot 10^{-3} \\cdot \\cos 60^\\circ = 5 \\cdot 10^{-4}$ Wb $= 0{,}5$ mWb.',
    },
    {
      type: 'choice',
      prompt:
        'Một vòng dây kín nằm trong mặt phẳng hình vẽ, đặt trong từ trường đều có $\\vec{B}$ hướng vào mặt phẳng hình vẽ. Cho cảm ứng từ giảm dần. Nhìn từ phía người đọc, dòng điện cảm ứng trong vòng dây',
      options: [
        'chạy cùng chiều kim đồng hồ',
        'chạy ngược chiều kim đồng hồ',
        'không xuất hiện',
        'đổi chiều liên tục',
      ],
      answer: 0,
      hints: [
        'Từ thông giảm thì từ trường cảm ứng cùng chiều hay ngược chiều $\\vec{B}$?',
        'Dùng quy tắc nắm tay phải với ngón cái hướng vào mặt phẳng hình vẽ.',
      ],
      solution:
        'Từ thông giảm nên $\\vec{B}_c$ cùng chiều $\\vec{B}$, tức là hướng vào mặt phẳng hình vẽ. Ngón cái tay phải hướng vào trang giấy thì các ngón tay khum theo chiều kim đồng hồ.',
    },
    {
      type: 'number',
      prompt:
        'Một cuộn dây $200$ vòng, mỗi vòng diện tích $50$ cm², đặt trong từ trường đều có $\\vec{B}$ vuông góc với mặt phẳng các vòng dây. Cảm ứng từ tăng đều từ $0{,}2$ T lên $0{,}8$ T trong $0{,}05$ s. Độ lớn suất điện động cảm ứng trong cuộn dây bằng bao nhiêu vôn?',
      answer: 12,
      unit: 'V',
      hints: [
        'Độ biến thiên từ thông qua một vòng: $\\Delta\\Phi = \\Delta B \\cdot S$.',
        '$|e_c| = N\\dfrac{\\Delta\\Phi}{\\Delta t}$.',
      ],
      solution:
        '$\\Delta\\Phi = 0{,}6 \\cdot 5 \\cdot 10^{-3} = 3 \\cdot 10^{-3}$ Wb, nên $|e_c| = 200 \\cdot \\dfrac{3 \\cdot 10^{-3}}{0{,}05} = 12$ V.',
    },
    {
      type: 'number',
      prompt:
        'Một cuộn dây $200$ vòng có điện trở $4\\ \\Omega$, hai đầu nối kín. Mỗi vòng diện tích $50$ cm², $\\vec{B}$ vuông góc với mặt phẳng các vòng; cảm ứng từ tăng đều từ $0{,}2$ T lên $0{,}8$ T trong $0{,}05$ s. Cường độ dòng điện cảm ứng bằng bao nhiêu ampe?',
      answer: 3,
      unit: 'A',
      hints: ['Tính $|e_c|$ trước, rồi $i_c = \\dfrac{|e_c|}{R}$.'],
      solution:
        '$|e_c| = 200 \\cdot \\dfrac{0{,}6 \\cdot 5 \\cdot 10^{-3}}{0{,}05} = 12$ V, nên $i_c = \\dfrac{12}{4} = 3$ A.',
    },
    {
      type: 'number',
      prompt:
        'Thanh dẫn dài $0{,}4$ m trượt đều với vận tốc $5$ m/s trên hai thanh ray nối kín qua điện trở $2\\ \\Omega$ (bỏ qua điện trở thanh và ray), vuông góc với đường sức của từ trường đều $B = 0{,}5$ T. Lực từ tác dụng lên thanh bằng bao nhiêu niutơn?',
      answer: 0.1,
      unit: 'N',
      hints: ['$|e_c| = Blv$, rồi $I = \\dfrac{|e_c|}{R}$.', 'Lực từ lên thanh: $F = BIl$.'],
      solution:
        '$|e_c| = 0{,}5 \\cdot 0{,}4 \\cdot 5 = 1$ V; $I = \\dfrac{1}{2} = 0{,}5$ A; $F = 0{,}5 \\cdot 0{,}5 \\cdot 0{,}4 = 0{,}1$ N.',
    },
    {
      type: 'number',
      prompt:
        'Khung dây của một máy phát điện xoay chiều có $100$ vòng, mỗi vòng diện tích $200$ cm², quay đều với tốc độ $50$ vòng/s trong từ trường đều $B = 0{,}2$ T quanh trục vuông góc với đường sức. Suất điện động cực đại $E_0$ bằng bao nhiêu vôn (làm tròn đến một chữ số thập phân)?',
      answer: 125.7,
      tolerance: 0.1,
      unit: 'V',
      hints: ['$\\omega = 2\\pi f$ với $f = 50$ Hz.', '$E_0 = NBS\\omega$, với $S$ tính bằng m².'],
      solution:
        '$\\omega = 2\\pi \\cdot 50 = 100\\pi$ rad/s; $E_0 = 100 \\cdot 0{,}2 \\cdot 0{,}02 \\cdot 100\\pi = 40\\pi \\approx 125{,}7$ V.',
    },
    {
      type: 'number',
      prompt:
        'Một máy biến áp lí tưởng có cuộn sơ cấp $1\\,000$ vòng, cuộn thứ cấp $50$ vòng. Đặt vào cuộn sơ cấp điện áp xoay chiều hiệu dụng $220$ V. Điện áp hiệu dụng ở hai đầu cuộn thứ cấp để hở bằng bao nhiêu vôn?',
      answer: 11,
      unit: 'V',
      hints: ['$\\dfrac{U_1}{U_2} = \\dfrac{N_1}{N_2}$.'],
      solution: '$U_2 = U_1\\dfrac{N_2}{N_1} = 220 \\cdot \\dfrac{50}{1\\,000} = 11$ V.',
    },
    {
      type: 'number',
      prompt:
        'Máy biến áp lí tưởng hạ điện áp từ $220$ V xuống $11$ V. Khi cuộn thứ cấp cấp dòng điện hiệu dụng $4$ A cho tải, cường độ dòng điện hiệu dụng trong cuộn sơ cấp bằng bao nhiêu ampe?',
      answer: 0.2,
      unit: 'A',
      hints: ['Máy lí tưởng: công suất hai cuộn bằng nhau, $U_1I_1 = U_2I_2$.'],
      solution: '$I_1 = \\dfrac{U_2I_2}{U_1} = \\dfrac{11 \\cdot 4}{220} = 0{,}2$ A.',
    },
    {
      type: 'number',
      prompt:
        'Một nhà máy truyền đi công suất $100$ kW ở điện áp $10$ kV trên đường dây có điện trở tổng cộng $10\\ \\Omega$ (hệ số công suất bằng 1). Công suất hao phí trên đường dây bằng bao nhiêu kW?',
      answer: 1,
      unit: 'kW',
      hints: ['$\\Delta P = \\dfrac{P^2R}{U^2}$, với $P$ tính bằng W và $U$ bằng V.'],
      solution: '$\\Delta P = \\dfrac{(10^5)^2 \\cdot 10}{(10^4)^2} = 10^3$ W $= 1$ kW.',
    },
    {
      type: 'choice',
      prompt:
        'Giữ nguyên công suất truyền đi và đường dây, tăng điện áp truyền tải lên $10$ lần thì công suất hao phí trên đường dây',
      options: ['giảm $100$ lần', 'giảm $10$ lần', 'tăng $10$ lần', 'không đổi'],
      answer: 0,
      hints: ['$\\Delta P$ tỉ lệ nghịch với $U^2$.'],
      solution:
        '$\\Delta P = \\dfrac{P^2R}{U^2}$: $U$ tăng $10$ lần thì $\\Delta P$ giảm $10^2 = 100$ lần.',
    },
  ],
  takeaways: [
    'Lực từ: $F = BIL\\sin\\alpha$, chiều theo quy tắc bàn tay trái; dây vuông góc với đường sức thì $B = \\dfrac{F}{IL}$.',
    'Từ thông $\\Phi = NBS\\cos\\alpha$, với $\\alpha$ là góc giữa pháp tuyến và $\\vec{B}$.',
    'Chiều dòng điện cảm ứng: định luật Lenz rồi quy tắc nắm tay phải; độ lớn: $|e_c| = N\\dfrac{|\\Delta\\Phi|}{\\Delta t}$, thanh trượt $|e_c| = Blv$.',
    'Máy phát điện: $E_0 = NBS\\omega$; máy biến áp lí tưởng: $\\dfrac{U_1}{U_2} = \\dfrac{N_1}{N_2}$, $U_1I_1 = U_2I_2$; hao phí truyền tải $\\Delta P = \\dfrac{P^2R}{U^2}$.',
  ],
};
