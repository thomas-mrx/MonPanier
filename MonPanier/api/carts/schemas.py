from ninja import ModelSchema

from MonPanier.api.carts.models import Cart


class CartSchema(ModelSchema):
    class Config:
        model = Cart
        model_fields = "__all__"
