import Store from '../scripts/Store';

const STORE_NAME = 'main';
const STORE_DATA: {
  scrollView: HTMLElement,
  scrolled: boolean,
  update: () => void,
} = {
  scrollView: document.querySelector('.scrollview') as HTMLElement,
  scrolled: false,

  update() {
    this.scrolled = this.scrollView.scrollTop > 24;
  },
};
class Main extends Store {
  constructor() {
    super(STORE_NAME, STORE_DATA);
  }

  protected override init(): void {
    console.log('init child');
    this.data().scrollView.addEventListener('scroll', () => {
      this.data().update();
    });
  }

  public data(): typeof STORE_DATA {
    return super.data();
  }
}
export default new Main();
