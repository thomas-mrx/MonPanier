import Store, { IStore } from '../scripts/Store';
import { CartSchema, CartSchemaExtended, ProductSchema } from '../api';

const STORE_NAME = 'cart';
const STORE_DATA: {
  carts: CartSchema[],
  cartsExtended: CartSchemaExtended[],
  cart: CartSchemaExtended,
  updateCarts: (carts: CartSchema[]) => void,
  updateCart: (cart: CartSchemaExtended) => void,
  prepend: (cart: CartSchema) => void,
  products: ProductSchema[],
  productsExtended: ProductSchema[],
  getProduct: (id: string) => ProductSchema | undefined,
} = {
  carts: [] as CartSchema[],
  cartsExtended: [] as CartSchemaExtended[],
  cart: {} as CartSchemaExtended,
  products: [] as ProductSchema[],
  productsExtended: [] as ProductSchema[],

  updateCarts(carts: CartSchema[]) {
    this.carts = carts;
  },

  prepend(cart: CartSchema) {
    this.carts.unshift(cart);
  },

  updateCart(cart: CartSchemaExtended) {
    if (!this.cartsExtended.find((c: CartSchemaExtended) => c.id === cart.id)) {
      this.cartsExtended.push(cart);
    }
    this.cart = cart;
    this.products = cart.products;
  },

  getProduct(id: string) {
    return JSON.parse(JSON.stringify(this.cart.products))
      .find((p : ProductSchema) => String(p.id) === id);
  },
};

export default new Store(STORE_NAME, STORE_DATA) as IStore<typeof STORE_DATA>;
