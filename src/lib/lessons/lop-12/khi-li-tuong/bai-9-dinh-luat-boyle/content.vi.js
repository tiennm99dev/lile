/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Định luật Boyle: khi nhiệt độ của một khối lượng khí xác định được giữ không đổi thì áp suất của khí tỉ lệ nghịch với thể tích của nó, pV = hằng số. Đường biểu diễn quá trình đẳng nhiệt trong hệ toạ độ p – V là đường hypebol, gọi là đường đẳng nhiệt.',
  intro:
    'Bịt kín đầu một chiếc bơm tiêm (xi lanh) rồi ấn pít-tông: càng ấn vào, tay càng phải dùng lực mạnh hơn. Không khí bên trong bị nén lại và đẩy ngược pít-tông ra mạnh hơn. Áp suất của khí thay đổi theo thể tích như thế nào? Nhà vật lí Robert Boyle đã trả lời câu hỏi này bằng thí nghiệm từ năm 1662.',
  objectives: [
    'Nêu được các thông số trạng thái của một lượng khí và thế nào là quá trình đẳng nhiệt.',
    'Mô tả được thí nghiệm khảo sát mối liên hệ giữa áp suất và thể tích của khí khi nhiệt độ không đổi.',
    'Phát biểu và vận dụng được định luật Boyle: $pV = $ hằng số.',
    'Vẽ và nhận ra được đường đẳng nhiệt trong hệ toạ độ $(p, V)$.',
  ],
  sections: [
    {
      heading: 'Trạng thái và quá trình biến đổi trạng thái',
      blocks: [
        {
          type: 'p',
          text: 'Trạng thái của một lượng khí xác định được mô tả bằng ba đại lượng: áp suất $p$, thể tích $V$ và nhiệt độ tuyệt đối $T$. Chúng được gọi là các thông số trạng thái. Lượng khí chuyển từ trạng thái này sang trạng thái khác gọi là quá trình biến đổi trạng thái (gọi tắt là quá trình).',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Quá trình đẳng nhiệt',
          text: 'Quá trình biến đổi trạng thái của một khối lượng khí xác định trong đó nhiệt độ được giữ không đổi gọi là quá trình đẳng nhiệt.',
        },
        {
          type: 'table',
          head: ['Đại lượng', 'Kí hiệu', 'Đơn vị SI', 'Đơn vị thường gặp khác'],
          rows: [
            [
              'Áp suất',
              '$p$',
              'Pa ($1$ Pa $= 1$ N/m²)',
              '$1$ atm $= 1{,}013 \\cdot 10^5$ Pa $= 760$ mmHg',
            ],
            ['Thể tích', '$V$', 'm³', '$1$ lít $= 1$ dm³ $= 10^{-3}$ m³; $1$ cm³ $= 10^{-6}$ m³'],
            ['Nhiệt độ tuyệt đối', '$T$', 'K', '$T\\,(\\text{K}) = t\\,(^\\circ\\text{C}) + 273$'],
          ],
        },
      ],
    },
    {
      heading: 'Định luật Boyle',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm: một lượng khí được nhốt trong xi lanh kín bằng pít-tông, nối với áp kế. Dịch chuyển pít-tông thật chậm để nhiệt độ khí không đổi, đọc thể tích $V$ trên thang chia của xi lanh và áp suất $p$ trên áp kế ở nhiều vị trí, ghi vào bảng rồi tính tích $pV$.',
        },
        {
          type: 'table',
          head: ['Lần đo', '$V$ (cm³)', '$p$ ($10^5$ Pa)', '$pV$ ($10^5$ Pa.cm³)'],
          rows: [
            ['1', '$30$', '$1{,}00$', '$30{,}0$'],
            ['2', '$25$', '$1{,}20$', '$30{,}0$'],
            ['3', '$20$', '$1{,}50$', '$30{,}0$'],
            ['4', '$15$', '$2{,}00$', '$30{,}0$'],
            ['5', '$12$', '$2{,}50$', '$30{,}0$'],
          ],
          caption: 'Một bộ số đo mẫu ở nhiệt độ không đổi: tích pV không đổi.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định luật Boyle',
          text: 'Khi giữ nhiệt độ của một khối lượng khí xác định không đổi thì áp suất của khí tỉ lệ nghịch với thể tích của nó: $$pV = \\text{hằng số}.$$ Với hai trạng thái 1 và 2 của cùng một lượng khí ở cùng nhiệt độ: $$p_1V_1 = p_2V_2.$$',
        },
        {
          type: 'p',
          text: 'Mô hình động học phân tử giải thích định luật này: khi thể tích giảm bao nhiêu lần thì mật độ phân tử tăng bấy nhiêu lần; nhiệt độ không đổi nên mỗi va chạm vẫn mạnh như cũ, còn số va chạm lên thành bình trong mỗi giây tăng bấy nhiêu lần, nên áp suất tăng bấy nhiêu lần.',
        },
      ],
    },
    {
      heading: 'Đường đẳng nhiệt',
      blocks: [
        {
          type: 'p',
          text: 'Đường biểu diễn sự biến thiên của áp suất theo thể tích khi nhiệt độ không đổi gọi là đường đẳng nhiệt. Trong hệ toạ độ $(p, V)$, vì $p = \\dfrac{\\text{hằng số}}{V}$ nên đường đẳng nhiệt là một nhánh của đường hypebol. Nếu vẽ $p$ theo $\\dfrac{1}{V}$ thì ta được một đường thẳng đi qua gốc toạ độ.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Các đường đẳng nhiệt khác nhau',
          text: 'Với cùng một lượng khí, ứng với các nhiệt độ khác nhau có các đường đẳng nhiệt khác nhau. Ở cùng thể tích, khí nóng hơn có áp suất lớn hơn, nên đường đẳng nhiệt ở trên ứng với nhiệt độ cao hơn: nếu $T_2 > T_1$ thì đường $T_2$ nằm phía trên đường $T_1$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý khi tính toán',
          text: 'Trong $p_1V_1 = p_2V_2$, chỉ cần $p_1$ và $p_2$ cùng đơn vị, $V_1$ và $V_2$ cùng đơn vị (atm và lít vẫn dùng được), không bắt buộc đổi sang đơn vị SI. Định luật chỉ áp dụng cho một khối lượng khí xác định (không thêm, không bớt khí) và nhiệt độ không đổi.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xi lanh và đường đẳng nhiệt',
    instruction:
      'Kéo thanh trượt để dịch pít-tông, đọc áp suất trên áp kế rồi bấm "Ghi số đo". Ghi ít nhất 3 số đo ở cùng nhiệt độ để vẽ đường đẳng nhiệt và so sánh tích $pV$. Đổi sang $400$ K để có đường đẳng nhiệt thứ hai, và thử đồ thị $p$ theo $1/V$.',
  },
  examples: [
    {
      problem:
        'Một lượng khí có thể tích $12$ lít ở áp suất $1{,}0 \\cdot 10^5$ Pa được nén đẳng nhiệt đến áp suất $3{,}0 \\cdot 10^5$ Pa. Tính thể tích của khí sau khi nén.',
      steps: [
        'Trạng thái 1: $p_1 = 1{,}0 \\cdot 10^5$ Pa, $V_1 = 12$ lít. Trạng thái 2: $p_2 = 3{,}0 \\cdot 10^5$ Pa, $V_2 = ?$',
        'Quá trình đẳng nhiệt nên theo định luật Boyle: $p_1V_1 = p_2V_2$.',
        '$V_2 = \\dfrac{p_1V_1}{p_2} = \\dfrac{1{,}0 \\cdot 10^5 \\cdot 12}{3{,}0 \\cdot 10^5} = 4$ lít.',
      ],
      answer: '$V_2 = 4$ lít: áp suất tăng $3$ lần thì thể tích giảm $3$ lần.',
    },
    {
      problem:
        'Một bọt khí nổi từ đáy một hồ nước sâu $5$ m lên mặt nước. Coi nhiệt độ của bọt khí không đổi. Hỏi thể tích bọt khí tăng bao nhiêu lần? Cho áp suất khí quyển $p_0 = 1{,}0 \\cdot 10^5$ Pa, khối lượng riêng của nước $1\\,000$ kg/m³, $g = 10$ m/s².',
      steps: [
        'Ở đáy hồ, áp suất trong bọt khí bằng áp suất của nước: $p_1 = p_0 + \\rho g h = 1{,}0 \\cdot 10^5 + 1\\,000 \\cdot 10 \\cdot 5 = 1{,}5 \\cdot 10^5$ Pa.',
        'Ở mặt nước: $p_2 = p_0 = 1{,}0 \\cdot 10^5$ Pa.',
        'Định luật Boyle: $p_1V_1 = p_2V_2$, nên $\\dfrac{V_2}{V_1} = \\dfrac{p_1}{p_2} = \\dfrac{1{,}5 \\cdot 10^5}{1{,}0 \\cdot 10^5} = 1{,}5$.',
      ],
      answer: 'Thể tích bọt khí tăng $1{,}5$ lần.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Quá trình đẳng nhiệt là quá trình biến đổi trạng thái của một khối lượng khí xác định trong đó',
      options: [
        'nhiệt độ được giữ không đổi',
        'áp suất được giữ không đổi',
        'thể tích được giữ không đổi',
        'cả áp suất và thể tích được giữ không đổi',
      ],
      answer: 0,
      hints: ['"Đẳng" nghĩa là bằng nhau, không đổi; "nhiệt" chỉ nhiệt độ.'],
      solution: 'Quá trình đẳng nhiệt: nhiệt độ không đổi, còn áp suất và thể tích thay đổi.',
    },
    {
      type: 'number',
      prompt:
        'Một lượng khí có thể tích $2$ lít ở áp suất $1{,}0 \\cdot 10^5$ Pa được nén đẳng nhiệt còn $0{,}5$ lít. Áp suất của khí sau khi nén là bao nhiêu (theo đơn vị $10^5$ Pa)?',
      answer: 4,
      hints: ['$p_1V_1 = p_2V_2$.', '$p_2 = \\dfrac{p_1V_1}{V_2}$.'],
      solution:
        '$p_2 = \\dfrac{1{,}0 \\cdot 10^5 \\cdot 2}{0{,}5} = 4 \\cdot 10^5$ Pa: thể tích giảm $4$ lần thì áp suất tăng $4$ lần.',
    },
    {
      type: 'number',
      prompt:
        'Khí trong xi lanh có áp suất $2$ atm và thể tích $6$ lít. Đẩy pít-tông thật chậm (nhiệt độ không đổi) cho đến khi áp suất tăng lên $3$ atm. Thể tích khí lúc đó là bao nhiêu lít?',
      answer: 4,
      unit: 'lít',
      hints: ['Không cần đổi atm sang Pa: chỉ cần $p_1$, $p_2$ cùng đơn vị.'],
      solution: '$V_2 = \\dfrac{p_1V_1}{p_2} = \\dfrac{2 \\cdot 6}{3} = 4$ lít.',
    },
    {
      type: 'choice',
      prompt: 'Trong hệ toạ độ $(p, V)$, đường đẳng nhiệt của một lượng khí lí tưởng là',
      options: [
        'một nhánh của đường hypebol',
        'một đường thẳng đi qua gốc toạ độ',
        'một đường thẳng song song với trục $V$',
        'một đường parabol',
      ],
      answer: 0,
      hints: ['$p = \\dfrac{\\text{hằng số}}{V}$: đồ thị của hàm $y = \\dfrac{a}{x}$ là đường gì?'],
      solution:
        '$p$ tỉ lệ nghịch với $V$ nên đường đẳng nhiệt là một nhánh hypebol. Đường thẳng qua gốc toạ độ là đồ thị của $p$ theo $\\dfrac{1}{V}$.',
    },
    {
      type: 'choice',
      prompt:
        'Trên cùng một hệ toạ độ $(p, V)$ vẽ hai đường đẳng nhiệt của cùng một lượng khí, ứng với nhiệt độ $T_1$ và $T_2$; đường $T_2$ nằm phía trên đường $T_1$. Kết luận nào đúng?',
      options: ['$T_2 > T_1$', '$T_2 < T_1$', '$T_2 = T_1$', 'Không so sánh được'],
      answer: 0,
      hints: [
        'Kẻ một đường thẳng đứng (cùng $V$) cắt hai đường: ở trạng thái nào áp suất lớn hơn?',
      ],
      solution:
        'Ở cùng thể tích, trên đường $T_2$ áp suất lớn hơn. Cùng thể tích mà áp suất lớn hơn thì phân tử chuyển động nhanh hơn, tức nhiệt độ cao hơn: $T_2 > T_1$.',
    },
    {
      type: 'number',
      prompt:
        'Nén đẳng nhiệt một lượng khí, thể tích giảm $2$ lít thì áp suất tăng lên $1{,}5$ lần. Thể tích ban đầu của khí là bao nhiêu lít?',
      answer: 6,
      unit: 'lít',
      hints: [
        'Gọi thể tích ban đầu là $V$: $p_2 = 1{,}5p_1$ và $V_2 = V - 2$.',
        '$p_1V = 1{,}5p_1(V - 2)$.',
      ],
      solution:
        '$p_1V = 1{,}5p_1(V - 2) \\Rightarrow V = 1{,}5V - 3 \\Rightarrow 0{,}5V = 3 \\Rightarrow V = 6$ lít.',
    },
    {
      type: 'number',
      prompt:
        'Một bọt khí ở đáy hồ sâu $10$ m nổi lên mặt nước, nhiệt độ không đổi. Thể tích bọt khí tăng bao nhiêu lần? Cho $p_0 = 1{,}0 \\cdot 10^5$ Pa, $\\rho = 1\\,000$ kg/m³, $g = 10$ m/s².',
      answer: 2,
      unit: 'lần',
      hints: [
        'Áp suất ở đáy hồ: $p_1 = p_0 + \\rho g h$.',
        '$\\dfrac{V_2}{V_1} = \\dfrac{p_1}{p_2}$ với $p_2 = p_0$.',
      ],
      solution:
        '$p_1 = 1{,}0 \\cdot 10^5 + 1\\,000 \\cdot 10 \\cdot 10 = 2{,}0 \\cdot 10^5$ Pa. $\\dfrac{V_2}{V_1} = \\dfrac{2{,}0 \\cdot 10^5}{1{,}0 \\cdot 10^5} = 2$.',
    },
    {
      type: 'number',
      prompt:
        'Một quả bóng có thể tích $2$ lít chứa không khí ở áp suất $1$ atm. Dùng bơm, mỗi lần bơm đưa được $0{,}1$ lít không khí ở áp suất $1$ atm vào bóng. Coi thể tích bóng và nhiệt độ không đổi. Sau $20$ lần bơm, áp suất khí trong bóng là bao nhiêu atm?',
      answer: 2,
      unit: 'atm',
      hints: [
        'Xét toàn bộ lượng khí cuối cùng có trong bóng: lúc đầu nó gồm khí sẵn có trong bóng và $20$ lần khí bơm vào, tất cả ở $1$ atm.',
        'Trạng thái 1: $p_1 = 1$ atm, $V_1 = 2 + 20 \\cdot 0{,}1$ lít; trạng thái 2: $V_2 = 2$ lít.',
      ],
      solution:
        'Lượng khí cuối cùng trong bóng ban đầu chiếm $V_1 = 2 + 20 \\cdot 0{,}1 = 4$ lít ở $p_1 = 1$ atm. Nén đẳng nhiệt vào $V_2 = 2$ lít: $p_2 = \\dfrac{p_1V_1}{V_2} = \\dfrac{1 \\cdot 4}{2} = 2$ atm.',
    },
  ],
  takeaways: [
    'Các thông số trạng thái của một lượng khí: áp suất $p$, thể tích $V$, nhiệt độ tuyệt đối $T$.',
    'Định luật Boyle (quá trình đẳng nhiệt): $pV = $ hằng số, hay $p_1V_1 = p_2V_2$.',
    'Đường đẳng nhiệt trong hệ $(p, V)$ là một nhánh hypebol; đường ở trên ứng với nhiệt độ cao hơn.',
  ],
};
