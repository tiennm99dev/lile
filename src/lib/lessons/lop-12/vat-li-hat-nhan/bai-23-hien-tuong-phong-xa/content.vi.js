/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phóng xạ là quá trình một hạt nhân không bền tự phát biến đổi thành hạt nhân khác và phát ra tia phóng xạ (α, β⁻, β⁺, γ); quá trình này ngẫu nhiên và không chịu ảnh hưởng của các yếu tố bên ngoài. Số hạt nhân còn lại giảm theo định luật N = N₀·2^(−t/T) = N₀·e^(−λt), với T là chu kì bán rã và λ = ln 2/T là hằng số phóng xạ. Độ phóng xạ H = λN đo bằng becquerel (Bq).',
  intro:
    'Năm 1896, Becquerel cất một gói muối uranium cạnh một tấm kính ảnh bọc kĩ trong giấy đen. Vài ngày sau, tấm kính ảnh bị đen như đã bị chiếu sáng, dù không có chút ánh sáng nào lọt vào. Muối uranium đã tự phát ra một loại "tia" vô hình đi xuyên qua giấy. Đó là hiện tượng phóng xạ.',
  objectives: [
    'Nêu được hiện tượng phóng xạ là quá trình biến đổi hạt nhân tự phát, ngẫu nhiên.',
    'Nêu được bản chất và tính chất của các tia phóng xạ $\\alpha$, $\\beta^-$, $\\beta^+$, $\\gamma$; viết được phương trình phân rã.',
    'Định nghĩa được chu kì bán rã, hằng số phóng xạ, độ phóng xạ và đơn vị Bq.',
    'Vận dụng được định luật phóng xạ $N = N_0 \\cdot 2^{-\\frac{t}{T}}$ và $H = \\lambda N$.',
    'Nêu được tác hại của tia phóng xạ và nhận biết được biển cảnh báo phóng xạ.',
  ],
  sections: [
    {
      heading: 'Hiện tượng phóng xạ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phóng xạ',
          text: 'Phóng xạ là quá trình một hạt nhân không bền vững tự phát biến đổi thành một hạt nhân khác, kèm theo việc phát ra các tia phóng xạ. Hạt nhân ban đầu gọi là hạt nhân mẹ, hạt nhân tạo thành gọi là hạt nhân con.',
        },
        {
          type: 'list',
          items: [
            'Phóng xạ là quá trình tự phát: không chịu tác động của các yếu tố bên ngoài như nhiệt độ, áp suất.',
            'Phóng xạ là quá trình ngẫu nhiên: không thể biết trước thời điểm một hạt nhân cụ thể phân rã.',
            'Phóng xạ là một phản ứng hạt nhân toả năng lượng.',
          ],
        },
      ],
    },
    {
      heading: 'Các loại tia phóng xạ',
      blocks: [
        {
          type: 'table',
          head: ['Tia', 'Bản chất', 'Khả năng ion hoá', 'Khả năng đâm xuyên'],
          rows: [
            [
              '$\\alpha$',
              'Hạt nhân ${}^{4}_{2}\\mathrm{He}$, tốc độ cỡ $2 \\cdot 10^7$ m/s',
              'Mạnh',
              'Yếu: vài cm trong không khí, bị một tờ giấy chặn lại',
            ],
            [
              '$\\beta^-$',
              'Electron ${}^{0}_{-1}e$, tốc độ gần bằng tốc độ ánh sáng',
              'Yếu hơn tia $\\alpha$',
              'Vài mét trong không khí, bị tấm nhôm dày cỡ mm chặn lại',
            ],
            [
              '$\\beta^+$',
              'Positron ${}^{0}_{+1}e$ (phản hạt của electron)',
              'Yếu hơn tia $\\alpha$',
              'Như tia $\\beta^-$',
            ],
            [
              '$\\gamma$',
              'Sóng điện từ có bước sóng rất ngắn (photon năng lượng cao)',
              'Yếu nhất',
              'Mạnh nhất: xuyên qua hàng chục cm bê tông, cần lớp chì dày để chặn',
            ],
          ],
          caption:
            'Trong điện trường, tia $\\alpha$ và $\\beta^+$ lệch về phía bản âm, tia $\\beta^-$ lệch về phía bản dương, tia $\\gamma$ không bị lệch.',
        },
        {
          type: 'p',
          text: 'Áp dụng bảo toàn số nucleon và điện tích, ta viết được phương trình các kiểu phân rã:',
        },
        {
          type: 'list',
          items: [
            'Phân rã $\\alpha$: ${}^{A}_{Z}\\mathrm{X} \\to {}^{A-4}_{Z-2}\\mathrm{Y} + {}^{4}_{2}\\mathrm{He}$. Hạt nhân con lùi $2$ ô trong bảng tuần hoàn. Ví dụ: ${}^{226}_{88}\\mathrm{Ra} \\to {}^{222}_{86}\\mathrm{Rn} + {}^{4}_{2}\\mathrm{He}$.',
            'Phân rã $\\beta^-$: ${}^{A}_{Z}\\mathrm{X} \\to {}^{A}_{Z+1}\\mathrm{Y} + {}^{0}_{-1}e + \\bar{\\nu}$ (kèm phản neutrino $\\bar{\\nu}$). Hạt nhân con tiến $1$ ô. Ví dụ: ${}^{14}_{6}\\mathrm{C} \\to {}^{14}_{7}\\mathrm{N} + {}^{0}_{-1}e + \\bar{\\nu}$.',
            'Phân rã $\\beta^+$: ${}^{A}_{Z}\\mathrm{X} \\to {}^{A}_{Z-1}\\mathrm{Y} + {}^{0}_{+1}e + \\nu$ (kèm neutrino $\\nu$). Hạt nhân con lùi $1$ ô.',
            'Phát xạ $\\gamma$: hạt nhân con sau phân rã $\\alpha$ hoặc $\\beta$ thường ở trạng thái kích thích, khi chuyển về trạng thái năng lượng thấp hơn thì phát ra photon $\\gamma$. Phóng xạ $\\gamma$ không làm thay đổi $Z$ và $A$.',
          ],
        },
      ],
    },
    {
      heading: 'Định luật phóng xạ',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi hạt nhân phân rã ngẫu nhiên, nhưng một mẫu chứa rất nhiều hạt nhân thì tuân theo một quy luật thống kê rất chặt chẽ: cứ sau một khoảng thời gian xác định, một nửa số hạt nhân còn lại bị phân rã.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Chu kì bán rã',
          text: 'Chu kì bán rã $T$ là khoảng thời gian để một nửa số hạt nhân của một lượng chất phóng xạ bị phân rã. Mỗi chất phóng xạ có một chu kì bán rã riêng, từ phần nhỏ của giây đến hàng tỉ năm.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định luật phóng xạ',
          text: 'Số hạt nhân chưa phân rã còn lại sau thời gian $t$: $$N = N_0 \\cdot 2^{-\\frac{t}{T}} = N_0 e^{-\\lambda t},$$ trong đó $N_0$ là số hạt nhân ban đầu và $\\lambda = \\dfrac{\\ln 2}{T}$ là hằng số phóng xạ (đơn vị s⁻¹). Khối lượng chất phóng xạ còn lại giảm theo cùng quy luật: $m = m_0 \\cdot 2^{-\\frac{t}{T}}$.',
        },
        {
          type: 'table',
          head: ['$t$', '$T$', '$2T$', '$3T$', '$4T$', '$kT$'],
          rows: [
            [
              '$\\dfrac{N}{N_0}$',
              '$\\dfrac{1}{2}$',
              '$\\dfrac{1}{4}$',
              '$\\dfrac{1}{8}$',
              '$\\dfrac{1}{16}$',
              '$\\dfrac{1}{2^k}$',
            ],
          ],
          caption:
            'Số hạt nhân bị phân rã sau thời gian $t$ là $\\Delta N = N_0 - N = N_0\\left(1 - 2^{-\\frac{t}{T}}\\right)$.',
        },
      ],
    },
    {
      heading: 'Độ phóng xạ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Độ phóng xạ',
          text: 'Độ phóng xạ $H$ của một lượng chất phóng xạ là số hạt nhân phân rã trong một giây; nó đặc trưng cho tính phóng xạ mạnh hay yếu: $$H = \\lambda N, \\qquad H = H_0 \\cdot 2^{-\\frac{t}{T}} = H_0 e^{-\\lambda t}.$$ Đơn vị là becquerel (Bq): $1$ Bq $= 1$ phân rã/giây. Đơn vị khác là curie (Ci): $1$ Ci $= 3{,}7 \\cdot 10^{10}$ Bq.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đổi đơn vị trước khi tính $H$',
          text: 'Trong $H = \\lambda N$, $H$ tính bằng Bq nên $\\lambda$ phải tính bằng s⁻¹, tức là chu kì bán rã $T$ phải đổi ra giây.',
        },
      ],
    },
    {
      heading: 'Tác hại của tia phóng xạ và biển cảnh báo',
      blocks: [
        {
          type: 'p',
          text: 'Tia phóng xạ ion hoá các phân tử trong tế bào, có thể phá huỷ tế bào và làm biến đổi gene. Tiếp xúc với nguồn phóng xạ mạnh, dù trong thời gian ngắn, có thể gây bỏng phóng xạ, buồn nôn, suy nhược thần kinh; về lâu dài có thể gây đột biến gene và ung thư.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Biển cảnh báo phóng xạ',
          text: 'Biển cảnh báo phóng xạ (hình ba cánh quạt màu đen trên nền vàng) được đặt ở nơi có thiết bị phát tia phóng xạ, nguồn phóng xạ, hoặc ngay trên thiết bị, thùng chứa. Thấy biển này, không được lại gần, tháo dỡ hay làm hư hỏng thiết bị, thùng chứa.',
        },
      ],
    },
  ],
  explore: {
    title: 'Mẫu chất phóng xạ ảo',
    instruction:
      'Bấm "Cho phân rã": mỗi hạt nhân đỏ có thể phân rã vào bất kì lúc nào, hoàn toàn ngẫu nhiên. Theo dõi đồ thị số hạt còn lại và so sánh với đường cong của định luật phóng xạ; dùng "Đi tiếp đến chu kì sau" để xem sau mỗi chu kì bán rã còn lại bao nhiêu hạt. Thử mẫu $100$ hạt và mẫu $400$ hạt.',
  },
  examples: [
    {
      problem:
        'Hạt nhân ${}^{210}_{84}\\mathrm{Po}$ phóng xạ $\\alpha$, hạt nhân ${}^{60}_{27}\\mathrm{Co}$ phóng xạ $\\beta^-$. Viết phương trình phân rã và xác định hạt nhân con.',
      steps: [
        'Phân rã $\\alpha$: hạt nhân con có $A = 210 - 4 = 206$, $Z = 84 - 2 = 82$ (chì): ${}^{210}_{84}\\mathrm{Po} \\to {}^{206}_{82}\\mathrm{Pb} + {}^{4}_{2}\\mathrm{He}$.',
        'Phân rã $\\beta^-$: $A$ giữ nguyên, $Z = 27 + 1 = 28$ (nickel): ${}^{60}_{27}\\mathrm{Co} \\to {}^{60}_{28}\\mathrm{Ni} + {}^{0}_{-1}e + \\bar{\\nu}$.',
      ],
      answer: 'Hạt nhân con lần lượt là ${}^{206}_{82}\\mathrm{Pb}$ và ${}^{60}_{28}\\mathrm{Ni}$.',
    },
    {
      problem:
        'Iodine ${}^{131}_{53}\\mathrm{I}$ dùng trong y tế có chu kì bán rã $8$ ngày. Ban đầu có $100$ g. Sau $24$ ngày, khối lượng iodine còn lại và đã phân rã là bao nhiêu?',
      steps: [
        '$\\dfrac{t}{T} = \\dfrac{24}{8} = 3$.',
        '$m = m_0 \\cdot 2^{-3} = \\dfrac{100}{8} = 12{,}5$ g.',
        'Khối lượng đã phân rã: $100 - 12{,}5 = 87{,}5$ g.',
      ],
      answer: 'Còn lại $12{,}5$ g; đã phân rã $87{,}5$ g.',
    },
    {
      problem:
        'Một mẫu chất phóng xạ có độ phóng xạ ban đầu $H_0 = 8 \\cdot 10^{6}$ Bq và chu kì bán rã $T = 2$ giờ. Tính hằng số phóng xạ và số hạt nhân ban đầu trong mẫu.',
      steps: [
        'Đổi $T = 2 \\cdot 3\\,600 = 7\\,200$ s; $\\lambda = \\dfrac{\\ln 2}{T} = \\dfrac{0{,}693}{7\\,200} \\approx 9{,}63 \\cdot 10^{-5}$ s⁻¹.',
        '$N_0 = \\dfrac{H_0}{\\lambda} = \\dfrac{8 \\cdot 10^{6}}{9{,}63 \\cdot 10^{-5}} \\approx 8{,}3 \\cdot 10^{10}$ hạt nhân.',
      ],
      answer:
        '$\\lambda \\approx 9{,}63 \\cdot 10^{-5}$ s⁻¹; $N_0 \\approx 8{,}3 \\cdot 10^{10}$ hạt nhân.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Tia phóng xạ nào sau đây không mang điện và không bị lệch trong điện trường?',
      options: ['Tia $\\gamma$', 'Tia $\\alpha$', 'Tia $\\beta^-$', 'Tia $\\beta^+$'],
      answer: 0,
      hints: ['Một trong bốn tia là sóng điện từ.'],
      solution:
        'Tia $\\gamma$ là sóng điện từ (photon) nên không mang điện, không bị lệch. Tia $\\alpha$ và $\\beta^+$ mang điện dương, tia $\\beta^-$ mang điện âm.',
    },
    {
      type: 'choice',
      prompt: 'Hạt nhân ${}^{226}_{88}\\mathrm{Ra}$ phóng xạ $\\alpha$ tạo thành hạt nhân con là',
      options: [
        '${}^{222}_{86}\\mathrm{Rn}$',
        '${}^{222}_{88}\\mathrm{Ra}$',
        '${}^{226}_{86}\\mathrm{Rn}$',
        '${}^{224}_{86}\\mathrm{Rn}$',
      ],
      answer: 0,
      hints: [
        'Hạt $\\alpha$ là ${}^{4}_{2}\\mathrm{He}$: hạt nhân con mất bao nhiêu nucleon, bao nhiêu proton?',
      ],
      solution:
        '$A = 226 - 4 = 222$, $Z = 88 - 2 = 86$: hạt nhân con là ${}^{222}_{86}\\mathrm{Rn}$.',
    },
    {
      type: 'choice',
      prompt: 'Trong phóng xạ $\\beta^-$, so với hạt nhân mẹ thì hạt nhân con có',
      options: [
        'cùng số khối, số proton tăng thêm $1$',
        'cùng số khối, số proton giảm đi $1$',
        'số khối giảm $4$, số proton giảm $2$',
        'số khối và số proton đều không đổi',
      ],
      answer: 0,
      hints: ['Hạt $\\beta^-$ là ${}^{0}_{-1}e$. Áp dụng bảo toàn số khối và điện tích.'],
      solution:
        '${}^{A}_{Z}\\mathrm{X} \\to {}^{A}_{Z+1}\\mathrm{Y} + {}^{0}_{-1}e + \\bar{\\nu}$: số khối không đổi, $Z$ tăng $1$ (một neutron biến thành proton).',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các phát biểu đúng về tia $\\alpha$.',
      options: [
        'Là dòng các hạt nhân ${}^{4}_{2}\\mathrm{He}$',
        'Có khả năng ion hoá mạnh',
        'Bị một tờ giấy chặn lại',
        'Có khả năng đâm xuyên mạnh nhất trong các tia phóng xạ',
        'Lệch về phía bản dương trong điện trường',
      ],
      answers: [0, 1, 2],
      hints: [
        'Hạt $\\alpha$ nặng, mang điện $+2e$, nên tương tác mạnh với các nguyên tử nó đi qua.',
      ],
      solution:
        'Tia $\\alpha$ là hạt nhân helium, ion hoá mạnh nên mất năng lượng nhanh, chỉ đi được vài cm trong không khí và bị tờ giấy chặn lại. Nó mang điện dương nên lệch về phía bản âm; tia đâm xuyên mạnh nhất là tia $\\gamma$.',
    },
    {
      type: 'number',
      prompt:
        'Sau thời gian bằng $3$ chu kì bán rã, số hạt nhân phóng xạ còn lại bằng bao nhiêu phần trăm số hạt nhân ban đầu?',
      answer: 12.5,
      tolerance: 0.01,
      unit: '%',
      hints: ['$\\dfrac{N}{N_0} = 2^{-\\frac{t}{T}}$ với $\\dfrac{t}{T} = 3$.'],
      solution: '$\\dfrac{N}{N_0} = 2^{-3} = \\dfrac{1}{8} = 12{,}5\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Một lượng ${}^{131}_{53}\\mathrm{I}$ ($T = 8$ ngày) có khối lượng ban đầu $200$ g. Sau $24$ ngày còn lại bao nhiêu gam?',
      answer: 25,
      unit: 'g',
      hints: ['$24$ ngày bằng mấy chu kì bán rã?'],
      solution: '$\\dfrac{t}{T} = 3$, nên $m = 200 \\cdot 2^{-3} = 25$ g.',
    },
    {
      type: 'number',
      prompt:
        'Chu kì bán rã của ${}^{14}_{6}\\mathrm{C}$ là $5\\,730$ năm. Sau bao nhiêu năm thì số hạt nhân ${}^{14}_{6}\\mathrm{C}$ trong một mẫu giảm còn $\\dfrac{1}{16}$ số hạt ban đầu?',
      answer: 22920,
      unit: 'năm',
      hints: ['$\\dfrac{1}{16} = 2^{-k}$ với $k$ bằng bao nhiêu?'],
      solution: '$\\dfrac{1}{16} = 2^{-4}$, nên $t = 4T = 4 \\cdot 5\\,730 = 22\\,920$ năm.',
    },
    {
      type: 'number',
      prompt:
        'Độ phóng xạ ban đầu của một mẫu là $8\\,000$ Bq, chu kì bán rã $2$ giờ. Sau $6$ giờ độ phóng xạ của mẫu là bao nhiêu Bq?',
      answer: 1000,
      unit: 'Bq',
      hints: ['$H = H_0 \\cdot 2^{-\\frac{t}{T}}$.'],
      solution: '$\\dfrac{t}{T} = 3$, nên $H = \\dfrac{8\\,000}{8} = 1\\,000$ Bq.',
    },
    {
      type: 'number',
      prompt:
        'Chu kì bán rã của ${}^{131}_{53}\\mathrm{I}$ là $8$ ngày. Hằng số phóng xạ của nó bằng bao nhiêu $10^{-6}$ s⁻¹ (làm tròn đến hai chữ số sau dấu phẩy)?',
      answer: 1.0,
      tolerance: 0.01,
      hints: ['Đổi $T$ ra giây: $1$ ngày $= 86\\,400$ s.', '$\\lambda = \\dfrac{\\ln 2}{T}$.'],
      solution:
        '$T = 8 \\cdot 86\\,400 = 691\\,200$ s; $\\lambda = \\dfrac{0{,}693}{691\\,200} \\approx 1{,}00 \\cdot 10^{-6}$ s⁻¹.',
    },
    {
      type: 'number',
      prompt:
        'Radium ${}^{226}_{88}\\mathrm{Ra}$ có chu kì bán rã $1\\,600$ năm (coi $1$ năm $= 365$ ngày). Độ phóng xạ của $1$ g radium bằng bao nhiêu $10^{10}$ Bq? Cho $N_A = 6{,}02 \\cdot 10^{23}$ mol⁻¹.',
      answer: 3.66,
      tolerance: 0.03,
      hints: [
        'Số hạt nhân: $N = \\dfrac{1}{226} \\cdot 6{,}02 \\cdot 10^{23}$.',
        'Đổi $T$ ra giây rồi tính $\\lambda = \\dfrac{\\ln 2}{T}$ và $H = \\lambda N$.',
      ],
      solution:
        '$N \\approx 2{,}66 \\cdot 10^{21}$; $T = 1\\,600 \\cdot 365 \\cdot 86\\,400 \\approx 5{,}05 \\cdot 10^{10}$ s, $\\lambda \\approx 1{,}37 \\cdot 10^{-11}$ s⁻¹; $H = \\lambda N \\approx 3{,}66 \\cdot 10^{10}$ Bq, xấp xỉ $1$ Ci.',
    },
  ],
  takeaways: [
    'Phóng xạ: hạt nhân không bền tự phát, ngẫu nhiên biến đổi thành hạt nhân khác và phát ra tia phóng xạ; không phụ thuộc yếu tố bên ngoài.',
    'Tia $\\alpha$ (${}^{4}_{2}\\mathrm{He}$) ion hoá mạnh, đâm xuyên yếu; tia $\\beta^-$ (electron), $\\beta^+$ (positron) đâm xuyên mạnh hơn; tia $\\gamma$ (sóng điện từ) đâm xuyên mạnh nhất.',
    'Định luật phóng xạ: $N = N_0 \\cdot 2^{-\\frac{t}{T}} = N_0 e^{-\\lambda t}$, $\\lambda = \\dfrac{\\ln 2}{T}$.',
    'Độ phóng xạ $H = \\lambda N = H_0 \\cdot 2^{-\\frac{t}{T}}$, đơn vị Bq; $1$ Ci $= 3{,}7 \\cdot 10^{10}$ Bq.',
  ],
};
