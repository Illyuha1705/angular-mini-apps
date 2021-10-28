import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../../services/data-storage.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { WeatherInterface } from '../../interfaces/weather.interface';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    currentWeather = '';
    currentWeatherText = '';
    currentWeatherImage = '';

    private destroy$: Subject<void> = new Subject();

    constructor(private dataStorageService: DataStorageService) {
    }

    ngOnInit(): void {
        this.trackIsWeatherDataChanged$();
    }

    retrieveWeatherData(updatedWeatherData): void {
        this.currentWeather = updatedWeatherData.current.temp_c;
        this.currentWeatherText = updatedWeatherData.current.condition.text;
        this.currentWeatherImage = updatedWeatherData.current.condition.icon;
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
