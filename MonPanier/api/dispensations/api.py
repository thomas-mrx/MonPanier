from typing import List

from ninja import Router

from MonPanier.api.dispensations.models import Dispensation
from MonPanier.api.dispensations.schemas import DispensationSchema

router = Router(tags=["dispensation"])


@router.get("/", operation_id="getDispensations", response=List[DispensationSchema])
def list_dispensation(request):
    qs = Dispensation.objects.all()
    return qs
