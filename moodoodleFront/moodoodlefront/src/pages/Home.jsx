import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import MainProfile from '../components/MainProfile';
import MoodColor from '../components/MoodColor';
import MoodAnalysisModal from '../components/MoodAnalysisModal';
import NavigationBar from '../components/NavigationBar';

export default function Home() {
  const [isCalendar, setIsCalendar] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [isDateClick, setIsDateClick] = useState(false);

  function handleColorChipToggle() {
    setIsClick((prev) => !prev);
  }

  function handleDayMoodAnalysisToggle() {
    setIsDateClick((prev) => !prev);
  }

  return (
    <>
      <Header />
      <div className='relative'>
        <MainProfile isCalendar={isCalendar} setIsCalendar={setIsCalendar} />
        {isClick ? (
          <MoodColor handleColorChipToggle={handleColorChipToggle} />
        ) : (
          ''
        )}
        {isDateClick ? (
          <MoodAnalysisModal
            isModal
            handleDayMoodAnalysisToggle={handleDayMoodAnalysisToggle}
          />
        ) : (
          ''
        )}
        <Outlet
          context={{
            isCalendar,
            isClick,
            setIsClick,
            handleColorChipToggle,
            handleDayMoodAnalysisToggle,
          }}
        />
        <NavigationBar />
      </div>
    </>
  );
}
