from ninja import ModelSchema

from MonPanier.api.products.models import Product


class ProductSchema(ModelSchema):
    class Config:
        model = Product
        model_fields = "__all__"