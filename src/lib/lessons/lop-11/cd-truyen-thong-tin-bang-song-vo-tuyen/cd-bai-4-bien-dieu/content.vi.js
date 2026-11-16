/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Biến điệu là dùng sóng điện từ cao tần (sóng mang) để chở tín hiệu tần số thấp: biến điệu biên độ (AM) làm biên độ sóng mang thay đổi theo tín hiệu, biến điệu tần số (FM) làm tần số sóng mang thay đổi theo tín hiệu.',
  intro:
    'Giọng nói và tiếng nhạc chỉ có tần số từ vài chục hertz đến vài chục kilôhertz. Sóng điện từ tần số thấp như vậy không thể đi xa, cần anten dài hàng chục kilômét, và các đài phát cùng lúc sẽ chồng lên nhau. Vậy làm thế nào để đài phát thanh gửi được tiếng nói đến chiếc radio cách hàng trăm kilômét?',
  objectives: [
    'Nêu được vì sao phải biến điệu và vai trò của sóng mang.',
    'Mô tả được biến điệu biên độ (AM): đặc tính nào của sóng mang thay đổi, đặc tính nào giữ nguyên.',
    'Mô tả được biến điệu tần số (FM) và so sánh được AM với FM.',
    'Tính được số kênh trong một dải tần và bước sóng ứng với tần số của một kênh truyền thông.',
  ],
  sections: [
    {
      heading: 'Sóng mang và biến điệu',
      blocks: [
        {
          type: 'p',
          text: 'Tín hiệu chứa thông tin cần truyền (âm thanh, hình ảnh, video) thường có tần số rất thấp; tín hiệu âm thanh gọi là tín hiệu âm tần. Nếu phát thẳng tín hiệu âm tần thành sóng điện từ thì gặp ba khó khăn:',
        },
        {
          type: 'list',
          items: [
            'Sóng tần số thấp mang năng lượng nhỏ, bị môi trường hấp thụ mạnh nên không truyền đi xa được.',
            'Anten phát hiệu quả cần dài cỡ một phần tư bước sóng. Với $f = 1$ kHz, $\\lambda = \\dfrac{c}{f} = 300$ km, anten phải dài $75$ km.',
            'Mọi đài đều phát tín hiệu âm tần trong cùng một khoảng tần số, nên sóng của các đài chồng lên nhau, máy thu không tách riêng được từng đài.',
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Sóng mang và biến điệu',
          text: 'Sóng mang là sóng điện từ cao tần dùng để chở tín hiệu cần truyền đi xa. Biến điệu là làm cho một đặc tính của sóng mang (biên độ, tần số hoặc pha) thay đổi theo tín hiệu cần truyền.',
        },
        {
          type: 'p',
          text: 'Sóng mang là một dao động điều hoà, có ba đặc tính: biên độ, tần số và pha. Ứng với đặc tính được thay đổi, có ba cách biến điệu: biến điệu biên độ (AM, amplitude modulation), biến điệu tần số (FM, frequency modulation) và biến điệu pha (PM, phase modulation). Mỗi đài dùng một sóng mang có tần số riêng, nên máy thu chọn được đài bằng cách dò đúng tần số đó; ở máy thu, bộ tách sóng lấy lại tín hiệu âm tần từ sóng đã biến điệu.',
        },
      ],
    },
    {
      heading: 'Biến điệu biên độ (AM)',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Biến điệu biên độ',
          text: 'Trong biến điệu AM, biên độ của sóng mang thay đổi theo tín hiệu âm tần; tần số và pha của sóng mang được giữ nguyên.',
        },
        {
          type: 'p',
          text: 'Nối các đỉnh của sóng AM ta được đường bao có dạng giống hệt tín hiệu âm tần. Máy thu chỉ cần lấy lại đường bao này là có tín hiệu âm. Nếu biên độ thay đổi quá mạnh (quá biến điệu), đường bao bị méo và âm thanh thu được cũng méo.',
        },
        {
          type: 'p',
          text: 'Các đài phát thanh AM phát trong dải sóng trung từ $526{,}5$ kHz đến $1\\,606{,}5$ kHz. Mỗi kênh AM chiếm một băng thông khoảng $9$ kHz đến $10$ kHz, các kênh cách nhau $9$ kHz.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ưu, nhược điểm của AM',
          text: 'Sóng AM (sóng trung, sóng ngắn) truyền được rất xa và máy thu đơn giản. Nhưng nhiễu (tia lửa điện, sấm sét, động cơ) làm thay đổi biên độ sóng, mà thông tin lại nằm ở biên độ, nên âm thanh AM dễ bị rè; băng thông hẹp cũng làm chất lượng âm thanh kém.',
        },
      ],
    },
    {
      heading: 'Biến điệu tần số (FM)',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Biến điệu tần số',
          text: 'Trong biến điệu FM, tần số của sóng mang thay đổi theo tín hiệu âm tần; biên độ của sóng mang được giữ nguyên.',
        },
        {
          type: 'p',
          text: 'Khi tín hiệu âm tần tăng, tần số sóng FM tăng (các dao động dày lên); khi tín hiệu giảm, tần số giảm (các dao động thưa ra). Mức thay đổi tần số lớn nhất so với tần số sóng mang gọi là độ lệch tần số.',
        },
        {
          type: 'p',
          text: 'Các đài FM phát trong dải từ $88$ MHz đến $108$ MHz. Mỗi kênh FM chiếm băng thông khoảng $100$ kHz đến $200$ kHz, các kênh cách nhau $0{,}2$ MHz. Ví dụ, kênh VOV Giao thông phát ở Hà Nội bằng biến điệu FM, tần số $91$ MHz.',
        },
        {
          type: 'table',
          caption: 'So sánh biến điệu AM và FM',
          head: ['Tiêu chí', 'AM', 'FM'],
          rows: [
            [
              'Đặc tính thay đổi',
              'Biên độ sóng mang (tần số, pha giữ nguyên)',
              'Tần số sóng mang (biên độ giữ nguyên)',
            ],
            ['Dải tần phát thanh', '$526{,}5$ kHz – $1\\,606{,}5$ kHz', '$88$ MHz – $108$ MHz'],
            ['Băng thông mỗi kênh', 'Khoảng $9$ – $10$ kHz', 'Khoảng $100$ – $200$ kHz'],
            ['Chất lượng âm thanh', 'Kém hơn, dễ bị nhiễu', 'Tốt hơn, ít bị nhiễu'],
            ['Phạm vi phủ sóng', 'Rộng, truyền được rất xa', 'Hẹp hơn, chủ yếu trong vùng'],
          ],
        },
      ],
    },
    {
      heading: 'Tần số và bước sóng dùng trong truyền thông',
      blocks: [
        {
          type: 'p',
          text: 'Sóng điện từ truyền trong không khí với tốc độ $c = 3 \\cdot 10^8$ m/s, nên bước sóng của một kênh có tần số $f$ là',
        },
        { type: 'tex', tex: '\\lambda = \\dfrac{c}{f}' },
        {
          type: 'table',
          caption: 'Các dải sóng vô tuyến',
          head: ['Loại sóng', 'Bước sóng', 'Tần số', 'Ứng dụng'],
          rows: [
            [
              'Sóng dài',
              'Trên $1\\,000$ m',
              'Dưới $300$ kHz',
              'Thông tin dưới nước, liên lạc tàu biển',
            ],
            [
              'Sóng trung',
              '$100$ m – $1\\,000$ m',
              '$0{,}3$ MHz – $3$ MHz',
              'Phát thanh AM trong vùng',
            ],
            [
              'Sóng ngắn',
              '$10$ m – $100$ m',
              '$3$ MHz – $30$ MHz',
              'Phát thanh AM đi rất xa (phản xạ ở tầng điện li)',
            ],
            [
              'Sóng cực ngắn',
              '$0{,}01$ m – $10$ m',
              '$30$ MHz – $30\\,000$ MHz',
              'Phát thanh FM, truyền hình, điện thoại di động, vệ tinh',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Tần số là tài nguyên có hạn. Mỗi quốc gia phân chia, cấp phát dải tần cho từng loại dịch vụ (phát thanh, truyền hình, di động, hàng không) và cho từng đài, để các kênh không gây nhiễu cho nhau. Các đài ở gần nhau không được phát trên hai kênh liền kề, nên tại cùng một thời điểm chỉ khoảng một nửa số kênh trong một dải được phép hoạt động.',
        },
      ],
    },
    {
      heading: 'Dự án: Khảo sát các kênh phát thanh nơi em sống',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: lập bảng các kênh phát thanh thu được ở địa phương, nhận biết kênh nào dùng AM, kênh nào dùng FM, tính bước sóng của từng kênh và so sánh chất lượng thu. Dụng cụ: một máy thu thanh có hai băng AM và FM (hoặc điện thoại có ứng dụng radio FM, cắm tai nghe làm anten), giấy, máy tính cầm tay.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Dò hết băng FM từ $88$ MHz đến $108$ MHz, ghi tần số và tên của mọi kênh thu rõ.',
            'Làm như vậy với băng AM (sóng trung). Nếu không có máy thu AM, tra cứu tần số các kênh AM của Đài Tiếng nói Việt Nam trên trang web của đài.',
            'Với mỗi kênh, tính bước sóng $\\lambda = \\dfrac{c}{f}$ và xếp kênh vào dải sóng tương ứng.',
            'Tính khoảng cách giữa các kênh FM thu được; kiểm tra chúng có phải bội của $0{,}2$ MHz không.',
            'Nghe cùng một chương trình (nếu có) trên AM và FM, ở trong nhà và ngoài trời, gần và xa các thiết bị điện. Ghi nhận xét về độ rè, độ rõ.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Nộp bảng các kênh (tên kênh, AM hay FM, tần số, bước sóng, dải sóng), các nhận xét về chất lượng thu, và giải thích bằng đặc điểm của AM và FM vì sao kênh FM ít bị rè hơn còn kênh AM nghe được ở xa hơn.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ tạo tín hiệu AM và FM',
    instruction:
      'Chọn cách biến điệu, tần số tín hiệu âm và tần số sóng mang, rồi kéo thanh trượt. Với AM, quan sát đường bao nét đứt bám theo tín hiệu âm còn tần số không đổi; với FM, quan sát các dao động dày lên ở đỉnh tín hiệu âm và thưa ra ở đáy, biên độ không đổi. Cuối cùng thử nhận biết các sóng bí ẩn.',
  },
  examples: [
    {
      problem:
        'Dải sóng trung dành cho phát thanh AM từ $526{,}5$ kHz đến $1\\,606{,}5$ kHz, khoảng cách giữa hai kênh là $9$ kHz. Dải này có bao nhiêu kênh? Tại cùng một thời điểm có bao nhiêu kênh được phép hoạt động?',
      steps: [
        'Độ rộng của dải: $1\\,606{,}5 - 526{,}5 = 1\\,080$ kHz.',
        'Mỗi kênh chiếm $9$ kHz nên số kênh là $\\dfrac{1\\,080}{9} = 120$ kênh.',
        'Để không nhiễu nhau, hai trạm hoạt động phải cách nhau ít nhất một kênh, tức các kênh hoạt động xen kẽ: kênh thứ $1, 3, 5, \\ldots$',
        'Số kênh được hoạt động cùng lúc là $\\dfrac{120}{2} = 60$ kênh.',
      ],
      answer: 'Dải có $120$ kênh; cùng lúc có thể có $60$ kênh hoạt động.',
    },
    {
      problem:
        'Kênh VOV Giao thông phát FM ở tần số $91$ MHz. Tính bước sóng của sóng mang và cho biết nó thuộc dải sóng nào. Lấy $c = 3 \\cdot 10^8$ m/s.',
      steps: [
        '$f = 91$ MHz $= 91 \\cdot 10^6$ Hz.',
        '$\\lambda = \\dfrac{c}{f} = \\dfrac{3 \\cdot 10^8}{91 \\cdot 10^6} \\approx 3{,}30$ m.',
        'Bước sóng nằm trong khoảng $0{,}01$ m đến $10$ m nên đây là sóng cực ngắn.',
      ],
      answer: '$\\lambda \\approx 3{,}30$ m, thuộc dải sóng cực ngắn.',
    },
    {
      problem:
        'So sánh độ dài anten một phần tư bước sóng cần để phát trực tiếp tín hiệu âm tần $f_1 = 1$ kHz và để phát sóng mang FM $f_2 = 100$ MHz.',
      steps: [
        '$\\lambda_1 = \\dfrac{3 \\cdot 10^8}{10^3} = 3 \\cdot 10^5$ m $= 300$ km, nên anten dài $\\dfrac{\\lambda_1}{4} = 75$ km.',
        '$\\lambda_2 = \\dfrac{3 \\cdot 10^8}{10^8} = 3$ m, nên anten dài $\\dfrac{\\lambda_2}{4} = 0{,}75$ m.',
      ],
      answer:
        'Anten cho tín hiệu âm tần phải dài $75$ km, không thể làm được; anten cho sóng mang FM chỉ dài $0{,}75$ m. Đó là một lí do phải biến điệu.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trong biến điệu AM, đặc tính nào của sóng mang thay đổi theo tín hiệu âm tần?',
      options: ['Biên độ', 'Tần số', 'Pha', 'Tốc độ truyền'],
      answer: 0,
      hints: ['AM là viết tắt của amplitude modulation.'],
      solution:
        'Trong biến điệu AM, biên độ sóng mang thay đổi theo biên độ của tín hiệu âm tần; tần số và pha của sóng mang được giữ nguyên.',
    },
    {
      type: 'match',
      prompt: 'Ghép mỗi cách biến điệu với đặc tính của sóng mang thay đổi theo tín hiệu.',
      left: ['Biến điệu biên độ (AM)', 'Biến điệu tần số (FM)', 'Biến điệu pha (PM)'],
      right: [
        'Biên độ sóng mang thay đổi',
        'Tần số sóng mang thay đổi',
        'Pha sóng mang thay đổi',
        'Tốc độ sóng mang thay đổi',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Tên mỗi cách biến điệu nói luôn đặc tính được thay đổi.'],
      solution:
        'AM thay đổi biên độ, FM thay đổi tần số, PM thay đổi pha của sóng mang. Tốc độ của sóng điện từ không bị biến điệu.',
    },
    {
      type: 'number',
      prompt:
        'Nếu khoảng cách giữa các kênh là $0{,}2$ MHz thì dải FM từ $88$ MHz đến $108$ MHz có bao nhiêu kênh?',
      answer: 100,
      hints: ['Chia độ rộng của dải cho khoảng cách giữa hai kênh.'],
      solution: 'Số kênh là $\\dfrac{108 - 88}{0{,}2} = \\dfrac{20}{0{,}2} = 100$ kênh.',
    },
    {
      type: 'number',
      prompt:
        'Với $100$ kênh FM ở câu trên, nếu hai kênh liền kề không được hoạt động cùng lúc thì tại cùng một thời điểm có nhiều nhất bao nhiêu kênh FM được phép hoạt động?',
      answer: 50,
      hints: ['Các kênh hoạt động phải xen kẽ: một kênh hoạt động, một kênh nghỉ.'],
      solution: 'Các kênh hoạt động xen kẽ nên có $\\dfrac{100}{2} = 50$ kênh hoạt động cùng lúc.',
    },
    {
      type: 'number',
      prompt:
        'Một đài phát AM ở tần số $702$ kHz. Tính bước sóng của sóng mang, lấy $c = 3 \\cdot 10^8$ m/s (làm tròn đến mét).',
      answer: 427,
      tolerance: 0.5,
      unit: 'm',
      hints: ['$\\lambda = \\dfrac{c}{f}$, nhớ đổi kHz ra Hz.'],
      solution:
        '$\\lambda = \\dfrac{3 \\cdot 10^8}{702 \\cdot 10^3} \\approx 427{,}35$ m $\\approx 427$ m, thuộc dải sóng trung.',
    },
    {
      type: 'number',
      prompt:
        'Một kênh vô tuyến có bước sóng $30$ m. Tần số sóng mang của kênh là bao nhiêu MHz? Lấy $c = 3 \\cdot 10^8$ m/s.',
      answer: 10,
      unit: 'MHz',
      hints: ['$f = \\dfrac{c}{\\lambda}$.'],
      solution:
        '$f = \\dfrac{3 \\cdot 10^8}{30} = 10^7$ Hz $= 10$ MHz. Bước sóng $30$ m thuộc dải sóng ngắn.',
    },
    {
      type: 'multi',
      prompt: 'Những phát biểu nào đúng khi so sánh biến điệu FM với biến điệu AM?',
      options: [
        'Âm thanh FM ít bị nhiễu hơn vì thông tin không nằm ở biên độ sóng',
        'Mỗi kênh FM chiếm băng thông rộng hơn một kênh AM',
        'Sóng FM có biên độ thay đổi theo tín hiệu âm tần',
        'Phát thanh FM phủ sóng xa hơn phát thanh AM sóng ngắn',
      ],
      answers: [0, 1],
      hints: [
        'Nhớ lại đặc tính nào của sóng mang được giữ nguyên trong FM.',
        'So sánh băng thông $9$ – $10$ kHz với $100$ – $200$ kHz.',
      ],
      solution:
        'FM giữ nguyên biên độ, nên nhiễu làm thay đổi biên độ ít ảnh hưởng đến âm thanh; mỗi kênh FM rộng $100$ – $200$ kHz, gấp nhiều lần kênh AM. Sóng FM là sóng cực ngắn, chủ yếu phủ sóng trong vùng, còn sóng ngắn AM đi được rất xa.',
    },
    {
      type: 'choice',
      prompt:
        'Vì sao các đài không phát trực tiếp tín hiệu âm tần thành sóng điện từ mà phải biến điệu?',
      options: [
        'Sóng âm tần không đi xa được, cần anten rất dài và các đài sẽ chồng lên nhau',
        'Tín hiệu âm tần có tần số quá cao nên bị tầng điện li phản xạ',
        'Sóng điện từ không thể có tần số dưới $1$ MHz',
        'Biến điệu làm tăng tốc độ truyền của sóng',
      ],
      answer: 0,
      hints: ['Tín hiệu âm tần có tần số cao hay thấp? Tính thử bước sóng ứng với $1$ kHz.'],
      solution:
        'Tín hiệu âm tần có tần số thấp: sóng của nó bị hấp thụ mạnh, cần anten dài cỡ hàng chục kilômét, và mọi đài đều chung một khoảng tần số nên chồng lên nhau. Biến điệu chuyển thông tin lên sóng mang cao tần riêng của từng đài.',
    },
  ],
  takeaways: [
    'Sóng mang là sóng điện từ cao tần chở tín hiệu đi xa; biến điệu là làm một đặc tính của sóng mang thay đổi theo tín hiệu cần truyền.',
    'AM: biên độ sóng mang thay đổi theo tín hiệu, tần số và pha giữ nguyên; dải $526{,}5$ – $1\\,606{,}5$ kHz, kênh cách nhau $9$ kHz.',
    'FM: tần số sóng mang thay đổi theo tín hiệu, biên độ giữ nguyên; dải $88$ – $108$ MHz, kênh cách nhau $0{,}2$ MHz; chất lượng tốt, ít nhiễu hơn AM.',
    'Bước sóng của một kênh: $\\lambda = \\dfrac{c}{f}$, với $c = 3 \\cdot 10^8$ m/s.',
  ],
};
