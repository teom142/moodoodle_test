# music serializers.py
from rest_framework import serializers
from .models import Music, Music_Mood

class MusicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Music
        fields = ('title', 'artist', 'genre', 'cover')

class MusicMooodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Music_Mood
        fields = "__all__"