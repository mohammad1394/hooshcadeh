from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.core.exceptions import ValidationError
from user.serializers import LoginSerilizer
from user.models import VerifyCodeModel, UserModel
from utils.otp_code import send_otp_code


class LoginView(APIView):
    permission_classes = [~IsAuthenticated]


    def post(self, request):
        serializer = LoginSerilizer(data=request.data)
        if serializer.is_valid():
            phone_number = serializer.validated_data['phone_number']
            if not UserModel.objects.filter(phone_number=phone_number).exists():
                return Response({
                'success': False,
                'message': 'این شماره تلفن وجود ندارد'
                }, status=status.HTTP_200_OK)

            request.session['login_phone_number'] = phone_number
            try:
                otp = VerifyCodeModel.objects.create_code(
                    phone_number=phone_number
                )
            except ValidationError as e:
                return Response({
                    'success': False,
                    'error': e.message
                }, status=status.HTTP_400_BAD_REQUEST)
            send_otp_code(otp)
            return Response({
                'success': True,
                'message': 'کد یکبار مصرف ارسال شد'
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
