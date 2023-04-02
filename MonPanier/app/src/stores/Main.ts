import Store from '../scripts/Store';

const STORE_NAME = 'main';
const STORE_DATA: {
  scrollView: HTMLElement,
  scrolled: boolean,
  update: () => void,
  initScroll: () => void;
} = {
  scrollView: document.querySelector('.scrollview') as HTMLElement,
  scrolled: false,

  update() {
    this.scrolled = this.scrollView.scrollTop > 24;
  },

  initScroll() {
    this.scrollView.addEventListener('scroll', this.update.bind(this));
    this.update();
  },
};
export default new Store(STORE_NAME, STORE_DATA) as unknown as typeof STORE_DATA;
