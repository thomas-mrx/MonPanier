import './style/style.scss';
import Alpine from 'alpinejs';
import { Html5QrcodeScanner } from 'html5-qrcode';
import {
  Api, CartSchema, CreateCartSchema, ProductSchema,
} from './api';

function getCookie(name: string): string | null {
  const nameLenPlus = (name.length + 1);
  return document.cookie
    .split(';')
    .map((c) => c.trim())
    .filter((cookie) => cookie.substring(0, nameLenPlus) === `${name}=`)
    .map((cookie) => decodeURIComponent(cookie.substring(nameLenPlus)))[0] || null;
}

window.onload = async () => {
  // @ts-ignore
  window.Alpine = Alpine;
  const MonPanier = new Api();
  const csrftoken = getCookie('csrftoken');
  const authHeaders = { 'X-CSRFToken': csrftoken };
  const params = { headers: authHeaders };

  // Add cart modal component
  Alpine.store('addCartModal', {
    on: false,
    text: undefined,
    cart: {} as CreateCartSchema,

    toggle() {
      this.on = !this.on;
    },

    createCart() {
      this.cart.name = this.text;
      MonPanier.api.createCart(this.cart, params).then((result) => {
        if (result.data) {
          // @ts-ignore
          Alpine.store('cart').push(result.data);
          this.toggle();
          this.cart = {};
        }
      });
    },

  });

  // Cart component
  Alpine.store('cart', {
    carts: [] as CartSchema[],

    update(carts: CartSchema[]) {
      this.carts = carts;
    },

    push(cart: CartSchema) {
      this.carts.push(cart);
    },
  });

  // Product modal component
  Alpine.store('productModal', {
    on: true,
    text: 'Hello world',
    product: {} as ProductSchema,

    toggle() {
      this.on = !this.on;
    },

    update(product: ProductSchema) {
      this.product = product;
      this.on = true;
    },
  });

  // Settings modal component
  Alpine.store('settingsModal', {
    on: false,
    text: 'Paramètres',

    toggle() {
      this.on = !this.on;
    },
  });

  // Login modal component
  Alpine.store('loginModal', {
    on: false,
    username: undefined,
    password: undefined,

    toggle() {
      this.on = !this.on;
    },

    login() {
      MonPanier.api.monPanierApiAuthApiLogin({
        username: this.username,
        password: this.password,
      }, params).then((result) => {
        if (result.status === 200 && result.data) {
          this.toggle();
        }
      }).catch((error) => {
        if (error.status === 403) {
          alert('Mauvais identifiants');
          this.username = undefined;
          this.password = undefined;
        }
      });
    },
  });

  // SPA Router
  Alpine.store('routes', {
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
          // @ts-ignore
          MonPanier.api.getCarts(params).then((result) => {
            if (result.data) {
              // @ts-ignore
              Alpine.store('cart').update(result.data);
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
    // @ts-ignore
    activeTab: 0,

    setActiveTab(id: number) {
      this.activeTab = id;
      this.tabs[id].onInit?.();
      // eslint-disable-next-line no-restricted-globals
      window.history.replaceState({}, '', this.tabs[id].link);
    },

    detectActiveTab() {
      const url = window.location.pathname;
      // @ts-ignore
      const tabFound = Object.values(this.tabs).find((tab) => tab.link === url);
      // @ts-ignore
      if (tabFound && tabFound.id) {
        // @ts-ignore
        this.activeTab = tabFound.id;
        // @ts-ignore
        tabFound.onInit?.();
      }
    },
  });

  Alpine.start();

  // @ts-ignore
  Alpine.store('routes').detectActiveTab();

  // Authentication
  MonPanier.api.monPanierApiAuthApiMe(params).then((result) => {
    console.log(result);
  }).catch((error) => {
    if (error.status === 401) {
      // @ts-ignore
      Alpine.store('loginModal').toggle();
    }
  });

  function onScanSuccess(decodedText: any) {
    // handle the scanned code as you like, for example:
    MonPanier.api.getProduct(decodedText, params).then((result) => {
      if (result.data) {
        // @ts-ignore
        Alpine.store('productModal').update(result.data);
      }
    });
  }

  function onScanFailure(error: any) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
  }

  const html5QrcodeScanner = new Html5QrcodeScanner(
    'reader',
    { fps: 10, qrbox: { width: 250, height: 250 } },
    /* verbose= */ false,
  );
  html5QrcodeScanner.render(onScanSuccess, onScanFailure);
};
