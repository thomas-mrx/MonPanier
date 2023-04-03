import Store, { IStore } from '../scripts/Store';
import { ProductSchema } from '../api';

const STORE_NAME = 'product';
const STORE_DATA: {
  product: ProductSchema,
  updateProduct: (product: ProductSchema) => void,
} = {
  product: {} as ProductSchema,

  updateProduct(product: ProductSchema) {
    this.product = product;
  },
};

export default new Store(STORE_NAME, STORE_DATA) as IStore<typeof STORE_DATA>;
