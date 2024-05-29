from rest_framework import serializers
from .models import users, Survey


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
        fields = ('nickname', 'description', 'public', 'profile_image')

class DuplicatedSerializer(serializers.ModelSerializer):
    class Meta:
        model = users
        fields = ['id']

class UserSurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = Survey
        fields = ('user_id', 'question', 'answer')
        read_only_fields = ['user_id', 'question']

    def create(self, validated_data):
        user_id = self.context.get('user_id')
        question = self.context.get('question')
        answer = validated_data['answer']
        survey = Survey.objects.create(user_id=user_id, question=question, answer=answer)
        return survey