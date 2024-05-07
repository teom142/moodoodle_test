import React from "react";
// 보기 편하게 이걸로 쓰고 싶은데, onChange 때문에 사용 불가
// 객체형으로 파라미터를 받지 않고 map이나 array 형식으로 파라미터를 받아오라는 조언
// 실제 구현을 못하겠음
export default function SignupInput(text, type, id, value, onChange, placeholder){
    const textStyle = "w-[271px] text-[13px] font-semibold text-darkGray"
    const boxStyle = "w-[283px] h-[43px] pl-[7px] rounded-[10px] bg-[gray-scale-1] border border-[#4b4b4b]/10 text-[13px]"

    return(
        <div>
            <div className="flex justify-center items-center mt-[30px]">
                <label className={textStyle} htmlFor="username">{text}</label><br/>
            </div>
            <div className="flex justify-center items-center mb-[10px]">
                <input className={boxStyle}
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                /><br/>
            </div>
        </div>
    );
}