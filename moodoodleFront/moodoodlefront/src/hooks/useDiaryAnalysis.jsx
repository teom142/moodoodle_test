import { useState } from 'react';
import axios from 'axios';

export default function useDiaryAnalysis() {
  const [analysisResult, setAnalysisResult] = useState([
    {
      mood_color: 'B5D3FF',
      ratio: 60,
      mood_list: [
        {
          diary_mood_id: 3,
          mood_title: '슬픔',
          mood_ratio: 25,
        },
        {
          diary_mood_id: 4,
          mood_title: '지루함',
          mood_ratio: 15,
        },
      ],
    },
    {
      mood_color: 'FBCFE0',
      ratio: 40,
      mood_list: [
        {
          diary_mood_id: 1,
          mood_title: '행복',
          mood_ratio: 40,
        },
        {
          diary_mood_id: 2,
          mood_title: '즐거움',
          mood_ratio: 20,
        },
      ],
    },
  ]);

  const getDiaryAnalysis = async (diary_id) => {
    try {
      const getDiaryAnalysisrResponse = await axios.get(
        `/diary/detail/${diary_id}`,
        {
          user_id: localStorage.getItem('user_id'),
          diary_id: { diary_id },
        },
      );
      setAnalysisResult(getDiaryAnalysisrResponse.detail);
    } catch (error) {
      const { message } = error.response.data;
      console.log(message);
    }
  };

  return { analysisResult, getDiaryAnalysis };
}
