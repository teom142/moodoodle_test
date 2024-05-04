import React from 'react';
import MoodAnalysis from './MoodAnalysis';

export default function MoodAnalysisModal({ isModal, handleDateToggle }) {
  return (
    <div className='absolute top-0 flex w-full h-full justify-center items-center z-50 bg-outlineGray bg-opacity-50'>
      <MoodAnalysis isModal handleDateToggle={handleDateToggle} />
    </div>
  );
}
