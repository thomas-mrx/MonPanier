import './style/style.scss';
import Alpine from 'alpinejs';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Api, ProductSchema } from './api';

window.onload = async () => {
  // @ts-ignore
  window.Alpine = Alpine;

  // SPA Router
  Alpine.store('routes', {
    tabs: {
      0: {
        id: 0,
        icon: 'fa-chart-line',
        name: 'Dashboard',
        link: '/',
      },
      1: {
        id: 1,
        icon: 'fa-shopping-cart',
        name: 'Panier',
        link: '/carts',
      },
      2: {
        id: 2,
        icon: 'fa-barcode',
        name: 'Scan',
        link: '/scan',
      },
      3: {
        id: 3,
        icon: 'fa-cog',
        name: 'Paramètres',
        link: '/settings',
      },
    },
    // @ts-ignore
    activeTab: 0,

    setActiveTab(id: number) {
      this.activeTab = id;
      // eslint-disable-next-line no-restricted-globals
      window.history.replaceState({}, '', this.tabs[id].link);
    },

    detectActiveTab() {
      const url = window.location.pathname;
      // @ts-ignore
      const tabFound = Object.values(this.tabs).find((tab) => tab.link === url);
      // @ts-ignore
      if (tabFound.id) {
        // @ts-ignore
        this.activeTab = tabFound.id;
      }
    },
  });
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

  // @ts-ignore
  Alpine.store('routes').detectActiveTab();

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
