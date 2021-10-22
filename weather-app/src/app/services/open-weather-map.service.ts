import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OpenWeatherMapService {

  constructor(private http: HttpClient) { }

  public getWeather(location) {
    return this.http
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7b67c24e8212ce197e5e3ef9b5afcfa2`);
  }
}
