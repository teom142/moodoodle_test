import React, { useState } from 'react';
import dayjs from 'dayjs';
import useMoodYearCalendar from '../hooks/useMoodYearCalendar';

export default function useRenderYearCalendar({ year }) {
  const { monthlyDiary, setMonthlyDiary, monthlyList, getMoodYearCalendar } =
    useMoodYearCalendar();

  const content = (
    <div className='flex flex-col w-[168px] h-[459px] justify-between'>
      <div className='w-[11.6px] h-[11.6px] rounded-[3px] bg-gray-scale-1'></div>
    </div>
  );
  return content;
}
