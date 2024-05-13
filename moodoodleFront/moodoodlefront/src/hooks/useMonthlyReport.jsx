import { useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

export default function useMonthlyReport() {
  const [date, setDate] = useState({
    year: dayjs().format('YYYY'),
    month: dayjs().format('MM'),
  });
  const [monthlyReport, setMonthlyReport] = useState({
    mood_color_list: [
      {
        mood_color: 'FBCFE0',
        total_ratio: 100,
      },
      {
        mood_color: 'FEF4A0',
        total_ratio: 56,
      },
      {
        mood_color: 'B5D3FF',
        total_ratio: 20,
      },
      {
        mood_color: 'FF9191',
        total_ratio: 14,
      },
      {
        mood_color: 'DBD3FB',
        total_ratio: 10,
      },
    ],
  });
  const [monthTagList, setMonthTagList] = useState({
    month_tag_list: [
      {
        tag_title: '성취감',
        tag_color: 'FEF4A0',
        tag_ratio: 56,
      },
      {
        tag_title: '행복',
        tag_color: 'FBCFE0',
        tag_ratio: 50,
      },
      {
        tag_title: '기쁨',
        tag_color: 'FBCFE0',
        tag_ratio: 50,
      },
      {
        tag_title: '외로운',
        tag_color: 'B5D3FF',
        tag_ratio: 20,
      },
      {
        tag_title: '화남',
        tag_color: 'FF9191',
        tag_ratio: 7,
      },
    ],
  });

  const getMonthlyReport = async () => {
    try {
      const getMonthlyReportResponse = await axios.get(
        `/user/mypage/report/${date.year}/${date.month}`,
        {
          user_id: localStorage.getItem('user_id'),
          year: date.year,
          month: date.month,
        },
      );
      setMonthlyReport(getMonthlyReportResponse.detail[0]);
      setMonthTagList(getMonthlyReportResponse.detail[1]);
    } catch (error) {
      const { message } = error.response.data;
      console.log(message);
    }
  };

  return { monthlyReport, monthTagList, date, setDate, getMonthlyReport };
}
