from django.db import models


class LicenseModel(models.Model):
    license_id = models.CharField(
        max_length=60,
        verbose_name='شناسه لایسنس'
    )
    key = models.CharField(
        max_length=200,
        unique=True,
        verbose_name='کلید'
    )
    url = models.URLField(null=True, blank=True)
    user = models.OneToOneField(
        'user.UserModel',
        on_delete=models.CASCADE,
        related_name='license',
        verbose_name='کاربر'
    )

    class Meta:
        verbose_name = 'لایسنس'
        verbose_name_plural = 'لایسنس ها'

    def __str__(self):
        return self.user.full_name
