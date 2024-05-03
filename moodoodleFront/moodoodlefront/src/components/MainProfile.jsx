import React from 'react';
import ToggleContainer from './ToggleContainer';

export default function MainProfile({ isCalendar, setIsCalendar }) {
  return (
    <div className='flex flex-row h-[82px] justify-center items-center'>
      <div className='flex flex-row justify-between items-center w-[330px] h-[48px]'>
        <div className='flex flex-row items-center gap-x-[27px]'>
          <img
            src='/assets/profile.svg'
            alt='프로필 사진'
            className='rounded-full'
          />
          <div className='flex flex-col h-[36px] justify-between'>
            <div className='font-bold text-sm'>무두들러</div>
            <div className='font-medium text-xs'>무두들러 아자아자 화이팅!</div>
          </div>
        </div>
        <ToggleContainer
          isCalendar={isCalendar}
          setIsCalendar={setIsCalendar}
        />
      </div>
    </div>
  );
}
