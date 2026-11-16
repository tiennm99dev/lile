/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Điện năng tiêu thụ của đoạn mạch A = UIt bằng công của lực điện làm dịch chuyển các điện tích; công suất điện P = A/t = UI, đơn vị oát (W); công tơ điện đếm điện năng theo kWh, 1 kWh = 3,6·10⁶ J. Định luật Joule – Lenz: nhiệt lượng toả ra ở vật dẫn Q = RI²t, công suất toả nhiệt P = RI² = U²/R. Công của nguồn điện bằng điện năng tiêu thụ trong toàn mạch: A = ℰIt, công suất nguồn P = ℰI.',
  intro:
    'Cuối tháng, hoá đơn tiền điện ghi “số điện” mà gia đình đã dùng. Một “số” ấy là gì, và vì sao chiếc ấm siêu tốc chỉ đun vài phút lại có thể “ăn” nhiều điện như chiếc tivi bật cả buổi tối?',
  objectives: [
    'Nêu được điện năng tiêu thụ của đoạn mạch $A = UIt$ và công suất điện $P = UI$; đổi được giữa J và kWh.',
    'Phát biểu và vận dụng được định luật Joule – Lenz $Q = RI^2t$, công suất toả nhiệt $P = RI^2 = \\dfrac{U^2}{R}$.',
    'Tính được công và công suất của nguồn điện $A = \\mathscr{E}It$, $P = \\mathscr{E}I$.',
    'Vận dụng được các công thức để tính điện năng sử dụng của các thiết bị trong gia đình.',
  ],
  sections: [
    {
      heading: 'Năng lượng điện tiêu thụ và công suất điện',
      blocks: [
        {
          type: 'p',
          text: 'Khi đặt hiệu điện thế $U$ vào hai đầu một đoạn mạch, lực điện làm các điện tích dịch chuyển có hướng. Trong thời gian $t$, điện lượng $q = It$ dịch chuyển qua đoạn mạch và lực điện thực hiện công $A = qU = UIt$. Đó là năng lượng điện (điện năng) mà đoạn mạch tiêu thụ, được chuyển hoá thành các dạng năng lượng khác: nhiệt, quang, cơ, hoá năng…',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Điện năng tiêu thụ',
          text: 'Điện năng tiêu thụ của một đoạn mạch bằng tích của hiệu điện thế giữa hai đầu đoạn mạch với cường độ dòng điện và thời gian dòng điện chạy qua đoạn mạch: $$A = UIt.$$',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Công suất điện',
          text: 'Công suất điện của một đoạn mạch là điện năng mà đoạn mạch tiêu thụ trong một đơn vị thời gian: $$P = \\dfrac{A}{t} = UI.$$ Đơn vị của công suất là oát (W): $1$ W $= 1$ J/s.',
        },
        {
          type: 'p',
          text: 'Số oát ghi trên mỗi thiết bị điện (ví dụ $220$ V – $1\\,000$ W) là công suất định mức: công suất của thiết bị khi được dùng đúng hiệu điện thế định mức.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Công tơ điện và kilôoát giờ',
          text: 'Điện năng sử dụng được đo bằng công tơ điện. Mỗi số đếm của công tơ là $1$ kilôoát giờ (kWh): điện năng do một thiết bị công suất $1$ kW tiêu thụ trong $1$ giờ. $$1 \\text{ kWh} = 1\\,000 \\text{ W} \\cdot 3\\,600 \\text{ s} = 3{,}6 \\cdot 10^6 \\text{ J}.$$',
        },
      ],
    },
    {
      heading: 'Định luật Joule – Lenz',
      blocks: [
        {
          type: 'p',
          text: 'Nếu đoạn mạch chỉ có điện trở thuần (dây đốt nóng của bàn là, ấm điện, máy sưởi…), toàn bộ điện năng tiêu thụ được chuyển hoá thành nhiệt năng. Thay $U = IR$ vào $A = UIt$ ta được nhiệt lượng toả ra.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định luật Joule – Lenz',
          text: 'Nhiệt lượng toả ra ở một vật dẫn tỉ lệ thuận với điện trở của vật dẫn, với bình phương cường độ dòng điện và với thời gian dòng điện chạy qua vật dẫn đó: $$Q = RI^2t.$$',
        },
        {
          type: 'p',
          text: 'Công suất toả nhiệt của vật dẫn: $P = \\dfrac{Q}{t} = RI^2 = \\dfrac{U^2}{R}$. Với các điện trở mắc nối tiếp (cùng $I$), điện trở lớn hơn toả nhiệt nhiều hơn; với các điện trở mắc song song (cùng $U$), điện trở nhỏ hơn toả nhiệt nhiều hơn.',
        },
        { type: 'widget', name: 'joule' },
      ],
    },
    {
      heading: 'Công và công suất của nguồn điện',
      blocks: [
        {
          type: 'p',
          text: 'Trong mạch kín, nguồn điện thực hiện công để duy trì dòng điện. Công của nguồn điện bằng điện năng tiêu thụ trong toàn mạch, bằng công của lực lạ bên trong nguồn: với $q = It$ thì $A_{ng} = \\mathscr{E}q$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công và công suất của nguồn điện',
          text: '$$A_{ng} = \\mathscr{E}It, \\qquad P_{ng} = \\dfrac{A_{ng}}{t} = \\mathscr{E}I.$$',
        },
        {
          type: 'p',
          text: 'Vì $\\mathscr{E} = U + Ir$ nên $\\mathscr{E}I = UI + rI^2$: công suất của nguồn bằng công suất tiêu thụ ở mạch ngoài cộng với công suất toả nhiệt bên trong nguồn. Tỉ số $H = \\dfrac{UI}{\\mathscr{E}I} = \\dfrac{U}{\\mathscr{E}}$ gọi là hiệu suất của nguồn điện.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Sử dụng điện an toàn, tiết kiệm',
          text: 'Chọn thiết bị có công suất phù hợp và hiệu suất cao (đèn LED thay đèn sợi đốt), tắt thiết bị khi không dùng, không dùng nhiều thiết bị công suất lớn cùng lúc trên một ổ cắm để tránh dây dẫn bị quá nóng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng điều khiển và công tơ điện',
    instruction:
      'Bật, tắt các thiết bị (mỗi thiết bị dùng đúng $220$ V) rồi cho công tơ chạy, mỗi giây ứng với một giờ. Quan sát tổng công suất, dòng điện lấy từ lưới và số chỉ công tơ. Bật thiết bị nào thì công tơ chạy nhanh nhất?',
  },
  examples: [
    {
      problem:
        'Một ấm điện ghi $220$ V – $1\\,000$ W được dùng đúng hiệu điện thế định mức để đun nước trong $15$ phút. Tính cường độ dòng điện qua ấm và điện năng ấm tiêu thụ theo J và kWh.',
      steps: [
        'Dùng đúng $220$ V nên ấm có công suất $P = 1\\,000$ W.',
        '$I = \\dfrac{P}{U} = \\dfrac{1\\,000}{220} \\approx 4{,}55$ A.',
        '$t = 15$ phút $= 900$ s: $A = Pt = 1\\,000 \\cdot 900 = 9 \\cdot 10^5$ J.',
        'Đổi ra kWh: $A = 1$ kW $\\cdot 0{,}25$ h $= 0{,}25$ kWh (hoặc $\\dfrac{9 \\cdot 10^5}{3{,}6 \\cdot 10^6} = 0{,}25$ kWh).',
      ],
      answer: '$I \\approx 4{,}55$ A; $A = 9 \\cdot 10^5$ J $= 0{,}25$ kWh.',
    },
    {
      problem:
        'Dòng điện $2$ A chạy qua một điện trở $20$ Ω trong $10$ phút. Tính nhiệt lượng toả ra và công suất toả nhiệt của điện trở.',
      steps: [
        '$t = 10$ phút $= 600$ s.',
        'Định luật Joule – Lenz: $Q = RI^2t = 20 \\cdot 2^2 \\cdot 600 = 48\\,000$ J.',
        'Công suất toả nhiệt: $P = RI^2 = 20 \\cdot 4 = 80$ W (kiểm tra: $80 \\cdot 600 = 48\\,000$ J).',
      ],
      answer: '$Q = 48\\,000$ J $= 48$ kJ; $P = 80$ W.',
    },
    {
      problem:
        'Nguồn điện $\\mathscr{E} = 12$ V, $r = 1$ Ω mắc với điện trở $R = 5$ Ω. Tính công suất của nguồn, công suất tiêu thụ ở mạch ngoài, công suất hao phí trong nguồn và hiệu suất của nguồn.',
      steps: [
        '$I = \\dfrac{\\mathscr{E}}{R + r} = \\dfrac{12}{6} = 2$ A.',
        'Công suất nguồn: $P_{ng} = \\mathscr{E}I = 12 \\cdot 2 = 24$ W.',
        'Mạch ngoài: $P = RI^2 = 5 \\cdot 4 = 20$ W; trong nguồn: $rI^2 = 1 \\cdot 4 = 4$ W. Kiểm tra: $20 + 4 = 24$ W.',
        'Hiệu suất: $H = \\dfrac{U}{\\mathscr{E}} = \\dfrac{IR}{\\mathscr{E}} = \\dfrac{10}{12} \\approx 83{,}3\\%$.',
      ],
      answer: '$P_{ng} = 24$ W; $P = 20$ W; $rI^2 = 4$ W; $H \\approx 83{,}3\\%$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Một bóng đèn $220$ V – $100$ W được thắp sáng bình thường trong $5$ giờ. Tính điện năng đèn tiêu thụ (theo kWh).',
      answer: 0.5,
      unit: 'kWh',
      tolerance: 0.001,
      hints: ['Đổi $P = 100$ W $= 0{,}1$ kW rồi dùng $A = Pt$ với $t$ tính bằng giờ.'],
      solution: '$A = Pt = 0{,}1 \\cdot 5 = 0{,}5$ kWh.',
    },
    {
      type: 'number',
      prompt:
        'Một thiết bị dùng ở hiệu điện thế $220$ V có dòng điện $2$ A chạy qua. Tính công suất điện của thiết bị (theo W).',
      answer: 440,
      unit: 'W',
      tolerance: 0.1,
      hints: ['$P = UI$.'],
      solution: '$P = UI = 220 \\cdot 2 = 440$ W.',
    },
    {
      type: 'number',
      prompt:
        'Dòng điện $1{,}5$ A chạy qua một điện trở $10$ Ω trong $2$ phút. Tính nhiệt lượng toả ra (theo J).',
      answer: 2700,
      unit: 'J',
      tolerance: 0.5,
      hints: ['Đổi thời gian ra giây.', 'Định luật Joule – Lenz: $Q = RI^2t$.'],
      solution: '$Q = 10 \\cdot 1{,}5^2 \\cdot 120 = 10 \\cdot 2{,}25 \\cdot 120 = 2\\,700$ J.',
    },
    {
      type: 'choice',
      prompt: 'Một số đếm của công tơ điện ($1$ kWh) bằng',
      options: ['$3{,}6 \\cdot 10^6$ J', '$3{,}6 \\cdot 10^3$ J', '$1\\,000$ J', '$3\\,600$ J'],
      answer: 0,
      hints: ['$1$ kW $= 1\\,000$ W và $1$ h $= 3\\,600$ s.'],
      solution: '$1$ kWh $= 1\\,000 \\cdot 3\\,600 = 3{,}6 \\cdot 10^6$ J.',
    },
    {
      type: 'number',
      prompt:
        'Dây đốt nóng của một bàn là có điện trở $48{,}4$ Ω, dùng ở hiệu điện thế $220$ V. Tính công suất của bàn là (theo W).',
      answer: 1000,
      unit: 'W',
      tolerance: 0.5,
      hints: ['Biết $U$ và $R$: dùng $P = \\dfrac{U^2}{R}$.'],
      solution: '$P = \\dfrac{220^2}{48{,}4} = \\dfrac{48\\,400}{48{,}4} = 1\\,000$ W.',
    },
    {
      type: 'number',
      prompt:
        'Một nguồn điện có suất điện động $6$ V cho dòng điện $0{,}5$ A chạy trong mạch. Tính công suất của nguồn (theo W).',
      answer: 3,
      unit: 'W',
      tolerance: 0.001,
      hints: ['Công suất của nguồn: $P_{ng} = \\mathscr{E}I$.'],
      solution: '$P_{ng} = \\mathscr{E}I = 6 \\cdot 0{,}5 = 3$ W.',
    },
    {
      type: 'number',
      prompt:
        'Một tivi công suất $100$ W được bật trung bình $5$ giờ mỗi ngày. Trong $30$ ngày, tivi tiêu thụ bao nhiêu kWh?',
      answer: 15,
      unit: 'kWh',
      tolerance: 0.01,
      hints: ['Tính tổng số giờ bật trong $30$ ngày.', 'Rồi $A = Pt$ với $P = 0{,}1$ kW.'],
      solution: '$t = 5 \\cdot 30 = 150$ h; $A = 0{,}1 \\cdot 150 = 15$ kWh.',
    },
    {
      type: 'choice',
      prompt:
        'Hai điện trở $R_1 = 10$ Ω và $R_2 = 20$ Ω mắc nối tiếp vào một nguồn điện. Điện trở nào toả nhiệt nhiều hơn trong cùng thời gian?',
      options: [
        '$R_2$, vì cùng cường độ dòng điện mà $P = RI^2$ tỉ lệ với $R$',
        '$R_1$, vì điện trở nhỏ hơn cho dòng điện đi qua dễ hơn',
        'Hai điện trở toả nhiệt như nhau vì cùng dòng điện',
        '$R_1$, vì $P = \\dfrac{U^2}{R}$ và hai điện trở cùng hiệu điện thế',
      ],
      answer: 0,
      hints: ['Mắc nối tiếp thì đại lượng nào như nhau cho hai điện trở?'],
      solution:
        'Nối tiếp: cùng $I$, nên $P = RI^2$ tỉ lệ với $R$; $R_2$ toả nhiệt gấp đôi $R_1$. (Hai điện trở không cùng hiệu điện thế: $U_2 = 2U_1$.)',
    },
    {
      type: 'choice',
      prompt:
        'Cũng hai điện trở $R_1 = 10$ Ω và $R_2 = 20$ Ω nhưng mắc song song vào nguồn. Điện trở nào toả nhiệt nhiều hơn?',
      options: [
        '$R_1$, vì cùng hiệu điện thế mà $P = \\dfrac{U^2}{R}$ tỉ lệ nghịch với $R$',
        '$R_2$, vì $P = RI^2$ tỉ lệ với $R$',
        'Hai điện trở toả nhiệt như nhau',
        'Không so sánh được vì chưa biết hiệu điện thế',
      ],
      answer: 0,
      hints: ['Mắc song song thì đại lượng nào như nhau?'],
      solution:
        'Song song: cùng $U$, nên $P = \\dfrac{U^2}{R}$; $R_1$ nhỏ hơn nên toả nhiệt gấp đôi $R_2$. Không cần biết $U$ để so sánh.',
    },
    {
      type: 'number',
      prompt:
        'Nguồn điện có $\\mathscr{E} = 12$ V; khi mắc với mạch ngoài, hiệu điện thế giữa hai cực của nguồn là $10$ V. Tính hiệu suất của nguồn (theo %).',
      answer: 83.3,
      unit: '%',
      tolerance: 0.1,
      hints: ['$H = \\dfrac{U}{\\mathscr{E}}$.'],
      solution: '$H = \\dfrac{10}{12} \\approx 0{,}833 = 83{,}3\\%$.',
    },
    {
      type: 'multi',
      prompt: 'Theo định luật Joule – Lenz, nhiệt lượng toả ra ở một vật dẫn',
      options: [
        'tỉ lệ thuận với điện trở của vật dẫn',
        'tỉ lệ thuận với bình phương cường độ dòng điện',
        'tỉ lệ thuận với thời gian dòng điện chạy qua',
        'tỉ lệ thuận với cường độ dòng điện',
        'không phụ thuộc vào thời gian',
      ],
      answers: [0, 1, 2],
      hints: ['Viết $Q = RI^2t$ và xem mỗi đại lượng có số mũ bao nhiêu.'],
      solution:
        '$Q = RI^2t$: tỉ lệ với $R$, với $I^2$ (không phải với $I$) và với $t$. Tăng $I$ gấp đôi thì $Q$ tăng gấp bốn.',
    },
  ],
  takeaways: [
    'Điện năng tiêu thụ $A = UIt$; công suất điện $P = UI$, đơn vị W; $1$ kWh $= 3{,}6 \\cdot 10^6$ J là một số đếm của công tơ.',
    'Định luật Joule – Lenz: $Q = RI^2t$; công suất toả nhiệt $P = RI^2 = \\dfrac{U^2}{R}$.',
    'Công và công suất của nguồn: $A_{ng} = \\mathscr{E}It$, $P_{ng} = \\mathscr{E}I = UI + rI^2$; hiệu suất $H = \\dfrac{U}{\\mathscr{E}}$.',
    'Tiết kiệm điện: dùng thiết bị hiệu suất cao, tắt khi không dùng, tránh dùng nhiều thiết bị công suất lớn trên cùng một ổ cắm.',
  ],
};
