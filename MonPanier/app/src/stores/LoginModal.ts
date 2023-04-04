import Store, { IStore } from '../scripts/Store';
import Backend from '../scripts/Backend';
import { User4 } from '../api';

const STORE_NAME = 'loginModal';
const STORE_DATA: {
  on: boolean,
  username: string | undefined,
  password: string | undefined,
  password_confirm: string | undefined,
  email: string | undefined,
  user: User4 | undefined,
  signin: boolean,
  signup: boolean,
  toggle: () => void,
  login: () => void,
  register: () => void,
  checkLogin: () => void;
  getUsername: () => string | undefined,
  getEmail: () => string | undefined,
} = {
  on: false,
  username: undefined,
  password: undefined,
  password_confirm: undefined,
  email: undefined,
  user: undefined,
  signin: true,
  signup: false,

  toggle() {
    this.on = !this.on;
  },

  login() {
    Backend.login({
      username: this.username,
      password: this.password,
    }, Backend.params).then((result) => {
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
    }, Backend.params).then((result) => {
      if (result.status === 201 && result.data) {
        alert('Compte créé, vérifiez vos emails pour l\'activer.');
      }
    }).catch((error) => {
      alert('Erreur lors de la création du compte.');
      console.log(error);
    });
  },

  checkLogin() {
    Backend.me(Backend.params).then((result) => {
      if (result.data) {
        this.user = result.data;
      }
    }).catch((error) => {
      if (error.status === 401) {
        this.toggle();
      }
    });
  },

  getUsername() {
    return this.user?.username ?? 'Visiteur';
  },

  getEmail() {
    return this.user?.email ?? 'Visiteur';
  },
};
export default new Store(STORE_NAME, STORE_DATA) as IStore<typeof STORE_DATA>;
