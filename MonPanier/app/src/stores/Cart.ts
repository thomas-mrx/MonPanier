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

  getProduct(id: string) {
    return JSON.parse(JSON.stringify(this.cart.products))
      .find((p : ProductSchema) => String(p.id) === id);
  },
};

export default new Store(STORE_NAME, STORE_DATA) as IStore<typeof STORE_DATA>;
