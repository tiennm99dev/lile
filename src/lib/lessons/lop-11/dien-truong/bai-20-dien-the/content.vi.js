/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Điện thế tại một điểm M đặc trưng cho điện trường tại đó về thế năng: V_M = W_M/q = A_M∞/q, đơn vị vôn (V). Hiệu điện thế giữa hai điểm U_MN = V_M − V_N = A_MN/q; trong điện trường đều E = U/d. Các điểm có cùng điện thế tạo thành mặt đẳng thế, luôn vuông góc với đường sức, và lực điện không sinh công khi điện tích di chuyển trên mặt đó.',
  intro:
    'Trên vỏ pin ghi 1,5 V, ổ điện trong nhà là 220 V, còn một đám mây giông có thể chênh với mặt đất hàng trăm triệu vôn. Con số “vôn” ấy đo cái gì? Nó cho biết điện trường có thể sinh bao nhiêu công trên mỗi culông điện tích đi qua.',
  objectives: [
    'Định nghĩa được điện thế tại một điểm $V_M = \\dfrac{A_{M\\infty}}{q}$ và nêu được đơn vị vôn.',
    'Định nghĩa được hiệu điện thế $U_{MN} = V_M - V_N = \\dfrac{A_{MN}}{q}$ và vận dụng để tính công của lực điện.',
    'Vận dụng được mối liên hệ $E = \\dfrac{U}{d}$ trong điện trường đều.',
    'Nêu được khái niệm mặt đẳng thế và quan hệ giữa mặt đẳng thế với đường sức.',
  ],
  sections: [
    {
      heading: 'Điện thế tại một điểm',
      blocks: [
        {
          type: 'p',
          text: 'Ở bài trước, thế năng của điện tích $q$ tại $M$ là $W_M = A_{M\\infty}$ và tỉ lệ với $q$. Vì vậy thương số $\\dfrac{W_M}{q}$ không phụ thuộc điện tích thử mà chỉ phụ thuộc điện trường và vị trí điểm $M$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Điện thế',
          text: 'Điện thế tại một điểm $M$ trong điện trường là đại lượng đặc trưng cho điện trường tại điểm đó về thế năng, đo bằng thương số của công lực điện làm dịch chuyển điện tích $q$ từ $M$ ra vô cực và điện tích $q$: $$V_M = \\dfrac{W_M}{q} = \\dfrac{A_{M\\infty}}{q}.$$ Đơn vị của điện thế là vôn (V): $1\\ \\text{V} = 1\\ \\text{J/C}$.',
        },
        {
          type: 'list',
          items: [
            'Điện thế là đại lượng đại số (có thể dương, âm hoặc bằng $0$); điện thế ở vô cực (và thường là của mặt đất) được chọn bằng $0$.',
            'Biết điện thế, tính được thế năng của mọi điện tích đặt tại đó: $W_M = qV_M$.',
            'Điện thế do điện tích điểm $Q$ gây ra tại điểm cách nó $r$ là $V = k\\dfrac{Q}{\\varepsilon r}$: dương quanh điện tích dương, âm quanh điện tích âm. Điện thế do nhiều điện tích gây ra bằng tổng đại số các điện thế.',
          ],
        },
      ],
    },
    {
      heading: 'Hiệu điện thế',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hiệu điện thế',
          text: 'Hiệu điện thế giữa hai điểm $M$, $N$ là hiệu giữa điện thế tại $M$ và điện thế tại $N$: $$U_{MN} = V_M - V_N = \\dfrac{A_{MN}}{q}.$$ Hiệu điện thế đặc trưng cho khả năng sinh công của điện trường khi điện tích dịch chuyển từ $M$ đến $N$. Đơn vị: vôn (V).',
        },
        {
          type: 'p',
          text: 'Từ đó công của lực điện: $A_{MN} = qU_{MN}$. Chú ý $U_{NM} = -U_{MN}$. Hiệu điện thế đo được bằng vôn kế; điện thế tại một điểm chỉ có nghĩa khi đã chọn mốc.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Liên hệ giữa cường độ điện trường và hiệu điện thế',
          text: 'Trong điện trường đều, với $M$, $N$ nằm trên cùng một đường sức và $d = \\overline{MN}$ là độ dài đại số theo chiều đường sức: $$E = \\dfrac{U_{MN}}{d}.$$ Cường độ điện trường hướng từ nơi có điện thế cao về nơi có điện thế thấp.',
        },
      ],
    },
    {
      heading: 'Mặt đẳng thế',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Mặt đẳng thế',
          text: 'Mặt đẳng thế là tập hợp các điểm trong điện trường có cùng điện thế. Trên hình vẽ phẳng, giao của mặt đẳng thế với mặt phẳng hình vẽ là một đường đẳng thế.',
        },
        {
          type: 'list',
          items: [
            'Điện tích di chuyển trên một mặt đẳng thế thì $U = 0$ nên lực điện không sinh công.',
            'Mặt đẳng thế luôn vuông góc với các đường sức; vectơ $\\vec E$ hướng về phía các mặt đẳng thế có điện thế thấp hơn.',
            'Điện trường của một điện tích điểm có mặt đẳng thế là các mặt cầu đồng tâm; điện trường đều có mặt đẳng thế là các mặt phẳng vuông góc với đường sức.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bản đồ điện thế',
    instruction:
      'Kéo các điện tích và hai điểm $M$, $N$, đọc điện thế. Bấm “Vẽ đường đẳng thế qua M” ở vài vị trí, rồi kéo $N$ dọc theo một đường đẳng thế: $U_{MN}$ bằng bao nhiêu?',
  },
  examples: [
    {
      problem:
        "Điện tích $q = 2 \\cdot 10^{-6}$ C dịch chuyển từ điểm $M$ ra vô cực, lực điện sinh công $4 \\cdot 10^{-4}$ J. Tính điện thế tại $M$ và thế năng của một điện tích $q' = -3 \\cdot 10^{-6}$ C đặt tại $M$.",
      steps: [
        '$V_M = \\dfrac{A_{M\\infty}}{q} = \\dfrac{4 \\cdot 10^{-4}}{2 \\cdot 10^{-6}} = 200$ V.',
        "$W'_M = q'V_M = -3 \\cdot 10^{-6} \\cdot 200 = -6 \\cdot 10^{-4}$ J.",
      ],
      answer: "$V_M = 200$ V; $W'_M = -6 \\cdot 10^{-4}$ J.",
    },
    {
      problem:
        'Hiệu điện thế giữa hai điểm $M$ và $N$ là $U_{MN} = 50$ V. Tính công của lực điện khi một electron dịch chuyển từ $M$ đến $N$ và khi dịch chuyển từ $N$ về $M$.',
      steps: [
        '$A_{MN} = qU_{MN} = -1{,}6 \\cdot 10^{-19} \\cdot 50 = -8 \\cdot 10^{-18}$ J.',
        '$U_{NM} = -U_{MN} = -50$ V nên $A_{NM} = qU_{NM} = 8 \\cdot 10^{-18}$ J.',
      ],
      answer: '$A_{MN} = -8 \\cdot 10^{-18}$ J; $A_{NM} = 8 \\cdot 10^{-18}$ J.',
    },
    {
      problem:
        'Điện tích điểm $Q = 1$ nC đặt trong không khí. Điểm $M$ cách $Q$ $3$ cm, điểm $N$ cách $Q$ $9$ cm. Tính $V_M$, $V_N$, $U_{MN}$ và công của lực điện khi đưa $q = 2$ nC từ $M$ tới $N$.',
      steps: [
        '$V_M = k\\dfrac{Q}{r_M} = 9 \\cdot 10^9 \\cdot \\dfrac{10^{-9}}{0{,}03} = 300$ V; $V_N = 9 \\cdot 10^9 \\cdot \\dfrac{10^{-9}}{0{,}09} = 100$ V.',
        '$U_{MN} = V_M - V_N = 200$ V.',
        '$A_{MN} = qU_{MN} = 2 \\cdot 10^{-9} \\cdot 200 = 4 \\cdot 10^{-7}$ J.',
      ],
      answer: '$V_M = 300$ V, $V_N = 100$ V, $U_{MN} = 200$ V, $A_{MN} = 4 \\cdot 10^{-7}$ J.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Điện thế tại một điểm trong điện trường đặc trưng cho điện trường tại điểm đó về',
      options: ['thế năng', 'tác dụng lực', 'tốc độ của điện tích', 'số đường sức đi qua'],
      answer: 0,
      hints: ['Nhớ định nghĩa $V_M = \\dfrac{W_M}{q}$.'],
      solution:
        'Điện thế $V_M = \\dfrac{W_M}{q}$ đặc trưng cho điện trường về thế năng; cường độ điện trường mới đặc trưng về tác dụng lực.',
    },
    {
      type: 'number',
      prompt:
        'Lực điện sinh công $2 \\cdot 10^{-6}$ J khi điện tích $q = 5 \\cdot 10^{-9}$ C dịch chuyển từ điểm $M$ ra vô cực. Tính điện thế tại $M$ (theo V).',
      answer: 400,
      unit: 'V',
      tolerance: 0.01,
      hints: ['$V_M = \\dfrac{A_{M\\infty}}{q}$.'],
      solution: '$V_M = \\dfrac{2 \\cdot 10^{-6}}{5 \\cdot 10^{-9}} = 400$ V.',
    },
    {
      type: 'number',
      prompt: 'Điện thế tại $M$ là $120$ V, tại $N$ là $-30$ V. Tính $U_{MN}$ (theo V).',
      answer: 150,
      unit: 'V',
      tolerance: 0.01,
      hints: ['$U_{MN} = V_M - V_N$; chú ý dấu của $V_N$.'],
      solution: '$U_{MN} = 120 - (-30) = 150$ V.',
    },
    {
      type: 'number',
      prompt:
        'Hiệu điện thế $U_{MN} = 150$ V. Tính công của lực điện khi điện tích $q = -2\\,\\mu\\text{C}$ dịch chuyển từ $M$ đến $N$ (theo mJ, có thể âm).',
      answer: -0.3,
      unit: 'mJ',
      tolerance: 0.001,
      hints: ['$A_{MN} = qU_{MN}$; đổi J sang mJ.'],
      solution: '$A_{MN} = -2 \\cdot 10^{-6} \\cdot 150 = -3 \\cdot 10^{-4}$ J $= -0{,}3$ mJ.',
    },
    {
      type: 'number',
      prompt:
        'Hai bản phẳng song song cách nhau $3$ mm, hiệu điện thế giữa hai bản là $60$ V. Tính cường độ điện trường giữa hai bản (theo kV/m).',
      answer: 20,
      unit: 'kV/m',
      tolerance: 0.01,
      hints: ['$E = \\dfrac{U}{d}$ với $d = 3 \\cdot 10^{-3}$ m.'],
      solution: '$E = \\dfrac{60}{3 \\cdot 10^{-3}} = 2 \\cdot 10^4$ V/m $= 20$ kV/m.',
    },
    {
      type: 'choice',
      prompt: 'Phát biểu nào về mặt đẳng thế là đúng?',
      options: [
        'Mặt đẳng thế luôn vuông góc với các đường sức điện',
        'Mặt đẳng thế luôn song song với các đường sức điện',
        'Lực điện sinh công lớn nhất khi điện tích di chuyển trên mặt đẳng thế',
        'Hai mặt đẳng thế khác nhau có thể cắt nhau',
      ],
      answer: 0,
      hints: ['Di chuyển trên mặt đẳng thế thì $U = 0$, vậy lực điện phải vuông góc với đường đi.'],
      solution:
        'Trên mặt đẳng thế $U = 0$ nên $A = 0$: lực điện (theo đường sức) vuông góc với mọi dịch chuyển trên mặt, tức mặt đẳng thế vuông góc với đường sức. Mỗi điểm chỉ có một điện thế nên hai mặt đẳng thế khác nhau không cắt nhau.',
    },
    {
      type: 'number',
      prompt:
        'Điện tích điểm $Q = 2$ nC đặt trong không khí. Tính điện thế tại điểm cách $Q$ một đoạn $6$ cm (theo V).',
      answer: 300,
      unit: 'V',
      tolerance: 0.01,
      hints: ['$V = k\\dfrac{Q}{r}$ với $r = 0{,}06$ m.'],
      solution:
        '$V = 9 \\cdot 10^9 \\cdot \\dfrac{2 \\cdot 10^{-9}}{0{,}06} = \\dfrac{18}{0{,}06} = 300$ V.',
    },
    {
      type: 'number',
      prompt:
        'Một electron bắt đầu chuyển động từ trạng thái nghỉ, được tăng tốc qua hiệu điện thế $200$ V. Tính tốc độ cuối của electron, viết dưới dạng $x \\cdot 10^6$ m/s; nhập $x$ (làm tròn đến hàng phần trăm). Cho $e = 1{,}6 \\cdot 10^{-19}$ C, $m = 9{,}1 \\cdot 10^{-31}$ kg.',
      answer: 8.39,
      tolerance: 0.006,
      hints: [
        'Công của lực điện $A = eU$ biến thành động năng của electron.',
        '$\\dfrac{mv^2}{2} = eU$ nên $v = \\sqrt{\\dfrac{2eU}{m}}$.',
      ],
      solution:
        '$v = \\sqrt{\\dfrac{2 \\cdot 1{,}6 \\cdot 10^{-19} \\cdot 200}{9{,}1 \\cdot 10^{-31}}} = \\sqrt{7{,}03 \\cdot 10^{13}} \\approx 8{,}39 \\cdot 10^6$ m/s.',
    },
    {
      type: 'choice',
      prompt: 'Biết $U_{MN} = 12$ V. Khẳng định nào chắc chắn đúng?',
      options: ['$V_M - V_N = 12$ V', '$V_M = 12$ V', '$V_N = 12$ V', '$U_{NM} = 12$ V'],
      answer: 0,
      hints: ['Hiệu điện thế chỉ cho biết hiệu của hai điện thế, không cho biết từng điện thế.'],
      solution:
        '$U_{MN} = V_M - V_N = 12$ V; từng điện thế còn phụ thuộc cách chọn mốc, và $U_{NM} = -12$ V.',
    },
  ],
  takeaways: [
    'Điện thế $V_M = \\dfrac{W_M}{q} = \\dfrac{A_{M\\infty}}{q}$, đơn vị vôn; thế năng $W_M = qV_M$.',
    'Hiệu điện thế $U_{MN} = V_M - V_N = \\dfrac{A_{MN}}{q}$, nên $A_{MN} = qU_{MN}$.',
    'Trong điện trường đều $E = \\dfrac{U}{d}$; $\\vec E$ hướng từ nơi điện thế cao về nơi điện thế thấp.',
    'Mặt đẳng thế gồm các điểm cùng điện thế, vuông góc với đường sức; di chuyển trên đó lực điện không sinh công.',
  ],
};
