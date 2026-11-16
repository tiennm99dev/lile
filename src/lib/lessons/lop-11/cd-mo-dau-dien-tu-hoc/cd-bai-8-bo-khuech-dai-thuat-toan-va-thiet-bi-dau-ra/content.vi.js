/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bộ khuếch đại thuật toán (op-amp) có hai lối vào đảo và không đảo, hệ số khuếch đại rất lớn và lối ra bão hoà ở gần điện áp nguồn; không có hồi tiếp nó là mạch so sánh, có hồi tiếp âm nó là mạch khuếch đại đảo với G = −Rf/R1 hoặc không đảo với G = 1 + Rf/R1; tín hiệu ra điều khiển các thiết bị đầu ra như relay, LED, loa, đồng hồ đo.',
  intro:
    'Tín hiệu từ micro hay từ cảm biến thường rất yếu: điện áp chỉ cỡ milivôn, dòng điện rất nhỏ, không đủ để làm loa kêu hay bật một bóng đèn. Muốn dùng được chúng, ta phải khuếch đại. Linh kiện làm việc đó trong hầu hết các thiết bị điện tử là bộ khuếch đại thuật toán, một vi mạch nhỏ chỉ có vài chân.',
  objectives: [
    'Nêu được bộ khuếch đại là gì, bộ khuếch đại thuật toán (op-amp) là gì và các đặc điểm của op-amp lí tưởng.',
    'Giải thích được hoạt động của mạch so sánh dùng op-amp và hiện tượng bão hoà.',
    'Tính được hệ số khuếch đại và điện áp ra của mạch khuếch đại đảo, mạch khuếch đại không đảo.',
    'Mô tả được cách dùng relay, LED, loa và đồng hồ đo làm thiết bị đầu ra của mạch op-amp.',
  ],
  sections: [
    {
      heading: 'Bộ khuếch đại và bộ khuếch đại thuật toán',
      blocks: [
        {
          type: 'p',
          text: 'Bộ khuếch đại là thiết bị làm tăng biên độ (điện áp, dòng điện, công suất) của tín hiệu điện mà vẫn giữ nguyên dạng của tín hiệu. Năng lượng để tín hiệu ra mạnh hơn lấy từ nguồn điện nuôi bộ khuếch đại.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Bộ khuếch đại thuật toán (op-amp)',
          text: 'Bộ khuếch đại thuật toán là một vi mạch khuếch đại có hai lối vào: lối vào đảo (kí hiệu $-$, điện áp $U_-$) và lối vào không đảo (kí hiệu $+$, điện áp $U_+$), một lối ra và hai chân nối với nguồn điện đối xứng $\\pm U_n$. Nó khuếch đại hiệu điện áp giữa hai lối vào: $U_{ra} = A_0 (U_+ - U_-)$, với hệ số khuếch đại $A_0$ rất lớn (cỡ $10^5$ đến $10^6$).',
        },
        {
          type: 'p',
          text: 'Điện áp ra không thể vượt quá điện áp nguồn. Khi $A_0 (U_+ - U_-)$ lớn hơn giới hạn đó, lối ra dừng ở mức bão hoà $\\pm U_{bh}$, gần bằng $\\pm U_n$. Trong bài này ta coi $U_{bh} = U_n$.',
        },
        {
          type: 'table',
          caption: 'Đặc điểm của op-amp lí tưởng',
          head: ['Đặc điểm', 'Ý nghĩa'],
          rows: [
            [
              'Hệ số khuếch đại $A_0$ vô cùng lớn',
              'Chỉ cần $U_+$ chênh $U_-$ rất ít là lối ra bão hoà.',
            ],
            [
              'Điện trở vào vô cùng lớn',
              'Không có dòng điện đi vào hai lối vào, op-amp không lấy năng lượng của nguồn tín hiệu.',
            ],
            [
              'Điện trở ra bằng không',
              'Điện áp ra không bị giảm khi nối với tải (thiết bị đầu ra).',
            ],
            ['Dải tần rất rộng', 'Khuếch đại như nhau tín hiệu ở mọi tần số.'],
          ],
        },
        {
          type: 'p',
          text: 'Nhờ vậy op-amp khuếch đại được tín hiệu có biên độ và công suất rất nhỏ mà không làm suy giảm tín hiệu ở lối vào, hoạt động được ở nhiều tần số khác nhau và ít bị nhiễu.',
        },
      ],
    },
    {
      heading: 'Mạch so sánh',
      blocks: [
        {
          type: 'p',
          text: 'Khi không có điện trở nối lối ra về lối vào (không có hồi tiếp), op-amp là một mạch so sánh: đặt điện áp cần so sánh vào một lối vào, điện áp chuẩn $U_0$ vào lối vào kia.',
        },
        {
          type: 'tex',
          tex: 'U_+ > U_- \\Rightarrow U_{ra} = +U_{bh}; \\qquad U_+ < U_- \\Rightarrow U_{ra} = -U_{bh}',
        },
        {
          type: 'p',
          text: 'Vì $A_0$ rất lớn, chỉ cần hai lối vào chênh nhau cỡ milivôn là lối ra đã bão hoà. Lối ra của mạch so sánh vì thế chỉ có hai trạng thái, rất thích hợp để bật, tắt một thiết bị.',
        },
      ],
    },
    {
      heading: 'Mạch khuếch đại đảo và không đảo',
      blocks: [
        {
          type: 'p',
          text: 'Để khuếch đại tín hiệu mà không bị bão hoà ngay, người ta nối một điện trở $R_f$ từ lối ra về lối vào đảo (hồi tiếp âm). Hệ số khuếch đại $G = \\dfrac{U_{ra}}{U_{vào}}$ của mạch khi đó chỉ phụ thuộc hai điện trở $R_1$ và $R_f$.',
        },
        {
          type: 'table',
          head: ['Mạch', 'Cách mắc', 'Hệ số khuếch đại'],
          rows: [
            [
              'Khuếch đại đảo',
              'Tín hiệu vào qua $R_1$ tới lối vào đảo; $R_f$ nối lối ra với lối vào đảo; lối vào không đảo nối đất.',
              '$G = -\\dfrac{R_f}{R_1}$',
            ],
            [
              'Khuếch đại không đảo',
              'Tín hiệu vào lối vào không đảo; $R_1$ nối lối vào đảo với đất; $R_f$ nối lối ra với lối vào đảo.',
              '$G = 1 + \\dfrac{R_f}{R_1}$',
            ],
          ],
        },
        {
          type: 'list',
          items: [
            'Mạch đảo cho tín hiệu ra ngược dấu (ngược pha) với tín hiệu vào; mạch không đảo cho tín hiệu ra cùng dấu.',
            'Công thức $U_{ra} = G \\cdot U_{vào}$ chỉ đúng khi $|G \\cdot U_{vào}| < U_{bh}$; vượt quá thì lối ra bão hoà và tín hiệu bị méo (cắt đỉnh).',
          ],
        },
      ],
    },
    {
      heading: 'Thiết bị đầu ra',
      blocks: [
        {
          type: 'p',
          text: 'Tín hiệu ra của op-amp được dùng để điều khiển các thiết bị đầu ra:',
        },
        {
          type: 'list',
          items: [
            'Relay điện từ: một công tắc điều khiển bằng điện, gồm cuộn dây quấn trên lõi sắt và các tiếp điểm. Dòng điện nhỏ từ op-amp chạy qua cuộn dây biến nó thành nam châm điện, hút tiếp điểm đóng lại mạch tải có dòng lớn, điện áp cao (bóng đèn $220$ V, động cơ, máy bơm). Khác công tắc thường, relay đóng ngắt tự động và mạch điều khiển được cách li với mạch tải. Một diode mắc nối tiếp với cuộn dây để relay chỉ đóng khi $U_{ra}$ dương.',
            'Đèn LED (diode phát quang): chỉ sáng khi được phân cực thuận, tức lối ra op-amp phải dương so với đất (nếu LED nối từ lối ra xuống đất). Phải mắc nối tiếp một điện trở để hạn chế dòng điện qua LED: $R = \\dfrac{U_{ra} - U_{LED}}{I}$. Hai LED khác màu mắc song song ngược chiều cho biết lối ra đang dương hay âm.',
            'Loa: biến tín hiệu điện xoay chiều (đã được khuếch đại) thành âm thanh.',
            'Đồng hồ đo: một vôn kế nối vào lối ra có thể hiển thị trực tiếp đại lượng mà cảm biến đo (nhiệt độ, độ rọi...) nếu ta hiệu chuẩn lại thang chia và đơn vị của nó.',
          ],
        },
      ],
    },
    {
      heading: 'Dự án: Tìm hiểu op-amp và thiết bị đầu ra',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: lắp một mạch so sánh dùng op-amp điều khiển LED và relay, đo đặc tuyến của mạch khuếch đại đảo. Dụng cụ: vi mạch op-amp (ví dụ LM358 hoặc 741), nguồn đối xứng $\\pm 9$ V hoặc $\\pm 12$ V, biến trở $10$ k$\\Omega$, các điện trở $1$ k$\\Omega$, $10$ k$\\Omega$, $47$ k$\\Omega$, $100$ k$\\Omega$, hai LED khác màu, relay $12$ V, diode, đồng hồ đa năng, bảng mạch thử.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Tra sơ đồ chân của vi mạch op-amp: chân nguồn, lối vào đảo, lối vào không đảo, lối ra.',
            'Lắp mạch so sánh: biến trở tạo $U_+$ thay đổi, $U_-$ cố định bằng một mạch chia áp. Nối hai LED song song ngược chiều (mỗi LED có điện trở) từ lối ra xuống đất. Xoay biến trở, ghi lại $U_+$, $U_-$, $U_{ra}$ và LED nào sáng.',
            'Thay LED bằng relay có diode nối tiếp, quan sát relay đóng ngắt và đèn ở mạch tải (dùng đèn pin nhỏ, không dùng điện lưới).',
            'Lắp mạch khuếch đại đảo với $R_1 = 10$ k$\\Omega$, $R_f = 47$ k$\\Omega$. Đo $U_{ra}$ với nhiều giá trị $U_{vào}$, vẽ đồ thị $U_{ra}$ theo $U_{vào}$, xác định hệ số khuếch đại và điện áp bão hoà.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Nộp sơ đồ các mạch đã lắp, bảng số liệu và đồ thị đặc tuyến. So sánh hệ số khuếch đại đo được với $-\\dfrac{R_f}{R_1}$; điện áp bão hoà thực tế nhỏ hơn điện áp nguồn bao nhiêu? Giải thích vì sao cần điện trở nối tiếp với LED và diode nối tiếp với relay.',
        },
      ],
    },
  ],
  explore: {
    title: 'Mô phỏng op-amp',
    instruction:
      'Chọn mạch so sánh, khuếch đại đảo hoặc không đảo. Kéo điện áp vào, chỉnh $R_1$, $R_f$ (hoặc điện áp so sánh $U_0$) và quan sát sơ đồ, đặc tuyến $U_{ra}$ theo $U_{vào}$, LED và relay ở lối ra. Tìm điện áp vào nhỏ nhất làm mạch khuếch đại đảo $R_1 = 10$ k$\\Omega$, $R_f = 100$ k$\\Omega$ bị bão hoà.',
  },
  examples: [
    {
      problem:
        'Mạch khuếch đại đảo có $R_1 = 10$ k$\\Omega$, $R_f = 100$ k$\\Omega$, nguồn $\\pm 12$ V. Tính $U_{ra}$ khi $U_{vào} = 0{,}3$ V và khi $U_{vào} = 2$ V.',
      steps: [
        '$G = -\\dfrac{R_f}{R_1} = -\\dfrac{100}{10} = -10$.',
        '$U_{vào} = 0{,}3$ V: $U_{ra} = -10 \\cdot 0{,}3 = -3$ V, nhỏ hơn $12$ V về độ lớn nên đúng.',
        '$U_{vào} = 2$ V: theo công thức $U_{ra} = -20$ V, vượt quá nguồn; lối ra bão hoà ở $-12$ V.',
      ],
      answer: '$U_{ra} = -3$ V và $U_{ra} = -12$ V (bão hoà).',
    },
    {
      problem:
        'Cần một mạch khuếch đại không đảo có hệ số khuếch đại $11$, dùng $R_1 = 1$ k$\\Omega$. Chọn $R_f$ và tính $U_{ra}$ khi $U_{vào} = 0{,}5$ V.',
      steps: [
        '$1 + \\dfrac{R_f}{R_1} = 11$ nên $\\dfrac{R_f}{R_1} = 10$, $R_f = 10$ k$\\Omega$.',
        '$U_{ra} = 11 \\cdot 0{,}5 = 5{,}5$ V, cùng dấu với $U_{vào}$.',
      ],
      answer: '$R_f = 10$ k$\\Omega$; $U_{ra} = 5{,}5$ V.',
    },
    {
      problem:
        'Một op-amp có $A_0 = 10^5$, nguồn $\\pm 12$ V, dùng làm mạch so sánh. Điện áp lối vào không đảo lớn hơn lối vào đảo $1$ mV. Điện áp ra là bao nhiêu?',
      steps: [
        'Theo $U_{ra} = A_0 (U_+ - U_-) = 10^5 \\cdot 10^{-3} = 100$ V.',
        '$100$ V vượt xa điện áp nguồn, nên lối ra bão hoà dương.',
      ],
      answer: '$U_{ra} = +12$ V (bão hoà).',
    },
    {
      problem:
        'Lối ra op-amp ở mức $+12$ V nối với một LED màu đỏ qua điện trở $R$. LED sáng bình thường khi điện áp trên nó là $2$ V và dòng điện $20$ mA. Tính $R$.',
      steps: [
        'Điện áp trên điện trở: $12 - 2 = 10$ V.',
        '$R = \\dfrac{10}{0{,}020} = 500\\ \\Omega$.',
      ],
      answer: '$R = 500\\ \\Omega$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Đặc điểm nào là của op-amp lí tưởng?',
      options: [
        'Điện trở vào vô cùng lớn và điện trở ra bằng không',
        'Điện trở vào bằng không và điện trở ra vô cùng lớn',
        'Hệ số khuếch đại bằng $1$',
        'Điện áp ra có thể lớn hơn điện áp nguồn',
      ],
      answer: 0,
      hints: ['Op-amp lí tưởng không lấy dòng từ nguồn tín hiệu và không bị yếu đi khi nối tải.'],
      solution:
        'Op-amp lí tưởng có hệ số khuếch đại vô cùng lớn, điện trở vào vô cùng lớn (không có dòng vào), điện trở ra bằng không; điện áp ra luôn bị giới hạn bởi nguồn.',
    },
    {
      type: 'number',
      prompt:
        'Mạch khuếch đại đảo có $R_1 = 5$ k$\\Omega$, $R_f = 50$ k$\\Omega$, nguồn $\\pm 12$ V, $U_{vào} = 0{,}4$ V. Tính $U_{ra}$ (V).',
      answer: -4,
      unit: 'V',
      hints: ['$G = -\\dfrac{R_f}{R_1}$.', 'Kiểm tra xem $|U_{ra}|$ có vượt $12$ V không.'],
      solution: '$G = -\\dfrac{50}{5} = -10$, $U_{ra} = -10 \\cdot 0{,}4 = -4$ V (chưa bão hoà).',
    },
    {
      type: 'number',
      prompt:
        'Mạch khuếch đại không đảo có $R_1 = 2$ k$\\Omega$, $R_f = 10$ k$\\Omega$, nguồn $\\pm 12$ V, $U_{vào} = 1{,}5$ V. Tính $U_{ra}$ (V).',
      answer: 9,
      unit: 'V',
      hints: ['$G = 1 + \\dfrac{R_f}{R_1}$.'],
      solution: '$G = 1 + \\dfrac{10}{2} = 6$, $U_{ra} = 6 \\cdot 1{,}5 = 9$ V (chưa bão hoà).',
    },
    {
      type: 'number',
      prompt:
        'Mạch khuếch đại đảo có hệ số khuếch đại $-20$, nguồn $\\pm 12$ V (coi $U_{bh} = 12$ V). Điện áp vào $0{,}8$ V. Điện áp ra là bao nhiêu vôn?',
      answer: -12,
      unit: 'V',
      hints: ['Tính $G \\cdot U_{vào}$ rồi so sánh với $U_{bh}$.'],
      solution:
        '$G \\cdot U_{vào} = -20 \\cdot 0{,}8 = -16$ V, vượt quá $12$ V về độ lớn, nên lối ra bão hoà: $U_{ra} = -12$ V.',
    },
    {
      type: 'choice',
      prompt:
        'Mạch so sánh dùng op-amp, nguồn $\\pm 12$ V. Lối vào không đảo có $U_+ = 2{,}5$ V, lối vào đảo có $U_- = 3$ V. Điện áp ra xấp xỉ',
      options: ['$-12$ V', '$+12$ V', '$-0{,}5$ V', '$0$ V'],
      answer: 0,
      hints: ['So sánh $U_+$ với $U_-$; hệ số khuếch đại của op-amp rất lớn.'],
      solution:
        '$U_+ < U_-$ nên $A_0(U_+ - U_-)$ là một số âm rất lớn về độ lớn; lối ra bão hoà âm, $U_{ra} \\approx -12$ V.',
    },
    {
      type: 'number',
      prompt:
        'Lối ra op-amp $+12$ V nối với LED qua điện trở $R$. LED sáng bình thường khi điện áp trên nó $2$ V, dòng điện $10$ mA. Tính $R$ (Ω).',
      answer: 1000,
      unit: 'Ω',
      hints: ['Điện áp trên $R$ bằng $U_{ra} - U_{LED}$.'],
      solution: '$R = \\dfrac{12 - 2}{0{,}010} = 1\\,000\\ \\Omega$.',
    },
    {
      type: 'choice',
      prompt:
        'Trong relay điện từ điều khiển bởi op-amp, dòng điện từ lối ra op-amp chạy qua bộ phận nào?',
      options: [
        'Cuộn dây của nam châm điện',
        'Các tiếp điểm nối với mạch tải',
        'Bóng đèn của mạch tải',
        'Lõi sắt',
      ],
      answer: 0,
      hints: ['Dòng điều khiển nhỏ, dòng tải lớn; hai mạch được cách li với nhau.'],
      solution:
        'Dòng điều khiển nhỏ từ op-amp chạy qua cuộn dây, biến nó thành nam châm điện hút tiếp điểm. Các tiếp điểm thuộc mạch tải, mang dòng điện lớn của đèn hay động cơ.',
    },
    {
      type: 'number',
      prompt:
        'Cần mạch khuếch đại không đảo có hệ số khuếch đại $4$, đã có $R_1 = 3$ k$\\Omega$. Điện trở hồi tiếp $R_f$ bằng bao nhiêu k$\\Omega$?',
      answer: 9,
      unit: 'kΩ',
      hints: ['$1 + \\dfrac{R_f}{R_1} = 4$.'],
      solution: '$\\dfrac{R_f}{R_1} = 3$ nên $R_f = 3 \\cdot 3 = 9$ k$\\Omega$.',
    },
  ],
  takeaways: [
    'Op-amp có lối vào đảo ($-$), lối vào không đảo ($+$) và khuếch đại hiệu $U_+ - U_-$ với hệ số $A_0$ rất lớn; lối ra bão hoà ở $\\pm U_{bh} \\approx \\pm U_n$.',
    'Op-amp lí tưởng: $A_0$ vô cùng lớn, điện trở vào vô cùng lớn, điện trở ra bằng không, dải tần rất rộng.',
    'Mạch so sánh: $U_+ > U_-$ thì $U_{ra} = +U_{bh}$, $U_+ < U_-$ thì $U_{ra} = -U_{bh}$.',
    'Khuếch đại đảo $G = -\\dfrac{R_f}{R_1}$, không đảo $G = 1 + \\dfrac{R_f}{R_1}$; chỉ đúng khi lối ra chưa bão hoà.',
    'Relay cho dòng nhỏ đóng ngắt mạch tải lớn; LED cần điện trở hạn dòng và chỉ sáng khi phân cực thuận; loa và đồng hồ đo đã hiệu chuẩn cũng là thiết bị đầu ra.',
  ],
};
