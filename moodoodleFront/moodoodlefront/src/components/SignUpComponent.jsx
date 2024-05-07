import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import LoginButton from "../components/LoginButton";
import Main from "../pages/Main";

export default function SignUp(){
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [createdate, setCreatedate] = useState("");
    // 스타일 설정
    const textStyle = "w-[271px] text-[13px] font-semibold text-darkGray"
    const boxStyle = "w-[283px] h-[43px] pl-[7px] rounded-[10px] bg-gray-scale-1 border border-darkGray/10 text-[13px]"
    // 현재 년도 설정하기 위한 변수
    const today = new Date();
    const yearoption = [], monthoption = [], dayoption = [];
    for(let i = 1920; i <= today.getFullYear(); i++){
      yearoption.push(<option className={textStyle} value={i}>{i}</option>)
    }
    for(let i = 1; i <= 12; i++){
      monthoption.push(<option className={textStyle} value={i}>{i}</option>)
    }
    for(let i = 1; i <= 31; i++){
      dayoption.push(<option className={textStyle} value={i}>{i}</option>)
    }

    const navigate = useNavigate();
  
    const handleSignup = async (event) => {
      event.preventDefault();

      // 재입력한 비밀번호 비일치 시 출력
      if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      // 사용자 입력 정보 기반 payload 생성
      const payload = {
        id: id,
        password: password,
        nickname: nickname,
        birthdate: birthdate,
        createdate: createdate,
      }
        
      const response = await fetch(
        "회원가입 요청지 주소",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();

      if (response.status === 201) {
        console.log("회원가입 성공, 아이디:" + data.id);
        navigate(<Main/>); // 회원가입 성공시 홈으로 이동
      } else if(response.status === 400){
        console.log("아이디 값이 비어있습니다.");
      }
    };
    return(
        <div className="w-[338px] h-[579px] rounded-[20px] bg-white mt-[-5px] shadow-loginShadow">
            {/* 회원정보 입력란 */}
            <form className="login-form" onSubmit={handleSignup}>
                <div className="flex justify-center items-center mt-[30px]">
                <label className={textStyle} htmlFor="username">아이디</label><br/>
                </div>
                <div className="flex justify-center items-center mb-[10px]">
                <input className={boxStyle}
                type="text"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="영문으로 시작하는 4자~20자의 영문, 숫자"
                /><br/>
                </div>
                <div className="ml-[28px] mb-[15px]">
                <CustomButton text="중복 확인" color="pink" onClick=""/>
                </div>
                <div className="flex justify-center items-center">
                <label className={textStyle} htmlFor="password">비밀번호</label>
                </div>
                <div className="flex justify-center items-center mb-[10px]">
                <input className={boxStyle}
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="8자~20자 영문, 숫자 모두 조합"
                />
                </div>
                <div className="flex justify-center items-center">
                <label className={textStyle} htmlFor="confirm-password">비밀번호 재입력</label>
                </div>
                <div className="flex justify-center items-center mb-[10px]">
                <input className={boxStyle}
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="8자~20자 영문, 숫자 모두 조합"
                />
                </div>
                <div className="flex justify-center items-center">
                <label className={textStyle} htmlFor="nickname">닉네임</label>
                </div>
                <div className="flex justify-center items-center mb-[10px]">
                <input className={boxStyle}
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                />
                </div>
                <div className="flex justify-center items-center">
                <label className={textStyle} htmlFor="birthdate">생년월일</label>
                </div>
                {/* 생년월일 셀렉트 박스값의 변경에 따른 onChange 함수 생성 필요 */}
                <div className="flex justify-center items-center mb-[10px]">
                <select className="w-[130px] h-[43px] rounded-[10px] bg-gray-scale-1 border border-[#ececec] mr-[7px]">
                    {yearoption}
                </select>
                <select className="w-[69px] h-[43px] rounded-[10px] bg-gray-scale-1 border border-[#ececec] mr-[7px]">
                    {monthoption}
                </select>
                <select className="w-[69px] h-[43px] rounded-[10px] bg-gray-scale-1 border border-[#ececec]">
                    {dayoption}
                </select>
                </div>
                <br/>
            {/* 회원가입 버튼 */}
            <div className="flex justify-center items-center mb-[10px]">
                <LoginButton text="회원가입" onClick={handleSignup}/>
            </div>
            {/* 로그인 이동 문구 */}
            <div className="flex justify-center items-center">
                <p className="text-xs text-left text-darkGray mr-[13px]">
                이미 계정이 있으신가요?
                </p>
                <Link className="text-[13px] font-bold text-lightBlue" to="/user/login">로그인</Link>
            </div>
            </form>
        </div>
    );
}