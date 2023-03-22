from django.conf import settings
from django.db import models


# Create your models here.

class Cart(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class ProductInCart(models.Model):
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)