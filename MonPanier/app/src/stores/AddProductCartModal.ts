import Store, { IStore } from '../scripts/Store';
import { FoodSchema } from '../api';
import Backend from '../scripts/Backend';
import ProductModal from './ProductModal';

const STORE_NAME = 'addProductToCartModal';
const STORE_DATA: {
  on: boolean,
  code: string | undefined,
  selectedCart: string | undefined,
  toggle: (code : string) => void,
  addToCart: () => void,
} = {
  on: false,
  code: undefined,
  selectedCart: undefined,

  toggle(code : string | undefined = undefined) {
    this.code = code;
    this.on = !this.on;
  },

  addToCart() {
    Backend.getProduct(this.code, Backend.params).then((productResult) => {
      if (productResult.data) {
        Backend
          .addProductToCart(this.selectedCart, String(productResult.data.id), Backend.params)
          .then((result) => {
            if (result.status === 200) {
              this.toggle();
              alert('Produit ajouté au panier.');
              ProductModal.toggle(false);
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
