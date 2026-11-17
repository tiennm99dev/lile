/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ánh sáng vừa có tính chất sóng vừa có tính chất hạt; theo de Broglie, mọi hạt chuyển động có động lượng p cũng có tính chất sóng với bước sóng λ = h/p, và hiện tượng nhiễu xạ, giao thoa của electron là bằng chứng cho tính chất sóng của hạt.',
  intro:
    'Giao thoa và nhiễu xạ cho thấy ánh sáng là sóng, còn hiện tượng quang điện cho thấy ánh sáng gồm các hạt photon. Năm 1924, Louis de Broglie đặt câu hỏi ngược lại: nếu ánh sáng là sóng mà lại có tính chất hạt, thì các hạt vật chất như electron có thể có tính chất sóng không?',
  objectives: [
    'Nêu được ánh sáng có lưỡng tính sóng hạt và các hiện tượng thể hiện mỗi tính chất.',
    'Phát biểu được giả thuyết de Broglie; tính được bước sóng de Broglie $\\lambda = \\dfrac{h}{p} = \\dfrac{h}{mv}$.',
    'Mô tả và giải thích được hiện tượng nhiễu xạ electron như là bằng chứng cho tính chất sóng của hạt.',
    'Giải thích được vì sao không quan sát được tính chất sóng của các vật thông thường.',
  ],
  sections: [
    {
      heading: 'Lưỡng tính sóng hạt của ánh sáng',
      blocks: [
        {
          type: 'list',
          items: [
            'Các hiện tượng giao thoa, nhiễu xạ ánh sáng chỉ giải thích được khi coi ánh sáng là sóng: ánh sáng có tính chất sóng.',
            'Hiện tượng quang điện chỉ giải thích được khi coi ánh sáng gồm các photon mang năng lượng $\\varepsilon = hf$: ánh sáng có tính chất hạt.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Lưỡng tính sóng hạt',
          text: 'Ánh sáng vừa có tính chất sóng, vừa có tính chất hạt. Ta nói ánh sáng có lưỡng tính sóng hạt. Trong mỗi hiện tượng, ánh sáng thường thể hiện rõ một trong hai tính chất: bức xạ có bước sóng càng ngắn (photon có năng lượng càng lớn) thì tính chất hạt càng rõ (đâm xuyên, làm phát quang, ion hoá, gây hiện tượng quang điện); bước sóng càng dài thì tính chất sóng càng rõ (dễ quan sát giao thoa, nhiễu xạ).',
        },
        {
          type: 'p',
          text: 'Photon không có khối lượng nghỉ nhưng mang động lượng. Photon của ánh sáng có bước sóng $\\lambda$ có động lượng $$p = \\dfrac{hf}{c} = \\dfrac{h}{\\lambda}.$$',
        },
      ],
    },
    {
      heading: 'Giả thuyết de Broglie',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Sóng de Broglie',
          text: 'Lưỡng tính sóng hạt là tính chất chung của mọi vật chất. Mỗi hạt chuyển động có động lượng $p = mv$ đều gắn với một sóng có bước sóng $$\\lambda = \\dfrac{h}{p} = \\dfrac{h}{mv},$$ gọi là bước sóng de Broglie của hạt, trong đó $h = 6{,}625 \\cdot 10^{-34}$ J·s là hằng số Planck.',
        },
        {
          type: 'p',
          text: 'Với cùng tốc độ, vật có khối lượng càng lớn thì bước sóng de Broglie càng nhỏ. Electron có khối lượng rất nhỏ ($9{,}1 \\cdot 10^{-31}$ kg) nên bước sóng của nó đủ lớn để quan sát được tính chất sóng. Một electron được tăng tốc từ trạng thái nghỉ bởi hiệu điện thế $U$ có $\\dfrac{1}{2}mv^2 = eU$, nên:',
        },
        { type: 'tex', tex: 'p = \\sqrt{2meU}, \\qquad \\lambda = \\dfrac{h}{\\sqrt{2meU}}' },
        {
          type: 'p',
          text: 'Với $U = 100$ V, $\\lambda \\approx 1{,}23 \\cdot 10^{-10}$ m, cỡ khoảng cách giữa các nguyên tử trong tinh thể và cỡ bước sóng của tia X.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Vì sao không thấy tính chất sóng của các vật quanh ta?',
          text: 'Một con báo khối lượng $50$ kg chạy với tốc độ $72$ km/h có bước sóng de Broglie chỉ khoảng $6{,}6 \\cdot 10^{-37}$ m, nhỏ hơn kích thước hạt nhân rất nhiều lần. Không có khe hay vật cản nào đủ nhỏ để thấy sóng này nhiễu xạ, nên với các vật vĩ mô ta chỉ thấy tính chất hạt.',
        },
      ],
    },
    {
      heading: 'Nhiễu xạ và giao thoa electron',
      blocks: [
        {
          type: 'p',
          text: 'Năm 1927, Davisson và Germer chiếu chùm electron vào một tinh thể niken và thấy các electron bị tán xạ mạnh theo những hướng xác định, giống như tia X bị nhiễu xạ trên tinh thể. Cùng thời gian đó, G. P. Thomson cho chùm electron đi qua một lá kim loại rất mỏng và thu được trên màn ảnh các vòng tròn đồng tâm sáng tối xen kẽ, giống hệt ảnh nhiễu xạ của tia X. Bước sóng tính từ ảnh nhiễu xạ đúng bằng bước sóng $\\dfrac{h}{p}$ của de Broglie.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Bằng chứng cho tính chất sóng của hạt',
          text: 'Hiện tượng nhiễu xạ electron chứng tỏ electron có tính chất sóng. Về sau, người ta cũng quan sát được nhiễu xạ của neutron, nguyên tử và cả phân tử, khẳng định giả thuyết de Broglie.',
        },
        {
          type: 'p',
          text: 'Trong thí nghiệm hai khe với electron, người ta bắn electron yếu đến mức mỗi lần chỉ có một electron đi qua. Mỗi electron tới màn tạo ra một chấm sáng ở một vị trí ngẫu nhiên, như một hạt. Nhưng khi rất nhiều electron đã tới, các chấm sáng dày đặc ở những dải cách đều và thưa ở giữa chúng: vân giao thoa hiện ra với khoảng vân $i = \\dfrac{\\lambda D}{a}$, như giao thoa của sóng có bước sóng de Broglie.',
        },
        {
          type: 'p',
          text: 'Ứng dụng: kính hiển vi electron dùng chùm electron thay cho ánh sáng. Bước sóng của electron nhỏ hơn bước sóng ánh sáng nhìn thấy hàng chục nghìn lần, nên kính hiển vi electron phân biệt được những chi tiết rất nhỏ, cỡ nanômét hoặc nhỏ hơn.',
        },
      ],
    },
    {
      heading: 'Dự án: Kính hiển vi electron và bước sóng de Broglie',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: tìm hiểu vì sao kính hiển vi electron nhìn được những vật mà kính hiển vi quang học không nhìn được. Phương tiện: tài liệu tra cứu trên mạng hoặc thư viện, máy tính cầm tay, giấy A0 hoặc bản trình chiếu; nếu có, một bút laser và một khe hẹp (hoặc sợi tóc) để quan sát nhiễu xạ ánh sáng.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chiếu bút laser qua sợi tóc lên tường, quan sát vân nhiễu xạ của ánh sáng; chụp ảnh và mô tả.',
            'Tìm hiểu ảnh nhiễu xạ electron qua lá kim loại mỏng (thí nghiệm Thomson) và so sánh với ảnh nhiễu xạ tia X.',
            'Tính bước sóng de Broglie của electron được tăng tốc bởi $10$ kV và $100$ kV (bỏ qua hiệu ứng tương đối tính) và so sánh với bước sóng ánh sáng lục $550$ nm.',
            'Tìm ba ảnh chụp bằng kính hiển vi electron (virus, tinh thể, bề mặt vật liệu) và ghi kích thước chi tiết nhỏ nhất thấy được trong mỗi ảnh.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Mỗi nhóm trình bày tối đa 5 phút: ảnh vân nhiễu xạ ánh sáng, bảng so sánh bước sóng, các ảnh hiển vi electron và giải thích vì sao bước sóng càng nhỏ thì nhìn được chi tiết càng nhỏ.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bắn từng electron qua hai khe',
    instruction:
      'Bắn từng electron, rồi hàng trăm electron qua hai khe. Quan sát các chấm sáng ngẫu nhiên dần tạo thành vân giao thoa. Thay đổi hiệu điện thế tăng tốc để thấy bước sóng và khoảng vân thay đổi, và che một khe để so sánh.',
  },
  examples: [
    {
      problem:
        'Một chùm electron có tốc độ mỗi electron là $v = 25\\,000$ m/s. Xác định bước sóng de Broglie của mỗi electron. Lấy $m = 9{,}1 \\cdot 10^{-31}$ kg.',
      steps: [
        'Động lượng: $p = mv = 9{,}1 \\cdot 10^{-31} \\cdot 25\\,000 = 2{,}275 \\cdot 10^{-26}$ kg·m/s.',
        '$\\lambda = \\dfrac{h}{p} = \\dfrac{6{,}625 \\cdot 10^{-34}}{2{,}275 \\cdot 10^{-26}} \\approx 2{,}91 \\cdot 10^{-8}$ m.',
      ],
      answer: '$\\lambda \\approx 2{,}91 \\cdot 10^{-8}$ m.',
    },
    {
      problem:
        'Một con báo khối lượng $50$ kg chạy với tốc độ $72$ km/h. Xác định bước sóng de Broglie của con báo và so sánh với bước sóng của electron ở ví dụ trên.',
      steps: [
        'Đổi $72$ km/h $= 20$ m/s.',
        '$\\lambda = \\dfrac{h}{mv} = \\dfrac{6{,}625 \\cdot 10^{-34}}{50 \\cdot 20} = 6{,}625 \\cdot 10^{-37}$ m.',
        'Tỉ số: $\\dfrac{2{,}91 \\cdot 10^{-8}}{6{,}625 \\cdot 10^{-37}} \\approx 4{,}4 \\cdot 10^{28}$: bước sóng của con báo nhỏ hơn rất nhiều, không thể quan sát được.',
      ],
      answer:
        '$\\lambda \\approx 6{,}6 \\cdot 10^{-37}$ m, nhỏ hơn bước sóng của electron khoảng $10^{28}$ lần.',
    },
    {
      problem:
        'Electron được tăng tốc từ trạng thái nghỉ bởi hiệu điện thế $150$ V. Tính bước sóng de Broglie của electron. Lấy $e = 1{,}6 \\cdot 10^{-19}$ C.',
      steps: [
        '$p = \\sqrt{2meU} = \\sqrt{2 \\cdot 9{,}1 \\cdot 10^{-31} \\cdot 1{,}6 \\cdot 10^{-19} \\cdot 150} \\approx 6{,}61 \\cdot 10^{-24}$ kg·m/s.',
        '$\\lambda = \\dfrac{h}{p} = \\dfrac{6{,}625 \\cdot 10^{-34}}{6{,}61 \\cdot 10^{-24}} \\approx 1{,}0 \\cdot 10^{-10}$ m $= 0{,}1$ nm.',
        'Bước sóng này cỡ khoảng cách giữa các nguyên tử trong tinh thể, nên tinh thể đóng vai trò cách tử nhiễu xạ cho electron.',
      ],
      answer: '$\\lambda \\approx 1{,}0 \\cdot 10^{-10}$ m.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Chọn tất cả các hiện tượng chứng tỏ ánh sáng có tính chất sóng.',
      options: ['Giao thoa ánh sáng', 'Nhiễu xạ ánh sáng', 'Hiện tượng quang điện'],
      answers: [0, 1],
      hints: ['Hiện tượng nào cần đến khái niệm photon mới giải thích được?'],
      solution:
        'Giao thoa và nhiễu xạ là hiện tượng đặc trưng của sóng. Hiện tượng quang điện thể hiện tính chất hạt của ánh sáng.',
    },
    {
      type: 'number',
      prompt:
        'Tính bước sóng de Broglie của một electron chuyển động với tốc độ $2 \\cdot 10^6$ m/s (theo đơn vị $10^{-10}$ m).',
      answer: 3.64,
      tolerance: 0.01,
      hints: ['$\\lambda = \\dfrac{h}{mv}$ với $m = 9{,}1 \\cdot 10^{-31}$ kg.'],
      solution:
        '$\\lambda = \\dfrac{6{,}625 \\cdot 10^{-34}}{9{,}1 \\cdot 10^{-31} \\cdot 2 \\cdot 10^6} \\approx 3{,}64 \\cdot 10^{-10}$ m.',
    },
    {
      type: 'number',
      prompt:
        'Một proton (khối lượng $1{,}67 \\cdot 10^{-27}$ kg) chuyển động với tốc độ $10^5$ m/s. Bước sóng de Broglie của nó là bao nhiêu (theo đơn vị $10^{-12}$ m)?',
      answer: 3.97,
      tolerance: 0.01,
      hints: ['Động lượng $p = mv$.'],
      solution:
        '$\\lambda = \\dfrac{6{,}625 \\cdot 10^{-34}}{1{,}67 \\cdot 10^{-27} \\cdot 10^5} \\approx 3{,}97 \\cdot 10^{-12}$ m.',
    },
    {
      type: 'number',
      prompt:
        'Một quả bóng khối lượng $50$ g bay với tốc độ $40$ m/s. Bước sóng de Broglie của quả bóng là bao nhiêu (theo đơn vị $10^{-34}$ m)?',
      answer: 3.31,
      tolerance: 0.01,
      hints: ['Đổi $50$ g $= 0{,}05$ kg.'],
      solution:
        '$\\lambda = \\dfrac{6{,}625 \\cdot 10^{-34}}{0{,}05 \\cdot 40} \\approx 3{,}31 \\cdot 10^{-34}$ m, quá nhỏ để quan sát.',
    },
    {
      type: 'number',
      prompt:
        'Electron được tăng tốc từ trạng thái nghỉ bởi hiệu điện thế $50$ V. Tính bước sóng de Broglie của electron (theo nm, làm tròn đến ba chữ số thập phân).',
      answer: 0.174,
      tolerance: 0.001,
      unit: 'nm',
      hints: ['$\\lambda = \\dfrac{h}{\\sqrt{2meU}}$.'],
      solution:
        '$\\lambda = \\dfrac{6{,}625 \\cdot 10^{-34}}{\\sqrt{2 \\cdot 9{,}1 \\cdot 10^{-31} \\cdot 1{,}6 \\cdot 10^{-19} \\cdot 50}} \\approx 1{,}736 \\cdot 10^{-10}$ m $\\approx 0{,}174$ nm.',
    },
    {
      type: 'choice',
      prompt:
        'Tăng hiệu điện thế tăng tốc electron lên $4$ lần (electron xuất phát từ trạng thái nghỉ). Bước sóng de Broglie của electron',
      options: ['giảm $2$ lần', 'giảm $4$ lần', 'tăng $2$ lần', 'không đổi'],
      answer: 0,
      hints: ['$\\lambda = \\dfrac{h}{\\sqrt{2meU}}$ tỉ lệ nghịch với $\\sqrt{U}$.'],
      solution:
        '$\\lambda \\sim \\dfrac{1}{\\sqrt{U}}$: $U$ tăng $4$ lần thì $\\sqrt{U}$ tăng $2$ lần, $\\lambda$ giảm $2$ lần.',
    },
    {
      type: 'choice',
      prompt: 'Hiện tượng nhiễu xạ electron qua lá kim loại mỏng là bằng chứng cho',
      options: [
        'tính chất sóng của hạt',
        'tính chất hạt của ánh sáng',
        'electron mang điện tích âm',
        'electron có khối lượng rất nhỏ',
      ],
      answer: 0,
      hints: ['Nhiễu xạ là hiện tượng đặc trưng của loại chuyển động nào?'],
      solution:
        'Nhiễu xạ là hiện tượng đặc trưng của sóng; electron cho ảnh nhiễu xạ giống tia X nên electron có tính chất sóng.',
    },
    {
      type: 'number',
      prompt:
        'Tính động lượng của một photon ánh sáng có bước sóng $0{,}6625$ μm (theo đơn vị $10^{-27}$ kg·m/s).',
      answer: 1,
      tolerance: 0.01,
      hints: ['$p = \\dfrac{h}{\\lambda}$.'],
      solution: '$p = \\dfrac{6{,}625 \\cdot 10^{-34}}{6{,}625 \\cdot 10^{-7}} = 10^{-27}$ kg·m/s.',
    },
    {
      type: 'number',
      prompt:
        'Electron phải có tốc độ bao nhiêu để bước sóng de Broglie của nó bằng $0{,}1$ nm (theo đơn vị $10^6$ m/s)?',
      answer: 7.28,
      tolerance: 0.01,
      hints: ['Từ $\\lambda = \\dfrac{h}{mv}$ suy ra $v = \\dfrac{h}{m\\lambda}$.'],
      solution:
        '$v = \\dfrac{6{,}625 \\cdot 10^{-34}}{9{,}1 \\cdot 10^{-31} \\cdot 10^{-10}} \\approx 7{,}28 \\cdot 10^6$ m/s.',
    },
    {
      type: 'choice',
      prompt:
        'Trong thí nghiệm hai khe, electron được bắn tới từng hạt một. Điều nào mô tả đúng kết quả trên màn?',
      options: [
        'Mỗi electron tạo một chấm sáng ở vị trí ngẫu nhiên; sau rất nhiều electron, các chấm tạo thành vân giao thoa',
        'Mỗi electron tạo ngay một hệ vân giao thoa mờ trên toàn màn',
        'Các electron chỉ tạo hai vệt sáng đối diện hai khe',
        'Không có electron nào tới màn vì mỗi electron chỉ đi qua được một khe',
      ],
      answer: 0,
      hints: [
        'Mỗi lần tới màn, electron thể hiện như hạt; quy luật phân bố của nhiều electron mới cho thấy tính chất sóng.',
      ],
      solution:
        'Mỗi electron đến màn tại một điểm như một hạt, vị trí ngẫu nhiên. Phân bố của rất nhiều electron tuân theo quy luật giao thoa của sóng de Broglie: các vân sáng tối xen kẽ hiện dần ra.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao không quan sát được tính chất sóng của một quả bóng đang bay?',
      options: [
        'Bước sóng de Broglie của quả bóng quá nhỏ so với mọi khe, vật cản có thể có',
        'Quả bóng không có động lượng',
        'Chỉ các hạt mang điện mới có tính chất sóng',
        'Bước sóng de Broglie của quả bóng quá lớn',
      ],
      answer: 0,
      hints: ['Ước lượng $\\lambda = \\dfrac{h}{mv}$ với $m$ cỡ $0{,}1$ kg, $v$ cỡ $10$ m/s.'],
      solution:
        'Khối lượng quả bóng lớn nên $\\lambda = \\dfrac{h}{mv}$ cỡ $10^{-34}$ m, nhỏ hơn kích thước hạt nhân rất nhiều; không có khe nào đủ hẹp để quan sát nhiễu xạ.',
    },
  ],
  takeaways: [
    'Ánh sáng có lưỡng tính sóng hạt: giao thoa, nhiễu xạ thể hiện tính chất sóng; hiện tượng quang điện thể hiện tính chất hạt.',
    'Photon có động lượng $p = \\dfrac{h}{\\lambda}$.',
    'Mọi hạt chuyển động có bước sóng de Broglie $\\lambda = \\dfrac{h}{p} = \\dfrac{h}{mv}$; electron tăng tốc bởi $U$: $\\lambda = \\dfrac{h}{\\sqrt{2meU}}$.',
    'Nhiễu xạ và giao thoa electron là bằng chứng cho tính chất sóng của hạt.',
    'Vật vĩ mô có bước sóng de Broglie quá nhỏ nên không quan sát được tính chất sóng.',
  ],
};
