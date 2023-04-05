import csv
from typing import List

from django.contrib.auth.models import User
from ninja import Router

from MonPanier.api.carts.models import Cart
from MonPanier.api.carts.schemas import CartSchema, CreateCartSchema, CartSchemaExtended
from MonPanier.api.carts.service import calculate_cart_scores, create_cart_anti_inflation
from MonPanier.api.error import Error

router = Router(tags=["carts"])


@router.get("/", operation_id="getCarts", response=List[CartSchema])
def list_carts(request):
    user = request.user
    qs = Cart.objects.filter(user=user).order_by('-updated_at').all()
    return qs

@router.post("/init/{user_id}", operation_id="createAntiInflation", response={200: None, 401: Error}, auth=None)
def carts_anti_inflation(request, user_id: int):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return 401, {"message": "Forbidden"}
    if Cart.objects.filter(user=user).filter(name__startswith="Anti-inflation").exists():
        return 200, None

    create_cart_anti_inflation(request, user, "Anti-inflation Système U", "datasets/PANIERS_ANTI_INFLATION_SuperU.csv")
    create_cart_anti_inflation(request, user, "Anti-inflation Carrefour", "datasets/PANIERS_ANTI_INFLATION_Carrefour.csv")
    create_cart_anti_inflation(request, user, "Anti-inflation Intermarché", "datasets/PANIERS_ANTI_INFLATION_Intermarche.csv")
    return 200, None


@router.get("/{cart_id}", operation_id="getCart", response={
    200: CartSchemaExtended, 404: Error})
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
        cart = calculate_cart_scores(cart)
        cart.save()
    except Cart.DoesNotExist:
        return 404, {"message": "No Result"}
    return 200, cart


@router.post("/", operation_id="createCart", response=CartSchema)
def create_cart(request, payload: CreateCartSchema):
    user = request.user
    cart = Cart.objects.create(user=user, name=payload.name)
    return cart
