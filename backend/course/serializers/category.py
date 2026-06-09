from rest_framework import serializers
from course.models import CategoryModel
from .course import CourseSerializer


class CategorySerializer(serializers.ModelSerializer):
    courses = serializers.SerializerMethodField()
    class Meta:
        model = CategoryModel
        fields = '__all__'

    def get_courses(self, obj):
        courses = []
        for course in obj.courses.published():
            course_serializer = CourseSerializer(course)
            courses.append({
                'title': course_serializer.data['title'],
                'slug': course_serializer.data['slug'],
                'image': course_serializer.data['image'],
                'description': course_serializer.data['description'],
                'discount': course_serializer.data['discount'],
                'orginal_price': course_serializer.data['orginal_price'],
                'final_price': course_serializer.data['final_price'],
                'time': course_serializer.data['time'],
            })
        return courses
