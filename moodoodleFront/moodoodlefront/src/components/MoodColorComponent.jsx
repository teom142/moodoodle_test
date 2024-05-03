import React from 'react';
import colors from '../constants/colors';

export default function MoodColorComponent({ handleToggle }) {
  return (
    <div className='relative flex flex-col justify-center items-center w-[269px] h-[470px] gap-[26px] bg-white rounded-[20px]'>
      <div className='w-[217px] h-[45px] text-darkNavy font-semibold text-[23px] text-center border-b border-[#E4E5E7]'>
        Mood Color
      </div>
      <div className='flex flex-col justify-between items-start w-[203px] h-[340px]'>
        {colors &&
          colors.MOOD_LIST.map((id) => (
            <div
              className='flex flex-row gap-[8px] items-center'
              key={id.moodId}
            >
              <div className={`w-[33px] h-[33px] rounded-full ${id.color}`} />
              <div className='text-left text-[12px]'>{id.mood}</div>
            </div>
          ))}
      </div>
      <button
        className='absolute right-[15px] top-[15px]'
        type='button'
        onClick={handleToggle}
      >
        <img src='/assets/close.svg' alt='닫기' />
      </button>
    </div>
  );
}
