import Store, { IStore } from '../scripts/Store';
import { DispensationSchema, ProductSchema, RecallSchema } from '../api';
import Cart from './Cart';

const STORE_NAME = 'product';
const STORE_DATA: {
  product: ProductSchema,
  updateProduct: (product: ProductSchema) => void,
  getRecalls: () => RecallSchema[],
  getDispensations: () => DispensationSchema[],
} = {
  product: { recalls: [], dispensations_allergens: [], dispensations_others: [] } as ProductSchema,

  updateProduct(product: ProductSchema) {
    if (!Cart.productsExtended.find((p: ProductSchema) => p.id === product.id)) {
      Cart.productsExtended.push(product);
    }
    this.product = product;
    this.product.categories = (Object.values(this.product.categories) || []).filter((c: string) => !c.includes(':') && !c.includes('-') && c.toLowerCase() !== 'test');
  },

  getRecalls(): RecallSchema[] {
    return this.product.recalls || [];
  },

  getDispensations(): DispensationSchema[] {
    const others = this.product.dispensations_others || [];
    const allergens = this.product.dispensations_allergens || [];
    return others.concat(allergens);
  },
};

export default new Store(STORE_NAME, STORE_DATA) as IStore<typeof STORE_DATA>;
