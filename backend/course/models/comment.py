from django.db import models
from jalali_date import datetime2jalali
from django.core.exceptions import ValidationError
from django.contrib import admin


class CommentManager(models.Manager):

    def approved(self):
        return self.filter(status=CommentModel.STATUS_APPROVED)
    
    def rejected(self):
        return self.filter(status=CommentModel.STATUS_REJECTED)
    
    def pending(self):
        return self.filter(status=CommentModel.STATUS_PENDING)


class CommentModel(models.Model):
    STATUS_PENDING = 'p'
    STATUS_APPROVED = 'a'
    STATUS_REJECTED = 'r'

    STATUS_CHOICES = [
        (STATUS_PENDING, 'در انتظار'),
        (STATUS_APPROVED, 'تایید شده'),
        (STATUS_REJECTED, 'رد شده'),
    ]
    user = models.ForeignKey(
        'user.UserModel',
        on_delete=models.CASCADE,
        related_name='user_comments',
        verbose_name='کاربر'
    )
    course = models.ForeignKey(
        'CourseModel',
        on_delete=models.CASCADE,
        related_name='course_comments',
        verbose_name='دوره'
    )
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        related_name='replies',
        null=True,
        blank=True,
        verbose_name='پاسخ به'
    )
    body = models.TextField(verbose_name='متن')
    status = models.CharField(
        max_length=1,
        choices=STATUS_CHOICES,
        default=STATUS_PENDING,
        verbose_name='وضعیت'
    )
    created = models.DateTimeField(
        auto_now_add=True,
        verbose_name='تاریخ ایجاد'
    )

    class Meta:
        verbose_name = 'نظر'
        verbose_name_plural = 'نظرات'
        ordering = ['-created']

    def __str__(self):
        return f'{self.user.full_name}:{self.body[:20]}'
    
    @property
    @admin.display(description='زمان ساخت')
    def created_jalali(self):
        return datetime2jalali(self.created).strftime('%Y/%m/%d - %H/%M')
    
    def clean(self):
        if len(self.body) <= 5:
            raise ValidationError({'body':'متن نظر باید بیشتر از ۵ کاراکتر باشد'})
    
    objects = CommentManager()
