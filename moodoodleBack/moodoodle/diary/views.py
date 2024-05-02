from django.shortcuts import render

from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated
from .models import Diary
from .serializers import DiarySerializer


class DiaryRegistrationView(CreateAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = DiarySerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(title=request.data['title'], content=request.data['content'], date=request.data['date'])
        status_code = status.HTTP_201_CREATED
        response = {
            'success' : True,
            'status code' : status_code,
            'message' : "요청에 성공하셨습니다.",
            'title' : serializer.data['title'],
            'date' : serializer.data['date'],
            'content' : serializer.data['content']
        }
        return Response(response, status=status_code)