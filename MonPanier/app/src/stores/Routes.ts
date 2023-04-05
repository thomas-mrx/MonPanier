import Store, { IStore } from '../scripts/Store';
import Backend from '../scripts/Backend';
import Cart from './Cart';
import Product from './Product';
import Scanner from '../scripts/Scanner';
import Dashboard from './Dashboard';
import Main from './Main';

interface Route {
  pattern: RegExp,
  args: { [key: string]: string },
  scrollTop?: number,
  scrollPersist?: boolean,
  onInit?: () => void,
}

interface Tab {
  icon: string,
  name: string,
  link: string,
  routes: Route[],
}

const STORE_NAME = 'routes';
const STORE_DATA: {
  tabs: Tab[],
  activeTab: number,
  activeRoute: number,
  init: () => void,
  loadRoute: (url: string, updateHistory?: boolean) => void,
} = {
  tabs: [
    {
      icon: 'fa-chart-line',
      name: 'Explorer',
      link: '/',
      routes: [{
        pattern: /^$|^\/$/,
        args: {},
        onInit() {
          Dashboard.updateStats();
        },
      }],
    },
    {
      icon: 'fa-shopping-cart',
      name: 'Mes paniers',
      link: '/carts',
      routes: [{
        pattern: /^\/carts$/,
        args: {},
        scrollPersist: true,
        onInit() {
          Backend.getCarts(Backend.params).then((result) => {
            if (result.data) {
              Cart.updateCarts(result.data);
            }
          });
        },
      },
      {
        pattern: /^\/carts\/(?<id>[0-9]+)$/,
        args: { id: '' },
        scrollPersist: true,
        onInit() {
          Backend.getCart(this.args.id, Backend.params).then((result) => {
            if (result.data) {
              Cart.updateCart(result.data);
            }
          });
        },
      },
      {
        pattern: /^\/carts\/(?<id>[0-9]+)\/(?<product>[0-9]+)$/,
        args: { id: '', product: '' },
        onInit() {
          if (!('cart' in Cart) || !('products' in Cart.cart)) {
            Backend.getCart(this.args.id, Backend.params).then((result) => {
              if (result.data) {
                Cart.updateCart(result.data);
                Product.updateProduct(Cart.getProduct(this.args.product));
              }
            });
          } else {
            Product.updateProduct(Cart.getProduct(this.args.product));
          }
        },
      }],
    },
    {
      icon: 'fa-barcode',
      name: 'Scan',
      link: '/scan',
      routes: [{
        pattern: /^\/scan$/,
        args: {},
        onInit() {
          if (Cart.carts.length === 0) {
            Backend.getCarts(Backend.params).then((result) => {
              if (result.data) {
                Cart.updateCarts(result.data);
              }
            });
          }
          Scanner.start().then((success) => {
            if (!success) {
              alert('Impossible de démarrer le scanner. Vérifiez que votre appareil est compatible et que vous autorisez l\'accès à la caméra.');
            }
          });
        },
      }],
    },
    {
      icon: 'fa-search',
      name: 'Recherche',
      link: '/search',
      routes: [{
        pattern: /^\/search$/,
        args: {},
        onInit() {
          if (Cart.carts.length === 0) {
            Backend.getCarts(Backend.params).then((result) => {
              if (result.data) {
                Cart.updateCarts(result.data);
              }
            });
          }

          setTimeout(() => {
            document.getElementById('default-search').focus();
          }, 100);
        },
      }],
    },
  ],
  activeTab: 0,
  activeRoute: 0,

  init() {
    if (!this.isInit) {
      this.isInit = true;
      window.addEventListener('popstate', () => {
        this.loadRoute(window.location.pathname, false);
      });
      this.loadRoute(window.location.pathname, false);
      Main.scrollView.addEventListener('scroll', () => {
        Main.update();
        if (this.tabs[this.activeTab].routes[this.activeRoute].scrollPersist) {
          this.tabs[this.activeTab].routes[this.activeRoute].scrollTop = Main.scrollView.scrollTop;
        }
      });
    }
  },

  loadRoute(url: string, updateHistory = true) {
    this.tabs.forEach((tab: Tab, index: number) => {
      tab.routes.forEach((route: Route, indexRoute: number) => {
        const match = route.pattern.exec(url);
        if (match) {
          this.activeTab = index;
          this.activeRoute = indexRoute;
          Object.keys(route.args).forEach((key) => {
            Object.assign(route.args, { [key]: match.groups?.[key] || '' });
          });
          route.onInit?.();
        }
      });
    });
    if (this.tabs[this.activeTab].routes[this.activeRoute].pattern.exec(url) === null) {
      this.loadRoute(this.tabs[0].link);
    }
    if (this.tabs[this.activeTab].link !== '/scan') {
      Scanner.stop();
    }
    if (updateHistory) {
      window.history.pushState({}, '', url);
    }
    setTimeout(() => {
      Main.scrollView.scrollTo({
        top: this.tabs[this.activeTab].routes[this.activeRoute].scrollPersist
          ? this.tabs[this.activeTab].routes[this.activeRoute].scrollTop : 0,
        left: 0,
        /* behavior: 'smooth', */
      });
    }, 50);
  },
};

export default new Store(STORE_NAME, STORE_DATA) as IStore<typeof STORE_DATA>;
