import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { areaChartOptions } from '../../helpers/chart';
import { DataStorageService } from '../../services/data-storage.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WeatherInterface } from '../../interfaces/weather.interface';
import { ForecastDayInterface } from '../../interfaces/forecast-day.interface';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {
    weatherChart: Chart;
    chartData = [];
    index = 0;

    private destroy$: Subject<void> = new Subject();

    constructor(private dataStorageService: DataStorageService) {
    }

    ngOnInit(): void {
        this.trackIsWeatherDataChanged();
        this.trackIsGeneralInfoIndexChanged$();

        this.setChart();
    }

     retrieveWeatherData(updatedWeatherData: WeatherInterface): void {
         this.chartData = updatedWeatherData.forecast.forecastday.map((day: ForecastDayInterface) => day.hour.map((hour: { temp_c: string, time: string }) => {
                return {
                    time: this.transformTimeData(hour.time),
                    temp: hour.temp_c
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private trackIsWeatherDataChanged(): void {
        this.dataStorageService.weatherDataChanged$
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (updatedWeatherData: WeatherInterface) => {
                    this.retrieveWeatherData(updatedWeatherData);
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
        this.weatherChart.ref?.update(areaChartOptions(this.getHours(), this.getTemp()), true);
    }

    private getTemp(): number[] {
        let temps: number[] = [];
        this.chartData[this.index]?.forEach((item, index) => {
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

    private transformTimeData(str: string): string {
        return str.substring(str.indexOf(' '));
    }
}
