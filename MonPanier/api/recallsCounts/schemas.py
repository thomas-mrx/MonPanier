from ninja import ModelSchema

from MonPanier.api.recallsCounts.models import RecallsCount


class RecallsCountSchema(ModelSchema):
    class Config:
        model = RecallsCount
        model_fields = "__all__"