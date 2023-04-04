import Store from '../scripts/Store';
import Backend from '../scripts/Backend';
import {
  DispensationCategoryDatasetSchema,
  EvolutionDatasetSchema,
  RecallCategoryDatasetSchema,
  StatsSchema,
} from '../api';
import Stats from '../scripts/Stats';

const STORE_NAME = 'dashboard';
const STORE_DATA: {
  recallsEvolutionModalOn: boolean,
  recallsCategoriesModalOn: boolean,
  dispensationsEvolutionModalOn: boolean,
  dispensationsCategoriesModalOn: boolean,

  stats: StatsSchema | null,
  updateStats: () => void,

  toggleRecallsEvolutionModal: () => void,
  toggleRecallsCategoriesModal: () => void,
  toggleDispensationsEvolutionModal: () => void,
  toggleDispensationsCategoriesModal: () => void,
} = {
  recallsEvolutionModalOn: false,
  recallsCategoriesModalOn: false,
  dispensationsEvolutionModalOn: false,
  dispensationsCategoriesModalOn: false,
  stats: {
    recalls: {
      data: [],
      last_month: 0,
      last_year: 0,
      categories: {
        last_month_data: [{ sous_categorie_de_produit: '', total: 0 }],
        last_year_data: [{ sous_categorie_de_produit: '', total: 0 }],
      },
    },
    dispensations: {
      data: [],
      last_month: 0,
      last_year: 0,
      categories: {
        last_month_data: [{ categorie_du_produit_rayon: '', total: 0 }],
        last_year_data: [{ categorie_du_produit_rayon: '', total: 0 }],
      },
    },
  } as StatsSchema,

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

  updateStats() {
    Backend.getStats(Backend.params).then((result) => {
      this.stats = result.data;
      Stats.updateChartById(
        'recalls-evolution-chart',
        this.stats.recalls.data.map((stat: EvolutionDatasetSchema) => stat.month),
        this.stats.recalls.data.map((stat: EvolutionDatasetSchema) => stat.total),
      );
      Stats.updateChartById(
        'dispensations-evolution-chart',
        this.stats.dispensations.data.map((stat: EvolutionDatasetSchema) => stat.month),
        this.stats.dispensations.data.map((stat: EvolutionDatasetSchema) => stat.total),
      );
      Stats.updateChartById(
        'recalls-categories-chart',
        this.stats.recalls.categories.last_year_data.map((stat: RecallCategoryDatasetSchema) => stat.sous_categorie_de_produit).slice(0, 5),
        this.stats.recalls.categories.last_year_data.map((stat: RecallCategoryDatasetSchema) => stat.total).slice(0, 5),
      );
      Stats.updateChartById(
        'dispensations-categories-chart',
        this.stats.dispensations.categories.last_year_data.map((stat: DispensationCategoryDatasetSchema) => stat.categorie_du_produit_rayon).slice(0, 5),
        this.stats.dispensations.categories.last_year_data.map((stat: DispensationCategoryDatasetSchema) => stat.total).slice(0, 5),
      );
      // const statsMapped = JSON.parse(JSON.stringify(this.stats));
      // console.log(statsMapped.recalls);
      // console.log(statsMapped.recalls.data.map((stat: DatasetSchema) => stat.month));
    });
  },

};

export default new Store(STORE_NAME, STORE_DATA) as unknown as typeof STORE_DATA;
