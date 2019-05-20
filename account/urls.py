from django.urls import path
from django.contrib.auth import views as auth_views
from . import views


urlpatterns = [
    path('đăng-nhập/', auth_views.LoginView.as_view(), name='login'),
    path('đăng-xuất/', auth_views.LogoutView.as_view(), name='logout'),
    path('ajax/check-login/', views.ajax_check_login, name='ajax_check_login'),
]