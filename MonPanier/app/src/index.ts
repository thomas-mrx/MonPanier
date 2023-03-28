import './style/style.scss';
import Alpine from 'alpinejs';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Api, ProductSchema } from './api';

window.onload = async () => {
  // @ts-ignore
  window.Alpine = Alpine;
  Alpine.store('productModal', {
    on: true,
    text: 'Hello world',
    product: {} as ProductSchema,

    toggle() {
      this.on = !this.on;
    },

    update(product: ProductSchema) {
      this.product = product;
      this.on = true;
    },
  });
  Alpine.start();

  const MonPanier = new Api();
  function onScanSuccess(decodedText: any) {
    // handle the scanned code as you like, for example:
    MonPanier.api.getProduct(decodedText).then((result) => {
      if (result.data) {
        // @ts-ignore
        Alpine.store('productModal').update(result.data);
      }
    });
  }

  function onScanFailure(error: any) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
  }

  const html5QrcodeScanner = new Html5QrcodeScanner(
    'reader',
    { fps: 10, qrbox: { width: 250, height: 250 } },
    /* verbose= */ false,
  );
  html5QrcodeScanner.render(onScanSuccess, onScanFailure);
};
