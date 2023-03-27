from ninja import Router

from MonPanier.api.foods.models import Food
from MonPanier.api.foods.schemas import FoodSchema

router = Router(tags=["foods"])


@router.get("/{product_ean}", operation_id="getFood", response=FoodSchema)
def get_food(request, product_ean: str):
    return Food.objects.get(code=product_ean)
