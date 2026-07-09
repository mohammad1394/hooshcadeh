from rest_framework.generics import CreateAPIView
from pages.serializers import ContactFormSerializer


class ContactFormCreateView(CreateAPIView):
    serializer_class = ContactFormSerializer

