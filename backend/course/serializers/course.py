from rest_framework import serializers
from django.conf import settings
from course.models import CourseModel
from .comment import CommentReadSerializer


class CourseSerializer(serializers.ModelSerializer):
    orginal_price = serializers.CharField(source='formatted_price', read_only=True)
    final_price = serializers.CharField(source='final_formatted_price', read_only=True)
    comments = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    teacher_full_name = serializers.CharField(source='teacher.user.full_name')

    class Meta:
        model = CourseModel
        fields = [
            'id',
            'title',
            'slug',
            'image',
            'description',
            'prerequisite',
            'teacher_full_name',
            'teacher',
            'category',
            'discount',
            'students',
            'orginal_price',
            'final_price',
            'comments',
            'time',
            'level',
            'course_target',
            'suitableـfor',
            'benefits_of_the_course',
            'headline',
            'number_of_sessions',
            'created_jalali',
            'updated_jalali',
            'created',
            'updated',
        ]


def get_image(self, obj):
    if not obj.image:
        return None

    public_base_url = getattr(
        settings,
        "PUBLIC_MEDIA_BASE_URL",
        ""
    ).rstrip("/")

    image_path = obj.image.url

    if public_base_url:
        return f"{public_base_url}{image_path}"

    request = self.context.get("request")
    if request:
        return request.build_absolute_uri(image_path)

    return image_path


    def get_comments(self, obj):
        approved_comments = obj.course_comments.approved()
        comments_serializer = CommentReadSerializer(approved_comments, many=True)
        return comments_serializer.data