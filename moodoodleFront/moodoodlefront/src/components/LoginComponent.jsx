import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginButton from '../components/LoginButton';
import Main from '../pages/Main';

export default function LoginComponent() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loginCheck, setLoginCheck] = useState(false); // 로그인 상태 체크
  // 스타일 설정
  const textStyle = 'w-[271px] text-[13px] font-semibold text-darkGray';
  const boxStyle =
    'w-[283px] h-[43px] pl-[7px] rounded-[10px] bg-gray-scale-1 border border-darkGray/10 text-[13px]';

  const navigate = useNavigate();

  const idHandler = (e) => {
    setId(e.currentTarget.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));

    const response = await fetch('로그인 서버 주소', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        password: password,
      }),
    });
    const result = await response.json();

    if (response.status === 200) {
      setLoginCheck(false);
      // 웹 페이지의 세션 동안 데이터를 저장하는데 사용되는 저장소
      sessionStorage.setItem('token', result.token);
      sessionStorage.setItem('id', result.id); // 여기서 userid를 저장
      console.log('로그인성공, 아이디:' + result.id);
      navigate('/'); // 로그인 성공시 홈으로 이동
    } else {
      // 여기서 api에 작성된 response 값으로 구분
      setLoginCheck(true);
    }
  };

  return (
    <div className='w-[338px] h-[297px] rounded-[20px] bg-white shadow-loginShadow'>
      {/* 로그인 폼 입력란 */}
      <form className='login-form' onSubmit={handleLogin}>
        <div>
          {/* 아이디 입력란 */}
          <div className='flex justify-center items-center mt-[30px]'>
            <label className={textStyle} htmlFor='username'>
              아이디
            </label>
            <br />
          </div>
          <div className='flex justify-center items-center mb-[10px]'>
            <input
              className={boxStyle}
              type='text'
              id='username'
              value={id}
              onChange={idHandler}
              placeholder='아이디를 입력하세요'
            />
            <br />
          </div>
          {/* 비밀번호 입력란 */}
          <div className='flex justify-center items-center'>
            <label className={textStyle} htmlFor='password'>
              비밀번호
            </label>
          </div>
          <div className='flex justify-center items-center mb-[10px]'>
            <input
              className={boxStyle}
              type='password'
              id='password'
              value={password}
              onChange={passwordHandler}
              placeholder='비밀번호를 입력하세요'
            />
          </div>
          <br />
        </div>
        {loginCheck && (
          <label className='text-red'>아이디 혹은 비밀번호가 틀렸습니다.</label>
        )}
        {/* 로그인 버튼 */}
        <div className='flex justify-center items-center mb-[10px]'>
          <LoginButton text='로그인' onClick={handleLogin} />
        </div>
        {/* 회원가입 이동 문구 */}
        <div className='flex justify-center items-center'>
          <p className='text-xs text-left text-darkGray mr-[13px]'>
            아직 회원이 아니신가요?
          </p>
          <Link className='text-[13px] font-bold text-lightBlue' to='/signup'>
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
}
