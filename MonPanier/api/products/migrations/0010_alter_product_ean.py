# Generated by Django 4.1.7 on 2023-03-31 15:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0009_alter_product_mp_eco_score_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='ean',
            field=models.CharField(help_text='13 Character <a href="https://www.ean-search.org/">EAN</a>', max_length=13, verbose_name='EAN'),
        ),
    ]
