from ninja import ModelSchema

from MonPanier.api.foods.models import Food


class FoodSchema(ModelSchema):
    class Config:
        model = Food
        model_fields = "__all__"