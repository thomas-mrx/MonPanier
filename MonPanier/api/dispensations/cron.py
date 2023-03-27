import json
import os
import shutil
import time
from urllib.request import urlopen

from django_cron import CronJobBase, Schedule

from MonPanier.api.dispensations.models import Dispensation


class DispensationsUpdate(CronJobBase):
    schedule = Schedule(run_every_mins=60 * 24)
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
            for dispensation in data:
                if dispensation['categorie_du_produit_rayon'] != 'Cosmétiques':
                    r = Dispensation(**dispensation)
                    r.save()