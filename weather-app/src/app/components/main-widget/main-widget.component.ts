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
    this.currentCity = `${this.weatherData?.location.name}, ${this.weatherData?.location.country}`;

    this.weatherData.forecast.forecastday.forEach(day => {
      this.dates.push(day.date);
      this.weatherImages.push(day.day.condition.icon);
      this.minTemperatures.push(day.day.mintemp_c);
      this.maxTemperatures.push(day.day.maxtemp_c);
      this.weatherTexts.push(day.day.condition.text);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
