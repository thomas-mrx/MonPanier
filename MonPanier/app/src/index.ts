import './style/style.scss';
import { Html5QrcodeScanner } from 'html5-qrcode';
import Alpine from 'alpinejs';
import Stats from './scripts/Stats';
import MonPanierAPI from './scripts/MonPanierAPI';

window.onload = async () => {
  import('./stores/AddCartModal'); // no need to store it into variable
  import('./stores/Cart'); // no need to store it into variable */
  import('./stores/SettingsModal'); // no need to store it into variable
  const MainStore = (await import('./stores/Main')).default;
  const RoutesStore = (await import('./stores/Routes')).default;
  const LoginModalStore = (await import('./stores/LoginModal')).default;
  const ProductModalStore = (await import('./stores/ProductModal')).default;
  Alpine.start();

  // update main store to detect scroll
  MainStore.scrollView.addEventListener('scroll', () => { MainStore.update(); });
  MainStore.scrollView.dispatchEvent(new Event('scroll'));
  // detect active tab to load data
  RoutesStore.detectActiveTab();

  MonPanierAPI.getApi().monPanierApiAuthApiMe(MonPanierAPI.getHeaders()).catch((error) => {
    if (error.status === 401) {
      LoginModalStore.toggle();
    }
  });

  const stats = new Stats();
  stats.getChartById('bref-chart').resize();

  function onScanSuccess(decodedText: any) {
    // handle the scanned code as you like, for example:
    MonPanierAPI.getApi().getProduct(decodedText, MonPanierAPI.getHeaders()).then((result) => {
      if (result.data) {
        ProductModalStore.update(result.data);
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
