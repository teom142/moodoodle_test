# friend serializers.py
from rest_framework import serializers
from user.models import users
from diary.models import Diary
from diary_mood.models import Diary_Mood
from .models import Friend
from collections import defaultdict

class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend
        fields = ('from_user', 'to_user')
        
class FriendListSerializer(serializers.ModelSerializer):
    class Meta:
        model = users
        fields = ('nickname', 'profile_image', 'description')
        
class FriendRequestSerializer(serializers.ModelSerializer):
    nickname = serializers.CharField(source='from_user.nickname')
    profile_image = serializers.CharField(source='from_user.profile_image')
    description = serializers.CharField(source='from_user.description')

    class Meta:
        model = Friend
        fields = ('nickname', 'profile_image', 'description')

class FriendCalendarSerializer(serializers.ModelSerializer):
    main_mood_color = serializers.SerializerMethodField()

    class Meta:
        model = Diary
        fields = ('diary_id', 'date', 'main_mood_color')

    def get_main_mood_color(self, obj):
        mood_colors = {
            'B3F4B2': ['평온', '온화', '안정'],
            'FEF4A0': ['성취감', '뿌듯함', '희망'],
            'FBCFE0': ['행복', '즐거움', '기쁨'],
            'FECFAD': ['열정', '자신감', '용기', '성공'],
            'B5D3FF': ['슬픔', '우울', '피곤함', '지루함'],
            'DBD3FB': ['불안', '공포', '놀람', '두려움'],
            'FF9191': ['화남', '짜증', '분노', '예민']
        }
        main_mood_ratio = defaultdict(int)
        mood_list = Diary_Mood.objects.filter(diary_id=obj)
        for mood in mood_list:
            for color, tag in mood_colors.items():
                if mood.title in tag:
                    main_mood_ratio[color] += mood.ratio
        if main_mood_ratio:
            main_mood_color = max(main_mood_ratio, key=main_mood_ratio.get) 
        else:
            main_mood_color = None
        return main_mood_color