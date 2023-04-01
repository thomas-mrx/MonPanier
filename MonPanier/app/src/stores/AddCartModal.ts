import Store from '../scripts/Store';
import { CreateCartSchema } from '../api';
import MonPanierAPI from '../scripts/MonPanierAPI';
import cartStore from './Cart';

const STORE_NAME = 'addCartModal';
const STORE_DATA: {
  on: boolean,
  text: string | undefined,
  cart: CreateCartSchema,
  toggle: () => void,
  createCart: () => void,
} = {
  on: false,
  text: undefined,
  cart: {} as CreateCartSchema,

  toggle() {
    this.on = !this.on;
  },

  async createCart() {
    this.cart.name = this.text;
    MonPanierAPI.getApi().createCart(this.cart, MonPanierAPI.getHeaders()).then((result) => {
      if (result.data) {
        cartStore.prepend(result.data);
        this.toggle();
        this.cart = {};
        this.text = undefined;
      }
    }).catch((error) => {
      console.log(error);
    });
  },
};
export default new Store(STORE_NAME, STORE_DATA) as unknown as typeof STORE_DATA;
