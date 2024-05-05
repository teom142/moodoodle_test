import React from 'react';
import MoodColorComponent from './MoodColorComponent';

export default function MoodColor({ handleColorChipToggle }) {
  return (
    <div className='absolute top-0 flex w-full h-full justify-center items-center z-50 bg-outlineGray bg-opacity-50'>
      <MoodColorComponent handleColorChipToggle={handleColorChipToggle} />
    </div>
  );
}
