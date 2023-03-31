from MonPanier.api.dispensationsCounts.models import DispensationsCount
from MonPanier.api.recallsCounts.models import RecallsCount

def str_to_array(line):
    return [x.strip() for x in line.split(',')] if line is not None and line != '' else []

ALLERGENS_COEFFICIENT = 0.1
RECALLS_COEFFICIENT = 0.9
MAX_SCORE = 100
GRADES = ['a', 'b', 'c', 'd', 'e']
def mp_sanit_score(food, dispensations_allergens, recalls):
    categories = str_to_array(food.categories_tags)

    if len(str_to_array(food.allergens)) or len(dispensations_allergens):
        allergens_score = 100
    else:
        allergens_score = 0
        last_date = DispensationsCount.objects.all().order_by('-created_at').first().created_at
        dispensations_count = DispensationsCount.objects.all().filter(category__in=categories, created_at=last_date).values('dispensation_category', 'dispensation_allergens_rate')
        for disp in dispensations_count:
            allergens_score += disp['dispensation_allergens_rate'] / len(disp['dispensation_category'])

    if len(recalls):
        recalls_score = 100
    else:
        recalls_score = 0
        last_date = RecallsCount.objects.all().order_by('-created_at').first().created_at
        recalls_count = RecallsCount.objects.all().filter(category__in=categories, created_at=last_date).values('recall_category', 'recall_rate')
        for rec in recalls_count:
            recalls_score += rec['recall_rate'] / len(rec['recall_category'])

    score = allergens_score * ALLERGENS_COEFFICIENT + recalls_score * RECALLS_COEFFICIENT
    step = MAX_SCORE // len(GRADES)
    grade = GRADES[min(int(score // step), len(GRADES)-1)]
    return {
        "grade": grade,
        "score": round(score, 2),
        "max_score": round(MAX_SCORE, 2),
        "allergens_coeff": round(ALLERGENS_COEFFICIENT, 2),
        "allergens_score": round(allergens_score, 2),
        "recalls_coeff": round(RECALLS_COEFFICIENT, 2),
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