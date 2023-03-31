from ninja import ModelSchema

from MonPanier.api.foods.models import Food


class FoodSchema(ModelSchema):
    class Config:
        model = Food
        model_fields = ['code', 'product_name', 'brands', 'categories', 'image_url',]