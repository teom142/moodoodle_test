from django.db import models
from diary.models import Diary

class BookManager(models.Manager):
    def create_book(self, diary_id, title, author, cover, description):
        book = self.model(diary_id=diary_id,
                          title=title,
                          author=author,
                          cover=cover,
                          description=description
        )
        book.save(using=self._db)
        return book


class Book_Mapping(models.Model):
    book_mapping_id = models.AutoField(primary_key=True)
    diary_id = models.ForeignKey(Diary, on_delete=models.CASCADE, db_column='diary_id')
    title = models.CharField(max_length=50)
    author = models.CharField(max_length=50)
    cover = models.CharField(max_length=100)
    description = models.TextField(max_length=100)

    objects = BookManager()
    class Meta:
        db_table = 'book_mapping'