import Store, { IStore } from '../scripts/Store';
import { DispensationSchema, ProductSchema, RecallSchema } from '../api';
import Cart from './Cart';

const STORE_NAME = 'product';
const STORE_DATA: {
  product: ProductSchema,
  updateProduct: (product: ProductSchema) => void,
  getRecalls: () => RecallSchema[],
  getDispensations: () => DispensationSchema[],
  getNutritionFacts: () => { name: string, value: string }[]
} = {
  product: { recalls: [], dispensations_allergens: [], dispensations_others: [] } as ProductSchema,

  updateProduct(product: ProductSchema) {
    if (!Cart.productsExtended.find((p: ProductSchema) => p.id === product.id)) {
      Cart.productsExtended.push(product);
    }
    this.product = product;
    this.product.categories = (Object.values(this.product.categories) || []).filter((c: string) => !c.includes(':') && !c.includes('-') && c.toLowerCase() !== 'test');
  },

  getNutritionFacts(): { name: string, value: string }[] {
    const nutritionFacts: { name: string; value: string; }[] = [];
    const translations: { [k:string]: string } = {
      energy_100g: 'Énergie kJ',
      energy_kj_100g: 'Énergie kJ',
      energy_kcal_100g: 'Énergie kCal',
      fat_100g: 'Matières grasses',
      saturated_fat_100g: 'Acides gras saturés',
      carbohydrates_100g: 'Glucides',
      sugars_100g: 'Sucres',
      fiber_100g: 'Fibres',
      proteins_100g: 'Protéines',
      salt_100g: 'Sel',
      sodium_100g: 'Sodium',
      alcohol_100g: 'Alcool',
    };
    let hasEnergy = false;
    Object.keys(this.product?.nutriments ?? {}).forEach((key: string) => {
      if (key in translations && this.product?.nutriments[key] !== '' && ((key !== 'energy_100g' && key !== 'energy_kj_100g') || !hasEnergy)) {
        if (key === 'energy_100g' || key === 'energy_kj_100g') {
          hasEnergy = true;
        }
        nutritionFacts.push({ name: translations[key], value: this.product?.nutriments[key] });
      }
    });
    // this.product.filter((k: string) => k.endsWith('_100g'));
    console.log(nutritionFacts);
    return nutritionFacts;
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
