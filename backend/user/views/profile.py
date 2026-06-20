from rest_framework.generics import RetrieveAPIView
from user.serializers import UserSerializer
from user.models import UserModel


class ProfileDetailView(RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()
