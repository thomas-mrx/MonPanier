from typing import List

from ninja import Router

from MonPanier.api.error import Error
from MonPanier.api.foods.models import Food
from MonPanier.api.foods.schemas import FoodSchema

router = Router(tags=["foods"])


@router.get("/search", operation_id="searchFood", response={200: List[FoodSchema], 400: Error, 404: Error})
def search_food(request, category: str = None, name: str = None, limit: int = 10, offset: int = 0):
    try:
        if category and name :
            return Food.objects.filter(categories__icontains=category, product_name__icontains=name)[offset: offset + limit]
        elif category:
            return Food.objects.filter(categories__icontains=category)[offset: offset + limit]
        elif name:
            return Food.objects.filter(product_name__icontains=name)[offset: offset + limit]
        else:
            return 400, {"message": "Please provide either category or name parameter to search for food."}
    except Food.DoesNotExist:
        return 404, {"message": "No Result"}


@router.get("/{product_ean}", operation_id="getFood", response=FoodSchema)
def get_food(request, product_ean: str):
    return Food.objects.get(code=product_ean)
