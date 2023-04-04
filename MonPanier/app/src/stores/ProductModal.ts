import Store, { IStore } from '../scripts/Store';
import { FoodSchema } from '../api';

const STORE_NAME = 'productModal';
const STORE_DATA: {
  on: boolean,
  food: FoodSchema | undefined,
  toggle: () => void,
  update: (food: FoodSchema) => void,
} = {
  on: false,
  food: {} as FoodSchema,

  toggle() {
    this.on = !this.on;
  },

  update(food: FoodSchema) {
    this.food = food;
    this.on = true;
  },
};

export default new Store(STORE_NAME, STORE_DATA) as IStore<typeof STORE_DATA>;
