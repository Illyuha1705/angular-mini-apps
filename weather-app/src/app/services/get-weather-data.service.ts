import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherModel } from '../models/weather.model';

@Injectable()
export class GetWeatherDataService {
    constructor(private http: HttpClient) {
    }

    public getWeather(location) {
        return this.http
            .get<WeatherModel>(`https://api.weatherapi.com/v1/forecast.json?key=059c25bcf9454f22b7a101259212210&q=${location}&days=3&aqi=no&alerts=no`);
    }
}

