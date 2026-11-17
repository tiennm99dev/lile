/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thí nghiệm tán xạ hạt alpha của Rutherford cho thấy nguyên tử có một hạt nhân rất nhỏ, mang điện dương, chứa gần như toàn bộ khối lượng nguyên tử. Hạt nhân gồm Z proton và N neutron (gọi chung là nucleon), số khối A = Z + N, kí hiệu là X với A ở trên, Z ở dưới. Các đồng vị có cùng Z nhưng khác A. Bán kính hạt nhân R ≈ 1,2·10⁻¹⁵·A^(1/3) m.',
  intro:
    'Nếu phóng to một nguyên tử bằng một sân vận động thì hạt nhân của nó chỉ như một hạt đậu đặt giữa sân, vậy mà hạt đậu ấy chiếm gần như toàn bộ khối lượng nguyên tử. Hạt nhân được cấu tạo từ những hạt nào, và vì sao cùng là carbon mà có loại dùng để xác định tuổi cổ vật, có loại thì không?',
  objectives: [
    'Mô tả được thí nghiệm tán xạ hạt alpha và rút ra được sự tồn tại của hạt nhân nguyên tử.',
    'Nêu được hạt nhân gồm proton và neutron; biết khối lượng, điện tích của chúng và đơn vị amu.',
    'Viết và đọc được kí hiệu hạt nhân ${}^{A}_{Z}\\mathrm{X}$; tính được số neutron $N = A - Z$.',
    'Nêu được khái niệm đồng vị và lấy được ví dụ.',
    'Ước lượng được kích thước hạt nhân bằng công thức $R = 1{,}2 \\cdot 10^{-15} A^{\\frac{1}{3}}$ m.',
  ],
  sections: [
    {
      heading: 'Thí nghiệm tán xạ hạt alpha',
      blocks: [
        {
          type: 'p',
          text: 'Năm 1911, Rutherford và các cộng sự cho một chùm hạt alpha ($\\alpha$, mang điện dương) bắn vào một lá vàng rất mỏng, rồi quan sát các chấm sáng chúng tạo ra trên màn huỳnh quang đặt xung quanh.',
        },
        {
          type: 'list',
          items: [
            'Hầu hết các hạt $\\alpha$ đi thẳng qua lá vàng: phần lớn thể tích nguyên tử là khoảng trống.',
            'Một số ít hạt $\\alpha$ bị lệch hướng, một số rất ít bị bật ngược trở lại: chúng đã đi tới rất gần một vùng mang điện dương, rất nhỏ nhưng nặng, và bị đẩy mạnh.',
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hạt nhân nguyên tử',
          text: 'Nguyên tử có một hạt nhân mang điện dương nằm ở tâm, có đường kính cỡ $10^{-14}$ m (nhỏ hơn đường kính nguyên tử khoảng $10^4$ đến $10^5$ lần) nhưng chứa gần như toàn bộ khối lượng của nguyên tử. Các electron chuyển động xung quanh hạt nhân.',
        },
      ],
    },
    {
      heading: 'Nucleon và kí hiệu hạt nhân',
      blocks: [
        {
          type: 'p',
          text: 'Hạt nhân được cấu tạo từ hai loại hạt, gọi chung là nucleon:',
        },
        {
          type: 'table',
          head: ['Hạt', 'Khối lượng', 'Điện tích'],
          rows: [
            [
              'Proton ($p$)',
              '$m_p = 1{,}672\\,62 \\cdot 10^{-27}$ kg',
              '$+e = +1{,}6 \\cdot 10^{-19}$ C',
            ],
            ['Neutron ($n$)', '$m_n = 1{,}674\\,93 \\cdot 10^{-27}$ kg', '$0$ (không mang điện)'],
          ],
          caption: 'Khối lượng neutron lớn hơn khối lượng proton một chút.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đơn vị khối lượng nguyên tử',
          text: 'Trong vật lí hạt nhân, khối lượng thường đo bằng đơn vị khối lượng nguyên tử, kí hiệu amu: $1$ amu bằng $\\dfrac{1}{12}$ khối lượng của nguyên tử ${}^{12}_{6}\\mathrm{C}$, $$1\\ \\text{amu} \\approx 1{,}660\\,54 \\cdot 10^{-27}\\ \\text{kg}.$$ Khi đó $m_p \\approx 1{,}007\\,276$ amu và $m_n \\approx 1{,}008\\,665$ amu.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Kí hiệu hạt nhân',
          text: 'Hạt nhân của nguyên tố $\\mathrm{X}$ được kí hiệu là $${}^{A}_{Z}\\mathrm{X}$$ trong đó $Z$ là số proton (bằng số thứ tự của nguyên tố trong bảng tuần hoàn, gọi là nguyên tử số), $A$ là số nucleon, gọi là số khối. Số neutron là $N = A - Z$.',
        },
        {
          type: 'p',
          text: 'Ví dụ: ${}^{1}_{1}\\mathrm{H}$ có $1$ proton và không có neutron; ${}^{16}_{8}\\mathrm{O}$ có $8$ proton và $8$ neutron; ${}^{235}_{92}\\mathrm{U}$ có $92$ proton và $143$ neutron. Điện tích của hạt nhân là $+Ze$. Vì khối lượng mỗi nucleon xấp xỉ $1$ amu nên khối lượng hạt nhân xấp xỉ $A$ amu.',
        },
      ],
    },
    {
      heading: 'Đồng vị',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đồng vị',
          text: 'Các hạt nhân đồng vị là những hạt nhân có cùng số proton $Z$ nhưng khác số khối $A$, tức là khác số neutron. Chúng thuộc cùng một nguyên tố nên có cùng vị trí trong bảng tuần hoàn.',
        },
        {
          type: 'list',
          items: [
            'Hydrogen có ba đồng vị: hydrogen thường ${}^{1}_{1}\\mathrm{H}$, deuterium ${}^{2}_{1}\\mathrm{H}$ (còn kí hiệu ${}^{2}_{1}\\mathrm{D}$) và tritium ${}^{3}_{1}\\mathrm{H}$ (${}^{3}_{1}\\mathrm{T}$).',
            'Carbon có các đồng vị ${}^{12}_{6}\\mathrm{C}$ (khoảng $99\\%$), ${}^{13}_{6}\\mathrm{C}$ và ${}^{14}_{6}\\mathrm{C}$.',
            'Đồng vị bền tồn tại lâu dài; đồng vị phóng xạ (như ${}^{3}_{1}\\mathrm{H}$, ${}^{14}_{6}\\mathrm{C}$) tự biến đổi thành hạt nhân khác. Hiện tượng này được học ở Bài 23.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Không phải số nào cũng được',
          text: 'Với mỗi nguyên tố, chỉ một số ít tổ hợp proton – neutron tạo được hạt nhân bền. Ở các hạt nhân nhẹ bền, số neutron xấp xỉ số proton; ở hạt nhân nặng, số neutron nhiều hơn hẳn số proton (như ${}^{238}_{92}\\mathrm{U}$ có $146$ neutron).',
        },
      ],
    },
    {
      heading: 'Kích thước hạt nhân',
      blocks: [
        {
          type: 'p',
          text: 'Các nucleon xếp sát nhau, không chồng lên nhau, nên thể tích hạt nhân tỉ lệ với số nucleon $A$. Có thể coi hạt nhân là một quả cầu, bán kính của nó gần đúng là',
        },
        { type: 'tex', tex: 'R = 1{,}2 \\cdot 10^{-15} \\cdot A^{\\frac{1}{3}}\\ \\text{(m)}' },
        {
          type: 'p',
          text: 'Công thức cho kết quả tốt hơn với hạt nhân có $A > 12$. Vì $R^3$ tỉ lệ với $A$ nên khối lượng riêng của mọi hạt nhân xấp xỉ như nhau, khoảng $2{,}3 \\cdot 10^{17}$ kg/m³: một thìa cà phê ($5$ cm³) chất hạt nhân nặng hơn một tỉ tấn.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ xếp hạt nhân',
    instruction:
      'Bấm $+$, $-$ để thêm, bớt proton và neutron. Quan sát kí hiệu ${}^{A}_{Z}\\mathrm{X}$: đổi số proton thì đổi nguyên tố, đổi số neutron thì được một đồng vị khác của cùng nguyên tố. Làm lần lượt các thử thách bên dưới.',
  },
  examples: [
    {
      problem:
        'Hạt nhân ${}^{235}_{92}\\mathrm{U}$ có bao nhiêu proton, bao nhiêu neutron? Ước tính bán kính của nó.',
      steps: [
        'Số proton $Z = 92$; số nucleon $A = 235$.',
        'Số neutron $N = A - Z = 235 - 92 = 143$.',
        '$A^{\\frac{1}{3}} = \\sqrt[3]{235} \\approx 6{,}17$, nên $R \\approx 1{,}2 \\cdot 10^{-15} \\cdot 6{,}17 \\approx 7{,}4 \\cdot 10^{-15}$ m.',
      ],
      answer: '$92$ proton, $143$ neutron; $R \\approx 7{,}4 \\cdot 10^{-15}$ m.',
    },
    {
      problem:
        'Coi khối lượng mỗi nucleon bằng $1$ amu $= 1{,}66 \\cdot 10^{-27}$ kg. Tính khối lượng riêng của chất hạt nhân.',
      steps: [
        'Khối lượng hạt nhân: $m \\approx A \\cdot 1{,}66 \\cdot 10^{-27}$ kg.',
        'Thể tích: $V = \\dfrac{4}{3}\\pi R^3 = \\dfrac{4}{3}\\pi (1{,}2 \\cdot 10^{-15})^3 A \\approx 7{,}24 \\cdot 10^{-45} A$ m³.',
        '$\\rho = \\dfrac{m}{V} \\approx \\dfrac{1{,}66 \\cdot 10^{-27}}{7{,}24 \\cdot 10^{-45}} \\approx 2{,}3 \\cdot 10^{17}$ kg/m³; $A$ đã giản ước nên kết quả không phụ thuộc vào hạt nhân.',
      ],
      answer: '$\\rho \\approx 2{,}3 \\cdot 10^{17}$ kg/m³, như nhau với mọi hạt nhân.',
    },
    {
      problem:
        'Oxygen trong tự nhiên gồm các hạt nhân ${}^{16}_{8}\\mathrm{O}$, ${}^{17}_{8}\\mathrm{O}$, ${}^{18}_{8}\\mathrm{O}$. Chúng giống và khác nhau ở điểm nào?',
      steps: [
        'Cả ba có $Z = 8$: cùng $8$ proton, cùng điện tích hạt nhân $+8e$, cùng là nguyên tố oxygen.',
        'Số neutron lần lượt là $16 - 8 = 8$, $17 - 8 = 9$ và $18 - 8 = 10$.',
      ],
      answer:
        'Ba hạt nhân là đồng vị của oxygen: cùng $8$ proton, khác số neutron ($8$, $9$, $10$) nên khác số khối.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hạt nhân nguyên tử được cấu tạo từ',
      options: [
        'các proton và neutron',
        'các proton và electron',
        'các neutron và electron',
        'các proton, neutron và electron',
      ],
      answer: 0,
      hints: ['Electron chuyển động xung quanh hạt nhân, không nằm trong hạt nhân.'],
      solution: 'Hạt nhân gồm các proton và neutron, gọi chung là nucleon.',
    },
    {
      type: 'number',
      prompt: 'Hạt nhân ${}^{238}_{92}\\mathrm{U}$ có bao nhiêu neutron?',
      answer: 146,
      hints: ['Số khối $A$ là tổng số proton và neutron.', '$N = A - Z$.'],
      solution: '$N = A - Z = 238 - 92 = 146$.',
    },
    {
      type: 'number',
      prompt: 'Hạt nhân ${}^{27}_{13}\\mathrm{Al}$ có tổng cộng bao nhiêu nucleon?',
      answer: 27,
      hints: ['Nucleon là tên gọi chung của proton và neutron.'],
      solution: 'Số nucleon bằng số khối: $A = 27$ ($13$ proton và $14$ neutron).',
    },
    {
      type: 'choice',
      prompt: 'Các hạt nhân đồng vị là những hạt nhân có',
      options: [
        'cùng số proton nhưng khác số neutron',
        'cùng số neutron nhưng khác số proton',
        'cùng số khối nhưng khác số proton',
        'cùng số khối và cùng số proton',
      ],
      answer: 0,
      hints: ['Đồng vị thuộc cùng một nguyên tố, nằm ở cùng một ô trong bảng tuần hoàn.'],
      solution:
        'Đồng vị có cùng $Z$ (cùng nguyên tố) nhưng khác $A$, tức là khác số neutron $N = A - Z$.',
    },
    {
      type: 'choice',
      prompt: 'Cặp hạt nhân nào sau đây là hai đồng vị?',
      options: [
        '${}^{12}_{6}\\mathrm{C}$ và ${}^{14}_{6}\\mathrm{C}$',
        '${}^{14}_{6}\\mathrm{C}$ và ${}^{14}_{7}\\mathrm{N}$',
        '${}^{40}_{18}\\mathrm{Ar}$ và ${}^{40}_{20}\\mathrm{Ca}$',
        '${}^{3}_{1}\\mathrm{H}$ và ${}^{3}_{2}\\mathrm{He}$',
      ],
      answer: 0,
      hints: ['So sánh số ở dưới ($Z$), không phải số ở trên.'],
      solution:
        '${}^{12}_{6}\\mathrm{C}$ và ${}^{14}_{6}\\mathrm{C}$ cùng có $Z = 6$, khác $A$. Các cặp còn lại có cùng $A$ nhưng khác $Z$, nên là hai nguyên tố khác nhau.',
    },
    {
      type: 'number',
      prompt:
        'Dùng công thức $R = 1{,}2 \\cdot 10^{-15} A^{\\frac{1}{3}}$ m, tính bán kính hạt nhân ${}^{27}_{13}\\mathrm{Al}$ theo đơn vị $10^{-15}$ m.',
      answer: 3.6,
      tolerance: 0.01,
      hints: ['$\\sqrt[3]{27}$ bằng bao nhiêu?'],
      solution:
        '$R = 1{,}2 \\cdot 10^{-15} \\cdot \\sqrt[3]{27} = 1{,}2 \\cdot 10^{-15} \\cdot 3 = 3{,}6 \\cdot 10^{-15}$ m.',
    },
    {
      type: 'number',
      prompt:
        'Tỉ số giữa bán kính hạt nhân ${}^{125}_{52}\\mathrm{Te}$ và bán kính hạt nhân ${}^{8}_{4}\\mathrm{Be}$ là bao nhiêu?',
      answer: 2.5,
      tolerance: 0.01,
      hints: [
        '$R$ tỉ lệ với $A^{\\frac{1}{3}}$, nên $\\dfrac{R_1}{R_2} = \\sqrt[3]{\\dfrac{A_1}{A_2}}$.',
      ],
      solution: '$\\dfrac{R_1}{R_2} = \\sqrt[3]{\\dfrac{125}{8}} = \\dfrac{5}{2} = 2{,}5$.',
    },
    {
      type: 'number',
      prompt:
        'Biết $m_p = 1{,}672\\,62 \\cdot 10^{-27}$ kg và $1$ amu $= 1{,}660\\,54 \\cdot 10^{-27}$ kg. Khối lượng proton bằng bao nhiêu amu (làm tròn đến bốn chữ số sau dấu phẩy)?',
      answer: 1.0073,
      tolerance: 0.0001,
      unit: 'amu',
      hints: ['Chia khối lượng proton cho khối lượng ứng với $1$ amu.'],
      solution: '$m_p = \\dfrac{1{,}672\\,62}{1{,}660\\,54}$ amu $\\approx 1{,}0073$ amu.',
    },
    {
      type: 'choice',
      prompt:
        'Kết quả nào của thí nghiệm tán xạ hạt alpha cho thấy hạt nhân rất nhỏ nhưng tập trung điện tích dương và khối lượng?',
      options: [
        'Một số rất ít hạt alpha bị bật ngược trở lại',
        'Hầu hết các hạt alpha đi thẳng qua lá vàng',
        'Lá vàng bị nóng lên khi bị bắn phá',
        'Các hạt alpha bị lá vàng hút lại',
      ],
      answer: 0,
      hints: [
        'Muốn bật ngược một hạt alpha đang bay rất nhanh, cần một lực đẩy rất mạnh từ một vật nặng mang điện dương.',
      ],
      solution:
        'Chỉ một vùng rất nhỏ, mang điện dương và chứa gần hết khối lượng nguyên tử mới đẩy bật ngược được hạt alpha; vì vùng đó rất nhỏ nên chỉ rất ít hạt đi tới gần nó. Việc hầu hết hạt đi thẳng chỉ cho thấy nguyên tử phần lớn là khoảng trống.',
    },
  ],
  takeaways: [
    'Thí nghiệm tán xạ hạt alpha: nguyên tử có hạt nhân nhỏ (cỡ $10^{-14}$ m), mang điện dương, chứa gần hết khối lượng.',
    'Hạt nhân gồm $Z$ proton và $N$ neutron (nucleon); kí hiệu ${}^{A}_{Z}\\mathrm{X}$ với số khối $A = Z + N$.',
    '$1$ amu $= \\dfrac{1}{12}$ khối lượng nguyên tử ${}^{12}_{6}\\mathrm{C} \\approx 1{,}660\\,54 \\cdot 10^{-27}$ kg.',
    'Đồng vị: cùng $Z$, khác $A$ (khác số neutron).',
    'Bán kính hạt nhân $R \\approx 1{,}2 \\cdot 10^{-15} A^{\\frac{1}{3}}$ m.',
  ],
};
