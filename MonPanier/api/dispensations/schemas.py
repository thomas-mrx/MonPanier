from ninja import ModelSchema

from MonPanier.api.dispensations.models import Dispensation


class DispensationSchema(ModelSchema):
    class Config:
        model = Dispensation
        model_fields = "__all__"