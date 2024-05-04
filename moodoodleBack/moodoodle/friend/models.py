# friend models.py
from django.db import models
from user.models import users

class friend(models.Model):
    friend_id = models.AutoField(primary_key=True)
    from_user = models.ForeignKey(users, on_delete=models.CASCADE, related_name='sent_friend')
    to_user = models.ForeignKey(users, on_delete=models.CASCADE, related_name='received_friend')
    created = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'friend'