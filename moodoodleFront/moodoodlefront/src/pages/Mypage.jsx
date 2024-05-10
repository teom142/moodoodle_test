import React, { useState } from 'react';
import ProfileCol from '../components/ProfileCol';
import MypageMenu from '../components/MypageMenu';
import ProfileManagement from '../components/ProfileManagement';

export default function Mypage() {
  const [isClickedReport, setIsClickedReport] = useState(false);
  const [isClickedProfile, setIsClickedProfile] = useState(false);

  function handleReportComponent() {
    setIsClickedReport((prev) => !prev);
  }

  function handleProfileComponent() {
    setIsClickedProfile((prev) => !prev);
  }

  return (
    <div>
      <div className='flex flex-col justify-center items-center gap-[12px]'>
        {isClickedProfile ? (
          <ProfileManagement handleProfileComponent={handleProfileComponent} />
        ) : (
          <>
            <ProfileCol />
            <MypageMenu
              handleReportComponent={handleReportComponent}
              handleProfileComponent={handleProfileComponent}
            />
          </>
        )}
      </div>
    </div>
  );
}
