import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from './CustomButton';

export default function DiaryShow() {
  return (
    <div className='flex justify-center items-center w-[342px] h-[256px] rounded-[20px] bg-white shadow-componentShadow'>
      <div className='flex flex-col justify-between items-center w-[175px] h-[198px]'>
        <div className='flex flex-col h-[46px] justify-between items-center'>
          <p className='font-bold text-base text-darkNavy'>나의 감정 일기</p>
          <p className='font-medium text-sm text-darkGray'>Apr. 16th, 2024</p>
        </div>
        <div className='w-[298px] text-center font-normal text-[13px] text-darkGray'>
          나는 오늘 공개SW프로젝트 주제 발표를 위해 우리 서비스의 모바일 UI를
          만드는 중이다. 너무 재미있다! 우리의 웹앱이 성공적으로 완성되었으면
          좋겠다. 그런데 생각보다 정해야 할 것들이 많고 힘들다... 오늘도 밤을
          새야할 것 같다.
        </div>
        <Link to='/'>
          <CustomButton text='메인으로' color='skyblue' />
        </Link>
      </div>
    </div>
  );
}
