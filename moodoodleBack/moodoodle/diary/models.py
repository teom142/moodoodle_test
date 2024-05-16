from django.db import models
from user.models import users
from django.conf import settings
from django.core.exceptions import ValidationError
# Create your models here.
class DiaryManager(models.Manager):
    def post_diary(self, user_id, date, content):
        diary = self.model(
            user_id=user_id,
            date=date,
            content=content,
        )
        diary.save(using=self._db)
        return diary

    def update_diary(self, user_id, date, content):
        self.save(user_id, date=date, content=content)

    def delete_diary(self):
        self.delete(using=self._db)

class Diary(models.Model):
    diary_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(users, on_delete=models.CASCADE, db_column='user_id')
    date = models.DateField()
    content = models.TextField(max_length=300)
    objects = DiaryManager()
    class Meta:
        db_table = 'diary'
