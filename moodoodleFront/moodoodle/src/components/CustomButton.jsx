import React from "react";

export default function CustomButton({ text, color, onClick }) {
  const colorVariants = {
    lemon: "bg-[#FEFBE7]",
    skyblue: "bg-[#EAF3FF]",
    pink: "bg-[#FFEEF4]",
  };

  const commonStyle = `w-[95px] h-[31px] rounded-[30px] font-semibold text-darkGray shadow-buttonShadow text-[12px] w-[95px] h-[31px] ${colorVariants[color]}`;
  return (
    <button className={commonStyle} type="button" onClick={onClick}>
      {text}
    </button>
  );
}
