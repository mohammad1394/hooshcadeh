from rest_framework import serializers
from user.models import UserModel


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = [
            'phone_number',
            'first_name',
            'last_name',
        ]
