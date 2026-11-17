/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập ba dạng bài của chương Vật lí hạt nhân: tính độ hụt khối, năng lượng liên kết và năng lượng liên kết riêng; hoàn thành phương trình phản ứng hạt nhân bằng định luật bảo toàn số khối và điện tích rồi tính năng lượng phản ứng; vận dụng định luật phóng xạ và chu kì bán rã.',
  intro:
    'Ba công thức đứng sau gần như mọi bài toán hạt nhân ở lớp 12: $E_{lk} = \\Delta m c^2$, các định luật bảo toàn số khối và điện tích, và $N = N_0 \\cdot 2^{-\\frac{t}{T}}$. Bài này giúp em luyện cả ba cho thật chắc, với các phản ứng có thật: từ phản ứng nhân tạo đầu tiên của Rutherford đến phân hạch uranium và tổng hợp các hạt nhân hydrogen.',
  objectives: [
    'Tính được độ hụt khối, năng lượng liên kết, năng lượng liên kết riêng và so sánh độ bền vững của các hạt nhân.',
    'Hoàn thành được phương trình phản ứng hạt nhân và tính được năng lượng toả ra hay thu vào.',
    'Giải được các bài toán về số hạt nhân, khối lượng, độ phóng xạ còn lại theo chu kì bán rã.',
  ],
  sections: [
    {
      heading: 'Tóm tắt công thức',
      blocks: [
        {
          type: 'table',
          head: ['Đại lượng', 'Công thức'],
          rows: [
            ['Độ hụt khối', '$\\Delta m = Zm_p + (A - Z)m_n - m_X$'],
            ['Năng lượng liên kết', '$E_{lk} = \\Delta m c^2$; $1$ amu $= 931{,}5$ MeV/$c^2$'],
            ['Năng lượng liên kết riêng', '$E_{lkr} = \\dfrac{E_{lk}}{A}$ (càng lớn càng bền)'],
            [
              'Bảo toàn trong phản ứng',
              '$\\sum A_{\\text{trước}} = \\sum A_{\\text{sau}}$; $\\sum Z_{\\text{trước}} = \\sum Z_{\\text{sau}}$',
            ],
            [
              'Năng lượng phản ứng',
              '$\\Delta E = (m_t - m_s)c^2$; $\\Delta E > 0$: toả, $\\Delta E < 0$: thu',
            ],
            [
              'Định luật phóng xạ',
              '$N = N_0 \\cdot 2^{-\\frac{t}{T}}$, $m = m_0 \\cdot 2^{-\\frac{t}{T}}$, $H = H_0 \\cdot 2^{-\\frac{t}{T}}$',
            ],
            ['Độ phóng xạ', '$H = \\lambda N$, $\\lambda = \\dfrac{\\ln 2}{T}$ ($T$ đổi ra giây)'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Những lỗi hay gặp',
          text: 'Quên nhân hệ số trước hạt (như $3\\,{}^{1}_{0}n$) khi cộng số khối và khối lượng; quên rằng electron là ${}^{0}_{-1}e$ ($Z = -1$); dùng khối lượng nguyên tử thay cho khối lượng hạt nhân khi đề đã cho khối lượng hạt nhân; tính $H = \\lambda N$ mà để $T$ theo ngày hoặc năm.',
        },
      ],
    },
    {
      heading: 'Hoàn thành phản ứng và tính năng lượng',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Gọi hạt cần tìm là ${}^{A}_{Z}\\mathrm{X}$. Viết phương trình bảo toàn số nucleon để tìm $A$, bảo toàn điện tích để tìm $Z$.',
            'Tra $Z$ trong bảng tuần hoàn để biết tên hạt nhân, hoặc nhận ra hạt quen thuộc: ${}^{1}_{0}n$, ${}^{1}_{1}\\mathrm{H}$, ${}^{4}_{2}\\mathrm{He}$, ${}^{0}_{-1}e$, ${}^{0}_{+1}e$.',
            'Cộng khối lượng các hạt trước ($m_t$) và sau ($m_s$) phản ứng, rồi $\\Delta E = (m_t - m_s) \\cdot 931{,}5$ MeV.',
          ],
        },
        {
          type: 'p',
          text: 'Thử ngay ở bộ bài tập tương tác phía dưới: mỗi phản ứng có một hạt bị che; nhập $A$, $Z$ của nó, và với các phản ứng có cho khối lượng, tính tiếp năng lượng của phản ứng.',
        },
      ],
    },
    {
      heading: 'Luyện tập tự sinh đề',
      blocks: [
        {
          type: 'p',
          text: 'Bộ đề dưới đây được sinh ngẫu nhiên từ bốn dạng bài: bảo toàn số khối và điện tích, năng lượng liên kết, chu kì bán rã và năng lượng phản ứng. Trả lời sai lần đầu, em được gợi ý và làm lại; bảng kĩ năng cho biết dạng bài nào cần ôn thêm. Bấm "Làm bộ đề mới" để có đề khác.',
        },
        { type: 'widget', name: 'luyen-tap' },
      ],
    },
  ],
  explore: {
    title: 'Điền hạt còn thiếu',
    instruction:
      'Nhập số khối $A$ và điện tích $Z$ của hạt bị che rồi bấm "Kiểm tra": hạt em nhập hiện ngay trong phương trình. Khi đúng, nếu phản ứng có cho khối lượng các hạt, hãy tính tiếp năng lượng của phản ứng.',
  },
  examples: [
    {
      problem:
        'Cho khối lượng hạt nhân ${}^{235}_{92}\\mathrm{U}$ là $234{,}9934$ amu, $m_p = 1{,}0073$ amu, $m_n = 1{,}0087$ amu, $1$ amu $= 931{,}5$ MeV/$c^2$. Tính năng lượng liên kết riêng của ${}^{235}_{92}\\mathrm{U}$.',
      steps: [
        'Hạt nhân có $92$ proton và $235 - 92 = 143$ neutron.',
        '$\\Delta m = 92 \\cdot 1{,}0073 + 143 \\cdot 1{,}0087 - 234{,}9934 = 92{,}6716 + 144{,}2441 - 234{,}9934 = 1{,}9223$ amu.',
        '$E_{lk} = 1{,}9223 \\cdot 931{,}5 \\approx 1\\,790{,}6$ MeV; $E_{lkr} = \\dfrac{1\\,790{,}6}{235} \\approx 7{,}62$ MeV/nucleon.',
      ],
      answer:
        '$E_{lkr} \\approx 7{,}62$ MeV/nucleon, nhỏ hơn của ${}^{56}_{26}\\mathrm{Fe}$ (khoảng $8{,}8$ MeV/nucleon).',
    },
    {
      problem:
        'Cho phản ứng ${}^{7}_{3}\\mathrm{Li} + \\mathrm{X} \\to 2\\,{}^{4}_{2}\\mathrm{He}$. Xác định $\\mathrm{X}$ và năng lượng phản ứng. Cho $m_{\\mathrm{Li}} = 7{,}0144$ amu, $m_{\\mathrm{X}} = 1{,}0073$ amu, $m_{\\mathrm{He}} = 4{,}0015$ amu.',
      steps: [
        'Số nucleon: $7 + A = 2 \\cdot 4$, nên $A = 1$. Điện tích: $3 + Z = 2 \\cdot 2$, nên $Z = 1$: $\\mathrm{X}$ là proton ${}^{1}_{1}\\mathrm{H}$.',
        '$m_t = 7{,}0144 + 1{,}0073 = 8{,}0217$ amu; $m_s = 2 \\cdot 4{,}0015 = 8{,}0030$ amu.',
        '$\\Delta E = 0{,}0187 \\cdot 931{,}5 \\approx 17{,}42$ MeV $> 0$.',
      ],
      answer: '$\\mathrm{X}$ là proton; phản ứng toả khoảng $17{,}42$ MeV.',
    },
    {
      problem:
        'Một mẫu ${}^{210}_{84}\\mathrm{Po}$ (chu kì bán rã $138$ ngày) phóng xạ $\\alpha$. Ban đầu mẫu có $2$ g. Tính khối lượng polonium còn lại và số hạt $\\alpha$ đã phát ra sau $414$ ngày. Cho $N_A = 6{,}02 \\cdot 10^{23}$ mol⁻¹.',
      steps: [
        '$\\dfrac{t}{T} = \\dfrac{414}{138} = 3$, nên $m = 2 \\cdot 2^{-3} = 0{,}25$ g.',
        'Khối lượng đã phân rã $\\Delta m = 2 - 0{,}25 = 1{,}75$ g, ứng với $\\Delta N = \\dfrac{1{,}75}{210} \\cdot 6{,}02 \\cdot 10^{23} \\approx 5{,}02 \\cdot 10^{21}$ hạt nhân.',
        'Mỗi hạt nhân phân rã phát ra một hạt $\\alpha$.',
      ],
      answer:
        'Còn $0{,}25$ g polonium; khoảng $5{,}02 \\cdot 10^{21}$ hạt $\\alpha$ đã được phát ra.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Cho khối lượng hạt nhân ${}^{12}_{6}\\mathrm{C}$ là $11{,}9967$ amu, $m_p = 1{,}0073$ amu, $m_n = 1{,}0087$ amu, $1$ amu $= 931{,}5$ MeV/$c^2$. Năng lượng liên kết của ${}^{12}_{6}\\mathrm{C}$ bằng bao nhiêu MeV (làm tròn đến một chữ số sau dấu phẩy)?',
      answer: 92.5,
      tolerance: 0.05,
      unit: 'MeV',
      hints: ['$\\Delta m = 6m_p + 6m_n - m_{\\mathrm{C}}$.'],
      solution:
        '$\\Delta m = 6 \\cdot 1{,}0073 + 6 \\cdot 1{,}0087 - 11{,}9967 = 0{,}0993$ amu; $E_{lk} = 0{,}0993 \\cdot 931{,}5 \\approx 92{,}5$ MeV.',
    },
    {
      type: 'choice',
      prompt:
        'Ba hạt nhân $\\mathrm{X}$ ($A = 56$), $\\mathrm{Y}$ ($A = 235$), $\\mathrm{Z}$ ($A = 4$) có năng lượng liên kết lần lượt là $492$ MeV, $1\\,786$ MeV và $28{,}4$ MeV. Hạt nhân nào bền vững nhất?',
      options: ['$\\mathrm{X}$', '$\\mathrm{Y}$', '$\\mathrm{Z}$', 'Ba hạt nhân bền như nhau'],
      answer: 0,
      hints: ['So sánh năng lượng liên kết riêng $\\dfrac{E_{lk}}{A}$, không so sánh $E_{lk}$.'],
      solution:
        '$E_{lkr}$: $\\mathrm{X}$: $\\dfrac{492}{56} \\approx 8{,}79$; $\\mathrm{Y}$: $\\dfrac{1\\,786}{235} \\approx 7{,}60$; $\\mathrm{Z}$: $\\dfrac{28{,}4}{4} = 7{,}1$ MeV/nucleon. $\\mathrm{X}$ bền vững nhất, dù $\\mathrm{Y}$ có năng lượng liên kết lớn nhất.',
    },
    {
      type: 'choice',
      prompt:
        'Trong phản ứng ${}^{27}_{13}\\mathrm{Al} + {}^{4}_{2}\\mathrm{He} \\to {}^{30}_{15}\\mathrm{P} + \\mathrm{X}$, hạt $\\mathrm{X}$ là',
      options: ['neutron', 'proton', 'electron', 'hạt $\\alpha$'],
      answer: 0,
      hints: ['Tính số khối và điện tích của $\\mathrm{X}$.'],
      solution:
        '$A = 27 + 4 - 30 = 1$, $Z = 13 + 2 - 15 = 0$: $\\mathrm{X}$ là neutron ${}^{1}_{0}n$.',
    },
    {
      type: 'number',
      prompt:
        'Phản ứng ${}^{27}_{13}\\mathrm{Al} + {}^{4}_{2}\\mathrm{He} \\to {}^{30}_{15}\\mathrm{P} + {}^{1}_{0}n$ có $m_{\\mathrm{Al}} = 26{,}9744$ amu, $m_{\\mathrm{He}} = 4{,}0015$ amu, $m_{\\mathrm{P}} = 29{,}9701$ amu, $m_n = 1{,}0087$ amu. Năng lượng của phản ứng bằng bao nhiêu MeV? (Thu năng lượng thì ghi số âm, làm tròn đến hai chữ số sau dấu phẩy.)',
      answer: -2.7,
      tolerance: 0.02,
      unit: 'MeV',
      hints: ['$\\Delta E = (m_t - m_s) \\cdot 931{,}5$ MeV.'],
      solution:
        '$m_t = 30{,}9759$ amu, $m_s = 30{,}9788$ amu; $\\Delta E = -0{,}0029 \\cdot 931{,}5 \\approx -2{,}70$ MeV: phản ứng thu năng lượng $2{,}70$ MeV.',
    },
    {
      type: 'number',
      prompt:
        'Hạt nhân ${}^{238}_{92}\\mathrm{U}$ sau một chuỗi phóng xạ $\\alpha$ và $\\beta^-$ biến thành hạt nhân bền ${}^{206}_{82}\\mathrm{Pb}$. Có bao nhiêu lần phóng xạ $\\alpha$?',
      answer: 8,
      hints: ['Chỉ phóng xạ $\\alpha$ làm số khối giảm, mỗi lần $4$.'],
      solution: '$238 - 206 = 32 = 4 \\cdot 8$: có $8$ lần phóng xạ $\\alpha$.',
    },
    {
      type: 'number',
      prompt:
        'Cũng trong chuỗi phóng xạ từ ${}^{238}_{92}\\mathrm{U}$ đến ${}^{206}_{82}\\mathrm{Pb}$, có bao nhiêu lần phóng xạ $\\beta^-$?',
      answer: 6,
      hints: [
        '$8$ lần phóng xạ $\\alpha$ làm $Z$ giảm bao nhiêu?',
        'Mỗi lần phóng xạ $\\beta^-$ làm $Z$ tăng $1$.',
      ],
      solution: '$92 - 2 \\cdot 8 + y = 82$, nên $y = 6$ lần phóng xạ $\\beta^-$.',
    },
    {
      type: 'number',
      prompt:
        '${}^{210}_{84}\\mathrm{Po}$ có chu kì bán rã $138$ ngày. Ban đầu có $1$ g. Sau $276$ ngày còn lại bao nhiêu gam?',
      answer: 0.25,
      tolerance: 0.001,
      unit: 'g',
      hints: ['$276$ ngày bằng mấy chu kì bán rã?'],
      solution: '$\\dfrac{t}{T} = 2$, nên $m = 1 \\cdot 2^{-2} = 0{,}25$ g.',
    },
    {
      type: 'number',
      prompt:
        'Sau thời gian bằng $2$ chu kì bán rã, bao nhiêu phần trăm số hạt nhân ban đầu đã bị phân rã?',
      answer: 75,
      unit: '%',
      hints: ['Tính phần còn lại trước: $2^{-2}$.'],
      solution: 'Còn lại $2^{-2} = 25\\%$, nên đã phân rã $100\\% - 25\\% = 75\\%$.',
    },
    {
      type: 'number',
      prompt:
        '${}^{131}_{53}\\mathrm{I}$ có chu kì bán rã $8$ ngày. Sau bao nhiêu ngày thì $87{,}5\\%$ số hạt nhân của một mẫu iodine đã phân rã?',
      answer: 24,
      unit: 'ngày',
      hints: ['Đã phân rã $87{,}5\\%$ nghĩa là còn lại bao nhiêu phần?'],
      solution: 'Còn lại $12{,}5\\% = \\dfrac{1}{8} = 2^{-3}$, nên $t = 3T = 24$ ngày.',
    },
    {
      type: 'number',
      prompt:
        'Một mẫu chứa $2 \\cdot 10^{20}$ hạt nhân ${}^{131}_{53}\\mathrm{I}$ (chu kì bán rã $8$ ngày). Độ phóng xạ của mẫu bằng bao nhiêu $10^{14}$ Bq (làm tròn đến hai chữ số sau dấu phẩy)?',
      answer: 2.01,
      tolerance: 0.02,
      hints: [
        'Đổi $T$ ra giây: $T = 8 \\cdot 86\\,400$ s.',
        '$H = \\lambda N$ với $\\lambda = \\dfrac{\\ln 2}{T}$.',
      ],
      solution:
        '$\\lambda = \\dfrac{0{,}693}{691\\,200} \\approx 1{,}003 \\cdot 10^{-6}$ s⁻¹; $H = 1{,}003 \\cdot 10^{-6} \\cdot 2 \\cdot 10^{20} \\approx 2{,}01 \\cdot 10^{14}$ Bq.',
    },
    {
      type: 'number',
      prompt:
        'Mỗi phản ứng ${}^{2}_{1}\\mathrm{H} + {}^{3}_{1}\\mathrm{H} \\to {}^{4}_{2}\\mathrm{He} + {}^{1}_{0}n$ toả $17{,}6$ MeV. Năng lượng toả ra khi tổng hợp được $1$ g helium bằng bao nhiêu $10^{11}$ J (làm tròn đến hai chữ số sau dấu phẩy)? Cho $N_A = 6{,}02 \\cdot 10^{23}$ mol⁻¹, $1$ MeV $= 1{,}6 \\cdot 10^{-13}$ J.',
      answer: 4.24,
      tolerance: 0.03,
      hints: [
        'Mỗi phản ứng tạo ra một hạt nhân helium; $1$ g helium có $\\dfrac{1}{4} N_A$ hạt nhân.',
      ],
      solution:
        '$N = \\dfrac{6{,}02 \\cdot 10^{23}}{4} = 1{,}505 \\cdot 10^{23}$; $E = 1{,}505 \\cdot 10^{23} \\cdot 17{,}6 \\cdot 1{,}6 \\cdot 10^{-13} \\approx 4{,}24 \\cdot 10^{11}$ J, gấp khoảng $5$ lần năng lượng phân hạch $1$ g uranium.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các tia phóng xạ theo khả năng đâm xuyên tăng dần.',
      items: ['Tia $\\gamma$', 'Tia $\\alpha$', 'Tia $\\beta^-$'],
      answer: [1, 2, 0],
      hints: ['Tia nào bị một tờ giấy chặn lại? Tia nào cần lớp chì dày?'],
      solution:
        'Tia $\\alpha$ bị tờ giấy chặn, tia $\\beta^-$ bị tấm nhôm vài mm chặn, tia $\\gamma$ xuyên qua hàng chục cm bê tông: $\\alpha < \\beta^- < \\gamma$.',
    },
  ],
  takeaways: [
    'Năng lượng liên kết: tính $\\Delta m$ bằng amu rồi nhân $931{,}5$ MeV; so sánh độ bền bằng $E_{lkr} = \\dfrac{E_{lk}}{A}$.',
    'Phản ứng hạt nhân: bảo toàn số nucleon và điện tích (nhớ hệ số trước hạt); $\\Delta E = (m_t - m_s)c^2$.',
    'Phóng xạ: sau $k$ chu kì bán rã còn $\\dfrac{1}{2^k}$; $H = \\lambda N$ với $T$ tính bằng giây.',
  ],
};
