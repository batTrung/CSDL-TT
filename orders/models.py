from django.db import models

class Cautam(models.Model):
	file = models.FileField(upload_to="cau8/")

class Caunam(models.Model):
	title = models.CharField(max_length=50)
	
	def __str__(self):
		return self.title

class Cauhai(models.Model):
	file = models.FileField(upload_to="cau2/")