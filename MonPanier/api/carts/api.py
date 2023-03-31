from typing import List

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from ninja import Router

from MonPanier.api.carts.models import Cart
from MonPanier.api.carts.schemas import CartSchema, CreateCartSchema
from MonPanier.api.error import Error

router = Router(tags=["carts"])


@router.get("/", operation_id="getCarts", response=List[CartSchema])
def list_carts(request):
    user = request.user
    qs = Cart.objects.filter(user=user).all()
    return qs


@router.get("/{cart_id}", operation_id="getCart", response={
    200: CartSchema, 404: Error})
def get_cart(request, cart_id):
    try:
        user = request.user
        cart = Cart.objects.filter(user=user).get(id=cart_id)
    except Cart.DoesNotExist:
        return 404, {"message": "No Result"}
    return cart


@router.post("/", operation_id="createCart", response=CartSchema)
def create_cart(request, payload: CreateCartSchema):
    user = request.user
    cart = Cart.objects.create(user=user, name=payload.name)
    return cart
