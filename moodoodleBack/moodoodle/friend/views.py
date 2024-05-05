# friend views.py
from django.shortcuts import get_object_or_404
from user.models import users
from .models import friend
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import FriendListSerializer

class FriendListView(ListAPIView):
    serializer_class = FriendListSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.id
        user_friends = friend.objects.filter(from_user_id=user_id) or friend.objects.filter(to_user_id=user_id)
        friends_list = []

        for friends in user_friends:
            if friend.objects.filter(to_user_id=friends.from_user_id, from_user_id=friends.to_user_id).exists():
                friends_list.append(friends.to_user_id)
        return users.object.filter(pk__in=friends_list)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response({
            'success' : True,
            'status code': status.HTTP_200_OK,
            'message': '요청에 성공하였습니다.',
            'result': serializer.data
        }, status=status.HTTP_200_OK)

class FriendSearchView(APIView):
    def get(self, request, to_user_id):
        user = get_object_or_404(users, pk=to_user_id)
        serializer = FriendListSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class FriendAddView(APIView):
    def post(self, request, to_user_id):
        from_user = request.user
        to_user = get_object_or_404(users, pk=to_user_id)
        friend.objects.create(from_user=from_user, to_user=to_user)
        return Response(status=status.HTTP_201_CREATED)

class FriendDeleteView(APIView):
    def delete(self, request, to_user_id):
        from_user = request.user
        friends = get_object_or_404(friend, from_user=from_user, to_user_id=to_user_id)
        friends.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# 예외 처리, 친구 추가 알람, 달력 조회 추가