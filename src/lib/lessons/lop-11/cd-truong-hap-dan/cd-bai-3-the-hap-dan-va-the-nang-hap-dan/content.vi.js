/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thế năng hấp dẫn Wt = −GMm/r (bằng 0 ở xa vô cùng) và thế hấp dẫn Φ = −GM/r đặc trưng cho trường hấp dẫn về năng lượng; từ đó tính được tốc độ vũ trụ cấp I 7,9 km/s, cấp II 11,2 km/s và quỹ đạo vệ tinh địa tĩnh.',
  intro:
    'Việt Nam đã có những vệ tinh viễn thông bay ở độ cao khoảng $36\\,000$ km, lúc nào cũng "treo" trên cùng một chỗ của bầu trời. Phải phóng vệ tinh với tốc độ bao nhiêu để nó không rơi trở lại? Và cần bao nhiêu năng lượng để một con tàu rời hẳn Trái Đất?',
  objectives: [
    'Nêu được công của trọng lực không phụ thuộc hình dạng đường đi.',
    'Viết được biểu thức thế năng hấp dẫn $W_t = -\\dfrac{GMm}{r}$ với gốc thế năng ở xa vô cùng.',
    'Nêu được định nghĩa thế hấp dẫn $\\Phi = -\\dfrac{GM}{r}$ và đơn vị J/kg.',
    'Vận dụng được để tính tốc độ vũ trụ cấp I, cấp II và độ cao quỹ đạo vệ tinh địa tĩnh.',
  ],
  sections: [
    {
      heading: 'Công của trọng lực',
      blocks: [
        {
          type: 'p',
          text: 'Trong trường trọng lực đều gần mặt đất, một vật khối lượng $m$ đi từ độ cao $h_1$ xuống độ cao $h_2$ theo bất kì đường nào: thẳng, cong hay gấp khúc. Chia đường đi thành nhiều đoạn nhỏ; trên mỗi đoạn trọng lực chỉ sinh công theo độ dời thẳng đứng. Cộng lại:',
        },
        { type: 'tex', tex: 'A = mg(h_1 - h_2)' },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Trọng lực là lực thế',
          text: 'Công của trọng lực không phụ thuộc hình dạng đường đi, chỉ phụ thuộc vị trí điểm đầu và điểm cuối. Vì vậy ta định nghĩa được thế năng: công của trọng lực bằng độ giảm thế năng, $A = W_{t1} - W_{t2}$.',
        },
      ],
    },
    {
      heading: 'Thế năng hấp dẫn',
      blocks: [
        {
          type: 'p',
          text: 'Trường trọng lực đều chỉ là trường hợp riêng, đúng gần mặt đất. Xét chung trường hấp dẫn của một quả cầu đồng chất khối lượng $M$. Lực hấp dẫn $F = \\dfrac{GMm}{r^2}$ thay đổi theo $r$, nhưng công của nó vẫn không phụ thuộc đường đi. Khi vật đi từ khoảng cách $r_1$ đến $r_2$ so với tâm:',
        },
        {
          type: 'tex',
          tex: 'A_{12} = GMm\\left(\\dfrac{1}{r_2} - \\dfrac{1}{r_1}\\right)',
        },
        {
          type: 'p',
          text: 'Chọn gốc thế năng ở xa vô cùng, nơi lực hấp dẫn bằng không. Thế năng hấp dẫn của vật ở khoảng cách $r$ bằng công của lực hấp dẫn khi vật đi từ đó ra xa vô cùng:',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Thế năng hấp dẫn',
          text: '$W_t = -\\dfrac{GMm}{r}$. Thế năng hấp dẫn luôn âm, và tăng dần (tiến tới $0$) khi vật ra xa.',
        },
        {
          type: 'p',
          text: 'Gần mặt đất, đưa vật từ $r = R$ lên $r = R + h$ với $h \\ll R$, độ tăng thế năng là $GMm\\left(\\dfrac{1}{R} - \\dfrac{1}{R + h}\\right) = \\dfrac{GMmh}{R(R + h)} \\approx \\dfrac{GM}{R^2} m h = mgh$. Đó chính là biểu thức thế năng trọng trường quen thuộc.',
        },
      ],
    },
    {
      heading: 'Thế hấp dẫn',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Thế hấp dẫn',
          text: 'Thế hấp dẫn tại một điểm là đại lượng đặc trưng cho trường hấp dẫn về phương diện năng lượng, đo bằng thế năng hấp dẫn của một đơn vị khối lượng đặt tại điểm đó: $\\Phi = \\dfrac{W_t}{m}$.',
        },
        { type: 'tex', tex: '\\Phi = -\\dfrac{GM}{r}' },
        {
          type: 'list',
          items: [
            'Đơn vị của thế hấp dẫn là J/kg; vì $1\\ \\text{J} = 1\\ \\text{kg} \\cdot \\text{m}^2/\\text{s}^2$ nên $1\\ \\text{J/kg} = 1\\ \\text{m}^2/\\text{s}^2$.',
            'Thế hấp dẫn chỉ phụ thuộc vật gây ra trường ($M$) và vị trí ($r$), không phụ thuộc vật đặt vào.',
            'Thế hấp dẫn là đại lượng vô hướng: thế hấp dẫn của nhiều vật tại một điểm bằng tổng đại số các thế hấp dẫn của từng vật.',
            'Ở mặt đất, $\\Phi = -\\dfrac{GM}{R} \\approx -6{,}26 \\cdot 10^7$ J/kg.',
          ],
        },
      ],
    },
    {
      heading: 'Chuyển động của vệ tinh. Tốc độ vũ trụ',
      blocks: [
        {
          type: 'p',
          text: 'Vệ tinh khối lượng $m$ bay theo quỹ đạo tròn bán kính $r$ quanh Trái Đất. Lực hấp dẫn đóng vai trò lực hướng tâm: $\\dfrac{GMm}{r^2} = \\dfrac{mv^2}{r}$, nên tốc độ của vệ tinh là',
        },
        { type: 'tex', tex: 'v = \\sqrt{\\dfrac{GM}{r}}' },
        {
          type: 'list',
          items: [
            'Tốc độ vũ trụ cấp I: tốc độ để vật bay tròn sát mặt đất ($r = R$), $v_{\\text{I}} = \\sqrt{\\dfrac{GM}{R}} = \\sqrt{g_0 R} \\approx 7{,}9$ km/s.',
            'Tốc độ vũ trụ cấp II: tốc độ nhỏ nhất để vật thoát khỏi trường hấp dẫn của Trái Đất. Vật ra tới xa vô cùng khi cơ năng không âm: $\\dfrac{mv^2}{2} - \\dfrac{GMm}{R} \\ge 0$, nên $v_{\\text{II}} = \\sqrt{\\dfrac{2GM}{R}} = \\sqrt 2\\, v_{\\text{I}} \\approx 11{,}2$ km/s.',
            'Tốc độ vũ trụ cấp III, khoảng $16{,}7$ km/s (phóng theo chiều chuyển động của Trái Đất quanh Mặt Trời): vật thoát khỏi cả hệ Mặt Trời.',
          ],
        },
        {
          type: 'table',
          head: ['Tốc độ phóng ngang ở mặt đất', 'Chuyển động của vật'],
          rows: [
            ['$v < v_{\\text{I}}$', 'Rơi trở lại Trái Đất'],
            ['$v = v_{\\text{I}}$', 'Quỹ đạo tròn sát mặt đất'],
            ['$v_{\\text{I}} < v < v_{\\text{II}}$', 'Quỹ đạo elip quanh Trái Đất'],
            ['$v \\ge v_{\\text{II}}$', 'Thoát khỏi trường hấp dẫn của Trái Đất'],
          ],
          caption: 'Bỏ qua sức cản không khí và sự tự quay của Trái Đất.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Vệ tinh địa tĩnh',
          text: 'Vệ tinh địa tĩnh bay trên quỹ đạo tròn trong mặt phẳng xích đạo, cùng chiều tự quay của Trái Đất, với chu kì bằng chu kì tự quay của Trái Đất (khoảng $24$ giờ). Nhìn từ mặt đất nó như đứng yên, nên ăng-ten thu không cần xoay theo. Quỹ đạo này ở độ cao khoảng $36\\,000$ km; các vệ tinh viễn thông Vinasat-1 (phóng năm 2008) và Vinasat-2 (năm 2012) của Việt Nam bay trên quỹ đạo địa tĩnh.',
        },
      ],
    },
    {
      heading: 'Dự án: Quỹ đạo địa tĩnh và các vệ tinh của Việt Nam',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: tính các đặc điểm của quỹ đạo địa tĩnh và tìm hiểu vai trò của nó cùng các dự án vệ tinh của Việt Nam. Dụng cụ: máy tính cầm tay hoặc bảng tính, tài liệu từ nguồn tin cậy (trang của cơ quan quản lí vệ tinh, Trung tâm Vũ trụ Việt Nam), quả địa cầu và sợi dây để làm mô hình.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Từ $\\dfrac{GMm}{r^2} = m\\left(\\dfrac{2\\pi}{T}\\right)^2 r$ với $T = 24$ giờ, tính bán kính quỹ đạo $r$, độ cao $h$ và tốc độ $v$ của vệ tinh địa tĩnh.',
            'Tính thế hấp dẫn ở mặt đất và ở quỹ đạo địa tĩnh, rồi tính công tối thiểu để đưa một vệ tinh $2\\,600$ kg từ mặt đất lên độ cao đó (chưa kể động năng).',
            'Dùng quả địa cầu và một vòng dây có bán kính đúng tỉ lệ để minh hoạ quỹ đạo địa tĩnh; giải thích vì sao vệ tinh địa tĩnh chỉ có thể ở trên xích đạo.',
            'Tìm hiểu các vệ tinh của Việt Nam: tên, năm phóng, độ cao quỹ đạo, nhiệm vụ (viễn thông, quan sát Trái Đất), và vì sao vệ tinh quan sát lại bay thấp hơn nhiều.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Nộp bảng kết quả tính toán (có các bước), ảnh mô hình, và một bài trình bày ngắn về các vệ tinh của Việt Nam. Nêu một ưu điểm và một hạn chế của quỹ đạo địa tĩnh (ví dụ: vùng phủ sóng rộng, nhưng tín hiệu đi xa nên bị trễ).',
        },
      ],
    },
  ],
  explore: {
    title: 'Phóng tên lửa từ mặt đất',
    instruction:
      'Chọn tốc độ và góc phóng rồi bấm "Phóng". Quan sát lúc nào vật rơi lại, lúc nào bay quanh Trái Đất, lúc nào thoát ra xa. Dùng hai nút tốc độ vũ trụ cấp I và cấp II, rồi thử tăng góc phóng, và theo dõi dấu của cơ năng.',
  },
  examples: [
    {
      problem:
        'Tính thế hấp dẫn tại một điểm ở bề mặt Trái Đất ($M = 6{,}0 \\cdot 10^{24}$ kg, $R = 6\\,400$ km) và ở bề mặt Mặt Trăng ($M = 7{,}2 \\cdot 10^{22}$ kg, $R = 1\\,738$ km).',
      steps: [
        'Trái Đất: $\\Phi = -\\dfrac{GM}{R} = -\\dfrac{6{,}68 \\cdot 10^{-11} \\cdot 6{,}0 \\cdot 10^{24}}{6{,}4 \\cdot 10^6} \\approx -6{,}26 \\cdot 10^7$ J/kg.',
        'Mặt Trăng: $\\Phi = -\\dfrac{6{,}68 \\cdot 10^{-11} \\cdot 7{,}2 \\cdot 10^{22}}{1{,}738 \\cdot 10^6} \\approx -2{,}77 \\cdot 10^6$ J/kg.',
        'Độ lớn ở Trái Đất gấp khoảng $23$ lần: muốn đưa $1$ kg vật chất từ bề mặt ra xa vô cùng, ở Trái Đất cần công lớn hơn rất nhiều.',
      ],
      answer:
        '$\\Phi_{\\text{TĐ}} \\approx -6{,}26 \\cdot 10^7$ J/kg; $\\Phi_{\\text{MT}} \\approx -2{,}77 \\cdot 10^6$ J/kg.',
    },
    {
      problem:
        'Xác định tốc độ vũ trụ cấp I của Mặt Trăng ($M = 7{,}2 \\cdot 10^{22}$ kg, $R = 1\\,738$ km) và của Hoả tinh ($M = 6{,}4 \\cdot 10^{23}$ kg, $R = 3\\,396$ km).',
      steps: [
        'Mặt Trăng: $v_{\\text{I}} = \\sqrt{\\dfrac{GM}{R}} = \\sqrt{\\dfrac{6{,}68 \\cdot 10^{-11} \\cdot 7{,}2 \\cdot 10^{22}}{1{,}738 \\cdot 10^6}} = \\sqrt{2{,}767 \\cdot 10^6} \\approx 1\\,664$ m/s.',
        'Hoả tinh: $v_{\\text{I}} = \\sqrt{\\dfrac{6{,}68 \\cdot 10^{-11} \\cdot 6{,}4 \\cdot 10^{23}}{3{,}396 \\cdot 10^6}} = \\sqrt{1{,}259 \\cdot 10^7} \\approx 3\\,548$ m/s.',
      ],
      answer: 'Mặt Trăng: khoảng $1{,}66$ km/s; Hoả tinh: khoảng $3{,}55$ km/s.',
    },
    {
      problem:
        'Một vệ tinh địa tĩnh có chu kì $T = 24$ giờ. Lấy $M = 6{,}0 \\cdot 10^{24}$ kg, $R = 6\\,400$ km. Tính bán kính quỹ đạo, độ cao so với mặt đất và tốc độ của vệ tinh.',
      steps: [
        'Lực hấp dẫn là lực hướng tâm: $\\dfrac{GMm}{r^2} = m\\omega^2 r$ với $\\omega = \\dfrac{2\\pi}{T}$, nên $r^3 = \\dfrac{GMT^2}{4\\pi^2}$.',
        '$T = 86\\,400$ s: $r^3 = \\dfrac{4{,}008 \\cdot 10^{14} \\cdot (86\\,400)^2}{4\\pi^2} \\approx 7{,}58 \\cdot 10^{22}\\ \\text{m}^3$, nên $r \\approx 4{,}23 \\cdot 10^7$ m $= 42\\,300$ km.',
        '$h = r - R \\approx 42\\,300 - 6\\,400 = 35\\,900$ km.',
        '$v = \\omega r = \\dfrac{2\\pi \\cdot 4{,}23 \\cdot 10^7}{86\\,400} \\approx 3\\,080$ m/s.',
      ],
      answer:
        '$r \\approx 42\\,300$ km, $h \\approx 35\\,900$ km (khoảng $36\\,000$ km), $v \\approx 3{,}08$ km/s.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Với gốc thế năng ở xa vô cùng, thế năng hấp dẫn của một vệ tinh quanh Trái Đất có đặc điểm nào?',
      options: [
        'Luôn âm, và tăng (tiến về $0$) khi vệ tinh ra xa',
        'Luôn dương, và giảm khi vệ tinh ra xa',
        'Luôn âm, và giảm khi vệ tinh ra xa',
        'Bằng $0$ ở mặt đất',
      ],
      answer: 0,
      hints: ['$W_t = -\\dfrac{GMm}{r}$. Khi $r$ tăng, $\\dfrac{1}{r}$ thay đổi thế nào?'],
      solution:
        '$W_t = -\\dfrac{GMm}{r} < 0$. Khi $r$ tăng, $\\dfrac{GMm}{r}$ giảm nên $W_t$ tăng dần về $0$ (gốc ở xa vô cùng).',
    },
    {
      type: 'text',
      prompt: 'Đơn vị của thế hấp dẫn trong hệ SI là gì? (Viết kí hiệu.)',
      accept: ['J/kg', 'J.kg-1', 'jun trên kilôgam', 'm2/s2', 'm²/s²', 'm^2/s^2'],
      hints: ['$\\Phi = \\dfrac{W_t}{m}$: đơn vị năng lượng chia đơn vị khối lượng.'],
      solution:
        'J/kg. Vì $1\\ \\text{J} = 1\\ \\text{kg} \\cdot \\text{m}^2/\\text{s}^2$ nên J/kg cũng bằng $\\text{m}^2/\\text{s}^2$.',
    },
    {
      type: 'number',
      prompt:
        'Tốc độ vũ trụ cấp I của Mặt Trăng khoảng $1{,}66$ km/s. Tốc độ vũ trụ cấp II của Mặt Trăng bằng bao nhiêu km/s? (Làm tròn đến hai chữ số thập phân.)',
      answer: 2.35,
      tolerance: 0.01,
      unit: 'km/s',
      hints: [
        '$v_{\\text{II}} = \\sqrt{\\dfrac{2GM}{R}}$. So với $v_{\\text{I}}$ thì gấp mấy lần?',
      ],
      solution:
        '$v_{\\text{II}} = \\sqrt 2\\, v_{\\text{I}} \\approx 1{,}414 \\cdot 1{,}66 \\approx 2{,}35$ km/s.',
    },
    {
      type: 'number',
      prompt:
        'Tính công tối thiểu để đưa một vệ tinh $1\\,000$ kg từ mặt đất lên độ cao $400$ km (chỉ tính phần tăng thế năng hấp dẫn). Lấy $GM = 4{,}008 \\cdot 10^{14}\\ \\text{N} \\cdot \\text{m}^2/\\text{kg}$, $R = 6\\,400$ km. Ghi theo đơn vị $10^9$ J, làm tròn đến hai chữ số thập phân.',
      answer: 3.68,
      tolerance: 0.01,
      hints: [
        'Độ tăng thế năng: $\\Delta W_t = GMm\\left(\\dfrac{1}{R} - \\dfrac{1}{R + h}\\right)$.',
        '$R = 6{,}4 \\cdot 10^6$ m, $R + h = 6{,}8 \\cdot 10^6$ m.',
      ],
      solution:
        '$\\Delta W_t = 4{,}008 \\cdot 10^{14} \\cdot 1\\,000 \\cdot \\left(\\dfrac{1}{6{,}4 \\cdot 10^6} - \\dfrac{1}{6{,}8 \\cdot 10^6}\\right) \\approx 4{,}008 \\cdot 10^{17} \\cdot 9{,}19 \\cdot 10^{-9} \\approx 3{,}68 \\cdot 10^9$ J. Tính theo $mgh$ với $g = 9{,}8\\ \\text{m/s}^2$ được $3{,}92 \\cdot 10^9$ J, lớn hơn vì đã bỏ qua việc $g$ giảm theo độ cao.',
    },
    {
      type: 'choice',
      prompt:
        'Bỏ qua sức cản không khí, một vật được phóng ngang sát mặt đất với tốc độ $9$ km/s. Nó sẽ chuyển động thế nào?',
      options: [
        'Bay quanh Trái Đất theo quỹ đạo elip',
        'Rơi trở lại mặt đất',
        'Bay theo quỹ đạo tròn sát mặt đất',
        'Thoát khỏi trường hấp dẫn của Trái Đất',
      ],
      answer: 0,
      hints: [
        'So sánh $9$ km/s với $v_{\\text{I}} \\approx 7{,}9$ km/s và $v_{\\text{II}} \\approx 11{,}2$ km/s.',
      ],
      solution:
        '$7{,}9 < 9 < 11{,}2$ (km/s): vật có tốc độ lớn hơn tốc độ vũ trụ cấp I nhưng chưa đạt cấp II, nên bay quanh Trái Đất theo quỹ đạo elip.',
    },
    {
      type: 'number',
      prompt:
        'Thế hấp dẫn do Trái Đất gây ra tại trung điểm đường nối tâm Trái Đất và tâm Mặt Trăng lớn gấp bao nhiêu lần (về độ lớn) thế hấp dẫn do Mặt Trăng gây ra tại đó? Biết $M_{\\text{TĐ}} = 6{,}0 \\cdot 10^{24}$ kg, $M_{\\text{MT}} = 7{,}2 \\cdot 10^{22}$ kg. (Làm tròn đến một chữ số thập phân.)',
      answer: 83.3,
      tolerance: 0.1,
      hints: ['Tại trung điểm, khoảng cách đến hai tâm bằng nhau.'],
      solution:
        'Với cùng $r$: $\\dfrac{\\Phi_{\\text{TĐ}}}{\\Phi_{\\text{MT}}} = \\dfrac{M_{\\text{TĐ}}}{M_{\\text{MT}}} = \\dfrac{6{,}0 \\cdot 10^{24}}{7{,}2 \\cdot 10^{22}} \\approx 83{,}3$.',
    },
    {
      type: 'number',
      prompt:
        'Trạm vũ trụ quốc tế bay quỹ đạo gần tròn ở độ cao $400$ km. Lấy $GM = 4{,}008 \\cdot 10^{14}\\ \\text{N} \\cdot \\text{m}^2/\\text{kg}$, $R = 6\\,400$ km. Tính tốc độ của trạm (km/s, làm tròn đến hai chữ số thập phân).',
      answer: 7.68,
      tolerance: 0.01,
      unit: 'km/s',
      hints: ['$v = \\sqrt{\\dfrac{GM}{r}}$ với $r = R + h$.'],
      solution:
        '$v = \\sqrt{\\dfrac{4{,}008 \\cdot 10^{14}}{6{,}8 \\cdot 10^6}} = \\sqrt{5{,}894 \\cdot 10^7} \\approx 7\\,677$ m/s $\\approx 7{,}68$ km/s, hơi nhỏ hơn $v_{\\text{I}}$ vì ở xa tâm hơn.',
    },
    {
      type: 'multi',
      prompt: 'Những phát biểu nào đúng về vệ tinh địa tĩnh?',
      options: [
        'Chu kì quay bằng chu kì tự quay của Trái Đất',
        'Quỹ đạo nằm trong mặt phẳng xích đạo',
        'Bay ở độ cao khoảng $36\\,000$ km',
        'Có thể đứng yên trên bầu trời Hà Nội ở mọi độ cao',
        'Bay nhanh hơn tốc độ vũ trụ cấp I',
      ],
      answers: [0, 1, 2],
      hints: [
        'Muốn đứng yên so với mặt đất, vệ tinh phải quay cùng Trái Đất quanh trục nào?',
        'Ở xa tâm, $v = \\sqrt{\\dfrac{GM}{r}}$ lớn hay nhỏ hơn ở sát mặt đất?',
      ],
      solution:
        'Vệ tinh địa tĩnh quay cùng chiều, cùng chu kì với Trái Đất, trên quỹ đạo tròn trong mặt phẳng xích đạo, ở độ cao khoảng $36\\,000$ km. Nó không thể đứng yên trên Hà Nội vì Hà Nội không ở xích đạo, và tốc độ của nó (khoảng $3{,}1$ km/s) nhỏ hơn $v_{\\text{I}}$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các tốc độ sau theo thứ tự tăng dần.',
      items: [
        'Tốc độ của vệ tinh địa tĩnh',
        'Tốc độ vũ trụ cấp I của Trái Đất',
        'Tốc độ vũ trụ cấp II của Trái Đất',
        'Tốc độ vũ trụ cấp III',
      ],
      answer: [0, 1, 2, 3],
      hints: [
        '$v_{\\text{II}} = \\sqrt 2\\, v_{\\text{I}}$; vệ tinh càng xa tâm Trái Đất thì bay càng chậm, vì $v = \\sqrt{\\dfrac{GM}{r}}$.',
      ],
      solution:
        'Vệ tinh địa tĩnh khoảng $3{,}1$ km/s $<$ $v_{\\text{I}} \\approx 7{,}9$ km/s $<$ $v_{\\text{II}} \\approx 11{,}2$ km/s $<$ $v_{\\text{III}} \\approx 16{,}7$ km/s.',
    },
  ],
  takeaways: [
    'Công của trọng lực và của lực hấp dẫn không phụ thuộc hình dạng đường đi, chỉ phụ thuộc điểm đầu và điểm cuối.',
    'Thế năng hấp dẫn $W_t = -\\dfrac{GMm}{r}$ (gốc ở xa vô cùng), luôn âm; gần mặt đất, độ tăng thế năng khi lên cao $h$ là $mgh$.',
    'Thế hấp dẫn $\\Phi = \\dfrac{W_t}{m} = -\\dfrac{GM}{r}$, đơn vị J/kg $= \\text{m}^2/\\text{s}^2$, đặc trưng cho trường hấp dẫn về năng lượng.',
    'Tốc độ vũ trụ: cấp I $v_{\\text{I}} = \\sqrt{\\dfrac{GM}{R}} \\approx 7{,}9$ km/s, cấp II $v_{\\text{II}} = \\sqrt{\\dfrac{2GM}{R}} \\approx 11{,}2$ km/s, cấp III khoảng $16{,}7$ km/s.',
    'Vệ tinh địa tĩnh bay trong mặt phẳng xích đạo với chu kì khoảng $24$ giờ, ở độ cao khoảng $36\\,000$ km.',
  ],
};
