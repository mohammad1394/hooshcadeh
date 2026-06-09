from rest_framework.generics import ListAPIView
from course.models import CourseModel
from course.serializers import CourseSerializer


class CourseListView(ListAPIView):
    queryset = CourseModel.objects.published()
    serializer_class = CourseSerializer
