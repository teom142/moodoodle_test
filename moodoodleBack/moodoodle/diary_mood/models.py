from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from diary.models import Diary

class DiaryMoodManager(models.Manager):
    def create_mood(self, diary_id, fear, surprised, anger, sad, normal, happy, aversion, color):
        mood = self.model(
            diary_id = Diary.objects.get(diary_id=diary_id),
            fear = fear,
            surprised = surprised,
            anger = anger,
            sad = sad,
            normal = normal,
            happy = happy,
            aversion = aversion,
            color = color
        )
        mood.save(using=self._db)
        return mood
    
    def get_mood(self, user_id, diary_id):
        if not user_id:
            raise ValidationError('로그인이 필요합니다')
        if not diary_id:
            raise ValidationError('일기가 존재하지 않습니다')
        diary_mood_list = self.filter(diary_id=diary_id)
        return diary_mood_list

class Diary_Mood(models.Model):
    diary_mood_id = models.AutoField(primary_key=True)
    diary_id = models.ForeignKey(Diary, on_delete=models.CASCADE, db_column='diary_id')
    fear = models.FloatField()
    surprised = models.FloatField()
    anger = models.FloatField()
    sad = models.FloatField()
    normal = models.FloatField()
    happy = models.FloatField()
    aversion = models.FloatField()
    color = models.CharField(max_length=6)

    objects = DiaryMoodManager()
    class Meta:
        db_table = 'diary_mood'