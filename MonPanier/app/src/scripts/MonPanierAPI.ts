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

class MonPanierAPI {
  private readonly headers: { [key: string]: string } = {};

  private readonly api;

  constructor() {
    this.headers['X-CSRFToken'] = getCookie('csrftoken');
    this.api = new Api().api;
  }

  public getApi() {
    return this.api;
  }

  public getHeaders() {
    return {
      headers: this.headers,
    };
  }
}

export default new MonPanierAPI();
