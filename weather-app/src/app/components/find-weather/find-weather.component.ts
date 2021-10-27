import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetWeatherDataService } from '../../services/get-weather-data.service';
import { DataStorageService } from '../../services/data-storage.service';
import { WeatherModel } from '../../models/weather.model';
import { Subject } from 'rxjs';

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
        this.initForm()
        this.checkLSForLastCity();
    }

    public sentToApi(formValue: { location: string }): void {
        this.openWeatherMapService
            .getWeather(formValue.location)
            .subscribe(
                (data: WeatherModel) => {
                    this.dataStorageService.setWeatherData = data
                },
                error => {
                    alert(error.error.error.message);
                    localStorage.clear();
                }
            );
    }

    public sentToLS(formValue: { location: string }): void {
        localStorage.setItem('lastCity', formValue.location);
    }

    public sentToApiAndToLS(formValue: { location: string }): void {
        this.sentToApi(formValue);
        this.sentToLS(formValue);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private initForm(): void {
        this.weatherSearchForm = new FormGroup({
            'location': new FormControl('Kharkiv, Ukraine', [Validators.required])
        });
    }

    private checkLSForLastCity(): void {
        const lastCity = localStorage.getItem('lastCity');

        if (lastCity !== 'Kharkiv, Ukraine' && lastCity !== null) {
            this.weatherSearchForm.controls['location'].setValue(lastCity);
        }

        this.sentToApiAndToLS(this.weatherSearchForm.value);
    }
}
