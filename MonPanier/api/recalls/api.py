from typing import List

from ninja import Router

from MonPanier.api.recalls.models import Recall
from MonPanier.api.recalls.schemas import RecallSchema

router = Router(tags=["recalls"])


@router.get("/", operation_id="getRecalls", response=List[RecallSchema])
def list_recalls(request):
    qs = Recall.objects.all()
    return qs
