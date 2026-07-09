from django.db import models
from django.core.validators import RegexValidator


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
    

class ContactFormModel(models.Model):
    concept = models.CharField(max_length=80, verbose_name='موضوع')
    name_and_family = models.CharField(max_length=80, verbose_name='نام و نام خوانوادگی')
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
    text = models.TextField(verbose_name='متن')
    is_read = models.BooleanField(default=False, verbose_name='خوانده شده؟')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.concept
    
    class Meta:
        verbose_name = 'فرم تماس با ما'
        verbose_name_plural = 'فرم های تماس با ما'
