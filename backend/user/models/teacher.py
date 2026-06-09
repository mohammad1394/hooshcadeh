from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db.models.functions import Concat


class TeacherModel(models.Model):
    user = models.OneToOneField(
        'user.UserModel',
        on_delete=models.CASCADE,
        related_name='teacher_profile',
        primary_key=True,
        verbose_name='کاربر'
    )
    description = models.TextField(
        null=True,
        blank=True,
        verbose_name='بیوگرافی'
    )
    expertise = models.CharField(
        max_length=200,
        null=True,
        blank=True,
        verbose_name='تخصص'
    )
    resume = models.FileField(
        upload_to='teachers/resumes/',
        null=True,
        blank=True,
        verbose_name='رزومه'
    )
    website = models.URLField(
        null=True,
        blank=True,
        verbose_name='وبسایت شخصی'
    )
    github = models.URLField(
        null=True,
        blank=True,
        verbose_name='گیت هاب'
    )
    instagram = models.URLField(
        null=True,
        blank=True,
        verbose_name='اینستاگرام'
    )
    linkedin = models.URLField(
        null=True,
        blank=True,
        verbose_name='لینکدین'
    )
    is_teacher = models.BooleanField(
        default=False,
        verbose_name= 'ایا اجازه تدریس دارد؟'
    )
    class Meta:
        verbose_name = 'مدرس'
        verbose_name_plural = 'مدرسان'
    
    def __str__(self):
        return self.user.full_name
