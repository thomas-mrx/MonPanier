import json
import os
import re
import shutil
import time
from urllib.request import urlopen

from django_cron import CronJobBase, Schedule

from MonPanier.api.foods.models import Food
from MonPanier.api.recalls.models import Recall
from MonPanier.api.recallsCounts.models import RecallsCount


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
            count_to_create = []
            count_to_update = []
            recalls_count = RecallsCount.objects.values_list('category','recall_count', 'recall_category')
            count_dict = {}
            count_dict_temp = {}
            for c in recalls_count:
                count_dict[c[0]] = [c[1], c[2]]
            has_count_updated = False
            counter_created = 0
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

                try:
                    food = Food.objects.get(code=r.ean)
                except Food.DoesNotExist:
                    continue

                categories = [c.strip() for c in food.categories_tags.split(',')] if food.categories_tags is not None and food.categories_tags != '' else []
                for c in categories:
                    count_cat = count_dict.get(c, None)
                    if count_cat is None:
                        count_cat_temp = count_dict_temp.get(c, None)
                        if count_cat_temp is None:
                            count_dict_temp[c] = [1, [r.sous_categorie_de_produit]]
                        else:
                            count_dict_temp[c][0] = count_cat_temp[0] + 1
                            if r.sous_categorie_de_produit not in count_cat_temp[1]:
                                count_dict_temp[c][1] = count_cat_temp[1] + [r.sous_categorie_de_produit]
                    else:
                        has_count_updated = True
                        count_dict[c][0] = count_cat[0] + 1
                        if r.sous_categorie_de_produit not in count_cat[1]:
                            count_dict[c][1] = count_cat[1] + [r.sous_categorie_de_produit]

                recalls_to_create.append(r)

                if len(recalls_to_create) >= 5000:
                    Recall.objects.bulk_create(recalls_to_create)
                    counter_created += len(recalls_to_create)
                    recalls_to_create = []

            print("[RecallsUpdate] Updating recalls count...")
            if count_dict_temp:
                for cat, cnt in count_dict_temp.items():
                    count_to_create.append(RecallsCount(category=cat, recall_count=cnt[0], recall_category=cnt[1]))
                if count_to_create:
                    RecallsCount.objects.bulk_create(count_to_create)
            if count_dict and has_count_updated:
                for cat, cnt in count_dict.items():
                    count_to_update.append(RecallsCount(category=cat, recall_count=cnt[0], recall_category=cnt[1]))
                if count_to_update:
                    RecallsCount.objects.bulk_update(count_to_update, ['recall_count', 'recall_category'])
            print("[RecallsUpdate] Created {} recalls count categories.".format(len(count_to_create)))
            print("[RecallsUpdate] Updated {} recalls count categories.".format(len(count_to_update)))

            if recalls_to_create:
                Recall.objects.bulk_create(recalls_to_create)
                counter_created += len(recalls_to_create)
            print("[RecallsUpdate] Created {} recalls.".format(counter_created))
