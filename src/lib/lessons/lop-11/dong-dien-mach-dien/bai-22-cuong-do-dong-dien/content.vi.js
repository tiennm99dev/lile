/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Dòng điện là dòng chuyển dời có hướng của các hạt mang điện. Cường độ dòng điện I = Δq/Δt đo bằng điện lượng chuyển qua tiết diện thẳng của vật dẫn trong một đơn vị thời gian, đơn vị ampe (A); chiều dòng điện quy ước là chiều dịch chuyển có hướng của các điện tích dương. Trong dây kim loại I = Snve, với v là tốc độ dịch chuyển có hướng (tốc độ trôi) của electron, rất nhỏ, cỡ phần mười milimét mỗi giây.',
  intro:
    'Bật công tắc là đèn ở cuối phòng sáng ngay lập tức. Thế nhưng các electron trong dây đồng chỉ nhích đi chừng một phần mười milimét mỗi giây, chậm hơn cả một con ốc sên. Vậy dòng điện “mạnh” hay “yếu” được đo bằng gì, và vì sao đèn vẫn sáng tức thì?',
  objectives: [
    'Nêu được dòng điện là dòng chuyển dời có hướng của các hạt mang điện và chiều quy ước của dòng điện.',
    'Định nghĩa được cường độ dòng điện $I = \\dfrac{\\Delta q}{\\Delta t}$ và đơn vị ampe; vận dụng được $q = It$ cho dòng điện không đổi.',
    'Rút ra và vận dụng được biểu thức $I = Snve$ liên hệ cường độ dòng điện với mật độ và tốc độ trôi của hạt mang điện.',
  ],
  sections: [
    {
      heading: 'Dòng điện và chiều dòng điện',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Dòng điện',
          text: 'Dòng điện là dòng chuyển dời có hướng của các hạt mang điện.',
        },
        {
          type: 'p',
          text: 'Hạt mang điện (hạt tải điện) trong kim loại là các electron tự do; trong dung dịch điện phân là các ion dương và ion âm. Khi chưa có điện trường, các electron tự do chuyển động nhiệt hỗn loạn theo mọi hướng nên không có dòng điện. Khi đặt hiệu điện thế vào hai đầu dây, điện trường làm chúng có thêm một chuyển động có hướng, gọi là sự trôi, và trong dây có dòng điện.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chiều dòng điện',
          text: 'Chiều dòng điện được quy ước là chiều dịch chuyển có hướng của các điện tích dương. Trong dây kim loại, electron mang điện âm nên chuyển động ngược chiều dòng điện: ở mạch ngoài, dòng điện đi từ cực dương sang cực âm của nguồn, còn electron đi từ cực âm sang cực dương.',
        },
      ],
    },
    {
      heading: 'Cường độ dòng điện',
      blocks: [
        {
          type: 'p',
          text: 'Dòng điện càng mạnh thì trong cùng một khoảng thời gian càng có nhiều điện tích đi qua một tiết diện thẳng của dây. Gọi $\\Delta q$ là điện lượng chuyển qua tiết diện thẳng trong khoảng thời gian $\\Delta t$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Cường độ dòng điện',
          text: 'Cường độ dòng điện đặc trưng cho tác dụng mạnh, yếu của dòng điện, được xác định bằng điện lượng chuyển qua tiết diện thẳng của vật dẫn trong một đơn vị thời gian: $$I = \\dfrac{\\Delta q}{\\Delta t}.$$',
        },
        {
          type: 'list',
          items: [
            'Đơn vị của cường độ dòng điện là ampe (A), một trong bảy đơn vị cơ bản của hệ SI. Các ước thường dùng: $1$ mA $= 10^{-3}$ A, $1$ µA $= 10^{-6}$ A.',
            'Đơn vị điện lượng culông được định nghĩa theo ampe: $1$ C $= 1$ A·s, là điện lượng do dòng điện $1$ A chuyển qua tiết diện thẳng trong $1$ s.',
            'Dòng điện có chiều và cường độ không đổi theo thời gian gọi là dòng điện không đổi. Với dòng điện không đổi: $I = \\dfrac{q}{t}$, hay $q = It$.',
            'Cường độ dòng điện được đo bằng ampe kế, mắc nối tiếp với đoạn mạch cần đo, sao cho dòng điện đi vào chốt dương và đi ra chốt âm.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đếm electron',
          text: 'Mỗi electron mang điện tích có độ lớn $e = 1{,}6 \\cdot 10^{-19}$ C. Điện lượng $\\Delta q$ ứng với $N = \\dfrac{\\Delta q}{e}$ electron đi qua tiết diện. Dòng điện $1$ A ứng với khoảng $6{,}25 \\cdot 10^{18}$ electron đi qua tiết diện mỗi giây.',
        },
      ],
    },
    {
      heading: 'Cường độ dòng điện và tốc độ trôi của electron',
      blocks: [
        {
          type: 'p',
          text: 'Xét một đoạn dây kim loại có tiết diện $S$, trong đó mỗi mét khối có $n$ electron tự do (mật độ hạt mang điện), mỗi electron có điện tích độ lớn $e$ và trôi với tốc độ $v$.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Trong thời gian $\\Delta t$, mỗi electron trôi được quãng đường $v\\Delta t$. Các electron đi qua tiết diện $S$ trong thời gian đó là những electron nằm trong khối trụ có thể tích $Sv\\Delta t$ ngay phía trước tiết diện.',
            'Số electron đó là $N = nSv\\Delta t$, mang điện lượng $\\Delta q = Ne = nSve\\Delta t$.',
            'Chia cho $\\Delta t$ ta được cường độ dòng điện.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Liên hệ giữa I với mật độ và tốc độ của hạt mang điện',
          text: '$$I = Snve$$ trong đó $S$ là tiết diện thẳng của dây (m²), $n$ là mật độ hạt mang điện (số hạt trong $1$ m³), $v$ là tốc độ dịch chuyển có hướng (tốc độ trôi) của hạt (m/s), $e$ là độ lớn điện tích của mỗi hạt (C).',
        },
        {
          type: 'p',
          text: 'Với đồng, $n \\approx 8{,}5 \\cdot 10^{28}$ m$^{-3}$. Một dây đồng tiết diện $1$ mm² có dòng điện $1$ A chạy qua thì $v = \\dfrac{I}{Sne} \\approx 7{,}4 \\cdot 10^{-5}$ m/s, chưa tới một phần mười milimét mỗi giây.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Vì sao đèn sáng ngay khi bật công tắc?',
          text: 'Tốc độ trôi của electron rất nhỏ, nhưng điện trường được thiết lập dọc theo cả dây dẫn gần như tức thời (với tốc độ cỡ tốc độ ánh sáng). Vì vậy electron ở mọi chỗ trên dây, kể cả trong dây tóc đèn, đều bắt đầu trôi gần như cùng một lúc, không cần chờ electron từ công tắc đi tới đèn.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đếm điện tích qua tiết diện',
    instruction:
      'Các chấm xanh là electron trôi trong dây; mỗi chấm đại diện cho điện lượng $0{,}1$ C. Đổi mật độ hạt, tiết diện và tốc độ trôi, rồi bấm “Đếm trong 2 s” để đếm số hạt đi qua tiết diện. Tính $I = \\dfrac{\\Delta q}{\\Delta t}$ và so sánh với $I = Snve$.',
  },
  examples: [
    {
      problem:
        'Một dòng điện không đổi có cường độ $2$ A chạy qua một dây dẫn. Tính điện lượng và số electron chuyển qua tiết diện thẳng của dây trong $10$ s.',
      steps: [
        'Dòng điện không đổi nên điện lượng $q = It = 2 \\cdot 10 = 20$ C.',
        'Mỗi electron có điện tích độ lớn $e = 1{,}6 \\cdot 10^{-19}$ C.',
        'Số electron: $N = \\dfrac{q}{e} = \\dfrac{20}{1{,}6 \\cdot 10^{-19}} = 1{,}25 \\cdot 10^{20}$.',
      ],
      answer: '$q = 20$ C; $N = 1{,}25 \\cdot 10^{20}$ electron.',
    },
    {
      problem:
        'Một dây đồng có tiết diện $2$ mm², mang dòng điện $3{,}4$ A. Mật độ electron tự do trong đồng là $8{,}5 \\cdot 10^{28}$ m$^{-3}$. Tính tốc độ trôi của electron và thời gian một electron trôi hết $1$ m dây.',
      steps: [
        'Đổi đơn vị: $S = 2$ mm² $= 2 \\cdot 10^{-6}$ m².',
        'Từ $I = Snve$: $v = \\dfrac{I}{Sne} = \\dfrac{3{,}4}{2 \\cdot 10^{-6} \\cdot 8{,}5 \\cdot 10^{28} \\cdot 1{,}6 \\cdot 10^{-19}} = \\dfrac{3{,}4}{2{,}72 \\cdot 10^{4}} = 1{,}25 \\cdot 10^{-4}$ m/s.',
        'Thời gian trôi hết $1$ m: $t = \\dfrac{1}{1{,}25 \\cdot 10^{-4}} = 8\\,000$ s, khoảng $2{,}2$ giờ.',
      ],
      answer: '$v = 1{,}25 \\cdot 10^{-4}$ m/s $= 0{,}125$ mm/s; $t = 8\\,000$ s.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Dòng điện là',
      options: [
        'dòng chuyển dời có hướng của các hạt mang điện',
        'dòng chuyển động hỗn loạn của các electron tự do',
        'dòng chuyển dời của các nguyên tử trong vật dẫn',
        'dòng chuyển động của các ion dương trong kim loại',
      ],
      answer: 0,
      hints: ['Chuyển động nhiệt hỗn loạn có tạo ra dòng điện không?'],
      solution:
        'Dòng điện là dòng chuyển dời có hướng của các hạt mang điện. Chuyển động nhiệt hỗn loạn không có hướng chung nên không tạo ra dòng điện; trong kim loại hạt mang điện là electron tự do, không phải ion dương.',
    },
    {
      type: 'number',
      prompt:
        'Điện lượng $15$ C chuyển qua tiết diện thẳng của một dây dẫn trong $30$ s. Tính cường độ dòng điện (theo A).',
      answer: 0.5,
      unit: 'A',
      tolerance: 0.001,
      hints: ['Dùng $I = \\dfrac{\\Delta q}{\\Delta t}$.'],
      solution: '$I = \\dfrac{\\Delta q}{\\Delta t} = \\dfrac{15}{30} = 0{,}5$ A.',
    },
    {
      type: 'number',
      prompt:
        'Dòng điện không đổi $0{,}8$ A chạy qua một bóng đèn trong $1$ phút. Số electron chuyển qua tiết diện thẳng của dây tóc là $N = x \\cdot 10^{20}$. Tìm $x$.',
      answer: 3,
      tolerance: 0.01,
      hints: [
        'Đổi $1$ phút $= 60$ s rồi tính điện lượng $q = It$.',
        'Số electron $N = \\dfrac{q}{e}$ với $e = 1{,}6 \\cdot 10^{-19}$ C.',
      ],
      solution:
        '$q = It = 0{,}8 \\cdot 60 = 48$ C; $N = \\dfrac{48}{1{,}6 \\cdot 10^{-19}} = 3 \\cdot 10^{20}$, nên $x = 3$.',
    },
    {
      type: 'choice',
      prompt: 'Trong một dây kim loại nối với nguồn điện, chiều dòng điện',
      options: [
        'ngược chiều chuyển động có hướng của các electron tự do',
        'cùng chiều chuyển động có hướng của các electron tự do',
        'đi từ cực âm sang cực dương của nguồn qua mạch ngoài',
        'thay đổi liên tục theo chuyển động nhiệt của electron',
      ],
      answer: 0,
      hints: ['Chiều dòng điện được quy ước theo điện tích dương; electron mang điện gì?'],
      solution:
        'Chiều dòng điện quy ước là chiều dịch chuyển có hướng của điện tích dương. Electron mang điện âm nên trôi ngược chiều dòng điện. Ở mạch ngoài, dòng điện đi từ cực dương sang cực âm.',
    },
    {
      type: 'number',
      prompt:
        'Một dây đồng tiết diện $1$ mm² có dòng điện $2$ A chạy qua. Mật độ electron tự do của đồng là $8{,}5 \\cdot 10^{28}$ m$^{-3}$. Tính tốc độ trôi của electron (theo mm/s, làm tròn đến hàng phần nghìn).',
      answer: 0.147,
      unit: 'mm/s',
      tolerance: 0.002,
      hints: [
        'Đổi $S = 1$ mm² $= 10^{-6}$ m².',
        'Từ $I = Snve$ suy ra $v = \\dfrac{I}{Sne}$, rồi đổi m/s sang mm/s.',
      ],
      solution:
        '$v = \\dfrac{2}{10^{-6} \\cdot 8{,}5 \\cdot 10^{28} \\cdot 1{,}6 \\cdot 10^{-19}} = \\dfrac{2}{1{,}36 \\cdot 10^{4}} \\approx 1{,}47 \\cdot 10^{-4}$ m/s $\\approx 0{,}147$ mm/s.',
    },
    {
      type: 'number',
      prompt:
        'Viên pin của một điện thoại ghi dung lượng $3\\,000$ mAh, nghĩa là pin có thể cung cấp dòng điện $3\\,000$ mA trong $1$ giờ. Tính điện lượng tương ứng (theo C).',
      answer: 10800,
      unit: 'C',
      tolerance: 1,
      hints: ['Đổi $3\\,000$ mA $= 3$ A và $1$ h $= 3\\,600$ s, rồi dùng $q = It$.'],
      solution: '$q = It = 3 \\cdot 3\\,600 = 10\\,800$ C.',
    },
    {
      type: 'choice',
      prompt:
        'Tốc độ trôi của electron trong dây dẫn chỉ cỡ $0{,}1$ mm/s, nhưng đèn sáng gần như ngay khi đóng công tắc vì',
      options: [
        'điện trường được thiết lập dọc theo dây gần như tức thời, làm electron ở mọi chỗ trên dây cùng bắt đầu trôi',
        'electron chuyển động nhiệt rất nhanh nên đi từ công tắc tới đèn ngay lập tức',
        'trong dây tóc đèn electron trôi nhanh như ánh sáng',
        'dòng điện là dòng các photon đi trong dây',
      ],
      answer: 0,
      hints: ['Electron đi qua dây tóc có phải là electron xuất phát từ công tắc không?'],
      solution:
        'Electron có sẵn ở mọi chỗ trong dây. Khi đóng mạch, điện trường lan dọc dây gần với tốc độ ánh sáng nên các electron trong dây tóc bắt đầu trôi gần như ngay lập tức; không cần electron ở công tắc đi tới đèn.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các phát biểu đúng.',
      options: [
        '$1$ C $= 1$ A·s',
        'Ampe là một đơn vị cơ bản của hệ SI',
        '$1$ mA $= 10^{-3}$ A',
        '$1$ A $= 1$ C·s',
        'Ampe kế được mắc song song với đoạn mạch cần đo cường độ dòng điện',
      ],
      answers: [0, 1, 2],
      hints: ['Từ $q = It$, đơn vị của $q$ là đơn vị của $I$ nhân với đơn vị của $t$.'],
      solution:
        '$q = It$ nên $1$ C $= 1$ A·s, tức $1$ A $= 1$ C/s (không phải C·s). Ampe là đơn vị cơ bản SI, $1$ mA $= 10^{-3}$ A. Ampe kế phải mắc nối tiếp với đoạn mạch cần đo.',
    },
    {
      type: 'number',
      prompt:
        'Hai dây đồng cùng mang dòng điện $2$ A; dây thứ nhất có tiết diện $1$ mm², dây thứ hai có tiết diện $4$ mm². Tốc độ trôi của electron trong dây thứ nhất gấp bao nhiêu lần trong dây thứ hai?',
      answer: 4,
      tolerance: 0.001,
      hints: ['Cùng $I$, cùng $n$ và $e$: $v = \\dfrac{I}{Sne}$ tỉ lệ thế nào với $S$?'],
      solution:
        '$v = \\dfrac{I}{Sne}$ tỉ lệ nghịch với $S$. Tiết diện dây thứ nhất bằng $\\dfrac{1}{4}$ dây thứ hai nên tốc độ trôi gấp $4$ lần.',
    },
  ],
  takeaways: [
    'Dòng điện là dòng chuyển dời có hướng của các hạt mang điện; chiều quy ước là chiều dịch chuyển của điện tích dương, ngược chiều electron.',
    'Cường độ dòng điện $I = \\dfrac{\\Delta q}{\\Delta t}$, đơn vị ampe (A); dòng điện không đổi có $q = It$, $1$ C $= 1$ A·s.',
    'Số electron ứng với điện lượng $q$: $N = \\dfrac{q}{e}$, $e = 1{,}6 \\cdot 10^{-19}$ C.',
    '$I = Snve$: cường độ dòng điện tỉ lệ với tiết diện, mật độ hạt mang điện và tốc độ trôi; tốc độ trôi của electron trong kim loại rất nhỏ.',
  ],
};
