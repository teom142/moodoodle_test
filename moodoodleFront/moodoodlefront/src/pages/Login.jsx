import React from 'react';
import { Link } from 'react-router-dom';
import LoginComponent from '../components/LoginComponent';

export default function Login() {
  return (
    <div className='flex justify-center flex-col items-center w-[390px] h-screen bg-white'>
      <Link to='/start'>
        <img src='/assets/moodoodleLogoBig.svg' alt='logo' />
      </Link>
      <LoginComponent />
    </div>
  );
}
