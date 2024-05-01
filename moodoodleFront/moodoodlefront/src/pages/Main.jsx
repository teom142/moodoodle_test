import React, { useState } from 'react';
import MainProfile from '../components/MainProfile';
import DiaryWritePopup from '../components/DiaryWritePopup';
import Calendar from '../components/Calendar';
import MoodColor from '../components/MoodColor';

export default function Main() {
  const [isClick, setIsClick] = useState(false);

  function handleToggle() {
    setIsClick((prev) => !prev);
  }

  return (
    <div className='relative'>
      <div className='flex flex-col items-center gap-[12px]'>
        <MainProfile />
        <Calendar handleToggle={handleToggle} />
        <DiaryWritePopup />
      </div>
      {isClick ? <MoodColor handleToggle={handleToggle} /> : ''}
    </div>
  );
}
