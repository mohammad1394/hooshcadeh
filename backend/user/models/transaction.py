from django.db import models
from jalali_date import datetime2jalali
from django.contrib import admin


class TransactionModel(models.Model):
    concept = models.CharField(max_length=80, verbose_name="موضوع تراکنش")

    user = models.ForeignKey(
        "user.UserModel",
        on_delete=models.CASCADE,
        related_name="transaction",
        verbose_name="کاربر",
    )

    amount = models.PositiveIntegerField(verbose_name="مبلغ")

    text = models.TextField(
        null=True,
        blank=True,
        verbose_name="توضیحات تراکنش",
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.full_name}: {self.concept} : {self.amount}"

    @property
    def formatted_amount(self):
        return f"{self.amount:,}"

    @property
    @admin.display(description="زمان ساخت")
    def created_at_jalali(self):
        return datetime2jalali(self.created_at).strftime("%Y/%m/%d - %H:%M")

    class Meta:
        verbose_name = "تراکنش"
        verbose_name_plural = "تراکنش ها"