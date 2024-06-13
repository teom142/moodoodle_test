# views.py
from calendar import monthrange
from datetime import date

from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from rest_framework.generics import CreateAPIView, UpdateAPIView, RetrieveUpdateAPIView, ListAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from . import serializers
from .models import users, Survey
from drf_yasg.utils import swagger_auto_schema
from diary.models import Diary
from diary_mood.models import Diary_Mood
from .serializers import UserRegistrationSerializer, UserLoginSerializer, MypageSerializer, UserLogoutSerializer, DuplicatedSerializer, UserSurveySerializer
from rest_framework.parsers import MultiPartParser, FormParser

class UserRegistrationView(CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        status_code = status.HTTP_201_CREATED
        response = {
            'success': "true",
            'status_code': status_code,
            'message': "요청에 성공하셨습니다.",
        }
        return Response(response, status=status_code)
    
class UserLoginView(CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserLoginSerializer
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            id = serializer.validated_data['id']
            password = serializer.validated_data['password']
            user = authenticate(request, username=id, password=password)
            if user is not None:
                login(request, user)
                response = {
                    'success' : 'true',
                    'status_code' : status.HTTP_200_OK,
                    'message' : "요청에 성공하였습니다.",
                    'data' : serializer.data
                }
                return Response(response, status=status.HTTP_200_OK)
            else:
                return Response({
                'success' : False,
                'status_code': status.HTTP_404_NOT_FOUND,
                'message' : "로그인에 실패하였습니다."
            }, status=status.HTTP_404_NOT_FOUND)

class DuplicatedView(CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = DuplicatedSerializer
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        id = request.data.get('id')
        if users.objects.filter(id=id).exists():
            response = {
                'success' : False,
                'status_code' : status.HTTP_403_FORBIDDEN,
                'message' : "중복되는 아이디입니다.",
            }
            return Response(response, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({
            'success' : True,
            'status_code': status.HTTP_200_OK,
            'message' : "중복되지 않는 아이디입니다."
        }, status=status.HTTP_200_OK)


class MypageAPIView(RetrieveUpdateAPIView):
    # permission_classes = (IsAuthenticated,)
    serializer_class = MypageSerializer
    queryset = users.objects.all()
    parser_classes = (MultiPartParser, FormParser)
    # lookup_field = 'id'
    
    def get_object(self):
        id = self.kwargs.get('id')
        return get_object_or_404(users, id=id)
    
    def get(self, request, *args, **kwargs):
        try:
            user = self.get_object()
            serializer_data = request.data
            serializer = self.serializer_class(user, data=serializer_data, partial=True)
            serializer.is_valid(raise_exception=True)
            response_data = {
                'success' : True,
                'status_code': status.HTTP_200_OK,
                'message' : "요청에 성공하였습니다.",
                'data' : serializer.data
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except users.DoesNotExist:
            return Response({
                'success' : False,
                'status_code': status.HTTP_404_NOT_FOUND,
                'message' : "해당 유저가 없습니다."
            }, status=status.HTTP_404_NOT_FOUND)
    
    def patch(self, request, *args, **kwargs):
        serializer_data = request.data
        try:
            user = self.get_object()
        except users.DoesNotExist:
            return Response({
                'success': False,
                'status_code': status.HTTP_404_NOT_FOUND,
                'message' : "해당 유저가 없습니다."
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = self.serializer_class(
            user, data=serializer_data, partial=True
        )
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({
                'success' : True,
                'status_code': status.HTTP_200_OK,
                'message': "요청에 성공하였습니다.",
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        except serializers.ValidationError as e:
            return Response({
                'success' : False,
                'status_code': status.HTTP_400_BAD_REQUEST,
                'message': e.detail
            }, status=status.HTTP_400_BAD_REQUEST)

class UserMoodReportView(ListAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = Diary_Mood.objects.all()
    def get(self, request, id, year, month):
        year = self.kwargs.get('year')
        month = self.kwargs.get('month')
        if date(year, month, 1) > date.today():
            return Response({
                'success': False,
                'status_code': status.HTTP_400_BAD_REQUEST,
                'message' : "감정 레포트를 조회할 수 없습니다."
            }, status=status.HTTP_400_BAD_REQUEST)

        start_date = date(year, month, 1)
        end_date = date(year, month, monthrange(year, month)[1])
        id =self.kwargs.get('id')
        user = users.objects.get(id=id)
        diary_list = Diary.objects.filter(user_id=user.user_id, date__range=[start_date, end_date])

        mood_totals = {}

        mood_mapping = {
            "fear": "공포",
            "surprise": "놀람",
            "anger": "분노",
            "sad": "슬픔",
            "neutral": "중립",
            "happy": "행복",
            "disgust": "혐오"
        }

        mood_colors = {
            "공포": "DBD3FB",
            "놀람": "FEF4A0",
            "분노": "FF9191",
            "슬픔": "B5D3FF",
            "중립": "B3F4B2",
            "행복": "FBCFE0",
            "혐오": "FECFAD"
        }

        total_ratio = 0

        for diary in diary_list:
            moods = Diary_Mood.objects.filter(diary_id=diary.diary_id).first()
            if moods:
                for eng_name, kor_name in mood_mapping.items():
                    ratio = int(getattr(moods, eng_name, 0.0)*100)
                    if kor_name not in mood_totals:
                        mood_totals[kor_name] = 0
                    mood_totals[kor_name] += ratio
                    total_ratio += ratio

        if total_ratio == 0:
            return Response({
                'success': False,
                'status_code' : status.HTTP_404_NOT_FOUND,
                'message' : "감정 분석 데이터가 없습니다"
            }, status=status.HTTP_404_NOT_FOUND)



        mood_color_list = []
        for kor_name, ratio in mood_totals.items():
            if ratio > 0:
                mood_color_list.append({
                    'id': kor_name,
                    'color': "#" + mood_colors[kor_name],
                    'value': round((ratio / total_ratio) * 100, 2)
                })
        sorted_mood_color_list = sorted(mood_color_list, key=lambda x: x['value'], reverse=True)

        mood_tag_list = []
        for kor_name, ratio in sorted(mood_totals.items(), key=lambda item: item[1], reverse=True)[:3]:
            if ratio > 0:
                mood_tag_list.append({
                    'tag_name': kor_name,
                    'tag_color': mood_colors[kor_name],
                    'tag_ratio': round((ratio / total_ratio) * 100, 2)
                })

        detail = {
            'mood_color_list': sorted_mood_color_list,
            'mood_tag_list': mood_tag_list
        }

        return Response({
            'success' : True,
            'status_code': status.HTTP_200_OK,
            'message' : "요청에 성공하였습니다.",
            'detail': detail
        }, status=status.HTTP_200_OK)

class UserLogoutView(CreateAPIView):
    # permission_classes = (IsAuthenticated,)
    queryset = users.objects.all()
    serializer_class = UserLogoutSerializer

    def post(self, request):
        logout(request)
        response_data = {
            'success': True,
            'status code': status.HTTP_200_OK,
            'message': "로그아웃 되었습니다.",
        }
        return Response(response_data, status=status.HTTP_200_OK)
    
class UserDeleteView(DestroyAPIView):
    serializer_class = UserLogoutSerializer
    queryset = users.objects.all()        

    def delete(self, request, *args, **kwargs):
        id = kwargs.get('id')
        user = users.objects.get(id = id)
        diary = Diary.objects.filter(user_id = user)
        for diary_i in diary:
            diary_mood = Diary_Mood.objects.get(diary_id = diary_i.diary_id)
            diary_mood.delete()
            diary_i.delete()
            # diary = Diary.objects.get(user_id = user)
        
        user.delete()

        response_data = {
            'success': True,
            'status code': status.HTTP_200_OK,
            'message': "삭제 되었습니다.",
        }
        return Response(response_data, status=status.HTTP_200_OK)
        
class UserSurveyView(CreateAPIView):
    # permission_classes = (IsAuthenticated,)
    serializer_class = UserSurveySerializer
    def post(self, request, question):
        if question not in ['positive', 'negative']:
            return Response({
                'success' : False,
                'status_code' : status.HTTP_400_BAD_REQUEST,
                'message' : "question 파라미터 값이 잘못되었습니다."
            }, status=status.HTTP_400_BAD_REQUEST)

        answers = request.data.get('answer', [])

        if not answers:
            return Response({
                'success' : False,
                'status_code' : status.HTTP_400_BAD_REQUEST,
                'message' : "장르를 1개 이상 선택해주세요."
            }, status=status.HTTP_400_BAD_REQUEST)
        if not isinstance(answers, list):
            return Response({
                'success': False,
                'status_code': status.HTTP_400_BAD_REQUEST,
                'message' : "답변은 배열 형식이어야 합니다."
            }, status=status.HTTP_400_BAD_REQUEST)
        genre = ["인디/포크", "록발라드", "록/얼터너티브", "R&B", "댄스", "힙합", "발라드"]

        id = request.data.get('id')
        user_id = users.objects.get(id=id)
        survey_responses = []
        for answer in answers:
            if answer == "상관없음":
                for i in genre:
                    if Survey.objects.filter(question=question, answer=i, user_id=user_id).exists():
                        continue
                    survey_data = {'answer' : i}
                    serializer = UserSurveySerializer(data=survey_data,
                                                      context={'user_id': user_id, 'question': question})
                    if serializer.is_valid():
                        survey_responses.append(serializer.save())
            else:
                if Survey.objects.filter(question=question, answer=answer, user_id=user_id).exists():
                    continue
                survey_data = {'answer': answer}
                serializer = UserSurveySerializer(data=survey_data, context={'user_id': user_id, 'question': question})
                if serializer.is_valid():
                    survey_responses.append(serializer.save())

        response_serializer = UserSurveySerializer(survey_responses, many=True)

        return Response({
            'success' : True,
            'status_code': status.HTTP_201_CREATED,
            'message' : "요청에 성공하였습니다.",
            "data" : response_serializer.data
        },status=status.HTTP_201_CREATED)
