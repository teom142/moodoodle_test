import React from 'react';
import DiaryWriting from '../components/DiaryWriting';
import { useParams } from 'react-router-dom';

export default function DiaryWritePage() {
  return (
    <div className='flex flex-col items-center'>
      <DiaryWriting />
    </div>
  );
}
