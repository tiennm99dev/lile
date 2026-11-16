/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Điện trường là môi trường bao quanh điện tích, tác dụng lực điện lên điện tích khác đặt trong nó. Cường độ điện trường E = F/q đặc trưng cho điện trường về phương diện tác dụng lực, đơn vị V/m; điện tích điểm Q gây ra điện trường E = k|Q|/(εr²). Đường sức điện đi ra từ điện tích dương, đi vào điện tích âm, không cắt nhau và mau ở chỗ điện trường mạnh.',
  intro:
    'Hai điện tích đặt cách nhau, không chạm vào nhau, vẫn hút hoặc đẩy nhau. Lực đó được truyền đi bằng cách nào? Câu trả lời là điện trường: mỗi điện tích làm thay đổi không gian quanh nó, và điện tích khác đặt vào đó sẽ “cảm nhận” được sự thay đổi ấy dưới dạng lực điện.',
  objectives: [
    'Nêu được khái niệm điện trường là trường lực được tạo ra bởi điện tích, là dạng vật chất tồn tại quanh điện tích.',
    'Định nghĩa được cường độ điện trường $\\vec E = \\dfrac{\\vec F}{q}$ và nêu được đơn vị V/m.',
    'Vận dụng được $E = \\dfrac{k|Q|}{\\varepsilon r^2}$ và nguyên lí chồng chất điện trường.',
    'Nêu được khái niệm và các tính chất của đường sức điện.',
  ],
  sections: [
    {
      heading: 'Điện trường',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Điện trường',
          text: 'Điện trường là trường lực được tạo ra bởi điện tích, là dạng vật chất tồn tại xung quanh điện tích và truyền tương tác điện. Điện trường tác dụng lực điện lên điện tích khác đặt trong nó.',
        },
        {
          type: 'p',
          text: 'Để nhận biết điện trường tại một điểm, ta đặt tại đó một điện tích thử $q$ nhỏ (để nó không làm thay đổi đáng kể điện trường cần xét) và xem nó có chịu lực điện hay không.',
        },
      ],
    },
    {
      heading: 'Cường độ điện trường',
      blocks: [
        {
          type: 'p',
          text: 'Đặt lần lượt các điện tích thử $q$ khác nhau tại cùng một điểm $M$: lực điện $F$ tỉ lệ với $q$, còn thương số $\\dfrac{F}{q}$ không đổi. Thương số đó chỉ phụ thuộc điện trường tại $M$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Cường độ điện trường',
          text: 'Cường độ điện trường tại một điểm là đại lượng đặc trưng cho điện trường tại điểm đó về phương diện tác dụng lực, đo bằng thương số của lực điện tác dụng lên điện tích thử đặt tại điểm đó và độ lớn của điện tích thử: $$\\vec E = \\dfrac{\\vec F}{q}, \\qquad E = \\dfrac{F}{|q|}.$$ Đơn vị cường độ điện trường là vôn trên mét (V/m), cũng bằng N/C.',
        },
        {
          type: 'list',
          items: [
            '$q > 0$: lực $\\vec F = q\\vec E$ cùng chiều với $\\vec E$.',
            '$q < 0$: lực $\\vec F$ ngược chiều với $\\vec E$.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Điện trường của một điện tích điểm',
          text: 'Điện tích điểm $Q$ đặt trong môi trường có hằng số điện môi $\\varepsilon$ gây ra tại điểm cách nó một khoảng $r$ điện trường có $$E = k\\dfrac{|Q|}{\\varepsilon r^2} = \\dfrac{|Q|}{4\\pi\\varepsilon_0\\varepsilon r^2}.$$ $\\vec E$ nằm trên đường thẳng nối $Q$ với điểm đó, hướng ra xa $Q$ nếu $Q > 0$, hướng về phía $Q$ nếu $Q < 0$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nguyên lí chồng chất điện trường',
          text: 'Điện trường do nhiều điện tích điểm gây ra tại một điểm bằng tổng vectơ các cường độ điện trường do từng điện tích gây ra tại điểm đó: $\\vec E = \\vec E_1 + \\vec E_2 + \\ldots$',
        },
      ],
    },
    {
      heading: 'Đường sức điện',
      blocks: [
        {
          type: 'p',
          text: 'Rắc bột mạt cưa (hoặc hạt cỏ) vào dầu cách điện quanh một vật tích điện, các hạt tự sắp xếp thành những đường cong. Hình ảnh đó gọi là điện phổ, gợi ý cách biểu diễn điện trường bằng các đường sức.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đường sức điện',
          text: 'Đường sức điện là đường mà tiếp tuyến tại mỗi điểm của nó là giá của vectơ cường độ điện trường tại điểm đó. Chiều của đường sức là chiều của $\\vec E$.',
        },
        {
          type: 'list',
          items: [
            'Qua mỗi điểm trong điện trường chỉ vẽ được một đường sức; các đường sức không cắt nhau.',
            'Đường sức điện là những đường có hướng, không khép kín: đi ra từ điện tích dương và kết thúc ở điện tích âm (hoặc đi ra vô cực, hoặc từ vô cực đi tới).',
            'Ở chỗ cường độ điện trường lớn, đường sức vẽ mau (dày); ở chỗ cường độ điện trường nhỏ, đường sức vẽ thưa.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Đường sức không phải quỹ đạo chuyển động của điện tích; nó chỉ cho biết hướng của lực điện tác dụng lên điện tích dương đặt tại mỗi điểm.',
        },
      ],
    },
  ],
  explore: {
    title: 'Vẽ đường sức, đo cường độ điện trường',
    instruction:
      'Mỗi điện tích có độ lớn $1$ nC. Chọn một cấu hình hoặc thêm điện tích, kéo chúng trên mặt phẳng. Kéo điểm $M$ để đo $\\vec E$, đổi dấu điện tích thử để thấy chiều của lực $\\vec F = q\\vec E$.',
  },
  examples: [
    {
      problem:
        'Điện tích điểm $Q = 4 \\cdot 10^{-9}$ C đặt trong không khí. Tính cường độ điện trường tại $M$ cách $Q$ một đoạn $20$ cm. Đặt tại $M$ điện tích $q = -2 \\cdot 10^{-9}$ C thì lực điện tác dụng lên $q$ có độ lớn và hướng thế nào?',
      steps: [
        '$E = k\\dfrac{|Q|}{r^2} = 9 \\cdot 10^9 \\cdot \\dfrac{4 \\cdot 10^{-9}}{0{,}2^2} = 900$ V/m; $Q > 0$ nên $\\vec E$ hướng ra xa $Q$.',
        '$F = |q|E = 2 \\cdot 10^{-9} \\cdot 900 = 1{,}8 \\cdot 10^{-6}$ N.',
        '$q < 0$ nên $\\vec F$ ngược chiều $\\vec E$, tức hướng về phía $Q$ (hai điện tích trái dấu hút nhau).',
      ],
      answer: '$E = 900$ V/m; $F = 1{,}8 \\cdot 10^{-6}$ N, hướng về phía $Q$.',
    },
    {
      problem:
        'Hai điện tích $q_1 = 10^{-9}$ C đặt tại $A$ và $q_2 = -10^{-9}$ C đặt tại $B$ trong không khí, $AB = 6$ cm. Tính cường độ điện trường tại trung điểm $O$ của $AB$.',
      steps: [
        '$OA = OB = 0{,}03$ m. $E_1 = E_2 = 9 \\cdot 10^9 \\cdot \\dfrac{10^{-9}}{0{,}03^2} = 10^4$ V/m.',
        '$q_1 > 0$: $\\vec E_1$ hướng ra xa $A$, tức về phía $B$. $q_2 < 0$: $\\vec E_2$ hướng về phía $B$.',
        'Hai vectơ cùng chiều: $E = E_1 + E_2 = 2 \\cdot 10^4$ V/m.',
      ],
      answer: '$E = 2 \\cdot 10^4$ V/m, hướng từ $A$ sang $B$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Cường độ điện trường tại một điểm đặc trưng cho',
      options: [
        'điện trường tại điểm đó về phương diện tác dụng lực',
        'thể tích vùng có điện trường',
        'độ lớn điện tích thử đặt tại điểm đó',
        'tốc độ dịch chuyển của điện tích tại điểm đó',
      ],
      answer: 0,
      hints: ['Nhớ định nghĩa $\\vec E = \\dfrac{\\vec F}{q}$.'],
      solution:
        'Cường độ điện trường đặc trưng cho điện trường về phương diện tác dụng lực, không phụ thuộc điện tích thử.',
    },
    {
      type: 'number',
      prompt:
        'Đặt điện tích thử $q = 5 \\cdot 10^{-9}$ C tại điểm $M$ thì nó chịu lực điện $2 \\cdot 10^{-4}$ N. Tính cường độ điện trường tại $M$ (theo kV/m).',
      answer: 40,
      unit: 'kV/m',
      tolerance: 0.01,
      hints: ['$E = \\dfrac{F}{|q|}$; $1$ kV/m $= 1\\,000$ V/m.'],
      solution:
        '$E = \\dfrac{2 \\cdot 10^{-4}}{5 \\cdot 10^{-9}} = 4 \\cdot 10^4$ V/m $= 40$ kV/m.',
    },
    {
      type: 'number',
      prompt:
        'Điện tích điểm $Q = 8 \\cdot 10^{-9}$ C đặt trong không khí. Tính cường độ điện trường tại điểm cách $Q$ một đoạn $30$ cm (theo V/m).',
      answer: 800,
      unit: 'V/m',
      tolerance: 0.5,
      hints: ['Đổi $r = 0{,}3$ m rồi dùng $E = k\\dfrac{|Q|}{r^2}$.'],
      solution:
        '$E = 9 \\cdot 10^9 \\cdot \\dfrac{8 \\cdot 10^{-9}}{0{,}3^2} = \\dfrac{72}{0{,}09} = 800$ V/m.',
    },
    {
      type: 'choice',
      prompt:
        'Khoảng cách từ điểm $M$ tới điện tích điểm $Q$ tăng lên $3$ lần thì cường độ điện trường tại $M$',
      options: ['giảm $9$ lần', 'giảm $3$ lần', 'tăng $3$ lần', 'không đổi'],
      answer: 0,
      hints: ['$E$ tỉ lệ nghịch với $r^2$.'],
      solution: '$E \\sim \\dfrac{1}{r^2}$: $r$ tăng $3$ lần thì $E$ giảm $3^2 = 9$ lần.',
    },
    {
      type: 'choice',
      prompt:
        'Tại điểm $M$, vectơ cường độ điện trường hướng sang phải. Đặt tại $M$ một electron thì lực điện tác dụng lên electron',
      options: [
        'hướng sang trái',
        'hướng sang phải',
        'bằng $0$ vì electron rất nhỏ',
        'vuông góc với $\\vec E$',
      ],
      answer: 0,
      hints: ['Electron mang điện tích âm; $\\vec F = q\\vec E$.'],
      solution:
        'Electron có $q = -e < 0$ nên $\\vec F$ ngược chiều $\\vec E$, tức hướng sang trái.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các phát biểu đúng về đường sức điện.',
      options: [
        'Các đường sức điện không cắt nhau.',
        'Đường sức điện đi ra từ điện tích dương và kết thúc ở điện tích âm.',
        'Ở chỗ điện trường mạnh, đường sức vẽ mau hơn.',
        'Đường sức điện là quỹ đạo chuyển động của điện tích thử.',
        'Đường sức điện của điện tích điểm là những đường tròn đồng tâm.',
      ],
      answers: [0, 1, 2],
      hints: [
        'Nhớ lại ba tính chất của đường sức trong bài.',
        'Đường sức của điện tích điểm có dạng gì: tia hay đường tròn?',
      ],
      solution:
        'Đường sức không cắt nhau, đi ra từ điện tích dương, kết thúc ở điện tích âm và mau ở chỗ điện trường mạnh. Đường sức không phải quỹ đạo; đường sức của một điện tích điểm là các nửa đường thẳng (tia) xuất phát từ điện tích.',
    },
    {
      type: 'number',
      prompt:
        'Điện tích $Q = 4 \\cdot 10^{-8}$ C đặt trong dầu hoả có $\\varepsilon = 2$. Tính cường độ điện trường tại điểm cách $Q$ một đoạn $10$ cm (theo kV/m).',
      answer: 18,
      unit: 'kV/m',
      tolerance: 0.01,
      hints: ['Dùng $E = k\\dfrac{|Q|}{\\varepsilon r^2}$ với $r = 0{,}1$ m.'],
      solution:
        '$E = 9 \\cdot 10^9 \\cdot \\dfrac{4 \\cdot 10^{-8}}{2 \\cdot 0{,}1^2} = \\dfrac{360}{0{,}02} = 18\\,000$ V/m $= 18$ kV/m.',
    },
    {
      type: 'number',
      prompt:
        'Cường độ điện trường do điện tích điểm $Q$ gây ra tại điểm cách nó $20$ cm trong không khí là $4\\,500$ V/m. Tính độ lớn của $Q$ (theo nC).',
      answer: 20,
      unit: 'nC',
      tolerance: 0.01,
      hints: ['Từ $E = k\\dfrac{|Q|}{r^2}$ suy ra $|Q| = \\dfrac{Er^2}{k}$.'],
      solution:
        '$|Q| = \\dfrac{4\\,500 \\cdot 0{,}2^2}{9 \\cdot 10^9} = 2 \\cdot 10^{-8}$ C $= 20$ nC.',
    },
    {
      type: 'number',
      prompt:
        'Hai điện tích dương $q_1 = 4$ nC tại $A$ và $q_2 = 1$ nC tại $B$, $AB = 9$ cm. Điểm $M$ trên đoạn $AB$ có cường độ điện trường tổng hợp bằng $0$. Tính $AM$ (theo cm).',
      answer: 6,
      unit: 'cm',
      tolerance: 0.01,
      hints: [
        'Tại $M$ hai vectơ $\\vec E_1$, $\\vec E_2$ ngược chiều nên cần $E_1 = E_2$.',
        'Đặt $AM = x$, $BM = 9 - x$ rồi giải $\\dfrac{4}{x^2} = \\dfrac{1}{(9 - x)^2}$.',
      ],
      solution:
        '$E_1 = E_2 \\Leftrightarrow \\dfrac{4}{x^2} = \\dfrac{1}{(9 - x)^2} \\Leftrightarrow \\dfrac{2}{x} = \\dfrac{1}{9 - x} \\Leftrightarrow 18 - 2x = x$, nên $x = 6$ cm.',
    },
  ],
  takeaways: [
    'Điện trường là dạng vật chất bao quanh điện tích, tác dụng lực điện lên điện tích khác đặt trong nó.',
    'Cường độ điện trường $\\vec E = \\dfrac{\\vec F}{q}$, đơn vị V/m; lực lên $q > 0$ cùng chiều $\\vec E$, lên $q < 0$ ngược chiều $\\vec E$.',
    'Điện tích điểm: $E = k\\dfrac{|Q|}{\\varepsilon r^2}$; nhiều điện tích: $\\vec E = \\vec E_1 + \\vec E_2 + \\ldots$',
    'Đường sức điện đi ra từ điện tích dương, vào điện tích âm, không cắt nhau, mau ở chỗ điện trường mạnh.',
  ],
};
