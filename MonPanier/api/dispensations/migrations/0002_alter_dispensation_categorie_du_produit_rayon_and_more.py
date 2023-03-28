# Generated by Django 4.1.7 on 2023-03-28 09:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dispensations', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dispensation',
            name='categorie_du_produit_rayon',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='dispensation',
            name='cause_de_la_demande_de_derogation',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='dispensation',
            name='code_barre_ean_gtin',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='dispensation',
            name='datedepot',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='dispensation',
            name='impact_allergenes',
            field=models.TextField(blank=True, null=True),
        ),
    ]
