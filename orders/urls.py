from django.urls import path
from . import views

urlpatterns = [
    path('5/', views.cau_5, name='cau_5'),
    path('5/ajax/dropdown/', views.ajax_dropdown_cau_5, name='ajax_dropdown_cau_5'),
    path('8/', views.CautamView.as_view(), name='cau_8'),
    path('8/ajax/get-points/', views.ajax_get_points, name='ajax_get_points'),
    path('9/', views.cau_9, name='cau_9'),
    path('12/', views.cau_12, name='cau_12'),
    path('14/', views.cau_14, name='cau_14'),
]