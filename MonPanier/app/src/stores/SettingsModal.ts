import Store from '../scripts/Store';
import MonPanierAPI from '../scripts/MonPanierAPI';

const STORE_NAME = 'settingsModal';
const STORE_DATA: {
  on: boolean,
  text: string,
  toggle: () => void,
  logout: () => void,
} = {
  on: false,
  text: 'Paramètres',

  toggle() {
    this.on = !this.on;
  },

  async logout() {
    const result = await MonPanierAPI.getApi().monPanierApiAuthApiLogout(MonPanierAPI.getHeaders());
    if (result.status === 204) {
      window.location.reload();
    }
  },
};

class SettingsModal extends Store {
  constructor() {
    super(STORE_NAME, STORE_DATA);
  }

  public data(): typeof STORE_DATA {
    return super.data();
  }
}
export default new SettingsModal();
