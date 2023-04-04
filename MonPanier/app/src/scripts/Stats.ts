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
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: '#84cc16',
        hoverOffset: 4,

      }],
    };
    this.charts.push(new Chart(recallsEvolutionElement, {
      type: 'line',
      data: recallsEvolutionData,
    } as ChartConfiguration));

    const recallsCategoriesElement = document.getElementById('recalls-categories-chart') as HTMLCanvasElement;
    const recallsCategoriesData = {
      labels: [
        'Viandes',
        'Laitages',
        'Fruits et légumes',
      ],
      datasets: [{
        label: 'Nombre de rappels par catégorie',
        data: [10, 20, 40],
        backgroundColor: ['#84cc16', '#a3e635', '#bef264', '#d9f99d', '#ecfccb'],
        hoverOffset: 4,
      }],
    };
    this.charts.push(new Chart(recallsCategoriesElement, {
      type: 'bar',
      options: {
        indexAxis: 'y',
      },
      data: recallsCategoriesData,

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
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: '#84cc16',
        hoverOffset: 4,

      }],
    };
    this.charts.push(new Chart(dispensationsEvolutionElement, {
      type: 'line',
      data: dispensationsEvolutionData,
    } as ChartConfiguration));

    const dispensationsCategoriesElement = document.getElementById('dispensations-categories-chart') as HTMLCanvasElement;
    const dispensationsCategoriesData = {
      labels: [
        'Viandes',
        'Laitages',
        'Fruits et légumes',
      ],
      datasets: [{
        label: 'Nombre de dérogations par catégorie',
        data: [10, 20, 40],
        backgroundColor: ['#84cc16', '#a3e635', '#bef264', '#d9f99d', '#ecfccb'],
        hoverOffset: 4,
      }],
    };
    this.charts.push(new Chart(dispensationsCategoriesElement, {
      type: 'bar',
      options: {
        indexAxis: 'y',
      },
      data: dispensationsCategoriesData,

    } as ChartConfiguration));
  }

  getChartById(elementId: string) {
    return this.charts.find((chart) => chart.canvas.id === elementId);
  }

  updateChartById(elementId: string, labels: string[], data: number[]) {
    const chart = this.getChartById(elementId);
    if (chart) {
      chart.data.labels = labels;
      chart.data.datasets[0].data = data;
      chart.update();
    }
  }
}

export default new Stats();
