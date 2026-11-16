/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Cường độ trường hấp dẫn g là lực hấp dẫn tác dụng lên một đơn vị khối lượng đặt tại điểm đó; ngoài một quả cầu đồng chất g = GM/r², giảm theo bình phương khoảng cách đến tâm; gần mặt đất g gần như không đổi nên trọng lực tỉ lệ với khối lượng.',
  intro:
    'Một quả tạ $10$ kg và một quả bóng $0{,}5$ kg ở cùng một chỗ chịu lực hấp dẫn rất khác nhau, nhưng thả ra thì rơi nhanh như nhau. Vậy cái gì ở điểm đó là như nhau đối với mọi vật? Và lên càng cao, cái đó thay đổi thế nào?',
  objectives: [
    'Nêu được định nghĩa cường độ trường hấp dẫn $\\vec g = \\dfrac{\\vec F}{m}$ và đơn vị N/kg.',
    'Rút ra được $g = \\dfrac{GM}{r^2}$ từ định luật vạn vật hấp dẫn cho một quả cầu đồng chất.',
    'Vận dụng được $g = \\dfrac{GM}{(R + h)^2}$ để tính cường độ trường hấp dẫn ở độ cao $h$.',
    'Giải thích được vì sao gần mặt đất $g$ gần như không đổi và trọng lực tỉ lệ với khối lượng.',
  ],
  sections: [
    {
      heading: 'Khái niệm cường độ trường hấp dẫn',
      blocks: [
        {
          type: 'p',
          text: 'Đặt lần lượt các vật thử có khối lượng $m$ khác nhau tại cùng một điểm trong trường hấp dẫn. Lực hấp dẫn $F$ lên chúng khác nhau, nhưng tỉ số $\\dfrac{F}{m}$ thì như nhau. Tỉ số này chỉ phụ thuộc trường hấp dẫn tại điểm đó.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Cường độ trường hấp dẫn',
          text: 'Cường độ trường hấp dẫn tại một điểm là đại lượng đặc trưng cho trường hấp dẫn về phương diện tác dụng lực lên vật có khối lượng đặt tại điểm đó. Nó được đo bằng lực hấp dẫn tác dụng lên một đơn vị khối lượng đặt tại điểm đó.',
        },
        { type: 'tex', tex: '\\vec g = \\dfrac{\\vec F}{m}' },
        {
          type: 'list',
          items: [
            '$\\vec g$ là một vectơ, cùng hướng với lực hấp dẫn tác dụng lên vật thử, tức là cùng hướng với đường sức.',
            'Đơn vị của $g$ là N/kg. Vì $1\\ \\text{N/kg} = 1\\ \\text{m/s}^2$, cường độ trường hấp dẫn bằng gia tốc mà trường truyền cho vật khi chỉ có lực hấp dẫn tác dụng, tức gia tốc rơi tự do.',
          ],
        },
      ],
    },
    {
      heading: 'Cường độ trường hấp dẫn của một quả cầu đồng chất',
      blocks: [
        {
          type: 'p',
          text: 'Xét một chất điểm (hay quả cầu đồng chất) khối lượng $M$. Vật thử khối lượng $m$ đặt cách tâm một khoảng $r$ chịu lực hấp dẫn $F = G\\dfrac{Mm}{r^2}$. Chia cho $m$:',
        },
        { type: 'tex', tex: 'g = \\dfrac{F}{m} = \\dfrac{GM}{r^2}' },
        {
          type: 'list',
          items: [
            '$g$ chỉ phụ thuộc khối lượng $M$ của vật gây ra trường và khoảng cách $r$ đến tâm, không phụ thuộc khối lượng $m$ của vật thử.',
            '$\\vec g$ hướng về tâm của $M$.',
            '$g$ tỉ lệ nghịch với $r^2$: khoảng cách đến tâm tăng $2$ lần thì $g$ giảm $4$ lần, tăng $3$ lần thì $g$ giảm $9$ lần.',
            'Biểu thức đúng tại các điểm ở ngoài hoặc trên bề mặt quả cầu ($r \\ge R$).',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lực bằng nhau, trường khác nhau',
          text: 'Trái Đất hút Mặt Trăng và Mặt Trăng hút Trái Đất hai lực bằng nhau. Nhưng cường độ trường hấp dẫn của Trái Đất tại tâm Mặt Trăng và của Mặt Trăng tại tâm Trái Đất thì khác nhau, vì mỗi trường chỉ phụ thuộc khối lượng của vật gây ra nó.',
        },
      ],
    },
    {
      heading: 'Cường độ trường hấp dẫn của Trái Đất',
      blocks: [
        {
          type: 'p',
          text: 'Coi Trái Đất là quả cầu đồng chất khối lượng $M$, bán kính $R$. Tại mặt đất và tại độ cao $h$:',
        },
        {
          type: 'tex',
          tex: 'g_0 = \\dfrac{GM}{R^2}, \\qquad g = \\dfrac{GM}{(R + h)^2} = g_0 \\dfrac{R^2}{(R + h)^2}',
        },
        {
          type: 'p',
          text: 'Với $M = 6{,}0 \\cdot 10^{24}$ kg, $R = 6\\,400$ km, $G = 6{,}68 \\cdot 10^{-11}\\ \\text{N} \\cdot \\text{m}^2/\\text{kg}^2$ thì $g_0 \\approx 9{,}79$ N/kg. Kéo vệ tinh trong phần Khám phá để thấy $g$ giảm thế nào khi ra xa.',
        },
        {
          type: 'table',
          head: ['Thiên thể', 'Khối lượng (kg)', 'Bán kính (km)', '$g_0$ (N/kg)'],
          rows: [
            ['Trái Đất', '$6{,}0 \\cdot 10^{24}$', '$6\\,400$', '$9{,}79$'],
            ['Hoả tinh', '$6{,}4 \\cdot 10^{23}$', '$3\\,396$', '$3{,}71$'],
            ['Mặt Trăng', '$7{,}2 \\cdot 10^{22}$', '$1\\,738$', '$1{,}59$'],
          ],
          caption:
            'Cường độ trường hấp dẫn ở bề mặt một số thiên thể, tính với $G = 6{,}68 \\cdot 10^{-11}\\ \\text{N} \\cdot \\text{m}^2/\\text{kg}^2$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Trường hấp dẫn gần mặt đất',
          text: 'Trong phạm vi không lớn gần mặt đất, $h \\ll R$ nên $(R + h)^2 \\approx R^2$ và $g \\approx g_0$: cường độ trường hấp dẫn gần như không đổi về độ lớn và hướng. Trường hấp dẫn ở đó là trường đều, và lực hấp dẫn lên vật $P = mg$ tỉ lệ với khối lượng của vật.',
        },
        {
          type: 'p',
          text: 'Vì thế ở cùng một nơi, mọi vật rơi tự do với cùng gia tốc $g$, và ta có thể so sánh khối lượng các vật bằng cách so sánh trọng lượng của chúng (cân).',
        },
      ],
    },
    {
      heading: 'Dự án: Bản đồ trường hấp dẫn của Hệ Mặt Trời',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: so sánh cường độ trường hấp dẫn ở bề mặt các hành tinh và ước lượng một nhà du hành sẽ "nặng" bao nhiêu ở mỗi nơi. Dụng cụ: bảng số liệu khối lượng, bán kính các hành tinh (tra từ nguồn tin cậy), máy tính cầm tay hoặc bảng tính, giấy khổ lớn.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Lập bảng khối lượng $M$ và bán kính $R$ của Mặt Trăng và tám hành tinh.',
            'Tính $g_0 = \\dfrac{GM}{R^2}$ cho từng thiên thể, so sánh với giá trị công bố.',
            'Tính trọng lượng $P = mg_0$ của một nhà du hành $70$ kg ở mỗi nơi và độ cao nhảy được nếu ở Trái Đất bạn ấy nhảy cao $0{,}5$ m (độ cao nhảy tỉ lệ nghịch với $g_0$).',
            'Với Trái Đất, vẽ đồ thị $g$ theo $r$ từ $R$ đến $8R$; đánh dấu độ cao của Trạm vũ trụ quốc tế (khoảng $400$ km) và của vệ tinh địa tĩnh (khoảng $36\\,000$ km).',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Trình bày bảng kết quả và đồ thị trên một tấm áp phích. Trả lời: nhà du hành trên Trạm vũ trụ quốc tế có còn chịu lực hấp dẫn không, và lớn cỡ bao nhiêu phần trăm so với ở mặt đất?',
        },
      ],
    },
  ],
  explore: {
    title: 'Đưa vệ tinh ra xa',
    instruction:
      'Kéo vệ tinh (hoặc chọn rồi dùng phím mũi tên) ra xa thiên thể. Quan sát mũi tên $\\vec g$ ngắn lại và điểm đỏ chạy trên đồ thị. Đặt vệ tinh ở $2R$, $3R$, $4R$ để thấy $g$ giảm $4$, $9$, $16$ lần; đổi sang Mặt Trăng hay Hoả tinh để so sánh.',
  },
  examples: [
    {
      problem:
        'Lấy $M = 6{,}0 \\cdot 10^{24}$ kg, $R = 6\\,400$ km. Tính cường độ trường hấp dẫn ở mặt đất và ở độ cao $h = 6\\,400$ km.',
      steps: [
        'Ở mặt đất: $g_0 = \\dfrac{GM}{R^2} = \\dfrac{6{,}68 \\cdot 10^{-11} \\cdot 6{,}0 \\cdot 10^{24}}{(6{,}4 \\cdot 10^6)^2} = \\dfrac{4{,}008 \\cdot 10^{14}}{4{,}096 \\cdot 10^{13}} \\approx 9{,}79$ N/kg.',
        'Ở độ cao $h = R$: khoảng cách đến tâm $r = R + h = 2R$.',
        '$g = \\dfrac{GM}{(2R)^2} = \\dfrac{g_0}{4} \\approx \\dfrac{9{,}785}{4} \\approx 2{,}45$ N/kg.',
      ],
      answer: '$g_0 \\approx 9{,}79$ N/kg; ở độ cao $6\\,400$ km, $g \\approx 2{,}45$ N/kg.',
    },
    {
      problem:
        'Tính tỉ số giữa cường độ trường hấp dẫn do Trái Đất gây ra tại tâm Mặt Trăng và cường độ trường hấp dẫn do Mặt Trăng gây ra tại tâm Trái Đất. Biết $M_{\\text{TĐ}} = 6{,}0 \\cdot 10^{24}$ kg, $M_{\\text{MT}} = 7{,}2 \\cdot 10^{22}$ kg. Vì sao tỉ số khác $1$, dù lực Trái Đất hút Mặt Trăng bằng lực Mặt Trăng hút Trái Đất?',
      steps: [
        'Gọi $r$ là khoảng cách giữa hai tâm. $g_{\\text{TĐ}} = \\dfrac{GM_{\\text{TĐ}}}{r^2}$, $g_{\\text{MT}} = \\dfrac{GM_{\\text{MT}}}{r^2}$.',
        '$\\dfrac{g_{\\text{TĐ}}}{g_{\\text{MT}}} = \\dfrac{M_{\\text{TĐ}}}{M_{\\text{MT}}} = \\dfrac{6{,}0 \\cdot 10^{24}}{7{,}2 \\cdot 10^{22}} \\approx 83{,}3$.',
        'Lực hấp dẫn $F = G\\dfrac{M_{\\text{TĐ}} M_{\\text{MT}}}{r^2}$ phụ thuộc cả hai khối lượng nên bằng nhau theo hai chiều; còn cường độ trường chỉ phụ thuộc khối lượng của vật gây ra trường.',
      ],
      answer:
        'Tỉ số khoảng $83{,}3$. Hai lực bằng nhau nhưng hai trường khác nhau: $F = M_{\\text{MT}} \\cdot g_{\\text{TĐ}} = M_{\\text{TĐ}} \\cdot g_{\\text{MT}}$.',
    },
    {
      problem:
        'Ở độ cao nào so với mặt đất thì cường độ trường hấp dẫn của Trái Đất chỉ bằng $\\dfrac{1}{9}$ giá trị ở mặt đất? Lấy $R = 6\\,400$ km.',
      steps: [
        '$\\dfrac{g}{g_0} = \\dfrac{R^2}{(R + h)^2} = \\dfrac{1}{9}$.',
        'Suy ra $\\dfrac{R + h}{R} = 3$, tức $R + h = 3R$.',
        '$h = 2R = 12\\,800$ km.',
      ],
      answer: '$h = 2R = 12\\,800$ km.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Cường độ trường hấp dẫn tại một điểm được định nghĩa bằng',
      options: [
        'lực hấp dẫn tác dụng lên một đơn vị khối lượng đặt tại điểm đó',
        'lực hấp dẫn tác dụng lên vật bất kì đặt tại điểm đó',
        'khối lượng của vật gây ra trường hấp dẫn',
        'tích của lực hấp dẫn và khối lượng vật thử',
      ],
      answer: 0,
      hints: ['$\\vec g = \\dfrac{\\vec F}{m}$.'],
      solution:
        '$g = \\dfrac{F}{m}$: lực hấp dẫn tác dụng lên một đơn vị khối lượng ($1$ kg) đặt tại điểm đó.',
    },
    {
      type: 'text',
      prompt: 'Đơn vị của cường độ trường hấp dẫn trong hệ SI là gì? (Viết kí hiệu.)',
      accept: ['N/kg', 'N.kg-1', 'niutơn trên kilôgam', 'm/s2', 'm/s²', 'm/s^2'],
      hints: ['Lấy đơn vị của lực chia cho đơn vị của khối lượng.'],
      solution: '$g = \\dfrac{F}{m}$ nên đơn vị là N/kg, cũng bằng $\\text{m/s}^2$.',
    },
    {
      type: 'choice',
      prompt:
        'Cường độ trường hấp dẫn của Trái Đất tại một điểm ngoài Trái Đất không phụ thuộc vào đại lượng nào?',
      options: [
        'Khối lượng của vật thử đặt tại điểm đó',
        'Khối lượng của Trái Đất',
        'Khoảng cách từ điểm đó đến tâm Trái Đất',
        'Hằng số hấp dẫn $G$',
      ],
      answer: 0,
      hints: ['Nhìn vào biểu thức $g = \\dfrac{GM}{r^2}$: có những đại lượng nào?'],
      solution:
        '$g = \\dfrac{GM}{r^2}$ chỉ chứa $G$, $M$ và $r$. Khối lượng $m$ của vật thử đã bị triệt tiêu khi chia $F$ cho $m$.',
    },
    {
      type: 'number',
      prompt:
        'Ở mặt đất $g_0 = 9{,}79$ N/kg. Tại điểm cách tâm Trái Đất một khoảng bằng $3R$, cường độ trường hấp dẫn bằng bao nhiêu? (Làm tròn đến hai chữ số thập phân.)',
      answer: 1.09,
      tolerance: 0.01,
      unit: 'N/kg',
      hints: ['Khoảng cách đến tâm gấp $3$ lần thì $g$ giảm mấy lần?'],
      solution: '$g = \\dfrac{g_0}{3^2} = \\dfrac{9{,}79}{9} \\approx 1{,}09$ N/kg.',
    },
    {
      type: 'number',
      prompt:
        'Trạm vũ trụ quốc tế bay ở độ cao khoảng $400$ km. Lấy $M = 6{,}0 \\cdot 10^{24}$ kg, $R = 6\\,400$ km, $G = 6{,}68 \\cdot 10^{-11}\\ \\text{N} \\cdot \\text{m}^2/\\text{kg}^2$. Tính cường độ trường hấp dẫn ở đó (làm tròn đến hai chữ số thập phân).',
      answer: 8.67,
      tolerance: 0.01,
      unit: 'N/kg',
      hints: ['$r = R + h = 6\\,800$ km. Nhớ đổi ra mét.'],
      solution:
        '$g = \\dfrac{4{,}008 \\cdot 10^{14}}{(6{,}8 \\cdot 10^6)^2} = \\dfrac{4{,}008 \\cdot 10^{14}}{4{,}624 \\cdot 10^{13}} \\approx 8{,}67$ N/kg, vẫn bằng khoảng $89\\%$ giá trị ở mặt đất.',
    },
    {
      type: 'number',
      prompt:
        'Với $M = 7{,}2 \\cdot 10^{22}$ kg, $R = 1\\,738$ km, tính cường độ trường hấp dẫn ở bề mặt Mặt Trăng (làm tròn đến hai chữ số thập phân).',
      answer: 1.59,
      tolerance: 0.01,
      unit: 'N/kg',
      hints: ['Dùng $g_0 = \\dfrac{GM}{R^2}$ với $R = 1{,}738 \\cdot 10^6$ m.'],
      solution:
        '$g_0 = \\dfrac{6{,}68 \\cdot 10^{-11} \\cdot 7{,}2 \\cdot 10^{22}}{(1{,}738 \\cdot 10^6)^2} = \\dfrac{4{,}810 \\cdot 10^{12}}{3{,}021 \\cdot 10^{12}} \\approx 1{,}59$ N/kg.',
    },
    {
      type: 'number',
      prompt:
        'Ở bề mặt Hoả tinh $g_0 \\approx 3{,}71$ N/kg. Một nhà du hành có khối lượng $60$ kg chịu lực hấp dẫn bao nhiêu niutơn khi đứng trên Hoả tinh? (Làm tròn đến hàng đơn vị.)',
      answer: 223,
      tolerance: 1,
      unit: 'N',
      hints: ['$F = mg_0$. Khối lượng không đổi khi lên Hoả tinh.'],
      solution:
        '$F = mg_0 = 60 \\cdot 3{,}71 \\approx 223$ N, chỉ bằng khoảng $38\\%$ trọng lượng ở Trái Đất.',
    },
    {
      type: 'number',
      prompt:
        'Cường độ trường hấp dẫn ở mặt đất ($9{,}79$ N/kg) lớn gấp bao nhiêu lần ở bề mặt Mặt Trăng ($1{,}59$ N/kg)? (Làm tròn đến một chữ số thập phân.)',
      answer: 6.2,
      tolerance: 0.1,
      hints: ['Lập tỉ số hai giá trị.'],
      solution:
        '$\\dfrac{9{,}79}{1{,}59} \\approx 6{,}2$. Vì vậy trên Mặt Trăng, nhà du hành chỉ nặng khoảng $\\dfrac{1}{6}$ so với ở Trái Đất.',
    },
    {
      type: 'multi',
      prompt:
        'Những phát biểu nào đúng về trường hấp dẫn của Trái Đất trong phạm vi nhỏ gần mặt đất?',
      options: [
        'Cường độ trường hấp dẫn gần như không đổi',
        'Đường sức gần như song song, cách đều, hướng thẳng đứng xuống',
        'Lực hấp dẫn lên vật tỉ lệ với khối lượng của vật',
        'Vật nặng hơn rơi tự do với gia tốc lớn hơn',
        'Cường độ trường hấp dẫn tăng khi lên cao',
      ],
      answers: [0, 1, 2],
      hints: ['Khi $h \\ll R$ thì $(R + h)^2 \\approx R^2$.'],
      solution:
        'Khi $h \\ll R$, $g \\approx g_0$ không đổi nên trường đều, đường sức song song cách đều, và $P = mg$ tỉ lệ với $m$. Mọi vật rơi tự do với cùng gia tốc $g$; còn $g$ giảm (không tăng) khi lên cao.',
    },
  ],
  takeaways: [
    'Cường độ trường hấp dẫn $\\vec g = \\dfrac{\\vec F}{m}$, đơn vị N/kg (bằng $\\text{m/s}^2$), cùng hướng với đường sức.',
    'Ngoài một quả cầu đồng chất khối lượng $M$: $g = \\dfrac{GM}{r^2}$, hướng về tâm, không phụ thuộc vật thử.',
    'Ở độ cao $h$ so với mặt đất: $g = \\dfrac{GM}{(R + h)^2}$; khoảng cách đến tâm tăng $n$ lần thì $g$ giảm $n^2$ lần.',
    'Gần mặt đất ($h \\ll R$), $g \\approx 9{,}8$ N/kg gần như không đổi: trường hấp dẫn đều, trọng lực tỉ lệ với khối lượng.',
  ],
};
