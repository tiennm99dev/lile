/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phương trình trạng thái của khí lí tưởng: với một khối lượng khí xác định, pV/T = hằng số, hay p1V1/T1 = p2V2/T2; các định luật Boyle, Charles và quá trình đẳng tích là các trường hợp riêng. Với n mol khí, pV = nRT (phương trình Clapeyron), R = 8,31 J/(mol.K).',
  intro:
    'Một quả bóng thám không được bơm khí ở mặt đất rồi thả lên cao. Càng lên cao, áp suất khí quyển càng giảm và nhiệt độ cũng giảm. Cả ba đại lượng $p$, $V$, $T$ của khí trong bóng cùng thay đổi, không còn đại lượng nào giữ không đổi. Làm sao tính được thể tích của bóng ở độ cao đó?',
  objectives: [
    'Từ định luật Boyle và định luật Charles, rút ra được phương trình trạng thái $\\dfrac{pV}{T} = $ hằng số.',
    'Nêu được quá trình đẳng tích và hệ thức $\\dfrac{p}{T} = $ hằng số.',
    'Viết và vận dụng được phương trình Clapeyron $pV = nRT$, với $R = 8{,}31$ J/(mol.K).',
  ],
  sections: [
    {
      heading: 'Phương trình trạng thái của khí lí tưởng',
      blocks: [
        {
          type: 'p',
          text: "Xét một khối lượng khí chuyển từ trạng thái 1 $(p_1, V_1, T_1)$ sang trạng thái 2 $(p_2, V_2, T_2)$. Ta có thể cho khí đi qua một trạng thái trung gian 1′ $(p_2, V', T_1)$: trước hết nén đẳng nhiệt ở $T_1$ đến áp suất $p_2$, sau đó đun nóng đẳng áp ở $p_2$ đến $T_2$.",
        },
        {
          type: 'list',
          ordered: true,
          items: [
            "Đẳng nhiệt 1 → 1′ (định luật Boyle): $p_1V_1 = p_2V'$, nên $V' = \\dfrac{p_1V_1}{p_2}$.",
            "Đẳng áp 1′ → 2 (định luật Charles): $\\dfrac{V'}{T_1} = \\dfrac{V_2}{T_2}$, nên $V' = \\dfrac{V_2T_1}{T_2}$.",
            "Cho hai biểu thức của $V'$ bằng nhau: $\\dfrac{p_1V_1}{p_2} = \\dfrac{V_2T_1}{T_2}$, tức $\\dfrac{p_1V_1}{T_1} = \\dfrac{p_2V_2}{T_2}$.",
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Phương trình trạng thái của khí lí tưởng',
          text: 'Với một khối lượng khí xác định: $$\\frac{pV}{T} = \\text{hằng số} \\quad \\text{hay} \\quad \\frac{p_1V_1}{T_1} = \\frac{p_2V_2}{T_2}.$$',
        },
        {
          type: 'p',
          text: 'Phương trình này liên hệ cả ba thông số trạng thái nên được gọi là phương trình trạng thái. Nó đúng cho khí lí tưởng (và gần đúng cho khí thực ở điều kiện thường), vì được rút ra từ các định luật của khí lí tưởng.',
        },
      ],
    },
    {
      heading: 'Quá trình đẳng tích',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Quá trình đẳng tích',
          text: 'Quá trình biến đổi trạng thái của một khối lượng khí xác định trong đó thể tích được giữ không đổi gọi là quá trình đẳng tích.',
        },
        {
          type: 'p',
          text: 'Cho $V_1 = V_2$ trong phương trình trạng thái, ta được: $$\\frac{p}{T} = \\text{hằng số} \\quad \\text{hay} \\quad \\frac{p_1}{T_1} = \\frac{p_2}{T_2}.$$ Khi thể tích không đổi, áp suất của khí tỉ lệ thuận với nhiệt độ tuyệt đối. Trong hệ toạ độ $(p, T)$, đường đẳng tích là đường thẳng mà nếu kéo dài sẽ đi qua gốc toạ độ.',
        },
        {
          type: 'table',
          head: ['Quá trình', 'Thông số không đổi', 'Hệ thức', 'Đường biểu diễn'],
          rows: [
            ['Đẳng nhiệt', '$T$', '$pV = $ hằng số', 'Hypebol trong hệ $(p, V)$'],
            [
              'Đẳng áp',
              '$p$',
              '$\\dfrac{V}{T} = $ hằng số',
              'Đường thẳng qua gốc trong hệ $(V, T)$',
            ],
            [
              'Đẳng tích',
              '$V$',
              '$\\dfrac{p}{T} = $ hằng số',
              'Đường thẳng qua gốc trong hệ $(p, T)$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ứng dụng',
          text: 'Không để bình xịt, bình ga mini hay lốp xe dưới nắng gắt hoặc gần lửa: thể tích bình gần như không đổi, nhiệt độ tăng làm áp suất khí bên trong tăng theo và có thể làm nổ bình.',
        },
      ],
    },
    {
      heading: 'Phương trình Clapeyron',
      blocks: [
        {
          type: 'p',
          text: 'Hằng số trong $\\dfrac{pV}{T} = $ hằng số tỉ lệ với lượng khí. Ở điều kiện tiêu chuẩn ($0$ °C, $1{,}013 \\cdot 10^5$ Pa), $1$ mol khí bất kì chiếm thể tích $22{,}4$ lít, nên với $n$ mol khí: $$\\frac{pV}{T} = n\\cdot\\frac{1{,}013 \\cdot 10^5 \\cdot 22{,}4 \\cdot 10^{-3}}{273} \\approx n \\cdot 8{,}31 \\text{ J/K}.$$',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Phương trình Clapeyron',
          text: 'Với $n$ mol khí lí tưởng: $$pV = nRT,$$ trong đó $R = 8{,}31$ J/(mol.K) là hằng số khí lí tưởng, $p$ tính bằng Pa, $V$ bằng m³, $T$ bằng K.',
        },
        {
          type: 'p',
          text: 'Số mol: $n = \\dfrac{m}{M} = \\dfrac{N}{N_A}$, với $m$ là khối lượng khí, $M$ là khối lượng mol, $N$ là số phân tử và $N_A = 6{,}02 \\cdot 10^{23}$ mol⁻¹ là số Avogadro. Thay vào: $pV = \\dfrac{m}{M}RT$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đơn vị',
          text: 'Trong $pV = nRT$ với $R = 8{,}31$ J/(mol.K), phải dùng đơn vị SI: $p$ (Pa), $V$ (m³; $1$ lít $= 10^{-3}$ m³), $T$ (K). Còn khi dùng $\\dfrac{p_1V_1}{T_1} = \\dfrac{p_2V_2}{T_2}$, chỉ cần $p$ và $V$ ở hai vế cùng đơn vị, nhưng $T$ luôn phải là nhiệt độ tuyệt đối.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng điều khiển p, V, T',
    instruction:
      'Chọn thông số giữ không đổi, rồi kéo thanh trượt để thay đổi một thông số khác. Quan sát thông số thứ ba và đường biểu diễn quá trình. So sánh $\\dfrac{pV}{T}$ ở trạng thái 1 và trạng thái 2 với $nR$. Bấm "Lấy trạng thái hiện tại làm trạng thái 1" để nối nhiều quá trình liên tiếp.',
  },
  examples: [
    {
      problem:
        'Một lượng khí ở $27$ °C có áp suất $1$ atm và thể tích $6$ lít. Nén khí đến thể tích $2$ lít thì áp suất là $3{,}5$ atm. Tính nhiệt độ của khí lúc đó.',
      steps: [
        'Trạng thái 1: $p_1 = 1$ atm, $V_1 = 6$ lít, $T_1 = 27 + 273 = 300$ K. Trạng thái 2: $p_2 = 3{,}5$ atm, $V_2 = 2$ lít, $T_2 = ?$',
        'Phương trình trạng thái: $\\dfrac{p_1V_1}{T_1} = \\dfrac{p_2V_2}{T_2}$, nên $T_2 = T_1 \\cdot \\dfrac{p_2V_2}{p_1V_1}$.',
        '$T_2 = 300 \\cdot \\dfrac{3{,}5 \\cdot 2}{1 \\cdot 6} = 350$ K, tức $t_2 = 350 - 273 = 77$ °C.',
      ],
      answer: '$T_2 = 350$ K ($77$ °C).',
    },
    {
      problem:
        'Một phòng học có kích thước $5$ m × $4$ m × $3$ m. Không khí trong phòng ở $27$ °C và áp suất $1{,}0 \\cdot 10^5$ Pa. Tính khối lượng không khí trong phòng, biết khối lượng mol của không khí là $29$ g/mol.',
      steps: [
        'Thể tích phòng: $V = 5 \\cdot 4 \\cdot 3 = 60$ m³; $T = 300$ K.',
        'Phương trình Clapeyron: $n = \\dfrac{pV}{RT} = \\dfrac{1{,}0 \\cdot 10^5 \\cdot 60}{8{,}31 \\cdot 300} \\approx 2\\,407$ mol.',
        'Khối lượng: $m = nM \\approx 2\\,407 \\cdot 29 \\approx 69\\,800$ g.',
      ],
      answer: 'Khoảng $70$ kg không khí.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Một lượng khí ở $27$ °C có áp suất $2$ atm và thể tích $15$ lít. Nén khí đến thể tích $10$ lít đồng thời nhiệt độ tăng lên $127$ °C. Áp suất của khí lúc sau là bao nhiêu atm?',
      answer: 4,
      unit: 'atm',
      hints: [
        'Đổi nhiệt độ sang kelvin: $300$ K và $400$ K.',
        '$p_2 = p_1 \\cdot \\dfrac{V_1}{V_2} \\cdot \\dfrac{T_2}{T_1}$.',
      ],
      solution: '$p_2 = 2 \\cdot \\dfrac{15}{10} \\cdot \\dfrac{400}{300} = 4$ atm.',
    },
    {
      type: 'number',
      prompt:
        'Khí trong một bình kín có áp suất $2$ atm ở $27$ °C. Để bình ngoài nắng, nhiệt độ khí tăng lên $57$ °C. Coi thể tích bình không đổi. Áp suất khí trong bình lúc đó là bao nhiêu atm?',
      answer: 2.2,
      unit: 'atm',
      hints: ['Quá trình đẳng tích: $\\dfrac{p_1}{T_1} = \\dfrac{p_2}{T_2}$.'],
      solution: '$p_2 = 2 \\cdot \\dfrac{330}{300} = 2{,}2$ atm.',
    },
    {
      type: 'number',
      prompt:
        'Tính áp suất của $2$ mol khí lí tưởng ở $27$ °C chứa trong bình $50$ lít (theo kPa). Cho $R = 8{,}31$ J/(mol.K).',
      answer: 99.72,
      tolerance: 0.1,
      unit: 'kPa',
      hints: ['Đổi $V = 50$ lít $= 0{,}05$ m³, $T = 300$ K.', '$p = \\dfrac{nRT}{V}$.'],
      solution:
        '$p = \\dfrac{2 \\cdot 8{,}31 \\cdot 300}{0{,}05} = 99\\,720$ Pa $\\approx 99{,}72$ kPa.',
    },
    {
      type: 'number',
      prompt:
        'Một bình $8{,}31$ lít chứa khí ở áp suất $2 \\cdot 10^5$ Pa và nhiệt độ $27$ °C. Tính số mol khí trong bình (làm tròn đến hàng phần trăm).',
      answer: 0.67,
      tolerance: 0.01,
      unit: 'mol',
      hints: ['$n = \\dfrac{pV}{RT}$, với $V$ tính bằng m³.'],
      solution:
        '$n = \\dfrac{2 \\cdot 10^5 \\cdot 8{,}31 \\cdot 10^{-3}}{8{,}31 \\cdot 300} = \\dfrac{200}{300} \\approx 0{,}67$ mol.',
    },
    {
      type: 'number',
      prompt:
        'Một bình $15$ lít chứa khí oxygen ($M = 32$ g/mol) ở $27$ °C và áp suất $1{,}662 \\cdot 10^5$ Pa. Khối lượng oxygen trong bình là bao nhiêu gam?',
      answer: 32,
      tolerance: 0.1,
      unit: 'g',
      hints: ['Tìm số mol bằng $n = \\dfrac{pV}{RT}$.', 'Rồi $m = nM$.'],
      solution:
        '$n = \\dfrac{1{,}662 \\cdot 10^5 \\cdot 0{,}015}{8{,}31 \\cdot 300} = \\dfrac{2\\,493}{2\\,493} = 1$ mol, nên $m = 1 \\cdot 32 = 32$ g.',
    },
    {
      type: 'number',
      prompt:
        'Ở điều kiện tiêu chuẩn ($0$ °C, $1{,}013 \\cdot 10^5$ Pa), $1$ mol khí lí tưởng chiếm thể tích bao nhiêu lít? Cho $R = 8{,}31$ J/(mol.K).',
      answer: 22.4,
      tolerance: 0.1,
      unit: 'lít',
      hints: ['$V = \\dfrac{nRT}{p}$ với $T = 273$ K; kết quả ra m³, đổi sang lít.'],
      solution:
        '$V = \\dfrac{1 \\cdot 8{,}31 \\cdot 273}{1{,}013 \\cdot 10^5} \\approx 0{,}0224$ m³ $= 22{,}4$ lít.',
    },
    {
      type: 'number',
      prompt:
        'Trong xi lanh của một động cơ, không khí lúc đầu ở $27$ °C, $1$ atm, thể tích $20$ lít bị nén còn $4$ lít và áp suất tăng lên $15$ atm. Nhiệt độ của khí sau khi nén là bao nhiêu độ C?',
      answer: 627,
      unit: '°C',
      hints: ['$T_2 = T_1 \\cdot \\dfrac{p_2V_2}{p_1V_1}$.', 'Nhớ đổi kết quả từ kelvin về độ C.'],
      solution:
        '$T_2 = 300 \\cdot \\dfrac{15 \\cdot 4}{1 \\cdot 20} = 900$ K, tức $t_2 = 900 - 273 = 627$ °C.',
    },
    {
      type: 'choice',
      prompt: 'Đơn vị của hằng số khí lí tưởng $R$ trong phương trình $pV = nRT$ là',
      options: ['J/(mol.K)', 'J/K', 'mol/(J.K)', 'Pa.m³/mol'],
      answer: 0,
      hints: ['$R = \\dfrac{pV}{nT}$; tích $pV$ có đơn vị Pa.m³ = N.m = J.'],
      solution:
        '$R = \\dfrac{pV}{nT}$ có đơn vị $\\dfrac{\\text{J}}{\\text{mol.K}}$; $R = 8{,}31$ J/(mol.K).',
    },
    {
      type: 'choice',
      prompt: 'Trong hệ toạ độ $(p, T)$, đường đẳng tích của một lượng khí lí tưởng là',
      options: [
        'đường thẳng mà nếu kéo dài thì đi qua gốc toạ độ',
        'đường hypebol',
        'đường thẳng song song với trục $p$',
        'đường thẳng song song với trục $T$',
      ],
      answer: 0,
      hints: ['Khi $V$ không đổi, $p$ tỉ lệ thế nào với $T$?'],
      solution:
        '$\\dfrac{p}{T} = $ hằng số nên $p$ tỉ lệ thuận với $T$: đường thẳng kéo dài qua gốc toạ độ.',
    },
  ],
  takeaways: [
    'Phương trình trạng thái của khí lí tưởng: $\\dfrac{p_1V_1}{T_1} = \\dfrac{p_2V_2}{T_2}$ (một khối lượng khí xác định, $T$ tính bằng K).',
    'Quá trình đẳng tích: $\\dfrac{p}{T} = $ hằng số.',
    'Phương trình Clapeyron: $pV = nRT$, $R = 8{,}31$ J/(mol.K), $n = \\dfrac{m}{M} = \\dfrac{N}{N_A}$; dùng đơn vị SI.',
  ],
};
