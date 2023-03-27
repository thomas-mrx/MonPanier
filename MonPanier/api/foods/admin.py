from django.contrib import admin

from MonPanier.api.foods.models import Food


class FoodAdmin(admin.ModelAdmin):
    list_display = ('code', 'brands', 'product_name', 'categories')


admin.site.register(Food, FoodAdmin)