from rest_framework.generics import RetrieveAPIView
from course.models import CategoryModel
from course.serializers import CategorySerializer


class CategoryDetailView(RetrieveAPIView):
    queryset = CategoryModel.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'
    lookup_url_kwarg = 'slug'
