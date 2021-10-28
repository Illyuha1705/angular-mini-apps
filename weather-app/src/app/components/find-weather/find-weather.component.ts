import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetWeatherDataService } from '../../services/get-weather-data.service';
import { DataStorageService } from '../../services/data-storage.service';
import { Subject } from 'rxjs';
import { WeatherInterface } from '../../interfaces/weather.interface';

@Component({
    selector: 'app-find-weather',
    templateUrl: './find-weather.component.html',
    styleUrls: ['./find-weather.component.scss']
})
export class FindWeatherComponent implements OnInit, OnDestroy {
    weatherSearchForm: FormGroup;
    private destroy$: Subject<void> = new Subject();

    constructor(private openWeatherMapService: GetWeatherDataService,
                private dataStorageService: DataStorageService) {
    }

    ngOnInit(): void {
        this.initForm();
        this.sentToApi(this.weatherSearchForm.value);

        this.dataStorageService.weatherDataChanged$.subscribe((weatherData: { location }) => {
            if (weatherData) {
                this.weatherSearchForm.controls['location'].setValue(`${weatherData.location.name} ${weatherData.location.country}`);
            }
        });
    }

    sentToApi(formValue: { location: string }): void {
        this.openWeatherMapService
            .getWeather(formValue.location)
            .subscribe({
                    next: (updatedWeatherData: WeatherInterface) => {
                        this.dataStorageService.setWeatherData = updatedWeatherData;
                    },
                    error: (error) => {
                        localStorage.clear();
                        alert(error.error.error.message);
                    }
                }
            );
    }

    sentToApiAndToLS(formValue: { location: string }): void {
        this.sentToApi(formValue);
        localStorage.setItem('lastCity', this.weatherSearchForm.value.location);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private initForm(): void {
        const defaultCity = localStorage.getItem('lastCity') || 'Kharkiv, Ukraine';

        this.weatherSearchForm = new FormGroup({
            'location': new FormControl(defaultCity, [Validators.required])
        });

    }
}
