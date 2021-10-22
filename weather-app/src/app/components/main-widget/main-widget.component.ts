import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../../services/data-storage.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-main-widget',
  templateUrl: './main-widget.component.html',
  styleUrls: ['./main-widget.component.scss']
})
export class MainWidgetComponent implements OnInit, OnDestroy {
  weatherData: any;

  currentCity = '';
  weatherTexts: string[] = [];
  dates: string[] = [];
  weatherImages: string[] = [];
  minTemperatures: string[] = [];
  maxTemperatures: string[] = [];

  private destroy$: Subject<void> = new Subject();

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.weatherData = this.dataStorageService.weatherData;

    this.dataStorageService.weatherDataChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedWeatherData: any) => {
          this.weatherData = updatedWeatherData;
          this.retrieveWeatherData();
        }
      });
  }

  public retrieveWeatherData(): void {
    this.currentCity = `${this.weatherData?.location.name}, ${this.weatherData?.location.country}`

    this.dates = [
      this.weatherData.forecast.forecastday[0].date,
      this.weatherData.forecast.forecastday[1].date,
      this.weatherData.forecast.forecastday[2].date
    ];

    this.weatherImages = [
      this.weatherData.forecast.forecastday[0].day.condition.icon,
      this.weatherData.forecast.forecastday[1].day.condition.icon,
      this.weatherData.forecast.forecastday[2].day.condition.icon
    ];

    this.minTemperatures = [
      this.weatherData.forecast.forecastday[0].day.mintemp_c,
      this.weatherData.forecast.forecastday[1].day.mintemp_c,
      this.weatherData.forecast.forecastday[2].day.mintemp_c
    ];

    this.maxTemperatures = [
      this.weatherData.forecast.forecastday[0].day.maxtemp_c,
      this.weatherData.forecast.forecastday[1].day.maxtemp_c,
      this.weatherData.forecast.forecastday[2].day.maxtemp_c
    ];

    this.weatherTexts = [
      this.weatherData.forecast.forecastday[0].day.condition.text,
      this.weatherData.forecast.forecastday[1].day.condition.text,
      this.weatherData.forecast.forecastday[2].day.condition.text
    ];

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
