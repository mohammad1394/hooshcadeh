from django.urls import path
from .views import (
    SignUpView, 
    SignUpVerifyCodeView, 
    LoginView, 
    LoginVerifyCodeView, 
    ResentOtpCodeView,
    TeacherDetailView,
)

app_name = 'user'

urlpatterns = [
    path('sign-up/', SignUpView.as_view(), name='sign-up'),
    path('sign-up/verify-code/', SignUpVerifyCodeView.as_view(), name='sign-up-verify-code'),
    path('login/', LoginView.as_view(), name='login'),
    path('login/verify-code/', LoginVerifyCodeView.as_view(), name='login-verify-code'),
    path('resent/verify-code/', ResentOtpCodeView.as_view(), name='resent-verify-code'),
    path('teacher/<int:pk>/', TeacherDetailView.as_view(), name='teacher-detail'),
]