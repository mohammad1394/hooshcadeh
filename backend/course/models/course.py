from django.db import models
from user.models import TeacherModel
from django.utils.text import slugify
from jalali_date import datetime2jalali
from django.contrib import admin


class CourseManager(models.Manager):
    def published(self):
        return self.filter(is_published=True)

class CourseModel(models.Model):
    beginner = 'b'
    intermediate = 'i'
    advanced = 'a'
    LEVEL_CHOICES = [
        (beginner, 'مبتدی'),
        (intermediate, 'متوسط'),
        (advanced, 'پیشرفته')
    ]
    title = models.CharField(
        max_length=60,
        unique=True,
        verbose_name='عنوان دوره'
    )
    course_identity = models.CharField(
        max_length=40,
        unique=True,
        verbose_name='شناسه دوره'
    )
    slug = models.SlugField(
        max_length=70,
        unique=True,
        allow_unicode=True,
        blank=True,
        verbose_name='عنوان در url'
    )
    image = models.ImageField(
        upload_to='courses/',
        verbose_name='تصویر دوره'
    )
    description = models.TextField(
        verbose_name='توضیحات دوره'
    )
    prerequisite = models.TextField(
        verbose_name='پیش نیاز دوره',
        default='پیش نیاز ندارد'
    )
    teacher = models.ForeignKey(
        TeacherModel,
        on_delete=models.SET_NULL,
        null=True,
        related_name='courses',
        verbose_name='مدرس'
    )
    category = models.ForeignKey(
        'course.CategoryModel',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='courses',
        verbose_name='دسته بندی'
    )

    price = models.PositiveIntegerField(
        verbose_name='قیمت به تومان',
        default=0
    )
    discount = models.PositiveIntegerField(
        default=0,
        verbose_name='تخفیف ٪'
    )
    students = models.PositiveIntegerField(
        verbose_name='تعداد دانشجویان',
        default=0
    )
    time = models.PositiveIntegerField(
        verbose_name='مدت زمان دوره به دقیقه',
        default=0
    )
    level = models.CharField(
        max_length=1,
        choices=LEVEL_CHOICES,
        default='b'
    )
    course_target = models.TextField(
        null=True,
        blank=True,
        verbose_name='هدف دوره'
    )
    suitableـfor = models.CharField(
        max_length=100,
        null=True,
        blank=True,
        verbose_name='مناسب برای'
    )
    benefits_of_the_course = models.TextField(
        null=True,
        blank=True,
        verbose_name='مزایای دوره'
    )
    number_of_sessions = models.PositiveIntegerField(
        default=0,
        verbose_name='تعداد جلسات'
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
        verbose_name = 'دوره'
        verbose_name_plural = 'دوره ها'
        ordering = ['-created']

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title, allow_unicode=True)
            while CourseModel.objects.filter(slug=base_slug).exists():
                base_slug+="1"
            self.slug = base_slug

        return super().save(*args, **kwargs)
    
    @property
    def formatted_price(self):
        return f'{self.price:,}'
    
    @property
    def final_price(self):
        if self.discount > 0:
            return self.price - (self.price * self.discount // 100)
        return self.price
    
    @property
    @admin.display(description='قیمت نهایی')
    def final_formatted_price(self):
        return f'{self.final_price:,}'
    

    @property
    def formatted_time(self):
        if self.time < 60:
            return f"{self.time} دقیقه"
        minute = self.time % 60
        hour = int(self.time / 60)
        return f'{hour} ساعت و{minute} دقیقه'
    
    @property
    def level_persian(self):
        level_map = {
            self.beginner: 'مبتدی',
            self.intermediate: 'متوسط',
            self.advanced: 'پیشرفته'
        }
        return level_map.get(self.level, 'نامشخص')
    
    @property
    @admin.display(description='زمان ساخت')
    def created_jalali(self):
        return datetime2jalali(self.created).strftime('%Y/%m/%d - %H:%M')
    
    @property
    @admin.display(description='اخرین بروزرسانی')
    def updated_jalali(self):
        return datetime2jalali(self.updated).strftime('%Y/%m/%d - %H:%M')
    
    def increment_students(self):
        self.students += 1
        self.save(update_fields=['students'])

    objects = CourseManager()
