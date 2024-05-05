import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import CustomButton from './CustomButton';

export default function DiaryShow({
  content,
  selectedDate,
  text,
  color,
  handleDayMoodAnalysisToggle,
}) {
  return (
    <div className='flex justify-center items-center w-[342px] h-[256px] rounded-[20px] bg-white shadow-componentShadow'>
      <div className='flex flex-col justify-between items-center w-[175px] h-[198px]'>
        <div className='flex flex-col h-[46px] justify-between items-center'>
          <p className='font-bold text-base text-darkNavy'>나의 감정 일기</p>
          <p className='font-medium text-sm text-darkGray'>
            {dayjs(selectedDate).format('MMM')}.{' '}
            {dayjs(selectedDate).format('DD')},{' '}
            {dayjs(selectedDate).format('YYYY')}
          </p>
        </div>
        <div className='w-[298px] text-center font-normal text-[13px] text-darkGray'>
          {content}
        </div>
        <Link to='/'>
          <CustomButton
            text={text}
            color={color}
            onClick={handleDayMoodAnalysisToggle}
          />
        </Link>
      </div>
    </div>
  );
}
