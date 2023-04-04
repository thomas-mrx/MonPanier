import Store, { IStore } from '../scripts/Store';
import { FoodSchema } from '../api';

const STORE_NAME = 'productModal';
const STORE_DATA: {
  on: boolean,
  food: FoodSchema | undefined,
  toggle: (force?: boolean | undefined) => void,
  update: (food: FoodSchema) => void,
  onOpen: () => void,
  onClose: () => void,
} = {
  on: false,
  food: {} as FoodSchema,
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

  update(food: FoodSchema) {
    this.food = food;
    this.toggle(true);
  },
};

export default new Store(STORE_NAME, STORE_DATA) as IStore<typeof STORE_DATA>;
