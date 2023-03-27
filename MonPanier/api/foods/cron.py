import gzip
import json
import os
import shutil
import time
from urllib.request import urlopen

from django_cron import CronJobBase, Schedule

from MonPanier.api.foods.models import Food


def to_list(line):
    return line.rstrip().decode("utf-8").split('\t')


class FoodsUpdate(CronJobBase):
    schedule = Schedule(run_every_mins=60 * 24)
    code = 'MonPanier.FoodsUpdate'
    ALLOW_PARALLEL_RUNS = True

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
            header = to_list(f.readline())
            for i, h in enumerate(header):
                if h.find('-') != -1:
                    header[i] = h.replace('-', '_')
            for i, line in enumerate(f):
                list_data = to_list(line)

                data = {}
                for j, key in enumerate(header):
                    data[key] = list_data[j] if j < len(list_data) else ''

                f = Food(**data)
                f.save()