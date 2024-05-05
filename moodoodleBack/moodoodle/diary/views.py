from django.shortcuts import render

from rest_framework import status
from rest_framework.generics import CreateAPIView, UpdateAPIView, RetrieveAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from . import serializers
from .models import Diary, Diary_Mood
from .serializers import DiaryCreateSerializer, DiaryUpdateSerializer, DiaryDetailSerializer,serializers

class DiaryCreateView(CreateAPIView):
    serializer_class = DiaryCreateSerializer
    queryset = Diary.objects.all()
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({
                'success': True,
                'status code': status.HTTP_201_CREATED,
                'message': "요청에 성공하였습니다.",
                'data' : serializer.data
            }, status=status.HTTP_201_CREATED)
        except serializers.ValidationError as e:
            return Response({
                'success': False,
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': "이미 이 날짜에 작성된 일기가 있습니다."
            }, status=status.HTTP_400_BAD_REQUEST)

class DiaryUpdateView(UpdateAPIView, RetrieveAPIView):
    serializer_class = DiaryUpdateSerializer
    queryset = Diary.objects.all()
    # permission_classes = [IsAuthenticated]
    def patch(self, request, *args, **kwargs):
        diary_id = self.kwargs.get('pk')
        user_id = request.user.id
        try:
            diary = Diary.objects.get(diary_id=diary_id)
            # 일기 접근 제한
            # if diary.user_id != user_id:
            #     return Response({
            #         'success' : False,
            #         'status code': status.HTTP_403_FORBIDDEN,
            #         'message' : "일기 접근 권한이 없습니다."
            #     }, status=status.HTTP_403_FORBIDDEN)
        except Diary.DoesNotExist:
            return Response({
                'success': False,
                'status code': status.HTTP_404_NOT_FOUND,
                'message' : "일기가 존재하지 않습니다."
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = DiaryUpdateSerializer(diary, data=request.data, partial=True)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({
                'success' : True,
                'status code' : status.HTTP_200_OK,
                'message': "요청에 성공하였습니다.",
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        except serializers.ValidationError as e:
            return Response({
                'success' : False,
                'status code': e.status_code,
                'message': "이미 이 날짜에 작성된 일기가 있습니다."
            }, status=e.status_code)

class DiaryDeleteView(DestroyAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = Diary.objects.all()
    def get_object(self, request):
        diary_id = self.kwargs.get('pk')
        return Diary.objects.get(diary_id=diary_id)

    def delete(self, request, *args, **kwargs):
        diary_id = self.kwargs.get('pk')
        user_id = request.user.id
        try:
            diary = Diary.objects.get(di한ry_id=diary_id)
            # 일기 접근 제한
            # if diary.user_id != user_id:
            #     return Response({
            #         'success' : False,
            #         'status code': status.HTTP_403_FORBIDDEN,
            #         'message' : "일기 접근 권한이 없습니다."
            #     }, status=status.HTTP_403_FORBIDDEN)
            diary.delete()
            return Response({
                'success' : True,
                'status code': status.HTTP_200_OK,
                'message' : "요청에 성공하였습니다."
            }, status=status.HTTP_200_OK)
        except Diary.DoesNotExist:
            status_code = status.HTTP_404_NOT_FOUND
            return Response({
                'success' : False,
                'status code': status_code,
                'message' : "일기가 존재하지 않습니다."
            }, status=status_code)


class DiaryDetailView(APIView):
    serializer_class = DiaryDetailSerializer
    # permission_classes = [IsAuthenticated]
    queryset = Diary_Mood.objects.all()
    def get(self, request, *args, **kwargs):
        diary_id = self.kwargs.get('pk')
        user_id = request.user.id
        try:
            diary = Diary.objects.get(diary_id=diary_id)
            # 일기 접근 제한
            # if diary.user_id != user_id:
            #     return Response({
            #         'success' : False,
            #         'status code': status.HTTP_403_FORBIDDEN,
            #         'message' : "일기 접근 권한이 없습니다."
            #     }, status=status.HTTP_403_FORBIDDEN)

            diary_mood_list = Diary_Mood.objects.filter(diary_id=diary_id)
            serializer = self.serializer_class(diary_mood_list, many=True)
            return Response({
                'success' : True,
                'status code': status.HTTP_200_OK,
                'message' : "요청에 성공하였습니다.",
                'data' : serializer.data
            }, status=status.HTTP_200_OK)
        except Diary_Mood.DoesNotExist:
            return Response({
                'success' : False,
                'status code': status.HTTP_404_NOT_FOUND,
                'message' : "분석된 내용이 없습니다."
            }, status=status.HTTP_404_NOT_FOUND)
        except Diary.DoesNotExist:
            return Response({
                'success' : False,
                'status code': status.HTTP_404_NOT_FOUND,
                'message' : "일기가 존재하지 않습니다."
            }, status=status.HTTP_404_NOT_FOUND)