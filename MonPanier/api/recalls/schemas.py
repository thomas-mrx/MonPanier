from ninja import ModelSchema

from MonPanier.api.recalls.models import Recall


class RecallSchema(ModelSchema):
    class Config:
        model = Recall
        model_fields = "__all__"