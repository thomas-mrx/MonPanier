import { Html5Qrcode, Html5QrcodeScannerState, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import Backend from './Backend';
import ProductModalStore from '../stores/ProductModal';
import { ProductSchema } from '../api';

class Scanner {
  private readonly scanner: Html5Qrcode;

  private lastDecodedText: string | undefined;

  private lastProduct: ProductSchema | undefined;

  private cameraId: string | undefined;

  private readonly beep: HTMLAudioElement;

  private audioContext: AudioContext;

  constructor() {
    this.scanner = new Html5Qrcode('reader', {
      experimentalFeatures: undefined,
      useBarCodeDetectorIfSupported: true,
      verbose: false,
      formatsToSupport: [
        Html5QrcodeSupportedFormats.EAN_13,
        Html5QrcodeSupportedFormats.EAN_8,
        Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
      ],
    });
    this.audioContext = new AudioContext();
    this.beep = new Audio('/static/beep.mp3');
    this.beep.preload = 'auto';
    const audioSource = this.audioContext.createMediaElementSource(this.beep);
    audioSource.connect(this.audioContext.destination);
  }

  public async start() {
    this.audioContext.resume();
    return new Promise((resolve) => {
      const state = this.scanner.getState();
      if (state === Html5QrcodeScannerState.SCANNING) {
        resolve(true);
        return;
      }
      Html5Qrcode.getCameras().then((devices) => {
        if (devices && devices.length) {
          alert(`debug purposes, will delete this alert later: ${JSON.stringify(devices)}`);
          this.cameraId = devices.length === 1 ? devices[0].id : devices[1].id;
          this.scanner.start(
            this.cameraId,
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
        }
      }).catch((err) => {
        console.warn(`Unable to query supported devices, error = ${err}`);
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
    this.audioContext.resume().then(() => {
      this.beep.currentTime = 0;
      this.beep.play();
    });
    if (this.lastDecodedText === decodedText && this.lastProduct) {
      ProductModalStore.update(this.lastProduct);
      return;
    }
    this.lastDecodedText = decodedText;
    Backend.getProduct(decodedText, Backend.params).then((result) => {
      if (result.data) {
        this.lastProduct = result.data;
        ProductModalStore.update(result.data);
      }
    });
  }
}

export default new Scanner();
