import Store, { IStore } from '../scripts/Store';
import Backend from '../scripts/Backend';

const STORE_NAME = 'settingsModal';
const STORE_DATA: {
  on: boolean,
  text: string,
  password1: string | undefined,
  password2: string | undefined,
  toggle: () => void,
  logout: () => Promise<void>,
} = {
  on: false,
  text: 'Paramètres',
  password1: undefined,
  password2: undefined,

  toggle() {
    this.on = !this.on;
  },

  async logout() {
    const result = await Backend.logout(Backend.params);
    if (result.status === 204) {
      window.location.reload();
    }
  },
};
export default new Store(STORE_NAME, STORE_DATA) as IStore<typeof STORE_DATA>;
