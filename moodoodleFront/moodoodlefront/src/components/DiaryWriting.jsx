import React, { useState } from 'react';
import dayjs from 'dayjs';
import CustomButton from './CustomButton';

export default function DiaryWriting() {
  const [textValue, setTextValue] = useState('');
  const month = dayjs().format('MMM');
  const year = dayjs().format('YYYY');
  const day = dayjs().format('DD');

  const handleSetValue = (e) => {
    setTextValue(e.target.value);
  };
  return (
    <div className='flex justify-center items-center w-[342px] h-[456px] bg-white rounded-[20px] shadow-componentShadow'>
      <div className='flex flex-col justify-between items-center w-[307px] h-[390px]'>
        <div className='flex flex-col h-[46px] justify-between items-center'>
          <p className='font-bold text-base text-darkNavy'>일기 쓰기</p>
          <p className='font-medium text-sm text-darkGray'>
            {month}. {day}, {year}
          </p>
        </div>
        <textarea
          className='w-[307px] h-[256px] p-[17px] text-[14px] rounded-[20px] border-[0.8px] border-outlineGray outline-none resize-none'
          placeholder='오늘의 일기 내용을 입력해주세요.'
          value={textValue}
          onChange={(e) => handleSetValue(e)}
        />
        <CustomButton text='등록하기' color='pink' />
      </div>
    </div>
  );
}
