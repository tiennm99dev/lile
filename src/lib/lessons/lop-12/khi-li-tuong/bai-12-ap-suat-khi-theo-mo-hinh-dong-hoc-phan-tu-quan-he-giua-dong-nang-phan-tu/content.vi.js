/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Theo mô hình động học phân tử, áp suất khí p = 1/3·μ·m·v̄² (μ là mật độ phân tử, m là khối lượng một phân tử, v̄² là trung bình của bình phương tốc độ), hay p = 1/3·ρ·v̄². Kết hợp với pV = nRT, động năng tịnh tiến trung bình của phân tử Ē = 3/2·kT tỉ lệ với nhiệt độ tuyệt đối, với k = R/N_A = 1,38·10⁻²³ J/K là hằng số Boltzmann.',
  intro:
    'Ở bài 8, ta giải thích định tính: áp suất khí là do vô số va chạm của phân tử lên thành bình, và nhiệt độ càng cao thì phân tử chuyển động càng nhanh. Liệu có thể tính được áp suất từ khối lượng và tốc độ của các phân tử không? Và nhiệt độ của khí thật ra cho biết điều gì về các phân tử?',
  objectives: [
    'Giải thích được sự tạo thành áp suất khí từ chuyển động của các phân tử.',
    'Nêu được công thức $p = \\dfrac{1}{3}\\mu m\\overline{v^2}$ và ý nghĩa của các đại lượng trong công thức.',
    'Rút ra được hệ thức $\\overline{E}_\\text{đ} = \\dfrac{3}{2}kT$ và nêu được ý nghĩa của hằng số Boltzmann.',
    'Vận dụng được các công thức trên để tính áp suất, động năng trung bình và tốc độ của phân tử.',
  ],
  sections: [
    {
      heading: 'Áp suất khí theo mô hình động học phân tử',
      blocks: [
        {
          type: 'p',
          text: 'Xét $N$ phân tử khí lí tưởng, mỗi phân tử khối lượng $m$, trong một bình hình lập phương cạnh $l$. Chọn trục $Ox$ vuông góc với một mặt bên $S$ của bình; một phân tử có thành phần vận tốc $v_x$ theo trục này:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Va chạm đàn hồi với mặt $S$, phân tử bật lại với $-v_x$: động lượng của nó biến thiên một lượng $2mv_x$, và nó truyền cho thành bình xung lượng $2mv_x$.',
            'Phân tử quay lại va chạm mặt $S$ sau thời gian $\\Delta t = \\dfrac{2l}{v_x}$, nên lực trung bình nó tác dụng lên mặt này là $F = \\dfrac{2mv_x}{\\Delta t} = \\dfrac{mv_x^2}{l}$.',
            'Cộng lực của $N$ phân tử và chia cho diện tích $l^2$: $p = \\dfrac{Nm\\overline{v_x^2}}{l^3}$.',
            'Chuyển động hỗn loạn nên không có hướng nào được ưu tiên: $\\overline{v_x^2} = \\overline{v_y^2} = \\overline{v_z^2} = \\dfrac{1}{3}\\overline{v^2}$. Đặt $\\mu = \\dfrac{N}{V} = \\dfrac{N}{l^3}$, ta được công thức dưới đây.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Áp suất khí',
          text: '$$p = \\frac{1}{3}\\mu m\\overline{v^2}$$ trong đó $\\mu$ là số phân tử khí trong một đơn vị thể tích (mật độ phân tử, đơn vị m⁻³), $m$ là khối lượng một phân tử (kg), $\\overline{v^2}$ là trung bình của bình phương tốc độ phân tử (m²/s²). Vì $\\mu m = \\rho$ là khối lượng riêng của khí nên cũng có thể viết $p = \\dfrac{1}{3}\\rho\\overline{v^2}$.',
        },
        {
          type: 'p',
          text: 'Gọi $\\overline{E}_\\text{đ} = \\dfrac{1}{2}m\\overline{v^2}$ là động năng tịnh tiến trung bình của một phân tử, ta có $p = \\dfrac{2}{3}\\mu\\overline{E}_\\text{đ}$: áp suất khí tỉ lệ với mật độ phân tử và với động năng trung bình của phân tử, đúng như mô hình định tính ở bài 8. Căn bậc hai $\\sqrt{\\overline{v^2}}$ cho biết độ lớn điển hình của tốc độ phân tử.',
        },
      ],
    },
    {
      heading: 'Quan hệ giữa động năng phân tử và nhiệt độ',
      blocks: [
        {
          type: 'p',
          text: 'Với $N$ phân tử trong thể tích $V$: $pV = \\dfrac{2}{3}N\\overline{E}_\\text{đ}$. Mặt khác, theo phương trình Clapeyron $pV = nRT = \\dfrac{N}{N_A}RT$. So sánh hai biểu thức: $$\\frac{2}{3}N\\overline{E}_\\text{đ} = \\frac{N}{N_A}RT \\Rightarrow \\overline{E}_\\text{đ} = \\frac{3}{2}\\cdot\\frac{R}{N_A}T.$$',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Động năng trung bình của phân tử',
          text: '$$\\overline{E}_\\text{đ} = \\frac{3}{2}kT$$ với $k = \\dfrac{R}{N_A} = \\dfrac{8{,}31}{6{,}02 \\cdot 10^{23}} \\approx 1{,}38 \\cdot 10^{-23}$ J/K là hằng số Boltzmann.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ý nghĩa',
          text: 'Động năng tịnh tiến trung bình của phân tử khí tỉ lệ thuận với nhiệt độ tuyệt đối: nhiệt độ là số đo động năng trung bình của chuyển động hỗn loạn của phân tử. Ở cùng nhiệt độ, phân tử của mọi chất khí có cùng động năng trung bình; khí có phân tử nhẹ hơn thì phân tử chuyển động nhanh hơn, vì $\\overline{v^2} = \\dfrac{3kT}{m} = \\dfrac{3RT}{M}$.',
        },
        {
          type: 'p',
          text: 'Thay $\\overline{E}_\\text{đ}$ vào công thức áp suất: $p = \\dfrac{2}{3}\\mu\\cdot\\dfrac{3}{2}kT = \\mu kT$. Ở cùng nhiệt độ và áp suất, mọi chất khí có cùng mật độ phân tử, nên cùng một thể tích chứa cùng số phân tử (định luật Avogadro).',
        },
      ],
    },
  ],
  explore: {
    title: 'Tốc độ phân tử và nhiệt độ',
    instruction:
      'Kéo thanh nhiệt độ và đổi chất khí. Quan sát phân bố tốc độ của các phân tử trong bình kín, giá trị $\\sqrt{\\overline{v^2}}$, động năng trung bình và áp suất. Ở cùng nhiệt độ, đại lượng nào giống nhau với mọi chất khí, đại lượng nào khác nhau?',
  },
  examples: [
    {
      problem:
        'Tính động năng tịnh tiến trung bình của một phân tử nitrogen ở $27$ °C và giá trị $\\sqrt{\\overline{v^2}}$ của phân tử này. Cho $k = 1{,}38 \\cdot 10^{-23}$ J/K, $R = 8{,}31$ J/(mol.K), khối lượng mol của nitrogen $M = 28$ g/mol.',
      steps: [
        '$T = 27 + 273 = 300$ K.',
        '$\\overline{E}_\\text{đ} = \\dfrac{3}{2}kT = \\dfrac{3}{2} \\cdot 1{,}38 \\cdot 10^{-23} \\cdot 300 = 6{,}21 \\cdot 10^{-21}$ J.',
        'Từ $\\dfrac{1}{2}m\\overline{v^2} = \\dfrac{3}{2}kT$ suy ra $\\overline{v^2} = \\dfrac{3kT}{m} = \\dfrac{3RT}{M}$ (vì $\\dfrac{k}{m} = \\dfrac{R}{N_A m} = \\dfrac{R}{M}$).',
        '$\\overline{v^2} = \\dfrac{3 \\cdot 8{,}31 \\cdot 300}{0{,}028} \\approx 2{,}67 \\cdot 10^5$ m²/s², nên $\\sqrt{\\overline{v^2}} \\approx 517$ m/s.',
      ],
      answer:
        '$\\overline{E}_\\text{đ} = 6{,}21 \\cdot 10^{-21}$ J; $\\sqrt{\\overline{v^2}} \\approx 517$ m/s, nhanh hơn cả tốc độ âm thanh trong không khí.',
    },
    {
      problem:
        'Một lượng khí oxygen có mật độ phân tử $\\mu = 2{,}5 \\cdot 10^{25}$ m⁻³, mỗi phân tử có khối lượng $m = 5{,}3 \\cdot 10^{-26}$ kg và $\\sqrt{\\overline{v^2}} = 480$ m/s. Tính áp suất của khí.',
      steps: [
        'Khối lượng riêng của khí: $\\rho = \\mu m = 2{,}5 \\cdot 10^{25} \\cdot 5{,}3 \\cdot 10^{-26} = 1{,}325$ kg/m³.',
        '$\\overline{v^2} = 480^2 = 230\\,400$ m²/s².',
        '$p = \\dfrac{1}{3}\\rho\\overline{v^2} = \\dfrac{1}{3} \\cdot 1{,}325 \\cdot 230\\,400 = 101\\,760$ Pa.',
      ],
      answer: '$p \\approx 1{,}02 \\cdot 10^5$ Pa, xấp xỉ áp suất khí quyển.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Theo mô hình động học phân tử, áp suất của khí lí tưởng là',
      options: [
        '$p = \\dfrac{1}{3}\\mu m\\overline{v^2}$',
        '$p = \\dfrac{1}{2}\\mu m\\overline{v^2}$',
        '$p = 3\\mu m\\overline{v^2}$',
        '$p = \\dfrac{1}{3}\\mu m\\overline{v}$',
      ],
      answer: 0,
      hints: [
        'Hệ số $\\dfrac{1}{3}$ đến từ việc chia đều $\\overline{v^2}$ cho ba phương $x$, $y$, $z$.',
      ],
      solution:
        '$p = \\dfrac{1}{3}\\mu m\\overline{v^2}$, với $\\mu$ là mật độ phân tử, $m$ khối lượng phân tử, $\\overline{v^2}$ trung bình bình phương tốc độ.',
    },
    {
      type: 'number',
      prompt:
        'Tính động năng tịnh tiến trung bình của phân tử khí ở $127$ °C (theo đơn vị $10^{-21}$ J). Cho $k = 1{,}38 \\cdot 10^{-23}$ J/K.',
      answer: 8.28,
      tolerance: 0.01,
      hints: ['$T = 400$ K.', '$\\overline{E}_\\text{đ} = \\dfrac{3}{2}kT$.'],
      solution:
        '$\\overline{E}_\\text{đ} = \\dfrac{3}{2} \\cdot 1{,}38 \\cdot 10^{-23} \\cdot 400 = 8{,}28 \\cdot 10^{-21}$ J.',
    },
    {
      type: 'number',
      prompt:
        'Khí đang ở $27$ °C. Phải nung nóng khí đến bao nhiêu độ C để động năng tịnh tiến trung bình của phân tử tăng gấp đôi?',
      answer: 327,
      unit: '°C',
      hints: [
        '$\\overline{E}_\\text{đ}$ tỉ lệ thuận với nhiệt độ tuyệt đối $T$, không phải với $t$.',
      ],
      solution:
        '$T_2 = 2T_1 = 2 \\cdot 300 = 600$ K, tức $t_2 = 600 - 273 = 327$ °C (không phải $54$ °C).',
    },
    {
      type: 'number',
      prompt:
        'Tính $\\sqrt{\\overline{v^2}}$ của phân tử oxygen ($M = 32$ g/mol) ở $27$ °C (theo m/s, làm tròn đến hàng đơn vị). Cho $R = 8{,}31$ J/(mol.K).',
      answer: 483,
      tolerance: 1,
      unit: 'm/s',
      hints: ['$\\overline{v^2} = \\dfrac{3RT}{M}$, với $M$ tính bằng kg/mol.'],
      solution:
        '$\\overline{v^2} = \\dfrac{3 \\cdot 8{,}31 \\cdot 300}{0{,}032} \\approx 233\\,719$ m²/s², nên $\\sqrt{\\overline{v^2}} \\approx 483$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Một chất khí có khối lượng riêng $1{,}2$ kg/m³ và $\\sqrt{\\overline{v^2}} = 500$ m/s. Áp suất của khí là bao nhiêu kPa?',
      answer: 100,
      unit: 'kPa',
      hints: ['$p = \\dfrac{1}{3}\\rho\\overline{v^2}$.'],
      solution: '$p = \\dfrac{1}{3} \\cdot 1{,}2 \\cdot 500^2 = 100\\,000$ Pa $= 100$ kPa.',
    },
    {
      type: 'choice',
      prompt:
        'Hai bình chứa khí hydrogen ($M = 2$ g/mol) và khí oxygen ($M = 32$ g/mol) ở cùng nhiệt độ. Phát biểu nào đúng?',
      options: [
        'Động năng trung bình của phân tử hai khí bằng nhau; phân tử hydrogen chuyển động nhanh hơn',
        'Động năng trung bình của phân tử oxygen lớn hơn vì phân tử nặng hơn',
        'Phân tử hai khí có cùng $\\sqrt{\\overline{v^2}}$',
        'Phân tử oxygen chuyển động nhanh hơn',
      ],
      answer: 0,
      hints: [
        '$\\overline{E}_\\text{đ} = \\dfrac{3}{2}kT$ phụ thuộc vào đại lượng nào?',
        '$\\overline{v^2} = \\dfrac{3RT}{M}$.',
      ],
      solution:
        'Cùng $T$ nên cùng $\\overline{E}_\\text{đ}$. Vì $\\overline{v^2} = \\dfrac{3RT}{M}$, khí có $M$ nhỏ hơn (hydrogen) có phân tử chuyển động nhanh hơn.',
    },
    {
      type: 'number',
      prompt:
        'Ở cùng nhiệt độ, $\\sqrt{\\overline{v^2}}$ của phân tử hydrogen ($M = 2$ g/mol) lớn gấp bao nhiêu lần của phân tử oxygen ($M = 32$ g/mol)?',
      answer: 4,
      unit: 'lần',
      hints: ['$\\sqrt{\\overline{v^2}} = \\sqrt{\\dfrac{3RT}{M}}$ tỉ lệ nghịch với $\\sqrt{M}$.'],
      solution:
        '$\\dfrac{\\sqrt{\\overline{v^2_{\\text{H}_2}}}}{\\sqrt{\\overline{v^2_{\\text{O}_2}}}} = \\sqrt{\\dfrac{32}{2}} = \\sqrt{16} = 4$.',
    },
    {
      type: 'number',
      prompt:
        'Không khí ở $27$ °C có áp suất $1{,}0 \\cdot 10^5$ Pa. Tính mật độ phân tử $\\mu$ (số phân tử trong $1$ m³), theo đơn vị $10^{25}$ m⁻³ (làm tròn đến hàng phần trăm). Cho $k = 1{,}38 \\cdot 10^{-23}$ J/K.',
      answer: 2.42,
      tolerance: 0.02,
      hints: [
        'Kết hợp $p = \\dfrac{2}{3}\\mu\\overline{E}_\\text{đ}$ và $\\overline{E}_\\text{đ} = \\dfrac{3}{2}kT$ được $p = \\mu kT$.',
      ],
      solution:
        '$\\mu = \\dfrac{p}{kT} = \\dfrac{1{,}0 \\cdot 10^5}{1{,}38 \\cdot 10^{-23} \\cdot 300} \\approx 2{,}42 \\cdot 10^{25}$ m⁻³.',
    },
    {
      type: 'choice',
      prompt: 'Hằng số Boltzmann $k$ liên hệ với hằng số khí $R$ và số Avogadro $N_A$ theo hệ thức',
      options: [
        '$k = \\dfrac{R}{N_A}$',
        '$k = RN_A$',
        '$k = \\dfrac{N_A}{R}$',
        '$k = \\dfrac{3R}{2N_A}$',
      ],
      answer: 0,
      hints: ['$R$ là hằng số tính cho một mol, $k$ là hằng số tính cho một phân tử.'],
      solution:
        '$k = \\dfrac{R}{N_A} = \\dfrac{8{,}31}{6{,}02 \\cdot 10^{23}} \\approx 1{,}38 \\cdot 10^{-23}$ J/K.',
    },
  ],
  takeaways: [
    'Áp suất khí: $p = \\dfrac{1}{3}\\mu m\\overline{v^2} = \\dfrac{1}{3}\\rho\\overline{v^2} = \\dfrac{2}{3}\\mu\\overline{E}_\\text{đ}$.',
    'Động năng tịnh tiến trung bình của phân tử: $\\overline{E}_\\text{đ} = \\dfrac{3}{2}kT$, tỉ lệ với nhiệt độ tuyệt đối và như nhau với mọi chất khí ở cùng nhiệt độ.',
    'Hằng số Boltzmann $k = \\dfrac{R}{N_A} \\approx 1{,}38 \\cdot 10^{-23}$ J/K; $\\overline{v^2} = \\dfrac{3kT}{m} = \\dfrac{3RT}{M}$.',
  ],
};
