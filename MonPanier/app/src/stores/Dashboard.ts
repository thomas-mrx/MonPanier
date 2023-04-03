import Store from '../scripts/Store';
import Backend from '../scripts/Backend';

const STORE_NAME = 'dashboard';
const STORE_DATA: {
  recallsEvolutionModalOn: boolean,
  recallsCategoriesModalOn: boolean,
  dispensationsEvolutionModalOn: boolean,
  dispensationsCategoriesModalOn: boolean,

  toggleRecallsEvolutionModal: () => void,
  toggleRecallsCategoriesModal: () => void,
  toggleDispensationsEvolutionModal: () => void,
  toggleDispensationsCategoriesModal: () => void,
} = {
  recallsEvolutionModalOn: false,
  recallsCategoriesModalOn: false,
  dispensationsEvolutionModalOn: false,
  dispensationsCategoriesModalOn: false,

  toggleRecallsEvolutionModal() {
    this.recallsEvolutionModalOn = !this.recallsEvolutionModalOn;
  },

  toggleRecallsCategoriesModal() {
    this.recallsCategoriesModalOn = !this.recallsCategoriesModalOn;
  },

  toggleDispensationsEvolutionModal() {
    this.dispensationsEvolutionModalOn = !this.dispensationsEvolutionModalOn;
  },

  toggleDispensationsCategoriesModal() {
    this.dispensationsCategoriesModalOn = !this.dispensationsCategoriesModalOn;
  },
};

export default new Store(STORE_NAME, STORE_DATA) as unknown as typeof STORE_DATA;
