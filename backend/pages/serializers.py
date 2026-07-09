from rest_framework import serializers
from pages.models import SiteSettingsModel, ContactFormModel


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettingsModel
        exclude = ['id', 'spotplayer_api']


class ContactFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactFormModel
        fields = '__all__'
