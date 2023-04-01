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
    const result = await MonPanierAPI.getApi().createCart(this.cart, MonPanierAPI.getHeaders());
    if (result.data) {
      cartStore.data().prepend(result.data);
      this.toggle();
      this.cart = {};
      this.text = undefined;
    }
  },
};
class AddCartModal extends Store {
  constructor() {
    super(STORE_NAME, STORE_DATA);
  }

  public data(): typeof STORE_DATA {
    return super.data();
  }
}
export default new AddCartModal();
