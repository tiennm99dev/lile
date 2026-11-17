/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Máy biến áp gồm lõi thép và hai cuộn dây, hoạt động dựa trên hiện tượng cảm ứng điện từ, biến đổi điện áp xoay chiều mà không đổi tần số theo U1/U2 = N1/N2; tăng điện áp truyền đi n lần làm hao phí trên đường dây giảm n² lần.',
  intro:
    'Máy phát ở nhà máy điện tạo ra điện áp cỡ mười đến vài chục kilôvôn, đường dây Bắc – Nam truyền điện ở $500$ kV, còn ổ cắm trong nhà chỉ có $220$ V và bộ sạc điện thoại cần khoảng $5$ V. Thiết bị nào làm thay đổi điện áp như vậy, và vì sao người ta phải nâng điện áp lên rất cao trước khi truyền điện đi xa?',
  objectives: [
    'Mô tả được cấu tạo và nêu được nguyên tắc hoạt động của máy biến áp.',
    'Vận dụng được công thức $\\dfrac{U_1}{U_2} = \\dfrac{N_1}{N_2} = \\dfrac{I_2}{I_1}$ của máy biến áp lí tưởng.',
    'Tính được công suất hao phí trên đường dây $P_{hp} = \\dfrac{P^2}{U^2}R$ và hiệu suất truyền tải.',
    'Đánh giá được vai trò của máy biến áp trong việc giảm hao phí khi truyền tải điện năng đi xa và ưu điểm của dòng điện xoay chiều.',
  ],
  sections: [
    {
      heading: 'Cấu tạo và nguyên tắc hoạt động',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Máy biến áp',
          text: 'Máy biến áp là thiết bị dùng để biến đổi điện áp xoay chiều mà không làm thay đổi tần số của nó.',
        },
        {
          type: 'list',
          items: [
            'Lõi biến áp: gồm nhiều lá thép mỏng pha silic ghép cách điện với nhau (để giảm dòng điện Foucault và hao phí do toả nhiệt trong lõi), tạo thành một khung kín.',
            'Hai cuộn dây có số vòng khác nhau quấn trên lõi, cách điện với lõi. Cuộn sơ cấp ($N_1$ vòng) nối với nguồn điện xoay chiều; cuộn thứ cấp ($N_2$ vòng) nối với tải tiêu thụ.',
          ],
        },
        {
          type: 'p',
          text: 'Nguyên tắc hoạt động dựa trên hiện tượng cảm ứng điện từ. Dòng điện xoay chiều trong cuộn sơ cấp tạo ra từ trường biến thiên; lõi thép dẫn gần như toàn bộ từ thông này qua cuộn thứ cấp. Từ thông biến thiên qua cuộn thứ cấp làm xuất hiện suất điện động cảm ứng xoay chiều cùng tần số với dòng điện ở cuộn sơ cấp. Dòng điện một chiều không đổi không tạo ra từ thông biến thiên, nên máy biến áp không hoạt động với dòng điện một chiều.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức máy biến áp',
          text: 'Với máy biến áp lí tưởng (bỏ qua mọi hao phí): $$\\dfrac{U_1}{U_2} = \\dfrac{N_1}{N_2} = \\dfrac{I_2}{I_1}.$$ Nếu $N_2 > N_1$ thì $U_2 > U_1$: máy tăng áp. Nếu $N_2 < N_1$ thì $U_2 < U_1$: máy hạ áp. Điện áp tăng bao nhiêu lần thì cường độ dòng điện giảm bấy nhiêu lần, vì công suất hai cuộn bằng nhau: $U_1I_1 = U_2I_2$.',
        },
      ],
    },
    {
      heading: 'Truyền tải điện năng đi xa',
      blocks: [
        {
          type: 'p',
          text: 'Nhà máy điện phát công suất $P = UI$ (coi hệ số công suất bằng $1$) lên đường dây có điện trở $R = \\rho\\dfrac{l}{S}$, với $l$ là tổng chiều dài dây dẫn. Dòng điện $I = \\dfrac{P}{U}$ chạy trên dây làm dây nóng lên; phần điện năng biến thành nhiệt trên dây là hao phí:',
        },
        { type: 'tex', tex: 'P_{hp} = I^2R = \\dfrac{P^2}{U^2}R' },
        {
          type: 'p',
          text: 'Công suất đến nơi tiêu thụ là $P_t = P - P_{hp}$, hiệu suất truyền tải $H = \\dfrac{P - P_{hp}}{P}$. Để giảm hao phí có hai cách:',
        },
        {
          type: 'table',
          caption: 'Các cách giảm hao phí trên đường dây',
          head: ['Cách', 'Thực hiện', 'Nhận xét'],
          rows: [
            [
              'Giảm $R$',
              'Dùng kim loại có điện trở suất nhỏ, tăng tiết diện $S$ của dây',
              'Dây nặng, tốn kim loại, phải xây cột điện chắc hơn: rất tốn kém',
            ],
            [
              'Tăng $U$',
              'Dùng máy tăng áp ở nơi phát, máy hạ áp ở nơi tiêu thụ',
              'Tăng $U$ lên $n$ lần thì hao phí giảm $n^2$ lần: hiệu quả, chi phí thấp',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ưu điểm của dòng điện xoay chiều',
          text: 'Dòng điện xoay chiều biến thiên liên tục nên dễ dàng tăng, giảm điện áp bằng máy biến áp có hiệu suất rất cao. Nhờ đó truyền tải điện đi xa với hao phí nhỏ, dùng được nhiều thiết bị có điện áp khác nhau, và giảm chi phí xây dựng, vận hành lưới điện. Lưới điện Việt Nam truyền tải ở $500$ kV, $220$ kV, $110$ kV rồi hạ dần xuống $22$ kV và $220$ V cho các gia đình.',
        },
      ],
    },
    {
      heading: 'Dự án: Tìm hiểu máy biến áp quanh em',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: nhận biết máy biến áp trong thực tế, đọc các thông số trên nhãn và giải thích vai trò của từng loại máy trong lưới điện. Dụng cụ: điện thoại để chụp ảnh, sổ ghi chép, các bộ sạc hoặc ổn áp cũ (đã rút điện) trong nhà.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chụp ảnh trạm biến áp gần nhà (chỉ đứng ngoài hàng rào), ghi các thông số trên biển (điện áp vào, điện áp ra, công suất).',
            'Đọc nhãn một bộ sạc hoặc một biến áp nguồn: ghi điện áp vào, điện áp ra, cường độ dòng điện ra.',
            'Với mỗi máy, cho biết đó là máy tăng áp hay hạ áp, tính tỉ số $\\dfrac{N_1}{N_2}$ và cường độ dòng điện sơ cấp nếu coi máy là lí tưởng.',
            'Vẽ sơ đồ đường đi của điện năng từ nhà máy đến nhà em, ghi các cấp điện áp và vị trí các máy tăng áp, hạ áp.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'An toàn',
          text: 'Không mở vỏ, không chạm vào trạm biến áp hay dây dẫn điện. Chỉ đọc nhãn của thiết bị đã rút khỏi ổ cắm.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Nộp ảnh, bảng thông số, các phép tính tỉ số vòng dây và sơ đồ truyền tải. Giải thích vì sao điện được truyền đi ở điện áp rất cao nhưng lại được hạ xuống trước khi đưa vào nhà.',
        },
      ],
    },
  ],
  explore: {
    title: 'Máy biến áp và đường dây truyền tải',
    instruction:
      'Chỉnh số vòng hai cuộn dây và điện trở tải, quan sát điện áp và dòng điện hai cuộn; thử đổi sang nguồn một chiều. Ở phần dưới, chọn điện áp truyền đi và khoảng cách, so sánh phần công suất bị mất trên đường dây.',
  },
  examples: [
    {
      problem:
        'Một máy biến áp lí tưởng có $N_1 = 1\\,000$ vòng, $N_2 = 50$ vòng, cuộn sơ cấp nối với điện áp $220$ V. Cuộn thứ cấp nối với điện trở $11\\ \\Omega$. Tính điện áp và cường độ dòng điện ở hai cuộn.',
      steps: [
        '$U_2 = U_1\\dfrac{N_2}{N_1} = 220 \\cdot \\dfrac{50}{1\\,000} = 11$ V: đây là máy hạ áp.',
        '$I_2 = \\dfrac{U_2}{R} = \\dfrac{11}{11} = 1$ A.',
        '$I_1 = I_2\\dfrac{N_2}{N_1} = 1 \\cdot \\dfrac{50}{1\\,000} = 0{,}05$ A. Kiểm tra: $U_1I_1 = 11$ W $= U_2I_2$.',
      ],
      answer: '$U_2 = 11$ V, $I_2 = 1$ A, $I_1 = 0{,}05$ A.',
    },
    {
      problem:
        'Một nhà máy truyền đi công suất $500$ kW trên đường dây có điện trở $20\\ \\Omega$. Tính công suất hao phí và hiệu suất truyền tải khi điện áp truyền đi là $5$ kV và khi là $50$ kV.',
      steps: [
        'Với $U = 5$ kV: $P_{hp} = \\dfrac{P^2}{U^2}R = \\dfrac{(5 \\cdot 10^5)^2}{(5 \\cdot 10^3)^2} \\cdot 20 = 2 \\cdot 10^5$ W $= 200$ kW; $H = \\dfrac{500 - 200}{500} = 60\\%$.',
        'Với $U = 50$ kV: $P_{hp} = \\dfrac{(5 \\cdot 10^5)^2}{(5 \\cdot 10^4)^2} \\cdot 20 = 2\\,000$ W $= 2$ kW; $H = \\dfrac{500 - 2}{500} = 99{,}6\\%$.',
        'Điện áp tăng $10$ lần thì hao phí giảm $10^2 = 100$ lần.',
      ],
      answer: '$200$ kW và $60\\%$ ở $5$ kV; $2$ kW và $99{,}6\\%$ ở $50$ kV.',
    },
    {
      problem:
        'Cần truyền công suất $1$ MW trên đường dây có điện trở $10\\ \\Omega$ sao cho hao phí không vượt quá $5\\%$ công suất truyền đi. Điện áp truyền đi tối thiểu là bao nhiêu?',
      steps: [
        'Điều kiện: $\\dfrac{P^2}{U^2}R \\le 0{,}05P$, tức $U^2 \\ge \\dfrac{PR}{0{,}05}$.',
        '$U^2 \\ge \\dfrac{10^6 \\cdot 10}{0{,}05} = 2 \\cdot 10^8$ nên $U \\ge \\sqrt{2 \\cdot 10^8} \\approx 14\\,142$ V.',
      ],
      answer: 'Điện áp truyền đi tối thiểu khoảng $14{,}1$ kV.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Máy biến áp hoạt động dựa trên hiện tượng nào?',
      options: [
        'Cảm ứng điện từ',
        'Tác dụng nhiệt của dòng điện',
        'Nhiễm điện do hưởng ứng',
        'Cộng hưởng điện',
      ],
      answer: 0,
      hints: ['Suất điện động ở cuộn thứ cấp xuất hiện do từ thông qua nó biến thiên.'],
      solution:
        'Từ thông biến thiên do dòng điện xoay chiều ở cuộn sơ cấp đi qua cuộn thứ cấp, làm xuất hiện suất điện động cảm ứng: đó là hiện tượng cảm ứng điện từ.',
    },
    {
      type: 'number',
      prompt:
        'Máy biến áp lí tưởng có $N_1 = 2\\,200$ vòng, $N_2 = 120$ vòng, cuộn sơ cấp nối với điện áp $220$ V. Điện áp hiệu dụng ở cuộn thứ cấp là bao nhiêu vôn?',
      answer: 12,
      unit: 'V',
      hints: ['$\\dfrac{U_1}{U_2} = \\dfrac{N_1}{N_2}$.'],
      solution: '$U_2 = U_1\\dfrac{N_2}{N_1} = 220 \\cdot \\dfrac{120}{2\\,200} = 12$ V.',
    },
    {
      type: 'number',
      prompt:
        'Cần quấn một biến áp nguồn lí tưởng hạ điện áp từ $220$ V xuống $6$ V. Cuộn sơ cấp có $1\\,100$ vòng. Cuộn thứ cấp phải có bao nhiêu vòng?',
      answer: 30,
      unit: 'vòng',
      hints: ['$N_2 = N_1\\dfrac{U_2}{U_1}$.'],
      solution: '$N_2 = 1\\,100 \\cdot \\dfrac{6}{220} = 30$ vòng.',
    },
    {
      type: 'number',
      prompt:
        'Một máy hạ áp lí tưởng có $\\dfrac{N_1}{N_2} = 10$. Cường độ dòng điện ở cuộn thứ cấp là $2$ A. Cường độ dòng điện ở cuộn sơ cấp là bao nhiêu ampe?',
      answer: 0.2,
      unit: 'A',
      hints: ['$\\dfrac{I_2}{I_1} = \\dfrac{N_1}{N_2}$: cuộn có ít vòng hơn có dòng điện lớn hơn.'],
      solution: '$I_1 = I_2\\dfrac{N_2}{N_1} = \\dfrac{2}{10} = 0{,}2$ A.',
    },
    {
      type: 'choice',
      prompt:
        'Lõi của máy biến áp được làm bằng nhiều lá thép mỏng pha silic ghép cách điện với nhau để',
      options: [
        'giảm hao phí do dòng điện Foucault trong lõi',
        'tăng điện áp ở cuộn thứ cấp',
        'tăng tần số của dòng điện',
        'cách điện giữa cuộn sơ cấp và cuộn thứ cấp',
      ],
      answer: 0,
      hints: ['Trong một khối kim loại đặt trong từ trường biến thiên xuất hiện dòng điện gì?'],
      solution:
        'Từ thông biến thiên tạo ra dòng điện Foucault trong lõi, làm lõi nóng lên. Chia lõi thành các lá mỏng ghép cách điện làm dòng Foucault nhỏ đi, giảm hao phí.',
    },
    {
      type: 'number',
      prompt:
        'Giữ nguyên công suất truyền đi và đường dây, tăng điện áp truyền đi lên $10$ lần thì công suất hao phí trên đường dây giảm bao nhiêu lần?',
      answer: 100,
      unit: 'lần',
      hints: ['$P_{hp} = \\dfrac{P^2}{U^2}R$: hao phí tỉ lệ nghịch với $U^2$.'],
      solution:
        'Hao phí tỉ lệ nghịch với $U^2$, nên $U$ tăng $10$ lần thì hao phí giảm $10^2 = 100$ lần.',
    },
    {
      type: 'number',
      prompt:
        'Truyền công suất $100$ kW ở điện áp $10$ kV trên đường dây có điện trở $5\\ \\Omega$. Công suất hao phí trên đường dây là bao nhiêu oát?',
      answer: 500,
      unit: 'W',
      hints: ['Tính cường độ dòng điện trên dây $I = \\dfrac{P}{U}$ trước.', '$P_{hp} = I^2R$.'],
      solution: '$I = \\dfrac{10^5}{10^4} = 10$ A, $P_{hp} = 10^2 \\cdot 5 = 500$ W.',
    },
    {
      type: 'number',
      prompt: 'Với số liệu ở câu trên, hiệu suất truyền tải là bao nhiêu phần trăm?',
      answer: 99.5,
      tolerance: 0.01,
      unit: '%',
      hints: ['$H = \\dfrac{P - P_{hp}}{P}$.'],
      solution: '$H = \\dfrac{100\\,000 - 500}{100\\,000} = 0{,}995 = 99{,}5\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Đường dây bằng đồng ($\\rho = 1{,}7 \\cdot 10^{-8}\\ \\Omega\\cdot\\text{m}$) có tổng chiều dài dây $10$ km, tiết diện $0{,}5\\ \\text{cm}^2$. Điện trở của đường dây là bao nhiêu ôm?',
      answer: 3.4,
      tolerance: 0.01,
      unit: 'Ω',
      hints: [
        'Đổi đơn vị: $l = 10^4$ m, $S = 0{,}5 \\cdot 10^{-4}\\ \\text{m}^2$.',
        '$R = \\rho\\dfrac{l}{S}$.',
      ],
      solution:
        '$R = 1{,}7 \\cdot 10^{-8} \\cdot \\dfrac{10^4}{5 \\cdot 10^{-5}} = 3{,}4\\ \\Omega$.',
    },
    {
      type: 'multi',
      prompt: 'Những cách nào làm giảm hao phí do toả nhiệt trên đường dây truyền tải?',
      options: [
        'Tăng điện áp ở nơi phát bằng máy tăng áp',
        'Tăng tiết diện dây dẫn',
        'Dùng dây có điện trở suất nhỏ hơn',
        'Tăng chiều dài dây dẫn',
        'Giảm điện áp ở nơi phát',
      ],
      answers: [0, 1, 2],
      hints: [
        '$P_{hp} = \\dfrac{P^2}{U^2}\\rho\\dfrac{l}{S}$: xem mỗi cách làm thừa số nào tăng, giảm.',
      ],
      solution:
        'Hao phí giảm khi $U$ tăng, $S$ tăng hoặc $\\rho$ giảm. Tăng chiều dài dây hay giảm điện áp đều làm hao phí tăng. Trong thực tế tăng $U$ là cách hiệu quả và rẻ nhất.',
    },
    {
      type: 'choice',
      prompt: 'Máy biến áp lí tưởng không làm thay đổi đại lượng nào sau đây?',
      options: [
        'Tần số của dòng điện',
        'Điện áp hiệu dụng',
        'Cường độ dòng điện hiệu dụng',
        'Điện áp cực đại',
      ],
      answer: 0,
      hints: [
        'Suất điện động ở cuộn thứ cấp biến thiên theo nhịp của từ thông do cuộn sơ cấp tạo ra.',
      ],
      solution:
        'Máy biến áp biến đổi điện áp và cường độ dòng điện xoay chiều nhưng giữ nguyên tần số: từ thông qua hai cuộn biến thiên cùng tần số với dòng điện ở cuộn sơ cấp.',
    },
  ],
  takeaways: [
    'Máy biến áp gồm lõi thép kĩ thuật điện và hai cuộn dây; hoạt động dựa trên hiện tượng cảm ứng điện từ, chỉ với dòng điện xoay chiều, không làm thay đổi tần số.',
    'Máy lí tưởng: $\\dfrac{U_1}{U_2} = \\dfrac{N_1}{N_2} = \\dfrac{I_2}{I_1}$; $N_2 > N_1$ là máy tăng áp, $N_2 < N_1$ là máy hạ áp.',
    'Hao phí trên đường dây $P_{hp} = \\dfrac{P^2}{U^2}R$, $R = \\rho\\dfrac{l}{S}$; tăng $U$ lên $n$ lần thì hao phí giảm $n^2$ lần.',
    'Điện được tăng áp ở nơi phát để truyền đi xa và hạ áp ở nơi tiêu thụ để dùng an toàn.',
  ],
};
