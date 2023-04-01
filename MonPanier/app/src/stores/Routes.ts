import Store from '../scripts/Store';
import MonPanierAPI from '../scripts/MonPanierAPI';
import Cart from './Cart';

interface Tab {
  id: number,
  icon: string,
  name: string,
  link: string,
  onInit?: () => void,
}

const STORE_NAME = 'routes';
const STORE_DATA: {
  tabs: {
    [key: number]: Tab
  },
  activeTab: number,
  setActiveTab: (id: number) => void,
  detectActiveTab: () => void,
} = {
  tabs: {
    0: {
      id: 0,
      icon: 'fa-chart-line',
      name: 'Explorer',
      link: '/',
    },
    1: {
      id: 1,
      icon: 'fa-shopping-cart',
      name: 'Panier',
      link: '/carts',
      onInit: () => {
        MonPanierAPI.getApi().getCarts(MonPanierAPI.getHeaders()).then((result) => {
          if (result.data) {
            Cart.data().update(result.data);
          }
        });
      },
    },
    2: {
      id: 2,
      icon: 'fa-barcode',
      name: 'Scan',
      link: '/scan',
    },
    3: {
      id: 3,
      icon: 'fa-search',
      name: 'Recherche',
      link: '/search',
      onInit: () => {
        setTimeout(() => {
          document.getElementById('search').focus();
        }, 100);
      },
    },
  },
  activeTab: 0,

  setActiveTab(id: number) {
    this.activeTab = id;
    this.tabs[id].onInit?.();
    window.history.replaceState({}, '', this.tabs[id].link);
  },

  detectActiveTab() {
    const url = window.location.pathname;
    const tabFound = Object.values(this.tabs).find((tab:Tab) => tab.link === url) as Tab;
    if (tabFound && tabFound.id) {
      this.activeTab = tabFound.id;
      tabFound.onInit?.();
    }
  },
};

class Routes extends Store {
  constructor() {
    super(STORE_NAME, STORE_DATA);
  }

  public data(): typeof STORE_DATA {
    return super.data();
  }
}
export default new Routes();
