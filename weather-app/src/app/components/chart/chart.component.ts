import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Chart }                        from 'angular-highcharts';
import { areaChartOptions }             from '../../helpers/chart';
import { DataStorageService }           from '../../services/data-storage.service';
import { Subject }                      from 'rxjs';
import { takeUntil }                    from 'rxjs/operators';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {
  weatherChart: Chart;
  chartData = [];
  weatherData: any;
  index = 0;

  private destroy$: Subject<void> = new Subject();

  constructor(private dataStorageService: DataStorageService) {
  }

  ngOnInit(): void {
    this.trackIsWeatherDataChanged();
    this.trackIsGeneralInfoIndexChanged$();

    this.setChart();
  }

  private trackIsWeatherDataChanged(): void {
    this.dataStorageService.weatherDataChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedWeatherData: any) => {
          this.weatherData = updatedWeatherData;
          this.retrieveWeatherData();
          this.getHours();
          this.updateChart();
        }
      });
  }

  private trackIsGeneralInfoIndexChanged$(): void {
    this.dataStorageService.generalInfoIndexChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedIndex: number) => {
          this.index = updatedIndex;
          this.updateChart();
        }
      });
  }

  private setChart(): void {
    this.weatherChart = new Chart(areaChartOptions(
        this.getHours(),
        this.getTemp()
      )
    );
  }

  private updateChart(): void {
    this.weatherChart.ref?.update(areaChartOptions(this.getHours(),  this.getTemp()), true);
  }

  private static transformTimeData(str: string): string {
    return str.substring(str.indexOf(' '));
  }

  private getTemp(): number[] {
    let temps: number[] = [];
    this.chartData[this.index]?.map((item, index) => {
      if (index % 2 !== 0) {
        temps.push(+Math.round(item.temp));
      }
    });
    return temps;
  }

  private getHours(): string[] {
    let times: string[] = [];
    this.chartData[this.index]?.forEach((item, index) => {
      if (index % 2 !== 0) {
        times.push(item.time);
      }
    });

    return times;
  }

  public retrieveWeatherData(): void {
    this.chartData = this.weatherData.forecast.forecastday.map(day => {
      return day.hour.map(hour => {
        return {
          time: ChartComponent.transformTimeData(hour.time),
          temp: hour.temp_c
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
