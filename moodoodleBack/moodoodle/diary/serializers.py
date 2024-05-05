from rest_framework import serializers

from .models import Diary, diary_mood
from collections import defaultdict
from .mood_colors import mood_colors

class DiaryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diary
        fields = ('diary_id', 'user_id', 'date', 'content')
        # read_only_fields = ['user_id']

    def validate(self, data):
        user_id = data.get('user_id')
        date = data.get('date')

        if Diary.objects.filter(user_id=user_id, date=date).exists():
            raise serializers.ValidationError("이미 이 날짜에 작성된 일기가 있습니다.")
        return data
    def create(self, validated_data):
        diary = Diary.objects.create(**validated_data)
        return diary

class DiaryUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diary
        fields = ('diary_id', 'user_id', 'date', 'content')
        # read_only_fields = ['user_id']
    def validate(self, data):
        user_id = data.get('user_id')
        date = data.get('date')
        diary_id = self.instance.diary_id if self.instance else None
        diary = Diary.objects.get(diary_id=diary_id)
        if user_id != diary.user_id:
            raise serializers.ValidationError("다른 사용자의 일기를 수정할 수 없습니다.")
        existing_diary = Diary.objects.filter(user_id=user_id, date=date).exclude(diary_id=diary_id).first()
        if existing_diary:
            raise serializers.ValidationError("이미 이 날짜에 작성된 일기가 있습니다.")
        return data
    
class MonthlyCalendarSerializer(serializers.ModelSerializer):
    main_mood_color = serializers.SerializerMethodField()

    class Meta:
        model = Diary
        fields = ('diary_id', 'date', 'content', 'main_mood_color')

    def get_main_mood_color(self, obj):
        main_mood_ratio = defaultdict(int)
        mood_list = diary_mood.objects.filter(diary_id=obj)
        for mood in mood_list:
            for color, tag in mood_colors.items():
                if mood.title in tag:
                    main_mood_ratio[color] += mood.ratio
        if main_mood_ratio:
            main_mood_color = max(main_mood_ratio, key=main_mood_ratio.get) 
        else:
            main_mood_color = None
        return main_mood_color
