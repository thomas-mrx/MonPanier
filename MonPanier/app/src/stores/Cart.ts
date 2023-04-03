import * as moment from 'moment';
import Store, { IStore } from '../scripts/Store';
import { CartSchema, ProductSchema } from '../api';

const STORE_NAME = 'cart';
const STORE_DATA: {
  carts: CartSchema[],
  cart: CartSchema,
  updateCarts: (carts: CartSchema[]) => void,
  updateCart: (cart: CartSchema) => void,
  prepend: (cart: CartSchema) => void,
  products: ProductSchema[],
  getDate: (key: string, format: string, id?: string | undefined) => string,
  getGradeFromScore: (score: number) => string,
  getProduct: (id: string) => ProductSchema | undefined,
} = {
  carts: [] as CartSchema[],
  cart: {} as CartSchema,
  products: [] as ProductSchema[],

  updateCarts(carts: CartSchema[]) {
    this.carts = carts;
  },

  prepend(cart: CartSchema) {
    this.carts.unshift(cart);
  },

  updateCart(cart: CartSchema) {
    this.cart = cart;
    this.products = cart.products;
  },

  getDate(key: string, format: string, id: string | undefined = undefined) {
    let { cart } = this;
    if (id) {
      cart = this.carts[id];
    }
    if (!cart || !(key in cart)) {
      return '';
    }
    const date = moment(cart[key]);
    if (!date.isValid()) {
      return '';
    }
    return date.format(format);
  },

  getGradeFromScore(score: number) {
    const maxScore = 100;
    const grades = ['a', 'b', 'c', 'd', 'e'];
    const s = Math.min(score, maxScore);
    return s === 0 ? 'na' : grades[Math.floor(s / (maxScore / grades.length))];
  },

  getProduct(id: string) {
    return JSON.parse(JSON.stringify(this.cart.products))
      .find((p : ProductSchema) => String(p.id) === id);
  },
};

export default new Store(STORE_NAME, STORE_DATA) as IStore<typeof STORE_DATA>;
