/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Cảm biến cảm nhận sự thay đổi của một đại lượng vật lí và biến nó thành tín hiệu điện; điện trở quang (LDR) giảm điện trở khi được chiếu sáng mạnh hơn, điện trở nhiệt NTC giảm điện trở khi nóng lên, còn PTC thì ngược lại; đặt cảm biến vào mạch chia áp ta được một điện áp ra thay đổi theo ánh sáng hay nhiệt độ.',
  intro:
    'Con người cảm nhận thế giới bằng các giác quan, nhưng có những thứ ta không cảm nhận được hoặc cảm nhận không chính xác: nhiệt độ chính xác của lò nướng, độ sáng đủ để bật đèn đường, khí độc không màu không mùi. Các thiết bị điện tử "cảm nhận" chúng bằng cảm biến. Cảm biến hoạt động thế nào, và làm sao biến sự thay đổi của nó thành một điện áp để điều khiển thiết bị?',
  objectives: [
    'Nêu được khái niệm cảm biến và vai trò của nó trong hệ thống điều khiển tự động.',
    'Phân biệt được cảm biến biến đổi trực tiếp và cảm biến biến đổi gián tiếp; kể được một số loại cảm biến và ứng dụng.',
    'Mô tả được nguyên tắc hoạt động của điện trở quang (LDR) và điện trở nhiệt (NTC, PTC).',
    'Tính được điện áp ra của mạch chia áp có cảm biến và giải thích được điện áp ra thay đổi thế nào theo ánh sáng, nhiệt độ.',
  ],
  sections: [
    {
      heading: 'Khái niệm và phân loại cảm biến',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Cảm biến',
          text: 'Cảm biến là thiết bị cảm nhận sự thay đổi của các đại lượng vật lí (nhiệt độ, ánh sáng, âm thanh, áp suất, độ ẩm, chuyển động...) và biến đổi chúng thành tín hiệu điện.',
        },
        {
          type: 'p',
          text: 'Một hệ thống điều khiển tự động thường gồm ba khối: thiết bị đầu vào (cảm biến) nhận tín hiệu từ môi trường, bộ xử lí (thường có bộ khuếch đại) xử lí tín hiệu điện đó, và thiết bị đầu ra (đèn, loa, động cơ, relay...) thực hiện tác động. Chẳng hạn trong hệ thống phát thanh gồm micro, máy tăng âm và loa, micro là cảm biến: nó biến dao động âm thành tín hiệu điện.',
        },
        {
          type: 'table',
          caption: 'Phân loại cảm biến theo cách biến đổi tín hiệu',
          head: ['Loại', 'Cách biến đổi', 'Ví dụ'],
          rows: [
            [
              'Cảm biến biến đổi trực tiếp',
              'Đại lượng vật lí được biến đổi thẳng thành tín hiệu điện (suất điện động, dòng điện).',
              'Pin quang điện, cặp nhiệt điện, micro điện động.',
            ],
            [
              'Cảm biến biến đổi gián tiếp',
              'Đại lượng vật lí làm thay đổi điện trở (hoặc một thông số khác) của cảm biến; mạch điện chứa nó biến sự thay đổi đó thành thay đổi điện áp hoặc dòng điện.',
              'Điện trở quang (LDR), điện trở nhiệt (NTC, PTC).',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Theo đại lượng cần đo, có cảm biến nhiệt độ, cảm biến ánh sáng, cảm biến âm thanh, cảm biến áp suất, cảm biến hồng ngoại, cảm biến khói, cảm biến chuyển động... Chúng có mặt trong điều hoà, tủ lạnh, nồi cơm điện, đèn đường tự động, cửa tự động, điện thoại thông minh, ô tô và các thiết bị đo trong phòng thí nghiệm.',
        },
      ],
    },
    {
      heading: 'Điện trở quang (LDR)',
      blocks: [
        {
          type: 'p',
          text: 'Điện trở quang (điện trở phụ thuộc ánh sáng, viết tắt LDR) là một lớp bán dẫn, thường là cadmium sulfide, phủ trên một đế cách điện, nối với hai điện cực. Khi ánh sáng chiếu vào, bán dẫn hấp thụ năng lượng ánh sáng và giải phóng thêm các hạt mang điện tự do, nên nó dẫn điện tốt hơn.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nguyên tắc hoạt động của LDR',
          text: 'Cường độ ánh sáng chiếu vào LDR càng lớn thì điện trở của nó càng nhỏ. Trong bóng tối, điện trở của LDR có thể tới cỡ megaôm; dưới ánh sáng mạnh nó chỉ còn cỡ vài trăm ôm.',
        },
        {
          type: 'p',
          text: 'Điện trở giảm rất nhanh khi độ rọi tăng, nên đồ thị điện trở theo độ rọi thường được vẽ trên thang lôgarit. Ví dụ, một LDR có điện trở khoảng $100$ k$\\Omega$ ở $1$ lx, $20$ k$\\Omega$ ở $10$ lx và chưa tới $1$ k$\\Omega$ ở $1\\,000$ lx. LDR dùng trong đèn đường tự động, đèn ngủ tự bật, máy ảnh tự chỉnh độ sáng, điện thoại tự chỉnh độ sáng màn hình.',
        },
      ],
    },
    {
      heading: 'Điện trở nhiệt',
      blocks: [
        {
          type: 'p',
          text: 'Điện trở nhiệt (thermistor) là điện trở làm bằng vật liệu bán dẫn có điện trở thay đổi mạnh theo nhiệt độ. Có hai loại:',
        },
        {
          type: 'list',
          items: [
            'NTC (hệ số nhiệt điện trở âm): nhiệt độ tăng thì điện trở giảm. NTC thường hoạt động tốt trong khoảng từ $-55\\ ^\\circ\\mathrm{C}$ đến $200\\ ^\\circ\\mathrm{C}$ và được dùng để đo, điều khiển nhiệt độ (nhiệt kế điện tử, điều hoà, tủ lạnh, nồi cơm điện).',
            'PTC (hệ số nhiệt điện trở dương): nhiệt độ tăng thì điện trở tăng. PTC thường được mắc nối tiếp với thiết bị điện để bảo vệ: khi dòng điện quá lớn làm PTC nóng lên, điện trở của nó tăng mạnh và dòng điện giảm xuống.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Vì sao LDR và điện trở nhiệt làm được cảm biến?',
          text: 'Điện trở của chúng thay đổi rõ rệt và có quy luật theo ánh sáng hoặc nhiệt độ. Đo điện trở (hay điện áp, dòng điện trong mạch chứa chúng) là biết được ánh sáng hoặc nhiệt độ. Cả hai đều là cảm biến biến đổi gián tiếp; chúng khác nhau ở đại lượng mà chúng nhạy cảm.',
        },
      ],
    },
    {
      heading: 'Đưa cảm biến vào mạch chia áp',
      blocks: [
        {
          type: 'p',
          text: 'Sự thay đổi điện trở chưa dùng trực tiếp được để điều khiển thiết bị; ta cần biến nó thành sự thay đổi điện áp. Cách đơn giản nhất là mạch chia áp: hai điện trở $R_1$, $R_2$ mắc nối tiếp vào nguồn điện áp $U$, điện áp ra lấy trên $R_2$.',
        },
        { type: 'tex', tex: 'U_{ra} = \\dfrac{U R_2}{R_1 + R_2}' },
        {
          type: 'list',
          items: [
            'Cảm biến ở vị trí $R_2$ (dưới): khi điện trở cảm biến giảm (sáng hơn, nóng hơn với NTC), $U_{ra}$ giảm.',
            'Cảm biến ở vị trí $R_1$ (trên): khi điện trở cảm biến giảm, $U_{ra}$ tăng.',
            'Điện trở cố định nên chọn cùng cỡ với điện trở cảm biến trong vùng cần đo, để $U_{ra}$ thay đổi nhiều nhất ở vùng đó.',
          ],
        },
      ],
    },
    {
      heading: 'Dự án: Tìm hiểu cảm biến và làm máy đo ánh sáng đơn giản',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: tìm hiểu một số loại cảm biến trong đời sống và khảo sát điện trở của LDR theo độ sáng. Dụng cụ: một LDR, một điện trở nhiệt NTC, một điện trở $10$ k$\\Omega$, pin $9$ V (hoặc nguồn một chiều), đồng hồ đo điện đa năng, bảng mạch thử, đèn bàn, điện thoại có ứng dụng đo độ rọi (lux).',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Tìm hiểu và lập bảng ít nhất năm thiết bị trong gia đình, trường học có dùng cảm biến: tên cảm biến, đại lượng nó cảm nhận, biến đổi trực tiếp hay gián tiếp.',
            'Dùng đồng hồ đa năng (thang đo ôm) đo điện trở của LDR khi che kín, trong phòng, gần đèn bàn và ngoài trời; ghi độ rọi đo bằng điện thoại ở mỗi chỗ.',
            'Nhúng NTC vào cốc nước ở vài nhiệt độ khác nhau (đo bằng nhiệt kế), ghi điện trở.',
            'Lắp mạch chia áp gồm điện trở $10$ k$\\Omega$ và LDR, đo $U_{ra}$ trên LDR ở các mức sáng trên; so sánh với giá trị tính bằng công thức chia áp.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Nộp bảng thiết bị có cảm biến, bảng số liệu và đồ thị điện trở LDR theo độ rọi, điện trở NTC theo nhiệt độ, bảng $U_{ra}$ đo được và tính được. Nhận xét: LDR và NTC giống và khác nhau thế nào; muốn $U_{ra}$ tăng khi trời tối thì đặt LDR ở vị trí nào của mạch chia áp?',
        },
      ],
    },
  ],
  explore: {
    title: 'Cảm biến trong mạch chia áp',
    instruction:
      'Chọn điện trở quang hoặc điện trở nhiệt NTC, đặt nó ở vị trí $R_1$ hoặc $R_2$. Kéo thanh độ rọi (hoặc nhiệt độ) và quan sát điện trở cảm biến, số chỉ vôn kế và đồ thị $U_{ra}$. Thử tìm cách mắc để $U_{ra}$ tăng khi trời tối, và cách mắc để $U_{ra}$ tăng khi nóng lên.',
  },
  examples: [
    {
      problem:
        'Mạch chia áp gồm điện trở cố định $R_1 = 10$ k$\\Omega$ và LDR ở vị trí $R_2$, mắc vào nguồn $U = 12$ V. Trong tối điện trở LDR là $50$ k$\\Omega$, ngoài sáng là $1$ k$\\Omega$. Tính $U_{ra}$ trên LDR trong hai trường hợp.',
      steps: [
        'Trong tối: $U_{ra} = \\dfrac{12 \\cdot 50}{10 + 50} = 10$ V.',
        'Ngoài sáng: $U_{ra} = \\dfrac{12 \\cdot 1}{10 + 1} \\approx 1{,}09$ V.',
        'Trời càng tối, điện trở LDR càng lớn, nên LDR "giữ" phần lớn điện áp nguồn.',
      ],
      answer: 'Trong tối $U_{ra} = 10$ V; ngoài sáng $U_{ra} \\approx 1{,}09$ V.',
    },
    {
      problem:
        'Một NTC được đặt ở vị trí $R_1$, nối tiếp với điện trở cố định $R_2 = 3$ k$\\Omega$, nguồn $U = 9$ V. Ở $20\\ ^\\circ\\mathrm{C}$ NTC có điện trở $6$ k$\\Omega$, ở $60\\ ^\\circ\\mathrm{C}$ là $1{,}5$ k$\\Omega$. Tính điện áp ra trên $R_2$ ở hai nhiệt độ và nhận xét.',
      steps: [
        'Ở $20\\ ^\\circ\\mathrm{C}$: $U_{ra} = \\dfrac{9 \\cdot 3}{6 + 3} = 3$ V.',
        'Ở $60\\ ^\\circ\\mathrm{C}$: $U_{ra} = \\dfrac{9 \\cdot 3}{1{,}5 + 3} = 6$ V.',
        'Nóng lên thì điện trở NTC giảm, phần điện áp trên $R_2$ tăng.',
      ],
      answer:
        '$3$ V ở $20\\ ^\\circ\\mathrm{C}$ và $6$ V ở $60\\ ^\\circ\\mathrm{C}$: điện áp ra tăng theo nhiệt độ.',
    },
    {
      problem:
        'Nguồn $U = 12$ V, LDR ở vị trí $R_2$. Lúc chạng vạng LDR có điện trở $20$ k$\\Omega$. Chọn điện trở cố định $R_1$ để lúc đó $U_{ra} = 4$ V.',
      steps: [
        '$\\dfrac{12 \\cdot 20}{R_1 + 20} = 4$ (điện trở tính theo k$\\Omega$).',
        '$R_1 + 20 = \\dfrac{240}{4} = 60$, nên $R_1 = 40$ k$\\Omega$.',
      ],
      answer: '$R_1 = 40$ k$\\Omega$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hệ thống phát thanh gồm micro, máy tăng âm và loa. Thiết bị nào là cảm biến?',
      options: ['Micro', 'Máy tăng âm', 'Loa', 'Cả ba thiết bị'],
      answer: 0,
      hints: ['Cảm biến biến một đại lượng vật lí từ môi trường thành tín hiệu điện.'],
      solution:
        'Micro biến dao động âm thành tín hiệu điện nên là cảm biến. Máy tăng âm là bộ khuếch đại, loa là thiết bị đầu ra (biến tín hiệu điện thành âm thanh).',
    },
    {
      type: 'choice',
      prompt: 'Khi cường độ ánh sáng chiếu vào điện trở quang (LDR) tăng thì điện trở của nó',
      options: ['giảm', 'tăng', 'không đổi', 'tăng rồi giảm'],
      answer: 0,
      hints: ['Ánh sáng giải phóng thêm hạt mang điện tự do trong bán dẫn.'],
      solution:
        'Ánh sáng mạnh hơn giải phóng nhiều hạt mang điện hơn, LDR dẫn điện tốt hơn, nên điện trở giảm.',
    },
    {
      type: 'number',
      prompt:
        'Mạch chia áp gồm $R_1 = 2$ k$\\Omega$ và $R_2 = 4$ k$\\Omega$ mắc vào nguồn $6$ V. Điện áp ra trên $R_2$ là bao nhiêu vôn?',
      answer: 4,
      unit: 'V',
      hints: ['$U_{ra} = \\dfrac{U R_2}{R_1 + R_2}$.'],
      solution: '$U_{ra} = \\dfrac{6 \\cdot 4}{2 + 4} = 4$ V.',
    },
    {
      type: 'number',
      prompt:
        'LDR ở vị trí $R_2$, điện trở cố định $R_1 = 10$ k$\\Omega$, nguồn $12$ V. Dưới ánh đèn bàn LDR có điện trở $2$ k$\\Omega$. Tính $U_{ra}$ trên LDR (V).',
      answer: 2,
      unit: 'V',
      hints: ['Thay $R_2 = 2$ k$\\Omega$ vào công thức chia áp.'],
      solution: '$U_{ra} = \\dfrac{12 \\cdot 2}{10 + 2} = 2$ V.',
    },
    {
      type: 'choice',
      prompt:
        'Để bảo vệ một thiết bị điện khỏi dòng điện quá lớn, người ta mắc nối tiếp với nó một điện trở nhiệt. Nên chọn loại nào?',
      options: ['PTC', 'NTC', 'LDR', 'Điện trở cố định bất kì'],
      answer: 0,
      hints: [
        'Dòng điện quá lớn làm điện trở nhiệt nóng lên. Ta cần điện trở của nó thay đổi thế nào để dòng điện giảm?',
      ],
      solution:
        'Khi dòng điện quá lớn, điện trở nhiệt nóng lên. PTC có điện trở tăng theo nhiệt độ, làm dòng điện giảm, nên bảo vệ được thiết bị. NTC thì ngược lại, điện trở giảm làm dòng điện càng lớn.',
    },
    {
      type: 'number',
      prompt:
        'Mạch chia áp gồm $R_1 = 10$ k$\\Omega$ cố định và LDR ở vị trí $R_2$, nguồn $9$ V. Vôn kế đo được $6$ V trên LDR. Điện trở của LDR lúc đó là bao nhiêu k$\\Omega$?',
      answer: 20,
      unit: 'kΩ',
      hints: [
        'Viết $\\dfrac{9 R}{10 + R} = 6$ với $R$ tính theo k$\\Omega$.',
        'Hoặc: điện áp trên $R_1$ là $3$ V, dòng điện như nhau nên tỉ số điện trở bằng tỉ số điện áp.',
      ],
      solution:
        '$9R = 6(10 + R)$ nên $3R = 60$, $R = 20$ k$\\Omega$. Kiểm tra: $\\dfrac{9 \\cdot 20}{30} = 6$ V.',
    },
    {
      type: 'multi',
      prompt: 'Những linh kiện nào là cảm biến biến đổi gián tiếp (dựa vào sự thay đổi điện trở)?',
      options: [
        'Điện trở quang (LDR)',
        'Điện trở nhiệt NTC',
        'Điện trở nhiệt PTC',
        'Cặp nhiệt điện',
        'Pin quang điện',
      ],
      answers: [0, 1, 2],
      hints: ['Linh kiện nào tự tạo ra suất điện động khi bị nung nóng hoặc chiếu sáng?'],
      solution:
        'LDR, NTC và PTC thay đổi điện trở theo ánh sáng hoặc nhiệt độ, cần mạch điện để đổi thành điện áp: đó là cảm biến gián tiếp. Cặp nhiệt điện và pin quang điện tự sinh ra suất điện động, là cảm biến biến đổi trực tiếp.',
    },
    {
      type: 'choice',
      prompt:
        'NTC ở vị trí $R_1$ (trên), điện trở cố định ở vị trí $R_2$, điện áp ra lấy trên $R_2$. Khi nhiệt độ tăng thì điện áp ra',
      options: ['tăng', 'giảm', 'không đổi', 'bằng điện áp nguồn'],
      answer: 0,
      hints: [
        'Nhiệt độ tăng thì điện trở NTC thay đổi thế nào? $R_1$ nhỏ đi thì $\\dfrac{R_2}{R_1 + R_2}$ ra sao?',
      ],
      solution:
        'Nhiệt độ tăng, điện trở NTC ($R_1$) giảm, tỉ số $\\dfrac{R_2}{R_1 + R_2}$ tăng nên $U_{ra}$ tăng (nhưng luôn nhỏ hơn điện áp nguồn).',
    },
  ],
  takeaways: [
    'Cảm biến cảm nhận sự thay đổi của đại lượng vật lí và biến nó thành tín hiệu điện; nó là thiết bị đầu vào của hệ thống điều khiển.',
    'Cảm biến biến đổi trực tiếp tạo ra ngay tín hiệu điện; cảm biến biến đổi gián tiếp thay đổi điện trở, cần mạch điện để đổi thành điện áp hoặc dòng điện.',
    'LDR: ánh sáng càng mạnh, điện trở càng nhỏ. NTC: nóng lên thì điện trở giảm; PTC: nóng lên thì điện trở tăng.',
    'Mạch chia áp $U_{ra} = \\dfrac{U R_2}{R_1 + R_2}$ biến sự thay đổi điện trở của cảm biến thành sự thay đổi điện áp; vị trí của cảm biến quyết định $U_{ra}$ tăng hay giảm.',
  ],
};
