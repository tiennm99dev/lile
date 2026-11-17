/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Trong tinh thể chất rắn, các mức năng lượng của electron tạo thành các vùng năng lượng cho phép ngăn cách bởi vùng cấm; độ rộng vùng cấm giữa vùng hoá trị và vùng dẫn phân biệt kim loại, bán dẫn và điện môi, và giải thích vì sao điện trở kim loại tăng còn điện trở bán dẫn giảm khi nhiệt độ tăng hoặc khi được chiếu sáng thích hợp.',
  intro:
    'Khi bị đốt nóng, dây đồng dẫn điện kém đi, còn một thanh silic lại dẫn điện tốt hơn. Một quang trở trong đèn đường tự động có điện trở hàng chục kilôôm lúc trời tối nhưng chỉ vài trăm ôm khi có nắng. Cùng là chất rắn, vì sao chúng phản ứng với nhiệt và ánh sáng khác nhau đến vậy?',
  objectives: [
    'Mô tả được sự hình thành các vùng năng lượng trong chất rắn theo mô hình vùng năng lượng đơn giản.',
    'Nêu được khái niệm vùng hoá trị, vùng dẫn, vùng cấm; phân biệt được kim loại, bán dẫn, điện môi theo độ rộng vùng cấm.',
    'Sử dụng lí thuyết vùng năng lượng giải thích được sự phụ thuộc của điện trở kim loại và bán dẫn vào nhiệt độ.',
    'Giải thích được sự phụ thuộc của điện trở quang (LDR) vào cường độ ánh sáng.',
  ],
  sections: [
    {
      heading: 'Vùng năng lượng trong tinh thể chất rắn',
      blocks: [
        {
          type: 'p',
          text: 'Trong một nguyên tử cô lập, electron chỉ có thể có những mức năng lượng gián đoạn, xác định (Bài 11). Trong tinh thể chất rắn, các nguyên tử ở rất gần nhau và tương tác với nhau, nên mỗi mức năng lượng của nguyên tử tách thành rất nhiều mức nằm rất sát nhau. Các mức sát nhau đó tạo thành một vùng năng lượng.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Vùng năng lượng cho phép và vùng cấm',
          text: 'Các khoảng năng lượng mà electron trong tinh thể có thể có gọi là vùng năng lượng cho phép. Giữa hai vùng cho phép là một khoảng năng lượng mà electron không thể có, gọi là vùng cấm.',
        },
        {
          type: 'list',
          items: [
            'Vùng hoá trị: vùng năng lượng cho phép cao nhất có các electron hoá trị lấp đầy (ở nhiệt độ rất thấp). Electron trong vùng hoá trị liên kết với nguyên tử, không tham gia dẫn điện.',
            'Vùng dẫn: vùng năng lượng cho phép nằm ngay trên vùng hoá trị. Electron ở vùng dẫn chuyển động tự do trong tinh thể và tham gia dẫn điện.',
            'Vùng cấm: khoảng năng lượng giữa đáy vùng dẫn và đỉnh vùng hoá trị; độ rộng của nó kí hiệu là $E_g$.',
          ],
        },
        {
          type: 'p',
          text: 'Muốn một electron từ vùng hoá trị lên vùng dẫn, phải cung cấp cho nó năng lượng ít nhất bằng $E_g$, do chuyển động nhiệt hoặc do hấp thụ photon. Khi electron rời vùng hoá trị, nó để lại một chỗ trống mang điện dương gọi là lỗ trống; lỗ trống cũng tham gia dẫn điện. Electron trong vùng dẫn và lỗ trống trong vùng hoá trị gọi là các hạt tải điện.',
        },
      ],
    },
    {
      heading: 'Kim loại, bán dẫn và điện môi',
      blocks: [
        {
          type: 'table',
          caption: 'Phân loại chất rắn theo mô hình vùng năng lượng',
          head: ['Loại chất', 'Sơ đồ vùng năng lượng', 'Ví dụ'],
          rows: [
            [
              'Kim loại',
              'Vùng chứa electron hoá trị chỉ được lấp đầy một phần, hoặc chồng lên vùng dẫn: luôn có rất nhiều electron tự do',
              'Đồng, bạc, nhôm',
            ],
            [
              'Bán dẫn',
              'Vùng cấm hẹp ($E_g$ cỡ $1$ eV): ở nhiệt độ thường đã có một ít electron nhảy lên vùng dẫn',
              'Silic ($E_g \\approx 1{,}12$ eV), germani ($E_g \\approx 0{,}66$ eV)',
            ],
            [
              'Điện môi',
              'Vùng cấm rộng ($E_g$ cỡ vài electronvôn trở lên): hầu như không có electron nào lên được vùng dẫn',
              'Kim cương ($E_g \\approx 5{,}5$ eV), thuỷ tinh, sứ',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Ở nhiệt độ phòng, năng lượng chuyển động nhiệt của mỗi electron chỉ cỡ vài phần trăm electronvôn. Vì thế qua vùng cấm cỡ $1$ eV chỉ có một phần rất nhỏ electron (ở silic khoảng $10^{10}$ electron trong mỗi $\\text{cm}^3$, trong khi đồng có khoảng $8{,}5 \\cdot 10^{22}$ electron tự do trong mỗi $\\text{cm}^3$), và qua vùng cấm cỡ $5$ eV thì gần như không có electron nào.',
        },
      ],
    },
    {
      heading: 'Điện trở phụ thuộc nhiệt độ và ánh sáng',
      blocks: [
        {
          type: 'list',
          items: [
            'Kim loại: trong khoảng nhiệt độ không quá cao, mật độ electron tự do gần như không đổi. Khi nhiệt độ tăng, các ion ở nút mạng dao động mạnh hơn, electron va chạm với chúng thường xuyên hơn, nên điện trở tăng. Gần đúng: $R = R_0[1 + \\alpha(t - t_0)]$, với đồng $\\alpha \\approx 4{,}3 \\cdot 10^{-3}\\ \\text{K}^{-1}$.',
            'Bán dẫn: khi nhiệt độ tăng, nhiều electron nhận đủ năng lượng để chuyển từ vùng hoá trị lên vùng dẫn, đồng thời số lỗ trống tăng. Mật độ hạt tải điện tăng rất nhanh nên điện trở giảm. Nhiệt điện trở (thermistor) dùng tính chất này để đo nhiệt độ.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hiện tượng quang dẫn',
          text: 'Khi chiếu vào bán dẫn ánh sáng có năng lượng photon $hf \\ge E_g$, mỗi photon bị hấp thụ có thể đưa một electron từ vùng hoá trị lên vùng dẫn và tạo ra một lỗ trống. Số hạt tải điện tăng nên điện trở của bán dẫn giảm. Điều kiện $hf \\ge E_g$ tương đương $\\lambda \\le \\dfrac{hc}{E_g}$: chỉ ánh sáng có bước sóng đủ ngắn mới gây ra hiện tượng quang dẫn.',
        },
        {
          type: 'p',
          text: 'Điện trở quang (quang trở, LDR) là một lớp bán dẫn (thường là cadimi sunfua, $E_g \\approx 2{,}4$ eV) mắc giữa hai điện cực. Trong tối, điện trở của nó rất lớn (hàng chục đến hàng trăm kilôôm); khi được chiếu sáng, điện trở giảm xuống chỉ còn vài trăm ôm. Chùm sáng càng mạnh thì càng nhiều photon, càng nhiều hạt tải điện, điện trở càng nhỏ. LDR được dùng trong đèn đường tự động, cảm biến ánh sáng, máy đo ánh sáng.',
        },
      ],
    },
    {
      heading: 'Dự án: Khảo sát quang trở và nhiệt điện trở',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: đo sự thay đổi điện trở của một quang trở theo độ sáng và của một nhiệt điện trở theo nhiệt độ, rồi lắp mạch đèn tự bật khi trời tối. Dụng cụ: quang trở, nhiệt điện trở NTC, đồng hồ đo điện đa năng, đèn bàn, cốc nước nóng và nhiệt kế, pin $9$ V, transistor, đèn LED và điện trở bảo vệ, bảng mạch cắm.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đo điện trở của quang trở khi che kín, trong ánh sáng phòng và khi đặt đèn bàn ở các khoảng cách $50$ cm, $30$ cm, $10$ cm. Lặp lại khi che đèn bằng giấy bóng kính đỏ và xanh lam.',
            'Bọc nhiệt điện trở trong túi nilon, nhúng vào nước ở các nhiệt độ khác nhau; ghi nhiệt độ và điện trở. Làm tương tự với một cuộn dây đồng mảnh để so sánh.',
            'Vẽ đồ thị điện trở theo khoảng cách đến đèn và theo nhiệt độ; dùng mô hình vùng năng lượng giải thích hình dạng các đồ thị.',
            'Lắp mạch đèn LED tự sáng khi trời tối dùng quang trở và transistor; thử che quang trở để kiểm tra.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Nộp bảng số liệu, các đồ thị, sơ đồ và ảnh mạch đèn tự động, kèm giải thích: vì sao điện trở quang trở giảm khi chiếu sáng, vì sao ánh sáng đỏ tác dụng yếu hơn ánh sáng lam, và vì sao nhiệt điện trở và dây đồng thay đổi điện trở theo hai chiều ngược nhau.',
        },
      ],
    },
  ],
  explore: {
    title: 'Electron vượt vùng cấm',
    instruction:
      'Chọn vật liệu, thay đổi nhiệt độ và chiếu ánh sáng có năng lượng photon khác nhau. Quan sát electron lên vùng dẫn, lỗ trống trong vùng hoá trị và điện trở của mẫu so với lúc $300$ K không chiếu sáng.',
  },
  examples: [
    {
      problem:
        'Silic có độ rộng vùng cấm $E_g = 1{,}12$ eV. Tính bước sóng dài nhất của ánh sáng có thể gây ra hiện tượng quang dẫn ở silic. Ánh sáng đỏ có bước sóng $0{,}65$ μm có gây ra hiện tượng này không?',
      steps: [
        'Điều kiện: $\\dfrac{hc}{\\lambda} \\ge E_g$, nên $\\lambda \\le \\lambda_{max} = \\dfrac{hc}{E_g}$.',
        '$\\lambda_{max} = \\dfrac{6{,}625 \\cdot 10^{-34} \\cdot 3 \\cdot 10^8}{1{,}12 \\cdot 1{,}6 \\cdot 10^{-19}} \\approx 1{,}11 \\cdot 10^{-6}$ m $= 1{,}11$ μm (vùng hồng ngoại).',
        'Ánh sáng đỏ có $\\lambda = 0{,}65$ μm $< 1{,}11$ μm nên gây ra được hiện tượng quang dẫn ở silic.',
      ],
      answer: '$\\lambda_{max} \\approx 1{,}11$ μm; ánh sáng đỏ gây ra được hiện tượng quang dẫn.',
    },
    {
      problem:
        'Một cuộn dây đồng có điện trở $10\\ \\Omega$ ở $27\\ ^\\circ\\text{C}$. Hệ số nhiệt điện trở của đồng là $\\alpha = 4{,}3 \\cdot 10^{-3}\\ \\text{K}^{-1}$. Tính điện trở của cuộn dây ở $77\\ ^\\circ\\text{C}$ và giải thích vì sao điện trở tăng.',
      steps: [
        '$R = R_0[1 + \\alpha(t - t_0)] = 10 \\cdot [1 + 4{,}3 \\cdot 10^{-3} \\cdot (77 - 27)] = 10 \\cdot 1{,}215 = 12{,}15\\ \\Omega$.',
        'Mật độ electron tự do của đồng gần như không đổi; nhiệt độ tăng làm các ion ở nút mạng dao động mạnh hơn, cản trở chuyển động của electron nhiều hơn, nên điện trở tăng.',
      ],
      answer: '$R \\approx 12{,}2\\ \\Omega$.',
    },
    {
      problem:
        'Một quang trở được mắc vào nguồn điện có hiệu điện thế $6$ V. Trong tối điện trở của nó là $30\\ \\text{k}\\Omega$, khi được chiếu sáng là $300\\ \\Omega$. Tính cường độ dòng điện qua quang trở trong hai trường hợp.',
      steps: [
        'Trong tối: $I = \\dfrac{U}{R} = \\dfrac{6}{30\\,000} = 2 \\cdot 10^{-4}$ A $= 0{,}2$ mA.',
        'Khi chiếu sáng: $I = \\dfrac{6}{300} = 0{,}02$ A $= 20$ mA, lớn gấp $100$ lần, vì ánh sáng đã tạo thêm rất nhiều hạt tải điện trong lớp bán dẫn.',
      ],
      answer: '$0{,}2$ mA trong tối và $20$ mA khi được chiếu sáng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trong mô hình vùng năng lượng của chất rắn, vùng cấm là',
      options: [
        'khoảng năng lượng mà electron trong tinh thể không thể có',
        'vùng năng lượng chứa các electron hoá trị',
        'vùng năng lượng của các electron tự do',
        'khoảng năng lượng mà electron có năng lượng âm',
      ],
      answer: 0,
      hints: ['Vùng cấm nằm giữa hai vùng năng lượng cho phép.'],
      solution:
        'Vùng cấm là khoảng năng lượng giữa hai vùng cho phép, electron trong tinh thể không thể có năng lượng nằm trong khoảng này.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi loại chất rắn với đặc điểm vùng năng lượng của nó.',
      left: ['Kim loại', 'Bán dẫn', 'Điện môi'],
      right: [
        'Vùng chứa electron hoá trị chỉ lấp đầy một phần hoặc chồng lên vùng dẫn',
        'Vùng cấm hẹp, cỡ $1$ eV',
        'Vùng cấm rộng, cỡ vài electronvôn trở lên',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Chất nào luôn có sẵn nhiều electron tự do? Chất nào hầu như không có?'],
      solution:
        'Kim loại luôn có electron tự do vì vùng của nó chỉ lấp đầy một phần hoặc chồng lên vùng dẫn; bán dẫn có vùng cấm hẹp (silic $1{,}12$ eV); điện môi có vùng cấm rộng (kim cương $5{,}5$ eV).',
    },
    {
      type: 'number',
      prompt:
        'Germani có độ rộng vùng cấm $0{,}66$ eV. Bước sóng dài nhất của ánh sáng gây ra hiện tượng quang dẫn ở germani là bao nhiêu micrômét (làm tròn đến hai chữ số thập phân)?',
      answer: 1.88,
      tolerance: 0.01,
      unit: 'μm',
      hints: ['$\\lambda_{max} = \\dfrac{hc}{E_g}$, đổi $E_g$ ra jun.'],
      solution:
        '$\\lambda_{max} = \\dfrac{6{,}625 \\cdot 10^{-34} \\cdot 3 \\cdot 10^8}{0{,}66 \\cdot 1{,}6 \\cdot 10^{-19}} \\approx 1{,}88 \\cdot 10^{-6}$ m $= 1{,}88$ μm.',
    },
    {
      type: 'choice',
      prompt: 'Khi nhiệt độ của một thanh silic tăng thì điện trở của nó giảm, vì',
      options: [
        'nhiều electron nhận đủ năng lượng chuyển từ vùng hoá trị lên vùng dẫn, số hạt tải điện tăng',
        'các ion ở nút mạng dao động mạnh hơn',
        'độ rộng vùng cấm tăng lên',
        'electron trong vùng dẫn chuyển ngược về vùng hoá trị',
      ],
      answer: 0,
      hints: [
        'Ở bán dẫn, điều gì thay đổi mạnh nhất khi nhiệt độ tăng: mật độ hạt tải hay va chạm?',
      ],
      solution:
        'Nhiệt độ tăng làm nhiều electron vượt qua vùng cấm lên vùng dẫn và tạo ra thêm lỗ trống. Mật độ hạt tải điện tăng rất nhanh nên điện trở của bán dẫn giảm.',
    },
    {
      type: 'choice',
      prompt: 'Khi nhiệt độ của dây đồng tăng (không quá cao) thì điện trở của nó tăng, vì',
      options: [
        'các ion ở nút mạng dao động mạnh hơn, electron va chạm với chúng nhiều hơn',
        'số electron tự do trong dây đồng giảm mạnh',
        'electron chuyển từ vùng dẫn xuống vùng hoá trị',
        'vùng cấm của đồng rộng ra',
      ],
      answer: 0,
      hints: ['Mật độ electron tự do của kim loại gần như không đổi theo nhiệt độ.'],
      solution:
        'Mật độ electron tự do trong kim loại gần như không đổi. Nhiệt độ tăng làm các ion ở nút mạng dao động mạnh hơn, cản trở chuyển động có hướng của electron nhiều hơn, nên điện trở tăng.',
    },
    {
      type: 'multi',
      prompt:
        'Một quang trở làm bằng cadimi sunfua có $E_g \\approx 2{,}4$ eV. Chọn tất cả các ánh sáng làm giảm được điện trở của nó.',
      options: [
        'Ánh sáng lục, $\\lambda = 500$ nm',
        'Ánh sáng tím, $\\lambda = 400$ nm',
        'Ánh sáng đỏ, $\\lambda = 700$ nm',
        'Tia hồng ngoại, $\\lambda = 1\\,000$ nm',
      ],
      answers: [0, 1],
      hints: [
        'Tính $\\varepsilon = \\dfrac{hc}{\\lambda}$ theo eV và so sánh với $E_g$.',
        '$\\lambda_{max} = \\dfrac{hc}{E_g} \\approx 518$ nm.',
      ],
      solution:
        '$\\lambda_{max} = \\dfrac{hc}{E_g} = \\dfrac{1{,}9875 \\cdot 10^{-25}}{2{,}4 \\cdot 1{,}6 \\cdot 10^{-19}} \\approx 518$ nm. Ánh sáng lục ($2{,}48$ eV) và tím ($3{,}1$ eV) có $\\lambda \\le 518$ nm nên làm giảm điện trở; ánh sáng đỏ ($1{,}77$ eV) và hồng ngoại ($1{,}24$ eV) thì không.',
    },
    {
      type: 'number',
      prompt:
        'Một dây đồng có điện trở $20\\ \\Omega$ ở $300$ K. Lấy $\\alpha = 4{,}3 \\cdot 10^{-3}\\ \\text{K}^{-1}$. Điện trở của dây ở $400$ K là bao nhiêu ôm?',
      answer: 28.6,
      tolerance: 0.05,
      unit: 'Ω',
      hints: ['$R = R_0[1 + \\alpha(T - T_0)]$.'],
      solution:
        '$R = 20 \\cdot [1 + 4{,}3 \\cdot 10^{-3} \\cdot 100] = 20 \\cdot 1{,}43 = 28{,}6\\ \\Omega$.',
    },
    {
      type: 'number',
      prompt:
        'Một quang trở mắc vào hiệu điện thế $9$ V. Khi được chiếu sáng, điện trở của nó là $450\\ \\Omega$. Cường độ dòng điện qua quang trở là bao nhiêu miliampe?',
      answer: 20,
      tolerance: 0.01,
      unit: 'mA',
      hints: ['Định luật Ohm: $I = \\dfrac{U}{R}$.'],
      solution: '$I = \\dfrac{9}{450} = 0{,}02$ A $= 20$ mA.',
    },
    {
      type: 'choice',
      prompt:
        'Chiếu vào một mẫu silic ($E_g = 1{,}12$ eV) bức xạ hồng ngoại có bước sóng $1{,}5$ μm. Điện trở của mẫu',
      options: [
        'hầu như không đổi, vì năng lượng photon nhỏ hơn $E_g$',
        'giảm mạnh, vì mẫu được chiếu sáng',
        'tăng, vì photon làm electron rơi xuống vùng hoá trị',
        'giảm, vì chùm bức xạ đủ mạnh thì mọi photon đều bị hấp thụ',
      ],
      answer: 0,
      hints: ['Tính năng lượng một photon $1{,}5$ μm theo eV.'],
      solution:
        '$\\varepsilon = \\dfrac{1{,}9875 \\cdot 10^{-25}}{1{,}5 \\cdot 10^{-6}} \\approx 1{,}325 \\cdot 10^{-19}$ J $\\approx 0{,}83$ eV $< 1{,}12$ eV. Một photon không đủ đưa electron qua vùng cấm, dù chùm mạnh đến đâu, nên điện trở hầu như không đổi.',
    },
    {
      type: 'choice',
      prompt: 'Kim cương là chất điện môi vì',
      options: [
        'vùng cấm của nó rất rộng (khoảng $5{,}5$ eV), hầu như không electron nào lên được vùng dẫn',
        'nó không có vùng hoá trị',
        'nó không có electron',
        'vùng dẫn của nó chồng lên vùng hoá trị',
      ],
      answer: 0,
      hints: ['So sánh $E_g$ của kim cương với năng lượng chuyển động nhiệt cỡ vài phần trăm eV.'],
      solution:
        'Vùng cấm của kim cương rộng khoảng $5{,}5$ eV, rất lớn so với năng lượng chuyển động nhiệt, nên ở nhiệt độ thường hầu như không có electron trong vùng dẫn: kim cương không dẫn điện.',
    },
  ],
  takeaways: [
    'Trong tinh thể, các mức năng lượng của electron tạo thành các vùng năng lượng cho phép, ngăn cách nhau bởi vùng cấm.',
    'Vùng hoá trị chứa các electron hoá trị; electron ở vùng dẫn tham gia dẫn điện; độ rộng vùng cấm giữa chúng là $E_g$.',
    'Kim loại luôn có nhiều electron tự do; bán dẫn có $E_g$ nhỏ (cỡ $1$ eV); điện môi có $E_g$ lớn (vài eV trở lên).',
    'Nhiệt độ tăng: điện trở kim loại tăng (ion dao động mạnh hơn), điện trở bán dẫn giảm (thêm hạt tải điện).',
    'Hiện tượng quang dẫn: photon có $hf \\ge E_g$ đưa electron lên vùng dẫn, làm điện trở bán dẫn giảm; đó là nguyên tắc của quang trở (LDR).',
  ],
};
