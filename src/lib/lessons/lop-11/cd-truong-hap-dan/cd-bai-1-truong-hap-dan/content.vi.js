/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hai chất điểm bất kì hút nhau bằng lực tỉ lệ thuận với tích hai khối lượng và tỉ lệ nghịch với bình phương khoảng cách; xung quanh mọi vật có khối lượng có trường hấp dẫn, biểu diễn bằng các đường sức hướng về vật.',
  intro:
    'Mặt Trời giữ được tám hành tinh quay quanh nó, Trái Đất giữ Mặt Trăng, và một viên đá thả ra luôn rơi về phía mặt đất. Không có sợi dây nào nối các vật ấy với nhau. Vậy lực hút truyền qua khoảng không bằng cách nào?',
  objectives: [
    'Phát biểu được định luật vạn vật hấp dẫn và viết được biểu thức $F = G\\dfrac{m_1 m_2}{r^2}$.',
    'Nêu được điều kiện áp dụng biểu thức: chất điểm hoặc quả cầu đồng chất.',
    'Nêu được khái niệm trường hấp dẫn và lấy được ví dụ chứng tỏ trường hấp dẫn tồn tại.',
    'Biểu diễn được trường hấp dẫn bằng đường sức; nhận ra trường hấp dẫn đều gần mặt đất.',
    'Vận dụng được định luật để tính lực hấp dẫn và gia tốc rơi tự do ở độ cao h.',
  ],
  sections: [
    {
      heading: 'Định luật vạn vật hấp dẫn',
      blocks: [
        {
          type: 'p',
          text: 'Viên đá thả ra rơi về phía mặt đất, quả táo rụng xuống đất, Mặt Trăng quay quanh Trái Đất: tất cả do lực hút của Trái Đất. Newton cho rằng lực hút này không chỉ có ở Trái Đất mà có giữa mọi vật trong vũ trụ, và gọi nó là lực hấp dẫn.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định luật vạn vật hấp dẫn',
          text: 'Lực hấp dẫn giữa hai chất điểm bất kì tỉ lệ thuận với tích hai khối lượng của chúng và tỉ lệ nghịch với bình phương khoảng cách giữa chúng.',
        },
        { type: 'tex', tex: 'F = G\\dfrac{m_1 m_2}{r^2}' },
        {
          type: 'list',
          items: [
            '$m_1$, $m_2$: khối lượng hai chất điểm (kg); $r$: khoảng cách giữa chúng (m).',
            '$G = 6{,}68 \\cdot 10^{-11}\\ \\text{N} \\cdot \\text{m}^2/\\text{kg}^2$: hằng số hấp dẫn, như nhau với mọi vật.',
          ],
        },
        {
          type: 'p',
          text: 'Biểu thức áp dụng cho hai chất điểm, tức hai vật có kích thước rất nhỏ so với khoảng cách giữa chúng. Nó cũng đúng cho hai quả cầu đồng chất (như các hành tinh, gần đúng), khi đó $r$ là khoảng cách giữa hai tâm: khối lượng của quả cầu coi như tập trung ở tâm.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Biểu diễn lực hấp dẫn',
          text: 'Hai lực hấp dẫn mà hai chất điểm tác dụng lên nhau là hai lực trực đối: cùng giá là đường nối hai chất điểm, ngược chiều (mỗi lực hướng về vật kia), cùng độ lớn, đặt vào hai vật khác nhau. Trái Đất hút quả táo bao nhiêu thì quả táo cũng hút Trái Đất bấy nhiêu; chỉ vì Trái Đất có khối lượng rất lớn nên ta không thấy nó chuyển động.',
        },
      ],
    },
    {
      heading: 'Trường hấp dẫn',
      blocks: [
        {
          type: 'p',
          text: 'Lực hấp dẫn tác dụng cả khi hai vật không chạm nhau và ở rất xa nhau. Người ta giải thích: xung quanh mỗi vật có khối lượng tồn tại một trường hấp dẫn. Vật khác có khối lượng đặt trong trường ấy chịu lực hấp dẫn do trường tác dụng.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Trường hấp dẫn',
          text: 'Trường hấp dẫn là một dạng vật chất tồn tại xung quanh mọi vật có khối lượng, tác dụng lực hấp dẫn lên vật khác có khối lượng đặt trong nó. Trường hấp dẫn của Trái Đất còn gọi là trường trọng lực (trọng trường).',
        },
        {
          type: 'list',
          items: [
            'Mặt Trăng chuyển động quanh Trái Đất, các hành tinh chuyển động quanh Mặt Trời: chúng nằm trong trường hấp dẫn của Trái Đất, của Mặt Trời.',
            'Thuỷ triều: nước biển dâng lên, rút xuống theo vị trí của Mặt Trăng và Mặt Trời. Triều cường xảy ra khi Mặt Trời, Trái Đất, Mặt Trăng gần thẳng hàng (trăng non, trăng tròn); triều kém khi hướng Mặt Trời vuông góc với hướng Mặt Trăng.',
            'Sao đôi: hai ngôi sao ở gần nhau quay quanh khối tâm chung, do trường hấp dẫn của sao này tác dụng lên sao kia. Quan sát quỹ đạo của sao đôi giúp xác định khối lượng của chúng.',
          ],
        },
      ],
    },
    {
      heading: 'Đường sức trường hấp dẫn',
      blocks: [
        {
          type: 'p',
          text: 'Đặt một vật thử nhỏ ở nhiều điểm trong trường hấp dẫn và vẽ hướng lực tác dụng lên nó, ta được các đường sức của trường hấp dẫn. Đường sức là đường mà tiếp tuyến tại mỗi điểm có phương trùng với phương của lực hấp dẫn tác dụng lên vật thử đặt tại điểm đó, chiều là chiều của lực.',
        },
        {
          type: 'list',
          items: [
            'Trường hấp dẫn của một chất điểm hay quả cầu đồng chất có đường sức là những đường thẳng hướng vào tâm vật.',
            'Nơi đường sức dày, trường hấp dẫn mạnh; nơi đường sức thưa, trường hấp dẫn yếu.',
            'Khác với điện trường, lực hấp dẫn luôn là lực hút, nên đường sức chỉ đi vào các vật, không có đường sức đi ra từ vật nào.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Trường hấp dẫn đều gần mặt đất',
          text: 'Trong một vùng nhỏ gần mặt đất (cỡ vài kilômét, rất nhỏ so với bán kính Trái Đất), các đường sức gần như song song, cách đều, hướng thẳng đứng xuống dưới. Trường hấp dẫn ở đó coi như trường hấp dẫn đều.',
        },
      ],
    },
    {
      heading: 'Chuyển động của vật trong trường hấp dẫn của Trái Đất',
      blocks: [
        {
          type: 'p',
          text: 'Newton đưa ra một thí nghiệm tưởng tượng: đặt một khẩu pháo trên đỉnh núi rất cao và bắn ngang. Tốc độ càng lớn thì đạn rơi càng xa. Khi tốc độ đủ lớn, mặt đất cong đi khuất dưới viên đạn nhanh đúng bằng tốc độ nó rơi, và viên đạn bay vòng quanh Trái Đất mà không chạm đất. Mặt Trăng và các vệ tinh nhân tạo chuyển động như thế.',
        },
        {
          type: 'p',
          text: 'Coi Trái Đất là quả cầu đồng chất khối lượng $M$, bán kính $R$. Một vật khối lượng $m$ ở độ cao $h$ chịu lực hấp dẫn $F = G\\dfrac{Mm}{(R + h)^2}$. Lực này chính là trọng lực $P = mg$, nên gia tốc rơi tự do ở độ cao $h$ là',
        },
        { type: 'tex', tex: 'g = \\dfrac{GM}{(R + h)^2}' },
        {
          type: 'p',
          text: 'Gia tốc rơi tự do không phụ thuộc khối lượng của vật, chỉ phụ thuộc độ cao. Với $M = 6{,}0 \\cdot 10^{24}$ kg và $R = 6\\,400$ km, ở mặt đất $g \\approx 9{,}79\\ \\text{m/s}^2$. Lên cao vài kilômét, $h$ rất nhỏ so với $R$ nên $g$ gần như không đổi.',
        },
      ],
    },
    {
      heading: 'Dự án: Cân Trái Đất',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: đo gia tốc rơi tự do ở nơi em sống rồi dùng định luật vạn vật hấp dẫn để tính khối lượng Trái Đất, theo cách Cavendish đã gợi ý khi đo được hằng số $G$. Dụng cụ: sợi chỉ không dãn dài khoảng $1$ m, quả nặng nhỏ, giá treo, thước mét, đồng hồ bấm giây (hoặc điện thoại).',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Làm con lắc đơn: treo quả nặng vào sợi chỉ, đo chiều dài $l$ từ điểm treo đến tâm quả nặng.',
            'Kéo con lắc lệch một góc nhỏ (dưới $10^\\circ$) rồi thả. Đo thời gian $20$ dao động, chia cho $20$ để được chu kì $T$. Làm ba lần, lấy trung bình.',
            'Tính $g = \\dfrac{4\\pi^2 l}{T^2}$. Đổi chiều dài dây, làm lại để kiểm tra.',
            'Từ $g = \\dfrac{GM}{R^2}$, tính $M = \\dfrac{gR^2}{G}$ với $R = 6\\,400$ km và $G = 6{,}68 \\cdot 10^{-11}\\ \\text{N} \\cdot \\text{m}^2/\\text{kg}^2$.',
            'Tìm hiểu thí nghiệm cân xoắn của Cavendish (năm 1798) và vì sao đo được $G$ thì "cân" được Trái Đất.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Nộp bảng số liệu ($l$, thời gian $20$ dao động, $T$, $g$), giá trị $M$ tính được, so sánh với $6{,}0 \\cdot 10^{24}$ kg và nêu hai nguyên nhân gây sai số. Kèm một đoạn ngắn giới thiệu thí nghiệm của Cavendish.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đường sức và lực lên vật thử',
    instruction:
      'Kéo các quả cầu nặng và vật thử m (hoặc chọn rồi dùng phím mũi tên). Quan sát: đường sức luôn đi vào các quả cầu; lực lên vật thử hướng theo đường sức. Thử tìm điểm mà lực hút của hai quả cầu cân bằng nhau, và đổi khối lượng vật thử để thấy lực tăng theo.',
  },
  examples: [
    {
      problem:
        'Hai quả cầu giống nhau, mỗi quả có khối lượng $3$ kg, bán kính $10$ cm. Khoảng cách giữa hai tâm là $80$ cm. Tính lực hấp dẫn giữa chúng.',
      steps: [
        'Hai quả cầu đồng chất nên coi như hai chất điểm đặt ở tâm, $r = 80$ cm $= 0{,}8$ m. Bán kính quả cầu không dùng đến.',
        '$F = G\\dfrac{m_1 m_2}{r^2} = 6{,}68 \\cdot 10^{-11} \\cdot \\dfrac{3 \\cdot 3}{0{,}8^2}$.',
        '$F = 6{,}68 \\cdot 10^{-11} \\cdot 14{,}0625 \\approx 9{,}39 \\cdot 10^{-10}$ N.',
      ],
      answer:
        '$F \\approx 9{,}39 \\cdot 10^{-10}$ N, một lực rất nhỏ, vì thế ta không cảm nhận được lực hút giữa các vật thường ngày.',
    },
    {
      problem:
        'Trái Đất có khối lượng $6{,}0 \\cdot 10^{24}$ kg, Mặt Trăng có khối lượng $7{,}2 \\cdot 10^{22}$ kg, khoảng cách giữa hai tâm là $3{,}84 \\cdot 10^8$ m. Tính lực hấp dẫn giữa Trái Đất và Mặt Trăng.',
      steps: [
        '$F = G\\dfrac{Mm}{r^2} = 6{,}68 \\cdot 10^{-11} \\cdot \\dfrac{6{,}0 \\cdot 10^{24} \\cdot 7{,}2 \\cdot 10^{22}}{(3{,}84 \\cdot 10^8)^2}$.',
        'Tử số: $6{,}68 \\cdot 10^{-11} \\cdot 4{,}32 \\cdot 10^{47} \\approx 2{,}886 \\cdot 10^{37}$; mẫu số: $1{,}475 \\cdot 10^{17}$.',
        '$F \\approx 1{,}96 \\cdot 10^{20}$ N.',
      ],
      answer:
        '$F \\approx 1{,}96 \\cdot 10^{20}$ N. Lực này giữ Mặt Trăng chuyển động quanh Trái Đất, và Mặt Trăng cũng hút Trái Đất một lực đúng bằng thế.',
    },
    {
      problem:
        'Lấy $G = 6{,}68 \\cdot 10^{-11}\\ \\text{N} \\cdot \\text{m}^2/\\text{kg}^2$, $M = 6{,}0 \\cdot 10^{24}$ kg, $R = 6\\,400$ km. Tính gia tốc rơi tự do ở đỉnh Fansipan, cao $3{,}1$ km so với mực nước biển.',
      steps: [
        '$R + h = 6\\,400 + 3{,}1 = 6\\,403{,}1$ km $= 6{,}4031 \\cdot 10^6$ m.',
        '$g = \\dfrac{GM}{(R + h)^2} = \\dfrac{6{,}68 \\cdot 10^{-11} \\cdot 6{,}0 \\cdot 10^{24}}{(6{,}4031 \\cdot 10^6)^2} = \\dfrac{4{,}008 \\cdot 10^{14}}{4{,}0999 \\cdot 10^{13}}$.',
        '$g \\approx 9{,}776\\ \\text{m/s}^2$, nhỏ hơn ở mặt đất ($9{,}785\\ \\text{m/s}^2$) không đáng kể.',
      ],
      answer: '$g \\approx 9{,}776\\ \\text{m/s}^2$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Biểu thức $F = G\\dfrac{m_1 m_2}{r^2}$ áp dụng được trực tiếp trong trường hợp nào?',
      options: [
        'Hai chất điểm, hoặc hai quả cầu đồng chất với $r$ là khoảng cách giữa hai tâm',
        'Hai vật bất kì, với $r$ là khoảng cách giữa hai mép gần nhất',
        'Chỉ hai vật đặt trên mặt đất',
        'Chỉ khi một trong hai vật là Trái Đất',
      ],
      answer: 0,
      hints: ['Hai vật có kích thước rất nhỏ so với khoảng cách giữa chúng được coi là gì?'],
      solution:
        'Biểu thức đúng cho hai chất điểm. Một quả cầu đồng chất hút như thể khối lượng tập trung ở tâm, nên biểu thức cũng đúng cho hai quả cầu đồng chất với $r$ là khoảng cách giữa hai tâm.',
    },
    {
      type: 'number',
      prompt:
        'Hai bạn có khối lượng $50$ kg và $60$ kg đứng cách nhau $1$ m (coi như hai chất điểm). Lực hấp dẫn giữa hai bạn bằng bao nhiêu? Ghi kết quả theo đơn vị $10^{-7}$ N, làm tròn đến một chữ số thập phân.',
      answer: 2,
      tolerance: 0.05,
      hints: ['Thay $m_1 = 50$, $m_2 = 60$, $r = 1$ vào biểu thức của định luật.'],
      solution:
        '$F = 6{,}68 \\cdot 10^{-11} \\cdot \\dfrac{50 \\cdot 60}{1^2} = 2{,}004 \\cdot 10^{-7}$ N $\\approx 2{,}0 \\cdot 10^{-7}$ N.',
    },
    {
      type: 'number',
      prompt:
        'Khoảng cách giữa hai chất điểm tăng lên gấp $3$ lần, khối lượng giữ nguyên. Lực hấp dẫn giữa chúng giảm đi bao nhiêu lần?',
      answer: 9,
      hints: ['Lực tỉ lệ nghịch với bình phương khoảng cách.'],
      solution: '$F \\sim \\dfrac{1}{r^2}$: $r$ tăng $3$ lần thì $F$ giảm $3^2 = 9$ lần.',
    },
    {
      type: 'number',
      prompt:
        'Khối lượng của mỗi chất điểm đều tăng gấp đôi và khoảng cách giữa chúng cũng tăng gấp đôi. Lực hấp dẫn mới bằng bao nhiêu lần lực cũ?',
      answer: 1,
      hints: ['Tử số $m_1 m_2$ tăng bao nhiêu lần? Mẫu số $r^2$ tăng bao nhiêu lần?'],
      solution:
        'Tử số tăng $2 \\cdot 2 = 4$ lần, mẫu số tăng $2^2 = 4$ lần, nên lực không đổi: bằng $1$ lần lực cũ.',
    },
    {
      type: 'choice',
      prompt: 'Phát biểu nào đúng về đường sức của trường hấp dẫn do một quả cầu đồng chất gây ra?',
      options: [
        'Là những đường thẳng hướng vào tâm quả cầu',
        'Là những đường thẳng hướng ra xa tâm quả cầu',
        'Là những đường tròn đồng tâm với quả cầu',
        'Là những đường thẳng song song, cách đều ở mọi nơi',
      ],
      answer: 0,
      hints: ['Đường sức có chiều của lực hấp dẫn lên vật thử. Lực hấp dẫn là lực hút hay đẩy?'],
      solution:
        'Lực hấp dẫn luôn hút vật thử về tâm quả cầu, nên đường sức là những đường thẳng hướng vào tâm. Chỉ trong một vùng nhỏ gần mặt đất các đường sức mới gần như song song.',
    },
    {
      type: 'multi',
      prompt: 'Những hiện tượng nào cho thấy xung quanh vật có khối lượng tồn tại trường hấp dẫn?',
      options: [
        'Mặt Trăng chuyển động quanh Trái Đất',
        'Nước biển dâng lên, rút xuống theo vị trí Mặt Trăng',
        'Hai ngôi sao của một sao đôi quay quanh nhau',
        'Thanh nam châm hút đinh sắt',
        'Lược nhựa cọ vào tóc hút được mẩu giấy',
      ],
      answers: [0, 1, 2],
      hints: ['Hai hiện tượng là do trường khác, không phải trường hấp dẫn.'],
      solution:
        'Chuyển động của Mặt Trăng, thuỷ triều và sao đôi đều do lực hấp dẫn truyền qua trường hấp dẫn. Nam châm hút đinh là tương tác từ, lược nhựa hút giấy là tương tác điện.',
    },
    {
      type: 'number',
      prompt:
        'Lấy $G = 6{,}68 \\cdot 10^{-11}\\ \\text{N} \\cdot \\text{m}^2/\\text{kg}^2$, $M = 6{,}0 \\cdot 10^{24}$ kg, $R = 6\\,400$ km. Tính gia tốc rơi tự do ở đỉnh Everest, cao $8{,}8$ km (làm tròn đến hai chữ số thập phân).',
      answer: 9.76,
      tolerance: 0.005,
      unit: 'm/s²',
      hints: ['Dùng $g = \\dfrac{GM}{(R + h)^2}$, nhớ đổi $R + h$ ra mét.'],
      solution:
        '$R + h = 6\\,408{,}8$ km $= 6{,}4088 \\cdot 10^6$ m. $g = \\dfrac{4{,}008 \\cdot 10^{14}}{(6{,}4088 \\cdot 10^6)^2} \\approx 9{,}758 \\approx 9{,}76\\ \\text{m/s}^2$.',
    },
    {
      type: 'number',
      prompt:
        'Dùng số liệu ở Ví dụ 2: Trái Đất $6{,}0 \\cdot 10^{24}$ kg, Mặt Trăng $7{,}2 \\cdot 10^{22}$ kg. Nếu khoảng cách giữa hai tâm giảm còn một nửa ($1{,}92 \\cdot 10^8$ m), lực hấp dẫn giữa chúng bằng bao nhiêu? Ghi theo đơn vị $10^{20}$ N, làm tròn đến hai chữ số thập phân.',
      answer: 7.83,
      tolerance: 0.02,
      hints: [
        'Khoảng cách giảm $2$ lần thì lực tăng mấy lần?',
        'Ví dụ 2 cho $F \\approx 1{,}957 \\cdot 10^{20}$ N.',
      ],
      solution:
        "Lực tăng $2^2 = 4$ lần: $F' = 4 \\cdot 1{,}957 \\cdot 10^{20} \\approx 7{,}83 \\cdot 10^{20}$ N.",
    },
    {
      type: 'choice',
      prompt:
        'Quả táo rơi về phía Trái Đất mà ta không thấy Trái Đất "rơi" về phía quả táo. Giải thích nào đúng?',
      options: [
        'Hai lực bằng nhau nhưng Trái Đất có khối lượng rất lớn nên gia tốc của nó gần bằng không',
        'Quả táo không hút Trái Đất',
        'Trái Đất hút quả táo mạnh hơn quả táo hút Trái Đất',
        'Lực hấp dẫn chỉ tác dụng lên vật nhỏ',
      ],
      answer: 0,
      hints: ['Hai lực hấp dẫn giữa hai vật là hai lực trực đối. Gia tốc $a = \\dfrac{F}{m}$.'],
      solution:
        'Quả táo hút Trái Đất một lực đúng bằng lực Trái Đất hút quả táo. Nhưng khối lượng Trái Đất cỡ $10^{24}$ kg nên gia tốc $a = \\dfrac{F}{M}$ của nó nhỏ đến mức không thể nhận ra.',
    },
  ],
  takeaways: [
    'Định luật vạn vật hấp dẫn: $F = G\\dfrac{m_1 m_2}{r^2}$, với $G = 6{,}68 \\cdot 10^{-11}\\ \\text{N} \\cdot \\text{m}^2/\\text{kg}^2$; áp dụng cho chất điểm và quả cầu đồng chất ($r$ là khoảng cách hai tâm).',
    'Hai lực hấp dẫn giữa hai vật là hai lực trực đối, luôn là lực hút.',
    'Trường hấp dẫn là dạng vật chất tồn tại quanh mọi vật có khối lượng, tác dụng lực hấp dẫn lên vật có khối lượng đặt trong nó; trường hấp dẫn của Trái Đất là trọng trường.',
    'Đường sức trường hấp dẫn của quả cầu đồng chất là các đường thẳng hướng vào tâm; gần mặt đất, trong vùng nhỏ, trường hấp dẫn coi như đều.',
    'Gia tốc rơi tự do ở độ cao $h$: $g = \\dfrac{GM}{(R + h)^2}$, giảm dần khi lên cao.',
  ],
};
