import './style/style.scss';
import { Html5QrcodeScanner } from 'html5-qrcode';
import Alpine from 'alpinejs';
import Stats from './scripts/Stats';
import type Store from './scripts/Store';
import MainStore from './stores/Main';
import AddCartModalStore from './stores/AddCartModal';
import CartStore from './stores/Cart';
import LoginModalStore from './stores/LoginModal';
import ProductModalStore from './stores/ProductModal';
import SettingsModalStore from './stores/SettingsModal';
import RoutesStore from './stores/Routes';
import MonPanierAPI from './scripts/MonPanierAPI';

window.onload = async () => {
  const stats = new Stats();
  stats.getChartById('bref-chart').resize();

  const stores: Store[] = [
    MainStore,
    AddCartModalStore,
    CartStore,
    LoginModalStore,
    ProductModalStore,
    SettingsModalStore,
    RoutesStore,
  ];
  // eslint-disable-next-line no-console
  console.log('Starting stores...', stores.map((store) => store.name()));

  // update main store to detect scroll
  MainStore.data().update();

  // detect active tab to load data
  RoutesStore.data().detectActiveTab();

  // Authentication
  MonPanierAPI.getApi().monPanierApiAuthApiMe(MonPanierAPI.getHeaders())
    .then(
      (result) => {
        // eslint-disable-next-line no-console
        console.log(result);
      },
    ).catch((error) => {
      if (error.status === 401) {
        LoginModalStore.data().toggle();
      }
    });

  Alpine.start();

  function onScanSuccess(decodedText: any) {
    // handle the scanned code as you like, for example:
    MonPanierAPI.getApi().getProduct(decodedText, MonPanierAPI.getHeaders()).then((result) => {
      if (result.data) {
        ProductModalStore.data().update(result.data);
      }
    });
  }

  function onScanFailure(error: any) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    // eslint-disable-next-line no-console
    console.warn(`Code scan error = ${error}`);
  }

  const html5QrcodeScanner = new Html5QrcodeScanner(
    'reader',
    { fps: 10, qrbox: { width: 250, height: 250 } },
    /* verbose= */ false,
  );
  html5QrcodeScanner.render(onScanSuccess, onScanFailure);
};
