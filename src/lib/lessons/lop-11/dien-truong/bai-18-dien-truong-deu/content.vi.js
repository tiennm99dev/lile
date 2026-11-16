/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Điện trường đều có vectơ cường độ điện trường như nhau tại mọi điểm, đường sức là những đường thẳng song song cách đều. Giữa hai bản phẳng song song tích điện trái dấu, cách nhau d, có hiệu điện thế U là điện trường đều với E = U/d. Điện tích bay vào vuông góc với đường sức chuyển động giống vật ném ngang: thẳng đều dọc theo bản, nhanh dần đều với gia tốc a = |q|E/m theo phương đường sức, quỹ đạo là một phần parabol.',
  intro:
    'Trong ống phóng điện tử của máy hiện sóng hay chiếc ti vi đời cũ, một chùm electron được bắn ra và lái tới đúng điểm cần sáng trên màn hình. Người ta lái chùm electron bằng cách cho nó bay qua giữa hai tấm kim loại phẳng đặt song song và nối với một nguồn điện.',
  objectives: [
    'Nêu được điện trường đều là gì và mô tả được đường sức của điện trường đều.',
    'Vận dụng được $E = \\dfrac{U}{d}$ cho điện trường giữa hai bản phẳng song song.',
    'Mô tả được chuyển động của điện tích bay vào điện trường đều theo phương vuông góc với đường sức và tính được gia tốc, thời gian bay, độ lệch.',
  ],
  sections: [
    {
      heading: 'Điện trường đều',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Điện trường đều',
          text: 'Điện trường đều là điện trường mà vectơ cường độ điện trường tại mọi điểm đều có cùng phương, cùng chiều và cùng độ lớn. Đường sức của điện trường đều là những đường thẳng song song, cách đều nhau.',
        },
        {
          type: 'p',
          text: 'Đặt hai tấm kim loại phẳng song song, kích thước lớn so với khoảng cách giữa chúng, rồi nối với hai cực của một nguồn điện: hai bản tích điện trái dấu, độ lớn bằng nhau. Điện trường giữa hai bản (trừ vùng gần mép) là điện trường đều, đường sức vuông góc với hai bản và hướng từ bản dương sang bản âm.',
        },
      ],
    },
    {
      heading: 'Cường độ điện trường giữa hai bản phẳng',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Liên hệ giữa E và U',
          text: 'Hai bản phẳng song song cách nhau $d$, hiệu điện thế giữa hai bản là $U$. Cường độ điện trường giữa hai bản: $$E = \\dfrac{U}{d}.$$ Với $U$ đo bằng V, $d$ đo bằng m thì $E$ có đơn vị V/m.',
        },
        {
          type: 'p',
          text: 'Công thức cho thấy vì sao đơn vị của cường độ điện trường là vôn trên mét: giữ nguyên hiệu điện thế mà đưa hai bản lại gần nhau một nửa thì điện trường mạnh gấp đôi.',
        },
      ],
    },
    {
      heading: 'Chuyển động của điện tích trong điện trường đều',
      blocks: [
        {
          type: 'p',
          text: 'Một hạt mang điện $q$, khối lượng $m$ bay vào điện trường đều với vận tốc $\\vec v_0$ vuông góc với đường sức. Bỏ qua trọng lực (rất nhỏ so với lực điện), hạt chỉ chịu lực điện $\\vec F = q\\vec E$ không đổi, vuông góc với $\\vec v_0$. Chọn trục $Ox$ theo $\\vec v_0$, trục $Oy$ theo phương của lực điện.',
        },
        {
          type: 'list',
          items: [
            'Theo $Ox$: không có lực, hạt chuyển động thẳng đều, $x = v_0t$.',
            'Theo $Oy$: hạt chuyển động nhanh dần đều không vận tốc đầu với gia tốc $a = \\dfrac{|q|E}{m}$, $y = \\dfrac{at^2}{2}$.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quỹ đạo parabol',
          text: 'Khử $t$: $$y = \\dfrac{|q|E}{2mv_0^2}x^2.$$ Quỹ đạo là một phần đường parabol, giống chuyển động của vật bị ném ngang trong trường trọng lực. Hạt mang điện dương lệch về phía bản âm, hạt mang điện âm (electron) lệch về phía bản dương.',
        },
        {
          type: 'p',
          text: 'Nếu hai bản dài $\\ell$ và hạt không chạm bản, hạt ở giữa hai bản trong thời gian $t = \\dfrac{\\ell}{v_0}$ rồi bay ra theo đường thẳng. Hạt chạm bản khi độ lệch đạt tới khoảng cách từ đường bay ban đầu tới bản (bằng $\\dfrac{d}{2}$ khi hạt bay vào chính giữa).',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ứng dụng',
          text: 'Ống phóng điện tử của máy hiện sóng dùng hai cặp bản lệch để lái chùm electron theo phương ngang và phương dọc. Máy in phun tĩnh điện cho các giọt mực tích điện bay qua điện trường đều để lái chúng tới đúng vị trí trên giấy.',
        },
      ],
    },
  ],
  explore: {
    title: 'Lái chùm electron',
    instruction:
      'Chỉnh hiệu điện thế $U$, khoảng cách $d$ và vận tốc $v_0$, bấm “Bắn electron” để xem quỹ đạo. Đổi cực của hai bản: electron luôn lệch về bản nào?',
  },
  examples: [
    {
      problem:
        'Hai bản kim loại phẳng song song cách nhau $4$ mm, nối với nguồn có hiệu điện thế $12$ V. Tính cường độ điện trường giữa hai bản và lực điện tác dụng lên một electron ở giữa hai bản.',
      steps: [
        '$d = 4$ mm $= 4 \\cdot 10^{-3}$ m. $E = \\dfrac{U}{d} = \\dfrac{12}{4 \\cdot 10^{-3}} = 3\\,000$ V/m.',
        '$F = eE = 1{,}6 \\cdot 10^{-19} \\cdot 3\\,000 = 4{,}8 \\cdot 10^{-16}$ N.',
        'Electron mang điện âm nên lực hướng về phía bản dương, ngược chiều đường sức.',
      ],
      answer: '$E = 3\\,000$ V/m; $F = 4{,}8 \\cdot 10^{-16}$ N, hướng về bản dương.',
    },
    {
      problem:
        'Electron bay vào chính giữa hai bản phẳng dài $\\ell = 5$ cm, cách nhau $d = 2$ cm, với vận tốc $v_0 = 3 \\cdot 10^7$ m/s song song với hai bản. Hiệu điện thế giữa hai bản là $100$ V. Electron có ra khỏi hai bản không? Nếu có, nó lệch bao nhiêu? Cho $e = 1{,}6 \\cdot 10^{-19}$ C, $m = 9{,}1 \\cdot 10^{-31}$ kg.',
      steps: [
        '$E = \\dfrac{U}{d} = \\dfrac{100}{0{,}02} = 5\\,000$ V/m.',
        '$a = \\dfrac{eE}{m} = \\dfrac{1{,}6 \\cdot 10^{-19} \\cdot 5\\,000}{9{,}1 \\cdot 10^{-31}} \\approx 8{,}79 \\cdot 10^{14}$ m/s².',
        'Thời gian bay qua hai bản: $t = \\dfrac{\\ell}{v_0} = \\dfrac{0{,}05}{3 \\cdot 10^7} \\approx 1{,}67 \\cdot 10^{-9}$ s.',
        'Độ lệch: $y = \\dfrac{at^2}{2} \\approx \\dfrac{8{,}79 \\cdot 10^{14} \\cdot (1{,}67 \\cdot 10^{-9})^2}{2} \\approx 1{,}22 \\cdot 10^{-3}$ m $\\approx 1{,}22$ mm.',
        '$y < \\dfrac{d}{2} = 1$ cm nên electron không chạm bản.',
      ],
      answer: 'Electron ra khỏi hai bản, lệch khoảng $1{,}22$ mm về phía bản dương.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Điện trường đều là điện trường có',
      options: [
        'vectơ cường độ điện trường tại mọi điểm cùng phương, cùng chiều và cùng độ lớn',
        'độ lớn cường độ điện trường như nhau tại mọi điểm, còn hướng có thể khác nhau',
        'đường sức là những đường tròn đồng tâm',
        'cường độ điện trường giảm đều theo khoảng cách',
      ],
      answer: 0,
      hints: ['“Đều” nghĩa là vectơ $\\vec E$ hoàn toàn giống nhau ở mọi nơi.'],
      solution:
        'Điện trường đều có $\\vec E$ như nhau (cùng phương, chiều, độ lớn) tại mọi điểm; đường sức là các đường thẳng song song cách đều.',
    },
    {
      type: 'number',
      prompt:
        'Hai bản phẳng song song cách nhau $4$ cm, hiệu điện thế giữa hai bản là $200$ V. Tính cường độ điện trường giữa hai bản (theo V/m).',
      answer: 5000,
      unit: 'V/m',
      tolerance: 0.5,
      hints: ['Đổi $d$ ra mét rồi dùng $E = \\dfrac{U}{d}$.'],
      solution: '$E = \\dfrac{200}{0{,}04} = 5\\,000$ V/m.',
    },
    {
      type: 'number',
      prompt:
        'Điện trường đều giữa hai bản phẳng cách nhau $2$ cm có cường độ $2 \\cdot 10^4$ V/m. Tính hiệu điện thế giữa hai bản (theo V).',
      answer: 400,
      unit: 'V',
      tolerance: 0.01,
      hints: ['Từ $E = \\dfrac{U}{d}$ suy ra $U = Ed$.'],
      solution: '$U = Ed = 2 \\cdot 10^4 \\cdot 0{,}02 = 400$ V.',
    },
    {
      type: 'choice',
      prompt:
        'Giữ nguyên hiệu điện thế giữa hai bản phẳng, giảm khoảng cách giữa hai bản đi một nửa thì cường độ điện trường giữa hai bản',
      options: ['tăng gấp đôi', 'giảm một nửa', 'tăng gấp bốn', 'không đổi'],
      answer: 0,
      hints: ['$E = \\dfrac{U}{d}$ tỉ lệ nghịch với $d$.'],
      solution: '$E = \\dfrac{U}{d}$: $d$ giảm $2$ lần thì $E$ tăng $2$ lần.',
    },
    {
      type: 'choice',
      prompt:
        'Một electron bay vào điện trường đều giữa hai bản phẳng với vận tốc vuông góc với đường sức. Bỏ qua trọng lực. Quỹ đạo của electron giữa hai bản là',
      options: [
        'một phần parabol, cong về phía bản dương',
        'một phần parabol, cong về phía bản âm',
        'đường thẳng song song với hai bản',
        'một cung tròn',
      ],
      answer: 0,
      hints: [
        'Lực điện không đổi và vuông góc với vận tốc ban đầu: giống chuyển động nào đã học?',
        'Electron mang điện âm: lực điện cùng hay ngược chiều đường sức?',
      ],
      solution:
        'Lực điện không đổi, vuông góc với $\\vec v_0$ nên electron chuyển động như vật ném ngang, quỹ đạo là parabol; electron mang điện âm nên bị hút về bản dương.',
    },
    {
      type: 'number',
      prompt:
        'Một proton ($q = 1{,}6 \\cdot 10^{-19}$ C, $m = 1{,}67 \\cdot 10^{-27}$ kg) nằm trong điện trường đều $E = 1\\,000$ V/m. Bỏ qua trọng lực. Gia tốc của proton viết dưới dạng $x \\cdot 10^{10}$ m/s²; nhập $x$ (làm tròn đến hàng phần trăm).',
      answer: 9.58,
      tolerance: 0.006,
      hints: ['$a = \\dfrac{F}{m} = \\dfrac{qE}{m}$.'],
      solution:
        '$a = \\dfrac{1{,}6 \\cdot 10^{-19} \\cdot 1\\,000}{1{,}67 \\cdot 10^{-27}} \\approx 9{,}58 \\cdot 10^{10}$ m/s².',
    },
    {
      type: 'number',
      prompt:
        'Electron bay vào chính giữa hai bản phẳng dài $4$ cm, cách nhau $2$ cm, với $v_0 = 2 \\cdot 10^7$ m/s song song với hai bản; hiệu điện thế giữa hai bản là $91$ V. Tính độ lệch của electron khi ra khỏi hai bản (theo mm). Cho $e = 1{,}6 \\cdot 10^{-19}$ C, $m = 9{,}1 \\cdot 10^{-31}$ kg.',
      answer: 1.6,
      unit: 'mm',
      tolerance: 0.01,
      hints: [
        'Tính $E = \\dfrac{U}{d}$, rồi $a = \\dfrac{eE}{m}$.',
        'Thời gian bay $t = \\dfrac{\\ell}{v_0}$, độ lệch $y = \\dfrac{at^2}{2}$.',
      ],
      solution:
        '$E = \\dfrac{91}{0{,}02} = 4\\,550$ V/m; $a = \\dfrac{1{,}6 \\cdot 10^{-19} \\cdot 4\\,550}{9{,}1 \\cdot 10^{-31}} = 8 \\cdot 10^{14}$ m/s²; $t = \\dfrac{0{,}04}{2 \\cdot 10^7} = 2 \\cdot 10^{-9}$ s; $y = \\dfrac{8 \\cdot 10^{14} \\cdot 4 \\cdot 10^{-18}}{2} = 1{,}6 \\cdot 10^{-3}$ m $= 1{,}6$ mm (nhỏ hơn $1$ cm nên electron không chạm bản).',
    },
    {
      type: 'number',
      prompt:
        'Một giọt dầu tích điện âm, khối lượng $4{,}8 \\cdot 10^{-15}$ kg, lơ lửng đứng yên giữa hai bản kim loại nằm ngang cách nhau $1$ cm, hiệu điện thế giữa hai bản là $300$ V. Lấy $g = 10$ m/s². Giọt dầu thừa bao nhiêu electron?',
      answer: 10,
      tolerance: 0.01,
      hints: [
        'Giọt dầu đứng yên: lực điện cân bằng với trọng lực, $|q|E = mg$.',
        'Số electron thừa là $\\dfrac{|q|}{e}$.',
      ],
      solution:
        '$E = \\dfrac{300}{0{,}01} = 3 \\cdot 10^4$ V/m; $|q| = \\dfrac{mg}{E} = \\dfrac{4{,}8 \\cdot 10^{-14}}{3 \\cdot 10^4} = 1{,}6 \\cdot 10^{-18}$ C; số electron thừa $n = \\dfrac{1{,}6 \\cdot 10^{-18}}{1{,}6 \\cdot 10^{-19}} = 10$.',
    },
  ],
  takeaways: [
    'Điện trường đều có $\\vec E$ như nhau tại mọi điểm; đường sức là các đường thẳng song song cách đều.',
    'Giữa hai bản phẳng song song: $E = \\dfrac{U}{d}$, đường sức hướng từ bản dương sang bản âm.',
    'Điện tích bay vào vuông góc với đường sức: thẳng đều theo $\\vec v_0$, nhanh dần đều với $a = \\dfrac{|q|E}{m}$ theo đường sức; quỹ đạo là một phần parabol.',
  ],
};
