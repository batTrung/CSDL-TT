from collections import defaultdict
from django.shortcuts import render
from django.views.decorators.http import require_POST
from django.http import JsonResponse
from django.core.files.storage import default_storage
from django.views import View
from django.template.loader import render_to_string
import json
from .models import Caunam
from .forms import CautamForm, CaunamForm


# ============================================= #
# 				Algorithms (Python)				#
# ============================================= #

# PREFIX TREE - TRIE 
class TrieNode:
    def __init__(self):
        self.children = defaultdict(TrieNode)
        self.isEnd = False
        
    def insert(self, word):
        node = self
        for w in word:
            node = node.children[w]
        node.isEnd = True

    def search(self, word):
        node = self
        for w in word:
            if w in node.children:
                node = node.children[w]
            else:
                return []
        # Khớp vối tiền tố
        # traverse current node to all leaf nodes
        result = []
        self.traverse(node, list(word), result)
        return [''.join(r) for r in result]

    def traverse(self, root, prefix, result):
        if root.isEnd:
            result.append(prefix[:])
        for c, n in root.children.items():
            prefix.append(c)
            self.traverse(n, prefix, result)
            prefix.pop(-1)

root = TrieNode()         

# ============================================= #
# 				DJANGO VIEW (Python)			#
# ============================================= #
def cau_5(request):
	data = {}
	form = CaunamForm()
	if request.method == "POST":
		form = CaunamForm(request.POST)
		if form.is_valid():
			form.save()
			return JsonResponse(data)

	return render(request, 'orders/cau5.html', {'form':form})

def ajax_dropdown_cau_5(request):
	global root
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

def cau_9(request):
	return render(request, 'orders/cau8.html')

def cau_12(request):
	return render(request, 'orders/cau8.html')

def cau_14(request):
	return render(request, 'orders/cau8.html')

dataJson = ''

class CautamView(View):
	def get(self, request):
		form = CautamForm()

		return render(self.request, 'orders/cau8.html', {'form': form})

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
	print(dataJson[1]['lat'])

	return JsonResponse(data)