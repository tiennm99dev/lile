/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Chụp X-quang ghi lại chùm tia X đã bị các bộ phận cơ thể hấp thụ khác nhau thành ảnh hai chiều; chụp cắt lớp (CT) quay ống tia X quanh người bệnh, đo ở nhiều góc rồi dùng máy tính dựng lại ảnh từng lát cắt không bị chồng lấn.',
  intro:
    'Bác sĩ nhìn tấm phim X-quang ngực thấy rõ xương sườn trắng trên nền phổi đen, nhưng với một khối u nhỏ trong não thì phim X-quang gần như bất lực. Khi đó người bệnh được chụp cắt lớp: nằm trên bàn trượt vào một vòng tròn lớn, ống tia X quay quanh đầu. Hai cách chụp này dựa trên nguyên lí nào, và vì sao chụp cắt lớp lại thấy được điều phim X-quang không thấy?',
  objectives: [
    'Nêu được nguyên lí chụp X-quang trong y học và một số ưu, nhược điểm của nó.',
    'Nêu được các biện pháp rút ngắn thời gian chụp, giảm liều chiếu, cải thiện độ sắc nét và độ tương phản của ảnh X-quang.',
    'Nêu được nguyên lí chụp cắt lớp; giải thích vì sao người bệnh có thể phải nín thở khi chụp và vì sao chụp não thì chụp cắt lớp thích hợp hơn.',
    'So sánh được chụp X-quang và chụp cắt lớp.',
  ],
  sections: [
    {
      heading: 'Chụp X-quang',
      blocks: [
        {
          type: 'p',
          text: 'Bộ phận phát tia X đặt phía trên vùng cần chụp; chùm tia X có cùng cường độ chiếu xuyên qua vùng đó tới tấm phim (hoặc tấm cảm biến) đặt phía sau. Các bộ phận khác nhau hấp thụ tia X khác nhau, nên sau khi đi qua chúng, cường độ chùm tia suy giảm khác nhau theo $I = I_0e^{-\\mu d}$ (Bài 5). Càng nhiều tia X tới được phim thì chỗ đó càng tối.',
        },
        {
          type: 'table',
          caption: 'Màu sắc các bộ phận trên ảnh X-quang',
          head: ['Bộ phận', 'Hấp thụ tia X', 'Trên ảnh'],
          rows: [
            ['Phần rỗng hoặc chứa khí (phổi, ruột chứa hơi)', 'Rất ít', 'Đen'],
            ['Mỡ, cơ, các cơ quan mềm', 'Vừa phải', 'Xám'],
            ['Mô đặc như xương', 'Nhiều', 'Trắng'],
          ],
        },
        {
          type: 'list',
          items: [
            'Ưu điểm: không xâm lấn, không đau; kĩ thuật đơn giản, chụp nhanh; liều bức xạ thấp hơn chụp cắt lớp; chi phí thấp; X-quang kĩ thuật số cho kết quả nhanh, dễ lưu trữ.',
            'Hạn chế: ảnh hai chiều, các bộ phận nằm trên cùng đường đi của tia X chồng lên nhau; ảnh không chi tiết bằng chụp cắt lớp, chụp cộng hưởng từ; mô mềm và các cơ quan thể hiện kém; tia X có hại nên phải hạn chế số lần chụp.',
          ],
        },
      ],
    },
    {
      heading: 'Cải thiện ảnh chụp X-quang',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Rút ngắn thời gian chụp và giảm liều chiếu',
          text: 'Thời gian chiếu chỉ cỡ vài giây hoặc ngắn hơn. Bộ phận tăng cường ảnh gồm màn huỳnh quang đầu vào (hấp thụ tia X, phát ra ánh sáng), catot quang (hấp thụ ánh sáng, phát ra electron), hệ hội tụ và tăng tốc electron, màn huỳnh quang đầu ra (phát ánh sáng có cường độ tỉ lệ với cường độ tia X tới). Nó làm giảm liều chiếu cho người bệnh khoảng $100$ đến $500$ lần. Tấm chứa chất phosphor đặt sát phim cũng vậy: mỗi phần tia X bị hấp thụ tạo ra hàng nghìn phần ánh sáng làm đen phim, nên chỉ cần chiếu tia X ít hơn hàng trăm lần.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cải thiện độ sắc nét',
          text: 'Ảnh rõ nét khi chùm tia X song song và hẹp: cho chùm electron hẹp đập vào đối catot để nguồn phát tia X nhỏ (như vật được chiếu bằng nguồn sáng nhỏ có bóng sắc nét hơn), và đặt tấm chống tán xạ gồm các lá chì xen nhôm trước phim: tia X đi thẳng xuyên qua nhôm tới phim, còn tia X bị tán xạ lệch hướng trong cơ thể bị chì hấp thụ, không làm nhoè ảnh.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cải thiện độ tương phản',
          text: 'Khi các bộ phận cạnh nhau hấp thụ tia X gần như nhau (ruột, dạ dày, mạch máu), người ta cho người bệnh uống hoặc tiêm chất cản quang chứa nguyên tố hấp thụ tia X mạnh như barium (Ba), iodine (I). Bộ phận chứa chất cản quang hiện lên sáng rõ trên ảnh. Chụp xương thì thường không cần, vì xương đã hấp thụ tia X mạnh hơn mô xung quanh nhiều.',
        },
      ],
    },
    {
      heading: 'Chụp cắt lớp (CT)',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Chụp cắt lớp',
          text: 'Chụp cắt lớp vi tính (CT, Computed Tomography) là kĩ thuật dùng tia X chiếu qua một bộ phận cơ thể từ nhiều góc khác nhau, rồi dùng máy tính xử lí để dựng lại ảnh từng lát cắt (hai chiều) hoặc ảnh ba chiều, trong đó các bộ phận không bị chồng lên nhau.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Người bệnh nằm trên bàn trượt đưa vào máy, sao cho vùng cần chụp nằm giữa ống phát tia X và hệ đầu dò.',
            'Ống phát tia X quay quanh người bệnh, phát chùm tia hình quạt; hệ đầu dò phía đối diện ghi lại cường độ chùm tia sau khi xuyên qua cơ thể ở mỗi góc.',
            'Từ loạt "ảnh X-quang" một chiều ở rất nhiều góc, máy tính tính ra hệ số suy giảm $\\mu$ ở từng điểm của lát cắt và hiển thị thành ảnh.',
          ],
        },
        {
          type: 'p',
          text: 'Mỗi số đo ở đầu dò chỉ cho biết tổng hấp thụ trên cả đường đi của tia: $\\ln\\dfrac{I_0}{I} = \\mu_1d_1 + \\mu_2d_2 + \\ldots$ Một góc chụp không đủ để biết từng $\\mu$; nhưng khi có các tổng theo rất nhiều phương khác nhau, máy tính giải ra được giá trị ở từng ô nhỏ của lát cắt.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Vì sao phải nín thở?',
          text: 'Một lần quét kéo dài vài giây. Nếu người bệnh thở, lồng ngực và các cơ quan chuyển động, số đo ở các góc không còn ứng với cùng một vị trí, ảnh dựng lại bị nhoè. Vì thế người bệnh thường được yêu cầu nín thở một thời gian ngắn.',
        },
        {
          type: 'table',
          caption: 'So sánh chụp X-quang và chụp cắt lớp',
          head: ['Tiêu chí', 'Chụp X-quang', 'Chụp cắt lớp'],
          rows: [
            [
              'Giống nhau',
              'Dùng tia X, dựa vào khả năng đâm xuyên và sự suy giảm khác nhau qua các mô',
              'Như chụp X-quang',
            ],
            [
              'Ảnh',
              'Hai chiều, các bộ phận chồng lên nhau',
              'Từng lát cắt hoặc ảnh ba chiều, không chồng lấn',
            ],
            [
              'Độ tương phản',
              'Chỉ phân biệt mô có hấp thụ khác nhau nhiều',
              'Phân biệt được chênh lệch rất nhỏ',
            ],
            ['Liều tia X, chi phí', 'Thấp', 'Cao hơn'],
            [
              'Thường dùng',
              'Gãy xương, viêm phổi, tắc ruột',
              'Sọ não, mạch vành, khối u, cấp cứu chấn thương',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Chụp não thì chụp cắt lớp thích hợp hơn: hộp sọ bao quanh não hấp thụ tia X mạnh, trên phim X-quang hình xương sọ phía trước và phía sau chồng lên nhau và lên mô não, còn mô não và tổn thương lại hấp thụ tia X gần như nhau. Chụp cắt lớp cho thấy từng lớp mô bên trong hộp sọ và xác định được chính xác vị trí tổn thương.',
        },
      ],
    },
    {
      heading: 'Dự án: Mô hình chụp cắt lớp đơn giản',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: thiết kế và chế tạo mô hình mô phỏng nguyên lí chụp cắt lớp, dùng ánh sáng thay cho tia X. Vật liệu: hai vòng tròn (bìa cứng, ống nhựa uốn hoặc gỗ) gắn song song trên chân đế làm khung; đèn LED trắng và pin đóng vai ống phát tia X; tấm kính hoặc nhựa trong để đặt vật cần "chụp" (cốc nhựa trong chứa vật mờ, mảnh giấy màu); điện thoại thông minh đóng vai đầu dò, gắn trên khung bằng vít hãm để di chuyển quanh vòng.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Xác định nhiệm vụ và thống nhất tiêu chí đánh giá: mô hình chắc chắn, đèn và điện thoại luôn ở hai phía đối diện của vật, đổi góc chụp dễ dàng.',
            'Lên ý tưởng, vẽ bản thiết kế, rồi lắp ráp mô hình.',
            'Chụp vật mẫu ở ít nhất $12$ góc cách đều nhau (mỗi góc $15^\\circ$ trên nửa vòng tròn), ghi lại ảnh từng góc.',
            'So sánh: một ảnh chụp từ một phía thấy được gì, và cả loạt ảnh nhiều góc cho biết thêm điều gì về vị trí các vật bên trong.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Nộp mô hình, loạt ảnh chụp và báo cáo: cấu tạo mô hình, các bước thực hiện, những khó khăn gặp phải và cách giải quyết, so sánh mô hình với máy chụp cắt lớp thật.',
        },
      ],
    },
  ],
  explore: {
    title: 'Máy chụp cắt lớp ảo',
    instruction:
      'Tăng số góc chụp và xem ảnh dựng lại thay đổi. Đổi góc chiếu đang xem để thấy tín hiệu đầu thu ở từng góc (một góc chính là một ảnh X-quang thường). Thử cửa sổ mô mềm và chất cản quang để tìm khối u.',
  },
  examples: [
    {
      problem:
        'Chùm tia X đi qua cánh tay theo hai đường cùng dài $6$ cm: đường thứ nhất chỉ qua mô mềm, đường thứ hai qua $4$ cm mô mềm và $2$ cm xương. Lấy $\\mu_{mô} = 20\\ \\text{m}^{-1}$, $\\mu_{xương} = 60\\ \\text{m}^{-1}$. Hỏi chỗ nào trên phim tối hơn?',
      steps: [
        'Đường thứ nhất: $\\dfrac{I_1}{I_0} = e^{-20 \\cdot 0{,}06} = e^{-1{,}2} \\approx 0{,}30$.',
        'Đường thứ hai: $\\dfrac{I_2}{I_0} = e^{-20 \\cdot 0{,}04 - 60 \\cdot 0{,}02} = e^{-2} \\approx 0{,}14$.',
        'Phim sau mô mềm nhận nhiều tia X hơn (khoảng gấp đôi) nên tối hơn; chỗ có xương sáng hơn.',
      ],
      answer: 'Chỗ ứng với đường chỉ qua mô mềm tối hơn; xương hiện lên sáng.',
    },
    {
      problem:
        'Một lát cắt được chia thành $4$ ô vuông cạnh $1$ cm: hàng trên gồm ô $a$, $b$; hàng dưới gồm ô $c$, $d$ ($a$ trên $c$). Máy đo được $\\ln\\dfrac{I_0}{I}$ theo hàng trên là $0{,}8$, hàng dưới $0{,}5$, cột trái $0{,}7$, cột phải $0{,}6$, đường chéo qua $a$ và $d$ là $0{,}4$. Tìm hệ số suy giảm của từng ô (bỏ qua độ dài đường chéo khác cạnh ô).',
      steps: [
        'Với cạnh ô $1$ cm, mỗi số đo là tổng các $\\mu$ (tính theo $\\text{cm}^{-1}$): $a + b = 0{,}8$; $c + d = 0{,}5$; $a + c = 0{,}7$; $b + d = 0{,}6$; $a + d = 0{,}4$.',
        'Từ $a + c = 0{,}7$ và $a + d = 0{,}4$: $c = 0{,}7 - a$, $d = 0{,}4 - a$. Thay vào $c + d = 0{,}5$: $1{,}1 - 2a = 0{,}5$, nên $a = 0{,}3$.',
        'Suy ra $b = 0{,}5$, $c = 0{,}4$, $d = 0{,}1$. Kiểm tra: $b + d = 0{,}6$, đúng.',
        'Chỉ với các số đo theo hàng (một góc chụp) thì không tách được từng ô; phải đo theo nhiều phương. Đó là ý tưởng của chụp cắt lớp.',
      ],
      answer: '$a = 0{,}3$; $b = 0{,}5$; $c = 0{,}4$; $d = 0{,}1$ (đơn vị $\\text{cm}^{-1}$).',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi bộ phận với màu của nó trên ảnh X-quang.',
      left: ['Phổi chứa đầy khí', 'Cơ và mỡ', 'Xương'],
      right: ['Đen', 'Xám', 'Trắng'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Càng nhiều tia X tới phim, chỗ đó càng tối.'],
      solution:
        'Khí hầu như không hấp thụ tia X nên phim đen; cơ, mỡ hấp thụ vừa phải nên xám; xương hấp thụ mạnh nên trắng.',
    },
    {
      type: 'choice',
      prompt: 'Chụp X-quang dựa trên những tính chất nào của tia X?',
      options: [
        'Khả năng đâm xuyên và tác dụng làm đen phim; mức hấp thụ khác nhau ở các mô',
        'Tia X bị phản xạ mạnh ở mặt phân cách giữa các mô',
        'Tia X làm proton trong cơ thể cộng hưởng',
        'Tia X huỷ diệt tế bào bệnh',
      ],
      answer: 0,
      hints: ['Ảnh X-quang được tạo bởi phần tia X đi xuyên qua cơ thể tới phim.'],
      solution:
        'Tia X xuyên qua cơ thể, bị các mô hấp thụ nhiều ít khác nhau, phần còn lại làm đen phim nhiều ít khác nhau và tạo ra ảnh.',
    },
    {
      type: 'number',
      prompt:
        'Chùm tia X đi qua hai đường cùng dài $4$ cm: một đường chỉ qua mô mềm ($\\mu = 20\\ \\text{m}^{-1}$), đường kia qua $3$ cm mô mềm và $1$ cm xương ($\\mu = 60\\ \\text{m}^{-1}$). Cường độ sau đường có xương bằng bao nhiêu phần trăm cường độ sau đường chỉ có mô mềm?',
      answer: 67,
      tolerance: 0.1,
      unit: '%',
      hints: [
        'Viết $I = I_0e^{-\\sum \\mu d}$ cho từng đường rồi chia cho nhau.',
        'Hai đường chỉ khác nhau ở $1$ cm: mô mềm hay xương.',
      ],
      solution:
        '$\\dfrac{I_{xương}}{I_{mô}} = \\dfrac{e^{-(20 \\cdot 0{,}03 + 60 \\cdot 0{,}01)}}{e^{-20 \\cdot 0{,}04}} = e^{-(60 - 20) \\cdot 0{,}01} = e^{-0{,}4} \\approx 0{,}670 = 67{,}0\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Đầu dò của máy chụp cắt lớp đo được cường độ tia X sau khi đi qua $10$ cm một mô đồng nhất chỉ còn bằng $10\\%$ cường độ ban đầu. Hệ số suy giảm của mô là bao nhiêu $\\text{m}^{-1}$?',
      answer: 23.03,
      tolerance: 0.05,
      hints: ['Từ $I = I_0e^{-\\mu d}$: $\\mu = \\dfrac{1}{d}\\ln\\dfrac{I_0}{I}$.'],
      solution:
        '$\\mu = \\dfrac{\\ln 10}{0{,}1} \\approx \\dfrac{2{,}303}{0{,}1} \\approx 23{,}03\\ \\text{m}^{-1}$.',
    },
    {
      type: 'number',
      prompt:
        'Một lát cắt gồm $4$ ô vuông cạnh $1$ cm: hàng trên $a$, $b$; hàng dưới $c$, $d$ ($a$ trên $c$). Các số đo $\\ln\\dfrac{I_0}{I}$: hàng trên $0{,}6$; hàng dưới $0{,}9$; cột trái $0{,}7$; cột phải $0{,}8$; đường chéo qua $a$ và $d$ là $0{,}5$. Tính hệ số suy giảm của ô $d$ (theo $\\text{cm}^{-1}$), bỏ qua độ dài đường chéo khác cạnh ô.',
      answer: 0.35,
      tolerance: 0.001,
      hints: [
        'Viết năm phương trình tổng, ví dụ $a + b = 0{,}6$, $a + d = 0{,}5$.',
        'Dùng $a + c = 0{,}7$, $a + d = 0{,}5$ để có $c - d = 0{,}2$, kết hợp với $c + d = 0{,}9$.',
      ],
      solution:
        '$c - d = (a + c) - (a + d) = 0{,}2$ và $c + d = 0{,}9$ nên $d = 0{,}35$, $c = 0{,}55$, $a = 0{,}15$, $b = 0{,}45$. Kiểm tra $b + d = 0{,}8$, đúng.',
    },
    {
      type: 'choice',
      prompt: 'Chất cản quang (chứa barium hoặc iodine) được đưa vào cơ thể khi chụp X-quang nhằm',
      options: [
        'tăng độ tương phản giữa các bộ phận hấp thụ tia X gần như nhau',
        'giảm liều tia X mà người bệnh phải nhận',
        'làm tia X có bước sóng ngắn hơn',
        'làm phim X-quang khô nhanh hơn',
      ],
      answer: 0,
      hints: ['Barium và iodine là các nguyên tố hấp thụ tia X rất mạnh.'],
      solution:
        'Bộ phận chứa chất cản quang hấp thụ tia X mạnh hơn hẳn mô xung quanh nên hiện lên sáng rõ, phân biệt được các mô vốn hấp thụ tia X gần như nhau như thành ruột, mạch máu.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi biện pháp với tác dụng của nó khi chụp X-quang.',
      left: [
        'Dùng bộ phận tăng cường ảnh hoặc tấm phosphor',
        'Cho chùm electron hẹp đập vào đối catot',
        'Đặt tấm chống tán xạ chì – nhôm trước phim',
        'Tiêm hoặc uống chất cản quang',
      ],
      right: [
        'Giảm liều chiếu, rút ngắn thời gian chụp',
        'Nguồn tia X nhỏ, ảnh sắc nét hơn',
        'Chặn tia X tán xạ lệch hướng, ảnh bớt nhoè',
        'Tăng độ tương phản của mô mềm',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Ba mục tiêu: giảm liều, tăng độ sắc nét, tăng độ tương phản.'],
      solution:
        'Bộ tăng cường ảnh và tấm phosphor biến tia X thành nhiều ánh sáng nên cần ít tia X hơn. Chùm electron hẹp và tấm chống tán xạ làm ảnh sắc nét. Chất cản quang làm tăng độ tương phản.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước của một lần chụp cắt lớp theo đúng thứ tự.',
      items: [
        'Người bệnh nằm lên bàn trượt',
        'Bàn trượt đưa vùng cần chụp vào giữa ống phát tia X và hệ đầu dò',
        'Ống phát tia X quay quanh người bệnh, đầu dò ghi chùm tia ở nhiều góc',
        'Máy tính xử lí số liệu, dựng lại ảnh lát cắt',
      ],
      answer: [0, 1, 2, 3],
      hints: ['Ảnh chỉ được dựng sau khi đã có số đo ở mọi góc.'],
      solution:
        'Người bệnh nằm lên bàn, bàn đưa vùng cần chụp vào máy, ống phát quay quanh và đầu dò ghi số đo ở nhiều góc, cuối cùng máy tính dựng ảnh.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao người bệnh có thể được yêu cầu nín thở một thời gian ngắn khi chụp cắt lớp?',
      options: [
        'Chuyển động của các cơ quan khi thở làm ảnh dựng lại bị nhoè',
        'Không khí trong phổi làm tia X mạnh lên',
        'Nín thở làm cơ thể hấp thụ ít tia X hơn',
        'Để máy chụp quay nhanh hơn',
      ],
      answer: 0,
      hints: ['Máy cần các số đo ở nhiều góc của cùng một lát cắt đứng yên.'],
      solution:
        'Trong vài giây quét, các số đo phải ứng với cùng vị trí các cơ quan. Thở làm lồng ngực và các cơ quan chuyển động, ảnh dựng lại bị nhoè.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các ưu điểm của chụp cắt lớp so với chụp X-quang thường.',
      options: [
        'Ảnh từng lát cắt, các bộ phận không chồng lên nhau',
        'Phân biệt được các mô có hấp thụ tia X chênh lệch rất nhỏ',
        'Dựng được ảnh ba chiều',
        'Liều tia X người bệnh nhận thấp hơn',
        'Chi phí thấp hơn',
      ],
      answers: [0, 1, 2],
      hints: ['Chụp cắt lớp chiếu tia X ở rất nhiều góc.'],
      solution:
        'Chụp cắt lớp cho ảnh lát cắt, ảnh ba chiều, độ tương phản cao. Đổi lại, liều tia X và chi phí đều cao hơn chụp X-quang thường.',
    },
    {
      type: 'choice',
      prompt:
        'Vì sao khi cần kiểm tra tổn thương bên trong hộp sọ, chụp cắt lớp thích hợp hơn chụp X-quang?',
      options: [
        'Trên phim X-quang, xương sọ trước và sau chồng lên mô não; chụp cắt lớp cho thấy từng lớp bên trong',
        'Tia X không xuyên qua được hộp sọ',
        'Chụp cắt lớp không dùng tia X nên an toàn cho não',
        'Não không hấp thụ tia X',
      ],
      answer: 0,
      hints: [
        'Hộp sọ bao quanh não; trên một phim X-quang mọi thứ trên đường đi của tia chồng lên nhau.',
      ],
      solution:
        'Hộp sọ hấp thụ tia X mạnh và bao quanh não, nên trên phim X-quang hình xương sọ chồng lên mô não. Chụp cắt lớp (vẫn dùng tia X) dựng được ảnh từng lát cắt, xác định chính xác vị trí tổn thương.',
    },
  ],
  takeaways: [
    'Chụp X-quang: chùm tia X xuyên qua cơ thể, bị các bộ phận hấp thụ khác nhau; phim càng nhận nhiều tia X càng tối: khí đen, mô mềm xám, xương trắng.',
    'Giảm liều và thời gian chụp bằng bộ tăng cường ảnh, tấm phosphor; tăng độ nét bằng chùm tia hẹp, tấm chống tán xạ; tăng độ tương phản bằng chất cản quang (barium, iodine).',
    'Chụp cắt lớp: ống tia X quay quanh người bệnh, đầu dò ghi số đo ở nhiều góc, máy tính dựng lại ảnh lát cắt không chồng lấn, độ tương phản cao.',
    'Mỗi số đo chỉ cho tổng $\\ln\\dfrac{I_0}{I} = \\sum \\mu d$ trên đường đi của tia; cần nhiều phương đo để tách được $\\mu$ của từng điểm.',
  ],
};
