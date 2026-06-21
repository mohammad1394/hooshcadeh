from rest_framework import serializers
from django.conf import settings
from course.models import CourseModel
from .comment import CommentReadSerializer


class CourseSerializer(serializers.ModelSerializer):
    orginal_price = serializers.CharField(source='formatted_price', read_only=True)
    final_price = serializers.CharField(source='final_formatted_price', read_only=True)
    comments = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

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

    def get_image(self, obj):
        if not obj.image:
            return None
        # همیشه از آدرس عمومی استفاده کن، نه از هاست داخلی Docker
        public_base_url = getattr(settings, 'PUBLIC_MEDIA_BASE_URL', None)
        if public_base_url:
            return f"{public_base_url}{obj.image.url}"
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url

    def get_comments(self, obj):
        approved_comments = obj.course_comments.approved()
        comments_serializer = CommentReadSerializer(approved_comments, many=True)
        return comments_serializer.data