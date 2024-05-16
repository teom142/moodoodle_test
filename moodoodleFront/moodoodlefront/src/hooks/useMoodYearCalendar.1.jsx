import { useState } from 'react';
import axios from 'axios';

export default function useMoodYearCalendar() {
  const [monthlyDiary, setMonthlyDiary] = useState([
    {
      month: 1,
      data: [
        {
          diary_id: 3,
          date: '2024-01-01',
          main_mood_color: 'FBCFE0',
        },
        {
          diary_id: null,
          date: '2024-01-02',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-01-03',
          main_mood_color: null,
        },
        {
          diary_id: 5,
          date: '2024-01-04',
          main_mood_color: 'FEF4A0',
        },
        {
          diary_id: 39,
          date: '2024-01-05',
          main_mood_color: 'FBCFE0',
        },
        {
          diary_id: null,
          date: '2024-01-06',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-01-07',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-01-08',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-01-09',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-01-10',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-01-11',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-01-12',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-01-13',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-01-14',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-01-15',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-01-16',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-01-17',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-01-18',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-01-19',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-01-20',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-01-21',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-01-22',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-01-23',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-01-24',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-01-25',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-01-26',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-01-27',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-01-28',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-01-29',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-01-30',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-01-31',
          main_mood_color: null,
        },
      ],
    },
    {
      month: 2,
      data: [
        {
          diary_id: 40,
          date: '2024-02-01',
          main_mood_color: 'FBCFE0',
        },
        {
          diary_id: 45,
          date: '2024-02-02',
          main_mood_color: 'FEF4A0',
        },
        {
          diary_id: 56,
          date: '2024-02-03',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-02-04',
          main_mood_color: null,
        },
        {
          diary_id: 128,
          date: '2024-02-29',
          main_mood_color: 'FBCFE0',
        },
      ],
    },
    {
      month: 12,
      data: [
        {
          diary_id: null,
          date: '2024-12-01',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-12-02',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-12-03',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-12-04',
          main_mood_color: null,
        },
        {
          diary_id: null,
          date: '2024-12-31',
          main_mood_color: null,
        },
      ],
    },
  ]);

  const [monthlyList, setMonthlyList] = useState([
    [
      {
        diary_id: 3,
        date: '2024-01-01',
        main_mood_color: 'FBCFE0',
      },
      {
        diary_id: null,
        date: '2024-01-02',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-01-03',
        main_mood_color: null,
      },
      {
        diary_id: 5,
        date: '2024-01-04',
        main_mood_color: 'FEF4A0',
      },
      {
        diary_id: 39,
        date: '2024-01-05',
        main_mood_color: 'FBCFE0',
      },
      {
        diary_id: null,
        date: '2024-01-06',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-01-07',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-01-08',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-01-09',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-01-10',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-01-11',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-01-12',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-01-13',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-01-14',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-01-15',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-01-16',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-01-17',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-01-18',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-01-19',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-01-20',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-01-21',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-01-22',
        main_mood_color: 'B5D3FF',
      },
      {
        diary_id: null,
        date: '2024-01-23',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-01-24',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-01-25',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-01-26',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-01-27',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-01-28',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-01-29',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-01-30',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-01-31',
        main_mood_color: null,
      },
    ],
    [
      {
        diary_id: 40,
        date: '2024-02-01',
        main_mood_color: 'FBCFE0',
      },
      {
        diary_id: 45,
        date: '2024-02-02',
        main_mood_color: 'FEF4A0',
      },
      {
        diary_id: null,
        date: '2024-02-03',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-02-04',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-02-05',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-02-06',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-02-07',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-02-08',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-02-09',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-02-10',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-02-11',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-02-12',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-02-13',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-02-14',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-02-15',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-02-16',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-02-17',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-02-18',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-02-19',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-02-20',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-02-21',
        main_mood_color: null,
      },
      {
        diary_id: 123,
        date: '2024-02-22',
        main_mood_color: 'FBCFE0',
      },
      {
        diary_id: 124,
        date: '2024-02-23',
        main_mood_color: 'FBCFE0',
      },
      {
        diary_id: 125,
        date: '2024-02-24',
        main_mood_color: 'FBCFE0',
      },
      {
        diary_id: 126,
        date: '2024-02-25',
        main_mood_color: 'FBCFE0',
      },
      {
        diary_id: 127,
        date: '2024-02-26',
        main_mood_color: 'FBCFE0',
      },
      {
        diary_id: 130,
        date: '2024-02-27',
        main_mood_color: 'FBCFE0',
      },
      {
        diary_id: 129,
        date: '2024-02-28',
        main_mood_color: 'FBCFE0',
      },
      {
        diary_id: 131,
        date: '2024-02-29',
        main_mood_color: 'FBCFE0',
      },
    ],
    [null],
    [null],
    [null],
    [null],
    [null],
    [null],
    [null],
    [null],
    [null],
    [
      {
        diary_id: null,
        date: '2024-12-01',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-12-02',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-12-03',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-12-04',
        main_mood_color: null,
      },
      {
        diary_id: null,
        date: '2024-12-31',
        main_mood_color: null,
      },
    ],
  ]);

  const getMonthlyList = (monthlyDiary) => {
    for (var i = 0; i < 12; i++) {
      setMonthlyList([...monthlyList, [monthlyDiary[i].data]]);
    }
    return monthlyList;
  };

  const getNullMoodColorList = (monthlyDiary) => {
    for (var i = 0; i < 12; i++) {
      setMonthlyList([[...monthlyList, null]]);
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
      getMonthlyList(monthlyDiary);
    } catch (error) {
      const { message } = error.response.data;
      <window className='alert'>{message}</window>;
      if ((error.response = 401)) {
        getNullMoodColorList(monthlyDiary);
      }
    }
  };

  return {
    monthlyList,
    getMoodYearCalendar,
  };
}
