/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Các nucleon liên kết với nhau bằng lực hạt nhân. Khối lượng hạt nhân nhỏ hơn tổng khối lượng các nucleon tạo thành nó một lượng Δm (độ hụt khối); năng lượng liên kết E_lk = Δm·c², năng lượng liên kết riêng E_lk/A càng lớn thì hạt nhân càng bền. Trong phản ứng hạt nhân, số khối và điện tích được bảo toàn. Phân hạch một hạt nhân nặng và tổng hợp các hạt nhân nhẹ (nhiệt hạch) đều toả năng lượng.',
  intro:
    'Một gam uranium-235 khi phân hạch hết toả ra năng lượng bằng đốt gần ba tấn than đá. Trong phản ứng hoá học, các nguyên tử chỉ đổi chỗ cho nhau; trong phản ứng hạt nhân, chính các hạt nhân biến đổi, và một phần khối lượng biến thành năng lượng theo hệ thức nổi tiếng $E = mc^2$ của Einstein.',
  objectives: [
    'Nêu được lực hạt nhân là lực hút rất mạnh giữa các nucleon, có tầm tác dụng rất ngắn.',
    'Tính được độ hụt khối, năng lượng liên kết và năng lượng liên kết riêng của một hạt nhân.',
    'Dùng năng lượng liên kết riêng để so sánh độ bền vững của các hạt nhân.',
    'Vận dụng được định luật bảo toàn số khối và điện tích để viết, hoàn thành phương trình phản ứng hạt nhân.',
    'Nêu được phản ứng phân hạch, phản ứng tổng hợp hạt nhân (nhiệt hạch) và điều kiện xảy ra chúng.',
  ],
  sections: [
    {
      heading: 'Lực hạt nhân',
      blocks: [
        {
          type: 'p',
          text: 'Các proton trong hạt nhân đẩy nhau bằng lực Coulomb rất lớn vì chúng ở rất gần nhau, vậy mà hạt nhân vẫn bền. Điều đó chứng tỏ giữa các nucleon có một lực hút khác, mạnh hơn nhiều.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Lực hạt nhân',
          text: 'Lực hút giữa các nucleon, giữ chúng liên kết với nhau trong hạt nhân, gọi là lực hạt nhân. Lực hạt nhân không phải lực tĩnh điện, không phụ thuộc vào điện tích của nucleon, rất mạnh và chỉ tác dụng trong phạm vi rất ngắn, cỡ kích thước hạt nhân ($10^{-15}$ m).',
        },
      ],
    },
    {
      heading: 'Độ hụt khối và năng lượng liên kết',
      blocks: [
        {
          type: 'p',
          text: 'Theo thuyết tương đối của Einstein, một vật có khối lượng $m$ thì có năng lượng $E = mc^2$, với $c = 3 \\cdot 10^8$ m/s. Từ đó: $$1\\ \\text{amu} \\cdot c^2 = 931{,}5\\ \\text{MeV}, \\quad\\text{tức là}\\quad 1\\ \\text{amu} = 931{,}5\\ \\text{MeV}/c^2,$$ trong đó $1$ MeV $= 10^6$ eV $= 1{,}6 \\cdot 10^{-13}$ J.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Độ hụt khối',
          text: 'Khối lượng $m_X$ của hạt nhân ${}^{A}_{Z}\\mathrm{X}$ luôn nhỏ hơn tổng khối lượng các nucleon tạo thành nó. Hiệu số $$\\Delta m = Zm_p + (A - Z)m_n - m_X$$ gọi là độ hụt khối của hạt nhân.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Năng lượng liên kết',
          text: 'Năng lượng liên kết của hạt nhân là năng lượng tối thiểu cần cung cấp để tách hạt nhân thành các nucleon riêng rẽ; cũng là năng lượng toả ra khi các nucleon riêng rẽ liên kết thành hạt nhân: $$E_{lk} = \\Delta m \\cdot c^2.$$ Khi $\\Delta m$ tính bằng amu thì $E_{lk} = \\Delta m \\cdot 931{,}5$ MeV.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Năng lượng liên kết riêng',
          text: 'Năng lượng liên kết tính cho một nucleon $$E_{lkr} = \\dfrac{E_{lk}}{A}$$ gọi là năng lượng liên kết riêng. Hạt nhân có năng lượng liên kết riêng càng lớn thì càng bền vững.',
        },
        {
          type: 'list',
          items: [
            'Năng lượng liên kết riêng của hầu hết các hạt nhân vào cỡ $7$ đến $9$ MeV/nucleon.',
            'Các hạt nhân có số khối trung bình, khoảng từ $50$ đến $80$ (như ${}^{56}_{26}\\mathrm{Fe}$), có năng lượng liên kết riêng lớn nhất, gần $8{,}8$ MeV/nucleon: chúng bền vững nhất.',
            'Hạt nhân nhẹ và hạt nhân rất nặng kém bền hơn. Muốn so sánh độ bền, phải so sánh $E_{lkr}$, không phải $E_{lk}$.',
          ],
        },
      ],
    },
    {
      heading: 'Phản ứng hạt nhân',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phản ứng hạt nhân',
          text: 'Phản ứng hạt nhân là quá trình các hạt nhân tương tác với nhau và biến đổi thành hạt nhân khác: $$\\mathrm{A} + \\mathrm{B} \\to \\mathrm{C} + \\mathrm{D}.$$ Phản ứng có thể tự xảy ra (hiện tượng phóng xạ) hoặc do con người gây ra bằng cách bắn các hạt vào hạt nhân. Năm 1919, Rutherford thực hiện phản ứng nhân tạo đầu tiên: ${}^{4}_{2}\\mathrm{He} + {}^{14}_{7}\\mathrm{N} \\to {}^{17}_{8}\\mathrm{O} + {}^{1}_{1}\\mathrm{H}$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định luật bảo toàn',
          text: 'Trong phản ứng ${}^{A_1}_{Z_1}\\mathrm{A} + {}^{A_2}_{Z_2}\\mathrm{B} \\to {}^{A_3}_{Z_3}\\mathrm{C} + {}^{A_4}_{Z_4}\\mathrm{D}$: $$A_1 + A_2 = A_3 + A_4 \\quad \\text{(bảo toàn số nucleon)},$$ $$Z_1 + Z_2 = Z_3 + Z_4 \\quad \\text{(bảo toàn điện tích)}.$$ Năng lượng toàn phần và động lượng cũng được bảo toàn; khối lượng thì không.',
        },
        {
          type: 'p',
          text: 'Các hạt thường gặp viết theo cùng cách: neutron ${}^{1}_{0}n$, proton ${}^{1}_{1}\\mathrm{H}$ (hay ${}^{1}_{1}p$), hạt alpha ${}^{4}_{2}\\mathrm{He}$, electron ${}^{0}_{-1}e$, positron ${}^{0}_{+1}e$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Năng lượng của phản ứng',
          text: 'Gọi $m_t$ và $m_s$ là tổng khối lượng các hạt trước và sau phản ứng. Năng lượng của phản ứng là $$\\Delta E = (m_t - m_s)c^2.$$ Nếu $m_t > m_s$, phản ứng toả năng lượng $\\Delta E$; nếu $m_t < m_s$, phản ứng thu năng lượng, chỉ xảy ra khi được cung cấp năng lượng (chẳng hạn động năng của hạt bắn vào). Cũng có thể tính $\\Delta E$ bằng tổng năng lượng liên kết của các hạt sau trừ tổng năng lượng liên kết của các hạt trước.',
        },
      ],
    },
    {
      heading: 'Phân hạch và tổng hợp hạt nhân',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phản ứng phân hạch',
          text: 'Phân hạch là phản ứng trong đó một hạt nhân nặng vỡ thành hai hạt nhân trung bình (nhẹ hơn). Ví dụ, ${}^{235}_{92}\\mathrm{U}$ hấp thụ một neutron chậm, trở thành hạt nhân kích thích rồi vỡ ra: $${}^{1}_{0}n + {}^{235}_{92}\\mathrm{U} \\to {}^{236}_{92}\\mathrm{U}^* \\to {}^{95}_{39}\\mathrm{Y} + {}^{138}_{53}\\mathrm{I} + 3\\,{}^{1}_{0}n.$$ Mỗi phân hạch toả năng lượng khoảng $200$ MeV và giải phóng $2$ hoặc $3$ neutron.',
        },
        {
          type: 'p',
          text: 'Các neutron sinh ra lại có thể gây ra những phân hạch mới, tạo thành phản ứng dây chuyền. Nếu không được kiểm soát, phản ứng dây chuyền tăng rất nhanh và gây bùng nổ (bom nguyên tử); nếu được kiểm soát, nó cung cấp năng lượng ổn định cho nhà máy điện hạt nhân (Bài 24).',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phản ứng tổng hợp hạt nhân (nhiệt hạch)',
          text: 'Tổng hợp hạt nhân là phản ứng trong đó hai hay nhiều hạt nhân nhẹ kết hợp thành một hạt nhân nặng hơn. Ví dụ: $${}^{2}_{1}\\mathrm{H} + {}^{3}_{1}\\mathrm{H} \\to {}^{4}_{2}\\mathrm{He} + {}^{1}_{0}n + 17{,}6\\ \\text{MeV}.$$ Các hạt nhân mang điện dương đẩy nhau, nên phản ứng chỉ xảy ra ở nhiệt độ rất cao (cỡ $10^7$ đến $10^8$ K), với mật độ hạt nhân đủ lớn và thời gian duy trì đủ lâu; vì thế còn gọi là phản ứng nhiệt hạch. Đây là nguồn năng lượng của Mặt Trời và các ngôi sao.',
        },
        {
          type: 'p',
          text: 'Trên đồ thị năng lượng liên kết riêng, cả hai loại phản ứng đều đưa các nucleon về phía đỉnh đồ thị: hạt nhân tạo thành bền hơn, năng lượng liên kết tăng lên, và phần tăng đó được toả ra. Tính cho mỗi nucleon, nhiệt hạch toả năng lượng nhiều hơn phân hạch.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đồ thị năng lượng liên kết riêng',
    instruction:
      'Ở chế độ "Đọc đồ thị", bấm vào một điểm (hoặc dùng phím mũi tên) để đọc năng lượng liên kết riêng của từng hạt nhân. Chuyển sang "Phân hạch" và "Nhiệt hạch": các mũi tên cho thấy hạt nhân sau phản ứng nằm cao hơn trên đồ thị, và phản ứng toả bao nhiêu năng lượng.',
  },
  examples: [
    {
      problem:
        'Tính năng lượng liên kết và năng lượng liên kết riêng của hạt nhân ${}^{4}_{2}\\mathrm{He}$. Cho $m_{\\mathrm{He}} = 4{,}0015$ amu, $m_p = 1{,}0073$ amu, $m_n = 1{,}0087$ amu, $1$ amu $= 931{,}5$ MeV/$c^2$.',
      steps: [
        'Độ hụt khối: $\\Delta m = 2 \\cdot 1{,}0073 + 2 \\cdot 1{,}0087 - 4{,}0015 = 0{,}0305$ amu.',
        'Năng lượng liên kết: $E_{lk} = 0{,}0305 \\cdot 931{,}5 \\approx 28{,}41$ MeV.',
        'Năng lượng liên kết riêng: $E_{lkr} = \\dfrac{28{,}41}{4} \\approx 7{,}10$ MeV/nucleon.',
      ],
      answer: '$E_{lk} \\approx 28{,}41$ MeV; $E_{lkr} \\approx 7{,}10$ MeV/nucleon.',
    },
    {
      problem:
        'Xét phản ứng ${}^{4}_{2}\\mathrm{He} + {}^{14}_{7}\\mathrm{N} \\to {}^{17}_{8}\\mathrm{O} + {}^{A}_{Z}\\mathrm{X}$. Xác định hạt $\\mathrm{X}$. Phản ứng toả hay thu bao nhiêu năng lượng? Cho $m_{\\mathrm{He}} = 4{,}0015$ amu, $m_{\\mathrm{N}} = 13{,}9992$ amu, $m_{\\mathrm{O}} = 16{,}9947$ amu, $m_{\\mathrm{X}} = 1{,}0073$ amu.',
      steps: [
        'Bảo toàn số nucleon: $4 + 14 = 17 + A$, nên $A = 1$. Bảo toàn điện tích: $2 + 7 = 8 + Z$, nên $Z = 1$. Vậy $\\mathrm{X}$ là proton ${}^{1}_{1}\\mathrm{H}$.',
        '$m_t = 4{,}0015 + 13{,}9992 = 18{,}0007$ amu; $m_s = 16{,}9947 + 1{,}0073 = 18{,}0020$ amu.',
        '$\\Delta E = (m_t - m_s)c^2 = -0{,}0013 \\cdot 931{,}5 \\approx -1{,}21$ MeV $< 0$.',
      ],
      answer:
        '$\\mathrm{X}$ là proton; phản ứng thu năng lượng khoảng $1{,}21$ MeV (hạt alpha phải có đủ động năng thì phản ứng mới xảy ra).',
    },
    {
      problem:
        'Trong phân hạch ${}^{1}_{0}n + {}^{235}_{92}\\mathrm{U} \\to {}^{140}_{54}\\mathrm{Xe} + {}^{94}_{Z}\\mathrm{Sr} + k\\,{}^{1}_{0}n$, tìm $Z$ và $k$.',
      steps: [
        'Bảo toàn điện tích: $0 + 92 = 54 + Z + 0$, nên $Z = 38$.',
        'Bảo toàn số nucleon: $1 + 235 = 140 + 94 + k$, nên $k = 2$.',
      ],
      answer: '$Z = 38$ (strontium), $k = 2$ neutron.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trong một phản ứng hạt nhân, đại lượng nào sau đây KHÔNG nhất thiết được bảo toàn?',
      options: [
        'Tổng khối lượng các hạt',
        'Tổng số nucleon',
        'Tổng điện tích',
        'Năng lượng toàn phần',
      ],
      answer: 0,
      hints: ['Năng lượng toả ra hay thu vào của phản ứng đến từ đâu?'],
      solution:
        'Phản ứng hạt nhân bảo toàn số nucleon, điện tích, năng lượng toàn phần và động lượng. Tổng khối lượng thay đổi: phần chênh lệch $\\Delta m$ ứng với năng lượng $\\Delta m c^2$ toả ra hoặc thu vào.',
    },
    {
      type: 'choice',
      prompt:
        'Trong phản ứng ${}^{23}_{11}\\mathrm{Na} + {}^{1}_{1}\\mathrm{H} \\to {}^{4}_{2}\\mathrm{He} + \\mathrm{X}$, hạt nhân $\\mathrm{X}$ là',
      options: [
        '${}^{20}_{10}\\mathrm{Ne}$',
        '${}^{20}_{11}\\mathrm{Na}$',
        '${}^{19}_{10}\\mathrm{Ne}$',
        '${}^{24}_{12}\\mathrm{Mg}$',
      ],
      answer: 0,
      hints: [
        'Viết hai phương trình: tổng số trên hai vế bằng nhau, tổng số dưới hai vế bằng nhau.',
      ],
      solution:
        '$A = 23 + 1 - 4 = 20$, $Z = 11 + 1 - 2 = 10$: $\\mathrm{X}$ là ${}^{20}_{10}\\mathrm{Ne}$.',
    },
    {
      type: 'number',
      prompt:
        'Trong phân hạch ${}^{1}_{0}n + {}^{235}_{92}\\mathrm{U} \\to {}^{95}_{39}\\mathrm{Y} + {}^{138}_{53}\\mathrm{I} + k\\,{}^{1}_{0}n$, số neutron $k$ giải phóng là bao nhiêu?',
      answer: 3,
      hints: ['Dùng bảo toàn số nucleon.'],
      solution: '$1 + 235 = 95 + 138 + k$, nên $k = 3$. Kiểm tra điện tích: $92 = 39 + 53$.',
    },
    {
      type: 'number',
      prompt:
        'Độ hụt khối của hạt nhân ${}^{4}_{2}\\mathrm{He}$ là bao nhiêu amu? Cho $m_{\\mathrm{He}} = 4{,}0015$ amu, $m_p = 1{,}0073$ amu, $m_n = 1{,}0087$ amu.',
      answer: 0.0305,
      tolerance: 0.00001,
      unit: 'amu',
      hints: ['$\\Delta m = Zm_p + (A - Z)m_n - m_{\\mathrm{He}}$ với $Z = 2$, $A = 4$.'],
      solution:
        '$\\Delta m = 2 \\cdot 1{,}0073 + 2 \\cdot 1{,}0087 - 4{,}0015 = 4{,}0320 - 4{,}0015 = 0{,}0305$ amu.',
    },
    {
      type: 'number',
      prompt:
        'Cho $m_{\\mathrm{Fe}} = 55{,}9207$ amu, $m_p = 1{,}0073$ amu, $m_n = 1{,}0087$ amu, $1$ amu $= 931{,}5$ MeV/$c^2$. Năng lượng liên kết riêng của hạt nhân ${}^{56}_{26}\\mathrm{Fe}$ bằng bao nhiêu MeV/nucleon (làm tròn đến hai chữ số sau dấu phẩy)?',
      answer: 8.82,
      tolerance: 0.02,
      unit: 'MeV/nucleon',
      hints: [
        'Hạt nhân có $26$ proton và $56 - 26 = 30$ neutron.',
        'Tính $\\Delta m$, rồi $E_{lk} = \\Delta m \\cdot 931{,}5$ MeV, rồi chia cho $56$.',
      ],
      solution:
        '$\\Delta m = 26 \\cdot 1{,}0073 + 30 \\cdot 1{,}0087 - 55{,}9207 = 0{,}5301$ amu; $E_{lk} = 0{,}5301 \\cdot 931{,}5 \\approx 493{,}8$ MeV; $E_{lkr} = \\dfrac{493{,}8}{56} \\approx 8{,}82$ MeV/nucleon.',
    },
    {
      type: 'choice',
      prompt:
        'Hạt nhân ${}^{4}_{2}\\mathrm{He}$ có năng lượng liên kết $28{,}4$ MeV, hạt nhân ${}^{7}_{3}\\mathrm{Li}$ có năng lượng liên kết $39{,}2$ MeV. Kết luận nào đúng?',
      options: [
        'Hạt nhân ${}^{4}_{2}\\mathrm{He}$ bền vững hơn',
        'Hạt nhân ${}^{7}_{3}\\mathrm{Li}$ bền vững hơn',
        'Hai hạt nhân bền vững như nhau',
        'Không so sánh được vì hai hạt nhân có số khối khác nhau',
      ],
      answer: 0,
      hints: ['Độ bền vững được so sánh bằng năng lượng liên kết riêng $\\dfrac{E_{lk}}{A}$.'],
      solution:
        '$E_{lkr}(\\mathrm{He}) = \\dfrac{28{,}4}{4} = 7{,}1$ MeV/nucleon, $E_{lkr}(\\mathrm{Li}) = \\dfrac{39{,}2}{7} = 5{,}6$ MeV/nucleon. Hạt nhân helium có năng lượng liên kết riêng lớn hơn nên bền vững hơn, dù năng lượng liên kết nhỏ hơn.',
    },
    {
      type: 'number',
      prompt:
        'Phản ứng ${}^{2}_{1}\\mathrm{H} + {}^{3}_{1}\\mathrm{H} \\to {}^{4}_{2}\\mathrm{He} + {}^{1}_{0}n$ toả ra bao nhiêu MeV? Cho $m_{\\mathrm{D}} = 2{,}0136$ amu, $m_{\\mathrm{T}} = 3{,}0155$ amu, $m_{\\mathrm{He}} = 4{,}0015$ amu, $m_n = 1{,}0087$ amu, $1$ amu $= 931{,}5$ MeV/$c^2$.',
      answer: 17.6,
      tolerance: 0.05,
      unit: 'MeV',
      hints: ['$\\Delta E = (m_t - m_s) \\cdot 931{,}5$ MeV, với khối lượng tính bằng amu.'],
      solution:
        '$m_t = 5{,}0291$ amu, $m_s = 5{,}0102$ amu; $\\Delta E = 0{,}0189 \\cdot 931{,}5 \\approx 17{,}6$ MeV.',
    },
    {
      type: 'number',
      prompt:
        'Mỗi phân hạch ${}^{235}_{92}\\mathrm{U}$ toả ra $200$ MeV. Năng lượng toả ra khi $1$ g ${}^{235}_{92}\\mathrm{U}$ phân hạch hết bằng bao nhiêu $10^{10}$ J? Cho $N_A = 6{,}02 \\cdot 10^{23}$ mol⁻¹, $1$ MeV $= 1{,}6 \\cdot 10^{-13}$ J.',
      answer: 8.2,
      tolerance: 0.05,
      hints: [
        'Số hạt nhân trong $1$ g: $N = \\dfrac{m}{M} N_A$ với $M = 235$ g/mol.',
        'Nhân $N$ với năng lượng mỗi phân hạch, đổi MeV ra J.',
      ],
      solution:
        '$N = \\dfrac{1}{235} \\cdot 6{,}02 \\cdot 10^{23} \\approx 2{,}56 \\cdot 10^{21}$; $E = 2{,}56 \\cdot 10^{21} \\cdot 200 \\cdot 1{,}6 \\cdot 10^{-13} \\approx 8{,}2 \\cdot 10^{10}$ J.',
    },
    {
      type: 'choice',
      prompt: 'Phát biểu nào sau đây về phản ứng tổng hợp hạt nhân (nhiệt hạch) là đúng?',
      options: [
        'Phản ứng chỉ xảy ra ở nhiệt độ rất cao, cỡ $10^7$ đến $10^8$ K',
        'Phản ứng xảy ra khi bắn một neutron chậm vào hạt nhân nặng',
        'Phản ứng thu năng lượng',
        'Hạt nhân tạo thành nhẹ hơn các hạt nhân ban đầu',
      ],
      answer: 0,
      hints: ['Các hạt nhân nhẹ đều mang điện dương: chúng cần gì để tiến lại đủ gần nhau?'],
      solution:
        'Muốn thắng lực đẩy Coulomb để các hạt nhân tiến đủ gần cho lực hạt nhân tác dụng, chúng phải chuyển động rất nhanh, tức là nhiệt độ rất cao. Nhiệt hạch toả năng lượng và tạo ra hạt nhân nặng hơn; bắn neutron chậm vào hạt nhân nặng là cách gây phân hạch.',
    },
  ],
  takeaways: [
    'Lực hạt nhân: lực hút rất mạnh giữa các nucleon, tầm tác dụng cỡ $10^{-15}$ m.',
    'Độ hụt khối $\\Delta m = Zm_p + (A - Z)m_n - m_X$; năng lượng liên kết $E_{lk} = \\Delta m c^2$; $1$ amu $= 931{,}5$ MeV/$c^2$.',
    'Năng lượng liên kết riêng $E_{lkr} = \\dfrac{E_{lk}}{A}$ càng lớn, hạt nhân càng bền; lớn nhất ở các hạt nhân có $A$ khoảng $50$ đến $80$.',
    'Phản ứng hạt nhân bảo toàn số nucleon và điện tích; $\\Delta E = (m_t - m_s)c^2 > 0$ thì toả năng lượng.',
    'Phân hạch: hạt nhân nặng vỡ thành hai hạt nhân trung bình (khoảng $200$ MeV mỗi phân hạch, có thể thành phản ứng dây chuyền). Nhiệt hạch: hạt nhân nhẹ tổng hợp thành hạt nhân nặng hơn, cần nhiệt độ $10^7$ đến $10^8$ K.',
  ],
};
