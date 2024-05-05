import { useState } from 'react';
import axios from 'axios';

export default function useProfile() {
  const [profile, setProfile] = useState({
    nickname: '무두들러',
    description: '아자아자 화이팅!',
    profile_image: '/assets/profile.svg',
  });

  const getUserProfile = async (body) => {
    try {
      const userProfileResponse = await axios.get('/user/mypage', body);
      setProfile({
        nickname: userProfileResponse.nickname,
        description: userProfileResponse.description,
        profile_image: userProfileResponse.profile_image,
      });
    } catch (error) {
      const { message } = error.response.data;
      console.log(message);
    }
  };
  return { profile, getUserProfile };
}
