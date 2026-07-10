from django.contrib import admin
from .models import UserModel, VerifyCodeModel, TeacherModel, LicenseModel, TransactionModel

admin.site.register(UserModel)
admin.site.register(VerifyCodeModel)
admin.site.register(TeacherModel)
admin.site.register(LicenseModel)
admin.site.register(TransactionModel)

