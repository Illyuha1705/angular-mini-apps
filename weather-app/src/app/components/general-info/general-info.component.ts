import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../../services/data-storage.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WidgetGeneralInfoModel } from '../../models/widget-general-info.model';
import { WeatherModel } from '../../models/weather.model';
import { ForecastDayModel } from '../../models/forecast-day.model';

@Component({
    selector: 'app-general-info',
    templateUrl: './general-info.component.html',
    styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit, OnDestroy {
    weatherData: WeatherModel;
    generalInfo: WidgetGeneralInfoModel[] = [];
    generalInfoIndex = 0;
    private destroy$: Subject<void> = new Subject();

    constructor(private dataStorageService: DataStorageService) {
    }

    ngOnInit(): void {
        this.trackIsWeatherDataChanged$();
        this.trackIsGeneralInfoIndexChanged$();
    }

    public retrieveWeatherData(): void {
        this.generalInfo = [];

        this.weatherData.forecast.forecastday.forEach((dayData: ForecastDayModel) => {
            this.generalInfo.push(
                new WidgetGeneralInfoModel(
                    dayData.day.avghumidity,
                    dayData.day.daily_chance_of_rain,
                    dayData.day.maxwind_kph,
                    dayData.day.avgvis_km,
                    dayData.day.maxtemp_c,
                    dayData.day.mintemp_c,
                    dayData.day.condition.text,
                )
            );
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private trackIsWeatherDataChanged$(): void {
        this.dataStorageService.weatherDataChanged$
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (updatedWeatherData: WeatherModel) => {
                    this.weatherData = updatedWeatherData;
                    this.retrieveWeatherData();
                }
            });
    }

    private trackIsGeneralInfoIndexChanged$(): void {
        this.dataStorageService.generalInfoIndexChanged$
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (updatedIndex: number) => this.generalInfoIndex = updatedIndex
            });
    }
}
