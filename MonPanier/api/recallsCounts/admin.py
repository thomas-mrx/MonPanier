from django.contrib import admin

from MonPanier.api.recallsCounts.models import RecallsCount

class RecallsCountAdmin(admin.ModelAdmin):
    list_display = ('category', 'recall_category', 'recall_count', 'recall_rate', 'created_at')
    list_filter = ('created_at',)

admin.site.register(RecallsCount, RecallsCountAdmin)