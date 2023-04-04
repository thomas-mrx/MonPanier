from typing import List

from django.db.models import Q
from ninja import Router

from MonPanier.api.foods.models import Food
from MonPanier.api.foods.schemas import FoodSchema

router = Router(tags=["foods"])


@router.get("/search", operation_id="searchFoods", response=List[FoodSchema])
def search_foods(request, query: str, limit: int = 5, offset: int = 0):
    return Food.objects.filter(Q(product_name__icontains=query) | Q(brands__icontains=query) | Q(code__startswith=query) | Q(categories__icontains=query)).order_by('-unique_scans_n')[offset:offset+limit]


@router.get("/code", operation_id="getFoodByCode", response=FoodSchema)
def get_by_code(request, code: str):
    return Food.objects.get(code=code)