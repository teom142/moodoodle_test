from rest_framework import serializers
from django.contrib.auth import authenticate, login
from django.utils import timezone
from .models import users

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = users
        fields = ('id', 'password', 'nickname', 'birthdate')

    def create(self, validated_data):
        user = users.objects.create_user(**validated_data)
        return user
    
class UserLoginSerializer(serializers.Serializer):
    user_id = serializers.IntegerField(read_only=True)
    id = serializers.CharField(max_length=20)
    password = serializers.CharField(max_length=255, write_only=True)
    last_login = serializers.CharField(max_length=255, read_only=True)

class UserLogoutSerializer(serializers.Serializer):
    class Meta:
        model = users
        fields = '__all__'

class MypageSerializer(serializers.ModelSerializer):
    class Meta:
        model = users
        fields = ('id', 'nickname', 'description', 'public', 'profile_image')
