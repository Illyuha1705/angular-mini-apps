import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../../services/data-storage.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {WidgetGeneralInfoModel} from "../../models/widget-general-info.model";

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit, OnDestroy {
  weatherData: any;

  generalInfo: WidgetGeneralInfoModel[] = [];
  generalInfoIndex = 0;

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

    this.dataStorageService.generalInfoIndexChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedIndex: number) => {
          this.generalInfoIndex = updatedIndex;
        }
      })
  }

  public retrieveWeatherData(): void {
    this.generalInfo = [];

    this.weatherData.forecast.forecastday.forEach(dayData => {
      this.generalInfo.push(
        new WidgetGeneralInfoModel(
          dayData.day.avghumidity,
          dayData.day.daily_chance_of_rain,
          dayData.day.maxwind_kph,
          dayData.day.avgvis_km,
        )
      );
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
