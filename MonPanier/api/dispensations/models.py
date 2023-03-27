from django.db import models


class Dispensation(models.Model):
    """Model representing a recall"""
    categorie_du_produit_rayon = models.CharField(max_length=64)
    cause_de_la_demande_de_derogation = models.CharField(max_length=32)
    code_barre_ean_gtin = models.CharField(max_length=32)
    conditionnement = models.TextField()
    denomination_du_produit = models.TextField()
    impact_allergenes = models.CharField(max_length=1, blank=True, null=True)
    marque = models.TextField()
    modalites_d_information_des_consommateurs = models.TextField()
    nature_du_decalage_entre_le_produit_et_son_etiquetage = models.TextField()
    datedepot = models.CharField(max_length=16)

    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    # Metadata
    class Meta:
        ordering = ['-datedepot']

    def __str__(self):
        """String for representing the MyModelName object (in Admin site etc.)."""
        return self.code_barre_ean_gtin