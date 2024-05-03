import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import moodMonth from '../constants/moodMonth';

const useRenderCalenderBoard = (selectedDay, handleSelectDate, arr, setArr) => {
  const initArr = (firstDay, daysInMonth) => {
    return Array.from({ length: firstDay + daysInMonth }, (v, i) =>
      i < firstDay
        ? null
        : dayjs(selectedDay)
            .startOf('month')
            .set('date', i - firstDay + 1)
            .format('YYYY-MM-DD'),
    );
  };

  useEffect(() => {
    handleSelectDate(selectedDay);
    const firstDay = dayjs(selectedDay).startOf('month').day();
    const daysInMonth = dayjs(selectedDay).daysInMonth();
    setArr(initArr(firstDay, daysInMonth));
    console.log(arr);
    console.log(selectedDay);
  }, [selectedDay]);

  const content = arr.map((v, i) => (
    <div className='flex justify-center' key={v ? v.toString() : `${v}${i}`}>
      {v &&
        (moodMonth.result[i - (arr.length - dayjs(selectedDay).daysInMonth())]
          .isWrited === true ? (
          <div
            className={`flex justify-center items-center w-[22px] h-[22px] rounded-full bg-[#${moodMonth.result[i - (arr.length - dayjs(selectedDay).daysInMonth())].main_mood_color}] text-center cursor-pointer bg-opacity-80`}
            date={v}
            onClick={() => handleSelectDate(v)}
          >
            {dayjs(v).date()}
          </div>
        ) : (
          <div
            className='flex justify-center items-center w-[22px] h-[22px] rounded-full bg-gray-scale-1 text-center cursor-pointer'
            date={v}
            onClick={() => handleSelectDate(v)}
          >
            {dayjs(v).date()}
          </div>
        ))}
    </div>
  ));

  return content;
};

export default useRenderCalenderBoard;
