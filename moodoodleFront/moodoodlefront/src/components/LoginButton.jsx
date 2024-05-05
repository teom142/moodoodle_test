import React from "react";

// 로그인&회원가입 버튼
export default function LoginButton({ text, onClick }) {
  const commonStyle = "w-[176px] h-[29px] rounded-[30px] font-semibold text-darkGray shadow-buttonShadow text-[12px] w-[95px] h-[31px] bg-[#F2EEFF]";
  return (
    /* 버튼을 눌렀을 때, 관련 정보값도 다 전송함을 고려해서 수정 */
    <button className={commonStyle} type="button" onClick={onClick}>
      {text}
    </button>
  );
}