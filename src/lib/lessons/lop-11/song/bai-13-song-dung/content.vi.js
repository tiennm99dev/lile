/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Sóng tới và sóng phản xạ trên một sợi dây giao thoa với nhau tạo thành sóng dừng: có những điểm luôn đứng yên (nút) xen kẽ những điểm dao động với biên độ cực đại (bụng); hai nút hoặc hai bụng liên tiếp cách nhau nửa bước sóng. Dây hai đầu cố định có sóng dừng khi l = kλ/2; dây một đầu cố định, một đầu tự do có sóng dừng khi l = (2k + 1)λ/4.',
  intro:
    'Gảy một dây đàn ghi-ta, dây rung thành một "múi" mờ, chỗ giữa rung mạnh nhất còn hai đầu đứng yên. Thổi vào ống sáo hay vỗ tay trước miệng các ống của đàn K\'lông pút, mỗi ống lại cho một âm riêng tuỳ theo độ dài. Cả hai hiện tượng đều là sóng dừng: sóng truyền tới đầu dây (hay đầu ống), phản xạ trở lại và giao thoa với chính nó.',
  objectives: [
    'Mô tả được sự phản xạ của sóng ở đầu cố định và đầu tự do của sợi dây.',
    'Giải thích được sự hình thành sóng dừng do giao thoa của sóng tới và sóng phản xạ.',
    'Nêu được thế nào là nút, bụng; khoảng cách giữa hai nút (hoặc hai bụng) liên tiếp bằng $\\dfrac{\\lambda}{2}$.',
    'Viết và vận dụng được điều kiện có sóng dừng trên dây hai đầu cố định và dây một đầu cố định, một đầu tự do.',
  ],
  sections: [
    {
      heading: 'Thí nghiệm tạo sóng dừng',
      blocks: [
        {
          type: 'p',
          text: 'Một sợi dây đàn hồi $PQ$ được căng ngang: đầu $P$ gắn với cần rung của máy phát dao động, đầu $Q$ buộc cố định vào giá. Bật máy và tăng dần tần số dao động của cần rung. Với phần lớn các tần số, dây chỉ rung lăn tăn. Nhưng ở một số tần số xác định, trên dây xuất hiện những "múi" rung rất rõ: có những điểm hầu như đứng yên xen kẽ với những điểm dao động rất mạnh.',
        },
        {
          type: 'p',
          text: 'Giải thích: sóng do cần rung tạo ra truyền từ $P$ tới $Q$ (sóng tới), gặp đầu $Q$ thì bị phản xạ và truyền ngược lại (sóng phản xạ). Sóng phản xạ có cùng tần số và cùng bước sóng với sóng tới, nên hai sóng là hai sóng kết hợp và giao thoa với nhau trên dây.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Sự phản xạ của sóng',
          text: 'Khi phản xạ ở một đầu cố định, sóng phản xạ luôn ngược pha với sóng tới tại điểm phản xạ, nên đầu cố định luôn đứng yên. Khi phản xạ ở một đầu tự do, sóng phản xạ cùng pha với sóng tới tại điểm phản xạ, nên đầu tự do dao động mạnh nhất.',
        },
        { type: 'widget', name: 'phan-xa' },
      ],
    },
    {
      heading: 'Sóng dừng: nút và bụng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Sóng dừng',
          text: 'Sóng truyền trên sợi dây trong trường hợp xuất hiện các điểm luôn đứng yên và các điểm dao động với biên độ cực đại xen kẽ nhau gọi là sóng dừng. Những điểm luôn đứng yên là các nút sóng; những điểm dao động với biên độ cực đại là các bụng sóng.',
        },
        {
          type: 'list',
          items: [
            'Tại nút, sóng tới và sóng phản xạ luôn ngược pha, triệt tiêu nhau; tại bụng, hai sóng luôn cùng pha, tăng cường nhau.',
            'Khoảng cách giữa hai nút liên tiếp, hoặc giữa hai bụng liên tiếp, bằng nửa bước sóng: $\\dfrac{\\lambda}{2}$.',
            'Khoảng cách giữa một nút và một bụng liền kề bằng một phần tư bước sóng: $\\dfrac{\\lambda}{4}$.',
            'Hình dạng sóng dừng không chạy dọc theo dây; mỗi đoạn giữa hai nút liên tiếp (một "bó sóng") chỉ phồng lên rồi xẹp xuống. Các điểm trong cùng một bó dao động cùng pha; hai bó liền nhau dao động ngược pha.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đo bước sóng nhờ sóng dừng',
          text: 'Nút sóng đứng yên nên dễ nhận ra. Đo khoảng cách giữa hai nút cách nhau $n$ bó sóng được $d$ thì $\\lambda = \\dfrac{2d}{n}$; biết thêm tần số $f$ là tính được tốc độ truyền sóng $v = \\lambda f$.',
        },
      ],
    },
    {
      heading: 'Điều kiện có sóng dừng',
      blocks: [
        {
          type: 'p',
          text: 'Hai đầu dây cố định đều phải là nút. Giữa hai nút liên tiếp là nửa bước sóng, nên chiều dài dây phải chứa một số nguyên lần nửa bước sóng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Dây có hai đầu cố định',
          text: '$l = k\\dfrac{\\lambda}{2}$ với $k = 1, 2, 3, \\ldots$ Khi đó trên dây có $k$ bụng (số bó sóng) và $k + 1$ nút (kể cả hai đầu dây).',
        },
        {
          type: 'p',
          text: 'Nếu một đầu cố định (nút) và một đầu tự do (bụng) thì từ nút ở đầu cố định tới bụng ở đầu tự do là một số nguyên lần nửa bước sóng cộng thêm một phần tư bước sóng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Dây có một đầu cố định, một đầu tự do',
          text: '$l = (2k + 1)\\dfrac{\\lambda}{4}$ với $k = 0, 1, 2, \\ldots$ Khi đó trên dây có $k + 1$ bụng và $k + 1$ nút; chiều dài dây bằng một số lẻ lần $\\dfrac{\\lambda}{4}$.',
        },
        { type: 'tex', tex: '\\text{Hai đầu cố định: } f = k\\dfrac{v}{2l}' },
        { type: 'tex', tex: '\\text{Một đầu tự do: } f = (2k + 1)\\dfrac{v}{4l}' },
        {
          type: 'p',
          text: 'Với một dây đã cho ($l$ và $v$ không đổi), sóng dừng chỉ xuất hiện ở những tần số xác định. Với dây hai đầu cố định, các tần số đó là $f_1 = \\dfrac{v}{2l}$, $2f_1$, $3f_1$, …',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Sóng dừng trong ống sáo',
          text: "Khi thổi sáo hay vỗ tay trước miệng ống của đàn K'lông pút, cột không khí trong ống cũng có sóng dừng. Đầu ống bịt kín là một nút, đầu ống hở là một bụng, nên cột khí giống một dây có một đầu cố định, một đầu tự do: $l = (2k + 1)\\dfrac{\\lambda}{4}$. Ống càng dài thì bước sóng càng lớn, tần số càng nhỏ và âm phát ra càng trầm.",
        },
      ],
    },
  ],
  explore: {
    title: 'Tìm tần số cho sóng dừng',
    instruction:
      'Chọn đầu $Q$ cố định hoặc tự do, rồi kéo thanh trượt (hoặc bấm $\\pm 0{,}5$ Hz) để đổi tần số của cần rung. Khi dây rung thành các bó rõ ràng là đã có sóng dừng: đếm nút và bụng, đọc bước sóng. Làm lần lượt các nhiệm vụ và để ý dãy tần số đã tìm được có quy luật gì.',
  },
  examples: [
    {
      problem:
        'Một sợi dây đàn hồi dài $L = 1{,}2$ m, hai đầu cố định, đang có sóng dừng với $3$ bụng. Tần số của sóng là $13{,}3$ Hz. Tính bước sóng và tốc độ truyền sóng trên dây.',
      steps: [
        'Dây hai đầu cố định có $3$ bụng nên $k = 3$: $L = 3\\dfrac{\\lambda}{2}$.',
        '$\\lambda = \\dfrac{2L}{3} = \\dfrac{2 \\cdot 1{,}2}{3} = 0{,}8$ m.',
        '$v = \\lambda f = 0{,}8 \\cdot 13{,}3 = 10{,}64$ m/s.',
      ],
      answer: '$\\lambda = 0{,}8$ m; $v = 10{,}64$ m/s.',
    },
    {
      problem:
        'Một sợi dây dài $0{,}6$ m, hai đầu cố định. Tính bước sóng dài nhất có thể tạo sóng dừng trên dây, và bước sóng khi trên dây có $3$ bụng.',
      steps: [
        'Từ $l = k\\dfrac{\\lambda}{2}$ suy ra $\\lambda = \\dfrac{2l}{k}$; $\\lambda$ lớn nhất khi $k = 1$ (một bụng): $\\lambda = 2 \\cdot 0{,}6 = 1{,}2$ m.',
        'Với $3$ bụng, $k = 3$: $\\lambda = \\dfrac{2 \\cdot 0{,}6}{3} = 0{,}4$ m.',
      ],
      answer: '$\\lambda_{max} = 1{,}2$ m; với $3$ bụng $\\lambda = 0{,}4$ m.',
    },
    {
      problem:
        'Một ống sáo có đầu bịt kín, cột khí dài $l = 17$ cm. Tốc độ âm trong không khí là $340$ m/s. Tính tần số âm thấp nhất (âm cơ bản) mà cột khí phát ra.',
      steps: [
        'Cột khí một đầu kín (nút), một đầu hở (bụng): $l = (2k + 1)\\dfrac{\\lambda}{4}$.',
        'Âm thấp nhất ứng với bước sóng dài nhất, $k = 0$: $\\lambda = 4l = 4 \\cdot 0{,}17 = 0{,}68$ m.',
        '$f = \\dfrac{v}{\\lambda} = \\dfrac{340}{0{,}68} = 500$ Hz.',
      ],
      answer: '$f = 500$ Hz.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Sóng dừng trên một sợi dây được tạo thành do',
      options: [
        'sự giao thoa của sóng tới và sóng phản xạ trên dây',
        'sự giao thoa của hai sóng do hai nguồn khác nhau phát ra',
        'dây dao động tắt dần',
        'sóng truyền trên dây với tốc độ bằng không',
      ],
      answer: 0,
      hints: ['Sóng tới đầu dây $Q$ thì điều gì xảy ra với nó?'],
      solution:
        'Sóng tới gặp đầu dây bị phản xạ; sóng phản xạ và sóng tới là hai sóng kết hợp, giao thoa với nhau tạo thành sóng dừng.',
    },
    {
      type: 'choice',
      prompt: 'Trong sóng dừng, khoảng cách giữa hai nút liên tiếp bằng',
      options: ['nửa bước sóng', 'một bước sóng', 'một phần tư bước sóng', 'hai lần bước sóng'],
      answer: 0,
      hints: ['Nhớ lại khoảng cách giữa hai cực đại giao thoa liên tiếp trên đoạn nối hai nguồn.'],
      solution:
        'Hai nút liên tiếp (cũng như hai bụng liên tiếp) cách nhau $\\dfrac{\\lambda}{2}$; nút và bụng liền kề cách nhau $\\dfrac{\\lambda}{4}$.',
    },
    {
      type: 'number',
      prompt:
        'Một sợi dây dài $1{,}2$ m, hai đầu cố định, đang có sóng dừng với $4$ bụng. Tính bước sóng (theo m).',
      answer: 0.6,
      unit: 'm',
      hints: ['Dây hai đầu cố định: $l = k\\dfrac{\\lambda}{2}$, $k$ là số bụng.'],
      solution: '$k = 4$: $\\lambda = \\dfrac{2l}{k} = \\dfrac{2 \\cdot 1{,}2}{4} = 0{,}6$ m.',
    },
    {
      type: 'number',
      prompt:
        'Trên một sợi dây hai đầu cố định đang có sóng dừng với $5$ bụng. Kể cả hai đầu dây, trên dây có bao nhiêu nút?',
      answer: 6,
      hints: ['Mỗi bó sóng nằm giữa hai nút liền nhau.'],
      solution: 'Dây hai đầu cố định có $k$ bụng và $k + 1$ nút: $5 + 1 = 6$ nút.',
    },
    {
      type: 'number',
      prompt:
        'Một sợi dây dài $90$ cm, hai đầu cố định, có sóng dừng với $3$ bụng khi tần số là $50$ Hz. Tính tốc độ truyền sóng trên dây (theo m/s).',
      answer: 30,
      unit: 'm/s',
      hints: ['Tìm $\\lambda$ từ $l = 3\\dfrac{\\lambda}{2}$, đổi ra mét.', '$v = \\lambda f$.'],
      solution:
        '$\\lambda = \\dfrac{2 \\cdot 0{,}9}{3} = 0{,}6$ m; $v = \\lambda f = 0{,}6 \\cdot 50 = 30$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Một sợi dây dài $1$ m, hai đầu cố định, tốc độ truyền sóng trên dây là $20$ m/s. Tính tần số nhỏ nhất của cần rung để trên dây có sóng dừng (theo Hz).',
      answer: 10,
      unit: 'Hz',
      hints: ['Tần số nhỏ nhất ứng với $k = 1$ (một bụng).', '$f = k\\dfrac{v}{2l}$.'],
      solution: '$f_1 = \\dfrac{v}{2l} = \\dfrac{20}{2 \\cdot 1} = 10$ Hz.',
    },
    {
      type: 'number',
      prompt:
        'Một sợi dây dài $l$, một đầu cố định, một đầu tự do, có sóng dừng với bước sóng $\\lambda = 40$ cm và trên dây có $3$ bụng. Tính chiều dài $l$ của dây (theo cm).',
      answer: 50,
      unit: 'cm',
      hints: ['Một đầu tự do: $l = (2k + 1)\\dfrac{\\lambda}{4}$, số bụng là $k + 1$.'],
      solution: '$3$ bụng nên $k = 2$: $l = (2 \\cdot 2 + 1)\\dfrac{40}{4} = 5 \\cdot 10 = 50$ cm.',
    },
    {
      type: 'choice',
      prompt:
        'Với cột không khí trong một ống có một đầu kín, một đầu hở, điều kiện có sóng dừng là',
      options: [
        '$l = (2k + 1)\\dfrac{\\lambda}{4}$',
        '$l = k\\dfrac{\\lambda}{2}$',
        '$l = k\\lambda$',
        '$l = (2k + 1)\\dfrac{\\lambda}{2}$',
      ],
      answer: 0,
      hints: ['Đầu kín là nút, đầu hở là bụng.'],
      solution:
        'Đầu kín là nút, đầu hở là bụng, giống một dây có một đầu cố định, một đầu tự do: $l = (2k + 1)\\dfrac{\\lambda}{4}$, $k = 0, 1, 2, \\ldots$',
    },
    {
      type: 'number',
      prompt:
        'Một sợi dây hai đầu cố định có sóng dừng ở tần số $f_1 = 12$ Hz với $1$ bụng. Giữ nguyên lực căng (tốc độ truyền sóng không đổi), phải tăng tần số tới giá trị bao nhiêu (theo Hz) để trên dây có $3$ bụng?',
      answer: 36,
      unit: 'Hz',
      hints: ['$f = k\\dfrac{v}{2l}$ tỉ lệ với số bụng $k$.'],
      solution: '$f_k = k f_1$, nên $f_3 = 3 \\cdot 12 = 36$ Hz.',
    },
  ],
  takeaways: [
    'Sóng phản xạ ở đầu cố định ngược pha với sóng tới (đầu cố định là nút); ở đầu tự do cùng pha với sóng tới (đầu tự do là bụng).',
    'Sóng dừng do sóng tới và sóng phản xạ giao thoa: nút luôn đứng yên, bụng dao động với biên độ cực đại.',
    'Hai nút (hoặc hai bụng) liên tiếp cách nhau $\\dfrac{\\lambda}{2}$; nút và bụng liền kề cách nhau $\\dfrac{\\lambda}{4}$.',
    'Hai đầu cố định: $l = k\\dfrac{\\lambda}{2}$ ($k$ bụng, $k + 1$ nút). Một đầu cố định, một đầu tự do: $l = (2k + 1)\\dfrac{\\lambda}{4}$.',
  ],
};
