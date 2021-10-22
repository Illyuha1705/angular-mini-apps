import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable()
export class DataStorageService {
  @Output() weatherDataChanged$: EventEmitter<object> = new EventEmitter<object>();

  weatherData: object;

  public updateWeatherData(): void {
    this.weatherDataChanged$.emit(this.weatherData);
  }
}
