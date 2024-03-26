from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
class event(models.Model):
    event_user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    event_title = models.CharField(max_length=20)
    event_description = models.CharField(max_length=100, null=True, blank=True)
    event_date = models.DateField()
    
    def __str__(self):
        return self.event_title
    
