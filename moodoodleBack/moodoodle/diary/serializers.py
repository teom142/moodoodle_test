from rest_framework import serializers

from .models import Diary
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