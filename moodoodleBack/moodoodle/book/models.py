from django.db import models
from diary.models import Diary

class Book_Mapping(models.Model):
    book_mapping_id = models.AutoField(primary_key=True)
    diary_id = models.ForeignKey(Diary, on_delete=models.CASCADE, db_column='diary_id')
    title = models.CharField(max_length=50)
    author = models.CharField(max_length=50)
    cover = models.CharField(max_length=100)
    description = models.TextField(max_length=100)

    class Meta:
        db_table = 'book_mapping'