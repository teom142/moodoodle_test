import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import MainProfile from '../components/MainProfile';

export default function Home() {
  const [isCalendar, setIsCalendar] = useState(false);
  return (
    <>
      <Header />
      <MainProfile isCalendar={isCalendar} setIsCalendar={setIsCalendar} />
      <Outlet />
    </>
  );
}
