from django.contrib import admin

from MonPanier.api.dispensations.models import Dispensation

class DispensationAdmin(admin.ModelAdmin):
    list_display = ('code_barre_ean_gtin', 'categorie_du_produit_rayon', 'nature_du_decalage_entre_le_produit_et_son_etiquetage', 'datedepot')

admin.site.register(Dispensation, DispensationAdmin)