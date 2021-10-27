import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../../services/data-storage.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { WeatherModel } from '../../models/weather.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    weatherData: WeatherModel;

    currentWeather = '';
    currentWeatherText = '';
    currentWeatherImage = '';

    private destroy$: Subject<void> = new Subject();

    constructor(private dataStorageService: DataStorageService) {
    }

    ngOnInit(): void {
        this.trackIsWeatherDataChanged$();
    }

    public retrieveWeatherData(): void {
        this.currentWeather = this.weatherData.current.temp_c;
        this.currentWeatherText = this.weatherData.current.condition.text;
        this.currentWeatherImage = this.weatherData.current.condition.icon;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private trackIsWeatherDataChanged$(): void {
        this.dataStorageService.weatherDataChanged$
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (updatedWeatherData: any) => {
                    this.weatherData = updatedWeatherData;
                    this.retrieveWeatherData();
                }
            });
    }
}
