import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OpenWeatherMapService {

  constructor(private http: HttpClient) { }

  public getWeather(location) {
    return this.http
      // .get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&cnt=5&appid=7b67c24e8212ce197e5e3ef9b5afcfa2`);
      .get(`https://api.weatherapi.com/v1/forecast.json?key=059c25bcf9454f22b7a101259212210&q=${location}&days=3&aqi=no&alerts=no`);
  }
}

