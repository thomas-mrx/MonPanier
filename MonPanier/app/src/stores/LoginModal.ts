import Store from '../scripts/Store';
import Backend from '../scripts/Backend';

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
  checkLogin: () => void;
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
    Backend.login({
      username: this.username,
      password: this.password,
    }, Backend.headers).then((result) => {
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
    Backend.register({
      username: this.username,
      password1: this.password,
      password2: this.password_confirm,
      email: this.email,
    }, Backend.headers).then((result) => {
      if (result.status === 201 && result.data) {
        alert('Compte créé, vérifiez vos emails pour l\'activer.');
      }
    }).catch((error) => {
      alert('Erreur lors de la création du compte.');
      console.log(error);
    });
  },

  checkLogin() {
    Backend.me(Backend.headers).catch((error) => {
      if (error.status === 401) {
        this.toggle();
      }
    });
  },
};
export default new Store(STORE_NAME, STORE_DATA) as unknown as typeof STORE_DATA;
