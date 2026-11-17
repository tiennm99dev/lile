/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhiệt nóng chảy riêng λ của một chất là nhiệt lượng cần để làm cho 1 kg chất đó chuyển hoàn toàn từ thể rắn sang thể lỏng ở nhiệt độ nóng chảy, đơn vị J/kg. Nhiệt lượng làm nóng chảy hoàn toàn khối lượng m là Q = λm; trong khi nóng chảy nhiệt độ không đổi. Đo λ của nước đá bằng nhiệt lượng kế có dây điện trở và oát kế: λ = P(τ2 − τ1)/m.',
  intro:
    'Một thùng nước đá giữ lạnh đồ ăn được cả ngày dù trời nóng, còn để làm tan một khối nước đá ta phải đun khá lâu mà nhiệt kế cứ đứng yên ở $0$ °C. Nhiệt lượng đun vào đã đi đâu, và cần bao nhiêu để làm tan hết nước đá?',
  objectives: [
    'Nêu được định nghĩa nhiệt nóng chảy riêng và đơn vị J/kg.',
    'Vận dụng được $Q = \\lambda m$, kết hợp với $Q = mc\\Delta T$ cho quá trình vừa nóng lên vừa nóng chảy.',
    'Giải thích được vì sao nhiệt độ không đổi khi nóng chảy; mô tả được thí nghiệm đo nhiệt nóng chảy riêng của nước đá.',
  ],
  sections: [
    {
      heading: 'Nhiệt nóng chảy riêng',
      blocks: [
        {
          type: 'p',
          text: 'Khi một chất rắn kết tinh đã đạt tới nhiệt độ nóng chảy, muốn nó nóng chảy hoàn toàn ta vẫn phải tiếp tục cung cấp nhiệt lượng. Trong suốt quá trình nóng chảy, nhiệt độ của chất không đổi: nhiệt lượng nhận vào dùng để phá vỡ cấu trúc mạng tinh thể chứ không làm các phân tử chuyển động nhanh hơn.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Nhiệt nóng chảy riêng',
          text: 'Nhiệt nóng chảy riêng $\\lambda$ của một chất là nhiệt lượng cần để làm cho $1$ kg chất đó chuyển hoàn toàn từ thể rắn sang thể lỏng ở nhiệt độ nóng chảy. Đơn vị là jun trên kilôgam (J/kg).',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhiệt lượng nóng chảy',
          text: 'Nhiệt lượng cần cung cấp để làm nóng chảy hoàn toàn một khối chất rắn khối lượng $m$ ở nhiệt độ nóng chảy: $$Q = \\lambda m.$$ Khi khối chất lỏng đó đông đặc ở cùng nhiệt độ, nó toả ra nhiệt lượng đúng bằng $\\lambda m$.',
        },
        {
          type: 'table',
          head: ['Chất', 'Nhiệt độ nóng chảy (°C)', '$\\lambda$ (J/kg)'],
          rows: [
            ['Nước đá', '$0$', '$3{,}34 \\cdot 10^{5}$'],
            ['Nhôm', '$660$', '$3{,}97 \\cdot 10^{5}$'],
            ['Sắt', '$1\\,535$', '$2{,}77 \\cdot 10^{5}$'],
            ['Đồng', '$1\\,084$', '$1{,}80 \\cdot 10^{5}$'],
            ['Chì', '$327$', '$0{,}25 \\cdot 10^{5}$'],
          ],
          caption:
            'Nhiệt độ nóng chảy và nhiệt nóng chảy riêng của một số chất ở áp suất tiêu chuẩn.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Quá trình nhiều giai đoạn',
          text: 'Đun nước đá ở $t_1 < 0$ °C thành nước ở $t_2 > 0$ °C cần tổng nhiệt lượng của ba giai đoạn: $$Q = m c_{\\text{đá}}(0 - t_1) + \\lambda m + m c_{\\text{nước}}(t_2 - 0).$$',
        },
      ],
    },
    {
      heading: 'Thí nghiệm đo nhiệt nóng chảy riêng của nước đá',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Dụng cụ: biến thế nguồn; oát kế có đo thời gian; nhiệt kế điện tử; nhiệt lượng kế có vỏ cách nhiệt, kèm dây điện trở và que khuấy; cân điện tử; nước đá viên nhỏ đang tan.',
            'Cho nước đá vào nhiệt lượng kế, cân khối lượng $m$ của nước đá. Cắm nhiệt kế vào giữa các viên đá.',
            'Bật nguồn cho dây điện trở đun nóng, khuấy liên tục. Cứ sau những khoảng thời gian bằng nhau, ghi công suất $P$ và nhiệt độ $t$.',
            'Vẽ đồ thị nhiệt độ theo thời gian: đoạn nằm ngang ở $0$ °C ứng với lúc nước đá đang tan. Ghi thời điểm $\\tau_1$ bắt đầu và $\\tau_2$ kết thúc đoạn nằm ngang (nước đá vừa tan hết, nhiệt độ bắt đầu tăng).',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Xử lí số liệu',
          text: 'Bỏ qua hao phí, nhiệt lượng dây điện trở cung cấp trong thời gian nước đá tan bằng nhiệt lượng làm nóng chảy nước đá: $P(\\tau_2 - \\tau_1) = \\lambda m$, nên $$\\lambda = \\dfrac{P(\\tau_2 - \\tau_1)}{m}.$$',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lưu ý',
          text: 'Chỉ đo nhiệt độ thì chỉ biết được nhiệt độ nóng chảy, không biết $\\lambda$: phải đo được nhiệt lượng (qua $P$ và thời gian) và khối lượng nước đá. Nhiệt lượng từ môi trường truyền vào cũng làm nước đá tan, nên kết quả có sai số.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đun nóng nước đá',
    instruction:
      'Chọn khối lượng, nhiệt độ đầu của nước đá và công suất dây đun, rồi đun. Quan sát đoạn nằm ngang ở $0$ °C; đánh dấu thời điểm $\\tau_1$ bắt đầu tan và $\\tau_2$ tan hết để tính $\\lambda = \\dfrac{P(\\tau_2 - \\tau_1)}{m}$.',
  },
  examples: [
    {
      problem:
        'Tính nhiệt lượng cần cung cấp để làm nóng chảy hoàn toàn $2$ kg nước đá ở $0$ °C. Cho $\\lambda = 3{,}34 \\cdot 10^{5}$ J/kg.',
      steps: [
        'Nước đá đã ở nhiệt độ nóng chảy nên chỉ cần nhiệt lượng nóng chảy.',
        '$Q = \\lambda m = 3{,}34 \\cdot 10^{5} \\cdot 2 = 6{,}68 \\cdot 10^{5}$ J.',
      ],
      answer: '$Q = 6{,}68 \\cdot 10^{5}$ J $= 668$ kJ.',
    },
    {
      problem:
        'Tính nhiệt lượng cần để biến $0{,}5$ kg nước đá ở $-10$ °C thành nước ở $20$ °C. Cho $c_{\\text{đá}} = 2\\,100$ J/kg.K, $c_{\\text{nước}} = 4\\,200$ J/kg.K, $\\lambda = 3{,}34 \\cdot 10^{5}$ J/kg.',
      steps: [
        'Làm nóng nước đá từ $-10$ °C đến $0$ °C: $Q_1 = 0{,}5 \\cdot 2\\,100 \\cdot 10 = 10\\,500$ J.',
        'Làm tan hoàn toàn ở $0$ °C: $Q_2 = \\lambda m = 3{,}34 \\cdot 10^{5} \\cdot 0{,}5 = 167\\,000$ J.',
        'Làm nóng nước từ $0$ °C đến $20$ °C: $Q_3 = 0{,}5 \\cdot 4\\,200 \\cdot 20 = 42\\,000$ J.',
        '$Q = Q_1 + Q_2 + Q_3 = 10\\,500 + 167\\,000 + 42\\,000 = 219\\,500$ J.',
      ],
      answer:
        '$Q = 219\\,500$ J $\\approx 2{,}2 \\cdot 10^{5}$ J; phần nóng chảy chiếm nhiều nhất.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Nhiệt nóng chảy riêng của một chất là nhiệt lượng cần để',
      options: [
        'làm cho $1$ kg chất đó chuyển hoàn toàn từ thể rắn sang thể lỏng ở nhiệt độ nóng chảy',
        'làm cho $1$ kg chất đó tăng thêm $1$ K',
        'làm cho $1$ kg chất đó đạt tới nhiệt độ nóng chảy',
        'làm cho $1$ kg chất lỏng chuyển hoàn toàn thành hơi',
      ],
      answer: 0,
      hints: [
        'Phân biệt với nhiệt dung riêng (làm tăng nhiệt độ) và nhiệt hoá hơi riêng (lỏng → khí).',
      ],
      solution:
        'Nhiệt nóng chảy riêng $\\lambda$: nhiệt lượng làm $1$ kg chất chuyển hoàn toàn từ rắn sang lỏng ở nhiệt độ nóng chảy, đơn vị J/kg.',
    },
    {
      type: 'number',
      prompt:
        'Tính nhiệt lượng cần để làm nóng chảy hoàn toàn $0{,}2$ kg nhôm đang ở nhiệt độ nóng chảy $660$ °C (theo kJ). Cho $\\lambda = 3{,}97 \\cdot 10^{5}$ J/kg.',
      answer: 79.4,
      unit: 'kJ',
      tolerance: 0.05,
      hints: ['Nhôm đã ở nhiệt độ nóng chảy: $Q = \\lambda m$.'],
      solution: '$Q = 3{,}97 \\cdot 10^{5} \\cdot 0{,}2 = 79\\,400$ J $= 79{,}4$ kJ.',
    },
    {
      type: 'number',
      prompt:
        'Cung cấp nhiệt lượng $1{,}67 \\cdot 10^{5}$ J thì vừa đủ làm tan hết một khối nước đá ở $0$ °C. Tính khối lượng khối nước đá (theo kg). Cho $\\lambda = 3{,}34 \\cdot 10^{5}$ J/kg.',
      answer: 0.5,
      unit: 'kg',
      tolerance: 0.001,
      hints: ['$m = \\dfrac{Q}{\\lambda}$.'],
      solution: '$m = \\dfrac{1{,}67 \\cdot 10^{5}}{3{,}34 \\cdot 10^{5}} = 0{,}5$ kg.',
    },
    {
      type: 'number',
      prompt:
        'Trong thí nghiệm đo $\\lambda$ của nước đá, $m = 0{,}1$ kg, công suất dây điện trở $P = 50$ W. Đồ thị nhiệt độ nằm ngang ở $0$ °C từ $\\tau_1 = 120$ s đến $\\tau_2 = 788$ s. Tính $\\lambda$ (theo J/kg).',
      answer: 334000,
      unit: 'J/kg',
      tolerance: 500,
      hints: [
        'Nhiệt lượng cung cấp khi nước đá tan: $P(\\tau_2 - \\tau_1)$.',
        'Chia cho khối lượng nước đá.',
      ],
      solution:
        '$\\lambda = \\dfrac{P(\\tau_2 - \\tau_1)}{m} = \\dfrac{50 \\cdot 668}{0{,}1} = 334\\,000$ J/kg $= 3{,}34 \\cdot 10^{5}$ J/kg.',
    },
    {
      type: 'choice',
      prompt:
        'Trong khi một chất rắn kết tinh đang nóng chảy (vẫn được cung cấp nhiệt), nhiệt độ của nó',
      options: ['không đổi', 'tăng đều', 'giảm dần', 'lúc tăng lúc giảm'],
      answer: 0,
      hints: ['Nhìn đoạn nằm ngang trên đồ thị đun nước đá.'],
      solution:
        'Nhiệt độ không đổi: nhiệt lượng nhận vào dùng để phá vỡ mạng tinh thể, không làm tăng động năng của các phân tử.',
    },
    {
      type: 'number',
      prompt:
        'Tính nhiệt lượng cần để biến $0{,}1$ kg nước đá ở $-20$ °C thành nước ở $0$ °C (theo J). Cho $c_{\\text{đá}} = 2\\,100$ J/kg.K, $\\lambda = 3{,}34 \\cdot 10^{5}$ J/kg.',
      answer: 37600,
      unit: 'J',
      hints: [
        'Có hai giai đoạn: làm nóng nước đá đến $0$ °C, rồi làm tan hết.',
        '$Q = mc_{\\text{đá}}\\Delta T + \\lambda m$.',
      ],
      solution:
        '$Q_1 = 0{,}1 \\cdot 2\\,100 \\cdot 20 = 4\\,200$ J; $Q_2 = 3{,}34 \\cdot 10^{5} \\cdot 0{,}1 = 33\\,400$ J; $Q = 37\\,600$ J.',
    },
    {
      type: 'number',
      prompt:
        'Một lò nung có công suất $20\\,000$ W, hiệu suất $50\\%$, dùng để nấu chảy hoàn toàn $2$ kg đồng ban đầu ở $30$ °C. Tính thời gian nung (theo s, làm tròn đến hàng đơn vị). Cho đồng có $c = 390$ J/kg.K, nhiệt độ nóng chảy $1\\,084$ °C, $\\lambda = 1{,}8 \\cdot 10^{5}$ J/kg.',
      answer: 118,
      unit: 's',
      tolerance: 1,
      hints: [
        'Tính nhiệt lượng làm nóng đồng tới $1\\,084$ °C và nhiệt lượng làm nóng chảy hoàn toàn.',
        'Công suất có ích chỉ bằng $50\\%$ công suất lò.',
      ],
      solution:
        '$Q_1 = 2 \\cdot 390 \\cdot (1\\,084 - 30) = 822\\,120$ J; $Q_2 = 1{,}8 \\cdot 10^{5} \\cdot 2 = 360\\,000$ J; $Q = 1\\,182\\,120$ J. Công suất có ích $10\\,000$ W nên $\\tau = \\dfrac{1\\,182\\,120}{10\\,000} \\approx 118$ s.',
    },
    {
      type: 'number',
      prompt:
        'Khi $0{,}3$ kg nước ở $0$ °C đông đặc hoàn toàn thành nước đá ở $0$ °C, nó toả ra nhiệt lượng bao nhiêu kJ? Cho $\\lambda = 3{,}34 \\cdot 10^{5}$ J/kg.',
      answer: 100.2,
      unit: 'kJ',
      tolerance: 0.05,
      hints: ['Đông đặc toả ra đúng nhiệt lượng mà nóng chảy cần: $\\lambda m$.'],
      solution:
        '$Q = \\lambda m = 3{,}34 \\cdot 10^{5} \\cdot 0{,}3 = 100\\,200$ J $= 100{,}2$ kJ.',
    },
    {
      type: 'choice',
      prompt:
        'Các khối $1$ kg nhôm, sắt, đồng, chì đều đang ở nhiệt độ nóng chảy của chúng. Khối nào cần ít nhiệt lượng nhất để nóng chảy hoàn toàn?',
      options: ['Khối chì', 'Khối nhôm', 'Khối sắt', 'Khối đồng'],
      answer: 0,
      hints: ['Cùng $m$: $Q = \\lambda m$ nhỏ nhất khi $\\lambda$ nhỏ nhất. Tra bảng.'],
      solution:
        'Chì có $\\lambda = 0{,}25 \\cdot 10^{5}$ J/kg, nhỏ nhất trong bốn chất, nên chỉ cần $25\\,000$ J; nhôm cần nhiều nhất ($3{,}97 \\cdot 10^{5}$ J).',
    },
  ],
  takeaways: [
    'Nhiệt nóng chảy riêng $\\lambda$: nhiệt lượng làm $1$ kg chất chuyển hoàn toàn từ rắn sang lỏng ở nhiệt độ nóng chảy, đơn vị J/kg; nước đá có $\\lambda = 3{,}34 \\cdot 10^{5}$ J/kg.',
    '$Q = \\lambda m$; khi đông đặc, chất toả ra nhiệt lượng bằng $\\lambda m$. Trong khi nóng chảy, nhiệt độ không đổi.',
    'Quá trình nhiều giai đoạn: cộng nhiệt lượng $mc\\Delta T$ của các đoạn nóng lên với $\\lambda m$ của đoạn nóng chảy.',
    'Đo $\\lambda$ của nước đá: $\\lambda = \\dfrac{P(\\tau_2 - \\tau_1)}{m}$, với $\\tau_1$, $\\tau_2$ là đầu và cuối đoạn nằm ngang của đồ thị.',
  ],
};
