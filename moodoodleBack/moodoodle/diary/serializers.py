from rest_framework import serializers

from .models import Diary
from diary_mood.models import Diary_Mood
from collections import defaultdict

class DiaryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diary
        fields = ('diary_id', 'date', 'content')
        read_only_fields = ['diary_id']

    def create(self, validated_data):
        user_id = self.context['request'].user
        diary = Diary.objects.create(**validated_data, user_id=user_id)
        return diary

class DiaryUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diary
        fields = ('diary_id', 'date', 'content')
        read_only_fields = ['diary_id']

class DiaryMoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diary_Mood
        fields = ('diary_mood_id', 'fear', 'surprised', 'anger', 'sad', 'normal', 'happy', 'aversion', 'color', 'diary_id')

class DiaryDetailSerializer(serializers.ModelSerializer):
    detail = serializers.SerializerMethodField()
    class Meta:
        model = Diary
        fields = ('diary_id', 'detail')
    def get_detail(self, obj):
        moods = Diary_Mood.objects.get(diary_id=obj.diary_id)

        mood_mapping = {
            "fear": "공포",
            "surprise": "놀람",
            "anger": "분노",
            "sad": "슬픔",
            "neutral": "중립",
            "happy": "행복",
            "disgust": "혐오"
        }

        mood_colors = {
            "공포" : "DBD3FB",
            "놀람" : "FEF4A0",
            "분노" : "FF9191",
            "슬픔" : "B5D3FF",
            "중립" : "B3F4B2",
            "행복" : "FBCFE0",
            "혐오" : "FECFAD"
        }
        details = []
        if moods:
            for eng_name, kor_name in mood_mapping.items():
                ratio = getattr(moods, eng_name, 0.0)
                if ratio > 0.0:
                    details.append({
                        "mood_name": kor_name,
                        "mood_color": mood_colors[kor_name],
                        "ratio": int(ratio * 100)
                    })

        details = sorted(details, key=lambda x: x["ratio"], reverse=True)
        return details



    
class CalendarSerializer(serializers.ModelSerializer):
    main_mood_color = serializers.SerializerMethodField()

    class Meta:
        model = Diary
        fields = ('diary_id', 'date', 'content', 'main_mood_color')

    def get_main_mood_color(self, obj):
        moods = Diary_Mood.objects.get(diary_id=obj.diary_id)
        main_mood_color = moods.color
        return main_mood_color


