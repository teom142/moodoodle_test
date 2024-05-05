import React from "react";
import { useNavigate } from "react-router-dom";
import MainButton from "../components/MainButton";
import Login from "./Login";
import SignUp from "./SignUp";

export default function MainNotLogin(){
    // 버튼을 누를 경우 Navigate를 통해서 이동할까 고민중
    // 알려줄 친절하고 사랑스러운 분을 구합니다
    const movePage = useNavigate();

    function goLogin(){
        movePage(<Login/>);
    }
    function goSignUp(){
        movePage(<SignUp/>);
    }
    const subdesStyle = "w-[289px] h-[20px] text-[15px] font-semibold text-center text-black"

  return (
    <div className="flex justify-center flex-col items-center w-[390px] h-[844px] bg-gradient-to-br from-yellow-100 via-red-100 to-purple-100">
    {/* 처음 비로그인 화면에 들어올 경우 헤더가 존재해서는 안됨 */}
    <div className="">
        {/* 보조 설명 및 타이틀Image */}
        <p className="w-[289px] h-[30px] relative left-[52px] text-[15px] font-semibold text-center text-black">
            <span className={subdesStyle}>
            여러분의 감정을
            </span>
            <br />
            <span className={subdesStyle}>
            다채로운 색깔로 기록하고 관리하는 다이어리
            </span>
        </p>
        <div className="">
            <img src="/assets/moodoodleLogoBig.svg" alt="logo" />
        </div>
        {/* 로그인 및 회원가입 버튼 */}
        <div className="grid place-items-center">
            {/* 아직 버튼 누르면 아무것도 안일어남 끼야악 */}
            <button onClick={goLogin}><MainButton data="로그인"/></button>
            <button onClick={goSignUp}><MainButton data="회원가입"/></button>
        </div>
        
        {/* 프로젝트 주최팀의 타 작업물 */}
        <div className="w-[300px] h-[18px] relative left-[50px] top-[250px]">
            <p className="w-[300px] h-[18px] absolute left-0 top-0 text-sm text-center text-black">
                <span className="w-[300px] h-[18px] text-sm font-medium text-center text-black">
                우리의 서비스,{" "}
                </span>
                <span className="w-[300px] h-[18px] text-sm font-bold text-center text-black">
                MOODOODLE
                </span>
                <span className="w-[300px] h-[18px] text-sm font-medium text-center text-black">
                이 궁금하다면?
                </span>
            </p>
        </div>
    </div>
    </div>
  );
}