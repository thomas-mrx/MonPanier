import './style/style.scss';
import Alpine from 'alpinejs';

window.onload = async () => {
  await import('./stores/AddCartModal');
  await import('./stores/AddProductCartModal');
  await import('./stores/Cart');
  await import('./stores/SettingsModal');
  await import('./stores/ProductModal');
  await import('./stores/Search');
  await import('./stores/Dashboard');
  await import('./stores/Accordion');
  await import('./stores/Main');
  await import('./stores/RecallInfoModal');
  await import('./stores/DispensationInfoModal');
  const RoutesStore = (await import('./stores/Routes')).default;
  const LoginModalStore = (await import('./stores/LoginModal')).default;

  Alpine.start();

  RoutesStore.init();
  LoginModalStore.checkLogin();
};
