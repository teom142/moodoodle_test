import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import DiaryWritePopup from '../components/DiaryWritePopup';
import Calendar from '../components/Calendar';

export default function Main() {
  const context = useOutletContext();

  return (
    <div className='relative'>
      <div className='flex flex-col items-center gap-[12px]'>
        {context.isCalendar ? (
          ''
        ) : (
          <Calendar handleToggle={context.handleToggle} />
        )}
        <DiaryWritePopup />
      </div>
    </div>
  );
}
