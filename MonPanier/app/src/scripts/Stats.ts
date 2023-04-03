import { Chart, ChartConfiguration } from 'chart.js/auto';

class Stats {
  private readonly charts: Chart[] = [];

  constructor() {
    const brefElement = document.getElementById('bref-chart') as HTMLCanvasElement;
    const brefData = {
      labels: [
        'A',
        'B',
        'C',
        'D',
        'E',
      ],
      datasets: [{
        label: 'Mes paniers',
        data: [10, 20, 40, 10, 5],
        backgroundColor: [
          '#038141',
          '#85bb2f',
          '#fecb02',
          '#ee8100',
          '#e63e11',
        ],
        hoverOffset: 4,
      }],
    };
    this.charts.push(new Chart(brefElement, {
      type: 'doughnut',
      data: brefData,
    } as ChartConfiguration));

    const recallsEvolutionElement = document.getElementById('recalls-evolution-chart') as HTMLCanvasElement;
    const recallsEvolutionData = {
      labels: [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre',
      ],
      datasets: [{
        label: 'Recalls',
        data: [10, 20, 40, 10, 5, 10, 20, 40, 10, 5, 10, 20],
        backgroundColor: '#84cc16',
        hoverOffset: 4,

      }],
    };
    this.charts.push(new Chart(recallsEvolutionElement, {
      type: 'line',
      data: recallsEvolutionData,
    } as ChartConfiguration));

    const dispensationsEvolutionElement = document.getElementById('dispensations-evolution-chart') as HTMLCanvasElement;
    const dispensationsEvolutionData = {
      labels: [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre',
      ],
      datasets: [{
        label: 'Dispensations',
        data: [10, 20, 40, 10, 5, 10, 20, 40, 10, 5, 10, 20],
        backgroundColor: '#84cc16',
        hoverOffset: 4,

      }],
    };
    this.charts.push(new Chart(dispensationsEvolutionElement, {
      type: 'line',
      data: dispensationsEvolutionData,
    } as ChartConfiguration));
  }

  getChartById(elementId: string) {
    return this.charts.find((chart) => chart.canvas.id === elementId);
  }
}

export default new Stats();
