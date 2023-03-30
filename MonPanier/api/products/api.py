import base64
import datetime
from urllib.request import urlopen

from typing import List

from ninja import Router

from MonPanier.api.error import Error
from MonPanier.api.foods.models import Food
from MonPanier.api.products.models import Product
from MonPanier.api.products.service import str_to_array, mp_sanit_score
from MonPanier.api.products.schemas import ProductSchema

router = Router(tags=["products"])


@router.get("/", operation_id="getProducts", response=List[ProductSchema])
def list_products(request):
    qs = Product.objects.all()
    return qs


@router.get("/{product_ean}", operation_id="getProduct", response={200: ProductSchema, 404: Error})
def get_product(request, product_ean: str):
    try:
        food = Food.objects.get(code=product_ean)
        try:
            product = Product.objects.get(ean=product_ean)
        except Product.DoesNotExist:
            product = None
        food_dict = food.__dict__
        sanit_score = mp_sanit_score(food)
        if product is None or product.created_at.timestamp() <= float(food.last_modified_t):
            img_ext = food.image_url.split('.')[-1]
            return Product.objects.create(
                ean=food.code,
                title=food.product_name,
                brands=food.brands,
                categories=str_to_array(food.categories),
                image="data:image/"+img_ext+";base64,"+base64.b64encode(urlopen(food.image_url).read()).decode('utf-8') if img_ext in ['png', 'jpg', 'jpeg'] else None,
                allergens=str_to_array(food.allergens),
                traces=str_to_array(food.traces),
                labels=str_to_array(food.labels),
                vitamins={k: v for k, v in food_dict.items() if k.startswith('vitamin_') and v is not None and v != ''},
                nutriments={k: v for k, v in food_dict.items() if not k.startswith('vitamin_') and v is not None and v != '' and k.endswith('_100g')},
                vegetarian='en:vegetarian' in food.labels_tags or 'en:vegetarian' in food.ingredients_analysis_tags,
                vegan='en:vegan' in food.labels_tags or 'en:vegan' in food.ingredients_analysis_tags,
                ingredients={"text": food.ingredients_text, "tags": str_to_array(food.ingredients_tags)},
                additives={"text": food.additives_en, "tags": str_to_array(food.additives_tags)},
                packaging={"text": food.packaging_text, "tags": str_to_array(food.packaging_tags)},
                nova_group=food.nova_group,
                nutri_score=food.nutriscore_grade,
                eco_score=food.ecoscore_score,
                manufacturing_places=str_to_array(food.manufacturing_places),
                factories=str_to_array(food.cities_tags),
                mp_sanit_score=sanit_score
            )
        return product
    except Food.DoesNotExist:
        return 404, Error(message="Product not found")

    