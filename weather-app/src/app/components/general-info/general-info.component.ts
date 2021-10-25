import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../../services/data-storage.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit, OnDestroy {
  weatherData: any;

  humidity: string[] = [];
  maxWindSpeed: string[] = [];
  chanceOfRain: string[] = [];
  visKm: string[] = [];

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
    this.weatherData.forecast.forecastday(dayData => {
      this.humidity.push(dayData.avghumidity);
      this.maxWindSpeed.push(dayData.maxwind_kph);
      this.chanceOfRain.push(dayData.daily_chance_of_rain);
      this.visKm.push(dayData.avgvis_km);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
