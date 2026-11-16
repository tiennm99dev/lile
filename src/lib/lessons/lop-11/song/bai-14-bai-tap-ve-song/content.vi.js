/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập các dạng bài tập về sóng: tính bước sóng, tần số, tốc độ truyền sóng; xác định cực đại, cực tiểu và đếm số vân giao thoa của hai nguồn kết hợp, tính khoảng vân trong thí nghiệm Young; vận dụng điều kiện sóng dừng trên dây hai đầu cố định và dây một đầu tự do.',
  intro:
    'Cả chương Sóng xoay quanh một công thức gọn: $v = \\lambda f$. Giao thoa và sóng dừng thêm vào hai ý nữa: hiệu đường đi tính theo $\\lambda$ quyết định cực đại hay cực tiểu, còn chiều dài dây tính theo $\\dfrac{\\lambda}{2}$ hoặc $\\dfrac{\\lambda}{4}$ quyết định có sóng dừng hay không. Bài này luyện cách dùng ba ý đó, và cho em một mô phỏng để tự kiểm tra đáp số.',
  objectives: [
    'Tính được bước sóng, tần số, chu kì và tốc độ truyền sóng từ dữ kiện đề bài.',
    'Xác định được một điểm là cực đại hay cực tiểu giao thoa và đếm được số cực đại, cực tiểu trên đoạn nối hai nguồn.',
    'Vận dụng được điều kiện có sóng dừng để tính bước sóng, tốc độ, tần số và số nút, số bụng.',
  ],
  sections: [
    {
      heading: 'Tóm tắt công thức',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Công thức'],
          rows: [
            ['Bước sóng, tốc độ, tần số', '$\\lambda = vT = \\dfrac{v}{f}$'],
            [
              'Độ lệch pha của hai điểm cách nhau $d$ trên phương truyền',
              '$\\Delta\\varphi = \\dfrac{2\\pi d}{\\lambda}$',
            ],
            [
              'Giao thoa, hai nguồn cùng pha',
              'Cực đại: $d_2 - d_1 = k\\lambda$; cực tiểu: $d_2 - d_1 = \\left(k + \\dfrac{1}{2}\\right)\\lambda$',
            ],
            [
              'Số cực đại trên $S_1S_2$',
              'Số nguyên $k$ với $-\\dfrac{S_1S_2}{\\lambda} < k < \\dfrac{S_1S_2}{\\lambda}$',
            ],
            ['Thí nghiệm Young', '$i = \\dfrac{\\lambda D}{a}$, vân sáng $x_k = ki$'],
            ['Sóng dừng, hai đầu cố định', '$l = k\\dfrac{\\lambda}{2}$: $k$ bụng, $k + 1$ nút'],
            [
              'Sóng dừng, một đầu tự do',
              '$l = (2k + 1)\\dfrac{\\lambda}{4}$: $k + 1$ bụng, $k + 1$ nút',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Phương pháp giải',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Tính bước sóng trước tiên: từ $\\lambda = \\dfrac{v}{f}$, từ khoảng cách giữa các đỉnh sóng (giữa $n$ đỉnh liên tiếp có $n - 1$ bước sóng), hoặc từ phương trình sóng $u = A\\cos\\left(\\omega t - \\dfrac{2\\pi x}{\\lambda}\\right)$.',
            'Bài toán giao thoa: tính $\\dfrac{d_2 - d_1}{\\lambda}$. Nếu là số nguyên $k$ thì điểm đó là cực đại bậc $k$; nếu là số nguyên cộng $\\dfrac{1}{2}$ thì là cực tiểu. Đường trung trực của $S_1S_2$ là cực đại bậc $0$.',
            'Đếm vân trên $S_1S_2$: đếm số nguyên $k$ trong khoảng $\\left(-\\dfrac{S_1S_2}{\\lambda}; \\dfrac{S_1S_2}{\\lambda}\\right)$ cho cực đại, và số nguyên $k$ với $k + \\dfrac{1}{2}$ trong khoảng đó cho cực tiểu.',
            'Bài toán sóng dừng: xác định hai đầu dây (cố định là nút, tự do là bụng), đếm số bụng để biết $k$, rồi dùng $l = k\\dfrac{\\lambda}{2}$ hoặc $l = (2k + 1)\\dfrac{\\lambda}{4}$.',
            'Hai tần số liên tiếp cho sóng dừng trên dây hai đầu cố định hơn kém nhau $\\dfrac{v}{2l}$, đúng bằng tần số nhỏ nhất $f_1$.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đổi đơn vị',
          text: 'Đưa các độ dài về cùng một đơn vị trước khi chia cho $\\lambda$. Với tốc độ, $1$ m/s $= 100$ cm/s.',
        },
      ],
    },
    {
      heading: 'Luyện tập có chấm điểm',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi lượt có $9$ câu được tạo ngẫu nhiên, ba câu cho mỗi dạng. Trả lời sai lần đầu, em được gợi ý và làm lại; bản đồ kĩ năng cho biết dạng nào cần ôn thêm. Nhập số thập phân với dấu phẩy, ví dụ $7{,}5$.',
        },
        { type: 'widget', name: 'luyen-tap' },
      ],
    },
  ],
  explore: {
    title: 'Mô phỏng kiểm tra đáp số',
    instruction:
      'Chọn loại bài toán, nhập các số liệu theo đề (hoặc theo đáp số em vừa tìm). Với sóng dừng, mô phỏng vẽ sợi dây và cho biết có sóng dừng không, mấy bụng, mấy nút. Với giao thoa, mô phỏng đánh dấu các cực đại và cực tiểu trên đoạn $S_1S_2$ để em đếm lại.',
  },
  examples: [
    {
      problem:
        'Trên mặt nước có hai nguồn kết hợp cùng pha dao động với tần số $13$ Hz. Tại điểm $M$ cách hai nguồn $19$ cm và $21$ cm, sóng có biên độ cực đại; giữa $M$ và đường trung trực của $S_1S_2$ không có cực đại nào khác. Tính tốc độ truyền sóng.',
      steps: [
        'Đường trung trực là cực đại bậc $0$; giữa $M$ và nó không còn cực đại nào nên $M$ là cực đại bậc $k = 1$.',
        '$d_2 - d_1 = 21 - 19 = 2$ cm $= 1 \\cdot \\lambda$, nên $\\lambda = 2$ cm.',
        '$v = \\lambda f = 2 \\cdot 13 = 26$ cm/s.',
      ],
      answer: '$v = 26$ cm/s.',
    },
    {
      problem:
        'Một sợi dây hai đầu cố định có sóng dừng ở hai tần số liên tiếp $30$ Hz và $40$ Hz. Tính tần số nhỏ nhất cho sóng dừng trên dây và số bụng khi tần số là $30$ Hz.',
      steps: [
        'Với dây hai đầu cố định $f_k = k\\dfrac{v}{2l} = kf_1$; hai tần số liên tiếp hơn kém nhau $f_1$.',
        '$f_1 = 40 - 30 = 10$ Hz.',
        '$30 = k \\cdot 10$ nên $k = 3$: trên dây có $3$ bụng.',
      ],
      answer: '$f_{min} = 10$ Hz; ở $30$ Hz dây có $3$ bụng.',
    },
    {
      problem:
        'Một sợi dây dài $56$ cm có một đầu cố định, một đầu tự do. Sóng trên dây có tần số $50$ Hz, tốc độ truyền sóng $16$ m/s. Trên dây có sóng dừng không? Nếu có, có bao nhiêu bụng?',
      steps: [
        '$\\lambda = \\dfrac{v}{f} = \\dfrac{16}{50} = 0{,}32$ m $= 32$ cm, nên $\\dfrac{\\lambda}{4} = 8$ cm.',
        '$\\dfrac{l}{\\lambda/4} = \\dfrac{56}{8} = 7$ là số lẻ: $l = 7\\dfrac{\\lambda}{4} = (2 \\cdot 3 + 1)\\dfrac{\\lambda}{4}$, có sóng dừng với $k = 3$.',
        'Số bụng: $k + 1 = 4$.',
      ],
      answer: 'Có sóng dừng, trên dây có $4$ bụng (và $4$ nút).',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Một sóng cơ có tần số $50$ Hz; khoảng cách giữa hai đỉnh sóng liên tiếp là $4$ cm. Tính tốc độ truyền sóng (theo m/s).',
      answer: 2,
      unit: 'm/s',
      hints: ['Hai đỉnh sóng liên tiếp cách nhau một bước sóng.', 'Đổi cm/s ra m/s.'],
      solution: '$\\lambda = 4$ cm; $v = \\lambda f = 4 \\cdot 50 = 200$ cm/s $= 2$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Một sóng truyền dọc trục $Ox$ có phương trình $u = 4\\cos(20\\pi t - 0{,}5\\pi x)$ (cm), với $x$ tính bằng cm, $t$ tính bằng s. Tính tốc độ truyền sóng (theo cm/s).',
      answer: 40,
      unit: 'cm/s',
      hints: [
        'So sánh với $u = A\\cos\\left(\\omega t - \\dfrac{2\\pi x}{\\lambda}\\right)$.',
        '$\\omega = 2\\pi f$ và $\\dfrac{2\\pi}{\\lambda} = 0{,}5\\pi$.',
      ],
      solution:
        '$\\omega = 20\\pi$ rad/s nên $f = 10$ Hz; $\\dfrac{2\\pi}{\\lambda} = 0{,}5\\pi$ nên $\\lambda = 4$ cm. $v = \\lambda f = 40$ cm/s.',
    },
    {
      type: 'number',
      prompt:
        'Một âm có tần số $340$ Hz truyền trong không khí. Hai điểm gần nhau nhất trên cùng một phương truyền dao động ngược pha cách nhau $0{,}5$ m. Tính tốc độ truyền âm (theo m/s).',
      answer: 340,
      unit: 'm/s',
      hints: ['Hai điểm gần nhất dao động ngược pha cách nhau $\\dfrac{\\lambda}{2}$.'],
      solution:
        '$\\dfrac{\\lambda}{2} = 0{,}5$ m nên $\\lambda = 1$ m; $v = \\lambda f = 340$ m/s.',
    },
    {
      type: 'choice',
      prompt:
        'Trong giao thoa của hai nguồn kết hợp cùng pha, trên đoạn $S_1S_2$ khoảng cách giữa một cực đại và một cực tiểu liền kề là',
      options: ['$\\dfrac{\\lambda}{4}$', '$\\dfrac{\\lambda}{2}$', '$\\lambda$', '$2\\lambda$'],
      answer: 0,
      hints: [
        'Hai cực đại liên tiếp trên $S_1S_2$ cách nhau $\\dfrac{\\lambda}{2}$; cực tiểu nằm chính giữa.',
      ],
      solution:
        'Hai cực đại liên tiếp cách nhau $\\dfrac{\\lambda}{2}$ và cực tiểu nằm giữa chúng, nên cực đại và cực tiểu liền kề cách nhau $\\dfrac{\\lambda}{4}$.',
    },
    {
      type: 'number',
      prompt:
        'Hai nguồn kết hợp cùng pha cách nhau $11$ cm, bước sóng $2$ cm. Có bao nhiêu cực đại trên đoạn nối hai nguồn?',
      answer: 11,
      hints: ['Đếm số nguyên $k$ với $-\\dfrac{11}{2} < k < \\dfrac{11}{2}$.'],
      solution: '$-5{,}5 < k < 5{,}5$ nên $k = -5, -4, \\ldots, 5$: có $11$ cực đại.',
    },
    {
      type: 'number',
      prompt:
        'Cũng với hai nguồn cách nhau $11$ cm, bước sóng $2$ cm, có bao nhiêu cực tiểu (điểm đứng yên) trên đoạn nối hai nguồn?',
      answer: 10,
      hints: ['Cực tiểu ứng với $-5{,}5 < k + \\dfrac{1}{2} < 5{,}5$.'],
      solution: '$-6 < k < 5$ nên $k = -5, -4, \\ldots, 4$: có $10$ cực tiểu.',
    },
    {
      type: 'number',
      prompt:
        'Trong thí nghiệm Young, $a = 0{,}5$ mm, $D = 2$ m. Khoảng cách giữa $7$ vân sáng liên tiếp là $12$ mm. Tính bước sóng ánh sáng (theo µm).',
      answer: 0.5,
      unit: 'µm',
      hints: ['$7$ vân sáng liên tiếp có $6$ khoảng vân.', '$\\lambda = \\dfrac{ia}{D}$.'],
      solution:
        '$6i = 12$ mm nên $i = 2$ mm; $\\lambda = \\dfrac{ia}{D} = \\dfrac{2 \\cdot 0{,}5}{2} = 0{,}5$ µm.',
    },
    {
      type: 'number',
      prompt:
        'Một sợi dây dài $2$ m, hai đầu cố định, có sóng dừng với $5$ nút (kể cả hai đầu) khi tần số là $100$ Hz. Tính tốc độ truyền sóng trên dây (theo m/s).',
      answer: 100,
      unit: 'm/s',
      hints: ['$5$ nút thì có mấy bụng?', '$l = k\\dfrac{\\lambda}{2}$.'],
      solution:
        '$5$ nút nên $k = 4$ bụng; $\\lambda = \\dfrac{2l}{k} = \\dfrac{4}{4} = 1$ m; $v = \\lambda f = 100$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Một sợi dây hai đầu cố định có sóng dừng ở hai tần số liên tiếp $75$ Hz và $100$ Hz. Tính tần số nhỏ nhất để có sóng dừng trên dây (theo Hz).',
      answer: 25,
      unit: 'Hz',
      hints: ['$f_k = kf_1$: hai tần số liên tiếp hơn kém nhau đúng $f_1$.'],
      solution: '$f_1 = 100 - 75 = 25$ Hz (kiểm tra: $75 = 3 \\cdot 25$, $100 = 4 \\cdot 25$).',
    },
    {
      type: 'number',
      prompt:
        'Một sợi dây dài $1{,}05$ m, một đầu cố định, một đầu tự do, có sóng dừng với bước sóng $60$ cm. Trên dây có bao nhiêu bụng sóng?',
      answer: 4,
      hints: ['Tính $\\dfrac{l}{\\lambda/4}$: kết quả là số lẻ $2k + 1$.', 'Số bụng là $k + 1$.'],
      solution:
        '$\\dfrac{\\lambda}{4} = 15$ cm; $\\dfrac{105}{15} = 7 = 2k + 1$ nên $k = 3$; số bụng $k + 1 = 4$.',
    },
    {
      type: 'number',
      prompt:
        'Một ống có một đầu bịt kín, cột không khí trong ống dài $34$ cm. Tốc độ âm trong không khí là $340$ m/s. Tính tần số âm cơ bản (thấp nhất) mà cột khí phát ra (theo Hz).',
      answer: 250,
      unit: 'Hz',
      hints: ['Đầu kín là nút, đầu hở là bụng; âm cơ bản ứng với $l = \\dfrac{\\lambda}{4}$.'],
      solution:
        '$\\lambda = 4l = 1{,}36$ m; $f = \\dfrac{v}{\\lambda} = \\dfrac{340}{1{,}36} = 250$ Hz.',
    },
    {
      type: 'choice',
      prompt:
        'Một sợi dây dài $1{,}2$ m, hai đầu cố định, tốc độ truyền sóng trên dây $12$ m/s. Với tần số nào sau đây trên dây có sóng dừng?',
      options: ['$15$ Hz', '$12$ Hz', '$7{,}5$ Hz', '$18$ Hz'],
      answer: 0,
      hints: ['Tần số cho sóng dừng là $f = k\\dfrac{v}{2l}$ với $k$ nguyên dương.'],
      solution:
        '$\\dfrac{v}{2l} = \\dfrac{12}{2{,}4} = 5$ Hz, nên các tần số cho sóng dừng là $5$, $10$, $15$, $20$, … Hz. Chỉ có $15$ Hz ($k = 3$) thoả mãn.',
    },
  ],
  takeaways: [
    'Luôn tìm bước sóng trước: $\\lambda = \\dfrac{v}{f}$; giữa $n$ đỉnh sóng liên tiếp có $n - 1$ bước sóng.',
    'Giao thoa hai nguồn cùng pha: $\\dfrac{d_2 - d_1}{\\lambda}$ nguyên là cực đại, nửa nguyên là cực tiểu; trên $S_1S_2$ các cực đại cách nhau $\\dfrac{\\lambda}{2}$.',
    'Sóng dừng: hai đầu cố định $l = k\\dfrac{\\lambda}{2}$, một đầu tự do $l = (2k + 1)\\dfrac{\\lambda}{4}$; đếm bụng để biết $k$.',
  ],
};
