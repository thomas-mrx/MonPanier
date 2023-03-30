from typing import List

from ninja import ModelSchema, Schema

from MonPanier.api.dispensations.schemas import DispensationSchema
from MonPanier.api.products.models import Product
from MonPanier.api.recalls.schemas import RecallSchema


class ProductSchema(ModelSchema):
    dispensations: List[DispensationSchema] = []
    recalls: List[RecallSchema] = []

    class Config:
        model = Product
        model_fields = "__all__"