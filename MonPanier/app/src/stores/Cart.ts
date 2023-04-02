import Store from '../scripts/Store';
import { CartSchema } from '../api';

const STORE_NAME = 'cart';
const STORE_DATA: {
  carts: CartSchema[],
  cart: CartSchema,
  updateCarts: (carts: CartSchema[]) => void,
  updateCart: (cart: CartSchema) => void,
  prepend: (cart: CartSchema) => void,
  countProducts: () => number
} = {
  carts: [] as CartSchema[],
  cart: {} as CartSchema,

  updateCarts(carts: CartSchema[]) {
    this.carts = carts;
  },

  prepend(cart: CartSchema) {
    this.carts.unshift(cart);
  },

  updateCart(cart: CartSchema) {
    this.cart = cart;
  },

  countProducts() {
    return (this.cart.products as []).length;
  },
};

export default new Store(STORE_NAME, STORE_DATA) as unknown as typeof STORE_DATA;
