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
    qs = Cart.objects.filter(user=user).order_by('-updated_at').all()
    return qs


@router.get("/{cart_id}", operation_id="getCart", response={
    200: CartSchema, 404: Error})
def get_cart(request, cart_id):
    try:
        user = request.user
        cart = Cart.objects.filter(user=user).get(id=cart_id)

    except Cart.DoesNotExist:
        return 404, {"message": "No Result"}
    return 200, cart


@router.post("/{cart_id}/products/{product_id}", operation_id="addProductToCart", response={
    200: CartSchema, 404: Error})
def add_product_to_cart(request, cart_id, product_id):
    try:
        user = request.user
        cart = Cart.objects.filter(user=user).get(id=cart_id)
        cart.products.add(product_id)
        count_nutrim = 0
        count_sanit = 0
        count_eco = 0
        sum_nutrim_score = 0
        sum_sanit_score = 0
        sum_eco_score = 0
        for p in cart.products.all():
            if p.mp_nutrim_score['score']:
                sum_nutrim_score += p.mp_nutrim_score['score']
                count_nutrim += 1
            if p.mp_sanit_score['score']:
                sum_sanit_score += p.mp_sanit_score['score']
                count_sanit += 1
            if p.mp_eco_score['score']:
                sum_eco_score += p.mp_eco_score['score']
                count_eco += 1
        if count_nutrim > 0 or count_sanit > 0 or count_eco > 0:
            sum_global_score = 0
            count_scores = 0
            if count_nutrim > 0:
                cart.mp_nutrim_score = sum_nutrim_score / count_nutrim
                sum_global_score += cart.mp_nutrim_score
                count_scores += 1
            if count_sanit > 0:
                cart.mp_sanit_score = sum_sanit_score / count_sanit
                sum_global_score += cart.mp_sanit_score
                count_scores += 1
            if count_eco > 0:
                cart.mp_eco_score = sum_eco_score / count_eco
                sum_global_score += cart.mp_eco_score
                count_scores += 1
            if count_scores > 0:
                cart.mp_global_score = sum_global_score / count_scores
        cart.save()
    except Cart.DoesNotExist:
        return 404, {"message": "No Result"}
    return 200, cart


@router.post("/", operation_id="createCart", response=CartSchema)
def create_cart(request, payload: CreateCartSchema):
    user = request.user
    cart = Cart.objects.create(user=user, name=payload.name)
    return cart
