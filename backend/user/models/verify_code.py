from django.db import models
import random


class VerifyCodeManager(models.Manager):
    def create_code(self, phone_number):
        verify_code = self.model(
            phone_number=phone_number,
            code = random.randint(100000,999999)
        )
        verify_code.save()
        return verify_code

class VerifyCodeModel(models.Model):
    phone_number = models.CharField(max_length=11, verbose_name='شماره تلفن')
    code = models.PositiveIntegerField(
        blank=True,
        verbose_name='کد'
    )
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'کد تایید'
        verbose_name_plural = 'کد های تایید'
        ordering = ['-created']

    def __str__(self):
        return f'{self.phone_number}:{self.code}'
    
    objects = VerifyCodeManager()