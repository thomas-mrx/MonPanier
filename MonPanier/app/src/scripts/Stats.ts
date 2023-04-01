import { Chart, ChartConfiguration } from 'chart.js/auto';

export default class Stats {
  private readonly charts: Chart[] = [];

  constructor() {
    const brefElement = document.getElementById('bref-chart') as HTMLCanvasElement;
    const brefData = {
      labels: [
        'Red',
        'Blue',
        'Yellow',
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 4,
      }],
    };
    this.charts.push(new Chart(brefElement, {
      type: 'doughnut',
      data: brefData,
    } as ChartConfiguration));
  }

  getChartById(elementId: string) {
    return this.charts.find((chart) => chart.canvas.id === elementId);
  }
}
