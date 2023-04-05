import Store, { IStore } from '../scripts/Store';
import { DispensationSchema, ProductSchema, RecallSchema } from '../api';

const STORE_NAME = 'product';
const STORE_DATA: {
  product: ProductSchema,
  updateProduct: (product: ProductSchema) => void,
  getLastYearRecalls: () => RecallSchema[],
  getLastYearDispensations: () => DispensationSchema[],
} = {
  product: { recalls: [], dispensations_allergens: [], dispensations_others: [] } as ProductSchema,

  updateProduct(product: ProductSchema) {
    this.product = product;
    this.product.categories = (Object.values(this.product.categories) || []).filter((c: string) => !c.includes(':') && !c.includes('-') && c.toLowerCase() !== 'test');
  },

  getLastYearRecalls(): RecallSchema[] {
    return this.product.recalls.filter((r: RecallSchema) => {
      const recallDate = new Date(r.date_de_publication);
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      return recallDate >= oneYearAgo;
    }) || [];
  },

  getLastYearDispensations(): DispensationSchema[] {
    const others = this.product.dispensations_others.filter((d: DispensationSchema) => {
      const dispensationDate = new Date(d.datedepot);
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      return dispensationDate >= oneYearAgo;
    }) || [];
    const allergens = this.product.dispensations_allergens.filter((d: DispensationSchema) => {
      const dispensationDate = new Date(d.datedepot);
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      return dispensationDate >= oneYearAgo;
    }) || [];
    return others.concat(allergens);
  },
};

export default new Store(STORE_NAME, STORE_DATA) as IStore<typeof STORE_DATA>;
