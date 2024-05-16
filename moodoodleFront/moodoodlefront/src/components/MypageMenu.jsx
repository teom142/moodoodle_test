import React from 'react';

export default function MypageMenu({
  handleReportComponent,
  handleProfileComponent,
}) {
  return (
    <div className='flex justify-center items-center w-[342px] h-[86px] rounded-[20px] border border-darkGray/20'>
      <div className='flex flex-row w-[273px] justify-between items-center'>
        <button
          type='button'
          onClick={handleReportComponent}
          className='flex flex-col items-center w-[59px] h-[51px] gap-[7px]'
        >
          <img
            src='/assets/report.svg'
            alt='report'
            className='w-[29px] h-[29px]'
          />
          <p className='text-darkGray text-[12px] font-semibold'>감정 레포트</p>
        </button>
        <button
          type='button'
          onClick={handleProfileComponent}
          className='flex flex-col items-center w-[59px] h-[51px] gap-[7px]'
        >
          <img
            src='/assets/profileIcon.svg'
            alt='profileIcon'
            className='w-[29px] h-[29px]'
          />
          <p className='text-darkGray text-[12px] font-semibold'>프로필 관리</p>
        </button>
        <button
          type='button'
          className='flex flex-col items-center w-[59px] h-[51px] gap-[7px]'
        >
          <img
            src='/assets/logout.svg'
            alt='logout'
            className='w-[29px] h-[29px]'
          />
          <p className='text-darkGray text-[12px] font-semibold'>로그아웃</p>
        </button>
      </div>
    </div>
  );
}
