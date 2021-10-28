import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../../services/data-storage.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { WidgetModel } from '../../models/widget.model';
import { WeatherInterface } from '../../interfaces/weather.interface';
import { ForecastDayInterface } from '../../interfaces/forecast-day.interface';

@Component({
    selector: 'app-main-widget',
    templateUrl: './main-widget.component.html',
    styleUrls: ['./main-widget.component.scss']
})
export class MainWidgetComponent implements OnInit, OnDestroy {
    widgets: WidgetModel[] = [];
    currentCity = '';
    activeWidget = 0;

    private destroy$: Subject<void> = new Subject();

    constructor(private dataStorageService: DataStorageService) {
    }

    ngOnInit(): void {
        this.trackIsWeatherDataChanged$();
    }

    retrieveWeatherData(updatedWeatherData): void {
        this.resetActiveWidgetAndWidgets();
        this.currentCity = `${updatedWeatherData?.location.name}, ${updatedWeatherData?.location.country}`;

        updatedWeatherData.forecast.forecastday.forEach((day: ForecastDayInterface) => {
            this.widgets.push(
                new WidgetModel(
                    day.date,
                    day.day.condition.icon,
                    day.day.condition.text,
                    day.day.mintemp_c,
                    day.day.maxtemp_c
                )
            );
        });
    }

    chooseActiveWidget(index: number): void {
        this.dataStorageService.setGeneralInfoIndex = index;
        this.activeWidget = index;
    }

    resetActiveWidgetAndWidgets(): void {
        this.activeWidget = 0;
        this.widgets = [];
        this.chooseActiveWidget(0);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private trackIsWeatherDataChanged$(): void {
        this.dataStorageService.weatherDataChanged$
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (updatedWeatherData: WeatherInterface) => {
                    this.retrieveWeatherData(updatedWeatherData);
                }
            });
    }
}
