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
  return (
    <div className="flex justify-center flex-col items-center w-[390px] h-screen bg-gradient-to-br from-yellow-100 via-red-100 to-purple-100">
        {/* 보조 설명 및 타이틀 Image */}
        <p className="w-[289px] h-[20px] text-[15px] font-semibold text-center text-black">
            여러분의 감정을<br/>
            다채로운 색깔로 기록하고 관리하는 다이어리
        </p>
        <div className="">
            <img src="/assets/moodoodleLogoBig.svg" alt="logo" />
        </div>
        {/* 로그인 및 회원가입 버튼 */}
        <div className="flex flex-col items-center mt-[-30px]">
            <button onClick={goLogin}><MainButton data="로그인"/></button>
            <button onClick={goSignUp}><MainButton data="회원가입"/></button>
        </div>
        
        {/* 프로젝트 주최팀의 타 작업물 - 지워도 무관*/}
        <div className="mt-[30px]">
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