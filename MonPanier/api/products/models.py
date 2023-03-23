from django.db import models

# Create your models here.
from django.db import models


class Product(models.Model):
    """Model representing a product """
    title = models.CharField(max_length=200)

    summary = models.TextField(max_length=1000, help_text='Enter a brief description of the product')

    ean = models.CharField('EAN', max_length=13, unique=True,
                           help_text='13 Character <a href="https://www.ean-search.org/">EAN</a>')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Metadata
    class Meta:
        ordering = ['title', '-created_at']

    def __str__(self):
        """String for representing the MyModelName object (in Admin site etc.)."""
        return self.title