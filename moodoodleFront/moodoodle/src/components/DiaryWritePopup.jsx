import React from "react";
import CustomButton from "./CustomButton";

export default function DiaryWritePopup() {
  return (
    <div className="flex justify-center items-center w-[342px] h-[159px] rounded-[20px] bg-white">
      <div className="flex flex-col justify-between items-center w-[175px] h-[99px]">
        <p className="font-bold text-base text-darkNavy">
          오늘의 일기를 적어보아요!
        </p>
        <p className="font-medium text-sm text-darkGray">Apr. 16th, 2024</p>
        <CustomButton
          text="일기 쓰기"
          textSize={12}
          width={95}
          height={31}
          bg="lemon"
        />
      </div>
    </div>
  );
}
