import React from "react";
import { useState } from "react";

export default function ToggleContainer() {
  const [isOn, setisOn] = useState(false);

  const toggleHandler = () => {
    setisOn(!isOn);
  };

  return (
    <>
      <div className="relative cursor-pointer" onClick={toggleHandler}>
        <div
          className={`w-[37px] h-[18px] rounded-[30px] duration-[0.5s] ${
            isOn ? "bg-[#00c866] duration-[0.5s]" : "bg-[#e9e9ea]"
          }`}
        />
        <div
          className={`absolute top-[1.5px] w-[15px] h-[15px] rounded-full bg-[#fffeff] duration-[0.5s] ${
            isOn ? "left-[20px] duration-[0.5s]" : "left-[2px]"
          }`}
        />
      </div>
    </>
  );
}
