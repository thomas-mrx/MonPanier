# Generated by Django 4.1.7 on 2023-03-30 15:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dispensationsCounts', '0003_dispensationscount_dispensation_allergens_count_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dispensationscount',
            name='dispensation_allergens_rate',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='dispensationscount',
            name='dispensation_rate',
            field=models.FloatField(default=0),
        ),
    ]