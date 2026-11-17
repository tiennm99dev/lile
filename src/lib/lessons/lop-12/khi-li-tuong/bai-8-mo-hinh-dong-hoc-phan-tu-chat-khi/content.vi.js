/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Mô hình động học phân tử chất khí: chất khí gồm các phân tử rất nhỏ so với khoảng cách giữa chúng, lực liên kết rất yếu; các phân tử chuyển động hỗn loạn không ngừng, càng nhanh khi nhiệt độ càng cao, và va chạm vào thành bình gây ra áp suất. Chuyển động Brown là bằng chứng của chuyển động hỗn loạn đó. Khí lí tưởng là khí mà phân tử được coi là chất điểm, chỉ tương tác khi va chạm.',
  intro:
    'Bơm căng một quả bóng rồi thả tay, không khí phụt ra rất mạnh. Không khí trong bóng không có hình dạng, không nhìn thấy được, vậy cái gì đã đẩy căng thành quả bóng từ bên trong? Để trả lời, ta cần một mô hình về các phân tử khí và cách chúng chuyển động.',
  objectives: [
    'Mô tả được chuyển động Brown và giải thích được nguyên nhân của nó.',
    'Nêu được các nội dung cơ bản của mô hình động học phân tử chất khí.',
    'Nêu được thế nào là khí lí tưởng.',
    'Giải thích được sơ lược áp suất chất khí bằng va chạm của các phân tử khí lên thành bình.',
  ],
  sections: [
    {
      heading: 'Chuyển động và tương tác của các phân tử khí',
      blocks: [
        {
          type: 'p',
          text: 'Năm 1827, nhà thực vật học Brown quan sát các hạt phấn hoa trong nước qua kính hiển vi và thấy chúng chuyển động không ngừng theo những đường gấp khúc bất kì. Với chất khí, có thể quan sát các hạt khói nhỏ trong một hộp kính được chiếu sáng: các hạt khói cũng chuyển động hỗn loạn như vậy. Chuyển động này gọi là chuyển động Brown.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nguyên nhân của chuyển động Brown',
          text: 'Các phân tử khí (hay chất lỏng) chuyển động hỗn loạn không ngừng, va chạm vào hạt từ mọi phía. Hạt đủ nhỏ nên các va chạm từ các phía không cân bằng nhau, hợp lực của chúng thay đổi liên tục về hướng và độ lớn, làm hạt chuyển động hỗn loạn. Như vậy, chuyển động Brown chứng tỏ các phân tử chuyển động hỗn loạn không ngừng.',
        },
        {
          type: 'p',
          text: 'Giữa các phân tử khí cũng có lực hút và lực đẩy (lực liên kết phân tử). Nhưng khoảng cách giữa các phân tử khí rất lớn so với kích thước của chúng nên lực liên kết rất yếu so với ở chất lỏng và chất rắn. Vì thế chất khí không có hình dạng và thể tích riêng, luôn chiếm toàn bộ bình chứa, dễ nén và khuếch tán nhanh.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Không nhầm lẫn',
          text: 'Các hạt bụi nhảy múa trong vệt nắng chiếu qua khe cửa chủ yếu bị các luồng không khí đối lưu cuốn đi. Hạt bụi khá lớn và chuyển động theo luồng khí, nên đó không phải chuyển động Brown.',
        },
      ],
    },
    {
      heading: 'Mô hình động học phân tử chất khí',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Mô hình động học phân tử chất khí',
          text: '1. Chất khí được cấu tạo từ các phân tử có kích thước rất nhỏ so với khoảng cách giữa chúng; lực liên kết giữa các phân tử rất yếu. 2. Các phân tử khí chuyển động hỗn loạn không ngừng; chuyển động này càng nhanh thì nhiệt độ của chất khí càng cao. 3. Khi chuyển động hỗn loạn, các phân tử khí va chạm vào nhau và va chạm vào thành bình; khi va chạm với thành bình, chúng tác dụng lực lên thành bình, gây ra áp suất của chất khí lên thành bình.',
        },
        {
          type: 'table',
          head: ['Nội dung của mô hình', 'Hiện tượng minh hoạ'],
          rows: [
            [
              'Phân tử khí chuyển động hỗn loạn, không ngừng',
              'Chuyển động Brown của hạt khói trong không khí',
            ],
            [
              'Kích thước phân tử rất nhỏ so với khoảng cách giữa chúng',
              'Chất khí dễ nén; mùi nước hoa lan nhanh khắp phòng (khuếch tán)',
            ],
            [
              'Phân tử va chạm vào thành bình gây ra áp suất',
              'Không khí trong quả bóng đẩy căng vỏ bóng; nén pít-tông thấy lực cản tăng',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Áp suất của khí lên thành bình là kết quả của rất nhiều va chạm. Mỗi lần va chạm, phân tử đổi hướng chuyển động và đẩy thành bình một lực rất nhỏ trong thời gian rất ngắn; vô số va chạm liên tiếp tạo thành một lực gần như không đổi trên mỗi đơn vị diện tích. Số va chạm càng nhiều (mật độ phân tử lớn) và mỗi va chạm càng mạnh (phân tử chuyển động nhanh, tức nhiệt độ cao) thì áp suất càng lớn.',
        },
      ],
    },
    {
      heading: 'Khí lí tưởng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Khí lí tưởng',
          text: 'Khí lí tưởng là chất khí trong đó các phân tử được coi là chất điểm (bỏ qua thể tích riêng của chúng) và chỉ tương tác với nhau khi va chạm; va chạm của phân tử với nhau và với thành bình là va chạm đàn hồi.',
        },
        {
          type: 'p',
          text: 'Mô hình khí lí tưởng giúp mô tả chất khí một cách đơn giản. Ở áp suất và nhiệt độ thông thường (chẳng hạn không khí trong phòng), khoảng cách giữa các phân tử rất lớn so với kích thước của chúng nên các khí thực như oxygen, nitrogen, không khí… có thể coi gần đúng là khí lí tưởng. Ở áp suất rất cao hoặc nhiệt độ rất thấp, các phân tử ở gần nhau, lực liên kết không còn bỏ qua được và khí thực khác xa khí lí tưởng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Hộp khí và hạt Brown',
    instruction:
      'Quan sát các phân tử khí (chấm xanh) bay thẳng, va chạm vào thành hộp rồi bật lại, và hạt Brown lớn bị chúng va chạm từ mọi phía. Bấm "Nhìn như qua kính hiển vi" để chỉ thấy hạt Brown và quỹ đạo gấp khúc của nó. Thay đổi số phân tử và nhiệt độ, so sánh số va chạm lên thành bình mỗi giây.',
  },
  examples: [
    {
      problem:
        'Dùng mô hình động học phân tử, giải thích vì sao khi nén khí trong một xi lanh (nhiệt độ không đổi) thì áp suất khí tăng.',
      steps: [
        'Khi nén, số phân tử khí không đổi nhưng thể tích giảm, nên số phân tử trong một đơn vị thể tích (mật độ phân tử) tăng.',
        'Nhiệt độ không đổi nên các phân tử vẫn chuyển động nhanh như trước, mỗi va chạm lên thành bình vẫn mạnh như trước.',
        'Mật độ phân tử tăng nên số va chạm lên mỗi đơn vị diện tích thành bình trong mỗi giây tăng.',
        'Tổng lực tác dụng lên mỗi đơn vị diện tích tăng, tức áp suất khí tăng.',
      ],
      answer:
        'Áp suất tăng vì mật độ phân tử tăng làm số va chạm lên thành bình trong mỗi giây tăng.',
    },
    {
      problem:
        'Một bình kín có thể tích không đổi chứa khí được đun nóng. Dùng mô hình động học phân tử, dự đoán áp suất khí thay đổi thế nào.',
      steps: [
        'Bình kín, thể tích không đổi nên mật độ phân tử không đổi.',
        'Nhiệt độ tăng nên các phân tử chuyển động nhanh hơn.',
        'Phân tử nhanh hơn thì va chạm lên thành bình thường xuyên hơn và mỗi lần va chạm tác dụng lực mạnh hơn.',
      ],
      answer: 'Áp suất khí trong bình tăng khi nhiệt độ tăng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Nguyên nhân gây ra chuyển động Brown của các hạt khói trong không khí là',
      options: [
        'các phân tử không khí chuyển động hỗn loạn va chạm vào hạt khói từ mọi phía',
        'các hạt khói hút và đẩy nhau',
        'các luồng không khí đối lưu cuốn hạt khói đi',
        'trọng lực tác dụng lên hạt khói',
      ],
      answer: 0,
      hints: [
        'Chuyển động Brown là bằng chứng cho chuyển động của các phân tử môi trường xung quanh hạt.',
      ],
      solution:
        'Các phân tử không khí chuyển động hỗn loạn không ngừng, va chạm vào hạt khói từ mọi phía; các va chạm không cân bằng nhau nên hạt khói chuyển động hỗn loạn. Luồng đối lưu làm bụi bay theo dòng khí, không phải chuyển động Brown.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các nội dung thuộc mô hình động học phân tử chất khí.',
      options: [
        'Kích thước phân tử khí rất nhỏ so với khoảng cách giữa chúng',
        'Các phân tử khí chuyển động hỗn loạn không ngừng',
        'Nhiệt độ càng cao thì phân tử khí chuyển động càng nhanh',
        'Va chạm của phân tử khí vào thành bình gây ra áp suất',
        'Các phân tử khí dao động quanh vị trí cân bằng xác định',
      ],
      answers: [0, 1, 2, 3],
      hints: ['Mô hình nói về kích thước và khoảng cách, chuyển động, và va chạm của phân tử khí.'],
      solution:
        'Bốn phát biểu về kích thước, chuyển động hỗn loạn, nhiệt độ và va chạm gây áp suất là nội dung của mô hình. Dao động quanh vị trí cân bằng xác định là đặc điểm của phân tử chất rắn.',
    },
    {
      type: 'choice',
      prompt: 'Theo mô hình khí lí tưởng, phát biểu nào sau đây là đúng?',
      options: [
        'Các phân tử được coi là chất điểm và chỉ tương tác khi va chạm',
        'Các phân tử hút nhau mạnh khi ở xa nhau',
        'Thể tích riêng của các phân tử chiếm phần lớn thể tích bình',
        'Va chạm của phân tử với thành bình làm mất động năng của phân tử',
      ],
      answer: 0,
      hints: ['Khí lí tưởng bỏ qua những gì của phân tử?'],
      solution:
        'Khí lí tưởng: phân tử là chất điểm (bỏ qua thể tích riêng), bỏ qua tương tác khi chưa va chạm, va chạm là đàn hồi nên động năng không mất đi.',
    },
    {
      type: 'choice',
      prompt: 'Áp suất của chất khí lên thành bình là do',
      options: [
        'các phân tử khí va chạm vào thành bình',
        'trọng lượng của các phân tử khí',
        'lực hút giữa các phân tử khí và thành bình',
        'lực đẩy giữa các phân tử khí với nhau',
      ],
      answer: 0,
      hints: ['Xem nội dung thứ ba của mô hình động học phân tử chất khí.'],
      solution:
        'Khi va chạm với thành bình, các phân tử khí tác dụng lực lên thành bình; tổng hợp rất nhiều va chạm gây ra áp suất khí.',
    },
    {
      type: 'choice',
      prompt:
        'Giữ nguyên thể tích bình và tăng số phân tử khí trong bình lên gấp đôi, nhiệt độ không đổi. Số va chạm của phân tử lên thành bình trong mỗi giây',
      options: ['tăng khoảng gấp đôi', 'không đổi', 'giảm một nửa', 'tăng gấp bốn'],
      answer: 0,
      hints: [
        'Mỗi phân tử vẫn chuyển động nhanh như cũ, nên mỗi phân tử va chạm thành bình số lần như cũ trong mỗi giây.',
      ],
      solution:
        'Nhiệt độ không đổi nên mỗi phân tử va chạm thành bình với tần suất như cũ; số phân tử gấp đôi nên tổng số va chạm mỗi giây tăng khoảng gấp đôi, áp suất cũng tăng gấp đôi.',
    },
    {
      type: 'match',
      prompt: 'Ghép mỗi hiện tượng với nội dung của mô hình động học phân tử mà nó minh hoạ.',
      left: ['Chuyển động Brown của hạt khói', 'Khí dễ nén', 'Quả bóng bay căng phồng'],
      right: [
        'Phân tử khí chuyển động hỗn loạn không ngừng',
        'Khoảng cách giữa các phân tử khí rất lớn so với kích thước của chúng',
        'Va chạm của phân tử khí lên thành bình gây ra áp suất',
        'Phân tử khí dao động quanh vị trí cân bằng',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: [
        'Mỗi hiện tượng gắn với một trong ba nội dung của mô hình; một lựa chọn bên phải là thừa.',
      ],
      solution:
        'Chuyển động Brown ↔ chuyển động hỗn loạn; khí dễ nén ↔ khoảng cách lớn giữa các phân tử; bóng căng ↔ va chạm lên thành gây áp suất. Dao động quanh vị trí cân bằng là của chất rắn.',
    },
    {
      type: 'choice',
      prompt: 'Trường hợp nào sau đây một khí thực khác xa khí lí tưởng nhất?',
      options: [
        'Khí bị nén ở áp suất rất cao và nhiệt độ rất thấp',
        'Không khí trong phòng học',
        'Khí oxygen trong bình ở áp suất khí quyển và nhiệt độ phòng',
        'Khí loãng ở nhiệt độ cao',
      ],
      answer: 0,
      hints: [
        'Khi nào các phân tử ở gần nhau, không còn bỏ qua được thể tích riêng và lực liên kết?',
      ],
      solution:
        'Ở áp suất rất cao và nhiệt độ rất thấp, các phân tử ở gần nhau nên thể tích riêng và lực liên kết không bỏ qua được: khí thực khác xa khí lí tưởng. Các trường hợp khí loãng, nhiệt độ thường hay cao gần đúng là khí lí tưởng.',
    },
  ],
  takeaways: [
    'Chuyển động Brown: hạt nhỏ trong chất lỏng hay chất khí chuyển động hỗn loạn do các phân tử va chạm vào nó từ mọi phía; nó chứng tỏ phân tử chuyển động hỗn loạn không ngừng.',
    'Mô hình động học phân tử chất khí: phân tử rất nhỏ so với khoảng cách giữa chúng, lực liên kết rất yếu; chuyển động hỗn loạn không ngừng, càng nhanh khi nhiệt độ càng cao; va chạm vào thành bình gây ra áp suất.',
    'Khí lí tưởng: phân tử là chất điểm, chỉ tương tác khi va chạm, va chạm đàn hồi. Khí thực ở điều kiện thường gần đúng là khí lí tưởng.',
  ],
};
