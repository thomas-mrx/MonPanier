import datetime
import json
import os
import shutil
import time
from urllib.request import urlopen
import hashlib

from django.db import connection, OperationalError
from django_cron import CronJobBase, Schedule

from MonPanier.api.dispensations.models import Dispensation
from MonPanier.api.dispensationsCounts.models import DispensationsCount
from MonPanier.api.foods.models import Food


def ensure_connection():
    if connection.connection is not None:
        connection.close()
    while True:
        try:
            connection.ensure_connection()
        except OperationalError:
            time.sleep(1)
        else:
            connection.close()
            break

class DispensationsUpdate(CronJobBase):
    schedule = Schedule(run_at_times=['03:00', '15:00'])
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
        if current_time - last_edit_date >= 60 * 60 * 11 or file_size == 0:
            with urlopen(url) as response, open(file_name, 'wb+') as json_file:
                print("[DispensationsUpdate] Downloading file...")
                shutil.copyfileobj(response, json_file)
        else:
            print("[DispensationsUpdate] Using cached file...")
        with open(file_name, 'r') as json_file:
            print("[DispensationsUpdate] Loading file...")
            data = json.load(json_file)
            references = list(Dispensation.objects.values_list('hash', flat=True))
            today = datetime.date.today()
            last_year = today - datetime.timedelta(days=365.24)
            ean_dict = {}
            for code in list(Dispensation.objects.all().filter(datedepot__range=[last_year, today]).values('code_barre_ean_gtin', 'categorie_du_produit_rayon').distinct()):
                if code['code_barre_ean_gtin'] is not None:
                    ean_dict[code['code_barre_ean_gtin']] = {'category': code['categorie_du_produit_rayon'], 'food': None}
            dispensations_to_create = []
            count_to_create = []
            count_to_update = []
            dispensations_count = DispensationsCount.objects.filter(created_at=today).values_list('category', 'hash')
            count_dict = {}
            count_dict_temp = {}
            for c in dispensations_count:
                count_dict[c[0]] = [0, [], c[1]]
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

                try:
                    ean_dict[d.code_barre_ean_gtin] = {"food": Food.objects.get(code=d.code_barre_ean_gtin), "category": d.categorie_du_produit_rayon}
                except Food.DoesNotExist:
                    continue

                dispensations_to_create.append(d)

                if len(dispensations_to_create) >= 5000:
                    ensure_connection()
                    Dispensation.objects.bulk_create(dispensations_to_create)
                    counter_created += len(dispensations_to_create)
                    dispensations_to_create = []

            if dispensations_to_create:
                ensure_connection()
                Dispensation.objects.bulk_create(dispensations_to_create)
                counter_created += len(dispensations_to_create)
            print("[DispensationsUpdate] Created {} dispensations.".format(counter_created))

            print("[DispensationsUpdate] Updating dispensations count...")
            for k, v in ean_dict.items():
                if v["food"] is None:
                    food = Food.objects.get(code=k)
                else:
                    food = v["food"]
                recall_category = v["category"]

                categories = [c.strip() for c in food.categories_tags.split(',')] if food.categories_tags is not None and food.categories_tags != '' else []
                for c in categories:
                    count_cat = count_dict.get(c, None)
                    if count_cat is None:
                        count_cat_temp = count_dict_temp.get(c, None)
                        if count_cat_temp is None:
                            count_dict_temp[c] = [1, [recall_category], hashlib.sha256((str(today)+"-"+c).encode('utf-8')).hexdigest()]
                        else:
                            count_dict_temp[c][0] = count_cat_temp[0] + 1
                            if recall_category not in count_cat_temp[1]:
                                count_dict_temp[c][1] = count_cat_temp[1] + [recall_category]
                    else:
                        count_dict[c][0] = count_cat[0] + 1
                        if recall_category not in count_cat[1]:
                            count_dict[c][1] = count_cat[1] + [recall_category]

            total_dispensations = len(ean_dict)
            print("[DispensationsUpdate] Total unique ean dispensations: {}".format(total_dispensations))
            if count_dict_temp:
                for cat, cnt in count_dict_temp.items():
                    count_to_create.append(DispensationsCount(category=cat, dispensation_count=cnt[0], dispensation_category=cnt[1],
                                                        dispensation_rate=round(cnt[0] / total_dispensations * 100, 2),
                                                        hash=cnt[2]))
                if count_to_create:
                    ensure_connection()
                    DispensationsCount.objects.bulk_create(count_to_create)
            if count_dict:
                for cat, cnt in count_dict.items():
                    count_to_update.append(DispensationsCount(category=cat, dispensation_count=cnt[0], dispensation_category=cnt[1],
                                                        dispensation_rate=round(cnt[0] / total_dispensations * 100, 2),
                                                        hash=cnt[2]))
                if count_to_update:
                    ensure_connection()
                    DispensationsCount.objects.bulk_update(count_to_update,
                                                     ['dispensation_count', 'dispensation_category', 'dispensation_rate'])
            print("[DispensationsUpdate] Created {} dispensations count categories.".format(len(count_to_create)))
            print("[DispensationsUpdate] Updated {} dispensations count categories.".format(len(count_to_update)))

            ensure_connection()