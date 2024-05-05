# friend serializers.py
from rest_framework import serializers
from user.models import users
from .models import friend

class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = friend
        fields = ('from_user', 'to_user')
        
class FriendListSerializer(serializers.ModelSerializer):
    class Meta:
        model = users
        fields = ('nickname', 'profile_image', 'description')