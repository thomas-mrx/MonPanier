import './style/style.scss';
import { Api, ProductSchema } from './api';

window.onload = () => {
  const MonPanier = new Api();
  MonPanier.api.searchProduct('nu').then((result) => {
    if (result.data.length) {
      const product: ProductSchema = result.data[0];
      // eslint-disable-next-line no-console
      console.log(product.ean, product.title);
    }
  });
};
