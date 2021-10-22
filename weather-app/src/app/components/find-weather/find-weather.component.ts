import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OpenWeatherMapService} from "../../services/open-weather-map.service";
import {DataStorageService} from "../../services/data-storage.service";

@Component({
  selector: 'app-find-weather',
  templateUrl: './find-weather.component.html',
  styleUrls: ['./find-weather.component.scss']
})
export class FindWeatherComponent implements OnInit {
  weatherSearchForm: FormGroup;

  constructor(private openWeatherMapService: OpenWeatherMapService,
              private dataStorageService: DataStorageService) {
  }

  ngOnInit(): void {
    this.initForm()
    this.checkLSForLastCity();
  }

  private initForm() {
    this.weatherSearchForm = new FormGroup({
      'location': new FormControl('Kharkov, Ukraine', [Validators.required])
    });
  }

  public checkLSForLastCity(): void {
    const lastCity = localStorage.getItem('lastCity');

    if (lastCity !== 'Kharkov, Ukraine' && lastCity !== null) {
      this.weatherSearchForm.controls['location'].setValue(lastCity);
    }

    this.sentToApiAndToLS(this.weatherSearchForm.value);
  }

  public sentToApi(formValue: {location: string}): void {
    this.openWeatherMapService
      .getWeather(formValue.location)
      .subscribe((data) => {
        this.dataStorageService.weatherData = data;
        this.dataStorageService.updateWeatherData();
      });
  }

  public sentToLS(formValue: {location: string}): void {
    localStorage.setItem('lastCity', formValue.location);
  }

  public sentToApiAndToLS(formValue: {location: string}): void {
    this.sentToApi(formValue);
    this.sentToLS(formValue);
  }

}
