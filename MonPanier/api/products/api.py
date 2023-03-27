from typing import List

from ninja import Router

from MonPanier.api.error import Error
from MonPanier.api.products.models import Product
from MonPanier.api.products.schemas import ProductSchema

router = Router(tags=["products"])


@router.get("/", operation_id="getProducts", response=List[ProductSchema])
def list_products(request):
    qs = Product.objects.all()
    return qs


@router.get("/{product_ean}", operation_id="getProduct", response={200: ProductSchema, 404: Error})
def get_product(request, product_ean: str):
    try:
        return Product.objects.get(ean=product_ean)
    except Product.DoesNotExist:
        return 404, {"message": "No product found."}

@router.get("/search/{product_title}", operation_id="searchProduct", response=List[ProductSchema])
def search_product(request, product_title: str):
        return Product.objects.filter(title__icontains=product_title)
    