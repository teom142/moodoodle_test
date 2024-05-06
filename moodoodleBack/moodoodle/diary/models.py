from django.db import models
from user.models import users
from django.conf import settings
from django.core.exceptions import ValidationError
# Create your models here.
class DiaryManager(models.Manager):
    def post_diary(self, user_id, date, content):
        if not user_id:
            raise ValidationError('로그인이 필요합니다.')
        if not date:
            raise ValidationError('날짜가 비었습니다.')
        if not content:
            raise ValidationError('일기 내용이 비었습니다.')
        diary = self.model(
            user_id=user_id,
            date=date,
            content=content,
        )
        diary.save(using=self._db)
        return diary

    def update_diary(self, user_id=None, date=None, content=None):
        if not user_id:
            raise ValidationError('로그인이 필요합니다')
        if not date:
            raise ValidationError('날짜가 비었습니다.')
        if not content:
            raise ValidationError('일기 내용이 비었습니다.')

        self.save(user_id, date=date, content=content)

    def delete_diary(self):
        self.delete(using=self._db)

class Diary(models.Model):
    diary_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(users, on_delete=models.CASCADE, db_column='user_id')
    date = models.DateField()
    content = models.TextField()
    objects = DiaryManager()
    class Meta:
        db_table = 'diary'

class DiaryMoodManager(models.Manager):
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
    title = models.CharField(max_length=20)
    ratio = models.IntegerField(default=0)
    color = models.CharField(max_length=6)

    objects = DiaryMoodManager()
    class Meta:
        db_table = 'diary_mood'
