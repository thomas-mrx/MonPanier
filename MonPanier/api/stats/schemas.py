from typing import List

from ninja import Schema
from datetime import date

class datasetSchema(Schema):
    month: date
    total: int


class RecallsStatsSchema(Schema):
    last_month: int
    last_year: int
    data: List[datasetSchema]

class DispensationsStatsSchema(Schema):
    last_month: int
    last_year: int
    data: List[datasetSchema]


class StatsSchema(Schema):
    recalls: RecallsStatsSchema
    dispensations: DispensationsStatsSchema
