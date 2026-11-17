/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhà máy điện hạt nhân dùng năng lượng của phản ứng phân hạch dây chuyền được kiểm soát trong lò phản ứng: thanh điều khiển hấp thụ neutron để giữ hệ số nhân neutron k = 1. Các đồng vị phóng xạ được dùng trong y học (chẩn đoán, xạ trị, tiệt trùng), nông nghiệp (tạo giống, đánh dấu, bảo quản thực phẩm), công nghiệp và khảo cổ. Làm việc với phóng xạ phải tuân theo nguyên tắc an toàn: thời gian ngắn, khoảng cách xa, che chắn.',
  intro:
    'Một viên nhiên liệu uranium nhỏ bằng đầu ngón tay cho năng lượng bằng khoảng một tấn than đá. Nhưng chính phản ứng dây chuyền tạo ra nguồn năng lượng khổng lồ đó cũng có thể vượt khỏi tầm kiểm soát. Người ta đã "thuần hoá" phản ứng phân hạch như thế nào để sản xuất điện, và các tia phóng xạ đang giúp ích gì cho cuộc sống?',
  objectives: [
    'Mô tả được cấu tạo và nguyên tắc hoạt động của lò phản ứng và nhà máy điện hạt nhân.',
    'Nêu được vai trò của hệ số nhân neutron $k$ và của thanh điều khiển trong việc kiểm soát phản ứng dây chuyền.',
    'Nêu được một số ứng dụng của phóng xạ và năng lượng hạt nhân trong y học, nông nghiệp, công nghiệp, khảo cổ.',
    'Nêu được các nguyên tắc an toàn phóng xạ.',
  ],
  sections: [
    {
      heading: 'Lò phản ứng hạt nhân',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi phân hạch ${}^{235}_{92}\\mathrm{U}$ giải phóng trung bình $2$ đến $3$ neutron. Gọi $k$ là hệ số nhân neutron: số neutron trung bình còn lại sau mỗi phân hạch tiếp tục gây ra phân hạch mới.',
        },
        {
          type: 'list',
          items: [
            '$k < 1$: phản ứng dây chuyền tắt dần (dưới tới hạn).',
            '$k = 1$: phản ứng dây chuyền tự duy trì, năng lượng toả ra không đổi theo thời gian (tới hạn). Đây là chế độ của lò phản ứng.',
            '$k > 1$: số phân hạch tăng rất nhanh, năng lượng toả ra tăng vọt, có thể gây bùng nổ (vượt hạn). Đây là nguyên tắc của bom nguyên tử.',
          ],
        },
        {
          type: 'table',
          head: ['Bộ phận', 'Vai trò'],
          rows: [
            [
              'Thanh nhiên liệu',
              'Chứa uranium đã được làm giàu ${}^{235}_{92}\\mathrm{U}$ (vài phần trăm), nơi xảy ra phân hạch.',
            ],
            [
              'Chất làm chậm',
              'Nước, nước nặng hoặc than chì: làm giảm tốc độ neutron, vì neutron chậm dễ gây phân hạch ${}^{235}_{92}\\mathrm{U}$ hơn.',
            ],
            [
              'Thanh điều khiển',
              'Chứa cadmium hoặc boron, hấp thụ mạnh neutron. Hạ sâu thanh xuống thì $k$ giảm, nâng lên thì $k$ tăng; khi có sự cố, thả rơi hết các thanh để dập lò.',
            ],
            [
              'Chất tải nhiệt',
              'Nước (hoặc khí, kim loại lỏng) chảy qua lõi lò, mang nhiệt ra ngoài.',
            ],
            [
              'Vỏ lò, lớp bê tông bảo vệ',
              'Ngăn tia phóng xạ và chất phóng xạ thoát ra môi trường.',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Nhà máy điện hạt nhân',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Năng lượng phân hạch trong lò phản ứng làm nóng chất tải nhiệt.',
            'Chất tải nhiệt truyền nhiệt cho nước trong bộ trao đổi nhiệt (bình sinh hơi), nước hoá hơi.',
            'Hơi nước áp suất cao làm quay tua bin, tua bin làm quay máy phát điện.',
            'Hơi nước sau tua bin được làm lạnh, ngưng tụ thành nước và quay lại bình sinh hơi.',
          ],
        },
        {
          type: 'p',
          text: 'Ưu điểm: không trực tiếp thải khí $\\mathrm{CO_2}$, $\\mathrm{CO}$; một lượng nhỏ nhiên liệu cho năng lượng rất lớn và nhà máy có thể phát điện liên tục nhiều năm mới phải thay nhiên liệu. Hạn chế: chất thải phóng xạ phải được xử lí, cất giữ hàng trăm năm (nhiều đồng vị trong đó như ${}^{90}\\mathrm{Sr}$, ${}^{137}\\mathrm{Cs}$ có chu kì bán rã khoảng $30$ năm); sự cố như ở Chernobyl (1986) hay Fukushima (2011) gây ô nhiễm phóng xạ trên diện rộng.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ở Việt Nam',
          text: 'Lò phản ứng hạt nhân Đà Lạt (công suất $500$ kW) là lò nghiên cứu, dùng để sản xuất đồng vị phóng xạ cho y tế, phục vụ nghiên cứu và đào tạo.',
        },
      ],
    },
    {
      heading: 'Ứng dụng của phóng xạ',
      blocks: [
        {
          type: 'table',
          head: ['Lĩnh vực', 'Ứng dụng'],
          rows: [
            [
              'Y học: chẩn đoán',
              'Đưa chất đánh dấu phóng xạ (dược chất phóng xạ) vào cơ thể rồi dùng đầu dò, máy tính theo dõi nó đi đến đâu; chụp PET dùng ${}^{18}_{9}\\mathrm{F}$ để phát hiện khối u.',
            ],
            [
              'Y học: điều trị',
              'Xạ trị: chiếu tia $\\gamma$ (như từ nguồn ${}^{60}_{27}\\mathrm{Co}$) vào khối u từ bên ngoài; hoặc đưa thuốc phóng xạ (chứa ${}^{131}_{53}\\mathrm{I}$, ${}^{223}\\mathrm{Ra}$, ${}^{177}\\mathrm{Lu}$) theo máu đến tiêu diệt tế bào ung thư.',
            ],
            ['Y học: tiệt trùng', 'Chiếu xạ để tiệt trùng dụng cụ, vật tư y tế.'],
            [
              'Nông nghiệp, sinh học',
              'Chiếu xạ hạt giống gây đột biến gene, tạo giống cây kháng sâu bệnh, năng suất cao; dùng đồng vị đánh dấu (như ${}^{32}_{15}\\mathrm{P}$) để nghiên cứu sự hấp thụ phân bón.',
            ],
            ['Thực phẩm', 'Chiếu xạ diệt vi khuẩn, kéo dài thời gian bảo quản.'],
            [
              'Công nghiệp',
              'Chụp ảnh bằng tia $\\gamma$ để phát hiện khuyết tật trong mối hàn, vật đúc; đo độ dày vật liệu.',
            ],
            [
              'Khảo cổ',
              'Định tuổi cổ vật bằng ${}^{14}_{6}\\mathrm{C}$: so sánh độ phóng xạ của mẫu cổ với mẫu sống cùng loại rồi dùng định luật phóng xạ.',
            ],
          ],
        },
      ],
    },
    {
      heading: 'An toàn phóng xạ',
      blocks: [
        {
          type: 'p',
          text: 'Tia phóng xạ không nhìn thấy, không ngửi thấy, nên người làm việc với nguồn phóng xạ phải đeo liều kế để đo lượng bức xạ mình đã nhận và tuân thủ nghiêm ngặt các quy định an toàn.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Ba nguyên tắc giảm liều chiếu',
          text: 'Thời gian: ở gần nguồn phóng xạ càng ngắn càng tốt. Khoảng cách: đứng càng xa nguồn càng tốt; với một nguồn nhỏ, cường độ bức xạ giảm tỉ lệ nghịch với bình phương khoảng cách. Che chắn: dùng vật liệu phù hợp (giấy, nhôm, chì, bê tông) đặt giữa người và nguồn.',
        },
        {
          type: 'list',
          items: [
            'Không lại gần, không tháo dỡ, không nhặt các thiết bị, thùng chứa có biển cảnh báo phóng xạ; báo ngay cho cơ quan chức năng khi thấy nguồn phóng xạ bị thất lạc.',
            'Chất thải phóng xạ phải được thu gom, xử lí và cất giữ theo quy định.',
            'Tránh để chất phóng xạ lọt vào cơ thể qua đường ăn uống, hít thở.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Lò phản ứng ảo',
    instruction:
      'Bấm "Vận hành lò" rồi kéo thanh trượt để nâng, hạ thanh điều khiển. Giữ công suất trong vùng xanh ($80\\%$ đến $120\\%$) liên tục $20$ giây. Quan sát $k$: chỉ khi $k \\approx 1$ công suất mới đứng yên. Nhiên liệu cháy dần làm $k$ giảm chậm, nên thỉnh thoảng phải nâng thanh lên một chút.',
  },
  examples: [
    {
      problem:
        'Một lò phản ứng có công suất nhiệt $2\\,000$ MW, mỗi phân hạch ${}^{235}_{92}\\mathrm{U}$ toả $200$ MeV. Tính khối lượng ${}^{235}_{92}\\mathrm{U}$ lò tiêu thụ trong một năm ($365$ ngày). Cho $N_A = 6{,}02 \\cdot 10^{23}$ mol⁻¹, $1$ MeV $= 1{,}6 \\cdot 10^{-13}$ J.',
      steps: [
        'Năng lượng lò toả ra trong một năm: $E = Pt = 2 \\cdot 10^9 \\cdot 365 \\cdot 86\\,400 \\approx 6{,}31 \\cdot 10^{16}$ J.',
        'Năng lượng mỗi phân hạch: $200 \\cdot 1{,}6 \\cdot 10^{-13} = 3{,}2 \\cdot 10^{-11}$ J, nên số phân hạch là $N = \\dfrac{6{,}31 \\cdot 10^{16}}{3{,}2 \\cdot 10^{-11}} \\approx 1{,}97 \\cdot 10^{27}$.',
        '$m = \\dfrac{N}{N_A} \\cdot 235 = \\dfrac{1{,}97 \\cdot 10^{27}}{6{,}02 \\cdot 10^{23}} \\cdot 235 \\approx 7{,}7 \\cdot 10^{5}$ g.',
      ],
      answer: 'Khoảng $770$ kg ${}^{235}_{92}\\mathrm{U}$ mỗi năm.',
    },
    {
      problem:
        'Độ phóng xạ ${}^{14}_{6}\\mathrm{C}$ của một mẫu gỗ cổ bằng $\\dfrac{1}{4}$ độ phóng xạ của một mẫu gỗ mới cùng khối lượng. Biết chu kì bán rã của ${}^{14}_{6}\\mathrm{C}$ là $5\\,730$ năm. Tính tuổi mẫu gỗ cổ.',
      steps: [
        'Khi cây còn sống, tỉ lệ ${}^{14}_{6}\\mathrm{C}$ trong gỗ được giữ ổn định; cây chết thì ${}^{14}_{6}\\mathrm{C}$ chỉ còn phân rã.',
        '$\\dfrac{H}{H_0} = 2^{-\\frac{t}{T}} = \\dfrac{1}{4} = 2^{-2}$, nên $t = 2T$.',
        '$t = 2 \\cdot 5\\,730 = 11\\,460$ năm.',
      ],
      answer: 'Mẫu gỗ có tuổi khoảng $11\\,460$ năm.',
    },
    {
      problem:
        'Đứng cách một nguồn phóng xạ nhỏ $1$ m, một người nhận được suất liều $90$ μSv/h. Nếu người đó lùi ra cách nguồn $3$ m thì suất liều còn bao nhiêu?',
      steps: [
        'Với nguồn nhỏ, suất liều tỉ lệ nghịch với bình phương khoảng cách.',
        'Khoảng cách tăng $3$ lần thì suất liều giảm $3^2 = 9$ lần: $\\dfrac{90}{9} = 10$ μSv/h.',
      ],
      answer: '$10$ μSv/h: tăng khoảng cách là một cách giảm liều chiếu rất hiệu quả.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trong lò phản ứng hạt nhân, thanh điều khiển có tác dụng',
      options: [
        'hấp thụ bớt neutron để điều chỉnh hệ số nhân neutron',
        'làm chậm neutron để dễ gây phân hạch',
        'mang nhiệt từ lõi lò ra ngoài',
        'cung cấp thêm nhiên liệu cho phản ứng',
      ],
      answer: 0,
      hints: ['Thanh điều khiển chứa cadmium hoặc boron, hai chất hấp thụ neutron rất mạnh.'],
      solution:
        'Thanh điều khiển hấp thụ neutron: hạ thanh sâu thì $k$ giảm, nâng thanh lên thì $k$ tăng. Làm chậm neutron là việc của chất làm chậm; mang nhiệt ra ngoài là việc của chất tải nhiệt.',
    },
    {
      type: 'choice',
      prompt: 'Lò phản ứng hạt nhân hoạt động ổn định khi hệ số nhân neutron',
      options: ['$k = 1$', '$k > 1$', '$k < 1$', '$k = 0$'],
      answer: 0,
      hints: [
        'Muốn công suất không đổi, số phân hạch mỗi thế hệ phải thế nào so với thế hệ trước?',
      ],
      solution:
        'Với $k = 1$, mỗi phân hạch gây ra đúng một phân hạch mới: phản ứng dây chuyền tự duy trì, công suất không đổi. $k > 1$ thì công suất tăng vọt, $k < 1$ thì phản ứng tắt dần.',
    },
    {
      type: 'choice',
      prompt: 'Chất làm chậm (như nước, than chì) được dùng trong lò phản ứng vì',
      options: [
        'neutron chậm dễ gây phân hạch ${}^{235}_{92}\\mathrm{U}$ hơn neutron nhanh',
        'chất làm chậm hấp thụ hết neutron để dập lò',
        'chất làm chậm làm giảm nhiệt độ của lõi lò',
        'chất làm chậm ngăn tia phóng xạ thoát ra ngoài',
      ],
      answer: 0,
      hints: ['Ở Bài 22, phân hạch ${}^{235}_{92}\\mathrm{U}$ được gây ra bởi loại neutron nào?'],
      solution:
        'Neutron sinh ra trong phân hạch rất nhanh; chất làm chậm làm giảm tốc độ của chúng vì ${}^{235}_{92}\\mathrm{U}$ dễ hấp thụ neutron chậm và phân hạch hơn.',
    },
    {
      type: 'number',
      prompt:
        'Một lò phản ứng có công suất nhiệt $3\\,000$ MW, mỗi phân hạch ${}^{235}_{92}\\mathrm{U}$ toả $200$ MeV. Mỗi ngày lò tiêu thụ bao nhiêu kilôgam ${}^{235}_{92}\\mathrm{U}$ (làm tròn đến hai chữ số sau dấu phẩy)? Cho $N_A = 6{,}02 \\cdot 10^{23}$ mol⁻¹, $1$ MeV $= 1{,}6 \\cdot 10^{-13}$ J.',
      answer: 3.16,
      tolerance: 0.03,
      unit: 'kg',
      hints: [
        'Năng lượng mỗi ngày: $E = Pt$ với $t = 86\\,400$ s.',
        'Số phân hạch $N = \\dfrac{E}{200 \\cdot 1{,}6 \\cdot 10^{-13}}$, rồi $m = \\dfrac{N}{N_A} \\cdot 235$ g.',
      ],
      solution:
        '$E = 3 \\cdot 10^9 \\cdot 86\\,400 = 2{,}592 \\cdot 10^{14}$ J; $N = \\dfrac{2{,}592 \\cdot 10^{14}}{3{,}2 \\cdot 10^{-11}} = 8{,}1 \\cdot 10^{24}$; $m = \\dfrac{8{,}1 \\cdot 10^{24}}{6{,}02 \\cdot 10^{23}} \\cdot 235 \\approx 3\\,162$ g $\\approx 3{,}16$ kg.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các ứng dụng của phóng xạ trong y học.',
      options: [
        'Chẩn đoán bệnh bằng chất đánh dấu phóng xạ',
        'Xạ trị tiêu diệt tế bào ung thư',
        'Tiệt trùng dụng cụ y tế',
        'Chiếu tia $\\alpha$ từ bên ngoài để chụp ảnh xương',
      ],
      answers: [0, 1, 2],
      hints: ['Tia $\\alpha$ bị một tờ giấy chặn lại: nó có đi xuyên qua cơ thể được không?'],
      solution:
        'Chẩn đoán bằng chất đánh dấu, xạ trị và tiệt trùng đều là ứng dụng của phóng xạ. Tia $\\alpha$ đâm xuyên rất yếu, không đi qua được da nên không thể dùng để chụp ảnh từ bên ngoài.',
    },
    {
      type: 'number',
      prompt:
        'Nguồn ${}^{60}_{27}\\mathrm{Co}$ dùng trong máy xạ trị có chu kì bán rã $5{,}27$ năm. Sau $10{,}54$ năm, độ phóng xạ của nguồn còn bao nhiêu phần trăm so với ban đầu?',
      answer: 25,
      unit: '%',
      hints: ['$10{,}54$ năm bằng mấy chu kì bán rã?'],
      solution:
        '$\\dfrac{t}{T} = \\dfrac{10{,}54}{5{,}27} = 2$, nên $\\dfrac{H}{H_0} = 2^{-2} = 25\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Độ phóng xạ ${}^{14}_{6}\\mathrm{C}$ của một mẫu xương cổ bằng $\\dfrac{1}{8}$ độ phóng xạ của mẫu xương mới cùng khối lượng. Chu kì bán rã của ${}^{14}_{6}\\mathrm{C}$ là $5\\,730$ năm. Mẫu xương cổ bao nhiêu năm tuổi?',
      answer: 17190,
      unit: 'năm',
      hints: ['$\\dfrac{1}{8} = 2^{-3}$.'],
      solution: '$2^{-\\frac{t}{T}} = 2^{-3}$, nên $t = 3T = 3 \\cdot 5\\,730 = 17\\,190$ năm.',
    },
    {
      type: 'number',
      prompt:
        'Cách một nguồn phóng xạ nhỏ $1$ m, suất liều là $40$ μSv/h. Đứng cách nguồn $2$ m thì suất liều là bao nhiêu μSv/h?',
      answer: 10,
      unit: 'μSv/h',
      hints: ['Suất liều tỉ lệ nghịch với bình phương khoảng cách đến nguồn.'],
      solution:
        'Khoảng cách tăng $2$ lần thì suất liều giảm $2^2 = 4$ lần: $\\dfrac{40}{4} = 10$ μSv/h.',
    },
    {
      type: 'choice',
      prompt: 'Cách làm nào sau đây KHÔNG giúp giảm liều chiếu khi làm việc gần nguồn phóng xạ?',
      options: [
        'Đứng sát nguồn để làm việc nhanh hơn',
        'Rút ngắn thời gian ở gần nguồn',
        'Đứng càng xa nguồn càng tốt',
        'Đặt tấm chắn bằng chì giữa người và nguồn',
      ],
      answer: 0,
      hints: ['Nhớ ba nguyên tắc: thời gian, khoảng cách, che chắn.'],
      solution:
        'Đứng sát nguồn làm liều chiếu tăng rất mạnh (tỉ lệ nghịch với bình phương khoảng cách), dù làm nhanh hơn. Rút ngắn thời gian, tăng khoảng cách và che chắn đều làm giảm liều chiếu.',
    },
  ],
  takeaways: [
    'Lò phản ứng duy trì phản ứng phân hạch dây chuyền ở chế độ $k = 1$; thanh điều khiển hấp thụ neutron để điều chỉnh $k$, chất làm chậm làm chậm neutron, chất tải nhiệt mang nhiệt ra.',
    'Nhà máy điện hạt nhân: nhiệt từ lò → hơi nước → tua bin → máy phát điện; không trực tiếp thải $\\mathrm{CO_2}$ nhưng phải xử lí chất thải phóng xạ.',
    'Phóng xạ được dùng để chẩn đoán, xạ trị, tiệt trùng; tạo giống, đánh dấu, bảo quản thực phẩm; kiểm tra khuyết tật; định tuổi bằng ${}^{14}_{6}\\mathrm{C}$.',
    'An toàn phóng xạ: thời gian ngắn, khoảng cách xa, che chắn; tôn trọng biển cảnh báo phóng xạ.',
  ],
};
