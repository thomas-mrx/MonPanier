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
            codes = list(Food.objects.values_list('code', flat=True))
            codes_dict = {}
            for i, code in enumerate(codes):
                codes_dict[code] = i
            codes_dict_temp = {}
            last_modified = list(Food.objects.values_list('last_modified_t', flat=True))
            header = to_list(f.readline())
            fields = filter(lambda field: field != "code", header)
            for i, h in enumerate(header):
                if h.find('-') != -1:
                    header[i] = h.replace('-', '_')
            foods_to_create = []
            foods_to_update = []
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
                    index = codes_dict.get(list_data[index_code], None)
                    if index is None:
                        data = {}
                        for j, key in enumerate(header):
                            data[key] = list_data[j] if j < len(list_data) else ''

                        old_index = codes_dict_temp.get(list_data[index_code], None)
                        if old_index:
                            if last_modified[old_index] < list_data[index_last_modified_t]:
                                foods_to_create[old_index] = Food(**data)
                        else:
                            codes_dict_temp[list_data[index_code]] = len(foods_to_create)
                            foods_to_create.append(Food(**data))
                    elif list_data[index_last_modified_t] > last_modified[index]:
                        data = {}
                        for j, key in enumerate(header):
                            data[key] = list_data[j] if j < len(list_data) else ''

                        foods_to_update.append(Food(**data))

                    if len(foods_to_create) >= 25000:
                        ensure_connection()
                        Food.objects.bulk_create(foods_to_create)
                        counter_created += len(foods_to_create)
                        j = 0
                        for code in codes_dict_temp.keys():
                            codes_dict[code] = len(last_modified)
                            last_modified.append(foods_to_create[j].last_modified_t)
                            j += 1
                        codes_dict_temp = {}
                        foods_to_create = []
                        print("[FoodsUpdate] Created 25000 foods.")
                    if len(foods_to_update) >= 5000:
                        ensure_connection()
                        Food.objects.bulk_update(foods_to_update, fields)
                        counter_updated += len(foods_to_update)
                        foods_to_update = []
                        print("[FoodsUpdate] Updated 5000 foods.")
                if i % 100000 == 0:
                    print("[FoodsUpdate] {} lines processed.".format(i))
            if foods_to_create:
                ensure_connection()
                Food.objects.bulk_create(foods_to_create)
                counter_created += len(foods_to_create)
                print("[FoodsUpdate] Created {} foods.".format(len(foods_to_create)))
            if foods_to_update:
                ensure_connection()
                Food.objects.bulk_update(foods_to_update, fields)
                counter_updated += len(foods_to_update)
                print("[FoodsUpdate] Updated {} foods.".format(len(foods_to_update)))
            print("[FoodsUpdate] Created {} foods TOTAL.".format(counter_created))
            print("[FoodsUpdate] Updated {} foods TOTAL.".format(counter_updated))