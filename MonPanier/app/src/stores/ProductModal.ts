import Store from '../scripts/Store';
import { ProductSchema } from '../api';

const STORE_NAME = 'productModal';
const STORE_DATA: {
  on: boolean,
  text: string,
  product: ProductSchema,
  toggle: () => void,
  update: (product: ProductSchema) => void,
} = {
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
};

class ProductModal extends Store {
  constructor() {
    super(STORE_NAME, STORE_DATA);
  }

  public data(): typeof STORE_DATA {
    return super.data();
  }
}
export default new ProductModal();
