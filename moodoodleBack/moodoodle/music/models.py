# music models.py
from django.db import models

class Music(models.Model):
    music_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50)
    artist = models.CharField(max_length=20)
    genre = models.CharField(max_length=20)
    cover = models.ImageField(upload_to="albumcover/")

    class Meta:
        db_table = 'music'

class Music_Mood(models.Model):
    music_mood_id = models.AutoField(primary_key=True)
    music_id = models.ForeignKey(Music, on_delete=models.CASCADE, db_column='music_id')
    fear = models.FloatField()
    surprised = models.FloatField()
    anger = models.FloatField()
    sad = models.FloatField()
    normal = models.FloatField()
    happy = models.FloatField()
    aversion = models.FloatField()

    class Meta:
        db_table = 'music_mood'