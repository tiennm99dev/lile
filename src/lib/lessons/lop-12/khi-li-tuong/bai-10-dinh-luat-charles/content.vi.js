/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Định luật Charles: khi áp suất của một khối lượng khí xác định được giữ không đổi thì thể tích của khí tỉ lệ thuận với nhiệt độ tuyệt đối, V/T = hằng số. Đường đẳng áp trong hệ toạ độ V – T là đường thẳng kéo dài đi qua gốc toạ độ; kéo dài đường V – t, thể tích bằng 0 ở −273 °C, độ không tuyệt đối.',
  intro:
    'Một quả bóng bay để trong phòng máy lạnh trông hơi xẹp, mang ra ngoài trời nắng một lúc lại căng phồng lên. Lượng khí trong bóng không đổi, áp suất bên trong gần bằng áp suất khí quyển, chỉ có nhiệt độ thay đổi. Thể tích khí phụ thuộc nhiệt độ theo quy luật nào?',
  objectives: [
    'Nêu được thế nào là quá trình đẳng áp.',
    'Mô tả được thí nghiệm khảo sát mối liên hệ giữa thể tích và nhiệt độ của khí khi áp suất không đổi.',
    'Phát biểu và vận dụng được định luật Charles: $\\dfrac{V}{T} = $ hằng số.',
    'Vẽ được đường đẳng áp và giải thích được ý nghĩa của độ không tuyệt đối.',
  ],
  sections: [
    {
      heading: 'Quá trình đẳng áp. Thí nghiệm',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Quá trình đẳng áp',
          text: 'Quá trình biến đổi trạng thái của một khối lượng khí xác định trong đó áp suất được giữ không đổi gọi là quá trình đẳng áp.',
        },
        {
          type: 'p',
          text: 'Thí nghiệm: một lượng khí được nhốt trong xi lanh bằng một pít-tông có thể chuyển động tự do, nên áp suất khí luôn bằng áp suất bên ngoài và không đổi. Đun nóng (hoặc làm lạnh) khí từ từ, đọc nhiệt độ trên nhiệt kế và thể tích trên thang chia của xi lanh ở nhiều thời điểm rồi tính tỉ số $\\dfrac{V}{T}$.',
        },
        {
          type: 'table',
          head: ['$t$ (°C)', '$T$ (K)', '$V$ (cm³)', '$\\dfrac{V}{T}$ (cm³/K)'],
          rows: [
            ['$27$', '$300$', '$30{,}0$', '$0{,}100$'],
            ['$47$', '$320$', '$32{,}0$', '$0{,}100$'],
            ['$77$', '$350$', '$35{,}0$', '$0{,}100$'],
            ['$127$', '$400$', '$40{,}0$', '$0{,}100$'],
          ],
          caption: 'Một bộ số đo mẫu ở áp suất không đổi: tỉ số V/T không đổi.',
        },
      ],
    },
    {
      heading: 'Định luật Charles',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định luật Charles',
          text: 'Khi giữ áp suất của một khối lượng khí xác định không đổi thì thể tích của khí tỉ lệ thuận với nhiệt độ tuyệt đối của nó: $$\\frac{V}{T} = \\text{hằng số}.$$ Với hai trạng thái 1 và 2 của cùng một lượng khí ở cùng áp suất: $$\\frac{V_1}{T_1} = \\frac{V_2}{T_2}.$$',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Phải dùng nhiệt độ tuyệt đối',
          text: 'Trong định luật Charles, $T$ là nhiệt độ theo thang Kelvin: $T = t + 273$. Thể tích không tỉ lệ với nhiệt độ Celsius: đun khí từ $10$ °C lên $20$ °C thì thể tích chỉ tăng $\\dfrac{293}{283} \\approx 1{,}035$ lần, không phải gấp đôi.',
        },
        {
          type: 'p',
          text: 'Theo mô hình động học phân tử: khi nhiệt độ tăng, phân tử chuyển động nhanh hơn và va chạm lên thành bình mạnh hơn, thường xuyên hơn. Muốn áp suất không đổi thì mật độ phân tử phải giảm, tức thể tích khí phải tăng: pít-tông bị đẩy ra.',
        },
      ],
    },
    {
      heading: 'Đường đẳng áp và độ không tuyệt đối',
      blocks: [
        {
          type: 'p',
          text: 'Đường biểu diễn sự biến thiên của thể tích theo nhiệt độ khi áp suất không đổi gọi là đường đẳng áp. Trong hệ toạ độ $(V, T)$, đường đẳng áp là một đường thẳng mà nếu kéo dài sẽ đi qua gốc toạ độ. Ứng với các áp suất khác nhau của cùng một lượng khí có các đường đẳng áp khác nhau: ở cùng nhiệt độ, áp suất lớn hơn thì thể tích nhỏ hơn, nên đường đẳng áp ở dưới ứng với áp suất lớn hơn.',
        },
        {
          type: 'p',
          text: 'Nếu vẽ thể tích theo nhiệt độ Celsius $t$, ta cũng được một đường thẳng. Kéo dài đường thẳng này về phía nhiệt độ thấp, nó cắt trục nhiệt độ tại $t \\approx -273$ °C, dù thí nghiệm được làm ở áp suất nào: $$V = V_0\\left(1 + \\frac{t}{273}\\right),$$ với $V_0$ là thể tích ở $0$ °C.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Độ không tuyệt đối',
          text: 'Nhiệt độ $-273{,}15$ °C (trong tính toán lấy $-273$ °C) mà tại đó, theo định luật Charles, thể tích khí lí tưởng bằng $0$ gọi là độ không tuyệt đối. Kelvin chọn nhiệt độ này làm số $0$ của thang nhiệt độ tuyệt đối: $0$ K. Không thể đạt tới độ không tuyệt đối; thực tế mọi khí đều hoá lỏng trước khi tới đó.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đun khí dưới pít-tông tự do',
    instruction:
      'Kéo thanh nhiệt độ để đun nóng hoặc làm lạnh khí, bấm "Ghi số đo" ở ít nhất 3 nhiệt độ. Trên đồ thị $V$ theo $t$, đường thẳng kéo dài (nét đứt) cắt trục nhiệt độ ở đâu? Đổi sang trục $T$ (K) và thử thêm áp suất $2 \\cdot 10^5$ Pa.',
  },
  examples: [
    {
      problem:
        'Một lượng khí có thể tích $6$ lít ở $27$ °C được đun nóng đẳng áp đến $77$ °C. Tính thể tích của khí lúc sau.',
      steps: [
        'Đổi sang nhiệt độ tuyệt đối: $T_1 = 27 + 273 = 300$ K; $T_2 = 77 + 273 = 350$ K.',
        'Quá trình đẳng áp, theo định luật Charles: $\\dfrac{V_1}{T_1} = \\dfrac{V_2}{T_2}$.',
        '$V_2 = V_1 \\cdot \\dfrac{T_2}{T_1} = 6 \\cdot \\dfrac{350}{300} = 7$ lít.',
      ],
      answer: '$V_2 = 7$ lít.',
    },
    {
      problem:
        'Ở áp suất không đổi, một lượng khí có thể tích $273$ cm³ ở $0$ °C. Khi đun nóng, cứ tăng $1$ °C thì thể tích tăng thêm $1$ cm³. Hỏi theo quy luật này, ở nhiệt độ nào thể tích khí bằng $0$?',
      steps: [
        'Thể tích theo nhiệt độ Celsius: $V = 273 + t$ (cm³), tức $V = V_0\\left(1 + \\dfrac{t}{273}\\right)$ với $V_0 = 273$ cm³.',
        'Cho $V = 0$: $273 + t = 0 \\Rightarrow t = -273$ °C.',
        'Đặt $T = t + 273$ thì $V = T$ (cm³): thể tích tỉ lệ thuận với nhiệt độ tuyệt đối, đúng như định luật Charles.',
      ],
      answer: 'Thể tích bằng $0$ ở $-273$ °C, tức $0$ K: độ không tuyệt đối.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Quá trình biến đổi trạng thái của một lượng khí xác định trong đó áp suất được giữ không đổi gọi là',
      options: [
        'quá trình đẳng áp',
        'quá trình đẳng nhiệt',
        'quá trình đẳng tích',
        'quá trình đoạn nhiệt',
      ],
      answer: 0,
      hints: ['"Áp" chỉ áp suất.'],
      solution: 'Áp suất không đổi: quá trình đẳng áp.',
    },
    {
      type: 'number',
      prompt:
        'Một lượng khí có thể tích $3$ lít ở $27$ °C được đun nóng đẳng áp đến $127$ °C. Thể tích khí lúc sau là bao nhiêu lít?',
      answer: 4,
      unit: 'lít',
      hints: ['Đổi nhiệt độ sang kelvin trước.', '$V_2 = V_1\\dfrac{T_2}{T_1}$.'],
      solution: '$T_1 = 300$ K, $T_2 = 400$ K; $V_2 = 3 \\cdot \\dfrac{400}{300} = 4$ lít.',
    },
    {
      type: 'number',
      prompt:
        'Đun nóng đẳng áp một lượng khí từ $27$ °C thì thể tích của nó tăng thêm $10\\%$. Nhiệt độ lúc sau của khí là bao nhiêu độ C?',
      answer: 57,
      unit: '°C',
      hints: ['$V_2 = 1{,}1V_1$.', '$T_2 = T_1\\dfrac{V_2}{V_1}$, rồi đổi về độ C.'],
      solution: '$T_2 = 300 \\cdot 1{,}1 = 330$ K, nên $t_2 = 330 - 273 = 57$ °C.',
    },
    {
      type: 'choice',
      prompt: 'Trong hệ toạ độ $(V, T)$, đường đẳng áp của một lượng khí lí tưởng là',
      options: [
        'đường thẳng mà nếu kéo dài thì đi qua gốc toạ độ',
        'đường hypebol',
        'đường thẳng song song với trục $T$',
        'đường thẳng cắt trục $V$ tại $V = V_0 > 0$',
      ],
      answer: 0,
      hints: ['$V = \\text{hằng số} \\cdot T$: đồ thị của hàm $y = ax$.'],
      solution:
        '$V$ tỉ lệ thuận với $T$ nên đường đẳng áp là đường thẳng kéo dài qua gốc toạ độ. Đường cắt trục $V$ tại $V_0$ là đồ thị $V$ theo $t$ (°C).',
    },
    {
      type: 'choice',
      prompt:
        'Trên cùng hệ toạ độ $(V, T)$ có hai đường đẳng áp của cùng một lượng khí, ứng với áp suất $p_1$ và $p_2$. Đường $p_1$ dốc hơn đường $p_2$. Kết luận nào đúng?',
      options: ['$p_1 < p_2$', '$p_1 > p_2$', '$p_1 = p_2$', 'Không so sánh được'],
      answer: 0,
      hints: [
        'Kẻ một đường thẳng đứng (cùng $T$): trên đường nào thể tích lớn hơn?',
        'Cùng nhiệt độ, theo định luật Boyle, thể tích lớn hơn thì áp suất thế nào?',
      ],
      solution:
        'Ở cùng nhiệt độ, đường dốc hơn cho thể tích lớn hơn. Cùng nhiệt độ thì $pV$ không đổi, nên thể tích lớn hơn ứng với áp suất nhỏ hơn: $p_1 < p_2$.',
    },
    {
      type: 'number',
      prompt:
        'Đun nóng đẳng áp một lượng khí, nhiệt độ tăng thêm $3$ K thì thể tích tăng thêm $1\\%$ so với thể tích ban đầu. Nhiệt độ ban đầu của khí là bao nhiêu kelvin?',
      answer: 300,
      unit: 'K',
      hints: ['$\\dfrac{V_2}{V_1} = \\dfrac{T + 3}{T} = 1{,}01$.'],
      solution:
        '$\\dfrac{T + 3}{T} = 1{,}01 \\Rightarrow 3 = 0{,}01T \\Rightarrow T = 300$ K (tức $27$ °C).',
    },
    {
      type: 'number',
      prompt:
        'Một quả bóng bay chứa $2{,}0$ lít khí ở $27$ °C. Đưa bóng ra ngoài nắng, khí trong bóng nóng lên đến $47$ °C. Coi áp suất khí trong bóng không đổi. Thể tích của bóng lúc đó là bao nhiêu lít (làm tròn đến hàng phần trăm)?',
      answer: 2.13,
      tolerance: 0.01,
      unit: 'lít',
      hints: ['$T_1 = 300$ K, $T_2 = 320$ K.'],
      solution: '$V_2 = 2{,}0 \\cdot \\dfrac{320}{300} \\approx 2{,}13$ lít.',
    },
    {
      type: 'choice',
      prompt:
        'Kéo dài đường biểu diễn thể tích theo nhiệt độ Celsius của một lượng khí ở áp suất không đổi, nó cắt trục nhiệt độ tại',
      options: ['$-273$ °C', '$0$ °C', '$273$ °C', '$-100$ °C'],
      answer: 0,
      hints: ['$V = V_0\\left(1 + \\dfrac{t}{273}\\right)$; cho $V = 0$.'],
      solution:
        'Cho $V = 0$ ta được $t = -273$ °C, độ không tuyệt đối, là $0$ K của thang Kelvin. Kết quả không phụ thuộc áp suất.',
    },
  ],
  takeaways: [
    'Quá trình đẳng áp: áp suất không đổi.',
    'Định luật Charles: $\\dfrac{V}{T} = $ hằng số, hay $\\dfrac{V_1}{T_1} = \\dfrac{V_2}{T_2}$, với $T$ tính bằng kelvin.',
    'Đường đẳng áp trong hệ $(V, T)$ là đường thẳng kéo dài qua gốc toạ độ; đường ở dưới ứng với áp suất lớn hơn.',
    'Độ không tuyệt đối: $0$ K $= -273$ °C, nhiệt độ mà tại đó (theo định luật Charles) thể tích khí lí tưởng bằng $0$.',
  ],
};
