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

class SignUpVerifyCodeView(APIView):
    permission_classes = [~IsAuthenticated]

    def post(self, request):
        serializer = VerifyCodeSerializer(data=request.data)

        if serializer.is_valid():
            if 'sign_up' not in request.session:
                return Response({
                    'success': False,
                    'message': 'اطلاعات کاربر حذف شده دوباره ثبت نام کنید'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            user_data = request.session['sign_up']
            otp_qs = VerifyCodeModel.objects.filter(phone_number=user_data['phone_number'])
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
            
            new_user = UserModel.objects.create_user(**user_data)
            otp.delete()
            del request.session['sign_up']
            refresh = RefreshToken.for_user(new_user)

            return Response({
                'success': True,
                'message': 'کاربر ساخته شد',
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    