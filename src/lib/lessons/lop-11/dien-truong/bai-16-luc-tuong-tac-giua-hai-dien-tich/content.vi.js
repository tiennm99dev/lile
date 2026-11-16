/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hai điện tích cùng dấu đẩy nhau, trái dấu hút nhau. Định luật Coulomb: lực tương tác giữa hai điện tích điểm có phương trùng đường thẳng nối chúng, độ lớn F = k|q1q2|/r² với k = 9·10⁹ N·m²/C²; trong môi trường có hằng số điện môi ε lực giảm ε lần. Lực tác dụng lên một điện tích do nhiều điện tích gây ra là tổng vectơ các lực thành phần.',
  intro:
    'Cọ xát một chiếc thước nhựa vào tóc khô rồi đưa lại gần những mẩu giấy vụn: giấy bay lên bám vào thước. Hai quả cầu nhỏ cùng nhiễm điện thì lại đẩy nhau ra xa. Lực điện mạnh hay yếu phụ thuộc vào điều gì? Năm 1785, Coulomb đã trả lời câu hỏi đó bằng một chiếc cân xoắn.',
  objectives: [
    'Nêu được có hai loại điện tích; các điện tích cùng dấu đẩy nhau, trái dấu hút nhau.',
    'Phát biểu được định luật Coulomb và nêu được đơn vị đo điện tích.',
    'Vận dụng được $F = \\dfrac{k|q_1q_2|}{\\varepsilon r^2}$ cho điện tích đặt trong chân không và trong điện môi.',
    'Tổng hợp được lực điện do nhiều điện tích điểm tác dụng lên một điện tích.',
  ],
  sections: [
    {
      heading: 'Lực hút và lực đẩy giữa các điện tích',
      blocks: [
        {
          type: 'p',
          text: 'Có hai loại điện tích: điện tích dương và điện tích âm. Các điện tích cùng dấu thì đẩy nhau, các điện tích trái dấu thì hút nhau. Lực tương tác giữa các điện tích gọi là lực điện.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Điện tích và điện tích điểm',
          text: 'Điện tích kí hiệu là $q$, đơn vị là culông (C). Điện tích điểm là một vật tích điện có kích thước rất nhỏ so với khoảng cách tới điểm mà ta xét. Hai quả cầu tích điện có bán kính rất nhỏ so với khoảng cách giữa chúng có thể coi là hai điện tích điểm; khoảng cách được đo giữa hai tâm.',
        },
        {
          type: 'p',
          text: 'Điện tích của electron là $-e$, của proton là $+e$, với $e = 1{,}6 \\cdot 10^{-19}$ C là điện tích nguyên tố. Trong thực tế thường gặp những điện tích rất nhỏ như $1\\,\\mu\\text{C} = 10^{-6}$ C, $1$ nC $= 10^{-9}$ C.',
        },
      ],
    },
    {
      heading: 'Định luật Coulomb',
      blocks: [
        {
          type: 'p',
          text: 'Dùng cân xoắn, Coulomb đo lực giữa hai quả cầu nhỏ tích điện khi thay đổi điện tích của chúng và khoảng cách giữa chúng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định luật Coulomb',
          text: 'Lực hút hay đẩy giữa hai điện tích điểm đặt trong chân không có phương trùng với đường thẳng nối hai điện tích, có độ lớn tỉ lệ thuận với tích độ lớn của hai điện tích và tỉ lệ nghịch với bình phương khoảng cách giữa chúng: $$F = k\\dfrac{|q_1q_2|}{r^2}.$$',
        },
        {
          type: 'p',
          text: 'Trong hệ SI, $k = \\dfrac{1}{4\\pi\\varepsilon_0} = 9 \\cdot 10^9\\ \\text{N} \\cdot \\text{m}^2/\\text{C}^2$, với $\\varepsilon_0 = 8{,}85 \\cdot 10^{-12}\\ \\text{C}^2/(\\text{N} \\cdot \\text{m}^2)$ là hằng số điện. Khi tính, $q$ đo bằng C, $r$ đo bằng m thì $F$ có đơn vị N.',
        },
        {
          type: 'p',
          text: 'Hai lực $\\vec F_{12}$ (do $q_1$ tác dụng lên $q_2$) và $\\vec F_{21}$ (do $q_2$ tác dụng lên $q_1$) là hai lực trực đối: cùng phương, ngược chiều, cùng độ lớn, đặt vào hai điện tích khác nhau.',
        },
      ],
    },
    {
      heading: 'Lực điện trong điện môi. Hằng số điện môi',
      blocks: [
        {
          type: 'p',
          text: 'Khi hai điện tích được đặt trong một chất cách điện đồng tính (điện môi) như dầu hoả, nước nguyên chất, lực tương tác giữa chúng nhỏ hơn khi đặt trong chân không.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Lực Coulomb trong điện môi',
          text: '$$F = k\\dfrac{|q_1q_2|}{\\varepsilon r^2} = \\dfrac{|q_1q_2|}{4\\pi\\varepsilon_0\\varepsilon r^2}.$$ $\\varepsilon$ là hằng số điện môi của môi trường: lực điện trong môi trường đó nhỏ hơn trong chân không $\\varepsilon$ lần.',
        },
        {
          type: 'table',
          head: ['Môi trường', 'Hằng số điện môi $\\varepsilon$'],
          rows: [
            ['Chân không', '$1$'],
            ['Không khí (ở điều kiện thường)', '$\\approx 1$'],
            ['Dầu hoả', '$2$'],
            ['Thuỷ tinh', '$5$ đến $10$'],
            ['Nước nguyên chất', '$81$'],
          ],
          caption: 'Hằng số điện môi của một số chất (giá trị gần đúng).',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Hằng số điện môi không có đơn vị và luôn $\\varepsilon \\ge 1$. Không khí có $\\varepsilon$ rất gần $1$ nên thường coi lực trong không khí bằng lực trong chân không.',
        },
      ],
    },
    {
      heading: 'Tổng hợp lực điện',
      blocks: [
        {
          type: 'p',
          text: 'Khi điện tích $q_0$ chịu tác dụng của nhiều điện tích $q_1, q_2, \\ldots$, mỗi điện tích tác dụng lên $q_0$ một lực Coulomb như thể không có các điện tích khác. Lực tổng hợp là tổng vectơ: $$\\vec F = \\vec F_{10} + \\vec F_{20} + \\ldots$$',
        },
        {
          type: 'list',
          items: [
            'Hai lực cùng chiều: $F = F_{10} + F_{20}$.',
            'Hai lực ngược chiều: $F = |F_{10} - F_{20}|$, $\\vec F$ cùng chiều với lực lớn hơn.',
            'Hai lực vuông góc: $F = \\sqrt{F_{10}^2 + F_{20}^2}$.',
            'Trường hợp tổng quát: dựng hình bình hành, $F^2 = F_{10}^2 + F_{20}^2 + 2F_{10}F_{20}\\cos\\alpha$ với $\\alpha$ là góc giữa hai lực.',
          ],
        },
        { type: 'widget', name: 'tong-hop' },
      ],
    },
  ],
  explore: {
    title: 'Hai điện tích trên mặt bàn',
    instruction:
      'Kéo $q_1$, $q_2$ lại gần hoặc ra xa, đổi dấu và độ lớn điện tích, đổi môi trường. Bấm “Ghi nhớ lực này” rồi tăng gấp đôi khoảng cách: lực giảm mấy lần?',
  },
  examples: [
    {
      problem:
        'Hai điện tích điểm $q_1 = 2 \\cdot 10^{-6}$ C và $q_2 = -3 \\cdot 10^{-6}$ C đặt cách nhau $30$ cm trong chân không. Hai điện tích hút hay đẩy nhau? Tính độ lớn lực tương tác. Nếu đặt chúng trong dầu hoả ($\\varepsilon = 2$) với cùng khoảng cách thì lực bằng bao nhiêu?',
      steps: [
        '$q_1 > 0$, $q_2 < 0$: hai điện tích trái dấu nên hút nhau.',
        'Đổi $r = 30$ cm $= 0{,}3$ m.',
        'Trong chân không: $F = k\\dfrac{|q_1q_2|}{r^2} = 9 \\cdot 10^9 \\cdot \\dfrac{2 \\cdot 10^{-6} \\cdot 3 \\cdot 10^{-6}}{0{,}3^2} = 0{,}6$ N.',
        "Trong dầu hoả lực giảm $\\varepsilon = 2$ lần: $F' = \\dfrac{F}{\\varepsilon} = 0{,}3$ N.",
      ],
      answer: 'Hai điện tích hút nhau; $F = 0{,}6$ N trong chân không và $0{,}3$ N trong dầu hoả.',
    },
    {
      problem:
        'Hai quả cầu nhỏ mang điện tích bằng nhau, đặt cách nhau $10$ cm trong không khí thì đẩy nhau với lực $3{,}6$ N. Tìm độ lớn điện tích của mỗi quả cầu.',
      steps: [
        'Từ $F = k\\dfrac{q^2}{r^2}$ suy ra $q^2 = \\dfrac{Fr^2}{k}$.',
        '$q^2 = \\dfrac{3{,}6 \\cdot 0{,}1^2}{9 \\cdot 10^9} = 4 \\cdot 10^{-12}$ (C²).',
        '$|q| = 2 \\cdot 10^{-6}$ C.',
      ],
      answer:
        'Mỗi quả cầu mang điện tích có độ lớn $2 \\cdot 10^{-6}$ C $= 2\\,\\mu\\text{C}$ (cùng dấu).',
    },
    {
      problem:
        'Đặt $q_1 = 2\\,\\mu\\text{C}$ tại $A$ và $q_2 = -2\\,\\mu\\text{C}$ tại $B$ trong chân không, $AB = 20$ cm. Tính lực điện tổng hợp tác dụng lên $q_0 = 1\\,\\mu\\text{C}$ đặt tại trung điểm $O$ của $AB$.',
      steps: [
        '$OA = OB = 0{,}1$ m. $F_{10} = F_{20} = 9 \\cdot 10^9 \\cdot \\dfrac{2 \\cdot 10^{-6} \\cdot 10^{-6}}{0{,}1^2} = 1{,}8$ N.',
        '$q_1$ và $q_0$ cùng dấu nên $\\vec F_{10}$ đẩy $q_0$ ra xa $A$, hướng về phía $B$.',
        '$q_2$ và $q_0$ trái dấu nên $\\vec F_{20}$ hút $q_0$ về phía $B$.',
        'Hai lực cùng chiều: $F = F_{10} + F_{20} = 3{,}6$ N.',
      ],
      answer: '$F = 3{,}6$ N, hướng từ $O$ về phía $B$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hai điện tích điểm $q_1 > 0$ và $q_2 < 0$ đặt gần nhau thì',
      options: [
        'hút nhau',
        'đẩy nhau',
        'không tương tác với nhau',
        'hút hay đẩy còn tuỳ khoảng cách',
      ],
      answer: 0,
      hints: ['So sánh dấu của hai điện tích.'],
      solution: 'Hai điện tích trái dấu thì hút nhau, ở mọi khoảng cách.',
    },
    {
      type: 'number',
      prompt:
        'Hai điện tích $q_1 = q_2 = 4 \\cdot 10^{-8}$ C đặt cách nhau $6$ cm trong chân không. Tính độ lớn lực tương tác giữa chúng (theo mN).',
      answer: 4,
      unit: 'mN',
      tolerance: 0.01,
      hints: [
        'Đổi $r = 6$ cm $= 0{,}06$ m.',
        'Áp dụng $F = k\\dfrac{|q_1q_2|}{r^2}$ rồi đổi sang mN.',
      ],
      solution:
        '$F = 9 \\cdot 10^9 \\cdot \\dfrac{(4 \\cdot 10^{-8})^2}{0{,}06^2} = \\dfrac{1{,}44 \\cdot 10^{-5}}{3{,}6 \\cdot 10^{-3}} = 4 \\cdot 10^{-3}$ N $= 4$ mN.',
    },
    {
      type: 'choice',
      prompt:
        'Giữ nguyên hai điện tích, tăng khoảng cách giữa chúng lên gấp đôi thì độ lớn lực Coulomb',
      options: ['giảm $4$ lần', 'giảm $2$ lần', 'tăng $2$ lần', 'không đổi'],
      answer: 0,
      hints: ['$F$ tỉ lệ nghịch với $r^2$.'],
      solution:
        '$F \\sim \\dfrac{1}{r^2}$: $r$ tăng $2$ lần thì $r^2$ tăng $4$ lần, $F$ giảm $4$ lần.',
    },
    {
      type: 'number',
      prompt:
        'Tăng điện tích $q_1$ lên $3$ lần, giữ nguyên $q_2$ và giảm khoảng cách đi một nửa. Lực tương tác mới gấp bao nhiêu lần lực cũ?',
      answer: 12,
      hints: ['Xét riêng từng thay đổi: tích $|q_1q_2|$ và $r^2$.'],
      solution:
        'Tích $|q_1q_2|$ tăng $3$ lần; $r$ giảm $2$ lần nên $r^2$ giảm $4$ lần. Vậy $F$ tăng $3 \\cdot 4 = 12$ lần.',
    },
    {
      type: 'number',
      prompt:
        'Hai điện tích bằng nhau $q_1 = q_2 = 10^{-6}$ C đặt trong chân không đẩy nhau với lực $0{,}9$ N. Tính khoảng cách giữa chúng (theo cm).',
      answer: 10,
      unit: 'cm',
      tolerance: 0.01,
      hints: ['Từ $F = k\\dfrac{q^2}{r^2}$ suy ra $r = \\sqrt{\\dfrac{kq^2}{F}}$.'],
      solution:
        '$r^2 = \\dfrac{9 \\cdot 10^9 \\cdot 10^{-12}}{0{,}9} = 0{,}01$ m², $r = 0{,}1$ m $= 10$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Hai điện tích đặt trong không khí hút nhau với lực $4{,}2$ N. Đưa chúng vào một chất lỏng, giữ nguyên khoảng cách, lực hút còn $2$ N. Tính hằng số điện môi của chất lỏng.',
      answer: 2.1,
      tolerance: 0.001,
      hints: ['Trong điện môi lực giảm $\\varepsilon$ lần so với trong không khí.'],
      solution: '$\\varepsilon = \\dfrac{F_{kk}}{F} = \\dfrac{4{,}2}{2} = 2{,}1$.',
    },
    {
      type: 'choice',
      prompt: 'Phát biểu nào về hằng số điện môi $\\varepsilon$ là đúng?',
      options: [
        '$\\varepsilon \\ge 1$; lực điện trong điện môi nhỏ hơn trong chân không $\\varepsilon$ lần',
        '$\\varepsilon$ có đơn vị C²/(N·m²)',
        'Lực điện trong điện môi lớn hơn trong chân không $\\varepsilon$ lần',
        'Hằng số điện môi của chân không bằng $0$',
      ],
      answer: 0,
      hints: [
        'Nhớ công thức $F = k\\dfrac{|q_1q_2|}{\\varepsilon r^2}$ và giá trị $\\varepsilon$ của chân không.',
      ],
      solution:
        '$\\varepsilon$ không có đơn vị, chân không có $\\varepsilon = 1$, các điện môi có $\\varepsilon > 1$ nên lực giảm $\\varepsilon$ lần.',
    },
    {
      type: 'number',
      prompt:
        'Hai điện tích $q_1 = q_2 = 2\\,\\mu\\text{C}$ đặt tại $A$ và $B$. Điện tích $q_0 = 1\\,\\mu\\text{C}$ đặt tại $C$ với $CA = CB = 20$ cm và $\\widehat{ACB} = 90^\\circ$, tất cả trong chân không. Tính độ lớn lực điện tổng hợp tác dụng lên $q_0$ (theo N, làm tròn đến hàng phần trăm).',
      answer: 0.64,
      unit: 'N',
      tolerance: 0.006,
      hints: [
        'Tính $F_{10} = F_{20}$ bằng định luật Coulomb.',
        'Hai lực vuông góc với nhau: $F = \\sqrt{F_{10}^2 + F_{20}^2}$.',
      ],
      solution:
        '$F_{10} = F_{20} = 9 \\cdot 10^9 \\cdot \\dfrac{2 \\cdot 10^{-6} \\cdot 10^{-6}}{0{,}2^2} = 0{,}45$ N. Hai lực đều đẩy $q_0$ và vuông góc nhau nên $F = 0{,}45\\sqrt{2} \\approx 0{,}64$ N.',
    },
    {
      type: 'number',
      prompt:
        'Trong nguyên tử hiđrô, electron cách hạt nhân (một proton) $r = 5{,}3 \\cdot 10^{-11}$ m. Tính lực hút tĩnh điện giữa chúng, viết dưới dạng $x \\cdot 10^{-8}$ N; nhập $x$ (làm tròn đến hàng phần mười).',
      answer: 8.2,
      tolerance: 0.05,
      hints: [
        'Electron và proton có điện tích cùng độ lớn $e = 1{,}6 \\cdot 10^{-19}$ C.',
        'Tính $F = k\\dfrac{e^2}{r^2}$.',
      ],
      solution:
        '$F = 9 \\cdot 10^9 \\cdot \\dfrac{(1{,}6 \\cdot 10^{-19})^2}{(5{,}3 \\cdot 10^{-11})^2} = \\dfrac{2{,}304 \\cdot 10^{-28}}{2{,}809 \\cdot 10^{-21}} \\approx 8{,}2 \\cdot 10^{-8}$ N.',
    },
  ],
  takeaways: [
    'Điện tích cùng dấu đẩy nhau, trái dấu hút nhau; đơn vị điện tích là culông (C).',
    'Định luật Coulomb: $F = k\\dfrac{|q_1q_2|}{\\varepsilon r^2}$, $k = 9 \\cdot 10^9\\ \\text{N} \\cdot \\text{m}^2/\\text{C}^2$, lực có phương là đường thẳng nối hai điện tích.',
    'Hằng số điện môi $\\varepsilon \\ge 1$ cho biết lực điện trong môi trường nhỏ hơn trong chân không bao nhiêu lần.',
    'Lực do nhiều điện tích tác dụng lên một điện tích là tổng vectơ các lực thành phần.',
  ],
};
