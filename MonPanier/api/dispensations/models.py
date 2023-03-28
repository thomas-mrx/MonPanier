from django.db import models


class Dispensation(models.Model):
    """Model representing a recall"""
    hash = models.CharField(max_length=128, unique=True, primary_key=True)
    categorie_du_produit_rayon = models.TextField()
    cause_de_la_demande_de_derogation = models.TextField()
    code_barre_ean_gtin = models.TextField()
    conditionnement = models.TextField()
    denomination_du_produit = models.TextField()
    impact_allergenes = models.TextField(blank=True, null=True)
    marque = models.TextField()
    modalites_d_information_des_consommateurs = models.TextField()
    nature_du_decalage_entre_le_produit_et_son_etiquetage = models.TextField()
    datedepot = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    # Metadata
    class Meta:
        ordering = ['-datedepot']

    def __str__(self):
        """String for representing the MyModelName object (in Admin site etc.)."""
        return self.code_barre_ean_gtin