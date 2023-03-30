from django.db import models


class DispensationsCount(models.Model):
    """Model representing the dispensation analysis"""
    hash = models.CharField(max_length=128, unique=True, primary_key=True)
    category = models.TextField()
    dispensation_category = models.JSONField(default=list)
    dispensation_count = models.IntegerField()
    dispensation_rate = models.FloatField(null=True)

    created_at = models.DateField(auto_now_add=True, blank=True, null=True)

    # Metadata
    class Meta:
        ordering = ['-dispensation_count']

    def __str__(self):
        """String for representing the MyModelName object (in Admin site etc.)."""
        return self.category