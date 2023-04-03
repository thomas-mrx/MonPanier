from django.db.models.functions import TruncMonth
from django.utils import timezone
from datetime import timedelta
from django.db.models import Q, Count
from ninja import Router

from MonPanier.api.dispensations.models import Dispensation
from MonPanier.api.recalls.models import Recall
from MonPanier.api.stats.schemas import StatsSchema

router = Router(tags=["stats"])


@router.get("/", operation_id="getStats", response=StatsSchema)
def get_stats(request):
    recalls = Recall.objects.filter(Q(date_de_publication__gte=timezone.now() - timedelta(days=30)) | Q(
        date_de_publication__gte=timezone.now() - timedelta(days=365)))

    dispensations = Dispensation.objects.filter(Q(datedepot__gte=timezone.now() - timedelta(days=30)) | Q(
        datedepot__gte=timezone.now() - timedelta(days=365)))

    response = {
        "recalls": {
            "last_month": recalls.filter(date_de_publication__gte=timezone.now() - timedelta(days=30)).count(),
            "last_year": recalls.filter(date_de_publication__gte=timezone.now() - timedelta(days=365)).count(),
            "data": list(recalls.annotate(month=TruncMonth('date_de_publication')).values('month').annotate(total=Count('reference_fiche')))
        },
        "dispensations": {
            "last_month": dispensations.filter(datedepot__gte=timezone.now() - timedelta(days=30)).count(),
            "last_year": dispensations.filter(datedepot__gte=timezone.now() - timedelta(days=365)).count(),
            "data": list(dispensations.annotate(month=TruncMonth('datedepot')).values('month').annotate(total=Count('hash')))
        }
    }
    return response
