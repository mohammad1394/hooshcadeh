from .sign_up import SignUpView
from .sign_up_verify_code import SignUpVerifyCodeView
from .login import LoginView
from .login_verify_code import LoginVerifyCodeView
from .resent_otp_code import ResentOtpCodeView
from .teacher_detail import TeacherDetailView
from .profile import ProfileDetailView
from .update_profile import ProfileUpdateView

__all__ = [
    'SignUpView',
    'SignUpVerifyCodeView',
    'LoginView',
    'LoginVerifyCodeView',
    'ResentOtpCodeView',
    'TeacherDetailView',
    'ProfileDetailView',
    'ProfileUpdateView',
]