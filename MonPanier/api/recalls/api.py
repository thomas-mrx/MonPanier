from typing import List

from ninja import Router

from MonPanier.api.recalls.models import Recall
from MonPanier.api.recalls.schemas import RecallSchema

router = Router(tags=["recalls", "rappels", "DGCCRF"])


@router.get("/", operation_id="getRecalls", response=List[RecallSchema])
def list_products(request):
    qs = Recall.objects.all()
    return qs
