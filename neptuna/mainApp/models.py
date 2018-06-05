from django.db import models
import datetime

# Create your models here.
class Project(models.Model):
    name = models.CharField(max_length=50)
    cle = models.CharField(max_length=50,primary_key=True)
    description=models.TextField(default='')
    data = models.IntegerField(default=0)
    analyse = models.IntegerField(default=0)
    dashboard = models.IntegerField(default=0)
    connector = models.IntegerField(default=0)
    notebook=models.IntegerField(default=0)
    model = models.IntegerField(default=0)
    date=models.DateField(default=datetime.datetime.now)
