/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhiệt độ cho biết trạng thái cân bằng nhiệt của các vật và chiều truyền nhiệt: năng lượng nhiệt tự truyền từ vật có nhiệt độ cao sang vật có nhiệt độ thấp. Thang Celsius lấy 0 °C và 100 °C là nhiệt độ nóng chảy của nước đá và nhiệt độ sôi của nước ở áp suất tiêu chuẩn; thang Kelvin bắt đầu từ độ không tuyệt đối, T (K) = t (°C) + 273. Nhiệt kế hoạt động dựa trên các tính chất vật lí thay đổi theo nhiệt độ.',
  intro:
    'Trong các bản tin khoa học, nhiệt độ Mặt Trời hay của khí ni-tơ lỏng thường được ghi bằng kelvin, còn dự báo thời tiết dùng độ C. Hai thang này liên hệ với nhau thế nào, và nhiệt kế đo nhiệt độ bằng cách nào?',
  objectives: [
    'Nêu được nhiệt độ là đại lượng cho biết trạng thái cân bằng nhiệt và chiều truyền năng lượng nhiệt giữa các vật.',
    'Nêu được các điểm mốc của thang Celsius và thang Kelvin; chuyển đổi được $T\\,(\\text{K}) = t\\,(^\\circ\\text{C}) + 273$.',
    'Nêu được nguyên tắc hoạt động và kể được một số loại nhiệt kế thường dùng.',
  ],
  sections: [
    {
      heading: 'Nhiệt độ và cân bằng nhiệt',
      blocks: [
        {
          type: 'p',
          text: 'Khi hai vật tiếp xúc nhau (tiếp xúc nhiệt), năng lượng nhiệt luôn tự truyền từ vật có nhiệt độ cao hơn sang vật có nhiệt độ thấp hơn. Vật nóng nguội đi, vật lạnh ấm lên, cho đến khi hai vật có cùng nhiệt độ thì quá trình truyền nhiệt dừng lại.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Cân bằng nhiệt',
          text: 'Khi hai vật tiếp xúc nhiệt có cùng nhiệt độ, không còn sự truyền năng lượng nhiệt giữa chúng, ta nói hai vật ở trạng thái cân bằng nhiệt.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Nhiệt độ',
          text: 'Nhiệt độ là đại lượng cho biết trạng thái cân bằng nhiệt của các vật và chiều truyền năng lượng nhiệt giữa chúng: các vật ở trạng thái cân bằng nhiệt thì có cùng nhiệt độ; năng lượng nhiệt truyền từ vật có nhiệt độ cao sang vật có nhiệt độ thấp. Theo mô hình động học phân tử, nhiệt độ càng cao thì các phân tử chuyển động càng nhanh.',
        },
        { type: 'widget', name: 'can-bang' },
        {
          type: 'p',
          text: 'Nhiệt kế đo được nhiệt độ của một vật chính nhờ cân bằng nhiệt: khi đặt nhiệt kế tiếp xúc với vật đủ lâu, nhiệt kế và vật có cùng nhiệt độ, nên số chỉ của nhiệt kế là nhiệt độ của vật.',
        },
      ],
    },
    {
      heading: 'Thang nhiệt độ Celsius và Kelvin',
      blocks: [
        {
          type: 'p',
          text: 'Thang Celsius lấy hai điểm mốc ở áp suất tiêu chuẩn: nhiệt độ của nước đá đang tan là $0$ °C và nhiệt độ của nước đang sôi là $100$ °C; khoảng giữa chia thành $100$ phần bằng nhau, mỗi phần là $1$ °C. Nhiệt độ thấp hơn $0$ °C mang dấu âm.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Thang Kelvin (thang nhiệt độ tuyệt đối)',
          text: 'Thang Kelvin lấy mốc $0$ K là độ không tuyệt đối: nhiệt độ thấp nhất có thể, khi chuyển động nhiệt của các phân tử là nhỏ nhất. Mốc thứ hai là nhiệt độ điểm ba của nước, $273{,}16$ K (khoảng $0{,}01$ °C), khi nước đá, nước và hơi nước cùng tồn tại cân bằng. Kelvin (K) là đơn vị nhiệt độ trong hệ SI; mọi nhiệt độ trên thang Kelvin đều dương.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Chuyển đổi giữa hai thang',
          text: 'Độ chia $1$ K bằng độ chia $1$ °C. Độ không tuyệt đối ứng với $-273{,}15$ °C; trong tính toán thường lấy gần đúng: $$T\\,(\\text{K}) = t\\,(^\\circ\\text{C}) + 273.$$',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Hiệu nhiệt độ',
          text: 'Vì một độ chia của hai thang bằng nhau, độ tăng (giảm) nhiệt độ có cùng số đo trên hai thang: $\\Delta T\\,(\\text{K}) = \\Delta t\\,(^\\circ\\text{C})$. Ví dụ nước nóng thêm $20$ °C cũng là nóng thêm $20$ K.',
        },
        {
          type: 'p',
          text: 'Một số nước dùng thang Fahrenheit: nước đá tan ở $32$ °F, nước sôi ở $212$ °F, và $t\\,(^\\circ\\text{F}) = 1{,}8\\,t\\,(^\\circ\\text{C}) + 32$.',
        },
      ],
    },
    {
      heading: 'Nhiệt kế',
      blocks: [
        {
          type: 'p',
          text: 'Nhiệt kế hoạt động dựa trên các tính chất vật lí thay đổi theo nhiệt độ: sự nở vì nhiệt của chất lỏng, chất khí, kim loại; điện trở của vật dẫn; suất điện động của cặp nhiệt điện; năng lượng bức xạ hồng ngoại mà vật phát ra.',
        },
        {
          type: 'table',
          head: ['Loại nhiệt kế', 'Nguyên tắc', 'Ví dụ sử dụng'],
          rows: [
            [
              'Nhiệt kế chất lỏng (rượu, dầu, thuỷ ngân)',
              'Sự nở vì nhiệt của chất lỏng trong ống thuỷ tinh',
              'Đo nhiệt độ không khí, nhiệt độ cơ thể',
            ],
            [
              'Nhiệt kế kim loại',
              'Sự nở vì nhiệt của thanh hoặc băng kép kim loại',
              'Đo nhiệt độ lò nướng, bàn là',
            ],
            [
              'Nhiệt kế khí',
              'Sự nở vì nhiệt của một lượng khí',
              'Đo chính xác trong phòng thí nghiệm',
            ],
            [
              'Nhiệt kế điện tử',
              'Điện trở hoặc cặp nhiệt điện thay đổi theo nhiệt độ',
              'Nhiệt kế y tế điện tử, đo nhiệt độ lò',
            ],
            [
              'Nhiệt kế hồng ngoại',
              'Năng lượng bức xạ hồng ngoại vật phát ra',
              'Đo thân nhiệt từ xa, đo vật rất nóng',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chọn nhiệt kế phù hợp',
          text: 'Mỗi nhiệt kế có một giới hạn đo (nhiệt độ lớn nhất, nhỏ nhất đo được) và độ chia nhỏ nhất. Ví dụ nhiệt kế y tế chỉ đo từ khoảng $35$ °C đến $42$ °C với độ chia $0{,}1$ °C; muốn đo nhiệt độ nước sôi phải dùng nhiệt kế có giới hạn đo trên $100$ °C.',
        },
      ],
    },
  ],
  explore: {
    title: 'Nhiệt kế hai thang',
    instruction:
      'Kéo mức chất lỏng (hoặc dùng phím ↑ ↓) và đọc nhiệt độ trên thang Celsius bên trái, thang Kelvin bên phải. Bấm “Thử thách” để đặt nhiệt kế theo một nhiệt độ cho bằng kelvin.',
  },
  examples: [
    {
      problem:
        'Đổi các nhiệt độ sau: a) $27$ °C và $-73$ °C sang thang Kelvin; b) $77$ K (nhiệt độ sôi của ni-tơ lỏng) sang thang Celsius.',
      steps: [
        'a) $T = t + 273$: $27 + 273 = 300$ K; $-73 + 273 = 200$ K.',
        'b) $t = T - 273 = 77 - 273 = -196$ °C.',
      ],
      answer: 'a) $300$ K và $200$ K. b) $-196$ °C.',
    },
    {
      problem:
        'Một cốc nước được đun nóng từ $25$ °C đến $85$ °C. Tính nhiệt độ đầu, nhiệt độ cuối và độ tăng nhiệt độ của nước theo thang Kelvin.',
      steps: [
        'Nhiệt độ đầu: $T_1 = 25 + 273 = 298$ K.',
        'Nhiệt độ cuối: $T_2 = 85 + 273 = 358$ K.',
        'Độ tăng: $\\Delta T = 358 - 298 = 60$ K, đúng bằng $\\Delta t = 85 - 25 = 60$ °C.',
      ],
      answer: '$298$ K, $358$ K; nhiệt độ tăng $60$ K (bằng $60$ °C).',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hai vật tiếp xúc nhiệt. Năng lượng nhiệt tự truyền',
      options: [
        'từ vật có nhiệt độ cao hơn sang vật có nhiệt độ thấp hơn',
        'từ vật có nội năng lớn hơn sang vật có nội năng nhỏ hơn',
        'từ vật có khối lượng lớn hơn sang vật có khối lượng nhỏ hơn',
        'theo cả hai chiều như nhau, nên nhiệt độ hai vật không đổi',
      ],
      answer: 0,
      hints: ['Chiều truyền nhiệt do đại lượng nào quyết định?'],
      solution:
        'Nhiệt độ cho biết chiều truyền năng lượng nhiệt: từ vật nhiệt độ cao sang vật nhiệt độ thấp, kể cả khi vật lạnh có nội năng lớn hơn (ví dụ một hồ nước lớn).',
    },
    {
      type: 'number',
      prompt: 'Đổi $270$ °C sang thang Kelvin (lấy $T = t + 273$).',
      answer: 543,
      unit: 'K',
      hints: ['Cộng thêm $273$.'],
      solution: '$T = 270 + 273 = 543$ K.',
    },
    {
      type: 'number',
      prompt: 'Đổi $-270$ °C sang thang Kelvin (lấy $T = t + 273$).',
      answer: 3,
      unit: 'K',
      hints: ['$T = t + 273$ với $t$ âm.'],
      solution: '$T = -270 + 273 = 3$ K: rất gần độ không tuyệt đối.',
    },
    {
      type: 'number',
      prompt: 'Đổi $500$ K sang thang Celsius (lấy $t = T - 273$).',
      answer: 227,
      unit: '°C',
      hints: ['Trừ đi $273$.'],
      solution: '$t = 500 - 273 = 227$ °C.',
    },
    {
      type: 'number',
      prompt: 'Độ không tuyệt đối ($0$ K) ứng với bao nhiêu độ C (lấy $t = T - 273$)?',
      answer: -273,
      unit: '°C',
      hints: ['$t = T - 273$ với $T = 0$.'],
      solution: '$t = 0 - 273 = -273$ °C (chính xác là $-273{,}15$ °C).',
    },
    {
      type: 'number',
      prompt:
        'Nhiệt độ một phòng tăng từ $18$ °C lên $26$ °C. Độ tăng nhiệt độ theo thang Kelvin là bao nhiêu?',
      answer: 8,
      unit: 'K',
      hints: ['Độ chia $1$ K bằng độ chia $1$ °C.'],
      solution: '$\\Delta T = \\Delta t = 26 - 18 = 8$ K. (Cách khác: $299 - 291 = 8$ K.)',
    },
    {
      type: 'multi',
      prompt: 'Chọn các phát biểu đúng về thang Kelvin.',
      options: [
        'Mốc $0$ K là độ không tuyệt đối',
        'Mọi nhiệt độ trên thang Kelvin đều dương',
        'Kelvin là đơn vị nhiệt độ trong hệ SI',
        'Nước đá tan ở $0$ K',
        'Một độ chia $1$ K lớn gấp $273$ lần $1$ °C',
      ],
      answers: [0, 1, 2],
      hints: [
        'Nước đá tan ở $0$ °C, đổi ra kelvin là bao nhiêu?',
        'So sánh độ lớn một độ chia của hai thang.',
      ],
      solution:
        'Thang Kelvin bắt đầu từ độ không tuyệt đối nên không có nhiệt độ âm; K là đơn vị SI. Nước đá tan ở khoảng $273$ K, và $1$ K bằng $1$ °C về độ chia.',
    },
    {
      type: 'match',
      prompt: 'Ghép mỗi loại nhiệt kế với nguyên tắc hoạt động của nó.',
      left: [
        'Nhiệt kế rượu',
        'Nhiệt kế hồng ngoại',
        'Nhiệt kế điện tử dùng cặp nhiệt điện',
        'Nhiệt kế băng kép',
      ],
      right: [
        'Sự nở vì nhiệt của chất lỏng',
        'Năng lượng bức xạ hồng ngoại do vật phát ra',
        'Suất điện động thay đổi theo nhiệt độ',
        'Sự nở vì nhiệt khác nhau của hai kim loại',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Mỗi nhiệt kế dùng một tính chất vật lí thay đổi theo nhiệt độ.'],
      solution:
        'Rượu nở vì nhiệt; nhiệt kế hồng ngoại đo bức xạ; cặp nhiệt điện sinh suất điện động phụ thuộc nhiệt độ; băng kép cong đi vì hai kim loại nở khác nhau.',
    },
    {
      type: 'choice',
      prompt: 'Muốn đo nhiệt độ của nước đang sôi trong nồi ($100$ °C), nên dùng nhiệt kế nào?',
      options: [
        'Nhiệt kế có giới hạn đo $-10$ °C đến $110$ °C',
        'Nhiệt kế y tế có giới hạn đo $35$ °C đến $42$ °C',
        'Nhiệt kế có giới hạn đo $-30$ °C đến $50$ °C',
        'Nhiệt kế nào cũng được vì nhiệt độ sôi luôn là $100$ °C',
      ],
      answer: 0,
      hints: ['Giới hạn đo của nhiệt kế phải lớn hơn nhiệt độ cần đo.'],
      solution:
        'Chỉ nhiệt kế có giới hạn đo trên $100$ °C mới đo được; nhiệt kế y tế hay nhiệt kế tới $50$ °C sẽ hỏng hoặc không đo được.',
    },
  ],
  takeaways: [
    'Năng lượng nhiệt tự truyền từ vật nhiệt độ cao sang vật nhiệt độ thấp; khi hai vật cùng nhiệt độ thì cân bằng nhiệt.',
    'Thang Celsius: $0$ °C (nước đá tan), $100$ °C (nước sôi) ở áp suất tiêu chuẩn. Thang Kelvin: $0$ K là độ không tuyệt đối.',
    '$T\\,(\\text{K}) = t\\,(^\\circ\\text{C}) + 273$; độ chia $1$ K bằng $1$ °C nên $\\Delta T = \\Delta t$.',
    'Nhiệt kế dựa trên tính chất vật lí thay đổi theo nhiệt độ: nở vì nhiệt, điện trở, cặp nhiệt điện, bức xạ hồng ngoại.',
  ],
};
