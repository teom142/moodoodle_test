import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import DiaryWritePopup from '../components/DiaryWritePopup';
import Calendar from '../components/Calendar';
import MoodColor from '../components/MoodColor';

export default function Main() {
  const isCalendar = useOutletContext();
  const [isClick, setIsClick] = useState(false);

  function handleToggle() {
    setIsClick((prev) => !prev);
  }

  return (
    <div className='relative'>
      <div className='flex flex-col items-center gap-[12px]'>
        {isCalendar ? '' : <Calendar handleToggle={handleToggle} />}
        <DiaryWritePopup />
      </div>
      {isClick ? <MoodColor handleToggle={handleToggle} /> : ''}
    </div>
  );
}
