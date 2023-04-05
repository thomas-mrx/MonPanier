import Store, { IStore } from '../scripts/Store';
import { FoodSchema } from '../api';
import Backend from '../scripts/Backend';
import ProductModal from './ProductModal';
import Cart from './Cart';

const STORE_NAME = 'addProductToCartModal';
const STORE_DATA: {
  on: boolean,
  code: string | undefined,
  selectedCart: string | undefined,
  isLoading: boolean,
  toggle: (code : string) => void,
  addToCart: () => void,
} = {
  on: false,
  code: undefined,
  isLoading: false,
  selectedCart: undefined,

  toggle(code : string | undefined = undefined) {
    this.code = code;
    this.on = !this.on;
  },

  addToCart() {
    this.isLoading = true;
    Backend.getProduct(this.code, Backend.params).then((productResult) => {
      if (productResult.data) {
        Backend
          .addProductToCart(this.selectedCart, String(productResult.data.id), Backend.params)
          .then((result) => {
            this.isLoading = false;
            if (result.status === 200) {
              this.toggle();
              alert('Produit ajouté au panier.');
              Cart.cartsExtended = Cart.cartsExtended.filter(
                (cart) => cart.id !== this.selectedCart,
              );
              ProductModal.toggle(false);
            }
          }).catch((error) => {
            this.isLoading = false;
            alert('Erreur lors de l\'ajout du produit.');
            console.error(error);
          });
      }
    });
  },
};
export default new Store(STORE_NAME, STORE_DATA) as IStore<typeof STORE_DATA>;
