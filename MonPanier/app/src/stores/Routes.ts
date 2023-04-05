import Store, { IStore } from '../scripts/Store';
import Backend from '../scripts/Backend';
import Cart from './Cart';
import Product from './Product';
import Scanner from '../scripts/Scanner';
import Dashboard from './Dashboard';
import Main from './Main';

type Retry = boolean | undefined;
interface Route {
  pattern: RegExp,
  args: { [key: string]: string },
  scrollTop?: number,
  scrollPersist?: boolean,
  onInit?: () => Promise<Retry>,
  onDestroy?: () => void,
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
          return new Promise((resolve, reject) => {
            Backend.getStats(Backend.params).then((result) => {
              if (result.data) {
                Dashboard.stats = result.data;
                Dashboard.updateCharts();
                resolve(<Retry>false);
              } else {
                reject();
              }
            }).catch((err) => {
              if (err.status === 500) {
                resolve(<Retry>true);
              } else {
                resolve(<Retry>false);
              }
            });
          });
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
          return new Promise((resolve, reject) => {
            Backend.getCarts(Backend.params).then((result) => {
              if (result.data) {
                Cart.updateCarts(result.data);
                resolve(<Retry>false);
              } else {
                reject();
              }
            }).catch((err) => {
              if (err.status === 500) {
                resolve(<Retry>true);
              } else {
                resolve(<Retry>false);
              }
            });
          });
        },
      },
      {
        pattern: /^\/carts\/(?<id>[0-9]+)$/,
        args: { id: '' },
        scrollPersist: true,
        onInit() {
          return new Promise((resolve, reject) => {
            const cart = Cart.cartsExtended.length
              ? Cart.cartsExtended.find((c) => c.id === parseInt(this.args.id, 10)) : null;
            if (!cart) {
              Backend.getCart(this.args.id, Backend.params).then((result) => {
                if (result.data) {
                  Cart.updateCart(result.data);
                  resolve(<Retry>false);
                } else {
                  reject();
                }
              }).catch((err) => {
                if (err.status === 500) {
                  resolve(<Retry>true);
                } else {
                  resolve(<Retry>false);
                }
              });
            } else {
              Cart.updateCart(cart);
              resolve(<Retry>false);
            }
          });
        },
      },
      {
        pattern: /^\/carts\/(?<id>[0-9]+)\/(?<product>[0-9]+)$/,
        args: { id: '', product: '' },
        onInit() {
          return new Promise((resolve, reject) => {
            const cart = Cart.cartsExtended.length
              ? Cart.cartsExtended.find((c) => c.id === parseInt(this.args.id, 10)) : null;
            if (!cart) {
              Backend.getCart(this.args.id, Backend.params).then((result) => {
                if (result.data) {
                  Cart.updateCart(result.data);
                  const product = Cart.productsExtended.length
                    ? Cart.productsExtended.find((p) => p.id === parseInt(this.args.product, 10))
                    : null;
                  if (!product) {
                    Backend.getProductById(this.args.product, Backend.params).then((r) => {
                      if (r.data) {
                        Product.updateProduct(r.data);
                        resolve(<Retry>false);
                      } else {
                        reject();
                      }
                    }).catch((err) => {
                      if (err.status === 500) {
                        resolve(<Retry>true);
                      } else {
                        resolve(<Retry>false);
                      }
                    });
                  } else {
                    Product.updateProduct(product);
                    resolve(<Retry>false);
                  }
                } else {
                  reject();
                }
              }).catch((err) => {
                if (err.status === 500) {
                  resolve(<Retry>true);
                } else {
                  resolve(<Retry>false);
                }
              });
            } else {
              Cart.updateCart(cart);
              const product = Cart.productsExtended.length
                ? Cart.productsExtended.find((p) => p.id === parseInt(this.args.product, 10))
                : null;
              if (!product) {
                Backend.getProductById(this.args.product, Backend.params).then((r) => {
                  if (r.data) {
                    Product.updateProduct(r.data);
                    resolve(<Retry>false);
                  } else {
                    reject();
                  }
                }).catch((err) => {
                  if (err.status === 500) {
                    resolve(<Retry>true);
                  } else {
                    resolve(<Retry>false);
                  }
                });
              } else {
                Product.updateProduct(product);
                resolve(<Retry>false);
              }
            }
          });
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
          return new Promise((resolve, reject) => {
            if (Cart.carts.length === 0) {
              Backend.getCarts(Backend.params).then((result) => {
                if (result.data) {
                  Cart.updateCarts(result.data);
                  Scanner.start().then((success) => {
                    if (!success) {
                      alert('Impossible de démarrer le scanner. Vérifiez que votre appareil est compatible et que vous autorisez l\'accès à la caméra.');
                    }
                  });
                  resolve(<Retry>false);
                } else {
                  reject();
                }
              }).catch((err) => {
                if (err.status === 500) {
                  resolve(<Retry>true);
                } else {
                  resolve(<Retry>false);
                }
              });
            } else {
              Scanner.start().then((success) => {
                if (!success) {
                  alert('Impossible de démarrer le scanner. Vérifiez que votre appareil est compatible et que vous autorisez l\'accès à la caméra.');
                }
              });
              resolve(<Retry>false);
            }
          });
        },
        onDestroy() {
          Scanner.stop();
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
          setTimeout(() => {
            document.getElementById('default-search').focus();
          }, 100);
          return new Promise((resolve, reject) => {
            if (Cart.carts.length === 0) {
              Backend.getCarts(Backend.params).then((result) => {
                if (result.data) {
                  Cart.updateCarts(result.data);
                  resolve(<Retry>false);
                } else {
                  reject();
                }
              }).catch((err) => {
                if (err.status === 500) {
                  resolve(<Retry>true);
                } else {
                  resolve(<Retry>false);
                }
              });
            } else {
              resolve(<Retry>false);
            }
          });
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

  async loadRoute(url: string, updateHistory = true) {
    let activeTab = 0;
    let activeRoute = 0;
    this.tabs.forEach((tab: Tab, index: number) => {
      tab.routes.forEach((route: Route, indexRoute: number) => {
        const match = route.pattern.exec(url);
        if (match) {
          activeTab = index;
          activeRoute = indexRoute;
          Object.keys(route.args).forEach((key) => {
            Object.assign(route.args, { [key]: match.groups?.[key] || '' });
          });
        }
      });
    });
    let succeeded: boolean = false;
    const initRoute = async (maxRetry: number = 10, sleep: number = 250) => {
      if (maxRetry > 0) {
        if ('onInit' in this.tabs[activeTab].routes[activeRoute] && typeof this.tabs[activeTab].routes[activeRoute].onInit === 'function') {
          try {
            const needsRestart: Retry = await this.tabs[activeTab].routes[activeRoute].onInit();
            if (needsRestart) {
              await new Promise((resolve) => {
                setTimeout(resolve, sleep);
              });
              await initRoute(maxRetry - 1);
            } else {
              succeeded = true;
            }
          } catch (error) {
            alert('Une erreur inattendue est survenue lors du chargement de la page. Veuillez réessayer.');
            succeeded = false;
          }
        } else {
          succeeded = true;
        }
      } else {
        alert('Une erreur inattendue est survenue lors du chargement de la page. Veuillez réessayer.');
        succeeded = false;
      }
    };
    document.body.classList.add('loading');
    await initRoute();
    if (!succeeded) {
      document.body.classList.remove('loading');
      return;
    }
    if (this.activeTab !== activeTab || this.activeRoute !== activeRoute) {
      this.tabs[this.activeTab].routes[this.activeRoute].onDestroy?.();
      const currentRoute = this.tabs[this.activeTab].routes[this.activeRoute];
      const nextRoute = this.tabs[activeTab].routes[activeRoute];
      // quick fix to reinit the scroll when switching from carts to cart details
      // --> can't use onInit because needed when coming back from product details
      if (currentRoute.scrollPersist
          && Object.keys(currentRoute.args).length === 0 && nextRoute.scrollPersist) {
        nextRoute.scrollTop = 0;
      }
    }
    this.activeTab = activeTab;
    this.activeRoute = activeRoute;
    if (updateHistory) {
      window.history.pushState({}, '', url);
    }
    setTimeout(() => {
      Main.scrollView.scrollTo({
        top: this.tabs[this.activeTab].routes[this.activeRoute].scrollPersist
          ? this.tabs[this.activeTab].routes[this.activeRoute].scrollTop : 0,
        left: 0,
      });
      document.body.classList.remove('loading');
    }, 0);
  },
};

export default new Store(STORE_NAME, STORE_DATA) as IStore<typeof STORE_DATA>;
