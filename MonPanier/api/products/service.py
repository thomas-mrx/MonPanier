import datetime

from MonPanier.api.dispensations.models import Dispensation
from MonPanier.api.dispensationsCounts.models import DispensationsCount
from MonPanier.api.recalls.models import Recall
from MonPanier.api.recallsCounts.models import RecallsCount


def str_to_array(line):
    return [x.strip() for x in line.split(',')] if line is not None and line != '' else []

ALLERGENS_WEIGHT = 10
ALLERGENS_COEFFICIENT = 0.1
CATEGORY_NEG_FACTOR = 0.1
CATEGORY_MIN_FACTOR = 0.1
MAX_SCORE = 15
GRADES = ['a', 'b', 'c', 'd', 'e']
def mp_sanit_score(food):
    today = datetime.date.today()
    last_year = today - datetime.timedelta(days=365.24)
    total_recalls = Recall.objects.all().filter(date_de_publication__range=[last_year, today]).values('ean').distinct().count()
    total_dispens = Dispensation.objects.all().filter(datedepot__range=[last_year, today], impact_allergenes__startswith="Nouvel").values('code_barre_ean_gtin').distinct().count()
    total_sanit = total_recalls + total_dispens
    categories = str_to_array(food.categories_tags)
    dispensations_score = 0
    recalls_score = 0
    dispensations_count = DispensationsCount.objects.all().filter(category__in=categories, created_at=today).values('dispensation_category', 'dispensation_allergens_rate')
    for disp in dispensations_count:
        dispensations_score += disp['dispensation_allergens_rate'] * max(CATEGORY_MIN_FACTOR, 1 - ((len(disp['dispensation_category'])-1) * CATEGORY_NEG_FACTOR))
    recalls_count = RecallsCount.objects.all().filter(category__in=categories, created_at=today).values('recall_category', 'recall_rate')
    for rec in recalls_count:
        recalls_score += rec['recall_rate'] * max(CATEGORY_MIN_FACTOR, 1 - ((len(rec['recall_category'])-1) * CATEGORY_NEG_FACTOR))
    dispensations_coeff = round(total_dispens / total_sanit, 2) * (1 - ALLERGENS_COEFFICIENT)
    recalls_coeff = round(total_recalls / total_sanit, 2) * (1 - ALLERGENS_COEFFICIENT)
    allergens_score = ALLERGENS_WEIGHT * len(str_to_array(food.allergens))
    score = allergens_score * ALLERGENS_COEFFICIENT + dispensations_score * dispensations_coeff + recalls_score * recalls_coeff
    step = MAX_SCORE // len(GRADES)
    grade = GRADES[min(int(score // step), len(GRADES)-1)]
    return {
        "grade": grade,
        "score": round(score, 2),
        "max_score": round(MAX_SCORE, 2),
        "allergens_coeff": round(ALLERGENS_COEFFICIENT, 4),
        "allergens_score": round(allergens_score, 2),
        "dispensations_coeff": round(dispensations_coeff, 4),
        "dispensations_score": round(dispensations_score, 2),
        "recalls_coeff": round(recalls_coeff, 4),
        "recalls_score": round(recalls_score, 2),
    }

def mp_nutrim_score(food):
    return {
        "score": 0,
        "nutriments": {},
    }

def mp_eco_score(food):
    return {
        "score": 0,
        "eco": {},
    }