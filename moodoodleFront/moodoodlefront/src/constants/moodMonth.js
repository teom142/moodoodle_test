const mooodMonth = {
  code: 201,
  success: true,
  msg: '요청에 성공하였습니다.',
  result: [
    {
      title: '4월 16일 화요일...',
      date: '2024-04-16',
      content: '오늘 너무 힘들었다. 운영체제 수업은 너무 어렵고 ....',
      mood: [
        {
          title: '슬픔',
          ratio: 60,
        },
        {
          title: '분노',
          ratio: 20,
        },
        {
          title: '기쁨',
          ratio: 20,
        },
      ],
    },
    {
      title: '4월 15일 월요일',
      date: '2024-04-15',
      content: '오늘은 드디어 감기가 다 나았다. 너무 기뻤다. ......',
      mood: [
        {
          title: '기쁨',
          ratio: 70,
        },
        {
          title: '슬픔',
          ratio: 20,
        },
        {
          title: '우울함',
          ratio: 10,
        },
      ],
    },
  ],
};

export default mooodMonth;
