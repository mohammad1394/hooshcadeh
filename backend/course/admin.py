from django.contrib import admin
from . import models


@admin.action(description='فعال کردن منتشر شد')
def active_is_published(modeladmin, request, queryset):
    queryset.update(is_published=True)
    modeladmin.message_user(request, f'{queryset.count()} محصولات منتشر شدند')


@admin.action(description='غیرفعال کردن منتشر شد')
def deactive_is_published(modeladmin, request, queryset):
    queryset.update(is_published=False)
    modeladmin.message_user(request, f'{queryset.count()} محصولات منتشر نشدند')


class CourseAdminModel(admin.ModelAdmin):
    list_display = ['title', 'teacher', 'final_formatted_price', 'is_published', 'created_jalali', 'updated_jalali']
    search_fields = ['title', 'description']
    list_filter = ['created', 'is_published', 'title']
    list_editable = ['is_published']
    ordering = ['-updated']
    actions = [active_is_published, deactive_is_published]


class CommentAdminModel(admin.ModelAdmin):
    list_display = ['user', 'course', 'body', 'status', 'created_jalali']
    search_fields = ['body', 'course']
    list_filter = ['created', 'status']
    list_editable = ['status']
    ordering = ['status','-created']
    actions = [active_is_published, deactive_is_published]


admin.site.register(models.CourseModel, CourseAdminModel)
admin.site.register(models.CommentModel, CommentAdminModel)
admin.site.register(models.CategoryModel)
