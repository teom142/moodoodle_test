import React from 'react';
import MoodAnalysis from '../components/MoodAnalysis';
import DiaryShow from '../components/DiaryShow';

export default function AnalysisPage() {
  return (
    <div className='flex flex-col justify-between items-center gap-[15px]'>
      <MoodAnalysis />
      <DiaryShow />
    </div>
  );
}
