from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import *
# Create your models here.

class customUser(AbstractUser):
    username=None
    mobile_number=models.CharField(
        max_length=40, 
        null = True,
        blank = True,
        default = ''
    )
    email=models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [] 
    
    objects = UserManager()
    