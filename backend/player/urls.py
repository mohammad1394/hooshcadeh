from django.urls import path, re_path
from . import views

app_name = 'player'

urlpatterns = [
    path('spotx/', views.SpotPlayerSyncView.as_view(), name='spotx_sync'),
    path('', views.SpotPlayerView.as_view(), name='player'),    
]