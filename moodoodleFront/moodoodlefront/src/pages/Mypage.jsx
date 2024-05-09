import React from 'react';
import ProfileCol from '../components/ProfileCol';
import MypageMenu from '../components/MypageMenu';

export default function Mypage() {
  return (
    <div className='flex flex-col items-center gap-[12px]'>
      <ProfileCol />
      <MypageMenu />
    </div>
  );
}
