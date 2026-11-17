/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tia X là sóng điện từ có bước sóng từ khoảng 10⁻¹¹ m đến 10⁻⁸ m, được tạo ra trong ống Cu-lít-giơ khi electron có động năng lớn đập vào đối catot; tia X bị suy giảm theo I = I₀e^(−μd) khi xuyên qua vật chất, có nhiều ứng dụng nhưng cần được dùng an toàn.',
  intro:
    'Năm 1895, Röntgen phát hiện một loại tia vô hình xuyên qua được giấy, gỗ, da thịt và làm hiện lên hình xương bàn tay trên tấm kính ảnh. Ông gọi nó là tia X vì chưa biết bản chất của nó. Tia X là gì, được tạo ra và điều khiển như thế nào, và vì sao nó vừa giúp ích cho y học vừa phải được dùng thận trọng?',
  objectives: [
    'Nêu được bản chất của tia X và cách tạo ra tia X bằng ống Cu-lít-giơ.',
    'Nêu được cách điều khiển tia X: thay đổi dòng điện nung catot, hiệu điện thế giữa anot và catot, dùng bộ lọc.',
    'Vận dụng được biểu thức $I = I_0e^{-\\mu d}$ mô tả sự suy giảm của tia X và hệ thức $W_đ = eU$ cho electron trong ống.',
    'Nêu được một số tính chất, ứng dụng, tác hại của tia X và cách giữ an toàn khi tiếp xúc với tia X.',
  ],
  sections: [
    {
      heading: 'Bản chất và cách tạo ra tia X',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tia X',
          text: 'Tia X có bản chất là sóng điện từ, có bước sóng trong khoảng từ $10^{-11}$ m đến $10^{-8}$ m, ngắn hơn bước sóng của tia tử ngoại. Tia X được tạo ra khi cho electron có động năng lớn đập vào một kim loại có nguyên tử lượng lớn.',
        },
        {
          type: 'p',
          text: 'Ống Cu-lít-giơ (ống Coolidge) là một ống thuỷ tinh đã hút chân không, gồm:',
        },
        {
          type: 'list',
          items: [
            'Dây vonfam được nung nóng bằng dòng điện, làm nguồn phát electron.',
            'Catot (K) bằng kim loại, có dạng chỏm cầu để chùm electron hội tụ vào anot.',
            'Anot (A), còn gọi là đối catot, làm bằng kim loại có nguyên tử lượng lớn và nhiệt độ nóng chảy cao (như vonfam); khi ống hoạt động, anot được làm nguội bằng nước.',
          ],
        },
        {
          type: 'p',
          text: 'Giữa anot và catot đặt một hiệu điện thế $U$ cỡ vài chục kilôvôn. Electron bứt ra từ dây nung được điện trường tăng tốc; bỏ qua động năng ban đầu, khi tới anot mỗi electron có động năng',
        },
        { type: 'tex', tex: 'W_đ = \\dfrac{1}{2}mv^2 = eU' },
        {
          type: 'p',
          text: 'với $e = 1{,}6 \\cdot 10^{-19}$ C, $m = 9{,}1 \\cdot 10^{-31}$ kg. Electron đập vào đối catot và làm đối catot phát ra tia X. Chỉ một phần rất nhỏ (cỡ $1\\%$) năng lượng của chùm electron chuyển thành tia X, phần còn lại làm nóng anot; vì thế anot phải chịu nhiệt tốt và được làm nguội liên tục.',
        },
      ],
    },
    {
      heading: 'Cách điều khiển tia X',
      blocks: [
        {
          type: 'table',
          caption: 'Các cách điều khiển chùm tia X phát ra từ ống',
          head: ['Điều chỉnh', 'Kết quả'],
          rows: [
            [
              'Tăng dòng điện nung catot',
              'Catot phát nhiều electron hơn, dòng điện trong ống tăng: chùm tia X mạnh hơn (cường độ lớn hơn).',
            ],
            [
              'Tăng hiệu điện thế giữa anot và catot',
              'Electron có động năng lớn hơn: tia X phát ra có bước sóng ngắn hơn (cứng hơn), đâm xuyên mạnh hơn, và chùm tia cũng mạnh hơn.',
            ],
            [
              'Dùng bộ lọc (tấm kim loại mỏng ở cửa sổ ống)',
              'Hấp thụ phần tia X mềm (bước sóng dài) vốn không xuyên qua cơ thể mà chỉ bị da hấp thụ, nên giảm liều chiếu vô ích.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Bước sóng ngắn nhất',
          text: 'Tia X từ ống có nhiều bước sóng khác nhau (phổ liên tục) nhưng không có bước sóng nào ngắn hơn một giá trị $\\lambda_{min}$ tỉ lệ nghịch với $U$: $\\lambda_{min} = \\dfrac{hc}{eU}$, với $h = 6{,}625 \\cdot 10^{-34}$ J·s, $c = 3 \\cdot 10^8$ m/s. Ở $U = 50$ kV, $\\lambda_{min} \\approx 2{,}5 \\cdot 10^{-11}$ m. Công thức này được giải thích ở Chuyên đề 3, khi học về năng lượng của photon.',
        },
      ],
    },
    {
      heading: 'Sự suy giảm của tia X',
      blocks: [
        {
          type: 'p',
          text: 'Trong không khí cường độ chùm tia X gần như không đổi. Khi xuyên qua mô hay xương, cường độ chùm tia giảm dần theo quy luật hàm số mũ, giảm nhanh hơn khi đi qua xương. Với một vật liệu đồng nhất:',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Sự suy giảm cường độ tia X',
          text: '$$I = I_0e^{-\\mu d}$$ trong đó $I_0$ là cường độ ban đầu của chùm tia X (W/m²), $I$ là cường độ sau khi đi được quãng đường $d$ (m) trong vật liệu, $\\mu$ là hệ số suy giảm (hệ số hấp thụ) của vật liệu, đơn vị $\\text{m}^{-1}$. Vật liệu có $\\mu$ càng lớn thì hấp thụ tia X càng mạnh.',
        },
        {
          type: 'p',
          text: 'Bề dày làm cường độ giảm một nửa là $d_{1/2} = \\dfrac{\\ln 2}{\\mu}$; cứ qua thêm một bề dày như vậy cường độ lại giảm một nửa. Hệ số $\\mu$ của xương lớn hơn của mô mềm, của chì lớn hơn rất nhiều; $\\mu$ của mọi vật liệu đều giảm khi tia X cứng hơn.',
        },
        {
          type: 'table',
          caption: 'Hệ số suy giảm gần đúng với chùm tia X của ống khoảng 150 kV',
          head: ['Vật liệu', '$\\mu$ ($\\text{m}^{-1}$)', '$d_{1/2}$'],
          rows: [
            ['Mô mềm', '$20$', 'khoảng $3{,}5$ cm'],
            ['Xương', '$60$', 'khoảng $1{,}2$ cm'],
            ['Chì', '$5\\,700$', 'khoảng $0{,}12$ mm'],
          ],
        },
        {
          type: 'p',
          text: 'Vì các bộ phận cơ thể làm suy giảm tia X khác nhau, tấm phim đặt sau cơ thể bị làm đen nhiều ít khác nhau: chỗ tia X chiếu thẳng vào phim đen nhất, chỗ sau mô mềm xám, chỗ sau xương sáng nhất. Đó là cơ sở của chụp X-quang (Bài 6).',
        },
      ],
    },
    {
      heading: 'Tính chất, ứng dụng và an toàn',
      blocks: [
        {
          type: 'list',
          items: [
            'Khả năng đâm xuyên: xuyên qua giấy, vải, gỗ, da thịt; tia X có bước sóng càng ngắn đâm xuyên càng mạnh; lớp chì vài milimét cản được tia X.',
            'Làm đen kính ảnh, nên dùng để chụp ảnh X-quang.',
            'Làm phát quang một số chất, nên dùng làm màn quan sát khi chiếu điện.',
            'Làm ion hoá không khí.',
            'Có tác dụng sinh lí: huỷ diệt tế bào, nên dùng để chữa ung thư nông.',
          ],
        },
        {
          type: 'p',
          text: 'Ứng dụng: y học (chụp X-quang, chụp cắt lớp, xạ trị ung thư), công nghiệp (phát hiện khuyết tật, tạp chất trong vật đúc), thiên văn học (nghiên cứu tia X do các thiên thể rất nóng phát ra), kiểm tra an ninh (soi hành lí ở sân bay).',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Tác hại và an toàn',
          text: 'Chiếu tia X quá nhiều hoặc quá mạnh làm tổn thương da, gây đục thuỷ tinh thể, huỷ hoại mạch máu nhỏ, ảnh hưởng đến tim, tuỷ xương, niêm mạc dạ dày, cơ quan sinh dục và có thể gây ung thư. Phòng chụp X-quang có cửa bọc chì và tường trát vữa barit; nhân viên mặc áo chì, đứng sau tấm chắn; chỉ chụp khi bác sĩ chỉ định, với thời gian chiếu ngắn nhất có thể; người không có nhiệm vụ không đứng gần cửa phòng chụp.',
        },
      ],
    },
    {
      heading: 'Dự án: Tia X quanh em và an toàn bức xạ',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: tìm hiểu các ứng dụng của tia X trong đời sống và cách một cơ sở y tế bảo vệ con người khỏi tia X. Phương tiện: điện thoại hoặc máy tính để tra cứu, chụp ảnh (khi được phép), giấy A0 hoặc bản trình chiếu.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chia nhóm, mỗi nhóm tìm hiểu một lĩnh vực ứng dụng tia X: y học, công nghiệp, thiên văn học, kiểm tra an ninh; ghi rõ tính chất nào của tia X được dùng.',
            'Tìm hình ảnh cửa phòng chụp X-quang ở bệnh viện: chỉ ra biển cảnh báo bức xạ, vật liệu làm cửa và tường, giải thích vì sao.',
            'Dùng biểu thức $I = I_0e^{-\\mu d}$ với $\\mu_{chì} \\approx 5\\,700\\ \\text{m}^{-1}$, tính phần trăm tia X còn lại sau lớp chì dày $0{,}5$ mm và $2$ mm.',
            'Lập bảng "nên làm" và "không nên làm" khi đi chụp X-quang hoặc chờ người thân chụp X-quang.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Mỗi nhóm trình bày tối đa 5 phút: ứng dụng đã tìm hiểu, ảnh và giải thích về phòng chụp, kết quả tính toán và bảng quy tắc an toàn.',
        },
      ],
    },
  ],
  explore: {
    title: 'Ống tia X ảo',
    instruction:
      'Thay đổi hiệu điện thế giữa anot và catot, dòng điện trong ống và bộ lọc. Quan sát bước sóng ngắn nhất và hình dạng phổ tia X, cùng phần chùm tia đi qua được mô mềm, xương và chì.',
  },
  examples: [
    {
      problem:
        'Hiệu điện thế giữa anot và catot của một ống Cu-lít-giơ là $25$ kV. Bỏ qua động năng ban đầu của electron. Tính động năng và tốc độ của electron khi đập vào anot.',
      steps: [
        '$W_đ = eU = 1{,}6 \\cdot 10^{-19} \\cdot 25 \\cdot 10^3 = 4 \\cdot 10^{-15}$ J.',
        'Từ $\\dfrac{1}{2}mv^2 = W_đ$: $v = \\sqrt{\\dfrac{2W_đ}{m}} = \\sqrt{\\dfrac{2 \\cdot 4 \\cdot 10^{-15}}{9{,}1 \\cdot 10^{-31}}} \\approx 9{,}38 \\cdot 10^7$ m/s.',
      ],
      answer: '$W_đ = 4 \\cdot 10^{-15}$ J, $v \\approx 9{,}38 \\cdot 10^7$ m/s.',
    },
    {
      problem:
        'Một chùm tia X đi qua cẳng tay theo hai đường: đường thứ nhất qua $10$ cm mô mềm, đường thứ hai qua $8$ cm mô mềm và $2$ cm xương. Lấy $\\mu_{mô} = 20\\ \\text{m}^{-1}$, $\\mu_{xương} = 60\\ \\text{m}^{-1}$. Tính tỉ lệ cường độ tia X còn lại trên mỗi đường.',
      steps: [
        'Đường thứ nhất: $\\dfrac{I}{I_0} = e^{-20 \\cdot 0{,}1} = e^{-2} \\approx 0{,}135$, tức khoảng $13{,}5\\%$.',
        'Đường thứ hai: qua từng lớp, cường độ nhân lần lượt với $e^{-\\mu d}$ của lớp đó: $\\dfrac{I}{I_0} = e^{-20 \\cdot 0{,}08} \\cdot e^{-60 \\cdot 0{,}02} = e^{-2{,}8} \\approx 0{,}061$, tức khoảng $6{,}1\\%$.',
        'Phim sau xương nhận ít tia X hơn hơn hai lần nên sáng hơn: xương hiện lên trắng trên nền mô xám.',
      ],
      answer: 'Khoảng $13{,}5\\%$ và $6{,}1\\%$.',
    },
    {
      problem:
        'Với chùm tia X ở ví dụ trên, chì có $\\mu \\approx 5\\,700\\ \\text{m}^{-1}$. Tính bề dày chì làm cường độ giảm một nửa, và phần trăm tia X còn lại sau tấm áo chì dày $0{,}5$ mm.',
      steps: [
        '$d_{1/2} = \\dfrac{\\ln 2}{\\mu} = \\dfrac{0{,}693}{5\\,700} \\approx 1{,}2 \\cdot 10^{-4}$ m $= 0{,}12$ mm.',
        '$\\dfrac{I}{I_0} = e^{-5\\,700 \\cdot 0{,}5 \\cdot 10^{-3}} = e^{-2{,}85} \\approx 0{,}058$.',
      ],
      answer: '$d_{1/2} \\approx 0{,}12$ mm; còn khoảng $5{,}8\\%$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Trong chân không, xét các tia: tia hồng ngoại, tia tử ngoại, tia X và tia đơn sắc lục. Tia có bước sóng nhỏ nhất là',
      options: ['tia X', 'tia tử ngoại', 'tia đơn sắc lục', 'tia hồng ngoại'],
      answer: 0,
      hints: ['Sắp xếp các bức xạ trong thang sóng điện từ theo bước sóng giảm dần.'],
      solution:
        'Bước sóng giảm dần: hồng ngoại, ánh sáng lục, tử ngoại, tia X ($10^{-11}$ m đến $10^{-8}$ m). Tia X có bước sóng nhỏ nhất.',
    },
    {
      type: 'choice',
      prompt: 'Khi nói về tia X, phát biểu nào sau đây là đúng?',
      options: [
        'Tia X có tác dụng sinh lí: nó huỷ diệt tế bào.',
        'Tia X có khả năng đâm xuyên kém hơn tia hồng ngoại.',
        'Tia X có tần số nhỏ hơn tần số của tia hồng ngoại.',
        'Tia X có bước sóng lớn hơn bước sóng của ánh sáng nhìn thấy.',
      ],
      answer: 0,
      hints: ['Tia X có bước sóng rất ngắn, tần số rất lớn. Nhớ lại ứng dụng chữa ung thư nông.'],
      solution:
        'Tia X có bước sóng ngắn hơn, tần số lớn hơn ánh sáng nhìn thấy và tia hồng ngoại, đâm xuyên mạnh. Tia X huỷ diệt tế bào nên được dùng chữa ung thư nông.',
    },
    {
      type: 'number',
      prompt:
        'Một ống Cu-lít-giơ đang hoạt động. Bỏ qua động năng ban đầu của các electron khi bứt ra khỏi catot. Khi hiệu điện thế giữa anot và catot là $U$ thì tốc độ của electron khi đập vào anot là $4{,}5 \\cdot 10^7$ m/s. Khi hiệu điện thế là $1{,}44U$ thì tốc độ đó là bao nhiêu (theo đơn vị $10^7$ m/s)?',
      answer: 5.4,
      tolerance: 0.01,
      hints: [
        '$\\dfrac{1}{2}mv^2 = eU$ nên $v$ tỉ lệ với $\\sqrt{U}$.',
        'Tốc độ mới bằng tốc độ cũ nhân với $\\sqrt{1{,}44}$.',
      ],
      solution:
        "$\\dfrac{v'}{v} = \\sqrt{\\dfrac{1{,}44U}{U}} = 1{,}2$, nên $v' = 1{,}2 \\cdot 4{,}5 \\cdot 10^7 = 5{,}4 \\cdot 10^7$ m/s.",
    },
    {
      type: 'number',
      prompt:
        'Hiệu điện thế giữa anot và catot của một ống tia X là $20$ kV. Động năng của electron khi đập vào anot là bao nhiêu (theo đơn vị $10^{-15}$ J)? Bỏ qua động năng ban đầu.',
      answer: 3.2,
      tolerance: 0.01,
      hints: ['$W_đ = eU$, nhớ đổi $20$ kV $= 2 \\cdot 10^4$ V.'],
      solution: '$W_đ = 1{,}6 \\cdot 10^{-19} \\cdot 2 \\cdot 10^4 = 3{,}2 \\cdot 10^{-15}$ J.',
    },
    {
      type: 'number',
      prompt:
        'Hiệu điện thế giữa anot và catot là $10$ kV. Tính tốc độ của electron khi đập vào anot (theo đơn vị $10^7$ m/s, làm tròn đến hai chữ số thập phân). Lấy $e = 1{,}6 \\cdot 10^{-19}$ C, $m = 9{,}1 \\cdot 10^{-31}$ kg.',
      answer: 5.93,
      tolerance: 0.01,
      hints: ['$v = \\sqrt{\\dfrac{2eU}{m}}$.'],
      solution:
        '$v = \\sqrt{\\dfrac{2 \\cdot 1{,}6 \\cdot 10^{-19} \\cdot 10^4}{9{,}1 \\cdot 10^{-31}}} = \\sqrt{3{,}516 \\cdot 10^{15}} \\approx 5{,}93 \\cdot 10^7$ m/s.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi cách điều chỉnh ống tia X với kết quả của nó.',
      left: [
        'Tăng dòng điện nung catot',
        'Tăng hiệu điện thế giữa anot và catot',
        'Đặt bộ lọc nhôm ở cửa sổ ống',
      ],
      right: [
        'Nhiều electron hơn, chùm tia X mạnh hơn nhưng độ cứng không đổi',
        'Tia X có bước sóng ngắn hơn, đâm xuyên mạnh hơn',
        'Phần tia X mềm bị hấp thụ, chùm còn lại cứng hơn',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Dòng nung quyết định số electron; hiệu điện thế quyết định động năng mỗi electron.'],
      solution:
        'Dòng nung catot tăng thì số electron tăng, cường độ chùm tia tăng. Hiệu điện thế tăng thì động năng electron tăng, tia X có bước sóng ngắn hơn (cứng hơn). Bộ lọc hấp thụ tia X mềm (bước sóng dài).',
    },
    {
      type: 'number',
      prompt:
        'Một chùm tia X đi qua lớp mô dày $5$ cm có hệ số suy giảm $\\mu = 20\\ \\text{m}^{-1}$. Cường độ còn lại bằng bao nhiêu phần trăm cường độ ban đầu?',
      answer: 36.8,
      tolerance: 0.1,
      unit: '%',
      hints: ['$\\dfrac{I}{I_0} = e^{-\\mu d}$ với $d = 0{,}05$ m.'],
      solution: '$\\dfrac{I}{I_0} = e^{-20 \\cdot 0{,}05} = e^{-1} \\approx 0{,}368 = 36{,}8\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Một vật liệu có hệ số suy giảm $\\mu = 35\\ \\text{m}^{-1}$ đối với một chùm tia X. Bề dày vật liệu làm cường độ chùm tia giảm một nửa là bao nhiêu xentimét?',
      answer: 1.98,
      tolerance: 0.01,
      unit: 'cm',
      hints: ['Giải $e^{-\\mu d} = \\dfrac{1}{2}$.'],
      solution:
        '$d_{1/2} = \\dfrac{\\ln 2}{\\mu} = \\dfrac{0{,}693}{35} \\approx 0{,}0198$ m $\\approx 1{,}98$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Một tấm chắn có bề dày gấp $3$ lần bề dày làm giảm một nửa cường độ tia X. Sau tấm chắn, cường độ tia X còn bao nhiêu phần trăm?',
      answer: 12.5,
      tolerance: 0.01,
      unit: '%',
      hints: ['Mỗi bề dày "một nửa" làm cường độ nhân với $\\dfrac{1}{2}$.'],
      solution: '$\\dfrac{I}{I_0} = \\left(\\dfrac{1}{2}\\right)^3 = \\dfrac{1}{8} = 12{,}5\\%$.',
    },
    {
      type: 'choice',
      prompt:
        'Vì sao đối catot của ống Cu-lít-giơ phải làm bằng kim loại có nhiệt độ nóng chảy cao?',
      options: [
        'Phần lớn năng lượng của chùm electron biến thành nhiệt làm nóng đối catot',
        'Để electron bật ngược trở lại catot',
        'Để tia X phát ra có bước sóng dài hơn',
        'Để ống không cần hút chân không',
      ],
      answer: 0,
      hints: ['Chỉ khoảng $1\\%$ năng lượng của chùm electron chuyển thành tia X.'],
      solution:
        'Chỉ một phần rất nhỏ năng lượng electron chuyển thành tia X, phần còn lại làm nóng đối catot. Đối catot phải chịu được nhiệt độ cao, và còn được làm nguội bằng nước.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các tính chất của tia X.',
      options: [
        'Có khả năng đâm xuyên',
        'Làm đen kính ảnh',
        'Làm phát quang một số chất',
        'Làm ion hoá không khí',
        'Bị lệch hướng khi đi qua điện trường',
        'Mắt người nhìn thấy được',
      ],
      answers: [0, 1, 2, 3],
      hints: ['Tia X là sóng điện từ, không mang điện, bước sóng nằm ngoài vùng nhìn thấy.'],
      solution:
        'Tia X đâm xuyên, làm đen kính ảnh, làm phát quang một số chất, ion hoá không khí và huỷ diệt tế bào. Tia X không mang điện nên không bị lệch trong điện trường, và mắt không nhìn thấy được.',
    },
    {
      type: 'multi',
      prompt: 'Những việc nào giúp giữ an toàn khi tiếp xúc với tia X?',
      options: [
        'Nhân viên mặc áo chì, đứng sau tấm chắn khi chụp',
        'Chỉ chụp X-quang khi có chỉ định của bác sĩ',
        'Làm cửa phòng chụp bọc chì, tường trát vữa barit',
        'Người nhà đứng sát cửa phòng chụp để tiện theo dõi',
        'Chụp nhiều lần liên tiếp cho ảnh rõ hơn',
      ],
      answers: [0, 1, 2],
      hints: ['Giảm liều chiếu: chắn tia, giữ khoảng cách, giảm thời gian chiếu.'],
      solution:
        'Chì và vữa barit hấp thụ mạnh tia X; chỉ chụp khi cần thiết để giảm liều. Đứng sát cửa phòng chụp hay chụp nhiều lần đều làm tăng liều chiếu không cần thiết.',
    },
  ],
  takeaways: [
    'Tia X là sóng điện từ có bước sóng từ $10^{-11}$ m đến $10^{-8}$ m, tạo ra khi electron có động năng lớn đập vào đối catot có nguyên tử lượng lớn.',
    'Trong ống Cu-lít-giơ, electron đến anot có động năng $W_đ = \\dfrac{1}{2}mv^2 = eU$.',
    'Tăng dòng nung catot: chùm tia mạnh hơn; tăng $U$: tia X cứng hơn, đâm xuyên mạnh hơn; bộ lọc hấp thụ tia X mềm.',
    'Cường độ tia X giảm theo $I = I_0e^{-\\mu d}$; xương hấp thụ mạnh hơn mô mềm, chì hấp thụ rất mạnh.',
    'Tia X có nhiều ứng dụng nhưng có hại cho cơ thể: phải chắn bằng chì, giảm thời gian chiếu và chỉ chụp khi cần.',
  ],
};
