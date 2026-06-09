from django.urls import path
from .views import SiteSettingDetailView


app_name = 'pages'

urlpatterns = [
    path('site-settings/', SiteSettingDetailView.as_view(), name='site-settings-detail'),
]