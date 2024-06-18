# music serializers.py
from rest_framework import serializers
from .models import Music, Music_Mood, Music_Mapping

class MusicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Music
        fields = "__all__"

class MusicMoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Music_Mood
        fields = "__all__"

class MusicMappingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Music_Mapping
        fields = "__all__"