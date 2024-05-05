import React from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import useMoodCalendar from '../hooks/useMoodCalendar';
import MoodAnalysis from '../components/MoodAnalysis';
import DiaryShow from '../components/DiaryShow';

export default function AnalysisPage() {
  const { daysDiary } = useMoodCalendar();
  const selectedDate = useParams();
  // 날짜가 안 바뀜 api 연결하고 수정 예정
  return (
    <div className='flex flex-col justify-between items-center gap-[15px]'>
      <MoodAnalysis diary_id={daysDiary[dayjs().date() - 1].diary_id} />
      <DiaryShow
        content={daysDiary[dayjs().date() - 1].content}
        text='메인으로'
        color='skyblue'
      />
    </div>
  );
}
