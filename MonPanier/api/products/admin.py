from django.contrib import admin

from MonPanier.api.carts.models import ProductInCart
from MonPanier.api.products.models import Product

# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    list_display = ('ean', 'created_at', 'title', 'brands')

admin.site.register(Product, ProductAdmin)
admin.site.register(ProductInCart)