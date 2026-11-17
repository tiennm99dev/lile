/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Máy phát điện xoay chiều hoạt động dựa trên hiện tượng cảm ứng điện từ: khung dây N vòng, diện tích S quay đều với tốc độ góc ω trong từ trường đều B sinh ra suất điện động xoay chiều có biên độ E₀ = NBSω và tần số f = ω/2π. Máy gồm phần cảm tạo từ trường và phần ứng sinh suất điện động; bộ phận quay là roto, bộ phận đứng yên là stato.',
  intro:
    'Ổ cắm điện trong nhà cung cấp điện áp hiệu dụng $220$ V, tần số $50$ Hz: dòng điện đổi chiều $100$ lần mỗi giây. Dòng điện đó được tạo ra từ những máy phát khổng lồ trong nhà máy thuỷ điện, nhiệt điện, nơi tua bin làm quay nam châm hoặc cuộn dây. Vì sao chỉ cần quay mà sinh ra được điện, và vì sao điện đó lại "xoay chiều"?',
  objectives: [
    'Giải thích được nguyên tắc tạo ra suất điện động xoay chiều bằng khung dây quay đều trong từ trường đều.',
    'Viết được biểu thức của từ thông và suất điện động; nêu được $E_0 = NBS\\omega$, chu kì, tần số.',
    'Nêu được các giá trị tức thời, cực đại, hiệu dụng của dòng điện xoay chiều; $I = \\dfrac{I_0}{\\sqrt{2}}$, $U = \\dfrac{U_0}{\\sqrt{2}}$.',
    'Mô tả được cấu tạo của máy phát điện xoay chiều: phần cảm, phần ứng, roto, stato.',
    'Nêu được các quy tắc an toàn khi sử dụng điện xoay chiều.',
  ],
  sections: [
    {
      heading: 'Nguyên tắc tạo ra suất điện động xoay chiều',
      blocks: [
        {
          type: 'p',
          text: 'Khung dây phẳng gồm $N$ vòng, diện tích mỗi vòng $S$, quay đều với tốc độ góc $\\omega$ quanh trục vuông góc với các đường sức của từ trường đều $\\vec{B}$. Góc giữa pháp tuyến $\\vec{n}$ của khung và $\\vec{B}$ thay đổi theo thời gian: $\\alpha = \\omega t + \\varphi$, nên từ thông qua khung biến thiên điều hoà: $$\\Phi = NBS\\cos(\\omega t + \\varphi).$$',
        },
        {
          type: 'p',
          text: "Theo định luật Faraday, trong khung xuất hiện suất điện động cảm ứng $e = -\\Phi'$, tức là $$e = NBS\\omega\\sin(\\omega t + \\varphi),$$ hay viết theo hàm cosin: $$e = E_0\\cos\\left(\\omega t + \\varphi - \\dfrac{\\pi}{2}\\right).$$",
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Suất điện động xoay chiều',
          text: 'Suất điện động trong khung biến thiên điều hoà theo thời gian: $e = E_0\\cos(\\omega t + \\varphi_0)$, với biên độ (giá trị cực đại) $$E_0 = NBS\\omega,$$ chu kì $T = \\dfrac{2\\pi}{\\omega}$ và tần số $f = \\dfrac{\\omega}{2\\pi}$ bằng số vòng quay của khung trong một giây.',
        },
        {
          type: 'p',
          text: 'Nối hai đầu khung với một điện trở thì trong mạch có dòng điện biến thiên điều hoà cùng tần số với suất điện động. Dòng điện có cường độ biến thiên điều hoà theo thời gian (theo hàm cosin hay sin) gọi là dòng điện xoay chiều: $$i = I_0\\cos(\\omega t + \\varphi_i),\\qquad u = U_0\\cos(\\omega t + \\varphi_u),$$ trong đó $i$, $u$ là giá trị tức thời, $I_0$, $U_0$ là giá trị cực đại, $\\omega$ là tần số góc.',
        },
      ],
    },
    {
      heading: 'Giá trị hiệu dụng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Cường độ hiệu dụng',
          text: 'Cường độ hiệu dụng của dòng điện xoay chiều bằng cường độ của một dòng điện không đổi, nếu cho hai dòng điện đó lần lượt đi qua cùng một điện trở trong những khoảng thời gian bằng nhau đủ dài thì nhiệt lượng toả ra bằng nhau.',
        },
        {
          type: 'tex',
          tex: 'I = \\dfrac{I_0}{\\sqrt{2}},\\qquad U = \\dfrac{U_0}{\\sqrt{2}},\\qquad E = \\dfrac{E_0}{\\sqrt{2}}',
        },
        {
          type: 'p',
          text: 'Các số ghi trên thiết bị điện và số chỉ của ampe kế, vôn kế xoay chiều là giá trị hiệu dụng. Điện áp $220$ V của mạng điện gia đình là giá trị hiệu dụng; giá trị cực đại là $U_0 = 220\\sqrt{2} \\approx 311$ V.',
        },
      ],
    },
    {
      heading: 'Cấu tạo của máy phát điện xoay chiều',
      blocks: [
        {
          type: 'list',
          items: [
            'Phần cảm: nam châm vĩnh cửu hoặc nam châm điện, tạo ra từ trường.',
            'Phần ứng: các cuộn dây, nơi xuất hiện suất điện động cảm ứng khi máy hoạt động.',
            'Bộ phận đứng yên gọi là stato, bộ phận quay quanh một trục gọi là roto.',
          ],
        },
        {
          type: 'table',
          head: ['Cách bố trí', 'Roto', 'Stato', 'Đặc điểm'],
          rows: [
            [
              'Phần ứng quay',
              'Khung dây (phần ứng)',
              'Nam châm (phần cảm)',
              'Hai vành khuyên quay cùng khung, hai thanh quét tì lên vành khuyên đưa điện ra mạch ngoài',
            ],
            [
              'Phần cảm quay',
              'Nam châm điện (phần cảm), nuôi bằng dòng điện một chiều',
              'Nhiều cuộn dây có lõi sắt xếp thành vòng tròn (phần ứng)',
              'Điện lấy ra trực tiếp từ các cuộn dây đứng yên; dùng trong các nhà máy điện',
            ],
          ],
          caption: 'Hai cách bố trí của máy phát điện xoay chiều.',
        },
      ],
    },
    {
      heading: 'Sử dụng điện xoay chiều an toàn',
      blocks: [
        {
          type: 'p',
          text: 'Dòng điện xoay chiều có tác dụng nhiệt, quang, từ và sinh lí; nó được dùng rộng rãi trong sản xuất, sinh hoạt và y tế. Điện áp mạng điện gia đình đủ gây nguy hiểm đến tính mạng nên cần tuân thủ quy tắc an toàn.',
        },
        {
          type: 'list',
          items: [
            'Lắp cầu dao hoặc aptomat đúng cách để ngắt điện khi đoản mạch hay quá tải; chọn thiết bị đóng ngắt phù hợp với công suất sử dụng.',
            'Đặt cầu dao, cầu chì, công tắc, ổ điện ở nơi cao, khô ráo, dễ thao tác.',
            'Nối đất vỏ kim loại của máy giặt, tủ lạnh, bình nóng lạnh, bếp điện.',
            'Giữ khoảng cách an toàn với đường dây và trạm điện cao áp; thường xuyên kiểm tra dây dẫn và thiết bị.',
            'Khi nhà bị ngập nước hoặc mưa bão làm hỏng mái, ngắt cầu dao tổng.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Máy phát điện và dao động kí',
    instruction:
      'Bấm "Cho máy quay" để khung dây quay giữa hai cực nam châm. Thay đổi tốc độ quay $n$, số vòng $N$ và cảm ứng từ $B$: quan sát trên dao động kí số chu kì trong một giây (tần số) và đỉnh sóng (biên độ $E_0 = NBS\\omega$, đọc theo thang đo ghi trên dao động kí). Bấm hoặc kéo trên đồ thị để đọc $e$ tại một thời điểm.',
  },
  examples: [
    {
      problem:
        'Khung dây của một máy phát có $200$ vòng, diện tích mỗi vòng $50$ cm², quay đều $50$ vòng/s trong từ trường đều $B = 0{,}2$ T (trục quay vuông góc với $\\vec{B}$). Tính tần số, suất điện động cực đại và suất điện động hiệu dụng.',
      steps: [
        'Tần số bằng số vòng quay trong một giây: $f = 50$ Hz; $\\omega = 2\\pi f = 100\\pi$ rad/s.',
        '$S = 50$ cm² $= 5 \\cdot 10^{-3}$ m².',
        '$E_0 = NBS\\omega = 200 \\cdot 0{,}2 \\cdot 5 \\cdot 10^{-3} \\cdot 100\\pi = 20\\pi \\approx 62{,}8$ V.',
        '$E = \\dfrac{E_0}{\\sqrt{2}} \\approx \\dfrac{62{,}8}{1{,}414} \\approx 44{,}4$ V.',
      ],
      answer: '$f = 50$ Hz, $E_0 \\approx 62{,}8$ V, $E \\approx 44{,}4$ V.',
    },
    {
      problem:
        'Điện áp giữa hai cực của một ổ cắm là $u = 220\\sqrt{2}\\cos(100\\pi t)$ (V). Tìm điện áp cực đại, điện áp hiệu dụng, tần số và chu kì.',
      steps: [
        'So sánh với $u = U_0\\cos(\\omega t + \\varphi_u)$: $U_0 = 220\\sqrt{2} \\approx 311$ V, $\\omega = 100\\pi$ rad/s.',
        '$U = \\dfrac{U_0}{\\sqrt{2}} = 220$ V.',
        '$f = \\dfrac{\\omega}{2\\pi} = 50$ Hz, $T = \\dfrac{1}{f} = 0{,}02$ s.',
      ],
      answer: '$U_0 \\approx 311$ V, $U = 220$ V, $f = 50$ Hz, $T = 0{,}02$ s.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Máy phát điện xoay chiều hoạt động dựa trên',
      options: [
        'hiện tượng cảm ứng điện từ',
        'tác dụng nhiệt của dòng điện',
        'lực từ tác dụng lên dòng điện',
        'hiện tượng nhiễm điện do cọ xát',
      ],
      answer: 0,
      hints: ['Khung dây quay làm từ thông qua nó biến thiên.'],
      solution:
        'Khi khung dây quay trong từ trường, từ thông qua khung biến thiên nên trong khung xuất hiện suất điện động cảm ứng: đó là hiện tượng cảm ứng điện từ.',
    },
    {
      type: 'choice',
      prompt: 'Trong máy phát điện xoay chiều, phần ứng là bộ phận',
      options: [
        'gồm các cuộn dây, nơi xuất hiện suất điện động cảm ứng',
        'tạo ra từ trường',
        'luôn là bộ phận quay',
        'luôn là bộ phận đứng yên',
      ],
      answer: 0,
      hints: ['Phần cảm tạo ra từ trường; phần còn lại "ứng" với sự biến thiên từ thông.'],
      solution:
        'Phần ứng là các cuộn dây, nơi sinh ra suất điện động. Phần ứng có thể là roto (khung dây quay) hoặc stato (cuộn dây đứng yên) tuỳ cách bố trí.',
    },
    {
      type: 'number',
      prompt:
        'Khung dây $100$ vòng, diện tích mỗi vòng $100$ cm², quay đều $25$ vòng/s trong từ trường đều $B = 0{,}5$ T, trục quay vuông góc với $\\vec{B}$. Suất điện động cực đại của khung bằng bao nhiêu vôn?',
      answer: 78.54,
      tolerance: 0.2,
      unit: 'V',
      hints: ['$\\omega = 2\\pi n = 50\\pi$ rad/s.', '$E_0 = NBS\\omega$ với $S = 0{,}01$ m².'],
      solution: '$E_0 = 100 \\cdot 0{,}5 \\cdot 0{,}01 \\cdot 50\\pi = 25\\pi \\approx 78{,}5$ V.',
    },
    {
      type: 'number',
      prompt:
        'Một điện áp xoay chiều có giá trị cực đại $311$ V. Điện áp hiệu dụng xấp xỉ bao nhiêu vôn?',
      answer: 220,
      tolerance: 1,
      unit: 'V',
      hints: ['$U = \\dfrac{U_0}{\\sqrt{2}}$.'],
      solution: '$U = \\dfrac{311}{\\sqrt{2}} \\approx \\dfrac{311}{1{,}414} \\approx 220$ V.',
    },
    {
      type: 'number',
      prompt: 'Suất điện động $e = 100\\cos(120\\pi t)$ (V) có tần số bằng bao nhiêu héc?',
      answer: 60,
      unit: 'Hz',
      hints: ['$f = \\dfrac{\\omega}{2\\pi}$.'],
      solution: '$\\omega = 120\\pi$ rad/s nên $f = \\dfrac{120\\pi}{2\\pi} = 60$ Hz.',
    },
    {
      type: 'number',
      prompt:
        'Cường độ dòng điện $i = 2\\sqrt{2}\\cos\\left(100\\pi t + \\dfrac{\\pi}{3}\\right)$ (A). Cường độ hiệu dụng bằng bao nhiêu ampe?',
      answer: 2,
      unit: 'A',
      hints: ['$I_0 = 2\\sqrt{2}$ A; $I = \\dfrac{I_0}{\\sqrt{2}}$.'],
      solution:
        '$I = \\dfrac{2\\sqrt{2}}{\\sqrt{2}} = 2$ A. Pha ban đầu không ảnh hưởng đến giá trị hiệu dụng.',
    },
    {
      type: 'choice',
      prompt:
        'Tăng tốc độ quay của khung dây trong máy phát lên gấp đôi (các yếu tố khác giữ nguyên) thì',
      options: [
        'tần số và suất điện động cực đại đều tăng gấp đôi',
        'tần số tăng gấp đôi, suất điện động cực đại không đổi',
        'suất điện động cực đại tăng gấp đôi, tần số không đổi',
        'tần số tăng gấp bốn, suất điện động cực đại tăng gấp đôi',
      ],
      answer: 0,
      hints: ['$f = \\dfrac{\\omega}{2\\pi}$ và $E_0 = NBS\\omega$ đều tỉ lệ với $\\omega$.'],
      solution:
        'Cả $f$ và $E_0 = NBS\\omega$ đều tỉ lệ thuận với $\\omega$, nên quay nhanh gấp đôi thì cả hai cùng tăng gấp đôi.',
    },
    {
      type: 'number',
      prompt:
        'Từ thông qua một cuộn dây biến thiên theo $\\Phi = 0{,}05\\cos(100\\pi t)$ (Wb). Suất điện động cực đại trong cuộn dây bằng bao nhiêu vôn?',
      answer: 15.71,
      tolerance: 0.05,
      unit: 'V',
      hints: [
        "$e = -\\Phi'$: đạo hàm của $\\cos(\\omega t)$ cho thêm thừa số $\\omega$.",
        '$E_0 = \\omega\\Phi_0$.',
      ],
      solution: '$E_0 = \\omega\\Phi_0 = 100\\pi \\cdot 0{,}05 = 5\\pi \\approx 15{,}7$ V.',
    },
    {
      type: 'choice',
      prompt: 'Việc làm nào sau đây giúp sử dụng điện xoay chiều an toàn?',
      options: [
        'Nối đất vỏ kim loại của máy giặt, tủ lạnh',
        'Đặt ổ cắm điện sát sàn nhà tắm cho tiện dùng',
        'Thay dây chì của cầu chì bằng dây đồng to để khỏi bị đứt',
        'Giữ nguyên cầu dao khi nhà bị ngập nước để còn đèn chiếu sáng',
      ],
      answer: 0,
      hints: ['Khi thiết bị bị rò điện ra vỏ, dòng điện cần có đường thoát xuống đất.'],
      solution:
        'Nối đất vỏ kim loại giúp dòng điện rò thoát xuống đất thay vì qua người. Ổ cắm nơi ẩm ướt, thay dây chì bằng dây đồng (mất tác dụng bảo vệ) hay không ngắt điện khi ngập nước đều nguy hiểm.',
    },
  ],
  takeaways: [
    'Khung dây $N$ vòng quay đều trong từ trường đều: $\\Phi = NBS\\cos(\\omega t + \\varphi)$ và $e = NBS\\omega\\sin(\\omega t + \\varphi)$.',
    'Suất điện động cực đại $E_0 = NBS\\omega$; chu kì $T = \\dfrac{2\\pi}{\\omega}$, tần số $f = \\dfrac{\\omega}{2\\pi}$.',
    'Giá trị hiệu dụng: $I = \\dfrac{I_0}{\\sqrt{2}}$, $U = \\dfrac{U_0}{\\sqrt{2}}$, $E = \\dfrac{E_0}{\\sqrt{2}}$; dụng cụ đo xoay chiều chỉ giá trị hiệu dụng.',
    'Máy phát gồm phần cảm (tạo từ trường) và phần ứng (sinh suất điện động); roto quay, stato đứng yên.',
  ],
};
