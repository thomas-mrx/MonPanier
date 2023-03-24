from typing import List

from ninja import Router

from MonPanier.api.products.models import Product
from MonPanier.api.products.schemas import ProductSchema

router = Router(tags=["products"])


@router.get("/", operation_id="getProducts", response=List[ProductSchema])
def list_products(request):
    qs = Product.objects.all()
    return qs


@router.get("/{product_ean}", operation_id="getProduct", response=ProductSchema)
def get_product(request, product_ean: str):
    return Product.objects.get(ean=product_ean)

@router.get("/search/{product_title}", operation_id="searchProduct", response=List[ProductSchema])
def search_product(request, product_title: str):
    return Product.objects.filter(title__icontains=product_title)
    