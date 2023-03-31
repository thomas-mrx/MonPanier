from typing import List

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from ninja import Router

from MonPanier.api.carts.models import Cart
from MonPanier.api.carts.schemas import CartSchema, CreateCartSchema

router = Router(tags=["carts"])


@router.get("/", operation_id="getCarts", response=List[CartSchema])
def list_carts(request):
    user = request.user
    qs = Cart.objects.filter(user=user).all()
    return qs


@router.post("/", operation_id="createCart", response=CartSchema)
def create_cart(request, payload: CreateCartSchema):
    user = request.user
    cart = Cart.objects.create(user=user, name=payload.name)
    return cart
