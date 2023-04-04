import Store, { IStore } from '../scripts/Store';
import Backend from '../scripts/Backend';
import { ChangePasswordIn } from '../api';

const STORE_NAME = 'settingsModal';
const STORE_DATA: {
  on: boolean,
  text: string,
  old_password: string | undefined,
  password1: string | undefined,
  password2: string | undefined,
  toggle: () => void,
  logout: () => Promise<void>,
  changePassword: () => void,
} = {
  on: false,
  text: 'Paramètres',
  old_password: undefined,
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

  changePassword() {
    const data:ChangePasswordIn = {
      old_password: this.old_password,
      new_password1: this.password1,
      new_password2: this.password2,
    };
    Backend.changePassword(data, Backend.params).then((result) => {
      if (result.status === 200) {
        alert('Mot de passe changé avec succès.');
      }
    }).catch((error) => {
      if (error.status === 403) {
        alert('Les mots de passe ne correspondent pas ou le mot de passe choisi est trop court (moins de 8 caractères) ou trop peu sécurisé.');
      }
    });
  },
};
export default new Store(STORE_NAME, STORE_DATA) as IStore<typeof STORE_DATA>;
