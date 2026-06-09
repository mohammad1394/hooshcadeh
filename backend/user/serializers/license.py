from rest_framework import serializers
from user.models import LicenseModel


class LicenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = LicenseModel
        exclude = [
            'license_id',
            'url',
        ]
