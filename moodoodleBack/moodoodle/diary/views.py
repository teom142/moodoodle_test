from django.shortcuts import render

from rest_framework import status
from rest_framework.generics import CreateAPIView, UpdateAPIView, RetrieveAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from . import serializers
from .models import Diary
from .serializers import DiaryCreateSerializer, DiaryUpdateSerializer, serializers

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
                'message': e.detail
            }, status=status.HTTP_400_BAD_REQUEST)

class DiaryUpdateView(UpdateAPIView, RetrieveAPIView):
    serializer_class = DiaryUpdateSerializer
    queryset = Diary.objects.all()
    # permission_classes = [IsAuthenticated]

    def get_object(self):
        diary_id = self.kwargs.get('pk')
        try:
            return Diary.objects.get(diary_id = diary_id)
        except Diary.DoesNotExist:
            status_code = status.HTTP_404_NOT_FOUND
            return Response(
                {
                    'success' : False,
                    'status code' : status_code,
                    'message' : "일기가 존재하지 않습니다."
                },
                status=status_code)

    def patch(self, request, *args, **kwargs):
        self.kwargs['partial'] = True
        return self.partial_update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        diary = self.get_object()
        serializer = self.get_serializer(diary, data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({
                'success' : True,
                'status code': status.HTTP_200_OK,
                'message': "요청에 성공하였습니다.",
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        except serializers.ValidationError as e:
            return Response({
                'success' : False,
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': e.detail
            }, status=status.HTTP_400_BAD_REQUEST)


class DiaryDeleteView(DestroyAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = Diary.objects.all()
    def get_object(self):
        diary_id = self.kwargs.get('pk')
        try:
            return Diary.objects.get(diary_id=diary_id)
        except Diary.DoesNotExist:
            status_code = status.HTTP_404_NOT_FOUND
            return Response({
                    'success': False,
                    'status code': status_code,
                    'message': "일기가 존재하지 않습니다."
                    }, status=status_code)
    def delete(self, request, *args, **kwargs):
        try:
            diary_id = self.kwargs.get('pk')
            diary = Diary.objects.get(diary_id=diary_id)
            diary.delete()
            return Response({
                'success' : True,
                'status code': status.HTTP_200_OK,
                'message' : "요청에 성공하였습니다."
            }, status=status.HTTP_200_OK)
        except Diary.DoesNotExist:
            return Response({
                'success' : False,
                'status code': status.HTTP_404_NOT_FOUND,
                'message' : "일기가 존재하지 않습니다."
            }, status=status.HTTP_404_NOT_FOUND)
