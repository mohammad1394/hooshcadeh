from django.core.validators import RegexValidator
from rest_framework import serializers
from user.models import UserModel


class LoginSerilizer(serializers.Serializer):
    phone_number = serializers.CharField(
        max_length=11,
        validators=[
            RegexValidator(
                regex=r'^09[0-9]{9}$',
                message='شماره تلفن معتبر نیست. شماره باید با 09 شروع و 11 رقم باشد.',
                code='invalide_phone_number'
            )
        ],
        label='شماره تلفن'
    )
    