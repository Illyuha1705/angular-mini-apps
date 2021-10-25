import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable()
export class DataStorageService {
  @Output() weatherDataChanged$: EventEmitter<object> = new EventEmitter<object>();

  private weatherData: any;

  public updateWeatherData(): void {
    this.weatherDataChanged$.emit(this.weatherData);
  }

  get getWeatherData() {
    return this.weatherData;
  }

  set setWeatherData(data) {
    this.weatherData = data;
  }
}
