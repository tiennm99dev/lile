/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Khi lan truyền trong môi trường truyền dẫn, công suất tín hiệu giảm dần; mức suy giảm đo bằng decibel, 10 lg(P2/P1), và với cáp được đặc trưng bằng hệ số suy giảm theo dB/km; bộ khuếch đại và trạm lặp bù lại suy giảm, cần đặt trước khi tín hiệu chìm trong nhiễu.',
  intro:
    'Một tín hiệu đi qua sợi cáp quang dài hàng trăm kilômét dưới đáy biển, hay sóng Wi-Fi đi xuyên qua vài bức tường, đều yếu dần trên đường đi. Tín hiệu yếu đi bao nhiêu thì máy thu không còn nhận được nữa, và làm sao để đưa tín hiệu đi thật xa?',
  objectives: [
    'Nêu được các loại môi trường truyền dẫn và ảnh hưởng của chúng đến sự suy giảm tín hiệu.',
    'Nêu được nguyên nhân gây suy giảm tín hiệu trong cáp đồng trục, cáp quang và môi trường không dây.',
    'Biểu diễn được mức suy giảm (hoặc khuếch đại) bằng decibel và dùng được hệ số suy giảm theo dB/km.',
    'Nêu được vai trò của bộ khuếch đại, trạm lặp và một số cách chống nhiễu.',
  ],
  sections: [
    {
      heading: 'Môi trường truyền dẫn',
      blocks: [
        {
          type: 'p',
          text: 'Môi trường truyền dẫn là đường đi của tín hiệu từ nơi phát đến nơi thu. Có hai loại:',
        },
        {
          type: 'list',
          items: [
            'Truyền dẫn có dây (hữu tuyến): dây xoắn đôi, cáp đồng trục (tín hiệu điện), cáp quang (tín hiệu ánh sáng).',
            'Truyền dẫn không dây (vô tuyến): sóng điện từ lan truyền trong không khí và chân không, như sóng phát thanh, truyền hình, điện thoại di động, Wi-Fi, vệ tinh.',
          ],
        },
        {
          type: 'p',
          text: 'Môi trường truyền dẫn ảnh hưởng rất lớn đến chất lượng tín hiệu: dây dẫn kém làm tín hiệu yếu đi nhanh, còn đường truyền thường bị nhiễu (tín hiệu không mong muốn từ bên ngoài) xâm nhập.',
        },
      ],
    },
    {
      heading: 'Sự suy giảm tín hiệu',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Suy giảm tín hiệu',
          text: 'Suy giảm tín hiệu là sự mất mát năng lượng (giảm công suất) của tín hiệu khi nó được truyền qua môi trường truyền dẫn.',
        },
        {
          type: 'table',
          caption: 'Một số nguyên nhân gây suy giảm tín hiệu',
          head: ['Môi trường', 'Nguyên nhân'],
          rows: [
            [
              'Cáp đồng trục',
              'Chiều dài cáp; mất mát ở các mối nối; nhiệt độ thay đổi; tổn hao do điện trở của dây (toả nhiệt), do lớp điện môi và do bức xạ ra ngoài.',
            ],
            [
              'Cáp quang',
              'Vật liệu sợi quang hấp thụ ánh sáng; sợi bị uốn cong khi sản xuất, lắp đặt; ánh sáng bị tán xạ trong sợi.',
            ],
            [
              'Không dây',
              'Khoảng cách truyền; hiệu ứng đa đường truyền và vật cản; sự chuyển động của máy phát, máy thu; sự khúc xạ, nhiễu xạ, tán xạ của sóng.',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Đơn vị đo suy giảm: decibel',
      blocks: [
        {
          type: 'p',
          text: 'Gọi $P_1$ là công suất tín hiệu ở đầu vào và $P_2$ là công suất ở đầu ra của một đoạn đường truyền. Tỉ số $\\dfrac{P_2}{P_1}$ có thể rất nhỏ (cỡ một phần triệu), nên người ta biểu diễn nó theo thang lôgarit, đơn vị decibel (dB):',
        },
        { type: 'tex', tex: 'A = 10\\lg\\dfrac{P_2}{P_1}\\ (\\text{dB})' },
        {
          type: 'list',
          items: [
            '$A < 0$: tín hiệu bị suy giảm ($P_2 < P_1$); độ suy giảm là $|A|$ dB.',
            '$A > 0$: tín hiệu được khuếch đại ($P_2 > P_1$); $A$ là độ lợi (hệ số khuếch đại) tính theo dB.',
            'Ngược lại, từ mức $A$ (dB) tính được $\\dfrac{P_2}{P_1} = 10^{\\frac{A}{10}}$.',
          ],
        },
        {
          type: 'table',
          head: [
            '$\\dfrac{P_2}{P_1}$',
            '$100$',
            '$10$',
            '$2$',
            '$1$',
            '$\\dfrac{1}{2}$',
            '$\\dfrac{1}{10}$',
            '$\\dfrac{1}{1\\,000}$',
          ],
          rows: [
            ['$A$ (dB)', '$20$', '$10$', '$\\approx 3$', '$0$', '$\\approx -3$', '$-10$', '$-30$'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hệ số suy giảm',
          text: 'Với cáp truyền dẫn, suy giảm tỉ lệ với chiều dài. Hệ số suy giảm $\\alpha$ (dB/km) là độ suy giảm trên mỗi kilômét; cáp dài $L$ (km) làm tín hiệu suy giảm $\\alpha L$ (dB). Cáp quang tốt có $\\alpha$ chỉ khoảng $0{,}2$ – $0{,}3$ dB/km.',
        },
        {
          type: 'p',
          text: 'Ưu điểm của decibel: khi tín hiệu đi qua nhiều đoạn nối tiếp (cáp, bộ khuếch đại, mối nối), mức tổng cộng bằng tổng các mức tính theo dB của từng đoạn, thay vì phải nhân các tỉ số công suất.',
        },
      ],
    },
    {
      heading: 'Khuếch đại và chống nhiễu',
      blocks: [
        {
          type: 'p',
          text: 'Để đưa tín hiệu đi xa, người ta đặt các bộ khuếch đại (trạm khuếch đại) dọc theo đường truyền để bù lại phần suy giảm. Nhưng bộ khuếch đại khuếch đại mọi thứ ở đầu vào của nó, cả tín hiệu lẫn nhiễu. Nếu tín hiệu đã yếu đến mức chìm trong nhiễu thì khuếch đại cũng không cứu được.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đặt bộ khuếch đại đúng chỗ',
          text: 'Phải đặt bộ khuếch đại khi tín hiệu còn đủ mạnh so với nhiễu. Khoảng cách giữa hai bộ khuếch đại liên tiếp được tính từ độ lợi của bộ khuếch đại và hệ số suy giảm của cáp.',
        },
        {
          type: 'list',
          items: [
            'Với tín hiệu số, người ta dùng trạm lặp (bộ tái tạo): trạm nhận tín hiệu, xác định lại từng bit $0$, $1$ rồi phát đi một tín hiệu mới sạch nhiễu. Nhờ đó tín hiệu số đi rất xa mà không tích luỹ nhiễu.',
            'Cáp đồng trục có lớp vỏ kim loại bọc ngoài để chắn nhiễu điện từ; dây xoắn đôi xoắn hai dây vào nhau để nhiễu tác động lên hai dây như nhau và triệt tiêu.',
            'Cáp quang truyền ánh sáng nên không bị nhiễu điện từ, lại có hệ số suy giảm rất nhỏ, vì thế được dùng cho các tuyến cáp dài, kể cả cáp biển.',
            'Trong truyền dẫn không dây, có thể tăng công suất phát, dùng anten định hướng, đặt trạm chuyển tiếp hoặc chọn dải tần ít bị vật cản ảnh hưởng.',
          ],
        },
      ],
    },
    {
      heading: 'Dự án: Đo sự suy giảm của sóng Wi-Fi',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: đo cường độ sóng Wi-Fi ở nhiều khoảng cách và qua các vật cản, rồi biểu diễn mức suy giảm theo dB. Dụng cụ: một bộ phát Wi-Fi, điện thoại có ứng dụng phân tích Wi-Fi (hiển thị cường độ tín hiệu theo dBm), thước dây hoặc đếm bước chân.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đứng cách bộ phát $1$ m, không vật cản, ghi cường độ tín hiệu làm mức chuẩn.',
            'Lùi ra $2$ m, $4$ m, $8$ m, $16$ m theo đường thẳng không vật cản, mỗi chỗ đo ba lần lấy trung bình.',
            'Tính độ chênh so với mức chuẩn (hiệu hai số đo theo dBm chính là mức thay đổi theo dB), rồi tính tỉ số công suất $\\dfrac{P_2}{P_1} = 10^{\\frac{A}{10}}$.',
            'Đo lại ở cùng khoảng cách khi có một bức tường, một cánh cửa gỗ, một tủ kim loại chắn giữa. Ghi độ suy giảm thêm do mỗi vật cản.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Nộp bảng số liệu, đồ thị mức suy giảm (dB) theo khoảng cách, nhận xét: mỗi lần khoảng cách tăng gấp đôi thì tín hiệu giảm thêm khoảng bao nhiêu dB, vật cản nào làm suy giảm nhiều nhất. Đề xuất vị trí đặt bộ phát hoặc bộ mở rộng sóng cho ngôi nhà của em.',
        },
      ],
    },
  ],
  explore: {
    title: 'Truyền tín hiệu qua cáp dài',
    instruction:
      'Chọn loại cáp, kéo dài cáp và quan sát mức tín hiệu (dB) giảm dần. Di chuyển đồng hồ đo dọc cáp. Khi tín hiệu xuống vùng nhiễu, thêm bộ khuếch đại và kéo nó đến đúng chỗ để tín hiệu luôn ở trên vùng nhiễu. Thử dùng ít bộ khuếch đại nhất với cáp đồng trục dài 100 km.',
  },
  examples: [
    {
      problem:
        'Công suất tín hiệu ở đầu vào cáp sợi quang là $2$ mW, cáp có hệ số suy giảm $0{,}3$ dB/km. Tính công suất tín hiệu ở đầu ra của cáp tại khoảng cách $5$ km.',
      steps: [
        'Sau $5$ km tín hiệu suy giảm $0{,}3 \\cdot 5 = 1{,}5$ dB, tức $A = -1{,}5$ dB.',
        '$-1{,}5 = 10\\lg\\dfrac{P_2}{P_1}$ nên $\\dfrac{P_2}{P_1} = 10^{-0{,}15} \\approx 0{,}708$.',
        '$P_2 \\approx 0{,}708 \\cdot 2 \\approx 1{,}42$ mW.',
      ],
      answer: '$P_2 \\approx 1{,}42$ mW (khoảng $1{,}4 \\cdot 10^{-3}$ W).',
    },
    {
      problem:
        'Một tuyến cáp dài $40$ km nhận công suất $10$ mW ở đầu vào và cho $0{,}1$ mW ở đầu ra. Tính độ suy giảm và hệ số suy giảm của cáp.',
      steps: [
        '$\\dfrac{P_2}{P_1} = \\dfrac{0{,}1}{10} = 0{,}01$.',
        '$A = 10\\lg 0{,}01 = 10 \\cdot (-2) = -20$ dB: cáp làm tín hiệu suy giảm $20$ dB.',
        '$\\alpha = \\dfrac{20}{40} = 0{,}5$ dB/km.',
      ],
      answer: 'Độ suy giảm $20$ dB; hệ số suy giảm $0{,}5$ dB/km.',
    },
    {
      problem:
        'Tín hiệu $1$ mW đi qua cáp dài $50$ km có hệ số suy giảm $0{,}4$ dB/km, ở cuối cáp có một bộ khuếch đại độ lợi $15$ dB. Tính công suất ra khỏi bộ khuếch đại.',
      steps: [
        'Cáp: $A_1 = -0{,}4 \\cdot 50 = -20$ dB. Bộ khuếch đại: $A_2 = +15$ dB.',
        'Mức tổng cộng: $A = A_1 + A_2 = -20 + 15 = -5$ dB.',
        '$P_2 = P_1 \\cdot 10^{-0{,}5} \\approx 1 \\cdot 0{,}316 = 0{,}316$ mW.',
      ],
      answer: '$P_2 \\approx 0{,}32$ mW.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Một bộ khuếch đại làm công suất tín hiệu tăng từ $0{,}2$ mW lên $20$ mW. Độ lợi của nó là bao nhiêu dB?',
      answer: 20,
      unit: 'dB',
      hints: ['Tính tỉ số $\\dfrac{P_2}{P_1}$ rồi lấy $10\\lg$ của tỉ số đó.'],
      solution: '$\\dfrac{P_2}{P_1} = \\dfrac{20}{0{,}2} = 100$, $A = 10\\lg 100 = 20$ dB.',
    },
    {
      type: 'choice',
      prompt:
        'Công suất tín hiệu giảm còn một nửa. Mức thay đổi tính theo dB xấp xỉ bằng bao nhiêu?',
      options: ['$-3$ dB', '$-5$ dB', '$-0{,}5$ dB', '$-50$ dB'],
      answer: 0,
      hints: ['$\\lg 2 \\approx 0{,}301$.'],
      solution:
        '$A = 10\\lg\\dfrac{1}{2} = -10\\lg 2 \\approx -3{,}01$ dB, tức suy giảm khoảng $3$ dB.',
    },
    {
      type: 'number',
      prompt:
        'Một đoạn đường truyền làm tín hiệu suy giảm $30$ dB. Công suất tín hiệu giảm đi bao nhiêu lần?',
      answer: 1000,
      hints: ['$\\dfrac{P_2}{P_1} = 10^{\\frac{A}{10}}$ với $A = -30$ dB.'],
      solution:
        '$\\dfrac{P_2}{P_1} = 10^{-3} = \\dfrac{1}{1\\,000}$: công suất giảm $1\\,000$ lần.',
    },
    {
      type: 'number',
      prompt:
        'Tín hiệu $5$ mW đi vào cáp quang dài $100$ km, hệ số suy giảm $0{,}2$ dB/km. Công suất ở đầu ra là bao nhiêu mW?',
      answer: 0.05,
      tolerance: 0.0005,
      unit: 'mW',
      hints: ['Tính độ suy giảm $\\alpha L$ trước.', 'Suy giảm $20$ dB là giảm $100$ lần.'],
      solution:
        'Suy giảm $0{,}2 \\cdot 100 = 20$ dB nên $\\dfrac{P_2}{P_1} = 10^{-2}$; $P_2 = 5 \\cdot 0{,}01 = 0{,}05$ mW.',
    },
    {
      type: 'number',
      prompt:
        'Máy thu chỉ nhận được tín hiệu khi độ suy giảm không quá $24$ dB. Dùng cáp có hệ số suy giảm $0{,}3$ dB/km thì cáp dài nhất là bao nhiêu kilômét (không có bộ khuếch đại)?',
      answer: 80,
      unit: 'km',
      hints: ['Độ suy giảm của cáp là $\\alpha L$.'],
      solution: '$0{,}3 \\cdot L \\leq 24$ nên $L \\leq \\dfrac{24}{0{,}3} = 80$ km.',
    },
    {
      type: 'number',
      prompt:
        'Tín hiệu $1$ mW đi qua một đoạn cáp suy giảm $12$ dB, rồi một bộ khuếch đại $20$ dB, rồi một đoạn cáp suy giảm $5$ dB. Công suất cuối cùng là bao nhiêu mW (làm tròn đến một chữ số thập phân)?',
      answer: 2,
      tolerance: 0.05,
      unit: 'mW',
      hints: [
        'Cộng các mức theo dB: suy giảm mang dấu trừ, khuếch đại mang dấu cộng.',
        '$10^{0{,}3} \\approx 2$.',
      ],
      solution:
        '$A = -12 + 20 - 5 = 3$ dB, nên $P_2 = 1 \\cdot 10^{0{,}3} \\approx 1{,}995 \\approx 2{,}0$ mW.',
    },
    {
      type: 'multi',
      prompt: 'Những nguyên nhân nào gây suy giảm tín hiệu khi truyền không dây?',
      options: [
        'Khoảng cách giữa máy phát và máy thu lớn',
        'Vật cản và hiệu ứng đa đường truyền',
        'Sự khúc xạ, nhiễu xạ, tán xạ của sóng',
        'Sợi quang bị uốn cong',
        'Tổn hao do lớp điện môi của cáp',
      ],
      answers: [0, 1, 2],
      hints: ['Hai lựa chọn chỉ xảy ra trong truyền dẫn có dây.'],
      solution:
        'Truyền không dây bị suy giảm do khoảng cách, vật cản, đa đường truyền, chuyển động của máy thu phát, khúc xạ, nhiễu xạ, tán xạ. Uốn cong sợi quang và tổn hao điện môi là nguyên nhân trong cáp quang và cáp đồng trục.',
    },
    {
      type: 'choice',
      prompt:
        'Vì sao trên đường truyền tín hiệu số dài, trạm lặp (tái tạo tín hiệu) tốt hơn bộ khuếch đại thông thường?',
      options: [
        'Trạm lặp xác định lại từng bit rồi phát tín hiệu mới, loại bỏ nhiễu đã lẫn vào',
        'Trạm lặp có độ lợi lớn hơn mọi bộ khuếch đại',
        'Bộ khuếch đại làm giảm công suất tín hiệu',
        'Trạm lặp làm tăng tốc độ truyền của tín hiệu',
      ],
      answer: 0,
      hints: ['Bộ khuếch đại thông thường làm gì với nhiễu ở đầu vào của nó?'],
      solution:
        'Bộ khuếch đại khuếch đại cả tín hiệu lẫn nhiễu, nên nhiễu tích luỹ dần qua các trạm. Trạm lặp chỉ cần nhận ra từng bit $0$ hay $1$ rồi phát lại tín hiệu số sạch, nên nhiễu không tích luỹ.',
    },
  ],
  takeaways: [
    'Suy giảm tín hiệu là sự giảm công suất của tín hiệu khi truyền qua môi trường truyền dẫn (có dây hoặc không dây).',
    'Mức thay đổi theo decibel: $A = 10\\lg\\dfrac{P_2}{P_1}$; $A < 0$ là suy giảm, $A > 0$ là khuếch đại; giảm một nửa công suất ứng với khoảng $-3$ dB.',
    'Cáp có hệ số suy giảm $\\alpha$ (dB/km) làm tín hiệu suy giảm $\\alpha L$ dB sau $L$ km; các mức theo dB của các đoạn nối tiếp được cộng với nhau.',
    'Bộ khuếch đại bù suy giảm nhưng khuếch đại cả nhiễu, nên phải đặt trước khi tín hiệu chìm trong nhiễu; trạm lặp tái tạo tín hiệu số sạch nhiễu; vỏ chắn và cáp quang giúp chống nhiễu.',
  ],
};
