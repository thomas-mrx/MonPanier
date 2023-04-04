import {
  Barcode, BarcodePicker, configure, ScanSettings,
} from 'scandit-sdk';
import Backend from './Backend';
import ProductModalStore from '../stores/ProductModal';
import { FoodSchema } from '../api';

class Scanner {
  private lastProducts: { [code: string]: FoodSchema } = {};

  private picker: BarcodePicker | undefined = undefined;

  private ready: (value: (PromiseLike<unknown> | unknown)) => void;

  private isReady = new Promise((resolve) => {
    this.ready = resolve;
  });

  constructor() {
    configure(process.env.SCANDIT_LICENSE_KEY, {
      engineLocation: 'https://cdn.jsdelivr.net/npm/scandit-sdk/build',
    }).then(() => {
      this.ready(true);
    });
  }

  public async start() {
    await this.isReady;
    return new Promise((resolve) => {
      if (!this.picker) {
        BarcodePicker.create(document.getElementById('reader'), {
          playSoundOnScan: true,
          vibrateOnScan: true,
        }).then((barcodePicker) => {
          this.picker = barcodePicker;
          const scanSettings = new ScanSettings({
            enabledSymbologies: [
              Barcode.Symbology.EAN8,
              Barcode.Symbology.EAN13,
              Barcode.Symbology.UPCA,
              Barcode.Symbology.UPCE,
            ],
            codeDuplicateFilter: 1000,
          });
          this.picker.applyScanSettings(scanSettings);
          this.picker.setCameraSwitcherEnabled(false);
          this.picker.setTapToFocusEnabled(true);
          ProductModalStore.onOpen = this.pause.bind(this);
          ProductModalStore.onClose = this.resume.bind(this);
          this.picker.on('scan', (scanResult) => {
            if (this.picker.isScanningPaused()) return;
            this.pause();
            const barcode = scanResult.barcodes[0].data;
            if (barcode in this.lastProducts && this.lastProducts[barcode]) {
              ProductModalStore.update(this.lastProducts[barcode]);
              return;
            }
            Backend.getFoodByCode({ code: barcode }, Backend.params).then((result) => {
              if (result.data) {
                this.lastProducts[barcode] = result.data;
                ProductModalStore.update(result.data);
              }
            }).catch((error) => {
              console.error(error);
              this.resume();
            });
            /* Backend.getProduct(barcode, Backend.params).then((result) => {
              if (result.data) {
                this.lastProducts[barcode] = result.data;
                ProductModalStore.update(result.data);
              }
            }); */
          });
          resolve(true);
        }).catch((error) => {
          console.error(error);
          resolve(false);
        });
      } else {
        resolve(true);
      }
    });
  }

  public pause() {
    if (this.picker) {
      this.picker.pauseScanning();
    }
  }

  public resume() {
    if (this.picker && this.picker.isScanningPaused()) {
      this.picker.resumeScanning();
    }
  }

  public stop() {
    if (this.picker) {
      this.picker.destroy(true);
      this.picker = undefined;
    }
  }
}

export default new Scanner();
