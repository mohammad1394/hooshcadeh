from rest_framework.generics import RetrieveAPIView
from course.serializers import CourseSerializer
from course.models import CourseModel


class CourseDetailView(RetrieveAPIView):
    queryset = CourseModel.objects.published()
    serializer_class = CourseSerializer
    lookup_field = 'slug'
    