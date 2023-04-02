import Store from '../scripts/Store';
import Backend from '../scripts/Backend';
import Cart from './Cart';
import Stats from '../scripts/Stats';

interface Route {
  pattern: RegExp,
  args: { [key: string]: string },
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
          Stats.getChartById('bref-chart').resize();
        },
      }],
    },
    {
      icon: 'fa-shopping-cart',
      name: 'Panier',
      link: '/carts',
      routes: [{
        pattern: /^\/carts$/,
        args: {},
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
          console.log(this.args);
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
          setTimeout(() => {
            document.getElementById('default-search').focus();
          }, 100);
        },
      }],
    },
  ],
  activeTab: 0,
  activeRoute: 0,

  loadRoute(url: string, updateHistory = true) {
    this.tabs.forEach((tab: Tab, index: number) => {
      tab.routes.forEach((route: Route, indexRoute:number) => {
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
    if (updateHistory) {
      window.history.pushState({}, '', url);
    }
  },
};

export default new Store(STORE_NAME, STORE_DATA) as unknown as typeof STORE_DATA;
