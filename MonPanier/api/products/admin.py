from django.contrib import admin

from MonPanier.api.carts.models import ProductInCart
from MonPanier.api.products.models import Product

# Register your models here.

admin.site.register(Product)
admin.site.register(ProductInCart)