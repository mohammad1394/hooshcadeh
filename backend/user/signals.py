import datetime
from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import VerifyCodeModel
from django.utils import timezone
from django.core.exceptions import ValidationError

@receiver(pre_save, sender=VerifyCodeModel)
def delete_older_verify_code(sender,instance, **kwargs):
    verify_code_qs = VerifyCodeModel.objects.filter(phone_number=instance.phone_number)
    if verify_code_qs:
        for verify_code in verify_code_qs:
            if verify_code.created + datetime.timedelta(minutes=3) > timezone.now():
                raise ValidationError('هنوز ۳ دقیقه از کد قبلی نگذشته')
            verify_code.delete()
