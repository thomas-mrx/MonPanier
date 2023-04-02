import { Html5QrcodeScanner } from 'html5-qrcode';
import Backend from './Backend';
import ProductModalStore from '../stores/ProductModal';

class Scanner {
  private readonly html5QrcodeScanner: Html5QrcodeScanner;

  private lastDecodedText: string | undefined;

  constructor() {
    this.html5QrcodeScanner = new Html5QrcodeScanner(
      'reader',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false,
    );
    this.html5QrcodeScanner.render(this.onScanSuccess.bind(this), this.onScanFailure.bind(this));
  }

  private onScanSuccess(decodedText: string) {
    this.lastDecodedText = decodedText;
    // handle the scanned code as you like, for example:
    Backend.getProduct(decodedText, Backend.headers).then((result) => {
      if (result.data) {
        ProductModalStore.update(result.data);
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private onScanFailure(error: any) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    // eslint-disable-next-line no-console
    console.warn(`Code scan error = ${error}`);
  }
}

export default new Scanner();
