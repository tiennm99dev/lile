/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Trong điện trường đều, công của lực điện khi điện tích q dịch chuyển từ M đến N là A = qEd, với d là độ dài đại số hình chiếu của MN lên một đường sức; công này không phụ thuộc hình dạng đường đi, chỉ phụ thuộc vị trí điểm đầu và điểm cuối. Thế năng điện của q tại M bằng công của lực điện khi q đi từ M tới mốc thế năng (bản âm trong điện trường đều, vô cực trong điện trường bất kì), và A_MN = W_M − W_N.',
  intro:
    'Một hòn đá rơi từ tầng ba xuống sân, dù rơi thẳng hay lăn theo cầu thang, trọng lực vẫn sinh cùng một công. Lực điện tác dụng lên một điện tích trong điện trường đều cũng là một lực không đổi như trọng lực. Liệu lực điện có tính chất giống như vậy không?',
  objectives: [
    'Tính được công của lực điện trong điện trường đều $A = qEd$ và giải thích được dấu của công.',
    'Nêu được công của lực điện không phụ thuộc hình dạng đường đi, chỉ phụ thuộc vị trí điểm đầu và điểm cuối.',
    'Nêu được khái niệm thế năng điện, cách chọn mốc thế năng, và vận dụng được $A_{MN} = W_M - W_N$.',
  ],
  sections: [
    {
      heading: 'Công của lực điện',
      blocks: [
        {
          type: 'p',
          text: "Điện tích $q > 0$ dịch chuyển trong điện trường đều $\\vec E$ từ $M$ đến $N$. Lực điện $\\vec F = q\\vec E$ không đổi. Gọi $M'$, $N'$ là hình chiếu của $M$, $N$ lên một đường sức. Dù $q$ đi theo đường thẳng $MN$ hay theo đường gấp khúc, đường cong bất kì, chỉ có phần dịch chuyển dọc theo đường sức làm lực điện sinh công.",
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công của lực điện trong điện trường đều',
          text: "$$A_{MN} = qEd$$ trong đó $d = \\overline{M'N'}$ là độ dài đại số của hình chiếu của $MN$ lên một đường sức: $d > 0$ nếu $M'N'$ cùng chiều đường sức, $d < 0$ nếu ngược chiều. Đơn vị: $q$ (C), $E$ (V/m), $d$ (m), $A$ (J).",
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Đặc điểm',
          text: 'Công của lực điện trong sự dịch chuyển của điện tích trong điện trường đều không phụ thuộc vào hình dạng đường đi mà chỉ phụ thuộc vào vị trí điểm đầu và điểm cuối của đường đi. Kết quả này đúng cho mọi điện trường tĩnh: lực điện là lực thế.',
        },
        {
          type: 'list',
          items: [
            'Dịch chuyển vuông góc với đường sức: $d = 0$, lực điện không sinh công.',
            'Đường đi khép kín (điểm cuối trùng điểm đầu): $A = 0$.',
            '$A > 0$ khi lực điện “giúp” chuyển động (ví dụ $q > 0$ đi xuôi đường sức); $A < 0$ khi lực điện cản chuyển động.',
          ],
        },
      ],
    },
    {
      heading: 'Thế năng của điện tích trong điện trường',
      blocks: [
        {
          type: 'p',
          text: 'Giống thế năng trọng trường, điện tích đặt trong điện trường có một dạng năng lượng gọi là thế năng điện, đặc trưng cho khả năng sinh công của điện trường khi đặt điện tích tại điểm đó.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Thế năng điện trong điện trường đều',
          text: 'Chọn mốc thế năng tại bản âm. Thế năng của điện tích $q$ tại điểm $M$ bằng công của lực điện khi $q$ dịch chuyển từ $M$ tới bản âm: $$W_M = qEd,$$ với $d$ là khoảng cách từ $M$ tới bản âm.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Thế năng điện trong điện trường bất kì',
          text: 'Chọn mốc thế năng ở vô cực (ở đó điện trường bằng không). Thế năng của $q$ tại $M$ bằng công của lực điện khi $q$ dịch chuyển từ $M$ ra vô cực: $W_M = A_{M\\infty}$. Vì lực điện tỉ lệ với $q$ nên $W_M$ cũng tỉ lệ với $q$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công và độ giảm thế năng',
          text: '$$A_{MN} = W_M - W_N.$$ Công của lực điện bằng độ giảm thế năng của điện tích: lực điện sinh công dương thì thế năng giảm, sinh công âm thì thế năng tăng.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Thế năng có thể âm: một điện tích âm đặt trong điện trường đều (mốc ở bản âm) có $W = qEd < 0$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Ba đường từ M tới N',
    instruction:
      'Kéo điện tích từ $M$ tới $N$ theo một đường tuỳ ý, hoặc bấm một đường có sẵn. So sánh quãng đường và công của lực điện trong bảng. Đổi dấu điện tích và thử lại.',
  },
  examples: [
    {
      problem:
        'Điện tích $q = 2\\,\\mu\\text{C}$ dịch chuyển trong điện trường đều $E = 1\\,000$ V/m từ $M$ tới $N$. Hình chiếu của $MN$ lên một đường sức có độ dài $4$ cm và cùng chiều đường sức. Tính công của lực điện. Nếu $q$ đi từ $M$ tới $N$ theo một đường cong dài $20$ cm thì công bằng bao nhiêu?',
      steps: [
        '$d = +4$ cm $= 0{,}04$ m (cùng chiều đường sức).',
        '$A_{MN} = qEd = 2 \\cdot 10^{-6} \\cdot 1\\,000 \\cdot 0{,}04 = 8 \\cdot 10^{-5}$ J $= 80\\,\\mu\\text{J}$.',
        'Công của lực điện không phụ thuộc hình dạng đường đi nên theo đường cong công vẫn là $80\\,\\mu\\text{J}$.',
      ],
      answer: '$A_{MN} = 8 \\cdot 10^{-5}$ J theo mọi đường đi từ $M$ tới $N$.',
    },
    {
      problem:
        'Hai bản phẳng song song tạo ra điện trường đều $E = 1\\,000$ V/m, cách nhau $2$ cm. Một electron đi từ bản âm sang bản dương. Tính công của lực điện. Thế năng của electron tăng hay giảm?',
      steps: [
        'Đường sức hướng từ bản dương sang bản âm; electron đi ngược chiều đường sức nên $d = -0{,}02$ m.',
        '$A = qEd = (-1{,}6 \\cdot 10^{-19}) \\cdot 1\\,000 \\cdot (-0{,}02) = 3{,}2 \\cdot 10^{-18}$ J.',
        '$A > 0$ nên $W_{\\text{đầu}} - W_{\\text{cuối}} > 0$: thế năng của electron giảm (lực điện kéo electron về bản dương).',
      ],
      answer:
        '$A = 3{,}2 \\cdot 10^{-18}$ J; thế năng của electron giảm $3{,}2 \\cdot 10^{-18}$ J.',
    },
    {
      problem:
        'Trong điện trường đều $E = 5\\,000$ V/m giữa hai bản phẳng, điểm $M$ cách bản âm $2$ cm. Tính thế năng của một proton đặt tại $M$ (mốc thế năng ở bản âm).',
      steps: [
        '$W_M = qEd$ với $q = 1{,}6 \\cdot 10^{-19}$ C, $d = 0{,}02$ m.',
        '$W_M = 1{,}6 \\cdot 10^{-19} \\cdot 5\\,000 \\cdot 0{,}02 = 1{,}6 \\cdot 10^{-17}$ J.',
      ],
      answer: '$W_M = 1{,}6 \\cdot 10^{-17}$ J.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Công của lực điện làm điện tích dịch chuyển trong điện trường đều',
      options: [
        'chỉ phụ thuộc vị trí điểm đầu và điểm cuối của đường đi',
        'tỉ lệ với chiều dài đường đi',
        'phụ thuộc hình dạng đường đi',
        'luôn dương',
      ],
      answer: 0,
      hints: ['Lực điện trong điện trường đều giống trọng lực: là lực thế.'],
      solution:
        'Công $A = qEd$ chỉ phụ thuộc hình chiếu $d$ của $MN$ lên đường sức, tức chỉ phụ thuộc điểm đầu và điểm cuối, không phụ thuộc hình dạng đường đi.',
    },
    {
      type: 'number',
      prompt:
        'Điện tích $q = 5 \\cdot 10^{-6}$ C dịch chuyển $5$ cm dọc theo chiều một đường sức của điện trường đều $E = 2\\,000$ V/m. Tính công của lực điện (theo mJ).',
      answer: 0.5,
      unit: 'mJ',
      tolerance: 0.001,
      hints: ['$d = +0{,}05$ m; dùng $A = qEd$, rồi đổi J sang mJ.'],
      solution:
        '$A = 5 \\cdot 10^{-6} \\cdot 2\\,000 \\cdot 0{,}05 = 5 \\cdot 10^{-4}$ J $= 0{,}5$ mJ.',
    },
    {
      type: 'number',
      prompt:
        'Điện tích $q = 4\\,\\mu\\text{C}$ đi được đoạn thẳng $MN = 10$ cm trong điện trường đều $E = 1\\,000$ V/m; $MN$ hợp với chiều đường sức góc $60^\\circ$. Tính công của lực điện (theo µJ).',
      answer: 200,
      unit: 'µJ',
      tolerance: 0.01,
      hints: [
        'Hình chiếu của $MN$ lên đường sức: $d = MN\\cos 60^\\circ$.',
        'Đổi $d$ ra mét rồi tính $A = qEd$.',
      ],
      solution:
        '$d = 10 \\cdot \\cos 60^\\circ = 5$ cm $= 0{,}05$ m; $A = 4 \\cdot 10^{-6} \\cdot 1\\,000 \\cdot 0{,}05 = 2 \\cdot 10^{-4}$ J $= 200\\,\\mu\\text{J}$.',
    },
    {
      type: 'number',
      prompt:
        'Một điện tích dịch chuyển $8$ cm theo phương vuông góc với các đường sức của một điện trường đều. Công của lực điện bằng bao nhiêu (theo J)?',
      answer: 0,
      unit: 'J',
      hints: ['Hình chiếu của đoạn dịch chuyển lên đường sức dài bao nhiêu?'],
      solution: 'Dịch chuyển vuông góc với đường sức nên $d = 0$, do đó $A = qEd = 0$.',
    },
    {
      type: 'choice',
      prompt:
        'Một điện tích chuyển động trong điện trường theo một đường cong kín rồi trở về điểm xuất phát. Công của lực điện',
      options: [
        'bằng $0$',
        'dương nếu điện tích dương',
        'tỉ lệ với chu vi đường cong',
        'âm nếu điện tích âm',
      ],
      answer: 0,
      hints: ['Điểm đầu và điểm cuối trùng nhau.'],
      solution:
        'Công chỉ phụ thuộc điểm đầu và điểm cuối; hai điểm trùng nhau nên $A = W_M - W_M = 0$.',
    },
    {
      type: 'choice',
      prompt:
        'Một điện tích dương dịch chuyển ngược chiều đường sức của điện trường đều. Phát biểu nào đúng?',
      options: [
        'Lực điện sinh công âm, thế năng của điện tích tăng',
        'Lực điện sinh công dương, thế năng của điện tích tăng',
        'Lực điện sinh công dương, thế năng của điện tích giảm',
        'Lực điện không sinh công',
      ],
      answer: 0,
      hints: ['Xét dấu của $d$, rồi dùng $A_{MN} = W_M - W_N$.'],
      solution:
        'Đi ngược chiều đường sức nên $d < 0$, $A = qEd < 0$. Từ $A_{MN} = W_M - W_N < 0$ suy ra $W_N > W_M$: thế năng tăng.',
    },
    {
      type: 'number',
      prompt:
        'Thế năng của điện tích $q$ tại $M$ là $5\\,\\mu\\text{J}$. Lực điện sinh công $3\\,\\mu\\text{J}$ khi $q$ đi từ $M$ tới $N$. Tính thế năng của $q$ tại $N$ (theo µJ).',
      answer: 2,
      unit: 'µJ',
      tolerance: 0.001,
      hints: ['$A_{MN} = W_M - W_N$.'],
      solution: '$W_N = W_M - A_{MN} = 5 - 3 = 2\\,\\mu\\text{J}$.',
    },
    {
      type: 'number',
      prompt:
        'Điện tích $q = 3\\,\\mu\\text{C}$ nằm trong điện trường đều $E = 4\\,000$ V/m giữa hai bản phẳng, cách bản âm $5$ cm. Chọn mốc thế năng ở bản âm. Tính thế năng của $q$ (theo mJ).',
      answer: 0.6,
      unit: 'mJ',
      tolerance: 0.001,
      hints: ['$W = qEd$ với $d$ là khoảng cách tới bản âm, tính bằng mét.'],
      solution:
        '$W = 3 \\cdot 10^{-6} \\cdot 4\\,000 \\cdot 0{,}05 = 6 \\cdot 10^{-4}$ J $= 0{,}6$ mJ.',
    },
    {
      type: 'number',
      prompt:
        'Electron đi $1$ cm dọc theo chiều một đường sức của điện trường đều $E = 1\\,000$ V/m. Công của lực điện viết dưới dạng $x \\cdot 10^{-18}$ J; nhập $x$ (có thể âm).',
      answer: -1.6,
      tolerance: 0.001,
      hints: ['Electron có $q = -1{,}6 \\cdot 10^{-19}$ C; đi cùng chiều đường sức nên $d > 0$.'],
      solution:
        '$A = qEd = (-1{,}6 \\cdot 10^{-19}) \\cdot 1\\,000 \\cdot 0{,}01 = -1{,}6 \\cdot 10^{-18}$ J: lực điện cản chuyển động của electron.',
    },
  ],
  takeaways: [
    'Trong điện trường đều: $A_{MN} = qEd$, $d$ là độ dài đại số hình chiếu của $MN$ lên đường sức.',
    'Công của lực điện không phụ thuộc hình dạng đường đi, chỉ phụ thuộc điểm đầu và điểm cuối; trên đường kín công bằng $0$.',
    'Thế năng điện: $W_M = qEd$ (mốc ở bản âm) hoặc $W_M = A_{M\\infty}$ (mốc ở vô cực).',
    '$A_{MN} = W_M - W_N$: lực điện sinh công dương thì thế năng giảm.',
  ],
};
