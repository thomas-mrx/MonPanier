from ninja import ModelSchema, Schema

from MonPanier.api.products.models import Product

class Error(Schema):
    message: str

class ProductSchema(ModelSchema):
    class Config:
        model = Product
        model_fields = "__all__"