import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import MainProfile from '../components/MainProfile';
import MoodColor from '../components/MoodColor';

export default function Home() {
  const [isCalendar, setIsCalendar] = useState(false);
  const [isClick, setIsClick] = useState(false);

  function handleToggle() {
    setIsClick((prev) => !prev);
  }

  return (
    <>
      <Header />
      <div className='relative'>
        <MainProfile isCalendar={isCalendar} setIsCalendar={setIsCalendar} />
        {isClick ? <MoodColor handleToggle={handleToggle} /> : ''}
        <Outlet context={{ isCalendar, isClick, setIsClick, handleToggle }} />
      </div>
    </>
  );
}
