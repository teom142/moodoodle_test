from django.db import models
from django.conf import settings
# Create your models here.
class DiaryManager(models.Manager):
    def post_diary(self, user_id, title, date, content):
        diary = self.model(
            user_id=user_id,
            title=title,
            date=date,
            content=content,
        )

        diary.save(using=self._db)
        return diary
class Diary(models.Model):
    diary_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=20)
    date = models.DateField()
    content = models.TextField()
    object = DiaryManager()
    class Meta:
        db_table = 'diary'