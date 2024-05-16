import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import selectedDateState from '../stores/selectedDate';
import ProfileCol from '../components/ProfileCol';
import MypageMenu from '../components/MypageMenu';
import ProfileManagement from '../components/ProfileManagement';
import MonthlyReport from '../components/MonthlyReport';
import useLogout from '../hooks/useLogout';

export default function Mypage() {
  const [isClick, setIsClick] = useState(false);
  const [isClickedReport, setIsClickedReport] = useState(false);
  const [isClickedProfile, setIsClickedProfile] = useState(false);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);

  function handleReportComponent() {
    setIsClickedReport((prev) => !prev);
  }

  function handleProfileComponent() {
    setIsClickedProfile((prev) => !prev);
  }

  function handleColorChipToggle() {
    setIsClick((prev) => !prev);
  }

  const { logout } = useLogout();

  return (
    <div>
      <div className='flex flex-col justify-center items-center gap-[12px]'>
        {isClickedProfile ? (
          <ProfileManagement handleProfileComponent={handleProfileComponent} />
        ) : isClickedReport ? (
          <MonthlyReport
            isClick={isClick}
            handleReportComponent={handleReportComponent}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            handleColorChipToggle={handleColorChipToggle}
          />
        ) : (
          <>
            <ProfileCol />
            <MypageMenu
              handleReportComponent={handleReportComponent}
              handleProfileComponent={handleProfileComponent}
              onClick={logout}
            />
          </>
        )}
      </div>
    </div>
  );
}
