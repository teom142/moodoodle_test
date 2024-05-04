# friend serializers.py
from rest_framework import serializers
from user.models import users

class FriendListSerializer(serializers.ModelSerializer):
    nickname = serializers.CharField(max_length=20)
    profile_image = serializers.CharField(max_length=50)
    description = serializers.CharField(max_length=50)
    
    class Meta:
        model = users
        fields = ('nickname', 'profile_image', 'description')