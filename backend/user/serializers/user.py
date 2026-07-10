from rest_framework import serializers
from user.models import UserModel


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserModel
        exclude = [
            "created",
            "is_active",
            "is_superuser",
            "is_staff",
            "last_login",
            "password",
            "user_permissions",
            "groups",
        ]


class UpdateUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserModel
        fields = [
            "id",
            "first_name",
            "last_name",
            "phone_number",
            "avatar",
        ]