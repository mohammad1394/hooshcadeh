from django.urls import path
from blog.views import BlogListView, BlogDetailView, CommentBlogCreateView

urlpatterns = [
    path('', BlogListView.as_view(), name='blog-list'),
    path('<slug:slug>/', BlogDetailView.as_view(), name='blog-detail'),
    path('comment/create/', CommentBlogCreateView.as_view(), name='comment-blog-create'),
]
