from django.urls import path, re_path
from .views import (
    CourseListView, 
    CourseDetailView,
    CategoryListView,
    CategoryDetailView,
    CommentCreateView
)


app_name = 'course'

urlpatterns = [
    re_path(r'^category/(?P<slug>[\w\u0600-\u06FF-]+)/$', CategoryDetailView.as_view(), name='category-detail'),
    path('category/', CategoryListView.as_view(), name='category-list'),
    path('comment/', CommentCreateView.as_view(), name='comment-create'),
    path('', CourseListView.as_view(), name='course-list'),
    re_path(r'^(?P<slug>[\w\u0600-\u06FF-]+)/$', CourseDetailView.as_view(), name='course-detail'),
]
