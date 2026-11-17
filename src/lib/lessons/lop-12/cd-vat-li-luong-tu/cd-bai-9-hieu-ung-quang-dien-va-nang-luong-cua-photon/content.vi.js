/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hiệu ứng quang điện là hiện tượng ánh sáng thích hợp làm bật electron khỏi bề mặt kim loại; ánh sáng gồm các photon mang năng lượng ε = hf, và theo Einstein hf = A + Wđmax, nên chỉ ánh sáng có bước sóng không lớn hơn giới hạn quang điện λ₀ = hc/A mới gây ra hiện tượng.',
  intro:
    'Chiếu ánh sáng hồ quang vào một tấm kẽm tích điện âm, tấm kẽm mất dần điện tích; chắn chùm sáng bằng một tấm thuỷ tinh, hiện tượng dừng lại ngay, dù ánh sáng vẫn rất mạnh. Mô hình sóng ánh sáng không giải thích được điều này. Einstein đã giải thích nó bằng một ý tưởng táo bạo: ánh sáng gồm những hạt năng lượng gọi là photon.',
  objectives: [
    'Mô tả được thí nghiệm về hiện tượng quang điện và nêu được hiện tượng quang điện là bằng chứng cho tính chất hạt của bức xạ điện từ.',
    'Nêu được khái niệm photon và tính được năng lượng photon $\\varepsilon = hf = \\dfrac{hc}{\\lambda}$.',
    'Giải thích được hiện tượng quang điện dựa trên năng lượng photon và công thoát; tính được giới hạn quang điện $\\lambda_0 = \\dfrac{hc}{A}$.',
    'Vận dụng được công thức Einstein $hf = A + W_{đmax}$ và hệ thức $eU_h = W_{đmax}$; giải thích được vì sao $W_{đmax}$ không phụ thuộc cường độ chùm sáng còn dòng quang điện bão hoà tỉ lệ với cường độ chùm sáng.',
  ],
  sections: [
    {
      heading: 'Hiện tượng quang điện',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm Hertz: gắn một tấm kẽm tích điện âm lên cần của một tĩnh điện kế, kim tĩnh điện kế lệch một góc. Chiếu vào tấm kẽm chùm sáng do hồ quang phát ra (có chứa tia tử ngoại) thì góc lệch của kim giảm dần: tấm kẽm mất bớt điện tích âm, tức là electron đã bị bật ra khỏi tấm kẽm. Chắn chùm sáng hồ quang bằng một tấm thuỷ tinh (hấp thụ mạnh tia tử ngoại) thì hiện tượng không xảy ra.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hiện tượng quang điện',
          text: 'Hiện tượng ánh sáng (bức xạ điện từ) thích hợp làm bật electron ra khỏi bề mặt kim loại gọi là hiện tượng quang điện (hiệu ứng quang điện ngoài). Các electron bật ra gọi là quang electron (electron quang điện).',
        },
        {
          type: 'p',
          text: 'Thí nghiệm với nhiều kim loại cho thấy: với mỗi kim loại, ánh sáng chỉ gây ra hiện tượng quang điện khi bước sóng $\\lambda$ của nó không lớn hơn một giá trị $\\lambda_0$ gọi là giới hạn quang điện của kim loại đó. Với ánh sáng có $\\lambda > \\lambda_0$, dù chùm sáng mạnh đến đâu cũng không có electron nào bật ra. Theo mô hình sóng, chùm sáng càng mạnh thì truyền càng nhiều năng lượng cho electron, nên phải làm electron bật ra; mô hình sóng không giải thích được giới hạn quang điện.',
        },
      ],
    },
    {
      heading: 'Năng lượng của photon',
      blocks: [
        {
          type: 'p',
          text: 'Năm 1900, Planck giả thuyết rằng lượng năng lượng mà mỗi lần một nguyên tử hay phân tử hấp thụ hay phát xạ có giá trị hoàn toàn xác định, gọi là lượng tử năng lượng, bằng $hf$, trong đó $f$ là tần số của ánh sáng bị hấp thụ hay được phát ra, $h = 6{,}625 \\cdot 10^{-34}$ J·s là hằng số Planck. Năm 1905, Einstein phát triển giả thuyết này thành thuyết lượng tử ánh sáng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Thuyết lượng tử ánh sáng (photon)',
          text: 'Ánh sáng được tạo thành bởi các hạt gọi là photon. Với mỗi ánh sáng đơn sắc có tần số $f$, các photon đều giống nhau, mỗi photon mang năng lượng $$\\varepsilon = hf = \\dfrac{hc}{\\lambda}.$$ Trong chân không, photon bay với tốc độ $c = 3 \\cdot 10^8$ m/s dọc theo các tia sáng. Mỗi lần một nguyên tử hay phân tử phát xạ hoặc hấp thụ ánh sáng thì chúng phát ra hoặc hấp thụ một photon. Photon chỉ tồn tại ở trạng thái chuyển động; không có photon đứng yên.',
        },
        {
          type: 'p',
          text: 'Năng lượng photon rất nhỏ nên thường được đo bằng electronvôn: $1$ eV $= 1{,}6 \\cdot 10^{-19}$ J. Chùm sáng càng mạnh thì càng có nhiều photon, nhưng năng lượng của mỗi photon chỉ phụ thuộc tần số (bước sóng) của ánh sáng.',
        },
        {
          type: 'table',
          caption: 'Năng lượng photon của một số bức xạ (giá trị gần đúng)',
          head: ['Bức xạ', 'Bước sóng', 'Năng lượng photon'],
          rows: [
            ['Sóng vô tuyến', 'trên $1$ mm', 'dưới $1{,}2 \\cdot 10^{-3}$ eV'],
            ['Tia hồng ngoại', '$760$ nm đến $1$ mm', 'cỡ $10^{-3}$ eV đến $1{,}6$ eV'],
            ['Ánh sáng nhìn thấy', '$380$ nm đến $760$ nm', '$1{,}6$ eV đến $3{,}3$ eV'],
            ['Tia tử ngoại', '$10$ nm đến $380$ nm', '$3{,}3$ eV đến $124$ eV'],
            ['Tia X', '$10^{-11}$ m đến $10^{-8}$ m', 'cỡ $124$ eV đến $124$ keV'],
          ],
        },
      ],
    },
    {
      heading: 'Giải thích hiện tượng quang điện',
      blocks: [
        {
          type: 'p',
          text: 'Theo Einstein, hiện tượng quang điện xảy ra khi một electron trong kim loại hấp thụ trọn vẹn năng lượng của một photon. Muốn bứt ra khỏi kim loại, electron phải thực hiện một công để thắng lực liên kết, gọi là công thoát $A$; công thoát phụ thuộc bản chất kim loại. Phần năng lượng còn lại trở thành động năng ban đầu của electron; động năng ban đầu lớn nhất khi electron ở ngay bề mặt kim loại và không mất năng lượng trên đường ra.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức Einstein về hiện tượng quang điện',
          text: '$$hf = \\dfrac{hc}{\\lambda} = A + W_{đmax}, \\qquad W_{đmax} = \\dfrac{1}{2}mv_{0max}^2$$ trong đó $A$ là công thoát của kim loại, $W_{đmax}$ là động năng ban đầu cực đại của quang electron, $m = 9{,}1 \\cdot 10^{-31}$ kg là khối lượng electron.',
        },
        {
          type: 'list',
          items: [
            'Giới hạn quang điện: electron chỉ bật ra khi $\\varepsilon \\ge A$, tức là $\\dfrac{hc}{\\lambda} \\ge A$, hay $\\lambda \\le \\lambda_0$ với $\\lambda_0 = \\dfrac{hc}{A}$. Một photon có năng lượng nhỏ hơn $A$ không giúp được electron bứt ra, dù có bao nhiêu photon như vậy.',
            'Động năng ban đầu cực đại $W_{đmax} = hf - A$ chỉ phụ thuộc tần số (bước sóng) của ánh sáng kích thích và bản chất kim loại, không phụ thuộc cường độ chùm sáng.',
            'Số quang electron bật ra mỗi giây tỉ lệ với số photon tới mỗi giây, tức tỉ lệ với cường độ chùm sáng kích thích (với ánh sáng có $\\lambda \\le \\lambda_0$).',
          ],
        },
        {
          type: 'table',
          caption: 'Giới hạn quang điện của một số kim loại',
          head: ['Kim loại', '$\\lambda_0$ (μm)', 'Kim loại', '$\\lambda_0$ (μm)'],
          rows: [
            ['Bạc', '$0{,}26$', 'Canxi', '$0{,}43$'],
            ['Đồng', '$0{,}30$', 'Natri', '$0{,}50$'],
            ['Kẽm', '$0{,}35$', 'Kali', '$0{,}55$'],
            ['Nhôm', '$0{,}36$', 'Xesi', '$0{,}58$'],
          ],
        },
        {
          type: 'p',
          text: 'Các kim loại thông thường (bạc, đồng, kẽm, nhôm) có giới hạn quang điện trong vùng tử ngoại; các kim loại kiềm và kiềm thổ (canxi, natri, kali, xesi) có giới hạn quang điện trong vùng ánh sáng nhìn thấy. Vì thế ánh sáng nhìn thấy không gây ra hiện tượng quang điện ở tấm kẽm trong thí nghiệm Hertz, còn tia tử ngoại thì có.',
        },
      ],
    },
    {
      heading: 'Tế bào quang điện. Hiệu điện thế hãm và dòng quang điện bão hoà',
      blocks: [
        {
          type: 'p',
          text: 'Tế bào quang điện là một bình chân không có catot (K) phủ kim loại cần nghiên cứu và anot (A). Chiếu ánh sáng thích hợp vào catot và đặt hiệu điện thế $U_{AK}$ giữa anot và catot, các quang electron chạy về anot tạo thành dòng quang điện, đo bằng micrôampe kế.',
        },
        {
          type: 'list',
          items: [
            'Khi $U_{AK}$ đủ lớn, mọi quang electron bật ra đều về được anot: cường độ dòng quang điện đạt giá trị bão hoà $I_{bh} = n_e e$, với $n_e$ là số quang electron bật ra khỏi catot mỗi giây. $I_{bh}$ tỉ lệ với cường độ chùm sáng kích thích.',
            'Khi $U_{AK} < 0$, điện trường cản các electron. Dòng quang điện triệt tiêu khi $U_{AK} = -U_h$; $U_h$ gọi là hiệu điện thế hãm. Khi đó cả electron nhanh nhất cũng bị đẩy lại: $$eU_h = W_{đmax} = \\dfrac{1}{2}mv_{0max}^2.$$',
            'Với cùng một ánh sáng, tăng cường độ chùm sáng thì $I_{bh}$ tăng nhưng $U_h$ không đổi; giảm bước sóng ánh sáng thì $U_h$ tăng.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ý nghĩa',
          text: 'Hiện tượng quang điện là bằng chứng cho tính chất hạt của bức xạ điện từ: ánh sáng trao năng lượng cho electron theo từng phần $hf$ chứ không liên tục. Hiện tượng này được ứng dụng trong tế bào quang điện, cảm biến ánh sáng, một số thiết bị đo ánh sáng rất yếu.',
        },
      ],
    },
    {
      heading: 'Dự án: Khảo sát dòng quang điện',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: đo đặc trưng vôn – ampe của một tế bào quang điện, xác định hiệu điện thế hãm và dòng quang điện bão hoà với ánh sáng có màu khác nhau. Dụng cụ: hộp thí nghiệm tế bào quang điện (catot phủ hợp kim nhạy sáng, che kín ánh sáng ngoài), các đèn LED đỏ, lục, lam, nguồn điện một chiều, biến trở, micrôampe kế, vôn kế, dây nối.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Lắp mạch: tế bào quang điện mắc nối tiếp với micrôampe kế và biến trở, vôn kế đo $U_{AK}$. Giải thích vì sao khi tăng biến trở thì $U_{AK}$ giảm.',
            'Lần lượt chiếu đèn LED đỏ, lục, lam, giữ $U_{AK}$ trong khoảng $3$ V đến $9$ V; ghi số chỉ micrôampe kế với mỗi màu.',
            'Dùng đèn LED lục hoặc lam, điều chỉnh để micrôampe kế chỉ $0$ và ghi $U_{AK}$; rồi tăng dần $U_{AK}$ qua ít nhất $6$ giá trị, đến khi hai lần đo cuối cường độ dòng điện hầu như không đổi.',
            'Vẽ đồ thị $I$ theo $U_{AK}$, xác định $U_h$ và $I_{bh}$; tính $W_{đmax} = eU_h$ và $v_{0max}$. Lặp lại với chùm sáng mạnh hơn (đặt đèn gần hơn) và so sánh.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Nộp bảng số liệu, đồ thị đặc trưng vôn – ampe, các giá trị $U_h$, $I_{bh}$ tìm được, và nhận xét: màu ánh sáng ảnh hưởng thế nào đến $U_h$, độ sáng ảnh hưởng thế nào đến $I_{bh}$; so sánh với công thức Einstein.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tế bào quang điện ảo',
    instruction:
      'Chọn kim loại làm catot, thay đổi bước sóng ánh sáng, số photon tới mỗi giây và hiệu điện thế $U_{AK}$. Bật đèn, đếm electron bật ra, tới anot hoặc bị đẩy về catot, và theo dõi điểm làm việc trên đường đặc trưng vôn – ampe.',
  },
  examples: [
    {
      problem:
        'Giới hạn quang điện của đồng là $0{,}30$ μm, của kẽm là $0{,}35$ μm. Tính công thoát electron của mỗi kim loại theo J và eV. Lấy $h = 6{,}625 \\cdot 10^{-34}$ J·s, $c = 3 \\cdot 10^8$ m/s.',
      steps: [
        'Công thoát: $A = \\dfrac{hc}{\\lambda_0}$.',
        'Đồng: $A = \\dfrac{6{,}625 \\cdot 10^{-34} \\cdot 3 \\cdot 10^8}{0{,}30 \\cdot 10^{-6}} = 6{,}625 \\cdot 10^{-19}$ J $\\approx 4{,}14$ eV.',
        'Kẽm: $A = \\dfrac{6{,}625 \\cdot 10^{-34} \\cdot 3 \\cdot 10^8}{0{,}35 \\cdot 10^{-6}} \\approx 5{,}68 \\cdot 10^{-19}$ J $\\approx 3{,}55$ eV.',
      ],
      answer:
        '$A_{Cu} \\approx 6{,}63 \\cdot 10^{-19}$ J $\\approx 4{,}14$ eV; $A_{Zn} \\approx 5{,}68 \\cdot 10^{-19}$ J $\\approx 3{,}55$ eV.',
    },
    {
      problem:
        'Chiếu bức xạ có bước sóng $0{,}25$ μm vào một tấm đồng ($\\lambda_0 = 0{,}30$ μm). Tính động năng ban đầu cực đại, tốc độ ban đầu cực đại của quang electron và hiệu điện thế hãm.',
      steps: [
        'Năng lượng photon: $\\varepsilon = \\dfrac{hc}{\\lambda} = \\dfrac{1{,}9875 \\cdot 10^{-25}}{0{,}25 \\cdot 10^{-6}} = 7{,}95 \\cdot 10^{-19}$ J; $\\varepsilon > A = 6{,}625 \\cdot 10^{-19}$ J nên có hiện tượng quang điện.',
        'Theo công thức Einstein: $W_{đmax} = \\varepsilon - A = 1{,}325 \\cdot 10^{-19}$ J.',
        '$v_{0max} = \\sqrt{\\dfrac{2W_{đmax}}{m}} = \\sqrt{\\dfrac{2 \\cdot 1{,}325 \\cdot 10^{-19}}{9{,}1 \\cdot 10^{-31}}} \\approx 5{,}4 \\cdot 10^5$ m/s.',
        '$U_h = \\dfrac{W_{đmax}}{e} = \\dfrac{1{,}325 \\cdot 10^{-19}}{1{,}6 \\cdot 10^{-19}} \\approx 0{,}83$ V.',
      ],
      answer:
        '$W_{đmax} \\approx 1{,}33 \\cdot 10^{-19}$ J, $v_{0max} \\approx 5{,}4 \\cdot 10^5$ m/s, $U_h \\approx 0{,}83$ V.',
    },
    {
      problem:
        'Một tế bào quang điện có catot phủ hợp kim Sb – Cs. Chiếu ánh sáng xanh lam vào catot thì đo được hiệu điện thế hãm $U_h = 0{,}8$ V và dòng quang điện bão hoà $I_{bh} = 3{,}2$ μA. Tính tốc độ ban đầu cực đại của quang electron và số electron bật ra khỏi catot mỗi giây.',
      steps: [
        'Từ $eU_h = \\dfrac{1}{2}mv_{0max}^2$: $v_{0max} = \\sqrt{\\dfrac{2eU_h}{m}} = \\sqrt{\\dfrac{2 \\cdot 1{,}6 \\cdot 10^{-19} \\cdot 0{,}8}{9{,}1 \\cdot 10^{-31}}} \\approx 5{,}3 \\cdot 10^5$ m/s.',
        'Từ $I_{bh} = n_e e$: $n_e = \\dfrac{3{,}2 \\cdot 10^{-6}}{1{,}6 \\cdot 10^{-19}} = 2 \\cdot 10^{13}$ electron mỗi giây.',
      ],
      answer: '$v_{0max} \\approx 5{,}3 \\cdot 10^5$ m/s; $n_e = 2 \\cdot 10^{13}$ electron/s.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hiện tượng quang điện là hiện tượng',
      options: [
        'ánh sáng thích hợp làm bật electron ra khỏi bề mặt kim loại',
        'kim loại bị nung nóng phát ra ánh sáng',
        'electron đập vào kim loại làm kim loại phát ra tia X',
        'ánh sáng bị lệch hướng khi đi qua mép một tấm kim loại',
      ],
      answer: 0,
      hints: ['Nhớ lại thí nghiệm Hertz với tấm kẽm tích điện âm: tấm kẽm mất gì?'],
      solution:
        'Trong thí nghiệm Hertz, ánh sáng hồ quang làm electron bật ra khỏi tấm kẽm. Hiện tượng quang điện là hiện tượng ánh sáng thích hợp làm bật electron ra khỏi bề mặt kim loại.',
    },
    {
      type: 'number',
      prompt:
        'Tính năng lượng của một photon ánh sáng có bước sóng $0{,}5$ μm (theo đơn vị $10^{-19}$ J). Lấy $h = 6{,}625 \\cdot 10^{-34}$ J·s, $c = 3 \\cdot 10^8$ m/s.',
      answer: 3.975,
      tolerance: 0.01,
      hints: ['$\\varepsilon = \\dfrac{hc}{\\lambda}$, nhớ đổi $0{,}5$ μm $= 5 \\cdot 10^{-7}$ m.'],
      solution:
        '$\\varepsilon = \\dfrac{6{,}625 \\cdot 10^{-34} \\cdot 3 \\cdot 10^8}{5 \\cdot 10^{-7}} = 3{,}975 \\cdot 10^{-19}$ J.',
    },
    {
      type: 'number',
      prompt:
        'Năng lượng photon ở câu trên bằng bao nhiêu electronvôn (làm tròn đến hai chữ số thập phân)? Lấy $1$ eV $= 1{,}6 \\cdot 10^{-19}$ J.',
      answer: 2.48,
      tolerance: 0.01,
      unit: 'eV',
      hints: ['Chia năng lượng tính theo jun cho $1{,}6 \\cdot 10^{-19}$.'],
      solution:
        '$\\varepsilon = \\dfrac{3{,}975 \\cdot 10^{-19}}{1{,}6 \\cdot 10^{-19}} \\approx 2{,}48$ eV.',
    },
    {
      type: 'number',
      prompt:
        'Một kim loại có công thoát electron $A = 3{,}975 \\cdot 10^{-19}$ J. Giới hạn quang điện của kim loại đó là bao nhiêu micrômét?',
      answer: 0.5,
      tolerance: 0.005,
      unit: 'μm',
      hints: ['$\\lambda_0 = \\dfrac{hc}{A}$.'],
      solution:
        '$\\lambda_0 = \\dfrac{6{,}625 \\cdot 10^{-34} \\cdot 3 \\cdot 10^8}{3{,}975 \\cdot 10^{-19}} = 5 \\cdot 10^{-7}$ m $= 0{,}5$ μm.',
    },
    {
      type: 'multi',
      prompt:
        'Chiếu ánh sáng tím có bước sóng $0{,}40$ μm lần lượt vào các tấm kim loại sau. Chọn tất cả các kim loại xảy ra hiện tượng quang điện (dùng bảng giới hạn quang điện trong bài).',
      options: ['Kali', 'Natri', 'Kẽm', 'Đồng', 'Bạc'],
      answers: [0, 1],
      hints: ['Hiện tượng quang điện xảy ra khi $\\lambda \\le \\lambda_0$.'],
      solution:
        'Kali ($0{,}55$ μm) và natri ($0{,}50$ μm) có $\\lambda_0 \\ge 0{,}40$ μm nên xảy ra hiện tượng quang điện. Kẽm ($0{,}35$ μm), đồng ($0{,}30$ μm), bạc ($0{,}26$ μm) có $\\lambda_0 < 0{,}40$ μm nên không.',
    },
    {
      type: 'number',
      prompt:
        'Chiếu bức xạ tử ngoại có bước sóng $0{,}20$ μm vào một tấm bạc có giới hạn quang điện $0{,}26$ μm. Tính hiệu điện thế hãm (làm tròn đến hai chữ số thập phân).',
      answer: 1.43,
      tolerance: 0.01,
      unit: 'V',
      hints: [
        '$W_{đmax} = hc\\left(\\dfrac{1}{\\lambda} - \\dfrac{1}{\\lambda_0}\\right)$.',
        'Rồi $U_h = \\dfrac{W_{đmax}}{e}$.',
      ],
      solution:
        '$W_{đmax} = 1{,}9875 \\cdot 10^{-25} \\left(\\dfrac{1}{0{,}2 \\cdot 10^{-6}} - \\dfrac{1}{0{,}26 \\cdot 10^{-6}}\\right) \\approx 2{,}293 \\cdot 10^{-19}$ J, nên $U_h = \\dfrac{2{,}293 \\cdot 10^{-19}}{1{,}6 \\cdot 10^{-19}} \\approx 1{,}43$ V.',
    },
    {
      type: 'number',
      prompt:
        'Hiệu điện thế hãm của một tế bào quang điện là $1{,}5$ V. Tính tốc độ ban đầu cực đại của quang electron (theo đơn vị $10^5$ m/s, làm tròn đến hai chữ số thập phân).',
      answer: 7.26,
      tolerance: 0.01,
      hints: ['$eU_h = \\dfrac{1}{2}mv_{0max}^2$.'],
      solution:
        '$v_{0max} = \\sqrt{\\dfrac{2eU_h}{m}} = \\sqrt{\\dfrac{2 \\cdot 1{,}6 \\cdot 10^{-19} \\cdot 1{,}5}{9{,}1 \\cdot 10^{-31}}} \\approx 7{,}26 \\cdot 10^5$ m/s.',
    },
    {
      type: 'choice',
      prompt:
        'Giữ nguyên bước sóng ánh sáng kích thích (nhỏ hơn giới hạn quang điện) và tăng cường độ chùm sáng chiếu vào catot. Khi đó',
      options: [
        'dòng quang điện bão hoà tăng, động năng ban đầu cực đại của quang electron không đổi',
        'dòng quang điện bão hoà không đổi, động năng ban đầu cực đại tăng',
        'cả dòng quang điện bão hoà và động năng ban đầu cực đại đều tăng',
        'hiệu điện thế hãm tăng',
      ],
      answer: 0,
      hints: [
        'Chùm sáng mạnh hơn nghĩa là nhiều photon hơn; năng lượng mỗi photon có thay đổi không?',
      ],
      solution:
        'Cường độ tăng thì số photon tới mỗi giây tăng, số quang electron tăng nên $I_{bh}$ tăng. Năng lượng mỗi photon $hf$ không đổi nên $W_{đmax} = hf - A$ và $U_h$ không đổi.',
    },
    {
      type: 'number',
      prompt:
        'Dòng quang điện bão hoà trong một tế bào quang điện là $4{,}8$ μA. Mỗi giây có bao nhiêu quang electron bật ra khỏi catot (theo đơn vị $10^{13}$)?',
      answer: 3,
      tolerance: 0.01,
      hints: ['$I_{bh} = n_e e$.'],
      solution:
        '$n_e = \\dfrac{4{,}8 \\cdot 10^{-6}}{1{,}6 \\cdot 10^{-19}} = 3 \\cdot 10^{13}$ electron/s.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi kết quả thí nghiệm với cách giải thích bằng thuyết photon.',
      left: [
        'Ánh sáng có $\\lambda > \\lambda_0$ không làm bật electron dù rất mạnh',
        'Động năng ban đầu cực đại không phụ thuộc cường độ chùm sáng',
        'Dòng quang điện bão hoà tỉ lệ với cường độ chùm sáng',
      ],
      right: [
        'Mỗi photon có năng lượng nhỏ hơn công thoát, electron chỉ hấp thụ một photon',
        'Mỗi electron nhận năng lượng $hf$ của một photon, $W_{đmax} = hf - A$',
        'Số electron bật ra tỉ lệ với số photon tới mỗi giây',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Mỗi electron chỉ hấp thụ trọn vẹn một photon.'],
      solution:
        'Electron hấp thụ một photon: nếu $hf < A$ thì không bứt ra được (giới hạn quang điện); phần dư $hf - A$ là $W_{đmax}$, chỉ phụ thuộc $f$; nhiều photon hơn thì nhiều electron hơn nên $I_{bh}$ tăng.',
    },
    {
      type: 'choice',
      prompt: 'Hiện tượng quang điện là bằng chứng cho',
      options: [
        'tính chất hạt của bức xạ điện từ',
        'tính chất sóng của ánh sáng',
        'tính chất sóng của electron',
        'sự tồn tại của hạt nhân nguyên tử',
      ],
      answer: 0,
      hints: ['Ánh sáng trao năng lượng cho electron từng phần $hf$ hay liên tục?'],
      solution:
        'Ánh sáng trao năng lượng cho electron theo từng phần $hf$ (từng photon); điều này chỉ giải thích được khi coi ánh sáng gồm các hạt photon. Hiện tượng quang điện là bằng chứng cho tính chất hạt của bức xạ điện từ.',
    },
  ],
  takeaways: [
    'Hiện tượng quang điện: ánh sáng thích hợp làm bật electron ra khỏi bề mặt kim loại; nó chỉ xảy ra khi $\\lambda \\le \\lambda_0$.',
    'Ánh sáng gồm các photon, mỗi photon mang năng lượng $\\varepsilon = hf = \\dfrac{hc}{\\lambda}$; $1$ eV $= 1{,}6 \\cdot 10^{-19}$ J.',
    'Công thức Einstein: $hf = A + W_{đmax}$; giới hạn quang điện $\\lambda_0 = \\dfrac{hc}{A}$.',
    'Hiệu điện thế hãm: $eU_h = W_{đmax} = \\dfrac{1}{2}mv_{0max}^2$, không phụ thuộc cường độ chùm sáng.',
    'Dòng quang điện bão hoà $I_{bh} = n_e e$ tỉ lệ với cường độ chùm sáng kích thích.',
    'Hiện tượng quang điện là bằng chứng cho tính chất hạt của bức xạ điện từ.',
  ],
};
