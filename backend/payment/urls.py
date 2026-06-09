from django.urls import path
from .views import CartView, add_item_to_cart, delete_item_from_cart

app_name = 'payment'

urlpatterns = [
    path('cart/', CartView.as_view(), name='cart'),
    path('add-cart/', add_item_to_cart, name='add-cart'),
    path('delete-cart/', delete_item_from_cart, name='delete-cart'),
]
