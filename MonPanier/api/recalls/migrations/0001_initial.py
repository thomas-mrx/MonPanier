# Generated by Django 4.1.7 on 2023-03-27 09:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Recall',
            fields=[
                ('reference_fiche', models.CharField(max_length=16, primary_key=True, serialize=False)),
                ('ndeg_de_version', models.CharField(max_length=1)),
                ('nature_juridique_du_rappel', models.CharField(blank=True, max_length=64)),
                ('categorie_de_produit', models.CharField(blank=True, max_length=64)),
                ('sous_categorie_de_produit', models.CharField(blank=True, max_length=64)),
                ('nom_de_la_marque_du_produit', models.CharField(max_length=256)),
                ('noms_des_modeles_ou_references', models.CharField(max_length=512)),
                ('identification_des_produits', models.CharField(blank=True, max_length=4096)),
                ('conditionnements', models.CharField(blank=True, max_length=256)),
                ('date_debut_fin_de_commercialisation', models.CharField(blank=True, max_length=32)),
                ('temperature_de_conservation', models.CharField(blank=True, max_length=64)),
                ('marque_de_salubrite', models.CharField(blank=True, max_length=256)),
                ('informations_complementaires', models.CharField(blank=True, max_length=2048)),
                ('zone_geographique_de_vente', models.CharField(blank=True, max_length=2048)),
                ('distributeurs', models.CharField(blank=True, max_length=512)),
                ('motif_du_rappel', models.CharField(max_length=2048)),
                ('risques_encourus_par_le_consommateur', models.CharField(max_length=256)),
                ('preconisations_sanitaires', models.CharField(blank=True, max_length=4096)),
                ('description_complementaire_du_risque', models.CharField(blank=True, max_length=256)),
                ('conduites_a_tenir_par_le_consommateur', models.CharField(blank=True, max_length=256)),
                ('numero_de_contact', models.CharField(blank=True, max_length=16)),
                ('modalites_de_compensation', models.CharField(blank=True, max_length=128)),
                ('date_de_fin_de_la_procedure_de_rappel', models.CharField(blank=True, max_length=32)),
                ('informations_complementaires_publiques', models.CharField(blank=True, max_length=256)),
                ('liens_vers_les_images', models.CharField(blank=True, max_length=512)),
                ('lien_vers_la_liste_des_produits', models.CharField(blank=True, max_length=128)),
                ('lien_vers_la_liste_des_distributeurs', models.CharField(blank=True, max_length=128)),
                ('lien_vers_affichette_pdf', models.CharField(max_length=64)),
                ('lien_vers_la_fiche_rappel', models.CharField(max_length=64)),
                ('rappelguid', models.CharField(max_length=64)),
                ('date_de_publication', models.CharField(max_length=16)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['reference_fiche', '-date_de_publication'],
            },
        ),
    ]