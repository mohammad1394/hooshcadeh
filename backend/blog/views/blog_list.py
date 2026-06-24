from rest_framework.generics import ListAPIView
from blog.models import BlogModel
from blog.serializers import BlogSerializer


class BlogListView(ListAPIView):
    queryset = BlogModel.objects.filter(is_published=True)
    serializer_class = BlogSerializer
