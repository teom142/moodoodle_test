import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import useMonthlyReport from '../hooks/useMonthlyReport';
import useProfile from '../hooks/useProfile';
import colorsByCode from '../constants/colorsByCode';
import MoodHashTag from './MoodHashTag';

export default function MonthlyReport({
  handleReportComponent,
  selectedDate,
  setSelectedDate,
}) {
  const { monthlyReport, monthTagList, date, setDate, getMonthlyReport } =
    useMonthlyReport();

  const { profile } = useProfile();

  const handlePrevMonth = (selectedDate) => {
    const newDate = dayjs(selectedDate)
      .subtract(1, 'month')
      .endOf('month')
      .format('YYYY-MM-DD');
    setSelectedDate(newDate);
  };

  const handleNextMonth = (selectedDate) => {
    const newDate = dayjs(selectedDate)
      .add(1, 'month')
      .startOf('month')
      .format('YYYY-MM-DD');
    setSelectedDate(newDate);
  };

  useEffect(() => {
    setDate({
      ...date,
      year: dayjs(selectedDate).format('YYYY'),
      month: dayjs(selectedDate).format('MM'),
    });
  }, [dayjs(selectedDate).format('YYYY'), dayjs(selectedDate).format('MM')]);

  useEffect(() => {
    getMonthlyReport();
  }, [dayjs(selectedDate).format('YYYY'), dayjs(selectedDate).format('MM')]);

  return (
    <div className='flex justify-center items-center w-[342px] h-[592px] shadow-componentShadow'>
      <div className='flex flex-col w-[342px] h-[511px] justify-between items-center'>
        <div className='flex flex-row w-[283px] h-[24px] justify-start items-center gap-[95px]'>
          <button type='button' onClick={handleReportComponent}>
            <img
              src='/assets/leftArrow.svg'
              alt='뒤로가기'
              className='w-[7px] h-[14px]'
            />
          </button>
          <p className='font-bold text-base text-darkNavy'>월간 레포트</p>
        </div>
        <div className='flex flex-row justify-between items-center w-[283px] h-[18px]'>
          <img
            src='/assets/leftArrow.svg'
            alt='leftArrow'
            className='w-[9px] h-[7px] cursor-pointer'
            onClick={() => handlePrevMonth(selectedDate)}
          />
          <p className='text-[17px] font-semibold text-darkNavy'>
            {dayjs(selectedDate).format('MMM')}{' '}
            {dayjs(selectedDate).format('YYYY')}
          </p>
          <img
            src='/assets/rightArrow.svg'
            alt='rightArrow'
            className='w-[9px] h-[7px] cursor-pointer'
            onClick={() => handleNextMonth(selectedDate)}
          />
        </div>
        <div className='flex w-[342px] h-[350px] justify-center items-center'>
          차트
        </div>
        <div className='flex flex-col w-[310px] h-[45px]'>
          <div className='flex flex-row justify-between items-center'>
            <img src='/assets/leftDQM.svg' alt='왼쪽큰따옴표' />
            <img src='/assets/rightDQM.svg' alt='오른쪽큰따옴표' />
          </div>
          <div className='text-center text-[13px] text-darkGray'>
            [{profile.nickname}]님, 이번 달에는 행복한 일이 많으셨군요!
            <br />
            <span
              className={
                colorsByCode.COLOR_LIST[
                  monthlyReport.mood_color_list[0].mood_color
                ].text
              }
            >
              [
              {
                colorsByCode.COLOR_LIST[
                  monthlyReport.mood_color_list[0].mood_color
                ].mood_name
              }
              ]
            </span>
            이 {monthlyReport.mood_color_list[0].total_ratio}%를 차지하고
            있어요~
          </div>
        </div>
        <div className='flex flex-col w-[268px] h-[99px] justify-between items-center'>
          <p className='font-bold text-base text-darkNavy'>이달의 태그</p>
          <div className='flex flex-row flex-wrap justify-center items-center gap-[10px]'>
            {monthTagList.month_tag_list.map((i, v) => (
              <MoodHashTag
                key={v}
                mood_title={i.tag_title}
                mood_color={i.tag_color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
