import React, { useEffect } from 'react';
import ToggleContainer from './ToggleContainer';
import useProfile from '../hooks/useProfile';

export default function MainProfile({ isCalendar, setIsCalendar }) {
  const { profile, getUserProfile } = useProfile();

  useEffect(() => {
    getUserProfile();
  }, [localStorage.getItem('user_id')]);

  return (
    <div className='flex flex-row h-[82px] justify-center items-center'>
      <div className='flex flex-row justify-between items-center w-[330px] h-[48px]'>
        <div className='flex flex-row items-center gap-x-[27px]'>
          <img
            src={`${profile.profile_image}`}
            alt='프로필 사진'
            className='rounded-full'
          />
          <div className='flex flex-col h-[36px] justify-between'>
            <div className='font-bold text-sm'>{profile.nickname}</div>
            <div className='font-medium text-xs'>{profile.description}</div>
          </div>
        </div>
        <ToggleContainer
          isCalendar={isCalendar}
          setIsCalendar={setIsCalendar}
        />
      </div>
    </div>
  );
}
