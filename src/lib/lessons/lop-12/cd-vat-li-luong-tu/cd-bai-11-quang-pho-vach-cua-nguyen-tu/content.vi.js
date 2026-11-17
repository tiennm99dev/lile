/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Electron trong nguyên tử chỉ tồn tại ở các trạng thái dừng có năng lượng xác định; khi chuyển giữa hai trạng thái dừng, nguyên tử phát xạ hoặc hấp thụ một photon có hf = E_cao − E_thấp, nên mỗi nguyên tố có quang phổ vạch riêng, như các vạch của hydrogen với Eₙ = −13,6/n² eV.',
  intro:
    'Ánh sáng Mặt Trời qua lăng kính cho một dải màu liên tục như cầu vồng. Nhưng ánh sáng từ một ống chứa khí hydrogen loãng đang phóng điện chỉ cho vài vạch màu tách rời: đỏ, lam, chàm, tím. Vì sao nguyên tử chỉ phát ra những ánh sáng có bước sóng hoàn toàn xác định?',
  objectives: [
    'Phân biệt được quang phổ liên tục, quang phổ vạch phát xạ và quang phổ vạch hấp thụ.',
    'Phát biểu được các tiên đề của Bohr về trạng thái dừng và về sự phát xạ, hấp thụ năng lượng của nguyên tử.',
    'Mô tả và giải thích được sự tồn tại các mức năng lượng của electron trong nguyên tử bằng quang phổ vạch phát xạ và hấp thụ.',
    'Vận dụng được hệ thức $hf = E_n - E_m$ và các mức năng lượng $E_n = -\\dfrac{13{,}6}{n^2}$ eV của nguyên tử hydrogen.',
  ],
  sections: [
    {
      heading: 'Quang phổ liên tục và quang phổ vạch',
      blocks: [
        {
          type: 'p',
          text: 'Máy quang phổ dùng lăng kính (hoặc cách tử) để phân tích một chùm sáng thành các thành phần đơn sắc có bước sóng khác nhau, cho ta quang phổ của nguồn sáng.',
        },
        {
          type: 'table',
          caption: 'Ba loại quang phổ',
          head: ['Loại quang phổ', 'Đặc điểm', 'Nguồn phát'],
          rows: [
            [
              'Quang phổ liên tục',
              'Dải màu biến thiên liên tục từ đỏ đến tím',
              'Chất rắn, chất lỏng, chất khí ở áp suất lớn bị nung nóng (dây tóc bóng đèn, Mặt Trời)',
            ],
            [
              'Quang phổ vạch phát xạ',
              'Các vạch màu riêng lẻ ngăn cách nhau bởi những khoảng tối',
              'Chất khí hay hơi ở áp suất thấp bị kích thích (nung nóng hoặc phóng điện)',
            ],
            [
              'Quang phổ vạch hấp thụ',
              'Các vạch tối trên nền quang phổ liên tục',
              'Ánh sáng trắng đi qua một đám khí hay hơi có nhiệt độ thấp hơn nguồn sáng',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Quang phổ vạch phát xạ của mỗi nguyên tố có số vạch, vị trí và độ sáng của các vạch riêng, đặc trưng cho nguyên tố đó. Ví dụ, quang phổ vạch phát xạ của hydrogen trong vùng nhìn thấy có bốn vạch: đỏ, lam, chàm, tím.',
        },
      ],
    },
    {
      heading: 'Mẫu nguyên tử Bohr và các mức năng lượng',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tiên đề về các trạng thái dừng',
          text: 'Nguyên tử chỉ tồn tại trong một số trạng thái có năng lượng xác định $E_n$, gọi là các trạng thái dừng. Khi ở trạng thái dừng, nguyên tử không bức xạ. Trạng thái có năng lượng thấp nhất là trạng thái cơ bản; các trạng thái có năng lượng cao hơn là trạng thái kích thích.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tiên đề về sự bức xạ và hấp thụ năng lượng',
          text: 'Khi nguyên tử chuyển từ trạng thái dừng có năng lượng $E_n$ sang trạng thái dừng có năng lượng thấp hơn $E_m$ thì nó phát ra một photon có năng lượng đúng bằng hiệu $E_n - E_m$: $$\\varepsilon = hf_{nm} = E_n - E_m.$$ Ngược lại, nếu nguyên tử đang ở trạng thái $E_m$ mà hấp thụ được một photon có năng lượng đúng bằng $E_n - E_m$ thì nó chuyển lên trạng thái $E_n$.',
        },
        {
          type: 'p',
          text: 'Với nguyên tử hydrogen, các trạng thái dừng được đánh số $n = 1, 2, 3, \\ldots$ ứng với các quỹ đạo dừng K, L, M, N, O, P của electron; bán kính quỹ đạo $r_n = n^2 r_0$ với $r_0 = 5{,}3 \\cdot 10^{-11}$ m. Năng lượng của nguyên tử ở trạng thái dừng thứ $n$ là:',
        },
        {
          type: 'tex',
          tex: 'E_n = -\\dfrac{13{,}6}{n^2}\\ \\text{eV} \\qquad (n = 1, 2, 3, \\ldots)',
        },
        {
          type: 'table',
          caption: 'Các mức năng lượng của nguyên tử hydrogen',
          head: ['Mức', '$n$', '$E_n$ (eV)', '$E_n$ (J)'],
          rows: [
            ['K', '$1$', '$-13{,}6$', '$-2{,}176 \\cdot 10^{-18}$'],
            ['L', '$2$', '$-3{,}4$', '$-5{,}44 \\cdot 10^{-19}$'],
            ['M', '$3$', '$-1{,}51$', '$-2{,}42 \\cdot 10^{-19}$'],
            ['N', '$4$', '$-0{,}85$', '$-1{,}36 \\cdot 10^{-19}$'],
            ['O', '$5$', '$-0{,}544$', '$-8{,}70 \\cdot 10^{-20}$'],
            ['P', '$6$', '$-0{,}378$', '$-6{,}04 \\cdot 10^{-20}$'],
          ],
        },
        {
          type: 'p',
          text: 'Năng lượng âm có nghĩa electron bị liên kết với hạt nhân. Khi $n$ rất lớn, $E_n \\to 0$: electron thoát khỏi nguyên tử. Muốn ion hoá nguyên tử hydrogen ở trạng thái cơ bản cần năng lượng $13{,}6$ eV.',
        },
      ],
    },
    {
      heading: 'Giải thích quang phổ vạch',
      blocks: [
        {
          type: 'list',
          items: [
            'Quang phổ vạch phát xạ: khi chất khí bị kích thích, các nguyên tử lên trạng thái kích thích rồi chuyển về các trạng thái có năng lượng thấp hơn, mỗi lần phát ra một photon có $hf = E_n - E_m$. Vì các mức năng lượng là gián đoạn nên chỉ có một số tần số xác định: quang phổ là các vạch riêng lẻ.',
            'Quang phổ vạch hấp thụ: nguyên tử trong đám khí chỉ hấp thụ được những photon có năng lượng đúng bằng hiệu hai mức năng lượng của nó, nên ánh sáng trắng đi qua đám khí bị mất đúng những bước sóng đó: xuất hiện các vạch tối.',
            'Nguyên tử hấp thụ được photon có bước sóng nào thì cũng phát ra được photon có bước sóng ấy. Vì vậy các vạch tối trong quang phổ hấp thụ của một chất khí nằm đúng vị trí các vạch màu trong quang phổ phát xạ của nó.',
          ],
        },
        {
          type: 'table',
          caption: 'Bốn vạch nhìn thấy của hydrogen: electron chuyển về mức L (dãy Balmer)',
          head: ['Chuyển mức', '$\\varepsilon$ (eV)', '$\\lambda$ (nm)', 'Màu'],
          rows: [
            ['M → L', '$1{,}89$', '$658$', 'đỏ'],
            ['N → L', '$2{,}55$', '$487$', 'lam'],
            ['O → L', '$2{,}86$', '$435$', 'chàm'],
            ['P → L', '$3{,}02$', '$411$', 'tím'],
          ],
        },
        {
          type: 'p',
          text: 'Các chuyển mức về mức K cho bức xạ tử ngoại (dãy Lyman); các chuyển mức về mức M cho bức xạ hồng ngoại (dãy Paschen). Các bước sóng trong bảng được tính với $h = 6{,}625 \\cdot 10^{-34}$ J·s, $c = 3 \\cdot 10^8$ m/s; giá trị đo được của vạch đỏ là $656$ nm.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ứng dụng: phân tích quang phổ',
          text: 'Vì mỗi nguyên tố có quang phổ vạch riêng, từ các vạch quang phổ ta xác định được thành phần hoá học của một chất, kể cả của các ngôi sao ở rất xa. Các vạch tối trong quang phổ Mặt Trời cho biết khí quyển Mặt Trời có những nguyên tố nào; nguyên tố helium được phát hiện trên Mặt Trời trước khi tìm thấy trên Trái Đất.',
        },
      ],
    },
    {
      heading: 'Dự án: Chế tạo kính quang phổ đơn giản',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: chế tạo một kính quang phổ từ đĩa CD hoặc DVD cũ và quan sát quang phổ của nhiều nguồn sáng. Dụng cụ: hộp giấy cứng, đĩa CD hoặc DVD (bóc lớp phủ nhôm nếu cần), dao rọc giấy, băng dính đen, điện thoại để chụp ảnh. Không nhìn trực tiếp vào Mặt Trời.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Khoét một khe hẹp (khoảng $1$ mm) ở một đầu hộp; ở đầu kia gắn mảnh đĩa CD nghiêng khoảng $45^\\circ$ và khoét lỗ quan sát.',
            'Hướng khe vào lần lượt các nguồn: bóng đèn sợi đốt, đèn huỳnh quang (đèn tuýp, đèn compact), đèn LED trắng, ngọn lửa đèn cồn có rắc muối ăn.',
            'Chụp ảnh quang phổ của từng nguồn qua lỗ quan sát; xếp mỗi quang phổ vào một trong ba loại: liên tục, vạch phát xạ, vạch hấp thụ.',
            'Tra cứu quang phổ vạch của thuỷ ngân và natri, đối chiếu với ảnh chụp được để nhận ra các nguyên tố trong đèn huỳnh quang và trong ngọn lửa có muối.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Nộp ảnh kính quang phổ, bảng các nguồn sáng với loại quang phổ và các vạch nổi bật, và giải thích vì sao đèn huỳnh quang và ngọn lửa có muối cho các vạch riêng, còn bóng đèn sợi đốt cho dải màu liên tục.',
        },
      ],
    },
  ],
  explore: {
    title: 'Electron nhảy giữa các mức năng lượng',
    instruction:
      'Chọn một mức để electron của nguyên tử hydrogen chuyển tới. Đi lên, nguyên tử hấp thụ photon; đi xuống, nó phát ra photon. Quan sát năng lượng, bước sóng của photon và các vạch xuất hiện trên quang phổ phát xạ và hấp thụ.',
  },
  examples: [
    {
      problem:
        'Dựa vào các mức năng lượng của nguyên tử hydrogen, xác định bước sóng dài nhất của photon mà nguyên tử hydrogen ở trạng thái cơ bản có thể hấp thụ. Bức xạ đó thuộc vùng nào?',
      steps: [
        'Bước sóng dài nhất ứng với năng lượng photon nhỏ nhất, tức là chuyển từ K lên L: $\\varepsilon = E_L - E_K = -3{,}4 - (-13{,}6) = 10{,}2$ eV.',
        '$\\varepsilon = 10{,}2 \\cdot 1{,}6 \\cdot 10^{-19} = 1{,}632 \\cdot 10^{-18}$ J.',
        '$\\lambda = \\dfrac{hc}{\\varepsilon} = \\dfrac{6{,}625 \\cdot 10^{-34} \\cdot 3 \\cdot 10^8}{1{,}632 \\cdot 10^{-18}} \\approx 1{,}22 \\cdot 10^{-7}$ m $= 122$ nm, thuộc vùng tử ngoại.',
      ],
      answer: '$\\lambda \\approx 1{,}22 \\cdot 10^{-7}$ m, bức xạ tử ngoại.',
    },
    {
      problem:
        'Tính bước sóng của photon do nguyên tử hydrogen phát ra khi electron chuyển từ quỹ đạo M về quỹ đạo L. Photon đó có màu gì?',
      steps: [
        '$\\varepsilon = E_M - E_L = -\\dfrac{13{,}6}{9} + \\dfrac{13{,}6}{4} \\approx 1{,}89$ eV $\\approx 3{,}02 \\cdot 10^{-19}$ J.',
        '$\\lambda = \\dfrac{hc}{\\varepsilon} = \\dfrac{1{,}9875 \\cdot 10^{-25}}{3{,}02 \\cdot 10^{-19}} \\approx 6{,}58 \\cdot 10^{-7}$ m $\\approx 0{,}658$ μm.',
        'Bước sóng này nằm trong vùng ánh sáng đỏ: đó là vạch đỏ của quang phổ hydrogen.',
      ],
      answer: '$\\lambda \\approx 0{,}658$ μm, vạch màu đỏ.',
    },
    {
      problem:
        'Trong quang phổ hấp thụ của ánh sáng Mặt Trời có một vạch tối ở bước sóng khoảng $590$ nm. Tính năng lượng của photon bị hấp thụ ứng với vạch này.',
      steps: [
        '$\\varepsilon = \\dfrac{hc}{\\lambda} = \\dfrac{6{,}625 \\cdot 10^{-34} \\cdot 3 \\cdot 10^8}{590 \\cdot 10^{-9}} \\approx 3{,}37 \\cdot 10^{-19}$ J.',
        'Đổi ra eV: $\\dfrac{3{,}37 \\cdot 10^{-19}}{1{,}6 \\cdot 10^{-19}} \\approx 2{,}11$ eV. Năng lượng này bằng hiệu hai mức năng lượng của nguyên tử natri trong khí quyển Mặt Trời: đó là vạch vàng của natri.',
      ],
      answer: '$\\varepsilon \\approx 3{,}37 \\cdot 10^{-19}$ J $\\approx 2{,}11$ eV.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Quang phổ vạch phát xạ do',
      options: [
        'chất khí hay hơi ở áp suất thấp bị kích thích phát ra',
        'chất rắn bị nung nóng phát ra',
        'chất lỏng bị nung nóng phát ra',
        'chất khí ở áp suất lớn bị nung nóng phát ra',
      ],
      answer: 0,
      hints: ['Chất rắn, chất lỏng, chất khí áp suất lớn bị nung nóng cho loại quang phổ nào?'],
      solution:
        'Chất rắn, chất lỏng và chất khí ở áp suất lớn bị nung nóng cho quang phổ liên tục. Quang phổ vạch phát xạ do chất khí hay hơi ở áp suất thấp bị kích thích phát ra.',
    },
    {
      type: 'number',
      prompt:
        'Nguyên tử hydrogen chuyển từ trạng thái dừng N ($n = 4$) về trạng thái dừng L ($n = 2$). Tính năng lượng photon phát ra (theo eV).',
      answer: 2.55,
      tolerance: 0.01,
      unit: 'eV',
      hints: ['$E_n = -\\dfrac{13{,}6}{n^2}$ eV; $\\varepsilon = E_N - E_L$.'],
      solution:
        '$\\varepsilon = -\\dfrac{13{,}6}{16} + \\dfrac{13{,}6}{4} = -0{,}85 + 3{,}4 = 2{,}55$ eV.',
    },
    {
      type: 'number',
      prompt:
        'Bước sóng của photon ở câu trên là bao nhiêu nanômét (làm tròn đến hàng đơn vị)? Lấy $h = 6{,}625 \\cdot 10^{-34}$ J·s, $c = 3 \\cdot 10^8$ m/s, $1$ eV $= 1{,}6 \\cdot 10^{-19}$ J.',
      answer: 487,
      tolerance: 1,
      unit: 'nm',
      hints: ['Đổi $\\varepsilon$ ra jun rồi dùng $\\lambda = \\dfrac{hc}{\\varepsilon}$.'],
      solution:
        '$\\lambda = \\dfrac{1{,}9875 \\cdot 10^{-25}}{2{,}55 \\cdot 1{,}6 \\cdot 10^{-19}} \\approx 4{,}87 \\cdot 10^{-7}$ m $= 487$ nm (vạch lam).',
    },
    {
      type: 'number',
      prompt:
        'Năng lượng tối thiểu cần cung cấp để ion hoá nguyên tử hydrogen đang ở trạng thái cơ bản là bao nhiêu electronvôn?',
      answer: 13.6,
      tolerance: 0.01,
      unit: 'eV',
      hints: ['Ion hoá là đưa electron từ mức $E_1$ ra xa vô cùng, nơi $E = 0$.'],
      solution: '$W = 0 - E_1 = 0 - (-13{,}6) = 13{,}6$ eV.',
    },
    {
      type: 'multi',
      prompt:
        'Một nguyên tử hydrogen đang ở trạng thái cơ bản. Chọn tất cả các photon có thể bị nguyên tử này hấp thụ (không làm ion hoá).',
      options: ['Photon $10{,}2$ eV', 'Photon $12{,}09$ eV', 'Photon $11$ eV', 'Photon $5$ eV'],
      answers: [0, 1],
      hints: [
        'Nguyên tử chỉ hấp thụ photon có năng lượng đúng bằng $E_n - E_1$ với một $n$ nào đó.',
        '$E_2 - E_1 = 10{,}2$ eV, $E_3 - E_1 \\approx 12{,}09$ eV.',
      ],
      solution:
        '$E_2 - E_1 = 10{,}2$ eV và $E_3 - E_1 = 13{,}6\\left(1 - \\dfrac{1}{9}\\right) \\approx 12{,}09$ eV nên hai photon này bị hấp thụ. Không có mức nào cách mức cơ bản $11$ eV hay $5$ eV, nên các photon đó không bị hấp thụ.',
    },
    {
      type: 'number',
      prompt:
        'Một đám khí hydrogen được kích thích để các nguyên tử lên trạng thái N ($n = 4$). Khi các nguyên tử chuyển về các trạng thái thấp hơn, quang phổ phát xạ có tối đa bao nhiêu vạch?',
      answer: 6,
      hints: ['Đếm số cặp mức khác nhau trong bốn mức K, L, M, N.'],
      solution:
        'Mỗi vạch ứng với một cặp mức: N → M, N → L, N → K, M → L, M → K, L → K. Có $6$ vạch.',
    },
    {
      type: 'choice',
      prompt:
        'Vì sao vị trí các vạch tối trong quang phổ hấp thụ của khí hydrogen trùng với vị trí các vạch màu trong quang phổ phát xạ của nó?',
      options: [
        'Vì nguyên tử chỉ hấp thụ và phát xạ những photon có năng lượng bằng hiệu hai mức năng lượng của chính nó',
        'Vì khí hydrogen hấp thụ mọi bước sóng của ánh sáng trắng',
        'Vì ánh sáng trắng chỉ có bốn bước sóng',
        'Vì các vạch tối là bóng của các vạch màu',
      ],
      answer: 0,
      hints: [
        'So sánh $\\varepsilon$ của photon hấp thụ khi đi lên và photon phát ra khi đi xuống giữa cùng hai mức.',
      ],
      solution:
        'Đi lên hay đi xuống giữa cùng hai mức $E_m$, $E_n$ thì photon đều có $hf = E_n - E_m$. Nguyên tử hấp thụ được bước sóng nào thì phát ra được bước sóng ấy, nên các vạch trùng vị trí.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi nguồn sáng với loại quang phổ nó cho.',
      left: [
        'Dây tóc bóng đèn nóng sáng',
        'Ống chứa khí hydrogen loãng đang phóng điện',
        'Ánh sáng trắng đi qua hơi natri nguội hơn nguồn',
      ],
      right: ['Quang phổ liên tục', 'Quang phổ vạch phát xạ', 'Quang phổ vạch hấp thụ'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: [
        'Chất rắn nóng sáng, khí loãng bị kích thích, ánh sáng trắng qua đám khí: mỗi trường hợp cho một loại.',
      ],
      solution:
        'Chất rắn nóng sáng cho quang phổ liên tục; khí loãng bị kích thích cho quang phổ vạch phát xạ; ánh sáng trắng qua đám hơi nguội hơn nguồn cho quang phổ vạch hấp thụ.',
    },
    {
      type: 'number',
      prompt:
        'Một vạch tối trong quang phổ Mặt Trời có bước sóng $590$ nm. Năng lượng photon bị hấp thụ bằng bao nhiêu eV (làm tròn đến hai chữ số thập phân)?',
      answer: 2.11,
      tolerance: 0.01,
      unit: 'eV',
      hints: ['$\\varepsilon = \\dfrac{hc}{\\lambda}$, rồi chia cho $1{,}6 \\cdot 10^{-19}$.'],
      solution:
        '$\\varepsilon = \\dfrac{1{,}9875 \\cdot 10^{-25}}{5{,}9 \\cdot 10^{-7}} \\approx 3{,}37 \\cdot 10^{-19}$ J $\\approx 2{,}11$ eV.',
    },
    {
      type: 'choice',
      prompt: 'Vạch màu đỏ trong quang phổ của hydrogen ứng với sự chuyển của electron',
      options: [
        'từ quỹ đạo M về quỹ đạo L',
        'từ quỹ đạo L về quỹ đạo K',
        'từ quỹ đạo P về quỹ đạo L',
        'từ quỹ đạo N về quỹ đạo M',
      ],
      answer: 0,
      hints: [
        'Vạch đỏ có bước sóng dài nhất trong bốn vạch nhìn thấy, tức năng lượng photon nhỏ nhất trong các chuyển về mức L.',
      ],
      solution:
        'Bốn vạch nhìn thấy ứng với các chuyển về mức L. Vạch đỏ ($\\lambda \\approx 658$ nm theo bảng) có năng lượng nhỏ nhất, ứng với M → L ($1{,}89$ eV). L → K cho tia tử ngoại, N → M cho tia hồng ngoại.',
    },
  ],
  takeaways: [
    'Quang phổ liên tục do vật rắn, lỏng, khí áp suất lớn bị nung nóng; quang phổ vạch phát xạ do khí loãng bị kích thích; quang phổ vạch hấp thụ là các vạch tối trên nền quang phổ liên tục.',
    'Nguyên tử chỉ tồn tại ở các trạng thái dừng có năng lượng xác định; ở trạng thái dừng nó không bức xạ.',
    'Chuyển giữa hai trạng thái dừng, nguyên tử phát xạ hoặc hấp thụ một photon: $hf = E_n - E_m$.',
    'Nguyên tử hydrogen: $E_n = -\\dfrac{13{,}6}{n^2}$ eV; bốn vạch nhìn thấy (đỏ, lam, chàm, tím) ứng với các chuyển về mức L.',
    'Quang phổ vạch là bằng chứng cho sự tồn tại các mức năng lượng gián đoạn của electron trong nguyên tử.',
  ],
};
