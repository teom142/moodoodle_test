import React from 'react';
import MainProfile from '../components/MainProfile';
import DiaryWritePopup from '../components/DiaryWritePopup';
import Calendar from '../components/Calendar';
// import CalendarComponent from "../components/CalendarComponent";

export default function Main() {
  return (
    <div className='flex flex-col items-center gap-[12px]'>
      <MainProfile />
      <Calendar />
      <DiaryWritePopup />
    </div>
  );
}
