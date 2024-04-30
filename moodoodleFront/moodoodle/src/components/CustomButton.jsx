import React from "react";

export default function CustomButton({
  text,
  textSize,
  width,
  height,
  bg,
  onClick,
}) {
  const commonStyle = `w-[95px] h-[31px] rounded-[30px] font-semibold text-darkGray shadow-buttonShadow `;
  return (
    <button
      className={
        commonStyle +
        `text-[${textSize}px] w-[${width}px] h-[${height}px] bg-${bg}`
      }
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
