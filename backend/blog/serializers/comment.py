from rest_framework import serializers
from blog.models import CommentBlogModel

class CommentBlogReadSerializer(serializers.ModelSerializer):
    user_full_name = serializers.CharField(source='user.full_name', read_only=True)

    class Meta:
        model = CommentBlogModel
        fields = [
            'id',
            'blog',
            'parent',
            'body',
            'created',
            'user_full_name',
        ]


class CommentBlogWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentBlogModel
        fields = '__all__'
        read_only_fields = ['user', 'status']

