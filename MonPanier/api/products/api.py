import base64
import datetime
from urllib.request import urlopen

from typing import List

from ninja import Router

from MonPanier.api.dispensations.models import Dispensation
from MonPanier.api.error import Error
from MonPanier.api.foods.models import Food
from MonPanier.api.products.models import Product
from MonPanier.api.products.service import str_to_array, mp_sanit_score, mp_nutrim_score, mp_eco_score
from MonPanier.api.products.schemas import ProductSchema
from MonPanier.api.recalls.models import Recall

router = Router(tags=["products"])


@router.get("/id/{product_id}", operation_id="getProductById", response={200: ProductSchema, 404: Error})
def get_product_by_id(request, product_id: int):
    try:
        product = Product.objects.get(id=product_id)
        today = datetime.date.today()
        last_year = today - datetime.timedelta(days=365.24)
        p = product.__dict__
        p["recalls"] = list(Recall.objects.filter(ean=p['ean'],date_de_publication__range=[last_year, today]))
        p["dispensations_allergens"] = list(Dispensation.objects.filter(code_barre_ean_gtin=p['ean'], datedepot__range=[last_year, today], impact_allergenes__isnull=False))
        p["dispensations_others"] = list(Dispensation.objects.filter(code_barre_ean_gtin=p['ean'], datedepot__range=[last_year, today], impact_allergenes__isnull=True))
        return p
    except Product.DoesNotExist:
        return 404, {"message": "No Result"}


@router.get("/{product_ean}", operation_id="getProduct", response={200: ProductSchema, 404: Error})
def get_product(request, product_ean: str):
    try:
        food = Food.objects.get(code=product_ean)
        try:
            product = Product.objects.filter(ean=product_ean).order_by('-created_at').first()
        except Product.DoesNotExist:
            product = None
        food_dict = food.__dict__
        today = datetime.date.today()
        last_year = today - datetime.timedelta(days=365.24)
        dispensations_allergens = list(Dispensation.objects.filter(code_barre_ean_gtin=food.code, datedepot__range=[last_year, today], impact_allergenes__isnull=False))
        dispensations_others = list(Dispensation.objects.filter(code_barre_ean_gtin=food.code, datedepot__range=[last_year, today], impact_allergenes__isnull=True))
        recalls = list(Recall.objects.filter(ean=food.code,date_de_publication__range=[last_year, today]))
        sanit_score = mp_sanit_score(food, dispensations_allergens, recalls)
        nutrim_score = mp_nutrim_score(food)
        eco_score = mp_eco_score(food)
        if product is None or product.created_at.timestamp() <= float(food.last_modified_t):
            img_ext = food.image_url.split('.')[-1]
            product = Product.objects.create(
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
                manufacturing_places=str_to_array(food.manufacturing_places),
                factories=str_to_array(food.cities_tags),
                mp_sanit_score=sanit_score,
                mp_nutrim_score=nutrim_score,
                mp_eco_score=eco_score,
            )
        p = product.__dict__
        p["recalls"] = recalls
        p["dispensations_allergens"] = dispensations_allergens
        p["dispensations_others"] = dispensations_others
        return p
    except Food.DoesNotExist:
        return 404, Error(message="Product not found")

    