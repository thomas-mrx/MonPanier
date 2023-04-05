import Store, { IStore } from '../scripts/Store';

const STORE_NAME = 'RecallInfoModal';
const STORE_DATA: {
  on: boolean,
  toggle: (code : string) => void,
} = {
  on: false,

  toggle(code : string | undefined = undefined) {
    this.code = code;
    this.on = !this.on;
  },

};
export default new Store(STORE_NAME, STORE_DATA) as IStore<typeof STORE_DATA>;
