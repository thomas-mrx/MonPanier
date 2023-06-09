# Generated by Django 4.1.7 on 2023-03-22 13:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('summary', models.TextField(help_text='Enter a brief description of the product', max_length=1000)),
                ('ean', models.CharField(help_text='13 Character <a href="https://www.ean-search.org/">EAN</a>', max_length=13, unique=True, verbose_name='EAN')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['title', '-created_at'],
            },
        ),
    ]
