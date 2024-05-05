from django.db import models
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
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateField()
    content = models.TextField()
    objects = DiaryManager()
    class Meta:
        db_table = 'diary'
        
class diary_mood(models.Model):
    dairy_mood_id = models.AutoField(primary_key=True)
    diary_id = models.ForeignKey(Diary, on_delete=models.CASCADE)
    title = models.CharField(max_length=20)
    ratio = models.SmallIntegerField()
    mood_color = models.CharField(max_length=20)

    class Meta:
        db_table = 'diary_mood'