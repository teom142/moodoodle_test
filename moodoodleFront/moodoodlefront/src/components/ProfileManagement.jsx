import React, { useState } from 'react';
import axios from 'axios';
import ToggleContainer from './ToggleContainer';
import InputProfile from './InputProfile';
import useProfile from '../hooks/useProfile';
import CustomButton from './CustomButton';

export default function ProfileManagement({ handleProfileComponent }) {
  const { profile } = useProfile();
  const [isPublic, setIsPublic] = useState(profile.public);
  const [modifiedProfile, setModifiedProfile] = useState({
    nickname: profile.nickname,
    description: profile.description,
    profile_image: profile.profile_image,
    public: profile.public,
  });

  const handleSubmit = () => {
    handleProfileComponent();
  };

  /*const handleSubmit = async () => {
    const postData = {
      nickname: modifiedProfile.nickname,
      description: modifiedProfile.description,
      public: modifiedProfile.public,
      profile_image: modifiedProfile.profile_image,
    };
    try {
      const response = await axios.post('/user/mypage', postData);
      console.log(response.data);

      handleProfileComponent();
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };*/

  return (
    <div className='flex w-[342px] h-[479px] justify-center items-center rounded-[20px] bg-white shadow-componentShadow'>
      <div className='flex flex-col w-[280px] h-[430px] justify-between items-center'>
        <div className='flex flex-row w-[280px] items-center gap-[95px]'>
          <button type='button' onClick={handleProfileComponent}>
            <img
              src='/assets/leftArrow.svg'
              alt='뒤로가기'
              className='w-[7px] h-[14px]'
            />
          </button>
          <p className='font-bold text-base text-darkNavy'>프로필 관리</p>
        </div>
        <div className='flex flex-col justify-between items-center w-[99px] h-[128px]'>
          <img
            src={profile.profile_image}
            alt='프로필 사진'
            className='w-[99px] h-[99px] rounded-full'
          />
          <p className='text-center font-light text-[14px] text-[#408DF9] tracking-[-1.26px]'>
            사진 수정 및 삭제
          </p>
        </div>
        <div className='flex flex-col w-[280px] h-[133px] justify-between items-center'>
          <InputProfile
            content='닉네임'
            placeholder='닉네임 입력'
            modifiedProfile={modifiedProfile}
            setModifiedProfile={setModifiedProfile}
            type='nickname'
            defaultValue={profile.nickname}
          />
          <InputProfile
            content='한 줄 소개'
            placeholder='한 줄 소개 입력 (최대 50글자)'
            modifiedProfile={modifiedProfile}
            setModifiedProfile={setModifiedProfile}
            type='description'
            defaultValue={profile.description}
          />
          <div className='flex flex-row w-[280px] justify-between items-center'>
            <p className='text-[14px] font-semibold text-darkNavy tracking-[-0.98px]'>
              달력 공개 여부
            </p>
            <ToggleContainer is={isPublic} setIs={setIsPublic} />
          </div>
        </div>
        <CustomButton text='저장하기' color='pink' onClick={handleSubmit} />
      </div>
    </div>
  );
}
