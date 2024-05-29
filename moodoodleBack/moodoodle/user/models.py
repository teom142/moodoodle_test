from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.exceptions import ValidationError

class UserManager(BaseUserManager):
    def create_user(self, id, password, nickname, birthdate):
        user = self.model(
            id = id,
            password = password,
            nickname = nickname,
            birthdate = birthdate,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def update_user(self, user_id, nickname, birthdate, profile_image, description, public):
        if not user_id:
            raise ValidationError('로그인이 필요합니다')
        self.save(nickname=nickname, birthdate=birthdate, profile_image=profile_image, description=description, public=public)
        

class users(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True) 
    id = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=255)
    nickname = models.CharField(max_length=20, blank=True)
    created = models.DateField(auto_now_add=True)
    birthdate = models.DateField()
    profile_image = models.CharField(max_length=50, blank=True, null=True)
    description = models.CharField(max_length=50, blank=True, null=True)
    public = models.BooleanField(default=False)

    USERNAME_FIELD = 'id'
    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:
        db_table = 'users'

class SurveyManager(models.Manager):
    def create(self, user_id, question, answer):
        survey = self.model(
            user_id=user_id,
            question=question,
            answer=answer
        )
        survey.save(using=self._db)
        return survey

class Survey(models.Model):
    survey_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(users, on_delete=models.CASCADE, db_column='user_id')
    question = models.CharField(max_length=50)
    answer = models.CharField(max_length=50)

    objects = SurveyManager()
    class Meta:
        db_table = 'survey'