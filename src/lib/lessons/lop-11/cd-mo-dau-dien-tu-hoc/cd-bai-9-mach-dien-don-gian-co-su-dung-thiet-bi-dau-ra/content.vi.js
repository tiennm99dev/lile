/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ghép cảm biến trong mạch chia áp với một mạch so sánh dùng op-amp và một thiết bị đầu ra ta được mạch điều khiển tự động: khi điện áp từ cảm biến vượt điện áp chuẩn U0, lối ra op-amp bão hoà dương và đóng relay, bật LED hay còi; theo cách đó có thể lắp đèn tự bật khi trời tối, mạch báo nhiệt độ cao, vòi nước tự động.',
  intro:
    'Trong ngôi nhà thông minh, đèn hành lang tự bật khi trời tối, cửa tự mở khi có người đến gần, vòi nước tự chảy khi ta đưa tay vào. Mỗi thiết bị như vậy là một mạch điện gồm ba khối đã học: cảm biến, bộ khuếch đại thuật toán và thiết bị đầu ra. Ghép chúng với nhau thế nào để mạch làm đúng việc ta muốn?',
  objectives: [
    'Mô tả được sơ đồ khối và nguyên tắc hoạt động của mạch điều khiển tự động gồm cảm biến, mạch so sánh dùng op-amp và thiết bị đầu ra.',
    'Giải thích được vai trò của op-amp và của điện áp chuẩn $U_0$ trong mạch.',
    'Thiết kế được mạch đèn tự bật khi trời tối và mạch báo nhiệt độ cao: chọn vị trí cảm biến, chọn $U_0$, chọn thiết bị đầu ra.',
    'Nêu được nguyên tắc của một số mạch ứng dụng cảm biến trong đời sống.',
  ],
  sections: [
    {
      heading: 'Mạch tạo tín hiệu điều khiển thiết bị tự động',
      blocks: [
        {
          type: 'p',
          text: 'Mạch điều khiển tự động dùng cảm biến gồm ba khối: cảm biến biến sự thay đổi của môi trường thành tín hiệu điện; bộ khuếch đại thuật toán xử lí tín hiệu đó; thiết bị đầu ra (relay, LED, còi, động cơ...) thực hiện tác động.',
        },
        {
          type: 'list',
          items: [
            'Cảm biến (LDR, điện trở nhiệt) được mắc thay cho $R_1$ hoặc $R_2$ trong một mạch chia áp. Điện trở cảm biến thay đổi làm điện áp $U_s$ ở điểm giữa thay đổi; $U_s$ được đưa vào lối vào không đảo ($+$) của op-amp.',
            'Một điện áp chuẩn $U_0$, lấy từ một biến trở mắc như mạch chia áp, được đưa vào lối vào đảo ($-$).',
            'Op-amp làm mạch so sánh: $U_s > U_0$ thì $U_{ra} = +U_{bh}$, $U_s < U_0$ thì $U_{ra} = -U_{bh}$. Relay (có diode nối tiếp) hay LED chỉ hoạt động khi $U_{ra}$ dương.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Vì sao cần op-amp?',
          text: 'Tín hiệu từ cảm biến thay đổi từ từ và rất yếu: dòng điện lấy từ mạch chia áp không đủ để đóng relay hay làm sáng đèn. Op-amp có điện trở vào rất lớn nên không làm thay đổi $U_s$, và vì hệ số khuếch đại rất lớn, chỉ cần $U_s$ vượt $U_0$ một chút là lối ra chuyển hẳn từ $-U_{bh}$ sang $+U_{bh}$, đủ mạnh và dứt khoát để bật hoặc tắt thiết bị.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Chọn điện áp chuẩn $U_0$',
          text: 'Đặt $U_0$ sát giá trị của $U_s$ tại đúng điều kiện mà ta muốn thiết bị chuyển trạng thái (độ sáng lúc chạng vạng, nhiệt độ báo động). Khi đó chỉ cần điều kiện môi trường thay đổi một chút là $U_s$ vượt qua $U_0$ và relay đóng hoặc ngắt ngay.',
        },
      ],
    },
    {
      heading: 'Mạch đèn tự bật khi trời tối',
      blocks: [
        {
          type: 'p',
          text: 'Muốn đèn sáng khi trời tối, ta cần $U_s$ tăng khi trời tối đi. Trời tối thì điện trở LDR tăng, nên LDR phải đặt ở vị trí $R_2$ (giữa lối vào $+$ và đất), điện trở cố định ở vị trí $R_1$:',
        },
        { type: 'tex', tex: 'U_s = \\dfrac{U R_{LDR}}{R_1 + R_{LDR}}' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Trời sáng: $R_{LDR}$ nhỏ, $U_s < U_0$, $U_{ra} = -U_{bh}$, diode chặn dòng, relay ngắt, đèn tắt.',
            'Trời tối dần: $R_{LDR}$ tăng, $U_s$ tăng; khi $U_s$ vượt $U_0$, $U_{ra} = +U_{bh}$, relay đóng mạch đèn $220$ V, đèn sáng.',
            'Vặn biến trở để thay đổi $U_0$, tức chọn độ tối mà đèn bắt đầu bật.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'An toàn điện',
          text: 'Mạch điều khiển chỉ dùng nguồn một chiều điện áp thấp. Phần mạch $220$ V nối qua tiếp điểm relay chỉ được lắp khi có thầy cô hướng dẫn; khi thực hành ở lớp, thay bóng đèn $220$ V bằng một bóng đèn pin nhỏ.',
        },
      ],
    },
    {
      heading: 'Một số mạch điện ứng dụng cảm biến',
      blocks: [
        {
          type: 'table',
          head: ['Mạch', 'Cảm biến', 'Nguyên tắc'],
          rows: [
            [
              'Báo nhiệt độ cao, báo cháy',
              'Điện trở nhiệt NTC ở vị trí $R_1$',
              'Nóng lên thì $R_{NTC}$ giảm, $U_s$ tăng; khi vượt $U_0$ (ứng với nhiệt độ báo động), op-amp làm còi kêu, LED đỏ sáng.',
            ],
            [
              'Vòi nước tự động',
              'Đèn LED hồng ngoại và đầu thu hồng ngoại',
              'Khi đưa tay tới gần, tay phản xạ tia hồng ngoại về đầu thu nên tín hiệu ở đầu thu tăng; op-amp so sánh và đóng relay mở van điện từ cho nước chảy.',
            ],
            [
              'Cửa tự động',
              'Cảm biến hồng ngoại (thân nhiệt) hoặc radar vi sóng',
              'Khi có người đến gần, tín hiệu từ cảm biến vượt ngưỡng, mạch điều khiển động cơ mở cửa.',
            ],
            [
              'Đèn ngủ, đèn đường tự động',
              'Điện trở quang (LDR)',
              'Như mạch đèn tự bật khi trời tối.',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Dự án: Thiết kế và lắp mạch điều khiển tự động',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: thiết kế, lắp và thử một mạch đèn tự bật khi trời tối (hoặc một mạch báo nhiệt độ cao). Dụng cụ: op-amp LM358 (hoặc 741), LDR, điện trở nhiệt NTC $10$ k$\\Omega$, các điện trở $10$ k$\\Omega$ và $1$ k$\\Omega$, biến trở $10$ k$\\Omega$, relay $12$ V, diode 1N4007, LED, còi $12$ V, bóng đèn pin nhỏ, nguồn một chiều $12$ V, bảng mạch thử, dây nối, đồng hồ đa năng.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ sơ đồ khối và sơ đồ mạch; giải thích vì sao chọn vị trí của cảm biến như vậy.',
            'Đo điện trở của cảm biến ở hai điều kiện (sáng và tối, hoặc nhiệt độ phòng và nhiệt độ báo động), tính $U_s$ ở mỗi điều kiện để chọn $U_0$.',
            'Lắp mạch chia áp có cảm biến, mạch tạo $U_0$ bằng biến trở, op-amp, rồi relay có diode và đèn ở lối ra. Dùng đồng hồ đo kiểm tra $U_s$, $U_0$, $U_{ra}$.',
            'Thử mạch: che dần LDR (hoặc làm nóng NTC bằng tay, máy sấy tóc), ghi lại lúc thiết bị bật; vặn biến trở để mạch bật đúng điều kiện mong muốn.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Nộp sơ đồ mạch, bảng số liệu $R$, $U_s$, $U_0$, $U_{ra}$, ảnh hoặc video mạch hoạt động. Nhận xét: mạch có bật tắt liên tục khi trời chạng vạng không, vì sao; đề xuất một ứng dụng khác dùng cùng sơ đồ với cảm biến khác.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ lắp mạch điều khiển tự động',
    instruction:
      'Chọn nhiệm vụ. Chạm một linh kiện trong hộp rồi chạm vị trí để lắp nó vào $R_1$, $R_2$ hoặc lối ra (chạm vị trí đã có linh kiện để tháo ra). Kéo thanh độ rọi hoặc nhiệt độ để thử mạch và vặn $U_0$ cho đến khi mạch đạt yêu cầu.',
  },
  examples: [
    {
      problem:
        'Mạch đèn tự bật dùng nguồn $U = 12$ V, $R_1 = 10$ k$\\Omega$ cố định, LDR ở vị trí $R_2$. Lúc chạng vạng (muốn đèn bật) LDR có điện trở $30$ k$\\Omega$, ban ngày $2$ k$\\Omega$. Tính $U_s$ ở hai lúc và chọn $U_0$.',
      steps: [
        'Chạng vạng: $U_s = \\dfrac{12 \\cdot 30}{10 + 30} = 9$ V.',
        'Ban ngày: $U_s = \\dfrac{12 \\cdot 2}{10 + 2} = 2$ V.',
        'Trời tối hơn chạng vạng thì $R_{LDR} > 30$ k$\\Omega$, $U_s > 9$ V. Đặt $U_0 \\approx 9$ V: tối hơn mức đó thì $U_s > U_0$, op-amp bão hoà dương, relay đóng, đèn sáng; ban ngày $U_s = 2$ V $< U_0$, đèn tắt.',
      ],
      answer: '$U_s = 9$ V lúc chạng vạng, $2$ V ban ngày; chọn $U_0 \\approx 9$ V.',
    },
    {
      problem:
        'Điện áp $U_0$ lấy từ một biến trở $10$ k$\\Omega$ mắc vào nguồn $12$ V. Phần biến trở từ con chạy xuống đất phải bằng bao nhiêu để $U_0 = 9$ V?',
      steps: [
        'Biến trở là một mạch chia áp: $U_0 = 12 \\cdot \\dfrac{R_d}{10}$, với $R_d$ là phần từ con chạy xuống đất (k$\\Omega$).',
        '$R_d = \\dfrac{9 \\cdot 10}{12} = 7{,}5$ k$\\Omega$.',
      ],
      answer: '$R_d = 7{,}5$ k$\\Omega$.',
    },
    {
      problem:
        'Mạch báo nhiệt độ cao: nguồn $12$ V, NTC ở vị trí $R_1$, $R_2 = 2$ k$\\Omega$ cố định. NTC có điện trở $10$ k$\\Omega$ ở $25\\ ^\\circ\\mathrm{C}$ và $1$ k$\\Omega$ ở $60\\ ^\\circ\\mathrm{C}$. Muốn còi kêu từ $60\\ ^\\circ\\mathrm{C}$, chọn $U_0$ và kiểm tra rằng ở $25\\ ^\\circ\\mathrm{C}$ còi im lặng.',
      steps: [
        'Ở $60\\ ^\\circ\\mathrm{C}$: $U_s = \\dfrac{12 \\cdot 2}{1 + 2} = 8$ V, nên chọn $U_0 = 8$ V.',
        'Nóng hơn $60\\ ^\\circ\\mathrm{C}$ thì $R_{NTC} < 1$ k$\\Omega$, $U_s > 8$ V $= U_0$: còi kêu.',
        'Ở $25\\ ^\\circ\\mathrm{C}$: $U_s = \\dfrac{12 \\cdot 2}{10 + 2} = 2$ V $< U_0$, $U_{ra} = -U_{bh}$, còi im lặng.',
      ],
      answer: '$U_0 = 8$ V; ở $25\\ ^\\circ\\mathrm{C}$, $U_s = 2$ V nên còi không kêu.',
    },
  ],
  practice: [
    {
      type: 'order',
      prompt: 'Sắp xếp các bước hoạt động của mạch đèn tự bật khi trời tối theo đúng thứ tự.',
      items: [
        'Trời tối, điện trở của LDR tăng',
        'Điện áp $U_s$ ở điểm giữa mạch chia áp tăng',
        '$U_s$ vượt $U_0$, lối ra op-amp chuyển sang $+U_{bh}$',
        'Relay đóng mạch, đèn sáng',
      ],
      answer: [0, 1, 2, 3],
      hints: ['Đi theo đường đi của tín hiệu: cảm biến, mạch chia áp, op-amp, thiết bị đầu ra.'],
      solution:
        'Cảm biến thay đổi điện trở trước, làm $U_s$ thay đổi; op-amp so sánh $U_s$ với $U_0$; cuối cùng lối ra dương đóng relay và đèn sáng.',
    },
    {
      type: 'number',
      prompt:
        'Nguồn $12$ V, $R_1 = 10$ k$\\Omega$ cố định, LDR ở vị trí $R_2$. Lúc tối LDR có điện trở $40$ k$\\Omega$. Tính $U_s$ (V).',
      answer: 9.6,
      tolerance: 0.001,
      unit: 'V',
      hints: ['$U_s = \\dfrac{U R_2}{R_1 + R_2}$.'],
      solution: '$U_s = \\dfrac{12 \\cdot 40}{10 + 40} = 9{,}6$ V.',
    },
    {
      type: 'choice',
      prompt:
        'Một bạn lắp mạch đèn tự động thì thấy đèn sáng ban ngày và tắt khi trời tối. Bạn đã mắc LDR ở vị trí $R_1$ (giữa nguồn và lối vào $+$). Cách sửa đơn giản nhất là',
      options: [
        'Đổi chỗ LDR với điện trở cố định',
        'Thay relay bằng LED',
        'Tăng điện áp nguồn',
        'Bỏ diode nối tiếp với relay',
      ],
      answer: 0,
      hints: ['Với LDR ở vị trí $R_1$, trời tối thì $U_s$ tăng hay giảm?'],
      solution:
        'LDR ở vị trí $R_1$: trời tối, $R_{LDR}$ tăng nên $U_s$ giảm, mạch hoạt động ngược. Đổi LDR xuống vị trí $R_2$ thì trời tối $U_s$ tăng, vượt $U_0$ và đèn sáng. (Đổi chỗ hai lối vào của op-amp cũng được.)',
    },
    {
      type: 'number',
      prompt:
        'Mạch báo nhiệt: nguồn $9$ V, NTC ở vị trí $R_1$, $R_2 = 3$ k$\\Omega$ cố định. Ở nhiệt độ báo động NTC có điện trở $1{,}5$ k$\\Omega$. Phải đặt $U_0$ bằng bao nhiêu vôn?',
      answer: 6,
      tolerance: 0.001,
      unit: 'V',
      hints: ['$U_0$ bằng $U_s$ tại nhiệt độ báo động.'],
      solution: '$U_s = \\dfrac{9 \\cdot 3}{1{,}5 + 3} = 6$ V, nên đặt $U_0 = 6$ V.',
    },
    {
      type: 'choice',
      prompt:
        'Vì sao không nối thẳng mạch chia áp có cảm biến vào cuộn dây relay mà phải qua op-amp?',
      options: [
        'Tín hiệu từ cảm biến quá yếu và thay đổi từ từ; op-amp so sánh với $U_0$ và cho lối ra bão hoà đủ mạnh, dứt khoát để đóng ngắt relay',
        'Vì op-amp làm tăng điện trở của cảm biến',
        'Vì relay chỉ hoạt động với dòng điện xoay chiều',
        'Vì op-amp biến ánh sáng thành tín hiệu điện',
      ],
      answer: 0,
      hints: [
        'Dòng điện qua mạch chia áp có đủ để hút tiếp điểm relay không? Relay cần bật tắt dứt khoát.',
      ],
      solution:
        'Dòng lấy từ mạch chia áp rất nhỏ, không đủ để đóng relay, và $U_s$ chỉ thay đổi từ từ. Op-amp có điện trở vào rất lớn, so sánh $U_s$ với $U_0$ và cho lối ra $\\pm U_{bh}$, đủ để điều khiển relay một cách dứt khoát.',
    },
    {
      type: 'choice',
      prompt:
        'Vì sao khi đưa tay tới gần vòi nước tự động thì tín hiệu ở đầu thu hồng ngoại tăng lên?',
      options: [
        'Tay phản xạ tia hồng ngoại từ đèn LED hồng ngoại trở lại đầu thu',
        'Tay làm nóng đầu thu',
        'Tay che mất ánh sáng chiếu vào đầu thu',
        'Nước trong vòi phát ra tia hồng ngoại',
      ],
      answer: 0,
      hints: ['Vòi có một đèn phát và một đầu thu hồng ngoại đặt cạnh nhau.'],
      solution:
        'Đèn LED hồng ngoại liên tục phát tia hồng ngoại. Khi không có tay, ít tia trở về đầu thu; khi tay ở gần, tay phản xạ tia về đầu thu nên tín hiệu tăng, vượt ngưỡng và mạch mở van nước.',
    },
    {
      type: 'number',
      prompt:
        'Biến trở $10$ k$\\Omega$ mắc vào nguồn $12$ V để tạo $U_0$. Muốn $U_0 = 4{,}8$ V thì phần biến trở từ con chạy xuống đất bằng bao nhiêu k$\\Omega$?',
      answer: 4,
      tolerance: 0.001,
      unit: 'kΩ',
      hints: ['$U_0 = U \\cdot \\dfrac{R_d}{R}$.'],
      solution: '$R_d = \\dfrac{4{,}8 \\cdot 10}{12} = 4$ k$\\Omega$.',
    },
    {
      type: 'choice',
      prompt:
        'Trong mạch đèn tự bật, vì sao nên đặt $U_0$ sát giá trị của $U_s$ ở độ sáng mà ta muốn đèn bật?',
      options: [
        'Để chỉ cần độ sáng thay đổi một chút là $U_s$ vượt $U_0$ và relay đóng ngắt ngay đúng lúc',
        'Để op-amp không bao giờ bão hoà',
        'Để dòng điện qua LDR bằng không',
        'Để đèn luôn sáng',
      ],
      answer: 0,
      hints: ['Nếu $U_0$ cách xa $U_s$ lúc chạng vạng thì đèn sẽ bật sớm hay muộn?'],
      solution:
        'Op-amp chuyển trạng thái đúng lúc $U_s$ vượt $U_0$. Đặt $U_0$ sát $U_s$ ở độ sáng mong muốn thì chỉ một thay đổi nhỏ về độ sáng đã đủ làm relay đóng ngắt; đặt xa thì đèn bật quá sớm hoặc quá muộn (hoặc không bao giờ bật).',
    },
  ],
  takeaways: [
    'Mạch điều khiển tự động: cảm biến trong mạch chia áp, mạch so sánh dùng op-amp, thiết bị đầu ra.',
    'Op-amp so sánh $U_s$ (lối vào $+$) với $U_0$ (lối vào $-$): $U_s > U_0$ thì lối ra $+U_{bh}$, relay có diode đóng, LED sáng; ngược lại thiết bị tắt.',
    'Vị trí cảm biến trong mạch chia áp quyết định $U_s$ tăng hay giảm khi môi trường thay đổi: đèn tự bật khi tối cần LDR ở vị trí $R_2$, báo nóng cần NTC ở vị trí $R_1$.',
    'Đặt $U_0$ (bằng biến trở) sát giá trị $U_s$ ở điều kiện cần chuyển trạng thái; relay cho mạch điều khiển yếu đóng ngắt thiết bị công suất lớn.',
  ],
};
