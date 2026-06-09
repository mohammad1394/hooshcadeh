from django.db import models


class SiteSettingsModel(models.Model):
    site_name = models.CharField(max_length=60, verbose_name='نام سایت')
    about_site = models.TextField(verbose_name='درباره سایت')
    email_site = models.EmailField(verbose_name='ایمیل سایت')
    spotplayer_api = models.CharField(max_length=60, verbose_name='کلید API spotplayer')
    phone_number_site = models.CharField(null=True, blank=True, max_length=15)
    instagram = models.URLField(null=True, blank=True, verbose_name='ادرس اینستاگرام')
    telegram = models.URLField(null=True, blank=True, verbose_name='ادرس تلگرام')
    whatsapp = models.URLField(null=True, blank=True, verbose_name='ادرس واتساپ')
    rubika = models.URLField(null=True, blank=True, verbose_name='ادرس روبیکا')
    bale = models.URLField(null=True, blank=True, verbose_name='ادرس بله')
    eitaa = models.URLField(null=True, blank=True, verbose_name='ادرس ایتا')
    class Meta:
        verbose_name = 'تنظیمات سایت'
        verbose_name_plural = 'تنظیمات سایت'

    def __str__(self):
        return self.site_name
    