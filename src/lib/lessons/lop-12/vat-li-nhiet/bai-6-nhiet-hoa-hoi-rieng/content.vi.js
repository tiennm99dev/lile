/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhiệt hoá hơi riêng L của một chất là nhiệt lượng cần để làm cho 1 kg chất đó chuyển hoàn toàn từ thể lỏng sang thể khí ở một nhiệt độ xác định, đơn vị J/kg. Nhiệt lượng làm hoá hơi hoàn toàn khối lượng m là Q = Lm. Sự bay hơi xảy ra ở mặt thoáng và ở mọi nhiệt độ; sự sôi xảy ra cả trong lòng chất lỏng, ở nhiệt độ sôi không đổi. Đo L của nước bằng oát kế và cân: L = P(τQ − τP)/(mP − mQ).',
  intro:
    'Đun một ấm nước đến khi sôi chỉ mất vài phút, nhưng muốn đun cho cạn hết nước thì phải đun lâu hơn nhiều lần, dù nhiệt độ của nước cứ đứng yên ở $100$ °C. Cần bao nhiêu nhiệt lượng để biến một lượng nước thành hơi, và đo nhiệt lượng đó như thế nào?',
  objectives: [
    'Phân biệt được sự bay hơi và sự sôi.',
    'Nêu được định nghĩa nhiệt hoá hơi riêng; vận dụng được $Q = Lm$, kết hợp với $Q = mc\\Delta T$ cho quá trình vừa nóng lên vừa hoá hơi.',
    'Mô tả được thí nghiệm đo nhiệt hoá hơi riêng của nước bằng oát kế và cân, xử lí được số liệu để tính $L$.',
  ],
  sections: [
    {
      heading: 'Sự bay hơi và sự sôi',
      blocks: [
        {
          type: 'p',
          text: 'Sự chuyển từ thể lỏng sang thể khí (hơi) gọi là sự hoá hơi. Sự hoá hơi có hai hình thức: sự bay hơi và sự sôi. Quá trình ngược lại, hơi chuyển thành chất lỏng, là sự ngưng tụ.',
        },
        {
          type: 'table',
          head: ['Đặc điểm', 'Sự bay hơi', 'Sự sôi'],
          rows: [
            [
              'Nhiệt độ',
              'Xảy ra ở mọi nhiệt độ',
              'Xảy ra ở nhiệt độ sôi, không đổi trong suốt quá trình',
            ],
            [
              'Nơi xảy ra',
              'Chỉ ở mặt thoáng chất lỏng',
              'Cả trong lòng và trên mặt thoáng chất lỏng',
            ],
            [
              'Phụ thuộc',
              'Nhiệt độ, diện tích mặt thoáng, gió',
              'Nhiệt độ sôi phụ thuộc áp suất trên mặt chất lỏng',
            ],
          ],
          caption: 'So sánh hai hình thức hoá hơi.',
        },
        {
          type: 'p',
          text: 'Theo mô hình động học phân tử, các phân tử ở mặt thoáng có động năng đủ lớn sẽ thắng được lực hút của các phân tử khác và thoát ra ngoài: đó là sự bay hơi. Khi sôi, các bọt hơi hình thành ngay trong lòng chất lỏng, lớn dần, nổi lên và vỡ ra ở mặt thoáng.',
        },
        { type: 'widget', name: 'soi-bay-hoi' },
      ],
    },
    {
      heading: 'Nhiệt hoá hơi riêng',
      blocks: [
        {
          type: 'p',
          text: 'Muốn một chất lỏng đã ở nhiệt độ sôi hoá hơi hoàn toàn, ta phải tiếp tục cung cấp nhiệt lượng. Nhiệt lượng này tỉ lệ với khối lượng chất lỏng và phụ thuộc vào bản chất của chất lỏng: tỉ số $\\dfrac{Q}{m}$ là một hằng số đối với mỗi chất lỏng ở một nhiệt độ xác định.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Nhiệt hoá hơi riêng',
          text: 'Nhiệt hoá hơi riêng $L$ của một chất là nhiệt lượng cần để làm cho $1$ kg chất đó chuyển hoàn toàn từ thể lỏng sang thể khí ở một nhiệt độ xác định. Đơn vị là jun trên kilôgam (J/kg).',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhiệt lượng hoá hơi',
          text: 'Nhiệt lượng cần cung cấp để làm hoá hơi hoàn toàn khối lượng $m$ của một chất lỏng ở nhiệt độ không đổi: $$Q = Lm.$$ Khi khối hơi đó ngưng tụ ở cùng nhiệt độ, nó toả ra nhiệt lượng đúng bằng $Lm$.',
        },
        {
          type: 'table',
          head: ['Chất', 'Nhiệt độ sôi (°C)', '$L$ (J/kg)'],
          rows: [
            ['Nước', '$100$', '$2{,}26 \\cdot 10^{6}$'],
            ['Amoniac', '$-33$', '$1{,}4 \\cdot 10^{6}$'],
            ['Rượu (ethanol)', '$78$', '$0{,}9 \\cdot 10^{6}$'],
            ['Ether', '$35$', '$0{,}4 \\cdot 10^{6}$'],
            ['Thuỷ ngân', '$357$', '$0{,}3 \\cdot 10^{6}$'],
          ],
          caption:
            'Nhiệt hoá hơi riêng gần đúng của một số chất ở nhiệt độ sôi và áp suất tiêu chuẩn.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'L phụ thuộc nhiệt độ',
          text: 'Nhiệt hoá hơi riêng của một chất thay đổi theo nhiệt độ hoá hơi: nhiệt độ càng thấp thì $L$ càng lớn. Nước có $L \\approx 2{,}26 \\cdot 10^{6}$ J/kg ở $100$ °C nhưng khoảng $2{,}4 \\cdot 10^{6}$ J/kg ở $50$ °C, khoảng $2{,}45 \\cdot 10^{6}$ J/kg ở nhiệt độ cơ thể người.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Quá trình nhiều giai đoạn',
          text: 'Đun nước ở $t_1$ thành hơi ở $100$ °C cần tổng nhiệt lượng của hai giai đoạn: $$Q = mc(100 - t_1) + Lm.$$',
        },
      ],
    },
    {
      heading: 'Thí nghiệm đo nhiệt hoá hơi riêng của nước',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Dụng cụ: biến thế nguồn; oát kế có đo thời gian (đo công suất và nhiệt lượng cung cấp); nhiệt kế điện tử; nhiệt lượng kế có dây điện trở; cân điện tử.',
            'Đặt nhiệt lượng kế lên cân, đổ nước nóng vào, ghi khối lượng nước. Mở nắp nhiệt lượng kế; nối oát kế với dây điện trở và nguồn, nhúng ngập dây điện trở trong nước.',
            'Bật nguồn đun cho nước sôi. Cứ sau những khoảng thời gian bằng nhau (ví dụ $2$ phút), ghi số chỉ của oát kế và khối lượng nước trên cân. Sau đó tắt nguồn.',
            'Vẽ đồ thị khối lượng $m$ theo thời gian $\\tau$. Khi nước đang sôi, đồ thị là một đoạn thẳng đi xuống. Chọn hai điểm $P$, $Q$ trên đoạn thẳng đó, đọc $(\\tau_P;\\ m_P)$ và $(\\tau_Q;\\ m_Q)$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Xử lí số liệu',
          text: 'Bỏ qua hao phí, nhiệt lượng dây điện trở cung cấp từ $\\tau_P$ đến $\\tau_Q$ làm hoá hơi lượng nước $m_P - m_Q$: $\\mathscr{P}(\\tau_Q - \\tau_P) = L(m_P - m_Q)$, nên $$L = \\dfrac{\\mathscr{P}(\\tau_Q - \\tau_P)}{m_P - m_Q}.$$ Nếu oát kế chỉ thẳng nhiệt lượng $Q_1$, $Q_2$ ở hai thời điểm thì $L = \\dfrac{Q_2 - Q_1}{m_1 - m_2}$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lưu ý',
          text: 'Chỉ lấy số liệu khi nước đã sôi: trước đó nhiệt lượng còn dùng để làm nóng nước, khối lượng chưa giảm. Nhiệt lượng toả ra môi trường và hơi nước ngưng tụ lại trên thành bình làm kết quả có sai số.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đun sôi nước trên cân',
    instruction:
      'Chọn khối lượng, nhiệt độ đầu của nước và công suất dây đun, rồi đun. Khi nước đang sôi, bấm “Ghi số liệu” hai lần để ghi số chỉ oát kế $Q$ và số chỉ cân $m$; trang sẽ tính $L = \\dfrac{Q_2 - Q_1}{m_1 - m_2}$. Thử ghi một lần khi nước chưa sôi để thấy kết quả sai thế nào.',
  },
  examples: [
    {
      problem:
        'Tính nhiệt lượng cần để làm cho $10$ kg nước ở $25$ °C chuyển hoàn toàn thành hơi ở $100$ °C. Cho nhiệt dung riêng của nước là $4\\,200$ J/kg.K, nhiệt hoá hơi riêng của nước ở $100$ °C là $2{,}26 \\cdot 10^{6}$ J/kg.',
      steps: [
        'Làm nóng nước từ $25$ °C đến $100$ °C: $Q_1 = mc\\Delta t = 10 \\cdot 4\\,200 \\cdot 75 = 3\\,150\\,000$ J.',
        'Làm hoá hơi hoàn toàn ở $100$ °C: $Q_2 = Lm = 2{,}26 \\cdot 10^{6} \\cdot 10 = 22\\,600\\,000$ J.',
        '$Q = Q_1 + Q_2 = 3\\,150\\,000 + 22\\,600\\,000 = 25\\,750\\,000$ J.',
      ],
      answer:
        '$Q = 25\\,750\\,000$ J $\\approx 2{,}58 \\cdot 10^{7}$ J; phần hoá hơi lớn gấp hơn $7$ lần phần làm nóng.',
    },
    {
      problem:
        'Trong thí nghiệm đo nhiệt hoá hơi riêng của nước, công suất trung bình của dây điện trở là $\\mathscr{P} = 15{,}2$ W. Trên đoạn thẳng của đồ thị $m - \\tau$, đọc được $\\tau_P = 200$ s, $m_P = 118{,}7$ g và $\\tau_Q = 700$ s, $m_Q = 115{,}3$ g. Tính $L$ và sai số tỉ đối so với giá trị $2{,}26 \\cdot 10^{6}$ J/kg.',
      steps: [
        'Nhiệt lượng cung cấp: $\\mathscr{P}(\\tau_Q - \\tau_P) = 15{,}2 \\cdot 500 = 7\\,600$ J.',
        'Khối lượng nước đã hoá hơi: $m_P - m_Q = 118{,}7 - 115{,}3 = 3{,}4$ g $= 0{,}0034$ kg.',
        '$L = \\dfrac{7\\,600}{0{,}0034} \\approx 2{,}24 \\cdot 10^{6}$ J/kg.',
        'Sai số tỉ đối: $\\dfrac{|2{,}24 - 2{,}26|}{2{,}26} \\approx 0{,}9\\%$.',
      ],
      answer:
        '$L \\approx 2{,}24 \\cdot 10^{6}$ J/kg, lệch khoảng $0{,}9\\%$ so với giá trị trong bảng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Nhiệt hoá hơi riêng của một chất là nhiệt lượng cần để',
      options: [
        'làm cho $1$ kg chất đó chuyển hoàn toàn từ thể lỏng sang thể khí ở một nhiệt độ xác định',
        'làm cho $1$ kg chất đó tăng thêm $1$ K',
        'làm cho $1$ kg chất đó chuyển hoàn toàn từ thể rắn sang thể lỏng',
        'đun $1$ kg chất lỏng đến nhiệt độ sôi',
      ],
      answer: 0,
      hints: [
        'Phân biệt với nhiệt dung riêng (tăng nhiệt độ) và nhiệt nóng chảy riêng (rắn → lỏng).',
      ],
      solution:
        'Nhiệt hoá hơi riêng $L$: nhiệt lượng làm $1$ kg chất chuyển hoàn toàn từ lỏng sang khí ở một nhiệt độ xác định, đơn vị J/kg.',
    },
    {
      type: 'number',
      prompt:
        'Tính nhiệt lượng cần để làm hoá hơi hoàn toàn $0{,}2$ kg nước đang sôi ở $100$ °C (theo kJ). Cho $L = 2{,}26 \\cdot 10^{6}$ J/kg.',
      answer: 452,
      unit: 'kJ',
      tolerance: 0.5,
      hints: ['Nước đã ở nhiệt độ sôi: $Q = Lm$.'],
      solution: '$Q = Lm = 2{,}26 \\cdot 10^{6} \\cdot 0{,}2 = 452\\,000$ J $= 452$ kJ.',
    },
    {
      type: 'choice',
      prompt:
        'Trong khi nước đang sôi ở áp suất tiêu chuẩn (bếp vẫn tiếp tục đun), nhiệt độ của nước',
      options: ['không đổi, bằng $100$ °C', 'tăng đều', 'giảm dần', 'tăng rồi giảm'],
      answer: 0,
      hints: ['Nhiệt lượng nhận vào lúc này dùng vào việc gì?'],
      solution:
        'Nhiệt độ không đổi ở $100$ °C: nhiệt lượng nhận vào dùng để hoá hơi nước, không làm tăng nhiệt độ.',
    },
    {
      type: 'number',
      prompt:
        'Một ấm điện công suất $1\\,500$ W đun $0{,}5$ kg nước đang sôi ở $100$ °C thêm $3$ phút. Bỏ qua hao phí, tính khối lượng nước đã hoá hơi (theo g, làm tròn đến một chữ số thập phân). Cho $L = 2{,}26 \\cdot 10^{6}$ J/kg.',
      answer: 119.5,
      unit: 'g',
      tolerance: 0.15,
      hints: [
        'Nhiệt lượng ấm cung cấp: $Q = \\mathscr{P}t$ với $t$ tính bằng giây.',
        'Toàn bộ nhiệt lượng này làm nước hoá hơi: $m = \\dfrac{Q}{L}$.',
      ],
      solution:
        '$Q = 1\\,500 \\cdot 180 = 270\\,000$ J; $m = \\dfrac{270\\,000}{2{,}26 \\cdot 10^{6}} \\approx 0{,}1195$ kg $\\approx 119{,}5$ g.',
    },
    {
      type: 'number',
      prompt:
        'Một vận động viên chạy marathon tiêu hao $11\\,000$ kJ. Chỉ $20\\%$ năng lượng đó dùng để chạy, phần còn lại thành nhiệt và được thải ra ngoài nhờ mồ hôi bay hơi. Tính khối lượng nước vận động viên mất đi (theo kg, làm tròn đến một chữ số thập phân). Cho nhiệt hoá hơi riêng của nước ở nhiệt độ cơ thể là $2{,}45 \\cdot 10^{6}$ J/kg.',
      answer: 3.6,
      unit: 'kg',
      tolerance: 0.05,
      hints: ['Nhiệt lượng cần thải: $80\\%$ của $11\\,000$ kJ, đổi ra J.', '$m = \\dfrac{Q}{L}$.'],
      solution:
        '$Q = 0{,}8 \\cdot 11\\,000\\,000 = 8\\,800\\,000$ J; $m = \\dfrac{8{,}8 \\cdot 10^{6}}{2{,}45 \\cdot 10^{6}} \\approx 3{,}6$ kg.',
    },
    {
      type: 'number',
      prompt:
        'Cho $0{,}05$ kg hơi nước ở $100$ °C ngưng tụ hoàn toàn rồi nguội đến $40$ °C. Tính nhiệt lượng toả ra (theo kJ). Cho $L = 2{,}26 \\cdot 10^{6}$ J/kg, $c = 4\\,200$ J/kg.K.',
      answer: 125.6,
      unit: 'kJ',
      tolerance: 0.05,
      hints: [
        'Hai giai đoạn: hơi ngưng tụ ở $100$ °C toả ra $Lm$; nước nguội từ $100$ °C xuống $40$ °C toả ra $mc\\Delta t$.',
      ],
      solution:
        '$Q_1 = Lm = 2{,}26 \\cdot 10^{6} \\cdot 0{,}05 = 113\\,000$ J; $Q_2 = 0{,}05 \\cdot 4\\,200 \\cdot 60 = 12\\,600$ J; $Q = 125\\,600$ J $= 125{,}6$ kJ.',
    },
    {
      type: 'number',
      prompt:
        'Khi nước trong nhiệt lượng kế đang sôi, lần ghi thứ nhất: oát kế chỉ $Q_1 = 12\\,000$ J, cân chỉ $m_1 = 250{,}0$ g; lần ghi thứ hai: $Q_2 = 56\\,800$ J, $m_2 = 230{,}0$ g. Tính nhiệt hoá hơi riêng của nước đo được (theo J/kg).',
      answer: 2240000,
      unit: 'J/kg',
      tolerance: 5000,
      hints: [
        'Nhiệt lượng cung cấp giữa hai lần ghi: $Q_2 - Q_1$.',
        'Khối lượng nước đã hoá hơi: $m_1 - m_2$, đổi ra kg.',
      ],
      solution:
        '$L = \\dfrac{Q_2 - Q_1}{m_1 - m_2} = \\dfrac{44\\,800}{0{,}020} = 2\\,240\\,000$ J/kg $= 2{,}24 \\cdot 10^{6}$ J/kg.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các phát biểu đúng.',
      options: [
        'Sự bay hơi xảy ra ở mọi nhiệt độ.',
        'Sự sôi chỉ xảy ra ở mặt thoáng chất lỏng.',
        'Trong khi sôi, nhiệt độ của chất lỏng không đổi.',
        'Nhiệt độ sôi của nước không phụ thuộc áp suất.',
        'Hơi ngưng tụ thành chất lỏng ở cùng nhiệt độ thì toả ra nhiệt lượng $Lm$.',
      ],
      answers: [0, 2, 4],
      hints: [
        'Sôi xảy ra cả trong lòng chất lỏng.',
        'Nghĩ tới nồi áp suất và nước sôi trên núi cao.',
      ],
      solution:
        'Đúng: bay hơi ở mọi nhiệt độ; nhiệt độ không đổi khi sôi; ngưng tụ toả ra $Lm$. Sai: sự sôi xảy ra cả trong lòng chất lỏng; nhiệt độ sôi phụ thuộc áp suất trên mặt chất lỏng.',
    },
    {
      type: 'number',
      prompt:
        'Nhiệt lượng làm hoá hơi hoàn toàn $1$ kg nước ở $100$ °C lớn gấp bao nhiêu lần nhiệt lượng làm nóng chảy hoàn toàn $1$ kg nước đá ở $0$ °C? (Làm tròn đến một chữ số thập phân.) Cho $L = 2{,}26 \\cdot 10^{6}$ J/kg, $\\lambda = 3{,}34 \\cdot 10^{5}$ J/kg.',
      answer: 6.8,
      tolerance: 0.05,
      hints: ['Cùng khối lượng nên tỉ số nhiệt lượng bằng $\\dfrac{L}{\\lambda}$.'],
      solution:
        '$\\dfrac{L}{\\lambda} = \\dfrac{2{,}26 \\cdot 10^{6}}{3{,}34 \\cdot 10^{5}} \\approx 6{,}8$ lần.',
    },
    {
      type: 'choice',
      prompt:
        'Vì sao bị bỏng bởi hơi nước ở $100$ °C thường nặng hơn bị bỏng bởi cùng khối lượng nước sôi ở $100$ °C?',
      options: [
        'Hơi nước ngưng tụ trên da toả ra thêm nhiệt lượng rất lớn $Lm$',
        'Hơi nước có nhiệt độ cao hơn nước sôi',
        'Hơi nước có nhiệt dung riêng lớn hơn nước',
        'Hơi nước bay hơi trên da nên lấy nhiệt của da',
      ],
      answer: 0,
      hints: ['Hơi nước chạm vào da lạnh hơn thì chuyển thể gì?'],
      solution:
        'Hơi nước gặp da thì ngưng tụ, toả ra nhiệt lượng $Lm$ (với nước $L = 2{,}26 \\cdot 10^{6}$ J/kg) trước khi nguội như nước sôi, nên truyền cho da nhiều nhiệt lượng hơn hẳn.',
    },
  ],
  takeaways: [
    'Sự bay hơi xảy ra ở mặt thoáng, ở mọi nhiệt độ; sự sôi xảy ra cả trong lòng chất lỏng, ở nhiệt độ sôi không đổi, nhiệt độ sôi phụ thuộc áp suất.',
    'Nhiệt hoá hơi riêng $L$: nhiệt lượng làm $1$ kg chất chuyển hoàn toàn từ lỏng sang khí ở một nhiệt độ xác định, đơn vị J/kg; nước ở $100$ °C có $L = 2{,}26 \\cdot 10^{6}$ J/kg.',
    '$Q = Lm$; khi ngưng tụ ở cùng nhiệt độ, hơi toả ra nhiệt lượng bằng $Lm$.',
    'Đo $L$ của nước: $L = \\dfrac{\\mathscr{P}(\\tau_Q - \\tau_P)}{m_P - m_Q}$, chỉ lấy số liệu khi nước đang sôi.',
  ],
};
