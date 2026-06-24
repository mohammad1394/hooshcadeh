from rest_framework import serializers
from blog.models import BlogModel
from .comment import CommentBlogReadSerializer


class BlogSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField()
    teacher_full_name = serializers.CharField(source='teacher.user.full_name')

    class Meta:
        model = BlogModel
        fields = [
            'id',
            'title',
            'slug',
            'image',
            'teacher_full_name',
            'description',
            'category',
            'created',
            'updated',
            'comments',
            'created_jalali',
            'updated_jalali',
        ]
    
    def get_comments(self, obj):
        approved_comments = obj.blog_comments.approved()
        comments_serializer = CommentBlogReadSerializer(approved_comments, many=True)
        return comments_serializer.data
