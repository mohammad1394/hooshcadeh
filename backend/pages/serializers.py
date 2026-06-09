from rest_framework import serializers
from pages.models import SiteSettingsModel


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettingsModel
        exclude = ['id', 'spotplayer_api']
