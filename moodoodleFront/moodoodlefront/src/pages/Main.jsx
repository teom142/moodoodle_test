import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import DiaryWritePopup from '../components/DiaryWritePopup';
import Calendar from '../components/Calendar';
import DiaryShow from '../components/DiaryShow';

export default function Main() {
  const context = useOutletContext();
  const [isWrited] = useState(localStorage.getItem('isWrited'));

  return (
    <div className='relative'>
      <div className='flex flex-col items-center gap-[12px]'>
        {context.isCalendar ? (
          ''
        ) : (
          <Calendar handleColorChipToggle={context.handleColorChipToggle} />
        )}
        {isWrited ? <DiaryShow /> : <DiaryWritePopup />}
      </div>
    </div>
  );
}
