from rest_framework.generics import UpdateAPIView
from user.serializers import UpdateUserSerializer
from user.models import UserModel
from user.permissions import OwnedOrSuperuser


class ProfileUpdateView(UpdateAPIView):
    serializer_class = UpdateUserSerializer
    queryset = UserModel.objects.all()
    permission_classes = [OwnedOrSuperuser]
