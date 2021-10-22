import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../../services/data-storage.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit, OnDestroy {
  weatherData: any;
  minTemperature = '';
  maxTemperature = '';
  weather = '';
  currentWeatherImg = '';

  private destroy$: Subject<void> = new Subject();

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.weatherData = this.dataStorageService.weatherData;

    this.dataStorageService.weatherDataChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedWeatherData: any) => {
          this.weatherData = updatedWeatherData;
          this.retrieveMainWeatherData();
        }
      })
  }

  public retrieveMainWeatherData() {
      this.minTemperature = `${Math.round(this.weatherData?.main.temp_min - 273.15)}`;
      this.maxTemperature = `${Math.round(this.weatherData?.main.temp_max - 273.15)}`;
      this.weather = this.weatherData?.weather[0].description;
      this.currentWeatherImg = `https://openweathermap.org/img/wn/${this.weatherData?.weather[0].icon}@2x.png`
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
