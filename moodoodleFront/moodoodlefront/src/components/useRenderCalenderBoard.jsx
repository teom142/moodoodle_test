import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const useRenderCalenderBoard = (selectedDay, handleSelectDate) => {
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

  const [arr, setArr] = useState([null]);

  useEffect(() => {
    const firstDay = dayjs(selectedDay).startOf('month').day();
    const daysInMonth = dayjs(selectedDay).daysInMonth();
    setArr(initArr(firstDay, daysInMonth));
    handleSelectDate(selectedDay);
    console.log(selectedDay);
  }, [selectedDay]);

  const content = arr.map((v, i) => (
    <div className='flex justify-center' key={v ? v.toString() : `${v}${i}`}>
      {v && (
        <div
          className='flex justify-center items-center w-[22px] h-[22px] rounded-full bg-gray-scale-1 text-center cursor-pointer'
          date={v}
          onClick={() => handleSelectDate(v)}
        >
          {dayjs(v).date()}
        </div>
      )}
    </div>
  ));

  return content;
};

export default useRenderCalenderBoard;
