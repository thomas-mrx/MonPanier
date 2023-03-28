import gzip
import json
import os
import shutil
import time
from urllib.request import urlopen

from django.db import connection
from django_cron import CronJobBase, Schedule

from MonPanier.api.foods.models import Food


def to_list(line):
    return line.rstrip().decode("utf-8").split('\t')


class FoodsUpdate(CronJobBase):
    schedule = Schedule(run_every_mins=60 * 24)
    code = 'MonPanier.FoodsUpdate'

    def do(self):
        print("[FoodsUpdate] Starting cron job...")
        url = 'https://static.openfoodfacts.org/data/en.openfoodfacts.org.products.csv.gz'
        file_name = '.cron.openfoodfacts.csv.gz'
        current_time = time.time()
        try:
            last_edit_date = os.path.getmtime(file_name)
            file_size = os.path.getsize(file_name)
        except FileNotFoundError:
            last_edit_date = 0
            file_size = 0
        if current_time - last_edit_date >= 60 * 60 * 24 or file_size == 0:
            with urlopen(url) as response, open(file_name, 'wb+') as csv_file:
                print("[FoodsUpdate] Downloading file...")
                shutil.copyfileobj(response, csv_file)
        else:
            print("[FoodsUpdate] Using cached file...")
        with gzip.open(file_name, 'rb') as f:
            print("[FoodsUpdate] Loading file...")
            codes = list(Food.objects.values_list('code', flat=True))
            last_modified = list(Food.objects.values_list('last_modified_t', flat=True))
            codes_temp = []
            header = to_list(f.readline())
            fields = filter(lambda field: field != "code", header)
            for i, h in enumerate(header):
                if h.find('-') != -1:
                    header[i] = h.replace('-', '_')
            foods_to_create = []
            foods_to_update = []
            index_countries_en = header.index('countries_en')
            index_countries = header.index('countries')
            index_countries_tags = header.index('countries_tags')
            for i, line in enumerate(f):
                list_data = to_list(line)

                if 'France' in list_data[index_countries_en] or 'en:france' in list_data[index_countries_tags] \
                        or 'France' in list_data[index_countries] or 'en:fr' in list_data[index_countries]:
                    data = {}
                    for j, key in enumerate(header):
                        data[key] = list_data[j] if j < len(list_data) else ''
                    try:
                        index = codes.index(data['code'])
                    except ValueError:
                        index = None
                    if index is not None:
                        if data['last_modified_t'] > last_modified[index]:
                            foods_to_update.append(Food(**data))
                    else:
                        if data['code'] in codes_temp:
                            for j, food in enumerate(foods_to_create):
                                if food.code == data['code']:
                                    foods_to_create[j] = Food(**data)
                                    break
                        else:
                            codes_temp.append(data['code'])
                            foods_to_create.append(Food(**data))

                    if len(foods_to_create) >= 25000:
                        Food.objects.bulk_create(foods_to_create)
                        for code in codes_temp:
                            codes.append(code)
                        codes_temp = []
                        foods_to_create = []
                    if len(foods_to_update) >= 5000:
                        Food.objects.bulk_update(foods_to_update, fields)
                        foods_to_update = []
            if foods_to_create:
                Food.objects.bulk_create(foods_to_create)
            if foods_to_update:
                Food.objects.bulk_update(foods_to_update, fields)