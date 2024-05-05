import React from 'react';

export default function MoodHashTag({ mood_title, mood_color }) {
  return (
    <div className='flex flex-row px-[8px] py-[4px] h-[24px] gap-[4px] justify-center items-center rounded-full bg-white shadow-hashtagShadow border border-gray-scale-2'>
      <div className={`w-[15px] h-[15px] rounded-full bg-[#${mood_color}]`} />
      <p className='text-[12px] font-normal text-darkGray'># {mood_title}</p>
    </div>
  );
}
