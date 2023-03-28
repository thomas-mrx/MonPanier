import json
import os
import re
import shutil
import time
from urllib.request import urlopen

from django_cron import CronJobBase, Schedule

from MonPanier.api.recalls.models import Recall


class RecallsUpdate(CronJobBase):
    schedule = Schedule(run_at_times=['02:00'])
    code = 'MonPanier.RecallsUpdate'

    def do(self):
        print("[RecallsUpdate] Starting cron job...")
        url = 'https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/rappelconso0/exports/json?lang=fr&timezone=Europe%2FBerlin'
        file_name = '.cron.rappelconso.json'
        current_time = time.time()
        try:
            last_edit_date = os.path.getmtime(file_name)
            file_size = os.path.getsize(file_name)
        except FileNotFoundError:
            last_edit_date = 0
            file_size = 0
        if current_time - last_edit_date >= 60 * 60 * 24 or file_size == 0:
            with urlopen(url) as response, open(file_name, 'wb+') as json_file:
                print("[RecallsUpdate] Downloading file...")
                shutil.copyfileobj(response, json_file)
        else:
            print("[RecallsUpdate] Using cached file...")
        with open(file_name, 'r') as json_file:
            print("[RecallsUpdate] Loading file...")
            data = json.load(json_file)
            references = list(Recall.objects.values_list('reference_fiche', flat=True))
            recalls_to_create = []
            for recall in data:
                r = None
                if recall['categorie_de_produit'] == 'Alimentation' and recall['zone_geographique_de_vente'] == 'France entière':
                    ean = re.findall(r'^(\d{8,14})', recall['identification_des_produits'])
                    recall['ean'] = ean[0] if len(ean) > 0 else None
                    if recall['ean'] is None:
                        continue
                    r = Recall(**recall)
                if not r or recall['reference_fiche'] in references:
                    continue

                recalls_to_create.append(r)

                if len(recalls_to_create) >= 5000:
                    Recall.objects.bulk_create(recalls_to_create)
                    recalls_to_create = []
            if recalls_to_create:
                Recall.objects.bulk_create(recalls_to_create)
