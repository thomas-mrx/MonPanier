import './style/style.scss';

const sum = (a: number, b:number) => a + b;

// eslint-disable-next-line no-console
console.log(sum(1, 8 + 2));

window.onload = () => {
  document.querySelector('h1').innerHTML = 'Hello World from TypeScript (index.ts)!';
};
