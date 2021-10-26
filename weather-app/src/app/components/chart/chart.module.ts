import { NgModule }       from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import {ChartModule as AngularHighChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [ChartComponent],
  imports: [AngularHighChartModule, CommonModule],
  exports: [ChartComponent],
  providers: []
})
export class ChartModule {}
