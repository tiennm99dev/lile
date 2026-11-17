/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập giải bài tập vật lí nhiệt: phương trình cân bằng nhiệt Q toả = Q thu, bài toán có chuyển thể (nóng chảy, hoá hơi, ngưng tụ) dùng Q = mcΔt, Q = λm, Q = Lm, và định luật I của nhiệt động lực học ΔU = A + Q.',
  intro:
    'Các bài học của chương đã cho ta đủ công cụ để tính nhiệt lượng trong mọi quá trình: làm nóng, nóng chảy, hoá hơi, và liên hệ nhiệt lượng với công qua định luật I của nhiệt động lực học. Bài này luyện cách phối hợp các công cụ đó để giải những dạng bài tập thường gặp.',
  objectives: [
    'Viết và giải được phương trình cân bằng nhiệt $Q_{\\text{toả}} = Q_{\\text{thu}}$.',
    'Giải được bài toán có chuyển thể, biết kiểm tra chất có chuyển thể hết hay không.',
    'Vận dụng được định luật I của nhiệt động lực học $\\Delta U = A + Q$ với đúng quy ước dấu.',
  ],
  sections: [
    {
      heading: 'Tóm tắt kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Quá trình', 'Công thức'],
          rows: [
            ['Nhiệt độ thay đổi (không chuyển thể)', '$Q = mc\\Delta t$'],
            ['Nóng chảy (đông đặc) ở nhiệt độ nóng chảy', '$Q = \\lambda m$'],
            ['Hoá hơi (ngưng tụ) ở nhiệt độ không đổi', '$Q = Lm$'],
            ['Hệ cô lập trao đổi nhiệt', '$Q_{\\text{toả}} = Q_{\\text{thu}}$'],
            ['Định luật I của nhiệt động lực học', '$\\Delta U = A + Q$'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Quy ước dấu trong $\\Delta U = A + Q$',
          text: 'Vật nhận công: $A > 0$; vật thực hiện công: $A < 0$. Vật nhận nhiệt lượng: $Q > 0$; vật truyền nhiệt lượng: $Q < 0$.',
        },
        {
          type: 'table',
          head: ['Chất', '$c$ (J/kg.K)'],
          rows: [
            ['Nước', '$4\\,200$'],
            ['Nước đá', '$2\\,100$'],
            ['Nhôm', '$880$'],
            ['Sắt', '$440$'],
            ['Đồng', '$390$'],
          ],
          caption:
            'Số liệu dùng trong bài: nước đá có $\\lambda = 3{,}34 \\cdot 10^{5}$ J/kg; nước có $L = 2{,}26 \\cdot 10^{6}$ J/kg ở $100$ °C.',
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
            'Phương trình cân bằng nhiệt: xác định vật toả nhiệt (nóng hơn) và vật thu nhiệt (lạnh hơn); viết nhiệt lượng của từng vật theo nhiệt độ cân bằng $t$, luôn lấy độ lớn (nhiệt độ cao trừ nhiệt độ thấp); cho $Q_{\\text{toả}} = Q_{\\text{thu}}$ rồi giải tìm $t$.',
            'Có chuyển thể: chia quá trình thành từng giai đoạn (làm nóng, chuyển thể, làm nóng tiếp) và cộng nhiệt lượng các giai đoạn.',
            'Có nước đá: trước hết so sánh nhiệt lượng vật nóng toả ra khi hạ xuống $0$ °C với nhiệt lượng cần để nước đá nóng lên tới $0$ °C và tan hết. Nếu đủ, nước đá tan hết và $t > 0$ °C; nếu không đủ, hỗn hợp dừng ở $0$ °C và chỉ một phần nước đá tan.',
            'Định luật I: xác định vật nhận hay thực hiện công, nhận hay truyền nhiệt để đặt dấu cho $A$ và $Q$, rồi tính $\\Delta U = A + Q$.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý đơn vị',
          text: 'Đổi khối lượng ra kg ($300$ g $= 0{,}3$ kg; $1{,}5$ lít nước $\\approx 1{,}5$ kg), thời gian ra giây, kJ ra J trước khi thay số. Với hiệu suất $H$, nhiệt lượng có ích bằng $H$ lần nhiệt lượng nguồn cung cấp.',
        },
      ],
    },
  ],
  explore: {
    title: 'Trộn chất trong nhiệt lượng kế',
    instruction:
      'Chọn vật A (kim loại, nước hay nước đá), khối lượng và nhiệt độ của nó và của nước trong bình. Tự giải phương trình cân bằng nhiệt, nhập nhiệt độ cân bằng dự đoán rồi bấm Kiểm tra. Với nước đá, nhớ kiểm tra xem nước đá có tan hết không.',
  },
  examples: [
    {
      problem:
        'Một nhiệt lượng kế bằng nhôm khối lượng $0{,}1$ kg chứa $0{,}3$ kg nước ở $20$ °C. Thả vào đó một miếng sắt khối lượng $0{,}2$ kg đã nung tới $120$ °C. Bỏ qua trao đổi nhiệt với môi trường, tính nhiệt độ cân bằng. Cho $c_{\\text{nhôm}} = 880$ J/kg.K, $c_{\\text{nước}} = 4\\,200$ J/kg.K, $c_{\\text{sắt}} = 440$ J/kg.K.',
      steps: [
        'Sắt toả nhiệt: $Q_{\\text{toả}} = 0{,}2 \\cdot 440 \\cdot (120 - t) = 88(120 - t)$.',
        'Nhiệt lượng kế và nước thu nhiệt: $Q_{\\text{thu}} = (0{,}1 \\cdot 880 + 0{,}3 \\cdot 4\\,200)(t - 20) = 1\\,348(t - 20)$.',
        '$Q_{\\text{toả}} = Q_{\\text{thu}}$: $10\\,560 - 88t = 1\\,348t - 26\\,960$, nên $1\\,436t = 37\\,520$.',
        '$t = \\dfrac{37\\,520}{1\\,436} \\approx 26{,}1$ °C.',
      ],
      answer: '$t \\approx 26{,}1$ °C.',
    },
    {
      problem:
        'Thả $0{,}1$ kg nước đá ở $-5$ °C vào $0{,}5$ kg nước ở $40$ °C đựng trong bình cách nhiệt (bỏ qua nhiệt dung của bình). Tính nhiệt độ cân bằng. Cho $c_{\\text{đá}} = 2\\,100$ J/kg.K, $c_{\\text{nước}} = 4\\,200$ J/kg.K, $\\lambda = 3{,}34 \\cdot 10^{5}$ J/kg.',
      steps: [
        'Nhiệt lượng để nước đá nóng tới $0$ °C và tan hết: $0{,}1 \\cdot 2\\,100 \\cdot 5 + 3{,}34 \\cdot 10^{5} \\cdot 0{,}1 = 1\\,050 + 33\\,400 = 34\\,450$ J.',
        'Nước hạ từ $40$ °C xuống $0$ °C toả ra tối đa $0{,}5 \\cdot 4\\,200 \\cdot 40 = 84\\,000$ J $> 34\\,450$ J: nước đá tan hết, $t > 0$ °C.',
        'Phương trình cân bằng nhiệt: $0{,}5 \\cdot 4\\,200(40 - t) = 34\\,450 + 0{,}1 \\cdot 4\\,200 \\cdot t$.',
        '$84\\,000 - 2\\,100t = 34\\,450 + 420t$, nên $2\\,520t = 49\\,550$, $t \\approx 19{,}7$ °C.',
      ],
      answer: '$t \\approx 19{,}7$ °C, nước đá tan hết.',
    },
    {
      problem:
        'Khí trong một xi lanh nhận nhiệt lượng $1{,}5$ kJ từ bếp, đồng thời dãn nở đẩy pít-tông, thực hiện công $0{,}6$ kJ. Tính độ biến thiên nội năng của khí.',
      steps: [
        'Khí nhận nhiệt lượng: $Q = +1\\,500$ J.',
        'Khí thực hiện công: $A = -600$ J.',
        '$\\Delta U = A + Q = -600 + 1\\,500 = 900$ J.',
      ],
      answer: '$\\Delta U = 900$ J: nội năng của khí tăng $900$ J.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Quy ước dấu nào sau đây phù hợp với định luật I của nhiệt động lực học $\\Delta U = A + Q$?',
      options: [
        'Vật nhận công: $A > 0$; vật nhận nhiệt lượng: $Q > 0$.',
        'Vật nhận công: $A < 0$; vật nhận nhiệt lượng: $Q < 0$.',
        'Vật thực hiện công: $A > 0$; vật truyền nhiệt lượng: $Q > 0$.',
        'Vật thực hiện công: $A > 0$; vật truyền nhiệt lượng: $Q < 0$.',
      ],
      answer: 0,
      hints: ['Cái gì làm nội năng của vật tăng thì mang dấu dương.'],
      solution:
        'Nhận công và nhận nhiệt đều làm nội năng tăng, nên vật nhận công: $A > 0$, vật nhận nhiệt lượng: $Q > 0$.',
    },
    {
      type: 'choice',
      prompt:
        'Một lượng nước và một lượng rượu có thể tích bằng nhau được cung cấp các nhiệt lượng tương ứng $Q_1$ và $Q_2$ để tăng cùng một nhiệt độ. Cho khối lượng riêng của nước $1\\,000$ kg/m³, của rượu $800$ kg/m³; nhiệt dung riêng của nước $4\\,200$ J/kg.K, của rượu $2\\,500$ J/kg.K. Hệ thức đúng là',
      options: ['$Q_1 = 2{,}1Q_2$', '$Q_1 = Q_2$', '$Q_1 = 1{,}25Q_2$', '$Q_1 = 1{,}68Q_2$'],
      answer: 0,
      hints: [
        'Cùng thể tích $V$: $m = DV$. Lập tỉ số $\\dfrac{Q_1}{Q_2} = \\dfrac{D_1c_1}{D_2c_2}$.',
      ],
      solution:
        '$\\dfrac{Q_1}{Q_2} = \\dfrac{1\\,000 \\cdot 4\\,200}{800 \\cdot 2\\,500} = \\dfrac{4\\,200\\,000}{2\\,000\\,000} = 2{,}1$, nên $Q_1 = 2{,}1Q_2$.',
    },
    {
      type: 'number',
      prompt:
        'Một ấm điện công suất $1\\,000$ W đun $300$ g nước ở $20$ °C. Bỏ qua hao phí, sau bao lâu nước bắt đầu sôi ở áp suất tiêu chuẩn (theo s)? Cho $c = 4\\,200$ J/kg.K.',
      answer: 100.8,
      unit: 's',
      tolerance: 0.1,
      hints: [
        'Tính nhiệt lượng làm nước nóng từ $20$ °C lên $100$ °C.',
        'Thời gian $t = \\dfrac{Q}{\\mathscr{P}}$.',
      ],
      solution:
        '$Q = 0{,}3 \\cdot 4\\,200 \\cdot 80 = 100\\,800$ J; $t = \\dfrac{100\\,800}{1\\,000} = 100{,}8$ s $\\approx 1{,}68$ phút. Thực tế lâu hơn vì có nhiệt lượng hao phí ra môi trường và để làm nóng ấm.',
    },
    {
      type: 'number',
      prompt:
        'Tiếp bài trên: nếu để nước trong ấm sôi thêm $2$ phút thì khối lượng nước còn lại trong ấm là bao nhiêu gam (làm tròn đến một chữ số thập phân)? Cho $L = 2{,}26 \\cdot 10^{6}$ J/kg.',
      answer: 246.9,
      unit: 'g',
      tolerance: 0.15,
      hints: [
        'Khi nước đang sôi, nhiệt lượng ấm cung cấp chỉ làm nước hoá hơi, không làm tăng nhiệt độ.',
        'Khối lượng hoá hơi $m = \\dfrac{\\mathscr{P}t}{L}$, rồi lấy $300$ g trừ đi.',
      ],
      solution:
        '$Q = 1\\,000 \\cdot 120 = 120\\,000$ J; $m = \\dfrac{120\\,000}{2{,}26 \\cdot 10^{6}} \\approx 0{,}0531$ kg $= 53{,}1$ g. Còn lại $300 - 53{,}1 = 246{,}9$ g.',
    },
    {
      type: 'number',
      prompt:
        'Dùng bếp điện đun một ấm nhôm khối lượng $600$ g đựng $1{,}5$ lít nước ở $20$ °C. Sau $35$ phút đã có $20\\%$ lượng nước trong ấm hoá hơi ở nhiệt độ sôi $100$ °C. Biết chỉ $75\\%$ nhiệt lượng bếp toả ra được dùng để đun ấm nước. Tính công suất trung bình của bếp (theo W, làm tròn đến hàng đơn vị). Cho $c_{\\text{nhôm}} = 880$ J/kg.K, $c_{\\text{nước}} = 4\\,200$ J/kg.K, $L = 2{,}26 \\cdot 10^{6}$ J/kg, khối lượng riêng của nước $1$ kg/lít.',
      answer: 777,
      unit: 'W',
      tolerance: 1,
      hints: [
        'Nhiệt lượng có ích gồm: làm nóng ấm nhôm, làm nóng nước lên $100$ °C, làm hoá hơi $20\\%$ lượng nước.',
        'Nhiệt lượng bếp toả ra bằng nhiệt lượng có ích chia cho $0{,}75$; chia tiếp cho $35$ phút $= 2\\,100$ s.',
      ],
      solution:
        '$Q_1 = 0{,}6 \\cdot 880 \\cdot 80 = 42\\,240$ J; $Q_2 = 1{,}5 \\cdot 4\\,200 \\cdot 80 = 504\\,000$ J; $Q_3 = 0{,}3 \\cdot 2{,}26 \\cdot 10^{6} = 678\\,000$ J. Có ích: $1\\,224\\,240$ J; bếp toả ra $\\dfrac{1\\,224\\,240}{0{,}75} = 1\\,632\\,320$ J. $\\mathscr{P} = \\dfrac{1\\,632\\,320}{2\\,100} \\approx 777$ W.',
    },
    {
      type: 'number',
      prompt:
        'Thả một miếng đồng khối lượng $0{,}2$ kg ở $100$ °C vào $0{,}5$ kg nước ở $20$ °C. Bỏ qua nhiệt lượng bình nhận và toả ra môi trường, tính nhiệt độ cân bằng (theo °C, làm tròn đến một chữ số thập phân). Cho $c_{\\text{đồng}} = 390$ J/kg.K, $c_{\\text{nước}} = 4\\,200$ J/kg.K.',
      answer: 22.9,
      unit: '°C',
      tolerance: 0.1,
      hints: [
        'Đồng toả nhiệt: $0{,}2 \\cdot 390(100 - t)$; nước thu nhiệt: $0{,}5 \\cdot 4\\,200(t - 20)$.',
      ],
      solution:
        '$78(100 - t) = 2\\,100(t - 20)$, nên $7\\,800 + 42\\,000 = 2\\,178t$, $t = \\dfrac{49\\,800}{2\\,178} \\approx 22{,}9$ °C.',
    },
    {
      type: 'number',
      prompt:
        'Thả một miếng kim loại khối lượng $0{,}1$ kg đã nung tới $100$ °C vào $0{,}2$ kg nước ở $20$ °C. Khi cân bằng, nhiệt độ là $24$ °C. Bỏ qua nhiệt lượng bình nhận và hao phí, tính nhiệt dung riêng của kim loại (theo J/kg.K, làm tròn đến hàng đơn vị).',
      answer: 442,
      unit: 'J/kg.K',
      tolerance: 1,
      hints: [
        'Nhiệt lượng nước thu: $0{,}2 \\cdot 4\\,200 \\cdot (24 - 20)$.',
        'Bằng nhiệt lượng kim loại toả: $0{,}1 \\cdot c \\cdot (100 - 24)$.',
      ],
      solution:
        '$Q_{\\text{thu}} = 0{,}2 \\cdot 4\\,200 \\cdot 4 = 3\\,360$ J $= 0{,}1 \\cdot c \\cdot 76$, nên $c = \\dfrac{3\\,360}{7{,}6} \\approx 442$ J/kg.K, gần với nhiệt dung riêng của sắt.',
    },
    {
      type: 'number',
      prompt:
        'Thả $50$ g nước đá ở $0$ °C vào $0{,}4$ kg nước ở $30$ °C trong bình cách nhiệt (bỏ qua nhiệt dung của bình). Tính nhiệt độ cân bằng (theo °C, làm tròn đến một chữ số thập phân). Cho $c_{\\text{nước}} = 4\\,200$ J/kg.K, $\\lambda = 3{,}34 \\cdot 10^{5}$ J/kg.',
      answer: 17.8,
      unit: '°C',
      tolerance: 0.1,
      hints: [
        'Kiểm tra: nước hạ xuống $0$ °C toả ra $50\\,400$ J, làm tan hết nước đá cần $16\\,700$ J. Nước đá có tan hết không?',
        'Nước đá tan hết thành nước ở $0$ °C rồi nóng lên tới $t$: $0{,}4 \\cdot 4\\,200(30 - t) = 16\\,700 + 0{,}05 \\cdot 4\\,200 \\cdot t$.',
      ],
      solution:
        '$50\\,400 > 16\\,700$ nên nước đá tan hết. $50\\,400 - 1\\,680t = 16\\,700 + 210t$, nên $1\\,890t = 33\\,700$, $t \\approx 17{,}8$ °C.',
    },
    {
      type: 'number',
      prompt:
        'Thả $0{,}2$ kg nước đá ở $-10$ °C vào $0{,}3$ kg nước ở $20$ °C trong bình cách nhiệt (bỏ qua nhiệt dung của bình). Khi cân bằng, có bao nhiêu gam nước đá đã tan (làm tròn đến một chữ số thập phân)? Cho $c_{\\text{đá}} = 2\\,100$ J/kg.K, $c_{\\text{nước}} = 4\\,200$ J/kg.K, $\\lambda = 3{,}34 \\cdot 10^{5}$ J/kg.',
      answer: 62.9,
      unit: 'g',
      tolerance: 0.15,
      hints: [
        'Nước hạ xuống $0$ °C toả ra $25\\,200$ J; làm nóng nước đá tới $0$ °C cần $4\\,200$ J, làm tan hết cần thêm $66\\,800$ J.',
        'Không đủ để tan hết: hỗn hợp ở $0$ °C. Nhiệt lượng còn lại sau khi làm nóng nước đá dùng để làm tan một phần.',
      ],
      solution:
        '$25\\,200 < 4\\,200 + 66\\,800$ nên nước đá chỉ tan một phần, hỗn hợp ở $0$ °C. Nhiệt lượng làm tan: $25\\,200 - 4\\,200 = 21\\,000$ J; $m = \\dfrac{21\\,000}{3{,}34 \\cdot 10^{5}} \\approx 0{,}0629$ kg $= 62{,}9$ g.',
    },
    {
      type: 'number',
      prompt:
        'Dẫn $10$ g hơi nước ở $100$ °C vào $0{,}2$ kg nước ở $20$ °C trong bình cách nhiệt (bỏ qua nhiệt dung của bình). Hơi nước ngưng tụ hết. Tính nhiệt độ cân bằng (theo °C, làm tròn đến một chữ số thập phân). Cho $L = 2{,}26 \\cdot 10^{6}$ J/kg, $c = 4\\,200$ J/kg.K.',
      answer: 49.4,
      unit: '°C',
      tolerance: 0.1,
      hints: [
        'Hơi nước toả nhiệt hai giai đoạn: ngưng tụ ở $100$ °C ($Lm$), rồi nước ngưng tụ nguội từ $100$ °C xuống $t$.',
        '$0{,}01 \\cdot 2{,}26 \\cdot 10^{6} + 0{,}01 \\cdot 4\\,200(100 - t) = 0{,}2 \\cdot 4\\,200(t - 20)$.',
      ],
      solution:
        '$22\\,600 + 4\\,200 - 42t = 840t - 16\\,800$, nên $882t = 43\\,600$, $t \\approx 49{,}4$ °C.',
    },
    {
      type: 'number',
      prompt:
        'Khí trong xi lanh nhận nhiệt lượng $100$ J và thực hiện công $70$ J đẩy pít-tông. Tính độ biến thiên nội năng của khí (theo J).',
      answer: 30,
      unit: 'J',
      hints: ['Khí nhận nhiệt: $Q > 0$; khí thực hiện công: $A < 0$.'],
      solution: '$\\Delta U = A + Q = -70 + 100 = 30$ J: nội năng tăng $30$ J.',
    },
    {
      type: 'number',
      prompt:
        'Người ta thực hiện công $200$ J để nén khí trong xi lanh, khí truyền ra môi trường nhiệt lượng $50$ J. Tính độ biến thiên nội năng của khí (theo J).',
      answer: 150,
      unit: 'J',
      hints: ['Khí nhận công: $A > 0$; khí truyền nhiệt: $Q < 0$.'],
      solution: '$\\Delta U = A + Q = 200 + (-50) = 150$ J: nội năng tăng $150$ J.',
    },
  ],
  takeaways: [
    'Hệ cô lập: $Q_{\\text{toả}} = Q_{\\text{thu}}$, mỗi nhiệt lượng lấy độ lớn (nhiệt độ cao trừ nhiệt độ thấp).',
    'Có chuyển thể: chia giai đoạn và cộng $mc\\Delta t$, $\\lambda m$, $Lm$; với nước đá, kiểm tra trước xem nước đá có tan hết không.',
    '$\\Delta U = A + Q$: nhận công $A > 0$, thực hiện công $A < 0$; nhận nhiệt $Q > 0$, truyền nhiệt $Q < 0$.',
  ],
};
