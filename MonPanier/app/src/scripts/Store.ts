import Alpine from 'alpinejs';

export default class Store {
  constructor(name: string, store: {}) {
    Alpine.store(name, store);
    Object.keys(Alpine.store(name)).forEach((key:string) => {
      Object.defineProperty(this, key, {
        get() {
          return (Alpine.store(name) as any)[key];
        },
        set(v) {
          (Alpine.store(name) as any)[key] = v;
        },
      });
    });
  }
}

export type IStore<DataType> = Store & DataType;
