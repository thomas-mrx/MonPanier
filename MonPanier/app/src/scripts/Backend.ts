import Alpine from 'alpinejs';
import { Api } from '../api';

const getCookie = (name: string) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i += 1) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (`${name}=`)) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

const { api } = new Api();
type ApiType = typeof api;
interface IBackend extends ApiType {
  params: { headers: { [key: string]: string }, credentials: RequestCredentials };
}
class Backend {
  params: IBackend['params'] = { headers: {}, credentials: 'include' };

  constructor() {
    Object.assign(this, api);
    Object.defineProperty(this, 'params', {
      get() {
        return { headers: { 'X-CSRFToken': getCookie('csrftoken') }, credentials: 'include' };
      },
    });
  }
}
export default new Backend() as IBackend;
