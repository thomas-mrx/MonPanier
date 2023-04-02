import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';
import Backend from './Backend';
import ProductModalStore from '../stores/ProductModal';

class Scanner {
  private readonly scanner: Html5Qrcode;

  private lastDecodedText: string | undefined;

  constructor() {
    this.scanner = new Html5Qrcode('reader');
  }

  public async start() {
    return new Promise((resolve) => {
      const state = this.scanner.getState();
      if (state === Html5QrcodeScannerState.SCANNING) {
        resolve(true);
        return;
      }
      this.scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 256, height: 128 },
        },
        this.onScanSuccess.bind(this),
        () => {},
      ).then(() => {
        resolve(true);
      }).catch((err) => {
        console.warn(`Unable to start scanning, error = ${err}`);
        resolve(false);
      });
    });
  }

  public stop() {
    const state = this.scanner.getState();
    if (state === Html5QrcodeScannerState.SCANNING) {
      this.scanner.stop();
    }
  }

  private onScanSuccess(decodedText: string) {
    this.lastDecodedText = decodedText;
    Backend.getProduct(decodedText, Backend.params).then((result) => {
      if (result.data) {
        ProductModalStore.update(result.data);
      }
    });
  }
}

export default new Scanner();
