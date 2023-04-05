from typing import List

from ninja import Schema
from datetime import date


class EvolutionDatasetSchema(Schema):
    month: date
    total: int


class RecallCategoryDatasetSchema(Schema):
    sous_categorie_de_produit: str
    total: int


class DispensationCategoryDatasetSchema(Schema):
    categorie_du_produit_rayon: str
    total: int


class RecallsCategoriesSchema(Schema):
    last_month_data: List[RecallCategoryDatasetSchema]
    last_year_data: List[RecallCategoryDatasetSchema]


class DispensationsCategoriesSchema(Schema):
    last_month_data: List[DispensationCategoryDatasetSchema]
    last_year_data: List[DispensationCategoryDatasetSchema]


class RecallsStatsSchema(Schema):
    last_month: int
    last_year: int
    data: List[EvolutionDatasetSchema]
    categories: RecallsCategoriesSchema


class DispensationsStatsSchema(Schema):
    last_month: int
    last_year: int
    data: List[EvolutionDatasetSchema]
    categories: DispensationsCategoriesSchema


class CartsScoreSchema(Schema):
    mp_nutrim_score__avg: float = None
    mp_sanit_score__avg: float = None
    mp_eco_score__avg: float = None
    mp_global_score__avg: float = None


class StatsSchema(Schema):
    carts_count: int
    carts_scores: CartsScoreSchema
    recalls: RecallsStatsSchema
    dispensations: DispensationsStatsSchema
