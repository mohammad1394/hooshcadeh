from rest_framework.generics import ListAPIView
from course.models import CategoryModel
from course.serializers import CategorySerializer


class CategoryListView(ListAPIView):
    queryset = CategoryModel.objects.all()
    serializer_class = CategorySerializer
