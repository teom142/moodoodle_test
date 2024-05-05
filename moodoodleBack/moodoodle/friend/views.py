# friend views.py
from user.models import users
from .models import friend
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import FriendSerializer, FriendListSerializer

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
        response = {
            'success' : True,
            'status code': status.HTTP_200_OK,
            'message': '요청에 성공하였습니다.',
            'result': serializer.data
        }
        return Response(response, status=status.HTTP_200_OK)

class FriendSearchView(RetrieveAPIView):
    queryset = users.object.all()
    serializer_class = FriendListSerializer
    lookup_field = 'id'

    def get(self, request, *args, **kwargs):
        try:
            obj = self.get_object()
            serializer = self.get_serializer(obj)
            response = {
                'success': True,
                'status_code': status.HTTP_200_OK,
                'message': '요청에 성공하였습니다.',
                'nickname': serializer.data.get('nickname'),
                'profile_image': serializer.data.get('profile_image'),
                'description': serializer.data.get('description')
            }
            return Response(response, status=status.HTTP_200_OK)
        except users.DoesNotExist:
            response = {
                'success' : False,
                'status code': status.HTTP_404_NOT_FOUND,
                'message': '유저를 찾을 수 없습니다.',
            }
            return Response(response, status=status.HTTP_404_NOT_FOUND)


class FriendAddView(CreateAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = FriendSerializer

    def post(self, request, to_user_id):
        from_user = request.user

        try:
            to_user = users.object.get(pk=to_user_id)
        except users.DoesNotExist:
            response = {
                'success' : False,
                'status code': status.HTTP_404_NOT_FOUND,
                'message': '유저를 찾을 수 없습니다.',
            }
            return Response(response, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.serializer_class(data={'from_user': from_user.pk, 'to_user': to_user.pk})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        response = {
            'success': True,
            'status_code': status.HTTP_201_CREATED,
            'message': '요청에 성공하였습니다.'
        }
        return Response(response, status=status.HTTP_201_CREATED)

class FriendDeleteView(DestroyAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = FriendSerializer

    def delete(self, request, to_user_id):
        from_user = request.user

        try:
            friends1 = friend.objects.get(from_user=from_user, to_user_id=to_user_id)
            friends2 = friend.objects.get(from_user_id=to_user_id, to_user=from_user)
        except friend.DoesNotExist:
            response = {
                'success' : False,
                'status code': status.HTTP_404_NOT_FOUND,
                'message': '유저를 찾을 수 없습니다.',
            }
            return Response(response, status=status.HTTP_404_NOT_FOUND)
        
        friends1.delete()
        friends2.delete()
        response = {
            'success': True,
            'status_code': status.HTTP_204_NO_CONTENT,
            'message': '요청에 성공하였습니다.'
        }
        return Response(response, status=status.HTTP_204_NO_CONTENT)

# 예외 처리, 친구 추가 알람, 달력 조회 추가