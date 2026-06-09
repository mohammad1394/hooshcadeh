from pages.serializers import SiteSettingsSerializer
from pages.models import SiteSettingsModel
from rest_framework.views import APIView
from rest_framework.response import Response


class SiteSettingDetailView(APIView):
    def get(self, request):
        sitesettings_first = SiteSettingsModel.objects.first()
        sitesettings_serializer = SiteSettingsSerializer(sitesettings_first)
        return Response(sitesettings_serializer.data)
