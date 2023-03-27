from django.contrib import admin

from MonPanier.api.recalls.models import Recall

# Register your models here.

class RecallAdmin(admin.ModelAdmin):
    list_display = ('reference_fiche', 'ean', 'identification_des_produits', 'motif_du_rappel', 'date_de_publication', 'lien_vers_la_fiche_rappel')

admin.site.register(Recall, RecallAdmin)