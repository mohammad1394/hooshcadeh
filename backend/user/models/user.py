from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
from django.db.models.functions import Concat
from django.core.validators import RegexValidator
from jalali_date import datetime2jalali


class UserManager(BaseUserManager):
    def create_user(self, phone_number, first_name='', last_name='', password=None, **extra_fields):
        if not phone_number:
            raise ValueError('شماره تلفن الزامی است')
        
        user = self.model(
            phone_number=phone_number,
            first_name=first_name,
            last_name=last_name,
            **extra_fields
        )
        user.set_password(password)  
        user.save()
        return user
    
    def create_superuser(self, phone_number, first_name='Admin', last_name='User', password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if not password:
            password = 'admin123456'
        
        return self.create_user(phone_number, first_name, last_name, password, **extra_fields)
    
    def get_by_natural_key(self, phone_number):
        return self.get(phone_number=phone_number)
    
class UserModel(AbstractBaseUser, PermissionsMixin):
    phone_number = models.CharField(
        max_length=11,
        unique=True,
        verbose_name="شماره تلفن",
        validators=[
            RegexValidator(
                regex=r'^09[0-9]{9}$',
                message='شماره تلفن معتبر نیست. شماره باید با 09 شروع و 11 رقم باشد.',
                code='invalide_phone_number'
            )
        ]
    )
    first_name = models.CharField(max_length=50, verbose_name="نام")
    last_name = models.CharField(max_length=50, verbose_name="نام خانوادگی")
    avatar = models.ImageField(
        upload_to="avatars/",
        null=True,
        blank=True,
        verbose_name="آواتار"
    )
    created = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    last_login = models.DateTimeField(null=True, blank=True)

    purchased = models.ManyToManyField(
        'course.CourseModel',
        related_name='user_purchased',
        blank=True,
        verbose_name='دوره های خزیداری شده',
    )
    full_name = models.GeneratedField(
        expression=Concat("first_name", models.Value(" "), "last_name"),
        output_field=models.CharField(max_length=102),
        db_persist=True
    )

    REQUIRED_FIELDS = ['first_name', 'last_name']
    USERNAME_FIELD = 'phone_number'
    class Meta:
        verbose_name = 'کاربر'
        verbose_name_plural = 'کاربران'
        ordering = ['-created']

    def __str__(self):
        return f"{self.full_name}:({self.phone_number})"
        
    @property
    def created_jalali(self):
        return datetime2jalali(self.created).strftime('%Y/%m/%d')

    def update_last_login(self):
        self.last_login = timezone.now()
        self.save(update_fields=['last_login'])

    objects = UserManager()

