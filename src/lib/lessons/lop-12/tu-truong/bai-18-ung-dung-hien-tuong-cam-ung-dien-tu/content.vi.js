/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hiện tượng cảm ứng điện từ có nhiều ứng dụng: máy biến áp thay đổi điện áp xoay chiều theo tỉ số U₁/U₂ = N₁/N₂, nhờ đó điện năng được truyền tải đi xa ở điện áp cao để giảm hao phí; đàn ghi ta điện biến dao động của dây thép thành tín hiệu điện; bếp từ và sạc không dây cũng dùng từ trường biến thiên để tạo ra dòng điện cảm ứng.',
  intro:
    'Đặt điện thoại lên một tấm đế sạc, không cắm dây mà pin vẫn đầy dần. Nhà máy điện cách hàng trăm kilômét mà điện vẫn đến ổ cắm với điện áp đúng $220$ V. Đặt nồi lên bếp từ, đáy nồi nóng lên còn mặt bếp gần như không nóng. Tất cả đều dựa trên một hiện tượng: từ thông biến thiên sinh ra suất điện động cảm ứng.',
  objectives: [
    'Mô tả được cấu tạo và giải thích được nguyên tắc hoạt động của máy biến áp; vận dụng được $\\dfrac{U_1}{U_2} = \\dfrac{N_1}{N_2}$.',
    'Giải thích được vì sao phải dùng điện áp cao để truyền tải điện năng đi xa; tính được công suất hao phí $\\Delta P = \\dfrac{P^2R}{U^2}$.',
    'Giải thích được nguyên tắc hoạt động của đàn ghi ta điện, bếp từ và sạc không dây.',
  ],
  sections: [
    {
      heading: 'Máy biến áp',
      blocks: [
        {
          type: 'p',
          text: 'Máy biến áp là thiết bị dùng để biến đổi điện áp xoay chiều. Nó gồm hai cuộn dây có số vòng $N_1$, $N_2$ khác nhau quấn trên một lõi sắt kín. Lõi gồm nhiều lá thép kĩ thuật điện (thép silic) mỏng ghép cách điện với nhau để giảm hao phí do dòng điện Foucault (dòng điện xoáy) trong lõi. Cuộn sơ cấp nối với nguồn điện xoay chiều; cuộn thứ cấp nối với tải tiêu thụ điện.',
        },
        {
          type: 'p',
          text: 'Nguyên tắc hoạt động: dòng điện xoay chiều trong cuộn sơ cấp tạo ra từ trường biến thiên trong lõi sắt. Lõi sắt dẫn gần như toàn bộ đường sức từ qua cuộn thứ cấp, nên từ thông qua mỗi vòng của hai cuộn biến thiên như nhau. Theo định luật Faraday, trong cuộn thứ cấp xuất hiện suất điện động cảm ứng $e_2 = -N_2\\dfrac{\\Delta\\Phi}{\\Delta t}$, còn trong cuộn sơ cấp $e_1 = -N_1\\dfrac{\\Delta\\Phi}{\\Delta t}$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức máy biến áp',
          text: 'Với máy biến áp lí tưởng (bỏ qua mọi hao phí), tỉ số điện áp hiệu dụng ở hai đầu hai cuộn dây bằng tỉ số số vòng dây: $$\\dfrac{U_1}{U_2} = \\dfrac{N_1}{N_2}.$$ Công suất ở hai cuộn bằng nhau, $U_1I_1 = U_2I_2$, nên $\\dfrac{I_2}{I_1} = \\dfrac{N_1}{N_2}$.',
        },
        {
          type: 'list',
          items: [
            '$N_2 > N_1$: $U_2 > U_1$, máy tăng áp.',
            '$N_2 < N_1$: $U_2 < U_1$, máy hạ áp (sạc điện thoại, đèn ngủ, các bộ nguồn).',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chỉ dùng với dòng điện xoay chiều',
          text: 'Nối cuộn sơ cấp với nguồn một chiều thì từ thông trong lõi không đổi, cuộn thứ cấp không có điện áp. Máy biến áp không biến đổi được điện áp một chiều và cũng không làm thay đổi tần số của dòng điện.',
        },
      ],
    },
    {
      heading: 'Truyền tải điện năng đi xa',
      blocks: [
        {
          type: 'p',
          text: 'Nhà máy điện truyền công suất $P$ đi xa bằng đường dây có điện trở $R$ dưới điện áp $U$. Cường độ dòng điện trên dây là $I = \\dfrac{P}{U}$ (bỏ qua sự lệch pha giữa $u$ và $i$), nên công suất toả nhiệt trên dây là $$\\Delta P = I^2R = \\dfrac{P^2R}{U^2}.$$',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Giảm hao phí bằng điện áp cao',
          text: 'Với cùng công suất cần truyền, $\\Delta P$ tỉ lệ nghịch với $U^2$: tăng điện áp lên $10$ lần thì hao phí giảm $100$ lần. Giảm $R$ thì phải dùng dây to, nặng và đắt hơn nhiều. Vì vậy ở đầu đường dây người ta dùng máy tăng áp (lên $110$ kV, $220$ kV, $500$ kV), đến nơi tiêu thụ dùng máy hạ áp về $220$ V.',
        },
        { type: 'widget', name: 'transmission' },
      ],
    },
    {
      heading: 'Đàn ghi ta điện, bếp từ, sạc không dây',
      blocks: [
        {
          type: 'p',
          text: 'Đàn ghi ta điện có thân đặc, không có hộp cộng hưởng. Dưới mỗi dây đàn có một bộ cảm biến gồm nam châm nhỏ và cuộn dây. Dây đàn bằng thép bị nam châm làm nhiễm từ; khi gảy, đoạn dây trên cuộn dây dao động làm từ thông qua cuộn dây biến thiên cùng tần số với dây đàn. Suất điện động cảm ứng trong cuộn dây được đưa đến bộ khuếch đại rồi ra loa. Gảy mạnh thì dây dao động với biên độ lớn, từ thông biến thiên nhanh hơn, suất điện động lớn hơn nên âm to hơn.',
        },
        {
          type: 'p',
          text: 'Bếp từ có một cuộn dây phẳng đặt dưới mặt kính, cho dòng điện xoay chiều tần số cao (cỡ hàng chục kilôhéc) chạy qua. Từ trường biến thiên nhanh xuyên qua đáy nồi kim loại, sinh ra trong đó các dòng điện cảm ứng chạy thành vòng (dòng điện Foucault); dòng điện này làm đáy nồi nóng lên. Mặt kính không dẫn điện nên chỉ ấm lên do nhận nhiệt từ đáy nồi. Nồi dùng cho bếp từ phải có đáy bằng vật liệu có tính sắt từ như gang, thép.',
        },
        {
          type: 'p',
          text: 'Sạc không dây hoạt động giống một máy biến áp tách đôi: cuộn dây trong đế sạc (sơ cấp) có dòng điện xoay chiều, cuộn dây trong điện thoại (thứ cấp) nằm trong từ trường biến thiên của nó nên xuất hiện suất điện động cảm ứng, được chỉnh lưu để nạp pin. Ngoài ra, hiện tượng cảm ứng điện từ còn được dùng trong máy phát điện, micrô điện động, cảm biến tốc độ, cổng dò kim loại và phanh điện từ.',
        },
      ],
    },
  ],
  explore: {
    title: 'Máy biến áp',
    instruction:
      'Kéo thanh trượt để đổi số vòng $N_1$, $N_2$ và quan sát điện áp ra $U_2$. Tìm cách bố trí để có máy tăng áp và máy hạ áp; thử đổi sang nguồn một chiều để thấy máy biến áp không hoạt động.',
  },
  examples: [
    {
      problem:
        'Một máy biến áp lí tưởng có cuộn sơ cấp $1\\,100$ vòng nối vào điện áp xoay chiều $220$ V. Muốn lấy ra điện áp $12$ V ở cuộn thứ cấp thì cuộn thứ cấp phải có bao nhiêu vòng? Nếu cuộn thứ cấp cấp dòng $2$ A cho tải thì dòng điện trong cuộn sơ cấp bằng bao nhiêu?',
      steps: [
        '$\\dfrac{U_1}{U_2} = \\dfrac{N_1}{N_2} \\Rightarrow N_2 = N_1\\dfrac{U_2}{U_1} = 1\\,100 \\cdot \\dfrac{12}{220} = 60$ vòng.',
        'Máy lí tưởng: $U_1I_1 = U_2I_2 \\Rightarrow I_1 = \\dfrac{U_2I_2}{U_1} = \\dfrac{12 \\cdot 2}{220} \\approx 0{,}11$ A.',
      ],
      answer: '$N_2 = 60$ vòng; $I_1 \\approx 0{,}11$ A.',
    },
    {
      problem:
        'Một nhà máy truyền đi công suất $500$ kW trên đường dây có điện trở tổng cộng $20\\ \\Omega$. Tính công suất hao phí trên đường dây khi điện áp truyền tải là $5$ kV và khi là $25$ kV.',
      steps: [
        'Ở $5$ kV: $I = \\dfrac{P}{U} = \\dfrac{500\\,000}{5\\,000} = 100$ A, $\\Delta P = I^2R = 100^2 \\cdot 20 = 200\\,000$ W $= 200$ kW (mất $40\\,\\%$).',
        'Ở $25$ kV: $I = \\dfrac{500\\,000}{25\\,000} = 20$ A, $\\Delta P = 20^2 \\cdot 20 = 8\\,000$ W $= 8$ kW (mất $1{,}6\\,\\%$).',
        'Điện áp tăng $5$ lần thì hao phí giảm $5^2 = 25$ lần.',
      ],
      answer: '$200$ kW ở $5$ kV và $8$ kW ở $25$ kV.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Máy biến áp lí tưởng có cuộn sơ cấp $1\\,000$ vòng, cuộn thứ cấp $50$ vòng. Nối cuộn sơ cấp vào điện áp xoay chiều $220$ V thì điện áp hiệu dụng ở cuộn thứ cấp bằng bao nhiêu vôn?',
      answer: 11,
      unit: 'V',
      hints: ['$U_2 = U_1\\dfrac{N_2}{N_1}$.'],
      solution: '$U_2 = 220 \\cdot \\dfrac{50}{1\\,000} = 11$ V.',
    },
    {
      type: 'number',
      prompt:
        'Cần hạ điện áp $220$ V xuống $6$ V bằng một máy biến áp lí tưởng có cuộn sơ cấp $2\\,200$ vòng. Cuộn thứ cấp phải có bao nhiêu vòng?',
      answer: 60,
      unit: 'vòng',
      hints: ['$N_2 = N_1\\dfrac{U_2}{U_1}$.'],
      solution: '$N_2 = 2\\,200 \\cdot \\dfrac{6}{220} = 60$ vòng.',
    },
    {
      type: 'choice',
      prompt: 'Máy biến áp là máy tăng áp khi',
      options: [
        'số vòng cuộn thứ cấp lớn hơn số vòng cuộn sơ cấp',
        'số vòng cuộn sơ cấp lớn hơn số vòng cuộn thứ cấp',
        'cuộn sơ cấp nối với nguồn một chiều',
        'lõi sắt được làm bằng một khối thép đặc',
      ],
      answer: 0,
      hints: ['$\\dfrac{U_2}{U_1} = \\dfrac{N_2}{N_1}$: $U_2 > U_1$ khi nào?'],
      solution: '$U_2 > U_1$ khi và chỉ khi $N_2 > N_1$: cuộn thứ cấp nhiều vòng hơn cuộn sơ cấp.',
    },
    {
      type: 'choice',
      prompt:
        'Nối cuộn sơ cấp của một máy biến áp với acquy $12$ V (nguồn một chiều). Điện áp ở cuộn thứ cấp',
      options: [
        'bằng 0 khi dòng điện đã ổn định',
        'bằng $12$ V nhân với tỉ số $\\dfrac{N_2}{N_1}$',
        'bằng $12$ V',
        'là điện áp xoay chiều tần số $50$ Hz',
      ],
      answer: 0,
      hints: ['Dòng điện không đổi tạo ra từ thông có biến thiên không?'],
      solution:
        'Dòng điện một chiều ổn định tạo từ thông không đổi trong lõi, nên cuộn thứ cấp không có suất điện động cảm ứng: $U_2 = 0$ (chỉ có xung điện áp ngắn lúc đóng, ngắt mạch).',
    },
    {
      type: 'number',
      prompt:
        'Một máy hạ áp lí tưởng biến điện áp $220$ V thành $11$ V và cấp dòng $2$ A cho tải. Cường độ dòng điện trong cuộn sơ cấp bằng bao nhiêu ampe?',
      answer: 0.1,
      unit: 'A',
      hints: ['Máy lí tưởng: công suất hai cuộn bằng nhau, $U_1I_1 = U_2I_2$.'],
      solution: '$I_1 = \\dfrac{U_2I_2}{U_1} = \\dfrac{11 \\cdot 2}{220} = 0{,}1$ A.',
    },
    {
      type: 'number',
      prompt:
        'Truyền công suất $200$ kW dưới điện áp $10$ kV trên đường dây có điện trở $10\\ \\Omega$. Công suất hao phí trên đường dây bằng bao nhiêu kilôoát?',
      answer: 4,
      unit: 'kW',
      hints: ['$I = \\dfrac{P}{U}$, rồi $\\Delta P = I^2R$.'],
      solution:
        '$I = \\dfrac{200\\,000}{10\\,000} = 20$ A; $\\Delta P = 20^2 \\cdot 10 = 4\\,000$ W $= 4$ kW.',
    },
    {
      type: 'number',
      prompt:
        'Giữ nguyên công suất truyền đi và điện trở đường dây, tăng điện áp truyền tải lên $10$ lần thì công suất hao phí trên đường dây giảm bao nhiêu lần?',
      answer: 100,
      unit: 'lần',
      hints: ['$\\Delta P = \\dfrac{P^2R}{U^2}$.'],
      solution:
        '$\\Delta P$ tỉ lệ nghịch với $U^2$, nên $U$ tăng $10$ lần thì $\\Delta P$ giảm $10^2 = 100$ lần.',
    },
    {
      type: 'choice',
      prompt: 'Đáy nồi đặt trên bếp từ nóng lên chủ yếu là do',
      options: [
        'dòng điện Foucault (dòng điện xoáy) xuất hiện trong đáy nồi',
        'mặt kính của bếp bị nung nóng rồi truyền nhiệt sang nồi',
        'tia lửa điện phóng từ cuộn dây lên đáy nồi',
        'bức xạ hồng ngoại phát ra từ cuộn dây nóng đỏ',
      ],
      answer: 0,
      hints: [
        'Từ trường biến thiên nhanh xuyên qua một khối kim loại thì trong khối đó xuất hiện gì?',
      ],
      solution:
        'Từ trường biến thiên với tần số cao gây ra trong đáy nồi các dòng điện cảm ứng xoáy (dòng Foucault); chúng toả nhiệt làm nóng nồi. Mặt kính không dẫn điện nên chỉ ấm lên do tiếp xúc với đáy nồi.',
    },
    {
      type: 'choice',
      prompt: 'Dây của đàn ghi ta điện phải làm bằng thép vì',
      options: [
        'thép bị nhiễm từ, dây dao động làm từ thông qua cuộn dây cảm biến biến thiên',
        'thép dẫn điện tốt nên dòng điện chạy dọc theo dây ra loa',
        'thép nặng nên âm phát ra trực tiếp to hơn',
        'thép không bị nhiễm từ nên không làm nhiễu nam châm',
      ],
      answer: 0,
      hints: ['Bộ cảm biến dưới dây đàn gồm nam châm và cuộn dây.'],
      solution:
        'Dây thép bị nam châm của bộ cảm biến làm nhiễm từ; khi dây dao động, từ thông qua cuộn dây biến thiên, sinh ra suất điện động cảm ứng cùng tần số với dây đàn.',
    },
  ],
  takeaways: [
    'Máy biến áp hoạt động dựa trên cảm ứng điện từ, chỉ với dòng điện xoay chiều: $\\dfrac{U_1}{U_2} = \\dfrac{N_1}{N_2}$; máy lí tưởng có $U_1I_1 = U_2I_2$.',
    'Hao phí trên đường dây $\\Delta P = \\dfrac{P^2R}{U^2}$: truyền tải ở điện áp cao (máy tăng áp) rồi hạ áp ở nơi tiêu thụ.',
    'Đàn ghi ta điện, bếp từ (dòng điện Foucault), sạc không dây, micrô, máy phát điện đều dựa trên từ thông biến thiên sinh ra suất điện động cảm ứng.',
  ],
};
