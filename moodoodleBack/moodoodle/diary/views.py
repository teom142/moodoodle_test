from django.shortcuts import render

from rest_framework import status
from rest_framework.generics import CreateAPIView, UpdateAPIView, RetrieveAPIView, DestroyAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from . import serializers
from .models import Diary
from .serializers import DiaryCreateSerializer, DiaryUpdateSerializer, serializers, MonthlyCalendarSerializer
from calendar import monthrange
from datetime import date, timedelta

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

class MonthlyCalendarView(ListAPIView):
    serializer_class = MonthlyCalendarSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        year = int(self.kwargs['year'])
        month = int(self.kwargs['month'])
        start_date = date(year, month, 1)
        end_date = date(year, month, monthrange(year, month)[1])
        current_date = date.today()

        if date(year, month, 1) > current_date:
            raise ValueError("미래의 날짜는 접근 불가능합니다.")

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