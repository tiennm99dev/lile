/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Diode bán dẫn chỉ cho dòng điện đi qua theo một chiều, từ anode sang cathode; dùng một diode để chỉnh lưu nửa chu kì, bốn diode mắc thành cầu để chỉnh lưu cả chu kì, và tụ điện mắc song song với tải để lọc cho điện áp ra phẳng hơn.',
  intro:
    'Lưới điện đưa đến nhà em dòng điện xoay chiều, nhưng pin điện thoại, máy tính xách tay hay tai nghe không dây chỉ nạp được bằng dòng điện một chiều. Bên trong bộ sạc có linh kiện gì để biến dòng điện xoay chiều thành dòng điện một chiều?',
  objectives: [
    'Nêu được cấu tạo, kí hiệu và tính chỉnh lưu của diode bán dẫn.',
    'Thực hiện thí nghiệm, vẽ được đường đặc trưng $I$ – $U$ của diode bán dẫn.',
    'Vẽ được mạch chỉnh lưu nửa chu kì dùng một diode và mạch chỉnh lưu cả chu kì dùng cầu chỉnh lưu.',
    'So sánh được đồ thị điện áp ra khi chỉnh lưu nửa chu kì và cả chu kì; nêu được tác dụng của tụ lọc.',
  ],
  sections: [
    {
      heading: 'Diode bán dẫn',
      blocks: [
        {
          type: 'p',
          text: 'Diode bán dẫn gồm một lớp bán dẫn loại p tiếp xúc với một lớp bán dẫn loại n (lớp tiếp xúc p – n), có hai cực: anode (A) nối với lớp p và cathode (K) nối với lớp n. Trên kí hiệu của diode, mũi tam giác chỉ chiều dòng điện được phép đi qua, vạch ngang là cathode.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tính chỉnh lưu của diode',
          text: 'Diode bán dẫn là linh kiện chỉ cho dòng điện đi qua theo một chiều nhất định, từ anode sang cathode. Khi anode có điện thế cao hơn cathode (phân cực thuận), dòng điện đi qua dễ dàng; khi mắc ngược lại (phân cực ngược), dòng điện qua diode gần như bằng $0$.',
        },
        {
          type: 'p',
          text: 'Đường đặc trưng $I$ – $U$ của diode (Hình 4.3 trong sách) không phải là đường thẳng như của điện trở:',
        },
        {
          type: 'list',
          items: [
            'Phân cực thuận: khi $U$ còn nhỏ, dòng điện rất nhỏ; khi $U$ vượt khoảng $0{,}6$ – $0{,}7$ V (với diode silic), cường độ dòng điện tăng rất nhanh.',
            'Phân cực ngược: cường độ dòng điện gần như bằng $0$ và gần như không đổi khi $U$ tăng (cho đến khi diode bị đánh thủng ở điện áp ngược rất lớn).',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Diode lí tưởng',
          text: 'Khi phân tích mạch chỉnh lưu, ta thường coi diode là lí tưởng: dẫn điện hoàn toàn khi phân cực thuận, không cho dòng điện qua khi phân cực ngược. Với diode silic thật, điện áp ra nhỏ hơn khoảng $0{,}7$ V cho mỗi diode mà dòng điện đi qua.',
        },
      ],
    },
    {
      heading: 'Chỉnh lưu nửa chu kì và cả chu kì',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Chỉnh lưu',
          text: 'Chỉnh lưu dòng điện xoay chiều là chuyển dòng điện xoay chiều thành dòng điện một chiều.',
        },
        {
          type: 'p',
          text: 'Mạch chỉnh lưu nửa chu kì (Hình 4.6): một diode mắc nối tiếp với tải $R$. Trong nửa chu kì diode phân cực thuận, có dòng điện qua tải; trong nửa chu kì còn lại diode bị phân cực ngược, dòng điện bị chặn. Điện áp trên tải là các xung nửa hình sin cách nhau, không liên tục.',
        },
        {
          type: 'p',
          text: 'Mạch chỉnh lưu cả chu kì (Hình 4.8): bốn diode mắc thành mạch cầu (cầu chỉnh lưu). Hai đỉnh của cầu nối với nguồn xoay chiều, hai đỉnh còn lại nối với tải. Trong mỗi nửa chu kì có hai diode dẫn điện, và dòng điện qua tải trong cả hai nửa chu kì đều có cùng một chiều.',
        },
        {
          type: 'table',
          caption: 'So sánh hai cách chỉnh lưu (nguồn $50$ Hz, diode lí tưởng)',
          head: ['Đặc điểm', 'Nửa chu kì', 'Cả chu kì'],
          rows: [
            ['Số diode', '$1$', '$4$ (mạch cầu)'],
            ['Dòng điện qua tải', 'Chỉ trong một nửa chu kì', 'Trong cả hai nửa chu kì'],
            ['Số xung điện áp mỗi giây', '$50$', '$100$ (tần số gấp đôi)'],
            [
              'Điện áp trung bình trên tải',
              '$\\dfrac{U_0}{\\pi} \\approx 0{,}32U_0$',
              '$\\dfrac{2U_0}{\\pi} \\approx 0{,}64U_0$',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Lọc bằng tụ điện',
      blocks: [
        {
          type: 'p',
          text: 'Điện áp sau chỉnh lưu là điện áp một chiều nhưng nhấp nhô mạnh, chưa dùng được cho các mạch điện tử. Mắc một tụ điện có điện dung lớn song song với tải:',
        },
        {
          type: 'list',
          items: [
            'Khi điện áp chỉnh lưu tăng lên, diode dẫn điện và nạp điện cho tụ tới gần giá trị cực đại.',
            'Khi điện áp chỉnh lưu giảm xuống dưới điện áp của tụ, diode bị khoá, tụ phóng điện qua tải nên điện áp trên tải chỉ giảm chậm.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tác dụng của tụ lọc',
          text: 'Tụ lọc làm điện áp trên tải gần như không đổi, chỉ còn gợn sóng nhỏ. Điện dung của tụ và điện trở tải càng lớn thì tụ phóng điện càng chậm, gợn sóng càng nhỏ. Với cùng một tụ, chỉnh lưu cả chu kì cho gợn sóng nhỏ hơn chỉnh lưu nửa chu kì, vì tụ được nạp lại thường xuyên gấp đôi.',
        },
        {
          type: 'p',
          text: 'Bộ sạc điện thoại kết hợp các phần trên: biến áp hạ điện áp, cầu diode chỉnh lưu, tụ điện lọc, rồi mạch điều khiển ổn định điện áp và dòng điện ra cho phù hợp với pin.',
        },
      ],
    },
    {
      heading: 'Dự án: Khảo sát đường đặc trưng I – U của diode bán dẫn',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: đo cường độ dòng điện qua diode theo điện áp giữa hai cực khi phân cực thuận và phân cực ngược, vẽ đường đặc trưng $I$ – $U$. Dụng cụ: một diode bán dẫn, điện trở $10\\ \\Omega$, biến trở $0$ – $100\\ \\Omega$, công tắc, hai đồng hồ đo điện đa năng, nguồn điện một chiều (biến áp nguồn), bảng lắp mạch, dây nối.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Mắc diode nối tiếp với điện trở bảo vệ $10\\ \\Omega$ và biến trở vào nguồn, anode nối về phía cực dương (phân cực thuận). Một đồng hồ đo cường độ dòng điện (thang mA), một đồng hồ đo điện áp giữa hai cực diode.',
            'Điều chỉnh biến trở để điện áp trên diode tăng dần; ghi khoảng $10$ cặp giá trị $U$, $I$, đo dày hơn quanh $0{,}5$ – $0{,}8$ V.',
            'Đảo chiều diode (phân cực ngược), lặp lại phép đo.',
            'Vẽ đường đặc trưng $I$ – $U$ cho cả hai trường hợp trên cùng một hệ trục.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Nộp sơ đồ mạch, bảng số liệu và đồ thị. Nhận xét cường độ dòng điện khi phân cực thuận và khi phân cực ngược, ước lượng điện áp mở của diode, và giải thích vì sao tính chất này giúp diode chỉnh lưu được dòng điện xoay chiều.',
        },
      ],
    },
  ],
  explore: {
    title: 'Mạch chỉnh lưu ảo',
    instruction:
      'Chọn mạch không có diode, chỉnh lưu nửa chu kì hoặc cả chu kì, kéo trên dao động kí để xem diode nào đang dẫn điện. Đảo chiều diode, thử quay từng diode của cầu để xem khi nào cầu hoạt động, rồi lắp tụ lọc và thay đổi điện dung để quan sát độ gợn sóng.',
  },
  examples: [
    {
      problem:
        'Một biến áp nguồn cho điện áp xoay chiều hiệu dụng $12$ V, tần số $50$ Hz, được chỉnh lưu nửa chu kì bằng một diode lí tưởng. Mô tả điện áp trên tải: giá trị cực đại, số xung mỗi giây, thời gian có dòng điện trong mỗi chu kì.',
      steps: [
        'Điện áp cực đại của nguồn: $U_0 = 12\\sqrt{2} \\approx 17$ V; diode lí tưởng nên đỉnh xung trên tải cũng khoảng $17$ V.',
        'Chu kì $T = \\dfrac{1}{50} = 0{,}02$ s; trong mỗi chu kì chỉ có một nửa chu kì diode phân cực thuận.',
        'Mỗi chu kì có một xung kéo dài $0{,}01$ s, tiếp theo là $0{,}01$ s không có dòng điện; mỗi giây có $50$ xung.',
      ],
      answer:
        'Các xung nửa hình sin có đỉnh khoảng $17$ V, $50$ xung mỗi giây, mỗi xung kéo dài $0{,}01$ s.',
    },
    {
      problem:
        'Cũng nguồn $12$ V – $50$ Hz nhưng chỉnh lưu cả chu kì bằng cầu bốn diode silic, mỗi diode có điện áp thuận khoảng $0{,}7$ V. Ước lượng điện áp cực đại trên tải và số xung mỗi giây.',
      steps: [
        'Trong mỗi nửa chu kì dòng điện đi qua hai diode của cầu mắc nối tiếp với tải.',
        'Điện áp cực đại trên tải: $U_0 - 2 \\cdot 0{,}7 \\approx 17 - 1{,}4 = 15{,}6$ V.',
        'Mỗi nửa chu kì cho một xung, nên mỗi giây có $2 \\cdot 50 = 100$ xung.',
      ],
      answer: 'Đỉnh điện áp trên tải khoảng $15{,}6$ V, $100$ xung mỗi giây.',
    },
    {
      problem:
        'Diode silic (điện áp thuận khoảng $0{,}7$ V) mắc nối tiếp với điện trở $100\\ \\Omega$ vào nguồn một chiều $5$ V. Tính cường độ dòng điện khi diode phân cực thuận và khi phân cực ngược.',
      steps: [
        'Phân cực thuận: điện áp trên điện trở là $5 - 0{,}7 = 4{,}3$ V.',
        '$I = \\dfrac{4{,}3}{100} = 0{,}043$ A $= 43$ mA.',
        'Phân cực ngược: diode không cho dòng điện qua, $I \\approx 0$; điện áp $5$ V đặt hết lên diode.',
      ],
      answer: 'Khoảng $43$ mA khi phân cực thuận; gần như bằng $0$ khi phân cực ngược.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Chỉnh lưu dòng điện xoay chiều là',
      options: [
        'chuyển từ dòng điện xoay chiều sang dòng điện một chiều',
        'điều chỉnh cường độ dòng điện xoay chiều sao cho gần như không đổi',
        'chuyển từ dòng điện một chiều sang dòng điện xoay chiều',
        'điều chỉnh cường độ dòng điện xoay chiều về xấp xỉ bằng $0$',
      ],
      answer: 0,
      hints: ['Sau khi chỉnh lưu, dòng điện qua tải chỉ còn một chiều.'],
      solution:
        'Chỉnh lưu là chuyển dòng điện xoay chiều thành dòng điện một chiều, nhờ tính chỉnh lưu của diode.',
    },
    {
      type: 'choice',
      prompt: 'Phát biểu nào sau đây không đúng?',
      options: [
        'Dùng một diode bán dẫn trong mạch điện xoay chiều có thể chỉnh lưu được cả chu kì của dòng điện',
        'Để chỉnh lưu cả chu kì, người ta dùng bốn diode mắc thành mạch cầu chỉnh lưu',
        'Diode bán dẫn được dùng trong các mạch chỉnh lưu dòng điện xoay chiều',
        'Diode bán dẫn có tính chỉnh lưu',
      ],
      answer: 0,
      hints: ['Một diode chặn dòng điện trong nửa chu kì nào?'],
      solution:
        'Một diode chỉ cho dòng điện qua trong một nửa chu kì, nên chỉ chỉnh lưu được nửa chu kì. Muốn chỉnh lưu cả chu kì phải dùng cầu bốn diode.',
    },
    {
      type: 'multi',
      prompt: 'Những phát biểu nào đúng?',
      options: [
        'Diode chỉ cho dòng điện đi theo chiều từ anode sang cathode',
        'Khi chỉnh lưu cả chu kì bằng cầu diode, điện áp trên tải không đổi dấu',
        'Khi chỉnh lưu nửa chu kì, điện áp trên tải là một đường hình sin liên tục',
        'Khi phân cực ngược, cường độ dòng điện qua diode tăng rất nhanh theo điện áp',
      ],
      answers: [0, 1],
      hints: [
        'Nhớ lại đường đặc trưng $I$ – $U$ của diode và dạng điện áp ra của hai mạch chỉnh lưu.',
      ],
      solution:
        'Diode chỉ dẫn điện từ anode sang cathode; cầu diode làm dòng điện qua tải luôn cùng chiều nên điện áp trên tải không đổi dấu. Chỉnh lưu nửa chu kì cho các xung rời nhau, không phải hình sin liên tục. Khi phân cực ngược, dòng điện gần như bằng $0$.',
    },
    {
      type: 'number',
      prompt:
        'Chỉnh lưu nửa chu kì một dòng điện xoay chiều tần số $50$ Hz. Mỗi giây có bao nhiêu xung dòng điện qua tải?',
      answer: 50,
      unit: 'xung',
      hints: ['Mỗi chu kì có bao nhiêu nửa chu kì diode phân cực thuận?'],
      solution: 'Mỗi chu kì chỉ có một xung, và mỗi giây có $50$ chu kì, nên có $50$ xung.',
    },
    {
      type: 'number',
      prompt:
        'Chỉnh lưu cả chu kì một dòng điện xoay chiều tần số $50$ Hz bằng cầu diode. Tần số của các xung điện áp trên tải là bao nhiêu hertz?',
      answer: 100,
      unit: 'Hz',
      hints: ['Mỗi nửa chu kì của nguồn cho một xung trên tải.'],
      solution: 'Mỗi chu kì của nguồn cho hai xung, nên tần số xung là $2 \\cdot 50 = 100$ Hz.',
    },
    {
      type: 'number',
      prompt:
        'Điện áp xoay chiều hiệu dụng $9$ V được chỉnh lưu cả chu kì bằng các diode lí tưởng. Điện áp cực đại trên tải là bao nhiêu vôn (làm tròn đến hai chữ số thập phân)?',
      answer: 12.73,
      tolerance: 0.01,
      unit: 'V',
      hints: ['Diode lí tưởng không làm giảm điện áp; đỉnh xung bằng điện áp cực đại của nguồn.'],
      solution: '$U_0 = 9\\sqrt{2} \\approx 12{,}73$ V.',
    },
    {
      type: 'number',
      prompt:
        'Một diode silic có điện áp thuận $0{,}7$ V được mắc phân cực thuận, nối tiếp với điện trở $50\\ \\Omega$ vào nguồn một chiều $3$ V. Cường độ dòng điện trong mạch là bao nhiêu miliampe?',
      answer: 46,
      unit: 'mA',
      hints: ['Điện áp trên điện trở là $3 - 0{,}7$ V.'],
      solution: '$I = \\dfrac{3 - 0{,}7}{50} = \\dfrac{2{,}3}{50} = 0{,}046$ A $= 46$ mA.',
    },
    {
      type: 'choice',
      prompt: 'Trong mạch chỉnh lưu nửa chu kì, nếu đảo ngược chiều mắc của diode thì',
      options: [
        'dòng điện qua tải có trong nửa chu kì còn lại và điện áp trên tải đổi dấu',
        'mạch chỉnh lưu được cả chu kì',
        'không bao giờ có dòng điện qua tải',
        'điện áp trên tải trở thành điện áp xoay chiều',
      ],
      answer: 0,
      hints: ['Sau khi đảo, diode phân cực thuận trong nửa chu kì nào?'],
      solution:
        'Diode đảo chiều phân cực thuận trong nửa chu kì trước đây bị chặn, nên tải có dòng điện trong nửa chu kì đó và theo chiều ngược lại: điện áp trên tải đổi dấu nhưng vẫn là chỉnh lưu nửa chu kì.',
    },
    {
      type: 'choice',
      prompt: 'Để lọc cho điện áp sau chỉnh lưu phẳng hơn, tụ điện được mắc',
      options: [
        'song song với tải',
        'nối tiếp với tải',
        'nối tiếp với diode, trước cầu chỉnh lưu',
        'song song với nguồn xoay chiều',
      ],
      answer: 0,
      hints: ['Tụ cần phóng điện qua tải khi diode bị khoá.'],
      solution:
        'Tụ lọc mắc song song với tải: được nạp khi diode dẫn và phóng điện qua tải khi diode khoá, giữ cho điện áp trên tải gần như không đổi.',
    },
    {
      type: 'choice',
      prompt:
        'Giữ nguyên tải, thay tụ lọc bằng một tụ có điện dung lớn hơn. Độ gợn sóng của điện áp trên tải',
      options: ['giảm', 'tăng', 'không đổi', 'bằng $0$ hoàn toàn'],
      answer: 0,
      hints: ['Tụ có điện dung lớn hơn phóng điện qua cùng một tải nhanh hơn hay chậm hơn?'],
      solution:
        'Tụ lớn hơn phóng điện chậm hơn qua tải, nên giữa hai lần nạp điện áp giảm ít hơn: độ gợn sóng giảm, nhưng không bao giờ bằng $0$ hẳn.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bộ phận của một bộ sạc theo đường đi của điện năng từ ổ cắm đến pin.',
      items: [
        'Biến áp hạ điện áp $220$ V xuống điện áp thấp',
        'Cầu diode chỉnh lưu thành dòng điện một chiều nhấp nhô',
        'Tụ điện lọc cho điện áp phẳng hơn',
        'Mạch điều khiển ổn định điện áp và dòng điện ra',
      ],
      answer: [0, 1, 2, 3],
      hints: ['Phải chỉnh lưu trước rồi mới lọc được; mạch điều khiển ở sát thiết bị cần sạc.'],
      solution:
        'Hạ áp bằng biến áp (chỉ làm được với dòng xoay chiều), chỉnh lưu bằng cầu diode, lọc bằng tụ điện, rồi mạch điều khiển ổn định điện áp và dòng điện cho pin.',
    },
  ],
  takeaways: [
    'Diode bán dẫn chỉ cho dòng điện đi từ anode sang cathode: phân cực thuận thì dẫn điện, phân cực ngược thì dòng điện gần như bằng $0$.',
    'Chỉnh lưu nửa chu kì dùng một diode: tải chỉ có dòng điện trong một nửa chu kì.',
    'Chỉnh lưu cả chu kì dùng cầu bốn diode: dòng điện qua tải cùng chiều trong cả hai nửa chu kì, tần số xung gấp đôi.',
    'Tụ lọc mắc song song với tải làm điện áp ra gần như không đổi; tụ càng lớn, gợn sóng càng nhỏ.',
  ],
};
