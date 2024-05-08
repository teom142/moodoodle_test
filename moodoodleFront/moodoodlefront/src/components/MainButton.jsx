import React from 'react';

export default function MainButton({ text, onClick }) {
  return (
    <button
      type='button'
      className='w-[100px] h-[36.75px] relative'
      onClick={onClick}
    >
      <p className='w-[85px] absolute left-[7px] top-[6px] text-[15px] font-bold text-center text-black'>
        {text}
      </p>
      <img src='/assets/MainButton.svg' alt='paint_white' />
    </button>
  );
}
