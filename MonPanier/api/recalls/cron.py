import datetime
import hashlib
import json
import os
import re
import shutil
import time
from urllib.request import urlopen

from django.db import connection, OperationalError
from django_cron import CronJobBase, Schedule

from MonPanier.api.foods.models import Food
from MonPanier.api.recalls.models import Recall
from MonPanier.api.recallsCounts.models import RecallsCount


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


class RecallsUpdate(CronJobBase):
    schedule = Schedule(run_at_times=['03:00', '15:00'])
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
        if current_time - last_edit_date >= 60 * 60 * 11 or file_size == 0:
            with urlopen(url) as response, open(file_name, 'wb+') as json_file:
                print("[RecallsUpdate] Downloading file...")
                shutil.copyfileobj(response, json_file)
        else:
            print("[RecallsUpdate] Using cached file...")
        with open(file_name, 'r') as json_file:
            print("[RecallsUpdate] Loading file...")
            data = json.load(json_file)
            references = list(Recall.objects.values_list('reference_fiche', flat=True))
            today = datetime.date.today()
            last_year = today - datetime.timedelta(days=365.24)
            ean_dict = {}
            for code in list(Recall.objects.all().filter(date_de_publication__range=[last_year, today]).values('ean', 'sous_categorie_de_produit').distinct()):
                if code['ean'] is not None:
                    ean_dict[code['ean']] = {'category': code['sous_categorie_de_produit'], 'food': None}
            recalls_to_create = []
            count_to_create = []
            count_to_update = []
            recalls_count = RecallsCount.objects.filter(created_at=today).values_list('category', 'hash')
            count_dict = {}
            count_dict_temp = {}
            for c in recalls_count:
                count_dict[c[0]] = [0, [], c[1]]
            counter_created = 0
            for i, recall in enumerate(data):
                if i % 1000 == 0:
                    print("[RecallsUpdate] {} lines processed.".format(i))
                r = None
                if recall['categorie_de_produit'] == 'Alimentation' and recall['zone_geographique_de_vente'] == 'France entière':
                    ean = re.findall(r'^(\d{8,14})', recall['identification_des_produits'])
                    recall['ean'] = ean[0] if len(ean) > 0 else None
                    if recall['ean'] is None:
                        continue
                    r = Recall(**recall)
                if r is None or recall['reference_fiche'] in references:
                    continue

                try:
                    ean_dict[r.ean] = {"food": Food.objects.get(code=r.ean), "category": r.sous_categorie_de_produit}
                except Food.DoesNotExist:
                    continue

                recalls_to_create.append(r)

                if len(recalls_to_create) >= 5000:
                    ensure_connection()
                    Recall.objects.bulk_create(recalls_to_create)
                    counter_created += len(recalls_to_create)
                    recalls_to_create = []

            if recalls_to_create:
                ensure_connection()
                Recall.objects.bulk_create(recalls_to_create)
                counter_created += len(recalls_to_create)
            print("[RecallsUpdate] Created {} recalls.".format(counter_created))

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

            print("[RecallsUpdate] Updating recalls count...")
            total_recalls = len(ean_dict)
            print("[RecallsUpdate] Total recalls: {}".format(total_recalls))
            if count_dict_temp:
                for cat, cnt in count_dict_temp.items():
                    count_to_create.append(RecallsCount(category=cat, recall_count=cnt[0], recall_category=cnt[1],
                                                        recall_rate=round(cnt[0] / total_recalls * 100, 2),
                                                        hash=cnt[2]))
                if count_to_create:
                    ensure_connection()
                    RecallsCount.objects.bulk_create(count_to_create)
            if count_dict or count_dict_temp:
                for cat, cnt in count_dict.items():
                    count_to_update.append(RecallsCount(category=cat, recall_count=cnt[0], recall_category=cnt[1],
                                                        recall_rate=round(cnt[0] / total_recalls * 100, 2),
                                                        hash=cnt[2]))
                if count_to_update:
                    ensure_connection()
                    RecallsCount.objects.bulk_update(count_to_update,
                                                     ['recall_count', 'recall_category', 'recall_rate'])
            print("[RecallsUpdate] Created {} recalls count categories.".format(len(count_to_create)))
            print("[RecallsUpdate] Updated {} recalls count categories.".format(len(count_to_update)))

            ensure_connection()
