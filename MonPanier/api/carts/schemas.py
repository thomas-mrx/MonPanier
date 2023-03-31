from typing import List

from ninja import ModelSchema

from MonPanier.api.carts.models import Cart
from MonPanier.api.products.schemas import ProductSchema


class CartSchema(ModelSchema):
    products: List[ProductSchema] = []

    class Config:
        model = Cart
        model_fields = "__all__"


class CreateCartSchema(ModelSchema):
    class Config:
        model = Cart
        model_fields = ["name"]
