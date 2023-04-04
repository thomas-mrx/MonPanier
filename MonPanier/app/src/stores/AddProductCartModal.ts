import Store, { IStore } from '../scripts/Store';
import { FoodSchema } from '../api';
import Backend from '../scripts/Backend';
import Cart from './Cart';

const STORE_NAME = 'addProductToCartModal';
const STORE_DATA: {
  on: boolean,
  food: FoodSchema | undefined,
  selectedCart: string | undefined,
  toggle: (food : FoodSchema) => void,
  addToCart: () => void,
} = {
  on: false,
  food: undefined,
  selectedCart: undefined,

  toggle(food : FoodSchema) {
    this.food = food;
    this.on = !this.on;
  },

  addToCart() {
    Backend.getProduct(this.food.code, Backend.params).then((productResult) => {
      if (productResult.data) {
        Backend
          .addProductToCart(this.selectedCart, String(productResult.data.id), Backend.params)
          .then((result) => {
            if (result.status === 200) {
              this.toggle();
              alert('Produit ajouté au panier');
            }
          }).catch((error) => {
            alert('Erreur lors de l\'ajout du produit.');
            console.error(error);
          });
      }
    });
  },
};
export default new Store(STORE_NAME, STORE_DATA) as IStore<typeof STORE_DATA>;
