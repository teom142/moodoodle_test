import React from 'react';
import MoodHashTag from './MoodHashTag';

export default function MoodAnalysis() {
  return (
    <div className='flex flex-col justify-center items-center w-[342px] h-[472px] rounded-[20px] bg-white shadow-componentShadow'>
      <div className='flex flex-col h-[409px] justify-between items-center'>
        <div className='flex flex-col h-[200px] justify-between items-center'>
          <p className='font-bold text-normal text-darkNavy'>감정 태그</p>
          <div className='flex flex-col h-[102px] justify-between items-center'>
            <div className='w-[50px] h-[50px] rounded-full bg-darkGray' />
            <div className='text-darkGray text-center text-[13px] whitespace-pre-line'>
              [무두들러]님의 오늘 느낀 감정은 <br />
              [행복]이 65% [슬픔]이 15% [힘듦]이 10%예요!
            </div>
          </div>
          <div className='flex flex-row justify-center items-center gap-[25px]'>
            <MoodHashTag />
            <MoodHashTag />
            <MoodHashTag />
          </div>
        </div>
        <div className='text-darkGray text-center text-[13px] whitespace-pre-line'>
          희망 가득~ <br />
          활기찬 노래로 하루를 마무리해보아요!
        </div>
        <div className='flex flex-col h-[135px] justify-between items-center'>
          <p className='font-bold text-normal text-darkNavy'>
            오늘의 추천 음악
          </p>
          <div className='w-[89px] h-[89px] rounded-full' />
          <div className='flex justify-center items-center gap-[5px]'>
            <img src='/assets/music.svg' alt='음악' />
            <p className='font-semibold text-[12px] text-darkGray'>
              제목 - 가수
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
