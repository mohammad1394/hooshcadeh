from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.core.exceptions import ValidationError
from user.serializers import SignUpSerializer
from user.models import VerifyCodeModel
from utils.otp_code import send_otp_code



class SignUpView(APIView):
    permission_classes = [~IsAuthenticated]

    def post(self, request):
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            request.session['sign_up'] = serializer.validated_data
            request.session.set_expiry(1800)
            try:
                otp = VerifyCodeModel.objects.create_code(
                    phone_number=serializer.validated_data['phone_number']
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
    