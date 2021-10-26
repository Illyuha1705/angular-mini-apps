import { Component, OnInit } from '@angular/core';
import { Chart }             from 'angular-highcharts';
import { areaChartOptions }  from '../../helpers/chart';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  weatherChart: Chart;

  constructor() { }

  ngOnInit(): void {
    this.weatherChart = new Chart(areaChartOptions());
  }

}
