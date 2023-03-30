from django.contrib import admin

from MonPanier.api.dispensationsCounts.models import DispensationsCount

class DispensationsCountAdmin(admin.ModelAdmin):
    list_display = ('category', 'dispensation_category', 'dispensation_count', 'dispensation_rate', 'dispensation_allergens_count', 'dispensation_allergens_rate', 'created_at')
    list_filter = ('created_at',)

admin.site.register(DispensationsCount, DispensationsCountAdmin)