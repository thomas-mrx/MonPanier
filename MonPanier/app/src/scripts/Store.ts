import Alpine from 'alpinejs';

export default class Store {
  private readonly store_name: string;

  // eslint-disable-next-line class-methods-use-this
  protected init():void {}

  constructor(name: string, store: {}) {
    this.store_name = name;
    Alpine.store(this.store_name, store);
    this.init();
  }

  public data(): any {
    return Alpine.store(this.store_name);
  }

  public name(): string {
    return this.store_name;
  }
}
