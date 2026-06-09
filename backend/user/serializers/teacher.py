from rest_framework import serializers
from user.models import TeacherModel
from .user import UserSerializer


class TeacherSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = TeacherModel
        exclude = [
            'is_teacher',
        ]
