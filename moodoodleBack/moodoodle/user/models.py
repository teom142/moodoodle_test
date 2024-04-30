from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

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

class users(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True) 
    id = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=255)
    nickname = models.CharField(max_length=20)
    created = models.DateField(auto_now_add=True)
    birthdate = models.DateField()
    profile_image = models.CharField(max_length=50, blank=True, null=True)
    description = models.CharField(max_length=50, blank=True, null=True)
    public = models.BooleanField(default=False)

    USERNAME_FIELD = 'id'
    REQUIRED_FIELDS = []

    object = UserManager()

    def __str__(self):
        return self.user_id

    class Meta:
        db_table = 'users'
