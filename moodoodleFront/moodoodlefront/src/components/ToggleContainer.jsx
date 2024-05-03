import React from 'react';
import { useState } from 'react';

export default function ToggleContainer({ isCalendar, setIsCalendar }) {
  const toggleHandler = () => {
    setIsCalendar((prev) => !prev);
  };

  return (
    <>
      <div className='relative cursor-pointer' onClick={toggleHandler}>
        <div
          className={`w-[37px] h-[18px] rounded-[30px] duration-[0.5s] ${
            isCalendar ? 'bg-[#00c866] duration-[0.5s]' : 'bg-[#e9e9ea]'
          }`}
        />
        <div
          className={`absolute top-[1.5px] w-[15px] h-[15px] rounded-full bg-[#fffeff] duration-[0.5s] ${
            isCalendar ? 'left-[20px] duration-[0.5s]' : 'left-[2px]'
          }`}
        />
      </div>
    </>
  );
}
