from rest_framework import serializers
from user.models import UserModel
from .transaction import TransactionSerializer

class UserSerializer(serializers.ModelSerializer):
    transaction = serializers.SerializerMethodField()
    class Meta:
        model = UserModel
        exclude = [
            'created',
            'is_active',
            'is_superuser',
            'is_staff',
            'last_login',
            'password',
            'user_permissions',
            'groups',
        ]
    def get_transaction(self, obj):
        user_transactions = obj.transaction.all()
        serializer = TransactionSerializer(user_transactions, many=True)
        return serializer.data

class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = [
            'id',
            'first_name',
            'last_name',
            'phone_number',
            'avatar'
        ]
        