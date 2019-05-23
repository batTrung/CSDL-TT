import json
import random
import datetime
from django.shortcuts import render
from django.views.decorators.http import require_POST
from django.http import JsonResponse
from django.core.files.storage import default_storage
from django.views import View
from django.template.loader import render_to_string
from .models import Caunam
from .forms import CautamForm, CaunamForm
from .algorithms import TrieNode, backtrackingMaze, getNeighbors
         
# ============================================= #
# 				DJANGO VIEW (Python)			#
# ============================================= #
random.seed(datetime.datetime.now())

def grid_maker(h):
	return [
        [random.randint(-5, 5) for _ in range(h)]
        for _ in range(h)
    ]

grid = grid_maker(5)

def cau_2(request):
	return render(request, 'orders/cau2.html',{'section':'cau'})

def ajax_get_solution(request):
	data = {}
	(data['solu'],data['total']) = backtrackingMaze(grid)

	return JsonResponse(data)

def ajax_get_random_node(request):
	global grid
	data = {}
	grid[0][0] = 0
	grid[4][4] = 0
	data['grid'] = grid

	return JsonResponse(data)

def cau_5(request):
	data = {}
	form = CaunamForm()
	if request.method == "POST":
		form = CaunamForm(request.POST)
		if form.is_valid():
			form.save()
			return JsonResponse(data)

	return render(request, 'orders/cau5.html', {'form':form,'section':'cau'})

def ajax_dropdown_cau_5(request):
	root = TrieNode()
	data = {}
	val = request.GET.get('title')
	if val == '':
		data['result'] = False
		return JsonResponse(data)

	titles = list(Caunam.objects.values_list('title',flat=True))
	for t in titles:
		root.insert(t)

	# get Data Prefix Tree Algorithms
	result = root.search(val)
	if len(result) < 1:
		data['result'] = False
	else:
		data['result'] = True
		data['data_html'] = render_to_string('orders/includes/result_cau_5.html',{'result':result})		
	
	return JsonResponse(data)

def cau_7(request):
	return render(request, 'orders/cau7.html',{'section':'cau'})

def cau_9(request):
	return render(request, 'orders/cau8.html')

def cau_12(request):
	return render(request, 'orders/cau8.html')

def cau_14(request):
	return render(request, 'orders/cau8.html')

#-----------------> Cau 8
dataJson = ''

class CautamView(View):
	def get(self, request):
		form = CautamForm()

		return render(self.request, 'orders/cau8.html', {'form': form,'section':'cau'})

	def post(self, request):
		global dataJson
		form = CautamForm(self.request.POST, self.request.FILES)
		if form.is_valid():
			cautam = form.save()
			f = default_storage.open(cautam.file.url[7:], 'r')
			dataFile = f.read()
			dataJson = json.loads(dataFile)
			dataReturn = json.dumps(dataFile)
			data = {'is_valid': True, 'name': cautam.file.name, 'url': cautam.file.url,'data':json.loads(dataReturn)}
		else:
			data = {'is_valid': False}

		return JsonResponse(data)

def ajax_get_points(request):
	data = {}
	klimit = int(request.GET.get('k'))
	myloca = [float(request.GET.get('lat')), float(request.GET.get('lng'))]

	# kdTree Algorithms
	data['result'] = getNeighbors(dataJson, myloca, klimit)
	print(data['result'])

	return JsonResponse(data)
# -----------------------> End Cau 8