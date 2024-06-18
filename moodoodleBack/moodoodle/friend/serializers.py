# friend serializers.py
from rest_framework import serializers
from user.models import users
from diary.models import Diary
from diary_mood.models import Diary_Mood
from .models import Friend

class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend
        fields = ('from_user', 'to_user')
        
class FriendListSerializer(serializers.ModelSerializer):
    class Meta:
        model = users
        fields = ('id', 'nickname', 'profile_image', 'description', 'public')
        
class FriendRequestSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='from_user.id')
    nickname = serializers.CharField(source='from_user.nickname')
    profile_image = serializers.SerializerMethodField()
    description = serializers.CharField(source='from_user.description')

    class Meta:
        model = Friend
        fields = ('id', 'nickname', 'profile_image', 'description')

    def get_profile_image(self, obj):
        user = users.objects.get(id=obj.from_user.id)
        if user and user.profile_image:
            profile_image = 'https://moodoodlebucket.s3.ap-northeast-2.amazonaws.com/' + str(user.profile_image)
            return profile_image
        else:
            return None

class FriendCalendarSerializer(serializers.ModelSerializer):
    main_mood_color = serializers.SerializerMethodField()

    class Meta:
        model = Diary
        fields = ('diary_id', 'date', 'main_mood_color')

    def get_main_mood_color(self, obj):
        moods = Diary_Mood.objects.get(diary_id=obj.diary_id)
        main_mood_color = moods.color
        return main_mood_color
