import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  @Output() weatherDataChanged$: EventEmitter<object> = new EventEmitter<object>();

  weatherData: object;

  constructor() { }

  updateWeatherData() {
    this.weatherDataChanged$.emit(this.weatherData);
  }
}
