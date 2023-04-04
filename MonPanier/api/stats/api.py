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
            "data": list(recalls.annotate(month=TruncMonth('date_de_publication')).values('month').annotate(total=Count('reference_fiche'))),
            "categories": {
                "last_month_data": list(recalls.filter(date_de_publication__gte=timezone.now() - timedelta(days=30)).values('sous_categorie_de_produit').annotate(total=Count('reference_fiche')).order_by('-total')),
                "last_year_data": list(recalls.filter(date_de_publication__gte=timezone.now() - timedelta(days=365)).values('sous_categorie_de_produit').annotate(total=Count('reference_fiche')).order_by('-total')),
            }
        },
        "dispensations": {
            "last_month": dispensations.filter(datedepot__gte=timezone.now() - timedelta(days=30)).count(),
            "last_year": dispensations.filter(datedepot__gte=timezone.now() - timedelta(days=365)).count(),
            "data": list(dispensations.annotate(month=TruncMonth('datedepot')).values('month').annotate(total=Count('hash'))),
            "categories": {
                "last_month_data": list(dispensations.filter(datedepot__gte=timezone.now() - timedelta(days=30)).values('categorie_du_produit_rayon').annotate(total=Count('hash')).order_by('-total')),
                "last_year_data": list(dispensations.filter(datedepot__gte=timezone.now() - timedelta(days=365)).values('categorie_du_produit_rayon').annotate(total=Count('hash')).order_by('-total')),
            }
        }
    }
    return response
