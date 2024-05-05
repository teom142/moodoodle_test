import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import CustomButton from './CustomButton';

export default function DiaryWritePopup({ selectedDate }) {
  return (
    <div className='flex justify-center items-center w-[342px] h-[159px] rounded-[20px] bg-white shadow-componentShadow'>
      <div className='flex flex-col justify-between items-center w-[175px] h-[99px]'>
        <div className='flex flex-col h-[46px] justify-between items-center'>
          <p className='font-bold text-base text-darkNavy'>
            일기를 적어보아요!
          </p>
          <p className='font-medium text-sm text-darkGray'>
            {dayjs(selectedDate).format('MMM')}.{' '}
            {dayjs(selectedDate).format('DD')},{' '}
            {dayjs(selectedDate).format('YYYY')}
          </p>
        </div>
        <Link to={`/diary/${selectedDate}`}>
          <CustomButton text='일기 쓰기' color='lemon' />
        </Link>
      </div>
    </div>
  );
}
