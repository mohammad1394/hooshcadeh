from rest_framework.generics import RetrieveAPIView
from user.serializers import TeacherSerializer
from user.models import TeacherModel


class TeacherDetailView(RetrieveAPIView):
    serializer_class = TeacherSerializer
    queryset = TeacherModel.objects.filter(is_teacher=True)
