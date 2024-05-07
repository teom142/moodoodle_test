from django.shortcuts import render, get_object_or_404

from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView, DestroyAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from . import serializers
from .models import Diary, Diary_Mood
from user.models import users
from .serializers import DiaryCreateSerializer, DiaryUpdateSerializer, DiaryDetailSerializer, serializers, CalendarSerializer
from calendar import monthrange
from datetime import date, timedelta

class DiaryCreateView(CreateAPIView):
    serializer_class = DiaryCreateSerializer
    permission_classes = [IsAuthenticated]
    queryset = Diary.objects.all()
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer( data=request.data)
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

class DiaryUpdateView(RetrieveUpdateAPIView):
    serializer_class = DiaryUpdateSerializer
    queryset = Diary.objects.all()
    permission_classes = [IsAuthenticated]
    def get_object(self):
        diary_id = self.kwargs.get('pk')
        return get_object_or_404(Diary, diary_id=diary_id)

    def update(self, request, *args, **kwargs):
        diary = self.get_object()
        if diary.user_id != self.request.user:
            return Response({
                'success': False,
                'status code': status.HTTP_403_FORBIDDEN,
                'message': "일기 접근 권한이 없습니다."
            }, status=status.HTTP_403_FORBIDDEN)
        user_id = self.request.user
        if Diary.objects.filter(user_id=user_id, date=request.data.get('date')).exclude(diary_id=diary.diary_id).first():
            return Response({
                'success': False,
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': "이미 이 날짜에 작성된 일기가 있습니다."
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(self.get_object(), data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'success' : True,
            'status code' : status.HTTP_200_OK,
            'message': "요청에 성공하였습니다.",
            'data': serializer.data
        }, status=status.HTTP_200_OK)


class DiaryDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Diary.objects.all()
    def get_object(self):
        diary_id = self.kwargs.get('pk')
        return get_object_or_404(Diary, diary_id=diary_id)

    def delete(self, request, *args, **kwargs):
            diary = self.get_object()
            if diary.user_id != request.user:
                return Response({
                    'success' : False,
                    'status code': status.HTTP_403_FORBIDDEN,
                    'message' : "일기 접근 권한이 없습니다."
                }, status=status.HTTP_403_FORBIDDEN)
            diary.delete()
            return Response({
                'success' : True,
                'status code': status.HTTP_200_OK,
                'message' : "요청에 성공하였습니다."
            }, status=status.HTTP_200_OK)


class DiaryDetailView(APIView):
    serializer_class = DiaryDetailSerializer
    permission_classes = [IsAuthenticated]
    queryset = Diary_Mood.objects.all()
    def get(self, request, *args, **kwargs):
        try:
            diary_id = self.kwargs.get('pk')
            diary = get_object_or_404(Diary, diary_id=diary_id)
            if diary.user_id != request.user:
                return Response({
                    'success' : False,
                    'status code': status.HTTP_403_FORBIDDEN,
                    'message' : "일기 접근 권한이 없습니다."
                }, status=status.HTTP_403_FORBIDDEN)
            serializer = DiaryDetailSerializer(diary)
            response_data = {
                'success' : True,
                'status code': status.HTTP_200_OK,
                'message' : "요청에 성공하였습니다.",
                'diary_id' : diary_id,
                'detail' : serializer.data['detail']
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except Diary_Mood.DoesNotExist:
            return Response({
                'success' : False,
                'status code': status.HTTP_404_NOT_FOUND,
                'message' : "분석된 내용이 없습니다."
            }, status=status.HTTP_404_NOT_FOUND)

class MonthlyCalendarView(ListAPIView):
    serializer_class = CalendarSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        year = int(self.kwargs['year'])
        month = int(self.kwargs['month'])
        start_date = date(year, month, 1)
        end_date = date(year, month, monthrange(year, month)[1])
        current_date = date.today()

        if date(year, month, 1) > current_date:
            raise ValueError("접근 불가능한 날짜입니다.")

        return Diary.objects.filter(date__range=(start_date, end_date))

    def list(self, request, *args, **kwargs):
        year = int(self.kwargs['year'])
        month = int(self.kwargs['month'])
        start_date = date(year, month, 1)
        end_date = date(year, month, monthrange(year, month)[1])

        try:
            queryset = self.get_queryset()
        except ValueError as e:
            return Response({            
                'success' : False,
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': str(e),
            }, status=status.HTTP_400_BAD_REQUEST)

        results = []
        current_date = start_date
        while current_date <= end_date:
            diary = queryset.filter(date=current_date).first()
            if diary:
                serializer = self.serializer_class(diary)
                results.append(serializer.data)
            else:
                results.append({
                    'diary_id': None,
                    'date': current_date.isoformat(),
                    'content': None,
                    'main_mood_color': None
                })
            current_date += timedelta(days=1)

        return Response({
            'success' : True,
            'status code': status.HTTP_200_OK,
            'message': '요청에 성공하였습니다.',
            'result': results
        }, status=status.HTTP_200_OK)

class YearlyCalendarView(ListAPIView):
    serializer_class = CalendarSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        year = int(self.kwargs['year'])
        start_date = date(year, 1, 1)
        end_date = date(year, 12, monthrange(year, 12)[1])
        current_year = date.today().year

        if year > current_year:
            raise ValueError("접근 불가능한 연도입니다.")
        user_id = self.request.user.user_id
        return Diary.objects.filter(date__range=(start_date, end_date), user_id=user_id)

    def list(self, request, *args, **kwargs):
        year = int(self.kwargs['year'])
        start_date = date(year, 1, 1)
        end_date = date(year, 12, monthrange(year, 12)[1])

        try:
            queryset = self.get_queryset()
        except ValueError as e:
            return Response({
                'success' : False,
                'status code': status.HTTP_400_BAD_REQUEST,
                'message': str(e),
            }, status=status.HTTP_400_BAD_REQUEST)

        results = []
        current_date = start_date
        while current_date <= end_date:
            diary = queryset.filter(date=current_date).first()
            if diary:
                serializer = self.serializer_class(diary)
                results.append({
                    'diary_id': serializer.data.get('diary_id'),
                    'date': serializer.data.get('date'),
                    'main_mood_color': serializer.data.get('main_mood_color')
                })
            else:
                results.append({
                    'diary_id': None,
                    'date': current_date.isoformat(),
                    'main_mood_color': None
                })
            current_date += timedelta(days=1)

        return Response({
            'success' : True,
            'status code': status.HTTP_200_OK,
            'message': '요청에 성공하였습니다.',
            'result': results
        }, status=status.HTTP_200_OK)