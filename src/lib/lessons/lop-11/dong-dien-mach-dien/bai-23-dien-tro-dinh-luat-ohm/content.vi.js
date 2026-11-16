/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Điện trở R = U/I đặc trưng cho mức độ cản trở dòng điện của vật dẫn, đơn vị ôm (Ω); dây kim loại có R = ρl/S. Định luật Ohm: cường độ dòng điện qua đoạn dây tỉ lệ thuận với hiệu điện thế và tỉ lệ nghịch với điện trở, I = U/R; đặc tuyến vôn – ampe của vật dẫn tuân theo định luật Ohm là đường thẳng qua gốc toạ độ. Điện trở sinh ra do electron va chạm với các ion ở nút mạng; nhiệt độ tăng thì điện trở kim loại tăng, nên đặc tuyến của đèn sợi đốt là đường cong. Điện trở nhiệt NTC giảm, PTC tăng điện trở khi nóng lên.',
  intro:
    'Cùng cắm vào ổ điện $220$ V, nhưng bóng đèn bàn chỉ cho dòng điện nhỏ đi qua, còn ấm siêu tốc lại có dòng điện lớn gấp nhiều lần. Đại lượng nào của mỗi thiết bị quyết định dòng điện chạy qua nó, và đại lượng đó có luôn cố định không?',
  objectives: [
    'Định nghĩa được điện trở $R = \\dfrac{U}{I}$, đơn vị ôm; nêu được điện trở dây kim loại phụ thuộc $\\rho$, $l$, $S$.',
    'Phát biểu và vận dụng được định luật Ohm $I = \\dfrac{U}{R}$.',
    'Vẽ và đọc được đặc tuyến vôn – ampe (I – U) của điện trở, đèn sợi đốt.',
    'Giải thích được nguyên nhân gây ra điện trở và ảnh hưởng của nhiệt độ lên điện trở; nêu được đặc điểm của điện trở nhiệt.',
  ],
  sections: [
    {
      heading: 'Điện trở',
      blocks: [
        {
          type: 'p',
          text: 'Đặt cùng một hiệu điện thế $U$ vào hai đầu những vật dẫn khác nhau thì cường độ dòng điện $I$ qua chúng khác nhau: có vật dẫn cản trở dòng điện nhiều, có vật dẫn cản trở ít.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Điện trở',
          text: 'Điện trở của vật dẫn là đại lượng đặc trưng cho mức độ cản trở dòng điện của vật dẫn đó, được xác định bằng thương số giữa hiệu điện thế đặt vào hai đầu vật dẫn và cường độ dòng điện chạy qua nó: $$R = \\dfrac{U}{I}.$$ Đơn vị của điện trở là ôm (Ω): $1$ Ω $= 1$ V/A. Các bội thường dùng: $1$ kΩ $= 10^3$ Ω, $1$ MΩ $= 10^6$ Ω.',
        },
        {
          type: 'p',
          text: 'Điện trở của một dây dẫn kim loại đồng chất, tiết diện đều tỉ lệ thuận với chiều dài $l$, tỉ lệ nghịch với tiết diện $S$ và phụ thuộc vào vật liệu làm dây (điện trở suất $\\rho$, đơn vị Ω·m): $$R = \\rho\\dfrac{l}{S}.$$',
        },
        {
          type: 'table',
          caption: 'Điện trở suất của một số vật liệu ở $20$ °C',
          head: ['Vật liệu', '$\\rho$ (Ω·m)'],
          rows: [
            ['Bạc', '$1{,}6 \\cdot 10^{-8}$'],
            ['Đồng', '$1{,}7 \\cdot 10^{-8}$'],
            ['Nhôm', '$2{,}8 \\cdot 10^{-8}$'],
            ['Vonfram', '$5{,}5 \\cdot 10^{-8}$'],
            ['Nikelin', '$0{,}40 \\cdot 10^{-6}$'],
            ['Nicrom', '$1{,}10 \\cdot 10^{-6}$'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đặc tuyến vôn – ampe',
          text: 'Đồ thị biểu diễn cường độ dòng điện $I$ chạy qua vật dẫn theo hiệu điện thế $U$ đặt vào hai đầu vật dẫn gọi là đường đặc trưng vôn – ampe (đặc tuyến I – U) của vật dẫn đó.',
        },
      ],
    },
    {
      heading: 'Định luật Ohm',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định luật Ohm đối với đoạn mạch chỉ có điện trở',
          text: 'Cường độ dòng điện chạy qua một đoạn dây dẫn tỉ lệ thuận với hiệu điện thế đặt vào hai đầu đoạn dây và tỉ lệ nghịch với điện trở của nó: $$I = \\dfrac{U}{R}.$$',
        },
        {
          type: 'p',
          text: 'Với một vật dẫn kim loại ở nhiệt độ không đổi, $R$ không đổi, nên $I$ tỉ lệ thuận với $U$: đặc tuyến I – U là một đoạn thẳng đi qua gốc toạ độ. Đặc tuyến càng dốc thì điện trở càng nhỏ. Từ định luật Ohm còn suy ra $U = IR$: tích $IR$ gọi là độ giảm thế trên điện trở.',
        },
        { type: 'widget', name: 'ohm-check' },
      ],
    },
    {
      heading: 'Nguyên nhân gây ra điện trở. Ảnh hưởng của nhiệt độ',
      blocks: [
        {
          type: 'p',
          text: 'Trong kim loại, các ion dương nằm ở nút mạng tinh thể và luôn dao động nhiệt quanh vị trí cân bằng. Khi trôi dưới tác dụng của điện trường, các electron tự do liên tục va chạm với các ion này và bị cản trở. Đó là nguyên nhân gây ra điện trở của kim loại.',
        },
        {
          type: 'p',
          text: 'Khi nhiệt độ tăng, các ion dao động mạnh hơn, electron va chạm nhiều hơn nên điện trở của kim loại tăng. Trong khoảng nhiệt độ không quá lớn, điện trở suất tăng gần đúng theo hàm bậc nhất: $\\rho = \\rho_0[1 + \\alpha(t - t_0)]$, với $\\alpha$ là hệ số nhiệt điện trở (K$^{-1}$).',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đèn sợi đốt',
          text: 'Dây tóc vonfram của đèn nóng lên rất mạnh khi có dòng điện. Hiệu điện thế càng lớn, dây tóc càng nóng nên điện trở càng lớn: đặc tuyến I – U của đèn không phải đường thẳng mà cong dần về phía trục $U$. Đèn sợi đốt không có điện trở cố định.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Điện trở nhiệt (thermistor)',
          text: 'Điện trở nhiệt là linh kiện có điện trở thay đổi rõ rệt theo nhiệt độ. Loại NTC có điện trở giảm khi nhiệt độ tăng; loại PTC có điện trở tăng khi nhiệt độ tăng. Chúng được dùng làm cảm biến nhiệt độ trong nồi cơm điện, tủ lạnh, máy điều hoà, hoặc để bảo vệ mạch khỏi quá nhiệt.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mở rộng: điốt bán dẫn',
          text: 'Điốt chỉ cho dòng điện đi qua theo một chiều, và chỉ khi hiệu điện thế theo chiều đó vượt quá khoảng $0{,}6$ V (với điốt silic). Thương số $\\dfrac{U}{I}$ của điốt thay đổi mạnh theo $U$, nên điốt không tuân theo định luật Ohm.',
        },
      ],
    },
  ],
  explore: {
    title: 'Vẽ đặc tuyến I – U',
    instruction:
      'Chọn linh kiện, chỉnh hiệu điện thế $U$ (cả âm lẫn dương: đổi chiều mắc linh kiện) và bấm “Ghi điểm đo” ở nhiều giá trị. Các điểm của điện trở, đèn sợi đốt và điốt xếp thành hình gì? Bấm “So sánh ba đặc tuyến” để kiểm tra.',
  },
  examples: [
    {
      problem:
        'Đặt hiệu điện thế $12$ V vào hai đầu một điện trở thì dòng điện qua nó là $0{,}3$ A. a) Tính điện trở. b) Nếu hiệu điện thế giảm còn $9$ V thì dòng điện là bao nhiêu?',
      steps: [
        'a) $R = \\dfrac{U}{I} = \\dfrac{12}{0{,}3} = 40$ Ω.',
        "b) Điện trở không đổi, theo định luật Ohm: $I' = \\dfrac{U'}{R} = \\dfrac{9}{40} = 0{,}225$ A.",
        'Kiểm tra: $U$ giảm $\\dfrac{9}{12} = 0{,}75$ lần thì $I$ cũng giảm $0{,}75$ lần: $0{,}3 \\cdot 0{,}75 = 0{,}225$ A.',
      ],
      answer: "a) $R = 40$ Ω; b) $I' = 0{,}225$ A.",
    },
    {
      problem:
        'Một cuộn dây nikelin dài $10$ m, tiết diện $0{,}5$ mm², điện trở suất $0{,}4 \\cdot 10^{-6}$ Ω·m. Tính điện trở cuộn dây và cường độ dòng điện qua nó khi đặt vào hiệu điện thế $12$ V.',
      steps: [
        'Đổi $S = 0{,}5$ mm² $= 0{,}5 \\cdot 10^{-6}$ m².',
        '$R = \\rho\\dfrac{l}{S} = 0{,}4 \\cdot 10^{-6} \\cdot \\dfrac{10}{0{,}5 \\cdot 10^{-6}} = 8$ Ω.',
        '$I = \\dfrac{U}{R} = \\dfrac{12}{8} = 1{,}5$ A.',
      ],
      answer: '$R = 8$ Ω; $I = 1{,}5$ A.',
    },
    {
      problem:
        'Đo một đèn sợi đốt: khi $U = 3$ V thì $I = 0{,}4$ A; khi $U = 6$ V thì $I = 0{,}5$ A. Tính điện trở của đèn ở hai trường hợp và nhận xét.',
      steps: [
        'Khi $U = 3$ V: $R_1 = \\dfrac{3}{0{,}4} = 7{,}5$ Ω.',
        'Khi $U = 6$ V: $R_2 = \\dfrac{6}{0{,}5} = 12$ Ω.',
        'Hiệu điện thế tăng gấp đôi nhưng dòng điện tăng chưa tới gấp đôi: điện trở dây tóc tăng vì dây tóc nóng hơn. Đặc tuyến của đèn là đường cong.',
      ],
      answer: '$R_1 = 7{,}5$ Ω, $R_2 = 12$ Ω; điện trở của đèn tăng khi dây tóc nóng lên.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Điện trở của một vật dẫn là đại lượng',
      options: [
        'đặc trưng cho mức độ cản trở dòng điện của vật dẫn',
        'đặc trưng cho khả năng tích điện của vật dẫn',
        'đo bằng tích của hiệu điện thế và cường độ dòng điện',
        'đặc trưng cho tốc độ trôi của electron trong vật dẫn',
      ],
      answer: 0,
      hints: ['Điện trở càng lớn thì với cùng $U$, dòng điện càng lớn hay càng nhỏ?'],
      solution:
        'Điện trở đặc trưng cho mức độ cản trở dòng điện, $R = \\dfrac{U}{I}$ (thương số, không phải tích).',
    },
    {
      type: 'number',
      prompt:
        'Một bóng đèn khi sáng bình thường có hiệu điện thế $220$ V và dòng điện $0{,}5$ A. Tính điện trở của đèn khi đó (theo Ω).',
      answer: 440,
      unit: 'Ω',
      tolerance: 0.1,
      hints: ['Dùng $R = \\dfrac{U}{I}$.'],
      solution: '$R = \\dfrac{220}{0{,}5} = 440$ Ω.',
    },
    {
      type: 'number',
      prompt:
        'Đặt hiệu điện thế $4{,}5$ V vào hai đầu một điện trở $20$ Ω. Tính cường độ dòng điện qua điện trở (theo A).',
      answer: 0.225,
      unit: 'A',
      tolerance: 0.0005,
      hints: ['Định luật Ohm: $I = \\dfrac{U}{R}$.'],
      solution: '$I = \\dfrac{4{,}5}{20} = 0{,}225$ A.',
    },
    {
      type: 'choice',
      prompt: 'Đặc tuyến vôn – ampe của một điện trở có giá trị không đổi là',
      options: [
        'một đoạn thẳng đi qua gốc toạ độ',
        'một đường cong bị uốn về phía trục $U$',
        'một đường thẳng song song với trục $U$',
        'một đường thẳng không đi qua gốc toạ độ',
      ],
      answer: 0,
      hints: [
        '$R$ không đổi thì $I = \\dfrac{U}{R}$ là hàm gì của $U$, và $U = 0$ thì $I$ bằng bao nhiêu?',
      ],
      solution:
        '$I = \\dfrac{1}{R}U$ tỉ lệ thuận với $U$, nên đồ thị là đoạn thẳng qua gốc toạ độ. Đường cong là đặc tuyến của đèn sợi đốt.',
    },
    {
      type: 'number',
      prompt:
        'Đặc tuyến I – U của một điện trở là đường thẳng qua gốc toạ độ và qua điểm ($U = 4$ V; $I = 0{,}2$ A). Khi đặt hiệu điện thế $10$ V vào điện trở này thì dòng điện là bao nhiêu (theo A)?',
      answer: 0.5,
      unit: 'A',
      tolerance: 0.001,
      hints: ['Tính điện trở từ điểm đã cho.', 'Rồi dùng $I = \\dfrac{U}{R}$ với $U = 10$ V.'],
      solution: '$R = \\dfrac{4}{0{,}2} = 20$ Ω; $I = \\dfrac{10}{20} = 0{,}5$ A.',
    },
    {
      type: 'choice',
      prompt: 'Đặc tuyến I – U của đèn sợi đốt là đường cong vì',
      options: [
        'nhiệt độ dây tóc tăng khi hiệu điện thế tăng, làm điện trở dây tóc tăng',
        'dây tóc đèn có điện trở giảm khi nóng lên',
        'dòng điện qua đèn không phụ thuộc vào hiệu điện thế',
        'vonfram không có điện trở',
      ],
      answer: 0,
      hints: ['Điện trở của kim loại thay đổi thế nào khi nhiệt độ tăng?'],
      solution:
        'Khi $U$ tăng, dòng điện làm dây tóc nóng hơn; kim loại nóng lên thì ion dao động mạnh hơn, điện trở tăng. Do đó $I$ tăng chậm dần theo $U$ và đặc tuyến cong.',
    },
    {
      type: 'number',
      prompt:
        'Một dây đồng dài $100$ m, tiết diện $1$ mm², điện trở suất $1{,}7 \\cdot 10^{-8}$ Ω·m. Tính điện trở của dây (theo Ω).',
      answer: 1.7,
      unit: 'Ω',
      tolerance: 0.001,
      hints: ['Đổi $S = 10^{-6}$ m² rồi dùng $R = \\rho\\dfrac{l}{S}$.'],
      solution: '$R = 1{,}7 \\cdot 10^{-8} \\cdot \\dfrac{100}{10^{-6}} = 1{,}7$ Ω.',
    },
    {
      type: 'choice',
      prompt:
        'Hai dây dẫn cùng vật liệu; dây thứ hai dài gấp đôi và có tiết diện gấp đôi dây thứ nhất. So với dây thứ nhất, điện trở của dây thứ hai',
      options: ['bằng', 'gấp đôi', 'bằng một nửa', 'gấp bốn'],
      answer: 0,
      hints: [
        '$R = \\rho\\dfrac{l}{S}$: $l$ gấp đôi làm $R$ thế nào, $S$ gấp đôi làm $R$ thế nào?',
      ],
      solution:
        '$R_2 = \\rho\\dfrac{2l}{2S} = \\rho\\dfrac{l}{S} = R_1$: hai ảnh hưởng triệt tiêu nhau.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các phát biểu đúng.',
      options: [
        'Điện trở của kim loại tăng khi nhiệt độ tăng',
        'Điện trở nhiệt loại NTC có điện trở giảm khi nhiệt độ tăng',
        'Điện trở nhiệt loại PTC có điện trở tăng khi nhiệt độ tăng',
        'Đèn sợi đốt có điện trở như nhau ở mọi hiệu điện thế',
        'Điện trở của kim loại sinh ra do các electron tự do va chạm với nhau',
      ],
      answers: [0, 1, 2],
      hints: [
        'Nhớ lại nguyên nhân gây ra điện trở: electron va chạm với hạt nào?',
        'NTC: hệ số nhiệt âm; PTC: hệ số nhiệt dương.',
      ],
      solution:
        'Electron va chạm với các ion dao động ở nút mạng; nhiệt độ tăng thì ion dao động mạnh hơn nên điện trở kim loại tăng (vì vậy điện trở đèn sợi đốt tăng khi sáng hơn). NTC giảm, PTC tăng điện trở khi nóng lên.',
    },
  ],
  takeaways: [
    'Điện trở $R = \\dfrac{U}{I}$ đặc trưng cho mức độ cản trở dòng điện, đơn vị ôm (Ω); dây kim loại: $R = \\rho\\dfrac{l}{S}$.',
    'Định luật Ohm: $I = \\dfrac{U}{R}$; vật dẫn tuân theo định luật Ohm có đặc tuyến I – U là đoạn thẳng qua gốc toạ độ.',
    'Điện trở kim loại do electron va chạm với ion ở nút mạng; nhiệt độ tăng thì điện trở kim loại tăng, nên đặc tuyến của đèn sợi đốt cong.',
    'Điện trở nhiệt: NTC giảm, PTC tăng điện trở khi nhiệt độ tăng; dùng làm cảm biến nhiệt độ.',
  ],
};
