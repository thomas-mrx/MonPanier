import './style/style.scss';
import {Api, ProductSchema} from './api';
import Alpine from 'alpinejs'


window.onload = () => {
    // @ts-ignore
    window.Alpine = Alpine;
    Alpine.start();

    const MonPanier = new Api();
    MonPanier.api.searchProduct('nu').then((result) => {
        if (result.data.length) {
            const product: ProductSchema = result.data[0];
            // eslint-disable-next-line no-console
            console.log(product.ean, product.title);
        }
    });
};
