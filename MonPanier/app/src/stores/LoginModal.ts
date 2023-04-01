import Store from '../scripts/Store';
import MonPanierAPI from '../scripts/MonPanierAPI';

const STORE_NAME = 'loginModal';
const STORE_DATA: {
  on: boolean,
  username: string | undefined,
  password: string | undefined,
  password_confirm: string | undefined,
  email: string | undefined,
  signin: boolean,
  signup: boolean,
  toggle: () => void,
  login: () => void,
  register: () => void,
} = {
  on: false,
  username: undefined,
  password: undefined,
  password_confirm: undefined,
  email: undefined,
  signin: true,
  signup: false,

  toggle() {
    this.on = !this.on;
  },

  login() {
    MonPanierAPI.getApi().monPanierApiAuthApiLogin({
      username: this.username,
      password: this.password,
    }, MonPanierAPI.getHeaders()).then((result) => {
      if (result.status === 200 && result.data) {
        this.toggle();
        // @ts-ignore
        Alpine.store('routes').detectActiveTab();
      }
    }).catch((error) => {
      if (error.status === 403) {
        alert('Compte non-activé ou mauvais identifiants.');
        this.username = undefined;
        this.password = undefined;
      }
    });
  },

  register() {
    MonPanierAPI.getApi().monPanierApiAuthApiRegister({
      username: this.username,
      password1: this.password,
      password2: this.password_confirm,
      email: this.email,
    }, MonPanierAPI.getHeaders()).then((result) => {
      if (result.status === 201 && result.data) {
        alert('Compte créé, vérifiez vos emails pour l\'activer.');
      }
    }).catch((error) => {
      alert('Erreur lors de la création du compte.');
      console.log(error);
    });
  },
};

class LoginModal extends Store {
  constructor() {
    super(STORE_NAME, STORE_DATA);
  }

  public data(): typeof STORE_DATA {
    return super.data();
  }
}
export default new LoginModal();
