from django.db import models


class Recall(models.Model):
    """Model representing a recall"""
    reference_fiche = models.CharField(max_length=16, unique=True, primary_key=True)
    ndeg_de_version = models.CharField(max_length=1, blank=True, null=True)
    nature_juridique_du_rappel = models.CharField(max_length=64, blank=True, null=True)
    categorie_de_produit = models.CharField(max_length=64, blank=True, null=True)
    sous_categorie_de_produit = models.CharField(max_length=64, blank=True, null=True)
    nom_de_la_marque_du_produit = models.TextField(blank=True, null=True)
    noms_des_modeles_ou_references = models.TextField(blank=True, null=True)
    identification_des_produits = models.TextField(blank=True, null=True)
    ean = models.CharField(max_length=16, blank=True, null=True)
    conditionnements = models.TextField(blank=True, null=True)
    date_debut_fin_de_commercialisation = models.CharField(max_length=32, blank=True, null=True)
    temperature_de_conservation = models.CharField(max_length=64, blank=True, null=True)
    marque_de_salubrite = models.TextField(blank=True, null=True)
    informations_complementaires = models.TextField(blank=True, null=True)
    zone_geographique_de_vente = models.TextField(blank=True, null=True)
    distributeurs = models.TextField(blank=True, null=True)
    motif_du_rappel = models.TextField(blank=True, null=True)
    risques_encourus_par_le_consommateur = models.TextField(blank=True, null=True)
    preconisations_sanitaires = models.TextField(blank=True, null=True)
    description_complementaire_du_risque = models.TextField(blank=True, null=True)
    conduites_a_tenir_par_le_consommateur = models.TextField(blank=True, null=True)
    numero_de_contact = models.CharField(max_length=16, blank=True, null=True)
    modalites_de_compensation = models.CharField(max_length=128, blank=True, null=True)
    date_de_fin_de_la_procedure_de_rappel = models.CharField(max_length=32, blank=True, null=True)
    informations_complementaires_publiques = models.TextField(blank=True, null=True)
    liens_vers_les_images = models.TextField(blank=True, null=True)
    lien_vers_la_liste_des_produits = models.CharField(max_length=128, blank=True, null=True)
    lien_vers_la_liste_des_distributeurs = models.CharField(max_length=128, blank=True, null=True)
    lien_vers_affichette_pdf = models.CharField(max_length=64, blank=True, null=True)
    lien_vers_la_fiche_rappel = models.CharField(max_length=64, blank=True, null=True)
    rappelguid = models.CharField(max_length=64, blank=True, null=True)
    date_de_publication = models.CharField(max_length=16, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    # Metadata
    class Meta:
        ordering = ['-date_de_publication']

    def __str__(self):
        """String for representing the MyModelName object (in Admin site etc.)."""
        return self.reference_fiche