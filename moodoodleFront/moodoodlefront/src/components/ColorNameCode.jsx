import React from 'react';
import colors from '../constants/colors';

export default function ColorNameCode() {
  return (
    <div className='flex flex-col w-[92px] h-[302px] items-center justify-between'>
      {colors &&
        colors.MOOD_LIST.map((id) => (
          <div
            className='flex flex-row w-[84px] h-[26px] justify-between items-center'
            key={id.moodId}
          >
            <div className={`w-[20px] h-[20px] rounded-full ${id.color}`} />
            <div className='flex flex-col w-[49px] h-[26px] justify-between items-start gap-[-2px]'>
              <div className='text-left text-[11px] whitespace-pre-line'>
                {id.mood_name}
                <br />#{id.code}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
