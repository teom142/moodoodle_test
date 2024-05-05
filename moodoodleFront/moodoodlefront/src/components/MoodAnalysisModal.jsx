import React from 'react';
import MoodAnalysis from './MoodAnalysis';

export default function MoodAnalysisModal({
  isModal,
  handleDayMoodAnalysisToggle,
}) {
  return (
    <div className='absolute top-0 flex w-full h-full justify-center items-center z-50 bg-outlineGray bg-opacity-50'>
      <MoodAnalysis
        isModal
        handleDayMoodAnalysisToggle={handleDayMoodAnalysisToggle}
      />
    </div>
  );
}
