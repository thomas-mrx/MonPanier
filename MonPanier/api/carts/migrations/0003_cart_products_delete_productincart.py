# Generated by Django 4.1.7 on 2023-03-31 17:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0009_alter_product_mp_eco_score_and_more'),
        ('carts', '0002_productincart'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='products',
            field=models.ManyToManyField(to='products.product'),
        ),
        migrations.DeleteModel(
            name='ProductInCart',
        ),
    ]