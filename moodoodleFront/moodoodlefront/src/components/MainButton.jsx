import React from "react";

export default function MainButton(props) {
  return (
  <div className="w-[100px] h-[36.75px] relative">
  <p className="w-[85px] absolute left-[7px] top-[6px] text-[15px] font-bold text-center text-black">
    {props.data}
  </p>
    <img src="/assets/MainButton.svg"/>
  </div>
  )
}
