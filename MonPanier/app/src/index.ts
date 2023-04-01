import './style/style.scss';
import Alpine from 'alpinejs';
import { Html5QrcodeScanner } from 'html5-qrcode';
import Stats from './scripts/Stats';
import {
  Api, CartSchema, CreateCartSchema, FoodSchema, ProductSchema,
} from './api';

function getCookie(name: string) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (`${name}=`)) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function getHeaders() {
  const csrftoken = getCookie('csrftoken');
  const authHeaders = { 'X-CSRFToken': csrftoken };
  return { headers: authHeaders };
}

window.onload = async () => {
  const stats = new Stats();
  stats.getChartById('bref-chart').resize();
  // @ts-ignore
  window.Alpine = Alpine;
  const MonPanier = new Api();
  const ScrollView: HTMLElement = document.querySelector('.scrollview');

  Alpine.store('main', {
    scrolled: ScrollView.scrollTop > 24,

    update() {
      this.scrolled = ScrollView.scrollTop > 24;
    },
  });
  ScrollView.addEventListener('scroll', () => {
    // @ts-ignore
    Alpine.store('main').update();
  });

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
      MonPanier.api.createCart(this.cart, getHeaders()).then((result) => {
        if (result.data) {
          // @ts-ignore
          Alpine.store('cart').prepend(result.data);
          this.toggle();
          this.cart = {};
          (document.querySelector('input.cart-input') as HTMLInputElement).value = '';
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

    prepend(cart: CartSchema) {
      this.carts.unshift(cart);
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

    logout() {
      MonPanier.api.monPanierApiAuthApiLogout(getHeaders()).then((result) => {
        if (result.status === 204) {
          window.location.reload();
        }
      });
    },
  });

  // Login modal component
  Alpine.store('loginModal', {
    on: false,
    username: undefined,
    password: undefined,
    password_confirm: undefined,
    email: undefined,
    signin: true,
    signup: false,

    toggle() {
      this.on = !this.on;
    },

    login() {
      MonPanier.api.monPanierApiAuthApiLogin({
        username: this.username,
        password: this.password,
      }, getHeaders()).then((result) => {
        if (result.status === 200 && result.data) {
          this.toggle();
          // @ts-ignore
          Alpine.store('routes').detectActiveTab();
        }
      }).catch((error) => {
        if (error.status === 403) {
          alert('Compte non-activé ou mauvais identifiants.');
          this.username = undefined;
          this.password = undefined;
        }
      });
    },

    register() {
      MonPanier.api.monPanierApiAuthApiRegister({
        username: this.username,
        password1: this.password,
        password2: this.password_confirm,
        email: this.email,
      }, getHeaders()).then((result) => {
        if (result.status === 201 && result.data) {
          alert('Compte créé, vérifiez vos emails pour l\'activer.');
        }
      }).catch((error) => {
        alert('Erreur lors de la création du compte.');
        console.log(error);
      });
    },
  });

  // Search component
  Alpine.store('search', {
    text: undefined,
    foods: [] as FoodSchema[],
    isLoading: false,
    noResults: false,
    offset: 0,

    search() {
      this.isLoading = true;
      MonPanier.api.searchFoods({ query: this.text, offset: 0 }, getHeaders())
        .then((result) => {
          if (result.data) {
            this.isLoading = false;
            this.noResults = result.data.length === 0;
            this.foods = result.data;
            this.offset = result.data.length;
          }
        });
    },

    loadMore() {
      this.isLoading = true;
      MonPanier.api.searchFoods({ query: this.text, offset: this.offset }, getHeaders())
        .then((result) => {
          if (result.data) {
            this.isLoading = false;
            this.foods = this.foods.concat(result.data);
            this.offset += result.data.length;
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
          MonPanier.api.getCarts(getHeaders()).then((result) => {
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
          // setTimeout(() => {
          //   document.getElementById('search').focus();
          // }, 100);
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
  MonPanier.api.monPanierApiAuthApiMe(getHeaders()).then((result) => {
    console.log(result);
  }).catch((error) => {
    if (error.status === 401) {
      // @ts-ignore
      Alpine.store('loginModal').toggle();
    }
  });

  function onScanSuccess(decodedText: any) {
    // handle the scanned code as you like, for example:
    MonPanier.api.getProduct(decodedText, getHeaders()).then((result) => {
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
