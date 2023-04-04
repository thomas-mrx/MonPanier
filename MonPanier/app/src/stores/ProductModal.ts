import Store, { IStore } from '../scripts/Store';
import { ProductSchema } from '../api';

const STORE_NAME = 'productModal';
const STORE_DATA: {
  on: boolean,
  product: ProductSchema | undefined,
  toggle: (force?: boolean | undefined) => void,
  update: (product: ProductSchema) => void,
  onOpen: () => void,
  onClose: () => void,
} = {
  on: false,
  product: {} as ProductSchema,
  onOpen: () => {},
  onClose: () => {},

  toggle(force:boolean | undefined = undefined) {
    this.on = force === undefined ? !this.on : force;
    if (this.on) {
      this.onOpen();
    } else {
      this.onClose();
    }
  },

  update(product: ProductSchema) {
    this.product = product;
    this.toggle(true);
  },
};

export default new Store(STORE_NAME, STORE_DATA) as IStore<typeof STORE_DATA>;
