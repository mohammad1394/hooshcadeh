from django.db import models
from django.contrib import admin
from django.utils.text import slugify
from jalali_date import datetime2jalali


class BlogModel(models.Model):
    title = models.CharField(
        max_length=80,
        unique=True,
        verbose_name='عنوان مقاله'
    )
    slug = models.SlugField(
        max_length=70,
        unique=True,
        allow_unicode=True,
        blank=True,
        verbose_name='عنوان در url'
    )
    teacher = models.ForeignKey(
        'user.TeacherModel',
        on_delete=models.SET_NULL,
        null=True,
        related_name='blogs',
        verbose_name='مدرس'
    )
    image = models.ImageField(
        upload_to='blogs/',
        verbose_name='تصویر  مقاله'
    )
    description = models.TextField(
        verbose_name='توضیحات  مقاله'
    )
    category = models.ForeignKey(
        'course.CategoryModel',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='blogs',
        verbose_name='دسته بندی'
    )
    is_published = models.BooleanField(
        default=False,
        verbose_name='منتشر شده'
    )
    created = models.DateTimeField(
        auto_now_add=True,
        verbose_name='تاریخ ایجاد'
    )
    updated = models.DateTimeField(
        auto_now=True,
        verbose_name='اخرین بروزرسانی'
    )

    class Meta:
        verbose_name = 'مقاله'
        verbose_name_plural = 'مقالات'
        ordering = ['-created']

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title, allow_unicode=True)
            while BlogModel.objects.filter(slug=base_slug).exists():
                base_slug+="1"
            self.slug = base_slug

        return super().save(*args, **kwargs)
    
    @property
    @admin.display(description='زمان ساخت')
    def created_jalali(self):
        return datetime2jalali(self.created).strftime('%Y/%m/%d - %H:%M')
    
    @property
    @admin.display(description='اخرین بروزرسانی')
    def updated_jalali(self):
        return datetime2jalali(self.updated).strftime('%Y/%m/%d - %H:%M')

