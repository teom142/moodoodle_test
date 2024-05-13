import React, { useState } from 'react';
import dayjs from 'dayjs';
import useMoodYearCalendar from '../hooks/useMoodYearCalendar';

export default function useRenderYearCalendar({ year }) {
  const { monthlyDiary, setMonthlyDiary, monthlyList, getMoodYearCalendar } =
    useMoodYearCalendar();

  const content = (
    <div className='flex flex-row w-[168px] h-[459px] justify-between'>
      <div className='flex flex-col justify-between'>
        <div
          className={`h-[459px] grid grid-rows-${dayjs().month(1).daysInMonth()}`}
        >
          <div className='w-[11.6px] h-[11.6px] rounded-[3px] bg-gray-scale-1' />
        </div>
      </div>
      <div className={`grid grid-rows-${dayjs(year).month(2).daysInMonth()}`}>
        <div className='w-[11.6px] h-[11.6px] rounded-[3px] bg-gray-scale-1' />
      </div>
      <div className={`grid grid-rows-${dayjs(year).month(3).daysInMonth()}`}>
        <div className='w-[11.6px] h-[11.6px] rounded-[3px] bg-gray-scale-1' />
      </div>
      <div className={`grid grid-rows-${dayjs(year).month(4).daysInMonth()}`}>
        <div className='w-[11.6px] h-[11.6px] rounded-[3px] bg-gray-scale-1' />
      </div>
      <div className={`grid grid-rows-${dayjs(year).month(5).daysInMonth()}`}>
        <div className='w-[11.6px] h-[11.6px] rounded-[3px] bg-gray-scale-1' />
      </div>
      <div className={`grid grid-rows-${dayjs(year).month(6).daysInMonth()}`}>
        <div className='w-[11.6px] h-[11.6px] rounded-[3px] bg-gray-scale-1' />
      </div>
      <div className={`grid grid-rows-${dayjs(year).month(7).daysInMonth()}`}>
        <div className='w-[11.6px] h-[11.6px] rounded-[3px] bg-gray-scale-1' />
      </div>
      <div className={`grid grid-rows-${dayjs(year).month(8).daysInMonth()}`}>
        <div className='w-[11.6px] h-[11.6px] rounded-[3px] bg-gray-scale-1' />
      </div>
      <div className={`grid grid-rows-${dayjs(year).month(9).daysInMonth()}`}>
        <div className='w-[11.6px] h-[11.6px] rounded-[3px] bg-gray-scale-1' />
      </div>
      <div className={`grid grid-rows-${dayjs(year).month(10).daysInMonth()}`}>
        <div className='w-[11.6px] h-[11.6px] rounded-[3px] bg-gray-scale-1' />
      </div>
      <div className={`grid grid-rows-${dayjs(year).month(11).daysInMonth()}`}>
        <div className='w-[11.6px] h-[11.6px] rounded-[3px] bg-gray-scale-1' />
      </div>
      <div className={`grid grid-rows-${dayjs(year).month(12).daysInMonth()}`}>
        <div className='w-[11.6px] h-[11.6px] rounded-[3px] bg-gray-scale-1' />
      </div>
    </div>
  );
  return content;
}
