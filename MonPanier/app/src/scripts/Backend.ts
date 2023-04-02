import { Api } from '../api';
import * as all from '../api';

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
  headers: { [key: string]: string };
}
class Backend {
  headers: IBackend['headers'];

  constructor() {
    this.headers = {
      'X-CSRFToken': getCookie('csrftoken'),
    };
    Object.assign(this, api);
  }
}
export default new Backend() as IBackend;
