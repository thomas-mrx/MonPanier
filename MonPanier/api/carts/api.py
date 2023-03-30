from typing import List

from ninja import Router

from MonPanier.api.carts.models import Cart
from MonPanier.api.carts.schemas import CartSchema

router = Router(tags=["carts"])


@router.get("/", operation_id="getCarts", response=List[CartSchema])
def list_carts(request):
    qs = Cart.objects.all()
    return qs
