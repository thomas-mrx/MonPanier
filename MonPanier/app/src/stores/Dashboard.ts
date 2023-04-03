import Store from '../scripts/Store';
import Backend from '../scripts/Backend';

const STORE_NAME = 'dashboard';
const STORE_DATA: {
  recallsEvolutionModalOn: boolean,
  dispensationsModalOn: boolean,
  toggleRecallsEvolutionModal: () => void,
  toggleDispensationsModal: () => void,
} = {
  recallsEvolutionModalOn: true,
  dispensationsModalOn: false,

  toggleRecallsEvolutionModal() {
    this.recallsEvolutionModalOn = !this.recallsEvolutionModalOn;
  },

  toggleDispensationsModal() {
    this.dispensiationModalOn = !this.dispensiationModalOn;
  },
};

export default new Store(STORE_NAME, STORE_DATA) as unknown as typeof STORE_DATA;
