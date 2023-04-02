import Store from '../scripts/Store';
import Backend from '../scripts/Backend';

const STORE_NAME = 'settingsModal';
const STORE_DATA: {
  on: boolean,
  text: string,
  toggle: () => void,
  logout: () => Promise<void>,
} = {
  on: false,
  text: 'Paramètres',

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
export default new Store(STORE_NAME, STORE_DATA) as unknown as typeof STORE_DATA;
