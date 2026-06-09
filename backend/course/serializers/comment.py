from rest_framework import serializers
from course.models import CommentModel

class CommentReadSerializer(serializers.ModelSerializer):
    user_full_name = serializers.CharField(source='user.full_name', read_only=True)

    class Meta:
        model = CommentModel
        fields = [
            'id',
            'course',
            'parent',
            'body',
            'created',
            'user_full_name',
        ]


class CommentWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentModel
        fields = '__all__'
