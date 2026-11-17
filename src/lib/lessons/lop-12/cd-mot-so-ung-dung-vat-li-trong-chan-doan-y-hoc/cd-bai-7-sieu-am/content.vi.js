/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Siêu âm là sóng âm có tần số lớn hơn 20 kHz, tạo ra bằng bộ biến đổi điện – cơ như gốm áp điện; máy siêu âm phát xung siêu âm vào cơ thể, thu sóng phản xạ ở các mặt phân cách giữa các mô và dựng thành đồ thị (kiểu A) hoặc ảnh mặt cắt (kiểu B).',
  intro:
    'Người mẹ mang thai được bác sĩ bôi một lớp gel lên bụng, rồi đặt nhẹ một đầu dò lên đó: trên màn hình hiện ra hình thai nhi đang cử động. Không dùng tia X, không đau, không gây hại. Máy siêu âm "nhìn" vào cơ thể bằng cách nào, và vì sao lại cần lớp gel ấy?',
  objectives: [
    'Nêu được bản chất của siêu âm và sơ lược cách tạo ra siêu âm.',
    'Nêu được nguyên lí hoạt động của máy siêu âm và nguyên tắc tạo ảnh siêu âm kiểu A, kiểu B.',
    'Giải thích được vì sao da và xương hiện rõ, còn các cơ quan mềm bên trong hiện kém, và vì sao siêu âm ít được dùng để kiểm tra não.',
    'Tính được bước sóng $\\lambda = \\dfrac{v}{f}$ và độ sâu mặt phân cách $d = \\dfrac{vt}{2}$ từ thời gian tiếng vọng; nêu được một số ứng dụng của siêu âm.',
  ],
  sections: [
    {
      heading: 'Siêu âm và cách tạo ra siêu âm',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Siêu âm',
          text: 'Siêu âm là sóng âm (sóng cơ học) có tần số lớn hơn $20$ kHz, tai người không nghe được; thường xét trong khoảng từ $20$ kHz đến $1$ GHz. Siêu âm y khoa thường dùng tần số từ $1$ MHz đến $15$ MHz.',
        },
        {
          type: 'p',
          text: 'Siêu âm được tạo ra khi cho nguồn âm dao động với tần số lớn hơn $20$ kHz. Thường dùng bộ biến đổi điện – cơ làm bằng thạch anh hoặc gốm áp điện: đặt vào nó một điện áp xoay chiều (hay các xung điện) thì nó dao động cơ cùng tần số; nếu tần số nằm trong dải siêu âm thì nó phát ra siêu âm. Ngược lại, khi sóng siêu âm đập vào, tinh thể áp điện dao động và sinh ra điện áp, nên cùng một đầu dò vừa phát vừa thu được siêu âm.',
        },
        {
          type: 'p',
          text: 'Như mọi sóng, siêu âm có $\\lambda = \\dfrac{v}{f}$. Trong mô mềm, tốc độ siêu âm khoảng $1\\,540$ m/s; ở $5$ MHz bước sóng chỉ khoảng $0{,}3$ mm, nên siêu âm phân biệt được những chi tiết rất nhỏ.',
        },
      ],
    },
    {
      heading: 'Nguyên lí hoạt động của máy siêu âm',
      blocks: [
        {
          type: 'p',
          text: 'Máy siêu âm hoạt động dựa vào định vị bằng sóng siêu âm, qua một đầu dò vừa phát vừa thu. Đầu dò phát vào cơ thể những xung siêu âm rất ngắn. Khi gặp mặt phân cách (ranh giới) giữa hai môi trường, siêu âm bị phản xạ một phần và khúc xạ một phần. Sóng phản xạ (tiếng vọng) trở về đầu dò, được biến thành tín hiệu điện, máy tính xử lí rồi hiển thị trên màn hình.',
        },
        {
          type: 'p',
          text: 'Tiếng vọng từ mặt phân cách ở độ sâu $d$ đi hết quãng đường $2d$ (đi và về) trong thời gian $t$, nên',
        },
        { type: 'tex', tex: 'd = \\dfrac{vt}{2}' },
        {
          type: 'p',
          text: 'với $v \\approx 1\\,540$ m/s là tốc độ siêu âm trong mô mềm mà máy dùng để tính.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Phản xạ mạnh hay yếu?',
          text: 'Mỗi môi trường có trở kháng âm $Z = \\rho v$ (khối lượng riêng nhân tốc độ âm). Ở mặt phân cách, phần cường độ bị phản xạ là $R = \\left(\\dfrac{Z_2 - Z_1}{Z_2 + Z_1}\\right)^2$: hai môi trường càng chênh lệch trở kháng thì phản xạ càng mạnh. Giữa các mô mềm, $Z$ chỉ chênh nhau ít nên phản xạ rất yếu (dưới $1\\%$); giữa mô và xương phản xạ khoảng $40\\%$; giữa không khí và da gần như $100\\%$.',
        },
        {
          type: 'list',
          items: [
            'Da (mặt phân cách với lớp tiếp xúc) và xương phản xạ siêu âm mạnh nên hiện lên rõ, sáng (hồi âm dày). Phía sau xương là vùng tối vì siêu âm gần như không đi qua được.',
            'Các cơ quan mềm, dịch phản xạ yếu nên cho hình ảnh hồi âm kém hoặc trống (tối), không rõ nét bằng.',
            'Phải bôi gel giữa đầu dò và da để không còn lớp không khí, nếu không gần như toàn bộ siêu âm bị phản xạ ngay ở mặt da.',
            'Siêu âm ít được dùng để kiểm tra não vì não được bao bọc bởi hộp sọ, siêu âm không đi qua được xương. Ở người lớn chỉ siêu âm não khi hộp sọ được mở trong phẫu thuật; ở trẻ sơ sinh có thể siêu âm qua thóp khi xương sọ chưa liền.',
          ],
        },
      ],
    },
    {
      heading: 'Nguyên tắc tạo hình ảnh siêu âm',
      blocks: [
        {
          type: 'table',
          caption: 'Hai kiểu hiển thị siêu âm',
          head: ['Kiểu', 'Cách làm', 'Hiển thị'],
          rows: [
            [
              'Kiểu A',
              'Một xung siêu âm chiếu vào cơ thể theo một phương; ghi các tiếng vọng nhận được theo thời gian.',
              'Đồ thị điện áp – thời gian: mỗi đỉnh là một mặt phân cách; từ khoảng thời gian giữa các đỉnh tính được bề dày mô, cơ quan.',
            ],
            [
              'Kiểu B',
              'Đầu dò quét qua nhiều vị trí (nhiều phương) quanh cơ quan; máy tính tổng hợp tín hiệu kiểu A của mọi phương.',
              'Ảnh mặt cắt: mỗi điểm có độ sáng tối theo cường độ sóng phản xạ ở vị trí đó.',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Ứng dụng của siêu âm: y học (chẩn đoán hình ảnh, theo dõi thai nhi, hỗ trợ phẫu thuật nội soi), công nghiệp (kiểm tra khuyết tật sản phẩm, hàn vật liệu), nông nghiệp và công nghệ thực phẩm (làm sạch hoá chất tồn dư, khử khuẩn), ngư nghiệp (máy dò cá), nghiên cứu biển và địa chất.',
        },
        {
          type: 'table',
          caption: 'So sánh chụp X-quang và siêu âm',
          head: ['Tiêu chí', 'Chụp X-quang', 'Siêu âm'],
          rows: [
            ['Tín hiệu', 'Tia X (sóng điện từ)', 'Sóng siêu âm (sóng cơ)'],
            [
              'Cách thu ảnh',
              'Thu tia X đã xuyên qua và bị cơ thể hấp thụ',
              'Thu sóng phản xạ ở các mặt phân cách',
            ],
            [
              'Ảnh',
              'Tương đối rõ, rất tốt với xương',
              'Kém nét hơn, tốt với mô mềm, dịch; quan sát được cử động',
            ],
            [
              'An toàn',
              'Bức xạ ion hoá, hạn chế số lần chụp',
              'Ít gây hại, dùng được cho thai nhi, tim, cổ',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Dự án: Đo khoảng cách bằng tiếng vọng',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: kiểm chứng nguyên tắc $d = \\dfrac{vt}{2}$ mà máy siêu âm dùng, bằng âm thanh nghe được hoặc cảm biến siêu âm. Phương tiện: một cảm biến siêu âm (như HC-SR04) với bo mạch Arduino, hoặc điện thoại có ứng dụng ghi âm hiển thị dạng sóng; thước dây; một bức tường phẳng.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đặt cảm biến (hoặc đứng vỗ tay) cách tường các khoảng đo bằng thước: $0{,}5$ m, $1$ m, $1{,}5$ m (với vỗ tay: $20$ m, $30$ m).',
            'Đo thời gian $t$ từ lúc phát đến lúc nhận tiếng vọng; lặp lại $3$ lần, lấy trung bình.',
            'Tính khoảng cách theo $d = \\dfrac{vt}{2}$ với $v = 340$ m/s và so sánh với số đo bằng thước, tính sai số.',
            'Thay bức tường bằng tấm vải dày, tấm xốp: nhận xét độ mạnh của tiếng vọng và liên hệ với sự phản xạ ở các mô trong cơ thể.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Bảng số liệu, kết quả tính và sai số; giải thích vì sao máy siêu âm y khoa dùng tần số MHz chứ không dùng tần số cỡ chục kHz như cảm biến (gợi ý: bước sóng và độ nhỏ của chi tiết quan sát được).',
        },
      ],
    },
  ],
  explore: {
    title: 'Đầu dò siêu âm ảo',
    instruction:
      'Kéo đầu dò dọc mặt da (hoặc chọn đầu dò rồi dùng phím mũi tên trái, phải). Đồ thị kiểu A cho tiếng vọng tại chỗ đặt đầu dò; ảnh kiểu B được dựng dần theo các vị trí đã quét. Thử bỏ lớp gel.',
  },
  examples: [
    {
      problem:
        'Một đầu dò phát siêu âm tần số $5$ MHz vào mô mềm ($v = 1\\,540$ m/s). Tiếng vọng từ thành trước của một túi dịch trở về sau $65\\ \\mu\\text{s}$. Tính bước sóng siêu âm trong mô và độ sâu của thành túi.',
      steps: [
        '$\\lambda = \\dfrac{v}{f} = \\dfrac{1\\,540}{5 \\cdot 10^6} = 3{,}08 \\cdot 10^{-4}$ m $\\approx 0{,}31$ mm.',
        'Siêu âm đi tới thành túi rồi quay về: $2d = vt$, nên $d = \\dfrac{vt}{2} = \\dfrac{1\\,540 \\cdot 65 \\cdot 10^{-6}}{2} \\approx 0{,}050$ m.',
      ],
      answer: '$\\lambda \\approx 0{,}31$ mm; thành túi ở sâu khoảng $5{,}0$ cm.',
    },
    {
      problem:
        'Cho trở kháng âm của mỡ, cơ, xương lần lượt là $1{,}38 \\cdot 10^6$; $1{,}70 \\cdot 10^6$; $7{,}80 \\cdot 10^6$ kg/(m²·s). Tính phần cường độ siêu âm bị phản xạ ở mặt phân cách mỡ – cơ và cơ – xương. Vì sao trên ảnh siêu âm xương hiện rõ hơn hẳn?',
      steps: [
        'Mỡ – cơ: $R = \\left(\\dfrac{1{,}70 - 1{,}38}{1{,}70 + 1{,}38}\\right)^2 = \\left(\\dfrac{0{,}32}{3{,}08}\\right)^2 \\approx 0{,}011$, khoảng $1{,}1\\%$.',
        'Cơ – xương: $R = \\left(\\dfrac{7{,}80 - 1{,}70}{7{,}80 + 1{,}70}\\right)^2 = \\left(\\dfrac{6{,}10}{9{,}50}\\right)^2 \\approx 0{,}41$, khoảng $41\\%$.',
        'Tiếng vọng từ xương mạnh hơn khoảng $40$ lần nên hiện sáng rõ; phần đi qua được xương còn rất ít nên sau xương là vùng tối.',
      ],
      answer: 'Khoảng $1{,}1\\%$ và $41\\%$; xương phản xạ mạnh hơn rất nhiều.',
    },
    {
      problem:
        'Trên đồ thị siêu âm kiểu A, tiếng vọng từ mặt trước và mặt sau của một cơ quan xuất hiện lần lượt ở $26\\ \\mu\\text{s}$ và $104\\ \\mu\\text{s}$. Tính bề dày của cơ quan, lấy $v = 1\\,540$ m/s.',
      steps: [
        'Hai tiếng vọng cách nhau $\\Delta t = 104 - 26 = 78\\ \\mu\\text{s}$: đó là thời gian siêu âm đi qua cơ quan và quay về.',
        'Bề dày $\\Delta d = \\dfrac{v\\Delta t}{2} = \\dfrac{1\\,540 \\cdot 78 \\cdot 10^{-6}}{2} \\approx 0{,}060$ m.',
      ],
      answer: 'Bề dày khoảng $6{,}0$ cm.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Tốc độ siêu âm trong thạch anh là $5\\,700$ m/s. Bước sóng của siêu âm tần số $2$ MHz trong thạch anh là bao nhiêu milimét?',
      answer: 2.85,
      tolerance: 0.01,
      unit: 'mm',
      hints: ['$\\lambda = \\dfrac{v}{f}$, nhớ đổi $2$ MHz $= 2 \\cdot 10^6$ Hz.'],
      solution:
        '$\\lambda = \\dfrac{5\\,700}{2 \\cdot 10^6} = 2{,}85 \\cdot 10^{-3}$ m $= 2{,}85$ mm.',
    },
    {
      type: 'choice',
      prompt: 'Sóng siêu âm là',
      options: [
        'sóng cơ học có tần số lớn hơn $20$ kHz',
        'sóng điện từ có tần số lớn hơn $20$ kHz',
        'sóng cơ học có tần số nhỏ hơn $16$ Hz',
        'sóng điện từ có bước sóng ngắn hơn tia X',
      ],
      answer: 0,
      hints: ['Siêu âm là một loại sóng âm.'],
      solution:
        'Siêu âm là sóng âm, tức sóng cơ học, có tần số lớn hơn $20$ kHz mà tai người không nghe được.',
    },
    {
      type: 'choice',
      prompt: 'Trong siêu âm chẩn đoán y khoa, người ta thường dùng siêu âm có tần số trong khoảng',
      options: [
        '$1$ MHz đến $15$ MHz',
        '$20$ Hz đến $20$ kHz',
        '$20$ kHz đến $100$ kHz',
        '$1$ GHz đến $15$ GHz',
      ],
      answer: 0,
      hints: ['Tần số càng lớn, bước sóng càng nhỏ, chi tiết thấy được càng nhỏ.'],
      solution: 'Siêu âm y khoa thường dùng tần số từ $1$ MHz đến $15$ MHz.',
    },
    {
      type: 'choice',
      prompt: 'Đầu dò của máy siêu âm phát ra siêu âm nhờ',
      options: [
        'tinh thể thạch anh hoặc gốm áp điện biến dao động điện thành dao động cơ cùng tần số',
        'dây vonfam nung nóng phát ra electron',
        'nam châm siêu dẫn tạo từ trường mạnh',
        'một chiếc loa thường phát âm thanh rất to',
      ],
      answer: 0,
      hints: ['Bộ biến đổi điện – cơ.'],
      solution:
        'Đầu dò chứa bộ biến đổi điện – cơ bằng thạch anh hoặc gốm áp điện: điện áp xoay chiều tần số siêu âm làm nó dao động cơ cùng tần số, phát ra siêu âm. Nó cũng biến tiếng vọng trở lại thành tín hiệu điện.',
    },
    {
      type: 'number',
      prompt:
        'Tiếng vọng từ một mặt phân cách trong mô mềm trở về đầu dò sau $65\\ \\mu\\text{s}$. Lấy tốc độ siêu âm trong mô là $1\\,540$ m/s. Mặt phân cách ở sâu bao nhiêu xentimét?',
      answer: 5,
      tolerance: 0.02,
      unit: 'cm',
      hints: ['Siêu âm đi tới mặt phân cách rồi quay về: quãng đường là $2d$.'],
      solution:
        '$d = \\dfrac{vt}{2} = \\dfrac{1\\,540 \\cdot 65 \\cdot 10^{-6}}{2} \\approx 0{,}050$ m $= 5{,}0$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Trên đồ thị kiểu A, tiếng vọng từ mặt trước và mặt sau của một khối mô xuất hiện ở $40\\ \\mu\\text{s}$ và $92\\ \\mu\\text{s}$. Bề dày khối mô là bao nhiêu xentimét ($v = 1\\,540$ m/s)?',
      answer: 4,
      tolerance: 0.02,
      unit: 'cm',
      hints: ['Dùng khoảng thời gian giữa hai tiếng vọng, rồi chia đôi quãng đường.'],
      solution:
        '$\\Delta t = 92 - 40 = 52\\ \\mu\\text{s}$; $\\Delta d = \\dfrac{1\\,540 \\cdot 52 \\cdot 10^{-6}}{2} \\approx 0{,}040$ m $= 4{,}0$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Trở kháng âm của cơ là $1{,}70 \\cdot 10^6$ kg/(m²·s), của xương là $7{,}80 \\cdot 10^6$ kg/(m²·s). Ở mặt phân cách cơ – xương, bao nhiêu phần trăm cường độ siêu âm bị phản xạ?',
      answer: 41.2,
      tolerance: 0.2,
      unit: '%',
      hints: ['$R = \\left(\\dfrac{Z_2 - Z_1}{Z_2 + Z_1}\\right)^2$.'],
      solution:
        '$R = \\left(\\dfrac{7{,}80 - 1{,}70}{7{,}80 + 1{,}70}\\right)^2 = \\left(\\dfrac{6{,}10}{9{,}50}\\right)^2 \\approx 0{,}412 = 41{,}2\\%$.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao phải bôi gel lên da trước khi đặt đầu dò siêu âm?',
      options: [
        'Để loại bỏ lớp không khí giữa đầu dò và da, nơi siêu âm bị phản xạ gần như hoàn toàn',
        'Để làm mát da khi siêu âm làm nóng da',
        'Để gel hấp thụ bớt siêu âm, bảo vệ cơ thể',
        'Để tăng tần số của siêu âm',
      ],
      answer: 0,
      hints: ['Trở kháng âm của không khí rất nhỏ so với của da.'],
      solution:
        'Không khí và da chênh lệch trở kháng âm rất lớn, nên siêu âm phản xạ gần như toàn bộ ở lớp không khí. Gel lấp đầy khe hở, có trở kháng gần bằng của da nên siêu âm đi vào cơ thể được.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao siêu âm ít được dùng để kiểm tra não ở người lớn?',
      options: [
        'Não được bao bọc bởi hộp sọ, siêu âm không đi qua được xương',
        'Não không có mặt phân cách nào để phản xạ siêu âm',
        'Siêu âm làm hỏng tế bào não',
        'Não quá nhỏ so với bước sóng siêu âm',
      ],
      answer: 0,
      hints: ['Xương phản xạ mạnh và hấp thụ mạnh siêu âm.'],
      solution:
        'Xương sọ phản xạ và hấp thụ gần hết siêu âm. Chỉ siêu âm não được khi hộp sọ mở trong phẫu thuật, hoặc ở trẻ sơ sinh qua thóp khi xương sọ chưa liền; thường dùng chụp cắt lớp hoặc cộng hưởng từ để kiểm tra não.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi kiểu siêu âm với cách hiển thị của nó.',
      left: ['Siêu âm kiểu A', 'Siêu âm kiểu B'],
      right: [
        'Đồ thị điện áp – thời gian của các tiếng vọng theo một phương',
        'Ảnh mặt cắt có độ sáng tối theo cường độ sóng phản xạ',
        'Ảnh lát cắt dựng từ tia X chiếu ở nhiều góc',
      ],
      pairs: [
        [0, 0],
        [1, 1],
      ],
      hints: ['Kiểu B tổng hợp tín hiệu kiểu A của nhiều vị trí đầu dò.'],
      solution:
        'Kiểu A cho đồ thị điện áp – thời gian theo một phương; kiểu B tổng hợp nhiều phương thành ảnh sáng tối. Ảnh lát cắt từ tia X là chụp cắt lớp, không phải siêu âm.',
    },
    {
      type: 'multi',
      prompt: 'Chọn những phát biểu đúng khi so sánh siêu âm với chụp X-quang.',
      options: [
        'Siêu âm thu sóng phản xạ, còn X-quang thu tia đã xuyên qua cơ thể',
        'Siêu âm không dùng bức xạ ion hoá nên dùng được để theo dõi thai nhi',
        'Siêu âm quan sát được cơ quan đang cử động như tim, thai nhi',
        'Siêu âm cho ảnh xương rõ hơn X-quang',
        'Siêu âm dùng sóng điện từ có tần số rất cao',
      ],
      answers: [0, 1, 2],
      hints: ['Siêu âm là sóng cơ; nhớ lại điều gì xảy ra khi siêu âm gặp xương.'],
      solution:
        'Siêu âm dùng sóng cơ phản xạ, ít gây hại nên dùng cho thai nhi, tim; ảnh tạo liên tục nên thấy được cử động. Siêu âm không đi qua được xương nên ảnh xương và vùng sau xương kém hơn X-quang.',
    },
  ],
  takeaways: [
    'Siêu âm là sóng cơ học có tần số lớn hơn $20$ kHz; siêu âm y khoa dùng khoảng $1$ MHz đến $15$ MHz.',
    'Đầu dò bằng thạch anh hoặc gốm áp điện biến dao động điện thành dao động cơ cùng tần số (phát) và ngược lại (thu).',
    'Siêu âm phản xạ ở mặt phân cách giữa các mô; trở kháng chênh lệch càng nhiều phản xạ càng mạnh: da, xương rõ; mô mềm, dịch kém; phải bôi gel để bỏ lớp không khí.',
    'Độ sâu mặt phân cách $d = \\dfrac{vt}{2}$; kiểu A hiển thị đồ thị điện áp – thời gian, kiểu B dựng ảnh mặt cắt sáng tối.',
  ],
};
