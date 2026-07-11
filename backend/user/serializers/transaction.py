from rest_framework import serializers
from user.models import TransactionModel


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionModel
        fields = '__all__'
