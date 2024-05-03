import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className='flex items-center h-[64px] bg-white shadow-headerShadow'>
      <div className='flex w-[230px] h-[22px] justify-between ml-[28px]'>
        <button type='button'>
          <img src='/assets/bell.svg' alt='alarm' />
        </button>
        <Link to='/'>
          <img src='/assets/moodoodleLogo.svg' alt='logo' />
        </Link>
      </div>
    </div>
  );
}
