import Store from '../scripts/Store';

const STORE_NAME = 'main';
const STORE_DATA: {
  scrollView: HTMLElement,
  scrolled: boolean,
  update: () => void,
} = {
  scrollView: document.querySelector('.scrollview') as HTMLElement,
  scrolled: false,

  update() {
    this.scrolled = this.scrollView.scrollTop > 24;
  },
};
export default new Store(STORE_NAME, STORE_DATA) as unknown as typeof STORE_DATA;
