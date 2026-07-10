from django.contrib import admin
from .models import SiteSettingsModel, ContactFormModel


class ContactFormAdminModel(admin.ModelAdmin):
    list_display = ['concept', 'name_and_family', 'phone_number', 'is_read', 'created_at']
    search_fields = ['concept', 'name_and_family', 'phone_number']
    list_filter = ['created_at', 'is_read']
    list_editable = ['is_read']
    ordering = ['-created_at']


admin.site.register(SiteSettingsModel)
admin.site.register(ContactFormModel, ContactFormAdminModel)
