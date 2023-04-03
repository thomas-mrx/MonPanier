from django.db import models

# Create your models here.
from django.db import models


class Product(models.Model):
    """Model representing a product """
    # General
    title = models.CharField(max_length=200)
    brands = models.CharField(max_length=200, null=True)
    categories = models.JSONField(null=True)
    image = models.TextField(null=True)
    ean = models.CharField('EAN', max_length=13, help_text='13 Character <a href="https://www.ean-search.org/">EAN</a>')

    # Sanitaire
    allergens = models.JSONField(null=True)
    vitamins = models.JSONField(null=True)

    # Provenance/Eco.
    manufacturing_places = models.JSONField(null=True)
    factories = models.JSONField(null=True)
    packaging = models.JSONField(null=True)

    # Composition
    ingredients = models.JSONField(null=True)
    vegan = models.BooleanField(null=True)
    vegetarian = models.BooleanField(null=True)
    additives = models.JSONField(null=True)
    nutriments = models.JSONField(null=True)
    traces = models.JSONField(null=True)
    labels = models.JSONField(null=True)

    # Indicateurs MonPanier
    mp_nutrim_score = models.JSONField(null=True) # Composition
    mp_sanit_score = models.JSONField(null=True) # Sanitaire
    mp_eco_score = models.JSONField(null=True) # Provenance/Eco.

    created_at = models.DateTimeField(auto_now_add=True)

    # Metadata
    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        """String for representing the MyModelName object (in Admin site etc.)."""
        return self.title