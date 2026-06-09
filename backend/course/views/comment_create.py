from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from course.serializers import CommentWriteSerializer


class CommentCreateView(CreateAPIView):
    serializer_class = CommentWriteSerializer
    permission_classes = [IsAuthenticated]
