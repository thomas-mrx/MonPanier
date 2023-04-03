import Store from '../scripts/Store';
import Backend from '../scripts/Backend';

const STORE_NAME = 'dashboard';
const STORE_DATA: {
  recallsEvolutionModalOn: boolean,
  dispensationsEvolutionModalOn: boolean,
  toggleRecallsEvolutionModal: () => void,
  toggleDispensationsEvolutionModal: () => void,
} = {
  recallsEvolutionModalOn: false,
  dispensationsEvolutionModalOn: false,

  toggleRecallsEvolutionModal() {
    this.recallsEvolutionModalOn = !this.recallsEvolutionModalOn;
  },

  toggleDispensationsEvolutionModal() {
    this.dispensationsEvolutionModalOn = !this.dispensationsEvolutionModalOn;
  },
};

export default new Store(STORE_NAME, STORE_DATA) as unknown as typeof STORE_DATA;
