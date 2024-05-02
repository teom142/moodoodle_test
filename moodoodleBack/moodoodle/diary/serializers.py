from rest_framework import serializers

from .models import Diary
class DiarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Diary
        fields = ('diary_id', 'user_id', 'title', 'date', 'content')

    def create(self, validated_data):
        diary = Diary.object.create(**validated_data)
        return diary