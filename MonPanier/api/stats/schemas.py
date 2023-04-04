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

class StatsSchema(Schema):
    recalls: RecallsStatsSchema
    dispensations: DispensationsStatsSchema
