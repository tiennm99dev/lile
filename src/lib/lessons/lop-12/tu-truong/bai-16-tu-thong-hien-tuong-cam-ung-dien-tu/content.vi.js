/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Từ thông qua một diện tích S đặt trong từ trường đều là Φ = BS cos α, đơn vị vêbe (Wb). Khi từ thông qua một mạch kín biến thiên thì trong mạch xuất hiện dòng điện cảm ứng; dòng điện đó có chiều chống lại sự biến thiên của từ thông (định luật Lenz), và suất điện động cảm ứng có độ lớn bằng tốc độ biến thiên của từ thông (định luật Faraday).',
  intro:
    'Nối hai đầu một cuộn dây với điện kế rồi đưa một thanh nam châm lại gần: kim điện kế lệch đi. Giữ nam châm đứng yên thì kim trở về số 0; kéo nam châm ra thì kim lệch theo chiều ngược lại. Không có pin nào trong mạch, vậy dòng điện từ đâu ra? Năm 1831, Michael Faraday đã tìm ra câu trả lời: điều quan trọng không phải là từ trường, mà là sự biến thiên của "số đường sức từ" xuyên qua mạch.',
  objectives: [
    'Định nghĩa được từ thông $\\Phi = BS\\cos\\alpha$ và đơn vị vêbe.',
    'Mô tả được thí nghiệm và nêu được điều kiện xuất hiện dòng điện cảm ứng.',
    'Phát biểu và vận dụng được định luật Lenz để xác định chiều dòng điện cảm ứng.',
    'Phát biểu và vận dụng được định luật Faraday về suất điện động cảm ứng $e_c = -\\dfrac{\\Delta\\Phi}{\\Delta t}$.',
  ],
  sections: [
    {
      heading: 'Từ thông',
      blocks: [
        {
          type: 'p',
          text: 'Xét một mặt phẳng diện tích $S$ giới hạn bởi một vòng dây kín, đặt trong từ trường đều $\\vec{B}$. Chọn vectơ pháp tuyến $\\vec{n}$ của mặt phẳng (vuông góc với mặt phẳng), gọi $\\alpha$ là góc hợp bởi $\\vec{n}$ và $\\vec{B}$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Từ thông',
          text: 'Từ thông qua diện tích $S$ là đại lượng $$\\Phi = BS\\cos\\alpha.$$ Với cuộn dây gồm $N$ vòng giống nhau thì từ thông qua cuộn dây là $\\Phi = NBS\\cos\\alpha$. Trong hệ SI, đơn vị từ thông là vêbe (Wb): $1\\ \\text{Wb} = 1\\ \\text{T} \\cdot \\text{m}^2$.',
        },
        {
          type: 'list',
          items: [
            'Từ thông có thể hiểu là số đường sức từ xuyên qua diện tích $S$.',
            '$\\alpha = 0^\\circ$ ($\\vec{B}$ vuông góc với mặt phẳng vòng dây): $\\Phi = BS$ lớn nhất.',
            '$\\alpha = 90^\\circ$ ($\\vec{B}$ song song với mặt phẳng vòng dây): $\\Phi = 0$.',
            '$\\alpha$ là góc tù: $\\Phi < 0$. Dấu của $\\Phi$ phụ thuộc vào cách chọn chiều của $\\vec{n}$.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Góc nào?',
          text: '$\\alpha$ là góc giữa $\\vec{B}$ và pháp tuyến $\\vec{n}$, không phải góc giữa $\\vec{B}$ và mặt phẳng vòng dây. Nếu đề cho mặt phẳng vòng dây hợp với đường sức từ góc $\\beta$ thì $\\alpha = 90^\\circ - \\beta$.',
        },
      ],
    },
    {
      heading: 'Hiện tượng cảm ứng điện từ',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm 1: cuộn dây nối với điện kế; đưa cực Bắc nam châm lại gần hoặc ra xa cuộn dây thì kim điện kế lệch, nam châm đứng yên thì kim không lệch. Thí nghiệm 2: cuộn dây thứ nhất nối với điện kế đặt cạnh một nam châm điện; đóng, ngắt khoá $K$ hoặc dịch con chạy của biến trở thì kim điện kế lệch. Trong cả hai trường hợp, từ thông qua cuộn dây đang thay đổi.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hiện tượng cảm ứng điện từ',
          text: 'Mỗi khi từ thông qua một mạch kín biến thiên thì trong mạch xuất hiện một dòng điện gọi là dòng điện cảm ứng. Hiện tượng xuất hiện dòng điện cảm ứng trong mạch kín gọi là hiện tượng cảm ứng điện từ; nó chỉ tồn tại trong khoảng thời gian từ thông qua mạch biến thiên.',
        },
        {
          type: 'p',
          text: 'Theo $\\Phi = BS\\cos\\alpha$, có thể làm từ thông biến thiên bằng cách thay đổi $B$ (dịch nam châm, thay đổi dòng điện trong nam châm điện), thay đổi $S$ (bóp méo vòng dây, cho một cạnh trượt) hoặc thay đổi $\\alpha$ (quay vòng dây).',
        },
      ],
    },
    {
      heading: 'Định luật Lenz về chiều dòng điện cảm ứng',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định luật Lenz',
          text: 'Dòng điện cảm ứng xuất hiện trong mạch kín có chiều sao cho từ trường do nó sinh ra chống lại sự biến thiên của từ thông sinh ra nó.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Xác định chiều của $\\vec{B}$ (từ trường ban đầu) qua mạch và xem từ thông đang tăng hay giảm.',
            'Từ thông tăng thì từ trường cảm ứng $\\vec{B}_c$ ngược chiều $\\vec{B}$; từ thông giảm thì $\\vec{B}_c$ cùng chiều $\\vec{B}$.',
            'Dùng quy tắc nắm tay phải: ngón cái theo $\\vec{B}_c$, các ngón khum lại chỉ chiều dòng điện cảm ứng.',
          ],
        },
        {
          type: 'p',
          text: 'Hệ quả: đưa một cực nam châm lại gần vòng dây thì mặt vòng dây đối diện trở thành cực cùng tên và đẩy nam châm ra; kéo nam châm ra xa thì mặt đó trở thành cực khác tên và hút nam châm lại. Muốn có dòng điện cảm ứng, ta phải tốn công thắng lực cản đó: định luật Lenz phù hợp với định luật bảo toàn năng lượng.',
        },
        { type: 'widget', name: 'lenz' },
      ],
    },
    {
      heading: 'Định luật Faraday về suất điện động cảm ứng',
      blocks: [
        {
          type: 'p',
          text: 'Dòng điện cảm ứng chứng tỏ trong mạch có một suất điện động, gọi là suất điện động cảm ứng $e_c$. Thí nghiệm cho thấy từ thông biến thiên càng nhanh thì kim điện kế lệch càng nhiều.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định luật Faraday',
          text: 'Độ lớn của suất điện động cảm ứng xuất hiện trong mạch kín tỉ lệ với tốc độ biến thiên của từ thông qua mạch kín đó: $$e_c = -\\dfrac{\\Delta\\Phi}{\\Delta t}.$$ Dấu trừ thể hiện định luật Lenz. Với cuộn dây $N$ vòng: $e_c = -N\\dfrac{\\Delta\\Phi}{\\Delta t}$, trong đó $\\Delta\\Phi$ là độ biến thiên từ thông qua một vòng.',
        },
        {
          type: 'p',
          text: 'Nếu mạch kín có điện trở $R$ thì cường độ dòng điện cảm ứng là $i_c = \\dfrac{|e_c|}{R}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Thanh dẫn chuyển động',
          text: 'Thanh dẫn dài $l$ trượt với vận tốc $v$ vuông góc với đường sức của từ trường đều $B$ trên hai thanh ray nối kín: diện tích mạch tăng thêm $lv\\,\\Delta t$ sau thời gian $\\Delta t$, nên $|e_c| = \\dfrac{Blv\\,\\Delta t}{\\Delta t} = Blv$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Khung dây quay trong từ trường',
    instruction:
      'Bấm "Cho khung quay đều" hoặc kéo trên một đồ thị (phím mũi tên) để chọn thời điểm. So sánh số đường sức xuyên qua khung với giá trị của $\\Phi$, và để ý: khi $|\\Phi|$ lớn nhất thì $e$ bằng 0, khi $\\Phi = 0$ thì $|e|$ lớn nhất.',
  },
  examples: [
    {
      problem:
        'Một vòng dây phẳng hình vuông cạnh $10$ cm đặt trong từ trường đều $B = 0{,}5$ T. Pháp tuyến của mặt phẳng vòng dây hợp với $\\vec{B}$ góc $60^\\circ$. Tính từ thông qua vòng dây.',
      steps: [
        'Diện tích: $S = 0{,}1^2 = 0{,}01$ m².',
        '$\\Phi = BS\\cos\\alpha = 0{,}5 \\cdot 0{,}01 \\cdot \\cos 60^\\circ = 0{,}5 \\cdot 0{,}01 \\cdot 0{,}5$.',
        '$\\Phi = 2{,}5 \\cdot 10^{-3}$ Wb.',
      ],
      answer: '$\\Phi = 2{,}5 \\cdot 10^{-3}$ Wb $= 2{,}5$ mWb.',
    },
    {
      problem:
        'Một cuộn dây $100$ vòng, mỗi vòng có diện tích $40$ cm², đặt trong từ trường đều có $\\vec{B}$ vuông góc với mặt phẳng các vòng dây. Cảm ứng từ tăng đều từ $0$ đến $0{,}5$ T trong $0{,}1$ s. Tính độ lớn suất điện động cảm ứng trong cuộn dây.',
      steps: [
        '$S = 40$ cm² $= 4 \\cdot 10^{-3}$ m²; $\\vec{B}$ vuông góc với mặt phẳng vòng dây nên $\\alpha = 0^\\circ$.',
        'Độ biến thiên từ thông qua một vòng: $\\Delta\\Phi = \\Delta B \\cdot S = 0{,}5 \\cdot 4 \\cdot 10^{-3} = 2 \\cdot 10^{-3}$ Wb.',
        '$|e_c| = N\\dfrac{\\Delta\\Phi}{\\Delta t} = 100 \\cdot \\dfrac{2 \\cdot 10^{-3}}{0{,}1} = 2$ V.',
      ],
      answer: '$|e_c| = 2$ V.',
    },
    {
      problem:
        'Đưa cực Bắc của một thanh nam châm lại gần một vòng dây kín. Xác định chiều dòng điện cảm ứng trong vòng dây khi nhìn từ phía nam châm.',
      steps: [
        'Đường sức từ đi ra từ cực Bắc nên $\\vec{B}$ qua vòng dây hướng ra xa nam châm; nam châm lại gần nên từ thông tăng.',
        'Theo định luật Lenz, $\\vec{B}_c$ ngược chiều $\\vec{B}$, tức là hướng về phía nam châm: mặt vòng dây đối diện nam châm là cực Bắc.',
        'Ngón cái tay phải hướng về phía nam châm (về phía người nhìn) thì các ngón tay khum ngược chiều kim đồng hồ.',
      ],
      answer:
        'Nhìn từ phía nam châm, dòng điện cảm ứng chạy ngược chiều kim đồng hồ; vòng dây đẩy nam châm ra.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Đơn vị của từ thông trong hệ SI là',
      options: ['vêbe (Wb)', 'tesla (T)', 'henry (H)', 'vôn (V)'],
      answer: 0,
      hints: ['$\\Phi = BS\\cos\\alpha$ có đơn vị T·m².'],
      solution: 'Đơn vị từ thông là vêbe: $1$ Wb $= 1$ T·m². Tesla là đơn vị của cảm ứng từ.',
    },
    {
      type: 'number',
      prompt:
        'Một khung dây phẳng diện tích $50$ cm² đặt trong từ trường đều $B = 0{,}4$ T, $\\vec{B}$ vuông góc với mặt phẳng khung. Từ thông qua khung bằng bao nhiêu mWb?',
      answer: 2,
      unit: 'mWb',
      hints: [
        'Đổi $50$ cm² $= 5 \\cdot 10^{-3}$ m².',
        '$\\vec{B}$ vuông góc với mặt phẳng khung thì $\\alpha = 0^\\circ$.',
      ],
      solution: '$\\Phi = BS = 0{,}4 \\cdot 5 \\cdot 10^{-3} = 2 \\cdot 10^{-3}$ Wb $= 2$ mWb.',
    },
    {
      type: 'number',
      prompt:
        'Một vòng dây diện tích $100$ cm² đặt trong từ trường đều $B = 0{,}2$ T sao cho mặt phẳng vòng dây hợp với đường sức từ góc $30^\\circ$. Từ thông qua vòng dây bằng bao nhiêu mWb?',
      answer: 1,
      tolerance: 0.001,
      unit: 'mWb',
      hints: [
        'Góc $30^\\circ$ là góc giữa mặt phẳng vòng dây và $\\vec{B}$, không phải góc $\\alpha$ trong công thức.',
        '$\\alpha = 90^\\circ - 30^\\circ = 60^\\circ$.',
      ],
      solution:
        '$\\alpha = 60^\\circ$, nên $\\Phi = 0{,}2 \\cdot 0{,}01 \\cdot \\cos 60^\\circ = 10^{-3}$ Wb $= 1$ mWb.',
    },
    {
      type: 'choice',
      prompt: 'Trường hợp nào sau đây KHÔNG xuất hiện dòng điện cảm ứng trong vòng dây kín?',
      options: [
        'Nam châm và vòng dây cùng chuyển động thẳng đều với cùng một vận tốc',
        'Đưa nam châm lại gần vòng dây đứng yên',
        'Quay vòng dây trong từ trường đều quanh một đường kính vuông góc với đường sức',
        'Tăng dần cường độ dòng điện trong nam châm điện đặt cạnh vòng dây',
      ],
      answer: 0,
      hints: ['Dòng điện cảm ứng chỉ xuất hiện khi từ thông qua mạch biến thiên.'],
      solution:
        'Khi nam châm và vòng dây chuyển động cùng vận tốc, vị trí tương đối không đổi nên từ thông qua vòng dây không đổi: không có dòng điện cảm ứng. Các trường hợp còn lại đều làm từ thông biến thiên.',
    },
    {
      type: 'choice',
      prompt:
        'Kéo cực Nam của một thanh nam châm ra xa một vòng dây kín. Mặt vòng dây đối diện với nam châm trở thành',
      options: [
        'cực Bắc, hút nam châm',
        'cực Nam, đẩy nam châm',
        'cực Bắc, đẩy nam châm',
        'cực Nam, hút nam châm',
      ],
      answer: 0,
      hints: [
        'Nam châm ra xa thì từ thông qua vòng dây tăng hay giảm?',
        'Dòng điện cảm ứng chống lại sự giảm đó: vòng dây "giữ" nam châm lại.',
      ],
      solution:
        'Nam châm ra xa làm từ thông giảm; theo định luật Lenz, vòng dây chống lại bằng cách hút nam châm, nên mặt đối diện cực Nam phải là cực Bắc.',
    },
    {
      type: 'number',
      prompt:
        'Một cuộn dây $50$ vòng; từ thông qua mỗi vòng giảm đều từ $4 \\cdot 10^{-3}$ Wb về $0$ trong $0{,}1$ s. Độ lớn suất điện động cảm ứng trong cuộn dây bằng bao nhiêu vôn?',
      answer: 2,
      unit: 'V',
      hints: ['$|e_c| = N\\dfrac{|\\Delta\\Phi|}{\\Delta t}$.'],
      solution: '$|e_c| = 50 \\cdot \\dfrac{4 \\cdot 10^{-3}}{0{,}1} = 2$ V.',
    },
    {
      type: 'number',
      prompt:
        'Một khung dây một vòng diện tích $0{,}02$ m², điện trở $0{,}5\\ \\Omega$, đặt vuông góc với đường sức từ. Cảm ứng từ giảm đều từ $0{,}6$ T xuống $0{,}2$ T trong $0{,}04$ s. Cường độ dòng điện cảm ứng trong khung bằng bao nhiêu ampe?',
      answer: 0.4,
      unit: 'A',
      hints: [
        'Tính $|e_c| = \\dfrac{|\\Delta B| S}{\\Delta t}$ trước.',
        'Sau đó $i_c = \\dfrac{|e_c|}{R}$.',
      ],
      solution:
        '$|e_c| = \\dfrac{0{,}4 \\cdot 0{,}02}{0{,}04} = 0{,}2$ V, nên $i_c = \\dfrac{0{,}2}{0{,}5} = 0{,}4$ A.',
    },
    {
      type: 'number',
      prompt:
        'Thanh dẫn dài $20$ cm trượt trên hai thanh ray với vận tốc $4$ m/s, vuông góc với đường sức của từ trường đều $B = 0{,}5$ T. Suất điện động cảm ứng trong thanh bằng bao nhiêu vôn?',
      answer: 0.4,
      unit: 'V',
      hints: ['$|e_c| = Blv$ với $l$ tính bằng mét.'],
      solution: '$|e_c| = 0{,}5 \\cdot 0{,}2 \\cdot 4 = 0{,}4$ V.',
    },
    {
      type: 'choice',
      prompt: 'Phát biểu nào đúng với định luật Lenz?',
      options: [
        'Dòng điện cảm ứng có chiều sao cho từ trường do nó sinh ra chống lại sự biến thiên của từ thông sinh ra nó',
        'Dòng điện cảm ứng luôn có từ trường ngược chiều với từ trường ban đầu',
        'Dòng điện cảm ứng luôn có từ trường cùng chiều với từ trường ban đầu',
        'Dòng điện cảm ứng có độ lớn tỉ lệ với tốc độ biến thiên của từ thông',
      ],
      answer: 0,
      hints: ['Định luật Lenz nói về chiều; định luật Faraday nói về độ lớn.'],
      solution:
        'Từ trường cảm ứng chống lại sự biến thiên của từ thông: ngược chiều $\\vec{B}$ khi từ thông tăng, cùng chiều khi từ thông giảm, nên hai phát biểu "luôn" đều sai. Phát biểu về độ lớn là của định luật Faraday.',
    },
  ],
  takeaways: [
    'Từ thông $\\Phi = BS\\cos\\alpha$ ($\\alpha$ là góc giữa $\\vec{n}$ và $\\vec{B}$), đơn vị Wb; cuộn $N$ vòng: $\\Phi = NBS\\cos\\alpha$.',
    'Từ thông qua mạch kín biến thiên thì trong mạch có dòng điện cảm ứng (hiện tượng cảm ứng điện từ).',
    'Định luật Lenz: từ trường của dòng điện cảm ứng chống lại sự biến thiên của từ thông sinh ra nó.',
    'Định luật Faraday: $e_c = -N\\dfrac{\\Delta\\Phi}{\\Delta t}$; thanh dẫn chuyển động vuông góc với đường sức: $|e_c| = Blv$.',
  ],
};
