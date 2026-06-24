from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from blog.serializers import CommentBlogWriteSerializer


class CommentBlogCreateView(CreateAPIView):
    serializer_class = CommentBlogWriteSerializer
    permission_classes = [IsAuthenticated]
