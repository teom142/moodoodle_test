import React from 'react';
import { Link } from 'react-router-dom';

export default function NavigationBar() {
  return (
    <div className='flex flex-row w-full h-[55px] justify-center items-center bg-white shadow-componentShadow'>
      <div className='flex flex-row w-[254px] h-[38px] justify-between items-end'>
        <Link to='/friend' className='flex flex-col items-center'>
          <img src='/assets/friend.svg' alt='friend' />
          <p className='text-center text-[10px] font-semibold text-darkGray/90'>
            친구관리
          </p>
        </Link>
        <Link to='/' className='flex flex-col items-center'>
          <img src='/assets/home.svg' alt='home' />
          <p className='text-center text-[10px] font-semibold text-darkGray/90'>
            홈
          </p>
        </Link>
        <Link to='/mypage' className='flex flex-col items-center'>
          <img src='/assets/mypage.svg' alt='mypage' />
          <p className='text-center text-[10px] font-semibold text-darkGray/90'>
            마이무드
          </p>
        </Link>
      </div>
    </div>
  );
}
