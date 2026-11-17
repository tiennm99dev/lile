/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nội năng của vật là tổng động năng và thế năng của các phân tử cấu tạo nên vật, phụ thuộc nhiệt độ và thể tích. Có thể làm thay đổi nội năng bằng thực hiện công hoặc truyền nhiệt. Định luật I của nhiệt động lực học: ΔU = A + Q, với A > 0 khi vật nhận công, Q > 0 khi vật nhận nhiệt lượng.',
  intro:
    'Xoa hai bàn tay vào nhau, tay nóng lên; đặt tay lên cốc trà nóng, tay cũng nóng lên. Hai việc rất khác nhau nhưng cùng một kết quả. Cái gì của bàn tay đã thay đổi, và có định luật nào cho biết nó thay đổi bao nhiêu?',
  objectives: [
    'Nêu được khái niệm nội năng và sự phụ thuộc của nội năng vào nhiệt độ, thể tích.',
    'Nêu được hai cách làm thay đổi nội năng: thực hiện công và truyền nhiệt; khái niệm nhiệt lượng.',
    'Phát biểu và vận dụng được định luật I của nhiệt động lực học $\\Delta U = A + Q$ với đúng quy ước dấu.',
  ],
  sections: [
    {
      heading: 'Nội năng',
      blocks: [
        {
          type: 'p',
          text: 'Theo mô hình động học phân tử, các phân tử chuyển động hỗn loạn không ngừng nên có động năng; giữa chúng có lực liên kết nên chúng có thế năng tương tác.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Nội năng',
          text: 'Nội năng của một vật là tổng động năng và thế năng của các phân tử cấu tạo nên vật. Nội năng kí hiệu là $U$, đơn vị là jun (J).',
        },
        {
          type: 'list',
          items: [
            'Động năng của phân tử phụ thuộc tốc độ chuyển động của phân tử, tức là phụ thuộc nhiệt độ: nhiệt độ của vật tăng thì nội năng tăng.',
            'Thế năng tương tác phụ thuộc khoảng cách giữa các phân tử, tức là phụ thuộc thể tích của vật.',
            'Vậy nội năng của vật phụ thuộc vào nhiệt độ và thể tích của vật.',
          ],
        },
      ],
    },
    {
      heading: 'Hai cách làm thay đổi nội năng',
      blocks: [
        {
          type: 'table',
          head: ['Cách', 'Ví dụ', 'Năng lượng'],
          rows: [
            [
              'Thực hiện công',
              'Cọ xát miếng kim loại trên mặt bàn, nén nhanh khí trong bơm xe đạp',
              'Có sự chuyển hoá từ cơ năng sang nội năng (hoặc ngược lại)',
            ],
            [
              'Truyền nhiệt',
              'Thả miếng kim loại vào cốc nước nóng, đun nước trên bếp',
              'Nội năng được truyền trực tiếp từ vật này sang vật khác, không có chuyển hoá năng lượng',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Nhiệt lượng',
          text: 'Phần nội năng mà vật nhận được hay mất đi trong quá trình truyền nhiệt gọi là nhiệt lượng, kí hiệu $Q$, đơn vị jun (J). Khi chỉ có truyền nhiệt: $\\Delta U = Q$.',
        },
        {
          type: 'p',
          text: 'Truyền nhiệt xảy ra theo ba hình thức: dẫn nhiệt, đối lưu và bức xạ nhiệt. Nhiệt lượng luôn tự truyền từ vật nóng hơn sang vật lạnh hơn.',
        },
      ],
    },
    {
      heading: 'Định luật I của nhiệt động lực học',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định luật I của nhiệt động lực học',
          text: 'Độ biến thiên nội năng của vật bằng tổng công và nhiệt lượng mà vật nhận được: $$\\Delta U = A + Q.$$',
        },
        {
          type: 'table',
          head: ['Đại lượng', 'Dương ($> 0$)', 'Âm ($< 0$)'],
          rows: [
            ['$Q$', 'Vật nhận nhiệt lượng', 'Vật truyền nhiệt lượng cho vật khác'],
            ['$A$', 'Vật nhận công', 'Vật thực hiện công'],
            ['$\\Delta U$', 'Nội năng tăng', 'Nội năng giảm'],
          ],
          caption: 'Quy ước dấu của định luật I.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý dấu của công',
          text: 'Khí bị nén thì nhận công: $A > 0$. Khí giãn nở, đẩy pít-tông đi ra thì khí thực hiện công: $A < 0$. Ví dụ khí thực hiện công $70$ J được viết $A = -70$ J.',
        },
        {
          type: 'p',
          text: 'Định luật I là sự vận dụng định luật bảo toàn và chuyển hoá năng lượng cho các hiện tượng nhiệt. Nó giải thích hoạt động của động cơ nhiệt: khí trong xi lanh nhận nhiệt lượng từ nhiên liệu cháy ($Q > 0$) và giãn nở thực hiện công đẩy pít-tông ($A < 0$).',
        },
      ],
    },
  ],
  explore: {
    title: 'Xi lanh khí ảo',
    instruction:
      'Chỉnh công $A$ mà khí nhận (nén hay để khí giãn nở) và nhiệt lượng $Q$ (đun hay làm lạnh), quan sát độ biến thiên nội năng $\\Delta U$. Ở chế độ “Tình huống”, đọc đề và đặt $A$, $Q$ đúng dấu.',
  },
  examples: [
    {
      problem:
        'Người ta thực hiện công $100$ J để nén khí trong một xi lanh. Biết khí truyền ra môi trường xung quanh nhiệt lượng $20$ J. Tính độ biến thiên nội năng của khí.',
      steps: [
        'Khí bị nén nên nhận công: $A = +100$ J.',
        'Khí truyền nhiệt ra ngoài: $Q = -20$ J.',
        'Định luật I: $\\Delta U = A + Q = 100 + (-20) = 80$ J.',
      ],
      answer: '$\\Delta U = 80$ J: nội năng của khí tăng $80$ J.',
    },
    {
      problem:
        'Khí trong xi lanh nhận nhiệt lượng $250$ J, nội năng của khí tăng $90$ J. Khí nhận công hay thực hiện công, và bằng bao nhiêu?',
      steps: [
        'Khí nhận nhiệt: $Q = +250$ J; nội năng tăng: $\\Delta U = +90$ J.',
        'Từ $\\Delta U = A + Q$ suy ra $A = \\Delta U - Q = 90 - 250 = -160$ J.',
        '$A < 0$ nên khí thực hiện công.',
      ],
      answer: 'Khí thực hiện công $160$ J (giãn nở đẩy pít-tông).',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Nội năng của một vật là',
      options: [
        'tổng động năng và thế năng của các phân tử cấu tạo nên vật',
        'tổng động năng và thế năng của vật',
        'nhiệt lượng vật nhận được trong quá trình truyền nhiệt',
        'động năng của vật khi chuyển động',
      ],
      answer: 0,
      hints: ['Nội năng gắn với các phân tử bên trong vật, không phải với chuyển động của cả vật.'],
      solution:
        'Nội năng là tổng động năng và thế năng của các phân tử cấu tạo nên vật; cơ năng của cả vật không thuộc nội năng.',
    },
    {
      type: 'multi',
      prompt: 'Nội năng của một lượng khí phụ thuộc vào những đại lượng nào?',
      options: [
        'Nhiệt độ',
        'Thể tích',
        'Vận tốc của cả bình chứa khí',
        'Độ cao của bình so với mặt đất',
      ],
      answers: [0, 1],
      hints: ['Động năng phân tử ↔ nhiệt độ; thế năng tương tác ↔ khoảng cách phân tử.'],
      solution:
        'Động năng phân tử phụ thuộc nhiệt độ, thế năng tương tác phụ thuộc thể tích. Vận tốc và độ cao của cả bình là cơ năng, không làm thay đổi nội năng.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các trường hợp nội năng của vật thay đổi do thực hiện công.',
      options: [
        'Cọ xát đồng xu lên mặt bàn, đồng xu nóng lên',
        'Thả thìa vào cốc nước sôi, thìa nóng lên',
        'Bơm xe đạp, không khí trong thân bơm nóng lên',
        'Phơi tấm tôn ngoài nắng, tấm tôn nóng lên',
        'Dùng búa đập nhiều lần lên miếng thép, miếng thép nóng lên',
      ],
      answers: [0, 2, 4],
      hints: [
        'Có lực tác dụng làm vật dịch chuyển (cơ năng chuyển hoá) hay chỉ tiếp xúc với vật nóng hơn?',
      ],
      solution:
        'Cọ xát, nén khí trong bơm và đập búa là thực hiện công (cơ năng chuyển hoá thành nội năng); thìa trong nước sôi (dẫn nhiệt) và tôn phơi nắng (bức xạ nhiệt) là truyền nhiệt.',
    },
    {
      type: 'number',
      prompt:
        'Khí trong xi lanh nhận nhiệt lượng $100$ J và giãn nở đẩy pít-tông, thực hiện công $70$ J. Tính độ biến thiên nội năng của khí (theo J).',
      answer: 30,
      unit: 'J',
      hints: ['Khí thực hiện công nên $A$ mang dấu âm.', '$\\Delta U = A + Q$.'],
      solution: '$Q = +100$ J, $A = -70$ J nên $\\Delta U = -70 + 100 = 30$ J.',
    },
    {
      type: 'number',
      prompt:
        'Người ta nén khí bằng công $200$ J, khí truyền ra ngoài nhiệt lượng $50$ J. Nội năng của khí tăng bao nhiêu jun?',
      answer: 150,
      unit: 'J',
      hints: ['Khí nhận công: $A > 0$. Khí truyền nhiệt ra ngoài: $Q < 0$.'],
      solution: '$\\Delta U = A + Q = 200 + (-50) = 150$ J.',
    },
    {
      type: 'number',
      prompt:
        'Một lượng khí giãn nở thực hiện công $120$ J mà không trao đổi nhiệt với môi trường. Độ biến thiên nội năng của khí là bao nhiêu jun?',
      answer: -120,
      unit: 'J',
      hints: ['Không trao đổi nhiệt: $Q = 0$.', 'Khí thực hiện công: $A$ âm.'],
      solution: '$\\Delta U = A + Q = -120 + 0 = -120$ J: nội năng giảm $120$ J, khí lạnh đi.',
    },
    {
      type: 'choice',
      prompt:
        "Trong quá trình khí nhận nhiệt lượng $Q$ và thực hiện công $A'$ (với $A' > 0$ là độ lớn công), hệ thức nào đúng?",
      options: [
        "$\\Delta U = Q - A'$",
        "$\\Delta U = Q + A'$",
        "$\\Delta U = -Q - A'$",
        "$\\Delta U = A' - Q$",
      ],
      answer: 0,
      hints: ["Khí thực hiện công thì theo quy ước $A = -A'$."],
      solution: "Khí nhận nhiệt: $Q > 0$; khí thực hiện công: $A = -A'$. Vậy $\\Delta U = Q - A'$.",
    },
    {
      type: 'number',
      prompt:
        'Khí trong xi lanh nhận nhiệt lượng $300$ J thì nội năng tăng $120$ J. Tính độ lớn công mà khí thực hiện (theo J).',
      answer: 180,
      unit: 'J',
      hints: ['$A = \\Delta U - Q$.', 'Kết quả âm nghĩa là khí thực hiện công; hỏi độ lớn.'],
      solution: '$A = \\Delta U - Q = 120 - 300 = -180$ J, nên khí thực hiện công $180$ J.',
    },
    {
      type: 'choice',
      prompt:
        'Khi bơm xe đạp, không khí trong thân bơm bị nén nhanh nên gần như không kịp trao đổi nhiệt. Nhiệt độ của khí trong bơm',
      options: [
        'tăng, vì khí nhận công nên nội năng tăng',
        'giảm, vì khí thực hiện công',
        'không đổi, vì $Q = 0$',
        'giảm, vì khí truyền nhiệt ra ngoài',
      ],
      answer: 0,
      hints: ['Với $Q \\approx 0$: $\\Delta U = A$. Dấu của $A$ khi nén khí là gì?'],
      solution:
        'Nén khí: $A > 0$, $Q \\approx 0$ nên $\\Delta U = A > 0$: nội năng tăng, nhiệt độ khí tăng (thân bơm nóng lên).',
    },
  ],
  takeaways: [
    'Nội năng $U$ là tổng động năng và thế năng của các phân tử cấu tạo nên vật; phụ thuộc nhiệt độ và thể tích.',
    'Hai cách làm thay đổi nội năng: thực hiện công (có chuyển hoá năng lượng) và truyền nhiệt (nhiệt lượng $Q$).',
    'Định luật I: $\\Delta U = A + Q$. $Q > 0$: vật nhận nhiệt; $A > 0$: vật nhận công; khi vật toả nhiệt hay thực hiện công thì đại lượng tương ứng mang dấu âm.',
  ],
};
