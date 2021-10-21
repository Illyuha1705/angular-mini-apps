import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {DataStorageService} from "./data-storage.service";

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherMapService {

  constructor(private http: HttpClient,
              private dataStorageService: DataStorageService) { }

  public getWeather(location): void {
    this.http
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7b67c24e8212ce197e5e3ef9b5afcfa2`)
      .subscribe((data) => {
        this.dataStorageService.weatherData = data;
        this.dataStorageService.updateWeatherData();
      });
  }
}
