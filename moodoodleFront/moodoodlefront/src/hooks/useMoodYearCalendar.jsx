import { useState } from 'react';
import axios from 'axios';

export default function useMoodYearCalendar() {
  const [monthlyDiary, setMonthlyDiary] = useState([
    {
      diary_id: 1,
      date: '2024-04-01',
      content: '오늘 너무 힘들었다. 운영체제 수업은 너무 어렵고 ....',
      main_mood_color: 'B5D3FF',
    },
    {
      diary_id: 2,
      date: '2024-04-02',
      content: '오늘은 드디어 감기가 다 나았다. 너무 기뻤다. ......',
      main_mood_color: 'FBCFE0',
    },
    {
      diary_id: null,
      date: '2024-04-03',
      content: null,
      main_mood_color: null,
    },
    {
      diary_id: 4,
      date: '2024-04-04',
      content: '행복하당 ......',
      main_mood_color: 'FBCFE0',
    },
    {
      diary_id: 5,
      date: '2024-04-04',
      content: '이것이 오늘이다 ......',
      main_mood_color: 'B5D3FF',
    },
    {
      diary_id: 6,
      date: '2024-04-04',
      content: '이것이 오늘이다 ......',
      main_mood_color: 'B5D3FF',
    },
    {
      diary_id: 7,
      date: '2024-04-04',
      content: '이것이 오늘이다 ......',
      main_mood_color: 'B5D3FF',
    },
    {
      diary_id: 8,
      date: '2024-05-08',
      content:
        '어제 밤에 과제 하느라 밤을 샜더니, 아침에 눈을 뜨는 게 너무 힘들었다. 그래도 점심으로 맛있는 부대찌개를 먹어서 기력이 충전됐다. 공강 시간에는 공소 팀플을 진행했다 ...',
      main_mood_color: 'B5D3FF',
    },
    {
      diary_id: 6,
      date: '2024-04-04',
      content: '이것이 오늘이다 ......',
      main_mood_color: 'FECFAD',
    },
    {
      diary_id: 6,
      date: '2024-04-04',
      content: '이것이 오늘이다 ......',
      main_mood_color: 'FECFAD',
    },
  ]);

  const [monthlyList, setMonthlyList] = useState({
    1: [null],
    2: [null],
    3: [null],
    4: [null],
    5: [null],
    6: [null],
    7: [null],
    8: [null],
    9: [null],
    10: [null],
    11: [null],
    12: [null],
  });

  const getMoodColorList = (monthlyDiary) => {
    for (var i = 0; i < monthlyDiary.length; i++) {
      setMonthlyList([[...monthlyList[i], monthlyDiary.month[i]]]);
    }
    return monthlyList;
  };

  const getMoodYearCalendar = async (year) => {
    try {
      const getMoodYearCalendarResponse = await axios.get(
        `/diary/year/${year}`,
        {
          user_id: localStorage.getItem('user_id'),
          year: { year },
        },
      );
      setMonthlyDiary(getMoodYearCalendarResponse.result);
      getMoodColorList(monthlyDiary);
    } catch (error) {
      const { message } = error.response.data;
      console.log(message);
    }
  };
  return {
    monthlyDiary,
    setMonthlyDiary,
    monthlyList,
    getMoodYearCalendar,
  };
}
