# Generated by Django 4.1.7 on 2023-03-27 14:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('foods', '0002_food_id_alter_food_code'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='food',
            name='id',
        ),
        migrations.AlterField(
            model_name='food',
            name='code',
            field=models.CharField(max_length=64, primary_key=True, serialize=False, unique=True),
        ),
    ]