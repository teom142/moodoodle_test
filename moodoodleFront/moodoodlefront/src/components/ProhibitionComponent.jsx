import React from 'react';

export default function ProhibitionComponent() {
  return (
    <div className='flex justify-center items-center w-[342px] h-[159px] rounded-[20px] bg-white shadow-componentShadow'>
      <p className='font-bold text-base text-center text-darkGray'>
        미래의 일기는 작성할 수 없습니다. <br />
        다른 날짜를 선택해주세요!
      </p>
    </div>
  );
}
