from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.core.exceptions import ValidationError
from user.models import VerifyCodeModel
from utils.otp_code import send_otp_code



class ResentOtpCodeView(APIView):
    permission_classes = [~IsAuthenticated]

    def post(self, request):
        if "sign_up" in request.session:
            phone_number = request.session["sign_up"]['phone_number']
        elif "login_phone_number" in request.session:
            phone_number = request.session["login_phone_number"]
        else:
            return Response({
                "success": False,
                "message": "شماره تلفن کاربر پیدا نشد لطفا دوباره ثبت نام یا ورود کنید",
            }, status=status.HTTP_400_BAD_REQUEST)
        try:
            otp = VerifyCodeModel.objects.create_code(
                phone_number=phone_number
            )
            send_otp_code(otp)
        except ValidationError as e:
            return Response({
                "success": False,
                "message": e.message,
            }, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({
                "success": True,
                "message": "کد دوباره ارسال شد",
            }, status=status.HTTP_200_OK)