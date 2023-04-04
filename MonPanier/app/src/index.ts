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
  const MainStore = (await import('./stores/Main')).default;
  const RoutesStore = (await import('./stores/Routes')).default;
  const LoginModalStore = (await import('./stores/LoginModal')).default;

  // FAQ accordion handler
  Alpine.store('accordion', {
    tab: 0,
  });

  Alpine.data('accordion', (idx) => ({
    init() {
      this.idx = idx;
    },
    idx: -1,
    handleClick() {
      this.$store.accordion.tab = this.$store.accordion.tab === this.idx ? 0 : this.idx;
    },
    handleRotate() {
      return this.$store.accordion.tab === this.idx ? 'rotate-180' : '';
    },
    handleToggle() {
      return this.$store.accordion.tab === this.idx ? `max-height: ${this.$refs.tab.scrollHeight}px; border-bottom-left-radius: 0.375rem;` : '';
    },
  }));
  Alpine.start();

  MainStore.initScroll();
  RoutesStore.loadRoute(window.location.pathname);
  LoginModalStore.checkLogin();

  window.screen.orientation.lock('portrait').then(() => {
    console.log('Orientation locked');
  }).catch((error) => {
    console.warn(error);
  });

  window.onpopstate = () => {
    RoutesStore.loadRoute(window.location.pathname, false);
  };

  // restart scanner when app goes back to foreground if we are on the scan page
  document.onvisibilitychange = () => {
    const state = document.visibilityState;
    if (state === 'visible' && RoutesStore.tabs[RoutesStore.activeTab].link === '/scan') {
      Scanner.start();
    }
  };
};
