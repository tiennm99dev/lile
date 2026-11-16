/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tụ điện gồm hai vật dẫn đặt gần nhau, ngăn cách bởi một lớp điện môi; nó tích điện khi nối với nguồn và phóng điện khi nối hai bản qua một vật dẫn. Điện dung C = Q/U đặc trưng cho khả năng tích điện của tụ, đơn vị fara (F). Ghép nối tiếp: các tụ cùng điện tích, 1/C = 1/C1 + 1/C2 + ...; ghép song song: các tụ cùng hiệu điện thế, C = C1 + C2 + .... Tụ tích điện Q có năng lượng W = QU/2 = CU²/2 = Q²/(2C).',
  intro:
    'Đèn flash của máy ảnh loé sáng chỉ trong khoảng một phần nghìn giây nhưng rất mạnh, dù nguồn chỉ là vài viên pin nhỏ. Bí quyết nằm ở một linh kiện được nạp điện từ từ rồi giải phóng năng lượng gần như tức thì: tụ điện.',
  objectives: [
    'Mô tả được cấu tạo của tụ điện, sự tích điện và phóng điện của tụ.',
    'Định nghĩa được điện dung $C = \\dfrac{Q}{U}$ và đơn vị fara; đọc được các thông số ghi trên vỏ tụ.',
    'Vận dụng được công thức điện dung của bộ tụ ghép nối tiếp và ghép song song.',
    'Tính được năng lượng của tụ điện $W = \\dfrac{QU}{2} = \\dfrac{CU^2}{2} = \\dfrac{Q^2}{2C}$.',
  ],
  sections: [
    {
      heading: 'Tụ điện',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tụ điện',
          text: 'Tụ điện là một hệ gồm hai vật dẫn đặt gần nhau và ngăn cách nhau bằng một lớp chất cách điện (điện môi). Mỗi vật dẫn gọi là một bản của tụ điện.',
        },
        {
          type: 'p',
          text: 'Tụ điện phẳng gồm hai bản kim loại phẳng đặt song song, đối diện nhau. Trong mạch điện, tụ điện được kí hiệu bằng hai vạch thẳng song song, dài bằng nhau. Điện môi giữa hai bản có thể là không khí, giấy tẩm dầu, mica, gốm…',
        },
        {
          type: 'list',
          items: [
            'Tích điện: nối hai bản với hai cực của nguồn điện, bản nối với cực dương tích điện dương, bản nối với cực âm tích điện âm, độ lớn bằng nhau. Độ lớn điện tích trên mỗi bản gọi là điện tích $Q$ của tụ điện.',
            'Phóng điện: sau khi ngắt nguồn, nối hai bản bằng một vật dẫn thì các điện tích dịch chuyển qua vật dẫn, tụ mất dần điện tích.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Điện môi bị đánh thủng',
          text: 'Điện môi hầu như không dẫn điện. Nhưng nếu hiệu điện thế giữa hai bản quá lớn, điện trường trong điện môi vượt quá một giới hạn thì điện môi bị đánh thủng, trở thành vật dẫn và tụ bị hỏng.',
        },
      ],
    },
    {
      heading: 'Điện dung',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm cho thấy điện tích $Q$ mà một tụ điện tích được tỉ lệ thuận với hiệu điện thế $U$ đặt vào hai bản. Tỉ số $\\dfrac{Q}{U}$ không đổi với một tụ điện cho trước nhưng khác nhau giữa các tụ điện.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Điện dung',
          text: 'Điện dung của tụ điện là đại lượng đặc trưng cho khả năng tích điện của tụ điện ở một hiệu điện thế nhất định, đo bằng thương số giữa điện tích của tụ và hiệu điện thế giữa hai bản: $$C = \\dfrac{Q}{U}.$$ Đơn vị của điện dung là fara (F): $1$ F $= 1$ C/V.',
        },
        {
          type: 'table',
          head: ['Ước của fara', 'Kí hiệu', 'Giá trị'],
          rows: [
            ['micrôfara', 'µF', '$10^{-6}$ F'],
            ['nanôfara', 'nF', '$10^{-9}$ F'],
            ['picôfara', 'pF', '$10^{-12}$ F'],
          ],
        },
        {
          type: 'p',
          text: 'Fara là đơn vị rất lớn, nên các tụ điện thường dùng có điện dung cỡ µF, nF hay pF. Điện dung chỉ phụ thuộc vào cấu tạo của tụ (hình dạng, kích thước, khoảng cách giữa hai bản và điện môi), không phụ thuộc vào $Q$ hay $U$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Thông số ghi trên vỏ tụ',
          text: 'Trên vỏ tụ thường ghi hai thông số, ví dụ “$10$ µF – $250$ V”: điện dung của tụ và hiệu điện thế tối đa được phép đặt vào hai bản (hiệu điện thế giới hạn). Vượt quá giá trị này, điện môi có thể bị đánh thủng. Điện tích lớn nhất tụ tích được là $Q_{\\max} = CU_{\\max}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mở rộng: điện dung của tụ điện phẳng',
          text: 'Tụ điện phẳng có hai bản diện tích phần đối diện $S$, cách nhau $d$, giữa hai bản là điện môi có hằng số điện môi $\\varepsilon$ thì $$C = \\dfrac{\\varepsilon S}{4\\pi k d},\\quad k = 9 \\cdot 10^9\\ \\text{N·m}^2/\\text{C}^2.$$ Điện dung tăng khi tăng diện tích bản, giảm khoảng cách giữa hai bản hoặc dùng điện môi có $\\varepsilon$ lớn.',
        },
      ],
    },
    {
      heading: 'Ghép tụ điện',
      blocks: [
        {
          type: 'p',
          text: 'Khi cần một điện dung hay một hiệu điện thế giới hạn mà không có sẵn tụ phù hợp, người ta ghép nhiều tụ thành bộ tụ. Gọi $C_b$, $Q$, $U$ là điện dung, điện tích và hiệu điện thế của cả bộ.',
        },
        {
          type: 'table',
          head: ['Đại lượng', 'Ghép nối tiếp', 'Ghép song song'],
          rows: [
            ['Hiệu điện thế', '$U = U_1 + U_2 + \\ldots + U_n$', '$U = U_1 = U_2 = \\ldots = U_n$'],
            ['Điện tích', '$Q = Q_1 = Q_2 = \\ldots = Q_n$', '$Q = Q_1 + Q_2 + \\ldots + Q_n$'],
            [
              'Điện dung',
              '$\\dfrac{1}{C_b} = \\dfrac{1}{C_1} + \\dfrac{1}{C_2} + \\ldots + \\dfrac{1}{C_n}$',
              '$C_b = C_1 + C_2 + \\ldots + C_n$',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Ghép nối tiếp: bản âm của tụ trước nối với bản dương của tụ sau; điện dung của bộ nhỏ hơn điện dung của mỗi tụ, nhưng bộ chịu được hiệu điện thế lớn hơn. Ghép song song: các bản dương nối với nhau, các bản âm nối với nhau; điện dung của bộ bằng tổng điện dung các tụ.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Hai tụ nối tiếp',
          text: 'Với hai tụ ghép nối tiếp: $C_b = \\dfrac{C_1C_2}{C_1 + C_2}$. Vì cùng điện tích $Q$ nên $U_1 = \\dfrac{Q}{C_1}$, $U_2 = \\dfrac{Q}{C_2}$: tụ có điện dung nhỏ hơn chịu hiệu điện thế lớn hơn.',
        },
        { type: 'widget', name: 'ghep-tu' },
      ],
    },
    {
      heading: 'Năng lượng của tụ điện',
      blocks: [
        {
          type: 'p',
          text: 'Muốn tích điện cho tụ, nguồn điện phải thực hiện công để đưa điện tích từ bản này sang bản kia. Công đó được tích trữ dưới dạng năng lượng điện trường giữa hai bản tụ; khi tụ phóng điện, năng lượng này được giải phóng (làm sáng đèn flash, sinh nhiệt…).',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Năng lượng của tụ điện',
          text: 'Tụ điện có điện dung $C$, tích điện $Q$, hiệu điện thế giữa hai bản $U$ có năng lượng $$W = \\dfrac{QU}{2} = \\dfrac{CU^2}{2} = \\dfrac{Q^2}{2C}.$$ Với $Q$ đo bằng C, $U$ bằng V, $C$ bằng F thì $W$ đo bằng jun (J).',
        },
        {
          type: 'p',
          text: 'Có thừa số $\\dfrac{1}{2}$ vì trong quá trình nạp, hiệu điện thế giữa hai bản tăng dần từ $0$ đến $U$: tính trung bình, mỗi phần điện tích được đưa qua hiệu điện thế $\\dfrac{U}{2}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ứng dụng',
          text: 'Tụ điện có mặt trong hầu hết các thiết bị điện tử: tích trữ năng lượng rồi phóng điện nhanh (đèn flash, máy khử rung tim, máy hàn bu-lông), lọc dòng điện trong bộ nguồn (cho dòng xoay chiều đi qua, ngăn dòng một chiều), mạch khuếch đại, mạch đánh lửa của động cơ xe máy, cảm biến chạm của màn hình cảm ứng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tụ điện phẳng ảo',
    instruction:
      'Chỉnh diện tích bản $S$, khoảng cách $d$ và điện môi, quan sát điện dung và điện tích của tụ. Sau đó chọn “Ngắt khỏi nguồn” rồi kéo hai bản ra xa: đại lượng nào giữ nguyên, đại lượng nào thay đổi?',
  },
  examples: [
    {
      problem:
        'Một tụ điện có điện dung $20$ µF được nối với nguồn có hiệu điện thế $12$ V. Tính điện tích và năng lượng của tụ.',
      steps: [
        '$C = 20$ µF $= 2 \\cdot 10^{-5}$ F.',
        'Điện tích: $Q = CU = 2 \\cdot 10^{-5} \\cdot 12 = 2{,}4 \\cdot 10^{-4}$ C.',
        'Năng lượng: $W = \\dfrac{CU^2}{2} = \\dfrac{2 \\cdot 10^{-5} \\cdot 12^2}{2} = 1{,}44 \\cdot 10^{-3}$ J.',
        'Kiểm tra: $\\dfrac{QU}{2} = \\dfrac{2{,}4 \\cdot 10^{-4} \\cdot 12}{2} = 1{,}44 \\cdot 10^{-3}$ J.',
      ],
      answer: '$Q = 2{,}4 \\cdot 10^{-4}$ C; $W = 1{,}44 \\cdot 10^{-3}$ J.',
    },
    {
      problem:
        'Hai tụ điện $C_1 = 3$ µF và $C_2 = 6$ µF được nối với nguồn $U = 12$ V. Tính điện dung của bộ tụ, điện tích và hiệu điện thế của mỗi tụ khi hai tụ a) ghép nối tiếp; b) ghép song song.',
      steps: [
        'a) Nối tiếp: $C_b = \\dfrac{C_1C_2}{C_1 + C_2} = \\dfrac{3 \\cdot 6}{3 + 6} = 2$ µF.',
        'Điện tích của bộ và của mỗi tụ: $Q = Q_1 = Q_2 = C_bU = 2 \\cdot 12 = 24$ µC.',
        '$U_1 = \\dfrac{Q}{C_1} = \\dfrac{24}{3} = 8$ V; $U_2 = \\dfrac{24}{6} = 4$ V. Kiểm tra: $8 + 4 = 12$ V.',
        'b) Song song: $C_b = 3 + 6 = 9$ µF; $U_1 = U_2 = 12$ V.',
        '$Q_1 = C_1U = 36$ µC; $Q_2 = C_2U = 72$ µC; điện tích của bộ $Q = 108$ µC $= C_bU$.',
      ],
      answer:
        'a) $C_b = 2$ µF, $Q_1 = Q_2 = 24$ µC, $U_1 = 8$ V, $U_2 = 4$ V. b) $C_b = 9$ µF, $U_1 = U_2 = 12$ V, $Q_1 = 36$ µC, $Q_2 = 72$ µC.',
    },
    {
      problem:
        'Một tụ điện phẳng không khí có hai bản diện tích $S = 200$ cm², cách nhau $d = 2$ mm, được nối với nguồn $100$ V. Tính điện dung và điện tích của tụ. Lấy $k = 9 \\cdot 10^9$ N·m²/C².',
      steps: [
        'Đổi đơn vị: $S = 2 \\cdot 10^{-2}$ m², $d = 2 \\cdot 10^{-3}$ m, không khí có $\\varepsilon \\approx 1$.',
        '$C = \\dfrac{\\varepsilon S}{4\\pi k d} = \\dfrac{2 \\cdot 10^{-2}}{4\\pi \\cdot 9 \\cdot 10^9 \\cdot 2 \\cdot 10^{-3}} \\approx 8{,}84 \\cdot 10^{-11}$ F $\\approx 88{,}4$ pF.',
        '$Q = CU \\approx 8{,}84 \\cdot 10^{-11} \\cdot 100 = 8{,}84 \\cdot 10^{-9}$ C.',
      ],
      answer: '$C \\approx 88{,}4$ pF; $Q \\approx 8{,}84 \\cdot 10^{-9}$ C (khoảng $8{,}84$ nC).',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Tụ điện là',
      options: [
        'hệ hai vật dẫn đặt gần nhau và ngăn cách nhau bằng một lớp chất cách điện',
        'hệ hai vật dẫn đặt tiếp xúc với nhau',
        'hệ hai tấm điện môi đặt song song, cách nhau bằng một lớp kim loại',
        'một vật dẫn được bọc kín trong chất cách điện',
      ],
      answer: 0,
      hints: ['Tụ có hai bản dẫn điện; giữa hai bản phải có gì để điện tích không đi qua được?'],
      solution:
        'Tụ điện gồm hai vật dẫn (hai bản) đặt gần nhau, ngăn cách bằng điện môi (chất cách điện).',
    },
    {
      type: 'number',
      prompt:
        'Một tụ điện có điện dung $2$ µF được đặt vào hiệu điện thế $36$ V. Tính điện tích của tụ (theo µC).',
      answer: 72,
      unit: 'µC',
      tolerance: 0.01,
      hints: ['Từ $C = \\dfrac{Q}{U}$ suy ra $Q = CU$.'],
      solution: '$Q = CU = 2 \\cdot 36 = 72$ µC $= 7{,}2 \\cdot 10^{-5}$ C.',
    },
    {
      type: 'number',
      prompt:
        'Đặt vào hai bản của một tụ điện hiệu điện thế $15$ V thì tụ tích được điện tích $30$ µC. Tính điện dung của tụ (theo µF).',
      answer: 2,
      unit: 'µF',
      tolerance: 0.001,
      hints: ['Dùng định nghĩa điện dung $C = \\dfrac{Q}{U}$.'],
      solution:
        '$C = \\dfrac{Q}{U} = \\dfrac{30 \\cdot 10^{-6}}{15} = 2 \\cdot 10^{-6}$ F $= 2$ µF.',
    },
    {
      type: 'choice',
      prompt:
        'Tăng hiệu điện thế đặt vào hai bản của một tụ điện lên gấp đôi (vẫn nhỏ hơn hiệu điện thế giới hạn) thì',
      options: [
        'điện tích của tụ tăng gấp đôi, điện dung không đổi',
        'điện dung của tụ tăng gấp đôi',
        'điện dung của tụ giảm một nửa',
        'điện tích của tụ không đổi',
      ],
      answer: 0,
      hints: ['Điện dung phụ thuộc vào cấu tạo của tụ hay vào $U$?'],
      solution:
        'Điện dung chỉ phụ thuộc cấu tạo của tụ nên không đổi; $Q = CU$ nên điện tích tăng gấp đôi.',
    },
    {
      type: 'choice',
      prompt:
        'Trên vỏ tụ (A) ghi $2$ µF – $350$ V, trên vỏ tụ (B) ghi $2{,}3$ µF – $300$ V. Tụ nào tích được điện tích lớn nhất lớn hơn?',
      options: [
        'Tụ (A), vì $Q_{\\max} = 7 \\cdot 10^{-4}$ C so với $6{,}9 \\cdot 10^{-4}$ C của tụ (B)',
        'Tụ (B), vì tụ (B) có điện dung lớn hơn',
        'Tụ (B), vì $Q_{\\max} = 6{,}9 \\cdot 10^{-3}$ C so với $7 \\cdot 10^{-4}$ C của tụ (A)',
        'Hai tụ tích được điện tích lớn nhất bằng nhau',
      ],
      answer: 0,
      hints: [
        'Số thứ hai ghi trên vỏ là hiệu điện thế giới hạn.',
        'Tính $Q_{\\max} = CU_{\\max}$ cho từng tụ.',
      ],
      solution:
        'Tụ (A): $Q_{\\max} = 2 \\cdot 10^{-6} \\cdot 350 = 7 \\cdot 10^{-4}$ C. Tụ (B): $Q_{\\max} = 2{,}3 \\cdot 10^{-6} \\cdot 300 = 6{,}9 \\cdot 10^{-4}$ C. Tụ (A) tích được nhiều hơn dù điện dung nhỏ hơn.',
    },
    {
      type: 'number',
      prompt:
        'Hai tụ điện $C_1 = 2$ µF và $C_2 = 3$ µF ghép nối tiếp rồi nối với nguồn $10$ V. Tính hiệu điện thế giữa hai bản của tụ $C_1$ (theo V).',
      answer: 6,
      unit: 'V',
      tolerance: 0.01,
      hints: [
        'Tính điện dung của bộ: $C_b = \\dfrac{C_1C_2}{C_1 + C_2}$.',
        'Ghép nối tiếp nên hai tụ cùng điện tích $Q = C_bU$; rồi $U_1 = \\dfrac{Q}{C_1}$.',
      ],
      solution:
        '$C_b = \\dfrac{2 \\cdot 3}{2 + 3} = 1{,}2$ µF; $Q = 1{,}2 \\cdot 10 = 12$ µC; $U_1 = \\dfrac{12}{2} = 6$ V (và $U_2 = 4$ V).',
    },
    {
      type: 'number',
      prompt:
        'Ba tụ điện $2$ µF, $4$ µF và $5$ µF ghép song song rồi nối với nguồn $6$ V. Tính điện tích của cả bộ tụ (theo µC).',
      answer: 66,
      unit: 'µC',
      tolerance: 0.01,
      hints: ['Ghép song song: $C_b = C_1 + C_2 + C_3$, mọi tụ cùng hiệu điện thế $U$.'],
      solution: '$C_b = 2 + 4 + 5 = 11$ µF; $Q = C_bU = 11 \\cdot 6 = 66$ µC.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các phát biểu đúng về bộ tụ ghép nối tiếp.',
      options: [
        'Các tụ có điện tích bằng nhau',
        'Hiệu điện thế của bộ bằng tổng hiệu điện thế các tụ',
        'Điện dung của bộ nhỏ hơn điện dung của mỗi tụ',
        'Điện dung của bộ bằng tổng điện dung các tụ',
        'Các tụ có hiệu điện thế bằng nhau',
      ],
      answers: [0, 1, 2],
      hints: ['Viết lại ba dòng của bảng ghép tụ cho cột “nối tiếp”.'],
      solution:
        'Nối tiếp: $Q = Q_1 = Q_2$, $U = U_1 + U_2$, $\\dfrac{1}{C_b} = \\dfrac{1}{C_1} + \\dfrac{1}{C_2}$ nên $C_b$ nhỏ hơn mỗi tụ. “Tổng điện dung” và “cùng hiệu điện thế” là tính chất của ghép song song.',
    },
    {
      type: 'number',
      prompt:
        'Một tụ điện có điện dung $20$ µF được tích điện ở hiệu điện thế $100$ V. Tính năng lượng của tụ (theo J).',
      answer: 0.1,
      unit: 'J',
      tolerance: 0.0001,
      hints: ['Dùng $W = \\dfrac{CU^2}{2}$ với $C$ đổi ra fara.'],
      solution: '$W = \\dfrac{2 \\cdot 10^{-5} \\cdot 100^2}{2} = 0{,}1$ J.',
    },
    {
      type: 'number',
      prompt:
        'Tụ điện của một đèn flash có điện dung $100$ µF, tích điện $2 \\cdot 10^{-3}$ C. Khi phóng điện, tụ giải phóng toàn bộ năng lượng. Tính năng lượng đó (theo J).',
      answer: 0.02,
      unit: 'J',
      tolerance: 0.00001,
      hints: ['Biết $Q$ và $C$: dùng $W = \\dfrac{Q^2}{2C}$.'],
      solution:
        '$W = \\dfrac{Q^2}{2C} = \\dfrac{(2 \\cdot 10^{-3})^2}{2 \\cdot 10^{-4}} = \\dfrac{4 \\cdot 10^{-6}}{2 \\cdot 10^{-4}} = 0{,}02$ J. (Cũng có $U = \\dfrac{Q}{C} = 20$ V và $W = \\dfrac{QU}{2} = 0{,}02$ J.)',
    },
    {
      type: 'choice',
      prompt:
        'Một tụ điện phẳng được tích điện rồi ngắt khỏi nguồn. Sau đó kéo hai bản ra xa để khoảng cách giữa chúng tăng gấp đôi. Hiệu điện thế giữa hai bản',
      options: ['tăng gấp đôi', 'giảm một nửa', 'không đổi', 'tăng gấp bốn'],
      answer: 0,
      hints: [
        'Ngắt khỏi nguồn thì điện tích $Q$ không thể đi đâu được.',
        'Điện dung tụ phẳng tỉ lệ nghịch với $d$; dùng $U = \\dfrac{Q}{C}$.',
      ],
      solution:
        '$Q$ giữ nguyên; $C = \\dfrac{\\varepsilon S}{4\\pi kd}$ giảm một nửa khi $d$ tăng gấp đôi, nên $U = \\dfrac{Q}{C}$ tăng gấp đôi (năng lượng $W = \\dfrac{Q^2}{2C}$ cũng tăng gấp đôi, nhờ công của lực kéo hai bản ra).',
    },
  ],
  takeaways: [
    'Tụ điện: hai vật dẫn đặt gần nhau, ngăn cách bởi điện môi; điện tích của tụ là độ lớn điện tích trên mỗi bản.',
    'Điện dung $C = \\dfrac{Q}{U}$, đơn vị fara (F); $1$ µF $= 10^{-6}$ F, $1$ nF $= 10^{-9}$ F, $1$ pF $= 10^{-12}$ F. Không đặt vào tụ hiệu điện thế vượt giá trị giới hạn ghi trên vỏ.',
    'Ghép nối tiếp: $Q$ như nhau, $U = U_1 + U_2 + \\ldots$, $\\dfrac{1}{C_b} = \\dfrac{1}{C_1} + \\dfrac{1}{C_2} + \\ldots$. Ghép song song: $U$ như nhau, $Q = Q_1 + Q_2 + \\ldots$, $C_b = C_1 + C_2 + \\ldots$',
    'Năng lượng của tụ điện: $W = \\dfrac{QU}{2} = \\dfrac{CU^2}{2} = \\dfrac{Q^2}{2C}$, chính là năng lượng điện trường giữa hai bản.',
  ],
};
