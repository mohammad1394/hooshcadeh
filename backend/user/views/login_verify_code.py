import datetime
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from user.models import UserModel
from user.serializers import VerifyCodeSerializer
from user.models import VerifyCodeModel


class LoginVerifyCodeView(APIView):
    permission_classes = [~IsAuthenticated]

    def post(self, request):
        serializer = VerifyCodeSerializer(data=request.data)

        if serializer.is_valid():
            if 'login_phone_number' not in request.session:
                return Response({
                    'success': False,
                    'message': 'اطلاعات شماره تلفن حذف شده دوباره وارد شوید'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            phone_number = request.session['login_phone_number']
            otp_qs = VerifyCodeModel.objects.filter(phone_number=phone_number)

            if not otp_qs.exists():
                return Response({
                    'success': False,
                    'message': 'کدی به این شماره تلفن ارسال نشده'
                }, status=status.HTTP_400_BAD_REQUEST)
            otp = otp_qs.first()

            if otp.created + datetime.timedelta(minutes=3) <= timezone.now():
                otp.delete()
                return Response({
                    'success': False,
                    'message': 'زمان کد به اتمام رسیده است دوباره درخواست ارسال کد کنید'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            if otp.code != serializer.validated_data['code']:
                return Response({
                    'success': False,
                    'message': 'کد صحیح نیست'
                }, status=status.HTTP_400_BAD_REQUEST)
                        
            user = UserModel.objects.get(phone_number=phone_number)
            otp.delete()
            del request.session['login_phone_number']
            refresh = RefreshToken.for_user(user)

            return Response({
                'success': True,
                'message': 'کد ورود کاربر ساخته شد',
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
    