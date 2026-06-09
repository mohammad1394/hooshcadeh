from rest_framework import serializers
from course.models import CourseModel
from .comment import CommentReadSerializer


class CourseSerializer(serializers.ModelSerializer):
    orginal_price = serializers.CharField(source='formatted_price', read_only=True)
    final_price = serializers.CharField(source='final_formatted_price', read_only=True)
    comments = serializers.SerializerMethodField()

    class Meta:
        model = CourseModel
        fields = [
            'id',
            'title',
            'slug',
            'image',
            'description',
            'prerequisite',
            'teacher',
            'category',
            'discount',
            'students',
            'orginal_price',
            'final_price',
            'comments',
            'time',
            'level',
            'created_jalali',
            'updated_jalali',
        ]
    
    def get_comments(self, obj):
        approved_comments = obj.course_comments.approved()
        comments_serializer = CommentReadSerializer(approved_comments, many=True)
        return comments_serializer.data
