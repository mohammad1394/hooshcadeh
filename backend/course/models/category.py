from django.db import models
from django.utils.text import slugify


class CategoryModel(models.Model):
    name = models.CharField(
        max_length=50,
        verbose_name='نام'
    )
    slug = models.SlugField(
        max_length=70,
        unique=True,
        allow_unicode=True,
        blank=True,
        verbose_name='عنوان در url'
    )

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name, allow_unicode=True)
            while CategoryModel.objects.filter(slug=base_slug).exists():
                base_slug+="1"
            self.slug = base_slug
        return super().save(*args, **kwargs)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'دسته بندی'
        verbose_name_plural = 'دسته بندی ها'
    