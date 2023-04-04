import Store, { IStore } from '../scripts/Store';
import { CartSchema, FoodSchema } from '../api';
import Backend from '../scripts/Backend';

const STORE_NAME = 'search';
const STORE_DATA: {
  text: string | undefined,
  foods: FoodSchema[],
  carts: CartSchema[],
  isLoading: boolean,
  noResults: boolean,
  offset: number,
  search: () => void,
  loadMore: () => void,
} = {
  text: undefined,
  foods: [] as FoodSchema[],
  carts: [] as CartSchema[],
  isLoading: false,
  noResults: false,
  offset: 0,

  search() {
    this.isLoading = true;
    this.noResults = false;
    this.foods = [];
    Backend.searchFoods({ query: this.text, offset: 0 }, Backend.params)
      .then((result) => {
        if (result.data) {
          this.isLoading = false;
          this.noResults = result.data.length === 0;
          this.foods = result.data;
          this.offset = result.data.length;
        }
      });
  },

  loadMore() {
    this.isLoading = true;
    Backend.searchFoods({ query: this.text, offset: this.offset }, Backend.params)
      .then((result) => {
        if (result.data) {
          this.isLoading = false;
          this.foods = this.foods.concat(result.data);
          this.offset += result.data.length;
        }
      });
  },

};

export default new Store(STORE_NAME, STORE_DATA) as IStore<typeof STORE_DATA>;
