import './style/style.scss';
import Alpine from 'alpinejs';
import Scanner from './scripts/Scanner';

window.onload = async () => {
  await import('./stores/AddCartModal');
  await import('./stores/AddProductCartModal');
  await import('./stores/Cart');
  await import('./stores/SettingsModal');
  await import('./stores/ProductModal');
  await import('./stores/Search');
  await import('./stores/Dashboard');
  await import('./stores/Accordion');
  const MainStore = (await import('./stores/Main')).default;
  const RoutesStore = (await import('./stores/Routes')).default;
  const LoginModalStore = (await import('./stores/LoginModal')).default;

  Alpine.start();

  MainStore.initScroll();
  RoutesStore.init();
  LoginModalStore.checkLogin();

  // restart scanner when app goes back to foreground if we are on the scan page
  /* document.onvisibilitychange = () => {
    const state = document.visibilityState;
    if (state === 'visible' && RoutesStore.tabs[RoutesStore.activeTab].link === '/scan') {
      Scanner.start();
    }
  }; */
};
