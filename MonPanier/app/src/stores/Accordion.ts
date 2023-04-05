import Store, { IStore } from '../scripts/Store';

const STORE_NAME = 'accordion';
const STORE_DATA: {
  tab: number,
} = {
  tab: 0,
};
const STORE_CALLBACK: (idx: number) => {
  init: () => void,
  idx: number,
  handleClick: () => void,
  handleRotate: () => string,
  handleToggle: () => string,
} = (idx: number) => ({
  init() {
    this.idx = idx;
  },
  idx: -1,
  handleClick() {
    this.$store.accordion.tab = this.$store.accordion.tab === this.idx ? 0 : this.idx;
  },
  handleRotate() {
    return this.$store.accordion.tab === this.idx ? 'rotate-180' : '';
  },
  handleToggle() {
    return this.$store.accordion.tab === this.idx ? `max-height: ${this.$refs.tab.scrollHeight}px; border-bottom-left-radius: 0.375rem;` : '';
  },
});
export default new Store(STORE_NAME, STORE_DATA, STORE_CALLBACK) as IStore<typeof STORE_DATA>;
