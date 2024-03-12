from django.db import models

# Create your models here.
class event(models.Model):
    event_title = models.CharField(max_length=20)
    event_description = models.CharField(max_length=70)
    event_date = models.DateField()