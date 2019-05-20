from django.shortcuts import render
from django.views.decorators.http import require_POST
from django.http import JsonResponse


@require_POST
def ajax_check_login(request):
	data = {}
	form  = request.POST()
	data['error'] = False
	return JsonResponse(data)