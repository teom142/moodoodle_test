import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';
import selectedDateState from '../stores/selectedDate';
import useRenderCalenderBoard from './useRenderCalenderBoard';

const days = ['일', '월', '화', '수', '목', '금', '토'];

// api를 통해 들어온 mood의 [0]번쨰가 색깔 무드가 될 것임(string)
// color.js에 있는 MOOD_LIST 개수만큼 반복문 돌려서 MOOD_LIST.mood string에 색깔 무드가 포함되는 애의 color 사용해서 배경 칠하기!
export default function Calendar({ handleToggle }) {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const splited = selectedDate.split('-');
  const [YYYY_MM, setYYYY_MM] = useState(splited[0] + '-' + splited[1]);
  const [arr, setArr] = useState([null]);

  const handleSelectDate = (v) => {
    setSelectedDate(v);
  };

  const handlePrevMonth = (selectedDate) => {
    const newDate = dayjs(selectedDate)
      .subtract(1, 'month')
      .endOf('month')
      .format('YYYY-MM-DD');
    setSelectedDate(newDate);
  };

  const handleNextMonth = (selectedDate) => {
    const newDate = dayjs(selectedDate)
      .add(1, 'month')
      .startOf('month')
      .format('YYYY-MM-DD');
    setSelectedDate(newDate);
  };

  const board = useRenderCalenderBoard(
    selectedDate,
    handleSelectDate,
    arr,
    setArr,
  );

  useEffect(() => {
    setYYYY_MM(splited[0] + '-' + splited[1]);
  }, [selectedDate]);

  useEffect(() => {
    console.log(YYYY_MM);
    console.log(arr);
  }, [YYYY_MM]);

  return (
    <div className='flex relative justify-center items-center w-[342px] h-[304px] rounded-[20px] shadow-componentShadow'>
      <div className='flex flex-col justify-between items-center w-[290px] h-[260px]'>
        <div className='flex flex-row justify-between items-center w-[283px] h-[18px]'>
          <img
            src='/assets/leftArrow.svg'
            alt='왼쪽 화살표'
            className='w-[9px] h-[7px]'
            onClick={() => handlePrevMonth(selectedDate)}
          />
          <p className='text-[17px] font-semibold text-darkNavy'>
            {dayjs(selectedDate).format('MMM')}{' '}
            {dayjs(selectedDate).format('YYYY')}
          </p>
          <img
            src='/assets/rightArrow.svg'
            alt='오른쪽 화살표'
            className='w-[9px] h-[7px]'
            onClick={() => handleNextMonth(selectedDate)}
          />
        </div>
        <div className='flex flex-col justify-between items-center w-[290px] h-[218px] border-t border-[#E4E5E7]'>
          <div className='flex justify-center w-[290px] pt-[13px] grid grid-cols-7 '>
            {days.map((v) => (
              <div className='font-medium text-[10px] text-center' key={v}>
                {v}
              </div>
            ))}
          </div>
          <div className='w-[290px] h-[171px] grid grid-cols-7 text-center text-[8px] text-darkGreen'>
            {board}
          </div>
        </div>
      </div>
      <button
        className='absolute right-[15px] bottom-[15px]'
        type='button'
        onClick={handleToggle}
      >
        <img src='/assets/more.svg' alt='컬러칩 보기' />
      </button>
    </div>
  );
}
