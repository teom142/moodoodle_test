import React from "react";
import { useNavigate } from 'react-router-dom';
import MainButton from "../components/MainButton";
import Login from "./Login";
import SignUp from "./SignUp";

export default function Start(){
    // 버튼을 누를 경우 Navigate를 통해서 이동할까 고민중
    // 알려줄 친절하고 사랑스러운 분을 구합니다
    const movePage = useNavigate();

    function goLogin(){
        movePage("/user/login");
    }
    function goSignUp(){
        movePage("/user/signup");
    }
    const subdesStyle = "w-[289px] h-[20px] text-[15px] font-semibold text-center text-black"

  return (
    <div className="flex justify-center flex-col items-center w-[390px] h-screen bg-gradient-to-br from-yellow-100 via-red-100 to-purple-100">
    {/* 처음 비로그인 화면에 들어올 경우 헤더가 존재해서는 안됨 */}
        {/* 보조 설명 및 타이틀 Image */}
        <p className="w-[289px] h-[30px] text-[15px] font-semibold text-center text-black">
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
            <button onClick={goLogin}><MainButton data="로그인"/></button>
            <button onClick={goSignUp}><MainButton data="회원가입"/></button>
        </div>
        
        {/* 프로젝트 주최팀의 타 작업물 */}
        <div className="">
            <p className="text-sm text-black">
                <span className="text-sm font-medium">
                우리의 서비스,{" "}
                </span>
                <span className="text-sm font-bold">
                MOODOODLE
                </span>
                <span className="text-sm font-medium">
                이 궁금하다면?
                </span>
            </p>
        </div>
    </div>
  );
}