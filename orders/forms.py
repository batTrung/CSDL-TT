from django import forms
from .models import Cautam, Caunam

class CautamForm(forms.ModelForm):
	class Meta:
		model = Cautam
		fields = '__all__'

class CaunamForm(forms.ModelForm):
	class Meta:
		model = Caunam
		fields = ('title',)