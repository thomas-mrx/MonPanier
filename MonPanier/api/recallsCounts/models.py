from django.db import models


class RecallsCount(models.Model):
    """Model representing the recall analysis"""
    hash = models.CharField(max_length=128, unique=True, primary_key=True)
    category = models.TextField()
    recall_category = models.JSONField(default=list)
    recall_count = models.IntegerField()
    recall_rate = models.FloatField(null=True)

    created_at = models.DateField(auto_now_add=True, blank=True, null=True)

    # Metadata
    class Meta:
        ordering = ['-recall_count']

    def __str__(self):
        """String for representing the MyModelName object (in Admin site etc.)."""
        return self.category