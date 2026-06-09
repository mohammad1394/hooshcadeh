from rest_framework import serializers
from user.models import VerifyCodeModel


class VerifyCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VerifyCodeModel
        fields = ['code']
