/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Từ trường tác dụng lên đoạn dây dẫn mang dòng điện một lực từ vuông góc với dây và với cảm ứng từ, có chiều theo quy tắc bàn tay trái và độ lớn F = BIL sin α. Cảm ứng từ B đặc trưng cho độ mạnh yếu của từ trường, B = F/(IL) khi dây vuông góc với đường sức, đơn vị tesla (T).',
  intro:
    'Đặt một đoạn dây đồng giữa hai cực của nam châm chữ U rồi cho dòng điện chạy qua: đoạn dây bị đẩy văng ra hoặc bị hút sâu vào trong. Đổi chiều dòng điện thì dây chuyển động theo chiều ngược lại. Lực từ này có phương, chiều và độ lớn ra sao, và dùng nó để đo độ mạnh yếu của từ trường như thế nào?',
  objectives: [
    'Nêu được phương và chiều của lực từ tác dụng lên đoạn dây dẫn mang dòng điện; vận dụng được quy tắc bàn tay trái.',
    'Mô tả được thí nghiệm đo lực từ và rút ra được $F$ tỉ lệ với $I$, $L$ và $\\sin\\alpha$.',
    'Định nghĩa được cảm ứng từ $B$ và đơn vị tesla.',
    'Vận dụng được công thức $F = BIL\\sin\\alpha$.',
  ],
  sections: [
    {
      heading: 'Lực từ tác dụng lên đoạn dây dẫn mang dòng điện',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm: đoạn dây dẫn thẳng nằm ngang giữa hai cực của nam châm chữ U, đường sức từ giữa hai cực thẳng đứng. Khi có dòng điện chạy qua, đoạn dây bị đẩy theo phương ngang, vuông góc với cả dây dẫn và đường sức từ. Đổi chiều dòng điện hoặc đổi chiều từ trường thì lực từ đổi chiều.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Phương và chiều của lực từ',
          text: 'Lực từ tác dụng lên đoạn dây dẫn mang dòng điện đặt trong từ trường có phương vuông góc với đoạn dây và vuông góc với đường sức từ (vuông góc với mặt phẳng chứa đoạn dây và $\\vec{B}$). Chiều của lực từ tuân theo quy tắc bàn tay trái: đặt bàn tay trái sao cho các đường sức từ hướng vào lòng bàn tay, chiều từ cổ tay đến các ngón tay trùng với chiều dòng điện, khi đó ngón tay cái choãi ra $90^\\circ$ chỉ chiều của lực từ.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Khi dây song song với đường sức',
          text: 'Nếu đoạn dây dẫn đặt song song với đường sức từ thì không có lực từ tác dụng lên nó, dù dòng điện và từ trường đều khác không.',
        },
      ],
    },
    {
      heading: 'Cảm ứng từ',
      blocks: [
        {
          type: 'p',
          text: 'Dùng cân dòng điện (hoặc lực kế) đo lực từ $F$ lên đoạn dây dài $L$ đặt vuông góc với đường sức từ của một từ trường đều, với các cường độ dòng điện $I$ khác nhau. Kết quả: $F$ tỉ lệ thuận với $I$ và với $L$. Thương số $\\dfrac{F}{IL}$ không phụ thuộc vào $I$, $L$ mà chỉ phụ thuộc vào từ trường tại vị trí đặt dây; từ trường càng mạnh thì thương số này càng lớn.',
        },
        {
          type: 'table',
          head: ['Lần đo', '$I$ (A)', '$F$ (N)', '$\\dfrac{F}{IL}$ (T)'],
          rows: [
            ['1', '$1{,}0$', '$0{,}020$', '$0{,}20$'],
            ['2', '$2{,}0$', '$0{,}040$', '$0{,}20$'],
            ['3', '$3{,}0$', '$0{,}060$', '$0{,}20$'],
          ],
          caption: 'Số đo mẫu với đoạn dây dài L = 10 cm đặt vuông góc với đường sức từ.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Cảm ứng từ',
          text: 'Cảm ứng từ tại một điểm trong từ trường là đại lượng đặc trưng cho độ mạnh yếu của từ trường tại điểm đó, đo bằng thương số giữa lực từ tác dụng lên một đoạn dây dẫn mang dòng điện đặt vuông góc với đường sức từ tại điểm đó và tích của cường độ dòng điện với chiều dài đoạn dây: $$B = \\dfrac{F}{IL}.$$ Vectơ cảm ứng từ $\\vec{B}$ có hướng của từ trường tại điểm đó.',
        },
        {
          type: 'p',
          text: 'Trong hệ SI, đơn vị cảm ứng từ là tesla (T): $1\\ \\text{T} = 1\\ \\dfrac{\\text{N}}{\\text{A} \\cdot \\text{m}}$. Từ trường Trái Đất ở mặt đất vào cỡ $5 \\cdot 10^{-5}$ T, nam châm vĩnh cửu thông thường vào cỡ $0{,}1$ T đến $1$ T.',
        },
      ],
    },
    {
      heading: 'Độ lớn của lực từ',
      blocks: [
        {
          type: 'p',
          text: 'Khi đoạn dây hợp với đường sức từ một góc $\\alpha$, chỉ thành phần của $\\vec{B}$ vuông góc với dây ($B\\sin\\alpha$) gây ra lực từ.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Độ lớn lực từ',
          text: 'Đoạn dây dẫn dài $L$ mang dòng điện $I$ đặt trong từ trường đều có cảm ứng từ $B$ chịu tác dụng của lực từ có độ lớn $$F = BIL\\sin\\alpha,$$ trong đó $\\alpha$ là góc hợp bởi đoạn dây (theo chiều dòng điện) và vectơ $\\vec{B}$.',
        },
        {
          type: 'list',
          items: [
            '$\\alpha = 90^\\circ$ (dây vuông góc với đường sức): lực từ lớn nhất, $F = BIL$.',
            '$\\alpha = 0^\\circ$ hoặc $180^\\circ$ (dây song song với đường sức): $F = 0$.',
            'Từ công thức suy ra $B = \\dfrac{F}{IL\\sin\\alpha}$.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đổi đơn vị',
          text: 'Khi tính bằng $F = BIL\\sin\\alpha$, dùng đơn vị SI: $B$ (T), $I$ (A), $L$ (m), $F$ (N). Chiều dài cho bằng cm phải đổi ra m, chẳng hạn $20$ cm $= 0{,}2$ m.',
        },
      ],
    },
  ],
  explore: {
    title: 'Lực từ lên đoạn dây',
    instruction:
      'Chọn chiều của cảm ứng từ, kéo đầu dây để xoay dây (hoặc dùng phím mũi tên), rồi thay đổi $I$, $B$ và $L$. Dự đoán chiều lực từ bằng quy tắc bàn tay trái trước khi nhìn mũi tên đỏ; xoay dây song song với đường sức để thấy lực từ bằng 0.',
  },
  examples: [
    {
      problem:
        'Một đoạn dây dẫn dài $20$ cm có dòng điện $5$ A chạy qua, đặt trong từ trường đều có cảm ứng từ $0{,}04$ T. Đoạn dây hợp với đường sức từ góc $30^\\circ$. Tính độ lớn lực từ tác dụng lên đoạn dây.',
      steps: [
        'Đổi đơn vị: $L = 20$ cm $= 0{,}2$ m.',
        'Áp dụng $F = BIL\\sin\\alpha$ với $\\sin 30^\\circ = 0{,}5$.',
        '$F = 0{,}04 \\cdot 5 \\cdot 0{,}2 \\cdot 0{,}5 = 0{,}02$ N.',
      ],
      answer: '$F = 0{,}02$ N.',
    },
    {
      problem:
        'Một đoạn dây dẫn dài $10$ cm đặt vuông góc với đường sức từ của một từ trường đều. Khi cho dòng điện $3$ A chạy qua, đoạn dây chịu lực từ $0{,}06$ N. Tính cảm ứng từ của từ trường.',
      steps: [
        'Dây vuông góc với đường sức nên $\\alpha = 90^\\circ$, $\\sin\\alpha = 1$.',
        'Từ $F = BIL$ suy ra $B = \\dfrac{F}{IL}$.',
        '$B = \\dfrac{0{,}06}{3 \\cdot 0{,}1} = 0{,}2$ T.',
      ],
      answer: '$B = 0{,}2$ T.',
    },
    {
      problem:
        'Dây dẫn nằm ngang trong mặt phẳng hình vẽ, dòng điện chạy từ trái sang phải; từ trường đều có $\\vec{B}$ hướng vào mặt phẳng hình vẽ (⊗). Lực từ tác dụng lên dây có chiều nào?',
      steps: [
        'Đường sức từ hướng vào mặt phẳng hình vẽ phải đi vào lòng bàn tay trái: lòng bàn tay quay về phía người đọc.',
        'Chiều từ cổ tay đến các ngón tay hướng sang phải theo dòng điện.',
        'Khi đó ngón cái choãi ra chỉ lên trên.',
      ],
      answer: 'Lực từ nằm trong mặt phẳng hình vẽ, hướng lên trên.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Lực từ tác dụng lên đoạn dây dẫn mang dòng điện đặt trong từ trường có phương',
      options: [
        'vuông góc với cả đoạn dây và đường sức từ',
        'song song với đường sức từ',
        'song song với đoạn dây dẫn',
        'hợp với đường sức từ góc $45^\\circ$',
      ],
      answer: 0,
      hints: ['Quy tắc bàn tay trái: ngón cái choãi ra $90^\\circ$ so với các ngón còn lại.'],
      solution:
        'Lực từ vuông góc với mặt phẳng chứa đoạn dây và vectơ $\\vec{B}$, tức là vuông góc với cả đoạn dây và đường sức từ.',
    },
    {
      type: 'number',
      prompt:
        'Đoạn dây dài $0{,}5$ m mang dòng điện $2$ A đặt vuông góc với đường sức từ của từ trường đều $B = 0{,}3$ T. Lực từ tác dụng lên đoạn dây bằng bao nhiêu niutơn?',
      answer: 0.3,
      unit: 'N',
      hints: ['Dây vuông góc với đường sức: $F = BIL$.'],
      solution: '$F = BIL = 0{,}3 \\cdot 2 \\cdot 0{,}5 = 0{,}3$ N.',
    },
    {
      type: 'number',
      prompt:
        'Đoạn dây dài $10$ cm mang dòng điện $5$ A đặt trong từ trường đều $B = 0{,}8$ T, hợp với đường sức từ góc $30^\\circ$. Tính lực từ tác dụng lên đoạn dây (N).',
      answer: 0.2,
      unit: 'N',
      hints: ['Đổi $10$ cm ra mét.', '$F = BIL\\sin\\alpha$ với $\\sin 30^\\circ = 0{,}5$.'],
      solution: '$F = 0{,}8 \\cdot 5 \\cdot 0{,}1 \\cdot 0{,}5 = 0{,}2$ N.',
    },
    {
      type: 'number',
      prompt:
        'Đoạn dây dài $12$ cm đặt vuông góc với đường sức từ, có dòng điện $4$ A chạy qua thì chịu lực từ $0{,}024$ N. Cảm ứng từ của từ trường là bao nhiêu tesla?',
      answer: 0.05,
      unit: 'T',
      hints: ['$B = \\dfrac{F}{IL}$ với $L$ tính bằng mét.'],
      solution: '$B = \\dfrac{0{,}024}{4 \\cdot 0{,}12} = \\dfrac{0{,}024}{0{,}48} = 0{,}05$ T.',
    },
    {
      type: 'choice',
      prompt:
        'Dây dẫn trong mặt phẳng hình vẽ có dòng điện chạy từ trái sang phải, đặt trong từ trường đều có $\\vec{B}$ hướng ra khỏi mặt phẳng hình vẽ (⊙). Lực từ tác dụng lên dây hướng',
      options: ['xuống dưới', 'lên trên', 'vào mặt phẳng hình vẽ', 'ra khỏi mặt phẳng hình vẽ'],
      answer: 0,
      hints: [
        '$\\vec{B}$ hướng ra phía em nên lòng bàn tay trái phải úp về phía trang giấy để đường sức đi vào lòng bàn tay.',
        'Các ngón tay hướng sang phải theo dòng điện; ngón cái chỉ về đâu?',
      ],
      solution:
        'Lòng bàn tay trái úp về phía trang giấy (đường sức hướng ra đi vào lòng bàn tay), các ngón tay chỉ sang phải theo dòng điện thì ngón cái chỉ xuống dưới. Lực từ hướng xuống dưới, ngược với trường hợp $\\vec{B}$ hướng vào.',
    },
    {
      type: 'choice',
      prompt:
        'Một đoạn dây dẫn mang dòng điện đặt song song với các đường sức của một từ trường đều. Lực từ tác dụng lên đoạn dây',
      options: [
        'bằng 0',
        'có độ lớn cực đại $F = BIL$',
        'có độ lớn $\\dfrac{BIL}{2}$',
        'hướng dọc theo đoạn dây',
      ],
      answer: 0,
      hints: [
        'Khi dây song song với đường sức, $\\alpha$ bằng bao nhiêu và $\\sin\\alpha$ bằng bao nhiêu?',
      ],
      solution:
        '$\\alpha = 0^\\circ$ hoặc $180^\\circ$ nên $\\sin\\alpha = 0$ và $F = BIL\\sin\\alpha = 0$.',
    },
    {
      type: 'choice',
      prompt: 'Đơn vị tesla (T) bằng',
      options: [
        '$1\\ \\dfrac{\\text{N}}{\\text{A} \\cdot \\text{m}}$',
        '$1\\ \\dfrac{\\text{N} \\cdot \\text{A}}{\\text{m}}$',
        '$1\\ \\dfrac{\\text{A} \\cdot \\text{m}}{\\text{N}}$',
        '$1\\ \\text{N} \\cdot \\text{A} \\cdot \\text{m}$',
      ],
      answer: 0,
      hints: ['Từ $B = \\dfrac{F}{IL}$ thay đơn vị của từng đại lượng.'],
      solution:
        '$B = \\dfrac{F}{IL}$ nên $1$ T $= \\dfrac{1\\ \\text{N}}{1\\ \\text{A} \\cdot 1\\ \\text{m}}$.',
    },
    {
      type: 'number',
      prompt:
        'Một đoạn dây đặt trong từ trường đều hợp với đường sức góc $30^\\circ$. Nếu tăng cường độ dòng điện lên $3$ lần và xoay dây cho vuông góc với đường sức thì lực từ tăng lên bao nhiêu lần?',
      answer: 6,
      unit: 'lần',
      hints: [
        '$F$ tỉ lệ với $I$ và với $\\sin\\alpha$.',
        'So sánh $\\sin 90^\\circ$ với $\\sin 30^\\circ$.',
      ],
      solution:
        '$\\dfrac{F_2}{F_1} = \\dfrac{I_2}{I_1} \\cdot \\dfrac{\\sin 90^\\circ}{\\sin 30^\\circ} = 3 \\cdot \\dfrac{1}{0{,}5} = 6$.',
    },
    {
      type: 'number',
      prompt:
        'Đoạn dây dài $20$ cm mang dòng điện $2$ A đặt trong từ trường đều $B = 0{,}5$ T thì chịu lực từ $0{,}1$ N. Biết góc giữa dây và đường sức từ là góc nhọn. Góc đó bằng bao nhiêu độ?',
      answer: 30,
      unit: '°',
      hints: [
        'Tính $BIL$ trước, rồi $\\sin\\alpha = \\dfrac{F}{BIL}$.',
        'Góc nhọn nào có sin bằng $0{,}5$?',
      ],
      solution:
        '$BIL = 0{,}5 \\cdot 2 \\cdot 0{,}2 = 0{,}2$ N, nên $\\sin\\alpha = \\dfrac{0{,}1}{0{,}2} = 0{,}5$. Góc nhọn $\\alpha = 30^\\circ$.',
    },
  ],
  takeaways: [
    'Lực từ lên đoạn dây mang dòng điện vuông góc với dây và với $\\vec{B}$; chiều theo quy tắc bàn tay trái (đường sức vào lòng bàn tay, cổ tay đến ngón tay theo dòng điện, ngón cái choãi ra chỉ lực).',
    'Độ lớn: $F = BIL\\sin\\alpha$, với $\\alpha$ là góc giữa dây và $\\vec{B}$; lớn nhất khi dây vuông góc, bằng 0 khi dây song song với đường sức.',
    'Cảm ứng từ $B = \\dfrac{F}{IL}$ (dây vuông góc với đường sức) đặc trưng cho độ mạnh yếu của từ trường; đơn vị tesla, $1$ T $= 1$ N/(A·m).',
  ],
};
