import Store, { IStore } from '../scripts/Store';

const STORE_NAME = 'main';
const STORE_DATA: {
  scrollView: HTMLElement,
  scrolled: boolean,
  update: () => void,
  foodEmoji: () => string,
  getGradeFromScore: (score: number) => string,
} = {
  scrollView: document.querySelector('.scrollview') as HTMLElement,
  scrolled: false,

  update() {
    this.scrolled = this.scrollView.scrollTop > 24;
  },

  foodEmoji() {
    const emojis = ['🍔', '🍕', '🍟', '🍣', '🍱', '🍜', '🍝', '🍛', '🍲', '🥦', '🥬', '🍅', '🥒', '🍩', '🥕'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  },

  getGradeFromScore(score: number) {
    const maxScore = 100;
    const grades = ['a', 'b', 'c', 'd', 'e'];
    const s = Math.min(score, maxScore);
    return s === 0 ? 'na' : grades[Math.floor(s / (maxScore / grades.length))];
  },
};
export default new Store(STORE_NAME, STORE_DATA) as IStore<typeof STORE_DATA>;
