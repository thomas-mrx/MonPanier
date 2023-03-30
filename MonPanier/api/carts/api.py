from typing import List

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from ninja import Router

from MonPanier.api.carts.models import Cart
from MonPanier.api.carts.schemas import CartSchema, CreateCartSchema

router = Router(tags=["carts"])


@router.get("/", operation_id="getCarts", response=List[CartSchema])
def list_carts(request):
    qs = Cart.objects.all()
    return qs


@router.post("/", operation_id="createCart", response=CartSchema)
def create_cart(request, payload: CreateCartSchema):
    payload_dict = payload.dict()
    user = get_object_or_404(User, id=payload.user)
    payload_dict["user"] = user
    cart = Cart.objects.create(**payload_dict)
    return cart
