import { useState } from 'react';
import axios from 'axios';

export default function useMoodCalendar() {
  const [daysDiary, setDaysDiary] = useState([
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
      diary_id: 5,
      date: '2024-04-04',
      content: '행복하당 ......',
      main_mood_color: 'FBCFE0',
    },
    {
      diary_id: 5,
      date: '2024-04-04',
      content: '행복하당 ......',
      main_mood_color: 'FBCFE0',
    },
  ]);

  const [moodcolorlist, setMoodcolorlist] = useState([
    'B5D3FF',
    'FBCFE0',
    null,
    'FBCFE0',
  ]);

  const getMoodColorList = (daysDiary) => {
    for (var i = 0; i < daysDiary.length; i++) {
      setMoodcolorlist([[...moodcolorlist, daysDiary[i].main_mood_color]]);
    }
    return moodcolorlist;
  };

  const getMoodCalendar = async (body, year, month) => {
    try {
      const getMoodCalendarResponse = await axios.get(
        `/diary/month/${year}/${month}`,
        body,
      );
      setDaysDiary(getMoodCalendarResponse.result);
      getMoodColorList(daysDiary);
    } catch (error) {
      const { message } = error.response.data;
      console.log(message);
    }
  };
  return { daysDiary, getMoodCalendar, moodcolorlist, setMoodcolorlist };
}
