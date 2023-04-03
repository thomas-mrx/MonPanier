import Store, { IStore } from '../scripts/Store';

const STORE_NAME = 'main';
const STORE_DATA: {
  scrollView: HTMLElement,
  scrolled: boolean,
  update: () => void,
  initScroll: () => void,
  foodEmoji: () => string,
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

  foodEmoji() {
    const emojis = ['🍔', '🍕', '🍟', '🍣', '🍱', '🍜', '🍝', '🍛', '🍲', '🥦', '🥬', '🍅', '🥒', '🍩', '🥕'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  },
};
export default new Store(STORE_NAME, STORE_DATA) as IStore<typeof STORE_DATA>;
