from rest_framework.generics import RetrieveAPIView
from blog.models import BlogModel
from blog.serializers import BlogSerializer


class BlogDetailView(RetrieveAPIView):
    queryset = BlogModel.objects.filter(is_published=True)
    serializer_class = BlogSerializer
    lookup_field = 'slug'
    lookup_url_kwarg = 'slug'

