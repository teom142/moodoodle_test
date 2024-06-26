import React, { useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import CustomButton from './CustomButton';
import { useNavigate } from 'react-router-dom';

export default function DiaryWriting() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const selectedDay = localStorage.getItem('selectedDay');
  let [inputCount, setInputCount] = useState(0);

  const handleSetValue = (e) => {
    setContent(e.target.value);
    onInputHandler(e);
  };

  const handleSubmit = () => {
    navigate(`/analysis/${selectedDay}`);
  };

  const onInputHandler = (e) => {
    setInputCount(e.target.value.length);
  };

  /*const handleSubmit = async () => {
    const postData = {
      user_id: localStorage.getItem('user_id'),
      date: selectedDay,
      content: content,
    };
    try {
      const response = await axios.post('/diary/create', postData);
      console.log(response.data);

      setContent('');
      navigate('/analysis');
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };*/

  return (
    <div className='flex justify-center items-center w-[342px] h-[456px] bg-white rounded-[20px] shadow-componentShadow'>
      <div className='flex flex-col justify-between items-center w-[307px] h-[390px]'>
        <div className='flex flex-col h-[46px] justify-between items-center'>
          <p className='font-bold text-base text-darkNavy'>일기 쓰기</p>
          <p className='font-medium text-sm text-darkGray'>
            {dayjs(selectedDay).format('MMM')}.{' '}
            {dayjs(selectedDay).format('DD')},{' '}
            {dayjs(selectedDay).format('YYYY')}
          </p>
        </div>
        <textarea
          className='w-[307px] h-[256px] p-[17px] text-[14px] rounded-[20px] border-[0.8px] border-outlineGray outline-none resize-none'
          placeholder='오늘의 일기 내용을 입력해주세요.'
          value={content}
          maxLength='300'
          onChange={(e) => handleSetValue(e)}
        />
        <div className='flex flex-row w-[307px] justify-end'>
          <p className='text-[11px] text-darkNavy'>
            <span>{inputCount}</span>
            <span>/300 자</span>
          </p>
        </div>
        <CustomButton
          text='등록 및 분석하기'
          color='pink'
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
