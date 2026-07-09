from django.urls import path
from .views import SiteSettingDetailView, ContactFormCreateView


app_name = 'pages'

urlpatterns = [
    path('site-settings/', SiteSettingDetailView.as_view(), name='site-settings-detail'),
    path('contact-form/create', ContactFormCreateView.as_view(), name='contact-form-create'),
]