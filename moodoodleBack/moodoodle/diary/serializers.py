from rest_framework import serializers

from .models import Diary, Diary_Mood
from collections import defaultdict

class DiaryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diary
        fields = ('diary_id', 'user_id', 'date', 'content')
        read_only_fields = ('diary_id', 'user_id')

    def validate(self, data):
        user_id = self.context['request'].user
        date = data.get('date')

        if Diary.objects.filter(user_id=user_id, date=date).exists():
            raise serializers.ValidationError("이미 이 날짜에 작성된 일기가 있습니다.")
        return data
    def create(self, validated_data):
        user_id = self.context['request'].user
        diary = Diary.objects.create(**validated_data, user_id=user_id)
        return diary

class DiaryUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diary
        fields = ('diary_id', 'user_id', 'date', 'content')
        read_only_fields = ('diary_id', 'user_id')

class DiaryMoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diary_Mood
        fields = ('diary_mood_id', 'title', 'ratio', 'color', 'diary_id')
        
class DiaryDetailSerializer(serializers.ModelSerializer):
    detail = serializers.SerializerMethodField()
    class Meta:
        model = Diary
        fields = ('diary_id', 'detail')
    def get_detail(self, obj):
        moods = Diary_Mood.objects.filter(diary_id=obj.diary_id)
        mood_colors = {
            "B3F4B2": ["평온", "온화", "안정"],
            "FEF4A0": ["성취감", "뿌듯함", "희망"],
            "FBCFE0": ["행복", "즐거움", "기쁨"],
            "FECFAD": ["열정", "자신감", "용기", "성공"],
            "B5D3FF": ["슬픔", "우울", "피곤함", "지루함"],
            "DBD3FB": ["불안", "공포", "놀람", "두려운"],
            "FF9191": ["화남", "짜증", "분노", "예민"]
        }
        color_data = {}
        for mood in moods:
            if mood.color in mood_colors:
                if mood.color not in color_data:
                    color_data[mood.color] = {
                        'mood_color' : mood.color,
                        'ratio' : 0,
                        'mood_list' : []
                    }
                color_data[mood.color]['mood_list'].append({
                    'diary_mood_id': mood.diary_mood_id,
                    'mood_title': mood.title,
                    'mood_ratio': mood.ratio
                })
                color_data[mood.color]['ratio'] += mood.ratio
        sorted_data = sorted(color_data.values(), key=lambda x: x['ratio'], reverse=True)
        return sorted_data

    
class CalendarSerializer(serializers.ModelSerializer):
    main_mood_color = serializers.SerializerMethodField()

    class Meta:
        model = Diary
        fields = ('diary_id', 'date', 'content', 'main_mood_color')

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
