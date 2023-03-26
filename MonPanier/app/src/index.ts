import './style/style.scss';

import { Api } from './api';

const sum = (a: number, b:number) => a + b;

// eslint-disable-next-line no-console
console.log(sum(1, 7 + 2));

window.onload = () => {
  document.querySelector('h1').innerHTML = 'hello';
  const api = new Api();
  api.api.getProducts().then((data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  });
};
