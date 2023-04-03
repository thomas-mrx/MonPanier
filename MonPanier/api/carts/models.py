from django.conf import settings
from django.db import models

from MonPanier.api.products.models import Product


# Create your models here.

class Cart(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product)
    # Indicateurs MonPanier
    mp_nutrim_score = models.FloatField(null=True) # Composition
    mp_sanit_score = models.FloatField(null=True) # Sanitaire
    mp_eco_score = models.FloatField(null=True) # Provenance/Eco.
    mp_global_score = models.FloatField(null=True) # Global

    def __str__(self):
        return self.name
