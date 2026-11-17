/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhiệt lượng cần truyền cho một vật để làm tăng nhiệt độ của nó là Q = mcΔT, trong đó c là nhiệt dung riêng: nhiệt lượng cần truyền cho 1 kg chất để nhiệt độ tăng thêm 1 K (1 °C), đơn vị J/kg.K. Nhiệt dung riêng đo được bằng nhiệt lượng kế có dây điện trở, oát kế và nhiệt kế: c = P(τN − τM)/[m(tN − tM)].',
  intro:
    'Buổi trưa hè, cát trên bãi biển nóng bỏng chân nhưng nước biển vẫn mát, dù cả hai cùng nhận ánh nắng như nhau. Vì sao nước nóng lên chậm hơn cát nhiều như vậy?',
  objectives: [
    'Nêu được định nghĩa nhiệt dung riêng và đơn vị J/kg.K.',
    'Vận dụng được công thức $Q = mc\\Delta T$ để tính nhiệt lượng, khối lượng, độ tăng nhiệt độ hoặc nhiệt dung riêng.',
    'Mô tả được thí nghiệm đo nhiệt dung riêng của nước bằng nhiệt lượng kế, oát kế và nhiệt kế.',
  ],
  sections: [
    {
      heading: 'Nhiệt dung riêng',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm cho thấy nhiệt lượng $Q$ cần truyền cho một vật để nhiệt độ của nó tăng thêm $\\Delta T$ tỉ lệ thuận với khối lượng $m$ của vật, tỉ lệ thuận với $\\Delta T$ và phụ thuộc vào chất làm vật.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhiệt lượng làm thay đổi nhiệt độ',
          text: '$$Q = mc\\Delta T$$ trong đó $Q$ là nhiệt lượng (J), $m$ là khối lượng (kg), $\\Delta T = T_2 - T_1$ là độ tăng nhiệt độ (K hoặc °C), $c$ là nhiệt dung riêng của chất (J/kg.K). Khi vật toả nhiệt và nguội đi, nhiệt lượng toả ra cũng tính bằng $Q = mc\\,(T_1 - T_2)$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Nhiệt dung riêng',
          text: 'Nhiệt dung riêng của một chất là nhiệt lượng cần truyền cho $1$ kg chất đó để làm cho nhiệt độ của nó tăng thêm $1$ K (hoặc $1$ °C). Đơn vị là jun trên kilôgam kelvin, J/kg.K.',
        },
        {
          type: 'table',
          head: ['Chất', '$c$ (J/kg.K)', 'Chất', '$c$ (J/kg.K)'],
          rows: [
            ['Nước', '$4\\,200$', 'Thuỷ tinh', '$840$'],
            ['Nước đá', '$2\\,100$', 'Đất', '$800$'],
            ['Dầu', '$1\\,670$', 'Sắt', '$440$'],
            ['Không khí', '$1\\,000$', 'Đồng', '$390$'],
            ['Nhôm', '$880$', 'Chì', '$130$'],
          ],
          caption:
            'Nhiệt dung riêng của một số chất (giá trị gần đúng, ở áp suất tiêu chuẩn). Trong nhiều bài tập, nhiệt dung riêng của nước được lấy là $4\\,180$ J/kg.K hoặc $4\\,200$ J/kg.K.',
        },
        {
          type: 'p',
          text: 'Nước có nhiệt dung riêng rất lớn: cùng nhận một nhiệt lượng, nước nóng lên chậm hơn đất, cát nhiều lần, và cũng nguội đi chậm hơn. Vì thế nước được dùng để làm mát động cơ, chườm ấm; khí hậu vùng ven biển ôn hoà hơn vùng sâu trong lục địa; ban ngày đất liền nóng nhanh hơn biển nên có gió từ biển thổi vào.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhiệt dung riêng phụ thuộc thể của chất',
          text: 'Cùng là nước nhưng nước lỏng có $c \\approx 4\\,200$ J/kg.K, còn nước đá chỉ có $c \\approx 2\\,100$ J/kg.K.',
        },
      ],
    },
    {
      heading: 'Thí nghiệm đo nhiệt dung riêng của nước',
      blocks: [
        {
          type: 'list',
          items: [
            'Dụng cụ: biến thế nguồn; bộ đo công suất nguồn điện (oát kế) có đo thời gian; nhiệt kế điện tử (hoặc cảm biến nhiệt độ); nhiệt lượng kế có vỏ xốp cách nhiệt, kèm dây điện trở và que khuấy; cân điện tử; dây nối.',
            'Cân khối lượng $m$ của nước đổ vào nhiệt lượng kế (sao cho nước ngập dây điện trở), cắm nhiệt kế vào nước.',
            'Bật nguồn cho dòng điện chạy qua dây điện trở, khuấy liên tục. Cứ sau những khoảng thời gian bằng nhau, ghi công suất $P$ và nhiệt độ $t$ của nước.',
            'Vẽ đồ thị nhiệt độ $t$ theo thời gian $\\tau$. Chọn hai điểm $M$, $N$ trên đoạn thẳng của đồ thị.',
          ],
          ordered: true,
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Xử lí số liệu',
          text: 'Bỏ qua nhiệt lượng hao phí, nhiệt lượng dây điện trở toả ra từ $M$ đến $N$ là $Q = P(\\tau_N - \\tau_M)$, chính bằng nhiệt lượng nước nhận được: $$c = \\dfrac{Q}{m\\Delta t} = \\dfrac{P(\\tau_N - \\tau_M)}{m(t_N - t_M)},$$ với $P$ là công suất trung bình đo được.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Sai số',
          text: 'Một phần nhiệt lượng làm nóng bình, nhiệt kế và toả ra môi trường, nên nhiệt độ nước tăng chậm hơn lí thuyết và giá trị $c$ đo được thường lớn hơn giá trị thật một chút. Khuấy đều và dùng bình cách nhiệt tốt giúp giảm sai số.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đun ba mẫu cùng công suất',
    instruction:
      'Đun cùng khối lượng nước, dầu và nhôm bằng cùng công suất, so sánh độ dốc ba đồ thị và tính $c = \\dfrac{P\\tau}{m\\Delta t}$ từ bảng số liệu. Ở chế độ “Chất bí ẩn”, đo nhiệt dung riêng để tìm ra chất X.',
  },
  examples: [
    {
      problem:
        'Tính nhiệt lượng cần cung cấp để đun nóng $2$ kg nước từ $20$ °C đến $100$ °C. Cho nhiệt dung riêng của nước là $4\\,200$ J/kg.K.',
      steps: [
        'Độ tăng nhiệt độ: $\\Delta T = 100 - 20 = 80$ K.',
        '$Q = mc\\Delta T = 2 \\cdot 4\\,200 \\cdot 80 = 672\\,000$ J.',
      ],
      answer: '$Q = 672\\,000$ J $= 672$ kJ.',
    },
    {
      problem:
        'Trong thí nghiệm đo nhiệt dung riêng của nước, khối lượng nước là $0{,}15$ kg, công suất trung bình đo được $P = 20$ W. Trên đồ thị, điểm $M$ có $\\tau_M = 100$ s, $t_M = 25{,}0$ °C; điểm $N$ có $\\tau_N = 400$ s, $t_N = 34{,}6$ °C. Tính nhiệt dung riêng của nước.',
      steps: [
        'Nhiệt lượng nước nhận: $Q = P(\\tau_N - \\tau_M) = 20 \\cdot 300 = 6\\,000$ J.',
        'Độ tăng nhiệt độ: $t_N - t_M = 34{,}6 - 25{,}0 = 9{,}6$ °C.',
        '$c = \\dfrac{Q}{m\\Delta t} = \\dfrac{6\\,000}{0{,}15 \\cdot 9{,}6} = \\dfrac{6\\,000}{1{,}44} \\approx 4\\,167$ J/kg.K.',
      ],
      answer: '$c \\approx 4\\,167$ J/kg.K, gần với giá trị trong bảng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Nhiệt dung riêng của một chất là nhiệt lượng cần truyền cho',
      options: [
        '$1$ kg chất đó để nhiệt độ của nó tăng thêm $1$ K',
        '$1$ kg chất đó để nó nóng chảy hoàn toàn',
        'một vật làm bằng chất đó để nhiệt độ tăng thêm $1$ K',
        '$1$ g chất đó để nhiệt độ tăng thêm $100$ °C',
      ],
      answer: 0,
      hints: ['Định nghĩa gắn với một đơn vị khối lượng và một đơn vị nhiệt độ.'],
      solution:
        'Nhiệt dung riêng: nhiệt lượng cho $1$ kg chất tăng thêm $1$ K (hay $1$ °C), đơn vị J/kg.K.',
    },
    {
      type: 'number',
      prompt:
        'Tính nhiệt lượng cần để đun nóng một khối nhôm $0{,}5$ kg từ $20$ °C lên $120$ °C (theo kJ). Cho $c_{\\text{nhôm}} = 880$ J/kg.K.',
      answer: 44,
      unit: 'kJ',
      hints: ['$\\Delta T = 120 - 20$.', '$Q = mc\\Delta T$, rồi đổi J sang kJ.'],
      solution: '$Q = 0{,}5 \\cdot 880 \\cdot 100 = 44\\,000$ J $= 44$ kJ.',
    },
    {
      type: 'number',
      prompt:
        'Truyền nhiệt lượng $1\\,760$ J cho một miếng kim loại khối lượng $0{,}2$ kg thì nhiệt độ của nó tăng thêm $20$ °C. Tính nhiệt dung riêng của kim loại (theo J/kg.K).',
      answer: 440,
      unit: 'J/kg.K',
      hints: ['Từ $Q = mc\\Delta T$ suy ra $c = \\dfrac{Q}{m\\Delta T}$.'],
      solution:
        '$c = \\dfrac{1\\,760}{0{,}2 \\cdot 20} = 440$ J/kg.K: theo bảng, kim loại này có thể là sắt.',
    },
    {
      type: 'number',
      prompt:
        'Cung cấp nhiệt lượng $42\\,000$ J cho $0{,}5$ kg nước. Nhiệt độ của nước tăng thêm bao nhiêu độ C? Cho $c = 4\\,200$ J/kg.K.',
      answer: 20,
      unit: '°C',
      hints: ['$\\Delta T = \\dfrac{Q}{mc}$.'],
      solution:
        '$\\Delta T = \\dfrac{42\\,000}{0{,}5 \\cdot 4\\,200} = 20$ K, tức tăng thêm $20$ °C.',
    },
    {
      type: 'choice',
      prompt:
        'Bốn khối cùng khối lượng làm bằng nhôm, sắt, đồng và chì, ban đầu cùng nhiệt độ, nhận cùng một nhiệt lượng. Khối nào nóng lên nhiều nhất?',
      options: ['Khối chì', 'Khối nhôm', 'Khối sắt', 'Khối đồng'],
      answer: 0,
      hints: [
        '$\\Delta T = \\dfrac{Q}{mc}$: với cùng $Q$ và $m$, $\\Delta T$ lớn nhất khi $c$ thế nào?',
      ],
      solution:
        '$\\Delta T$ tỉ lệ nghịch với $c$. Chì có $c = 130$ J/kg.K nhỏ nhất nên nóng lên nhiều nhất; nhôm ($880$ J/kg.K) nóng lên ít nhất.',
    },
    {
      type: 'number',
      prompt:
        'Một ấm điện công suất $1\\,500$ W đun $1{,}5$ kg nước từ $25$ °C đến $100$ °C. Bỏ qua nhiệt lượng hao phí và nhiệt lượng làm nóng ấm, thời gian đun là bao nhiêu giây? Cho $c = 4\\,200$ J/kg.K.',
      answer: 315,
      unit: 's',
      hints: [
        'Tính $Q = mc\\Delta T$.',
        'Nhiệt lượng do ấm cung cấp trong thời gian $\\tau$ là $P\\tau$.',
      ],
      solution:
        '$Q = 1{,}5 \\cdot 4\\,200 \\cdot 75 = 472\\,500$ J; $\\tau = \\dfrac{Q}{P} = \\dfrac{472\\,500}{1\\,500} = 315$ s (khoảng $5$ phút $15$ giây).',
    },
    {
      type: 'number',
      prompt:
        'Một bình nóng lạnh chứa $20$ kg nước, dùng điện trở công suất $2\\,500$ W với hiệu suất $80\\%$. Cần bao nhiêu phút để đun nước từ $20$ °C lên $70$ °C? Cho $c = 4\\,200$ J/kg.K.',
      answer: 35,
      unit: 'phút',
      hints: [
        'Tính nhiệt lượng nước cần nhận: $Q = mc\\Delta T$.',
        'Chỉ $80\\%$ điện năng chuyển thành nhiệt cho nước: công suất có ích là $0{,}8 \\cdot 2\\,500$ W.',
      ],
      solution:
        '$Q = 20 \\cdot 4\\,200 \\cdot 50 = 4\\,200\\,000$ J; công suất có ích $2\\,000$ W; $\\tau = \\dfrac{4\\,200\\,000}{2\\,000} = 2\\,100$ s $= 35$ phút.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao nước thường được dùng làm chất làm mát trong động cơ ô tô, xe máy?',
      options: [
        'Vì nước có nhiệt dung riêng lớn nên hấp thụ được nhiều nhiệt lượng mà nhiệt độ tăng ít',
        'Vì nước có nhiệt dung riêng nhỏ nên nóng lên nhanh',
        'Vì nước dẫn điện tốt',
        'Vì nước có khối lượng riêng nhỏ hơn kim loại',
      ],
      answer: 0,
      hints: ['Chất làm mát cần nhận nhiều nhiệt từ động cơ nhưng bản thân không quá nóng.'],
      solution:
        'Nước có $c \\approx 4\\,200$ J/kg.K, lớn hơn hầu hết các chất thông thường, nên với cùng khối lượng nó nhận được nhiều nhiệt lượng mà nhiệt độ tăng ít.',
    },
    {
      type: 'multi',
      prompt:
        'Trong thí nghiệm đo nhiệt dung riêng của nước bằng nhiệt lượng kế có dây điện trở, cần đo những đại lượng nào?',
      options: [
        'Khối lượng nước',
        'Công suất dòng điện qua dây điện trở',
        'Thời gian đun',
        'Nhiệt độ của nước',
        'Áp suất khí quyển',
      ],
      answers: [0, 1, 2, 3],
      hints: ['Nhìn vào công thức $c = \\dfrac{P(\\tau_N - \\tau_M)}{m(t_N - t_M)}$.'],
      solution:
        'Công thức cần $P$, $\\tau$, $m$ và $t$, nên phải đo khối lượng nước, công suất, thời gian và nhiệt độ. Áp suất khí quyển không có trong công thức.',
    },
  ],
  takeaways: [
    'Nhiệt lượng làm vật nóng lên: $Q = mc\\Delta T$; $\\Delta T$ tính bằng K hay °C đều như nhau.',
    'Nhiệt dung riêng $c$: nhiệt lượng cho $1$ kg chất tăng thêm $1$ K, đơn vị J/kg.K; nước có $c \\approx 4\\,200$ J/kg.K, rất lớn.',
    'Đo $c$ của nước: $c = \\dfrac{P(\\tau_N - \\tau_M)}{m(t_N - t_M)}$, với $M$, $N$ là hai điểm trên đoạn thẳng của đồ thị nhiệt độ – thời gian.',
  ],
};
