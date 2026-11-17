/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Chụp cộng hưởng từ (MRI) tạo ảnh có độ phân giải cao nhờ từ trường mạnh và sóng vô tuyến: proton hydrogen định hướng trong từ trường, cộng hưởng khi sóng vô tuyến có tần số bằng tần số Larmor, rồi phát sóng vô tuyến khi hồi phục với thời gian khác nhau ở mỗi mô.',
  intro:
    'Phòng chụp cộng hưởng từ có biển cấm mang vật bằng sắt; người bệnh tháo hết đồ kim loại, nằm trong một ống tròn và nghe những tiếng gõ rất to suốt mười mấy phút. Máy không dùng tia X nhưng lại cho ảnh não, tuỷ sống, khớp gối rõ hơn cả chụp cắt lớp. Từ trường và sóng vô tuyến "chụp" được bên trong cơ thể bằng cách nào?',
  objectives: [
    'Nêu được khái niệm chụp cộng hưởng từ và nguyên lí của nó dựa trên hiện tượng cộng hưởng từ hạt nhân.',
    'Nêu được tần số Larmor là gì và điều kiện xảy ra cộng hưởng từ hạt nhân.',
    'Mô tả được các bộ phận chính của máy chụp cộng hưởng từ.',
    'Nêu được ưu điểm, nhược điểm của chụp cộng hưởng từ và so sánh được với chụp cắt lớp.',
  ],
  sections: [
    {
      heading: 'Khái niệm và nguyên lí chụp cộng hưởng từ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Chụp cộng hưởng từ',
          text: 'Chụp cộng hưởng từ (MRI, Magnetic Resonance Imaging) là kĩ thuật chụp hình ảnh có độ phân giải cao của các bộ phận cơ thể nhờ từ trường và sóng vô tuyến. Nguyên lí của nó dựa trên hiện tượng cộng hưởng từ hạt nhân.',
        },
        {
          type: 'p',
          text: 'Cơ thể người chứa rất nhiều nguyên tử hydrogen (trong nước và mỡ), hạt nhân của chúng là proton. Mỗi proton được coi như một nam châm rất nhỏ có cực Bắc, cực Nam. Bình thường trục của các proton hướng hỗn loạn.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đặt cơ thể trong từ trường mạnh và không đổi, trục của các proton định hướng theo phương của từ trường ngoài để hệ ở mức năng lượng thấp. Đồng thời trục của proton quay quanh một trục song song với từ trường ngoài với một tần số xác định, gọi là tần số Larmor.',
            'Chiếu vào cơ thể sóng vô tuyến có tần số trùng với tần số Larmor, xảy ra hiện tượng cộng hưởng từ hạt nhân: các proton hấp thụ năng lượng của sóng vô tuyến và chuyển lên mức năng lượng cao hơn (trục bị lật khỏi phương của từ trường).',
            'Ngắt sóng vô tuyến, các proton trở về trạng thái ban đầu và phát ra sóng vô tuyến. Khoảng thời gian trở về gọi là thời gian hồi phục; nó phụ thuộc môi trường xung quanh proton, nên khác nhau ở mỡ, cơ, chất xám, dịch.',
            'Sóng vô tuyến do proton phát ra được thu lại; máy tính phân tích thời gian hồi phục ở từng vị trí để dựng ảnh cộng hưởng từ. Các mô có thời gian hồi phục khác nhau hiện lên với độ sáng khác nhau.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tần số Larmor của proton',
          text: 'Tần số Larmor tỉ lệ với cảm ứng từ: $f = \\bar{\\gamma}B$, với proton $\\bar{\\gamma} \\approx 42{,}58$ MHz/T. Máy MRI trong bệnh viện thường có $B = 1{,}5$ T hoặc $3$ T (gấp hàng chục nghìn lần từ trường Trái Đất), nên $f$ cỡ $64$ MHz đến $128$ MHz, nằm trong vùng sóng vô tuyến.',
        },
      ],
    },
    {
      heading: 'Cấu tạo của máy chụp cộng hưởng từ',
      blocks: [
        {
          type: 'table',
          caption: 'Các bộ phận chính của máy chụp cộng hưởng từ',
          head: ['Bộ phận', 'Vai trò'],
          rows: [
            [
              'Bộ phận tạo từ trường mạnh, không đổi (thường là nam châm điện siêu dẫn)',
              'Làm trục các proton định hướng theo từ trường và quay với tần số Larmor.',
            ],
            [
              'Các cuộn dây tạo từ trường biến thiên theo các hướng khác nhau (cuộn gradient)',
              'Làm từ trường, do đó tần số Larmor, ở mỗi vị trí hơi khác nhau, để biết tín hiệu đến từ lát cắt và điểm nào. Dòng điện đổi chiều liên tục trong các cuộn này gây ra tiếng gõ lớn khi chụp.',
            ],
            [
              'Bộ phận phát sóng vô tuyến có tần số thay đổi',
              'Phát các xung sóng vô tuyến có tần số bằng tần số Larmor của lát cần chụp.',
            ],
            [
              'Bộ phận thu sóng vô tuyến và máy tính',
              'Thu sóng vô tuyến do proton phát ra khi hồi phục, xử lí và dựng ảnh.',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Khi bật cuộn gradient, từ trường dọc cơ thể tăng dần đều, mỗi lát cắt có tần số Larmor riêng. Xung sóng vô tuyến ở một tần số chỉ làm cộng hưởng đúng lát có tần số ấy; đổi tần số là chọn được lát khác. Nhờ vậy máy chụp được ảnh theo nhiều mặt cắt (cắt ngang, đứng dọc, đứng ngang) mà người bệnh không phải đổi tư thế.',
        },
      ],
    },
    {
      heading: 'Ưu điểm và nhược điểm',
      blocks: [
        {
          type: 'list',
          items: [
            'Ưu điểm: ảnh có độ tương phản cao, sắc nét, chi tiết, đặc biệt với mô mềm (não, tuỷ sống, cơ, dây chằng, khớp); tái tạo được ảnh ba chiều; không dùng tia X, không có bức xạ ion hoá nên an toàn, không xâm lấn (không phải mổ, không đưa dụng cụ vào cơ thể), dùng được khi cần chụp nhiều lần; chụp mạch máu được mà không cần thuốc cản quang.',
            'Nhược điểm: không chụp được cho người có thiết bị kim loại trong cơ thể (máy tạo nhịp tim, máy trợ thính, mảnh kim loại cấy ghép, một số loại răng giả); không mang được thiết bị hồi sức vào phòng chụp; thời gian chụp lâu, không thích hợp cho cấp cứu; ảnh xương, vôi hoá kém hơn chụp cắt lớp; máy ồn, phải đeo nút tai; chi phí cao.',
          ],
        },
        {
          type: 'table',
          caption: 'So sánh chụp cộng hưởng từ và chụp cắt lớp',
          head: ['Tiêu chí', 'Cộng hưởng từ (MRI)', 'Cắt lớp (CT)'],
          rows: [
            ['Nguồn', 'Từ trường và sóng vô tuyến', 'Tia X'],
            ['An toàn', 'Không có bức xạ ion hoá', 'Có liều tia X'],
            ['Ảnh mô mềm', 'Tốt hơn nhiều', 'Kém hơn'],
            ['Xương, vôi hoá', 'Kém hơn', 'Phù hợp hơn'],
            ['Thời gian chụp', 'Khoảng $10$ đến $30$ phút', 'Khoảng $5$ đến $15$ phút'],
            ['Tiếng ồn', 'Lớn, cần bảo vệ tai', 'Nhẹ'],
            ['Chi phí', 'Cao', 'Thấp hơn'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'An toàn trong phòng chụp',
          text: 'Từ trường của máy luôn bật và rất mạnh: vật bằng sắt thép (kéo, bình oxy, xe lăn) có thể bị hút bay vào máy với tốc độ lớn. Người bệnh và người đi cùng phải khai báo, tháo bỏ mọi vật kim loại trước khi vào phòng.',
        },
      ],
    },
    {
      heading: 'Dự án: Chọn cách chụp phù hợp',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: trình bày được ưu điểm, nhược điểm của chụp cộng hưởng từ, so sánh với chụp cắt lớp, X-quang và siêu âm, rồi đề xuất cách chụp phù hợp cho từng tình huống. Hình thức: báo cáo trên giấy A0 hoặc bản trình chiếu, làm theo nhóm.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Tìm hiểu (sách, trang tin của bệnh viện) cấu tạo và quy trình chụp cộng hưởng từ; ghi lại các quy định an toàn của phòng chụp.',
            'Lập bảng so sánh bốn kĩ thuật X-quang, cắt lớp, siêu âm, cộng hưởng từ theo: tác nhân vật lí, ảnh thu được, mức an toàn, thời gian, chi phí.',
            'Với mỗi tình huống, chọn kĩ thuật và giải thích: nghi gãy xương cổ tay; theo dõi thai nhi; chấn thương sọ não cấp cứu; đau khớp gối kéo dài ở vận động viên; người có máy tạo nhịp tim cần chụp não.',
            'Trình bày trước lớp và trả lời câu hỏi của các nhóm khác.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Nộp bảng so sánh, các lựa chọn cho từng tình huống kèm lí do dựa trên nguyên lí vật lí của mỗi kĩ thuật.',
        },
      ],
    },
  ],
  explore: {
    title: 'Proton trong máy cộng hưởng từ',
    instruction:
      'Bật từ trường mạnh để các proton định hướng, chỉnh tần số sóng vô tuyến rồi phát xung: chỉ khi tần số bằng tần số Larmor mới có cộng hưởng. Quan sát các mô hồi phục nhanh chậm khác nhau, rồi bật cuộn gradient để chọn từng lát.',
  },
  examples: [
    {
      problem:
        'Tính tần số Larmor của proton trong máy MRI có $B = 1{,}5$ T và trong máy có $B = 3$ T. Lấy $\\bar{\\gamma} = 42{,}58$ MHz/T. Máy phải phát sóng vô tuyến tần số bao nhiêu để có cộng hưởng?',
      steps: [
        '$B = 1{,}5$ T: $f = \\bar{\\gamma}B = 42{,}58 \\cdot 1{,}5 = 63{,}87$ MHz.',
        '$B = 3$ T: $f = 42{,}58 \\cdot 3 = 127{,}74$ MHz, gấp đôi vì $f$ tỉ lệ với $B$.',
        'Cộng hưởng từ hạt nhân chỉ xảy ra khi tần số sóng vô tuyến trùng tần số Larmor, nên máy phải phát đúng các tần số này.',
      ],
      answer: '$63{,}87$ MHz và $127{,}74$ MHz.',
    },
    {
      problem:
        'Trong máy $1{,}5$ T, cuộn gradient làm từ trường tăng thêm $40$ mT trên mỗi mét dọc cơ thể. Hai lát cắt cách nhau $5$ cm có tần số Larmor chênh nhau bao nhiêu? Điều đó giúp gì cho việc tạo ảnh?',
      steps: [
        'Độ chênh từ trường: $\\Delta B = 0{,}04 \\cdot 0{,}05 = 2 \\cdot 10^{-3}$ T.',
        'Độ chênh tần số: $\\Delta f = \\bar{\\gamma}\\Delta B = 42{,}58 \\cdot 2 \\cdot 10^{-3} \\approx 0{,}085$ MHz $= 85$ kHz.',
        'Mỗi lát có tần số Larmor riêng; phát sóng vô tuyến ở tần số của lát nào thì chỉ lát đó cộng hưởng, máy biết tín hiệu thu được đến từ lát nào.',
      ],
      answer: 'Chênh khoảng $85$ kHz; nhờ đó máy chọn được lát cắt cần chụp.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Nguyên lí chụp cộng hưởng từ dựa trên hiện tượng nào?',
      options: [
        'Cộng hưởng từ hạt nhân',
        'Phản xạ sóng siêu âm',
        'Sự suy giảm của tia X qua các mô',
        'Hiện tượng phóng xạ',
      ],
      answer: 0,
      hints: ['Tên của kĩ thuật đã gợi ý hiện tượng.'],
      solution:
        'Chụp cộng hưởng từ dựa trên hiện tượng cộng hưởng từ hạt nhân của proton hydrogen trong từ trường mạnh khi được chiếu sóng vô tuyến có tần số bằng tần số Larmor.',
    },
    {
      type: 'choice',
      prompt: 'Tần số Larmor của proton là',
      options: [
        'tần số quay của trục proton quanh một trục song song với từ trường ngoài',
        'tần số của tia X dùng trong máy chụp',
        'số lần proton va chạm với nhau trong một giây',
        'tần số tiếng gõ phát ra khi máy hoạt động',
      ],
      answer: 0,
      hints: [
        'Trong từ trường mạnh, trục proton không đứng yên mà quay quanh phương của từ trường.',
      ],
      solution:
        'Đặt trong từ trường mạnh, không đổi, trục Bắc – Nam của proton quay quanh một trục song song với từ trường ngoài với tần số xác định: tần số Larmor.',
    },
    {
      type: 'choice',
      prompt: 'Hiện tượng cộng hưởng từ hạt nhân xảy ra khi',
      options: [
        'tần số sóng vô tuyến chiếu vào trùng với tần số Larmor của proton',
        'tắt từ trường ngoài',
        'cường độ sóng vô tuyến đủ lớn, với bất kì tần số nào',
        'proton chuyển động thẳng đều',
      ],
      answer: 0,
      hints: ['Giống mọi hiện tượng cộng hưởng: tần số kích thích bằng tần số riêng.'],
      solution:
        'Cộng hưởng xảy ra khi tần số sóng vô tuyến bằng tần số Larmor: proton hấp thụ năng lượng và chuyển lên mức năng lượng cao hơn. Sai tần số thì dù sóng mạnh cũng không có cộng hưởng.',
    },
    {
      type: 'number',
      prompt:
        'Tần số Larmor của proton là $f = \\bar{\\gamma}B$ với $\\bar{\\gamma} = 42{,}58$ MHz/T. Máy chụp có $B = 1{,}5$ T phải phát sóng vô tuyến tần số bao nhiêu megahéc để có cộng hưởng?',
      answer: 63.87,
      tolerance: 0.01,
      unit: 'MHz',
      hints: ['Thay số vào $f = \\bar{\\gamma}B$.'],
      solution: '$f = 42{,}58 \\cdot 1{,}5 = 63{,}87$ MHz.',
    },
    {
      type: 'number',
      prompt:
        'Trong máy cộng hưởng từ, cuộn gradient làm từ trường ở hai lát cắt chênh nhau $2$ mT. Tần số Larmor của hai lát chênh nhau bao nhiêu kilôhéc? Lấy $\\bar{\\gamma} = 42{,}58$ MHz/T.',
      answer: 85.16,
      tolerance: 0.05,
      unit: 'kHz',
      hints: ['$\\Delta f = \\bar{\\gamma}\\Delta B$, đổi $2$ mT $= 2 \\cdot 10^{-3}$ T.'],
      solution:
        '$\\Delta f = 42{,}58 \\cdot 2 \\cdot 10^{-3} = 0{,}08516$ MHz $\\approx 85{,}16$ kHz.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi bộ phận của máy chụp cộng hưởng từ với vai trò của nó.',
      left: [
        'Nam châm tạo từ trường mạnh, không đổi',
        'Các cuộn dây tạo từ trường biến thiên theo các hướng',
        'Bộ phát sóng vô tuyến có tần số thay đổi',
        'Bộ thu sóng vô tuyến và máy tính',
      ],
      right: [
        'Làm trục các proton định hướng theo từ trường',
        'Làm tần số Larmor khác nhau theo vị trí, để định vị lát cắt',
        'Gây cộng hưởng ở lát có tần số Larmor bằng tần số sóng',
        'Ghi tín hiệu proton phát ra khi hồi phục và dựng ảnh',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Theo thứ tự của quá trình: định hướng, chọn lát, lật proton, thu tín hiệu.'],
      solution:
        'Nam châm làm proton định hướng; cuộn gradient làm tần số Larmor phụ thuộc vị trí; bộ phát gây cộng hưởng; bộ thu và máy tính ghi sóng vô tuyến do proton phát ra khi hồi phục và dựng ảnh.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao ảnh cộng hưởng từ phân biệt được các mô khác nhau?',
      options: [
        'Proton trong các mô khác nhau có thời gian hồi phục khác nhau',
        'Các mô hấp thụ tia X khác nhau',
        'Các mô phản xạ siêu âm khác nhau',
        'Proton trong mỗi mô có điện tích khác nhau',
      ],
      answer: 0,
      hints: ['Máy tính dựng ảnh từ thông tin gì trong sóng vô tuyến thu được?'],
      solution:
        'Thời gian hồi phục của proton phụ thuộc môi trường xung quanh nó, nên khác nhau ở mỡ, cơ, chất xám, dịch. Máy tính phân tích thời gian hồi phục ở từng vị trí để tạo độ tương phản.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các ưu điểm của chụp cộng hưởng từ.',
      options: [
        'Không dùng tia X, không có bức xạ ion hoá',
        'Ảnh mô mềm có độ tương phản cao, sắc nét',
        'Tái tạo được ảnh ba chiều',
        'Thời gian chụp ngắn, thích hợp cấp cứu',
        'Chụp được cho người có máy tạo nhịp tim',
        'Chi phí thấp hơn chụp cắt lớp',
      ],
      answers: [0, 1, 2],
      hints: ['Ba lựa chọn còn lại là nhược điểm của MRI hoặc thuộc về kĩ thuật khác.'],
      solution:
        'MRI an toàn vì không có bức xạ ion hoá, ảnh mô mềm rõ, dựng được ảnh ba chiều. Nhưng MRI chụp lâu, chi phí cao và không chụp được cho người có máy tạo nhịp tim.',
    },
    {
      type: 'multi',
      prompt: 'Trong những trường hợp nào nên chọn chụp cắt lớp thay cho chụp cộng hưởng từ?',
      options: [
        'Người bệnh có máy tạo nhịp tim',
        'Chấn thương sọ não cần chẩn đoán cấp cứu',
        'Cần quan sát tổn thương xương, vôi hoá',
        'Cần chụp mô mềm nhiều lần mà tránh bức xạ',
        'Thai phụ cần kiểm tra không dùng tia X',
      ],
      answers: [0, 1, 2],
      hints: ['Nghĩ đến kim loại trong cơ thể, thời gian chụp và loại mô.'],
      solution:
        'Chụp cắt lớp hợp với người có thiết bị kim loại, ca cấp cứu (chụp nhanh) và tổn thương xương, vôi hoá. Khi cần chụp mô mềm nhiều lần hoặc tránh tia X thì chọn cộng hưởng từ.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao chụp cộng hưởng từ được coi là an toàn hơn chụp cắt lớp?',
      options: [
        'Dùng từ trường và sóng vô tuyến, không có bức xạ ion hoá như tia X',
        'Thời gian chụp ngắn hơn',
        'Người bệnh không phải nằm yên',
        'Máy hoạt động êm hơn',
      ],
      answer: 0,
      hints: ['Chụp cắt lớp dùng tác nhân nào có thể huỷ diệt tế bào?'],
      solution:
        'Chụp cắt lớp dùng tia X là bức xạ ion hoá. Chụp cộng hưởng từ chỉ dùng từ trường và sóng vô tuyến, rủi ro rất hiếm, nên an toàn hơn, nhất là khi phải chụp nhiều lần.',
    },
  ],
  takeaways: [
    'Chụp cộng hưởng từ tạo ảnh độ phân giải cao nhờ từ trường mạnh và sóng vô tuyến, dựa trên hiện tượng cộng hưởng từ hạt nhân của proton hydrogen.',
    'Trong từ trường mạnh, trục proton định hướng theo từ trường và quay quanh phương của nó với tần số Larmor ($f = \\bar{\\gamma}B$, $\\bar{\\gamma} \\approx 42{,}58$ MHz/T).',
    'Sóng vô tuyến có tần số bằng tần số Larmor gây cộng hưởng; khi ngắt sóng, proton hồi phục và phát sóng vô tuyến, thời gian hồi phục khác nhau ở mỗi mô tạo nên độ tương phản.',
    'Máy gồm nam châm tạo từ trường mạnh, cuộn gradient, bộ phát và bộ thu sóng vô tuyến; MRI an toàn, ảnh mô mềm rất tốt nhưng chụp lâu, ồn, đắt và cấm kim loại.',
  ],
};
