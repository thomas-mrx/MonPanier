import json
import re
from urllib.request import urlopen

from django_cron import CronJobBase, Schedule

from MonPanier.api.recalls.models import Recall


class RecallsUpdate(CronJobBase):
    schedule = Schedule(run_every_mins=60 * 24)
    code = 'MonPanier.RecallsUpdate'

    def do(self):
        with urlopen('https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/rappelconso0/exports/json?lang=fr&timezone=Europe%2FBerlin') as url:
            data = json.load(url)
            for recall in data:
                if recall['categorie_de_produit'] == 'Alimentation' and recall['zone_geographique_de_vente'] == 'France entière':
                    ean = re.findall(r'^(\d{8,14})', recall['identification_des_produits'])
                    recall['ean'] = ean[0] if len(ean) > 0 else None
                    r = Recall(**recall)
                    r.save()