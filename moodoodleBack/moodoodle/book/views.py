from django.shortcuts import render

from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from .models import Book_Mapping
from .serializers import BookMappingSerializer

class BookMappingView(CreateAPIView):
    serializer_class = BookMappingSerializer

    def get(self, request, *args, **kwargs):
        diary_id = self.kwargs.get('diary_id')
        id = self.kwargs.get('id')

        try:
            book = Book_Mapping.objects.get(diary_id=diary_id)
            result = BookMappingSerializer(book).data
        except Book_Mapping.DoesNotExist:
            return Response({
                'success': False,
                'status_code': status.HTTP_404_NOT_FOUND,
                'message': "Book_Mapping을 찾을 수 없습니다.",
            }, status=status.HTTP_404_NOT_FOUND)

        return Response({
            'success': True,
            'status_code': status.HTTP_200_OK,
            'message': "요청에 성공하였습니다.",
            'diary_id': diary_id,
            'result': result
        }, status=status.HTTP_200_OK)