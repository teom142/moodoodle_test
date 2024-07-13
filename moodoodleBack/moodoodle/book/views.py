from django.shortcuts import render

from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from .models import Book_Mapping
from .serializers import BookMappingSerializer
from diary.models import Diary
from diary_mood.models import Diary_Mood
from .utils import recommend_book

class BookMappingView(CreateAPIView):
    serializer_class = BookMappingSerializer

    def get(self, request, *args, **kwargs):
        diary_id = self.kwargs.get('diary_id')
        id = self.kwargs.get('id')

        try:
            book = Book_Mapping.objects.get(diary_id=diary_id)
            result = BookMappingSerializer(book).data
        except Book_Mapping.DoesNotExist:
            # return Response({
            #     'success': False,
            #     'status_code': status.HTTP_404_NOT_FOUND,
            #     'message': "Book_Mapping을 찾을 수 없습니다.",
            # }, status=status.HTTP_404_NOT_FOUND)
            mood_str = ["fear", "surprised", "anger", "sad", "happy", "aversion", "normal"]
            diary_id = self.kwargs.get('diary_id')
            diary = Diary.objects.get(diary_id=diary_id)
            diary_mood = Diary_Mood.objects.filter(diary_id=diary_id).values()[0]
            mood_lis = []
            for i in mood_str:
                mood_lis.append(diary_mood[i])
            result = recommend_book(mood_str[mood_lis.index(max(mood_lis))], diary)
            return Response({
                'success': True,
                'status_code': status.HTTP_200_OK,
                'message': "요청에 성공하였습니다.",
                'diary_id': diary_id,
                'result': result,
            }, status=status.HTTP_200_OK)

        return Response({
            'success': True,
            'status_code': status.HTTP_200_OK,
            'message': "요청에 성공하였습니다.",
            'diary_id': diary_id,
            'result': result,
        }, status=status.HTTP_200_OK)

class BookCreateView(CreateAPIView):
    serializer_class = BookMappingSerializer
    def post(self, request, *args, **kwargs):
        mood_str = ["fear", "surprised", "anger", "sad", "happy", "aversion","normal"]
        diary_id = self.kwargs.get('diary_id')
        diary = Diary.objects.get(diary_id=diary_id)
        diary_mood = Diary_Mood.objects.filter(diary_id=diary_id).values()[0]
        mood_lis = []
        for i in mood_str:
            mood_lis.append(diary_mood[i])
        result = recommend_book(mood_str[mood_lis.index(max(mood_lis))], diary)
        return Response({
            'success': True,
            'status_code': status.HTTP_200_OK,
            'message': "요청에 성공하였습니다.",
            'diary_id': diary_id,
            'result': result,
        }, status=status.HTTP_200_OK)