import json
import os
import shutil
import time
from urllib.request import urlopen
import hashlib

from django_cron import CronJobBase, Schedule

from MonPanier.api.dispensations.models import Dispensation


class DispensationsUpdate(CronJobBase):
    schedule = Schedule(run_at_times=['02:00'])
    code = 'MonPanier.DispensationsUpdate'

    def do(self):
        print("[DispensationsUpdate] Starting cron job...")
        url = 'https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/demarches-simplifiees-etikraine/exports/json?lang=fr&timezone=Europe%2FBerlin'
        file_name = '.cron.derogconso.json'
        current_time = time.time()
        try:
            last_edit_date = os.path.getmtime(file_name)
            file_size = os.path.getsize(file_name)
        except FileNotFoundError:
            last_edit_date = 0
            file_size = 0
        if current_time - last_edit_date >= 60 * 60 * 24 or file_size == 0:
            with urlopen(url) as response, open(file_name, 'wb+') as json_file:
                print("[DispensationsUpdate] Downloading file...")
                shutil.copyfileobj(response, json_file)
        else:
            print("[DispensationsUpdate] Using cached file...")
        with open(file_name, 'r') as json_file:
            print("[DispensationsUpdate] Loading file...")
            data = json.load(json_file)
            references = list(Dispensation.objects.values_list('hash', flat=True))
            dispensations_to_create = []
            counter_created = 0
            check_ref = []
            for i, dispensation in enumerate(data):
                if i % 1000 == 0:
                    print("[DispensationsUpdate] {} lines processed.".format(i))
                d = None
                if dispensation['categorie_du_produit_rayon'] != 'Cosmétiques':
                    hashable = ''.join(['' if v is None else v for v in list(dispensation.values())]).encode('utf-8')
                    dispensation['hash'] = hashlib.sha256(hashable).hexdigest()
                    if dispensation['hash'] in check_ref:
                        continue
                    check_ref.append(dispensation['hash'])
                    d = Dispensation(**dispensation)
                if not d or dispensation['hash'] in references:
                    continue

                dispensations_to_create.append(d)

                if len(dispensations_to_create) >= 5000:
                    Dispensation.objects.bulk_create(dispensations_to_create)
                    counter_created += len(dispensations_to_create)
                    dispensations_to_create = []
            if dispensations_to_create:
                Dispensation.objects.bulk_create(dispensations_to_create)
                counter_created += len(dispensations_to_create)
            print("[DispensationsUpdate] Created {} dispensations.".format(counter_created))