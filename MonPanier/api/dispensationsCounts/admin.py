from django.contrib import admin

from MonPanier.api.dispensationsCounts.models import DispensationsCount

class DispensationsCountAdmin(admin.ModelAdmin):
    list_display = ('category', 'dispensation_category', 'dispensation_count', 'dispensation_rate')

admin.site.register(DispensationsCount, DispensationsCountAdmin)