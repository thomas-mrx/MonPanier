import gzip
import json
import os
import shutil
import time
from urllib.request import urlopen

from django.db import connection, OperationalError
from django_cron import CronJobBase, Schedule

from MonPanier.api.foods.models import Food


def to_list(line):
    return line.rstrip().decode("utf-8").split('\t')


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

class FoodsUpdate(CronJobBase):
    schedule = Schedule(run_at_times=['02:00'])
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
            existing_foods = Food.objects.values_list('code','last_modified_t')
            foods_dict = {}
            foods_dict_temp = {}
            for food in existing_foods:
                foods_dict[food[0]] = food[1]
            header = to_list(f.readline())
            fields = filter(lambda field: field != "code", header)
            for i, h in enumerate(header):
                if h.find('-') != -1:
                    header[i] = h.replace('-', '_')
            foods_to_create = {}
            foods_to_update = {}
            counter_created = 0
            counter_updated = 0
            index_countries_en = header.index('countries_en')
            index_countries = header.index('countries')
            index_countries_tags = header.index('countries_tags')
            index_code = header.index('code')
            index_last_modified_t = header.index('last_modified_t')
            for i, line in enumerate(f):
                list_data = to_list(line)

                if 'France' in list_data[index_countries_en] or 'en:france' in list_data[index_countries_tags] \
                        or 'France' in list_data[index_countries] or 'en:fr' in list_data[index_countries]:
                    last_modified_t = foods_dict.get(list_data[index_code], None)
                    if last_modified_t is None:
                        last_modified_t_temp = foods_dict_temp.get(list_data[index_code], None)
                        if last_modified_t_temp is None or last_modified_t_temp < list_data[index_last_modified_t]:
                            data = {}
                            for j, key in enumerate(header):
                                data[key] = list_data[j] if j < len(list_data) else ''

                            foods_to_create[list_data[index_code]] = Food(**data)
                            foods_dict_temp[list_data[index_code]] = list_data[index_last_modified_t]
                    elif last_modified_t < list_data[index_last_modified_t]:
                        data = {}
                        for j, key in enumerate(header):
                            data[key] = list_data[j] if j < len(list_data) else ''

                        foods_to_update[list_data[index_code]] = Food(**data)

                    if len(foods_to_create) >= 25000:
                        ensure_connection()
                        Food.objects.bulk_create(foods_to_create.values())
                        counter_created += len(foods_to_create)
                        foods_dict |= foods_dict_temp
                        foods_dict_temp = {}
                        foods_to_create = {}
                        print("[FoodsUpdate] Created 25000 foods.")
                    if len(foods_to_update) >= 5000:
                        ensure_connection()
                        Food.objects.bulk_update(foods_to_update.values(), fields)
                        counter_updated += len(foods_to_update)
                        foods_to_update = {}
                        print("[FoodsUpdate] Updated 5000 foods.")
                if i % 100000 == 0:
                    print("[FoodsUpdate] {} lines processed.".format(i))
            if foods_to_create:
                ensure_connection()
                Food.objects.bulk_create(foods_to_create.values())
                counter_created += len(foods_to_create)
                print("[FoodsUpdate] Created {} foods.".format(len(foods_to_create)))
            if foods_to_update:
                ensure_connection()
                Food.objects.bulk_update(foods_to_update.values(), fields)
                counter_updated += len(foods_to_update)
                print("[FoodsUpdate] Updated {} foods.".format(len(foods_to_update)))
            print("[FoodsUpdate] TOTAL: Created {} foods.".format(counter_created))
            print("[FoodsUpdate] TOTAL: Updated {} foods.".format(counter_updated))
            ensure_connection()