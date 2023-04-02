import Store from '../scripts/Store';
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
  add: (food: FoodSchema) => void,
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

  add(food: FoodSchema) {
    Backend.getProduct(food.code, Backend.params).then((productResult) => {
      if (productResult.data) {
        Backend.getCarts(Backend.params).then((cartsResult) => {
          if (cartsResult.data) {
            this.carts = cartsResult.data;
            if (this.carts.length === 0) {
              alert('Vous devez créer un panier avant d\'ajouter des produits.');
            } else {
              Backend
                .addProductToCart(this.carts[0].id, String(productResult.data.id), Backend.params)
                .then((result) => {
                  if (result.status === 200) {
                    alert(`Produit ajouté au panier ${this.carts[0].id}.`);
                  }
                }).catch((error) => {
                  alert('Erreur lors de l\'ajout du produit.');
                  console.error(error);
                });
            }
          }
        });
      }
    });
  },

};

export default new Store(STORE_NAME, STORE_DATA) as unknown as typeof STORE_DATA;
