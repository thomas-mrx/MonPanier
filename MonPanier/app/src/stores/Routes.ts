import Store from '../scripts/Store';
import Backend from '../scripts/Backend';
import Cart from './Cart';
import Stats from '../scripts/Stats';

interface Route {
  url: string,
  pattern: RegExp,
  args: { [key: string]: string },
  onInit?: () => void,
}
interface Tab {
  icon: string,
  name: string,
  link: string,
  routes: Route | Route[],
}
const STORE_NAME = 'routes';
const STORE_DATA: {
  tabs: Tab[],
  activeTab: number,
  loadRoute: (url: string) => void,
} = {
  tabs: [
    {
      icon: 'fa-chart-line',
      name: 'Explorer',
      link: '/',
      routes: {
        url: '/',
        pattern: /^$|^\/$/,
        args: {},
        onInit() {
          Stats.getChartById('bref-chart').resize();
        },
      },
    },
    {
      icon: 'fa-shopping-cart',
      name: 'Panier',
      link: '/carts',
      routes: [{
        url: '/carts',
        pattern: /^\/carts$/,
        args: {},
        onInit() {
          Backend.getCarts(Backend.headers).then((result) => {
            if (result.data) {
              Cart.update(result.data);
            }
          });
        },
      },
      {
        url: '/carts/:id',
        pattern: /^\/carts\/(?<id>[0-9]+)$/,
        args: { id: '' },
        onInit() {
          Backend.getCart(this.args.id, Backend.headers).then((result) => {
            if (result.data) {
              alert(`from API:${JSON.stringify(result.data)}`);
              console.log(result.data);
            }
          });
        },
      },
      {
        url: '/carts/:id/:product',
        pattern: /^\/carts\/(?<id>[0-9]+)\/(?<product>[0-9]+)$/,
        args: { id: '', product: '' },
        onInit() {
          console.log(this.args);
        },
      }],
    },
    {
      icon: 'fa-barcode',
      name: 'Scan',
      link: '/scan',
      routes: {
        url: '/scan',
        pattern: /^\/scan$/,
        args: {},
      },
    },
    {
      icon: 'fa-search',
      name: 'Recherche',
      link: '/search',
      routes: {
        url: '/search',
        pattern: /^\/search$/,
        args: {},
        onInit() {
          setTimeout(() => {
            document.getElementById('search').focus();
          }, 100);
        },
      },
    },
  ],
  activeTab: 0,

  loadRoute(url: string) {
    const matchAndLoad = (route: Route, tabIndex: number) => {
      const match = route.pattern.exec(url);
      if (match) {
        this.activeTab = tabIndex;
        Object.keys(route.args).forEach((key) => {
          Object.assign(route.args, { [key]: match.groups?.[key] || '' });
        });
        route.onInit?.();
      }
    };
    this.tabs.forEach((tab: Tab, index: number) => {
      if (Array.isArray(tab.routes)) {
        tab.routes.forEach((route: Route) => {
          matchAndLoad(route, index);
        });
      } else {
        matchAndLoad(tab.routes, index);
      }
    });
    window.history.replaceState({}, '', url);
  },
};

export default new Store(STORE_NAME, STORE_DATA) as unknown as typeof STORE_DATA;
