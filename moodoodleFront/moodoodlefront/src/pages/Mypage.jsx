import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import selectedDateState from '../stores/selectedDate';
import ProfileCol from '../components/ProfileCol';
import MypageMenu from '../components/MypageMenu';
import ProfileManagement from '../components/ProfileManagement';
import MonthlyReport from '../components/MonthlyReport';

export default function Mypage() {
  const [isClickedReport, setIsClickedReport] = useState(false);
  const [isClickedProfile, setIsClickedProfile] = useState(false);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);

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
        ) : isClickedReport ? (
          <MonthlyReport
            handleReportComponent={handleReportComponent}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
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
