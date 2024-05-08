import React from 'react';
import { Link } from 'react-router-dom';
import SignUpComponent from '../components/SignUpComponent';

export default function SignUp() {
  return (
    <div className='flex flex-col items-center w-[390px] h-screen bg-white'>
      <Link to='/start' className='mt-[10%]'>
        <img src='/assets/moodoodleLogoBig.svg' alt='logo' />
      </Link>
      <SignUpComponent />
    </div>
  );
}
