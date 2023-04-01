import Store from '../scripts/Store';
import { CartSchema } from '../api';

const STORE_NAME = 'cart';
const STORE_DATA: {
  carts: CartSchema[],
  update: (carts: CartSchema[]) => void,
  prepend: (cart: CartSchema) => void,
} = {
  carts: [] as CartSchema[],

  update(carts: CartSchema[]) {
    this.carts = carts;
  },

  prepend(cart: CartSchema) {
    this.carts.unshift(cart);
  },
};

export default new Store(STORE_NAME, STORE_DATA) as unknown as typeof STORE_DATA;
