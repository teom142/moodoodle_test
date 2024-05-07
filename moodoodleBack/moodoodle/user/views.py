# views.py
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from rest_framework.generics import CreateAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from . import serializers
from .models import users
from .serializers import UserRegistrationSerializer, UserLoginSerializer, MypageSerializer, UserLogoutSerializer

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
            'status code': status_code,
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
                    'status code' : status.HTTP_200_OK,
                    'message' : "요청에 성공하였습니다.",
                    'data' : serializer.data
                }
                return Response(response, status=status.HTTP_200_OK)
            else:
                return Response({
                'success' : False,
                'status code': status.HTTP_404_NOT_FOUND,
                'message' : "로그인에 실패하였습니다."
            }, status=status.HTTP_404_NOT_FOUND)

    
class MypageAPIView(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = MypageSerializer
    queryset = users.objects.all()
    # lookup_field = 'id'
        
    def get(self, request, *args, **kwargs):
        id = request.user.id
        try:
            user = users.objects.get(id=id)
            serializer = MypageSerializer(user)
            response_data = {
                'success' : True,
                'status code': status.HTTP_200_OK,
                'message' : "요청에 성공하였습니다.",
                'id' : id,
                'data' : serializer.data
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except users.DoesNotExist:
            return Response({
                'success' : False,
                'status code': status.HTTP_404_NOT_FOUND,
                'message' : "해당 유저가 없습니다."
            }, status=status.HTTP_404_NOT_FOUND)
    
    def patch(self, request, *args, **kwargs):
        id = request.user.id
        serializer_data = request.data
        try:
            user = users.objects.get(id=id)
        except users.DoesNotExist:
            return Response({
                'success': False,
                'status code': status.HTTP_404_NOT_FOUND,
                'message' : "유저가 존재하지 않습니다."
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = self.serializer_class(
            user, data=serializer_data, partial=True
        )
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
        
class UserLogoutView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = users.objects.all()
    serializer_class = UserLogoutSerializer

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        obj = queryset.get(pk=self.request.user.user_id)
        self.check_object_permissions(self.request, obj)
        return obj

    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({
                'success' : True,
                'status code': status.HTTP_200_OK,
                'message': "로그아웃에 성공하였습니다."
            }, status=status.HTTP_200_OK)