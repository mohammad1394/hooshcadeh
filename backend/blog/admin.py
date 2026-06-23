from django.contrib import admin
from django import forms
from django_ckeditor_5.widgets import CKEditor5Widget
from . import models


class CourseAdminForm(forms.ModelForm):
    class Meta:
        model = models.BlogModel
        fields = '__all__'
        widgets = {
            'description': CKEditor5Widget(config_name='default')
        }

class BlogAdminModel(admin.ModelAdmin):
    form = CourseAdminForm
    list_display = ['title', 'teacher', 'created_jalali','is_published','updated_jalali']
    search_fields = ['title', 'description']
    list_filter = ['created', 'is_published', 'title']
    list_editable = ['is_published']
    ordering = ['-updated']


class CommentBlogAdminModel(admin.ModelAdmin):
    list_display = ['user', 'blog', 'body', 'status', 'created_jalali']
    search_fields = ['body', 'blog']
    list_filter = ['created', 'status']
    list_editable = ['status']
    ordering = ['status','-created']


admin.site.register(models.BlogModel, BlogAdminModel)
admin.site.register(models.CommentBlogModel, CommentBlogAdminModel)
