import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import moodMonth from '../constants/moodMonth';
import useMoodCalendar from '../hooks/useMoodCalendar';

const useRenderCalenderBoard = (selectedDay, handleSelectDate, arr, setArr) => {
  const { daysDiary, getMoodCalendar, moodcolorlist, setMoodcolorlist } =
    useMoodCalendar();

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

  const moodColorArr = (firstDay, daysInMonth) => {
    return Array.from({ length: firstDay + daysInMonth }, (v, i) =>
      i < dayjs().date() ? moodcolorlist[i] : null,
    );
  };

  useEffect(() => {
    handleSelectDate(selectedDay);
    const firstDay = dayjs(selectedDay).startOf('month').day();
    const daysInMonth = dayjs(selectedDay).daysInMonth();
    setArr(initArr(firstDay, daysInMonth));
    setMoodcolorlist(moodColorArr(firstDay, daysInMonth));
    console.log(moodcolorlist);
    console.log(arr);
    console.log(selectedDay);
  }, [selectedDay]);

  const content = arr.map((v, i) => (
    <div className='flex justify-center' key={v ? v.toString() : `${v}${i}`}>
      {v &&
        (moodcolorlist[i - (arr.length - dayjs(selectedDay).daysInMonth())] !==
        null ? (
          <div
            className={`flex justify-center items-center w-[22px] h-[22px] rounded-full bg-[#${
              moodcolorlist[i - (arr.length - dayjs(selectedDay).daysInMonth())]
            }] text-center cursor-pointer bg-opacity-80`}
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
